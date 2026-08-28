import { motion, useReducedMotion } from "motion/react";
import { PhoneMissed, MessageSquareText, Reply, CalendarCheck2, Check } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#9A948B";
const HAIR = "rgba(18,20,26,0.10)";
const BG = "#FBFAF8";
const CYAN = "#06B6D4";
const VIOLET = "#6D5CFF";

function MonoLabel({ children, color = FAINT }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: MONO, color }}>
      {children}
    </div>
  );
}

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
/* Central Zapla product surface: one follow-through chain             */
/* ------------------------------------------------------------------ */

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
      style={{
        background: "linear-gradient(135deg, rgba(109,92,255,0.16), rgba(6,182,212,0.16))",
        color: INK,
        fontFamily: MONO,
      }}
    >
      {initials}
    </div>
  );
}

function ChainStep({ n, label, active }: { n: string; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-semibold"
        style={{
          fontFamily: MONO,
          background: active ? CYAN : "transparent",
          color: active ? "#fff" : FAINT,
          border: active ? "none" : `1px solid ${HAIR}`,
        }}
      >
        {active ? <Check className="h-3 w-3" strokeWidth={3} /> : n}
      </div>
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.14em]"
        style={{ fontFamily: MONO, color: active ? INK : FAINT }}
      >
        {label}
      </span>
    </div>
  );
}

function ProductSurface({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="overflow-hidden rounded-[20px] sm:rounded-[24px]"
      style={{
        background: "#FFFFFF",
        border: `1px solid ${HAIR}`,
        boxShadow: "0 24px 70px -32px rgba(18,20,26,0.22), 0 2px 10px -6px rgba(18,20,26,0.08)",
      }}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F1EFEB", border: `1px solid ${HAIR}` }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F1EFEB", border: `1px solid ${HAIR}` }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F1EFEB", border: `1px solid ${HAIR}` }} />
        <div className="ml-3 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: MONO, color: FAINT }}>
          Zapla · Inbox
        </div>
        <div
          className="ml-auto flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: MONO, background: "rgba(6,182,212,0.10)", color: "#0E7490" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full rounded-full" style={{ background: CYAN }} />
            {!reduced && (
              <motion.span
                className="absolute h-full w-full rounded-full"
                style={{ background: CYAN }}
                animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </span>
          Auto follow-up on
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* left: missed call event */}
        <div className="px-5 py-6 sm:px-7" style={{ borderBottom: `1px solid ${HAIR}` }}>
          <MonoLabel>New activity</MonoLabel>
          <div className="mt-4 flex items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "rgba(180,68,63,0.08)", color: "#B4443F" }}
            >
              <PhoneMissed className="h-4.5 w-4.5" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <div className="text-[15px] font-semibold tracking-[-0.01em]" style={{ color: INK, fontFamily: DISPLAY }}>
                  Sophie Bell
                </div>
                <div className="text-[11px]" style={{ fontFamily: MONO, color: FAINT }}>
                  09:14
                </div>
              </div>
              <div className="mt-0.5 text-[13px]" style={{ color: MUTED }}>
                Missed call · 0412 884 231
              </div>
              <div
                className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{ background: "#F4F2EE", color: "#3A3D44" }}
              >
                <MessageSquareText className="h-3.5 w-3.5" style={{ color: VIOLET }} strokeWidth={2} />
                Zapla replied automatically · 09:15
              </div>
            </div>
          </div>

          <div className="mt-6 hidden lg:block">
            <div className="h-px w-full" style={{ background: HAIR }} />
            <div className="mt-5 grid gap-2.5">
              <ChainStep n="1" label="Missed call" active />
              <ChainStep n="2" label="Follow-up sent" active />
              <ChainStep n="3" label="Customer replied" active />
              <ChainStep n="4" label="Booking confirmed" active />
            </div>
          </div>
        </div>

        {/* right: conversation thread */}
        <div className="px-5 py-6 sm:px-7" style={{ background: "#FCFBF9" }}>
          <MonoLabel>Conversation</MonoLabel>
          <div className="mt-4 space-y-3.5">
            <div className="flex gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold"
                style={{ background: INK, color: "#fff", fontFamily: MONO }}
              >
                Z
              </div>
              <div className="max-w-[85%]">
                <div
                  className="rounded-2xl rounded-tl-md px-4 py-3 text-[13px] leading-[1.45]"
                  style={{ background: "#F1EFEA", color: "#2C2F35" }}
                >
                  Hi Sophie, sorry we missed your call. Are you looking to book a service this week?
                </div>
                <div className="mt-1.5 text-[10px]" style={{ fontFamily: MONO, color: FAINT }}>
                  Zapla · SMS · 09:15
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse gap-3">
              <Avatar name="Sophie Bell" />
              <div className="max-w-[85%] text-right">
                <div
                  className="rounded-2xl rounded-tr-md px-4 py-3 text-left text-[13px] leading-[1.45]"
                  style={{ background: "rgba(109,92,255,0.10)", color: "#2C2F35", border: "1px solid rgba(109,92,255,0.18)" }}
                >
                  Yes! Are you available Thursday afternoon?
                </div>
                <div className="mt-1.5 text-[10px]" style={{ fontFamily: MONO, color: FAINT }}>
                  Sophie · 09:17
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold"
                style={{ background: INK, color: "#fff", fontFamily: MONO }}
              >
                Z
              </div>
              <div
                className="flex items-center gap-2.5 rounded-2xl rounded-tl-md px-4 py-3"
                style={{ background: "#FFFFFF", border: `1px solid ${HAIR}` }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: "rgba(6,182,212,0.12)", color: "#0E7490" }}
                >
                  <CalendarCheck2 className="h-4 w-4" strokeWidth={2} />
                </span>
                <span>
                  <span className="block text-[13px] font-semibold" style={{ color: INK }}>
                    Booked · Thursday 2:30 PM
                  </span>
                  <span className="block text-[11px]" style={{ color: MUTED }}>
                    Reminder set for Wednesday 5 PM
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* mobile chain summary */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 lg:hidden">
            <ChainStep n="1" label="Missed call" active />
            <ChainStep n="2" label="Follow-up sent" active />
            <ChainStep n="3" label="Customer replied" active />
            <ChainStep n="4" label="Booking confirmed" active />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const STATS = [
  {
    stat: "7×",
    claim: "more likely to qualify a lead when contact happens within an hour rather than waiting another hour.",
    source: "Harvard Business Review · 1.25M leads · 42 companies",
    tie: "Zapla helps respond while intent is still high.",
  },
  {
    stat: "34%",
    claim: "fewer no-shows in a trial using behaviourally designed SMS reminders.",
    source: "NSW Behavioural Insights Unit",
    tie: "Zapla sends reminders automatically.",
  },
  {
    stat: "50%",
    claim: "said poor service could stop them buying from that business again.",
    source: "Salesforce / YouGov · Australian consumers",
    tie: "Zapla helps keep customers engaged after the first sale.",
  },
];

export function ZaplaRevenueLeakageV6() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Where revenue leaks" style={{ background: BG, color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28">
        {/* header */}
        <Reveal reduced={reduced}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: MUTED }}>
            Where revenue leaks
          </div>
          <h2
            className="mt-6 max-w-[820px] text-[34px] leading-[1.02] tracking-[-0.045em] sm:text-[46px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            44% of inbound callers don't reach a person
            <span style={{ color: "#A8A29A" }}> — and that's only the first leak.</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-[16px] leading-[1.55] sm:text-[17px]" style={{ color: MUTED }}>
            Missed calls, slow replies, forgotten reminders and weak follow-up quietly turn existing demand into lost
            revenue.
          </p>
          <div className="mt-4 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: MONO, color: FAINT }}>
            Invoca · 2026 · 70M+ calls
          </div>
        </Reveal>

        {/* central product visual */}
        <Reveal reduced={reduced} delay={0.12} className="mt-12 sm:mt-16">
          <ProductSurface reduced={reduced} />
        </Reveal>

        {/* quiet stat columns */}
        <div className="mt-14 grid gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-0">
          {STATS.map((s, i) => (
            <Reveal
              key={s.stat}
              reduced={reduced}
              delay={0.1 + i * 0.08}
              className={i === 0 ? "" : "sm:border-l sm:pl-10"}
            >
              <div
                style={i === 0 ? undefined : { borderImage: `linear-gradient(${HAIR}, ${HAIR}) 1` }}
                className={i === 0 ? "" : "sm:border-[rgba(18,20,26,0.10)]"}
              >
                <div
                  className="text-[44px] leading-none tracking-[-0.05em] sm:text-[52px]"
                  style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                >
                  {s.stat}
                </div>
                <p className="mt-4 max-w-[280px] text-[14px] leading-[1.55]" style={{ color: "#3A3D44" }}>
                  {s.claim}
                </p>
                <div className="mt-3 text-[9px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: FAINT }}>
                  {s.source}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />
                  <span className="text-[12px] font-medium" style={{ color: MUTED }}>
                    {s.tie}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* bridge into product sections */}
        <Reveal reduced={reduced} delay={0.1} className="mt-16 sm:mt-24">
          <div className="h-px w-full" style={{ background: HAIR }} />
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div
              className="text-[20px] leading-[1.2] tracking-[-0.03em] sm:text-[24px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              The pattern is the same: the next step didn't happen.
            </div>
            <div className="text-[14px] font-medium sm:text-[15px]" style={{ color: MUTED }}>
              Zapla keeps it moving.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
