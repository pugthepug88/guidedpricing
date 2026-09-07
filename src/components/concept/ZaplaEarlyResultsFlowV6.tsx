import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STORY_IMAGES = "/concept/customer-stories-v6";
type CardKind = "caseStudy" | "press" | "photo" | "green" | "pressAlt" | "closing";
type ResultCard = {
  id: string;
  kind: CardKind;
  tone: string;
  quote: string;
  label: string;
  kicker?: string;
  supporting?: string;
  note: string;
  image?: string;
  imageAlt?: string;
};
// Cards 2–6 are explicitly labelled prototype testimonials, not customer claims.
// Replace draft quotes, illustrative metrics and portraits with approved material.
const RESULT_CARDS: ResultCard[] = [
  {
    id: "broker",
    kind: "caseStudy",
    tone: "#F0D7FF",
    kicker: "Mortgage broker",
    quote: "4 deals closed in 17 days.",
    supporting:
      "Following up existing opportunities. Two more were still active after the same period.",
    label: "Early customer result",
    note: "Illustrative portrait",
    image: `${STORY_IMAGES}/broker.webp`,
    imageAlt: "Illustrative portrait of a mortgage broker in an office",
  },
  {
    id: "existing-opportunities",
    kind: "press",
    tone: "#FFFFEB",
    quote: "I can focus on the job in front of me knowing new enquiries are getting a response.",
    label: "Workshop owner",
    note: "Placeholder testimonial",
  },
  {
    id: "two-active",
    kind: "photo",
    tone: "#FFA946",
    quote:
      "We spend less time chasing confirmations and more time looking after the people who are here.",
    label: "Practice manager",
    note: "Placeholder testimonial",
    image: `${STORY_IMAGES}/practice.webp`,
    imageAlt: "Illustrative portrait of a practice manager at reception",
  },
  {
    id: "follow-through",
    kind: "green",
    tone: "#34D399",
    quote: "Everyone can see what’s happened and what needs to happen next.",
    label: "Property manager",
    note: "Placeholder testimonial",
    image: `${STORY_IMAGES}/property.webp`,
    imageAlt: "Illustrative portrait of two property management colleagues",
  },
  {
    id: "why-it-matters",
    kind: "pressAlt",
    tone: "#E4E4D0",
    quote:
      "We didn’t have to figure out the software ourselves. The Zapla team built it around how we work.",
    label: "Business owner · Guided Launch",
    note: "Placeholder testimonial",
  },
  {
    id: "summary",
    kind: "closing",
    tone: "#FF6C4C",
    quote:
      "We used to leave the next booking to the customer. Now the follow-up keeps that conversation going.",
    label: "Studio owner",
    note: "Placeholder story · illustrative figures",
    image: `${STORY_IMAGES}/studio.webp`,
    imageAlt: "Illustrative portrait of a Pilates studio owner",
  },
];

/*
 * Measured against wisprflow.ai's live testimonial section, 6 September 2026.
 * Desktop: 740/544px widths, 460px height; centres at 0, 745.6, 1393.2,
 * 2138.8, 2884.4, 3630px. The scroll runway is 0.85 × that 3630px span.
 * The heading is in normal flow; ONLY the 100vh card stage is sticky.
 * All cards share one horizontal track and a -50° to +50° X-axis orbit.
 * Perspective supplies the apparent scaling. There is no Z-axis spin,
 * independent card easing, opacity crossfade, or synthetic exit overlay.
 */
function useResultOrbit(sectionRef: React.RefObject<HTMLDivElement | null>, reduced: boolean) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const runway = section.querySelector<HTMLDivElement>(".zef6-runway")!;
    const stage = section.querySelector<HTMLDivElement>(".zef6-stage")!;
    const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-result-card]"));
    let layout: gsap.Context | undefined;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const build = () => {
      if (disposed) return;
      layout?.revert();
      section.dataset.animated = "true";
      layout = gsap.context(() => {
        const mobile = window.innerWidth < 768;
        const scale = mobile
          ? 1
          : Math.min(2, Math.max(1, 1 + (window.innerWidth / 1920 - 1) * 0.55));
        // Layout widths, never the bounding boxes of already rotated cards.
        const widths = cards.map((card) => card.offsetWidth * scale);
        const median = [...widths].sort((a, b) => a - b)[Math.floor(widths.length / 2)];
        const gap = gsap.utils.clamp(32, 160, median * (mobile ? 0.22 : 0.14));
        const centres = [0];
        for (let i = 1; i < cards.length; i++) {
          centres[i] = centres[i - 1] + (widths[i - 1] + widths[i]) / 2 + gap;
        }
        const span = centres[centres.length - 1];
        const orbit = Math.max(220, median * 0.65);
        const perspective = median * 2.6;
        const rotationHalfSpan = median * 2.1;
        const rotationEase = gsap.parseEase("power1.inOut");
        gsap.set(stage, { perspective });
        gsap.set(cards, {
          xPercent: -50,
          yPercent: -50,
          scale,
          transformOrigin: `50% 50% -${orbit}px`,
          force3D: true,
        });
        const render = (head: number) => {
          const positions = centres.map((centre) => head - centre);
          cards.forEach((card, index) => {
            const x = positions[index];
            const progress = gsap.utils.clamp(
              0,
              1,
              (x + rotationHalfSpan) / (rotationHalfSpan * 2),
            );
            const rotation = -50 + 100 * rotationEase(progress);
            const depth = orbit * (1 - Math.cos((rotation * Math.PI) / 180));
            const projection = perspective / (perspective + depth);
            // Compensate horizontal foreshortening to keep the measured pitch.
            gsap.set(card, { x: x / projection, rotationX: rotation });
          });
          positions
            .map((x, index) => ({ distance: Math.abs(x), index }))
            .sort((a, b) => a.distance - b.distance || a.index - b.index)
            .forEach(({ index }, rank) => {
              cards[index].style.zIndex = String(cards.length - rank);
            });
        };
        gsap.set(runway, { height: Math.round(stage.offsetHeight + span * 0.85) });
        const head = { value: 0 };
        render(0);
        gsap.to(head, {
          value: span,
          ease: "none",
          onUpdate: () => render(head.value),
          scrollTrigger: {
            trigger: runway,
            start: "top top",
            end: "bottom bottom",
            scrub: mobile ? true : 1.5,
            invalidateOnRefresh: true,
          },
        });
      }, section);
      ScrollTrigger.refresh();
    };

    // Edges flatten at the viewport boundary and round again on release.
    // The next section remains in normal flow.
    let topRadius = window.innerWidth <= 991 ? 40 : 80;
    let bottomRadius = 0;
    const corners = () => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
      const max = window.innerWidth <= 991 ? 40 : 80;
      const blend = 1 - Math.pow(0.84, gsap.ticker.deltaRatio());
      topRadius += (gsap.utils.clamp(0, max, rect.top) - topRadius) * blend;
      bottomRadius +=
        (gsap.utils.clamp(0, max, window.innerHeight - rect.bottom) - bottomRadius) * blend;
      section.style.borderRadius = `${topRadius}px ${topRadius}px ${bottomRadius}px ${bottomRadius}px`;
    };
    const resize = () => {
      if (window.innerWidth === width && window.innerHeight === height) return;
      width = window.innerWidth;
      height = window.innerHeight;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    };
    build();
    gsap.ticker.add(corners);
    window.addEventListener("resize", resize);
    window.addEventListener("load", build);
    void document.fonts.ready.then(build);
    return () => {
      disposed = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", build);
      gsap.ticker.remove(corners);
      layout?.revert();
      cards.forEach((card) => card.style.removeProperty("z-index"));
      section.style.removeProperty("border-radius");
      delete section.dataset.animated;
    };
  }, [sectionRef, reduced]);
}

function ResultMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="zef6-metric">
      <div className="zef6-number">{value}</div>
      <div>{label}</div>
    </div>
  );
}
function Attribution({ card }: { card: ResultCard }) {
  return (
    <div>
      <div className="zef6-label">{card.label}</div>
      <div className="zef6-secondary">{card.note}</div>
    </div>
  );
}
function CardContent({ card }: { card: ResultCard }) {
  if (card.kind === "caseStudy") {
    return (
      <>
        <div className="zef6-copy">
          <div>
            <div className="zef6-kicker">
              <span>{card.kicker}</span>
              <span>Early customer result</span>
            </div>
            <p className="zef6-quote zef6-quote-spaced">{card.quote}</p>
            <p className="zef6-supporting">{card.supporting}</p>
          </div>
          <div className="zef6-secondary">{card.note}</div>
        </div>
        <div className="zef6-image-panel">
          <img src={card.image} alt={card.imageAlt} loading="lazy" width={543} height={724} />
          <div className="zef6-image-metrics">
            <ResultMetric value="4" label="deals closed" />
            <ResultMetric value="17" label="days" />
          </div>
        </div>
      </>
    );
  }
  if (card.kind === "press" || card.kind === "pressAlt") {
    return (
      <div className="zef6-copy zef6-press-copy">
        <p className="zef6-quote">“{card.quote}”</p>
        <div className="zef6-attribution">
          <Attribution card={card} />
        </div>
      </div>
    );
  }
  if (card.kind === "photo") {
    return (
      <>
        <img
          className="zef6-photo"
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          width={543}
          height={724}
        />
        <div className="zef6-photo-caption" style={{ background: card.tone }}>
          <p className="zef6-quote">“{card.quote}”</p>
          <Attribution card={card} />
        </div>
      </>
    );
  }
  if (card.kind === "green") {
    return (
      <>
        <div className="zef6-image-panel">
          <img src={card.image} alt={card.imageAlt} loading="lazy" width={543} height={724} />
        </div>
        <div className="zef6-copy">
          <p className="zef6-quote">“{card.quote}”</p>
          <Attribution card={card} />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="zef6-copy">
        <p className="zef6-quote">“{card.quote}”</p>
        <Attribution card={card} />
      </div>
      <div className="zef6-image-panel">
        <img src={card.image} alt={card.imageAlt} loading="lazy" width={543} height={724} />
        <div className="zef6-image-metrics zef6-summary-metrics">
          <ResultMetric value="18" label="return bookings" />
          <ResultMetric value="30" label="days" />
        </div>
      </div>
    </>
  );
}

const SECTION_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Figtree:wght@400;500;600;700&display=swap');
.zef6-shell { background: linear-gradient(#F6F0E8 50%, #F7F4EE 50%); }
.zef6-section { position: relative; overflow: clip; border-radius: 80px; background: #1A1A1A; color: #FFFFEB; font: 400 16px/1.3 "Figtree", Inter, system-ui, sans-serif; }
.zef6-section * { box-sizing: border-box; }
.zef6-header { padding: 128px 40px 0; text-align: center; }
.zef6-eyebrow { font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: .08em; text-transform: uppercase; }
.zef6-heading { margin: 40px 0 0; font: 400 75px/1 "EB Garamond", Georgia, serif; letter-spacing: -.03em; text-wrap: balance; }
.zef6-heading em { font-weight: 400; }
.zef6-runway { position: relative; }
.zef6-stage { display: grid; justify-items: center; gap: 32px; padding: 64px 20px; }
.zef6-card { position: relative; width: 34rem; max-width: 86vw; height: 28.75rem; margin: 0; padding: 16px; border-radius: 48px; color: #1A1A1A; overflow: hidden; backface-visibility: hidden; }
.zef6-landscape { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; width: 46.25rem; }
.zef6-copy { display: flex; position: relative; flex-direction: column; justify-content: space-between; min-width: 0; height: 100%; gap: 32px; padding: 16px; }
.zef6-label { font-size: 14px; line-height: 1.3; font-weight: 500; }
.zef6-kicker { min-height: 67.8px; }
.zef6-kicker span { display: block; font-size: 28px; line-height: 1; font-weight: 700; letter-spacing: -.03em; }
.zef6-kicker span + span { margin-top: 8px; font-size: 16px; line-height: 1.3; font-weight: 500; letter-spacing: 0; opacity: .75; }
.zef6-supporting { margin: 20px 0 0; font-size: 16px; line-height: 1.35; }
.zef6-quote { margin: 0; font: 400 32px/.95 "EB Garamond", Georgia, serif; letter-spacing: -.03em; }
.zef6-quote-spaced { margin-top: 24px; }
.zef6-footer { display: flex; gap: 12px; align-items: center; font-weight: 500; }
.zef6-arrow { font-size: 26px; line-height: .7; }
.zef6-secondary { font-size: 14px; font-weight: 500; line-height: 1.3; color: #1A1A1A99; }
.zef6-image-panel { position: relative; height: 100%; min-width: 0; border-radius: 32px; overflow: hidden; background: #111; }
.zef6-image-panel img, .zef6-photo { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 28%; }
.zef6-image-metrics { position: absolute; inset: 0; display: flex; align-items: flex-end; gap: 32px; padding: 32px; color: #FFFFEB; background: linear-gradient(transparent 48%, #0009); }
.zef6-metric { flex: 1; min-width: 0; font-size: 14px; font-weight: 500; line-height: 1.15; }
.zef6-number { margin-bottom: 8px; font: italic 400 48px/1 "EB Garamond", Georgia, serif; letter-spacing: -.04em; }
.zef6-attribution { display: flex; align-items: center; gap: 16px; font-size: 14px; font-weight: 500; }
.zef6-brand { font-size: 24px; font-weight: 700; letter-spacing: -.05em; }
.zef6-photo-caption { display: flex; position: absolute; inset: auto 16px 16px; flex-direction: column; justify-content: space-between; gap: 32px; min-height: 210.2px; padding: 24px; border-radius: 32px; }
.zef6-summary-metrics { padding: 24px; gap: 16px; }
.zef6-section[data-animated] .zef6-stage { display: block; position: sticky; top: 0; height: 100vh; padding: 0; perspective-origin: 50% 50%; }
.zef6-section[data-animated] .zef6-card { position: absolute; left: 50%; top: 50vh; transform-style: preserve-3d; will-change: transform; }
@media (max-width: 991px) {
  .zef6-section { border-radius: 40px; }
  .zef6-header { padding-top: 96px; }
  .zef6-heading { font-size: 60px; }
}
@media (max-width: 767px) {
  .zef6-header { padding: 64px 20px 0; }
  .zef6-heading { margin-top: 24px; font-size: 48px; }
  .zef6-card { border-radius: 24px; height: 352px; }
  .zef6-landscape { display: flex; flex-direction: column; height: auto; gap: 8px; }
  .zef6-copy { padding: 16px 0; height: auto; gap: 20px; }
  .zef6-supporting { margin-top: 16px; font-size: 14px; }
  .zef6-card[data-result-card="summary"] .zef6-quote { font-size: 22px; }
  .zef6-card[data-result-card="broker"] .zef6-copy { min-height: 266.75px; }
  .zef6-card[data-result-card="follow-through"] .zef6-copy { min-height: 171.365px; }
  .zef6-card[data-result-card="summary"] .zef6-copy { min-height: 207.167px; }
  .zef6-press-copy { height: 320px; }
  .zef6-quote { font-size: 24px; }
  .zef6-image-panel { flex: none; width: 100%; height: auto; aspect-ratio: 1; border-radius: 16px; }
  .zef6-card[data-result-card="follow-through"] .zef6-image-panel { order: 2; }
  .zef6-photo-caption { padding: 24px; border-radius: 24px; }
  .zef6-image-metrics { padding: 16px; gap: 24px; }
  .zef6-summary-metrics { padding: 16px; gap: 16px; }
}
@media (max-width: 479px) { .zef6-heading { font-size: 40px; } }
@media (prefers-reduced-motion: reduce) {
  .zef6-section { border-radius: 40px; }
  .zef6-runway { height: auto !important; }
  .zef6-section[data-animated] .zef6-stage { position: static; height: auto; display: grid; gap: 32px; padding: 64px 20px; perspective: none !important; }
  .zef6-section[data-animated] .zef6-card { position: relative; top: auto; left: auto; transform: none !important; will-change: auto; }
}
`;

export function ZaplaEarlyResultsFlowV6() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduced = !!useReducedMotion();
  useResultOrbit(sectionRef, reduced);
  return (
    <section className="zef6-shell" aria-labelledby="zef6-heading">
      <style>{SECTION_STYLES}</style>
      <div ref={sectionRef} className="zef6-section">
        <header className="zef6-header">
          <div className="zef6-eyebrow">Customer stories</div>
          <h2 id="zef6-heading" className="zef6-heading">
            Real businesses.
            <br />
            <em>Real follow-through.</em>
          </h2>
        </header>
        <div className="zef6-runway">
          <div className="zef6-stage">
            {RESULT_CARDS.map((card) => (
              <article
                key={card.id}
                data-result-card={card.id}
                className={`zef6-card ${["caseStudy", "green", "closing"].includes(card.kind) ? "zef6-landscape" : ""}`}
                style={{ background: card.tone }}
              >
                <CardContent card={card} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
