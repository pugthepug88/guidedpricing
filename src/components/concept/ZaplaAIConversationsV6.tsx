import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  FileText,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const STAGE = "#18191C";
const INNER = "#1D1E22";
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

function PulseMark() {
  const petals = [
    { color: CORAL, rotate: 0 },
    { color: ROSE, rotate: 60 },
    { color: AMBER, rotate: 120 },
    { color: SAGE, rotate: 180 },
    { color: "#B98278", rotate: 240 },
    { color: "#D58C75", rotate: 300 },
  ];

  return (
    <div className="relative h-[64px] w-[70px] shrink-0">
      {petals.map((petal, index) => (
        <motion.span
          key={petal.rotate}
          className="absolute left-1/2 top-1/2 h-[35px] w-[18px] rounded-[999px_999px_999px_8px]"
          style={{
            backgroundColor: petal.color,
            marginLeft: -9,
            marginTop: -31,
            transformOrigin: "50% 31px",
            opacity: 0.88,
            boxShadow: `0 8px 22px ${petal.color}24`,
          }}
          animate={{ rotate: [petal.rotate - 1.2, petal.rotate + 1.2, petal.rotate - 1.2] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }}
        />
      ))}
      <img
        src="/concept/zapla-mark-white.png"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 h-[34px] w-[40px] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_3px_10px_rgba(0,0,0,.28)]"
      />
    </div>
  );
}

function ConversationVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const channels = [
    { label: "SMS", icon: MessageSquareText, color: AMBER },
    { label: "CALL", icon: Phone, color: CORAL },
    { label: "EMAIL", icon: Mail, color: ROSE },
  ];
  const active = useCycle(inView, reduced, 3, 3600, 1);
  const bars = [28, 43, 34, 57, 41, 68, 46, 35, 61, 40, 55, 30, 48, 36, 52, 31, 44, 27];
  const copy = active === 0
    ? { meta: "SMS conversation", quote: "“Can we move the appointment?”", tag: "AI Messaging" }
    : active === 1
      ? { meta: "Call · 00:15", quote: "“We’d like to start in March.”", tag: "AI Voice" }
      : { meta: "Email enquiry", quote: "“Can you resend the quote?”", tag: "AI Messaging" };

  return (
    <div className="relative h-full px-6 py-7 lg:px-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/86">
        <MessageSquareText size={18} color={CORAL} strokeWidth={2.1} />
        Conversations
      </div>

      <div className="mt-8 grid grid-cols-[64px_1fr] gap-4">
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-black/15 px-1.5 py-3">
          <motion.div
            className="absolute left-1.5 right-1.5 h-[58px] rounded-[18px] border"
            animate={{ y: active * 62 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{
              borderColor: `${channels[active].color}75`,
              backgroundColor: `${channels[active].color}10`,
              boxShadow: `0 0 26px ${channels[active].color}18`,
            }}
          />
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const isActive = index === active;
            return (
              <div key={channel.label} className="relative z-10 flex h-[62px] flex-col items-center justify-center gap-1.5">
                <Icon size={16} color={isActive ? channel.color : "rgba(255,255,255,.34)"} />
                <span className="text-[9px] font-semibold tracking-[0.05em]" style={{ color: isActive ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.32)" }}>
                  {channel.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[24px] border border-white/[0.11] bg-white/[0.045] p-5">
          <div className="absolute inset-x-10 top-[92px] h-[90px] rounded-full blur-[36px]" style={{ background: `radial-gradient(ellipse, ${channels[active].color}24 0%, transparent 72%)` }} />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/34">Live conversation</div>
              <motion.div key={copy.meta} className="mt-1 text-[13px] font-medium text-white/66" animate={{ x: [-5, 0], opacity: [0.6, 1] }} transition={{ duration: 0.55, ease: EASE }}>
                {copy.meta}
              </motion.div>
            </div>
            <motion.span key={copy.tag} className="rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/46" animate={{ opacity: [0.65, 1] }} transition={{ duration: 0.5 }}>
              {copy.tag}
            </motion.span>
          </div>

          <div className="relative mt-7 flex h-[92px] items-center justify-center gap-[5px] overflow-hidden">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] shrink-0 rounded-full"
                style={{ backgroundColor: index % 5 === 0 ? channels[active].color : "rgba(255,255,255,.30)" }}
                animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.68] } : { height: height * 0.72 }}
                transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.04, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="relative mt-5 border-t border-white/[0.08] pt-5">
            <motion.div key={copy.quote} className="max-w-[270px] text-[17px] font-medium leading-[1.45] text-white/94" animate={{ x: [-7, 0], opacity: [0.68, 1] }} transition={{ duration: 0.55, ease: EASE }}>
              {copy.quote}
            </motion.div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/48">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: channels[active].color }} />
              Context updated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextPetal({ color, rotate, filled }: { color: string; rotate: number; filled: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[74px] w-[34px] rounded-[999px_999px_999px_13px] border"
      style={{ marginLeft: -17, marginTop: -67, transformOrigin: "50% 67px" }}
      animate={{
        rotate,
        borderColor: filled ? `${color}9A` : "rgba(255,255,255,.18)",
        backgroundColor: filled ? `${color}70` : "rgba(255,255,255,.018)",
        boxShadow: filled ? `0 8px 28px ${color}22` : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const phase = useCycle(inView, reduced, 7, 1500, 0);
  const absorbed = Math.min(phase, 4);
  const signals = [
    { label: "6 messages", icon: MessageSquareText, color: ROSE, x: -145, y: -102 },
    { label: "$18k quote", icon: FileText, color: AMBER, x: 145, y: -102 },
    { label: "4 days quiet", icon: Phone, color: CORAL, x: -145, y: 110 },
    { label: "Thu 2:30", icon: CalendarDays, color: SAGE, x: 145, y: 110 },
  ];

  return (
    <div className="relative h-full min-h-[455px] overflow-hidden border-x border-white/[0.085] px-6 py-7">
      <div className="text-[18px] font-medium text-white/86">Context</div>

      <div className="absolute left-1/2 top-[54%] h-[330px] w-[430px] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

        <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2">
          <ContextPetal color={ROSE} rotate={0} filled={absorbed >= 1} />
          <ContextPetal color={AMBER} rotate={90} filled={absorbed >= 2} />
          <ContextPetal color={SAGE} rotate={180} filled={absorbed >= 4} />
          <ContextPetal color={CORAL} rotate={270} filled={absorbed >= 3} />
          <div className="absolute left-1/2 top-1/2 z-20 flex h-[72px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <img src="/concept/zapla-mark-white.png" alt="" aria-hidden="true" className="h-[54px] w-[64px] object-contain opacity-95" />
          </div>
        </div>

        {signals.map((signal, index) => {
          const Icon = signal.icon;
          const isAbsorbed = index < absorbed;
          const isCurrent = index === absorbed && absorbed < 4;
          return (
            <motion.div
              key={signal.label}
              className="absolute left-1/2 top-1/2 flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-[12px] font-medium"
              initial={false}
              animate={{
                x: isAbsorbed ? 0 : signal.x,
                y: isAbsorbed ? 0 : signal.y,
                scale: isAbsorbed ? 0.7 : isCurrent ? 1.03 : 1,
                opacity: isAbsorbed ? 0 : isCurrent ? 1 : 0.66,
                borderColor: isCurrent ? `${signal.color}70` : "rgba(255,255,255,.11)",
                backgroundColor: isCurrent ? `${signal.color}10` : "rgba(255,255,255,.035)",
                boxShadow: isCurrent ? `0 0 22px ${signal.color}12` : "none",
              }}
              transition={{ duration: isAbsorbed ? 0.95 : 0.7, ease: EASE }}
              style={{ marginLeft: -62, marginTop: -21, color: isCurrent ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.66)" }}
            >
              <Icon size={14} color={signal.color} />
              {signal.label}
            </motion.div>
          );
        })}

        <motion.div className="absolute left-1/2 top-[76%] -translate-x-1/2 text-center" animate={{ opacity: absorbed === 4 ? 1 : 0.42, y: absorbed === 4 ? 0 : 4 }} transition={{ duration: 0.7, ease: EASE }}>
          <div className="text-[16px] font-semibold text-white/92">Sarah Nguyen</div>
          <div className="mt-1 text-[11px] text-white/42">Bathroom renovation</div>
        </motion.div>
      </div>
    </div>
  );
}

function AgentAvatar({ color }: { color: string }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: `${color}66`, background: `radial-gradient(circle at 35% 28%, ${color}70, ${color}20 52%, rgba(255,255,255,.03) 100%)` }}>
      <UserRound size={17} color="rgba(255,255,255,.90)" strokeWidth={2.1} />
    </span>
  );
}

function AIAgentVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const agents = [
    { name: "Stalled Deal Follow Up", color: CORAL },
    { name: "No Show Follow Up", color: AMBER },
    { name: "Social Follow Up", color: ROSE },
    { name: "Sales Follow Up", color: SAGE },
    { name: "Lead Scoring", color: "#9B86B8" },
    { name: "Custom Follow Up", color: AMBER },
  ];
  const active = useCycle(inView, reduced, agents.length, 2500, 0);

  const signedDelta = (index: number) => {
    let delta = index - active;
    const half = Math.floor(agents.length / 2);
    if (delta > half) delta -= agents.length;
    if (delta < -half) delta += agents.length;
    return delta;
  };

  return (
    <div className="relative h-full px-5 py-7 sm:px-6 lg:px-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/84">
        <Send size={18} color={CORAL} strokeWidth={2.1} />
        AI Agent
      </div>

      <div className="relative mt-8 h-[330px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-14 bg-gradient-to-b from-[#18191C] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-gradient-to-t from-[#18191C] to-transparent" />

        {agents.map((agent, index) => {
          const delta = signedDelta(index);
          const distance = Math.abs(delta);
          const visible = distance <= 2;
          return (
            <motion.div
              key={agent.name}
              className="absolute left-1/2 top-1/2 flex h-[66px] w-[88%] -translate-x-1/2 items-center gap-3 rounded-[22px] border px-4"
              animate={{
                y: delta * 44 - 33,
                x: distance * 10,
                scale: delta === 0 ? 1 : 0.95 - distance * 0.018,
                opacity: visible ? (delta === 0 ? 1 : 0.48 - distance * 0.10) : 0,
                borderColor: delta === 0 ? `${agent.color}8A` : "rgba(255,255,255,.09)",
                backgroundColor: delta === 0 ? `${agent.color}12` : "rgba(255,255,255,.026)",
                boxShadow: delta === 0 ? `0 16px 34px rgba(0,0,0,.30), 0 0 24px ${agent.color}16` : "0 10px 24px rgba(0,0,0,.18)",
              }}
              transition={{ duration: 0.72, ease: EASE }}
              style={{ zIndex: 20 - distance }}
            >
              <AgentAvatar color={agent.color} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color: delta === 0 ? "rgba(255,255,255,.97)" : "rgba(255,255,255,.58)" }}>
                {agent.name}
              </span>
              <span className="h-5 w-5 shrink-0 rounded-full border" style={{ borderColor: delta === 0 ? agent.color : "rgba(255,255,255,.16)", boxShadow: delta === 0 ? `inset 0 0 0 4px #18191C, 0 0 0 1px ${agent.color}, 0 0 14px ${agent.color}35` : "none", backgroundColor: delta === 0 ? agent.color : "transparent" }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div className="relative hidden overflow-hidden rounded-[34px] border border-white/[0.15] lg:grid lg:grid-cols-[0.88fr_1.28fr_0.92fr]" style={{ backgroundColor: STAGE, boxShadow: "0 30px 100px rgba(0,0,0,.30)" }}>
      <div className="relative z-10"><ConversationVisual inView={inView} reduced={reduced} /></div>
      <div className="relative z-10"><ContextVisual inView={inView} reduced={reduced} /></div>
      <div className="relative z-10"><AIAgentVisual inView={inView} reduced={reduced} /></div>
    </div>
  );
}

function MobileStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div className="space-y-3 lg:hidden">
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ConversationVisual inView={inView} reduced={reduced} /></div>
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ContextVisual inView={inView} reduced={reduced} /></div>
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><AIAgentVisual inView={inView} reduced={reduced} /></div>
    </div>
  );
}

export function ZaplaAIConversationsV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.18, margin: "-8% 0px -8% 0px" });
  const reduced = Boolean(useReducedMotion());

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28 lg:py-36" style={{ backgroundColor: BG, fontFamily: DISPLAY }}>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-[980px] text-center">
          <div className="flex items-center justify-center gap-3.5">
            <PulseMark />
            <span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
              ZAPLA{" "}<span style={{ color: CORAL, textShadow: `0 0 18px ${CORAL}30` }}>AI</span>
            </span>
          </div>

          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/62 sm:text-[18px]">
            Conversations become context. Context becomes a decision. Zapla follows through.
          </p>
        </header>

        <div className="pointer-events-none absolute left-1/2 top-[305px] h-[245px] w-[900px] -translate-x-1/2 rounded-full blur-[80px]" style={{ background: `radial-gradient(ellipse, ${CORAL}28 0%, ${ROSE}18 36%, ${AMBER}0D 56%, transparent 74%)` }} />

        <div className="relative mt-12 sm:mt-14 lg:mt-16">
          <DesktopStage inView={inView} reduced={reduced} />
          <MobileStage inView={inView} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

export default ZaplaAIConversationsV6;
