import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "motion/react";
import char01 from "@/assets/char-01.png.asset.json";
import char20 from "@/assets/char-20.png.asset.json";
import {
  MessageSquare,
  Phone,
  Calendar,
  Star,
  CheckCircle2,
  Zap,
  Target,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/connected-lab")({
  component: ConnectedLab,
  head: () => ({
    meta: [
      { title: "Connected Lab — Zapla" },
      { name: "description", content: "Brainstorm animations for the connected system section." },
    ],
  }),
});

/* ---------- Shared card data ---------- */
type Card = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
  tone: "blue" | "green" | "amber" | "violet" | "sky" | "rose";
};

const CARDS: Card[] = [
  { icon: MessageSquare, title: "Conversations", sub: "3 new replies waiting", tone: "blue" },
  { icon: Phone, title: "New Lead", sub: "Missed call captured", tone: "green" },
  { icon: Calendar, title: "Booking Confirmed", sub: "Consultation 2:00 PM", tone: "sky" },
  { icon: Star, title: "Review Request", sub: "Sent after job completed", tone: "amber" },
  { icon: CheckCircle2, title: "Invoice Paid", sub: "$1,250 received", tone: "green" },
  { icon: Zap, title: "Workflow Triggered", sub: "2-day follow-up sent", tone: "violet" },
  { icon: Target, title: "Opportunity Updated", sub: "Moved to Proposal", tone: "blue" },
  { icon: FileText, title: "Quote Sent", sub: "Awaiting signature", tone: "rose" },
];

const toneMap: Record<Card["tone"], { bg: string; fg: string; ring: string }> = {
  blue: { bg: "bg-blue-50", fg: "text-blue-600", ring: "ring-blue-100" },
  green: { bg: "bg-emerald-50", fg: "text-emerald-600", ring: "ring-emerald-100" },
  amber: { bg: "bg-amber-50", fg: "text-amber-600", ring: "ring-amber-100" },
  violet: { bg: "bg-violet-50", fg: "text-violet-600", ring: "ring-violet-100" },
  sky: { bg: "bg-sky-50", fg: "text-sky-600", ring: "ring-sky-100" },
  rose: { bg: "bg-rose-50", fg: "text-rose-600", ring: "ring-rose-100" },
};

function MiniCard({ card, className = "" }: { card: Card; className?: string }) {
  const t = toneMap[card.tone];
  const Icon = card.icon;
  return (
    <div
      className={`inline-flex items-start gap-2.5 rounded-xl bg-white px-3.5 py-2.5 shadow-[0_10px_30px_-12px_rgba(10,10,20,0.18)] ring-1 ring-neutral-100 ${className}`}
    >
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${t.bg} ring-1 ${t.ring}`}>
        <Icon className={`h-4 w-4 ${t.fg}`} />
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-neutral-900 leading-tight">{card.title}</div>
        <div className="text-[11px] text-neutral-500 leading-tight mt-0.5">{card.sub}</div>
      </div>
    </div>
  );
}

/* ---------- Shared headline ---------- */
function Headline({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-md">
      <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        {eyebrow}
      </div>
      <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.05]">
        {title.split("connected").map((part, i, arr) =>
          i < arr.length - 1 ? (
            <span key={i}>
              {part}
              <span className="text-blue-600">connected</span>
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </h2>
      <p className="mt-5 text-neutral-600 text-base leading-relaxed">
        Calls, messages, bookings, payments, follow-ups and reviews moving together automatically.
      </p>
    </div>
  );
}

/* ---------- Section shell ---------- */
function LabSection({
  num,
  name,
  note,
  children,
}: {
  num: string;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white ring-1 ring-neutral-200/70 shadow-[0_20px_60px_-30px_rgba(10,10,20,0.15)] overflow-hidden">
      <header className="flex items-start justify-between gap-6 px-6 md:px-10 pt-6 md:pt-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-blue-600 px-2 text-xs font-bold text-white">
            {num}
          </span>
          <div>
            <div className="text-sm font-semibold text-neutral-900">{name}</div>
            <div className="text-xs text-neutral-500 mt-0.5">{note}</div>
          </div>
        </div>
      </header>
      <div className="px-6 md:px-10 pb-10 pt-4">{children}</div>
    </section>
  );
}

/* ============================================================
   V1 — Scroll stages (Fade → First moments → Build → Settle)
   Replicates the 4-frame plan literally as scroll progresses.
============================================================ */
function V1ScrollStages() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const stage = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85], [0, 1, 2, 3]);
  const [s, setS] = useState(0);
  useEffect(() => stage.on("change", (v) => setS(Math.round(v))), [stage]);

  const charOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.55], [0, 0.25, 0.7, 1]);
  const charSaturation = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const charFilter = useTransform(charSaturation, (v) => `saturate(${v})`);

  const cardOrder = [0, 1, 2, 3, 4, 5, 6];
  const positions = [
    { x: -260, y: -140 },
    { x: 240, y: -180 },
    { x: 320, y: 20 },
    { x: -320, y: 40 },
    { x: -220, y: 180 },
    { x: 140, y: 220 },
    { x: 260, y: 160 },
  ];

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-10 items-center min-h-[560px]">
      <Headline eyebrow={`Stage ${s + 1} of 4`} title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        {/* Character */}
        <motion.img
          src={char01.url}
          alt=""
          style={{ opacity: charOpacity, filter: charFilter }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-auto"
        />
        {/* Cards */}
        {cardOrder.map((idx, i) => {
          const appearAt = 0.25 + i * 0.08;
          return <StageCard key={idx} card={CARDS[idx]} pos={positions[i]} progress={scrollYProgress} appearAt={appearAt} />;
        })}
        {/* Connector arcs */}
        <ConnectorArcs progress={scrollYProgress} />
      </div>
    </div>
  );
}

function StageCard({
  card,
  pos,
  progress,
  appearAt,
}: {
  card: Card;
  pos: { x: number; y: number };
  progress: any;
  appearAt: number;
}) {
  const opacity = useTransform(progress, [appearAt - 0.05, appearAt + 0.05], [0, 1]);
  const y = useTransform(progress, [appearAt - 0.05, appearAt + 0.05], [pos.y + 20, pos.y]);
  return (
    <motion.div
      style={{ opacity, x: pos.x, y }}
      className="absolute left-1/2 top-1/2"
    >
      <MiniCard card={card} />
    </motion.div>
  );
}

function ConnectorArcs({ progress }: { progress: any }) {
  const draw = useTransform(progress, [0.3, 0.75], [0, 1]);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-400 -260 800 520">
      <motion.path
        d="M -260 -140 Q -100 -240 240 -180"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        style={{ pathLength: draw }}
      />
      <motion.path
        d="M 240 -180 Q 400 -80 320 20"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        style={{ pathLength: draw }}
      />
      <motion.path
        d="M 320 20 Q 240 180 140 220"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        style={{ pathLength: draw }}
      />
    </svg>
  );
}

/* ============================================================
   V2 — Continuous orbit
============================================================ */
function V2Orbit() {
  const items = CARDS.slice(0, 6);
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow="Continuous orbit" title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        <img
          src={char01.url}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-auto z-10"
        />
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {items.map((c, i) => {
            const angle = (i / items.length) * Math.PI * 2;
            const r = 210;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{ x, y }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <MiniCard card={c} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   V3 — Magnetic drift (mouse parallax)
============================================================ */
function V3Magnetic() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const positions = [
    { x: -280, y: -160, depth: 1.4 },
    { x: 260, y: -180, depth: 1.2 },
    { x: 320, y: 40, depth: 1.8 },
    { x: -310, y: 60, depth: 1.6 },
    { x: -180, y: 200, depth: 1.0 },
    { x: 220, y: 200, depth: 1.3 },
  ];

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 40);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 40);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="grid md:grid-cols-2 gap-10 items-center"
    >
      <Headline eyebrow="Magnetic drift" title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        <motion.img
          src={char01.url}
          alt=""
          style={{ x: useTransform(sx, (v) => v * 0.3), y: useTransform(sy, (v) => v * 0.3) }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-auto z-10"
        />
        {positions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              x: useTransform(sx, (v) => p.x + v * p.depth),
              y: useTransform(sy, (v) => p.y + v * p.depth),
            }}
            animate={{ y: [p.y, p.y - 8, p.y] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <MiniCard card={CARDS[i]} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   V4 — Radial burst on view
============================================================ */
function V4Burst() {
  const positions = [
    { x: -280, y: -140 },
    { x: 260, y: -170 },
    { x: 330, y: 30 },
    { x: -320, y: 50 },
    { x: -190, y: 210 },
    { x: 200, y: 220 },
    { x: 60, y: -230 },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow="Radial burst" title="Every customer moment. One connected system." />
      <motion.div
        className="relative h-[480px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
      >
        <img
          src={char01.url}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-auto z-10"
        />
        {positions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            variants={{
              hidden: { x: 0, y: 0, opacity: 0, scale: 0.4 },
              show: { x: p.x, y: p.y, opacity: 1, scale: 1 },
            }}
            transition={{ type: "spring", stiffness: 90, damping: 14, delay: i * 0.08 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <MiniCard card={CARDS[i]} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   V5 — Arc timeline (cards travel along a curve)
============================================================ */
function V5Arc() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const items = CARDS.slice(0, 6);

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow="Arc timeline" title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="-400 -240 800 480">
          <motion.path
            d="M -350 100 Q -200 -280 0 -220 Q 200 -160 350 100"
            fill="none"
            stroke="#dbeafe"
            strokeWidth="2"
            strokeDasharray="6 8"
            style={{ pathLength: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]) }}
          />
        </svg>
        <img
          src={char01.url}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-auto z-10"
        />
        {items.map((c, i) => {
          const t = i / (items.length - 1);
          const start = 0.2 + i * 0.08;
          const opacity = useTransform(scrollYProgress, [start - 0.05, start + 0.05], [0, 1]);
          // Point on quadratic arc from (-350,100)→(0,-220)→(350,100)
          const x = -350 + t * 700;
          const y = 100 + (t < 0.5 ? -640 * t : -640 * (1 - t));
          return (
            <motion.div key={i} className="absolute left-1/2 top-1/2" style={{ x, y, opacity }}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <MiniCard card={c} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   V6 — Pulse + connection lines (heartbeat)
============================================================ */
function V6Pulse() {
  const positions = [
    { x: -270, y: -140 },
    { x: 250, y: -160 },
    { x: 320, y: 40 },
    { x: -300, y: 60 },
    { x: -170, y: 210 },
    { x: 210, y: 210 },
  ];
  const [beat, setBeat] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setBeat((b) => (b + 1) % positions.length), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow="Pulse + connect" title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-400 -240 800 480">
          {positions.map((p, i) => (
            <line
              key={i}
              x1={0}
              y1={0}
              x2={p.x}
              y2={p.y}
              stroke={i === beat ? "#3b82f6" : "#e5e7eb"}
              strokeWidth={i === beat ? 2 : 1}
              strokeDasharray="3 6"
              style={{ transition: "stroke 300ms" }}
            />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          >
            <img src={char01.url} alt="" className="h-[340px] w-auto" />
          </motion.div>
        </div>
        {positions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ x: p.x, y: p.y }}
            animate={{ scale: i === beat ? 1.06 : 1, y: [p.y, p.y - 6, p.y] }}
            transition={{ scale: { duration: 0.3 }, y: { duration: 3 + i * 0.2, repeat: Infinity } }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <MiniCard card={CARDS[i]} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   V7 — Sketch → photo character reveal (mirrors the plan)
============================================================ */
function V7Reveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const grayscale = useTransform(scrollYProgress, [0.15, 0.55], [1, 0]);
  const contrast = useTransform(scrollYProgress, [0.15, 0.55], [0.4, 1]);
  const filter = useTransform([grayscale, contrast], ([g, c]: any) => `grayscale(${g}) contrast(${c}) brightness(${1 + (1 - g) * 0.05})`);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);

  const positions = [
    { x: -270, y: -140 },
    { x: 260, y: -160 },
    { x: 320, y: 30 },
    { x: -310, y: 50 },
    { x: -180, y: 200 },
    { x: 210, y: 210 },
  ];

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow="Sketch to settle" title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        <motion.img
          src={char01.url}
          alt=""
          style={{ filter, opacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-auto z-10"
        />
        {positions.map((p, i) => {
          const start = 0.25 + i * 0.08;
          const o = useTransform(scrollYProgress, [start - 0.05, start + 0.05], [0, 1]);
          const y = useTransform(scrollYProgress, [start - 0.05, start + 0.05], [p.y + 30, p.y]);
          return (
            <motion.div key={i} className="absolute left-1/2 top-1/2" style={{ x: p.x, y, opacity: o }}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <MiniCard card={CARDS[i]} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   V8 — Deck stack (cards fly in from off-screen and stack around)
============================================================ */
function V8Deck() {
  const positions = [
    { x: -260, y: -150, from: { x: -600, y: -400, r: -30 } },
    { x: 260, y: -170, from: { x: 600, y: -400, r: 30 } },
    { x: 320, y: 30, from: { x: 700, y: 0, r: 20 } },
    { x: -310, y: 50, from: { x: -700, y: 0, r: -20 } },
    { x: -180, y: 210, from: { x: -500, y: 500, r: -15 } },
    { x: 210, y: 210, from: { x: 500, y: 500, r: 15 } },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow="Deck assemble" title="Every customer moment. One connected system." />
      <motion.div
        className="relative h-[480px]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.4 }}
      >
        <img
          src={char01.url}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-auto z-10"
        />
        {positions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            variants={{
              hidden: { x: p.from.x, y: p.from.y, rotate: p.from.r, opacity: 0 },
              show: { x: p.x, y: p.y, rotate: 0, opacity: 1 },
            }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: i * 0.12 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <MiniCard card={CARDS[i]} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   V9 — Sequential type/reveal with hero character 20
============================================================ */
function V9Sequential() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 7), 1200);
    return () => clearInterval(id);
  }, []);
  const positions = [
    { x: -270, y: -140 },
    { x: 260, y: -160 },
    { x: 320, y: 40 },
    { x: -300, y: 60 },
    { x: -170, y: 210 },
    { x: 210, y: 210 },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <Headline eyebrow={`Ticker · card ${(step % 6) + 1}`} title="Every customer moment. One connected system." />
      <div className="relative h-[480px]">
        <img
          src={char20.url}
          alt=""
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-auto z-10"
        />
        {positions.map((p, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ x: p.x, y: p.y }}
            animate={{
              scale: step % 6 === i ? 1.08 : 1,
              boxShadow: step % 6 === i ? "0 20px 50px -15px rgba(37,99,235,0.4)" : "0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <MiniCard card={CARDS[i]} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Page
============================================================ */
function ConnectedLab() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">Connected Lab</div>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Animation brainstorm
          </h1>
          <p className="mt-4 text-neutral-600 max-w-2xl">
            Nine directions for the "Every customer moment. One connected system." section. Same headline, same
            character, same cards — different motion language. Scroll through to compare feel.
          </p>
        </div>

        <div className="space-y-10">
          <LabSection num="01" name="Scroll stages" note="4-frame plan literalised: fade → first moments → build → settle.">
            <V1ScrollStages />
          </LabSection>
          <LabSection num="02" name="Continuous orbit" note="Cards rotate slowly around the character. Ambient, never-static.">
            <V2Orbit />
          </LabSection>
          <LabSection num="03" name="Magnetic drift" note="Mouse parallax. Cards float and lean toward the cursor.">
            <V3Magnetic />
          </LabSection>
          <LabSection num="04" name="Radial burst" note="On view: cards spring out from the character with staggered delays.">
            <V4Burst />
          </LabSection>
          <LabSection num="05" name="Arc timeline" note="Cards land along a drawn arc as you scroll — reads as a customer journey.">
            <V5Arc />
          </LabSection>
          <LabSection num="06" name="Pulse + connect" note="Heartbeat between the character and each card, one at a time.">
            <V6Pulse />
          </LabSection>
          <LabSection num="07" name="Sketch to settle" note="Character starts desaturated and low contrast, saturates as cards land.">
            <V7Reveal />
          </LabSection>
          <LabSection num="08" name="Deck assemble" note="Cards fly in from off-screen edges and settle into place around the character.">
            <V8Deck />
          </LabSection>
          <LabSection num="09" name="Auto ticker" note="Cards highlight one at a time on a loop — good for a hero that never needs scroll.">
            <V9Sequential />
          </LabSection>
        </div>
      </div>
    </div>
  );
}
