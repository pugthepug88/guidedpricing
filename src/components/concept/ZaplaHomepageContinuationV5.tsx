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

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-white/42" : "text-[#4B7478]"}`}>
      {children}
    </div>
  );
}

function Cursor({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`absolute z-30 flex items-start gap-2 ${className}`}>
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
        <path d="M2 1.5L16 11.1L9.8 12.2L6.7 20L2 1.5Z" fill="#111318" />
      </svg>
      <span className="whitespace-nowrap bg-[#111318] px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-[0_8px_22px_rgba(15,23,42,.16)]">
        {label}
      </span>
    </div>
  );
}

function RevenueLane({
  name,
  source,
  message,
  events,
  outcome,
  tone,
  delay,
}: {
  name: string;
  source: string;
  message: string;
  events: string[];
  outcome: string;
  tone: "good" | "wait" | "lost";
  delay: number;
}) {
  const reduced = !!useReducedMotion();
  const accent = tone === "good" ? "#0F766E" : tone === "wait" ? "#C0841A" : "#D75C63";

  return (
    <div className="grid gap-5 border-t border-[#D6D9D3] py-7 lg:grid-cols-[180px_minmax(0,1fr)_180px] lg:items-center lg:gap-8">
      <div>
        <div className="text-[13px] font-semibold text-[#171A1F]">{name}</div>
        <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8A918A]">{source}</div>
      </div>

      <div className="relative min-h-[82px] overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 top-[43px] h-px origin-left"
          style={{ backgroundColor: "#CDD3CC" }}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: EASE }}
        />

        <div className="relative flex items-start justify-between gap-3">
          <div className="max-w-[300px] bg-white px-4 py-3 shadow-[0_14px_40px_-30px_rgba(15,23,42,.3)]">
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9BA19A]">Customer</div>
            <div className="mt-1.5 text-[12px] leading-[1.4] text-[#2A2E32] sm:text-[13px]">{message}</div>
          </div>

          <div className="hidden flex-1 items-center justify-around pt-8 sm:flex">
            {events.map((event, index) => (
              <div key={event} className="relative flex flex-col items-center gap-2 px-2 text-center">
                <span className="z-10 h-2 w-2 rounded-full border-2 border-[#F5F3EE]" style={{ backgroundColor: accent }} />
                <span className="max-w-[110px] text-[9px] font-medium leading-[1.35] text-[#7C837C]">{event}</span>
                {index < events.length - 1 ? null : <span className="sr-only">Final step</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:text-right">
        <div className="text-[9px] font-semibold uppercase tracking-[0.15em]" style={{ color: accent }}>Outcome</div>
        <div className="mt-2 text-[23px] leading-none tracking-[-0.04em] text-[#171A1F] sm:text-[28px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
          {outcome}
        </div>
      </div>
    </div>
  );
}

function RevenueLeakage() {
  return (
    <section className="overflow-hidden bg-[#F5F3EE] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,.95fr)] lg:items-end">
          <Reveal>
            <Eyebrow>Where revenue leaks</Eyebrow>
            <h2 className="mt-5 max-w-[900px] text-[48px] leading-[0.93] tracking-[-0.06em] sm:text-[68px] lg:text-[88px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Customers don’t always say no.
              <span className="block text-[#9C9386]">Sometimes nobody followed through.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[520px] text-[16px] leading-[1.7] text-[#666B66] sm:text-[18px]">
              The leak is rarely dramatic. One enquiry is answered. One quote waits. One past customer quietly disappears. Same demand. Different next step.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 border-b border-[#D6D9D3] sm:mt-20">
          <RevenueLane
            name="Alex Wong"
            source="Website enquiry · 9:14"
            message="Can I book Thursday morning?"
            events={["Reply in 2 min", "Slot offered", "Booking confirmed"]}
            outcome="Booked"
            tone="good"
            delay={0.08}
          />
          <RevenueLane
            name="Maya Singh"
            source="Quote sent · Monday"
            message="Thanks, I’ll have a think and get back to you."
            events={["No owner", "No reminder", "Still waiting"]}
            outcome="Waiting"
            tone="wait"
            delay={0.18}
          />
          <RevenueLane
            name="Daniel Ross"
            source="Past customer · 7 months"
            message="Last service completed. No next step scheduled."
            events={["No check-in", "No reactivation", "Booked elsewhere"]}
            outcome="Lost"
            tone="lost"
            delay={0.28}
          />
        </div>

        <Reveal className="mt-9 flex flex-col gap-3 border-l-2 border-[#111318] pl-5 sm:flex-row sm:items-center sm:justify-between" delay={0.12}>
          <div className="text-[24px] leading-[1.05] tracking-[-0.035em] text-[#171A1F] sm:text-[32px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            The problem is not demand. It is the missing next action.
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7E837E]">Revenue leakage · ordinary · expensive</div>
        </Reveal>
      </div>
    </section>
  );
}

function AIAction({
  time,
  label,
  value,
  active = false,
}: {
  time: string;
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="grid grid-cols-[52px_1fr] gap-4 border-t border-white/10 py-4 sm:grid-cols-[68px_150px_1fr] sm:gap-6">
      <div className="font-mono text-[10px] text-white/26">{time}</div>
      <div className={`text-[9px] font-semibold uppercase tracking-[0.16em] ${active ? "text-cyan-200" : "text-white/35"}`}>{label}</div>
      <div className={`col-start-2 text-[13px] leading-[1.45] sm:col-start-auto ${active ? "text-white" : "text-white/62"}`}>{value}</div>
    </div>
  );
}

function AIFollowThrough() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#05070A] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute -right-[15%] top-[14%] h-[520px] w-[520px] rounded-full bg-cyan-300/[0.045] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,.78fr)_minmax(520px,1.22fr)] lg:items-start lg:gap-20">
          <Reveal>
            <Eyebrow dark>AI follow-through</Eyebrow>
            <h2 className="mt-5 max-w-[700px] text-[52px] leading-[0.92] tracking-[-0.065em] sm:text-[76px] lg:text-[94px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Some follow-up shouldn’t wait for a person to remember it.
            </h2>
            <p className="mt-7 max-w-[560px] text-[16px] leading-[1.75] text-white/48 sm:text-[18px]">
              Zapla can respond, qualify, book, follow up and re-engage customers around the workflows you choose. AI is the mechanism. Follow-through is the job.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-7 gap-y-5 border-t border-white/10 pt-7 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
              <div>Respond</div><div>Qualify</div><div>Book</div><div>Reactivate</div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative min-h-[610px] border border-white/10 bg-white/[0.025] p-5 sm:p-7 lg:min-h-[680px] lg:p-9">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-200/70">Live follow-through trace</div>
                <div className="mt-1 text-[13px] text-white/72">Website enquiry · Sarah Miller</div>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Active
              </div>
            </div>

            <div className="relative mt-6 pl-4 sm:pl-6">
              <svg className="absolute bottom-0 left-0 top-0 h-full w-[18px] overflow-visible" viewBox="0 0 18 420" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M9 8 L9 412"
                  fill="none"
                  stroke="rgba(103,232,249,.6)"
                  strokeWidth="1.5"
                  initial={reduced ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: reduced ? 0 : 1.4, ease: EASE }}
                />
              </svg>

              <AIAction time="09:14:02" label="Trigger" value="New website enquiry received" active />
              <AIAction time="09:14:04" label="Context" value="Customer matched · booking intent detected" />
              <AIAction time="09:14:08" label="Action" value="Reply generated from approved workflow" active />
              <AIAction time="09:14:11" label="Qualification" value="Thursday morning requested · two slots available" />
              <AIAction time="09:15:03" label="Booking" value="10:30 AM confirmed · record updated" active />
              <AIAction time="09:15:05" label="Next step" value="Reminder + post-visit follow-up scheduled" />
            </div>

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div className="border-l-2 border-cyan-300/60 pl-3">
                <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/32">Missed call</div>
                <div className="mt-1 text-[12px] text-white/75">SMS sent</div>
              </div>
              <div className="border-l-2 border-violet-300/60 pl-3">
                <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/32">Quiet quote</div>
                <div className="mt-1 text-[12px] text-white/75">Follow-up triggered</div>
              </div>
              <div className="border-l-2 border-emerald-300/60 pl-3">
                <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/32">Past customer</div>
                <div className="mt-1 text-[12px] text-white/75">Reactivation started</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const GROWTH_MOMENTS = [
  { date: "MAY 03", title: "Enquiry", channel: "SMS", copy: "Can I book Thursday?", icon: MessageSquareText },
  { date: "MAY 03", title: "Booked", channel: "CALENDAR", copy: "Thursday · 10:30 AM", icon: CalendarDays },
  { date: "MAY 05", title: "Reminder", channel: "SMS", copy: "See you tomorrow at 10:30.", icon: MessageSquareText },
  { date: "MAY 06", title: "Paid", channel: "PAYMENT", copy: "$240 received", icon: CircleDollarSign },
  { date: "MAY 07", title: "Review", channel: "REPUTATION", copy: "5★ review requested", icon: Star },
  { date: "AUG 06", title: "Return", channel: "EMAIL", copy: "Ready for your next appointment?", icon: Mail },
] as const;

function CustomerGrowth() {
  const reduced = !!useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#F1F5F4] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.88fr)_minmax(380px,1.12fr)] lg:items-end">
          <Reveal>
            <Eyebrow>Email · SMS · automation · retention</Eyebrow>
            <h2 className="mt-5 max-w-[780px] text-[50px] leading-[0.93] tracking-[-0.06em] sm:text-[70px] lg:text-[88px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              One customer.
              <span className="block text-[#66858A]">More than one moment.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[560px] text-[16px] leading-[1.75] text-[#66706F] sm:text-[18px]">
              SMS gets the immediate moment. Email carries the longer relationship. Automation decides who gets what and when. The CRM keeps every interaction attached to the same customer.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 lg:mt-24">
          <div className="absolute left-[20px] top-0 h-full w-px bg-[#CBD6D4] lg:left-0 lg:right-0 lg:top-[78px] lg:h-px lg:w-auto" />
          <motion.div
            className="absolute left-[20px] top-0 h-full w-px origin-top bg-[#1E8B91] lg:left-0 lg:right-0 lg:top-[78px] lg:h-px lg:w-auto lg:origin-left"
            initial={reduced ? false : { scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: EASE }}
          />

          <div className="grid gap-8 lg:grid-cols-6 lg:gap-3">
            {GROWTH_MOMENTS.map((moment, index) => {
              const Icon = moment.icon;
              const isEmail = moment.channel === "EMAIL";
              return (
                <Reveal key={`${moment.date}-${moment.title}`} delay={index * 0.07} className="relative pl-12 lg:pl-0 lg:pt-[110px]">
                  <div className="absolute left-[15px] top-[20px] z-10 h-[11px] w-[11px] rounded-full border-2 border-[#F1F5F4] bg-[#1E8B91] lg:left-[calc(50%-5px)] lg:top-[73px]" />
                  <div className={`min-h-[170px] border-t-2 bg-white p-5 shadow-[0_18px_46px_-34px_rgba(15,23,42,.28)] ${isEmail ? "border-[#111318] lg:-translate-y-6 lg:min-h-[205px]" : "border-[#9FB8B7]"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#8C9897]">{moment.date}</div>
                        <div className="mt-2 text-[15px] font-semibold text-[#171A1F]">{moment.title}</div>
                      </div>
                      <Icon className="h-4 w-4 text-[#3F7376]" />
                    </div>
                    <div className="mt-5 text-[12px] leading-[1.55] text-[#5E6867]">{moment.copy}</div>
                    <div className="mt-5 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#3F7376]">{moment.channel}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-14 grid gap-6 border-t border-[#CBD6D4] pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-[800px] text-[28px] leading-[1.02] tracking-[-0.04em] text-[#171A1F] sm:text-[38px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            The customer journey does not end when the job does.
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66858A]">Rebook · review · reactivate · return</div>
        </Reveal>
      </div>
    </section>
  );
}

function SharedCustomerRecord() {
  return (
    <div className="relative min-h-[540px] bg-white p-5 shadow-[0_40px_100px_-48px_rgba(15,23,42,.28)] sm:p-7 lg:min-h-[600px] lg:p-9">
      <div className="flex items-start justify-between gap-4 border-b border-[#E4E7E3] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111318] text-[11px] font-bold text-white">SM</div>
          <div>
            <div className="text-[16px] font-semibold text-[#171A1F]">Sarah Miller</div>
            <div className="mt-1 text-[10px] text-[#89908A]">Customer since May 2026</div>
          </div>
        </div>
        <div className="border border-[#C7D8D7] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#356D72]">Active</div>
      </div>

      <div className="grid gap-7 pt-6 sm:grid-cols-2">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA19A]">Conversation</div>
          <div className="mt-3 border-l-2 border-[#111318] bg-[#F5F7F5] px-4 py-3 text-[12px] leading-[1.45] text-[#3D4340]">“Thursday morning works for me.”</div>
        </div>
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA19A]">Opportunity</div>
          <div className="mt-3 text-[26px] leading-none tracking-[-0.04em] text-[#171A1F]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>$1,800</div>
          <div className="mt-2 text-[10px] text-[#72807B]">Consultation · qualified</div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#E4E7E3] pt-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA19A]">Owner</div>
            <div className="mt-2 text-[13px] font-semibold">Alex</div>
          </div>
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA19A]">Appointment</div>
            <div className="mt-2 text-[13px] font-semibold">Thu · 10:30 AM</div>
          </div>
          <div>
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA19A]">Next step</div>
            <div className="mt-2 text-[13px] font-semibold">Reminder tomorrow</div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-[#E4E7E3] pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA19A]">Recent activity</div>
          <div className="text-[9px] font-semibold text-[#3C7479]">6 events</div>
        </div>
        <div className="mt-4 space-y-3">
          {["SMS reply received", "Appointment confirmed", "Payment link prepared"].map((item, index) => (
            <div key={item} className="flex items-center gap-3 text-[11px] text-[#5E6862]">
              <span className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-[#1B8F95]" : "bg-[#C5CBC5]"}`} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UnlimitedUsers() {
  return (
    <section className="relative overflow-hidden bg-[#DDEBEB] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="pointer-events-none absolute left-[-3%] top-[5%] whitespace-nowrap text-[22vw] font-medium leading-none tracking-[-0.08em] text-[#BCD3D2]/55" style={{ fontFamily: DISPLAY }}>
        UNLIMITED
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,.75fr)_minmax(540px,1.25fr)] lg:items-center lg:gap-16">
          <Reveal>
            <Eyebrow>Unlimited users included</Eyebrow>
            <h2 className="mt-5 text-[50px] leading-[0.93] tracking-[-0.06em] sm:text-[70px] lg:text-[86px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Your whole team can follow through.
            </h2>
            <p className="mt-7 max-w-[540px] text-[16px] leading-[1.75] text-[#5C6968] sm:text-[18px]">
              The customer rarely belongs to one person. Owner, front desk, sales, accounts and delivery can all work from the same context without turning every teammate into another licence decision.
            </p>
            <div className="mt-8 border-t border-[#AFC8C7] pt-5 text-[12px] font-semibold text-[#2E676C]">Unlimited users. No per-seat tax.</div>
          </Reveal>

          <Reveal delay={0.08} className="relative mx-auto w-full max-w-[760px] pb-10 pt-4 sm:pb-14">
            <SharedCustomerRecord />
            <Cursor label="Owner" className="left-[2%] top-[6%] sm:-left-[3%] sm:top-[12%]" />
            <Cursor label="Front desk" className="right-[3%] top-[18%] sm:-right-[2%]" />
            <Cursor label="Sales" className="left-[8%] top-[48%] sm:-left-[5%]" />
            <Cursor label="Accounts" className="right-[7%] top-[58%] sm:-right-[4%]" />
            <Cursor label="Team" className="bottom-[2%] left-[54%] sm:bottom-0 sm:left-[58%]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunch() {
  return (
    <section className="overflow-hidden bg-[#EEE6DA] px-5 py-24 text-[#111318] sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(380px,1.1fr)] lg:items-end">
          <Reveal>
            <Eyebrow>Guided Launch</Eyebrow>
            <h2 className="mt-5 max-w-[780px] text-[50px] leading-[0.93] tracking-[-0.06em] sm:text-[70px] lg:text-[86px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Software only works when the team actually uses it.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:pb-2">
            <p className="max-w-[540px] text-[16px] leading-[1.75] text-[#716657] sm:text-[18px]">
              We learn how customers move through your business, configure the important workflows with you, launch them with the team, then improve what happens next.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal className="relative min-h-[520px] overflow-hidden border border-[#CFC4B4] bg-[#E8DDCC] p-5 sm:p-8">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A765C]">How it works today</div>

            <div className="absolute left-[7%] top-[20%] w-[54%] -rotate-3 bg-white px-5 py-5 shadow-[0_18px_45px_-30px_rgba(69,50,28,.28)]">
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9C9C95]">Website enquiry</div>
              <div className="mt-2 text-[13px] leading-[1.45]">Can I get a quote for next week?</div>
            </div>

            <div className="absolute right-[5%] top-[34%] flex w-[44%] rotate-2 items-center gap-3 border-y border-[#BDAE99] bg-[#F4EEE5] px-4 py-4">
              <PhoneCall className="h-5 w-5 text-[#A35D5D]" />
              <div>
                <div className="text-[8px] uppercase tracking-[0.14em] text-[#9A8E7D]">Missed call</div>
                <div className="mt-1 text-[12px] font-semibold">0412 884 103</div>
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[11%] w-[42%] -rotate-2 bg-[#FFF0A8] px-5 py-5 shadow-[0_16px_42px_-30px_rgba(69,50,28,.32)]">
              <div className="text-[13px] font-semibold leading-[1.35]">Remember to follow up quote</div>
            </div>

            <div className="absolute bottom-[9%] right-[8%] w-[43%] rotate-3 border-b border-[#A99780] bg-white/65 px-4 py-4">
              <div className="text-[8px] uppercase tracking-[0.14em] text-[#968B7D]">Calendar note</div>
              <div className="mt-2 text-[12px] font-semibold">Thu · 10:30 · Sarah?</div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="border-t border-[#BFAF99] pt-1">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A765C]">What we build with you</div>
            <div className="mt-5">
              {[
                ["01", "Map", "Understand the real customer journey, not an idealised diagram."],
                ["02", "Build", "Configure the important responses, ownership and follow-up."],
                ["03", "Launch", "Put it in front of the team with a working operating flow."],
                ["04", "Tune", "Improve the workflow as real customer behaviour comes through."],
              ].map(([n, title, copy]) => (
                <div key={n} className="grid grid-cols-[46px_120px_1fr] gap-3 border-b border-[#D4C8B8] py-6 sm:grid-cols-[62px_160px_1fr] sm:gap-5 sm:py-8">
                  <div className="font-mono text-[10px] text-[#A08E76]">{n}</div>
                  <div className="text-[27px] leading-none tracking-[-0.04em] sm:text-[34px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>{title}</div>
                  <div className="text-[12px] leading-[1.55] text-[#726657] sm:text-[14px]">{copy}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Decision() {
  return (
    <section className="overflow-hidden bg-[#07090C] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <Eyebrow dark>Customer follow-through for service businesses</Eyebrow>
          <h2 className="mt-6 max-w-[1200px] text-[54px] leading-[0.91] tracking-[-0.07em] sm:text-[78px] lg:text-[112px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            You do the work only your team can do.
            <span className="block text-white/38">Zapla keeps the customer moving.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/42">
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-cyan-200" /> Unlimited users</span>
            <span className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-cyan-200" /> AI follow-through</span>
            <span className="flex items-center gap-2"><Workflow className="h-3.5 w-3.5 text-cyan-200" /> Guided Launch</span>
            <span className="flex items-center gap-2"><UsersRound className="h-3.5 w-3.5 text-cyan-200" /> One connected customer journey</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={BOOK_URL} className="inline-flex h-[52px] items-center gap-2 bg-white px-5 text-[13px] font-semibold text-[#111318] transition-transform hover:-translate-y-0.5">
              Book a Call <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/pricing" className="inline-flex h-[52px] items-center gap-2 border border-white/20 px-5 text-[13px] font-semibold text-white/82 transition-colors hover:border-white/40 hover:text-white">
              See plans and pricing
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ZaplaHomepageContinuationV5() {
  return (
    <>
      <RevenueLeakage />
      <AIFollowThrough />
      <CustomerGrowth />
      <UnlimitedUsers />
      <GuidedLaunch />
      <Decision />
    </>
  );
}
