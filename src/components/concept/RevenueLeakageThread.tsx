import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Isolated art-direction prototype: revenue leakage as a broken continuity thread.
 * Local to /concept/revenue-leakage-thread. Not used by any production page.
 */

const CYAN = "#06B6D4";
const INK = "#0B1220";

/** Upstream thread: enquiry -> RESPONDED (ends before the gap). */
const UPSTREAM =
  "M 452 246 C 556 258 596 328 700 350 C 730 356 754 358 782 360";
/** Downstream thread: resumes after the gap -> BOOKED -> PAID -> RETURNING. */
const DOWNSTREAM =
  "M 908 374 C 1000 390 1058 428 1152 446 C 1234 462 1290 470 1372 478";
/** Act 4: one restored continuity path. */
const RESTORED =
  "M 220 470 C 470 470 560 520 760 520 C 960 520 1080 476 1330 476";

const STRANDS = [
  "M 786 362 C 796 448 762 512 776 606",
  "M 792 366 C 812 456 852 520 838 626",
  "M 782 364 C 758 452 706 508 722 596",
  "M 796 368 C 830 442 884 494 872 574",
];

function useActs(progress: MotionValue<number>) {
  return {
    // Act 1
    enquiry: useTransform(progress, [0, 0.02, 0.5, 0.66], [0, 1, 1, 0]),
    upstreamDraw: useTransform(progress, [0.01, 0.16], [0, 1]),
    downstreamDraw: useTransform(progress, [0.08, 0.26], [0, 1]),
    // Act 2 — downstream recedes
    downstreamPresence: useTransform(progress, [0.3, 0.44], [1, 0.35]),
    downstreamCyan: useTransform(progress, [0.28, 0.4], [1, 0]),
    gapLabel: useTransform(progress, [0.32, 0.4, 0.7, 0.76], [0, 1, 1, 0]),
    // Act 3 — drain
    drain: useTransform(progress, [0.5, 0.72], [0, 1]),
    futureFall: useTransform(progress, [0.5, 0.72], [0, 190]),
    futureFade: useTransform(progress, [0.08, 0.2, 0.5, 0.68], [0, 1, 1, 0]),
    strands: useTransform(progress, [0.5, 0.62, 0.74], [0, 1, 0]),
    // Act 4 — reform
    restored: useTransform(progress, [0.78, 0.94], [0, 1]),
    restoredLabels: useTransform(progress, [0.86, 0.95], [0, 1]),
    brokenFade: useTransform(progress, [0.74, 0.82], [1, 0]),
    // Copy
    copy1: useTransform(progress, [0.42, 0.5], [1, 0]),
    copy2: useTransform(progress, [0.5, 0.58, 0.72, 0.78], [0, 1, 1, 0]),
    copy3: useTransform(progress, [0.8, 0.88], [0, 1]),
    ghost: useTransform(progress, [0.1, 0.3, 0.66, 0.78], [0, 1, 1, 0]),
  };
}

function StateLabel({
  x,
  y,
  children,
  align = "start",
}: {
  x: number;
  y: number;
  children: string;
  align?: "start" | "middle";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={align}
      fill={INK}
      fontSize="13"
      letterSpacing="0.18em"
      fontWeight={600}
      style={{ fontFamily: "var(--font-zapla, Manrope), sans-serif" }}
    >
      {children}
    </text>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const a = useActs(progress);

  return (
    <svg
      viewBox="0 0 1440 900"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Huge low-opacity background typography */}
      <motion.g style={{ opacity: a.ghost }}>
        <text
          x="520"
          y="800"
          fill={INK}
          fillOpacity={0.04}
          fontSize="150"
          fontWeight={800}
          letterSpacing="-0.04em"
          style={{ fontFamily: "var(--font-zapla, Manrope), sans-serif" }}
        >
          FOLLOW THROUGH
        </text>
      </motion.g>

      <motion.g style={{ opacity: a.brokenFade }}>
        {/* Upstream continuity (cyan, always the live signal) */}
        <motion.path
          d={UPSTREAM}
          stroke={CYAN}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          style={{ pathLength: a.upstreamDraw }}
        />
        {/* Enquiry origin dot */}
        <motion.circle cx="452" cy="246" r="4" fill={CYAN} style={{ opacity: a.enquiry }} />
        {/* Broken end */}
        <motion.circle cx="782" cy="360" r="3" fill={CYAN} style={{ opacity: a.upstreamDraw }} />

        {/* Downstream path: cyan at first, then neutral grey and less present */}
        <motion.g style={{ opacity: a.downstreamPresence }}>
          <motion.path
            d={DOWNSTREAM}
            stroke="#C3C9D4"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            style={{ pathLength: a.downstreamDraw }}
          />
          <motion.path
            d={DOWNSTREAM}
            stroke={CYAN}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            style={{ pathLength: a.downstreamDraw, opacity: a.downstreamCyan }}
          />
        </motion.g>

        {/* Draining strands from the broken end */}
        <motion.g style={{ opacity: a.strands }}>
          {STRANDS.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke={CYAN}
              strokeWidth={i % 2 === 0 ? 1.2 : 0.8}
              strokeOpacity={0.45 - i * 0.07}
              fill="none"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: a.drain }}
            />
          ))}
        </motion.g>

        {/* Canvas state labels */}
        <motion.g style={{ opacity: a.upstreamDraw }}>
          <StateLabel x={676} y={332}>
            RESPONDED
          </StateLabel>
        </motion.g>

        <motion.g style={{ opacity: a.futureFade, y: a.futureFall }}>
          <StateLabel x={912} y={352}>
            BOOKED
          </StateLabel>
          <StateLabel x={1136} y={424}>
            PAID
          </StateLabel>
          <StateLabel x={1276} y={452}>
            RETURNING
          </StateLabel>
        </motion.g>

        {/* THE GAP — no box */}
        <motion.g style={{ opacity: a.gapLabel }}>
          <line x1="784" y1="392" x2="906" y2="404" stroke="#D6DBE4" strokeWidth="1" strokeDasharray="1 6" />
          <text
            x="784"
            y="428"
            fill="#6B7484"
            fontSize="11"
            letterSpacing="0.24em"
            fontWeight={600}
            style={{ fontFamily: "var(--font-zapla, Manrope), sans-serif" }}
          >
            THE GAP
          </text>
          <text
            x="784"
            y="450"
            fill="#9AA2B1"
            fontSize="11"
            letterSpacing="0.06em"
            style={{ fontFamily: "var(--font-zapla, Manrope), sans-serif" }}
          >
            4 days, 6 hours
          </text>
        </motion.g>
      </motion.g>

      {/* Act 4 — restored continuity */}
      <motion.path
        d={RESTORED}
        stroke={CYAN}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        style={{ pathLength: a.restored }}
      />
      <motion.g style={{ opacity: a.restoredLabels }}>
        <circle cx="470" cy="482" r="3.5" fill={CYAN} />
        <circle cx="760" cy="520" r="3.5" fill={CYAN} />
        <circle cx="1060" cy="500" r="3.5" fill={CYAN} />
        <StateLabel x={470} y={462} align="middle">
          REPLIED
        </StateLabel>
        <StateLabel x={760} y={500} align="middle">
          BOOKED
        </StateLabel>
        <StateLabel x={1060} y={480} align="middle">
          FOLLOW-UP
        </StateLabel>
      </motion.g>
    </svg>
  );
}

function Enquiry({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.02, 0.5, 0.66], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.5, 0.7], [0, 60]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute left-[26%] top-[14%] max-w-sm"
    >
      <div className="text-[11px] font-semibold tracking-[0.24em] text-neutral-400">
        NEW ENQUIRY · 10:14 AM
      </div>
      <div className="mt-2 font-zapla text-xl font-semibold tracking-tight text-[#0B1220]">
        Sarah Chen
      </div>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-neutral-600">
        “Hi, do you have any availability this week?”
      </p>
    </motion.div>
  );
}

function CopyColumn({ progress }: { progress: MotionValue<number> }) {
  const a = useActs(progress);
  return (
    <div className="pointer-events-none absolute left-[6%] top-1/2 w-[34%] max-w-[440px] -translate-y-1/2">
      <div className="relative">
        <motion.div style={{ opacity: a.copy1 }}>
          <div className="text-[11px] font-semibold tracking-[0.28em] text-neutral-400">
            WHERE REVENUE LEAKS
          </div>
          <h2 className="mt-6 font-zapla text-4xl font-semibold leading-[1.06] tracking-tight text-[#0B1220] lg:text-[56px]">
            Customers don’t always say no.
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-neutral-600">
            An interested customer arrives with momentum. What matters is whether the next step
            actually happens.
          </p>
        </motion.div>

        <motion.div style={{ opacity: a.copy2 }} className="absolute inset-0">
          <h2 className="font-zapla text-4xl font-semibold leading-[1.06] tracking-tight text-[#0B1220] lg:text-[56px]">
            Sometimes nobody followed through.
          </h2>
          <p className="mt-8 text-[17px] leading-relaxed text-neutral-500">
            That wasn’t a “no.”
            <br />
            It was a future that never happened.
          </p>
        </motion.div>

        <motion.div style={{ opacity: a.copy3 }} className="absolute inset-0">
          <h2 className="font-zapla text-4xl font-semibold leading-[1.06] tracking-tight text-[#0B1220] lg:text-[56px]">
            One customer.
            <br />
            Everything connected.
          </h2>
          <p className="mt-8 text-[11px] font-semibold tracking-[0.24em] text-neutral-400">
            NEXT: REAL ZAPLA PRODUCT PROOF
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function StaticFallback() {
  return (
    <section className="bg-[#FBFCFE] px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-[11px] font-semibold tracking-[0.28em] text-neutral-400">
          WHERE REVENUE LEAKS
        </div>
        <h2 className="mt-6 font-zapla text-4xl font-semibold leading-[1.08] tracking-tight text-[#0B1220]">
          Customers don’t always say no. Sometimes nobody followed through.
        </h2>
        <svg viewBox="0 0 720 200" className="mt-12 w-full" aria-hidden="true">
          <path d="M 40 80 C 160 90 220 110 300 116" stroke={CYAN} strokeWidth="2" fill="none" />
          <path d="M 420 124 C 520 132 600 138 680 140" stroke="#C3C9D4" strokeWidth="1.5" fill="none" />
          <text x="40" y="60" fill={INK} fontSize="12" letterSpacing="0.18em">RESPONDED</text>
          <text x="300" y="160" fill="#9AA2B1" fontSize="11" letterSpacing="0.24em">THE GAP</text>
          <text x="430" y="104" fill="#B4BAC6" fontSize="12" letterSpacing="0.18em">BOOKED · PAID · RETURNING</text>
        </svg>
        <p className="mt-12 text-[17px] leading-relaxed text-neutral-500">
          That wasn’t a “no.” It was a future that never happened.
        </p>
        <p className="mt-10 font-zapla text-2xl font-semibold tracking-tight text-[#0B1220]">
          One customer. Everything connected.
        </p>
      </div>
    </section>
  );
}

function MobileStory() {
  return (
    <section className="bg-[#FBFCFE] px-6 py-20">
      <div className="text-[11px] font-semibold tracking-[0.28em] text-neutral-400">
        WHERE REVENUE LEAKS
      </div>
      <h2 className="mt-5 font-zapla text-[34px] font-semibold leading-[1.08] tracking-tight text-[#0B1220]">
        Customers don’t always say no.
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-neutral-600">
        An interested customer arrives with momentum. What matters is whether the next step actually
        happens.
      </p>

      <div className="mt-14">
        <div className="text-[11px] font-semibold tracking-[0.24em] text-neutral-400">
          NEW ENQUIRY · 10:14 AM
        </div>
        <div className="mt-2 font-zapla text-lg font-semibold text-[#0B1220]">Sarah Chen</div>
        <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">
          “Hi, do you have any availability this week?”
        </p>
      </div>

      {/* Vertical thread, mobile-native composition */}
      <div className="relative mt-12 pl-8">
        <span className="absolute left-[3px] top-1 h-[92px] w-px bg-[#06B6D4]" />
        <span className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#06B6D4]" />
        <div className="text-[12px] font-semibold tracking-[0.2em] text-[#0B1220]">RESPONDED</div>

        <div className="mt-[70px]">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-neutral-500">THE GAP</div>
          <div className="mt-1 text-[11px] tracking-wide text-neutral-400">4 days, 6 hours</div>
        </div>

        <div className="relative mt-14 space-y-8 opacity-40">
          <span className="absolute left-[-29px] top-1 h-[150px] w-px bg-[#C3C9D4]" />
          <div className="text-[12px] font-semibold tracking-[0.2em] text-neutral-400">BOOKED</div>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-neutral-400">PAID</div>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-neutral-400">RETURNING</div>
        </div>
      </div>

      <h2 className="mt-20 font-zapla text-[30px] font-semibold leading-[1.1] tracking-tight text-[#0B1220]">
        Sometimes nobody followed through.
      </h2>
      <p className="mt-5 text-[16px] leading-relaxed text-neutral-500">
        That wasn’t a “no.”
        <br />
        It was a future that never happened.
      </p>

      <div className="mt-20">
        <div className="relative pl-8">
          <span className="absolute left-[3px] top-1 h-[168px] w-px bg-[#06B6D4]" />
          {["REPLIED", "BOOKED", "FOLLOW-UP"].map((s) => (
            <div key={s} className="relative mb-14 last:mb-0">
              <span className="absolute left-[-29px] top-1.5 h-2 w-2 rounded-full bg-[#06B6D4]" />
              <div className="text-[12px] font-semibold tracking-[0.2em] text-[#0B1220]">{s}</div>
            </div>
          ))}
        </div>
        <h2 className="mt-6 font-zapla text-[30px] font-semibold leading-[1.1] tracking-tight text-[#0B1220]">
          One customer. Everything connected.
        </h2>
        <p className="mt-6 text-[11px] font-semibold tracking-[0.24em] text-neutral-400">
          NEXT: REAL ZAPLA PRODUCT PROOF
        </p>
      </div>
    </section>
  );
}

export function RevenueLeakageThread() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = wrapperRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          const p = Math.min(Math.max(-rect.top / total, 0), 1);
          scrollYProgress.set(p);
        }
      }
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mob = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      setReduced(rm.matches);
      setIsMobile(mob.matches);
    };
    sync();
    rm.addEventListener?.("change", sync);
    mob.addEventListener?.("change", sync);
    return () => {
      rm.removeEventListener?.("change", sync);
      mob.removeEventListener?.("change", sync);
    };
  }, []);

  if (reduced) return <StaticFallback />;
  if (isMobile) return <MobileStory />;

  return (
    <div ref={wrapperRef} className="relative h-[420vh] bg-[#FBFCFE]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Stage progress={scrollYProgress} />
        <Enquiry progress={scrollYProgress} />
        <CopyColumn progress={scrollYProgress} />
      </div>
    </div>
  );
}
