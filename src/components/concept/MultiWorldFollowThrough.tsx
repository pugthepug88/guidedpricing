/* Concept-only, isolated art direction. People, businesses and numbers are
   fictional.

   Thesis: the same follow-through problem lives in every established service
   business. The scroll expands from ONE world into MANY, then converges into
   ONE Zapla system.

   Narrative shape: 1 world -> 2 -> 3 -> recognition peak (5 windows) ->
   worlds recede -> one Zapla product environment.

   Windows are square-edged, unequally scaled, and enter/leave from off-canvas
   on scroll. One window always dominates. Each world carries a tiny truthful
   customer thread whose state only advances while its operator is visibly
   engaged in real work. */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, CalendarDays, Check, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Face } from "@/components/v5/kit";
import { FACE } from "@/components/v5/faces";
import { useIsMobile } from "@/hooks/use-mobile";

const MEDIA = "/concept/multi-world";
const NAV = 66;

const DISPLAY = '"Inter Tight", "Manrope", system-ui, sans-serif';
const INK = "#0B1220";
const CYAN = "#06B6D4";

/* ------------------------------------------------------------------ */
/* worlds                                                              */
/* ------------------------------------------------------------------ */

type World = {
  key: string;
  file: string;
  trade: string;
  place: string;
  customer: string;
  face: string;
  states: string[];
};

const WORLDS: World[] = [
  {
    key: "mechanic",
    file: "mechanic",
    trade: "Automotive workshop",
    place: "Marrickville, NSW",
    customer: "Michael Tran",
    face: FACE.daniel,
    states: ["New enquiry", "Quote sent", "Booked Thursday", "Paid · A$1,280"],
  },
  {
    key: "agent",
    file: "agent",
    trade: "Property agency",
    place: "Hawthorn, VIC",
    customer: "Emma & Josh",
    face: FACE.maya,
    states: ["Inspection request", "Time offered", "Inspection confirmed", "Offer follow-up sent"],
  },
  {
    key: "builder",
    file: "builder",
    trade: "Renovation builder",
    place: "Newstead, QLD",
    customer: "Rachel Morgan",
    face: FACE.priya,
    states: ["Site visit booked", "Scope sent", "Deposit invoiced", "Deposit received"],
  },
  {
    key: "broker",
    file: "broker",
    trade: "Mortgage broker",
    place: "North Sydney, NSW",
    customer: "Daniel Whitmore",
    face: FACE.tom,
    states: ["Pre-approval enquiry", "Docs requested", "Docs received", "Lodged with lender"],
  },
  {
    key: "consultant",
    file: "consultant",
    trade: "Project consultancy",
    place: "Adelaide, SA",
    customer: "Harlow Group",
    face: FACE.leo,
    states: ["Brief received", "Proposal sent", "Review booked", "Stage 1 approved"],
  },
  {
    key: "facilities",
    file: "facilities",
    trade: "Facilities maintenance",
    place: "Laverton, VIC",
    customer: "Northline Depot",
    face: FACE.sophie,
    states: ["Service due", "Visit scheduled", "Job completed", "Next cycle set"],
  },
];

const HERO = WORLDS[0];

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

type Box = [number, number, number, number];

function useBoxStyle(p: MotionValue<number>, at: number[], boxes: Box[]) {
  const left = useTransform(p, at, boxes.map((b) => `${b[0]}%`));
  const top = useTransform(p, at, boxes.map((b) => `${b[1]}%`));
  const width = useTransform(p, at, boxes.map((b) => `${b[2]}%`));
  const height = useTransform(p, at, boxes.map((b) => `${b[3]}%`));
  return { left, top, width, height };
}

function Clip({ file, reduced }: { file: string; reduced: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!reduced) void ref.current?.play().catch(() => {});
  }, [reduced]);
  if (reduced)
    return (
      <img src={`${MEDIA}/${file}.jpg`} alt="" aria-hidden className="h-full w-full object-cover" />
    );
  return (
    <video
      ref={ref}
      src={`${MEDIA}/${file}.mp4`}
      poster={`${MEDIA}/${file}.jpg`}
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
      aria-hidden
      className="h-full w-full object-cover"
    />
  );
}

/* One world window — square edges, film plus a quiet caption ---------- */
function WorldWindow({
  world,
  reduced,
  state,
  dim,
  showCue,
  compact,
}: {
  world: World;
  reduced: boolean;
  state: number;
  dim: number;
  showCue: boolean;
  compact?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0A0E17]">
      <Clip file={world.file} reduced={reduced} />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#070B14]"
        style={{ opacity: dim }}
      />
      <div className="absolute left-0 top-0 flex items-center gap-2 px-3 py-2.5">
        <span className="h-[2px] w-4" style={{ background: CYAN }} aria-hidden />
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/75">
          {world.trade}
        </span>
      </div>
      {showCue ? (
        <div className="absolute bottom-0 left-0 w-full">
          <ThreadCue world={world} state={state} compact={compact} />
        </div>
      ) : null}
    </div>
  );
}

/* The follow-through object — identical shape in every world ---------- */
function ThreadCue({
  world,
  state,
  compact,
  onSurface,
}: {
  world: World;
  state: number;
  compact?: boolean;
  onSurface?: boolean;
}) {
  const label = world.states[Math.min(state, world.states.length - 1)];
  return (
    <div
      className={cn(
        "flex w-full items-center backdrop-blur-[3px]",
        compact ? "gap-2 px-2.5 py-2" : "gap-2.5 px-3 py-2.5",
      )}
      style={{
        background: onSurface ? "#FFFFFF" : "rgba(8,12,23,0.5)",
        borderTop: onSurface ? "1px solid rgba(11,18,32,0.08)" : "1px solid rgba(255,255,255,0.16)",
      }}
    >
      <Face src={world.face} size={compact ? 24 : 28} ring={false} />
      <div className="min-w-0 flex-1">
        <div
          className="truncate text-[12px] font-semibold leading-none tracking-[-0.015em]"
          style={{ fontFamily: DISPLAY, color: onSurface ? INK : "#F7F8FC" }}
        >
          {world.customer}
        </div>
        <div className="mt-[6px] flex items-center gap-1.5">
          <span
            className="h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: CYAN }}
            aria-hidden
          />
          <motion.span
            key={label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="truncate text-[11.5px] font-medium leading-none"
            style={{ color: onSurface ? "rgba(11,18,32,0.75)" : "rgba(247,248,252,0.8)" }}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product environment — the hero world's thread, fully connected      */
/* ------------------------------------------------------------------ */

const THREAD = [
  { from: "them", text: "Hi, the brakes are grinding. Can you look this week?", time: "8:42 AM" },
  { from: "us", text: "Quote attached. Thursday 9:00 AM is open, I'll hold it.", time: "8:44 AM" },
  { from: "them", text: "Booked. See you Thursday.", time: "9:07 AM" },
];

function CustomerRecord({ compact }: { compact: boolean }) {
  return (
    <AppShell activeKey="inbox" title="Michael Tran" subtitle="Customer · Marrickville, NSW">
      <div className="flex h-full min-h-0">
        <div className="hidden w-[206px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
          <div className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Conversations
          </div>
          {[
            { n: "Michael Tran", m: "Booked. See you Thursday.", f: FACE.daniel, on: true },
            { n: "Emma & Josh", m: "Inspection confirmed", f: FACE.maya },
            { n: "Rachel Morgan", m: "Deposit received", f: FACE.priya },
            { n: "Northline Depot", m: "Next cycle set", f: FACE.sophie },
          ].map((c) => (
            <div
              key={c.n}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5",
                c.on && "bg-[#F3F7FF] shadow-[inset_2px_0_0_#2563ff]",
              )}
            >
              <Face src={c.f} size={26} />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-semibold text-slate-900">{c.n}</div>
                <div className="truncate text-[11px] text-slate-400">{c.m}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 flex-col bg-[#F8FAFF]">
          <div className="flex items-center gap-2.5 border-b border-slate-200/80 bg-white px-4 py-2.5">
            <Face src={FACE.daniel} size={26} />
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold leading-none text-slate-900">
                Michael Tran
              </div>
              <div className="mt-[6px] flex items-center gap-1.5">
                <span
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ background: CYAN }}
                  aria-hidden
                />
                <span className="text-[11.5px] font-medium leading-none text-slate-700">
                  Paid · A$1,280
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
            {THREAD.map((m) => (
              <div
                key={m.text}
                className={cn("flex", m.from === "us" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-[8px] px-3 py-2 text-[12.5px] leading-snug",
                    m.from === "us"
                      ? "bg-zapla-blue text-white"
                      : "border border-slate-200 bg-white text-slate-800",
                  )}
                >
                  {m.text}
                  <div
                    className={cn(
                      "mt-1 text-[9.5px] uppercase tracking-[0.12em]",
                      m.from === "us" ? "text-white/65" : "text-slate-400",
                    )}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2 rounded-[8px] border border-slate-200 bg-white px-3 py-2.5">
              <span className="text-[12px] text-slate-400">Write a reply</span>
              <span
                className="ml-auto inline-flex h-6 items-center rounded-[8px] px-2.5 text-[11px] font-semibold text-white"
                style={{ background: CYAN }}
              >
                Send
              </span>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="hidden w-[244px] shrink-0 flex-col gap-2.5 border-l border-slate-200/80 bg-white p-3 md:flex">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Connected
            </div>
            <SysRow
              icon={<CalendarDays className="h-3.5 w-3.5" />}
              label="Booking"
              value="Thu 9:00 AM · confirmed"
              tone="blue"
            />
            <SysRow
              icon={<CreditCard className="h-3.5 w-3.5" />}
              label="Payment"
              value="A$1,280 paid"
              tone="green"
            />
            <SysRow
              icon={<Star className="h-3.5 w-3.5" />}
              label="Review"
              value="Requested · 2 days after"
              tone="slate"
            />
            <div className="mt-1 rounded-[8px] border border-[#06B6D4]/35 bg-[#ECFEFF]/70 p-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
                Next step
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-slate-900">
                <Check className="h-3.5 w-3.5 text-[#0891b2]" strokeWidth={3} />
                Service reminder · 6 months
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function SysRow({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "blue" | "green" | "slate";
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    slate: "bg-slate-100 text-slate-500",
  };
  return (
    <div className="flex items-center gap-2.5 rounded-[8px] border border-slate-200/80 px-2.5 py-2">
      <span className={cn("flex h-6 w-6 items-center justify-center rounded-[7px]", tones[tone])}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </div>
        <div className="truncate text-[12px] font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

function MaskLine({
  p,
  from,
  to,
  children,
  className,
  style,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const clip = useTransform(p, [from, to], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  return (
    <motion.div className={className} style={{ ...style, clipPath: clip }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky sequence                                                     */
/* ------------------------------------------------------------------ */

/* scroll map
   0.00-0.13  ACT A  hero copy + dominant mechanic window
   0.13-0.30  ACT B  mechanic reframes, property world enters
   0.30-0.46  ACT C  builder and broker enter, unequal scale
   0.46-0.62  ACT D  recognition peak, five windows, central statement
   0.62-0.74  ACT E  worlds recede, canvas turns light, one thread survives
   0.74-1.00  ACT F  the thread becomes the record, product dominates      */

type Layout = { at: number[]; boxes: Box[]; dim: number[]; dimAt: number[] };

function Sequence({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = wrap.current;
      if (el) {
        const total = el.offsetHeight - (window.innerHeight - NAV);
        const prog = total > 0 ? (NAV - el.getBoundingClientRect().top) / total : 0;
        p.set(Math.min(1, Math.max(0, prog)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p]);

  /* Thread states advance on a slow wall clock, never on scroll: the operators
     are visibly engaged in their work the whole time, which is the point. */
  useEffect(() => {
    if (reduced) {
      setBeat(3);
      return;
    }
    const id = setInterval(() => setBeat((b) => (b + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  /* ---- window boxes ------------------------------------------------ */
  const mechAt = [0, 0.13, 0.3, 0.46, 0.62, 0.7, 0.9];
  const mech = useBoxStyle(
    p,
    mechAt,
    mobile
      ? [
          [0, 0, 100, 50],
          [0, 0, 100, 50],
          [0, 2, 74, 34],
          [0, 6, 62, 27],
          [0, 8, 52, 22],
          [4, 2, 34, 11],
          [4, 2, 34, 11],
        ]
      : [
          [42, 0, 58, 100],
          [42, 0, 58, 100],
          [30, 8, 52, 62],
          [8, 10, 38, 46],
          [6, 12, 30, 36],
          [3, 4, 15, 15],
          [3, 4, 15, 15],
        ],
  );

  const agentAt = [0.16, 0.3, 0.46, 0.62, 0.7];
  const agent = useBoxStyle(
    p,
    agentAt,
    mobile
      ? [
          [100, 40, 66, 30],
          [26, 40, 74, 30],
          [38, 36, 62, 26],
          [48, 34, 52, 22],
          [48, 34, 52, 22],
        ]
      : [
          [100, 46, 42, 46],
          [64, 46, 34, 44],
          [48, 40, 30, 38],
          [40, 44, 24, 30],
          [40, 44, 24, 30],
        ],
  );

  const builderAt = [0.3, 0.42, 0.55, 0.68];
  const builder = useBoxStyle(
    p,
    builderAt,
    mobile
      ? [
          [-70, 72, 66, 24],
          [4, 72, 66, 24],
          [4, 60, 56, 21],
          [4, 60, 56, 21],
        ]
      : [
          [-40, 14, 34, 40],
          [50, 12, 30, 34],
          [40, 8, 24, 28],
          [40, 8, 24, 28],
        ],
  );

  const brokerAt = [0.36, 0.48, 0.58, 0.7];
  const broker = useBoxStyle(
    p,
    brokerAt,
    mobile
      ? [
          [100, 12, 52, 22],
          [50, 12, 50, 22],
          [58, 14, 42, 18],
          [58, 14, 42, 18],
        ]
      : [
          [100, 62, 30, 30],
          [70, 62, 26, 30],
          [68, 60, 22, 26],
          [68, 60, 22, 26],
        ],
  );

  const consultAt = [0.44, 0.55, 0.64, 0.72];
  const consult = useBoxStyle(
    p,
    consultAt,
    mobile
      ? [
          [-60, 30, 44, 18],
          [6, 30, 44, 18],
          [6, 26, 38, 15],
          [6, 26, 38, 15],
        ]
      : [
          [-30, 66, 26, 26],
          [12, 62, 22, 26],
          [14, 56, 18, 22],
          [14, 56, 18, 22],
        ],
  );

  const facAt = [0.5, 0.6, 0.66, 0.72];
  const fac = useBoxStyle(
    p,
    facAt,
    mobile
      ? [
          [100, 60, 36, 14],
          [64, 60, 36, 14],
          [64, 58, 30, 12],
          [64, 58, 30, 12],
        ]
      : [
          [100, 24, 22, 22],
          [78, 26, 18, 22],
          [80, 30, 15, 18],
          [80, 30, 15, 18],
        ],
  );

  /* enter / leave opacity per world */
  const agentOp = useTransform(p, [0.15, 0.2, 0.64, 0.7], [0, 1, 1, 0]);
  const builderOp = useTransform(p, [0.29, 0.35, 0.63, 0.68], [0, 1, 1, 0]);
  const brokerOp = useTransform(p, [0.35, 0.41, 0.63, 0.68], [0, 1, 1, 0]);
  const consultOp = useTransform(p, [0.43, 0.5, 0.62, 0.67], [0, 1, 1, 0]);
  const facOp = useTransform(p, [0.49, 0.56, 0.62, 0.67], [0, 1, 1, 0]);

  /* the dominant window keeps a lighter veil than the supporting ones */
  const mechDim = useTransform(p, [0, 0.13, 0.3, 0.46, 0.62], [0.3, 0.3, 0.22, 0.26, 0.34]);

  /* canvas + hero copy */
  const canvas = useTransform(p, [0.655, 0.71], ["#080C14", "#F5F6FA"]);
  const heroOpacity = useTransform(p, [0, 0.1, 0.145], [1, 1, 0]);
  const heroY = useTransform(p, [0.09, 0.15], [0, -26]);

  /* central statement at the recognition peak */
  const stmtOpacity = useTransform(p, [0.5, 0.545, 0.6, 0.635], [0, 1, 1, 0]);

  /* surviving thread -> product */
  const cueAt = [0.62, 0.7, 0.78, 0.95];
  const cue = useBoxStyle(
    p,
    cueAt,
    mobile
      ? [
          [6, 78, 88, 11],
          [6, 34, 88, 11],
          [6, 34, 88, 11],
          [6, 34, 88, 11],
        ]
      : [
          [36, 78, 28, 11],
          [34, 44, 30, 12],
          [34, 44, 30, 12],
          [34, 44, 30, 12],
        ],
  );
  const cueSurface = useTransform(p, [0.665, 0.705], [0, 1]);
  const cueOpacity = useTransform(p, [0.6, 0.645, 0.76, 0.79], [0, 1, 1, 0]);

  const shellBox = useBoxStyle(
    p,
    [0.705, 0.88],
    mobile
      ? [
          [6, 34, 88, 11],
          [4, 20, 92, 72],
        ]
      : [
          [34, 44, 30, 12],
          [3, 22, 94, 72],
        ],
  );
  const shellOpacity = useTransform(p, [0.69, 0.72], [0, 1]);
  const headOpacity = useTransform(p, [0.79, 0.85], [0, 1]);
  const headY = useTransform(p, [0.79, 0.86], [14, 0]);

  const supporting: Array<{
    world: World;
    box: ReturnType<typeof useBoxStyle>;
    op: MotionValue<number>;
    z: number;
  }> = [
    { world: WORLDS[1], box: agent, op: agentOp, z: 18 },
    { world: WORLDS[2], box: builder, op: builderOp, z: 16 },
    { world: WORLDS[3], box: broker, op: brokerOp, z: 15 },
    { world: WORLDS[4], box: consult, op: consultOp, z: 14 },
    { world: WORLDS[5], box: fac, op: facOp, z: 13 },
  ];

  return (
    <div
      ref={wrap}
      data-seq="mwft"
      className={mobile ? "relative h-[600vh]" : "relative h-[580vh]"}
    >
      <motion.div
        className="sticky w-full overflow-hidden"
        style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: canvas }}
      >
        {/* ---------- supporting worlds ---------- */}
        {supporting.map(({ world, box, op, z }) => (
          <motion.div
            key={world.key}
            className="absolute overflow-hidden"
            style={{ ...box, opacity: op, zIndex: z }}
          >
            <WorldWindow
              world={world}
              reduced={reduced}
              state={beat}
              dim={0.4}
              showCue
              compact={mobile}
            />
          </motion.div>
        ))}

        {/* ---------- the dominant world ---------- */}
        <motion.div className="absolute overflow-hidden" style={{ ...mech, zIndex: 20 }}>
          <motion.div className="h-full w-full" style={{}}>
            <WorldWindowDominant reduced={reduced} state={beat} dim={mechDim} compact={mobile} />
          </motion.div>
        </motion.div>

        {/* ---------- hero copy ---------- */}
        <motion.div
          className={cn(
            "absolute z-30",
            mobile ? "left-[6%] top-[54%] w-[88%]" : "left-[5.5%] top-1/2 w-[33%] -translate-y-1/2",
          )}
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-6" style={{ background: CYAN }} aria-hidden />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/65">
              CRM + automation for service businesses
            </span>
          </div>
          <h1
            className={cn(
              "tracking-[-0.04em] text-white",
              mobile ? "mt-4 text-[38px] leading-[1.04]" : "mt-5 text-[76px] leading-[0.98]",
            )}
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            You lead.
            <br />
            Zapla follows through.
          </h1>
          <p
            className={cn(
              "text-white/70",
              mobile
                ? "mt-3.5 text-[14px] leading-[1.55]"
                : "mt-6 max-w-[430px] text-[15.5px] leading-[1.6]",
            )}
          >
            Bring your enquiries, conversations and next steps into one place. Zapla keeps the work
            moving from first contact to booked, paid and returning.
          </p>
          <div className={cn("flex flex-wrap items-center gap-3", mobile ? "mt-5" : "mt-7")}>
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-[49px] items-center gap-2 rounded-[10px] px-6 text-[14.5px] font-semibold text-white"
              style={{ background: CYAN }}
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="inline-flex h-[49px] items-center rounded-[10px] border border-white/25 px-5 text-[14.5px] font-semibold text-white">
              See how it works
            </span>
          </div>
          <div className="mt-4 text-[12px] font-medium tracking-tight text-white/45">
            Unlimited users included. No per-seat fees.
          </div>
        </motion.div>

        {/* ---------- recognition peak statement ---------- */}
        <motion.div
          className={cn(
            "absolute z-40",
            mobile ? "left-[6%] top-[43%] w-[88%]" : "left-[30%] top-[41%] w-[44%]",
          )}
          style={{ opacity: stmtOpacity }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10"
            style={{
              background:
                "radial-gradient(60% 60% at 40% 50%, rgba(6,10,20,0.86) 0%, rgba(6,10,20,0.55) 55%, rgba(6,10,20,0) 100%)",
            }}
          />
          <MaskLine
            p={p}
            from={0.545}
            to={0.585}
            className={cn(
              "tracking-[-0.04em] text-white",
              mobile ? "text-[28px] leading-[1.08]" : "text-[46px] leading-[1.04]",
            )}
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            While you do the work,
            <br />
            Zapla handles the
            <br />
            follow-through.
          </MaskLine>
        </motion.div>

        {/* ---------- product resolves around the surviving thread ---------- */}
        <motion.div
          className="absolute z-30"
          style={{ ...shellBox, opacity: shellOpacity }}
        >
          <div className="h-full w-full overflow-hidden rounded-[10px] shadow-[0_50px_120px_-40px_rgba(6,10,20,0.35)]">
            <CustomerRecord compact={mobile} />
          </div>
        </motion.div>

        {/* ---------- the surviving thread object ---------- */}
        <motion.div className="absolute z-40" style={{ ...cue, opacity: cueOpacity }}>
          <SurvivingCue surface={cueSurface} state={beat} compact={mobile} />
        </motion.div>

        {/* ---------- product heading ---------- */}
        <motion.div
          className={cn(
            "absolute z-40",
            mobile ? "left-[6%] top-[8%] w-[88%]" : "left-[21%] top-[5.5%] w-[56%]",
          )}
          style={{ opacity: headOpacity, y: headY }}
        >
          <h2
            className={cn(
              "tracking-[-0.04em]",
              mobile ? "text-[26px] leading-[1.08]" : "text-[46px] leading-[1.02]",
            )}
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            One customer. Everything connected.
          </h2>
          <p
            className={cn(
              "text-slate-500",
              mobile ? "mt-2.5 text-[13px] leading-[1.55]" : "mt-3 max-w-[560px] text-[14.5px] leading-[1.6]",
            )}
          >
            The conversation, booking, payment and next step stay attached to the same customer, so
            the work keeps moving.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* dominant window with a motion-driven veil */
function WorldWindowDominant({
  reduced,
  state,
  dim,
  compact,
}: {
  reduced: boolean;
  state: number;
  dim: MotionValue<number>;
  compact: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0A0E17]">
      <Clip file={HERO.file} reduced={reduced} />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#070B14]"
        style={{ opacity: dim }}
      />
      <div className="absolute left-0 top-0 flex items-center gap-2 px-3.5 py-3">
        <span className="h-[2px] w-5" style={{ background: CYAN }} aria-hidden />
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
          {HERO.trade} · {HERO.place}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <ThreadCue world={HERO} state={state} compact={compact} />
      </div>
    </div>
  );
}

/* the one thread that survives the convergence */
function SurvivingCue({
  surface,
  state,
  compact,
}: {
  surface: MotionValue<number>;
  state: number;
  compact: boolean;
}) {
  const bg = useTransform(surface, [0, 1], ["rgba(8,12,23,0.5)", "#FFFFFF"]);
  const shadow = useTransform(
    surface,
    [0, 1],
    ["0 0 0 rgba(0,0,0,0)", "0 26px 60px -30px rgba(6,10,20,0.45)"],
  );
  const ink = useTransform(surface, [0, 1], ["#F7F8FC", INK]);
  const sub = useTransform(surface, [0, 1], ["rgba(247,248,252,0.78)", "rgba(11,18,32,0.72)"]);
  const border = useTransform(
    surface,
    [0, 1],
    ["1px solid rgba(255,255,255,0.16)", "1px solid rgba(11,18,32,0.08)"],
  );

  return (
    <motion.div
      className={cn(
        "flex h-full w-full items-center overflow-hidden backdrop-blur-[3px]",
        compact ? "gap-2 px-2.5" : "gap-3 px-3.5",
      )}
      style={{ background: bg, boxShadow: shadow, border, borderRadius: 8 }}
    >
      <Face src={HERO.face} size={compact ? 26 : 30} ring={false} />
      <div className="min-w-0 flex-1">
        <motion.div
          className="truncate text-[13px] font-semibold leading-none tracking-[-0.015em]"
          style={{ fontFamily: DISPLAY, color: ink }}
        >
          {HERO.customer}
        </motion.div>
        <div className="mt-[7px] flex items-center gap-1.5">
          <span
            className="h-[5px] w-[5px] shrink-0 rounded-full"
            style={{ background: CYAN }}
            aria-hidden
          />
          <motion.span
            className="truncate text-[12px] font-medium leading-none"
            style={{ color: sub }}
          >
            {HERO.states[Math.min(state, 3)]}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Route body                                                          */
/* ------------------------------------------------------------------ */

export function MultiWorldFollowThrough() {
  const reduced = !!useReducedMotion();
  const mobile = useIsMobile();

  return (
    <div className="bg-[#F5F6FA]">
      <Sequence reduced={reduced} mobile={mobile} />

      <section className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="max-w-[560px] text-[30px] leading-[1.08] tracking-[-0.035em] md:text-[38px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              Built for teams where follow-through cannot depend on memory.
            </h2>
            <p className="mt-3 max-w-[520px] text-[14.5px] leading-[1.6] text-slate-500">
              Workshops, agencies, brokers, builders, consultancies and maintenance teams run the
              same shape of work. Zapla keeps every customer moving through it.
            </p>
          </div>
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-[49px] shrink-0 items-center gap-2 rounded-[10px] px-6 text-[14.5px] font-semibold text-white"
            style={{ background: CYAN }}
          >
            Book a call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
