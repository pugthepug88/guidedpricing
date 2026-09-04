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
  text: string;
  eyebrow?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  footer?: string;
  metricA?: { value: string; label: string };
  metricB?: { value: string; label: string };
  layout: "split" | "note" | "metric";
  width: string;
};

const RESULT_CARDS: ResultCard[] = [
  {
    id: "broker",
    tone: "#CDB5DC",
    eyebrow: "Mortgage broker",
    text: "4 deals closed in 17 days.",
    body: "Zapla followed up opportunities that were already in motion.",
    image: BROKER_IMAGE,
    imageAlt: "Mortgage broker customer result",
    metricA: { value: "4", label: "deals closed" },
    metricB: { value: "17", label: "days" },
    layout: "split",
    width: "min(610px, 43vw)",
  },
  {
    id: "follow-up",
    tone: "#F0ECD3",
    eyebrow: "What changed",
    text: "Existing opportunities got consistent follow-up instead of waiting for someone to remember.",
    footer: "Early customer result",
    layout: "note",
    width: "min(430px, 31vw)",
  },
  {
    id: "active",
    tone: "#E4A05F",
    eyebrow: "Still moving",
    text: "2 more opportunities remained active after the same 17-day period.",
    metricA: { value: "2", label: "still active" },
    metricB: { value: "17", label: "days" },
    layout: "metric",
    width: "min(470px, 34vw)",
  },
  {
    id: "system",
    tone: "#91C6A0",
    eyebrow: "The useful bit",
    text: "The result came from follow-through on work that already existed, not from adding another channel to babysit.",
    footer: "One connected follow-up system",
    layout: "note",
    width: "min(500px, 35vw)",
  },
  {
    id: "summary",
    tone: "#D97462",
    eyebrow: "Early result",
    text: "Follow-through, measured.",
    body: "4 closed. 2 more active. 17 days.",
    metricA: { value: "4", label: "closed" },
    metricB: { value: "2", label: "active" },
    layout: "metric",
    width: "min(570px, 40vw)",
  },
];

const CARD_WINDOWS = [
  { start: 0.11, middle: 0.2, end: 0.36, x: ["10vw", "16vw", "62vw"], y: ["42vh", "7vh", "-48vh"] },
  { start: 0.25, middle: 0.38, end: 0.55, x: ["-68vw", "-20vw", "61vw"], y: ["48vh", "6vh", "-52vh"] },
  { start: 0.42, middle: 0.54, end: 0.7, x: ["-65vw", "-8vw", "64vw"], y: ["50vh", "9vh", "-50vh"] },
  { start: 0.58, middle: 0.7, end: 0.86, x: ["-68vw", "-18vw", "61vw"], y: ["50vh", "7vh", "-52vh"] },
  { start: 0.74, middle: 0.86, end: 0.995, x: ["-66vw", "10vw", "63vw"], y: ["48vh", "9vh", "-42vh"] },
] as const;

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-[34px] leading-none tracking-[-0.055em] sm:text-[42px]" style={{ fontFamily: SANS, fontWeight: 650 }}>
        {value}
      </div>
      <div className="mt-1.5 max-w-[86px] text-[9px] font-semibold uppercase leading-[1.25] tracking-[0.12em] text-black/55">
        {label}
      </div>
    </div>
  );
}

function CardContent({ card }: { card: ResultCard }) {
  const isSplit = card.layout === "split";

  if (isSplit) {
    return (
      <div className="grid h-full grid-cols-[1.08fr_.92fr] overflow-hidden rounded-[18px]">
        <div className="flex min-h-[290px] flex-col p-7 xl:p-8">
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/56">{card.eyebrow}</div>
          <div className="mt-5 max-w-[270px] text-[28px] leading-[1.02] tracking-[-0.042em] text-[#111] xl:text-[31px]" style={{ fontFamily: SERIF }}>
            {card.text}
          </div>
          <p className="mt-4 max-w-[290px] text-[12px] leading-[1.55] text-black/62 xl:text-[13px]">{card.body}</p>
          <div className="mt-auto flex items-end gap-8 pt-8">
            {card.metricA ? <Metric {...card.metricA} /> : null}
            {card.metricB ? <Metric {...card.metricB} /> : null}
          </div>
        </div>
        <div className="relative min-h-[290px] overflow-hidden bg-black/10">
          <img src={card.image} alt={card.imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-black/12" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[235px] flex-col p-7 xl:p-8">
      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/52">{card.eyebrow}</div>
      <div className={`${card.layout === "metric" ? "max-w-[360px] text-[28px] xl:text-[32px]" : "max-w-[360px] text-[26px] xl:text-[30px]"} mt-5 leading-[1.04] tracking-[-0.04em] text-[#111]`} style={{ fontFamily: SERIF }}>
        {card.text}
      </div>
      {card.body ? <p className="mt-4 max-w-[360px] text-[13px] leading-[1.55] text-black/60">{card.body}</p> : null}

      {card.layout === "metric" ? (
        <div className="mt-auto flex items-end justify-between gap-8 border-t border-black/12 pt-7">
          <div className="flex gap-10">
            {card.metricA ? <Metric {...card.metricA} /> : null}
            {card.metricB ? <Metric {...card.metricB} /> : null}
          </div>
          <div className="h-10 w-10 rounded-full bg-black/92" aria-hidden="true" />
        </div>
      ) : (
        <div className="mt-auto flex items-center gap-3 pt-8 text-[10px] font-semibold text-black/62">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-black text-[8px] font-bold uppercase tracking-[0.04em] text-white">Z</div>
          <span>{card.footer}</span>
        </div>
      )}
    </div>
  );
}

function FloatingResultCard({ progress, card, index }: { progress: MotionValue<number>; card: ResultCard; index: number }) {
  const window = CARD_WINDOWS[index];
  const input = [window.start, window.middle, window.end];
  const x = useTransform(progress, input, [...window.x]);
  const y = useTransform(progress, input, [...window.y]);
  const opacity = useTransform(progress, [window.start, window.start + 0.035, window.middle, window.end - 0.04, window.end], [0, 1, 1, 1, 0]);
  const rotate = useTransform(progress, input, [index % 2 === 0 ? -2.5 : 2.2, 0, index % 2 === 0 ? 2.8 : -2.5]);
  const scale = useTransform(progress, input, [0.94, 1, 0.96]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ x, y, opacity, rotate, scale, zIndex: 20 + index, willChange: "transform, opacity" }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] border border-white/10 text-[#111] shadow-[0_28px_80px_rgba(0,0,0,.28)]"
        style={{ width: card.width, background: card.tone }}
      >
        <CardContent card={card} />
      </div>
    </motion.div>
  );
}

function StaticCard({ card }: { card: ResultCard }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/10 text-[#111] shadow-[0_22px_60px_rgba(0,0,0,.22)]" style={{ background: card.tone }}>
      <CardContent card={card} />
    </div>
  );
}

export function ZaplaEarlyResultsFlowV6() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.035, 0.16, 0.3], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.055, 0.2, 0.3], [38, 0, 0, -34]);
  const hintOpacity = useTransform(scrollYProgress, [0.03, 0.08, 0.19], [0, 1, 0]);

  return (
    <section ref={sectionRef} className={`relative bg-[#F6F0E8] px-3 py-10 text-white sm:px-5 ${reduced ? "lg:py-16" : "lg:h-[430vh] lg:py-0"}`}>
      <div className={`${reduced ? "lg:min-h-screen" : "lg:sticky lg:top-0 lg:h-screen"} relative mx-auto w-full max-w-[1680px] overflow-hidden rounded-[34px] bg-[#191918] sm:rounded-[42px]`}>
        <div className="pointer-events-none absolute inset-0 border border-white/[0.035] rounded-[inherit]" />

        <div className="relative z-10 px-5 pb-16 pt-16 sm:px-10 sm:pt-20 lg:hidden">
          <div className="text-center">
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">Early access. Real result.</div>
            <h2 className="mx-auto mt-5 max-w-[520px] text-[45px] leading-[0.96] tracking-[-0.045em] text-white sm:text-[54px]" style={{ fontFamily: SERIF, fontWeight: 400 }}>
              One early customer.<br />
              <em className="font-normal text-[#E7D8EB]">Real follow-through.</em>
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-[720px] gap-5">
            {RESULT_CARDS.slice(0, 4).map((card) => <StaticCard key={card.id} card={card} />)}
          </div>
          <div className="mx-auto mt-7 max-w-[720px] text-center text-[10px] leading-[1.5] text-white/36">Early customer result. Individual outcomes vary by business and follow-up.</div>
        </div>

        {reduced ? (
          <div className="relative z-10 hidden min-h-screen px-10 py-24 lg:block xl:px-16">
            <div className="mx-auto max-w-[1320px]">
              <div className="text-center">
                <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">Early access. Real result.</div>
                <h2 className="mx-auto mt-5 max-w-[720px] text-[66px] leading-[0.94] tracking-[-0.05em] text-white" style={{ fontFamily: SERIF, fontWeight: 400 }}>
                  One early customer. <em className="font-normal text-[#E7D8EB]">Real follow-through.</em>
                </h2>
              </div>
              <div className="mt-14 grid grid-cols-2 gap-6">
                {RESULT_CARDS.slice(0, 4).map((card) => <StaticCard key={card.id} card={card} />)}
              </div>
            </div>
          </div>
        ) : (
          <div className="relative hidden h-full lg:block">
            <motion.div className="absolute left-1/2 top-[9vh] z-10 w-[min(760px,70vw)] -translate-x-1/2 text-center" style={{ opacity: titleOpacity, y: titleY }}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/42">Early access. Real result.</div>
              <h2 className="mt-5 text-[58px] leading-[0.93] tracking-[-0.05em] text-white xl:text-[70px]" style={{ fontFamily: SERIF, fontWeight: 400 }}>
                One early customer.<br />
                <em className="font-normal text-[#E7D8EB]">Real follow-through.</em>
              </h2>
            </motion.div>

            <motion.div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/28" style={{ opacity: hintOpacity }}>
              Scroll through the result
            </motion.div>

            {RESULT_CARDS.map((card, index) => (
              <FloatingResultCard key={card.id} progress={scrollYProgress} card={card} index={index} />
            ))}

            <div className="absolute bottom-6 right-7 z-10 text-[9px] text-white/24 xl:right-10">Early customer result. Individual outcomes vary.</div>
          </div>
        )}
      </div>
    </section>
  );
}
