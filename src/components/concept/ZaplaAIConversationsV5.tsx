/* Section 5 (V1) for /concept/cinematic-follow-through-v5 only.
   One art-directed AI scene: CONVERSATIONS → CONTEXT → THINK → ACT.
   Warm espresso base, ivory text, restrained autumn accents. */
import { useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Clock, FileText, MessageSquareText, Phone, Send } from "lucide-react";
import { useRef } from "react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const IVORY = "#F4EDE2";
const CORAL = "#CE7A5A";
const AMBER = "#D29A43";
const ROSE = "#C0776F";
const SAGE = "#97A07A";

const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

/* ------------------------------------------------------------------ */
/* Loop phases                                                         */
/* ------------------------------------------------------------------ */
const PH = {
  IDLE: 0,
  IN1: 1,
  IN2: 2,
  IN3: 3,
  IN4: 4,
  GATHER: 5,
  THINK: 6,
  ACT: 7,
  SENT: 8,
  REPLY: 9,
  STATUS: 10,
  HOLD: 11,
  RESET: 12,
} as const;

const DUR = [650, 560, 560, 560, 780, 1500, 1600, 950, 1350, 1400, 1250, 3400, 900];

function useStoryLoop(inView: boolean, reduced: boolean) {
  const [phase, setPhase] = useState<number>(reduced ? PH.HOLD : PH.IDLE);
  useEffect(() => {
    if (reduced) {
      setPhase(PH.HOLD);
      return;
    }
    if (!inView) return;
    const t = setTimeout(
      () => setPhase((p) => (p >= PH.RESET ? PH.IDLE : p + 1)),
      DUR[phase],
    );
    return () => clearTimeout(t);
  }, [phase, inView, reduced]);
  return phase;
}

/* ------------------------------------------------------------------ */
/* Scene data                                                          */
/* ------------------------------------------------------------------ */
const INPUTS = [
  { icon: Phone, accent: CORAL, eyebrow: "Call · Tue 9:14", label: "Phone call", meta: "Answered · AI Voice" },
  { icon: MessageSquareText, accent: AMBER, eyebrow: "SMS · Tue", label: "SMS conversation", meta: "6 messages" },
  { icon: FileText, accent: ROSE, eyebrow: "Quote · Wed", label: "Quote sent · $18,000", meta: "Bathroom reno" },
  { icon: Clock, accent: SAGE, eyebrow: "Since Thu", label: "4 days quiet", meta: "No reply" },
] as const;

const INPUT_TOPS = [12, 138, 264, 390];
const INPUT_INDENT = [8, 26, 0, 18];

const ROLES = [
  { id: "employee", label: "AI Employee", desc: "Handles customer conversations and follow-up" },
  { id: "voice", label: "AI Voice", desc: "Answers calls and books appointments" },
  { id: "agent", label: "AI Agent", desc: "Uses context to take the next action" },
] as const;

const RAIL = ["Conversations", "Context", "Think", "Act"] as const;

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
function SarahFace({ size = 26 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0 overflow-hidden rounded-full ring-1 ring-white/10"
      style={{
        width: size,
        height: size,
        backgroundColor: "#C89A5D",
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function InputChip({
  input,
  visible,
  reduced,
  compact = false,
}: {
  input: (typeof INPUTS)[number];
  visible: boolean;
  reduced: boolean;
  compact?: boolean;
}) {
  const Icon = input.icon;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : reduced ? 0 : -12 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      className={`flex items-center gap-3 rounded-[14px] border border-white/[0.07] bg-[#2C231B] shadow-[0_18px_45px_rgba(12,8,4,.35)] ${compact ? "px-3.5 py-3" : "px-4 py-3.5"}`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-[10px] bg-white/[0.05] ${compact ? "h-8 w-8" : "h-9 w-9"}`}
      >
        <Icon size={compact ? 14 : 15} strokeWidth={2} color={input.accent} />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[8px] font-medium uppercase tracking-[0.14em] text-[#F4EDE2]/35" style={{ fontFamily: MONO }}>
          {input.eyebrow}
        </span>
        <span className={`mt-1 block truncate font-semibold text-[#F4EDE2] ${compact ? "text-[12px]" : "text-[13px]"}`}>{input.label}</span>
        <span className="mt-0.5 block truncate text-[10px] text-[#F4EDE2]/40">{input.meta}</span>
      </span>
    </motion.div>
  );
}

function CentreCard({ phase, reduced }: { phase: number; reduced: boolean }) {
  const on = (from: number) => phase >= from && phase < PH.RESET;
  const context = on(PH.GATHER);
  const think = on(PH.THINK);
  const act = on(PH.ACT);
  const sent = on(PH.SENT);
  const resolved = on(PH.STATUS);

  const status = !context
    ? { label: "Listening", color: "rgba(244,237,226,.45)" }
    : !think
      ? { label: "Reading context", color: AMBER }
      : !act
        ? { label: "Choosing next step", color: CORAL }
        : !resolved
          ? { label: "Acting", color: AMBER }
          : { label: "Resolved", color: SAGE };

  const contextRows = ["Sarah Nguyen · bathroom reno", "Quote sent · $18,000", "Quiet for 4 days"];
  const t = (delay = 0) => ({ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE });

  return (
    <div className="rounded-[18px] border border-white/[0.09] bg-[#2E251D] px-5 py-5 shadow-[0_40px_110px_rgba(10,6,3,.55)]">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <div className="flex items-center gap-2.5">
          <img src="/concept/zapla-mark-white.png" alt="" aria-hidden className="h-[18px] w-[18px] object-contain" />
          <span className="text-[13px] font-semibold text-[#F4EDE2]">Zapla AI</span>
        </div>
        <span className="flex items-center gap-1.5 text-[8px] font-medium uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: status.color }}>
          <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: status.color }} />
          {status.label}
        </span>
      </div>

      {/* context assembles */}
      <div className="mt-4 space-y-2">
        <div className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#F4EDE2]/30" style={{ fontFamily: MONO }}>
          Context
        </div>
        {contextRows.map((row, index) => (
          <motion.div
            key={row}
            initial={false}
            animate={{ opacity: context ? 1 : 0.14, x: context ? 0 : reduced ? 0 : -6 }}
            transition={t(index * 0.13)}
            className="flex items-center gap-2.5 text-[12px] text-[#F4EDE2]/78"
          >
            <span className="h-[4px] w-[4px] shrink-0 rounded-full" style={{ backgroundColor: [CORAL, ROSE, SAGE][index] }} />
            {context ? row : "···"}
          </motion.div>
        ))}
      </div>

      {/* think: next step is selected */}
      <div className="mt-4 border-t border-white/[0.07] pt-4">
        <div className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#F4EDE2]/30" style={{ fontFamily: MONO }}>
          Next step
        </div>
        <motion.div initial={false} animate={{ opacity: think ? 1 : 0.14 }} transition={t()} className="mt-2 space-y-1.5">
          <div className="relative overflow-hidden rounded-[8px] px-2.5 py-2">
            <motion.span
              initial={false}
              animate={{ scaleX: think ? 1 : 0 }}
              transition={t(0.42)}
              className="absolute inset-0 origin-left rounded-[8px]"
              style={{ backgroundColor: "rgba(210,154,67,.13)" }}
            />
            <span className="relative flex items-center justify-between text-[12.5px] font-semibold text-[#F4EDE2]">
              {think ? "Send a personal follow-up" : "···"}
              <motion.span initial={false} animate={{ opacity: think ? 1 : 0, scale: think ? 1 : 0.6 }} transition={t(0.55)}>
                <Check size={13} color={AMBER} strokeWidth={2.6} />
              </motion.span>
            </span>
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: think ? 0.32 : 0 }}
            transition={t(0.5)}
            className="px-2.5 text-[11px] text-[#F4EDE2] line-through decoration-[#F4EDE2]/40"
          >
            Wait for Sarah to call back
          </motion.div>
        </motion.div>
      </div>

      {/* act */}
      <motion.div
        initial={false}
        animate={{ opacity: act ? 1 : 0.14, y: act ? 0 : reduced ? 0 : 6 }}
        transition={t()}
        className="mt-4 flex items-center justify-between rounded-[10px] border px-3 py-2.5"
        style={{ borderColor: act ? "rgba(210,154,67,.4)" : "rgba(255,255,255,.07)", backgroundColor: act ? "rgba(210,154,67,.09)" : "transparent" }}
      >
        <span className="flex items-center gap-2 text-[12px] font-semibold text-[#F4EDE2]">
          <Send size={12} color={AMBER} strokeWidth={2.2} />
          {act ? "Follow-up · SMS" : "···"}
        </span>
        <span className="text-[8px] font-medium uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: sent ? SAGE : "rgba(244,237,226,.4)" }}>
          {sent ? "Sent" : act ? "Sending" : ""}
        </span>
      </motion.div>
    </div>
  );
}

function OutcomeSent({ visible, reduced, compact = false }: { visible: boolean; reduced: boolean; compact?: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : reduced ? 0 : 12 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      className={`rounded-[14px] border border-white/[0.07] bg-[#2C231B] shadow-[0_18px_45px_rgba(12,8,4,.35)] ${compact ? "px-3.5 py-3" : "px-4 py-3.5"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#F4EDE2]/35" style={{ fontFamily: MONO }}>
          Zapla · SMS · 4:02 PM
        </span>
        <Check size={11} color={AMBER} strokeWidth={2.6} />
      </div>
      <div className="mt-1.5 text-[13px] font-semibold text-[#F4EDE2]">Follow-up sent</div>
      <div className="mt-2 w-fit rounded-[10px] rounded-bl-[3px] px-2.5 py-1.5 text-[10.5px] leading-[1.45] text-[#241C15]" style={{ backgroundColor: "#E8C689" }}>
        Hi Sarah, any questions on the quote?
      </div>
    </motion.div>
  );
}

function OutcomeReply({ visible, reduced, compact = false }: { visible: boolean; reduced: boolean; compact?: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : reduced ? 0 : 12 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
      className={`rounded-[14px] border border-white/[0.07] bg-[#2C231B] shadow-[0_18px_45px_rgba(12,8,4,.35)] ${compact ? "px-3.5 py-3" : "px-4 py-3.5"}`}
    >
      <div className="flex items-center gap-2.5">
        <SarahFace size={24} />
        <div className="min-w-0">
          <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#F4EDE2]/35" style={{ fontFamily: MONO }}>
            Sarah · 4:09 PM
          </div>
          <div className="mt-0.5 text-[13px] font-semibold text-[#F4EDE2]">Sarah replied</div>
        </div>
      </div>
      <div className="mt-2 w-fit rounded-[10px] rounded-bl-[3px] bg-white/[0.07] px-2.5 py-1.5 text-[10.5px] leading-[1.45] text-[#F4EDE2]/85">
        Yes, can we book Thursday?
      </div>
    </motion.div>
  );
}

function OutcomeStatus({ reengaged, reduced, compact = false }: { reengaged: boolean; reduced: boolean; compact?: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ scale: reengaged && !reduced ? [1, 1.025, 1] : 1 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
      className={`rounded-[14px] border bg-[#2C231B] shadow-[0_18px_45px_rgba(12,8,4,.35)] ${compact ? "px-3.5 py-3" : "px-4 py-3.5"}`}
      style={{ borderColor: reengaged ? "rgba(151,160,122,.45)" : "rgba(255,255,255,.07)" }}
    >
      <div className="text-[8px] font-medium uppercase tracking-[0.14em] text-[#F4EDE2]/35" style={{ fontFamily: MONO }}>
        Opportunity · $18,000
      </div>
      <div className="relative mt-1.5 h-[19px] text-[13px] font-semibold">
        <motion.span
          initial={false}
          animate={{ opacity: reengaged ? 0 : 1 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          className="absolute inset-0 flex items-center gap-1.5 text-[#F4EDE2]/45"
        >
          <span className="h-[6px] w-[6px] rounded-full bg-[#F4EDE2]/25" />
          Quiet · 4 days
        </motion.span>
        <motion.span
          initial={false}
          animate={{ opacity: reengaged ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          className="absolute inset-0 flex items-center gap-1.5"
          style={{ color: SAGE }}
        >
          <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: SAGE }} />
          Re-engaged
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop connectors                                                  */
/* ------------------------------------------------------------------ */
function Connectors({ phase, reduced }: { phase: number; reduced: boolean }) {
  const on = (from: number) => phase >= from && phase < PH.RESET;
  const gather = on(PH.GATHER);
  const inCy = INPUT_TOPS.map((top) => top + 39);
  const inTy = [178, 233, 288, 343];
  const inputPaths = inCy.map((cy, index) => `M216 ${cy} C 262 ${cy}, 296 ${inTy[index]}, 342 ${inTy[index]}`);
  const outPaths = [
    "M658 205 C 705 205, 736 78, 790 78",
    "M658 260 C 705 260, 736 255, 790 255",
    "M658 315 C 705 315, 736 424, 790 424",
  ];
  const outOn = [on(PH.SENT), on(PH.REPLY), on(PH.STATUS)];
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden>
      {[...inputPaths, ...outPaths].map((d) => (
        <path key={d} d={d} fill="none" stroke="rgba(244,237,226,.08)" strokeWidth="1.4" />
      ))}
      {inputPaths.map((d, index) => (
        <motion.path
          key={`in-${d}`}
          d={d}
          fill="none"
          stroke={INPUTS[index].accent}
          strokeWidth={gather ? 1.8 : 1.4}
          strokeLinecap="round"
          initial={false}
          animate={{
            pathLength: on(PH.IN1 + index) ? 1 : 0,
            opacity: on(PH.IN1 + index) ? (gather ? 0.75 : 0.3) : 0,
          }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
        />
      ))}
      {outPaths.map((d, index) => (
        <motion.path
          key={`out-${d}`}
          d={d}
          fill="none"
          stroke={index === 2 ? SAGE : AMBER}
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: outOn[index] ? 1 : 0, opacity: outOn[index] ? 0.55 : 0 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export function ZaplaAIConversationsV5() {
  const reduced = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.15 });
  const phase = useStoryLoop(inView, reduced);
  const [manualRole, setManualRole] = useState<string | null>(null);

  const on = (from: number) => phase >= from && phase < PH.RESET;
  const railIndex = phase < PH.GATHER ? 0 : phase === PH.GATHER ? 1 : phase === PH.THINK ? 2 : 3;
  const autoRole = phase <= PH.IN4 ? "voice" : phase <= PH.THINK ? "agent" : "employee";
  const activeRole = manualRole ?? autoRole;
  const activeDesc = ROLES.find((role) => role.id === activeRole)?.desc ?? "";

  return (
    <section className="relative overflow-hidden bg-[#221A14] px-5 py-24 text-[#F4EDE2] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-[120px] h-[620px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(210,154,67,.09),rgba(206,122,90,.05)_45%,transparent_70%)] blur-2xl" />
      <div className="relative mx-auto max-w-[1440px]">
        {/* header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
          className="text-center"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ fontFamily: MONO, color: AMBER }}>
            Zapla AI
          </div>
          <h2 className="mx-auto mt-5 max-w-[1020px] text-[44px] leading-[0.95] tracking-[-0.055em] sm:text-[64px] lg:text-[80px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Turn every conversation
            <span className="block text-[#8F8375]">into the next action.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[660px] text-[15px] leading-[1.7] text-[#F4EDE2]/55 sm:text-[17px]">
            Zapla answers calls and messages, understands what’s already happened, then follows up, books, updates your CRM and keeps opportunities moving.
          </p>
        </motion.div>

        {/* stage rail */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
          {RAIL.map((step, index) => (
            <span key={step} className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] transition-colors duration-500" style={{ fontFamily: MONO, color: index === railIndex ? IVORY : "rgba(244,237,226,.28)" }}>
              <span className="h-[4px] w-[4px] rounded-full transition-colors duration-500" style={{ backgroundColor: index === railIndex ? AMBER : "rgba(244,237,226,.18)" }} />
              {step}
            </span>
          ))}
        </div>

        {/* desktop stage */}
        <div ref={stageRef}>
          <div className="relative mx-auto mt-10 hidden h-[520px] max-w-[1160px] xl:block">
            <Connectors phase={phase} reduced={reduced} />
            {INPUTS.map((input, index) => (
              <div key={input.label} className="absolute w-[232px]" style={{ top: INPUT_TOPS[index], left: INPUT_INDENT[index] }}>
                <InputChip input={input} visible={on(PH.IN1 + index)} reduced={reduced} />
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 z-10 w-[380px] -translate-x-1/2 -translate-y-1/2">
              <CentreCard phase={phase} reduced={reduced} />
            </div>
            <div className="absolute right-0 top-[18px] w-[250px]">
              <OutcomeSent visible={on(PH.SENT)} reduced={reduced} />
            </div>
            <div className="absolute right-0 top-[190px] w-[250px]">
              <OutcomeReply visible={on(PH.REPLY)} reduced={reduced} />
            </div>
            <div className="absolute right-0 top-[378px] w-[250px]">
              <OutcomeStatus reengaged={on(PH.STATUS)} reduced={reduced} />
            </div>
          </div>

          {/* stacked stage below xl */}
          <div className="mx-auto mt-10 max-w-[520px] xl:hidden">
            <div className="grid grid-cols-1 gap-3 min-[430px]:grid-cols-2">
              {INPUTS.map((input, index) => (
                <InputChip key={input.label} input={input} visible={on(PH.IN1 + index)} reduced={reduced} compact />
              ))}
            </div>
            <div className="mx-auto my-4 h-9 w-px bg-gradient-to-b from-transparent via-[#D29A43]/40 to-[#D29A43]/60" />
            <div className="mx-auto max-w-[400px]">
              <CentreCard phase={phase} reduced={reduced} />
            </div>
            <div className="mx-auto my-4 h-9 w-px bg-gradient-to-b from-[#97A07A]/60 via-[#97A07A]/40 to-transparent" />
            <div className="mx-auto max-w-[400px] space-y-3">
              <OutcomeSent visible={on(PH.SENT)} reduced={reduced} compact />
              <OutcomeReply visible={on(PH.REPLY)} reduced={reduced} compact />
              <OutcomeStatus reengaged={on(PH.STATUS)} reduced={reduced} compact />
            </div>
          </div>
        </div>

        {/* role selector */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ROLES.map((role) => {
              const active = role.id === activeRole;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setManualRole((prev) => (prev === role.id ? null : role.id))}
                  className="rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors duration-300"
                  style={{
                    borderColor: active ? "rgba(210,154,67,.55)" : "rgba(255,255,255,.12)",
                    color: active ? IVORY : "rgba(244,237,226,.45)",
                    backgroundColor: active ? "rgba(210,154,67,.08)" : "transparent",
                  }}
                >
                  {role.label}
                </button>
              );
            })}
          </div>
          <div className="flex h-5 items-center text-[11px] text-[#F4EDE2]/45">
            <motion.span key={activeRole} initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}>
              {activeDesc}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
