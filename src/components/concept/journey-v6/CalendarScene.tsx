import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "@/components/v5/faces";
import { EASE, RevenueAvatar } from "./shared";

type Accent = "blue" | "violet" | "amber" | "green" | "rose";
type Appointment = { title: string; time: string; face?: string; accent: Accent; sarah?: boolean };

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DAYS = [
  { day:31, month:"Aug", muted:true }, { day:1, month:"Sep" }, { day:2, month:"Sep" }, { day:3, month:"Sep", target:true }, { day:4, month:"Sep" }, { day:5, month:"Sep" }, { day:6, month:"Sep" },
  { day:7, month:"Sep" }, { day:8, month:"Sep" }, { day:9, month:"Sep" }, { day:10, month:"Sep" }, { day:11, month:"Sep" }, { day:12, month:"Sep" }, { day:13, month:"Sep" },
  { day:14, month:"Sep" }, { day:15, month:"Sep" }, { day:16, month:"Sep" }, { day:17, month:"Sep" }, { day:18, month:"Sep" }, { day:19, month:"Sep" }, { day:20, month:"Sep" },
  { day:21, month:"Sep" }, { day:22, month:"Sep" }, { day:23, month:"Sep" }, { day:24, month:"Sep" }, { day:25, month:"Sep" }, { day:26, month:"Sep" }, { day:27, month:"Sep" },
  { day:28, month:"Sep" }, { day:29, month:"Sep" }, { day:30, month:"Sep" }, { day:1, month:"Oct", muted:true }, { day:2, month:"Oct", muted:true }, { day:3, month:"Oct", muted:true }, { day:4, month:"Oct", muted:true },
  { day:5, month:"Oct", muted:true }, { day:6, month:"Oct", muted:true }, { day:7, month:"Oct", muted:true }, { day:8, month:"Oct", muted:true }, { day:9, month:"Oct", muted:true }, { day:10, month:"Oct", muted:true }, { day:11, month:"Oct", muted:true },
] as const;

const APPTS: Record<string, Appointment[]> = {
  "Sep-1": [{ title:"Maya Chen", time:"10:00 · Review", face:FACE.maya, accent:"blue" }],
  "Sep-2": [{ title:"Daniel Wu", time:"2:30 · Intro", face:FACE.daniel, accent:"violet" }],
  "Sep-4": [{ title:"Priya Shah", time:"11:00 · Follow-up", face:FACE.priya, accent:"green" }],
  "Sep-8": [{ title:"Tom Bennett", time:"9:30 · Walkthrough", face:FACE.tom, accent:"amber" }],
  "Sep-10": [{ title:"Sophie Lee", time:"1:00 · Consultation", face:FACE.sophie, accent:"rose" }],
  "Sep-15": [{ title:"Leo Martin", time:"10:30 · Check-in", face:FACE.leo, accent:"blue" }],
  "Sep-17": [{ title:"Maya Chen", time:"3:00 · Proposal", face:FACE.maya, accent:"violet" }],
  "Sep-22": [{ title:"Priya Shah", time:"11:30 · Review", face:FACE.priya, accent:"green" }],
  "Sep-24": [{ title:"Daniel Wu", time:"9:00 · Call", face:FACE.daniel, accent:"amber" }],
  "Sep-29": [{ title:"Sophie Lee", time:"2:00 · Follow-up", face:FACE.sophie, accent:"rose" }],
};

const ACCENT: Record<Accent,string> = { blue:"border-l-blue-500", violet:"border-l-violet-500", amber:"border-l-amber-500", green:"border-l-emerald-500", rose:"border-l-rose-500" };

function AppointmentChip({ appointment }: { appointment: Appointment }) {
  return (
    <div className={cn("flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] bg-white px-1.5 py-1.5 shadow-[0_8px_20px_-16px_rgba(15,23,42,.5)]", ACCENT[appointment.accent])}>
      {appointment.sarah ? <RevenueAvatar size={20} /> : <img src={appointment.face} alt="" aria-hidden className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />}
      <div className="min-w-0 flex-1"><div className="truncate text-[7.2px] font-black leading-tight text-slate-800">{appointment.title}</div><div className="mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400">{appointment.time}</div></div>
    </div>
  );
}

export function CalendarScene({ interactive = false }: { interactive?: boolean }) {
  const [booked, setBooked] = useState(interactive);
  const [confirmed, setConfirmed] = useState(interactive);
  useEffect(() => {
    if (interactive) { setBooked(true); setConfirmed(true); return; }
    setBooked(false); setConfirmed(false);
    const a = window.setTimeout(() => setBooked(true), 760);
    const b = window.setTimeout(() => setConfirmed(true), 1750);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [interactive]);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-slate-50/70">
      <div className="flex h-[58px] items-center gap-2 border-b border-slate-200 bg-white px-4">
        <div className="mr-2"><div className="text-[13px] font-black tracking-tight text-slate-900">September 2026</div><div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Calendar</div></div>
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500"><ChevronLeft className="h-3.5 w-3.5" /></span><span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500"><ChevronRight className="h-3.5 w-3.5" /></span><span className="rounded-[9px] border border-slate-200 bg-white px-3 py-1.5 text-[7px] font-black text-slate-600">Today</span>
        <div className="ml-auto flex items-center gap-2"><div className="flex items-center rounded-[10px] border border-slate-200 bg-slate-50 p-0.5">{["Day","Week","Month"].map((view) => <span key={view} className={view === "Month" ? "rounded-[8px] bg-white px-3 py-1.5 text-[7.5px] font-black text-slate-800 shadow-[0_5px_12px_-10px_rgba(15,23,42,.55)]" : "px-3 py-1.5 text-[7.5px] font-bold text-slate-400"}>{view}</span>)}</div><span className="flex items-center gap-1.5 rounded-[10px] bg-[#2563eb] px-3.5 py-2 text-[7.5px] font-black text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,.75)]"><Plus className="h-3 w-3" strokeWidth={3} />New</span></div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-200 bg-white">{WEEKDAYS.map((day) => <div key={day} className="border-l border-slate-100 py-2 text-center text-[7px] font-black uppercase tracking-[.1em] text-slate-400 first:border-l-0">{day}</div>)}</div>
      <div className="relative min-h-0 flex-1">
        <div className="grid h-full grid-cols-7 grid-rows-6">
          {DAYS.map((item) => {
            const key = `${item.month}-${item.day}`;
            const items: Appointment[] = [...(APPTS[key] ?? [])];
            if (key === "Sep-3" && booked) items.unshift({ title:"Sarah Nguyen", time:"2:30 · Consultation", accent:"blue", sarah:true });
            return (
              <div key={`${item.month}-${item.day}`} className={cn("relative min-h-0 overflow-hidden border-b border-l border-slate-100 px-1.5 py-1.5 first:border-l-0", item.muted ? "bg-slate-50/65" : "bg-white", item.target && "bg-blue-50/[.18]")}>
                <div className="mb-1 flex items-center justify-between"><span className={cn("flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[7px] font-black", item.target ? "bg-blue-600 text-white" : item.muted ? "text-slate-300" : "text-slate-500")}>{item.day}</span>{item.month !== "Sep" ? <span className="text-[5px] font-bold uppercase text-slate-300">{item.month}</span> : null}</div>
                <div className="space-y-1">{items.map((appointment) => <motion.div key={`${appointment.title}-${appointment.time}`} initial={appointment.sarah && !interactive ? { opacity:0, y:-18, scale:.96 } : false} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:.72, ease:EASE }}><AppointmentChip appointment={appointment} /></motion.div>)}</div>
              </div>
            );
          })}
        </div>
        {confirmed ? <motion.div className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 rounded-[11px] border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-24px_rgba(15,23,42,.26)]" initial={interactive ? false : { opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:.48, ease:EASE }}><span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-emerald-50 text-emerald-700"><CalendarCheck className="h-3.5 w-3.5" /></span><div><div className="text-[8px] font-black uppercase tracking-[.1em] text-emerald-700">Booking confirmed</div><div className="mt-0.5 text-[10.5px] font-bold text-slate-700">Sarah Nguyen · Thu 2:30 PM</div></div></motion.div> : null}
      </div>
    </div>
  );
}
