import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import {
  buildVisibleSectionTimeline,
  sampleScrollTimeline,
  dampMotion,
  type ScrollTimeline,
} from "./followThroughMotion";
import {
  projectRoundedDomino,
  UNIT_ROUNDED_PATH,
  type Point,
  type RoundedDominoProjection,
} from "./followThroughGeometry";
import "@/styles/follow-through-track.css";

type Projection = RoundedDominoProjection;
type Variant = "follow" | "quote";
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
type Corner = { x: number; y: number };
type Occlusion = Box & {
  corners: [Corner, Corner, Corner, Corner];
  kind: "surface" | "text";
};
type Course = {
  width: number;
  height: number;
  viewportHeight: number;
  length: number;
  timeline: ScrollTimeline;
  tiles: Tile[];
  occlusions: Occlusion[];
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
  quiet: number;
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
    thickness: add(scale(tile.fallen, -cosine * 0.135), scale(tile.upright, sine * 0.135)),
    shadowVector: scale(tile.fallen, 0.78 + sine * 0.18),
  });
}

function cubic(a: Point, b: Point, c: Point, d: Point, t: number): Point {
  return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
}

/** Painted surfaces and copy columns interrupt the course; transparent grid gutters stay open. */
function textBounds(node: HTMLElement): DOMRect {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const rects: DOMRect[] = [];
  while (walker.nextNode()) {
    const text = walker.currentNode;
    if (!text.textContent?.trim() || text.parentElement?.closest("[data-ft-starter]")) continue;
    const range = document.createRange();
    range.selectNodeContents(text);
    const rect = range.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) rects.push(rect);
  }
  if (!rects.length) return node.getBoundingClientRect();
  const left = Math.min(...rects.map((r) => r.left));
  const top = Math.min(...rects.map((r) => r.top));
  return new DOMRect(
    left,
    top,
    Math.max(...rects.map((r) => r.right)) - left,
    Math.max(...rects.map((r) => r.bottom)) - top,
  );
}

function pointCovered(point: Point, box: Occlusion): boolean {
  if (
    point.x < box.x ||
    point.x > box.x + box.width ||
    point.y < box.y ||
    point.y > box.y + box.height
  )
    return false;
  const [tl, tr, br, bl] = box.corners;
  const corners = [
    {
      x: box.x + tl.x,
      y: box.y + tl.y,
      r: tl,
      inside: point.x < box.x + tl.x && point.y < box.y + tl.y,
    },
    {
      x: box.x + box.width - tr.x,
      y: box.y + tr.y,
      r: tr,
      inside: point.x > box.x + box.width - tr.x && point.y < box.y + tr.y,
    },
    {
      x: box.x + box.width - br.x,
      y: box.y + box.height - br.y,
      r: br,
      inside: point.x > box.x + box.width - br.x && point.y > box.y + box.height - br.y,
    },
    {
      x: box.x + bl.x,
      y: box.y + box.height - bl.y,
      r: bl,
      inside: point.x < box.x + bl.x && point.y > box.y + box.height - bl.y,
    },
  ];
  return !corners.some(
    (c) =>
      c.inside &&
      c.r.x > 0 &&
      c.r.y > 0 &&
      ((point.x - c.x) / c.r.x) ** 2 + ((point.y - c.y) / c.r.y) ** 2 > 1,
  );
}

function measureOcclusions(root: HTMLElement, bounds: DOMRect): Occlusion[] {
  const scopes = Array.from(
    root.querySelectorAll<HTMLElement>(
      ".ft-content, [data-ft-content], [data-ft-origin-surface], [data-ft-occluder]",
    ),
  );
  const candidates = new Set<HTMLElement>();
  scopes.forEach((scope) => {
    candidates.add(scope);
    scope.querySelectorAll<HTMLElement>("*").forEach((node) => candidates.add(node));
  });
  const painted = [...candidates].filter((node) => {
    if (!(node instanceof HTMLElement) || node.closest("[data-ft-seed]")) return false;
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0)
      return false;
    const rect = node.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return false;
    const color = style.backgroundColor;
    const background = color !== "transparent" && !/rgba\([^)]*,\s*0\s*\)$/.test(color);
    const radius = parseFloat(style.borderTopLeftRadius);
    const borderedCard =
      radius > 0 &&
      [
        style.borderTopWidth,
        style.borderRightWidth,
        style.borderBottomWidth,
        style.borderLeftWidth,
      ].some((width) => parseFloat(width) > 0);
    return (
      background ||
      style.backgroundImage !== "none" ||
      borderedCard ||
      /^(IMG|VIDEO|CANVAS)$/.test(node.tagName)
    );
  });
  // An opaque card already protects its descendants; avoid hundreds of redundant masks.
  const surfaces = painted.filter(
    (node) => !painted.some((other) => other !== node && other.contains(node)),
  );
  const occlusions: Occlusion[] = surfaces.map((node) => {
    const rect = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    const corner = (value: string): Corner => {
      const [horizontal, vertical = horizontal] = value.split(/\s+/);
      const dimension = (token: string, size: number) =>
        Math.max(0, Math.min(size / 2, parseFloat(token) * (token.endsWith("%") ? size / 100 : 1)));
      return { x: dimension(horizontal, rect.width), y: dimension(vertical, rect.height) };
    };
    return {
      x: rect.left - bounds.left,
      y: rect.top - bounds.top,
      width: rect.width,
      height: rect.height,
      corners: [
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomRightRadius,
        style.borderBottomLeftRadius,
      ].map(corner) as Occlusion["corners"],
      kind: "surface",
    };
  });
  const copyNodes = Array.from(
    root.querySelectorAll<HTMLElement>(
      ".ft-copy, .qf-hero-copy, .qf-opening-foot > span, .qfj-copy, .qf-human-grid > header, .qf-adoption-copy, .qf-questions-grid > header, .ft-final > .ft-content, .qf-final > .qf-wrap",
    ),
  ).filter((node) => !surfaces.some((surface) => surface.contains(node)));
  const standalone = [...candidates].filter(
    (node) =>
      node instanceof HTMLElement &&
      node.matches("p, h1, h2, h3, h4, a, button, dt, dd, summary, legend") &&
      !node.closest("[data-ft-seed]") &&
      !surfaces.some((surface) => surface.contains(node)) &&
      !copyNodes.some((copy) => copy.contains(node)),
  );
  const copy = copyNodes.map((node) => ({ node, wholeBlock: true }));
  standalone
    .filter((node) => !standalone.some((other) => other !== node && other.contains(node)))
    .forEach((node) => copy.push({ node, wholeBlock: false }));
  for (const { node, wholeBlock } of copy) {
    const style = getComputedStyle(node);
    if (style.visibility === "hidden" || Number(style.opacity) === 0) continue;
    let rect = node.getBoundingClientRect();
    if (!wholeBlock && !node.matches("button, summary")) {
      rect = textBounds(node);
    }
    if (rect.width < 1 || rect.height < 1) continue;
    occlusions.push({
      x: rect.left - bounds.left - 8,
      y: rect.top - bounds.top - 8,
      width: rect.width + 16,
      height: rect.height + 16,
      corners: Array.from({ length: 4 }, () => ({ x: 5, y: 5 })) as Occlusion["corners"],
      kind: "text",
    });
  }
  return occlusions;
}

function occlusionPath({ x, y, width, height, corners: [tl, tr, br, bl] }: Occlusion): string {
  return [
    `M${x + tl.x},${y}`,
    `H${x + width - tr.x}Q${x + width},${y} ${x + width},${y + tr.y}`,
    `V${y + height - br.y}Q${x + width},${y + height} ${x + width - br.x},${y + height}`,
    `H${x + bl.x}Q${x},${y + height} ${x},${y + height - bl.y}`,
    `V${y + tl.y}Q${x},${y} ${x + tl.x},${y}Z`,
  ].join(" ");
}

function measureCourse(root: HTMLElement, variant: Variant): Course | null {
  const bounds = root.getBoundingClientRect();
  const starter = root.querySelector<HTMLElement>("[data-ft-starter]");
  const surfaceNode = root.querySelector<HTMLElement>("[data-ft-origin-surface]");
  const contentNodes = Array.from(
    root.querySelectorAll<HTMLElement>(".ft-content, [data-ft-content]"),
  );
  if (!starter || !surfaceNode || contentNodes.length < 2 || bounds.width < 200) return null;
  const relativeBox = (node: HTMLElement, padding = 0): Box => {
    const rect = node.getBoundingClientRect();
    return {
      x: rect.left - bounds.left - padding,
      y: rect.top - bounds.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    };
  };
  const documentTop = bounds.top + window.scrollY;
  const seed = relativeBox(starter);
  if (seed.width < 4 || seed.height < 4) return null;
  const surface = relativeBox(surfaceNode);
  const content = contentNodes.map((node) => relativeBox(node));
  const left = Math.max(24, Math.min(...content.map((rect) => rect.x)) - 32);
  const right = Math.min(
    bounds.width - 24,
    Math.max(...content.map((rect) => rect.x + rect.width)) + 32,
  );
  const origin = { x: seed.x + seed.width / 2, y: seed.y + 27 };
  const end = bounds.height - 12;
  if (right - left < 200 || end - origin.y < 300) return null;
  const crossingNodes = Array.from(root.querySelectorAll<HTMLElement>('[data-ft-cross="through"]'));
  const launchSurface = root.querySelector<HTMLElement>(".qf-launch-canvas");
  if (variant === "quote" && launchSurface && !crossingNodes.includes(launchSurface))
    crossingNodes.push(launchSurface);
  const crossings = crossingNodes.slice(0, variant === "quote" ? 4 : 3).map((node) => {
    const rect = relativeBox(node);
    const depth = Math.min(760, Math.max(440, rect.height + 140));
    const middle = rect.y + rect.height / 2;
    return { start: middle - depth / 2, end: middle + depth / 2 };
  });
  const occlusions = measureOcclusions(root, bounds);
  const samples: Point[] = [origin];
  let current = origin;
  let side =
    variant === "follow" ? right : Math.max(left + 80, Math.min(right - 80, origin.x - 24));
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

  // One page-anchored upright starter. Its next pieces follow the same route,
  // camera and clock; there is no fixed-header copy or separate handoff.
  if (variant === "follow") {
    const shoulderY = Math.max(current.y + 170, surface.y + 60);
    curve(
      { x: current.x + 8, y: current.y + 48 },
      { x: right, y: shoulderY - 110 },
      { x: right, y: shoulderY },
      70,
    );
    side = right;
    driftTo(Math.max(shoulderY + 1, surface.y + surface.height - 15));
  } else {
    const gutter = Math.max(left + 100, Math.min(surface.x - 35, origin.x + 200));
    const landing = Math.max(origin.y + 210, surface.y + surface.height + 80);
    curve(
      { x: current.x, y: current.y + 80 },
      { x: gutter, y: landing - 100 },
      { x: gutter, y: landing },
      80,
    );
    side = gutter;
  }
  crossings.forEach((crossing, index) => {
    if (crossing.end <= current.y + 90 || crossing.end >= end - 650) return;
    const start = Math.max(crossing.start, current.y + 30);
    driftTo(start);
    const other = variant === "quote" && index === 0 ? right : side === left ? right : left;
    const span = Math.max(440, crossing.end - start);
    curve(
      { x: current.x, y: start + span * 0.48 },
      { x: other, y: start + span * 0.52 },
      { x: other, y: start + span },
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
    const size = index === 0 ? 1.6 : 1;
    const tile = {
      index,
      distance,
      size,
      base: mix(a, b, clamp((distance - distances[cursor - 1]) / span)),
      width: scale({ x: tangent.y * 20 - tangent.x * 3, y: -tangent.x * 20 - tangent.y * 3 }, size),
      upright: scale(index === 0 ? { x: 3, y: -18 } : { x: 4, y: -13 }, size),
      fallen: scale(tangent, 28 * size),
    };
    tiles.push({ ...tile, standing: project(tile, 0), settled: project(tile, 78) });
    distance += index === 0 ? 32 : 24;
  }
  return {
    width: bounds.width,
    height: bounds.height,
    viewportHeight: window.innerHeight,
    timeline: buildVisibleSectionTimeline(
      tiles.map((tile) => ({
        distance: tile.distance,
        base: tile.base,
        exposed:
          tile.base.x > 8 &&
          tile.base.x < bounds.width - 8 &&
          !occlusions.some((box) => pointCovered(tile.base, box)),
      })),
      documentTop,
      Math.min(window.innerHeight * 0.52, origin.y),
      documentTop + end - window.innerHeight * 0.52,
      length + 60,
      Array.from(root.querySelectorAll<HTMLElement>("[data-ft-waypoint]")).map(
        (node) => documentTop + relativeBox(node).y - window.innerHeight * 0.2,
      ),
    ),
    length,
    tiles,
    occlusions,
    signature: [
      bounds.width,
      bounds.height,
      window.innerHeight,
      left,
      right,
      seed.x,
      seed.y,
      seed.width,
      seed.height,
      ...crossings.flatMap((c) => [c.start, c.end]),
      ...occlusions.flatMap((r) => [
        r.x,
        r.y,
        r.width,
        r.height,
        ...r.corners.flatMap((corner) => [corner.x, corner.y]),
      ]),
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
    quiet: -1,
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

/** One page-anchored cascade driven by smoothed distance along the route. */
export function FollowThroughTrack({
  children,
  className = "",
  variant = "follow",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
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
      "(min-width: 1100px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
    );
    let geometry: Course | null = null;
    let frame = 0;
    let disposed = false;
    let visible = new Set<number>();
    let distanceNow = 0;
    let initialPosition = true;
    let previousTime = 0;
    const update = (now: number) => {
      frame = 0;
      if (disposed || !media.matches || !geometry) return;
      const active = geometry;
      const top = root.getBoundingClientRect().top;
      const travel = Math.max(0, window.scrollY);
      const delta = previousTime ? Math.min(1000, now - previousTime) : 16;
      previousTime = now;
      const targetDistance = sampleScrollTimeline(active.timeline, travel);
      if (initialPosition) {
        distanceNow = targetDistance;
        initialPosition = false;
      } else distanceNow = dampMotion(distanceNow, targetDistance, delta, 40, 24);
      if (Math.abs(targetDistance - distanceNow) < 0.03) distanceNow = targetDistance;
      const tiles = active.tiles;
      let low = 0;
      let high = tiles.length - 1;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (tiles[middle].distance < distanceNow) low = middle + 1;
        else high = middle;
      }
      const previous = Math.max(0, low - 1);
      const span = Math.max(0.01, tiles[low].distance - tiles[previous].distance);
      const front =
        distanceNow >= tiles.at(-1)!.distance
          ? tiles.length - 1 + (distanceNow - tiles.at(-1)!.distance) / 24
          : previous + clamp((distanceNow - tiles[previous].distance) / span);
      root.dataset.ftProgress = clamp(distanceNow / active.length).toFixed(4);
      root.dataset.ftDistance = distanceNow.toFixed(2);
      root.dataset.ftTarget = targetDistance.toFixed(2);
      root.dataset.ftSeedState = front === 0 ? "upright" : front < 2.5 ? "tipping" : "handed-off";
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
        // Preserve the original trail: standing pieces stay blue; only pieces
        // already behind the contact settle into the quieter grey-blue state.
        const quiet = clamp((front - tile.index - 4) / 2.5);
        const opacity = (1 - quiet * 0.62) * clamp((active.length - tile.distance) / 95);
        const state = phase === 0 ? "standing" : phase < 1 ? "contact" : "settled";
        if (binding.node.dataset.ftState !== state) binding.node.dataset.ftState = state;
        if (Math.abs(quiet - binding.quiet) > 0.005) {
          binding.node.style.filter = `saturate(${(1 - quiet * 0.65).toFixed(3)})`;
          binding.node.dataset.ftQuiet = quiet.toFixed(3);
          binding.quiet = quiet;
        }
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
      if (Math.abs(targetDistance - distanceNow) > 0.03) schedule();
      else previousTime = 0;
    };
    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      if (disposed) return;
      root.dataset.ftActive = String(media.matches);
      if (!media.matches) {
        geometry = null;
        initialPosition = true;
        previousTime = 0;
        visible = new Set();
        root.dataset.ftReady = "false";
        setCourse(null);
        return;
      }
      const next = measureCourse(root, variant);
      if (next?.signature !== geometry?.signature) {
        geometry = next;
        initialPosition = true;
        previousTime = 0;
        visible = new Set();
        setCourse(next);
      }
      schedule();
    };
    scheduleRef.current = schedule;
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    const starter = root.querySelector<HTMLElement>("[data-ft-starter]");
    const surface = root.querySelector<HTMLElement>("[data-ft-origin-surface]");
    if (starter) observer.observe(starter);
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
  }, [variant]);
  useEffect(() => {
    scheduleRef.current?.();
  }, [course]);

  return (
    <div className={`ft-track ${className}`.trim()} ref={rootRef} data-ft-variant={variant}>
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
            {import.meta.env.DEV && (
              <metadata data-ft-clock>{JSON.stringify(course.timeline)}</metadata>
            )}
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
                {course.occlusions.map((occlusion, i) => (
                  <path
                    key={i}
                    d={occlusionPath(occlusion)}
                    data-ft-mask-kind={occlusion.kind}
                    fill="black"
                  />
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
                  data-ft-physical-width={20 * tile.size}
                  data-ft-distance={tile.distance}
                  data-ft-exposed={
                    tile.base.x > 8 &&
                    tile.base.x < course.width - 8 &&
                    !course.occlusions.some((box) => pointCovered(tile.base, box))
                      ? "true"
                      : "false"
                  }
                  data-ft-starter-piece={tile.index === 0 ? "true" : undefined}
                  data-ft-base-x={tile.base.x.toFixed(1)}
                  data-ft-base-y={tile.base.y.toFixed(1)}
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
        </>
      )}
      <div className="ft-track-body">{children}</div>
    </div>
  );
}
