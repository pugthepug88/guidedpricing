import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Image as ImageIcon,
  MoreHorizontal,
  Plus,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  GoogleBusinessMark,
  InstagramMark,
  LinkedInMark,
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
  { key: "google", label: "Google Business", Mark: GoogleBusinessMark },
] as const;

const CAPTION = "A fresh week, a few spots left. Book online and we’ll take care of the rest.";

function PlatformStack({ size = 16, selected = 4 }: { size?: number; selected?: number }) {
  return (
    <div className="flex items-center">
      {CHANNELS.slice(0, selected).map(({ key, Mark }, index) => (
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
    blue: "border-blue-100 bg-blue-50/80",
    violet: "border-violet-100 bg-violet-50/80",
    amber: "border-amber-100 bg-amber-50/80",
    emerald: "border-emerald-100 bg-emerald-50/80",
  }[tone];

  return (
    <div className={cn("rounded-lg border p-1.5", toneClass)}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[8.5px] font-bold text-slate-500">{time}</span>
        <PlatformStack size={13} selected={channels} />
      </div>
      <div className="mt-1 line-clamp-2 text-[9px] font-semibold leading-[1.25] text-slate-700">
        {title}
      </div>
    </div>
  );
}

function PlannerSidebar() {
  return (
    <aside className="hidden w-[132px] shrink-0 border-r border-slate-200 bg-white px-2.5 py-3 sm:block">
      <div className="mb-3 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
        Channels
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-2 py-1.5 text-[10px] font-bold text-blue-700">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white shadow-sm">
            <CalendarDays className="h-3 w-3" />
          </span>
          All channels
        </div>
        {CHANNELS.map(({ key, label, Mark }) => (
          <div key={key} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[9.5px] font-semibold text-slate-500">
            <Mark size={18} />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-slate-100 pt-3">
        <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Status
        </div>
        <div className="space-y-1.5 text-[9.5px] font-semibold text-slate-500">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Published</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-400" /> Scheduled</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-300" /> Draft</div>
        </div>
      </div>
    </aside>
  );
}

function WeeklyCalendar({ scheduled, reduced }: { scheduled: boolean; reduced: boolean }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden bg-slate-50/70 p-2.5">
      <div className="grid h-full grid-cols-5 gap-1.5 sm:grid-cols-7">
        {DAYS.map((day, i) => {
          const weekend = i > 4;
          return (
            <div key={day.date} className={cn("min-w-0", weekend && "hidden sm:block")}>
              <div className="mb-1.5 flex items-center gap-1 px-0.5">
                <span className="text-[8.5px] font-bold uppercase tracking-wide text-slate-400">{day.label}</span>
                <span className={cn("flex h-[18px] w-[18px] items-center justify-center rounded-full text-[9px] font-bold", i === 0 ? "bg-zapla-ink text-white" : "text-slate-500")}>
                  {day.date}
                </span>
              </div>

              <div className="relative h-[calc(100%-25px)] min-h-[260px] rounded-xl border border-slate-200/80 bg-white/85 p-1.5">
                <div className="space-y-1.5">
                  {i === 0 ? <ExistingPost time="8:30" title="Monday tip: 3 quick ways to prepare" tone="blue" channels={2} /> : null}
                  {i === 1 ? <ExistingPost time="12:00" title="Behind the scenes with the team" tone="violet" channels={3} /> : null}
                  {i === 2 ? <ExistingPost time="9:30" title="Customer story: a smoother experience" tone="emerald" channels={2} /> : null}
                  {i === 3 ? <ExistingPost time="15:00" title="Thursday availability update" tone="amber" channels={1} /> : null}
                  {i === 4 ? (
                    <>
                      <ExistingPost time="13:00" title="Five things customers ask us most" tone="violet" channels={2} />
                      <AnimatePresence initial={false}>
                        {scheduled ? (
                          <motion.div
                            layout
                            initial={reduced ? false : { opacity: 0, y: -42, scale: 0.82 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: reduced ? 0 : 0.62, ease: EASE_OUT }}
                            className="relative overflow-hidden rounded-lg border-2 border-blue-300 bg-blue-50 p-1.5 shadow-[0_12px_24px_-18px_rgba(37,99,255,0.65)]"
                          >
                            <motion.span
                              aria-hidden
                              className="absolute inset-0 bg-blue-100/40"
                              initial={reduced ? false : { opacity: 1 }}
                              animate={{ opacity: 0 }}
                              transition={{ duration: reduced ? 0 : 0.9, delay: 0.2 }}
                            />
                            <div className="relative flex items-center justify-between gap-1">
                              <span className="text-[8.5px] font-extrabold text-blue-700">9:00</span>
                              <span className="rounded-full bg-blue-100 px-1.5 py-[1px] text-[7.5px] font-bold text-blue-700">Scheduled</span>
                            </div>
                            <div className="relative mt-1 line-clamp-2 text-[9px] font-bold leading-[1.25] text-slate-800">
                              A fresh week, a few spots left…
                            </div>
                            <div className="relative mt-1.5"><PlatformStack size={14} /></div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : null}
                  {i === 5 ? <ExistingPost time="10:00" title="Weekend inspiration" tone="blue" channels={2} /> : null}
                </div>

                {[36, 72, 108, 144, 180, 216].map((top) => (
                  <span key={top} aria-hidden className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-slate-100" style={{ top }} />
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
  const caption = phase >= 2 ? CAPTION : "";
  const scheduled = phase >= 4;
  const committing = phase >= 5;

  return (
    <AnimatePresence>
      {phase >= 1 && phase < 6 ? (
        <motion.div
          className="absolute bottom-2.5 right-2.5 top-2.5 z-30 flex w-[min(390px,88%)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.55)]"
          initial={reduced ? false : { opacity: 0, x: 34, scale: 0.97 }}
          animate={{ opacity: committing ? 0.18 : 1, x: committing ? 24 : 0, scale: committing ? 0.96 : 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 26, scale: 0.96 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE_OUT }}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 px-3.5 py-2.5">
            <div>
              <div className="text-[12.5px] font-extrabold tracking-tight text-slate-900">New post</div>
              <div className="text-[8.5px] font-semibold text-slate-400">Create once, publish everywhere</div>
            </div>
            <button className="ml-auto rounded-lg p-1 text-slate-300" aria-label="More options"><MoreHorizontal className="h-4 w-4" /></button>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-3.5 py-3">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Post content</div>
            <div className="mt-1.5 min-h-[70px] rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-[10.5px] font-medium leading-[1.45] text-slate-700">
              {caption ? (
                <motion.span initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.5 }}>
                  {caption}
                </motion.span>
              ) : (
                <span className="text-slate-300">Write a caption...</span>
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-2 rounded-xl border border-slate-200 p-2">
              <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-100 via-sky-100 to-violet-100">
                <div className="absolute bottom-1.5 left-1.5 h-5 w-8 rounded-full bg-white/65 blur-[1px]" />
                <ImageIcon className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-slate-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9.5px] font-bold text-slate-700">weekly-availability.jpg</div>
                <div className="mt-0.5 text-[8.5px] font-semibold text-slate-400">1080 × 1080 · Ready</div>
              </div>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            </div>

            <div className="mt-3 text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Publish to</div>
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
                    transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : index * 0.06 }}
                  >
                    <Mark size={20} />
                    <span className={cn("min-w-0 flex-1 truncate text-[8.5px] font-bold", selected ? "text-slate-700" : "text-slate-400")}>{label}</span>
                    <span className={cn("flex h-4 w-4 items-center justify-center rounded-full border", selected ? "border-blue-500 bg-blue-500" : "border-slate-200 bg-white")}>
                      {selected ? <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} /> : null}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-3 text-[8.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Schedule</div>
            <div className={cn("mt-1.5 flex items-center gap-2 rounded-xl border px-2.5 py-2 transition-colors", scheduled ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white")}>
              <CalendarDays className={cn("h-3.5 w-3.5", scheduled ? "text-blue-600" : "text-slate-400")} />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-bold text-slate-700">Friday, 21 August</div>
                <div className="text-[8px] font-semibold text-slate-400">Sydney time</div>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[9px] font-bold text-slate-600">
                <Clock3 className="h-3 w-3 text-slate-400" /> 9:00 AM
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
            <span className="text-[8.5px] font-semibold text-slate-400">{selectedCount || 0} channels selected</span>
            <motion.button
              className={cn("ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[9.5px] font-extrabold", phase >= 4 ? "bg-zapla-blue text-white" : "bg-slate-200 text-slate-400")}
              animate={{ scale: phase === 4 ? [1, 1.04, 1] : 1 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            >
              <Send className="h-3 w-3" /> Schedule post
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneContent({ phase, reduced }: SceneProps) {
  const scheduled = phase >= 5;
  const showToast = phase >= 5;

  return (
    <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex h-[42px] shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-50 text-violet-600"><CalendarDays className="h-3.5 w-3.5" /></span>
          <div>
            <div className="text-[11px] font-extrabold tracking-tight text-slate-800">Social Planner</div>
            <div className="text-[8px] font-semibold text-slate-400">17–23 August 2026</div>
          </div>
        </div>
        <div className="ml-2 hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-[2px] sm:flex">
          <button className="rounded-md bg-white px-2 py-1 text-[8.5px] font-bold text-slate-700 shadow-sm">Week</button>
          <button className="px-2 py-1 text-[8.5px] font-semibold text-slate-400">Month</button>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button className="hidden rounded-lg border border-slate-200 px-2 py-1 text-[8.5px] font-bold text-slate-500 sm:inline-flex">Today</button>
          <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400"><ChevronLeft className="h-3 w-3" /></button>
          <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400"><ChevronRight className="h-3 w-3" /></button>
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
        <PlannerSidebar />
        <WeeklyCalendar scheduled={scheduled} reduced={reduced} />
        <Composer phase={phase} reduced={reduced} />

        <AnimatePresence>
          {showToast ? (
            <motion.div
              className="absolute bottom-3 right-3 z-40 flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.5)]"
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: reduced ? 0 : 0.38, ease: EASE_OUT }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
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
