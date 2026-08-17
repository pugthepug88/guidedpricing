import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, MoreHorizontal, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SceneContent as ContentPlannerScene } from "./scene-content";
import { type SceneProps } from "./motion-kit";
import {
  FacebookMark,
  InstagramMark,
  LinkedInMark,
  PinterestMark,
  ThreadsMark,
  TikTokMark,
} from "./social-brands";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const CHANNELS = [
  { key: "instagram", label: "Instagram", Mark: InstagramMark },
  { key: "facebook", label: "Facebook", Mark: FacebookMark },
  { key: "tiktok", label: "TikTok", Mark: TikTokMark },
  { key: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { key: "pinterest", label: "Pinterest", Mark: PinterestMark },
  { key: "threads", label: "Threads", Mark: ThreadsMark },
] as const;

function ViewModePatch() {
  return (
    <div className="absolute left-[175px] top-[8px] z-[96] hidden items-center bg-white pl-4 pr-2 sm:flex">
      <div className="flex rounded-[9px] border border-slate-200 bg-slate-50 p-[2px]">
        <span className="rounded-[7px] bg-white px-2.5 py-1 text-[8px] font-black text-slate-700 shadow-sm">Calendar</span>
        <span className="rounded-[7px] px-2.5 py-1 text-[8px] font-bold text-slate-400">List</span>
      </div>
    </div>
  );
}

function ComposerOverlay({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 2 ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.36 }}
        >
          <div className="absolute inset-0 bg-white/82 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_44%,rgba(255,255,255,1),rgba(255,255,255,.92)_38%,rgba(255,255,255,.7)_70%,rgba(255,255,255,.48)_100%)]" />

          <motion.div
            className="absolute bottom-[6%] right-[4%] top-[6%] flex w-[min(400px,90%)] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_30px_80px_-38px_rgba(15,23,42,.5)]"
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.995 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.82, 0.24, 1] }}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <div>
                <div className="text-[12px] font-black tracking-tight text-slate-900">New Social Post</div>
                <div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">Create once, publish everywhere</div>
              </div>
              <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-[8px] text-slate-300">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Post to</div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {CHANNELS.map(({ key, Mark }, index) => (
                      <motion.span
                        key={key}
                        className="inline-flex items-center justify-center"
                        initial={reduced ? false : { opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduced ? 0 : 0.16 + index * 0.075, duration: 0.24 }}
                      >
                        <Mark size={21} />
                      </motion.span>
                    ))}
                    <span className="ml-1 text-[8px] font-black text-slate-500">6 channels</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[7px] font-bold text-slate-400">
                  <span className="relative h-4 w-7 rounded-full bg-slate-200">
                    <span className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm" />
                  </span>
                  Customize
                </div>
              </div>

              <div className="mt-3.5">
                <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Headline / hook</div>
                <motion.div
                  className="mt-1.5 rounded-[11px] border border-slate-200 bg-slate-50/65 px-3 py-2.5 text-[10.5px] font-black text-slate-800"
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.36, duration: 0.32 }}
                >
                  Only 3 spots left this Friday
                </motion.div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Post content</div>
                  <span className="rounded-full bg-violet-50 px-2 py-1 text-[6.5px] font-black text-violet-600">AI written</span>
                </div>
                <motion.div
                  className="mt-1.5 min-h-[92px] rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-[9.5px] font-semibold leading-[1.55] text-slate-600"
                  initial={reduced ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.54, duration: 0.34 }}
                >
                  A few Friday appointments just opened up. Book your spot before they’re gone.
                  <div className="mt-2 text-[8.5px] font-bold text-blue-600">Book now →</div>
                </motion.div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[7px] font-bold text-slate-300">
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">AI</span>
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">B</span>
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">#</span>
                  <span className="rounded-[6px] border border-slate-100 px-1.5 py-1">Link</span>
                  <span className="ml-auto">2200 chars</span>
                </div>
              </div>

              <motion.div
                className="mt-3 rounded-[13px] border border-violet-100 bg-violet-50/55 p-2.5"
                initial={reduced ? false : { opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.76, duration: 0.34 }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[8.5px] font-black text-slate-800">Generate creative concepts</div>
                    <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Create 3 visual options from this post</div>
                  </div>
                  <span className="rounded-full bg-white px-2 py-1 text-[6.5px] font-black text-violet-600 shadow-sm">NEXT</span>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/45 px-4 py-2.5">
              <span className="inline-flex items-center gap-1 text-[7px] font-bold text-emerald-600">
                <Check className="h-3 w-3" strokeWidth={3} /> Draft ready
              </span>
              <span className="ml-auto text-[7px] font-semibold text-slate-400">Ready for creative</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Artwork({ variant, selected = false }: { variant: 0 | 1 | 2; selected?: boolean }) {
  if (variant === 1) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#fff7ef]">
        <div className="absolute right-0 top-0 h-full w-[54%] overflow-hidden rounded-l-[44px]">
          <img src={photoA} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute left-3.5 top-3.5 text-[6.5px] font-black uppercase tracking-[.15em] text-fuchsia-600">NORTH & PINE</div>
        <div className="absolute bottom-3.5 left-3.5 w-[46%]">
          <div className="text-[19px] font-black leading-[.88] tracking-[-.055em] text-slate-900">MAKE<br />TIME<br />FOR YOU</div>
          <div className="mt-2.5 inline-flex rounded-full bg-fuchsia-600 px-2 py-1 text-[6px] font-black uppercase text-white">3 left Friday</div>
        </div>
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#12372f]">
        <img src={photoC} alt="" className="absolute inset-x-0 top-0 h-[57%] w-full object-cover opacity-90" />
        <div className="absolute inset-x-0 top-[38%] h-[30%] bg-gradient-to-b from-transparent to-[#12372f]" />
        <div className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2 py-1 text-[6px] font-black uppercase tracking-[.12em] text-emerald-900">LAST CALL</div>
        <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
          <div className="text-[21px] font-black leading-[.88] tracking-[-.055em]">BOOK<br />BEFORE 5</div>
          <div className="mt-2 text-[7px] font-semibold text-white/65">Three appointments remaining.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-slate-950">
      <img src={photoB} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/85 via-indigo-500/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-white/10" />
      <div className="absolute left-3.5 top-3.5 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[6.5px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">North & Pine</div>
      {selected ? (
        <motion.span
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg"
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
        <div className="text-[7px] font-black uppercase tracking-[.18em] text-white/65">FRIDAY FEELS</div>
        <div className="mt-1 text-[23px] font-black leading-[.86] tracking-[-.065em]">3 SPOTS<br />LEFT</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white px-2 py-1 text-[6.5px] font-black uppercase tracking-[.08em] text-slate-950">Book now</span>
          <span className="text-[6px] font-bold text-white/65">Fri 21 Aug</span>
        </div>
      </div>
    </div>
  );
}

function CreativeFrame({ variant, selected = false }: { variant: 0 | 1 | 2; selected?: boolean }) {
  return (
    <div className={cn(
      "h-[220px] w-[176px] rounded-[20px] bg-white p-[3px] shadow-[0_26px_58px_-30px_rgba(15,23,42,.52)]",
      selected && "ring-4 ring-blue-500/15",
    )}>
      <Artwork variant={variant} selected={selected} />
    </div>
  );
}

function PublishingRail({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase === 5;

  return (
    <motion.div
      className="absolute left-[56%] top-1/2 z-[76] w-[min(315px,38%)] -translate-y-1/2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 14 }}
      transition={{ duration: reduced ? 0 : 0.42, delay: visible && !reduced ? 0.28 : 0, ease: [0.2, 0.82, 0.24, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <div className="text-[11px] font-black tracking-tight text-slate-900">Publishing to 6 channels</div>
      </div>
      <div className="mt-1 text-[7.5px] font-semibold text-slate-400">Same post, formatted for every channel</div>

      <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2.5">
        {CHANNELS.map(({ key, label, Mark }, index) => (
          <motion.div
            key={key}
            className="flex min-w-0 items-center gap-2 rounded-[9px] bg-slate-50/80 px-2 py-1.5"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
            transition={{ duration: reduced ? 0 : 0.25, delay: visible && !reduced ? 0.42 + index * 0.09 : 0 }}
          >
            <Mark size={18} />
            <span className="min-w-0 flex-1 truncate text-[7px] font-black text-slate-700">{label}</span>
            <Check className="h-3 w-3 shrink-0 text-emerald-500" strokeWidth={3} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ScheduleDock({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase === 5;

  return (
    <motion.div
      className="absolute bottom-[8%] left-[56%] z-[78] flex items-center gap-2"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: reduced ? 0 : 0.38, delay: visible && !reduced ? 1.18 : 0 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="flex items-center gap-2 rounded-[11px] bg-slate-50 px-2.5 py-2">
        <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
        <div>
          <div className="text-[8px] font-black text-slate-800">Fri 21 Aug</div>
          <div className="text-[7px] font-semibold text-slate-400">9:00 AM · Sydney</div>
        </div>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-zapla-ink px-3.5 py-2.5 text-[9px] font-black text-white shadow-sm">
        <Send className="h-3 w-3" /> Schedule post
      </span>
    </motion.div>
  );
}

function CreativeStory({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 3 || phase > 6) return null;

  const selecting = phase === 4;
  const publishing = phase === 5;
  const flying = phase === 6;

  const centerPosition = flying
    ? { left: "64.2%", top: "24%", scale: 0.34, rotate: -4, opacity: 0.98 }
    : publishing
      ? { left: "34%", top: "44%", scale: 1.03, rotate: 0, opacity: 1 }
      : selecting
        ? { left: "42%", top: "45%", scale: 1.08, rotate: 0, opacity: 1 }
        : { left: "50%", top: "47%", scale: 1, rotate: 0, opacity: 1 };

  return (
    <motion.div className="absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white"
        initial={false}
        animate={{ opacity: flying ? 0 : 0.93 }}
        transition={{ duration: reduced ? 0 : flying ? 0.62 : 0.3 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,1),rgba(255,255,255,.88)_40%,rgba(255,255,255,.36)_76%,transparent_100%)]"
        initial={false}
        animate={{ opacity: flying ? 0 : 1 }}
        transition={{ duration: reduced ? 0 : 0.62 }}
      />

      <AnimatePresence>
        {phase === 3 ? (
          <motion.div
            className="absolute left-1/2 top-[11%] z-[74] -translate-x-1/2 rounded-full bg-violet-50 px-3 py-1.5 text-[8px] font-black text-violet-700"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: reduced ? 0 : 0.5, duration: 0.32 }}
          >
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> 3 concepts ready</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className="absolute left-1/2 top-[47%] z-[72] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, x: -105, y: 14, scale: 0.82, rotate: -3 }}
        animate={{
          opacity: phase === 3 ? 1 : 0,
          x: phase === 3 ? -188 : -232,
          y: phase === 3 ? 14 : 24,
          scale: phase === 3 ? 0.94 : 0.86,
          rotate: -7,
        }}
        transition={{ type: "spring", stiffness: 190, damping: 24, delay: phase === 3 && !reduced ? 0.36 : 0 }}
      >
        <CreativeFrame variant={1} />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[47%] z-[72] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, x: 105, y: 14, scale: 0.82, rotate: 3 }}
        animate={{
          opacity: phase === 3 ? 1 : 0,
          x: phase === 3 ? 188 : 232,
          y: phase === 3 ? 14 : 24,
          scale: phase === 3 ? 0.94 : 0.86,
          rotate: 7,
        }}
        transition={{ type: "spring", stiffness: 190, damping: 24, delay: phase === 3 && !reduced ? 0.5 : 0 }}
      >
        <CreativeFrame variant={2} />
      </motion.div>

      <motion.div
        className="absolute z-[75] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, left: "50%", top: "51%", scale: 0.82 }}
        animate={centerPosition}
        transition={
          flying
            ? { duration: reduced ? 0 : 1.45, delay: reduced ? 0 : 0.42, ease: [0.18, 0.78, 0.2, 1] }
            : { type: "spring", stiffness: 185, damping: 25, delay: phase === 3 && !reduced ? 0.62 : 0 }
        }
      >
        <CreativeFrame variant={0} selected={phase >= 4} />
      </motion.div>

      <PublishingRail phase={phase} reduced={reduced} />
      <ScheduleDock phase={phase} reduced={reduced} />

      {flying ? (
        <motion.div
          className="absolute left-[57.4%] top-[10%] z-[71] h-[31%] w-[14%] rounded-[10px] border-2 border-blue-300/0"
          initial={reduced ? false : { boxShadow: "0 0 0 0 rgba(37,99,255,0)" }}
          animate={reduced ? undefined : { boxShadow: ["0 0 0 0 rgba(37,99,255,0)", "0 0 0 5px rgba(37,99,255,.14)", "0 0 0 0 rgba(37,99,255,0)"] }}
          transition={{ duration: 0.85, delay: 1.2 }}
        />
      ) : null}
    </motion.div>
  );
}

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;
  const basePhase = phase >= 3 && phase <= 5 ? 2 : phase === 6 ? 1 : phase;

  const points: Record<number, CursorPoint> = {
    1: { left: "92%", top: "5%" },
    4: { left: "42%", top: "45%" },
    5: { left: "72%", top: "86%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ContentPlannerScene {...props} phase={basePhase} />
      <ViewModePatch />
      <ComposerOverlay phase={phase} reduced={reduced} />
      <CreativeStory phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
