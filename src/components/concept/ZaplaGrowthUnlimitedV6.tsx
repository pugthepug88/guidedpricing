import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}>{children}</motion.div>;
}

export function ZaplaGrowthV6() {
  const reduced = !!useReducedMotion();
  const milestones = [
    { className: "left-[36%] top-[22%] -rotate-2", label: "May 5 · Reminder", title: "Appointment tomorrow", copy: "SMS · confirmed" },
    { className: "left-[49%] top-[58%] rotate-2", label: "May 8 · Payment", title: "$840 paid", copy: "Receipt sent" },
    { className: "left-[59%] top-[20%] rotate-[1.4deg]", label: "May 9 · Review", title: "★★★★★", copy: "Made the whole process easy." },
  ];
  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] px-5 py-24 text-[#0D1117] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_.65fr] lg:items-end lg:gap-24">
          <Reveal><div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">Customer growth</div><h2 className="mt-5 text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[86px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Follow-through doesn’t stop<span className="block text-[#818785]">after the first sale.</span></h2></Reveal>
          <Reveal delay={0.08} className="lg:pb-2"><p className="max-w-[530px] text-[16px] leading-[1.7] text-[#6D736F] sm:text-[18px]">The first booking is one moment, not the whole relationship. Zapla keeps reminders, payments, review requests and reactivation moving, so a finished job turns into the next booking.</p></Reveal>
        </div>

        <div className="relative mt-12 min-h-[760px] sm:mt-16 lg:min-h-[680px]">
          <div className="pointer-events-none absolute -left-3 top-4 hidden whitespace-nowrap text-[180px] leading-[.8] tracking-[-0.08em] text-[#E4DED3] lg:block" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>STAY CLOSE</div>
          <motion.div initial={reduced ? false : { opacity: 0, x: -30, rotate: -3 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0 : 0.65, ease: EASE }} className="relative z-10 mx-auto h-[445px] w-[310px] rounded-[34px] bg-[#111318] px-5 py-6 text-white shadow-[0_35px_90px_rgba(15,23,42,.18)] lg:absolute lg:left-[2%] lg:top-[145px] lg:mx-0">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF8F7] text-[9px] font-bold text-[#111318]">SM</div><div><div className="text-[12px] font-semibold">Sarah Miller</div><div className="mt-1 text-[7px] uppercase tracking-[0.13em] text-white/35">SMS · May 3</div></div></div>
            <div className="mt-5 max-w-[82%] rounded-[16px] rounded-bl-[4px] bg-[#24282E] px-3 py-3 text-[11px] leading-[1.4] text-white/80">Hi, are you free Thursday?</div>
            <div className="ml-auto mt-5 max-w-[82%] rounded-[16px] rounded-br-[4px] bg-[#77E0E2] px-3 py-3 text-[11px] leading-[1.4] text-[#071013]">Thursday 10:30 is available. Want me to lock it in?</div>
            <div className="mt-5 w-max rounded-[16px] rounded-bl-[4px] bg-[#24282E] px-3 py-3 text-[11px] text-white/80">Yes please.</div>
            <div className="absolute bottom-5 left-5 right-5 border-t border-white/10 pt-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-cyan-200/70">Booked · Thu 10:30</div>
          </motion.div>
          <svg className="pointer-events-none absolute left-[22%] top-[155px] hidden h-[340px] w-[73%] lg:block" viewBox="0 0 1000 330" preserveAspectRatio="none" aria-hidden><motion.path d="M70 220 C210 250 250 88 410 132 S650 260 835 148 S930 74 980 100" fill="none" stroke="#0F8F95" strokeWidth="4" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.18, ease: EASE }} /></svg>
          <div className="hidden lg:block">{milestones.map((item,index)=><motion.div key={item.label} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.25 + index * 0.1, ease: EASE }} className={`absolute z-20 min-w-[205px] bg-white px-5 py-4 shadow-[0_25px_65px_rgba(15,23,42,.11)] ${item.className}`}><div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9CA3A0]">{item.label}</div><div className="mt-2 text-[13px] font-semibold">{item.title}</div><div className="mt-2 text-[9px] text-[#747C78]">{item.copy}</div></motion.div>)}</div>
          <motion.div initial={reduced ? false : { opacity: 0, x: 40, rotate: 2 }} whileInView={{ opacity: 1, x: 0, rotate: -2 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: reduced ? 0 : 0.68, delay: reduced ? 0 : 0.25, ease: EASE }} className="relative z-30 mx-auto mt-12 min-h-[360px] w-full max-w-[390px] bg-[#0E777B] px-7 py-8 text-white shadow-[0_30px_90px_rgba(15,23,42,.16)] lg:absolute lg:right-[1%] lg:top-[105px] lg:mt-0"><div className="flex justify-between text-[7px] font-semibold uppercase tracking-[0.14em] text-cyan-100/70"><span>To · Sarah Miller</span><span>Aug 8 · Automation</span></div><div className="mt-14 text-[32px] leading-[1.02] tracking-[-0.04em] sm:text-[36px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>It’s been 90 days.<br />Ready when you are.</div><p className="mt-5 max-w-[310px] text-[11px] leading-[1.6] text-cyan-50/82">Hey Sarah, just checking in. If you’re ready for your next appointment, I can help you find a time.</p><div className="absolute bottom-7 left-7 text-[10px] font-semibold">Book your next visit →</div></motion.div>
          <motion.div initial={reduced ? false : { opacity: 0, y: 20, rotate: -2 }} whileInView={{ opacity: 1, y: 0, rotate: 2 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }} className="relative z-40 mx-auto mt-7 w-[270px] bg-[#111318] px-6 py-5 text-white shadow-[0_26px_70px_rgba(15,23,42,.18)] lg:absolute lg:bottom-[18px] lg:right-[5%] lg:mt-0"><div className="text-[7px] font-semibold uppercase tracking-[0.15em] text-cyan-200/70">Aug 8 · 10:42</div><div className="mt-2 text-[24px] leading-[1.04] tracking-[-0.035em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Sarah booked again.</div></motion.div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:hidden">{milestones.map(item=><div key={item.label} className="bg-white px-4 py-4 shadow-sm"><div className="text-[7px] uppercase tracking-[0.13em] text-slate-400">{item.label}</div><div className="mt-2 text-[12px] font-semibold">{item.title}</div></div>)}</div>
        </div>
      </div>
    </section>
  );
}

type TeamMemberProps = {
  label: string;
  cell: number;
  bg: string;
  className: string;
  delay: number;
};

function TeamMember({ label, cell, bg, className, delay }: TeamMemberProps) {
  const reduced = !!useReducedMotion();
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  const backgroundPosition = `${(column / 5) * 100}% ${(row / 3) * 100}%`;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.92, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : delay, ease: EASE }}
      className={`absolute z-30 flex items-center gap-3 ${className}`}
    >
      <div
        className="h-14 w-14 shrink-0 rounded-full border border-white/12 shadow-[0_12px_34px_rgba(0,0,0,.22)]"
        style={{
          backgroundColor: bg,
          backgroundImage: `url(${PORTRAIT_SHEET})`,
          backgroundPosition,
          backgroundRepeat: "no-repeat",
          backgroundSize: "600% 400%",
        }}
      />
      <span className="whitespace-nowrap rounded-[8px] border border-white/10 bg-[#14201F]/90 px-3 py-2 text-[10px] font-semibold text-[#F7F1E8] shadow-[0_10px_28px_rgba(0,0,0,.2)] backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  );
}

const TEAM = [
  { label: "Owner", cell: 7, bg: "#C89A5D", className: "left-[2%] top-[43%]", delay: 0.06 },
  { label: "Marketing", cell: 13, bg: "#BF7458", className: "left-[49%] top-[18%]", delay: 0.12 },
  { label: "Front desk", cell: 4, bg: "#D69672", className: "right-[1%] top-[31%]", delay: 0.18 },
  { label: "Sales", cell: 16, bg: "#85845D", className: "left-[24%] bottom-[2%]", delay: 0.24 },
  { label: "Accounts", cell: 20, bg: "#B59672", className: "right-[12%] bottom-[1%]", delay: 0.3 },
] as const;

export function ZaplaUnlimitedV6() {
  return (
    <section className="relative min-h-[920px] overflow-hidden bg-[#1E2B29] px-5 py-24 text-[#F7F2EA] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div
        className="pointer-events-none absolute -left-8 top-3 whitespace-nowrap text-[36vw] leading-[.8] tracking-[-0.085em] text-[#31403D] sm:text-[245px]"
        style={{ fontFamily: DISPLAY, fontWeight: 500 }}
      >
        UNLIMITED
      </div>

      <div className="pointer-events-none absolute -left-[15%] bottom-[-32%] h-[620px] w-[620px] rounded-full border border-[#DDA34B]/[0.07]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-[8%] bottom-[-28%] h-[500px] w-[500px] rounded-full border border-[#DDA34B]/[0.06]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px]">
        <Reveal className="relative z-10 max-w-[850px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DDA34B]">Unlimited users</div>
          <h2
            className="mt-5 text-[48px] leading-[0.92] tracking-[-0.06em] text-[#F7F2EA] sm:text-[68px] lg:text-[84px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            Grow your team.<br />Not your software bill.
          </h2>
          <p className="mt-6 max-w-[650px] text-[17px] leading-[1.65] text-[#B8C0BC] sm:text-[19px]">
            <span className="font-semibold text-[#F7F2EA]">Unlimited users. No per-seat fees.</span> Add everyone who needs Zapla without paying more for every person you add.
          </p>
        </Reveal>

        <div className="relative mt-16 min-h-[560px] sm:mt-20 lg:min-h-[575px]">
          <Reveal delay={0.08} className="relative z-10 mx-auto max-w-[820px] rounded-[22px] border border-white/[0.12] bg-[#13201F]/80 px-7 py-8 text-[#F7F2EA] shadow-[0_34px_100px_rgba(0,0,0,.24)] backdrop-blur-sm lg:ml-auto lg:mr-[4%] lg:px-10 lg:py-9">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D69672] text-[10px] font-bold text-[#1A2422]">SM</div>
              <div>
                <div className="text-[22px] font-semibold">Sarah Miller</div>
                <div className="mt-1 text-[10px] text-white/42">Customer since May · 2 bookings · $1,680 lifetime value</div>
              </div>
            </div>
            <div className="grid gap-7 pt-7 sm:grid-cols-[1.15fr_.85fr]">
              <div>
                {[["Conversation","“Thursday morning works.”"],["Opportunity","Service booked · won"],["Last campaign","90-day reactivation · replied"]].map(([label,value])=><div key={label} className="border-t border-white/10 py-4 first:border-t-0 first:pt-0"><div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/34">{label}</div><div className="mt-2 text-[16px] font-semibold sm:text-[18px]">{value}</div></div>)}
              </div>
              <div>
                {[["Owner","Front desk"],["Appointment","Thu · 10:30 AM"],["Next step","Review request · tomorrow"]].map(([label,value])=><div key={label} className="border-t border-white/10 py-4 first:border-t-0 first:pt-0"><div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/34">{label}</div><div className="mt-2 text-[16px] font-semibold sm:text-[18px]">{value}</div></div>)}
              </div>
            </div>
          </Reveal>

          <div className="hidden lg:block">
            {TEAM.map((member) => <TeamMember key={member.label} {...member} />)}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5 lg:hidden">
            {TEAM.map((member) => (
              <div key={member.label} className="flex flex-col items-center gap-2 rounded-[14px] border border-white/10 bg-white/[0.04] px-3 py-4 text-center">
                <div
                  className="h-12 w-12 rounded-full border border-white/10"
                  style={{
                    backgroundColor: member.bg,
                    backgroundImage: `url(${PORTRAIT_SHEET})`,
                    backgroundPosition: `${((member.cell % 6) / 5) * 100}% ${(Math.floor(member.cell / 6) / 3) * 100}%`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "600% 400%",
                  }}
                />
                <span className="text-[10px] font-semibold text-[#F7F2EA]">{member.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col gap-2 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#DDA34B]">Unlimited users included</div>
          <div className="text-[16px] font-medium text-[#F7F2EA]">One platform. Your whole team.</div>
        </div>
      </div>
    </section>
  );
}
