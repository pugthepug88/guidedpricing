import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock3, Plus } from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const MONTH_DAYS = [
  { day: 27, month: "Jul", muted: true },
  { day: 28, month: "Jul", muted: true },
  { day: 29, month: "Jul", muted: true },
  { day: 30, month: "Jul", muted: true },
  { day: 31, month: "Jul", muted: true },
  { day: 1, month: "Aug", muted: false },
  { day: 2, month: "Aug", muted: false },
  { day: 3, month: "Aug", muted: false },
  { day: 4, month: "Aug", muted: false },
  { day: 5, month: "Aug", muted: false },
  { day: 6, month: "Aug", muted: false },
  { day: 7, month: "Aug", muted: false },
  { day: 8, month: "Aug", muted: false },
  { day: 9, month: "Aug", muted: false },
  { day: 10, month: "Aug", muted: false },
  { day: 11, month: "Aug", muted: false },
  { day: 12, month: "Aug", muted: false },
  { day: 13, month: "Aug", muted: false },
  { day: 14, month: "Aug", muted: false },
  { day: 15, month: "Aug", muted: false },
  { day: 16, month: "Aug", muted: false },
  { day: 17, month: "Aug", muted: false },
  { day: 18, month: "Aug", muted: false },
  { day: 19, month: "Aug", muted: false },
  { day: 20, month: "Aug", muted: false },
  { day: 21, month: "Aug", muted: false },
  { day: 22, month: "Aug", muted: false },
  { day: 23, month: "Aug", muted: false },
  { day: 24, month: "Aug", muted: false },
  { day: 25, month: "Aug", muted: false },
  { day: 26, month: "Aug", muted: false },
  { day: 27, month: "Aug", muted: false },
  { day: 28, month: "Aug", muted: false },
  { day: 29, month: "Aug", muted: false },
  { day: 30, month: "Aug", muted: false },
  { day: 31, month: "Aug", muted: false },
  { day: 1, month: "Sep", muted: true },
  { day: 2, month: "Sep", muted: true },
  { day: 3, month: "Sep", muted: true },
  { day: 4, month: "Sep", muted: true },
  { day: 5, month: "Sep", muted: true },
  { day: 6, month: "Sep", muted: true },
] as const;

type Accent = "blue" | "violet" | "amber" | "green" | "rose";

type Appointment = {
  title: string;
  time: string;
  face: string;
  accent: Accent;
};

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

const ACCENT_CLASSES: Record<Accent, { stripe: string; dot: string }> = {
  blue: { stripe: "border-l-blue-500", dot: "bg-blue-500" },
  violet: { stripe: "border-l-violet-500", dot: "bg-violet-500" },
  amber: { stripe: "border-l-amber-500", dot: "bg-amber-500" },
  green: { stripe: "border-l-emerald-500", dot: "bg-emerald-500" },
  rose: { stripe: "border-l-rose-500", dot: "bg-rose-500" },
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const accent = ACCENT_CLASSES[appointment.accent];

  return (
    <div
      className={`flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] ${accent.stripe} bg-white px-1.5 py-1.5 shadow-[0_8px_20px_-16px_rgba(15,23,42,.5)]`}
    >
      <img src={appointment.face} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[7.2px] font-black leading-tight text-slate-800">{appointment.title}</div>
        <div className="mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400">{appointment.time}</div>
      </div>
    </div>
  );
}

function NinaAppointment({ lifted = false, destination = false }: { lifted?: boolean; destination?: boolean }) {
  return (
    <motion.div
      layoutId="calendar-rebook-nina"
      className="flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] border-l-blue-500 bg-white px-1.5 py-1.5"
      animate={{
        scale: lifted ? 1.055 : 1,
        boxShadow: lifted
          ? "0 20px 34px -16px rgba(15,23,42,.38)"
          : destination
            ? "0 0 0 3px rgba(37,99,235,.08), 0 8px 20px -16px rgba(15,23,42,.5)"
            : "0 8px 20px -16px rgba(15,23,42,.5)",
      }}
      transition={{
        layout: { duration: 0.82, ease: [0.18, 0.78, 0.2, 1] },
        scale: { duration: 0.2 },
      }}
    >
      <img src={FACE.nina} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[7.2px] font-black leading-tight text-slate-800">Nina Alvarez</div>
        <div className="mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400">
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
        <span
          key={view}
          className={
            view === "Month"
              ? "rounded-[8px] bg-white px-3 py-1.5 text-[7.5px] font-black text-slate-800 shadow-[0_5px_12px_-10px_rgba(15,23,42,.55)]"
              : "px-3 py-1.5 text-[7.5px] font-bold text-slate-400"
          }
        >
          {view}
        </span>
      ))}
    </div>
  );
}

function MonthToolbar() {
  return (
    <div className="flex h-[58px] items-center gap-2 border-b border-slate-200 bg-white px-4">
      <div className="mr-2">
        <div className="text-[13px] font-black tracking-tight text-slate-900">August 2026</div>
        <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Calendar</div>
      </div>

      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500">
        <ChevronLeft className="h-3.5 w-3.5" />
      </span>
      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] border border-slate-200 bg-white text-slate-500">
        <ChevronRight className="h-3.5 w-3.5" />
      </span>
      <span className="rounded-[9px] border border-slate-200 bg-white px-3 py-1.5 text-[7px] font-black text-slate-600">Today</span>

      <div className="ml-auto flex items-center gap-2">
        <ViewSwitch />
        <span className="flex items-center gap-1.5 rounded-[10px] bg-[#2563eb] px-3.5 py-2 text-[7.5px] font-black text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,.75)]">
          <Plus className="h-3 w-3" strokeWidth={3} /> New
        </span>
      </div>
    </div>
  );
}

function MonthCell({
  day,
  month,
  muted,
  phase,
}: {
  day: number;
  month: string;
  muted: boolean;
  phase: number;
}) {
  const key = `${month}-${day}`;
  const appointments = APPOINTMENTS[key] ?? [];
  const today = month === "Aug" && day === 18;
  const source = month === "Aug" && day === 18;
  const destination = month === "Aug" && day === 20;
  const lifted = phase === 2;
  const moved = phase >= 3;
  const targetActive = destination && (phase === 2 || phase === 3);

  return (
    <motion.div
      className={
        muted
          ? "relative min-h-0 overflow-hidden bg-slate-50/65 px-1.5 py-1.5"
          : "relative min-h-0 overflow-hidden bg-white px-1.5 py-1.5"
      }
      animate={{
        backgroundColor: targetActive
          ? "rgba(239,246,255,.92)"
          : muted
            ? "rgba(248,250,252,.65)"
            : "rgba(255,255,255,1)",
      }}
      transition={{ duration: 0.25 }}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className={
            today
              ? "flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[7px] font-black text-white"
              : muted
                ? "text-[7px] font-bold text-slate-300"
                : "text-[7px] font-black text-slate-500"
          }
        >
          {day}
        </span>

        {targetActive ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full bg-blue-50 px-1.5 py-0.5 text-[5.2px] font-black uppercase tracking-[.08em] text-blue-600"
          >
            Drop here
          </motion.span>
        ) : null}
      </div>

      <div className="space-y-1">
        {appointments.map((appointment) => (
          <AppointmentCard key={`${appointment.title}-${appointment.time}`} appointment={appointment} />
        ))}

        {source && !moved ? <NinaAppointment lifted={lifted} /> : null}
        {destination && moved ? <NinaAppointment destination /> : null}
      </div>
    </motion.div>
  );
}

function RebookToast({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 4 ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
          className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-4 py-3 shadow-[0_24px_54px_-28px_rgba(15,23,42,.48)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_20px_-12px_rgba(16,185,129,.75)]">
            <CalendarCheck className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[8.5px] font-black text-slate-900">Appointment rebooked</div>
            <div className="mt-0.5 flex items-center gap-1 text-[6.5px] font-semibold text-slate-400">
              <Clock3 className="h-2.5 w-2.5" /> Nina Alvarez · Thu 20 · 2:00 PM · Client notified
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneCalendarLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "20%", top: "61%" },
    2: { left: "20%", top: "61%" },
    3: { left: "49%", top: "61%" },
  };

  return (
    <LayoutGroup id="calendar-month-rebooking">
      <div className="absolute inset-0 overflow-hidden bg-white">
        <MonthToolbar />

        <div className="grid h-[30px] grid-cols-7 border-b border-slate-200 bg-slate-50/80">
          {WEEKDAYS.map((day) => (
            <div key={day} className="flex items-center justify-center border-r border-slate-200 text-[6.5px] font-black uppercase tracking-[.12em] text-slate-400 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        <div
          className="grid grid-cols-7 grid-rows-6 gap-px bg-slate-200"
          style={{ height: "calc(100% - 88px)" }}
        >
          {MONTH_DAYS.map((cell) => (
            <MonthCell key={`${cell.month}-${cell.day}`} {...cell} phase={phase} />
          ))}
        </div>

        <RebookToast phase={phase} reduced={reduced} />
        <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 2} reduced={reduced} />
      </div>
    </LayoutGroup>
  );
}
