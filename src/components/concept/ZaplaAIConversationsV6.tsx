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
const INNER = "#1D1E22";
const CORAL = "#E97D62";
const AMBER = "#DDA34B";
const ROSE = "#C96C85";
const SAGE = "#99A36D";
const PLUM = "#9B86B8";
const PETALS = [CORAL, ROSE, AMBER, SAGE, "#B98278", "#D58C75"];

// Exact silhouette traced from the white Zapla mark supplied in this conversation.
const ZAPLA_LOGO_PATH =
  "M 1070,52 L 1043,34 L 1000,15 L 978,9 L 955,6 L 945,3 L 917,0 L 868,2 L 810,16 L 771,33 L 763,40 L 758,41 L 750,47 L 742,50 L 736,56 L 720,66 L 714,72 L 709,74 L 703,81 L 691,90 L 648,131 L 547,239 L 460,338 L 400,402 L 291,525 L 246,572 L 202,623 L 149,680 L 112,724 L 70,780 L 41,827 L 27,855 L 25,863 L 20,873 L 11,901 L 3,939 L 0,979 L 1,1008 L 3,1027 L 10,1058 L 20,1083 L 34,1110 L 61,1147 L 76,1162 L 107,1186 L 128,1197 L 133,1198 L 142,1205 L 188,1220 L 220,1226 L 246,1229 L 1200,1229 L 1247,1225 L 1273,1220 L 1281,1216 L 1296,1212 L 1327,1194 L 1352,1170 L 1367,1144 L 1374,1122 L 1377,1100 L 1374,1060 L 1366,1037 L 1351,1012 L 1330,993 L 1310,982 L 1281,972 L 1260,970 L 1186,972 L 905,971 L 854,968 L 826,963 L 803,952 L 788,935 L 780,916 L 778,904 L 779,890 L 788,858 L 794,845 L 870,719 L 875,708 L 898,671 L 924,626 L 930,613 L 948,584 L 949,580 L 1000,498 L 1082,358 L 1122,286 L 1136,253 L 1141,234 L 1143,214 L 1143,186 L 1139,153 L 1132,133 L 1121,111 L 1112,97 L 1095,76 Z";

function useCycle(inView: boolean, reduced: boolean, count: number, ms: number, initial = 0) {
  const [index, setIndex] = useState(initial);

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [count, inView, ms, reduced]);

  return index;
}

function BrandMark({ size = 68, filled = 6 }: { size?: number; filled?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" className="shrink-0 overflow-visible" aria-hidden="true">
      <defs>
        <filter id={`zapla-mark-shadow-${size}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {PETALS.map((color, index) => (
        <g key={`${color}-${index}`} transform={`rotate(${index * 60} 80 80)`}>
          <motion.path
            d="M80 13 C94 13 103 24 101 40 C99 56 92 69 80 80 C68 69 61 56 59 40 C57 24 66 13 80 13 Z"
            initial={false}
            animate={{
              fill: index < filled ? color : "rgba(255,255,255,0.018)",
              stroke: index < filled ? `${color}CC` : "rgba(255,255,255,0.17)",
              opacity: index < filled ? 0.92 : 1,
            }}
            transition={{ duration: 0.78, ease: EASE }}
            strokeWidth="1.4"
          />
          {index < filled && (
            <path
              d="M80 18 C90 18 97 27 95 39 C93 50 88 60 80 68 C72 60 67 50 65 39 C63 27 70 18 80 18 Z"
              fill={color}
              opacity="0.16"
              filter={`url(#zapla-mark-shadow-${size})`}
            />
          )}
        </g>
      ))}

      <g transform="translate(36 45) scale(0.064)">
        <path d={ZAPLA_LOGO_PATH} fill="white" />
      </g>
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
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/86">
        <MessageSquareText size={18} color={CORAL} strokeWidth={2.1} />
        Conversations
      </div>

      <div className="mt-8 grid grid-cols-[56px_1fr] gap-4">
        <div className="relative overflow-hidden rounded-[22px] border border-white/[0.10] bg-black/15 px-1.5 py-2">
          <motion.div
            className="absolute left-1.5 right-1.5 h-[52px] rounded-[16px] border"
            animate={{ y: active * 54 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{
              borderColor: `${current.color}76`,
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
          <div className="absolute inset-x-8 top-[82px] h-[112px] rounded-full blur-[40px]" style={{ background: `radial-gradient(ellipse, ${current.color}24 0%, transparent 74%)` }} />

          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/34">Live conversation</div>
              <div className="relative mt-1 h-[20px] overflow-hidden">
                {channels.map((channel, index) => {
                  const delta = channelDelta(index, active, channels.length);
                  return (
                    <motion.div
                      key={channel.meta}
                      className="absolute inset-x-0 top-0 text-[13px] font-medium text-white/68"
                      animate={{ y: delta * 22, opacity: delta === 0 ? 1 : 0 }}
                      transition={{ duration: 0.58, ease: EASE }}
                    >
                      {channel.meta}
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <span className="rounded-full border border-white/[0.09] bg-white/[0.04] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/48">
              {current.tag}
            </span>
          </div>

          <div className="relative mt-6 h-[104px] overflow-hidden">
            {channels.map((channel, index) => {
              const delta = channelDelta(index, active, channels.length);
              const SceneIcon = channel.icon;
              return (
                <motion.div
                  key={channel.label}
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ y: delta * 108, opacity: Math.abs(delta) > 1 ? 0 : delta === 0 ? 1 : 0.2 }}
                  transition={{ duration: 0.68, ease: EASE }}
                >
                  {channel.label === "CALL" ? (
                    <div className="flex h-[92px] items-center justify-center gap-[5px]">
                      {bars.map((height, barIndex) => (
                        <motion.span
                          key={barIndex}
                          className="w-[3px] shrink-0 rounded-full"
                          style={{ backgroundColor: barIndex % 5 === 0 ? channel.color : "rgba(255,255,255,.28)" }}
                          animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.68] } : { height: height * 0.72 }}
                          transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: barIndex * 0.04, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  ) : channel.label === "EMAIL" ? (
                    <div className="w-full rounded-[16px] border border-white/[0.09] bg-black/15 p-3.5">
                      <div className="flex items-center gap-2 text-[10px] text-white/42"><Mail size={13} color={channel.color} /> New enquiry</div>
                      <div className="mt-3 h-1.5 w-[72%] rounded-full bg-white/[0.13]" />
                      <div className="mt-2 h-1.5 w-[88%] rounded-full bg-white/[0.08]" />
                      <div className="mt-2 h-1.5 w-[58%] rounded-full bg-white/[0.08]" />
                    </div>
                  ) : (
                    <div className="w-full space-y-2.5">
                      <div className="ml-auto flex max-w-[82%] items-start gap-2 rounded-[15px] border border-white/[0.08] bg-white/[0.055] px-3 py-2.5 text-[10px] leading-[1.4] text-white/58">
                        <SceneIcon size={12} color={channel.color} className="mt-0.5 shrink-0" />
                        {channel.label === "SOCIAL" ? "Saw your work on Instagram." : "Hi, just checking in."}
                      </div>
                      <div className="flex max-w-[76%] items-start gap-2 rounded-[15px] border px-3 py-2.5 text-[10px] leading-[1.4] text-white/82" style={{ borderColor: `${channel.color}42`, backgroundColor: `${channel.color}0C` }}>
                        {channel.label === "SOCIAL" ? "Do you service my area?" : "Can we move forward this week?"}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="relative mt-3 border-t border-white/[0.08] pt-5">
            <div className="relative h-[49px] overflow-hidden">
              {channels.map((channel, index) => {
                const delta = channelDelta(index, active, channels.length);
                return (
                  <motion.div
                    key={channel.quote}
                    className="absolute inset-x-0 top-0 max-w-[280px] text-[17px] font-medium leading-[1.42] text-white/94"
                    animate={{ y: delta * 54, opacity: delta === 0 ? 1 : 0 }}
                    transition={{ duration: 0.58, ease: EASE }}
                  >
                    “{channel.quote}”
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-white/48">
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
  kind: "conversation" | "quote" | "calendar" | "pipeline" | "transcript" | "contact";
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-white/86"><MessageSquareText size={13} color={artifact.color} /> Conversation</div>
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[8px] text-white/42">6 msgs</span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="ml-auto w-[78%] rounded-[10px] bg-white/[0.055] px-2.5 py-1.5 text-[8px] text-white/42">Can we start in March?</div>
          <div className="w-[68%] rounded-[10px] px-2.5 py-1.5 text-[8px] text-white/68" style={{ backgroundColor: `${artifact.color}10` }}>Absolutely. I’ll check.</div>
        </div>
      </>
    );
  }

  if (artifact.kind === "quote") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/86"><FileText size={13} color={artifact.color} /> Quote</div>
        <div className="mt-2.5 flex items-end justify-between">
          <div className="text-[18px] font-semibold tracking-[-0.04em] text-white/88">$18,000</div>
          <span className="rounded-full px-2 py-1 text-[8px] font-medium" style={{ color: artifact.color, backgroundColor: `${artifact.color}10` }}>Sent</span>
        </div>
        <div className="mt-2 h-1 w-[74%] rounded-full bg-white/[0.08]" />
      </>
    );
  }

  if (artifact.kind === "calendar") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/86"><CalendarDays size={13} color={artifact.color} /> Calendar</div>
        <div className="mt-3 grid grid-cols-[34px_1fr] items-center gap-3">
          <div className="rounded-[10px] border border-white/[0.08] bg-black/15 py-1.5 text-center"><div className="text-[7px] uppercase text-white/30">Thu</div><div className="text-[14px] font-semibold text-white/80">2:30</div></div>
          <div><div className="text-[9px] text-white/38">Available slot</div><div className="mt-1 h-1.5 w-full rounded-full" style={{ backgroundColor: `${artifact.color}36` }} /></div>
        </div>
      </>
    );
  }

  if (artifact.kind === "pipeline") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/86"><Send size={13} color={artifact.color} /> Pipeline</div>
        <div className="mt-3 flex items-center gap-1.5">
          {[0, 1, 2, 3].map((step) => <span key={step} className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: step <= 2 ? `${artifact.color}${step === 2 ? "80" : "38"}` : "rgba(255,255,255,.07)" }} />)}
        </div>
        <div className="mt-2 text-[9px] text-white/46">Quote sent · 4 days quiet</div>
      </>
    );
  }

  if (artifact.kind === "transcript") {
    return (
      <>
        <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/86"><Phone size={13} color={artifact.color} /> Call transcript</div><span className="text-[8px] text-white/30">00:15</span></div>
        <div className="mt-3 flex h-[20px] items-center gap-[3px]">
          {[7, 14, 10, 19, 12, 17, 8, 15, 11, 18, 9, 13].map((h, index) => <span key={index} className="w-[2px] rounded-full" style={{ height: h, backgroundColor: index % 4 === 0 ? artifact.color : "rgba(255,255,255,.18)" }} />)}
        </div>
        <div className="mt-2 text-[8px] text-white/54">“We’d like to start in March.”</div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/86"><UserRound size={13} color={artifact.color} /> Contact record</div><span className="h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /></div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04]"><UserRound size={14} color="rgba(255,255,255,.62)" /></div>
        <div><div className="text-[9px] text-white/54">Lead source</div><div className="mt-1 flex gap-1"><span className="rounded-md bg-white/[0.055] px-1.5 py-0.5 text-[7px] text-white/48">IG</span><span className="rounded-md bg-white/[0.055] px-1.5 py-0.5 text-[7px] text-white/48">FB</span><span className="rounded-md px-1.5 py-0.5 text-[7px]" style={{ color: artifact.color, backgroundColor: `${artifact.color}10` }}>Social</span></div></div>
      </div>
    </>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  // 0–5 illuminate each artifact. 6–7 hold the fully coloured mark. 8 gently clears it.
  const phase = useCycle(inView, reduced, 9, 1500, 0);
  const activeArtifact = phase < 6 ? phase : -1;
  const filled = phase < 6 ? phase : phase < 8 ? 6 : 0;

  const artifacts: ContextArtifact[] = [
    { kind: "conversation", label: "Conversation", color: ROSE, x: -174, y: -118, width: 152 },
    { kind: "quote", label: "Quote", color: AMBER, x: 174, y: -118, width: 142 },
    { kind: "transcript", label: "Call transcript", color: CORAL, x: -186, y: 0, width: 162 },
    { kind: "contact", label: "Contact record", color: PLUM, x: 186, y: 0, width: 158 },
    { kind: "calendar", label: "Calendar", color: SAGE, x: -174, y: 122, width: 150 },
    { kind: "pipeline", label: "Pipeline", color: CORAL, x: 174, y: 122, width: 150 },
  ];

  const travelling = activeArtifact >= 0 ? artifacts[activeArtifact] : null;

  return (
    <div className="relative h-full overflow-hidden border-x border-white/[0.085] px-6 py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/86">
        <Layers3 size={18} color={AMBER} strokeWidth={2} />
        Context
      </div>

      <div className="absolute left-1/2 top-[54%] h-[404px] w-[540px] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[248px] w-[248px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[194px] w-[194px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <BrandMark size={146} filled={filled} />
        </div>

        {artifacts.map((artifact, index) => {
          const current = index === activeArtifact;
          return (
            <motion.div
              key={artifact.label}
              className="absolute left-1/2 top-1/2 rounded-[17px] border bg-white/[0.035] p-3"
              style={{ width: artifact.width, marginLeft: -artifact.width / 2, marginTop: -43 }}
              animate={{
                x: artifact.x,
                y: current ? artifact.y - 3 : artifact.y,
                opacity: current ? 1 : 0.62,
                borderColor: current ? `${artifact.color}72` : "rgba(255,255,255,.105)",
                backgroundColor: current ? `${artifact.color}08` : "rgba(255,255,255,.035)",
                boxShadow: current ? `0 0 24px ${artifact.color}12` : "0 10px 24px rgba(0,0,0,.08)",
              }}
              transition={{ duration: 0.72, ease: EASE }}
            >
              <ArtifactSurface artifact={artifact} />
            </motion.div>
          );
        })}

        {travelling && (
          <motion.div
            key={`payload-${phase}`}
            className="pointer-events-none absolute left-1/2 top-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-[11px] border"
            style={{ marginLeft: -16, marginTop: -16, borderColor: `${travelling.color}70`, backgroundColor: `${travelling.color}22`, boxShadow: `0 0 20px ${travelling.color}28` }}
            initial={{ x: travelling.x, y: travelling.y, scale: 0.82, opacity: 0 }}
            animate={{ x: [travelling.x, travelling.x * 0.72, 0], y: [travelling.y, travelling.y * 0.72, 0], scale: [0.82, 0.92, 0.48], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, ease: EASE, times: [0, 0.25, 1] }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: travelling.color }} />
          </motion.div>
        )}
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
      <div className="h-[470px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ConversationVisual inView={inView} reduced={reduced} /></div>
      <div className="h-[500px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor: STAGE }}><ContextVisual inView={inView} reduced={reduced} /></div>
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
            <BrandMark size={72} filled={6} />
            <span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
              ZAPLA{" "}
              <span
                style={{
                  background: `linear-gradient(90deg, ${CORAL}, ${AMBER} 52%, ${ROSE})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  textShadow: `0 0 18px ${CORAL}18`,
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

        {/* Broad atmospheric bridge between the copy and product story. */}
        <div
          className="pointer-events-none absolute left-1/2 top-[306px] h-[270px] w-[1080px] -translate-x-1/2 rounded-[50%] blur-[64px]"
          style={{ background: `radial-gradient(ellipse at center, ${CORAL}3B 0%, ${ROSE}28 32%, ${AMBER}13 54%, transparent 77%)` }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-[382px] h-[126px] w-[790px] -translate-x-1/2 rounded-[50%] blur-[38px]"
          style={{ background: `radial-gradient(ellipse at center, rgba(255,255,255,.065) 0%, ${CORAL}18 38%, transparent 74%)` }}
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
