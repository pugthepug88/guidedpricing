import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, Mail, Megaphone, Play, Plus, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const AUDIENCES = [
  ["Clients gone quiet", "312 contacts"],
  ["VIP Clients", "124 contacts"],
  ["Open Quotes", "86 contacts"],
] as const;

const TEMPLATES = [
  { name: "Welcome back", image: "/email-campaigns/winback.svg", kicker: "WELCOME BACK", headline: "COME BACK\nANYTIME", cta: "Book again", overlay: "from-fuchsia-950/0 via-fuchsia-950/15 to-fuchsia-950/95" },
  { name: "Service reminder", image: "/email-campaigns/service.svg", kicker: "SERVICE DUE", headline: "KEEP IT\nRUNNING", cta: "Book service", overlay: "from-slate-950/0 via-blue-950/20 to-slate-950/95" },
  { name: "VIP update", image: "/email-campaigns/premium.svg", kicker: "JUST FOR YOU", headline: "A LITTLE\nEXTRA", cta: "View update", overlay: "from-amber-950/0 via-amber-950/15 to-stone-950/95" },
] as const;

const FLOW = [
  ["We’d love to see you again", "Send now"],
  ["Still thinking about it?", "+2 days"],
  ["One last reminder", "+3 days"],
] as const;

function AudienceChip() {
  return <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-[6px] font-black text-fuchsia-700"><Users className="h-2.5 w-2.5" />Clients gone quiet</span>;
}

function Composer({ phase, reduced }: { phase: number; reduced: boolean }) {
  const chosen = phase >= 1;
  return <AnimatePresence>{phase <= 2 ? (
    <motion.div className="absolute bottom-[11%] right-[4%] top-[11%] z-30 w-[35%] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_30px_75px_-38px_rgba(15,23,42,.46)]" initial={reduced ? false : { opacity: 0, x: 34 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3.5"><span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600"><Mail className="h-4 w-4" /></span><div className="text-[11px] font-black text-slate-900">New email</div></div>
      <div className="px-4 py-3.5">
        <div className="flex min-h-[42px] items-center border-b border-slate-100"><div className="w-[46px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">To</div><div className="flex-1">{chosen ? <AudienceChip /> : <span className="text-[8px] font-semibold text-slate-300">Choose a group</span>}</div><Plus className="h-3.5 w-3.5 text-slate-300" /></div>
        <div className="flex min-h-[42px] items-center border-b border-slate-100"><div className="w-[46px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div><div className="truncate text-[8.5px] font-black text-slate-800">We’d love to see you again</div></div>
        <div className="pt-3 text-[8.5px] font-semibold leading-[1.55] text-slate-600">Hi {"{{first_name}}"}, it’s been a little while. We’d love to welcome you back.<div className="mt-3 inline-flex rounded-[8px] bg-zapla-ink px-3 py-2 text-[7px] font-black text-white">Book again</div></div>
        {!chosen ? <motion.div className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50/70 p-2" initial={reduced ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
          {AUDIENCES.map(([name, count], i) => <div key={name} className={i === 0 ? "flex items-center gap-2 rounded-[11px] border border-fuchsia-200 bg-white px-2.5 py-2 shadow-sm" : "mt-1 flex items-center gap-2 rounded-[11px] px-2.5 py-2"}><span className={i === 0 ? "flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-600 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400"}><Users className="h-3 w-3" /></span><div className="flex-1"><div className="text-[7.5px] font-black text-slate-800">{name}</div><div className="text-[6px] font-semibold text-slate-400">{count}</div></div>{i === 0 ? <span className="text-[6px] font-black text-fuchsia-700">Select</span> : null}</div>)}
        </motion.div> : null}
      </div>
    </motion.div>
  ) : null}</AnimatePresence>;
}

function Artwork({ index, selected = false }: { index: number; selected?: boolean }) {
  const t = TEMPLATES[index];
  return <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-slate-950"><img src={t.image} alt="" className="absolute inset-0 h-full w-full object-cover object-top" /><div className={`absolute inset-0 bg-gradient-to-b ${t.overlay}`} /><div className="absolute left-3.5 top-3.5 rounded-full border border-white/30 bg-black/15 px-2 py-1 text-[6px] font-black tracking-[.14em] text-white backdrop-blur-sm">{t.kicker}</div>{selected ? <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-lg"><Check className="h-4 w-4" strokeWidth={3} /></span> : null}<div className="absolute inset-x-0 bottom-0 p-3.5 text-white"><div className="whitespace-pre-line text-[21px] font-black leading-[.88] tracking-[-.055em]">{t.headline}</div><div className="mt-3 inline-flex rounded-full bg-white px-2.5 py-1 text-[6px] font-black uppercase text-slate-950">{t.cta}</div></div></div>;
}

function Frame({ index, selected = false }: { index: number; selected?: boolean }) {
  return <div className={`h-[220px] w-[176px] rounded-[20px] bg-white p-[3px] shadow-[0_26px_58px_-30px_rgba(15,23,42,.52)] ${selected ? "ring-4 ring-fuchsia-500/15" : ""}`}><Artwork index={index} selected={selected} /></div>;
}

function Picker({ phase, reduced }: { phase: number; reduced: boolean }) {
  const chosen = phase >= 4;
  return <AnimatePresence>{phase >= 3 && phase <= 4 ? <motion.div className="absolute inset-x-[4%] bottom-[10%] top-[10%] z-30 overflow-hidden rounded-[24px] border border-slate-200 bg-white/96 shadow-[0_34px_90px_-44px_rgba(15,23,42,.48)] backdrop-blur" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><div className="flex items-center justify-between px-5 pt-4"><div><div className="text-[11px] font-black text-slate-900">Choose a template</div><div className="text-[7px] font-semibold text-slate-400">Pick one direction.</div></div><AudienceChip /></div><div className="absolute inset-x-0 bottom-4 top-[54px] flex items-center justify-center gap-5">{TEMPLATES.map((t, i) => <motion.div key={t.name} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: chosen && i !== 0 ? .5 : 1, y: chosen && i === 0 ? -5 : 0, scale: chosen && i === 0 ? 1.035 : 1 }}><Frame index={i} selected={chosen && i === 0} /><div className="mt-2 text-center text-[7.5px] font-black text-slate-700">{t.name}</div></motion.div>)}</div></motion.div> : null}</AnimatePresence>;
}

function Mini() { return <div className="h-[54px] w-[40px] overflow-hidden rounded-[8px] border border-slate-200 bg-white p-[2px] shadow-sm"><div className="h-full w-full overflow-hidden rounded-[6px]"><Artwork index={0} /></div></div>; }

function Row({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= 5 + index, active = phase >= 9, target = phase === 4 && index === 0;
  return <motion.div className="mx-auto flex h-[72px] w-[382px] max-w-[96%] items-center gap-3 rounded-[15px] border bg-white px-3 shadow-[0_14px_32px_-28px_rgba(15,23,42,.42)]" animate={{ borderColor: active ? "rgba(16,185,129,.34)" : target ? "rgba(217,70,239,.45)" : filled ? "rgba(203,213,225,.95)" : "rgba(226,232,240,1)", backgroundColor: target ? "rgba(253,244,255,.55)" : "#fff" }} transition={{ duration: reduced ? 0 : .22 }}>
    {filled ? <motion.div initial={reduced ? false : { opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }}><Mini /></motion.div> : <div className={target ? "flex h-[54px] w-[40px] items-center justify-center rounded-[8px] border border-dashed border-fuchsia-300 bg-fuchsia-50 text-fuchsia-400" : "flex h-[54px] w-[40px] items-center justify-center rounded-[8px] border border-dashed border-slate-200 bg-slate-50 text-slate-300"}><Mail className="h-4 w-4" /></div>}
    <div className="min-w-0 flex-1"><div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">EMAIL {index + 1}</div>{filled ? <motion.div initial={reduced ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}><div className="mt-1 truncate text-[9px] font-black text-slate-800">{FLOW[index][0]}</div><div className="mt-1.5 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[6px] font-black text-slate-500">{FLOW[index][1]}</div></motion.div> : <div className={target ? "mt-1.5 text-[7px] font-black text-fuchsia-600" : "mt-1.5 text-[7px] font-semibold text-slate-300"}>{target ? "Drop template here" : "Waiting"}</div>}</div>
    {filled ? <span className={active ? "flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600"}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span> : null}
  </motion.div>;
}

function Connector() { return <div className="mx-auto h-2.5 w-px bg-slate-200" />; }
function Wait({ label }: { label: string }) { return <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[6.5px] font-bold text-slate-500"><Clock3 className="h-2.5 w-2.5 text-blue-500" />{label}</div>; }

function Builder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const audience = phase >= 2, template = phase >= 4, ready = phase >= 8, active = phase >= 9;
  return <div className="absolute bottom-[5%] left-[7%] top-[5%] z-10 w-[54%]"><div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]"><div className="flex items-start justify-between"><div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><Megaphone className="h-4 w-4" /></span><div><div className="text-[12px] font-black text-slate-900">Customer Win-back</div><div className="text-[7px] font-semibold text-slate-400">3-email campaign</div></div></div><span className={active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[6.5px] font-black text-emerald-700" : ready ? "rounded-full bg-blue-50 px-2.5 py-1 text-[6.5px] font-black text-blue-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-[6.5px] font-black text-slate-500"}>{active ? "ACTIVE" : ready ? "READY" : "DRAFT"}</span></div>
    <div className="mt-3 grid grid-cols-2 gap-2.5"><div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5"><div className="text-[5.5px] font-black uppercase tracking-[.14em] text-slate-400">Audience</div>{audience ? <div className="mt-2 flex items-center justify-between"><AudienceChip /><span className="text-[6px] font-bold text-slate-400">312</span></div> : <div className="mt-2 text-[7px] font-semibold text-slate-300">Choose recipients</div>}</div><div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5"><div className="text-[5.5px] font-black uppercase tracking-[.14em] text-slate-400">Template</div>{template ? <div className="mt-2 flex items-center gap-2"><div className="h-7 w-5 overflow-hidden rounded-[4px]"><Artwork index={0} /></div><span className="text-[7px] font-black text-slate-700">Welcome back</span></div> : <div className="mt-2 flex items-center gap-1.5 text-[7px] font-semibold text-slate-300"><LayoutTemplate className="h-3 w-3" />Choose creative</div>}</div></div>
    <div className="mt-3 flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden"><Row index={0} phase={phase} reduced={reduced} /><Connector /><Wait label="Wait 2 days" /><Connector /><Row index={1} phase={phase} reduced={reduced} /><Connector /><Wait label="Wait 3 days" /><Connector /><Row index={2} phase={phase} reduced={reduced} /></div>
    <div className="mt-2 flex justify-center"><motion.div className={active ? "inline-flex items-center gap-1.5 rounded-[10px] bg-emerald-500 px-4 py-2.5 text-[8px] font-black text-white" : ready ? "inline-flex items-center gap-1.5 rounded-[10px] bg-zapla-ink px-4 py-2.5 text-[8px] font-black text-white" : "inline-flex items-center gap-1.5 rounded-[10px] bg-slate-200 px-4 py-2.5 text-[8px] font-black text-slate-500"}>{active ? <><Check className="h-3.5 w-3.5" />Campaign active</> : <><Play className="h-3.5 w-3.5" />Activate campaign</>}</motion.div></div>
  </div></div>;
}

function Drag({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 4 || phase > 5) return null;
  return <motion.div className="pointer-events-none absolute z-50" initial={reduced ? false : { left: "35%", top: "31%", opacity: 0, scale: .94 }} animate={phase === 4 ? { left: "35%", top: "31%", opacity: 1, scale: 1 } : { left: "10.5%", top: "31%", opacity: 1, scale: .72 }} transition={{ duration: reduced ? 0 : .46, ease: [0.2, .82, .24, 1] }}><Frame index={0} selected /></motion.div>;
}

function Summary({ phase, reduced }: { phase: number; reduced: boolean }) { return <AnimatePresence>{phase >= 9 ? <motion.div className="absolute right-[8%] top-[28%] z-20 w-[26%] rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]" initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}><span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-4 w-4" strokeWidth={3} /></span><div className="mt-3 text-[13px] font-black text-slate-900">Campaign active</div><div className="mt-1 text-[7.5px] font-semibold text-slate-500">312 quiet clients · 3 emails · 5 days</div></motion.div> : null}</AnimatePresence>; }

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = { 0: { left: "75%", top: "27%" }, 1: { left: "76%", top: "57%" }, 4: { left: "32%", top: "39%" }, 5: { left: "24%", top: "35%" }, 8: { left: "33%", top: "92%" } };
  return <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]"><Builder phase={phase} reduced={reduced} /><Composer phase={phase} reduced={reduced} /><Picker phase={phase} reduced={reduced} /><Drag phase={phase} reduced={reduced} /><Summary phase={phase} reduced={reduced} /><ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 4 || phase === 8} reduced={reduced} /></div>;
}
