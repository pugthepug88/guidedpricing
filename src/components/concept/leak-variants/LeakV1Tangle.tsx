import { motion } from "motion/react";
import { ChannelMark, EASE } from "@/components/v5/kit";
import { useLeakSteps } from "./useLeakSteps";

const KNOT_MARKS: {
  channel: "instagram" | "sms" | "email" | "phone" | "messenger";
  x: number;
  y: number;
}[] = [
  { channel: "instagram", x: 23, y: 57.5 },
  { channel: "sms", x: 34.6, y: 32.5 },
  { channel: "email", x: 53.8, y: 60 },
  { channel: "phone", x: 67.3, y: 65 },
  { channel: "messenger", x: 82.7, y: 37.5 },
];

const BUBBLES = [
  { text: "Still waiting…", x: 27, y: 80 },
  { text: "Did anyone reply?", x: 42, y: 14 },
  { text: "That was Tuesday.", x: 60, y: 84 },
  { text: "Booked elsewhere.", x: 88, y: 14 },
];

const THREAD =
  "M -4 23 C 12 23 18 23 24 23 C 30 23 30 12 36 13 C 42 14 34 23 40 27 C 46 31 54 30 56 24 C 58 18 50 12 58 11 C 66 10 66 22 70 26 C 74 30 82 31 84 25 C 86 19 78 15 86 15 C 94 15 100 20 108 20";

export function LeakV1Tangle() {
  const { ref, step, reduced } = useLeakSteps(4, 700);

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 pb-16 pt-28 sm:pt-36">
        <header className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[30px] leading-[1.12] tracking-[-0.02em] sm:text-[44px]">
            <span className="block font-bold text-slate-900">The customer was ready.</span>
            <span className="block font-light text-slate-400">The business was busy.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-500">
            Most revenue leaks look like a normal working day.
          </p>
        </header>

        <div className="relative mt-14 min-h-[420px] flex-1 sm:mt-20">
          <svg
            viewBox="0 0 104 40"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <motion.path
              d={THREAD}
              fill="none"
              stroke="rgb(203,213,225)"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.5}
              initial={false}
              style={{ filter: "blur(3px)" }}
            />
            <motion.path
              d={THREAD}
              fill="none"
              stroke="rgb(226,232,240)"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={step > 0 || reduced ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: reduced ? 0 : 2, ease: "easeInOut" }}
            />
          </svg>

          {KNOT_MARKS.map((m, i) => (
            <motion.div
              key={m.channel}
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[10px] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-100"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduced ? 0 : 0.5,
                ease: EASE,
                delay: reduced ? 0 : 0.35 + i * 0.34,
              }}
            >
              <ChannelMark channel={m.channel} size={18} />
            </motion.div>
          ))}

          {BUBBLES.map((b, i) => (
            <motion.div
              key={b.text}
              className="absolute -translate-x-1/2 rounded-full bg-slate-100 px-3.5 py-1.5 text-[12px] leading-none text-slate-500"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
              initial={false}
              animate={
                step > i
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            >
              {b.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
