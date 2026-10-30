/** Geometry-independent scroll timing for the follow-through cascade. */
export type MotionPoint = { distance: number; base: { y: number } };
export type ScrollDistanceAnchor = { scroll: number; distance: number };
export type ScrollTimeline = {
  startScroll: number;
  endScroll: number;
  startDistance: number;
  endDistance: number;
  anchors: readonly ScrollDistanceAnchor[];
  tangents: readonly number[];
};

const finiteOr = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** One-sided PCHIP slope, limited so an endpoint cannot reverse or overshoot. */
function endpointSlope(here: number, next: number, hereSlope: number, nextSlope: number) {
  const slope = ((2 * here + next) * hereSlope - here * nextSlope) / (here + next);
  return Math.max(0, Math.min(3 * hereSlope, slope));
}

/**
 * Bind distance along the course to actual section positions. Each anchor is an
 * explicit point the contact must reach while that section is on screen.
 * Positive harmonic tangents preserve monotonicity and join with continuous
 * velocity, without stopping at every section or inverting near-horizontal Y.
 *
 * The caller owns the scroll budgets: no interpolator can slow an overlong
 * visible crossing and also reach its end through a tiny amount of scrolling.
 */
export function buildSectionTimeline(input: readonly ScrollDistanceAnchor[]): ScrollTimeline {
  const anchors: ScrollDistanceAnchor[] = [];
  const ordered = input
    .filter((point) => Number.isFinite(point.scroll) && Number.isFinite(point.distance))
    .map((point) => ({ scroll: point.scroll, distance: Math.max(0, point.distance) }))
    .sort((a, b) => a.scroll - b.scroll || a.distance - b.distance);
  for (const point of ordered) {
    const previous = anchors.at(-1);
    if (!previous) anchors.push(point);
    else if (point.scroll === previous.scroll) {
      if (point.distance > previous.distance) anchors[anchors.length - 1] = point;
    } else if (point.distance > previous.distance) anchors.push(point);
  }
  if (!anchors.length) anchors.push({ scroll: 0, distance: 0 });
  if (anchors.length === 1)
    anchors.push({ scroll: anchors[0].scroll + 1, distance: anchors[0].distance });

  const intervals = anchors.slice(1).map((point, index) => point.scroll - anchors[index].scroll);
  const secants = anchors
    .slice(1)
    .map((point, index) => (point.distance - anchors[index].distance) / intervals[index]);
  const tangents = Array<number>(anchors.length).fill(0);
  if (anchors.length === 2) tangents.fill(secants[0]);
  else {
    tangents[0] = endpointSlope(intervals[0], intervals[1], secants[0], secants[1]);
    const last = intervals.length - 1;
    tangents[tangents.length - 1] = endpointSlope(
      intervals[last],
      intervals[last - 1],
      secants[last],
      secants[last - 1],
    );
    for (let index = 1; index < anchors.length - 1; index++) {
      const before = secants[index - 1];
      const after = secants[index];
      if (before <= 0 || after <= 0) continue;
      const w1 = 2 * intervals[index] + intervals[index - 1];
      const w2 = intervals[index] + 2 * intervals[index - 1];
      tangents[index] = (w1 + w2) / (w1 / before + w2 / after);
    }
  }
  return {
    startScroll: anchors[0].scroll,
    endScroll: anchors.at(-1)!.scroll,
    startDistance: anchors[0].distance,
    endDistance: anchors.at(-1)!.distance,
    anchors,
    tangents,
  };
}

/** Retained two-anchor wrapper for a deliberately uniform course or legacy check. */
export function buildScrollTimeline(
  points: readonly MotionPoint[],
  viewportHeight: number,
  startScroll: number,
  endScroll: number,
): ScrollTimeline {
  const valid = points.filter((point) => Number.isFinite(point.distance));
  const first = valid[0];
  const last = valid.at(-1);
  const startDistance = Math.max(0, first?.distance ?? 0);
  const endDistance = Math.max(startDistance, last?.distance ?? startDistance);
  const start = finiteOr(startScroll, 0);
  const fallbackEnd =
    finiteOr(last?.base.y ?? start + 1, start + 1) -
    Math.max(0, finiteOr(viewportHeight, 0)) * 0.54;
  const end = Math.max(start + 1, finiteOr(endScroll, fallbackEnd));
  return buildSectionTimeline([
    { scroll: start, distance: startDistance },
    { scroll: end, distance: endDistance },
  ]);
}

/** Monotone, reversible distance with exact section anchors and smooth joins. */
export function sampleScrollTimeline(timeline: ScrollTimeline, scroll: number): number {
  const position = Number.isNaN(scroll) ? timeline.startScroll : scroll;
  if (position <= timeline.startScroll) return timeline.startDistance;
  if (position >= timeline.endScroll) return timeline.endDistance;
  const { anchors, tangents } = timeline;
  let low = 0;
  let high = anchors.length - 1;
  while (low + 1 < high) {
    const middle = Math.floor((low + high) / 2);
    if (anchors[middle].scroll <= position) low = middle;
    else high = middle;
  }
  const a = anchors[low];
  const b = anchors[low + 1];
  const span = b.scroll - a.scroll;
  const t = clamp((position - a.scroll) / span);
  const square = t * t;
  const cube = square * t;
  const distance =
    (2 * cube - 3 * square + 1) * a.distance +
    (cube - 2 * square + t) * span * tangents[low] +
    (-2 * cube + 3 * square) * b.distance +
    (cube - square) * span * tangents[low + 1];
  return Math.max(a.distance, Math.min(b.distance, distance));
}

/**
 * Exact first-order response. A finite maxLag additionally keeps the contact
 * within that many path pixels of the current scroll target on advancing frames.
 * The component must reset its elapsed-time clock after an idle or geometry reset.
 */
export function dampMotion(
  current: number,
  target: number,
  deltaMs: number,
  responseMs = 110,
  maxLag = Infinity,
): number {
  const destination = finiteOr(target, finiteOr(current, 0));
  const source = finiteOr(current, destination);
  const elapsed = Math.max(0, finiteOr(deltaMs, 0));
  const response = finiteOr(responseMs, 110);
  if (response <= 0) return destination;
  const amount = -Math.expm1(-elapsed / response);
  const value = source + (destination - source) * amount;
  const limit = Math.max(0, finiteOr(maxLag, Infinity));
  if (elapsed === 0 || limit === Infinity) return value;
  return Math.max(destination - limit, Math.min(destination + limit, value));
}

export type ExposedMotionPoint = MotionPoint & { exposed: boolean };

/**
 * Visible runs keep their own section positions. Concealed travel between them
 * uses a short budget around the midpoint, so a whole contact wave cannot spend
 * half a section under an opaque card while every exposed domino looks stopped.
 */
export function buildVisibleSectionTimeline(
  points: readonly ExposedMotionPoint[],
  documentTop: number,
  focusY: number,
  endScroll: number,
  endDistance: number,
  sectionScrolls: readonly number[] = [],
): ScrollTimeline {
  const runs: ExposedMotionPoint[][] = [];
  let run: ExposedMotionPoint[] = [];
  for (const point of points) {
    if (point.exposed) run.push(point);
    else if (run.length) {
      runs.push(run);
      run = [];
    }
  }
  if (run.length) runs.push(run);
  if (!runs.length)
    return buildSectionTimeline([
      { scroll: 0, distance: 0 },
      { scroll: endScroll, distance: endDistance },
    ]);
  const scrollAt = (y: number) => Math.max(0, documentTop + y - focusY);
  const anchors: ScrollDistanceAnchor[] = [];
  const passageCentre = (before: ExposedMotionPoint, after: ExposedMotionPoint) => {
    let centre = scrollAt((before.base.y + after.base.y) / 2);
    // A section's reading position should show an exposed contact, rather than
    // land precisely in the short concealed handoff between two visible runs.
    for (const scroll of sectionScrolls) {
      if (Math.abs(centre - scroll) < 65) centre = scroll + 70;
    }
    return centre;
  };
  runs.forEach((visible, index) => {
    const first = visible[0];
    const last = visible.at(-1)!;
    const before = runs[index - 1]?.at(-1);
    const after = runs[index + 1]?.[0];
    const entry = before ? passageCentre(before, first) + 30 : scrollAt(first.base.y);
    const exit = after
      ? Math.max(entry + 1, passageCentre(last, after) - 30)
      : scrollAt(last.base.y);
    if (visible.length === 1) {
      // A single exposed base still has a finite tipping window. Give that
      // contact its entry/exit budget instead of placing one midpoint anchor,
      // which would stretch both neighbouring concealed crossings.
      const entryDistance = first.distance === 0 ? 0 : first.distance + 0.01;
      const exitDistance =
        first.distance + Math.min(48, (after?.distance ?? endDistance) - first.distance - 1);
      anchors.push({ scroll: entry, distance: entryDistance });
      anchors.push({
        scroll: Math.max(entry + 1, exit),
        distance: Math.max(entryDistance + 0.01, exitDistance),
      });
      return;
    }
    anchors.push({ scroll: entry, distance: first.distance });
    let previousDistance = first.distance;
    for (const point of visible.slice(1, -1)) {
      const scroll = scrollAt(point.base.y);
      if (point.distance - previousDistance >= 96 && scroll > entry + 20 && scroll < exit - 20) {
        anchors.push({ scroll, distance: point.distance });
        previousDistance = point.distance;
      }
    }
    anchors.push({ scroll: Math.max(entry + 1, exit), distance: last.distance });
  });
  const last = anchors.at(-1)!;
  anchors.push({
    scroll: Math.max(last.scroll + 1, endScroll),
    distance: Math.max(last.distance + 1, endDistance),
  });
  return buildSectionTimeline(anchors);
}
