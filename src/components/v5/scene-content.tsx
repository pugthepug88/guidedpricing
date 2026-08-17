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
  WandSparkles,
  X,
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
import creativePhoto from "@/assets/customer-04-bloom.jpg";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CHANNELS = [
  { key: "instagram", label: "Instagram", Mark: InstagramMark },
  { key: "facebook", label: "Facebook", Mark: FacebookMark },
  { key: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { key: "google", label: "Google Business", Mark: GoogleBusinessMark },
  { key: "tiktok", label: "TikTok", Mark: TikTokMark },
] as const;

type Tone = "blue" | "violet" | "amber" | "emerald" | "rose";
type PlannedPost = { time: string; title: string; tone: Tone; channels: number };
type DayCell = { date: number; month: "Aug" | "Sep"; posts: PlannedPost[] };

const CALENDAR_DAYS: DayCell[] = [
  { date: 17, month: "Aug", posts: [
    { time: "8:30", title: "3 ways to prepare", tone: "blue", channels: 2 },
    { time: "16:30", title: "Meet the team", tone: "emerald", channels: 3 },
  ] },
  { date: 18, month: "Aug", posts: [
    { time: "12:00", title: "Behind the scenes", tone: "violet", channels: 3 },
  ] },
  { date: 19, month: "Aug", posts: [
    { time: "9:30", title: "Customer story", tone: "emerald", channels: 2 },
    { time: "14:00", title: "Quick FAQ", tone: "blue", channels: 4 },
  ] },
  { date: 20, month: "Aug", posts: [
    { time: "15:00", title: "Availability update", tone: "amber", channels: 2 },
  ] },
  { date: 21, month: "Aug", posts: [
    { time: "13:00", title: "5 things customers ask", tone: "violet", channels: 2 },
  ] },
  { date: 22, month: "Aug", posts: [
    { time: "10:00", title: "Weekend inspiration", tone: "rose", channels: 3 },
  ] },
  { date: 23, month: "Aug", posts: [
    { time: "17:00", title: "Sunday reset", tone: "emerald", channels: 2 },
  ] },
  { date: 24, month: "Aug", posts: [
    { time: "9:00", title: "New week, new slots", tone: "blue", channels: 4 },
  ] },
  { date: 25, month: "Aug", posts: [
    { time: "11:30", title: "Staff spotlight", tone: "rose", channels: 2 },
    { time: "17:15", title: "One-minute tip", tone: "amber", channels: 3 },
  ] },
  { date: 26, month: "Aug", posts: [
    { time: "10:00", title: "Client result", tone: "emerald", channels: 4 },
  ] },
  { date: 27, month: "Aug", posts: [
    { time: "14:30", title: "FAQ reel", tone: "violet", channels: 3 },
  ] },
  { date: 28, month: "Aug", posts: [
    { time: "8:45", title: "Friday reminder", tone: "blue", channels: 2 },
    { time: "15:30", title: "Last spots this week", tone: "amber", channels: 4 },
  ] },
  { date: 29, month: "Aug", posts: [
    { time: "10:30", title: "Weekend guide", tone: "rose", channels: 3 },
  ] },
  { date: 30, month: "Aug", posts: [
    { time: "18:00", title: "Next week preview", tone: "emerald", channels: 2 },
  ] },
  { date: 31, month: "Aug", posts: [
    { time: "9:15", title: "August recap", tone: "violet", channels: 4 },
  ] },
  { date: 1, month: "Sep", posts: [
    { time: "12:00", title: "Hello September", tone: "blue", channels: 5 },
  ] },
  { date: 2, month: "Sep", posts: [
    { time: "10:30", title: "How it works", tone: "emerald", channels: 3 },
    { time: "16:00", title: "Customer question", tone: "amber", channels: 2 },
  ] },
  { date: 3, month: "Sep", posts: [
    { time: "13:00", title: "Quick poll", tone: "rose", channels: 2 },
  ] },
  { date: 4, month: "Sep", posts: [
    { time: "9:00", title: "Friday availability", tone: "blue", channels: 4 },
  ] },
  { date: 5, month: "Sep", posts: [
    { time: "11:00", title: "Weekend story", tone: "violet", channels: 3 },
  ] },
  { date: 6, month: "Sep", posts: [
    { time: "17:30", title: "Week ahead", tone: "emerald", channels: 3 },
  ] },
];

const CAPTION = "A fresh week, a few spots left. Book online and we’ll take care of the rest.";

function PlatformStack({ size = 12, count = 3 }: { size?: number; count?: number }) {
  return (
    <div className="flex items-center">
      {CHANNELS.slice(0, count).map(({ key, Mark }, index) => (
        <span
          key={key}
          className={cn("rounded-[4px] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)]", index > 0 && "-ml-1")}
          style={{ zIndex: CHANNELS.length - index }}
        >
          <Mark size={size} />
        </span>
      ))}
    </div>
  );
}

function PostChip({ post }: { post: PlannedPost }) {
  const toneClass: Record<Tone, string> = {
    blue: "border-blue-100 bg-blue-50/90 text-blue-950",
    violet: "border-violet-100 bg-violet-50/90 text-violet-950",
    amber: "border-amber-100 bg-amber-50/90 text-amber-950",
    emerald: "border-emerald-100 bg-emerald-50/90 text-emerald-950",
    rose: "border-rose-100 bg-rose-50/90 text-rose-950",
  };

  return (
    <div className={cn("rounded-[8px] border px-1.5 py-1 shadow-[0_5px_14px_-12px_rgba(15,23,42,0.45)]", toneClass[post.tone])}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[7.5px] font-extrabold opacity-55">{post.time}</span>
        <PlatformStack size={10} count={post.channels} />
      </div>
      <div className="mt-0.5 truncate text-[8px] font-bold leading-tight">{post.title}</div>
    </div>
  );
}

function ScheduledNewPost({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.72, y: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 270, damping: 22 }}
      className="overflow-hidden rounded-[8px] border-2 border-blue-400 bg-white shadow-[0_10px_24px_-15px_rgba(37,99,255,0.9)]"
    >
      <div className="h-7 overflow-hidden">
        <img src={creativePhoto} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="px-1.5 py-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[7.5px] font-extrabold text-blue-700">9:00</span>
          <span className="rounded-full bg-blue-50 px-1 py-[1px] text-[6.5px] font-extrabold text-blue-700">NEW</span>
        </div>
        <div className="mt-0.5 truncate text-[8px] font-extrabold text-slate-800">A few spots left</div>
        <div className="mt-0.5"><PlatformStack size={10} count={5} /></div>
      </div>
    </motion.div>
  );
}

function CalendarGrid({ scheduled, reduced }: { scheduled: boolean; reduced: boolean }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden bg-[#f8f9fc] p-2.5">
      <div className="grid grid-cols-7 border-b border-slate-200 pb-1.5">
        {WEEKDAYS.map((day) => (
          <div key={day} className="px-1 text-[8px] font-extrabold uppercase tracking-[0.1em] text-slate-400">{day}</div>
        ))}
      </div>

      <div className="mt-1.5 grid h-[calc(100%-24px)] grid-cols-7 grid-rows-3 gap-1.5">
        {CALENDAR_DAYS.map((day, index) => {
          const isTarget = day.month === "Aug" && day.date === 21;
          const isTrailingMonth = day.month === "Sep";
          return (
            <div
              key={`${day.month}-${day.date}`}
              className={cn(
                "relative min-h-0 overflow-hidden rounded-[10px] border bg-white p-1.5",
                isTarget ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-200/85",
                isTrailingMonth && "bg-slate-50/80",
              )}
            >
              <div className="mb-1 flex items-center gap-1">
                <span className={cn("flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-1 text-[8px] font-extrabold", isTarget ? "bg-zapla-ink text-white" : "text-slate-600")}>{day.date}</span>
                {day.date === 1 || index === 0 ? <span className="text-[6.5px] font-bold uppercase tracking-wide text-slate-300">{day.month}</span> : null}
                {isTarget ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" /> : null}
              </div>
              <div className="space-y-1">
                <AnimatePresence initial={false}>
                  {isTarget && scheduled ? <ScheduledNewPost reduced={reduced} /> : null}
                </AnimatePresence>
                {day.posts.map((post, postIndex) => <PostChip key={`${post.time}-${postIndex}`} post={post} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CreativeCard({ mini = false, variant = 0 }: { mini?: boolean; variant?: number }) {
  const accent = variant === 1 ? "from-fuchsia-500/80 via-violet-500/30" : variant === 2 ? "from-emerald-500/80 via-cyan-400/30" : "from-blue-600/85 via-indigo-500/35";

  return (
    <div className={cn("relative overflow-hidden bg-slate-950", mini ? "h-[54px] w-[54px] rounded-[9px]" : "h-[128px] w-[128px] rounded-[14px]")}> 
      <img src={creativePhoto} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className={cn("absolute inset-0 bg-gradient-to-tr to-transparent", accent)} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/5 to-white/10" />
      <div className={cn("absolute rounded-full border border-white/25 bg-white/10 backdrop-blur-sm", mini ? "right-1.5 top-1.5 h-3 w-3" : "right-2.5 top-2.5 h-6 w-6")} />
      <div className={cn("absolute left-0 top-0 font-black uppercase leading-[0.82] tracking-[-0.07em] text-white", mini ? "p-1.5 text-[8px]" : "p-3 text-[22px]")}> 
        <div>FRIDAY</div>
        <div className="text-white/70">FEELS</div>
      </div>
      <div className={cn("absolute inset-x-0 bottom-0", mini ? "p-1.5" : "p-3")}> 
        <div className={cn("font-black uppercase leading-none text-white", mini ? "text-[6px]" : "text-[11px]")}>3 spots left</div>
        {!mini ? (
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="rounded-full bg-white px-2 py-1 text-[7px] font-black uppercase tracking-[0.08em] text-slate-950">Book now</span>
            <span className="text-[7px] font-extrabold uppercase tracking-[0.12em] text-white/70">North & Pine</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CreativeGenerator({ phase, reduced }: SceneProps) {
  const generating = phase === 3;
  const ready = phase >= 4;

  return (
    <div className="mt-2.5 rounded-[14px] border border-slate-200 bg-white p-2.5 shadow-[0_10px_30px_-28px_rgba(15,23,42,0.5)]">
      <div className="flex items-center gap-2">
        <span className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-400">Creative</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[7.5px] font-extrabold text-violet-700">
          <WandSparkles className="h-2.5 w-2.5" /> AI studio
        </span>
      </div>

      <div className="mt-2 flex gap-2.5">
        <div className="relative shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            {!ready ? (
              <motion.div
                key="generating"
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                className="relative flex h-[128px] w-[128px] items-center justify-center overflow-hidden rounded-[14px] border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50"
              >
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(139,92,246,.23) 0 2px, transparent 3px), radial-gradient(circle at 75% 60%, rgba(37,99,255,.18) 0 2px, transparent 3px)", backgroundSize: "22px 22px" }} />
                <motion.div
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-lg"
                  animate={generating && !reduced ? { rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 0.9, repeat: generating ? Infinity : 0 }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
                <div className="absolute bottom-3 inset-x-2 text-center text-[8px] font-extrabold text-violet-700">{generating ? "Creating 3 concepts…" : "Ready to generate"}</div>
                {generating ? (
                  <motion.div
                    className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    initial={{ x: -80 }}
                    animate={{ x: 200 }}
                    transition={{ duration: reduced ? 0 : 1, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
              </motion.div>
            ) : (
              <motion.div key="selected" initial={reduced ? false : { opacity: 0, scale: 0.88, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <CreativeCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="min-w-0 flex-1">
          <div className="rounded-[10px] bg-slate-50 px-2.5 py-2">
            <div className="text-[7px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Prompt</div>
            <div className="mt-1 text-[8.5px] font-semibold leading-snug text-slate-700">Friday availability. Premium, confident, social-first.</div>
          </div>

          <div className="mt-2 text-[7px] font-extrabold uppercase tracking-[0.12em] text-slate-400">Concepts</div>
          <div className="mt-1.5 flex gap-1.5">
            {[0, 1, 2].map((variant) => (
              <motion.div
                key={variant}
                initial={ready && !reduced ? { opacity: 0, y: 10, rotate: variant === 0 ? -3 : variant === 2 ? 3 : 0 } : false}
                animate={{ opacity: ready ? 1 : 0.28, y: 0, rotate: 0 }}
                transition={{ delay: reduced ? 0 : variant * 0.09, type: "spring", stiffness: 260, damping: 22 }}
                className={cn("rounded-[10px] p-[2px]", ready && variant === 0 ? "bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500" : "bg-slate-100")}
              >
                <CreativeCard mini variant={variant} />
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {ready ? (
              <motion.div initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[7.5px] font-extrabold text-emerald-700">
                <Check className="h-2.5 w-2.5" strokeWidth={3} /> Concept 1 selected
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Composer({ phase, reduced, elapsedMs }: SceneProps) {
  const captionReady = phase >= 2;
  const selectedCount = phase >= 4 ? 5 : 0;
  const scheduleReady = phase >= 5;
  const leaving = phase >= 6;

  return (
    <AnimatePresence>
      {phase >= 1 && phase <= 6 ? (
        <motion.div
          className="absolute bottom-2.5 right-2.5 top-2.5 z-30 flex w-[39%] min-w-[306px] max-w-[370px] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_28px_75px_-30px_rgba(15,23,42,0.5)]"
          initial={reduced ? false : { opacity: 0, x: 78, scale: 0.96, rotate: 0.8 }}
          animate={{ opacity: leaving ? 0.08 : 1, x: leaving ? 38 : 0, scale: leaving ? 0.95 : 1, rotate: 0 }}
          exit={reduced ? undefined : { opacity: 0, x: 70, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 230, damping: 25, mass: 0.9 }}
        >
          <div className="relative overflow-hidden border-b border-slate-100 px-4 py-3">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500" />
            <div className="flex items-center gap-2">
              <div>
                <div className="text-[13px] font-black tracking-tight text-slate-900">Create post</div>
                <div className="mt-0.5 text-[8px] font-semibold text-slate-400">North & Pine Studio · Draft</div>
              </div>
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-[7.5px] font-extrabold text-slate-500">Multi-channel</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400"><X className="h-3 w-3" /></span>
            </div>
          </div>

          <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50/60 px-3 py-2">
            {["Write", "Create", "Channels", "Schedule"].map((label, i) => {
              const active = phase >= i + 2;
              return (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={cn("flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-black", active ? "bg-zapla-ink text-white" : "bg-white text-slate-300 ring-1 ring-slate-200")}>{i + 1}</span>
                  <span className={cn("text-[7px] font-extrabold", active ? "text-slate-700" : "text-slate-300")}>{label}</span>
                </div>
              );
            })}
          </div>

          <div className="min-h-0 flex-1 overflow-hidden px-3.5 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-400">Caption</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[7.5px] font-extrabold text-violet-600"><Sparkles className="h-2.5 w-2.5" /> Improve with AI</span>
            </div>
            <div className="mt-1.5 min-h-[56px] rounded-[12px] border border-slate-200 bg-slate-50/60 p-2.5 text-[9.5px] font-medium leading-[1.42] text-slate-700">
              {captionReady ? (
                <motion.span initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduced ? 0 : 0.42 }}>{CAPTION}</motion.span>
              ) : <span className="text-slate-300">Write your caption…</span>}
            </div>

            <CreativeGenerator phase={phase} reduced={reduced} elapsedMs={elapsedMs} />

            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-[8px] font-extrabold uppercase tracking-[0.13em] text-slate-400">Publish to</span>
              <span className="text-[7px] font-bold text-slate-300">{selectedCount}/5 selected</span>
              <div className="ml-auto flex items-center gap-1">
                {CHANNELS.map(({ key, Mark }, index) => {
                  const selected = index < selectedCount;
                  return (
                    <motion.span
                      key={key}
                      className={cn("relative flex h-7 w-7 items-center justify-center rounded-[8px] border", selected ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white")}
                      animate={{ y: selected ? [0, -3, 0] : 0, scale: selected ? 1 : 0.94 }}
                      transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : index * 0.075 }}
                    >
                      <Mark size={18} />
                      {selected ? <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500"><Check className="h-2 w-2 text-white" strokeWidth={3.5} /></span> : null}
                    </motion.span>
                  );
                })}
              </div>
            </div>

            <div className={cn("mt-2.5 flex items-center gap-2 rounded-[12px] border px-2.5 py-2 transition-colors", scheduleReady ? "border-blue-200 bg-blue-50/70" : "border-slate-200 bg-white")}> 
              <CalendarDays className={cn("h-3.5 w-3.5", scheduleReady ? "text-blue-600" : "text-slate-400")} />
              <div className="min-w-0 flex-1">
                <div className="text-[8.5px] font-extrabold text-slate-700">Friday, 21 August</div>
                <div className="text-[7px] font-semibold text-slate-400">Sydney · AET</div>
              </div>
              <div className="flex items-center gap-1 rounded-[8px] border border-white bg-white px-2 py-1 text-[8px] font-extrabold text-slate-600 shadow-sm"><Clock3 className="h-2.5 w-2.5 text-slate-400" /> 9:00 AM</div>
            </div>
          </div>

          <div className="flex items-center border-t border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
            <span className="inline-flex items-center gap-1 text-[7.5px] font-bold text-slate-400"><ImageIcon className="h-2.5 w-2.5" /> AI creative ready</span>
            <motion.button
              className={cn("ml-auto inline-flex items-center gap-1.5 rounded-[10px] px-3.5 py-2 text-[9px] font-black", scheduleReady ? "bg-zapla-ink text-white shadow-[0_8px_18px_-10px_rgba(15,23,42,.8)]" : "bg-slate-200 text-slate-400")}
              animate={{ scale: phase === 5 ? [1, 1.045, 1] : 1 }}
              transition={{ duration: reduced ? 0 : 0.38 }}
            >
              <Send className="h-3 w-3" /> Schedule post
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FlyingPost({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute z-50 w-[118px] overflow-hidden rounded-[12px] border-2 border-blue-400 bg-white shadow-[0_22px_45px_-18px_rgba(37,99,255,.65)]"
          initial={reduced ? false : { left: "72%", top: "35%", scale: 1, rotate: 1, opacity: 1 }}
          animate={reduced ? undefined : { left: "54%", top: "25%", scale: 0.53, rotate: -2, opacity: [1, 1, 0] }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 0.8, 0.24, 1] }}
        >
          <div className="h-[66px] overflow-hidden"><CreativeCard /></div>
          <div className="px-2 py-1.5"><div className="text-[8px] font-black text-slate-800">Friday availability</div><div className="mt-1"><PlatformStack size={11} count={5} /></div></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneContent({ phase, reduced, elapsedMs }: SceneProps) {
  const scheduled = phase >= 6;

  return (
    <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex h-[48px] shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><CalendarDays className="h-3.5 w-3.5" /></span>
          <div className="min-w-0">
            <div className="truncate text-[11px] font-black tracking-tight text-slate-800">Content Planner</div>
            <div className="truncate text-[7.5px] font-semibold text-slate-400">17 Aug – 6 Sep 2026 · 27 scheduled posts</div>
          </div>
        </div>

        <div className="ml-3 hidden items-center rounded-[9px] border border-slate-200 bg-slate-50 p-[2px] sm:flex">
          <button className="rounded-[7px] px-2 py-1 text-[8px] font-bold text-slate-400">Week</button>
          <button className="rounded-[7px] bg-white px-2 py-1 text-[8px] font-extrabold text-slate-700 shadow-sm">3 weeks</button>
          <button className="rounded-[7px] px-2 py-1 text-[8px] font-bold text-slate-400">Month</button>
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="hidden rounded-[8px] border border-slate-200 px-2 py-1 text-[8px] font-bold text-slate-500 lg:inline-flex">Today</button>
          <button className="hidden h-6 w-6 items-center justify-center rounded-[8px] border border-slate-200 text-slate-400 lg:flex"><ChevronLeft className="h-3 w-3" /></button>
          <button className="hidden h-6 w-6 items-center justify-center rounded-[8px] border border-slate-200 text-slate-400 lg:flex"><ChevronRight className="h-3 w-3" /></button>
          <motion.button
            className="ml-1 inline-flex items-center gap-1 rounded-[9px] bg-zapla-ink px-3 py-1.5 text-[8.5px] font-black text-white shadow-[0_7px_18px_-12px_rgba(15,23,42,.8)]"
            animate={{ boxShadow: phase === 1 ? "0 0 0 5px rgba(37,99,255,0.16)" : "0 7px 18px -12px rgba(15,23,42,.8)" }}
          >
            <Plus className="h-3 w-3" /> New post
          </motion.button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1">
        <CalendarGrid scheduled={scheduled} reduced={reduced} />
        <Composer phase={phase} reduced={reduced} elapsedMs={elapsedMs} />
        <FlyingPost show={phase === 6} reduced={reduced} />

        <AnimatePresence>
          {scheduled ? (
            <motion.div
              className="absolute bottom-3 right-3 z-40 flex items-center gap-2 rounded-[13px] border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_45px_-22px_rgba(15,23,42,0.5)]"
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              <div><div className="text-[9px] font-black text-slate-800">Scheduled across 5 channels</div><div className="text-[7.5px] font-semibold text-slate-400">Friday 21 Aug · 9:00 AM</div></div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
