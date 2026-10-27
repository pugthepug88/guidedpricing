import { useEffect, useRef, useState } from "react";

// Local marketing playback only. Complete content is the server/static default.
// Phone and short windows keep that result in normal reading order.
export function useScenePlayback(duration: number) {
  const ref = useRef<HTMLDivElement>(null);
  const clock = useRef(duration);
  const [elapsed, setElapsed] = useState(duration);
  const [staticView, setStaticView] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 760px), (max-height: 650px)",
    );
    const apply = () => {
      setStaticView(preference.matches);
      clock.current = preference.matches ? duration : 0;
      setElapsed(clock.current);
      setStarted(false);
      setPaused(false);
    };
    const visibility = () => setHidden(document.hidden);
    apply();
    visibility();
    preference.addEventListener("change", apply);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      preference.removeEventListener("change", apply);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [duration]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.85),
      { threshold: 0.85 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (visible && !staticView && !started) setStarted(true);
  }, [visible, staticView, started]);
  useEffect(() => {
    if (!started || !visible || staticView || paused || hidden) return;
    let frame = 0;
    let previous = performance.now();
    let painted = clock.current;
    const tick = (now: number) => {
      clock.current = Math.min(duration, clock.current + now - previous);
      previous = now;
      if (clock.current - painted >= 32 || clock.current === duration) {
        painted = clock.current;
        setElapsed(clock.current);
      }
      if (clock.current < duration) frame = requestAnimationFrame(tick);
    };
    if (clock.current < duration) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, started, visible, staticView, paused, hidden, run]);
  const restart = () => {
    clock.current = staticView ? duration : 0;
    setElapsed(clock.current);
    setPaused(false);
    setStarted(true);
    setRun((value) => value + 1);
  };
  const finish = () => {
    clock.current = duration;
    setElapsed(duration);
    setPaused(false);
  };
  return {
    ref,
    elapsed,
    paused,
    staticView,
    finished: elapsed >= duration,
    restart,
    finish,
    togglePause: () => setPaused((value) => !value),
  };
}

export const sceneProgress = (elapsed: number, start: number, duration = 450) =>
  Math.max(0, Math.min(1, (elapsed - start) / duration));
