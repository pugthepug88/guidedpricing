/* =====================================================================
 *  V3 rebuilt sections — Journey, Automation, Professions, One Record
 *  Scope: /hero-preview-v3 only. Do NOT reuse on other routes.
 * ===================================================================== */
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  Phone, PhoneMissed, MessageSquare, Instagram, Users, Calendar as CalendarIcon,
  CreditCard, Star as StarIcon, RefreshCw, CheckCircle2, ArrowRight, ArrowLeft,
  FileText, Send, Bell, Globe, Briefcase, HeartPulse, Home as HomeIcon, Wrench,
  Dumbbell, Sparkles, Mail, ChevronRight, Car, Building2, BedDouble,
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
 *  One stable workspace. One sample customer. Six stages.
 * ===================================================================== */

type NavKey = "inbox" | "contacts" | "calendar" | "quotes" | "reviews" | "automations" | "campaigns";
type Stage = {
  key: string; sub: string; label: string;
  nav: NavKey;
  headline: string; body: string;
  panel: ReactNode;
};

function CustomerRecordHeader() {
  return (
    <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
      <CustomerAvatar size={44} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="text-[14px] font-semibold text-slate-900">Emma W.</div>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-100">Lead</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">Local area</span>
        </div>
        <div className="mt-0.5 flex items-center gap-3 text-[12px] text-slate-500">
          <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />+61 4•• ••• •••</span>
          <span className="hidden sm:inline-flex items-center gap-1"><Mail className="h-3 w-3" />emma@example.com</span>
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
const EmmaRecordHeader = CustomerRecordHeader;


function PanelCapture() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-rose-50/60 p-3.5 ring-1 ring-rose-100">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-rose-500 ring-1 ring-rose-200"><PhoneMissed className="h-4 w-4" /></span>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-slate-900">Missed call · 12:04 PM</div>
            <div className="text-[12px] text-slate-600">Number matched. One contact record created for Emma W.</div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100 rounded-full px-2 py-0.5">New</span>
        </div>
      </div>
      <div className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Activity</div>
        <div className="mt-2 space-y-2 text-[12.5px] text-slate-700">
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />Contact created from inbound call</div>
          <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-300" />Tagged as <span className="font-medium">New lead</span> · source <span className="font-medium">Phone</span></div>
        </div>
      </div>
    </div>
  );
}
function PanelCommunicate() {
  type Ev =
    | { kind: "event"; via: "Form" | "Instagram" | "Email"; title: string; detail: string; when: string }
    | { kind: "msg"; from: "z" | "e"; via: "SMS"; t: string; when: string };
  const events: Ev[] = [
    { kind: "event", via: "Form",      title: "Website form submitted", detail: "Service: kitchen tap repair · Preferred: Thursday", when: "11:52" },
    { kind: "event", via: "Instagram", title: "Instagram DM · photo",    detail: "Emma sent a photo of the leaking tap",             when: "11:58" },
    { kind: "msg",   from: "z", via: "SMS", t: "Hi Emma, we saw your form and photo. Thursday 2pm work?", when: "12:04" },
    { kind: "msg",   from: "e", via: "SMS", t: "Yes please, that's perfect.",                             when: "12:06" },
    { kind: "event", via: "Email",     title: "Email · booking details",  detail: "Confirmation, address on file and prep notes sent", when: "12:08" },
    { kind: "msg",   from: "e", via: "SMS", t: "Got the email, all good. Thanks!",                        when: "12:09" },
  ];
  const chip = (via: string) => {
    if (via === "SMS")       return "bg-emerald-50 text-emerald-700 ring-emerald-100";
    if (via === "Instagram") return "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100";
    if (via === "Email")     return "bg-blue-50 text-blue-700 ring-blue-100";
    return "bg-slate-100 text-slate-600 ring-slate-200";
  };
  const icon = (via: string) => {
    if (via === "SMS")       return <MessageSquare className="h-2.5 w-2.5" />;
    if (via === "Instagram") return <Instagram className="h-2.5 w-2.5" />;
    if (via === "Email")     return <Mail className="h-2.5 w-2.5" />;
    return <FileText className="h-2.5 w-2.5" />;
  };
  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
      <div className="mb-2 flex flex-wrap items-center gap-2 px-1">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">One thread · every channel</div>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600"><FileText className="h-2.5 w-2.5" />Form</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-fuchsia-50 px-1.5 py-0.5 text-[10px] font-semibold text-fuchsia-700 ring-1 ring-fuchsia-100"><Instagram className="h-2.5 w-2.5" />Instagram</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100"><MessageSquare className="h-2.5 w-2.5" />SMS</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-100"><Mail className="h-2.5 w-2.5" />Email</span>
      </div>
      <div className="space-y-2">
        {events.map((e, i) => {
          if (e.kind === "event") {
            return (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-slate-50 px-2.5 py-2 ring-1 ring-slate-100">
                <span className={`mt-0.5 inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ring-1 ${chip(e.via)}`}>{icon(e.via)}{e.via}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold text-slate-800">{e.title}</div>
                  <div className="truncate text-[11.5px] text-slate-500">{e.detail}</div>
                </div>
                <span className="text-[10px] text-slate-400">{e.when}</span>
              </div>
            );
          }
          return (
            <div key={i} className={`flex items-end gap-1.5 ${e.from === "z" ? "justify-start" : "justify-end"}`}>
              {e.from === "e" && <CustomerAvatar size={20} />}
              <div className={`max-w-[74%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${e.from === "z" ? "bg-slate-100 text-slate-800 rounded-bl-sm" : "bg-blue-600 text-white rounded-br-sm"}`}>
                {e.t}
                <div className={`mt-0.5 flex items-center gap-1 text-[10px] ${e.from === "z" ? "text-slate-500" : "text-white/70"}`}>
                  <span>{e.when}</span><span>·</span><span>{e.via}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function PanelConvert() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><FileText className="h-3 w-3" />Quote #Q-2841</div>
        <div className="mt-2 text-[13px] font-semibold text-slate-900">Kitchen tap repair + parts</div>
        <div className="mt-1 text-[12px] text-slate-500">Attached to Emma W.</div>
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="text-[18px] font-semibold text-slate-900">$180.00</div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">Accepted</span>
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><CalendarIcon className="h-3 w-3" />Booking</div>
        <div className="mt-2 text-[13px] font-semibold text-slate-900">Thursday · 2:00 PM</div>
        <div className="mt-1 text-[12px] text-slate-500">Reminders queued for 24h and 2h before</div>
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-[12px]">
          <TeamAvatar initials="AL" tone="#0ea5e9" size={22} />
          <span className="text-slate-700">Assigned to <span className="font-semibold text-slate-900">team member</span></span>
        </div>
      </div>
    </div>
  );
}
function PanelOperate() {
  // 8am → 5pm = 9 columns; "now" marker sits at 1pm (col index 5)
  const hours = ["8a","9a","10a","11a","12p","1p","2p","3p","4p"];
  const nowCol = 5; // 1pm
  type Job = { start: number; span: number; tone: string; ring: string; label: string; sub?: string; highlight?: boolean };
  const rows: { who: string; role: string; initials: string; tone: string; jobs: Job[] }[] = [
    { who: "Alex", role: "Plumber", initials: "AL", tone: "#0ea5e9", jobs: [
      { start: 0, span: 2, tone: "#e0f2fe", ring: "#7dd3fc", label: "Hot water install", sub: "Local area" },
      { start: 6, span: 1, tone: "#dbeafe", ring: "#2563eb", label: "Emma W. · tap repair", sub: "Service visit", highlight: true },
    ]},
    { who: "Mia", role: "Tech", initials: "MI", tone: "#10b981", jobs: [
      { start: 1, span: 2, tone: "#d1fae5", ring: "#34d399", label: "K. Nguyen · install", sub: "2h · parts kit" },
      { start: 4, span: 1, tone: "#d1fae5", ring: "#34d399", label: "Quote walk-through", sub: "Video call" },
      { start: 7, span: 2, tone: "#d1fae5", ring: "#34d399", label: "Site inspection", sub: "Local area" },
    ]},
    { who: "Sam", role: "Tech", initials: "SM", tone: "#f59e0b", jobs: [
      { start: 2, span: 1, tone: "#fef3c7", ring: "#fbbf24", label: "R. Thomas · quote", sub: "New lead" },
      { start: 5, span: 2, tone: "#fef3c7", ring: "#fbbf24", label: "Warranty callback", sub: "45 min" },
    ]},
    { who: "Jess", role: "Coordinator", initials: "JS", tone: "#a855f7", jobs: [
      { start: 3, span: 2, tone: "#f3e8ff", ring: "#c084fc", label: "Route planning", sub: "Thu run sheet" },
      { start: 8, span: 1, tone: "#f3e8ff", ring: "#c084fc", label: "End-of-day sync", sub: "Team" },
    ]},
  ];
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <div className="text-[13px] font-semibold text-slate-900">Thursday</div>
          <div className="text-[11px] text-slate-500">Team schedule · 4 staff · 8 jobs</div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Now 1:00 PM
        </div>
      </div>

      {/* header row: staff column + hour columns */}
      <div className="mt-3 grid gap-1 text-[10px] text-slate-400" style={{ gridTemplateColumns: "84px repeat(9, minmax(0,1fr))" }}>
        <div />
        {hours.map((h, i) => (
          <div key={h} className={`text-center ${i === nowCol ? "text-blue-600 font-semibold" : ""}`}>{h}</div>
        ))}
      </div>

      <div className="relative mt-1 space-y-1.5">
        {/* current-time vertical marker */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 z-10"
          style={{ left: `calc(84px + (100% - 84px) * ${(nowCol + 0.5) / 9})` }}
          aria-hidden
        >
          <div className="h-full w-px bg-blue-500/70" />
          <div className="absolute -top-1 -left-[3px] h-1.5 w-1.5 rounded-full bg-blue-500" />
        </div>

        {rows.map((r) => (
          <div key={r.who} className="grid items-center gap-1" style={{ gridTemplateColumns: "84px repeat(9, minmax(0,1fr))" }}>
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
              if (job && !isJobStart) return <div key={i} />; // spanned cell absorbed
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
                    boxShadow: job.highlight
                      ? "inset 0 0 0 1.5px #2563eb, 0 4px 12px -6px rgba(37,99,235,0.55)"
                      : `inset 0 0 0 1px ${job.ring}55`,
                  }}
                >
                  <div className={`text-[10.5px] font-semibold truncate ${job.highlight ? "text-blue-900" : "text-slate-800"}`}>{job.label}</div>
                  {job.sub && (
                    <div className={`text-[9.5px] truncate ${job.highlight ? "text-blue-700/80" : "text-slate-500"}`}>{job.sub}</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: "#dbeafe", boxShadow: "inset 0 0 0 1.5px #2563eb" }} />
          Emma W. job · assigned to Alex
        </div>
        <div className="text-[11px] text-slate-400">Drag to reschedule</div>
      </div>
    </div>
  );
}

function PanelRetain() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-50 text-amber-500 ring-1 ring-amber-100"><StarIcon className="h-4 w-4" /></span>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-slate-900">Review request · queued</div>
            <div className="text-[12px] text-slate-500">Sends 1 hour after job completion</div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Pending</span>
        </div>
      </div>
      <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100"><Bell className="h-4 w-4" /></span>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-slate-900">Service reminder · scheduled</div>
            <div className="text-[12px] text-slate-500">6-month check-in queued</div>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 ring-1 ring-blue-100 rounded-full px-2 py-0.5">Auto</span>
        </div>
      </div>
    </div>
  );
}
function PanelGrow() {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-slate-200">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400"><RefreshCw className="h-3 w-3" />Repeat-service journey</div>
      <div className="mt-3 grid gap-2">
        {[
          { t: "Day 0 · reactivation SMS drafted by AI", tone: "bg-blue-50 text-blue-700 ring-blue-100" },
          { t: "Day 3 · follow-up email if no reply", tone: "bg-slate-50 text-slate-700 ring-slate-200" },
          { t: "Day 7 · booking link with saved details", tone: "bg-slate-50 text-slate-700 ring-slate-200" },
        ].map((r, i) => (
          <div key={i} className={`rounded-lg px-3 py-2 text-[12.5px] font-medium ring-1 ${r.tone}`}>{r.t}</div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Sparkles className="h-3 w-3 text-blue-600" /> Replies land back in the same inbox thread
      </div>
    </div>
  );
}

const STAGES: Stage[] = [
  { key: "capture", sub: "01", label: "Capture", nav: "contacts",
    headline: "Every enquiry becomes one contact record.",
    body: "A missed call creates one contact. No duplicate, no lost detail.",
    panel: <PanelCapture /> },
  { key: "communicate", sub: "02", label: "Communicate", nav: "inbox",
    headline: "The reply lives inside the customer record.",
    body: "SMS, email and DMs all stay attached to the same customer.",
    panel: <PanelCommunicate /> },
  { key: "convert", sub: "03", label: "Convert", nav: "quotes",
    headline: "Quote and booking attach to the same record.",
    body: "The customer accepts a quote and books a time. Both link back to the contact.",
    panel: <PanelConvert /> },
  { key: "operate", sub: "04", label: "Operate", nav: "calendar",
    headline: "The job is scheduled and assigned.",
    body: "The team sees the booking on a shared calendar with full context.",
    panel: <PanelOperate /> },
  { key: "retain", sub: "05", label: "Retain", nav: "reviews",
    headline: "Review request and reminder go out on their own.",
    body: "After the job wraps, Zapla queues the review ask and the next check-in.",
    panel: <PanelRetain /> },
  { key: "grow", sub: "06", label: "Grow", nav: "campaigns",
    headline: "Customers re-enter a repeat-service journey.",
    body: "Months later, AI drafts the reactivation. Replies come back to the same thread.",
    panel: <PanelGrow /> },
];


export function JourneyV3() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const reduced = useReducedMotion();

  return (
    <section className="bg-slate-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>The platform</Eyebrow>
          <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            One product, six stages of the customer journey.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The same connected workspace, from first enquiry to repeat customer. Follow Emma W. through every stage.
          </p>
        </div>

        {/* Stage selector */}
        <div className="relative mt-10">
          <div
            className="-mx-6 overflow-x-auto px-6 sm:overflow-visible sm:mx-0 sm:px-0 zapla-scroll-hide"
            role="tablist"
            aria-label="Customer journey stage"
            style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)" }}
          >
            <div className="flex min-w-max items-center gap-1 rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.08)] sm:min-w-0 sm:justify-center">
              {STAGES.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={`relative flex items-center gap-2 rounded-full px-3.5 sm:px-5 py-2 text-[12px] sm:text-[13px] font-semibold transition-colors ${isActive ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                  >
                    <span className={`font-mono text-[10px] ${isActive ? "text-white/70" : "text-slate-400"}`}>{s.sub}</span>
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>


        {/* Progress path */}
        <div className="mt-6 hidden sm:flex mx-auto max-w-3xl items-center gap-2">
          {STAGES.map((_, i) => (
            <div key={i} className="flex-1">
              <div className={`h-[3px] rounded-full transition-all ${i <= active ? "bg-blue-600" : "bg-slate-200"}`} />
            </div>
          ))}
        </div>

        {/* Stable workspace card */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="text-[11px] font-mono text-slate-400">{stage.sub} / 06 · {stage.label}</div>
            <h3 className="mt-2 font-zapla text-2xl sm:text-[28px] font-semibold text-slate-950 leading-[1.15]">{stage.headline}</h3>
            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{stage.body}</p>
          </div>

          <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            {/* Product chrome — subtle, credible */}
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

            <div className="flex min-h-[520px]">
              {/* Persistent left rail */}
              <aside className="hidden sm:flex w-[168px] flex-col gap-0.5 border-r border-slate-100 bg-white p-3">
                <div className="mb-3 flex items-center gap-2 px-1">
                  <img src={logoBlue.url} alt="" className="h-6 w-6 rounded-md" />
                  <span className="text-[13px] font-semibold text-slate-900">Zapla</span>
                </div>
                {([
                  { key: "inbox",       icon: <MessageSquare className="h-3.5 w-3.5" />, label: "Inbox" },
                  { key: "contacts",    icon: <Users className="h-3.5 w-3.5" />,         label: "Contacts" },
                  { key: "calendar",    icon: <CalendarIcon className="h-3.5 w-3.5" />,  label: "Calendar" },
                  { key: "quotes",      icon: <FileText className="h-3.5 w-3.5" />,      label: "Quotes" },
                  { key: "reviews",     icon: <StarIcon className="h-3.5 w-3.5" />,      label: "Reviews" },
                  { key: "automations", icon: <Sparkles className="h-3.5 w-3.5" />,      label: "Automations" },
                  { key: "campaigns",   icon: <Send className="h-3.5 w-3.5" />,          label: "Campaigns" },
                ] as { key: NavKey; icon: ReactNode; label: string }[]).map((n) => {
                  const isActive = n.key === stage.nav;
                  return (
                    <div key={n.key} className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] transition-colors ${isActive ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600"}`}>
                      {n.icon}{n.label}
                    </div>
                  );
                })}

              </aside>

              <div className="flex-1 min-w-0 bg-white">
                {/* Stable customer record header — persistent across stages */}
                <EmmaRecordHeader />
                {/* Stage-varying inner panel */}
                <div
                  key={reduced ? undefined : stage.key}
                  className={`p-5 sm:p-6 ${reduced ? "" : "v3-crossfade"}`}
                >
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    <span className="font-mono text-slate-400">{stage.sub}</span>
                    <span>·</span>
                    <span className="text-slate-500">{stage.label}</span>
                  </div>
                  {stage.panel}
                </div>
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
  const [mode, setMode] = useState<"in" | "after">("in");
  const reduced = useReducedMotion();

  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>Automation</Eyebrow>
          <h2 className="mt-4 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Every call reaches the right person, even after hours.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Zapla checks availability, routes the call and keeps the full customer context connected.
          </p>
        </div>

        {/* Path toggle */}
        <div className="mt-8 inline-flex rounded-full bg-slate-100 p-1 text-[13px] font-semibold" role="tablist" aria-label="Call scenario">
          {[
            { k: "in", label: "Business hours" },
            { k: "after", label: "After hours" },
          ].map((o) => {
            const isActive = mode === o.k;
            return (
              <button
                key={o.k}
                role="tab"
                aria-selected={isActive}
                onClick={() => setMode(o.k as "in" | "after")}
                className={`rounded-full px-4 py-1.5 transition ${isActive ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500"}`}
              >{o.label}</button>
            );
          })}
        </div>

        {/* Stage */}
        <div className="mt-10 rounded-[28px] bg-gradient-to-br from-blue-50/60 via-white to-slate-50 ring-1 ring-slate-200 p-6 sm:p-10">
          <AutomationDiagram mode={mode} reduced={reduced} />
        </div>

        <p className="mt-6 max-w-2xl text-[13.5px] text-slate-500">
          Illustrative flow. Availability rules, business hours and routing are configurable per team.
        </p>
      </div>
    </section>
  );
}

function AutomationDiagram({ mode, reduced }: { mode: "in" | "after"; reduced: boolean }) {
  const activePath = mode === "in" ? "A" : "B";
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
          {/* incoming */}
          <path d="M450 130 L450 210" stroke="#cbd5e1" strokeWidth="2" fill="none" />
          {/* split */}
          <path d="M450 300 C 450 370, 220 370, 220 420" stroke={activePath === "A" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "A" ? 3 : 2} fill="none" />
          <path d="M450 300 C 450 370, 680 370, 680 420" stroke={activePath === "B" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "B" ? 3 : 2} fill="none" />
          {/* merge */}
          <path d="M220 540 C 220 590, 450 590, 450 585" stroke={activePath === "A" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "A" ? 3 : 2} fill="none" />
          <path d="M680 540 C 680 590, 450 590, 450 585" stroke={activePath === "B" ? "url(#v3wire)" : "#e2e8f0"} strokeWidth={activePath === "B" ? 3 : 2} fill="none" />
        </svg>

        {/* Nodes overlay */}
        <div className="absolute inset-0">
          {/* Incoming call — human-first card */}
          <div className="absolute" style={{ left: "50%", top: "0%", transform: "translateX(-50%)", width: 340 }}>
            <IncomingCallCard reduced={reduced} />
          </div>

          <NodeBox style={{ left: "50%", top: "34%", transform: "translateX(-50%)" }}>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-white"><CalendarIcon className="h-4 w-4" /></span>
              <div>
                <div className="text-[13px] font-semibold text-slate-900">Check hours &amp; availability</div>
                <div className="text-[11.5px] text-slate-500">Mon–Fri · 8:00–17:00 AEST</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11.5px] text-slate-600 ring-1 ring-slate-100">
              <span className={`h-1.5 w-1.5 rounded-full ${mode === "in" ? "bg-emerald-500" : "bg-blue-500"}`} />
              {mode === "in" ? "Now: Tue 10:42 AM — team available" : "Now: Tue 8:14 PM — outside hours"}
            </div>
          </NodeBox>

          <NodeBox active={activePath === "A"} style={{ left: "24%", top: "68%", transform: "translateX(-50%)" }} tone="emerald" w={260}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">In hours</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />Live human
              </span>
            </div>
            <div className="mt-1 text-[13.5px] font-semibold text-slate-900">Transferred to available team member</div>
            <div className="mt-0.5 text-[11.5px] text-slate-500">Call Transfer action · on-call destination</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex -space-x-2">
                <TeamAvatar initials="T1" tone="#0ea5e9" />
                <TeamAvatar initials="T2" tone="#10b981" />
                <TeamAvatar initials="T3" tone="#6366f1" />
              </div>
              <span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-emerald-700 ring-1 ring-emerald-200">Answered</span>
            </div>
          </NodeBox>


          <NodeBox active={activePath === "B"} style={{ left: "76%", top: "68%", transform: "translateX(-50%)" }} tone="blue" w={260}>
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-700">After hours</div>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10.5px] font-semibold text-blue-700 ring-1 ring-blue-100">Zapla AI</span>
            </div>
            <div className="mt-1 text-[13.5px] font-semibold text-slate-900">AI answers &amp; books</div>
            <div className="mt-2 space-y-1.5">
              <TranscriptLine who="ai">Hi, this is Zapla for your business.</TranscriptLine>
              <TranscriptLine who="caller">Hi, I need help with a job today.</TranscriptLine>
              <TranscriptLine who="ai">Understood. First slot is Wed 9:00 AM. Book it?</TranscriptLine>
            </div>
          </NodeBox>

          <NodeBox style={{ left: "50%", top: "94%", transform: "translateX(-50%)" }} tone="blue" w={300}>
            <div className="flex items-center gap-3">
              <PortraitAvatar size={38} />
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-slate-900">Emma W. · record updated</div>
                <div className="text-[11.5px] text-slate-500 truncate">Booking attached · team notified · call logged</div>
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
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-white"><CalendarIcon className="h-4 w-4" /></span>
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Check hours &amp; availability</div>
              <div className="text-[11px] text-slate-500">{mode === "in" ? "Tue 10:42 AM · team available" : "Tue 8:14 PM · outside hours"}</div>
            </div>
          </div>
        </NodeBoxMobile>
        <Connector />
        <div className="grid grid-cols-2 gap-3">
          <NodeBoxMobile active={activePath === "A"} tone="emerald">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">In hours</div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-semibold text-white">
                <span className="h-1 w-1 rounded-full bg-white" />Live
              </span>
            </div>
            <div className="mt-1 text-[12.5px] font-semibold text-slate-900">Transferred to team</div>
            <div className="mt-2 flex -space-x-2">
              <TeamAvatar initials="T1" tone="#0ea5e9" size={22} />
              <TeamAvatar initials="T2" tone="#10b981" size={22} />
              <TeamAvatar initials="T3" tone="#6366f1" size={22} />
            </div>
          </NodeBoxMobile>

          <NodeBoxMobile active={activePath === "B"} tone="blue">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-700">After hours</div>
            <div className="mt-1 text-[12.5px] font-semibold text-slate-900">AI answers &amp; books</div>
            <div className="mt-2 text-[11px] text-slate-600">"First slot is Wed 9:00 AM."</div>
          </NodeBoxMobile>
        </div>
        <Connector />
        <NodeBoxMobile tone="blue">
          <div className="flex items-center gap-3">
            <PortraitAvatar size={34} />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-slate-900">Record updated</div>
              <div className="text-[11px] text-slate-500 truncate">Booking attached · team notified</div>
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
          <div className="text-[14px] font-semibold text-slate-900">Emma W.</div>
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
    headline: "New enquiry to qualified consultation.",
    body: "Capture the enquiry, screen it in one thread, and get the right lead on the calendar with context.",
    journey: ["Enquiry", "Qualified", "Consultation booked"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Consultation</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample enquiry · Tue 10:00 AM</div>
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
    body: "New leads enter a nurture sequence and land on an appraisal or inspection without dropping context.",
    journey: ["Lead", "Nurture", "Appraisal or inspection"],
    outcome: (
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Inspection booked</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample listing · Thu 4:30 PM</div>
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
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample enquiry · Wed 2:00 PM</div>
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
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample patient · 24h check-in</div>
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
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample studio · Sat 8:00 AM class</div>
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
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample job · Thu 2:00 PM</div>
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
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample vehicle · Mon 9:00 AM</div>
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
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Sample stay · 2-night booking</div>
        <div className="mt-1 text-[12px] text-slate-500">Review request queued, repeat-guest discount</div>
      </div>
    ),
  },
];

export function ProfessionCarouselV3() {
  const [i, setI] = useState(0); // Professional services default
  const s = SLIDES[i];
  const prev = SLIDES[(i - 1 + SLIDES.length) % SLIDES.length];
  const next = SLIDES[(i + 1) % SLIDES.length];
  const go = (n: number) => setI(((n % SLIDES.length) + SLIDES.length) % SLIDES.length);

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

        {/* Profession tabs */}
        <div
          className="mt-10 -mx-6 overflow-x-auto px-6 sm:overflow-visible sm:mx-0 sm:px-0"
          role="tablist"
          aria-label="Profession"
          style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%)" }}
        >
          <div className="flex min-w-max items-center gap-2 zapla-scroll-hide">
            {SLIDES.map((sl, idx) => {
              const isActive = idx === i;
              const Icon = sl.Icon;
              return (
                <button
                  key={sl.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => go(idx)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold transition ${isActive ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900"}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {sl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel stage */}
        <div className="relative mt-10">
          {/* Peek slides — desktop only */}
          <div className="pointer-events-none absolute inset-y-6 left-[-8%] hidden w-[22%] rounded-[24px] bg-white opacity-40 ring-1 ring-slate-200 lg:block" aria-hidden>
            <div className="h-full w-full rounded-[24px] bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${prev.image})` }} />
          </div>
          <div className="pointer-events-none absolute inset-y-6 right-[-8%] hidden w-[22%] rounded-[24px] bg-white opacity-40 ring-1 ring-slate-200 lg:block" aria-hidden>
            <div className="h-full w-full rounded-[24px] bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${next.image})` }} />
          </div>

          <article
            key={s.key}
            className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${s.accent.bg} ring-1 ${s.accent.ring} shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]`}
          >
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 items-stretch">
              {/* Visual */}
              <div className="relative aspect-[5/4] min-h-[320px] w-full overflow-hidden lg:rounded-l-[28px] rounded-t-[28px] lg:rounded-tr-none">
                <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                {/* small outcome overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[300px] rounded-2xl bg-white/95 p-3.5 ring-1 ring-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur">
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
