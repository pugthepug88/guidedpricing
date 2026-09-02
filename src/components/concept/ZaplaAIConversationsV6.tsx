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
const STAGE = "#0C0D0F";
const INNER = "#111215";
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

function SectionPill({ label, color }: { label: string; color: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/72" style={{ fontFamily: MONO }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}

function ConversationTerritory({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const cycle = useCycle(inView, reduced, 4, 2600, 0);
  const sequence = [0, 1, 2, 1] as const;
  const selected = sequence[cycle] ?? 0;
  const channels = [
    { label: "CALL", icon: Phone, color: CORAL },
    { label: "SMS", icon: MessageSquareText, color: AMBER },
    { label: "EMAIL", icon: Mail, color: ROSE },
  ];
  const bars = [18, 31, 22, 42, 28, 55, 35, 24, 47, 29, 39, 20, 31, 25];

  return (
    <div className="relative min-h-[470px] px-5 py-6 sm:px-7 sm:py-7 lg:min-h-[520px]">
      <div className="flex items-center justify-between gap-4">
        <SectionPill label="AI Voice" color={CORAL} />
        <span className="text-[10px] font-medium text-white/28">Calls · SMS · Email</span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-[92px_1fr] lg:grid-cols-[86px_1fr]">
        <div className="relative h-[226px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/20 px-2 py-4">
          <motion.div
            className="absolute left-2 right-2 h-[58px] rounded-[18px] border"
            animate={{ y: selected * 66 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ borderColor: `${channels[selected].color}70`, backgroundColor: `${channels[selected].color}10`, boxShadow: `0 0 26px ${channels[selected].color}12` }}
          />
          <div className="relative space-y-2">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div key={channel.label} className="flex h-[58px] flex-col items-center justify-center gap-1.5">
                  <Icon size={16} color={index === selected ? channel.color : "rgba(255,255,255,.34)"} strokeWidth={2} />
                  <span className="text-[9px] font-semibold tracking-[0.08em]" style={{ color: index === selected ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.38)", fontFamily: MONO }}>
                    {channel.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/32" style={{ fontFamily: MONO }}>Conversation</div>
              <div className="mt-1 text-[14px] font-medium text-white/76">Call · 00:15</div>
            </div>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CORAL, boxShadow: `0 0 12px ${CORAL}` }} />
          </div>

          <div className="mt-6 flex h-[62px] items-center gap-[4px]">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] rounded-full"
                style={{ backgroundColor: index % 4 === 0 ? CORAL : "rgba(255,255,255,.26)" }}
                animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.7] } : { height: height * 0.7 }}
                transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: index * 0.045, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="mt-6 rounded-[16px] border border-white/[0.07] bg-black/15 px-4 py-4">
            <div className="text-[15px] font-medium leading-[1.55] text-white/88">Sarah is asking about moving the March start date.</div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-white/38">
              <Check size={13} color={SAGE} strokeWidth={2.3} />
              AI understood
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-[12px] leading-[1.65] text-white/38">
        The conversation stays attached to the customer instead of becoming another disconnected message.
      </div>
    </div>
  );
}

function ContextTerritory({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const active = useCycle(inView, reduced, 4, 1700, 0);
  const signals = [
    { label: "6 messages", color: AMBER, icon: MessageSquareText, position: "left-1/2 top-[40px] -translate-x-1/2" },
    { label: "$18k quote", color: ROSE, icon: FileText, position: "left-[10px] top-1/2 -translate-y-1/2" },
    { label: "4 days quiet", color: AMBER, icon: Clock3, position: "right-[10px] top-1/2 -translate-y-1/2" },
    { label: "Thu 2:30", color: SAGE, icon: CalendarDays, position: "bottom-[36px] left-1/2 -translate-x-1/2" },
  ];

  return (
    <div className="relative min-h-[470px] px-5 py-6 sm:px-7 sm:py-7 lg:min-h-[520px]">
      <div className="flex items-center justify-center">
        <SectionPill label="Context" color={AMBER} />
      </div>

      <div className="relative mx-auto mt-5 h-[360px] max-w-[390px]">
        <div className="absolute left-1/2 top-1/2 h-[238px] w-[238px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.065]" />
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />

        <div className="absolute left-1/2 top-[95px] h-[55px] w-px -translate-x-1/2 bg-gradient-to-b from-white/5 to-white/20" />
        <div className="absolute bottom-[91px] left-1/2 h-[55px] w-px -translate-x-1/2 bg-gradient-to-t from-white/5 to-white/20" />
        <div className="absolute left-[91px] top-1/2 h-px w-[62px] -translate-y-1/2 bg-gradient-to-r from-white/5 to-white/20" />
        <div className="absolute right-[91px] top-1/2 h-px w-[62px] -translate-y-1/2 bg-gradient-to-l from-white/5 to-white/20" />

        <motion.div
          className="absolute left-1/2 top-1/2 flex h-[142px] w-[142px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center"
          animate={{ borderColor: active === 3 ? `${SAGE}66` : "rgba(255,255,255,.13)", boxShadow: active === 3 ? `0 0 34px ${SAGE}12` : "0 0 0 rgba(0,0,0,0)" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ background: "radial-gradient(circle at 45% 35%, rgba(255,255,255,.075), rgba(255,255,255,.025) 58%, transparent 100%)" }}
        >
          <UserRound size={20} color={active === 3 ? SAGE : "rgba(255,255,255,.62)"} strokeWidth={2.1} />
          <div className="mt-2 text-[25px] font-semibold tracking-[-0.045em] text-white">Sarah</div>
          <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/30" style={{ fontFamily: MONO }}>Customer context</div>
        </motion.div>

        {signals.map((signal, index) => {
          const Icon = signal.icon;
          const lit = index === active;
          return (
            <motion.div
              key={signal.label}
              className={`absolute ${signal.position} flex items-center gap-2 rounded-full border px-3 py-2.5 text-[11px] font-semibold`}
              animate={{
                opacity: lit ? 1 : 0.62,
                scale: lit ? 1.035 : 1,
                borderColor: lit ? `${signal.color}58` : "rgba(255,255,255,.085)",
                backgroundColor: lit ? `${signal.color}0D` : "rgba(255,255,255,.025)",
                boxShadow: lit ? `0 0 22px ${signal.color}10` : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.55, ease: EASE }}
              style={{ color: lit ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.62)" }}
            >
              <Icon size={13} color={signal.color} strokeWidth={2.1} />
              {signal.label}
            </motion.div>
          );
        })}
      </div>

      <div className="mx-auto max-w-[360px] text-center text-[12px] leading-[1.65] text-white/38">
        Conversation history, opportunity data, activity and availability stay connected to the same person.
      </div>
    </div>
  );
}

function AgentAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold tracking-[0.04em]" style={{ borderColor: `${color}55`, backgroundColor: `${color}12`, color }}>
      {initials}
    </span>
  );
}

function AgentTerritory({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const agents = [
    { name: "Stalled Deal Follow Up", initials: "SD", color: CORAL },
    { name: "No Show Follow Up", initials: "NS", color: AMBER },
    { name: "Social Follow Up", initials: "SO", color: ROSE },
    { name: "Sales Follow Up", initials: "SA", color: CORAL },
    { name: "Lead Scoring", initials: "LS", color: SAGE },
    { name: "Custom Follow Up", initials: "+", color: AMBER },
  ];

  const otherAgents = agents.slice(1);

  return (
    <div className="relative min-h-[470px] px-5 py-6 sm:px-7 sm:py-7 lg:min-h-[520px]">
      <div className="flex items-center justify-between gap-4">
        <SectionPill label="AI Agent" color={ROSE} />
        <span className="text-[10px] font-medium text-white/28">Chooses and acts</span>
      </div>

      <div className="mt-7 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.022] p-3.5">
          <div className="rounded-[16px] border px-3 py-3.5" style={{ borderColor: `${CORAL}55`, backgroundColor: `${CORAL}0D`, boxShadow: `0 0 30px ${CORAL}0A` }}>
            <div className="flex items-center gap-3">
              <AgentAvatar initials={agents[0].initials} color={agents[0].color} />
              <div>
                <div className="text-[12px] font-semibold text-white/90">{agents[0].name}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/30" style={{ fontFamily: MONO }}>Selected for Sarah</div>
              </div>
            </div>
          </div>

          <div className="mt-2 border-t border-white/[0.06] pt-2">
            <div className="mb-1 px-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/24" style={{ fontFamily: MONO }}>Other agents</div>
            <div className="relative h-[192px] overflow-hidden">
              <motion.div
                animate={inView && !reduced ? { y: [0, -76, 0] } : { y: 0 }}
                transition={inView && !reduced ? { duration: 11, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                className="space-y-1.5"
              >
                {otherAgents.map((agent) => (
                  <div key={agent.name} className="flex h-[42px] items-center gap-2.5 rounded-[13px] border border-white/[0.055] bg-black/10 px-2.5">
                    <AgentAvatar initials={agent.initials} color={agent.color} />
                    <span className="text-[11px] font-medium text-white/56">{agent.name}</span>
                  </div>
                ))}
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-gradient-to-b from-[#0D0E10] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0D0E10] to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-[20px] border px-4 py-4" style={{ borderColor: `${CORAL}45`, backgroundColor: `${CORAL}0B` }}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${CORAL}18` }}>
                <Send size={17} color={CORAL} strokeWidth={2.1} />
              </span>
              <div>
                <div className="text-[17px] font-semibold tracking-[-0.03em] text-white">Follow up now</div>
                <div className="mt-0.5 text-[10px] text-white/34">Best next action</div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.022] px-4 py-3">
            {[
              ["Follow-up sent", "Just now", CORAL],
              ["Sarah replied", "Thursday works", SAGE],
              ["Opportunity", "Re-engaged", SAGE],
            ].map(([label, detail, color], index) => (
              <div key={label} className={`flex items-center justify-between gap-3 py-3 ${index < 2 ? "border-b border-white/[0.06]" : ""}`}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border" style={{ borderColor: `${color}35`, backgroundColor: `${color}0A` }}>
                    <Check size={12} color={color} strokeWidth={2.5} />
                  </span>
                  <span className="text-[12px] font-medium text-white/72">{label}</span>
                </div>
                <span className="text-[10px] text-white/32">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HandoffPulse({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute left-[61.5%] top-[57%] z-20 hidden h-[3px] w-[7.5%] -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.055] lg:block">
      <motion.div
        className="absolute inset-y-0 left-[-34%] w-[38%] rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${CORAL}, ${AMBER}, transparent)`, boxShadow: `0 0 14px ${CORAL}66` }}
        animate={inView && !reduced ? { x: ["0%", "350%"] } : { x: "350%" }}
        transition={inView && !reduced ? { duration: 2.2, repeat: Infinity, ease: "linear" } : { duration: 0 }}
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
      <div className="pointer-events-none absolute left-1/2 top-[270px] h-[420px] w-[min(960px,92vw)] -translate-x-1/2 rounded-full bg-white/[0.015] blur-3xl" />

      <div className="relative mx-auto max-w-[1260px]">
        <header className="mx-auto max-w-[920px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: CORAL, fontFamily: MONO }}>Zapla AI</div>
          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">
            Turn every conversation into the next action.
          </h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/60 sm:text-[18px]">
            Conversations become context. Context becomes a decision. Zapla follows through.
          </p>
        </header>

        <div
          className="relative mt-16 overflow-hidden rounded-[30px] border border-white/[0.11] lg:mt-20"
          style={{ backgroundColor: STAGE, boxShadow: "0 34px 100px rgba(0,0,0,.28)" }}
        >
          <div className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#E97D6266] to-transparent" />
          <HandoffPulse inView={inView} reduced={reduced} />

          <div className="grid lg:grid-cols-[0.95fr_1fr_1.18fr]">
            <div className="border-b border-white/[0.07] lg:border-b-0 lg:border-r">
              <ConversationTerritory inView={inView} reduced={reduced} />
            </div>
            <div className="border-b border-white/[0.07] lg:border-b-0 lg:border-r">
              <ContextTerritory inView={inView} reduced={reduced} />
            </div>
            <AgentTerritory inView={inView} reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
