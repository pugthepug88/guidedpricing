/* Concept-only, isolated art direction.
   Thesis: the operator leads, and Zapla follows through.

   The film is ONE object: a single unbroken take of a ceramicist whose
   attention starts on a screen and then transfers entirely to the craft while
   the phone goes passive in the low hand. There is no literal phone put-down
   in the footage and none is implied here.

   The persistent Sarah Chen customer state only advances while attention is on
   the craft, i.e. it is gated on the film's own playback time, never on scroll.
   People, businesses and numbers are fictional. */
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

const MEDIA = "/concept/operator-away";
const NAV = 66;

const DISPLAY = '"Inter Tight", "Manrope", system-ui, sans-serif';
const INK = "#0B1220";
const CYAN = "#06B6D4";

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

/* ------------------------------------------------------------------ */
/* The film — one continuous object, plays at normal speed and loops   */
/* ------------------------------------------------------------------ */

/* Truthful beats inside the master cut (13.0s):
   0.0-3.2s   attention on the screen
   3.2-7.5s   attention transfers to the craft, the screen goes passive
   7.5-13.0s  sustained work, the screen is forgotten                   */
const FILM_SECONDS = 13.0;
const ATTENTION_SHIFT = 4.4;
const WORK_HELD = 8.2;
const WORK_SUSTAINED = 11.2;

function FilmObject({
  reduced,
  onTime,
}: {
  reduced: boolean;
  onTime: (t: number) => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const cb = useRef(onTime);
  cb.current = onTime;

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    void v.play().catch(() => {});
    let raf = 0;
    const start = performance.now();
    let live = false;
    const tick = () => {
      /* if playback never starts (blocked or unsupported decode) fall back to
         a wall clock on the same 13s cut so the cue still tells the story */
      if (v.currentTime > 0.05) live = true;
      const t = live
        ? v.currentTime
        : ((performance.now() - start) / 1000) % FILM_SECONDS;
      cb.current(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);



  if (reduced) {
    return (
      <img
        src={`${MEDIA}/poster.jpg`}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      ref={ref}
      src={`${MEDIA}/film.mp4`}
      poster={`${MEDIA}/poster.jpg`}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      aria-hidden
      className="h-full w-full object-cover"
    />
  );
}

/* ------------------------------------------------------------------ */
/* The persistent follow-through cue — one semantic object              */
/* ------------------------------------------------------------------ */

const STATES = [
  { label: "New enquiry", note: "Instagram · 10:14 AM" },
  { label: "Reply sent", note: "Automatically · 10:16 AM" },
  { label: "Booking offered", note: "Thu 3:00 PM · 10:21 AM" },
  { label: "Booking confirmed", note: "A$450 paid · 10:24 AM" },
];

function SarahCue({
  idx,
  surface,
  ink,
  sub,
  compact,
}: {
  idx: number;
  /** 0 = bare over film, 1 = seated on a product surface */
  surface: MotionValue<number>;
  ink: MotionValue<string>;
  sub: MotionValue<string>;
  compact: boolean;
}) {
  const s = STATES[idx];
  const bg = useTransform(
    surface,
    [0, 1],
    ["rgba(8,12,23,0.42)", "rgba(255,255,255,1)"],
  );
  const rule = useTransform(surface, [0, 1], ["rgba(255,255,255,0.22)", "rgba(11,18,32,0.10)"]);
  const shadow = useTransform(
    surface,
    [0, 1],
    ["0 0 0 rgba(0,0,0,0)", "0 26px 60px -30px rgba(6,10,20,0.5)"],
  );

  return (
    <motion.div
      className="h-full w-full overflow-hidden"
      style={{ background: bg, borderRadius: 10, boxShadow: shadow, backdropFilter: "blur(3px)" }}
    >
      <motion.div className="h-[1px] w-full" style={{ background: rule }} aria-hidden />
      <div className={cn("flex h-full items-center", compact ? "gap-2.5 px-3" : "gap-3 px-3.5")}>
        <Face src={FACE.maya} size={compact ? 28 : 32} />
        <div className="min-w-0 flex-1">
          <motion.div
            className="text-[13px] font-semibold leading-none tracking-[-0.015em]"
            style={{ fontFamily: DISPLAY, color: ink }}
          >
            Sarah Chen
          </motion.div>
          <div className="mt-[7px] flex items-center gap-1.5">
            <span
              className="h-[5px] w-[5px] shrink-0 rounded-full"
              style={{ background: CYAN }}
              aria-hidden
            />
            <motion.span
              key={s.label}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12px] font-medium leading-none tracking-[-0.01em]"
              style={{ color: ink }}
            >
              {s.label}
            </motion.span>
          </div>
          <motion.div
            key={s.note}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-[7px] truncate text-[9.5px] font-medium uppercase leading-none tracking-[0.16em]"
            style={{ color: sub }}
          >
            {s.note}
          </motion.div>
        </div>
      </div>
    </motion.div>
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

function CustomerRecord({ compact }: { compact: boolean }) {
  return (
    <AppShell activeKey="inbox" title="Sarah Chen" subtitle="Customer · Chatswood, NSW">
      <div className="flex h-full min-h-0">
        <div className="hidden w-[206px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
          <div className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Conversations
          </div>
          {[
            { n: "Sarah Chen", m: "Perfect, book me in.", f: FACE.maya, on: true },
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
          <div className="flex items-center gap-2.5 border-b border-slate-200/80 bg-white px-4 py-2.5">
            <Face src={FACE.maya} size={26} />
            <div className="min-w-0">
              <div className="text-[12.5px] font-semibold leading-none text-slate-900">
                Sarah Chen
              </div>
              <div className="mt-[6px] flex items-center gap-1.5">
                <span
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ background: CYAN }}
                  aria-hidden
                />
                <span className="text-[11.5px] font-medium leading-none text-slate-700">
                  Booking confirmed
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
                    "max-w-[76%] rounded-[10px] px-3 py-2 text-[12.5px] leading-snug",
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
            <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-slate-200 bg-white px-3 py-2.5">
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
            <div className="mt-1 rounded-[10px] border border-[#06B6D4]/35 bg-[#ECFEFF]/70 p-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0e7490]">
                Next step
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold text-slate-900">
                <Check className="h-3.5 w-3.5 text-[#0891b2]" strokeWidth={3} />
                Reactivation offer · 6 months
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
    <div className="flex items-center gap-2.5 rounded-[10px] border border-slate-200/80 px-2.5 py-2">
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

/* scroll map
   0.00-0.14  hero copy + dominant film
   0.14-0.34  film opens to near full bleed, copy clears
   0.34-0.56  statement, film begins to recede
   0.56-0.70  canvas turns light, film reframes small, cue expands
   0.70-0.86  the cue aligns and the product resolves around it
   0.86-1.00  product holds                                            */

function Sequence({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useMotionValue(0);
  const [idx, setIdx] = useState(0);

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

  /* the cue advances on the film's own clock, only after attention has
     transferred to the craft — never while she is engaged with the screen.
     Once the product handoff begins the state is settled and stops cycling. */
  const onTime = (t: number) => {
    const settled = p.get() >= 0.64;
    const n = settled
      ? 3
      : t >= WORK_SUSTAINED
        ? 3
        : t >= WORK_HELD
          ? 2
          : t >= ATTENTION_SHIFT
            ? 1
            : 0;
    setIdx((prev) => (prev === n ? prev : n));
  };

  useEffect(() => {
    if (reduced) setIdx(3);
  }, [reduced]);

  /* film: one object that reframes, never dissolves ------------------ */
  const filmBox = useBoxStyle(
    p,
    [0, 0.14, 0.34, 0.5, 0.62, 0.72, 0.86],
    mobile
      ? [
          [0, 0, 100, 52],
          [0, 0, 100, 52],
          [0, 3, 100, 50],
          [0, 3, 100, 50],
          [5, 3, 56, 18],
          [5, 3, 42, 13],
          [5, 3, 42, 13],
        ]
      : [
          [43, 0, 57, 100],
          [43, 0, 57, 100],
          [5, 6, 90, 88],
          [5, 6, 90, 88],
          [62, 16, 30, 32],
          [3, 4, 15.5, 15],
          [3, 4, 15.5, 15],
        ],
  );
  const filmRadius = useTransform(p, [0.14, 0.34, 0.68, 0.74], [0, 10, 10, 8]);

  /* canvas: cinematic dark -> light product world ------------------- */
  const canvas = useTransform(p, [0.58, 0.68], ["#0A0E17", "#F5F6FA"]);
  const veil = useTransform(p, [0, 0.14, 0.34], [0.3, 0.3, 0.16]);

  /* hero copy -------------------------------------------------------- */
  const heroOpacity = useTransform(p, [0, 0.11, 0.15], [1, 1, 0]);
  const heroY = useTransform(p, [0.1, 0.16], [0, -28]);

  /* the persistent cue ---------------------------------------------- */
  const cueBox = useBoxStyle(
    p,
    [0, 0.56, 0.7, 0.78, 0.86],
    mobile
      ? [
          [6, 74, 88, 12],
          [6, 74, 88, 12],
          [6, 30, 88, 12],
          [6, 30, 88, 12],
          [6, 30, 88, 12],
        ]
      : [
          [67, 78, 27, 11],
          [67, 78, 27, 11],
          [30, 44, 30, 13],
          [30, 44, 30, 13],
          [30, 44, 30, 13],
        ],
  );
  const cueSurface = useTransform(p, [0.62, 0.71], [0, 1]);
  const cueInk = useTransform(p, [0.6, 0.67], ["#F7F8FC", INK]);
  const cueSub = useTransform(p, [0.6, 0.67], ["rgba(247,248,252,0.5)", "rgba(11,18,32,0.45)"]);
  const cueOpacity = useTransform(p, [0.78, 0.83], [1, 0]);
  const cueScale = useTransform(p, [0.7, 0.78], [1, 1.06]);

  /* statement -------------------------------------------------------- */
  const stmtOpacity = useTransform(p, [0.36, 0.4, 0.52, 0.56], [0, 1, 1, 0]);

  /* product shell ---------------------------------------------------- */
  const shellBox = useBoxStyle(
    p,
    [0.74, 0.86],
    mobile
      ? [
          [6, 30, 88, 12],
          [4, 22, 92, 70],
        ]
      : [
          [30, 44, 30, 13],
          [3, 23, 94, 71],
        ],
  );
  const shellClip = useTransform(
    p,
    [0.74, 0.86],
    ["inset(0% 0% 0% 0% round 10px)", "inset(0% 0% 0% 0% round 12px)"],
  );
  const shellOpacity = useTransform(p, [0.775, 0.815], [0, 1]);
  const headOpacity = useTransform(p, [0.84, 0.89], [0, 1]);
  const headY = useTransform(p, [0.84, 0.9], [14, 0]);

  return (
    <div ref={wrap} data-seq="oaft" className={mobile ? "relative h-[520vh]" : "relative h-[500vh]"}>
      <motion.div
          className="sticky w-full overflow-hidden"
          style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, background: canvas }}
        >
          {/* ---------- the film: one continuous object ---------- */}
          <motion.div
            className="absolute overflow-hidden bg-[#0A0E17]"
            style={{ ...filmBox, borderRadius: filmRadius, zIndex: 20 }}
          >
            <FilmObject reduced={reduced} onTime={onTime} />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[#080C17]"
              style={{ opacity: veil }}
            />
          </motion.div>

          {/* ---------- hero copy ---------- */}
          <motion.div
            className={cn(
              "absolute z-30",
              mobile
                ? "left-[6%] top-[55%] w-[88%]"
                : "left-[5.5%] top-1/2 w-[33%] -translate-y-1/2",
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
                mobile ? "mt-4 text-[40px] leading-[1.03]" : "mt-5 text-[76px] leading-[0.98]",
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
                  : "mt-6 max-w-[430px] text-[15.5px] leading-[1.6]",
              )}
            >
              Bring your enquiries, conversations and next steps into one place. Zapla keeps the
              work moving from first contact to booked, paid and returning.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
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
            <div className="mt-5 text-[12px] font-medium tracking-tight text-white/45">
              Unlimited users included. No per-seat fees.
            </div>
          </motion.div>

          {/* ---------- mid-scroll statement ---------- */}
          <motion.div
            className={cn(
              "absolute z-40",
              mobile ? "left-[6%] top-[26%] w-[88%]" : "left-[7%] top-[28%] w-[50%]",
            )}
            style={{ opacity: stmtOpacity }}
          >
            <MaskLine
              p={p}
              from={0.4}
              to={0.47}
              className={cn(
                "tracking-[-0.04em] text-white",
                mobile ? "text-[32px] leading-[1.07]" : "text-[58px] leading-[1.02]",
              )}
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              Her hands are on the work.
              <br />
              The follow-through still
              <br />
              happens.
            </MaskLine>
          </motion.div>

          {/* ---------- product resolves around the cue ---------- */}
          <motion.div
            className="absolute z-30"
            style={{ ...shellBox, clipPath: shellClip, opacity: shellOpacity }}
          >
            <div className="h-full w-full overflow-hidden rounded-[12px] shadow-[0_50px_120px_-40px_rgba(6,10,20,0.4)]">
              <CustomerRecord compact={mobile} />
            </div>
          </motion.div>

          {/* ---------- the persistent Sarah cue ---------- */}
          <motion.div
            className="absolute z-40"
            style={{ ...cueBox, opacity: cueOpacity, scale: cueScale }}
          >
            <SarahCue
              idx={idx}
              surface={cueSurface}
              ink={cueInk}
              sub={cueSub}
              compact={mobile}
            />
          </motion.div>

          {/* ---------- product heading ---------- */}
          <motion.div
            className={cn(
              "absolute z-40",
              mobile ? "left-[6%] top-[19%] w-[88%]" : "left-[21%] top-[5.5%] w-[52%]",
            )}
            style={{ opacity: headOpacity, y: headY }}
          >
            <h2
              className={cn(
                "tracking-[-0.04em]",
                mobile ? "text-[25px] leading-[1.08]" : "text-[38px] leading-[1.02]",
              )}
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              One customer. Everything connected.
            </h2>
            <p
              className={cn(
                "text-[#0B1220]/60",
                mobile
                  ? "mt-1.5 text-[12.5px] leading-[1.45]"
                  : "mt-2 max-w-[560px] text-[14px] leading-[1.5]",
              )}
            >
              The conversation, booking, payment and next step stay attached to the same customer.
            </p>
          </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Neutral continuation handoff                                        */
/* ------------------------------------------------------------------ */

function Continuation() {
  return (
    <section className="bg-[#F5F6FA] px-[6%] pb-24 pt-20">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 border-t border-[#0B1220]/10 pt-12 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            className="max-w-[620px] text-[34px] leading-[1.06] tracking-[-0.035em] text-[#0B1220] md:text-[40px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            You keep leading the work. Zapla keeps the follow-through moving.
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.6] text-[#0B1220]/60">
            Replies, booking offers, reminders, invoices and review requests keep advancing without
            waiting on you to remember them.
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
