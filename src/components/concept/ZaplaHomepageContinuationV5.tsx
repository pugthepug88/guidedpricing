import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  MessageSquareText,
  PhoneMissed,
  RefreshCw,
  Star,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";
const EASE = [0.22, 1, 0.36, 1] as const;

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/40" : "text-[#4B7478]"}`}>
      {children}
    </div>
  );
}

function RevenueLeakage() {
  const reduced = !!useReducedMotion();
  const events = [
    ["9:17", "Another call answered"],
    ["9:31", "Appointment confirmed"],
    ["10:05", "Payment received"],
    ["11:24", "Review posted"],
  ] as const;

  return (
    <section className="overflow-hidden bg-[#F5F6F3] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)] lg:items-end">
          <div>
            <Eyebrow>Where revenue leaks</Eyebrow>
            <h2
              className="mt-6 max-w-[920px] text-[48px] font-medium leading-[0.92] tracking-[-0.06em] sm:text-[68px] lg:text-[92px]"
              style={{ fontFamily: DISPLAY }}
            >
              Customers do not always say no.
              <br />
              <span className="text-[#819093]">Sometimes nobody followed through.</span>
            </h2>
          </div>
          <p className="max-w-[520px] pb-2 text-[15px] leading-[1.75] text-[#667174] sm:text-[17px] lg:justify-self-end">
            The expensive failures are often quiet: an enquiry waits, the day gets busy, and a customer who was ready to move simply moves somewhere else.
          </p>
        </div>

        <div className="relative mt-16 min-h-[520px] border-y border-[#D8DDDA] sm:mt-20 sm:min-h-[570px]">
          <div className="absolute left-0 top-7 font-mono text-[11px] text-[#788184]">09:14</div>
          <div className="absolute right-0 top-7 font-mono text-[11px] text-[#788184]">16:32</div>
          <div className="absolute left-0 right-0 top-[72px] h-px bg-[#CBD2CF]" />

          {events.map(([time, label], index) => (
            <motion.div
              key={time}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ delay: reduced ? 0 : 0.08 + index * 0.08, duration: reduced ? 0 : 0.45, ease: EASE }}
              className="absolute hidden items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-[#7B8585] lg:flex"
              style={{ left: `${45 + index * 12}%`, top: `${146 + (index % 2) * 74}px` }}
            >
              <span className="font-mono text-[9px] text-[#A0A8A6]">{time}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#8BAEAA]" />
              <span>{label}</span>
            </motion.div>
          ))}

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: reduced ? 0 : 0.62, ease: EASE }}
            className="absolute left-[4%] top-[138px] w-[86%] max-w-[560px] border-l-2 border-[#249BA1] bg-white px-5 py-5 shadow-[0_28px_70px_-50px_rgba(15,23,42,.35)] sm:left-[8%] sm:px-7 sm:py-6 lg:left-[13%] lg:top-[166px] lg:w-[40%]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div>
              <div>
                <div className="text-[13px] font-semibold">Sarah Miller</div>
                <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#98A09E]">Website enquiry · new</div>
              </div>
            </div>
            <div className="mt-6 max-w-[450px] text-[26px] leading-[1.08] tracking-[-0.035em] sm:text-[34px]" style={{ fontFamily: DISPLAY }}>
              “Hi, are you available this week?”
            </div>
            <div className="mt-7 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A2A8A7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D0D5D3]" /> No owner · no reply
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ delay: reduced ? 0 : 0.5, duration: reduced ? 0 : 0.6 }}
            className="absolute bottom-[48px] left-[4%] right-[4%] border-t border-[#D87474] pt-5 sm:left-[8%] sm:right-[8%] lg:left-[58%] lg:right-[4%]"
          >
            <div className="font-mono text-[10px] text-[#A96565]">16:32</div>
            <div className="mt-3 text-[35px] leading-[0.96] tracking-[-0.045em] text-[#A44242] sm:text-[48px]" style={{ fontFamily: DISPLAY }}>
              Booked elsewhere.
            </div>
            <p className="mt-3 max-w-[400px] text-[13px] leading-[1.6] text-[#8A6969]">
              Nothing broke. The next step simply never happened.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CustomerThread() {
  const reduced = !!useReducedMotion();

  return (
    <section className="overflow-hidden bg-white px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[980px]">
          <Eyebrow>One connected customer journey</Eyebrow>
          <h2
            className="mt-6 text-[46px] font-medium leading-[0.94] tracking-[-0.055em] sm:text-[66px] lg:text-[82px]"
            style={{ fontFamily: DISPLAY }}
          >
            The conversation can change.
            <br />
            <span className="text-[#7D898B]">The customer should not disappear with it.</span>
          </h2>
        </div>

        <div className="relative mt-18 min-h-[620px] sm:mt-20 lg:min-h-[660px]">
          <svg className="absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden>
            <path d="M95 305 C255 305 245 205 415 205 S565 405 720 405 S830 238 1090 238" fill="none" stroke="#D9E2E0" strokeWidth="2" />
            <motion.path
              d="M95 305 C255 305 245 205 415 205 S565 405 720 405 S830 238 1090 238"
              fill="none"
              stroke="#1A9AA1"
              strokeWidth="3"
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: reduced ? 0 : 1.25, ease: EASE }}
            />
          </svg>

          <div className="absolute left-[2%] top-[210px] z-20 lg:left-[5%] lg:top-[270px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111318] text-[11px] font-bold text-white shadow-[0_20px_45px_-25px_rgba(15,23,42,.45)]">SM</div>
            <div className="mt-3 text-[11px] font-semibold">Sarah Miller</div>
            <div className="mt-1 text-[9px] uppercase tracking-[0.14em] text-[#9BA3A2]">same customer</div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            className="absolute left-[22%] top-[40px] w-[68%] max-w-[350px] sm:left-[21%] lg:left-[22%] lg:top-[95px]"
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#769397]">Conversation</div>
            <div className="mt-3 border-l-2 border-[#1A9AA1] pl-4 text-[22px] leading-[1.12] tracking-[-0.03em] sm:text-[27px]" style={{ fontFamily: DISPLAY }}>
              “Thursday morning works.”
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: reduced ? 0 : 0.12, duration: reduced ? 0 : 0.5, ease: EASE }}
            className="absolute left-[18%] top-[250px] sm:left-[34%] lg:left-[35%] lg:top-[150px]"
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#769397]">Opportunity</div>
            <div className="mt-3 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-[27px] leading-none tracking-[-0.04em] sm:text-[34px]" style={{ fontFamily: DISPLAY }}>Qualified</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: reduced ? 0 : 0.22, duration: reduced ? 0 : 0.5, ease: EASE }}
            className="absolute left-[46%] top-[360px] sm:left-[55%] lg:left-[58%] lg:top-[350px]"
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#769397]">Booking</div>
            <div className="mt-3 flex items-center gap-4">
              <CalendarCheck2 className="h-7 w-7 text-[#1A9AA1]" />
              <div>
                <div className="text-[28px] leading-none tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>Thu 10:30</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.13em] text-[#929B9A]">confirmed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: reduced ? 0 : 0.3, duration: reduced ? 0 : 0.5, ease: EASE }}
            className="absolute bottom-[24px] right-[2%] sm:right-[7%] lg:bottom-[250px] lg:right-[7%]"
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#769397]">After the work</div>
            <div className="mt-4 flex items-center gap-6 text-[#111318]">
              <div className="flex items-center gap-2"><CircleDollarSign className="h-5 w-5 text-[#1A9AA1]" /><span className="text-[13px] font-semibold">Paid</span></div>
              <div className="flex items-center gap-2"><Star className="h-5 w-5 text-[#1A9AA1]" /><span className="text-[13px] font-semibold">Review</span></div>
              <div className="flex items-center gap-2"><RefreshCw className="h-5 w-5 text-[#1A9AA1]" /><span className="text-[13px] font-semibold">Return</span></div>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#DDE3E1] lg:hidden" />
        </div>
      </div>
    </section>
  );
}

function Pointer({ label, className, delay, reduced }: { label: string; className: string; delay: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 20, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : 0.45, ease: EASE }}
      className={`absolute z-30 flex items-start gap-1.5 ${className}`}
    >
      <svg width="17" height="21" viewBox="0 0 17 21" fill="none" aria-hidden>
        <path d="M1 1L15 10.5L8.9 11.7L5.8 19L1 1Z" fill="#101318" />
      </svg>
      <span className="whitespace-nowrap bg-[#101318] px-2.5 py-1.5 text-[9px] font-semibold text-white shadow-sm sm:text-[10px]">{label}</span>
    </motion.div>
  );
}

function UnlimitedUsers() {
  const reduced = !!useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-[#DDECEC] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:min-h-[900px] lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute left-[-2%] top-[2%] whitespace-nowrap text-[20vw] font-medium leading-none tracking-[-0.08em] text-[#BFD9D8]/75" style={{ fontFamily: DISPLAY }}>
        UNLIMITED
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <Eyebrow>Unlimited users included</Eyebrow>
        <div className="mt-8 grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div className="relative z-20 max-w-[560px]">
            <h2 className="text-[48px] font-medium leading-[0.92] tracking-[-0.055em] sm:text-[66px] lg:text-[78px]" style={{ fontFamily: DISPLAY }}>
              Add the team.
              <br />
              <span className="text-[#55787A]">Not the seat tax.</span>
            </h2>
            <p className="mt-7 max-w-[500px] text-[15px] leading-[1.75] text-[#53686A] sm:text-[17px]">
              The customer journey rarely belongs to one person. Give everyone who needs the context access without another licence decision every time the team grows.
            </p>
          </div>

          <div className="relative min-h-[540px] sm:min-h-[600px]">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.97, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduced ? 0 : 0.65, ease: EASE }}
              className="absolute left-[3%] right-[2%] top-[11%] overflow-hidden border border-[#AFCBC9] bg-white shadow-[0_38px_100px_-58px_rgba(15,23,42,.38)] sm:left-[7%] sm:right-[4%] sm:top-[8%] lg:left-[5%] lg:right-[2%] lg:top-[6%]"
            >
              <div className="flex items-center justify-between border-b border-[#E7ECEA] px-5 py-4 sm:px-7">
                <div>
                  <div className="text-[15px] font-semibold">Sarah Miller</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.13em] text-[#8B9593]">Customer record</div>
                </div>
                <span className="bg-emerald-50 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Active</span>
              </div>

              <div className="grid sm:grid-cols-[1.05fr_.95fr]">
                <div className="p-5 sm:p-7">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9AA3A1]">Customer context</div>
                  <div className="mt-5 space-y-5">
                    <div className="border-b border-[#EDF0EF] pb-4">
                      <div className="text-[10px] text-[#8F9896]">Latest conversation</div>
                      <div className="mt-2 text-[17px] leading-[1.4] tracking-[-0.02em]">“Thursday at 10:30 works for me.”</div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div><div className="text-[10px] text-[#8F9896]">Opportunity</div><div className="mt-1.5 text-[13px] font-semibold">Qualified</div></div>
                      <div><div className="text-[10px] text-[#8F9896]">Owner</div><div className="mt-1.5 text-[13px] font-semibold">Chris</div></div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#EDF0EF] bg-[#F8FAF9] p-5 sm:border-l sm:border-t-0 sm:p-7">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9AA3A1]">Next step</div>
                  <div className="mt-5 flex items-start gap-3">
                    <CalendarCheck2 className="mt-0.5 h-5 w-5 text-[#1A9AA1]" />
                    <div><div className="text-[13px] font-semibold">Appointment confirmed</div><div className="mt-1 text-[11px] text-[#7D8785]">Thursday · 10:30 AM</div></div>
                  </div>
                  <div className="mt-6 border-t border-[#E5EAE8] pt-5">
                    <div className="text-[10px] text-[#8F9896]">Follow-up</div>
                    <div className="mt-1.5 text-[12px] font-semibold">Reminder scheduled</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <Pointer label="Owner" className="left-[1%] top-[3%] sm:left-[3%]" delay={0.12} reduced={reduced} />
            <Pointer label="Front desk" className="right-[5%] top-[2%] sm:right-[7%]" delay={0.22} reduced={reduced} />
            <Pointer label="Sales" className="left-[0%] top-[48%] sm:left-[2%]" delay={0.32} reduced={reduced} />
            <Pointer label="Accounts" className="right-[2%] top-[53%] sm:right-[4%]" delay={0.42} reduced={reduced} />
            <Pointer label="Team" className="bottom-[3%] left-[45%] sm:bottom-[6%] sm:left-[52%]" delay={0.52} reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunch() {
  return (
    <section className="overflow-hidden bg-[#F4F1EA] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 className="mt-6 text-[48px] font-medium leading-[0.93] tracking-[-0.055em] sm:text-[65px] lg:text-[80px]" style={{ fontFamily: DISPLAY }}>
              Your process already exists.
              <br />
              <span className="text-[#8B7F70]">We map it before we automate it.</span>
            </h2>
          </div>
          <p className="max-w-[500px] pb-2 text-[15px] leading-[1.75] text-[#746B60] sm:text-[17px] lg:justify-self-end">
            Guided Launch starts with the way the business really works today, then turns the important hand-offs and next steps into a cleaner operating flow.
          </p>
        </div>

        <div className="mt-16 grid gap-0 border-y border-[#CFC7BC] lg:mt-20 lg:grid-cols-[1fr_96px_1fr]">
          <div className="relative min-h-[560px] overflow-hidden py-10 sm:min-h-[610px] sm:py-12 lg:pr-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#988C7C]">How it works today</div>

            <div className="absolute left-[4%] top-[112px] w-[235px] -rotate-[4deg] border-l-2 border-[#111318] bg-white px-5 py-4 shadow-[0_18px_45px_-34px_rgba(15,23,42,.35)] sm:left-[8%] sm:w-[270px]">
              <div className="text-[8px] uppercase tracking-[0.15em] text-[#9A9F9C]">Website enquiry</div>
              <div className="mt-2 text-[14px]">Can I book Thursday morning?</div>
            </div>
            <div className="absolute right-[5%] top-[205px] flex w-[205px] rotate-[3deg] items-center gap-3 border-y border-[#C9C1B6] bg-[#FBF8F1] px-4 py-4 sm:right-[8%] sm:w-[230px]">
              <PhoneMissed className="h-5 w-5 text-[#C35F5F]" />
              <div><div className="text-[8px] uppercase tracking-[0.14em] text-[#9A9F9C]">Missed call</div><div className="mt-1 text-[12px] font-semibold">0412 884 103</div></div>
            </div>
            <div className="absolute left-[16%] top-[330px] w-[190px] -rotate-[2deg] bg-[#FFF0A8] px-5 py-5 shadow-[0_14px_38px_-30px_rgba(15,23,42,.38)] sm:left-[23%] sm:w-[215px]">
              <div className="text-[14px] font-semibold leading-[1.35]">Remember to follow up quote</div>
            </div>
            <div className="absolute bottom-[54px] right-[12%] w-[215px] rotate-[4deg] border-b border-[#998C7B] px-4 py-4 sm:w-[250px]">
              <div className="text-[8px] uppercase tracking-[0.14em] text-[#9A9F9C]">Calendar note</div>
              <div className="mt-2 text-[13px] font-semibold">Thu · 10:30 · Sarah?</div>
            </div>
          </div>

          <div className="relative hidden border-x border-[#CFC7BC] lg:block">
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-90 items-center gap-3 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] text-[#877B6C]">
              <span>Guided Launch</span><ArrowRight className="h-4 w-4 rotate-90" />
            </div>
          </div>

          <div className="min-h-[560px] border-t border-[#CFC7BC] py-10 sm:min-h-[610px] sm:py-12 lg:border-t-0 lg:pl-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B7478]">What we build with you</div>
            <div className="mt-12">
              {[
                ["01", "Capture", "Enquiries, calls and forms arrive in one place."],
                ["02", "Own", "The right person can see what needs attention."],
                ["03", "Follow through", "Replies, reminders and bookings keep moving."],
                ["04", "Complete", "Payment, reviews and return journeys do not get forgotten."],
              ].map(([n, title, copy]) => (
                <div key={n} className="grid grid-cols-[42px_1fr] gap-5 border-t border-[#D9D2C8] py-6 first:border-t-0 first:pt-0 sm:grid-cols-[58px_1fr] sm:gap-7 sm:py-7">
                  <div className="font-mono text-[10px] text-[#8D8274]">{n}</div>
                  <div>
                    <div className="text-[29px] leading-none tracking-[-0.04em] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>{title}</div>
                    <div className="mt-2 max-w-[500px] text-[13px] leading-[1.65] text-[#7A7064] sm:text-[14px]">{copy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type OutcomeKey = "enquiry" | "quote" | "reactivation" | "complete";

const OUTCOMES: Array<{ key: OutcomeKey; label: string; kicker: string }> = [
  { key: "enquiry", label: "Missed enquiry", kicker: "Start the conversation" },
  { key: "quote", label: "Quiet quote", kicker: "Keep the opportunity moving" },
  { key: "reactivation", label: "Past customer", kicker: "Bring dormant demand back" },
  { key: "complete", label: "Completed job", kicker: "Keep going after complete" },
];

function EnquiryVisual() {
  return (
    <div className="relative h-full min-h-[440px] overflow-hidden bg-[#0A0E13] p-6 text-white sm:min-h-[500px] sm:p-9">
      <div className="absolute left-[8%] top-[17%] max-w-[72%] border-l-2 border-white/18 bg-white/[0.045] px-5 py-4">
        <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/28">Sarah · website enquiry</div>
        <div className="mt-3 text-[23px] leading-[1.15] tracking-[-0.03em] sm:text-[30px]" style={{ fontFamily: DISPLAY }}>Are you available this week?</div>
      </div>
      <div className="absolute bottom-[19%] right-[7%] max-w-[76%] bg-[#BFEAEC] px-5 py-5 text-[#0A1114] sm:px-6">
        <div className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#4F7E82]">2 min later</div>
        <div className="mt-3 text-[22px] leading-[1.15] tracking-[-0.03em] sm:text-[29px]" style={{ fontFamily: DISPLAY }}>Yes. Thursday morning is available. Want me to book it?</div>
      </div>
      <div className="absolute bottom-[7%] right-[7%] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#83C9CD]">Conversation started</div>
    </div>
  );
}

function QuoteVisual() {
  return (
    <div className="relative h-full min-h-[440px] overflow-hidden bg-[#0A0E13] p-6 text-white sm:min-h-[500px] sm:p-9">
      <div className="pointer-events-none absolute -right-[3%] top-[4%] text-[28vw] font-medium leading-none tracking-[-0.08em] text-white/[0.035] sm:text-[16vw]" style={{ fontFamily: DISPLAY }}>03</div>
      <div className="absolute left-[8%] top-[18%] text-[9px] font-semibold uppercase tracking-[0.17em] text-white/32">Quote #1048 · $4,800</div>
      <div className="absolute left-[8%] right-[8%] top-[48%] h-px bg-white/14">
        <div className="absolute -top-1 left-0 h-2 w-2 rounded-full bg-white" />
        <div className="absolute -top-1 left-[48%] h-2 w-2 rounded-full bg-[#6ED4D9]" />
        <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="absolute left-[8%] top-[54%] text-[10px] text-white/38">Quote sent</div>
      <div className="absolute left-[47%] top-[39%] -translate-x-1/2 bg-[#13272A] px-4 py-3">
        <div className="text-[8px] uppercase tracking-[0.14em] text-[#72BCC0]">Follow-up</div>
        <div className="mt-1 text-[12px] font-semibold">Still considering it?</div>
      </div>
      <div className="absolute right-[8%] top-[54%] text-right">
        <div className="text-[10px] text-emerald-300">Reply received</div>
        <div className="mt-2 text-[27px] leading-none tracking-[-0.04em] sm:text-[34px]" style={{ fontFamily: DISPLAY }}>Opportunity moving</div>
      </div>
    </div>
  );
}

function ReactivationVisual() {
  const contacts = ["MC", "DR", "PN", "TW", "SB", "LM", "AD", "NR", "JC", "KM", "RB", "TS", "AL", "MS", "CP", "ER", "JL", "NT", "AA", "BK", "PH", "VR", "OW", "GD"];
  const active = new Set([0, 2, 6, 10, 14]);
  return (
    <div className="relative h-full min-h-[440px] overflow-hidden bg-[#0A0E13] p-6 text-white sm:min-h-[500px] sm:p-9">
      <div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/32">Past customers · dormant</div>
      <div className="mt-10 grid grid-cols-6 gap-3 sm:gap-4">
        {contacts.map((contact, index) => (
          <div key={`${contact}-${index}`} className={`flex aspect-square items-center justify-center rounded-full text-[9px] font-semibold transition ${active.has(index) ? "bg-[#BFEAEC] text-[#0A1114] shadow-[0_0_34px_rgba(103,232,249,.16)]" : "bg-white/[0.055] text-white/22"}`}>{contact}</div>
        ))}
      </div>
      <div className="absolute bottom-[8%] left-[8%] right-[8%] flex items-end justify-between border-t border-white/12 pt-5">
        <div><div className="text-[9px] uppercase tracking-[0.14em] text-[#72BCC0]">Reactivation</div><div className="mt-2 text-[12px] text-white/46">Dormant customers become live conversations again.</div></div>
        <div className="text-[28px] leading-none tracking-[-0.04em] text-[#BFEAEC] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>Reactivated</div>
      </div>
    </div>
  );
}

function CompleteVisual() {
  return (
    <div className="relative h-full min-h-[440px] overflow-hidden bg-[#0A0E13] p-6 text-white sm:min-h-[500px] sm:p-9">
      <div className="pointer-events-none absolute -left-[2%] top-[5%] text-[19vw] font-medium leading-none tracking-[-0.075em] text-white/[0.035] sm:text-[12vw]" style={{ fontFamily: DISPLAY }}>DONE.</div>
      <div className="absolute left-[8%] top-[24%] text-[9px] font-semibold uppercase tracking-[0.16em] text-white/34">The job is complete. The customer journey is not.</div>
      <div className="absolute left-[8%] right-[8%] top-[55%] h-px bg-white/14" />
      {[
        ["16%", <CheckCircle2 key="i" className="h-5 w-5" />, "Job complete"],
        ["43%", <CircleDollarSign key="i" className="h-5 w-5" />, "Paid"],
        ["69%", <Star key="i" className="h-5 w-5" />, "Review"],
        ["92%", <RefreshCw key="i" className="h-5 w-5" />, "Return"],
      ].map(([left, icon, label]) => (
        <div key={label as string} className="absolute top-[calc(55%-18px)] -translate-x-1/2 text-center" style={{ left: left as string }}>
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#BFEAEC] text-[#0A1114]">{icon}</div>
          <div className="mt-3 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.13em] text-white/60">{label}</div>
        </div>
      ))}
    </div>
  );
}

function OutcomeVisual({ active }: { active: OutcomeKey }) {
  if (active === "quote") return <QuoteVisual />;
  if (active === "reactivation") return <ReactivationVisual />;
  if (active === "complete") return <CompleteVisual />;
  return <EnquiryVisual />;
}

function Outcomes() {
  const [active, setActive] = useState<OutcomeKey>("enquiry");
  return (
    <section className="bg-white px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Eyebrow>What should Zapla follow through on?</Eyebrow>
        <div className="mt-7 grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div>
            <h2 className="max-w-[620px] text-[47px] font-medium leading-[0.93] tracking-[-0.055em] sm:text-[64px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
              Different moments.
              <br />
              <span className="text-[#7F8A8C]">Same job: keep it moving.</span>
            </h2>

            <div className="mt-12 border-t border-[#DDE2E0]">
              {OUTCOMES.map((item) => {
                const selected = active === item.key;
                return (
                  <button key={item.key} type="button" onClick={() => setActive(item.key)} className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-[#DDE2E0] py-5 text-left sm:py-6">
                    <div>
                      <div className={`text-[25px] leading-none tracking-[-0.035em] transition-colors sm:text-[30px] ${selected ? "text-[#111318]" : "text-[#9AA3A2] group-hover:text-[#5B6667]"}`} style={{ fontFamily: DISPLAY }}>{item.label}</div>
                      <div className={`mt-2 text-[10px] uppercase tracking-[0.13em] transition-opacity ${selected ? "text-[#4B858A] opacity-100" : "text-[#A6ADAB] opacity-0 group-hover:opacity-70"}`}>{item.kicker}</div>
                    </div>
                    <span className={`h-2 w-2 rounded-full transition ${selected ? "bg-[#1A9AA1]" : "bg-[#D6DCDA]"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.26, ease: EASE }}>
                <OutcomeVisual active={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalDecision() {
  return (
    <section className="overflow-hidden bg-[#080B10] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="border-t border-white/12 pt-10 sm:pt-12">
          <Eyebrow dark>Customer follow-through for service businesses</Eyebrow>
          <div className="mt-9 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <h2 className="max-w-[1040px] text-[52px] font-medium leading-[0.9] tracking-[-0.062em] sm:text-[76px] lg:text-[100px]" style={{ fontFamily: DISPLAY }}>
              You do the work only you can do.
              <br />
              <span className="text-white/38">Zapla keeps what happens next moving.</span>
            </h2>
            <div className="lg:pb-2">
              <p className="max-w-[430px] text-[15px] leading-[1.75] text-white/48 sm:text-[17px]">
                One connected platform for the enquiries, conversations and next steps that should not depend on someone remembering.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 bg-white px-5 text-[13px] font-semibold text-[#111318]">Book a Call <ArrowRight className="h-4 w-4" /></a>
                <a href="/pricing" className="inline-flex h-[50px] items-center border border-white/20 px-5 text-[13px] font-semibold text-white/78">See plans and pricing</a>
              </div>
            </div>
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
      <CustomerThread />
      <UnlimitedUsers />
      <GuidedLaunch />
      <Outcomes />
      <FinalDecision />
    </>
  );
}
