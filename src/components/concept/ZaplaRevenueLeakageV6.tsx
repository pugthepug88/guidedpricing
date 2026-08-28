import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const PAPER = "#F7F5F1";
const MUTED = "#6E6A64";
const HAIR = "rgba(18,20,26,0.12)";
const CYAN = "#06B6D4";

/* ------------------------------------------------------------------ */
/* Evidence props — typographic artifacts, not cards                   */
/* ------------------------------------------------------------------ */

function Hair({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full ${className}`} style={{ background: HAIR }} />;
}

function Meta({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color: "#9A948B" }}>
      {children}
    </div>
  );
}

function PropAnswer({ live, reduced }: { live: boolean; reduced: boolean }) {
  return (
    <div className="w-full">
      <Meta>Incoming call</Meta>
      <div className="mt-6 flex items-center gap-5">
        <div className="relative h-3 w-3 shrink-0">
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: live ? CYAN : "#C9C4BB" }}
            animate={reduced ? undefined : { opacity: live ? [1, 0.35, 1] : 0.5 }}
            transition={{ duration: 1.1, repeat: live ? Infinity : 0, ease: "easeInOut" }}
          />
          {live && !reduced && (
            <motion.span
              className="absolute -inset-2 rounded-full border"
              style={{ borderColor: CYAN }}
              animate={{ scale: [0.7, 1.5], opacity: [0.55, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </div>
        <div
          className="text-[34px] leading-none tracking-[-0.04em] sm:text-[44px]"
          style={{ fontFamily: MONO, color: INK, opacity: live ? 1 : 0.32 }}
        >
          0412 884 231
        </div>
      </div>
      <div className="mt-7">
        <Hair />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-6" style={{ fontFamily: MONO }}>
        <div>
          <Meta>Ringing</Meta>
          <div className="mt-2 text-[15px]" style={{ color: INK }}>00:38</div>
        </div>
        <motion.div
          initial={false}
          animate={{ opacity: live ? 0.25 : 1 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        >
          <Meta>Outcome</Meta>
          <div className="mt-2 text-[15px] font-semibold" style={{ color: "#B4443F" }}>
            UNANSWERED
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PropRespond({ live, reduced }: { live: boolean; reduced: boolean }) {
  const clock = ["09:14  ENQUIRY RECEIVED", "10:14  STILL NO REPLY", "11:42  STILL NO REPLY", "16:32  END OF DAY"];
  return (
    <div className="w-full">
      <Meta>Website enquiry</Meta>
      <div
        className="mt-6 max-w-[520px] text-[30px] leading-[1.12] tracking-[-0.035em] sm:text-[40px]"
        style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
      >
        “Are you available Thursday?”
      </div>
      <div className="mt-8">
        <Hair />
      </div>
      <div className="mt-5 space-y-2" style={{ fontFamily: MONO }}>
        {clock.map((line, i) => (
          <motion.div
            key={line}
            initial={false}
            animate={{
              opacity: live ? (i === 0 ? 0.85 : 0.2 + i * 0.05) : 0.28,
              x: 0,
            }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : i * 0.12 }}
            className="text-[12px] tracking-[0.06em]"
            style={{ color: i === clock.length - 1 ? "#B4443F" : MUTED }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PropRemind({ live, reduced }: { live: boolean; reduced: boolean }) {
  return (
    <div className="w-full">
      <Meta>Confirmed appointment</Meta>
      <div
        className="mt-6 text-[34px] leading-[1.05] tracking-[-0.04em] sm:text-[46px]"
        style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
      >
        Tomorrow · 10:30 AM
      </div>
      <div className="mt-8">
        <Hair />
      </div>
      <div className="mt-5 flex flex-wrap items-baseline gap-x-10 gap-y-4" style={{ fontFamily: MONO }}>
        <div>
          <Meta>Reminder</Meta>
          <div className="relative mt-2 inline-block text-[15px]" style={{ color: MUTED }}>
            SMS · 10:30 AM
            <motion.span
              className="absolute left-0 top-1/2 h-px w-full origin-left"
              style={{ background: "#B4443F" }}
              initial={false}
              animate={{ scaleX: live ? 0 : 1 }}
              transition={{ duration: reduced ? 0 : 0.5 }}
            />
          </div>
        </div>
        <motion.div initial={false} animate={{ opacity: live ? 0.25 : 1 }} transition={{ duration: reduced ? 0 : 0.5 }}>
          <Meta>Result</Meta>
          <div className="mt-2 text-[15px] font-semibold" style={{ color: "#B4443F" }}>
            NO SHOW
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PropReturn({ live, reduced }: { live: boolean; reduced: boolean }) {
  return (
    <div className="w-full">
      <Meta>Past customer</Meta>
      <motion.div
        initial={false}
        animate={{ opacity: live ? 1 : 0.22, y: live ? 0 : reduced ? 0 : -10 }}
        transition={{ duration: reduced ? 0 : 0.6 }}
        className="mt-6 text-[30px] leading-[1.08] tracking-[-0.04em] sm:text-[40px]"
        style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
      >
        Paid in full. Job complete.
      </motion.div>
      <div className="mt-8">
        <Hair />
      </div>
      <div className="mt-5" style={{ fontFamily: MONO }}>
        <Meta>Last visit</Meta>
        <div className="mt-2 text-[26px] tracking-[-0.02em] sm:text-[32px]" style={{ color: "#B4443F" }}>
          184 days ago
        </div>
        <div className="mt-4 text-[12px] tracking-[0.06em]" style={{ color: MUTED }}>
          NO CALL · NO EMAIL · NO OFFER
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Act 3 moments                                                       */
/* ------------------------------------------------------------------ */

type Moment = {
  verb: string;
  stat: string;
  claim: string;
  source?: string;
  consequence: string;
  Prop: (p: { live: boolean; reduced: boolean }) => JSX.Element;
};

const MOMENTS: Moment[] = [
  {
    verb: "ANSWER",
    stat: "44%",
    claim: "of inbound calls don't reach a person.",
    source: "Invoca · 2026 · 70M+ calls",
    consequence: "Nobody answered.",
    Prop: PropAnswer,
  },
  {
    verb: "RESPOND",
    stat: "7×",
    claim: "more likely to qualify a lead when contact happens within an hour rather than waiting another hour.",
    source: "Harvard Business Review · 1.25M leads · 42 companies",
    consequence: "Nobody replied in time.",
    Prop: PropRespond,
  },
  {
    verb: "REMIND",
    stat: "34%",
    claim: "fewer no-shows in a trial using behaviourally designed SMS reminders.",
    source: "NSW Behavioural Insights Unit",
    consequence: "Nobody reminded them.",
    Prop: PropRemind,
  },
  {
    verb: "RETURN",
    stat: "50%",
    claim: "said poor service could stop them buying from that business again.",
    source: "Salesforce / YouGov · Australian consumers",
    consequence: "Nobody followed up after the sale.",
    Prop: PropReturn,
  },
];

function MomentScene({
  moment,
  index,
  active,
  reduced,
}: {
  moment: Moment;
  index: number;
  active: number;
  reduced: boolean;
}) {
  const isActive = index === active;
  const offset = index - active;
  const { Prop } = moment;

  return (
    <motion.div
      className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-16"
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: reduced ? 0 : offset === 0 ? 0 : offset > 0 ? 44 : -44,
        scale: reduced ? 1 : isActive ? 1 : 0.985,
      }}
      transition={{ duration: reduced ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
      <div className="mx-auto grid w-full max-w-[1360px] gap-12 lg:grid-cols-[0.95fr_1fr] lg:items-center lg:gap-24">
        <div>
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily: MONO, color: CYAN }}
          >
            {String(index + 1).padStart(2, "0")} / 04 · {moment.verb}
          </div>
          <div
            className="mt-6 text-[92px] leading-[0.82] tracking-[-0.07em] sm:text-[130px] lg:text-[152px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            {moment.stat}
          </div>
          <p
            className="mt-6 max-w-[460px] text-[17px] leading-[1.5] sm:text-[19px]"
            style={{ color: "#3A3D44" }}
          >
            {moment.claim}
          </p>
          {moment.source && (
            <div className="mt-4 text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: "#A29B92" }}>
              {moment.source}
            </div>
          )}
          <div className="mt-8 max-w-[420px]">
            <Hair />
          </div>
          <div
            className="mt-6 text-[26px] leading-[1.05] tracking-[-0.04em] sm:text-[34px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            {moment.consequence}
          </div>
        </div>

        <div className="lg:pl-10">
          <Prop live={isActive && !reduced ? true : false} reduced={reduced} />
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage: one sticky canvas, content changes in place                  */
/* ------------------------------------------------------------------ */

function LeakStage({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const raw = (v - 0.04) / 0.9;
    const i = Math.min(MOMENTS.length - 1, Math.max(0, Math.floor(raw * MOMENTS.length)));
    setActive(i);
  });

  if (reduced) {
    return (
      <div className="px-5 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1360px] gap-20">
          {MOMENTS.map((m, i) => (
            <div key={m.verb} className="relative min-h-[420px]">
              <MomentScene moment={m} index={i} active={i} reduced />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[152vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {MOMENTS.map((m, i) => (
          <MomentScene key={m.verb} moment={m} index={i} active={active} reduced={false} />
        ))}

        {/* progress hairline: the chain advancing */}
        <div className="absolute inset-x-5 bottom-10 sm:inset-x-10 lg:inset-x-16">
          <div className="mx-auto flex max-w-[1360px] gap-2">
            {MOMENTS.map((m, i) => (
              <div key={m.verb} className="flex-1">
                <motion.div
                  className="h-px origin-left"
                  initial={false}
                  animate={{ background: i <= active ? CYAN : HAIR, scaleY: i === active ? 2 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div
                  className="mt-3 text-[9px] font-semibold uppercase tracking-[0.2em]"
                  style={{ fontFamily: MONO, color: i === active ? INK : "#B6AFA5" }}
                >
                  {m.verb}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ActOne({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="flex min-h-[74vh] items-center px-5 pt-24 pb-16 sm:px-10 lg:px-16">
      <motion.div
        className="mx-auto w-full max-w-[1360px]"
        style={reduced ? undefined : { y }}
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: MUTED }}>
          The cost of missed follow-through
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <motion.div
              className="text-[150px] leading-[0.78] tracking-[-0.08em] sm:text-[230px] lg:text-[300px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              44%
            </motion.div>
            <div
              className="mt-2 max-w-[620px] text-[24px] leading-[1.12] tracking-[-0.035em] sm:text-[34px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              of inbound callers don't reach a person.
            </div>
            <div className="mt-6 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: MONO, color: "#A29B92" }}>
              Invoca · 2026 · 70M+ calls
            </div>
          </div>

          <div className="lg:pb-6">
            <div className="max-w-[420px]">
              <Hair />
            </div>
            <p
              className="mt-7 max-w-[420px] text-[20px] leading-[1.28] tracking-[-0.02em] sm:text-[24px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: "#2C2F35" }}
            >
              The customer already called. The opportunity was already there. Nobody answered.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ActTwo({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} className="px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <motion.h2
          className="max-w-[1000px] text-[42px] leading-[0.94] tracking-[-0.055em] sm:text-[68px] lg:text-[86px]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          And that's only one place
          <span className="block" style={{ color: "#A8A29A" }}>
            revenue slips away.
          </span>
        </motion.h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.55fr_0.45fr]">
          <div className="grid gap-0">
            {["A missed reply.", "An unchased quote.", "A forgotten reminder.", "A customer who never hears from you again."].map(
              (line, i) => (
                <motion.div
                  key={line}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.6, delay: reduced ? 0 : 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="py-5"
                  style={{ borderTop: `1px solid ${HAIR}` }}
                >
                  <span
                    className="text-[22px] leading-[1.15] tracking-[-0.03em] sm:text-[27px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                  >
                    {line}
                  </span>
                </motion.div>
              ),
            )}
          </div>
          <motion.p
            className="max-w-[380px] self-end text-[19px] leading-[1.4] tracking-[-0.02em] sm:text-[22px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: "#5C5F66" }}
            initial={reduced ? false : { opacity: 0 }}
            animate={inView || reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Small gaps. Repeated every day. Across every enquiry you ever paid to win.
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function ActFour({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="px-5 pt-24 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1360px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-[54px] leading-[0.86] tracking-[-0.07em] sm:text-[92px] lg:text-[124px]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
        >
          Nothing broke.
          <span className="block" style={{ color: "#A8A29A" }}>
            The next step just didn't happen.
          </span>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.6fr_0.4fr] lg:items-end">
          <motion.p
            className="max-w-[620px] text-[18px] leading-[1.6] sm:text-[21px]"
            style={{ color: "#3A3D44" }}
            initial={reduced ? false : { opacity: 0 }}
            animate={inView || reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            One missed step doesn't look expensive. Repeated across every enquiry, quote, booking and customer, it
            becomes a revenue problem.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={inView || reduced ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <Hair />
            <div className="mt-6 flex items-center gap-4">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
              <span
                className="text-[20px] leading-[1.2] tracking-[-0.03em] sm:text-[24px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
              >
                Zapla keeps the next step moving.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function ZaplaRevenueLeakageV6() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of missed follow-through" style={{ background: PAPER, color: INK }}>
      <ActOne reduced={reduced} />
      <ActTwo reduced={reduced} />
      <LeakStage reduced={reduced} />
      <ActFour reduced={reduced} />
    </section>
  );
}
