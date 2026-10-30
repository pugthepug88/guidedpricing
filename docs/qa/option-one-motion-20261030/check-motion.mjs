import assert from "node:assert/strict";
import {
  buildScrollTimeline,
  dampMotion,
  sampleScrollTimeline,
} from "../../../src/components/solutions/followThroughMotion.ts";

let checks = 0;
const near = (actual, expected, tolerance = 1e-8) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
  checks++;
};

// Equal path-distance steps include a long, almost horizontal corner. Its very
// small Y changes must not compress the scroll budget or create lateral bursts.
const corner = Array.from({ length: 301 }, (_, index) => ({
  distance: index * 24,
  base: {
    y:
      index < 100
        ? index * 20
        : index < 200
          ? 2000 + (index - 100) * 0.05
          : 2005 + (index - 200) * 20,
  },
}));
const straight = corner.map((point, index) => ({ ...point, base: { y: index * 20 } }));
const timeline = buildScrollTimeline(corner, 900, 0, 4500);
const straightTimeline = buildScrollTimeline(straight, 900, 0, 4500);
near(sampleScrollTimeline(timeline, -200), 0);
near(sampleScrollTimeline(timeline, 4500), 7200);
near(sampleScrollTimeline(timeline, Infinity), 7200);
near(sampleScrollTimeline(timeline, -Infinity), 0);
near(sampleScrollTimeline(timeline, NaN), 0);
const expectedSlope = 7200 / 4500;
let previous = 0;
for (let scroll = 0; scroll <= 4500; scroll += 3) {
  const distance = sampleScrollTimeline(timeline, scroll);
  near(distance, sampleScrollTimeline(straightTimeline, scroll));
  near(
    sampleScrollTimeline(timeline, scroll + 0.01) - distance,
    Math.min(0.01, 4500 - scroll) * expectedSlope,
  );
  assert.ok(distance >= previous);
  checks++;
  previous = distance;
}
// Traversing exactly the same positions in reverse returns exactly the same
// geometry, without a separate direction branch or cumulative wheel deltas.
for (let scroll = 4500; scroll >= 0; scroll -= 3) {
  near(sampleScrollTimeline(timeline, scroll), scroll * expectedSlope);
}

// Timing depends on elapsed time, not the number of animation frames.
const run = (steps) => {
  let value = 0;
  for (const elapsed of steps) value = dampMotion(value, 100, elapsed);
  return value;
};
near(run(Array(60).fill(1000 / 60)), run(Array(30).fill(1000 / 30)));
near(run(Array(120).fill(1000 / 120)), run([1000]));
for (const current of [-100, 0, 40, 100]) {
  for (const target of [-100, 0, 40, 100]) {
    for (const elapsed of [0, 1, 8, 16, 33, 100, 1000, 10000]) {
      const value = dampMotion(current, target, elapsed);
      assert.ok(value >= Math.min(current, target) && value <= Math.max(current, target));
      assert.ok(Math.abs(target - value) <= Math.abs(target - current));
      checks += 2;
    }
  }
}
near(dampMotion(10, 100, -1), 10);
near(dampMotion(10, 100, 16, 0), 100);
near(dampMotion(NaN, 100, 16), 100);
near(dampMotion(10, NaN, 16), 10);
for (const points of [[], [{ distance: NaN, base: { y: NaN } }]]) {
  const empty = buildScrollTimeline(points, NaN, NaN, NaN);
  assert.ok(Number.isFinite(sampleScrollTimeline(empty, 0)));
  assert.ok(empty.endScroll > empty.startScroll);
  checks += 2;
}
const reverseBudget = buildScrollTimeline(corner, 900, 100, -100);
assert.ok(reverseBudget.endScroll > reverseBudget.startScroll);
checks++;

console.log(
  JSON.stringify(
    {
      passed: true,
      checks,
      arcSpeedPerScrollPixel: expectedSlope,
      horizontalSectionAcceleration: 0,
      responseMs: 110,
    },
    null,
    2,
  ),
);
