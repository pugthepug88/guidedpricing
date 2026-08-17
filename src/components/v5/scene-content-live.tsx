import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, MoreHorizontal, Send, Sparkles } from "lucide-react";
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

function AssetPreload() {
  useEffect(() => {
    [photoA, photoB, photoC].forEach((src) => {
      const image = new Image();
      image.src = src;
      image.decode?.().catch(() => undefined);
    });
  }, []);

  return null;
}

function ViewModeControl() {
  return (
    <div className="absolute left-[150px] top-[4px] z-[96] hidden h-[38px] w-[250px] items-center bg-white pl-4 sm:flex">
      <div className="flex rounded-[9px] border border-slate-200 bg-slate-50 p-[2px]">
        <span className="rounded-[7px] bg-white px-2.5 py-1 text-[8px] font-black text-slate-700 shadow-sm">Calendar</span>
        <span className="rounded-[7px] px-2.5 py-1 text-[8px] font-bold text-slate-400">List</span>
      </div>
    </div>
  );
}

function ComposerPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 2 ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.22 }}
        >
          <div className="absolute inset-0 bg-white/52 backdrop-blur-[1px]" />

          <motion.div
            className="absolute inset-y-0 right-0 flex w-[min(430px,88%)] flex-col border-l border-slate-200 bg-white shadow-[-24px_0_60px_-38px_rgba(15,23,42,.42)]"
            initial={reduced ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
          >
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
              <div>
                <div className="text-[12px] font-black tracking-tight text-slate-900">New Social Post</div>
                <div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">Create once, publish everywhere</div>
              </div>
              <span className="ml-auto flex h-7 w-7 items-center justify-center text-slate-300">
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
                        initial={reduced ? false : { opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduced ? 0 : 0.06 + index * 0.045, duration: 0.18 }}
                      >
                        <Mark size={20} />
                      </motion.span>
                    ))}
                    <span className="ml-1 text-[8px] font-black text-slate-500">6 channels</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Headline / hook</div>
                <motion.div
                  className="mt-1.5 rounded-[11px] border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-[10.5px] font-black text-slate-800"
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.18, duration: 0.22 }}
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
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.3, duration: 0.24 }}
                >
                  A few Friday appointments just opened up. Book your spot before they're gone.
                  <div className="mt-2 text-[8.5px] font-bold text-blue-600">Book now →</div>
                </motion.div>
              </div>

              <motion.div
                className="mt-4 flex items-center gap-2 rounded-[13px] border border-violet-100 bg-violet-50/55 p-2.5"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.44, duration: 0.24 }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[8.5px] font-black text-slate-800">Generate creative concepts</div>
                  <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Create 3 visual options</div>
                </div>
              </motion.div>
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
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
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
    <div className={`h-[220px] w-[176px] rounded-[20px] bg-white p-[3px] shadow-[0_26px_58px_-30px_rgba(15,23,42,.52)] ${selected ? "ring-4 ring-blue-500/15" : ""}`}>
      <Artwork variant={variant} selected={selected} />
    </div>
  );
}

function EmptyFridayTarget({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[48px] z-[63] overflow-hidden">
      <div className="absolute left-[58.05%] top-[6.2%] h-[29.2%] w-[12.45%] overflow-hidden rounded-[9px] border border-blue-200 bg-white p-1.5">
        <div className="flex items-center gap-1">
          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-zapla-ink px-1 text-[7.5px] font-black text-white">21</span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
        </div>
        <motion.div
          className="mt-2 h-[52px] rounded-[7px] border border-dashed border-blue-200 bg-blue-50/35"
          animate={{ opacity: active ? 1 : 0.45, scale: active ? 1 : 0.99 }}
          transition={{ duration: reduced ? 0 : 0.22 }}
        >
          <span className="block px-1.5 pt-1 text-[6px] font-black text-blue-500">9:00 open</span>
        </motion.div>
      </div>
    </div>
  );
}

function PublishPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase !== 5) return null;

  return (
    <motion.div
      className="absolute left-[56%] top-[44%] z-[76] w-[300px] max-w-[38%] -translate-y-1/2"
      initial={reduced ? false : { opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.28 }}
    >
      <div className="text-[10.5px] font-black text-slate-900">Publishing to 6 channels</div>
      <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2">
        {CHANNELS.map(({ key, label, Mark }, index) => (
          <motion.div
            key={key}
            className="flex items-center gap-2"
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.08 + index * 0.05, duration: 0.18 }}
          >
            <Mark size={17} />
            <span className="text-[7px] font-black text-slate-700">{label}</span>
            <Check className="ml-auto h-3 w-3 text-emerald-500" strokeWidth={3} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 inline-flex items-center gap-2 rounded-[11px] bg-zapla-ink px-3.5 py-2.5 text-[8.5px] font-black text-white"
        initial={reduced ? false : { opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduced ? 0 : 0.5, duration: 0.2 }}
      >
        <CalendarDays className="h-3 w-3" /> Fri 21 Aug · 9:00 AM
        <Send className="ml-1 h-3 w-3" /> Schedule
      </motion.div>
    </motion.div>
  );
}

function CreativeStory({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 3 || phase > 6) return null;

  const concepts = phase === 3;
  const selected = phase === 4;
  const publishing = phase === 5;
  const flying = phase === 6;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: flying ? 0 : 0.9 }}
        transition={{ duration: reduced ? 0 : 0.28 }}
      />

      <motion.div
        className="absolute left-1/2 top-[47%] z-[72] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, x: -120, scale: 0.9, rotate: -4 }}
        animate={{ opacity: concepts ? 1 : 0, x: concepts ? -185 : -230, scale: concepts ? 0.94 : 0.84, rotate: -7 }}
        transition={{ type: "spring", stiffness: 230, damping: 25, delay: concepts && !reduced ? 0.05 : 0 }}
      >
        <CreativeFrame variant={1} />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-[47%] z-[72] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, x: 120, scale: 0.9, rotate: 4 }}
        animate={{ opacity: concepts ? 1 : 0, x: concepts ? 185 : 230, scale: concepts ? 0.94 : 0.84, rotate: 7 }}
        transition={{ type: "spring", stiffness: 230, damping: 25, delay: concepts && !reduced ? 0.1 : 0 }}
      >
        <CreativeFrame variant={2} />
      </motion.div>

      <motion.div
        className="absolute z-[75] -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? false : { opacity: 0, left: "50%", top: "50%", scale: 0.9 }}
        animate={
          flying
            ? { left: "64.15%", top: "23.5%", scale: 0.46, rotate: 0, opacity: 1 }
            : publishing
              ? { left: "35%", top: "44%", scale: 1.02, rotate: 0, opacity: 1 }
              : selected
                ? { left: "50%", top: "46%", scale: 1.06, rotate: 0, opacity: 1 }
                : { left: "50%", top: "47%", scale: 1, rotate: 0, opacity: 1 }
        }
        transition={
          flying
            ? { duration: reduced ? 0 : 1.05, ease: [0.18, 0.78, 0.2, 1] }
            : { type: "spring", stiffness: 210, damping: 25, delay: concepts && !reduced ? 0.14 : 0 }
        }
      >
        <motion.div
          animate={
            flying && !reduced
              ? { boxShadow: ["0 0 0 0 rgba(37,99,255,0)", "0 0 0 0 rgba(37,99,255,0)", "0 0 0 6px rgba(37,99,255,.18)", "0 0 0 0 rgba(16,185,129,0)"] }
              : undefined
          }
          transition={flying && !reduced ? { duration: 1.65, times: [0, 0.62, 0.82, 1] } : undefined}
          className="rounded-[20px]"
        >
          <CreativeFrame variant={0} selected={phase >= 4} />
        </motion.div>

        {flying ? (
          <motion.span
            className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-2 py-1 text-[6px] font-black text-white shadow-sm"
            initial={reduced ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 1.05, duration: reduced ? 0 : 0.2 }}
          >
            Scheduled
          </motion.span>
        ) : null}
      </motion.div>

      <PublishPanel phase={phase} reduced={reduced} />
    </div>
  );
}

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;
  const basePhase = 0;

  const points: Record<number, CursorPoint> = {
    1: { left: "92%", top: "5%" },
    4: { left: "50%", top: "46%" },
    5: { left: "77%", top: "75%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AssetPreload />
      <ContentPlannerScene {...props} phase={basePhase} />
      <EmptyFridayTarget active={phase === 6} reduced={reduced} />
      <ViewModeControl />
      <ComposerPanel phase={phase} reduced={reduced} />
      <CreativeStory phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
