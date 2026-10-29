import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  projectRoundedDomino,
  UNIT_ROUNDED_PATH,
  type Point,
  type RoundedDominoProjection,
} from "./followThroughGeometry";
import "@/styles/follow-through-track.css";

type Projection = RoundedDominoProjection;
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
type Box = { x: number; y: number; width: number; height: number };
type Course = {
  width: number;
  height: number;
  length: number;
  seed: Box;
  originY: number;
  tiles: Tile[];
  occlusions: Box[];
  signature: string;
};
type Binding = {
  node: SVGGElement;
  back: SVGPathElement;
  side: SVGPathElement;
  face: SVGGElement;
  shadow: SVGPathElement;
  angle: number;
  opacity: number;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (point: Point, amount: number): Point => ({
  x: point.x * amount,
  y: point.y * amount,
});
const mix = (a: Point, b: Point, amount: number) => add(scale(a, 1 - amount), scale(b, amount));

function project(
  tile: Pick<Tile, "base" | "width" | "upright" | "fallen">,
  angle: number,
): Projection {
  const radians = (angle * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  return projectRoundedDomino({
    base: tile.base,
    width: tile.width,
    rise: add(scale(tile.upright, cosine), scale(tile.fallen, sine)),
    thickness: add(scale(tile.fallen, -cosine * 0.09), scale(tile.upright, sine * 0.09)),
    shadowVector: scale(tile.fallen, 0.7 + sine * 0.16),
  });
}

/** The sender mark stays inside its own clear column and tips away from text. */
function projectSeed(seed: Box, progress: number): Projection {
  const lift = ease(progress / 0.38);
  const tip = ease((progress - 0.28) / 0.6);
  const angle = tip * Math.PI * 0.44;
  const width = seed.width;
  const standing = mix({ x: 0, y: -seed.height }, { x: width * 0.2, y: -seed.height * 0.65 }, lift);
  const fall = { x: width * 0.09, y: width * 1.4 };
  return projectRoundedDomino({
    base: { x: seed.x + width / 2, y: seed.y + seed.height - lift * 18 * (1 - tip) },
    width: { x: width, y: -width * 0.15 * lift },
    rise: add(scale(standing, Math.cos(angle)), scale(fall, Math.sin(angle))),
    thickness: { x: -width * 0.085 * lift, y: width * 0.055 * lift },
    shadowVector: { x: -width * 0.5 * lift, y: width * 0.2 * lift },
  });
}

function bridgeTile(seed: Box, index: number) {
  const size = index === 0 ? 1.2 : 1;
  return {
    base: { x: seed.x + seed.width / 2 + index, y: seed.y + seed.height + 26 + index * 24 },
    width: { x: 20 * size, y: -3 * size },
    upright: { x: 4 * size, y: -13 * size },
    fallen: { x: 2 * size, y: 28 * size },
  };
}

function cubic(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
}

function measureCourse(root: HTMLElement): Course | null {
  const bounds = root.getBoundingClientRect();
  const seedNode = root.querySelector<HTMLElement>("[data-ft-seed]");
  const surfaceNode = root.querySelector<HTMLElement>("[data-ft-origin-surface]");
  const contentNodes = Array.from(
    root.querySelectorAll<HTMLElement>(".ft-content, [data-ft-content]"),
  );
  if (!seedNode || !surfaceNode || contentNodes.length < 2 || bounds.width < 200) return null;
  const relativeBox = (node: HTMLElement, padding = 0): Box => {
    const rect = node.getBoundingClientRect();
    return {
      x: rect.left - bounds.left - padding,
      y: rect.top - bounds.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    };
  };
  const seed = relativeBox(seedNode);
  if (seed.width < 4 || seed.height < 4) return null;
  const surface = relativeBox(surfaceNode);
  const content = contentNodes.map((node) => relativeBox(node));
  const left = Math.max(24, Math.min(...content.map((rect) => rect.x)) - 32);
  const right = Math.min(
    bounds.width - 24,
    Math.max(...content.map((rect) => rect.x + rect.width)) + 32,
  );
  const origin = { x: seed.x + seed.width / 2, y: seed.y + seed.height + 72 };
  const end = bounds.height - 12;
  if (right - left < 200 || end - origin.y < 300) return null;
  const crossings = Array.from(root.querySelectorAll<HTMLElement>('[data-ft-cross="through"]'))
    .slice(0, 3)
    .map((node) => {
      const rect = relativeBox(node);
      const depth = Math.min(500, Math.max(200, rect.height - 36));
      const middle = rect.y + rect.height / 2;
      return { start: middle - depth / 2, end: middle + depth / 2 };
    });
  const occlusions = Array.from(
    new Set([
      ...contentNodes,
      surfaceNode,
      ...root.querySelectorAll<HTMLElement>("[data-ft-occluder]"),
    ]),
  ).map((node) => relativeBox(node, 10));
  const samples: Point[] = [origin];
  let current = origin;
  let side = right;
  const line = (destination: Point) => {
    const steps = Math.max(
      1,
      Math.ceil(Math.hypot(destination.x - current.x, destination.y - current.y) / 14),
    );
    const start = current;
    for (let step = 1; step <= steps; step++) samples.push(mix(start, destination, step / steps));
    current = destination;
  };
  const curve = (b: Point, c: Point, d: Point, steps = 50) => {
    const start = current;
    for (let step = 1; step <= steps; step++) samples.push(cubic(start, b, c, d, step / steps));
    current = d;
  };
  const driftTo = (y: number) => {
    while (current.y < y - 0.1) {
      const nextY = Math.min(y, current.y + 380);
      const span = nextY - current.y;
      const next = { x: side + Math.sin(nextY / 470) * 8, y: nextY };
      curve(
        { x: current.x, y: current.y + span * 0.35 },
        { x: next.x, y: nextY - span * 0.35 },
        next,
        Math.max(12, Math.ceil(span / 12)),
      );
    }
  };

  // First contact goes beneath the hero surface and emerges at the far shoulder.
  // It never crosses the headline, CTA, customer copy or open page as a crossbar.
  const emergeY = Math.max(origin.y + 180, surface.y + surface.height + 48);
  curve(
    { x: origin.x - 45, y: origin.y + 65 },
    { x: right, y: emergeY - 115 },
    { x: right, y: emergeY },
    100,
  );
  crossings.forEach((crossing) => {
    if (crossing.start <= current.y + 30 || crossing.end >= end - 650) return;
    driftTo(crossing.start);
    const other = side === left ? right : left;
    const span = crossing.end - crossing.start;
    curve(
      { x: current.x, y: crossing.start + span * 0.46 },
      { x: other, y: crossing.end - span * 0.46 },
      { x: other, y: crossing.end },
      100,
    );
    side = other;
  });
  const final = root.querySelector<HTMLElement>("[data-ft-exit]");
  if (final) {
    const finalY = relativeBox(final).y;
    const exitStart = Math.max(current.y + 55, finalY - 670);
    const exitEnd = Math.max(exitStart + 480, finalY - 75);
    driftTo(exitStart);
    // A long shallow departure begins during the preceding section. No final-CTA hook.
    curve(
      { x: current.x - 15, y: exitStart + (exitEnd - exitStart) * 0.34 },
      { x: -25, y: exitStart + (exitEnd - exitStart) * 0.7 },
      { x: -75, y: exitEnd },
      80,
    );
    line({ x: -75, y: Math.max(current.y + 1, end) });
  } else driftTo(end);

  const distances = [0];
  for (let i = 1; i < samples.length; i++)
    distances.push(
      distances[i - 1] +
        Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y),
    );
  const length = distances.at(-1)!;
  const tiles: Tile[] = [];
  let cursor = 1;
  for (let index = 0, distance = 0; distance <= length; index++) {
    while (cursor < distances.length - 1 && distances[cursor] < distance) cursor++;
    const a = samples[cursor - 1];
    const b = samples[cursor];
    const span = Math.max(0.001, distances[cursor] - distances[cursor - 1]);
    const tangent = { x: (b.x - a.x) / span, y: (b.y - a.y) / span };
    const size = 1;
    const tile = {
      index,
      distance,
      size,
      base: mix(a, b, clamp((distance - distances[cursor - 1]) / span)),
      width: scale({ x: tangent.y * 20 - tangent.x * 3, y: -tangent.x * 20 - tangent.y * 3 }, size),
      upright: scale({ x: 4, y: -13 }, size),
      fallen: scale(tangent, 28 * size),
    };
    tiles.push({ ...tile, standing: project(tile, 0), settled: project(tile, 78) });
    distance += 24;
  }
  return {
    width: bounds.width,
    height: bounds.height,
    seed,
    originY: origin.y,
    length,
    tiles,
    occlusions,
    signature: [
      bounds.width,
      bounds.height,
      left,
      right,
      seed.x,
      seed.y,
      seed.width,
      seed.height,
      ...crossings.flatMap((c) => [c.start, c.end]),
      ...occlusions.flatMap((r) => [r.x, r.y, r.width, r.height]),
    ]
      .map((value) => value.toFixed(1))
      .join("/"),
  };
}

function applyProjection(binding: Binding, projection: Projection) {
  binding.back.setAttribute("d", projection.back);
  binding.side.setAttribute("d", projection.side);
  binding.face.setAttribute("transform", projection.face);
  binding.shadow.setAttribute("d", projection.shadow);
}
function makeBinding(node: SVGGElement): Binding {
  return {
    node,
    back: node.querySelector<SVGPathElement>(".ftd-back")!,
    side: node.querySelector<SVGPathElement>(".ftd-side")!,
    face: node.querySelector<SVGGElement>(".ftd-face-plane")!,
    shadow: node.querySelector<SVGPathElement>(".ftd-shadow")!,
    angle: -1,
    opacity: -1,
  };
}
function MarkSymbol({ id }: { id: string }) {
  return (
    <symbol id={id} viewBox="0 0 512 512" overflow="hidden">
      <image href="/concept/zapla-logo-dark.svg" width="1743" height="512" />
    </symbol>
  );
}
function DominoShape({ projection, markId }: { projection: Projection; markId: string }) {
  return (
    <>
      <path className="ftd-shadow" d={projection.shadow} />
      <path className="ftd-back" d={projection.back} />
      <path className="ftd-side" d={projection.side} />
      <g className="ftd-face-plane" transform={projection.face}>
        <path className="ftd-face" d={UNIT_ROUNDED_PATH} />
        <use href={`#${markId}`} width="1" height="1" />
        <path className="ftd-rim" d={UNIT_ROUNDED_PATH} />
      </g>
    </>
  );
}

/** A single passive-scroll course; the message's native flat mark supplies its origin. */
export function FollowThroughTrack({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bindings = useRef(new Map<number, Binding>());
  const seedBinding = useRef<Binding | null>(null);
  const bridgeBindings = useRef(new Map<number, Binding>());
  const scheduleRef = useRef<(() => void) | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const markId = `ftd-mark-${useId().replace(/:/g, "")}`;
  const maskId = `${markId}-occlusion`;
  const seedMarkId = `${markId}-seed`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
    );
    let geometry: Course | null = null;
    let frame = 0;
    let disposed = false;
    let visible = new Set<number>();
    const update = () => {
      frame = 0;
      if (disposed || !media.matches || !geometry || !seedBinding.current) return;
      const active = geometry;
      const top = root.getBoundingClientRect().top;
      const documentTop = top + window.scrollY;
      const seedCentre = documentTop + active.seed.y + active.seed.height / 2;
      const launchScroll = Math.max(0, seedCentre - window.innerHeight * 0.68);
      const travel = Math.max(0, window.scrollY - launchScroll);
      const intro = clamp(travel / 180);
      const reveal = ease((travel - 145) / 60);
      const target = active.originY + Math.max(0, travel - 180);
      const tiles = active.tiles;
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
        travel <= 180
          ? 0
          : target >= tiles.at(-1)!.base.y
            ? Math.min(
                tiles.length + 1.5,
                tiles.length - 1 + (target - tiles.at(-1)!.base.y) / 24 + 1.25,
              )
            : previous + clamp((target - tiles[previous].base.y) / ySpan) + 1.25;
      root.dataset.ftIntro = intro.toFixed(4);
      root.dataset.ftProgress = clamp(front / (tiles.length + 1.5)).toFixed(4);
      root.dataset.ftSeedState =
        intro === 0 ? "flat" : intro < 0.35 ? "lifting" : intro < 0.9 ? "tipping" : "handed-off";
      const seed = seedBinding.current;
      applyProjection(seed, projectSeed(active.seed, intro));
      const seedOpacity = 1 - ease((intro - 0.83) / 0.17);
      seed.node.setAttribute("opacity", seedOpacity.toFixed(3));
      seed.node.style.visibility = seedOpacity > 0.001 ? "visible" : "hidden";
      seed.shadow.style.opacity = (ease(intro / 0.38) * 0.045).toFixed(3);
      seed.back.style.opacity = ease(intro / 0.38).toFixed(3);
      seed.side.style.opacity = ease(intro / 0.38).toFixed(3);
      for (let index = 0; index < 2; index++) {
        const bridge = bridgeBindings.current.get(index);
        if (!bridge) continue;
        const phase = ease((intro - (index === 0 ? 0.58 : 0.74)) / 0.24);
        applyProjection(bridge, project(bridgeTile(active.seed, index), phase * 78));
        const revealBridge = ease((intro - 0.14 - index * 0.06) / 0.18);
        const fadeBridge = 1 - ease((intro - 0.9) / 0.1);
        const focus = index === 0 ? ease((intro - 0.45) / 0.15) : ease((intro - 0.65) / 0.15);
        bridge.node.setAttribute(
          "opacity",
          (revealBridge * fadeBridge * (0.22 + focus * 0.78)).toFixed(3),
        );
      }
      root.dataset.ftReady = "true";
      const nextVisible = new Set<number>();
      tiles.forEach((tile) => {
        if (tile.base.y + top < -70 || tile.base.y + top > window.innerHeight + 70) return;
        const binding = bindings.current.get(tile.index);
        if (!binding) return;
        nextVisible.add(tile.index);
        if (!visible.has(tile.index)) binding.node.style.visibility = "visible";
        const phase = clamp((front - tile.index) / 2.5);
        const angle = ease(phase) * 78;
        if (Math.abs(angle - binding.angle) > 0.005) {
          applyProjection(
            binding,
            phase === 0 ? tile.standing : phase === 1 ? tile.settled : project(tile, angle),
          );
          binding.angle = angle;
        }
        const focus = 1 - clamp((Math.abs(tile.index - (front - 1.25)) - 1.25) / 1.5);
        const resting = 0.17 + phase * 0.05;
        const opacity =
          (resting + (1 - resting) * focus) * reveal * clamp((active.length - tile.distance) / 95);
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
        root.dataset.ftReady = "false";
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
    const seed = root.querySelector<HTMLElement>("[data-ft-seed]");
    const surface = root.querySelector<HTMLElement>("[data-ft-origin-surface]");
    if (seed) observer.observe(seed);
    if (surface) observer.observe(surface);
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
        <>
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
              <MarkSymbol id={markId} />
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={course.width}
                height={course.height}
              >
                <rect width={course.width} height={course.height} fill="white" />
                {course.occlusions.map((rect, i) => (
                  <rect key={i} {...rect} rx="12" fill="black" />
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
                    bindings.current.set(tile.index, makeBinding(node));
                  }}
                >
                  <DominoShape projection={tile.standing} markId={markId} />
                </g>
              ))}
            </g>
          </svg>
          <svg
            className="ft-seed-visual"
            viewBox={`0 0 ${course.width} ${course.height}`}
            width={course.width}
            height={course.height}
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <MarkSymbol id={seedMarkId} />
              <clipPath id={`${seedMarkId}-clip`}>
                <rect
                  x={course.seed.x - 4}
                  y={course.seed.y - 10}
                  width={course.seed.width + 14}
                  height={course.seed.height + 100}
                  rx="3"
                />
              </clipPath>
            </defs>
            <g clipPath={`url(#${seedMarkId}-clip)`}>
              {[1, 0].map((index) => (
                <g
                  key={index}
                  data-ft-bridge={index}
                  opacity="0"
                  ref={(node) => {
                    if (!node) {
                      bridgeBindings.current.delete(index);
                      return;
                    }
                    bridgeBindings.current.set(index, makeBinding(node));
                  }}
                >
                  <DominoShape
                    projection={project(bridgeTile(course.seed, index), 0)}
                    markId={seedMarkId}
                  />
                </g>
              ))}
              <g
                className="ftd-seed"
                data-ft-seed-tile
                ref={(node) => {
                  seedBinding.current = node ? makeBinding(node) : null;
                }}
              >
                <DominoShape projection={projectSeed(course.seed, 0)} markId={seedMarkId} />
              </g>
            </g>
          </svg>
        </>
      )}
      <div className="ft-track-body">{children}</div>
    </div>
  );
}
