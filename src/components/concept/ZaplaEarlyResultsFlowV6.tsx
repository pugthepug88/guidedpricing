import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BROKER_IMAGE = "/concept/cinematic-v5/broker.jpg";

type CardKind = "hero" | "quote" | "photoQuote" | "greenSplit" | "closing";

type ResultCard = {
  id: string;
  kind: CardKind;
  tone: string;
  width: string;
  aspectRatio: string;
  label: string;
  sublabel?: string;
  quote: string;
  footer: string;
  image?: string;
  metricA?: { value: string; label: string };
  metricB?: { value: string; label: string };
};

type MotionPath = {
  input: number[];
  x: string[];
  y: string[];
};

const RESULT_CARDS: ResultCard[] = [
  {
    id: "broker",
    kind: "hero",
    tone: "#E8CEF7",
    width: "min(1110px, 66vw)",
    aspectRatio: "1110 / 690",
    label: "MORTGAGE BROKER",
    sublabel: "Early customer result",
    quote: "4 deals closed in 17 days. Two more remained active.",
    footer: "Result details",
    image: BROKER_IMAGE,
    metricA: { value: "4", label: "deals closed" },
    metricB: { value: "17", label: "days" },
  },
  {
    id: "follow-up",
    kind: "quote",
    tone: "#F3F3D9",
    width: "min(820px, 49vw)",
    aspectRatio: "820 / 687",
    label: "WHAT CHANGED",
    quote: "The opportunities were already there. Consistent follow-up changed what happened next.",
    footer: "Early customer result",
  },
  {
    id: "active",
    kind: "photoQuote",
    tone: "#F4A443",
    width: "min(820px, 49vw)",
    aspectRatio: "820 / 687",
    label: "STILL MOVING",
    quote: "2 more opportunities were still active after the same 17-day period.",
    footer: "Same early customer",
    image: BROKER_IMAGE,
  },
  {
    id: "system",
    kind: "greenSplit",
    tone: "#45DF98",
    width: "min(1117px, 66.4vw)",
    aspectRatio: "1117 / 684",
    label: "FOLLOW-THROUGH",
    quote: "Zapla kept the follow-up moving across the same opportunity set.",
    footer: "One connected follow-up system",
    image: BROKER_IMAGE,
  },
  {
    id: "why",
    kind: "quote",
    tone: "#E8E8CF",
    width: "min(824px, 49vw)",
    aspectRatio: "824 / 678",
    label: "WHY IT MATTERS",
    quote: "Not more leads. Better follow-through on the opportunities already there.",
    footer: "The useful part",
  },
  {
    id: "summary",
    kind: "closing",
    tone: "#F45C4D",
    width: "min(1110px, 66vw)",
    aspectRatio: "1110 / 690",
    label: "EARLY CUSTOMER RESULT",
    quote: "Follow-through, measured.",
    footer: "4 closed · 2 active · 17 days",
    image: BROKER_IMAGE,
    metricA: { value: "4", label: "closed" },
    metricB: { value: "2", label: "still active" },
  },
];

/*
 * Reference-beat choreography.
 * Progress checkpoints deliberately line up with the supplied Flow recording:
 * .10 purple hero, .20 first handoff, .34 cream hero, .46 photo hero,
 * .60 green hero, .74 cream hero, .86 red entering, .96 red hero.
 * Cards remain opaque and leave by travelling through the upper-right edge.
 */
const MOTION_PATHS: MotionPath[] = [
  {
    input: [0, 0.10, 0.20, 0.27, 0.34, 0.40],
    x: ["-1vw", "-1vw", "14vw", "32.7vw", "60.5vw", "82vw"],
    y: ["49.8vh", "16.6vh", "-9.4vh", "-12.3vh", "-44.6vh", "-55vh"],
  },
  {
    input: [0.10, 0.20, 0.27, 0.34, 0.40, 0.46, 0.50],
    x: ["-69vw", "-52vw", "-34.5vw", "-6.2vw", "23.7vw", "53vw", "82vw"],
    y: ["58vh", "33.2vh", "22.7vh", "3.2vh", "-14vh", "-42vh", "-55vh"],
  },
  {
    input: [0.34, 0.40, 0.46, 0.53, 0.57],
    x: ["-64vw", "-34.8vw", "-3.8vw", "44vw", "82vw"],
    y: ["38.5vh", "23vh", "1.6vh", "-21.8vh", "-55vh"],
  },
  {
    input: [0.46, 0.53, 0.60, 0.67, 0.74, 0.78],
    x: ["-70vw", "-23.2vw", "5.6vw", "24.9vw", "60vw", "82vw"],
    y: ["41.5vh", "15vh", "-4.7vh", "-14.4vh", "-40vh", "-55vh"],
  },
  {
    input: [0.60, 0.67, 0.74, 0.86, 0.90],
    x: ["-60.5vw", "-42.2vw", "10.5vw", "47vw", "82vw"],
    y: ["37.2vh", "27vh", "-7.8vh", "-37vh", "-55vh"],
  },
  {
    input: [0.74, 0.86, 0.96, 1],
    x: ["-56.3vw", "-21.6vw", "-1.2vw", "-1.2vw"],
    y: ["35.4vh", "14.3vh", "-12.3vh", "-12.3vh"],
  },
];

function RoundMark() {
  return (
    <span
      className="grid h-11 w-11 place-items-center rounded-full bg-[#171717] text-[9px] font-extrabold tracking-[0.08em] text-white"
      style={{ fontFamily: SANS }}
      aria-hidden="true"
    >
      Z
    </span>
  );
}

function Metric({ value, label, inverse = false }: { value: string; label: string; inverse?: boolean }) {
  return (
    <div>
      <div
        className={`text-[clamp(38px,3vw,56px)] leading-none tracking-[-0.06em] ${inverse ? "text-white" : "text-[#171717]"}`}
        style={{ fontFamily: SERIF, fontWeight: 400 }}
      >
        {value}
      </div>
      <div
        className={`mt-2 max-w-[110px] text-[11px] font-semibold leading-[1.2] ${inverse ? "text-white/76" : "text-black/60"}`}
        style={{ fontFamily: SANS }}
      >
        {label}
      </div>
    </div>
  );
}

function HeroCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-cols-[1.03fr_.97fr]">
      <div className="flex min-w-0 flex-col px-[clamp(40px,3.3vw,52px)] py-[clamp(40px,3.3vw,52px)]">
        <div className="text-[clamp(22px,1.85vw,31px)] font-black leading-none tracking-[-0.045em] text-[#171717]" style={{ fontFamily: SANS }}>{card.label}</div>
        <div className="mt-3 text-[clamp(13px,1vw,17px)] text-black/55" style={{ fontFamily: SANS }}>{card.sublabel}</div>
        <div className="mt-[clamp(24px,3vh,38px)] max-w-[430px] text-[clamp(32px,2.55vw,46px)] leading-[0.99] tracking-[-0.045em] text-[#171717]" style={{ fontFamily: SERIF }}>“{card.quote}”</div>
        <div className="mt-auto flex items-center gap-3 pt-8 text-[clamp(12px,.9vw,15px)] font-semibold text-black/78" style={{ fontFamily: SANS }}><span>{card.footer}</span><span aria-hidden="true">›</span></div>
      </div>
      <div className="relative m-[clamp(14px,1.4vw,24px)] ml-0 overflow-hidden rounded-[clamp(26px,2.4vw,44px)] bg-black">
        <img src={card.image} alt="Mortgage broker early customer result" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-x-0 bottom-0 bg-black/86 px-[clamp(22px,2vw,32px)] py-[clamp(18px,2.1vh,28px)]">
          <div className="flex gap-[clamp(34px,4vw,64px)]">
            {card.metricA ? <Metric {...card.metricA} inverse /> : null}
            {card.metricB ? <Metric {...card.metricB} inverse /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ card }: { card: ResultCard }) {
  return (
    <div className="flex h-full flex-col px-[clamp(36px,3.2vw,58px)] py-[clamp(38px,3.5vw,60px)]">
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/42" style={{ fontFamily: SANS }}>{card.label}</div>
      <div className="mt-[clamp(24px,3vh,42px)] max-w-[690px] text-[clamp(34px,2.75vw,50px)] leading-[1.01] tracking-[-0.047em] text-[#171717]" style={{ fontFamily: SERIF }}>“{card.quote}”</div>
      <div className="mt-auto flex items-center gap-4 pt-8 text-[clamp(12px,.95vw,16px)] font-semibold text-black/72" style={{ fontFamily: SANS }}><RoundMark /><span>{card.footer}</span></div>
    </div>
  );
}

function PhotoQuoteCard({ card }: { card: ResultCard }) {
  return (
    <div className="relative h-full overflow-hidden">
      <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" loading="lazy" />
      <div className="absolute inset-x-[clamp(16px,1.4vw,24px)] bottom-[clamp(16px,1.4vw,24px)] rounded-[clamp(24px,2.2vw,40px)] px-[clamp(28px,2.8vw,48px)] py-[clamp(28px,3vh,44px)]" style={{ background: card.tone }}>
        <div className="max-w-[670px] text-[clamp(31px,2.55vw,46px)] leading-[1.01] tracking-[-0.045em] text-[#171717]" style={{ fontFamily: SERIF }}>“{card.quote}”</div>
        <div className="mt-8 text-[clamp(12px,.95vw,16px)] font-semibold text-black/72" style={{ fontFamily: SANS }}>{card.footer}</div>
      </div>
    </div>
  );
}

function GreenSplitCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-cols-[1fr_1.05fr] p-[clamp(16px,1.4vw,24px)]">
      <div className="overflow-hidden rounded-[clamp(26px,2.4vw,44px)]">
        <img src={card.image} alt="" className="h-full w-full object-cover object-[50%_36%]" loading="lazy" />
      </div>
      <div className="flex min-w-0 flex-col px-[clamp(34px,3vw,52px)] py-[clamp(20px,2vw,36px)]">
        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-black/42" style={{ fontFamily: SANS }}>{card.label}</div>
        <div className="mt-[clamp(24px,3vh,42px)] text-[clamp(34px,2.7vw,49px)] leading-[1] tracking-[-0.047em] text-[#171717]" style={{ fontFamily: SERIF }}>“{card.quote}”</div>
        <div className="mt-auto text-[clamp(12px,.95vw,16px)] font-semibold leading-[1.3] text-black/65" style={{ fontFamily: SANS }}>{card.footer}</div>
      </div>
    </div>
  );
}

function ClosingCard({ card }: { card: ResultCard }) {
  return (
    <div className="grid h-full grid-cols-[1.04fr_.96fr]">
      <div className="flex min-w-0 flex-col px-[clamp(36px,3.2vw,58px)] py-[clamp(38px,3.5vw,60px)]">
        <div className="text-[clamp(18px,1.35vw,23px)] font-black tracking-[-0.035em] text-[#171717]" style={{ fontFamily: SANS }}>ZAPLA</div>
        <div className="mt-[clamp(28px,3vh,42px)] max-w-[490px] text-[clamp(36px,2.9vw,52px)] leading-[0.98] tracking-[-0.05em] text-[#171717]" style={{ fontFamily: SERIF }}>“{card.quote}”</div>
        <div className="mt-5 max-w-[420px] text-[clamp(15px,1.15vw,19px)] leading-[1.45] text-black/67" style={{ fontFamily: SANS }}>4 deals closed. 2 more still active. 17 days.</div>
        <div className="mt-auto flex items-center gap-3 text-[clamp(12px,.95vw,16px)] font-semibold text-black/76" style={{ fontFamily: SANS }}><span>{card.footer}</span><span aria-hidden="true">›</span></div>
      </div>
      <div className="relative m-[clamp(14px,1.4vw,24px)] ml-0 overflow-hidden rounded-[clamp(26px,2.4vw,44px)] bg-black">
        <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-black/16" />
        <div className="absolute inset-x-0 bottom-0 bg-black/76 px-[clamp(22px,2vw,32px)] py-[clamp(18px,2.1vh,28px)]">
          <div className="flex gap-[clamp(34px,4vw,64px)]">
            {card.metricA ? <Metric {...card.metricA} inverse /> : null}
            {card.metricB ? <Metric {...card.metricB} inverse /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardContent({ card }: { card: ResultCard }) {
  switch (card.kind) {
    case "hero": return <HeroCard card={card} />;
    case "quote": return <QuoteCard card={card} />;
    case "photoQuote": return <PhotoQuoteCard card={card} />;
    case "greenSplit": return <GreenSplitCard card={card} />;
    case "closing": return <ClosingCard card={card} />;
  }
}

function FloatingCard({ card, index, progress }: { card: ResultCard; index: number; progress: MotionValue<number> }) {
  const path = MOTION_PATHS[index];
  const x = useTransform(progress, path.input, path.x, { clamp: true });
  const y = useTransform(progress, path.input, path.y, { clamp: true });
  const start = path.input[0];
  const opacity = useTransform(progress, (value) => (index === 0 || value >= start ? 1 : 0));

  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ x, y, opacity, zIndex: 20 + index, willChange: "transform" }}>
      <div
        data-result-card={card.id}
        className="-translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/[0.06] text-[#171717] shadow-[0_28px_80px_rgba(0,0,0,.12)]"
        style={{
          width: card.width,
          aspectRatio: card.aspectRatio,
          background: card.tone,
          borderRadius: "clamp(38px, 3.55vw, 60px)",
        }}
      >
        <CardContent card={card} />
      </div>
    </motion.div>
  );
}

function StaticCard({ card }: { card: ResultCard }) {
  return (
    <div className="overflow-hidden text-[#171717]" style={{ background: card.tone, borderRadius: 28 }}>
      <div className="min-h-[330px]"><CardContent card={card} /></div>
    </div>
  );
}

export function ZaplaEarlyResultsFlowV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const titleY = useTransform(scrollYProgress, [0, 0.06, 0.10, 0.18, 0.22], ["0vh", "-3vh", "-14vh", "-34vh", "-50vh"], { clamp: true });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.10, 0.18, 0.22], [1, 1, 0.45, 0], { clamp: true });
  const stageY = useTransform(scrollYProgress, [0, 0.92, 0.96, 1], ["0vh", "0vh", "-10vh", "-22vh"], { clamp: true });

  return (
    <section ref={sectionRef} className={`relative bg-[#F7F4E6] text-white ${reduced ? "py-12" : "lg:h-[560vh]"}`}>
      <motion.div
        className={`relative w-full overflow-hidden bg-[#191918] ${reduced ? "" : "lg:sticky lg:top-0 lg:h-screen"}`}
        style={{ borderRadius: "clamp(34px, 3.5vw, 58px)", y: reduced ? 0 : stageY }}
      >
        <div className="px-5 pb-16 pt-16 sm:px-9 lg:hidden">
          <div className="text-center">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: SANS }}>Early access. Real results.</div>
            <h2 className="mx-auto mt-5 max-w-[620px] text-[46px] leading-[0.94] tracking-[-0.045em] text-[#F7F4E6] sm:text-[56px]" style={{ fontFamily: SERIF, fontWeight: 400 }}>
              From the first<br /><em className="font-normal">businesses to use it.</em>
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
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: SANS }}>Early access. Real results.</div>
                <h2 className="mx-auto mt-5 max-w-[800px] text-[70px] leading-[0.94] tracking-[-0.05em] text-[#F7F4E6]" style={{ fontFamily: SERIF, fontWeight: 400 }}>From the first <em className="font-normal">businesses to use it.</em></h2>
              </div>
              <div className="mt-14 grid grid-cols-2 gap-6">{RESULT_CARDS.map((card) => <StaticCard key={card.id} card={card} />)}</div>
            </div>
          </div>
        ) : (
          <div className="relative hidden h-full lg:block">
            <motion.div className="absolute left-1/2 top-[16vh] z-10 w-[min(760px,72vw)] -translate-x-1/2 text-center" style={{ y: titleY, opacity: titleOpacity }}>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/43" style={{ fontFamily: SANS }}>Early access. Real results.</div>
              <h2 className="mt-5 text-[clamp(54px,4.2vw,72px)] leading-[0.94] tracking-[-0.047em] text-[#F7F4E6]" style={{ fontFamily: SERIF, fontWeight: 400 }}>
                From the first<br /><em className="font-normal">businesses to use it.</em>
              </h2>
            </motion.div>
            {RESULT_CARDS.map((card, index) => <FloatingCard key={card.id} card={card} index={index} progress={scrollYProgress} />)}
          </div>
        )}
      </motion.div>
    </section>
  );
}
