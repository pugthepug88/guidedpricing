import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock3,
  MailCheck,
  MessageSquareText,
  UserRoundCheck,
} from "lucide-react";

const POSITIONING_ITEMS = [
  "Built for service businesses",
  "Guided launch",
  "Unlimited users",
  "One connected customer journey",
];

const LOST_JOURNEY = [
  {
    time: "10:07",
    meta: "Tuesday",
    title: "New enquiry",
    detail: "Brake inspection requested for tomorrow morning.",
    state: "received",
  },
  {
    time: "10:42",
    meta: "+35 min",
    title: "No reply",
    detail: "The enquiry is still sitting untouched.",
    state: "waiting",
  },
  {
    time: "13:18",
    meta: "+3h 11m",
    title: "Still unassigned",
    detail: "No owner. No follow-up. No next action.",
    state: "waiting",
  },
  {
    time: "08:34",
    meta: "Next morning",
    title: "Booked elsewhere",
    detail: "The opportunity disappeared without ever becoming a conversation.",
    state: "lost",
  },
] as const;

const FOLLOW_THROUGH = [
  {
    time: "10:07",
    title: "Enquiry captured",
    detail: "Sarah's request lands in Zapla and a customer record is created.",
    icon: UserRoundCheck,
  },
  {
    time: "10:07",
    title: "Reply sent",
    detail: "Zapla acknowledges the enquiry immediately and keeps the conversation moving.",
    icon: MessageSquareText,
  },
  {
    time: "10:08",
    title: "Opportunity created",
    detail: "The enquiry is routed into the right pipeline with a clear owner and next action.",
    icon: CheckCircle2,
  },
  {
    time: "10:09",
    title: "Booking options sent",
    detail: "Available times are offered without anyone opening another system.",
    icon: CalendarCheck,
  },
  {
    time: "10:14",
    title: "Appointment booked",
    detail: "Confirmation is sent and the reminder is already scheduled.",
    icon: MailCheck,
  },
] as const;

export function CredibilityBand() {
  return (
    <section className="border-y border-slate-200/80 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-7 sm:px-8 sm:py-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {POSITIONING_ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2.5 border-b border-slate-200/80 py-3 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span className="text-[12px] font-semibold tracking-[-0.01em] text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConnectedSystemStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f2f5f9] px-5 py-24 text-slate-950 sm:px-8 sm:py-32 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 83% 19%, rgba(37,99,235,.065), transparent 70%), radial-gradient(650px 420px at 8% 82%, rgba(15,23,42,.035), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.19em] text-zapla-blue">
              Where revenue disappears
            </p>
            <p className="mt-4 max-w-[320px] text-[14px] leading-6 text-slate-500">
              Lost opportunities can look deceptively ordinary: time passing with no reply, no owner and no next action.
            </p>
          </div>

          <h2 className="max-w-[880px] text-[48px] font-semibold leading-[0.98] tracking-[-0.048em] text-slate-950 sm:text-[66px] lg:text-[82px]">
            The enquiry came in.
            <br />
            <span className="text-slate-400">Nothing happened next.</span>
          </h2>
        </div>

        <div className="mt-16 overflow-hidden border-y border-slate-300/90 bg-white/50 sm:mt-20">
          <div className="grid lg:min-h-[610px] lg:grid-cols-[290px_minmax(0,1fr)]">
            <aside className="border-b border-slate-300/90 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                  Illustrative journey
                </span>
                <motion.span
                  animate={prefersReduced ? undefined : { opacity: [1, 0.35, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-zapla-blue"
                />
              </div>

              <div className="mt-16 sm:mt-20">
                <p className="text-[11px] font-medium text-slate-400">New enquiry</p>
                <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] text-slate-950">Sarah Miller</h3>
                <p className="mt-2 text-[13px] leading-5 text-slate-500">
                  Brake inspection
                  <br />
                  Tomorrow morning
                </p>
              </div>

              <div className="mt-16 border-t border-slate-300/80 pt-5 sm:mt-24">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">Status at arrival</p>
                <p className="mt-2 text-[13px] font-semibold text-slate-800">Unassigned</p>
              </div>
            </aside>

            <div className="relative p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-col gap-4 border-b border-slate-300/80 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">Time without follow-through</p>
                  <p className="mt-2 text-[13px] text-slate-500">One enquiry. Four increasingly expensive moments of silence.</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[50px] font-semibold leading-none tracking-[-0.055em] text-slate-950 sm:text-[64px]">22h 27m</p>
                  <p className="mt-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-slate-400">enquiry → lost opportunity</p>
                </div>
              </div>

              <div className="relative mt-2">
                <div className="absolute bottom-0 left-[76px] top-0 w-px bg-slate-300/80 sm:left-[112px]" />
                <motion.div
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 1.8, ease: "easeOut" }}
                  className="absolute bottom-0 left-[76px] top-0 w-px origin-top bg-slate-500/35 sm:left-[112px]"
                />

                {LOST_JOURNEY.map((event, index) => {
                  const lost = event.state === "lost";
                  return (
                    <motion.div
                      key={`${event.time}-${event.title}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                      transition={{ duration: prefersReduced ? 0 : 0.55, delay: prefersReduced ? 0 : index * 0.32 }}
                      className="relative grid grid-cols-[62px_minmax(0,1fr)] gap-5 border-b border-slate-200/90 py-7 last:border-b-0 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-7 sm:py-8"
                    >
                      <div>
                        <p className={lost ? "text-[18px] font-semibold tracking-[-0.025em] text-slate-950" : "text-[18px] font-semibold tracking-[-0.025em] text-slate-700"}>
                          {event.time}
                        </p>
                        <p className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.1em] text-slate-400">{event.meta}</p>
                      </div>

                      <div className="relative pl-6 sm:pl-8">
                        <span
                          className={
                            lost
                              ? "absolute -left-[5px] top-[5px] h-[11px] w-[11px] rounded-full border-2 border-[#f2f5f9] bg-slate-950 shadow-[0_0_0_1px_rgba(15,23,42,.18)]"
                              : index === 0
                                ? "absolute -left-[5px] top-[5px] h-[11px] w-[11px] rounded-full border-2 border-[#f2f5f9] bg-zapla-blue shadow-[0_0_0_1px_rgba(37,99,235,.20)]"
                                : "absolute -left-[4px] top-[6px] h-[9px] w-[9px] rounded-full border-2 border-[#f2f5f9] bg-slate-300"
                          }
                        />
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <h4 className={lost ? "text-[19px] font-semibold tracking-[-0.02em] text-slate-950" : "text-[17px] font-semibold tracking-[-0.015em] text-slate-800"}>
                            {event.title}
                          </h4>
                          {lost ? (
                            <span className="w-fit border-b border-slate-950 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-950">Opportunity lost</span>
                          ) : null}
                        </div>
                        <p className="mt-2 max-w-[560px] text-[12.5px] leading-5 text-slate-500">{event.detail}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-300/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-800">The problem is not capturing the enquiry. It is making sure the next thing actually happens.</p>
          <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.13em] text-slate-400">
            <Clock3 className="h-3.5 w-3.5" /> Every silent minute compounds
          </div>
        </div>
      </div>
    </section>
  );
}

export function FollowThroughStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.22, once: true });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32 lg:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 430px at 78% 28%, rgba(37,99,235,.08), transparent 72%), radial-gradient(600px 360px at 12% 76%, rgba(16,185,129,.06), transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.19em] text-zapla-blue">Same enquiry. Different outcome.</p>
            <p className="mt-4 max-w-[350px] text-[14px] leading-6 text-slate-500">
              Zapla does not wait for someone to remember the next step. The journey keeps moving while your team gets on with the work.
            </p>
          </div>

          <h2 className="max-w-[850px] text-[48px] font-semibold leading-[0.98] tracking-[-0.048em] text-slate-950 sm:text-[66px] lg:text-[82px]">
            This time,
            <br />
            <span className="text-zapla-blue">the next thing happens.</span>
          </h2>
        </div>

        <div className="mt-16 overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 text-white shadow-[0_40px_100px_-45px_rgba(37,99,235,.5)] sm:mt-20">
          <div className="grid lg:grid-cols-[310px_minmax(0,1fr)]">
            <aside className="border-b border-white/10 p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-blue-300">Customer journey</p>
              <h3 className="mt-10 text-[30px] font-semibold tracking-[-0.035em]">Sarah Miller</h3>
              <p className="mt-2 text-[13px] leading-5 text-slate-400">Brake inspection · tomorrow morning</p>

              <div className="mt-14 rounded-[22px] border border-emerald-400/20 bg-emerald-400/[0.07] p-5">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.75)]" /> Live follow-through
                </div>
                <p className="mt-3 text-[14px] font-medium leading-6 text-slate-200">Every action has an owner, a trigger or an automation.</p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Elapsed time</p>
                <p className="mt-2 text-[46px] font-semibold leading-none tracking-[-0.05em]">7 min</p>
                <p className="mt-2 text-[11px] text-slate-500">enquiry → confirmed booking</p>
              </div>
            </aside>

            <div className="relative p-7 sm:p-9 lg:p-12">
              <div className="absolute bottom-12 left-[51px] top-12 w-px bg-white/10 sm:left-[59px] lg:left-[71px]" />
              <motion.div
                aria-hidden
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: prefersReduced ? 0 : 1.8, ease: "easeOut" }}
                className="absolute bottom-12 left-[51px] top-12 w-px origin-top bg-gradient-to-b from-blue-400 via-cyan-300 to-emerald-300 sm:left-[59px] lg:left-[71px]"
              />

              <div className="space-y-1">
                {FOLLOW_THROUGH.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={`${event.time}-${event.title}`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                      transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.16 + index * 0.28 }}
                      className="relative grid grid-cols-[54px_minmax(0,1fr)] gap-5 border-b border-white/[0.08] py-6 last:border-b-0 sm:grid-cols-[70px_minmax(0,1fr)] sm:gap-7"
                    >
                      <div>
                        <p className="text-[16px] font-semibold tracking-[-0.02em] text-white">{event.time}</p>
                      </div>

                      <div className="relative pl-7 sm:pl-9">
                        <div className="absolute -left-[14px] top-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-blue-400/25 bg-[#10192b] text-blue-300 shadow-[0_0_0_4px_rgba(15,23,42,1)]">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <h4 className="text-[17px] font-semibold tracking-[-0.015em] text-white">{event.title}</h4>
                        <p className="mt-2 max-w-[620px] text-[12.5px] leading-5 text-slate-400">{event.detail}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: prefersReduced ? 0 : 0.55, delay: prefersReduced ? 0 : 1.65 }}
                className="mt-8 flex flex-col gap-4 rounded-[22px] border border-emerald-400/20 bg-emerald-400/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">Outcome</p>
                  <p className="mt-2 text-[16px] font-semibold text-white">Sarah is booked. The reminder is scheduled. The pipeline is already updated.</p>
                </div>
                <div className="inline-flex shrink-0 items-center gap-2 text-[12px] font-semibold text-emerald-300">
                  Follow-through complete <ArrowRight className="h-4 w-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-semibold tracking-[-0.01em] text-slate-800">That is the difference between storing customer data and actually moving the customer forward.</p>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.13em] text-slate-400">One journey · every next action connected</p>
        </div>
      </div>
    </section>
  );
}
