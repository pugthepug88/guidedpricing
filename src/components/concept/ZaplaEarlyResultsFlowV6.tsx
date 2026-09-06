import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const DISPLAY = '"EB Garamond", "Cormorant Garamond", Georgia, serif';
const BODY = '"Figtree", Inter, "Plus Jakarta Sans", Manrope, system-ui, sans-serif';
const BROKER_IMAGE = "/concept/cinematic-v5/broker.jpg";

const INK = "#1A1A1A";
const CREAM = "#FFFFEB";
const STONE = "#E4E4D0";
const LAVENDER = "#F0D7FF";
const ORANGE = "#FFA946";
const GREEN = "#48DFA0";
const RED = "#F15D50";
const LIGHT_PAGE = "#F7F4E6";

type CardKind = "caseStudy" | "press" | "photo" | "green" | "pressAlt" | "closing";

type ResultCard = {
  id: string;
  kind: CardKind;
  tone: string;
  width: string;
  aspectRatio: string;
  quote: string;
  label?: string;
  kicker?: string;
  image?: string;
};

type MotionPath = {
  input: number[];
  x: string[];
  y: string[];
  rotate: number[];
  scale: number[];
  z: number[];
  frontStart: number;
  frontEnd: number;
};

const RESULT_CARDS: ResultCard[] = [
  {
    id: "broker",
    kind: "caseStudy",
    tone: LAVENDER,
    width: "min(1168px, 81.1vw)",
    aspectRatio: "1168 / 706",
    kicker: "MORTGAGE BROKER · EARLY CUSTOMER RESULT",
    quote: "4 deals closed in 17 days. Two more opportunities were still active.",
    label: "Read the early result",
    image: BROKER_IMAGE,
  },
  {
    id: "existing-opportunities",
    kind: "press",
    tone: CREAM,
    width: "min(684px, 47.5vw)",
    aspectRatio: "1 / 1",
    quote: "The opportunities were already there.",
    label: "WHAT CHANGED",
  },
  {
    id: "two-active",
    kind: "photo",
    tone: ORANGE,
    width: "min(716px, 49.7vw)",
    aspectRatio: "1 / 1",
    quote: "2 more opportunities were still active after the same 17-day period.",
    label: "STILL MOVING",
    image: BROKER_IMAGE,
  },
  {
    id: "follow-through",
    kind: "green",
    tone: GREEN,
    width: "min(1142px, 79.3vw)",
    aspectRatio: "1142 / 704",
    quote: "Consistent follow-through changed what happened next.",
    label: "FOLLOW-THROUGH",
    image: BROKER_IMAGE,
  },
  {
    id: "why-it-matters",
    kind: "pressAlt",
    tone: STONE,
    width: "min(690px, 47.9vw)",
    aspectRatio: "1 / 1",
    quote: "Not more leads. Better follow-through on the opportunities already there.",
    label: "WHY IT MATTERS",
  },
  {
    id: "summary",
    kind: "closing",
    tone: RED,
    width: "min(1172px, 81.4vw)",
    aspectRatio: "1172 / 706",
    quote: "Follow-through, measured.",
    label: "EARLY CUSTOMER RESULT",
  },
];

/*
 * Choreography follows the Wispr testimonials sequence: every card exists as a
 * physical object below / lower-left of the viewport, rises into a centred hero
 * beat, then leaves through the upper-right with the rotation arriving late.
 * The later cards are staggered so an incoming card is already visible while the
 * outgoing card still owns the foreground.
 */
const MOTION_PATHS: MotionPath[] = [
  {
    input: [0, 0.035, 0.075, 0.115, 0.16, 0.205, 0.255, 0.315],
    x: ["-13vw", "-9vw", "-3vw", "0vw", "1vw", "10vw", "39vw", "82vw"],
    y: ["82vh", "60vh", "28vh", "6vh", "-1vh", "-7vh", "-31vh", "-79vh"],
    rotate: [0, 0, 0, 0, 0, -0.35, -3.9, -8.6],
    scale: [0.975, 0.988, 0.997, 1, 1, 1, 0.994, 0.975],
    z: [-115, -70, -22, 0, 0, -4, -34, -120],
    frontStart: 0.085,
    frontEnd: 0.245,
  },
  {
    input: [0.07, 0.11, 0.16, 0.215, 0.255, 0.31, 0.365, 0.425],
    x: ["-84vw", "-68vw", "-36vw", "-8vw", "1vw", "5vw", "39vw", "82vw"],
    y: ["84vh", "69vh", "45vh", "16vh", "2vh", "-4vh", "-31vh", "-78vh"],
    rotate: [0, 0, 0, 0, 0, -0.25, -3.5, -8.2],
    scale: [0.97, 0.98, 0.992, 0.998, 1, 1, 0.994, 0.975],
    z: [-120, -92, -50, -14, 0, 0, -32, -120],
    frontStart: 0.235,
    frontEnd: 0.355,
  },
  {
    input: [0.205, 0.25, 0.305, 0.355, 0.405, 0.455, 0.515, 0.575],
    x: ["-86vw", "-69vw", "-36vw", "-7vw", "0vw", "4vw", "40vw", "83vw"],
    y: ["85vh", "70vh", "44vh", "15vh", "1vh", "-4vh", "-31vh", "-79vh"],
    rotate: [0, 0, 0, 0, 0, -0.25, -3.6, -8.3],
    scale: [0.97, 0.98, 0.992, 0.998, 1, 1, 0.994, 0.975],
    z: [-120, -92, -50, -14, 0, 0, -32, -120],
    frontStart: 0.385,
    frontEnd: 0.505,
  },
  {
    input: [0.355, 0.40, 0.455, 0.505, 0.555, 0.605, 0.665, 0.725],
    x: ["-87vw", "-70vw", "-37vw", "-8vw", "0vw", "5vw", "40vw", "83vw"],
    y: ["86vh", "71vh", "45vh", "16vh", "1vh", "-4vh", "-31vh", "-79vh"],
    rotate: [0, 0, 0, 0, 0, -0.25, -3.6, -8.3],
    scale: [0.97, 0.98, 0.992, 0.998, 1, 1, 0.994, 0.975],
    z: [-120, -92, -50, -14, 0, 0, -32, -120],
    frontStart: 0.535,
    frontEnd: 0.655,
  },
  {
    input: [0.505, 0.55, 0.605, 0.655, 0.705, 0.755, 0.815, 0.875],
    x: ["-86vw", "-69vw", "-36vw", "-7vw", "0vw", "4vw", "39vw", "82vw"],
    y: ["85vh", "70vh", "44vh", "15vh", "1vh", "-4vh", "-31vh", "-79vh"],
    rotate: [0, 0, 0, 0, 0, -0.25, -3.5, -8.2],
    scale: [0.97, 0.98, 0.992, 0.998, 1, 1, 0.994, 0.975],
    z: [-120, -92, -50, -14, 0, 0, -32, -120],
    frontStart: 0.685,
    frontEnd: 0.805,
  },
  {
    input: [0.655, 0.70, 0.755, 0.805, 0.855, 0.905, 0.955, 1],
    x: ["-88vw", "-70vw", "-37vw", "-8vw", "0vw", "1vw", "1vw", "1vw"],
    y: ["87vh", "72vh", "46vh", "17vh", "1vh", "-3vh", "-3vh", "-10vh"],
    rotate: [0, 0, 0, 0, 0, 0, 0, 0],
    scale: [0.97, 0.98, 0.992, 0.998, 1, 1, 1, 0.985],
    z: [-120, -92, -50, -14, 0, 0, 0, -18],
    frontStart: 0.835,
    frontEnd: 1,
  },
];

function SmallArrow() {
  return <span aria-hidden="true" className="text-[1.15em] leading-none">↗</span>;
}

function ResultMetric({ value, lines }: { value: string; lines: string[] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-end border-l border-black/18 pl-[clamp(22px,2vw,34px)]">
      <div className="text-[clamp(52px,5vw,82px)] leading-[0.82] tracking-[-0.055em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
        {value}
      </div>
      <div className="mt-4 text-[clamp(12px,.95vw,15px)] font-medium leading-[1.18] text-black/67" style={{ fontFamily: BODY }}>
        {lines.map((line) => <div key={line}>{line}</div>)}
      </div>
    </div>
  );
}

function CaseStudyCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-cols-[1.12fr_.88fr]">
      <div className="flex min-w-0 flex-col p-[clamp(38px,3.5vw,58px)] pr-[clamp(28px,2.5vw,42px)]">
        <div className="text-[clamp(12px,.95vw,15px)] font-semibold leading-none text-black/58" style={{ fontFamily: BODY }}>{card.kicker}</div>
        <div className="mt-[clamp(28px,4vh,48px)] max-w-[590px] text-[clamp(39px,3.6vw,58px)] leading-[0.95] tracking-[-0.035em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
          “{card.quote}”
        </div>
        <div className="mt-auto flex items-center gap-2 pt-8 text-[clamp(13px,1vw,16px)] font-semibold text-[#171717]" style={{ fontFamily: BODY }}>
          <span>{card.label}</span><SmallArrow />
        </div>
      </div>
      <div className="grid min-w-0 grid-rows-[1fr_auto] p-[clamp(18px,1.4vw,24px)] pl-0">
        <div className="relative overflow-hidden rounded-[clamp(34px,3vw,50px)] bg-black">
          <img src={card.image} alt="Mortgage broker" className="absolute inset-0 h-full w-full object-cover object-[50%_28%]" loading="lazy" />
          <div className="absolute inset-0 bg-black/8" />
        </div>
        <div className="flex min-h-[clamp(150px,15vh,190px)] gap-[clamp(20px,2vw,34px)] px-1 pt-[clamp(22px,2.2vh,30px)]">
          <ResultMetric value="4" lines={["deals closed"]} />
          <ResultMetric value="17" lines={["days"]} />
        </div>
      </div>
    </div>
  );
}

function PressCard({ card, alternate = false }: { card: ResultCard; alternate?: boolean }) {
  return (
    <div className="flex h-full flex-col p-[clamp(40px,4vw,62px)]">
      <div className="flex items-center justify-between">
        <span className="text-[clamp(12px,.95vw,15px)] font-semibold text-black/47" style={{ fontFamily: BODY }}>{card.label}</span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-black/18 text-[16px] text-black/55" aria-hidden="true">{alternate ? "→" : "↗"}</span>
      </div>
      <div className="my-auto max-w-[570px] pb-6 text-[clamp(39px,3.55vw,56px)] leading-[0.96] tracking-[-0.034em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
        “{card.quote}”
      </div>
      <div className="h-px w-full bg-black/16" />
      <div className="mt-4 flex items-center justify-between text-[clamp(11px,.85vw,14px)] font-medium text-black/52" style={{ fontFamily: BODY }}>
        <span>Early customer result</span>
        <span>Zapla</span>
      </div>
    </div>
  );
}

function PhotoCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-rows-[1.08fr_.92fr] overflow-hidden">
      <div className="relative min-h-0 overflow-hidden bg-black">
        <img src={card.image} alt="Mortgage broker" className="absolute inset-0 h-full w-full object-cover object-[50%_25%]" loading="lazy" />
      </div>
      <div className="flex min-h-0 flex-col p-[clamp(30px,3vw,48px)]" style={{ background: card.tone }}>
        <div className="text-[clamp(11px,.85vw,14px)] font-semibold text-black/48" style={{ fontFamily: BODY }}>{card.label}</div>
        <div className="mt-4 text-[clamp(31px,2.8vw,44px)] leading-[0.97] tracking-[-0.03em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
          “{card.quote}”
        </div>
        <div className="mt-auto flex items-center justify-between pt-5 text-[clamp(11px,.85vw,14px)] font-medium text-black/55" style={{ fontFamily: BODY }}>
          <span>Same 17-day period</span><SmallArrow />
        </div>
      </div>
    </div>
  );
}

function GreenCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-cols-[.84fr_1.16fr] p-[clamp(18px,1.5vw,26px)]">
      <div className="relative overflow-hidden rounded-[clamp(34px,3vw,50px)] bg-black">
        <img src={card.image} alt="Mortgage broker" className="absolute inset-0 h-full w-full object-cover object-[48%_26%]" loading="lazy" />
      </div>
      <div className="flex min-w-0 flex-col px-[clamp(34px,3vw,52px)] py-[clamp(30px,3vw,48px)]">
        <div className="text-[clamp(12px,.95vw,15px)] font-semibold text-black/48" style={{ fontFamily: BODY }}>{card.label}</div>
        <div className="my-auto max-w-[610px] text-[clamp(43px,4vw,64px)] leading-[0.93] tracking-[-0.04em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
          “{card.quote}”
        </div>
        <div className="flex items-end justify-between gap-6 border-t border-black/18 pt-5 text-[clamp(12px,.95vw,15px)] font-medium text-black/60" style={{ fontFamily: BODY }}>
          <span className="max-w-[280px] leading-[1.25]">The next action kept moving across the same opportunity set.</span>
          <SmallArrow />
        </div>
      </div>
    </div>
  );
}

function ClosingCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-cols-[1.02fr_.98fr]">
      <div className="flex min-w-0 flex-col p-[clamp(42px,3.8vw,62px)]">
        <div className="text-[clamp(12px,.95vw,15px)] font-semibold text-black/52" style={{ fontFamily: BODY }}>{card.label}</div>
        <div className="my-auto max-w-[520px] text-[clamp(50px,4.7vw,76px)] leading-[0.9] tracking-[-0.045em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
          {card.quote}
        </div>
        <div className="flex items-center gap-2 text-[clamp(13px,1vw,16px)] font-semibold text-black/70" style={{ fontFamily: BODY }}>
          <span>Same early customer</span><SmallArrow />
        </div>
      </div>
      <div className="grid grid-cols-2 border-l border-black/18">
        <div className="flex flex-col justify-end border-r border-black/18 p-[clamp(32px,3vw,48px)]">
          <div className="text-[clamp(72px,7vw,112px)] leading-[0.78] tracking-[-0.06em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>4</div>
          <div className="mt-6 text-[clamp(13px,1vw,16px)] font-semibold leading-[1.15] text-black/67" style={{ fontFamily: BODY }}>deals<br />closed</div>
        </div>
        <div className="grid grid-rows-2">
          <div className="flex flex-col justify-end border-b border-black/18 p-[clamp(28px,2.6vw,42px)]">
            <div className="text-[clamp(58px,5.6vw,88px)] leading-[0.8] tracking-[-0.055em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>2</div>
            <div className="mt-4 text-[clamp(12px,.95vw,15px)] font-semibold text-black/67" style={{ fontFamily: BODY }}>still active</div>
          </div>
          <div className="flex flex-col justify-end p-[clamp(28px,2.6vw,42px)]">
            <div className="text-[clamp(58px,5.6vw,88px)] leading-[0.8] tracking-[-0.055em] text-[#171717]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>17</div>
            <div className="mt-4 text-[clamp(12px,.95vw,15px)] font-semibold text-black/67" style={{ fontFamily: BODY }}>days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardContent({ card }: { card: ResultCard }) {
  switch (card.kind) {
    case "caseStudy": return <CaseStudyCard card={card} />;
    case "press": return <PressCard card={card} />;
    case "photo": return <PhotoCard card={card} />;
    case "green": return <GreenCard card={card} />;
    case "pressAlt": return <PressCard card={card} alternate />;
    case "closing": return <ClosingCard card={card} />;
  }
}

function FloatingCard({ card, index, progress }: { card: ResultCard; index: number; progress: MotionValue<number> }) {
  const path = MOTION_PATHS[index];
  const x = useTransform(progress, path.input, path.x, { clamp: true });
  const y = useTransform(progress, path.input, path.y, { clamp: true });
  const rotate = useTransform(progress, path.input, path.rotate, { clamp: true });
  const scale = useTransform(progress, path.input, path.scale, { clamp: true });
  const z = useTransform(progress, path.input, path.z, { clamp: true });
  const zIndex = useTransform(progress, (value) => {
    const first = path.input[0];
    const last = path.input[path.input.length - 1];
    if (value < first || value > last) return 3 + index;
    if (value < path.frontStart) return 18 + index;
    if (value <= path.frontEnd) return 90 - index;
    return 72 - index;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, z, rotate, scale, zIndex, willChange: "transform", transformStyle: "preserve-3d" }}
    >
      <div
        data-result-card={card.id}
        className="-translate-x-1/2 -translate-y-1/2 overflow-hidden text-[#171717]"
        style={{
          width: card.width,
          aspectRatio: card.aspectRatio,
          background: card.tone,
          borderRadius: "clamp(46px, 4.3vw, 68px)",
          transform: "translateZ(0)",
        }}
      >
        <CardContent card={card} />
      </div>
    </motion.div>
  );
}

function StaticCard({ card }: { card: ResultCard }) {
  return (
    <div className="overflow-hidden text-[#171717]" style={{ background: card.tone, borderRadius: 30, aspectRatio: card.aspectRatio }}>
      <CardContent card={card} />
    </div>
  );
}

export function ZaplaEarlyResultsFlowV6() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const revealY = useTransform(scrollYProgress, [0, 0.94, 0.975, 1], ["100%", "100%", "42%", "0%"], { clamp: true });

  return (
    <section className="relative text-white" style={{ background: LIGHT_PAGE }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400&family=Figtree:wght@400;500;600;700&display=swap');`}</style>
      <div className="relative w-full overflow-hidden" style={{ background: INK, borderRadius: "80px 80px 0 0" }}>
        <div className="px-5 pb-16 pt-16 sm:px-9 lg:hidden">
          <div className="text-center">
            <div className="text-[13px] font-medium text-white/52" style={{ fontFamily: BODY }}>Early access, real results</div>
            <h2 className="mx-auto mt-4 max-w-[620px] text-[48px] leading-[0.91] tracking-[-0.035em] text-[#FFFFEB] sm:text-[58px]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
              From the first<br />people to use it.
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-[760px] gap-5">
            {RESULT_CARDS.map((card) => <StaticCard key={card.id} card={card} />)}
          </div>
        </div>

        {reduced ? (
          <div className="hidden px-10 py-20 lg:block xl:px-16">
            <div className="mx-auto max-w-[1320px]">
              <div className="text-center">
                <div className="text-[14px] font-medium text-white/52" style={{ fontFamily: BODY }}>Early access, real results</div>
                <h2 className="mx-auto mt-4 max-w-[900px] text-[72px] leading-[0.9] tracking-[-0.035em] text-[#FFFFEB]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
                  From the first<br />people to use it.
                </h2>
              </div>
              <div className="mt-16 grid grid-cols-2 gap-6">
                {RESULT_CARDS.map((card) => <StaticCard key={card.id} card={card} />)}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative hidden lg:block">
            <header className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1440px] flex-col items-center justify-center px-12 pb-[18vh] pt-[10vh] text-center">
              <div className="text-[14px] font-medium text-white/52" style={{ fontFamily: BODY }}>Early access, real results</div>
              <h2 className="mt-4 max-w-[900px] text-[clamp(64px,5vw,76px)] leading-[0.9] tracking-[-0.038em] text-[#FFFFEB]" style={{ fontFamily: DISPLAY, fontWeight: 400 }}>
                From the first<br />people to use it.
              </h2>
            </header>

            <div ref={trackRef} className="relative -mt-[30vh] h-[430vh]">
              <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ perspective: "1550px", perspectiveOrigin: "50% 49%" }}>
                {RESULT_CARDS.map((card, index) => (
                  <FloatingCard key={card.id} card={card} index={index} progress={scrollYProgress} />
                ))}
                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] h-[34vh]"
                  style={{ y: revealY, background: LIGHT_PAGE, borderRadius: "80px 80px 0 0" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
