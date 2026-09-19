import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
          "Zapla AI Receptionist answers incoming calls, understands what callers need, books or routes the next step, and keeps follow-up connected to your CRM.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AIReceptionistPage,
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

const CALL_PHASES = [
  {
    label: "Caller",
    title: "Service enquiry",
    detail: "“I need a service next week. Do you have anything Tuesday morning?”",
    icon: <Phone size={16} />,
    accent: COLORS.coral,
  },
  {
    label: "Understood",
    title: "Intent captured",
    detail: "Service booking · Tuesday morning preferred",
    icon: <UserRound size={16} />,
    accent: COLORS.amber,
  },
  {
    label: "Action",
    title: "Tuesday 10:30 booked",
    detail: "The next available time is confirmed with the caller.",
    icon: <Calendar size={16} />,
    accent: COLORS.sage,
  },
  {
    label: "Follow-through",
    title: "The rest happens too",
    detail: "Confirmation sent · contact updated · pipeline moved",
    icon: <Database size={16} />,
    accent: COLORS.plum,
  },
] as const;

const WORKFLOW_STEPS = [
  ["01", "Answer", "Pick up the call with your business context."],
  ["02", "Understand", "Capture why they called and what matters next."],
  ["03", "Act", "Book, route, transfer or take a clean message."],
  ["04", "Record", "Keep the outcome with the customer in Zapla."],
  ["05", "Follow through", "Trigger the next message, task or pipeline step."],
] as const;

const SCENARIOS = [
  {
    key: "mechanic",
    label: "Mechanic",
    icon: <Wrench size={16} />,
    image: "/concept/cinematic-v5/mechanic.jpg",
    caller: "I need a service next week. Do you have anything Tuesday morning?",
    action: "Zapla captures the service request, checks the booking flow and moves the caller to the next available step.",
    outcome: "Appointment confirmed, customer details saved and the follow-up trail is already in place.",
  },
  {
    key: "trades",
    label: "Trades",
    icon: <Hammer size={16} />,
    image: "/concept/cinematic-v5/construction.jpg",
    caller: "My hot water has stopped. Can someone come out today?",
    action: "Zapla captures the job, location and urgency, then routes the enquiry using the rules your team sets.",
    outcome: "The right person receives a clean job summary with the customer context attached.",
  },
  {
    key: "clinic",
    label: "Clinic",
    icon: <Stethoscope size={16} />,
    image: "/concept/cinematic-v5/physio.jpg",
    caller: "Are you taking new patients, and what appointment times do you have?",
    action: "Zapla can answer the practice information you choose to provide and handle the booking or handoff path you set.",
    outcome: "The enquiry is captured cleanly without turning the reception call into an open-ended clinical conversation.",
  },
  {
    key: "property",
    label: "Property",
    icon: <Home size={16} />,
    image: "/concept/cinematic-v5/real-estate.jpg",
    caller: "I am thinking about selling and would like to arrange an appraisal.",
    action: "Zapla captures the enquiry, property details and preferred next step while the agent is unavailable.",
    outcome: "The lead enters Zapla with context and a clear next action instead of sitting in voicemail.",
  },
] as const;

const FAQS = [
  {
    q: "Can I keep my existing business number?",
    a: "Usually, yes. We can use call forwarding from your existing number or set up a new business number, depending on the call flow you want.",
  },
  {
    q: "Can the AI Receptionist book appointments?",
    a: "Yes. If the booking flow and calendar are connected, the receptionist can move a suitable caller into the booking step you have set.",
  },
  {
    q: "Can it transfer a caller to my team?",
    a: "Yes. You choose which calls should stay with the AI and which should route or transfer to a person.",
  },
  {
    q: "What happens when it does not know the answer?",
    a: "It does not need to invent one. You can set the fallback to collect the right details, take a clean message or hand the call to your team.",
  },
  {
    q: "Where does the information from the call go?",
    a: "The call outcome and customer details can stay with the contact in Zapla and trigger the next step, such as a message, task, booking or pipeline update.",
  },
  {
    q: "How much does it cost?",
    a: "AI Receptionist is A$199 per month plus GST as an add-on to an active Zapla plan. It includes 200 Voice AI minutes. Setup starts from A$997 plus GST, and additional Voice AI usage is A$0.90 plus GST per minute.",
  },
] as const;

function AIReceptionistPage() {
  return (
    <main
      className="min-h-screen overflow-hidden bg-[#F7F4EE] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <ConnectedSection />
      <MissedMomentFlow />
      <ScenarioSwitcher />
      <ConfiguredSection />
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
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.44, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={
        "text-[10px] font-semibold uppercase tracking-[0.22em] " +
        (light ? "text-[#DDA34B]" : "text-[#C96F55]")
      }
    >
      {children}
    </p>
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

function Hero() {
  return (
    <section className="bg-[#F6F0E8] px-5 pb-14 pt-[104px] sm:px-10 sm:pb-18 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[128px]">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <Reveal className="max-w-[650px]">
          <Eyebrow>AI Receptionist</Eyebrow>
          <h1
            className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[62px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            An AI receptionist
            <span className="block">that follows through.</span>
          </h1>
          <p className="mt-6 max-w-[610px] text-[16px] leading-[1.68] text-[#686D69] sm:text-[18px]">
            Zapla answers incoming calls, understands what the caller needs, takes the next step and keeps the conversation connected to your CRM and follow-up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[11px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-[#253633]"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center justify-center rounded-[11px] border border-[#CFC6BA] bg-[#FBFAF7] px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:bg-white"
            >
              View pricing
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#565B56] sm:text-[12px]">
            {["Answers the call", "Takes the next step", "Keeps it in Zapla"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <SmallTick />
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <HeroCallDemo />
        </Reveal>
      </div>
    </section>
  );
}

function HeroCallDemo() {
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(reduced ? CALL_PHASES.length - 1 : 0);

  useEffect(() => {
    if (reduced) {
      setActive(CALL_PHASES.length - 1);
      return;
    }

    let timer = 0;
    const delays = [3000, 3000, 3000, 4400];

    const advance = () => {
      setActive((current) => {
        const next = current === CALL_PHASES.length - 1 ? 0 : current + 1;
        timer = window.setTimeout(advance, delays[next]);
        return next;
      });
    };

    timer = window.setTimeout(advance, delays[0]);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const current = CALL_PHASES[active];

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="overflow-hidden rounded-[24px] border border-[#D7CEC2] bg-[#111214] shadow-[0_24px_70px_rgba(60,47,34,.12)]">
        <div className="relative min-h-[246px] overflow-hidden sm:min-h-[290px]">
          <img
            src="/concept/cinematic-v5/mechanic.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/28" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#111214]/84 px-3 py-2 text-[10px] font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#99A36D]" />
              Illustrative call flow
            </span>
            <span className="rounded-full bg-[#F7F4EE]/92 px-3 py-2 text-[10px] font-semibold text-[#111318]">
              {active + 1} / {CALL_PHASES.length}
            </span>
          </div>

          <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
            <div className="max-w-[520px] bg-[#F7F4EE] p-4 shadow-[0_16px_45px_rgba(0,0,0,.24)] sm:p-5">
              <div className="flex items-start gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                  style={{ backgroundColor: current.accent + "22", color: current.accent }}
                >
                  {current.icon}
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8A8178]">
                    {current.label}
                  </div>
                  <div
                    className="mt-1 text-[18px] font-medium leading-[1.08] tracking-[-0.03em] text-[#111318] sm:text-[21px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {current.title}
                  </div>
                  <div className="mt-2 text-[12px] leading-[1.55] text-[#5F635F] sm:text-[13px]">
                    {current.detail}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#17181B] px-4 py-4 sm:px-5 sm:py-5">
          <div className="grid grid-cols-4 gap-2">
            {CALL_PHASES.map((phase, index) => {
              const complete = reduced || index <= active;
              const currentPhase = !reduced && index === active;
              return (
                <div key={phase.label}>
                  <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full origin-left rounded-full"
                      style={{ backgroundColor: phase.accent }}
                      animate={{ scaleX: complete ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                    />
                  </div>
                  <div
                    className={
                      "mt-2 text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors " +
                      (currentPhase || complete ? "text-white/74" : "text-white/28")
                    }
                  >
                    {phase.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/38">
                What Zapla adds
              </div>
              <div className="mt-1 text-[12px] font-semibold text-white/86 sm:text-[13px]">
                The call becomes part of the customer journey, not a separate message to chase later.
              </div>
            </div>
            <ArrowRight size={17} className="ml-4 shrink-0 text-[#DDA34B]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectedSection() {
  const connected = [
    { label: "Customer record", icon: <Database size={16} />, accent: COLORS.plum },
    { label: "Booking", icon: <Calendar size={16} />, accent: COLORS.amber },
    { label: "Follow-up", icon: <MessageSquare size={16} />, accent: COLORS.sage },
    { label: "Pipeline", icon: <GitBranch size={16} />, accent: COLORS.rose },
  ];

  return (
    <section className="bg-[#111214] px-5 py-16 text-[#F7F4EE] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-14">
          <div className="max-w-[560px]">
            <Eyebrow light>The Zapla difference</Eyebrow>
            <h2
              className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[56px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              Answering is useful.
              <span className="block text-[#DDA34B]">Follow-through is the point.</span>
            </h2>
            <p className="mt-5 max-w-[540px] text-[15px] leading-[1.68] text-white/60 sm:text-[17px]">
              A standalone answering bot can stop at “message taken”. Zapla keeps the customer context moving into the rest of the work.
            </p>
          </div>

          <div>
            <div className="flex flex-col border-y border-white/10 sm:grid sm:grid-cols-[1.1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
              <FlowNode icon={<Phone size={17} />} label="Incoming call" detail="Need understood" accent={COLORS.coral} />
              <FlowArrow />
              <FlowNode icon={connected[0].icon} label={connected[0].label} detail="Context saved" accent={connected[0].accent} />
              <FlowArrow />
              <FlowNode icon={connected[2].icon} label={connected[2].label} detail="Next step sent" accent={connected[2].accent} />
              <FlowArrow />
              <FlowNode icon={connected[3].icon} label={connected[3].label} detail="Opportunity moves" accent={connected[3].accent} />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-white/62">
              <span>Booking when the flow calls for it.</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span>Human handoff when a person should take over.</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span>No manual copy-and-paste back into another system.</span>
            </div>

            <a
              href={BOOK_URL}
              className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-[#F7F4EE] underline decoration-[#DDA34B]/70 underline-offset-4"
            >
              Talk through your call flow <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlowNode({
  icon,
  label,
  detail,
  accent,
}: {
  icon: ReactNode;
  label: string;
  detail: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 py-4 sm:block sm:px-3 sm:py-6">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
        style={{ color: accent, backgroundColor: accent + "18" }}
      >
        {icon}
      </span>
      <div className="sm:mt-3">
        <div className="text-[11px] font-semibold text-white/86">{label}</div>
        <div className="mt-0.5 text-[10px] text-white/42">{detail}</div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden justify-center text-[#DDA34B] sm:flex">
      <ArrowRight size={16} />
    </div>
  );
}

function MissedMomentFlow() {
  const moments = [
    { image: "/concept/cinematic-v5/roofing.jpg", label: "On the job" },
    { image: "/concept/cinematic-v5/skin-clinic.jpg", label: "With a customer" },
    { image: "/concept/cinematic-v5/broker.jpg", label: "After hours" },
  ];

  return (
    <section id="how-it-works" className="bg-[#F7F4EE] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
        <Reveal>
          <Eyebrow>When the phone rings</Eyebrow>
          <h2
            className="mt-4 max-w-[640px] text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your hands can be full.
            <span className="block">The next step does not have to stop.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
            Calls arrive while you are working, with another customer or away from the desk. Zapla gives that moment somewhere useful to go.
          </p>

          <div className="mt-8 grid grid-cols-[1.35fr_.65fr] grid-rows-2 gap-2 sm:gap-3">
            <div className="relative row-span-2 min-h-[300px] overflow-hidden sm:min-h-[390px]">
              <img src={moments[0].image} alt="" className="h-full w-full object-cover" loading="lazy" />
              <MomentLabel label={moments[0].label} />
            </div>
            {moments.slice(1).map((moment) => (
              <div key={moment.label} className="relative min-h-[145px] overflow-hidden sm:min-h-[190px]">
                <img src={moment.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                <MomentLabel label={moment.label} />
              </div>
            ))}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
            <h3
              className="mt-4 text-[34px] font-medium leading-[1] tracking-[-0.05em] sm:text-[44px]"
              style={{ fontFamily: DISPLAY }}
            >
              One call. Five things handled.
            </h3>
            <p className="mt-4 max-w-[600px] text-[14px] leading-[1.65] text-[#686D69] sm:text-[16px]">
              You set the rules once. Zapla uses them to keep routine calls moving and knows where the human handoff belongs.
            </p>
          </Reveal>

          <div className="mt-8 border-y border-[#D8CFC3]">
            {WORKFLOW_STEPS.map(([n, title, copy], index) => (
              <div
                key={n}
                className={
                  "grid grid-cols-[44px_110px_1fr] gap-3 py-4 sm:grid-cols-[52px_145px_1fr] sm:gap-4 sm:py-5 " +
                  (index ? "border-t border-[#D8CFC3]" : "")
                }
              >
                <div className="text-[10px] font-bold tracking-[0.15em] text-[#C96F55]">{n}</div>
                <div className="text-[14px] font-semibold text-[#111318] sm:text-[15px]">{title}</div>
                <div className="text-[12px] leading-[1.55] text-[#686D69] sm:text-[13px]">{copy}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MomentLabel({ label }: { label: string }) {
  return (
    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-[#111214]/84 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#F7F4EE] sm:bottom-4 sm:left-4">
      <Clock size={12} className="text-[#DDA34B]" />
      {label}
    </div>
  );
}

function ScenarioSwitcher() {
  const [selectedKey, setSelectedKey] = useState(SCENARIOS[0].key);
  const reduced = !!useReducedMotion();
  const selected = SCENARIOS.find((scenario) => scenario.key === selectedKey) ?? SCENARIOS[0];

  return (
    <section className="bg-[#F0E8DC] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>Different businesses</Eyebrow>
          <h2
            className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]"
            style={{ fontFamily: DISPLAY }}
          >
            Same receptionist. Different job.
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
            The call should sound like your business and move toward the next step your team actually needs.
          </p>
        </Reveal>

        <div className="mt-8 sm:hidden">
          <label htmlFor="industry-example" className="mb-2 block text-[11px] font-semibold text-[#565B56]">
            Choose an example
          </label>
          <select
            id="industry-example"
            value={selectedKey}
            onChange={(event) => setSelectedKey(event.target.value as typeof selectedKey)}
            className="h-[48px] w-full rounded-[10px] border border-[#CFC6BA] bg-[#FBFAF7] px-4 text-[14px] font-semibold text-[#111318]"
          >
            {SCENARIOS.map((scenario) => (
              <option key={scenario.key} value={scenario.key}>
                {scenario.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 hidden flex-wrap gap-2 sm:flex">
          {SCENARIOS.map((scenario) => {
            const active = selected.key === scenario.key;
            return (
              <button
                key={scenario.key}
                type="button"
                onClick={() => setSelectedKey(scenario.key)}
                className={
                  "inline-flex h-[42px] items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors " +
                  (active
                    ? "border-[#1E2B29] bg-[#1E2B29] text-[#F7F4EE]"
                    : "border-[#CFC6BA] bg-[#FBFAF7] text-[#565B56] hover:bg-white")
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
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
          className="mt-5 overflow-hidden border-y border-[#CFC6BA] bg-[#F7F4EE]"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[430px]">
              <img src={selected.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-[#111214]/84 p-5 text-[#F7F4EE] sm:p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#DDA34B]">
                  Example caller
                </div>
                <blockquote
                  className="mt-2 max-w-[560px] text-[18px] font-medium leading-[1.35] tracking-[-0.02em] sm:text-[20px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  “{selected.caller}”
                </blockquote>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="border-b border-[#D8CFC3] pb-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9A6759]">
                  During the call
                </div>
                <h3 className="mt-2 text-[27px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
                  Understand what they need.
                </h3>
                <p className="mt-3 max-w-[590px] text-[14px] leading-[1.65] text-[#686D69]">{selected.action}</p>
              </div>

              <div className="pt-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#69735D]">
                  After the call
                </div>
                <h3 className="mt-2 text-[27px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
                  Keep the next step moving.
                </h3>
                <p className="mt-3 max-w-[590px] text-[14px] leading-[1.65] text-[#686D69]">{selected.outcome}</p>
              </div>

              <p className="mt-7 text-[11px] leading-[1.55] text-[#716B64]">
                Illustrative workflow. The questions, actions, bookings, transfers and follow-up are set around your business during setup.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-7">
          <a
            href={BOOK_URL}
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#1E2B29] underline decoration-[#D58C75] underline-offset-4"
          >
            Map your call flow with us <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function ConfiguredSection() {
  const controls = [
    {
      icon: <Phone size={17} />,
      title: "Routine stays routine",
      copy: "Common questions, simple enquiry capture and suitable booking flows can stay with the receptionist.",
      accent: COLORS.coral,
    },
    {
      icon: <Headphones size={17} />,
      title: "Humans take the human calls",
      copy: "Calls that need judgement or a person can route or transfer to your team instead of being forced through AI.",
      accent: COLORS.plum,
    },
    {
      icon: <ShieldCheck size={17} />,
      title: "Unknown does not mean invented",
      copy: "Out-of-scope requests can fall back to a clean message or handoff rather than a made-up answer.",
      accent: COLORS.sage,
    },
  ];

  const setup = [
    ["01", "Map", "Common calls, information needed and the next step."],
    ["02", "Build", "Knowledge, booking, routing and follow-up rules."],
    ["03", "Test", "Normal calls, awkward calls, handoffs and fallbacks."],
    ["04", "Launch", "Connect the number, go live and refine from real conversations."],
  ] as const;

  return (
    <section className="bg-[#F7F4EE] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Configured around you</Eyebrow>
            <h2
              className="mt-4 max-w-[620px] text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]"
              style={{ fontFamily: DISPLAY }}
            >
              You decide what AI handles.
              <span className="block">We build the rules around it.</span>
            </h2>
            <p className="mt-5 max-w-[590px] text-[15px] leading-[1.68] text-[#686D69] sm:text-[17px]">
              The useful part is not access to another voice model. It is turning your real reception flow into something predictable enough for customers and staff to trust.
            </p>

            <div className="mt-8 divide-y divide-[#D8CFC3] border-y border-[#D8CFC3]">
              {controls.map((item) => (
                <div key={item.title} className="flex gap-4 py-5">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ color: item.accent, backgroundColor: item.accent + "18" }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#111318]">{item.title}</h3>
                    <p className="mt-1.5 max-w-[510px] text-[13px] leading-[1.6] text-[#686D69]">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-9">
            <div className="flex items-end justify-between gap-5 border-b border-[#D8CFC3] pb-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#C96F55]">
                  Guided setup
                </div>
                <h3 className="mt-2 text-[31px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  We do not hand you a blank bot.
                </h3>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#817A72]">Setup from</div>
                <div className="mt-1 text-[21px] font-semibold tracking-[-0.03em]">A$997 + GST</div>
              </div>
            </div>

            <div>
              {setup.map(([n, title, copy], index) => (
                <div
                  key={n}
                  className={
                    "grid grid-cols-[44px_90px_1fr] gap-3 py-5 sm:grid-cols-[56px_120px_1fr] sm:gap-4 sm:py-6 " +
                    (index ? "border-t border-[#D8CFC3]" : "")
                  }
                >
                  <div className="text-[10px] font-bold tracking-[0.16em] text-[#C96F55]">{n}</div>
                  <div className="text-[15px] font-semibold text-[#111318]">{title}</div>
                  <div className="text-[13px] leading-[1.6] text-[#686D69]">{copy}</div>
                </div>
              ))}
            </div>

            <div className="border-l-2 border-[#D58C75] pl-4 text-[12px] leading-[1.6] text-[#686D69]">
              Before go-live, the call flow should be tested against routine questions, booking paths, handoffs and out-of-scope requests. Real customer proof belongs here only when we have real customer data to show.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingStrip() {
  return (
    <section className="bg-[#EFE2D2] px-5 py-14 sm:px-10 sm:py-18 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <h2
                className="mt-4 max-w-[760px] text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[50px]"
                style={{ fontFamily: DISPLAY }}
              >
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
    <div className="border-l border-[#CDBDAC] pl-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#806D63]">{label}</div>
      <div className="mt-2 text-[16px] font-semibold tracking-[-0.025em] text-[#111318]">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F6F0E8] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1040px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow>Questions</Eyebrow>
          <h2
            className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]"
            style={{ fontFamily: DISPLAY }}
          >
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
                  <span
                    className="text-[16px] font-semibold tracking-[-0.025em] text-[#111318] sm:text-[18px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={
                      "shrink-0 text-[#7C756D] transition-transform duration-200 " +
                      (isOpen ? "rotate-180" : "")
                    }
                  />
                </button>
                <div
                  className={
                    "grid transition-[grid-template-rows,opacity] duration-200 " +
                    (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[820px] pb-6 text-[14px] leading-[1.68] text-[#5F635F] sm:text-[15px]">
                      {item.a}
                    </p>
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
    <section id="ai-receptionist-final-cta" className="bg-[#1E2B29] px-5 py-18 text-[#F7F4EE] sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <Reveal className="mx-auto max-w-[980px] text-center">
        <Eyebrow light>Keep the next opportunity moving</Eyebrow>
        <h2
          className="mx-auto mt-4 max-w-[900px] text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
          style={{ fontFamily: DISPLAY }}
        >
          Your next customer can call while you are busy.
        </h2>
        <p className="mx-auto mt-5 max-w-[650px] text-[15px] leading-[1.65] text-white/60 sm:text-[17px]">
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
  const [visible, setVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const finalRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);

    update();
    window.addEventListener("scroll", update, { passive: true });

    const final = document.getElementById("ai-receptionist-final-cta");
    if (final && typeof IntersectionObserver !== "undefined") {
      finalRef.current = new IntersectionObserver(
        ([entry]) => setFinalVisible(Boolean(entry?.isIntersecting)),
        { threshold: 0.06 },
      );
      finalRef.current.observe(final);
    }

    return () => {
      window.removeEventListener("scroll", update);
      finalRef.current?.disconnect();
    };
  }, []);

  if (!visible || finalVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[#F7F4EE]/95 px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
      <a
        href={BOOK_URL}
        className="flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#1E2B29] text-[13px] font-semibold text-[#F7F4EE]"
      >
        Book a Call <ArrowRight size={15} />
      </a>
    </div>
  );
}

export default AIReceptionistPage;
