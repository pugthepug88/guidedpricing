import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, PhoneMissed, Clock3, Star } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";
const HAIR = "rgba(18,20,26,0.10)";
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
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
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
  accent: string;
  tint: string;
  Scene: (p: { reduced: boolean }) => React.ReactNode;
}[] = [
  {
    tag: "Missed calls",
    stat: "44%",
    claim: "of inbound callers don't reach a person.",
    source: ["Invoca · 2026 · 70M+ calls"],
    accent: "#E5484D",
    tint: "#FDECEC",
    Scene: SceneMissed,
  },
  {
    tag: "Leads never asked",
    stat: "64%",
    claim: "of businesses don't ask the lead to buy or book.",
    source: ["Invoca · 2026"],
    accent: "#D97706",
    tint: "#FDF3E0",
    Scene: SceneUnasked,
  },
  {
    tag: "Slow replies",
    stat: "79%",
    claim: "would take their business elsewhere after poor or slow service.",
    source: ["ServiceNow / Lonergan Research", "Australian consumers"],
    accent: "#2563EB",
    tint: "#E9F1FE",
    Scene: SceneSlow,
  },
  {
    tag: "Forgotten customers",
    stat: "89%",
    claim: "are likely to use a local business that responds to reviews.",
    source: ["BrightLocal · 2025"],
    accent: "#7C3AED",
    tint: "#F2EBFE",
    Scene: SceneForgotten,
  },
];

function LeakCard({ leak, index, reduced }: { leak: (typeof LEAKS)[number]; index: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: reduced ? 0 : 0.08 + index * 0.08, ease: EASE }}
      whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.25 } }}
      className="h-full rounded-[28px] p-4 sm:p-5"
      style={{ background: leak.tint }}
    >
      {/* live moment */}
      <div
        className="h-[132px] overflow-hidden rounded-[18px] border bg-white"
        style={{ borderColor: "rgba(18,20,26,0.07)", boxShadow: "0 14px 30px -22px rgba(18,20,26,0.25)" }}
      >
        <leak.Scene reduced={reduced} />
      </div>

      {/* tag pill */}
      <div className="mt-5">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{ fontFamily: MONO, background: "rgba(255,255,255,0.75)", color: leak.accent }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: leak.accent }} />
          {leak.tag}
        </span>
      </div>

      {/* stat + claim */}
      <div
        className="mt-3 text-[52px] leading-[0.95] tracking-[-0.05em]"
        style={{ fontFamily: DISPLAY, fontWeight: 500, color: leak.accent }}
      >
        {leak.stat}
      </div>
      <p className="mt-3 min-h-[60px] text-[14px] leading-[1.5]" style={{ color: "#3B3A36" }}>
        {leak.claim}
      </p>
      <div
        className="mt-3 flex flex-col gap-0.5 text-[9px] uppercase tracking-[0.16em]"
        style={{ fontFamily: MONO, color: "rgba(18,20,26,0.45)" }}
      >
        {leak.source.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </motion.div>
  );
}

export function ZaplaRevenueLeakageV7() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of no follow-through" className="bg-white" style={{ color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28">
        {/* ---------- header ---------- */}
        <Reveal reduced={reduced}>
          <div className="mx-auto max-w-[840px] text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ fontFamily: MONO, borderColor: "rgba(6,182,212,0.35)", background: "rgba(6,182,212,0.07)", color: "#0E8FA6" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
              The cost of no follow-through
            </span>
            <h2
              className="mt-7 text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px] lg:text-[54px]"
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

        {/* ---------- leak cards ---------- */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEAKS.map((leak, i) => (
            <LeakCard key={leak.tag} leak={leak} index={i} reduced={reduced} />
          ))}
        </div>

        {/* ---------- bridge ---------- */}
        <Reveal reduced={reduced} delay={0.1} className="mt-16 sm:mt-20">
          <div
            className="relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12 sm:py-16"
            style={{ background: "#111318" }}
          >
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-[280px] w-[560px] -translate-x-1/2 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22), transparent 65%)" }}
            />
            <div className="relative">
              <div
                className="text-[10px] font-bold uppercase tracking-[0.24em]"
                style={{ fontFamily: MONO, color: "rgba(116,223,225,0.8)" }}
              >
                One problem, not four
              </div>
              <div
                className="mx-auto mt-5 max-w-[720px] text-[24px] leading-[1.25] tracking-[-0.03em] text-white/45 sm:text-[28px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                These aren't four separate problems. They're one follow-through problem.
              </div>
              <div
                className="mx-auto mt-3 max-w-[720px] text-[24px] leading-[1.25] tracking-[-0.03em] text-white sm:text-[28px]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                Zapla connects the next step — from first contact to booked, paid and returning.
              </div>
              <a
                href="#zapla-product-v5"
                className="mt-8 inline-flex h-[46px] items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#111318]"
              >
                See how Zapla connects it <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
