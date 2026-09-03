import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Check,
  FileText,
  Layers3,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const BG = "#111214";
const STAGE = "#18191C";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";
const PLUM = "#9B86B8";
const APRICOT = "#D58C75";
const PETALS = [CORAL, ROSE, AMBER, SAGE, PLUM, APRICOT];
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [count, inView, ms, reduced]);
  return index;
}

function RevenueAvatar({ size = 24, cell = 0 }: { size?: number; cell?: number }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return (
    <span
      className="shrink-0 overflow-hidden rounded-full border border-white/[0.12] shadow-[0_5px_14px_rgba(0,0,0,.22)]"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        backgroundColor: "#B98278",
      }}
      aria-hidden="true"
    />
  );
}

function PetalFlower({ size = 68, filled = 6, mono }: { size?: number; filled?: number; mono?: string }) {
  const colors = mono ? PETALS.map(() => mono) : PETALS;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="shrink-0 overflow-visible">
      {colors.map((color, index) => (
        <g key={`${color}-${index}`} transform={`rotate(${index * 60} 80 80)`}>
          <motion.path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            initial={false}
            animate={{
              fill: index < filled ? color : "#48494D",
              stroke: index < filled ? color : "#68696E",
              opacity: 1,
            }}
            transition={{ duration: 0.58, ease: EASE }}
            strokeWidth="1.4"
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="#111214" stroke="rgba(255,255,255,.08)" />
    </svg>
  );
}

function TinyFlowerAvatar({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full border"
      style={{ width: size, height: size, borderColor: `${color}55`, backgroundColor: "#232428" }}
    >
      <PetalFlower size={size * 0.82} filled={6} mono={color} />
    </span>
  );
}

function channelDelta(index: number, active: number, count: number) {
  let delta = index - active;
  const half = Math.floor(count / 2);
  if (delta > half) delta -= count;
  if (delta < -half) delta += count;
  return delta;
}

function TerritoryHeading({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  const subtitle = {
    Conversations: "Every interaction, captured.",
    Context: "Everything it needs to know.",
    "AI Agent": "The right follow-up, handled.",
  }[label];

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2.5 text-[18px] font-medium text-white/90">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      {subtitle && <div className="mt-1.5 text-[11px] leading-none text-white/38">{subtitle}</div>}
    </div>
  );
}

function ConversationVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const channels = [
    { label: "SMS", icon: MessageSquareText, color: AMBER, quote: "Just following up on the quote." },
    { label: "CALL", icon: Phone, color: CORAL, quote: "We’d like to start in March." },
    { label: "EMAIL", icon: Mail, color: ROSE, quote: "Can we lock in Thursday?" },
    { label: "SOCIAL", icon: MessageSquareText, color: SAGE, quote: "Hi, do you service my area?" },
  ];
  const active = useCycle(inView, reduced, channels.length, 3600, 1);
  const current = channels[active];
  const bars = [25, 42, 31, 56, 38, 64, 45, 34, 59, 40, 53, 29, 47, 35, 51, 30, 43];

  return (
    <div className="relative h-full px-6 py-7 lg:px-7">
      <TerritoryHeading icon={<MessageSquareText size={18} strokeWidth={2.1} />} label="Conversations" color={CORAL} />

      <div className="mt-8 grid grid-cols-[54px_1fr] gap-4">
        <div className="relative h-[334px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#151619] px-1.5 py-2">
          <motion.div
            className="absolute left-1.5 right-1.5 top-2 h-[77px] rounded-[16px] border"
            animate={{ y: active * 79 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{ borderColor: `${current.color}68`, backgroundColor: `${current.color}0E`, boxShadow: `inset 0 0 22px ${current.color}0E` }}
          />
          <div className="relative z-10 grid h-full grid-rows-4">
            {channels.map((channel, index) => {
              const Icon = channel.icon;
              const selected = index === active;
              return (
                <div key={channel.label} className="flex flex-col items-center justify-center gap-1.5">
                  <Icon size={16} color={selected ? channel.color : "rgba(255,255,255,.38)"} />
                  <span className="text-[8px] font-semibold tracking-[0.04em]" style={{ color: selected ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.40)" }}>
                    {channel.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="relative h-[334px] overflow-hidden rounded-[24px] border p-5"
          style={{
            borderColor: "rgba(233,125,98,.44)",
            background: `radial-gradient(circle at 56% 26%, rgba(233,125,98,.15) 0%, transparent 40%), linear-gradient(180deg, #202126, #1B1C20)`,
            boxShadow: "0 0 0 1px rgba(233,125,98,.10), 0 0 28px rgba(233,125,98,.10), inset 0 1px 0 rgba(255,255,255,.045), inset 0 0 46px rgba(233,125,98,.035)",
          }}
        >
          <div className="relative flex items-center justify-end gap-1.5 text-[12px] font-semibold tracking-[0.02em]" style={{ color: CORAL }}>
            <Sparkles size={14} strokeWidth={2.1} />
            AI
          </div>

          <div className="relative mt-4 h-[138px] overflow-hidden">
            {channels.map((channel, index) => {
              const delta = channelDelta(index, active, channels.length);
              return (
                <motion.div
                  key={channel.label}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: delta * 142, opacity: Math.abs(delta) > 1 ? 0 : delta === 0 ? 1 : 0.10 }}
                  transition={{ duration: 0.68, ease: EASE }}
                >
                  {channel.label === "CALL" ? (
                    <div className="flex h-[104px] items-center justify-center gap-[5px]">
                      {bars.map((height, barIndex) => (
                        <motion.span
                          key={barIndex}
                          className="w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: barIndex % 5 === 0 ? channel.color : "rgba(255,255,255,.34)" }}
                          animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.68] } : { height: height * 0.72 }}
                          transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: barIndex * 0.04, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  ) : channel.label === "EMAIL" ? (
                    <div className="w-full rounded-[16px] border border-white/[0.10] bg-[#17181B] p-4">
                      <div className="flex items-center gap-2 text-[10px] text-white/50"><Mail size={13} color={channel.color} /> New enquiry</div>
                      <div className="mt-4 h-1.5 w-[72%] rounded-full bg-white/[0.16]" />
                      <div className="mt-2.5 h-1.5 w-[88%] rounded-full bg-white/[0.10]" />
                      <div className="mt-2.5 h-1.5 w-[58%] rounded-full bg-white/[0.10]" />
                    </div>
                  ) : (
                    <div className="w-full space-y-3">
                      <div className="ml-auto flex max-w-[86%] items-center gap-2 rounded-[15px] border border-white/[0.09] bg-[#25262A] px-3 py-2.5 text-[10px] leading-[1.4] text-white/70">
                        <RevenueAvatar size={22} cell={0} />
                        <span>{channel.label === "SOCIAL" ? "Saw your work on Instagram." : "Hi, just checking in."}</span>
                      </div>
                      <div className="flex max-w-[82%] items-center gap-2 rounded-[15px] border px-3 py-2.5 text-[10px] leading-[1.4] text-white/90" style={{ borderColor: `${channel.color}42`, backgroundColor: `${channel.color}10` }}>
                        <span className="flex-1">{channel.label === "SOCIAL" ? "Do you service my area?" : "Can we move forward this week?"}</span>
                        <TinyFlowerAvatar color={channel.color} size={22} />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-3 border-t border-white/[0.09] pt-5">
            <div className="relative h-[50px] overflow-hidden">
              {channels.map((channel, index) => {
                const delta = channelDelta(index, active, channels.length);
                return (
                  <motion.div
                    key={channel.quote}
                    className="absolute inset-x-0 top-0 max-w-[280px] text-[17px] font-medium leading-[1.42] text-white/95"
                    animate={{ y: delta * 54, opacity: delta === 0 ? 1 : 0 }}
                    transition={{ duration: 0.58, ease: EASE }}
                  >
                    “{channel.quote}”
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-white/52">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: current.color }} />
              Captured as context
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ArtifactKind = "conversation" | "quote" | "appointment" | "pipeline" | "transcript" | "contact";
type ContextArtifact = { kind: ArtifactKind; color: string; x: number; y: number; width: number; height: number };

function ArtifactSurface({ artifact }: { artifact: ContextArtifact }) {
  if (artifact.kind === "conversation") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><MessageSquareText size={13} color={artifact.color} /> Conversation</div>
        <div className="mt-3 space-y-2.5">
          <div className="flex items-center gap-2">
            <RevenueAvatar size={24} cell={0} />
            <div className="max-w-[120px] rounded-[10px] bg-[#28292D] px-2.5 py-1.5 text-[8px] leading-[1.35] text-white/78">Can we start in March?</div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="max-w-[116px] rounded-[10px] px-2.5 py-1.5 text-right text-[8px] leading-[1.35] text-white/86" style={{ backgroundColor: `${artifact.color}18` }}>Absolutely. I’ll check.</div>
            <TinyFlowerAvatar color={artifact.color} size={24} />
          </div>
        </div>
      </>
    );
  }

  if (artifact.kind === "quote") {
    return (
      <>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><FileText size={13} color={artifact.color} /> Quote</div>
          <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: `${artifact.color}18` }}><Check size={11} color={artifact.color} strokeWidth={2.4} /></span>
        </div>
        <div className="mt-3 text-[21px] font-semibold tracking-[-0.04em] text-white/94">$18,000</div>
        <div className="mt-3 overflow-hidden rounded-[9px] border border-white/[0.06] bg-[#191A1D] px-2.5 py-2.5">
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded-full bg-white/[0.14]" />
            <div className="h-1.5 w-[78%] rounded-full bg-white/[0.09]" />
            <div className="h-1.5 w-[60%] rounded-full bg-white/[0.07]" />
          </div>
        </div>
      </>
    );
  }

  if (artifact.kind === "appointment") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><CalendarDays size={13} color={artifact.color} /> Appointment</div>
        <div className="mt-3 flex items-center gap-3">
          <div className="rounded-[11px] border border-white/[0.10] bg-[#17181B] px-3 py-2 text-center">
            <div className="text-[7px] uppercase tracking-[0.10em] text-white/38">THU</div>
            <div className="mt-0.5 text-[17px] font-semibold text-white/90">2:30</div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: `${artifact.color}30` }} />
            <div className="h-1.5 w-[70%] rounded-full bg-white/[0.09]" />
          </div>
        </div>
      </>
    );
  }

  if (artifact.kind === "pipeline") {
    const stages = ["New", "Quote", "Follow up"];
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><Send size={13} color={artifact.color} /> Pipeline</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className="rounded-[10px] border px-2 py-2"
              style={{
                borderColor: index === 1 ? `${artifact.color}70` : "rgba(255,255,255,.08)",
                backgroundColor: index === 1 ? `${artifact.color}0D` : "#191A1D",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full border" style={{ borderColor: index === 1 ? artifact.color : "rgba(255,255,255,.22)", backgroundColor: index === 1 ? artifact.color : "transparent" }} />
                <span className="truncate text-[6px] text-white/48">{stage}</span>
              </div>
              <div className="mt-2 space-y-1.5">
                <div className="h-1 w-full rounded-full bg-white/[0.11]" />
                <div className="h-1 w-[70%] rounded-full bg-white/[0.07]" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (artifact.kind === "transcript") {
    const transcriptBars = [10,18,14,25,13,22,16,28,12,20,26,15,23,18,27,13,21,16,24,11,19,14];
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><Phone size={13} color={artifact.color} /> Call transcript</div>
        <div className="mt-4 grid h-[32px] w-full grid-cols-[repeat(22,minmax(0,1fr))] items-center gap-[2px]">
          {transcriptBars.map((height, index) => (
            <span key={index} className="w-full rounded-full" style={{ height, backgroundColor: index % 4 === 0 ? artifact.color : "rgba(255,255,255,.28)" }} />
          ))}
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.12]" />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><UserRound size={13} color={artifact.color} /> Contact record</div>
      <div className="mt-3 flex items-center gap-3">
        <RevenueAvatar size={32} cell={0} />
        <div className="flex-1">
          <div className="h-1.5 w-[76%] rounded-full bg-white/[0.14]" />
          <div className="mt-2 h-1.5 w-[54%] rounded-full bg-white/[0.08]" />
          <div className="mt-2 flex gap-1.5">
            {['IG', 'FB', 'Social'].map((chip) => (
              <span key={chip} className="rounded-full bg-[#28292D] px-2 py-0.5 text-[7px] text-white/50">{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const step = useCycle(inView, reduced, 10, 1100, 0);
  const filled = step <= 6 ? step : step === 7 ? 6 : 0;
  const spinTarget = step === 7 ? 360 : 0;

  const artifacts: ContextArtifact[] = [
    { kind: "conversation", color: ROSE, x: -174, y: -128, width: 180, height: 118 },
    { kind: "quote", color: AMBER, x: 174, y: -128, width: 148, height: 112 },
    { kind: "transcript", color: CORAL, x: -184, y: 0, width: 166, height: 108 },
    { kind: "contact", color: PLUM, x: 184, y: 0, width: 168, height: 108 },
    { kind: "appointment", color: SAGE, x: -164, y: 126, width: 150, height: 106 },
    { kind: "pipeline", color: CORAL, x: 164, y: 126, width: 174, height: 110 },
  ];

  const isAbsorbed = (index: number) => {
    if (step >= 1 && step <= 6) return index < Math.min(step, 6);
    return false;
  };

  return (
    <div className="relative h-full overflow-hidden border-x border-white/[0.085] px-6 py-7">
      <TerritoryHeading icon={<Layers3 size={18} strokeWidth={2.1} />} label="Context" color={AMBER} />

      <div className="absolute left-1/2 top-[55%] h-[410px] w-[560px] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[278px] w-[278px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

        <motion.div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: spinTarget }}
          transition={{ duration: step === 7 ? 0.95 : 0, ease: EASE }}
        >
          <PetalFlower size={142} filled={filled} />
        </motion.div>

        {artifacts.map((artifact, index) => {
          const absorbed = isAbsorbed(index);
          const releasing = step === 7;
          return (
            <motion.div
              key={artifact.kind}
              className="absolute left-1/2 top-1/2 z-20 rounded-[18px] border border-white/[0.12] px-3.5 py-3"
              initial={false}
              animate={{
                x: absorbed ? 0 : artifact.x,
                y: absorbed ? 0 : artifact.y,
                scale: absorbed ? 0.10 : 1,
                opacity: absorbed ? 0 : 1,
              }}
              transition={{ duration: releasing ? 0.86 : 0.88, ease: EASE }}
              style={{
                width: artifact.width,
                height: artifact.height,
                marginLeft: -artifact.width / 2,
                marginTop: -artifact.height / 2,
                background: `radial-gradient(circle at 28% 18%, ${artifact.color}14 0%, transparent 44%), linear-gradient(180deg, #202126, #1B1C20)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,.04), inset 0 -24px 50px ${artifact.color}08, 0 14px 32px rgba(0,0,0,.14)`,
              }}
            >
              <ArtifactSurface artifact={artifact} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AgentFlowerAvatar({ color, hollow = false }: { color: string; hollow?: boolean }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
      style={{
        borderColor: hollow ? "rgba(255,255,255,.18)" : `${color}4A`,
        backgroundColor: "#25262A",
      }}
    >
      <PetalFlower size={27} filled={hollow ? 0 : 6} mono={hollow ? undefined : color} />
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
    { name: "Custom Follow Up", color: APRICOT },
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
      <TerritoryHeading icon={<Send size={18} strokeWidth={2.1} />} label="AI Agent" color={CORAL} />

      <div className="relative mt-10 h-[330px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-16 bg-gradient-to-b from-[#18191C] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-gradient-to-t from-[#18191C] to-transparent" />

        {agents.map((agent, index) => {
          const delta = signedDelta(index);
          const distance = Math.abs(delta);
          const visible = distance <= 2;
          const selected = delta === 0;

          return (
            <motion.div
              key={agent.name}
              className="absolute left-1/2 top-1/2 flex h-[66px] w-[88%] -translate-x-1/2 items-center gap-3 rounded-[22px] border px-4"
              animate={{
                y: delta * 48 - 33,
                x: distance * 10,
                scale: selected ? 1 : 0.95 - distance * 0.018,
                opacity: visible ? (selected ? 1 : 0.72 - distance * 0.10) : 0,
                borderColor: selected ? `${agent.color}72` : "rgba(255,255,255,.085)",
                backgroundColor: selected ? "#232428" : "#1D1E22",
                boxShadow: selected ? `0 14px 30px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.035), 0 0 16px ${agent.color}0A` : "0 10px 22px rgba(0,0,0,.16)",
              }}
              transition={{ duration: 0.72, ease: EASE }}
              style={{ zIndex: 20 - distance }}
            >
              <AgentFlowerAvatar color={agent.color} hollow={agent.name === "Custom Follow Up"} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color: selected ? "rgba(255,255,255,.97)" : "rgba(255,255,255,.66)" }}>
                {agent.name}
              </span>
              <span
                className="h-[19px] w-[19px] shrink-0 rounded-full border"
                style={{
                  borderColor: selected ? `${agent.color}B0` : "rgba(255,255,255,.13)",
                  boxShadow: selected ? `inset 0 0 0 4px #232428, 0 0 0 1px ${agent.color}66` : "none",
                  backgroundColor: selected ? agent.color : "transparent",
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
      className="relative hidden h-[500px] overflow-hidden rounded-[34px] border border-white/[0.16] lg:grid lg:grid-cols-[0.84fr_1.40fr_0.92fr]"
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
      <div className="h-[540px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ContextVisual inView={inView} reduced={reduced} /></div>
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
            <PetalFlower size={68} filled={6} />
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

        <div
          className="pointer-events-none absolute left-1/2 top-[304px] h-[270px] w-[1100px] -translate-x-1/2 rounded-[50%] blur-[58px]"
          style={{ background: `radial-gradient(ellipse at center, ${CORAL}42 0%, ${ROSE}2B 34%, ${AMBER}15 56%, transparent 78%)` }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[380px] h-[132px] w-[820px] -translate-x-1/2 rounded-[50%] blur-[34px]"
          style={{ background: `radial-gradient(ellipse at center, rgba(255,255,255,.08) 0%, ${CORAL}22 37%, transparent 75%)` }}
        />

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <DesktopStage inView={inView} reduced={reduced} />
          <MobileStage inView={inView} reduced={reduced} />
        </div>
      </div>
    </section>
  );
}

export default ZaplaAIConversationsV6;
