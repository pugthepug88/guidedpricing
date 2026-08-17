import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "./motion-kit";

export type CursorPoint = { x: number; y: number } | null;

export function ZaplaDemoCursor({
  point,
  press = false,
  reduced,
}: {
  point: CursorPoint;
  press?: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;

  return (
    <AnimatePresence>
      {point ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-[70]"
          initial={{ opacity: 0, scale: 0.8, x: point.x, y: point.y }}
          animate={{ opacity: 1, scale: 1, x: point.x, y: point.y }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            opacity: { duration: 0.22, ease: EASE_OUT },
            scale: { duration: 0.28, ease: EASE_OUT },
            x: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            y: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
          }}
        >
          <motion.svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            animate={{ scale: press ? 0.84 : 1, rotate: press ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{
              originX: 0.2,
              originY: 0.1,
              filter:
                "drop-shadow(0 3px 5px rgba(15,23,42,0.32)) drop-shadow(0 0 6px rgba(37,99,255,0.35))",
            }}
          >
            <path
              d="M5 2.2 L5 19.6 L9.5 15.1 L12.3 21.8 L15.4 20.5 L12.5 13.9 L18.8 13.9 Z"
              fill="rgba(37,99,255,0.9)"
              transform="translate(1.4,1.2)"
            />
            <path
              d="M5 2.2 L5 19.6 L9.5 15.1 L12.3 21.8 L15.4 20.5 L12.5 13.9 L18.8 13.9 Z"
              fill="#0f172a"
              stroke="#ffffff"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
