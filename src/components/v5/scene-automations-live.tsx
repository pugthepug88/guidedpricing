import { AnimatePresence, motion } from "motion/react";
import { FACE } from "./faces";
import { SceneAutomations as AutomationsScene } from "./scene-automations";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

function TeamAvatarCluster({ show, reduced }: { show: boolean; reduced: boolean }) {
  const team = [FACE.maya, FACE.daniel, FACE.priya];

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute left-[84.2%] top-[92.1%] z-[46] flex -translate-y-1/2 items-center"
          initial={reduced ? false : { opacity: 0, x: 8, scale: 0.86 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 5, scale: 0.9 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          {team.map((face, index) => (
            <motion.img
              key={face}
              src={face}
              alt=""
              aria-hidden
              className={`h-[18px] w-[18px] rounded-full border-2 border-white object-cover shadow-sm ${index > 0 ? "-ml-[5px]" : ""}`}
              initial={reduced ? false : { opacity: 0, scale: 0.65, x: 4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                delay: reduced ? 0 : index * 0.07,
                type: "spring",
                stiffness: 340,
                damping: 19,
              }}
            />
          ))}
          <motion.span
            className="-ml-[5px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-slate-100 px-[3px] text-[6.5px] font-black text-slate-500 shadow-sm"
            initial={reduced ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.22, duration: reduced ? 0 : 0.2 }}
          >
            +2
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneAutomationsLive(props: SceneProps) {
  const { phase, reduced } = props;

  const points: Record<number, CursorPoint> = {
    1: { left: "50%", top: "16%" },
    2: { left: "50%", top: "29%" },
    3: { left: "50%", top: "40%" },
    4: { left: "50%", top: "52%" },
    5: { left: "24%", top: "69%" },
    6: { left: "24%", top: "80%" },
    7: { left: "24%", top: "90%" },
    8: { left: "59%", top: "89%" },
    9: { left: "83%", top: "89%" },
  };

  return (
    <div className="automation-shared-cursor absolute inset-0 overflow-hidden">
      <style>{`.automation-shared-cursor span.pointer-events-none.absolute.left-0.top-0.z-30.h-\\[9px\\].w-\\[9px\\] { display: none !important; }`}</style>
      <AutomationsScene {...props} />
      <TeamAvatarCluster show={phase >= 9} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase >= 1 && phase <= 9} reduced={reduced} />
    </div>
  );
}
