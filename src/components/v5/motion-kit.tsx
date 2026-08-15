/* v5 marketing-motion primitives.
   These are deliberately NOT product components: they exist to build
   oversized foreground compositions on top of quiet product scenery. */
import { motion, AnimatePresence, type Transition } from "motion/react";
import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IO = [0.65, 0, 0.35, 1] as const;

export const T = (duration: number, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

/** Scenes are driven by a real elapsed-time clock, not a global step counter. */
export type SceneProps = { phase: number; elapsedMs: number; reduced: boolean };

/* ---------------------------------------------------------------- */
/* Scene frame: background scenery + foreground marketing layer      */
/* ---------------------------------------------------------------- */

export function Scene({
  background,
  foreground,
  recede = 0,
  reduced,
}: {
  background: ReactNode;
  /** 0 = product UI fully present, 1 = fully receded scenery */
  recede?: number;
  foreground?: ReactNode;
  reduced: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          opacity: 1 - recede * 0.62,
          filter: `blur(${(reduced ? 0 : recede * 2.4).toFixed(2)}px)`,
          scale: 1 - recede * 0.02,
        }}
        transition={{ duration: reduced ? 0 : 0.7, ease: EASE_OUT }}
      >
        {background}
      </motion.div>
      {/* foreground layer is allowed to overlap and crop the product UI */}
      <div className="pointer-events-none absolute inset-0 z-30">{foreground}</div>
    </div>
  );
}

/* An oversized foreground object with real depth */
export function Hero({
  children,
  className,
  style,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      {...rest}
      style={style}
      className={cn(
        "rounded-[18px] border border-white/70 bg-white shadow-[0_36px_90px_-32px_rgba(15,23,42,0.45),0_8px_24px_-12px_rgba(15,23,42,0.25)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* Faint scenery row used to rebuild product tables cheaply */
export function GhostRow({
  w = "70%",
  h = 8,
  className,
}: {
  w?: string;
  h?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: w, height: h }}
      className={cn("rounded-full bg-slate-200/70", className)}
    />
  );
}

export function Avatar({
  src,
  size = 32,
  className,
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      style={{ width: size, height: size }}
      className={cn("shrink-0 rounded-full object-cover ring-2 ring-white", className)}
    />
  );
}

/* Big payoff composition — one clear result, held on screen */
export function Payoff({
  show,
  children,
  className,
  style,
  reduced,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  reduced: boolean;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
          style={style}
          className={cn(
            "absolute rounded-[20px] border border-white/70 bg-white/95 px-5 py-4 shadow-[0_40px_110px_-30px_rgba(15,23,42,0.5)] backdrop-blur-[2px]",
            className,
          )}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* Small foreground signal that peels away from a hero object */
export function Signal({
  show,
  children,
  delay = 0,
  from = { x: 0, y: 0 },
  to = { x: 0, y: 0 },
  rotate = 0,
  className,
  reduced,
}: {
  show: boolean;
  children: ReactNode;
  delay?: number;
  from?: { x: number; y: number };
  to?: { x: number; y: number };
  rotate?: number;
  className?: string;
  reduced: boolean;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.7, ...from }}
          animate={{ opacity: 1, scale: 1, rotate, ...to }}
          exit={{ opacity: 0, scale: 0.8, ...from }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE_OUT }}
          className={cn(
            "absolute inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-slate-700 shadow-[0_14px_30px_-14px_rgba(15,23,42,0.4)]",
            className,
          )}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* Soft accent glow behind hero objects */
export function Glow({
  show,
  className,
  tone = "blue",
}: {
  show: boolean;
  className?: string;
  tone?: "blue" | "green" | "violet";
}) {
  const tones = {
    blue: "rgba(37,99,255,0.22)",
    green: "rgba(16,185,129,0.22)",
    violet: "rgba(139,92,246,0.2)",
  } as const;
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className={cn("absolute rounded-full blur-3xl", className)}
          style={{ background: tones[tone] }}
        />
      ) : null}
    </AnimatePresence>
  );
}

export function Tag({
  children,
  tone = "slate",
  className,
}: {
  children: ReactNode;
  tone?: "slate" | "blue" | "green" | "amber" | "violet" | "rose";
  className?: string;
}) {
  const tones: Record<string, string> = {
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
    rose: "bg-rose-50 text-rose-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10.5px] font-semibold leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
