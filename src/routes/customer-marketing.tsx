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
          "Use customer data and tags to build relevant audiences, run SMS and email outreach through automations, and track campaign engagement, conversions and return in Zapla.",
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
    a: "It is the proactive side of Zapla. Use customer data to build a relevant audience, run SMS or email outreach through automations, then use Campaigns to group the wider marketing initiative and track what it produced.",
  },
  {
    q: "Can I target customers using tags?",
    a: "Yes. Tags, fields, filters and saved lists can help define who should be included instead of treating the whole customer database as one audience.",
  },
  {
    q: "Where do SMS and email campaigns run?",
    a: "SMS and email outreach is built through Automations. The Campaigns area is used to group marketing assets and track engagement, conversions and performance across the wider campaign.",
  },
  {
    q: "What can sit inside a Campaign?",
    a: "Campaigns can group supported assets such as forms, websites, funnels, landing pages, calendars, automations, pipelines, email templates, social posts and tracking links.",
  },
  {
    q: "Is Customer Marketing the same as Reopen?",
    a: "No. Reopen focuses on dormant enquiries and stale opportunities. Customer Marketing is broader proactive marketing to relevant customer groups.",
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
      <CustomerMarketingFlow />
      <CampaignExamples />
      <ConnectedSystem />
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
      <div className="flex min-w-0 items-center gap-3">
        <img src={ZAPLA_WORDMARK_URL} alt="Zapla" className="h-[18px] w-auto shrink-0 object-contain" />
        <span className="h-4 w-px shrink-0 bg-[#D9DEDA]" />
        <span className="truncate text-[7px] font-bold uppercase tracking-[0.12em] text-[#78817B]">{label}</span>
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
      <div className="pointer-events-none absolute -left-[14%] top-[7%] h-[560px] w-[560px] rounded-full bg-[#EDF2E9] blur-[135px]" />
      <div className="pointer-events-none absolute right-[1%] top-[4%] h-[440px] w-[440px] rounded-full bg-[#2563FF]/[0.035] blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.73fr_1.27fr] lg:gap-16">
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

          <p className="mt-6 max-w-[575px] text-[15px] leading-[1.72] text-[#626862] sm:text-[17px]">
            Use customer data and tags to choose the right audience, run SMS or email outreach through automations, then see what your marketing actually produced.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a
              href="#customer-marketing-flow"
              className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD8] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BBC5BD]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <HeroAutomation />
        </Reveal>
      </div>
    </section>
  );
}

function HeroAutomation() {
  return (
    <div className="relative mx-auto w-full max-w-[840px] pb-12">
      <div className="pointer-events-none absolute inset-x-[7%] bottom-0 top-[15%] rounded-[34px] bg-[#D7E0CE]" />

      <div className="relative overflow-hidden rounded-[22px] border border-[#D9DEDA] bg-white shadow-[0_32px_82px_rgba(38,48,40,.13)]">
        <ProductBar label="Automation" right="Service availability campaign" />

        <div className="grid min-h-[430px] lg:grid-cols-[0.62fr_1.38fr]">
          <div className="border-b border-[#E4E8E4] bg-[#F9FAF8] p-5 lg:border-b-0 lg:border-r">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Audience</div>
            <div className="mt-1.5 text-[16px] font-semibold tracking-[-0.025em]">Residential Sydney</div>

            <div className="mt-5 space-y-3">
              {["Existing customer", "Service due", "Sydney"].map((item) => (
                <div key={item} className="flex items-center gap-2 border-b border-[#E5E9E5] pb-3 text-[9px] font-semibold text-[#4B534E]">
                  <Tag size={11} className="text-[#75816D]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <div className="text-[22px] font-semibold tracking-[-0.04em]">86</div>
                <div className="text-[8px] text-[#8B918D]">matching customers</div>
              </div>
              <Check size={15} className="text-[#708060]" />
            </div>
          </div>

          <div className="relative p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Automation flow</div>
                <div className="mt-1.5 text-[18px] font-semibold tracking-[-0.03em]">Service availability</div>
              </div>
              <span className="rounded-full bg-[#EEF3EA] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#627157]">
                Active
              </span>
            </div>

            <div className="relative mt-6 pl-5">
              <div className="absolute bottom-6 left-[9px] top-6 w-px bg-[#D8DDD9]" />
              <AutomationNode
                dot="#7C8868"
                eyebrow="Audience"
                title="Residential Sydney"
                meta="Existing customer · Service due · Sydney"
              />
              <AutomationNode
                dot="#2563FF"
                eyebrow="Action"
                title="Send SMS"
                meta="Service availability message"
                icon={<MessageSquareText size={12} />}
              />
              <AutomationNode
                dot="#C7A469"
                eyebrow="Wait"
                title="2 days"
                meta="Continue only if no response"
              />
              <AutomationNode
                dot="#2563FF"
                eyebrow="Action"
                title="Send email"
                meta="Follow-up email"
                icon={<Mail size={12} />}
                last
              />
            </div>

            <div className="mt-4 border-t border-[#E6EAE6] pt-4 text-[9px] font-semibold text-[#69716B]">
              Customer data decides who enters. Automation handles what happens next.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationNode({
  dot,
  eyebrow,
  title,
  meta,
  icon,
  last = false,
}: {
  dot: string;
  eyebrow: string;
  title: string;
  meta: string;
  icon?: ReactNode;
  last?: boolean;
}) {
  return (
    <div className={"relative grid grid-cols-[18px_1fr] gap-3 " + (last ? "" : "pb-4")}>
      <span className="relative z-10 mt-[13px] h-[9px] w-[9px] rounded-full border-2 border-white" style={{ backgroundColor: dot }} />
      <div className="rounded-[13px] border border-[#E2E6E2] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(34,44,37,.035)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#949A95]">{eyebrow}</div>
            <div className="mt-1 text-[11px] font-semibold text-[#3D4540]">{title}</div>
          </div>
          {icon ? <span className="text-[#2563FF]">{icon}</span> : null}
        </div>
        <div className="mt-1 text-[8px] text-[#8A918C]">{meta}</div>
      </div>
    </div>
  );
}

function CustomerMarketingFlow() {
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

  const beats = [
    {
      ref: beatOne,
      title: "Your whole database isn't the audience.",
      copy: "Use tags, fields, filters and saved lists to turn the customer data already in Zapla into a relevant marketing audience.",
    },
    {
      ref: beatTwo,
      title: "Put that audience into motion.",
      copy: "Run SMS and email outreach through automations, with the audience and customer context already decided.",
    },
    {
      ref: beatThree,
      title: "Keep the whole campaign together.",
      copy: "Group the forms, pages, automations, booking links, social posts and other assets behind the initiative in Campaigns.",
    },
    {
      ref: beatFour,
      title: "See what turned into business.",
      copy: "Track who engaged, who converted, won deals, costs and return without piecing the campaign together across separate tools.",
    },
  ] as const;

  return (
    <section id="customer-marketing-flow" className="bg-[#F7F8F5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[760px]">
          <p
            className="text-[25px] font-medium leading-[1.18] tracking-[-0.035em] text-[#303632] sm:text-[29px] lg:text-[32px]"
            style={{ fontFamily: DISPLAY }}
          >
            You already paid to win the customer.
            <span className="text-[#737C75]"> The opportunity is using what you know about them.</span>
          </p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.64fr_1.36fr] lg:gap-20">
          <div>
            {beats.map((beat, index) => (
              <div
                key={beat.title}
                ref={beat.ref}
                className="flex min-h-[64vh] items-center lg:min-h-[76vh]"
              >
                <FlowBeat active={active === index} title={beat.title} copy={beat.copy} />
                <div className="mt-8 lg:hidden">
                  <FlowCanvas active={index} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
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
    <div className={"max-w-[470px] transition-opacity duration-300 " + (active ? "opacity-100" : "opacity-42")}>
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
  const labels = ["Contacts", "Automations", "Campaigns", "Performance"];

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

      <div className="relative min-h-[492px] bg-[#FBFCFA]">
        <StateLayer active={active === 0} reduced={reduced}>
          <AudienceState />
        </StateLayer>
        <StateLayer active={active === 1} reduced={reduced}>
          <AutomationState />
        </StateLayer>
        <StateLayer active={active === 2} reduced={reduced}>
          <CampaignsState />
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Smart list</div>
          <div className="mt-1.5 text-[21px] font-semibold tracking-[-0.03em]">Residential service due</div>
        </div>
        <div className="text-right">
          <div className="text-[26px] font-semibold tracking-[-0.04em]">86</div>
          <div className="text-[8px] text-[#8C938E]">matching customers</div>
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

function AutomationState() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Automation</div>
          <div className="mt-1.5 text-[20px] font-semibold tracking-[-0.03em]">Service availability</div>
          <div className="mt-1 text-[9px] text-[#8B918D]">Audience: Residential service due</div>
        </div>
        <span className="rounded-full bg-[#EEF3EA] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#627157]">
          Active
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[0.92fr_1.08fr]">
        <div className="relative pl-4">
          <div className="absolute bottom-5 left-[4px] top-5 w-px bg-[#D8DDD9]" />
          <AutomationNode
            dot="#7C8868"
            eyebrow="Entry"
            title="Customer enters smart list"
            meta="Existing customer · Service due · Sydney"
          />
          <AutomationNode
            dot="#2563FF"
            eyebrow="Action"
            title="Send SMS"
            meta="Service availability"
            icon={<MessageSquareText size={12} />}
          />
          <AutomationNode
            dot="#C7A469"
            eyebrow="Wait"
            title="Wait 2 days"
            meta="Continue if no response"
          />
          <AutomationNode
            dot="#2563FF"
            eyebrow="Action"
            title="Send email"
            meta="Follow-up message"
            icon={<Mail size={12} />}
            last
          />
        </div>

        <div className="border-l border-[#E5E9E5] pl-5">
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Message preview</div>
          <div className="mt-4 rounded-[16px] bg-[#F0F3F8] p-4">
            <div className="text-[9px] font-semibold text-[#394556]">SMS</div>
            <p className="mt-2 text-[11px] leading-[1.6] text-[#596575]">
              Hi Mia, we have extra service appointments next week. Want the available times?
            </p>
          </div>

          <div className="mt-4 rounded-[16px] border border-[#E3E7E3] bg-white p-4">
            <div className="text-[9px] font-semibold text-[#394556]">Email</div>
            <p className="mt-2 text-[10px] leading-[1.6] text-[#68716B]">
              A follow-up can run later if the customer has not responded.
            </p>
          </div>

          <div className="mt-5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#949A95]">
            Outreach runs through Automations
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignsState() {
  const assets = [
    ["Automation", "Service availability outreach"],
    ["Calendar", "Service booking"],
    ["Landing Page", "Campaign offer"],
    ["Tracking Link", "Campaign link"],
    ["Social Post", "Supporting post"],
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full border border-[#CDD4CE] text-[11px]">◎</span>
            <span className="text-[19px] font-semibold tracking-[-0.03em]">Service availability</span>
          </div>
          <div className="mt-2 text-[9px] text-[#8A918C]">Draft · Influence window: 30 days</div>
        </div>

        <span className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#CDBB9D] px-4 text-[9px] font-bold uppercase tracking-[0.08em] text-[#2D2A26]">
          <Plus size={12} /> Add assets
        </span>
      </div>

      <div className="mt-6 flex gap-6 overflow-x-auto border-b border-[#E4E8E4] text-[9px] font-semibold text-[#7B837D]">
        <span className="shrink-0 border-b-2 border-[#202622] pb-3 text-[#202622]">Assets (5)</span>
        <span className="shrink-0 pb-3">Members</span>
        <span className="shrink-0 pb-3">Activity</span>
        <span className="shrink-0 pb-3">Performance</span>
        <span className="shrink-0 pb-3">Settings</span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#8B938D]">Attached assets</div>
          <div className="mt-3 border-y border-[#E5E9E5]">
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
        </div>

        <div className="rounded-[12px] border border-[#D9DEDA] bg-white shadow-[0_12px_34px_rgba(37,46,40,.06)]">
          <div className="border-b border-[#E5E9E5] px-4 py-3">
            <div className="text-[11px] font-semibold">Add assets</div>
            <div className="mt-1 text-[8px] text-[#8A918C]">Pick what belongs to this campaign.</div>
          </div>
          <div className="max-h-[280px] overflow-hidden px-4 py-3">
            {["Form", "Website", "Funnel", "Landing Page", "Calendar", "Tracking Link", "Automation", "Pipeline", "Email Template", "Social Post"].map((item) => (
              <div key={item} className="flex items-center justify-between py-2 text-[9px]">
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
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#848C86]">Performance</div>
          <div className="mt-1.5 text-[19px] font-semibold tracking-[-0.03em]">Service availability</div>
        </div>
        <div className="text-[9px] text-[#8A918C]">Influence window: 30 days</div>
      </div>

      <div className="mt-6 flex gap-6 border-b border-[#E4E8E4] text-[9px] font-semibold text-[#7B837D]">
        <span className="pb-3">Assets</span>
        <span className="pb-3">Members</span>
        <span className="pb-3">Activity</span>
        <span className="border-b-2 border-[#202622] pb-3 text-[#202622]">Performance</span>
        <span className="pb-3">Settings</span>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <div className="text-[9px] font-semibold text-[#39413C]">Reach</div>
          <div className="text-[8px] text-[#929893]">Campaign measurement</div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {["Reached", "Engaged", "Converted", "Won deals"].map((metric) => (
            <MetricCard key={metric} label={metric} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[9px] font-semibold text-[#39413C]">Return</div>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
          {["Won deal value", "Collected", "Costs", "Return on cost", "Value per unit spent", "Payments"].map((metric) => (
            <MetricCard key={metric} label={metric} compact />
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-[#E5E9E5] pt-4 text-[9px] font-semibold text-[#68726A]">
        Campaigns connects engagement and conversion activity back to the initiative.
      </div>
    </div>
  );
}

function MetricCard({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className={"rounded-[10px] border border-[#E2E6E2] bg-white " + (compact ? "p-3" : "p-3.5")}>
      <div className="text-[8px] text-[#8A918C]">{label}</div>
      <div className="mt-2 text-[13px] font-semibold tracking-[-0.02em] text-[#4A524D]">—</div>
    </div>
  );
}

function CampaignExamples() {
  const examples = [
    {
      label: "Seasonal service",
      tags: ["Existing customer", "Service due", "Sydney"],
      line: "Run the outreach against the customers the offer actually suits.",
    },
    {
      label: "Rate update",
      tags: ["Mortgage client", "Variable rate"],
      line: "Use customer tags to build the audience affected by the change.",
    },
    {
      label: "New service",
      tags: ["Existing customer", "Relevant service"],
      line: "Tell the people most likely to care before telling everyone.",
    },
  ] as const;

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <div className="max-w-[420px]">
            <h2
              className="text-[31px] font-medium leading-[1.04] tracking-[-0.044em] sm:text-[36px] lg:text-[39px]"
              style={{ fontFamily: DISPLAY }}
            >
              Same customer base.
              <span className="block text-[#737C75]">Different reasons to get in touch.</span>
            </h2>
          </div>

          <div className="border-t border-[#DDE2DE]">
            {examples.map((example, index) => (
              <Reveal key={example.label} delay={index * 0.03}>
                <div className="grid gap-4 border-b border-[#DDE2DE] py-6 md:grid-cols-[0.7fr_1.05fr_1.05fr] md:items-center md:gap-8">
                  <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#303733]">{example.label}</div>

                  <div className="flex flex-wrap gap-2">
                    {example.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F3EE] px-3 py-1.5 text-[9px] font-semibold text-[#5B665C]"
                      >
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
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedSystem() {
  return (
    <section className="bg-[#1E2B29] px-5 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div className="max-w-[620px]">
          <h2
            className="text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[41px]"
            style={{ fontFamily: DISPLAY }}
          >
            From customer data to campaign results,
            <span className="block text-[#AFC3FF]">it stays connected.</span>
          </h2>
          <p className="mt-5 max-w-[570px] text-[14px] leading-[1.7] text-white/58">
            Build the audience in your CRM. Run the outreach through Automations. Group the initiative in Campaigns. See what engaged, converted and produced business.
          </p>
        </div>

        <div className="grid gap-0 sm:grid-cols-4">
          {[
            ["CRM", "Customer data + tags"],
            ["Automations", "SMS + email outreach"],
            ["Campaigns", "Assets + attribution"],
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
            Put the customer data you already have to work.
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
