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
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  GoogleBusinessMark,
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

const MONTH_WEEKS = ["3–9", "10–16", "17–23", "24–30", "31"];

const CHANNELS = [
  { key: "instagram", label: "Instagram", Mark: InstagramMark },
  { key: "facebook", label: "Facebook", Mark: FacebookMark },
  { key: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { key: "google", label: "Google Business", Mark: GoogleBusinessMark },
  { key: "tiktok", label: "TikTok", Mark: TikTokMark },
] as const;

const CAPTION = "A fresh week, a few spots left. Book online and we’ll take care of the rest.";
const AI_PROMPT = "Promote limited consultation slots this week";

function PlatformStack({ size = 16, count = 5 }: { size?: number; count?: number }) {
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

function MonthContext() {
  return (
    <div className="hidden min-w-[232px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-2 py-1.5 md:flex">
      <div className="shrink-0">
        <div className="text-[9px] font-extrabold text-slate-700">August 2026</div>
        <div className="text-[7.5px] font-semibold text-slate-400">Month overview</div>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1">
        {MONTH_WEEKS.map((week) => {
          const active = week === "17–23";
          return (
            <span
              key={week}
              className={cn(
                "flex-1 rounded-md px-1 py-1 text-center text-[7.5px] font-bold",
                active ? "bg-zapla-ink text-white shadow-sm" : "bg-white text-slate-400",
              )}
            >
              {week}
            </span>
          );
        })}
      </div>
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

function SocialArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-blue-100 bg-gradient-to-br from-sky-100 via-white to-violet-100",
        compact ? "h-9 w-11" : "h-[74px] w-[92px]",
      )}
    >
      <div className="absolute -right-3 -top-3 h-12 w-12 rounded-full bg-violet-300/45 blur-[1px]" />
      <div className="absolute -bottom-5 -left-2 h-14 w-20 rotate-[-8deg] rounded-[50%] bg-emerald-200/65" />
      <div className="absolute inset-x-1.5 bottom-1.5 rounded-md bg-white/90 px-1.5 py-1 shadow-sm backdrop-blur">
        <div className={cn("font-extrabold leading-tight text-slate-800", compact ? "text-[5.5px]" : "text-[7.5px]")}>A few spots left</div>
        {!compact ? <div className="mt-0.5 text-[6.5px] font-bold text-blue-600">Book online →</div> : null}
      </div>
      <div className={cn("absolute left-1.5 top-1.5 rounded-full bg-zapla-ink font-extrabold text-white", compact ? "px-1 py-[1px] text-[4.5px]" : "px-1.5 py-0.5 text-[6px]")}>ZAPLA</div>
    </div>
  );
}

function NewScheduledPost({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, y: -46, x: 24, scale: 0.82, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
      transition={{ duration: reduced ? 0 : 0.62, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-lg border-2 border-blue-300 bg-blue-50 p-2 shadow-[0_14px_28px_-20px_rgba(37,99,255,0.75)]"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-blue-100/70"
        initial={reduced ? false : { opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.9, delay: 0.2 }}
      />
      <div className="relative flex gap-1.5">
        <SocialArtwork compact />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-extrabold text-blue-700">9:00</span>
            <span className="rounded-full bg-blue-100 px-1.5 py-[1px] text-[8px] font-extrabold text-blue-700">
              Scheduled
            </span>
          </div>
          <div className="mt-1 line-clamp-2 text-[9px] font-bold leading-[1.25] text-slate-800">
            A fresh week, a few spots left…
          </div>
        </div>
      </div>
      <div className="relative mt-1.5">
        <PlatformStack size={14} />
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
                    i === 0 ? "bg-zapla-ink text-white" : i === 4 ? "bg-blue-50 text-blue-700" : "text-slate-500",
                  )}
                >
                  {day.date}
                </span>
              </div>

              <div className="relative h-[calc(100%-28px)] min-h-[270px] rounded-xl border border-slate-200/80 bg-white p-1.5">
                <div className="relative z-10 space-y-2">
                  {i === 0 ? (
                    <>
                      <ExistingPost time="8:30" title="Monday tip: 3 quick ways to prepare" tone="blue" channels={2} />
                      <ExistingPost time="16:30" title="This week at North & Pine" tone="emerald" channels={3} />
                    </>
                  ) : null}
                  {i === 1 ? (
                    <ExistingPost time="12:00" title="Behind the scenes with the team" tone="violet" channels={3} />
                  ) : null}
                  {i === 2 ? (
                    <>
                      <ExistingPost time="9:30" title="Customer story: a smoother experience" tone="emerald" channels={2} />
                      <ExistingPost time="14:00" title="Quick FAQ: what happens after booking?" tone="blue" channels={4} />
                    </>
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
                  {i === 6 ? (
                    <ExistingPost time="17:00" title="Sunday reminder for the week ahead" tone="emerald" channels={3} />
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

function MediaCreator({ phase, reduced }: SceneProps) {
  const generating = phase === 3;
  const ready = phase >= 4;

  return (
    <div className={cn("mt-2.5 overflow-hidden rounded-xl border p-2.5 transition-colors", ready ? "border-blue-200 bg-blue-50/35" : "border-slate-200 bg-white")}> 
      <div className="flex items-center gap-2">
        <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Media</div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[8px] font-extrabold text-violet-700">
          <Sparkles className="h-2.5 w-2.5" /> Generate with AI
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {!ready ? (
          <motion.div
            key="prompt"
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: reduced ? 0 : 0.28 }}
            className="relative mt-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-2"
          >
            <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">AI prompt</div>
            <div className="mt-1 pr-8 text-[9.5px] font-semibold leading-snug text-slate-700">{AI_PROMPT}</div>
            <motion.div
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[8.5px] font-extrabold",
                generating ? "bg-violet-600 text-white" : "bg-white text-violet-700 ring-1 ring-violet-200",
              )}
              animate={{ scale: generating && !reduced ? [1, 1.03, 1] : 1 }}
              transition={{ duration: 0.45 }}
            >
              <Sparkles className="h-2.5 w-2.5" /> {generating ? "Creating image…" : "Generate image"}
            </motion.div>
            {generating ? (
              <motion.span
                aria-hidden
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                initial={{ x: -100 }}
                animate={{ x: 320 }}
                transition={{ duration: reduced ? 0 : 1.05, ease: "easeInOut" }}
              />
            ) : null}
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.38, ease: EASE_OUT }}
            className="mt-2 flex items-center gap-2.5"
          >
            <SocialArtwork />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[9.5px] font-extrabold text-slate-700">weekly-availability-ai.jpg</div>
              <div className="mt-1 text-[8px] font-semibold leading-snug text-slate-400">1080 × 1080 · AI generated</div>
              <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-extrabold text-emerald-700">
                <Check className="h-2.5 w-2.5" strokeWidth={3} /> Ready to publish
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Composer({ phase, reduced, elapsedMs }: SceneProps) {
  const selectedCount = phase >= 4 ? 5 : 0;
  const captionReady = phase >= 2;
  const scheduleReady = phase >= 5;
  const submitting = phase >= 6;

  return (
    <AnimatePresence>
      {phase >= 1 ? (
        <motion.div
          className="absolute bottom-0 right-0 top-0 z-30 flex w-[38%] min-w-[285px] max-w-[350px] flex-col border-l border-slate-200 bg-white shadow-[-22px_0_45px_-34px_rgba(15,23,42,0.45)]"
          initial={reduced ? false : { opacity: 0, x: 46 }}
          animate={{ opacity: submitting ? 0.13 : 1, x: submitting ? 26 : 0, scale: submitting ? 0.985 : 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 34 }}
          transition={{ duration: reduced ? 0 : 0.42, ease: EASE_OUT }}
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <div className="text-[13px] font-extrabold tracking-tight text-slate-900">New post</div>
            <div className="mt-0.5 text-[9px] font-semibold text-slate-400">Create once, publish across channels</div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Caption</div>
            <div className="mt-1.5 min-h-[62px] rounded-xl border border-slate-200 bg-slate-50/60 p-2.5 text-[10px] font-medium leading-[1.45] text-slate-700">
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

            <MediaCreator phase={phase} reduced={reduced} elapsedMs={elapsedMs} />

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
                      key === "tiktok" && "col-span-2 sm:col-span-1",
                    )}
                    animate={{ scale: selected ? 1 : 0.985, y: selected ? 0 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.24, delay: reduced ? 0 : index * 0.065 }}
                  >
                    <Mark size={19} />
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-[8px] font-bold",
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
              animate={{ scale: phase === 5 ? [1, 1.04, 1] : 1 }}
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

function PlannerCursor({ phase, reduced }: SceneProps) {
  if (phase === 0 || phase >= 6 || reduced) return null;

  const points: Record<number, { left: string; top: string; click?: boolean }> = {
    1: { left: "94%", top: "6%", click: true },
    2: { left: "79%", top: "24%" },
    3: { left: "78%", top: "48%", click: true },
    4: { left: "78%", top: "69%", click: true },
    5: { left: "91%", top: "92%", click: true },
  };
  const point = points[phase] ?? points[1];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-50 hidden sm:block"
      initial={false}
      animate={{ left: point.left, top: point.top }}
      transition={{ duration: 0.58, ease: EASE_OUT }}
    >
      <div className="relative -translate-x-1 -translate-y-1">
        <svg width="18" height="18" viewBox="0 0 18 18" className="drop-shadow-sm">
          <path d="M2 1.5 L14.5 9 L9 10 L7.5 16 Z" fill="white" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
        {point.click ? (
          <motion.span
            className="absolute -left-2 -top-2 h-7 w-7 rounded-full border-2 border-blue-500/55"
            initial={{ scale: 0.35, opacity: 0.9 }}
            animate={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
        ) : null}
      </div>
    </motion.div>
  );
}

export function SceneContent({ phase, reduced, elapsedMs }: SceneProps) {
  const scheduled = phase >= 6;

  return (
    <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex h-[50px] shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <CalendarDays className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-[11px] font-extrabold tracking-tight text-slate-800">August 2026</div>
            <div className="truncate text-[8px] font-semibold text-slate-400">Week 17–23 · Social content calendar</div>
          </div>
        </div>

        <MonthContext />

        <div className="ml-auto flex items-center gap-1.5">
          <div className="hidden items-center rounded-lg border border-slate-200 bg-slate-50 p-[2px] sm:flex">
            <button className="rounded-md bg-white px-2 py-1 text-[8.5px] font-bold text-slate-700 shadow-sm">Week</button>
            <button className="px-2 py-1 text-[8.5px] font-semibold text-slate-400">Month</button>
          </div>
          <button className="hidden rounded-lg border border-slate-200 px-2 py-1 text-[8.5px] font-bold text-slate-500 lg:inline-flex">Today</button>
          <button className="hidden h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400 lg:flex">
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button className="hidden h-6 w-6 items-center justify-center rounded-lg border border-slate-200 text-slate-400 lg:flex">
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
        <Composer phase={phase} reduced={reduced} elapsedMs={elapsedMs} />
        <PlannerCursor phase={phase} reduced={reduced} elapsedMs={elapsedMs} />

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
                <div className="text-[8px] font-semibold text-slate-400">Friday 9:00 AM · 5 channels</div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
