/* Automations scene: a fixed Zapla workflow chart that executes a review
   follow-up automation. A single execution token travels the connector
   geometry. All people, businesses and reviews are fictional. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bell,
  Check,
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
/* Fixed graph coordinate space (never reflows)                      */
/* ---------------------------------------------------------------- */

const W = 880;
const H = 470;

type NodeState = "idle" | "active" | "done";

type Box = { x: number; y: number; w: number; h: number };

const N = {
  trigger: { x: 340, y: 0, w: 200, h: 72 },
  wait: { x: 340, y: 84, w: 200, h: 42 },
  send: { x: 340, y: 138, w: 200, h: 50 },
  cond: { x: 340, y: 204, w: 200, h: 42 },
  wait2d: { x: 108, y: 282, w: 176, h: 42 },
  reminder: { x: 108, y: 338, w: 176, h: 42 },
  review: { x: 108, y: 386, w: 176, h: 72 },
  tag: { x: 448, y: 398, w: 176, h: 50 },
  notify: { x: 656, y: 398, w: 176, h: 50 },
} satisfies Record<string, Box>;

const c = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });

/* connector paths, orthogonal with clean radii */
const SEG = {
  s1: "M440 72 V84",
  s2: "M440 126 V138",
  s3: "M440 188 V204",
  fork: "M440 246 V266",
  no: "M440 266 H208 A12 12 0 0 0 196 278 V282",
  no2: "M196 324 V338",
  no3: "M196 380 V386",
  merge: "M284 423 H448",
  yes: "M440 266 H548 A12 12 0 0 1 560 278 V398",
  succ: "M624 423 H656",
} as const;

function Wire({
  d,
  on,
  reduced,
  arrow,
}: {
  d: string;
  on: boolean;
  reduced: boolean;
  arrow?: boolean;
}) {
  return (
    <>
      <path
        d={d}
        fill="none"
        stroke="rgba(148,163,184,0.55)"
        strokeWidth={2}
        strokeLinecap="round"
        markerEnd={arrow ? "url(#zaplaWireIdle)" : undefined}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#zaplaWireLive)"
        strokeWidth={2.4}
        strokeLinecap="round"
        markerEnd={arrow ? "url(#zaplaWireLive2)" : undefined}
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
      />
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Node                                                              */
/* ---------------------------------------------------------------- */

function Node({
  box,
  icon: Icon,
  kind,
  title,
  state,
  reduced,
  children,
}: {
  box: Box;
  icon: typeof Zap;
  kind?: string;
  title: string;
  state: NodeState;
  reduced: boolean;
  children?: React.ReactNode;
}) {
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
      transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
    >
      {state === "active" && !reduced ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[14px]"
          style={{ boxShadow: "0 0 0 6px rgba(37,99,255,0.14)" }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      <div className="flex items-start gap-2">
        <span
          className={cn(
            "mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors",
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
          {kind ? (
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
              {kind}
            </div>
          ) : null}
          <div className="truncate text-[12.5px] font-bold leading-tight tracking-tight text-slate-900">
            {title}
          </div>
          {children}
        </div>
      </div>

      <AnimatePresence>
        {state === "done" ? (
          <motion.span
            className="absolute -right-1.5 -top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 shadow-[0_4px_10px_-4px_rgba(16,185,129,0.9)]"
            initial={reduced ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
          >
            <Check className="h-[11px] w-[11px] text-white" strokeWidth={3.5} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Execution token                                                   */
/* ---------------------------------------------------------------- */

const DOT_ROUTE: Record<number, Array<{ x: number; y: number }>> = {
  1: [c(N.trigger)],
  2: [c(N.trigger), { x: 440, y: 78 }, c(N.wait)],
  3: [c(N.wait), { x: 440, y: 132 }, c(N.send)],
  4: [c(N.send), { x: 440, y: 196 }, c(N.cond)],
  5: [c(N.cond), { x: 440, y: 266 }, { x: 196, y: 266 }, c(N.wait2d)],
  6: [c(N.wait2d), { x: 196, y: 331 }, c(N.reminder)],
  7: [c(N.reminder), { x: 196, y: 383 }, c(N.review)],
  8: [c(N.review), { x: 366, y: 423 }, c(N.tag), { x: 640, y: 423 }, c(N.notify)],
};

function Token({ phase, reduced }: { phase: number; reduced: boolean }) {
  const route = DOT_ROUTE[phase];
  const visible = phase >= 1 && phase <= 8 && !!route;
  if (reduced || !visible) return null;
  return (
    <motion.span
      className="pointer-events-none absolute left-0 top-0 z-30 h-[9px] w-[9px] rounded-full"
      style={{
        marginLeft: -4.5,
        marginTop: -4.5,
        background: "linear-gradient(140deg,#3b82ff,#22d3ee)",
        boxShadow: "0 0 0 3px rgba(37,99,255,0.18), 0 0 12px rgba(37,99,255,0.7)",
      }}
      initial={{ x: route[0].x, y: route[0].y, opacity: 0 }}
      animate={{
        x: route.map((p) => p.x),
        y: route.map((p) => p.y),
        opacity: 1,
      }}
      transition={{
        x: { duration: Math.max(0.5, route.length * 0.24), ease: "easeInOut" },
        y: { duration: Math.max(0.5, route.length * 0.24), ease: "easeInOut" },
        opacity: { duration: 0.25, ease: EASE_OUT },
      }}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Scene                                                             */
/* ---------------------------------------------------------------- */

export function SceneAutomations({ phase, reduced }: SceneProps) {
  /* 0 hold · 1 trigger · 2 wait 2h · 3 send review request · 4 condition (No)
     5 wait 2 days · 6 send reminder · 7 review received event
     8 merge: tag + notify · 9 final hold */
  const st = (active: number, doneFrom: number): NodeState =>
    phase >= doneFrom ? "done" : phase === active ? "active" : "idle";

  const triggerState = st(1, 2);
  const waitState = st(2, 3);
  const sendState = st(3, 4);
  const condState = st(4, 5);
  const wait2dState = st(5, 6);
  const reminderState = st(6, 7);
  const reviewState = st(7, 8);
  const tagState = st(8, 9);
  const notifyState = st(8, 9);

  /* scale the fixed graph to the stage without reflowing it */
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      setScale(Math.min(r.width / W, r.height / H, 1.12) * 0.98);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
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
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.4) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        <div ref={wrapRef} className="absolute inset-0 px-2 py-2">
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              width: W,
              height: H,
              transform: `scale(${scale}) translate(-50%, -50%)`,
              transformOrigin: "0 0",
            }}
          >
            {/* connectors */}
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden>
              <defs>
                <linearGradient id="zaplaWireLive" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563ff" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <marker
                  id="zaplaWireIdle"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M0 1 L8 5 L0 9 z" fill="rgba(148,163,184,0.7)" />
                </marker>
                <marker
                  id="zaplaWireLive2"
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M0 1 L8 5 L0 9 z" fill="#22d3ee" />
                </marker>
              </defs>

              <Wire d={SEG.s1} on={phase >= 2} reduced={reduced} arrow />
              <Wire d={SEG.s2} on={phase >= 3} reduced={reduced} arrow />
              <Wire d={SEG.s3} on={phase >= 4} reduced={reduced} arrow />
              <Wire d={SEG.fork} on={phase >= 5} reduced={reduced} />
              <Wire d={SEG.no} on={phase >= 5} reduced={reduced} arrow />
              <Wire d={SEG.no2} on={phase >= 6} reduced={reduced} arrow />
              <Wire d={SEG.no3} on={phase >= 7} reduced={reduced} arrow />
              <Wire d={SEG.merge} on={phase >= 8} reduced={reduced} arrow />
              <Wire d={SEG.yes} on={false} reduced={reduced} arrow />
              <Wire d={SEG.succ} on={phase >= 8} reduced={reduced} arrow />
            </svg>

            {/* branch labels */}
            <span
              className={cn(
                "absolute rounded-full px-1.5 py-[1px] text-[9px] font-bold leading-none transition-colors",
                phase >= 5 ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500",
              )}
              style={{ left: 210, top: 250 }}
            >
              No
            </span>
            <span
              className="absolute rounded-full bg-slate-100 px-1.5 py-[1px] text-[9px] font-bold leading-none text-slate-400"
              style={{ left: 500, top: 250 }}
            >
              Yes
            </span>

            <Token phase={phase} reduced={reduced} />

            {/* nodes */}
            <Node
              box={N.trigger}
              icon={Zap}
              kind="Trigger"
              title="Job completed"
              state={triggerState}
              reduced={reduced}
            >
              <AnimatePresence>
                {phase >= 1 ? (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: -6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT }}
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
            </Node>

            <Node
              box={N.wait}
              icon={Clock}
              kind="Wait"
              title="Wait 2 hours"
              state={waitState}
              reduced={reduced}
            />

            <Node
              box={N.send}
              icon={MessageSquare}
              kind="SMS"
              title="Send review request"
              state={sendState}
              reduced={reduced}
            >
              <AnimatePresence>
                {phase >= 4 ? (
                  <motion.span
                    initial={reduced ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
                    className="mt-[3px] inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-[2px] text-[9px] font-bold text-emerald-700"
                  >
                    <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                    SMS sent
                  </motion.span>
                ) : (
                  <motion.span
                    key="hint"
                    className="mt-[2px] block truncate text-[9.5px] font-medium text-slate-400"
                  >
                    Friendly feedback request
                  </motion.span>
                )}
              </AnimatePresence>
            </Node>

            <Node
              box={N.cond}
              icon={GitBranch}
              kind="Condition"
              title="Review received?"
              state={condState}
              reduced={reduced}
            />

            <Node
              box={N.wait2d}
              icon={Clock}
              kind="Wait"
              title="Wait 2 days"
              state={wait2dState}
              reduced={reduced}
            />

            <Node
              box={N.reminder}
              icon={MessageSquare}
              kind="SMS"
              title="Send reminder"
              state={reminderState}
              reduced={reduced}
            />

            <Node
              box={N.review}
              icon={Star}
              kind="Event"
              title="Review received"
              state={reviewState}
              reduced={reduced}
            >
              <AnimatePresence>
                {phase >= 7 ? (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.38, ease: EASE_OUT }}
                    className="mt-[3px]"
                  >
                    <div className="flex items-center gap-1.5">
                      <img
                        src={FACE.sophie}
                        alt=""
                        aria-hidden
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      <span className="text-[9.5px] font-bold text-slate-600">Sophie Bell</span>
                      <span className="flex gap-[1px]">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} className="h-[9px] w-[9px] fill-amber-400 text-amber-400" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-[2px] truncate text-[9px] font-medium text-slate-400">
                      &ldquo;Great service and really easy to deal with.&rdquo;
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </Node>

            <Node
              box={N.tag}
              icon={Tag}
              kind="Action"
              title="Tag customer"
              state={tagState}
              reduced={reduced}
            >
              <AnimatePresence>
                {phase >= 8 ? (
                  <motion.span
                    initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
                    className="mt-[3px] inline-flex rounded-full bg-violet-50 px-1.5 py-[2px] text-[9px] font-bold text-violet-700"
                  >
                    Advocate
                  </motion.span>
                ) : (
                  <span className="mt-[2px] block text-[9.5px] font-medium text-slate-400">
                    Advocate
                  </span>
                )}
              </AnimatePresence>
            </Node>

            <Node
              box={N.notify}
              icon={Bell}
              kind="Action"
              title="Notify team"
              state={notifyState}
              reduced={reduced}
            >
              <AnimatePresence>
                {phase >= 8 ? (
                  <motion.span
                    initial={reduced ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
                    className="mt-[3px] inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-[2px] text-[9px] font-bold text-emerald-700"
                  >
                    <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                    Team notified
                  </motion.span>
                ) : (
                  <span className="mt-[2px] block text-[9.5px] font-medium text-slate-400">
                    New review received
                  </span>
                )}
              </AnimatePresence>
            </Node>
          </div>
        </div>
      </div>
    </div>
  );
}
