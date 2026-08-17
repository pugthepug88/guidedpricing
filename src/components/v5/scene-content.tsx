import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Image as ImageIcon,
  Plus,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  InstagramMark,
  LinkedInMark,
  TikTokMark,
} from "./social-brands";

const DAYS = [
  { label: "Mon", date: "17" },
  { label: "Tue", date: "18" },
  { label: "Wed", date: "19" },
  { label: "Thu", date: "20" },
  { label: "Fri", date: "21" },
  { label: "Sat", date: "22" },
  { label: "Sun", date: "23" },
];

const CHANNELS = [
  { key: "instagram", label: "Instagram", Mark: InstagramMark },
  { key: "facebook", label: "Facebook", Mark: FacebookMark },
  { key: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { key: "tiktok", label: "TikTok", Mark: TikTokMark },
] as const;

const CAPTION = "A fresh week, a few spots left. Book online and we’ll take care of the rest.";

function PlatformStack({ size = 16, count = 4 }: { size?: number; count?: number }) {
  return (
    <div className="flex items-center">
      {CHANNELS.slice(0, count).map(({ key, Mark }, index) => (
        <span
          key={key}
          className={cn("rounded-[5px] bg-white", index > 0 && "-ml-1")}
          style={{ zIndex: CHANNELS.length - index }}
        >
          <Mark size={size} />
        </span>
      ))}
    </div>
  );
}

function ExistingPost({
  time,
  title,
  tone,
  channels = 2,
}: {
  time: string;
  title: string;
  tone: "blue" | "violet" | "amber" | "emerald";
  channels?: number;
}) {
  const toneClass = {
    blue: "border-blue-100 bg-blue-50/85",
    violet: "border-violet-100 bg-violet-50/85",
    amber: "border-amber-100 bg-amber-50/85",
    emerald: "border-emerald-100 bg-emerald-50/85",
  }[tone];

  return (
    <div className={cn("rounded-lg border p-2", toneClass)}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[9px] font-extrabold text-slate-500">{time}</span>
        <PlatformStack size={14} count={channels} />
      </div>
      <div className="mt-1 line-clamp-2 text-[9.5px] font-semibold leading-[1.3] text-slate-700">
        {title}
      </div>
    </div>
  );
}

function NewScheduledPost({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: -28, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-lg border-2 border-blue-300 bg-blue-50 p-2 shadow-[0_14px_28px_-20px_rgba(37,99,255,0.75)]"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-blue-100/60"
        initial={reduced ? false : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.9, delay: 0.15 }}
      />
      <div className="relative flex items-center justify-between gap-1">
        <span className="text-[9px] font-extrabold text-blue-700">9:00</span>
        <span className="rounded-full bg-blue-100 px-1.5 py-[1px] text-[8px] font-extrabold text-blue-700">
          Scheduled
        </span>
      </div>
      <div className="relative mt-1 line-clamp-2 text-[9.5px] font-bold leading-[1.3] text-slate-800">
        A fresh week, a few spots left…
      </div>
      <div className="relative mt-1.5">
        <PlatformStack size={15} />
      </div>
    </motion.div>
  );
}

function WeeklyCalendar({ scheduled, reduced }: { scheduled: boolean; reduced: boolean }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden bg-slate-50/70 p-3">
      <div className="grid h-full grid-cols-5 gap-2 sm:grid-cols-7">
        {DAYS.map((day, i) => {
          const weekend = i > 4;
          return (
            <div key={day.date} className={cn("min-w-0", weekend && "hidden sm:block")}>
              <div className="mb-2 flex items-center gap-1.5 px-0.5">
                <span className="text-[9px] font-bold uppercase tracking-wide text-slate-400">{day.label}</span>
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[9.5px] font-bold",
                    i === 0 ? "bg-zapla-ink text-white" : "text-slate-500",
                  )}
                >
                  {day.date}
                </span>
              </div>

              <div className="relative h-[calc(100%-28px)] min-h-[270px] rounded-xl border border-slate-200/80 bg-white p-1.5">
                <div className="relative z-10 space-y-2">
                  {i === 0 ? (
                    <ExistingPost time="8:30" title="Monday tip: 3 quick ways to prepare" tone="blue" channels={2} />
                  ) : null}
                  {i === 1 ? (
                    <ExistingPost time="12:00" title="Behind the scenes with the team" tone="violet" channels={3} />
                  ) : null}
                  {i === 2 ? (
                    <ExistingPost time="9:30" title="Customer story: a smoother experience" tone="emerald" channels={2} />
                  ) : null}
                  {i === 3 ? (
                    <ExistingPost time="15:00" title="Thursday availability update" tone="amber" channels={1} />
                  ) : null}
                  {i === 4 ? (
                    <>
                      <AnimatePresence initial={false}>
                        {scheduled ? <NewScheduledPost reduced={reduced} /> : null}
                      </AnimatePresence>
                      <ExistingPost time="13:00" title="Five things customers ask us most" tone="violet" channels={2} />
                    </>
                  ) : null}
                  {i === 5 ? (
                    <ExistingPost time="10:00" title="Weekend inspiration" tone="blue" channels={2} />
                  ) : null}
                </div>

                {[52, 104, 156, 208, 260].map((top) => (
                  <span
                    key={top}
                    aria-hidden
                    className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-slate-100"
                    style={{ top }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Composer({ phase, reduced }: SceneProps) {
  const selectedCount = phase >= 3 ? 4 : phase >= 2 ? 1 : 0;
  const captionReady = phase >= 2;
  const scheduleReady = phase >= 4;
  const submitting = phase >= 5;

  return (
    <AnimatePresence>
      {phase >= 1 && phase < 6 ? (
        <motion.div
          className="absolute bottom-0 right-0 top-0 z-30 flex w-[36%] min-w-[275px] max-w-[330px] flex-col border-l border-slate-200 bg-white shadow-[-22px_0_45px_-34px_rgba(15,23,42,0.45)]"
          initial={reduced ? false : { opacity: 0, x: 46 }}
          animate={{ opacity: submitting ? 0.18 : 1, x: submitting ? 24 : 0 }}
          exit={reduced ? undefined : { opacity: 0, x: 34 }}
          transition={{ duration: reduced ? 0 : 0.42, ease: EASE_OUT }}
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <div className="text-[13px] font-extrabold tracking-tight text-slate-900">New post</div>
            <div className="mt-0.5 text-[9px] font-semibold text-slate-400">Create once, publish across channels</div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Caption</div>
            <div className="mt-1.5 min-h-[72px] rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-[10.5px] font-medium leading-[1.45] text-slate-700">
              {captionReady ? (
                <motion.span
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduced ? 0 : 0.45 }}
                >
                  {CAPTION}
                </motion.span>
              ) : (
                <span className="text-slate-300">Write a caption...</span>
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-slate-200 p-2">
              <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-100 via-sky-100 to-violet-100">
                <div className="absolute bottom-1.5 left-1.5 h-5 w-7 rounded-full bg-white/65 blur-[1px]" />
                <ImageIcon className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-slate-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9.5px] font-bold text-slate-700">weekly-availability.jpg</div>
                <div className="mt-0.5 text-[8.5px] font-semibold text-slate-400">1080 × 1080 · Ready</div>
              </div>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            </div>

            <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Publish to</div>
            <div className="mt-1.5 grid grid-cols-2 gap-1.5">
              {CHANNELS.map(({ key, label, Mark }, index) => {
                const selected = index < selectedCount;
                return (
                  <motion.div
                    key={key}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-2 py-1.5",
                      selected ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white",
                    )}
                    animate={{ scale: selected ? 1 : 0.985 }}
                    transition={{ duration: reduced ? 0 : 0.24, delay: reduced ? 0 : index * 0.06 }}
                  >
                    <Mark size={20} />
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[8.5px] font-bold",
                        selected ? "text-slate-700" : "text-slate-400",
                      )}
                    >
                      {label}
                    </span>
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full border",
                        selected ? "border-blue-500 bg-blue-500" : "border-slate-200 bg-white",
                      )}
                    >
                      {selected ? <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} /> : null}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Schedule</div>
            <div
              className={cn(
                "mt-1.5 flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors",
                scheduleReady ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white",
              )}
            >
              <CalendarDays className={cn("h-3.5 w-3.5", scheduleReady ? "text-blue-600" : "text-slate-400")} />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-bold text-slate-700">Fri, 21 Aug</div>
                <div className="text-[8px] font-semibold text-slate-400">Sydney time</div>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[9px] font-bold text-slate-600">
                <Clock3 className="h-3 w-3 text-slate-400" /> 9:00 AM
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/70 px-4 py-3">
            <span className="text-[8.5px] font-semibold text-slate-400">{selectedCount} channels</span>
            <motion.button
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[9.5px] font-extrabold",
                scheduleReady ? "bg-zapla-blue text-white" : "bg-slate-200 text-slate-400",
              )}
              animate={{ scale: phase === 4 ? [1, 1.04, 1] : 1 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            >
              <Send className="h-3 w-3" /> Schedule
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneContent({ phase, reduced }: SceneProps) {
  const scheduled = phase >= 5;

  return (
    <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex h-[42px] shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <CalendarDays className="h-3.5 w-3.5" />
          </span>
          <div>
            <div className="text-[11px] font-extrabold tracking-tight text-slate-800">17–23 August 2026</div>
            <div className="text-[8px] font-semibold text-slate-400">Social content calendar</div>
          </div>
        </div>

        <div className="ml-2 hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-[2px] sm:flex">
          <button className="rounded-md bg-white px-2 py-1 text-[8.5px] font-bold text-slate-700 shadow-sm">Week</button>
          <button className="px-2 py-1 text-[8.5px] font-semibold text-slate-400">Month</button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="hidden rounded-lg border border-slate-200 px-2 py-1 text-[8.5px] font-bold text-slate-500 sm:inline-flex">Today</button>
          <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400">
            <ChevronRight className="h-3 w-3" />
          </button>
          <motion.button
            className="ml-1 inline-flex items-center gap-1 rounded-lg bg-zapla-ink px-2.5 py-1.5 text-[8.5px] font-extrabold text-white"
            animate={{ boxShadow: phase === 1 ? "0 0 0 4px rgba(37,99,255,0.16)" : "0 0 0 0 rgba(37,99,255,0)" }}
            transition={{ duration: reduced ? 0 : 0.35 }}
          >
            <Plus className="h-3 w-3" /> New post
          </motion.button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1">
        <WeeklyCalendar scheduled={scheduled} reduced={reduced} />
        <Composer phase={phase} reduced={reduced} />

        <AnimatePresence>
          {scheduled ? (
            <motion.div
              className="absolute bottom-3 right-3 z-40 flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.5)]"
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: reduced ? 0 : 0.38, ease: EASE_OUT }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div>
                <div className="text-[9.5px] font-extrabold text-slate-800">Post scheduled</div>
                <div className="text-[8px] font-semibold text-slate-400">Friday 9:00 AM · 4 channels</div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
