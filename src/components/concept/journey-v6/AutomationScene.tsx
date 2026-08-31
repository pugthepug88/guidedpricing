import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, Clock3, Globe2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "./shared";

type AutomationNode = {
  eyebrow: string;
  title: string;
  detail: string;
  icon: typeof Globe2;
  tone: "neutral" | "blue" | "amber" | "green";
  left: string;
  top: string;
};

const NODES: AutomationNode[] = [
  { eyebrow: "TRIGGER", title: "New website enquiry", detail: "Sarah Nguyen", icon: Globe2, tone: "neutral", left: "5%", top: "46%" },
  { eyebrow: "ACTION", title: "Send instant reply", detail: "SMS · 10:42 AM", icon: MessageSquare, tone: "blue", left: "25%", top: "21%" },
  { eyebrow: "WAIT", title: "No reply", detail: "Wait 30 minutes", icon: Clock3, tone: "amber", left: "46%", top: "46%" },
  { eyebrow: "ACTION", title: "Send follow-up", detail: "SMS · 11:12 AM", icon: MessageSquare, tone: "blue", left: "66%", top: "21%" },
  { eyebrow: "CONDITION", title: "Reply detected", detail: "Thursday 2:30", icon: Check, tone: "green", left: "85%", top: "46%" },
];

export function AutomationScene({ interactive = false }: { interactive?: boolean }) {
  const [progress, setProgress] = useState(interactive ? NODES.length - 1 : 0);

  useEffect(() => {
    if (interactive) {
      setProgress(NODES.length - 1);
      return;
    }
    setProgress(0);
    const timers = [650, 1450, 2350, 3250].map((delay, index) => window.setTimeout(() => setProgress(index + 1), delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [interactive]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FAFBFC]">
      <div className="flex h-[58px] items-center border-b border-slate-200 bg-white px-4">
        <div><div className="text-[12px] font-black text-slate-900">Lead follow-up</div><div className="mt-0.5 text-[7px] font-semibold text-slate-400">Automation · Website enquiries</div></div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ACTIVE</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[58px] overflow-hidden">
        <div className="absolute inset-0 opacity-[.36]" style={{ backgroundImage: "radial-gradient(#CBD1D8 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 430" preserveAspectRatio="none" aria-hidden="true">
          <path d="M135 255 C190 255 205 126 285 126 S390 255 495 255 S590 126 705 126 S785 255 900 255" fill="none" stroke="#D9DEE5" strokeWidth="2" />
          <motion.path d="M135 255 C190 255 205 126 285 126 S390 255 495 255 S590 126 705 126 S785 255 900 255" fill="none" stroke="#2563FF" strokeWidth="3" strokeLinecap="round" initial={false} animate={{ pathLength: (progress + 1) / NODES.length }} transition={{ duration: 0.55, ease: EASE }} />
        </svg>

        {NODES.map(({ eyebrow, title, detail, icon: Icon, tone, left, top }, index) => {
          const active = index <= progress;
          return (
            <motion.div
              key={title}
              className={cn("absolute z-10 w-[154px] max-w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-[14px] border bg-white px-3 py-3 shadow-[0_14px_28px_-23px_rgba(15,23,42,.34)]", active && tone === "blue" && "border-blue-200", active && tone === "amber" && "border-amber-200", active && tone === "green" && "border-emerald-200", (!active || tone === "neutral") && "border-slate-200")}
              style={{ left, top }} initial={interactive ? false : { opacity: 0.35, scale: 0.96 }} animate={{ opacity: active ? 1 : 0.38, scale: active ? 1 : 0.96 }} transition={{ duration: 0.42, ease: EASE }}
            >
              <div className="flex items-center gap-2">
                <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]", active && tone === "blue" && "bg-blue-50 text-[#2563FF]", active && tone === "amber" && "bg-amber-50 text-amber-600", active && tone === "green" && "bg-emerald-50 text-emerald-700", (!active || tone === "neutral") && "bg-slate-100 text-slate-500")}><Icon className="h-3.5 w-3.5" /></span>
                <div className="min-w-0"><div className="text-[7px] font-black uppercase tracking-[.12em] text-slate-400">{eyebrow}</div><div className="mt-0.5 truncate text-[10px] font-black text-slate-800">{title}</div></div>
              </div>
              <div className="mt-2 truncate text-[8.5px] font-semibold text-slate-400">{detail}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
