import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const MONO = '\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";

function usePanelLoop(inView: boolean, reduced: boolean) {
  const [active, setActive] = useState(reduced ? 2 : 0);

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % 4), 2600);
    return () => window.clearInterval(timer);
  }, [inView, reduced]);

  return active;
}

function SignalBloom() {
  const lobes = [
    { color: CORAL, x: -13, y: 0, delay: 0 },
    { color: AMBER, x: 0, y: -13, delay: 0.15 },
    { color: ROSE, x: 13, y: 0, delay: 0.3 },
    { color: SAGE, x: 0, y: 13, delay: 0.45 },
  ];

  return (
    <div className="relative h-14 w-14">
      {lobes.map((lobe) => (
        <motion.span
          key={`${lobe.x}-${lobe.y}`}
          className="absolute left-1/2 top-1/2 h-8 w-8 rounded-full blur-[1px]"
          style={{ backgroundColor: lobe.color, marginLeft: -16, marginTop: -16 }}
          animate={{
            x: [lobe.x * 0.78, lobe.x, lobe.x * 0.84],
            y: [lobe.y * 0.78, lobe.y, lobe.y * 0.84],
            scale: [0.92, 1.08, 0.96],
            opacity: [0.72, 0.98, 0.78],
          }}
          transition={{ duration: 3.4, repeat: Infinity, delay: lobe.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-[13px] w-[13px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[3px] bg-white shadow-[0_0_18px_rgba(255,255,255,.6)]" />
    </div>
  );
}

function SignalSweep({ active }: { active: boolean }) {
  return (
    <div className="relative h-[4px] w-full overflow-hidden rounded-full bg-white/[0.07]">
      <motion.div
        className="absolute inset-y-0 left-[-38%] w-[40%] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${CORAL} 18%, ${AMBER} 44%, ${ROSE} 70%, ${SAGE} 88%, transparent 100%)`,
          boxShadow: `0 0 20px ${CORAL}66`,
        }}
        animate={active ? { x: ["0%", "355%"] } : { x: "355%" }}
        transition={active ? { duration: 1.7, repeat: Infinity, ease: "linear" } : { duration: 0.2 }}
      />
    </div>
  );
}

function Panel({
  eyebrow,
  title,
  copy,
  role,
  roleColor,
  active,
  children,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  role?: string;
  roleColor: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={false}
      animate={{
        borderColor: active ? `${roleColor}55` : "rgba(255,255,255,.11)",
        boxShadow: active ? `0 22px 80px ${roleColor}12` : "0 16px 60px rgba(0,0,0,.16)",
      }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative min-h-[430px] overflow-hidden border bg-[#0D0E10] px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-8"
    >
      <div className="relative z-10 flex items-start justify-between gap-5">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.17em] text-white/55" style={{ fontFamily: MONO }}>
            {eyebrow}
          </div>
          <h3 className="mt-3 text-[27px] font-semibold tracking-[-0.04em] text-white sm:text-[31px]">{title}</h3>
          <p className="mt-3 max-w-[460px] text-[15px] leading-[1.55] text-white/60 sm:text-[16px]">{copy}</p>
        </div>
        {role ? (
          <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/72" style={{ fontFamily: MONO }}>
            <span className="mr-1.5 inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: roleColor }} />
            {role}
          </div>
        ) : null}
      </div>

      <div className="relative z-10 mt-8">{children}</div>

      <motion.div
        className="pointer-events-none absolute inset-x-[14%] bottom-[-36px] h-[110px] rounded-full blur-3xl"
        style={{ backgroundColor: roleColor }}
        animate={{ opacity: active ? 0.11 : 0.025, scale: active ? 1.05 : 0.92 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </motion.article>
  );
}

function ConversationsVisual({ active, reduced }: { active: boolean; reduced: boolean }) {
  const bars = [16, 30, 21, 42, 26, 52, 33, 22, 44, 27, 36, 18];

  return (
    <div className="relative min-h-[220px]">
      <div className="flex items-center gap-3">
        {[Phone, MessageSquareText, Mail].map((Icon, index) => (
          <motion.div
            key={index}
            animate={{ y: active && !reduced ? [0, -3, 0] : 0 }}
            transition={{ duration: 1.4, repeat: active && !reduced ? Infinity : 0, delay: index * 0.18, ease: "easeInOut" }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
          >
            <Icon size={17} color={[CORAL, AMBER, ROSE][index]} strokeWidth={2.1} />
          </motion.div>
        ))}
        <div className="ml-2 text-[12px] font-medium text-white/50">Call · SMS · Email</div>
      </div>

      <div className="mt-8 flex h-[58px] items-center gap-[5px]">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            className="w-[4px] rounded-full"
            style={{ backgroundColor: index % 4 === 0 ? CORAL : "rgba(255,255,255,.34)" }}
            animate={active && !reduced ? { height: [height * 0.52, height, height * 0.72] } : { height: height * 0.72 }}
            transition={{ duration: 1.05, repeat: active && !reduced ? Infinity : 0, delay: index * 0.035, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        animate={{ opacity: active ? 1 : 0.68, y: active ? 0 : 3 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mt-6 max-w-[440px] rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3"
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/38" style={{ fontFamily: MONO }}>Call summary</div>
        <div className="mt-1.5 text-[15px] font-medium text-white/88">“We want to start in March.”</div>
      </motion.div>
    </div>
  );
}

function ContextVisual({ active }: { active: boolean }) {
  const rows = [
    [MessageSquareText, "Conversation", "6 messages", AMBER],
    [FileText, "Opportunity", "$18,000 quote sent", ROSE],
    [Clock3, "Last activity", "4 days ago", SAGE],
    [CalendarDays, "Calendar", "Thursday 2:30 available", CORAL],
  ] as const;

  return (
    <div className="relative min-h-[230px]">
      <div className="rounded-2xl border border-white/10 bg-[#121316] p-4 sm:p-5">
        <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.055]">
            <UserRound size={17} color={CORAL} strokeWidth={2.1} />
          </span>
          <div>
            <div className="text-[18px] font-semibold tracking-[-0.03em] text-white">Sarah Nguyen</div>
            <div className="text-[12px] text-white/45">Bathroom renovation</div>
          </div>
          <motion.div
            className="ml-auto rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em]"
            style={{ color: SAGE, backgroundColor: `${SAGE}14`, fontFamily: MONO }}
            animate={{ opacity: active ? [0.55, 1, 0.55] : 0.55 }}
            transition={{ duration: 1.8, repeat: active ? Infinity : 0 }}
          >
            Context ready
          </motion.div>
        </div>

        <div className="mt-3 grid gap-1.5 sm:grid-cols-2 sm:gap-x-5">
          {rows.map(([Icon, label, value, color], index) => (
            <motion.div
              key={label}
              animate={{ opacity: active ? 1 : 0.72, x: active ? 0 : -2 }}
              transition={{ duration: 0.4, delay: active ? index * 0.07 : 0, ease: EASE }}
              className="flex items-center gap-2.5 py-2.5"
            >
              <Icon size={14} color={color} strokeWidth={2.1} />
              <div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-white/35" style={{ fontFamily: MONO }}>{label}</div>
                <div className="mt-0.5 text-[13px] font-medium text-white/78">{value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-5"><SignalSweep active={active} /></div>
    </div>
  );
}

function ThinkVisual({ active }: { active: boolean }) {
  return (
    <div className="relative min-h-[230px] overflow-hidden rounded-2xl border border-white/10 bg-[#121316] p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {["Positive call", "$18k quote", "4 days quiet"].map((item, index) => (
          <motion.span
            key={item}
            animate={{ opacity: active ? 1 : 0.5, y: active ? 0 : 3 }}
            transition={{ duration: 0.4, delay: active ? index * 0.09 : 0, ease: EASE }}
            className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] font-medium text-white/62"
          >
            {item}
          </motion.span>
        ))}
      </div>

      <div className="mt-9 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/36" style={{ fontFamily: MONO }}>Best next action</div>
      <motion.div
        animate={{ scale: active ? 1 : 0.985, opacity: active ? 1 : 0.78 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="mt-2 text-[40px] font-semibold leading-none tracking-[-0.055em] text-white sm:text-[48px]"
      >
        Follow up now.
      </motion.div>

      <div className="mt-7"><SignalSweep active={active} /></div>
      <div className="mt-5 flex items-center gap-2 text-[12px] font-medium" style={{ color: AMBER }}>
        Decision made <ArrowRight size={13} strokeWidth={2.2} />
      </div>
    </div>
  );
}

function ActVisual({ active }: { active: boolean }) {
  const steps = [
    ["Follow-up sent", "Hi Sarah, any questions on the quote?", AMBER],
    ["Sarah replied", "Thursday works", CORAL],
    ["CRM updated", "Opportunity → Re-engaged", SAGE],
  ] as const;

  return (
    <div className="relative min-h-[230px] rounded-2xl border border-white/10 bg-[#121316] p-5 sm:p-6">
      <div className="absolute bottom-7 left-[32px] top-7 w-px bg-white/[0.09]" />
      <div className="relative space-y-5">
        {steps.map(([label, detail, color], index) => (
          <motion.div
            key={label}
            animate={{ opacity: active ? 1 : 0.66, x: active ? 0 : -3 }}
            transition={{ duration: 0.45, delay: active ? index * 0.12 : 0, ease: EASE }}
            className="flex items-start gap-4"
          >
            <span className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#17181B]">
              <Check size={13} color={color} strokeWidth={2.5} />
            </span>
            <div>
              <div className="text-[14px] font-semibold text-white/90">{label}</div>
              <div className="mt-1 text-[13px] text-white/48">{detail}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ opacity: active ? 1 : 0.55 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 rounded-xl border px-4 py-3"
        style={{ borderColor: `${SAGE}35`, backgroundColor: `${SAGE}0D` }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: SAGE, fontFamily: MONO }}>Outcome</div>
        <div className="mt-1 text-[16px] font-semibold text-white">The opportunity keeps moving.</div>
      </motion.div>
    </div>
  );
}

export default function ZaplaAIConversationsV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.1, once: false });
  const reduced = Boolean(useReducedMotion());
  const activePanel = usePanelLoop(inView, reduced);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-[104px] sm:px-8 sm:py-[126px] lg:py-[146px]"
      style={{ backgroundColor: BG, fontFamily: DISPLAY }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[300px] h-[420px] w-[min(92vw,980px)] -translate-x-1/2 blur-3xl"
        style={{
          background:
            `radial-gradient(circle at 23% 48%, ${CORAL}24 0%, transparent 38%), radial-gradient(circle at 50% 45%, ${ROSE}2A 0%, transparent 35%), radial-gradient(circle at 76% 48%, ${AMBER}22 0%, transparent 38%)`,
          opacity: 0.68,
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <header className="mx-auto max-w-[900px] text-center">
          <div className="flex items-center justify-center gap-3">
            <SignalBloom />
            <div className="text-[30px] font-semibold tracking-[-0.045em] text-white sm:text-[34px]">Zapla AI</div>
          </div>

          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/62 sm:text-[18px]">
            Zapla connects customer conversations with the CRM context around them, then uses that context to decide and carry out the next step.
          </p>
        </header>

        <div className="relative mt-16 grid overflow-hidden border-l border-t border-white/[0.10] md:grid-cols-2 lg:mt-20">
          <Panel
            eyebrow="Conversations"
            title="It starts with what the customer said."
            copy="Calls, messages and email stay connected to the customer instead of living as isolated interactions."
            role="AI Voice"
            roleColor={CORAL}
            active={activePanel === 0}
          >
            <ConversationsVisual active={activePanel === 0} reduced={reduced} />
          </Panel>

          <Panel
            eyebrow="Context"
            title="Zapla sees the situation around the conversation."
            copy="Recent messages, contact details, opportunity data, activity and calendar context can inform what happens next."
            roleColor={AMBER}
            active={activePanel === 1}
          >
            <ContextVisual active={activePanel === 1} />
          </Panel>

          <Panel
            eyebrow="Think"
            title="Context becomes a decision."
            copy="The AI Agent uses the available context to work out the most useful next action instead of treating every message the same."
            role="AI Agent"
            roleColor={ROSE}
            active={activePanel === 2}
          >
            <ThinkVisual active={activePanel === 2} />
          </Panel>

          <Panel
            eyebrow="Act"
            title="Then the work actually gets done."
            copy="Zapla can follow up, update the CRM and keep the opportunity moving without another hand-off."
            role="AI Employee"
            roleColor={SAGE}
            active={activePanel === 3}
          >
            <ActVisual active={activePanel === 3} />
          </Panel>
        </div>
      </div>
    </section>
  );
}
