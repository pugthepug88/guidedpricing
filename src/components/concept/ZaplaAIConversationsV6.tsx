import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Clock3, FileText, MessageSquareText, Phone, Send } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const INK = "#201F1D";
const MUTED = "#817A70";
const IVORY = "#F4F0E8";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";
const PORTRAITS = "/concept/revenue/soft-autumn-portraits-v1.webp";

const PH = { IDLE: 0, CONTEXT: 1, THINK: 2, ACT: 3, TYPING: 4, REPLY: 5, STATUS: 6, HOLD: 7, RESET: 8 } as const;
const DURATIONS = [1500, 2100, 1800, 1700, 1050, 1450, 1300, 3600, 800];

function useStoryLoop(inView: boolean, reduced: boolean) {
  const [phase, setPhase] = useState<number>(reduced ? PH.HOLD : PH.IDLE);
  useEffect(() => {
    if (reduced) {
      setPhase(PH.HOLD);
      return;
    }
    if (!inView) return;
    const timer = window.setTimeout(() => setPhase((p) => (p >= PH.RESET ? PH.IDLE : p + 1)), DURATIONS[phase]);
    return () => window.clearTimeout(timer);
  }, [phase, inView, reduced]);
  return phase;
}

function SarahFace({ size = 30 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="block shrink-0 rounded-full ring-1 ring-black/[0.06]"
      style={{
        width: size,
        height: size,
        backgroundColor: "#C89A5D",
        backgroundImage: `url(${PORTRAITS})`,
        backgroundPosition: "0% 0%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function Spectrum({ active }: { active: boolean }) {
  return (
    <div className="relative h-[3px] overflow-hidden rounded-full bg-black/[0.06]">
      <motion.div
        className="absolute inset-y-0 left-[-40%] w-[75%] rounded-full"
        style={{ background: `linear-gradient(90deg,transparent,${CORAL},${AMBER},${ROSE},${SAGE},transparent)` }}
        animate={active ? { x: ["0%", "190%"] } : { x: "190%" }}
        transition={active ? { duration: 1.7, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />
    </div>
  );
}

function Role({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.08em]"
      style={{ borderColor: `${tone}55`, backgroundColor: `${tone}14`, color: INK, fontFamily: MONO }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: tone }} />
      {label}
    </span>
  );
}

function DealStatus({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="relative h-[28px] w-[128px] shrink-0 overflow-hidden rounded-full border border-black/[0.07] bg-white/75">
      <motion.span
        className="absolute inset-0 flex items-center justify-center gap-1.5 text-[10px] font-semibold"
        style={{ color: "#8B625A" }}
        animate={{ opacity: active ? 0 : 1, y: active ? -8 : 0 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
      >
        <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: ROSE }} /> Quote sent
      </motion.span>
      <motion.span
        className="absolute inset-0 flex items-center justify-center gap-1.5 text-[10px] font-semibold"
        style={{ color: "#657047" }}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
      >
        <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: SAGE }} /> Re-engaged
      </motion.span>
    </div>
  );
}

function StorySteps({ phase }: { phase: number }) {
  const current = phase < PH.CONTEXT ? 0 : phase < PH.THINK ? 1 : phase < PH.ACT ? 2 : 3;
  const steps = ["Conversation", "Context", "Think", "Act"];
  const tones = [CORAL, AMBER, ROSE, SAGE];
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-7">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: current === i ? IVORY : "rgba(244,240,232,.28)" }}>
          <span className="h-[5px] w-[5px] rounded-full transition-colors duration-500" style={{ backgroundColor: current === i ? tones[i] : "rgba(244,240,232,.14)" }} />
          {step}
        </span>
      ))}
    </div>
  );
}

function Conversation({ phase, reduced }: { phase: number; reduced: boolean }) {
  const sent = phase >= PH.ACT && phase < PH.RESET;
  const typing = phase === PH.TYPING;
  const replied = phase >= PH.REPLY && phase < PH.RESET;
  const reengaged = phase >= PH.STATUS && phase < PH.RESET;

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#FBF8F1]">
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] px-4 py-3.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <SarahFace size={34} />
          <div className="min-w-0">
            <div className="truncate text-[13px] font-bold" style={{ color: INK }}>Sarah Nguyen</div>
            <div className="truncate text-[9.5px] font-medium" style={{ color: MUTED }}>Bathroom renovation · $18,000 opportunity</div>
          </div>
        </div>
        <DealStatus active={reengaged} reduced={reduced} />
      </div>

      <div className="flex-1 px-4 py-4 sm:px-5 sm:py-5">
        <div className="space-y-3.5">
          <div className="text-center text-[8px] font-semibold uppercase tracking-[0.17em]" style={{ fontFamily: MONO, color: "#A49D92" }}>Tuesday</div>

          <div className="flex items-end gap-2">
            <SarahFace size={20} />
            <div className="max-w-[79%] rounded-[15px] rounded-bl-[5px] bg-[#EEE7DA] px-3.5 py-2.5 text-[12px] leading-[1.5] sm:text-[12.5px]" style={{ color: INK }}>
              Hi! I’d love a quote for our bathroom reno. We’re hoping to start in March.
            </div>
          </div>

          <div className="ml-7 flex flex-wrap items-center gap-2">
            <Role label="AI Voice" tone={CORAL} />
            <span className="flex items-center gap-1 text-[8.5px] font-medium" style={{ fontFamily: MONO, color: MUTED }}><Phone size={10} color={CORAL} /> Call answered · 2m 14s</span>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[79%] rounded-[15px] rounded-br-[5px] bg-[#252525] px-3.5 py-2.5 text-[12px] leading-[1.5] text-white sm:text-[12.5px]">
              Thanks Sarah, lovely chatting today. Your quote is on its way.
            </div>
          </div>

          <div className="flex justify-end">
            <div className="flex max-w-[90%] items-center gap-2.5 rounded-[12px] border border-black/[0.08] bg-white px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px]" style={{ backgroundColor: `${ROSE}18` }}><FileText size={13} color={ROSE} /></span>
              <span className="min-w-0">
                <span className="block truncate text-[10.5px] font-semibold" style={{ color: INK }}>Quote #1284 · Bathroom renovation</span>
                <span className="block text-[8.5px]" style={{ color: MUTED }}>Opened twice · sent Wednesday</span>
              </span>
              <span className="ml-1 shrink-0 text-[12px] font-bold" style={{ color: INK }}>$18,000</span>
            </div>
          </div>

          <div className="flex items-center gap-3 py-0.5">
            <span className="h-px flex-1 bg-black/[0.07]" />
            <span className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.13em]" style={{ fontFamily: MONO, color: "#A16C63" }}><Clock3 size={9} color={ROSE} /> 4 days · no reply</span>
            <span className="h-px flex-1 bg-black/[0.07]" />
          </div>

          <motion.div className="flex flex-col items-end" initial={false} animate={{ opacity: sent ? 1 : 0, y: sent ? 0 : reduced ? 0 : 10 }} transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}>
            <div className="mb-1.5 mr-1"><Role label="AI Employee" tone={AMBER} /></div>
            <div className="max-w-[83%] rounded-[15px] rounded-br-[5px] border px-3.5 py-2.5 text-[12px] leading-[1.5] sm:text-[12.5px]" style={{ color: INK, borderColor: `${AMBER}55`, backgroundColor: `${AMBER}16` }}>
              Hi Sarah, just checking in on your bathroom reno quote. Happy to answer any questions, or we can lock in a start date.
            </div>
            <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.11em]" style={{ fontFamily: MONO, color: MUTED }}>Zapla · follow-up · 4:02 PM</div>
          </motion.div>

          <div className="relative h-[68px]">
            <motion.div className="absolute left-0 top-0 flex items-end gap-2" initial={false} animate={{ opacity: typing ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
              <SarahFace size={20} />
              <div className="flex gap-1 rounded-[15px] rounded-bl-[5px] bg-[#EEE7DA] px-3 py-2.5">
                {[0, 1, 2].map((i) => <motion.span key={i} className="h-[5px] w-[5px] rounded-full bg-[#8C857B]" animate={typing && !reduced ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.4 }} transition={typing && !reduced ? { duration: 0.9, repeat: Infinity, delay: i * 0.15 } : { duration: 0 }} />)}
              </div>
            </motion.div>
            <motion.div className="absolute left-0 top-0 flex items-end gap-2" initial={false} animate={{ opacity: replied ? 1 : 0, y: replied ? 0 : reduced ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}>
              <SarahFace size={20} />
              <div>
                <div className="max-w-[92%] rounded-[15px] rounded-bl-[5px] bg-[#EEE7DA] px-3.5 py-2.5 text-[12px] leading-[1.5] sm:text-[12.5px]" style={{ color: INK }}>Sorry for the quiet week! Yes please, can we book Thursday?</div>
                <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.11em]" style={{ fontFamily: MONO, color: MUTED }}>Sarah · 4:09 PM</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-black/[0.07] px-4 py-2.5 sm:px-5">
        <div className="flex h-9 flex-1 items-center rounded-full bg-[#EEE8DC] px-4 text-[11px]" style={{ color: "#A49D92" }}>Message Sarah…</div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#252525]"><Send size={12} color="#fff" /></span>
      </div>
    </div>
  );
}

function Intelligence({ phase, reduced }: { phase: number; reduced: boolean }) {
  const context = phase >= PH.CONTEXT && phase < PH.RESET;
  const thinking = phase >= PH.THINK && phase < PH.RESET;
  const acted = phase >= PH.ACT && phase < PH.RESET;
  const signals = [
    { icon: Phone, label: "Call", tone: CORAL },
    { icon: MessageSquareText, label: "6 messages", tone: AMBER },
    { icon: FileText, label: "$18k quote", tone: ROSE },
    { icon: Clock3, label: "4 days quiet", tone: SAGE },
  ];

  return (
    <aside className="relative border-t border-black/[0.07] bg-[#F1ECE2] md:w-[300px] md:shrink-0 md:border-l md:border-t-0">
      <div className="absolute inset-x-0 top-0"><Spectrum active={thinking && !acted} /></div>
      <div className="p-4 pt-5 sm:p-5 sm:pt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-semibold uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: MUTED }}>Zapla AI</span>
            {thinking && <Role label="AI Agent" tone={ROSE} />}
          </div>
          <span className="text-[8px] font-semibold uppercase tracking-[0.12em]" style={{ fontFamily: MONO, color: acted ? SAGE : thinking ? AMBER : MUTED }}>{acted ? "Acting" : thinking ? "Thinking" : context ? "Context" : "Listening"}</span>
        </div>

        <motion.div initial={false} animate={{ opacity: context ? 1 : 0.18 }} transition={{ duration: reduced ? 0 : 0.4 }} className="mt-5">
          <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ fontFamily: MONO, color: MUTED }}>Context</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {signals.map(({ icon: Icon, label, tone }, i) => (
              <motion.span key={label} initial={false} animate={{ opacity: context ? 1 : 0, y: context ? 0 : reduced ? 0 : 7 }} transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : context ? i * 0.08 : 0, ease: EASE }} className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/75 px-2.5 py-1.5 text-[9.5px] font-semibold" style={{ color: INK }}>
                <Icon size={10} color={tone} /> {label}
              </motion.span>
            ))}
          </div>
          <motion.div initial={false} animate={{ opacity: context ? 1 : 0, y: context ? 0 : reduced ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : context ? 0.3 : 0, ease: EASE }} className="mt-4 rounded-[12px] bg-white/70 px-3 py-3 text-[11.5px] font-semibold leading-[1.5]" style={{ color: INK }}>
            Sarah is a warm lead. Quote opened. No reply for four days.
          </motion.div>
        </motion.div>

        <motion.div initial={false} animate={{ opacity: thinking ? 1 : 0.12 }} transition={{ duration: reduced ? 0 : 0.4 }} className="mt-5 border-t border-black/[0.07] pt-5">
          <div className="text-[8px] font-semibold uppercase tracking-[0.15em]" style={{ fontFamily: MONO, color: MUTED }}>Best next action</div>
          <motion.div initial={false} animate={{ opacity: thinking ? 1 : 0, y: thinking ? 0 : reduced ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.5, ease: EASE }} className="mt-3 rounded-[12px] border border-white/[0.07] bg-[#1D1E20] p-3">
            <Spectrum active={thinking && !acted} />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[12px] font-semibold text-white">Follow up now</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: `${SAGE}2A` }}><Check size={12} color={SAGE} strokeWidth={2.8} /></span>
            </div>
            <div className="mt-1 text-[9.5px] leading-[1.45] text-white/45">Personal SMS based on the quote and previous conversation.</div>
          </motion.div>
        </motion.div>

        <motion.div initial={false} animate={{ opacity: acted ? 1 : 0, y: acted ? 0 : reduced ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.45, ease: EASE }} className="mt-4 flex items-center gap-2 rounded-[10px] border px-3 py-2.5" style={{ borderColor: `${SAGE}45`, backgroundColor: `${SAGE}13` }}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: `${SAGE}25` }}><Check size={10} color={SAGE} strokeWidth={2.8} /></span>
          <span className="text-[10.5px] font-semibold" style={{ color: INK }}>Follow-up sent · CRM updated</span>
        </motion.div>
      </div>
    </aside>
  );
}

export function ZaplaAIConversationsV6() {
  const reduced = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { amount: 0.18 });
  const phase = useStoryLoop(inView, reduced);

  return (
    <section className="relative overflow-hidden px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32" style={{ backgroundColor: BG }}>
      <div className="pointer-events-none absolute left-1/2 top-[300px] h-[500px] w-[900px] -translate-x-1/2 opacity-65 blur-3xl" style={{ background: `radial-gradient(circle at 35% 46%,${CORAL}16,transparent 34%),radial-gradient(circle at 52% 40%,${AMBER}16,transparent 32%),radial-gradient(circle at 66% 52%,${ROSE}14,transparent 34%),radial-gradient(circle at 53% 64%,${SAGE}10,transparent 32%)` }} />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end lg:gap-16">
          <motion.div initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ fontFamily: MONO, color: AMBER }}>Zapla AI</div>
            <h2 className="mt-5 max-w-[820px] text-[40px] leading-[0.97] tracking-[-0.05em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Turn every conversation <span className="block text-white/48">into the next action.</span>
            </h2>
          </motion.div>
          <motion.p initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.08, ease: EASE }} className="max-w-[520px] text-[15px] leading-[1.7] text-white/52 sm:text-[16px]">
            Zapla answers calls and messages, understands what’s already happened, then follows up, books, updates your CRM and keeps opportunities moving.
          </motion.p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <StorySteps phase={phase} />
          <div className="hidden text-[9px] font-semibold uppercase tracking-[0.13em] text-white/25 sm:block" style={{ fontFamily: MONO }}>One customer · one continuous context</div>
        </div>

        <div ref={stageRef} className="relative mx-auto mt-7 max-w-[1080px]">
          <div className="absolute -inset-[1px] rounded-[24px] opacity-65" style={{ background: `linear-gradient(115deg,${CORAL}55,${AMBER}45 30%,transparent 48%,${ROSE}42 68%,${SAGE}45)` }} />
          <div className="relative overflow-hidden rounded-[23px] border border-white/[0.08] bg-[#202124] shadow-[0_45px_120px_rgba(0,0,0,.52)]">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5"><img src="/concept/zapla-mark-white.png" alt="" aria-hidden className="h-[17px] w-[17px] object-contain" /><span className="text-[11px] font-semibold text-white/78">Zapla workspace</span></div>
              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/28" style={{ fontFamily: MONO }}>Live customer context</span>
            </div>
            <div className="flex flex-col md:flex-row"><Conversation phase={phase} reduced={reduced} /><Intelligence phase={phase} reduced={reduced} /></div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-[1080px] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-medium text-white/38 sm:justify-start">
          <span><strong className="font-semibold text-white/65">AI Voice</strong> answers</span><span className="text-white/16">•</span>
          <span><strong className="font-semibold text-white/65">AI Agent</strong> decides</span><span className="text-white/16">•</span>
          <span><strong className="font-semibold text-white/65">AI Employee</strong> follows through</span>
        </div>
      </div>
    </section>
  );
}
