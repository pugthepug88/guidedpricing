/* Concept-only, isolated art direction.
   Thesis: the operator stops doing admin, and the system keeps working.
   Three human scenes, one repeated gesture (disengagement), one persistent
   Zapla follow-through thread that advances untouched and then becomes the
   product. People, businesses and numbers are fictional. */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, CalendarDays, Check, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Face } from "@/components/v5/kit";
import { FACE } from "@/components/v5/faces";
import { useIsMobile } from "@/hooks/use-mobile";

const MEDIA = "/concept/operator-away";
const NAV = 66;

const DISPLAY = '"Inter Tight", "Manrope", system-ui, sans-serif';
const INK = "#0B1220";
const CYAN = "#06B6D4";

const SCENES = [
  { src: `${MEDIA}/scene-1.mp4`, poster: `${MEDIA}/scene-1.jpg`, pos: "50% 46%" },
  { src: `${MEDIA}/scene-2.mp4`, poster: `${MEDIA}/scene-2.jpg`, pos: "46% 42%" },
  { src: `${MEDIA}/scene-3.mp4`, poster: `${MEDIA}/scene-3.jpg`, pos: "52% 50%" },
];

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

function Film({
  scene,
  playing,
  reduced,
  style,
  darken = 0.2,
}: {
  scene: (typeof SCENES)[number];
  playing: boolean;
  reduced: boolean;
  style: Record<string, unknown>;
  darken?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (playing) void v.play().catch(() => {});
    else v.pause();
  }, [playing, reduced]);

  return (
    <motion.div className="absolute overflow-hidden bg-[#0A0E17]" style={style}>
      {reduced ? (
        <img
          src={scene.poster}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          style={{ objectPosition: scene.pos }}
        />
      ) : (
        <video
          ref={ref}
          src={scene.src}
          poster={scene.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="h-full w-full object-cover"
          style={{ objectPosition: scene.pos }}
        />
      )}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `rgba(8,12,23,${darken})` }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The persistent follow-through thread — one semantic object          */
/* ------------------------------------------------------------------ */

const STATES = [
  { label: "New enquiry", note: "Instagram · 10:14 AM" },
  { label: "Reply sent", note: "Automatically · 10:16 AM" },
  { label: "Booking offered", note: "Thu 3:00 PM · 10:21 AM" },
  { label: "Booking confirmed", note: "Paid A$450 · 10:24 AM" },
];

function ThreadObject({
  p,
  stateAt,
  chrome = 1,
  scale = 1,
}: {
  p: MotionValue<number>;
  /** progress values at which each state becomes current */
  stateAt: number[];
  chrome?: number;
  scale?: number;
}) {
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(p, "change", (v: number) => {
    let n = 0;
    stateAt.forEach((s, i) => {
      if (v >= s) n = i;
    });
    setIdx((prev) => (prev === n ? prev : n));
  });
  const s = STATES[idx];

  return (
    <div
      className="h-full w-full overflow-hidden"
      style={{
        fontSize: `${scale}rem`,
        background: `rgba(255,255,255,${chrome})`,
        borderRadius: 12 * chrome,
        boxShadow: chrome ? "0 24px 60px -28px rgba(6,10,20,0.65)" : "none",
      }}
    >
      <div className="flex h-full items-center gap-3 px-3.5">
        <Face src={FACE.sophie} size={34} />
        <div className="min-w-0 flex-1">
          <div
            className="text-[13.5px] font-semibold leading-none tracking-[-0.015em] text-[#0B1220]"
            style={{ fontFamily: DISPLAY }}
          >
            Sarah Chen
          </div>
          <div className="mt-[7px] flex items-center gap-1.5">
            <span
              className="h-[6px] w-[6px] shrink-0 rounded-full"
              style={{ background: CYAN }}
              aria-hidden
            />
            <motion.span
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12.5px] font-medium leading-none tracking-[-0.01em] text-[#0B1220]"
            >
              {s.label}
            </motion.span>
          </div>
          <motion.div
            key={s.note}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-[7px] truncate text-[10px] font-medium uppercase leading-none tracking-[0.16em] text-[#0B1220]/45"
          >
            {s.note}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product reveal — one coherent Zapla customer record                 */
/* ------------------------------------------------------------------ */

const THREAD = [
  { from: "them", text: "Hi, do you have any availability this week?", time: "10:14 AM" },
  { from: "us", text: "Thursday 3:00 PM works. I'll hold it for you.", time: "10:16 AM" },
  { from: "them", text: "Perfect, book me in.", time: "10:21 AM" },
];

function CustomerRecord() {
  return (
    <AppShell activeKey="inbox" title="Sarah Chen" subtitle="Customer · Chatswood, NSW">
      <div className="flex h-full min-h-0">
        <div className="hidden w-[206px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
          <div className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Conversations
          </div>
          {[
            { n: "Sarah Chen", m: "Perfect, book me in.", f: FACE.sophie, on: true },
            { n: "Daniel Whitmore", m: "Quote looks good", f: FACE.daniel },
            { n: "Priya Raman", m: "See you Tuesday", f: FACE.priya },
            { n: "Tom Aldridge", m: "Thanks for the invoice", f: FACE.tom },
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
          <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/70 px-4 py-2">
            <Face src={FACE.sophie} size={24} />
            <div className="text-[12.5px] font-semibold text-slate-900">Sarah Chen</div>
            <div className="ml-auto text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#0891b2]">
              Booking confirmed
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2.5 p-4">
            {THREAD.map((m) => (
              <div
                key={m.text}
                className={cn("flex", m.from === "us" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[76%] rounded-[14px] px-3 py-2 text-[12.5px] leading-snug",
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
          </div>
        </div>

        <div className="hidden w-[244px] shrink-0 flex-col gap-2.5 border-l border-slate-200/80 bg-white p-3 md:flex">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Job
          </div>
          <div
            data-slot="work-media"
            className="h-[84px] w-full overflow-hidden rounded-[8px] bg-slate-100"
          />
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Connected
          </div>
          <SysRow
            icon={<CalendarDays className="h-3.5 w-3.5" />}
            label="Booking"
            value="Thu 3:00 PM · confirmed"
            tone="blue"
          />
          <SysRow
            icon={<CreditCard className="h-3.5 w-3.5" />}
            label="Payment"
            value="A$450 paid"
            tone="green"
          />
          <SysRow
            icon={<Star className="h-3.5 w-3.5" />}
            label="Review"
            value="Requested · 2 days after"
            tone="slate"
          />
          <div className="mt-1 rounded-[12px] border border-[#06B6D4]/35 bg-[#ECFEFF]/70 p-2.5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
              Next step
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-slate-900">
              <Check className="h-3.5 w-3.5 text-[#0891b2]" strokeWidth={3} />
              Reactivation offer · 6 months
            </div>
          </div>
        </div>
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
    <div className="flex items-center gap-2.5 rounded-[12px] border border-slate-200/80 px-2.5 py-2">
      <span className={cn("flex h-6 w-6 items-center justify-center rounded-[8px]", tones[tone])}>
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

/* progress map
   0.00-0.16  A  hero copy, scene 1 full bleed
   0.16-0.30  B  scene 1 holds on the untouched laptop / client
   0.30-0.44  C1 hard cut, scene 2
   0.44-0.58  C2 hard cut, scene 3
   0.58-0.70  statement, canvas turns light, film reframes small
   0.70-0.88  D  the thread becomes the Zapla record
   0.88-1.00  hold                                                    */

const STATE_AT = [0, 0.2, 0.36, 0.5];

function Sequence({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);
  const [scene, setScene] = useState(0);

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

  useMotionValueEvent(p, "change", (v: number) => {
    const s = v < 0.3 ? 0 : v < 0.44 ? 1 : 2;
    setScene((prev) => (prev === s ? prev : s));
  });

  /* film: one object that reframes, never dissolves ------------------ */
  const filmBox = useBoxStyle(
    p,
    [0, 0.16, 0.3, 0.5, 0.575, 0.7, 0.78],
    mobile
      ? [
          [0, 0, 100, 58],
          [0, 0, 100, 58],
          [0, 0, 100, 58],
          [0, 0, 100, 58],
          [8, 8, 84, 30],
          [8, 8, 84, 30],
          [30, 6, 40, 14],
        ]
      : [
          [40, 0, 60, 100],
          [40, 0, 60, 100],
          [8, 6, 84, 88],
          [8, 6, 84, 88],
          [62, 22, 26, 30],
          [62, 22, 26, 30],
          [70.6, 21.5, 16.6, 10.4],
        ],
  );
  const filmRadius = useTransform(p, [0.16, 0.3, 0.7, 0.78], [0, 12, 12, 6]);
  const filmOpacity = useTransform(p, [0.76, 0.82], [1, 0.9]);

  /* hard cuts between the three scenes ------------------------------ */
  const cut2 = useTransform(p, [0.2999, 0.3], [0, 1]);
  const cut3 = useTransform(p, [0.4399, 0.44], [0, 1]);

  /* canvas: cinematic dark -> light product world ------------------- */
  const canvas = useTransform(p, [0.5, 0.565], ["#0A0E17", "#F5F6FA"]);
  const heroInk = useTransform(p, [0, 0.02], ["#F7F8FC", "#F7F8FC"]);

  /* hero copy -------------------------------------------------------- */
  const heroOpacity = useTransform(p, [0, 0.13, 0.16], [1, 1, 0]);
  const heroY = useTransform(p, [0.12, 0.17], [0, -30]);

  /* the persistent thread object ------------------------------------- */
  const objBox = useBoxStyle(
    p,
    [0, 0.66, 0.74, 0.82],
    mobile
      ? [
          [6, 78, 88, 11],
          [6, 78, 88, 11],
          [6, 46, 88, 11],
          [6, 46, 88, 11],
        ]
      : [
          [70, 76, 25, 11],
          [70, 76, 25, 11],
          [38, 46, 26, 12],
          [38, 46, 26, 12],
        ],
  );
  const objOpacity = useTransform(p, [0.76, 0.8], [1, 0]);
  const objScale = useTransform(p, [0.66, 0.74], [1, 1.24]);

  /* statement -------------------------------------------------------- */
  const stmtOpacity = useTransform(p, [0.605, 0.625, 0.7, 0.725], [0, 1, 1, 0]);

  /* product shell ---------------------------------------------------- */
  const shellBox = useBoxStyle(
    p,
    [0.72, 0.82],
    mobile
      ? [
          [4, 40, 92, 34],
          [2, 26, 96, 56],
        ]
      : [
          [32, 40, 36, 20],
          [3, 14, 94, 74],
        ],
  );
  const shellClip = useTransform(
    p,
    [0.72, 0.82],
    ["inset(38% 34% 38% 34% round 14px)", "inset(0% 0% 0% 0% round 16px)"],
  );
  const shellOpacity = useTransform(p, [0.725, 0.755], [0, 1]);
  const headOpacity = useTransform(p, [0.83, 0.87], [0, 1]);
  const headY = useTransform(p, [0.83, 0.89], [16, 0]);

  return (
    <div ref={wrap} className={mobile ? "relative h-[540vh]" : "relative h-[520vh]"}>
      <motion.div
        className="sticky w-full overflow-hidden"
        style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: canvas }}
      >
        {/* ---------- the film: three scenes, one frame ---------- */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ ...filmBox, borderRadius: filmRadius, opacity: filmOpacity, zIndex: 20 }}
        >
          <Film
            scene={SCENES[0]}
            playing={scene === 0}
            reduced={reduced}
            style={{ inset: 0, width: "100%", height: "100%" }}
            darken={0.22}
          />
          <motion.div className="absolute inset-0" style={{ opacity: cut2 }}>
            <Film
              scene={SCENES[1]}
              playing={scene === 1}
              reduced={reduced}
              style={{ inset: 0, width: "100%", height: "100%" }}
              darken={0.16}
            />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: cut3 }}>
            <Film
              scene={SCENES[2]}
              playing={scene === 2}
              reduced={reduced}
              style={{ inset: 0, width: "100%", height: "100%" }}
              darken={0.2}
            />
          </motion.div>
        </motion.div>

        {/* ---------- ACT A hero copy ---------- */}
        <motion.div
          className={cn(
            "absolute z-30",
            mobile ? "left-[6%] top-[58%] w-[88%]" : "left-[5.5%] top-1/2 w-[32%] -translate-y-1/2",
          )}
          style={{ opacity: heroOpacity, y: heroY, color: heroInk }}
        >
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-6" style={{ background: CYAN }} />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/65">
              CRM + automation for service businesses
            </span>
          </div>
          <h1
            className={cn(
              "mt-4 tracking-[-0.04em] text-white",
              mobile ? "text-[42px] leading-[1.02]" : "mt-5 text-[76px] leading-[0.99]",
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
                ? "mt-4 text-[14.5px] leading-[1.55]"
                : "mt-6 max-w-[420px] text-[15.5px] leading-[1.6]",
            )}
          >
            One place for enquiries, conversations, bookings, payments and next steps. Zapla keeps
            the work moving from first contact to booked, paid and returning.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[14px] font-semibold"
              style={{ color: INK }}
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="inline-flex h-11 items-center rounded-full border border-white/25 px-5 text-[14px] font-semibold text-white">
              See how it works
            </span>
          </div>
          <div className="mt-5 text-[12px] font-medium tracking-tight text-white/45">
            Unlimited users included. No per-seat fees.
          </div>
        </motion.div>

        {/* ---------- the persistent Zapla thread ---------- */}
        <motion.div
          className="absolute z-40"
          style={{ ...objBox, opacity: objOpacity, scale: objScale }}
        >
          <ThreadObject p={p} stateAt={STATE_AT} />
        </motion.div>

        {/* ---------- mid-scroll statement ---------- */}
        <motion.div
          className={cn(
            "absolute z-40",
            mobile ? "left-[6%] top-[24%] w-[88%]" : "left-[8%] top-[26%] w-[52%]",
          )}
          style={{ opacity: stmtOpacity }}
        >
          <MaskLine
            p={p}
            from={0.625}
            to={0.685}
            className={cn(
              "tracking-[-0.04em]",
              mobile ? "text-[34px] leading-[1.05]" : "text-[62px] leading-[1]",
            )}
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            While you do the work,
            <br />
            Zapla handles the
            <br />
            follow-through.
          </MaskLine>
        </motion.div>

        {/* ---------- product reveal ---------- */}
        <motion.div
          className="absolute z-30"
          style={{ ...shellBox, clipPath: shellClip, opacity: shellOpacity }}
        >
          <div className="h-full w-full overflow-hidden rounded-[16px] shadow-[0_50px_120px_-40px_rgba(6,10,20,0.4)]">
            <CustomerRecord />
          </div>
        </motion.div>

        <motion.div
          className={cn(
            "absolute z-40",
            mobile ? "left-[6%] top-[10%] w-[88%]" : "left-[3%] top-[4%] w-[56%]",
          )}
          style={{ opacity: headOpacity, y: headY }}
        >
          <h2
            className={cn(
              "tracking-[-0.04em]",
              mobile ? "text-[28px] leading-[1.05]" : "text-[40px] leading-[1]",
            )}
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            One customer. Everything connected.
          </h2>
          <p
            className={cn(
              "mt-2.5 text-[#0B1220]/60",
              mobile ? "text-[13.5px] leading-[1.5]" : "max-w-[540px] text-[14.5px] leading-[1.55]",
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

/* ------------------------------------------------------------------ */
/* Continuation section — no blank ending, no generic CTA band         */
/* ------------------------------------------------------------------ */

const AFTER = [
  {
    k: "You do",
    v: "The work, the judgement, the relationship.",
  },
  {
    k: "Zapla does",
    v: "Replies, booking offers, reminders, invoices, review requests, reactivation.",
  },
  {
    k: "Result",
    v: "Nothing waits on you remembering to follow up.",
  },
];

function Continuation() {
  return (
    <section className="bg-[#F5F6FA] px-[6%] pb-24 pt-16">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-center gap-2.5">
          <span className="h-[2px] w-6" style={{ background: CYAN }} />
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0B1220]/50">
            The division of labour
          </span>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[14px] bg-[#0B1220]/10 md:grid-cols-3">
          {AFTER.map((r) => (
            <div key={r.k} className="bg-white p-6">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0B1220]/45">
                {r.k}
              </div>
              <div
                className="mt-3 text-[19px] leading-[1.25] tracking-[-0.025em] text-[#0B1220]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                {r.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function OperatorAwayFollowThrough() {
  const reduced = !!useReducedMotion();
  const mobile = useIsMobile();

  return (
    <div className="bg-[#F5F6FA]">
      <Sequence key={mobile ? "m" : "d"} reduced={reduced} mobile={mobile} />
      <Continuation />
    </div>
  );
}
