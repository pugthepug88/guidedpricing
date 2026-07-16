import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MessageSquare, Phone, Calendar, Star, CheckCircle2, Target, Zap } from "lucide-react";
import hero from "@/assets/connected-hero.png";

export const Route = createFileRoute("/connected-lab")({
  component: ConnectedLab,
  head: () => ({
    meta: [
      { title: "Every customer moment. One connected system. — Zapla" },
      {
        name: "description",
        content:
          "Calls, messages, bookings, payments, follow-ups and reviews moving together automatically.",
      },
    ],
  }),
});

/* ============================================================
   Scroll-scrubbed hero — 4 stages
   01 Fade in     → character as faint lines, empty card slots
   02 First moments → 2 cards populate, character partially resolves
   03 Build       → more cards populate, character mostly colored
   04 Settle      → all cards + review, character fully in color
============================================================ */

function ConnectedLab() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Character progression: faded gray outline → fully in color
  const charOpacity = useTransform(scrollYProgress, [0, 0.15, 0.9], [0.12, 0.35, 1]);
  const charGrayscale = useTransform(scrollYProgress, [0.15, 0.85], [1, 0]);
  const charBlur = useTransform(scrollYProgress, [0, 0.15], [2, 0]);
  const charFilter = useTransform(
    [charGrayscale, charBlur] as unknown as MotionValue<number>[],
    ([g, b]: number[]) => `grayscale(${g}) blur(${b}px)`
  );

  return (
    <main className="bg-white text-neutral-900">
      {/* Sticky scrub scene — 4 stages, ~250vh each */}
      <section ref={ref} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-[radial-gradient(ellipse_at_70%_45%,#f4f6fc_0%,#ffffff_60%)]">
          {/* Subtle dotted grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#dfe4f2 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse at 70% 50%, black 30%, transparent 75%)",
            }}
          />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:gap-4">
            {/* LEFT: Headline */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Connected system
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
                Every customer
                <br />
                moment.
                <br />
                One <span className="text-blue-600">connected</span> system.
              </h1>
              <p className="mt-6 max-w-md text-neutral-500 md:text-lg">
                Calls, messages, bookings, payments, follow-ups and reviews moving
                together automatically.
              </p>

              {/* Stage indicator */}
              <StageIndicator progress={scrollYProgress} />
            </div>

            {/* RIGHT: Orbit scene */}
            <div className="relative mx-auto h-[560px] w-full max-w-[620px] lg:h-[640px]">
              {/* Dotted orbit ring */}
              <motion.svg
                viewBox="0 0 600 600"
                className="absolute inset-0 h-full w-full"
                style={{
                  opacity: useTransform(scrollYProgress, [0.1, 0.35], [0.15, 0.55]),
                }}
              >
                <circle
                  cx="300"
                  cy="300"
                  r="260"
                  fill="none"
                  stroke="#a5b4d4"
                  strokeWidth="1.2"
                  strokeDasharray="2 8"
                />
              </motion.svg>

              {/* Character */}
              <motion.img
                src={hero}
                alt=""
                draggable={false}
                width={1024}
                height={1280}
                style={{
                  opacity: charOpacity,
                  filter: charFilter,
                }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              />

              {/* Cards positioned around the orbit */}
              {/* Top-left: Conversations (stage 2) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.20} pos="left-[2%] top-[6%]">
                <ConversationsCard />
              </OrbitCard>

              {/* Top-right: New Lead (stage 2) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.26} pos="right-[2%] top-[14%]">
                <NewLeadCard />
              </OrbitCard>

              {/* Right-mid: Booking Confirmed (stage 3) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.42} pos="right-[-2%] top-[42%]">
                <BookingCard />
              </OrbitCard>

              {/* Bottom-right: Workflow Triggered (stage 3) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.50} pos="right-[6%] bottom-[10%]">
                <WorkflowCard />
              </OrbitCard>

              {/* Bottom: Opportunity Updated (stage 3) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.56} pos="left-[28%] bottom-[-2%]">
                <OpportunityCard />
              </OrbitCard>

              {/* Bottom-left: Invoice Paid (stage 3) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.62} pos="left-[-2%] bottom-[14%]">
                <InvoiceCard />
              </OrbitCard>

              {/* Center-left: Review Request (stage 4) */}
              <OrbitCard progress={scrollYProgress} appearAt={0.76} pos="left-[10%] top-[46%]">
                <ReviewCard />
              </OrbitCard>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Orbit card wrapper ---------- */
function OrbitCard({
  progress,
  appearAt,
  pos,
  children,
}: {
  progress: MotionValue<number>;
  appearAt: number;
  pos: string;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, [appearAt, appearAt + 0.05], [0, 1]);
  const y = useTransform(progress, [appearAt, appearAt + 0.08], [14, 0]);
  const scale = useTransform(progress, [appearAt, appearAt + 0.08], [0.92, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute z-20 ${pos}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stage indicator (01 → 04) ---------- */
function StageIndicator({ progress }: { progress: MotionValue<number> }) {
  const stages = [
    { n: "01", label: "Fade in" },
    { n: "02", label: "First moments" },
    { n: "03", label: "Build" },
    { n: "04", label: "Settle" },
  ];
  return (
    <div className="mt-10 flex gap-6">
      {stages.map((s, i) => {
        const start = i * 0.22;
        const end = start + 0.12;
        const active = useTransform(progress, [start, end], [0.35, 1]);
        return (
          <motion.div key={s.n} style={{ opacity: active }} className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {s.n}
            </span>
            <span className="text-[12px] font-semibold text-neutral-700">{s.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- Card shell ---------- */
function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl bg-white ring-1 ring-neutral-200/80 shadow-[0_20px_40px_-16px_rgba(15,23,42,0.18),0_6px_14px_-6px_rgba(15,23,42,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Cards ---------- */
function ConversationsCard() {
  return (
    <Shell className="w-[230px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
          <MessageSquare className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
            Conversations
          </div>
          <div className="text-[10px] text-neutral-500 leading-tight">3 new replies waiting</div>
        </div>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {["#25D366", "#EA4335", "#0084FF", "#E4405F"].map((c, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-md"
            style={{ background: c, opacity: 0.9 }}
            aria-hidden
          />
        ))}
      </div>
    </Shell>
  );
}

function NewLeadCard() {
  return (
    <Shell className="w-[210px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Phone className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">New Lead</div>
          <div className="text-[10px] text-neutral-500 leading-tight">Missed call captured</div>
          <div className="text-[10px] text-neutral-400 leading-tight">AI receptionist</div>
        </div>
      </div>
    </Shell>
  );
}

function BookingCard() {
  return (
    <Shell className="w-[220px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500 text-white">
          <Calendar className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
            Booking Confirmed
          </div>
          <div className="text-[10px] text-neutral-500 leading-tight">
            Consultation booked
          </div>
          <div className="text-[10px] text-neutral-400 leading-tight">for 2:00 PM</div>
        </div>
      </div>
    </Shell>
  );
}

function WorkflowCard() {
  return (
    <Shell className="w-[220px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
          <Zap className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
            Workflow Triggered
          </div>
          <div className="text-[10px] text-neutral-500 leading-tight">
            2-day follow-up sent
          </div>
          <div className="text-[10px] text-neutral-400 leading-tight">automatically</div>
        </div>
      </div>
    </Shell>
  );
}

function OpportunityCard() {
  return (
    <Shell className="w-[230px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white">
          <Target className="h-3.5 w-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
            Opportunity Updated
          </div>
          <div className="text-[10px] text-neutral-500 leading-tight">Quote sent</div>
          <div className="text-[10px] text-neutral-400 leading-tight">
            Stage moved to Proposal
          </div>
        </div>
      </div>
    </Shell>
  );
}

function InvoiceCard() {
  return (
    <Shell className="w-[200px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
            Invoice Paid
          </div>
          <div className="text-[10px] font-semibold text-emerald-600 leading-tight">
            $1,250 received
          </div>
        </div>
      </div>
    </Shell>
  );
}

function ReviewCard() {
  return (
    <Shell className="w-[210px] p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-white">
          <Star className="h-3.5 w-3.5 fill-white" />
        </div>
        <div>
          <div className="text-[12px] font-semibold text-neutral-900 leading-tight">
            Review Request
          </div>
          <div className="text-[10px] text-neutral-500 leading-tight">
            Sent after job completed
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
    </Shell>
  );
}
