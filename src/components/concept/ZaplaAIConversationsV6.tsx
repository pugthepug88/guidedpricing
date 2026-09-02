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
const PLUM = "#9B86B8";
const PETALS = [CORAL, ROSE, AMBER, SAGE, "#B98278", "#D58C75"];

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [count, inView, ms, reduced]);
  return index;
}

function BrandMark({ size = 66, filled = 6 }: { size?: number; filled?: number }) {
  const petalH = size * 0.54;
  const petalW = size * 0.27;
  const radius = size * 0.43;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {PETALS.map((color, index) => (
        <motion.span
          key={color + index}
          className="absolute left-1/2 top-1/2 rounded-[999px_999px_999px_10px] border"
          style={{
            width: petalW,
            height: petalH,
            marginLeft: -petalW / 2,
            marginTop: -radius,
            transformOrigin: `50% ${radius}px`,
          }}
          animate={{
            rotate: index * 60,
            borderColor: index < filled ? `${color}AA` : "rgba(255,255,255,.16)",
            backgroundColor: index < filled ? `${color}D0` : "rgba(255,255,255,.018)",
            boxShadow: index < filled ? `0 6px 18px ${color}24` : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.75, ease: EASE }}
        />
      ))}
      <img
        src="/concept/zapla-mark-white.png"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 object-contain"
        style={{ width: size * 0.56, height: size * 0.46 }}
      />
    </div>
  );
}

function ConversationVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const channels = [
    { label: "SMS", icon: MessageSquareText, color: AMBER, meta: "SMS conversation", quote: "“Just following up on the quote.”", tag: "AI Messaging" },
    { label: "CALL", icon: Phone, color: CORAL, meta: "Call · 00:15", quote: "“We’d like to start in March.”", tag: "AI Voice" },
    { label: "EMAIL", icon: Mail, color: ROSE, meta: "Email enquiry", quote: "“Can we lock in Thursday?”", tag: "AI Messaging" },
    { label: "SOCIAL", icon: MessageSquareText, color: SAGE, meta: "Social enquiry", quote: "“Hi, do you service my area?”", tag: "AI Messaging" },
  ];
  const active = useCycle(inView, reduced, channels.length, 3600, 1);
  const current = channels[active];
  const bars = [26, 40, 31, 55, 38, 63, 44, 34, 58, 41, 52, 29, 46, 35, 50, 30, 42];

  return (
    <div className="relative h-full px-6 py-7 lg:px-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/86">
        <MessageSquareText size={18} color={CORAL} strokeWidth={2.1} />
        Conversations
      </div>

      <div className="mt-8 grid grid-cols-[58px_1fr] gap-4">
        <div className="relative overflow-hidden rounded-[22px] border border-white/[0.10] bg-black/15 px-1.5 py-2">
          <motion.div
            className="absolute left-1.5 right-1.5 h-[52px] rounded-[16px] border"
            animate={{ y: active * 54 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{
              borderColor: `${current.color}72`,
              backgroundColor: `${current.color}0E`,
              boxShadow: `0 0 24px ${current.color}14`,
            }}
          />
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const selected = index === active;
            return (
              <div key={channel.label} className="relative z-10 flex h-[54px] flex-col items-center justify-center gap-1">
                <Icon size={15} color={selected ? channel.color : "rgba(255,255,255,.30)"} />
                <span className="text-[8px] font-semibold tracking-[0.04em]" style={{ color: selected ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.29)" }}>
                  {channel.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative h-[320px] overflow-hidden rounded-[24px] border border-white/[0.11] bg-white/[0.045] p-5">
          <div className="absolute inset-x-8 top-[84px] h-[105px] rounded-full blur-[38px]" style={{ background: `radial-gradient(ellipse, ${current.color}22 0%, transparent 72%)` }} />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/34">Live conversation</div>
              <motion.div key={current.meta} className="mt-1 text-[13px] font-medium text-white/68" animate={{ x: [-5, 0], opacity: [0.62, 1] }} transition={{ duration: 0.5, ease: EASE }}>
                {current.meta}
              </motion.div>
            </div>
            <motion.span key={current.tag} className="rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/48" animate={{ opacity: [0.7, 1] }} transition={{ duration: 0.45 }}>
              {current.tag}
            </motion.span>
          </div>

          <div className="relative mt-7 flex h-[92px] items-center justify-center gap-[5px] overflow-hidden">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] shrink-0 rounded-full"
                style={{ backgroundColor: index % 5 === 0 ? current.color : "rgba(255,255,255,.28)" }}
                animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.68] } : { height: height * 0.72 }}
                transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.04, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="relative mt-4 border-t border-white/[0.08] pt-5">
            <motion.div key={current.quote} className="max-w-[280px] text-[17px] font-medium leading-[1.45] text-white/94" animate={{ x: [-6, 0], opacity: [0.68, 1] }} transition={{ duration: 0.55, ease: EASE }}>
              {current.quote}
            </motion.div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/48">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: current.color }} />
              Captured as context
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ContextArtifact = {
  label: string;
  detail: string;
  icon: typeof MessageSquareText;
  color: string;
  x: number;
  y: number;
  width: number;
};

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const phase = useCycle(inView, reduced, 8, 1450, 0);
  const absorbed = Math.min(phase, 6);
  const artifacts: ContextArtifact[] = [
    { label: "Conversation", detail: "6 messages", icon: MessageSquareText, color: ROSE, x: -170, y: -118, width: 126 },
    { label: "Quote", detail: "$18k sent", icon: FileText, color: AMBER, x: 170, y: -118, width: 118 },
    { label: "Calendar", detail: "Thu 2:30", icon: CalendarDays, color: SAGE, x: -178, y: 104, width: 120 },
    { label: "Pipeline", detail: "Quote sent", icon: Send, color: CORAL, x: 178, y: 104, width: 120 },
    { label: "Call transcript", detail: "Start in March", icon: Phone, color: CORAL, x: -186, y: -8, width: 138 },
    { label: "Contact record", detail: "Social lead", icon: Mail, color: PLUM, x: 186, y: -8, width: 132 },
  ];

  return (
    <div className="relative h-full overflow-hidden border-x border-white/[0.085] px-6 py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/86">
        <img src="/concept/zapla-mark-white.png" alt="" aria-hidden="true" className="h-[20px] w-[24px] object-contain opacity-95" />
        Context
      </div>

      <div className="absolute left-1/2 top-[54%] h-[390px] w-[520px] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[282px] w-[282px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <BrandMark size={154} filled={absorbed} />
        </div>

        {artifacts.map((artifact, index) => {
          const Icon = artifact.icon;
          const isAbsorbed = index < absorbed;
          const isCurrent = index === absorbed && absorbed < 6;
          return (
            <motion.div
              key={artifact.label}
              className="absolute left-1/2 top-1/2 rounded-[18px] border bg-white/[0.035] px-3 py-2.5"
              style={{ width: artifact.width, marginLeft: -artifact.width / 2, marginTop: -26 }}
              animate={{
                x: isAbsorbed ? 0 : artifact.x,
                y: isAbsorbed ? 0 : artifact.y,
                scale: isAbsorbed ? 0.54 : isCurrent ? 1.03 : 1,
                opacity: isAbsorbed ? 0 : isCurrent ? 1 : 0.62,
                borderColor: isCurrent ? `${artifact.color}70` : "rgba(255,255,255,.11)",
                boxShadow: isCurrent ? `0 0 20px ${artifact.color}12` : "none",
              }}
              transition={{ duration: isAbsorbed ? 0.95 : 0.7, ease: EASE }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.08] bg-black/15">
                  <Icon size={13} color={artifact.color} />
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[10px] font-semibold text-white/86">{artifact.label}</div>
                  <div className="mt-0.5 truncate text-[9px] text-white/38">{artifact.detail}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
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
    { name: "Lead Scoring", color: PLUM },
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

      <div className="relative mt-10 h-[330px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-16 bg-gradient-to-b from-[#18191C] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-gradient-to-t from-[#18191C] to-transparent" />

        {agents.map((agent, index) => {
          const delta = signedDelta(index);
          const distance = Math.abs(delta);
          const visible = distance <= 2;
          return (
            <motion.div
              key={agent.name}
              className="absolute left-1/2 top-1/2 flex h-[66px] w-[88%] -translate-x-1/2 items-center gap-3 rounded-[22px] border px-4"
              animate={{
                y: delta * 48 - 33,
                x: distance * 10,
                scale: delta === 0 ? 1 : 0.95 - distance * 0.018,
                opacity: visible ? (delta === 0 ? 1 : 0.48 - distance * 0.1) : 0,
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
              <span
                className="h-5 w-5 shrink-0 rounded-full border"
                style={{
                  borderColor: delta === 0 ? agent.color : "rgba(255,255,255,.16)",
                  boxShadow: delta === 0 ? `inset 0 0 0 4px #18191C, 0 0 0 1px ${agent.color}, 0 0 14px ${agent.color}35` : "none",
                  backgroundColor: delta === 0 ? agent.color : "transparent",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div
      className="relative hidden h-[500px] overflow-hidden rounded-[34px] border border-white/[0.16] lg:grid lg:grid-cols-[0.84fr_1.34fr_0.92fr]"
      style={{ backgroundColor: STAGE, boxShadow: "0 30px 100px rgba(0,0,0,.30)" }}
    >
      <ConversationVisual inView={inView} reduced={reduced} />
      <ContextVisual inView={inView} reduced={reduced} />
      <AIAgentVisual inView={inView} reduced={reduced} />
    </div>
  );
}

function MobileStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div className="space-y-3 lg:hidden">
      <div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ConversationVisual inView={inView} reduced={reduced} /></div>
      <div className="h-[470px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ContextVisual inView={inView} reduced={reduced} /></div>
      <div className="h-[430px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><AIAgentVisual inView={inView} reduced={reduced} /></div>
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
            <BrandMark size={68} filled={6} />
            <span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
              ZAPLA <span style={{ color: CORAL, textShadow: `0 0 18px ${CORAL}30` }}>AI</span>
            </span>
          </div>

          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/62 sm:text-[18px]">
            Conversations become context. Context becomes a decision. Zapla follows through.
          </p>
        </header>

        <div className="pointer-events-none absolute left-1/2 top-[310px] h-[250px] w-[1020px] -translate-x-1/2 rounded-[50%] blur-[62px]" style={{ background: `radial-gradient(ellipse at center, ${CORAL}32 0%, ${ROSE}20 34%, ${AMBER}10 54%, transparent 76%)` }} />
        <div className="pointer-events-none absolute left-1/2 top-[382px] h-[120px] w-[760px] -translate-x-1/2 rounded-[50%] blur-[38px]" style={{ background: `radial-gradient(ellipse at center, rgba(255,255,255,.055) 0%, ${CORAL}16 36%, transparent 74%)` }} />

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <DesktopStage inView={inView} reduced={reduced} />
          <MobileStage inView={inView} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

export default ZaplaAIConversationsV6;
