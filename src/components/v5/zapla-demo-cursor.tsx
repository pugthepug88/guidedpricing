import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "./motion-kit";

export type CursorPoint =
  | { x: number; y: number }
  | { left: string; top: string }
  | null;

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

  const percentPoint = point && "left" in point;
  const initialPosition = percentPoint
    ? { left: point.left, top: point.top }
    : point
      ? { x: point.x, y: point.y }
      : {};

  return (
    <AnimatePresence>
      {point ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-[70]"
          initial={{ opacity: 0, scale: 0.8, ...initialPosition }}
          animate={{ opacity: 1, scale: 1, ...initialPosition }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            opacity: { duration: 0.22, ease: EASE_OUT },
            scale: { duration: 0.28, ease: EASE_OUT },
            x: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            y: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            left: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            top: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
          }}
        >
          <AnimatePresence>
            {press ? (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 rounded-full border-2 border-blue-500/55"
                initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
                animate={{ width: 42, height: 42, x: -21, y: -21, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            ) : null}
          </AnimatePresence>

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
