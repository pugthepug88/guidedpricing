import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";
import {
  BellRing,
  CalendarCheck,
  Check,
  CheckCircle2,
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

const JOURNEY_NODES = [
  { label: "Enquiry", sub: "captured", x: "8%" },
  { label: "Reply", sub: "sent", x: "29%" },
  { label: "Booked", sub: "confirmed", x: "50%" },
  { label: "Review", sub: "requested", x: "71%" },
  { label: "Return", sub: "reactivated", x: "91%" },
] as const;

const LIVE_ACTIONS = [
  { label: "SMS sent", detail: "10:07", x: "19%", y: "22%", icon: MessageSquareText },
  { label: "Booking confirmed", detail: "10:14", x: "44%", y: "7%", icon: CalendarCheck },
  { label: "Reminder set", detail: "Tomorrow 8:30", x: "58%", y: "25%", icon: BellRing },
  { label: "Review queued", detail: "After service", x: "72%", y: "9%", icon: Star },
  { label: "Reactivation ready", detail: "6 months", x: "84%", y: "24%", icon: RotateCcw },
] as const;

export function CredibilityBand() {
  return (
    <section className="relative overflow-hidden bg-[#07101f] text-white">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-[520px] text-[17px] font-semibold tracking-[-0.025em] text-white sm:text-[20px]">
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
  const [phase, setPhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value < 0.34) setPhase(0);
    else if (value < 0.58) setPhase(1);
    else setPhase(2);
  });

  const copy = [
    {
      kicker: "Revenue leaks in the gaps",
      title: "The enquiry came in. Then silence.",
      body: "The lead was captured. The next action was not. By the next morning, Sarah had booked elsewhere.",
    },
    {
      kicker: "Zapla connects the next step",
      title: "Turn follow-through on.",
      body: "One connected customer system knows what happened, what should happen next and who needs to do it.",
    },
    {
      kicker: "The customer keeps moving",
      title: "Every customer gets the next step.",
      body: "Reply. Booking. Reminder. Review. Reactivation. The work moves forward without relying on someone to remember.",
    },
  ] as const;

  return (
    <section ref={sectionRef} className="relative h-[310vh] bg-[#050913] text-white">
      <div className="sticky top-0 flex h-screen min-h-[720px] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              phase === 0
                ? "radial-gradient(900px 560px at 72% 58%, rgba(37,99,235,.10), transparent 70%), linear-gradient(180deg,#050913,#09111d)"
                : "radial-gradient(1000px 620px at 67% 52%, rgba(37,99,235,.26), transparent 66%), radial-gradient(700px 440px at 84% 68%, rgba(16,185,129,.12), transparent 70%), linear-gradient(180deg,#050913,#081323)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-[1500px] grid-rows-[auto_1fr] px-5 pb-10 pt-16 sm:px-8 lg:grid-cols-[0.36fr_0.64fr] lg:grid-rows-1 lg:items-center lg:gap-12 lg:px-12 lg:py-12">
          <div className="relative z-20 max-w-[510px] lg:pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: prefersReduced ? 0 : 0.45, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-blue-300">0{phase + 1}</span>
                  <span className="h-px w-9 bg-blue-400/40" />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                    {copy[phase].kicker}
                  </p>
                </div>
                <h2 className="mt-6 text-[46px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[64px] lg:text-[78px]">
                  {copy[phase].title}
                </h2>
                <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-slate-400 sm:text-[16px]">
                  {copy[phase].body}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:flex">
              <span>Scroll to follow the customer</span>
              <span className="h-px w-14 bg-white/15" />
            </div>
          </div>

          <div className="relative min-h-[410px] min-w-0 lg:min-h-[620px]">
            <AnimatePresence mode="wait">
              {phase === 0 ? (
                <motion.div
                  key="loss-metric"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="absolute right-0 top-[2%] z-20 text-right sm:top-[4%] lg:right-[4%]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Illustrative enquiry</p>
                  <p className="mt-2 text-[56px] font-semibold leading-none tracking-[-0.07em] text-white sm:text-[78px] lg:text-[98px]">22h 27m</p>
                  <p className="mt-2 text-[12px] font-medium text-rose-300">without a reply</p>
                </motion.div>
              ) : phase === 1 ? (
                <motion.div
                  key="switch"
                  initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="absolute right-[2%] top-[3%] z-30 rounded-full border border-blue-300/30 bg-blue-500/15 px-5 py-3 shadow-[0_0_70px_rgba(59,130,246,.35)] backdrop-blur-xl sm:right-[8%] lg:top-[7%]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-[0_0_30px_rgba(59,130,246,.6)]">
                      <Zap className="h-4 w-4 fill-current" />
                    </span>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-blue-200">Follow-through</p>
                      <p className="text-[14px] font-semibold text-white">ON</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="win-metric"
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-[2%] z-20 text-right sm:top-[4%] lg:right-[4%]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Same illustrative enquiry</p>
                  <p className="mt-2 text-[56px] font-semibold leading-none tracking-[-0.07em] text-white sm:text-[78px] lg:text-[98px]">10:14</p>
                  <p className="mt-2 text-[12px] font-medium text-emerald-300">booked + confirmed</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-x-[-10%] top-[55%] h-[260px] sm:inset-x-[-4%] lg:top-[57%]">
              <div className="absolute left-[4%] right-[4%] top-[82px] h-[2px] bg-white/10" />

              {phase === 0 ? (
                <>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "29%" }}
                    transition={{ duration: prefersReduced ? 0 : 0.9 }}
                    className="absolute left-[4%] top-[82px] h-[2px] bg-gradient-to-r from-blue-400 to-blue-300"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={prefersReduced ? { opacity: 1 } : { opacity: [0, 1, 1, 0.45], y: [0, 0, 72, 118] }}
                    transition={{ duration: 2.6, delay: 0.35, ease: "easeInOut" }}
                    className="absolute left-[28%] top-[62px] z-30"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-rose-300/30 bg-[#111522] text-rose-200 shadow-[0_0_35px_rgba(251,113,133,.22)]">
                      <UserRound className="h-5 w-5" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReduced ? 0 : 1.05 }}
                    className="absolute left-[31%] top-[150px] z-30 -rotate-2 rounded-[16px] border border-rose-300/20 bg-rose-300/[0.08] px-4 py-3 backdrop-blur-md"
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-rose-300">Booked elsewhere</p>
                    <p className="mt-1 text-[11px] text-slate-400">The customer left the journey.</p>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ width: phase === 1 ? "29%" : "4%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: prefersReduced ? 0 : phase === 1 ? 1.15 : 3.8, ease: "easeInOut" }}
                  className="absolute left-[4%] top-[81px] h-[4px] rounded-full bg-gradient-to-r from-blue-500 via-cyan-300 to-emerald-300 shadow-[0_0_26px_rgba(96,165,250,.55)]"
                />
              )}

              {JOURNEY_NODES.map((node, index) => {
                const active = phase > 0 || index === 0;
                return (
                  <motion.div
                    key={node.label}
                    className="absolute top-[58px] z-20 -translate-x-1/2 text-center"
                    style={{ left: node.x }}
                    animate={
                      active
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: index === 1 ? 0.5 : 0.24, y: 0, scale: 0.96 }
                    }
                    transition={{ delay: phase > 0 && !prefersReduced ? index * 0.12 : 0 }}
                  >
                    <div
                      className={
                        active
                          ? "mx-auto h-12 w-12 rounded-full border border-blue-300/30 bg-[#0c1728] p-[5px] shadow-[0_0_30px_rgba(59,130,246,.24)]"
                          : "mx-auto h-12 w-12 rounded-full border border-white/10 bg-[#090f19] p-[5px]"
                      }
                    >
                      <div className={active ? "flex h-full w-full items-center justify-center rounded-full bg-blue-500/15 text-blue-200" : "flex h-full w-full items-center justify-center rounded-full bg-white/[0.03] text-slate-600"}>
                        {index === 0 ? <UserRound className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      </div>
                    </div>
                    <p className={active ? "mt-3 text-[11px] font-semibold text-white" : "mt-3 text-[11px] font-semibold text-slate-600"}>{node.label}</p>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.11em] text-slate-600">{node.sub}</p>
                  </motion.div>
                );
              })}

              {phase === 2 ? (
                <motion.div
                  key="moving-customer"
                  initial={{ left: "6%", opacity: 0 }}
                  animate={{ left: "89%", opacity: [0, 1, 1, 1] }}
                  transition={{ duration: prefersReduced ? 0 : 4.2, ease: "easeInOut" }}
                  className="absolute top-[62px] z-40 -translate-x-1/2"
                >
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white text-slate-950 shadow-[0_0_35px_rgba(255,255,255,.5)]">
                    <UserRound className="h-4 w-4" />
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#081323] bg-emerald-400" />
                  </div>
                </motion.div>
              ) : null}
            </div>

            {phase === 2 ? (
              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                {LIVE_ACTIONS.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.label}
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: prefersReduced ? 0 : 0.35 + index * 0.4, duration: 0.45 }}
                      className="absolute rounded-[16px] border border-white/10 bg-white/[0.065] px-3.5 py-3 shadow-[0_20px_50px_rgba(0,0,0,.24)] backdrop-blur-xl"
                      style={{ left: action.x, top: action.y }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-400/10 text-blue-200">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <div>
                          <p className="text-[10px] font-semibold text-white">{action.label}</p>
                          <p className="mt-0.5 text-[9px] text-slate-500">{action.detail}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : null}

            <div className="absolute bottom-[2%] right-0 text-right lg:right-[4%]">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-600">One customer journey</p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">Enquiry → booked → reviewed → returning</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      </div>
    </section>
  );
}

export function FollowThroughStory() {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] px-5 py-28 text-slate-950 sm:px-8 sm:py-36 lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 500px at 78% 36%, rgba(37,99,235,.09), transparent 70%), radial-gradient(650px 420px at 15% 72%, rgba(16,185,129,.055), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1380px]">
        <div className="max-w-[980px]">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-zapla-blue">Why one connected system matters</p>
          <h2 className="mt-5 text-[54px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[74px] lg:text-[96px]">
            One customer journey.
            <br />
            <span className="text-slate-400">Everything connected.</span>
          </h2>
        </div>

        <div className="relative mt-20 h-[500px] sm:h-[560px]">
          <div className="absolute left-[-12%] right-[-12%] top-1/2 h-px bg-slate-300" />
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "124%" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute left-[-12%] top-1/2 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_24px_rgba(59,130,246,.35)]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-1/2 z-20 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-200 bg-white shadow-[0_30px_80px_-35px_rgba(37,99,235,.55)] sm:h-36 sm:w-36"
          >
            <div className="text-center">
              <UserRound className="mx-auto h-6 w-6 text-zapla-blue" />
              <p className="mt-2 text-[11px] font-semibold">Customer</p>
              <p className="mt-1 text-[9px] text-slate-400">one record</p>
            </div>
          </motion.div>

          {[
            { label: "Conversations", sub: "SMS · email · calls", left: "2%", top: "21%", rotate: -5 },
            { label: "CRM", sub: "contacts · pipeline", left: "18%", top: "60%", rotate: 3 },
            { label: "Automation", sub: "next actions", left: "34%", top: "9%", rotate: -2 },
            { label: "Bookings", sub: "calendar · reminders", left: "59%", top: "68%", rotate: 3 },
            { label: "Reviews", sub: "reputation", left: "75%", top: "14%", rotate: -4 },
            { label: "Reactivation", sub: "bring them back", left: "87%", top: "58%", rotate: 4 },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 32, rotate: item.rotate * 1.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: item.rotate }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.09, duration: 0.55 }}
              className="absolute z-10 min-w-[150px] rounded-[20px] border border-slate-200 bg-white/90 p-4 shadow-[0_22px_65px_-38px_rgba(15,23,42,.35)] backdrop-blur"
              style={{ left: item.left, top: item.top }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zapla-blue" />
                <p className="text-[11px] font-semibold text-slate-900">{item.label}</p>
              </div>
              <p className="mt-2 text-[9.5px] font-medium text-slate-400">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-2 flex flex-col gap-5 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[690px] text-[17px] font-semibold tracking-[-0.025em] text-slate-800 sm:text-[20px]">
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
