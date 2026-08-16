/* Opportunities scene: a real, populated Zapla pipeline board.
   All businesses, people and values are fictional. */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "./faces";
import { EASE_OUT, type SceneProps } from "./motion-kit";

/* ---------------------------------------------------------------- */
/* Zapla demo pointer (same visual language as the Contacts scene)   */
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
          <span
            className="pointer-events-none absolute left-0 top-0 h-9 w-9 -translate-x-1/3 -translate-y-1/3 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,255,0.28), rgba(37,99,255,0) 68%)",
            }}
          />
          <AnimatePresence>
            {press ? (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 rounded-full border-2"
                style={{ borderColor: "rgba(37,99,255,0.55)" }}
                initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
                animate={{ width: 42, height: 42, x: -21, y: -21, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            ) : null}
          </AnimatePresence>
          <motion.svg
            width="30"
            height="30"
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
              <linearGradient id="zaplaOppPointerFill" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#3b82ff" />
                <stop offset="55%" stopColor="#2563ff" />
                <stop offset="100%" stopColor="#7c5cf6" />
              </linearGradient>
            </defs>
            <path
              d={POINTER_PATH}
              fill="url(#zaplaOppPointerFill)"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M6.2 4.1 L15.2 11.3"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */
/* Board data                                                        */
/* ---------------------------------------------------------------- */

type Deal = {
  id: string;
  name: string;
  detail?: string;
  value: string;
  source: string;
  touch: string;
  face: string;
};

const STAGE_KEYS = ["new", "qualified", "proposal", "negotiation"] as const;
type StageKey = (typeof STAGE_KEYS)[number];

const STAGE_META: Record<StageKey, { label: string; dot: string; bar: string }> = {
  new: { label: "New Enquiry", dot: "bg-blue-500", bar: "bg-blue-500/70" },
  qualified: { label: "Qualified", dot: "bg-teal-500", bar: "bg-teal-500/70" },
  proposal: { label: "Proposal Sent", dot: "bg-amber-500", bar: "bg-amber-500/70" },
  negotiation: { label: "Negotiation", dot: "bg-violet-500", bar: "bg-violet-500/70" },
};

const DEALS: Record<StageKey, Deal[]> = {
  new: [
    {
      id: "northside",
      name: "Northside Plumbing",
      value: "$2,400",
      source: "Google",
      touch: "34 min ago",
      face: FACE.sam,
    },
    {
      id: "willow",
      name: "Willow Pilates",
      value: "$1,800",
      source: "Instagram",
      touch: "1 hr ago",
      face: FACE.sophie,
    },
  ],
  qualified: [
    {
      id: "brightpath",
      name: "Bright Path Physio",
      value: "$3,600",
      source: "Referral",
      touch: "Today",
      face: FACE.alex,
    },
    {
      id: "cedar",
      name: "Cedar & Co Interiors",
      value: "$7,500",
      source: "Website",
      touch: "Yesterday",
      face: FACE.nina,
    },
  ],
  proposal: [
    {
      id: "atlas",
      name: "Atlas Auto Care",
      value: "$5,200",
      source: "Phone",
      touch: "2 days ago",
      face: FACE.daniel,
    },
    {
      id: "eastside",
      name: "Eastside Property Group",
      value: "$9,800",
      source: "Email",
      touch: "Yesterday",
      face: FACE.priya,
    },
  ],
  negotiation: [
    {
      id: "bloom",
      name: "Bloom Skin Studio",
      value: "$4,400",
      source: "Instagram",
      touch: "Today",
      face: FACE.jordan,
    },
    {
      id: "summit",
      name: "Summit Advisory",
      value: "$12,500",
      source: "Referral",
      touch: "3 days ago",
      face: FACE.tom,
    },
  ],
};

const MAYA: Deal = {
  id: "maya",
  name: "Maya Chen",
  detail: "VIP comeback",
  value: "$2,400",
  source: "SMS reply",
  touch: "Just now",
  face: FACE.maya,
};

function SourceChip({ source }: { source: string }) {
  const tone =
    source === "SMS reply"
      ? "bg-blue-50 text-blue-700"
      : source === "Referral"
        ? "bg-emerald-50 text-emerald-700"
        : source === "Instagram"
          ? "bg-pink-50 text-pink-700"
          : source === "Website"
            ? "bg-sky-50 text-sky-700"
            : source === "Email"
              ? "bg-violet-50 text-violet-700"
              : "bg-slate-100 text-slate-600";
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-[2px] text-[9.5px] font-semibold leading-none whitespace-nowrap",
        tone,
      )}
    >
      {source}
    </span>
  );
}

function DealCard({
  deal,
  cardRef,
  highlight,
  dragging,
  reduced,
}: {
  deal: Deal;
  cardRef?: (el: HTMLDivElement | null) => void;
  highlight?: "blue" | "cyan" | null;
  dragging?: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      layoutId={`opp-${deal.id}`}
      layout
      ref={cardRef}
      initial={reduced ? false : { opacity: 0, y: -12, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: dragging ? -8 : 0,
        scale: dragging ? 1.03 : 1,
        rotate: dragging ? -1.6 : 0,
      }}
      transition={{
        layout: { duration: reduced ? 0 : 0.9, ease: EASE_OUT },
        default: { duration: reduced ? 0 : 0.4, ease: EASE_OUT },
      }}
      style={{ zIndex: dragging ? 40 : 1 }}
      className={cn(
        "relative rounded-xl border bg-white p-2.5 transition-shadow duration-300",
        dragging
          ? "border-zapla-blue/50 shadow-[0_22px_40px_-16px_rgba(15,23,42,0.45)]"
          : highlight
            ? "border-zapla-blue/60 shadow-[0_0_0_3px_rgba(37,99,255,0.14)]"
            : "border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
      )}
    >
      <div className="flex items-start gap-2">
        <img
          src={deal.face}
          alt=""
          aria-hidden
          className="h-6 w-6 shrink-0 rounded-full object-cover ring-2 ring-white"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11.5px] font-semibold leading-tight text-slate-800">
            {deal.name}
          </div>
          {deal.detail ? (
            <div className="truncate text-[10px] font-medium text-slate-400">{deal.detail}</div>
          ) : null}
        </div>
        <span className="shrink-0 text-[11.5px] font-bold tracking-tight text-slate-900">
          {deal.value}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-1.5">
        <SourceChip source={deal.source} />
        <span className="truncate text-[9.5px] font-medium text-slate-400">{deal.touch}</span>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Large Qualified payoff                                            */
/* ---------------------------------------------------------------- */

function QualifiedPayoff({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[30%] z-50 w-[64%] min-w-[300px] max-w-[520px]"
          initial={reduced ? false : { opacity: 0, x: "-38%", y: 6, scale: 0.92 }}
          animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
          exit={{ opacity: 0, x: "-50%", scale: 0.96 }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 210, damping: 22, mass: 0.85 }
          }
        >
          <div
            className="rounded-[20px] p-[2px] shadow-[0_40px_80px_-30px_rgba(15,23,42,0.5)]"
            style={{
              background:
                "linear-gradient(115deg, #2563ff 0%, #22d3ee 42%, #8b5cf6 78%, #2563ff 100%)",
            }}
          >
            <div className="flex items-center gap-4 rounded-[18px] bg-white px-5 py-4">
              <img
                src={MAYA.face}
                alt=""
                aria-hidden
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white outline outline-1 outline-slate-200"
              />
              <div className="min-w-0">
                <div className="truncate text-[22px] font-extrabold leading-tight tracking-tight text-slate-900">
                  Maya Chen
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                  <MessageSquare className="h-3.5 w-3.5 text-zapla-blue" />
                  VIP comeback · $2,400
                </div>
              </div>
              <motion.div
                className="ml-auto shrink-0 rounded-2xl bg-teal-500 px-5 py-3 text-[18px] font-extrabold uppercase tracking-tight text-white shadow-[0_16px_30px_-12px_rgba(20,184,166,0.85)]"
                initial={reduced ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 320, damping: 16, delay: 0.16 }
                }
              >
                Qualified
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

export function SceneOpportunities({ phase, reduced }: SceneProps) {
  /* timeline
     0 populated board hold · 1 Maya arrives in New Enquiry
     2 cursor grabs Maya · 3 drag to Qualified · 4 large QUALIFIED payoff
     5 board hold · 6 cursor grabs Eastside · 7 drag to Negotiation
     8 compact "Stage updated" confirmation · 9 final board hold */
  const mayaVisible = phase >= 1;
  const mayaNew = phase >= 1 && phase <= 2;
  const mayaDragging = phase === 2 || phase === 3;
  const qualifiedActive = phase === 3;
  const payoff = phase === 4;
  const mayaFresh = phase >= 1 && phase <= 4;

  const eastDragging = phase === 6 || phase === 7;
  const eastMoved = phase >= 7;
  const negotiationActive = phase === 7;
  const confirm = phase === 8;
  const eastHighlight = phase >= 7 && phase <= 8;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const mayaRef = useRef<HTMLDivElement | null>(null);
  const eastRef = useRef<HTMLDivElement | null>(null);
  const qualifiedRef = useRef<HTMLDivElement | null>(null);
  const negotiationRef = useRef<HTMLDivElement | null>(null);

  const target: "maya" | "qualified" | "east" | "negotiation" | null =
    phase === 2 ? "maya" : phase === 3 ? "qualified" : phase === 6 ? "east" : phase === 7 ? "negotiation" : null;
  const press = phase === 2 || phase === 6;

  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduced || !target) {
      setPoint(null);
      return;
    }
    const measure = () => {
      const root = rootRef.current;
      const el =
        target === "maya"
          ? mayaRef.current
          : target === "east"
            ? eastRef.current
            : target === "qualified"
              ? qualifiedRef.current
              : negotiationRef.current;
      if (!root || !el) return;
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      const onCard = target === "maya" || target === "east";
      setPoint({
        x: b.left - r.left + b.width * (onCard ? 0.42 : 0.5),
        y: b.top - r.top + (onCard ? b.height * 0.5 : 78),
      });
    };
    const id = requestAnimationFrame(measure);
    const t = window.setTimeout(measure, 260);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [target, reduced, phase]);

  const columns: Array<{ key: StageKey; deals: Deal[] }> = STAGE_KEYS.map((key) => {
    let deals = DEALS[key];
    if (key === "new") deals = mayaNew ? [MAYA, ...deals] : deals;
    if (key === "qualified") deals = phase >= 3 && mayaVisible ? [MAYA, ...deals] : deals;
    if (key === "proposal" && eastMoved) deals = deals.filter((d) => d.id !== "eastside");
    if (key === "negotiation" && eastMoved) {
      const east = DEALS.proposal.find((d) => d.id === "eastside")!;
      deals = [east, ...deals];
    }
    return { key, deals };
  });

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-slate-50/70">
      <div className="zapla-scroll-hide h-full overflow-x-auto overflow-y-hidden">
        <LayoutGroup id="opportunities">
          <div className="flex h-full min-w-[620px] gap-2.5 px-3.5 py-3">
            {columns.map(({ key, deals }) => {
              const meta = STAGE_META[key];
              const active =
                (key === "qualified" && qualifiedActive) ||
                (key === "negotiation" && negotiationActive);
              return (
                <motion.div
                  key={key}
                  ref={
                    key === "qualified"
                      ? qualifiedRef
                      : key === "negotiation"
                        ? negotiationRef
                        : undefined
                  }
                  animate={{
                    boxShadow: active
                      ? "0 0 0 2px rgba(34,211,238,0.55), 0 18px 34px -22px rgba(37,99,255,0.5)"
                      : "0 0 0 1px rgba(226,232,240,0.9)",
                    backgroundColor: active ? "rgba(240,249,255,0.9)" : "rgba(255,255,255,0.7)",
                  }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: EASE_OUT }}
                  className="relative flex min-w-[148px] flex-1 flex-col rounded-2xl px-2 pb-2 pt-2.5"
                >
                  <div className="mb-2 flex items-center gap-1.5 px-0.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                    <span className="truncate text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500">
                      {meta.label}
                    </span>
                    <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-[1px] text-[9.5px] font-bold text-slate-500">
                      {deals.length}
                    </span>
                  </div>
                  <div className={cn("h-[2px] rounded-full", meta.bar)} />

                  <div className="relative mt-2 space-y-2">
                    {/* compact native confirmation on Negotiation */}
                    <AnimatePresence>
                      {key === "negotiation" && confirm ? (
                        <motion.div
                          initial={reduced ? false : { opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: reduced ? 0 : 0.32, ease: EASE_OUT }}
                          className="absolute -top-1 left-0 right-0 z-40 flex items-center gap-2 rounded-lg border border-zapla-blue/30 bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-14px_rgba(15,23,42,0.35)]"
                        >
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </span>
                          <span className="text-[10px] font-medium text-slate-500">
                            Stage updated
                          </span>
                          <span className="ml-auto text-[11px] font-extrabold tracking-tight text-violet-700">
                            Negotiation
                          </span>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <AnimatePresence initial={false}>
                      {deals.map((deal) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          reduced={reduced}
                          cardRef={
                            deal.id === "maya"
                              ? (el) => {
                                  mayaRef.current = el;
                                }
                              : deal.id === "eastside"
                                ? (el) => {
                                    eastRef.current = el;
                                  }
                                : undefined
                          }
                          dragging={
                            (deal.id === "maya" && mayaDragging) ||
                            (deal.id === "eastside" && eastDragging)
                          }
                          highlight={
                            (deal.id === "maya" && mayaFresh) ||
                            (deal.id === "eastside" && eastHighlight)
                              ? "blue"
                              : null
                          }
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <QualifiedPayoff show={payoff} reduced={reduced} />
      <DemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
