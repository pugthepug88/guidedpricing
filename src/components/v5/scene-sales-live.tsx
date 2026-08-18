import { AnimatePresence, motion } from "motion/react";
import { SceneOpportunities } from "./scene-opportunities";
import { type SceneProps } from "./motion-kit";

export function SceneSalesLive(props: SceneProps) {
  const { phase, reduced } = props;
  const wonTotal = phase >= 10 ? 19300 : 6800;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <SceneOpportunities {...props} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={wonTotal}
          className="pointer-events-none absolute right-[2.1%] top-[43px] z-20 rounded-full border border-emerald-200 bg-white/95 px-2.5 py-1 text-[8.5px] font-black text-emerald-700 shadow-[0_8px_20px_-14px_rgba(16,185,129,.45)] backdrop-blur-sm"
          initial={reduced ? false : { opacity: 0, y: -4, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: reduced ? 0 : 0.28 }}
        >
          Won total · ${wonTotal.toLocaleString("en-AU")}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
