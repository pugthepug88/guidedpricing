import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}>{children}</motion.div>;
}

export function ZaplaGuidedLaunchV6() {
  const reduced = !!useReducedMotion();
  const scraps = [
    { className: "left-[2%] top-[19%] -rotate-[7deg]", label: "Website enquiry", value: "Can I book Thursday?", bg: "bg-white" },
    { className: "left-[16%] bottom-[6%] rotate-[5deg]", label: "Sticky note", value: "Remember to follow up quote", bg: "bg-[#FFF1A9]" },
    { className: "right-[3%] top-[15%] rotate-[6deg]", label: "Missed call", value: "0412 884 103", bg: "bg-white" },
    { className: "right-[17%] bottom-[4%] -rotate-[4deg]", label: "Calendar", value: "Thu 10:30 · Sarah?", bg: "bg-white" },
  ];
  return (
    <section className="overflow-hidden bg-[#F0E8DD] px-5 py-24 text-[#0D1117] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mx-auto max-w-[980px] text-center"><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">Guided Launch</div><h2 className="mt-5 text-[46px] leading-[0.94] tracking-[-0.06em] sm:text-[64px] lg:text-[80px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>We don’t hand you software.<br />We build the operating flow with you.</h2><p className="mx-auto mt-6 max-w-[680px] text-[15px] leading-[1.7] text-[#786E63] sm:text-[17px]">Your process already exists in calls, inboxes, calendars, sticky notes and habits. Guided Launch turns that reality into a system your team can actually use.</p></Reveal>
        <div className="relative mx-auto mt-16 min-h-[610px] max-w-[1240px]">
          <motion.div initial={reduced ? false : { opacity: 0, y: 25, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: reduced ? 0 : 0.65, ease: EASE }} className="relative z-20 mx-auto max-w-[560px] bg-[#111318] px-7 py-8 text-white shadow-[0_40px_100px_rgba(47,36,25,.22)] lg:absolute lg:left-1/2 lg:top-5 lg:w-[560px] lg:-translate-x-1/2 lg:px-9 lg:py-9"><div className="text-[8px] font-semibold uppercase tracking-[0.16em] text-cyan-200/75">Your Zapla launch</div><div className="mt-5 text-[34px] leading-[1.02] tracking-[-0.045em] sm:text-[38px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>From scattered habits<br />to one operating rhythm.</div><div className="mt-7">{[["01","Map","Your real journey"],["02","Build","Important workflows"],["03","Launch","With your team"],["04","Tune","As the business learns"]].map(([n,title,copy])=><div key={n} className="grid grid-cols-[46px_1fr_auto] items-center border-t border-white/12 py-4"><div className="text-[9px] text-white/32">{n}</div><div className="text-[17px] font-semibold">{title}</div><div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-white/40">{copy}</div></div>)}</div></motion.div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:block">{scraps.map((item,index)=><motion.div key={item.label} initial={reduced ? false : { opacity: 0, x: index % 2 ? 35 : -35, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.18 + index * 0.08, ease: EASE }} className={`${item.bg} px-5 py-5 shadow-[0_22px_60px_rgba(74,57,38,.12)] lg:absolute lg:w-[230px] ${item.className}`}><div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9D9183]">{item.label}</div><div className="mt-2 text-[13px] font-semibold">{item.value}</div></motion.div>)}</div>
        </div>
      </div>
    </section>
  );
}

export function ZaplaProofV6() {
  return <section className="bg-white px-5 py-24 text-[#0D1117] sm:px-10 sm:py-28 lg:px-16 lg:py-32"><div className="mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-20"><Reveal><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">Early customer result · placeholder</div><div className="mt-6 text-[120px] leading-[.76] tracking-[-0.09em] sm:text-[155px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>4</div><div className="mt-6 text-[17px] font-medium">deals closed in 17 days</div></Reveal><Reveal delay={0.08}><div className="text-[34px] leading-[1.08] tracking-[-0.04em] sm:text-[44px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>“The ROI claim sounded impossible. Then the deals started closing.”</div><div className="mt-7 text-[10px] uppercase tracking-[0.14em] text-[#828888]">Mortgage broker case study · replace or approve before production</div></Reveal></div></section>;
}

export function ZaplaFinalV6() {
  return <section className="bg-[#071012] px-5 py-28 text-white sm:px-10 lg:px-16 lg:py-36"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_.65fr] lg:gap-20"><Reveal><h2 className="text-[56px] leading-[0.9] tracking-[-0.065em] sm:text-[76px] lg:text-[92px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>You lead.<br /><span className="text-[#74DFE1]">Zapla follows through.</span></h2></Reveal><Reveal delay={0.08} className="lg:pt-3"><p className="max-w-[500px] text-[16px] leading-[1.7] text-white/58 sm:text-[18px]">One connected customer journey. AI handling the moments that should not wait. Unlimited users included. Guided Launch with your team.</p><div className="mt-8 flex flex-wrap gap-3"><a href={BOOK_URL} className="inline-flex h-[50px] items-center bg-white px-5 text-[13px] font-semibold text-[#111318]">Book a Call</a><a href="/pricing" className="inline-flex h-[50px] items-center border border-white/20 px-5 text-[13px] font-semibold text-white">See pricing</a></div></Reveal></div></section>;
}
