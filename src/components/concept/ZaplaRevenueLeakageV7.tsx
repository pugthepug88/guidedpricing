import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';

/** Quiet system notes that accumulate inside the enquiry card. */
const NOTES: { at: number; label: string; detail: string; tone?: "warn" }[] = [
  { at: 0.3, label: "10:47", detail: "No reply yet" },
  { at: 0.42, label: "12:23", detail: "Still waiting" },
  { at: 0.54, label: "2:38", detail: "No longer urgent" },
  { at: 0.64, label: "4:11", detail: "Comparing other options", tone: "warn" },
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function ZaplaRevenueLeakageV7() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Mirror the scroll progress into a plain motion value so every beat is
     driven from one JS-updated clock instead of native scroll timelines,
     which map ranges unreliably on a sticky section of this height. */
  const p = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => p.set(v));

  /* ---- opening statement ---- */
  const introOpacity = useTransform(
    p, [0, 0.1, 0.17], [1, 1, 0]);
  const introY = useTransform(
    p, [0.06, 0.17], [0, -64]);

  /* ---- the enquiry: one object, already composed ---- */
  const stageOpacity = useTransform(
    p, [0.13, 0.19], [0, 1]);

  /* clock counts continuously through the working day: 10:14 -> 4:32 */
  const minutes = useTransform(
    p, [0.2, 0.72], [614, 992]);
  const clock = useTransform(minutes, (m) => {
    const total = Math.round(m);
    const h24 = Math.floor(total / 60);
    const h = h24 > 12 ? h24 - 12 : h24;
    return `${h}:${pad(total % 60)}`;
  });
  const meridiem = useTransform(minutes, (m): string => (m >= 720 ? "PM" : "AM"));

  /* heat drains as the day passes */
  const heat = useTransform(
    p, [0.2, 0.7], [1, 0]);
  const heatHue = useTransform(
    p, [0.2, 0.5, 0.7], ["#3FA97C", "#C79A4A", "#A93640"]);

  /* the card cools: colour, light, and life all drop together */
  const cardSaturate = useTransform(
    p, [0.2, 0.7], ["saturate(1)", "saturate(0.55)"]);
  const cardPaper = useTransform(
    p, [0.2, 0.72], ["#FFFDF9", "#E9E3D9"]);
  const cardLight = useTransform(
    p, [0.2, 0.7], [1, 0.12]);
  const veilOpacity = useTransform(
    p, [0.34, 0.72], [0, 0.4]);
  const liveOpacity = useTransform(
    p, [0.2, 0.46], [1, 0]);

  /* loss: the same object tilts out of the light, then is replaced on its own axis */
  const cardRotate = useTransform(
    p, [0.72, 0.79], [0, -3.2]);
  const cardDrop = useTransform(
    p, [0.72, 0.79], [0, 34]);
  const cardOpacity = useTransform(
    p, [0.74, 0.8], [1, 0]);
  const cardScale = useTransform(
    p, [0.72, 0.8], [1, 0.97]);

  const lossOpacity = useTransform(
    p, [0.77, 0.82], [0, 1]);
  const lossY = useTransform(
    p, [0.77, 0.85], [26, 0]);
  const consequenceOpacity = useTransform(
    p, [0.85, 0.9], [0, 1]);
  const consequenceY = useTransform(
    p, [0.85, 0.92], [22, 0]);

  const canvasColor = useTransform(
    p,
    [0, 0.97, 1],
    ["#F2EEE7", "#F2EEE7", "#070A0D"],
  );
  const handoffOpacity = useTransform(
    p, [0.97, 1], [0, 1]);
  const handoffScale = useTransform(
    p, [0.97, 1], [0, 1]);

  /* the stage label belongs to the enquiry, so it leaves with it */
  const stageLabelOpacity = useTransform(
    p, [0.72, 0.78], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[340vh] sm:h-[360vh]"
      aria-label="Where revenue leaks"
    >
      <motion.div
        className="sticky top-0 h-screen overflow-hidden text-[#0D1117]"
        style={{ backgroundColor: reduced ? "#F2EEE7" : canvasColor }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/[0.06]" />

        {/* 1. Still opening statement. */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16"
            style={{ opacity: introOpacity, y: introY }}
          >
            <div className="mx-auto grid w-full max-w-[1440px] gap-10 lg:grid-cols-[1.18fr_.62fr] lg:items-end lg:gap-24">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#68736F]">
                  Where revenue leaks
                </div>
                <h2
                  className="mt-5 max-w-[980px] text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[90px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                >
                  The customer was ready.
                  <span className="block text-[#858782]">The business was busy.</span>
                </h2>
              </div>
              <p className="max-w-[500px] text-[16px] leading-[1.72] text-[#6E706C] sm:text-[18px] lg:pb-2">
                No system crashed. No one decided to lose the enquiry. The day simply kept moving
                while the customer kept waiting.
              </p>
            </div>
          </motion.div>
        )}

        {/* 2-5. One object on stage, cooling. */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 lg:px-16"
          style={reduced ? undefined : { opacity: stageOpacity }}
        >
          <div className="relative w-full max-w-[820px]">
            <motion.div
              className="absolute -top-10 left-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B8680] sm:-top-12"
              style={reduced ? undefined : { opacity: stageLabelOpacity }}
            >
              One enquiry · one working day
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-[22px] border border-[#DBD3C7]"
              style={
                reduced
                  ? { backgroundColor: "#E9E3D9" }
                  : {
                      backgroundColor: cardPaper,
                      filter: cardSaturate,
                      rotate: cardRotate,
                      y: cardDrop,
                      scale: cardScale,
                      opacity: cardOpacity,
                    }
              }
            >
              {/* light on the paper fades as the enquiry cools */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  opacity: reduced ? 0.12 : cardLight,
                  background:
                    "radial-gradient(120% 90% at 12% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 62%)",
                }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[#8F8778]"
                style={{ opacity: reduced ? 0.5 : veilOpacity, mixBlendMode: "multiply" }}
              />

              <div className="relative px-6 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8">
                {/* header: the clock lives on the object itself */}
                <div className="flex items-start gap-3 border-b border-[#CFC7BA] pb-5 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white sm:h-12 sm:w-12">
                    SM
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold sm:text-[16px]">Sarah Miller</div>
                    <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8F8A83]">
                      Website enquiry · received 10:14 AM
                    </div>
                  </div>
                  <div className="ml-auto flex items-baseline gap-1.5 tabular-nums">
                    <motion.span
                      className="text-[26px] leading-none tracking-[-0.05em] sm:text-[34px]"
                      style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                    >
                      {reduced ? "4:32" : clock}
                    </motion.span>
                    <motion.span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8F8A83]">
                      {reduced ? "PM" : meridiem}
                    </motion.span>
                  </div>
                </div>

                <div
                  className="mt-7 max-w-[640px] text-[28px] leading-[1.04] tracking-[-0.045em] sm:mt-8 sm:text-[40px] lg:text-[48px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500 }}
                >
                  “Hi, are you available this week?”
                </div>

                {/* heat bar: the enquiry's remaining warmth */}
                <div className="mt-8 sm:mt-9">
                  <div className="flex items-center justify-between text-[8px] font-semibold uppercase tracking-[0.17em] text-[#918B84]">
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#3FA97C]"
                        style={{ opacity: reduced ? 0 : liveOpacity }}
                      />
                      {reduced ? "Intent lost" : "Intent cooling"}
                    </span>
                    <span>Awaiting a reply</span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-[#D6CEC2]">
                    <motion.div
                      className="h-full w-full origin-left rounded-full"
                      style={{
                        scaleX: reduced ? 0.04 : heat,
                        backgroundColor: reduced ? "#A93640" : heatHue,
                      }}
                    />
                  </div>
                </div>

                {/* accumulating notes: evidence, not flashing labels */}
                <div className="mt-7 grid gap-2.5 sm:mt-8">
                  {NOTES.map((note) => (
                    <NoteRow
                      key={note.label}
                      note={note}
                      progress={p}
                      reduced={reduced}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 5. Replacement on the card's own axis. */}
            <motion.div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2"
              style={reduced ? undefined : { opacity: lossOpacity, y: lossY }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A66066]">
                4:32 PM · outcome
              </div>
              <div
                className="mt-4 text-[56px] leading-[0.86] tracking-[-0.07em] text-[#A93640] sm:text-[84px] lg:text-[104px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                Booked elsewhere.
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 6. Consequence. */}
        <motion.div
          className="absolute inset-x-0 bottom-[9vh] z-30 px-5 sm:px-10 lg:px-16"
          style={reduced ? undefined : { opacity: consequenceOpacity, y: consequenceY }}
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 border-t border-[#C9B4B1] pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div
              className="max-w-[720px] text-[24px] leading-[1.04] tracking-[-0.04em] text-[#17191B] sm:text-[32px] lg:text-[40px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              Nothing broke. The next step never happened.
            </div>
            <p className="max-w-[420px] text-[13px] leading-[1.65] text-[#756E69] sm:text-[15px]">
              That is what revenue leakage looks like when nobody notices it happening.
            </p>
          </div>
        </motion.div>

        {/* Hand-off into the dark section. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-50 h-px origin-left bg-[#52D9DE]"
          style={{ opacity: reduced ? 0 : handoffOpacity, scaleX: reduced ? 0 : handoffScale }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 z-[45] h-[18vh] bg-gradient-to-b from-transparent to-[#070A0D]"
          style={{ opacity: reduced ? 0 : handoffOpacity }}
        />
      </motion.div>
    </section>
  );
}

function NoteRow({
  note,
  progress,
  reduced,
}: {
  note: (typeof NOTES)[number];
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const opacity = useTransform(progress, [note.at - 0.05, note.at], [0, 1]);
  const x = useTransform(progress, [note.at - 0.05, note.at + 0.02], [-14, 0]);

  return (
    <motion.div
      className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.17em] sm:text-[11px]"
      style={reduced ? undefined : { opacity, x }}
    >
      <span className="w-[42px] shrink-0 tabular-nums text-[#8F8A83]">{note.label}</span>
      <span className="h-px flex-1 bg-[#D2CABE]" />
      <span className={note.tone === "warn" ? "text-[#8E565A]" : "text-[#6F6C67]"}>
        {note.detail}
      </span>
    </motion.div>
  );
}
