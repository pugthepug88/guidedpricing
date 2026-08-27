/**
 * Bespoke mask + portrait hero artwork.
 * Pure SVG / CSS composition, no UI primitives.
 */

export const MASK_VIEWBOX = "0 0 360 132";

/** Single custom silhouette: long rounded body, bottom-centre bridge dip,
 *  left lower edge dropping deeper than the right. */
const BODY =
  "M22,22 C8,28 2,44 6,66 C10,92 20,112 40,120 C64,129 92,124 118,114 " +
  "C142,105 160,96 172,98 C179,99 184,104 190,108 C199,113 214,112 238,108 " +
  "C266,103 296,104 318,96 C340,88 351,70 355,50 C358,32 348,22 332,18 " +
  "C286,7 64,10 22,22 Z";

export function MaskGlasses({ id = "mask" }: { id?: string }) {
  const u = (n: string) => `${id}-${n}`;
  return (
    <svg viewBox={MASK_VIEWBOX} className="block h-auto w-full overflow-visible">
      <defs>
        {/* holes are real holes */}
        <mask id={u("cut")} maskUnits="userSpaceOnUse">
          <path d={BODY} fill="#fff" />
          <ellipse cx="110" cy="62" rx="53" ry="30" fill="#000" transform="rotate(-4 110 62)" />
          <ellipse cx="252" cy="58" rx="53" ry="30" fill="#000" transform="rotate(4 252 58)" />
        </mask>

        <linearGradient id={u("base")} x1="0" y1="0.2" x2="1" y2="0.9">
          <stop offset="0%" stopColor="#FF7A2F" />
          <stop offset="26%" stopColor="#F0464E" />
          <stop offset="52%" stopColor="#B0219C" />
          <stop offset="74%" stopColor="#6A3BE0" />
          <stop offset="100%" stopColor="#12B6FF" />
        </linearGradient>
        <radialGradient id={u("warm")} cx="0.12" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#FFB25A" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFB25A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={u("cool")} cx="0.93" cy="0.72" r="0.55">
          <stop offset="0%" stopColor="#31E8FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#31E8FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={u("spec")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={u("ao")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A0518" stopOpacity="0" />
          <stop offset="72%" stopColor="#1A0518" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#12030F" stopOpacity="0.55" />
        </linearGradient>
        <filter id={u("soft")} x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={u("drop")} x="-40%" y="-40%" width="180%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* contact shadow beneath the moulded object */}
      <g filter={`url(#${u("drop")})`} opacity="0.3">
        <path d={BODY} fill="#8A2A36" transform="translate(2 16) scale(0.985 0.9)" />
      </g>

      <g mask={`url(#${u("cut")})`}>
        <rect x="0" y="0" width="360" height="132" fill={`url(#${u("base")})`} />
        <rect x="0" y="0" width="360" height="132" fill={`url(#${u("warm")})`} />
        <rect x="0" y="0" width="360" height="132" fill={`url(#${u("cool")})`} />
        {/* specular sweep across the top of the moulding */}
        <path
          d="M26,26 C86,13 288,13 330,23 C338,25 342,32 340,40 C300,26 70,28 30,42 C22,44 18,30 26,26 Z"
          fill={`url(#${u("spec")})`}
        />
        <ellipse cx="150" cy="30" rx="96" ry="11" fill="#fff" opacity="0.22" filter={`url(#${u("soft")})`} />
        {/* ambient occlusion along lower edge */}
        <rect x="0" y="0" width="360" height="132" fill={`url(#${u("ao")})`} />
        {/* inner rim light around the eye openings */}
        <ellipse
          cx="110"
          cy="62"
          rx="53"
          ry="30"
          fill="none"
          stroke="#FFE9D6"
          strokeOpacity="0.5"
          strokeWidth="2.2"
          transform="rotate(-4 110 62)"
        />
        <ellipse
          cx="252"
          cy="58"
          rx="53"
          ry="30"
          fill="none"
          stroke="#DFF6FF"
          strokeOpacity="0.5"
          strokeWidth="2.2"
          transform="rotate(4 252 58)"
        />
        <ellipse
          cx="110"
          cy="64"
          rx="51"
          ry="28"
          fill="none"
          stroke="#3A0A22"
          strokeOpacity="0.35"
          strokeWidth="3"
          transform="rotate(-4 110 64)"
        />
        <ellipse
          cx="252"
          cy="60"
          rx="51"
          ry="28"
          fill="none"
          stroke="#0A1A3A"
          strokeOpacity="0.3"
          strokeWidth="3"
          transform="rotate(4 252 60)"
        />
        {/* embossed label, upper-left of the mask */}
        <text
          x="30"
          y="27"
          fill="#FFF0E2"
          fillOpacity="0.72"
          fontSize="7.2"
          letterSpacing="0.9"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          Super Agent
        </text>
        <text
          x="30"
          y="27.9"
          fill="#4A0E22"
          fillOpacity="0.28"
          fontSize="7.2"
          letterSpacing="0.9"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          Super Agent
        </text>
      </g>
    </svg>
  );
}

/** Fine film grain across the panel (feTurbulence, not a dot pattern). */
export function PanelGrain({ id = "grain", opacity = 0.4 }: { id?: string; opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity, mixBlendMode: "multiply" }}
      aria-hidden
    >
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.40  0 0 0 0.42 0.58"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
