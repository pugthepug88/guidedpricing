import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/components/v5/kit";
import { useLeakSteps } from "./useLeakSteps";

/* ------------------------------------------------------------------ */
/* Swap these three figures for real numbers.                          */
/* value = the number counted up to, prefix = e.g. "$"                 */
/* ------------------------------------------------------------------ */
const LEDGER_STATS = [
  { value: 17, prefix: "", label: "enquiries this week", tone: "#EFE7D4", rotate: -2 },
  { value: 8, prefix: "", label: "never answered", tone: "#E4EDE6", rotate: 1.5 },
  { value: 14200, prefix: "$", label: "walked out the door", tone: "#F0E3E3", rotate: -1 },
];

const SERIF = "Georgia, 'Times New Roman', serif";
const GREEN = "#14453A";

function useCountUp(target: number, active: boolean, reduced: boolean, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, target, duration]);
  return n;
}

function LedgerCard({
  stat,
  active,
  reduced,
  index,
}: {
  stat: (typeof LEDGER_STATS)[number];
  active: boolean;
  reduced: boolean;
  index: number;
}) {
  const n = useCountUp(stat.value, active, reduced);
  return (
    <motion.div
      className="w-full max-w-[280px] rounded-[16px] px-6 py-7 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)] sm:-mx-2"
      style={{ backgroundColor: stat.tone }}
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, rotate: stat.rotate }
          : { opacity: 0, y: 20, rotate: stat.rotate * 2.4 }
      }
      transition={{ duration: reduced ? 0 : 0.55, ease: EASE, delay: reduced ? 0 : index * 0.14 }}
    >
      <div
        className="text-[28px] leading-none"
        style={{ fontFamily: SERIF, color: GREEN }}
      >
        {stat.prefix}
        {n.toLocaleString()}
      </div>
      <div className="mt-3 text-[13px]" style={{ color: GREEN, opacity: 0.6 }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export function LeakV3WarmLedger() {
  const { ref, step, reduced } = useLeakSteps(1, 120);
  const active = step >= 1;

  return (
    <section ref={ref} className="w-full overflow-hidden" style={{ backgroundColor: "#F5F1E6" }}>
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col items-center justify-center px-6 py-28">
        <h2
          className="max-w-[760px] text-center text-[30px] leading-[1.16] sm:text-[44px]"
          style={{ fontFamily: SERIF, color: GREEN }}
        >
          Nothing broke. <em>The next step never happened.</em>
        </h2>
        <p
          className="mt-5 max-w-[520px] text-center text-[15px] leading-relaxed"
          style={{ color: GREEN, opacity: 0.6 }}
        >
          The work was never the problem. The follow-through was.
        </p>

        <div className="mt-16 flex w-full flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-0">
          {LEDGER_STATS.map((s, i) => (
            <LedgerCard key={s.label} stat={s} index={i} active={active} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
