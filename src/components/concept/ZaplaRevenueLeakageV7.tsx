import { motion, useReducedMotion } from "motion/react";
import { FACE } from "@/components/v5/faces";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;

type Person = {
  src: string;
  lost: boolean;
  size: number;
  desktop: { fromX: number; fromY: number; toX: number; toY: number };
  mobile: { fromX: number; fromY: number; toX: number; toY: number };
};

const PEOPLE: Person[] = [
  { src: FACE.maya, lost: false, size: 62, desktop: { fromX: 4, fromY: 17, toX: 66, toY: 17 }, mobile: { fromX: 8, fromY: 6, toX: 17, toY: 65 } },
  { src: FACE.daniel, lost: true, size: 48, desktop: { fromX: 12, fromY: 4, toX: 42, toY: 10 }, mobile: { fromX: 30, fromY: 3, toX: 35, toY: 39 } },
  { src: FACE.priya, lost: false, size: 54, desktop: { fromX: 19, fromY: 28, toX: 76, toY: 31 }, mobile: { fromX: 52, fromY: 7, toX: 46, toY: 62 } },
  { src: FACE.tom, lost: true, size: 58, desktop: { fromX: 27, fromY: 10, toX: 45, toY: 18 }, mobile: { fromX: 76, fromY: 5, toX: 69, toY: 40 } },
  { src: FACE.sophie, lost: false, size: 68, desktop: { fromX: 35, fromY: 22, toX: 88, toY: 20 }, mobile: { fromX: 19, fromY: 18, toX: 79, toY: 70 } },
  { src: FACE.leo, lost: false, size: 46, desktop: { fromX: 7, fromY: 47, toX: 61, toY: 52 }, mobile: { fromX: 42, fromY: 17, toX: 29, toY: 78 } },
  { src: FACE.alex, lost: true, size: 52, desktop: { fromX: 16, fromY: 58, toX: 43, toY: 55 }, mobile: { fromX: 66, fromY: 18, toX: 64, toY: 42 } },
  { src: FACE.jordan, lost: false, size: 58, desktop: { fromX: 24, fromY: 45, toX: 72, toY: 59 }, mobile: { fromX: 88, fromY: 17, toX: 89, toY: 62 } },
  { src: FACE.nina, lost: true, size: 44, desktop: { fromX: 33, fromY: 54, toX: 45, toY: 61 }, mobile: { fromX: 8, fromY: 30, toX: 16, toY: 41 } },
  { src: FACE.sam, lost: false, size: 64, desktop: { fromX: 42, fromY: 43, toX: 84, toY: 50 }, mobile: { fromX: 31, fromY: 29, toX: 58, toY: 73 } },
  { src: "/concept/cinematic-v5/agent.jpg", lost: false, size: 50, desktop: { fromX: 3, fromY: 77, toX: 65, toY: 82 }, mobile: { fromX: 54, fromY: 30, toX: 12, toY: 88 } },
  { src: "/concept/cinematic-v5/dentist.jpg", lost: true, size: 64, desktop: { fromX: 14, fromY: 79, toX: 41, toY: 77 }, mobile: { fromX: 80, fromY: 29, toX: 82, toY: 41 } },
  { src: "/concept/cinematic-v5/mechanic.jpg", lost: false, size: 56, desktop: { fromX: 23, fromY: 72, toX: 77, toY: 79 }, mobile: { fromX: 17, fromY: 40, toX: 40, toY: 91 } },
  { src: "/concept/cinematic-v5/photographer.jpg", lost: true, size: 46, desktop: { fromX: 31, fromY: 88, toX: 44, toY: 84 }, mobile: { fromX: 40, fromY: 40, toX: 43, toY: 43 } },
  { src: "/concept/cinematic-v5/physio.jpg", lost: false, size: 60, desktop: { fromX: 39, fromY: 76, toX: 90, toY: 74 }, mobile: { fromX: 62, fromY: 39, toX: 69, toY: 86 } },
  { src: "/concept/cinematic-v5/vet.jpg", lost: true, size: 54, desktop: { fromX: 47, fromY: 63, toX: 47, toY: 67 }, mobile: { fromX: 86, fromY: 39, toX: 88, toY: 44 } },
];

const PROOF = [
  {
    label: "Never asked",
    stat: "64%",
    text: "of businesses don't ask the lead to buy or book — even when the lead shows up.",
    source: "Invoca · 2026",
  },
  {
    label: "Too slow",
    stat: "79%",
    text: "of customers would take their business elsewhere after poor or slow service.",
    source: "ServiceNow / Lonergan Research · Australian consumers",
  },
  {
    label: "Reviews unanswered",
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
  const finalState = person.lost
    ? { left: `${position.toX}%`, top: `${position.toY}%`, opacity: 0, scale: 0.82, filter: "blur(3px)" }
    : { left: `${position.toX}%`, top: `${position.toY}%`, opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ width: person.size, height: person.size, left: `${position.fromX}%`, top: `${position.fromY}%` }}
      initial={reduced ? finalState : { left: `${position.fromX}%`, top: `${position.fromY}%`, opacity: 1, scale: 1, filter: "blur(0px)" }}
      whileInView={finalState}
      viewport={{ once: true, amount: layout === "desktop" ? 0.45 : 0.3 }}
      transition={{ duration: person.lost ? 1.35 : 1.8, delay: reduced ? 0 : 0.15 + index * 0.025, ease: EASE }}
    >
      <img
        src={person.src}
        alt=""
        aria-hidden="true"
        className="h-full w-full rounded-full object-cover ring-1 ring-zapla-line"
        loading="lazy"
      />
    </motion.div>
  );
}

function FadeFilterVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-12 sm:mt-16" aria-hidden="true">
      <div className="relative mx-auto hidden h-[390px] w-full max-w-[1080px] overflow-hidden sm:block">
        <motion.div
          className="absolute bottom-[3%] left-1/2 top-[3%] w-px bg-zapla-cyan/40"
          initial={reduced ? false : { opacity: 0, scaleY: 0.4 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        {PEOPLE.map((person, index) => <Portrait key={`${person.src}-${index}`} person={person} layout="desktop" reduced={reduced} index={index} />)}
      </div>

      <div className="relative mx-auto h-[610px] w-full max-w-[390px] overflow-hidden sm:hidden">
        <motion.div
          className="absolute left-[3%] right-[3%] top-1/2 h-px bg-zapla-cyan/40"
          initial={reduced ? false : { opacity: 0, scaleX: 0.4 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
        {PEOPLE.map((person, index) => <Portrait key={`${person.src}-${index}`} person={person} layout="mobile" reduced={reduced} index={index} />)}
      </div>
    </div>
  );
}

export function ZaplaRevenueLeakageV7() {
  const reduced = !!useReducedMotion();

  return (
    <section aria-label="The cost of no follow-through" className="bg-zapla-paper text-zapla-ink">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
        <Reveal reduced={reduced}>
          <header className="mx-auto max-w-[920px] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zapla-muted" style={{ fontFamily: MONO }}>
              The cost of no follow-through
            </p>
            <h2 className="mt-6 text-[34px] leading-[1.07] sm:text-[46px] lg:text-[56px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              44% of inbound callers don't reach a person.
              <span className="text-zapla-muted2"> That's only the first step lost.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-[700px] text-[16px] leading-[1.6] text-zapla-muted sm:text-[18px]">
              And it doesn't stop at the phone. Leads aren't asked to book. Slow service sends customers elsewhere. Reviews go unanswered.
            </p>
            <p className="mt-4 text-[9px] uppercase tracking-[0.16em] text-zapla-muted2" style={{ fontFamily: MONO }}>
              Invoca · 2026 · 70M+ calls
            </p>
          </header>
        </Reveal>

        <FadeFilterVisual reduced={reduced} />

        <div className="mt-12 grid gap-10 border-t border-zapla-line pt-10 sm:mt-16 sm:grid-cols-3 sm:gap-8 sm:pt-12 lg:gap-14">
          {PROOF.map((proof, index) => (
            <Reveal key={proof.label} reduced={reduced} delay={0.05 + index * 0.06}>
              <article>
                <h3 className="text-[17px] font-semibold text-zapla-ink" style={{ fontFamily: DISPLAY }}>{proof.label}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-zapla-muted">
                  <span className="mr-1.5 text-[30px] font-medium leading-none text-zapla-ink" style={{ fontFamily: DISPLAY }}>{proof.stat}</span>
                  {proof.text}
                </p>
                <p className="mt-4 text-[9px] uppercase leading-[1.45] tracking-[0.12em] text-zapla-muted2" style={{ fontFamily: MONO }}>{proof.source}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal reduced={reduced} className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-[790px] text-center">
            <p className="text-[26px] leading-[1.2] text-zapla-ink sm:text-[34px]" style={{ fontFamily: DISPLAY, fontWeight: 600 }}>
              The opportunity was already there. The next step wasn't.
            </p>
            <p className="mx-auto mt-4 max-w-[650px] text-[18px] leading-[1.5] text-zapla-muted sm:text-[21px]" style={{ fontFamily: DISPLAY }}>
              Zapla keeps customers moving from first contact to booked, paid and returning.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}