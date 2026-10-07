import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Clock3,
  Mail,
  Voicemail,
  MessagesSquare,
  PhoneCall,
  Pause,
  Play,
} from "lucide-react";
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
    q: "What can I see after a campaign?",
    a: "See the audience and customer activity connected to each campaign, including responses and linked bookings.",
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

      <div className="mt-16 sm:mt-20 lg:mt-20">
        <HeroCustomerScene />
      </div>
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

function AudiencePortraits({
  members,
  more,
  size = 32,
}: {
  members: readonly number[];
  more?: number;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 -space-x-2"
      aria-label={`${members.length}${more ? ` plus ${more} more` : ""} contacts`}
    >
      {members.map((cell) => (
        <MarketingAvatar
          key={cell}
          cell={cell}
          size={size}
          className="border-2 border-white shadow-none"
        />
      ))}
      {more !== undefined && (
        <span
          style={{ width: size, height: size }}
          className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#F7F4EE] text-[9px] font-semibold text-[#1E2B29]"
        >
          +{more}
        </span>
      )}
    </div>
  );
}

function HeroCustomerScene() {
  const reduced = !!useReducedMotion();
  const customerStack = useRef<HTMLDivElement>(null);
  const customersVisible = useInView(customerStack, { amount: 0.5 });
  const [customerOffset, setCustomerOffset] = useState(0);
  const audienceRow = useRef<HTMLDivElement>(null);
  const visible = useInView(audienceRow, { amount: 0.5 });
  const [audienceIndex, setAudienceIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || !visible || paused) return;
    const timer = window.setInterval(
      () => setAudienceIndex((value) => (value + 1) % HERO_AUDIENCES.length),
      3800,
    );
    return () => window.clearInterval(timer);
  }, [reduced, visible, paused]);
  useEffect(() => {
    if (reduced || !customersVisible || paused) return;
    const timer = window.setInterval(() => setCustomerOffset((value) => value + 1), 3800);
    return () => window.clearInterval(timer);
  }, [reduced, customersVisible, paused]);
  const customerSlots = reduced ? [0, 1, 2, 3, 4] : [-1, 0, 1, 2, 3, 4, 5];
  const audience = HERO_AUDIENCES[reduced ? 0 : audienceIndex];
  const steps = [
    { label: "Send SMS", Icon: MessageCircle },
    { label: "Wait 2 days", Icon: Clock3 },
    { label: "Email if no reply", Icon: Mail },
  ];
  const channels = [
    { label: "SMS", Icon: MessageCircle, tone: "#DDA34B" },
    { label: "Email", Icon: Mail, tone: "#9B86B8" },
    { label: "Voicemail", Icon: Voicemail, tone: "#E97D62" },
    { label: "Social DMs", Icon: MessagesSquare, tone: "#99A36D" },
    { label: "AI calls", Icon: PhoneCall, tone: "#C96C85" },
  ];
  const positions = [
    "left-0 top-[98px] w-[68%]",
    "right-0 top-0 w-[53%]",
    "left-0 top-[250px] w-[53%]",
    "right-0 top-[286px] w-[59%]",
  ];
  return (
    <div data-marketing-story className="mx-auto max-w-[1360px] px-5 pb-20 sm:px-8 sm:pb-24">
      <div className="grid items-start gap-12 md:grid-cols-2 lg:grid-cols-[1.05fr_1.1fr_1fr] lg:gap-7">
        <div>
          <h3 className="mb-7 h-5 text-center text-[14px] font-medium text-[#1E2B29]">Customers</h3>
          <div className="relative isolate">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-5 inset-y-0 -z-10 opacity-60 blur-[36px]"
              style={{
                background:
                  "radial-gradient(ellipse at 25% 25%, #DDA34B55, transparent 65%), radial-gradient(ellipse at 80% 50%, #99A36D55, transparent 65%), radial-gradient(ellipse at 20% 85%, #9B86B855, transparent 65%)",
              }}
            />
            <div
              ref={customerStack}
              data-customer-carousel
              className="relative h-[402px] overflow-hidden"
            >
              <AnimatePresence initial={false}>
                {customerSlots.map((slot) => {
                  const entry = (reduced ? 0 : customerOffset) + slot;
                  const person =
                    HERO_CUSTOMERS[
                      ((entry % HERO_CUSTOMERS.length) + HERO_CUSTOMERS.length) %
                        HERO_CUSTOMERS.length
                    ];
                  const distance = Math.abs(slot - 2);
                  const focus = distance === 0;
                  return (
                    <motion.div
                      key={entry}
                      data-customer-card={person.name}
                      aria-hidden={slot < 0 || slot > 4}
                      initial={false}
                      animate={{
                        y: 8 + slot * 78,
                        x: distance === 0 ? 0 : distance === 1 ? 14 : 30,
                        opacity: slot < 0 || slot > 4 ? 0 : focus ? 1 : distance === 1 ? 0.72 : 0.5,
                        borderColor: focus ? "#2563FF" : "#DDE1DC",
                        width: focus ? "100%" : "calc(100% - 52px)",
                      }}
                      exit={{ y: -70, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
                      className="absolute left-0 top-0 flex min-h-[68px] items-center gap-3 rounded-[12px] border bg-white px-3 py-3 shadow-[0_6px_16px_rgba(30,43,41,.07)]"
                    >
                      <MarketingAvatar cell={person.cell} size={40} className="shadow-none" />
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
                        <p className="text-[12px] font-semibold text-[#1E2B29]">{person.name}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {person.tags.map((tag) => (
                            <AudiencePill key={tag} label={tag} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-7 h-5 text-center text-[14px] font-medium text-[#1E2B29]">
            Smart Lists
          </h3>
          <div className="relative mx-auto h-[410px] max-w-[420px]">
            {HERO_AUDIENCES.map((list, index) => (
              <article
                key={list.key}
                data-smart-list={list.key}
                className={
                  "absolute rounded-[18px] border border-[#1E2B29]/[0.12] bg-white p-4 shadow-[0_8px_24px_rgba(30,43,41,.06)] " +
                  positions[index]
                }
              >
                <AudiencePill label={list.label} />
                <div className="mt-3">
                  <AudiencePortraits members={list.members} more={list.more} />
                </div>
              </article>
            ))}
          </div>
        </div>
        <div
          data-outreach-example
          className="md:col-span-2 md:mx-auto md:w-full md:max-w-[460px] lg:col-span-1"
        >
          <div className="mb-7 flex h-5 items-center justify-center gap-3">
            <h3 className="text-[14px] font-medium text-[#1E2B29]">Automated outreach</h3>
            {!reduced && (
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? "Play hero animation" : "Pause hero animation"}
                title={paused ? "Play hero animation" : "Pause hero animation"}
                className="rounded p-1 text-[#1E2B29]/45 hover:text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2563FF]"
              >
                {paused ? <Play size={12} /> : <Pause size={12} />}
              </button>
            )}
          </div>
          <div className="relative h-[410px]">
            <div
              ref={audienceRow}
              data-audience-row
              data-audience={audience.key}
              className="relative h-[85px] overflow-hidden rounded-[14px] border border-[#1E2B29]/[0.12] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(30,43,41,.06)]"
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={audience.key}
                  initial={reduced ? false : { opacity: 0, y: 9 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -9 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="flex h-full items-center gap-3"
                >
                  <AudiencePortraits members={audience.members} more={audience.more} size={28} />
                  <div className="min-w-0">
                    <p className="mb-2 text-[12px] font-semibold text-[#1E2B29]">
                      Smart List audience
                    </p>
                    <AudiencePill label={audience.label} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div
              aria-hidden="true"
              className="mx-auto h-6 w-0 border-l-2 border-dotted border-[#1E2B29]/25"
            />
            <div data-automation-flow>
              {steps.map(({ label, Icon }, index) => (
                <div key={label}>
                  <div className="flex h-[54px] items-center justify-center gap-3 rounded-[12px] border border-[#1E2B29]/[0.12] bg-white px-4 shadow-[0_6px_18px_rgba(30,43,41,.05)]">
                    <Icon size={19} strokeWidth={1.6} className="text-[#2563FF]" />
                    <span className="text-[12px] font-semibold text-[#1E2B29]">{label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="mx-auto h-5 w-0 border-l-2 border-dotted border-[#1E2B29]/25"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between gap-1 rounded-[16px] border border-[#1E2B29]/[0.12] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(30,43,41,.06)]">
              {channels.map(({ label, Icon, tone }) => (
                <div
                  key={label}
                  className="flex min-w-0 flex-col items-center gap-2 text-[#1E2B29]"
                >
                  <Icon size={17} strokeWidth={1.6} style={{ color: tone }} />
                  <span className="whitespace-nowrap text-[9px] font-medium sm:text-[10px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalScene() {
  const occasions = [
    {
      title: "A service is due.",
      audience: "Customers approaching their next service",
      message: "A timely reminder with a way to book",
      tone: "#DDA34B",
    },
    {
      title: "A relevant update.",
      audience: "Customers affected by a rate or product change",
      message: "A relevant update with a clear next step",
      tone: "#9B86B8",
    },
    {
      title: "A new offer.",
      audience: "Customers whose history matches the new offer",
      message: "An introduction worth paying attention to",
      tone: "#99A36D",
    },
  ];
  return (
    <section id="how-it-works" className="px-5 pb-12 pt-8 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-6 pb-16 pt-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
          <h2
            className="max-w-[660px] text-[38px] font-medium leading-[1.04] tracking-[-.045em] sm:text-[50px]"
            style={{ fontFamily: DISPLAY }}
          >
            The next opportunity might already be in your database.
          </h2>
          <p className="max-w-[470px] text-[15px] leading-[1.8] text-[#69716B]">
            You have already built the relationship. Use what you know about your customers to reach
            out when you have something relevant to offer.
          </p>
        </div>
        <div className="overflow-hidden rounded-[32px] bg-[#E2E4D2] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <h2
                className="max-w-[430px] text-[36px] font-medium leading-[1.04] tracking-[-.045em] sm:text-[46px]"
                style={{ fontFamily: DISPLAY }}
              >
                A reason to reach out.
                <br />
                The right people to hear it.
              </h2>
              <p className="mt-6 max-w-[410px] text-[14px] leading-[1.8] text-[#4F594B]">
                Tag customers by their interests, purchases or service history. Use those tags and
                other customer details to build Smart Lists, so each message reaches the people it
                matters to.
              </p>
              <p className="mt-8 max-w-[360px] text-[17px] font-medium leading-[1.5]">
                Relevance starts before you press send.
              </p>
            </div>
            <div className="rounded-[22px] bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-[#E5E7E0] pb-5">
                <MarketingAvatar cell={9} size={44} />
                <div>
                  <p className="text-[15px] font-semibold">Mia Thompson</p>
                  <p className="mt-1 text-[12px] text-[#69716B]">
                    Past customer · service history in Zapla
                  </p>
                </div>
              </div>
              <div className="space-y-4 py-6 text-[13px]">
                <div className="flex justify-between gap-4">
                  <span className="text-[#69716B]">Last service</span>
                  <span>6 months ago</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#69716B]">Next service</span>
                  <span>Due next week</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[14px] bg-[#F7F2EA] p-4">
                <span className="text-[13px] font-medium">Smart List</span>
                <AudiencePill label="Service due" />
              </div>
              <p className="mt-5 text-[13px] leading-[1.7] text-[#69716B]">
                A service reminder belongs here. An unrelated offer does not.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-7 border-t border-[#1E2B29]/15 pt-8 md:grid-cols-3 md:gap-10">
            {occasions.map((item) => (
              <div key={item.title}>
                <h3 className="text-[20px] font-medium tracking-[-.025em]">{item.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#4F594B]">{item.audience}</p>
                <p className="mt-3 text-[13px] font-medium leading-[1.7]">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MomentScene() {
  return (
    <section className="px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:gap-20 lg:items-end">
          <h2
            className="max-w-[660px] text-[39px] font-medium leading-[1.03] tracking-[-.045em] sm:text-[52px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn relevant outreach
            <br />
            into more business.
          </h2>
          <p className="max-w-[470px] text-[15px] leading-[1.8] text-[#69716B]">
            Reach customers through SMS, email, voicemail, social DMs or AI calls. Give them a clear
            way to reply, enquire or book.
          </p>
        </div>
        <div className="grid gap-0 overflow-hidden rounded-[32px] bg-[#EFE2D2] lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div>
              <h3 className="text-[30px] font-medium leading-[1.12] tracking-[-.035em]">
                From service reminder
                <br />
                to next appointment.
              </h3>
              <p className="mt-5 text-[14px] leading-[1.8] text-[#655B50]">
                An automation handles the outreach. The customer can reply or book, and the next
                step stays attached to their record.
              </p>
            </div>
            <p className="mt-10 text-[14px] font-medium leading-[1.7]">
              Your team sees the conversation.
              <br />
              The customer gets a clear next step.
            </p>
          </div>
          <div className="relative min-h-[590px] p-5 sm:p-8 lg:p-10">
            <img
              src="/concept/customer-marketing-service-arrival.svg"
              alt="Customer handing her car keys to a mechanic at a service appointment"
              loading="lazy"
              className="h-[460px] w-full rounded-[22px] object-cover object-[50%_50%] sm:h-[510px]"
            />
            <div className="absolute left-8 right-8 top-10 max-w-[310px] rounded-[18px] border-2 border-white/95 bg-[#FCFCFA]/85 p-5 shadow-[inset_0_0_0_1px_rgba(30,43,41,.22),0_12px_35px_rgba(30,43,41,.12)] backdrop-blur-[6px] sm:left-4 sm:top-16">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-semibold text-[#69716B]">Service reminder · SMS</p>
                <span role="img" aria-label="Automated message by Zapla">
                  <ZaplaPetal size={24} />
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-[1.7]">
                Hi Mia, your next service is due. You can choose a time that suits you here.
              </p>
              <div className="mt-4 border-t border-[#E5E7E0] pt-3 text-[12px] font-medium text-[#2563FF]">
                Choose a service time
              </div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-[18px] border-2 border-white/95 bg-[#FCFCFA]/85 p-5 shadow-[inset_0_0_0_1px_rgba(30,43,41,.22),0_12px_35px_rgba(30,43,41,.12)] backdrop-blur-[6px] sm:left-auto sm:right-5 sm:w-[300px]">
              <div className="flex items-center gap-3">
                <MarketingAvatar cell={9} size={38} />
                <div>
                  <p className="text-[13px] font-semibold">Mia Thompson</p>
                  <p className="mt-1 text-[12px] text-[#69716B]">Next service booked</p>
                </div>
              </div>
              <p className="mt-4 border-t border-[#E5E7E0] pt-4 text-[12px] leading-[1.7]">
                Reminder, response and appointment.
                <br />
                Connected to the same customer.
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-7 pb-2 pt-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <h3 className="max-w-[410px] text-[27px] font-medium leading-[1.15] tracking-[-.03em]">
            Every reply stays connected
            <br />
            to the customer.
          </h3>
          <p className="max-w-[650px] text-[14px] leading-[1.8] text-[#69716B]">
            See the campaign message alongside the customer’s history, so your team can continue the
            conversation and take the next step in Zapla.
          </p>
        </div>
      </div>
    </section>
  );
}

function CampaignScene() {
  return (
    <section className="px-5 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
      <div className="mx-auto grid max-w-[1240px] gap-12 overflow-hidden rounded-[32px] bg-[#1E2B29] p-7 text-[#FCFCFA] sm:p-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16 lg:p-14">
        <div className="flex flex-col justify-between">
          <div>
            <h2
              className="text-[39px] font-medium leading-[1.04] tracking-[-.045em] sm:text-[49px]"
              style={{ fontFamily: DISPLAY }}
            >
              See what happened
              <br />
              <span className="text-[#DDA34B]">after the send.</span>
            </h2>
            <p className="mt-6 text-[14px] leading-[1.8] text-white/70">
              Bring the audience, outreach and booking destination together. See which customers
              responded and which bookings are linked to the campaign.
            </p>
          </div>
          <p className="mt-10 max-w-[340px] text-[17px] leading-[1.6]">
            See what the outreach led to.
          </p>
        </div>
        <div className="rounded-[22px] bg-[#FCFCFA] p-6 text-[#1E2B29] sm:p-8">
          <div className="flex justify-between gap-4">
            <div>
              <p className="text-[12px] text-[#69716B]">Campaigns</p>
              <h3 className="mt-2 text-[25px] font-medium tracking-[-.03em]">Service reminder</h3>
            </div>
            <ZaplaPetal size={30} />
          </div>
          <dl className="mt-6 grid gap-4 border-y border-[#E0E4DC] py-5 text-[12px] sm:grid-cols-3">
            {[
              ["Audience", "Service due"],
              ["Outreach", "SMS reminder"],
              ["Destination", "Service booking"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[#69716B]">{label}</dt>
                <dd className="mt-2 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex items-center gap-3">
            <MarketingAvatar cell={9} size={40} />
            <p className="text-[14px] font-semibold">Mia Thompson</p>
          </div>
          <ol className="ml-5 mt-5 space-y-0 border-l border-[#CCD2C6] text-[13px]">
            {[
              ["Sent", "Service reminder sent"],
              ["Responded", "Customer replied to the outreach"],
              ["Booked", "Next service appointment booked"],
            ].map(([label, detail]) => (
              <li key={label} className="relative py-3 pl-6">
                <span className="absolute -left-[4px] top-[18px] h-[7px] w-[7px] rounded-full bg-[#99A36D]" />
                <p className="font-medium">{label}</p>
                <p className="mt-1 text-[12px] text-[#69716B]">{detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-[#E0E4DC] pt-4 text-[12px] font-medium">
            Booking linked to Service reminder
          </p>
        </div>
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

// Copy preserved; presentation matches the homepage final CTA.
function GrowthCta() {
  return (
    <section className="overflow-hidden bg-[#FCFCFA] pt-20 sm:pt-24 lg:pt-24">
      <Reveal className="mx-auto max-w-[1120px] px-5 text-center sm:px-10">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C96F55]">
          Zapla Growth
        </p>
        <h2
          className="mx-auto mt-3 max-w-[1080px] text-[40px] font-medium leading-[0.99] tracking-[-0.045em] text-[#111318] sm:text-[54px] lg:text-[64px]"
          style={{ fontFamily: DISPLAY }}
        >
          Put your customer data to work.
        </h2>
        <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.65] text-[#5F655F] sm:text-[16px]">
          Customer Marketing is part of Zapla Growth.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={PRICING_URL}
            className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px sm:w-auto"
          >
            View Growth pricing <ArrowRight size={15} />
          </a>
          <a
            href={BOOK_URL}
            className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[#E2DBD1] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#CFC6BA] sm:w-auto"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// preview-rebuild: customer-marketing-progressive-hero
