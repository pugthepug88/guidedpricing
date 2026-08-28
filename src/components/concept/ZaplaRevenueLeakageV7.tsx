import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PhoneMissed, Clock3, Star } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";
const HAIR = "rgba(18,20,26,0.10)";
const RAIL = "rgba(18,20,26,0.26)";
const BG = "#FBFAF8";
const CYAN = "#06B6D4";
const RED = "#E5484D";

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  reduced,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  reduced: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Journey rail: the path every customer should travel — and the      */
/* breaks where follow-through gets lost between the steps.           */
/* ------------------------------------------------------------------ */

function JourneyRail() {
  const steps = ["First contact", "Booked", "Responded", "Returning"];
  return (
    <div className="mx-auto mt-14 hidden max-w-[1180px] items-start lg:flex" aria-hidden>
      {steps.map((label, i) => (
        <Fragment key={label}>
          <div className="flex w-[92px] shrink-0 flex-col items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: i === 0 ? CYAN : FAINT, opacity: 1 - i * 0.12 }}
            />
            <span
              className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em]"
              style={{ fontFamily: MONO, color: FAINT }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="relative mx-2 mt-[5px] h-px flex-1">
              <div className="absolute inset-x-0 top-0 border-t border-dashed" style={{ borderColor: RAIL }} />
              <span
                className="absolute left-1/2 top-1/2 flex h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[9px] leading-none"
                style={{ background: BG, borderColor: "rgba(229,72,77,0.35)", color: RED }}
              >
                ×
              </span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Live UI moments — one per leak. Subtle looped motion, all gated    */
/* behind reduced-motion.                                             */
/* ------------------------------------------------------------------ */

function PulseDot({ color, reduced }: { color: string; reduced: boolean }) {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      {!reduced && (
        <motion.span
          className="absolute inline-flex h-full w-full rounded-full"
          style={{ background: color }}
          animate={{ scale: [1, 2.4], opacity: [0.65, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
    </span>
  );
}

function SceneMissed({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "rgba(229,72,77,0.10)" }}
        >
          <PhoneMissed className="h-4 w-4" style={{ color: RED }} />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[12px] font-semibold" style={{ color: INK }}>
            0412 884 103
          </div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: FAINT }}>
            Missed call · 12:06
          </div>
        </div>
        <span className="ml-auto">
          <PulseDot color={RED} reduced={reduced} />
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="h-px flex-1" style={{ background: HAIR }} />
        <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: FAINT }}>
          No return call scheduled
        </span>
        <span className="h-px flex-1" style={{ background: HAIR }} />
      </div>
    </div>
  );
}

function SceneUnasked({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-4">
      <div
        className="max-w-[86%] rounded-[12px] rounded-bl-[3px] px-3 py-2 text-[11px] leading-[1.4]"
        style={{ background: "#F0EDE7", color: INK }}
      >
        Hi — do you have anything this week?
      </div>
      <div
        className="ml-auto flex items-center gap-1.5 rounded-[12px] rounded-br-[3px] border bg-white px-3 py-[9px]"
        style={{ borderColor: HAIR }}
      >
        {[0, 1, 2].map((i) =>
          reduced ? (
            <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: FAINT }} />
          ) : (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: FAINT }}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.25, repeat: Infinity, delay: i * 0.18 }}
            />
          ),
        )}
      </div>
      <div className="text-right text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: FAINT }}>
        Never asked to book
      </div>
    </div>
  );
}

function SceneSlow({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: MUTED }}>
          Enquiry received
        </span>
        <span className="text-[9px] uppercase tracking-[0.1em]" style={{ fontFamily: MONO, color: FAINT }}>
          Mon 9:02
        </span>
      </div>
      <div className="h-px w-full" style={{ background: HAIR }} />
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: MUTED }}>
          Reply sent
        </span>
        <span className="text-[9px] uppercase tracking-[0.1em]" style={{ fontFamily: MONO, color: RED }}>
          Thu 16:47
        </span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <motion.span
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          className="flex"
        >
          <Clock3 className="h-3.5 w-3.5" style={{ color: FAINT }} />
        </motion.span>
        <span className="text-[13px] font-semibold tracking-[-0.01em]" style={{ fontFamily: MONO, color: INK }}>
          3 days, 7 hours later
        </span>
      </div>
    </div>
  );
}

function SceneForgotten({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      <div className="flex gap-[3px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3 w-3" fill="#E8B44A" stroke="none" />
        ))}
      </div>
      <div className="text-[11px] leading-[1.45]" style={{ color: INK }}>
        “Made the whole process easy.”
      </div>
      <div className="flex items-center gap-2">
        <PulseDot color={FAINT} reduced={reduced} />
        <span className="text-[9px] uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: FAINT }}>
          No response · 3 months
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const LEAKS: {
  tag: string;
  stat: string;
  claim: string;
  source: string[];
  Scene: (p: { reduced: boolean }) => React.ReactNode;
}[] = [
  {
    tag: "Missed",
    stat: "44%",
    claim: "of inbound callers don't reach a person.",
    source: ["Invoca · 2026 · 70M+ calls"],
    Scene: SceneMissed,
  },
  {
    tag: "Unasked",
    stat: "64%",
    claim: "of businesses don't ask the lead to buy or book.",
    source: ["Invoca · 2026"],
    Scene: SceneUnasked,
  },
  {
    tag: "Slow",
    stat: "79%",
    claim: "would take their business elsewhere after poor or slow service.",
    source: ["ServiceNow / Lonergan Research", "Australian consumers"],
    Scene: SceneSlow,
  },
  {
    tag: "Forgotten",
    stat: "89%",
    claim: "are likely to use a local business that responds to reviews.",
    source: ["BrightLocal · 2025"],
    Scene: SceneForgotten,
  },
];

export function ZaplaRevenueLeakageV7() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of no follow-through" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28">
        {/* ---------- header ---------- */}
        <Reveal reduced={reduced}>
          <div className="mx-auto max-w-[840px] text-center">
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ fontFamily: MONO, color: "#0E8FA6" }}
            >
              The cost of no follow-through
            </div>
            <h2
              className="mt-6 text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px] lg:text-[54px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              44% of inbound callers don't reach a person.
              <span style={{ color: FAINT }}> That's only the first step lost.</span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-[580px] text-[16px] leading-[1.55] sm:text-[17px]"
              style={{ color: MUTED }}
            >
              Calls go unanswered. Leads are never asked to book. Replies land days late.
              Even the relationship after the sale gets left unfinished.
            </p>
          </div>
        </Reveal>

        {/* ---------- journey rail with breaks ---------- */}
        <Reveal reduced={reduced} delay={0.06}>
          <JourneyRail />
        </Reveal>

        {/* ---------- leak cards ---------- */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {LEAKS.map((leak, i) => (
            <Reveal key={leak.tag} reduced={reduced} delay={0.08 + i * 0.07}>
              <div
                className="h-full overflow-hidden rounded-[18px] border bg-white"
                style={{ borderColor: HAIR, boxShadow: "0 26px 60px -42px rgba(18,20,26,0.28)" }}
              >
                <div className="h-[132px] border-b" style={{ borderColor: HAIR }}>
                  <leak.Scene reduced={reduced} />
                </div>
                <div className="px-5 py-5">
                  <div
                    className="text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ fontFamily: MONO, color: FAINT }}
                  >
                    0{i + 1} · {leak.tag}
                  </div>
                  <div
                    className="mt-3 text-[42px] leading-none tracking-[-0.05em]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                  >
                    {leak.stat}
                  </div>
                  <p className="mt-3 min-h-[60px] text-[13.5px] leading-[1.5]" style={{ color: MUTED }}>
                    {leak.claim}
                  </p>
                  <div
                    className="mt-3 flex flex-col gap-0.5 border-t pt-3 text-[9px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: MONO, color: FAINT, borderColor: HAIR }}
                  >
                    {leak.source.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- bridge ---------- */}
        <Reveal reduced={reduced} delay={0.08} className="mt-20 sm:mt-24">
          <div className="h-px w-full" style={{ background: HAIR }} />
          <div className="mx-auto mt-10 max-w-[760px] text-center">
            <div
              className="text-[26px] leading-[1.2] tracking-[-0.03em]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: FAINT }}
            >
              These aren't four separate problems. They're one follow-through problem.
            </div>
            <div
              className="mt-3 text-[26px] leading-[1.2] tracking-[-0.03em]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              Zapla connects the next step, from first contact to booked, paid and returning.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
