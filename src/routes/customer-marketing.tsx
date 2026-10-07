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
          "Use the data already in Zapla to decide who to contact, reach them at the right time, and create more business from the customers you already have.",
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
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const HERO_CUSTOMERS = [
  {
    name: "Mia Thompson",
    meta: "Sydney",
    cell: 9,
    tags: ["Service due", "High spend"],
  },
  {
    name: "Daniel Brooks",
    meta: "Melbourne",
    cell: 4,
    tags: ["VIP", "Past customer"],
  },
  {
    name: "Priya Sharma",
    meta: "Sydney",
    cell: 13,
    tags: ["Quote viewed", "Sydney"],
  },
  {
    name: "Chloe Martin",
    meta: "Brisbane",
    cell: 2,
    tags: ["No booking 90 days", "High spend"],
  },
] as const;

const HERO_STORY = [
  {
    eyebrow: "Smart List",
    title: "Service due this week",
    copy: "Built from service history, timing and customer context.",
    tone: "#DDA34B",
    type: "list",
  },
  {
    eyebrow: "Automation",
    title: "Reach them while it matters",
    copy: "Choose the sequence once. Zapla handles the next step.",
    tone: "#99A36D",
    type: "outreach",
  },
  {
    eyebrow: "Customer action",
    title: "Give them somewhere to act",
    copy: "Forms, pages and bookings stay connected to the same initiative.",
    tone: "#9B86B8",
    type: "action",
  },
  {
    eyebrow: "Campaigns",
    title: "See what happened next",
    copy: "Track engagement, conversion and won business back to the campaign.",
    tone: "#2563FF",
    type: "results",
  },
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

function MarketingAvatar({
  cell,
  size,
  muted = false,
  className = "",
}: {
  cell: number;
  size: number;
  muted?: boolean;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className={
        "block shrink-0 overflow-hidden rounded-full border border-black/[0.06] shadow-[0_10px_28px_rgba(46,36,28,.10)] " +
        className
      }
      style={{
        width: size,
        height: size,
        backgroundImage: "url(" + PORTRAIT_SHEET + ")",
        backgroundPosition: (column / 5) * 100 + "% " + (row / 3) * 100 + "%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
        filter: muted ? "grayscale(.72) saturate(.62)" : undefined,
      }}
      aria-hidden="true"
    />
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

      <Reveal className="mt-20 sm:mt-24 lg:mt-28" delay={0.05}>
        <HeroCustomerScene />
      </Reveal>
    </section>
  );
}

function HeroCustomerScene() {
  const reduced = !!useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStep(0);
      return;
    }

    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % HERO_STORY.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [reduced]);

  const railStep = 126;
  const transition = { duration: reduced ? 0 : 0.56, ease: EASE };

  return (
    <div className="relative mx-auto min-h-[560px] max-w-[1240px] px-4 pb-10 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute inset-x-[2%] bottom-[2%] top-[9%] rounded-[42px] bg-[#F7F2EA]" />
      <div className="pointer-events-none absolute left-[7%] top-[20%] h-[300px] w-[360px] rounded-full bg-[#DCE0CC]/55 blur-[115px]" />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[18%] h-[260px] w-[390px] rounded-full bg-[#E7D8C5]/70 blur-[105px]"
        animate={{ y: step * 16 }}
        transition={transition}
      />

      <div className="relative grid min-h-[520px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        <div className="relative mx-auto h-[410px] w-full max-w-[390px] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#F7F2EA] via-[#F7F2EA]/92 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#F7F2EA] via-[#F7F2EA]/92 to-transparent" />

          <div className="absolute inset-x-5 top-[34px] space-y-3">
            {HERO_CUSTOMERS.map((customer, index) => {
              const active = index === 1;
              const muted = !active;
              const tagTones = [
                ["#F4DED5", "#9D573F"],
                ["#E8EBD8", "#687249"],
                ["#EEE5F2", "#735D83"],
                ["#E7D8C5", "#765F46"],
              ] as const;

              return (
                <motion.div
                  key={customer.name}
                  animate={{
                    opacity: active ? 1 : index === 0 || index === HERO_CUSTOMERS.length - 1 ? 0.34 : 0.58,
                    scale: active ? 1.015 : 0.96,
                    y: active ? 0 : 0,
                    filter: active ? "blur(0px)" : "blur(0.45px)",
                  }}
                  transition={transition}
                  className={
                    "relative flex min-h-[78px] items-center gap-3 rounded-[18px] border bg-white/95 px-4 py-3 " +
                    (active
                      ? "border-[#AFC3FF] shadow-[0_24px_58px_rgba(37,99,255,.12)]"
                      : "border-[#E5E0D8] shadow-[0_12px_28px_rgba(46,36,28,.055)]")
                  }
                >
                  <MarketingAvatar
                    cell={customer.cell}
                    size={48}
                    muted={muted}
                    className={active ? "border-2 border-white" : "border-2 border-white/80"}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold tracking-[-0.018em] text-[#252A26]">
                      {customer.name}
                    </div>
                    <div className="mt-0.5 text-[9px] text-[#8C938D]">{customer.meta}</div>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {customer.tags.map((tag, tagIndex) => {
                        const [backgroundColor, color] = tagTones[(index + tagIndex) % tagTones.length];
                        return (
                          <span
                            key={tag}
                            className="rounded-full px-2.5 py-1 text-[8px] font-semibold"
                            style={{ backgroundColor, color }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative h-[430px] overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[88px] bg-gradient-to-b from-[#F7F2EA] via-[#F7F2EA]/92 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[96px] bg-gradient-to-t from-[#F7F2EA] via-[#F7F2EA]/92 to-transparent" />

          <motion.div
            className="absolute inset-x-3 top-[148px] space-y-[18px] sm:inset-x-8"
            animate={{ y: -(step * railStep) }}
            transition={transition}
          >
            {HERO_STORY.map((item, index) => {
              const distance = Math.abs(index - step);
              const active = index === step;

              return (
                <motion.div
                  key={item.title}
                  animate={{
                    opacity: active ? 1 : distance === 1 ? 0.34 : 0.16,
                    scale: active ? 1 : distance === 1 ? 0.95 : 0.91,
                    filter: active ? "blur(0px)" : distance === 1 ? "blur(0.7px)" : "blur(1.8px)",
                  }}
                  transition={transition}
                  className={
                    "relative min-h-[108px] rounded-[22px] border bg-white/96 px-5 py-4 sm:px-6 " +
                    (active
                      ? "border-[#CFC7BC] shadow-[0_28px_66px_rgba(46,36,28,.11)]"
                      : "border-[#E5E0D8] shadow-[0_12px_28px_rgba(46,36,28,.045)]")
                  }
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[4px] rounded-l-[22px]"
                    style={{ backgroundColor: item.tone }}
                  />

                  <div className="flex min-h-[76px] items-center gap-5">
                    <div className="min-w-0 flex-1">
                      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8A908B]">
                        {item.eyebrow}
                      </div>
                      <div className="mt-2 text-[18px] font-semibold tracking-[-0.03em] text-[#252A26]">
                        {item.title}
                      </div>
                      <div className="mt-1 max-w-[390px] text-[9px] leading-[1.55] text-[#7A817B]">
                        {item.copy}
                      </div>
                    </div>

                    {item.type === "list" ? (
                      <div className="flex shrink-0 -space-x-2">
                        {[9, 4, 13, 2].map((cell) => (
                          <MarketingAvatar key={cell} cell={cell} size={34} className="border-[3px] border-white" />
                        ))}
                      </div>
                    ) : null}

                    {item.type === "outreach" ? (
                      <div className="hidden shrink-0 items-center gap-3 text-[8px] font-semibold text-[#59615C] sm:flex">
                        <span>SMS</span><span className="text-[#C2B7AA]">·</span>
                        <span>Email</span><span className="text-[#C2B7AA]">·</span>
                        <span>AI outbound</span><span className="text-[#C2B7AA]">·</span>
                        <span>Social DM</span>
                      </div>
                    ) : null}

                    {item.type === "action" ? (
                      <div className="hidden shrink-0 items-center gap-3 text-[8px] font-semibold text-[#625B66] sm:flex">
                        <span>Forms</span><span className="text-[#C7B9CA]">·</span>
                        <span>Pages</span><span className="text-[#C7B9CA]">·</span>
                        <span>Bookings</span>
                      </div>
                    ) : null}

                    {item.type === "results" ? (
                      <div className="hidden w-[150px] shrink-0 space-y-2 sm:block">
                        {[
                          ["Reached", "#DDA34B", "76%"],
                          ["Engaged", "#99A36D", "58%"],
                          ["Converted", "#2563FF", "42%"],
                        ].map(([label, tone, width]) => (
                          <div key={label}>
                            <div className="text-[7px] font-semibold text-[#858C86]">{label}</div>
                            <div className="mt-1 h-[3px] rounded-full bg-[#ECE8E1]">
                              <div className="h-full rounded-full" style={{ width, backgroundColor: tone }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-[31%] top-[210px] hidden h-[90px] w-[24%] lg:block"
          viewBox="0 0 300 90"
          preserveAspectRatio="none"
        >
          <path
            d="M 8 46 C 96 46, 150 46, 286 46"
            fill="none"
            stroke="#AFC3FF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="8" cy="46" r="4" fill="#2563FF" />
          <circle cx="286" cy="46" r="4" fill="#2563FF" />
        </svg>
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
    { label: "Engagement", value: "Quote viewed", tone: "#99A36D" },
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
                <div className="mx-auto w-fit">
                  <MarketingAvatar cell={9} size={82} className="border-[3px] border-white/80 shadow-[0_16px_34px_rgba(0,0,0,.16)]" />
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
                <MarketingAvatar cell={9} size={94} className="border-[3px] border-white shadow-[0_16px_34px_rgba(46,36,28,.14)]" />
                <div className="mt-3 text-[11px] font-semibold text-[#3D433E]">Mia Thompson</div>
              </div>

              <div className="absolute left-[8%] top-[48%] max-w-[250px]">
                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8C928D]">Customer context</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Existing customer", item.label, "Relevant now"].map((tag) => (
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

// preview-rebuild: customer-marketing-progressive-hero
