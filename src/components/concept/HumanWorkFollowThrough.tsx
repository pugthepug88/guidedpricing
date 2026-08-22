/* Concept-only, isolated art-direction prototype.
   Real service professionals doing real work -> Zapla as the invisible
   follow-through system behind that work.
   People, businesses and numbers shown in the product reveal are fictional. */
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, CalendarDays, Check, CreditCard, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, Face } from "@/components/v5/kit";
import { FACE } from "@/components/v5/faces";

const MEDIA = "/concept/human-work";

const V = {
  mechanic: { src: `${MEDIA}/mechanic.mp4`, poster: `${MEDIA}/mechanic.jpg` },
  painter: { src: `${MEDIA}/painter.mp4`, poster: `${MEDIA}/painter.jpg` },
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
  radius = 12,
  objectPosition = "center",
  className,
}: {
  media: { src: string; poster: string };
  playing: boolean;
  reduced: boolean;
  style: Record<string, unknown>;
  radius?: number;
  objectPosition?: string;
  className?: string;
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
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,24,0.18) 0%, rgba(8,12,24,0) 38%, rgba(8,12,24,0.22) 100%)",
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Follow-through signal — editorial caption, not a pill              */
/* ------------------------------------------------------------------ */

function Signal({
  p,
  at,
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
  label: string;
  time: string;
  x: number;
  y: number;
  align?: "left" | "right";
  tone?: "light" | "dark";
  live?: boolean;
}) {
  const opacity = useTransform(p, [at, at + 0.035, 0.63, 0.69], [0, 1, 1, 0]);
  const ty = useTransform(p, [at, at + 0.06], [10, 0]);
  const dark = tone === "dark";

  return (
    <motion.div
      className="absolute z-20 select-none whitespace-nowrap"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity,
        y: ty,
        textAlign: align,
        transform: align === "right" ? "translateX(-100%)" : undefined,
      }}
    >
      <div
        className={cn(
          "pb-[5px]",
          align === "right" ? "border-r pr-2.5" : "border-l pl-2.5",
          live ? "border-[#06B6D4]" : dark ? "border-zapla-ink/25" : "border-white/55",
        )}
      >
        <div
          className={cn(
            "text-[12.5px] font-semibold leading-none tracking-tight",
            dark
              ? "text-zapla-ink"
              : "text-white drop-shadow-[0_1px_10px_rgba(6,10,20,0.7)]",
          )}
        >
          {label}
        </div>
        <div
          className={cn(
            "mt-[5px] text-[10px] font-medium uppercase leading-none tracking-[0.16em]",
            dark ? "text-zapla-muted" : "text-white/70",
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

function CustomerSystemView() {
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
          <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
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
            <div className="mt-1 text-[11px] text-slate-500">Scheduled automatically</div>
          </div>
          <div className="mt-auto text-[10.5px] leading-relaxed text-slate-400">
            Every step above stays attached to Sarah, not to a person's memory.
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
      <span
        className={cn("flex h-6 w-6 items-center justify-center rounded-[8px]", tones[tone])}
      >
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
/* Desktop sticky sequence                                             */
/* ------------------------------------------------------------------ */

function DesktopSequence({ reduced }: { reduced: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: wrap,
    offset: ["start start", "end end"],
  });

  const [act, setAct] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const a = v < 0.16 ? 0 : v < 0.34 ? 1 : v < 0.56 ? 2 : v < 0.74 ? 3 : 4;
    setAct((prev) => (prev === a ? prev : a));
  });

  /* hero copy */
  const heroOpacity = useTransform(p, (v: number) =>
    v <= 0.09 ? 1 : Math.max(0, 1 - (v - 0.09) / 0.06),
  );
  const heroY = useTransform(p, (v: number) => -Math.min(60, Math.max(0, v / 0.16) * 60));

  /* mechanic — dominant */
  const mech = useBoxStyle(
    p,
    [0, 0.3, 0.56, 0.78, 1],
    [
      [34, -8, 72, 116],
      [-4, 6, 44, 58],
      [-4, 6, 44, 58],
      [-16, 3, 34, 46],
      [-26, 1, 30, 42],
    ],
  );
  const mechOpacity = useTransform(p, [0.7, 0.86], [1, 0.14]);
  const mechBlur = useTransform(p, [0.7, 0.86], ["blur(0px)", "blur(7px)"]);

  const painter = useBoxStyle(
    p,
    [0.16, 0.3, 0.56, 0.78, 1],
    [
      [66, -12, 40, 38],
      [62, -6, 44, 42],
      [62, -6, 44, 42],
      [76, -12, 32, 34],
      [86, -14, 30, 32],
    ],
  );
  const painterOpacity = useTransform(p, [0.16, 0.24, 0.7, 0.86], [0, 1, 1, 0.12]);
  const painterBlur = useTransform(p, [0.7, 0.86], ["blur(0px)", "blur(7px)"]);

  const agent = useBoxStyle(
    p,
    [0.2, 0.32, 0.56, 0.78, 1],
    [
      [45, 13, 13, 40],
      [44, 8, 15, 46],
      [44, 8, 15, 46],
      [42, 4, 12, 36],
      [40, 0, 11, 32],
    ],
  );
  const agentOpacity = useTransform(p, [0.2, 0.28, 0.68, 0.84], [0, 1, 1, 0.1]);
  const agentBlur = useTransform(p, [0.68, 0.84], ["blur(0px)", "blur(8px)"]);

  const broker = useBoxStyle(
    p,
    [0.24, 0.36, 0.56, 0.78, 1],
    [
      [74, 56, 30, 34],
      [70, 52, 34, 38],
      [70, 52, 34, 38],
      [82, 58, 26, 30],
      [90, 60, 24, 28],
    ],
  );
  const brokerOpacity = useTransform(p, [0.24, 0.32, 0.7, 0.86], [0, 1, 1, 0.12]);
  const brokerBlur = useTransform(p, [0.7, 0.86], ["blur(0px)", "blur(7px)"]);

  const dentist = useBoxStyle(
    p,
    [0.28, 0.4, 0.56, 0.78, 1],
    [
      [-4, 76, 22, 30],
      [-1, 70, 27, 36],
      [-1, 70, 27, 36],
      [-10, 78, 22, 28],
      [-18, 82, 20, 26],
    ],
  );
  const dentistOpacity = useTransform(p, [0.28, 0.36, 0.7, 0.86], [0, 1, 1, 0.12]);
  const dentistBlur = useTransform(p, [0.7, 0.86], ["blur(0px)", "blur(7px)"]);

  /* ambient act-1 signal */
  const ambientOpacity = useTransform(p, [0.03, 0.07, 0.15, 0.2], [0, 1, 1, 0]);

  /* central human-work message */
  const msgOpacity = useTransform(p, [0.42, 0.5, 0.66, 0.72], [0, 1, 1, 0]);
  const msgY = useTransform(p, [0.42, 0.72], [26, -22]);
  const msgLine = useTransform(p, [0.46, 0.58], ["0%", "100%"]);

  /* product reveal */
  const shellOpacity = useTransform(p, [0.76, 0.87], [0, 1]);
  const shellScale = useTransform(p, [0.76, 0.94], [0.9, 1]);
  const shellY = useTransform(p, [0.76, 0.94], [70, 0]);
  const revealOpacity = useTransform(p, [0.8, 0.89], [0, 1]);
  const revealY = useTransform(p, [0.8, 0.95], [24, 0]);

  return (
    <div ref={wrap} className="relative hidden h-[500vh] md:block">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F7F8FC]">
        {/* ---------- human world layer ---------- */}
        <Frame
          media={V.mechanic}
          playing={act <= 3}
          reduced={reduced}
          radius={0}
          objectPosition="52% 45%"
          style={{ ...mech, opacity: mechOpacity, filter: mechBlur, zIndex: 6 }}
        />
        <Frame
          media={V.painter}
          playing={act >= 1 && act <= 3}
          reduced={reduced}
          radius={0}
          style={{ ...painter, opacity: painterOpacity, filter: painterBlur, zIndex: 5 }}
        />
        <Frame
          media={V.agent}
          playing={act >= 1 && act <= 3}
          reduced={reduced}
          radius={12}
          style={{ ...agent, opacity: agentOpacity, filter: agentBlur, zIndex: 7 }}
        />
        <Frame
          media={V.broker}
          playing={act >= 1 && act <= 3}
          reduced={reduced}
          radius={12}
          style={{ ...broker, opacity: brokerOpacity, filter: brokerBlur, zIndex: 5 }}
        />
        <Frame
          media={V.dentist}
          playing={act >= 2 && act <= 3}
          reduced={reduced}
          radius={0}
          style={{ ...dentist, opacity: dentistOpacity, filter: dentistBlur, zIndex: 5 }}
        />

        {/* ---------- Act 1 hero copy ---------- */}
        <motion.div
          className="absolute left-[6.5%] top-1/2 z-20 w-[33%] -translate-y-1/2"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-zapla-muted">
            CRM + automation for service businesses
          </div>
          <h1 className="mt-4 text-[54px] font-extrabold leading-[0.98] tracking-[-0.03em] text-zapla-ink">
            You lead.
            <br />
            Zapla follows
            <br />
            through.
          </h1>
          <p className="mt-5 max-w-[370px] text-[15.5px] leading-relaxed text-zapla-muted">
            Bring your enquiries, conversations and next steps into one place. Zapla keeps the work
            moving from first contact to booked, paid and returning.
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a
              href="https://zapla.io/booking"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-zapla-ink px-6 text-[14px] font-semibold text-white"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="inline-flex h-11 items-center rounded-full border border-zapla-line2 px-5 text-[14px] font-semibold text-zapla-ink">
              See how it works
            </span>
          </div>
          <div className="mt-5 text-[12px] font-medium tracking-tight text-zapla-muted2">
            Unlimited users included
          </div>
        </motion.div>

        {/* ambient operational context */}
        <motion.div
          className="absolute bottom-[9%] right-[6%] z-20 border-l border-[#06B6D4] pl-3 text-right"
          style={{ opacity: ambientOpacity, transform: "translateX(0)" }}
        >
          <div className="text-[12.5px] font-semibold leading-none text-white drop-shadow-[0_1px_10px_rgba(6,10,20,0.75)]">
            New enquiry
          </div>
          <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/75">
            10:14 AM
          </div>
        </motion.div>

        {/* ---------- Act 3 signals ---------- */}
        <Signal p={p} at={0.36} label="New enquiry" time="10:14 AM" x={26} y={58} live />
        <Signal p={p} at={0.4} label="Follow-up sent" time="10:41 AM" x={92} y={38} align="right" />
        <Signal p={p} at={0.44} label="Booking confirmed" time="11:02 AM" x={46} y={56} />
        <Signal p={p} at={0.48} label="Invoice paid" time="4:18 PM" x={72} y={88} />
        <Signal p={p} at={0.52} label="Review requested" time="Thu 9:00 AM" x={20} y={92} />
        <Signal p={p} at={0.56} label="Client reactivated" time="6 months later" x={62} y={17} />

        {/* ---------- central message in the negative space ---------- */}
        <motion.div
          className="absolute left-[29%] top-[54%] z-20 w-[41%]"
          style={{ opacity: msgOpacity, y: msgY }}
        >
          <motion.div className="h-px bg-zapla-ink/25" style={{ width: msgLine }} />
          <div className="mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] text-zapla-ink">
            While you do the work,
            <br />
            <span className="text-[#0e7490]">Zapla handles the follow-through.</span>
          </div>
        </motion.div>

        {/* ---------- Act 5 product reveal ---------- */}
        <motion.div
          className="absolute inset-x-[4%] top-[16%] z-30 h-[68%]"
          style={{ opacity: shellOpacity, scale: shellScale, y: shellY }}
        >
          <div className="h-full w-full overflow-hidden rounded-[16px] border border-zapla-line bg-white shadow-[0_50px_120px_-40px_rgba(15,23,42,0.35)]">
            <CustomerSystemView />
          </div>
        </motion.div>

        <motion.div
          className="absolute left-[4%] top-[5.5%] z-30 max-w-[62%]"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <h2 className="text-[38px] font-extrabold leading-none tracking-[-0.03em] text-zapla-ink">
            One customer. Everything connected.
          </h2>
          <p className="mt-2.5 max-w-[560px] text-[14px] leading-relaxed text-zapla-muted">
            Conversations, opportunities, bookings and next steps stay connected, so the work keeps
            moving.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile story — edge-to-edge video moments, short text interludes    */
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
    const io = new IntersectionObserver(
      ([e]) => setSeen(e.isIntersecting),
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", tall ? "h-[74vh]" : "h-[52vh]")}>
      <Frame
        media={media}
        playing={seen}
        reduced={reduced}
        radius={0}
        style={{ left: 0, top: 0, width: "100%", height: "100%" }}
      />
      {caption ? (
        <div className="absolute bottom-5 left-5 z-20 border-l border-[#06B6D4] pl-2.5">
          <div className="text-[13px] font-semibold leading-none text-white">{caption}</div>
          {time ? (
            <div className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/75">
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
      <div className="px-6 pb-8 pt-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zapla-muted">
          CRM + automation for service businesses
        </div>
        <h1 className="mt-3.5 text-[38px] font-extrabold leading-[0.98] tracking-[-0.03em] text-zapla-ink">
          You lead. Zapla follows through.
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zapla-muted">
          Bring your enquiries, conversations and next steps into one place. Zapla keeps the work
          moving from first contact to booked, paid and returning.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zapla-ink text-[15px] font-semibold text-white"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </a>
          <span className="inline-flex h-12 items-center justify-center rounded-full border border-zapla-line2 text-[15px] font-semibold text-zapla-ink">
            See how it works
          </span>
        </div>
        <div className="mt-4 text-[12px] font-medium text-zapla-muted2">
          Unlimited users included
        </div>
      </div>

      <MobileMoment media={V.mechanic} reduced={reduced} caption="New enquiry" time="10:14 AM" tall />

      <div className="px-6 py-10">
        <div className="h-px w-14 bg-zapla-ink/25" />
        <div className="mt-4 text-[27px] font-extrabold leading-[1.06] tracking-[-0.03em] text-zapla-ink">
          While you do the work,
          <br />
          <span className="text-[#0e7490]">Zapla handles the follow-through.</span>
        </div>
      </div>

      <MobileMoment media={V.painter} reduced={reduced} caption="Follow-up sent" time="10:41 AM" />
      <MobileMoment media={V.broker} reduced={reduced} caption="Booking confirmed" time="11:02 AM" tall />
      <MobileMoment media={V.agent} reduced={reduced} caption="Invoice paid" time="4:18 PM" />
      <MobileMoment media={V.dentist} reduced={reduced} caption="Review requested" time="Thu 9:00 AM" />

      <div className="px-6 pb-6 pt-10">
        <h2 className="text-[30px] font-extrabold leading-[1.03] tracking-[-0.03em] text-zapla-ink">
          One customer. Everything connected.
        </h2>
        <p className="mt-3 text-[14.5px] leading-relaxed text-zapla-muted">
          Conversations, opportunities, bookings and next steps stay connected, so the work keeps
          moving.
        </p>
      </div>
      <div className="px-4 pb-16">
        <div className="h-[520px] overflow-hidden rounded-[16px] border border-zapla-line bg-white shadow-[0_30px_70px_-30px_rgba(15,23,42,0.3)]">
          <CustomerSystemView />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function HumanWorkFollowThrough() {
  const reduced = !!useReducedMotion();
  return (
    <div className="bg-[#F7F8FC] text-zapla-ink">
      <DesktopSequence reduced={reduced} />
      <MobileSequence reduced={reduced} />
    </div>
  );
}
