import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import "@/styles/follow-through-track.css";

type Point = { x: number; y: number };
type Projection = {
  back: string;
  edgeLeft: string;
  edgeRight: string;
  crown: string;
  face: string;
  shadow: string;
};
type Tile = {
  index: number;
  base: Point;
  distance: number;
  size: number;
  width: Point;
  upright: Point;
  fallen: Point;
  standing: Projection;
  settled: Projection;
};
type Occlusion = { x: number; y: number; width: number; height: number };
type Course = {
  width: number;
  height: number;
  length: number;
  originY: number;
  tiles: Tile[];
  occlusions: Occlusion[];
  signature: string;
};
type Binding = {
  node: SVGGElement;
  back: SVGPolygonElement;
  edgeLeft: SVGPolygonElement;
  edgeRight: SVGPolygonElement;
  crown: SVGPolygonElement;
  face: SVGGElement;
  shadow: SVGPolygonElement;
  angle: number;
  opacity: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (point: Point, amount: number): Point => ({
  x: point.x * amount,
  y: point.y * amount,
});
const mix = (a: Point, b: Point, amount: number) => add(scale(a, 1 - amount), scale(b, amount));
const polygon = (points: Point[]) =>
  points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");

function project(
  tile: Pick<Tile, "base" | "width" | "upright" | "fallen" | "size">,
  angle: number,
): Projection {
  const radians = (angle * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const rise = add(scale(tile.upright, cosine), scale(tile.fallen, sine));
  const thickness = add(scale(tile.fallen, cosine * 0.135), scale(tile.upright, -sine * 0.135));
  const left = add(tile.base, scale(tile.width, -0.5));
  const right = add(tile.base, scale(tile.width, 0.5));
  const front = [left, right, add(right, rise), add(left, rise)];
  const back = front.map((point) => add(point, scale(thickness, -1)));
  const showBack = tile.width.x * rise.y - tile.width.y * rise.x > 0;
  const topLeft = (showBack ? back : front)[3];
  const shadowStart = add(tile.base, { x: 2, y: 3 });
  const shadowWidth = scale(tile.width, 0.56);
  const shadowLength = scale(tile.fallen, tile.size > 1 ? 0.46 + sine * 0.16 : 0.78 + sine * 0.18);

  return {
    back: polygon(back),
    edgeLeft: polygon([front[0], front[3], back[3], back[0]]),
    edgeRight: polygon([front[1], front[2], back[2], back[1]]),
    crown: polygon([front[3], front[2], back[2], back[3]]),
    face: `matrix(${tile.width.x} ${tile.width.y} ${-rise.x} ${-rise.y} ${topLeft.x} ${topLeft.y})`,
    shadow: polygon([
      add(shadowStart, scale(shadowWidth, -1)),
      add(shadowStart, shadowWidth),
      add(add(shadowStart, shadowWidth), shadowLength),
      add(add(shadowStart, scale(shadowWidth, -1)), shadowLength),
    ]),
  };
}

function cubic(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  const first = mix(a, b, t);
  const second = mix(b, c, t);
  const third = mix(c, d, t);
  return mix(mix(first, second, t), mix(second, third, t), t);
}

function measureCourse(root: HTMLElement): Course | null {
  const bounds = root.getBoundingClientRect();
  const scenes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-ft-waypoint], .ft-scene"),
  ).filter((scene, index, all) => all.indexOf(scene) === index);
  if (scenes.length < 2 || bounds.width < 200) return null;

  const contentNodes = Array.from(
    root.querySelectorAll<HTMLElement>(".ft-content, [data-ft-content]"),
  );
  const content = contentNodes.map((node) => node.getBoundingClientRect());
  if (!content.length) return null;
  const leftEdge = Math.min(...content.map((rect) => rect.left - bounds.left));
  const rightEdge = Math.max(...content.map((rect) => rect.right - bounds.left));
  // Both pages use these exact physical dimensions. Gutters give the ordinary
  // 20px-wide tile room to meander without changing its scale or camera.
  const left = Math.max(24, leftEdge - 32);
  const right = Math.min(bounds.width - 24, rightEdge + 32);
  const originBounds = root.querySelector<HTMLElement>("[data-ft-origin]")?.getBoundingClientRect();
  const origin = originBounds
    ? {
        x: originBounds.left - bounds.left + originBounds.width / 2,
        y: originBounds.top - bounds.top + originBounds.height / 2,
      }
    : { x: left, y: Math.max(80, content[0].top - bounds.top) };
  const end = bounds.height - 12;
  if (right - left < 200 || end - origin.y < 300) return null;

  const crossings = Array.from(root.querySelectorAll<HTMLElement>('[data-ft-cross="through"]'))
    .slice(0, 2)
    .map((node) => {
      const rect = node.getBoundingClientRect();
      const top = rect.top - bounds.top;
      const height = Math.min(500, Math.max(180, rect.height - 40));
      const middle = top + rect.height / 2;
      return { start: middle - height / 2, end: middle + height / 2 };
    });

  // The route can pass through an opaque scene, but never through its copy.
  // The SVG mask also shields transparent editorial wrappers, so a future
  // background/style change cannot expose a diagonal run behind readable text.
  const occlusions = Array.from(
    new Set([...contentNodes, ...root.querySelectorAll<HTMLElement>("[data-ft-occluder]")]),
  ).map((node) => {
    const rect = node.getBoundingClientRect();
    return {
      x: rect.left - bounds.left - 10,
      y: rect.top - bounds.top - 10,
      width: rect.width + 20,
      height: rect.height + 20,
    };
  });

  const samples: Point[] = [origin];
  let current = samples[0];
  let side = left;
  const line = (destination: Point) => {
    const steps = Math.max(
      1,
      Math.ceil(Math.hypot(destination.x - current.x, destination.y - current.y) / 18),
    );
    const origin = current;
    for (let step = 1; step <= steps; step++) samples.push(mix(origin, destination, step / steps));
    current = destination;
  };
  const curve = (a: Point, b: Point, c: Point, d: Point, steps: number) => {
    for (let step = 1; step <= steps; step++) {
      samples.push(cubic(a, b, c, d, step / steps));
    }
    current = d;
  };
  const driftTo = (y: number) => {
    while (current.y < y - 0.1) {
      const nextY = Math.min(y, current.y + 380);
      const span = nextY - current.y;
      const next = { x: side + Math.sin(nextY / 470) * 8, y: nextY };
      curve(
        current,
        { x: current.x, y: current.y + span * 0.35 },
        { x: next.x, y: nextY - span * 0.35 },
        next,
        Math.max(12, Math.ceil(span / 12)),
      );
    }
  };

  // Only this short opening sequence changes size. It is a physical starter,
  // not a replacement logo in the headline, and it never loops on its own.
  const starterEnd = Math.min(origin.y + 340, crossings[0]?.start - 60 || origin.y + 340);
  curve(
    current,
    { x: origin.x - 8, y: origin.y + 90 },
    { x: left - 8, y: starterEnd - 90 },
    { x: left, y: starterEnd },
    40,
  );
  crossings.forEach((crossing) => {
    if (crossing.start <= current.y + 35 || crossing.end >= end - 350) return;
    driftTo(crossing.start);
    const other = side === left ? right : left;
    const span = crossing.end - crossing.start;
    // A deep diagonal passes behind the scene. Its hidden middle has enough
    // vertical travel to avoid the old exposed, rapidly sweeping crossbar.
    curve(
      current,
      { x: current.x, y: crossing.start + span * 0.46 },
      { x: other, y: crossing.end - span * 0.46 },
      { x: other, y: crossing.end },
      100,
    );
    side = other;
  });

  const exitBounds = root.querySelector<HTMLElement>("[data-ft-exit]")?.getBoundingClientRect();
  if (exitBounds) {
    const exitY = Math.max(current.y + 70, exitBounds.top - bounds.top + 60);
    const outside = -75;
    driftTo(Math.min(exitY, end - 360));
    curve(
      current,
      { x: current.x, y: current.y + 65 },
      { x: outside + 35, y: current.y + 90 },
      { x: outside, y: current.y + 165 },
      30,
    );
    // The course completes beyond the left crop. The V2 footer introduces the
    // film's foreground dominoes from that same edge; no floating paper stub.
    line({ x: outside, y: end });
  } else {
    driftTo(end);
  }

  const distances = [0];
  for (let index = 1; index < samples.length; index++) {
    distances.push(
      distances[index - 1] +
        Math.hypot(
          samples[index].x - samples[index - 1].x,
          samples[index].y - samples[index - 1].y,
        ),
    );
  }
  const length = distances.at(-1)!;
  const starterSizes = originBounds ? [3.2, 2.6, 2.15, 1.78, 1.48, 1.23, 1.08] : [];
  const sizeAt = (index: number) => starterSizes[index] ?? 1;
  const tiles: Tile[] = [];
  let cursor = 1;

  for (let index = 0, distance = 0; distance <= length; index++) {
    while (cursor < distances.length - 1 && distances[cursor] < distance) cursor++;
    const a = samples[cursor - 1];
    const b = samples[cursor];
    const span = Math.max(0.001, distances[cursor] - distances[cursor - 1]);
    const tangent = { x: (b.x - a.x) / span, y: (b.y - a.y) / span };
    const base = mix(a, b, clamp((distance - distances[cursor - 1]) / span));
    // Width and fall axes follow the LOCAL tangent, including both broad bends.
    // Elevation stays fixed in the shared oblique overhead camera.
    const size = sizeAt(index);
    const width = scale(
      { x: tangent.y * 20 - tangent.x * 3, y: -tangent.x * 20 - tangent.y * 3 },
      size,
    );
    const tile = {
      index,
      base,
      distance,
      size,
      width,
      upright: scale({ x: 4, y: -13 }, size),
      fallen: scale(tangent, 28 * size),
    };
    tiles.push({ ...tile, standing: project(tile, 0), settled: project(tile, 78) });
    distance += (24 * (sizeAt(index) + sizeAt(index + 1))) / 2;
  }

  return {
    width: bounds.width,
    height: bounds.height,
    length,
    originY: origin.y,
    tiles,
    occlusions,
    signature: [
      bounds.width,
      bounds.height,
      left,
      right,
      origin.x,
      origin.y,
      end,
      ...crossings.flatMap((crossing) => [crossing.start, crossing.end]),
      ...occlusions.flatMap((rect) => [rect.x, rect.y, rect.width, rect.height]),
    ]
      .map((value) => value.toFixed(1))
      .join("/"),
  };
}

function applyProjection(binding: Binding, projection: Projection) {
  binding.back.setAttribute("points", projection.back);
  binding.edgeLeft.setAttribute("points", projection.edgeLeft);
  binding.edgeRight.setAttribute("points", projection.edgeRight);
  binding.crown.setAttribute("points", projection.crown);
  binding.face.setAttribute("transform", projection.face);
  binding.shadow.setAttribute("points", projection.shadow);
}

/**
 * Shared follow-through brand course for both V2 pages. All normal tiles use
 * one size and camera. An optional hero origin introduces a short larger
 * starter; two marked product scenes can conceal broad diagonal side changes.
 * Readable content is masked, and native scrolling remains ordinary page flow.
 *
 * Geometry is measured only after layout changes. Native scroll updates SVG
 * attributes for visible tiles; React never re-renders the course on scroll.
 */
export function FollowThroughTrack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bindings = useRef(new Map<number, Binding>());
  const scheduleRef = useRef<(() => void) | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const markId = `ftd-mark-${useId().replace(/:/g, "")}`;
  const maskId = `${markId}-occlusion`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = window.matchMedia(
      "(min-width: 1100px) and (prefers-reduced-motion: no-preference)",
    );
    let geometry: Course | null = null;
    let frame = 0;
    let disposed = false;
    let visible = new Set<number>();

    const update = () => {
      frame = 0;
      if (disposed || !media.matches || !geometry) return;
      const activeCourse = geometry;
      const top = root.getBoundingClientRect().top;
      const documentTop = top + window.scrollY;
      // At the page top the first physical domino is standing. The same native
      // scroll then advances its contact point through the measured course;
      // there is no load-time cascade, timer or delayed catch-up animation.
      const target = activeCourse.originY + Math.max(0, window.scrollY - documentTop);
      const tiles = activeCourse.tiles;
      let low = 0;
      let high = tiles.length - 1;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (tiles[middle].base.y < target) low = middle + 1;
        else high = middle;
      }
      const previous = Math.max(0, low - 1);
      const ySpan = Math.max(0.01, tiles[low].base.y - tiles[previous].base.y);
      const lead = 1.25 * clamp((target - activeCourse.originY) / 80);
      const front =
        target <= tiles[0].base.y
          ? 0
          : target >= tiles.at(-1)!.base.y
            ? Math.min(
                tiles.length + 1.5,
                tiles.length - 1 + lead + (target - tiles.at(-1)!.base.y) / 24,
              )
            : previous + clamp((target - tiles[previous].base.y) / ySpan) + lead;
      root.dataset.ftProgress = clamp(front / (tiles.length + 1.5)).toFixed(4);
      const nextVisible = new Set<number>();

      // Typically fewer than 80 tiles are visible; only the 2–3 contact tiles
      // need new polygons. Static standing/settled projections are cached.
      tiles.forEach((tile) => {
        if (tile.base.y + top < -70 || tile.base.y + top > window.innerHeight + 70) return;
        const binding = bindings.current.get(tile.index);
        if (!binding) return;
        nextVisible.add(tile.index);
        if (!visible.has(tile.index)) binding.node.style.visibility = "visible";
        const phase = clamp((front - tile.index) / 2.5);
        const angle = phase * phase * (3 - 2 * phase) * 78;
        if (Math.abs(angle - binding.angle) > 0.005) {
          applyProjection(
            binding,
            phase === 0 ? tile.standing : phase === 1 ? tile.settled : project(tile, angle),
          );
          binding.angle = angle;
        }
        // Saturation belongs to the contact, rather than the entire unfallen
        // course. In particular a future horizontal run must stay a quiet
        // physical outline, not a blue fence competing with the next record.
        const distanceFromContact = Math.abs(tile.index - (front - 1.25));
        const focus = 1 - clamp((distanceFromContact - 1.25) / 1.5);
        const restingOpacity = 0.17 + phase * 0.05;
        const tailFade = clamp((activeCourse.length - tile.distance) / 95);
        const starterPresence = tile.size > 1 ? 0.45 + clamp((tile.size - 1) / 2.2) * 0.45 : 0;
        const opacity =
          Math.max(restingOpacity + (1 - restingOpacity) * focus, starterPresence) * tailFade;
        if (Math.abs(opacity - binding.opacity) > 0.005) {
          binding.node.setAttribute("opacity", opacity.toFixed(3));
          binding.opacity = opacity;
        }
      });
      visible.forEach((index) => {
        if (!nextVisible.has(index)) {
          const binding = bindings.current.get(index);
          if (binding) binding.node.style.visibility = "hidden";
        }
      });
      visible = nextVisible;
    };
    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      if (disposed) return;
      root.dataset.ftActive = String(media.matches);
      if (!media.matches) {
        geometry = null;
        visible = new Set();
        setCourse(null);
        return;
      }
      const next = measureCourse(root);
      if (next?.signature !== geometry?.signature) {
        geometry = next;
        visible = new Set();
        setCourse(next);
      }
      schedule();
    };
    scheduleRef.current = schedule;
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    media.addEventListener("change", measure);
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      scheduleRef.current = null;
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    scheduleRef.current?.();
  }, [course]);

  return (
    <div className={`ft-track ${className}`.trim()} ref={rootRef}>
      {course && (
        <svg
          className="ft-track-visual"
          viewBox={`0 0 ${course.width} ${course.height}`}
          width={course.width}
          height={course.height}
          aria-hidden="true"
          focusable="false"
          data-ft-tile-count={course.tiles.length}
        >
          <defs>
            <symbol id={markId} viewBox="0 0 512 512" overflow="hidden">
              <image href="/concept/zapla-logo-dark.svg" width="1743" height="512" />
            </symbol>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width={course.width}
              height={course.height}
            >
              <rect width={course.width} height={course.height} fill="white" />
              {course.occlusions.map((rect, index) => (
                <rect key={index} {...rect} rx="12" fill="black" />
              ))}
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>
            {course.tiles.map((tile) => (
              <g
                className="ftd-tile"
                key={tile.index}
                data-ft-tile={tile.index}
                data-ft-size={tile.size}
                ref={(node) => {
                  if (!node) {
                    bindings.current.delete(tile.index);
                    return;
                  }
                  bindings.current.set(tile.index, {
                    node,
                    back: node.querySelector<SVGPolygonElement>(".ftd-back")!,
                    edgeLeft: node.querySelector<SVGPolygonElement>(".ftd-edge-left")!,
                    edgeRight: node.querySelector<SVGPolygonElement>(".ftd-edge-right")!,
                    crown: node.querySelector<SVGPolygonElement>(".ftd-crown")!,
                    face: node.querySelector<SVGGElement>(".ftd-face-plane")!,
                    shadow: node.querySelector<SVGPolygonElement>(".ftd-shadow")!,
                    angle: -1,
                    opacity: -1,
                  });
                }}
              >
                <polygon
                  className="ftd-shadow"
                  points={tile.standing.shadow}
                  style={tile.size > 1 ? { opacity: 0.045 } : undefined}
                />
                <polygon className="ftd-back" points={tile.standing.back} />
                <polygon className="ftd-edge ftd-edge-left" points={tile.standing.edgeLeft} />
                <polygon className="ftd-edge ftd-edge-right" points={tile.standing.edgeRight} />
                <polygon className="ftd-crown" points={tile.standing.crown} />
                <g className="ftd-face-plane" transform={tile.standing.face}>
                  <rect className="ftd-face" width="1" height="1" rx="0.17" />
                  <use href={`#${markId}`} x="0.015" y="0.015" width="0.97" height="0.97" />
                  <rect
                    className="ftd-rim"
                    x="0.015"
                    y="0.015"
                    width="0.97"
                    height="0.97"
                    rx="0.26"
                  />
                </g>
              </g>
            ))}
          </g>
        </svg>
      )}
      <div className="ft-track-body">{children}</div>
    </div>
  );
}
