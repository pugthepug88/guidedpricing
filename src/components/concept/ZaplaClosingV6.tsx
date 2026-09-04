import { motion, useReducedMotion } from "motion/react";
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
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C56D52]"
            style={{ fontFamily: GUIDED_BODY }}
          >
            Guided Launch
          </div>

          <h2
            className="mt-6 text-[48px] leading-[0.96] tracking-[-0.052em] text-[#111318] sm:text-[62px] lg:text-[70px] xl:text-[76px]"
            style={{ fontFamily: GUIDED_DISPLAY, fontWeight: 500 }}
          >
            <span className="block">We don’t hand you software.</span>
            <span className="mt-[0.16em] block">We build it</span>
            <span className="block text-[#C96F55]">around how you work.</span>
          </h2>

          <p
            className="mt-7 max-w-[560px] text-[17px] leading-[1.65] text-[#64645F] sm:text-[18px]"
            style={{ fontFamily: GUIDED_BODY }}
          >
            We map your process, build what matters, and launch it with your team.
          </p>

          <div className="mt-8 flex flex-wrap gap-3" style={{ fontFamily: GUIDED_BODY }}>
            {stages.map((stage) => {
              const StageIcon = stage.icon;
              return (
                <div
                  key={stage.label}
                  className="inline-flex h-11 items-center gap-2.5 rounded-full border px-5 text-[14px] font-semibold text-[#252824]"
                  style={{ background: stage.bg, borderColor: `${stage.accent}40` }}
                >
                  <StageIcon size={17} strokeWidth={1.8} style={{ color: stage.accent }} aria-hidden="true" />
                  {stage.label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-w-0 justify-end overflow-hidden">
          <img
            src="/concept/guided-launch-people-v6-final.png"
            alt="Business owner working with a Zapla launch specialist"
            className="block h-auto w-full max-w-[760px] object-contain"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-[#F6F0E8] via-[#F6F0E8]/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-gradient-to-b from-[#F6F0E8] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#F6F0E8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[4%] bg-gradient-to-l from-[#F6F0E8] to-transparent" />
        </div>
      </div>
    </section>
  );
}

export function ZaplaProofV6() {
  const reduced = !!useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#165DFF] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute -left-8 top-6 select-none text-[40vw] leading-[.78] tracking-[-0.09em] text-white/[0.08] sm:text-[270px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>PROOF</div>
      <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-stretch lg:gap-16">
        <Reveal className="flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/66">Early customer result · placeholder</div>
            <div className="mt-8 text-[150px] leading-[.72] tracking-[-0.09em] sm:text-[220px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>4</div>
            <div className="mt-6 max-w-[360px] text-[34px] leading-[.98] tracking-[-0.045em] sm:text-[42px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>deals closed<br />in 17 days</div>
          </div>
          <div className="mt-10 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/48">Mortgage broker case study · replace or approve before production</div>
        </Reveal>

        <motion.div initial={reduced ? false : { opacity: 0, x: 36, rotate: 2 }} whileInView={{ opacity: 1, x: 0, rotate: -1.5 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.7, ease: EASE }} className="relative min-h-[560px] overflow-hidden bg-[#0D1E50] shadow-[0_36px_100px_rgba(3,19,71,.28)] lg:min-h-[620px]">
          <img src="/concept/cinematic-v5/broker.jpg" alt="Mortgage broker customer story" className="absolute inset-0 h-full w-full object-cover opacity-80 saturate-[.82]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,58,.02),rgba(6,18,58,.82))]" />
          <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-10 lg:p-12">
            <div className="max-w-[760px] text-[34px] leading-[1.05] tracking-[-0.045em] sm:text-[46px] lg:text-[54px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>“The ROI claim sounded impossible. Then the deals started closing.”</div>
            <div className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/62"><span className="h-2 w-2 rounded-full bg-cyan-200" /> Real result · identity withheld for placeholder</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ZaplaFinalV6() {
  return <section className="bg-[#071012] px-5 py-28 text-white sm:px-10 lg:px-16 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_.65fr] lg:gap-20"><Reveal><h2 className="text-[56px] leading-[0.9] tracking-[-0.065em] sm:text-[76px] lg:text-[92px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>You lead.<br /><span className="text-[#74DFE1]">Zapla follows through.</span></h2></Reveal><Reveal delay={0.08} className="lg:pt-3"><p className="max-w-[500px] text-[16px] leading-[1.7] text-white/58 sm:text-[18px]">One connected customer journey. AI handling the moments that should not wait. Unlimited users included. Guided Launch with your team.</p><div className="mt-8 flex flex-wrap gap-3"><a href={BOOK_URL} className="inline-flex h-[50px] items-center bg-white px-5 text-[13px] font-semibold text-[#111318]">Book a Call</a><a href="/pricing" className="inline-flex h-[50px] items-center border border-white/20 px-5 text-[13px] font-semibold text-white">See pricing</a></div></Reveal></div></section>;
}
