/** Native blue icon: 508px wide, with a 142.2px corner radius. */
export const DOMINO_CORNER_RADIUS = 142.2 / 508;

export type Point = { x: number; y: number };

export type RoundedDominoProjection = {
  /** Rounded rear plane, suitable for an SVG path's d attribute. */
  back: string;
  /** Continuous rounded extrusion silhouette; paint before the front face. */
  side: string;
  /** Affine unit-face transform. Its determinant never becomes negative. */
  face: string;
  /** Rounded floor projection, suitable for an SVG path's d attribute. */
  shadow: string;
};

export type RoundedDominoInput = {
  /** Bottom centre of the front plane. */
  base: Point;
  /** Full left-to-right face width, including its rounded corners. */
  width: Point;
  /** Full bottom-to-top face vector. */
  rise: Point;
  /** Translation from the front plane to the rear plane. */
  thickness: Point;
  /** Full projected floor direction for the rounded contact shadow. */
  shadowVector: Point;
  /** Rendering opacity remains owned by the caller. */
  shadowOpacity?: number;
};

type Frame = { origin: Point; x: Point; y: Point };
const TAU = Math.PI * 2;
const EPSILON = 1e-9;
const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });
const subtract = (a: Point, b: Point): Point => ({ x: a.x - b.x, y: a.y - b.y });
const scale = (point: Point, amount: number): Point => ({
  x: point.x * amount,
  y: point.y * amount,
});
const cross = (a: Point, b: Point) => a.x * b.y - a.y * b.x;
const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;
const finite = (value: number) => (Number.isFinite(value) ? value : 0);
const clean = (point: Point): Point => ({ x: finite(point.x), y: finite(point.y) });
const number = (value: number) => {
  const rounded = Math.round(finite(value) * 10000) / 10000;
  return String(Object.is(rounded, -0) ? 0 : rounded);
};
const coordinates = (point: Point) => `${number(point.x)} ${number(point.y)}`;
const map = (frame: Frame, point: Point) =>
  add(frame.origin, add(scale(frame.x, point.x), scale(frame.y, point.y)));

/**
 * One circular arc, retained as cubic curves after projection. Subdividing at
 * 90 degrees keeps the standard circle approximation below 0.03% radial error.
 */
function arc(frame: Frame, centre: Point, start: number, sweep: number): string {
  if (Math.abs(sweep) < EPSILON) return "";
  const segments = Math.max(1, Math.ceil(Math.abs(sweep) / (Math.PI / 2)));
  const step = sweep / segments;
  const radius = DOMINO_CORNER_RADIUS;
  let path = "";
  for (let index = 0; index < segments; index++) {
    const a = start + step * index;
    const b = a + step;
    const handle = (4 / 3) * Math.tan(step / 4);
    const first = {
      x: centre.x + radius * (Math.cos(a) - handle * Math.sin(a)),
      y: centre.y + radius * (Math.sin(a) + handle * Math.cos(a)),
    };
    const second = {
      x: centre.x + radius * (Math.cos(b) + handle * Math.sin(b)),
      y: centre.y + radius * (Math.sin(b) - handle * Math.cos(b)),
    };
    const end = {
      x: centre.x + radius * Math.cos(b),
      y: centre.y + radius * Math.sin(b),
    };
    path += ` C${coordinates(map(frame, first))} ${coordinates(map(frame, second))} ${coordinates(map(frame, end))}`;
  }
  return path;
}

function roundedPlane(frame: Frame): string {
  const radius = DOMINO_CORNER_RADIUS;
  const corners = [
    { x: 1 - radius, y: radius },
    { x: 1 - radius, y: 1 - radius },
    { x: radius, y: 1 - radius },
    { x: radius, y: radius },
  ];
  let path = `M${coordinates(map(frame, { x: radius, y: 0 }))}`;
  corners.forEach((centre, index) => {
    const angle = -Math.PI / 2 + index * (Math.PI / 2);
    const start = {
      x: centre.x + radius * Math.cos(angle),
      y: centre.y + radius * Math.sin(angle),
    };
    path += ` L${coordinates(map(frame, start))}`;
    path += arc(frame, centre, angle, Math.PI / 2);
  });
  return `${path} Z`;
}

/** Reuse this exact perimeter for the front fill, clipping and fine rim. */
export const UNIT_ROUNDED_PATH = roundedPlane({
  origin: { x: 0, y: 0 },
  x: { x: 1, y: 0 },
  y: { x: 0, y: 1 },
});

function convexHull(points: Point[]): Point[] {
  const sorted = points
    .slice()
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .filter(
      (point, index, all) =>
        !index || Math.hypot(point.x - all[index - 1].x, point.y - all[index - 1].y) > EPSILON,
    );
  if (sorted.length < 3) return sorted;
  const lower: Point[] = [];
  const upper: Point[] = [];
  for (const point of sorted) {
    while (
      lower.length > 1 &&
      cross(subtract(lower.at(-1)!, lower.at(-2)!), subtract(point, lower.at(-1)!)) <= EPSILON
    ) {
      lower.pop();
    }
    lower.push(point);
  }
  for (const point of sorted.slice().reverse()) {
    while (
      upper.length > 1 &&
      cross(subtract(upper.at(-1)!, upper.at(-2)!), subtract(point, upper.at(-1)!)) <= EPSILON
    ) {
      upper.pop();
    }
    upper.push(point);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

/**
 * A rounded rectangle is its inner rectangle plus a circular kernel. Sweeping
 * the inner rectangle along depth produces a convex core of at most six
 * vertices. Adding the same affine circular kernel back gives the continuous
 * rounded side silhouette: real curved corners and tangent side walls, with
 * no rectangular backing plate or faceted four-corner fins.
 *
 * This operates in projected coordinates, avoiding inverse matrices when the
 * tipping face becomes edge-on. Its rounded kernel may flatten to a segment;
 * the resulting path remains finite through that instant.
 */
function roundedExtrusion(frame: Frame, thickness: Point): string {
  const radius = DOMINO_CORNER_RADIUS;
  const core = [
    { x: radius, y: radius },
    { x: 1 - radius, y: radius },
    { x: 1 - radius, y: 1 - radius },
    { x: radius, y: 1 - radius },
  ].map((point) => map(frame, point));
  const hull = convexHull([...core, ...core.map((point) => add(point, thickness))]);
  if (hull.length < 3) {
    return hull.length
      ? `M${hull.map(coordinates).join(" L")} Z`
      : `M${coordinates(frame.origin)} Z`;
  }
  const direction = cross(frame.x, frame.y) < 0 ? -1 : 1;
  const angleFor = (edge: Point) => {
    const normal = { x: edge.y, y: -edge.x };
    return Math.atan2(dot(frame.y, normal), dot(frame.x, normal));
  };
  let path = "";
  hull.forEach((centre, index) => {
    const previous = hull[(index + hull.length - 1) % hull.length];
    const next = hull[(index + 1) % hull.length];
    const start = angleFor(subtract(centre, previous));
    const end = angleFor(subtract(next, centre));
    let sweep = end - start;
    if (Math.abs(sweep) < EPSILON || Math.abs(Math.abs(sweep) - TAU) < EPSILON) sweep = 0;
    else if (direction > 0 && sweep < 0) sweep += TAU;
    else if (direction < 0 && sweep > 0) sweep -= TAU;
    const localFrame = { origin: centre, x: frame.x, y: frame.y };
    const startPoint = map(localFrame, {
      x: radius * Math.cos(start),
      y: radius * Math.sin(start),
    });
    path += `${index ? " L" : "M"}${coordinates(startPoint)}`;
    path += arc(localFrame, { x: 0, y: 0 }, start, sweep);
  });
  return `${path} Z`;
}

/** Project an actual rounded icon extrusion while preserving the caller's size. */
export function projectRoundedDomino(input: RoundedDominoInput): RoundedDominoProjection {
  const base = clean(input.base);
  const width = clean(input.width);
  const rise = clean(input.rise);
  const thickness = clean(input.thickness);
  const y = scale(rise, -1);
  const origin = add(add(base, scale(width, -0.5)), rise);
  const frame = { origin, x: width, y };

  // Both material faces carry the native mark. Re-orient the revealed rear
  // face through the edge-on state rather than reflecting its white symbol.
  const reversed = cross(width, y) < 0;
  const faceWidth = reversed ? scale(width, -1) : width;
  const faceOrigin = reversed ? add(origin, width) : origin;
  const shadow = {
    origin: add(add(base, { x: 1.5, y: 2 }), scale(width, -0.525)),
    x: scale(width, 1.05),
    y: clean(input.shadowVector),
  };

  return {
    back: roundedPlane({ ...frame, origin: add(origin, thickness) }),
    side: roundedExtrusion(frame, thickness),
    face: `matrix(${number(faceWidth.x)} ${number(faceWidth.y)} ${number(y.x)} ${number(y.y)} ${number(faceOrigin.x)} ${number(faceOrigin.y)})`,
    shadow: roundedPlane(shadow),
  };
}
