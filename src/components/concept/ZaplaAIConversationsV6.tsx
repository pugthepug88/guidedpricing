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
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const STAGE = "#17181B";
const INNER = "#1B1C20";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";
const ZAPLA_MARK_DATA = "data:image/png;base64,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";

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
    { color: CORAL, rotate: -8, x: 0, y: -12, w: 21, h: 40, delay: 0 },
    { color: ROSE, rotate: 38, x: 13, y: -5, w: 20, h: 36, delay: 0.12 },
    { color: AMBER, rotate: 78, x: 15, y: 10, w: 18, h: 34, delay: 0.24 },
    { color: SAGE, rotate: 124, x: 0, y: 14, w: 18, h: 34, delay: 0.36 },
    { color: "#B98278", rotate: 166, x: -13, y: 8, w: 20, h: 36, delay: 0.48 },
    { color: "#D58C75", rotate: 210, x: -13, y: -7, w: 20, h: 36, delay: 0.6 },
  ];

  return (
    <div className="relative h-[58px] w-[62px] shrink-0">
      {petals.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 rounded-[999px_999px_999px_18px]"
          style={{
            width: petal.w,
            height: petal.h,
            marginLeft: -petal.w / 2,
            marginTop: -petal.h / 2,
            backgroundColor: petal.color,
            transformOrigin: "50% 75%",
            boxShadow: `0 5px 18px ${petal.color}28`,
          }}
          animate={{
            x: [petal.x * 0.96, petal.x, petal.x * 0.97],
            y: [petal.y * 0.96, petal.y, petal.y * 0.97],
            rotate: [petal.rotate - 1, petal.rotate, petal.rotate + 1],
            opacity: [0.82, 0.98, 0.86],
          }}
          transition={{ duration: 5.2, repeat: Infinity, delay: petal.delay, ease: "easeInOut" }}
        />
      ))}
      <img
        src={ZAPLA_MARK_DATA}
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 h-[32px] w-[36px] -translate-x-1/2 -translate-y-1/2 object-contain"
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
  const active = useCycle(inView, reduced, channels.length, 3600, 1);
  const bars = [14, 24, 18, 34, 23, 42, 29, 21, 38, 25, 33, 19, 28, 22, 35, 20, 27];

  return (
    <div className="relative h-full px-5 py-6 sm:px-6 lg:px-7 lg:py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/84">
        <MessageSquareText size={18} color={CORAL} strokeWidth={2.1} />
        Conversations
      </div>

      <div className="mt-7 grid grid-cols-[64px_1fr] gap-4">
        <div className="relative h-[228px] overflow-hidden rounded-[24px] border border-white/[0.11] bg-black/20 px-1.5 py-3">
          <motion.div
            className="absolute left-1.5 right-1.5 h-[58px] rounded-[18px] border"
            animate={{ y: active * 68 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{
              borderColor: `${channels[active].color}70`,
              backgroundColor: `${channels[active].color}0D`,
              boxShadow: `0 0 24px ${channels[active].color}16`,
            }}
          />

          <div className="relative space-y-2.5">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              const selected = active === index;
              return (
                <div key={channel.label} className="flex h-[58px] flex-col items-center justify-center gap-1.5">
                  <Icon size={16} color={selected ? channel.color : "rgba(255,255,255,.34)"} strokeWidth={2} />
                  <span className="text-[9px] font-semibold tracking-[0.05em]" style={{ color: selected ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.36)" }}>
                    {channel.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[22px] border border-white/[0.12] bg-white/[0.04] p-5">
          <div className="pointer-events-none absolute inset-x-[12%] top-[28%] h-[105px] rounded-full blur-[38px]" style={{ background: `radial-gradient(ellipse, ${CORAL}1C 0%, transparent 70%)` }} />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/32">Live conversation</div>
              <motion.div className="mt-1 text-[13px] font-medium text-white/68" animate={{ opacity: [0.72, 1, 0.72] }} transition={{ duration: 3.6, repeat: inView && !reduced ? Infinity : 0, ease: "easeInOut" }}>
                {channels[active].label === "CALL" ? "Call · 00:15" : channels[active].label === "SMS" ? "SMS thread" : "Email reply"}
              </motion.div>
            </div>
            <span className="rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/48">
              {channels[active].label === "CALL" ? "AI Voice" : "AI"}
            </span>
          </div>

          <div className="relative mt-6 h-[94px] overflow-hidden">
            <motion.div
              className="flex h-full w-full"
              animate={{ x: `${-active * 100}%` }}
              transition={{ duration: 0.72, ease: EASE }}
            >
              <div className="flex min-w-full items-center justify-center px-2">
                <div className="w-full space-y-2.5">
                  <div className="ml-auto h-8 w-[78%] rounded-[14px_14px_4px_14px] border border-white/[0.08] bg-white/[0.045]" />
                  <div className="h-8 w-[66%] rounded-[14px_14px_14px_4px] border" style={{ borderColor: `${AMBER}38`, backgroundColor: `${AMBER}0B` }} />
                </div>
              </div>

              <div className="flex min-w-full items-center gap-[4px] px-1">
                {bars.map((height, index) => (
                  <motion.span
                    key={index}
                    className="w-[3px] shrink-0 rounded-full"
                    style={{ backgroundColor: index % 4 === 0 ? CORAL : index % 5 === 0 ? AMBER : "rgba(255,255,255,.30)" }}
                    animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.72] } : { height: height * 0.72 }}
                    transition={{ duration: 1.18, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.045, ease: "easeInOut" }}
                  />
                ))}
              </div>

              <div className="flex min-w-full items-center px-2">
                <div className="w-full rounded-[15px] border border-white/[0.08] bg-black/15 px-4 py-3">
                  <div className="h-2 w-[44%] rounded-full bg-white/[0.16]" />
                  <div className="mt-3 h-2 w-[82%] rounded-full bg-white/[0.08]" />
                  <div className="mt-2 h-2 w-[65%] rounded-full bg-white/[0.08]" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative mt-5 border-t border-white/[0.08] pt-5">
            <div className="text-[16px] font-medium leading-[1.48] text-white/92">
              {active === 0 ? "“Can we move the appointment?”" : active === 1 ? "“We’d like to start in March.”" : "“Can you resend the quote?”"}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/48">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CORAL }} />
              Context updated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const active = useCycle(inView, reduced, 4, 2000, 0);
  const signals = [
    { label: "6 messages", icon: MessageSquareText, color: ROSE, pos: "left-[8%] top-[66px]" },
    { label: "$18k quote", icon: FileText, color: AMBER, pos: "right-[8%] top-[66px]" },
    { label: "4 days quiet", icon: Clock3, color: AMBER, pos: "left-[8%] bottom-[22px]" },
    { label: "Thu 2:30", icon: CalendarDays, color: SAGE, pos: "right-[8%] bottom-[22px]" },
  ];

  return (
    <div className="relative h-full min-h-[390px] overflow-hidden border-x border-white/[0.10] px-5 py-5 lg:min-h-[455px] lg:px-7">
      <div className="absolute left-6 top-6 flex items-center gap-2 text-[18px] font-medium text-white/84">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: AMBER, boxShadow: `0 0 12px ${AMBER}55` }} />
        Context
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 455" preserveAspectRatio="none" aria-hidden="true">
        {[
          { d: "M118 108 C165 120, 185 160, 225 194", color: ROSE },
          { d: "M402 108 C355 120, 335 160, 295 194", color: AMBER },
          { d: "M118 384 C165 355, 185 315, 225 278", color: AMBER },
          { d: "M402 384 C355 355, 335 315, 295 278", color: SAGE },
        ].map((path, index) => (
          <g key={index}>
            <path d={path.d} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
            <motion.path
              d={path.d}
              fill="none"
              stroke={path.color}
              strokeWidth="1.6"
              strokeLinecap="round"
              animate={{ opacity: active === index ? 0.95 : 0.05, pathLength: active === index ? 1 : 0.18 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </g>
        ))}
      </svg>

      {signals.map((signal, index) => {
        const Icon = signal.icon;
        const lit = active === index;
        return (
          <motion.div
            key={signal.label}
            className={`absolute ${signal.pos} flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-[12px] font-medium`}
            animate={{
              opacity: lit ? 1 : 0.58,
              borderColor: lit ? `${signal.color}70` : "rgba(255,255,255,.12)",
              backgroundColor: lit ? `${signal.color}10` : "rgba(255,255,255,.04)",
              boxShadow: lit ? `0 0 20px ${signal.color}12` : "0 0 0 rgba(0,0,0,0)",
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
        className="absolute left-1/2 top-[55%] flex h-[158px] w-[158px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
        animate={{ boxShadow: active === 3 ? `0 0 38px ${SAGE}18` : `0 0 26px ${CORAL}0C` }}
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
  const activeAgent = agents[active];

  const signedDelta = (index: number) => {
    let delta = index - active;
    const half = Math.floor(agents.length / 2);
    if (delta > half) delta -= agents.length;
    if (delta < -half) delta += agents.length;
    return delta;
  };

  return (
    <div className="relative h-full px-5 py-6 sm:px-6 lg:px-7 lg:py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/84">
        <Send size={18} color={CORAL} strokeWidth={2.1} />
        AI Agent
      </div>

      <div className="relative mt-8 h-[290px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-14 bg-gradient-to-b from-[#17181B] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-14 bg-gradient-to-t from-[#17181B] to-transparent" />

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
              <span
                className="h-5 w-5 shrink-0 rounded-full border"
                style={{
                  borderColor: delta === 0 ? agent.color : "rgba(255,255,255,.16)",
                  boxShadow: delta === 0 ? `inset 0 0 0 4px #17181B, 0 0 0 1px ${agent.color}, 0 0 14px ${agent.color}35` : "none",
                  backgroundColor: delta === 0 ? agent.color : "transparent",
                }}
              />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-1 border-t border-white/[0.08] pt-4">
        <div className="flex items-center justify-between gap-4">
          <motion.div key={activeAgent.name} className="text-[16px] font-semibold text-white/92" animate={{ x: [-4, 0], opacity: [0.72, 1] }} transition={{ duration: 0.45, ease: EASE }}>
            Follow up now
          </motion.div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04]">
            <Send size={14} color={CORAL} />
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-white/46">
          {["Sent", "Sarah replied", "Re-engaged"].map((label) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Check size={12} color={SAGE} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopStage({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div
      className="relative hidden overflow-hidden rounded-[34px] border border-white/[0.16] lg:grid lg:grid-cols-[0.82fr_1.32fr_0.92fr]"
      style={{ backgroundColor: STAGE, boxShadow: "0 30px 100px rgba(0,0,0,.30)" }}
    >
      <div
        className="pointer-events-none absolute left-[46%] top-[39%] h-[280px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[76px]"
        style={{ background: `radial-gradient(ellipse, ${CORAL}18 0%, ${ROSE}10 34%, transparent 72%)` }}
      />

      <svg className="pointer-events-none absolute inset-0 z-[2] h-full w-full" viewBox="0 0 1280 455" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="zapla-handoff-strong" x1="0" x2="1">
            <stop offset="0%" stopColor={ROSE} stopOpacity="0" />
            <stop offset="30%" stopColor={CORAL} stopOpacity="0.18" />
            <stop offset="62%" stopColor={CORAL} stopOpacity="0.95" />
            <stop offset="82%" stopColor={AMBER} stopOpacity="0.90" />
            <stop offset="100%" stopColor={CORAL} stopOpacity="0" />
          </linearGradient>
          <filter id="zapla-beam-blur" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {[
          "M738 226 C805 224, 842 217, 922 208",
          "M738 226 C810 235, 850 244, 922 235",
          "M738 226 C810 212, 848 193, 922 183",
          "M738 226 C815 226, 860 226, 934 221",
        ].map((d, index) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={index === 3 ? "url(#zapla-handoff-strong)" : "rgba(233,125,98,.18)"}
            strokeWidth={index === 3 ? 12 : 1}
            strokeLinecap="round"
            filter={index === 3 ? "url(#zapla-beam-blur)" : undefined}
            opacity={index === 3 ? 0.72 : 1}
          />
        ))}

        <motion.path
          d="M738 226 C815 226, 860 226, 934 221"
          fill="none"
          stroke="url(#zapla-handoff-strong)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="56 176"
          animate={inView && !reduced ? { strokeDashoffset: [232, 0] } : { strokeDashoffset: 0 }}
          transition={{ duration: 2.5, repeat: inView && !reduced ? Infinity : 0, ease: "linear" }}
        />
      </svg>

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
      <div
        className="pointer-events-none absolute left-1/2 top-[290px] h-[430px] w-[1040px] -translate-x-1/2 rounded-full blur-[105px]"
        style={{ background: `radial-gradient(ellipse, ${CORAL}1E 0%, ${ROSE}12 34%, transparent 72%)` }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-[980px] text-center">
          <div className="flex items-center justify-center gap-3.5">
            <PulseMark />
            <span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
              ZAPLA{" "}
              <span style={{ color: CORAL, textShadow: `0 0 18px ${CORAL}30` }}>AI</span>
            </span>
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
