import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";
const HAIR = "rgba(18,20,26,0.10)";
const BG = "#FBFAF8";
const CYAN = "#06B6D4";

/* ------------------------------------------------------------------ */
/* shared                                                              */
/* ------------------------------------------------------------------ */

function Drip({
  cx,
  from,
  to,
  delay = 0,
  reduced,
  r = 5.5,
}: {
  cx: number;
  from: number;
  to: number;
  delay?: number;
  reduced: boolean;
  r?: number;
}) {
  if (reduced) {
    return <ellipse cx={cx} cy={(from + to) / 2} rx={r} ry={r * 1.2} fill={CYAN} opacity={0.45} />;
  }
  return (
    <motion.ellipse
      cx={cx}
      rx={r}
      ry={r * 1.2}
      fill={CYAN}
      initial={{ cy: from, opacity: 0 }}
      animate={{ cy: [from, to], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.7,
        delay,
        repeat: Infinity,
        repeatDelay: 1.3,
        ease: "easeIn",
        times: [0, 0.15, 0.8, 1],
      }}
    />
  );
}

function Pool({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <path d={`M ${x1} ${y} H ${x2}`} stroke={HAIR} strokeWidth={4} strokeLinecap="round" />;
}

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 360 300" className="block h-auto w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}

function Card({
  n,
  name,
  note,
  children,
}: {
  n: number;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="rounded-[18px] border p-2" style={{ borderColor: HAIR, background: "#FFFFFF" }}>
        {children}
      </div>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-[10px] tracking-[0.3em]" style={{ fontFamily: MONO, color: FAINT }}>
          {String(n).padStart(2, "0")}
        </span>
        <h3
          className="text-[17px] leading-[1.2] tracking-[-0.02em]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
        >
          {name}
        </h3>
      </div>
      <p className="mt-1.5 text-[13px] leading-[1.55]" style={{ color: MUTED }}>
        {note}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 12 tap silhouettes, same story: supply arrives, next step drips out  */
/* ------------------------------------------------------------------ */

/* 01 heavy industrial, thick strokes, lever valve */
function T01({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 92 H 176" stroke={INK} strokeWidth={26} fill="none" />
      <path d="M 34 92 H 162" stroke={CYAN} strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d="M 176 92 V 56" stroke={INK} strokeWidth={12} strokeLinecap="round" fill="none" />
      <path d="M 136 46 H 216" stroke={INK} strokeWidth={13} strokeLinecap="round" fill="none" />
      <circle cx={176} cy={46} r={10} fill={INK} />
      <path
        d="M 176 92 V 138 Q 176 160 202 160 H 232 Q 258 160 258 182 V 210"
        stroke={INK}
        strokeWidth={26}
        strokeLinejoin="round"
        fill="none"
      />
      <Drip cx={258} from={222} to={262} reduced={r} />
      <Drip cx={255} from={222} to={262} delay={0.9} reduced={r} />
      <Pool x1={200} y={276} x2={320} />
      <path d="M 200 92 H 340" stroke={HAIR} strokeWidth={5} strokeDasharray="1 16" strokeLinecap="round" />
    </Stage>
  );
}

/* 02 hairline drafting, one weight throughout */
function T02({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 96 H 168" stroke={INK} strokeWidth={2} fill="none" />
      <path d="M 20 104 H 168" stroke={INK} strokeWidth={2} fill="none" />
      <path d="M 24 100 H 162" stroke={CYAN} strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M 168 96 V 60 M 140 56 H 196" stroke={INK} strokeWidth={2} fill="none" />
      <circle cx={168} cy={56} r={6} fill="none" stroke={INK} strokeWidth={2} />
      <path
        d="M 168 96 V 150 Q 168 168 190 168 H 226 Q 248 168 248 188 V 214"
        stroke={INK}
        strokeWidth={2}
        fill="none"
      />
      <path
        d="M 176 104 V 150 Q 176 160 190 160 H 226 Q 240 160 240 188 V 214"
        stroke={INK}
        strokeWidth={2}
        fill="none"
      />
      <Drip cx={244} from={222} to={266} reduced={r} r={4.5} />
      <Pool x1={196} y={278} x2={296} />
    </Stage>
  );
}

/* 03 gooseneck kitchen mixer, single tall arc */
function T03({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 240 H 340" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      <path d="M 120 240 V 210" stroke={INK} strokeWidth={30} strokeLinecap="butt" fill="none" />
      <path
        d="M 120 214 V 96 Q 120 52 176 52 Q 232 52 232 100 V 150"
        stroke={INK}
        strokeWidth={20}
        strokeLinecap="round"
        fill="none"
      />
      <path d="M 120 176 H 96 Q 74 176 74 156" stroke={INK} strokeWidth={12} strokeLinecap="round" fill="none" />
      <path d="M 128 120 V 62" stroke={CYAN} strokeWidth={5} strokeLinecap="round" fill="none" />
      <Drip cx={232} from={164} to={228} reduced={r} />
      <Drip cx={229} from={164} to={228} delay={1} reduced={r} />
    </Stage>
  );
}

/* 04 brutalist block tap, geometry only */
function T04({ r }: { r: boolean }) {
  return (
    <Stage>
      <rect x={20} y={78} width={132} height={34} fill={INK} />
      <rect x={30} y={92} width={112} height={6} fill={CYAN} />
      <rect x={152} y={62} width={44} height={110} fill={INK} />
      <rect x={196} y={126} width={80} height={30} fill={INK} />
      <rect x={246} y={126} width={30} height={78} fill={INK} />
      <rect x={160} y={30} width={28} height={32} fill={INK} />
      <Drip cx={261} from={214} to={256} reduced={r} r={7} />
      <rect x={200} y={270} width={124} height={4} fill={HAIR} />
      <rect x={200} y={90} width={140} height={4} fill={HAIR} />
    </Stage>
  );
}

/* 05 vintage cross-handle pillar tap */
function T05({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 244 H 340" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      <path d="M 108 244 V 100" stroke={INK} strokeWidth={24} fill="none" />
      <path d="M 108 108 Q 108 74 148 74 H 214 Q 240 74 240 104 V 148" stroke={INK} strokeWidth={18} fill="none" />
      <path d="M 108 100 V 46" stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none" />
      <path d="M 78 40 H 138 M 108 16 V 62" stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none" />
      <circle cx={108} cy={40} r={7} fill={CYAN} />
      <Drip cx={240} from={162} to={232} reduced={r} />
      <Drip cx={237} from={162} to={232} delay={1.05} reduced={r} />
    </Stage>
  );
}

/* 06 wall bibcock, garden spigot at an angle */
function T06({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 44 20 V 280" stroke={HAIR} strokeWidth={6} />
      <path d="M 44 118 H 128" stroke={INK} strokeWidth={22} fill="none" />
      <path d="M 52 118 H 120" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      <path d="M 128 118 L 196 176" stroke={INK} strokeWidth={20} strokeLinecap="round" fill="none" />
      <path d="M 128 118 V 84" stroke={INK} strokeWidth={10} strokeLinecap="round" fill="none" />
      <circle cx={128} cy={76} r={16} fill="none" stroke={INK} strokeWidth={9} />
      <Drip cx={198} from={190} to={252} reduced={r} />
      <Drip cx={202} from={190} to={252} delay={0.85} reduced={r} />
      <Pool x1={152} y={268} x2={268} />
    </Stage>
  );
}

/* 07 laboratory tap, tall thin with fine nozzle */
function T07({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 258 H 340" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      <rect x={96} y={246} width={56} height={12} rx={4} fill={INK} />
      <path d="M 124 246 V 74" stroke={INK} strokeWidth={12} fill="none" />
      <path d="M 124 74 H 216 V 116" stroke={INK} strokeWidth={12} strokeLinejoin="round" fill="none" />
      <path d="M 216 116 L 216 138" stroke={INK} strokeWidth={5} strokeLinecap="round" fill="none" />
      <path d="M 124 200 V 96" stroke={CYAN} strokeWidth={4} strokeLinecap="round" fill="none" />
      <path d="M 124 152 H 84" stroke={INK} strokeWidth={10} strokeLinecap="round" fill="none" />
      <circle cx={78} cy={152} r={13} fill="none" stroke={INK} strokeWidth={8} />
      <Drip cx={216} from={150} to={244} reduced={r} r={4.5} />
      <Drip cx={216} from={150} to={244} delay={1.1} reduced={r} r={4.5} />
    </Stage>
  );
}

/* 08 monobloc lever, soft rounded modern */
function T08({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 250 H 340" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      <rect x={100} y={222} width={92} height={28} rx={14} fill={INK} />
      <path d="M 146 226 V 120 Q 146 88 190 88 H 234 Q 262 88 262 122 V 156" stroke={INK} strokeWidth={26} strokeLinecap="round" fill="none" />
      <path d="M 146 138 H 108 Q 84 138 84 116" stroke={INK} strokeWidth={14} strokeLinecap="round" fill="none" />
      <circle cx={84} cy={104} r={12} fill={INK} />
      <path d="M 154 190 V 106" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      <Drip cx={262} from={170} to={238} reduced={r} r={7} />
      <Drip cx={258} from={170} to={238} delay={0.95} reduced={r} r={7} />
    </Stage>
  );
}

/* 09 gate valve wheel, plant room energy */
function T09({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 128 H 150" stroke={INK} strokeWidth={24} fill="none" />
      <path d="M 30 128 H 142" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      <rect x={150} y={98} width={54} height={60} rx={8} fill={INK} />
      <path d="M 177 98 V 66" stroke={INK} strokeWidth={9} fill="none" />
      <circle cx={177} cy={50} r={26} fill="none" stroke={INK} strokeWidth={9} />
      <path d="M 151 50 H 203 M 177 24 V 76" stroke={INK} strokeWidth={7} strokeLinecap="round" />
      <path d="M 204 128 H 250 V 196" stroke={INK} strokeWidth={24} strokeLinejoin="round" fill="none" />
      <Drip cx={250} from={210} to={256} reduced={r} />
      <Pool x1={196} y={272} x2={306} />
      <path d="M 216 128 H 340" stroke={HAIR} strokeWidth={5} strokeDasharray="1 16" strokeLinecap="round" />
    </Stage>
  );
}

/* 10 side view outline only, negative space tap */
function T10({ r }: { r: boolean }) {
  return (
    <Stage>
      <path
        d="M 20 84 H 158 V 46 H 200 V 84 H 236 V 150 H 268 V 214 H 226 V 150 H 200 V 116 H 20 Z"
        fill="none"
        stroke={INK}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M 32 100 H 150" stroke={CYAN} strokeWidth={6} strokeLinecap="round" />
      <Drip cx={247} from={224} to={264} reduced={r} r={6} />
      <Pool x1={198} y={278} x2={300} />
    </Stage>
  );
}

/* 11 exploded, valve floating away from the line */
function T11({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 110 H 132" stroke={INK} strokeWidth={24} fill="none" />
      <path d="M 30 110 H 124" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      <path d="M 132 110 H 340" stroke={HAIR} strokeWidth={5} strokeDasharray="1 14" strokeLinecap="round" />
      <g transform="translate(24 26)">
        <path d="M 152 110 V 78 M 118 70 H 186" stroke={INK} strokeWidth={11} strokeLinecap="round" fill="none" />
        <circle cx={152} cy={70} r={9} fill={INK} />
        <path
          d="M 152 110 V 152 Q 152 172 176 172 H 202 Q 226 172 226 192 V 214"
          stroke={INK}
          strokeWidth={24}
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <Drip cx={250} from={252} to={286} reduced={r} r={6} />
    </Stage>
  );
}

/* 12 the coupled resolution, cyan joint closes the gap */
function T12({ r }: { r: boolean }) {
  return (
    <Stage>
      <path d="M 20 118 H 150" stroke={INK} strokeWidth={24} fill="none" />
      <path d="M 210 118 H 340" stroke={INK} strokeWidth={24} fill="none" />
      <rect x={148} y={100} width={64} height={36} rx={10} fill={CYAN} />
      <path d="M 30 118 H 330" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      <path d="M 180 100 V 70 M 148 62 H 212" stroke={INK} strokeWidth={11} strokeLinecap="round" fill="none" />
      <circle cx={180} cy={62} r={9} fill={INK} />
      <path d="M 96 178 H 264" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      <text
        x={180}
        y={228}
        fill={FAINT}
        textAnchor="middle"
        style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.22em" }}
      >
        NOTHING FALLS OUT
      </text>
      {!r && (
        <motion.circle
          cx={0}
          cy={118}
          r={5}
          fill={CYAN}
          animate={{ cx: [30, 330] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        />
      )}
    </Stage>
  );
}

const TAPS: { name: string; note: string; render: (r: boolean) => React.ReactNode }[] = [
  {
    name: "Heavy industrial",
    note: "Thick, confident linework. Reads as infrastructure, which suits a systems claim.",
    render: (r) => <T01 r={r} />,
  },
  {
    name: "Drafting hairline",
    note: "Single fine weight and a hollow body. The quietest, most editorial option.",
    render: (r) => <T02 r={r} />,
  },
  {
    name: "Gooseneck mixer",
    note: "One tall arc. Elegant and domestic, softer than plumbing diagrams.",
    render: (r) => <T03 r={r} />,
  },
  {
    name: "Brutalist blocks",
    note: "Pure rectangles, no curves. Fits a hard, graphic section header.",
    render: (r) => <T04 r={r} />,
  },
  {
    name: "Vintage cross handle",
    note: "Cross handle and pillar body. Signals something old that was never fixed.",
    render: (r) => <T05 r={r} />,
  },
  {
    name: "Wall bibcock",
    note: "Wall mounted with an angled spout. Adds a surface so the drip has somewhere to fall from.",
    render: (r) => <T06 r={r} />,
  },
  {
    name: "Laboratory tap",
    note: "Tall, thin, clinical. Pairs well with research citations.",
    render: (r) => <T07 r={r} />,
  },
  {
    name: "Monobloc lever",
    note: "Rounded modern form with generous radii. Closest to the Zapla product language.",
    render: (r) => <T08 r={r} />,
  },
  {
    name: "Gate valve wheel",
    note: "Wheel handle and dashed continuation. Emphasises a control someone forgot to turn.",
    render: (r) => <T09 r={r} />,
  },
  {
    name: "Outline silhouette",
    note: "Drawn only as a contour. Very light on the page, works at large scale.",
    render: (r) => <T10 r={r} />,
  },
  {
    name: "Exploded joint",
    note: "The tap sits detached from the line. The gap itself carries the message.",
    render: (r) => <T11 r={r} />,
  },
  {
    name: "Coupled resolution",
    note: "The paired end frame: a cyan coupling closes the gap and flow continues.",
    render: (r) => <T12 r={r} />,
  },
];

export function TapShapes() {
  const reduced = !!useReducedMotion();

  return (
    <section className="border-t" style={{ borderColor: HAIR, background: BG, color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 pb-28 pt-24 sm:px-10 sm:pt-32">
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: MUTED }}>
          Tap shapes · 12 forms
        </div>
        <h2
          className="mt-6 max-w-[860px] text-[32px] leading-[1.05] tracking-[-0.045em] sm:text-[44px]"
          style={{ fontFamily: DISPLAY, fontWeight: 500 }}
        >
          Twelve different taps, one story.
          <span style={{ color: FAINT }}> Pick the drawing style, not the message.</span>
        </h2>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55]" style={{ color: MUTED }}>
          Each form keeps the same beats: supply arrives in cyan, the valve never fully closes, the next
          step drips away. Only the silhouette and line language change.
        </p>

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {TAPS.map((t, i) => (
            <Card key={t.name} n={i + 1} name={t.name} note={t.note}>
              {t.render(reduced)}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
