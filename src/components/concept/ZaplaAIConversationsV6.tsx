import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Check,
  Clock3,
  FileText,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const STAGE = "#17181B";
const INNER = "#1B1C20";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(reduced ? initial : initial);

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
            opacity: [0.66, 0.96, 0.72],
          }}
          transition={{ duration: 3.8, repeat: Infinity, delay: petal.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2px] bg-white shadow-[0_0_14px_rgba(255,255,255,.5)]" />
    </div>
  );
}

function ProductPill({ label, color }: { label: string; color: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.045] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/78" style={{ fontFamily: MONO }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}

function ConversationVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const cycle = useCycle(inView, reduced, 4, 2800, 0);
  const sequence = [0, 1, 2, 1] as const;
  const selected = sequence[cycle] ?? 0;
  const channels = [
    { label: "CALL", icon: Phone, color: CORAL },
    { label: "SMS", icon: MessageSquareText, color: AMBER },
    { label: "EMAIL", icon: Mail, color: ROSE },
  ];
  const bars = [16, 29, 21, 39, 26, 52, 33, 23, 45, 28, 37, 19, 30, 24];

  return (
    <div className="relative h-full min-h-[420px] px-5 py-6 sm:px-6 lg:min-h-[470px]">
      <ProductPill label="AI Voice" color={CORAL} />

      <div className="mt-8 grid gap-4 sm:grid-cols-[82px_1fr]">
        <div className="relative h-[218px] overflow-hidden rounded-[25px] border border-white/[0.11] bg-black/20 px-2 py-4">
          <motion.div
            className="absolute left-2 right-2 h-[58px] rounded-[18px] border"
            animate={{ y: selected * 64 }}
            transition={{ duration: 0.7, ease: EASE }}
            style={{
              borderColor: `${channels[selected].color}78`,
              backgroundColor: `${channels[selected].color}12`,
              boxShadow: `0 0 26px ${channels[selected].color}18`,
            }}
          />

          <div className="relative space-y-1.5">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              const active = index === selected;
              return (
                <div key={channel.label} className="flex h-[58px] flex-col items-center justify-center gap-1.5">
                  <Icon size={16} color={active ? channel.color : "rgba(255,255,255,.38)"} strokeWidth={2} />
                  <span className="text-[9px] font-semibold tracking-[0.08em]" style={{ color: active ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.42)", fontFamily: MONO }}>
                    {channel.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[20px] border border-white/[0.11] bg-white/[0.04] p-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <span className="text-[13px] font-medium text-white/72">Call · 00:15</span>
            <motion.span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: CORAL, boxShadow: `0 0 13px ${CORAL}` }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: inView && !reduced ? Infinity : 0 }}
            />
          </div>

          <div className="mt-6 flex h-[64px] items-center gap-[4px]">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: index % 4 === 0 ? CORAL : "rgba(255,255,255,.34)" }}
                animate={inView && !reduced ? { height: [height * 0.55, height, height * 0.7] } : { height: height * 0.7 }}
                transition={{ duration: 1.15, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.04, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="mt-7 border-t border-white/[0.07] pt-5">
            <div className="text-[15px] font-medium leading-[1.55] text-white/90">“We’d like to start in March.”</div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/46">
              <Check size={13} color={SAGE} strokeWidth={2.3} />
              Understood
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextSignal({
  label,
  color,
  icon: Icon,
  className,
  lit,
}: {
  label: string;
  color: string;
  icon: typeof MessageSquareText;
  className: string;
  lit: boolean;
}) {
  return (
    <motion.div
      className={`absolute flex items-center gap-2 rounded-full border px-3 py-2.5 text-[11px] font-semibold ${className}`}
      animate={{
        opacity: lit ? 1 : 0.66,
        borderColor: lit ? `${color}66` : "rgba(255,255,255,.12)",
        backgroundColor: lit ? `${color}10` : "rgba(255,255,255,.045)",
        boxShadow: lit ? `0 0 22px ${color}14` : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.7, ease: EASE }}
      style={{ color: lit ? "rgba(255,255,255,.96)" : "rgba(255,255,255,.68)" }}
    >
      <Icon size={13} color={color} strokeWidth={2.1} />
      {label}
    </motion.div>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const active = useCycle(inView, reduced, 4, 1900, 0);
  const signals = [
    { label: "6 messages", color: AMBER, icon: MessageSquareText, className: "left-1/2 top-[26px] -translate-x-1/2" },
    { label: "$18k quote", color: ROSE, icon: FileText, className: "left-[10px] top-1/2 -translate-y-1/2" },
    { label: "4 days quiet", color: AMBER, icon: Clock3, className: "right-[10px] top-1/2 -translate-y-1/2" },
    { label: "Thu 2:30", color: SAGE, icon: CalendarDays, className: "bottom-[28px] left-1/2 -translate-x-1/2" },
  ];

  return (
    <div className="relative h-full min-h-[420px] px-4 py-6 lg:min-h-[470px]">
      <div className="relative mx-auto h-[370px] max-w-[430px]">
        <div className="absolute left-1/2 top-1/2 h-[252px] w-[252px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]" />
        <div className="absolute left-1/2 top-1/2 h-[198px] w-[198px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />

        <motion.div
          className="absolute left-1/2 top-[85px] h-[66px] w-px -translate-x-1/2"
          animate={{ backgroundColor: active === 0 ? AMBER : "rgba(255,255,255,.12)", boxShadow: active === 0 ? `0 0 12px ${AMBER}` : "none" }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          className="absolute left-[88px] top-1/2 h-px w-[74px] -translate-y-1/2"
          animate={{ backgroundColor: active === 1 ? ROSE : "rgba(255,255,255,.12)", boxShadow: active === 1 ? `0 0 12px ${ROSE}` : "none" }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          className="absolute right-[88px] top-1/2 h-px w-[74px] -translate-y-1/2"
          animate={{ backgroundColor: active === 2 ? AMBER : "rgba(255,255,255,.12)", boxShadow: active === 2 ? `0 0 12px ${AMBER}` : "none" }}
          transition={{ duration: 0.7 }}
        />
        <motion.div
          className="absolute bottom-[81px] left-1/2 h-[66px] w-px -translate-x-1/2"
          animate={{ backgroundColor: active === 3 ? SAGE : "rgba(255,255,255,.12)", boxShadow: active === 3 ? `0 0 12px ${SAGE}` : "none" }}
          transition={{ duration: 0.7 }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 flex h-[154px] w-[154px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center"
          animate={{
            borderColor: active === 3 ? `${SAGE}70` : "rgba(255,255,255,.15)",
            boxShadow: active === 3 ? `0 0 34px ${SAGE}13` : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ background: "radial-gradient(circle at 45% 35%, rgba(255,255,255,.10), rgba(255,255,255,.035) 58%, transparent 100%)" }}
        >
          <UserRound size={21} color="rgba(255,255,255,.72)" strokeWidth={2.1} />
          <div className="mt-2 text-[27px] font-semibold tracking-[-0.045em] text-white">Sarah</div>
          <div className="mt-1 text-[11px] text-white/42">Bathroom renovation</div>
        </motion.div>

        {signals.map((signal, index) => (
          <ContextSignal key={signal.label} {...signal} lit={index === active} />
        ))}
      </div>
    </div>
  );
}

function AgentAvatar({ color }: { color: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: `${color}55`, backgroundColor: `${color}12` }}>
      <UserRound size={14} color={color} strokeWidth={2.1} />
    </span>
  );
}

function AgentVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const agents = [
    { name: "Stalled Deal Follow Up", color: CORAL },
    { name: "No Show Follow Up", color: AMBER },
    { name: "Social Follow Up", color: ROSE },
    { name: "Sales Follow Up", color: CORAL },
    { name: "Lead Scoring", color: SAGE },
    { name: "Custom Follow Up", color: AMBER },
  ];
  const progress = useCycle(inView, reduced, 4, 1800, 3);

  return (
    <div className="relative h-full min-h-[420px] px-5 py-6 sm:px-6 lg:min-h-[470px]">
      <ProductPill label="AI Agent" color={ROSE} />

      <div className="mt-8 grid gap-4 xl:grid-cols-[1fr_1.05fr]">
        <div className="relative overflow-hidden rounded-[20px] border border-white/[0.11] bg-white/[0.04] p-3.5">
          <div className="rounded-[16px] border px-3 py-3.5" style={{ borderColor: `${CORAL}70`, backgroundColor: `${CORAL}10`, boxShadow: `0 0 28px ${CORAL}10` }}>
            <div className="flex items-center gap-3">
              <AgentAvatar color={CORAL} />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-white/94">Stalled Deal Follow Up</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/34" style={{ fontFamily: MONO }}>Selected for Sarah</div>
              </div>
            </div>
          </div>

          <div className="relative mt-2 h-[200px] overflow-hidden">
            <motion.div
              animate={inView && !reduced ? { y: [0, -88, 0] } : { y: 0 }}
              transition={inView && !reduced ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
              className="space-y-1.5"
            >
              {agents.slice(1).map((agent) => (
                <div key={agent.name} className="flex h-[43px] items-center gap-2.5 rounded-[13px] border border-white/[0.07] bg-black/10 px-2.5">
                  <AgentAvatar color={agent.color} />
                  <span className="text-[11px] font-medium text-white/60">{agent.name}</span>
                </div>
              ))}
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#17181B] to-transparent" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[20px] border px-4 py-4" style={{ borderColor: `${CORAL}65`, backgroundColor: `${CORAL}10` }}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${CORAL}18` }}>
                <Send size={17} color={CORAL} strokeWidth={2.1} />
              </span>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-white/38" style={{ fontFamily: MONO }}>Best next action</div>
                <div className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-white">Follow up now</div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-white/[0.10] bg-white/[0.035] p-4">
            <div className="relative space-y-4">
              <div className="absolute bottom-4 left-[13px] top-4 w-px bg-white/[0.09]" />
              <motion.div
                className="absolute left-[11px] top-4 w-[5px] rounded-full bg-[#8FA66E]"
                animate={{ height: progress === 0 ? "8%" : progress === 1 ? "36%" : progress === 2 ? "68%" : "94%" }}
                transition={{ duration: 0.75, ease: EASE }}
                style={{ boxShadow: `0 0 14px ${SAGE}66` }}
              />

              {[
                ["Follow-up sent", CORAL],
                ["Sarah replied", AMBER],
                ["Opportunity re-engaged", SAGE],
              ].map(([label, color], index) => {
                const done = progress > index;
                return (
                  <motion.div key={label} className="relative flex items-center gap-3 pl-7" animate={{ opacity: done ? 1 : 0.42 }} transition={{ duration: 0.6 }}>
                    <span className="absolute left-0 flex h-7 w-7 items-center justify-center rounded-full border bg-[#1A1B1F]" style={{ borderColor: done ? `${color}55` : "rgba(255,255,255,.08)" }}>
                      <Check size={12} color={done ? color : "rgba(255,255,255,.28)"} strokeWidth={2.5} />
                    </span>
                    <span className="text-[12px] font-medium text-white/78">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute left-[-38px] top-[46%] h-px w-[86px]"
        style={{ background: `linear-gradient(90deg, transparent, ${CORAL}, ${AMBER})` }}
        animate={inView && !reduced ? { opacity: [0.22, 0.95, 0.22], scaleX: [0.72, 1, 0.72] } : { opacity: 0.55 }}
        transition={{ duration: 2.1, repeat: inView && !reduced ? Infinity : 0, ease: "easeInOut" }}
      />
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
        className="pointer-events-none absolute left-1/2 top-[250px] h-[480px] w-[min(980px,92vw)] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${ROSE}18 0%, ${CORAL}10 38%, transparent 72%)` }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        <header className="mx-auto max-w-[920px] text-center">
          <div className="flex items-center justify-center gap-3">
            <SignalBloom />
            <span className="text-[30px] font-semibold tracking-[-0.045em] text-white sm:text-[34px]">ZAPLA AI</span>
          </div>
          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/62 sm:text-[18px]">
            Conversations become context. Context becomes a decision. Zapla follows through.
          </p>
        </header>

        <div
          className="relative mt-16 overflow-hidden rounded-[30px] border border-white/[0.14] lg:mt-20"
          style={{ backgroundColor: STAGE, boxShadow: "0 30px 100px rgba(0,0,0,.32), inset 0 1px 0 rgba(255,255,255,.035)" }}
        >
          <div className="pointer-events-none absolute inset-x-[8%] bottom-[-100px] h-[170px] rounded-full bg-white/[0.025] blur-3xl" />

          <div className="grid lg:grid-cols-[0.93fr_1.14fr_1.05fr]">
            <div className="border-b border-white/[0.09] lg:border-b-0 lg:border-r">
              <ConversationVisual inView={inView} reduced={reduced} />
            </div>
            <div className="border-b border-white/[0.09] lg:border-b-0 lg:border-r">
              <ContextVisual inView={inView} reduced={reduced} />
            </div>
            <AgentVisual inView={inView} reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
