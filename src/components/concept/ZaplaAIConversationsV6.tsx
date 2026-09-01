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
  Sparkles,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const SURFACE = "#0C0D0F";
const SURFACE_2 = "#121316";
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

function SignalBloom({ size = 58 }: { size?: number }) {
  const lobes = [
    { color: CORAL, x: -0.23, y: 0, delay: 0 },
    { color: AMBER, x: 0, y: -0.23, delay: 0.12 },
    { color: ROSE, x: 0.23, y: 0, delay: 0.24 },
    { color: SAGE, x: 0, y: 0.23, delay: 0.36 },
  ];

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {lobes.map((lobe, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-full blur-[1px]"
          style={{
            width: size * 0.54,
            height: size * 0.54,
            marginLeft: -(size * 0.27),
            marginTop: -(size * 0.27),
            backgroundColor: lobe.color,
          }}
          animate={{
            x: [size * lobe.x * 0.82, size * lobe.x, size * lobe.x * 0.86],
            y: [size * lobe.y * 0.82, size * lobe.y, size * lobe.y * 0.86],
            scale: [0.94, 1.08, 0.96],
            opacity: [0.7, 1, 0.76],
          }}
          transition={{ duration: 3.4, repeat: Infinity, delay: lobe.delay, ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] bg-white"
        style={{
          width: size * 0.2,
          height: size * 0.2,
          boxShadow: "0 0 20px rgba(255,255,255,.65)",
        }}
      />
    </div>
  );
}

function SpectrumSweep({ active = true, className = "" }: { active?: boolean; className?: string }) {
  return (
    <div className={`relative h-[4px] overflow-hidden rounded-full bg-white/[0.07] ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-[-40%] w-[42%] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${CORAL} 18%, ${AMBER} 44%, ${ROSE} 70%, ${SAGE} 88%, transparent 100%)`,
          boxShadow: `0 0 22px ${CORAL}77`,
        }}
        animate={active ? { x: ["0%", "345%"] } : { x: "345%" }}
        transition={active ? { duration: 1.8, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
      />
    </div>
  );
}

function RolePill({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/76"
      style={{ fontFamily: MONO }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
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
      className={`relative overflow-hidden rounded-[28px] border border-white/[0.11] bg-[#0B0C0E] px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8 ${className}`}
      style={{ boxShadow: "0 28px 90px rgba(0,0,0,.24)" }}
    >
      <div
        className="pointer-events-none absolute -bottom-24 left-[12%] h-44 w-[76%] rounded-full blur-3xl"
        style={{ backgroundColor: roleColor, opacity: 0.075 }}
      />
      <div className="relative z-10 flex items-start justify-between gap-5">
        <div className="max-w-[580px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45" style={{ fontFamily: MONO }}>
            {eyebrow}
          </div>
          <h3 className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[34px]">{title}</h3>
          <p className="mt-3 max-w-[540px] text-[14px] leading-[1.6] text-white/55 sm:text-[16px]">{copy}</p>
        </div>
        {role ? <RolePill label={role} color={roleColor} /> : null}
      </div>
      <div className="relative z-10 mt-8">{children}</div>
    </article>
  );
}

function ConversationsStory({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const channel = useCycle(inView, reduced, 3, 1750, 0);
  const channels = [
    { label: "CALL", icon: Phone, color: CORAL, detail: "We want to start in March." },
    { label: "SMS", icon: MessageSquareText, color: AMBER, detail: "Can you send the quote again?" },
    { label: "EMAIL", icon: Mail, color: ROSE, detail: "Bathroom renovation enquiry" },
  ];
  const active = channels[channel];
  const ActiveIcon = active.icon;
  const bars = [15, 27, 20, 42, 26, 54, 32, 23, 46, 29, 38, 19, 31, 24];

  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#111215] p-5 sm:p-6">
      <div
        className="pointer-events-none absolute -left-12 top-4 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: active.color, opacity: 0.11 }}
      />

      <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
        <div className="relative h-[174px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 p-3">
          <div className="absolute inset-x-0 top-1/2 h-[52px] -translate-y-1/2 border-y border-white/[0.06] bg-white/[0.025]" />
          <motion.div
            animate={{ y: 58 - channel * 52 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute left-3 right-3 top-0"
          >
            {channels.map((item, index) => {
              const Icon = item.icon;
              const selected = index === channel;
              return (
                <motion.div
                  key={item.label}
                  animate={{ opacity: selected ? 1 : 0.26, scale: selected ? 1 : 0.94 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mb-2 flex h-11 items-center gap-2.5 rounded-full border px-3"
                  style={{
                    borderColor: selected ? `${item.color}55` : "rgba(255,255,255,.07)",
                    backgroundColor: selected ? `${item.color}12` : "rgba(255,255,255,.025)",
                  }}
                >
                  <Icon size={14} color={item.color} />
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-white" style={{ fontFamily: MONO }}>{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex min-h-[174px] flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <ActiveIcon size={17} color={active.color} strokeWidth={2.1} />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/35" style={{ fontFamily: MONO }}>Incoming conversation</div>
              <div className="mt-1 text-[15px] font-semibold text-white/88">{active.label.toLowerCase()}</div>
            </div>
          </div>

          <div className="mt-6 flex h-[54px] items-center gap-[4px]">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: index % 4 === 0 ? active.color : "rgba(255,255,255,.28)" }}
                animate={inView && !reduced ? { height: [height * 0.45, height, height * 0.66] } : { height: height * 0.68 }}
                transition={{ duration: 0.95, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.035, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -7 }}
          transition={{ duration: 0.38, ease: EASE }}
          className="mt-5 rounded-2xl border border-white/[0.09] bg-white/[0.035] px-4 py-3.5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/36" style={{ fontFamily: MONO }}>Conversation understood</div>
              <div className="mt-1.5 text-[15px] font-medium text-white/90">“{active.detail}”</div>
            </div>
            <Sparkles size={16} color={active.color} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ContextHalo({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const step = useCycle(inView, reduced, 6, 920, 5);
  const items = [
    { label: "6 messages", color: AMBER, x: "7%", y: "18%" },
    { label: "$18k quote", color: ROSE, x: "66%", y: "15%" },
    { label: "4 days quiet", color: SAGE, x: "72%", y: "64%" },
    { label: "March start", color: CORAL, x: "8%", y: "69%" },
    { label: "Quote sent", color: AMBER, x: "37%", y: "5%" },
    { label: "Thu 2:30", color: CORAL, x: "39%", y: "78%" },
  ];

  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#101114]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${AMBER}28 0%, ${ROSE}18 34%, transparent 70%)` }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[208px] w-[208px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
        animate={{ rotate: inView && !reduced ? 360 : 0 }}
        transition={{ duration: 24, repeat: inView && !reduced ? Infinity : 0, ease: "linear" }}
      >
        <div className="absolute -left-1 -top-1 h-2 w-2 rounded-full" style={{ backgroundColor: CORAL, boxShadow: `0 0 16px ${CORAL}` }} />
        <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE, boxShadow: `0 0 16px ${SAGE}` }} />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[148px] w-[148px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center"
        animate={{
          borderColor: step >= 4 ? `${AMBER}88` : "rgba(255,255,255,.12)",
          boxShadow: step >= 4 ? `0 0 42px ${AMBER}18, inset 0 0 30px ${ROSE}0D` : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ background: "radial-gradient(circle at 45% 38%, rgba(255,255,255,.08), rgba(255,255,255,.025) 58%, transparent 100%)" }}
      >
        <UserRound size={20} color={CORAL} strokeWidth={2.1} />
        <div className="mt-2 text-[19px] font-semibold tracking-[-0.035em] text-white">Sarah</div>
        <motion.div
          animate={{ color: step >= 4 ? SAGE : "rgba(255,255,255,.38)" }}
          className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: MONO }}
        >
          {step >= 4 ? "Context ready" : "Building context"}
        </motion.div>
      </motion.div>

      {items.map((item, index) => {
        const absorbed = index <= step;
        return (
          <motion.div
            key={item.label}
            className="absolute rounded-full border px-3 py-2 text-[11px] font-semibold text-white/82"
            style={{ left: item.x, top: item.y }}
            animate={{
              opacity: absorbed ? 1 : 0.28,
              scale: absorbed ? 1 : 0.92,
              borderColor: absorbed ? `${item.color}48` : "rgba(255,255,255,.08)",
              backgroundColor: absorbed ? `${item.color}12` : "rgba(255,255,255,.025)",
              boxShadow: absorbed ? `0 0 24px ${item.color}14` : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </motion.div>
        );
      })}

      <div className="absolute bottom-5 left-[15%] right-[15%]">
        <SpectrumSweep active={inView && !reduced} />
      </div>
    </div>
  );
}

function DecisionStack({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const selected = useCycle(inView, reduced, 4, 1450, 2);
  const actions = ["Wait", "Call tomorrow", "Follow up now", "Offer Thu 2:30"];

  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#101114] p-5 sm:p-6">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: ROSE, opacity: 0.09 }}
      />

      <div className="flex flex-wrap gap-2">
        {["positive call", "$18k quote", "4 days quiet"].map((signal, index) => (
          <motion.span
            key={signal}
            animate={{ y: inView && !reduced ? [0, -2, 0] : 0 }}
            transition={{ duration: 2.2, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.22, ease: "easeInOut" }}
            className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-white/54"
          >
            {signal}
          </motion.span>
        ))}
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-[1fr_170px] sm:items-center">
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/34" style={{ fontFamily: MONO }}>Best next action</div>
          <motion.div
            key={actions[selected]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-3 text-[40px] font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-[50px]"
          >
            {actions[selected]}.
          </motion.div>
          <div className="mt-7 max-w-[330px]"><SpectrumSweep active={inView && !reduced} /></div>
        </div>

        <div className="relative h-[186px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
          <div className="absolute inset-x-0 top-1/2 h-[50px] -translate-y-1/2 border-y border-white/[0.06] bg-white/[0.03]" />
          <motion.div
            animate={{ y: 70 - selected * 48 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute left-3 right-3 top-0"
          >
            {actions.map((action, index) => {
              const active = index === selected;
              return (
                <motion.div
                  key={action}
                  animate={{ opacity: active ? 1 : Math.abs(index - selected) === 1 ? 0.38 : 0.13, scale: active ? 1 : 0.94 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mb-2 flex h-10 items-center rounded-full border px-3 text-[11px] font-semibold"
                  style={{
                    borderColor: active ? `${ROSE}66` : "rgba(255,255,255,.07)",
                    backgroundColor: active ? `${ROSE}14` : "rgba(255,255,255,.02)",
                    color: active ? "white" : "rgba(255,255,255,.56)",
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
  const step = useCycle(inView, reduced, 4, 1350, 3);
  const rows = [
    { label: "Follow-up", detail: "Hi Sarah, any questions on the quote?", color: AMBER },
    { label: "Sarah replied", detail: "Thursday works", color: CORAL },
    { label: "CRM updated", detail: "Quote sent → Re-engaged", color: SAGE },
  ];

  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#101114] p-5 sm:p-6">
      <div
        className="pointer-events-none absolute -bottom-10 right-0 h-56 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: SAGE, opacity: step >= 3 ? 0.12 : 0.035 }}
      />

      <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/34" style={{ fontFamily: MONO }}>AI Employee</div>
            <div className="mt-1 text-[16px] font-semibold text-white/90">Follow up now</div>
          </div>
          <motion.div
            animate={{ rotate: inView && !reduced ? 360 : 0 }}
            transition={{ duration: 5, repeat: inView && !reduced ? Infinity : 0, ease: "linear" }}
          >
            <SignalBloom size={34} />
          </motion.div>
        </div>
        <div className="mt-4"><SpectrumSweep active={step === 0 || (inView && !reduced)} /></div>
      </div>

      <div className="relative mt-5 space-y-3">
        <div className="absolute bottom-4 left-[18px] top-4 w-px bg-white/[0.08]" />
        {rows.map((row, index) => {
          const done = step > index;
          return (
            <motion.div
              key={row.label}
              animate={{ opacity: done ? 1 : 0.34, x: done ? 0 : -4 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3"
            >
              <span
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[#16171A]"
                style={{ borderColor: done ? `${row.color}55` : "rgba(255,255,255,.08)" }}
              >
                {done ? <Check size={14} color={row.color} strokeWidth={2.5} /> : <Clock3 size={13} color="rgba(255,255,255,.35)" />}
              </span>
              <div>
                <div className="text-[13px] font-semibold text-white/88">{row.label}</div>
                <div className="mt-1 text-[12px] text-white/44">{row.detail}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 8 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="mt-4 flex items-center justify-between rounded-full border px-4 py-2.5"
        style={{ borderColor: `${SAGE}44`, backgroundColor: `${SAGE}10` }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.13em]" style={{ color: SAGE, fontFamily: MONO }}>Opportunity moving</span>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SAGE, boxShadow: `0 0 14px ${SAGE}` }} />
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
      <div
        className="pointer-events-none absolute left-1/2 top-[250px] h-[520px] w-[min(1100px,96vw)] -translate-x-1/2 blur-3xl"
        style={{
          background: `radial-gradient(circle at 18% 46%, ${CORAL}1A 0%, transparent 31%), radial-gradient(circle at 49% 42%, ${ROSE}24 0%, transparent 34%), radial-gradient(circle at 78% 46%, ${AMBER}1A 0%, transparent 32%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <header className="mx-auto max-w-[920px] text-center">
          <div className="flex items-center justify-center gap-3">
            <SignalBloom size={54} />
            <span className="text-[31px] font-semibold tracking-[-0.045em] text-white sm:text-[35px]">Zapla AI</span>
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

      <div
        className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[340px] w-[min(1100px,96vw)] -translate-x-1/2 rounded-[50%] blur-3xl"
        style={{ background: `linear-gradient(90deg, ${CORAL}18, ${AMBER}18, ${ROSE}22, ${SAGE}16)` }}
      />
    </section>
  );
}
