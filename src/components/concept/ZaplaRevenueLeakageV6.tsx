import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#9A948B";
const HAIR = "rgba(18,20,26,0.10)";
const BG = "#FBFAF8";
const CYAN = "#06B6D4";

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
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Middle device: the journey as typography, with the line going quiet */
/* ------------------------------------------------------------------ */

function JourneyLine() {
  const words = [
    { label: "CALL", connected: true },
    { label: "REPLY", connected: true },
    { label: "BOOK", connected: false },
    { label: "RETURN", connected: false },
    { label: "REVIEW", connected: false },
  ];

  return (
    <div className="mx-auto w-full max-w-[860px]">
      <div className="flex flex-wrap items-end justify-center gap-x-8 gap-y-6 sm:gap-x-12">
        {words.map((w) => (
          <div key={w.label} className="flex flex-col items-center gap-5">
            <span
              className="text-[26px] leading-none tracking-[-0.04em] sm:text-[36px] lg:text-[44px]"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 500,
                color: w.connected ? INK : "#C7C2B9",
              }}
            >
              {w.label}
            </span>
            {/* baseline trace: solid where the chain holds, broken where it doesn't */}
            <span
              className="block h-px w-full"
              style={{
                background: w.connected
                  ? CYAN
                  : `repeating-linear-gradient(90deg, ${HAIR} 0 4px, transparent 4px 9px)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const STATS = [
  {
    stat: "44%",
    claim: "of inbound callers don't reach a person.",
    source: "Invoca · 70M+ calls",
  },
  {
    stat: "64%",
    claim: "of businesses don't ask the lead to buy or book.",
    source: "Invoca · 2026",
  },
  {
    stat: "79%",
    claim: "said they would take their business elsewhere after poor or slow service.",
    source: "ServiceNow / Lonergan Research · Australian consumers",
  },
  {
    stat: "89%",
    claim: "are likely to use a local business that responds to both positive and negative reviews.",
    source: "BrightLocal · 2025",
  },
];

export function ZaplaRevenueLeakageV6() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of no follow-through" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28">
        {/* header */}
        <Reveal reduced={reduced}>
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily: MONO, color: MUTED }}
          >
            The cost of no follow-through
          </div>
          <h2
            className="mt-7 max-w-[840px] text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            44% of inbound callers don't reach a person
            <span style={{ color: "#A8A29A" }}> — and that's just one way opportunity gets lost.</span>
          </h2>
          <div
            className="mt-4 text-[10px] uppercase tracking-[0.18em]"
            style={{ fontFamily: MONO, color: FAINT }}
          >
            Invoca · 2026 · 70M+ calls
          </div>
          <p className="mt-6 max-w-[520px] text-[16px] leading-[1.55] sm:text-[17px]" style={{ color: MUTED }}>
            Calls go unanswered. Leads aren't asked to book. Slow service sends customers elsewhere.
            Even the relationship after the sale gets left unfinished.
          </p>
        </Reveal>

        {/* middle device */}
        <Reveal reduced={reduced} delay={0.1} className="mt-16 sm:mt-24">
          <JourneyLine />
        </Reveal>

        {/* evidence row */}
        <div className="mt-16 sm:mt-24">
          <Reveal reduced={reduced}>
            <div className="h-px w-full" style={{ background: HAIR }} />
          </Reveal>
          <div className="grid gap-10 pt-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-10">
            {STATS.map((s, i) => (
              <Reveal key={s.stat + s.claim} reduced={reduced} delay={0.08 + i * 0.06}>
                <div
                  className={i === 0 ? "" : "lg:border-l lg:pl-8"}
                  style={i === 0 ? undefined : { borderColor: HAIR }}
                >
                  <div
                    className="text-[44px] leading-none tracking-[-0.05em] sm:text-[52px]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                  >
                    {s.stat}
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.55]" style={{ color: "#3A3D44" }}>
                    {s.claim}
                  </p>
                  <div
                    className="mt-3 text-[9px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: MONO, color: FAINT }}
                  >
                    {s.source}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* bridge into product */}
        <Reveal reduced={reduced} delay={0.1} className="mt-20 sm:mt-28">
          <div className="h-px w-full" style={{ background: HAIR }} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
            <div
              className="max-w-[560px] text-[22px] leading-[1.2] tracking-[-0.03em] sm:text-[26px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              These aren't four separate problems. They're one follow-through problem.
            </div>
            <div className="text-[14px] leading-[1.5] font-medium sm:text-[15px]" style={{ color: MUTED }}>
              Zapla connects the next step from first contact to booked, paid and returning.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
