import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Boxes, Map, Rocket } from "lucide-react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const GUIDED_DISPLAY = '"Outfit", "Manrope", system-ui, sans-serif';
const GUIDED_BODY = '"Manrope", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}>{children}</motion.div>;
}

export function ZaplaGuidedLaunchV6() {
  const stages = [
    { label: "Map", icon: Map, accent: "#9CA56E", bg: "rgba(156,165,110,.13)" },
    { label: "Build", icon: Boxes, accent: "#9B86B8", bg: "rgba(155,134,184,.13)" },
    { label: "Launch", icon: Rocket, accent: "#D58C75", bg: "rgba(213,140,117,.14)" },
  ] as const;

  return (
    <section className="overflow-hidden bg-[#F6F0E8] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-12 xl:gap-16">
        <div className="relative z-10 min-w-0 max-w-[610px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C56D52]" style={{ fontFamily: GUIDED_BODY }}>Guided Launch</div>
          <h2 className="mt-6 text-[48px] leading-[0.96] tracking-[-0.052em] text-[#111318] sm:text-[62px] lg:text-[70px] xl:text-[76px]" style={{ fontFamily: GUIDED_DISPLAY, fontWeight: 500 }}>
            <span className="block">We don’t hand you software.</span>
            <span className="mt-[0.16em] block">We build it</span>
            <span className="block text-[#C96F55]">around how you work.</span>
          </h2>
          <p className="mt-7 max-w-[560px] text-[17px] leading-[1.65] text-[#64645F] sm:text-[18px]" style={{ fontFamily: GUIDED_BODY }}>We map your process, build what matters, and launch it with your team.</p>
          <div className="mt-8 flex flex-wrap gap-3" style={{ fontFamily: GUIDED_BODY }}>
            {stages.map((stage) => {
              const StageIcon = stage.icon;
              return (
                <div key={stage.label} className="inline-flex h-11 items-center gap-2.5 rounded-full border px-5 text-[14px] font-semibold text-[#252824]" style={{ background: stage.bg, borderColor: `${stage.accent}40` }}>
                  <StageIcon size={17} strokeWidth={1.8} style={{ color: stage.accent }} aria-hidden="true" />
                  {stage.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-w-0 justify-end overflow-hidden">
          <img src="/concept/guided-launch-people-v6-final.png" alt="Business owner working with a Zapla launch specialist" className="block h-auto w-full max-w-[760px] object-contain" loading="lazy" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#F6F0E8] via-[#F6F0E8]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-[#F6F0E8] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#F6F0E8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[4%] bg-gradient-to-l from-[#F6F0E8] to-transparent" />
        </div>
      </div>
    </section>
  );
}

const PROOF_STORIES = [
  {
    eyebrow: "EARLY CUSTOMER RESULT",
    profession: "Mortgage broker",
    image: "/concept/cinematic-v5/broker.jpg",
    metric: "4",
    title: "deals closed",
    timeframe: "in 17 days",
    body: "One mortgage broker used Zapla to follow up existing opportunities. Four closed. Two more remained active after 17 days.",
    footer: "2 more active",
    accent: "#D58C75",
    placeholder: false,
  },
  {
    eyebrow: "CUSTOMER STORY",
    profession: "Mechanic",
    image: "/concept/cinematic-v5/mechanic.jpg",
    metric: "",
    title: "Mechanic proof goes here.",
    timeframe: "",
    body: "First-iteration placeholder for a verified mechanic testimonial and measured result.",
    footer: "Replace with verified proof",
    accent: "#99A36D",
    placeholder: true,
  },
  {
    eyebrow: "CUSTOMER STORY",
    profession: "Dental practice",
    image: "/concept/cinematic-v5/dentist.jpg",
    metric: "",
    title: "Dental proof goes here.",
    timeframe: "",
    body: "First-iteration placeholder for a verified dental testimonial and measured result.",
    footer: "Replace with verified proof",
    accent: "#9B86B8",
    placeholder: true,
  },
] as const;

export function ZaplaProofV6() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return;
    const next = latest < 0.34 ? 0 : latest < 0.67 ? 1 : 2;
    setActive((current) => (current === next ? current : next));
  });

  const current = PROOF_STORIES[active];

  return (
    <section ref={sectionRef} className="relative bg-[#F0F1EC] text-[#111318] lg:h-[300vh]">
      <div className="px-5 py-24 sm:px-10 sm:py-28 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:overflow-hidden lg:px-16 lg:py-0">
        <div className="mx-auto w-full max-w-[1420px]">
          <div className="lg:hidden">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6C7463]">Early customer result</div>
            <div className="mt-7 text-[132px] leading-[.72] tracking-[-0.08em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>4</div>
            <h2 className="mt-6 text-[42px] leading-[.96] tracking-[-0.05em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>deals closed<br />in 17 days</h2>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.65] text-[#60635C]">One mortgage broker used Zapla to follow up existing opportunities. Four closed. Two more remained active after 17 days.</p>
            <img src="/concept/cinematic-v5/broker.jpg" alt="Mortgage broker customer story" className="mt-9 h-[480px] w-full rounded-[18px] object-cover" />
          </div>

          <div className="hidden lg:grid lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-16 xl:gap-24">
            <div className="min-w-0">
              <motion.div key={`${active}-eyebrow`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36, ease: EASE }} className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6C7463]">
                {current.eyebrow}
              </motion.div>

              <motion.div key={`${active}-copy`} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                {current.metric ? (
                  <div className="mt-7 text-[200px] leading-[.72] tracking-[-0.09em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>{current.metric}</div>
                ) : null}
                <h2 className={`${current.metric ? "mt-7" : "mt-12"} max-w-[560px] text-[54px] leading-[.94] tracking-[-0.055em] xl:text-[66px]`} style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
                  {current.title}{current.timeframe ? <><br /><span className="text-[#7A7E74]">{current.timeframe}</span></> : null}
                </h2>
                <p className="mt-7 max-w-[540px] text-[17px] leading-[1.7] text-[#62655E] xl:text-[18px]">{current.body}</p>
                <div className="mt-8 inline-flex items-center gap-3 border-t border-[#111318]/10 pt-5 text-[12px] font-semibold text-[#343833]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: current.accent }} />
                  {current.footer}
                </div>
                {current.placeholder ? <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#111318]/38">Prototype placeholder only</div> : null}
              </motion.div>

              <div className="mt-12 flex gap-2">
                {PROOF_STORIES.map((story, index) => (
                  <div key={story.profession} className="h-[3px] w-12 overflow-hidden rounded-full bg-[#111318]/10">
                    <motion.div animate={{ width: index === active ? "100%" : "0%" }} transition={{ duration: 0.35, ease: EASE }} className="h-full rounded-full" style={{ background: story.accent }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[640px] min-w-0 xl:h-[700px]">
              {PROOF_STORIES.map((story, index) => {
                const offset = index - active;
                const distance = Math.abs(offset);
                return (
                  <motion.div
                    key={story.profession}
                    className="absolute inset-[4%_4%_4%_8%] overflow-hidden rounded-[18px] bg-[#D9DDD3] shadow-[0_24px_70px_rgba(17,19,24,.12)]"
                    animate={reduced ? { opacity: index === 0 ? 1 : 0 } : {
                      x: offset * 34,
                      y: offset * 44,
                      scale: distance === 0 ? 1 : 0.93,
                      rotate: offset * 1.4,
                      opacity: distance === 0 ? 1 : distance === 1 ? 0.42 : 0.12,
                    }}
                    transition={{ duration: 0.58, ease: EASE }}
                    style={{ zIndex: 20 - distance }}
                  >
                    <img src={story.image} alt={`${story.profession} customer story`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-6 p-7 text-white">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">Customer story</div>
                        <div className="mt-2 text-[26px] leading-none tracking-[-0.035em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>{story.profession}</div>
                      </div>
                      {index === 0 ? <div className="rounded-full bg-white/92 px-4 py-2 text-[12px] font-semibold text-[#111318]">4 closed · 17 days</div> : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ZaplaFinalV6() {
  return <section className="bg-[#071012] px-5 py-28 text-white sm:px-10 lg:px-16 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_.65fr] lg:gap-20"><Reveal><h2 className="text-[56px] leading-[0.9] tracking-[-0.065em] sm:text-[76px] lg:text-[92px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>You lead.<br /><span className="text-[#74DFE1]">Zapla follows through.</span></h2></Reveal><Reveal delay={0.08} className="lg:pt-3"><p className="max-w-[500px] text-[16px] leading-[1.7] text-white/58 sm:text-[18px]">One connected customer journey. AI handling the moments that should not wait. Unlimited users included. Guided Launch with your team.</p><div className="mt-8 flex flex-wrap gap-3"><a href={BOOK_URL} className="inline-flex h-[50px] items-center bg-white px-5 text-[13px] font-semibold text-[#111318]">Book a Call</a><a href="/pricing" className="inline-flex h-[50px] items-center border border-white/20 px-5 text-[13px] font-semibold text-white">See pricing</a></div></Reveal></div></section>;
}
