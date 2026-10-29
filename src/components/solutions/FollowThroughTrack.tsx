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
  width: Point;
  upright: Point;
  fallen: Point;
  standing: Projection;
  settled: Projection;
};
type Course = { width: number; height: number; length: number; tiles: Tile[]; signature: string };
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
  tile: Pick<Tile, "base" | "width" | "upright" | "fallen">,
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
  const shadowLength = scale(tile.fallen, 0.78 + sine * 0.18);

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

  const content = scenes.map((scene) =>
    (scene.querySelector<HTMLElement>(".ft-content") ?? scene).getBoundingClientRect(),
  );
  const leftEdge = Math.min(...content.map((rect) => rect.left - bounds.left));
  const rightEdge = Math.max(...content.map((rect) => rect.right - bounds.left));
  // The page reserves 64–72px gutters. Hinge ± footprint stays outside content.
  const left = Math.max(24, leftEdge - 32);
  const right = Math.min(bounds.width - 24, rightEdge + 32);
  const start = Math.max(24, content[0].top - bounds.top + 12);
  const end = Math.min(bounds.height - 8, content.at(-1)!.bottom - bounds.top + 32);
  if (right - left < 200 || end - start < 150) return null;

  const crossings: { start: number; end: number }[] = [];
  scenes.forEach((scene, index) => {
    if (scene.dataset.ftCross !== "after" || !content[index + 1] || crossings.length >= 2) return;
    const before = content[index].bottom - bounds.top;
    const after = content[index + 1].top - bounds.top;
    // Never route a tile through content to manufacture an S. An unreserved
    // gap simply keeps the course on its current side.
    if (after - before >= 72) crossings.push({ start: before + 28, end: after - 28 });
  });

  const samples: Point[] = [{ x: left, y: start }];
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
  crossings.forEach((crossing) => {
    if (crossing.start <= current.y || crossing.end >= end) return;
    line({ x: side, y: crossing.start });
    const other = side === left ? right : left;
    const direction = other > side ? 1 : -1;
    const span = crossing.end - crossing.start;
    const middleRise = Math.min(32, span * 0.28);
    const radius = (span - middleRise) / 2;
    const handle = radius * 0.5522848;
    // Two round shoulders, rather than one huge flattened cubic whose first
    // tile would have to turn almost 90 degrees. A slight diagonal between
    // them keeps Y monotonic so native scroll can traverse the whole sweep.
    const firstTurn = { x: side + direction * radius, y: crossing.start + radius };
    curve(
      current,
      { x: side, y: crossing.start + handle },
      { x: firstTurn.x - direction * handle, y: firstTurn.y },
      firstTurn,
      20,
    );
    const secondTurn = { x: other - direction * radius, y: crossing.end - radius };
    line(secondTurn);
    curve(
      current,
      { x: secondTurn.x + direction * handle, y: secondTurn.y },
      { x: other, y: crossing.end - handle },
      { x: other, y: crossing.end },
      20,
    );
    side = other;
  });
  line({ x: side, y: end });

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
  const count = Math.max(3, Math.ceil(length / 24) + 1);
  const pitch = length / (count - 1);
  const tiles: Tile[] = [];
  let cursor = 1;

  for (let index = 0; index < count; index++) {
    const distance = index * pitch;
    while (cursor < distances.length - 1 && distances[cursor] < distance) cursor++;
    const a = samples[cursor - 1];
    const b = samples[cursor];
    const span = Math.max(0.001, distances[cursor] - distances[cursor - 1]);
    const tangent = { x: (b.x - a.x) / span, y: (b.y - a.y) / span };
    const base = mix(a, b, clamp((distance - distances[cursor - 1]) / span));
    // Width and fall axes follow the LOCAL tangent, including both broad bends.
    // Elevation stays fixed in the shared oblique overhead camera.
    const width = { x: tangent.y * 20 - tangent.x * 3, y: -tangent.x * 20 - tangent.y * 3 };
    const tile = {
      index,
      base,
      distance,
      width,
      upright: { x: 4, y: -13 },
      fallen: scale(tangent, 28),
    };
    tiles.push({ ...tile, standing: project(tile, 0), settled: project(tile, 78) });
  }

  return {
    width: bounds.width,
    height: bounds.height,
    length,
    tiles,
    signature: [
      bounds.width,
      bounds.height,
      left,
      right,
      start,
      end,
      ...crossings.flatMap((crossing) => [crossing.start, crossing.end]),
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
 * Shared follow-through brand course. The page owns its content and reserves
 * desktop gutters plus a clear gap after up to two data-ft-cross="after" scenes.
 * Mark scenes with data-ft-waypoint (or .ft-scene), with their readable content
 * inside .ft-content. Everything remains ordinary, complete document flow.
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
      const top = root.getBoundingClientRect().top;
      const target = window.innerHeight * 0.47 - top;
      const tiles = geometry.tiles;
      let low = 0;
      let high = tiles.length - 1;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (tiles[middle].base.y < target) low = middle + 1;
        else high = middle;
      }
      const previous = Math.max(0, low - 1);
      const ySpan = Math.max(0.01, tiles[low].base.y - tiles[previous].base.y);
      const front =
        target <= tiles[0].base.y
          ? 0
          : target >= tiles.at(-1)!.base.y + 34
            ? tiles.length + 1.5
            : previous + clamp((target - tiles[previous].base.y) / ySpan) + 1.25;
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
        const tailFade = clamp((tiles.at(-1)!.base.y - tile.base.y) / 130);
        const opacity = (restingOpacity + (1 - restingOpacity) * focus) * tailFade;
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
          </defs>
          {course.tiles.map((tile) => (
            <g
              className="ftd-tile"
              key={tile.index}
              data-ft-tile={tile.index}
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
              <polygon className="ftd-shadow" points={tile.standing.shadow} />
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
        </svg>
      )}
      <div className="ft-track-body">{children}</div>
    </div>
  );
}
