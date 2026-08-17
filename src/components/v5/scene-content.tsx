import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Plus, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  GoogleBusinessMark,
  InstagramMark,
  LinkedInMark,
  TikTokMark,
} from "./social-brands";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const CHANNELS = [
  { key: "instagram", Mark: InstagramMark },
  { key: "facebook", Mark: FacebookMark },
  { key: "linkedin", Mark: LinkedInMark },
  { key: "google", Mark: GoogleBusinessMark },
  { key: "tiktok", Mark: TikTokMark },
] as const;

const DAYS = [
  [17, "3 ways to prepare", "Meet the team"],
  [18, "Behind the scenes", ""],
  [19, "Customer story", "Quick FAQ"],
  [20, "Availability update", ""],
  [21, "5 things customers ask", ""],
  [22, "Weekend inspiration", ""],
  [23, "Sunday reset", ""],
  [24, "New week, new slots", ""],
  [25, "Staff spotlight", "One-minute tip"],
  [26, "Client result", ""],
  [27, "FAQ reel", ""],
  [28, "Friday reminder", "Last spots this week"],
  [29, "Weekend guide", ""],
  [30, "Next week preview", ""],
  [31, "August recap", ""],
  [1, "Hello September", ""],
  [2, "How it works", "Customer question"],
  [3, "Quick poll", ""],
  [4, "Friday availability", ""],
  [5, "Weekend story", ""],
  [6, "Week ahead", ""],
] as const;

const tones = [
  "bg-blue-50 border-blue-100 text-blue-950",
  "bg-violet-50 border-violet-100 text-violet-950",
  "bg-emerald-50 border-emerald-100 text-emerald-950",
  "bg-amber-50 border-amber-100 text-amber-950",
  "bg-rose-50 border-rose-100 text-rose-950",
];

function PlatformStack({ count = 3 }: { count?: number }) {
  return (
    <div className="flex items-center">
      {CHANNELS.slice(0, count).map(({ key, Mark }, i) => (
        <span key={key} className={cn("rounded-[4px] bg-white shadow-sm", i > 0 && "-ml-1")}>
          <Mark size={10} />
        </span>
      ))}
    </div>
  );
}

function CalendarCard({ title, index, time }: { title: string; index: number; time: string }) {
  return (
    <div className={cn("rounded-[7px] border px-1.5 py-1", tones[index % tones.length])}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[7px] font-black opacity-45">{time}</span>
        <PlatformStack count={(index % 4) + 1} />
      </div>
      <div className="mt-0.5 truncate text-[7.5px] font-bold">{title}</div>
    </div>
  );
}

function NewPostInCalendar({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.55, y: -18, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className="overflow-hidden rounded-[8px] border-2 border-blue-400 bg-white shadow-[0_12px_26px_-16px_rgba(37,99,255,.85)]"
    >
      <div className="h-8 overflow-hidden">
        <img src={photoB} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="px-1.5 py-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[7px] font-black text-blue-700">9:00</span>
          <span className="rounded-full bg-blue-50 px-1 py-[1px] text-[6px] font-black text-blue-700">NEW</span>
        </div>
        <div className="truncate text-[7.5px] font-black text-slate-800">3 spots left Friday</div>
        <div className="mt-0.5"><PlatformStack count={5} /></div>
      </div>
    </motion.div>
  );
}

function DenseCalendar({ scheduled }: { scheduled: boolean }) {
  return (
    <div className="absolute inset-0 bg-[#f7f8fb] p-2.5">
      <div className="grid grid-cols-7 border-b border-slate-200 pb-1.5">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
          <div key={d} className="px-1 text-[8px] font-black uppercase tracking-[.11em] text-slate-400">{d}</div>
        ))}
      </div>
      <div className="mt-1.5 grid h-[calc(100%-24px)] grid-cols-7 grid-rows-3 gap-1.5">
        {DAYS.map(([date, a, b], i) => {
          const target = date === 21 && i < 7;
          const sep = i >= 15;
          return (
            <div key={`${i}-${date}`} className={cn("relative overflow-hidden rounded-[9px] border p-1.5", target ? "border-blue-200 bg-blue-50/35" : sep ? "border-slate-200 bg-slate-50/80" : "border-slate-200 bg-white")}> 
              <div className="mb-1 flex items-center gap-1">
                <span className={cn("flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[7.5px] font-black", target ? "bg-zapla-ink text-white" : "text-slate-600")}>{date}</span>
                {(i === 0 || i === 15) && <span className="text-[6px] font-bold uppercase tracking-wide text-slate-300">{i === 15 ? 'Sep' : 'Aug'}</span>}
                {target && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />}
              </div>
              <div className="space-y-1">
                {target && scheduled && <NewPostInCalendar reduced={false} />}
                {a && <CalendarCard title={a} index={i} time={i % 3 === 0 ? '9:00' : i % 3 === 1 ? '12:00' : '15:00'} />}
                {b && <CalendarCard title={b} index={i + 2} time={i % 2 ? '16:30' : '14:00'} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CreativeCard({
  photo,
  variant,
  selected,
  reduced,
}: {
  photo: string;
  variant: 0 | 1 | 2;
  selected?: boolean;
  reduced: boolean;
}) {
  const accent = variant === 0 ? "from-blue-600/85 via-indigo-500/25" : variant === 1 ? "from-fuchsia-600/75 via-orange-400/20" : "from-emerald-600/80 via-cyan-400/20";
  const eyebrow = variant === 0 ? "FRIDAY FEELS" : variant === 1 ? "YOUR FRIDAY" : "LAST CALL";
  const copy = variant === 0 ? "3 SPOTS LEFT" : variant === 1 ? "MAKE TIME FOR YOU" : "BOOK BEFORE 5";

  return (
    <motion.div
      className={cn("relative h-[222px] w-[176px] overflow-hidden rounded-[20px] border bg-slate-950", selected ? "border-white shadow-[0_30px_70px_-30px_rgba(15,23,42,.65),0_0_0_4px_rgba(37,99,255,.18)]" : "border-white/80 shadow-[0_22px_55px_-34px_rgba(15,23,42,.55)]")}
      animate={selected && !reduced ? { y: [0, -4, 0] } : {}}
      transition={{ duration: 1.7, repeat: selected ? Infinity : 0, ease: "easeInOut" }}
    >
      <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className={cn("absolute inset-0 bg-gradient-to-tr to-transparent", accent)} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/5 to-white/10" />
      <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[7px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">North & Pine</div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="text-[8px] font-black uppercase tracking-[.18em] text-white/65">{eyebrow}</div>
        <div className="mt-1 text-[25px] font-black leading-[.88] tracking-[-.06em]">{copy}</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-[7px] font-black uppercase tracking-[.08em] text-slate-950">Book now</span>
          <span className="text-[7px] font-bold text-white/65">Fri 21 Aug</span>
        </div>
      </div>
    </motion.div>
  );
}

function ChannelOrb({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const { Mark } = CHANNELS[index];
  const positions = [
    { x: -142, y: -112 },
    { x: 146, y: -100 },
    { x: -168, y: 38 },
    { x: 164, y: 54 },
    { x: 8, y: 145 },
  ];
  const p = positions[index];
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/80 bg-white/90 shadow-[0_12px_30px_-16px_rgba(15,23,42,.55)] backdrop-blur-xl"
      initial={reduced ? false : { opacity: 0, scale: 0.3, x: 0, y: 0 }}
      animate={phase >= 4 ? { opacity: 1, scale: 1, x: p.x, y: p.y } : { opacity: 0, scale: 0.3, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 19, delay: reduced ? 0 : index * 0.08 }}
      style={{ marginLeft: -20, marginTop: -20 }}
    >
      <Mark size={24} />
      {phase >= 4 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.22 + index * 0.08, type: 'spring' }} className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500"><Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} /></motion.span>}
    </motion.div>
  );
}

function MotionComposition({ phase, reduced }: SceneProps) {
  const generated = phase >= 2;
  const selected = phase >= 3;
  const ready = phase >= 5;
  const leaving = phase >= 6;

  return (
    <AnimatePresence>
      {phase >= 1 && phase <= 6 ? (
        <motion.div
          className="absolute inset-0 z-30 overflow-hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: leaving ? 0.15 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .35 }}
        >
          <div className="absolute inset-0 bg-white/48 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,rgba(255,255,255,.96),rgba(255,255,255,.68)_35%,rgba(255,255,255,.3)_62%,transparent_78%)]" />

          <motion.div
            className="absolute left-[8%] top-[13%] z-20 w-[220px] rounded-[18px] border border-white/80 bg-white/72 p-3.5 shadow-[0_24px_60px_-28px_rgba(15,23,42,.45)] backdrop-blur-[24px]"
            initial={reduced ? false : { opacity: 0, x: -30, y: 10, scale: .94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white"><Sparkles className="h-4 w-4" /></span>
              <div>
                <div className="text-[8px] font-black uppercase tracking-[.13em] text-violet-600">AI creative brief</div>
                <div className="text-[11px] font-black tracking-tight text-slate-900">Fill Friday appointments</div>
              </div>
            </div>
            <div className="mt-2.5 rounded-[11px] bg-white/75 px-2.5 py-2 text-[9px] font-semibold leading-[1.45] text-slate-600 ring-1 ring-slate-100">Premium, confident and social-first. Show only 3 appointments remaining.</div>
            <div className="mt-2 flex items-center gap-1.5 text-[7.5px] font-extrabold text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Instagram · Facebook · Google</div>
          </motion.div>

          <div className="absolute left-1/2 top-1/2 z-20 h-[260px] w-[470px] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="absolute left-[22px] top-[22px]"
              initial={reduced ? false : { opacity: 0, x: 110, scale: .8, rotate: 0 }}
              animate={generated ? { opacity: selected ? .55 : 1, x: 0, scale: selected ? .88 : 1, rotate: -8 } : { opacity: 0, x: 110, scale: .8, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 23 }}
            >
              <CreativeCard photo={photoA} variant={1} reduced={reduced} />
            </motion.div>

            <motion.div
              className="absolute right-[22px] top-[18px]"
              initial={reduced ? false : { opacity: 0, x: -110, scale: .8, rotate: 0 }}
              animate={generated ? { opacity: selected ? .55 : 1, x: 0, scale: selected ? .88 : 1, rotate: 8 } : { opacity: 0, x: -110, scale: .8, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 23, delay: reduced ? 0 : .07 }}
            >
              <CreativeCard photo={photoC} variant={2} reduced={reduced} />
            </motion.div>

            <motion.div
              className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
              initial={reduced ? false : { opacity: 0, y: 42, scale: .82 }}
              animate={generated ? { opacity: 1, y: selected ? -10 : 0, scale: selected ? 1.12 : 1 } : { opacity: 0, y: 42, scale: .82 }}
              transition={{ type: "spring", stiffness: 250, damping: 21, delay: reduced ? 0 : .12 }}
            >
              <CreativeCard photo={photoB} variant={0} selected={selected} reduced={reduced} />
            </motion.div>

            {!generated && (
              <motion.div className="absolute left-1/2 top-[72px] -translate-x-1/2 rounded-[18px] border border-violet-100 bg-white/90 px-6 py-5 text-center shadow-xl backdrop-blur-xl" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}>
                <motion.span className="mx-auto flex h-11 w-11 items-center justify-center rounded-[14px] bg-violet-50 text-violet-600" animate={!reduced ? { rotate: [0,-8,8,0], scale:[1,1.08,1] } : {}} transition={{ duration: 1.2, repeat: Infinity }}><Sparkles className="h-5 w-5" /></motion.span>
                <div className="mt-2 text-[10px] font-black text-slate-800">Generating 3 concepts</div>
                <div className="mt-1 text-[8px] font-semibold text-slate-400">Using your brand + campaign goal</div>
              </motion.div>
            )}
          </div>

          {[0,1,2,3,4].map((i) => <ChannelOrb key={i} index={i} phase={phase} reduced={reduced} />)}

          <AnimatePresence>
            {ready && (
              <motion.div
                className="absolute bottom-[9%] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-[16px] border border-white/90 bg-white/90 px-3 py-2.5 shadow-[0_20px_50px_-22px_rgba(15,23,42,.5)] backdrop-blur-[24px]"
                initial={reduced ? false : { opacity: 0, y: 18, scale: .94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span className="rounded-[10px] bg-slate-950 px-3 py-2 text-[9px] font-black text-white">Fri 21 Aug · 9:00 AM</span>
                <div className="flex items-center gap-1"><PlatformStack count={5} /></div>
                <motion.span className="inline-flex items-center gap-1.5 rounded-[10px] bg-zapla-blue px-3 py-2 text-[9px] font-black text-white" animate={!reduced ? { boxShadow: ["0 0 0 0 rgba(37,99,255,0)","0 0 0 7px rgba(37,99,255,.14)","0 0 0 0 rgba(37,99,255,0)"] } : {}} transition={{ duration: 1.2, repeat: Infinity }}><Send className="h-3 w-3" /> Schedule</motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {leaving && (
              <motion.div
                className="absolute left-1/2 top-1/2 z-[60] h-[222px] w-[176px]"
                initial={{ x: -88, y: -126, scale: 1.12, rotate: 0, opacity: 1 }}
                animate={{ x: 64, y: -172, scale: .22, rotate: -7, opacity: [1,1,0] }}
                transition={{ duration: .9, ease: [0.2,.85,.25,1] }}
              >
                <CreativeCard photo={photoB} variant={0} selected reduced={reduced} />
              </motion.div>
            )}
          </AnimatePresence>
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
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><CalendarDays className="h-3.5 w-3.5" /></span>
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-800">Content Planner</div>
          <div className="text-[7.5px] font-semibold text-slate-400">17 Aug – 6 Sep 2026 · 27 scheduled posts</div>
        </div>
        <div className="ml-3 hidden rounded-[9px] border border-slate-200 bg-slate-50 p-[2px] sm:flex">
          <span className="rounded-[7px] px-2 py-1 text-[8px] font-bold text-slate-400">Week</span>
          <span className="rounded-[7px] bg-white px-2 py-1 text-[8px] font-black text-slate-700 shadow-sm">3 weeks</span>
          <span className="rounded-[7px] px-2 py-1 text-[8px] font-bold text-slate-400">Month</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden rounded-[8px] border border-slate-200 px-2 py-1 text-[8px] font-bold text-slate-500 lg:inline-flex">Today</span>
          <span className="hidden h-6 w-6 items-center justify-center rounded-[8px] border border-slate-200 text-slate-400 lg:flex"><ChevronLeft className="h-3 w-3" /></span>
          <span className="hidden h-6 w-6 items-center justify-center rounded-[8px] border border-slate-200 text-slate-400 lg:flex"><ChevronRight className="h-3 w-3" /></span>
          <motion.span className="ml-1 inline-flex items-center gap-1 rounded-[9px] bg-zapla-ink px-3 py-1.5 text-[8.5px] font-black text-white" animate={{ boxShadow: phase === 1 ? "0 0 0 5px rgba(37,99,255,.16)" : "0 0 0 0 rgba(37,99,255,0)" }}><Plus className="h-3 w-3" /> New post</motion.span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <DenseCalendar scheduled={scheduled} />
        <MotionComposition phase={phase} reduced={reduced} elapsedMs={elapsedMs} />
        <AnimatePresence>
          {scheduled && (
            <motion.div className="absolute bottom-3 right-3 z-50 flex items-center gap-2 rounded-[13px] border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_45px_-22px_rgba(15,23,42,.5)]" initial={reduced ? false : { opacity: 0, y: 14, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
              <div><div className="text-[9px] font-black text-slate-800">Post scheduled</div><div className="text-[7.5px] font-semibold text-slate-400">Friday 21 Aug · 5 channels</div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
