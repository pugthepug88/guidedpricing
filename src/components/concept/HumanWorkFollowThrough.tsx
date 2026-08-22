/* Concept-only, isolated art-direction prototype.
   Real service professionals doing real work -> Zapla as the invisible
   follow-through system behind that work.
   People, businesses and numbers shown in the product reveal are fictional. */
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

const MEDIA = "/concept/human-work";
const NAV = 66; /* shared site nav height — the film starts below it */

/* Concept-only display face: tight neo-grotesque, mature, not chunky */
const DISPLAY = '"Inter Tight", "Manrope", system-ui, sans-serif';
const INK = "#0B1220";
const CYAN = "#06B6D4";

const V = {
  montage: { src: `${MEDIA}/hero-montage.mp4`, poster: `${MEDIA}/hero-montage.jpg` },
  broker: { src: `${MEDIA}/broker.mp4`, poster: `${MEDIA}/broker.jpg` },
  agent: { src: `${MEDIA}/agent.mp4`, poster: `${MEDIA}/agent.jpg` },
  dentist: { src: `${MEDIA}/dentist.mp4`, poster: `${MEDIA}/dentist.jpg` },
};

/* ------------------------------------------------------------------ */
/* Media frame                                                         */
/* ------------------------------------------------------------------ */

type Box = [number, number, number, number]; // left, top, width, height (%)

function useBoxStyle(p: MotionValue<number>, at: number[], boxes: Box[]) {
  const left = useTransform(p, at, boxes.map((b) => `${b[0]}%`));
  const top = useTransform(p, at, boxes.map((b) => `${b[1]}%`));
  const width = useTransform(p, at, boxes.map((b) => `${b[2]}%`));
  const height = useTransform(p, at, boxes.map((b) => `${b[3]}%`));
  return { left, top, width, height };
}

function Frame({
  media,
  playing,
  reduced,
  style,
  radius = 0,
  objectPosition = "center",
  className,
  darken = 0.14,
}: {
  media: { src: string; poster: string };
  playing: boolean;
  reduced: boolean;
  style: Record<string, unknown>;
  radius?: number;
  objectPosition?: string;
  className?: string;
  darken?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (playing) {
      void v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [playing, reduced]);

  return (
    <motion.div
      className={cn("absolute overflow-hidden bg-[#0d1220]", className)}
      style={{ ...style, borderRadius: radius }}
    >
      {reduced ? (
        <img
          src={media.poster}
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <video
          ref={ref}
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="h-full w-full object-cover"
          style={{ objectPosition }}
        />
      )}
      {/* neutral film-darkening only, no gradient marketing overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `rgba(8,12,24,${darken})` }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Follow-through signal — editorial caption                           */
/* ------------------------------------------------------------------ */

function Signal({
  p,
  at,
  out,
  label,
  time,
  x,
  y,
  align = "left",
  tone = "light",
  live,
}: {
  p: MotionValue<number>;
  at: number;
  out?: number;
  label: string;
  time: string;
  x: number;
  y: number;
  align?: "left" | "right";
  tone?: "light" | "dark";
  live?: boolean;
}) {
  const end = out ?? 0.6;
  const opacity = useTransform(p, [at, at + 0.012, end, end + 0.018], [0, 1, 1, 0]);
  const ty = useTransform(p, [at, at + 0.03], [8, 0]);
  const dark = tone === "dark";

  return (
    <motion.div
      className="absolute z-20 select-none whitespace-nowrap"
      style={{
        ...(align === "right" ? { right: `${100 - x}%` } : { left: `${x}%` }),
        top: `${y}%`,
        opacity,
        y: ty,
        textAlign: align,
      }}
    >
      <div
        className={cn(
          "pb-[4px]",
          align === "right" ? "border-r pr-2.5" : "border-l pl-2.5",
          live ? "border-[#06B6D4]" : dark ? "border-[#0B1220]/25" : "border-white/50",
        )}
      >
        <div
          className={cn(
            "text-[13px] font-medium leading-none tracking-[-0.01em]",
            dark ? "text-[#0B1220]" : "text-white drop-shadow-[0_1px_10px_rgba(6,10,20,0.6)]",
          )}
          style={{ fontFamily: DISPLAY }}
        >
          {label}
        </div>
        <div
          className={cn(
            "mt-[6px] text-[9.5px] font-medium uppercase leading-none tracking-[0.18em]",
            dark ? "text-[#0B1220]/45" : "text-white/65",
          )}
        >
          {time}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Product reveal — one coherent Zapla system view                     */
/* ------------------------------------------------------------------ */

const THREAD = [
  { from: "them", text: "Hi, do you have any availability this week?", time: "10:14 AM" },
  { from: "us", text: "Thursday 3:00 PM works. I'll hold it for you.", time: "10:16 AM" },
  { from: "them", text: "Perfect, book me in.", time: "10:21 AM" },
];

function CustomerSystemView({ mediaSlot = true }: { mediaSlot?: boolean }) {
  return (
    <AppShell activeKey="inbox" title="Sarah Chen" subtitle="Customer · Chatswood, NSW">
      <div className="flex h-full min-h-0">
        {/* conversation list */}
        <div className="hidden w-[210px] shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
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

        {/* thread */}
        <div className="flex min-w-0 flex-1 flex-col bg-[#F8FAFF]">
          <div className="flex items-center gap-2 border-b border-slate-200/80 bg-white/70 px-4 py-2">
            <Face src={FACE.sophie} size={24} />
            <div className="text-[12.5px] font-semibold text-slate-900">Sarah Chen</div>
            <div className="ml-auto text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#0891b2]">
              Open
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

        {/* connected states */}
        <div className="hidden w-[248px] shrink-0 flex-col gap-2.5 border-l border-slate-200/80 bg-white p-3 md:flex">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Job
          </div>
          {/* landing slot for the retained work footage */}
          <div
            data-slot="work-media"
            className="h-[86px] w-full overflow-hidden rounded-[8px] bg-slate-100"
          >
            {mediaSlot ? null : null}
          </div>
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

/* ------------------------------------------------------------------ */
/* Masked line reveal — decisive arrival, no washed-out grey fade      */
/* ------------------------------------------------------------------ */

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
/* Desktop sticky sequence                                             */
/* ------------------------------------------------------------------ */

function DesktopSequence({ reduced }: { reduced: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  /* deterministic scroll scrub: measured every frame, immune to late layout */
  const p = useMotionValue(0);
  const [act, setAct] = useState(0);

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
    const a = v < 0.18 ? 0 : v < 0.32 ? 1 : v < 0.58 ? 2 : v < 0.74 ? 3 : 4;
    setAct((prev) => (prev === a ? prev : a));
  });

  /* ---- ACT A: hero copy, fast decisive exit ---- */
  const heroOpacity = useTransform(p, [0, 0.15, 0.185], [1, 1, 0]);
  const heroY = useTransform(p, [0.14, 0.19], [0, -34]);

  /* ---- the ONE retained object: hero montage ----
     A: full-bleed right   B: reframed work window   D: compresses into the record  */
  const mont = useBoxStyle(
    p,
    [0, 0.15, 0.25, 0.58, 0.66, 0.74],
    [
      [38, 0, 62, 100],
      [38, 0, 62, 100],
      [4, 8, 40, 52],
      [4, 8, 40, 52],
      [56, 26, 20, 22],
      [70.9, 24.2, 16.4, 9.6],
    ],
  );
  const montRadius = useTransform(p, [0.15, 0.25, 0.62], [0, 10, 8]);
  const montOpacity = useTransform(p, [0.72, 0.78], [1, 0.92]);

  /* ---- ACT C: broader world slides in from the edges ---- */
  const broker = useBoxStyle(
    p,
    [0.2, 0.28, 0.58, 0.64],
    [
      [104, 6, 36, 48],
      [62, 6, 36, 48],
      [62, 6, 36, 48],
      [108, 6, 36, 48],
    ],
  );
  const agent = useBoxStyle(
    p,
    [0.25, 0.33, 0.58, 0.63],
    [
      [46, -62, 14, 52],
      [46, 8, 14, 52],
      [46, 8, 14, 52],
      [46, -66, 14, 52],
    ],
  );
  const dentist = useBoxStyle(
    p,
    [0.3, 0.38, 0.58, 0.65],
    [
      [62, 108, 36, 36],
      [62, 58, 36, 36],
      [62, 58, 36, 36],
      [62, 112, 36, 36],
    ],
  );

  /* ---- ACT C: mid-scroll statement, all dark, masked reveal ---- */
  const msgOpacity = useTransform(p, [0.44, 0.455, 0.575, 0.6], [0, 1, 1, 0]);
  const rule = useTransform(p, [0.44, 0.5], ["0%", "100%"]);

  /* ---- ACT D/E: product state grows out of the same customer thread ---- */
  const shellBox = useBoxStyle(
    p,
    [0.6, 0.74],
    [
      [12, 20, 76, 60],
      [3, 15, 94, 73],
    ],
  );
  const shellClip = useTransform(
    p,
    [0.6, 0.68],
    ["inset(46% 42% 46% 42% round 12px)", "inset(0% 0% 0% 0% round 14px)"],
  );
  const shellOpacity = useTransform(p, [0.595, 0.615], [0, 1]);
  const headOpacity = useTransform(p, [0.72, 0.755], [0, 1]);
  const headY = useTransform(p, [0.72, 0.78], [18, 0]);

  return (
    <div ref={wrap} className="relative hidden h-[460vh] md:block">
      <div
        className="sticky w-full overflow-hidden bg-[#F5F6FA]"
        style={{ top: NAV, height: `calc(100vh - ${NAV}px)` }}
      >
        {/* ---------- broader service world (slides, never dissolves) ---------- */}
        <Frame
          media={V.broker}
          playing={act >= 2 && act <= 2}
          reduced={reduced}
          radius={10}
          objectPosition="42% 40%"
          style={{ ...broker, zIndex: 5 }}
        />
        <Frame
          media={V.agent}
          playing={act >= 2 && act <= 2}
          reduced={reduced}
          radius={10}
          objectPosition="50% 42%"
          style={{ ...agent, zIndex: 6 }}
        />
        <Frame
          media={V.dentist}
          playing={act >= 2 && act <= 2}
          reduced={reduced}
          radius={0}
          objectPosition="38% 45%"
          style={{ ...dentist, zIndex: 5 }}
        />

        {/* ---------- the ONE retained object ---------- */}
        <Frame
          media={V.montage}
          playing={act <= 4}
          reduced={reduced}
          objectPosition="52% 48%"
          darken={0.1}
          style={{ ...mont, borderRadius: montRadius, opacity: montOpacity, zIndex: 40 }}
        />

        {/* ---------- ACT A hero copy ---------- */}
        <div className="absolute left-[6%] top-1/2 z-40 w-[31%] -translate-y-1/2">
        <motion.div style={{ opacity: heroOpacity, y: heroY }}>
          <div className="flex items-center gap-2.5">
            <span className="h-[2px] w-6" style={{ background: CYAN }} />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0B1220]/55">
              CRM + automation for service businesses
            </span>
          </div>
          <h1
            className="mt-5 text-[74px] leading-[1] tracking-[-0.04em]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            You lead.
            <br />
            Zapla follows
            <br />
            through.
          </h1>
          <p className="mt-6 max-w-[400px] text-[15.5px] leading-[1.6] text-[#0B1220]/62">
            One place for enquiries, conversations, bookings, payments and next steps. Zapla keeps
            the work moving from first contact to booked, paid and returning.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-[14px] font-semibold text-white"
              style={{ background: INK }}
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="inline-flex h-11 items-center rounded-full border border-[#0B1220]/15 px-5 text-[14px] font-semibold text-[#0B1220]">
              See how it works
            </span>
          </div>
          <div className="mt-5 text-[12px] font-medium tracking-tight text-[#0B1220]/45">
            Unlimited users included. No per-seat fees.
          </div>
        </motion.div>
        </div>

        {/* ---------- ACT B/C signals ---------- */}
        <Signal
          p={p}
          at={0.03}
          out={0.14}
          label="New enquiry"
          time="10:14 AM"
          x={95}
          y={86}
          align="right"
          live
        />
        <Signal p={p} at={0.3} out={0.585} label="New enquiry" time="10:14 AM" x={4.5} y={2} tone="dark" live />
        <Signal
          p={p}
          at={0.42}
          out={0.575}
          label="Follow-up sent"
          time="10:41 AM"
          x={62}
          y={52}
          align="right"
          tone="dark"
        />
        <Signal
          p={p}
          at={0.46}
          out={0.575}
          label="Booking confirmed"
          time="11:02 AM"
          x={60}
          y={2}
          align="right"
          tone="dark"
        />
        <Signal p={p} at={0.5} out={0.575} label="Invoice paid" time="4:18 PM" x={63.5} y={90} />
        <Signal
          p={p}
          at={0.53}
          out={0.575}
          label="Review requested"
          time="Thu 9:00 AM"
          x={59}
          y={72}
          align="right"
          tone="dark"
        />
        <Signal
          p={p}
          at={0.56}
          out={0.575}
          label="Client reactivated"
          time="6 months later"
          x={52}
          y={88}
          tone="dark"
        />

        {/* ---------- ACT C statement ---------- */}
        <motion.div
          className="absolute left-[4.5%] top-[63%] z-[45] w-[46%]"
          style={{ opacity: msgOpacity }}
        >
          <motion.div className="h-[2px]" style={{ width: rule, background: CYAN, maxWidth: 34 }} />
          <div
            className="mt-4 text-[44px] leading-[1.02] tracking-[-0.04em]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            <MaskLine p={p} from={0.455} to={0.5}>
              While you do the work,
            </MaskLine>
            <MaskLine p={p} from={0.49} to={0.535}>
              Zapla handles the follow-through.
            </MaskLine>
          </div>
        </motion.div>

        {/* ---------- ACT D/E product state ---------- */}
        <motion.div
          className="absolute z-30"
          style={{ ...shellBox, opacity: shellOpacity, clipPath: shellClip }}
        >
          <div className="h-full w-full overflow-hidden rounded-[14px] border border-slate-200/90 bg-white shadow-[0_40px_100px_-45px_rgba(15,23,42,0.3)]">
            <CustomerSystemView />
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[3%] top-[4%] z-40 max-w-[62%]"
          style={{ opacity: headOpacity, y: headY }}
        >
          <h2
            className="text-[46px] leading-[1] tracking-[-0.04em]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            One customer. Everything connected.
          </h2>
          <p className="mt-2.5 max-w-[540px] text-[14.5px] leading-[1.6] text-[#0B1220]/58">
            The job, the conversation, the booking, the payment and the next step all stay attached
            to the same customer.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile story — edge-to-edge film moments, short editorial copy       */
/* ------------------------------------------------------------------ */

function MobileMoment({
  media,
  reduced,
  caption,
  time,
  tall,
}: {
  media: { src: string; poster: string };
  reduced: boolean;
  caption?: string;
  time?: string;
  tall?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), {
      rootMargin: "10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden", tall ? "h-[72vh]" : "h-[50vh]")}
    >
      <Frame
        media={media}
        playing={seen}
        reduced={reduced}
        radius={0}
        style={{ left: 0, top: 0, width: "100%", height: "100%" }}
      />
      {caption ? (
        <div className="absolute bottom-5 left-5 z-20 border-l pl-2.5" style={{ borderColor: CYAN }}>
          <div
            className="text-[13.5px] font-medium leading-none text-white"
            style={{ fontFamily: DISPLAY }}
          >
            {caption}
          </div>
          {time ? (
            <div className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.18em] text-white/70">
              {time}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MobileSequence({ reduced }: { reduced: boolean }) {
  return (
    <div className="md:hidden">
      <div className="px-6 pb-8 pt-9">
        <div className="flex items-center gap-2.5">
          <span className="h-[2px] w-5" style={{ background: CYAN }} />
          <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#0B1220]/55">
            CRM + automation for service businesses
          </span>
        </div>
        <h1
          className="mt-4 text-[40px] leading-[1] tracking-[-0.04em]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
        >
          You lead. Zapla follows through.
        </h1>
        <p className="mt-4 text-[15px] leading-[1.6] text-[#0B1220]/62">
          One place for enquiries, conversations, bookings, payments and next steps. Zapla keeps the
          work moving from first contact to booked, paid and returning.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-semibold text-white"
            style={{ background: INK }}
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
          <span className="inline-flex h-12 items-center justify-center rounded-full border border-[#0B1220]/15 text-[15px] font-semibold text-[#0B1220]">
            See how it works
          </span>
        </div>
        <div className="mt-4 text-[12px] font-medium text-[#0B1220]/45">
          Unlimited users included. No per-seat fees.
        </div>
      </div>

      <MobileMoment
        media={V.montage}
        reduced={reduced}
        caption="New enquiry"
        time="10:14 AM"
        tall
      />

      <div className="px-6 py-10">
        <div className="h-[2px] w-8" style={{ background: CYAN }} />
        <div
          className="mt-4 text-[30px] leading-[1.06] tracking-[-0.04em]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
        >
          While you do the work, Zapla handles the follow-through.
        </div>
      </div>

      <MobileMoment media={V.broker} reduced={reduced} caption="Follow-up sent" time="10:41 AM" />
      <MobileMoment
        media={V.agent}
        reduced={reduced}
        caption="Booking confirmed"
        time="11:02 AM"
        tall
      />
      <MobileMoment media={V.dentist} reduced={reduced} caption="Invoice paid" time="4:18 PM" />

      <div className="px-6 pb-6 pt-10">
        <h2
          className="text-[32px] leading-[1.03] tracking-[-0.04em]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
        >
          One customer. Everything connected.
        </h2>
        <p className="mt-3 text-[14.5px] leading-[1.6] text-[#0B1220]/58">
          The job, the conversation, the booking, the payment and the next step all stay attached to
          the same customer.
        </p>
      </div>
      <div className="px-4 pb-14">
        <div className="h-[520px] overflow-hidden rounded-[14px] border border-slate-200/90 bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.28)]">
          <CustomerSystemView />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hand-off section — the product environment continues, no dead zone  */
/* ------------------------------------------------------------------ */

function HandOff() {
  return (
    <section className="hidden border-t border-slate-200/70 bg-[#FBFCFE] md:block">
      <div className="mx-auto max-w-[1180px] px-8 py-16">
        <h2
          className="max-w-[620px] text-[38px] leading-[1.04] tracking-[-0.04em]"
          style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
        >
          See the whole customer journey in one place.
        </h2>
        <div className="mt-9 grid grid-cols-3 gap-5">
          {[
            { k: "Enquiry", v: "Instagram · 10:14 AM" },
            { k: "Booking", v: "Thu 3:00 PM · confirmed" },
            { k: "Payment", v: "A$450 paid" },
          ].map((c) => (
            <div key={c.k} className="rounded-[12px] border border-slate-200/80 bg-white p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {c.k}
              </div>
              <div
                className="mt-2 text-[19px] tracking-[-0.02em] text-[#0B1220]"
                style={{ fontFamily: DISPLAY, fontWeight: 500 }}
              >
                {c.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function HumanWorkFollowThrough() {
  const reduced = !!useReducedMotion();
  return (
    <div className="bg-[#F5F6FA]" style={{ color: INK }}>
      <DesktopSequence reduced={reduced} />
      <MobileSequence reduced={reduced} />
      <HandOff />
    </div>
  );
}
