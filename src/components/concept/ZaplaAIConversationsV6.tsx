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
        src="/concept/zapla-mark-white.png"
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 z-10 h-[31px] w-[31px] -translate-x-1/2 -translate-y-1/2 object-contain"
      />
    </div>
  );
}

function ConversationVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const bars = [17, 29, 22, 38, 28, 48, 34, 25, 43, 31, 39, 23, 35, 27, 41, 24, 32];

  return (
    <div className="relative h-full px-5 py-6 sm:px-6 lg:px-7 lg:py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/82">
        <MessageSquareText size={18} color={CORAL} strokeWidth={2.1} />
        Conversations
      </div>

      <div className="mt-8 grid grid-cols-[78px_1fr] gap-4">
        <div className="relative rounded-[28px] border border-white/[0.13] bg-black/20 p-2">
          <div className="flex h-[66px] flex-col items-center justify-center gap-1.5 text-white/34">
            <MessageSquareText size={17} />
            <span className="text-[10px] font-medium">SMS</span>
          </div>

          <motion.div
            className="flex h-[72px] flex-col items-center justify-center gap-1.5 rounded-[22px] border text-white"
            style={{
              borderColor: `${CORAL}86`,
              backgroundColor: `${CORAL}13`,
              boxShadow: `0 0 30px ${CORAL}1D`,
            }}
            animate={inView && !reduced ? { boxShadow: [`0 0 18px ${CORAL}10`, `0 0 34px ${CORAL}28`, `0 0 18px ${CORAL}10`] } : undefined}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Phone size={18} color={CORAL} />
            <span className="text-[10px] font-semibold">CALL</span>
          </motion.div>

          <div className="flex h-[66px] flex-col items-center justify-center gap-1.5 text-white/34">
            <Mail size={17} />
            <span className="text-[10px] font-medium">EMAIL</span>
          </div>
        </div>

        <div className="rounded-[22px] border border-white/[0.13] bg-white/[0.045] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/34">Live conversation</div>
              <div className="mt-1 text-[13px] font-medium text-white/66">Call · 00:15</div>
            </div>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/46">
              AI Voice
            </span>
          </div>

          <div className="mt-6 flex h-[78px] items-center gap-[4px] overflow-hidden">
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

          <div className="mt-6 border-t border-white/[0.08] pt-5">
            <div className="text-[16px] font-medium leading-[1.5] text-white/92">“We’d like to start in March.”</div>
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
  const active = useCycle(inView, reduced, 4, 2000, 0);
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
        {[
          { d: "M118 75 C165 95, 185 145, 225 184", color: ROSE },
          { d: "M402 75 C355 95, 335 145, 295 184", color: AMBER },
          { d: "M118 380 C165 355, 185 307, 225 270", color: AMBER },
          { d: "M402 380 C355 355, 335 307, 295 270", color: SAGE },
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
        className="absolute left-1/2 top-1/2 flex h-[158px] w-[158px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-center"
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

function AgentAvatar({ color, label }: { color: string; label: string }) {
  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold tracking-[0.02em]"
      style={{
        borderColor: `${color}66`,
        background: `radial-gradient(circle at 35% 28%, ${color}66, ${color}20 50%, rgba(255,255,255,.03) 100%)`,
        color: "rgba(255,255,255,.92)",
      }}
    >
      {initials}
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
  const active = useCycle(inView, reduced, agents.length, 2400, 0);
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
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/82">
        <Send size={18} color={CORAL} strokeWidth={2.1} />
        AI Agent
      </div>

      <div className="relative mt-6 h-[282px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#17181B] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#17181B] to-transparent" />

        {agents.map((agent, index) => {
          const delta = signedDelta(index);
          const distance = Math.abs(delta);
          const visible = distance <= 2;

          return (
            <motion.div
              key={agent.name}
              className="absolute left-1/2 top-1/2 flex h-[62px] w-[86%] -translate-x-1/2 items-center gap-3 rounded-[22px] border px-4"
              animate={{
                y: delta * 43 - 31,
                x: distance * 9,
                scale: delta === 0 ? 1 : 0.95 - distance * 0.02,
                opacity: visible ? (delta === 0 ? 1 : 0.42 - distance * 0.09) : 0,
                borderColor: delta === 0 ? `${agent.color}88` : "rgba(255,255,255,.09)",
                backgroundColor: delta === 0 ? `${agent.color}11` : "rgba(255,255,255,.025)",
                boxShadow: delta === 0 ? `0 12px 32px rgba(0,0,0,.28), 0 0 24px ${agent.color}14` : "0 10px 24px rgba(0,0,0,.16)",
              }}
              transition={{ duration: 0.68, ease: EASE }}
              style={{ zIndex: 20 - distance }}
            >
              <AgentAvatar color={agent.color} label={agent.name} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color: delta === 0 ? "rgba(255,255,255,.96)" : "rgba(255,255,255,.58)" }}>
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

      <div className="border-t border-white/[0.08] pt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">Best next action</div>
            <motion.div
              key={activeAgent.name}
              className="mt-1 text-[16px] font-semibold text-white/92"
              animate={{ opacity: [0.65, 1] }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              Follow up now
            </motion.div>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.04]">
            <Send size={15} color={CORAL} />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-white/44">
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
        className="pointer-events-none absolute left-[46%] top-[38%] h-[260px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
        style={{ background: `radial-gradient(ellipse, ${CORAL}16 0%, ${ROSE}0F 34%, transparent 72%)` }}
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

      <div className="relative z-10">
        <ConversationVisual inView={inView} reduced={reduced} />
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
        <ConversationVisual inView={inView} reduced={reduced} />
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
        className="pointer-events-none absolute left-1/2 top-[290px] h-[430px] w-[1040px] -translate-x-1/2 rounded-full blur-[105px]"
        style={{ background: `radial-gradient(ellipse, ${CORAL}1E 0%, ${ROSE}12 34%, transparent 72%)` }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-[980px] text-center">
          <div className="flex items-center justify-center gap-3.5">
            <PulseMark />
            <span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
              ZAPLA{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${CORAL}, ${AMBER} 48%, ${ROSE})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                AI
              </span>
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
