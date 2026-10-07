import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, MessageCircle, Clock3, Mail } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

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
  { name: "Daniel Brooks", cell: 4, tags: ["No contact · 90d"] },
  { name: "Priya Sharma", cell: 13, tags: ["High spend"] },
  { name: "Mia Thompson", cell: 9, tags: ["Service due", "VIP"] },
  { name: "James Carter", cell: 10, tags: ["VIP"] },
  { name: "Chloe Martin", cell: 2, tags: ["Service due"] },
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
      className="inline-flex h-[48px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111318] focus-visible:ring-offset-2"
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
            Use the data already in Zapla to choose who to contact, time the outreach, and create
            more business from your existing customer base.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#how-it-works"
              className="inline-flex h-[48px] items-center rounded-full border border-[#D6DCD7] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#B9C1BA]"
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16 sm:mt-20 lg:mt-20" delay={0.05}>
        <HeroCustomerScene />
      </Reveal>
    </section>
  );
}

const HERO_AUDIENCES = [
  { key: "service", label: "Service due", tone: "#DDA34B", members: [9, 2, 7, 16], more: 24 },
  { key: "vip", label: "VIP", tone: "#9B86B8", members: [9, 10, 7], more: 8 },
  { key: "spend", label: "High spend", tone: "#99A36D", members: [13, 11, 17], more: 12 },
  {
    key: "inactive",
    label: "No contact · 90d",
    tone: "#E97D62",
    members: [4, 6, 14, 18],
    more: 36,
  },
] as const;

function AudiencePill({ label }: { label: string }) {
  const audience = HERO_AUDIENCES.find((item) => item.label === label)!;
  return (
    <span
      className="shrink-0 rounded-full px-3 py-2 text-[10px] font-semibold leading-none text-[#1E2B29]"
      style={{ backgroundColor: audience.tone + "30" }}
    >
      {label}
    </span>
  );
}

function AudiencePortraits({ members, more }: { members: readonly number[]; more?: number }) {
  return (
    <div
      className="flex shrink-0 -space-x-2"
      aria-label={`${members.length}${more ? ` plus ${more} more` : ""} example contacts`}
    >
      {members.map((cell) => (
        <MarketingAvatar
          key={cell}
          cell={cell}
          size={32}
          className="border-2 border-white shadow-none"
        />
      ))}
      {more !== undefined && (
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F7F4EE] text-[9px] font-semibold text-[#1E2B29]">
          +{more}
        </span>
      )}
    </div>
  );
}

function HeroCustomerScene() {
  const reduced = !!useReducedMotion();
  const steps = [
    { label: "Send SMS reminder", Icon: MessageCircle, color: "#2563FF" },
    { label: "Wait 2 days", Icon: Clock3, color: "#1E2B29" },
    { label: "Send email if no reply", Icon: Mail, color: "#2563FF" },
  ];
  return (
    <div data-marketing-story className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="grid items-start gap-12 md:grid-cols-2 lg:grid-cols-[1.12fr_1fr_1.16fr] lg:gap-8">
        <div>
          <h3 className="mb-7 text-center text-[14px] font-medium text-[#1E2B29]">Customers</h3>
          <div className="relative isolate flex min-h-[360px] flex-col justify-center gap-3 py-2">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-5 inset-y-0 -z-10 opacity-60 blur-[36px]"
              style={{
                background:
                  "radial-gradient(ellipse at 25% 25%, #DDA34B55, transparent 65%), radial-gradient(ellipse at 80% 50%, #99A36D55, transparent 65%), radial-gradient(ellipse at 20% 85%, #9B86B855, transparent 65%)",
              }}
            />
            {HERO_CUSTOMERS.map((person, index) => {
              const focus = person.cell === 9;
              const inset = [30, 14, 0, 14, 30][index];
              return (
                <div
                  key={person.cell}
                  className={
                    "flex min-h-[62px] items-center gap-3 rounded-[12px] border bg-white px-3 py-3 " +
                    (focus
                      ? "border-[#2563FF] shadow-[0_8px_26px_-14px_rgba(37,99,255,.2)]"
                      : "border-white/80")
                  }
                  style={{
                    marginLeft: inset,
                    marginRight: focus ? 0 : 22,
                    opacity: focus ? 1 : index === 0 || index === 4 ? 0.48 : 0.66,
                  }}
                >
                  <MarketingAvatar
                    cell={person.cell}
                    size={focus ? 42 : 34}
                    className="shadow-none"
                  />
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
                    <p className="text-[12px] font-semibold text-[#1E2B29]">{person.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {person.tags.map((tag) => (
                        <AudiencePill key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="mb-7 text-center text-[14px] font-medium text-[#1E2B29]">Smart Lists</h3>
          <div className="space-y-4 pt-5">
            {HERO_AUDIENCES.map((audience) => (
              <article
                key={audience.key}
                data-smart-list={audience.key}
                className="flex min-h-[70px] flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#111318]/[0.06] bg-white px-4 py-3 shadow-[0_8px_24px_-16px_rgba(30,43,41,.14)]"
              >
                <AudiencePortraits members={audience.members} more={audience.more} />
                <AudiencePill label={audience.label} />
              </article>
            ))}
          </div>
        </div>
        <div data-outreach-example className="md:col-span-2 lg:col-span-1">
          <h3 className="mb-7 text-center text-[14px] font-medium text-[#1E2B29]">
            Automated outreach
          </h3>
          <motion.div
            initial={reduced ? false : "quiet"}
            whileInView="shown"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[18px] border border-[#111318]/[0.08] bg-white p-5 shadow-[0_18px_50px_-28px_rgba(30,43,41,.18)] sm:p-6"
          >
            <h4 className="text-[20px] font-medium tracking-[-0.035em] text-[#111318]">
              Service reminder
            </h4>
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[10px] bg-[#F7F4EE]/70 px-3 py-3">
              <AudiencePortraits members={[9, 2, 7]} />
              <AudiencePill label="Service due" />
            </div>
            <div className="relative mt-4 space-y-3">
              <div
                aria-hidden="true"
                className="absolute bottom-7 left-[24px] top-7 w-px bg-[#2563FF]/25"
              />
              {steps.map(({ label, Icon, color }, index) => (
                <motion.div
                  key={label}
                  variants={{
                    quiet: { opacity: 0.45 },
                    shown: {
                      opacity: 1,
                      transition: {
                        duration: reduced ? 0 : 0.45,
                        delay: reduced ? 0 : index * 0.65,
                      },
                    },
                  }}
                  className="relative flex min-h-[54px] items-center gap-4 rounded-[10px] border border-[#111318]/[0.04] bg-[#FCFCFA] px-4 py-3"
                >
                  <Icon size={19} strokeWidth={1.65} style={{ color }} />
                  <p className="text-[12px] font-semibold text-[#1E2B29]">{label}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 border-t border-[#111318]/[0.08] pt-4 text-[11px] leading-[1.8] text-[#1E2B29]/65">
              SMS · Email · Voicemail · Social DMs · AI calls
            </p>
          </motion.div>
        </div>
      </div>
      <p className="mt-6 text-right text-[10px] text-[#1E2B29]/45">Example audiences</p>
    </div>
  );
}

function SignalScene() {
  const signals = [
    { label: "Last service", value: "6 months ago", tone: "#E97D62" },
    { label: "Location", value: "Sydney", tone: "#9B86B8" },
    { label: "Engagement", value: "Quote viewed", tone: "#99A36D" },
    { label: "Lifecycle", value: "Due again", tone: "#DDA34B" },
  ] as const;

  return (
    <section
      id="how-it-works"
      className="bg-[#F7F4EE] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <Reveal>
          <div
            className="max-w-[560px] text-[40px] font-medium leading-[1.01] tracking-[-0.052em] text-[#1B1F1C] sm:text-[49px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            A customer is more than a name in a list.
          </div>
          <p className="mt-6 max-w-[470px] text-[14px] leading-[1.78] text-[#6A716B]">
            Every interaction leaves context behind. Zapla can use that context to decide when a
            customer belongs in a campaign.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mx-auto max-w-[580px]">
            <div className="flex items-center gap-5 border-b border-[#DADFD6] pb-7">
              <MarketingAvatar cell={9} size={68} />
              <div>
                <p className="text-[23px] font-medium tracking-[-0.035em]">Mia Thompson</p>
                <p className="mt-2 text-[13px] text-[#69716B]">
                  The context behind the next campaign
                </p>
              </div>
            </div>
            <dl className="divide-y divide-[#DADFD6]">
              {signals.map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-center justify-between gap-6 py-5 text-[14px]"
                >
                  <dt className="text-[#69716B]">{signal.label}</dt>
                  <dd
                    className="font-semibold"
                    style={{ color: signal.label === "Lifecycle" ? "#2563FF" : "#1E2B29" }}
                  >
                    {signal.value}
                  </dd>
                </div>
              ))}
            </dl>
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
                    <div className="pt-1 text-[9px] font-bold tracking-[0.16em] text-[#9A9F9A]">
                      {label}
                    </div>
                    <div className="text-[14px] leading-[1.6] text-[#454C46]">{copy}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col gap-7 overflow-hidden bg-[#F7F4EE] p-7 sm:p-10 lg:block lg:min-h-[520px]">
              <div className="lg:absolute lg:left-[8%] lg:top-[12%]">
                <MarketingAvatar
                  cell={9}
                  size={94}
                  className="border-[3px] border-white shadow-[0_16px_34px_rgba(46,36,28,.14)]"
                />
                <div className="mt-3 text-[11px] font-semibold text-[#3D433E]">Mia Thompson</div>
              </div>

              <div className="max-w-[250px] lg:absolute lg:left-[8%] lg:top-[48%]">
                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8C928D]">
                  Customer context
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Existing customer", item.label, "Relevant now"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3 py-2 text-[9px] font-semibold text-[#4D554F] shadow-[0_8px_22px_rgba(0,0,0,.05)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full lg:absolute lg:right-[7%] lg:top-[17%] lg:w-[260px] bg-[#18191C] p-6 text-white shadow-[0_25px_65px_rgba(0,0,0,.18)] lg:w-[300px]">
                <div
                  className="text-[9px] font-bold uppercase tracking-[0.15em]"
                  style={{ color: item.tone }}
                >
                  Automation
                </div>
                <div className="mt-3 text-[20px] font-semibold tracking-[-0.03em]">
                  {item.action}
                </div>
                <div className="mt-6 text-[10px] leading-[1.7] text-white/46">
                  Triggered when the customer context and timing match.
                </div>
              </div>

              <div className="w-full lg:absolute lg:bottom-[10%] lg:right-[12%] lg:w-[220px] bg-white px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,.09)]">
                <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#969C97]">
                  Next action
                </div>
                <div className="mt-2 text-[14px] font-semibold text-[#282E29]">
                  {item.destination}
                </div>
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

        <Reveal className="mt-14" delay={0.05}>
          <div className="grid gap-10 border-t border-white/20 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[13px] font-semibold text-[#DDA34B]">Campaigns</p>
              <h3 className="mt-4 text-[29px] font-medium tracking-[-0.035em]">
                One initiative. The whole story.
              </h3>
              <p className="mt-5 max-w-[420px] text-[14px] leading-[1.75] text-white/70">
                Connect the audience, outreach and booking page to the campaign. See the customer
                activity behind the result, without piecing it together across separate tools.
              </p>
            </div>
            <div className="overflow-hidden rounded-[16px] bg-[#FCFCFA] p-6 text-[#1E2B29] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[22px] font-medium tracking-[-0.035em]">Service recall</h3>
                <ZaplaPetal size={28} />
              </div>
              <p className="mt-2 text-[12px] text-[#69716B]">Illustrative campaign attribution</p>
              <dl className="mt-7 divide-y divide-[#DFE4DB] text-[13px]">
                {[
                  ["Audience", "Past customers due for service"],
                  ["Outreach", "Service reminder by SMS"],
                  ["Destination", "Service booking page"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[86px_1fr] gap-4 py-4">
                    <dt className="text-[#69716B]">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex items-center gap-4 border-l-[3px] border-[#99A36D] pl-4">
                <MarketingAvatar cell={9} size={42} />
                <div>
                  <p className="text-[14px] font-semibold">Mia booked her next service.</p>
                  <p className="mt-1 text-[12px] text-[#69716B]">Attributed to Service recall</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
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
                    <p className="max-w-[700px] pb-5 pr-10 text-[13px] leading-[1.7] text-[#6C736D]">
                      {item.a}
                    </p>
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
