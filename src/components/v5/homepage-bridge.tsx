import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import {
  BellRing,
  CalendarCheck,
  Check,
  MessageSquareText,
  RotateCcw,
  Star,
  UserRound,
  Zap,
} from "lucide-react";

const SUPPORT_POINTS = [
  "Built for service businesses",
  "Guided launch",
  "Unlimited users",
  "No per-seat pricing",
];

const STAGES = [
  { label: "Enquiry", detail: "captured", icon: UserRound },
  { label: "Reply", detail: "sent", icon: MessageSquareText },
  { label: "Booked", detail: "confirmed", icon: CalendarCheck },
  { label: "Review", detail: "requested", icon: Star },
  { label: "Return", detail: "reactivated", icon: RotateCcw },
] as const;

export function CredibilityBand() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] text-white">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[540px] text-[18px] font-semibold tracking-[-0.03em] sm:text-[21px]">
          Built for the work between <span className="text-blue-300">enquiry</span> and <span className="text-emerald-300">revenue.</span>
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {SUPPORT_POINTS.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
              <Check className="h-3.5 w-3.5 text-emerald-300" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConnectedSystemStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [progressStage, setProgressStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value < 0.42) setProgressStage(0);
    else if (value < 0.68) setProgressStage(1);
    else setProgressStage(2);
  });

  return (
    <section ref={sectionRef} className="relative bg-[#050913] text-white sm:h-[225vh]">
      {/* Desktop / tablet: one persistent scene that transforms */}
      <div className="sticky top-0 hidden h-screen min-h-[700px] overflow-hidden sm:block">
        <div
          aria-hidden
          className="absolute inset-0 transition-[background] duration-700"
          style={{
            background:
              progressStage === 0
                ? "radial-gradient(900px 560px at 70% 55%, rgba(37,99,235,.10), transparent 70%), linear-gradient(180deg,#050913,#08101c)"
                : "radial-gradient(1000px 620px at 68% 55%, rgba(37,99,235,.25), transparent 65%), radial-gradient(700px 440px at 84% 72%, rgba(16,185,129,.12), transparent 70%), linear-gradient(180deg,#050913,#081323)",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col px-8 pb-10 pt-20 lg:px-12">
          <div className="flex items-end justify-between gap-10">
            <div className="max-w-[760px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                {progressStage === 0 ? "Revenue leaks in the gaps" : progressStage === 1 ? "Zapla connects the next step" : "The customer keeps moving"}
              </p>
              <motion.h2
                key={progressStage}
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReduced ? 0 : 0.4 }}
                className="mt-4 text-[56px] font-semibold leading-[0.93] tracking-[-0.055em] lg:text-[78px]"
              >
                {progressStage === 0
                  ? "The customer entered the journey. Then disappeared."
                  : progressStage === 1
                    ? "Zapla closes the gap."
                    : "Every customer gets the next step."}
              </motion.h2>
            </div>

            <div className="min-w-[260px] text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Same illustrative enquiry</p>
              <motion.p
                key={`metric-${progressStage}`}
                initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 text-[78px] font-semibold leading-none tracking-[-0.075em] lg:text-[100px]"
              >
                {progressStage === 0 ? "22h" : progressStage === 1 ? "ON" : "10:14"}
              </motion.p>
              <p className={progressStage === 0 ? "mt-2 text-[12px] font-medium text-rose-300" : "mt-2 text-[12px] font-medium text-emerald-300"}>
                {progressStage === 0 ? "without a reply" : progressStage === 1 ? "follow-through active" : "booked + confirmed"}
              </p>
            </div>
          </div>

          <div className="relative mt-10 flex-1 min-h-0">
            <div className="absolute left-[-5%] right-[-5%] top-[49%] h-[2px] bg-white/10" />

            <motion.div
              className="absolute left-[-5%] top-[49%] h-[4px] rounded-full bg-gradient-to-r from-blue-500 via-cyan-300 to-emerald-300 shadow-[0_0_34px_rgba(96,165,250,.55)]"
              animate={{ width: progressStage === 0 ? "31%" : "110%" }}
              transition={{ duration: prefersReduced ? 0 : progressStage === 0 ? 0.7 : 1.1, ease: "easeInOut" }}
            />

            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const positions = [5, 28, 51, 74, 96];
              const active = progressStage > 0 || index === 0;
              return (
                <motion.div
                  key={stage.label}
                  className="absolute top-[43%] z-20 -translate-x-1/2 text-center"
                  style={{ left: `${positions[index]}%` }}
                  animate={{ opacity: active ? 1 : 0.23, scale: active ? 1 : 0.92 }}
                  transition={{ delay: progressStage > 0 && !prefersReduced ? index * 0.08 : 0 }}
                >
                  <div className={active ? "mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-300/30 bg-[#0d1728] text-blue-200 shadow-[0_0_42px_rgba(59,130,246,.24)]" : "mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#0a1019] text-slate-700"}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={active ? "mt-4 text-[13px] font-semibold text-white" : "mt-4 text-[13px] font-semibold text-slate-700"}>{stage.label}</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-600">{stage.detail}</p>
                </motion.div>
              );
            })}

            {progressStage === 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={prefersReduced ? { opacity: 1 } : { opacity: [0, 1, 1, 0.25], x: [0, 190, 230, 260], y: [0, 0, 70, 150] }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                  className="absolute left-[5%] top-[43%] z-40"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white text-slate-950 shadow-[0_0_45px_rgba(255,255,255,.38)]">
                    <UserRound className="h-5 w-5" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 1.25 }}
                  className="absolute left-[26%] top-[67%] rotate-[-3deg] rounded-[22px] border border-rose-300/20 bg-rose-300/[0.08] px-5 py-4 backdrop-blur-xl"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-rose-300">Booked elsewhere</p>
                  <p className="mt-1 text-[12px] text-slate-400">The customer fell out after the enquiry.</p>
                </motion.div>
              </>
            ) : null}

            {progressStage === 1 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-1/2 top-[63%] z-30 -translate-x-1/2 rounded-full border border-blue-300/30 bg-blue-500/15 px-6 py-3 shadow-[0_0_90px_rgba(59,130,246,.40)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white"><Zap className="h-4 w-4 fill-current" /></span>
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-200">Next action</p>
                    <p className="text-[14px] font-semibold">Connected automatically</p>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {progressStage === 2 ? (
              <>
                <motion.div
                  initial={{ left: "5%", opacity: 0 }}
                  animate={{ left: "95%", opacity: [0, 1, 1, 1] }}
                  transition={{ duration: prefersReduced ? 0 : 4.6, ease: "easeInOut" }}
                  className="absolute top-[44%] z-40 -translate-x-1/2"
                >
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white text-slate-950 shadow-[0_0_45px_rgba(255,255,255,.5)]">
                    <UserRound className="h-4 w-4" />
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#081323] bg-emerald-400" />
                  </div>
                </motion.div>

                {[
                  { label: "SMS sent", left: "18%", top: "20%", icon: MessageSquareText },
                  { label: "Booking confirmed", left: "43%", top: "15%", icon: CalendarCheck },
                  { label: "Reminder set", left: "60%", top: "72%", icon: BellRing },
                  { label: "Review queued", left: "73%", top: "18%", icon: Star },
                  { label: "Reactivation ready", left: "84%", top: "70%", icon: RotateCcw },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 22, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: prefersReduced ? 0 : 0.35 + index * 0.38, duration: 0.4 }}
                      className="absolute rounded-[18px] border border-white/10 bg-white/[0.07] px-4 py-3 shadow-[0_20px_55px_rgba(0,0,0,.24)] backdrop-blur-xl"
                      style={{ left: item.left, top: item.top }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400/10 text-blue-200"><Icon className="h-4 w-4" /></span>
                        <p className="text-[11px] font-semibold">{item.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[11px] text-slate-500">
            <p>{progressStage === 0 ? "The lead was captured. The follow-through was not." : "One customer record. Every next action connected."}</p>
            <p className="font-semibold uppercase tracking-[0.13em]">Scroll to follow the journey</p>
          </div>
        </div>
      </div>

      {/* Mobile: vertical story, no clipping and no forced desktop rail */}
      <div className="relative overflow-hidden px-5 py-24 sm:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(520px_340px_at_50%_35%,rgba(37,99,235,.18),transparent_72%)]" />
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-blue-300">Revenue leaks in the gaps</p>
          <h2 className="mt-4 text-[44px] font-semibold leading-[0.94] tracking-[-0.055em]">The customer entered the journey. Then disappeared.</h2>
          <div className="mt-8 rounded-[24px] border border-rose-300/15 bg-rose-300/[0.06] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-300">22h without a reply</p>
            <p className="mt-2 text-[14px] leading-6 text-slate-400">Sarah’s enquiry was captured, but nobody owned the next step. She booked elsewhere the next morning.</p>
          </div>

          <div className="relative mt-12 pl-9">
            <div className="absolute bottom-0 left-[13px] top-0 w-[3px] rounded-full bg-gradient-to-b from-blue-500 via-cyan-300 to-emerald-300" />
            {STAGES.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative mb-8 rounded-[20px] border border-white/10 bg-white/[0.06] p-4"
                >
                  <span className="absolute -left-[38px] top-4 flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/30 bg-[#0d1728] text-blue-200"><Icon className="h-4 w-4" /></span>
                  <p className="text-[13px] font-semibold">{stage.label}</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">{stage.detail}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 rounded-[28px] border border-blue-300/20 bg-blue-500/10 p-6 shadow-[0_0_70px_rgba(59,130,246,.18)]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500"><Zap className="h-4 w-4 fill-current" /></span>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-200">Zapla follow-through</p>
                <p className="text-[17px] font-semibold">The next thing happens.</p>
              </div>
            </div>
            <p className="mt-4 text-[14px] leading-6 text-slate-300">Reply, booking, reminders, reviews and reactivation stay connected to one customer record.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FollowThroughStory() {
  const nodes = [
    { label: "Conversations", sub: "SMS · email · calls", x: "0%", y: "18%", rotate: -5 },
    { label: "CRM", sub: "contacts · pipeline", x: "17%", y: "65%", rotate: 3 },
    { label: "Automation", sub: "next actions", x: "31%", y: "8%", rotate: -2 },
    { label: "Bookings", sub: "calendar · reminders", x: "61%", y: "70%", rotate: 3 },
    { label: "Reviews", sub: "reputation", x: "76%", y: "10%", rotate: -4 },
    { label: "Reactivation", sub: "bring them back", x: "90%", y: "62%", rotate: 4 },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] px-5 py-28 text-slate-950 sm:px-8 sm:py-36 lg:py-44">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(900px_560px_at_50%_52%,rgba(37,99,235,.10),transparent_72%)]" />
      <div className="relative mx-auto max-w-[1450px]">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zapla-blue">Why one connected system matters</p>
        <h2 className="mt-5 max-w-[1100px] text-[54px] font-semibold leading-[0.93] tracking-[-0.055em] sm:text-[78px] lg:text-[102px]">
          One customer journey.
          <br />
          <span className="text-slate-400">Everything connected.</span>
        </h2>

        <div className="relative mt-16 hidden h-[610px] sm:block">
          <div className="absolute left-[-18%] right-[-18%] top-1/2 h-px bg-slate-300" />
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "136%" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute left-[-18%] top-1/2 h-[4px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_28px_rgba(59,130,246,.38)]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="absolute left-1/2 top-1/2 z-20 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_45px_110px_-45px_rgba(37,99,235,.55)] lg:h-52 lg:w-52"
          >
            <div className="text-center">
              <UserRound className="mx-auto h-8 w-8 text-zapla-blue" />
              <p className="mt-3 text-[14px] font-semibold">Customer</p>
              <p className="mt-1 text-[10px] text-slate-400">one record · every action</p>
            </div>
          </motion.div>

          {nodes.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 34, rotate: item.rotate * 1.7 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="absolute z-10 min-w-[190px] rounded-[24px] border border-slate-200 bg-white/92 p-5 shadow-[0_28px_75px_-40px_rgba(15,23,42,.34)] backdrop-blur"
              style={{ left: item.x, top: item.y }}
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-zapla-blue" />
                <p className="text-[13px] font-semibold">{item.label}</p>
              </div>
              <p className="mt-2 text-[10.5px] font-medium text-slate-400">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-3 sm:hidden">
          {nodes.map((item) => (
            <div key={item.label} className="rounded-[20px] border border-slate-200 bg-white p-4">
              <p className="text-[12px] font-semibold">{item.label}</p>
              <p className="mt-1 text-[10px] text-slate-400">{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[760px] text-[18px] font-semibold tracking-[-0.03em] text-slate-800 sm:text-[22px]">
            Follow-through works because the customer does not disappear between disconnected tools.
          </p>
          <div className="flex flex-wrap gap-3 text-[10.5px] font-semibold text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2">Unlimited users</span>
            <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2">One customer record</span>
            <span className="rounded-full border border-slate-200 bg-white px-3.5 py-2">Guided launch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
