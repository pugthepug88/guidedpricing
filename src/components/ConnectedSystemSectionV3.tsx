/* =====================================================================
 *  ConnectedSystemSectionV3 — V3 scroll-scrub port of the V1 8-card scene.
 *  Scope: /hero-preview-v3 only.
 *  8 cards revealed one-by-one, sketch→color hero, cards stay visible.
 *  Real face portraits for every avatar. Neutral sample copy only.
 * ===================================================================== */
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Phone, Calendar, Star, CheckCircle2, Target, Zap, MessageCircle, Sparkles, RefreshCw } from "lucide-react";
import heroColor from "@/assets/connected-hero-color.png.asset.json";
import heroSketch from "@/assets/connected-hero-sketch.png.asset.json";
import pCustomer from "@/assets/portrait-customer.jpg.asset.json";
import pCust2 from "@/assets/portrait-cust-2.jpg.asset.json";
// pCust3 unused; keep import removed to satisfy strict TS.
import pCust4 from "@/assets/portrait-cust-4.jpg.asset.json";
import pTeam1 from "@/assets/portrait-team-1.jpg.asset.json";
import pTeam2 from "@/assets/portrait-team-2.jpg.asset.json";
import pTeam3 from "@/assets/portrait-team-3.jpg.asset.json";
import pTeam4 from "@/assets/portrait-team-4.jpg.asset.json";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setR(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return r;
}

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return d;
}

export function ConnectedSystemSectionV3() {
  const [view, setView] = useState<"before" | "after">("before");

  return (
    <section className="relative bg-white text-neutral-900 py-20 sm:py-24 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,#F5F9FF_0%,#ffffff_60%)]" />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 ring-1 ring-slate-200">
          Before &amp; after
        </span>
        <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[46px] font-semibold tracking-tight text-neutral-900 leading-[1.08]">
          Scattered tools, or one <span className="text-zapla-blue">connected</span> system.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed">
          Most service businesses run on a stack of disconnected apps. Zapla brings every customer touchpoint into one place, working together.
        </p>

        {/* Compact controlled transition */}
        <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-slate-100 p-1 ring-1 ring-slate-200">
          <button
            onClick={() => setView("before")}
            aria-pressed={view === "before"}
            className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition ${view === "before" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            Before Zapla
          </button>
          <button
            onClick={() => setView("after")}
            aria-pressed={view === "after"}
            className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition ${view === "after" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
          >
            With Zapla
          </button>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl">
        <div className="relative min-h-[520px] sm:min-h-[500px]">
          <BeforeCanvas active={view === "before"} />
          <AfterCanvas active={view === "after"} />
        </div>
      </div>
    </section>
  );
}

function BeforeCanvas({ active }: { active: boolean }) {
  const chips = [
    { label: "Missed call", tone: "bg-rose-50 text-rose-700 ring-rose-100" },
    { label: "Instagram DM", tone: "bg-pink-50 text-pink-700 ring-pink-100" },
    { label: "Voicemail", tone: "bg-amber-50 text-amber-700 ring-amber-100" },
    { label: "Email thread", tone: "bg-slate-50 text-slate-700 ring-slate-200" },
    { label: "Spreadsheet", tone: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    { label: "Sticky notes", tone: "bg-yellow-50 text-yellow-800 ring-yellow-100" },
    { label: "Booking app", tone: "bg-blue-50 text-blue-700 ring-blue-100" },
    { label: "Invoicing app", tone: "bg-indigo-50 text-indigo-700 ring-indigo-100" },
  ];
  const positions = [
    "top-[6%] left-[8%] -rotate-6",
    "top-[10%] right-[10%] rotate-3",
    "top-[36%] left-[3%] rotate-2",
    "top-[42%] right-[4%] -rotate-3",
    "bottom-[10%] left-[14%] rotate-6",
    "bottom-[6%] right-[18%] -rotate-2",
    "top-[62%] left-[42%] rotate-1",
    "top-[18%] left-[42%] -rotate-2",
  ];
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative h-full min-h-[520px] rounded-[28px] bg-slate-50 ring-1 ring-slate-200 overflow-hidden">
        {/* dashed disconnect lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="none" aria-hidden>
          <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 6" fill="none">
            <path d="M120 90 L 380 240" />
            <path d="M660 100 L 420 260" />
            <path d="M60 260 L 380 260" />
            <path d="M740 260 L 420 260" />
            <path d="M180 430 L 380 280" />
            <path d="M600 440 L 420 280" />
            <path d="M420 380 L 400 280" />
            <path d="M400 140 L 400 240" />
          </g>
          {/* dead-end dot in centre */}
          <circle cx="400" cy="260" r="6" fill="#94a3b8" />
        </svg>

        {chips.map((c, i) => (
          <div key={c.label} className={`absolute ${positions[i]} rounded-xl bg-white px-3 py-2 text-[12px] font-semibold shadow-sm ring-1 ${c.tone}`}>
            {c.label}
          </div>
        ))}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-4 py-3 text-center ring-1 ring-slate-200 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Where did the lead go?</div>
          <div className="mt-1 text-[13px] font-semibold text-slate-800">Context lost between tools</div>
        </div>
      </div>
    </div>
  );
}

function AfterCanvas({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden={!active}
      className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <div className="relative h-full min-h-[520px] rounded-[28px] bg-gradient-to-br from-blue-50/60 via-white to-white ring-1 ring-blue-100/70 overflow-hidden p-5 sm:p-8">
        {/* Zapla one-flow diagram: enquiry → conversation → booking → workflow */}
        <div className="grid h-full grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          <FlowStep step="Enquiry" body="Call, DM or form" />
          <FlowStep step="Conversation" body="Unified inbox" />
          <FlowStep step="Booking" body="On the calendar" />
          <FlowStep step="Follow-up" body="Automated" />
        </div>
        <div className="pointer-events-none absolute inset-x-8 top-1/2 hidden md:block">
          <svg viewBox="0 0 800 40" className="h-10 w-full" aria-hidden>
            <defs>
              <linearGradient id="v3flowline" x1="0" x2="1">
                <stop offset="0" stopColor="#60a5fa" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path d="M40 20 L 760 20" stroke="url(#v3flowline)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <NewLeadCard />
          <BookingCard />
          <WorkflowCard />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200 mx-auto w-fit">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          One connected customer record
        </div>
      </div>
    </div>
  );
}

function FlowStep({ step, body }: { step: string; body: string }) {
  return (
    <div className="relative rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.2)]">
      <div className="text-[10.5px] font-bold uppercase tracking-wider text-zapla-blue">{step}</div>
      <div className="mt-1 text-[13px] font-semibold text-slate-800">{body}</div>
    </div>
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

function Face({ src, size = 32 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-full object-cover ring-2 ring-white"
      style={{ width: size, height: size }}
    />
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
    { icon: <SmsIcon size={36} />, name: "Emma Wilson", time: "2m", preview: "Can I move my 3pm to Thursday?", unread: true },
    { icon: <GmailIcon size={36} />, name: "Marcus Lee", time: "8m", preview: "Hi, wanted to get a quote for…", unread: true },
    { icon: <InstagramIcon size={36} />, name: "Priya Shah", time: "1h", preview: "Do you take bookings via DM?", unread: false },
    { icon: <MessengerIcon size={36} />, name: "Daniel Nguyen", time: "3h", preview: "Thanks, see you tomorrow", unread: false },
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
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
            <Phone className="h-[18px] w-[18px]" />
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-1 ring-blue-200">
              <Sparkles className="h-2.5 w-2.5 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Enquiry captured</div>
            <div className="text-[11px] text-neutral-500 leading-tight">AI receptionist captured a call</div>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
          <Sparkles className="h-3 w-3" /> AI · LIVE
        </div>
      </div>
      <div className="mt-3 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-200/70">
        <div className="flex items-center gap-2.5">
          <Face src={pCustomer.url} size={32} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] font-semibold text-neutral-900">Emma Wilson</div>
            <div className="truncate text-[11px] text-neutral-500">04•• ••• ••• · 0:42s</div>
          </div>
          <div className="text-[10px] text-neutral-400">just now</div>
        </div>
        <div className="mt-2.5 rounded-lg bg-white p-2 text-[11px] text-neutral-600 ring-1 ring-neutral-200/70">
          "Hi, calling about a quote for a bathroom reno next month..."
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1 text-blue-600 font-medium"><Sparkles className="h-3 w-3" /> AI transcribed · added to CRM</span>
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
        <Face src={pCustomer.url} size={28} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-semibold text-neutral-900">Emma Wilson</div>
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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-600 text-white"><Zap className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Workflow Running</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Enquiry → Nurture</div>
          </div>
        </div>
        <div className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 ring-1 ring-cyan-200">AUTO</div>
      </div>
      <div className="mt-3 space-y-2">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${s.done ? "bg-emerald-500 text-white" : s.active ? "bg-cyan-100 text-cyan-700 ring-2 ring-cyan-500" : "bg-neutral-100 text-neutral-400"}`}>
              {s.done ? "✓" : i + 1}
            </div>
            <div className={`flex-1 text-[12px] ${s.done ? "text-neutral-500 line-through" : s.active ? "font-semibold text-neutral-900" : "text-neutral-500"}`}>{s.label}</div>
            {s.active && <span className="rounded-full bg-cyan-100 px-1.5 py-0.5 text-[9px] font-semibold text-cyan-700">running</span>}
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
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Opportunity Updated</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Quote sent to customer</div>
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
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-neutral-50 p-2 ring-1 ring-neutral-200/70">
        <Face src={pCust4.url} size={28} />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] font-semibold text-neutral-900">Daniel Nguyen</div>
          <div className="truncate text-[10px] text-neutral-500">Kitchen renovation</div>
        </div>
        <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">Proposal</span>
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
            <div className="text-[11px] text-neutral-500 leading-tight">INV-2841 · Emma Wilson</div>
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
          <Face src={pCustomer.url} size={28} />
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-neutral-900">Emma Wilson</div>
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
  const avatars = [pCust2.url, pTeam1.url, pTeam2.url, pTeam3.url, pTeam4.url];
  const steps = [
    { t: "Day 0 · SMS · personalised offer", state: "sent" },
    { t: "Day 3 · Email · follow-up", state: "queued" },
    { t: "Day 7 · Booking link", state: "scheduled" },
  ];
  return (
    <Shell className="w-[300px] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500 text-white"><RefreshCw className="h-[18px] w-[18px]" /></div>
          <div>
            <div className="text-[14px] font-semibold text-neutral-900 leading-tight">Win customers back</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Re-engagement sequence</div>
          </div>
        </div>
        <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold text-cyan-700 ring-1 ring-cyan-200">In progress</span>
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-br from-cyan-50 to-white p-3 ring-1 ring-cyan-100">
        <div className="text-[11px] text-neutral-500">Personalised SMS + email queued</div>
        <div className="mt-2 space-y-1.5">
          {steps.map((s) => (
            <div key={s.t} className="flex items-center gap-2 rounded-lg bg-white/80 px-2 py-1.5 ring-1 ring-cyan-100/70">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.state === "sent" ? "bg-emerald-500" : s.state === "queued" ? "bg-cyan-500" : "bg-neutral-300"}`} />
              <span className="flex-1 truncate text-[11px] text-neutral-700">{s.t}</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">{s.state}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-cyan-100 pt-2">
          <div className="flex -space-x-2">
            {avatars.map((u) => (
              <Face key={u} src={u} size={24} />
            ))}
          </div>
          <div className="text-[10px] font-medium text-cyan-700">Past customers · re-engaging</div>
        </div>
      </div>
    </Shell>
  );
}
