import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  FileText,
  Layers3,
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
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";
const PLUM = "#9B86B8";
const PETALS = [CORAL, ROSE, AMBER, SAGE, PLUM, "#D58C75"];

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(initial);

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [count, inView, ms, reduced]);

  return index;
}

function FlowerGlyph({ color, size = 28 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="overflow-visible">
      {[0, 60, 120, 180, 240, 300].map((rotate) => (
        <path
          key={rotate}
          d="M32 5 C39 5 43 11 42 18 C41 25 37 30 32 35 C27 30 23 25 22 18 C21 11 25 5 32 5 Z"
          fill={color}
          transform={`rotate(${rotate} 32 32)`}
        />
      ))}
    </svg>
  );
}

function FlowerMark({ size = 68, filled = 6 }: { size?: number; filled?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="shrink-0 overflow-visible">
      <defs>
        <filter id={`petal-soft-${size}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      {PETALS.map((color, index) => (
        <g key={`${color}-${index}`} transform={`rotate(${index * 60} 80 80)`}>
          <motion.path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            initial={false}
            animate={{
              fill: index < filled ? color : "rgba(255,255,255,0.012)",
              stroke: index < filled ? `${color}C8` : "rgba(255,255,255,0.19)",
            }}
            transition={{ duration: 0.72, ease: EASE }}
            strokeWidth="1.5"
          />
          {index < filled && (
            <path
              d="M80 20 C91 20 97 29 95 41 C93 52 88 61 80 69 C72 61 67 52 65 41 C63 29 69 20 80 20 Z"
              fill={color}
              opacity="0.13"
              filter={`url(#petal-soft-${size})`}
            />
          )}
        </g>
      ))}
      <circle cx="80" cy="80" r="15" fill="rgba(17,18,20,.94)" stroke="rgba(255,255,255,.08)" />
    </svg>
  );
}

function channelDelta(index: number, active: number, count: number) {
  let delta = index - active;
  const half = Math.floor(count / 2);
  if (delta > half) delta -= count;
  if (delta < -half) delta += count;
  return delta;
}

function ConversationVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const channels = [
    { label: "SMS", icon: MessageSquareText, color: AMBER, meta: "SMS · New reply", quote: "Just following up on the quote.", tag: "AI Messaging" },
    { label: "CALL", icon: Phone, color: CORAL, meta: "Call · 00:15", quote: "We’d like to start in March.", tag: "AI Voice" },
    { label: "EMAIL", icon: Mail, color: ROSE, meta: "Email · Enquiry", quote: "Can we lock in Thursday?", tag: "AI Messaging" },
    { label: "SOCIAL", icon: MessageSquareText, color: SAGE, meta: "Social · New DM", quote: "Hi, do you service my area?", tag: "AI Messaging" },
  ];
  const active = useCycle(inView, reduced, channels.length, 3600, 1);
  const current = channels[active];
  const bars = [25, 42, 31, 56, 38, 64, 45, 34, 59, 40, 53, 29, 47, 35, 51, 30, 43];

  return (
    <div className="relative h-full px-6 py-7 lg:px-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/88">
        <MessageSquareText size={18} color={CORAL} strokeWidth={2.1} />
        Conversations
      </div>

      <div className="mt-8 grid grid-cols-[54px_1fr] gap-4">
        <div className="relative h-[248px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-black/15 px-1.5 py-2">
          <motion.div
            className="absolute left-1.5 right-1.5 h-[52px] rounded-[16px] border"
            animate={{ y: active * 54 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{
              borderColor: `${current.color}68`,
              background: `radial-gradient(circle at 50% 50%, ${current.color}18, ${current.color}08 58%, transparent 82%)`,
              boxShadow: `inset 0 0 22px ${current.color}0E, 0 0 18px ${current.color}0D`,
            }}
          />

          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const selected = index === active;
            return (
              <div key={channel.label} className="relative z-10 flex h-[54px] flex-col items-center justify-center gap-1">
                <Icon size={15} color={selected ? channel.color : "rgba(255,255,255,.38)"} />
                <span className="text-[8px] font-semibold tracking-[0.04em]" style={{ color: selected ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.40)" }}>
                  {channel.label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="relative h-[334px] overflow-hidden rounded-[24px] border border-white/[0.12] p-5"
          style={{
            background: `radial-gradient(circle at 58% 34%, ${current.color}18 0%, transparent 39%), linear-gradient(180deg, rgba(255,255,255,.050), rgba(255,255,255,.028))`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,.035), inset 0 -28px 70px ${current.color}08`,
          }}
        >
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/40">Live conversation</div>
              <div className="relative mt-1 h-[20px] overflow-hidden">
                {channels.map((channel, index) => {
                  const delta = channelDelta(index, active, channels.length);
                  return (
                    <motion.div
                      key={channel.meta}
                      className="absolute inset-x-0 top-0 text-[13px] font-medium text-white/72"
                      animate={{ y: delta * 22, opacity: delta === 0 ? 1 : 0 }}
                      transition={{ duration: 0.58, ease: EASE }}
                    >
                      {channel.meta}
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <span className="rounded-full border border-white/[0.10] bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/52">
              {current.tag}
            </span>
          </div>

          <div className="relative mt-6 h-[108px] overflow-hidden">
            {channels.map((channel, index) => {
              const delta = channelDelta(index, active, channels.length);
              const SceneIcon = channel.icon;
              return (
                <motion.div
                  key={channel.label}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: delta * 112, opacity: Math.abs(delta) > 1 ? 0 : delta === 0 ? 1 : 0.16 }}
                  transition={{ duration: 0.68, ease: EASE }}
                >
                  {channel.label === "CALL" ? (
                    <div className="flex h-[96px] items-center justify-center gap-[5px]">
                      {bars.map((height, barIndex) => (
                        <motion.span
                          key={barIndex}
                          className="w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: barIndex % 5 === 0 ? channel.color : "rgba(255,255,255,.32)" }}
                          animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.68] } : { height: height * 0.72 }}
                          transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: barIndex * 0.04, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  ) : channel.label === "EMAIL" ? (
                    <div className="w-full rounded-[16px] border border-white/[0.10] bg-black/15 p-3.5">
                      <div className="flex items-center gap-2 text-[10px] text-white/48"><Mail size={13} color={channel.color} /> New enquiry</div>
                      <div className="mt-3 h-1.5 w-[72%] rounded-full bg-white/[0.15]" />
                      <div className="mt-2 h-1.5 w-[88%] rounded-full bg-white/[0.09]" />
                      <div className="mt-2 h-1.5 w-[58%] rounded-full bg-white/[0.09]" />
                    </div>
                  ) : (
                    <div className="w-full space-y-2.5">
                      <div className="ml-auto flex max-w-[84%] items-start gap-2 rounded-[15px] border border-white/[0.09] bg-white/[0.06] px-3 py-2.5 text-[10px] leading-[1.4] text-white/64">
                        <SceneIcon size={12} color={channel.color} className="mt-0.5 shrink-0" />
                        {channel.label === "SOCIAL" ? "Saw your work on Instagram." : "Hi, just checking in."}
                      </div>
                      <div className="flex max-w-[79%] items-start gap-2 rounded-[15px] border px-3 py-2.5 text-[10px] leading-[1.4] text-white/86" style={{ borderColor: `${channel.color}42`, backgroundColor: `${channel.color}0E` }}>
                        {channel.label === "SOCIAL" ? "Do you service my area?" : "Can we move forward this week?"}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-3 border-t border-white/[0.09] pt-5">
            <div className="relative h-[49px] overflow-hidden">
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

type ArtifactKind = "conversation" | "quote" | "calendar" | "pipeline" | "transcript" | "contact";

type ContextArtifact = {
  kind: ArtifactKind;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
};

function ArtifactSurface({ artifact }: { artifact: ContextArtifact }) {
  if (artifact.kind === "conversation") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><MessageSquareText size={13} color={artifact.color} /> Conversation</div>
        <div className="mt-3 space-y-2">
          <div className="ml-auto w-[78%] rounded-[10px] bg-white/[0.065] px-2.5 py-1.5 text-[8px] leading-[1.35] text-white/58">Can we start in March?</div>
          <div className="w-[72%] rounded-[10px] px-2.5 py-1.5 text-[8px] leading-[1.35] text-white/78" style={{ backgroundColor: `${artifact.color}12` }}>Absolutely. I’ll check.</div>
        </div>
      </>
    );
  }

  if (artifact.kind === "quote") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/88"><FileText size={13} color={artifact.color} /> Quote</div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="text-[19px] font-semibold tracking-[-0.04em] text-white/92">$18,000</div>
          <span className="rounded-full px-2 py-1 text-[7px] font-semibold" style={{ backgroundColor: `${artifact.color}12`, color: artifact.color }}>SENT</span>
        </div>
        <div className="mt-2.5 h-1.5 w-[74%] rounded-full bg-white/[0.08]" />
      </>
    );
  }

  if (artifact.kind === "calendar") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/88"><CalendarDays size={13} color={artifact.color} /> Calendar</div>
        <div className="mt-3 flex items-center gap-3">
          <div className="rounded-[10px] border border-white/[0.08] bg-black/15 px-2.5 py-2 text-center">
            <div className="text-[7px] uppercase tracking-[0.10em] text-white/36">Thu</div>
            <div className="mt-0.5 text-[16px] font-semibold text-white/86">2:30</div>
          </div>
          <div className="flex-1">
            <div className="text-[8px] text-white/42">Available slot</div>
            <div className="mt-2 h-1.5 w-full rounded-full" style={{ backgroundColor: `${artifact.color}24` }} />
          </div>
        </div>
      </>
    );
  }

  if (artifact.kind === "pipeline") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/88"><Send size={13} color={artifact.color} /> Pipeline</div>
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2, 3].map((step) => <span key={step} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: step < 3 ? `${artifact.color}${step === 2 ? "72" : "34"}` : "rgba(255,255,255,.07)" }} />)}
        </div>
        <div className="mt-3 text-[8px] text-white/45">Quote sent · 4 days quiet</div>
      </>
    );
  }

  if (artifact.kind === "transcript") {
    return (
      <>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-white/88"><Phone size={13} color={artifact.color} /> Call transcript</div>
          <span className="text-[7px] text-white/30">00:15</span>
        </div>
        <div className="mt-3 flex h-[23px] items-center gap-[3px]">
          {[8, 14, 11, 19, 10, 16, 8, 13, 18, 9, 14].map((h, i) => <span key={i} className="w-[2px] rounded-full" style={{ height: h, backgroundColor: i % 4 === 0 ? artifact.color : "rgba(255,255,255,.26)" }} />)}
        </div>
        <div className="mt-2 text-[8px] leading-[1.35] text-white/44">“We’d like to start in March.”</div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/88"><UserRound size={13} color={artifact.color} /> Contact record</div>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.035]"><UserRound size={14} color="rgba(255,255,255,.50)" /></span>
        <div>
          <div className="text-[8px] text-white/38">Lead source</div>
          <div className="mt-1 flex gap-1.5">
            {['IG', 'FB', 'Social'].map((chip) => <span key={chip} className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[7px] text-white/48">{chip}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const step = useCycle(inView, reduced, 14, 1150, 0);
  const filling = step <= 6;
  const filled = filling ? step : Math.max(0, 12 - step);
  const currentIndex = filling && step > 0 && step <= 6 ? step - 1 : -1;

  const artifacts: ContextArtifact[] = [
    { kind: "conversation", label: "Conversation", color: ROSE, x: -178, y: -123, width: 152 },
    { kind: "quote", label: "Quote", color: AMBER, x: 178, y: -123, width: 150 },
    { kind: "transcript", label: "Call transcript", color: CORAL, x: -188, y: 0, width: 166 },
    { kind: "contact", label: "Contact record", color: PLUM, x: 188, y: 0, width: 164 },
    { kind: "calendar", label: "Calendar", color: SAGE, x: -168, y: 124, width: 150 },
    { kind: "pipeline", label: "Pipeline", color: CORAL, x: 168, y: 124, width: 156 },
  ];

  const currentArtifact = currentIndex >= 0 ? artifacts[currentIndex] : null;

  return (
    <div className="relative h-full overflow-hidden border-x border-white/[0.085] px-6 py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/88">
        <Layers3 size={18} color={AMBER} strokeWidth={2.1} />
        Context
      </div>

      <div className="absolute left-1/2 top-[55%] h-[408px] w-[560px] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[278px] w-[278px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <FlowerMark size={142} filled={filled} />
        </div>

        {artifacts.map((artifact) => (
          <div
            key={artifact.kind}
            className="absolute left-1/2 top-1/2 z-20 rounded-[18px] border border-white/[0.105] px-3.5 py-3"
            style={{
              width: artifact.width,
              marginLeft: -artifact.width / 2,
              marginTop: -43,
              transform: `translate(${artifact.x}px, ${artifact.y}px)`,
              background: `radial-gradient(circle at 26% 18%, ${artifact.color}14 0%, transparent 46%), linear-gradient(180deg, rgba(255,255,255,.052), rgba(255,255,255,.028))`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,.035), inset 0 -22px 48px ${artifact.color}07, 0 14px 32px rgba(0,0,0,.12)`,
            }}
          >
            <ArtifactSurface artifact={artifact} />
          </div>
        ))}

        {currentArtifact && (
          <motion.div
            key={`${currentArtifact.kind}-${step}`}
            className="absolute left-1/2 top-1/2 z-30 flex h-9 items-center gap-2 rounded-[13px] border px-2.5"
            initial={{ x: currentArtifact.x, y: currentArtifact.y, scale: 1, opacity: 0.96 }}
            animate={{ x: 0, y: 0, scale: 0.16, opacity: 0 }}
            transition={{ duration: 0.92, ease: EASE }}
            style={{
              marginLeft: -48,
              marginTop: -18,
              width: 96,
              borderColor: `${currentArtifact.color}62`,
              background: `radial-gradient(circle at 30% 30%, ${currentArtifact.color}26, rgba(27,28,32,.96) 70%)`,
              boxShadow: `0 0 24px ${currentArtifact.color}1A`,
            }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: currentArtifact.color }} />
            <span className="truncate text-[8px] font-semibold text-white/72">{currentArtifact.label}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AgentFlowerAvatar({ color }: { color: string }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
      style={{
        borderColor: `${color}42`,
        background: `radial-gradient(circle at 42% 34%, ${color}18, rgba(255,255,255,.025) 68%)`,
      }}
    >
      <FlowerGlyph color={color} size={25} />
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
    { name: "Custom Follow Up", color: "#D58C75" },
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
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/88">
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
          const selected = delta === 0;

          return (
            <motion.div
              key={agent.name}
              className="absolute left-1/2 top-1/2 flex h-[66px] w-[88%] -translate-x-1/2 items-center gap-3 rounded-[22px] border px-4"
              animate={{
                y: delta * 48 - 33,
                x: distance * 10,
                scale: selected ? 1 : 0.95 - distance * 0.018,
                opacity: visible ? (selected ? 1 : 0.53 - distance * 0.09) : 0,
                borderColor: selected ? `${agent.color}60` : "rgba(255,255,255,.075)",
                backgroundColor: selected ? `${agent.color}08` : "rgba(255,255,255,.018)",
                boxShadow: selected ? `0 14px 30px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.035), 0 0 20px ${agent.color}0E` : "0 10px 22px rgba(0,0,0,.14)",
              }}
              transition={{ duration: 0.72, ease: EASE }}
              style={{ zIndex: 20 - distance }}
            >
              <AgentFlowerAvatar color={agent.color} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color: selected ? "rgba(255,255,255,.96)" : "rgba(255,255,255,.54)" }}>
                {agent.name}
              </span>
              <span
                className="h-[19px] w-[19px] shrink-0 rounded-full border"
                style={{
                  borderColor: selected ? `${agent.color}B0` : "rgba(255,255,255,.13)",
                  boxShadow: selected ? `inset 0 0 0 4px #18191C, 0 0 0 1px ${agent.color}66` : "none",
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
      <div className="h-[520px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ContextVisual inView={inView} reduced={reduced} /></div>
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
            <FlowerMark size={68} filled={6} />
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
          className="pointer-events-none absolute left-1/2 top-[310px] h-[250px] w-[1060px] -translate-x-1/2 rounded-[50%] blur-[62px]"
          style={{ background: `radial-gradient(ellipse at center, ${CORAL}34 0%, ${ROSE}22 34%, ${AMBER}10 55%, transparent 77%)` }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[386px] h-[120px] w-[780px] -translate-x-1/2 rounded-[50%] blur-[38px]"
          style={{ background: `radial-gradient(ellipse at center, rgba(255,255,255,.06) 0%, ${CORAL}17 36%, transparent 74%)` }}
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
