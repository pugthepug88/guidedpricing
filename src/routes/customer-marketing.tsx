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
          "Use customer data, tags and Smart Lists to build relevant audiences, reach them by SMS or email, connect forms and bookings, and track campaign performance in Zapla.",
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

const STORY = [
  {
    key: "audience",
    label: "Choose the audience",
    title: "Start with what you already know.",
    copy:
      "Use tags, fields, filters, Smart Lists and subscription lists to decide exactly which customers belong in the campaign.",
  },
  {
    key: "reach",
    label: "Run the outreach",
    title: "Reach that audience without exporting it.",
    copy:
      "Send batch SMS or email to the group you built. Use Automations when timing, triggers or follow-up steps need to happen on their own.",
  },
  {
    key: "convert",
    label: "Give them a next step",
    title: "Send customers somewhere useful.",
    copy:
      "Connect forms, landing pages, funnels and booking pages to the campaign so interest has somewhere to turn into action.",
  },
  {
    key: "measure",
    label: "Measure the initiative",
    title: "See what happened after the send.",
    copy:
      "Campaigns groups the assets behind an initiative and brings members, activity and performance into one place.",
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
    a: "It is the proactive side of Zapla: use the customer information already in your CRM to choose who should hear from you, reach them by SMS or email, connect the next action, and keep the campaign inside the same customer system.",
  },
  {
    q: "Can I market to customers using tags or Smart Lists?",
    a: "Yes. Tags, fields, filters and Smart Lists can define the group you want to reach. Subscription lists help manage who is opted in for marketing.",
  },
  {
    q: "Can I send batch SMS or email?",
    a: "Yes. Batch SMS and email can be sent to relevant customer groups. Automations can handle triggered or multi-step outreach.",
  },
  {
    q: "What does the Campaigns area do?",
    a: "Campaigns is the tracking and attribution layer, not the send tool. It groups the assets behind an initiative and shows members, activity and performance.",
  },
  {
    q: "Can forms, pages and bookings be part of a campaign?",
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
      <WhyItMatters />
      <CampaignStory />
      <CampaignsProof />
      <UseCases />
      <ConnectedStatement />
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
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.52, delay: reduced ? 0 : delay, ease: EASE }}
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
    <section className="bg-[#FCFCFA] px-5 pb-20 pt-[108px] sm:px-10 sm:pb-24 sm:pt-[118px] lg:px-16 lg:pb-28 lg:pt-[126px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="mx-auto max-w-[930px] text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58706F]">
            Customer Marketing
          </div>

          <h1
            className="mx-auto mt-4 max-w-[920px] text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[49px] lg:text-[58px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn the customers you already know into
            <span className="text-[#2563FF]"> your next campaign.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[760px] text-[14px] leading-[1.7] text-[#666C67] sm:text-[16px]">
            Use the customer data already in Zapla to build the right audience, then reach them by SMS or email without exporting a list.
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

        <Reveal className="mt-12 sm:mt-14" delay={0.04}>
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
    }, 1650);

    return () => window.clearInterval(timer);
  }, [reduced]);

  const customers = [
    { name: "Mia Thompson", detail: "Residential · Sydney", service: "Service due", match: true },
    { name: "Daniel Kim", detail: "Residential · Sydney", service: "Service due", match: true },
    { name: "Priya Shah", detail: "Commercial · Sydney", service: "Active", match: false },
    { name: "Lucas Martin", detail: "Residential · Newcastle", service: "Service due", match: false },
    { name: "Sophie Nguyen", detail: "Residential · Sydney", service: "Service due", match: true },
  ] as const;

  const rules = ["Existing customer", "Service due", "Sydney"];

  return (
    <div className="mx-auto max-w-[1160px] overflow-hidden rounded-[30px] bg-[#2563FF] p-4 shadow-[0_30px_80px_rgba(37,99,255,.16)] sm:p-6 lg:p-8">
      <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white">
        <div className="flex items-center justify-between border-b border-[#E7E9EC] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <img src="/concept/zapla-logo-dark.svg" alt="Zapla" className="h-[21px] w-auto" />
            <span className="h-4 w-px bg-[#E0E3E6]" />
            <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7D858F]">
              Contacts
            </span>
          </div>
          <div className="hidden text-[9px] font-semibold text-[#7D858F] sm:block">
            Smart List · Service due in Sydney
          </div>
        </div>

        <div className="grid min-h-[440px] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-[#E5E8EB] bg-[#FBFBFA] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="grid gap-6 sm:grid-cols-[0.7fr_1.3fr]">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7D858F]">
                  Audience rules
                </div>

                <div className="mt-4 border-y border-[#E4E6E3]">
                  {rules.map((rule, index) => {
                    const active = phase >= index || phase === 4;
                    return (
                      <motion.div
                        key={rule}
                        animate={{ color: active ? "#343A35" : "#9AA09B" }}
                        transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
                        className="flex items-center justify-between border-b border-[#E4E6E3] py-4 text-[10px] font-semibold last:border-b-0"
                      >
                        <span>{rule}</span>
                        <motion.span
                          animate={{
                            width: active ? 24 : 10,
                            backgroundColor: active ? ["#99A36D", "#DDA34B", "#9B86B8"][index] : "#D7DCD8",
                          }}
                          transition={{ duration: reduced ? 0 : 0.26, ease: EASE }}
                          className="h-[2px]"
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 text-[9px] leading-[1.65] text-[#818883]">
                  Subscription lists can be part of the audience too.
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7D858F]">
                    Matching customers
                  </div>
                  <div className="text-[8px] font-semibold text-[#8A918C]">
                    Filtered from CRM data
                  </div>
                </div>

                <div className="mt-4 border-y border-[#E4E6E3]">
                  {customers.map((customer) => {
                    const selected = phase >= 3 ? customer.match : true;
                    return (
                      <motion.div
                        key={customer.name}
                        animate={{
                          opacity: selected ? 1 : 0.2,
                          x: selected ? 0 : 8,
                        }}
                        transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
                        className="grid grid-cols-[1.15fr_0.85fr] items-center border-b border-[#E7E9E6] py-3.5 last:border-b-0"
                      >
                        <div>
                          <div className="text-[10px] font-semibold text-[#3C433E]">{customer.name}</div>
                          <div className="mt-0.5 text-[8px] text-[#969C97]">{customer.detail}</div>
                        </div>
                        <div className="text-right text-[9px] text-[#687069]">{customer.service}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-7">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#7D858F]">
              Reach this Smart List
            </div>

            <div className="mt-5 flex gap-6 border-b border-[#E3E6EA] text-[10px] font-semibold text-[#949BA4]">
              <div className="border-b-2 border-[#2563FF] pb-3 text-[#2563FF]">SMS</div>
              <div className="pb-3">Email</div>
            </div>

            <div className="mt-7">
              <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8B939C]">
                Message
              </div>
              <div className="mt-3 border-y border-[#E4E7EA] py-5 text-[12px] leading-[1.65] text-[#59626D]">
                We’ve opened extra service appointments next week. Want the available times?
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-5">
              <div className="max-w-[210px] text-[9px] leading-[1.6] text-[#8A918C]">
                Send once, or use Automations when the outreach needs timing and follow-up.
              </div>
              <motion.div
                animate={{
                  opacity: phase >= 4 ? 1 : 0.42,
                  y: phase >= 4 ? 0 : 3,
                }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                className="inline-flex h-[42px] items-center gap-2 rounded-[9px] bg-[#111318] px-4 text-[10px] font-semibold text-white"
              >
                Send to Smart List <ArrowRight size={12} />
              </motion.div>
            </div>

            <div className="mt-8 border-t border-[#E4E7EA] pt-5 text-[9px] leading-[1.6] text-[#7A817B]">
              Replies and customer activity stay attached to the same record.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyItMatters() {
  return (
    <section className="bg-[#18191C] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1220px] gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end lg:gap-20">
        <Reveal>
          <h2
            className="max-w-[840px] text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[50px] lg:text-[60px]"
            style={{ fontFamily: DISPLAY }}
          >
            The useful part isn’t sending.
            <span className="block text-[#AFC3FF]">It’s knowing who should hear from you.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="max-w-[430px] text-[14px] leading-[1.75] text-white/56">
            Anyone can blast a database. Zapla lets you use customer tags, fields, activity and subscription lists to decide who belongs in the campaign before anything goes out.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CampaignStory() {
  const [active, setActive] = useState(0);

  return (
    <section id="how-it-works" className="bg-[#F7F4EE] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <h2
            className="text-[38px] font-medium leading-[1.01] tracking-[-0.05em] text-[#17191C] sm:text-[47px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            Build the campaign from
            <span className="text-[#2563FF]"> the customer out.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[14px] leading-[1.7] text-[#6D736E]">
            Choose who. Reach them. Give them a next step. Then see what happened.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="border-y border-[#D8D4CC]">
            {STORY.map((step, index) => {
              const selected = active === index;
              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => setActive(index)}
                  className="w-full border-b border-[#D8D4CC] py-6 text-left last:border-b-0"
                  aria-pressed={selected}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="max-w-[430px]">
                      <div
                        className={
                          "text-[12px] font-semibold transition-colors " +
                          (selected ? "text-[#1F2421]" : "text-[#747B75]")
                        }
                      >
                        {step.label}
                      </div>

                      <AnimatePresence initial={false}>
                        {selected ? (
                          <motion.div
                            key="open"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <h3
                              className="mt-4 text-[28px] font-medium leading-[1.03] tracking-[-0.042em] text-[#252A26] sm:text-[31px]"
                              style={{ fontFamily: DISPLAY }}
                            >
                              {step.title}
                            </h3>
                            <p className="mt-3 max-w-[390px] text-[13px] leading-[1.72] text-[#6C736D]">
                              {step.copy}
                            </p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    <div
                      className={
                        "mt-1 h-[2px] transition-all duration-300 " +
                        (selected ? "w-12 bg-[#2563FF]" : "w-5 bg-[#B9B8B3]")
                      }
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:sticky lg:top-[118px] lg:self-start">
            <StoryStage active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryStage({ active }: { active: number }) {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[28px] border border-[#D9D4CA] bg-white">
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
  const names = [
    ["Mia Thompson", "Existing customer · Sydney", true],
    ["Daniel Kim", "Existing customer · Sydney", true],
    ["Priya Shah", "Commercial · Sydney", false],
    ["Lucas Martin", "Residential · Newcastle", false],
    ["Sophie Nguyen", "Existing customer · Sydney", true],
  ] as const;

  return (
    <div className="h-full bg-[#F2F5EF] p-7 sm:p-9 lg:p-10">
      <div className="max-w-[560px]">
        <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#6F785E]">
          Smart List
        </div>
        <div className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-[#252A26]">
          Existing customers due for service in Sydney
        </div>
      </div>

      <div className="mt-9 grid gap-8 md:grid-cols-[0.72fr_1.28fr]">
        <div className="border-y border-[#CFD6C8]">
          {["Existing customer", "Service due", "Sydney", "Subscribed"].map((item) => (
            <div key={item} className="border-b border-[#CFD6C8] py-4 text-[10px] font-semibold text-[#565E50] last:border-b-0">
              {item}
            </div>
          ))}
        </div>

        <div className="border-y border-[#CFD6C8]">
          {names.map(([name, detail, selected]) => (
            <div
              key={name}
              className={"border-b border-[#CFD6C8] py-4 last:border-b-0 " + (selected ? "" : "opacity-30")}
            >
              <div className="text-[10px] font-semibold text-[#3F463F]">{name}</div>
              <div className="mt-1 text-[8px] text-[#848B84]">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutreachStage() {
  return (
    <div className="h-full bg-[#18191C] p-7 text-white sm:p-9 lg:p-10">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#AFC3FF]">
        Automations
      </div>
      <div className="mt-2 text-[25px] font-semibold tracking-[-0.035em]">
        Reach the audience by SMS or email.
      </div>

      <div className="mt-10 border-y border-white/12">
        {[
          ["01", "Send SMS", "Tell the selected group about the available appointments."],
          ["02", "Wait", "Give customers time to respond."],
          ["03", "Send email", "Continue only if another touch is useful."],
        ].map(([index, title, copy]) => (
          <div key={title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/12 py-6 last:border-b-0">
            <div className="text-[10px] font-semibold text-[#AFC3FF]">{index}</div>
            <div>
              <div className="text-[13px] font-semibold text-white/90">{title}</div>
              <div className="mt-2 max-w-[520px] text-[10px] leading-[1.65] text-white/48">{copy}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvertStage() {
  return (
    <div className="h-full bg-[#F8ECE8] p-7 sm:p-9 lg:p-10">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#A7624D]">
        Next action
      </div>
      <div className="mt-2 max-w-[560px] text-[25px] font-semibold tracking-[-0.035em] text-[#2A2523]">
        Give the campaign somewhere useful to go.
      </div>

      <div className="mt-12 divide-y divide-[#DFCFC8] border-y border-[#DFCFC8]">
        {[
          ["Form", "Capture interest or customer details."],
          ["Landing page", "Give the offer its own focused destination."],
          ["Booking page", "Let the customer choose the next appointment."],
        ].map(([title, copy], index) => (
          <div key={title} className="grid gap-4 py-6 sm:grid-cols-[0.7fr_1.3fr] sm:items-center">
            <div
              className="text-[24px] font-medium tracking-[-0.035em] text-[#3B312D]"
              style={{ fontFamily: DISPLAY }}
            >
              {title}
            </div>
            <div className="text-[10px] leading-[1.65] text-[#7A6961]">{copy}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MeasureStage() {
  const metrics = ["Reached", "Engaged", "Converted", "Won deals", "Costs", "Return on cost"];

  return (
    <div className="h-full bg-[#F5ECD9] p-7 sm:p-9 lg:p-10">
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#996B26]">
        Campaigns
      </div>
      <div className="mt-2 max-w-[560px] text-[25px] font-semibold tracking-[-0.035em] text-[#2F2A22]">
        Keep the initiative and its performance together.
      </div>
      <div className="mt-2 text-[9px] text-[#8E8069]">
        Assets · Members · Activity · Performance
      </div>

      <div className="mt-10 grid gap-px overflow-hidden border border-[#D7C9AE] bg-[#D7C9AE] sm:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric} className="min-h-[112px] bg-[#FFFBF2] p-5">
            <div className="text-[10px] font-semibold text-[#625847]">{metric}</div>
            <div className="mt-8 h-[2px] w-12 bg-[#DDA34B]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignsProof() {
  return (
    <section className="bg-[#1E2B29] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-16">
        <Reveal>
          <h2
            className="text-[38px] font-medium leading-[1.01] tracking-[-0.05em] sm:text-[46px] lg:text-[52px]"
            style={{ fontFamily: DISPLAY }}
          >
            Automations send.
            <span className="block text-[#DDA34B]">Campaigns tells you what happened.</span>
          </h2>
          <p className="mt-6 max-w-[430px] text-[14px] leading-[1.75] text-white/54">
            Group the forms, pages, automations, booking links and other assets behind an initiative, then see members, activity and performance in one place.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <CampaignsInterface />
        </Reveal>
      </div>
    </section>
  );
}

function CampaignsInterface() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/12 bg-[#F8F8F6] text-[#202420] shadow-[0_28px_75px_rgba(0,0,0,.20)]">
      <div className="border-b border-[#E4E6E2] px-6 py-5">
        <div className="text-[9px] font-semibold text-[#838A84]">Campaigns</div>
        <div className="mt-2 text-[20px] font-semibold tracking-[-0.03em]">Service availability</div>
        <div className="mt-1 text-[8px] text-[#9A9F9A]">Influence window: 30 days</div>
      </div>

      <div className="flex gap-6 border-b border-[#E4E6E2] px-6 text-[9px] font-semibold text-[#898F89]">
        <div className="py-4">Assets</div>
        <div className="py-4">Members</div>
        <div className="py-4">Activity</div>
        <div className="border-b-2 border-[#111318] py-4 text-[#111318]">Performance</div>
      </div>

      <div className="p-6">
        <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7E857F]">Reach</div>
        <div className="mt-4 grid gap-px overflow-hidden border border-[#E3E5E1] bg-[#E3E5E1] sm:grid-cols-4">
          {["Reached", "Engaged", "Converted", "Won deals"].map((metric) => (
            <div key={metric} className="bg-white p-4">
              <div className="text-[9px] text-[#7E857F]">{metric}</div>
              <div className="mt-5 h-[2px] w-8 bg-[#99A36D]" />
            </div>
          ))}
        </div>

        <div className="mt-6 text-[9px] font-bold uppercase tracking-[0.12em] text-[#7E857F]">Return</div>
        <div className="mt-4 grid gap-px overflow-hidden border border-[#E3E5E1] bg-[#E3E5E1] sm:grid-cols-3">
          {["Costs", "Collected", "Return on cost"].map((metric) => (
            <div key={metric} className="bg-[#FFF9EE] p-4">
              <div className="text-[9px] text-[#8E7954]">{metric}</div>
              <div className="mt-5 h-[2px] w-8 bg-[#DDA34B]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UseCases() {
  return (
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-18">
          <div>
            <h2
              className="text-[37px] font-medium leading-[1.02] tracking-[-0.05em] text-[#17191C] sm:text-[45px]"
              style={{ fontFamily: DISPLAY }}
            >
              One customer base.
              <span className="block text-[#7B827C]">Different reasons to get back in touch.</span>
            </h2>
          </div>

          <div className="border-y border-[#E0E3DF]">
            {USE_CASES.map((item) => (
              <div
                key={item.label}
                className="grid gap-3 border-b border-[#E0E3DF] py-6 last:border-b-0 sm:grid-cols-[0.68fr_1.2fr_1fr] sm:gap-7"
              >
                <div className="text-[13px] font-semibold text-[#252A26]">{item.label}</div>
                <div className="text-[10px] leading-[1.65] text-[#737A74]">{item.audience}</div>
                <div className="text-[10px] leading-[1.65] text-[#737A74]">{item.action}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedStatement() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <Reveal className="mx-auto max-w-[1150px]">
        <div
          className="text-[39px] font-medium leading-[1.04] tracking-[-0.052em] text-[#1C211D] sm:text-[50px] lg:text-[62px]"
          style={{ fontFamily: DISPLAY }}
        >
          CRM knows the customer.
          <br />
          <span className="text-[#99A36D]">Smart Lists choose the audience.</span>
          <br />
          <span className="text-[#2563FF]">Automations do the reaching.</span>
          <br />
          <span className="text-[#DDA34B]">Campaigns closes the loop.</span>
        </div>

        <div className="mt-12 max-w-[620px] border-t border-[#DDE1DD] pt-6 text-[14px] leading-[1.75] text-[#6A716B]">
          That connection is the point. Customer Marketing does not live in a separate list, inbox or reporting tool.
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
