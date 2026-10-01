import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageSquareText,
  Send,
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
          "Build targeted customer campaigns from the data already in Zapla, send by SMS or email, and keep replies connected to the customer record.",
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
const ZAPLA_WORDMARK_URL = "/concept/zapla-logo-dark.svg";

const CUSTOMERS = [
  { initials: "MT", name: "Mia Thompson", detail: "Residential · Sydney", selected: true },
  { initials: "DK", name: "Daniel Kim", detail: "Residential · Sydney", selected: true },
  { initials: "PS", name: "Priya Shah", detail: "Commercial · Sydney", selected: false },
  { initials: "LM", name: "Lucas Martin", detail: "Residential · Newcastle", selected: false },
  { initials: "SN", name: "Sophie Nguyen", detail: "Residential · Sydney", selected: true },
] as const;

const FAQS = [
  {
    q: "What is Customer Marketing in Zapla?",
    a: "It is the proactive side of Zapla. Build a relevant audience from customer data, send a targeted campaign, and keep the response connected to the same customer record.",
  },
  {
    q: "Can I choose which customers receive a campaign?",
    a: "Yes. Fields, tags, filters and saved lists can define who is included instead of treating the whole database as one audience.",
  },
  {
    q: "Which channels can I use?",
    a: "SMS and email are core channels. Other connected channels depend on your setup.",
  },
  {
    q: "Is this the same as Reopen?",
    a: "No. Reopen focuses on dormant enquiries and stale opportunities. Customer Marketing is broader proactive campaigning to relevant customer groups.",
  },
] as const;

function CustomerMarketingPage() {
  return (
    <main
      data-page="customer-marketing"
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <Bridge />
      <CampaignFlow />
      <CampaignMoments />
      <ConnectedDifference />
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
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduced ? 0 : 0.44, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFA] px-5 pb-16 pt-[106px] sm:px-10 sm:pb-20 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[120px]">
      <div className="pointer-events-none absolute -left-[14%] top-[8%] h-[560px] w-[560px] rounded-full bg-[#EDF2E9] blur-[135px]" />
      <div className="pointer-events-none absolute right-[1%] top-[4%] h-[440px] w-[440px] rounded-full bg-[#2563FF]/[0.035] blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16">
        <Reveal className="max-w-[590px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58706F]">
            Customer Marketing
          </div>

          <h1
            className="mt-5 text-[42px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[49px] lg:text-[55px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn the customers you already know into
            <span className="block text-[#2563FF]">your next campaign.</span>
          </h1>

          <p className="mt-6 max-w-[565px] text-[15px] leading-[1.72] text-[#626862] sm:text-[17px]">
            Build an audience from the customer data already in Zapla, send targeted SMS or email, and keep every response connected to the customer record.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a
              href="#campaign-flow"
              className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD8] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BBC5BD]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <CampaignBuilder />
        </Reveal>
      </div>
    </section>
  );
}

function CampaignBuilder() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[820px] pb-12">
      <div className="pointer-events-none absolute inset-x-[7%] bottom-0 top-[15%] rounded-[34px] bg-[#D7E0CE]" />

      <div className="relative overflow-hidden rounded-[22px] border border-[#D9DEDA] bg-white shadow-[0_32px_82px_rgba(38,48,40,.13)]">
        <ProductTopBar label="Campaign builder" />

        <div className="grid min-h-[420px] lg:grid-cols-[0.62fr_1.18fr_0.72fr]">
          <div className="border-b border-[#E4E8E4] bg-[#F9FAF8] p-5 lg:border-b-0 lg:border-r">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Audience</div>
            <div className="mt-1.5 text-[16px] font-semibold tracking-[-0.025em]">Residential Sydney</div>

            <div className="mt-5 space-y-4">
              {[
                ["Tag", "Existing customer"],
                ["Service", "Residential"],
                ["Location", "Sydney"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-[#E5E9E5] pb-3">
                  <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#969C97]">{label}</div>
                  <div className="mt-1 text-[9px] font-semibold text-[#4B534E]">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-[9px] font-semibold text-[#66715F]">
              <Check size={12} />
              Matched audience
            </div>
          </div>

          <div className="border-b border-[#E4E8E4] p-5 lg:border-b-0 lg:border-r sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Campaign</div>
                <div className="mt-1.5 text-[18px] font-semibold tracking-[-0.03em]">Service availability</div>
              </div>

              <div className="flex items-center gap-4 text-[9px]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#2563FF]">
                  <MessageSquareText size={12} /> SMS
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#949A95]">
                  <Mail size={12} /> Email
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-[17px] bg-[#F0F3F8] p-4">
              <div className="text-[10px] font-semibold text-[#394556]">Northside</div>
              <p className="mt-2 text-[11px] leading-[1.6] text-[#596575]">
                Hi Mia, we have extra service appointments next week. Want the available times?
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[#E7EAE7] pt-5">
              <span className="text-[9px] font-semibold text-[#737B75]">Audience attached</span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#1E2B29] px-4 text-[9px] font-semibold text-white">
                Send <Send size={11} />
              </span>
            </div>
          </div>

          <div className="bg-[#FBFCFA] p-5">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Customer context</div>

            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EDE9E3] text-[10px] font-semibold text-[#5B534D]">
                MT
              </span>
              <div>
                <div className="text-[11px] font-semibold">Mia Thompson</div>
                <div className="mt-0.5 text-[8px] text-[#8A918C]">Existing customer</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                ["Service", "Residential"],
                ["Location", "Sydney"],
                ["Status", "Existing customer"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-[#E6EAE6] pb-2.5">
                  <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#959B96]">{label}</div>
                  <div className="mt-1 text-[9px] font-semibold text-[#4C544F]">{value}</div>
                </div>
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : 0.18, ease: EASE }}
              className="mt-5 text-[8px] font-semibold leading-[1.5] text-[#6A736C]"
            >
              The campaign starts with what Zapla already knows about the customer.
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductTopBar({ label }: { label: string }) {
  return (
    <div className="flex min-h-[46px] items-center justify-between border-b border-[#E3E7E3] bg-[#FCFCFB] px-4 sm:px-5">
      <div className="flex items-center gap-3">
        <img src={ZAPLA_WORDMARK_URL} alt="Zapla" className="h-[18px] w-auto object-contain" />
        <span className="h-4 w-px bg-[#D9DEDA]" />
        <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#78817B]">{label}</span>
      </div>
      <span className="hidden text-[8px] font-bold uppercase tracking-[0.12em] text-[#929893] sm:block">
        Customer Marketing
      </span>
    </div>
  );
}

function Bridge() {
  return (
    <section className="border-y border-[#E4E8E4] bg-white px-5 py-10 sm:px-10 lg:px-16">
      <Reveal className="mx-auto max-w-[1040px] text-center">
        <p
          className="text-[24px] font-medium leading-[1.18] tracking-[-0.035em] text-[#2B312D] sm:text-[29px] lg:text-[32px]"
          style={{ fontFamily: DISPLAY }}
        >
          You already paid to win the customer.
          <span className="text-[#737C75]"> The opportunity is knowing who to contact next.</span>
        </p>
      </Reveal>
    </section>
  );
}

function CampaignFlow() {
  const [active, setActive] = useState(0);
  const beatOne = useRef<HTMLDivElement>(null);
  const beatTwo = useRef<HTMLDivElement>(null);
  const beatThree = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [beatOne, beatTwo, beatThree];
    const observers = refs.map((ref, index) => {
      if (!ref.current) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(index);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0.08 },
      );

      observer.observe(ref.current);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  return (
    <section id="campaign-flow" className="bg-[#F7F8F5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[0.66fr_1.34fr] lg:gap-20">
          <div>
            <div ref={beatOne} className="flex min-h-[62vh] items-center lg:min-h-[78vh]">
              <FlowBeat
                active={active === 0}
                title="Start with the customer, not the channel."
                copy="Use fields, tags, location, service type and saved lists to find the people a campaign is actually relevant to."
              />
            </div>

            <div ref={beatTwo} className="flex min-h-[62vh] items-center lg:min-h-[78vh]">
              <FlowBeat
                active={active === 1}
                title="Now give them a reason to act."
                copy="Send the campaign by SMS or email without rebuilding the audience somewhere else."
              />
            </div>

            <div ref={beatThree} className="flex min-h-[62vh] items-center lg:min-h-[78vh]">
              <FlowBeat
                active={active === 2}
                title="When someone responds, the campaign has done its job."
                copy="The reply returns to the customer record with the existing history and context attached."
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <FlowCanvas active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowBeat({
  active,
  title,
  copy,
}: {
  active: boolean;
  title: string;
  copy: string;
}) {
  return (
    <div className={"max-w-[470px] transition-opacity duration-300 " + (active ? "opacity-100" : "opacity-40")}>
      <h2
        className="text-[30px] font-medium leading-[1.05] tracking-[-0.042em] sm:text-[35px] lg:text-[38px]"
        style={{ fontFamily: DISPLAY }}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-[430px] text-[14px] leading-[1.7] text-[#6A726B]">{copy}</p>
    </div>
  );
}

function FlowCanvas({ active }: { active: number }) {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-[#D8DED9] bg-white shadow-[0_30px_90px_rgba(38,48,40,.1)]">
      <ProductTopBar label={active === 0 ? "Audience builder" : active === 1 ? "Campaign builder" : "Customer record"} />

      <div className="relative min-h-[455px] bg-[#FBFCFA]">
        <StateLayer active={active === 0} reduced={reduced}>
          <AudienceState />
        </StateLayer>
        <StateLayer active={active === 1} reduced={reduced}>
          <CampaignState />
        </StateLayer>
        <StateLayer active={active === 2} reduced={reduced}>
          <ReplyState />
        </StateLayer>
      </div>
    </div>
  );
}

function StateLayer({
  active,
  reduced,
  children,
}: {
  active: boolean;
  reduced: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0 p-5 sm:p-6"
      initial={false}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
      transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
    >
      {children}
    </motion.div>
  );
}

function AudienceState() {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Build audience</div>
          <div className="mt-1.5 text-[21px] font-semibold tracking-[-0.03em]">Residential Sydney</div>
        </div>
        <div className="text-[9px] font-semibold text-[#65705F]">Matched customers</div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-4 border-r border-[#E5E9E5] pr-5">
          {[
            ["Tag", "Existing customer"],
            ["Service", "Residential"],
            ["Location", "Sydney"],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-[#E6EAE6] pb-3">
              <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#949A95]">{label}</div>
              <div className="mt-1 text-[10px] font-semibold text-[#4A524D]">{value}</div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-[#E7EAE7]">
          {CUSTOMERS.map((customer) => (
            <div
              key={customer.name}
              className={"flex items-center justify-between gap-3 py-3 " + (customer.selected ? "" : "opacity-35")}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EFF1ED] text-[8px] font-semibold text-[#5D655F]">
                  {customer.initials}
                </span>
                <div>
                  <div className="text-[10px] font-semibold">{customer.name}</div>
                  <div className="mt-0.5 text-[8px] text-[#8A918C]">{customer.detail}</div>
                </div>
              </div>
              <Check size={12} className={customer.selected ? "text-[#6A7A59]" : "text-transparent"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CampaignState() {
  return (
    <div className="grid gap-7 md:grid-cols-[0.72fr_1.28fr]">
      <div className="border-r border-[#E5E9E5] pr-5">
        <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Audience</div>
        <div className="mt-1.5 text-[19px] font-semibold tracking-[-0.03em]">Residential Sydney</div>
        <div className="mt-1 text-[9px] text-[#8B918D]">Saved customer group</div>

        <div className="mt-7 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#2563FF]">
            <MessageSquareText size={13} /> SMS selected
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#8B918D]">
            <Mail size={13} /> Email available
          </div>
        </div>

        <div className="mt-8 text-[8px] font-bold uppercase tracking-[0.12em] text-[#949A95]">
          Audience stays attached to the campaign
        </div>
      </div>

      <div>
        <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Campaign message</div>
        <div className="mt-1.5 text-[18px] font-semibold tracking-[-0.03em]">Service availability</div>

        <div className="mt-5 rounded-[18px] bg-[#F0F3F8] p-5">
          <div className="text-[10px] font-semibold text-[#394556]">Northside</div>
          <p className="mt-2 text-[12px] leading-[1.65] text-[#566274]">
            Hi Mia, we have extra service appointments next week. Want the available times?
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#E7EAE7] pt-5">
          <span className="text-[9px] font-semibold text-[#747B75]">Ready for selected audience</span>
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#1E2B29] px-4 text-[9px] font-semibold text-white">
            Send <Send size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}

function ReplyState() {
  return (
    <div className="grid gap-7 md:grid-cols-[0.72fr_1.28fr]">
      <div className="border-r border-[#E5E9E5] pr-5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#EDE9E3] text-[11px] font-semibold text-[#5B534D]">
          MT
        </span>
        <div className="mt-3 text-[15px] font-semibold">Mia Thompson</div>
        <div className="mt-1 text-[9px] text-[#8A918C]">Existing customer · Residential</div>

        <div className="mt-7 space-y-4">
          {[
            ["Campaign", "Service availability"],
            ["Channel", "SMS"],
            ["Owner", "Ben Walker"],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-[#E6EAE6] pb-3">
              <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#959B96]">{label}</div>
              <div className="mt-1 text-[9px] font-semibold text-[#4C544F]">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Conversation</div>

        <div className="mt-5 ml-auto max-w-[88%] rounded-[16px] rounded-br-[5px] bg-[#EEF2FF] px-4 py-3.5 text-[11px] leading-[1.55] text-[#4A5668]">
          Hi Mia, we have extra service appointments next week. Want the available times?
        </div>

        <div className="mt-3 max-w-[88%] rounded-[16px] rounded-bl-[5px] bg-[#EAF0E7] px-4 py-3.5 text-[11px] leading-[1.55] text-[#465146]">
          Yes please. Thursday would be best.
        </div>

        <div className="mt-6 flex items-center gap-2 border-t border-[#E7EAE7] pt-5 text-[9px] font-semibold text-[#63705D]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7E916B]" />
          Customer context stays attached
        </div>
      </div>
    </div>
  );
}

function CampaignMoments() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div className="max-w-[420px]">
            <h2
              className="text-[31px] font-medium leading-[1.04] tracking-[-0.044em] sm:text-[36px] lg:text-[39px]"
              style={{ fontFamily: DISPLAY }}
            >
              One customer base.
              <span className="block text-[#737C75]">Plenty of reasons to run a campaign.</span>
            </h2>
            <p className="mt-5 text-[14px] leading-[1.68] text-[#6B726C]">
              The audience changes with the reason. The database does not have to.
            </p>
          </div>

          <div className="border-t border-[#DDE2DE]">
            {[
              ["Seasonal campaign", "Customers relevant to a seasonal service", "Reach the people the offer actually suits."],
              ["New service", "Customers who already know your business", "Give them another relevant reason to buy."],
              ["Customer update", "Customers affected by a change", "Contact only the people who need to know."],
              ["Targeted promotion", "A defined customer segment", "Run the offer against the audience it was meant for."],
            ].map(([reason, audience, action], index) => (
              <Reveal key={reason} delay={index * 0.025}>
                <div className="grid gap-3 border-b border-[#DDE2DE] py-5 sm:grid-cols-[0.72fr_1fr] sm:gap-8">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7B837D]">{reason}</div>
                    <div className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-[#303733]">{audience}</div>
                  </div>
                  <div className="self-center text-[13px] leading-[1.62] text-[#69716B]">{action}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedDifference() {
  return (
    <section className="bg-[#1E2B29] px-5 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div className="max-w-[600px]">
          <h2
            className="text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[41px]"
            style={{ fontFamily: DISPLAY }}
          >
            Campaign software sends messages.
            <span className="block text-[#AFC3FF]">Zapla knows who you're sending them to.</span>
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["CRM", "Customer data"],
            ["Campaign", "Audience + message"],
            ["Conversation", "Reply + next step"],
          ].map(([title, copy], index) => (
            <div
              key={title}
              className={"py-4 sm:px-5 " + (index < 2 ? "border-b border-white/12 sm:border-b-0 sm:border-r" : "")}
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#DDA34B]">{title}</div>
              <div className="mt-2 text-[12px] leading-[1.55] text-white/58">{copy}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F8F9F7] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:gap-16">
        <Reveal className="max-w-[330px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Questions</div>
          <h2
            className="mt-3 text-[28px] font-medium leading-[1.04] tracking-[-0.042em] sm:text-[33px]"
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
                    className={
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border " +
                      (active
                        ? "border-[#1E2B29] bg-[#1E2B29] text-white"
                        : "border-[#DDE2DE] bg-white text-[#59615B]")
                    }
                    animate={reduced ? undefined : { rotate: active ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  >
                    <ChevronDown size={14} strokeWidth={1.7} />
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
            Put the customers you already know back to work.
          </h2>
          <p className="mt-4 max-w-[620px] text-[14px] leading-[1.7] text-[#69706A]">
            Customer Marketing is part of Zapla Growth.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white"
          >
            View Growth pricing <ArrowRight size={14} />
          </a>
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD8] px-6 text-[13px] font-semibold text-[#1E2B29]"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}
