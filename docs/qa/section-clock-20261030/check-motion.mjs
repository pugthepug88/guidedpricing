import assert from "node:assert/strict";
import {
  buildSectionTimeline,
  buildScrollTimeline,
  buildVisibleSectionTimeline,
  dampMotion,
  sampleScrollTimeline,
} from "../../../src/components/solutions/followThroughMotion.ts";
let checks = 0;
const near = (actual, expected, tolerance = 1e-7) => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
  checks++;
};

// A local quote section must arrive at its own on-screen waypoint, rather than
// inherit the error of a single whole-page distance/height ratio.
const anchors = [
  { scroll: 0, distance: 0 },
  { scroll: 620, distance: 900 },
  { scroll: 1400, distance: 1980 },
  { scroll: 2100, distance: 3250 },
  { scroll: 2900, distance: 4200 },
  { scroll: 4100, distance: 6300 },
];
const timeline = buildSectionTimeline(anchors);
for (const anchor of anchors) near(sampleScrollTimeline(timeline, anchor.scroll), anchor.distance);
near(sampleScrollTimeline(timeline, -Infinity), 0);
near(sampleScrollTimeline(timeline, Infinity), 6300);
near(sampleScrollTimeline(timeline, NaN), 0);
let previous = -1;
for (let scroll = 0; scroll <= 4100; scroll += 0.5) {
  const value = sampleScrollTimeline(timeline, scroll);
  assert.ok(value >= previous);
  const interval = Math.min(
    anchors.length - 2,
    anchors.findIndex((point) => point.scroll > scroll) - 1,
  );
  if (interval >= 0) {
    assert.ok(value >= anchors[interval].distance && value <= anchors[interval + 1].distance);
    const slope = (sampleScrollTimeline(timeline, scroll + 0.001) - value) / 0.001;
    assert.ok(slope > 0.1 && slope < 3, `Unexpected local rate ${slope} at ${scroll}`);
    checks += 2;
  }
  near(value, sampleScrollTimeline(timeline, scroll));
  previous = value;
  checks++;
}

// The velocity immediately before/after each knot agrees. There is no easing
// restart or zero-velocity hold at each product section.
for (const point of anchors.slice(1, -1)) {
  const epsilon = 0.001;
  const left = (point.distance - sampleScrollTimeline(timeline, point.scroll - epsilon)) / epsilon;
  const right = (sampleScrollTimeline(timeline, point.scroll + epsilon) - point.distance) / epsilon;
  near(left, right, 0.00002);
  assert.ok(left > 0 && right > 0);
  checks++;
}
for (let scroll = 4100; scroll >= 0; scroll -= 7) {
  const value = sampleScrollTimeline(timeline, scroll);
  assert.ok(Number.isFinite(value));
  checks++;
}

// Long sideways geometry does not change timing: the caller supplies its
// distance/scroll budget. An equal-slope route remains exactly uniform.
const even = buildSectionTimeline([
  { scroll: 0, distance: 0 },
  { scroll: 600, distance: 900 },
  { scroll: 1200, distance: 1800 },
]);
for (let scroll = 0; scroll <= 1200; scroll += 3)
  near(sampleScrollTimeline(even, scroll), scroll * 1.5);

// A short response smooths ordinary wheel/trackpad input, while a hard one-pitch
// lag budget prevents a fast scroll from leaving the active contact far behind.
for (const from of [-100, 0, 100, 5000])
  for (const target of [-100, 0, 100, 5000])
    for (const dt of [1, 8, 16, 33, 100, 1000]) {
      const value = dampMotion(from, target, dt, 40, 24);
      assert.ok(value >= Math.min(from, target) && value <= Math.max(from, target));
      assert.ok(Math.abs(value - target) <= 24 + 1e-8);
      checks += 2;
    }
near(dampMotion(0, 1000, 16, 40, 24), 976);
near(dampMotion(1000, 0, 16, 40, 24), 24);
near(dampMotion(0, 1000, 0, 40, 24), 0);
const at60 = Array(60)
  .fill(1000 / 60)
  .reduce((value, dt) => dampMotion(value, 100, dt, 40), 0);
const at30 = Array(30)
  .fill(1000 / 30)
  .reduce((value, dt) => dampMotion(value, 100, dt, 40), 0);
near(at60, at30);
for (const malformed of [
  [],
  [{ scroll: NaN, distance: 1 }],
  [
    { scroll: 0, distance: 0 },
    { scroll: 0, distance: 10 },
    { scroll: 100, distance: 5 },
    { scroll: 200, distance: 20 },
  ],
]) {
  const normalized = buildSectionTimeline(malformed);
  for (let scroll = -10; scroll <= 220; scroll += 5) {
    assert.ok(Number.isFinite(sampleScrollTimeline(normalized, scroll)));
    checks++;
  }
}
// Regression fixture: two opaque-card crossings add most of the early arc
// distance. A whole-page ratio therefore leaves the contact above the viewport
// at the quote section. An exposed centre-gutter island separates the crossings.
const visibilityFixture = [];
for (let distance = 0; distance <= 192; distance += 24)
  visibilityFixture.push({ distance, base: { y: 700 + distance }, exposed: true });
for (let distance = 216; distance <= 2976; distance += 24)
  visibilityFixture.push({
    distance,
    base: { y: 896 + ((distance - 216) / (2976 - 216)) * 400 },
    exposed: false,
  });
for (let distance = 3000; distance <= 3096; distance += 24)
  visibilityFixture.push({ distance, base: { y: 1300 + distance - 3000 }, exposed: true });
for (let distance = 3120; distance <= 4992; distance += 24)
  visibilityFixture.push({
    distance,
    base: { y: 1400 + ((distance - 3120) / (4992 - 3120)) * 396 },
    exposed: false,
  });
for (let distance = 5016; distance <= 9216; distance += 24)
  visibilityFixture.push({ distance, base: { y: 1800 + distance - 5016 }, exposed: true });
const viewportHeight = 900;
const focusY = 450;
const startScroll = 250;
const finishScroll = 5550;
const finishDistance = 9276;
const sectionVisible = buildVisibleSectionTimeline(
  visibilityFixture,
  0,
  focusY,
  finishScroll,
  finishDistance,
);
const globalUniform = buildScrollTimeline(
  [...visibilityFixture, { distance: finishDistance, base: { y: 6060 } }],
  viewportHeight,
  startScroll,
  finishScroll,
);
const yAtDistance = (distance) => {
  const index = visibilityFixture.findIndex((point) => point.distance >= distance);
  if (index <= 0) return visibilityFixture[0].base.y;
  const a = visibilityFixture[index - 1];
  const b = visibilityFixture[index];
  return a.base.y + ((distance - a.distance) / (b.distance - a.distance)) * (b.base.y - a.base.y);
};
const quoteScroll = 1800;
const oldContactY = yAtDistance(sampleScrollTimeline(globalUniform, quoteScroll)) - quoteScroll;
const quoteContactY = yAtDistance(sampleScrollTimeline(sectionVisible, quoteScroll)) - quoteScroll;
assert.ok(oldContactY < 0, `Fixture must reproduce the old offscreen contact, got ${oldContactY}`);
assert.ok(quoteContactY > 0 && quoteContactY < viewportHeight);
near(quoteContactY, focusY, 1);

// Invert the monotone sampler instead of checking how the anchors were built:
// each long concealed crossing must finish in a short scroll interval. The
// exposed island between them must retain its own visibly paced interval.
const scrollAtDistance = (distance) => {
  let low = sectionVisible.startScroll;
  let high = sectionVisible.endScroll;
  for (let step = 0; step < 60; step++) {
    const middle = (low + high) / 2;
    if (sampleScrollTimeline(sectionVisible, middle) < distance) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
};
const concealedBudgets = [
  scrollAtDistance(3000 - 1e-6) - scrollAtDistance(192 + 1e-6),
  scrollAtDistance(5016 - 1e-6) - scrollAtDistance(3096 + 1e-6),
];
for (const budget of concealedBudgets) {
  assert.ok(budget > 0 && budget <= 80, `Concealed crossing took ${budget}px of scrolling`);
  checks++;
}
const islandBudget = scrollAtDistance(3096) - scrollAtDistance(3000);
assert.ok(islandBudget > 200, `Visible centre island was skipped: ${islandBudget}px`);
const islandScroll = 1348 - focusY;
const islandContact = sampleScrollTimeline(sectionVisible, islandScroll);
assert.ok(islandContact >= 3000 && islandContact <= 3096);
const islandScreenY = yAtDistance(islandContact) - islandScroll;
assert.ok(islandScreenY >= 0 && islandScreenY <= viewportHeight);
near(sectionVisible.startScroll, startScroll);
near(sampleScrollTimeline(sectionVisible, 0), 0);
near(sampleScrollTimeline(sectionVisible, startScroll - 1), 0);
assert.ok(sampleScrollTimeline(sectionVisible, startScroll + 1) > 0);
const rootTarget = sampleScrollTimeline(sectionVisible, quoteScroll);
assert.ok(Math.abs(rootTarget - dampMotion(0, rootTarget, 16, 40, 24)) <= 24);
checks += 8;
// A one-tile centre-gutter island must receive a finite contact window too.
// Testing only the base position misses the visible rotation: a normal tile is
// actively tipping while the front traverses D..D+60 (2.5 regular pitches).
const singletonFixture = visibilityFixture.map((point) => ({
  ...point,
  exposed:
    point.distance >= 3000 && point.distance <= 3096 ? point.distance === 3048 : point.exposed,
}));
const singletonTimeline = buildVisibleSectionTimeline(
  singletonFixture,
  0,
  focusY,
  finishScroll,
  finishDistance,
);
const invertTimeline = (clock, distance) => {
  let low = clock.startScroll;
  let high = clock.endScroll;
  for (let step = 0; step < 60; step++) {
    const middle = (low + high) / 2;
    if (sampleScrollTimeline(clock, middle) < distance) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
};
const singletonHiddenBudgets = [
  invertTimeline(singletonTimeline, 3048) - invertTimeline(singletonTimeline, 192 + 60),
  invertTimeline(singletonTimeline, 5016) - invertTimeline(singletonTimeline, 3048 + 60),
];
for (const budget of singletonHiddenBudgets) {
  assert.ok(budget > 0 && budget <= 80, `Singleton concealed crossing took ${budget}px`);
  checks++;
}
const singletonEntry = singletonTimeline.anchors.find((point) => point.distance === 3048.01);
const singletonExit = singletonTimeline.anchors.find((point) => point.distance === 3096);
assert.ok(singletonEntry && singletonExit);
assert.ok(singletonExit.scroll - singletonEntry.scroll > 200);
for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
  const at = singletonEntry.scroll + (singletonExit.scroll - singletonEntry.scroll) * fraction;
  const contact = sampleScrollTimeline(singletonTimeline, at);
  assert.ok(contact >= 3048 && contact <= 3048 + 60);
  checks++;
}
// The first mark can itself be a one-point exposed run. It remains at distance
// zero before its positive start, then advances through its contact window.
const loneStarter = buildVisibleSectionTimeline(
  visibilityFixture.map((point) => ({
    ...point,
    exposed: point.distance < 3000 ? point.distance === 0 : point.exposed,
  })),
  0,
  focusY,
  finishScroll,
  finishDistance,
);
near(loneStarter.startScroll, 250);
near(sampleScrollTimeline(loneStarter, 0), 0);
near(sampleScrollTimeline(loneStarter, 249), 0);
assert.ok(sampleScrollTimeline(loneStarter, 251) > 0);
checks += 4;
const regressions = {
  quoteSection: {
    scroll: quoteScroll,
    oldContactScreenY: Number(oldContactY.toFixed(2)),
    newContactScreenY: Number(quoteContactY.toFixed(2)),
    viewportHeight,
  },
  concealedCrossingScrollBudgets: concealedBudgets.map((value) => Number(value.toFixed(2))),
  visibleIslandScrollBudget: Number(islandBudget.toFixed(2)),
  singletonHiddenContactBudgets: singletonHiddenBudgets.map((value) => Number(value.toFixed(2))),
  singletonContactWindow: [singletonEntry.distance, singletonExit.distance],
  starterHoldsUntilScroll: sectionVisible.startScroll,
  rootLagLimitPixels: 24,
};
console.log(
  JSON.stringify(
    {
      passed: true,
      checks,
      sectionAnchors: anchors.length,
      responseMs: 40,
      maxLagPixels: 24,
      regressions,
    },
    null,
    2,
  ),
);
