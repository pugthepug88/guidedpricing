import { useEffect, useRef, useState } from "react";

/**
 * Sticky scroll-scrubbed video section.
 * The outer wrapper is taller than the viewport; the inner container pins
 * with `sticky top-0` and holds the video. Scroll progress across the
 * wrapper maps to video.currentTime.
 */
export function ChaosToCalmScrollScrub() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    video.pause();

    let ticking = false;
    let inView = false;
    let duration = 0;

    const onMeta = () => { duration = video.duration || 0; };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    const update = () => {
      ticking = false;
      if (!inView || duration <= 0) return;
      const rect = wrapper.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;
      const target = progress * duration;
      // Only seek if drift > one frame (~0.033s) to avoid thrashing
      if (Math.abs(target - video.currentTime) > 0.033) {
        try { video.currentTime = target; } catch {}
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inView = e.isIntersecting;
        if (inView) onScroll();
      },
      { threshold: 0 }
    );
    io.observe(wrapper);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [reducedMotion]);

  return (
    <section className="bg-zapla-bg">
      {/* Intro copy above the pin */}
      <div className="px-6 pt-24 md:pt-32 pb-10 md:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-zapla font-semibold tracking-tight text-neutral-900 text-3xl sm:text-4xl md:text-5xl leading-[1.1]">
            Every tool. One brain.
          </h2>
          <p className="mt-5 text-neutral-600 text-lg md:text-xl leading-relaxed">
            Stop juggling twelve dashboards. Scroll and watch it come together.
          </p>
        </div>
      </div>

      {/* Sticky scrub container: outer height drives the scrub distance */}
      <div
        ref={wrapperRef}
        className="relative h-[220vh] sm:h-[240vh] md:h-[260vh]"
        aria-label="Chaos to calm animation"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-6">
          <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_30px_80px_-40px_rgba(10,10,20,0.35)]">
            <video
              ref={videoRef}
              className="block w-full h-auto"
              src="/videos/chaos-to-calm.mp4"
              poster="/videos/chaos-to-calm-poster.jpg"
              muted
              playsInline
              preload="auto"
              disableRemotePlayback
            />
          </div>
        </div>
      </div>
    </section>
  );
}
