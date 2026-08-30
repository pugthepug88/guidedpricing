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

const INBOUND = [
  { i: 0, x: 5, y: 13, s: 62 },
  { i: 1, x: 12, y: 7, s: 48 },
  { i: 2, x: 20, y: 14, s: 58 },
  { i: 3, x: 28, y: 8, s: 46 },
  { i: 4, x: 36, y: 17, s: 52 },
  { i: 5, x: 7, y: 32, s: 54 },
  { i: 6, x: 15, y: 30, s: 64 },
  { i: 7, x: 24, y: 34, s: 52 },
  { i: 8, x: 34, y: 32, s: 58 },
  { i: 9, x: 5, y: 52, s: 60 },
  { i: 10, x: 13, y: 50, s: 50 },
  { i: 11, x: 22, y: 53, s: 62 },
  { i: 12, x: 32, y: 54, s: 52 },
  { i: 13, x: 8, y: 72, s: 56 },
  { i: 14, x: 18, y: 71, s: 64 },
  { i: 15, x: 30, y: 73, s: 56 },
] as const;

const FADING = [
  { i: 16, x: 40.5, y: 24, s: 45, o: 0.58 },
  { i: 17, x: 43.5, y: 39, s: 40, o: 0.43 },
  { i: 18, x: 46.2, y: 55, s: 35, o: 0.29 },
  { i: 19, x: 49, y: 68, s: 30, o: 0.16 },
] as const;

const SURVIVORS = [
  { i: 20, x: 65, y: 46, s: 54 },
  { i: 21, x: 75, y: 57, s: 62 },
  { i: 22, x: 86, y: 42, s: 54 },
  { i: 23, x: 95, y: 55, s: 60 },
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
  const particles = Array.from({ length: 116 }, (_, n) => {
    const column = n % 29;
    const row = Math.floor(n / 29);
    const progress = column / 28;
    const x = 1 + column * 1.84;
    const spread = 43 - progress * 35;
    const wave = Math.sin(n * 1.73) * spread;
    const rowOffset = (row - 1.5) * 6.5;
    return {
      x,
      y: 50 + wave + rowOffset,
      size: Math.max(2.8, 8.2 - progress * 5.1 + (n % 3) * 0.55),
      opacity: Math.max(0.08, 0.28 - progress * 0.16),
      tone: AUTUMN[(n * 3 + row) % AUTUMN.length],
    };
  });

  const outputParticles = Array.from({ length: 32 }, (_, n) => ({
    x: 58 + (n % 16) * 2.65,
    y: 50 + Math.sin(n * 1.37) * (9 + (n % 4) * 2.5),
    size: 2.5 + (n % 3) * 0.9,
    opacity: 0.07 + (n % 4) * 0.022,
    tone: AUTUMN[(n * 5 + 2) % AUTUMN.length],
  }));

  return (
    <div
      className="relative mx-auto hidden h-[390px] w-full max-w-[1180px] overflow-visible sm:block"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full text-zapla-ink"
        viewBox="0 0 1120 390"
        preserveAspectRatio="none"
        fill="none"
      >
        {[68, 116, 164, 212, 260, 308].map((y, index) => (
          <path
            key={"in-line-" + index}
            d={
              "M -20 " +
              y +
              " C 165 " +
              (y + (index % 2 ? 28 : -20)) +
              ", 380 " +
              (205 + (index - 2.5) * 17) +
              ", 604 195"
            }
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.055"
          />
        ))}
        {[0, 1, 2, 3, 4].map((index) => (
          <path
            key={"out-line-" + index}
            d={
              "M 606 " +
              (180 + index * 8) +
              " C 760 " +
              (140 + index * 24) +
              ", 940 " +
              (245 - index * 19) +
              ", 1140 " +
              (168 + index * 14)
            }
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.065"
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
            boxShadow: "inset 0 -1px 2px rgba(77,51,36,.18)",
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

      <div className="absolute bottom-[5%] left-[54%] top-[5%] w-[54px] -translate-x-1/2">
        <div
          className="absolute inset-0 drop-shadow-[0_18px_26px_rgba(42,49,58,.2)]"
          style={{
            clipPath: "polygon(17% 5%, 83% 0, 83% 100%, 17% 95%)",
            background:
              "linear-gradient(90deg, rgba(111,122,138,.46), rgba(255,255,255,.96) 17%, rgba(244,246,247,.8) 70%, rgba(111,122,138,.4))",
          }}
        >
          <div className="absolute inset-[2px] bg-white/42 backdrop-blur-[4px]" />
          {[31, 40, 49, 58, 67].map((top, index) => (
            <span
              key={"filter-pore-" + index}
              className="absolute h-[4px] w-[4px] rounded-full bg-[#9B7A5F]/55"
              style={{ left: 16 + (index % 2) * 9, top: top + "%" }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-[6%] left-[9px] top-[6%] w-[7px] bg-white/55 blur-[2px]"
          style={{ clipPath: "polygon(25% 4%, 100% 0, 100% 100%, 25% 96%)" }}
        />
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

  const mobileParticles = Array.from({ length: 52 }, (_, n) => {
    const row = n % 13;
    const progress = row / 12;
    return {
      x: 50 + Math.sin(n * 1.51) * (42 - progress * 31),
      y: 4 + row * 3.3 + Math.floor(n / 13) * 1.8,
      size: 2.6 + (n % 3) * 1.15,
      opacity: 0.085 + (n % 4) * 0.03,
      tone: AUTUMN[(n * 3 + row) % AUTUMN.length],
    };
  });

  return (
    <div
      className="relative mx-auto h-[550px] w-full max-w-[390px] overflow-visible sm:hidden"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full text-zapla-ink"
        viewBox="0 0 390 550"
        preserveAspectRatio="none"
        fill="none"
      >
        {[28, 92, 156, 220, 284, 348].map((x, index) => (
          <path
            key={"mobile-line-" + index}
            d={
              "M " +
              x +
              " -10 C " +
              (x + (index % 2 ? 18 : -18)) +
              " 105, " +
              (195 + (index - 2.5) * 9) +
              " 180, 195 264"
            }
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.055"
          />
        ))}
        {[0, 1, 2].map((index) => (
          <path
            key={"mobile-output-line-" + index}
            d={
              "M " +
              (187 + index * 8) +
              " 286 C " +
              (146 + index * 45) +
              " 360, " +
              (120 + index * 74) +
              " 450, " +
              (82 + index * 112) +
              " 565"
            }
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.06"
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
            style={{ left: 12 + col * 25 + "%", top: 7 + row * 15 + "%" }}
          >
            <Avatar person={PEOPLE[i]} size={Math.min(50, s * 0.78)} />
          </div>
        );
      })}

      {mobileFading.map(({ i, s, o }, index) => (
        <div
          key={"mobile-fading-" + index}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: 21 + index * 9.7 + "%",
            top: 42 + index * 1.7 + "%",
          }}
        >
          <Avatar
            person={PEOPLE[i]}
            size={Math.max(22, s * 0.72)}
            opacity={Math.min(0.48, o + 0.08)}
          />
        </div>
      ))}

      <div className="absolute left-[5%] right-[5%] top-1/2 h-[42px] -translate-y-1/2 drop-shadow-[0_14px_24px_rgba(42,49,58,.18)]">
        <div
          className="absolute inset-0 bg-white/65 backdrop-blur-[4px]"
          style={{
            clipPath: "polygon(4% 16%, 96% 16%, 91% 84%, 9% 84%)",
            background:
              "linear-gradient(180deg, rgba(111,122,138,.38), rgba(255,255,255,.96) 28%, rgba(244,246,247,.8) 72%, rgba(111,122,138,.34))",
          }}
        />
        {[31, 41, 51, 61].map((left, index) => (
          <span
            key={"mobile-filter-pore-" + index}
            className="absolute h-[4px] w-[4px] rounded-full bg-[#9B7A5F]/55"
            style={{ left: left + "%", top: 19 + (index % 2) * 10 }}
          />
        ))}
      </div>

      {mobileSurvivors.map(({ i, s }, index) => (
        <div
          key={"mobile-survivor-" + i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: 18 + index * 22 + "%",
            top: 66 + (index % 2) * 13 + "%",
          }}
        >
          <Avatar person={PEOPLE[i]} size={Math.min(55, s * 0.84)} />
        </div>
      ))}
    </div>
  );
}

function FadeFilterVisual() {
  return (
    <div className="mt-8 sm:mt-10">
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
          <header className="mx-auto max-w-[980px] text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zapla-muted"
              style={{ fontFamily: MONO }}
            >
              Where revenue gets lost
            </p>
            <h2
              className="mt-6 text-[36px] leading-[0.99] tracking-[-0.05em] sm:text-[48px] lg:text-[60px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              44% of inbound callers don&apos;t reach a person.
              <span className="text-zapla-muted2">
                {" "}
                That&apos;s only the first step lost.
              </span>
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

        <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-3">
          {PROOF.map((proof, index) => (
            <Reveal
              key={proof.label}
              reduced={reduced}
              delay={0.04 + index * 0.05}
              className="h-full"
            >
              <article
                className="flex min-h-[292px] h-full flex-col items-center rounded-[30px] px-7 py-9 text-center sm:min-h-[320px] sm:px-8 sm:py-10 lg:px-10"
                style={{
                  backgroundColor: ["#E7D8C5", "#DCE0CC", "#E7CEC2"][index],
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.38)",
                }}
              >
                <p
                  className="text-[64px] font-medium leading-none tracking-[-0.065em] text-zapla-ink sm:text-[68px] lg:text-[76px]"
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
