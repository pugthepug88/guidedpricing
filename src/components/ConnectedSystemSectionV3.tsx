import { useEffect, useRef, useState } from "react";
import { Phone, Calendar, Star, CheckCircle2, Target, Zap, MessageCircle, Sparkles, RefreshCw } from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";

/* ------------------------------------------------------------------ */
/*  ConnectedSystemSectionV2                                          */
/*  Asymmetrical, cinematic. No dotted ellipse. No fake metrics.      */
/*  Shortened to ~260vh. Respects prefers-reduced-motion.             */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/** Neutral CSS initials avatar — no third-party image URLs. */
function Avatar({ name, tone = "blue", size = 28 }: { name: string; tone?: "blue" | "cyan" | "slate" | "amber" | "emerald" | "teal"; size?: number }) {
  const initials = name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const tones: Record<string, string> = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-700 text-white",
    cyan: "bg-gradient-to-br from-cyan-400 to-sky-600 text-white",
    slate: "bg-gradient-to-br from-slate-400 to-slate-600 text-white",
    amber: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
    teal: "bg-gradient-to-br from-teal-400 to-cyan-600 text-white",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-semibold ring-2 ring-white shadow-sm ${tones[tone]}`}
      style={{ width: size, height: size, fontSize: Math.max(9, Math.floor(size * 0.36)) }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function ConnectedSystemSectionV2() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }
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
  }, [reduced]);

  // sketch fades from full to 0 as character "colors in"
  const sketchOpacity = progress < 0.05 ? 1 : progress > 0.35 ? 0 : 1 - (progress - 0.05) / 0.3;
  const colorOpacity = progress < 0.1 ? 0 : progress > 0.4 ? 1 : (progress - 0.1) / 0.3;

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-white via-white to-sky-50/40 text-neutral-900"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center overflow-hidden">
        {/* ambient depth wash — no container ring */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,rgba(37,99,255,0.05),transparent_70%)]" />

        <div className="relative z-30 pt-10 md:pt-14 px-6 text-center max-w-3xl mx-auto">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.08]">
            Every customer moment. One <span className="text-[#2563ff]">connected</span> system.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
            Calls, messages, bookings, payments, follow-ups and reviews moving together automatically.
          </p>
        </div>

        {/* Desktop / tablet composition */}
        <div className="relative mx-auto hidden w-full max-w-[1400px] flex-1 md:block">
          <div className="relative mx-auto h-full">
            <div className="relative mx-auto h-[74vh] w-[min(150vh,96vw)]">
              {/* character stack (no bounding container) */}
              <img
                src={heroSketch.url}
                alt=""
                draggable={false}
                style={{ opacity: sketchOpacity }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain transition-opacity"
              />
              <img
                src={heroColor.url}
                alt=""
                draggable={false}
                style={{ opacity: colorOpacity }}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-auto -translate-x-1/2 -translate-y-1/2 select-none object-contain transition-opacity"
              />

              {/* Asymmetrical card placement — varied scale, depth, edges */}
              <OrbitCard progress={progress} appearAt={0.14} pos="left-[-8%] top-[6%]"     scale={1.02} rot={-1.2}><ConversationsCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.22} pos="right-[-4%] top-[-2%]"    scale={0.96} rot={1.5}><NewLeadCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.32} pos="right-[-10%] top-[36%]"   scale={0.92} rot={-0.6}><BookingCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.42} pos="left-[-11%] top-[38%]"    scale={0.88} rot={0.8}><WorkflowCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.52} pos="right-[-2%] top-[70%]"    scale={1.0}  rot={0.4}><OpportunityCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.62} pos="left-[22%] bottom-[-2%]"  scale={0.94} rot={-0.8}><InvoiceCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.74} pos="right-[26%] bottom-[2%]"  scale={0.9}  rot={1.1}><ReviewCard /></OrbitCard>
              <OrbitCard progress={progress} appearAt={0.86} pos="left-[-4%] top-[70%]"     scale={0.98} rot={-1.4}><WinBackCard /></OrbitCard>
            </div>
          </div>
        </div>

        {/* Mobile fallback — stacked, no scroll scrub */}
        <div className="relative z-20 flex-1 w-full overflow-y-auto px-4 pb-16 pt-8 md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-1 gap-4">
            <img src={heroColor.url} alt="" className="mx-auto h-40 w-auto object-contain" />
            <ConversationsCard /><NewLeadCard /><BookingCard /><WorkflowCard />
            <OpportunityCard /><InvoiceCard /><ReviewCard /><WinBackCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitCard({
  progress, appearAt, pos, scale = 1, rot = 0, children,
}: { progress: number; appearAt: number; pos: string; scale?: number; rot?: number; children: React.ReactNode }) {
  const enter = Math.min(1, Math.max(0, (progress - appearAt) / 0.05));
  const y = 28 * (1 - enter);
  const s = (0.9 + 0.1 * enter) * scale;
  return (
    <div
      style={{ opacity: enter, transform: `translateY(${y}px) rotate(${rot}deg) scale(${s})` }}
      className={`absolute z-20 ${pos}`}
    >
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

/* ----- Channel icons ----- */
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

/* ----- Cards ----- */

function ConversationsCard() {
  const threads = [
    { icon: <SmsIcon size={34} />,       name: "Sarah Mitchell",     time: "2m", preview: "Can I move my 3pm to Thursday?", unread: true },
    { icon: <GmailIcon size={34} />,     name: "James — new enquiry", time: "8m", preview: "Hi, wanted to get a quote for…",  unread: true },
    { icon: <InstagramIcon size={34} />, name: "@mia.k",              time: "1h", preview: "Do you take bookings via DM?",    unread: false },
    { icon: <MessengerIcon size={34} />, name: "David Chen",          time: "3h", preview: "Thanks — see you tomorrow",        unread: false },
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
          <Avatar name="Emma Wilson" tone="cyan" size={32} />
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
          <div key={d} className={`rounded-md py-1 text-[11px] font-semibold ${d === 14 ? "bg-blue-600 text-white shadow-sm" : "text-neutral-600"}`}>{d}</div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-neutral-50 p-2 ring-1 ring-neutral-200/70">
        <Avatar name="Sarah Mitchell" tone="blue" size={28} />
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
          <Avatar name="Jordan Clarke" tone="slate" size={28} />
          <div>
            <div className="text-[11px] font-semibold text-neutral-900">Jordan Clarke</div>
            <div className="text-[10px] text-neutral-500">Kitchen renovation</div>
          </div>
        </div>
        <div className="text-[10px] font-semibold text-blue-700">Proposal</div>
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
          <Avatar name="Sarah Mitchell" tone="blue" size={28} />
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
  return (
    <Shell className="w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-white"><RefreshCw className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Win-back Campaign</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Inactive customers · 6mo+</div>
          </div>
        </div>
        <div className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-semibold text-teal-700 ring-1 ring-teal-200">SENDING</div>
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-br from-teal-50 to-white p-3 ring-1 ring-teal-100">
        <div className="text-[11px] font-semibold text-neutral-700">"We miss you — book again"</div>
        <div className="mt-1.5 text-[11px] text-neutral-500 leading-snug">
          Personalised SMS + email to past customers with an easy rebooking link.
        </div>
        <div className="mt-2.5 flex items-center justify-between border-t border-teal-100 pt-2">
          <div className="flex -space-x-2">
            <Avatar name="AL" tone="teal" size={22} />
            <Avatar name="MJ" tone="cyan" size={22} />
            <Avatar name="SR" tone="blue" size={22} />
            <Avatar name="KN" tone="slate" size={22} />
          </div>
          <div className="text-[10px] font-semibold text-teal-700">SMS · Email</div>
        </div>
      </div>
    </Shell>
  );
}
