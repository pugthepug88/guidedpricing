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

type ResultCard = {
  id: string;
  tone: string;
  eyebrow: string;
  text: string;
  body?: string;
  footer?: string;
  image?: string;
  imageAlt?: string;
  metricA?: { value: string; label: string };
  metricB?: { value: string; label: string };
  layout: "split" | "quote" | "metric";
  width: string;
};

const RESULT_CARDS: ResultCard[] = [
  {
    id: "broker",
    tone: "#E9D2F4",
    eyebrow: "Mortgage broker · early customer",
    text: "4 deals closed in 17 days.",
    body: "Zapla followed up opportunities that were already in motion, while the broker kept working the business.",
    footer: "Early customer result",
    image: BROKER_IMAGE,
    imageAlt: "Mortgage broker customer result",
    metricA: { value: "4", label: "deals closed" },
    metricB: { value: "17", label: "days" },
    layout: "split",
    width: "min(940px, 62vw)",
  },
  {
    id: "follow-up",
    tone: "#F4F0D8",
    eyebrow: "What changed",
    text: "Existing opportunities got consistent follow-up instead of waiting for someone to remember.",
    footer: "Follow-through on work already in motion",
    layout: "quote",
    width: "min(760px, 50vw)",
  },
  {
    id: "active",
    tone: "#EFA65E",
    eyebrow: "Still moving",
    text: "2 more opportunities were still active after the same 17-day period.",
    metricA: { value: "2", label: "still active" },
    metricB: { value: "17", label: "days" },
    layout: "metric",
    width: "min(790px, 51vw)",
  },
  {
    id: "system",
    tone: "#73D89B",
    eyebrow: "Why it matters",
    text: "The result came from following through on opportunities that already existed.",
    body: "Not another channel to babysit. A system that keeps the next step moving.",
    footer: "One connected follow-up system",
    layout: "quote",
    width: "min(800px, 52vw)",
  },
  {
    id: "summary",
    tone: "#E96F5C",
    eyebrow: "Early customer result",
    text: "Follow-through, measured.",
    body: "One early customer. One short period. A useful signal of what consistent follow-up can recover.",
    metricA: { value: "4", label: "closed" },
    metricB: { value: "2", label: "still active" },
    layout: "metric",
    width: "min(880px, 57vw)",
  },
];

/*
 * Choreography is intentionally modelled on the supplied Flow reference:
 * every card enters from below/left, becomes the main card low in the frame,
 * then continues diagonally up/right. The next card begins entering before the
 * current card has left, so a small piece of the next card is always visible.
 */
const CARD_WINDOWS = [
  { start: 0.07, enter: 0.12, focus: 0.2, leave: 0.3, end: 0.4 },
  { start: 0.2, enter: 0.25, focus: 0.35, leave: 0.46, end: 0.56 },
  { start: 0.36, enter: 0.41, focus: 0.51, leave: 0.62, end: 0.72 },
  { start: 0.52, enter: 0.57, focus: 0.67, leave: 0.78, end: 0.88 },
  { start: 0.68, enter: 0.73, focus: 0.83, leave: 0.92, end: 0.995 },
] as const;

const FOCUS_X = ["-1vw", "-4vw", "1vw", "-2vw", "2vw"] as const;

function Metric({ value, label, inverse = false }: { value: string; label: string; inverse?: boolean }) {
  return (
    <div>
      <div
        className={`text-[42px] leading-none tracking-[-0.06em] sm:text-[50px] ${inverse ? "text-white" : "text-[#151515]"}`}
        style={{ fontFamily: SERIF, fontWeight: 400 }}
      >
        {value}
      </div>
      <div className={`mt-2 max-w-[104px] text-[10px] font-semibold leading-[1.25] ${inverse ? "text-white/72" : "text-black/58"}`} style={{ fontFamily: SANS }}>
        {label}
      </div>
    </div>
  );
}

function CardContent({ card }: { card: ResultCard }) {
  if (card.layout === "split") {
    return (
      <div className="grid min-h-[500px] grid-cols-[1.03fr_.97fr] overflow-hidden rounded-[28px] xl:min-h-[550px]">
        <div className="flex flex-col px-10 py-10 xl:px-12 xl:py-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/62" style={{ fontFamily: SANS }}>
            {card.eyebrow}
          </div>

          <div className="mt-8 max-w-[390px] text-[43px] leading-[0.98] tracking-[-0.045em] text-[#171717] xl:text-[50px]" style={{ fontFamily: SERIF }}>
            “{card.text}”
          </div>

          <p className="mt-6 max-w-[390px] text-[14px] leading-[1.62] text-black/60 xl:text-[15px]" style={{ fontFamily: SANS }}>
            {card.body}
          </p>

          <div className="mt-auto flex items-center gap-3 pt-10 text-[13px] font-semibold text-black/76" style={{ fontFamily: SANS }}>
            <span>{card.footer}</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>

        <div className="relative m-5 ml-0 overflow-hidden rounded-[23px] bg-black/10">
          <img src={card.image} alt={card.imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 bg-black/86 px-7 py-6">
            <div className="flex gap-12">
              {card.metricA ? <Metric {...card.metricA} inverse /> : null}
              {card.metricB ? <Metric {...card.metricB} inverse /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (card.layout === "metric") {
    return (
      <div className="flex min-h-[430px] flex-col px-10 py-10 xl:min-h-[475px] xl:px-12 xl:py-12">
        <div className="text-[11px] font-semibold uppercase tracking-[0.11em] text-black/56" style={{ fontFamily: SANS }}>
          {card.eyebrow}
        </div>

        <div className="mt-8 max-w-[560px] text-[43px] leading-[0.99] tracking-[-0.045em] text-[#171717] xl:text-[50px]" style={{ fontFamily: SERIF }}>
          {card.text}
        </div>

        {card.body ? (
          <p className="mt-5 max-w-[540px] text-[14px] leading-[1.62] text-black/58 xl:text-[15px]" style={{ fontFamily: SANS }}>
            {card.body}
          </p>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-8 border-t border-black/14 pt-8">
          <div className="flex gap-14">
            {card.metricA ? <Metric {...card.metricA} /> : null}
            {card.metricB ? <Metric {...card.metricB} /> : null}
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#171717] text-[10px] font-bold tracking-[0.06em] text-white" style={{ fontFamily: SANS }}>
            Z
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[420px] flex-col px-10 py-10 xl:min-h-[460px] xl:px-12 xl:py-12">
      <div className="text-[11px] font-semibold uppercase tracking-[0.11em] text-black/55" style={{ fontFamily: SANS }}>
        {card.eyebrow}
      </div>

      <div className="mt-8 max-w-[600px] text-[43px] leading-[1.01] tracking-[-0.045em] text-[#171717] xl:text-[50px]" style={{ fontFamily: SERIF }}>
        “{card.text}”
      </div>

      {card.body ? (
        <p className="mt-5 max-w-[520px] text-[14px] leading-[1.62] text-black/58 xl:text-[15px]" style={{ fontFamily: SANS }}>
          {card.body}
        </p>
      ) : null}

      <div className="mt-auto flex items-center gap-3 pt-10 text-[12px] font-semibold text-black/64" style={{ fontFamily: SANS }}>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#171717] text-[9px] font-bold tracking-[0.06em] text-white">Z</div>
        <span>{card.footer}</span>
      </div>
    </div>
  );
}

function FloatingResultCard({ progress, card, index }: { progress: MotionValue<number>; card: ResultCard; index: number }) {
  const window = CARD_WINDOWS[index];
  const input = [window.start, window.enter, window.focus, window.leave, window.end];

  const x = useTransform(progress, input, ["-58vw", "-38vw", FOCUS_X[index], "30vw", "60vw"]);
  const y = useTransform(progress, input, ["66vh", "43vh", "14vh", "-16vh", "-50vh"]);
  const opacity = useTransform(progress, [window.start, window.start + 0.018, window.end - 0.025, window.end], [0, 1, 1, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, opacity, zIndex: 20 + index, willChange: "transform, opacity" }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-black/10 text-[#111] shadow-[0_28px_80px_rgba(0,0,0,.22)]"
        style={{ width: card.width, background: card.tone }}
      >
        <CardContent card={card} />
      </div>
    </motion.div>
  );
}

function StaticCard({ card }: { card: ResultCard }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 text-[#111] shadow-[0_20px_55px_rgba(0,0,0,.18)]" style={{ background: card.tone }}>
      <CardContent card={card} />
    </div>
  );
}

export function ZaplaEarlyResultsFlowV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.025, 0.2, 0.34], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.34], [32, 0, 0, -30]);
  const hintOpacity = useTransform(scrollYProgress, [0.02, 0.07, 0.18], [0, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[#F5F0E7] px-3 py-10 text-white sm:px-5 ${reduced ? "lg:py-16" : "lg:h-[500vh] lg:py-0"}`}
    >
      <div
        className={`${reduced ? "lg:min-h-screen" : "lg:sticky lg:top-0 lg:h-screen"} relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[38px] bg-[#1A1A19] sm:rounded-[46px]`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/[0.035]" />

        <div className="relative z-10 px-5 pb-16 pt-16 sm:px-10 sm:pt-20 lg:hidden">
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42" style={{ fontFamily: SANS }}>
              Early customer results
            </div>
            <h2 className="mx-auto mt-5 max-w-[560px] text-[46px] leading-[0.95] tracking-[-0.045em] text-white sm:text-[56px]" style={{ fontFamily: SERIF, fontWeight: 400 }}>
              From the first<br />
              <em className="font-normal text-[#F1E7D9]">businesses to use it.</em>
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-[760px] gap-5">
            {RESULT_CARDS.slice(0, 4).map((card) => <StaticCard key={card.id} card={card} />)}
          </div>
          <div className="mx-auto mt-7 max-w-[720px] text-center text-[10px] leading-[1.5] text-white/34" style={{ fontFamily: SANS }}>
            Early customer result. Individual outcomes vary by business and follow-up.
          </div>
        </div>

        {reduced ? (
          <div className="relative z-10 hidden min-h-screen px-10 py-24 lg:block xl:px-16">
            <div className="mx-auto max-w-[1320px]">
              <div className="text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42" style={{ fontFamily: SANS }}>
                  Early customer results
                </div>
                <h2 className="mx-auto mt-5 max-w-[760px] text-[68px] leading-[0.93] tracking-[-0.05em] text-white" style={{ fontFamily: SERIF, fontWeight: 400 }}>
                  From the first <em className="font-normal text-[#F1E7D9]">businesses to use it.</em>
                </h2>
              </div>
              <div className="mt-14 grid grid-cols-2 gap-6">
                {RESULT_CARDS.slice(0, 4).map((card) => <StaticCard key={card.id} card={card} />)}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative hidden h-full lg:block">
            <motion.div
              className="absolute left-1/2 top-[9vh] z-10 w-[min(820px,72vw)] -translate-x-1/2 text-center"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.19em] text-white/38" style={{ fontFamily: SANS }}>
                Early customer results
              </div>
              <h2 className="mt-5 text-[58px] leading-[0.93] tracking-[-0.05em] text-white xl:text-[72px]" style={{ fontFamily: SERIF, fontWeight: 400 }}>
                From the first<br />
                <em className="font-normal text-[#F1E7D9]">businesses to use it.</em>
              </h2>
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white/22"
              style={{ opacity: hintOpacity, fontFamily: SANS }}
            >
              Scroll through the results
            </motion.div>

            {RESULT_CARDS.map((card, index) => (
              <FloatingResultCard key={card.id} progress={scrollYProgress} card={card} index={index} />
            ))}

            <div className="absolute bottom-6 right-7 z-10 text-[9px] text-white/22 xl:right-10" style={{ fontFamily: SANS }}>
              Early customer result. Individual outcomes vary.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
