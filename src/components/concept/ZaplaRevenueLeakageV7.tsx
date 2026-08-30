import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;
const BRAND_BLUE = "#2563ff";

const AUTUMN = [
  "#D7C5A7", // oatmeal
  "#B9B49B", // muted sage
  "#D9A58D", // dusty peach
  "#C7B39A", // mushroom
  "#C98F72", // soft clay
  "#A9AE91", // olive sage
  "#D3B07D", // camel
  "#BDA99A", // warm taupe
] as const;

type Person = {
  src: string;
  bg: (typeof AUTUMN)[number];
};

/*
 * Single-person professional headshots only. The Soft Autumn colour belongs
 * inside each avatar, behind the portrait. The portrait edges are softly
 * masked so the warm background reads as part of the avatar rather than a ring.
 */
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
];

const LEFT = [
  { i: 0, x: 4, y: 14, s: 68 },
  { i: 1, x: 15, y: 7, s: 58 },
  { i: 2, x: 28, y: 15, s: 64 },
  { i: 3, x: 9, y: 37, s: 56 },
  { i: 4, x: 20, y: 31, s: 64 },
  { i: 5, x: 33, y: 34, s: 54 },
  { i: 6, x: 2, y: 61, s: 60 },
  { i: 7, x: 14, y: 57, s: 66 },
  { i: 8, x: 27, y: 58, s: 58 },
  { i: 9, x: 37, y: 54, s: 56 },
  { i: 10, x: 8, y: 82, s: 54 },
  { i: 11, x: 20, y: 80, s: 58 },
  { i: 12, x: 31, y: 82, s: 64 },
  { i: 13, x: 40, y: 77, s: 50 },
  { i: 14, x: 24, y: 11, s: 50 },
  { i: 15, x: 36, y: 18, s: 48 },
] as const;

/* Seven of sixteen inbound people fade toward the checkpoint: 43.75% ≈ 44%. */
const FADE = [
  { i: 1, x: 40.5, y: 22, s: 50, o: 0.46 },
  { i: 4, x: 43.5, y: 40, s: 54, o: 0.34 },
  { i: 6, x: 45.8, y: 60, s: 49, o: 0.26 },
  { i: 8, x: 47.8, y: 30, s: 46, o: 0.2 },
  { i: 11, x: 49.1, y: 72, s: 44, o: 0.15 },
  { i: 13, x: 50.2, y: 47, s: 40, o: 0.11 },
  { i: 15, x: 51.1, y: 57, s: 36, o: 0.07 },
] as const;

/* The nine people who make it through stay crisp on the right. */
const RIGHT = [
  { i: 0, x: 63, y: 15, s: 64 },
  { i: 2, x: 76, y: 11, s: 58 },
  { i: 3, x: 91, y: 18, s: 62 },
  { i: 5, x: 59, y: 43, s: 56 },
  { i: 7, x: 72, y: 39, s: 64 },
  { i: 9, x: 86, y: 42, s: 56 },
  { i: 10, x: 65, y: 72, s: 58 },
  { i: 12, x: 79, y: 70, s: 64 },
  { i: 14, x: 94, y: 72, s: 56 },
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

function Reveal({ children, reduced, delay = 0, className = "" }: { children: React.ReactNode; reduced: boolean; delay?: number; className?: string }) {
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

function Avatar({ person, size, opacity = 1 }: { person: Person; size: number; opacity?: number }) {
  return (
    <div
      className="relative overflow-hidden rounded-full shadow-[0_7px_22px_rgba(17,19,24,0.07)] ring-1 ring-black/[0.05]"
      style={{ width: size, height: size, backgroundColor: person.bg, opacity }}
    >
      <img
        src={person.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center saturate-[0.88] contrast-[0.98]"
        loading="lazy"
        referrerPolicy="no-referrer"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse 78% 92% at 50% 54%, #000 47%, rgba(0,0,0,.9) 68%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 78% 92% at 50% 54%, #000 47%, rgba(0,0,0,.9) 68%, transparent 100%)",
        }}
      />
    </div>
  );
}

function DesktopFadeFilter() {
  const streamDots = Array.from({ length: 44 }, (_, n) => {
    const band = n % 11;
    const row = Math.floor(n / 11);
    const x = 39 + band * 1.35;
    const center = 50;
    const spread = Math.max(4, 24 - band * 1.7);
    const y = center + Math.sin((n + 2) * 1.61) * spread + (row - 1.5) * 3;
    const opacity = Math.max(0.06, 0.28 - band * 0.018);
    return { x, y, opacity, size: 2 + (n % 3) };
  });

  return (
    <div className="relative mx-auto hidden h-[340px] w-full max-w-[1120px] overflow-hidden sm:block" aria-hidden="true">
      {LEFT.map(({ i, x, y, s }) => (
        <div key={`left-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <Avatar person={PEOPLE[i]} size={s} />
        </div>
      ))}

      {streamDots.map((dot, index) => (
        <span
          key={`dot-${index}`}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            backgroundColor: index % 5 === 0 ? BRAND_BLUE : "#C9A68D",
          }}
        />
      ))}

      {FADE.map(({ i, x, y, s, o }) => (
        <div key={`fade-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <Avatar person={PEOPLE[i]} size={s} opacity={o} />
        </div>
      ))}

      <div className="absolute bottom-[4%] left-[54%] top-[4%] w-[2px] rounded-full" style={{ backgroundColor: BRAND_BLUE }} />

      {RIGHT.map(({ i, x, y, s }) => (
        <div key={`right-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <Avatar person={PEOPLE[i]} size={s} />
        </div>
      ))}
    </div>
  );
}

function MobileFadeFilter() {
  const entrants = LEFT.slice(0, 8);
  const lost = FADE.slice(0, 4);
  const passed = RIGHT.slice(0, 5);

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[390px] overflow-hidden sm:hidden" aria-hidden="true">
      {entrants.map(({ i, x, y, s }, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        return (
          <div key={`m-left-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${14 + col * 24}%`, top: `${10 + row * 17}%` }}>
            <Avatar person={PEOPLE[i]} size={Math.min(52, s * 0.78)} />
          </div>
        );
      })}

      {lost.map(({ i, o }, index) => (
        <div key={`m-fade-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${25 + index * 17}%`, top: `${39 + index * 3}%` }}>
          <Avatar person={PEOPLE[i]} size={42 - index * 2} opacity={o} />
        </div>
      ))}

      <div className="absolute left-[5%] right-[5%] top-1/2 h-[2px] rounded-full" style={{ backgroundColor: BRAND_BLUE }} />

      {passed.map(({ i, s }, index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        return (
          <div key={`m-right-${i}`} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${20 + col * 30}%`, top: `${67 + row * 18}%` }}>
            <Avatar person={PEOPLE[i]} size={Math.min(54, s * 0.82)} />
          </div>
        );
      })}
    </div>
  );
}

function FadeFilterVisual() {
  return (
    <div className="mt-9 sm:mt-12">
      <DesktopFadeFilter />
      <MobileFadeFilter />
    </div>
  );
}

export function ZaplaRevenueLeakageV7() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="Where revenue gets lost" className="bg-zapla-paper text-zapla-ink">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-24 lg:py-28">
        <Reveal reduced={reduced}>
          <header className="mx-auto max-w-[980px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zapla-muted" style={{ fontFamily: MONO }}>
              Where revenue gets lost
            </p>
            <h2
              className="mt-6 text-[36px] leading-[0.99] tracking-[-0.05em] sm:text-[48px] lg:text-[60px]"
              style={{ fontFamily: DISPLAY, fontWeight: 500 }}
            >
              44% of inbound callers don't reach a person.
              <span className="text-zapla-muted2"> That's only the first step lost.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[760px] text-[16px] leading-[1.58] text-zapla-muted sm:text-[18px]">
              Missed calls are only the start. Leads aren't asked to book. Slow service sends customers elsewhere. Review responses influence which local business customers choose.
            </p>
            <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-zapla-muted2" style={{ fontFamily: MONO }}>
              Invoca · 2026 · 70M+ calls
            </p>
          </header>
        </Reveal>

        <FadeFilterVisual />

        <div className="mt-8 grid gap-9 border-t border-zapla-line pt-9 sm:mt-10 sm:grid-cols-3 sm:gap-8 sm:pt-10 lg:gap-14">
          {PROOF.map((proof, index) => (
            <Reveal key={proof.label} reduced={reduced} delay={0.04 + index * 0.05}>
              <article>
                <h3 className="text-[17px] font-semibold text-zapla-ink" style={{ fontFamily: DISPLAY }}>{proof.label}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-zapla-muted">
                  <span className="mr-1.5 text-[31px] font-medium leading-none tracking-[-0.04em] text-zapla-ink" style={{ fontFamily: DISPLAY }}>{proof.stat}</span>
                  {proof.text}
                </p>
                <p className="mt-4 text-[9px] uppercase leading-[1.45] tracking-[0.12em] text-zapla-muted2" style={{ fontFamily: MONO }}>{proof.source}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
