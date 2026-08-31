/* Fictional demo portraits used across the v5/v6 product stage.
   These now use the same warm editorial portrait system as the Revenue Leakage section
   so people feel visually consistent across the homepage. */

const BASE = "/concept/revenue/portraits";

export const FACE = {
  maya: `${BASE}/maya.svg`,
  daniel: `${BASE}/daniel.svg`,
  priya: `${BASE}/priya.svg`,
  tom: `${BASE}/tom.svg`,
  sophie: `${BASE}/sophie.svg`,
  leo: `${BASE}/leo.svg`,
  alex: `${BASE}/alex.svg`,
  jordan: `${BASE}/jordan.svg`,
  nina: `${BASE}/nina.svg`,
  sam: `${BASE}/sam.svg`,
} as const;

export type FaceKey = keyof typeof FACE;
