import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { CalendarCheck, ChevronLeft, ChevronRight, Clock3, MessageSquare, Plus } from "lucide-react";
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

const ACCENT_CLASSES: Record<Accent, string> = {
  blue: "border-l-blue-500",
  violet: "border-l-violet-500",
  amber: "border-l-amber-500",
  green: "border-l-emerald-500",
  rose: "border-l-rose-500",
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div
      className={`flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] ${ACCENT_CLASSES[appointment.accent]} bg-white px-1.5 py-1.5 shadow-[0_8px_20px_-16px_rgba(15,23,42,.5)]`}
    >
      <img src={appointment.face} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[7.2px] font-black leading-tight text-slate-800">{appointment.title}</div>
        <div className="mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400">{appointment.time}</div>
      </div>
    </div>
  );
}

function NinaAppointment({ mode, lifted = false }: { mode: "panel" | "source" | "destination"; lifted?: boolean }) {
  const panel = mode === "panel";
  const destination = mode === "destination";

  return (
    <motion.div
      layoutId="calendar-nina-appointment"
      className={
        panel
          ? "flex min-w-0 items-center gap-2.5 rounded-[15px] border border-slate-200 border-l-[4px] border-l-blue-500 bg-white p-3 shadow-[0_14px_30px_-22px_rgba(15,23,42,.35)]"
          : "flex min-w-0 items-center gap-1.5 rounded-[9px] border border-slate-200 border-l-[3px] border-l-blue-500 bg-white px-1.5 py-1.5"
      }
      animate={{
        scale: lifted ? 1.06 : 1,
        boxShadow: lifted
          ? "0 22px 38px -17px rgba(15,23,42,.4)"
          : panel
            ? "0 14px 30px -22px rgba(15,23,42,.35)"
            : "0 8px 20px -16px rgba(15,23,42,.5)",
      }}
      transition={{
        layout: { duration: 0.78, ease: [0.18, 0.78, 0.2, 1] },
        scale: { duration: 0.2 },
      }}
    >
      <img
        src={FACE.nina}
        alt=""
        className={panel ? "h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-100" : "h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-slate-100"}
      />
      <div className="min-w-0 flex-1">
        <div className={panel ? "truncate text-[10px] font-black text-slate-800" : "truncate text-[7.2px] font-black leading-tight text-slate-800"}>
          Nina Alvarez
        </div>
        <div className={panel ? "mt-0.5 truncate text-[7px] font-semibold text-slate-400" : "mt-0.5 truncate text-[5.9px] font-semibold leading-tight text-slate-400"}>
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

function MonthToolbar({ beat, setNewButton }: { beat: number; setNewButton: (node: HTMLSpanElement | null) => void }) {
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
        <motion.span
          ref={setNewButton}
          className="flex items-center gap-1.5 rounded-[10px] bg-[#2563eb] px-3.5 py-2 text-[7.5px] font-black text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,.75)]"
          animate={{ scale: beat === 1 ? 0.96 : 1 }}
          transition={{ duration: 0.16 }}
        >
          <Plus className="h-3 w-3" strokeWidth={3} /> New
        </motion.span>
      </div>
    </div>
  );
}

function MonthCell({
  day,
  month,
  muted,
  beat,
  setSource,
  setDestination,
}: {
  day: number;
  month: string;
  muted: boolean;
  beat: number;
  setSource: (node: HTMLDivElement | null) => void;
  setDestination: (node: HTMLDivElement | null) => void;
}) {
  const key = `${month}-${day}`;
  const appointments = APPOINTMENTS[key] ?? [];
  const today = month === "Aug" && day === 18;
  const source = month === "Aug" && day === 18;
  const destination = month === "Aug" && day === 20;
  const newBooked = beat >= 4;
  const lifted = beat === 7;
  const moved = beat >= 8;
  const targetActive = destination && (beat === 7 || beat === 8);

  return (
    <div
      className={
        muted
          ? "relative min-h-0 overflow-hidden bg-slate-50/65 px-1.5 py-1.5"
          : "relative min-h-0 overflow-hidden bg-white px-1.5 py-1.5"
      }
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-full border border-dashed border-slate-300 bg-white px-1.5 py-0.5 text-[5.1px] font-black uppercase tracking-[.06em] text-slate-400"
          >
            Drop 2:00
          </motion.span>
        ) : null}
      </div>

      <div className="space-y-1">
        {appointments.map((appointment) => (
          <AppointmentCard key={`${appointment.title}-${appointment.time}`} appointment={appointment} />
        ))}

        {source && newBooked && !moved ? (
          <div ref={setSource}>
            <NinaAppointment mode="source" lifted={lifted} />
          </div>
        ) : null}

        {destination && moved ? (
          <div ref={setDestination}>
            <NinaAppointment mode="destination" />
          </div>
        ) : destination ? (
          <div ref={setDestination} className="h-9 w-full" />
        ) : null}
      </div>
    </div>
  );
}

function NewAppointmentPanel({
  beat,
  reduced,
  setBookButton,
}: {
  beat: number;
  reduced: boolean;
  setBookButton: (node: HTMLDivElement | null) => void;
}) {
  const show = beat === 2 || beat === 3;
  const pressing = beat === 3;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="absolute right-[2.5%] top-[15%] z-30 w-[31%] overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_30px_68px_-34px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, x: 34, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 12, scale: 0.985 }}
          transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,.9)]">
              <CalendarCheck className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[11px] font-black text-slate-900">New appointment</div>
              <div className="mt-0.5 text-[6.8px] font-semibold text-slate-400">Create a booking</div>
            </div>
          </div>

          <div className="p-4">
            <NinaAppointment mode="panel" />

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-[11px] border border-slate-200 bg-slate-50 px-2.5 py-2">
                <div className="text-[5.8px] font-black uppercase tracking-[.13em] text-slate-400">Date</div>
                <div className="mt-1 text-[8px] font-black text-slate-800">Tue 18 Aug</div>
              </div>
              <div className="rounded-[11px] border border-slate-200 bg-slate-50 px-2.5 py-2">
                <div className="text-[5.8px] font-black uppercase tracking-[.13em] text-slate-400">Time</div>
                <div className="mt-1 text-[8px] font-black text-slate-800">12:00 PM</div>
              </div>
            </div>

            <motion.div
              ref={setBookButton}
              className="mt-3 flex items-center justify-center gap-1.5 rounded-[12px] bg-[#18bd59] px-4 py-2.5 text-[8.5px] font-black text-white shadow-[0_12px_26px_-12px_rgba(34,197,94,.85)]"
              animate={{ scale: pressing ? 0.965 : 1 }}
              transition={{ duration: reduced ? 0 : 0.16 }}
            >
              <CalendarCheck className="h-3.5 w-3.5" /> Book appointment
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function StatusToast({ beat, reduced }: { beat: number; reduced: boolean }) {
  const newBooked = beat === 4;
  const rebooked = beat === 9;

  return (
    <AnimatePresence mode="wait">
      {newBooked ? (
        <motion.div
          key="new"
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
          className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-4 py-3 shadow-[0_24px_54px_-28px_rgba(15,23,42,.48)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Plus className="h-4 w-4" strokeWidth={3} />
          </span>
          <div>
            <div className="text-[8.5px] font-black text-slate-900">New appointment booked</div>
            <div className="mt-0.5 flex items-center gap-1 text-[6.5px] font-semibold text-slate-400">
              <Clock3 className="h-2.5 w-2.5" /> Nina Alvarez · Tue 18 · 12:00 PM
            </div>
          </div>
        </motion.div>
      ) : rebooked ? (
        <motion.div
          key="rebook"
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
          className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-slate-200 bg-white px-4 py-3 shadow-[0_24px_54px_-28px_rgba(15,23,42,.48)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
            <CalendarCheck className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[8.5px] font-black text-slate-900">Appointment rebooked</div>
            <div className="mt-0.5 flex items-center gap-1 text-[6.5px] font-semibold text-slate-400">
              <Clock3 className="h-2.5 w-2.5" /> Nina Alvarez · Thu 20 · 2:00 PM
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SmsStatus({ beat, reduced }: { beat: number; reduced: boolean }) {
  const reminder = beat === 5;
  const reschedule = beat >= 10;

  return (
    <AnimatePresence mode="wait">
      {reminder ? (
        <motion.div
          key="reminder"
          initial={reduced ? false : { opacity: 0, x: 18, y: -4 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.2, 0.82, 0.24, 1] }}
          className="absolute right-3 top-[72px] z-30 flex items-center gap-2.5 rounded-[13px] border border-emerald-200 bg-white px-3 py-2.5 shadow-[0_18px_38px_-24px_rgba(15,23,42,.42)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <MessageSquare className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[8px] font-black text-slate-800">SMS reminder sent</div>
            <div className="mt-0.5 text-[6.3px] font-semibold text-slate-400">Nina · Tue 18 · 12:00 PM</div>
          </div>
        </motion.div>
      ) : reschedule ? (
        <motion.div
          key="reschedule"
          initial={reduced ? false : { opacity: 0, x: 18, y: -4 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.2, 0.82, 0.24, 1] }}
          className="absolute right-3 top-[72px] z-30 flex items-center gap-2.5 rounded-[13px] border border-blue-200 bg-white px-3 py-2.5 shadow-[0_18px_38px_-24px_rgba(15,23,42,.42)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <MessageSquare className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[8px] font-black text-slate-800">Reschedule SMS sent</div>
            <div className="mt-0.5 text-[6.3px] font-semibold text-slate-400">Updated to Thu 20 · 2:00 PM</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function beatFor(elapsedMs: number, reduced: boolean) {
  if (reduced) return 10;
  if (elapsedMs < 500) return 0;
  if (elapsedMs < 900) return 1;
  if (elapsedMs < 1450) return 2;
  if (elapsedMs < 1850) return 3;
  if (elapsedMs < 2350) return 4;
  if (elapsedMs < 2850) return 5;
  if (elapsedMs < 3250) return 6;
  if (elapsedMs < 3700) return 7;
  if (elapsedMs < 4250) return 8;
  if (elapsedMs < 4850) return 9;
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

  const target: "new" | "book" | "source" | "destination" | null =
    beat === 1
      ? "new"
      : beat === 2 || beat === 3
        ? "book"
        : beat === 6 || beat === 7
          ? "source"
          : beat === 8
            ? "destination"
            : null;

  useEffect(() => {
    if (reduced || !target) {
      setPoint(null);
      return;
    }

    const getTarget = () =>
      target === "new"
        ? newButtonRef.current
        : target === "book"
          ? bookButtonRef.current
          : target === "source"
            ? sourceRef.current
            : destinationRef.current;

    const measure = () => {
      const root = rootRef.current;
      const el = getTarget();
      if (!root || !el) return;
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPoint({
        x: b.left - r.left + b.width * 0.52,
        y: b.top - r.top + b.height * 0.55,
      });
    };

    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    const timeout = window.setTimeout(measure, 90);
    window.addEventListener("resize", measure);

    const el = getTarget();
    const observer = typeof ResizeObserver !== "undefined" && el ? new ResizeObserver(measure) : null;
    if (el && observer) observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [target, beat, reduced]);

  return (
    <LayoutGroup id="calendar-new-and-rebook">
      <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-white">
        <MonthToolbar
          beat={beat}
          setNewButton={(node) => {
            newButtonRef.current = node;
          }}
        />

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
            <MonthCell
              key={`${cell.month}-${cell.day}`}
              {...cell}
              beat={beat}
              setSource={(node) => {
                if (cell.month === "Aug" && cell.day === 18) sourceRef.current = node;
              }}
              setDestination={(node) => {
                if (cell.month === "Aug" && cell.day === 20) destinationRef.current = node;
              }}
            />
          ))}
        </div>

        <NewAppointmentPanel
          beat={beat}
          reduced={reduced}
          setBookButton={(node) => {
            bookButtonRef.current = node;
          }}
        />
        <StatusToast beat={beat} reduced={reduced} />
        <SmsStatus beat={beat} reduced={reduced} />
        <ZaplaDemoCursor
          point={point}
          press={beat === 1 || beat === 3 || beat === 7}
          reduced={reduced}
        />
      </div>
    </LayoutGroup>
  );
}
