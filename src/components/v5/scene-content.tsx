import { AnimatePresence, motion } from "motion/react";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
  Send,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT, type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  InstagramMark,
  LinkedInMark,
  PinterestMark,
  ThreadsMark,
  TikTokMark,
} from "./social-brands";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const CHANNELS = [
  { key: "instagram", Mark: InstagramMark },
  { key: "facebook", Mark: FacebookMark },
  { key: "tiktok", Mark: TikTokMark },
  { key: "linkedin", Mark: LinkedInMark },
  { key: "pinterest", Mark: PinterestMark },
  { key: "threads", Mark: ThreadsMark },
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

const TONES = [
  "bg-blue-50 border-blue-100 text-blue-950",
  "bg-violet-50 border-violet-100 text-violet-950",
  "bg-emerald-50 border-emerald-100 text-emerald-950",
  "bg-amber-50 border-amber-100 text-amber-950",
  "bg-rose-50 border-rose-100 text-rose-950",
];

function PlatformStack({ count = 3, size = 10 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center">
      {CHANNELS.slice(0, count).map(({ key, Mark }, i) => (
        <span
          key={key}
          className={cn("rounded-[4px] bg-white shadow-sm", i > 0 && "-ml-1")}
          style={{ zIndex: count - i }}
        >
          <Mark size={size} />
        </span>
      ))}
    </div>
  );
}

function CalendarCard({ title, index, time }: { title: string; index: number; time: string }) {
  return (
    <motion.div
      layout
      className={cn("rounded-[7px] border px-1.5 py-1", TONES[index % TONES.length])}
      transition={{ layout: { type: "spring", stiffness: 280, damping: 24 } }}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[7px] font-black opacity-45">{time}</span>
        <PlatformStack count={(index % 4) + 1} />
      </div>
      <div className="mt-0.5 truncate text-[7.5px] font-bold">{title}</div>
    </motion.div>
  );
}

function ScheduledTile({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      layout
      initial={reduced ? false : { opacity: 0, scale: 0.45, y: -18, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 310, damping: 20 }}
      className="relative overflow-hidden rounded-[8px] border-2 border-blue-400 bg-white shadow-[0_12px_28px_-16px_rgba(37,99,255,.9)]"
    >
      <div className="h-8 overflow-hidden">
        <img src={photoB} alt="" className="h-full w-full object-cover object-[50%_42%]" />
      </div>
      <div className="px-1.5 py-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[7px] font-black text-blue-700">9:00</span>
          <span className="rounded-full bg-emerald-50 px-1 py-[1px] text-[6px] font-black text-emerald-700">SCHEDULED</span>
        </div>
        <div className="truncate text-[7.5px] font-black text-slate-800">Only 3 spots left Friday</div>
        <div className="mt-0.5"><PlatformStack count={6} /></div>
      </div>
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-[8px] ring-2 ring-blue-400"
        initial={reduced ? false : { opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 1.18 }}
        transition={{ duration: reduced ? 0 : 0.9 }}
      />
    </motion.div>
  );
}

function OpenSlot({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: 35, y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="relative overflow-hidden rounded-[8px] border border-dashed border-blue-300 bg-blue-50/50 px-1.5 py-1"
        >
          <div className="flex items-center gap-1 text-[7px] font-black text-blue-700">
            <Clock3 className="h-2.5 w-2.5" /> 9:00 open
          </div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/85 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "140%" }}
            transition={{ duration: 1.1, repeat: 1, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DenseCalendar({ phase, reduced }: { phase: number; reduced: boolean }) {
  const focus = phase >= 1 && phase <= 5;
  const scheduled = phase >= 6;

  return (
    <motion.div
      className="absolute inset-0 bg-[#f7f8fb] p-2.5"
      animate={{
        scale: focus ? 0.955 : 1,
        x: focus ? -10 : 0,
        y: focus ? 5 : 0,
        opacity: focus ? 0.72 : 1,
        filter: focus ? "blur(0.45px)" : "blur(0px)",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
    >
      <div className="grid grid-cols-7 border-b border-slate-200 pb-1.5">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="px-1 text-[8px] font-black uppercase tracking-[.11em] text-slate-400">{d}</div>
        ))}
      </div>

      <div className="mt-1.5 grid h-[calc(100%-24px)] grid-cols-7 grid-rows-3 gap-1.5">
        {DAYS.map(([date, a, b], i) => {
          const target = date === 21 && i < 7;
          const sep = i >= 15;

          return (
            <motion.div
              key={`${i}-${date}`}
              initial={reduced ? false : { opacity: 0, y: 10, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: target && phase === 1 ? 1.035 : 1,
                boxShadow: target && phase === 1 ? "0 0 0 3px rgba(37,99,255,.14)" : "0 0 0 0 rgba(37,99,255,0)",
              }}
              transition={{
                opacity: { duration: 0.28, delay: reduced ? 0 : Math.min(i * 0.018, 0.32) },
                y: { duration: 0.34, delay: reduced ? 0 : Math.min(i * 0.018, 0.32) },
                scale: { type: "spring", stiffness: 260, damping: 20 },
              }}
              className={cn(
                "relative min-h-0 overflow-hidden rounded-[9px] border p-1.5",
                target ? "border-blue-200 bg-blue-50/35" : sep ? "border-slate-200 bg-slate-50/80" : "border-slate-200 bg-white",
              )}
            >
              <div className="mb-1 flex items-center gap-1">
                <span className={cn("flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[7.5px] font-black", target ? "bg-zapla-ink text-white" : "text-slate-600")}>{date}</span>
                {(i === 0 || i === 15) && <span className="text-[6px] font-bold uppercase tracking-wide text-slate-300">{i === 15 ? "Sep" : "Aug"}</span>}
                {target && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />}
              </div>

              <motion.div layout className="space-y-1">
                {target && <OpenSlot visible={phase === 1} />}
                {target && scheduled && <ScheduledTile reduced={reduced} />}
                {a && <CalendarCard title={a} index={i} time={i % 3 === 0 ? "9:00" : i % 3 === 1 ? "12:00" : "15:00"} />}
                {b && <CalendarCard title={b} index={i + 2} time={i % 2 ? "16:30" : "14:00"} />}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function ConceptA({ selected = false }: { selected?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-slate-950">
      <img src={photoB} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/85 via-indigo-500/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-white/10" />
      <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[7px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">North & Pine</div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="text-[8px] font-black uppercase tracking-[.18em] text-white/65">FRIDAY FEELS</div>
        <div className="mt-1 text-[26px] font-black leading-[.86] tracking-[-.065em]">3 SPOTS<br />LEFT</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-[7px] font-black uppercase tracking-[.08em] text-slate-950">Book now</span>
          <span className="text-[7px] font-bold text-white/65">Fri 21 Aug</span>
        </div>
      </div>
      {selected && <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg"><Check className="h-4 w-4" strokeWidth={3} /></span>}
    </div>
  );
}

function ConceptB() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#fff7ef]">
      <div className="absolute right-0 top-0 h-full w-[54%] overflow-hidden rounded-l-[46px]">
        <img src={photoA} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute left-4 top-4 text-[7px] font-black uppercase tracking-[.15em] text-fuchsia-600">NORTH & PINE</div>
      <div className="absolute bottom-4 left-4 w-[46%]">
        <div className="text-[21px] font-black leading-[.88] tracking-[-.055em] text-slate-900">MAKE<br />TIME<br />FOR YOU</div>
        <div className="mt-3 inline-flex rounded-full bg-fuchsia-600 px-2.5 py-1 text-[7px] font-black uppercase text-white">3 left Friday</div>
      </div>
    </div>
  );
}

function ConceptC() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#12372f]">
      <img src={photoC} alt="" className="absolute inset-x-0 top-0 h-[56%] w-full object-cover opacity-90" />
      <div className="absolute inset-x-0 top-[40%] h-[30%] bg-gradient-to-b from-transparent to-[#12372f]" />
      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-2 py-1 text-[7px] font-black uppercase tracking-[.12em] text-emerald-900">LAST CALL</div>
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="text-[24px] font-black leading-[.88] tracking-[-.055em]">BOOK<br />BEFORE 5</div>
        <div className="mt-2 text-[8px] font-semibold text-white/65">Three appointments remaining this Friday.</div>
      </div>
    </div>
  );
}

function CreativeCard({ variant, selected = false }: { variant: 0 | 1 | 2; selected?: boolean }) {
  return (
    <div className={cn(
      "relative h-[220px] w-[176px] rounded-[20px] border border-white/80 bg-white p-[3px] shadow-[0_28px_65px_-30px_rgba(15,23,42,.58)]",
      selected && "ring-4 ring-blue-500/15",
    )}>
      {variant === 0 ? <ConceptA selected={selected} /> : variant === 1 ? <ConceptB /> : <ConceptC />}
    </div>
  );
}

function BriefCard({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 1 && phase <= 3 ? (
        <motion.div
          className="absolute left-[7%] top-[12%] z-40 w-[225px] rounded-[18px] border border-white/80 bg-white/76 p-3.5 shadow-[0_28px_70px_-34px_rgba(15,23,42,.48)] backdrop-blur-[26px]"
          initial={reduced ? false : { opacity: 0, x: -32, y: 12, scale: 0.92 }}
          animate={{ opacity: phase === 3 ? 0.7 : 1, x: 0, y: 0, scale: phase === 3 ? 0.94 : 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
        >
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white"><WandSparkles className="h-4 w-4" /></span>
            <div>
              <div className="text-[7.5px] font-black uppercase tracking-[.14em] text-violet-600">AI CREATIVE BRIEF</div>
              <div className="text-[11px] font-black tracking-tight text-slate-900">Fill Friday appointments</div>
            </div>
          </div>

          <div className="mt-2.5 overflow-hidden rounded-[11px] bg-white/78 px-2.5 py-2 ring-1 ring-slate-100">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.12 }}
              className="text-[9px] font-semibold leading-[1.45] text-slate-600"
            >
              Promote the final 3 appointments this Friday. Premium, confident, social-first.
            </motion.div>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-[7.5px] font-extrabold text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> 6 channels · Sydney audience
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PostDraftCard({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 2 ? (
        <motion.div
          className="absolute left-1/2 top-[47%] z-50 w-[330px] max-w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-white/85 bg-white/94 p-4 shadow-[0_32px_80px_-34px_rgba(15,23,42,.55)] backdrop-blur-2xl"
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 235, damping: 23 }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-[8px] font-black uppercase tracking-[.16em] text-blue-600">POST DRAFT</div>
            <span className="rounded-full bg-violet-50 px-2 py-1 text-[7px] font-black text-violet-600">AI written</span>
          </div>
          <div className="mt-3 text-[18px] font-black leading-[1.02] tracking-[-.035em] text-slate-900">Only 3 spots left this Friday</div>
          <div className="mt-2.5 text-[10px] font-semibold leading-[1.55] text-slate-600">A few Friday appointments just opened up. Book your spot before they’re gone.</div>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
            <span className="rounded-full bg-slate-950 px-3 py-1.5 text-[8px] font-black text-white">Book now</span>
            <div className="flex items-center gap-2 text-[7.5px] font-bold text-slate-400">
              Ready for creative
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" strokeWidth={3} /></span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function GeneratingSeed({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 3 ? (
        <motion.div
          className="absolute left-1/2 top-[47%] z-[48] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={reduced ? { opacity: 0 } : { opacity: [0, 1, 1, 0], scale: [0.65, 1, 1, 1.15] }}
          transition={{ duration: reduced ? 0 : 0.62, times: [0, 0.18, 0.62, 1] }}
        >
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-100 bg-white/95 shadow-[0_28px_70px_-30px_rgba(109,40,217,.4)] backdrop-blur-xl">
            <motion.span
              className="absolute inset-0 rounded-[28px] border-2 border-violet-300"
              animate={reduced ? {} : { scale: [0.8, 1.35], opacity: [0.7, 0] }}
              transition={{ duration: 0.72, repeat: Infinity, ease: "easeOut" }}
            />
            <Sparkles className="h-8 w-8 text-violet-600" />
          </div>
          <div className="mt-3 rounded-full bg-white/95 px-3 py-1.5 text-[8px] font-black text-violet-700 shadow-sm">Creating 3 concepts…</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ConceptDeck({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 3 || phase > 5) return null;

  const selected = phase >= 4;
  const delay = phase === 3 && !reduced ? 0.48 : 0;

  return (
    <div className="absolute left-1/2 top-[48%] z-40 h-[260px] w-[510px] max-w-[78%] -translate-x-1/2 -translate-y-1/2">
      <motion.div
        className="absolute left-[18px] top-[24px]"
        initial={reduced ? false : { opacity: 0, x: 152, y: 0, scale: 0.5, rotate: 0 }}
        animate={selected ? { opacity: 0.34, x: -16, y: 4, scale: 0.86, rotate: -11, filter: "blur(1px)" } : { opacity: 1, x: 0, y: 0, scale: 1, rotate: -8, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 230, damping: 22, delay }}
      >
        <CreativeCard variant={1} />
      </motion.div>

      <motion.div
        className="absolute right-[18px] top-[24px]"
        initial={reduced ? false : { opacity: 0, x: -152, y: 0, scale: 0.5, rotate: 0 }}
        animate={selected ? { opacity: 0.34, x: 16, y: 4, scale: 0.86, rotate: 11, filter: "blur(1px)" } : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 8, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 230, damping: 22, delay: delay + 0.07 }}
      >
        <CreativeCard variant={2} />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0, y: 52, scale: 0.55 }}
        animate={selected ? { opacity: 1, y: -10, scale: 1.13 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 245, damping: 21, delay: delay + 0.12 }}
      >
        <CreativeCard variant={0} selected={selected} />
      </motion.div>

      <AnimatePresence>
        {phase === 3 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.62 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 rounded-full bg-white/92 px-3 py-1.5 text-[8px] font-black text-slate-700 shadow-[0_10px_28px_-18px_rgba(15,23,42,.55)]"
          >
            3 concepts ready
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ChannelBurst({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 4 || phase > 5) return null;

  const positions = [
    { x: -152, y: -106 },
    { x: 0, y: -132 },
    { x: 152, y: -106 },
    { x: -164, y: 48 },
    { x: 164, y: 48 },
    { x: 0, y: 142 },
  ];

  return (
    <div className="absolute left-1/2 top-[48%] z-50 h-0 w-0">
      {CHANNELS.map(({ key, Mark }, index) => {
        const p = positions[index];
        return (
          <motion.div
            key={key}
            className="absolute flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/85 bg-white/94 shadow-[0_15px_34px_-17px_rgba(15,23,42,.55)] backdrop-blur-xl"
            initial={reduced ? false : { opacity: 0, x: 0, y: 0, scale: 0.2, rotate: 20 }}
            animate={{ opacity: 1, x: p.x, y: p.y, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: reduced ? 0 : index * 0.07 }}
            style={{ marginLeft: -20, marginTop: -20 }}
          >
            <Mark size={23} />
            <motion.span
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: reduced ? 0 : 0.18 + index * 0.07 }}
            >
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
            </motion.span>
          </motion.div>
        );
      })}

      <motion.div
        className="absolute left-0 top-0 -translate-x-1/2 translate-y-[92px] rounded-full border border-white/80 bg-white/94 px-3 py-1.5 shadow-[0_15px_34px_-20px_rgba(15,23,42,.45)] backdrop-blur-xl"
        initial={reduced ? false : { opacity: 0, y: 106, scale: 0.9 }}
        animate={{ opacity: 1, y: 92, scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.4, type: "spring", stiffness: 240, damping: 22 }}
      >
        <div className="whitespace-nowrap text-[7.5px] font-black text-slate-700">Optimised for 6 channels</div>
      </motion.div>
    </div>
  );
}

function ScheduleDock({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 5 ? (
        <motion.div
          className="absolute bottom-[8%] left-1/2 z-[58] flex -translate-x-1/2 items-center gap-2 rounded-[16px] border border-white/80 bg-white/94 px-3 py-2.5 shadow-[0_24px_60px_-26px_rgba(15,23,42,.52)] backdrop-blur-2xl"
          initial={reduced ? false : { opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
          <div className="flex items-center gap-2 rounded-[11px] bg-slate-50 px-2.5 py-2">
            <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
            <div>
              <div className="text-[8px] font-black text-slate-800">Fri 21 Aug</div>
              <div className="text-[7px] font-semibold text-slate-400">9:00 AM · Sydney</div>
            </div>
          </div>
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-[11px] bg-zapla-ink px-3.5 py-2.5 text-[9px] font-black text-white"
            animate={reduced ? {} : { boxShadow: ["0 0 0 0 rgba(37,99,255,0)", "0 0 0 7px rgba(37,99,255,.13)", "0 0 0 0 rgba(37,99,255,0)"] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Send className="h-3 w-3" /> Schedule post
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LandingFlight({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 5 ? (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-[48%] z-[66] h-[220px] w-[176px] -translate-x-1/2 -translate-y-1/2"
          initial={reduced ? false : { x: 0, y: -10, scale: 1.13, rotate: 0, opacity: 1 }}
          animate={reduced ? undefined : { x: 126, y: -166, scale: 0.2, rotate: -8, opacity: [1, 1, 0] }}
          transition={{ duration: 0.95, delay: 0.48, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <CreativeCard variant={0} selected />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function MotionStory({ phase, reduced }: SceneProps) {
  const active = phase >= 1 && phase <= 5;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="absolute inset-0 z-30 overflow-hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="absolute inset-0 bg-white/34 backdrop-blur-[1.5px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(255,255,255,.98),rgba(255,255,255,.74)_34%,rgba(255,255,255,.26)_66%,transparent_80%)]" />

          <BriefCard phase={phase} reduced={reduced} />
          <PostDraftCard phase={phase} reduced={reduced} />
          <GeneratingSeed phase={phase} reduced={reduced} />
          <ConceptDeck phase={phase} reduced={reduced} />
          <ChannelBurst phase={phase} reduced={reduced} />
          <ScheduleDock phase={phase} reduced={reduced} />
          <LandingFlight phase={phase} reduced={reduced} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SuccessToast({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 6 ? (
        <motion.div
          className="absolute bottom-3 right-3 z-50 flex items-center gap-2 rounded-[13px] border border-emerald-100 bg-white px-3 py-2 shadow-[0_18px_45px_-22px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 290, damping: 21 }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-4 w-4" strokeWidth={3} /></span>
          <div>
            <div className="text-[9px] font-black text-slate-800">Scheduled across 6 channels</div>
            <div className="text-[7.5px] font-semibold text-slate-400">Friday 21 Aug · 9:00 AM</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneContent({ phase, reduced }: SceneProps) {
  return (
    <div className="absolute inset-0 flex min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex h-[48px] shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><CalendarDays className="h-3.5 w-3.5" /></span>
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-800">Content Planner</div>
          <div className="flex items-center gap-1.5 text-[7.5px] font-semibold text-slate-400">
            <span>17 Aug – 6 Sep 2026</span>
            <span>·</span>
            <motion.span key={phase >= 6 ? "28" : "27"} initial={reduced ? false : { opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className={phase >= 6 ? "font-black text-emerald-600" : ""}>{phase >= 6 ? "28" : "27"} scheduled posts</motion.span>
          </div>
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
          <motion.span
            className="ml-1 inline-flex items-center gap-1 rounded-[9px] bg-zapla-ink px-3 py-1.5 text-[8.5px] font-black text-white"
            animate={{ boxShadow: phase === 1 ? "0 0 0 5px rgba(37,99,255,.16)" : "0 0 0 0 rgba(37,99,255,0)" }}
          >
            <Plus className="h-3 w-3" /> New post
          </motion.span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <DenseCalendar phase={phase} reduced={reduced} />
        <MotionStory phase={phase} reduced={reduced} elapsedMs={0} />
        <SuccessToast phase={phase} reduced={reduced} />
      </div>
    </div>
  );
}
