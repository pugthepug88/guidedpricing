import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  CreditCard,
  Globe2,
  Inbox,
  Layers3,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  UserRound,
  Users,
  Workflow,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/platform")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Zapla Platform | One Customer. One Connected System." },
      {
        name: "description",
        content:
          "Zapla keeps customer records, conversations, opportunities, bookings, payments, marketing and follow-through connected around one shared customer history.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PlatformPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const WORDMARK = "/concept/zapla-logo-dark.svg";

function PlatformPage() {
  return (
    <main
      data-page="platform"
      className="min-h-screen overflow-hidden bg-[#FCFCFA] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <Fragmentation />
      <Architecture />
      <BuyerOutcomes />
      <UnlimitedSection />
      <ReplaceConnect />
      <GuidedLaunch />
      <GoDeeper />
      <FinalCta />
    </main>
  );
}

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
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: reduced ? 0 : 0.48,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={
        "text-[10px] font-semibold uppercase tracking-[0.22em] " +
        (dark ? "text-[#F2B85B]" : "text-[#2563FF]")
      }
    >
      {children}
    </p>
  );
}

function PrimaryButton({ label = "Book a Call" }: { label?: string }) {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-[13px] font-semibold text-white shadow-[0_12px_28px_rgba(17,24,39,.14)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] focus-visible:ring-offset-2"
    >
      {label} <ArrowRight size={15} />
    </a>
  );
}

function ProductBrand({ section }: { section: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img
        src={WORDMARK}
        alt="Zapla"
        className="h-[18px] w-auto shrink-0 object-contain"
      />
      <span className="h-4 w-px bg-[#D9DEDA]" />
      <span className="truncate text-[7px] font-bold uppercase tracking-[0.12em] text-[#7A837D]">
        {section}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E3E8F1] bg-[#F8FAFF] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-24 lg:pt-[132px]">
      <div className="pointer-events-none absolute -left-36 top-16 h-[480px] w-[480px] rounded-full bg-[#2563FF]/[0.075] blur-[150px]" />
      <div className="pointer-events-none absolute -right-20 top-20 h-[360px] w-[360px] rounded-full bg-[#F29B78]/[0.10] blur-[145px]" />

      <div className="relative mx-auto max-w-[1420px]">
        <Reveal className="mx-auto max-w-[1060px] text-center">
          <Eyebrow>Zapla Platform</Eyebrow>

          <h1
            className="mx-auto mt-4 max-w-[1050px] text-[48px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[68px] lg:text-[86px]"
            style={{ fontFamily: DISPLAY }}
          >
            One customer.
            <span className="block text-[#2563FF]">One connected system around them.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[850px] text-[16px] leading-[1.72] text-[#596273] sm:text-[18px]">
            When someone enquires, replies, books, pays or comes back months later, Zapla keeps that activity attached to the same customer story, so the next step can change with it.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#how-it-connects"
              className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full border border-[#C9D5EE] bg-white px-6 text-[13px] font-semibold text-[#172033] transition-colors hover:border-[#2563FF] sm:w-auto"
            >
              See how it connects <ArrowDown size={14} />
            </a>
            <PrimaryButton />
          </div>

          <div className="mt-5 text-[11px] font-semibold text-[#657086] sm:text-[12px]">
            Unlimited users <span className="mx-2 text-[#B5BDCC]">·</span> Unlimited stored contacts* <span className="mx-2 text-[#B5BDCC]">·</span> Guided Launch
          </div>
        </Reveal>

        <Reveal className="mt-12 sm:mt-14" delay={0.05}>
          <ConnectedCustomerHero />
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedCustomerHero() {
  const reduced = !!useReducedMotion();

  const incoming = [
    { icon: <Globe2 size={14} />, title: "Website enquiry", meta: "09:12" },
    { icon: <MessageSquareText size={14} />, title: "SMS reply", meta: "09:24" },
    { icon: <CalendarDays size={14} />, title: "Booking confirmed", meta: "10:03" },
    { icon: <CreditCard size={14} />, title: "Payment received", meta: "Fri 16:18" },
  ];

  const actions = [
    { icon: <Workflow size={14} />, title: "Lead follow-up starts", meta: "after enquiry" },
    { icon: <Check size={14} />, title: "Follow-up pauses", meta: "after reply" },
    { icon: <CalendarDays size={14} />, title: "Next step booked", meta: "Thursday 10:30" },
    { icon: <Sparkles size={14} />, title: "Review request ready", meta: "after service" },
  ];

  return (
    <div className="relative mx-auto max-w-[1280px]">
      <div className="absolute inset-x-[6%] bottom-0 top-[18%] rounded-[36px] bg-[#DCE7FF]" />

      <div className="relative grid gap-4 p-3 sm:p-5 lg:grid-cols-[0.82fr_1.36fr_0.82fr] lg:gap-5 lg:p-8">
        <div className="rounded-[22px] border border-black/[0.08] bg-[#FCFCFB] p-5 shadow-[0_24px_70px_rgba(39,44,38,.09)] sm:p-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#7B837D]">
            What happens
          </div>
          <div className="mt-5 space-y-2.5">
            {incoming.map((item, index) => (
              <motion.div
                key={item.title}
                initial={reduced ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: reduced ? 0 : 0.32,
                  delay: reduced ? 0 : index * 0.08,
                  ease: EASE,
                }}
                className="flex items-center gap-3 rounded-[13px] border border-[#E0E4DF] bg-white px-3.5 py-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#EEF4FF] text-[#4D6FC5]">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-[10.5px] font-semibold text-[#353C38]">{item.title}</div>
                  <div className="mt-0.5 text-[8.5px] text-[#8A918C]">{item.meta}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-[10px] leading-[1.6] text-[#7D847F]">
            Different events. One customer story.
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#D5DBD6] bg-white shadow-[0_30px_82px_rgba(40,45,42,.15)]">
          <div className="flex min-h-[46px] items-center justify-between gap-4 border-b border-[#E1E5E1] bg-[#FCFCFB] px-4 sm:px-5">
            <ProductBrand section="Customer history" />
            <span className="rounded-full bg-[#2563FF]/8 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">
              Connected
            </span>
          </div>

          <div className="grid md:grid-cols-[190px_minmax(0,1fr)]">
            <div className="border-b border-[#E4E7E4] bg-[#F7F8F5] p-5 md:border-b-0 md:border-r">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#E9DDD2] text-[13px] font-semibold text-[#514942]">
                MT
              </div>
              <div className="mt-3 text-[14px] font-semibold">Mia Thompson</div>
              <div className="mt-1 text-[9px] text-[#858C87]">Northside Plumbing</div>

              <div className="mt-6 space-y-3 border-y border-[#E0E4E0] py-4">
                <ContextMeta label="Owner" value="Ben Walker" />
                <ContextMeta label="Stage" value="Booked" />
                <ContextMeta label="Last touch" value="SMS · today" />
                <ContextMeta label="Customer type" value="Residential" />
              </div>

              <div className="mt-5 rounded-[12px] bg-[#EAF0FF] px-3 py-3">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#5E72A2]">
                  Same record
                </div>
                <div className="mt-1 text-[10px] font-semibold text-[#3C4538]">
                  History keeps accumulating
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#838B85]">
                    Activity
                  </div>
                  <div className="mt-1 text-[18px] font-semibold tracking-[-0.03em]">
                    Everything around Mia, in order.
                  </div>
                </div>
                <div className="hidden rounded-full border border-[#E1E4E1] px-3 py-1.5 text-[8px] font-semibold text-[#69716C] sm:block">
                  Full customer context
                </div>
              </div>

              <div className="relative mt-6">
                <div className="absolute bottom-2 left-[13px] top-2 w-px bg-[#D5DBD6]" />
                <TimelineRow
                  delay={0}
                  icon={<Globe2 size={11} />}
                  title="Website enquiry created the record"
                  copy="Hot water replacement enquiry · Sydney"
                />
                <TimelineRow
                  delay={0.08}
                  icon={<Send size={11} />}
                  title="Follow-up started"
                  copy="SMS and email sequence attached to the same enquiry"
                />
                <TimelineRow
                  delay={0.16}
                  icon={<MessageSquareText size={11} />}
                  title="Mia replied"
                  copy="“Thursday works for me.” The reply lands on the same history."
                  accent
                />
                <TimelineRow
                  delay={0.24}
                  icon={<CalendarDays size={11} />}
                  title="Booking confirmed"
                  copy="Thursday · 10:30am. Lead follow-up no longer needs to continue."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] border border-black/[0.08] bg-[#1E2B29] p-5 text-white shadow-[0_24px_70px_rgba(30,43,41,.15)] sm:p-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/45">
            What follows
          </div>
          <div className="mt-5 space-y-2.5">
            {actions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={reduced ? false : { opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{
                  duration: reduced ? 0 : 0.32,
                  delay: reduced ? 0 : 0.1 + index * 0.08,
                  ease: EASE,
                }}
                className="flex items-center gap-3 rounded-[13px] border border-white/10 bg-white/[0.065] px-3.5 py-3"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[#C9D7FF]">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-[10.5px] font-semibold text-white/88">{item.title}</div>
                  <div className="mt-0.5 text-[8.5px] text-white/42">{item.meta}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-[10px] leading-[1.6] text-white/45">
            Context changes what should happen next.
          </p>
        </div>
      </div>

      <div className="relative mx-auto mt-3 max-w-[820px] text-center text-[10px] leading-[1.6] text-[#686E68] sm:text-[11px]">
        Different parts of Zapla. Same customer. Same context.
      </div>
    </div>
  );
}

function ContextMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[7.5px] font-bold uppercase tracking-[0.11em] text-[#8A918C]">{label}</div>
      <div className="mt-1 text-[9.5px] font-semibold text-[#444B47]">{value}</div>
    </div>
  );
}

function TimelineRow({
  icon,
  title,
  copy,
  accent = false,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  copy: string;
  accent?: boolean;
  delay?: number;
}) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.65 }}
      transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : delay, ease: EASE }}
      className="relative flex gap-3 pb-5 last:pb-0"
    >
      <span
        className={
          "relative z-10 mt-0.5 grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border " +
          (accent
            ? "border-[#2563FF]/25 bg-[#EAF0FF] text-[#2563FF]"
            : "border-[#D9DEDA] bg-white text-[#69736C]")
        }
      >
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <div className="text-[10.5px] font-semibold text-[#313834]">{title}</div>
        <div className="mt-1 text-[9px] leading-[1.55] text-[#828985]">{copy}</div>
      </div>
    </motion.div>
  );
}

function Fragmentation() {
  const rows = [
    { system: "Inbox", state: "Mia replied", icon: <Inbox size={15} /> },
    { system: "CRM", state: "Still says quote sent", icon: <UserRound size={15} /> },
    { system: "Calendar", state: "Booking changed", icon: <CalendarDays size={15} /> },
    { system: "Payments", state: "Invoice paid", icon: <CircleDollarSign size={15} /> },
    { system: "Marketing", state: "Still sending lead follow-up", icon: <Mail size={15} /> },
  ];

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <Eyebrow>The hidden problem</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your customer doesn't live in separate tools.
            <span className="block text-[#697386]">Their history shouldn't either.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[780px] text-[15px] leading-[1.75] text-[#626B79] sm:text-[16px]">
            The problem is not simply having several tools. It is that each one can hold a different version of what just happened, so the next person acts on an older story.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_0.9fr] lg:gap-7">
          <Reveal>
            <div className="h-full rounded-[26px] border border-[#DEE3EC] bg-[#F7F9FC] p-6 sm:p-8">
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#697386]">
                When the tools do not share context
              </div>

              <div className="mt-6 border-y border-[#DCE2EB]">
                {rows.map((row) => (
                  <div
                    key={row.system}
                    className="grid gap-2 border-b border-[#DCE2EB] py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:items-center"
                  >
                    <div className="flex items-center gap-2.5 text-[#697386]">
                      {row.icon}
                      <span className="text-[10px] font-bold uppercase tracking-[0.13em]">{row.system}</span>
                    </div>
                    <div className="text-[13px] font-semibold text-[#2B3442] sm:text-[14px]">{row.state}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-[16px] border border-[#F3D5C9] bg-[#FFF2EC] px-4 py-4">
                <Users size={17} className="mt-0.5 shrink-0 text-[#C96F55]" />
                <p className="text-[11px] leading-[1.65] text-[#74594F] sm:text-[12px]">
                  That is when customers repeat themselves, follow-up keeps firing after they have replied, and your team checks three places before deciding what to do.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative h-full overflow-hidden rounded-[26px] bg-[#101A2B] p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#2563FF]/20 blur-[90px]" />

              <div className="relative">
                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8EADFF]">
                  Connected customer history
                </div>
                <h3
                  className="mt-5 max-w-[560px] text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[48px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  One change can inform what happens next.
                </h3>

                <div className="mt-8 space-y-3">
                  {[
                    ["Reply received", "Conversation context updates"],
                    ["Booking changed", "Follow-up can adjust"],
                    ["Payment recorded", "Customer state changes"],
                    ["Service completed", "Review or retention can begin"],
                  ].map(([event, outcome]) => (
                    <div key={event} className="grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-[0.9fr_1.1fr]">
                      <div className="text-[11px] font-semibold text-white/90">{event}</div>
                      <div className="flex items-center gap-2 text-[10.5px] text-white/55">
                        <ArrowRight size={12} className="text-[#8EADFF]" />
                        {outcome}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 max-w-[570px] text-[12px] leading-[1.75] text-white/52 sm:text-[13px]">
                  The point is not to make every tool disappear. It is to stop the customer story from disappearing between them.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const reduced = !!useReducedMotion();

  const steps = [
    {
      number: "01",
      term: "Record",
      title: "Who they are",
      copy: "Details, fields, tags, ownership and the history already attached to the customer.",
      tone: "#DDE7FF",
    },
    {
      number: "02",
      term: "Context",
      title: "What happened",
      copy: "Messages, calls, forms, notes, bookings and other activity that changes the story.",
      tone: "#FFE4D8",
    },
    {
      number: "03",
      term: "State",
      title: "Where things stand",
      copy: "Lead stage, quote status, booking, payment or service status right now.",
      tone: "#DDE7FF",
    },
    {
      number: "04",
      term: "Action",
      title: "What happens next",
      copy: "A task, message, workflow, booking, AI action or other follow-through.",
      tone: "#F8E7B9",
    },
  ];

  return (
    <section id="how-it-connects" className="relative overflow-hidden bg-[#0C1524] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -left-28 top-20 h-[420px] w-[420px] rounded-full bg-[#2563FF]/15 blur-[150px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-[#F29B78]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1360px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow dark>How Zapla connects the work</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            The customer record
            <span className="block text-white/48">is only the beginning.</span>
          </h2>
          <p className="mt-6 max-w-[780px] text-[15px] leading-[1.75] text-white/58 sm:text-[16px]">
            Zapla connects who the customer is, what just happened, where things stand and what should happen next, so your team does not have to reconstruct the story by hand.
          </p>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-[8%] right-[8%] top-[39px] hidden h-px bg-white/12 lg:block" />
          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 0.75, ease: EASE }}
            className="absolute left-[8%] right-[8%] top-[39px] hidden h-px origin-left bg-[#7EA2FF]/70 lg:block"
          />

          <div className="relative grid gap-3 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="h-full rounded-[22px] border border-white/10 bg-white/[0.055] p-5 sm:p-6">
                  <div
                    className="grid h-[48px] w-[48px] place-items-center rounded-full text-[10px] font-bold text-[#172033]"
                    style={{ backgroundColor: step.tone }}
                  >
                    {step.number}
                  </div>
                  <div className="mt-6 text-[8px] font-bold uppercase tracking-[0.15em] text-white/38">{step.term}</div>
                  <h3
                    className="mt-2 text-[29px] font-medium tracking-[-0.045em]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7] text-white/50 sm:text-[13px]">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-8 rounded-[24px] border border-white/10 bg-white p-5 text-[#172033] sm:p-7" delay={0.12}>
          <div className="grid items-center gap-6 lg:grid-cols-[0.62fr_1.38fr]">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#2563FF]">
                A simple example
              </div>
              <h3
                className="mt-3 text-[30px] font-medium leading-[1] tracking-[-0.045em] sm:text-[36px]"
                style={{ fontFamily: DISPLAY }}
              >
                Mia replied. The next step changes.
              </h3>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-4">
              {[
                ["Reply", "“Thursday works for me.”"],
                ["Customer", "Reply attaches to Mia"],
                ["Now", "Booking is confirmed"],
                ["Next", "Lead follow-up stops"],
              ].map(([label, copy], index) => (
                <div key={label} className="relative rounded-[14px] border border-[#DDE3EE] bg-[#F8FAFF] px-4 py-4">
                  <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#758197]">{label}</div>
                  <div className="mt-2 text-[10px] font-semibold leading-[1.5] text-[#303949]">{copy}</div>
                  {index < 3 ? (
                    <ArrowRight
                      size={13}
                      className="absolute -right-[8px] top-1/2 z-10 hidden -translate-y-1/2 text-[#7393E8] sm:block"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function BuyerOutcomes() {
  const moments = [
    {
      number: "01",
      moment: "A new enquiry arrives",
      context: "The source, customer record and conversation start together.",
      next: "Respond and start follow-up while interest is fresh.",
      outcome: "Less demand goes quiet.",
      icon: <Globe2 size={16} />,
    },
    {
      number: "02",
      moment: "They reply or change a booking",
      context: "The latest conversation and booking state attach to the same customer.",
      next: "Pause or adjust follow-up instead of sending the wrong message.",
      outcome: "Less manual cleanup.",
      icon: <MessageSquareText size={16} />,
    },
    {
      number: "03",
      moment: "A quote, payment or service status changes",
      context: "The customer state moves as the work moves.",
      next: "Sales, operations and accounts can act from the latest version.",
      outcome: "Fewer hand-off gaps.",
      icon: <CreditCard size={16} />,
    },
    {
      number: "04",
      moment: "A lead or customer goes quiet",
      context: "Their history stays usable instead of disappearing into an archive.",
      next: "Reopen the right conversation later without starting from zero.",
      outcome: "More value from the database.",
      icon: <RefreshCw size={16} />,
    },
  ];

  return (
    <section className="bg-[#EEF4FF] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <Eyebrow>What connected context changes</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              When something changes,
              <span className="block text-[#2563FF]">the next step can change with it.</span>
            </h2>
          </div>
          <p className="max-w-[650px] text-[14px] leading-[1.75] text-[#5F6B80] sm:text-[15px]">
            The value is not having more software. It is having enough of the customer story in one place for the next action to match what is actually happening.
          </p>
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-[#C9D7F3] bg-white shadow-[0_18px_55px_rgba(37,99,255,.07)]">
          {moments.map((item, index) => (
            <Reveal
              key={item.moment}
              className={"grid gap-5 p-6 sm:p-7 lg:grid-cols-[72px_0.9fr_1.2fr_0.72fr] lg:items-center lg:gap-8 " + (index ? "border-t border-[#DFE6F2]" : "")}
              delay={index * 0.04}
            >
              <div className="flex items-center gap-3 lg:block">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E7EEFF] text-[#2563FF]">{item.icon}</div>
                <div className="mt-0 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A95A8] lg:mt-2">{item.number}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#7A8598]">What changed</div>
                <h3 className="mt-2 text-[26px] font-medium leading-[1] tracking-[-0.04em] text-[#172033]" style={{ fontFamily: DISPLAY }}>
                  {item.moment}
                </h3>
                <p className="mt-3 text-[12px] leading-[1.65] text-[#6A7486]">{item.context}</p>
              </div>
              <div className="rounded-[16px] bg-[#F7F9FD] px-5 py-4">
                <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#2563FF]">Zapla can keep the next step relevant</div>
                <p className="mt-2 text-[12px] font-semibold leading-[1.6] text-[#354055]">{item.next}</p>
              </div>
              <div className="text-[13px] font-semibold leading-[1.5] text-[#243047]">{item.outcome}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UnlimitedSection() {
  const roles = ["Reception", "Sales", "Operations", "Marketing", "Accounts", "Owner"];

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
        <Reveal className="max-w-[610px]">
          <Eyebrow>Unlimited participation</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Everyone who touches the customer
            <span className="block text-[#2563FF]">should see the same story.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-[1.75] text-[#626B79] sm:text-[16px]">
            That is why Zapla includes unlimited users on standard plans. Reception, sales, operations, accounts and marketing can work from the same customer history without deciding who deserves a seat.
          </p>
          <p className="mt-4 max-w-[580px] text-[15px] leading-[1.75] text-[#626B79] sm:text-[16px]">
            Unlimited stored contacts* keeps old leads and customers usable for follow-up, reactivation and customer marketing as the database grows.
          </p>
          <div className="mt-6 text-[10px] text-[#8A93A2]">
            *Unlimited stored contacts are subject to fair use. Communications and other usage-based services are separate.
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[34px] bg-[#DCE7FF]" />
            <div className="relative overflow-hidden rounded-[26px] border border-[#CDD8EC] bg-white shadow-[0_28px_80px_rgba(37,99,255,.10)]">
              <div className="flex min-h-[46px] items-center justify-between border-b border-[#E2E7F0] px-4 sm:px-5">
                <ProductBrand section="Shared customer workspace" />
                <span className="hidden text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF] sm:inline">
                  Unlimited users
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="rounded-[18px] border border-[#DDE4F0] bg-[#F8FAFF] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#FFE5DA] text-[12px] font-semibold text-[#6C4B40]">
                        MT
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold">Mia Thompson</div>
                        <div className="mt-0.5 text-[9px] text-[#7A8496]">Booked · Thursday 10:30am</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-[#E7EEFF] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.11em] text-[#2563FF]">
                      Same customer
                    </div>
                  </div>

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {[
                      ["Reception", "Booking confirmed"],
                      ["Sales", "Quote and opportunity visible"],
                      ["Operations", "Service context ready"],
                      ["Accounts", "Payment status visible"],
                    ].map(([role, state]) => (
                      <div key={role} className="rounded-[13px] border border-[#DFE5EF] bg-white px-4 py-3">
                        <div className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#7E899B]">{role}</div>
                        <div className="mt-1.5 text-[10px] font-semibold text-[#354055]">{state}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#8A95A8]">
                    Who can work from the same customer system
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full border border-[#DCE3EF] bg-white px-3 py-2 text-[9px] font-semibold text-[#5C677A]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReplaceConnect() {
  return (
    <section className="bg-[#F5F7FB] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mx-auto max-w-[1040px] text-center">
          <Eyebrow>Replace less blindly</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Bring together what should share context.
            <span className="block text-[#697386]">Keep what still earns its place.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[790px] text-[15px] leading-[1.75] text-[#626B79] sm:text-[16px]">
            Zapla can consolidate the customer-facing work that benefits from one shared history without forcing every specialist system out of the business.
          </p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[28px] border border-[#D8DFEA] bg-white lg:grid-cols-2">
          <Reveal className="border-b border-[#D8DFEA] p-7 sm:p-9 lg:border-b-0 lg:border-r" delay={0.03}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E7EEFF] text-[#2563FF]">
                <Layers3 size={17} />
              </span>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#2563FF]">Bring together</div>
            </div>
            <h3
              className="mt-6 text-[34px] font-medium leading-[1] tracking-[-0.045em] sm:text-[42px]"
              style={{ fontFamily: DISPLAY }}
            >
              Put the customer-facing work that benefits from shared context in one place.
            </h3>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["CRM & customer records", "Inbox & conversations", "Pipelines & bookings", "Marketing & follow-through", "Forms & lead capture", "Payments & invoices"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 border-t border-[#E3E7EE] pt-3 text-[11px] font-semibold text-[#525D70]">
                  <Check size={13} className="text-[#2563FF]" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="bg-[#FAFBFE] p-7 sm:p-9" delay={0.07}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FFF0EA] text-[#C96F55]">
                <Workflow size={17} />
              </span>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#B9654E]">Keep and connect</div>
            </div>
            <h3
              className="mt-6 text-[34px] font-medium leading-[1] tracking-[-0.045em] sm:text-[42px]"
              style={{ fontFamily: DISPLAY }}
            >
              Keep specialist systems where they still make sense.
            </h3>
            <p className="mt-5 max-w-[530px] text-[13px] leading-[1.75] text-[#687386] sm:text-[14px]">
              Where another system still belongs, supported connections can keep it part of the customer flow so the team does not have to restart the story every time work crosses systems.
            </p>
            <div className="mt-7 rounded-[17px] border border-[#DCE3EE] bg-white p-4">
              <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7A8496]">The decision</div>
              <div className="mt-2 text-[12px] font-semibold text-[#354055]">
                Move what benefits from shared context. Keep what is genuinely specialist. Connect the gap where supported.
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6 text-center text-[10px] leading-[1.6] text-[#8992A1]">
          Connection options depend on the systems, channels and account setup being used.
        </Reveal>
      </div>
    </section>
  );
}


function GuidedLaunch() {
  const steps = [
    {
      number: "01",
      title: "Map",
      copy: "We map how enquiries, customers, bookings and hand-offs move through your business.",
    },
    {
      number: "02",
      title: "Build",
      copy: "We configure the agreed records, pipelines, forms, automations and connections around that flow.",
    },
    {
      number: "03",
      title: "Launch",
      copy: "We test the first working version with your team and get it live.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#111827] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#2563FF]/18 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-0 h-[300px] w-[300px] rounded-full bg-[#F29B78]/12 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow dark>Guided Launch</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              You do not have to map
              <span className="block text-[#8EADFF]">this system alone.</span>
            </h2>
          </div>
          <p className="max-w-[620px] text-[14px] leading-[1.75] text-white/60 sm:text-[15px]">
            Guided Launch turns the platform into a first working version around your business. We decide what moves into Zapla, what stays connected and what should happen automatically.
          </p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              className={"p-7 sm:p-8 " + (index ? "border-t border-white/10 lg:border-l lg:border-t-0" : "")}
              delay={index * 0.05}
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8EADFF]">{step.number}</div>
              <h3 className="mt-5 text-[34px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>{step.title}</h3>
              <p className="mt-4 max-w-[340px] text-[12px] leading-[1.7] text-white/52 sm:text-[13px]">{step.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#F2B85B]">What gets decided</div>
            <div className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-white">What moves. What stays. What should happen automatically.</div>
          </div>
          <PrimaryButton label="Map my setup" />
        </Reveal>
      </div>
    </section>
  );
}

function GoDeeper() {
  const intents = [
    {
      title: "Manage customers and opportunities",
      product: "CRM",
      copy: "Keep records, conversations, pipelines and customer history together.",
      href: "/crm",
      icon: <UserRound size={17} />,
    },
    {
      title: "Stop enquiries going quiet",
      product: "Follow-Up",
      copy: "Keep expected next steps moving after an enquiry, quote or booking.",
      href: "/follow-up",
      icon: <Workflow size={17} />,
    },
    {
      title: "Answer more calls and book more work",
      product: "AI Receptionist",
      copy: "Handle calls, qualification, booking and hand-off without losing the next step.",
      href: "/ai-receptionist",
      icon: <Phone size={17} />,
    },
    {
      title: "Bring dormant leads and customers back",
      product: "Reopen",
      copy: "Restart relevant conversations without losing the history that came before.",
      href: "/reactivation",
      icon: <RefreshCw size={17} />,
    },
    {
      title: "Reach existing customers with relevant campaigns",
      product: "Customer Marketing",
      copy: "Use customer data to choose the right audience and keep replies connected.",
      href: "/customer-marketing",
      icon: <Send size={17} />,
    },
    {
      title: "Ask for reviews at the right moment",
      product: "Reviews & Reputation",
      copy: "Carry the customer story through to the review moment after the work is done.",
      href: "/reviews",
      icon: <Sparkles size={17} />,
    },
  ];

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <Eyebrow>Choose where to go next</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
              style={{ fontFamily: DISPLAY }}
            >
              What do you want
              <span className="block text-[#2563FF]">to fix first?</span>
            </h2>
          </div>
          <p className="max-w-[600px] text-[14px] leading-[1.75] text-[#626B79] sm:text-[15px]">
            Start with the job that is getting stuck today. Each page goes deeper into how Zapla handles that specific part of the customer journey.
          </p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[28px] border border-[#DDE3EC] md:grid-cols-2">
          {intents.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              className={
                "group grid gap-4 bg-white p-6 transition-colors hover:bg-[#F8FAFF] sm:p-7 " +
                (index >= 2 ? "border-t border-[#DDE3EC] " : "") +
                (index % 2 === 1 ? "md:border-l md:border-[#DDE3EC] " : "") +
                (index === 1 ? "border-t border-[#DDE3EC] md:border-t-0 " : "")
              }
            >
              <div className="flex items-start justify-between gap-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E7EEFF] text-[#2563FF]">{item.icon}</span>
                <ArrowRight size={15} className="mt-2 text-[#9BA5B5] transition-transform group-hover:translate-x-1 group-hover:text-[#2563FF]" />
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7F8A9E]">{item.product}</div>
                <h3 className="mt-2 text-[27px] font-medium leading-[1.02] tracking-[-0.04em] text-[#172033]" style={{ fontFamily: DISPLAY }}>
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[500px] text-[12px] leading-[1.65] text-[#6B7587]">{item.copy}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#F8FAFF] px-5 pb-12 pt-12 sm:px-10 sm:pb-14 sm:pt-16 lg:px-16">
      <Reveal className="mx-auto max-w-[1080px] text-center">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111827] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>

        <div className="mt-5">
          <Eyebrow>One customer system</Eyebrow>
        </div>

        <h2
          className="mx-auto mt-3 max-w-[980px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111827] sm:text-[56px] lg:text-[66px]"
          style={{ fontFamily: DISPLAY }}
        >
          See where Zapla should fit
          <span className="block text-[#2563FF]">around your customer journey.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.68] text-[#616B7B] sm:text-[16px]">
          We’ll map what should move into Zapla, what should stay connected and where better context can remove manual follow-through.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton />
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#D6DEEB] bg-white px-6 text-[13px] font-semibold text-[#172033] transition-colors hover:border-[#2563FF] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}

