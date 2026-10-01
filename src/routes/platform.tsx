import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileText,
  Globe2,
  Inbox,
  Layers3,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  Send,
  Sparkles,
  Tags,
  UserRound,
  Users,
  Workflow,
} from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";
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
      <OperatingTerritories />
      <CapabilityMap />
      <UnlimitedSection />
      <ReplaceConnect />
      <GoDeeper />
      <FinalCta />
      <DominoFooter />
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
        (dark ? "text-[#E8B75F]" : "text-[#58706F]")
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
      className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] shadow-[0_12px_28px_rgba(30,43,41,.12)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2"
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
    <section className="relative overflow-hidden border-b border-[#DED8CF] bg-[#F7F3EC] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-24 lg:pt-[132px]">
      <div className="pointer-events-none absolute -left-40 top-24 h-[500px] w-[500px] rounded-full bg-[#CFD9C3]/34 blur-[145px]" />
      <div className="pointer-events-none absolute -right-24 top-14 h-[420px] w-[420px] rounded-full bg-[#2563FF]/[0.045] blur-[130px]" />

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

          <p className="mx-auto mt-6 max-w-[820px] text-[16px] leading-[1.72] text-[#606660] sm:text-[18px]">
            Customer records, conversations, opportunities, bookings and the actions that follow stay connected, so your team works from the same history instead of stitching together separate tools.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#how-it-connects"
              className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px sm:w-auto"
            >
              See how it connects <ArrowDown size={14} />
            </a>
            <PrimaryButton />
          </div>

          <div className="mt-5 text-[11px] font-semibold text-[#6A6F6B] sm:text-[12px]">
            Unlimited users <span className="mx-2 text-[#B3B2AC]">·</span> Unlimited stored contacts* <span className="mx-2 text-[#B3B2AC]">·</span> Guided Launch
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
      <div className="absolute inset-x-[6%] bottom-0 top-[18%] rounded-[36px] bg-[#CED8C3]" />

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
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#EEF1EB] text-[#63715D]">
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

              <div className="mt-5 rounded-[12px] bg-[#E7ECE2] px-3 py-3">
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#68745F]">
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
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <Eyebrow>The hidden problem</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your customer doesn't live in separate tools.
            <span className="block text-[#6E756E]">Their history shouldn't either.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[760px] text-[15px] leading-[1.75] text-[#686E68] sm:text-[16px]">
            The real problem with a fragmented stack is not the number of logins. It is that each system can hold a different version of what is happening with the same customer.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_0.9fr] lg:gap-7">
          <Reveal>
            <div className="h-full rounded-[26px] border border-[#E0D9CF] bg-[#F7F3ED] p-6 sm:p-8">
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7564]">
                When the tools do not share context
              </div>

              <div className="mt-6 border-y border-[#DED5CA]">
                {rows.map((row) => (
                  <div
                    key={row.system}
                    className="grid gap-2 border-b border-[#DED5CA] py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:items-center"
                  >
                    <div className="flex items-center gap-2.5 text-[#6E655C]">
                      {row.icon}
                      <span className="text-[10px] font-bold uppercase tracking-[0.13em]">{row.system}</span>
                    </div>
                    <div className="text-[13px] font-semibold text-[#343633] sm:text-[14px]">{row.state}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-[16px] bg-[#E7D8C7] px-4 py-4">
                <Users size={17} className="mt-0.5 shrink-0 text-[#735C49]" />
                <p className="text-[11px] leading-[1.65] text-[#66594E] sm:text-[12px]">
                  Your team becomes the integration layer, remembering what changed and manually fixing what the other systems do not know.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative h-full overflow-hidden rounded-[26px] bg-[#1E2B29] p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#2563FF]/10 blur-[90px]" />

              <div className="relative">
                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#E7B75E]">
                  Connected customer history
                </div>
                <h3
                  className="mt-5 max-w-[560px] text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[48px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  One version of the customer can inform what happens next.
                </h3>

                <div className="mt-8 space-y-3">
                  {[
                    ["Reply received", "Conversation context updates"],
                    ["Booking changed", "Follow-up can adjust"],
                    ["Payment recorded", "Customer state changes"],
                    ["Service completed", "Review or retention action can begin"],
                  ].map(([event, outcome], index) => (
                    <div key={event} className="grid gap-2 border-t border-white/10 pt-4 sm:grid-cols-[0.9fr_1.1fr]">
                      <div className="text-[11px] font-semibold text-white/90">{event}</div>
                      <div className="flex items-center gap-2 text-[10.5px] text-white/52">
                        <ArrowRight size={12} className="text-[#AFC3FF]" />
                        {outcome}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 max-w-[570px] text-[12px] leading-[1.75] text-white/48 sm:text-[13px]">
                  The point is not to make every tool disappear. It is to stop customer context from disappearing between them.
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
      title: "Record",
      copy: "Who the customer is. Their details, fields, tags, ownership and history.",
      tone: "#D8E0CF",
    },
    {
      number: "02",
      title: "Context",
      copy: "What happened. Messages, calls, forms, notes, bookings and activity.",
      tone: "#E8DDD1",
    },
    {
      number: "03",
      title: "State",
      copy: "Where things stand. Lead stage, quote status, booking, payment or service state.",
      tone: "#DCE5F8",
    },
    {
      number: "04",
      title: "Action",
      copy: "What should happen next. A task, message, workflow, booking, AI action or follow-through.",
      tone: "#E6DFC8",
    },
  ];

  return (
    <section id="how-it-connects" className="relative overflow-hidden bg-[#17211F] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -left-28 top-20 h-[420px] w-[420px] rounded-full bg-[#6F8063]/12 blur-[150px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full bg-[#2563FF]/9 blur-[140px]" />

      <div className="relative mx-auto max-w-[1360px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow dark>How Zapla connects the work</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            The customer record
            <span className="block text-white/46">is only the beginning.</span>
          </h2>
          <p className="mt-6 max-w-[760px] text-[15px] leading-[1.75] text-white/52 sm:text-[16px]">
            Zapla becomes more useful when customer identity, what just happened, the current state and the next action can stay connected instead of being reconstructed by hand.
          </p>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-[8%] right-[8%] top-[39px] hidden h-px bg-white/12 lg:block" />
          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduced ? 0 : 0.75, ease: EASE }}
            className="absolute left-[8%] right-[8%] top-[39px] hidden h-px origin-left bg-[#8DAFFF]/55 lg:block"
          />

          <div className="relative grid gap-3 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="h-full rounded-[22px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-[2px] sm:p-6">
                  <div
                    className="grid h-[48px] w-[48px] place-items-center rounded-full text-[10px] font-bold text-[#1E2927]"
                    style={{ backgroundColor: step.tone }}
                  >
                    {step.number}
                  </div>
                  <h3
                    className="mt-6 text-[29px] font-medium tracking-[-0.045em]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.7] text-white/48 sm:text-[13px]">{step.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-8 rounded-[24px] border border-white/10 bg-[#F6F2EA] p-5 text-[#1A1D1B] sm:p-7" delay={0.12}>
          <div className="grid items-center gap-6 lg:grid-cols-[0.62fr_1.38fr]">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#687460]">
                A simple example
              </div>
              <h3
                className="mt-3 text-[30px] font-medium leading-[1] tracking-[-0.045em] sm:text-[36px]"
                style={{ fontFamily: DISPLAY }}
              >
                Context changes the next action.
              </h3>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-4">
              {[
                ["Reply", "Mia says Thursday works"],
                ["Context", "Reply attaches to Mia"],
                ["State", "Booking becomes confirmed"],
                ["Action", "Lead follow-up can stop"],
              ].map(([label, copy], index) => (
                <div key={label} className="relative rounded-[14px] border border-[#DED8CF] bg-white px-4 py-4">
                  <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7C847E]">{label}</div>
                  <div className="mt-2 text-[10px] font-semibold leading-[1.5] text-[#363C38]">{copy}</div>
                  {index < 3 ? (
                    <ArrowRight
                      size={13}
                      className="absolute -right-[8px] top-1/2 z-10 hidden -translate-y-1/2 text-[#7085B7] sm:block"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6 text-center text-[12px] font-medium text-white/50">
          When record, context and state live together, the next action does not have to start from scratch.
        </Reveal>
      </div>
    </section>
  );
}

function OperatingTerritories() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[910px]">
          <Eyebrow>One system, different jobs</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            See what is happening.
            <span className="block text-[#717770]">Then keep it moving.</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-y border-[#DDDCD7]">
          <Territory
            number="01"
            eyebrow="Know what is happening"
            title="Keep the customer and the context together."
            copy="Customer records, conversations, opportunity stages and activity history give the person picking up the work the same picture."
            capabilities={["Customer records", "Conversations", "Pipelines", "History", "Reporting"]}
            links={[["Explore CRM", "/crm"]]}
          />

          <Territory
            number="02"
            eyebrow="Make the next thing happen"
            title="Use customer state to drive the next action."
            copy="A new enquiry, reply, stage change, booking or other customer event can create the next task, message, workflow or AI-assisted action without starting from zero."
            capabilities={["Workflows", "Bookings", "Email", "SMS", "AI", "Payments"]}
            links={[
              ["Explore Follow-Up", "/follow-up"],
              ["Explore AI Receptionist", "/ai-receptionist"],
            ]}
            alt
          />

          <Territory
            number="03"
            eyebrow="Keep the relationship moving"
            title="The customer history keeps mattering after the first sale."
            copy="Use what Zapla already knows about the customer to ask for a review, start another relevant conversation or reopen a relationship that went quiet."
            capabilities={["Customer Marketing", "Reviews", "Reactivation", "Segmentation", "Repeat business"]}
            links={[
              ["Customer Marketing", "/customer-marketing"],
              ["Reviews & Reputation", "/reviews"],
              ["Reopen", "/reactivation"],
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Territory({
  number,
  eyebrow,
  title,
  copy,
  capabilities,
  links,
  alt = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  capabilities: string[];
  links: [string, string][];
  alt?: boolean;
}) {
  return (
    <Reveal>
      <div
        className={
          "grid gap-7 border-b border-[#DDDCD7] py-9 last:border-b-0 sm:py-11 lg:grid-cols-[0.34fr_0.86fr_1.1fr] lg:items-start lg:gap-12 " +
          (alt ? "bg-[#F7F5F0] -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10" : "")
        }
      >
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9B9E98]">{number}</div>
          <div className="mt-3 text-[9px] font-bold uppercase tracking-[0.15em] text-[#6A7664]">{eyebrow}</div>
        </div>

        <div>
          <h3
            className="text-[32px] font-medium leading-[1] tracking-[-0.045em] sm:text-[40px]"
            style={{ fontFamily: DISPLAY }}
          >
            {title}
          </h3>
          <p className="mt-4 max-w-[560px] text-[13px] leading-[1.75] text-[#6A706A] sm:text-[14px]">{copy}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[#E1E0DB] pb-5">
            {capabilities.map((item) => (
              <span key={item} className="text-[10px] font-semibold text-[#626962]">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1E2B29] transition-colors hover:text-[#2563FF]"
              >
                {label} <ArrowRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function CapabilityMap() {
  const groups = [
    {
      title: "Capture & context",
      icon: <Search size={15} />,
      items: ["Customer records", "Forms & lead capture", "Websites & funnels", "Conversations", "Calls"],
    },
    {
      title: "Work & state",
      icon: <Layers3 size={15} />,
      items: ["Pipelines & opportunities", "Calendars & bookings", "Payments & invoices", "Tasks & ownership", "Customer history"],
    },
    {
      title: "Action & communication",
      icon: <Workflow size={15} />,
      items: ["Workflows", "Email", "SMS", "AI agents", "API & webhooks"],
    },
    {
      title: "Growth & insight",
      icon: <RefreshCw size={15} />,
      items: ["Customer marketing", "Reviews & reputation", "Reactivation", "Segmentation", "Dashboards & reporting"],
    },
  ];

  return (
    <section className="bg-[#EEF2EA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Eyebrow>What sits underneath it</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              One customer context.
              <span className="block text-[#687460]">Different capabilities around it.</span>
            </h2>
          </div>
          <p className="max-w-[650px] text-[14px] leading-[1.75] text-[#687067] sm:text-[15px]">
            Customer records, forms, conversations, bookings, payments, marketing and reporting become more useful when they can work from the same customer context instead of operating as separate islands.
          </p>
        </Reveal>

        <div className="mt-12 grid border-y border-[#D5DED1] md:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => (
            <Reveal
              key={group.title}
              className={
                "border-b border-[#D5DED1] p-6 md:border-r lg:border-b-0 sm:p-7 " +
                (index === 1 ? "md:border-r-0 lg:border-r" : "") +
                (index === 3 ? " border-b-0 md:border-r-0" : "")
              }
              delay={index * 0.04}
            >
              <div className="flex items-center gap-2.5 text-[#5F6D58]">
                {group.icon}
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em]">{group.title}</h3>
              </div>
              <div className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[12px] font-medium text-[#3F4740]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
                    {item}
                  </div>
                ))}
              </div>
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
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <Reveal className="max-w-[590px]">
          <Eyebrow>Shared customer context</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            The system works better
            <span className="block text-[#717770]">when the whole team can use it.</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.75] text-[#686E68] sm:text-[16px]">
            Reception should not see one version of a customer while sales, marketing and operations work from another. Unlimited users removes the seat-count decision from who gets access to the shared history.
          </p>
          <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-[#686E68] sm:text-[16px]">
            Unlimited stored contacts* means past leads and customers can remain part of that history instead of becoming a database you avoid using because it grew.
          </p>
          <div className="mt-6 text-[10px] text-[#8A8E89]">
            *Unlimited stored contacts are subject to fair use. Communications and other usage-based services are separate.
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[34px] bg-[#E7D8C7]" />
            <div className="relative overflow-hidden rounded-[26px] border border-[#D7D9D5] bg-white shadow-[0_28px_80px_rgba(42,47,41,.10)]">
              <div className="flex min-h-[46px] items-center justify-between border-b border-[#E2E5E1] px-4 sm:px-5">
                <ProductBrand section="Shared customer workspace" />
                <span className="hidden text-[8px] font-bold uppercase tracking-[0.12em] text-[#7B837D] sm:inline">
                  Unlimited users
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="rounded-[18px] border border-[#DEE2DE] bg-[#F8F9F6] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#E9DDD2] text-[12px] font-semibold text-[#514942]">
                        MT
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold">Mia Thompson</div>
                        <div className="mt-0.5 text-[9px] text-[#858C87]">Booked · Thursday 10:30am</div>
                      </div>
                    </div>
                    <div className="rounded-full bg-[#E4EBDD] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.11em] text-[#607058]">
                      Same history
                    </div>
                  </div>

                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {[
                      ["Reception", "Booking confirmed"],
                      ["Sales", "Quote and opportunity visible"],
                      ["Operations", "Service context ready"],
                      ["Accounts", "Payment status visible"],
                    ].map(([role, state]) => (
                      <div key={role} className="rounded-[13px] border border-[#E1E4E0] bg-white px-4 py-3">
                        <div className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#7E8780]">{role}</div>
                        <div className="mt-1.5 text-[10px] font-semibold text-[#3D4540]">{state}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#8A918C]">
                    Who can work from the same customer system
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full border border-[#DDE1DD] bg-white px-3 py-2 text-[9px] font-semibold text-[#5F6762]"
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
    <section className="bg-[#F5F1E9] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <Eyebrow>Consolidate where it helps</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            You do not need to replace everything
            <span className="block text-[#746F67]">to connect the customer journey.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[790px] text-[15px] leading-[1.75] text-[#6C6964] sm:text-[16px]">
            Consolidate the customer-facing work Zapla already covers. Where another system still belongs, supported connections can keep it part of the flow instead of forcing a rip-and-replace project.
          </p>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[28px] border border-[#DDD4C8] bg-white lg:grid-cols-2">
          <Reveal className="border-b border-[#DDD4C8] p-7 sm:p-9 lg:border-b-0 lg:border-r" delay={0.03}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E2E9DC] text-[#627258]">
                <Layers3 size={17} />
              </span>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#66725E]">Bring together</div>
            </div>
            <h3
              className="mt-6 text-[34px] font-medium leading-[1] tracking-[-0.045em] sm:text-[42px]"
              style={{ fontFamily: DISPLAY }}
            >
              Move the customer work that benefits from shared context.
            </h3>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["CRM & customer records", "Inbox & conversations", "Pipelines & bookings", "Marketing & follow-through", "Forms & lead capture", "Payments & invoices"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 border-t border-[#E4E0DA] pt-3 text-[11px] font-semibold text-[#525954]">
                  <Check size={13} className="text-[#6E815F]" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="bg-[#F9F7F2] p-7 sm:p-9" delay={0.07}>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#E6ECF9] text-[#4D69A7]">
                <Workflow size={17} />
              </span>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#63749A]">Keep and connect</div>
            </div>
            <h3
              className="mt-6 text-[34px] font-medium leading-[1] tracking-[-0.045em] sm:text-[42px]"
              style={{ fontFamily: DISPLAY }}
            >
              Keep specialist systems where they still make sense.
            </h3>
            <p className="mt-5 max-w-[530px] text-[13px] leading-[1.75] text-[#6E716D] sm:text-[14px]">
              Keep the specialist systems that still earn their place. Zapla can connect to supported tools and channels so the customer journey does not have to restart every time the work crosses systems.
            </p>
            <div className="mt-7 rounded-[17px] border border-[#DDDCD7] bg-white p-4">
              <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7C837E]">Guided Launch</div>
              <div className="mt-2 text-[12px] font-semibold text-[#363D39]">
                We map what moves into Zapla, what connects to it and what should happen automatically.
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-6 text-center text-[10px] leading-[1.6] text-[#88837C]">
          Connection options depend on the systems, channels and account setup being used.
        </Reveal>
      </div>
    </section>
  );
}

function GoDeeper() {
  const platformLinks = [
    {
      title: "CRM",
      copy: "Work from the customer record, conversations, pipeline and shared history.",
      href: "/crm",
      icon: <UserRound size={17} />,
    },
    {
      title: "Customer Marketing",
      copy: "Use customer data to reach relevant groups and keep replies attached to the same customer.",
      href: "/customer-marketing",
      icon: <Send size={17} />,
    },
    {
      title: "AI Receptionist",
      copy: "Handle calls, qualification, booking and hand-off while keeping the next step connected.",
      href: "/ai-receptionist",
      icon: <Phone size={17} />,
    },
    {
      title: "Reviews & Reputation",
      copy: "Carry the customer story through to the review moment after the work is done.",
      href: "/reviews",
      icon: <Sparkles size={17} />,
    },
  ];

  const solutionLinks = [
    {
      title: "Follow-Up",
      copy: "Keep enquiries, quotes and other expected next steps moving.",
      href: "/follow-up",
    },
    {
      title: "Reopen",
      copy: "Restart dormant customer conversations without losing the history that came before.",
      href: "/reactivation",
    },
  ];

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>Go deeper</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            Start with the part of Zapla
            <span className="block text-[#717770]">you need to understand next.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.28fr_0.72fr]">
          <Reveal>
            <div className="rounded-[27px] border border-[#DCDDD8] bg-white p-6 sm:p-8">
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#64715E]">
                Explore the platform
              </div>
              <div className="mt-5 border-y border-[#E2E3DF]">
                {platformLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group grid gap-3 border-b border-[#E2E3DF] py-5 last:border-b-0 sm:grid-cols-[44px_0.6fr_1fr_22px] sm:items-center sm:gap-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#EEF1EB] text-[#61705A]">
                      {item.icon}
                    </span>
                    <span
                      className="text-[23px] font-medium tracking-[-0.035em] text-[#222724]"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {item.title}
                    </span>
                    <span className="text-[11px] leading-[1.65] text-[#737A74]">{item.copy}</span>
                    <ArrowRight size={15} className="text-[#9CA19C] transition-transform group-hover:translate-x-1 group-hover:text-[#2563FF]" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="h-full rounded-[27px] bg-[#1E2B29] p-6 text-white sm:p-8">
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#E7B75E]">
                Solve a specific problem
              </div>
              <div className="mt-5 space-y-4">
                {solutionLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="group block rounded-[18px] border border-white/10 bg-white/[0.055] p-5 transition-colors hover:bg-white/[0.08]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className="text-[28px] font-medium tracking-[-0.04em]"
                        style={{ fontFamily: DISPLAY }}
                      >
                        {item.title}
                      </h3>
                      <ArrowRight size={15} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[#AFC3FF]" />
                    </div>
                    <p className="mt-3 text-[11px] leading-[1.65] text-white/48">{item.copy}</p>
                  </a>
                ))}
              </div>

              <div className="mt-7 border-t border-white/10 pt-6">
                <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-white/35">
                  Other follow-through moments
                </div>
                <p className="mt-2 text-[11px] leading-[1.65] text-white/45">
                  Quote chasing, appointment recovery and repeat & recall can also be mapped around the same customer history.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#FCFCFA] px-5 pb-10 pt-8 sm:px-10 sm:pb-12 lg:px-16">
      <Reveal className="mx-auto max-w-[1080px] text-center">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>

        <div className="mt-5">
          <Eyebrow>One customer system</Eyebrow>
        </div>

        <h2
          className="mx-auto mt-3 max-w-[980px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[56px] lg:text-[66px]"
          style={{ fontFamily: DISPLAY }}
        >
          Stop rebuilding the customer story
          <span className="block text-[#2563FF]">every time the work moves.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
          We’ll map the customer journey, the systems around it and the places where shared context can remove manual follow-through.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton />
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#E2DBD1] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#CFC6BA] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
