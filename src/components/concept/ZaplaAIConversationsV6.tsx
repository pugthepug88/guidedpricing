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
const SURFACE = "#1D1E22";
const SURFACE_STRONG = "#202126";
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

function PetalFlower({ size = 68, filled = 6, mono }: { size?: number; filled?: number; mono?: string }) {
  const colors = mono ? PETALS.map(() => mono) : PETALS;
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="shrink-0 overflow-visible">
      <defs>
        <filter id={`petal-soft-${size}-${mono || "multi"}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>
      {colors.map((color, index) => (
        <g key={`${color}-${index}`} transform={`rotate(${index * 60} 80 80)`}>
          <motion.path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            initial={false}
            animate={{
              fill: index < filled ? color : "rgba(255,255,255,0.012)",
              stroke: index < filled ? `${color}C8` : "rgba(255,255,255,0.19)",
              opacity: index < filled ? 0.94 : 1,
            }}
            transition={{ duration: 0.72, ease: EASE }}
            strokeWidth="1.5"
          />
          {index < filled && (
            <path
              d="M80 20 C91 20 97 29 95 41 C93 52 88 61 80 69 C72 61 67 52 65 41 C63 29 69 20 80 20 Z"
              fill={color}
              opacity="0.12"
              filter={`url(#petal-soft-${size}-${mono || "multi"})`}
            />
          )}
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="rgba(17,18,20,.94)" stroke="rgba(255,255,255,.07)" />
    </svg>
  );
}

function TinyPersonAvatar({ size = 24 }: { size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.055]" style={{ width: size, height: size }}>
      <UserRound size={Math.round(size * 0.48)} color="rgba(255,255,255,.68)" strokeWidth={2} />
    </span>
  );
}

function TinyFlowerAvatar({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full border" style={{ width: size, height: size, borderColor: `${color}42`, backgroundColor: "#17181B" }}>
      <PetalFlower size={size * 0.76} filled={6} mono={color} />
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
        <div className="relative h-[248px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-[#151619] px-1.5 py-2">
          <motion.div
            className="absolute left-1.5 right-1.5 h-[52px] rounded-[16px] border"
            animate={{ y: active * 54 }}
            transition={{ duration: 0.72, ease: EASE }}
            style={{ borderColor: `${current.color}68`, backgroundColor: `${current.color}0E`, boxShadow: `inset 0 0 22px ${current.color}0E` }}
          />
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const selected = index === active;
            return (
              <div key={channel.label} className="relative z-10 flex h-[54px] flex-col items-center justify-center gap-1">
                <Icon size={15} color={selected ? channel.color : "rgba(255,255,255,.38)"} />
                <span className="text-[8px] font-semibold tracking-[0.04em]" style={{ color: selected ? "rgba(255,255,255,.94)" : "rgba(255,255,255,.40)" }}>{channel.label}</span>
              </div>
            );
          })}
        </div>

        <div className="relative h-[334px] overflow-hidden rounded-[24px] border border-white/[0.12] p-5" style={{ background: `radial-gradient(circle at 58% 34%, ${current.color}16 0%, transparent 40%), linear-gradient(180deg, #202126, #1B1C20)` }}>
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/40">Live conversation</div>
              <div className="relative mt-1 h-[20px] overflow-hidden">
                {channels.map((channel, index) => {
                  const delta = channelDelta(index, active, channels.length);
                  return <motion.div key={channel.meta} className="absolute inset-x-0 top-0 text-[13px] font-medium text-white/72" animate={{ y: delta * 22, opacity: delta === 0 ? 1 : 0 }} transition={{ duration: 0.58, ease: EASE }}>{channel.meta}</motion.div>;
                })}
              </div>
            </div>
            <span className="rounded-full border border-white/[0.10] bg-[#25262A] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.10em] text-white/52">{current.tag}</span>
          </div>

          <div className="relative mt-6 h-[108px] overflow-hidden">
            {channels.map((channel, index) => {
              const delta = channelDelta(index, active, channels.length);
              const SceneIcon = channel.icon;
              return (
                <motion.div key={channel.label} className="absolute inset-0 flex items-center justify-center" animate={{ y: delta * 112, opacity: Math.abs(delta) > 1 ? 0 : delta === 0 ? 1 : 0.16 }} transition={{ duration: 0.68, ease: EASE }}>
                  {channel.label === "CALL" ? (
                    <div className="flex h-[96px] items-center justify-center gap-[5px]">
                      {bars.map((height, barIndex) => <motion.span key={barIndex} className="w-[3px] shrink-0 rounded-full" style={{ backgroundColor: barIndex % 5 === 0 ? channel.color : "rgba(255,255,255,.32)" }} animate={inView && !reduced ? { height: [height * 0.58, height, height * 0.68] } : { height: height * 0.72 }} transition={{ duration: 1.2, repeat: inView && !reduced ? Infinity : 0, delay: barIndex * 0.04, ease: "easeInOut" }} />)}
                    </div>
                  ) : channel.label === "EMAIL" ? (
                    <div className="w-full rounded-[16px] border border-white/[0.10] bg-[#17181B] p-3.5">
                      <div className="flex items-center gap-2 text-[10px] text-white/48"><Mail size={13} color={channel.color} /> New enquiry</div>
                      <div className="mt-3 h-1.5 w-[72%] rounded-full bg-white/[0.15]" /><div className="mt-2 h-1.5 w-[88%] rounded-full bg-white/[0.09]" /><div className="mt-2 h-1.5 w-[58%] rounded-full bg-white/[0.09]" />
                    </div>
                  ) : (
                    <div className="w-full space-y-2.5">
                      <div className="ml-auto flex max-w-[84%] items-start gap-2 rounded-[15px] border border-white/[0.09] bg-[#25262A] px-3 py-2.5 text-[10px] leading-[1.4] text-white/64"><SceneIcon size={12} color={channel.color} className="mt-0.5 shrink-0" />{channel.label === "SOCIAL" ? "Saw your work on Instagram." : "Hi, just checking in."}</div>
                      <div className="flex max-w-[79%] items-start gap-2 rounded-[15px] border px-3 py-2.5 text-[10px] leading-[1.4] text-white/86" style={{ borderColor: `${channel.color}42`, backgroundColor: `${channel.color}0E` }}>{channel.label === "SOCIAL" ? "Do you service my area?" : "Can we move forward this week?"}</div>
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
                return <motion.div key={channel.quote} className="absolute inset-x-0 top-0 max-w-[280px] text-[17px] font-medium leading-[1.42] text-white/95" animate={{ y: delta * 54, opacity: delta === 0 ? 1 : 0 }} transition={{ duration: 0.58, ease: EASE }}>“{channel.quote}”</motion.div>;
              })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-white/52"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: current.color }} />Captured as context</div>
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
          <div className="flex items-start gap-2"><TinyPersonAvatar size={22} /><div className="max-w-[118px] rounded-[10px] bg-[#26272B] px-2.5 py-1.5 text-[8px] leading-[1.35] text-white/72">Can we start in March?</div></div>
          <div className="flex items-start gap-2"><TinyFlowerAvatar color={artifact.color} size={22} /><div className="max-w-[118px] rounded-[10px] px-2.5 py-1.5 text-[8px] leading-[1.35] text-white/82" style={{ backgroundColor: `${artifact.color}13` }}>Absolutely. I’ll check.</div></div>
        </div>
      </>
    );
  }

  if (artifact.kind === "quote") {
    return (
      <>
        <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><FileText size={13} color={artifact.color} /> Quote</div><span className="rounded-full px-2 py-0.5 text-[7px] font-semibold" style={{ backgroundColor: `${artifact.color}14`, color: artifact.color }}>SENT</span></div>
        <div className="mt-2.5 flex items-end justify-between"><div><div className="text-[7px] uppercase tracking-[0.08em] text-white/30">Bathroom renovation</div><div className="mt-1 text-[20px] font-semibold tracking-[-0.04em] text-white/94">$18,000</div></div><div className="text-[7px] text-white/28">Q-1048</div></div>
        <div className="mt-2.5 space-y-1.5"><div className="flex justify-between text-[7px] text-white/40"><span>Labour + materials</span><span>$16,500</span></div><div className="flex justify-between text-[7px] text-white/40"><span>Site prep</span><span>$1,500</span></div></div>
      </>
    );
  }

  if (artifact.kind === "appointment") {
    return (
      <>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><CalendarDays size={13} color={artifact.color} /> Appointment</div>
        <div className="mt-3 flex items-center gap-3"><div className="rounded-[10px] border border-white/[0.09] bg-[#17181B] px-2.5 py-2 text-center"><div className="text-[7px] uppercase tracking-[0.10em] text-white/36">Thu</div><div className="mt-0.5 text-[16px] font-semibold text-white/90">2:30</div></div><div className="min-w-0 flex-1"><div className="text-[8px] font-medium text-white/58">Site consultation</div><div className="mt-1 text-[7px] text-white/34">Available slot</div><div className="mt-2 h-1.5 w-full rounded-full" style={{ backgroundColor: `${artifact.color}28` }} /></div></div>
      </>
    );
  }

  if (artifact.kind === "pipeline") {
    const stages = ["New", "Quote", "Follow up"];
    return (
      <>
        <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><Send size={13} color={artifact.color} /> Pipeline</div><span className="text-[7px] text-white/34">4 days quiet</span></div>
        <div className="mt-3 flex items-center gap-1.5">{stages.map((stage, i) => <div key={stage} className="flex-1"><div className="h-1.5 rounded-full" style={{ backgroundColor: i <= 1 ? `${artifact.color}${i === 1 ? "90" : "38"}` : "rgba(255,255,255,.08)" }} /><div className="mt-1.5 text-[6.5px]" style={{ color: i === 1 ? artifact.color : "rgba(255,255,255,.34)" }}>{stage}</div></div>)}</div>
        <div className="mt-3 rounded-[9px] border px-2.5 py-2 text-[8px] font-medium text-white/70" style={{ borderColor: `${artifact.color}24`, backgroundColor: `${artifact.color}09` }}>Current stage · Quote sent</div>
      </>
    );
  }

  if (artifact.kind === "transcript") {
    return (
      <>
        <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><Phone size={13} color={artifact.color} /> Call transcript</div><span className="text-[7px] text-white/30">00:15</span></div>
        <div className="mt-3 flex h-[22px] items-center gap-[3px]">{[8,14,11,19,10,16,8,13,18,9,14].map((h,i) => <span key={i} className="w-[2px] rounded-full" style={{ height:h, backgroundColor:i%4===0 ? artifact.color : "rgba(255,255,255,.28)" }} />)}</div>
        <div className="mt-2 text-[8px] leading-[1.35] text-white/50">“We’d like to start in March.”</div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-[10px] font-semibold text-white/90"><UserRound size={13} color={artifact.color} /> Contact record</div><span className="h-2 w-2 rounded-full" style={{ backgroundColor:SAGE }} /></div>
      <div className="mt-3 flex items-center gap-2.5"><TinyPersonAvatar size={28} /><div><div className="text-[8px] font-medium text-white/58">New social lead</div><div className="mt-1 text-[7px] text-white/34">Source · Instagram</div><div className="mt-2 flex gap-1.5">{["IG","Lead","Sydney"].map((chip) => <span key={chip} className="rounded-full bg-[#26272B] px-2 py-0.5 text-[7px] text-white/48">{chip}</span>)}</div></div></div>
    </>
  );
}

function ContextVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const step = useCycle(inView, reduced, 15, 1150, 0);
  const forward = step <= 7;
  const absorbedCount = forward ? Math.min(step, 6) : Math.max(0, 13 - step);
  const currentIndex = forward && step > 0 && step <= 6 ? step - 1 : -1;

  const artifacts: ContextArtifact[] = [
    { kind:"conversation", color:ROSE, x:-186, y:-125, width:174, height:118 },
    { kind:"quote", color:AMBER, x:178, y:-125, width:166, height:120 },
    { kind:"transcript", color:CORAL, x:-194, y:18, width:166, height:104 },
    { kind:"contact", color:PLUM, x:188, y:22, width:170, height:102 },
    { kind:"appointment", color:SAGE, x:-176, y:142, width:164, height:106 },
    { kind:"pipeline", color:CORAL, x:176, y:142, width:174, height:112 },
  ];

  return (
    <div className="relative h-full overflow-hidden border-x border-white/[0.085] px-6 py-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/88"><Layers3 size={18} color={AMBER} strokeWidth={2.1} />Context</div>
      <div className="absolute left-1/2 top-[54%] h-[430px] w-[590px] -translate-x-1/2 -translate-y-1/2">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[282px] w-[282px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[224px] w-[224px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"><PetalFlower size={146} filled={absorbedCount} /></div>

        {artifacts.map((artifact, index) => {
          const isAbsorbed = index < absorbedCount;
          const isCurrent = index === currentIndex;
          return (
            <motion.div
              key={artifact.kind}
              className="absolute left-1/2 top-1/2 z-20 overflow-hidden rounded-[18px] border border-white/[0.11] px-3.5 py-3"
              initial={false}
              animate={{
                x: isAbsorbed ? 0 : artifact.x,
                y: isAbsorbed ? 0 : artifact.y,
                scale: isAbsorbed ? 0.18 : 1,
                opacity: isAbsorbed ? 0 : 1,
              }}
              transition={{ duration: isCurrent || isAbsorbed ? 0.9 : 0.72, ease: EASE }}
              style={{
                width: artifact.width,
                height: artifact.height,
                marginLeft: -artifact.width/2,
                marginTop: -artifact.height/2,
                background: `radial-gradient(circle at 24% 16%, ${artifact.color}14 0%, transparent 46%), linear-gradient(180deg, #202126, #1C1D21)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,.035), inset 0 -24px 52px ${artifact.color}07, 0 14px 32px rgba(0,0,0,.15)`,
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

function AgentFlowerAvatar({ color }: { color: string }) {
  return <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border" style={{ borderColor:`${color}32`, backgroundColor:"#17181B" }}><PetalFlower size={27} filled={6} mono={color} /></span>;
}

function AIAgentVisual({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const agents = [
    { name:"Stalled Deal Follow Up", color:CORAL },
    { name:"No Show Follow Up", color:AMBER },
    { name:"Social Follow Up", color:ROSE },
    { name:"Sales Follow Up", color:SAGE },
    { name:"Lead Scoring", color:PLUM },
    { name:"Custom Follow Up", color:"#D58C75" },
  ];
  const active = useCycle(inView, reduced, agents.length, 2500, 0);
  const signedDelta = (index:number) => { let delta=index-active; const half=Math.floor(agents.length/2); if(delta>half) delta-=agents.length; if(delta<-half) delta+=agents.length; return delta; };

  return (
    <div className="relative h-full px-5 py-7 sm:px-6 lg:px-7">
      <div className="flex items-center gap-2.5 text-[18px] font-medium text-white/88"><Send size={18} color={CORAL} strokeWidth={2.1} />AI Agent</div>
      <div className="relative mt-10 h-[330px] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-16 bg-gradient-to-b from-[#18191C] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-16 bg-gradient-to-t from-[#18191C] to-transparent" />
        {agents.map((agent,index) => {
          const delta=signedDelta(index); const distance=Math.abs(delta); const visible=distance<=2; const selected=delta===0;
          return (
            <motion.div
              key={agent.name}
              className="absolute left-1/2 top-1/2 flex h-[66px] w-[88%] -translate-x-1/2 items-center gap-3 rounded-[22px] border px-4"
              animate={{ y:delta*48-33, x:distance*10, scale:selected?1:0.95-distance*0.018, opacity:visible?(selected?1:0.72-distance*0.12):0, borderColor:selected?`${agent.color}58`:"rgba(255,255,255,.075)", backgroundColor:selected?"#222327":"#1C1D21", boxShadow:selected?`0 14px 30px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.035), 0 0 16px ${agent.color}0D`:`0 10px 22px rgba(0,0,0,.18)` }}
              transition={{ duration:0.72, ease:EASE }}
              style={{ zIndex:20-distance }}
            >
              <AgentFlowerAvatar color={agent.color} />
              <span className="min-w-0 flex-1 truncate text-[12px] font-medium" style={{ color:selected?"rgba(255,255,255,.97)":"rgba(255,255,255,.60)" }}>{agent.name}</span>
              <span className="h-[19px] w-[19px] shrink-0 rounded-full border" style={{ borderColor:selected?`${agent.color}A8`:"rgba(255,255,255,.13)", boxShadow:selected?`inset 0 0 0 4px #222327, 0 0 0 1px ${agent.color}55`:"none", backgroundColor:selected?agent.color:"transparent" }} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopStage({ inView, reduced }: { inView:boolean; reduced:boolean }) {
  return <div className="relative hidden h-[500px] overflow-hidden rounded-[34px] border border-white/[0.16] lg:grid lg:grid-cols-[0.84fr_1.40fr_0.92fr]" style={{ backgroundColor:STAGE, boxShadow:"0 30px 100px rgba(0,0,0,.30)" }}><ConversationVisual inView={inView} reduced={reduced} /><ContextVisual inView={inView} reduced={reduced} /><AIAgentVisual inView={inView} reduced={reduced} /></div>;
}

function MobileStage({ inView, reduced }: { inView:boolean; reduced:boolean }) {
  return <div className="space-y-3 lg:hidden"><div className="overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor:STAGE }}><ConversationVisual inView={inView} reduced={reduced} /></div><div className="h-[540px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor:STAGE }}><ContextVisual inView={inView} reduced={reduced} /></div><div className="h-[430px] overflow-hidden rounded-[24px] border border-white/[0.13]" style={{ backgroundColor:STAGE }}><AIAgentVisual inView={inView} reduced={reduced} /></div></div>;
}

export function ZaplaAIConversationsV6() {
  const sectionRef=useRef<HTMLElement|null>(null);
  const inView=useInView(sectionRef,{ amount:0.18, margin:"-8% 0px -8% 0px" });
  const reduced=Boolean(useReducedMotion());
  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 sm:py-28 lg:py-36" style={{ backgroundColor:BG, fontFamily:DISPLAY }}>
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-[980px] text-center">
          <div className="flex items-center justify-center gap-3.5"><PetalFlower size={68} filled={6} /><span className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">ZAPLA <span style={{ color:CORAL, textShadow:`0 0 18px ${CORAL}30` }}>AI</span></span></div>
          <h2 className="mt-7 text-[42px] font-semibold leading-[0.99] tracking-[-0.058em] text-white sm:text-[58px] lg:text-[70px]">Turn every conversation into the next action.</h2>
          <p className="mx-auto mt-6 max-w-[720px] text-[16px] leading-[1.62] text-white/62 sm:text-[18px]">Conversations become context. Context becomes a decision. Zapla follows through.</p>
        </header>
        <div className="pointer-events-none absolute left-1/2 top-[310px] h-[250px] w-[1060px] -translate-x-1/2 rounded-[50%] blur-[62px]" style={{ background:`radial-gradient(ellipse at center, ${CORAL}34 0%, ${ROSE}22 34%, ${AMBER}10 55%, transparent 77%)` }} />
        <div className="pointer-events-none absolute left-1/2 top-[386px] h-[120px] w-[780px] -translate-x-1/2 rounded-[50%] blur-[38px]" style={{ background:`radial-gradient(ellipse at center, rgba(255,255,255,.06) 0%, ${CORAL}17 36%, transparent 74%)` }} />
        <div className="relative mt-14 sm:mt-16 lg:mt-20"><DesktopStage inView={inView} reduced={reduced} /><MobileStage inView={inView} reduced={reduced} /></div>
      </div>
    </section>
  );
}

export default ZaplaAIConversationsV6;
