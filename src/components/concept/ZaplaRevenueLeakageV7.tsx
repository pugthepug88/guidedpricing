import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;
const BRAND_BLUE = "#2563FF";

const AUTUMN = [
  "#D7C5A7",
  "#B9B49B",
  "#D9A58D",
  "#C7B39A",
  "#C98F72",
  "#A9AE91",
  "#D3B07D",
  "#BDA99A",
] as const;

type Person = {
  src: string;
  bg: (typeof AUTUMN)[number];
};

const PEOPLE: Person[] = [
  { src: "https://randomuser.me/api/portraits/women/44.jpg", bg: AUTUMN[1] },
  { src: "https://randomuser.me/api/portraits/men/32.jpg", bg: AUTUMN[0] },
  { src: "https://randomuser.me/api/portraits/women/65.jpg", bg: AUTUMN[2] },
  { src: "https://randomuser.me/api/portraits/men/52.jpg", bg: AUTUMN[5] },
  { src: "https://randomuser.me/api/portraits/women/33.jpg", bg: AUTUMN[6] },
  { src: "https://randomuser.me/api/portraits/men/75.jpg", bg: AUTUMN[3] },
  { src: "https://randomuser.me/api/portraits/women/68.jpg", bg: AUTUMN[4] },
  { src: "https://randomuser.me/api/portraits/men/41.jpg", bg: AUTUMN[1] },
  { src: "https://randomuser.me/api/portraits/women/12.jpg", bg: AUTUMN[7] },
  { src: "https://randomuser.me/api/portraits/men/24.jpg", bg: AUTUMN[6] },
  { src: "https://randomuser.me/api/portraits/women/5.jpg", bg: AUTUMN[0] },
  { src: "https://randomuser.me/api/portraits/men/18.jpg", bg: AUTUMN[4] },
  { src: "https://randomuser.me/api/portraits/women/79.jpg", bg: AUTUMN[5] },
  { src: "https://randomuser.me/api/portraits/men/67.jpg", bg: AUTUMN[3] },
  { src: "https://randomuser.me/api/portraits/women/22.jpg", bg: AUTUMN[2] },
  { src: "https://randomuser.me/api/portraits/men/46.jpg", bg: AUTUMN[7] },
  { src: "https://randomuser.me/api/portraits/women/55.jpg", bg: AUTUMN[1] },
  { src: "https://randomuser.me/api/portraits/men/64.jpg", bg: AUTUMN[0] },
  { src: "https://randomuser.me/api/portraits/women/26.jpg", bg: AUTUMN[4] },
  { src: "https://randomuser.me/api/portraits/men/54.jpg", bg: AUTUMN[5] },
  { src: "https://randomuser.me/api/portraits/women/40.jpg", bg: AUTUMN[6] },
  { src: "https://randomuser.me/api/portraits/men/78.jpg", bg: AUTUMN[3] },
  { src: "https://randomuser.me/api/portraits/women/70.jpg", bg: AUTUMN[2] },
  { src: "https://randomuser.me/api/portraits/men/36.jpg", bg: AUTUMN[7] },
];

const INBOUND = [
  { i: 0, x: 1, y: 13, s: 68 },
  { i: 1, x: 8, y: 5, s: 50 },
  { i: 2, x: 16, y: 14, s: 58 },
  { i: 3, x: 24, y: 7, s: 46 },
  { i: 4, x: 32, y: 15, s: 52 },
  { i: 5, x: 5, y: 31, s: 56 },
  { i: 6, x: 13, y: 29, s: 66 },
  { i: 7, x: 22, y: 32, s: 54 },
  { i: 8, x: 31, y: 29, s: 60 },
  { i: 9, x: 39, y: 35, s: 46 },
  { i: 10, x: 0, y: 50, s: 64 },
  { i: 11, x: 9, y: 48, s: 52 },
  { i: 12, x: 18, y: 49, s: 64 },
  { i: 13, x: 27, y: 52, s: 50 },
  { i: 14, x: 36, y: 52, s: 58 },
  { i: 15, x: 6, y: 69, s: 58 },
  { i: 16, x: 15, y: 68, s: 66 },
  { i: 17, x: 24, y: 71, s: 54 },
  { i: 18, x: 33, y: 68, s: 62 },
  { i: 19, x: 41, y: 67, s: 46 },
  { i: 20, x: 1, y: 88, s: 64 },
  { i: 21, x: 11, y: 84, s: 54 },
  { i: 22, x: 21, y: 89, s: 60 },
  { i: 23, x: 32, y: 85, s: 52 },
] as const;

const FADING = [
  { i: 2, x: 40.5, y: 18, s: 46, o: 0.58 },
  { i: 8, x: 42.3, y: 31, s: 44, o: 0.5 },
  { i: 12, x: 43.7, y: 44, s: 44, o: 0.42 },
  { i: 16, x: 45.1, y: 58, s: 42, o: 0.35 },
  { i: 20, x: 46.4, y: 71, s: 40, o: 0.29 },
  { i: 5, x: 47.4, y: 27, s: 38, o: 0.25 },
  { i: 10, x: 48.4, y: 40, s: 36, o: 0.21 },
  { i: 14, x: 49.4, y: 53, s: 34, o: 0.17 },
  { i: 18, x: 50.3, y: 66, s: 32, o: 0.13 },
  { i: 22, x: 51.2, y: 35, s: 30, o: 0.1 },
  { i: 7, x: 52.1, y: 49, s: 28, o: 0.07 },
  { i: 19, x: 53, y: 59, s: 24, o: 0.04 },
] as const;

const SURVIVORS = [
  { i: 0, x: 64, y: 45, s: 54 },
  { i: 3, x: 69.5, y: 57, s: 62 },
  { i: 6, x: 75, y: 38, s: 52 },
  { i: 9, x: 80.5, y: 52, s: 60 },
  { i: 11, x: 86, y: 43, s: 54 },
  { i: 15, x: 91, y: 57, s: 64 },
  { i: 21, x: 96, y: 42, s: 52 },
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
  return (
    <div
      className="relative overflow-hidden rounded-full shadow-[0_8px_24px_rgba(17,19,24,0.08)] ring-1 ring-black/[0.055]"
      style={{ width: size, height: size, backgroundColor: person.bg, opacity }}
    >
      <img
        src={person.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-[1.05] object-cover object-center saturate-[0.84] contrast-[0.98]"
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 94% at 50% 54%, #000 49%, rgba(0,0,0,.92) 70%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 80% 94% at 50% 54%, #000 49%, rgba(0,0,0,.92) 70%, transparent 100%)",
        }}
      />
    </div>
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
      size: Math.max(1.5, 5 - progress * 3.2 + (n % 3) * 0.45),
      opacity: Math.max(0.045, 0.18 - progress * 0.11),
    };
  });

  const outputParticles = Array.from({ length: 32 }, (_, n) => ({
    x: 58 + (n % 16) * 2.65,
    y: 50 + Math.sin(n * 1.37) * (9 + (n % 4) * 2.5),
    size: 1.5 + (n % 3),
    opacity: 0.055 + (n % 4) * 0.018,
  }));

  return (
    <div
      className="relative mx-auto hidden h-[390px] w-full max-w-[1180px] overflow-hidden sm:block"
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
          className="absolute rounded-full bg-zapla-ink"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
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

      <div
        className="absolute bottom-[6%] left-[54%] top-[6%] w-[2px] rounded-full shadow-[0_0_18px_rgba(37,99,255,0.24)]"
        style={{ backgroundColor: BRAND_BLUE }}
      />

      {outputParticles.map((dot, index) => (
        <span
          key={"output-particle-" + index}
          className="absolute rounded-full bg-zapla-ink"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
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
  const mobileFading = FADING.slice(3, 10);
  const mobileSurvivors = SURVIVORS.slice(0, 4);

  const mobileParticles = Array.from({ length: 52 }, (_, n) => {
    const row = n % 13;
    const progress = row / 12;
    return {
      x: 50 + Math.sin(n * 1.51) * (42 - progress * 31),
      y: 4 + row * 3.3 + Math.floor(n / 13) * 1.8,
      size: 1.5 + (n % 3),
      opacity: 0.06 + (n % 4) * 0.025,
    };
  });

  return (
    <div
      className="relative mx-auto h-[550px] w-full max-w-[390px] overflow-hidden sm:hidden"
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
          className="absolute rounded-full bg-zapla-ink"
          style={{
            left: dot.x + "%",
            top: dot.y + "%",
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
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

      <div
        className="absolute left-[7%] right-[7%] top-1/2 h-[2px] rounded-full shadow-[0_0_16px_rgba(37,99,255,0.22)]"
        style={{ backgroundColor: BRAND_BLUE }}
      />

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

        <div className="mt-5 grid border-y border-zapla-line sm:mt-7 sm:grid-cols-3">
          {PROOF.map((proof, index) => (
            <Reveal
              key={proof.label}
              reduced={reduced}
              delay={0.04 + index * 0.05}
              className={
                "py-8 text-center sm:px-8 sm:py-10 lg:px-12 " +
                (index > 0
                  ? "border-t border-zapla-line sm:border-l sm:border-t-0"
                  : "")
              }
            >
              <article>
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
                <p className="mx-auto mt-2 max-w-[280px] text-[13px] leading-[1.55] text-zapla-muted">
                  {proof.text}
                </p>
                <p
                  className="mt-4 text-[8px] uppercase leading-[1.45] tracking-[0.12em] text-zapla-muted2"
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
