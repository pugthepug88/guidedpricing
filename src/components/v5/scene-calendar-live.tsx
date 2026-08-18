import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Check, Mail, MessageSquare } from "lucide-react";
import { FACE } from "./faces";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const DAYS = ["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8"] as const;
const TIMES = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"] as const;

const EVENTS: Record<string, { title: string; sub: string; tone: "blue" | "violet" | "amber" | "green" }> = {
  "0-0": { title: "Mia Chen", sub: "Intro call", tone: "blue" },
  "1-2": { title: "Jacob Lee", sub: "Walkthrough", tone: "violet" },
  "2-1": { title: "Site visit", sub: "45 min", tone: "amber" },
  "3-4": { title: "Proposal", sub: "Review", tone: "green" },
  "4-5": { title: "Team sync", sub: "30 min", tone: "blue" },
};

const TONES = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
} as const;

function MiniEvent({ title, sub, tone }: { title: string; sub: string; tone: keyof typeof TONES }) {
  return (
    <div className={`h-full rounded-[10px] border px-2 py-1.5 ${TONES[tone]}`}>
      <div className="truncate text-[8.5px] font-black">{title}</div>
      <div className="mt-0.5 truncate text-[6.8px] font-bold opacity-70">{sub}</div>
    </div>
  );
}

function CalendarGrid({ phase, reduced }: { phase: number; reduced: boolean }) {
  const focused = phase >= 1;
  const booked = phase >= 4;

  return (
    <div className="absolute bottom-[5%] left-[3%] top-[5%] w-[68%] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_24px_70px_-42px_rgba(15,23,42,.45)]">
      <div className="flex h-[58px] items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-3">
          <span
            className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-[12px] text-white shadow-[0_14px_28px_-12px_rgba(37,99,235,.9)]"
            style={{ background: "linear-gradient(145deg,#60a5fa 0%,#2563eb 52%,#06b6d4 100%)" }}
          >
            <span className="absolute inset-x-1 top-0 h-[45%] rounded-full bg-white/20 blur-[7px]" />
            <CalendarCheck className="relative z-10 h-5 w-5" />
          </span>
          <div>
            <div className="text-[13px] font-black text-slate-900">August 4–8</div>
            <div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">Weekly calendar</div>
          </div>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[7px] font-black text-slate-500">Today</div>
      </div>

      <div
        className="grid h-[calc(100%-58px)] gap-px bg-slate-100"
        style={{ gridTemplateColumns: "52px repeat(5,minmax(0,1fr))", gridTemplateRows: "30px repeat(6,minmax(0,1fr))" }}
      >
        <div className="bg-white" />
        {DAYS.map((day, index) => (
          <div key={day} className={index === 4 ? "flex items-center justify-center bg-blue-50 text-[8px] font-black uppercase tracking-[.12em] text-blue-700" : "flex items-center justify-center bg-white text-[8px] font-black uppercase tracking-[.12em] text-slate-400"}>
            {day}
          </div>
        ))}

        {TIMES.map((time, row) => (
          <div key={time} className="contents">
            <div className="flex items-start justify-end bg-white pr-2 pt-2 text-[7px] font-bold text-slate-400">{time}</div>
            {DAYS.map((_, col) => {
              const key = `${col}-${row}`;
              const target = col === 4 && row === 3;
              const seeded = EVENTS[key];

              if (target) {
                return (
                  <motion.div
                    key={key}
                    className="relative bg-white p-1.5"
                    animate={{ backgroundColor: booked ? "rgba(236,253,245,1)" : focused ? "rgba(239,246,255,1)" : "rgba(255,255,255,1)" }}
                    transition={{ duration: reduced ? 0 : 0.28 }}
                  >
                    <motion.div
                      className={booked ? "h-full rounded-[11px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-2 shadow-[0_10px_24px_-18px_rgba(16,185,129,.65)]" : "flex h-full items-center justify-center rounded-[11px] border border-dashed border-slate-300 bg-white text-[7.5px] font-black text-slate-400"}
                      animate={{ scale: focused && !booked ? 1.035 : 1, borderColor: booked ? "rgba(16,185,129,.45)" : focused ? "rgba(59,130,246,.55)" : "rgba(203,213,225,1)" }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                    >
                      {booked ? (
                        <motion.div initial={reduced ? false : { opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0 : 0.3 }}>
                          <div className="truncate text-[8.5px] font-black text-slate-900">Nina Alvarez</div>
                          <div className="mt-0.5 truncate text-[6.7px] font-bold text-slate-500">Consultation</div>
                          <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[5.8px] font-black text-white">
                            <Check className="h-2 w-2" strokeWidth={3} /> Confirmed
                          </div>
                        </motion.div>
                      ) : (
                        "12:00 available"
                      )}
                    </motion.div>
                  </motion.div>
                );
              }

              return (
                <div key={key} className="bg-white p-1.5">
                  {seeded ? (
                    <MiniEvent {...seeded} />
                  ) : (
                    <div className="h-full rounded-[10px] border border-slate-100 bg-slate-50/65 p-2">
                      <div className="h-1.5 w-[68%] rounded-full bg-slate-200" />
                      <div className="mt-1.5 h-1.5 w-[42%] rounded-full bg-slate-100" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingDrawer({ phase, reduced }: { phase: number; reduced: boolean }) {
  const show = phase >= 2 && phase <= 3;
  const pressing = phase === 3;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="absolute right-[3%] top-[13%] z-30 w-[25%] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_30px_70px_-34px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, x: 34, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 18, scale: 0.98 }}
          transition={{ duration: reduced ? 0 : 0.36, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,.9)]">
              <CalendarCheck className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[11px] font-black text-slate-900">New appointment</div>
              <div className="mt-0.5 text-[6.8px] font-semibold text-slate-400">Friday 8 August</div>
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-2.5">
                <img src={FACE.nina} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-[10px] font-black text-slate-900">Nina Alvarez</div>
                  <div className="mt-0.5 truncate text-[6.8px] font-semibold text-slate-400">Consultation · 45 min</div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-[11px] border border-slate-200 bg-white px-2.5 py-2">
                  <div className="text-[5.8px] font-black uppercase tracking-[.13em] text-slate-400">Date</div>
                  <div className="mt-1 text-[7.8px] font-black text-slate-800">Fri 8 Aug</div>
                </div>
                <div className="rounded-[11px] border border-blue-200 bg-blue-50 px-2.5 py-2">
                  <div className="text-[5.8px] font-black uppercase tracking-[.13em] text-blue-400">Time</div>
                  <div className="mt-1 text-[7.8px] font-black text-blue-700">12:00 PM</div>
                </div>
              </div>
            </div>

            <motion.div
              className="mt-3 flex items-center justify-center gap-1.5 rounded-[12px] bg-[#18bd59] px-4 py-2.5 text-[8px] font-black text-white shadow-[0_12px_26px_-12px_rgba(34,197,94,.85)]"
              animate={{ scale: pressing ? 0.965 : 1, boxShadow: pressing ? "0 8px 18px -10px rgba(34,197,94,.75)" : "0 12px 26px -12px rgba(34,197,94,.85)" }}
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

function FlyingAppointment({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 3 ? (
        <motion.div
          className="absolute z-40 w-[118px] overflow-hidden rounded-[15px] border-[2px] border-white bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-2.5 shadow-[0_24px_46px_-24px_rgba(15,23,42,.52)]"
          initial={reduced ? false : { left: "80%", top: "42%", opacity: 0, scale: 0.78, rotate: 2 }}
          animate={{ left: "61.7%", top: "55.5%", opacity: [0, 1, 1, 0], scale: [0.78, 1, 0.72, 0.58], rotate: [2, 0, -1, 0] }}
          transition={{ duration: reduced ? 0 : 0.72, times: [0, 0.15, 0.82, 1], ease: [0.18, 0.78, 0.2, 1] }}
        >
          <div className="text-[8.5px] font-black text-slate-900">Nina Alvarez</div>
          <div className="mt-0.5 text-[6.6px] font-bold text-slate-500">Consultation</div>
          <div className="mt-1.5 inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[5.8px] font-black text-blue-700">Fri 12:00</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ConfirmationStack({ phase, reduced }: { phase: number; reduced: boolean }) {
  const show = phase >= 4;
  if (!show) return null;

  return (
    <div className="absolute right-[3%] top-[24%] z-20 w-[24%] space-y-2.5">
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 18, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
        className="rounded-[16px] border border-emerald-200 bg-white p-3.5 shadow-[0_18px_42px_-28px_rgba(15,23,42,.45)]"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-4 w-4" strokeWidth={3} /></span>
          <div>
            <div className="text-[9px] font-black text-slate-900">Appointment booked</div>
            <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Nina Alvarez · Fri 12:00</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.12 }}
        className="flex items-center gap-2 rounded-[13px] border border-emerald-200 bg-white px-3 py-2.5 text-[7.5px] font-black text-slate-600 shadow-[0_14px_30px_-24px_rgba(15,23,42,.4)]"
      >
        <MessageSquare className="h-3.5 w-3.5 text-emerald-600" /> SMS confirmation sent
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.22 }}
        className="flex items-center gap-2 rounded-[13px] border border-blue-200 bg-white px-3 py-2.5 text-[7.5px] font-black text-slate-600 shadow-[0_14px_30px_-24px_rgba(15,23,42,.4)]"
      >
        <Mail className="h-3.5 w-3.5 text-blue-600" /> Email confirmation sent
      </motion.div>
    </div>
  );
}

export function SceneCalendarLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "64%", top: "56%" },
    2: { left: "87%", top: "65%" },
    3: { left: "87%", top: "65%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <CalendarGrid phase={phase} reduced={reduced} />
      <BookingDrawer phase={phase} reduced={reduced} />
      <FlyingAppointment phase={phase} reduced={reduced} />
      <ConfirmationStack phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 3} reduced={reduced} />
    </div>
  );
}
