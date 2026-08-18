import { AnimatePresence, motion } from "motion/react";
import { Bell, Check, Tag } from "lucide-react";
import { SceneAutomations as AutomationsScene } from "./scene-automations";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

type FinalState = "idle" | "active" | "done";

function FinalAction({
  kind,
  title,
  state,
  icon: Icon,
  badge,
  reduced,
}: {
  kind: string;
  title: string;
  state: FinalState;
  icon: typeof Tag;
  badge: string;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="relative h-[58px] rounded-[14px] bg-white px-3 py-2"
      animate={{
        boxShadow:
          state === "active"
            ? "0 0 0 2px rgba(37,99,255,0.72), 0 14px 30px -18px rgba(37,99,255,0.55)"
            : state === "done"
              ? "0 0 0 1px rgba(203,213,225,0.95), 0 8px 18px -16px rgba(15,23,42,0.35)"
              : "0 0 0 1px rgba(226,232,240,0.98), 0 6px 14px -14px rgba(15,23,42,0.3)",
        scale: state === "active" ? 1.025 : 1,
      }}
      transition={{ duration: reduced ? 0 : 0.3 }}
    >
      {state === "active" && !reduced ? (
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-[14px]"
          style={{ boxShadow: "0 0 0 6px rgba(37,99,255,0.12)" }}
          animate={{ opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="flex items-start gap-2">
        <span
          className={
            state === "done"
              ? "mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
              : state === "active"
                ? "mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
                : "mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400"
          }
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">{kind}</div>
          <div className="truncate text-[12.5px] font-bold leading-tight tracking-tight text-slate-900">{title}</div>
          <div
            className={
              state === "done"
                ? "mt-[3px] inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-[2px] text-[9px] font-bold text-emerald-700"
                : state === "active"
                  ? "mt-[3px] inline-flex rounded-full bg-blue-50 px-1.5 py-[2px] text-[9px] font-bold text-blue-700"
                  : "mt-[3px] inline-flex rounded-full bg-slate-50 px-1.5 py-[2px] text-[9px] font-medium text-slate-400"
            }
          >
            {state === "done" ? <Check className="h-[9px] w-[9px]" strokeWidth={3.5} /> : null}
            {badge}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {state === "done" ? (
          <motion.span
            className="absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 shadow-[0_4px_10px_-4px_rgba(16,185,129,0.9)]"
            initial={reduced ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <Check className="h-[11px] w-[11px] text-white" strokeWidth={3.5} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function FinalSequence({ phase, reduced }: { phase: number; reduced: boolean }) {
  const tagState: FinalState = phase >= 9 ? "done" : phase === 8 ? "active" : "idle";
  const notifyState: FinalState = phase >= 10 ? "done" : phase === 9 ? "active" : "idle";

  return (
    <div
      className="pointer-events-none absolute bottom-[4.2%] left-[36.4%] right-[3.2%] z-[38] h-[20%] overflow-visible"
      style={{
        backgroundColor: "rgba(248,250,252,0.97)",
        backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 620 100" preserveAspectRatio="none" aria-hidden>
        <path d="M0 58 H126" fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth="2" strokeLinecap="round" />
        <motion.path
          d="M0 58 H126"
          fill="none"
          stroke="#2563ff"
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: phase >= 8 ? 1 : 0, opacity: phase >= 8 ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        />

        <path d="M322 58 H392" fill="none" stroke="rgba(148,163,184,0.55)" strokeWidth="2" strokeLinecap="round" />
        <motion.path
          d="M322 58 H392"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.6"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: phase >= 9 ? 1 : 0, opacity: phase >= 9 ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5 }}
        />
      </svg>

      <div className="absolute left-[20.3%] top-[29%] w-[31.5%]">
        <FinalAction kind="Action" title="Tag customer" state={tagState} icon={Tag} badge="Advocate" reduced={reduced} />
      </div>

      <div className="absolute left-[63.2%] top-[29%] w-[31.5%]">
        <FinalAction kind="Action" title="Notify team" state={notifyState} icon={Bell} badge={notifyState === "done" ? "Team notified" : "New review received"} reduced={reduced} />
      </div>
    </div>
  );
}

export function SceneAutomationsLive(props: SceneProps) {
  const { phase, reduced } = props;
  const basePhase = phase <= 8 ? phase : 9;

  const points: Record<number, CursorPoint> = {
    1: { left: "50%", top: "16%" },
    2: { left: "50%", top: "29%" },
    3: { left: "50%", top: "40%" },
    4: { left: "50%", top: "52%" },
    5: { left: "24%", top: "69%" },
    6: { left: "24%", top: "80%" },
    7: { left: "24%", top: "90%" },
    8: { left: "59%", top: "89%" },
    9: { left: "83%", top: "89%" },
  };

  const point = points[phase] ?? null;
  const press = phase >= 1 && phase <= 9;

  return (
    <div className="automation-cursor-fix absolute inset-0 overflow-hidden">
      <style>{`.automation-cursor-fix span.pointer-events-none.absolute.left-0.top-0.z-30.h-\\[9px\\].w-\\[9px\\] { display: none !important; }`}</style>
      <AutomationsScene {...props} phase={basePhase} />
      <FinalSequence phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
