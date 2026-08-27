import { motion } from "motion/react";
import { ChannelMark, EASE } from "@/components/v5/kit";
import { useLeakSteps } from "./useLeakSteps";

const KNOT_MARKS: {
  channel: "instagram" | "sms" | "email" | "phone" | "messenger";
  x: number;
  y: number;
}[] = [
  { channel: "instagram", x: 26, y: 30 },
  { channel: "sms", x: 41, y: 62 },
  { channel: "email", x: 57, y: 28 },
  { channel: "phone", x: 71, y: 64 },
  { channel: "messenger", x: 86, y: 40 },
];

const BUBBLES = [
  { text: "Still waiting…", x: 31, y: 14 },
  { text: "Did anyone reply?", x: 48, y: 84 },
  { text: "That was Tuesday.", x: 63, y: 10 },
  { text: "Booked elsewhere.", x: 80, y: 86 },
];

const THREAD =
  "M -4 46 C 12 46 18 46 24 46 C 30 46 30 24 36 26 C 42 28 34 46 40 54 C 46 62 54 60 56 48 C 58 36 50 24 58 22 C 66 20 66 44 70 52 C 74 60 82 62 84 50 C 86 38 78 30 86 30 C 94 30 100 40 108 40";

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
            viewBox="0 0 104 80"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <motion.path
              d={THREAD}
              fill="none"
              stroke="rgb(203,213,225)"
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.5}
              initial={false}
              style={{ filter: "blur(6px)" }}
            />
            <motion.path
              d={THREAD}
              fill="none"
              stroke="rgb(226,232,240)"
              strokeWidth={14}
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
