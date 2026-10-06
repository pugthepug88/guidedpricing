import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/customer-marketing")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer Marketing Software for Small Business | Zapla" },
      {
        name: "description",
        content:
          "Use the data already in Zapla to choose who to contact, time the outreach, and create more business from your existing customer base.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CustomerMarketingPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const HERO_PEOPLE = [
  { name: "Mia", initials: "MT", x: 8, y: 18, match: true, tone: "#E97D62", tag: "Service due" },
  { name: "Daniel", initials: "DK", x: 31, y: 8, match: true, tone: "#DDA34B", tag: "Sydney" },
  { name: "Sophie", initials: "SN", x: 40, y: 56, match: true, tone: "#9B86B8", tag: "Subscribed" },
  { name: "Priya", initials: "PS", x: 8, y: 64, match: false, tone: "#99A36D", tag: "Active" },
  { name: "Lucas", initials: "LM", x: 55, y: 20, match: false, tone: "#C96C85", tag: "Newcastle" },
  { name: "Olivia", initials: "OL", x: 61, y: 69, match: false, tone: "#6F827A", tag: "Commercial" },
] as const;

const MOMENTS = [
  {
    label: "Service due",
    tone: "#DDA34B",
    title: "A customer is due again.",
    audience: "Past customers with the right service history",
    timing: "When the return window arrives",
    action: "Start the recall outreach",
    destination: "Booking page",
  },
  {
    label: "Rate change",
    tone: "#9B86B8",
    title: "Something changes for a specific group.",
    audience: "Only customers tied to the affected product",
    timing: "When the change becomes relevant",
    action: "Send the update and next step",
    destination: "Form or appointment",
  },
  {
    label: "New availability",
    tone: "#E97D62",
    title: "You have capacity to fill.",
    audience: "Customers most likely to want the opening",
    timing: "When availability appears",
    action: "Reach the selected audience",
    destination: "Booking page",
  },
  {
    label: "New service",
    tone: "#99A36D",
    title: "You have something new to sell.",
    audience: "Existing customers with relevant history",
    timing: "At launch",
    action: "Run a targeted campaign",
    destination: "Landing page",
  },
] as const;

const FAQS = [
  {
    q: "What is Customer Marketing in Zapla?",
    a: "It is the proactive side of Zapla. Use the customer information already in your CRM to decide who should hear from you, when the timing makes sense, what should happen next, and what the campaign produced.",
  },
  {
    q: "Can I build audiences from tags or Smart Lists?",
    a: "Yes. Tags, fields, filters, Smart Lists and subscription lists can be used to define the customer group you want to reach.",
  },
  {
    q: "Can the outreach happen automatically?",
    a: "Yes. Automations can use timing, triggers and customer conditions to run multi-step outreach by SMS or email.",
  },
  {
    q: "What does the Campaigns area do?",
    a: "Campaigns is the tracking and attribution layer, not the send tool. It groups the assets behind an initiative and shows members, activity and performance.",
  },
  {
    q: "Can forms, pages and bookings be part of a campaign?",
    a: "Yes. Forms, landing pages, funnels and calendars can be attached to the campaign so the next action stays connected.",
  },
  {
    q: "Is this the same as Reopen?",
    a: "No. Reopen is specifically for dormant enquiries and stale opportunities. Customer Marketing is broader proactive marketing to relevant groups in your customer base.",
  },
] as const;

function CustomerMarketingPage() {
  return (
    <main
      data-page="customer-marketing"
      className="min-h-screen overflow-x-hidden bg-[#FCFCFA] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <SignalScene />
      <MomentScene />
      <CampaignScene />
      <ConnectedPoster />
      <Faq />
      <GrowthCta />
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
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.56, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#111318] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="bg-[#FCFCFA] pt-[108px] sm:pt-[118px] lg:pt-[126px]">
      <div className="px-5 sm:px-10 lg:px-16">
        <Reveal className="mx-auto max-w-[970px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58706F]">
            Customer Marketing
          </div>

          {/* LOCKED: do not change hero headline unless Andrew explicitly reopens copy. */}
          <h1
            className="mx-auto mt-4 max-w-[950px] text-[40px] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[50px] lg:text-[62px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn the customers you already know into
            <span className="text-[#2563FF]"> your next campaign.</span>
          </h1>

          {/* LOCKED: do not change hero subheading unless Andrew explicitly reopens copy. */}
          <p className="mx-auto mt-5 max-w-[760px] text-[14px] leading-[1.72] text-[#666C67] sm:text-[16px]">
            Use the data already in Zapla to choose who to contact, time the outreach, and create more business from your existing customer base.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#how-it-works"
              className="inline-flex h-[48px] items-center rounded-[10px] border border-[#D6DCD7] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#B9C1BA]"
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14 sm:mt-16" delay={0.05}>
        <HeroCustomerScene />
      </Reveal>
    </section>
  );
}

function HeroCustomerScene() {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 4 : 0);

  useEffect(() => {
    if (reduced) {
      setPhase(4);
      return;
    }

    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1) % 5);
    }, 1450);

    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative min-h-[650px] overflow-hidden bg-[#17191D] text-white sm:min-h-[700px] lg:min-h-[760px]">
      <div className="relative mx-auto min-h-[650px] max-w-[1320px] px-5 py-12 sm:min-h-[700px] sm:px-10 sm:py-14 lg:min-h-[760px] lg:px-16 lg:py-16">
        <div className="grid min-h-[550px] items-center gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div className="relative z-20 max-w-[420px]">
            <div className="text-[12px] font-semibold tracking-[-0.01em] text-white/58">
              Your customer base is already full of signals.
            </div>

            <h2
              className="mt-4 text-[39px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[48px] lg:text-[54px]"
              style={{ fontFamily: DISPLAY }}
            >
              See the signals.
              <br />
              <span className="text-[#AFC3FF]">Act on the moment.</span>
            </h2>

            <p className="mt-6 max-w-[370px] text-[13px] leading-[1.75] text-white/48">
              Customer history, tags and timing turn a broad database into the people worth contacting now.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[0, 1, 2, 3, 4].map((step) => (
                <motion.span
                  key={step}
                  animate={{
                    width: phase === step ? 34 : 8,
                    opacity: phase >= step ? 1 : 0.28,
                  }}
                  transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
                  className="h-[3px] rounded-full bg-white"
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[440px] sm:min-h-[520px] lg:min-h-[610px]">
            {HERO_PEOPLE.map((person, index) => {
              const dim = phase >= 2 && !person.match;
              const pull = phase >= 2 && person.match;

              return (
                <motion.div
                  key={person.name}
                  className="absolute"
                  style={{ left: `${person.x}%`, top: `${person.y}%` }}
                  animate={{
                    x: pull ? 20 + index * 4 : 0,
                    y: pull ? (index % 2 === 0 ? -8 : 8) : 0,
                    opacity: dim ? 0.15 : 1,
                    scale: dim ? 0.86 : pull ? 1.07 : 1,
                    filter: dim ? "blur(2px)" : "blur(0px)",
                  }}
                  transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
                >
                  <div className="relative">
                    <div
                      className="flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/16 text-[15px] font-semibold text-white shadow-[0_18px_42px_rgba(0,0,0,.28)] sm:h-[90px] sm:w-[90px]"
                      style={{ backgroundColor: person.tone }}
                    >
                      {person.initials}
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        opacity: phase >= 1 ? 1 : 0,
                        y: phase >= 1 ? 0 : 8,
                      }}
                      transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : index * 0.035 }}
                      className="absolute left-[54px] top-[-10px] whitespace-nowrap rounded-full bg-white px-3 py-2 text-[9px] font-semibold text-[#272B28] shadow-[0_12px_30px_rgba(0,0,0,.22)] sm:left-[66px]"
                    >
                      {person.tag}
                    </motion.div>

                    <div className="mt-3 text-center text-[10px] font-semibold text-white/68">{person.name}</div>
                  </div>
                </motion.div>
              );
            })}

            <AnimatePresence>
              {phase >= 3 ? (
                <motion.div
                  key="timing"
                  initial={reduced ? false : { opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 12 }}
                  transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
                  className="absolute right-[7%] top-[27%] z-20 max-w-[210px]"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#DDA34B]">Timing signal</div>
                  <div
                    className="mt-2 text-[30px] font-medium leading-[1] tracking-[-0.045em] text-white"
                    style={{ fontFamily: DISPLAY }}
                  >
                    Due this week.
                  </div>
                  <div className="mt-3 text-[10px] leading-[1.6] text-white/45">
                    The audience is relevant now, not just relevant in general.
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {phase >= 4 ? (
                <motion.div
                  key="campaign"
                  initial={reduced ? false : { opacity: 0, x: 34, y: 12 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 34, y: 12 }}
                  transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
                  className="absolute bottom-[6%] right-[2%] z-30 w-[285px] overflow-hidden rounded-[22px] bg-white text-[#17191D] shadow-[0_26px_70px_rgba(0,0,0,.30)] sm:w-[330px]"
                >
                  <div className="px-6 py-5">
                    <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#2563FF]">Campaign</div>
                    <div className="mt-2 text-[20px] font-semibold tracking-[-0.035em]">Service availability</div>
                    <div className="mt-4 text-[11px] leading-[1.65] text-[#6E746F]">
                      Reach customers who are due, local and subscribed.
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E5E8E5] px-6 py-4">
                    <span className="text-[9px] font-semibold text-[#7B827C]">Audience ready</span>
                    <span className="text-[10px] font-semibold text-[#111318]">Run outreach →</span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.div
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              className="absolute bottom-[16%] left-[24%] hidden text-[10px] font-semibold uppercase tracking-[0.15em] text-[#AFC3FF] sm:block"
            >
              Relevant now
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalScene() {
  const reduced = !!useReducedMotion();
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setFocus((current) => (current + 1) % 4), 1850);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const signals = [
    { label: "Last service", value: "6 months ago", tone: "#E97D62" },
    { label: "Location", value: "Sydney", tone: "#9B86B8" },
    { label: "Status", value: "Subscribed", tone: "#99A36D" },
    { label: "Lifecycle", value: "Due again", tone: "#DDA34B" },
  ] as const;

  return (
    <section id="how-it-works" className="bg-[#F7F4EE] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <Reveal>
          <div
            className="max-w-[560px] text-[40px] font-medium leading-[1.01] tracking-[-0.052em] text-[#1B1F1C] sm:text-[49px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            A customer is more than a name in a list.
          </div>
          <p className="mt-6 max-w-[470px] text-[14px] leading-[1.78] text-[#6A716B]">
            Every interaction leaves context behind. Zapla can use that context to decide when a customer belongs in a campaign.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative mx-auto min-h-[560px] max-w-[620px]">
            <div className="absolute left-1/2 top-1/2 flex h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2563FF] shadow-[0_30px_70px_rgba(37,99,255,.20)] sm:h-[240px] sm:w-[240px]">
              <div className="text-center">
                <div className="mx-auto flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#E97D62] text-[19px] font-semibold text-white">
                  MT
                </div>
                <div className="mt-4 text-[16px] font-semibold text-white">Mia Thompson</div>
                <div className="mt-1 text-[10px] text-white/58">Existing customer</div>
              </div>
            </div>

            {signals.map((signal, index) => {
              const positions = [
                "left-[2%] top-[12%]",
                "right-[1%] top-[18%]",
                "left-[0%] bottom-[12%]",
                "right-[2%] bottom-[9%]",
              ];
              const active = focus === index || reduced;

              return (
                <motion.div
                  key={signal.label}
                  className={"absolute " + positions[index]}
                  animate={{
                    scale: active ? 1.06 : 0.96,
                    opacity: active ? 1 : 0.46,
                    y: active ? 0 : 4,
                  }}
                  transition={{ duration: reduced ? 0 : 0.32, ease: EASE }}
                >
                  <div className="min-w-[180px] rounded-[20px] bg-white px-5 py-4 shadow-[0_18px_44px_rgba(42,36,30,.08)] sm:min-w-[205px]">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8B918C]">
                      {signal.label}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: signal.tone }} />
                      <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#272C28]">{signal.value}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <AnimatePresence mode="wait">
              <motion.div
                key={focus}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
                className="absolute left-1/2 top-[3%] -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold text-[#5C655E]"
              >
                Zapla reads the context, not just the contact.
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MomentScene() {
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const item = MOMENTS[active];

  return (
    <section className="bg-[#FCFCFA] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-[#DDE1DD] pb-4">
          {MOMENTS.map((moment, index) => (
            <button
              key={moment.label}
              type="button"
              onClick={() => setActive(index)}
              className={
                "relative pb-3 text-[13px] font-semibold transition-colors " +
                (active === index ? "text-[#111318]" : "text-[#8A908B]")
              }
            >
              {moment.label}
              <motion.span
                animate={{ scaleX: active === index ? 1 : 0 }}
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                style={{ backgroundColor: moment.tone }}
              />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
            className="grid gap-12 pt-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20"
          >
            <div>
              <div
                className="max-w-[510px] text-[40px] font-medium leading-[1.01] tracking-[-0.052em] text-[#1A1E1B] sm:text-[48px]"
                style={{ fontFamily: DISPLAY }}
              >
                {item.title}
              </div>

              <div className="mt-10 space-y-7">
                {[
                  ["WHO", item.audience],
                  ["WHEN", item.timing],
                  ["THEN", item.action],
                ].map(([label, copy]) => (
                  <div key={label} className="grid grid-cols-[56px_1fr] gap-5">
                    <div className="pt-1 text-[9px] font-bold tracking-[0.16em] text-[#9A9F9A]">{label}</div>
                    <div className="text-[14px] leading-[1.6] text-[#454C46]">{copy}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[470px] overflow-hidden bg-[#F2F0EB] p-7 sm:min-h-[520px] sm:p-10">
              <div className="absolute left-[8%] top-[12%]">
                <div className="flex h-[94px] w-[94px] items-center justify-center rounded-full text-[18px] font-semibold text-white" style={{ backgroundColor: item.tone }}>
                  MT
                </div>
                <div className="mt-3 text-[11px] font-semibold text-[#3D433E]">Mia Thompson</div>
              </div>

              <div className="absolute left-[8%] top-[48%] max-w-[250px]">
                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8C928D]">Customer context</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Existing customer", item.label, "Subscribed"].map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-2 text-[9px] font-semibold text-[#4D554F] shadow-[0_8px_22px_rgba(0,0,0,.05)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute right-[7%] top-[17%] w-[260px] bg-[#18191C] p-6 text-white shadow-[0_25px_65px_rgba(0,0,0,.18)] sm:w-[300px]">
                <div className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: item.tone }}>
                  Automation
                </div>
                <div className="mt-3 text-[20px] font-semibold tracking-[-0.03em]">{item.action}</div>
                <div className="mt-6 text-[10px] leading-[1.7] text-white/46">
                  Triggered when the customer context and timing match.
                </div>
              </div>

              <div className="absolute bottom-[10%] right-[12%] w-[220px] bg-white px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,.09)]">
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#969C97]">Next action</div>
                <div className="mt-2 text-[14px] font-semibold text-[#282E29]">{item.destination}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function CampaignScene() {
  return (
    <section className="bg-[#1E2B29] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="max-w-[920px]">
          <div
            className="text-[42px] font-medium leading-[0.99] tracking-[-0.055em] sm:text-[53px] lg:text-[62px]"
            style={{ fontFamily: DISPLAY }}
          >
            Sending is only half the job.
            <span className="block text-[#DDA34B]">You should know what happened next.</span>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={0.05}>
          <div className="grid overflow-hidden bg-[#F8F8F6] text-[#202420] lg:grid-cols-[0.32fr_0.68fr]">
            <div className="border-b border-[#E2E4E0] bg-[#F0EFEA] p-7 lg:border-b-0 lg:border-r lg:p-9">
              <img src="/concept/zapla-logo-dark.svg" alt="Zapla" className="h-[23px] w-auto" />
              <div className="mt-10 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8C928D]">Campaign</div>
              <div className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">Service availability</div>

              <div className="mt-9 space-y-5">
                {["SMS automation", "Booking page", "Customer Smart List"].map((asset) => (
                  <div key={asset} className="border-t border-[#D9DCD8] pt-4 text-[11px] font-semibold text-[#59605A]">
                    {asset}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-7 border-b border-[#E1E4E0] px-6 text-[10px] font-semibold text-[#8A908B] sm:px-8">
                <div className="py-5">Assets</div>
                <div className="py-5">Members</div>
                <div className="py-5">Activity</div>
                <div className="border-b-2 border-[#111318] py-5 text-[#111318]">Performance</div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-px bg-[#E0E3DF] sm:grid-cols-4">
                  {["Reached", "Engaged", "Converted", "Won deals"].map((metric) => (
                    <div key={metric} className="min-h-[130px] bg-white p-5">
                      <div className="text-[10px] font-semibold text-[#5E655F]">{metric}</div>
                      <div className="mt-10 h-[3px] w-12 bg-[#99A36D]" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-8 sm:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8D938E]">Return</div>
                    <div className="mt-4 grid gap-px bg-[#E0E3DF] sm:grid-cols-3">
                      {["Collected", "Costs", "Return on cost"].map((metric) => (
                        <div key={metric} className="min-h-[100px] bg-[#FFF9EE] p-4">
                          <div className="text-[9px] text-[#7C6D55]">{metric}</div>
                          <div className="mt-7 h-[2px] w-8 bg-[#DDA34B]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end">
                    <p className="max-w-[320px] text-[12px] leading-[1.75] text-[#737A74]">
                      Campaigns groups the assets, members and activity behind an initiative so the result stays connected to the work that created it.
                    </p>
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

function ConnectedPoster() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <Reveal className="mx-auto max-w-[1180px]">
        <div
          className="text-[43px] font-medium leading-[1.01] tracking-[-0.055em] text-[#1A1F1B] sm:text-[56px] lg:text-[72px]"
          style={{ fontFamily: DISPLAY }}
        >
          <span className="text-[#2563FF]">Know who.</span>
          <br />
          <span className="text-[#9B86B8]">Know when.</span>
          <br />
          <span className="text-[#99A36D]">Run the outreach.</span>
          <br />
          <span className="text-[#DDA34B]">See what came back.</span>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[#DDE1DD] pt-7 sm:grid-cols-[1fr_1fr] sm:gap-14">
          <p className="max-w-[500px] text-[14px] leading-[1.75] text-[#666D67]">
            CRM context, Smart Lists, Automations, forms, bookings and Campaigns stay connected inside Zapla.
          </p>
          <p className="max-w-[500px] text-[14px] leading-[1.75] text-[#666D67] sm:justify-self-end">
            No exporting contacts into one tool, sending from another, then guessing what happened in a third.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
        <Reveal className="max-w-[320px]">
          <h2
            className="text-[31px] font-medium leading-[1.03] tracking-[-0.043em] sm:text-[36px]"
            style={{ fontFamily: DISPLAY }}
          >
            The practical stuff.
          </h2>
        </Reveal>

        <div className="border-y border-[#D9D6CF]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-b border-[#D9D6CF] last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  onClick={() => setOpen(active ? null : index)}
                  aria-expanded={active}
                >
                  <span className="text-[14px] font-semibold tracking-[-0.015em] text-[#282E2A] sm:text-[15px]">
                    {item.q}
                  </span>
                  <motion.span
                    className="flex h-8 w-8 shrink-0 items-center justify-center"
                    animate={reduced ? undefined : { rotate: active ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  >
                    <ChevronDown size={15} strokeWidth={1.6} />
                  </motion.span>
                </button>

                <motion.div
                  className="grid overflow-hidden"
                  initial={false}
                  animate={{ gridTemplateRows: active ? "1fr" : "0fr", opacity: active ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[700px] pb-5 pr-10 text-[13px] leading-[1.7] text-[#6C736D]">{item.a}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// LOCKED FOR NOW: preserve the final CTA section until Andrew explicitly reopens it.
function GrowthCta() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto grid max-w-[1180px] gap-10 border-t border-[#DFE3DF] pt-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
        <div className="max-w-[760px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">
            Zapla Growth
          </div>
          <h2
            className="mt-3 text-[33px] font-medium leading-[1.03] tracking-[-0.046em] text-[#242A26] sm:text-[40px] lg:text-[45px]"
            style={{ fontFamily: DISPLAY }}
          >
            Put your customer data to work.
          </h2>
          <p className="mt-4 max-w-[620px] text-[14px] leading-[1.7] text-[#69706A]">
            Customer Marketing is part of Zapla Growth.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white"
          >
            View Growth pricing <ArrowRight size={14} />
          </a>
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D7DDD8] px-6 text-[13px] font-semibold text-[#1E2B29]"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}
