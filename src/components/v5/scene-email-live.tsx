import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, Mail, Megaphone, Play, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const AUDIENCES = [
  { name: "Clients gone quiet", contacts: "312 contacts", note: "No visit in 90+ days" },
  { name: "VIP Clients", contacts: "124 contacts", note: "High spend and repeat bookings" },
  { name: "Open Quotes", contacts: "86 contacts", note: "Quote sent, no reply yet" },
  { name: "Recent Clients", contacts: "468 contacts", note: "Booked in the last 30 days" },
] as const;

const TEMPLATES = [
  { name: "Welcome back", image: "/email-campaigns/winback.svg", audience: "Clients gone quiet", subject: "We’d love to see you again", cta: "Book again", tone: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700" },
  { name: "Service reminder", image: "/email-campaigns/service.svg", audience: "VIP Clients", subject: "Your next service is due", cta: "Book service", tone: "border-blue-200 bg-blue-50 text-blue-700" },
  { name: "Follow-up", image: "/email-campaigns/followup.svg", audience: "Recent Clients", subject: "Just checking in", cta: "Book a visit", tone: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { name: "Premium update", image: "/email-campaigns/premium.svg", audience: "VIP Clients", subject: "An exclusive update for you", cta: "View update", tone: "border-amber-200 bg-amber-50 text-amber-700" },
] as const;

const FLOW = [
  { label: "EMAIL 1", subject: "We’d love to see you again", preview: "A warm opener with one clear reason to return.", timing: "Send now" },
  { label: "EMAIL 2", subject: "Still thinking about it?", preview: "A short follow-up that keeps the offer top of mind.", timing: "After 2 days" },
  { label: "EMAIL 3", subject: "One last reminder", preview: "A final nudge before the sequence wraps up.", timing: "After 5 days" },
] as const;

const SELECTED_AUDIENCE = AUDIENCES[0];
const SELECTED_TEMPLATE = TEMPLATES[0];
const LANDED = [5, 6, 7] as const;

function TemplateThumb({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

function AudienceChip() {
  return (
    <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-1.5 text-[6.5px] font-black text-fuchsia-700">
      <Users className="h-3 w-3" />
      <span className="truncate">To: {SELECTED_AUDIENCE.name}</span>
      <span className="rounded-full bg-white px-1.5 py-0.5 text-[5.5px]">{SELECTED_AUDIENCE.contacts}</span>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-2.5 w-px bg-slate-200" />;
}

function WaitChip({ label }: { label: string }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[7px] font-bold text-slate-500">
      <Clock3 className="h-2.5 w-2.5 text-blue-500" /> {label}
    </div>
  );
}

function EmailNode({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= LANDED[index];
  const active = phase >= 9;
  return (
    <motion.div
      className="mx-auto flex h-[80px] w-[378px] max-w-[96%] items-center gap-3 overflow-hidden rounded-[15px] border bg-white px-3.5 shadow-[0_14px_34px_-28px_rgba(15,23,42,.45)]"
      animate={{ borderColor: active ? "rgba(16,185,129,.38)" : filled ? "rgba(191,219,254,.9)" : "rgba(226,232,240,1)" }}
    >
      <div className="h-[58px] w-[74px] shrink-0 overflow-hidden rounded-[10px] bg-slate-100">
        {filled ? <TemplateThumb src={SELECTED_TEMPLATE.image} alt={SELECTED_TEMPLATE.name} /> : <div className="flex h-full items-center justify-center"><Mail className="h-5 w-5 text-slate-300" /></div>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[6px] font-black uppercase tracking-[.14em] text-slate-400">
          {FLOW[index].label}
          {filled ? <span className="rounded-full bg-fuchsia-50 px-1.5 py-0.5 normal-case tracking-normal text-fuchsia-700">{SELECTED_AUDIENCE.name}</span> : null}
        </div>
        {filled ? (
          <motion.div initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mt-1 truncate text-[9.5px] font-black text-slate-800">{FLOW[index].subject}</div>
            <div className="mt-1 truncate text-[7px] font-medium text-slate-500">{FLOW[index].preview}</div>
            <span className="mt-1.5 inline-flex rounded-[5px] bg-slate-100 px-2 py-0.5 text-[6px] font-black text-slate-500">{FLOW[index].timing}</span>
          </motion.div>
        ) : (
          <div className="mt-2 inline-flex items-center gap-1 rounded-[6px] bg-slate-50 px-2 py-1 text-[6.5px] font-black text-slate-400"><LayoutTemplate className="h-2.5 w-2.5" /> Waiting for template</div>
        )}
      </div>
      {filled ? <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${active ? "bg-emerald-500 text-white" : "bg-blue-50 text-blue-600"}`}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span> : null}
    </motion.div>
  );
}

function CampaignBuilder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const audienceChosen = phase >= 2;
  const templateChosen = phase >= 4;
  const ready = phase >= 8;
  const active = phase >= 9;
  return (
    <div className="absolute bottom-[5%] left-[3.5%] top-[5%] z-10 w-[55%]">
      <div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><Megaphone className="h-4 w-4" /></span><div><div className="text-[12px] font-black text-slate-900">Customer Win-back</div><div className="text-[7.5px] font-semibold text-slate-400">Email marketing campaign</div></div></div>
          <span className={`rounded-full px-2.5 py-1 text-[7px] font-black ${active ? "bg-emerald-50 text-emerald-700" : ready ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>{active ? "ACTIVE" : ready ? "READY" : "DRAFT"}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5"><div className="text-[5.5px] font-black uppercase tracking-[.12em] text-slate-400">AUDIENCE</div>{audienceChosen ? <div className="mt-2"><AudienceChip /><div className="mt-1 text-[6.5px] text-slate-500">{SELECTED_AUDIENCE.note}</div></div> : <div className="mt-2 text-[7.5px] font-semibold text-slate-400">Choose a segment first</div>}</div>
          <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5"><div className="text-[5.5px] font-black uppercase tracking-[.12em] text-slate-400">TEMPLATE</div>{templateChosen ? <div className="mt-2 flex items-center gap-2"><div className="h-[38px] w-[48px] overflow-hidden rounded-[8px]"><TemplateThumb src={SELECTED_TEMPLATE.image} alt={SELECTED_TEMPLATE.name} /></div><div className="min-w-0"><div className="truncate text-[8px] font-black text-slate-800">{SELECTED_TEMPLATE.name}</div><div className="truncate text-[6px] text-slate-500">{SELECTED_TEMPLATE.subject}</div></div></div> : <div className="mt-2 text-[7.5px] font-semibold text-slate-400">Pick a template next</div>}</div>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden"><EmailNode index={0} phase={phase} reduced={reduced} /><Connector /><WaitChip label="Wait 2 days" /><Connector /><EmailNode index={1} phase={phase} reduced={reduced} /><Connector /><WaitChip label="Wait 3 days" /><Connector /><EmailNode index={2} phase={phase} reduced={reduced} /></div>
        <div className="mt-2 flex justify-center"><motion.div className={`inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[8px] font-black ${active ? "bg-emerald-500 text-white" : ready ? "bg-zapla-ink text-white" : "bg-slate-200 text-slate-500"}`} animate={active ? { scale: [1, .97, 1] } : {}}>{active ? <><Check className="h-3.5 w-3.5" /> Campaign active</> : <><Play className="h-3.5 w-3.5" /> Activate campaign</>}</motion.div></div>
      </div>
    </div>
  );
}

function AudienceSelector({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>{phase <= 2 ? <motion.div className="absolute bottom-[12%] right-[3.5%] top-[12%] z-30 w-[36.5%] rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_32px_80px_-38px_rgba(15,23,42,.5)]" initial={reduced ? false : { opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}><div className="mb-3 flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600"><Users className="h-3.5 w-3.5" /></span><div><div className="text-[10px] font-black text-slate-900">Who is this email going to?</div><div className="text-[6.5px] font-semibold text-slate-400">Pick a segment before choosing the design.</div></div></div><div className="space-y-2.5">{AUDIENCES.map((a, i) => { const on = phase >= 1 && i === 0; return <motion.div key={a.name} className={`rounded-[14px] border px-3 py-3 ${on ? "border-2 border-fuchsia-300 bg-fuchsia-50/70" : "border-slate-200 bg-white"}`}><div className="flex items-center gap-3"><span className={`flex h-7 w-7 items-center justify-center rounded-full ${on ? "bg-fuchsia-600 text-white" : "bg-slate-100 text-slate-500"}`}><Users className="h-3.5 w-3.5" /></span><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div className="truncate text-[8px] font-black text-slate-800">{a.name}</div>{on ? <span className="text-[6px] font-black text-fuchsia-700">Selected</span> : null}</div><div className="mt-1 text-[6.5px] font-semibold text-slate-500">{a.contacts}</div><div className="mt-1 text-[6px] text-slate-400">{a.note}</div></div></div></motion.div>; })}</div></motion.div> : null}</AnimatePresence>
  );
}

function TemplateTray({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 4;
  return (
    <AnimatePresence>{phase >= 3 && phase <= 8 ? <motion.div className="absolute bottom-[7%] right-[3.5%] top-[7%] z-30 w-[36.5%] rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_32px_80px_-38px_rgba(15,23,42,.5)]" initial={reduced ? false : { opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}><div className="mb-3 flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-violet-50 text-violet-600"><LayoutTemplate className="h-3.5 w-3.5" /></span><div><div className="text-[10px] font-black text-slate-900">Browse email templates</div><div className="text-[6.5px] font-semibold text-slate-400">Pick a creative for the selected group.</div></div></div><div className="grid h-[calc(100%-44px)] grid-cols-2 gap-2.5">{TEMPLATES.map((t, i) => { const on = selected && i === 0; return <motion.div key={t.name} className={`relative flex min-h-0 flex-col rounded-[14px] border bg-white p-2 ${on ? "border-2 border-fuchsia-300" : "border-slate-200"}`} animate={{ opacity: selected && !on ? .56 : 1, scale: on ? 1.015 : 1 }}><div className="mb-1.5 flex items-center justify-between gap-1"><div className="truncate text-[7px] font-black text-slate-700">{t.name}</div><span className={`rounded-full border px-1.5 py-0.5 text-[5px] font-black ${t.tone}`}>{t.audience}</span></div><div className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-slate-100"><TemplateThumb src={t.image} alt={t.name} /></div><div className="mt-1 truncate text-[7px] font-black text-slate-800">{t.subject}</div><div className="mt-1 text-[6px] font-semibold text-slate-500">{t.cta}</div>{on ? <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-600 text-white"><Check className="h-3 w-3" strokeWidth={3} /></span> : null}</motion.div>; })}</div></motion.div> : null}</AnimatePresence>
  );
}

function LiveSummary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return <AnimatePresence>{phase >= 9 ? <motion.div className="absolute right-[5.5%] top-[25%] z-20 w-[30%] rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-5 w-5" strokeWidth={3} /></div><div className="mt-4 text-[14px] font-black text-slate-900">Campaign active</div><div className="mt-1 text-[8px] font-semibold leading-relaxed text-slate-500">Zapla has queued the whole win-back sequence for the selected audience.</div><div className="mt-4 space-y-2"><div className="flex justify-between rounded-[10px] bg-slate-50 px-3 py-2.5 text-[7px]"><span className="text-slate-500">Audience</span><b>{SELECTED_AUDIENCE.contacts}</b></div><div className="flex justify-between rounded-[10px] bg-slate-50 px-3 py-2.5 text-[7px]"><span className="text-slate-500">Template</span><b>{SELECTED_TEMPLATE.name}</b></div><div className="flex justify-between rounded-[10px] bg-slate-50 px-3 py-2.5 text-[7px]"><span className="text-slate-500">Sequence</span><b>3 emails · 5 days</b></div></div></motion.div> : null}</AnimatePresence>;
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = { 1: { left: "76%", top: "28%" }, 4: { left: "72%", top: "30%" }, 8: { left: "31%", top: "92%" } };
  return <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]"><CampaignBuilder phase={phase} reduced={reduced} /><AudienceSelector phase={phase} reduced={reduced} /><TemplateTray phase={phase} reduced={reduced} /><LiveSummary phase={phase} reduced={reduced} /><ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 4 || phase === 8} reduced={reduced} /></div>;
}
