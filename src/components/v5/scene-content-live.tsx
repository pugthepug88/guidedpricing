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
import photoB from "@/assets/customer-04-bloom.jpg";

const COMPOSER_CHANNELS = [
  { key: "instagram", label: "Instagram", Mark: InstagramMark },
  { key: "facebook", label: "Facebook", Mark: FacebookMark },
  { key: "tiktok", label: "TikTok", Mark: TikTokMark },
  { key: "linkedin", label: "LinkedIn", Mark: LinkedInMark },
  { key: "pinterest", label: "Pinterest", Mark: PinterestMark },
  { key: "threads", label: "Threads", Mark: ThreadsMark },
] as const;

function ComposerOverlay({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 2 ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.34 }}
        >
          <div className="absolute inset-0 bg-white/84 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(255,255,255,1),rgba(255,255,255,.92)_34%,rgba(255,255,255,.72)_62%,rgba(255,255,255,.5)_100%)]" />

          <motion.div
            className="absolute bottom-[6%] right-[4%] top-[6%] flex w-[min(400px,90%)] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_34px_90px_-36px_rgba(15,23,42,.58)]"
            initial={reduced ? false : { opacity: 0, x: 58, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 32, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 185, damping: 26 }}
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
                    {COMPOSER_CHANNELS.map(({ key, Mark }, index) => (
                      <motion.span
                        key={key}
                        className="inline-flex items-center justify-center"
                        initial={reduced ? false : { opacity: 0, x: 7, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: reduced ? 0 : 0.12 + index * 0.06, duration: 0.22 }}
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
                  Customize per channel
                </div>
              </div>

              <div className="mt-3.5">
                <div className="text-[7.5px] font-black uppercase tracking-[.13em] text-slate-400">Headline / hook</div>
                <motion.div
                  className="mt-1.5 rounded-[11px] border border-slate-200 bg-slate-50/65 px-3 py-2.5 text-[10.5px] font-black text-slate-800"
                  initial={reduced ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.24, duration: 0.28 }}
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
                  className="mt-1.5 min-h-[92px] rounded-[12px] border border-slate-200 bg-white px-3 py-2.5 text-[9.5px] font-semibold leading-[1.55] text-slate-600 shadow-[inset_0_1px_2px_rgba(15,23,42,.025)]"
                  initial={reduced ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.34, duration: 0.3 }}
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
                initial={reduced ? false : { opacity: 0, y: 9 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.48, duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-600 text-white shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[8.5px] font-black text-slate-800">Generate creative concepts</div>
                    <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Use this post to create 3 visual options</div>
                  </div>
                  <span className="rounded-full bg-white px-2 py-1 text-[6.5px] font-black text-violet-600 shadow-sm">NEXT</span>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/45 px-4 py-2.5">
              <span className="inline-flex items-center gap-1 text-[7px] font-bold text-emerald-600">
                <Check className="h-3 w-3" strokeWidth={3} /> Draft ready
              </span>
              <span className="ml-auto text-[7px] font-semibold text-slate-400">Creative comes next</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SelectedCreative({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative h-[200px] w-[160px] shrink-0 overflow-hidden rounded-[20px] bg-slate-950 shadow-[0_30px_70px_-30px_rgba(15,23,42,.55)] sm:h-[238px] sm:w-[190px]"
      initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.36, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <img src={photoB} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-700/85 via-indigo-500/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-white/10" />
      <div className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[6.5px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">North & Pine</div>
      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-3.5 text-white sm:p-4">
        <div className="text-[7px] font-black uppercase tracking-[.18em] text-white/65">FRIDAY FEELS</div>
        <div className="mt-1 text-[22px] font-black leading-[.86] tracking-[-.065em] sm:text-[26px]">3 SPOTS<br />LEFT</div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white px-2.5 py-1 text-[6.5px] font-black uppercase tracking-[.08em] text-slate-950">Book now</span>
          <span className="text-[6.5px] font-bold text-white/65">Fri 21 Aug</span>
        </div>
      </div>
    </motion.div>
  );
}

function PublishingPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="w-[min(330px,92%)] rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_28px_70px_-34px_rgba(15,23,42,.38)]"
      initial={reduced ? false : { opacity: 0, y: 9 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : 0.14, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-900">Publishing to 6 channels</div>
          <div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">One creative, ready everywhere</div>
        </div>
        <span className="rounded-full bg-blue-50 px-2 py-1 text-[6.5px] font-black text-blue-600">READY</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
        {COMPOSER_CHANNELS.map(({ key, label, Mark }, index) => (
          <motion.div
            key={key}
            className="flex min-w-0 items-center gap-2"
            initial={reduced ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.24, delay: reduced ? 0 : 0.22 + index * 0.075 }}
          >
            <span className="shrink-0"><Mark size={20} /></span>
            <span className="min-w-0 flex-1 truncate text-[7.5px] font-black text-slate-700">{label}</span>
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-[7px] font-semibold text-slate-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Channel formatting checked
        <span className="ml-auto font-black text-slate-500">6 / 6 ready</span>
      </div>
    </motion.div>
  );
}

function DistributionOverlay({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase === 4 || phase === 5 ? (
        <motion.div
          className="absolute inset-x-0 bottom-0 top-[48px] z-[70] overflow-hidden bg-white"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.36 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(248,250,252,.4),rgba(255,255,255,1)_70%)]" />

          <div className="absolute inset-x-[5%] bottom-[18%] top-[8%] flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <SelectedCreative reduced={reduced} />
            <PublishingPanel reduced={reduced} />
          </div>

          <AnimatePresence>
            {phase === 5 ? (
              <motion.div
                className="absolute bottom-[6%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-[16px] border border-slate-200 bg-white px-3 py-2.5 shadow-[0_24px_60px_-26px_rgba(15,23,42,.42)]"
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
              >
                <div className="flex items-center gap-2 rounded-[11px] bg-slate-50 px-2.5 py-2">
                  <CalendarDays className="h-3.5 w-3.5 text-blue-600" />
                  <div>
                    <div className="text-[8px] font-black text-slate-800">Fri 21 Aug</div>
                    <div className="text-[7px] font-semibold text-slate-400">9:00 AM · Sydney</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-zapla-ink px-3.5 py-2.5 text-[9px] font-black text-white">
                  <Send className="h-3 w-3" /> Schedule post
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;
  const basePhase = phase === 4 || phase === 5 ? 2 : phase;

  const points: Record<number, CursorPoint> = {
    1: { left: "92%", top: "5%" },
    4: { left: "39%", top: "44%" },
    5: { left: "61%", top: "87%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ContentPlannerScene {...props} phase={basePhase} />
      <ComposerOverlay phase={phase} reduced={reduced} />
      <DistributionOverlay phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
