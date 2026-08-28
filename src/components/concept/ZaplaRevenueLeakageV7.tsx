import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, PhoneMissed, MessageCircle, Clock3, Star, type LucideIcon } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";
const HAIR = "rgba(18,20,26,0.10)";
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
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The tangled thread: one thick knotted cord running across the      */
/* canvas — the customer journey as it actually exists. Icon chips    */
/* for each leak moment sit on the thread; red marks show where it    */
/* breaks. ClickUp-inspired.                                          */
/* ------------------------------------------------------------------ */

const THREAD_D =
  "M 20 235 C 80 140, 165 125, 205 195 C 235 250, 160 305, 140 248 C 122 195, 210 135, 318 158 C 425 181, 402 302, 306 297 C 214 292, 252 162, 412 152 C 562 143, 588 288, 482 298 C 390 306, 418 167, 578 157 C 728 148, 748 292, 646 297 C 556 301, 588 162, 748 154 C 898 147, 918 288, 821 294 C 736 299, 783 167, 948 160 C 1028 157, 1058 192, 1082 208";

type LeakNode = { icon: LucideIcon; color: string; left: string; top: string };

const NODES: LeakNode[] = [
  { icon: PhoneMissed, color: "#E5484D", left: "16.4%", top: "51.2%" },
  { icon: MessageCircle, color: "#D97706", left: "32.3%", top: "54.8%" },
  { icon: Clock3, color: "#2563EB", left: "48.2%", top: "53.6%" },
  { icon: Star, color: "#7C3AED", left: "78.6%", top: "52.9%" },
];

const BREAKS = [
  { left: "24.5%", top: "76.2%" },
  { left: "56.4%", top: "78.6%" },
];

const QUOTES = [
  { text: "Did anyone call them back?", left: "22.7%", top: "15.5%", rotate: "-2deg" },
  { text: "Sorry — only just seeing this", left: "47.3%", top: "11.9%", rotate: "1.5deg" },
  { text: "Still waiting on a quote…", left: "71.8%", top: "15.5%", rotate: "-1deg" },
];

function TangledCanvas({ reduced }: { reduced: boolean }) {
  const draw = reduced
    ? {}
    : {
        initial: { pathLength: 0 },
        whileInView: { pathLength: 1 },
        viewport: { once: true, amount: 0.35 },
      };
  return (
    <div className="relative mx-auto mt-6 hidden w-full max-w-[1080px] sm:block" style={{ aspectRatio: "1100 / 420" }}>
      <svg viewBox="0 0 1100 420" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <motion.path
          d={THREAD_D}
          stroke="#EFEDE8"
          strokeWidth={30}
          strokeLinecap="round"
          {...draw}
          transition={{ duration: reduced ? 0 : 1.7, ease: EASE }}
        />
        <motion.path
          d={THREAD_D}
          stroke="#E3E0D9"
          strokeWidth={13}
          strokeLinecap="round"
          {...draw}
          transition={{ duration: reduced ? 0 : 1.7, delay: reduced ? 0 : 0.12, ease: EASE }}
        />
      </svg>

      {NODES.map((n, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.35 + i * 0.12, ease: EASE }}
          className="absolute z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] border bg-white lg:h-14 lg:w-14"
          style={{ left: n.left, top: n.top, borderColor: HAIR, boxShadow: "0 18px 36px -18px rgba(18,20,26,0.32)" }}
        >
          <n.icon className="h-[18px] w-[18px] lg:h-5 lg:w-5" style={{ color: n.color }} />
        </motion.div>
      ))}

      {BREAKS.map((b, i) => (
        <motion.div
          key={i}
          initial={reduced ? false : { opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: reduced ? 0 : 0.85 + i * 0.14, ease: EASE }}
          className="absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white text-[12px] leading-none"
          style={{ left: b.left, top: b.top, borderColor: "rgba(229,72,77,0.45)", color: RED, boxShadow: "0 8px 18px -10px rgba(229,72,77,0.5)" }}
          aria-hidden
        >
          ×
        </motion.div>
      ))}

      {QUOTES.map((q, i) => (
        <motion.div
          key={q.text}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: reduced ? 0 : 1 + i * 0.13, ease: EASE }}
          className="absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-full border bg-white px-3.5 py-2 text-[11px]"
          style={{
            left: q.left,
            top: q.top,
            rotate: q.rotate,
            color: MUTED,
            borderColor: HAIR,
            boxShadow: "0 14px 30px -18px rgba(18,20,26,0.28)",
          }}
        >
          {q.text}
        </motion.div>
      ))}
    </div>
  );
}

function MobileThread() {
  return (
    <div className="relative mt-12 px-2 sm:hidden" aria-hidden>
      <div className="absolute left-8 right-8 top-1/2 border-t border-dashed" style={{ borderColor: "rgba(18,20,26,0.22)" }} />
      <div className="relative flex items-center justify-between">
        {NODES.map((n, i) => (
          <span
            key={i}
            className="flex h-11 w-11 items-center justify-center rounded-[13px] border bg-white"
            style={{ borderColor: HAIR, boxShadow: "0 12px 24px -14px rgba(18,20,26,0.3)" }}
          >
            <n.icon className="h-[17px] w-[17px]" style={{ color: n.color }} />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const LEAKS: { label: string; pre: string; stat: string; post: string; source: string }[] = [
  {
    label: "Missed at hello",
    pre: "Nearly half of inbound callers — ",
    stat: "44%",
    post: " — never reach a person at all.",
    source: "Invoca · 2026 · 70M+ calls",
  },
  {
    label: "Never asked",
    pre: "",
    stat: "64%",
    post: " of businesses don't ask the lead to buy or book — even when the lead shows up.",
    source: "Invoca · 2026",
  },
  {
    label: "Too slow",
    pre: "",
    stat: "79%",
    post: " of customers would take their business elsewhere after poor or slow service.",
    source: "ServiceNow / Lonergan Research",
  },
  {
    label: "Left behind",
    pre: "",
    stat: "89%",
    post: " are more likely to use a local business that responds to its reviews.",
    source: "BrightLocal · 2025",
  },
];

export function ZaplaRevenueLeakageV7() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of no follow-through" className="bg-white" style={{ color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28">
        {/* ---------- header ---------- */}
        <Reveal reduced={reduced}>
          <div className="mx-auto max-w-[840px] text-center">
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ fontFamily: MONO, color: MUTED }}
            >
              The cost of no follow-through
            </div>
            <h2
              className="mt-6 text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px] lg:text-[56px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              44% of inbound callers don't reach a person.
              <span style={{ color: FAINT }}> That's only the first step lost.</span>
            </h2>
            <p
              className="mx-auto mt-6 max-w-[580px] text-[16px] leading-[1.55] sm:text-[17px]"
              style={{ color: MUTED }}
            >
              The journey from first contact to booked, paid and returning should be one unbroken
              thread. In most businesses it looks like this instead.
            </p>
          </div>
        </Reveal>

        {/* ---------- tangled thread canvas ---------- */}
        <TangledCanvas reduced={reduced} />
        <MobileThread />

        {/* ---------- evidence columns ---------- */}
        <div className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {LEAKS.map((leak, i) => (
            <Reveal key={leak.label} reduced={reduced} delay={0.06 + i * 0.06}>
              <div className="border-t pt-6" style={{ borderColor: HAIR }}>
                <div
                  className="text-[19px] tracking-[-0.02em]"
                  style={{ fontFamily: DISPLAY, fontWeight: 600, color: INK }}
                >
                  {leak.label}
                </div>
                <p className="mt-3 text-[15px] leading-[1.55]" style={{ color: MUTED }}>
                  {leak.pre}
                  <span className="font-semibold" style={{ color: INK }}>
                    {leak.stat}
                  </span>
                  {leak.post}
                </p>
                <div
                  className="mt-4 text-[9px] uppercase tracking-[0.16em]"
                  style={{ fontFamily: MONO, color: FAINT }}
                >
                  {leak.source}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ---------- bridge ---------- */}
        <Reveal reduced={reduced} delay={0.08} className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-[760px] text-center">
            <div
              className="text-[24px] leading-[1.25] tracking-[-0.03em] sm:text-[28px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: FAINT }}
            >
              These aren't four separate problems. They're one follow-through problem.
            </div>
            <div
              className="mt-3 text-[24px] leading-[1.25] tracking-[-0.03em] sm:text-[28px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              Zapla connects the next step — from first contact to booked, paid and returning.
            </div>
            <a
              href="#zapla-product-v5"
              className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold"
              style={{ color: "#0E8FA6" }}
            >
              See how Zapla connects it <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
