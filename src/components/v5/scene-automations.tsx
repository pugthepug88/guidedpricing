/* Automations scene: a real Zapla-style workflow builder executing a
   review follow-up automation. All people, businesses and reviews are
   fictional. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  GitBranch,
  MessageSquare,
  MoreHorizontal,
  Star,
  Tag,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "./faces";
import { EASE_OUT, type SceneProps } from "./motion-kit";

/* ---------------------------------------------------------------- */
/* Zapla demo pointer (same visual language as Contacts / Pipeline)  */
/* ---------------------------------------------------------------- */

const POINTER_PATH =
  "M4.4 3.3 C4.4 2.0 5.9 1.3 6.9 2.1 L18.9 11.7 C20.0 12.6 19.4 14.3 18.0 14.3 L12.7 14.3 C12.2 14.3 11.7 14.6 11.5 15.1 L9.3 20.4 C8.7 21.7 6.8 21.4 6.6 20.0 Z";

function DemoCursor({
  point,
  press,
  reduced,
}: {
  point: { x: number; y: number } | null;
  press?: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <AnimatePresence>
      {point ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50"
          initial={{ opacity: 0, scale: 0.82, x: point.x, y: point.y }}
          animate={{ opacity: 1, scale: 1, x: point.x, y: point.y }}
          exit={{ opacity: 0, scale: 0.86 }}
          transition={{
            opacity: { duration: 0.22, ease: EASE_OUT },
            scale: { duration: 0.28, ease: EASE_OUT },
            x: { type: "spring", stiffness: 150, damping: 21, mass: 0.95 },
            y: { type: "spring", stiffness: 150, damping: 21, mass: 0.95 },
          }}
        >
          <AnimatePresence>
            {press ? (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 rounded-full border-2"
                style={{ borderColor: "rgba(37,99,255,0.55)" }}
                initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
                animate={{ width: 40, height: 40, x: -20, y: -20, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            ) : null}
          </AnimatePresence>
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            animate={{ scale: press ? 0.86 : 1, rotate: press ? -7 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{
              originX: 0.2,
              originY: 0.1,
              filter:
                "drop-shadow(0 1px 1.5px rgba(15,23,42,0.45)) drop-shadow(0 6px 12px rgba(15,23,42,0.28))",
            }}
          >
            <defs>
              <linearGradient id="zaplaAutoPointer" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#3b82ff" />
                <stop offset="55%" stopColor="#2563ff" />
                <stop offset="100%" stopColor="#7c5cf6" />
              </linearGradient>
            </defs>
            <path
              d={POINTER_PATH}
              fill="url(#zaplaAutoPointer)"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/* Workflow primitives                                               */
/* ---------------------------------------------------------------- */

type NodeState = "idle" | "active" | "done";

function StatePill({ state, doneLabel }: { state: NodeState; doneLabel: string }) {
  const label = state === "done" ? doneLabel : state === "active" ? "Running" : "Pending";
  const tone =
    state === "done"
      ? "bg-emerald-50 text-emerald-700"
      : state === "active"
        ? "bg-blue-50 text-blue-700"
        : "bg-slate-100 text-slate-400";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-[2px] text-[9px] font-bold leading-none whitespace-nowrap",
        tone,
      )}
    >
      {state === "done" ? <Check className="h-[9px] w-[9px]" strokeWidth={3.5} /> : null}
      {label}
    </span>
  );
}

function WorkflowNode({
  icon: Icon,
  kind,
  title,
  detail,
  state,
  doneLabel = "Complete",
  selected,
  dim,
  className,
  nodeRef,
  reduced,
  children,
}: {
  icon: typeof Zap;
  kind: string;
  title: string;
  detail?: string;
  state: NodeState;
  doneLabel?: string;
  selected?: boolean;
  dim?: boolean;
  className?: string;
  nodeRef?: React.Ref<HTMLDivElement>;
  reduced: boolean;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      ref={nodeRef}
      animate={{
        opacity: dim ? 0.55 : 1,
        boxShadow: selected
          ? "0 0 0 2px rgba(37,99,255,0.6), 0 18px 34px -22px rgba(37,99,255,0.55)"
          : state === "active"
            ? "0 0 0 1.5px rgba(34,211,238,0.7), 0 14px 28px -20px rgba(37,99,255,0.45)"
            : state === "done"
              ? "0 0 0 1.5px rgba(16,185,129,0.45), 0 10px 22px -18px rgba(15,23,42,0.35)"
              : "0 0 0 1px rgba(226,232,240,0.95), 0 8px 18px -16px rgba(15,23,42,0.3)",
        backgroundColor: state === "done" ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)",
      }}
      transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
      className={cn("relative rounded-xl px-2.5 py-[6px]", className)}
    >
      <div className="flex items-start gap-2">
        <span
          className={cn(
            "mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
            state === "done"
              ? "bg-emerald-50 text-emerald-600"
              : state === "active"
                ? "bg-blue-50 text-zapla-blue"
                : "bg-slate-100 text-slate-400",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-slate-400">
              {kind}
            </span>
            <span className="ml-auto">
              <StatePill state={state} doneLabel={doneLabel} />
            </span>
          </div>
          <div className="mt-[1px] truncate text-[11.5px] font-bold tracking-tight text-slate-900">
            {title}
          </div>
          {detail ? (
            <div className="truncate text-[9.5px] font-medium text-slate-400">{detail}</div>
          ) : null}
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function Connector({
  on,
  label,
  height = 16,
  reduced,
}: {
  on: boolean;
  label?: string;
  height?: number;
  reduced: boolean;
}) {
  return (
    <div className="relative flex justify-center" style={{ height }}>
      <span className="absolute inset-y-0 w-[2px] rounded-full bg-slate-200" />
      <motion.span
        className="absolute top-0 w-[2px] origin-top rounded-full bg-gradient-to-b from-zapla-blue to-cyan-400"
        style={{ height }}
        initial={false}
        animate={{ scaleY: on ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT }}
      />
      {label ? (
        <span
          className={cn(
            "absolute left-1/2 top-1/2 ml-1.5 -translate-y-1/2 rounded-full px-1.5 py-[1px] text-[8.5px] font-bold leading-none",
            on ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400",
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Right activity / config panel                                     */
/* ---------------------------------------------------------------- */

function ActivityPanel({ mode, reduced }: { mode: "config" | "review"; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 18 }}
      transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
      className="hidden h-full w-[196px] shrink-0 flex-col rounded-2xl border border-slate-200/90 bg-white/95 p-2.5 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.45)] sm:flex"
    >
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
          {mode === "config" ? "Action detail" : "Activity"}
        </span>
        <MoreHorizontal className="ml-auto h-3.5 w-3.5 text-slate-300" />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {mode === "config" ? (
          <motion.div
            key="config"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
            className="mt-2"
          >
            <div className="flex items-center gap-2">
              <img
                src={FACE.sophie}
                alt=""
                aria-hidden
                className="h-7 w-7 rounded-full object-cover outline outline-1 outline-slate-200"
              />
              <div className="min-w-0">
                <div className="truncate text-[11px] font-bold tracking-tight text-slate-900">
                  Sophie Bell
                </div>
                <div className="text-[9px] font-medium text-slate-400">Contact</div>
              </div>
            </div>

            <div className="mt-2 space-y-[3px]">
              <div className="flex items-center justify-between border-b border-slate-100 py-[3px]">
                <span className="text-[9.5px] font-medium text-slate-400">Channel</span>
                <span className="text-[10px] font-bold text-slate-700">SMS</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 py-[3px]">
                <span className="text-[9.5px] font-medium text-slate-400">Status</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-[2px] text-[9px] font-bold text-emerald-700">
                  <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                  Sent
                </span>
              </div>
            </div>

            <div className="mt-2 rounded-xl bg-slate-50 p-2">
              <div className="text-[8.5px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Message
              </div>
              <p className="mt-1 text-[9.5px] leading-[1.45] text-slate-600">
                Hi Sophie, thanks again for choosing us. We&apos;d love your feedback. Share your
                experience here: zapla.io/r/8k2
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="review"
            initial={reduced ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
            className="mt-2"
          >
            <div className="rounded-xl border border-slate-200 bg-white p-2">
              <div className="flex items-center gap-2">
                <img
                  src={FACE.sophie}
                  alt=""
                  aria-hidden
                  className="h-7 w-7 rounded-full object-cover outline outline-1 outline-slate-200"
                />
                <div className="min-w-0">
                  <div className="truncate text-[11px] font-bold tracking-tight text-slate-900">
                    Sophie Bell
                  </div>
                  <div className="text-[9px] font-medium text-slate-400">Review received</div>
                </div>
              </div>
              <div className="mt-1.5 flex gap-[2px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={
                      reduced ? { duration: 0 } : { duration: 0.24, delay: 0.1 + i * 0.07 }
                    }
                  >
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  </motion.span>
                ))}
              </div>
              <p className="mt-1 text-[9.5px] leading-[1.45] text-slate-600">
                &ldquo;Great service and really easy to deal with.&rdquo;
              </p>
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Tags
              </span>
              <span className="rounded-full bg-slate-100 px-1.5 py-[2px] text-[9px] font-semibold text-slate-600">
                Client
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Branded payoff                                                    */
/* ---------------------------------------------------------------- */

function AutomationPayoff({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[30%] z-50 w-[66%] min-w-[300px] max-w-[540px]"
          initial={reduced ? false : { opacity: 0, x: "-50%", y: 14, scale: 0.92 }}
          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
          exit={{ opacity: 0, x: "-50%", scale: 0.96 }}
          transition={
            reduced ? { duration: 0 } : { type: "spring", stiffness: 205, damping: 22, mass: 0.88 }
          }
        >
          <div
            className="rounded-[20px] p-[2px] shadow-[0_42px_82px_-30px_rgba(15,23,42,0.5)]"
            style={{
              background:
                "linear-gradient(118deg, #2563ff 0%, #22d3ee 42%, #7c5cf6 78%, #2563ff 100%)",
            }}
          >
            <div className="flex items-center gap-4 rounded-[18px] bg-white px-5 py-4">
              <img
                src={FACE.sophie}
                alt=""
                aria-hidden
                className="h-[52px] w-[52px] shrink-0 rounded-full object-cover outline outline-1 outline-slate-200"
              />
              <div className="min-w-0">
                <div className="flex gap-[2px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-0.5 truncate text-[18px] font-extrabold leading-tight tracking-tight text-slate-900">
                  Sophie Bell
                </div>
                <div className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Review received
                </div>
              </div>
              <motion.div
                className="ml-auto shrink-0 rounded-2xl bg-zapla-blue px-4 py-3 text-right text-[14px] font-extrabold uppercase leading-tight tracking-tight text-white shadow-[0_16px_30px_-12px_rgba(37,99,255,0.85)] sm:text-[16px]"
                initial={reduced ? false : { scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 16, delay: 0.16 }
                }
              >
                Review follow-up
                <br />
                automated
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/* Scene                                                             */
/* ---------------------------------------------------------------- */

export function SceneAutomations({ phase, reduced }: SceneProps) {
  /* timeline
     0 workflow hold · 1 Sophie enters trigger · 2 wait 2 hours complete
     3 review request runs + action detail panel · 4 condition takes No
     5 wait 2 days + reminder sent · 6 review arrives, Yes path lights
     7 tag + notify complete + team toast · 8 branded payoff
     9 final complete workflow hold */
  const triggerState: NodeState = phase >= 1 ? "done" : "idle";
  const waitState: NodeState = phase >= 2 ? "done" : phase === 1 ? "active" : "idle";
  const sendState: NodeState = phase >= 3 ? "done" : phase === 2 ? "active" : "idle";
  const condState: NodeState = phase >= 6 ? "done" : phase >= 4 ? "active" : "idle";
  const wait2dState: NodeState = phase >= 5 ? "done" : phase === 4 ? "active" : "idle";
  const reminderState: NodeState = phase >= 6 ? "done" : phase === 5 ? "active" : "idle";
  const tagState: NodeState = phase >= 7 ? "done" : phase === 6 ? "active" : "idle";
  const notifyState: NodeState = phase >= 7 ? "done" : phase === 6 ? "active" : "idle";

  const panel = phase >= 3 && phase <= 7;
  const panelMode: "config" | "review" = phase >= 6 ? "review" : "config";
  const toast = phase >= 7 && phase <= 8;

  /* cursor selects the real review-request node to reveal its detail */
  const rootRef = useRef<HTMLDivElement | null>(null);
  const sendNodeRef = useRef<HTMLDivElement | null>(null);
  const showCursor = !reduced && (phase === 2 || phase === 3);
  const press = phase === 3;
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!showCursor) {
      setPoint(null);
      return;
    }
    const measure = () => {
      const root = rootRef.current;
      const el = sendNodeRef.current;
      if (!root || !el) return;
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPoint({
        x: b.left - r.left + b.width * 0.62,
        y: b.top - r.top + b.height * 0.62,
      });
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [showCursor]);

  return (
    <div ref={rootRef} className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      {/* native workflow bar */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/85 px-3.5 py-2">
        <span className="hidden text-[10px] font-medium text-slate-400 sm:inline">
          Automations / Workflows /
        </span>
        <span className="truncate text-[12px] font-bold tracking-tight text-slate-800">
          Review Request · Completed Job
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[9.5px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden rounded-md border border-slate-200 px-2 py-[3px] text-[9.5px] font-semibold text-slate-500 sm:inline">
            Save
          </span>
          <span className="rounded-md bg-zapla-ink px-2 py-[3px] text-[9.5px] font-semibold text-white">
            Published
          </span>
          <MoreHorizontal className="h-3.5 w-3.5 text-slate-300" />
        </div>
      </div>

      {/* canvas */}
      <div className="relative min-h-0 flex-1">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative flex h-full gap-3 px-3 py-2">
          {/* workflow column */}
          <div className="flex min-w-0 flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-[330px]">
              <WorkflowNode
                icon={Zap}
                kind="Trigger"
                title="Job completed"
                detail="Appointment marked complete"
                state={triggerState}
                doneLabel="Triggered"
                reduced={reduced}
              >
                <AnimatePresence>
                  {phase >= 1 ? (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, x: -22, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
                      className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/80 py-[2px] pl-[2px] pr-2"
                    >
                      <img
                        src={FACE.sophie}
                        alt=""
                        aria-hidden
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      <span className="text-[9.5px] font-bold text-blue-700">
                        Sophie Bell · Just now
                      </span>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </WorkflowNode>

              <Connector on={phase >= 1} reduced={reduced} />

              <WorkflowNode
                icon={Clock}
                kind="Wait"
                title="Wait 2 hours"
                state={waitState}
                reduced={reduced}
              />

              <Connector on={phase >= 2} reduced={reduced} />

              <WorkflowNode
                nodeRef={sendNodeRef}
                icon={MessageSquare}
                kind="Action · SMS"
                title="Send review request"
                detail="Feedback link to contact"
                state={sendState}
                doneLabel="Sent"
                selected={phase >= 3 && phase <= 5}
                reduced={reduced}
              />

              <Connector on={phase >= 4} reduced={reduced} />

              <WorkflowNode
                icon={GitBranch}
                kind="Condition"
                title="Review received?"
                state={condState}
                doneLabel="Yes"
                reduced={reduced}
              />

              {/* branches */}
              <div className="mt-0 grid grid-cols-2 gap-2.5">
                {/* No branch */}
                <div>
                  <Connector on={phase >= 4} label="No" height={16} reduced={reduced} />
                  <WorkflowNode
                    icon={Clock}
                    kind="Wait"
                    title="Wait 2 days"
                    state={wait2dState}
                    dim={phase >= 7}
                    reduced={reduced}
                  />
                  <Connector on={phase >= 5} height={14} reduced={reduced} />
                  <WorkflowNode
                    icon={MessageSquare}
                    kind="Action · SMS"
                    title="Send reminder"
                    state={reminderState}
                    doneLabel="Sent"
                    dim={phase >= 7}
                    reduced={reduced}
                  />
                </div>

                {/* Yes branch */}
                <div>
                  <Connector on={phase >= 6} label="Yes" height={16} reduced={reduced} />
                  <WorkflowNode
                    icon={Tag}
                    kind="Action"
                    title="Tag: Advocate"
                    state={tagState}
                    doneLabel="Tagged"
                    reduced={reduced}
                  />
                  <Connector on={phase >= 7} height={14} reduced={reduced} />
                  <WorkflowNode
                    icon={Bell}
                    kind="Action"
                    title="Notify team"
                    state={notifyState}
                    doneLabel="Notified"
                    reduced={reduced}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* right panel */}
          <AnimatePresence>
            {panel ? <ActivityPanel mode={panelMode} reduced={reduced} /> : null}
          </AnimatePresence>
        </div>

        {/* team notification toast */}
        <AnimatePresence>
          {toast ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
              className="absolute bottom-3 left-3 z-40 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-[0_18px_34px_-24px_rgba(15,23,42,0.5)]"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="text-[10.5px] font-bold tracking-tight text-slate-900">
                  New review received
                </div>
                <div className="text-[9px] font-medium text-slate-400">
                  Sophie Bell tagged Advocate
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AutomationPayoff show={phase === 8} reduced={reduced} />
        <DemoCursor point={point} press={press} reduced={reduced} />
      </div>
    </div>
  );
}
