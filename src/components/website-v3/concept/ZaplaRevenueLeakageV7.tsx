import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const AUTUMN = [
  "#C89A5D",
  "#BF7458",
  "#85845D",
  "#C2A07B",
  "#D69672",
  "#B59672",
  "#D29A43",
  "#9A9870",
] as const;

type Person = {
  cell: number;
  bg: (typeof AUTUMN)[number];
};

const PEOPLE: Person[] = Array.from({ length: 24 }, (_, cell) => ({
  cell,
  bg: AUTUMN[cell % AUTUMN.length],
}));

/* Broad on the far left, progressively tighter as the stream approaches the filter. */
const INBOUND = [
  { i: 0, x: 4, y: 12, s: 62 },
  { i: 1, x: 10, y: 31, s: 48 },
  { i: 2, x: 5, y: 56, s: 58 },
  { i: 3, x: 9, y: 81, s: 46 },
  { i: 4, x: 16, y: 8, s: 52 },
  { i: 5, x: 17, y: 38, s: 54 },
  { i: 6, x: 18, y: 68, s: 64 },
  { i: 7, x: 23, y: 84, s: 52 },
  { i: 8, x: 26, y: 18, s: 58 },
  { i: 9, x: 27, y: 43, s: 60 },
  { i: 10, x: 28, y: 69, s: 50 },
  { i: 11, x: 33, y: 29, s: 62 },
  { i: 12, x: 34, y: 55, s: 52 },
  { i: 13, x: 36, y: 72, s: 56 },
  { i: 14, x: 39, y: 40, s: 64 },
  { i: 15, x: 40, y: 60, s: 56 },
] as const;

/* These remain visible in the still image so the loss is obvious at a glance. */
const FADING = [
  { i: 16, x: 43, y: 33, s: 48, o: 0.62 },
  { i: 17, x: 46, y: 43, s: 42, o: 0.46 },
  { i: 18, x: 48.5, y: 52, s: 36, o: 0.31 },
  { i: 19, x: 50.5, y: 58, s: 30, o: 0.17 },
] as const;

/* Fewer people emerge close to the checkpoint, then the stream opens slightly. */
const SURVIVORS = [
  { i: 20, x: 60, y: 47, s: 54 },
  { i: 21, x: 69, y: 53, s: 62 },
  { i: 22, x: 80, y: 43, s: 54 },
  { i: 23, x: 91, y: 52, s: 60 },
] as const;

const PROOF = [
  {
    label: "Never asked",
    stat: "64%",
    text: "of businesses don't ask the lead to buy or book.",
    source: "Invoca · 2026",
  },
  {
    label: "Too slow",
    stat: "79%",
    text: "would take their business elsewhere after poor or slow service.",
    source: "ServiceNow / Lonergan Research · Australian consumers",
  },
  {
    label: "Reviews shape choice",
    stat: "89%",
    text: "are more likely to use a local business that responds to its reviews.",
    source: "BrightLocal · 2025",
  },
] as const;

function Reveal({
  children,
  reduced,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  reduced: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Avatar({
  person,
  size,
  opacity = 1,
}: {
  person: Person;
  size: number;
  opacity?: number;
}) {
  const column = person.cell % 6;
  const row = Math.floor(person.cell / 6);
  const backgroundPosition = `${(column / 5) * 100}% ${(row / 3) * 100}%`;

  return (
    <div
      className="relative overflow-hidden rounded-full shadow-[0_8px_24px_rgba(17,19,24,0.1)] ring-1 ring-black/[0.06]"
      style={{
        width: size,
        height: size,
        backgroundColor: person.bg,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        opacity,
      }}
    />
  );
}

function DesktopStream() {
  const particles = Array.from({ length: 104 }, (_, n) => {
    const column = n % 26;
    const row = Math.floor(n / 26);
    const progress = column / 25;
    const x = 1 + column * 2.03;
    const spread = 41 - progress * 34;
    const wave = Math.sin(n * 1.73) * spread;
    const rowOffset = (row - 1.5) * 5.2;
    return {
      x,
      y: 50 + wave + rowOffset,
      size: Math.max(2.5, 7.4 - progress * 4.7 + (n % 3) * 0.5),
      opacity: Math.max(0.1, 0.31 - progress * 0.16),
      tone: AUTUMN[(n * 3 + row) % AUTUMN.length],
    };
  });

  const outputParticles = Array.from({ length: 42 }, (_, n) => {
    const column = n % 14;
    const progress = column / 13;
    return {
      x: 56.5 + column * 3.05,
      y: 50 + Math.sin(n * 1.37) * (4 + progress * 11) + (Math.floor(n / 14) - 1) * 3.5,
      size: 2.4 + (n % 3) * 0.8,
      opacity: 0.085 + (n % 4) * 0.025,
      tone: AUTUMN[(n * 5 + 2) % AUTUMN.length],
    };
  });

  return (
    <div
      className="relative mx-auto hidden h-[338px] w-full max-w-[1180px] overflow-visible sm:block"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1120 338"
        preserveAspectRatio="none"
        fill="none"
      >
        {[42, 88, 134, 204, 250, 296].map((y, index) => (
          <path
            key={"in-line-" + index}
            d={`M -20 ${y} C 175 ${y + (index % 2 ? 24 : -18)}, 390 ${171 + (index - 2.5) * 13}, 603 169`}
            stroke="#8F877F"
            strokeWidth="1"
            opacity="0.1"
          />
        ))}
        {[0, 1, 2, 3].map((index) => (
          <path
            key={"out-line-" + index}
            d={`M 607 ${160 + index * 6} C 735 ${153 + index * 8}, 860 ${142 + index * 18}, 1140 ${125 + index * 31}`}
            stroke="#8F877F"
            strokeWidth="1"
            opacity="0.095"
          />
        ))}
      </svg>

      {particles.map((dot, index) => (
        <span
          key={"particle-" + index}
          className="absolute rounded-full ring-1 ring-white/35"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            backgroundColor: dot.tone,
            boxShadow: "inset 0 -1px 2px rgba(77,51,36,.16)",
          }}
        />
      ))}

      {INBOUND.map(({ i, x, y, s }) => (
        <div
          key={"inbound-" + i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: x + "%", top: y + "%" }}
        >
          <Avatar person={PEOPLE[i]} size={s} />
        </div>
      ))}

      {FADING.map(({ i, x, y, s, o }, index) => (
        <div
          key={"fading-" + index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: x + "%", top: y + "%" }}
        >
          <Avatar person={PEOPLE[i]} size={s} opacity={o} />
        </div>
      ))}

      {/* Existing translucent checkpoint, made narrower and more legible rather than replaced by a blue line. */}
      <div className="absolute bottom-[7%] left-[54%] top-[7%] w-[34px] -translate-x-1/2">
        <div
          className="absolute inset-0 shadow-[0_18px_34px_rgba(42,49,58,.12)]"
          style={{
            clipPath: "polygon(20% 4%, 80% 0, 80% 100%, 20% 96%)",
            background:
              "linear-gradient(90deg, rgba(67,75,86,.2), rgba(255,255,255,.96) 27%, rgba(246,247,248,.86) 68%, rgba(67,75,86,.18))",
          }}
        >
          <div className="absolute inset-[1px] bg-white/36 backdrop-blur-[5px]" />
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-zapla-ink/12" />
          <div className="absolute bottom-0 right-[6px] top-0 w-px bg-zapla-ink/10" />
          {[29, 38, 47, 56, 65, 74].map((top, index) => (
            <span
              key={"filter-pore-" + index}
              className="absolute h-[3px] w-[3px] rounded-full bg-[#8E725D]/60"
              style={{ left: 11 + (index % 2) * 7, top: top + "%" }}
            />
          ))}
        </div>
      </div>

      {outputParticles.map((dot, index) => (
        <span
          key={"output-particle-" + index}
          className="absolute rounded-full ring-1 ring-white/30"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            backgroundColor: dot.tone,
          }}
        />
      ))}

      {SURVIVORS.map(({ i, x, y, s }) => (
        <div
          key={"survivor-" + i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: x + "%", top: y + "%" }}
        >
          <Avatar person={PEOPLE[i]} size={s} />
        </div>
      ))}
    </div>
  );
}

function MobileStream() {
  const mobileInbound = INBOUND.slice(0, 12);
  const mobileFading = FADING;
  const mobileSurvivors = SURVIVORS;

  const mobileParticles = Array.from({ length: 56 }, (_, n) => {
    const row = n % 14;
    const progress = row / 13;
    return {
      x: 50 + Math.sin(n * 1.51) * (42 - progress * 32),
      y: 3 + row * 3.15 + Math.floor(n / 14) * 1.7,
      size: 2.5 + (n % 3) * 1.05,
      opacity: 0.1 + (n % 4) * 0.03,
      tone: AUTUMN[(n * 3 + row) % AUTUMN.length],
    };
  });

  return (
    <div
      className="relative mx-auto h-[520px] w-full max-w-[390px] overflow-visible sm:hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 390 520"
        preserveAspectRatio="none"
        fill="none"
      >
        {[28, 92, 156, 220, 284, 348].map((x, index) => (
          <path
            key={"mobile-line-" + index}
            d={`M ${x} -10 C ${x + (index % 2 ? 18 : -18)} 104, ${195 + (index - 2.5) * 8} 170, 195 248`}
            stroke="#8F877F"
            strokeWidth="1"
            opacity="0.1"
          />
        ))}
        {[0, 1, 2].map((index) => (
          <path
            key={"mobile-output-line-" + index}
            d={`M ${190 + index * 5} 270 C ${160 + index * 34} 335, ${118 + index * 76} 415, ${82 + index * 112} 530`}
            stroke="#8F877F"
            strokeWidth="1"
            opacity="0.09"
          />
        ))}
      </svg>

      {mobileParticles.map((dot, index) => (
        <span
          key={"mobile-particle-" + index}
          className="absolute rounded-full ring-1 ring-white/35"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            backgroundColor: dot.tone,
          }}
        />
      ))}

      {mobileInbound.map(({ i, s }, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        return (
          <div
            key={"mobile-inbound-" + i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: 12 + col * 25 + "%", top: 7 + row * 14.5 + "%" }}
          >
            <Avatar person={PEOPLE[i]} size={Math.min(50, s * 0.78)} />
          </div>
        );
      })}

      {mobileFading.map(({ i, s, o }, index) => (
        <div
          key={"mobile-fading-" + index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: 22 + index * 14 + "%", top: 43 + index * 1.3 + "%" }}
        >
          <Avatar person={PEOPLE[i]} size={Math.max(22, s * 0.72)} opacity={Math.min(0.58, o + 0.04)} />
        </div>
      ))}

      <div className="absolute left-[6%] right-[6%] top-1/2 h-[30px] -translate-y-1/2">
        <div
          className="absolute inset-0 shadow-[0_12px_26px_rgba(42,49,58,.12)]"
          style={{
            clipPath: "polygon(4% 18%, 96% 18%, 92% 82%, 8% 82%)",
            background:
              "linear-gradient(180deg, rgba(67,75,86,.18), rgba(255,255,255,.96) 30%, rgba(246,247,248,.84) 70%, rgba(67,75,86,.16))",
          }}
        />
      </div>

      {mobileSurvivors.map(({ i, s }, index) => (
        <div
          key={"mobile-survivor-" + i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: 20 + index * 20 + "%", top: 65 + (index % 2) * 10 + "%" }}
        >
          <Avatar person={PEOPLE[i]} size={Math.min(55, s * 0.84)} />
        </div>
      ))}
    </div>
  );
}

function FadeFilterVisual() {
  return (
    <div className="mt-7 sm:mt-8">
      <DesktopStream />
      <MobileStream />
    </div>
  );
}

export function ZaplaRevenueLeakageV7() {
  const reduced = !!useReducedMotion();

  return (
    <section
      aria-label="Where revenue gets lost"
      className="bg-zapla-paper text-zapla-ink"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <Reveal reduced={reduced}>
          <header className="mx-auto max-w-[1080px] text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zapla-muted"
              style={{ fontFamily: MONO }}
            >
              Where revenue gets lost
            </p>
            <h2
              className="mt-6 text-[36px] leading-[0.98] tracking-[-0.05em] sm:text-[48px] lg:text-[60px] lg:leading-[0.96]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              44% of inbound callers don&apos;t reach a person.
              <br className="hidden lg:block" />
              <span className="text-zapla-muted2"> That&apos;s only the first step lost.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[760px] text-[16px] leading-[1.58] text-zapla-muted sm:text-[18px]">
              Missed calls are only the start. Leads aren&apos;t asked to book.
              Slow service sends customers elsewhere. Review responses influence
              which local business customers choose.
            </p>
            <p
              className="mt-4 text-[9px] uppercase tracking-[0.16em] text-zapla-muted2"
              style={{ fontFamily: MONO }}
            >
              Invoca · 2026 · 70M+ calls
            </p>
          </header>
        </Reveal>

        <FadeFilterVisual />

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          {PROOF.map((proof, index) => (
            <Reveal
              key={proof.label}
              reduced={reduced}
              delay={0.04 + index * 0.05}
              className="h-full"
            >
              <article
                className="flex min-h-[270px] h-full flex-col items-center rounded-[28px] px-7 py-8 text-center sm:min-h-[292px] sm:px-8 sm:py-9 lg:px-10"
                style={{
                  backgroundColor: ["#E7D8C5", "#DCE0CC", "#E7CEC2"][index],
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.38)",
                }}
              >
                <p
                  className="text-[62px] font-medium leading-none tracking-[-0.065em] text-zapla-ink sm:text-[66px] lg:text-[72px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  {proof.stat}
                </p>
                <div className="mx-auto mt-4 h-px w-10 bg-zapla-ink/35" />
                <h3
                  className="mt-4 text-[16px] font-semibold text-zapla-ink sm:text-[17px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  {proof.label}
                </h3>
                <p className="mx-auto mt-2 max-w-[280px] text-[13px] leading-[1.55] text-zapla-ink/65">
                  {proof.text}
                </p>
                <p
                  className="mt-auto pt-6 text-[8px] uppercase leading-[1.45] tracking-[0.12em] text-zapla-ink/45"
                  style={{ fontFamily: MONO }}
                >
                  {proof.source}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
