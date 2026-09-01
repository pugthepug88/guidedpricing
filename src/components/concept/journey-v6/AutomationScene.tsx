import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { Check, Clock, Globe2, MessageSquare, MoreHorizontal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "@/components/v5/faces";
import { EASE, RevenueAvatar } from "./shared";

type NodeState = "idle" | "active" | "done";
type Box = { x: number; y: number; w: number; h: number };

type Step = {
  box: Box;
  icon: typeof Zap;
  kind: string;
  title: string;
  detail: string;
  crowd: string[];
};

const W = 880;
const H = 470;
const BOX_W = 224;
const BOX_H = 62;
const X = (W - BOX_W) / 2;
const AVATAR_SIZE = 19;
const AVATAR_STEP = 14;

const STEPS: Step[] = [
  {
    box: { x: X, y: 18, w: BOX_W, h: BOX_H },
    icon: Globe2,
    kind: "Trigger",
    title: "New website enquiry",
    detail: "Sarah Nguyen",
    crowd: [FACE.daniel, FACE.priya, FACE.sophie, FACE.leo],
  },
  {
    box: { x: X, y: 106, w: BOX_W, h: BOX_H },
    icon: MessageSquare,
    kind: "Action",
    title: "Send instant reply",
    detail: "SMS · 10:42 AM",
    crowd: [FACE.daniel, FACE.priya, FACE.sophie],
  },
  {
    box: { x: X, y: 194, w: BOX_W, h: BOX_H },
    icon: Clock,
    kind: "Wait",
    title: "No reply",
    detail: "30 minutes",
    crowd: [FACE.daniel, FACE.priya],
  },
  {
    box: { x: X, y: 282, w: BOX_W, h: BOX_H },
    icon: MessageSquare,
    kind: "Action",
    title: "Send follow-up",
    detail: "SMS · 11:12 AM",
    crowd: [FACE.daniel],
  },
  {
    box: { x: X, y: 370, w: BOX_W, h: BOX_H },
    icon: Check,
    kind: "Condition",
    title: "Reply detected",
    detail: "Thursday 2:30",
    crowd: [FACE.priya, FACE.sophie],
  },
];

const LINE_X = W / 2;
const SEGMENTS = STEPS.slice(0, -1).map((step, index) => {
  const next = STEPS[index + 1];
  return `M${LINE_X} ${step.box.y + step.box.h} V${next.box.y}`;
});

function Wire({ d, on }: { d: string; on: boolean }) {
  return (
    <>
      <path d={d} fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth={2} strokeLinecap="round" />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#leadWire)"
        strokeWidth={2.4}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={{ duration: 0.48, ease: EASE }}
      />
    </>
  );
}

function CrowdStack({ crowd, hasSarah, interactive }: { crowd: string[]; hasSarah: boolean; interactive: boolean }) {
  const stackWidth = AVATAR_SIZE + crowd.length * AVATAR_STEP;
  const sarahLeft = crowd.length * AVATAR_STEP;

  return (
    <div
      className="absolute -top-[10px] right-7 z-20"
      style={{ width: stackWidth, height: AVATAR_SIZE }}
      aria-hidden="true"
    >
      {crowd.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          className="absolute top-0 rounded-full object-cover ring-2 ring-white shadow-[0_4px_10px_-6px_rgba(15,23,42,.45)]"
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            left: index * AVATAR_STEP,
            zIndex: index + 1,
          }}
        />
      ))}

      {hasSarah ? (
        <motion.span
          layoutId="automation-sarah-avatar"
          className="absolute top-0 block rounded-full"
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            left: sarahLeft,
            zIndex: crowd.length + 2,
          }}
          initial={false}
          transition={{ duration: interactive ? 0 : 0.62, ease: EASE }}
        >
          <RevenueAvatar
            size={AVATAR_SIZE}
            className="ring-2 ring-white shadow-[0_4px_10px_-6px_rgba(15,23,42,.45)]"
          />
        </motion.span>
      ) : null}
    </div>
  );
}

function Node({ step, state, interactive }: { step: Step; state: NodeState; interactive: boolean }) {
  const { box, icon: Icon, kind, title, detail, crowd } = step;

  return (
    <motion.div
      className="absolute rounded-[14px] bg-white px-3 py-2"
      style={{ left: box.x, top: box.y, width: box.w, minHeight: box.h }}
      animate={{
        boxShadow:
          state === "active"
            ? "0 0 0 2px rgba(37,99,255,0.65), 0 16px 30px -20px rgba(37,99,255,0.5)"
            : state === "done"
              ? "0 0 0 1px rgba(203,213,225,0.9), 0 8px 18px -16px rgba(15,23,42,0.35)"
              : "0 0 0 1px rgba(226,232,240,0.95), 0 6px 14px -14px rgba(15,23,42,0.3)",
      }}
      transition={{ duration: 0.32, ease: EASE }}
    >
      <CrowdStack crowd={crowd} hasSarah={state === "active"} interactive={interactive} />

      <div className="flex items-start gap-2">
        <span
          className={cn(
            "mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
            state === "done" && "bg-emerald-50 text-emerald-600",
            state === "active" && "bg-blue-50 text-[#2563FF]",
            state === "idle" && "bg-slate-100 text-slate-400",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>

        <div className="min-w-0 flex-1 pr-8">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">{kind}</div>
          <div className="truncate text-[12.5px] font-bold leading-tight tracking-tight text-slate-900">{title}</div>
          <div className="mt-1 truncate text-[9px] font-semibold text-slate-400">{detail}</div>
        </div>
      </div>

      {state === "done" ? (
        <span className="absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 shadow-sm">
          <Check className="h-[11px] w-[11px] text-white" strokeWidth={3.5} />
        </span>
      ) : null}
    </motion.div>
  );
}

export function AutomationScene({ interactive = false }: { interactive?: boolean }) {
  const [progress, setProgress] = useState(interactive ? STEPS.length - 1 : 0);

  useEffect(() => {
    if (interactive) {
      setProgress(STEPS.length - 1);
      return;
    }

    setProgress(0);
    const timers = [720, 1540, 2380, 3260].map((delay, index) =>
      window.setTimeout(() => setProgress(index + 1), delay),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [interactive]);

  const stateFor = (index: number): NodeState =>
    index < progress ? "done" : index === progress ? "active" : "idle";

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/85 px-3.5 py-2">
        <span className="hidden text-[10px] font-medium text-slate-400 sm:inline">Automations / Workflows /</span>
        <span className="truncate text-[12px] font-bold tracking-tight text-slate-800">Lead Follow-up · Website Enquiry</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[9.5px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden rounded-md border border-slate-200 px-2 py-[3px] text-[9.5px] font-semibold text-slate-500 sm:inline">Save</span>
          <span className="rounded-md bg-[#111318] px-2 py-[3px] text-[9.5px] font-semibold text-white">Published</span>
          <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div
          className="absolute left-1/2 top-1/2"
          style={{ width: W, height: H, transform: "scale(.92) translate(-50%, -50%)", transformOrigin: "0 0" }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden>
            <defs>
              <linearGradient id="leadWire" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563ff" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            {SEGMENTS.map((segment, index) => (
              <Wire key={segment} d={segment} on={progress >= index + 1} />
            ))}
          </svg>

          <LayoutGroup id="automation-sarah-progress">
            {STEPS.map((step, index) => (
              <Node key={step.title} step={step} state={stateFor(index)} interactive={interactive} />
            ))}
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}
