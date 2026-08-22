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
const DISPLAY = '"Outfit", "Inter Tight", "Manrope", system-ui, sans-serif';
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
/* Follow-through signal — editorial caption, can drift to a target    */
/* ------------------------------------------------------------------ */

function Signal({
  p,
  at,
  out,
  label,
  time,
  x,
  y,
  toX,
  toY,
  drift,
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
  toX?: number;
  toY?: number;
  drift?: [number, number];
  align?: "left" | "right";
  tone?: "light" | "dark";
  live?: boolean;
}) {
  const end = out ?? 0.6;
  const opacity = useTransform(p, [at, at + 0.012, end, end + 0.018], [0, 1, 1, 0]);
  const ty = useTransform(p, [at, at + 0.03], [8, 0]);
  const d = drift ?? [end, end];
  const left = useTransform(p, [d[0], d[1]], [`${x}%`, `${toX ?? x}%`]);
  const right = useTransform(p, [d[0], d[1]], [`${100 - x}%`, `${100 - (toX ?? x)}%`]);
  const top = useTransform(p, [d[0], d[1]], [`${y}%`, `${toY ?? y}%`]);
  const dark = tone === "dark";

  return (
    <motion.div
      className="absolute z-20 select-none whitespace-nowrap"
      style={{
        ...(align === "right" ? { right } : { left }),

        top,
        opacity,
        y: ty,
        textAlign: align,
      }}
    >
      <div
        className={cn(
          "pb-[4px]",
          align === "right" ? "border-r pr-2.5" : "border-l pl-2.5",
          live ? "border-[#06B6D4]" : dark ? "border-[#0B1220]/25" : "border-white/55",
        )}
      >
        <div
          className={cn(
            "text-[13.5px] font-medium leading-none tracking-[-0.01em]",
            dark ? "text-[#0B1220]" : "text-white drop-shadow-[0_1px_10px_rgba(6,10,20,0.65)]",
          )}
          style={{ fontFamily: DISPLAY }}
        >
          {label}
        </div>
        <div
          className={cn(
            "mt-[6px] text-[9.5px] font-medium uppercase leading-none tracking-[0.18em]",
            dark ? "text-[#0B1220]/45" : "text-white/70",
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
    const a = v < 0.18 ? 0 : v < 0.44 ? 1 : v < 0.62 ? 2 : v < 0.74 ? 3 : 4;
    setAct((prev) => (prev === a ? prev : a));
  });

  /* ---- ACT A: hero copy, decisive exit ---- */
  const heroOpacity = useTransform(p, [0, 0.15, 0.19], [1, 1, 0]);
  const heroY = useTransform(p, [0.14, 0.2], [0, -40]);

  /* ---- the ONE dominant human window: full-bleed right -> left work window ----
     Bleeds off the canvas edges on purpose: a moving window into real work.  */
  const mont = useBoxStyle(
    p,
    [0, 0.16, 0.28, 0.62, 0.7],
    [
      [41, -4, 63, 108],
      [41, -4, 63, 108],
      [-6, -8, 50, 72],
      [-6, -8, 50, 72],
      [-56, -8, 50, 72],
    ],
  );
  const montOpacity = useTransform(p, [0.66, 0.72], [1, 0]);

  /* ---- ACT B: second scene bleeds in from the upper-right edge ---- */
  const broker = useBoxStyle(
    p,
    [0.22, 0.3, 0.46, 0.52],
    [
      [104, -12, 36, 52],
      [67, -12, 36, 52],
      [67, -12, 36, 52],
      [104, -12, 36, 52],
    ],
  );
  /* ---- ACT C: the world opens sequentially, never all at once ---- */
  const dentist = useBoxStyle(
    p,
    [0.46, 0.55, 0.64, 0.7],
    [
      [104, -10, 34, 48],
      [69, -10, 34, 48],
      [69, -10, 34, 48],
      [106, -10, 34, 48],
    ],
  );
  /* narrow vertical crop, bleeding off the bottom edge */
  const agent = useBoxStyle(
    p,
    [0.34, 0.42, 0.64, 0.7],
    [
      [86, 112, 13, 58],
      [86, 46, 13, 58],
      [86, 46, 13, 58],
      [86, 114, 13, 58],
    ],
  );

  /* ---- ACT C: the statement is the visual anchor ---- */
  const msgOpacity = useTransform(p, [0.32, 0.34, 0.63, 0.66], [0, 1, 1, 0]);
  const rule = useTransform(p, [0.32, 0.4], ["0%", "100%"]);


  /* ---- ACT D/E: the activity organises itself into one product surface ---- */
  const shellBox = useBoxStyle(
    p,
    [0.68, 0.84],
    [
      [14, 30, 72, 50],
      [4, 20, 92, 72],
    ],
  );
  const shellClip = useTransform(
    p,
    [0.68, 0.8],
    ["inset(30% 30% 30% 30% round 14px)", "inset(0% 0% 0% 0% round 14px)"],
  );
  const shellOpacity = useTransform(p, [0.68, 0.73], [0, 1]);
  const headOpacity = useTransform(p, [0.8, 0.85], [0, 1]);
  const headY = useTransform(p, [0.8, 0.87], [16, 0]);

  return (
    <div ref={wrap} className="relative hidden h-[520vh] md:block">
      <div
        data-human-work-stage="desktop"
        className="sticky w-full overflow-hidden bg-[#F5F6FA]"
        style={{ top: NAV, height: `calc(100vh - ${NAV}px)` }}
      >
        {/* ---------- sequential world: second and third scenes ---------- */}
        <Frame
          media={V.broker}
          playing={act === 1}
          reduced={reduced}
          radius={0}
          objectPosition="42% 42%"
          style={{ ...broker, zIndex: 5 }}
        />
        <Frame
          media={V.dentist}
          playing={act === 2}
          reduced={reduced}
          radius={0}
          objectPosition="40% 45%"
          style={{ ...dentist, zIndex: 5 }}
        />
        <Frame
          media={V.agent}
          playing={act === 2}
          reduced={reduced}
          radius={0}
          objectPosition="50% 40%"
          style={{ ...agent, zIndex: 6 }}
        />

        {/* ---------- the dominant human window ---------- */}
        <Frame
          media={V.montage}
          playing={act <= 2}
          reduced={reduced}
          radius={0}
          objectPosition="52% 48%"
          darken={0.08}
          style={{ ...mont, opacity: montOpacity, zIndex: 10 }}
        />

        {/* ---------- ACT A hero copy ---------- */}
        <div className="absolute left-[5.5%] top-1/2 z-40 w-[36%] -translate-y-1/2">
          <motion.div style={{ opacity: heroOpacity, y: heroY }}>
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-6" style={{ background: CYAN }} />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0B1220]/55">
                CRM + automation for service businesses
              </span>
            </div>
            <h1
              className="mt-6 text-[76px] leading-[0.96] tracking-[-0.045em]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              You lead.
              <br />
              Zapla follows
              <br />
              through.
            </h1>
            <p className="mt-7 max-w-[430px] text-[16px] leading-[1.6] text-[#0B1220]/62">
              Bring your enquiries, conversations and next steps into one place. Zapla keeps the work
              moving from first contact to booked, paid and returning.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://zapla.io/booking"
                className="inline-flex h-[49px] items-center gap-2 rounded-[10px] px-6 text-[15px] font-semibold text-white"
                style={{ background: CYAN }}
              >
                Book a demo
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="inline-flex h-[49px] items-center rounded-[10px] border border-[#0B1220]/14 bg-white/70 px-5 text-[15px] font-semibold text-[#0B1220]">
                See how it works
              </span>
            </div>
            <div className="mt-5 text-[12.5px] font-medium tracking-tight text-[#0B1220]/45">
              Unlimited users included
            </div>
          </motion.div>
        </div>

        {/* ---------- follow-through signals: 2-3 at a time, cause then effect --- */}
        <Signal
          p={p}
          at={0.03}
          out={0.145}
          label="New enquiry"
          time="10:14 AM"
          x={94}
          y={84}
          align="right"
          live
        />
        {/* Act B: enquiry -> follow-up -> booking, anchored to the scene edges */}
        <Signal p={p} at={0.24} out={0.44} label="New enquiry" time="10:14 AM" x={45} y={13} tone="dark" live />
        <Signal p={p} at={0.3} out={0.46} label="Follow-up sent" time="10:41 AM" x={69} y={31} />
        <Signal p={p} at={0.36} out={0.52} label="Booking confirmed" time="11:02 AM" x={45} y={26} tone="dark" />
        {/* Act C: payment, review, reactivation — these drift into the product */}
        <Signal
          p={p}
          at={0.5}
          out={0.71}
          label="Invoice paid"
          time="4:18 PM"
          x={73}
          y={28}
          toX={62}
          toY={34}
          drift={[0.64, 0.71]}
        />
        <Signal
          p={p}
          at={0.54}
          out={0.72}
          label="Review requested"
          time="Thu 9:00 AM"
          x={45}
          y={38}
          toX={62}
          toY={42}
          tone="dark"
          drift={[0.64, 0.72]}
        />
        <Signal
          p={p}
          at={0.58}
          out={0.73}
          label="Client reactivated"
          time="6 months later"
          x={45}
          y={50}
          toX={62}
          toY={50}
          tone="dark"
          drift={[0.64, 0.73]}
        />

        {/* ---------- ACT C statement: the anchor ---------- */}
        <motion.div
          className="absolute bottom-[8%] left-[5.5%] z-[45] w-[52%]"
          style={{ opacity: msgOpacity }}
        >
          <motion.div className="h-[2px]" style={{ width: rule, background: CYAN, maxWidth: 36 }} />
          <div
            className="mt-5 text-[56px] leading-[1] tracking-[-0.045em]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            <MaskLine p={p} from={0.415} to={0.465} className="whitespace-nowrap">
              While you do the work,
            </MaskLine>
            <MaskLine p={p} from={0.45} to={0.5} className="whitespace-nowrap">
              <span style={{ color: CYAN }}>Zapla handles</span>
            </MaskLine>
            <MaskLine p={p} from={0.485} to={0.535} className="whitespace-nowrap">
              <span style={{ color: CYAN }}>the follow-through.</span>
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
          className="absolute left-[4%] top-[3.5%] z-40 max-w-[64%]"
          style={{ opacity: headOpacity, y: headY }}
        >
          <h2
            className="text-[50px] leading-[1] tracking-[-0.045em]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            One customer. Everything connected.
          </h2>
          <p className="mt-2.5 max-w-[560px] text-[14.5px] leading-[1.6] text-[#0B1220]/58">
            Conversations, opportunities, bookings and next steps stay connected, so the work keeps
            moving.
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
          Bring your enquiries, conversations and next steps into one place. Zapla keeps the work
          moving from first contact to booked, paid and returning.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] text-[15px] font-semibold text-white"
            style={{ background: CYAN }}
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
          <span className="inline-flex h-[50px] items-center justify-center rounded-[10px] border border-[#0B1220]/14 bg-white/70 text-[15px] font-semibold text-[#0B1220]">
            See how it works
          </span>
        </div>
        <div className="mt-4 text-[12px] font-medium text-[#0B1220]/45">
          Unlimited users included
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
          Conversations, opportunities, bookings and next steps stay connected, so the work keeps
          moving.

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
