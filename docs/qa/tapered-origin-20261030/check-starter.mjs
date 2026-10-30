import assert from "node:assert/strict";
import { getStarterSpec } from "../../../src/components/solutions/followThroughStarter.ts";
import {
  projectRoundedDomino,
  UNIT_ROUNDED_PATH,
} from "../../../src/components/solutions/followThroughGeometry.ts";

let checks = 0;
const near = (value, expected, tolerance = 1e-7) => {
  assert.ok(Math.abs(value - expected) <= tolerance, `${value} != ${expected}`);
  checks++;
};
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (p, amount) => ({ x: p.x * amount, y: p.y * amount });

function projection(spec, base, degrees) {
  const angle = (degrees * Math.PI) / 180;
  const cosine = Math.cos(angle),
    sine = Math.sin(angle);
  const width = { x: spec.width, y: -spec.width * 0.15 };
  const fallen = { x: 0, y: 28 * spec.size };
  return {
    width,
    projected: projectRoundedDomino({
      base,
      width,
      rise: add(scale(spec.upright, cosine), scale(fallen, sine)),
      thickness: add(scale(fallen, -cosine * 0.135), scale(spec.upright, sine * 0.135)),
      shadowVector: scale(fallen, 0.78 + sine * 0.18),
    }),
  };
}

// Bounds from the real rounded SVG cubic curves, including exact derivative
// extrema. Ground shadows can overlap; the solid bodies must remain separate.
function pathBounds(path, transform = [1, 0, 0, 1, 0, 0]) {
  const tokens = path.match(/[MLCZ]|-?\d*\.?\d+(?:e[-+]?\d+)?/gi);
  const [a, b, c, d, e, f] = transform;
  const map = (x, y) => ({ x: a * x + c * y + e, y: b * x + d * y + f });
  const points = [];
  let current = { x: 0, y: 0 },
    start = current,
    index = 0;
  const read = () => map(Number(tokens[index++]), Number(tokens[index++]));
  const cubic = (p0, p1, p2, p3, t) =>
    (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t * t * p2 + t ** 3 * p3;
  const roots = (p0, p1, p2, p3) => {
    const A = -p0 + 3 * p1 - 3 * p2 + p3,
      B = 2 * (p0 - 2 * p1 + p2),
      C = p1 - p0;
    if (Math.abs(A) < 1e-12) return Math.abs(B) < 1e-12 ? [] : [-C / B];
    const discriminant = B * B - 4 * A * C;
    return discriminant < 0
      ? []
      : [(-B - Math.sqrt(discriminant)) / (2 * A), (-B + Math.sqrt(discriminant)) / (2 * A)];
  };
  while (index < tokens.length) {
    const command = tokens[index++];
    if (command === "M") {
      current = read();
      start = current;
      points.push(current);
    } else if (command === "L") {
      current = read();
      points.push(current);
    } else if (command === "C") {
      const p0 = current,
        p1 = read(),
        p2 = read(),
        p3 = read();
      const ts = [0, 1, ...roots(p0.x, p1.x, p2.x, p3.x), ...roots(p0.y, p1.y, p2.y, p3.y)].filter(
        (t) => t >= 0 && t <= 1,
      );
      for (const t of ts)
        points.push({ x: cubic(p0.x, p1.x, p2.x, p3.x, t), y: cubic(p0.y, p1.y, p2.y, p3.y, t) });
      current = p3;
    } else if (command === "Z") current = start;
    else throw Error(`Unsupported SVG command ${command}`);
  }
  assert.ok(points.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)));
  return {
    left: Math.min(...points.map((p) => p.x)),
    right: Math.max(...points.map((p) => p.x)),
    top: Math.min(...points.map((p) => p.y)),
    bottom: Math.max(...points.map((p) => p.y)),
  };
}

const widths = [56, 44, 32, 24, 20, 20, 20];
const pitches = [52, 42, 32, 26, 24, 24, 24];
let baseY = 0,
  previousBody = null;
const restGaps = [];
for (let index = 0; index < widths.length; index++) {
  const spec = getStarterSpec(index);
  near(spec.width, widths[index]);
  near(spec.size, widths[index] / 20);
  near(spec.pitch, pitches[index]);
  const { projected } = projection(spec, { x: 0, y: baseY }, 0);
  const solid = pathBounds(projected.side);
  if (previousBody) {
    const gap = solid.top - previousBody.bottom;
    assert.ok(gap > 0, `Bodies overlap at rest before piece ${index}: ${gap}px`);
    checks++;
    restGaps.push(gap);
  }
  previousBody = solid;
  baseY += spec.pitch;
  for (let degrees = 0; degrees <= 78; degrees += 0.5) {
    const before = JSON.stringify(spec);
    const { width, projected: pose } = projection(spec, { x: 0, y: 0 }, degrees);
    // The transform's X axis is the physical face width. It must stay exactly
    // constant at every tipping angle, even as the projected height changes.
    const matrix = pose.face.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi).map(Number);
    near(Math.abs(matrix[0]), Math.abs(width.x), 0.00011);
    near(Math.abs(matrix[1]), Math.abs(width.y), 0.00011);
    const bounds = pathBounds(UNIT_ROUNDED_PATH, matrix);
    const back = pathBounds(pose.back),
      side = pathBounds(pose.side);
    assert.ok([bounds, back, side].every((r) => r.right >= r.left && r.bottom >= r.top));
    checks++;
    assert.equal(JSON.stringify(spec), before);
    checks++;
  }
}
for (const index of [4, 5, 20, 999]) {
  const spec = getStarterSpec(index);
  near(spec.width, 20);
  near(spec.pitch, 24);
  near(spec.upright.x, 4);
  near(spec.upright.y, -13);
}
for (const index of [-1, NaN, Infinity, -Infinity, 2.9]) {
  const spec = getStarterSpec(index);
  assert.ok(
    [spec.width, spec.size, spec.pitch, spec.upright.x, spec.upright.y].every(Number.isFinite),
  );
  checks++;
}
// Callers receive a fresh vector; one tile's mutation cannot resize another.
const first = getStarterSpec(0);
first.upright.x = 999;
near(getStarterSpec(0).upright.x, 8.4);
console.log(
  JSON.stringify(
    { passed: true, checks, widths, pitches, minimumSolidRestGapPx: Math.min(...restGaps) },
    null,
    2,
  ),
);
