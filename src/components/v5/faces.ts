/* Fictional demo avatars used across the v5 product stage.
   All people, businesses and numbers in the v5 preview are fictional. */

const avatar = (initials: string, from: string, to: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="96" height="96" rx="48" fill="url(#g)"/><text x="48" y="55" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700" fill="white">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const FACE = {
  maya: avatar("MC", "#2563eb", "#22c55e"),
  daniel: avatar("DL", "#7c3aed", "#2563eb"),
  priya: avatar("PS", "#db2777", "#7c3aed"),
  tom: avatar("TW", "#0f766e", "#0891b2"),
  sophie: avatar("SC", "#ea580c", "#db2777"),
  leo: avatar("LW", "#475569", "#2563eb"),
  alex: avatar("AR", "#2563eb", "#06b6d4"),
  jordan: avatar("JT", "#4f46e5", "#7c3aed"),
  nina: avatar("NP", "#059669", "#2563eb"),
  sam: avatar("SK", "#dc2626", "#ea580c"),
} as const;

export type FaceKey = keyof typeof FACE;
