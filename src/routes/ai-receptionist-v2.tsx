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
} from "lucide-react";

export const Route = createFileRoute("/ai-receptionist-v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "AI Receptionist V2 | Zapla" },
      {
        name: "description",
        content:
          "A simplified product-led concept for Zapla AI Receptionist.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "preconnect", href: "https://cdn.openart.ai" }],
  }),
  component: AIReceptionistV2,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_IMAGE =
  "https://cdn.openart.ai/openart-uploads/production/attachment-transfers/befc6b19b694f24013c9255a9b9d14f5044236b772a28709c682c6cc47c7b696.png";
const PETAL_COLORS = ["#E97D62", "#C96C85", "#DDA34B", "#99A36D", "#9B86B8", "#D58C75"] as const;

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

function AIReceptionistV2() {
  return (
    <main className="min-h-screen bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <ConnectedCall />
      <IndustryExamples />
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

function ConnectedCall() {
  const reduced = !!useReducedMotion();

  const outcomes = [
    { icon: <Calendar size={16} />, label: "Appointment", value: "Tuesday · 10:30am", accent: "#DDA34B" },
    { icon: <UserRound size={16} />, label: "Customer record", value: "New customer added", accent: "#99A36D" },
    { icon: <MessageSquare size={16} />, label: "Confirmation", value: "Sent automatically", accent: "#C96C85" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#111214] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_52%,rgba(221,163,75,.08),transparent_27%),radial-gradient(circle_at_75%_55%,rgba(201,108,133,.05),transparent_22%)]" />

      <div className="relative mx-auto max-w-[1280px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow light>The Zapla difference</Eyebrow>
            <h2
              className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[66px]"
              style={{ fontFamily: DISPLAY }}
            >
              The call ends.
              <span className="block text-[#DDA34B]">The next step is already moving.</span>
            </h2>
          </div>
          <p className="max-w-[600px] text-[15px] leading-[1.7] text-white/56 sm:text-[17px]">
            The caller, appointment, customer record and follow-up stay connected inside Zapla.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid min-h-[470px] overflow-hidden rounded-[30px] border border-white/[0.08] bg-[linear-gradient(145deg,#151619_0%,#101113_65%,#171517_100%)] lg:grid-cols-[0.92fr_0.38fr_1.05fr]">
            <div className="flex items-center border-b border-white/[0.08] p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="w-full rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-6">
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

                <div className="mt-8 border-t border-white/[0.08] pt-6">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/28">Caller</div>
                  <div className="mt-2 text-[22px] font-medium leading-[1.3] tracking-[-0.03em] text-white/92" style={{ fontFamily: DISPLAY }}>
                    “Do you have anything Tuesday morning?”
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center border-b border-white/[0.08] py-12 lg:border-b-0 lg:border-r lg:py-0">
              <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDA34B]/10" />
              <motion.div
                className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDA34B]/16"
                animate={reduced ? undefined : { scale: [0.86, 1.15], opacity: [0.34, 0] }}
                transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <PetalMark size={104} />
                <div className="mt-4 text-[8px] font-semibold uppercase tracking-[0.19em] text-white/30">Zapla</div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
              {outcomes.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={reduced ? false : { opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.1, ease: EASE }}
                  className="flex items-center gap-4 border-b border-white/[0.07] pb-4 last:border-b-0 last:pb-0"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px]"
                    style={{ color: item.accent, backgroundColor: item.accent + "18" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.14em] text-white/30">{item.label}</div>
                    <div className="mt-1 text-[15px] font-semibold text-white/90">{item.value}</div>
                  </div>
                  <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] text-[#B8C28A]">
                    <Check size={11} strokeWidth={2.4} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 text-[11px] font-semibold text-white/32">
          Native to Zapla CRM and workflows.
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
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <Reveal className="mx-auto max-w-[1000px] text-center">
        <div className="mx-auto flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#111214]">
          <PetalMark size={32} />
        </div>
        <h2 className="mx-auto mt-6 max-w-[840px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[56px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
          Show us your call flow.
        </h2>
        <p className="mx-auto mt-4 max-w-[630px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
          We’ll show you what Zapla can answer, book, route or hand off before anything goes live.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white">
            Book a Call <ArrowRight size={15} />
          </a>
          <a href={PRICING_URL} className="inline-flex h-[50px] items-center rounded-full border border-[#DFE2DD] bg-white px-6 text-[13px] font-semibold text-[#111318]">
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default AIReceptionistV2;
