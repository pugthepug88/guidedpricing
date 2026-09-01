import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Clock3, FileText, MessageSquareText, Phone } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const IVORY = "#F4F0E8";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";

const PH = {
  CONVERSATION: 0,
  CONTEXT: 1,
  THINK: 2,
  ACT: 3,
  OUTCOME: 4,
  HOLD: 5,
  RESET: 6,
} as const;

const DURATIONS = [2100, 2300, 2100, 1900, 1800, 3200, 800];

function useStoryLoop(inView: boolean, reduced: boolean) {
  const [phase, setPhase] = useState<number>(reduced ? PH.HOLD : PH.CONVERSATION);

  useEffect(() => {
    if (reduced) {
      setPhase(PH.HOLD);
      return;
    }
    if (!inView) return;

    const timer = window.setTimeout(() => {
      setPhase((current) => (current >= PH.RESET ? PH.CONVERSATION : current + 1));
    }, DURATIONS[phase]);

    return () => window.clearTimeout(timer);
  }, [phase, inView, reduced]);

  return phase;
}

function RoleLabel({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.13em]"
      style={{ color: IVORY, fontFamily: MONO }}
    >
      <span className="h-[5px] w-[5px] rounded-full" style={{ backgroundColor: tone }} />
      {label}
    </span>
  );
}

function StageLabel({ active, label, tone }: { active: boolean; label: string; tone: string }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.28, y: active ? 0 : 2 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em]"
      style={{ color: active ? IVORY : "rgba(244,240,232,.6)", fontFamily: MONO }}
    >
      <motion.span
        initial={false}
        animate={{ scale: active ? 1 : 0.8, opacity: active ? 1 : 0.35 }}
        className="h-[5px] w-[5px] rounded-full"
        style={{ backgroundColor: tone }}
      />
      {label}
    </motion.div>
  );
}

function SpectrumSweep({ active, vertical = false }: { active: boolean; vertical?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-white/[0.08] ${vertical ? "h-full w-[3px]" : "h-[3px] w-full"}`}>
      <motion.div
        className="absolute rounded-full"
        style={
          vertical
            ? {
                left: 0,
                right: 0,
                top: "-38%",
                height: "54%",
                background: `linear-gradient(180deg, transparent, ${CORAL}, ${AMBER}, ${ROSE}, ${SAGE}, transparent)`,
              }
            : {
                top: 0,
                bottom: 0,
                left: "-38%",
                width: "54%",
                background: `linear-gradient(90deg, transparent, ${CORAL}, ${AMBER}, ${ROSE}, ${SAGE}, transparent)`,
              }
        }
        animate={
          active
            ? vertical
              ? { y: ["0%", "255%"] }
              : { x: ["0%", "255%"] }
            : vertical
              ? { y: "255%" }
              : { x: "255%" }
        }
        transition={active ? { duration: 1.65, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      />
    </div>
  );
}

function SignalPath({ phase, reduced }: { phase: number; reduced: boolean }) {
  const live = phase >= PH.CONTEXT && phase <= PH.OUTCOME;
  return (
    <svg viewBox="0 0 1000 220" className="absolute inset-x-[4%] top-[170px] h-[220px] w-[92%]" aria-hidden>
      <defs>
        <linearGradient id="zapla-spectrum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={CORAL} />
          <stop offset="38%" stopColor={AMBER} />
          <stop offset="68%" stopColor={ROSE} />
          <stop offset="100%" stopColor={SAGE} />
        </linearGradient>
        <filter id="zapla-soft-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M40 114 C190 52 300 54 420 108 C520 154 595 156 690 112 C785 68 865 72 960 111"
        fill="none"
        stroke="rgba(244,240,232,.12)"
        strokeWidth="1.5"
      />

      <motion.path
        d="M40 114 C190 52 300 54 420 108 C520 154 595 156 690 112 C785 68 865 72 960 111"
        fill="none"
        stroke="url(#zapla-spectrum)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="42 180"
        filter="url(#zapla-soft-glow)"
        initial={false}
        animate={{
          opacity: live ? 0.95 : 0.18,
          strokeDashoffset: live && !reduced ? [0, -222] : -222,
        }}
        transition={live && !reduced ? { duration: 1.8, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
      />
    </svg>
  );
}

function ConversationCluster({ active }: { active: boolean }) {
  const bars = [9, 16, 25, 12, 21, 15, 27, 11, 18];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.34, x: active ? 0 : -8, scale: active ? 1 : 0.98 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="absolute left-[5%] top-[110px] w-[250px]"
    >
      <div className="mb-4"><RoleLabel label="AI Voice" tone={CORAL} /></div>
      <div className="flex items-center gap-3">
        <Phone size={18} color={CORAL} strokeWidth={2.1} />
        <div className="flex h-8 items-center gap-[3px]">
          {bars.map((height, index) => (
            <motion.span
              key={index}
              className="w-[2px] rounded-full"
              style={{ backgroundColor: index % 3 === 0 ? CORAL : "rgba(244,240,232,.48)" }}
              animate={active ? { height: [height * 0.55, height, height * 0.72] } : { height: height * 0.6 }}
              transition={active ? { duration: 0.9, repeat: Infinity, delay: index * 0.05, ease: "easeInOut" } : { duration: 0.3 }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-white">Call answered</div>
      <div className="mt-1 text-[12px] text-white/48">“We want to start in March.”</div>

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 5 }}
        transition={{ duration: 0.45, delay: active ? 0.18 : 0, ease: EASE }}
        className="mt-7 flex items-center gap-2.5"
      >
        <MessageSquareText size={15} color={AMBER} strokeWidth={2} />
        <span className="text-[12px] font-medium text-white/68">SMS conversation · 6 messages</span>
      </motion.div>
    </motion.div>
  );
}

function ContextCluster({ active }: { active: boolean }) {
  const signals = [
    { icon: MessageSquareText, text: "Previous SMS", tone: AMBER, x: -82, y: -58 },
    { icon: FileText, text: "$18,000 quote", tone: ROSE, x: 96, y: -42 },
    { icon: Clock3, text: "4 days quiet", tone: SAGE, x: 84, y: 60 },
    { icon: Phone, text: "Call history", tone: CORAL, x: -94, y: 52 },
  ];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.25, scale: active ? 1 : 0.96 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="absolute left-[40%] top-[146px] h-[210px] w-[220px] -translate-x-1/2"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/38" style={{ fontFamily: MONO }}>Context</div>
        <div className="mt-2 whitespace-nowrap text-[22px] font-semibold tracking-[-0.04em] text-white">Sarah · bathroom reno</div>
        <div className="mt-1 whitespace-nowrap text-[12px] text-white/52">Quote sent · no reply</div>
      </div>

      {signals.map((signal, index) => {
        const Icon = signal.icon;
        return (
          <motion.div
            key={signal.text}
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              x: active ? signal.x : 0,
              y: active ? signal.y : 0,
              scale: active ? 1 : 0.7,
            }}
            transition={{ duration: 0.55, delay: active ? index * 0.09 : 0, ease: EASE }}
            className="absolute left-1/2 top-1/2 flex items-center gap-2 whitespace-nowrap"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.07]">
              <Icon size={11} color={signal.tone} strokeWidth={2.1} />
            </span>
            <span className="text-[10px] font-medium text-white/62">{signal.text}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ThinkCluster({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.24, scale: active ? 1 : 0.97 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="absolute left-[63%] top-[126px] w-[250px] -translate-x-1/2 text-center"
    >
      <RoleLabel label="AI Agent" tone={ROSE} />
      <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/38" style={{ fontFamily: MONO }}>Best next action</div>
      <div className="mt-2 text-[28px] font-semibold tracking-[-0.05em] text-white">Follow up now</div>
      <div className="mx-auto mt-4 w-[190px]"><SpectrumSweep active={active && !reduced} /></div>
      <div className="mt-4 flex items-center justify-center gap-5 text-[10px] font-medium uppercase tracking-[0.1em]" style={{ fontFamily: MONO }}>
        <span className="text-white/20 line-through">Wait</span>
        <span className="text-white/20 line-through">Call</span>
        <span style={{ color: AMBER }}>Follow up</span>
      </div>
    </motion.div>
  );
}

function ActionCluster({ active, outcome }: { active: boolean; outcome: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0.25, x: active ? 0 : 8, scale: active ? 1 : 0.98 }}
      transition={{ duration: 0.48, ease: EASE }}
      className="absolute right-[5%] top-[112px] w-[225px]"
    >
      <RoleLabel label="AI Employee" tone={AMBER} />
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
        transition={{ duration: 0.45, delay: active ? 0.08 : 0, ease: EASE }}
        className="mt-5"
      >
        <div className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.02em] text-white">
          <Check size={15} color={AMBER} strokeWidth={2.4} /> Follow-up sent
        </div>
        <div className="mt-2 text-[12px] leading-[1.55] text-white/46">The next step happens inside the conversation, without waiting for someone to remember.</div>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: outcome ? 1 : 0, y: outcome ? 0 : 10 }}
        transition={{ duration: 0.5, delay: outcome ? 0.15 : 0, ease: EASE }}
        className="mt-7 space-y-3"
      >
        <div className="flex items-center justify-between border-b border-white/[0.09] pb-2.5 text-[11px] text-white/48">
          <span>Sarah replied</span><span className="font-semibold text-white">Thursday works</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-white/48">
          <span>Opportunity</span><span className="font-semibold" style={{ color: SAGE }}>Re-engaged</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DesktopSignalField({ phase, reduced }: { phase: number; reduced: boolean }) {
  const conversation = phase === PH.CONVERSATION;
  const context = phase === PH.CONTEXT;
  const think = phase === PH.THINK;
  const act = phase === PH.ACT || phase === PH.OUTCOME || phase === PH.HOLD;
  const outcome = phase === PH.OUTCOME || phase === PH.HOLD;

  return (
    <div className="relative hidden h-[500px] overflow-hidden md:block">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 46%, rgba(255,255,255,.045), transparent 33%), radial-gradient(circle at 73% 45%, rgba(233,125,98,.035), transparent 18%)",
        }}
      />

      <SignalPath phase={phase} reduced={reduced} />
      <ConversationCluster active={conversation} />
      <ContextCluster active={context} />
      <ThinkCluster active={think} reduced={reduced} />
      <ActionCluster active={act} outcome={outcome} />

      <div className="absolute inset-x-[7%] bottom-[34px] grid grid-cols-4 gap-8 border-t border-white/[0.07] pt-5">
        <StageLabel active={conversation} label="Conversation" tone={CORAL} />
        <StageLabel active={context} label="Context" tone={AMBER} />
        <StageLabel active={think} label="Think" tone={ROSE} />
        <StageLabel active={act} label="Act" tone={SAGE} />
      </div>
    </div>
  );
}

function MobileSignalField({ phase, reduced }: { phase: number; reduced: boolean }) {
  const steps = [
    {
      label: "Conversation",
      tone: CORAL,
      active: phase === PH.CONVERSATION,
      content: (
        <>
          <RoleLabel label="AI Voice" tone={CORAL} />
          <div className="mt-2 flex items-center gap-2 text-[16px] font-semibold text-white"><Phone size={15} color={CORAL} /> Call answered</div>
          <div className="mt-1 text-[11px] text-white/45">SMS conversation · 6 messages</div>
        </>
      ),
    },
    {
      label: "Context",
      tone: AMBER,
      active: phase === PH.CONTEXT,
      content: (
        <>
          <div className="text-[17px] font-semibold text-white">Sarah · bathroom reno</div>
          <div className="mt-1 text-[11px] text-white/46">$18k quote · 4 days quiet · previous conversation</div>
        </>
      ),
    },
    {
      label: "Think",
      tone: ROSE,
      active: phase === PH.THINK,
      content: (
        <>
          <RoleLabel label="AI Agent" tone={ROSE} />
          <div className="mt-2 text-[20px] font-semibold tracking-[-0.04em] text-white">Follow up now</div>
          <div className="mt-3 w-[150px]"><SpectrumSweep active={phase === PH.THINK && !reduced} /></div>
        </>
      ),
    },
    {
      label: "Act",
      tone: SAGE,
      active: phase >= PH.ACT && phase <= PH.HOLD,
      content: (
        <>
          <RoleLabel label="AI Employee" tone={AMBER} />
          <div className="mt-2 flex items-center gap-2 text-[16px] font-semibold text-white"><Check size={14} color={AMBER} /> Follow-up sent</div>
          <div className="mt-1 text-[11px]" style={{ color: SAGE }}>Sarah replied · Re-engaged</div>
        </>
      ),
    },
  ];

  return (
    <div className="relative mt-10 md:hidden">
      <div className="absolute bottom-5 left-[6px] top-5"><SpectrumSweep active={!reduced} vertical /></div>
      <div className="space-y-8 pl-7">
        {steps.map((step) => (
          <motion.div key={step.label} initial={false} animate={{ opacity: step.active ? 1 : 0.34 }} transition={{ duration: 0.35, ease: EASE }}>
            <StageLabel active={step.active} label={step.label} tone={step.tone} />
            <div className="mt-3">{step.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ZaplaAIConversationsV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.22, once: false });
  const reduced = Boolean(useReducedMotion());
  const phase = useStoryLoop(inView, reduced);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-[92px] sm:px-8 sm:py-[116px] lg:py-[138px]"
      style={{ backgroundColor: BG, fontFamily: DISPLAY }}
    >
      <div className="mx-auto max-w-[1240px]">
        <header className="mx-auto max-w-[820px] text-center">
          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/42" style={{ fontFamily: MONO }}>Zapla AI</div>
          <h2 className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[56px] lg:text-[72px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[660px] text-[15px] leading-[1.65] text-white/52 sm:text-[17px]">
            Calls and messages become context. Context becomes a decision. Zapla takes it from there.
          </p>
        </header>

        <div className="mt-8 sm:mt-12 lg:mt-14">
          <DesktopSignalField phase={phase} reduced={reduced} />
          <MobileSignalField phase={phase} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
