/* =====================================================================
 *  V3 rebuilt sections — Journey, Automation, Professions, One Record
 *  Scope: /hero-preview-v3 only. Do NOT reuse on other routes.
 * ===================================================================== */
import { useEffect, useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Phone, PhoneMissed, MessageSquare, Instagram, Users, Calendar as CalendarIcon,
  CreditCard, Star as StarIcon, RefreshCw, CheckCircle2, ArrowRight, ArrowLeft,
  FileText, Send, Bell, Globe, Briefcase, HeartPulse, Home as HomeIcon, Wrench,
  Dumbbell, Sparkles, Mail, ChevronRight, ChevronLeft, Car, Building2, BedDouble,
  Play, Pause, RotateCcw, Facebook,
} from "lucide-react";
import industryRealEstate from "@/assets/industry-real-estate.png.asset.json";
import industryHealthcare from "@/assets/industry-healthcare.png.asset.json";
import industryTrades from "@/assets/industry-trades.png.asset.json";
import industryFitness from "@/assets/industry-fitness.png.asset.json";
import industryLegal from "@/assets/industry-legal.png.asset.json";
import industryMortgage from "@/assets/industry-mortgage.png.asset.json";
import industryAutomotive from "@/assets/industry-automotive.png.asset.json";
import industryAirbnb from "@/assets/industry-airbnb.png.asset.json";
import logoBlue from "@/assets/zapla-logo-blue.png.asset.json";
import callerPortrait from "@/assets/caller-portrait.jpg.asset.json";
import portraitCustomer from "@/assets/portrait-customer.jpg.asset.json";
import portraitTeam1 from "@/assets/portrait-team-1.jpg.asset.json";
import portraitTeam2 from "@/assets/portrait-team-2.jpg.asset.json";
import portraitTeam3 from "@/assets/portrait-team-3.jpg.asset.json";
import portraitTeam4 from "@/assets/portrait-team-4.jpg.asset.json";

const BOOK_URL = "https://zapla.io/booking";

/* ---------- shared primitives (V3-scoped, tiny) --------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 ring-1 ring-blue-100">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      {children}
    </div>
  );
}

function CustomerAvatar({ size = 44 }: { size?: number }) {
  return (
    <img
      src={portraitCustomer.url}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className="shrink-0 rounded-full object-cover ring-2 ring-white shadow-[0_4px_12px_-4px_rgba(15,23,42,0.25)]"
      style={{ width: size, height: size }}
    />
  );
}
const TEAM_FACES: Record<string, string> = {
  AL: portraitTeam1.url,
  MI: portraitTeam2.url,
  SM: portraitTeam3.url,
  JS: portraitTeam4.url,
  T1: portraitTeam1.url,
  T2: portraitTeam2.url,
  T3: portraitTeam3.url,
  T4: portraitTeam4.url,
};
function TeamAvatar({ initials, tone, size = 32 }: { initials: string; tone?: string; size?: number }) {
  const src = TEAM_FACES[initials];
  if (src) {
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
  return (
    <div
      className="grid shrink-0 place-items-center rounded-full text-white text-[11px] font-semibold ring-2 ring-white"
      style={{ width: size, height: size, background: tone ?? "#64748b" }}
      aria-hidden
    >{initials}</div>
  );
}
const EmmaAvatar = CustomerAvatar;

function PortraitAvatar({ size = 56, ring = true }: { size?: number; ring?: boolean }) {
  return (
    <img
      src={callerPortrait.url}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className={`shrink-0 rounded-full object-cover ${ring ? "ring-2 ring-white shadow-[0_6px_20px_-6px_rgba(15,23,42,0.35)]" : ""}`}
      style={{ width: size, height: size }}
    />
  );
}




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

/* =====================================================================
 *  SECTION 1 — JourneyV3
 *  One stable workspace. Emma Wilson, one continuous story. Six stages.
 * ===================================================================== */

type NavKey = "inbox" | "contacts" | "calendar" | "quotes" | "reviews" | "automations" | "campaigns";
type Stage = {
  key: string; sub: string; label: string;
  nav: NavKey;
  headline: string; body: string;
  panel: ReactNode;
};

type StageKey = "capture" | "communicate" | "convert" | "operate" | "retain" | "grow";

function headerStatus(stageKey: StageKey, step: number, finalStep: number): {
  label: string; tone: "slate" | "blue" | "amber" | "emerald" | "violet";
} {
  switch (stageKey) {
    case "capture":     return { label: "Enquiry",             tone: "blue"    };
    case "communicate": return { label: "Enquiry",             tone: "blue"    };
    case "convert":
      if (step >= 3)    return { label: "Booked",              tone: "emerald" };
      if (step >= 1)    return { label: "Quote sent",          tone: "amber"   };
      return              { label: "Enquiry",                  tone: "blue"    };
    case "operate":     return { label: "Scheduled",           tone: "emerald" };
    case "retain":      return { label: "Customer",            tone: "violet"  };
    case "grow":
      if (step >= finalStep) return { label: "Returning customer", tone: "violet" };
      return              { label: "Customer",                 tone: "violet"  };
  }
}
const toneClasses = (t: "slate" | "blue" | "amber" | "emerald" | "violet") => {
  switch (t) {
    case "emerald": return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    case "amber":   return "bg-amber-50 text-amber-700 ring-amber-100";
    case "violet":  return "bg-violet-50 text-violet-700 ring-violet-100";
    case "blue":    return "bg-blue-50 text-blue-700 ring-blue-100";
    case "slate":   return "bg-slate-100 text-slate-600 ring-slate-200";
  }
};

function CustomerRecordHeader({ stageKey, step, finalStep }: { stageKey: StageKey; step: number; finalStep: number }) {
  // Identity resolves at Capture step 1 (Facebook / website lead form contains
  // Emma's name, phone, email and service need). Before step 1 we show the
  // pending state — an inbound lead is landing.
  const pending = stageKey === "capture" && step < 1;
  const status = headerStatus(stageKey, step, finalStep);
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 sm:px-6 transition-colors">
      {pending ? (
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-400 ring-2 ring-white"
          aria-hidden
        >
          <Users className="h-4 w-4" />
        </span>
      ) : (
        <CustomerAvatar size={44} />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className={`text-[14px] font-semibold transition-colors ${pending ? "text-slate-400 italic" : "text-slate-900"}`}>
            {pending ? "New lead arriving…" : "Emma Wilson"}
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 transition-colors ${
              pending ? toneClasses("slate") : toneClasses(status.tone)
            }`}
          >
            {pending ? "Incoming" : status.label}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-3 text-[12px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3 w-3" />
            +61 4•• ••• •••
          </span>
          {!pending && (
            <span className="hidden sm:inline-flex items-center gap-1"><Mail className="h-3 w-3" />emma.wilson@northline.com.au</span>
          )}
          {pending && (
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">Awaiting lead form…</span>
          )}
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ring-1 transition-colors ${
          pending
            ? "bg-slate-100 text-slate-500 ring-slate-200"
            : "bg-emerald-50 text-emerald-700 ring-emerald-100"
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${pending ? "bg-slate-400" : "bg-emerald-500"}`} />
          {pending ? "New" : "Active"}
        </span>
      </div>
    </div>
  );
}


/* Legacy static header used by OneRecordV3 only (Journey uses the stage-aware header above). */
function EmmaRecordHeader() {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
      <CustomerAvatar size={44} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="text-[14px] font-semibold text-slate-900">Emma Wilson</div>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-100">Lead</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">Local area</span>
        </div>
        <div className="mt-0.5 flex items-center gap-3 text-[12px] text-slate-500">
          <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />+61 4•• ••• •••</span>
          <span className="hidden sm:inline-flex items-center gap-1"><Mail className="h-3 w-3" />emma.wilson@northline.com.au</span>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active
        </span>
      </div>
    </div>
  );
}

/* ---------- Sequenced-reveal helper ------------------------------- */
// Motion easing tuned to feel premium — same curve for stage swaps and events.
const V3_EASE = [0.22, 1, 0.36, 1] as const;

function StepReveal({
  show, children, delay = 0, from = "up",
}: { show: boolean; children: ReactNode; delay?: number; from?: "up" | "right" | "none" }) {
  const reduced = useReducedMotion();
  const offX = from === "right" ? 10 : 0;
  const offY = from === "up" ? 10 : 0;
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: offX, y: offY, scale: 0.99 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.99 }}
          transition={reduced
            ? { duration: 0 }
            : { duration: 0.36, ease: V3_EASE, delay: delay / 1000 }}
          style={{ willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* ---------- Story constants (single source of truth) -------------- */
const STORY = {
  service: "Annual air-conditioning service",
  serviceShort: "annual A/C service",
  day: "Thursday",
  time: "2:00 PM",
  staff: "Alex",
  staffInitials: "AL",
  staffRole: "Technician",
  reminderMonths: 12,
} as const;

/* ---------- Stage canvas — fixed size, all panels use this ---------- */
const STAGE_H = 440;
function StageCanvas({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: STAGE_H }}
      data-testid="stage-canvas"
    >
      {children}
    </div>
  );
}

/* ---------- 1. CAPTURE — form fills, then morphs into contact record ----- */
function PanelCapture({ step }: { step: number }) {
  const reduced = useReducedMotion();
  // step 0: blank (arriving);
  // step 1: form centered, fields fill in;
  // step 2: same card morphs (shrinks + shifts up) into a compact contact record row.
  const morphed = step >= 2;
  const ease = V3_EASE;
  const fields = [
    { label: "Name",    value: "Emma Wilson" },
    { label: "Phone",   value: "+61 4•• ••• •••" },
    { label: "Email",   value: "emma.wilson@northline.com.au" },
    { label: "Service", value: STORY.service },
  ];
  return (
    <StageCanvas>
      {/* soft workspace background so the traveling card reads as spatial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#eff6ff_0%,transparent_60%),radial-gradient(circle_at_80%_80%,#f5f3ff_0%,transparent_55%)]" aria-hidden />

      {/* Persistent "record slot" where the form will land — subtle placeholder */}
      <div className="absolute left-4 right-4 top-4 rounded-xl border border-dashed border-slate-200/80 bg-white/40 p-3">
        <div className="flex items-center gap-3 opacity-40">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div className="h-3 w-32 rounded-full bg-slate-200" />
          <div className="ml-auto h-4 w-16 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* The single hero card — its layout, size and content morph in place */}
      <motion.div
        layout
        initial={false}
        animate={
          reduced
            ? { opacity: 1 }
            : morphed
            ? { top: 16, left: 16, right: 16, width: "auto", scale: 1 }
            : { top: 84, left: "50%", x: "-50%", width: 380, scale: 1 }
        }
        transition={reduced ? { duration: 0 } : { duration: 0.55, ease }}
        className="absolute rounded-2xl bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-slate-200"
        style={{ willChange: "transform" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!morphed ? (
            <motion.div
              key="form"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: 0.22, ease }}
              className="p-4"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1877F2]/10 text-[#1877F2] ring-1 ring-[#1877F2]/20">
                  <Facebook className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-slate-900">Facebook lead form</div>
                  <div className="text-[11px] text-slate-500">Campaign · Annual A/C service</div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 ring-1 ring-blue-100 rounded-full px-2 py-0.5">Live</span>
              </div>
              <div className="mt-3 space-y-2">
                {fields.map((f, i) => {
                  const show = step >= 1;
                  return (
                    <motion.div
                      key={f.label}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={show ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 0 }}
                      transition={reduced ? { duration: 0 } : { duration: 0.35, delay: 0.08 * i, ease }}
                      className="rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-100"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-slate-400">{f.label}</div>
                      <div className="text-[12.5px] font-medium text-slate-800 truncate">{f.value}</div>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.3, delay: 0.4, ease }}
                className="mt-3 flex items-center justify-between rounded-lg bg-blue-600 px-3 py-2 text-white"
              >
                <span className="text-[12px] font-semibold">Submit lead</span>
                <CheckCircle2 className="h-4 w-4 text-white" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="record"
              initial={reduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.22, delay: 0.15, ease }}
              className="flex items-center gap-3 p-3.5"
            >
              <CustomerAvatar size={38} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-[13px] font-semibold text-slate-900 truncate">Emma Wilson</div>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 ring-1 ring-blue-100 rounded-full px-2 py-0.5">Enquiry</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-slate-500">
                  <Facebook className="h-3 w-3 text-[#1877F2]" />
                  <span>Facebook lead · {STORY.service}</span>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <CheckCircle2 className="h-3 w-3" />One record
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Sub-caption anchored to bottom so canvas height never grows */}
      <div className="absolute bottom-4 left-4 right-4 text-center text-[11px] text-slate-400">
        {morphed ? "Contact created in Zapla · attached to Emma's record" : "Facebook lead form · fields captured live"}
      </div>
    </StageCanvas>
  );
}

/* ---------- 2. COMMUNICATE — channels converge into one thread ----------- */
function IgGlyph({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Instagram">
      <defs>
        <linearGradient id="v3-ig-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#f9ce34" />
          <stop offset="0.5" stopColor="#ee2a7b" />
          <stop offset="1" stopColor="#6228d7" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#v3-ig-g)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="#fff" />
    </svg>
  );
}
function MessengerGlyph({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Facebook Messenger">
      <defs>
        <radialGradient id="v3-msg-g" cx="0.25" cy="1" r="1.1">
          <stop offset="0" stopColor="#00b2ff" />
          <stop offset="0.6" stopColor="#006aff" />
          <stop offset="1" stopColor="#0057ff" />
        </radialGradient>
      </defs>
      <path d="M12 1.6C5.9 1.6 1.2 6.2 1.2 12.1c0 3.2 1.4 6 3.7 8v3.6l3.4-1.9c1.1.3 2.3.5 3.7.5 6.1 0 10.8-4.6 10.8-10.4S18.1 1.6 12 1.6z" fill="url(#v3-msg-g)" />
      <path d="M5.7 14.9l3.2-5.1 2.9 2.4 2.9-2.4 2.9 5.1-2.9-2.4-2.9 2.4-2.9-2.4z" fill="#fff" />
    </svg>
  );
}

type CommEv =
  | { kind: "event"; via: "Form" | "Instagram" | "Messenger" | "Email"; title: string; detail: string; when: string }
  | { kind: "msg"; from: "z" | "e"; via: "SMS"; t: string; when: string };
const COMM_EVENTS: CommEv[] = [
  { kind: "msg",   from: "z", via: "SMS",       t: "Hi Emma — thanks for your enquiry. When suits you this week?",     when: "12:05" },
  { kind: "msg",   from: "e", via: "SMS",       t: "I need my annual A/C service.",                              when: "12:06" },
  { kind: "event", via: "Form",      title: "Website form submitted", detail: `Service details · Preferred day ${STORY.day}`, when: "12:10" },
  { kind: "event", via: "Instagram", title: "Instagram DM · photo",   detail: "Emma sent a photo of the split system",        when: "12:18" },
  { kind: "event", via: "Messenger", title: "Messenger reply",        detail: "Confirmed the address and access details",     when: "12:22" },
  { kind: "msg",   from: "z", via: "SMS",       t: "Thanks Emma — I'll send your quote and available times next.", when: "12:24" },
  { kind: "event", via: "Email",     title: "Email · quote and times", detail: "Quote and available times sent",              when: "12:30" },
];
function chipCls(via: string) {
  if (via === "SMS")       return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  if (via === "Instagram") return "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100";
  if (via === "Messenger") return "bg-blue-50 text-blue-700 ring-blue-100";
  if (via === "Email")     return "bg-sky-50 text-sky-700 ring-sky-100";
  if (via === "Form")      return "bg-slate-100 text-slate-700 ring-slate-200";
  return "bg-slate-100 text-slate-600 ring-slate-200";
}
function chipIcon(via: string) {
  if (via === "SMS")       return <MessageSquare className="h-2.5 w-2.5" aria-hidden />;
  if (via === "Instagram") return <IgGlyph size={11} />;
  if (via === "Messenger") return <MessengerGlyph size={11} />;
  if (via === "Email")     return <Mail className="h-2.5 w-2.5" aria-hidden />;
  return <FileText className="h-2.5 w-2.5" aria-hidden />;
}

function PanelCommunicate({ step }: { step: number }) {
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement | null>(null);
  const visible = COMM_EVENTS.slice(0, Math.max(0, Math.min(step, COMM_EVENTS.length)));
  useEffect(() => {
    if (reduced) return;
    const el = listRef.current;
    if (!el) return;
    // Scroll thread's own internal viewport to bottom — outer frame never grows.
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step, reduced]);

  const orbitChannels: { key: string; label: string; pos: string }[] = [
    { key: "SMS",       label: "SMS",       pos: "left-3 top-4" },
    { key: "Form",      label: "Form",      pos: "left-3 top-24" },
    { key: "Instagram", label: "Instagram", pos: "right-3 top-4" },
    { key: "Messenger", label: "Messenger", pos: "right-3 top-24" },
    { key: "Email",     label: "Email",     pos: "right-3 bottom-4" },
  ];

  // Which orbit channel is "firing" right now — highlight the source that produced the last visible event.
  const lastEv = visible[visible.length - 1];
  const activeChannel = lastEv?.via;

  return (
    <StageCanvas>
      {/* Orbiting source tokens — highlight when their event fires */}
      {orbitChannels.map((c) => {
        const isActive = activeChannel === c.key;
        return (
          <motion.div
            key={c.key}
            animate={reduced ? {} : { scale: isActive ? 1.08 : 1 }}
            transition={{ duration: 0.35, ease: V3_EASE }}
            className={`absolute z-10 ${c.pos} hidden sm:flex`}
          >
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10.5px] font-semibold ring-1 shadow-sm transition-shadow ${chipCls(c.key)} ${isActive ? "shadow-[0_0_0_3px_rgba(59,130,246,0.15)]" : ""}`}>
              {chipIcon(c.key)}{c.label}
            </span>
          </motion.div>
        );
      })}

      {/* Central thread — fixed height, scrolls internally */}
      <div className="absolute inset-y-0 left-0 right-0 sm:left-24 sm:right-24 flex flex-col rounded-xl bg-white ring-1 ring-slate-200 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">One conversation · all channels</div>
          <div className="text-[10px] text-slate-400">Today</div>
        </div>
        <div ref={listRef} className="relative flex-1 space-y-2 overflow-y-auto px-3 py-3">
          <AnimatePresence initial={false}>
            {visible.map((e, i) => (
              <motion.div
                key={i}
                layout
                initial={reduced ? { opacity: 1 } : { opacity: 0, x: e.kind === "msg" && e.from === "e" ? 24 : -24, scale: 0.98 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 28 }}
              >
                {e.kind === "event" ? (
                  <div className="flex items-start gap-2 rounded-lg bg-slate-50 px-2.5 py-2 ring-1 ring-slate-100">
                    <span className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${chipCls(e.via)}`}>
                      {chipIcon(e.via)}{e.via}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-semibold text-slate-800">{e.title}</div>
                      <div className="truncate text-[11.5px] text-slate-500">{e.detail}</div>
                    </div>
                    <span className="text-[10px] text-slate-400">{e.when}</span>
                  </div>
                ) : (
                  <div className={`flex items-end gap-1.5 ${e.from === "z" ? "justify-start" : "justify-end"}`}>
                    {e.from === "e" && <CustomerAvatar size={20} />}
                    <div className={`max-w-[74%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${e.from === "z" ? "bg-slate-100 text-slate-800 rounded-bl-sm" : "bg-blue-600 text-white rounded-br-sm"}`}>
                      {e.t}
                      <div className={`mt-0.5 flex items-center gap-1 text-[10px] ${e.from === "z" ? "text-slate-500" : "text-white/70"}`}>
                        <span>{e.when}</span><span>·</span>
                        <span className="inline-flex items-center gap-1">{chipIcon(e.via)}{e.via}</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </StageCanvas>
  );
}

/* ---------- 3. CONVERT — one surface morphs quote → booking → confirmed ------ */
function PanelConvert({ step }: { step: number }) {
  const reduced = useReducedMotion();
  // step 1: Quote sent (amber)
  // step 2: Quote accepted + time chips reveal, 2pm gets selected
  // step 3: Same card morphs into dark "Appointment confirmed"
  const confirmed = step >= 3;
  const accepted = step >= 2;

  const bgAnim = reduced ? {} : {
    backgroundColor: confirmed ? "#0f172a" : "#ffffff",
    color: confirmed ? "#ffffff" : "#0f172a",
  };

  return (
    <StageCanvas>
      <div className="absolute inset-0 flex items-center justify-center px-2">
        <motion.div
          layout
          animate={bgAnim}
          transition={reduced ? { duration: 0 } : { duration: 0.5, ease: V3_EASE }}
          className="w-full max-w-md rounded-2xl ring-1 ring-slate-200 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] p-5"
          style={{ willChange: "background-color" }}
        >
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider ${confirmed ? "text-white/60" : "text-slate-400"}`}>
              <FileText className="h-3 w-3" />Quote · Q-2841
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={confirmed ? "confirmed" : accepted ? "accepted" : "sent"}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.28, ease: V3_EASE }}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${
                  confirmed ? "bg-emerald-500/20 text-emerald-200 ring-emerald-400/30"
                  : accepted ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                  : "bg-amber-50 text-amber-700 ring-amber-100"
                }`}
              >
                {confirmed ? "Appointment confirmed" : accepted ? "Quote accepted" : "Quote sent"}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <CustomerAvatar size={36} />
            <div className="min-w-0 flex-1">
              <div className={`text-[13.5px] font-semibold ${confirmed ? "text-white" : "text-slate-900"}`}>{STORY.service}</div>
              <div className={`text-[11.5px] ${confirmed ? "text-white/60" : "text-slate-500"}`}>Attached to Emma Wilson</div>
            </div>
            <div className={`text-[16px] font-semibold ${confirmed ? "text-white" : "text-slate-900"}`}>$240</div>
          </div>

          {/* Time chips area — appears at step 2, morphs away at step 3 */}
          <div className="mt-4 min-h-[64px]">
            <AnimatePresence mode="wait" initial={false}>
              {!confirmed && accepted && (
                <motion.div
                  key="times"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.32, ease: V3_EASE }}
                >
                  <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">Emma chose a time</div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-[12px] font-medium text-slate-500 ring-1 ring-slate-200">11:00 AM</span>
                    <motion.span
                      layoutId="convert-chosen-time"
                      className="inline-flex items-center rounded-lg bg-blue-600 px-2.5 py-1 text-[12px] font-semibold text-white ring-1 ring-blue-600 shadow-sm"
                    >{STORY.time}</motion.span>
                    <span className="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-[12px] font-medium text-slate-500 ring-1 ring-slate-200">4:00 PM</span>
                  </div>
                </motion.div>
              )}
              {confirmed && (
                <motion.div
                  key="confirmed"
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, ease: V3_EASE }}
                  className="flex items-center gap-3"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-white">{STORY.day} · <motion.span layoutId="convert-chosen-time" className="inline-block">{STORY.time}</motion.span></div>
                    <div className="text-[11px] text-white/60">Assigned to {STORY.staff} · reminders queued</div>
                  </div>
                </motion.div>
              )}
              {!accepted && !confirmed && (
                <motion.div
                  key="sent"
                  initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[12px] text-slate-500"
                >
                  Emailed to Emma · awaiting response
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </StageCanvas>
  );
}

/* ---------- 4. OPERATE — schedule grid, job token flies in to Alex ------- */
function PanelOperate({ step }: { step: number }) {
  const reduced = useReducedMotion();
  const hours = ["8a","9a","10a","11a","12p","1p","2p","3p","4p"];
  const nowCol = 5;

  type Job = { start: number; span: number; tone: string; ring: string; label: string; sub?: string };
  const staticRows: { who: string; role: string; initials: string; tone: string; jobs: Job[] }[] = [
    { who: STORY.staff, role: STORY.staffRole, initials: STORY.staffInitials, tone: "#0ea5e9", jobs: [
      { start: 0, span: 2, tone: "#e0f2fe", ring: "#7dd3fc", label: "Split system install", sub: "Local area" },
    ]},
    { who: "Mia", role: "Technician", initials: "MI", tone: "#10b981", jobs: [
      { start: 1, span: 2, tone: "#d1fae5", ring: "#34d399", label: "Ducted service", sub: "2h · parts kit" },
      { start: 4, span: 1, tone: "#d1fae5", ring: "#34d399", label: "Quote walk-through", sub: "Video call" },
      { start: 7, span: 2, tone: "#d1fae5", ring: "#34d399", label: "Site inspection", sub: "Local area" },
    ]},
    { who: "Sam", role: "Technician", initials: "SM", tone: "#f59e0b", jobs: [
      { start: 2, span: 1, tone: "#fef3c7", ring: "#fbbf24", label: "Warranty callback", sub: "45 min" },
      { start: 5, span: 2, tone: "#fef3c7", ring: "#fbbf24", label: "Filter replacement", sub: "Enquiry" },
    ]},
    { who: "Jess", role: "Coordinator", initials: "JS", tone: "#a855f7", jobs: [
      { start: 3, span: 2, tone: "#f3e8ff", ring: "#c084fc", label: "Route planning", sub: `${STORY.day} run sheet` },
      { start: 8, span: 1, tone: "#f3e8ff", ring: "#c084fc", label: "End-of-day sync", sub: "Team" },
    ]},
  ];

  const highlightAlex = step >= 2;
  const landed = step >= 2;
  const assigned = step >= 3;

  return (
    <StageCanvas>
      <div className="absolute inset-0 rounded-xl bg-white ring-1 ring-slate-200 p-3.5 flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-[13px] font-semibold text-slate-900">{STORY.day}</div>
            <div className="text-[11px] text-slate-500">Team schedule</div>
          </div>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {assigned && (
                <motion.span
                  key="assigned-pill"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: V3_EASE }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-100"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Scheduled · Assigned
                </motion.span>
              )}
            </AnimatePresence>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              Now 1:00 PM
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-1 text-[10px] text-slate-400 shrink-0" style={{ gridTemplateColumns: "84px repeat(9, minmax(0,1fr))" }}>
          <div />
          {hours.map((h, i) => (
            <div key={h} className={`text-center ${i === nowCol ? "text-blue-600 font-semibold" : ""}`}>{h}</div>
          ))}
        </div>

        <div className="relative mt-1 flex-1 space-y-1.5">
          <div className="pointer-events-none absolute top-0 bottom-0 z-10" style={{ left: `calc(84px + (100% - 84px) * ${(nowCol + 0.5) / 9})` }} aria-hidden>
            <div className="h-full w-px bg-blue-500/70" />
            <div className="absolute -top-1 -left-[3px] h-1.5 w-1.5 rounded-full bg-blue-500" />
          </div>

          {staticRows.map((r, ri) => {
            const isAlex = ri === 0;
            return (
              <motion.div
                key={r.who}
                animate={reduced ? {} : { backgroundColor: isAlex && highlightAlex ? "rgba(219,234,254,0.4)" : "rgba(255,255,255,0)" }}
                transition={{ duration: 0.4, ease: V3_EASE }}
                className="grid items-center gap-1 rounded-md"
                style={{ gridTemplateColumns: "84px repeat(9, minmax(0,1fr))" }}
              >
                <div className="flex items-center gap-2 pr-2">
                  <TeamAvatar initials={r.initials} tone={r.tone} size={22} />
                  <div className="min-w-0">
                    <div className="text-[11.5px] font-semibold text-slate-800 leading-none truncate">{r.who}</div>
                    <div className="text-[9.5px] text-slate-400 leading-none mt-0.5 truncate">{r.role}</div>
                  </div>
                </div>
                {Array.from({ length: 9 }).map((_, i) => {
                  const job = r.jobs.find((j) => i >= j.start && i < j.start + j.span);
                  const isJobStart = job && i === job.start;
                  const isEmmaSlot = isAlex && i === 6; // 2pm column
                  if (job && !isJobStart) return <div key={i} />;
                  if (isEmmaSlot && landed) {
                    return (
                      <motion.div
                        key={i}
                        layoutId="emma-job-token"
                        initial={reduced ? false : { opacity: 0, y: -60, scale: 0.6 }}
                        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22 }}
                        className="h-9 rounded-md px-1.5 flex flex-col justify-center overflow-hidden"
                        style={{
                          gridColumn: `span 1 / span 1`,
                          background: "#dbeafe",
                          boxShadow: "inset 0 0 0 1.5px #2563eb, 0 8px 20px -8px rgba(37,99,235,0.55)",
                        }}
                      >
                        <div className="text-[10.5px] font-semibold truncate text-blue-900">Emma Wilson · {STORY.serviceShort}</div>
                        <div className="text-[9.5px] truncate text-blue-700/80">2:00 PM · {STORY.staff}</div>
                      </motion.div>
                    );
                  }
                  if (!job) {
                    return <div key={i} className="h-9 rounded-md bg-slate-50 ring-1 ring-slate-100" />;
                  }
                  return (
                    <div
                      key={i}
                      className="h-9 rounded-md px-1.5 flex flex-col justify-center overflow-hidden"
                      style={{
                        gridColumn: `span ${job.span} / span ${job.span}`,
                        background: job.tone,
                        boxShadow: `inset 0 0 0 1px ${job.ring}55`,
                      }}
                    >
                      <div className="text-[10.5px] font-semibold truncate text-slate-800">{job.label}</div>
                      {job.sub && <div className="text-[9.5px] truncate text-slate-500">{job.sub}</div>}
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>

        {/* Floating token (pre-land state) — visible only at step 1, hovering above Alex row */}
        <AnimatePresence>
          {step === 1 && !reduced && (
            <motion.div
              key="pre-token"
              initial={{ opacity: 0, y: -20, x: 60 }}
              animate={{ opacity: 1, y: 0, x: 60 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: V3_EASE }}
              className="pointer-events-none absolute left-1/2 top-14 z-20 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg"
            >
              Emma Wilson · 2:00 PM
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StageCanvas>
  );
}

/* ---------- 5. RETAIN — horizontal workflow, connector draws, nodes activate --- */
function PanelRetain({ step }: { step: number }) {
  const reduced = useReducedMotion();
  const nodes = [
    { icon: <CheckCircle2 className="h-5 w-5" />, label: "Job completed", sub: `${STORY.staff} · 3:15 PM`, doneAt: 1, tone: { on: "bg-emerald-500 text-white ring-emerald-500", off: "bg-white text-slate-400 ring-slate-200" }, status: "Completed" },
    { icon: <StarIcon className="h-5 w-5" />,    label: "Review request",  sub: "Sent to Emma · 1h later",   doneAt: 2, tone: { on: "bg-amber-500 text-white ring-amber-500", off: "bg-white text-slate-400 ring-slate-200" }, status: "Sent" },
    { icon: <Bell className="h-5 w-5" />,        label: "12-month reminder", sub: "Scheduled for next year",  doneAt: 3, tone: { on: "bg-blue-600 text-white ring-blue-600", off: "bg-white text-slate-400 ring-slate-200" }, status: "Scheduled" },
  ];

  // Connector fill progresses left→right based on step.
  const fillPct = reduced ? 100 : Math.min(100, Math.max(0, ((step - 1) / (nodes.length - 1)) * 100));

  return (
    <StageCanvas>
      <div className="absolute inset-0 rounded-xl bg-white ring-1 ring-slate-200 p-6 flex flex-col justify-center">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center">Post-job automation</div>

        <div className="mt-6 relative">
          {/* Base track */}
          <div className="absolute left-[8%] right-[8%] top-8 h-[3px] rounded-full bg-slate-200" aria-hidden />
          {/* Fill */}
          <motion.div
            className="absolute left-[8%] top-8 h-[3px] rounded-full bg-blue-500"
            initial={false}
            animate={{ width: `${(fillPct / 100) * 84}%` }}
            transition={reduced ? { duration: 0 } : { duration: 0.6, ease: V3_EASE }}
            aria-hidden
          />
          {/* Travelling pulse */}
          {!reduced && step >= 1 && step < nodes.length && (
            <motion.div
              key={`pulse-${step}`}
              className="absolute top-[26px] h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_6px_rgba(59,130,246,0.15)]"
              initial={{ left: `${8 + ((step - 1) / (nodes.length - 1)) * 84}%` }}
              animate={{ left: `${8 + (step / (nodes.length - 1)) * 84}%` }}
              transition={{ duration: 0.5, ease: V3_EASE }}
              aria-hidden
            />
          )}

          <div className="grid grid-cols-3 relative">
            {nodes.map((n, i) => {
              const isDone = step >= n.doneAt;
              return (
                <div key={i} className="flex flex-col items-center text-center px-2">
                  <motion.div
                    className={`grid h-16 w-16 place-items-center rounded-full ring-2 shadow-sm transition-colors ${isDone ? n.tone.on : n.tone.off}`}
                    animate={reduced ? {} : { scale: isDone ? 1 : 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    {n.icon}
                  </motion.div>
                  <div className={`mt-3 text-[13px] font-semibold transition-colors ${isDone ? "text-slate-900" : "text-slate-400"}`}>{n.label}</div>
                  <div className={`mt-0.5 text-[11.5px] transition-colors ${isDone ? "text-slate-500" : "text-slate-300"}`}>{n.sub}</div>
                  <AnimatePresence>
                    {isDone && (
                      <motion.span
                        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28, ease: V3_EASE }}
                        className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white"
                      >
                        <CheckCircle2 className="h-3 w-3" />{n.status}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center text-[12px] text-slate-500">
          One completion triggers the whole retention flow — no manual follow-up.
        </div>
      </div>
    </StageCanvas>
  );
}

/* ---------- 6. GROW — same record, timeline jumps +12mo, becomes returning ---- */
function PanelGrow({ step }: { step: number }) {
  const reduced = useReducedMotion();
  // step 1: timeline marker jumps to +12 months; reminder message arrives in thread
  // step 2: Emma reply appears in same thread
  // step 3: record header morphs to "Returning customer" + new booking chip
  const returning = step >= 3;

  return (
    <StageCanvas>
      <div className="absolute inset-0 rounded-xl bg-white ring-1 ring-slate-200 flex flex-col overflow-hidden">
        {/* Persistent timeline marker */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Emma Wilson · timeline</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={step >= 1 ? "future" : "now"}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.32, ease: V3_EASE }}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold ring-1 ${
                step >= 1 ? "bg-blue-50 text-blue-700 ring-blue-100" : "bg-slate-100 text-slate-500 ring-slate-200"
              }`}
            >
              <RefreshCw className="h-3 w-3" />{step >= 1 ? "+12 months later" : "Today"}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Same conversation thread as Communicate — one record continues */}
        <div className="flex-1 space-y-2 overflow-hidden px-3 py-3">
          <div className="flex items-end gap-1.5 opacity-60">
            <div className="max-w-[74%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-[12px] leading-snug text-slate-700">
              Thanks Emma — job's all wrapped. Enjoy the cool air!
              <div className="mt-0.5 text-[10px] text-slate-400">Last year</div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {step >= 1 && (
              <motion.div
                key="reminder"
                layout
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
                className="flex items-end gap-1.5"
              >
                <div className="max-w-[74%] rounded-2xl rounded-bl-sm bg-blue-50 px-3 py-2 text-[12.5px] leading-snug text-blue-900 ring-1 ring-blue-100">
                  Hi Emma — your {STORY.serviceShort} is due. Want to book a time?
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-blue-700/70">
                    <Send className="h-2.5 w-2.5" />Automated reminder
                  </div>
                </div>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div
                key="reply"
                layout
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24, delay: 0.05 }}
                className="flex items-end justify-end gap-1.5"
              >
                <div className="max-w-[74%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-2 text-[12.5px] leading-snug text-white">
                  Yes please — {STORY.day} {STORY.time} works.
                </div>
                <CustomerAvatar size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Returning-customer state pinned to bottom — morphs same record */}
        <AnimatePresence>
          {returning && (
            <motion.div
              key="returning-strip"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 26 }}
              className="flex items-center gap-3 border-t border-slate-100 bg-slate-950 px-4 py-3 text-white"
            >
              <CustomerAvatar size={32} />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold">Emma Wilson</div>
                <div className="text-[11px] text-white/60">Same record · rebooking attached</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold ring-1 ring-white/15">
                <RefreshCw className="h-3 w-3" />Returning customer
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </StageCanvas>
  );
}

/* ---------- Stage config with step counts ------------------------- */
type StageDef = {
  key: string; sub: string; label: string;
  nav: NavKey;
  headline: string; body: string;
  steps: number;
  panel: (step: number) => ReactNode;
};

const STAGES: StageDef[] = [
  { key: "capture", sub: "01", label: "Capture", nav: "contacts", steps: 2,
    headline: "Every enquiry becomes one contact record.",
    body: "Emma submits a Facebook lead form for the annual A/C service. Her name, phone, email and service need create one contact record in Zapla — no manual entry, no duplicate.",
    panel: (s) => <PanelCapture step={s} /> },
  { key: "communicate", sub: "02", label: "Communicate", nav: "inbox", steps: 7,
    headline: "Every channel. One conversation.",
    body: "SMS, email, forms and social messages all stay connected to Emma's one record.",
    panel: (s) => <PanelCommunicate step={s} /> },
  { key: "convert", sub: "03", label: "Convert", nav: "quotes", steps: 3,
    headline: "Quote accepted, time chosen, booking confirmed.",
    body: "Emma accepts the quote for the annual A/C service and picks a time. Both attach to her record.",
    panel: (s) => <PanelConvert step={s} /> },
  { key: "operate", sub: "04", label: "Operate", nav: "calendar", steps: 3,
    headline: "The job is scheduled and assigned.",
    body: `The booking lands on ${STORY.day}, ${STORY.staff} is assigned, and the job moves to Scheduled.`,
    panel: (s) => <PanelOperate step={s} /> },
  { key: "retain", sub: "05", label: "Retain", nav: "reviews", steps: 3,
    headline: "Completion triggers the follow-up.",
    body: `Once the job wraps, Zapla sends the review ask and schedules the ${STORY.reminderMonths}-month reminder.`,
    panel: (s) => <PanelRetain step={s} /> },
  { key: "grow", sub: "06", label: "Grow", nav: "campaigns", steps: 3,
    headline: "Twelve months later, Emma comes back.",
    body: "The service-due reminder goes out, Emma rebooks, and she returns as the same record.",
    panel: (s) => <PanelGrow step={s} /> },
];

/* ---------- Sequenced auto-play hook -------------------------------
 * Timing target: complete six-stage journey in ~28–30s.
 *   - first-step reveal: 300ms after stage enters
 *   - subsequent events:  1000ms
 *   - stage linger:       1800ms (last stage: 2500ms before looping to Capture)
 * Cycle math (steps: 2+7+3+3+3+3 = 21):
 *   capture     : 300 + 1×1000 + 1800 = 3100
 *   communicate : 300 + 6×1000 + 1800 = 8100
 *   convert     : 300 + 2×1000 + 1800 = 4100
 *   operate     : 4100
 *   retain      : 4100
 *   grow        : 300 + 2×1000 + 2500 = 4800
 *   total       ≈ 28.3s
 * ------------------------------------------------------------------ */
// Tuned so the full six-stage cycle lands ~24s and loops smoothly to Capture.
// steps: 2+7+3+3+3+3 = 21. Total ≈ 24.1s.
const STEP_FIRST_MS   = 280;
const STEP_BETWEEN_MS = 900;
const STAGE_LINGER_MS = 1300;
const LOOP_LINGER_MS  = 2400;

function useJourneySequence({
  active, runToken, steps, setActive, reduced, paused, stageCount,
}: {
  active: number; runToken: number; steps: number; setActive: (i: number) => void;
  reduced: boolean; paused: boolean; stageCount: number;
}) {
  const [step, setStep] = useState(reduced ? steps : 0);
  const activeRef = useRef(active);

  // Render-time reset when active/runToken/reduced/steps change — the panel
  // that mounts on this same render already sees the fresh step value.
  const lastKeyRef = useRef({ active, runToken, reduced, steps });
  const lastKey = lastKeyRef.current;
  if (lastKey.active !== active || lastKey.runToken !== runToken || lastKey.reduced !== reduced || lastKey.steps !== steps) {
    lastKeyRef.current = { active, runToken, reduced, steps };
    activeRef.current = active;
    setStep(reduced ? steps : 0);
  }

  useEffect(() => {
    if (reduced || paused) return;
    if (step >= steps) {
      const isLast = active === stageCount - 1;
      const linger = isLast ? LOOP_LINGER_MS : STAGE_LINGER_MS;
      const t = window.setTimeout(() => {
        if (activeRef.current !== active) return;
        setActive((active + 1) % stageCount);
      }, linger);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(
      () => setStep((s) => s + 1),
      step === 0 ? STEP_FIRST_MS : STEP_BETWEEN_MS,
    );
    return () => window.clearTimeout(t);
  }, [step, steps, reduced, paused, active, setActive, stageCount, runToken]);

  return step;
}

/* ---------- Persistent record helpers ----------------------------- */

type StatusTone = "slate" | "blue" | "amber" | "emerald" | "violet";
function statusFor(stageIdx: number, step: number): { label: string; tone: StatusTone } {
  if (stageIdx === 0 && step < 1) return { label: "New lead",      tone: "slate"   };
  if (stageIdx === 0)             return { label: "Enquiry",       tone: "blue"    };
  if (stageIdx === 1)             return { label: "In conversation", tone: "blue"  };
  if (stageIdx === 2) {
    if (step >= 3)                return { label: "Booked",        tone: "emerald" };
    if (step >= 1)                return { label: "Quote sent",    tone: "amber"   };
    return                             { label: "Enquiry",       tone: "blue"    };
  }
  if (stageIdx === 3) {
    if (step >= 3)                return { label: "Paid",          tone: "emerald" };
    if (step >= 2)                return { label: "Completed",     tone: "emerald" };
    return                             { label: "Scheduled",     tone: "blue"    };
  }
  if (stageIdx === 4)             return { label: "Customer",      tone: "violet"  };
  if (stageIdx === 5) {
    if (step >= 3)                return { label: "Returning customer", tone: "violet" };
    return                             { label: "Customer",      tone: "violet"  };
  }
  return { label: "Customer", tone: "slate" };
}

type HistoryItem = { id: string; icon: ReactNode; label: string; when: string };
const HISTORY_ITEMS: HistoryItem[] = [
  { id: "e1", icon: <Facebook className="h-3 w-3" />,       label: "Facebook lead captured",   when: "12:03" },
  { id: "e2", icon: <MessageSquare className="h-3 w-3" />,  label: "Conversation started",     when: "12:12" },
  { id: "e3", icon: <FileText className="h-3 w-3" />,       label: "Quote sent",               when: "12:22" },
  { id: "e4", icon: <CalendarIcon className="h-3 w-3" />,   label: "Booked · Thu 2:00 PM",     when: "12:30" },
  { id: "e5", icon: <CheckCircle2 className="h-3 w-3" />,   label: "Job completed · Alex",     when: "Thu 3:15" },
  { id: "e6", icon: <CreditCard className="h-3 w-3" />,     label: "Payment received",         when: "Thu 3:22" },
  { id: "e7", icon: <StarIcon className="h-3 w-3" />,       label: "5-star review received",   when: "Thu 5:40" },
  { id: "e8", icon: <Bell className="h-3 w-3" />,           label: "12-month reminder sent",   when: "+12 mo" },
  { id: "e9", icon: <RefreshCw className="h-3 w-3" />,      label: "Rebooked · returning",     when: "+12 mo" },
];

function historyCountFor(active: number, step: number): number {
  let n = 0;
  if (active > 0 || (active === 0 && step >= 2)) n = 1;
  if (active > 1 || (active === 1 && step >= 2)) n = 2;
  if (active > 2 || (active === 2 && step >= 1)) n = 3;
  if (active > 2 || (active === 2 && step >= 3)) n = 4;
  if (active > 3 || (active === 3 && step >= 2)) n = 5;
  if (active > 3 || (active === 3 && step >= 3)) n = 6;
  if (active > 4 || (active === 4 && step >= 2)) n = 7;
  if (active > 5 || (active === 5 && step >= 1)) n = 8;
  if (active === 5 && step >= 3)                  n = 9;
  return n;
}

const NAV_ITEMS: { key: NavKey; icon: ReactNode; label: string }[] = [
  { key: "inbox",       icon: <MessageSquare className="h-3.5 w-3.5" />, label: "Inbox" },
  { key: "contacts",    icon: <Users className="h-3.5 w-3.5" />,         label: "Contacts" },
  { key: "calendar",    icon: <CalendarIcon className="h-3.5 w-3.5" />,  label: "Calendar" },
  { key: "quotes",      icon: <FileText className="h-3.5 w-3.5" />,      label: "Quotes" },
  { key: "reviews",     icon: <StarIcon className="h-3.5 w-3.5" />,      label: "Reviews" },
  { key: "automations", icon: <Sparkles className="h-3.5 w-3.5" />,      label: "Automations" },
  { key: "campaigns",   icon: <Send className="h-3.5 w-3.5" />,          label: "Campaigns" },
];

export function JourneyV3() {
  const [active, setActive] = useState(0);
  const [runToken, setRunToken] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const stage = STAGES[active];
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const hasEnteredRef = useRef(false);

  const paused = !inView || userPaused;

  const step = useJourneySequence({
    active, runToken, steps: stage.steps, setActive, reduced, paused, stageCount: STAGES.length,
  });

  // Start autoplay only once ~40% of the product frame is visible. Hover /
  // focus inside the section does NOT pause; only explicit play/pause does.
  useEffect(() => {
    const el = frameRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true); hasEnteredRef.current = true; return;
    }
    const VISIBLE = 0.4;
    const io = new IntersectionObserver(([e]) => {
      const visible = e.intersectionRatio >= VISIBLE;
      if (visible && !hasEnteredRef.current) {
        hasEnteredRef.current = true;
        setActive(0);
        setRunToken((t) => t + 1);
      }
      setInView(visible);
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep active chapter in view within the tabs strip.
  useEffect(() => {
    const container = tabsRef.current;
    const el = container?.querySelector<HTMLButtonElement>(`[data-stage="${active}"]`);
    if (!container || !el) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    if (eRect.left < cRect.left || eRect.right > cRect.right) {
      const target = el.offsetLeft - (container.clientWidth - el.clientWidth) / 2;
      container.scrollTo({ left: Math.max(0, target), behavior: reduced ? "auto" : "smooth" });
    }
  }, [active, reduced]);

  const handleSelect = useCallback((i: number) => {
    const clamped = ((i % STAGES.length) + STAGES.length) % STAGES.length;
    if (clamped !== active) setActive(clamped);
    setRunToken((t) => t + 1);
  }, [active]);

  const togglePlay = () => setUserPaused((p) => !p);

  // Keyboard left/right navigates chapters while the section is on-screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      const sec = sectionRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === "ArrowRight") { e.preventDefault(); handleSelect(active + 1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); handleSelect(active - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, handleSelect]);

  const growComplete = active === STAGES.length - 1 && (reduced || step >= stage.steps);

  const status = statusFor(active, step);
  const historyVisible = historyCountFor(active, step);

  return (
    <section ref={sectionRef} className="bg-slate-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>The platform</Eyebrow>
          <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            One product, six stages of the customer journey.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The same connected workspace, from first enquiry to repeat customer. Follow Emma Wilson through every stage.
          </p>
        </div>

        {/* Chapter selector + single play/pause */}
        <div className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            ref={tabsRef}
            className="v3-journey-tabs -mx-6 overflow-x-auto px-6 sm:overflow-visible sm:mx-0 sm:px-0 zapla-scroll-hide"
            role="tablist"
            aria-label="Customer journey stage"
          >
            <div className="flex min-w-max items-center gap-1 rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] sm:min-w-0">
              {STAGES.map((s, i) => {
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <button
                    key={s.key}
                    data-stage={i}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Stage ${s.sub}: ${s.label}`}
                    onClick={() => handleSelect(i)}
                    className={`relative flex items-center gap-1.5 rounded-full px-3.5 sm:px-5 py-2 text-[12px] sm:text-[13px] font-semibold transition-colors ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : isDone
                        ? "text-slate-800 hover:text-slate-950"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className={`font-mono text-[10px] ${isActive ? "text-white/70" : isDone ? "text-blue-600" : "text-slate-400"}`}>{s.sub}</span>
                    {s.label}
                    {isDone && <CheckCircle2 className="h-3 w-3 text-blue-600" aria-hidden />}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={userPaused ? "Play journey" : "Pause journey"}
            aria-pressed={userPaused}
            className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200 hover:text-slate-950 hover:ring-slate-300 transition-colors sm:self-auto"
          >
            {userPaused
              ? <><Play className="h-3.5 w-3.5" />Play</>
              : <><Pause className="h-3.5 w-3.5" />Pause</>}
          </button>
        </div>

        {/* One continuous progress bar across all stages */}
        <div className="mt-5 mx-auto max-w-3xl h-[3px] overflow-hidden rounded-full bg-slate-200" aria-hidden>
          <div
            className="h-full rounded-full bg-blue-600 transition-[width] duration-500 ease-out"
            style={{
              width: `${(((active + Math.min(1, step / Math.max(1, stage.steps))) / STAGES.length) * 100).toFixed(2)}%`,
            }}
          />
        </div>

        {/* Side copy + persistent workspace */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="text-[11px] font-mono text-slate-400">{stage.sub} / 06 · {stage.label}</div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stage.key}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
                transition={reduced ? { duration: 0 } : { duration: 0.28, ease: V3_EASE }}
              >
                <h3 className="mt-2 font-zapla text-2xl sm:text-[28px] font-semibold text-slate-950 leading-[1.15]">{stage.headline}</h3>
                <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{stage.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <div ref={frameRef} className="overflow-hidden rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
              {/* Product chrome */}
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
                <div className="mx-auto inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
                  <Globe className="h-3 w-3" />
                  my.zapla.io
                </div>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">SM</span>
              </div>

              <div className="flex min-h-[560px]">
                {/* Persistent left nav — active area matches stage */}
                <aside className="hidden sm:flex w-[152px] flex-col gap-0.5 border-r border-slate-100 bg-white p-3">
                  <div className="mb-3 flex items-center gap-2 px-1">
                    <img src={logoBlue.url} alt="" className="h-6 w-6 rounded-md" />
                    <span className="text-[13px] font-semibold text-slate-900">Zapla</span>
                  </div>
                  {NAV_ITEMS.map((n) => {
                    const isActive = n.key === stage.nav;
                    return (
                      <div key={n.key} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${isActive ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600"}`}>
                        {n.icon}{n.label}
                      </div>
                    );
                  })}
                </aside>

                {/* Persistent Emma Wilson record — never unmounts, status + history grow in place */}
                <aside className="hidden md:flex w-[240px] shrink-0 flex-col border-r border-slate-100 bg-slate-50/40">
                  <div className="border-b border-slate-100 bg-white px-4 py-4">
                    <div className="flex items-center gap-3">
                      <CustomerAvatar size={40} />
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-semibold text-slate-900 truncate">Emma Wilson</div>
                        <div className="text-[11px] text-slate-500 truncate">Local area</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={status.label}
                          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
                          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
                          transition={reduced ? { duration: 0 } : { duration: 0.3, ease: V3_EASE }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ring-1 ${toneClasses(status.tone)}`}
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {status.label}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <div className="mt-3 space-y-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />+61 4•• ••• •••</div>
                      <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />emma.wilson@northline.com.au</div>
                      <div className="flex items-center gap-1.5"><Wrench className="h-3 w-3" />Annual A/C service</div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">History</div>
                      <div className="text-[10px] text-slate-400">{historyVisible} event{historyVisible === 1 ? "" : "s"}</div>
                    </div>
                    <ol className="mt-3 space-y-2">
                      <AnimatePresence initial={false}>
                        {HISTORY_ITEMS.slice(0, historyVisible).map((h) => (
                          <motion.li
                            key={h.id}
                            layout
                            initial={reduced ? { opacity: 1 } : { opacity: 0, x: -6 }}
                            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
                            transition={reduced ? { duration: 0 } : { duration: 0.36, ease: V3_EASE }}
                            className="flex items-start gap-2 text-[11.5px] text-slate-700"
                          >
                            <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-white text-slate-500 ring-1 ring-slate-200">{h.icon}</span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate">{h.label}</span>
                              <span className="block text-[10px] text-slate-400">{h.when}</span>
                            </span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ol>
                  </div>
                </aside>

                {/* Activity area — the workspace transforms per stage while Emma persists */}
                <div className="flex-1 min-w-0 bg-white">
                  <div className="relative" style={{ height: STAGE_H + 40 }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={`${stage.key}-${runToken}`}
                        className="absolute inset-0 p-4 sm:p-5"
                        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.99 }}
                        animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6, scale: 0.99 }}
                        transition={reduced ? { duration: 0 } : { duration: 0.36, ease: V3_EASE }}
                      >
                        {stage.panel(step)}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Payoff + CTA — reveal only after Grow completes; loops back to Capture underneath */}
            <div
              className={`mt-6 transition-all duration-500 ease-out ${
                growComplete
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              } motion-reduce:transition-none`}
              aria-live="polite"
            >
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)]">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] font-semibold text-slate-900">
                  <span>Enquiry</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>booked</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>completed</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>paid</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>reviewed</span><ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  <span>returned</span>
                </div>
                <a
                  href={BOOK_URL}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-700 hover:text-blue-900"
                >
                  See how Zapla would connect your customer journey
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .v3-crossfade { animation: v3fade 380ms ease-out both; }
        @keyframes v3fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .v3-crossfade { animation: none; } }
      `}</style>
    </section>
  );
}


/* =====================================================================
 *  SECTION 2 — AutomationStoryV3
 *  How Zapla handles the call. Two paths, one outcome.
 * ===================================================================== */

export function AutomationStoryV3() {
  const [mode, setMode] = useState<"routine" | "urgent">("routine");
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>Automation</Eyebrow>
          <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Every call answered by intent, not by the clock.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Voice AI identifies what the caller needs. Routine calls are handled and booked. Urgent or human-requested calls transfer to a live person on your configured on-call destination.
          </p>
        </div>

        {/* Intent toggle */}
        <div className="mt-8 inline-flex rounded-full bg-slate-100 p-1 text-[13px] font-semibold" role="tablist" aria-label="Call intent">
          {[
            { k: "routine", label: "Routine call" },
            { k: "urgent",  label: "Urgent / human requested" },
          ].map((o) => {
            const isActive = mode === o.k;
            return (
              <button
                key={o.k}
                role="tab"
                aria-selected={isActive}
                onClick={() => setMode(o.k as "routine" | "urgent")}
                className={`rounded-full px-4 py-1.5 transition ${isActive ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500"}`}
              >{o.label}</button>
            );
          })}
        </div>

        <div className="mt-10 rounded-[28px] bg-gradient-to-br from-blue-50/60 via-white to-slate-50 ring-1 ring-slate-200 p-6 sm:p-10">
          <AutomationDiagram mode={mode} reduced={reduced} />
        </div>

        <p className="mt-6 max-w-2xl text-[13.5px] text-slate-500">
          Optional backup mode: team rings first; AI answers after the configured timeout. Intents, destinations and routing are configurable per team. Not confused with Agent Transfer, this is HighLevel Call Transfer to a real phone destination.
        </p>
      </div>
    </section>
  );
}

function AutomationDiagram({ mode, reduced }: { mode: "routine" | "urgent"; reduced: boolean }) {
  const activePath = mode === "routine" ? "A" : "B";
  return (
    <>
      {/* Desktop diagram */}
      <div className="relative hidden md:block">
        <svg viewBox="0 0 900 620" className="w-full h-auto">
          <defs>
            <linearGradient id="v3wire" x1="0" x2="1">
              <stop offset="0" stopColor="#2563eb" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path d="M450 130 L450 210" stroke="#cbd5e1" strokeWidth="2" fill="none" />
          <path d="M450 300 C 450 370, 220 370, 220 420" stroke={activePath === "A" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "A" ? 3 : 2} fill="none" />
          <path d="M450 300 C 450 370, 680 370, 680 420" stroke={activePath === "B" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "B" ? 3 : 2} fill="none" />
          <path d="M220 540 C 220 590, 450 590, 450 585" stroke={activePath === "A" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "A" ? 3 : 2} fill="none" />
          <path d="M680 540 C 680 590, 450 590, 450 585" stroke={activePath === "B" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "B" ? 3 : 2} fill="none" />
        </svg>

        <div className="absolute inset-0">
          <div className="absolute" style={{ left: "50%", top: "0%", transform: "translateX(-50%)", width: 340 }}>
            <IncomingCallCard reduced={reduced} />
          </div>

          <NodeBox style={{ left: "50%", top: "34%", transform: "translateX(-50%)" }}>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-white"><Sparkles className="h-4 w-4" /></span>
              <div>
                <div className="text-[13px] font-semibold text-slate-900">Voice AI identifies intent</div>
                <div className="text-[11.5px] text-slate-500">Listens, understands and routes on intent</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11.5px] text-slate-600 ring-1 ring-slate-100">
              <span className={`h-1.5 w-1.5 rounded-full ${mode === "routine" ? "bg-emerald-500" : "bg-rose-500"}`} />
              {mode === "routine"
                ? "Detected: routine enquiry — AI handles"
                : "Detected: urgent / human requested — transfer"}
            </div>
          </NodeBox>

          {/* Routine — AI handles */}
          <NodeBox active={activePath === "A"} style={{ left: "24%", top: "68%", transform: "translateX(-50%)" }} tone="blue" w={280}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">Routine call</div>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold text-blue-700 ring-1 ring-blue-100">Zapla AI</span>
            </div>
            <div className="mt-1 text-[13.5px] font-semibold text-slate-900">AI answers, captures details, can book</div>
            <div className="mt-2 space-y-1.5">
              <TranscriptLine who="ai">Hi, this is Zapla for your business.</TranscriptLine>
              <TranscriptLine who="caller">I'd like to book a tap repair.</TranscriptLine>
              <TranscriptLine who="ai">Understood. Thursday 2pm works — shall I book it?</TranscriptLine>
            </div>
          </NodeBox>

          {/* Urgent — live human transfer */}
          <NodeBox active={activePath === "B"} style={{ left: "76%", top: "68%", transform: "translateX(-50%)" }} tone="emerald" w={280}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Urgent / human requested</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />Live human
              </span>
            </div>
            <div className="mt-1 text-[13.5px] font-semibold text-slate-900">Call Transfer to on-call destination</div>
            <div className="mt-0.5 text-[11.5px] text-slate-500">Configured on-call/team destination · real phone number</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex -space-x-2">
                <TeamAvatar initials="T1" tone="#0ea5e9" />
                <TeamAvatar initials="T2" tone="#10b981" />
                <TeamAvatar initials="T3" tone="#6366f1" />
              </div>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-emerald-200">Ringing team</span>
            </div>
          </NodeBox>

          <NodeBox style={{ left: "50%", top: "94%", transform: "translateX(-50%)" }} tone="blue" w={320}>
            <div className="flex items-center gap-3">
              <PortraitAvatar size={38} />
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-slate-900">Emma Wilson · one contact record</div>
                <div className="text-[11.5px] text-slate-500 truncate">Transcript + summary saved · team notified</div>
              </div>
              <span className="ml-auto grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-200"><CheckCircle2 className="h-4 w-4" /></span>
            </div>
          </NodeBox>
        </div>
      </div>

      {/* Mobile stack */}
      <div className="grid gap-3 md:hidden">
        <IncomingCallCard reduced={reduced} mobile />
        <Connector />
        <NodeBoxMobile>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-white"><Sparkles className="h-4 w-4" /></span>
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Voice AI identifies intent</div>
              <div className="text-[11px] text-slate-500">{mode === "routine" ? "Detected: routine enquiry" : "Detected: urgent / human requested"}</div>
            </div>
          </div>
        </NodeBoxMobile>
        <Connector />
        <div className="grid grid-cols-2 gap-3">
          <NodeBoxMobile active={activePath === "A"} tone="blue">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">Routine call</div>
            <div className="mt-1 text-[12.5px] font-semibold text-slate-900">AI answers &amp; books</div>
            <div className="mt-2 text-[11px] text-slate-600">"Thursday 2pm — shall I book it?"</div>
          </NodeBoxMobile>

          <NodeBoxMobile active={activePath === "B"} tone="emerald">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Urgent · human</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                <span className="h-1 w-1 rounded-full bg-white" />Live
              </span>
            </div>
            <div className="mt-1 text-[12.5px] font-semibold text-slate-900">Call Transfer to on-call</div>
            <div className="mt-2 flex -space-x-2">
              <TeamAvatar initials="T1" tone="#0ea5e9" size={22} />
              <TeamAvatar initials="T2" tone="#10b981" size={22} />
              <TeamAvatar initials="T3" tone="#6366f1" size={22} />
            </div>
          </NodeBoxMobile>
        </div>
        <Connector />
        <NodeBoxMobile tone="blue">
          <div className="flex items-center gap-3">
            <PortraitAvatar size={34} />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-slate-900">One contact record</div>
              <div className="text-[11px] text-slate-500 truncate">Transcript saved · team notified</div>
            </div>
            <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" />
          </div>
        </NodeBoxMobile>
      </div>

      {!reduced && (
        <style>{`
          @keyframes v3pulse { 0%,100%{ box-shadow: 0 0 0 0 rgba(37,99,235,0.35);} 50%{ box-shadow: 0 0 0 10px rgba(37,99,235,0);} }
          .v3-node-active { animation: v3pulse 2.2s ease-out infinite; }
          @keyframes v3ring { 0%{ transform: scale(0.9); opacity: 0.7;} 80%{ transform: scale(1.6); opacity: 0;} 100%{ transform: scale(1.6); opacity: 0;} }
          .v3-ring::before, .v3-ring::after { content: ""; position: absolute; inset: 0; border-radius: 9999px; border: 2px solid rgba(37,99,235,0.45); animation: v3ring 1.8s ease-out infinite; }
          .v3-ring::after { animation-delay: 0.9s; }
          @keyframes v3wave { 0%,100%{ transform: scaleY(0.4);} 50%{ transform: scaleY(1);} }
          .v3-wave > span { display:inline-block; width: 2px; height: 14px; margin-right: 2px; background: linear-gradient(180deg,#2563eb,#22d3ee); border-radius: 2px; transform-origin: bottom; animation: v3wave 1s ease-in-out infinite; }
          .v3-wave > span:nth-child(2){ animation-delay: 0.1s; height: 18px; }
          .v3-wave > span:nth-child(3){ animation-delay: 0.2s; height: 10px; }
          .v3-wave > span:nth-child(4){ animation-delay: 0.15s; height: 20px; }
          .v3-wave > span:nth-child(5){ animation-delay: 0.05s; height: 12px; }
          .v3-wave > span:nth-child(6){ animation-delay: 0.25s; height: 16px; }
          .v3-wave > span:nth-child(7){ animation-delay: 0.3s; height: 8px; }
        `}</style>
      )}
    </>
  );
}


function IncomingCallCard({ reduced, mobile = false }: { reduced: boolean; mobile?: boolean }) {
  return (
    <div className={`relative rounded-2xl bg-white p-4 ring-1 ring-blue-200 shadow-[0_24px_50px_-24px_rgba(37,99,235,0.35)] ${mobile ? "" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-blue-700 ring-1 ring-blue-100">
          <Phone className="h-3 w-3" /> Incoming call
        </div>
        <div className="text-[11px] text-slate-400">04•• ••• •••</div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className={`relative ${reduced ? "" : "v3-ring"}`} style={{ width: 56, height: 56 }}>
          <PortraitAvatar size={56} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-slate-900">Emma Wilson</div>
          <div className="text-[11.5px] text-slate-500">Calling your business</div>
        </div>
        {!reduced && (
          <div className="v3-wave flex items-end" aria-hidden>
            <span /><span /><span /><span /><span /><span /><span />
          </div>
        )}
      </div>
      <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[12px] text-slate-600 ring-1 ring-slate-100">
        <span className="font-semibold text-slate-800">Reason:</span> Needs help with a job today.
      </div>
    </div>
  );
}

function TranscriptLine({ who, children }: { who: "ai" | "caller"; children: ReactNode }) {
  const isAI = who === "ai";
  return (
    <div className={`flex items-start gap-1.5 text-[11.5px] leading-snug ${isAI ? "text-slate-900" : "text-slate-600"}`}>
      <span className={`mt-0.5 shrink-0 rounded px-1 py-px text-[9.5px] font-semibold uppercase tracking-wider ${isAI ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}>{isAI ? "AI" : "Caller"}</span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function NodeBox({ children, style, active = false, tone = "slate", w = 260 }: { children: ReactNode; style?: React.CSSProperties; active?: boolean; tone?: "slate" | "blue" | "emerald" | "violet"; w?: number }) {
  const ring = tone === "blue" ? "ring-blue-200" : tone === "emerald" ? "ring-emerald-200" : tone === "violet" ? "ring-blue-200" : "ring-slate-200";
  return (
    <div style={{ width: w, ...style }} className={`absolute rounded-2xl bg-white p-4 ring-1 ${ring} shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] ${active ? "v3-node-active" : ""}`}>
      {children}
    </div>
  );
}
function NodeBoxMobile({ children, active = false, tone = "slate" }: { children: ReactNode; active?: boolean; tone?: "slate" | "blue" | "emerald" | "violet" }) {
  const ring = tone === "blue" ? "ring-blue-200" : tone === "emerald" ? "ring-emerald-200" : tone === "violet" ? "ring-blue-200" : "ring-slate-200";
  return (
    <div className={`rounded-2xl bg-white p-4 ring-1 ${ring} ${active ? "shadow-[0_0_0_3px_rgba(37,99,235,0.15)]" : ""}`}>
      {children}
    </div>
  );
}
function Connector() {
  return <div className="mx-auto h-6 w-px bg-gradient-to-b from-slate-300 to-transparent" aria-hidden />;
}


/* =====================================================================
 *  SECTION 3 — ProfessionCarouselV3
 *  Editorial 5-slide carousel. Default: Professional services.
 * ===================================================================== */

type Slide = {
  key: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  accent: { chip: string; bg: string; ring: string; text: string; dot: string };
  image: string;
  headline: string;
  body: string;
  journey: string[];
  outcome: ReactNode;
};

const SLIDES: Slide[] = [
  {
    key: "pro",
    label: "Professional services",
    Icon: Briefcase,
    accent: { chip: "bg-blue-50 text-blue-700 ring-blue-100", bg: "from-blue-50/70 via-white to-white", ring: "ring-blue-100", text: "text-blue-800", dot: "bg-blue-500" },
    image: industryLegal.url,
    headline: "Enquiry to qualified consultation.",
    body: "Capture the enquiry, screen it in one thread, and get the right lead on the calendar with context.",
    journey: ["Enquiry", "Qualified", "Consultation booked"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Consultation</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Marcus Lee · Tue 10:00 AM</div>
        <div className="mt-1 text-[12px] text-slate-500">Intake notes attached, advisor assigned</div>
      </div>
    ),
  },
  {
    key: "property",
    label: "Property & real estate",
    Icon: HomeIcon,
    accent: { chip: "bg-emerald-50 text-emerald-700 ring-emerald-100", bg: "from-emerald-50/70 via-white to-white", ring: "ring-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" },
    image: industryRealEstate.url,
    headline: "Lead to nurture to appraisal or inspection.",
    body: "Enquiries enter a nurture sequence and land on an appraisal or inspection without dropping context.",
    journey: ["Lead", "Nurture", "Appraisal or inspection"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Inspection booked</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">12 Harbour Lane · Thu 4:30 PM</div>
        <div className="mt-1 text-[12px] text-slate-500">Agent assigned, reminders queued</div>
      </div>
    ),
  },
  {
    key: "mortgage",
    label: "Mortgage brokers & finance",
    Icon: Building2,
    accent: { chip: "bg-indigo-50 text-indigo-700 ring-indigo-100", bg: "from-indigo-50/70 via-white to-white", ring: "ring-indigo-100", text: "text-indigo-800", dot: "bg-indigo-500" },
    image: industryMortgage.url,
    headline: "Enquiry to documents to appointment.",
    body: "Enquiries turn into a guided document request and land on the broker's calendar, fully prepped.",
    journey: ["Enquiry", "Documents collected", "Appointment booked"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Appointment</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Priya Shah · Wed 2:00 PM</div>
        <div className="mt-1 text-[12px] text-slate-500">Payslips and ID uploaded, checklist complete</div>
      </div>
    ),
  },
  {
    key: "health",
    label: "Allied health & clinics",
    Icon: HeartPulse,
    accent: { chip: "bg-teal-50 text-teal-700 ring-teal-100", bg: "from-teal-50/70 via-white to-white", ring: "ring-teal-100", text: "text-teal-800", dot: "bg-teal-500" },
    image: industryHealthcare.url,
    headline: "Booking to reminder to rebooking.",
    body: "Patients book online, get reminded and rebook with one tap. Every touch stays on file.",
    journey: ["Booking", "Reminder", "Rebooking"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Reminder sent</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Olivia Chen · 24h check-in</div>
        <div className="mt-1 text-[12px] text-slate-500">One-tap rebook enabled</div>
      </div>
    ),
  },
  {
    key: "fitness",
    label: "Fitness & studios",
    Icon: Dumbbell,
    accent: { chip: "bg-violet-50 text-violet-700 ring-violet-100", bg: "from-violet-50/70 via-white to-white", ring: "ring-violet-100", text: "text-violet-800", dot: "bg-violet-500" },
    image: industryFitness.url,
    headline: "Trial enquiry to the right class to follow-up.",
    body: "Trial enquiries route to the nearest location or class, get an intro reply and a follow-up on the calendar.",
    journey: ["Trial enquiry", "Location or class routed", "Follow-up scheduled"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Trial booked</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Daniel Nguyen · Sat 8:00 AM class</div>
        <div className="mt-1 text-[12px] text-slate-500">Follow-up scheduled in 3 days</div>
      </div>
    ),
  },
  {
    key: "trades",
    label: "Trades & home services",
    Icon: Wrench,
    accent: { chip: "bg-amber-50 text-amber-700 ring-amber-100", bg: "from-amber-50/70 via-white to-white", ring: "ring-amber-100", text: "text-amber-800", dot: "bg-amber-500" },
    image: industryTrades.url,
    headline: "Missed call to site visit to quote follow-up.",
    body: "Field teams live on the phone. Zapla replies, books the site visit and chases the quote in one thread.",
    journey: ["Missed call", "Site visit booked", "Quote follow-up"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Site visit</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Emma Wilson · Thu 2:00 PM</div>
        <div className="mt-1 text-[12px] text-slate-500">Assigned to on-call tech, quote pending</div>
      </div>
    ),
  },
  {
    key: "automotive",
    label: "Automotive & workshops",
    Icon: Car,
    accent: { chip: "bg-rose-50 text-rose-700 ring-rose-100", bg: "from-rose-50/70 via-white to-white", ring: "ring-rose-100", text: "text-rose-800", dot: "bg-rose-500" },
    image: industryAutomotive.url,
    headline: "Booking request to job details to service reminder.",
    body: "Bookings capture the vehicle and job in one form, then a service reminder brings the customer back.",
    journey: ["Booking request", "Vehicle & job details", "Service reminder"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Service booked</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Marcus Lee · Mon 9:00 AM</div>
        <div className="mt-1 text-[12px] text-slate-500">Log book service, reminder set for 6 months</div>
      </div>
    ),
  },
  {
    key: "hospitality",
    label: "Hospitality & short-stay",
    Icon: BedDouble,
    accent: { chip: "bg-cyan-50 text-cyan-700 ring-cyan-100", bg: "from-cyan-50/70 via-white to-white", ring: "ring-cyan-100", text: "text-cyan-800", dot: "bg-cyan-500" },
    image: industryAirbnb.url,
    headline: "Guest enquiry to stay comms to return offer.",
    body: "Enquiries turn into a confirmed stay with automatic check-in messages and a return offer after checkout.",
    journey: ["Guest enquiry", "Stay communications", "Review or return offer"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Return offer sent</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Priya Shah · 2-night booking</div>
        <div className="mt-1 text-[12px] text-slate-500">Review request queued, repeat-guest discount</div>
      </div>
    ),
  },
];

export function ProfessionCarouselV3() {
  const [i, setI] = useState(0); // Professional services default
  const s = SLIDES[i];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const go = (n: number) => {
    const nextIdx = ((n % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setI(nextIdx);
    // Bring the newly-active tab into view on narrow screens
    const el = tabRefs.current[nextIdx];
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <section className="bg-slate-50 py-24 sm:py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <Eyebrow>Solutions</Eyebrow>
          <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Built for the way service businesses actually work.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Different industries. The same pressure: respond quickly, keep work moving and bring customers back.
          </p>
        </div>

        {/* Profession tabs — mobile: horizontal rail with soft edge fade; desktop: centered wrap, no mask */}
        <div
          className="v3-industry-tabs mt-10 -mx-6 overflow-x-auto px-8 md:overflow-visible md:mx-0 md:px-0 zapla-scroll-hide"
          role="tablist"
          aria-label="Profession"
        >
          <div className="flex min-w-max items-center justify-start gap-2 md:min-w-0 md:flex-wrap md:justify-center">
            {SLIDES.map((sl, idx) => {
              const isActive = idx === i;
              const Icon = sl.Icon;
              return (
                <button
                  key={sl.key}
                  ref={(el) => { tabRefs.current[idx] = el; }}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => go(idx)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold transition ${isActive ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900"}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {sl.label}
                </button>
              );
            })}
          </div>
        </div>


        {/* Carousel stage — stable height, no clipping neighbors */}
        <div className="relative mt-10">
          <article
            key={s.key}
            className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${s.accent.bg} ring-1 ${s.accent.ring} shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] v3-crossfade min-h-[664px] sm:min-h-[620px] lg:min-h-[460px]`}
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr] items-stretch h-full">
              {/* Visual — fixed compact height so different slides never resize the card */}
              <div className="relative h-[220px] sm:h-[260px] lg:h-auto w-full overflow-hidden lg:rounded-l-[28px] rounded-t-[28px] lg:rounded-tr-none">
                <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                {/* small outcome overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-[280px] rounded-2xl bg-white/95 p-3 ring-1 ring-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur">
                  {s.outcome}
                </div>
              </div>
              {/* Copy */}
              <div className="p-6 sm:p-10 lg:pr-10 lg:py-10 flex flex-col">
                <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ${s.accent.chip}`}>
                  <s.Icon className="h-3.5 w-3.5" /> {s.label}
                </span>
                <h3 className="mt-4 font-zapla text-2xl sm:text-[30px] font-semibold text-slate-950 leading-tight">
                  {s.headline}
                </h3>
                <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{s.body}</p>

                {/* Journey pills */}
                <ol className="mt-6 flex flex-wrap items-center gap-2">
                  {s.journey.map((j, idx) => (
                    <li key={j} className="inline-flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-slate-800 ring-1 ring-slate-200">
                        <span className={`h-1.5 w-1.5 rounded-full ${s.accent.dot}`} />{j}
                      </span>
                      {idx < s.journey.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
                    </li>
                  ))}
                </ol>

                <div className="mt-auto pt-6">
                  <a href={BOOK_URL} className={`inline-flex items-center gap-1.5 text-[13px] font-semibold ${s.accent.text} hover:text-slate-950`}>
                    See how it works <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => go(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-slate-900" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Previous profession" onClick={() => go(i - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button aria-label="Next profession" onClick={() => go(i + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white hover:bg-slate-800">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .v3-industry-tabs { -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 20px, #000 calc(100% - 20px), transparent 100%); mask-image: linear-gradient(90deg, transparent 0, #000 20px, #000 calc(100% - 20px), transparent 100%); }
        }
      `}</style>
    </section>
  );
}

/* =====================================================================
 *  SECTION 4 — OneRecordV3
 *  Inputs → one customer record → outputs. No app logo pile.
 * ===================================================================== */

export function OneRecordV3() {
  const inputs = [
    { Icon: PhoneMissed, label: "Missed call", tone: "text-rose-500 bg-rose-50 ring-rose-100" },
    { Icon: FileText,    label: "Website form", tone: "text-blue-600 bg-blue-50 ring-blue-100" },
    { Icon: Instagram,   label: "Instagram DM", tone: "text-fuchsia-600 bg-fuchsia-50 ring-fuchsia-100" },
    { Icon: Users,       label: "Referral", tone: "text-emerald-600 bg-emerald-50 ring-emerald-100" },
  ];
  const outputs = [
    { Icon: MessageSquare, label: "Conversation" },
    { Icon: FileText,      label: "Quote" },
    { Icon: CalendarIcon,  label: "Booking" },
    { Icon: CreditCard,    label: "Payment" },
    { Icon: StarIcon,      label: "Review" },
    { Icon: RefreshCw,     label: "Repeat service" },
  ];

  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const inputPortRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const outputPortRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const recordLeftPortRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const recordRightPortRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [inPaths, setInPaths] = useState<string[]>([]);
  const [outPaths, setOutPaths] = useState<string[]>([]);
  const [pulsePath, setPulsePath] = useState<string>("");

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const compute = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const cRect = wrap.getBoundingClientRect();
      const w = cRect.width, h = cRect.height;
      if (w < 1024) { setBox(null); setInPaths([]); setOutPaths([]); setPulsePath(""); return; }
      const center = (el: Element | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.left - cRect.left + r.width / 2, y: r.top - cRect.top + r.height / 2 };
      };
      const smooth = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        const mx = (a.x + b.x) / 2;
        return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
      };
      const nextIn: string[] = [];
      const nextOut: string[] = [];
      inputPortRefs.current.forEach((el, i) => {
        const a = center(el); const b = center(recordLeftPortRefs.current[i]);
        if (a && b) nextIn.push(smooth(a, b));
      });
      outputPortRefs.current.forEach((el, i) => {
        const a = center(recordRightPortRefs.current[i]); const b = center(el);
        if (a && b) nextOut.push(smooth(a, b));
      });
      setBox({ w, h });
      setInPaths(nextIn);
      setOutPaths(nextOut);
      // pulse path: input[0] -> left port[0], then across record (aligned pair), then right port[0] -> output[0]
      const p1a = center(inputPortRefs.current[0]);
      const p1b = center(recordLeftPortRefs.current[0]);
      const p2a = center(recordRightPortRefs.current[0]);
      const p2b = center(outputPortRefs.current[0]);
      if (p1a && p1b && p2a && p2b) {
        setPulsePath(`${smooth(p1a, p1b)} L ${p2a.x} ${p2a.y} ${smooth(p2a, p2b).replace(/^M[^C]+/, "")}`);
      }
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    window.addEventListener("resize", compute);
    // recompute after fonts load
    (document as any).fonts?.ready?.then?.(compute).catch?.(() => {});
    const t = window.setTimeout(compute, 250);
    return () => { ro.disconnect(); window.removeEventListener("resize", compute); window.clearTimeout(t); };
  }, []);

  const port = "inline-block h-2.5 w-2.5 rounded-full bg-white ring-2 ring-blue-500 shadow-[0_0_0_2px_rgba(255,255,255,0.9)]";

  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>One record</Eyebrow>
          <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            One customer. One record. Every interaction connected.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Calls, forms, messages, bookings, payments and follow-ups stay attached to the same customer.
          </p>
        </div>

        {/* Desktop layout with SVG connectors */}
        <div
          ref={wrapRef}
          className="relative mt-14 hidden lg:grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)_minmax(0,220px)] items-center"
        >
          {/* SVG connector layer — behind cards (z-0), cards sit at z-10 */}
          {box && (
            <svg
              className="pointer-events-none absolute inset-0 z-0"
              width={box.w}
              height={box.h}
              viewBox={`0 0 ${box.w} ${box.h}`}
              aria-hidden
            >
              <defs>
                <linearGradient id="v3lineIn" x1="0" x2="1">
                  <stop offset="0" stopColor="#93c5fd" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="v3lineOut" x1="0" x2="1">
                  <stop offset="0" stopColor="#2563eb" />
                  <stop offset="1" stopColor="#93c5fd" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              {inPaths.map((d, i) => (
                <path key={`i${i}`} d={d} stroke="url(#v3lineIn)" strokeWidth="1.6" fill="none" />
              ))}
              {outPaths.map((d, i) => (
                <path key={`o${i}`} d={d} stroke="url(#v3lineOut)" strokeWidth="1.6" fill="none" />
              ))}
              {pulsePath && !reduced && (
                <path
                  d={pulsePath}
                  stroke="#2563eb"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="60 9999"
                  className="v3-onepath-pulse"
                />
              )}
            </svg>
          )}

          {/* Inputs */}
          <div className="relative z-10 grid gap-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 lg:text-right">Inputs</div>
            {inputs.map((n, i) => (
              <div key={n.label} className="v3-reveal relative flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 ring-1 ring-slate-200 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)]">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${n.tone}`}><n.Icon className="h-4 w-4" /></span>
                <span className="text-[13px] font-medium text-slate-800">{n.label}</span>
                <span
                  ref={(el) => { inputPortRefs.current[i] = el; }}
                  className={`${port} absolute right-[-5px] top-1/2 -translate-y-1/2`}
                  aria-hidden
                />
              </div>
            ))}
          </div>

          {/* Central record */}
          <div className="relative z-10">
            <div className="relative rounded-[24px] bg-white p-5 ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
              {/* left ports (4, aligned to inputs) */}
              <div className="pointer-events-none absolute left-0 top-0 h-full">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    ref={(el) => { recordLeftPortRefs.current[i] = el; }}
                    className={`${port} absolute -left-[5px]`}
                    style={{ top: `${18 + i * (64 / 3)}%`, transform: "translateY(-50%)" }}
                    aria-hidden
                  />
                ))}
              </div>
              {/* right ports (6, aligned to outputs) */}
              <div className="pointer-events-none absolute right-0 top-0 h-full">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    ref={(el) => { recordRightPortRefs.current[i] = el; }}
                    className={`${port} absolute -right-[5px]`}
                    style={{ top: `${12 + i * (76 / 5)}%`, transform: "translateY(-50%)" }}
                    aria-hidden
                  />
                ))}
              </div>

              <EmmaRecordHeader />
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Activity</div>
                  <div className="mt-2 space-y-1.5 text-[12.5px] text-slate-700">
                    <div className="flex items-center gap-2"><PhoneMissed className="h-3 w-3 text-rose-500" /> Missed call · 12:04</div>
                    <div className="flex items-center gap-2"><MessageSquare className="h-3 w-3 text-blue-600" /> SMS reply sent</div>
                    <div className="flex items-center gap-2"><CalendarIcon className="h-3 w-3 text-emerald-600" /> Booking · Thu 2:00 PM</div>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Next action</div>
                  <div className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-slate-900"><Send className="h-3.5 w-3.5 text-blue-600" />Send confirmation</div>
                  <div className="mt-1 text-[12px] text-slate-500">Auto-scheduled 30 min before job</div>
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="relative z-10 grid gap-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Connected to</div>
            {outputs.map((n, i) => (
              <div key={n.label} className="v3-reveal relative flex items-center gap-3 rounded-2xl bg-slate-50 p-3 pl-5 ring-1 ring-slate-200">
                <span
                  ref={(el) => { outputPortRefs.current[i] = el; }}
                  className={`${port} absolute left-[-5px] top-1/2 -translate-y-1/2`}
                  aria-hidden
                />
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-700 ring-1 ring-slate-200"><n.Icon className="h-4 w-4" /></span>
                <span className="text-[13px] font-medium text-slate-800">{n.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-desktop: clean vertical sequence with short local connectors */}
        <div className="mt-12 grid gap-6 lg:hidden">
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Inputs</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {inputs.map((n) => (
                <div key={n.label} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-slate-200 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.15)]">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl ring-1 ${n.tone}`}><n.Icon className="h-4 w-4" /></span>
                  <span className="text-[13px] font-medium text-slate-800">{n.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto h-8 w-px bg-slate-200" aria-hidden />
          <div className="rounded-[24px] bg-white p-5 ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            <EmmaRecordHeader />
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Activity</div>
                <div className="mt-2 space-y-1.5 text-[12.5px] text-slate-700">
                  <div className="flex items-center gap-2"><PhoneMissed className="h-3 w-3 text-rose-500" /> Missed call · 12:04</div>
                  <div className="flex items-center gap-2"><MessageSquare className="h-3 w-3 text-blue-600" /> SMS reply sent</div>
                  <div className="flex items-center gap-2"><CalendarIcon className="h-3 w-3 text-emerald-600" /> Booking · Thu 2:00 PM</div>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Next action</div>
                <div className="mt-2 flex items-center gap-2 text-[13px] font-semibold text-slate-900"><Send className="h-3.5 w-3.5 text-blue-600" />Send confirmation</div>
                <div className="mt-1 text-[12px] text-slate-500">Auto-scheduled 30 min before job</div>
              </div>
            </div>
          </div>
          <div className="mx-auto h-8 w-px bg-slate-200" aria-hidden />
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Connected to</div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {outputs.map((n) => (
                <div key={n.label} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-slate-700 ring-1 ring-slate-200"><n.Icon className="h-4 w-4" /></span>
                  <span className="text-[13px] font-medium text-slate-800">{n.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .v3-reveal { animation: v3reveal 500ms ease-out both; }
        @keyframes v3reveal { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes v3OnePathDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -600; } }
        .v3-onepath-pulse { animation: v3OnePathDash 3.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .v3-reveal { animation: none; }
          .v3-onepath-pulse { animation: none; display: none; }
        }
      `}</style>
    </section>
  );
}
