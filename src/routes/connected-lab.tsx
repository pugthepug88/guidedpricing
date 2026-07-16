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

  // Sketch resolves into color and both stay visible — nothing fades back out
  const sketchOpacity = useTransform(scrollYProgress, [0.05, 0.35, 1], [1, 0.25, 0.25]);
  const colorOpacity = useTransform(scrollYProgress, [0.15, 0.55, 1], [0, 1, 1]);

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
              <div className="relative mx-auto h-[88vh] w-[88vh] max-w-[96vw]">
                {/* Dotted orbit ring */}
                <motion.svg
                  viewBox="0 0 600 600"
                  className="absolute inset-0 h-full w-full"
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
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
                />
                {/* Character — color layer */}
                <motion.img
                  src={heroColor.url}
                  alt=""
                  draggable={false}
                  style={{ opacity: colorOpacity }}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
                />

                {/* Cards, in story order */}
                <OrbitCard progress={scrollYProgress} appearAt={0.18} pos="left-[-10%] top-[6%]">
                  <ConversationsCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.26} pos="right-[-8%] top-[10%]">
                  <NewLeadCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.38} pos="right-[-12%] top-[44%]">
                  <BookingCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.5} pos="right-[-2%] bottom-[8%]">
                  <WorkflowCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.6} pos="left-[34%] bottom-[-4%]">
                  <OpportunityCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.7} pos="left-[-12%] bottom-[14%]">
                  <InvoiceCard />
                </OrbitCard>

                <OrbitCard progress={scrollYProgress} appearAt={0.82} pos="left-[-8%] top-[42%]">
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
  // Cards pop in with slide + scale, then hold steady — no fade out, no drift.
  const opacity = useTransform(progress, [appearAt - 0.03, appearAt], [0, 1], { clamp: true });
  const y = useTransform(progress, [appearAt, appearAt + 0.06], [24, 0], { clamp: true });
  const scale = useTransform(progress, [appearAt, appearAt + 0.06], [0.92, 1], { clamp: true });
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
function SmsIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm"
      style={{ width: size, height: size }}
    >
      <MessageCircle style={{ width: size * 0.55, height: size * 0.55 }} />
    </div>
  );
}
function GmailIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg bg-white ring-1 ring-neutral-200 shadow-sm"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" style={{ width: size * 0.55, height: size * 0.55 }}>
        <path fill="#4285F4" d="M22 6.5v11a2 2 0 0 1-2 2h-2V9.2l-6 4.3-6-4.3v10.3H4a2 2 0 0 1-2-2v-11L12 13z" />
        <path fill="#EA4335" d="M2 6.5 12 13 22 6.5A2 2 0 0 0 20 4.5H4a2 2 0 0 0-2 2z" />
      </svg>
    </div>
  );
}
function MessengerIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg shadow-sm"
      style={{ width: size, height: size, background: "#0084FF" }}
    >
      <svg viewBox="0 0 24 24" fill="white" style={{ width: size * 0.55, height: size * 0.55 }}>
        <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7z" />
      </svg>
    </div>
  );
}
function InstagramIcon({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg text-white shadow-sm"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: size * 0.55, height: size * 0.55 }}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" />
      </svg>
    </div>
  );
}

/* ---------- Cards ---------- */
function ConversationsCard() {
  const threads = [
    {
      icon: <SmsIcon size={36} />,
      name: "Sarah Mitchell",
      time: "2m",
      preview: "Can I move my 3pm to Thursday?",
      unread: true,
    },
    {
      icon: <GmailIcon size={36} />,
      name: "James — new enquiry",
      time: "8m",
      preview: "Hi, wanted to get a quote for…",
      unread: true,
    },
    {
      icon: <InstagramIcon size={36} />,
      name: "@mia.k",
      time: "1h",
      preview: "Do you take bookings via DM?",
      unread: false,
    },
    {
      icon: <MessengerIcon size={36} />,
      name: "David Chen",
      time: "3h",
      preview: "Thanks — see you tomorrow ",
      unread: false,
    },
  ];

  return (
    <Shell className="w-[320px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <MessageCircle className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Conversations</div>
            <div className="text-[11px] text-neutral-500 leading-tight">All channels, one inbox</div>
          </div>
        </div>
        <div className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">3</div>
      </div>

      <div className="mt-3.5 space-y-2.5">
        {threads.map((t, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {t.icon}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate text-[12px] font-semibold text-neutral-900">{t.name}</div>
                <div className="shrink-0 text-[10px] text-neutral-400">{t.time}</div>
              </div>
              <div className="truncate text-[11px] text-neutral-500">{t.preview}</div>
            </div>
            {t.unread && <div className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function NewLeadCard() {
  return (
    <Shell className="w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Phone className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">New Lead</div>
            <div className="text-[11px] text-neutral-500 leading-tight">AI receptionist captured a call</div>
          </div>
        </div>
        <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">LIVE</div>
      </div>

      <div className="mt-3 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-[11px] font-semibold text-white">EM</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-semibold text-neutral-900">Emma Wilson</div>
            <div className="truncate text-[11px] text-neutral-500">+61 400 812 559 · 0:42s</div>
          </div>
          <div className="text-[10px] text-neutral-400">just now</div>
        </div>
        <div className="mt-2.5 rounded-lg bg-white p-2 text-[11px] text-neutral-600 ring-1 ring-neutral-200/70">
          "Hi, calling about a quote for a bathroom reno next month..."
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px]">
        <span className="text-neutral-500">Transcribed and added to CRM</span>
        <span className="font-semibold text-emerald-600">✓ synced</span>
      </div>
    </Shell>
  );
}

function BookingCard() {
  return (
    <Shell className="w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Calendar className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Booking Confirmed</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Thursday, 14 Nov</div>
          </div>
        </div>
        <div className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">2:00 PM</div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {["M","T","W","T","F","S","S"].map((d, i) => (
          <div key={i} className="text-[9px] font-medium text-neutral-400">{d}</div>
        ))}
        {[11,12,13,14,15,16,17].map((d) => (
          <div
            key={d}
            className={`rounded-md py-1 text-[11px] font-semibold ${
              d === 14 ? "bg-blue-600 text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-neutral-50 p-2 ring-1 ring-neutral-200/70">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-[10px] font-semibold text-white">SM</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-semibold text-neutral-900">Sarah Mitchell</div>
          <div className="truncate text-[10px] text-neutral-500">Consultation · 45 min</div>
        </div>
        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      </div>
    </Shell>
  );
}

function WorkflowCard() {
  const steps = [
    { label: "Lead captured", done: true },
    { label: "Welcome SMS sent", done: true },
    { label: "Follow-up in 2 days", done: false, active: true },
    { label: "Review request", done: false },
  ];
  return (
    <Shell className="w-[290px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white">
            <Zap className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Workflow Running</div>
            <div className="text-[11px] text-neutral-500 leading-tight">New Lead → Nurture</div>
          </div>
        </div>
        <div className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700 ring-1 ring-violet-200">AUTO</div>
      </div>

      <div className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                s.done
                  ? "bg-emerald-500 text-white"
                  : s.active
                  ? "bg-violet-100 text-violet-700 ring-2 ring-violet-500"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              {s.done ? "✓" : i + 1}
            </div>
            <div
              className={`flex-1 text-[12px] ${
                s.done ? "text-neutral-500 line-through" : s.active ? "font-semibold text-neutral-900" : "text-neutral-500"
              }`}
            >
              {s.label}
            </div>
            {s.active && (
              <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[9px] font-semibold text-violet-700">running</span>
            )}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function OpportunityCard() {
  const stages = ["Lead", "Qualified", "Proposal", "Won"];
  const activeIdx = 2;
  return (
    <Shell className="w-[310px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white">
            <Target className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Opportunity Updated</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Quote sent to client</div>
          </div>
        </div>
        <div className="text-[13px] font-bold text-neutral-900">$4,800</div>
      </div>

      <div className="mt-3 flex items-center gap-1">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1">
            <div
              className={`flex-1 rounded-full py-1 text-center text-[10px] font-semibold ${
                i < activeIdx
                  ? "bg-emerald-100 text-emerald-700"
                  : i === activeIdx
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              {s}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-neutral-50 p-2 ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-[10px] font-semibold text-white">JC</div>
          <div>
            <div className="text-[11px] font-semibold text-neutral-900">Jordan Clarke</div>
            <div className="text-[10px] text-neutral-500">Kitchen renovation</div>
          </div>
        </div>
        <div className="text-[10px] font-semibold text-orange-600">75%</div>
      </div>
    </Shell>
  );
}

function InvoiceCard() {
  return (
    <Shell className="w-[290px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <CheckCircle2 className="h-[18px] w-[18px]" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Invoice Paid</div>
            <div className="text-[11px] text-neutral-500 leading-tight">INV-2841 · Sarah Mitchell</div>
          </div>
        </div>
        <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">PAID</div>
      </div>

      <div className="mt-3 rounded-xl bg-gradient-to-br from-emerald-50 to-white p-3 ring-1 ring-emerald-100">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] text-neutral-500">Amount received</div>
          <div className="text-[10px] text-neutral-400">Today, 3:12 PM</div>
        </div>
        <div className="mt-1 text-[22px] font-bold text-neutral-900">$1,250.00</div>
        <div className="mt-2 flex items-center gap-2 border-t border-emerald-100 pt-2 text-[10px] text-neutral-500">
          <span className="rounded bg-white px-1.5 py-0.5 font-semibold text-neutral-700 ring-1 ring-neutral-200">Stripe</span>
          <span>· Visa ending 4242</span>
        </div>
      </div>
    </Shell>
  );
}

function ReviewCard() {
  return (
    <Shell className="w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-white">
            <Star className="h-[18px] w-[18px] fill-white" />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">New 5-Star Review</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Auto-requested after job</div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 ring-1 ring-neutral-200">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><path fill="#4285F4" d="M12 11v2h5.5c-.2 1.3-1.5 3.8-5.5 3.8a4.3 4.3 0 1 1 0-8.6c1.3 0 2.5.5 3.4 1.3l1.7-1.6A6.6 6.6 0 0 0 12 5.5a6.5 6.5 0 1 0 0 13c3.8 0 6.3-2.7 6.3-6.4 0-.4 0-.7-.1-1.1z"/></svg>
          <span className="text-[10px] font-semibold text-neutral-700">Google</span>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-[10px] font-semibold text-white">SM</div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-neutral-900">Sarah Mitchell</div>
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 text-[11px] leading-snug text-neutral-600">
          "Absolutely brilliant service from start to finish. Highly recommend."
        </div>
      </div>
    </Shell>
  );
}
