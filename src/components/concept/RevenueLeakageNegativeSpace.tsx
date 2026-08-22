import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Isolated art-direction prototype V5C — "The missing pieces".
 * Local to /concept/revenue-leakage-negative-space. Not used by any production page.
 */

const CYAN = "#06B6D4";
const INK = "#0B1220";
const FONT = 'var(--font-zapla, Manrope), system-ui, sans-serif';

type Removal = { x: number; y: number; w: number; h: number; offset: number; label: string };

type Word = {
  id: string;
  text: string;
  size: number;
  /** scroll window this word owns */
  at: [number, number];
  removals: Removal[];
};

const WORDS: Word[] = [
  {
    id: "booked",
    text: "BOOKED",
    size: 268,
    at: [0.05, 0.34],
    removals: [
      { x: 210, y: 372, w: 340, h: 92, offset: 0.1, label: "NO REPLY SENT" },
      { x: 760, y: 452, w: 300, h: 120, offset: 0.2, label: "NO TIME OFFERED" },
    ],
  },
  {
    id: "paid",
    text: "PAID",
    size: 300,
    at: [0.34, 0.62],
    removals: [
      { x: 380, y: 340, w: 300, h: 130, offset: 0.09, label: "NO INVOICE" },
      { x: 680, y: 470, w: 380, h: 110, offset: 0.18, label: "NO PAYMENT LINK" },
      { x: 250, y: 560, w: 640, h: 90, offset: 0.25, label: "NO REMINDER" },
    ],
  },
  {
    id: "returning",
    text: "RETURNING",
    size: 190,
    at: [0.62, 0.86],
    removals: [
      { x: 160, y: 380, w: 420, h: 96, offset: 0.07, label: "NO FOLLOW-UP" },
      { x: 620, y: 452, w: 400, h: 96, offset: 0.14, label: "NO REVIEW ASK" },
      { x: 300, y: 300, w: 900, h: 80, offset: 0.2, label: "NO REASON TO COME BACK" },
    ],
  },
];

function RemovalRect({
  r,
  p,
  from,
  fill,
}: {
  r: Removal;
  p: MotionValue<number>;
  from: number;
  fill: string;
}) {
  const start = from + r.offset;
  const t = useTransform(p, [start, start + 0.05], [0, 1]);
  const w = useTransform(t, [0, 1], [0, r.w]);
  return <motion.rect x={r.x} y={r.y} width={w} height={r.h} fill={fill} />;
}

function RemovalLabel({ r, p, from }: { r: Removal; p: MotionValue<number>; from: number }) {
  const start = from + r.offset;
  const o = useTransform(p, [start, start + 0.03, start + 0.14, start + 0.2], [0, 1, 1, 0]);
  return (
    <motion.g style={{ opacity: o }}>
      <rect x={r.x} y={r.y + r.h / 2 - 1} width={26} height={2} fill={CYAN} />
      <text
        x={r.x + 36}
        y={r.y + r.h / 2 + 4}
        fill="#8E97A8"
        fontSize="11"
        fontWeight={600}
        letterSpacing="0.24em"
        style={{ fontFamily: FONT }}
      >
        {r.label}
      </text>
    </motion.g>
  );
}

function WordBlock({ word, p, index }: { word: Word; p: MotionValue<number>; index: number }) {
  const [a, b] = word.at;
  const opacity = useTransform(p, [a - 0.03, a + 0.03, b - 0.02, b + 0.03], [0, 1, 1, 0]);
  // camera move through the word, not a list
  const scale = useTransform(p, [a - 0.03, b + 0.03], [1.22, 0.9]);
  const y = useTransform(p, [a - 0.03, b + 0.03], [70, -70]);
  const x = useTransform(p, [a - 0.03, b + 0.03], [index % 2 === 0 ? 60 : -60, index % 2 === 0 ? -50 : 50]);
  const maskId = `v5c-${word.id}`;
  return (
    <motion.g style={{ opacity }}>
      <motion.g style={{ scale, y, x, originX: 0.5, originY: 0.5 }}>
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
            <rect width="1440" height="900" fill="white" />
            {word.removals.map((r) => (
              <RemovalRect key={r.label} r={r} p={p} from={a} fill="black" />
            ))}
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
          <text
            x="720"
            y="520"
            textAnchor="middle"
            fill={INK}
            fontSize={word.size}
            fontWeight={800}
            letterSpacing="-0.04em"
            style={{ fontFamily: FONT }}
          >
            {word.text}
          </text>
        </g>
      </motion.g>
      {word.removals.map((r) => (
        <RemovalLabel key={`l-${r.label}`} r={r} p={p} from={a} />
      ))}
    </motion.g>
  );
}

/** The removed geometry reforms into one disciplined structure. */
function Reform({ p }: { p: MotionValue<number> }) {
  const t = useTransform(p, [0.92, 1], [0, 1]);
  const o = useTransform(p, [0.91, 0.95], [0, 1]);
  const bars = [
    { x0: 160, y0: 380, x1: 452, w0: 420 },
    { x0: 620, y0: 452, x1: 592, w0: 400 },
    { x0: 300, y0: 300, x1: 732, w0: 900 },
    { x0: 380, y0: 560, x1: 872, w0: 300 },
  ];
  return (
    <motion.g style={{ opacity: o }}>
      {bars.map((b, i) => (
        <ReformBar key={i} bar={b} t={t} accent={i === 0} />
      ))}
    </motion.g>
  );
}

function ReformBar({
  bar,
  t,
  accent,
}: {
  bar: { x0: number; y0: number; x1: number; w0: number };
  t: MotionValue<number>;
  accent: boolean;
}) {
  const x = useTransform(t, [0, 1], [bar.x0, bar.x1]);
  const y = useTransform(t, [0, 1], [bar.y0, 470]);
  const w = useTransform(t, [0, 1], [bar.w0, 116]);
  const h = useTransform(t, [0, 1], [80, 6]);
  const fill = useTransform(t, [0, 0.65, 1], ["#EDEFF6", "#D3D9E5", accent ? CYAN : INK]);
  return <motion.rect x={x} y={y} width={w} height={h} rx={3} fill={fill} />;
}

function Stage({ p }: { p: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 1440 900" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
      {WORDS.map((w, i) => (
        <WordBlock key={w.id} word={w} p={p} index={i} />
      ))}
      <Reform p={p} />
    </svg>
  );
}

function Enquiry({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0, 0.04, 0.94, 0.99], [0, 1, 1, 0]);
  const scale = useTransform(p, [0.84, 0.92], [1, 1.05]);
  return (
    <motion.div
      className="absolute left-[max(4vw,56px)] top-[112px] w-[280px] origin-top-left"
      style={{ opacity: o, scale }}
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
  const kicker = useTransform(p, [0, 0.05, 0.8, 0.86], [0, 1, 1, 0]);
  const mid = useTransform(p, [0.82, 0.86, 0.9, 0.93], [0, 1, 1, 0]);
  const final = useTransform(p, [0.95, 0.99], [0, 1]);
  return (
    <>
      <motion.div className="absolute right-[max(4vw,56px)] top-[112px] text-right" style={{ opacity: kicker }}>
        <div className="text-[10px] font-semibold tracking-[0.28em] text-neutral-400">
          WHAT THIS ENQUIRY WAS SUPPOSED TO BECOME
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-[120px] mx-auto max-w-[720px] px-8 text-center"
        style={{ opacity: mid }}
      >
        <h2 className="font-zapla text-[48px] font-semibold leading-[1.05] tracking-tight text-[#0B1220]">
          Sometimes nobody followed through.
        </h2>
        <p className="mt-5 text-[18px] leading-relaxed text-neutral-500">
          The customer was there. The future wasn’t.
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-[190px] mx-auto max-w-[720px] px-8 text-center"
        style={{ opacity: final }}
      >
        <h2 className="font-zapla text-[44px] font-semibold leading-[1.06] tracking-tight text-[#0B1220]">
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
        WHAT THIS ENQUIRY WAS SUPPOSED TO BECOME
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
          NEW ENQUIRY · 10:14 AM
        </div>
        <div className="mt-3 font-zapla text-[15px] font-semibold text-[#0B1220]">Sarah Chen</div>
        <p className="mt-1.5 text-[15px] leading-relaxed text-neutral-500">
          “Hi, do you have any availability this week?”
        </p>
      </div>

      <div className="mt-14 space-y-16">
        {WORDS.map((w) => (
          <div key={w.id}>
            <svg viewBox="0 0 340 130" className="w-full">
              <defs>
                <mask id={`v5c-mob-${w.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="340" height="130">
                  <rect width="340" height="130" fill="white" />
                  {w.removals.map((r, i) => (
                    <rect
                      key={r.label}
                      x={20 + i * 70}
                      y={40 + i * 22}
                      width={150 - i * 20}
                      height={26}
                      fill="black"
                    />
                  ))}
                </mask>
              </defs>
              <g mask={`url(#v5c-mob-${w.id})`}>
                <text
                  x="170"
                  y="98"
                  textAnchor="middle"
                  fill={INK}
                  fontSize={w.text.length > 6 ? 46 : 72}
                  fontWeight={800}
                  letterSpacing="-0.04em"
                  style={{ fontFamily: FONT }}
                >
                  {w.text}
                </text>
              </g>
            </svg>
            <ul className="mt-4 space-y-2">
              {w.removals.map((r) => (
                <li key={r.label} className="flex items-center gap-3">
                  <span className="h-px w-6" style={{ background: CYAN }} />
                  <span className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400">
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-20 font-zapla text-[32px] font-semibold leading-[1.08] tracking-tight text-[#0B1220]">
        Sometimes nobody followed through.
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-neutral-500">
        The customer was there. The future wasn’t.
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

export function RevenueLeakageNegativeSpace() {
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
    <div ref={wrapperRef} className="relative h-[600vh] bg-[#FBFCFE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Stage p={progress} />
        <Enquiry p={progress} />
        <CopyLayer p={progress} />
      </div>
    </div>
  );
}
