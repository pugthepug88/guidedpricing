import {
  projectRoundedDomino,
  type Point,
  type RoundedDominoProjection,
} from "./followThroughGeometry";

export type NavOriginBox = { left: number; top: number; size: number };
type Vector3 = { x: number; y: number; z: number };

export type NavOriginPose = {
  projection: RoundedDominoProjection;
  /** The source icon's physical width and height never change. */
  physicalSize: number;
  physicalDepth: number;
  pitchRadians: number;
  base: Point;
  /** Projected edges, passed unchanged to the rounded-body renderer. */
  width: Point;
  rise: Point;
  thickness: Point;
  /** Orthogonal rigid-body axes before the fixed orthographic projection. */
  edges3d: { width: Vector3; height: Vector3; depth: Vector3 };
  /** Conservative body bounds; rounded corners lie inside this rectangle. */
  bounds: { left: number; top: number; width: number; height: number };
};

const finite = (value: number) => (Number.isFinite(value) ? value : 0);
const clamp = (value: number) => Math.max(0, Math.min(1, finite(value)));
const ease = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

/**
 * One rigid square peels from the native navigation mark. The fixed camera
 * projects (x, y, z) to (x, -y): pitching foreshortens its face and reveals its
 * 10%-deep side, rather than blending toward an invented, longer face axis.
 *
 * Width remains exactly size. Total projected height is
 * size*cos(pitch) + depth*sin(pitch), bounded by hypot(size, depth), or 1.005
 * times the original size. Translation supplies the small downward emission;
 * there is no object scale, zoom, perspective growth or changing camera.
 */
export function getNavOriginPose(
  origin: NavOriginBox,
  progress: number,
  direction: -1 | 1 = 1,
): NavOriginPose {
  const p = clamp(progress);
  const size = Math.max(0, finite(origin.size));
  const depth = size * 0.1;
  const lift = ease(p / 0.36);
  const tip = ease((p - 0.18) / 0.82);
  const pitch = ((65 * Math.PI) / 180) * tip;
  const cosine = Math.cos(pitch);
  const sine = Math.sin(pitch);
  const heading = direction < 0 ? -1 : 1;

  const edges3d = {
    width: { x: size, y: 0, z: 0 },
    height: { x: 0, y: size * cosine, z: -size * sine },
    depth: { x: 0, y: depth * sine, z: depth * cosine },
  };
  const width = { x: edges3d.width.x, y: -edges3d.width.y };
  const rise = { x: edges3d.height.x, y: -edges3d.height.y };
  const thickness = { x: edges3d.depth.x, y: -edges3d.depth.y };
  const base = {
    x: finite(origin.left) + size / 2 + heading * size * 0.08 * tip,
    y: finite(origin.top) + size + 24 * lift,
  };

  return {
    projection: projectRoundedDomino({
      base,
      width,
      rise,
      thickness,
      shadowVector: { x: -heading * size * 0.2 * lift, y: size * 0.12 * lift },
    }),
    physicalSize: size,
    physicalDepth: depth,
    pitchRadians: pitch,
    base,
    width,
    rise,
    thickness,
    edges3d,
    bounds: {
      left: base.x - size / 2,
      top: base.y - size * cosine - depth * sine,
      width: size,
      height: size * cosine + depth * sine,
    },
  };
}

export function projectNavOrigin(
  origin: NavOriginBox,
  progress: number,
  direction: -1 | 1 = 1,
): RoundedDominoProjection {
  return getNavOriginPose(origin, progress, direction).projection;
}
