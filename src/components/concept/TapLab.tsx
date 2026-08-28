import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";
const HAIR = "rgba(18,20,26,0.10)";
const BG = "#FBFAF8";
const CYAN = "#06B6D4";

/* ------------------------------------------------------------------ */
/* shared pieces                                                       */
/* ------------------------------------------------------------------ */

/** A faucet drawn at (x, y) where y is the supply line height. */
function Faucet({
  x = 428,
  y = 72,
  w = 20,
  ink = INK,
}: {
  x?: number;
  y?: number;
  w?: number;
  ink?: string;
}) {
  return (
    <g>
      <path d={`M ${x} ${y} V ${y - 34}`} stroke={ink} strokeWidth={w / 2} strokeLinecap="round" fill="none" />
      <path d={`M ${x - 38} ${y - 44} H ${x + 38}`} stroke={ink} strokeWidth={w / 1.8} strokeLinecap="round" fill="none" />
      <circle cx={x} cy={y - 44} r={w / 2} fill={ink} />
      <path
        d={`M ${x} ${y} V ${y + 46} Q ${x} ${y + 66} ${x + 24} ${y + 66} H ${x + 54} Q ${x + 78} ${y + 66} ${x + 78} ${y + 86} V ${y + 110}`}
        stroke={ink}
        strokeWidth={w}
        strokeLinejoin="round"
        strokeLinecap="butt"
        fill="none"
      />
    </g>
  );
}

function Drop({
  cx,
  from,
  to,
  delay = 0,
  reduced,
  color = CYAN,
  r = 6.5,
}: {
  cx: number;
  from: number;
  to: number;
  delay?: number;
  reduced: boolean;
  color?: string;
  r?: number;
}) {
  if (reduced) {
    return <ellipse cx={cx} cy={(from + to) / 2} rx={r} ry={r * 1.2} fill={color} opacity={0.45} />;
  }
  return (
    <motion.ellipse
      cx={cx}
      rx={r}
      ry={r * 1.2}
      fill={color}
      initial={{ cy: from, opacity: 0 }}
      animate={{ cy: [from, to], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 1.4,
        ease: "easeIn",
        times: [0, 0.15, 0.8, 1],
      }}
    />
  );
}

function Supply({ x2 = 428, y = 72, x1 = 40, live = true }: { x2?: number; y?: number; x1?: number; live?: boolean }) {
  return (
    <g>
      <path d={`M ${x1} ${y} H ${x2}`} stroke={INK} strokeWidth={22} strokeLinecap="butt" fill="none" />
      {live && (
        <path d={`M ${x1 + 12} ${y} H ${x2 - 12}`} stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      )}
    </g>
  );
}

function Dashed({ x1, x2, y = 72, w = 5 }: { x1: number; x2: number; y?: number; w?: number }) {
  return (
    <path
      d={`M ${x1} ${y} H ${x2}`}
      stroke={HAIR}
      strokeWidth={w}
      strokeLinecap="round"
      strokeDasharray="1 16"
      fill="none"
    />
  );
}

function Label({
  x,
  y,
  children,
  color = FAINT,
  size = 13,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  color?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      textAnchor={anchor}
      style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.18em" }}
    >
      {children}
    </text>
  );
}

function Frame({
  n,
  title,
  tie,
  children,
}: {
  n: number;
  title: string;
  tie: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t py-16 sm:py-20" style={{ borderColor: HAIR }}>
      <div className="mx-auto max-w-[1180px] px-5 sm:px-10">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: FAINT }}>
            {String(n).padStart(2, "0")}
          </span>
          <h2
            className="text-[22px] leading-[1.15] tracking-[-0.03em] sm:text-[26px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
          >
            {title}
          </h2>
        </div>
        <p className="mt-2 max-w-[620px] text-[14px] leading-[1.55]" style={{ color: MUTED }}>
          {tie}
        </p>
        <div className="mt-10 overflow-hidden">{children}</div>
      </div>
    </section>
  );
}

function Stage({
  children,
  vb = "0 0 900 260",
  max = 860,
}: {
  children: React.ReactNode;
  vb?: string;
  max?: number;
}) {
  return (
    <svg
      viewBox={vb}
      className="mx-auto block h-auto w-full min-w-[600px]"
      style={{ maxWidth: max }}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 01 - 20                                                             */
/* ------------------------------------------------------------------ */

function V01({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      <Drop cx={506} from={190} to={228} reduced={r} />
      <Drop cx={506} from={190} to={228} delay={0.9} reduced={r} />
      <path d="M 432 244 H 580" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
    </Stage>
  );
}

function V02({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Dashed x1={470} x2={862} />
      <Label x={862} y={56} anchor="end" size={11}>
        WHERE THE BOOKING SHOULD BE
      </Label>
      <Faucet />
      {[0, 0.7, 1.4].map((d, i) => (
        <Drop key={i} cx={506} from={190} to={224} delay={d} reduced={r} />
      ))}
      <Label x={620} y={200} anchor="start" size={12} color={MUTED}>
        ENQUIRY
      </Label>
      <Label x={620} y={222} anchor="start" size={12} color={MUTED}>
        ENQUIRY
      </Label>
      <Label x={620} y={244} anchor="start" size={12} color={MUTED}>
        ENQUIRY
      </Label>
    </Stage>
  );
}

function V03({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      <Drop cx={506} from={190} to={214} reduced={r} />
      {/* cracked bucket */}
      <path d="M 452 226 L 466 254 H 546 L 560 226" stroke={INK} strokeWidth={5} fill="none" strokeLinejoin="round" />
      <path d="M 470 240 L 480 250" stroke={FAINT} strokeWidth={3} strokeLinecap="round" />
      <Drop cx={478} from={252} to={266} delay={0.6} reduced={r} r={4} />
    </Stage>
  );
}

function V04({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      {[0, 0.6, 1.2].map((d, i) => (
        <Drop key={i} cx={506} from={190} to={252} delay={d} reduced={r} />
      ))}
      <Label x={506} y={256} size={11}>
        NO BUCKET
      </Label>
    </Stage>
  );
}

function V05({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 320">
      {/* leaking */}
      <Supply x2={380} y={70} x1={40} />
      <Dashed x1={422} x2={862} y={70} />
      <Faucet x={380} y={70} />
      <Drop cx={458} from={188} to={216} reduced={r} />
      <Label x={862} y={54} anchor="end" size={11}>
        WITHOUT FOLLOW-THROUGH
      </Label>
      {/* closed */}
      <Supply x2={380} y={252} x1={40} />
      <path d="M 380 252 H 862" stroke={CYAN} strokeWidth={22} strokeLinecap="butt" fill="none" />
      <path d="M 392 252 H 850" stroke="#7FE9F6" strokeWidth={6} strokeLinecap="round" fill="none" />
      <path d="M 380 252 V 218" stroke={INK} strokeWidth={11} strokeLinecap="round" fill="none" />
      <path d="M 342 208 H 418" stroke={INK} strokeWidth={12} strokeLinecap="round" fill="none" />
      <Label x={862} y={236} anchor="end" size={11} color={MUTED}>
        WITH ZAPLA
      </Label>
    </Stage>
  );
}

function V06({ r }: { r: boolean }) {
  return (
    <div>
      <Stage>
        <Supply />
        <Dashed x1={470} x2={862} />
        <Faucet />
        <Drop cx={506} from={190} to={230} reduced={r} />
        <path d="M 432 246 H 580" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      </Stage>
      <div className="mt-2 hidden grid-cols-3 sm:grid">
        {["64%", "79%", "89%"].map((s) => (
          <div key={s} className="flex flex-col items-center">
            <span className="block h-16 w-px" style={{ background: HAIR }} />
            <span
              className="mt-6 text-[40px] leading-none tracking-[-0.05em]"
              style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function V07({ r }: { r: boolean }) {
  const stats = ["44%", "64%", "79%", "89%"];
  return (
    <Stage vb="0 0 900 300">
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      {stats.map((s, i) =>
        r ? (
          <text
            key={s}
            x={520 + i * 84}
            y={210 + i * 18}
            fill={i === 0 ? INK : FAINT}
            style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 500 }}
          >
            {s}
          </text>
        ) : (
          <motion.text
            key={s}
            x={520 + i * 84}
            fill={i === 0 ? INK : FAINT}
            style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 500 }}
            initial={{ y: 196, opacity: 0 }}
            animate={{ y: [196, 268], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, repeatDelay: 1.2, ease: "easeIn" }}
          >
            {s}
          </motion.text>
        ),
      )}
    </Stage>
  );
}

const STEPS = ["CALL", "REPLY", "BOOK", "RETURN", "REVIEW"] as const;

function V08({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 240">
      <path d="M 40 96 H 862" stroke={INK} strokeWidth={20} strokeLinecap="butt" fill="none" />
      <path d="M 52 96 H 300" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      {STEPS.map((s, i) => {
        const x = 110 + i * 170;
        const leaking = i >= 1;
        return (
          <g key={s}>
            <path d={`M ${x} 96 V 66`} stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none" />
            <path d={`M ${x - 26} 58 H ${x + 26}`} stroke={INK} strokeWidth={9} strokeLinecap="round" fill="none" />
            <Label x={x} y={38} size={11} color={leaking ? FAINT : INK}>
              {s}
            </Label>
            {leaking && <Drop cx={x} from={112} to={168} delay={i * 0.35} reduced={r} r={5} />}
          </g>
        );
      })}
      <path d="M 40 196 H 862" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
    </Stage>
  );
}

function V09({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 300">
      <Supply />
      <Dashed x1={470} x2={640} />
      <Faucet />
      <Drop cx={506} from={190} to={224} reduced={r} />
      {/* gauge */}
      <rect x={700} y={30} width={70} height={230} rx={10} stroke={HAIR} strokeWidth={3} fill="none" />
      {r ? (
        <rect x={700} y={160} width={70} height={100} rx={10} fill={CYAN} opacity={0.35} />
      ) : (
        <motion.rect
          x={700}
          width={70}
          rx={10}
          fill={CYAN}
          opacity={0.35}
          initial={{ y: 40, height: 220 }}
          animate={{ y: [40, 200], height: [220, 60] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      )}
      <Label x={735} y={286} size={11}>
        REVENUE
      </Label>
    </Stage>
  );
}

function V10({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      <Drop cx={506} from={190} to={222} reduced={r} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M ${462 + i * 22} 236 V 254`}
          stroke={FAINT}
          strokeWidth={4}
          strokeLinecap="round"
        />
      ))}
      <Label x={506} y={196} anchor="start" size={11}>
        DRAIN
      </Label>
    </Stage>
  );
}

function V11({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply x2={428} />
      <Dashed x1={470} x2={862} />
      <path d="M 428 72 V 118" stroke={INK} strokeWidth={22} strokeLinecap="butt" fill="none" />
      {/* disconnected spout, floating below with a visible gap */}
      <path
        d="M 428 156 Q 428 176 452 176 H 482 Q 506 176 506 196 V 214"
        stroke={INK}
        strokeWidth={22}
        strokeLinejoin="round"
        fill="none"
        opacity={0.35}
      />
      <Label x={452} y={146} anchor="start" size={11}>
        THE MISSING STEP
      </Label>
      <Drop cx={428} from={126} to={150} reduced={r} />
    </Stage>
  );
}

function V12({ r }: { r: boolean }) {
  const times = ["10:14", "11:40", "14:05", "17:00"];
  return (
    <Stage vb="0 0 900 300">
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      {times.map((t, i) => (
        <g key={t}>
          <Drop cx={506} from={190} to={214 + i * 24} delay={i * 0.5} reduced={r} r={5} />
          <Label x={560} y={222 + i * 24} anchor="start" size={12} color={i === 3 ? INK : FAINT}>
            {t}
          </Label>
        </g>
      ))}
      <Label x={862} y={294} anchor="end" size={11}>
        BOOKED ELSEWHERE
      </Label>
    </Stage>
  );
}

function V13({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 280">
      <path d="M 40 60 H 862" stroke={INK} strokeWidth={18} strokeLinecap="butt" fill="none" />
      <path d="M 240 60 V 140 H 520" stroke={INK} strokeWidth={14} strokeLinejoin="round" fill="none" />
      <path d="M 660 60 V 140" stroke={INK} strokeWidth={14} fill="none" />
      <path d="M 52 60 H 240" stroke={CYAN} strokeWidth={5} strokeLinecap="round" fill="none" />
      {[240, 520, 660].map((x, i) => (
        <Drop key={x} cx={x} from={x === 240 ? 78 : 156} to={240} delay={i * 0.6} reduced={r} r={5} />
      ))}
      <path d="M 40 262 H 862" stroke={HAIR} strokeWidth={4} strokeLinecap="round" />
      <Label x={862} y={40} anchor="end" size={11}>
        EVERY JUNCTION LOSES A LITTLE
      </Label>
    </Stage>
  );
}

function V14({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 300">
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      <Drop cx={506} from={190} to={218} reduced={r} />
      {/* jug filled part way */}
      <path d="M 452 226 V 282 H 566 V 226" stroke={INK} strokeWidth={5} fill="none" strokeLinejoin="round" />
      <rect x={456} y={258} width={106} height={20} fill={CYAN} opacity={0.3} />
      <Label x={600} y={272} anchor="start" size={12} color={MUTED}>
        56% ARRIVES
      </Label>
    </Stage>
  );
}

function V15({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Faucet />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <ellipse
          key={i}
          cx={520 + i * 48}
          cy={196 + i * 8}
          rx={6.5}
          ry={8}
          fill={CYAN}
          opacity={0.5 - i * 0.07}
        />
      ))}
      <Drop cx={506} from={190} to={214} reduced={r} />
      <Label x={862} y={252} anchor="end" size={11}>
        THE TRAIL GOES COLD
      </Label>
    </Stage>
  );
}

function V16({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 260">
      <Supply />
      <Dashed x1={470} x2={862} w={6} />
      <Faucet />
      <Drop cx={506} from={190} to={226} reduced={r} />
      <text
        x={700}
        y={220}
        fill={INK}
        textAnchor="middle"
        style={{ fontFamily: DISPLAY, fontSize: 62, fontWeight: 500, letterSpacing: "-0.05em" }}
      >
        44%
      </text>
      <Label x={700} y={244} size={11}>
        NEVER REACH A PERSON
      </Label>
    </Stage>
  );
}

function V17({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      <Drop cx={506} from={190} to={220} reduced={r} />
      {Array.from({ length: 14 }).map((_, i) => (
        <path
          key={i}
          d={`M ${560 + i * 22} 232 V 252`}
          stroke={i > 9 ? HAIR : FAINT}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      <Label x={560} y={210} anchor="start" size={11}>
        ONE TALLY PER MISSED ENQUIRY
      </Label>
    </Stage>
  );
}

function V18({ r }: { r: boolean }) {
  return (
    <Stage>
      <Supply x2={380} />
      <Faucet x={380} />
      {/* cyan coupling closes the gap */}
      <rect x={470} y={58} width={70} height={28} rx={8} fill={CYAN} />
      <path d="M 540 72 H 862" stroke={INK} strokeWidth={22} strokeLinecap="butt" fill="none" />
      <path d="M 552 72 H 850" stroke={CYAN} strokeWidth={6} strokeLinecap="round" fill="none" />
      <Label x={505} y={40} size={11} color={MUTED}>
        ZAPLA
      </Label>
      <Label x={862} y={130} anchor="end" size={11} color={MUTED}>
        BOOKED, PAID, RETURNING
      </Label>
      {r ? null : (
        <motion.circle
          cy={72}
          r={6}
          fill="#7FE9F6"
          initial={{ cx: 560 }}
          animate={{ cx: [560, 850] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </Stage>
  );
}

function V19({ r }: { r: boolean }) {
  return (
    <Stage vb="0 0 900 340" max={900}>
      <Supply x1={0} x2={300} y={90} />
      <Dashed x1={344} x2={900} y={90} w={6} />
      <Faucet x={300} y={90} w={30} />
      <Drop cx={378} from={216} to={288} reduced={r} r={9} />
      <text
        x={470}
        y={300}
        fill={INK}
        style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em" }}
      >
        Nothing broke. It just stopped.
      </text>
    </Stage>
  );
}

function V20({ r }: { r: boolean }) {
  const names = ["SARAH B.", "TOM R.", "PRIYA N."];
  return (
    <Stage vb="0 0 900 300">
      <Supply />
      <Dashed x1={470} x2={862} />
      <Faucet />
      {names.map((n, i) => (
        <g key={n}>
          <Drop cx={506} from={190} to={216 + i * 30} delay={i * 0.6} reduced={r} r={5} />
          <Label x={560} y={224 + i * 30} anchor="start" size={12} color={MUTED}>
            {n}
          </Label>
        </g>
      ))}
      <Label x={862} y={286} anchor="end" size={11}>
        REAL PEOPLE, NOT PERCENTAGES
      </Label>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */

const VARIANTS: { title: string; tie: string; render: (r: boolean) => React.ReactNode }[] = [
  {
    title: "Baseline: the valve that never closed",
    tie: "Current version. Supply keeps arriving, the flow stops at the tap, and the dotted line shows the booking that should have followed.",
    render: (r) => <V01 r={r} />,
  },
  {
    title: "Drops named as enquiries",
    tie: "Each drop is labelled, so the metaphor stops being about water and starts being about the callers in the 44% claim.",
    render: (r) => <V02 r={r} />,
  },
  {
    title: "Cracked bucket underneath",
    tie: "Even what you catch keeps leaking. Ties to the after-the-sale relationship being left unfinished.",
    render: (r) => <V03 r={r} />,
  },
  {
    title: "No bucket at all",
    tie: "The starkest read: nothing is waiting to catch the enquiry. Pairs with calls that never reach a person.",
    render: (r) => <V04 r={r} />,
  },
  {
    title: "Two taps: without and with follow-through",
    tie: "Before and after in one frame. The lower line carries all the way through to booked, paid, returning.",
    render: (r) => <V05 r={r} />,
  },
  {
    title: "Tap feeding the evidence columns",
    tie: "ClickUp-style stems tie the graphic to the stats so the numbers read as consequences of the leak.",
    render: (r) => <V06 r={r} />,
  },
  {
    title: "The drops are the statistics",
    tie: "The research falls out of the tap. One device carries the metaphor and the evidence at once.",
    render: (r) => <V07 r={r} />,
  },
  {
    title: "Five valves along one line",
    tie: "CALL, REPLY, BOOK, RETURN, REVIEW as taps on the same pipe. Pressure survives the first step, then every stage bleeds.",
    render: (r) => <V08 r={r} />,
  },
  {
    title: "Draining revenue gauge",
    tie: "Makes the business cost literal without stating a dollar figure you cannot defend.",
    render: (r) => <V09 r={r} />,
  },
  {
    title: "Straight into the drain",
    tie: "No catching, no recovery. Blunt and instantly readable at a glance.",
    render: (r) => <V10 r={r} />,
  },
  {
    title: "Disconnected spout",
    tie: "The gap is the message: nothing is broken, the next step simply is not attached.",
    render: (r) => <V11 r={r} />,
  },
  {
    title: "Timestamped drips",
    tie: "One working day drips away, 10:14 to 17:00, ending in booked elsewhere. Adds urgency to the same claim.",
    render: (r) => <V12 r={r} />,
  },
  {
    title: "A pipe network, leaking at every junction",
    tie: "Reframes the problem as systemic rather than one bad call. Supports the one follow-through problem bridge.",
    render: (r) => <V13 r={r} />,
  },
  {
    title: "Measuring jug, part filled",
    tie: "Quantifies the shortfall visually so the headline percentage has a physical counterpart.",
    render: (r) => <V14 r={r} />,
  },
  {
    title: "The trail goes cold",
    tie: "Drops fade as they travel right, mapping intent cooling over time instead of a single lost moment.",
    render: (r) => <V15 r={r} />,
  },
  {
    title: "Tap plus one enormous number",
    tie: "Most ClickUp-like pairing: restrained linework beside a single defensible statistic.",
    render: (r) => <V16 r={r} />,
  },
  {
    title: "Tally marks of missed enquiries",
    tie: "Accumulation reads as volume. The faded final marks imply this keeps happening.",
    render: (r) => <V17 r={r} />,
  },
  {
    title: "The Zapla coupling",
    tie: "The resolution shot. A cyan coupling closes the gap and flow continues to the end of the line.",
    render: (r) => <V18 r={r} />,
  },
  {
    title: "Editorial poster crop",
    tie: "Oversized tap bleeding off canvas with one line of copy. Strongest option if this section should feel like a magazine spread.",
    render: (r) => <V19 r={r} />,
  },
  {
    title: "Named customers, not percentages",
    tie: "Swaps abstraction for people. Useful if the section should feel human before it feels statistical.",
    render: (r) => <V20 r={r} />,
  },
];

export function TapLab() {
  const reduced = !!useReducedMotion();

  return (
    <main style={{ background: BG, color: INK }}>
      <header className="mx-auto max-w-[1180px] px-5 pb-6 pt-24 sm:px-10 sm:pt-32">
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: MUTED }}>
          Tap lab · 20 treatments
        </div>
        <h1
          className="mt-6 max-w-[860px] text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px]"
          style={{ fontFamily: DISPLAY, fontWeight: 500 }}
        >
          Twenty ways the tap can carry the message.
          <span style={{ color: FAINT }}> Same copy, stronger tie.</span>
        </h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55]" style={{ color: MUTED }}>
          Every treatment keeps the locked section copy. What changes is how directly the illustration
          connects the leak to the enquiry, the evidence and the Zapla resolution.
        </p>
      </header>

      {VARIANTS.map((v, i) => (
        <Frame key={v.title} n={i + 1} title={v.title} tie={v.tie}>
          {v.render(reduced)}
        </Frame>
      ))}

      <div className="h-24" />
    </main>
  );
}
