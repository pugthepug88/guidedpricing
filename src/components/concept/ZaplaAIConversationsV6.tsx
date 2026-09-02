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
  Send,
  Star,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const STAGE = "#17181B";
const INNER = "#1B1C20";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(initial);

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
    <div className="relative h-12 w-12 shrink-0">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 h-6 w-6 rounded-full blur-[1px]"
          style={{ marginLeft: -12, marginTop: -12, backgroundColor: petal.color }}
          animate={{
            x: [petal.x * 0.82, petal.x, petal.x * 0.86],
            y: [petal.y * 0.82, petal.y, petal.y * 0.86],
            scale: [0.94, 1.06, 0.96],
            opacity: [0.68, 0.96, 0.74],
          }}
          transition={{ duration: 3.8, repeat: Infinity, delay: petal.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] bg-white shadow-[0_0_14px_rgba(255,255,255,.5)]" />
    </div>
  );
}

function AIVoiceVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const bars = [17, 29, 22, 38, 28, 48, 34, 25, 43, 31, 39, 23, 35, 27, 41, 24, 32];

  return (
    <div className="relative h-full px-5 py-6 sm:px-6 lg:px-7 lg:py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/78">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.035]">
          <Phone size={15} color={CORAL} strokeWidth={2.2} />
        </span>
        AI Voice
      </div>

      <div className="mt-8 grid grid-cols-[76px_1fr] gap-4">
        <div className="relative rounded-[28px] border border-white/[0.12] bg-black/20 p-2">
          <div className="flex h-[66px] flex-col items-center justify-center gap-1.5 text-white/34">
            <MessageSquareText size={17} />
            <span className="text-[10px] font-medium">SMS</span>
          </div>
          <div
            className="flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-[22px] border text-white"
            style={{ borderColor: `${CORAL}80`, backgroundColor: `${CORAL}12`, boxShadow: `0 0 26px ${CORAL}18` }}
          >
            <Phone size={18} color={CORAL} />
            <span className="text-[10px] font-semibold">CALL</span>
          </div>
          <div className="flex h-[66px] flex-col items-center justify-center gap-1.5 text-white/34">
            <Mail size={17} />
            <span className="text-[10px] font-medium">EMAIL</span>
          </div>
        </div>

        <div className="rounded-[22px] border border-white/[0.12] bg-white/[0.045] p-5">
          <div className="text-[13px] font-medium text-white/60">Call · 00:15</div>

          <div className="mt-7 flex h-[72px] items-center gap-[4px] overflow-hidden">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] shrink-0 rounded-full"
                style={{
                  backgroundColor: index % 4 === 0 ? CORAL : index % 5 === 0 ? AMBER : "rgba(255,255,255,.30)",
                }}
                animate={inView && !reduced ? { height: [height * 0.56, height, height * 0.7] } : { height: height * 0.72 }}
                transition={{ duration: 1.15, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.045, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="mt-7 border-t border-white/[0.08] pt-5">
            <div className="text-[15px] font-medium leading-[1.55] text-white/90">“We’d like to start in March.”</div>
            <div className="mt-5 flex items-center gap-2 text-[11px] text-white/48">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CORAL }} />
              Understood
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const active = useCycle(inView, reduced, 4, 1800, 0);
  const signals = [
    { label: "6 messages", icon: MessageSquareText, color: ROSE, pos: "left-[8%] top-[18px]" },
    { label: "$18k quote", icon: FileText, color: AMBER, pos: "right-[8%] top-[18px]" },
    { label: "4 days quiet", icon: Clock3, color: AMBER, pos: "left-[8%] bottom-[18px]" },
    { label: "Thu 2:30", icon: CalendarDays, color: SAGE, pos: "right-[8%] bottom-[18px]" },
  ];

  return (
    <div className="relative h-full min-h-[390px] overflow-hidden border-x border-white/[0.10] px-5 py-5 lg:min-h-[455px] lg:px-7">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 455" preserveAspectRatio="none" aria-hidden="true">
        <path d="M118 75 C165 95, 185 145, 225 184" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
        <path d="M402 75 C355 95, 335 145, 295 184" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
        <path d="M118 380 C165 355, 185 307, 225 270" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1" />
        <path d="M402 380 C355 355, 335 307, 295 270" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth="1" />

        {[0, 1, 2, 3].map((index) => {
          const paths = [
            "M118 75 C165 95, 185 145, 225 184",
            "M402 75 C355 95, 335 145, 295 184",
            "M118 380 C165 355, 185 307, 225 270",
            "M402 380 C355 355, 335 307, 295 270",
          ];
          const colors = [ROSE, AMBER, AMBER, SAGE];
          return (
            <motion.path
              key={index}
              d={paths[index]}
              fill="none"
              stroke={colors[index]}
              strokeWidth="1.5"
              animate={{ opacity: active === index ? 0.95 : 0.08 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          );
        })}
      </svg>

      {signals.map((signal, index) => {
        const Icon = signal.icon;
        const lit = active === index;
        return (
          <motion.div
            key={signal.label}
            className={`absolute ${signal.pos} flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-[12px] font-medium`}
            animate={{
              opacity: lit ? 1 : 0.62,
              borderColor: lit ? `${signal.color}70` : "rgba(255,255,255,.12)",
              backgroundColor: lit ? `${signal.color}10` : "rgba(255,255,255,.04)",
              boxShadow: lit ? `0 0 22px ${signal.color}14` : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ color: lit ? "rgba(255,255,255,.96)" : "rgba(255,255,255,.66)" }}
          >
            <Icon size={14} color={signal.color} />
            {signal.label}
          </motion.div>
        );
      })}

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-[158px] w-[158px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
        animate={{ boxShadow: active === 3 ? `0 0 34px ${SAGE}16` : `0 0 24px ${CORAL}0A` }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{
          background: `linear-gradient(${INNER}, ${INNER}) padding-box, conic-gradient(from 210deg, ${ROSE}, ${CORAL}, ${AMBER}, ${SAGE}, ${ROSE}) border-box`,
          border: "2px solid transparent",
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.045]">
          <UserRound size={23} color="rgba(255,255,255,.80)" />
        </div>
        <div className="mt-3 text-[24px] font-semibold tracking-[-0.04em] text-white">Sarah Nguyen</div>
        <div className="mt-1 text-[11px] text-white/42">Bathroom renovation</div>
      </motion.div>
    </div>
  );
}

function AgentAvatar({ color }: { color: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: `${color}55`, backgroundColor: `${color}12` }}>
      <UserRound size={14} color={color} />
    </span>
  );
}

function AIAgentVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const progress = useCycle(inView, reduced, 4, 1700, 3);
  const agents = [
    { name: "No Show Follow Up", color: AMBER },
    { name: "Social Follow Up", color: ROSE },
    { name: "Stalled Deal Follow Up", color: CORAL, selected: true },
    { name: "Sales Follow Up", color: SAGE },
    { name: "Lead Scoring", color: ROSE },
    { name: "Custom Follow Up", color: AMBER },
  ];
  const outcomes = ["Follow-up sent", "Sarah replied", "Opportunity re-engaged"];

  return (
    <div className="relative h-full px-5 py-6 sm:px-6 lg:px-7 lg:py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/78">
        <Star size={18} color={CORAL} />
        AI Agent
      </div>

      <div className="mt-7 rounded-[22px] border border-white/[0.12] bg-white/[0.035] p-3">
        <div className="space-y-1.5">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="flex h-[48px] items-center gap-2.5 rounded-[16px] border px-2.5"
              style={{
                borderColor: agent.selected ? `${CORAL}78` : "transparent",
                backgroundColor: agent.selected ? `${CORAL}10` : "transparent",
                boxShadow: agent.selected ? `0 0 24px ${CORAL}0D` : "none",
              }}
            >
              <AgentAvatar color={agent.color} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color: agent.selected ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.54)" }}>
                {agent.name}
              </span>
              {agent.selected ? <ArrowRight size={14} color={CORAL} /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-[22px] border border-white/[0.12] bg-white/[0.035] p-4">
        <div
          className="flex items-center justify-between rounded-full px-5 py-3.5 text-[14px] font-semibold text-white"
          style={{ background: `linear-gradient(90deg, ${ROSE}, ${CORAL}, #F09B66)` }}
        >
          <span>Follow up now</span>
          <Send size={15} />
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <div className="absolute left-[16%] right-[16%] top-[13px] h-px bg-white/[0.10]" />
          <motion.div
            className="absolute left-[16%] top-[12px] h-[2px] rounded-full"
            style={{ backgroundColor: SAGE, transformOrigin: "left" }}
            animate={{ width: progress >= 3 ? "68%" : progress === 2 ? "50%" : progress === 1 ? "25%" : "0%" }}
            transition={{ duration: 0.65, ease: EASE }}
          />

          {outcomes.map((label, index) => {
            const done = progress > index;
            return (
              <div key={label} className="relative z-10 flex flex-col items-center text-center">
                <motion.span
                  className="flex h-7 w-7 items-center justify-center rounded-full border bg-[#17181B]"
                  animate={{
                    borderColor: done ? `${SAGE}90` : "rgba(255,255,255,.13)",
                    color: done ? SAGE : "rgba(255,255,255,.28)",
                    boxShadow: done ? `0 0 14px ${SAGE}18` : "none",
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Check size={14} />
                </motion.span>
                <span className="mt-2 text-[9px] leading-[1.25] text-white/50">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div
      className="relative hidden overflow-hidden rounded-[34px] border border-white/[0.15] lg:grid lg:grid-cols-[0.82fr_1.32fr_1fr]"
      style={{ backgroundColor: STAGE, boxShadow: "0 30px 100px rgba(0,0,0,.30)" }}
    >
      <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 1280 455" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="zapla-handoff" x1="0" x2="1">
            <stop offset="0%" stopColor={ROSE} stopOpacity="0" />
            <stop offset="45%" stopColor={CORAL} stopOpacity="0.45" />
            <stop offset="75%" stopColor={AMBER} stopOpacity="0.9" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M730 228 C805 225, 840 218, 906 207" fill="none" stroke="rgba(233,125,98,.16)" strokeWidth="1" />
        <path d="M730 228 C810 238, 845 242, 906 231" fill="none" stroke="rgba(233,125,98,.12)" strokeWidth="1" />
        <path d="M730 228 C808 212, 850 192, 906 185" fill="none" stroke="rgba(233,125,98,.12)" strokeWidth="1" />
        <motion.path
          d="M730 228 C805 225, 840 218, 906 207"
          fill="none"
          stroke="url(#zapla-handoff)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="52 180"
          animate={inView && !reduced ? { strokeDashoffset: [232, 0] } : { strokeDashoffset: 0 }}
          transition={{ duration: 2.4, repeat: inView && !reduced ? Infinity : 0, ease: "linear" }}
        />
      </svg>

      <div className="relative z-10">
        <AIVoiceVisual inView={inView} reduced={reduced} />
      </div>
      <div className="relative z-10">
        <ContextVisual inView={inView} reduced={reduced} />
      </div>
      <div className="relative z-10">
        <AIAgentVisual inView={inView} reduced={reduced} />
      </div>
    </div>
  );
}

function MobileStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div className="space-y-3 lg:hidden">
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}>
        <AIVoiceVisual inView={inView} reduced={reduced} />
      </div>
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}>
        <ContextVisual inView={inView} reduced={reduced} />
      </div>
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}>
        <AIAgentVisual inView={inView} reduced={reduced} />
      </div>
    </div>
  );
}

export function ZaplaAIConversationsV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.18, margin: "-8% 0px -8% 0px" });
  const reduced = Boolean(useReducedMotion());

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28 lg:py-36" style={{ backgroundColor: BG, fontFamily: DISPLAY }}>
      <div
        className="pointer-events-none absolute left-1/2 top-[250px] h-[360px] w-[900px] -translate-x-1/2 rounded-full blur-[90px]"
        style={{ background: `radial-gradient(ellipse, ${CORAL}20 0%, ${ROSE}12 35%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-[980px] text-center">
          <div className="flex items-center justify-center gap-3">
            <SignalBloom />
            <span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">ZAPLA AI</span>
          </div>

          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/62 sm:text-[18px]">
            Conversations become context. Context becomes a decision. Zapla follows through.
          </p>
        </header>

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <DesktopStage inView={inView} reduced={reduced} />
          <MobileStage inView={inView} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

export default ZaplaAIConversationsV6;
