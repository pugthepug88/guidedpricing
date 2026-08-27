import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

/**
 * Revenue Leaks Lab.
 *
 * Ten isolated treatments of the same beat: a ready customer, a busy business,
 * and the enquiry that quietly goes cold. Each variant keeps the same content
 * so the only thing being compared is the motion grammar.
 *
 * Concept route only. Nothing here is imported by production pages.
 */

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const PAPER = "#F2EEE7";
const INK = "#0D1117";
const LOSS = "#A93640";
const WIN = "#1E7F5C";

/* ------------------------------------------------------------------ */
/* shared primitives                                                    */
/* ------------------------------------------------------------------ */

/**
 * Scroll progress mirrored into a plain motion value.
 * Native scroll timelines map ranges unreliably across tall sticky stages,
 * so every beat in this file is driven from one JS-updated clock.
 */
function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => p.set(v));
  return p;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function clockFrom(m: MotionValue<number>) {
  return useTransform(m, (v) => {
    const total = Math.round(v);
    const h24 = Math.floor(total / 60);
    const h = h24 > 12 ? h24 - 12 : h24;
    return `${h}:${pad(total % 60)}`;
  });
}

type VariantMeta = {
  n: string;
  title: string;
  idea: string;
  note: string;
};

function Stage({
  meta,
  height = "300vh",
  background = PAPER,
  children,
}: {
  meta: VariantMeta;
  height?: string;
  background?: string;
  children: (p: MotionValue<number>, reduced: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const reduced = !!useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height }}
      aria-label={`${meta.n}. ${meta.title}`}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: background, color: INK }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-px bg-black/[0.07]" />

        {/* variant chrome, so the ten can be judged against each other */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 px-5 pt-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between gap-8">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">
              {meta.n} · {meta.title}
            </div>
            <div className="hidden max-w-[420px] text-right text-[10px] font-medium uppercase tracking-[0.16em] text-black/35 sm:block">
              {meta.idea}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-5 pb-6 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-[1440px] text-[11px] leading-[1.6] text-black/40">
            {meta.note}
          </div>
        </div>

        {children(p, reduced)}
      </div>
    </section>
  );
}

/** The enquiry, rendered identically everywhere so motion is the only variable. */
function EnquiryCard({
  clock,
  meridiem,
  className = "",
  compact = false,
}: {
  clock?: MotionValue<string>;
  meridiem?: MotionValue<string>;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-start gap-3 border-b border-black/10 pb-4 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white sm:h-11 sm:w-11">
          SM
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold sm:text-[15px]">Sarah Miller</div>
          <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-black/40">
            Website enquiry · received 10:14 AM
          </div>
        </div>
        {clock && (
          <div className="flex items-baseline gap-1 tabular-nums">
            <motion.span
              className="text-[26px] leading-none tracking-[-0.05em] sm:text-[34px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              {clock}
            </motion.span>
            <motion.span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-black/40">
              {meridiem}
            </motion.span>
          </div>
        )}
      </div>
      <div
        className={`mt-5 tracking-[-0.045em] ${compact ? "text-[20px] leading-[1.12] sm:text-[24px]" : "text-[26px] leading-[1.08] sm:text-[34px]"}`}
        style={{ fontFamily: DISPLAY, fontWeight: 500 }}
      >
        “Hi, are you available this week?”
      </div>
    </div>
  );
}

function Headline({
  eyebrow,
  children,
  tone = INK,
}: {
  eyebrow?: string;
  children: ReactNode;
  tone?: string;
}) {
  return (
    <div>
      {eyebrow && (
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: tone === INK ? "rgba(0,0,0,0.42)" : tone }}
        >
          {eyebrow}
        </div>
      )}
      <div
        className="mt-4 text-[40px] leading-[0.9] tracking-[-0.06em] sm:text-[62px] lg:text-[80px]"
        style={{ fontFamily: DISPLAY, fontWeight: 500, color: tone }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 01 · Intent cooling                                                  */
/* ------------------------------------------------------------------ */

const V1: VariantMeta = {
  n: "01",
  title: "Intent cooling",
  idea: "One object, losing its light",
  note: "The current V7 grammar. The enquiry stays on stage all the way through and simply loses colour, light and warmth as the working day passes. Calmest and most literal.",
};

function IntentCooling() {
  return (
    <Stage meta={V1}>
      {(p, reduced) => {
        const minutes = useTransform(p, [0.12, 0.72], [614, 992]);
        const clock = clockFrom(minutes);
        const meridiem = useTransform(minutes, (m): string => (m >= 720 ? "PM" : "AM"));
        const paper = useTransform(p, [0.12, 0.72], ["#FFFDF9", "#E7E1D7"]);
        const sat = useTransform(p, [0.12, 0.72], ["saturate(1)", "saturate(0.45)"]);
        const light = useTransform(p, [0.12, 0.7], [1, 0.08]);
        const heat = useTransform(p, [0.12, 0.72], [1, 0]);
        const heatHue = useTransform(p, [0.12, 0.45, 0.72], ["#3FA97C", "#C79A4A", LOSS]);
        const rot = useTransform(p, [0.74, 0.82], [0, -3]);
        const drop = useTransform(p, [0.74, 0.82], [0, 40]);
        const cardOpacity = useTransform(p, [0.76, 0.84], [1, 0]);
        const lossOpacity = useTransform(p, [0.82, 0.88], [0, 1]);
        const lossY = useTransform(p, [0.82, 0.9], [24, 0]);

        return (
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10">
            <div className="relative w-full max-w-[760px]">
              <motion.div
                className="rounded-[22px] border border-black/10 px-6 py-7 sm:px-9 sm:py-9"
                style={
                  reduced
                    ? { backgroundColor: "#E7E1D7" }
                    : {
                        backgroundColor: paper,
                        filter: sat,
                        rotate: rot,
                        y: drop,
                        opacity: cardOpacity,
                      }
                }
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[22px]"
                  style={{
                    opacity: reduced ? 0.1 : light,
                    background:
                      "radial-gradient(120% 90% at 12% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 62%)",
                  }}
                />
                <EnquiryCard clock={clock} meridiem={meridiem} />
                <div className="mt-7 flex items-center gap-4">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    Intent
                  </div>
                  <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-black/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        scaleX: reduced ? 0.15 : heat,
                        originX: 0,
                        width: "100%",
                        backgroundColor: reduced ? LOSS : heatHue,
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                style={reduced ? undefined : { opacity: lossOpacity, y: lossY }}
              >
                <Headline eyebrow="4:32 PM · outcome" tone={LOSS}>
                  Booked elsewhere.
                </Headline>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 02 · Word erasure                                                    */
/* ------------------------------------------------------------------ */

const V2: VariantMeta = {
  n: "02",
  title: "Word erasure",
  idea: "The message unwrites itself",
  note: "The customer's own words are removed one at a time as the hours pass. Nothing dramatic happens on screen, which is the point: the enquiry disappears without an event.",
};

const WORDS = ["Hi,", "are", "you", "available", "this", "week?"];

function WordErasure() {
  return (
    <Stage meta={V2}>
      {(p, reduced) => {
        const minutes = useTransform(p, [0.14, 0.74], [614, 992]);
        const clock = clockFrom(minutes);
        const meridiem = useTransform(minutes, (m): string => (m >= 720 ? "PM" : "AM"));
        const lossOpacity = useTransform(p, [0.8, 0.86], [0, 1]);
        const lossY = useTransform(p, [0.8, 0.9], [30, 0]);
        const stageOpacity = useTransform(p, [0.78, 0.85], [1, 0.08]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1080px]">
              <motion.div style={reduced ? undefined : { opacity: stageOpacity }}>
                <div className="flex items-baseline justify-between">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Sarah Miller · website enquiry
                  </div>
                  <div className="flex items-baseline gap-1 tabular-nums">
                    <motion.span
                      className="text-[30px] leading-none tracking-[-0.05em] sm:text-[40px]"
                      style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                    >
                      {clock}
                    </motion.span>
                    <motion.span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40">
                      {meridiem}
                    </motion.span>
                  </div>
                </div>
                <div
                  className="mt-8 flex flex-wrap gap-x-[0.28em] gap-y-2 text-[44px] leading-[1.02] tracking-[-0.06em] sm:text-[72px] lg:text-[92px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                >
                  {WORDS.map((w, i) => (
                    <Word key={w} word={w} index={i} p={p} reduced={reduced} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute inset-x-5 top-1/2 -translate-y-1/2 sm:inset-x-10 lg:inset-x-16"
                style={reduced ? undefined : { opacity: lossOpacity, y: lossY }}
              >
                <div className="mx-auto max-w-[1080px]">
                  <Headline eyebrow="4:32 PM · outcome" tone={LOSS}>
                    Booked elsewhere.
                  </Headline>
                </div>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

function Word({
  word,
  index,
  p,
  reduced,
}: {
  word: string;
  index: number;
  p: MotionValue<number>;
  reduced: boolean;
}) {
  const start = 0.24 + index * 0.075;
  const opacity = useTransform(p, [start, start + 0.06], [1, 0.07]);
  const blur = useTransform(p, [start, start + 0.06], ["blur(0px)", "blur(6px)"]);
  const y = useTransform(p, [start, start + 0.08], [0, 10]);
  return (
    <motion.span style={reduced ? { opacity: 0.2 } : { opacity, filter: blur, y }}>
      {word}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* 03 · Split race                                                      */
/* ------------------------------------------------------------------ */

const V3: VariantMeta = {
  n: "03",
  title: "Split race",
  idea: "Two businesses, one customer",
  note: "The strongest commercial version. The same enquiry lands in two businesses at once and the competitor's column keeps advancing while yours sits still. Loss becomes comparative, not abstract.",
};

const RIVAL_STEPS = [
  { at: 0.26, label: "10:16", detail: "Replied in 2 minutes" },
  { at: 0.38, label: "10:41", detail: "Availability sent" },
  { at: 0.5, label: "11:20", detail: "Time confirmed" },
  { at: 0.62, label: "11:58", detail: "Deposit paid" },
];

const YOUR_STEPS = [
  { at: 0.26, label: "10:16", detail: "Seen on a phone, mid job" },
  { at: 0.38, label: "12:23", detail: "Meant to reply after lunch" },
  { at: 0.5, label: "2:38", detail: "Still in the inbox" },
  { at: 0.62, label: "4:11", detail: "Nobody followed through" },
];

function SplitRace() {
  return (
    <Stage meta={V3} height="320vh">
      {(p, reduced) => {
        const dim = useTransform(p, [0.24, 0.6], [1, 0.42]);
        const lossOpacity = useTransform(p, [0.74, 0.8], [0, 1]);
        const lossScale = useTransform(p, [0.74, 0.86], [0.96, 1]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto grid w-full max-w-[1240px] gap-6 lg:grid-cols-2 lg:gap-14">
              <motion.div
                className="rounded-[20px] border border-black/10 bg-white/55 p-6 sm:p-8"
                style={reduced ? undefined : { opacity: dim }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                  Your business
                </div>
                <div className="mt-5 space-y-4">
                  {YOUR_STEPS.map((s) => (
                    <RaceRow key={s.detail} step={s} p={p} reduced={reduced} tone="idle" />
                  ))}
                </div>
              </motion.div>

              <div className="rounded-[20px] border border-black/10 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(0,0,0,0.6)] sm:p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                  The business down the road
                </div>
                <div className="mt-5 space-y-4">
                  {RIVAL_STEPS.map((s) => (
                    <RaceRow key={s.detail} step={s} p={p} reduced={reduced} tone="live" />
                  ))}
                </div>
                <motion.div
                  className="mt-7 border-t border-black/10 pt-5"
                  style={
                    reduced
                      ? undefined
                      : { opacity: lossOpacity, scale: lossScale, originX: 0 }
                  }
                >
                  <div
                    className="text-[30px] leading-[0.94] tracking-[-0.05em] sm:text-[40px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500, color: WIN }}
                  >
                    Booked by 11:58 AM.
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.6] text-black/50">
                    Same enquiry. Same day. The only difference was who kept the customer moving.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

function RaceRow({
  step,
  p,
  reduced,
  tone,
}: {
  step: { at: number; label: string; detail: string };
  p: MotionValue<number>;
  reduced: boolean;
  tone: "live" | "idle";
}) {
  const opacity = useTransform(p, [step.at - 0.05, step.at], [0, 1]);
  const x = useTransform(p, [step.at - 0.05, step.at + 0.02], [tone === "live" ? 18 : -18, 0]);
  return (
    <motion.div
      className="flex items-baseline gap-4"
      style={reduced ? undefined : { opacity, x }}
    >
      <span className="w-[46px] shrink-0 text-[11px] font-semibold tabular-nums text-black/35">
        {step.label}
      </span>
      <span
        className={`text-[15px] leading-[1.4] sm:text-[17px] ${tone === "live" ? "text-[#17191B]" : "text-black/45"}`}
      >
        {step.detail}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 04 · Signal field                                                    */
/* ------------------------------------------------------------------ */

const V4: VariantMeta = {
  n: "04",
  title: "Signal field",
  idea: "One dot goes out in a field of many",
  note: "Zooms out from a single story to the pattern. A grid of live enquiries where most stay warm and a few quietly go dark, then the camera pushes back into the one that mattered.",
};

const FIELD = Array.from({ length: 96 }, (_, i) => ({
  i,
  dies: [7, 12, 23, 31, 44, 52, 58, 66, 71, 80, 88].includes(i),
  hero: i === 44,
}));

function SignalField() {
  return (
    <Stage meta={V4} height="320vh">
      {(p, reduced) => {
        const fieldScale = useTransform(p, [0.1, 0.55, 0.86], [1.02, 1, 2.6]);
        const fieldX = useTransform(p, [0.55, 0.86], ["0%", "8%"]);
        const fieldY = useTransform(p, [0.55, 0.86], ["0%", "6%"]);
        const fieldFade = useTransform(p, [0.62, 0.86], [1, 0.12]);
        const lossOpacity = useTransform(p, [0.82, 0.88], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-5">
            <motion.div
              className="grid w-full max-w-[760px] grid-cols-12 gap-3 sm:gap-4"
              style={
                reduced
                  ? undefined
                  : { scale: fieldScale, x: fieldX, y: fieldY, opacity: fieldFade }
              }
            >
              {FIELD.map((d) => (
                <FieldDot key={d.i} dot={d} p={p} reduced={reduced} />
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-x-5 top-1/2 mx-auto max-w-[1080px] -translate-y-1/2 sm:inset-x-10 lg:inset-x-16"
              style={reduced ? undefined : { opacity: lossOpacity }}
            >
              <Headline eyebrow="one of them was Sarah" tone={LOSS}>
                Booked elsewhere.
              </Headline>
              <p className="mt-6 max-w-[460px] text-[15px] leading-[1.65] text-black/50">
                Every dark square was a customer who was ready. None of them complained.
              </p>
            </motion.div>
          </div>
        );
      }}
    </Stage>
  );
}

function FieldDot({
  dot,
  p,
  reduced,
}: {
  dot: { i: number; dies: boolean; hero: boolean };
  p: MotionValue<number>;
  reduced: boolean;
}) {
  const at = 0.24 + (dot.i % 11) * 0.03;
  const color = useTransform(
    p,
    [at, at + 0.08],
    dot.dies ? ["#3FA97C", "#CFC7BA"] : ["#3FA97C", "#9CC9B6"],
  );
  const scale = useTransform(p, [at, at + 0.08], dot.dies ? [1, 0.72] : [1, 1]);
  return (
    <motion.div
      className="aspect-square rounded-[5px]"
      style={
        reduced
          ? { backgroundColor: dot.dies ? "#CFC7BA" : "#9CC9B6" }
          : {
              backgroundColor: color,
              scale,
              boxShadow: dot.hero ? "0 0 0 2px rgba(169,54,64,0.55)" : undefined,
            }
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* 05 · The widening gap                                                */
/* ------------------------------------------------------------------ */

const V5: VariantMeta = {
  n: "05",
  title: "The widening gap",
  idea: "Distance as the whole metaphor",
  note: "Customer and business start on the same line and physically drift apart as the hours pass, with the connecting thread stretching until it snaps. Purely spatial, almost no copy needed.",
};

function WideningGap() {
  return (
    <Stage meta={V5}>
      {(p, reduced) => {
        const minutes = useTransform(p, [0.12, 0.7], [614, 992]);
        const clock = clockFrom(minutes);
        const leftX = useTransform(p, [0.12, 0.7], ["0%", "-16%"]);
        const rightX = useTransform(p, [0.12, 0.7], ["0%", "16%"]);
        const threadOpacity = useTransform(p, [0.55, 0.72], [1, 0]);
        const threadScale = useTransform(p, [0.12, 0.72], [1, 1.5]);
        const lossOpacity = useTransform(p, [0.78, 0.85], [0, 1]);
        const lossY = useTransform(p, [0.78, 0.9], [22, 0]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1240px]">
              <div className="relative flex items-center justify-between gap-6">
                <motion.div
                  className="w-[42%] max-w-[420px] rounded-[18px] border border-black/10 bg-white px-5 py-6 sm:px-7"
                  style={reduced ? undefined : { x: leftX }}
                >
                  <EnquiryCard compact />
                </motion.div>

                <motion.div
                  aria-hidden
                  className="absolute left-1/2 h-px w-[26%] -translate-x-1/2 bg-black/25"
                  style={
                    reduced
                      ? undefined
                      : { opacity: threadOpacity, scaleX: threadScale }
                  }
                />

                <motion.div
                  className="w-[42%] max-w-[420px] rounded-[18px] border border-black/10 bg-white/70 px-5 py-6 sm:px-7"
                  style={reduced ? undefined : { x: rightX }}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Your day
                  </div>
                  <div
                    className="mt-4 text-[20px] leading-[1.14] tracking-[-0.045em] sm:text-[26px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                  >
                    On a job, on a ladder, on the phone to someone else.
                  </div>
                  <motion.div className="mt-6 text-[13px] font-semibold tabular-nums text-black/45">
                    {clock}
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="mt-16 text-center"
                style={reduced ? undefined : { opacity: lossOpacity, y: lossY }}
              >
                <Headline tone={LOSS}>Booked elsewhere.</Headline>
                <p className="mx-auto mt-6 max-w-[460px] text-[15px] leading-[1.65] text-black/50">
                  Nothing broke. The distance between the two simply grew all day.
                </p>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 06 · Slipping stack                                                  */
/* ------------------------------------------------------------------ */

const V6: VariantMeta = {
  n: "06",
  title: "Slipping stack",
  idea: "One card falls out of the pile",
  note: "The inbox as a physical stack. Cards pile up through the day, and the one at the bottom slides out of frame. Tactile and instantly readable without any reading.",
};

const STACK = [
  "Quote for next Tuesday",
  "Supplier invoice",
  "Reschedule request",
  "Sarah Miller · new enquiry",
];

function SlippingStack() {
  return (
    <Stage meta={V6}>
      {(p, reduced) => {
        const lossOpacity = useTransform(p, [0.8, 0.86], [0, 1]);
        const lossY = useTransform(p, [0.8, 0.9], [24, 0]);
        const stackFade = useTransform(p, [0.78, 0.86], [1, 0.2]);

        return (
          <div className="absolute inset-0 flex items-center justify-center px-5">
            <motion.div
              className="relative h-[360px] w-full max-w-[560px]"
              style={reduced ? undefined : { opacity: stackFade }}
            >
              {STACK.map((label, i) => (
                <StackCard key={label} label={label} index={i} p={p} reduced={reduced} />
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-x-5 top-1/2 mx-auto max-w-[1080px] -translate-y-1/2 sm:inset-x-10 lg:inset-x-16"
              style={reduced ? undefined : { opacity: lossOpacity, y: lossY }}
            >
              <Headline eyebrow="4:32 PM · outcome" tone={LOSS}>
                Booked elsewhere.
              </Headline>
            </motion.div>
          </div>
        );
      }}
    </Stage>
  );
}

function StackCard({
  label,
  index,
  p,
  reduced,
}: {
  label: string;
  index: number;
  p: MotionValue<number>;
  reduced: boolean;
}) {
  const hero = index === STACK.length - 1;
  const arrive = 0.2 + index * 0.09;
  const opacity = useTransform(p, [arrive - 0.06, arrive], [0, 1]);
  const y = useTransform(
    p,
    hero ? [arrive - 0.06, arrive, 0.66, 0.78] : [arrive - 0.06, arrive],
    hero ? [-40, index * 26, index * 26, 520] : [-40, index * 26],
  );
  const rotate = useTransform(
    p,
    hero ? [0.66, 0.78] : [0, 1],
    hero ? [index % 2 ? 1.2 : -1.2, 9] : [index % 2 ? 1.2 : -1.2, index % 2 ? 1.2 : -1.2],
  );
  return (
    <motion.div
      className="absolute inset-x-0 rounded-[16px] border border-black/10 bg-white px-6 py-5 shadow-[0_24px_60px_-50px_rgba(0,0,0,0.7)]"
      style={reduced ? { top: index * 26 } : { opacity, y, rotate }}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`text-[15px] ${hero ? "font-semibold" : "text-black/55"}`}>{label}</span>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: hero ? LOSS : "rgba(0,0,0,0.3)" }}
        >
          {hero ? "waiting" : "handled"}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 07 · Value drain                                                     */
/* ------------------------------------------------------------------ */

const V7META: VariantMeta = {
  n: "07",
  title: "Value drain",
  idea: "The number falls as the clock rises",
  note: "The most commercially blunt option. A live job value counts down against the clock, so the cost of the delay is on screen the entire time. Use only where a credible number exists.",
};

function ValueDrain() {
  return (
    <Stage meta={V7META}>
      {(p, reduced) => {
        const minutes = useTransform(p, [0.12, 0.72], [614, 992]);
        const clock = clockFrom(minutes);
        const meridiem = useTransform(minutes, (m): string => (m >= 720 ? "PM" : "AM"));
        const value = useTransform(p, [0.16, 0.74], [2400, 0]);
        const money = useTransform(value, (v) => `$${Math.max(0, Math.round(v)).toLocaleString()}`);
        const barScale = useTransform(p, [0.16, 0.74], [1, 0]);
        const numberColor = useTransform(p, [0.16, 0.5, 0.74], [INK, "#8A6A2F", LOSS]);
        const lossOpacity = useTransform(p, [0.8, 0.86], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1080px]">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Value of the job on the table
                  </div>
                  <motion.div
                    className="mt-4 text-[68px] leading-[0.86] tracking-[-0.07em] tabular-nums sm:text-[110px] lg:text-[132px]"
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 500,
                      color: reduced ? LOSS : numberColor,
                    }}
                  >
                    {money}
                  </motion.div>
                </div>
                <div className="flex items-baseline gap-1 pb-4 tabular-nums">
                  <motion.span
                    className="text-[30px] leading-none tracking-[-0.05em] sm:text-[40px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                  >
                    {clock}
                  </motion.span>
                  <motion.span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40">
                    {meridiem}
                  </motion.span>
                </div>
              </div>

              <div className="relative mt-10 h-[6px] overflow-hidden rounded-full bg-black/10">
                <motion.div
                  className="absolute inset-y-0 left-0 w-full rounded-full"
                  style={{
                    originX: 0,
                    scaleX: reduced ? 0.05 : barScale,
                    backgroundColor: reduced ? LOSS : numberColor,
                  }}
                />
              </div>

              <motion.div
                className="mt-12"
                style={reduced ? undefined : { opacity: lossOpacity }}
              >
                <Headline eyebrow="4:32 PM · outcome" tone={LOSS}>
                  Booked elsewhere.
                </Headline>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 08 · Departure                                                       */
/* ------------------------------------------------------------------ */

const V8: VariantMeta = {
  n: "08",
  title: "Departure",
  idea: "The customer leaves the frame",
  note: "Human rather than mechanical. Sarah's presence drifts out of the composition and leaves an empty outline where she was. The most emotional treatment of the ten.",
};

function Departure() {
  return (
    <Stage meta={V8}>
      {(p, reduced) => {
        const x = useTransform(p, [0.3, 0.76], ["0%", "72%"]);
        const opacity = useTransform(p, [0.3, 0.76], [1, 0]);
        const blur = useTransform(p, [0.3, 0.76], ["blur(0px)", "blur(10px)"]);
        const ghost = useTransform(p, [0.62, 0.8], [0, 1]);
        const lossOpacity = useTransform(p, [0.82, 0.88], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1080px]">
              <div className="relative h-[220px]">
                <motion.div
                  aria-hidden
                  className="absolute left-0 top-0 h-[150px] w-[150px] rounded-full border-2 border-dashed border-black/20"
                  style={reduced ? { opacity: 1 } : { opacity: ghost }}
                />
                <motion.div
                  className="absolute left-0 top-0 flex h-[150px] w-[150px] items-center justify-center rounded-full bg-[#111318] text-[34px] font-bold text-white"
                  style={
                    reduced
                      ? { opacity: 0.15 }
                      : { x, opacity, filter: blur, fontFamily: DISPLAY }
                  }
                >
                  SM
                </motion.div>
                <div className="absolute left-[178px] top-6 max-w-[420px]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                    Sarah Miller · 10:14 AM
                  </div>
                  <div
                    className="mt-3 text-[24px] leading-[1.1] tracking-[-0.05em] sm:text-[30px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                  >
                    “Hi, are you available this week?”
                  </div>
                </div>
              </div>

              <motion.div
                className="mt-10"
                style={reduced ? undefined : { opacity: lossOpacity }}
              >
                <Headline eyebrow="4:32 PM · outcome" tone={LOSS}>
                  She stopped waiting.
                </Headline>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 09 · Dissolve                                                        */
/* ------------------------------------------------------------------ */

const V9: VariantMeta = {
  n: "09",
  title: "Dissolve",
  idea: "The enquiry breaks into pieces",
  note: "The card fragments into tiles that drift apart on their own timing. Highest visual craft, and the most decorative, so it earns its place only if the copy stays very plain.",
};

const TILES = Array.from({ length: 40 }, (_, i) => i);

function Dissolve() {
  return (
    <Stage meta={V9}>
      {(p, reduced) => {
        const lossOpacity = useTransform(p, [0.8, 0.87], [0, 1]);
        const textFade = useTransform(p, [0.42, 0.6], [1, 0]);

        return (
          <div className="absolute inset-0 flex items-center justify-center px-5">
            <div className="relative w-full max-w-[680px]">
              <div className="relative overflow-hidden rounded-[20px]">
                <div className="grid grid-cols-8 gap-[2px]">
                  {TILES.map((i) => (
                    <Tile key={i} i={i} p={p} reduced={reduced} />
                  ))}
                </div>
                <motion.div
                  className="pointer-events-none absolute inset-0 flex items-center px-7"
                  style={reduced ? undefined : { opacity: textFade }}
                >
                  <div
                    className="text-[24px] leading-[1.1] tracking-[-0.05em] sm:text-[32px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                  >
                    “Hi, are you available this week?”
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                style={reduced ? undefined : { opacity: lossOpacity }}
              >
                <Headline eyebrow="4:32 PM · outcome" tone={LOSS}>
                  Booked elsewhere.
                </Headline>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

function Tile({ i, p, reduced }: { i: number; p: MotionValue<number>; reduced: boolean }) {
  const col = i % 8;
  const row = Math.floor(i / 8);
  const start = 0.3 + col * 0.028 + row * 0.02;
  const opacity = useTransform(p, [start, start + 0.09], [1, 0]);
  const x = useTransform(p, [start, start + 0.14], [0, (col - 3.5) * 16]);
  const y = useTransform(p, [start, start + 0.14], [0, (row - 2) * 14 + 26]);
  const rotate = useTransform(p, [start, start + 0.14], [0, (col % 2 ? 1 : -1) * 12]);
  return (
    <motion.div
      className="aspect-[3/2] bg-white"
      style={reduced ? { opacity: 0.25 } : { opacity, x, y, rotate }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 10 · Rewind and resolve                                              */
/* ------------------------------------------------------------------ */

const V10: VariantMeta = {
  n: "10",
  title: "Rewind and resolve",
  idea: "Same day, replayed with follow-through",
  note: "The only variant that resolves. The day runs out, then the clock rewinds and the same enquiry is replayed with the next step attached. Strongest as the section that hands off into the product.",
};

const RESOLVE = [
  { at: 0.62, label: "10:14", detail: "Enquiry received" },
  { at: 0.7, label: "10:14", detail: "Replied automatically" },
  { at: 0.78, label: "10:26", detail: "Times offered" },
  { at: 0.86, label: "10:31", detail: "Booked" },
];

function RewindResolve() {
  return (
    <Stage meta={V10} height="340vh">
      {(p, reduced) => {
        const forward = useTransform(p, [0.1, 0.44], [614, 992]);
        const back = useTransform(p, [0.5, 0.6], [992, 614]);
        const rewinding = useTransform(p, (v) => (v > 0.5 ? 1 : 0));
        const minutes = useTransform([forward, back, rewinding], ([f, b, r]) =>
          (r as number) === 1 ? (b as number) : (f as number),
        );
        const clock = clockFrom(minutes as MotionValue<number>);
        const lossOpacity = useTransform(p, [0.4, 0.46, 0.52, 0.56], [0, 1, 1, 0]);
        const resolveOpacity = useTransform(p, [0.56, 0.62], [0, 1]);
        const clockColor = useTransform(p, [0.3, 0.46, 0.6], [INK, LOSS, WIN]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1080px]">
              <motion.div
                className="text-[72px] leading-[0.84] tracking-[-0.07em] tabular-nums sm:text-[120px]"
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 500,
                  color: reduced ? WIN : clockColor,
                }}
              >
                {clock}
              </motion.div>

              <motion.div
                className="mt-8"
                style={reduced ? { opacity: 0 } : { opacity: lossOpacity }}
              >
                <div
                  className="text-[36px] leading-[0.94] tracking-[-0.06em] sm:text-[54px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500, color: LOSS }}
                >
                  Booked elsewhere.
                </div>
              </motion.div>

              <motion.div
                className="mt-8 max-w-[620px]"
                style={reduced ? undefined : { opacity: resolveOpacity }}
              >
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                  The same day, with follow-through attached
                </div>
                <div className="mt-6 space-y-4">
                  {RESOLVE.map((s) => (
                    <RaceRow key={s.detail} step={s} p={p} reduced={reduced} tone="live" />
                  ))}
                </div>
                <div
                  className="mt-8 text-[30px] leading-[0.96] tracking-[-0.05em] sm:text-[42px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500, color: WIN }}
                >
                  Booked by 10:31 AM.
                </div>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                 */
/* ------------------------------------------------------------------ */

const INDEX: VariantMeta[] = [V1, V2, V3, V4, V5, V6, V7META, V8, V9, V10];

export function RevenueLeaksLab() {
  return (
    <div style={{ backgroundColor: PAPER, color: INK }}>
      <section className="px-5 pb-24 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">
            Motion lab · where revenue leaks
          </div>
          <h1
            className="mt-6 max-w-[1000px] text-[44px] leading-[0.9] tracking-[-0.06em] sm:text-[70px] lg:text-[92px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            Ten ways to make the same loss felt.
          </h1>
          <p className="mt-8 max-w-[640px] text-[16px] leading-[1.7] text-black/55 sm:text-[18px]">
            One enquiry, one working day, one outcome. Every version below carries the same story
            and the same words, so the only thing changing is the motion grammar. Scroll each stage
            to the end before judging it.
          </p>

          <ol className="mt-14 grid gap-x-10 gap-y-4 border-t border-black/10 pt-8 sm:grid-cols-2">
            {INDEX.map((m) => (
              <li key={m.n} className="flex items-baseline gap-4 border-b border-black/[0.06] pb-4">
                <span className="w-[26px] shrink-0 text-[11px] font-semibold tabular-nums text-black/35">
                  {m.n}
                </span>
                <span className="flex-1">
                  <span className="text-[16px] font-semibold">{m.title}</span>
                  <span className="mt-1 block text-[13px] leading-[1.55] text-black/45">
                    {m.idea}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <IntentCooling />
      <WordErasure />
      <SplitRace />
      <SignalField />
      <WideningGap />
      <SlippingStack />
      <ValueDrain />
      <Departure />
      <Dissolve />
      <RewindResolve />

      <section className="bg-[#070A0D] px-5 py-28 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#52D9DE]">
            Pick one
          </div>
          <p
            className="mt-6 max-w-[900px] text-[28px] leading-[1.02] tracking-[-0.05em] text-white/85 sm:text-[42px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            Tell me the number and I will build it out properly on the live section, with the
            hand-off, mobile composition and reduced-motion path finished.
          </p>
        </div>
      </section>
    </div>
  );
}
