import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageSquareText,
  Plus,
  Send,
  Tag,
} from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/customer-marketing")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer Marketing Software for Small Business | Zapla" },
      {
        name: "description",
        content:
          "Build targeted customer campaigns from the data already in Zapla, send by SMS or email, organise campaign assets, and track what happened.",
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
    a: "It is the proactive side of Zapla. Use customer data to build a relevant audience, run a targeted campaign, keep the campaign assets together and track what happened.",
  },
  {
    q: "Can I target customers using tags?",
    a: "Yes. Tags, fields, filters and saved lists can help define who should be included in a campaign instead of treating the whole database as one audience.",
  },
  {
    q: "Which channels can I use?",
    a: "SMS and email are core campaign channels. Other connected marketing assets depend on your setup.",
  },
  {
    q: "What can sit inside a Campaign?",
    a: "Campaigns can group relevant marketing assets such as forms, websites, funnels, landing pages, calendars, automations, pipelines, email templates, social posts and other supported assets.",
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
      <CampaignFlow />
      <CampaignExamples />
      <ConnectedDifference />
      <Faq />
      <GrowthCta />
      <DominoFooter />
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

function ProductBar({ label, right }: { label: string; right?: string }) {
  return (
    <div className="flex min-h-[46px] items-center justify-between border-b border-[#E3E7E3] bg-[#FCFCFB] px-4 sm:px-5">
      <div className="flex items-center gap-3">
        <img src={ZAPLA_WORDMARK_URL} alt="Zapla" className="h-[18px] w-auto object-contain" />
        <span className="h-4 w-px bg-[#D9DEDA]" />
        <span className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#78817B]">{label}</span>
      </div>
      {right ? (
        <span className="hidden text-[8px] font-bold uppercase tracking-[0.12em] text-[#929893] sm:block">
          {right}
        </span>
      ) : null}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFCFA] px-5 pb-16 pt-[106px] sm:px-10 sm:pb-20 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[120px]">
      <div className="pointer-events-none absolute -left-[14%] top-[8%] h-[560px] w-[560px] rounded-full bg-[#EDF2E9] blur-[135px]" />
      <div className="pointer-events-none absolute right-[1%] top-[4%] h-[440px] w-[440px] rounded-full bg-[#2563FF]/[0.035] blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.74fr_1.26fr] lg:gap-16">
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

          <p className="mt-6 max-w-[570px] text-[15px] leading-[1.72] text-[#626862] sm:text-[17px]">
            Use tags and customer data already in Zapla to build the right audience, reach them by SMS or email, and track the campaign from first touch to result.
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
          <HeroCampaignWorkspace />
        </Reveal>
      </div>
    </section>
  );
}

function HeroCampaignWorkspace() {
  return (
    <div className="relative mx-auto w-full max-w-[840px] pb-12">
      <div className="pointer-events-none absolute inset-x-[7%] bottom-0 top-[15%] rounded-[34px] bg-[#D7E0CE]" />

      <div className="relative overflow-hidden rounded-[22px] border border-[#D9DEDA] bg-white shadow-[0_32px_82px_rgba(38,48,40,.13)]">
        <ProductBar label="Campaign" right="Service availability" />

        <div className="grid min-h-[420px] lg:grid-cols-[0.66fr_1.34fr]">
          <div className="border-b border-[#E4E8E4] bg-[#F9FAF8] p-5 lg:border-b-0 lg:border-r">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">
              Audience
            </div>
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

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <div className="text-[22px] font-semibold tracking-[-0.04em]">86</div>
                <div className="text-[8px] text-[#8B918D]">matched customers</div>
              </div>
              <Tag size={15} className="text-[#75816D]" />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">
                  Campaign message
                </div>
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

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Audience", "86 customers"],
                ["Channel", "SMS"],
                ["Campaign", "Service availability"],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-[#E5E9E5] pt-3">
                  <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#969C97]">{label}</div>
                  <div className="mt-1 text-[9px] font-semibold text-[#4B534E]">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#E7EAE7] pt-5">
              <span className="text-[9px] font-semibold text-[#737B75]">Audience attached to campaign</span>
              <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#1E2B29] px-4 text-[9px] font-semibold text-white">
                Send <Send size={11} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignFlow() {
  const [active, setActive] = useState(0);
  const beatOne = useRef<HTMLDivElement>(null);
  const beatTwo = useRef<HTMLDivElement>(null);
  const beatThree = useRef<HTMLDivElement>(null);
  const beatFour = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [beatOne, beatTwo, beatThree, beatFour];
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
        <Reveal className="max-w-[720px]">
          <p
            className="text-[24px] font-medium leading-[1.18] tracking-[-0.035em] text-[#303632] sm:text-[29px] lg:text-[32px]"
            style={{ fontFamily: DISPLAY }}
          >
            You already paid to win the customer.
            <span className="text-[#737C75]"> The opportunity is knowing who to contact next.</span>
          </p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-20">
          <div>
            <div ref={beatOne} className="flex min-h-[62vh] items-center lg:min-h-[76vh]">
              <FlowBeat
                active={active === 0}
                title="Start with the customers the campaign is actually for."
                copy="Tags, fields, filters and saved lists turn the contacts already in your CRM into a useful marketing audience."
              />
            </div>

            <div ref={beatTwo} className="flex min-h-[62vh] items-center lg:min-h-[76vh]">
              <FlowBeat
                active={active === 1}
                title="Now reach them with the campaign."
                copy="Send targeted SMS or email without rebuilding the audience somewhere else."
              />
            </div>

            <div ref={beatThree} className="flex min-h-[62vh] items-center lg:min-h-[76vh]">
              <FlowBeat
                active={active === 2}
                title="One campaign can be more than one message."
                copy="Keep the supporting assets together, from forms and booking pages to automations, email templates and social posts."
              />
            </div>

            <div ref={beatFour} className="flex min-h-[62vh] items-center lg:min-h-[76vh]">
              <FlowBeat
                active={active === 3}
                title="Then see what the campaign actually did."
                copy="Track reach, engagement, conversions, won deals, costs and return from the same campaign workspace."
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
  const labels = ["Audience builder", "SMS + email", "Campaign workspace", "Performance"];

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-[#D8DED9] bg-white shadow-[0_30px_90px_rgba(38,48,40,.1)]">
      <ProductBar label={labels[active]} right="Customer Marketing" />

      <div className="flex items-center gap-2 border-b border-[#E6EAE6] bg-white px-5 py-3">
        {labels.map((label, index) => (
          <span
            key={label}
            className={
              "h-1.5 rounded-full transition-all duration-300 " +
              (active === index ? "w-7 bg-[#2563FF]" : "w-1.5 bg-[#D5DAD6]")
            }
          />
        ))}
      </div>

      <div className="relative min-h-[470px] bg-[#FBFCFA]">
        <StateLayer active={active === 0} reduced={reduced}>
          <AudienceState />
        </StateLayer>
        <StateLayer active={active === 1} reduced={reduced}>
          <MessagingState />
        </StateLayer>
        <StateLayer active={active === 2} reduced={reduced}>
          <CampaignWorkspaceState />
        </StateLayer>
        <StateLayer active={active === 3} reduced={reduced}>
          <PerformanceState />
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
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Audience</div>
          <div className="mt-1.5 text-[21px] font-semibold tracking-[-0.03em]">Residential Sydney</div>
        </div>
        <div className="text-right">
          <div className="text-[26px] font-semibold tracking-[-0.04em]">86</div>
          <div className="text-[8px] text-[#8C938E]">matched</div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-4 border-r border-[#E5E9E5] pr-5">
          {[
            ["Tag", "Existing customer"],
            ["Tag", "Service due"],
            ["Location", "Sydney"],
          ].map(([label, value], index) => (
            <div key={label + value + index} className="border-b border-[#E6EAE6] pb-3">
              <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#949A95]">{label}</div>
              <div className="mt-1 flex items-center gap-2 text-[10px] font-semibold text-[#4A524D]">
                {label === "Tag" ? <Tag size={11} className="text-[#75816D]" /> : null}
                {value}
              </div>
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

function MessagingState() {
  return (
    <div className="grid gap-7 md:grid-cols-[0.7fr_1.3fr]">
      <div className="border-r border-[#E5E9E5] pr-5">
        <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Selected audience</div>
        <div className="mt-1.5 text-[19px] font-semibold tracking-[-0.03em]">Residential Sydney</div>
        <div className="mt-1 text-[9px] text-[#8B918D]">86 customers</div>

        <div className="mt-7 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#2563FF]">
            <MessageSquareText size={13} /> SMS campaign
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#8B918D]">
            <Mail size={13} /> Email campaign
          </div>
        </div>

        <div className="mt-8 text-[8px] font-bold uppercase tracking-[0.12em] text-[#949A95]">
          Audience stays connected to the campaign
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

function CampaignWorkspaceState() {
  const assets = [
    ["Automation", "Follow up after campaign response"],
    ["Calendar", "Service booking"],
    ["Landing page", "Campaign offer"],
    ["Email template", "Customer campaign"],
    ["Social post", "Supporting campaign post"],
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full border border-[#CDD4CE] text-[11px]">◎</span>
            <span className="text-[19px] font-semibold tracking-[-0.03em]">Service availability</span>
          </div>
          <div className="mt-2 text-[9px] text-[#8A918C]">
            Draft · Influence window: 30 days
          </div>
        </div>

        <span className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#CDBB9D] px-4 text-[9px] font-bold uppercase tracking-[0.08em] text-[#2D2A26]">
          <Plus size={12} /> Add assets
        </span>
      </div>

      <div className="mt-6 flex gap-6 border-b border-[#E4E8E4] text-[9px] font-semibold text-[#7B837D]">
        <span className="border-b-2 border-[#202622] pb-3 text-[#202622]">Assets</span>
        <span className="pb-3">Members</span>
        <span className="pb-3">Activity</span>
        <span className="pb-3">Performance</span>
        <span className="pb-3">Settings</span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
        <div className="border-y border-[#E5E9E5]">
          {assets.map(([type, name]) => (
            <div key={type} className="flex items-center justify-between gap-4 border-b border-[#E5E9E5] py-3.5 last:border-b-0">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8B938D]">{type}</div>
                <div className="mt-1 text-[10px] font-semibold text-[#404843]">{name}</div>
              </div>
              <Check size={12} className="text-[#708060]" />
            </div>
          ))}
        </div>

        <div className="rounded-[16px] border border-[#E2E6E2] bg-white p-4">
          <div className="text-[10px] font-semibold">Add assets</div>
          <div className="mt-1 text-[8px] text-[#8A918C]">Bring the pieces of the campaign together.</div>

          <div className="mt-4 space-y-2.5">
            {["Form", "Website", "Funnel", "Landing Page", "Calendar", "Automation", "Pipeline", "Email Template", "Social Post"].map((item) => (
              <div key={item} className="flex items-center justify-between text-[9px]">
                <span className="text-[#4A524D]">{item}</span>
                <Plus size={10} className="text-[#949A95]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformanceState() {
  const reach = ["Reached", "Engaged", "Converted", "Won deals"];
  const returns = ["Won deal value", "Collected", "Costs", "Return on cost", "Value per unit spent", "Payments"];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Campaign performance</div>
          <div className="mt-1.5 text-[19px] font-semibold tracking-[-0.03em]">Service availability</div>
        </div>
        <div className="text-[9px] text-[#8A918C]">30 day influence window</div>
      </div>

      <div className="mt-6">
        <div className="text-[9px] font-semibold text-[#39413C]">Reach</div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {reach.map((metric) => (
            <div key={metric} className="rounded-[12px] border border-[#E2E6E2] bg-white p-3">
              <div className="text-[8px] text-[#8A918C]">{metric}</div>
              <div className="mt-2 text-[11px] font-semibold text-[#404843]">Tracked</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[9px] font-semibold text-[#39413C]">Return</div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {returns.map((metric) => (
            <div key={metric} className="rounded-[12px] border border-[#E2E6E2] bg-white p-3">
              <div className="text-[8px] text-[#8A918C]">{metric}</div>
              <div className="mt-2 text-[10px] font-semibold text-[#59615B]">Campaign metric</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 border-t border-[#E5E9E5] pt-5 text-[9px] font-semibold text-[#68726A]">
        <Check size={12} className="text-[#708060]" />
        Performance stays attached to the campaign
      </div>
    </div>
  );
}

function CampaignExamples() {
  const examples = [
    {
      label: "Seasonal service",
      tags: ["Existing customer", "Service due", "Sydney"],
      line: "Reach the customers the offer actually suits.",
    },
    {
      label: "Rate update",
      tags: ["Mortgage client", "Variable rate"],
      line: "Build a campaign around the customers affected by the change.",
    },
    {
      label: "New service launch",
      tags: ["Existing customer", "Relevant service"],
      line: "Tell the people most likely to care before telling everyone.",
    },
  ] as const;

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[650px]">
          <h2
            className="text-[31px] font-medium leading-[1.04] tracking-[-0.044em] sm:text-[36px] lg:text-[39px]"
            style={{ fontFamily: DISPLAY }}
          >
            The tags can change.
            <span className="block text-[#737C75]">The campaign follows the audience.</span>
          </h2>
        </Reveal>

        <div className="mt-10 border-t border-[#DDE2DE]">
          {examples.map((example, index) => (
            <Reveal key={example.label} delay={index * 0.03}>
              <div className="grid gap-4 border-b border-[#DDE2DE] py-6 md:grid-cols-[0.7fr_1.05fr_1.05fr] md:items-center md:gap-8">
                <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#303733]">{example.label}</div>

                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F3EE] px-3 py-1.5 text-[9px] font-semibold text-[#5B665C]">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[13px] leading-[1.62] text-[#69716B]">{example.line}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConnectedDifference() {
  return (
    <section className="bg-[#1E2B29] px-5 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
        <div className="max-w-[620px]">
          <h2
            className="text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[41px]"
            style={{ fontFamily: DISPLAY }}
          >
            Most marketing tools start with the message.
            <span className="block text-[#AFC3FF]">Zapla starts with the customer.</span>
          </h2>
          <p className="mt-5 max-w-[560px] text-[14px] leading-[1.7] text-white/58">
            Your tags, customer data, campaigns, campaign assets and results stay connected in the same system.
          </p>
        </div>

        <div className="grid gap-0 sm:grid-cols-4">
          {[
            ["CRM", "Customer data"],
            ["Audience", "Tags + filters"],
            ["Campaign", "Message + assets"],
            ["Performance", "Engagement + results"],
          ].map(([title, copy], index) => (
            <div
              key={title}
              className={"py-4 sm:px-5 " + (index < 3 ? "border-b border-white/12 sm:border-b-0 sm:border-r" : "")}
            >
              <div className="text-[9px] font-bold uppercase tracking-[0.13em] text-[#DDA34B]">{title}</div>
              <div className="mt-2 text-[11px] leading-[1.55] text-white/58">{copy}</div>
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
            Turn customer data into campaigns you can actually measure.
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
