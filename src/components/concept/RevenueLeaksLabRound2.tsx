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

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const PAPER = "#F2EEE7";
const INK = "#0D1117";
const LOSS = "#A93640";
const WIN = "#1E7F5C";
const CYAN = "#06B6D4";

type VariantMeta = {
  n: string;
  title: string;
  idea: string;
  note: string;
};

function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => p.set(v));
  return p;
}

function Stage({
  meta,
  height = "300vh",
  background = PAPER,
  tone = INK,
  children,
}: {
  meta: VariantMeta;
  height?: string;
  background?: string;
  tone?: string;
  children: (p: MotionValue<number>, reduced: boolean) => ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const p = useSectionProgress(ref);
  const reduced = !!useReducedMotion();

  const dark = tone === "#FFFFFF";

  return (
    <section ref={ref} className="relative" style={{ height }} aria-label={`${meta.n}. ${meta.title}`}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: background, color: tone }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-40 h-px"
          style={{ backgroundColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 px-5 pt-6 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1440px] items-start justify-between gap-8">
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}
            >
              {meta.n} · {meta.title}
            </div>
            <div
              className="hidden max-w-[440px] text-right text-[10px] font-medium uppercase tracking-[0.16em] sm:block"
              style={{ color: dark ? "rgba(255,255,255,0.34)" : "rgba(0,0,0,0.34)" }}
            >
              {meta.idea}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-5 pb-6 sm:px-10 lg:px-16">
          <div
            className="mx-auto w-full max-w-[1440px] text-[11px] leading-[1.6]"
            style={{ color: dark ? "rgba(255,255,255,0.36)" : "rgba(0,0,0,0.4)" }}
          >
            {meta.note}
          </div>
        </div>
        {children(p, reduced)}
      </div>
    </section>
  );
}

function Headline({
  eyebrow,
  children,
  color = INK,
  className = "",
}: {
  eyebrow?: string;
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && (
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: color === "#FFFFFF" ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)" }}
        >
          {eyebrow}
        </div>
      )}
      <div
        className="mt-4 text-[42px] leading-[0.91] tracking-[-0.06em] sm:text-[64px] lg:text-[82px]"
        style={{ fontFamily: DISPLAY, fontWeight: 500, color }}
      >
        {children}
      </div>
    </div>
  );
}

function SarahMessage({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="rounded-[18px] border p-5"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
        backgroundColor: dark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold">Sarah Miller</div>
          <div
            className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)" }}
          >
            Website enquiry
          </div>
        </div>
        <div
          className="text-[10px] font-semibold tabular-nums"
          style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}
        >
          10:14 AM
        </div>
      </div>
      <div className="mt-5 text-[22px] leading-[1.12] tracking-[-0.04em] sm:text-[26px]" style={{ fontFamily: DISPLAY }}>
        “Hi, are you available this week?”
      </div>
    </div>
  );
}

function PhoneFrame({
  label,
  dark = false,
  children,
}: {
  label: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[30px] border shadow-[0_32px_90px_-60px_rgba(0,0,0,0.55)]"
      style={{
        backgroundColor: dark ? "#101316" : "#FFFFFF",
        color: dark ? "#FFFFFF" : INK,
        borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
      }}
    >
      <div className="mx-auto mt-3 h-5 w-20 rounded-full bg-black/80" />
      <div className="px-5 pb-6 pt-5">
        <div
          className="text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}
        >
          {label}
        </div>
        {children}
      </div>
    </div>
  );
}

function MotionListItem({
  p,
  start,
  children,
  tone = "normal",
}: {
  p: MotionValue<number>;
  start: number;
  children: ReactNode;
  tone?: "normal" | "muted" | "success";
}) {
  const opacity = useTransform(p, [start, start + 0.07], [0, tone === "muted" ? 0.42 : 1]);
  const y = useTransform(p, [start, start + 0.07], [18, 0]);
  return (
    <motion.div
      className="rounded-[14px] border px-4 py-3 text-[12px]"
      style={{
        opacity,
        y,
        borderColor: tone === "success" ? "rgba(30,127,92,0.22)" : "rgba(0,0,0,0.09)",
        backgroundColor: tone === "success" ? "#ECF6F1" : "#FFFFFF",
        color: tone === "success" ? WIN : INK,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 11 · Two screens. One lost customer.                                */
/* ------------------------------------------------------------------ */

const V11: VariantMeta = {
  n: "11",
  title: "Two screens. One lost customer.",
  idea: "Show both realities at once",
  note: "Sarah's phone and the business inbox tell the same story from opposite sides. Your business received the enquiry. Sarah eventually received a reply somewhere else.",
};

function TwoScreens() {
  return (
    <Stage meta={V11} height="340vh">
      {(p, reduced) => {
        const leftX = useTransform(p, [0.1, 0.24], [-50, 0]);
        const rightX = useTransform(p, [0.1, 0.24], [50, 0]);
        const competitorOpacity = useTransform(p, [0.5, 0.62], [0, 1]);
        const bookingOpacity = useTransform(p, [0.7, 0.8], [0, 1]);
        const businessDim = useTransform(p, [0.58, 0.8], [1, 0.34]);
        const outcomeOpacity = useTransform(p, [0.8, 0.9], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1180px]">
              <div className="grid gap-7 md:grid-cols-2">
                <motion.div style={reduced ? undefined : { x: leftX }}>
                  <PhoneFrame label="Sarah's phone">
                    <div className="mt-7 rounded-[16px] bg-black/[0.04] p-4">
                      <div className="text-[11px] font-semibold">You</div>
                      <div className="mt-2 text-[17px] leading-[1.35]">Hi, are you available this week?</div>
                    </div>
                    <div className="mt-4 text-[10px] uppercase tracking-[0.16em] text-black/30">Delivered</div>
                    <motion.div className="mt-9" style={reduced ? undefined : { opacity: competitorOpacity }}>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">Another provider</div>
                      <div className="mt-3 rounded-[16px] bg-[#E7F5EF] p-4 text-[#1E7F5C]">
                        <div className="text-[15px] font-semibold">Yes, we can do Thursday.</div>
                      </div>
                    </motion.div>
                    <motion.div className="mt-4 rounded-[16px] border border-[#1E7F5C]/20 bg-[#F1F8F5] p-4" style={reduced ? undefined : { opacity: bookingOpacity }}>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E7F5C]">Confirmed</div>
                      <div className="mt-1 text-[21px] font-semibold tracking-[-0.03em]">Booked · Thu 10:30</div>
                    </motion.div>
                  </PhoneFrame>
                </motion.div>

                <motion.div style={reduced ? undefined : { x: rightX, opacity: businessDim }}>
                  <PhoneFrame label="Your business" dark>
                    <div className="mt-7"><SarahMessage dark /></div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 p-3 text-[11px] text-white/45">Invoice paid</div>
                      <div className="rounded-xl border border-white/10 p-3 text-[11px] text-white/45">Call returned</div>
                      <div className="rounded-xl border border-white/10 p-3 text-[11px] text-white/45">Booking moved</div>
                      <div className="rounded-xl border border-white/10 p-3 text-[11px] text-white/45">Quote sent</div>
                    </div>
                    <div className="mt-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">Sarah · still waiting</div>
                  </PhoneFrame>
                </motion.div>
              </div>
              <motion.div className="mt-10 text-center text-[38px] tracking-[-0.055em] text-[#A93640] sm:text-[54px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcomeOpacity }}>
                The lead did not disappear. It became someone else's booking.
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 12 · Missing handoff                                                 */
/* ------------------------------------------------------------------ */

const V12: VariantMeta = {
  n: "12",
  title: "The missing handoff",
  idea: "The workflow stops where ownership should begin",
  note: "Capture succeeds. The first real failure is the handoff from received to owned. Everything downstream stays dormant because nobody takes the next action.",
};

function HandoffStep({
  p,
  index,
  label,
  danger = false,
}: {
  p: MotionValue<number>;
  index: number;
  label: string;
  danger?: boolean;
}) {
  const start = 0.16 + index * 0.08;
  const opacity = useTransform(p, [start, start + 0.07], [0.14, index < 2 ? 1 : danger ? 0.65 : 0.18]);
  const y = useTransform(p, [start, start + 0.07], [16, 0]);
  return (
    <motion.div
      className="relative rounded-[16px] border px-3 py-5 text-center text-[10px] font-semibold uppercase tracking-[0.13em] sm:px-4 sm:text-[11px]"
      style={{
        opacity,
        y,
        borderColor: danger ? "rgba(169,54,64,0.3)" : "rgba(0,0,0,0.1)",
        backgroundColor: danger ? "rgba(169,54,64,0.04)" : "#FFFFFF",
        color: danger ? LOSS : INK,
      }}
    >
      {label}
      {danger && <div className="mt-2 text-[8px] tracking-[0.12em]">Nobody owns this</div>}
    </motion.div>
  );
}

function MissingHandoff() {
  return (
    <Stage meta={V12} height="320vh" background="#F7F8FA">
      {(p, reduced) => {
        const lineScale = useTransform(p, [0.15, 0.42], [0, 0.45]);
        const outcome = useTransform(p, [0.7, 0.82], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1180px]">
              <Headline eyebrow="Sarah Miller · new enquiry">The lead arrived.<br />The handoff didn't.</Headline>
              <div className="relative mt-14">
                <div className="absolute left-[8%] right-[8%] top-1/2 h-px bg-black/10" />
                <motion.div className="absolute left-[8%] right-[8%] top-1/2 h-[2px] origin-left bg-[#06B6D4]" style={{ scaleX: reduced ? 0.45 : lineScale }} />
                <div className="relative grid grid-cols-5 gap-2 sm:gap-4">
                  <HandoffStep p={p} index={0} label="Website" />
                  <HandoffStep p={p} index={1} label="Inbox" />
                  <HandoffStep p={p} index={2} label="Assigned" danger />
                  <HandoffStep p={p} index={3} label="Reply" />
                  <HandoffStep p={p} index={4} label="Booked" />
                </div>
              </div>
              <motion.div className="mt-12 text-[36px] tracking-[-0.05em] text-[#A93640] sm:text-[54px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                Booked elsewhere.
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 13 · Future never happened                                           */
/* ------------------------------------------------------------------ */

const V13: VariantMeta = {
  n: "13",
  title: "The future that never happened",
  idea: "Reveal all the downstream value one missed action erased",
  note: "A missed reply is not only a missed booking. It deletes the payment, review and repeat customer that would have existed after it.",
};

function FutureCard({ p, index, label }: { p: MotionValue<number>; index: number; label: string }) {
  const start = 0.2 + index * 0.055;
  const opacity = useTransform(p, [start, start + 0.07, 0.62, 0.76], [0, 0.72, 0.72, 0]);
  const y = useTransform(p, [start, start + 0.07, 0.62, 0.76], [18, 0, 0, -10]);
  const blur = useTransform(p, [0.62, 0.76], ["blur(0px)", "blur(8px)"]);
  return (
    <motion.div className="rounded-[18px] border border-black/10 bg-white px-4 py-8 text-center" style={{ opacity, y, filter: blur }}>
      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/30">0{index + 1}</div>
      <div className="mt-3 text-[18px] font-semibold">{label}</div>
    </motion.div>
  );
}

function FutureNeverHappened() {
  const future = ["Reply", "Booking", "Payment", "Review", "Repeat"];
  return (
    <Stage meta={V13} height="330vh">
      {(p, reduced) => {
        const outcome = useTransform(p, [0.74, 0.84], [0, 1]);
        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1240px]">
              <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <Headline eyebrow="One enquiry">This was more than one booking.</Headline>
                  <p className="mt-6 max-w-[460px] text-[16px] leading-7 text-black/50">It was the beginning of a customer relationship.</p>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {future.map((label, i) => (
                    <FutureCard key={label} p={p} index={i} label={label} />
                  ))}
                </div>
              </div>
              <motion.div className="mt-12 text-[36px] tracking-[-0.05em] text-[#A93640] sm:text-[52px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                None of it happened.
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 14 · From form to nowhere                                            */
/* ------------------------------------------------------------------ */

const V14: VariantMeta = {
  n: "14",
  title: "From form to nowhere",
  idea: "Show a believable process degrading into an intention",
  note: "The website works. The notification works. The inbox works. What fails is the human bridge between receiving the lead and moving it forward.",
};

function FormToNowhere() {
  return (
    <Stage meta={V14} height="350vh" background="#F7F8FA">
      {(p, reduced) => {
        const formX = useTransform(p, [0.1, 0.34], [0, -360]);
        const mailX = useTransform(p, [0.22, 0.42], [340, 0]);
        const mailY = useTransform(p, [0.5, 0.72], [0, 240]);
        const mailOpacity = useTransform(p, [0.56, 0.72], [1, 0.16]);
        const outcome = useTransform(p, [0.72, 0.84], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 lg:px-16">
            <div className="relative h-[590px] w-full max-w-[1120px] overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_35px_110px_-80px_rgba(0,0,0,0.6)]">
              <motion.div className="absolute left-[7%] top-[13%] w-[40%] rounded-[18px] border border-black/10 bg-[#F7F8FA] p-6" style={reduced ? undefined : { x: formX }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">Website enquiry</div>
                <div className="mt-5 text-[25px] font-semibold">Sarah Miller</div>
                <div className="mt-4 rounded-xl bg-white p-4 text-[15px]">Hi, are you available this week?</div>
                <div className="mt-4 inline-flex rounded-full bg-[#111318] px-4 py-2 text-[10px] font-semibold text-white">Submit enquiry</div>
              </motion.div>

              <motion.div className="absolute right-[7%] top-[19%] w-[38%] rounded-[18px] border border-black/10 bg-white p-6 shadow-[0_28px_70px_-55px_rgba(0,0,0,0.7)]" style={reduced ? undefined : { x: mailX, y: mailY, opacity: mailOpacity }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">Inbox</div>
                <div className="mt-4 text-[17px] font-semibold">New website enquiry</div>
                <div className="mt-2 text-[13px] text-black/45">Sarah Miller · unread</div>
                <div className="mt-5 rounded-xl bg-[#F7F8FA] p-3 text-[11px] text-black/40">Come back to this after lunch.</div>
              </motion.div>

              <motion.div className="absolute bottom-[10%] left-[7%] text-[48px] leading-[0.94] tracking-[-0.06em] text-[#A93640] sm:text-[66px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                Captured.<br />Not followed through.
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 15 · Everything moved except Sarah                                  */
/* ------------------------------------------------------------------ */

const V15: VariantMeta = {
  n: "15",
  title: "Everything moved except Sarah",
  idea: "Make stillness the failure",
  note: "A busy operational canvas resolves around Sarah while her enquiry remains frozen. The one thing that does not move becomes impossible to ignore.",
};

function BusyTile({ p, start, children }: { p: MotionValue<number>; start: number; children: ReactNode }) {
  const opacity = useTransform(p, [start, start + 0.08, start + 0.23], [0, 1, 0.16]);
  const y = useTransform(p, [start, start + 0.08, start + 0.23], [18, 0, -24]);
  return (
    <motion.div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5 text-[13px] text-white/62" style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function EverythingMovedExceptSarah() {
  return (
    <Stage meta={V15} height="360vh" background="#0B0D10" tone="#FFFFFF">
      {(p, reduced) => {
        const sarahScale = useTransform(p, [0.58, 0.8], [1, 1.09]);
        const sarahGlow = useTransform(p, [0.58, 0.8], ["0 0 0 0 rgba(6,182,212,0)", "0 0 0 1px rgba(6,182,212,0.4)"]);
        const noNext = useTransform(p, [0.68, 0.82], [0, 1]);

        return (
          <div className="absolute inset-0 px-5 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto grid h-full max-w-[1260px] items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <BusyTile p={p} start={0.14}>Call returned</BusyTile>
                <BusyTile p={p} start={0.2}>Invoice paid</BusyTile>
                <BusyTile p={p} start={0.26}>Booking confirmed</BusyTile>
                <BusyTile p={p} start={0.32}>Quote approved</BusyTile>
                <BusyTile p={p} start={0.38}>Review requested</BusyTile>
                <BusyTile p={p} start={0.44}>SMS sent</BusyTile>
              </div>
              <motion.div className="rounded-[20px] bg-white p-6 text-[#111318]" style={reduced ? undefined : { scale: sarahScale, boxShadow: sarahGlow }}>
                <SarahMessage />
                <motion.div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A93640]" style={{ opacity: reduced ? 1 : noNext }}>
                  No next step
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 16 · Unassigned                                                      */
/* ------------------------------------------------------------------ */

const V16: VariantMeta = {
  n: "16",
  title: "UNASSIGNED",
  idea: "One tiny product state becomes the whole commercial problem",
  note: "The enquiry is healthy. The software is healthy. One ownership state never changes, and the customer leaves while it still says UNASSIGNED.",
};

function Unassigned() {
  return (
    <Stage meta={V16} height="320vh">
      {(p, reduced) => {
        const wordScale = useTransform(p, [0.36, 0.74], [1, 5.2]);
        const wordOpacity = useTransform(p, [0.36, 0.74], [0.12, 0.045]);
        const outcome = useTransform(p, [0.74, 0.84], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10">
            <motion.div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[76px] font-semibold tracking-[-0.07em] text-[#A93640] sm:text-[126px]" style={{ fontFamily: DISPLAY, scale: reduced ? 2 : wordScale, opacity: reduced ? 0.05 : wordOpacity }}>
              UNASSIGNED
            </motion.div>
            <div className="relative w-full max-w-[760px]">
              <div className="rounded-[22px] border border-black/10 bg-white p-7 shadow-[0_28px_85px_-65px_rgba(0,0,0,0.7)]">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[14px] font-semibold">Sarah Miller</div>
                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">Website enquiry</div>
                  </div>
                  <div className="rounded-full bg-[#A93640]/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#A93640]">Unassigned</div>
                </div>
                <div className="mt-8 text-[30px] leading-[1.08] tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>“Hi, are you available this week?”</div>
              </div>
              <motion.div className="mt-10 text-center text-[40px] tracking-[-0.055em] text-[#A93640] sm:text-[58px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                Still unassigned.<br />Already gone.
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 17 · Tab badge                                                       */
/* ------------------------------------------------------------------ */

const V17: VariantMeta = {
  n: "17",
  title: "The tab badge",
  idea: "One tiny unread count survives every task switch",
  note: "A familiar operator behaviour: calendar, invoices, calls, email. The inbox badge stays at 1 through all of it. At the end we reveal what the 1 was worth.",
};

function BrowserTask({ p, start, label }: { p: MotionValue<number>; start: number; label: string }) {
  const opacity = useTransform(p, [start, start + 0.06, start + 0.16], [0, 1, 0.22]);
  const y = useTransform(p, [start, start + 0.06], [16, 0]);
  return <motion.div className="rounded-[16px] border border-black/10 p-5 text-[13px]" style={{ opacity, y }}>{label}</motion.div>;
}

function TabBadge() {
  return (
    <Stage meta={V17} height="360vh" background="#F7F8FA">
      {(p, reduced) => {
        const outcome = useTransform(p, [0.72, 0.84], [0, 1]);
        const badgeScale = useTransform(p, [0.62, 0.78], [1, 1.8]);
        return (
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 lg:px-16">
            <div className="w-full max-w-[1180px] overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_38px_100px_-72px_rgba(0,0,0,0.7)]">
              <div className="flex gap-1 border-b border-black/10 bg-[#ECEEF1] px-3 pt-3">
                {['Calendar','Invoices','Calls','Email'].map((tab) => (
                  <div key={tab} className="rounded-t-xl px-4 py-3 text-[11px] text-black/42">{tab}</div>
                ))}
                <div className="rounded-t-xl bg-white px-4 py-3 text-[11px] font-semibold">
                  Inbox
                  <motion.span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#A93640] text-[9px] text-white" style={{ scale: reduced ? 1.4 : badgeScale }}>1</motion.span>
                </div>
              </div>
              <div className="relative h-[450px] p-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">A normal busy day</div>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <BrowserTask p={p} start={0.14} label="10:30 meeting" />
                  <BrowserTask p={p} start={0.26} label="Invoice #204" />
                  <BrowserTask p={p} start={0.38} label="Call Ben" />
                  <BrowserTask p={p} start={0.5} label="Move booking" />
                </div>
                <motion.div className="absolute inset-x-8 bottom-10 text-[48px] tracking-[-0.06em] text-[#A93640] sm:text-[66px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                  That “1” was Sarah.
                </motion.div>
              </div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 18 · Silence occupies space                                          */
/* ------------------------------------------------------------------ */

const V18: VariantMeta = {
  n: "18",
  title: "Silence occupies space",
  idea: "Make the visitor scroll through the missing reply",
  note: "No product spectacle. The absence of a response is the visual. The blank space grows until it becomes uncomfortable, then the outcome appears at the bottom of it.",
};

function SilenceOccupiesSpace() {
  return (
    <Stage meta={V18} height="430vh" background="#FFFFFF">
      {(p, reduced) => {
        const gap = useTransform(p, [0.14, 0.7], [90, 520]);
        const lineOpacity = useTransform(p, [0.62, 0.76], [0.18, 0.05]);
        const outcome = useTransform(p, [0.73, 0.84], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-[1040px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">Sarah Miller · 10:14 AM</div>
              <div className="mt-5 text-[48px] leading-[0.97] tracking-[-0.06em] sm:text-[78px] lg:text-[92px]" style={{ fontFamily: DISPLAY }}>
                Hi, are you available<br className="hidden sm:block" /> this week?
              </div>
              <motion.div style={{ height: reduced ? 360 : gap }} />
              <motion.div className="border-t border-black/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/25" style={{ opacity: reduced ? 0.08 : lineOpacity }}>
                Your reply would appear here.
              </motion.div>
              <motion.div className="mt-8 text-[50px] tracking-[-0.06em] text-[#A93640] sm:text-[76px]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                Booked elsewhere.
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 19 · Your enquiry becomes their booking                             */
/* ------------------------------------------------------------------ */

const V19: VariantMeta = {
  n: "19",
  title: "Your enquiry becomes their booking",
  idea: "Loss is a transfer, not a disappearance",
  note: "The strongest shared-object experiment. Sarah's exact enquiry leaves your inbox and lands as a confirmed booking inside another provider's calendar.",
};

function EnquiryBecomesTheirBooking() {
  return (
    <Stage meta={V19} height="360vh">
      {(p, reduced) => {
        const x = useTransform(p, [0.18, 0.72], [0, 520]);
        const y = useTransform(p, [0.18, 0.72], [0, 78]);
        const scale = useTransform(p, [0.18, 0.72], [1, 0.76]);
        const rotate = useTransform(p, [0.18, 0.72], [0, 2]);
        const leftDim = useTransform(p, [0.5, 0.78], [1, 0.28]);
        const rightLift = useTransform(p, [0.5, 0.78], [0.38, 1]);
        const booked = useTransform(p, [0.7, 0.82], [0, 1]);

        return (
          <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-10 lg:px-16">
            <div className="relative grid w-full max-w-[1180px] grid-cols-2 gap-14">
              <motion.div className="rounded-[24px] border border-black/10 bg-white p-7" style={{ opacity: reduced ? 0.35 : leftDim }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">Your inbox</div>
                <div className="mt-8 h-[280px] rounded-[16px] bg-[#F7F8FA]" />
              </motion.div>
              <motion.div className="rounded-[24px] border border-black/10 bg-[#111318] p-7 text-white" style={{ opacity: reduced ? 1 : rightLift }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">Another provider</div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {['Wed','Thu','Fri'].map((day) => <div key={day} className="rounded-[14px] border border-white/10 p-4 text-center text-[11px] text-white/55">{day}</div>)}
                </div>
                <motion.div className="mt-6 rounded-[14px] bg-[#E7F5EF] p-4 text-[#1E7F5C]" style={{ opacity: reduced ? 1 : booked }}>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.16em]">Confirmed</div>
                  <div className="mt-1 text-[19px] font-semibold">Sarah · Thu 10:30</div>
                </motion.div>
              </motion.div>

              <motion.div className="absolute left-[8%] top-[34%] w-[300px] rounded-[18px] border border-black/10 bg-white p-5 shadow-[0_28px_80px_-50px_rgba(0,0,0,0.65)]" style={reduced ? { left: "58%", top: "42%", scale: 0.76 } : { x, y, scale, rotate }}>
                <div className="text-[11px] font-semibold">Sarah Miller</div>
                <div className="mt-2 text-[16px] leading-[1.35]">Hi, are you available this week?</div>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* 20 · Customer record never grew                                      */
/* ------------------------------------------------------------------ */

const V20: VariantMeta = {
  n: "20",
  title: "The customer record that never grew",
  idea: "Compare a living customer journey with one frozen at enquiry",
  note: "Healthy customer records accumulate replies, bookings, payments, reviews and reactivation. Sarah's record contains one event forever: New enquiry.",
};

function HealthyRecordEvent({ p, index, label }: { p: MotionValue<number>; index: number; label: string }) {
  const start = 0.14 + index * 0.07;
  const opacity = useTransform(p, [start, start + 0.06], [0.16, 1]);
  const y = useTransform(p, [start, start + 0.06], [12, 0]);
  return (
    <motion.div className="flex items-center gap-4" style={{ opacity, y }}>
      <div className="h-2.5 w-2.5 rounded-full bg-[#1E7F5C]" />
      <div className="text-[15px] font-medium">{label}</div>
    </motion.div>
  );
}

function RecordNeverGrew() {
  const events = ["New enquiry", "Reply sent", "Booked", "Paid", "Review", "Reactivated"];
  return (
    <Stage meta={V20} height="360vh" background="#F7F8FA">
      {(p, reduced) => {
        const sarahDim = useTransform(p, [0.58, 0.78], [1, 0.48]);
        const outcome = useTransform(p, [0.72, 0.84], [0, 1]);
        return (
          <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16">
            <div className="mx-auto grid w-full max-w-[1240px] gap-8 lg:grid-cols-2">
              <div className="rounded-[24px] border border-black/10 bg-white p-7">
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">Healthy customer journey</div>
                <div className="mt-8 space-y-5">
                  {events.map((label, i) => <HealthyRecordEvent key={label} p={p} index={i} label={label} />)}
                </div>
              </div>
              <motion.div className="rounded-[24px] border border-black/10 bg-white p-7" style={{ opacity: reduced ? 0.6 : sarahDim }}>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">Sarah Miller</div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#06B6D4]" />
                  <div className="text-[15px] font-medium">New enquiry</div>
                </div>
                <div className="ml-[5px] mt-3 h-[220px] w-px bg-black/10" />
                <div className="text-[11px] uppercase tracking-[0.16em] text-black/30">No further activity</div>
                <motion.div className="mt-8 text-[38px] tracking-[-0.055em] text-[#A93640]" style={{ fontFamily: DISPLAY, opacity: reduced ? 1 : outcome }}>
                  Booked elsewhere.
                </motion.div>
              </motion.div>
            </div>
          </div>
        );
      }}
    </Stage>
  );
}

const ROUND_TWO: VariantMeta[] = [V11, V12, V13, V14, V15, V16, V17, V18, V19, V20];

export function RevenueLeaksLabRound2() {
  return (
    <div style={{ backgroundColor: PAPER, color: INK }}>
      <section className="border-t border-black/10 px-5 pb-24 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#06B6D4]">Motion lab · round two</div>
          <h2 className="mt-6 max-w-[1040px] text-[44px] leading-[0.9] tracking-[-0.06em] sm:text-[70px] lg:text-[92px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Ten more ways to make the leak impossible to miss.
          </h2>
          <p className="mt-8 max-w-[720px] text-[16px] leading-[1.7] text-black/55 sm:text-[18px]">
            Round one animated the enquiry. Round two focuses on business evidence: ownership, silence, handoffs, competitor response and the customer journey that never happened.
          </p>
          <ol className="mt-14 grid gap-x-10 gap-y-4 border-t border-black/10 pt-8 sm:grid-cols-2">
            {ROUND_TWO.map((m) => (
              <li key={m.n} className="flex items-baseline gap-4 border-b border-black/[0.06] pb-4">
                <span className="w-[28px] shrink-0 text-[11px] font-semibold tabular-nums text-black/35">{m.n}</span>
                <span className="flex-1">
                  <span className="text-[16px] font-semibold">{m.title}</span>
                  <span className="mt-1 block text-[13px] leading-[1.55] text-black/45">{m.idea}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <TwoScreens />
      <MissingHandoff />
      <FutureNeverHappened />
      <FormToNowhere />
      <EverythingMovedExceptSarah />
      <Unassigned />
      <TabBadge />
      <SilenceOccupiesSpace />
      <EnquiryBecomesTheirBooking />
      <RecordNeverGrew />

      <section className="bg-[#070A0D] px-5 py-28 text-white sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#52D9DE]">20 concepts · one problem</div>
          <p className="mt-6 max-w-[940px] text-[30px] leading-[1.02] tracking-[-0.05em] text-white/85 sm:text-[44px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Do not choose the cleverest animation. Choose the one where a service-business owner understands the lost revenue before they finish reading the copy.
          </p>
        </div>
      </section>
    </div>
  );
}
