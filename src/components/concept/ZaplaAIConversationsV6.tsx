import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const PANEL = "#0C0D0F";
const PANEL_INNER = "#111215";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(reduced ? Math.min(initial, count - 1) : initial);

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [count, inView, ms, reduced]);

  return index;
}

function SignalBloom() {
  const petals = [
    { color: CORAL, x: -10, y: 0, delay: 0 },
    { color: AMBER, x: 0, y: -10, delay: 0.12 },
    { color: ROSE, x: 10, y: 0, delay: 0.24 },
    { color: SAGE, x: 0, y: 10, delay: 0.36 },
  ];

  return (
    <div className="relative h-11 w-11 shrink-0">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 h-6 w-6 rounded-full blur-[1px]"
          style={{ marginLeft: -12, marginTop: -12, backgroundColor: petal.color }}
          animate={{
            x: [petal.x * 0.82, petal.x, petal.x * 0.86],
            y: [petal.y * 0.82, petal.y, petal.y * 0.86],
            scale: [0.94, 1.06, 0.96],
            opacity: [0.62, 0.9, 0.68],
          }}
          transition={{ duration: 3.8, repeat: Infinity, delay: petal.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] bg-white shadow-[0_0_14px_rgba(255,255,255,.5)]" />
    </div>
  );
}

function DecisionSweep({ active }: { active: boolean }) {
  return (
    <div className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.07]">
      <motion.div
        className="absolute inset-y-0 left-[-42%] w-[40%] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${CORAL} 18%, ${AMBER} 46%, ${ROSE} 72%, ${SAGE} 90%, transparent 100%)`,
          boxShadow: `0 0 18px ${CORAL}55`,
        }}
        animate={active ? { x: ["0%", "360%"] } : { x: "360%" }}
        transition={active ? { duration: 1.85, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
      />
    </div>
  );
}

function RolePill({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70"
      style={{ fontFamily: MONO }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}

function FeatureFrame({
  eyebrow,
  title,
  copy,
  role,
  roleColor,
  className = "",
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  role?: string;
  roleColor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#0B0C0E] px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8 ${className}`}
      style={{ boxShadow: "0 24px 70px rgba(0,0,0,.22)" }}
    >
      <div className="relative z-10 flex items-start justify-between gap-5">
        <div className="max-w-[590px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/44" style={{ fontFamily: MONO }}>
            {eyebrow}
          </div>
          <h3 className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[34px]">{title}</h3>
          <p className="mt-3 max-w-[550px] text-[14px] leading-[1.6] text-white/55 sm:text-[16px]">{copy}</p>
        </div>
        {role ? <RolePill label={role} color={roleColor} /> : null}
      </div>
      <div className="relative z-10 mt-8">{children}</div>
    </article>
  );
}

function ConversationsStory({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const channel = useCycle(inView, reduced, 3, 2200, 0);
  const channels = [
    { label: "CALL", icon: Phone, color: CORAL, detail: "We want to start in March." },
    { label: "SMS", icon: MessageSquareText, color: AMBER, detail: "Can you send the quote again?" },
    { label: "EMAIL", icon: Mail, color: ROSE, detail: "Bathroom renovation enquiry" },
  ];
  const current = channels[channel];
  const CurrentIcon = current.icon;
  const bars = [15, 28, 21, 40, 25, 52, 31, 22, 44, 29, 36, 19, 30];

  return (
    <div className="relative min-h-[310px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#101114] p-5 sm:p-6">
      <div className="grid gap-6 sm:grid-cols-[148px_1fr] sm:items-center">
        <div className="relative h-[178px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/20 p-3">
          <div className="absolute inset-x-2 top-1/2 h-[50px] -translate-y-1/2 rounded-full border border-white/[0.06] bg-white/[0.025]" />
          <motion.div
            animate={{ y: 59 - channel * 52 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute left-3 right-3 top-0"
          >
            {channels.map((item, index) => {
              const Icon = item.icon;
              const selected = index === channel;
              return (
                <motion.div
                  key={item.label}
                  animate={{ opacity: selected ? 1 : 0.23, scale: selected ? 1 : 0.94 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="mb-2 flex h-11 items-center gap-2.5 rounded-full border px-3"
                  style={{
                    borderColor: selected ? `${item.color}4D` : "rgba(255,255,255,.06)",
                    backgroundColor: selected ? `${item.color}0F` : "rgba(255,255,255,.018)",
                  }}
                >
                  <Icon size={14} color={item.color} />
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-white" style={{ fontFamily: MONO }}>{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -7 }}
            transition={{ duration: 0.42, ease: EASE }}
            className="min-h-[178px]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.035]">
                <CurrentIcon size={17} color={current.color} strokeWidth={2.1} />
              </span>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/34" style={{ fontFamily: MONO }}>Incoming conversation</div>
                <div className="mt-1 text-[15px] font-semibold text-white/88">{current.label.toLowerCase()}</div>
              </div>
            </div>

            {channel === 0 ? (
              <div className="mt-6 flex h-[58px] items-center gap-[4px]">
                {bars.map((height, index) => (
                  <motion.span
                    key={index}
                    className="w-[3px] rounded-full"
                    style={{ backgroundColor: index % 4 === 0 ? CORAL : "rgba(255,255,255,.26)" }}
                    animate={inView && !reduced ? { height: [height * 0.45, height, height * 0.66] } : { height: height * 0.68 }}
                    transition={{ duration: 0.95, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.035, ease: "easeInOut" }}
                  />
                ))}
              </div>
            ) : channel === 1 ? (
              <div className="mt-6 space-y-2.5">
                <div className="ml-auto w-[78%] rounded-[18px_18px_5px_18px] bg-white/[0.06] px-3.5 py-2.5 text-[12px] text-white/66">Can you send the quote again?</div>
                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{ duration: 1.5, repeat: inView && !reduced ? Infinity : 0 }}
                  className="w-[42%] rounded-[18px_18px_18px_5px] border border-white/[0.07] px-3.5 py-2.5 text-[12px] text-white/44"
                >
                  typing…
                </motion.div>
              </div>
            ) : (
              <div className="mt-6 rounded-[16px] border border-white/[0.08] bg-white/[0.025] p-4">
                <div className="h-2 w-[42%] rounded-full bg-white/[0.12]" />
                <div className="mt-3 h-2 w-[78%] rounded-full bg-white/[0.07]" />
                <div className="mt-2 h-2 w-[62%] rounded-full bg-white/[0.05]" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`summary-${current.label}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-5 flex items-center justify-between gap-4 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-3"
        >
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/32" style={{ fontFamily: MONO }}>Understood</div>
            <div className="mt-1 text-[14px] font-medium text-white/86">“{current.detail}”</div>
          </div>
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: current.color }} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ContextHalo({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const step = useCycle(inView, reduced, 7, 980, 6);
  const signals = [
    { label: "6 messages", color: AMBER, startX: -230, startY: -118, dockX: -150, dockY: -96 },
    { label: "$18k quote", color: ROSE, startX: 210, startY: -128, dockX: 145, dockY: -92 },
    { label: "4 days quiet", color: SAGE, startX: 232, startY: 84, dockX: 154, dockY: 82 },
    { label: "March start", color: CORAL, startX: -220, startY: 96, dockX: -148, dockY: 88 },
    { label: "Quote sent", color: AMBER, startX: -24, startY: -172, dockX: -24, dockY: -128 },
    { label: "Thu 2:30", color: CORAL, startX: 6, startY: 160, dockX: 6, dockY: 126 },
  ];
  const ready = step >= 5;

  return (
    <div className="relative min-h-[410px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#101114]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
        animate={{ rotate: inView && !reduced ? 360 : 0 }}
        transition={{ duration: 28, repeat: inView && !reduced ? Infinity : 0, ease: "linear" }}
      >
        <span className="absolute -left-1 top-[42%] h-2 w-2 rounded-full bg-white/40" />
        <span className="absolute -right-1 bottom-[35%] h-2 w-2 rounded-full bg-white/20" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[154px] w-[154px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center"
        animate={{
          borderColor: ready ? `${SAGE}66` : "rgba(255,255,255,.12)",
          backgroundColor: ready ? `${SAGE}0A` : "rgba(255,255,255,.025)",
          boxShadow: ready ? `0 0 32px ${SAGE}14` : "0 0 0 rgba(0,0,0,0)",
          scale: ready ? 1.03 : 1,
        }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <UserRound size={20} color={ready ? SAGE : "rgba(255,255,255,.55)"} strokeWidth={2.1} />
        <div className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">Sarah</div>
        <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: ready ? SAGE : "rgba(255,255,255,.34)", fontFamily: MONO }}>
          {ready ? "Context ready" : "Building context"}
        </div>
      </motion.div>

      {signals.map((signal, index) => {
        const docked = index <= step;
        return (
          <motion.div
            key={signal.label}
            className="absolute left-1/2 top-1/2 rounded-full border px-3 py-2 text-[11px] font-semibold text-white/82"
            initial={false}
            animate={{
              x: docked ? signal.dockX : signal.startX,
              y: docked ? signal.dockY : signal.startY,
              opacity: docked ? 1 : 0.26,
              scale: docked ? 1 : 0.92,
              borderColor: docked ? `${signal.color}42` : "rgba(255,255,255,.07)",
              backgroundColor: docked ? `${signal.color}0D` : "rgba(255,255,255,.018)",
            }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ marginLeft: -42, marginTop: -18 }}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: signal.color }} />
            {signal.label}
          </motion.div>
        );
      })}

      <motion.div
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-[10px] font-medium text-white/54"
      >
        conversation + CRM + calendar
      </motion.div>
    </div>
  );
}

function DecisionStack({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const selected = useCycle(inView, reduced, 4, 1550, 2);
  const actions = ["Wait", "Call tomorrow", "Follow up now", "Offer Thu 2:30"];

  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#101114] p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {["positive call", "$18k quote", "4 days quiet"].map((signal, index) => (
          <span key={signal} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-white/52">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: [CORAL, ROSE, SAGE][index] }} />
            {signal}
          </span>
        ))}
      </div>

      <div className="mt-8 grid gap-7 sm:grid-cols-[1fr_180px] sm:items-center">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/34" style={{ fontFamily: MONO }}>Best next action</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={actions[selected]}
              initial={{ opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -7 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="mt-3 text-[42px] font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-[52px]"
            >
              {actions[selected]}.
            </motion.div>
          </AnimatePresence>
          <div className="mt-7 max-w-[340px]">
            <DecisionSweep active={inView && !reduced} />
          </div>
        </div>

        <div className="relative h-[194px] overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/20">
          <div className="absolute inset-x-2 top-1/2 h-[50px] -translate-y-1/2 rounded-full border border-white/[0.06] bg-white/[0.03]" />
          <motion.div
            animate={{ y: 73 - selected * 48 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute left-3 right-3 top-0"
          >
            {actions.map((action, index) => {
              const active = index === selected;
              return (
                <motion.div
                  key={action}
                  animate={{ opacity: active ? 1 : Math.abs(index - selected) === 1 ? 0.34 : 0.1, scale: active ? 1 : 0.94 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="mb-2 flex h-10 items-center rounded-full border px-3 text-[11px] font-semibold"
                  style={{
                    borderColor: active ? `${ROSE}5C` : "rgba(255,255,255,.06)",
                    backgroundColor: active ? `${ROSE}10` : "rgba(255,255,255,.018)",
                    color: active ? "white" : "rgba(255,255,255,.48)",
                  }}
                >
                  {action}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ActionChain({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const step = useCycle(inView, reduced, 4, 1450, 3);
  const rows = [
    { label: "Follow-up", detail: "Hi Sarah, any questions on the quote?", color: AMBER },
    { label: "Sarah replied", detail: "Thursday works", color: CORAL },
    { label: "CRM updated", detail: "Quote sent → Re-engaged", color: SAGE },
  ];
  const progress = step === 0 ? 8 : step === 1 ? 35 : step === 2 ? 67 : 100;

  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#101114] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-3">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/32" style={{ fontFamily: MONO }}>AI Employee</div>
          <div className="mt-1 text-[15px] font-semibold text-white/90">Follow up now</div>
        </div>
        <motion.span
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.6, repeat: inView && !reduced ? Infinity : 0 }}
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: SAGE, boxShadow: `0 0 14px ${SAGE}` }}
        />
      </div>

      <div className="relative mt-6 pl-12">
        <div className="absolute bottom-4 left-[17px] top-4 w-px bg-white/[0.08]" />
        <motion.div
          className="absolute left-[15px] top-4 w-[3px] rounded-full"
          style={{ backgroundColor: SAGE, boxShadow: `0 0 14px ${SAGE}66` }}
          animate={{ height: `${progress}%` }}
          transition={{ duration: 0.65, ease: EASE }}
        />
        <motion.span
          className="absolute left-[11px] h-[11px] w-[11px] rounded-full"
          style={{ backgroundColor: SAGE, boxShadow: `0 0 18px ${SAGE}` }}
          animate={{ top: `calc(${progress}% - 5px)` }}
          transition={{ duration: 0.65, ease: EASE }}
        />

        <div className="space-y-3">
          {rows.map((row, index) => {
            const done = step > index;
            return (
              <motion.div
                key={row.label}
                animate={{ opacity: done ? 1 : 0.30, x: done ? 0 : -3 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="rounded-[16px] border border-white/[0.07] bg-white/[0.022] px-4 py-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[13px] font-semibold text-white/88">{row.label}</div>
                    <div className="mt-1 text-[12px] text-white/43">{row.detail}</div>
                  </div>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: done ? `${row.color}45` : "rgba(255,255,255,.07)" }}>
                    {done ? <Check size={12} color={row.color} strokeWidth={2.5} /> : <Clock3 size={12} color="rgba(255,255,255,.28)" />}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 8 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-5 flex items-center justify-between rounded-full border px-4 py-2.5"
        style={{ borderColor: `${SAGE}3D`, backgroundColor: `${SAGE}0B` }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.13em]" style={{ color: SAGE, fontFamily: MONO }}>Opportunity moving</span>
        <span className="text-[11px] font-medium text-white/54">Re-engaged</span>
      </motion.div>
    </div>
  );
}

export default function ZaplaAIConversationsV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.08, once: false });
  const reduced = Boolean(useReducedMotion());

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-[106px] sm:px-8 sm:py-[128px] lg:py-[150px]"
      style={{ backgroundColor: BG, fontFamily: DISPLAY }}
    >
      <div className="pointer-events-none absolute left-1/2 top-[250px] h-[420px] w-[min(920px,92vw)] -translate-x-1/2 rounded-full bg-white/[0.018] blur-3xl" />

      <div className="relative mx-auto max-w-[1240px]">
        <header className="mx-auto max-w-[920px] text-center">
          <div className="flex items-center justify-center gap-3">
            <SignalBloom />
            <span className="text-[30px] font-semibold tracking-[-0.045em] text-white sm:text-[34px]">Zapla AI</span>
          </div>
          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/60 sm:text-[18px]">
            Conversations become context. Context becomes a decision. Zapla follows through.
          </p>
        </header>

        <div className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          <FeatureFrame
            eyebrow="Conversations"
            title="Every conversation stays connected."
            copy="Calls, SMS and email become usable customer context instead of isolated interactions."
            role="AI Voice"
            roleColor={CORAL}
            className="lg:col-span-5"
          >
            <ConversationsStory inView={inView} reduced={reduced} />
          </FeatureFrame>

          <FeatureFrame
            eyebrow="Context"
            title="Zapla sees the situation around the customer."
            copy="Conversation history, opportunities, activity and calendar signals assemble around the same person."
            roleColor={AMBER}
            className="lg:col-span-7"
          >
            <ContextHalo inView={inView} reduced={reduced} />
          </FeatureFrame>

          <FeatureFrame
            eyebrow="Think"
            title="Context becomes a decision."
            copy="The AI Agent weighs the signals and selects the most useful next step."
            role="AI Agent"
            roleColor={ROSE}
            className="lg:col-span-7"
          >
            <DecisionStack inView={inView} reduced={reduced} />
          </FeatureFrame>

          <FeatureFrame
            eyebrow="Act"
            title="Then the work actually happens."
            copy="Follow-up, customer response and CRM updates move forward without another hand-off."
            role="AI Employee"
            roleColor={SAGE}
            className="lg:col-span-5"
          >
            <ActionChain inView={inView} reduced={reduced} />
          </FeatureFrame>
        </div>
      </div>
    </section>
  );
}
