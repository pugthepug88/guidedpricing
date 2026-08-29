import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;

type Point = { fromX: number; fromY: number; toX: number; toY: number };

type Person = {
  src: string;
  size: number;
  lost: boolean;
  fade?: number;
  blur?: number;
  desktop: Point;
  mobile: Point;
};

const avatar = (id: number) => `https://i.pravatar.cc/160?img=${id}`;

/* 16 inbound people. 7 fade before the line, 9 make it through: 7 / 16 = 43.75%. */
const PEOPLE: Person[] = [
  { src: avatar(1), size: 58, lost: false, desktop: { fromX: 4, fromY: 15, toX: 62, toY: 13 }, mobile: { fromX: 11, fromY: 4, toX: 14, toY: 62 } },
  { src: avatar(5), size: 46, lost: true, fade: 0.38, blur: 0.4, desktop: { fromX: 11, fromY: 6, toX: 31, toY: 9 }, mobile: { fromX: 32, fromY: 5, toX: 27, toY: 34 } },
  { src: avatar(7), size: 52, lost: false, desktop: { fromX: 18, fromY: 26, toX: 70, toY: 27 }, mobile: { fromX: 55, fromY: 5, toX: 38, toY: 66 } },
  { src: avatar(9), size: 56, lost: true, fade: 0.31, blur: 0.8, desktop: { fromX: 27, fromY: 12, toX: 36, toY: 25 }, mobile: { fromX: 79, fromY: 5, toX: 73, toY: 37 } },
  { src: avatar(11), size: 62, lost: false, desktop: { fromX: 36, fromY: 20, toX: 82, toY: 16 }, mobile: { fromX: 20, fromY: 16, toX: 82, toY: 62 } },
  { src: avatar(12), size: 44, lost: false, desktop: { fromX: 7, fromY: 47, toX: 59, toY: 47 }, mobile: { fromX: 42, fromY: 17, toX: 26, toY: 77 } },
  { src: avatar(13), size: 50, lost: true, fade: 0.25, blur: 1.2, desktop: { fromX: 16, fromY: 57, toX: 40, toY: 44 }, mobile: { fromX: 66, fromY: 17, toX: 60, toY: 41 } },
  { src: avatar(15), size: 54, lost: false, desktop: { fromX: 25, fromY: 43, toX: 74, toY: 52 }, mobile: { fromX: 88, fromY: 18, toX: 90, toY: 69 } },
  { src: avatar(17), size: 42, lost: true, fade: 0.2, blur: 1.7, desktop: { fromX: 34, fromY: 55, toX: 43, toY: 66 }, mobile: { fromX: 9, fromY: 30, toX: 16, toY: 44 } },
  { src: avatar(19), size: 60, lost: false, desktop: { fromX: 41, fromY: 42, toX: 88, toY: 41 }, mobile: { fromX: 31, fromY: 30, toX: 58, toY: 74 } },
  { src: avatar(21), size: 48, lost: false, desktop: { fromX: 4, fromY: 78, toX: 64, toY: 79 }, mobile: { fromX: 54, fromY: 29, toX: 12, toY: 88 } },
  { src: avatar(23), size: 58, lost: true, fade: 0.16, blur: 2.1, desktop: { fromX: 14, fromY: 80, toX: 46, toY: 82 }, mobile: { fromX: 80, fromY: 30, toX: 84, toY: 46 } },
  { src: avatar(25), size: 52, lost: false, desktop: { fromX: 23, fromY: 72, toX: 79, toY: 73 }, mobile: { fromX: 17, fromY: 40, toX: 39, toY: 91 } },
  { src: avatar(27), size: 44, lost: true, fade: 0.11, blur: 2.8, desktop: { fromX: 31, fromY: 89, toX: 48, toY: 54 }, mobile: { fromX: 40, fromY: 40, toX: 43, toY: 47 } },
  { src: avatar(29), size: 56, lost: false, desktop: { fromX: 39, fromY: 77, toX: 91, toY: 69 }, mobile: { fromX: 62, fromY: 39, toX: 70, toY: 87 } },
  { src: avatar(31), size: 48, lost: true, fade: 0.07, blur: 3.6, desktop: { fromX: 45, fromY: 64, toX: 49.2, toY: 29 }, mobile: { fromX: 86, fromY: 40, toX: 89, toY: 49 } },
];

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

function Portrait({ person, layout, reduced, index }: { person: Person; layout: "desktop" | "mobile"; reduced: boolean; index: number }) {
  const position = person[layout];
  const size = layout === "mobile" ? person.size * 0.78 : person.size;
  const finalState = person.lost
    ? {
        left: `${position.toX}%`,
        top: `${position.toY}%`,
        opacity: person.fade ?? 0.16,
        scale: 0.84,
        filter: `blur(${person.blur ?? 2}px) saturate(0.72)`,
      }
    : {
        left: `${position.toX}%`,
        top: `${position.toY}%`,
        opacity: 1,
        scale: 1,
        filter: "blur(0px) saturate(1)",
      };

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size, left: `${position.fromX}%`, top: `${position.fromY}%` }}
      initial={reduced ? finalState : { left: `${position.fromX}%`, top: `${position.fromY}%`, opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" }}
      whileInView={finalState}
      viewport={{ once: true, amount: layout === "desktop" ? 0.4 : 0.28 }}
      transition={{ duration: person.lost ? 1.25 : 1.65, delay: reduced ? 0 : 0.1 + index * 0.025, ease: EASE }}
    >
      <div className="h-full w-full overflow-hidden rounded-full border border-white bg-white shadow-[0_8px_26px_rgba(17,19,24,0.08)] ring-1 ring-zapla-line">
        <img
          src={person.src}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}

function FadeFilterVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-9 sm:mt-12" aria-hidden="true">
      <div className="relative mx-auto hidden h-[310px] w-full max-w-[1080px] overflow-hidden sm:block">
        <motion.div
          className="absolute bottom-[5%] left-1/2 top-[5%] w-px"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.34) 18%, rgba(6,182,212,0.34) 82%, transparent)" }}
          initial={reduced ? false : { opacity: 0, scaleY: 0.55 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        {PEOPLE.map((person, index) => (
          <Portrait key={person.src} person={person} layout="desktop" reduced={reduced} index={index} />
        ))}
      </div>

      <div className="relative mx-auto h-[470px] w-full max-w-[390px] overflow-hidden sm:hidden">
        <motion.div
          className="absolute left-[4%] right-[4%] top-1/2 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.34) 18%, rgba(6,182,212,0.34) 82%, transparent)" }}
          initial={reduced ? false : { opacity: 0, scaleX: 0.55 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.32 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        {PEOPLE.map((person, index) => (
          <Portrait key={person.src} person={person} layout="mobile" reduced={reduced} index={index} />
        ))}
      </div>
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

        <FadeFilterVisual reduced={reduced} />

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
