import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

/* three greys only */
const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";

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
/* Central device: one left-to-right progression on one continuous    */
/* baseline that loses substance as it moves right.                   */
/* ------------------------------------------------------------------ */

const STAGES = [
  { label: "CALL", state: "held" },
  { label: "REPLY", state: "held" },
  { label: "BOOK", state: "thin" },
  { label: "RETURN", state: "gone" },
  { label: "REVIEW", state: "gone" },
] as const;

function ProgressionDevice() {
  return (
    <div className="relative w-full max-w-[860px]">
      {/* labels sit above the baseline, on the same left axis as everything else */}
      <div className="grid grid-cols-5 items-end">
        {STAGES.map((s) => (
          <div key={s.label} className="min-w-0 pr-2">
            <span
              className="block text-[10px] uppercase tracking-[0.2em] sm:text-[11px]"
              style={{
                fontFamily: MONO,
                color: s.state === "held" ? INK : s.state === "thin" ? MUTED : FAINT,
              }}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* one continuous baseline: solid, then hairline, then absent */}
      <div className="mt-4 grid grid-cols-5">
        {STAGES.map((s) => (
          <span
            key={s.label}
            className="block h-px"
            style={{
              background:
                s.state === "held"
                  ? CYAN
                  : s.state === "thin"
                    ? HAIR
                    : "transparent",
            }}
          />
        ))}
      </div>

      {/* the moment the line stops carrying */}
      <div className="mt-4 grid grid-cols-5">
        <div className="col-start-3 col-span-3">
          <span
            className="block text-[9px] uppercase tracking-[0.2em]"
            style={{ fontFamily: MONO, color: FAINT }}
          >
            Nothing here is broken. It just stops.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const STATS = [
  {
    stat: "64%",
    claim: "of businesses don't ask the lead to buy or book.",
    source: ["Invoca · 2026"],
  },
  {
    stat: "79%",
    claim: "would take their business elsewhere after poor or slow service.",
    source: ["ServiceNow / Lonergan Research", "Australian consumers"],
  },
  {
    stat: "89%",
    claim: "are likely to use a local business that responds to reviews.",
    source: ["BrightLocal · 2025"],
  },
];

export function ZaplaRevenueLeakageV6() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of no follow-through" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28">
        {/* ---------- group 1: the claim ---------- */}
        <Reveal reduced={reduced}>
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily: MONO, color: MUTED }}
          >
            The cost of no follow-through
          </div>
          <h2
            className="mt-6 max-w-[860px] text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            44% of inbound callers don't reach a person.
            <span style={{ color: FAINT }}> That's only the first step lost.</span>
          </h2>
          <p
            className="mt-6 max-w-[520px] text-[16px] leading-[1.55] sm:text-[17px]"
            style={{ color: MUTED }}
          >
            Calls go unanswered. Leads aren't asked to book. Slow service sends customers
            elsewhere. Even the relationship after the sale gets left unfinished.
          </p>
          <div
            className="mt-4 text-[10px] uppercase tracking-[0.18em]"
            style={{ fontFamily: MONO, color: FAINT }}
          >
            Invoca · 2026 · 70M+ calls
          </div>
        </Reveal>

        {/* ---------- group 2: the progression ---------- */}
        <Reveal reduced={reduced} delay={0.08} className="mt-16 sm:mt-20">
          <ProgressionDevice />
        </Reveal>

        {/* ---------- group 3: evidence ---------- */}
        <div className="mt-16 sm:mt-20">
          <Reveal reduced={reduced}>
            <div className="h-px w-full" style={{ background: HAIR }} />
          </Reveal>
          <div className="grid gap-12 pt-10 sm:grid-cols-3 sm:gap-x-10">
            {STATS.map((s, i) => (
              <Reveal key={s.stat} reduced={reduced} delay={0.06 + i * 0.06}>
                <div className="sm:border-l sm:pl-8" style={{ borderColor: HAIR }}>
                  <div
                    className="text-[44px] leading-none tracking-[-0.05em]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                  >
                    {s.stat}
                  </div>
                  <p className="mt-4 text-[16px] leading-[1.5]" style={{ color: MUTED }}>
                    {s.claim}
                  </p>
                  {/* reserved two-line source block keeps baselines aligned */}
                  <div
                    className="mt-4 flex min-h-[26px] flex-col gap-0.5 text-[10px] uppercase tracking-[0.18em]"
                    style={{ fontFamily: MONO, color: FAINT }}
                  >
                    {s.source.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- group 4: bridge, terminal emphasis ---------- */}
        <Reveal reduced={reduced} delay={0.08} className="mt-24 sm:mt-28">
          <div className="h-px w-full" style={{ background: HAIR }} />
          <div className="mt-10 max-w-[720px]">
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
