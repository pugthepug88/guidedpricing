import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  Filter,
  Globe2,
  Infinity as InfinityIcon,
  LayoutTemplate,
  Mail,
  MessageSquare,
  MousePointer2,
  Search,
  Settings2,
  SlidersHorizontal,
  TicketCheck,
  Users,
  Workflow,
} from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";

export const Route = createFileRoute("/crm_v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "CRM for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "Zapla CRM keeps customer records, conversations, pipelines and automations connected, with unlimited users, unlimited contacts and Guided Launch.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CrmV2Page,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Can I bring my existing contacts into Zapla?",
    a: "Yes. Guided Launch can include moving the agreed customer data and core contact information into Zapla so your team is not starting from an empty workspace.",
  },
  {
    q: "Can I customise the information stored on a customer?",
    a: "Yes. Customer records can use fields, tags, owners and filters that match the way your business works.",
  },
  {
    q: "Do conversations stay connected to the customer record?",
    a: "Yes. The unified inbox keeps the conversation beside the customer profile so the person replying can see the context around it.",
  },
  {
    q: "Can activity in the CRM trigger automations?",
    a: "Yes. Customer events, stages, timing and other agreed states can be used to start automations and workflows.",
  },
  {
    q: "How many users and contacts can I have?",
    a: "Zapla CRM includes unlimited users and unlimited contacts. Communications and other usage-based services are separate from stored contact and user limits.",
  },
  {
    q: "Where can I see pricing?",
    a: "Pricing is kept on the dedicated Zapla pricing page so this page can stay focused on the CRM itself.",
  },
] as const;

function CrmV2Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FCFCFA] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <Hero />
      <CustomerWorkbench />
      <PipelineRail />
      <Automation />
      <ScaleSection />
      <ConnectedPlatform />
      <Faq />
      <FinalCta />
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
      transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={"text-[10px] font-semibold uppercase tracking-[0.2em] " + (dark ? "text-[#8EACFF]" : "text-[#2563FF]")}>
      {children}
    </div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-[12px] bg-[#2563FF] px-6 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(37,99,255,.18)] transition-all hover:-translate-y-px hover:bg-[#1F56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#DDD5CA] bg-[#F7F4EE] px-5 pb-14 pt-[112px] sm:px-10 sm:pb-16 sm:pt-[120px] lg:px-16 lg:pb-20 lg:pt-[122px]">
      <div className="pointer-events-none absolute -left-[10%] top-[22%] h-[560px] w-[560px] rounded-full bg-[#DCE0CC]/45 blur-[135px]" />
      <div className="pointer-events-none absolute right-[-9%] top-[30%] h-[540px] w-[540px] rounded-full bg-[#E7CEC2]/35 blur-[140px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <Reveal className="mx-auto max-w-[920px] text-center">
          <Eyebrow>Zapla CRM</Eyebrow>

          <h1
            className="mx-auto mt-4 max-w-[900px] text-[39px] font-medium leading-[1] tracking-[-0.05em] sm:text-[47px] lg:text-[52px]"
            style={{ fontFamily: DISPLAY }}
          >
            The CRM that keeps every customer,
            <span className="block text-[#2563FF]">conversation and next step connected.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.72] font-medium text-[#4F5A64] sm:text-[17px]">
            Keep the customer record, messages, deal status and next action in one place, so whoever picks up the work sees the full context.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#crm-workbench"
              className="inline-flex h-[50px] items-center rounded-[12px] border border-[#D8D0C5] bg-[#FBF9F5] px-6 text-[13px] font-semibold text-[#1B1F23] shadow-[0_5px_14px_rgba(35,53,76,.05)] transition-colors hover:bg-white"
            >
              Explore the CRM
            </a>
          </div>

          <div className="mt-5 text-[11px] font-semibold text-[#59656F] sm:text-[12px]">
            Unlimited users <span className="mx-2 text-[#A8B2BD]">·</span> Unlimited contacts <span className="mx-2 text-[#A8B2BD]">·</span> Guided Launch
          </div>
        </Reveal>

        <Reveal className="mt-9 sm:mt-11" delay={0.05}>
          <HeroStage />
        </Reveal>
      </div>
    </section>
  );
}

function HeroStage() {
  return (
    <div className="relative mx-auto max-w-[1240px] rounded-[30px] border border-[#DDD5CA] bg-[#EEEAE2]/90 p-3 shadow-[0_26px_70px_rgba(35,53,76,.08)] sm:p-5">
      <CustomerRecordHero />
    </div>
  );
}

function CustomerRecordHero() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#D5DEE8] bg-white shadow-[0_30px_78px_rgba(35,53,76,.13)]">
      <div className="flex min-h-12 items-center gap-5 overflow-hidden border-b border-[#E2E7EC] bg-white px-4 sm:px-5">
        {["Contacts", "Contact types", "Contact fields", "Tags", "Smart lists", "Quick actions"].map((item, index) => (
          <span
            key={item}
            className={
              "whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.12em] " +
              (index === 0 ? "text-[#26313B]" : "hidden text-[#8A95A0] md:inline")
            }
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid min-h-[520px] lg:grid-cols-[225px_minmax(0,1fr)_205px]">
        <div className="border-b border-[#E2E7EC] bg-[#FAFBFC] p-4 lg:border-b-0 lg:border-r">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6F7A84]">Profile</div>

          <div className="mt-4 flex items-center gap-3">
            <Avatar cell={0} size={46} className="border border-white shadow-[0_6px_16px_rgba(35,53,76,.10)]" />
            <div>
              <div className="text-[13px] font-semibold text-[#26313B]">Mia Thompson</div>
              <div className="mt-0.5 text-[8px] text-[#737E88]">Northside Plumbing</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {[
              ["Call", "text-[#56604D] border-[#BFC6AE] bg-[#EEF0E5]"],
              ["Note", "text-[#2563FF] border-[#C7D6FF] bg-[#EEF3FF]"],
              ["Book", "text-[#A95D48] border-[#E2B7A9] bg-[#F5E7E1]"],
            ].map(([label, cls]) => (
              <div key={label} className={"grid h-8 place-items-center rounded-[7px] border text-[7px] font-bold uppercase tracking-[0.08em] " + cls}>
                {label}
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            {[
              ["Contact owner", "Ben Walker"],
              ["Department", "Sales"],
              ["Tags", "VIP · Residential"],
              ["Email", "mia@northside.com"],
              ["Phone", "0412 555 018"],
              ["Language", "English"],
            ].map(([label, value], index) => (
              <div key={label} className={"rounded-[8px] border px-3 py-2.5 " + (index < 3 ? "border-[#DCE3EA] bg-white" : "border-[#E5E9EE] bg-[#FDFDFE]")}>
                <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#8D98A3]">{label}</div>
                <div className="mt-1 text-[8px] font-medium text-[#4A5662]">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 bg-[#F7F8FA]">
          <div className="grid grid-cols-4 border-b border-[#E2E7EC] bg-white sm:grid-cols-7">
            {[
              ["Activity", true],
              ["Messaging", false],
              ["Notes", false],
              ["Files", false],
              ["Deals", false],
              ["Tasks", false],
              ["Jobs", false],
            ].map(([label, active], index) => (
              <div
                key={label as string}
                className={
                  "flex h-11 items-center justify-center border-r border-[#EEF1F4] text-[7px] font-bold uppercase tracking-[0.11em] " +
                  (active ? "bg-[#FAFBFC] text-[#26313B]" : "text-[#85919C] " + (index > 3 ? "hidden sm:flex" : ""))
                }
              >
                {label}
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-semibold text-[#26313B]">Recent activity</div>
                <div className="mt-1 text-[8px] text-[#6F7A84]">Everything around this customer, in order.</div>
              </div>
              <div className="inline-flex h-8 items-center gap-2 rounded-[7px] border border-[#DDE3E9] bg-white px-3 text-[8px] font-semibold text-[#65717D]">
                <Filter size={10} /> Filter
              </div>
            </div>

            <div className="relative mt-5">
              <div className="absolute bottom-2 left-[14px] top-2 w-px bg-[#D8E0E8]" />

              <ActivityItem
                tone="blue"
                title="Opportunity created"
                meta="Today · 09:12"
                copy="Hot water replacement"
                detail="Stage: Lead · Value: A$2,850"
              />
              <ActivityItem
                tone="sage"
                title="Quote sent"
                meta="Today · 09:24"
                copy="A$2,850 quote sent by SMS and email."
                detail="Owner: Ben Walker"
              />
              <ActivityItem
                tone="blush"
                title="Customer replied"
                meta="Today · 09:41"
                copy="Tuesday afternoon works. Can you send through the quote?"
                detail="SMS · Unified inbox"
              />
              <ActivityItem
                tone="oat"
                title="Stage changed"
                meta="Today · 09:43"
                copy="Proposal moved to Quote sent."
                detail="Pipeline: Residential sales"
              />
              <ActivityItem
                tone="slate"
                title="Next action scheduled"
                meta="In 2 days"
                copy="Follow up automatically if the customer has not replied."
                detail="Automation active"
                last
              />
            </div>
          </div>
        </div>

        <div className="hidden border-l border-[#E2E7EC] bg-white p-4 lg:block">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6F7A84]">Customer context</div>

          <div className="mt-4 space-y-2">
            <ContextCard
              label="Automation"
              value="Quote follow-up"
              sub="Active · waits 2 days"
              tone="blue"
            />
            <ContextCard
              label="Open deal"
              value="A$2,850"
              sub="Quote sent"
              tone="sage"
            />
            <ContextCard
              label="Task"
              value="Confirm site visit"
              sub="Due Tuesday"
              tone="oat"
            />
          </div>

          <div className="mt-5 border-t border-[#E4E8EC] pt-4">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6F7A84]">Also connected</div>
            <div className="mt-3 space-y-2">
              {["Notes", "Files", "Invoices", "Payments", "Bookings"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-[7px] border border-[#E2E7EC] bg-[#FAFBFC] px-3 py-2.5">
                  <span className="text-[8px] font-semibold text-[#4F5C68]">{item}</span>
                  <ChevronDown size={10} className="text-[#98A3AD]" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[9px] border border-[#D5CCBF] bg-[#F7F4EE] p-3">
            <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#58706F]">One record</div>
            <div className="mt-1 text-[9px] font-semibold leading-[1.45] text-[#3E4B59]">
              Profile, conversation, deal, task and automation stay attached to the same customer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  tone,
  title,
  meta,
  copy,
  detail,
  last = false,
}: {
  tone: "blue" | "sage" | "blush" | "oat" | "slate";
  title: string;
  meta: string;
  copy: string;
  detail: string;
  last?: boolean;
}) {
  const tones = {
    blue: "bg-[#E7E2FA] text-[#7359A7]",
    sage: "bg-[#E6EBCF] text-[#657247]",
    blush: "bg-[#F5D8E2] text-[#A84E73]",
    oat: "bg-[#FFE8B6] text-[#97651E]",
    slate: "bg-[#F6DCD4] text-[#A85C48]",
  };

  return (
    <div className={"relative pl-10 " + (last ? "pb-0" : "pb-3")}>
      <div className={"absolute left-0 top-1 z-10 grid h-7 w-7 place-items-center rounded-full text-[8px] font-bold " + tones[tone]}>
        {tone === "blue" ? "+" : tone === "sage" ? "✓" : tone === "blush" ? "↗" : tone === "oat" ? "→" : "•"}
      </div>

      <div className="rounded-[9px] border border-[#DEE4EA] bg-white p-3.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="text-[9px] font-semibold text-[#2D3843]">{title}</div>
          <div className="text-[7px] font-semibold text-[#7E8993]">{meta}</div>
        </div>
        <div className="mt-1.5 text-[9px] leading-[1.5] text-[#53606C]">{copy}</div>
        <div className="mt-2 rounded-[6px] bg-[#F7F8FA] px-2.5 py-2 text-[7px] font-medium text-[#7F8A95]">{detail}</div>
      </div>
    </div>
  );
}

function ContextCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "blue" | "sage" | "oat";
}) {
  const tones = {
    blue: "bg-[#F1ECFB] border-[#D8CDF0]",
    sage: "bg-[#F0F3E1] border-[#D5DCB8]",
    oat: "bg-[#FFF3D5] border-[#EFD59B]",
  };

  return (
    <div className={"rounded-[9px] border p-3 " + tones[tone]}>
      <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#66717C]">{label}</div>
      <div className="mt-1 text-[10px] font-semibold text-[#2F3A45]">{value}</div>
      <div className="mt-1 text-[7px] font-medium text-[#66717C]">{sub}</div>
    </div>
  );
}

function CustomerWorkbench() {
  const [mode, setMode] = useState<"segment" | "customer">("segment");

  return (
    <section id="crm-workbench" className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div className="max-w-[610px]">
            <Eyebrow>Work the database</Eyebrow>
            <h2
              className="mt-4 text-[36px] font-medium leading-[1] tracking-[-0.048em] sm:text-[46px] lg:text-[52px]"
              style={{ fontFamily: DISPLAY }}
            >
              Find the customers that need attention. Then open the full context.
            </h2>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5 lg:justify-end">
            <p className="max-w-[500px] text-[14px] font-medium leading-[1.72] text-[#59646E] sm:text-[15px]">
              Segment by tags, pipeline stage, owner, activity or custom fields. Save the audience, then open any customer without losing their conversation or history.
            </p>

            <div className="inline-flex rounded-[12px] border border-[#DADFE5] bg-[#F5F6F7] p-1">
              <button
                type="button"
                onClick={() => setMode("segment")}
                className={"rounded-[9px] px-4 py-2.5 text-[10px] font-semibold transition-all " + (mode === "segment" ? "bg-white text-[#111318] shadow-[0_4px_14px_rgba(35,53,76,.10)]" : "text-[#6E7984]")}
              >
                Segment customers
              </button>
              <button
                type="button"
                onClick={() => setMode("customer")}
                className={"rounded-[9px] px-4 py-2.5 text-[10px] font-semibold transition-all " + (mode === "customer" ? "bg-white text-[#111318] shadow-[0_4px_14px_rgba(35,53,76,.10)]" : "text-[#6E7984]")}
              >
                Open customer
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[28px] border border-[#DCD6CD] bg-[#FAFAF8] shadow-[0_20px_52px_rgba(35,53,76,.07)]">
            {mode === "segment" ? <SegmentSurface /> : <ConversationSurface />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SegmentSurface() {
  const matches = [
    { name: "Mia Thompson", cell: 0, owner: "Ben", stage: "Quote sent", activity: "2 days", tags: ["VIP", "Residential"] },
    { name: "Chris Moore", cell: 14, owner: "Alex", stage: "Quote sent", activity: "4 days", tags: ["VIP", "Electrical"] },
    { name: "Daniel Brooks", cell: 5, owner: "Sam", stage: "Quote sent", activity: "5 days", tags: ["VIP", "Commercial"] },
    { name: "Priya Shah", cell: 9, owner: "Ben", stage: "Quote sent", activity: "6 days", tags: ["VIP", "Repeat"] },
  ];

  return (
    <div className="grid lg:grid-cols-[1.34fr_.66fr]">
      <div className="min-w-0 p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-[16px] font-semibold text-[#26313B]">VIP quotes waiting on a reply</div>
              <span className="rounded-full bg-[#F1ECFB] px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-[#7359A7]">23 matches</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip label="Tag" value="VIP" tone="pink" />
              <FilterChip label="Stage" value="Quote sent" tone="gold" />
              <FilterChip label="Last activity" value="3+ days" tone="sage" />
              <FilterChip label="Owner" value="Any" tone="purple" />
            </div>
          </div>

          <div className="flex gap-2">
            <span className="inline-flex h-9 items-center gap-2 rounded-[9px] border border-[#DDE3E9] bg-white px-3 text-[8px] font-semibold text-[#59646E]">
              <SlidersHorizontal size={11} /> Columns
            </span>
            <span className="inline-flex h-9 items-center gap-2 rounded-[9px] bg-[#1E2B29] px-3 text-[8px] font-semibold text-white">
              Save smart list
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {matches.map((customer, i) => (
            <div
              key={customer.name}
              className={"grid items-center gap-3 rounded-[14px] border p-3.5 sm:grid-cols-[1.35fr_.7fr_.9fr_.65fr] " + (i === 0 ? "border-[#D8CDF0] bg-[#F8F5FD]" : "border-[#E1E5E9] bg-white")}
            >
              <div className="flex items-center gap-3">
                <Avatar cell={customer.cell} size={34} className="border-2 border-white shadow-[0_4px_12px_rgba(35,53,76,.10)]" />
                <div>
                  <div className="text-[10px] font-semibold text-[#293440]">{customer.name}</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {customer.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={"rounded-[5px] px-1.5 py-1 text-[6px] font-bold " + (tagIndex === 0 ? "bg-[#F5D8E2] text-[#A84E73]" : "bg-[#F1F3E7] text-[#657247]")}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87929D]">Owner</div>
                <div className="mt-1 text-[9px] font-medium text-[#4A5662]">{customer.owner}</div>
              </div>

              <div>
                <div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87929D]">Pipeline stage</div>
                <div className="mt-1 inline-flex rounded-[6px] bg-[#FFF3D5] px-2 py-1 text-[7px] font-bold text-[#97651E]">{customer.stage}</div>
              </div>

              <div>
                <div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87929D]">Last activity</div>
                <div className={"mt-1 text-[9px] font-semibold " + (i > 1 ? "text-[#A85C48]" : "text-[#59646E]")}>{customer.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E1E5E9] bg-[#F7F6F3] p-5 sm:p-6 lg:border-l lg:border-t-0">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#26313B]">
          <Filter size={14} className="text-[#7359A7]" />
          Build a customer segment
        </div>
        <p className="mt-1.5 text-[9px] leading-[1.55] text-[#6E7984]">
          Use the fields already attached to each customer. Add your own fields and tags when the business needs them.
        </p>

        <div className="mt-5 space-y-3">
          <FilterRule label="Tag" value="VIP" tone="pink" />
          <FilterRule label="Pipeline stage" value="Quote sent" tone="gold" />
          <FilterRule label="Last activity" value="More than 3 days ago" tone="sage" />
          <FilterRule label="Custom field" value="Service area = Sydney" tone="purple" />
        </div>

        <button type="button" className="mt-4 inline-flex items-center gap-2 text-[8px] font-semibold text-[#2563FF]">
          + Add another condition
        </button>

        <div className="mt-5 flex items-center justify-between border-t border-[#DDDCD7] pt-4">
          <div className="flex items-center gap-2 text-[9px] font-semibold text-[#7359A7]">
            <span className="h-2 w-2 rounded-full bg-[#D85A8A]" /> 23 customers match
          </div>
          <span className="text-[8px] font-semibold text-[#7B8690]">Match all conditions</span>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, value, tone }: { label: string; value: string; tone: "pink" | "gold" | "sage" | "purple" }) {
  const tones = {
    pink: "bg-[#F5D8E2] text-[#A84E73]",
    gold: "bg-[#FFF0C8] text-[#97651E]",
    sage: "bg-[#E9EDDA] text-[#657247]",
    purple: "bg-[#EEE7FA] text-[#7359A7]",
  };

  return <span className={"rounded-full px-2.5 py-1 text-[7px] font-bold " + tones[tone]}>{label}: {value}</span>;
}

function FilterRule({ label, value, tone }: { label: string; value: string; tone: "pink" | "gold" | "sage" | "purple" }) {
  const tones = {
    pink: "border-[#E9BECF] bg-[#FCF2F6]",
    gold: "border-[#EAD29B] bg-[#FFF8E8]",
    sage: "border-[#D2D9B6] bg-[#F5F7ED]",
    purple: "border-[#D7C9ED] bg-[#F8F5FC]",
  };

  return (
    <div className={"rounded-[11px] border p-3 " + tones[tone]}>
      <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#7A8590]">{label}</div>
      <div className="mt-1.5 flex items-center justify-between text-[9px] font-semibold text-[#394550]">
        {value} <ChevronDown size={11} />
      </div>
    </div>
  );
}

function ConversationSurface() {
  const customers = [
    { name: "Mia Thompson", cell: 0, preview: "Tuesday afternoon works. Can you send...", channel: "SMS", active: true },
    { name: "Daniel Brooks", cell: 5, preview: "Thanks, I have paid the invoice.", channel: "Email", active: false },
    { name: "John Smith", cell: 12, preview: "Can we move the booking to Friday?", channel: "SMS", active: false },
    { name: "Priya Shah", cell: 9, preview: "Perfect. See you then.", channel: "Email", active: false },
  ];

  return (
    <div className="grid min-h-[480px] lg:grid-cols-[240px_1fr_245px]">
      <div className="border-b border-[#E1E5E9] bg-[#FAFAF8] p-4 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[14px] font-semibold text-[#26313B]">Customer conversations</div>
            <div className="mt-1 text-[8px] text-[#77838E]">SMS and email in one view</div>
          </div>
          <Search size={13} className="text-[#6D7883]" />
        </div>

        <div className="mt-3 space-y-1.5">
          {customers.map((customer) => (
            <div key={customer.name} className={"rounded-[12px] border p-3 " + (customer.active ? "border-[#D8CDF0] bg-[#F8F5FD]" : "border-transparent bg-transparent")}>
              <div className="flex items-center gap-2.5">
                <Avatar cell={customer.cell} size={30} className="border-2 border-white" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-[9px] font-semibold text-[#293440]">{customer.name}</div>
                    <span className={"rounded-[5px] px-1.5 py-1 text-[6px] font-bold " + (customer.channel === "SMS" ? "bg-[#F5D8E2] text-[#A84E73]" : "bg-[#EEE7FA] text-[#7359A7]")}>{customer.channel}</span>
                  </div>
                  <div className="mt-1 truncate text-[7px] text-[#87929D]">{customer.preview}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col bg-white">
        <div className="flex items-center justify-between border-b border-[#E7EAED] px-5 py-4">
          <div>
            <div className="text-[12px] font-semibold text-[#293440]">Mia Thompson</div>
            <div className="mt-1 flex gap-1.5">
              <span className="rounded-[5px] bg-[#F5D8E2] px-2 py-1 text-[6px] font-bold text-[#A84E73]">VIP</span>
              <span className="rounded-[5px] bg-[#FFF0C8] px-2 py-1 text-[6px] font-bold text-[#97651E]">Quote sent</span>
              <span className="rounded-[5px] bg-[#E9EDDA] px-2 py-1 text-[6px] font-bold text-[#657247]">Residential</span>
            </div>
          </div>
          <div className="text-[7px] font-semibold text-[#7B8690]">Owner · Ben Walker</div>
        </div>

        <div className="flex flex-1 flex-col justify-between bg-[#FAFBFC] p-5">
          <div>
            <div className="max-w-[76%] rounded-[14px] border border-[#DFE4E9] bg-white px-4 py-3 text-[9px] leading-[1.55] text-[#45515E] shadow-[0_4px_12px_rgba(35,53,76,.04)]">
              Hi Mia, your quote is ready. Would Tuesday afternoon suit you for the site visit?
            </div>
            <div className="mt-3 ml-auto max-w-[72%] rounded-[14px] bg-[#F1ECFB] px-4 py-3 text-[9px] leading-[1.55] text-[#5E4A82]">
              Tuesday afternoon works. Can you send through the quote?
            </div>
          </div>

          <div className="rounded-[12px] border border-[#DDE3E9] bg-white px-4 py-3.5 text-[8px] text-[#7E8993] shadow-[0_4px_12px_rgba(35,53,76,.03)]">
            Reply by SMS…
          </div>
        </div>
      </div>

      <div className="hidden border-l border-[#E1E5E9] bg-[#F7F6F3] p-4 lg:block">
        <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6F7A84]">Customer context</div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar cell={0} size={42} className="border-2 border-white shadow-[0_5px_14px_rgba(35,53,76,.10)]" />
          <div>
            <div className="text-[10px] font-semibold text-[#26313B]">Mia Thompson</div>
            <div className="text-[7px] uppercase tracking-[0.1em] text-[#7E8993]">Northside Plumbing</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <ContextField label="Pipeline stage" value="Quote sent" tone="gold" />
          <ContextField label="Tags" value="VIP · Residential" tone="pink" />
          <ContextField label="Custom field" value="Service area · Sydney" tone="purple" />
          <ContextField label="Next action" value="Follow up in 2 days" tone="sage" />
        </div>
      </div>
    </div>
  );
}

function ContextField({ label, value, tone }: { label: string; value: string; tone: "pink" | "gold" | "sage" | "purple" }) {
  const tones = {
    pink: "border-[#E9BECF] bg-[#FCF2F6]",
    gold: "border-[#EAD29B] bg-[#FFF8E8]",
    sage: "border-[#D2D9B6] bg-[#F5F7ED]",
    purple: "border-[#D7C9ED] bg-[#F8F5FC]",
  };

  return (
    <div className={"rounded-[10px] border p-3 " + tones[tone]}>
      <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#77838E]">{label}</div>
      <div className="mt-1 text-[8px] font-semibold text-[#46525E]">{value}</div>
    </div>
  );
}

function PipelineRail() {
  const stages = [
    { name: "Lead", count: 4, tone: "#9AA36A", people: [{ name: "Alex Chen", value: "A$1,450", cell: 8 }, { name: "Lena Parker", value: "A$780", cell: 11 }] },
    { name: "Contacted", count: 3, tone: "#EF8C72", people: [{ name: "Sam Nguyen", value: "A$3,200", cell: 16 }, { name: "Ivy Harris", value: "A$950", cell: 7 }] },
    { name: "Proposal", count: 2, tone: "#F2B84B", people: [{ name: "Mia Thompson", value: "A$2,850", cell: 0 }, { name: "Chris Moore", value: "A$1,900", cell: 14, stale: true }] },
    { name: "Negotiation", count: 2, tone: "#8D78C7", people: [{ name: "Priya Shah", value: "A$520", cell: 9 }, { name: "Ben Lewis", value: "A$2,250", cell: 18 }] },
    { name: "Closed won", count: 3, tone: "#D65A89", people: [{ name: "Daniel Brooks", value: "A$4,100", cell: 5 }, { name: "Grace Tan", value: "A$1,680", cell: 2 }] },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1460px] rounded-[34px] border border-[#DDD5CA] bg-[#F4F6F8] px-5 py-14 shadow-[0_24px_64px_rgba(35,53,76,.07)] sm:px-8 lg:px-10">
        <Reveal className="mx-auto flex max-w-[1320px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[600px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7D8994]">Pipeline</div>
            <h2 className="mt-3 text-[36px] font-medium leading-[1] tracking-[-0.048em] sm:text-[46px] lg:text-[52px]" style={{ fontFamily: DISPLAY }}>
              See what is moving.
              <span className="block text-[#2563FF]">And what has stopped.</span>
            </h2>
          </div>
          <p className="max-w-[500px] text-[14px] font-medium leading-[1.72] text-[#59646E] sm:text-[15px]">
            Stage, owner and value stay visible in one place. Stale opportunities stop hiding in spreadsheets, inboxes or somebody's memory.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-[1320px]" delay={0.04}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {stages.map((stage, stageIndex) => (
              <div key={stage.name} className="min-h-[330px] rounded-[20px] border border-[#DDE2E7] bg-white p-2.5 shadow-[0_8px_22px_rgba(35,53,76,.04)]">
                <div className="flex items-center justify-between rounded-[13px] px-3 py-2.5 text-white" style={{ backgroundColor: stage.tone }}>
                  <span className="text-[9px] font-bold">{stage.name}</span>
                  <span className="text-[8px] font-semibold">{stage.count}</span>
                </div>

                <div className="mt-2.5 space-y-2.5">
                  {stage.people.map((person, itemIndex) => (
                    <motion.div
                      key={person.name}
                      initial={false}
                      whileInView={stageIndex === 2 && itemIndex === 0 ? { y: [0, -4, 0] } : undefined}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
                      className="rounded-[15px] border border-[#E1E5E9] bg-[#FAFBFC] p-3.5"
                    >
                      <div className="flex items-start gap-2.5">
                        <Avatar cell={person.cell} size={32} className="border-2 border-white shadow-[0_4px_10px_rgba(35,53,76,.10)]" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[9px] font-semibold text-[#2B3641]">{person.name}</div>
                          <div className="mt-1 text-[7px] font-semibold text-[#66717C]">{person.value}</div>
                        </div>
                        {"stale" in person && person.stale ? (
                          <span className="rounded-[5px] bg-[#F5D8D0] px-1.5 py-1 text-[6px] font-bold uppercase tracking-[0.08em] text-[#A85C48]">stale</span>
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-[#AAB697]" />
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-[#E9EDF1] pt-2 text-[7px] text-[#7B8690]">
                        <span>Owner assigned</span>
                        <span>{stageIndex === 2 && itemIndex === 1 ? "6 days" : "active"}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Automation() {
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F7F4EE] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="relative mx-auto max-w-[1460px] overflow-hidden rounded-[34px] border border-[#1B2D43] bg-[#0B1726] px-5 py-16 text-white shadow-[0_28px_76px_rgba(13,27,42,.18)] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="pointer-events-none absolute right-[-10%] top-[-36%] h-[700px] w-[700px] rounded-full bg-[#2563FF]/14 blur-[140px]" />
        <div className="pointer-events-none absolute -left-[12%] bottom-[-40%] h-[520px] w-[520px] rounded-full bg-[#58706F]/12 blur-[130px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="max-w-[880px]">
          <Eyebrow dark>CRM that can act</Eyebrow>
          <h2 className="mt-4 text-[38px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
            When the customer state changes,
            <span className="block text-[#8EACFF]">the next action can start automatically.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#F8FAFC] text-[#111318] shadow-[0_32px_90px_rgba(0,0,0,.28)]">
            <div className="flex min-h-12 items-center justify-between border-b border-[#DFE5EA] bg-white px-4">
              <div>
                <div className="text-[11px] font-semibold text-[#26313B]">Quote follow-up</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[0.11em] text-[#A0A9B2]">Automation · Draft</div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-[7px] border border-[#DDE3E9] px-2.5 py-1.5 text-[8px] font-semibold text-[#65717D]">Test</span>
                <span className="rounded-[7px] bg-[#C9B89B] px-2.5 py-1.5 text-[8px] font-semibold text-[#2C2924]">Save</span>
              </div>
            </div>

            <div className="grid min-h-[500px] lg:grid-cols-[265px_1fr]">
              <div className="border-r border-[#DFE5EA] bg-white">
                <div className="grid grid-cols-3 border-b border-[#E0E5EA] text-[8px] font-bold uppercase tracking-[0.1em]">
                  <span className="border-b-2 border-[#D65A89] px-3 py-3 text-[#A84E73]">Triggers</span>
                  <span className="px-3 py-3 text-[#77838E]">Logic</span>
                  <span className="px-3 py-3 text-[#77838E]">Actions</span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-2 rounded-[8px] border border-[#DDE3E9] px-3 py-2 text-[8px] text-[#8B96A1]">
                    <Search size={11} /> Search steps...
                  </div>

                  {[
                    ["Communications", ["Inbound SMS", "Inbound call"]],
                    ["Contact", ["Tag changed", "Contact created"]],
                    ["Pipeline", ["Pipeline stage changed", "Opportunity created"]],
                  ].map(([group, items]) => (
                    <div key={group as string} className="mt-4">
                      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#A0A9B2]">{group}</div>
                      <div className="mt-2 space-y-1.5">
                        {(items as string[]).map((item, i) => (
                          <motion.div
                            key={item}
                            initial={reduced ? false : { opacity: 0, x: -7 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : i * 0.04, ease: EASE }}
                            className="flex items-center gap-2 rounded-[7px] border border-[#E8C6D3] bg-[#FCF2F6] px-3 py-2.5 text-[8px] font-semibold text-[#A84E73]"
                          >
                            <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#D65A89] text-white">↯</span>
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="relative overflow-hidden p-5 sm:p-7 lg:p-8"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(111,126,142,.22) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                <div className="absolute inset-x-0 top-5 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#98A4AF]">Example workflow</div>

                <div className="relative mt-12 flex min-h-[390px] flex-col justify-center gap-5 xl:grid xl:grid-cols-[1fr_64px_1fr_64px_1fr] xl:items-center">
                  <BuilderNode label="Trigger" title="Pipeline stage changed" copy="Stage becomes Quote sent" tone="purple" />
                  <BuilderConnector />
                  <BuilderNode label="Wait" title="2 days" copy="Give the customer time to decide" tone="gold" />
                  <BuilderConnector />
                  <BuilderNode label="Action" title="Send follow-up" copy="Message goes out if still in stage" tone="sage" />
                </div>

                <div className="absolute bottom-5 right-5 rounded-[8px] border border-[#DDE3E9] bg-white px-3 py-2 shadow-[0_8px_18px_rgba(35,53,76,.08)]">
                  <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#66727E]">CRM state → workflow</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}

function BuilderNode({
  label,
  title,
  copy,
  tone,
}: {
  label: string;
  title: string;
  copy: string;
  tone: "purple" | "gold" | "sage";
}) {
  const toneMap = {
    purple: "border-[#D8CDF0] bg-[#F4F0FB] text-[#7359A7]",
    gold: "border-[#EAD29B] bg-[#FFF5DD] text-[#97651E]",
    sage: "border-[#D2D9B6] bg-[#F2F5E8] text-[#657247]",
  };

  return (
    <div className={"relative rounded-[16px] border p-4 shadow-[0_10px_28px_rgba(38,53,70,.07)] " + toneMap[tone]}>
      <div className="text-[8px] font-bold uppercase tracking-[0.13em]">{label}</div>
      <div className="mt-4 text-[13px] font-semibold text-[#26313B]">{title}</div>
      <div className="mt-1 text-[9px] leading-[1.5] text-[#66717C]">{copy}</div>
    </div>
  );
}

function BuilderConnector() {
  return (
    <div className="hidden items-center xl:flex">
      <span className="h-px flex-1 bg-[#AAB6C1]" />
      <span className="-ml-px h-2 w-2 rotate-45 border-r border-t border-[#91A0AE]" />
    </div>
  );
}

function ScaleSection() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="max-w-[760px]">
          <h2 className="text-[38px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
            More people. More customers.
            <span className="block text-[#2563FF]">Same CRM.</span>
          </h2>
          <p className="mt-4 max-w-[620px] text-[14px] leading-[1.7] text-[#687480] sm:text-[15px]">
            Add the team, keep the customer history and start with a system that has been configured with you.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[30px] border border-[#DCD6CD] bg-white shadow-[0_24px_64px_rgba(35,53,76,.08)]">
            <div className="grid lg:grid-cols-[1.45fr_.55fr]">
              <UnlimitedUsersVisual />

              <div className="grid border-t border-[#DCE3EA] lg:border-l lg:border-t-0">
                <UnlimitedContactsVisual />
                <GuidedLaunchVisual />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <a href={PRICING_URL} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2563FF]">
            See how Zapla is priced <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function UnlimitedUsersVisual() {
  const people = [
    { cell: 0, name: "Owner", x: "10%", y: "18%", tone: "#2563FF", target: "Overview" },
    { cell: 7, name: "Reception", x: "79%", y: "17%", tone: "#D65A89", target: "Conversation" },
    { cell: 14, name: "Sales", x: "12%", y: "74%", tone: "#EF8C72", target: "Deal" },
    { cell: 9, name: "Operations", x: "79%", y: "74%", tone: "#9AA36A", target: "Task" },
    { cell: 19, name: "Admin", x: "45%", y: "12%", tone: "#F2B84B", target: "Fields" },
  ];

  return (
    <div className="relative min-h-[540px] overflow-hidden bg-[#F2F5FB] p-6 sm:p-8">
      <div className="max-w-[430px]">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">Unlimited users</div>
        <h3 className="mt-3 text-[30px] font-medium leading-[1] tracking-[-0.045em] text-[#111318] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>
          Bring the whole team into the same customer record.
        </h3>
        <p className="mt-3 max-w-[400px] text-[12px] leading-[1.65] text-[#59646E]">
          Different roles can work on the part they own without adding another per-seat charge as the team grows.
        </p>
      </div>

      <div className="absolute bottom-6 left-[5%] right-[5%] top-[44%] rounded-[24px] border border-[#D7E0EC] bg-white shadow-[0_22px_50px_rgba(35,53,76,.10)]">
        <div className="absolute inset-[14%_18%] rounded-[17px] border border-[#DDE3E9] bg-[#FAFBFC] p-4 shadow-[0_10px_24px_rgba(35,53,76,.06)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-semibold text-[#26313B]">Mia Thompson</div>
              <div className="mt-0.5 text-[7px] text-[#7B8690]">Northside Plumbing</div>
            </div>
            <span className="rounded-[6px] bg-[#FFF0C8] px-2 py-1 text-[7px] font-bold text-[#97651E]">Quote sent</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <RoleTarget label="Overview" value="VIP · Residential" tone="blue" />
            <RoleTarget label="Conversation" value="SMS reply received" tone="pink" />
            <RoleTarget label="Deal" value="A$2,850" tone="coral" />
            <RoleTarget label="Task" value="Site visit · Tuesday" tone="sage" />
          </div>

          <div className="mt-2">
            <RoleTarget label="Fields" value="Service area · Sydney · Hot water" tone="gold" />
          </div>
        </div>

        {people.map((person, index) => (
          <motion.div
            key={person.name}
            className="absolute"
            style={{ left: person.x, top: person.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.84, y: 8 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
          >
            <div className="relative">
              <Avatar cell={person.cell} size={54} className="border-[3px] border-white shadow-[0_10px_24px_rgba(35,53,76,.16)]" />
              <div
                className="absolute left-[41px] top-[39px] flex items-center gap-1.5 whitespace-nowrap rounded-[7px] px-2.5 py-1.5 text-[8px] font-bold text-white shadow-[0_7px_16px_rgba(35,53,76,.18)]"
                style={{ backgroundColor: person.tone }}
              >
                <MousePointer2 size={9} fill="currentColor" />
                {person.name}
              </div>
              <div className="absolute left-[44px] top-[62px] whitespace-nowrap text-[6px] font-bold uppercase tracking-[0.08em] text-[#7B8690]">
                {person.target}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RoleTarget({ label, value, tone }: { label: string; value: string; tone: "blue" | "pink" | "coral" | "sage" | "gold" }) {
  const tones = {
    blue: "border-[#C8D5FF] bg-[#F2F5FF]",
    pink: "border-[#E9BECF] bg-[#FCF2F6]",
    coral: "border-[#E9C2B7] bg-[#FDF2EE]",
    sage: "border-[#D2D9B6] bg-[#F5F7ED]",
    gold: "border-[#EAD29B] bg-[#FFF8E8]",
  };

  return (
    <div className={"rounded-[10px] border px-3 py-2.5 " + tones[tone]}>
      <div className="text-[6px] font-bold uppercase tracking-[0.09em] text-[#7A8590]">{label}</div>
      <div className="mt-1 text-[8px] font-semibold text-[#46525E]">{value}</div>
    </div>
  );
}

function UnlimitedContactsVisual() {
  return (
    <div className="border-b border-[#DCD6CD] bg-[#FCFBF8] p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">Unlimited contacts</div>
          <h3 className="mt-2 text-[24px] font-medium tracking-[-0.04em] text-[#111318]" style={{ fontFamily: DISPLAY }}>Keep the database.</h3>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-[#EEF3FF] text-[#2563FF]">
          <InfinityIcon size={23} />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {["Customer · Mia Thompson", "Lead · Chris Moore", "Past customer · Daniel Brooks", "Prospect · Priya Shah"].map((item, i) => (
          <div key={item} className="flex items-center justify-between border-b border-[#E7EBEF] pb-2.5">
            <span className="text-[9px] font-medium text-[#4A5662]">{item}</span>
            <span className="text-[7px] font-semibold text-[#7E8993]">{i < 2 ? "active" : "stored"}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-[1.6] text-[#59646E]">The customer history does not need to be trimmed just to stay under a contact count.</p>
    </div>
  );
}

function GuidedLaunchVisual() {
  return (
    <div className="bg-[#FBFAF6] p-6 sm:p-7">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">Guided Launch</div>
      <h3 className="mt-2 text-[24px] font-medium tracking-[-0.04em] text-[#111318]" style={{ fontFamily: DISPLAY }}>Do not start from blank.</h3>
      <p className="mt-3 text-[11px] leading-[1.6] text-[#59646E]">
        We help configure the agreed CRM essentials so moving platforms does not become another internal project.
      </p>

      <div className="mt-5 space-y-2.5">
        {["Customer data agreed", "Core fields configured", "Pipeline structure set", "Team ready to work"].map((item, i) => (
          <div key={item} className="flex items-center gap-3">
            <span className={"grid h-6 w-6 place-items-center rounded-full text-[8px] font-bold " + (i < 3 ? "bg-[#EAF0FF] text-[#2563FF]" : "bg-[#EEF3E7] text-[#6B7C50]")}>
              <Check size={11} strokeWidth={2.5} />
            </span>
            <span className="text-[9px] font-medium text-[#4B5762]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


function InitialsAvatar({
  initials,
  size,
}: {
  initials: string;
  size: number;
}) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border border-[#D5CCBF] bg-[#EEEAE2] font-semibold text-[#58706F]"
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.25)) }}
      aria-label={initials}
    >
      {initials}
    </span>
  );
}

function Avatar({
  cell,
  size,
  className = "",
}: {
  cell: number;
  size: number;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      className={"block shrink-0 overflow-hidden rounded-full bg-[#E7ECF2] " + className}
      style={{
        width: size,
        height: size,
        backgroundImage: "url(" + PORTRAIT_SHEET + ")",
        backgroundPosition: (column / 5) * 100 + "% " + (row / 3) * 100 + "%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
      aria-hidden="true"
    />
  );
}

function ConnectedPlatform() {
  const items = [
    { icon: Mail, title: "Email + SMS", copy: "Follow up from the same customer context.", tone: "bg-[#FCF2F6] text-[#A84E73]" },
    { icon: CalendarDays, title: "Calendars + bookings", copy: "Turn the conversation into a scheduled next step.", tone: "bg-[#F5F7ED] text-[#657247]" },
    { icon: CreditCard, title: "Payments", copy: "Keep payment activity connected to the customer.", tone: "bg-[#FFF8E8] text-[#97651E]" },
    { icon: Globe2, title: "Websites + funnels", copy: "Bring captured leads into the same CRM.", tone: "bg-[#F4F0FB] text-[#7359A7]" },
    { icon: TicketCheck, title: "Ticketing + service", copy: "Carry customer context beyond the sale.", tone: "bg-[#FDF2EE] text-[#A85C48]" },
    { icon: LayoutTemplate, title: "Forms + lead capture", copy: "Feed new enquiries directly into records and workflows.", tone: "bg-[#F1F5FF] text-[#2563FF]" },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div className="max-w-[520px]">
            <Eyebrow>Connected beyond CRM</Eyebrow>
            <h2 className="mt-4 text-[34px] font-medium leading-[1] tracking-[-0.047em] sm:text-[44px] lg:text-[50px]" style={{ fontFamily: DISPLAY }}>
              The customer record does not stop when the CRM tab closes.
            </h2>
          </div>
          <p className="max-w-[560px] text-[14px] font-medium leading-[1.72] text-[#59646E] lg:justify-self-end">
            Zapla connects the CRM to the tools customers move through next. This page stays focused on CRM, while the wider platform handles the surrounding work.
          </p>
        </Reveal>

        <Reveal className="mt-9" delay={0.04}>
          <div className="grid overflow-hidden rounded-[28px] border border-[#DCD6CD] bg-white shadow-[0_20px_54px_rgba(35,53,76,.06)] sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={"min-h-[150px] p-5 sm:p-6 " + (index > 0 ? "border-t border-[#E5E0D8] sm:border-t-0" : "") + (index % 2 === 1 ? " sm:border-l" : "") + (index >= 3 ? " lg:border-t" : "") + (index % 3 !== 0 ? " lg:border-l" : "")}>
                  <div className={"grid h-10 w-10 place-items-center rounded-[11px] " + item.tone}>
                    <Icon size={17} />
                  </div>
                  <div className="mt-5 text-[13px] font-semibold text-[#26313B]">{item.title}</div>
                  <div className="mt-2 max-w-[300px] text-[11px] leading-[1.62] text-[#66717C]">{item.copy}</div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[#E5E9EF] bg-white px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
        <Reveal className="max-w-[350px]">
          <Eyebrow>Before you move CRM</Eyebrow>
          <h2 className="mt-4 text-[32px] font-medium leading-[1] tracking-[-0.046em] sm:text-[40px]" style={{ fontFamily: DISPLAY }}>
            The practical questions.
          </h2>
        </Reveal>

        <div className="border-t border-[#D8E0E8]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="border-b border-[#D8E0E8]">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[13px] font-semibold text-[#26313B] sm:text-[14px]">{item.q}</span>
                  <ChevronDown size={16} className={"shrink-0 text-[#66727E] transition-transform " + (isOpen ? "rotate-180" : "")} />
                </button>
                {isOpen ? <p className="max-w-[720px] pb-4 pr-8 text-[12px] leading-[1.72] text-[#687480] sm:text-[13px]">{item.a}</p> : null}
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
    <section className="relative overflow-hidden bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
      <div className="pointer-events-none absolute left-[62%] top-[-80px] h-[360px] w-[360px] rounded-full bg-[#2563FF]/10 blur-[90px]" />
      <Reveal className="relative mx-auto max-w-[1080px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="max-w-[720px]">
            <Eyebrow dark>See it around your business</Eyebrow>
            <h2 className="mt-4 text-[38px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
              See how Zapla would fit the way your team manages customers.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-white px-6 text-[13px] font-semibold text-[#111318]">
              Book a Call <ArrowRight size={15} />
            </a>
            <a href={PRICING_URL} className="inline-flex h-[50px] items-center rounded-[10px] border border-white/20 px-6 text-[13px] font-semibold text-white">
              View pricing
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
