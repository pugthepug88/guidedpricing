import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, RevenueAvatar } from "./shared";

const WEEK_DAYS = [
  { day: "MON", date: "31" }, { day: "TUE", date: "1" }, { day: "WED", date: "2" },
  { day: "THU", date: "3", target: true }, { day: "FRI", date: "4" }, { day: "SAT", date: "5" }, { day: "SUN", date: "6" },
];
const TIME_ROWS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

export function CalendarScene({ interactive = false }: { interactive?: boolean }) {
  const [booked, setBooked] = useState(interactive);
  const [confirmed, setConfirmed] = useState(interactive);

  useEffect(() => {
    if (interactive) {
      setBooked(true); setConfirmed(true); return;
    }
    setBooked(false); setConfirmed(false);
    const bookedTimer = window.setTimeout(() => setBooked(true), 750);
    const confirmTimer = window.setTimeout(() => setConfirmed(true), 1700);
    return () => { window.clearTimeout(bookedTimer); window.clearTimeout(confirmTimer); };
  }, [interactive]);

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-white">
      <div className="flex h-[58px] items-center gap-2 border-b border-slate-200 bg-white px-4">
        <div className="mr-2"><div className="text-[13px] font-black tracking-tight text-slate-900">September 2026</div><div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Calendar</div></div>
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500"><ChevronLeft className="h-3.5 w-3.5" /></span><span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500"><ChevronRight className="h-3.5 w-3.5" /></span><span className="rounded-[9px] border border-slate-200 bg-white px-3 py-1.5 text-[7px] font-black text-slate-600">Today</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center rounded-[10px] border border-slate-200 bg-slate-50 p-0.5">{["Day", "Week", "Month"].map((view) => <span key={view} className={view === "Week" ? "rounded-[8px] bg-white px-3 py-1.5 text-[7.5px] font-black text-slate-800 shadow-[0_5px_12px_-10px_rgba(15,23,42,.55)]" : "px-3 py-1.5 text-[7.5px] font-bold text-slate-400"}>{view}</span>)}</div>
          <span className="flex items-center gap-1.5 rounded-[10px] bg-[#2563eb] px-3.5 py-2 text-[7.5px] font-black text-white"><Plus className="h-3 w-3" strokeWidth={3} /> New</span>
        </div>
      </div>

      <div className="grid grid-cols-[54px_repeat(7,minmax(0,1fr))] border-b border-slate-200 bg-slate-50/55">
        <div />{WEEK_DAYS.map((item) => <div key={item.day} className={cn("border-l border-slate-200 px-2 py-2 text-center", item.target && "bg-blue-50/55")}><div className="text-[6.5px] font-black tracking-[.12em] text-slate-400">{item.day}</div><div className={cn("mx-auto mt-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black", item.target ? "bg-[#2563FF] text-white" : "text-slate-700")}>{item.date}</div></div>)}
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="grid h-full grid-cols-[54px_repeat(7,minmax(0,1fr))] grid-rows-5">
          {TIME_ROWS.map((time, rowIndex) => (
            <div key={time} className="contents">
              <div className="border-b border-slate-100 px-2 pt-1.5 text-right text-[6.5px] font-bold text-slate-400">{time}</div>
              {WEEK_DAYS.map((day, colIndex) => <div key={`${time}-${day.day}`} className={cn("relative border-b border-l border-slate-100", day.target && "bg-blue-50/[.18]")}>{rowIndex === 1 && colIndex === 1 ? <div className="absolute left-1.5 right-1.5 top-2 rounded-[7px] border border-slate-200 border-l-[3px] border-l-violet-400 bg-white px-1.5 py-1 text-[6.5px] font-bold text-slate-600">11:30 · Review</div> : null}{rowIndex === 2 && colIndex === 5 ? <div className="absolute left-1.5 right-1.5 top-2 rounded-[7px] border border-slate-200 border-l-[3px] border-l-amber-400 bg-white px-1.5 py-1 text-[6.5px] font-bold text-slate-600">1:00 · Intro</div> : null}</div>)}
            </div>
          ))}
        </div>

        <motion.div className="absolute z-20 rounded-[10px] border border-blue-200 border-l-[4px] border-l-[#2563FF] bg-white px-2.5 py-2 shadow-[0_14px_28px_-18px_rgba(37,99,255,.38)]" style={{ left: "46.6%", top: "49%", width: "11.9%" }} initial={interactive ? false : { opacity: 0, y: -34, scale: 0.95 }} animate={{ opacity: booked ? 1 : 0, y: booked ? 0 : -34, scale: booked ? 1 : 0.95 }} transition={{ duration: 0.75, ease: EASE }}>
          <div className="flex items-center gap-1.5"><RevenueAvatar size={22} /><div className="min-w-0"><div className="truncate text-[7.8px] font-black text-slate-800">Sarah Nguyen</div><div className="mt-0.5 truncate text-[6.5px] font-semibold text-slate-400">2:30 · Consultation</div></div></div>
        </motion.div>

        {confirmed ? (
          <motion.div className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 rounded-[11px] border border-slate-200 bg-white px-3.5 py-2.5 shadow-[0_16px_34px_-24px_rgba(15,23,42,.26)]" initial={interactive ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48, ease: EASE }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-emerald-50 text-emerald-700"><CalendarCheck className="h-3.5 w-3.5" /></span><div><div className="text-[8px] font-black uppercase tracking-[.1em] text-emerald-700">Booking confirmed</div><div className="mt-0.5 text-[10.5px] font-bold text-slate-700">Sarah Nguyen · Thu 2:30 PM</div></div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
