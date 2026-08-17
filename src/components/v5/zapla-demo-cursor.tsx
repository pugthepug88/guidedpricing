import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "./motion-kit";

export type CursorPoint =
  | { x: number; y: number }
  | { left: string; top: string }
  | null;

const POINTER_PATH =
  "M4.4 3.3 C4.4 2.0 5.9 1.3 6.9 2.1 L18.9 11.7 C20.0 12.6 19.4 14.3 18.0 14.3 L12.7 14.3 C12.2 14.3 11.7 14.6 11.5 15.1 L9.3 20.4 C8.7 21.7 6.8 21.4 6.6 20.0 Z";

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
  const position = percentPoint
    ? { left: point.left, top: point.top }
    : point
      ? { x: point.x, y: point.y }
      : {};

  return (
    <AnimatePresence>
      {point ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-[70]"
          initial={{ opacity: 0, scale: 0.82, ...position }}
          animate={{ opacity: 1, scale: 1, ...position }}
          exit={{ opacity: 0, scale: 0.86 }}
          transition={{
            opacity: { duration: 0.22, ease: EASE_OUT },
            scale: { duration: 0.28, ease: EASE_OUT },
            x: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            y: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            left: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            top: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
          }}
        >
          <span
            className="pointer-events-none absolute left-0 top-0 h-9 w-9 -translate-x-1/3 -translate-y-1/3 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,255,0.28), rgba(37,99,255,0) 68%)",
            }}
          />

          <AnimatePresence>
            {press ? (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 rounded-full border-2"
                style={{ borderColor: "rgba(37,99,255,0.55)" }}
                initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
                animate={{ width: 42, height: 42, x: -21, y: -21, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            ) : null}
          </AnimatePresence>

          <motion.svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            animate={{ scale: press ? 0.86 : 1, rotate: press ? -7 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{
              originX: 0.2,
              originY: 0.1,
              filter:
                "drop-shadow(0 1px 1.5px rgba(15,23,42,0.45)) drop-shadow(0 6px 12px rgba(15,23,42,0.28))",
            }}
          >
            <defs>
              <linearGradient id="zaplaSharedPointerFill" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#3b82ff" />
                <stop offset="55%" stopColor="#2563ff" />
                <stop offset="100%" stopColor="#7c5cf6" />
              </linearGradient>
            </defs>
            <path
              d={POINTER_PATH}
              fill="url(#zaplaSharedPointerFill)"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M6.2 4.1 L15.2 11.3"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
