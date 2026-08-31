import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Clock, Globe2, MessageSquare, MoreHorizontal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, RevenueAvatar } from "./shared";

type NodeState = "idle" | "active" | "done";
type Box = { x: number; y: number; w: number; h: number };

const W = 880;
const H = 470;
const N = {
  trigger: { x: 340, y: 18, w: 200, h: 66 },
  reply: { x: 340, y: 106, w: 200, h: 58 },
  wait: { x: 340, y: 186, w: 200, h: 52 },
  follow: { x: 150, y: 302, w: 190, h: 62 },
  detected: { x: 540, y: 302, w: 190, h: 62 },
} satisfies Record<string, Box>;

const centers = Object.fromEntries(Object.entries(N).map(([key, b]) => [key, { x: b.x + b.w / 2, y: b.y + b.h / 2 }])) as Record<keyof typeof N, { x: number; y: number }>;
const ROUTE = [centers.trigger, centers.reply, centers.wait, centers.follow, centers.detected];
const SEG = { s1: "M440 84 V106", s2: "M440 164 V186", s3: "M440 238 V270 H245 V302", s4: "M340 333 H540" };

function Wire({ d, on }: { d: string; on: boolean }) {
  return <><path d={d} fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /><motion.path d={d} fill="none" stroke="url(#leadWire)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.48, ease: EASE }} /></>;
}

function Node({ box, icon: Icon, kind, title, detail, state }: { box: Box; icon: typeof Zap; kind: string; title: string; detail: string; state: NodeState }) {
  return (
    <motion.div className="absolute rounded-[14px] bg-white px-3 py-2" style={{ left: box.x, top: box.y, width: box.w, minHeight: box.h }} animate={{ boxShadow: state === "active" ? "0 0 0 2px rgba(37,99,255,0.65), 0 16px 30px -20px rgba(37,99,255,0.5)" : state === "done" ? "0 0 0 1px rgba(203,213,225,0.9), 0 8px 18px -16px rgba(15,23,42,0.35)" : "0 0 0 1px rgba(226,232,240,0.95), 0 6px 14px -14px rgba(15,23,42,0.3)", scale: state === "active" ? 1.018 : 1 }} transition={{ duration: 0.32, ease: EASE }}>
      <div className="flex items-start gap-2"><span className={cn("mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg", state === "done" ? "bg-emerald-50 text-emerald-600" : state === "active" ? "bg-blue-50 text-[#2563FF]" : "bg-slate-100 text-slate-400")}><Icon className="h-3.5 w-3.5" /></span><div className="min-w-0 flex-1"><div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">{kind}</div><div className="truncate text-[12.5px] font-bold leading-tight tracking-tight text-slate-900">{title}</div><div className="mt-1 truncate text-[9px] font-semibold text-slate-400">{detail}</div></div></div>
      {state === "done" ? <span className="absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 shadow-sm"><Check className="h-[11px] w-[11px] text-white" strokeWidth={3.5} /></span> : null}
    </motion.div>
  );
}

export function AutomationScene({ interactive = false }: { interactive?: boolean }) {
  const [progress, setProgress] = useState(interactive ? 4 : 0);
  useEffect(() => {
    if (interactive) { setProgress(4); return; }
    setProgress(0);
    const timers = [700, 1550, 2450, 3400].map((delay, index) => window.setTimeout(() => setProgress(index + 1), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [interactive]);
  const stateFor = (index: number): NodeState => index < progress ? "done" : index === progress ? "active" : "idle";
  const point = ROUTE[progress];

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/85 px-3.5 py-2"><span className="hidden text-[10px] font-medium text-slate-400 sm:inline">Automations / Workflows /</span><span className="truncate text-[12px] font-bold tracking-tight text-slate-800">Lead Follow-up · Website Enquiry</span><span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[9.5px] font-bold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span><div className="ml-auto flex items-center gap-1.5"><span className="hidden rounded-md border border-slate-200 px-2 py-[3px] text-[9.5px] font-semibold text-slate-500 sm:inline">Save</span><span className="rounded-md bg-[#111318] px-2 py-[3px] text-[9.5px] font-semibold text-white">Published</span><MoreHorizontal className="h-3.5 w-3.5 text-slate-300" /></div></div>
      <div className="relative min-h-0 flex-1 overflow-hidden"><div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)", backgroundSize: "18px 18px" }} /><div className="absolute left-1/2 top-1/2" style={{ width: W, height: H, transform: "scale(.92) translate(-50%, -50%)", transformOrigin: "0 0" }}>
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden><defs><linearGradient id="leadWire" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#2563ff" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs><Wire d={SEG.s1} on={progress >= 1} /><Wire d={SEG.s2} on={progress >= 2} /><Wire d={SEG.s3} on={progress >= 3} /><Wire d={SEG.s4} on={progress >= 4} /></svg>
        <Node box={N.trigger} icon={Globe2} kind="Trigger" title="New website enquiry" detail="Sarah Nguyen" state={stateFor(0)} /><Node box={N.reply} icon={MessageSquare} kind="Action" title="Send instant reply" detail="SMS · 10:42 AM" state={stateFor(1)} /><Node box={N.wait} icon={Clock} kind="Wait" title="No reply" detail="30 minutes" state={stateFor(2)} /><Node box={N.follow} icon={MessageSquare} kind="Action" title="Send follow-up" detail="SMS · 11:12 AM" state={stateFor(3)} /><Node box={N.detected} icon={Check} kind="Condition" title="Reply detected" detail="Thursday 2:30" state={stateFor(4)} />
        <motion.div className="pointer-events-none absolute z-40 rounded-full bg-white p-1 shadow-[0_10px_26px_-15px_rgba(15,23,42,.38)] ring-1 ring-slate-200" initial={false} animate={{ x: point.x - 19, y: point.y - 19 }} transition={{ duration: 0.72, ease: EASE }}><RevenueAvatar size={30} /></motion.div>
      </div></div>
    </div>
  );
}
