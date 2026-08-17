import { AnimatePresence, motion } from "motion/react";
import { Check, MoreHorizontal, Sparkles } from "lucide-react";
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

const COMPOSER_CHANNELS = [
  { key: "instagram", Mark: InstagramMark },
  { key: "facebook", Mark: FacebookMark },
  { key: "tiktok", Mark: TikTokMark },
  { key: "linkedin", Mark: LinkedInMark },
  { key: "pinterest", Mark: PinterestMark },
  { key: "threads", Mark: ThreadsMark },
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
          transition={{ duration: reduced ? 0 : 0.24 }}
        >
          <div className="absolute inset-0 bg-white/82 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(255,255,255,1),rgba(255,255,255,.9)_34%,rgba(255,255,255,.66)_62%,rgba(255,255,255,.42)_100%)]" />

          <motion.div
            className="absolute bottom-[6%] right-[4%] top-[6%] flex w-[min(400px,90%)] flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_34px_90px_-36px_rgba(15,23,42,.58)]"
            initial={reduced ? false : { opacity: 0, x: 72, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 42, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 235, damping: 24 }}
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
                  <div className="mt-1.5 flex items-center">
                    {COMPOSER_CHANNELS.map(({ key, Mark }, index) => (
                      <motion.span
                        key={key}
                        className={`rounded-[7px] border border-slate-100 bg-white p-[2px] shadow-sm ${index > 0 ? "-ml-1" : ""}`}
                        initial={reduced ? false : { opacity: 0, x: 8, scale: 0.85 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: reduced ? 0 : 0.08 + index * 0.045 }}
                        style={{ zIndex: COMPOSER_CHANNELS.length - index }}
                      >
                        <Mark size={22} />
                      </motion.span>
                    ))}
                    <span className="ml-2 text-[8px] font-black text-slate-500">6 channels</span>
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
                  transition={{ delay: reduced ? 0 : 0.16 }}
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
                  transition={{ delay: reduced ? 0 : 0.22 }}
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
                transition={{ delay: reduced ? 0 : 0.3 }}
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

export function SceneContentLive(props: SceneProps) {
  const { phase, reduced } = props;

  const points: Record<number, CursorPoint> = {
    1: { left: "92%", top: "5%" },
    4: { left: "51%", top: "44%" },
    5: { left: "57%", top: "86%" },
  };

  const point = points[phase] ?? null;
  const press = phase === 1 || phase === 4 || phase === 5;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <ContentPlannerScene {...props} />
      <ComposerOverlay phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}
