import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import char01 from "@/assets/char-01.png.asset.json";
import { Star, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/connected-lab")({
  component: ConnectedLab,
  head: () => ({
    meta: [
      { title: "Connected — Zapla" },
      { name: "description", content: "One connected system. Every customer moment." },
    ],
  }),
});

/* ============================================================
   Scroll-scrubbed hero.
   - Character (line art) fades in from ~0 to full opacity as
     the user scrolls, and gently rises from a slight offset.
   - Seven bespoke UI moments animate in one by one around it,
     each with its own spring position, easing arc, and visual
     personality — not label chips, actual little product moments.
============================================================ */

function ConnectedLab() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Character: faded lines at first, resolves in as scroll advances
  const charOpacity = useTransform(scrollYProgress, [0.05, 0.55], [0.08, 1]);
  const charY = useTransform(scrollYProgress, [0, 0.6], [40, 0]);
  const charScale = useTransform(scrollYProgress, [0, 0.6], [0.96, 1]);

  // Headline appears once the scene starts settling
  const titleOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.65, 0.85], [20, 0]);

  return (
    <main className="bg-[#f6f7fb]">
      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 pt-28 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          Connected system
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.05]">
          Scroll to see it come together.
        </h1>
        <p className="mt-5 text-neutral-500 text-lg">
          Calls, replies, bookings, reviews, payments. Moving as one.
        </p>
      </section>

      {/* Sticky scrub scene */}
      <section ref={ref} className="relative h-[380vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Ambient background wash */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#ffffff_0%,#f2f4fb_55%,#e6e9f5_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(#e6e9f5 1px, transparent 1px), linear-gradient(90deg, #e6e9f5 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
          />

          {/* Soft aura behind character */}
          <motion.div
            style={{ opacity: charOpacity }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,#c7d2fe_0%,transparent_65%)] blur-2xl"
          />

          {/* Character */}
          <motion.img
            src={char01.url}
            alt=""
            style={{ opacity: charOpacity, y: charY, scale: charScale }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[68vh] max-h-[640px] w-auto select-none pointer-events-none z-10"
            draggable={false}
          />

          {/* Cards */}
          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.10}
            pos={{ x: "-32vw", y: "-30vh" }}
            drift={{ x: 6, y: -4 }}
          >
            <ConversationCard />
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.16}
            pos={{ x: "30vw", y: "-32vh" }}
            drift={{ x: -8, y: 6 }}
          >
            <ReviewCard />
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.22}
            pos={{ x: "-36vw", y: "-4vh" }}
            drift={{ x: 4, y: 8 }}
          >
            <AiReplyCard />
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.28}
            pos={{ x: "34vw", y: "-2vh" }}
            drift={{ x: -6, y: -6 }}
          >
            <BookingCard />
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.34}
            pos={{ x: "-30vw", y: "24vh" }}
            drift={{ x: 8, y: -4 }}
          >
            <PaymentCard />
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.40}
            pos={{ x: "30vw", y: "26vh" }}
            drift={{ x: -6, y: 6 }}
          >
            <LeadScoreCard />
          </FloatingCard>

          <FloatingCard
            progress={scrollYProgress}
            appearAt={0.46}
            pos={{ x: "0vw", y: "36vh" }}
            drift={{ x: 0, y: -6 }}
          >
            <PipelineCard />
          </FloatingCard>

          {/* Payoff */}
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="absolute inset-x-0 bottom-16 text-center px-6 z-20"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.05]">
              One system. <span className="text-blue-600">Everything runs.</span>
            </h2>
            <p className="mt-4 text-neutral-500 text-base md:text-lg">
              Every customer moment, connected without the copy-paste.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-24" />
    </main>
  );
}

/* ---------- Floating card wrapper (scroll driven) ---------- */
function FloatingCard({
  progress,
  appearAt,
  pos,
  drift,
  children,
}: {
  progress: MotionValue<number>;
  appearAt: number;
  pos: { x: string; y: string };
  drift: { x: number; y: number };
  children: React.ReactNode;
}) {
  // Card easing: start below its resting position, fade & rise into place.
  const opacity = useTransform(progress, [appearAt, appearAt + 0.06], [0, 1]);
  const yOffset = useTransform(progress, [appearAt, appearAt + 0.08], [24, 0]);
  const scale = useTransform(progress, [appearAt, appearAt + 0.08], [0.94, 1]);

  return (
    <motion.div
      style={{
        opacity,
        left: `calc(50% + ${pos.x})`,
        top: `calc(50% + ${pos.y})`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
    >
      <motion.div
        style={{ y: yOffset, scale }}
        animate={{ x: [0, drift.x, 0], y: [0, drift.y, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Card shell ---------- */
function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white ring-1 ring-neutral-200/70 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25),0_10px_25px_-10px_rgba(15,23,42,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- 1. Conversation ---------- */
function ConversationCard() {
  return (
    <Shell className="w-[240px] p-3.5">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
          JD
        </div>
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight truncate">
            Jamie D.
          </div>
          <div className="text-[10px] text-emerald-600 leading-tight">online</div>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-neutral-100 px-2.5 py-1.5 text-[11px] text-neutral-800">
          Hey, still open Saturday?
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-blue-600 px-2.5 py-1.5 text-[11px] text-white"
        >
          Booked you for 2pm.
        </motion.div>
      </div>
    </Shell>
  );
}

/* ---------- 2. Review ---------- */
function ReviewCard() {
  return (
    <Shell className="w-[230px] p-3.5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          New Review
        </div>
        <div className="text-[9px] font-semibold text-neutral-400">Google</div>
      </div>
      <div className="mt-2 flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 400 }}
          >
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </motion.div>
        ))}
      </div>
      <div className="mt-2 text-[11px] text-neutral-700 leading-snug">
        "Fastest response I've had. Booked within minutes."
      </div>
      <div className="mt-2 text-[10px] text-neutral-400">— Sarah K.</div>
    </Shell>
  );
}

/* ---------- 3. AI Reply ---------- */
function AiReplyCard() {
  return (
    <Shell className="w-[240px] p-3.5">
      <div className="flex items-center gap-1.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 text-white">
          <Sparkles className="h-3 w-3" />
        </div>
        <div className="text-[11px] font-semibold text-neutral-900">
          Zapla replied
        </div>
        <div className="ml-auto text-[10px] font-medium text-neutral-400">12s</div>
      </div>
      <div className="mt-2.5 rounded-lg bg-neutral-50 p-2.5 text-[11px] leading-snug text-neutral-700 ring-1 ring-neutral-100">
        "Yes we have 2pm and 4pm free Saturday. Want me to hold one for you?"
      </div>
    </Shell>
  );
}

/* ---------- 4. Booking ---------- */
function BookingCard() {
  return (
    <Shell className="w-[220px] p-3.5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          Saturday
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3 w-3" strokeWidth={3} />
        </div>
      </div>
      <div className="mt-1 text-[22px] font-semibold tracking-tight text-neutral-900">
        Nov 22
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {["10:00", "12:00", "2:00", "4:00", "5:30", "7:00"].map((t, i) => (
          <div
            key={t}
            className={`rounded-md px-1.5 py-1 text-center text-[10px] font-medium ${
              i === 2
                ? "bg-blue-600 text-white"
                : "bg-neutral-100 text-neutral-500"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
    </Shell>
  );
}

/* ---------- 5. Payment ---------- */
function PaymentCard() {
  return (
    <Shell className="w-[220px] p-3.5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
          Paid
        </div>
        <div className="text-[9px] font-medium text-emerald-600">Just now</div>
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[28px] font-semibold tracking-tight text-neutral-900">
          $1,250
        </span>
        <span className="text-[11px] font-medium text-neutral-400">.00</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
      </div>
      <div className="mt-2 text-[11px] text-neutral-500">Invoice #10428</div>
    </Shell>
  );
}

/* ---------- 6. Lead score ---------- */
function LeadScoreCard() {
  const size = 56;
  const r = 24;
  const c = 2 * Math.PI * r;
  const pct = 0.92;
  return (
    <Shell className="w-[220px] p-3.5">
      <div className="flex items-center gap-3">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="#f1f5f9"
              strokeWidth="5"
              fill="none"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#hot)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: `${c * pct} ${c}` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="hot" x1="0" x2="1">
                <stop offset="0" stopColor="#f97316" />
                <stop offset="1" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-neutral-900">
            92
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
            Hot lead
          </div>
          <div className="mt-0.5 text-[12px] font-semibold text-neutral-900">
            Alex Chen
          </div>
          <div className="text-[10px] text-neutral-500">Ready to book</div>
        </div>
      </div>
    </Shell>
  );
}

/* ---------- 7. Pipeline ---------- */
function PipelineCard() {
  const rows = [
    { label: "New", count: 12, tone: "bg-blue-500" },
    { label: "Contacted", count: 8, tone: "bg-violet-500" },
    { label: "Booked", count: 5, tone: "bg-emerald-500" },
  ];
  return (
    <Shell className="w-[260px] p-3.5">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-semibold text-neutral-900">
          This week
        </div>
        <div className="text-[10px] font-medium text-emerald-600">+34%</div>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${r.tone}`}
              aria-hidden="true"
            />
            <span className="text-[11px] text-neutral-600 flex-1">{r.label}</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-neutral-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(r.count / 12) * 100}%` }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                className={`h-full rounded-full ${r.tone}`}
              />
            </div>
            <span className="w-6 text-right text-[11px] font-semibold text-neutral-900">
              {r.count}
            </span>
          </div>
        ))}
      </div>
    </Shell>
  );
}
