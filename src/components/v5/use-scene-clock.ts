import { useCallback, useEffect, useRef, useState } from "react";

/**
 * v5-only scene clock.
 *
 * Drives a scene from a real elapsed-time value rather than a global
 * equal-duration step metronome. Each scene supplies its own list of phase
 * durations (ms), so total scene length and individual beat lengths differ per
 * scene. Pausing freezes the accumulated time instead of resetting it, and
 * reduced motion resolves immediately to the payoff phase.
 */
export function useSceneClock({
  durations,
  paused,
  reduced,
  onComplete,
  restartKey = 0,
}: {
  durations: number[];
  paused: boolean;
  reduced: boolean;
  onComplete?: () => void;
  /** any change forces a true reset to elapsed 0 / phase 0 */
  restartKey?: number | string;
}) {
  const total = durations.reduce((a, b) => a + b, 0);
  const payoffPhase = Math.max(durations.length - 2, 0);

  const [elapsedMs, setElapsedMs] = useState(0);
  const accumulated = useRef(0);
  const startedAt = useRef<number | null>(null);
  const frame = useRef<number | null>(null);
  const completed = useRef(false);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  const reset = useCallback(() => {
    accumulated.current = 0;
    startedAt.current = frame.current != null ? performance.now() : null;
    completed.current = false;
    setElapsedMs(0);
  }, []);

  /* single running-loop effect: restartKey is part of its lifecycle, so any
     restart tears down the previous RAF loop and starts a fresh baseline */
  useEffect(() => {
    accumulated.current = 0;
    completed.current = false;
    startedAt.current = null;
    setElapsedMs(0);
    if (frame.current != null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }

    if (reduced) return;
    if (paused) return;

    startedAt.current = performance.now();
    const tick = () => {
      const base = accumulated.current;
      const live = startedAt.current == null ? 0 : performance.now() - startedAt.current;
      const next = base + live;
      setElapsedMs(next);
      if (next >= total) {
        frame.current = null;
        if (!completed.current) {
          completed.current = true;
          completeRef.current?.();
        }
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      startedAt.current = null;
      if (frame.current != null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [restartKey, durations, total, reduced]);

  /* pause/resume without losing accumulated time */
  useEffect(() => {
    if (reduced) return;
    if (paused) {
      if (startedAt.current != null) {
        accumulated.current += performance.now() - startedAt.current;
        startedAt.current = null;
      }
      if (frame.current != null) cancelAnimationFrame(frame.current);
      frame.current = null;
      return;
    }
    if (completed.current) return;

    startedAt.current = performance.now();
    const tick = () => {
      const base = accumulated.current;
      const live = startedAt.current == null ? 0 : performance.now() - startedAt.current;
      const next = base + live;
      setElapsedMs(next);
      if (next >= total) {
        frame.current = null;
        if (!completed.current) {
          completed.current = true;
          completeRef.current?.();
        }
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);

    return () => {
      if (startedAt.current != null) {
        accumulated.current += performance.now() - startedAt.current;
        startedAt.current = null;
      }
      if (frame.current != null) cancelAnimationFrame(frame.current);
      frame.current = null;
    };
  }, [paused, reduced, total]);


  /* derive the current beat from real elapsed time */
  let phase = 0;
  if (reduced) {
    phase = payoffPhase;
  } else {
    let acc = 0;
    for (let i = 0; i < durations.length; i += 1) {
      acc += durations[i];
      if (elapsedMs < acc) {
        phase = i;
        break;
      }
      phase = i;
    }
  }

  return {
    phase,
    elapsedMs: reduced ? total : elapsedMs,
    progress: total > 0 ? Math.min(1, (reduced ? total : elapsedMs) / total) : 0,
    reset,
  };
}
