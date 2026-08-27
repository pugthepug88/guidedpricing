import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export function ZaplaRevenueLeakageV6() {
  const reduced = !!useReducedMotion();
  const events = [
    { top: "30%", left: "59%", label: "9:31 · Calendar", value: "Appointment confirmed", rotate: -1 },
    { top: "58%", left: "44%", label: "10:05 · Payments", value: "Invoice paid · $840", rotate: 1.3 },
    { top: "75%", left: "72%", label: "11:24 · Reviews", value: "★★★★★ New review", rotate: -1.2 },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#F1EEE6] px-5 py-24 text-[#0D1117] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-20">
          <Reveal>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">Where revenue leaks</div>
            <h2 className="mt-5 max-w-[900px] text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[88px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              The customer was ready.
              <span className="block text-[#7F8582]">The business was busy.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[520px] text-[16px] leading-[1.7] text-[#686B67] sm:text-[18px]">
              The expensive failures are usually quiet. The day keeps moving, new work arrives, and one customer who raised their hand simply stops being the next thing anyone sees.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 min-h-[720px] sm:mt-20 lg:min-h-[760px]">
          <div className="pointer-events-none absolute -left-4 top-5 select-none text-[32vw] leading-[.72] tracking-[-0.09em] text-[#DED8CC] sm:text-[250px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>BUSY</div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 32, rotate: -5 }} whileInView={{ opacity: 1, y: 0, rotate: -2 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.65, ease: EASE }} className="absolute left-[4%] top-[22%] z-20 w-[88%] max-w-[430px] bg-white px-6 py-6 shadow-[0_30px_85px_rgba(15,23,42,.18)] sm:left-[6%] sm:w-[46%] sm:px-8 sm:py-7 lg:w-[35%]">
            <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div><div><div className="text-[14px] font-semibold">Sarah Miller</div><div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9AA1A1]">Website enquiry · 9:14</div></div></div>
            <div className="mt-6 max-w-[390px] text-[28px] leading-[1.06] tracking-[-0.04em] sm:text-[34px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>“Hi, are you available this week?”</div>
            <div className="mt-6 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#A2A7A5]"><span className="h-1.5 w-1.5 rounded-full bg-[#D6DAD8]" /> No owner · no reply</div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: -2 }} whileInView={{ opacity: 1, scale: 1, rotate: 2.2 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.08, ease: EASE }} className="absolute left-[46%] top-[8%] hidden h-[190px] w-[290px] overflow-hidden shadow-[0_26px_70px_rgba(15,23,42,.14)] lg:block"><img src="/concept/cinematic-v5/dentist.jpg" alt="Service team at work" className="h-full w-full object-cover saturate-[.82]" /></motion.div>
          <motion.div initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: -2 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.14, ease: EASE }} className="absolute right-[2%] top-[23%] hidden h-[320px] w-[255px] overflow-hidden shadow-[0_26px_70px_rgba(15,23,42,.14)] lg:block"><img src="/concept/cinematic-v5/construction.jpg" alt="Service business team working" className="h-full w-full object-cover saturate-[.78]" /></motion.div>
          <motion.div initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: -2.4 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.2, ease: EASE }} className="absolute bottom-[5%] left-[22%] hidden h-[205px] w-[330px] overflow-hidden shadow-[0_26px_70px_rgba(15,23,42,.14)] lg:block"><img src="/concept/cinematic-v5/agent.jpg" alt="Customer-facing work in progress" className="h-full w-full object-cover saturate-[.78]" /></motion.div>

          {events.map((item, index) => (
            <motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 18, rotate: item.rotate - 2 }} whileInView={{ opacity: 1, y: 0, rotate: item.rotate }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.18 + index * 0.1, ease: EASE }} className="absolute z-30 hidden bg-white px-5 py-4 shadow-[0_22px_60px_rgba(15,23,42,.12)] lg:block" style={{ top: item.top, left: item.left }}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#9BA1A0]">{item.label}</div><div className="mt-2 text-[13px] font-semibold">{item.value}</div>
            </motion.div>
          ))}

          <motion.div initial={reduced ? false : { opacity: 0, y: 35, rotate: -3 }} whileInView={{ opacity: 1, y: 0, rotate: 3 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.42, ease: EASE }} className="absolute left-[16%] top-[55%] z-40 w-[76%] max-w-[380px] bg-[#F8F6F1] px-6 py-5 shadow-[0_24px_68px_rgba(15,23,42,.13)] sm:left-[25%] sm:w-[42%] lg:left-[25%] lg:top-[48%]">
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9A9F9B]">11:42 · New enquiry</div><div className="mt-2 text-[14px] font-semibold">Another customer needs a reply</div><div className="mt-2 text-[11px] leading-[1.5] text-[#7F8682]">Sarah is now underneath today’s next thing.</div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 0.62, delay: reduced ? 0 : 0.58, ease: EASE }} className="absolute bottom-[2%] right-[3%] z-50 sm:right-[16%] lg:right-[18%]">
            <div className="text-[72px] leading-[.78] tracking-[-0.08em] text-[#CA5860] sm:text-[88px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>4:32</div>
            <div className="mt-4 text-[28px] leading-none tracking-[-0.04em] text-[#9B2F39] sm:text-[34px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Booked elsewhere.</div>
            <div className="mt-3 max-w-[360px] text-[8px] font-semibold uppercase tracking-[0.17em] text-[#A9676D]">Nothing broke · the next step never happened</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
