import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, ChannelMark, EASE, Face, Pill } from "@/components/v5/kit";
import { FACE } from "@/components/v5/faces";
import { useLeakSteps } from "./useLeakSteps";

const BEATS = ["The job was hers.", "The reply never came.", "She booked elsewhere."];

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function LeakV2TradeCut() {
  const { ref, step, inView, reduced } = useLeakSteps(3, 180);
  const [secs, setSecs] = useState(0);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setSecs(363);
      setLost(true);
      return;
    }
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    const t = setTimeout(() => setLost(true), 6000);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, [inView, reduced]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-slate-900">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/concept/cinematic-v5/mechanic.mp4"
        poster="/concept/cinematic-v5/mechanic.jpg"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,12,16,0.72) 0%, rgba(9,12,16,0.55) 45%, rgba(9,12,16,0.25) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] flex-col justify-center px-6 py-24">
        <div className="max-w-[620px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/60">
            Where revenue leaks
          </p>
          <h2 className="mt-5 text-[30px] font-semibold leading-[1.14] tracking-[-0.02em] text-white sm:text-[44px]">
            {BEATS.map((b, i) => (
              <motion.span
                key={b}
                className="block"
                initial={false}
                animate={step > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
              >
                {b}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="mt-6 max-w-[420px] text-[15px] leading-relaxed text-white/70"
            initial={false}
            animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: reduced ? 0 : 0.15 }}
          >
            Nothing broke. The next step just never happened.
          </motion.p>
        </div>

        <motion.div
          className="mt-14 self-end sm:absolute sm:bottom-14 sm:right-6 sm:mt-0"
          initial={false}
          animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
        >
          <Card
            className="w-full max-w-[320px] p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] transition-all duration-700"
            /* radius 16 */
          >
            <div
              className="transition-all duration-700"
              style={{ filter: lost ? "grayscale(1)" : "grayscale(0)" }}
            >
              <div className="flex items-center gap-2.5">
                <Face src={FACE.sophie} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-semibold text-slate-900">
                    Sarah Miller
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ChannelMark channel="instagram" size={13} />
                    Instagram DM
                  </div>
                </div>
                {lost ? (
                  <Pill tone="slate">LOST</Pill>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-rose-500 px-2 py-[3px] text-[10.5px] font-semibold leading-none text-white">
                    {fmt(secs)}
                  </span>
                )}
              </div>
              <p className="mt-3 text-[13px] leading-snug text-slate-600">
                "Hi, can you fit my car in this week? Happy to pay for the full service."
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
