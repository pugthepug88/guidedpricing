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
/* Central metaphor: one supply line running across the canvas into   */
/* a tap that never fully closes. Drops fall away and are lost.       */
/* ------------------------------------------------------------------ */

const DROPS = [
  { x: 0, delay: 0 },
  { x: -4, delay: 1.15 },
  { x: 3, delay: 2.3 },
];

function LeakingTap({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1100 250"
        className="mx-auto block h-auto w-full max-w-[980px]"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        {/* the supply that keeps arriving */}
        <path d="M 0 72 H 548" stroke={INK} strokeWidth={20} strokeLinecap="butt" fill="none" />
        <path d="M 18 72 H 536" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />

        {/* what should have continued */}
        <path
          d="M 578 72 H 1100"
          stroke={HAIR}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray="1 16"
          fill="none"
        />

        {/* valve: turned, but never fully closed */}
        <path d="M 548 72 V 40" stroke={INK} strokeWidth={10} strokeLinecap="round" fill="none" />
        <path d="M 512 30 H 584" stroke={INK} strokeWidth={11} strokeLinecap="round" fill="none" />
        <circle cx={548} cy={30} r={9} fill={INK} />

        {/* body, then the spout turning down */}
        <path
          d="M 548 72 V 116 Q 548 134 570 134 H 600 Q 622 134 622 152 V 176"
          stroke={INK}
          strokeWidth={20}
          strokeLinejoin="round"
          strokeLinecap="butt"
          fill="none"
        />

        {/* what falls away */}
        {DROPS.map((d) =>
          reduced ? (
            <ellipse
              key={d.delay}
              cx={622 + d.x}
              cy={196 + d.delay * 18}
              rx={6}
              ry={7.5}
              fill={CYAN}
              opacity={0.45}
            />
          ) : (
            <motion.ellipse
              key={d.delay}
              cx={622 + d.x}
              rx={6}
              ry={7.5}
              fill={CYAN}
              initial={{ cy: 182, opacity: 0 }}
              animate={{ cy: [182, 226], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.9,
                delay: d.delay,
                repeat: Infinity,
                repeatDelay: 1.55,
                ease: "easeIn",
                times: [0, 0.15, 0.8, 1],
              }}
            />
          ),
        )}

        {/* it collects where nothing can use it */}
        <path d="M 546 240 H 700" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      </svg>



      {/* connectors down to the evidence columns, ClickUp-style */}
      <div className="mt-2 hidden grid-cols-3 sm:grid">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex justify-center">
            <span className="block h-14 w-px" style={{ background: HAIR }} />
          </div>
        ))}
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
        {/* ---------- header, centred like the reference ---------- */}
        <Reveal reduced={reduced}>
          <div className="mx-auto max-w-[840px] text-center">
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ fontFamily: MONO, color: MUTED }}
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
              className="mx-auto mt-6 max-w-[560px] text-[16px] leading-[1.55] sm:text-[17px]"
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
          </div>
        </Reveal>

        {/* ---------- central metaphor ---------- */}
        <Reveal reduced={reduced} delay={0.08} className="mt-14 sm:mt-16">
          <LeakingTap reduced={reduced} />
        </Reveal>

        {/* ---------- evidence ---------- */}
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-x-10">
          {STATS.map((s, i) => (
            <Reveal key={s.stat} reduced={reduced} delay={0.06 + i * 0.06}>
              <div className="sm:px-2 sm:text-center">
                <div
                  className="text-[44px] leading-none tracking-[-0.05em]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                >
                  {s.stat}
                </div>
                <p
                  className="mx-auto mt-4 max-w-[300px] text-[16px] leading-[1.5]"
                  style={{ color: MUTED }}
                >
                  {s.claim}
                </p>
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

        {/* ---------- bridge ---------- */}
        <Reveal reduced={reduced} delay={0.08} className="mt-24 sm:mt-28">
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
