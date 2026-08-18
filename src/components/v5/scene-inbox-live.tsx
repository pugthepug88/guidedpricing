import { motion } from "motion/react";
import { Plus, Send, Smile, Sparkles } from "lucide-react";
import { SceneInbox } from "./scene-inbox";
import { type SceneProps } from "./motion-kit";

export function SceneInboxLive(props: SceneProps) {
  const { phase, reduced } = props;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <SceneInbox {...props} />

      {phase !== 4 ? (
        <motion.div
          className="pointer-events-none absolute bottom-[10px] left-[43%] right-[2.5%] z-[34] lg:right-[17%]"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.08 }}
        >
          <div className="rounded-[17px] border border-slate-200 bg-white/96 p-1.5 shadow-[0_16px_34px_-20px_rgba(15,23,42,.38)] backdrop-blur-sm">
            <div className="flex h-[42px] items-center gap-2 rounded-[13px] bg-slate-50 px-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400">
                <Plus className="h-3.5 w-3.5" />
              </span>

              <div className="min-w-0 flex-1 text-[10px] font-semibold text-slate-400">
                Type a message…
              </div>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-violet-500">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400">
                <Smile className="h-3.5 w-3.5" />
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-zapla-blue text-white shadow-[0_8px_18px_-8px_rgba(37,99,255,.7)]">
                <Send className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}
