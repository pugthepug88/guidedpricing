import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { CalendarDays, Check, Clock3, FileText, MessageSquareText, Phone, UserRound } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const IVORY = "#F4F0E8";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";

const PHASES = {
  SOURCES: 0,
  GATHER: 1,
  CONTEXT: 2,
  THINK: 3,
  ACT: 4,
  HOLD: 5,
} as const;

const DURATIONS = [2200, 1350, 2350, 2100, 2200, 3200];

function useStoryLoop(inView: boolean, reduced: boolean) {
  const [phase, setPhase] = useState(reduced ? PHASES.HOLD : PHASES.SOURCES);

  useEffect(() => {
    if (reduced) {
      setPhase(PHASES.HOLD);
      return;
    }
    if (!inView) return;

    const timer = window.setTimeout(() => {
      setPhase((current) => (current >= PHASES.HOLD ? PHASES.SOURCES : current + 1));
    }, DURATIONS[phase]);

    return () => window.clearTimeout(timer);
  }, [phase, inView, reduced]);

  return phase;
}

function SignalSweep({ active }: { active: boolean }) {
  return (
    <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-white/[0.08]">
      <motion.div
        className="absolute inset-y-0 left-[-36%] w-[38%] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${CORAL} 20%, ${AMBER} 48%, ${ROSE} 72%, ${SAGE} 90%, transparent 100%)`,
          boxShadow: `0 0 20px ${CORAL}66`,
        }}
        animate={active ? { x: ["0%", "360%"] } : { x: "360%" }}
        transition={active ? { duration: 1.7, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
      />
    </div>
  );
}

const sourceItems = [
  {
    key: "call",
    label: "Call",
    detail: "“We want to start in March.”",
    icon: Phone,
    color: CORAL,
    position: "left-[7%] top-[17%]",
  },
  {
    key: "sms",
    label: "SMS",
    detail: "6 messages",
    icon: MessageSquareText,
    color: AMBER,
    position: "right-[8%] top-[15%]",
  },
  {
    key: "quote",
    label: "Quote",
    detail: "$18,000 · sent",
    icon: FileText,
    color: ROSE,
    position: "left-[12%] bottom-[17%]",
  },
  {
    key: "activity",
    label: "Last activity",
    detail: "4 days ago",
    icon: Clock3,
    color: SAGE,
    position: "right-[10%] bottom-[16%]",
  },
  {
    key: "pipeline",
    label: "Pipeline",
    detail: "Quote sent",
    icon: UserRound,
    color: AMBER,
    position: "left-1/2 top-[4%] -translate-x-1/2",
  },
];

function SourceFragments({ phase }: { phase: number }) {
  const gathering = phase === PHASES.GATHER;
  const visible = phase <= PHASES.GATHER;

  return (
    <AnimatePresence>
      {visible &&
        sourceItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              className={`absolute ${item.position} z-10 max-w-[260px]`}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={
                gathering
                  ? { opacity: 0, x: 0, y: 0, scale: 0.72, filter: "blur(3px)" }
                  : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: gathering ? 0.9 : 0.55, delay: gathering ? index * 0.055 : index * 0.09, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.055]">
                  <Icon size={17} color={item.color} strokeWidth={2.15} />
                </span>
                <div>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.13em] text-white/46" style={{ fontFamily: MONO }}>
                    {item.label}
                  </div>
                  <div className="mt-1 text-[17px] font-medium tracking-[-0.025em] text-white/88 sm:text-[19px]">
                    {item.detail}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
    </AnimatePresence>
  );
}

function GatherCore({ phase, reduced }: { phase: number; reduced: boolean }) {
  const gathering = phase === PHASES.GATHER;

  return (
    <AnimatePresence>
      {gathering && (
        <motion.div
          className="absolute left-1/2 top-1/2 w-[min(68vw,620px)] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <div className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42" style={{ fontFamily: MONO }}>
            Building context
          </div>
          <SignalSweep active={!reduced} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContextView({ phase, reduced }: { phase: number; reduced: boolean }) {
  const contextVisible = phase >= PHASES.CONTEXT;
  const thinking = phase >= PHASES.THINK;
  const acting = phase >= PHASES.ACT;

  if (!contextVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center px-6">
      <motion.div
        className="w-full max-w-[850px] text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          animate={{ opacity: thinking ? 0.34 : 1, y: thinking ? -14 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.19em] text-white/42" style={{ fontFamily: MONO }}>
            Context
          </div>
          <div className="mt-5 flex items-center justify-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06]">
              <UserRound size={18} color={CORAL} strokeWidth={2.1} />
            </span>
            <h3 className="text-[34px] font-semibold tracking-[-0.045em] text-white sm:text-[46px] lg:text-[54px]">
              Sarah Nguyen
            </h3>
          </div>

          <div className="mx-auto mt-7 flex max-w-[760px] flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[15px] text-white/68 sm:text-[18px]">
            <span>Bathroom renovation</span>
            <span className="text-white/18">•</span>
            <span>$18,000 quote sent</span>
            <span className="text-white/18">•</span>
            <span>Interested in March</span>
            <span className="text-white/18">•</span>
            <span>Positive conversation</span>
            <span className="text-white/18">•</span>
            <motion.span
              animate={{ color: thinking ? SAGE : "rgba(255,255,255,.68)", opacity: thinking ? 1 : 0.82 }}
              transition={{ duration: 0.4 }}
            >
              Quiet for 4 days
            </motion.span>
          </div>
        </motion.div>

        <AnimatePresence>
          {thinking && (
            <motion.div
              className="mx-auto mt-10 max-w-[620px]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="mx-auto mb-7 w-[min(72vw,520px)]">
                <SignalSweep active={!reduced && phase === PHASES.THINK} />
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.19em]" style={{ color: ROSE, fontFamily: MONO }}>
                AI Agent · Best next action
              </div>
              <motion.div
                className="mt-3 text-[46px] font-semibold leading-none tracking-[-0.055em] text-white sm:text-[62px] lg:text-[72px]"
                animate={{ opacity: acting ? 0.28 : 1, scale: acting ? 0.97 : 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                Follow up now.
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {acting && (
            <motion.div
              className="mx-auto mt-9 max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
                <div className="flex items-center gap-2 text-[15px] font-semibold text-white/92 sm:text-[17px]">
                  <Check size={17} color={AMBER} strokeWidth={2.5} />
                  <span>AI Employee · Follow-up sent</span>
                </div>
                <div className="hidden h-5 w-px bg-white/12 sm:block" />
                <div className="flex items-center gap-2 text-[15px] font-semibold sm:text-[17px]" style={{ color: SAGE }}>
                  <CalendarDays size={17} strokeWidth={2.2} />
                  <span>Sarah replied · Thursday works</span>
                </div>
              </div>
              <motion.div
                className="mt-6 text-[13px] font-semibold uppercase tracking-[0.15em] sm:text-[14px]"
                style={{ color: SAGE, fontFamily: MONO }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                Opportunity · Re-engaged
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MobileStory({ phase, reduced }: { phase: number; reduced: boolean }) {
  const sourceVisible = phase <= PHASES.GATHER;
  const contextVisible = phase >= PHASES.CONTEXT;
  const thinking = phase >= PHASES.THINK;
  const acting = phase >= PHASES.ACT;

  return (
    <div className="relative min-h-[520px] md:hidden">
      <AnimatePresence mode="wait">
        {sourceVisible ? (
          <motion.div
            key="sources"
            className="absolute inset-0 flex flex-col justify-center gap-6 px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sourceItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.055]">
                    <Icon size={15} color={item.color} />
                  </span>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/42" style={{ fontFamily: MONO }}>{item.label}</div>
                    <div className="mt-0.5 text-[16px] font-medium text-white/88">{item.detail}</div>
                  </div>
                </div>
              );
            })}
            <div className="mt-2"><SignalSweep active={!reduced && phase === PHASES.GATHER} /></div>
          </motion.div>
        ) : contextVisible ? (
          <motion.div
            key="context"
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42" style={{ fontFamily: MONO }}>Context</div>
            <div className="mt-4 text-[34px] font-semibold tracking-[-0.05em] text-white">Sarah Nguyen</div>
            <div className="mt-4 max-w-[330px] text-[15px] leading-7 text-white/62">
              Bathroom renovation · $18,000 quote · interested in March · quiet for 4 days
            </div>
            {thinking && (
              <motion.div className="mt-9" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mx-auto mb-5 w-[250px]"><SignalSweep active={!reduced && phase === PHASES.THINK} /></div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: ROSE, fontFamily: MONO }}>AI Agent · Best next action</div>
                <div className="mt-3 text-[42px] font-semibold leading-none tracking-[-0.05em] text-white">Follow up now.</div>
              </motion.div>
            )}
            {acting && (
              <motion.div className="mt-8 space-y-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-center gap-2 text-[15px] font-semibold text-white/90"><Check size={16} color={AMBER} /> Follow-up sent</div>
                <div className="text-[14px] font-semibold" style={{ color: SAGE }}>Sarah replied · Thursday works</div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: SAGE, fontFamily: MONO }}>Opportunity · Re-engaged</div>
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ZaplaAIConversationsV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.16, once: false });
  const reduced = Boolean(useReducedMotion());
  const phase = useStoryLoop(inView, reduced);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-[96px] sm:px-8 sm:py-[118px] lg:py-[132px]"
      style={{ backgroundColor: BG, fontFamily: DISPLAY }}
    >
      <div className="mx-auto max-w-[1260px]">
        <header className="mx-auto max-w-[900px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42" style={{ fontFamily: MONO }}>
            Zapla AI
          </div>
          <h2 className="mt-5 text-[40px] font-semibold leading-[1.01] tracking-[-0.055em] text-white sm:text-[54px] lg:text-[66px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[690px] text-[15px] leading-[1.65] text-white/54 sm:text-[17px]">
            Calls, messages and CRM activity become context. Zapla understands what happened, decides what should happen next, then follows through.
          </p>
        </header>

        <div className="relative mt-10 hidden min-h-[570px] md:block lg:mt-12">
          <div className="absolute inset-x-[5%] top-[48%] h-px bg-white/[0.035]" />
          <SourceFragments phase={phase} />
          <GatherCore phase={phase} reduced={reduced} />
          <ContextView phase={phase} reduced={reduced} />
        </div>

        <MobileStory phase={phase} reduced={reduced} />
      </div>
    </section>
  );
}
