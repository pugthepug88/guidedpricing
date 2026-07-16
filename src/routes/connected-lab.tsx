import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Phone, Calendar, Star, CheckCircle2, Target, Zap, MessageCircle } from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";

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

/* Story sequence (matches reference):
   1. Conversations   (top-left)
   2. New Lead        (top-right)
   3. Booking         (right-mid)
   4. Workflow        (bottom-right)
   5. Opportunity     (bottom-center)
   6. Invoice Paid    (bottom-left)
   7. Review Request  (left-mid, final settle)
*/

function ConnectedLab() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Sketch fades out as color fades in
  const sketchOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);
  const colorOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  // Orbit ring fade
  const orbitOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 0.6]);

  return (
    <main className="bg-white text-neutral-900">
      <section ref={ref} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#f6f8fc_0%,#ffffff_65%)]">
          {/* Dotted grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: "radial-gradient(#dfe4f2 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          <div className="relative mx-auto h-full w-full max-w-7xl px-6">
            {/* Centered stage — no container box */}
            <div className="relative mx-auto flex h-full items-center justify-center">
              <div className="relative h-[92vh] w-full">
                {/* Dotted orbit ring */}
                <motion.svg
                  viewBox="0 0 600 600"
                  preserveAspectRatio="xMidYMid meet"
                  className="absolute left-1/2 top-1/2 h-[88vh] w-[88vh] -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: orbitOpacity }}
                >
                  <circle
                    cx="300"
                    cy="300"
                    r="270"
                    fill="none"
                    stroke="#a5b4d4"
                    strokeWidth="1.2"
                    strokeDasharray="2 8"
                  />
                </motion.svg>

                {/* Character — sketch layer */}
                <motion.img
                  src={heroSketch.url}
                  alt=""
                  draggable={false}
                  style={{ opacity: sketchOpacity }}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
                />
                {/* Character — color layer */}
                <motion.img
                  src={heroColor.url}
                  alt=""
                  draggable={false}
                  style={{ opacity: colorOpacity }}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
                />

                {/* Cards, in story order */}
                <OrbitCard progress={scrollYProgress} appearAt={0.18} pos="left-[-4%] top-[8%]">
                  <ConversationsCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.26} pos="right-[-4%] top-[14%]">
                  <NewLeadCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.38} pos="right-[-8%] top-[44%]">
                  <BookingCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.5} pos="right-[2%] bottom-[10%]">
                  <WorkflowCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.6} pos="left-[30%] bottom-[-2%]">
                  <OpportunityCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.7} pos="left-[-6%] bottom-[16%]">
                  <InvoiceCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.82} pos="left-[4%] top-[42%]">
                  <ReviewCard />
                </OrbitCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

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
  const y = useTransform(progress, [appearAt, appearAt + 0.08], [16, 0]);
  const scale = useTransform(progress, [appearAt, appearAt + 0.08], [0.9, 1]);
  return (
    <motion.div style={{ opacity, y, scale }} className={`absolute z-20 ${pos}`}>
      {children}
    </motion.div>
  );
}

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white ring-1 ring-neutral-200/80 shadow-[0_24px_48px_-18px_rgba(15,23,42,0.20),0_8px_16px_-8px_rgba(15,23,42,0.10)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Channel icons for Conversations ---------- */
function SmsIcon() {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500 text-white">
      <MessageCircle className="h-3.5 w-3.5" />
    </div>
  );
}
function GmailIcon() {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white ring-1 ring-neutral-200">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
        <path fill="#4285F4" d="M22 6.5v11a2 2 0 0 1-2 2h-2V9.2l-6 4.3-6-4.3v10.3H4a2 2 0 0 1-2-2v-11L12 13z" />
        <path fill="#EA4335" d="M2 6.5 12 13 22 6.5A2 2 0 0 0 20 4.5H4a2 2 0 0 0-2 2z" />
      </svg>
    </div>
  );
}
function MessengerIcon() {
  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: "#0084FF" }}>
      <svg viewBox="0 0 24 24" fill="white" className="h-3.5 w-3.5">
        <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7z" />
      </svg>
    </div>
  );
}
function InstagramIcon() {
  return (
    <div
      className="flex h-6 w-6 items-center justify-center rounded-md text-white"
      style={{ background: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-3.5 w-3.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" />
      </svg>
    </div>
  );
}

/* ---------- Cards ---------- */
function ConversationsCard() {
  return (
    <Shell className="w-[240px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <MessageCircle className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">Conversations</div>
          <div className="text-[11px] text-neutral-500 leading-tight">3 new replies waiting</div>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <SmsIcon />
        <GmailIcon />
        <MessengerIcon />
        <InstagramIcon />
      </div>
    </Shell>
  );
}

function NewLeadCard() {
  return (
    <Shell className="w-[220px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <Phone className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">New Lead</div>
          <div className="text-[11px] text-neutral-500 leading-tight">Missed call captured</div>
          <div className="text-[10px] text-neutral-400 leading-tight">AI receptionist</div>
        </div>
      </div>
    </Shell>
  );
}

function BookingCard() {
  return (
    <Shell className="w-[230px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white">
          <Calendar className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">Booking Confirmed</div>
          <div className="text-[11px] text-neutral-500 leading-tight">Consultation booked</div>
          <div className="text-[10px] text-neutral-400 leading-tight">for 2:00 PM</div>
        </div>
      </div>
    </Shell>
  );
}

function WorkflowCard() {
  return (
    <Shell className="w-[230px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">Workflow Triggered</div>
          <div className="text-[11px] text-neutral-500 leading-tight">2-day follow-up sent</div>
          <div className="text-[10px] text-neutral-400 leading-tight">automatically</div>
        </div>
      </div>
    </Shell>
  );
}

function OpportunityCard() {
  return (
    <Shell className="w-[240px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
          <Target className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">Opportunity Updated</div>
          <div className="text-[11px] text-neutral-500 leading-tight">Quote sent</div>
          <div className="text-[10px] text-neutral-400 leading-tight">Stage moved to Proposal</div>
        </div>
      </div>
    </Shell>
  );
}

function InvoiceCard() {
  return (
    <Shell className="w-[210px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">Invoice Paid</div>
          <div className="text-[11px] font-semibold text-emerald-600 leading-tight">$1,250 received</div>
        </div>
      </div>
    </Shell>
  );
}

function ReviewCard() {
  return (
    <Shell className="w-[220px] p-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-white">
          <Star className="h-4 w-4 fill-white" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-neutral-900 leading-tight">Review Request</div>
          <div className="text-[11px] text-neutral-500 leading-tight">Sent after job completed</div>
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
