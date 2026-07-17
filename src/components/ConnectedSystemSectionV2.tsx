import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, Calendar, Star, CheckCircle2, Target, Zap, MessageCircle, Sparkles, RefreshCw } from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";

const face = (n: number) => `https://i.pravatar.cc/80?img=${n}`;

export function ConnectedSystemSectionV2() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    let rafId: number | null = null;
    const update = () => {
      const total = section.scrollHeight - window.innerHeight;
      const p = total > 0 ? (window.scrollY - section.offsetTop) / total : 0;
      setProgress(Math.max(0, Math.min(1, p)));
      rafId = null;
    };
    const onScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const sketchOpacity = useTransform(scrollYProgress, [0.05, 0.35, 0.55, 1], [1, 0.35, 0, 0]);
  const colorOpacity = useTransform(scrollYProgress, [0.15, 0.55, 1], [0, 1, 1]);
  const orbitOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 0.5]);

  return (
    <section ref={ref} className="relative h-[460vh] bg-white text-neutral-900">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden bg-white">
        <div className="relative z-30 pt-12 md:pt-16 px-6 text-center max-w-3xl mx-auto">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.1]">
            Every customer moment. One <span className="text-[#2563ff]">connected</span> system.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
            Calls, messages, bookings, payments, follow-ups and reviews moving together automatically.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[1400px] flex-1 px-6">
          <div className="relative mx-auto flex h-full items-center justify-center">
            <div className="relative mx-auto h-[74vh] w-[min(148vh,96vw)]">
              <motion.svg
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                style={{ opacity: orbitOpacity }}
              >
                <ellipse cx="500" cy="300" rx="470" ry="270" fill="none" stroke="#a5b4d4" strokeWidth="1.2" strokeDasharray="2 8" />
              </motion.svg>

              <motion.img
                src={heroSketch.url}
                alt=""
                draggable={false}
                style={{ opacity: sketchOpacity }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              />
              <motion.img
                src={heroColor.url}
                alt=""
                draggable={false}
                style={{ opacity: colorOpacity }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain"
              />

              <OrbitCard progress={progress} appearAt={0.18} pos="left-[-6%] top-[2%]"><ConversationsCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.26} pos="right-[-6%] top-[2%]"><NewLeadCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.36} pos="right-[-10%] top-[38%]"><BookingCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.46} pos="right-[-3%] top-[72%]"><WorkflowCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.56} pos="right-[24%] bottom-[2%]"><OpportunityCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.66} pos="left-[24%] bottom-[2%]"><InvoiceCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.76} pos="left-[-3%] top-[72%]"><ReviewCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.86} pos="left-[-10%] top-[38%]"><WinBackCard /></OrbitCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitCard({ progress, appearAt, pos, children }: { progress: number; appearAt: number; pos: string; children: React.ReactNode }) {
  const fadeProgress = Math.min(1, Math.max(0, (progress - (appearAt - 0.03)) / 0.03));
  const moveProgress = progress <= appearAt ? 0 : progress >= appearAt + 0.06 ? 1 : (progress - appearAt) / 0.06;
  const opacity = fadeProgress;
  const y = 24 * (1 - moveProgress);
  const scale = 0.92 + 0.08 * moveProgress;
  return (
    <div style={{ opacity, transform: `translateY(${y}px) scale(${scale})` }} className={`absolute z-20 ${pos}`}>
      {children}
    </div>
  );
}

function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white ring-1 ring-neutral-200/80 shadow-[0_24px_48px_-18px_rgba(15,23,42,0.20),0_8px_16px_-8px_rgba(15,23,42,0.10)] ${className}`}>
      {children}
    </div>
  );
}

function SmsIcon({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm" style={{ width: size, height: size }}>
      <MessageCircle style={{ width: size * 0.55, height: size * 0.55 }} />
    </div>
  );
}
function GmailIcon({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white ring-1 ring-neutral-200 shadow-sm" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" style={{ width: size * 0.55, height: size * 0.55 }}>
        <path fill="#4285F4" d="M22 6.5v11a2 2 0 0 1-2 2h-2V9.2l-6 4.3-6-4.3v10.3H4a2 2 0 0 1-2-2v-11L12 13z" />
        <path fill="#EA4335" d="M2 6.5 12 13 22 6.5A2 2 0 0 0 20 4.5H4a2 2 0 0 0-2 2z" />
      </svg>
    </div>
  );
}
function MessengerIcon({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg shadow-sm" style={{ width: size, height: size, background: "#0084FF" }}>
      <svg viewBox="0 0 24 24" fill="white" style={{ width: size * 0.55, height: size * 0.55 }}>
        <path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.4 3.7 7.1V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1 12.5-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7z" />
      </svg>
    </div>
  );
}
function InstagramIcon({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center rounded-lg text-white shadow-sm" style={{ width: size, height: size, background: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: size * 0.55, height: size * 0.55 }}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="white" />
      </svg>
    </div>
  );
}

function ConversationsCard() {
  const threads = [
    { icon: <SmsIcon size={36} />, name: "Sarah Mitchell", time: "2m", preview: "Can I move my 3pm to Thursday?", unread: true },
    { icon: <GmailIcon size={36} />, name: "James — new enquiry", time: "8m", preview: "Hi, wanted to get a quote for…", unread: true },
    { icon: <InstagramIcon size={36} />, name: "@mia.k", time: "1h", preview: "Do you take bookings via DM?", unread: false },
    { icon: <MessengerIcon size={36} />, name: "David Chen", time: "3h", preview: "Thanks — see you tomorrow ", unread: false },
  ];
  return (
    <Shell className="w-[320px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"><MessageCircle className="h-[18px] w-[18px]" /></div>
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
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm">
            <Phone className="h-[18px] w-[18px]" />
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-1 ring-sky-200">
              <Sparkles className="h-2.5 w-2.5 text-sky-700" />
            </div>
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">New Lead</div>
            <div className="text-[11px] text-neutral-500 leading-tight">AI receptionist captured a call</div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 ring-1 ring-sky-200">
          <Sparkles className="h-3 w-3" /> AI · LIVE
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2.5">
          <img src={face(47)} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-white" />
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
        <span className="flex items-center gap-1 text-sky-700 font-medium"><Sparkles className="h-3 w-3" /> AI transcribed · added to CRM</span>
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"><Calendar className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Booking Confirmed</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Thursday, 14 Nov</div>
          </div>
        </div>
        <div className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">2:00 PM</div>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {["M","T","W","T","F","S","S"].map((d, i) => (<div key={i} className="text-[9px] font-medium text-neutral-400">{d}</div>))}
        {[11,12,13,14,15,16,17].map((d) => (
          <div key={d} className={`rounded-md py-1 text-[11px] font-semibold ${d === 14 ? "bg-blue-600 text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-50"}`}>{d}</div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-neutral-50 p-2 ring-1 ring-neutral-200/70">
        <img src={face(32)} alt="" className="h-7 w-7 rounded-full object-cover" />
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white"><Zap className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Workflow Running</div>
            <div className="text-[11px] text-neutral-500 leading-tight">New Lead → Nurture</div>
          </div>
        </div>
        <div className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-700 ring-1 ring-sky-200">AUTO</div>
      </div>
      <div className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${s.done ? "bg-emerald-500 text-white" : s.active ? "bg-sky-100 text-sky-700 ring-2 ring-sky-500" : "bg-neutral-100 text-neutral-400"}`}>
              {s.done ? "✓" : i + 1}
            </div>
            <div className={`flex-1 text-[12px] ${s.done ? "text-neutral-500 line-through" : s.active ? "font-semibold text-neutral-900" : "text-neutral-500"}`}>{s.label}</div>
            {s.active && <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] font-semibold text-sky-700">running</span>}
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"><Target className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Quote Sent</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Sent to Jordan Clarke</div>
          </div>
        </div>
        <div className="text-[13px] font-bold text-neutral-900">$4,800</div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1">
            <div className={`flex-1 rounded-full py-1 text-center text-[10px] font-semibold ${i < activeIdx ? "bg-emerald-100 text-emerald-700" : i === activeIdx ? "bg-blue-600 text-white shadow-sm" : "bg-neutral-100 text-neutral-400"}`}>{s}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-neutral-50 p-2 ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2">
          <img src={face(59)} alt="" className="h-7 w-7 rounded-full object-cover" />
          <div>
            <div className="text-[11px] font-semibold text-neutral-900">Jordan Clarke</div>
            <div className="text-[10px] text-neutral-500">Kitchen renovation</div>
          </div>
        </div>
        <div className="text-[10px] font-semibold text-blue-700">75%</div>
      </div>
    </Shell>
  );
}

function InvoiceCard() {
  return (
    <Shell className="w-[290px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white"><CheckCircle2 className="h-[18px] w-[18px]" /></div>
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-white"><Star className="h-[18px] w-[18px] fill-white" /></div>
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
          <img src={face(32)} alt="" className="h-7 w-7 rounded-full object-cover" />
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-neutral-900">Sarah Mitchell</div>
            <div className="flex items-center gap-0.5">
              {[0,1,2,3,4].map((i) => (<Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />))}
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

function WinBackCard() {
  const avatars = [12, 5, 33, 47, 15];
  return (
    <Shell className="w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-white"><RefreshCw className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Customers Won Back</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Reactivation campaign · this month</div>
          </div>
        </div>
        <div className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 ring-1 ring-teal-200">+42</div>
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-br from-teal-50 to-white p-3 ring-1 ring-teal-100">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] text-neutral-500">Re-engaged and purchased</div>
          <div className="text-[10px] font-semibold text-emerald-600">↑ 3.4×</div>
        </div>
        <div className="mt-1 flex items-baseline gap-1.5">
          <div className="text-[22px] font-bold text-neutral-900">42</div>
          <div className="text-[11px] text-neutral-500">past customers</div>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-teal-100 pt-2">
          <div className="flex -space-x-2">
            {avatars.map((n) => (
              <img key={n} src={face(n)} alt="" className="h-6 w-6 rounded-full object-cover ring-2 ring-white" />
            ))}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-[9px] font-semibold text-white ring-2 ring-white">+37</div>
          </div>
          <div className="text-[10px] font-semibold text-teal-700">$18,240 recovered</div>
        </div>
      </div>
    </Shell>
  );
}
