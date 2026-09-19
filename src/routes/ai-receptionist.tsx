import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Database,
  GitBranch,
  Hammer,
  Headphones,
  Home,
  MessageSquare,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Wrench,
} from "lucide-react";

export const Route = createFileRoute("/ai-receptionist")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "AI Receptionist for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla AI Receptionist answers incoming calls, captures what callers need, books or routes the next step, and keeps follow-up connected to your CRM.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AIReceptionistPageV1,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const COLORS = {
  paper: "#F7F4EE",
  paper2: "#F6F0E8",
  ink: "#111318",
  muted: "#686D69",
  line: "#DDD5CA",
  dark: "#111214",
  green: "#1E2B29",
  coral: "#E97D62",
  rose: "#C96C85",
  amber: "#DDA34B",
  sage: "#99A36D",
  plum: "#9B86B8",
  apricot: "#D58C75",
} as const;

const FLOW_STEPS = [
  {
    label: "Understood",
    detail: "Service enquiry captured",
    icon: <UserRound size={15} />,
    accent: COLORS.coral,
  },
  {
    label: "Next step",
    detail: "Tuesday 10:30 booked",
    icon: <Calendar size={15} />,
    accent: COLORS.amber,
  },
  {
    label: "Customer",
    detail: "Confirmation sent",
    icon: <MessageSquare size={15} />,
    accent: COLORS.sage,
  },
  {
    label: "Zapla",
    detail: "Contact and pipeline updated",
    icon: <Database size={15} />,
    accent: COLORS.plum,
  },
] as const;

const WORKFLOW_STEPS = [
  {
    n: "01",
    title: "Answer",
    copy: "Greets the caller using the call handling rules you have agreed with us.",
    accent: COLORS.coral,
  },
  {
    n: "02",
    title: "Understand",
    copy: "Captures why they called and the information your team actually needs.",
    accent: COLORS.amber,
  },
  {
    n: "03",
    title: "Act",
    copy: "Books, routes, transfers or takes the next agreed action where configured.",
    accent: COLORS.sage,
  },
  {
    n: "04",
    title: "Record",
    copy: "Keeps the call outcome with the customer context inside Zapla.",
    accent: COLORS.plum,
  },
  {
    n: "05",
    title: "Follow through",
    copy: "Triggers the message, task, pipeline update or next step you have configured.",
    accent: COLORS.rose,
  },
] as const;

const SCENARIOS = [
  {
    key: "mechanic",
    label: "Mechanic",
    icon: <Wrench size={16} />,
    image: "/concept/cinematic-v5/mechanic.jpg",
    caller: "I need a service next week. Do you have anything Tuesday morning?",
    action: "Capture the service request and offer the booking options you have approved.",
    outcome: "Appointment confirmed, customer details saved, follow-up ready.",
  },
  {
    key: "trades",
    label: "Trades",
    icon: <Hammer size={16} />,
    image: "/concept/cinematic-v5/construction.jpg",
    caller: "My hot water has stopped. Can someone come out today?",
    action: "Capture the job, location and urgency, then follow your routing rules.",
    outcome: "Clean job summary sent to the right person with the customer context attached.",
  },
  {
    key: "clinic",
    label: "Clinic",
    icon: <Stethoscope size={16} />,
    image: "/concept/cinematic-v5/physio.jpg",
    caller: "Are you taking new patients, and what appointment times do you have?",
    action: "Answer approved practice information and handle the agreed booking or handoff flow.",
    outcome: "The enquiry is captured without asking clinical questions the workflow does not need.",
  },
  {
    key: "property",
    label: "Property",
    icon: <Home size={16} />,
    image: "/concept/cinematic-v5/real-estate.jpg",
    caller: "I am thinking about selling and would like to arrange an appraisal.",
    action: "Capture the enquiry, property details and preferred next step.",
    outcome: "The lead enters Zapla with a clear next action instead of becoming a voicemail.",
  },
] as const;

const FAQS = [
  {
    q: "Can I keep my existing business number?",
    a: "Usually, yes. Setup can use call forwarding from your existing number or a new business number, depending on the call flow you want. We confirm the right configuration before launch.",
  },
  {
    q: "Can the AI Receptionist book appointments?",
    a: "Yes, where the booking flow and calendar are configured for it. The exact actions are agreed during setup rather than assumed.",
  },
  {
    q: "Can it transfer a caller to my team?",
    a: "Yes, where call routing or transfer is configured. You decide which calls the AI should handle and which should be handed to a person.",
  },
  {
    q: "What happens when it does not know the answer?",
    a: "The safer job is to follow the rules you have approved, not improvise. Depending on your setup, it can take a clean message, collect the required details or hand the call over.",
  },
  {
    q: "Where does the information from the call go?",
    a: "The agreed call outcome and customer details can be kept with the contact in Zapla and used to trigger the next configured step, such as a message, task, booking or pipeline update.",
  },
  {
    q: "How much does it cost?",
    a: "AI Receptionist is A$199 per month plus GST as an add-on to an active Zapla plan. It includes 200 Voice AI minutes. Setup starts from A$997 plus GST, and additional Voice AI usage is A$0.90 plus GST per minute.",
  },
] as const;

function AIReceptionistPageV1() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <BusyMoment />
      <HowItWorks />
      <ConnectedSection />
      <ControlSection />
      <ScenarioSwitcher />
      <GuidedSetup />
      <PricingStrip />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
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
      transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={"text-[10px] font-semibold uppercase tracking-[0.22em] " + (light ? "text-[#DDA34B]" : "text-[#C96F55]")}
    >
      {children}
    </p>
  );
}

function Hero() {
  return (
    <section className="bg-[#F6F0E8] px-5 pb-14 pt-[104px] sm:px-10 sm:pb-20 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[128px]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
        <Reveal className="max-w-[660px]">
          <Eyebrow>AI Receptionist</Eyebrow>
          <h1
            className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            An AI receptionist
            <span className="block">that follows through.</span>
          </h1>
          <p className="mt-6 max-w-[610px] text-[16px] leading-[1.68] text-[#686D69] sm:text-[18px]">
            Zapla answers incoming calls, captures what the caller needs, books or routes the next step, and keeps the conversation connected to your CRM and follow-up.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#how-it-works"
              className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[11px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#253633]"
            >
              See a call handled <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center justify-center rounded-[11px] border border-[#CFC6BA] bg-[#FBFAF7] px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:bg-white"
            >
              View pricing
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#565B56] sm:text-[12px]">
            {["Answers incoming calls", "Books or routes", "Connected to Zapla"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <SmallTick />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <HeroCallFlow />
        </Reveal>
      </div>
    </section>
  );
}

function SmallTick({ light = false }: { light?: boolean }) {
  return (
    <span
      className={
        "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full " +
        (light ? "bg-white/10 text-[#F7F4EE]" : "bg-[#99A36D]/20 text-[#69735D]")
      }
    >
      <Check size={11} strokeWidth={2.6} />
    </span>
  );
}

function HeroCallFlow() {
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(reduced ? FLOW_STEPS.length - 1 : 0);

  useEffect(() => {
    if (reduced) {
      setActive(FLOW_STEPS.length - 1);
      return;
    }

    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % FLOW_STEPS.length);
    }, 1550);

    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative mx-auto max-w-[720px]">
      <div className="absolute -left-6 top-12 hidden h-24 w-24 rounded-full bg-[#E97D62]/10 lg:block" aria-hidden="true" />
      <div className="absolute -right-4 bottom-10 hidden h-20 w-20 rounded-full bg-[#9B86B8]/10 lg:block" aria-hidden="true" />

      <div className="relative overflow-hidden rounded-[26px] border border-[#D8CFC3] bg-[#FBFAF7] p-4 shadow-[0_24px_70px_rgba(60,47,34,.10)] sm:p-5">
        <div className="flex items-center justify-between border-b border-[#E7E0D6] pb-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A6759]">Example call</div>
            <div className="mt-1 text-[13px] font-semibold text-[#111318]">AI Receptionist</div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF0E2] px-3 py-1.5 text-[10px] font-semibold text-[#65705B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
            Call in progress
          </span>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[20px] border border-[#E2D9CE] bg-[#F6F0E8] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E2B29] text-[#F7F4EE]">
                <Phone size={18} />
              </span>
              <div>
                <div className="text-[12px] font-semibold">New enquiry</div>
                <div className="mt-0.5 text-[10px] text-[#7B766F]">Incoming call</div>
              </div>
            </div>

            <div className="mt-5 flex h-[62px] items-center gap-[5px] rounded-[14px] border border-[#E2D9CE] bg-[#FBFAF7] px-4" aria-hidden="true">
              {[14, 23, 18, 32, 25, 40, 20, 34, 17, 28, 21, 35, 16, 25, 14].map((height, index) => (
                <motion.span
                  key={index}
                  className="w-[3px] rounded-full bg-[#D58C75]"
                  animate={reduced ? { height: height * 0.75 } : { height: [height * 0.52, height, height * 0.66] }}
                  transition={{
                    duration: 1.05,
                    repeat: reduced ? 0 : Infinity,
                    delay: index * 0.045,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="mt-4 rounded-[14px] bg-white px-4 py-3 text-[12px] leading-[1.55] text-[#4F544F] shadow-[inset_0_0_0_1px_rgba(17,19,24,.06)]">
              “I need a service next week. Do you have anything Tuesday morning?”
            </div>
          </div>

          <div className="rounded-[20px] border border-[#E2D9CE] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-semibold text-[#111318]">What happens next</div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8B8177]">Zapla</span>
            </div>

            <div className="mt-4 space-y-2.5">
              {FLOW_STEPS.map((step, index) => {
                const visible = reduced || index <= active;
                const current = !reduced && index === active;

                return (
                  <motion.div
                    key={step.label}
                    className="flex min-h-[56px] items-center gap-3 rounded-[14px] border px-3.5 py-3"
                    animate={{
                      opacity: visible ? 1 : 0.38,
                      y: current ? -1 : 0,
                      borderColor: visible ? step.accent + "66" : "#E7E0D6",
                      backgroundColor: visible ? step.accent + "0D" : "#FBFAF7",
                    }}
                    transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                      style={{ backgroundColor: step.accent + "20", color: step.accent }}
                    >
                      {step.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.11em] text-[#8A8178]">{step.label}</div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#111318] sm:text-[12px]">{step.detail}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-[16px] bg-[#1E2B29] px-4 py-3 text-[#F7F4EE]">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/52">The point</div>
            <div className="mt-1 text-[12px] font-semibold">The call becomes a next step, not another voicemail.</div>
          </div>
          <ArrowRight size={17} className="shrink-0 text-[#DDA34B]" />
        </div>
      </div>
    </div>
  );
}

function BusyMoment() {
  const moments = [
    {
      image: "/concept/cinematic-v5/mechanic.jpg",
      label: "On the job",
      copy: "You cannot stop mid-service every time the phone rings.",
    },
    {
      image: "/concept/cinematic-v5/physio.jpg",
      label: "With a customer",
      copy: "The person in front of you should not lose your attention to the next caller.",
    },
    {
      image: "/concept/cinematic-v5/real-estate.jpg",
      label: "After hours",
      copy: "The enquiry still exists even when your front desk does not.",
    },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[920px]">
          <Eyebrow>The missed moment</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            The phone rings when your hands are full.
          </h2>
          <p className="mt-5 max-w-[740px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
            Being busy is normal. Letting a ready-to-talk customer fall into silence does not have to be.
          </p>
        </Reveal>

        <div className="mt-12 grid border-y border-[#D8CFC3] md:grid-cols-3">
          {moments.map((moment, index) => (
            <Reveal
              key={moment.label}
              delay={index * 0.04}
              className={"py-6 md:py-8 " + (index > 0 ? "border-t border-[#D8CFC3] md:border-l md:border-t-0 md:pl-6" : "") + (index < moments.length - 1 ? " md:pr-6" : "")}
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <img src={moment.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-[#111214]/82 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE]">
                  <Clock size={12} className="text-[#DDA34B]" />
                  {moment.label}
                </div>
              </div>
              <p className="mt-5 max-w-[360px] text-[14px] leading-[1.62] text-[#565B56]">{moment.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F6F0E8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            One call. Five things handled.
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
            The exact workflow is configured around your business. Zapla should not guess what happens next. It should follow the rules you have agreed.
          </p>
        </Reveal>

        <div className="mt-12 border-y border-[#D8CFC3] lg:grid lg:grid-cols-5 lg:divide-x lg:divide-[#D8CFC3]">
          {WORKFLOW_STEPS.map((step, index) => (
            <Reveal
              key={step.n}
              delay={index * 0.035}
              className={"relative py-6 lg:px-5 lg:py-8 " + (index > 0 ? "border-t border-[#D8CFC3] lg:border-t-0" : "")}
            >
              <div className="flex items-start gap-5 lg:block">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tracking-[0.12em]"
                  style={{ backgroundColor: step.accent, color: COLORS.dark }}
                >
                  {step.n}
                </span>
                <div className="min-w-0 lg:mt-6">
                  <h3 className="text-[23px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-[1.62] text-[#686D69]">{step.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectedSection() {
  const connected = [
    { label: "Customer record", icon: <Database size={16} />, accent: COLORS.plum },
    { label: "Booking", icon: <Calendar size={16} />, accent: COLORS.amber },
    { label: "SMS follow-up", icon: <MessageSquare size={16} />, accent: COLORS.sage },
    { label: "Pipeline", icon: <GitBranch size={16} />, accent: COLORS.rose },
  ];

  return (
    <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <Reveal className="max-w-[610px]">
          <Eyebrow light>The Zapla difference</Eyebrow>
          <h2 className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]" style={{ fontFamily: DISPLAY }}>
            The call is only the first step.
          </h2>
          <p className="mt-5 max-w-[570px] text-[15px] leading-[1.68] text-white/58 sm:text-[17px]">
            A standalone answering bot can finish at “message taken”. Zapla can keep the customer context moving into the rest of your follow-through system.
          </p>
          <div className="mt-7 space-y-3 text-[13px] text-white/74">
            {[
              "Keep the caller with the customer record.",
              "Trigger the next message or internal task.",
              "Move a genuine enquiry into the right pipeline stage.",
              "Keep the next person who picks it up from starting blind.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <SmallTick light />
                <span className="pt-[1px] leading-[1.55]">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="rounded-[24px] border border-white/10 bg-[#17181B] p-4 shadow-[0_30px_80px_rgba(0,0,0,.28)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[18px] border border-white/10 bg-[#202125] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#E97D62]/15 text-[#E97D62]">
                    <Phone size={17} />
                  </span>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">Incoming call</div>
                    <div className="mt-1 text-[13px] font-semibold">New service enquiry</div>
                  </div>
                </div>
                <div className="mt-6 rounded-[12px] bg-white/[0.04] px-3.5 py-3 text-[11px] leading-[1.55] text-white/58">
                  Intent understood. Details captured. Next action selected.
                </div>
              </div>

              <div className="flex items-center justify-center px-1 text-[#DDA34B] sm:px-0">
                <ArrowRight size={18} className="rotate-90 sm:rotate-0" />
              </div>

              <div className="grid flex-[1.2] grid-cols-2 gap-2.5">
                {connected.map((item) => (
                  <div key={item.label} className="rounded-[16px] border border-white/9 bg-white/[0.035] p-3.5">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-[9px]"
                      style={{ color: item.accent, backgroundColor: item.accent + "18" }}
                    >
                      {item.icon}
                    </span>
                    <div className="mt-3 text-[11px] font-semibold text-white/84">{item.label}</div>
                    <div className="mt-1 text-[9px] text-white/38">Updated by workflow</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-[16px] border border-[#DDA34B]/18 bg-[#DDA34B]/[0.06] px-4 py-3 text-[11px] leading-[1.55] text-white/64">
              This is the commercial point: the phone call does not become a separate silo that somebody has to manually copy back into the business.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ControlSection() {
  const items = [
    {
      title: "Let it handle the routine",
      copy: "Approved FAQs, simple enquiry capture and agreed booking flows can happen without interrupting your team.",
      icon: <Phone size={17} />,
      accent: COLORS.coral,
    },
    {
      title: "Hand over when a person is needed",
      copy: "Configure which calls should be routed or transferred rather than pretending every conversation belongs with AI.",
      icon: <Headphones size={17} />,
      accent: COLORS.plum,
    },
    {
      title: "Keep the guardrails visible",
      copy: "Decide what it can answer, what information it should collect, and what it should do when the request falls outside the script.",
      icon: <ShieldCheck size={17} />,
      accent: COLORS.sage,
    },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <Eyebrow>Control</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            You decide what it handles.
          </h2>
          <p className="mx-auto mt-5 max-w-[710px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
            The goal is not to make AI sound clever. The goal is to make your call handling predictable enough that customers and staff know what happens next.
          </p>
        </Reveal>

        <div className="mt-12 border-y border-[#D8CFC3] md:grid md:grid-cols-3 md:divide-x md:divide-[#D8CFC3]">
          {items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.04}
              className={"py-7 md:px-7 md:py-9 " + (index > 0 ? "border-t border-[#D8CFC3] md:border-t-0" : "")}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-[11px]"
                style={{ color: item.accent, backgroundColor: item.accent + "18" }}
              >
                {item.icon}
              </span>
              <h3 className="mt-6 text-[24px] font-medium leading-[1.08] tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
                {item.title}
              </h3>
              <p className="mt-3 max-w-[340px] text-[13px] leading-[1.65] text-[#686D69]">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScenarioSwitcher() {
  const [selected, setSelected] = useState(SCENARIOS[0]);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F6F0E8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>Different businesses</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            Same receptionist. Different rules.
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
            A good call flow should sound like your business and take the next action your team actually needs, not force every industry through the same generic script.
          </p>
        </Reveal>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {SCENARIOS.map((scenario) => {
            const active = selected.key === scenario.key;
            return (
              <button
                key={scenario.key}
                type="button"
                onClick={() => setSelected(scenario)}
                className={
                  "inline-flex h-[42px] shrink-0 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors " +
                  (active
                    ? "border-[#1E2B29] bg-[#1E2B29] text-[#F7F4EE]"
                    : "border-[#D8CFC3] bg-[#FBFAF7] text-[#565B56] hover:bg-white")
                }
                aria-pressed={active}
              >
                {scenario.icon}
                {scenario.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={selected.key}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
          className="mt-5 overflow-hidden rounded-[24px] border border-[#D8CFC3] bg-[#FBFAF7]"
        >
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[440px]">
              <img src={selected.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-[#111214]/82 p-5 text-[#F7F4EE] sm:p-6">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#DDA34B]">Example caller</div>
                <blockquote className="mt-2 max-w-[520px] text-[17px] font-medium leading-[1.35] tracking-[-0.02em]" style={{ fontFamily: DISPLAY }}>
                  “{selected.caller}”
                </blockquote>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="grid gap-4">
                <ScenarioRow
                  label="AI Receptionist"
                  title="Understands what the caller needs"
                  copy={selected.action}
                  accent={COLORS.coral}
                />
                <ScenarioRow
                  label="Zapla"
                  title="Keeps the next step moving"
                  copy={selected.outcome}
                  accent={COLORS.sage}
                />
              </div>
              <p className="mt-6 text-[10px] leading-[1.55] text-[#817A72]">
                Illustrative workflow. Exact questions, actions, bookings, transfers and follow-up depend on the configuration agreed for your business.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScenarioRow({
  label,
  title,
  copy,
  accent,
}: {
  label: string;
  title: string;
  copy: string;
  accent: string;
}) {
  return (
    <div className="rounded-[18px] border border-[#E0D8CE] bg-white p-5">
      <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#817A72]">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
        {label}
      </div>
      <h3 className="mt-3 text-[23px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
        {title}
      </h3>
      <p className="mt-2.5 text-[13px] leading-[1.62] text-[#686D69]">{copy}</p>
    </div>
  );
}

function GuidedSetup() {
  const steps = [
    {
      n: "01",
      title: "Map the calls",
      copy: "Identify your common call types, what information matters and what should happen next.",
    },
    {
      n: "02",
      title: "Build the rules",
      copy: "Configure the approved knowledge, questions, bookings, routing and follow-up actions.",
    },
    {
      n: "03",
      title: "Test the awkward stuff",
      copy: "Run realistic scenarios, handoffs and out-of-scope requests before customers reach it.",
    },
    {
      n: "04",
      title: "Go live",
      copy: "Connect the agreed number or forwarding setup, launch the flow and refine it from real conversations.",
    },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="max-w-[590px]">
            <Eyebrow>Guided setup</Eyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
              We do not hand you a blank bot.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
              The useful part is not access to voice AI. It is turning your real call handling into a working system that your team can trust.
            </p>
            <div className="mt-8 border-l-2 border-[#D58C75] pl-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9A6759]">Setup from</div>
              <div className="mt-2 text-[28px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>A$997 + GST</div>
              <div className="mt-2 text-[12px] leading-[1.55] text-[#686D69]">Final scope is confirmed before work starts.</div>
            </div>
          </Reveal>

          <div className="border-y border-[#D8CFC3]">
            {steps.map((step, index) => (
              <Reveal
                key={step.n}
                delay={index * 0.035}
                className={"grid gap-4 py-6 sm:grid-cols-[70px_180px_1fr] sm:items-start sm:gap-5 sm:py-7 " + (index > 0 ? "border-t border-[#D8CFC3]" : "")}
              >
                <div className="text-[10px] font-bold tracking-[0.16em] text-[#C96F55]">{step.n}</div>
                <h3 className="text-[22px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{step.title}</h3>
                <p className="max-w-[470px] text-[13px] leading-[1.62] text-[#686D69]">{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingStrip() {
  return (
    <section className="bg-[#EFE2D2] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="mt-4 max-w-[760px] text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[50px]" style={{ fontFamily: DISPLAY }}>
                Simple add-on. Transparent usage.
              </h2>
              <p className="mt-4 max-w-[700px] text-[14px] leading-[1.62] text-[#686D69] sm:text-[16px]">
                Add AI Receptionist to an active Zapla plan. The monthly fee includes 200 Voice AI minutes, with additional usage billed separately.
              </p>

              <div className="mt-7 grid max-w-[820px] gap-3 sm:grid-cols-3">
                <PriceFact label="AI Receptionist" value="A$199/mo + GST" />
                <PriceFact label="Included" value="200 Voice AI min" />
                <PriceFact label="Overage" value="A$0.90 + GST/min" />
              </div>
            </div>

            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[11px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-[transform,background-color] hover:-translate-y-px hover:bg-[#253633]"
            >
              View full pricing <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[16px] border border-[#D8C8B7] bg-[#F7F4EE]/75 px-4 py-4">
      <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8A7468]">{label}</div>
      <div className="mt-2 text-[16px] font-semibold tracking-[-0.025em] text-[#111318]">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F6F0E8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1040px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="mt-9 divide-y divide-[#D8CFC3] border-y border-[#D8CFC3]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-semibold tracking-[-0.025em] text-[#111318] sm:text-[18px]" style={{ fontFamily: DISPLAY }}>
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={"shrink-0 text-[#7C756D] transition-transform duration-200 " + (isOpen ? "rotate-180" : "")}
                  />
                </button>
                <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="max-w-[820px] pb-6 text-[14px] leading-[1.68] text-[#686D69] sm:text-[15px]">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto max-w-[980px] text-center">
        <Eyebrow light>Keep the next opportunity moving</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-[900px] text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY }}>
          Your next customer can call while you are busy.
        </h2>
        <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-[1.65] text-white/58 sm:text-[17px]">
          Give the call somewhere useful to go, then keep the next step inside the same customer journey.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[11px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29] transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#F7F4EE]/95 p-3 backdrop-blur md:hidden">
      <a
        href={BOOK_URL}
        className="flex h-[48px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#1E2B29] text-[13px] font-semibold text-[#F7F4EE]"
      >
        Book a Call <ArrowRight size={15} />
      </a>
    </div>
  );
}

export default AIReceptionistPageV1;
