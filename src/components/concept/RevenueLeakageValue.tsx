import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Isolated art-direction prototype V5A — "The value that disappears".
 * Local to /concept/revenue-leakage-value. Not used by any production page.
 */

const CYAN = "#06B6D4";
const INK = "#0B1220";
const FONT = 'var(--font-zapla, Manrope), system-ui, sans-serif';

type Cut = {
  key: string;
  label: string;
  /** rect geometry inside the 1440x900 stage */
  x: number;
  y: number;
  w: number;
  h: number;
  /** grow axis */
  axis: "x" | "y";
  /** scroll window in which the cut is taken */
  at: [number, number];
  /** where the label sits */
  lx: number;
  ly: number;
  anchor: "start" | "end";
};

const CUTS: Cut[] = [
  {
    key: "reply",
    label: "REPLY",
    x: 236,
    y: 402,
    w: 300,
    h: 54,
    axis: "x",
    at: [0.13, 0.24],
    lx: 214,
    ly: 396,
    anchor: "end",
  },
  {
    key: "booking",
    label: "BOOKING",
    x: 906,
    y: 312,
    w: 318,
    h: 86,
    axis: "x",
    at: [0.28, 0.39],
    lx: 1244,
    ly: 306,
    anchor: "start",
  },
  {
    key: "payment",
    label: "PAYMENT",
    x: 560,
    y: 470,
    w: 232,
    h: 168,
    axis: "y",
    at: [0.43, 0.54],
    lx: 676,
    ly: 682,
    anchor: "start",
  },
  {
    key: "returning",
    label: "RETURNING CUSTOMER",
    x: 250,
    y: 300,
    w: 986,
    h: 112,
    axis: "y",
    at: [0.58, 0.7],
    lx: 250,
    ly: 262,
    anchor: "start",
  },
];

function useStage(p: MotionValue<number>) {
  return {
    amountIn: useTransform(p, [0, 0.06], [0, 1]),
    amountOut: useTransform(p, [0.72, 0.82], [1, 0]),
    amountScale: useTransform(p, [0, 0.7], [1.06, 0.98]),
    amountY: useTransform(p, [0, 0.7], [18, -10]),
    enquiry: useTransform(p, [0, 0.04, 0.86, 0.94], [0, 1, 1, 0]),
    kicker: useTransform(p, [0, 0.05, 0.62, 0.7], [0, 1, 1, 0]),
    copy: useTransform(p, [0.7, 0.78, 0.86, 0.92], [0, 1, 1, 0]),
    reform: useTransform(p, [0.84, 0.97], [0, 1]),
    reformCopy: useTransform(p, [0.9, 0.99], [0, 1]),
  };
}

function CutRect({ cut, p, fill }: { cut: Cut; p: MotionValue<number>; fill: string }) {
  const t = useTransform(p, cut.at, [0, 1]);
  const w = useTransform(t, (v) => (cut.axis === "x" ? cut.w * v : cut.w));
  const h = useTransform(t, (v) => (cut.axis === "y" ? cut.h * v : cut.h));
  const y = useTransform(t, (v) => (cut.axis === "y" ? cut.y + cut.h * (1 - v) : cut.y));
  return <motion.rect x={cut.x} y={y} width={w} height={h} fill={fill} />;
}

function CutLabel({ cut, p }: { cut: Cut; p: MotionValue<number> }) {
  const o = useTransform(p, [cut.at[0], cut.at[0] + 0.04, 0.74, 0.8], [0, 1, 1, 0]);
  const dx = useTransform(p, [cut.at[0], cut.at[1]], [cut.anchor === "end" ? 18 : -18, 0]);
  return (
    <motion.g style={{ opacity: o, x: dx }}>
      <text
        x={cut.lx}
        y={cut.ly}
        textAnchor={cut.anchor}
        fill={INK}
        fontSize="13"
        fontWeight={600}
        letterSpacing="0.22em"
        style={{ fontFamily: FONT }}
      >
        {cut.label}
      </text>
      <text
        x={cut.lx}
        y={cut.ly + 18}
        textAnchor={cut.anchor}
        fill="#9AA3B4"
        fontSize="11"
        letterSpacing="0.18em"
        style={{ fontFamily: FONT }}
      >
        NEVER HAPPENED
      </text>
    </motion.g>
  );
}

const REFORM_TARGETS = [
  { x: 470, w: 120 },
  { x: 606, w: 120 },
  { x: 742, w: 120 },
  { x: 878, w: 120 },
];

function ReformBar({
  cut,
  p,
  target,
  accent,
}: {
  cut: Cut;
  p: MotionValue<number>;
  target: { x: number; w: number };
  accent: boolean;
}) {
  const t = useTransform(p, [0.84, 0.97], [0, 1]);
  const x = useTransform(t, [0, 1], [cut.x, target.x]);
  const y = useTransform(t, [0, 1], [cut.y, 470]);
  const w = useTransform(t, [0, 1], [cut.w, target.w]);
  const h = useTransform(t, [0, 1], [cut.h, 6]);
  const fill = useTransform(t, [0, 0.7, 1], ["#E6E9F2", "#CBD3E1", accent ? CYAN : "#0B1220"]);
  const o = useTransform(p, [0.8, 0.86], [0, 1]);
  return <motion.rect x={x} y={y} width={w} height={h} rx={3} fill={fill} style={{ opacity: o }} />;
}

/** Residual geometry from each cut, reassembling into one aligned structure. */
function ReformBars({ p }: { p: MotionValue<number> }) {
  return (
    <g>
      {CUTS.map((c, i) => (
        <ReformBar key={c.key} cut={c} p={p} target={REFORM_TARGETS[i]} accent={i === 0} />
      ))}
    </g>
  );
}

function CutEdge({ cut, p }: { cut: Cut; p: MotionValue<number> }) {
  const o = useTransform(p, [cut.at[0], cut.at[0] + 0.05, cut.at[1] + 0.1], [0, 0.9, 0]);
  return (
    <motion.rect
      x={cut.x}
      y={cut.axis === "y" ? cut.y + cut.h - 2 : cut.y}
      width={cut.w}
      height={2}
      fill={CYAN}
      style={{ opacity: o }}
    />
  );
}


function Stage({ p }: { p: MotionValue<number> }) {
  const s = useStage(p);
  return (
    <svg viewBox="0 0 1440 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <mask id="v5a-erode" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
          <rect x="0" y="0" width="1440" height="900" fill="white" />
          {CUTS.map((c) => (
            <CutRect key={c.key} cut={c} p={p} fill="black" />
          ))}
        </mask>
      </defs>

      {/* the amount as a designed object, not a KPI */}
      <motion.g style={{ opacity: s.amountOut }}>
        <motion.g
          style={{ opacity: s.amountIn, scale: s.amountScale, y: s.amountY, originX: 0.5, originY: 0.5 }}
        >
          <g mask="url(#v5a-erode)">
            <text
              x="720"
              y="560"
              textAnchor="middle"
              fill={INK}
              fontSize="330"
              fontWeight={800}
              letterSpacing="-0.045em"
              style={{ fontFamily: FONT }}
            >
              A$450
            </text>
          </g>
          {/* thin cyan edge left where value was cut away */}
          {CUTS.map((c) => (
            <CutEdge key={`edge-${c.key}`} cut={c} p={p} />
          ))}

        </motion.g>
        {CUTS.map((c) => (
          <CutLabel key={`l-${c.key}`} cut={c} p={p} />
        ))}
      </motion.g>

      <ReformBars p={p} />
    </svg>
  );
}

function Enquiry({ p }: { p: MotionValue<number> }) {
  const s = useStage(p);
  return (
    <motion.div
      className="absolute left-[max(4vw,56px)] top-[110px] w-[300px]"
      style={{ opacity: s.enquiry }}
    >
      <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.26em] text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
        NEW ENQUIRY · 10:14 AM
      </div>
      <div className="mt-3 font-zapla text-[15px] font-semibold text-[#0B1220]">Sarah Chen</div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
        “Hi, do you have any availability this week?”
      </p>
    </motion.div>
  );
}

function CopyLayer({ p }: { p: MotionValue<number> }) {
  const s = useStage(p);
  return (
    <>
      <motion.div
        className="absolute right-[max(4vw,56px)] top-[110px] text-right"
        style={{ opacity: s.kicker }}
      >
        <div className="text-[10px] font-semibold tracking-[0.28em] text-neutral-400">
          WHAT ONE ENQUIRY WAS WORTH
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-[46%] mx-auto max-w-[760px] px-8 text-center"
        style={{ opacity: s.copy }}
      >
        <h2 className="font-zapla text-[52px] font-semibold leading-[1.04] tracking-tight text-[#0B1220]">
          Sometimes nobody followed through.
        </h2>
        <p className="mt-6 text-[18px] leading-relaxed text-neutral-500">
          That wasn’t a “no.”
          <br />
          It was revenue that never got the next step.
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-[calc(470px/900*100%)] mx-auto max-w-[760px] px-8 text-center"
        style={{ opacity: s.reformCopy }}
      >
        <h2 className="mt-16 font-zapla text-[46px] font-semibold leading-[1.06] tracking-tight text-[#0B1220]">
          One customer. Everything connected.
        </h2>
      </motion.div>
    </>
  );
}

function MobileStory() {
  return (
    <section className="bg-[#FBFCFE] px-6 py-20">
      <div className="text-[10px] font-semibold tracking-[0.28em] text-neutral-400">
        WHAT ONE ENQUIRY WAS WORTH
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
          NEW ENQUIRY · 10:14 AM
        </div>
        <div className="mt-3 font-zapla text-[15px] font-semibold text-[#0B1220]">Sarah Chen</div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-500">
          “Hi, do you have any availability this week?”
        </p>
      </div>

      <div className="relative mt-14">
        <svg viewBox="0 0 340 200" className="w-full">
          <defs>
            <mask id="v5a-m-mob" maskUnits="userSpaceOnUse" x="0" y="0" width="340" height="200">
              <rect width="340" height="200" fill="white" />
              <rect x="20" y="96" width="120" height="20" fill="black" />
              <rect x="210" y="60" width="90" height="26" fill="black" />
              <rect x="130" y="120" width="70" height="50" fill="black" />
              <rect x="24" y="64" width="290" height="26" fill="black" />
            </mask>
          </defs>
          <g mask="url(#v5a-m-mob)">
            <text
              x="170"
              y="150"
              textAnchor="middle"
              fill={INK}
              fontSize="104"
              fontWeight={800}
              letterSpacing="-0.045em"
              style={{ fontFamily: FONT }}
            >
              A$450
            </text>
          </g>
        </svg>
      </div>

      <ul className="mt-10 space-y-3">
        {CUTS.map((c) => (
          <li key={c.key} className="flex items-baseline justify-between border-b border-neutral-200 pb-3">
            <span className="text-[12px] font-semibold tracking-[0.2em] text-[#0B1220]">{c.label}</span>
            <span className="text-[10px] tracking-[0.18em] text-neutral-400">NEVER HAPPENED</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 font-zapla text-[32px] font-semibold leading-[1.08] tracking-tight text-[#0B1220]">
        Sometimes nobody followed through.
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-neutral-500">
        That wasn’t a “no.”
        <br />
        It was revenue that never got the next step.
      </p>

      <div className="mt-16 flex gap-2">
        <span className="h-1.5 w-16 rounded-full" style={{ background: CYAN }} />
        <span className="h-1.5 w-16 rounded-full bg-[#0B1220]" />
        <span className="h-1.5 w-16 rounded-full bg-[#0B1220]" />
      </div>
      <h2 className="mt-6 font-zapla text-[30px] font-semibold leading-[1.1] tracking-tight text-[#0B1220]">
        One customer. Everything connected.
      </h2>
    </section>
  );
}

export function RevenueLeakageValue() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const progress = useMotionValue(0);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = wrapperRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) progress.set(Math.min(Math.max(-rect.top / total, 0), 1));
      }
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mob = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      setReduced(rm.matches);
      setIsMobile(mob.matches);
    };
    sync();
    rm.addEventListener?.("change", sync);
    mob.addEventListener?.("change", sync);
    return () => {
      rm.removeEventListener?.("change", sync);
      mob.removeEventListener?.("change", sync);
    };
  }, []);

  if (reduced || isMobile) return <MobileStory />;

  return (
    <div ref={wrapperRef} className="relative h-[560vh] bg-[#FBFCFE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Stage p={progress} />
        <Enquiry p={progress} />
        <CopyLayer p={progress} />
      </div>
    </div>
  );
}
