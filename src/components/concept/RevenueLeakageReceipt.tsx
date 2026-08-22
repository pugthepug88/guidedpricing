import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Isolated art-direction prototype V5B — "The future receipt".
 * Local to /concept/revenue-leakage-receipt. Not used by any production page.
 */

const CYAN = "#06B6D4";
const INK = "#0B1220";
const MONO = 'ui-monospace, "SFMono-Regular", "Roboto Mono", Menlo, monospace';

type Line =
  | { kind: "printed"; label: string; value?: string; at: number }
  | { kind: "ghost"; label: string; value?: string; at: number }
  | { kind: "rule"; at: number }
  | { kind: "blank"; height: number; at: number };

/** Ribbon content, top to bottom. Offsets are in ribbon px. */
const RIBBON: { y: number; item: Line }[] = [
  { y: 0, item: { kind: "printed", label: "ZAPLA · ENQUIRY RECEIVED", value: "10:14 AM", at: 0.02 } },
  { y: 46, item: { kind: "rule", at: 0.04 } },
  { y: 72, item: { kind: "printed", label: "SARAH CHEN", at: 0.06 } },
  {
    y: 108,
    item: { kind: "printed", label: "“HI, DO YOU HAVE ANY AVAILABILITY THIS WEEK?”", at: 0.08 },
  },
  { y: 168, item: { kind: "rule", at: 0.12 } },
  { y: 200, item: { kind: "ghost", label: "BOOKING", value: "THU 3:00 PM", at: 0.18 } },
  { y: 252, item: { kind: "ghost", label: "PAID", value: "A$450", at: 0.26 } },
  { y: 304, item: { kind: "ghost", label: "REVIEW REQUESTED", value: "5 ★", at: 0.34 } },
  { y: 356, item: { kind: "ghost", label: "RETURN VISIT", value: "A$450", at: 0.42 } },
  { y: 420, item: { kind: "blank", height: 1180, at: 0.5 } },
];

const RIBBON_W = 468;
const RIBBON_TOTAL = 1720;

function useStage(p: MotionValue<number>) {
  return {
    // the paper keeps feeding, but the printed head stays legible in frame
    feed: useTransform(p, [0, 0.45, 1], [210, 96, -300]),
    kicker: useTransform(p, [0, 0.05, 0.5, 0.58], [0, 1, 1, 0]),
    copyBlank: useTransform(p, [0.5, 0.6, 0.74, 0.8], [0, 1, 1, 0]),
    copyFinal: useTransform(p, [0.82, 0.9], [0, 1]),
    blankLabel: useTransform(p, [0.36, 0.44, 0.88, 0.94], [0, 1, 1, 0]),
    printHead: useTransform(p, [0.3, 0.4, 0.94, 1], [0, 1, 1, 0]),
    printHeadY: useTransform(p, [0.4, 1], [0.52, 0.78]),
    ribbonShift: useTransform(p, [0.48, 0.9], [0, -180]),
    ribbonTilt: useTransform(p, [0, 0.5], [0, -1.1]),
  };
}


function PrintedLine({
  line,
  p,
  y,
}: {
  line: Extract<Line, { kind: "printed" }>;
  p: MotionValue<number>;
  y: number;
}) {
  const o = useTransform(p, [line.at, line.at + 0.03], [0, 1]);
  const clip = useTransform(p, [line.at, line.at + 0.05], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <motion.div
      className="absolute left-9 right-9 flex items-baseline justify-between gap-4"
      style={{ top: y, opacity: o, clipPath: clip }}
    >
      <span
        className="text-[12px] font-semibold tracking-[0.16em]"
        style={{ color: INK, fontFamily: MONO }}
      >
        {line.label}
      </span>
      {line.value ? (
        <span className="text-[12px] tracking-[0.16em] text-neutral-500" style={{ fontFamily: MONO }}>
          {line.value}
        </span>
      ) : null}
    </motion.div>
  );
}

/** Future line: almost prints, then never lands. */
function GhostLine({
  line,
  p,
  y,
}: {
  line: Extract<Line, { kind: "ghost" }>;
  p: MotionValue<number>;
  y: number;
}) {
  const a = line.at;
  const o = useTransform(p, [a, a + 0.03, a + 0.12, a + 0.2], [0, 1, 0.5, 0]);
  const ink = useTransform(p, [a, a + 0.04, a + 0.16], ["#6B7488", "#0B1220", "#DDE1EB"]);
  const blur = useTransform(p, [a + 0.06, a + 0.2], [0, 2.4]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.div
      className="absolute left-9 right-9 flex items-baseline justify-between gap-4"
      style={{ top: y, opacity: o, filter }}
    >
      <motion.span
        className="text-[12px] font-semibold tracking-[0.16em]"
        style={{ color: ink, fontFamily: MONO }}
      >
        {line.label}
      </motion.span>
      {line.value ? (
        <motion.span className="text-[12px] tracking-[0.16em]" style={{ color: ink, fontFamily: MONO }}>
          {line.value}
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function RuleLine({ p, y, at }: { p: MotionValue<number>; y: number; at: number }) {
  const sx = useTransform(p, [at, at + 0.04], [0, 1]);
  return (
    <motion.div
      className="absolute left-9 right-9 h-px origin-left bg-neutral-200"
      style={{ top: y, scaleX: sx }}
    />
  );
}

function Ribbon({ p }: { p: MotionValue<number> }) {
  const s = useStage(p);
  return (
    <motion.div
      className="absolute left-1/2 top-0"
      style={{ x: "-50%", y: s.feed, rotate: s.ribbonTilt, translateX: s.ribbonShift }}
    >
      <div
        className="relative bg-white"
        style={{
          width: RIBBON_W,
          height: RIBBON_TOTAL,
          boxShadow: "0 24px 70px -30px rgba(11,18,32,0.35), 0 1px 0 rgba(11,18,32,0.04)",
        }}
      >
        {/* paper grain + edge tone */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,18,32,0.055) 0px, rgba(11,18,32,0) 22px, rgba(11,18,32,0) calc(100% - 22px), rgba(11,18,32,0.055) 100%)",
          }}
        />
        {RIBBON.map(({ y, item }, i) => {
          if (item.kind === "printed") return <PrintedLine key={i} line={item} p={p} y={y} />;
          if (item.kind === "ghost") return <GhostLine key={i} line={item} p={p} y={y} />;
          if (item.kind === "rule") return <RuleLine key={i} p={p} y={y} at={item.at} />;
          return null;
        })}
      </div>
    </motion.div>
  );
}

function BlankMarker({ p }: { p: MotionValue<number> }) {
  const s = useStage(p);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-y-1/2"
      style={{ opacity: s.blankLabel, marginLeft: RIBBON_W / 2 - 150 }}
    >
      <div className="flex items-center gap-4">
        <span className="h-px w-16" style={{ background: CYAN }} />
        <span className="text-[10px] font-semibold tracking-[0.3em] text-neutral-400">
          NOTHING PRINTED HERE
        </span>
      </div>
    </motion.div>
  );
}

function CopyLayer({ p }: { p: MotionValue<number> }) {
  const s = useStage(p);
  return (
    <>
      <motion.div className="absolute left-[max(4vw,56px)] top-[104px]" style={{ opacity: s.kicker }}>
        <div className="text-[10px] font-semibold tracking-[0.28em] text-neutral-400">
          THE RECEIPT THAT KEPT FEEDING
        </div>
        <p className="mt-5 max-w-[260px] text-[15px] leading-relaxed text-neutral-500">
          One enquiry starts printing. Everything after it depends on somebody taking the next step.
        </p>
      </motion.div>

      <motion.div
        className="absolute left-[max(4vw,56px)] top-1/2 max-w-[400px] -translate-y-1/2"
        style={{ opacity: s.copyBlank }}
      >
        <h2 className="font-zapla text-[46px] font-semibold leading-[1.05] tracking-tight text-[#0B1220]">
          Sometimes nobody followed through.
        </h2>
        <p className="mt-6 text-[17px] leading-relaxed text-neutral-500">
          The expensive part is everything that never made it onto the receipt.
        </p>
      </motion.div>

      <motion.div
        className="absolute left-[max(4vw,56px)] bottom-[110px] max-w-[420px]"
        style={{ opacity: s.copyFinal }}
      >
        <h2 className="font-zapla text-[38px] font-semibold leading-[1.08] tracking-tight text-[#0B1220]">
          The enquiry arrived. The value never did.
        </h2>
      </motion.div>
    </>
  );
}

function MobileStory() {
  return (
    <section className="bg-[#F4F6FA] px-6 py-20">
      <div className="text-[10px] font-semibold tracking-[0.28em] text-neutral-400">
        THE RECEIPT THAT KEPT FEEDING
      </div>

      <div
        className="mt-10 bg-white px-6 py-8"
        style={{ boxShadow: "0 22px 60px -34px rgba(11,18,32,0.4)" }}
      >
        <div className="flex justify-between text-[11px] font-semibold tracking-[0.16em]" style={{ fontFamily: MONO, color: INK }}>
          <span>ZAPLA · ENQUIRY RECEIVED</span>
          <span className="text-neutral-500">10:14 AM</span>
        </div>
        <div className="mt-4 h-px bg-neutral-200" />
        <div className="mt-4 text-[11px] font-semibold tracking-[0.16em]" style={{ fontFamily: MONO, color: INK }}>
          SARAH CHEN
        </div>
        <div className="mt-3 text-[11px] leading-relaxed tracking-[0.14em] text-neutral-600" style={{ fontFamily: MONO }}>
          “HI, DO YOU HAVE ANY AVAILABILITY THIS WEEK?”
        </div>
        <div className="mt-6 h-px bg-neutral-200" />

        <div className="mt-6 space-y-4 opacity-25">
          {[
            ["BOOKING", "THU 3:00 PM"],
            ["PAID", "A$450"],
            ["REVIEW REQUESTED", "5 ★"],
            ["RETURN VISIT", "A$450"],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between text-[11px] tracking-[0.16em]" style={{ fontFamily: MONO, color: INK }}>
              <span>{l}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>

        <div className="relative mt-8 h-[300px]">
          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center gap-3">
            <span className="h-px w-10" style={{ background: CYAN }} />
            <span className="text-[9px] font-semibold tracking-[0.28em] text-neutral-400">
              NOTHING PRINTED HERE
            </span>
          </div>
        </div>
      </div>

      <h2 className="mt-16 font-zapla text-[32px] font-semibold leading-[1.08] tracking-tight text-[#0B1220]">
        Sometimes nobody followed through.
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-neutral-500">
        The expensive part is everything that never made it onto the receipt.
      </p>
      <h3 className="mt-12 font-zapla text-[26px] font-semibold leading-[1.1] tracking-tight text-[#0B1220]">
        The enquiry arrived. The value never did.
      </h3>
    </section>
  );
}

export function RevenueLeakageReceipt() {
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
    <div ref={wrapperRef} className="relative h-[560vh] bg-[#F4F6FA]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Ribbon p={progress} />
        <BlankMarker p={progress} />
        <CopyLayer p={progress} />
      </div>
    </div>
  );
}
