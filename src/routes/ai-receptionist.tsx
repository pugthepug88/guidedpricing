import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  CornerDownRight,
  Database,
  GitBranch,
  Headphones,
  MessageSquare,
  Phone,
  PhoneForwarded,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const Route = createFileRoute("/ai-receptionist")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "AI Receptionist for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla answers incoming calls, understands what the caller needs, takes the next step and keeps follow-up connected to your CRM.",
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

const C = {
  paper: "#F7F4EE",
  paper2: "#F1EADF",
  ink: "#111318",
  muted: "#666B67",
  line: "#D8CFC3",
  dark: "#111214",
  green: "#1E2B29",
  coral: "#E97D62",
  amber: "#DDA34B",
  sage: "#99A36D",
  plum: "#9B86B8",
  rose: "#C96C85",
} as const;

const HERO_PHASES = [
  {
    short: "Answer",
    label: "Incoming call",
    title: "The phone gets picked up.",
    detail: "A new service enquiry arrives while the team is busy.",
    accent: C.coral,
  },
  {
    short: "Understand",
    label: "Caller intent",
    title: "Zapla understands what they need.",
    detail: "Service booking · Tuesday morning preferred · existing customer",
    accent: C.amber,
  },
  {
    short: "Act",
    label: "Next step",
    title: "The right action happens.",
    detail: "Tuesday 10:30 offered and confirmed.",
    accent: C.sage,
  },
  {
    short: "Follow through",
    label: "Zapla",
    title: "The call becomes part of the system.",
    detail: "Confirmation sent · contact updated · pipeline moved",
    accent: C.plum,
  },
] as const;

const SCENARIOS = [
  {
    key: "mechanic",
    label: "Mechanic",
    caller: "My car is making a grinding noise. Can you fit me in Tuesday morning?",
    ai: "I can help with that. I have Tuesday at 10:30 available. Does that work for you?",
    outcome: "Booking confirmed · service enquiry created · SMS confirmation sent",
  },
  {
    key: "trades",
    label: "Trades",
    caller: "My hot water has stopped. Is there anyone who can come out today?",
    ai: "I can take the details and check the urgent-job flow. What suburb are you in?",
    outcome: "Urgency captured · job routed · customer details attached",
  },
  {
    key: "clinic",
    label: "Clinic",
    caller: "Are you taking new patients, and do you have anything after work?",
    ai: "I can help with your booking options and practice information. What day suits you best?",
    outcome: "Enquiry captured · booking path started · handoff available",
  },
  {
    key: "property",
    label: "Property",
    caller: "I am thinking of selling and would like to organise an appraisal.",
    ai: "Absolutely. I can take the property details and arrange the next step with the team.",
    outcome: "Seller lead created · property details saved · follow-up task triggered",
  },
] as const;

const FAQS = [
  {
    q: "Can I keep my existing business number?",
    a: "Usually, yes. We can use call forwarding from your existing number or set up a new business number, depending on the call flow you want.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes. If the booking flow and calendar are connected, the receptionist can move a suitable caller into the booking step you have set.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. You decide which calls should stay with the AI and which should route or transfer to a person.",
  },
  {
    q: "What happens if it does not know the answer?",
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
    <main className="min-h-screen bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <Difference />
      <ScenarioLab />
      <Boundaries />
      <SetupAndPricing />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={"text-[11px] font-semibold uppercase tracking-[0.2em] " + (light ? "text-[#DDA34B]" : "text-[#C96F55]")}>
      {children}
    </p>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="bg-[#F6F0E8] px-5 pb-16 pt-[106px] sm:px-10 sm:pb-20 sm:pt-[118px] lg:px-16 lg:pb-24 lg:pt-[130px]">
      <div className="mx-auto grid max-w-[1420px] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <Reveal className="max-w-[610px]">
          <Eyebrow>AI Receptionist</Eyebrow>
          <h1
            className="mt-4 text-[48px] font-medium leading-[0.92] tracking-[-0.062em] sm:text-[64px] lg:text-[78px]"
            style={{ fontFamily: DISPLAY }}
          >
            When the phone rings,
            <span className="block">Zapla picks up.</span>
            <span className="block text-[#C96F55]">Then keeps going.</span>
          </h1>

          <p className="mt-6 max-w-[580px] text-[16px] leading-[1.68] text-[#616662] sm:text-[18px]">
            Answer the call, understand what they need, book or route the next step, update the customer record and keep follow-up moving.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[11px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform duration-200 hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center rounded-[11px] border border-[#CFC6BA] bg-[#FBFAF7] px-6 text-[13px] font-semibold text-[#111318]"
            >
              View pricing
            </a>
          </div>

          <div className="mt-8 border-t border-[#D8CFC3] pt-5 text-[12px] leading-[1.6] text-[#686D69]">
            <span className="font-semibold text-[#111318]">Built for service businesses.</span>{" "}
            Use it for routine enquiries, bookings, routing and clean handoff. Keep humans for the calls that actually need humans.
          </div>
        </Reveal>

        <Reveal>
          <LiveCallWorkspace />
        </Reveal>
      </div>
    </section>
  );
}

function LiveCallWorkspace() {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPhase(HERO_PHASES.length - 1);
      return;
    }

    const delay = phase === HERO_PHASES.length - 1 ? 4300 : 2800;
    const timer = window.setTimeout(() => setPhase((phase + 1) % HERO_PHASES.length), delay);
    return () => window.clearTimeout(timer);
  }, [phase, reduced]);

  const current = HERO_PHASES[phase];

  return (
    <div className="overflow-hidden rounded-[22px] border border-black/10 bg-[#111214] shadow-[0_30px_85px_rgba(53,42,30,.16)]">
      <div className="grid min-h-[520px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-white/[0.09] bg-[#17181B] p-5 text-white lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/38">Live call</div>
              <div className="mt-1 text-[15px] font-semibold">Northside Auto</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-semibold text-[#B8C19F]">
              <span className="h-2 w-2 rounded-full bg-[#99A36D]" />
              Connected
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F4EE] text-[#111318]">
              <Phone size={19} />
            </span>
            <div>
              <div className="text-[12px] font-semibold">Incoming customer</div>
              <div className="mt-1 text-[11px] text-white/38">00:42 · New enquiry</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <TranscriptBubble who="Caller">
              My car is making a grinding noise. Can you fit me in Tuesday morning?
            </TranscriptBubble>
            <TranscriptBubble who="Zapla" accent>
              I can help with that. I have Tuesday at 10:30 available. Does that work for you?
            </TranscriptBubble>
          </div>

          <div className="mt-8 flex items-center gap-1.5" aria-hidden="true">
            {[12, 20, 31, 18, 38, 25, 45, 20, 34, 15, 29, 21, 37, 17, 25, 14, 22].map((height, index) => (
              <motion.span
                key={index}
                className="w-[3px] rounded-full bg-[#D58C75]"
                animate={reduced ? { height: height * 0.68 } : { height: [height * 0.45, height, height * 0.58] }}
                transition={{ duration: 1.15, repeat: reduced ? 0 : Infinity, delay: index * 0.04, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>

        <div className="bg-[#F7F4EE] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8A8178]">{current.label}</div>
              <h2 className="mt-2 text-[29px] font-medium leading-[1] tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                {current.title}
              </h2>
              <p className="mt-3 max-w-[460px] text-[13px] leading-[1.6] text-[#666B67]">{current.detail}</p>
            </div>
            <div className="shrink-0 text-[11px] font-semibold text-[#8A8178]">{phase + 1}/4</div>
          </div>

          <div className="mt-7 grid gap-3">
            <ActionRow
              icon={<Calendar size={16} />}
              label="Booking"
              title="Tuesday 10:30"
              meta="Confirmed"
              accent={C.amber}
              active={phase >= 2 || reduced}
            />
            <ActionRow
              icon={<Database size={16} />}
              label="Customer"
              title="Contact updated"
              meta="Service enquiry"
              accent={C.plum}
              active={phase >= 3 || reduced}
            />
            <ActionRow
              icon={<MessageSquare size={16} />}
              label="Follow-up"
              title="Confirmation SMS"
              meta="Ready to send"
              accent={C.sage}
              active={phase >= 3 || reduced}
            />
            <ActionRow
              icon={<GitBranch size={16} />}
              label="Pipeline"
              title="Service enquiry"
              meta="Moved forward"
              accent={C.rose}
              active={phase >= 3 || reduced}
            />
          </div>

          <div className="mt-7 border-t border-[#D8CFC3] pt-4">
            <div className="grid grid-cols-4 gap-2">
              {HERO_PHASES.map((item, index) => (
                <div key={item.short}>
                  <div className="h-[3px] overflow-hidden rounded-full bg-[#DED6CC]">
                    <motion.div
                      className="h-full origin-left rounded-full"
                      style={{ backgroundColor: item.accent }}
                      animate={{ scaleX: reduced || index <= phase ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
                    />
                  </div>
                  <div className={"mt-2 text-[9px] font-semibold " + (index <= phase || reduced ? "text-[#565B56]" : "text-[#AAA49D]")}>
                    {item.short}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TranscriptBubble({ who, accent = false, children }: { who: string; accent?: boolean; children: ReactNode }) {
  return (
    <div>
      <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/34">{who}</div>
      <div className={"mt-2 max-w-[410px] text-[13px] leading-[1.58] " + (accent ? "text-white" : "text-white/68")}>{children}</div>
    </div>
  );
}

function ActionRow({
  icon,
  label,
  title,
  meta,
  accent,
  active,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  meta: string;
  accent: string;
  active: boolean;
}) {
  return (
    <motion.div
      className="grid grid-cols-[38px_1fr_auto] items-center gap-3 border-b border-[#DDD5CA] pb-3"
      animate={{ opacity: active ? 1 : 0.34 }}
      transition={{ duration: 0.25 }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[9px]" style={{ color: accent, backgroundColor: accent + "18" }}>
        {icon}
      </span>
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8B837A]">{label}</div>
        <div className="mt-0.5 text-[13px] font-semibold text-[#111318]">{title}</div>
      </div>
      <div className="text-right text-[10px] text-[#777168]">{meta}</div>
    </motion.div>
  );
}

function Difference() {
  return (
    <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow light>The difference</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Most AI receptionists finish
            <span className="block">when the call ends.</span>
            <span className="block text-[#DDA34B]">Zapla does not.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid border-y border-white/10 lg:grid-cols-2 lg:divide-x lg:divide-white/10">
          <Reveal className="py-8 lg:pr-12 lg:py-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Typical answering bot</div>
            <div className="mt-6 space-y-6">
              <CompareStep n="01" text="Answers the call" />
              <CompareStep n="02" text="Takes a message or basic action" />
              <CompareStep n="03" text="Call ends" final muted />
            </div>
          </Reveal>

          <Reveal className="border-t border-white/10 py-8 lg:border-t-0 lg:pl-12 lg:py-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#DDA34B]">Zapla AI Receptionist</div>
            <div className="mt-6 space-y-6">
              <CompareStep n="01" text="Answers and understands the call" active />
              <CompareStep n="02" text="Books, routes or hands off" active />
              <CompareStep n="03" text="Updates the customer record" active />
              <CompareStep n="04" text="Triggers the follow-up and pipeline step" final active />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8 max-w-[760px] text-[15px] leading-[1.7] text-white/56">
          The point is not a clever voice on the phone. The point is that the call becomes part of the same customer journey your team is already working in.
        </Reveal>
      </div>
    </section>
  );
}

function CompareStep({
  n,
  text,
  final = false,
  active = false,
  muted = false,
}: {
  n: string;
  text: string;
  final?: boolean;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="grid grid-cols-[38px_1fr] gap-4">
      <div className={"text-[10px] font-bold tracking-[0.16em] " + (active ? "text-[#DDA34B]" : "text-white/30")}>{n}</div>
      <div className={"relative pb-5 text-[16px] font-medium " + (muted ? "text-white/36" : active ? "text-white/90" : "text-white/66")}>
        {text}
        {!final && <div className="absolute -bottom-1 left-0 h-px w-10 bg-white/10" />}
      </div>
    </div>
  );
}

function ScenarioLab() {
  const [selectedKey, setSelectedKey] = useState(SCENARIOS[0].key);
  const reduced = !!useReducedMotion();
  const selected = SCENARIOS.find((scenario) => scenario.key === selectedKey) ?? SCENARIOS[0];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Built around your front desk</Eyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
              Same AI.
              <span className="block">Different job.</span>
            </h2>
          </div>
          <p className="max-w-[620px] text-[15px] leading-[1.7] text-[#666B67] sm:text-[17px]">
            A mechanic, clinic, tradie and property business should not sound like the same generic bot. The questions, actions and handoff rules change with the business.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {SCENARIOS.map((scenario) => {
            const active = selected.key === scenario.key;
            return (
              <button
                key={scenario.key}
                type="button"
                onClick={() => setSelectedKey(scenario.key)}
                className={
                  "h-[42px] rounded-full border px-4 text-[12px] font-semibold transition-colors " +
                  (active
                    ? "border-[#1E2B29] bg-[#1E2B29] text-[#F7F4EE]"
                    : "border-[#CFC6BA] bg-[#FBFAF7] text-[#5F635F] hover:bg-white")
                }
                aria-pressed={active}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={selected.key}
          initial={reduced ? false : { opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
          className="mt-5 grid overflow-hidden border-y border-[#CFC6BA] bg-[#F1EADF] lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8A7468]">Illustrative call</div>

            <div className="mt-8 border-l-2 border-[#D58C75] pl-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A8178]">Caller</div>
              <blockquote className="mt-2 text-[23px] font-medium leading-[1.25] tracking-[-0.03em] text-[#111318]" style={{ fontFamily: DISPLAY }}>
                “{selected.caller}”
              </blockquote>
            </div>

            <div className="mt-8 border-l-2 border-[#99A36D] pl-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#69735D]">Zapla</div>
              <blockquote className="mt-2 text-[19px] font-medium leading-[1.35] tracking-[-0.025em] text-[#303430]" style={{ fontFamily: DISPLAY }}>
                “{selected.ai}”
              </blockquote>
            </div>
          </div>

          <div className="border-t border-[#CFC6BA] bg-[#FBFAF7] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8A8178]">What happens behind the call</div>
            <div className="mt-8 space-y-0">
              <OutcomeLine icon={<UserRound size={16} />} label="Intent" value="Captured" accent={C.coral} />
              <OutcomeLine icon={<Calendar size={16} />} label="Next action" value="Chosen" accent={C.amber} />
              <OutcomeLine icon={<Database size={16} />} label="Customer record" value="Updated" accent={C.plum} />
              <OutcomeLine icon={<MessageSquare size={16} />} label="Follow-up" value="Triggered" accent={C.sage} />
            </div>

            <div className="mt-8 border-t border-[#DDD5CA] pt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8A8178]">Outcome</div>
              <div className="mt-2 text-[15px] font-semibold leading-[1.55] text-[#111318]">{selected.outcome}</div>
            </div>

            <p className="mt-6 text-[11px] leading-[1.55] text-[#736D66]">
              This is an illustrative workflow. The real questions, actions and handoffs are configured around your business during setup.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OutcomeLine({ icon, label, value, accent }: { icon: ReactNode; label: string; value: string; accent: string }) {
  return (
    <div className="grid grid-cols-[38px_1fr_auto] items-center gap-3 border-b border-[#DDD5CA] py-4 first:pt-0">
      <span className="flex h-9 w-9 items-center justify-center rounded-[9px]" style={{ color: accent, backgroundColor: accent + "18" }}>
        {icon}
      </span>
      <div className="text-[13px] font-semibold text-[#111318]">{label}</div>
      <div className="text-[11px] font-semibold text-[#6B706B]">{value}</div>
    </div>
  );
}

function Boundaries() {
  const rows = [
    {
      label: "HANDLE",
      title: "Routine calls",
      copy: "Common questions, simple enquiries, bookings and information your front desk handles every day.",
      icon: <Phone size={18} />,
      accent: C.coral,
    },
    {
      label: "HAND OFF",
      title: "Calls that need a person",
      copy: "Route or transfer the conversation when judgement, sensitivity or a human relationship matters.",
      icon: <PhoneForwarded size={18} />,
      accent: C.plum,
    },
    {
      label: "FALL BACK",
      title: "Anything outside the rules",
      copy: "Take a clean message, collect the right details or escalate. Unknown does not need to become invented.",
      icon: <ShieldCheck size={18} />,
      accent: C.sage,
    },
  ];

  return (
    <section className="bg-[#EFE3D4] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="max-w-[840px]">
          <Eyebrow>Control</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
            You decide where AI stops.
          </h2>
          <p className="mt-5 max-w-[700px] text-[15px] leading-[1.7] text-[#666B67] sm:text-[17px]">
            The goal is not to make the receptionist sound endlessly clever. The goal is to make the call handling predictable enough that your team can trust what happens next.
          </p>
        </Reveal>

        <div className="mt-12 border-y border-[#CDBEAD]">
          {rows.map((row, index) => (
            <div key={row.label} className={"grid gap-4 py-7 md:grid-cols-[110px_1fr_1.25fr] md:items-center md:gap-8 " + (index ? "border-t border-[#CDBEAD]" : "")}>
              <div className="text-[10px] font-bold tracking-[0.18em]" style={{ color: row.accent }}>{row.label}</div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px]" style={{ color: row.accent, backgroundColor: row.accent + "18" }}>
                  {row.icon}
                </span>
                <h3 className="text-[25px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{row.title}</h3>
              </div>
              <p className="max-w-[520px] text-[13px] leading-[1.65] text-[#656A65]">{row.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SetupAndPricing() {
  const setup = [
    ["01", "Map the calls", "What people ask, what information matters and what should happen next."],
    ["02", "Build the flow", "Knowledge, booking, routing, handoff and follow-up."],
    ["03", "Test it", "Routine calls, awkward calls, unknowns and transfer paths."],
    ["04", "Go live", "Connect the number, launch and refine from real conversations."],
  ] as const;

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Guided setup</Eyebrow>
            <h2 className="mt-4 max-w-[610px] text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]" style={{ fontFamily: DISPLAY }}>
              We do not hand you a blank bot.
            </h2>
            <p className="mt-5 max-w-[590px] text-[15px] leading-[1.7] text-[#666B67] sm:text-[17px]">
              We turn your existing reception logic into a working call flow, test it, then launch it with the next actions connected.
            </p>

            <div className="mt-9 border-y border-[#D8CFC3]">
              {setup.map(([n, title, copy], index) => (
                <div key={n} className={"grid grid-cols-[44px_125px_1fr] gap-4 py-5 sm:grid-cols-[54px_150px_1fr] sm:py-6 " + (index ? "border-t border-[#D8CFC3]" : "")}>
                  <div className="text-[10px] font-bold tracking-[0.16em] text-[#C96F55]">{n}</div>
                  <div className="text-[14px] font-semibold text-[#111318]">{title}</div>
                  <div className="text-[13px] leading-[1.6] text-[#666B67]">{copy}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="lg:pt-4">
            <div className="border-l border-[#CDBEAD] pl-7 sm:pl-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A7468]">AI Receptionist add-on</div>
              <div className="mt-4 flex items-end gap-2">
                <div className="text-[58px] font-medium leading-none tracking-[-0.065em]" style={{ fontFamily: DISPLAY }}>A$199</div>
                <div className="pb-1 text-[13px] font-semibold text-[#6A6E69]">/mo + GST</div>
              </div>

              <div className="mt-8 space-y-5">
                <PriceLine label="Included" value="200 Voice AI minutes" />
                <PriceLine label="Additional usage" value="A$0.90 + GST / min" />
                <PriceLine label="Guided setup" value="from A$997 + GST" />
                <PriceLine label="Requires" value="an active Zapla plan" />
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href={BOOK_URL} className="inline-flex h-[48px] items-center gap-2 rounded-[11px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE]">
                  Book a Call <ArrowRight size={15} />
                </a>
                <a href={PRICING_URL} className="inline-flex h-[48px] items-center rounded-[11px] border border-[#CFC6BA] px-6 text-[13px] font-semibold text-[#111318]">
                  Full pricing
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PriceLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-5 border-b border-[#DDD5CA] pb-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8B837A]">{label}</div>
      <div className="text-[13px] font-semibold text-[#111318]">{value}</div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F1EADF] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            The practical stuff.
          </h2>
        </Reveal>

        <div className="mt-9 divide-y divide-[#CFC6BA] border-y border-[#CFC6BA]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-semibold tracking-[-0.025em] text-[#111318] sm:text-[19px]" style={{ fontFamily: DISPLAY }}>
                    {item.q}
                  </span>
                  <ChevronDown size={18} className={"shrink-0 text-[#777168] transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                <div className={"grid transition-[grid-template-rows,opacity] duration-200 " + (isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                  <div className="overflow-hidden">
                    <p className="max-w-[790px] pb-6 text-[14px] leading-[1.7] text-[#626762] sm:text-[15px]">{item.a}</p>
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
      <Reveal className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end lg:gap-16">
        <div>
          <Eyebrow light>Put the phone somewhere useful</Eyebrow>
          <h2 className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>
            The next call can become
            <span className="block text-[#DDA34B]">the next customer.</span>
          </h2>
        </div>

        <div>
          <p className="max-w-[480px] text-[15px] leading-[1.7] text-white/60">
            Map the calls your team handles today and we will show you where AI should answer, act, hand off and follow through.
          </p>
          <a href={BOOK_URL} className="mt-7 inline-flex h-[50px] items-center gap-2 rounded-[11px] bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29]">
            Book a Call <ArrowRight size={15} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default AIReceptionistPage;
