import type { Point } from "./followThroughGeometry";

export type StarterSpec = {
  /** Fixed physical face width; tipping must never change this value. */
  width: number;
  /** Scale relative to the existing 20px course, fixed for the whole piece. */
  size: number;
  /** Arc distance from this piece's base to the following piece's base. */
  pitch: number;
  /** Already scaled standing rise, ready to pass to the existing projector. */
  upright: Point;
};

const WIDTHS = [56, 44, 32, 24] as const;
const PITCHES = [52, 42, 32, 26] as const;
const RISES = [18, 17, 15, 13] as const;

/**
 * A short sequence of separate bodies, rather than one logo that grows or
 * shrinks during its lift. After four pieces, the existing course is unchanged.
 */
export function getStarterSpec(index: number): StarterSpec {
  const slot = Number.isFinite(index) ? Math.max(0, Math.floor(index)) : WIDTHS.length;
  const width = WIDTHS[slot] ?? 20;
  const size = width / 20;
  const uprightX = slot < WIDTHS.length ? 3 + slot / 3 : 4;
  return {
    width,
    size,
    pitch: PITCHES[slot] ?? 24,
    upright: { x: uprightX * size, y: -(RISES[slot] ?? 13) * size },
  };
}
