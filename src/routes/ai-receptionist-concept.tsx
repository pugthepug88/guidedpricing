import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Hammer,
  Home,
  MessageSquare,
  Phone,
  PhoneForwarded,
  ShieldCheck,
  Stethoscope,
  UserRound,
  Star,
  RefreshCcw,
} from "lucide-react";

export const Route = createFileRoute("/ai-receptionist-concept")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "AI Receptionist Concept | Zapla" },
      {
        name: "description",
        content:
          "Temporary scroll-led concept for Zapla AI Receptionist.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "preconnect", href: "https://cdn.openart.ai" }],
  }),
  component: AIReceptionistConcept,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_IMAGE =
  "https://cdn.openart.ai/openart-uploads/production/attachment-transfers/befc6b19b694f24013c9255a9b9d14f5044236b772a28709c682c6cc47c7b696.png";
const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Can I keep my existing business number?",
    a: "Usually, yes. We can use call forwarding from your existing number or set up a new business number, depending on the call flow you want.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes. If your booking flow and calendar are connected, Zapla can move suitable callers into the booking step you choose.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. You decide which calls stay with the AI and which should route or transfer to a person.",
  },
  {
    q: "What happens if it does not know the answer?",
    a: "It can collect the right details, take a clean message or hand the call to your team instead of inventing an answer.",
  },
  {
    q: "Where does the information from the call go?",
    a: "The caller, outcome and next step can stay with the contact in Zapla and trigger the configured booking, task, message or pipeline action.",
  },
] as const;

function AIReceptionistConcept() {
  return (
    <main className="min-h-screen bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <StickyCallStory />
      <IndustryExamples />
      <ConnectedJourney />
      <SetupControlPricing />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = !!useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={"text-[10px] font-semibold uppercase tracking-[0.2em] " + (light ? "text-[#DDA34B]" : "text-[#C96F55]")}>
      {children}
    </p>
  );
}

function PetalMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="block overflow-visible">
      {PETAL_COLORS.map((color, index) => (
        <g key={color} transform={`rotate(${index * 60} 80 80)`}>
          <path
            d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
            fill={color}
            stroke={color}
            strokeWidth="1.4"
          />
        </g>
      ))}
      <circle cx="80" cy="80" r="14" fill="#111214" stroke="rgba(255,255,255,.08)" />
    </svg>
  );
}

function ZaplaPetalSpeaker({ size = 26, reduced = false }: { size?: number; reduced?: boolean }) {
  return (
    <span className="relative flex shrink-0 items-center justify-center" style={{ width: size + 8, height: size + 8 }} aria-label="Zapla">
      <motion.span
        className="absolute inset-0 rounded-full border border-[#D58C75]/25"
        animate={reduced ? undefined : { scale: [0.72, 1.35], opacity: [0.28, 0] }}
        transition={reduced ? undefined : { duration: 1.45, repeat: Infinity, ease: "easeOut" }}
        aria-hidden="true"
      />
      <motion.span
        className="relative block"
        animate={reduced ? undefined : { scale: [1, 1.055, 0.985, 1] }}
        transition={reduced ? undefined : { duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width={size} height={size} viewBox="0 0 160 160" aria-hidden="true" className="block overflow-visible">
          {PETAL_COLORS.map((color, index) => (
            <g key={color} transform={`rotate(${index * 60} 80 80)`}>
              <path
                d="M80 14 C95 14 104 25 102 42 C100 58 92 70 80 82 C68 70 60 58 58 42 C56 25 65 14 80 14 Z"
                fill={color}
                stroke={color}
                strokeWidth="1.4"
              />
            </g>
          ))}
          <circle cx="80" cy="80" r="14" fill="#111214" stroke="rgba(255,255,255,.08)" />
        </svg>
      </motion.span>
    </span>
  );
}

function TeamAvatar({ size, cell, className = "" }: { size: number; cell: number; className?: string }) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className={`block shrink-0 overflow-hidden rounded-full border-2 border-[#1E2B29] shadow-[0_8px_24px_rgba(0,0,0,.24)] ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
      aria-hidden="true"
    />
  );
}

function Hero() {
  const capabilities = [
    [<MessageSquare size={16} />, "Answer questions"],
    [<Calendar size={16} />, "Book appointments"],
    [<UserRound size={16} />, "Capture details"],
    [<PhoneForwarded size={16} />, "Hand off calls"],
  ] as const;

  return (
    <section className="bg-[#F7F2EB] px-5 pb-14 pt-[108px] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-20 lg:pt-[132px]">
      <div className="mx-auto max-w-[1420px]">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <Reveal className="max-w-[620px]">
            <Eyebrow>AI Receptionist</Eyebrow>
            <h1
              className="mt-4 text-[50px] font-medium leading-[0.93] tracking-[-0.06em] sm:text-[66px] lg:text-[80px]"
              style={{ fontFamily: DISPLAY }}
            >
              Your phone rings.
              <span className="block">Zapla picks up.</span>
              <span className="block text-[#C96F55]">You keep working.</span>
            </h1>

            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.68] text-[#5F655F] sm:text-[18px]">
              Answer questions, book appointments, capture details and hand off the calls that need a person.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={BOOK_URL}
                className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
              >
                Book a Call <ArrowRight size={15} />
              </a>
              <a
                href={PRICING_URL}
                className="inline-flex h-[50px] items-center rounded-full border border-[#CEC7BD] bg-white/70 px-6 text-[13px] font-semibold text-[#111318]"
              >
                View pricing
              </a>
            </div>

            <div className="mt-8 text-[12px] font-semibold text-[#59615A]">
              A$199/mo + GST · 200 Voice AI minutes included
            </div>
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] bg-[#111214] shadow-[0_30px_80px_rgba(50,42,34,.15)]">
              <img
                src={HERO_IMAGE}
                alt="Physiotherapist treating a patient while Zapla handles an incoming call"
                width={1448}
                height={1086}
                loading="eager"
                fetchPriority="high"
                className="h-[520px] w-full object-cover object-center lg:h-[610px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 max-w-[420px] rounded-[18px] border border-white/55 bg-[#F7F4EE]/78 p-4 shadow-[0_16px_40px_rgba(0,0,0,.16)] backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2B29] text-white">
                      <Phone size={13} />
                    </span>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#746F68]">Live call</div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#313632]">New customer enquiry</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-semibold text-[#69735D]">00:42</span>
                </div>
                <div className="mt-4 text-[15px] font-medium tracking-[-0.02em] text-[#222522]" style={{ fontFamily: DISPLAY }}>
                  “Do you have anything Tuesday morning?”
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-[13px] bg-[#1E2B29] px-3.5 py-3 text-[12px] font-semibold text-white">
                  <span>10:30 is available. Want me to book it?</span>
                  <PetalMark size={28} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 border-y border-[#D7D1C8]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map(([icon, label], index) => (
              <div
                key={label}
                className={"flex items-center gap-3 py-5 text-[13px] font-semibold text-[#3A403B] " + (index ? "lg:border-l lg:border-[#D7D1C8] lg:pl-7" : "")}
              >
                <span className="text-[#1E2B29]">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StickyCallStory() {
  const reduced = !!useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      kicker: "Incoming call",
      title: "The call comes in.",
      copy: "Zapla answers the enquiry while your team keeps working.",
    },
    {
      kicker: "Booking",
      title: "The appointment is booked.",
      copy: "Suitable callers can move straight into the booking flow you have already set.",
    },
    {
      kicker: "Customer record",
      title: "The customer is already in Zapla.",
      copy: "Details, call outcome and notes stay with the contact instead of disappearing into voicemail.",
    },
    {
      kicker: "Follow-up",
      title: "The next step is already moving.",
      copy: "Confirmation and the configured follow-up can happen without somebody restarting the work.",
    },
  ] as const;

  return (
    <section className="relative bg-[#111214] text-[#F7F4EE]">
      <div className="mx-auto max-w-[1420px] px-5 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="py-20 sm:py-24 lg:py-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                onViewportEnter={() => setActiveStep(index)}
                viewport={{ amount: 0.62 }}
                className="flex min-h-[54vh] items-center border-b border-white/[0.06] last:border-b-0 lg:min-h-[70vh]"
              >
                <div className="max-w-[500px]">
                  {index === 0 && <Eyebrow light>The Zapla difference</Eyebrow>}
                  <div className={"text-[10px] font-semibold uppercase tracking-[0.18em] " + (index === 0 ? "mt-7 text-white/34" : "text-[#DDA34B]")}>
                    {step.kicker}
                  </div>
                  <h2
                    className={"mt-3 font-medium leading-[0.96] tracking-[-0.055em] " + (index === 0 ? "text-[42px] sm:text-[54px] lg:text-[62px]" : "text-[36px] sm:text-[46px] lg:text-[54px]")}
                    style={{ fontFamily: DISPLAY }}
                  >
                    {index === 3 ? (
                      <>
                        The next step is
                        <span className="block text-[#DDA34B]">already moving.</span>
                      </>
                    ) : (
                      step.title
                    )}
                  </h2>
                  <p className="mt-5 max-w-[460px] text-[15px] leading-[1.7] text-white/54 sm:text-[16px]">
                    {step.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-[92px] flex h-[calc(100vh-92px)] items-center">
              <div className="relative min-h-[560px] w-full overflow-hidden rounded-[30px] border border-white/[0.08] bg-[radial-gradient(circle_at_50%_48%,rgba(221,163,75,.075),transparent_27%),linear-gradient(145deg,#151619_0%,#101113_58%,#171517_100%)]">
                <div className="absolute left-[6%] top-1/2 w-[31%] -translate-y-1/2 rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-6 shadow-[0_20px_50px_rgba(0,0,0,.24)]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E97D62]/12 text-[#E97D62]">
                        <Phone size={16} />
                      </span>
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/34">Live call</div>
                        <div className="mt-1 text-[12px] font-semibold text-white/82">New customer enquiry</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold text-[#B8C28A]">00:42</span>
                  </div>

                  <div className="mt-8 flex h-[62px] items-center justify-center gap-[6px]">
                    {[14,20,30,42,56,70,56,42,30,20,14].map((height, index) => (
                      <motion.span
                        key={index}
                        className="w-[4px] rounded-full"
                        style={{
                          backgroundColor:
                            index === 5 ? "#E97D62" : index === 4 || index === 6 ? "rgba(233,125,98,.62)" : "rgba(255,255,255,.28)",
                        }}
                        animate={reduced ? { height: height * 0.7 } : { height: [height * 0.6, height, height * 0.72] }}
                        transition={reduced ? undefined : { duration: 1.25, repeat: Infinity, repeatType: "mirror", delay: Math.abs(index - 5) * 0.055 }}
                      />
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/[0.08] pt-5">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">Caller</div>
                    <div className="mt-2 text-[21px] font-medium leading-[1.3] tracking-[-0.03em] text-white/92" style={{ fontFamily: DISPLAY }}>
                      “Do you have anything Tuesday morning?”
                    </div>
                  </div>
                </div>

                <div className="absolute left-[46.5%] top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDA34B]/12"
                    animate={reduced ? undefined : { scale: [0.86, 1.15], opacity: [0.32, 0] }}
                    transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <div className="relative flex flex-col items-center">
                    <ZaplaPetalSpeaker size={116} reduced={reduced} />
                    <div className="mt-3 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/32">Zapla</div>
                  </div>
                </div>

                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M370 280 L405 280" stroke="rgba(221,163,75,.45)" strokeWidth="1.5" />
                  <motion.path
                    d="M525 260 C610 260 610 120 690 120"
                    stroke="rgba(221,163,75,.50)"
                    strokeWidth="1.6"
                    initial={false}
                    animate={{ opacity: activeStep >= 1 ? 1 : 0.18 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.path
                    d="M525 280 L690 280"
                    stroke="rgba(153,163,109,.50)"
                    strokeWidth="1.6"
                    initial={false}
                    animate={{ opacity: activeStep >= 2 ? 1 : 0.18 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.path
                    d="M525 300 C610 300 610 440 690 440"
                    stroke="rgba(201,108,133,.50)"
                    strokeWidth="1.6"
                    initial={false}
                    animate={{ opacity: activeStep >= 3 ? 1 : 0.18 }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>

                <motion.div
                  className="absolute right-[6%] top-[14%] w-[31%] rounded-[18px] border border-[#DDA34B]/18 bg-[#171719]/94 p-4"
                  animate={{ opacity: activeStep >= 1 ? 1 : 0.28, y: activeStep >= 1 ? 0 : 6 }}
                  transition={{ duration: 0.32 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#DDA34B]/12 text-[#DDA34B]">
                      <Calendar size={16} />
                    </span>
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">Appointment</div>
                      <div className="mt-1 text-[15px] font-semibold text-white/90">Tuesday · 10:30am</div>
                    </div>
                    <span className="ml-auto rounded-full bg-[#99A36D]/10 px-2 py-1 text-[8px] font-semibold uppercase text-[#B8C28A]">Booked</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute right-[4%] top-1/2 w-[34%] -translate-y-1/2 rounded-[20px] border border-white/[0.09] bg-[#161719]/95 p-4"
                  animate={{ opacity: activeStep >= 2 ? 1 : 0.28, x: activeStep >= 2 ? 0 : 8 }}
                  transition={{ duration: 0.32 }}
                >
                  <div className="flex items-center gap-3">
                    <TeamAvatar size={38} cell={0} className="border-white/10" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">Customer record</div>
                      <div className="mt-1 text-[14px] font-semibold text-white/90">New customer added</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#B8C28A]">
                      <Check size={10} strokeWidth={2.4} /> Notes saved
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-[12%] right-[6%] w-[31%] rounded-[18px] border border-[#C96C85]/16 bg-[#181619]/95 p-4"
                  animate={{ opacity: activeStep >= 3 ? 1 : 0.28, y: activeStep >= 3 ? 0 : -6 }}
                  transition={{ duration: 0.32 }}
                >
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D69AAF]">
                    <MessageSquare size={13} /> Confirmation sent
                  </div>
                  <div className="mt-3 rounded-[12px] rounded-tr-[4px] bg-[#F7F4EE] px-3 py-2.5 text-[11px] font-medium text-[#343834]">
                    You’re booked for Tuesday at 10:30am.
                  </div>
                </motion.div>

                <div className="absolute bottom-6 left-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/22">
                  Scroll to follow the call
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-16 lg:hidden">
          <div className="border-y border-white/[0.08] py-6 text-[13px] leading-[1.7] text-white/56">
            Answer → book → customer record → confirmation → follow-up.
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustryExamples() {
  const examples = [
    {
      key: "allied-health",
      label: "Allied health",
      icon: <Stethoscope size={16} />,
      caller: "Are you taking new patients, and do you have anything after 5?",
      reply: "I can help with your booking options and practice information. What day works best for you?",
      outcome: ["Enquiry captured", "Booking path started", "Handoff available"],
      accent: "#99A36D",
    },
    {
      key: "trades",
      label: "Trades",
      icon: <Hammer size={16} />,
      caller: "My hot water has stopped. Can someone come out today?",
      reply: "I can take the details and check the urgent-job flow. What suburb are you in?",
      outcome: ["Urgency captured", "Job routed", "Customer details attached"],
      accent: "#DDA34B",
    },
    {
      key: "real-estate",
      label: "Real estate",
      icon: <Home size={16} />,
      caller: "I’m thinking of selling and would like to organise an appraisal.",
      reply: "Absolutely. I can take the property details and arrange the next step with the team.",
      outcome: ["Seller lead created", "Property details saved", "Follow-up task triggered"],
      accent: "#E97D62",
    },
    {
      key: "professional-services",
      label: "Professional services",
      icon: <Briefcase size={16} />,
      caller: "I’m not sure which service I need. Can someone talk me through it?",
      reply: "I can take a few details, identify the right enquiry path and arrange the next step with the team.",
      outcome: ["Need captured", "Enquiry routed", "Next step recorded"],
      accent: "#9B86B8",
    },
  ] as const;

  const reduced = !!useReducedMotion();
  const [selectedKey, setSelectedKey] = useState(examples[0].key);
  const selected = examples.find((example) => example.key === selectedKey) ?? examples[0];

  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Built around your business</Eyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
              Same AI. Different job.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => {
              const active = selected.key === example.key;
              return (
                <button
                  key={example.key}
                  type="button"
                  onClick={() => setSelectedKey(example.key)}
                  aria-pressed={active}
                  className="inline-flex h-[42px] items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors"
                  style={
                    active
                      ? { borderColor: example.accent, backgroundColor: example.accent + "18", color: "#111318" }
                      : { borderColor: "#DDE1DB", backgroundColor: "#FAFAF8", color: "#555C56" }
                  }
                >
                  {example.icon}
                  {example.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          key={selected.key}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
          className="mt-8 grid border-y border-[#E2E5E1] py-9 lg:grid-cols-[1.05fr_.95fr] lg:gap-16"
        >
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A8178]">Caller</div>
            <div className="mt-3 max-w-[610px] text-[28px] font-medium leading-[1.24] tracking-[-0.04em] text-[#111318]" style={{ fontFamily: DISPLAY }}>
              “{selected.caller}”
            </div>
            <div className="mt-8 text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: selected.accent }}>Zapla</div>
            <div className="mt-3 max-w-[610px] text-[21px] font-medium leading-[1.4] tracking-[-0.025em] text-[#343A35]" style={{ fontFamily: DISPLAY }}>
              “{selected.reply}”
            </div>
          </div>

          <div className="mt-8 border-t border-[#E7E9E5] pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A8178]">What happens next</div>
            <div className="mt-5 space-y-4">
              {selected.outcome.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-[#E7E9E5] pb-4">
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-[#A3A8A2]">0{index + 1}</span>
                  <span className="text-[14px] font-semibold text-[#343A35]">{item}</span>
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full" style={{ color: selected.accent, backgroundColor: selected.accent + "18" }}>
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ConnectedJourney() {
  const nodes = [
    { label: "Call", icon: <Phone size={17} />, accent: "#E97D62", href: null },
    { label: "Customer record", icon: <UserRound size={17} />, accent: "#99A36D", href: "/crm" },
    { label: "Follow-up", icon: <MessageSquare size={17} />, accent: "#DDA34B", href: "/follow-up" },
    { label: "Booking", icon: <Calendar size={17} />, accent: "#9B86B8", href: null },
    { label: "Review", icon: <Star size={17} />, accent: "#C96C85", href: "/reviews" },
    { label: "Repeat customer", icon: <RefreshCcw size={17} />, accent: "#788565", href: "/reactivation" },
  ] as const;

  return (
    <section className="overflow-hidden bg-[#F7F2EB] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <h2
            className="text-[44px] font-medium leading-[0.95] tracking-[-0.058em] text-[#111318] sm:text-[58px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            The receptionist is only
            <span className="block text-[#C96F55]">the front door.</span>
          </h2>
          <p className="mt-6 max-w-[700px] text-[15px] leading-[1.72] text-[#616761] sm:text-[17px]">
            The useful part is what happens after the call. Zapla keeps the customer journey connected instead of handing you another isolated tool.
          </p>
        </Reveal>

        <Reveal className="mt-16 lg:mt-20">
          <div className="relative">
            <div className="pointer-events-none absolute left-[6%] right-[6%] top-[25px] hidden h-px bg-[#D7D1C8] lg:block" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-2">
              {nodes.map((node, index) => {
                const inner = (
                  <motion.div
                    whileHover={node.href ? { y: -4 } : undefined}
                    className="group relative h-full border-t border-[#D7D1C8] pt-6 lg:border-t-0 lg:pt-0"
                  >
                    <div
                      className="relative z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full border-[5px] border-[#F7F2EB] shadow-[0_0_0_1px_rgba(30,43,41,.08)]"
                      style={{ color: node.accent, backgroundColor: node.accent + "18" }}
                    >
                      {node.icon}
                    </div>
                    <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9A958D]">0{index + 1}</div>
                    <div className="mt-2 flex items-center gap-2 text-[17px] font-semibold tracking-[-0.025em] text-[#202420]" style={{ fontFamily: DISPLAY }}>
                      {node.label}
                      {node.href && <ArrowRight size={13} className="opacity-35 transition-transform group-hover:translate-x-1 group-hover:opacity-70" />}
                    </div>
                  </motion.div>
                );
                return node.href ? (
                  <a key={node.label} href={node.href} className="block min-h-[150px]">
                    {inner}
                  </a>
                ) : (
                  <div key={node.label} className="min-h-[150px]">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold text-[#7A807A]">
          <span>CRM</span>
          <span>Follow-up</span>
          <span>Reviews</span>
          <span>Reactivation</span>
          <span className="text-[#C96F55]">One customer journey.</span>
        </div>
      </div>
    </section>
  );
}

function SetupControlPricing() {
  const rules = [
    {
      icon: <MessageSquare size={17} />,
      title: "Handles the routine",
      copy: "Questions, simple enquiries and suitable bookings.",
      accent: "#C96F55",
    },
    {
      icon: <PhoneForwarded size={17} />,
      title: "Hands off when it should",
      copy: "Calls needing judgement or a person move to your team.",
      accent: "#9B86B8",
    },
    {
      icon: <ShieldCheck size={17} />,
      title: "Falls back instead of guessing",
      copy: "Out-of-scope calls can become a message or escalation.",
      accent: "#788565",
    },
  ];

  return (
    <section className="bg-[#EEF2EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Configured for your front desk</Eyebrow>
          <h2 className="mt-4 max-w-[690px] text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            We set it up.
            <span className="block">You decide where it stops.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.7] text-[#606761] sm:text-[17px]">
            We map the common calls, booking rules, handoffs and fallbacks before customers reach it.
          </p>

          <div className="mt-10 border-y border-[#CFD8CF]">
            {rules.map((rule, index) => (
              <div key={rule.title} className={"grid gap-3 py-5 sm:grid-cols-[44px_210px_1fr] sm:items-center sm:gap-5 " + (index ? "border-t border-[#D9E0D9]" : "")}>
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ color: rule.accent, backgroundColor: rule.accent + "18" }}>
                  {rule.icon}
                </span>
                <div className="text-[16px] font-semibold text-[#202420]">{rule.title}</div>
                <div className="text-[12px] leading-[1.6] text-[#697069]">{rule.copy}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-[12px] font-semibold text-[#59615A]">
            Guided setup from A$997 + GST
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-[28px] bg-[#1E2B29] p-7 text-white shadow-[0_24px_70px_rgba(30,43,41,.14)] sm:p-9 lg:p-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">AI Receptionist add-on</div>
            <div className="mt-5 flex items-end gap-2">
              <div className="text-[64px] font-medium leading-none tracking-[-0.065em]" style={{ fontFamily: DISPLAY }}>A$199</div>
              <div className="pb-1 text-[13px] font-semibold text-white/58">/mo + GST</div>
            </div>

            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              <PriceLine label="Included" value="200 Voice AI minutes" />
              <PriceLine label="Additional" value="A$0.90 + GST / min" />
              <PriceLine label="Setup" value="from A$997 + GST" />
              <PriceLine label="Requires" value="an active Zapla plan" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BOOK_URL} className="inline-flex h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-[#1E2B29]">
                Book a Call <ArrowRight size={15} />
              </a>
              <a href={PRICING_URL} className="inline-flex h-[48px] items-center rounded-full border border-white/20 px-6 text-[13px] font-semibold text-white">
                Full pricing
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-5 py-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/56">{label}</div>
      <div className="text-[13px] font-semibold text-white/88">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[50px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="divide-y divide-[#DDE2DD] border-y border-[#DDE2DD]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-semibold tracking-[-0.025em] text-[#111318]" style={{ fontFamily: DISPLAY }}>
                    {item.q}
                  </span>
                  <ChevronDown size={17} className={"shrink-0 text-[#777168] transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>

                <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="max-w-[720px] pb-5 text-[14px] leading-[1.7] text-[#626762]">{item.a}</p>
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
    <section className="border-t border-[#E5E8E4] bg-[#F7F8F6] px-5 py-16 sm:px-10 sm:py-18 lg:px-16 lg:py-20">
      <Reveal className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div>
          <h2
            className="max-w-[720px] text-[42px] font-medium leading-[0.97] tracking-[-0.052em] text-[#111318] sm:text-[54px] lg:text-[60px]"
            style={{ fontFamily: DISPLAY }}
          >
            Show us your call flow.
          </h2>
          <p className="mt-4 max-w-[700px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
            We’ll show you exactly what Zapla can answer, book, route or hand off before anything goes live.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD7] bg-white px-6 text-[13px] font-semibold text-[#111318]"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default AIReceptionistConcept;
