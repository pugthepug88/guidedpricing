import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}>{children}</motion.div>;
}

function ZaplaLoop() {
  const reduced = !!useReducedMotion();
  return (
    <svg viewBox="0 0 420 320" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="zapla-loop-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#BFFBFF" /><stop offset=".34" stopColor="#35D5DF" /><stop offset=".68" stopColor="#2879FF" /><stop offset="1" stopColor="#BB4BF1" /></linearGradient>
        <filter id="zapla-loop-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <motion.path d="M82 72 C135 18 307 18 340 70 C368 113 311 142 260 157 C210 172 141 186 116 224 C94 257 131 287 201 286 C270 285 322 251 341 220" fill="none" stroke="url(#zapla-loop-gradient)" strokeWidth="34" strokeLinecap="round" opacity=".16" filter="url(#zapla-loop-glow)" initial={reduced ? false : { pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.16 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: reduced ? 0 : 1.2, ease: EASE }} />
      <motion.path d="M82 72 C135 18 307 18 340 70 C368 113 311 142 260 157 C210 172 141 186 116 224 C94 257 131 287 201 286 C270 285 322 251 341 220" fill="none" stroke="url(#zapla-loop-gradient)" strokeWidth="16" strokeLinecap="round" filter="url(#zapla-loop-glow)" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: reduced ? 0 : 1.25, ease: EASE }} />
      <motion.path d="M86 72 C140 32 286 31 329 67" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".45" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.45, ease: EASE }} />
    </svg>
  );
}

function Signal({ className, eyebrow, title, copy, delay }: { className: string; eyebrow: string; title: string; copy: string; delay: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : delay, ease: EASE }} className={`absolute z-30 w-[205px] border border-white/10 bg-[#101117]/82 px-4 py-4 backdrop-blur-xl ${className}`}><div className="text-[7px] font-semibold uppercase tracking-[0.15em] text-white/30">{eyebrow}</div><div className="mt-2 text-[12px] font-semibold text-white">{title}</div><div className="mt-1 text-[10px] leading-[1.45] text-white/48">{copy}</div></motion.div>;
}

export function ZaplaAISectionV6() {
  return (
    <section className="relative min-h-[1040px] overflow-hidden bg-[#050507] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-[150px] h-[680px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(35,210,219,.20),rgba(59,77,158,.12)_32%,rgba(108,46,153,.10)_48%,transparent_70%)] blur-2xl" />
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="relative z-10 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/70">Zapla intelligence layer</div>
          <h2 className="mx-auto mt-5 max-w-[1060px] text-[48px] leading-[0.93] tracking-[-0.06em] sm:text-[68px] lg:text-[88px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>The next step can happen<br className="hidden sm:block" /> before anyone remembers it.</h2>
          <p className="mx-auto mt-6 max-w-[680px] text-[15px] leading-[1.7] text-white/50 sm:text-[17px]">Zapla listens to the moments that matter, then acts inside the workflows you choose: respond, qualify, book, follow up and reactivate.</p>
        </Reveal>

        <div className="relative mx-auto mt-10 h-[520px] max-w-[820px] sm:mt-16 lg:h-[560px]">
          {[300,430,600].map((size,index)=><div key={size} className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-cyan-200/10" style={{ width:size,height:size,transform:"translate(-50%,-50%)",opacity:index===2?0.45:1 }} />)}
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[360px] -translate-x-1/2 -translate-y-1/2"><ZaplaLoop /></div>
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 translate-y-[118px] whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.19em] text-cyan-200/80">Zapla · follow-through engine</div>
          <div className="hidden lg:block"><Signal className="left-0 top-[70px]" eyebrow="Website · 9:14:02" title="New enquiry detected" copy="Booking intent · high" delay={0.2} /><Signal className="right-0 top-[105px]" eyebrow="Zapla · 9:14:08" title="Reply ready" copy="Thursday availability found" delay={0.32} /><Signal className="bottom-[35px] left-[40px]" eyebrow="Missed call · 12:06" title="SMS sent" copy="Conversation reopened" delay={0.44} /><Signal className="bottom-[25px] right-[25px]" eyebrow="Past customer · 184 days" title="Reactivation started" copy="Segment matched · outreach live" delay={0.56} /></div>
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-3 lg:hidden">{["New enquiry detected","Reply ready","SMS sent","Reactivation started"].map(label=><div key={label} className="border border-white/10 bg-white/[0.035] px-3 py-3 text-[10px] text-white/70">{label}</div>)}</div>
        </div>

        <div className="mx-auto mt-6 grid max-w-[1160px] grid-cols-2 border-t border-white/10 sm:grid-cols-5">{["Respond","Qualify","Book","Follow up","Reactivate"].map((label,index)=><div key={label} className="border-r border-white/8 px-4 py-5 last:border-r-0"><div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/28">0{index+1}</div><div className="mt-2 text-[15px] font-semibold text-white">{label}</div></div>)}</div>
      </div>
    </section>
  );
}
