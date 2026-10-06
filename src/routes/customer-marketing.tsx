import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/customer-marketing")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer Marketing Software for Small Business | Zapla" },
      {
        name: "description",
        content:
          "Use tags, Smart Lists and customer data to reach the right customers by SMS or email, connect forms and booking pages, and track campaign performance in Zapla.",
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

const STORY_STEPS = [
  {
    key: "audience",
    title: "Find the customers who actually matter.",
    copy: "Use tags, fields, filters, Smart Lists and subscription lists to build the audience around what you already know about each customer.",
  },
  {
    key: "outreach",
    title: "Reach them without exporting a list.",
    copy: "Send batch SMS or email to a tag or Smart List. Use Automations when timing, triggers or follow-up steps need to happen automatically.",
  },
  {
    key: "convert",
    title: "Give the campaign somewhere to convert.",
    copy: "Connect forms, landing pages, funnels and booking pages so the next action is part of the same customer journey.",
  },
  {
    key: "measure",
    title: "See what the campaign produced.",
    copy: "Campaigns groups the marketing assets behind an initiative and shows members, activity, engagement, conversions, won deals, costs and return-related performance.",
  },
] as const;

const USE_CASES = [
  {
    label: "Seasonal service",
    audience: "Customers who use the service and are due again",
    action: "SMS or email offer",
  },
  {
    label: "Customer update",
    audience: "Only the customers affected by the change",
    action: "Targeted update and next step",
  },
  {
    label: "New service",
    audience: "Existing customers most likely to care",
    action: "Launch message and landing page",
  },
  {
    label: "Rate change",
    audience: "Clients tagged to the affected product or rate",
    action: "Update, form or booking link",
  },
] as const;

const FAQS = [
  {
    q: "What is Customer Marketing in Zapla?",
    a: "It is the proactive side of Zapla: use customer data to choose who you want to reach, send relevant SMS or email outreach, connect the pages or forms behind the campaign, and keep the activity inside the same customer system.",
  },
  {
    q: "Can I market to customers based on tags or Smart Lists?",
    a: "Yes. Tags, fields, filters and Smart Lists can be used to define the group you want to reach. Subscription lists help manage who is opted in for marketing.",
  },
  {
    q: "Can I send batch SMS or email?",
    a: "Yes. Batch SMS and email can be sent to relevant customer groups, while Automations can handle triggered or multi-step outreach.",
  },
  {
    q: "What does the Campaigns area do?",
    a: "Campaigns is the tracking and attribution layer, not the send tool. It groups the assets behind an initiative and shows members, activity and performance.",
  },
  {
    q: "Can forms, pages and bookings be part of the campaign?",
    a: "Yes. Forms, landing pages, funnels and calendars can support the next action you want customers to take.",
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
      <CampaignStory />
      <UseCases />
      <ConnectedSystem />
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
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
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
    <section className="bg-[#FCFCFA] px-5 pb-14 pt-[104px] sm:px-10 sm:pb-16 sm:pt-[112px] lg:px-16 lg:pb-20 lg:pt-[118px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-[940px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58706F]">
            Customer Marketing
          </div>

          <h1
            className="mx-auto mt-4 max-w-[900px] text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[48px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn the customers you already know into
            <span className="text-[#2563FF]"> your next campaign.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[760px] text-[14px] leading-[1.7] text-[#646A65] sm:text-[16px]">
            Use tags, Smart Lists and customer data to choose who should hear from you.
            Reach them by SMS or email, give them somewhere to act, and keep the result connected in Zapla.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#how-it-works"
              className="inline-flex h-[48px] items-center rounded-[10px] border border-[#D7DDD8] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BBC5BD]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12" delay={0.05}>
          <HeroProduct />
        </Reveal>
      </div>
    </section>
  );
}

function HeroProduct() {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState(reduced ? 4 : 0);

  useEffect(() => {
    if (reduced) {
      setPhase(4);
      return;
    }
    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1) % 5);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [reduced]);

  const customers = [
    { name: "Mia Thompson", detail: "Residential · Sydney", service: "Service due", match: true },
    { name: "Daniel Kim", detail: "Residential · Sydney", service: "Service due", match: true },
    { name: "Priya Shah", detail: "Commercial · Sydney", service: "Active", match: false },
    { name: "Lucas Martin", detail: "Residential · Newcastle", service: "Service due", match: false },
    { name: "Sophie Nguyen", detail: "Residential · Sydney", service: "Service due", match: true },
  ] as const;

  const filters = ["Existing customer", "Service due", "Sydney"];

  return (
    <div className="mx-auto max-w-[1140px] overflow-hidden rounded-[28px] border border-[#D9E2F4] bg-[#E8F0FF] shadow-[0_24px_70px_rgba(37,99,255,.08)]">
      <div className="flex items-center justify-between border-b border-[#D8E2F3] px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" className="h-[21px] w-auto" />
          <span className="h-4 w-px bg-[#CFD8E8]" />
          <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#74819A]">
            Customer Marketing
          </span>
        </div>
        <div className="hidden text-[9px] font-semibold text-[#74819A] sm:block">
          Choose the audience. Send the campaign.
        </div>
      </div>

      <div className="grid min-h-[420px] lg:grid-cols-[1.12fr_0.88fr]">
        <div className="border-b border-[#D8E2F3] bg-white/55 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#66748D]">
                Who should receive this?
              </div>
              <div className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-[#252D39]">
                Service availability
              </div>
            </div>
            <div className="text-right text-[8px] leading-[1.5] text-[#87919F]">
              Customer data already in Zapla
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {filters.map((filter, index) => {
              const active = phase >= index || phase === 4;
              return (
                <motion.div
                  key={filter}
                  animate={{
                    backgroundColor: active ? "#FFFFFF" : "rgba(255,255,255,.45)",
                    color: active ? "#3F4854" : "#929BA7",
                    borderColor: active ? "#D8E1EE" : "#E2E8F1",
                  }}
                  transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
                  className="rounded-[9px] border px-3 py-2 text-[9px] font-semibold"
                >
                  {filter}
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-[16px] border border-[#D9E1ED] bg-white">
            <div className="grid grid-cols-[1.25fr_1fr_0.7fr] border-b border-[#E7EBF2] bg-[#F8FAFD] px-4 py-3 text-[8px] font-bold uppercase tracking-[0.11em] text-[#8A94A2]">
              <span>Customer</span>
              <span>Customer context</span>
              <span className="text-right">Audience</span>
            </div>

            {customers.map((customer) => {
              const selected = phase >= 3 ? customer.match : true;
              return (
                <motion.div
                  key={customer.name}
                  animate={{
                    opacity: selected ? 1 : 0.24,
                    backgroundColor: selected && phase >= 3 ? "#FFFFFF" : "rgba(255,255,255,.72)",
                  }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                  className="grid grid-cols-[1.25fr_1fr_0.7fr] items-center border-b border-[#EDF0F4] px-4 py-3.5 last:border-b-0"
                >
                  <div>
                    <div className="text-[10px] font-semibold text-[#39424D]">{customer.name}</div>
                    <div className="mt-0.5 text-[8px] text-[#9AA2AC]">{customer.detail}</div>
                  </div>
                  <div className="text-[9px] text-[#6F7883]">{customer.service}</div>
                  <div className="text-right text-[8px] font-semibold text-[#6C765E]">
                    {phase >= 3 ? (customer.match ? "Selected" : "—") : "Review"}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#F8FAFE] p-5 sm:p-7">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#66748D]">
            Send to the selected audience
          </div>

          <div className="mt-4 flex gap-5 border-b border-[#DDE4EF] text-[10px] font-semibold text-[#8A94A1]">
            <div className="border-b-2 border-[#2563FF] pb-3 text-[#2563FF]">SMS</div>
            <div className="pb-3">Email</div>
          </div>

          <div className="mt-6">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8B95A2]">Message</div>
            <div className="mt-3 rounded-[14px] border border-[#DCE4F0] bg-white px-4 py-4 text-[11px] leading-[1.6] text-[#5C6673]">
              We’ve opened extra service appointments next week. Want the available times?
            </div>
          </div>

          <div className="mt-5 border-t border-[#E1E7F0] pt-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[9px] font-semibold text-[#424B56]">Follow up if needed</div>
                <div className="mt-1 text-[8px] text-[#929AA4]">Email can continue the outreach later.</div>
              </div>
              <motion.div
                animate={{
                  opacity: phase >= 4 ? 1 : 0.45,
                  color: phase >= 4 ? "#2563FF" : "#98A0AA",
                }}
                className="text-[9px] font-semibold"
              >
                {phase >= 4 ? "Ready to send" : "Build audience first"}
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ opacity: phase >= 4 ? 1 : 0.36, y: phase >= 4 ? 0 : 4 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
            className="mt-8 border-t border-[#DDE4EF] pt-5"
          >
            <div className="text-[9px] leading-[1.55] text-[#6F7883]">
              Replies, form activity and bookings stay connected to the customer record.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function CampaignStory() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="bg-[#F7F4EE] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="max-w-[800px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#6E7871]">
            One connected system
          </div>
          <h2
            className="mt-4 text-[35px] font-medium leading-[1.02] tracking-[-0.048em] text-[#17191C] sm:text-[44px] lg:text-[50px]"
            style={{ fontFamily: DISPLAY }}
          >
            From customer data to campaign results,
            <span className="text-[#2563FF]"> without stitching tools together.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
          <div className="space-y-20 lg:space-y-0">
            {STORY_STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                onViewportEnter={() => setActive(index)}
                viewport={{ amount: 0.55, margin: "-15% 0px -15% 0px" }}
                className="flex min-h-[46vh] items-center lg:min-h-[58vh]"
              >
                <div className="max-w-[430px]">
                  <h3
                    className="text-[29px] font-medium leading-[1.03] tracking-[-0.042em] text-[#202421] sm:text-[34px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-4 text-[13px] leading-[1.75] text-[#6A706B] sm:text-[14px]">
                    {step.copy}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="lg:sticky lg:top-[118px]">
              <StoryStage active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryStage({ active }: { active: number }) {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[26px] border border-[#DDD7CE] bg-[#FCFBF8] shadow-[0_24px_70px_rgba(51,45,39,.07)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
          className="absolute inset-0"
        >
          {active === 0 ? <AudienceStage /> : null}
          {active === 1 ? <OutreachStage /> : null}
          {active === 2 ? <ConvertStage /> : null}
          {active === 3 ? <MeasureStage /> : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AudienceStage() {
  return (
    <div className="h-full p-7 sm:p-9">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#70776F]">Smart List</div>
      <div className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-[#252A26]">
        Residential service due
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8F8A]">Rules</div>
          <div className="mt-3 divide-y divide-[#E5E2DC] border-y border-[#E5E2DC]">
            {["Existing customer", "Service due", "Sydney", "SMS subscribed"].map((item) => (
              <div key={item} className="py-4 text-[10px] font-semibold text-[#535954]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8A8F8A]">
            Matching customers
          </div>
          <div className="mt-3 divide-y divide-[#E5E7E3] border-y border-[#E5E7E3]">
            {[
              ["Mia Thompson", "Residential · Sydney"],
              ["Daniel Kim", "Residential · Sydney"],
              ["Sophie Nguyen", "Residential · Sydney"],
            ].map(([name, detail]) => (
              <div key={name} className="py-4">
                <div className="text-[10px] font-semibold text-[#424843]">{name}</div>
                <div className="mt-1 text-[8px] text-[#8E948F]">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OutreachStage() {
  return (
    <div className="h-full bg-[#18191C] p-7 text-white sm:p-9">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9AB2FF]">Automation</div>
      <div className="mt-2 text-[23px] font-semibold tracking-[-0.035em]">Service availability</div>
      <div className="mt-1 text-[9px] text-white/42">Audience: Residential service due</div>

      <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {[
          ["Send SMS", "Tell the selected customers about the available appointments."],
          ["Wait", "Give them time to respond."],
          ["Send email", "Continue only when another touch is useful."],
        ].map(([title, copy], index) => (
          <div key={title} className="grid grid-cols-[34px_1fr] gap-4 py-5">
            <div className="text-[11px] font-semibold text-[#9AB2FF]">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <div className="text-[12px] font-semibold text-white/90">{title}</div>
              <div className="mt-1.5 max-w-[480px] text-[9px] leading-[1.6] text-white/46">{copy}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvertStage() {
  return (
    <div className="h-full p-7 sm:p-9">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#88739F]">Next action</div>
      <div className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-[#252A26]">
        Give the campaign somewhere to go.
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          ["Form", "Capture interest or customer details.", "#E97D62"],
          ["Landing page", "Give the offer its own focused destination.", "#9B86B8"],
          ["Booking page", "Let the customer choose the next appointment.", "#DDA34B"],
        ].map(([title, copy, color]) => (
          <div key={title} className="border-t-2 pt-5" style={{ borderColor: color }}>
            <div className="text-[13px] font-semibold tracking-[-0.02em] text-[#363C37]">{title}</div>
            <div className="mt-3 text-[9px] leading-[1.65] text-[#737A74]">{copy}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-[#E3E1DB] pt-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8A8F8A]">Customer record</div>
        <div className="mt-2 max-w-[520px] text-[13px] leading-[1.65] text-[#5E655F]">
          Form activity, replies and bookings stay connected to the customer instead of becoming a separate marketing record.
        </div>
      </div>
    </div>
  );
}

function MeasureStage() {
  const metrics = ["Reached", "Engaged", "Converted", "Won deals", "Costs", "Return on cost"];

  return (
    <div className="h-full p-7 sm:p-9">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9A6E2C]">Campaigns</div>
      <div className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-[#252A26]">
        See the initiative in one place.
      </div>
      <div className="mt-1 text-[9px] text-[#8D928E]">Assets · Members · Activity · Performance</div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-[16px] border border-[#E4E2DD] bg-[#E4E2DD] sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric} className="bg-white p-5">
            <div className="text-[9px] text-[#7E857F]">{metric}</div>
            <div className="mt-4 h-px w-12 bg-[#DDA34B]" />
          </div>
        ))}
      </div>

      <div className="mt-7 text-[10px] leading-[1.65] text-[#6E756F]">
        Campaigns is the tracking and attribution layer around the initiative. SMS and email sending still runs through Automations.
      </div>
    </div>
  );
}

function UseCases() {
  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <div>
            <h2
              className="text-[34px] font-medium leading-[1.03] tracking-[-0.047em] text-[#17191C] sm:text-[42px]"
              style={{ fontFamily: DISPLAY }}
            >
              One customer base.
              <span className="block text-[#7A827B]">Different reasons to get back in touch.</span>
            </h2>
          </div>

          <div className="border-y border-[#E1E4E0]">
            {USE_CASES.map((item) => (
              <div
                key={item.label}
                className="grid gap-3 border-b border-[#E1E4E0] py-5 last:border-b-0 sm:grid-cols-[0.72fr_1.25fr_1fr] sm:gap-7"
              >
                <div className="text-[12px] font-semibold text-[#252A26]">{item.label}</div>
                <div className="text-[10px] leading-[1.6] text-[#737A74]">{item.audience}</div>
                <div className="text-[10px] leading-[1.6] text-[#737A74]">{item.action}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedSystem() {
  return (
    <section className="bg-[#18191C] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[920px] text-center">
          <h2
            className="text-[36px] font-medium leading-[1.02] tracking-[-0.05em] sm:text-[45px] lg:text-[51px]"
            style={{ fontFamily: DISPLAY }}
          >
            Marketing works better when it
            <span className="text-[#AFC3FF]"> already knows the customer.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[690px] text-[14px] leading-[1.75] text-white/52">
            Zapla keeps the customer record, audience, outreach, next action and campaign performance inside one connected system.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="overflow-x-auto pb-2">
            <div className="mx-auto flex min-w-[820px] max-w-[1040px] items-center justify-between gap-5 border-y border-white/10 py-7">
              {[
                ["CRM", "#2563FF"],
                ["Smart Lists", "#99A36D"],
                ["Automations", "#E97D62"],
                ["Forms & bookings", "#9B86B8"],
                ["Campaigns", "#DDA34B"],
              ].map(([label, color], index, all) => (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex-1 text-center">
                    <div className="mx-auto mb-3 h-1 w-8" style={{ backgroundColor: color }} />
                    <div className="text-[12px] font-semibold text-white/88">{label}</div>
                  </div>
                  {index < all.length - 1 ? <ArrowRight size={14} className="shrink-0 text-white/22" /> : null}
                </div>
              ))}
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
    <section className="bg-[#FCFCFA] px-5 py-18 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <Reveal className="max-w-[330px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Questions</div>
          <h2
            className="mt-3 text-[29px] font-medium leading-[1.04] tracking-[-0.042em] sm:text-[34px]"
            style={{ fontFamily: DISPLAY }}
          >
            The practical stuff.
          </h2>
        </Reveal>

        <div className="border-y border-[#DDE2DE]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-b border-[#DDE2DE] last:border-b-0">
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

function GrowthCta() {
  return (
    <section className="border-t border-[#E3E7E3] bg-white px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="max-w-[760px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111214]">
            <ZaplaPetal size={27} />
          </div>
          <div className="mt-5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Zapla Growth</div>
          <h2
            className="mt-2 text-[31px] font-medium leading-[1.04] tracking-[-0.045em] text-[#242A26] sm:text-[37px] lg:text-[40px]"
            style={{ fontFamily: DISPLAY }}
          >
            Put the customers you already have back to work.
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
