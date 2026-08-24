/* Concept-only, isolated art direction. People, businesses and numbers are
   fictional.

   Thesis: "You lead. Zapla follows through."

   Three strong human worlds (mechanic, mortgage broker, property agent) plus
   one brief supporting glimpse (commercial service operations). Editorial film
   frames enter and leave the stage with unequal scale and intentional
   occlusion. One world always dominates. The mechanic's customer thread is the
   survivor: its state advances monotonically with scroll and physically lands
   inside the real Zapla customer record.

   Footage ranges are fixed and looped in-range; clips only mount and play for
   the stage that needs them. */
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
  start: number;
  end: number;
  trade: string;
  cue: string;
};

const MECHANIC: World = {
  key: "mechanic",
  file: "mechanic",
  start: 1.2,
  end: 8.6,
  trade: "Automotive workshop",
  cue: "",
};

const BROKER: World = {
  key: "broker",
  file: "broker",
  start: 5.0,
  end: 13.0,
  trade: "Mortgage broker",
  cue: "Docs received · lodged with lender",
};

const AGENT: World = {
  key: "agent",
  file: "agent",
  start: 6.0,
  end: 12.5,
  trade: "Property agency",
  cue: "Inspection confirmed · Sat 10:00",
};

const FACILITIES: World = {
  key: "facilities",
  file: "facilities",
  start: 0.5,
  end: 6.5,
  trade: "Service operations",
  cue: "Service visit scheduled",
};

/* The surviving customer thread, advanced by scroll only. */
const MECH_STATES = ["New enquiry", "Quote sent", "Booked Thursday", "Paid · A$1,280"];
const MECH_STATE_AT = [0.0, 0.24, 0.42, 0.6];

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

type Box = [number, number, number, number];

function useBoxStyle(p: MotionValue<number>, at: number[], boxes: Box[]) {
  const left = useTransform(
    p,
    at,
    boxes.map((b) => `${b[0]}%`),
  );
  const top = useTransform(
    p,
    at,
    boxes.map((b) => `${b[1]}%`),
  );
  const width = useTransform(
    p,
    at,
    boxes.map((b) => `${b[2]}%`),
  );
  const height = useTransform(
    p,
    at,
    boxes.map((b) => `${b[3]}%`),
  );
  return { left, top, width, height };
}

/* Range-looped clip. Mounts only while `active`; pauses when offstage. ---- */
function Clip({
  world,
  reduced,
  active,
  objectPosition,
}: {
  world: World;
  reduced: boolean;
  active: boolean;
  objectPosition?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (active) {
      if (v.readyState >= 1 && (v.currentTime < world.start || v.currentTime > world.end)) {
        v.currentTime = world.start;
      }
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, reduced, world.start, world.end]);

  if (reduced || !active) {
    return (
      <img
        src={`${MEDIA}/${world.file}.jpg`}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
        style={{ objectPosition }}
      />
    );
  }

  return (
    <video
      ref={ref}
      src={`${MEDIA}/${world.file}.mp4`}
      poster={`${MEDIA}/${world.file}.jpg`}
      muted
      playsInline
      preload="metadata"
      aria-hidden
      className="h-full w-full object-cover"
      style={{ objectPosition }}
      onLoadedMetadata={(e) => {
        const v = e.currentTarget;
        v.currentTime = world.start;
        void v.play().catch(() => {});
      }}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (v.currentTime >= world.end || v.currentTime < world.start - 0.05) {
          v.currentTime = world.start;
        }
      }}
    />
  );
}

/* Edge-anchored activity cue: cyan rule + text. No cards, no chrome. ----- */
function EdgeCue({
  label,
  trade,
  align = "bottom",
  size = "sm",
}: {
  label: string;
  trade?: string;
  align?: "bottom" | "top";
  size?: "sm" | "xs";
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 w-full px-3",
        align === "bottom" ? "bottom-0 pb-3" : "top-0 pt-3",
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            align === "bottom"
              ? "linear-gradient(to top, rgba(6,10,20,0.62), rgba(6,10,20,0))"
              : "none",
        }}
      />
      <div className="relative">
        {trade ? (
          <div
            className={cn(
              "font-semibold uppercase tracking-[0.2em] text-white/55",
              size === "xs" ? "text-[8.5px]" : "text-[9.5px]",
            )}
          >
            {trade}
          </div>
        ) : null}
        <div className="mt-[6px] flex items-center gap-2">
          <span className="h-[2px] w-4 shrink-0" style={{ background: CYAN }} aria-hidden />
          <span
            className={cn(
              "truncate font-medium tracking-[-0.01em] text-white",
              size === "xs" ? "text-[10.5px]" : "text-[12.5px]",
            )}
            style={{ fontFamily: DISPLAY }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Surviving thread object                                             */
/* ------------------------------------------------------------------ */

function SurvivingCue({
  surface,
  state,
  compact,
}: {
  surface: MotionValue<number>;
  state: number;
  compact: boolean;
}) {
  const bg = useTransform(surface, [0, 1], ["rgba(8,12,23,0.72)", "#FFFFFF"]);
  const border = useTransform(
    surface,
    [0, 1],
    ["rgba(255,255,255,0.18)", "rgba(11,18,32,0.10)"],
  );
  const nameColor = useTransform(surface, [0, 1], ["#F7F8FC", INK]);
  const stateColor = useTransform(
    surface,
    [0, 1],
    ["rgba(247,248,252,0.82)", "rgba(11,18,32,0.72)"],
  );
  const label = MECH_STATES[Math.min(state, MECH_STATES.length - 1)];

  return (
    <motion.div
      className={cn(
        "flex h-full w-full items-center rounded-[8px] backdrop-blur-[3px]",
        compact ? "gap-2.5 px-3" : "gap-3 px-3.5",
      )}
      style={{ background: bg, borderWidth: 1, borderStyle: "solid", borderColor: border }}
    >
      <Face src={FACE.daniel} size={compact ? 26 : 30} ring={false} />
      <div className="min-w-0 flex-1">
        <motion.div
          className="truncate text-[12.5px] font-semibold leading-none tracking-[-0.015em]"
          style={{ fontFamily: DISPLAY, color: nameColor }}
        >
          Michael Tran
        </motion.div>
        <div className="mt-[7px] flex items-center gap-1.5">
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
            style={{ color: stateColor }}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Product environment                                                 */
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
            { n: "Daniel Whitmore", m: "Lodged with lender", f: FACE.tom },
            { n: "Northline Depot", m: "Service visit scheduled", f: FACE.sophie },
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
   0.00-0.12  ACT A  hero copy + dominant mechanic film
   0.12-0.28  ACT B  copy recedes, broker enters as overlapping frame
   0.28-0.42  ACT C  property agent enters, wide cinematic
   0.42-0.60  ACT D  recognition peak, unequal overlap + statement
   0.60-0.72  ACT E  worlds recede, surviving thread travels
   0.64-1.00  ACT F  product shell resolves, thread lands in the record   */

function Sequence({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);
  const [stage, setStage] = useState(0);
  const [mechState, setMechState] = useState(0);

  useEffect(() => {
    let raf = 0;
    let lastStage = -1;
    let lastState = -1;
    const tick = () => {
      const el = wrap.current;
      if (el) {
        const total = el.offsetHeight - (window.innerHeight - NAV);
        const prog = total > 0 ? (NAV - el.getBoundingClientRect().top) / total : 0;
        const v = Math.min(1, Math.max(0, prog));
        p.set(v);

        /* stage: 0 A, 1 B, 2 C, 3 D, 4 E/F */
        const s = v < 0.12 ? 0 : v < 0.28 ? 1 : v < 0.42 ? 2 : v < 0.62 ? 3 : 4;
        if (s !== lastStage) {
          lastStage = s;
          setStage(s);
        }

        let st = 0;
        for (let i = 0; i < MECH_STATE_AT.length; i++) if (v >= MECH_STATE_AT[i]) st = i;
        if (st !== lastState) {
          lastState = st;
          setMechState(st);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p]);

  /* which clips are allowed to mount/play (current + next stage only) */
  const mechLive = !reduced && stage <= 3;
  const brokerLive = !reduced && stage >= 1 && stage <= 3;
  const agentLive = !reduced && stage >= 1 && stage <= 3;
  const facLive = !reduced && stage === 3;

  /* ---- window boxes ------------------------------------------------ */
  /* MECHANIC — opener and dominant world */
  const mechAt = [0, 0.12, 0.28, 0.42, 0.6, 0.68];
  const mech = useBoxStyle(
    p,
    mechAt,
    mobile
      ? [
          [0, 0, 100, 62],
          [0, 0, 100, 62],
          [0, 4, 88, 44],
          [0, 8, 74, 36],
          [0, 10, 66, 32],
          [0, 10, 66, 32],
        ]
      : [
          [40, 0, 60, 100],
          [40, 0, 60, 100],
          [26, 6, 56, 70],
          [7, 9, 48, 58],
          [5, 12, 40, 48],
          [5, 12, 40, 48],
        ],
  );
  const mechOp = useTransform(p, [0, 0.572, 0.618], [1, 1, 0]);
  const mechDim = useTransform(p, [0, 0.12, 0.3, 0.46, 0.62], [0.12, 0.12, 0.1, 0.12, 0.2]);

  /* BROKER — second world, promoted */
  const brokerAt = [0.14, 0.28, 0.42, 0.6, 0.67];
  const broker = useBoxStyle(
    p,
    brokerAt,
    mobile
      ? [
          [100, 46, 82, 34],
          [18, 46, 82, 34],
          [26, 50, 74, 32],
          [34, 52, 66, 30],
          [34, 52, 66, 30],
        ]
      : [
          [100, 38, 42, 54],
          [55, 38, 42, 54],
          [50, 44, 40, 48],
          [46, 46, 34, 42],
          [46, 46, 34, 42],
        ],
  );
  const brokerOp = useTransform(p, [0.14, 0.2, 0.58, 0.632], [0, 1, 1, 0]);

  /* AGENT — third world, wide cinematic */
  const agentAt = [0.3, 0.42, 0.6, 0.66];
  const agent = useBoxStyle(
    p,
    agentAt,
    mobile
      ? [
          [-100, 16, 78, 24],
          [10, 16, 78, 24],
          [14, 18, 72, 23],
          [14, 18, 72, 23],
        ]
      : [
          [100, 8, 46, 30],
          [56, 6, 44, 30],
          [58, 8, 40, 27],
          [58, 8, 40, 27],
        ],
  );
  const agentOp = useTransform(p, [0.3, 0.36, 0.575, 0.625], [0, 1, 1, 0]);

  /* FACILITIES — brief supporting glimpse */
  const facAt = [0.46, 0.54, 0.6, 0.645];
  const fac = useBoxStyle(
    p,
    facAt,
    mobile
      ? [
          [100, 84, 44, 13],
          [56, 84, 44, 13],
          [56, 84, 44, 13],
          [56, 84, 44, 13],
        ]
      : [
          [100, 74, 20, 22],
          [80, 72, 18, 22],
          [80, 72, 18, 22],
          [80, 72, 18, 22],
        ],
  );
  const facOp = useTransform(p, [0.46, 0.53, 0.57, 0.615], [0, 1, 1, 0]);

  /* canvas + hero copy */
  const canvas = useTransform(p, [0.595, 0.648], ["#080C14", "#F5F6FA"]);
  const heroOpacity = useTransform(p, [0, 0.08, 0.135], [1, 1, 0]);
  const heroY = useTransform(p, [0.08, 0.14], [0, -28]);

  /* statement at the recognition peak */
  const stmtOpacity = useTransform(p, [0.44, 0.49, 0.555, 0.585], [0, 1, 1, 0]);

  /* surviving thread -> lands inside the record */
  const cueAt = [0.588, 0.655, 0.74, 0.8];
  const cue = useBoxStyle(
    p,
    cueAt,
    mobile
      ? [
          [8, 42, 84, 9],
          [10, 30, 80, 8],
          [19.5, 20.6, 64, 5.1],
          [19.5, 20.6, 64, 5.1],
        ]
      : [
          [6, 14, 30, 9.5],
          [24, 32, 26, 8.5],
          [21.7, 26.3, 17.4, 4.8],
          [21.7, 26.3, 17.4, 4.8],
        ],
  );
  const cueSurface = useTransform(p, [0.615, 0.672], [0, 1]);
  const cueOpacity = useTransform(p, [0.588, 0.618, 0.755, 0.785], [0, 1, 1, 0]);
  const cueShadow = useTransform(
    p,
    [0.67, 0.74],
    ["0 30px 70px -25px rgba(6,10,20,0.45)", "0 0px 0px 0px rgba(6,10,20,0)"],
  );

  /* product shell arrives early, while the last films recede */
  const shellBox = useBoxStyle(
    p,
    [0.618, 0.74],
    mobile
      ? [
          [3, 18, 94, 70],
          [3, 14, 94, 78],
        ]
      : [
          [10, 24, 80, 64],
          [3, 20, 94, 74],
        ],
  );
  const shellOpacity = useTransform(p, [0.612, 0.658], [0, 1]);
  const mechCueOpacity = useTransform(p, [0, 0.05, 0.545, 0.578], [0, 1, 1, 0]);
  const headOpacity = useTransform(p, [0.78, 0.85], [0, 1]);
  const headY = useTransform(p, [0.78, 0.86], [16, 0]);

  return (
    <div ref={wrap} data-seq="mwft" className="relative h-[620vh]">
      <motion.div
        className="sticky w-full overflow-hidden"
        style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: canvas }}
      >
        {/* ---------- FACILITIES (supporting glimpse) ---------- */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ ...fac, opacity: facOp, zIndex: 12 }}
        >
          <div className="relative h-full w-full bg-[#0A0E17]">
            <Clip world={FACILITIES} reduced={reduced} active={facLive} />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#070B14]"
              style={{ opacity: 0.16 }}
            />
            <EdgeCue label={FACILITIES.cue} size="xs" />
          </div>
        </motion.div>

        {/* ---------- AGENT ---------- */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ ...agent, opacity: agentOp, zIndex: 16 }}
        >
          <div className="relative h-full w-full bg-[#0A0E17] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
            <Clip world={AGENT} reduced={reduced} active={agentLive} />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#070B14]"
              style={{ opacity: 0.13 }}
            />
            <EdgeCue label={AGENT.cue} trade={AGENT.trade} />
          </div>
        </motion.div>

        {/* ---------- BROKER ---------- */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ ...broker, opacity: brokerOp, zIndex: 18 }}
        >
          <div className="relative h-full w-full bg-[#0A0E17] shadow-[0_50px_110px_-45px_rgba(0,0,0,0.85)]">
            <Clip world={BROKER} reduced={reduced} active={brokerLive} />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#070B14]"
              style={{ opacity: 0.12 }}
            />
            <EdgeCue label={BROKER.cue} trade={BROKER.trade} />
          </div>
        </motion.div>

        {/* ---------- MECHANIC (dominant) ---------- */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ ...mech, opacity: mechOp, zIndex: 20 }}
        >
          <div className="relative h-full w-full bg-[#0A0E17]">
            <Clip world={MECHANIC} reduced={reduced} active={mechLive} />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#070B14]"
              style={{ opacity: mechDim }}
            />
            <motion.div
              className="pointer-events-none absolute bottom-0 left-0 w-full"
              style={{ opacity: mechCueOpacity }}
            >
              <EdgeCue
                label={MECH_STATES[mechState]}
                trade={MECHANIC.trade}
                size={mobile ? "xs" : "sm"}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ---------- hero copy ---------- */}
        <motion.div
          className={cn(
            "absolute z-30",
            mobile ? "left-[6%] top-[64%] w-[88%]" : "left-[5.5%] top-1/2 w-[33%] -translate-y-1/2",
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
              mobile ? "mt-3.5 text-[34px] leading-[1.05]" : "mt-5 text-[76px] leading-[0.98]",
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
                ? "mt-3 text-[13.5px] leading-[1.5]"
                : "mt-6 max-w-[430px] text-[15.5px] leading-[1.6]",
            )}
          >
            Bring your enquiries, conversations and next steps into one place. Zapla keeps the work
            moving from first contact to booked, paid and returning.
          </p>
          <div className={cn("flex flex-wrap items-center gap-3", mobile ? "mt-4" : "mt-7")}>
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-[46px] items-center gap-2 rounded-[10px] px-5 text-[14px] font-semibold text-white md:h-[49px] md:px-6 md:text-[14.5px]"
              style={{ background: CYAN }}
            >
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="inline-flex h-[46px] items-center rounded-[10px] border border-white/25 px-5 text-[14px] font-semibold text-white md:h-[49px] md:text-[14.5px]">
              See how it works
            </span>
          </div>
        </motion.div>

        {/* ---------- recognition peak statement ---------- */}
        <motion.div
          className={cn(
            "absolute z-40",
            mobile ? "left-[6%] top-[56%] w-[88%]" : "left-[7%] top-[62%] w-[40%]",
          )}
          style={{ opacity: stmtOpacity }}
        >
          <MaskLine
            p={p}
            from={0.47}
            to={0.518}
            className={cn(
              "tracking-[-0.04em] text-white [text-shadow:0_2px_28px_rgba(6,10,20,0.85)]",
              mobile ? "text-[24px] leading-[1.1]" : "text-[42px] leading-[1.05]",
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

        {/* ---------- product shell ---------- */}
        <motion.div className="absolute z-30" style={{ ...shellBox, opacity: shellOpacity }}>
          <div className="h-full w-full overflow-hidden rounded-[10px] shadow-[0_50px_120px_-40px_rgba(6,10,20,0.35)]">
            <CustomerRecord compact={mobile} />
          </div>
        </motion.div>

        {/* ---------- the surviving thread object ---------- */}
        <motion.div
          className="absolute z-40"
          style={{ ...cue, opacity: cueOpacity, boxShadow: cueShadow, borderRadius: 8 }}
        >
          <SurvivingCue surface={cueSurface} state={mechState} compact={mobile} />
        </motion.div>

        {/* ---------- product heading ---------- */}
        <motion.div
          className={cn(
            "absolute z-40",
            mobile ? "left-[6%] top-[4%] w-[88%]" : "left-[3%] top-[6%] w-[60%]",
          )}
          style={{ opacity: headOpacity, y: headY }}
        >
          <h2
            className={cn(
              "tracking-[-0.04em]",
              mobile ? "text-[23px] leading-[1.08]" : "text-[44px] leading-[1.02]",
            )}
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            One customer. Everything connected.
          </h2>
          <p
            className={cn(
              "text-slate-500",
              mobile
                ? "mt-2 text-[12.5px] leading-[1.5]"
                : "mt-3 max-w-[560px] text-[14.5px] leading-[1.6]",
            )}
          >
            The conversation, the quote, the booking and the payment stay attached to the same
            record, so nothing depends on someone remembering.
          </p>
        </motion.div>
      </motion.div>
    </div>
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
              Workshops, brokers, agencies and service operations run the same shape of work. Zapla
              keeps every customer moving through it.
            </p>
          </div>
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-[49px] shrink-0 items-center gap-2 rounded-[10px] px-6 text-[14.5px] font-semibold text-white"
            style={{ background: CYAN }}
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
