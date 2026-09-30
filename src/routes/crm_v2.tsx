import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CreditCard,
  Filter,
  Globe2,
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
      <div className="pointer-events-none absolute -left-[12%] top-[25%] h-[620px] w-[620px] rounded-full bg-[#DCE0CC]/28 blur-[155px]" />

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
    <div className="overflow-hidden rounded-[18px] border border-[#D7DEE6] bg-white shadow-[0_28px_72px_rgba(35,53,76,.11)]">
      <div className="flex min-h-12 items-center gap-5 overflow-hidden border-b border-[#E3E8ED] bg-white px-4 sm:px-5">
        {["Contacts", "Contact types", "Contact fields", "Tags", "Smart lists", "Quick actions"].map((item, index) => (
          <span
            key={item}
            className={
              "whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.12em] " +
              (index === 0 ? "text-[#26313B]" : "hidden text-[#7F8A95] md:inline")
            }
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid min-h-[520px] lg:grid-cols-[225px_minmax(0,1fr)_205px]">
        <div className="border-b border-[#E3E8ED] bg-[#FBFCFD] p-4 lg:border-b-0 lg:border-r">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#66717C]">Profile</div>

          <div className="mt-4 flex items-center gap-3">
            <Avatar cell={0} size={46} className="border border-white shadow-[0_6px_16px_rgba(35,53,76,.10)]" />
            <div>
              <div className="text-[13px] font-semibold text-[#26313B]">Mia Thompson</div>
              <div className="mt-0.5 text-[8px] text-[#6E7984]">Northside Plumbing</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {["Call", "Note", "Book"].map((label, index) => (
              <div
                key={label}
                className={
                  "grid h-8 place-items-center rounded-[7px] border text-[7px] font-bold uppercase tracking-[0.08em] " +
                  (index === 1
                    ? "border-[#C8D6FF] bg-[#F4F7FF] text-[#2563FF]"
                    : "border-[#DDE3E9] bg-white text-[#59646E]")
                }
              >
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
            ].map(([label, value]) => (
              <div key={label} className="rounded-[8px] border border-[#E0E5EA] bg-white px-3 py-2.5">
                <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#7D8893]">{label}</div>
                <div className="mt-1 text-[8px] font-medium text-[#46525E]">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 bg-[#F8FAFB]">
          <div className="grid grid-cols-4 border-b border-[#E3E8ED] bg-white sm:grid-cols-7">
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
                  (active ? "bg-[#F9FBFF] text-[#2563FF]" : "text-[#7F8A95] " + (index > 3 ? "hidden sm:flex" : ""))
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
                <div className="mt-1 text-[8px] text-[#66717C]">Everything around this customer, in order.</div>
              </div>
              <div className="inline-flex h-8 items-center gap-2 rounded-[7px] border border-[#DDE3E9] bg-white px-3 text-[8px] font-semibold text-[#59646E]">
                <Filter size={10} /> Filter
              </div>
            </div>

            <div className="relative mt-5">
              <div className="absolute bottom-2 left-[14px] top-2 w-px bg-[#D8E0E8]" />
              <ActivityItem marker="+" title="Opportunity created" meta="Today · 09:12" copy="Hot water replacement" detail="Stage: Lead · Value: A$2,850" active />
              <ActivityItem marker="✓" title="Quote sent" meta="Today · 09:24" copy="A$2,850 quote sent by SMS and email." detail="Owner: Ben Walker" />
              <ActivityItem marker="↗" title="Customer replied" meta="Today · 09:41" copy="Tuesday afternoon works. Can you send through the quote?" detail="SMS · Unified inbox" />
              <ActivityItem marker="→" title="Stage changed" meta="Today · 09:43" copy="Proposal moved to Quote sent." detail="Pipeline: Residential sales" />
              <ActivityItem marker="•" title="Next action scheduled" meta="In 2 days" copy="Follow up automatically if the customer has not replied." detail="Automation active" last />
            </div>
          </div>
        </div>

        <div className="hidden border-l border-[#E3E8ED] bg-white p-4 lg:block">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#66717C]">Customer context</div>

          <div className="mt-4 space-y-2">
            <ContextCard label="Automation" value="Quote follow-up" sub="Active · waits 2 days" accent="blue" />
            <ContextCard label="Open deal" value="A$2,850" sub="Quote sent" accent="sage" />
            <ContextCard label="Task" value="Confirm site visit" sub="Due Tuesday" accent="oat" />
          </div>

          <div className="mt-5 border-t border-[#E4E8EC] pt-4">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#66717C]">Also connected</div>
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
  marker,
  title,
  meta,
  copy,
  detail,
  active = false,
  last = false,
}: {
  marker: string;
  title: string;
  meta: string;
  copy: string;
  detail: string;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className={"relative pl-10 " + (last ? "pb-0" : "pb-3")}>
      <div className={"absolute left-0 top-1 z-10 grid h-7 w-7 place-items-center rounded-full text-[8px] font-bold " + (active ? "bg-[#EAF0FF] text-[#2563FF]" : "bg-[#EDF1F0] text-[#58706F]")}>
        {marker}
      </div>

      <div className="rounded-[9px] border border-[#DEE4EA] bg-white p-3.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="text-[9px] font-semibold text-[#2D3843]">{title}</div>
          <div className="text-[7px] font-semibold text-[#7E8993]">{meta}</div>
        </div>
        <div className="mt-1.5 text-[9px] leading-[1.5] text-[#53606C]">{copy}</div>
        <div className="mt-2 rounded-[6px] bg-[#F7F8FA] px-2.5 py-2 text-[7px] font-medium text-[#6E7984]">{detail}</div>
      </div>
    </div>
  );
}

function ContextCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "blue" | "sage" | "oat";
}) {
  const bar = {
    blue: "bg-[#2563FF]",
    sage: "bg-[#85845D]",
    oat: "bg-[#C89A5D]",
  };

  return (
    <div className="relative overflow-hidden rounded-[9px] border border-[#E0E5EA] bg-white p-3">
      <span className={"absolute inset-y-0 left-0 w-[3px] " + bar[accent]} />
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
            <h2 className="mt-4 text-[36px] font-medium leading-[1] tracking-[-0.048em] sm:text-[46px] lg:text-[52px]" style={{ fontFamily: DISPLAY }}>
              Find the customers that need attention. Then open the full context.
            </h2>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-5 lg:justify-end">
            <p className="max-w-[500px] text-[14px] font-medium leading-[1.72] text-[#59646E] sm:text-[15px]">
              Segment by tags, pipeline stage, owner, activity or custom fields. Save the audience, then open any customer without losing their conversation or history.
            </p>

            <div className="inline-flex rounded-[12px] border border-[#DADFE5] bg-[#F5F6F7] p-1">
              <button type="button" onClick={() => setMode("segment")} className={"rounded-[9px] px-4 py-2.5 text-[10px] font-semibold transition-all " + (mode === "segment" ? "bg-white text-[#111318] shadow-[0_4px_14px_rgba(35,53,76,.10)]" : "text-[#6E7984]")}>
                Segment customers
              </button>
              <button type="button" onClick={() => setMode("customer")} className={"rounded-[9px] px-4 py-2.5 text-[10px] font-semibold transition-all " + (mode === "customer" ? "bg-white text-[#111318] shadow-[0_4px_14px_rgba(35,53,76,.10)]" : "text-[#6E7984]")}>
                Open customer
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[24px] border border-[#DDE3E9] bg-white shadow-[0_18px_44px_rgba(35,53,76,.06)]">
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
    <div className="grid lg:grid-cols-[1.36fr_.64fr]">
      <div className="min-w-0 p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-[16px] font-semibold text-[#26313B]">VIP quotes waiting on a reply</div>
              <span className="rounded-full border border-[#C8D6FF] bg-[#F6F8FF] px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-[#2563FF]">23 matches</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ["Tag", "VIP", true],
                ["Stage", "Quote sent", false],
                ["Last activity", "3+ days", false],
                ["Owner", "Any", false],
              ].map(([label, value, active]) => (
                <span key={label as string} className={"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[7px] font-semibold " + (active ? "border-[#C8D6FF] bg-[#F6F8FF] text-[#2563FF]" : "border-[#DDE3E9] bg-white text-[#59646E]")}>
                  <span className={"h-1.5 w-1.5 rounded-full " + (active ? "bg-[#2563FF]" : "bg-[#AAB4BE]")} />
                  {label}: {value}
                </span>
              ))}
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

        <div className="mt-5 overflow-hidden rounded-[14px] border border-[#E1E5E9]">
          {matches.map((customer, i) => (
            <div key={customer.name} className={"grid items-center gap-3 border-b border-[#E7EAED] px-4 py-3.5 last:border-b-0 sm:grid-cols-[1.35fr_.7fr_.9fr_.65fr] " + (i === 0 ? "bg-[#F7F9FE]" : "bg-white")}>
              <div className="flex items-center gap-3">
                <Avatar cell={customer.cell} size={34} className="border-2 border-white shadow-[0_4px_12px_rgba(35,53,76,.10)]" />
                <div>
                  <div className="text-[10px] font-semibold text-[#293440]">{customer.name}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {customer.tags.map((tag, tagIndex) => (
                      <span key={tag} className={"rounded-[5px] px-1.5 py-1 text-[6px] font-bold " + (tagIndex === 0 ? "bg-[#EEF3FF] text-[#2563FF]" : "bg-[#F0F2EC] text-[#69735D]")}>{tag}</span>
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
                <div className="mt-1 inline-flex rounded-[6px] bg-[#F4F1EA] px-2 py-1 text-[7px] font-bold text-[#8E725D]">{customer.stage}</div>
              </div>

              <div>
                <div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87929D]">Last activity</div>
                <div className={"mt-1 text-[9px] font-semibold " + (i > 1 ? "text-[#BF7458]" : "text-[#59646E]")}>{customer.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E1E5E9] bg-[#FAFAF8] p-5 sm:p-6 lg:border-l lg:border-t-0">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#26313B]">
          <Filter size={14} className="text-[#2563FF]" />
          Build a customer segment
        </div>
        <p className="mt-1.5 text-[9px] leading-[1.55] text-[#66717C]">
          Use the fields already attached to each customer. Add your own fields and tags when the business needs them.
        </p>

        <div className="mt-5 overflow-hidden rounded-[12px] border border-[#DDE3E9] bg-white">
          {[
            ["Tag", "VIP", true],
            ["Pipeline stage", "Quote sent", false],
            ["Last activity", "More than 3 days ago", false],
            ["Custom field", "Service area = Sydney", false],
          ].map(([label, value, active], index) => (
            <div key={label as string} className={"relative border-b border-[#E7EAED] px-4 py-3 last:border-b-0 " + (active ? "bg-[#F7F9FE]" : "bg-white")}>
              <span className={"absolute inset-y-0 left-0 w-[3px] " + (active ? "bg-[#2563FF]" : "bg-[#D9DEE4]")} />
              <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#7A8590]">{label}</div>
              <div className="mt-1.5 flex items-center justify-between text-[9px] font-semibold text-[#394550]">{value}<ChevronDown size={11} /></div>
            </div>
          ))}
        </div>

        <button type="button" className="mt-4 inline-flex items-center gap-2 text-[8px] font-semibold text-[#2563FF]">+ Add another condition</button>

        <div className="mt-5 flex items-center justify-between border-t border-[#DDDCD7] pt-4">
          <div className="flex items-center gap-2 text-[9px] font-semibold text-[#2563FF]">
            <span className="h-2 w-2 rounded-full bg-[#2563FF]" /> 23 customers match
          </div>
          <span className="text-[8px] font-semibold text-[#7B8690]">Match all conditions</span>
        </div>
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
            <div className="mt-1 text-[8px] text-[#66717C]">SMS and email in one view</div>
          </div>
          <Search size={13} className="text-[#6D7883]" />
        </div>

        <div className="mt-3 space-y-1.5">
          {customers.map((customer) => (
            <div key={customer.name} className={"rounded-[10px] border p-3 " + (customer.active ? "border-[#C8D6FF] bg-[#F7F9FE]" : "border-transparent bg-transparent")}>
              <div className="flex items-center gap-2.5">
                <Avatar cell={customer.cell} size={30} className="border-2 border-white" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-[9px] font-semibold text-[#293440]">{customer.name}</div>
                    <span className={"rounded-[5px] px-1.5 py-1 text-[6px] font-bold " + (customer.channel === "SMS" ? "bg-[#EEF3FF] text-[#2563FF]" : "bg-[#F0F2EC] text-[#69735D]")}>{customer.channel}</span>
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
              <span className="rounded-[5px] bg-[#EEF3FF] px-2 py-1 text-[6px] font-bold text-[#2563FF]">VIP</span>
              <span className="rounded-[5px] bg-[#F4F1EA] px-2 py-1 text-[6px] font-bold text-[#8E725D]">Quote sent</span>
              <span className="rounded-[5px] bg-[#F0F2EC] px-2 py-1 text-[6px] font-bold text-[#69735D]">Residential</span>
            </div>
          </div>
          <div className="text-[7px] font-semibold text-[#7B8690]">Owner · Ben Walker</div>
        </div>

        <div className="flex flex-1 flex-col justify-between bg-[#FAFBFC] p-5">
          <div>
            <div className="max-w-[76%] rounded-[14px] border border-[#DFE4E9] bg-white px-4 py-3 text-[9px] leading-[1.55] text-[#45515E] shadow-[0_4px_12px_rgba(35,53,76,.04)]">
              Hi Mia, your quote is ready. Would Tuesday afternoon suit you for the site visit?
            </div>
            <div className="mt-3 ml-auto max-w-[72%] rounded-[14px] bg-[#EEF3FF] px-4 py-3 text-[9px] leading-[1.55] text-[#40547B]">
              Tuesday afternoon works. Can you send through the quote?
            </div>
          </div>

          <div className="rounded-[12px] border border-[#DDE3E9] bg-white px-4 py-3.5 text-[8px] text-[#7E8993] shadow-[0_4px_12px_rgba(35,53,76,.03)]">Reply by SMS…</div>
        </div>
      </div>

      <div className="hidden border-l border-[#E1E5E9] bg-[#FAFAF8] p-4 lg:block">
        <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#66717C]">Customer context</div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar cell={0} size={42} className="border-2 border-white shadow-[0_5px_14px_rgba(35,53,76,.10)]" />
          <div>
            <div className="text-[10px] font-semibold text-[#26313B]">Mia Thompson</div>
            <div className="text-[7px] uppercase tracking-[0.1em] text-[#7E8993]">Northside Plumbing</div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-[10px] border border-[#DDE3E9] bg-white">
          {[
            ["Pipeline stage", "Quote sent"],
            ["Tags", "VIP · Residential"],
            ["Custom field", "Service area · Sydney"],
            ["Next action", "Follow up in 2 days"],
          ].map(([label, value], index) => (
            <div key={label} className={"border-b border-[#E7EAED] px-3 py-2.5 last:border-b-0 " + (index === 0 ? "bg-[#F7F9FE]" : "")}>
              <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#77838E]">{label}</div>
              <div className="mt-1 text-[8px] font-semibold text-[#46525E]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PipelineRail() {
  const stages = [
    { name: "Lead", count: 4, tone: "#85845D", people: [{ name: "Alex Chen", value: "A$1,450", cell: 8 }, { name: "Lena Parker", value: "A$780", cell: 11 }] },
    { name: "Contacted", count: 3, tone: "#BF7458", people: [{ name: "Sam Nguyen", value: "A$3,200", cell: 16 }, { name: "Ivy Harris", value: "A$950", cell: 7 }] },
    { name: "Proposal", count: 2, tone: "#C89A5D", people: [{ name: "Mia Thompson", value: "A$2,850", cell: 0 }, { name: "Chris Moore", value: "A$1,900", cell: 14, stale: true }] },
    { name: "Negotiation", count: 2, tone: "#58706F", people: [{ name: "Priya Shah", value: "A$520", cell: 9 }, { name: "Ben Lewis", value: "A$2,250", cell: 18 }] },
    { name: "Closed won", count: 3, tone: "#99A36D", people: [{ name: "Daniel Brooks", value: "A$4,100", cell: 5 }, { name: "Grace Tan", value: "A$1,680", cell: 2 }] },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
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

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[24px] border border-[#DADFE5] bg-white shadow-[0_20px_54px_rgba(35,53,76,.06)]">
            <div className="flex items-center justify-between border-b border-[#E3E8ED] px-5 py-4">
              <div>
                <div className="text-[13px] font-semibold text-[#26313B]">Residential sales</div>
                <div className="mt-1 text-[8px] text-[#6E7984]">10 opportunities · A$18,630 open value</div>
              </div>
              <div className="rounded-[8px] border border-[#DDE3E9] bg-white px-3 py-2 text-[8px] font-semibold text-[#59646E]">Filter pipeline</div>
            </div>

            <div className="grid gap-0 overflow-x-auto bg-[#F6F7F8] md:grid-cols-2 xl:grid-cols-5">
              {stages.map((stage, stageIndex) => (
                <div key={stage.name} className="min-h-[330px] min-w-[220px] border-r border-[#DDE2E7] p-2.5 last:border-r-0">
                  <div className="flex items-center justify-between rounded-[10px] px-3 py-2.5 text-white" style={{ backgroundColor: stage.tone }}>
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
                        className="rounded-[12px] border border-[#E1E5E9] bg-white p-3.5 shadow-[0_4px_12px_rgba(35,53,76,.03)]"
                      >
                        <div className="flex items-start gap-2.5">
                          <Avatar cell={person.cell} size={34} className="border-2 border-white shadow-[0_4px_10px_rgba(35,53,76,.10)]" />
                          <div className="min-w-0 flex-1">
                            <div className="text-[9px] font-semibold text-[#2B3641]">{person.name}</div>
                            <div className="mt-1 text-[7px] font-semibold text-[#59646E]">{person.value}</div>
                          </div>
                          {"stale" in person && person.stale ? (
                            <span className="rounded-[5px] bg-[#F7E9E4] px-1.5 py-1 text-[6px] font-bold uppercase tracking-[0.08em] text-[#BF7458]">stale</span>
                          ) : <span className="h-2 w-2 rounded-full bg-[#BFC6AE]" />}
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Automation() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0D1117] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-[-35%] h-[700px] w-[700px] rounded-full bg-[#2563FF]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div className="max-w-[790px]">
            <Eyebrow dark>CRM that can act</Eyebrow>
            <h2 className="mt-4 text-[38px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[49px] lg:text-[54px]" style={{ fontFamily: DISPLAY }}>
              When the customer state changes,
              <span className="block text-[#86A6FF]">the next action can start automatically.</span>
            </h2>
          </div>
          <p className="max-w-[470px] text-[14px] font-medium leading-[1.72] text-white/64 lg:justify-self-end">
            Stage changes, tags, timing and customer events can become workflow triggers instead of another thing someone has to remember.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#F8FAFC] text-[#111318] shadow-[0_30px_84px_rgba(0,0,0,.28)]">
            <div className="flex min-h-12 items-center justify-between border-b border-[#DFE5EA] bg-white px-4">
              <div>
                <div className="text-[11px] font-semibold text-[#26313B]">Quote follow-up</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[0.11em] text-[#87929D]">Automation · Draft</div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-[7px] border border-[#DDE3E9] px-2.5 py-1.5 text-[8px] font-semibold text-[#59646E]">Test</span>
                <span className="rounded-[7px] bg-[#1E2B29] px-2.5 py-1.5 text-[8px] font-semibold text-white">Save</span>
              </div>
            </div>

            <div className="grid min-h-[500px] lg:grid-cols-[265px_1fr]">
              <div className="border-r border-[#DFE5EA] bg-white">
                <div className="grid grid-cols-3 border-b border-[#E0E5EA] text-[8px] font-bold uppercase tracking-[0.1em]">
                  <span className="border-b-2 border-[#2563FF] px-3 py-3 text-[#2563FF]">Triggers</span>
                  <span className="px-3 py-3 text-[#77838E]">Logic</span>
                  <span className="px-3 py-3 text-[#77838E]">Actions</span>
                </div>

                <div className="p-3">
                  <div className="flex items-center gap-2 rounded-[8px] border border-[#DDE3E9] px-3 py-2 text-[8px] text-[#7B8690]">
                    <Search size={11} /> Search steps...
                  </div>

                  {[
                    ["Communications", ["Inbound SMS", "Inbound call"]],
                    ["Contact", ["Tag changed", "Contact created"]],
                    ["Pipeline", ["Pipeline stage changed", "Opportunity created"]],
                  ].map(([group, items]) => (
                    <div key={group as string} className="mt-4">
                      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#87929D]">{group}</div>
                      <div className="mt-2 space-y-1.5">
                        {(items as string[]).map((item, i) => (
                          <motion.div
                            key={item}
                            initial={reduced ? false : { opacity: 0, x: -7 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : i * 0.04, ease: EASE }}
                            className="flex items-center gap-2 rounded-[7px] border border-[#DDE3E9] bg-[#FAFBFC] px-3 py-2.5 text-[8px] font-semibold text-[#46525E]"
                          >
                            <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#EEF3FF] text-[#2563FF]">↯</span>
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden p-5 sm:p-7 lg:p-8" style={{ backgroundImage: "radial-gradient(circle, rgba(111,126,142,.20) 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
                <div className="absolute inset-x-0 top-5 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#98A4AF]">Example workflow</div>

                <div className="relative mt-12 flex min-h-[390px] flex-col justify-center gap-5 xl:grid xl:grid-cols-[1fr_64px_1fr_64px_1fr] xl:items-center">
                  <BuilderNode label="Trigger" title="Pipeline stage changed" copy="Stage becomes Quote sent" tone="blue" />
                  <BuilderConnector />
                  <BuilderNode label="Wait" title="2 days" copy="Give the customer time to decide" tone="neutral" />
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
    </section>
  );
}

function BuilderNode({ label, title, copy, tone }: { label: string; title: string; copy: string; tone: "blue" | "neutral" | "sage" }) {
  const toneMap = {
    blue: "border-[#C8D6FF] bg-[#F4F7FF] text-[#2563FF]",
    neutral: "border-[#DDD5CA] bg-[#F7F4EE] text-[#8E725D]",
    sage: "border-[#D2D8C2] bg-[#F2F4EA] text-[#69735D]",
  };

  return (
    <div className={"relative rounded-[15px] border p-4 shadow-[0_10px_28px_rgba(38,53,70,.06)] " + toneMap[tone]}>
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
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div className="max-w-[720px]">
            <Eyebrow>Built to grow with the team</Eyebrow>
            <h2 className="mt-4 text-[38px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
              More people. More customers.
              <span className="block text-[#2563FF]">Same CRM.</span>
            </h2>
          </div>
          <p className="max-w-[470px] text-[14px] font-medium leading-[1.72] text-[#59646E] lg:justify-self-end">
            Reception, sales, operations, admin and owners can work from the same customer record without turning team growth into a seat-count problem.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <TeamWorkspaceVisual />
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid border-y border-[#DCD6CD] sm:grid-cols-3">
            <CommercialPoint title="Unlimited users" copy="Bring the whole team into the CRM without adding another per-seat charge." />
            <CommercialPoint title="Unlimited contacts" copy="Keep the customer history you need instead of trimming the database to stay under a contact cap." />
            <CommercialPoint title="Guided Launch" copy="Start with the agreed fields, pipeline and essentials configured with you." />
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

function TeamWorkspaceVisual() {
  const people = [
    { cell: 0, name: "Owner", target: "Overview", x: "8%", y: "18%", tone: "#2563FF" },
    { cell: 7, name: "Reception", target: "Conversation", x: "82%", y: "17%", tone: "#8E657A" },
    { cell: 14, name: "Sales", target: "Deal", x: "9%", y: "76%", tone: "#BF7458" },
    { cell: 9, name: "Operations", target: "Task", x: "82%", y: "76%", tone: "#85845D" },
    { cell: 19, name: "Admin", target: "Fields", x: "47%", y: "10%", tone: "#C89A5D" },
  ];

  return (
    <div className="relative min-h-[540px] overflow-hidden rounded-[28px] border border-[#D7DEE6] bg-[#F5F7FC] shadow-[0_22px_58px_rgba(35,53,76,.08)]">
      <div className="absolute inset-[15%_16%] rounded-[20px] border border-[#DDE3E9] bg-white p-5 shadow-[0_14px_34px_rgba(35,53,76,.08)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar cell={0} size={42} className="border-2 border-white shadow-[0_4px_12px_rgba(35,53,76,.10)]" />
            <div>
              <div className="text-[11px] font-semibold text-[#26313B]">Mia Thompson</div>
              <div className="mt-0.5 text-[7px] text-[#7B8690]">Northside Plumbing</div>
            </div>
          </div>
          <span className="rounded-[6px] bg-[#F4F1EA] px-2 py-1 text-[7px] font-bold text-[#8E725D]">Quote sent</span>
        </div>

        <div className="mt-5 overflow-hidden rounded-[12px] border border-[#E1E5E9]">
          <TeamRecordRow label="Overview" value="VIP · Residential · Owner: Ben" active />
          <TeamRecordRow label="Conversation" value="SMS reply received 9:41am" />
          <TeamRecordRow label="Deal" value="A$2,850 · Quote sent" />
          <TeamRecordRow label="Task" value="Confirm site visit · Tuesday" />
          <TeamRecordRow label="Fields" value="Service area · Sydney · Hot water" />
        </div>
      </div>

      {people.map((person, index) => (
        <motion.div
          key={person.name}
          className="absolute"
          style={{ left: person.x, top: person.y, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0, scale: 0.86, y: 8 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
        >
          <div className="relative">
            <Avatar cell={person.cell} size={58} className="border-[3px] border-white shadow-[0_12px_26px_rgba(35,53,76,.16)]" />
            <div className="absolute left-[43px] top-[41px] flex items-center gap-1.5 whitespace-nowrap rounded-[7px] px-2.5 py-1.5 text-[8px] font-bold text-white shadow-[0_7px_16px_rgba(35,53,76,.18)]" style={{ backgroundColor: person.tone }}>
              <MousePointer2 size={9} fill="currentColor" /> {person.name}
            </div>
            <div className="absolute left-[46px] top-[65px] whitespace-nowrap text-[6px] font-bold uppercase tracking-[0.08em] text-[#66717C]">{person.target}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TeamRecordRow({ label, value, active = false }: { label: string; value: string; active?: boolean }) {
  return (
    <div className={"grid grid-cols-[110px_1fr] items-center border-b border-[#E7EAED] px-4 py-3 last:border-b-0 " + (active ? "bg-[#F7F9FE]" : "bg-white")}>
      <div className="flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.1em] text-[#66717C]">
        <span className={"h-1.5 w-1.5 rounded-full " + (active ? "bg-[#2563FF]" : "bg-[#B8C0C8]")} /> {label}
      </div>
      <div className="text-[9px] font-semibold text-[#46525E]">{value}</div>
    </div>
  );
}

function CommercialPoint({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="px-0 py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0 sm:[&+&]:border-l sm:[&+&]:border-[#DCD6CD]">
      <div className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#2563FF]">{title}</div>
      <p className="mt-2 max-w-[340px] text-[12px] leading-[1.65] text-[#59646E]">{copy}</p>
    </div>
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
    { icon: Mail, title: "Email + SMS" },
    { icon: CalendarDays, title: "Bookings" },
    { icon: CreditCard, title: "Payments" },
    { icon: Globe2, title: "Websites + funnels" },
    { icon: TicketCheck, title: "Ticketing + service" },
    { icon: LayoutTemplate, title: "Forms + lead capture" },
  ];

  return (
    <section className="bg-[#F7F4EE] px-5 py-18 sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div className="max-w-[560px]">
            <Eyebrow>Connected beyond CRM</Eyebrow>
            <h2 className="mt-4 text-[34px] font-medium leading-[1] tracking-[-0.047em] sm:text-[44px] lg:text-[50px]" style={{ fontFamily: DISPLAY }}>
              The customer record stays connected to what happens next.
            </h2>
          </div>
          <p className="max-w-[560px] text-[14px] font-medium leading-[1.72] text-[#59646E] lg:justify-self-end">
            Email, SMS, bookings, payments, lead capture and service activity can sit around the same customer record without turning this CRM page into a catalogue of every Zapla tool.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[24px] border border-[#DCD6CD] bg-white shadow-[0_18px_44px_rgba(35,53,76,.05)]">
            <div className="grid items-stretch md:grid-cols-[1fr_auto_1fr_auto_1.15fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr]">
              {items.slice(0,2).map((item) => {
                const Icon=item.icon;
                return (
                  <>
                    <PlatformNode key={item.title} icon={Icon} title={item.title} />
                    <PlatformArrow key={item.title+"arrow"} />
                  </>
                );
              })}
              <div className="flex min-h-[150px] flex-col items-center justify-center bg-[#F4F7FF] px-5 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-[#2563FF] text-white shadow-[0_8px_18px_rgba(37,99,255,.18)]">
                  <Users size={19} />
                </div>
                <div className="mt-3 text-[12px] font-semibold text-[#26313B]">Zapla CRM</div>
                <div className="mt-1 text-[8px] text-[#66717C]">One customer record</div>
              </div>
              {items.slice(2).map((item, index) => {
                const Icon=item.icon;
                return (
                  <>
                    <PlatformArrow key={item.title+"arrow"} />
                    <PlatformNode key={item.title} icon={Icon} title={item.title} />
                  </>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlatformNode({ icon: Icon, title }: { icon: typeof Mail; title: string }) {
  return (
    <motion.div
      className="flex min-h-[150px] flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="grid h-10 w-10 place-items-center rounded-[11px] border border-[#DDE3E9] bg-[#FAFBFC] text-[#46525E]">
        <Icon size={17} />
      </div>
      <div className="mt-3 text-[9px] font-semibold text-[#394550]">{title}</div>
    </motion.div>
  );
}

function PlatformArrow() {
  return <div className="hidden items-center text-[#AAB4BE] md:flex"><ArrowRight size={14} /></div>;
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
