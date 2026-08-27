import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Fires a step counter once, when the section scrolls into view.
 * Reduced motion jumps straight to the final step.
 */
export function useLeakSteps(totalSteps: number, intervalMs = 100) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(totalSteps);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= totalSteps; i++) {
      timers.push(setTimeout(() => setStep(i), i * intervalMs));
    }
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced, totalSteps, intervalMs]);

  return { ref, step, inView, reduced: !!reduced };
}
