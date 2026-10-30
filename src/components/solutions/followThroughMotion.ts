/** Geometry-independent scroll timing for the follow-through cascade. */
export type MotionPoint = { distance: number; base: { y: number } };
export type ScrollDistanceAnchor = { scroll: number; distance: number };
export type ScrollTimeline = {
  startScroll: number;
  endScroll: number;
  startDistance: number;
  endDistance: number;
  anchors: readonly [ScrollDistanceAnchor, ScrollDistanceAnchor];
};

const finiteOr = (value: number, fallback: number) => (Number.isFinite(value) ? value : fallback);
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/**
 * Give the complete course an explicit scroll budget. Progress is measured in
 * distance along the route, never by inverting a tile's Y coordinate: a broad
 * horizontal bend therefore consumes the same budget per pixel as a descent.
 *
 * There are deliberately no interior timing joins. Placement and route shape
 * stay with the caller, which can tune the two endpoints without introducing
 * corner-specific acceleration. The viewport supplies only a sensible fallback
 * for callers that do not provide an end position.
 */
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

  return {
    startScroll: start,
    endScroll: end,
    startDistance,
    endDistance,
    anchors: [
      { scroll: start, distance: startDistance },
      { scroll: end, distance: endDistance },
    ],
  };
}

/** Constant arc-distance speed within the budget; exact, reversible endpoints. */
export function sampleScrollTimeline(timeline: ScrollTimeline, scroll: number): number {
  const position = Number.isNaN(scroll) ? timeline.startScroll : scroll;
  const progress = clamp(
    (position - timeline.startScroll) / (timeline.endScroll - timeline.startScroll),
  );
  return timeline.startDistance + (timeline.endDistance - timeline.startDistance) * progress;
}

/**
 * Exact first-order response, independent of frame rate. The result always
 * remains between current and target, including on reversal and a long frame.
 * Keep requesting frames while the remaining error is visible; scroll events
 * alone cannot finish this response after the wheel stops.
 */
export function dampMotion(
  current: number,
  target: number,
  deltaMs: number,
  responseMs = 110,
): number {
  const destination = finiteOr(target, finiteOr(current, 0));
  const source = finiteOr(current, destination);
  const elapsed = Math.max(0, finiteOr(deltaMs, 0));
  const response = finiteOr(responseMs, 110);
  if (response <= 0) return destination;
  const amount = -Math.expm1(-elapsed / response);
  return source + (destination - source) * amount;
}
