import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  Mail,
  MessageSquareText,
  PhoneCall,
  RefreshCw,
  Star,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";
const EASE = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${dark ? "text-white/45" : "text-[#456C70]"}`}>
      {children}
    </div>
  );
}

function CustomerAvatar({ initials, className = "" }: { initials: string; className?: string }) {
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white ${className}`}>
      {initials}
    </div>
  );
}

function RevenueStream({
  path,
  stroke,
  delay,
  end,
  endX,
  endY,
}: {
  path: string;
  stroke: string;
  delay: number;
  end: string;
  endX: number;
  endY: number;
}) {
  const reduced = !!useReducedMotion();
  return (
    <>
      <motion.path
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        initial={reduced ? false : { pathLength: 0, opacity: 0.22 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduced ? 0 : 1.45, delay: reduced ? 0 : delay, ease: EASE }}
      />
      <motion.g
        initial={reduced ? false : { opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay + 1.02, ease: EASE }}
      >
        <circle cx={endX} cy={endY} r="8" fill={stroke} />
        <text x={endX + 18} y={endY + 5} fontSize="17" fontWeight="700" fill={stroke} style={{ fontFamily: DISPLAY }}>
          {end}
        </text>
      </motion.g>
    </>
  );
}

function RevenueLeakage() {
  return (
    <section className="relative overflow-hidden bg-[#F1EEE7] px-5 py-24 text-[#111318] sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="pointer-events-none absolute left-[-4%] top-[3%] whitespace-nowrap text-[24vw] font-medium leading-none tracking-[-0.085em] text-[#E5DFD4]" style={{ fontFamily: DISPLAY }}>
        FOLLOW-UP GAP
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-end">
          <Reveal>
            <Eyebrow>Where revenue leaks</Eyebrow>
            <h2 className="mt-6 max-w-[980px] text-[48px] leading-[0.91] tracking-[-0.06em] sm:text-[70px] lg:text-[96px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Same demand.
              <span className="block text-[#9B8D7A]">Different next step.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[520px] text-[16px] leading-[1.75] text-[#68635B] sm:text-[18px]">
              Revenue leakage is often invisible. One customer gets the next step. One waits. One simply falls out of the journey.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 overflow-hidden border-y border-[#D3CDC2] bg-[#F7F4EE]/80 px-4 py-8 shadow-[0_40px_120px_-90px_rgba(35,28,20,.4)] sm:mt-20 sm:px-8 sm:py-12 lg:mt-24 lg:px-12">
          <div className="absolute inset-0 opacity-[0.34]" style={{ backgroundImage: "linear-gradient(rgba(17,19,24,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,19,24,.06) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

          <div className="relative mb-8 flex items-center justify-between gap-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#918B80]">
            <span>Customer raises a hand</span>
            <span>What happens next</span>
          </div>

          <div className="relative h-[520px] sm:h-[610px] lg:h-[650px]">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden>
              <RevenueStream
                path="M85 120 C250 70 390 80 520 128 C690 190 790 174 930 112 C1020 72 1088 72 1120 88"
                stroke="#167B73"
                delay={0.02}
                end="BOOKED"
                endX={1120}
                endY={88}
              />
              <RevenueStream
                path="M85 305 C250 268 405 300 548 292 C710 282 822 246 965 294 C1044 320 1089 330 1120 328"
                stroke="#B8892B"
                delay={0.16}
                end="WAITING"
                endX={1120}
                endY={328}
              />
              <RevenueStream
                path="M85 492 C262 444 390 470 548 474 C690 478 780 456 842 484 C910 515 874 584 948 610"
                stroke="#C85D61"
                delay={0.3}
                end="LOST"
                endX={948}
                endY={610}
              />
            </svg>

            <div className="absolute left-[1%] top-[4%] flex w-[250px] items-start gap-3 bg-white/95 px-4 py-4 shadow-[0_18px_55px_-36px_rgba(25,20,14,.5)]">
              <CustomerAvatar initials="AW" />
              <div>
                <div className="text-[11px] font-semibold">Alex Wong</div>
                <div className="mt-1 text-[9px] text-[#8D887F]">Website enquiry · 9:14</div>
                <div className="mt-3 text-[12px] leading-[1.4]">“Can I book Thursday morning?”</div>
              </div>
            </div>

            <div className="absolute left-[1%] top-[35%] flex w-[250px] items-start gap-3 bg-white/95 px-4 py-4 shadow-[0_18px_55px_-36px_rgba(25,20,14,.5)]">
              <CustomerAvatar initials="SM" />
              <div>
                <div className="text-[11px] font-semibold">Sarah Miller</div>
                <div className="mt-1 text-[9px] text-[#8D887F]">Quote sent · Monday</div>
                <div className="mt-3 text-[12px] leading-[1.4]">“Thanks. I’ll have a look tonight.”</div>
              </div>
            </div>

            <div className="absolute left-[1%] top-[69%] flex w-[250px] items-start gap-3 bg-white/95 px-4 py-4 shadow-[0_18px_55px_-36px_rgba(25,20,14,.5)]">
              <CustomerAvatar initials="DL" />
              <div>
                <div className="text-[11px] font-semibold">Daniel Lee</div>
                <div className="mt-1 text-[9px] text-[#8D887F]">Past customer · 184 days</div>
                <div className="mt-3 text-[12px] leading-[1.4]">No new conversation.</div>
              </div>
            </div>

            <div className="absolute left-[35%] top-[7%] hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#167B73] sm:block">Reply · booking · confirmation</div>
            <div className="absolute left-[43%] top-[42%] hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B8892B] sm:block">Quote sent · no owner · silence</div>
            <div className="absolute left-[56%] top-[78%] hidden max-w-[210px] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C85D61] sm:block">No trigger · no reactivation · customer disappears</div>
          </div>
        </div>

        <Reveal className="mt-10 flex flex-col gap-4 border-t border-[#D3CDC2] pt-7 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[820px] text-[31px] leading-[1] tracking-[-0.045em] sm:text-[45px] lg:text-[56px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            The expensive part is not rejection. It is the customer who never got the next step.
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C8274]">That is the follow-through gap.</div>
        </Reveal>
      </div>
    </section>
  );
}

function AICore() {
  const reduced = !!useReducedMotion();
  return (
    <div className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[370px] sm:w-[370px] lg:h-[430px] lg:w-[430px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,.34),rgba(5,5,8,0)_68%)] blur-2xl" />
      <motion.div
        className="absolute inset-[5%] rounded-full border border-white/8"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#7DD3FC] shadow-[0_0_18px_rgba(125,211,252,.8)]" />
      </motion.div>
      <motion.div
        className="absolute inset-[15%] rounded-full border border-[#8B5CF6]/30"
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-[8%] right-[-4px] h-2 w-2 rounded-full bg-[#C4B5FD] shadow-[0_0_18px_rgba(196,181,253,.8)]" />
      </motion.div>
      <div className="absolute inset-[28%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,.24),rgba(99,102,241,.2)_30%,rgba(8,10,18,.96)_72%)] shadow-[inset_-24px_-24px_60px_rgba(0,0,0,.55),0_0_80px_rgba(99,102,241,.25)]" />
      <div className="relative z-10 text-center">
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/36">Zapla intelligence</div>
        <div className="mt-2 text-[23px] leading-none tracking-[-0.04em] text-white sm:text-[28px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Next step</div>
        <div className="mt-1 text-[23px] leading-none tracking-[-0.04em] text-[#A5F3FC] sm:text-[28px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>in motion</div>
      </div>
    </div>
  );
}

function AISignal({ className, label, title, detail, icon }: { className: string; label: string; title: string; detail: string; icon: ReactNode }) {
  return (
    <Reveal className={`absolute z-30 ${className}`}>
      <div className="min-w-[190px] border border-white/10 bg-white/[0.055] px-4 py-4 shadow-[0_24px_80px_-48px_rgba(0,0,0,.9)] backdrop-blur-xl sm:min-w-[230px]">
        <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/34">
          <span className="text-[#A5F3FC]">{icon}</span>{label}
        </div>
        <div className="mt-3 text-[15px] font-semibold text-white">{title}</div>
        <div className="mt-1.5 text-[11px] leading-[1.45] text-white/44">{detail}</div>
      </div>
    </Reveal>
  );
}

function AISection() {
  return (
    <section className="relative overflow-hidden bg-[#050507] px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 72% 34%, rgba(109,40,217,.22), transparent 28%), radial-gradient(circle at 28% 72%, rgba(6,182,212,.15), transparent 26%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)", backgroundSize: "auto, auto, 72px 72px, 72px 72px" }} />
      <div className="pointer-events-none absolute left-[-5%] top-[6%] whitespace-nowrap text-[21vw] font-medium leading-none tracking-[-0.08em] text-white/[0.025]" style={{ fontFamily: DISPLAY }}>
        INTELLIGENCE
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,.92fr)] lg:items-end">
          <Reveal>
            <Eyebrow dark>Zapla AI · the operating layer</Eyebrow>
            <h2 className="mt-6 max-w-[980px] text-[48px] leading-[0.91] tracking-[-0.06em] sm:text-[70px] lg:text-[96px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              AI that does the
              <span className="block bg-gradient-to-r from-cyan-200 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">follow-through.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[520px] text-[16px] leading-[1.75] text-white/50 sm:text-[18px]">
              Respond, qualify, book, follow up and re-engage around the workflows you choose. The intelligence is useful because it moves the customer forward.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 min-h-[820px] overflow-hidden border border-white/8 bg-white/[0.018] sm:mt-20 lg:mt-24 lg:min-h-[860px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <AICore />
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="aiLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(103,232,249,.15)" />
                <stop offset="48%" stopColor="rgba(103,232,249,.65)" />
                <stop offset="100%" stopColor="rgba(196,181,253,.22)" />
              </linearGradient>
            </defs>
            <motion.path d="M76 205 C250 198 330 275 470 340" fill="none" stroke="url(#aiLine)" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: EASE }} />
            <motion.path d="M72 590 C245 590 330 520 475 455" fill="none" stroke="url(#aiLine)" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, delay: 0.16, ease: EASE }} />
            <motion.path d="M730 336 C865 270 960 216 1128 214" fill="none" stroke="url(#aiLine)" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, delay: 0.24, ease: EASE }} />
            <motion.path d="M730 460 C875 510 970 592 1125 596" fill="none" stroke="url(#aiLine)" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, delay: 0.34, ease: EASE }} />
          </svg>

          <AISignal className="left-[4%] top-[13%]" label="Enquiry detected" title="“Can I book Thursday?”" detail="Intent: booking · source: website" icon={<MessageSquareText className="h-3.5 w-3.5" />} />
          <AISignal className="bottom-[14%] left-[4%]" label="Missed call" title="SMS sent automatically" detail="“Sorry we missed you. How can we help?”" icon={<PhoneCall className="h-3.5 w-3.5" />} />
          <AISignal className="right-[4%] top-[14%]" label="Booking action" title="Thursday · 10:30 held" detail="Customer confirmed · calendar updated" icon={<CalendarDays className="h-3.5 w-3.5" />} />
          <AISignal className="bottom-[13%] right-[4%]" label="Reactivation" title="184-day customer identified" detail="Re-engagement sequence started" icon={<RefreshCw className="h-3.5 w-3.5" />} />

          <div className="absolute left-1/2 top-[9%] -translate-x-1/2 text-center">
            <div className="font-mono text-[9px] tracking-[0.16em] text-white/24">LISTEN → UNDERSTAND → ACT</div>
          </div>
          <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/28">Your rules · your customer context · Zapla executes</div>
        </div>
      </div>
    </section>
  );
}

function GrowthMoment({ className, tone, children }: { className: string; tone: string; children: ReactNode }) {
  return (
    <Reveal className={`absolute ${className}`}>
      <div className={`shadow-[0_28px_90px_-54px_rgba(15,23,42,.42)] ${tone}`}>{children}</div>
    </Reveal>
  );
}

function CustomerGrowth() {
  return (
    <section className="relative overflow-hidden bg-[#EEF2EC] px-5 py-24 text-[#111318] sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="pointer-events-none absolute left-[-4%] top-[4%] whitespace-nowrap text-[18vw] font-medium leading-none tracking-[-0.075em] text-[#DCE5DD]" style={{ fontFamily: DISPLAY }}>
        STAY IN THE CONVERSATION
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(340px,.94fr)] lg:items-end">
          <Reveal>
            <Eyebrow>Customer growth · email + SMS + automation</Eyebrow>
            <h2 className="mt-6 max-w-[900px] text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[90px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              One customer.
              <span className="block text-[#668A83]">A relationship that keeps moving.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[520px] text-[16px] leading-[1.75] text-[#66706B] sm:text-[18px]">
              SMS for the immediate moment. Email for the longer conversation. Automation joins the moments together so booking, payment, reviews and reactivation stay attached to the same customer.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 min-h-[1120px] sm:mt-20 lg:mt-24 lg:min-h-[980px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M90 440 C240 265 370 255 470 408 C550 530 620 570 735 452 C855 326 940 336 1110 515"
              fill="none"
              stroke="#5E8E86"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.6, ease: EASE }}
            />
          </svg>

          <div className="absolute left-[3%] top-[38%] z-30 flex items-center gap-3">
            <CustomerAvatar initials="SM" className="h-14 w-14 text-[12px]" />
            <div>
              <div className="text-[13px] font-semibold">Sarah Miller</div>
              <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7E8C85]">Customer since May</div>
            </div>
          </div>

          <GrowthMoment className="left-[7%] top-[7%] rotate-[-3deg]" tone="w-[245px] bg-[#CBE8FF] px-5 py-5 sm:w-[285px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#38627C]"><MessageSquareText className="h-3.5 w-3.5" /> SMS · May 3</div>
            <div className="mt-4 text-[22px] leading-[1.08] tracking-[-0.03em] sm:text-[27px]" style={{ fontFamily: DISPLAY }}>“Thursday 10:30 is free. Want me to book it?”</div>
            <div className="mt-4 text-[10px] font-semibold text-[#38627C]">Booked ✓</div>
          </GrowthMoment>

          <GrowthMoment className="right-[5%] top-[4%] rotate-[2deg]" tone="w-[270px] bg-[#FFE8B8] px-5 py-5 sm:w-[320px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#856126]"><CalendarDays className="h-3.5 w-3.5" /> Reminder · May 4</div>
            <div className="mt-5 text-[13px] leading-[1.55] text-[#5D4A29]">Appointment tomorrow at 10:30. Reply C to confirm or R to reschedule.</div>
            <div className="mt-5 flex items-center justify-between border-t border-[#CBAF79] pt-3 text-[9px] font-semibold text-[#856126]"><span>Delivered</span><span>Confirmed</span></div>
          </GrowthMoment>

          <GrowthMoment className="left-[22%] top-[39%] rotate-[1.5deg]" tone="w-[255px] bg-white px-5 py-5 sm:w-[300px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#748078]"><CircleDollarSign className="h-3.5 w-3.5" /> Payment · May 5</div>
            <div className="mt-5 text-[34px] leading-none tracking-[-0.04em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>$420.00</div>
            <div className="mt-2 text-[10px] text-[#87918A]">Invoice ZP-1042 · paid</div>
            <div className="mt-5 h-1.5 w-full bg-[#E5EAE6]"><div className="h-full w-full bg-[#60A79D]" /></div>
          </GrowthMoment>

          <GrowthMoment className="right-[10%] top-[37%] rotate-[-2deg]" tone="w-[260px] bg-[#F4D9FF] px-5 py-5 sm:w-[310px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#7A4C86]"><Star className="h-3.5 w-3.5" /> Review · May 6</div>
            <div className="mt-4 flex gap-1 text-[#6C3D79]">★★★★★</div>
            <div className="mt-3 text-[18px] leading-[1.25] tracking-[-0.02em]" style={{ fontFamily: DISPLAY }}>“Fast, easy and genuinely helpful.”</div>
            <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7A4C86]">Review request → published</div>
          </GrowthMoment>

          <GrowthMoment className="left-[9%] bottom-[5%] rotate-[2deg]" tone="w-[300px] bg-[#111318] px-5 py-5 text-white sm:w-[350px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/40"><Mail className="h-3.5 w-3.5" /> Email · Aug 8</div>
            <div className="mt-5 text-[11px] font-semibold text-[#A5F3FC]">It has been 90 days</div>
            <div className="mt-2 text-[26px] leading-[1.04] tracking-[-0.035em] sm:text-[31px]" style={{ fontFamily: DISPLAY }}>Ready for your next appointment?</div>
            <div className="mt-5 border-t border-white/10 pt-4 text-[10px] leading-[1.55] text-white/48">A personalised reactivation email goes out because the customer journey never disappeared from view.</div>
          </GrowthMoment>

          <GrowthMoment className="right-[7%] bottom-[7%] rotate-[-1deg]" tone="w-[240px] bg-[#CFF4DE] px-5 py-5 sm:w-[285px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#327052]"><RefreshCw className="h-3.5 w-3.5" /> Reactivated · Aug 8</div>
            <div className="mt-4 text-[22px] leading-[1.08] tracking-[-0.03em]" style={{ fontFamily: DISPLAY }}>“Yes — next Tuesday works.”</div>
            <div className="mt-5 text-[10px] font-semibold text-[#327052]">New booking created ✓</div>
          </GrowthMoment>

          <div className="absolute bottom-[45%] left-1/2 hidden -translate-x-1/2 text-center lg:block">
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#748079]">Same record · same context</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cursor({ label, className = "", inverse = false }: { label: string; className?: string; inverse?: boolean }) {
  return (
    <div className={`absolute z-40 flex items-start gap-2 ${className}`}>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
        <path d="M2 1.5L16 11.1L9.8 12.2L6.7 20L2 1.5Z" fill={inverse ? "#FFFFFF" : "#111318"} />
      </svg>
      <span className={`whitespace-nowrap px-2.5 py-1.5 text-[10px] font-semibold shadow-[0_8px_22px_rgba(15,23,42,.16)] ${inverse ? "bg-white text-[#111318]" : "bg-[#111318] text-white"}`}>{label}</span>
    </div>
  );
}

function UnlimitedUsers() {
  return (
    <section className="relative overflow-hidden bg-[#C9E0DE] px-5 py-24 text-[#111318] sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="pointer-events-none absolute left-[-5%] top-[3%] whitespace-nowrap text-[22vw] font-medium leading-none tracking-[-0.08em] text-[#AFCFCD]/80" style={{ fontFamily: DISPLAY }}>
        UNLIMITED
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal className="max-w-[820px]">
          <Eyebrow>Unlimited users included</Eyebrow>
          <h2 className="mt-6 text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[70px] lg:text-[94px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Your whole team can
            <span className="block text-[#4F7E7A]">follow through.</span>
          </h2>
          <p className="mt-6 max-w-[620px] text-[16px] leading-[1.75] text-[#586C69] sm:text-[18px]">One customer context. Everyone who needs access. No per-seat tax deciding who gets to see the work.</p>
        </Reveal>

        <div className="relative mt-14 min-h-[760px] sm:mt-20 lg:min-h-[830px]">
          <div className="absolute left-[4%] right-[2%] top-[11%] min-h-[630px] overflow-hidden border border-[#9BBFBC] bg-[#F8FBFA] shadow-[0_44px_120px_-70px_rgba(18,61,58,.55)] lg:left-[24%] lg:top-[5%]">
            <div className="flex items-center justify-between border-b border-[#D8E5E3] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <CustomerAvatar initials="SM" className="h-11 w-11" />
                <div><div className="text-[13px] font-semibold">Sarah Miller</div><div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[#879D99]">Customer record · live</div></div>
              </div>
              <div className="hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#557D78] sm:flex"><span className="h-2 w-2 rounded-full bg-[#4BA390]" /> Everyone sees the same context</div>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.12fr_.88fr]">
              <div className="border-b border-[#D8E5E3] p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#879D99]">Conversation</div>
                <div className="mt-5 space-y-3">
                  <div className="max-w-[78%] bg-[#E8F3F1] px-4 py-3 text-[12px] leading-[1.5]">Hi, are you available Thursday morning?</div>
                  <div className="ml-auto max-w-[82%] bg-[#111318] px-4 py-3 text-[12px] leading-[1.5] text-white">Yes — 10:30 is available. Want me to book it?</div>
                  <div className="max-w-[62%] bg-[#E8F3F1] px-4 py-3 text-[12px] leading-[1.5]">Perfect. Thank you.</div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[["Source","Website"],["Owner","Front desk"],["Status","Booked"],["Value","$420"]].map(([label,value]) => (
                    <div key={label} className="border-t border-[#D8E5E3] pt-3"><div className="text-[8px] uppercase tracking-[0.14em] text-[#93A4A1]">{label}</div><div className="mt-1.5 text-[12px] font-semibold">{value}</div></div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#879D99]">Customer journey</div>
                <div className="mt-6 space-y-0">
                  {[
                    ["Enquiry received","9:14","done"],
                    ["Reply sent","9:16","done"],
                    ["Appointment booked","Thu · 10:30","done"],
                    ["Payment due","After service","next"],
                    ["Review request","After payment","future"],
                    ["Reactivation","90 days","future"],
                  ].map(([label,time,status], index) => (
                    <div key={label} className="relative flex gap-4 pb-6 last:pb-0">
                      {index < 5 ? <div className="absolute left-[6px] top-4 h-full w-px bg-[#C7DAD7]" /> : null}
                      <div className={`relative z-10 mt-1 h-3.5 w-3.5 rounded-full border-2 ${status === "done" ? "border-[#4C9D8E] bg-[#4C9D8E]" : status === "next" ? "border-[#111318] bg-white" : "border-[#CAD8D6] bg-[#F8FBFA]"}`} />
                      <div><div className="text-[11px] font-semibold">{label}</div><div className="mt-1 text-[9px] text-[#8AA09C]">{time}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Cursor label="Owner" className="left-[3%] top-[9%] lg:left-[21%]" />
          <Cursor label="Front desk" className="right-[4%] top-[18%]" />
          <Cursor label="Sales" className="left-[6%] top-[54%] lg:left-[18%]" />
          <Cursor label="Accounts" className="right-[6%] top-[61%]" />
          <Cursor label="Team" className="left-[43%] bottom-[7%]" />
        </div>

        <div className="border-t border-[#9DBFBC] pt-6 text-[15px] font-semibold uppercase tracking-[0.16em] text-[#4B7C77]">Unlimited users. One connected customer journey.</div>
      </div>
    </section>
  );
}

function Paper({ className, children }: { className: string; children: ReactNode }) {
  return <div className={`absolute shadow-[0_24px_65px_-40px_rgba(46,35,20,.5)] ${className}`}>{children}</div>;
}

function GuidedLaunch() {
  return (
    <section className="relative overflow-hidden bg-[#F3EBDD] px-5 py-24 text-[#111318] sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="pointer-events-none absolute right-[-6%] top-[3%] whitespace-nowrap text-[22vw] font-medium leading-none tracking-[-0.08em] text-[#E4D8C6]" style={{ fontFamily: DISPLAY }}>
        LAUNCH
      </div>

      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 className="mt-6 max-w-[740px] text-[48px] leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[88px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Your process already exists.
              <span className="block text-[#997C5F]">We make it work together.</span>
            </h2>
            <p className="mt-7 max-w-[600px] text-[16px] leading-[1.75] text-[#756B5F] sm:text-[18px]">We learn how customers actually move through your business, then map, build and launch the important follow-through with your team.</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:pt-20">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[["01","Map"],["02","Build"],["03","Launch"],["04","Tune"]].map(([n,title]) => (
                <div key={title} className="border-t border-[#CDBDA7] pt-4"><div className="font-mono text-[9px] text-[#A5947D]">{n}</div><div className="mt-2 text-[24px] tracking-[-0.035em] sm:text-[28px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>{title}</div></div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16 min-h-[760px] overflow-hidden border-y border-[#CCBDA8] bg-[#EADFCF] sm:mt-20 lg:mt-24">
          <div className="absolute inset-0 opacity-45" style={{ backgroundImage: "radial-gradient(circle at 18% 30%, rgba(255,255,255,.75), transparent 20%), radial-gradient(circle at 82% 75%, rgba(187,154,111,.22), transparent 24%)" }} />

          <Paper className="left-[6%] top-[11%] w-[240px] rotate-[-6deg] bg-white px-5 py-5 sm:w-[285px]">
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9F9A92]">Website enquiry</div>
            <div className="mt-4 text-[24px] leading-[1.05] tracking-[-0.03em]" style={{ fontFamily: DISPLAY }}>Can someone call me about Thursday?</div>
            <div className="mt-5 border-t border-[#E3E0DA] pt-3 text-[9px] text-[#AAA49B]">New form · no owner</div>
          </Paper>

          <Paper className="right-[7%] top-[9%] w-[210px] rotate-[5deg] bg-[#FFF3A9] px-5 py-6 sm:w-[250px]">
            <div className="text-[20px] leading-[1.12] tracking-[-0.02em]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>FOLLOW UP QUOTE!!!</div>
            <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#927C2E]">sticky note · desk</div>
          </Paper>

          <Paper className="left-[14%] bottom-[11%] w-[225px] rotate-[3deg] border-y border-[#D0C3AF] bg-[#F9F3E8] px-5 py-5 sm:w-[270px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9B8A76]"><PhoneCall className="h-3.5 w-3.5" /> missed call</div>
            <div className="mt-4 font-mono text-[17px]">0412 884 103</div>
            <div className="mt-2 text-[10px] text-[#9D8F7D]">Tuesday · 2:41pm</div>
          </Paper>

          <Paper className="right-[12%] bottom-[10%] w-[230px] rotate-[-4deg] bg-white px-5 py-5 sm:w-[280px]">
            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9B8A76]"><CalendarDays className="h-3.5 w-3.5" /> calendar note</div>
            <div className="mt-4 text-[27px] leading-none tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>Thu · 10:30</div>
            <div className="mt-2 text-[12px] text-[#695F55]">Sarah?</div>
          </Paper>

          <div className="absolute left-1/2 top-1/2 z-30 w-[82%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 bg-[#111318] px-6 py-7 text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,.75)] sm:px-8 sm:py-8">
            <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/38">Your customer journey · mapped with Zapla</div>
            <div className="mt-7 grid gap-5 sm:grid-cols-4">
              {[
                ["Capture","Enquiry · call · form"],
                ["Own","Right person · right stage"],
                ["Follow","Reply · booking · quote"],
                ["Complete","Pay · review · return"],
              ].map(([title,copy], index) => (
                <div key={title} className="relative border-t border-white/14 pt-4">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A5F3FC]">0{index + 1}</div>
                  <div className="mt-2 text-[17px] font-semibold">{title}</div>
                  <div className="mt-2 text-[10px] leading-[1.45] text-white/42">{copy}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/34"><span>Built around your process</span><span className="text-[#A5F3FC]">Launched with your team →</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="relative overflow-hidden bg-[#5C63E8] px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="absolute -right-[8%] top-[-8%] h-[520px] w-[520px] rounded-full bg-[#9CA3FF]/22 blur-3xl" />
      <div className="absolute -bottom-[16%] left-[8%] h-[460px] w-[460px] rounded-full bg-[#2DE2D0]/16 blur-3xl" />
      <div className="relative mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Eyebrow dark>Customer result · proof slot</Eyebrow>
            <div className="mt-7 text-[130px] leading-[0.72] tracking-[-0.085em] sm:text-[180px] lg:text-[240px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>4</div>
            <div className="mt-8 text-[31px] leading-[0.98] tracking-[-0.045em] sm:text-[46px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>deals closed</div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-t border-white/22 pt-7">
              <div className="text-[72px] leading-none tracking-[-0.06em] sm:text-[94px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>17 days.</div>
              <p className="mt-7 max-w-[650px] text-[17px] leading-[1.7] text-white/66 sm:text-[20px]">One early customer example of what better follow-through can unlock when the system stops depending on memory alone.</p>
              <div className="mt-9 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50"><span className="h-2 w-2 rounded-full bg-[#A5F3FC]" /> Replace with approved case study details before production</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Decision() {
  return (
    <section className="relative overflow-hidden bg-[#08090B] px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16 lg:py-40">
      <div className="pointer-events-none absolute left-[-7%] top-[8%] whitespace-nowrap text-[19vw] font-medium leading-none tracking-[-0.075em] text-white/[0.025]" style={{ fontFamily: DISPLAY }}>FOLLOW THROUGH</div>
      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <div className="max-w-[1180px] text-[50px] leading-[0.9] tracking-[-0.065em] sm:text-[76px] lg:text-[112px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            You do the work only your team can do.
            <span className="block text-[#9DE5E0]">Zapla keeps the customer moving.</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-white/12 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-5 sm:grid-cols-2 lg:max-w-[780px] lg:grid-cols-4">
            {[
              [<Workflow className="h-4 w-4" />,"Connected journey"],
              [<Zap className="h-4 w-4" />,"AI follow-through"],
              [<UsersRound className="h-4 w-4" />,"Unlimited users"],
              [<Check className="h-4 w-4" />,"Guided Launch"],
            ].map(([icon,label]) => (
              <div key={String(label)} className="flex items-center gap-3 text-[11px] font-semibold text-white/55"><span className="text-[#9DE5E0]">{icon}</span>{label}</div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={BOOK_URL} className="inline-flex h-[52px] items-center gap-2 bg-white px-6 text-[13px] font-semibold text-[#111318]">Book a Call <ArrowRight className="h-4 w-4" /></a>
            <a href="/pricing" className="inline-flex h-[52px] items-center border border-white/20 px-6 text-[13px] font-semibold text-white/80">See pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ZaplaHomepageContinuationV5() {
  return (
    <>
      <RevenueLeakage />
      <AISection />
      <CustomerGrowth />
      <UnlimitedUsers />
      <GuidedLaunch />
      <ProofSection />
      <Decision />
    </>
  );
}
