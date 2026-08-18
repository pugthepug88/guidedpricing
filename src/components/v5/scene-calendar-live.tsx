import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock3, MessageSquare, Plus } from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const MONTH_DAYS = [
  { day: 27, month: "Jul", muted: true }, { day: 28, month: "Jul", muted: true },
  { day: 29, month: "Jul", muted: true }, { day: 30, month: "Jul", muted: true },
  { day: 31, month: "Jul", muted: true }, { day: 1, month: "Aug", muted: false },
  { day: 2, month: "Aug", muted: false }, { day: 3, month: "Aug", muted: false },
  { day: 4, month: "Aug", muted: false }, { day: 5, month: "Aug", muted: false },
  { day: 6, month: "Aug", muted: false }, { day: 7, month: "Aug", muted: false },
  { day: 8, month: "Aug", muted: false }, { day: 9, month: "Aug", muted: false },
  { day: 10, month: "Aug", muted: false }, { day: 11, month: "Aug", muted: false },
  { day: 12, month: "Aug", muted: false }, { day: 13, month: "Aug", muted: false },
  { day: 14, month: "Aug", muted: false }, { day: 15, month: "Aug", muted: false },
  { day: 16, month: "Aug", muted: false }, { day: 17, month: "Aug", muted: false },
  { day: 18, month: "Aug", muted: false }, { day: 19, month: "Aug", muted: false },
  { day: 20, month: "Aug", muted: false }, { day: 21, month: "Aug", muted: false },
  { day: 22, month: "Aug", muted: false }, { day: 23, month: "Aug", muted: false },
  { day: 24, month: "Aug", muted: false }, { day: 25, month: "Aug", muted: false },
  { day: 26, month: "Aug", muted: false }, { day: 27, month: "Aug", muted: false },
  { day: 28, month: "Aug", muted: false }, { day: 29, month: "Aug", muted: false },
  { day: 30, month: "Aug", muted: false }, { day: 31, month: "Aug", muted: false },
  { day: 1, month: "Sep", muted: true }, { day: 2, month: "Sep", muted: true },
  { day: 3, month: "Sep", muted: true }, { day: 4, month: "Sep", muted: true },
  { day: 5, month: "Sep", muted: true }, { day: 6, month: "Sep", muted: true },
] as const;

type Accent = "blue" | "violet" | "amber" | "green" | "rose";
type Appointment = { title: string; time: string; face: string; accent: Accent };
type DragGeom = { sx: number; sy: number; dx: number; dy: number; width: number; height: number };

const APPOINTMENTS: Record<string, Appointment[]> = {
  "Aug-4": [{ title: "Maya Chen", time: "10:00 · Review", face: FACE.maya, accent: "blue" }],
  "Aug-6": [{ title: "Daniel Wu", time: "2:30 · Intro", face: FACE.daniel, accent: "violet" }],
  "Aug-7": [{ title: "Priya Shah", time: "11:00 · Follow-up", face: FACE.priya, accent: "green" }],
  "Aug-11": [{ title: "Tom Bennett", time: "9:30 · Walkthrough", face: FACE.tom, accent: "amber" }],
  "Aug-13": [{ title: "Sophie Lee", time: "1:00 · Consultation", face: FACE.sophie, accent: "rose" }],
  "Aug-17": [{ title: "Leo Martin", time: "10:30 · Check-in", face: FACE.leo, accent: "blue" }],
  "Aug-19": [{ title: "Maya Chen", time: "3:00 · Proposal", face: FACE.maya, accent: "violet" }],
  "Aug-21": [{ title: "Priya Shah", time: "11:30 · Review", face: FACE.priya, accent: "green" }],
  "Aug-24": [{ title: "Daniel Wu", time: "9:00 · Call", face: FACE.daniel, accent: "amber" }],
  "Aug-27": [{ title: "Sophie Lee", time: "2:00 · Follow-up", face: FACE.sophie, accent: "rose" }],
  "Aug-28": [{ title: "Tom Bennett", time: "4:00 · Demo", face: FACE.tom, accent: "blue" }],
};

const ACCENT: Record<Accent, string> = {
  blue: "border-l-blue-500", violet: "border-l-violet-500", amber: "border-l-amber-500",
  green: "border-l-emerald-500", rose: "border-l-rose-500",
};

function AppointmentChip({ appointment }: { appointment: Appointment }) {
  return (
    <div className={`flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] ${ACCENT[appointment.accent]} bg-white px-1.5 py-1.5 shadow-[0_8px_20px_-16px_rgba(15,23,42,.5)]`}>
      <img src={appointment.face} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[7.2px] font-black leading-tight text-slate-800">{appointment.title}</div>
        <div className="mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400">{appointment.time}</div>
      </div>
    </div>
  );
}

function NinaChip({ destination = false, lifted = false, large = false }: { destination?: boolean; lifted?: boolean; large?: boolean }) {
  return (
    <motion.div
      className={large
        ? "flex min-w-0 items-center gap-2.5 rounded-[15px] border border-slate-200 border-l-[4px] border-l-blue-500 bg-white p-3 shadow-[0_14px_30px_-22px_rgba(15,23,42,.35)]"
        : "flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] border-l-blue-500 bg-white px-1.5 py-1.5"}
      animate={{
        scale: lifted ? 1.055 : 1,
        boxShadow: lifted ? "0 22px 38px -17px rgba(15,23,42,.42)" : large ? "0 14px 30px -22px rgba(15,23,42,.35)" : "0 8px 20px -16px rgba(15,23,42,.5)",
      }}
      transition={{ duration: 0.2 }}
    >
      <img src={FACE.nina} alt="" className={large ? "h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-100" : "h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100"} />
      <div className="min-w-0 flex-1">
        <div className={large ? "truncate text-[10px] font-black text-slate-800" : "truncate text-[7.2px] font-black leading-tight text-slate-800"}>Nina Alvarez</div>
        <div className={large ? "mt-0.5 truncate text-[7px] font-semibold text-slate-400" : "mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400"}>
          {destination ? "2:00 · Consultation" : "12:00 · Consultation"}
        </div>
      </div>
    </motion.div>
  );
}

function ViewSwitch() {
  return (
    <div className="flex items-center rounded-[10px] border border-slate-200 bg-slate-50 p-0.5">
      {["Day", "Week", "Month"].map((view) => (
        <span key={view} className={view === "Month" ? "rounded-[8px] bg-white px-3 py-1.5 text-[7.5px] font-black text-slate-800 shadow-[0_5px_12px_-10px_rgba(15,23,42,.55)]" : "px-3 py-1.5 text-[7.5px] font-bold text-slate-400"}>{view}</span>
      ))}
    </div>
  );
}

function MonthToolbar({ beat, setNewButton }: { beat: number; setNewButton: (node: HTMLSpanElement | null) => void }) {
  return (
    <div className="flex h-[58px] items-center gap-2 border-b border-slate-200 bg-white px-4">
      <div className="mr-2">
        <div className="text-[13px] font-black tracking-tight text-slate-900">August 2026</div>
        <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Calendar</div>
      </div>
      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500"><ChevronLeft className="h-3.5 w-3.5" /></span>
      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500"><ChevronRight className="h-3.5 w-3.5" /></span>
      <span className="rounded-[9px] border border-slate-200 bg-white px-3 py-1.5 text-[7px] font-black text-slate-600">Today</span>
      <div className="ml-auto flex items-center gap-2">
        <ViewSwitch />
        <motion.span ref={setNewButton} className="flex items-center gap-1.5 rounded-[10px] bg-[#2563eb] px-3.5 py-2 text-[7.5px] font-black text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,.75)]" animate={{ scale: beat === 1 ? 0.96 : 1 }} transition={{ duration: 0.16 }}>
          <Plus className="h-3 w-3" strokeWidth={3} /> New
        </motion.span>
      </div>
    </div>
  );
}

function MonthCell({ day, month, muted, beat, setSource, setDestination }: {
  day: number; month: string; muted: boolean; beat: number;
  setSource: (node: HTMLDivElement | null) => void; setDestination: (node: HTMLDivElement | null) => void;
}) {
  const key = `${month}-${day}`;
  const appointments = APPOINTMENTS[key] ?? [];
  const today = month === "Aug" && day === 18;
  const source = month === "Aug" && day === 18;
  const destination = month === "Aug" && day === 20;
  const booked = beat >= 4;
  const lifted = beat === 7;
  const dragging = beat === 8;
  const moved = beat >= 9;

  return (
    <div className={muted ? "relative min-h-0 overflow-hidden bg-slate-50/65 px-1.5 py-1.5" : "relative min-h-0 overflow-hidden bg-white px-1.5 py-1.5"}>
      <div className="mb-1 flex items-center justify-between">
        <span className={today ? "flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[7px] font-black text-white" : muted ? "text-[7px] font-bold text-slate-300" : "text-[7px] font-black text-slate-500"}>{day}</span>
        {destination && (beat === 7 || beat === 8) ? (
          <motion.span initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="rounded-full border border-dashed border-slate-300 bg-white px-1.5 py-0.5 text-[5.1px] font-black uppercase tracking-[.06em] text-slate-400">Drop 2:00</motion.span>
        ) : null}
      </div>
      <div className="space-y-1">
        {appointments.map((appointment) => <AppointmentChip key={`${appointment.title}-${appointment.time}`} appointment={appointment} />)}
        {source && booked && !moved ? (
          <div ref={setSource} className={dragging ? "opacity-0" : "opacity-100"}>
            <NinaChip lifted={lifted} />
          </div>
        ) : null}
        {destination ? (
          <div ref={setDestination}>
            {moved ? <motion.div initial={{ opacity: 0.2, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }}><NinaChip destination /></motion.div> : <div className="h-[31px] w-full" />}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function NewAppointmentPanel({ beat, reduced, setBookButton }: { beat: number; reduced: boolean; setBookButton: (node: HTMLDivElement | null) => void }) {
  const show = beat === 2 || beat === 3;
  return (
    <AnimatePresence>
      {show ? (
        <motion.div className="absolute right-[2.5%] top-[15%] z-30 w-[31%] overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_30px_68px_-34px_rgba(15,23,42,.5)]" initial={reduced ? false : { opacity: 0, x: 34, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 12, scale: 0.985 }} transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}>
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-500 to-cyan-500 text-white"><CalendarCheck className="h-4 w-4" /></span>
            <div><div className="text-[11px] font-black text-slate-900">New appointment</div><div className="mt-0.5 text-[6.8px] font-semibold text-slate-400">Create a booking</div></div>
          </div>
          <div className="p-4">
            <NinaChip large />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-[11px] border border-slate-200 bg-slate-50 px-2.5 py-2"><div className="text-[5.8px] font-black uppercase tracking-[.13em] text-slate-400">Date</div><div className="mt-1 text-[8px] font-black text-slate-800">Tue 18 Aug</div></div>
              <div className="rounded-[11px] border border-slate-200 bg-slate-50 px-2.5 py-2"><div className="text-[5.8px] font-black uppercase tracking-[.13em] text-slate-400">Time</div><div className="mt-1 text-[8px] font-black text-slate-800">12:00 PM</div></div>
            </div>
            <motion.div ref={setBookButton} className="mt-3 flex items-center justify-center gap-1.5 rounded-[12px] bg-[#18bd59] px-4 py-2.5 text-[8.5px] font-black text-white shadow-[0_12px_26px_-12px_rgba(34,197,94,.85)]" animate={{ scale: beat === 3 ? 0.965 : 1 }} transition={{ duration: reduced ? 0 : 0.16 }}><CalendarCheck className="h-3.5 w-3.5" /> Book appointment</motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StatusToast({ beat, reduced }: { beat: number; reduced: boolean }) {
  const isNew = beat === 4;
  const isMoved = beat === 9;
  return (
    <AnimatePresence mode="wait">
      {isNew || isMoved ? (
        <motion.div key={isNew ? "new" : "moved"} initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: reduced ? 0 : 0.28 }} className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-4 py-3 shadow-[0_24px_54px_-28px_rgba(15,23,42,.48)]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">{isNew ? <Plus className="h-4 w-4" strokeWidth={3} /> : <CalendarCheck className="h-4 w-4" />}</span>
          <div><div className="text-[8.5px] font-black text-slate-900">{isNew ? "New appointment booked" : "Appointment rebooked"}</div><div className="mt-0.5 flex items-center gap-1 text-[6.5px] font-semibold text-slate-400"><Clock3 className="h-2.5 w-2.5" /> Nina Alvarez · {isNew ? "Tue 18 · 12:00 PM" : "Thu 20 · 2:00 PM"}</div></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FloatingRebook({ beat, geom, reduced }: { beat: number; geom: DragGeom | null; reduced: boolean }) {
  if (beat !== 8 || !geom) return null;
  const midX = geom.sx + (geom.dx - geom.sx) * 0.52;
  const arcY = Math.min(geom.sy, geom.dy) - 20;
  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{ width: geom.width, height: geom.height }}
      initial={reduced ? false : { left: geom.sx, top: geom.sy, scale: 1.055, rotate: 0 }}
      animate={{ left: [geom.sx, midX, geom.dx], top: [geom.sy, arcY, geom.dy], scale: [1.055, 1.075, 1], rotate: [0, -1.6, 0] }}
      transition={{ duration: reduced ? 0 : 0.64, times: [0, 0.48, 1], ease: [0.18, 0.78, 0.2, 1] }}
    >
      <NinaChip lifted />
    </motion.div>
  );
}

function ModernMessagePhone({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/10" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
          <motion.div className="relative" initial={reduced ? false : { opacity: 0, y: 26, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduced ? 0 : 0.42, ease: [0.18, 0.78, 0.2, 1] }}>
            <motion.div className="absolute -left-[132px] top-[142px] z-30 flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-3 py-2 text-[7px] font-black text-emerald-700 shadow-[0_16px_36px_-20px_rgba(16,185,129,.48)]" initial={reduced ? false : { opacity: 0, x: -42, y: 16, scale: 0.82 }} animate={{ opacity: [0, 1, 1, 0], x: [0, 72, 112, 136], y: [0, -8, -22, -30], scale: [0.82, 1, 0.9, 0.72] }} transition={{ duration: reduced ? 0 : 0.66, times: [0, 0.22, 0.72, 1], ease: [0.18, 0.78, 0.2, 1] }}><MessageSquare className="h-3 w-3" /> SMS sent</motion.div>

            <div className="relative rounded-[44px] bg-gradient-to-br from-white via-slate-200 to-slate-400 p-[2px] shadow-[0_38px_90px_-32px_rgba(15,23,42,.58)]">
              <div className="relative h-[348px] w-[198px] overflow-hidden rounded-[42px] bg-gradient-to-br from-[#dbeafe] via-[#eef2ff] to-[#f5d0fe]">
                <div className="absolute -left-12 top-12 h-40 w-40 rounded-full bg-cyan-300/40 blur-3xl" />
                <div className="absolute -right-12 bottom-10 h-44 w-44 rounded-full bg-violet-400/35 blur-3xl" />
                <div className="absolute left-8 top-32 h-32 w-32 rounded-full bg-white/55 blur-2xl" />

                <div className="relative z-10 flex items-center justify-between px-4 pt-3 text-[7px] font-black text-slate-800">
                  <span>9:41</span>
                  <div className="flex items-end gap-[2px]">
                    <span className="h-[4px] w-[2px] rounded-sm bg-slate-700" /><span className="h-[6px] w-[2px] rounded-sm bg-slate-700" /><span className="h-[8px] w-[2px] rounded-sm bg-slate-700" />
                    <span className="ml-1 h-[7px] w-[12px] rounded-[2px] border border-slate-700"><span className="block h-full w-[75%] rounded-[1px] bg-slate-700" /></span>
                  </div>
                </div>
                <div className="absolute left-1/2 top-[9px] z-20 h-[17px] w-[52px] -translate-x-1/2 rounded-full bg-slate-900/90" />

                <div className="relative z-10 mt-9 text-center">
                  <div className="text-[22px] font-semibold tracking-[-.04em] text-slate-800">2:01</div>
                  <div className="mt-0.5 text-[7px] font-semibold text-slate-600">Thursday, 20 August</div>
                </div>

                <motion.div
                  className="absolute left-3 right-3 top-[103px] z-20 rounded-[20px] border border-white/70 bg-white/78 p-3 shadow-[0_18px_48px_-26px_rgba(15,23,42,.45)] backdrop-blur-xl"
                  initial={reduced ? false : { opacity: 0, y: -14, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.42, ease: [0.18, 0.78, 0.2, 1] }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_8px_16px_-10px_rgba(16,185,129,.7)]"><MessageSquare className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2"><span className="text-[7px] font-black uppercase tracking-[.08em] text-slate-500">Messages</span><span className="text-[6px] font-semibold text-slate-400">now</span></div>
                      <div className="mt-1 text-[8px] font-black text-slate-900">Zapla</div>
                    </div>
                  </div>
                  <div className="mt-2.5 text-[7.5px] font-semibold leading-[1.5] text-slate-700">Hi Nina, your appointment has been moved to Thu 20 at 2:00 PM. See you then!</div>
                </motion.div>

                <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.82 }} className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[5.5px] font-semibold text-slate-500/70">Swipe up to open</motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function beatFor(elapsedMs: number, reduced: boolean) {
  if (reduced) return 10;
  if (elapsedMs < 400) return 0;
  if (elapsedMs < 750) return 1;
  if (elapsedMs < 1150) return 2;
  if (elapsedMs < 1500) return 3;
  if (elapsedMs < 1900) return 4;
  if (elapsedMs < 2250) return 5;
  if (elapsedMs < 2550) return 6;
  if (elapsedMs < 2850) return 7;
  if (elapsedMs < 3500) return 8;
  if (elapsedMs < 3800) return 9;
  return 10;
}

export function SceneCalendarLive({ elapsedMs, reduced }: SceneProps) {
  const beat = beatFor(elapsedMs, reduced);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const newButtonRef = useRef<HTMLSpanElement | null>(null);
  const bookButtonRef = useRef<HTMLDivElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const destinationRef = useRef<HTMLDivElement | null>(null);
  const [point, setPoint] = useState<CursorPoint>(null);
  const [dragGeom, setDragGeom] = useState<DragGeom | null>(null);

  const target: "new" | "book" | "source" | "destination" | null = beat === 1 ? "new" : beat === 2 || beat === 3 ? "book" : beat === 6 || beat === 7 ? "source" : beat === 8 ? "destination" : null;

  const measureTarget = () => {
    const root = rootRef.current;
    const el = target === "new" ? newButtonRef.current : target === "book" ? bookButtonRef.current : target === "source" ? sourceRef.current : target === "destination" ? destinationRef.current : null;
    if (!root || !el) return;
    const r = root.getBoundingClientRect();
    const b = el.getBoundingClientRect();
    setPoint({ x: b.left - r.left + b.width * 0.52, y: b.top - r.top + b.height * 0.55 });
  };

  const measureDrag = () => {
    const root = rootRef.current;
    const source = sourceRef.current;
    const destination = destinationRef.current;
    if (!root || !source || !destination) return;
    const r = root.getBoundingClientRect();
    const s = source.getBoundingClientRect();
    const d = destination.getBoundingClientRect();
    setDragGeom({ sx: s.left - r.left, sy: s.top - r.top, dx: d.left - r.left, dy: d.top - r.top, width: s.width, height: s.height });
  };

  useEffect(() => {
    if (reduced || !target) { setPoint(null); return; }
    const raf = requestAnimationFrame(() => requestAnimationFrame(measureTarget));
    const timeout = window.setTimeout(measureTarget, 80);
    window.addEventListener("resize", measureTarget);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timeout); window.removeEventListener("resize", measureTarget); };
  }, [target, beat, reduced]);

  useEffect(() => {
    if (beat !== 7 && beat !== 8) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(measureDrag));
    const timeout = window.setTimeout(measureDrag, 70);
    window.addEventListener("resize", measureDrag);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(timeout); window.removeEventListener("resize", measureDrag); };
  }, [beat]);

  const phonePayoff = beat >= 10;

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-white">
      <motion.div className="absolute inset-0" animate={{ filter: phonePayoff ? "blur(4px)" : "blur(0px)", opacity: phonePayoff ? 0.58 : 1, scale: phonePayoff ? 0.992 : 1 }} transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}>
        <MonthToolbar beat={beat} setNewButton={(node) => { newButtonRef.current = node; }} />
        <div className="grid h-[30px] grid-cols-7 border-b border-slate-200 bg-slate-50/80">
          {WEEKDAYS.map((day) => <div key={day} className="flex items-center justify-center border-r border-slate-200 text-[6.5px] font-black uppercase tracking-[.12em] text-slate-400 last:border-r-0">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 gap-px bg-slate-200" style={{ height: "calc(100% - 88px)" }}>
          {MONTH_DAYS.map((cell) => (
            <MonthCell key={`${cell.month}-${cell.day}`} {...cell} beat={beat}
              setSource={(node) => { if (cell.month === "Aug" && cell.day === 18) sourceRef.current = node; }}
              setDestination={(node) => { if (cell.month === "Aug" && cell.day === 20) destinationRef.current = node; }} />
          ))}
        </div>
      </motion.div>

      <NewAppointmentPanel beat={beat} reduced={reduced} setBookButton={(node) => { bookButtonRef.current = node; }} />
      <StatusToast beat={beat} reduced={reduced} />
      <FloatingRebook beat={beat} geom={dragGeom} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={beat === 1 || beat === 3 || beat === 7} reduced={reduced} />
      <ModernMessagePhone show={phonePayoff} reduced={reduced} />
    </div>
  );
}
