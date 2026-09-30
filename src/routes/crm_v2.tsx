import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Infinity as InfinityIcon,
  MessageSquare,
  MousePointer2,
  Search,
  Settings2,
  SlidersHorizontal,
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
      className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E3E8EE] bg-[#F8FAFC] px-5 pb-14 pt-[112px] sm:px-10 sm:pb-16 sm:pt-[120px] lg:px-16 lg:pb-18 lg:pt-[122px]">
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[680px] w-[1040px] -translate-x-1/2 rounded-[50%] bg-[#2563FF]/[0.035] blur-[120px]" />

      <div className="relative mx-auto max-w-[1360px]">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <Eyebrow>Zapla CRM</Eyebrow>

          <h1
            className="mx-auto mt-4 max-w-[900px] text-[40px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[48px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            The CRM that keeps every customer,
            <span className="block text-[#2563FF]">conversation and next step connected.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.72] text-[#5F6975] sm:text-[17px]">
            Keep customer records, conversations, pipelines and automations working from the same source of truth, so your team can see what happened, where things stand and what needs to happen next.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#crm-workbench"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D3DAE2] bg-white px-6 text-[13px] font-semibold text-[#111318]"
            >
              Explore the CRM
            </a>
          </div>

          <div className="mt-5 text-[11px] font-semibold text-[#6B7681] sm:text-[12px]">
            Unlimited users <span className="mx-2 text-[#AAB4BE]">·</span> Unlimited contacts <span className="mx-2 text-[#AAB4BE]">·</span> Guided Launch
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
    <div className="relative mx-auto max-w-[1160px]">
      <div className="absolute inset-x-[4%] bottom-[-16px] top-[26px] rounded-[20px] bg-[#E7EEF9]" />
      <div className="relative">
        <MainCrmWindow />
      </div>
    </div>
  );
}

function MainCrmWindow() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#D6DEE7] bg-white shadow-[0_30px_78px_rgba(35,53,76,.13)]">
      <div className="flex min-h-12 items-center justify-between border-b border-[#E2E7EC] bg-white px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-5">
          {["Contacts", "Inbox", "Pipelines", "Automations"].map((item, index) => (
            <span
              key={item}
              className={
                "whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.12em] " +
                (index === 0 ? "text-[#26313B]" : "hidden text-[#8A95A0] sm:inline")
              }
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex shrink-0 gap-2">
          <span className="hidden rounded-[7px] border border-[#DDE3E9] bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-[#5E6A76] sm:block">
            Custom columns
          </span>
          <span className="rounded-[7px] bg-[#C9B89B] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-[#2D2923]">
            New contact
          </span>
        </div>
      </div>

      <div className="grid min-h-[465px] lg:grid-cols-[1.08fr_.92fr]">
        <div className="min-w-0 border-b border-[#E2E7EC] lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div>
              <div className="text-[17px] font-semibold text-[#1F2933]">Customer records</div>
              <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#909AA5]">All contacts</div>
            </div>

            <div className="flex gap-2">
              <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#DDE3E9] bg-white px-3 text-[8px] font-bold uppercase tracking-[0.08em] text-[#66727E]">
                <Settings2 size={11} /> Columns
              </span>
              <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#BFD0FF] bg-[#F4F7FF] px-3 text-[8px] font-bold uppercase tracking-[0.08em] text-[#2563FF]">
                <Filter size={11} /> Filter
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[650px]">
              <div className="grid grid-cols-[1.3fr_1fr_.72fr_.78fr_.72fr] border-y border-[#E5E9EE] bg-[#F8FAFB] px-4 py-2.5 text-[8px] font-semibold text-[#596571]">
                {["Customer", "Phone", "Owner", "Stage", "Tag"].map((item) => <div key={item}>{item}</div>)}
              </div>

              {[
                ["Mia Thompson", "0412 555 018", "Ben", "Quote sent", "VIP"],
                ["Chris Moore", "0433 444 022", "Alex", "Proposal", "Electrical"],
                ["Lena Parker", "0414 222 490", "Sam", "Contacted", "Service"],
                ["Daniel Brooks", "0416 308 114", "Ben", "Lead", "Commercial"],
                ["Priya Shah", "0408 668 291", "Jin", "Negotiation", "Priority"],
              ].map((row, i) => (
                <div
                  key={row[0]}
                  className={
                    "grid grid-cols-[1.3fr_1fr_.72fr_.78fr_.72fr] items-center border-b border-[#E7EBEF] px-4 py-3.5 text-[9px] text-[#4B5762] " +
                    (i === 0 ? "bg-[#F2F6FF]" : "bg-white")
                  }
                >
                  {row.map((cell, j) => (
                    <div key={j} className={j === 0 ? "font-semibold text-[#26313B]" : ""}>
                      {j === 4 ? (
                        <span className="rounded-[5px] bg-[#EDF3FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">{cell}</span>
                      ) : cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-4 py-3 text-[8px] text-[#8C97A2] sm:px-5">
            <span>5 of 2,846 contacts</span>
            <span>Rows per page 10</span>
          </div>
        </div>

        <div className="bg-[#FAFBFC] p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar cell={3} size={44} />
              <div>
                <div className="text-[13px] font-semibold text-[#26313B]">Mia Thompson</div>
                <div className="mt-0.5 text-[8px] text-[#929DA8]">Northside Plumbing</div>
              </div>
            </div>
            <span className="rounded-[6px] bg-[#EEF3FF] px-2.5 py-1.5 text-[7px] font-bold text-[#2563FF]">Quote sent</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3">
            {[
              ["Owner", "Ben Walker"],
              ["Service", "Hot water"],
              ["Value", "A$2,850"],
              ["Source", "Website"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-[#E2E7EC] pb-2.5">
                <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#9AA5AF]">{label}</div>
                <div className="mt-1 text-[9px] font-medium text-[#46525E]">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#8E99A4]">Recent activity</div>
              <span className="text-[7px] font-semibold text-[#9AA5AF]">Today</span>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="rounded-[9px] border border-[#DDE4EA] bg-white p-3">
                <div className="text-[8px] font-semibold text-[#6B7681]">SMS reply</div>
                <div className="mt-1 text-[9px] leading-[1.5] text-[#44515E]">
                  Tuesday afternoon works. Can you send through the quote?
                </div>
              </div>

              <div className="rounded-[9px] border border-[#DDE4EA] bg-white p-3">
                <div className="text-[8px] font-semibold text-[#6B7681]">Pipeline update</div>
                <div className="mt-1 flex items-center gap-2 text-[9px] text-[#44515E]">
                  <span className="rounded-[5px] bg-[#F3EFE6] px-2 py-1 text-[7px] font-bold text-[#8A6B3F]">Proposal</span>
                  <ArrowRight size={10} className="text-[#A2ADB7]" />
                  <span className="rounded-[5px] bg-[#EEF3FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">Quote sent</span>
                </div>
              </div>

              <div className="rounded-[9px] border border-[#DDE4EA] bg-white p-3">
                <div className="text-[8px] font-semibold text-[#6B7681]">Next action</div>
                <div className="mt-1 flex items-center justify-between gap-3 text-[9px] text-[#44515E]">
                  <span>Follow up if no reply</span>
                  <span className="rounded-[5px] bg-[#F0F4EA] px-2 py-1 text-[7px] font-bold text-[#667A4B]">2 days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["VIP", "Residential", "Hot water"].map((tag) => (
              <span key={tag} className="rounded-[5px] border border-[#DDE3E9] bg-white px-2 py-1 text-[7px] font-semibold text-[#65717D]">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerWorkbench() {
  const [mode, setMode] = useState<"segment" | "conversation">("segment");

  return (
    <section id="crm-workbench" className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div className="max-w-[600px]">
            <Eyebrow>Work the database</Eyebrow>
            <h2
              className="mt-4 text-[36px] font-medium leading-[1] tracking-[-0.048em] sm:text-[46px] lg:text-[52px]"
              style={{ fontFamily: DISPLAY }}
            >
              Find the right customer without digging through the whole CRM.
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 lg:justify-end">
            <p className="max-w-[480px] text-[14px] leading-[1.7] text-[#687480] sm:text-[15px]">
              Fields, tags and filters turn stored customer data into a working segment. Conversations stay attached when someone needs to act on it.
            </p>
            <div className="inline-flex rounded-[9px] border border-[#DDE3E9] bg-[#F7F9FB] p-1">
              <button
                type="button"
                onClick={() => setMode("segment")}
                className={"rounded-[7px] px-3.5 py-2 text-[10px] font-semibold transition-colors " + (mode === "segment" ? "bg-white text-[#111318] shadow-[0_3px_10px_rgba(35,53,76,.08)]" : "text-[#7A8692]")}
              >
                Segment
              </button>
              <button
                type="button"
                onClick={() => setMode("conversation")}
                className={"rounded-[7px] px-3.5 py-2 text-[10px] font-semibold transition-colors " + (mode === "conversation" ? "bg-white text-[#111318] shadow-[0_3px_10px_rgba(35,53,76,.08)]" : "text-[#7A8692]")}
              >
                Conversation
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="border-y border-[#DDE3E9]">
            {mode === "segment" ? <SegmentSurface /> : <ConversationSurface />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SegmentSurface() {
  return (
    <div className="grid lg:grid-cols-[1.38fr_.62fr]">
      <div className="min-w-0 py-5 lg:pr-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-[16px] font-semibold text-[#26313B]">Quote follow-up</div>
            <span className="rounded-[6px] bg-[#EEF3FF] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-[#2563FF]">23 customers</span>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#DDE3E9] px-3 text-[8px] font-semibold text-[#66727E]">
              <SlidersHorizontal size={11} /> Columns
            </span>
            <span className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#1E2B29] px-3 text-[8px] font-semibold text-white">
              Save smart list
            </span>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-[1.2fr_1fr_.8fr_.8fr_.75fr] border-y border-[#E4E9EE] bg-[#F8FAFB] px-3 py-2.5 text-[8px] font-semibold text-[#596571]">
              {["Customer", "Contact", "Owner", "Stage", "Last activity"].map((label) => <div key={label}>{label}</div>)}
            </div>
            {[
              ["Mia Thompson", "0412 555 018", "Ben", "Quote sent", "2 days"],
              ["Chris Moore", "0433 444 022", "Alex", "Quote sent", "4 days"],
              ["Daniel Brooks", "0416 308 114", "Sam", "Quote sent", "5 days"],
              ["Priya Shah", "0408 668 291", "Ben", "Quote sent", "6 days"],
            ].map((row, i) => (
              <div key={row[0]} className={"grid grid-cols-[1.2fr_1fr_.8fr_.8fr_.75fr] items-center border-b border-[#E7EBEF] px-3 py-3.5 text-[9px] text-[#4B5762] " + (i === 0 ? "bg-[#F5F8FF]" : "")}>
                {row.map((cell, j) => <div key={j} className={j === 0 ? "font-semibold text-[#26313B]" : j === 4 && i > 1 ? "font-semibold text-[#B86850]" : ""}>{cell}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E1E6EB] bg-[#FAFBFC] py-5 lg:border-l lg:border-t-0 lg:pl-5">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#26313B]">
          <Filter size={14} className="text-[#2563FF]" />
          Filter customers
        </div>
        <p className="mt-1 text-[9px] leading-[1.55] text-[#8A95A0]">Build the segment from the information already stored in the CRM.</p>

        <div className="mt-4 space-y-3">
          {[
            ["Field", "Pipeline stage"],
            ["Operator", "Is"],
            ["Value", "Quote sent"],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#8F9AA5]">{label}</div>
              <div className="mt-1.5 flex h-9 items-center justify-between rounded-[7px] border border-[#DDE3E9] bg-white px-3 text-[9px] font-medium text-[#3E4A56]">
                {value} <ChevronDown size={11} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#E1E6EB] pt-4">
          <div className="flex items-center gap-2 text-[9px] font-semibold text-[#2563FF]">
            <span className="h-2 w-2 rounded-full bg-[#2563FF]" /> 23 matches
          </div>
          <span className="text-[8px] font-semibold text-[#8D98A3]">Match all</span>
        </div>
      </div>
    </div>
  );
}

function ConversationSurface() {
  return (
    <div className="grid min-h-[430px] grid-cols-[180px_1fr] lg:grid-cols-[230px_1fr_230px]">
      <div className="border-r border-[#E3E8ED] py-5 pr-4">
        <div className="flex items-center justify-between">
          <div className="text-[15px] font-semibold text-[#26313B]">Messages</div>
          <Search size={13} className="text-[#7D8994]" />
        </div>
        {["Mia Thompson", "SMS Contact", "John Smith", "Priya Shah"].map((name, i) => (
          <div key={name} className={"mt-2 rounded-[8px] px-3 py-3 " + (i === 0 ? "bg-[#EEF3F8]" : "")}>
            <div className="text-[9px] font-semibold text-[#293440]">{name}</div>
            <div className="mt-1 line-clamp-1 text-[7px] text-[#96A1AC]">Recent customer message...</div>
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-col justify-between bg-[#FBFCFD] p-4 sm:p-5">
        <div>
          <div className="max-w-[82%] rounded-[10px] border border-[#DDE4EA] bg-white px-4 py-3 text-[9px] leading-[1.55] text-[#45515E]">
            Hi Mia, your quote is ready. Would Tuesday afternoon suit you?
          </div>
          <div className="mt-3 ml-auto max-w-[78%] rounded-[10px] bg-[#EAF0FF] px-4 py-3 text-[9px] leading-[1.55] text-[#344B78]">
            Tuesday afternoon works. Can you send through the quote?
          </div>
        </div>
        <div className="rounded-[9px] border border-[#DDE3E9] bg-white px-4 py-3.5 text-[8px] text-[#9AA5AF]">Type a message...</div>
      </div>

      <div className="hidden border-l border-[#E3E8ED] py-5 pl-4 lg:block">
        <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8F9AA5]">Profile</div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar cell={3} size={38} />
          <div>
            <div className="text-[10px] font-semibold text-[#26313B]">Mia Thompson</div>
            <div className="text-[7px] uppercase tracking-[0.1em] text-[#9AA5AF]">Customer</div>
          </div>
        </div>
        {[
          ["Owner", "Ben Walker"],
          ["Department", "Sales"],
          ["Tag", "VIP"],
          ["Language", "English"],
        ].map(([label, value]) => (
          <div key={label} className="mt-3 rounded-[7px] border border-[#E1E6EB] bg-[#FAFBFC] px-3 py-2">
            <div className="text-[7px] font-semibold text-[#9AA5AF]">{label}</div>
            <div className="mt-0.5 text-[8px] font-medium text-[#4C5965]">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PipelineRail() {
  const stages = [
    { name: "Lead", count: 4, tone: "#6F8C36", items: [["Alex Chen", "A$1,450"], ["Lena Parker", "A$780"]] },
    { name: "Contacted", count: 3, tone: "#C95A18", items: [["Sam Nguyen", "A$3,200"], ["Ivy Harris", "A$950"]] },
    { name: "Proposal", count: 2, tone: "#D09100", items: [["Mia Thompson", "A$2,850"], ["Chris Moore", "A$1,900"]] },
    { name: "Negotiation", count: 2, tone: "#2497B4", items: [["Priya Shah", "A$520"], ["Ben Lewis", "A$2,250"]] },
    { name: "Closed won", count: 3, tone: "#28894A", items: [["Daniel Brooks", "A$4,100"], ["Grace Tan", "A$1,680"]] },
  ];

  return (
    <section className="overflow-hidden bg-[#F4F6F8] py-20 sm:py-24 lg:py-24">
      <div className="px-5 sm:px-10 lg:px-16">
        <Reveal className="mx-auto flex max-w-[1320px] flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[600px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7D8994]">Pipeline</div>
            <h2 className="mt-3 text-[36px] font-medium leading-[1] tracking-[-0.048em] sm:text-[46px] lg:text-[52px]" style={{ fontFamily: DISPLAY }}>
              See what is moving.
              <span className="block text-[#2563FF]">And what has stopped.</span>
            </h2>
          </div>
          <p className="max-w-[500px] text-[14px] leading-[1.7] text-[#687480] sm:text-[15px]">
            Stage, owner and value stay visible in one place. Stale opportunities stop hiding in spreadsheets, inboxes or somebody's memory.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-10" delay={0.04}>
        <div className="overflow-x-auto pb-2">
          <div className="mx-auto flex min-w-[1240px] max-w-[1510px] gap-2 px-5 sm:px-10 lg:px-16">
            {stages.map((stage, stageIndex) => (
              <div key={stage.name} className="min-h-[300px] min-w-[230px] flex-1 border border-[#DCE2E8] bg-white">
                <div className="flex items-center justify-between px-3 py-2.5 text-white" style={{ backgroundColor: stage.tone }}>
                  <span className="text-[9px] font-bold">{stage.name}</span>
                  <span className="text-[8px] font-semibold">{stage.count}</span>
                </div>
                <div className="space-y-2 p-2.5">
                  {stage.items.map(([name, value], itemIndex) => (
                    <motion.div
                      key={name}
                      initial={false}
                      whileInView={
                        stageIndex === 2 && itemIndex === 0
                          ? { x: [0, 6, 0], borderColor: ["#E0E5EA", "#9AB5FF", "#E0E5EA"] }
                          : undefined
                      }
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                      className="border border-[#E0E5EA] bg-[#FAFBFC] p-3"
                    >
                      <div className="text-[10px] font-semibold text-[#2B3641]">{name}</div>
                      <div className="mt-4 flex items-center justify-between border-t border-[#E9EDF1] pt-2">
                        <span className="text-[8px] font-semibold text-[#65717D]">{value}</span>
                        {stageIndex === 2 && itemIndex === 1 ? (
                          <span className="rounded-[4px] bg-[#FCE9E3] px-1.5 py-1 text-[6px] font-bold uppercase tracking-[0.08em] text-[#B86850]">stale</span>
                        ) : (
                          <span className="text-[7px] text-[#9AA5AF]">active</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Automation() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16">
      <div className="pointer-events-none absolute right-[-12%] top-[-34%] h-[680px] w-[680px] rounded-full bg-[#2563FF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="max-w-[880px]">
          <Eyebrow dark>CRM that can act</Eyebrow>
          <h2 className="mt-4 text-[38px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
            When the customer state changes,
            <span className="block text-[#8EACFF]">the next action can start automatically.</span>
          </h2>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#F8FAFC] text-[#111318] shadow-[0_30px_80px_rgba(0,0,0,.26)]">
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
                  <span className="border-b-2 border-[#F59E0B] px-3 py-3 text-[#C87500]">Triggers</span>
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
                            className="flex items-center gap-2 rounded-[7px] border border-[#F2D7AE] bg-[#FFF7EA] px-3 py-2.5 text-[8px] font-semibold text-[#C87500]"
                          >
                            <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#F59E0B] text-white">↯</span>
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
                  <BuilderNode label="Trigger" title="Pipeline stage changed" copy="Stage becomes Quote sent" tone="blue" />
                  <BuilderConnector />
                  <BuilderNode label="Wait" title="2 days" copy="Give the customer time to decide" tone="amber" />
                  <BuilderConnector />
                  <BuilderNode label="Action" title="Send follow-up" copy="Message goes out if still in stage" tone="green" />
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

function BuilderNode({
  label,
  title,
  copy,
  tone,
}: {
  label: string;
  title: string;
  copy: string;
  tone: "blue" | "amber" | "green";
}) {
  const toneMap = {
    blue: "border-[#C7D6FF] bg-[#F0F4FF] text-[#2563FF]",
    amber: "border-[#EFD7A4] bg-[#FFF7E7] text-[#9B6B18]",
    green: "border-[#D2DEC3] bg-[#F3F7EC] text-[#667A4B]",
  };

  return (
    <div className={"relative rounded-[12px] border p-4 shadow-[0_10px_28px_rgba(38,53,70,.07)] " + toneMap[tone]}>
      <div className="text-[8px] font-bold uppercase tracking-[0.13em]">{label}</div>
      <div className="mt-4 text-[13px] font-semibold text-[#26313B]">{title}</div>
      <div className="mt-1 text-[9px] leading-[1.5] text-[#76838F]">{copy}</div>
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
    <section className="bg-[#F8FAFC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16">
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
          <div className="overflow-hidden border border-[#DCE3EA] bg-white">
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
    { cell: 0, name: "Owner", x: "13%", y: "18%", tone: "#2563FF" },
    { cell: 7, name: "Reception", x: "72%", y: "14%", tone: "#8B5CF6" },
    { cell: 14, name: "Sales", x: "18%", y: "72%", tone: "#E97D62" },
    { cell: 9, name: "Operations", x: "73%", y: "72%", tone: "#99A36D" },
    { cell: 19, name: "Admin", x: "44%", y: "43%", tone: "#DDA34B" },
  ];

  return (
    <div className="relative min-h-[470px] overflow-hidden bg-[#F5F8FF] p-6 sm:p-8">
      <div className="max-w-[420px]">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">Unlimited users</div>
        <h3 className="mt-3 text-[30px] font-medium leading-[1] tracking-[-0.045em] text-[#111318] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>
          Bring the whole team into the customer history.
        </h3>
        <p className="mt-3 max-w-[390px] text-[12px] leading-[1.65] text-[#6B7681]">
          Sales, admin, reception, operations and management can work from the same CRM without adding a new per-seat charge each time the team grows.
        </p>
      </div>

      <div className="absolute bottom-5 left-[5%] right-[5%] top-[47%] rounded-[12px] border border-[#D7E0EC] bg-white shadow-[0_16px_34px_rgba(35,53,76,.08)]">
        <div className="flex h-full items-center justify-center">
          <div className="w-[62%] rounded-[10px] border border-[#E0E5EA] bg-[#FAFBFC] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold text-[#26313B]">Mia Thompson</span>
              <span className="rounded-[5px] bg-[#EEF3FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">Quote sent</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[7px] text-[#84909B]">
              <span>Owner: Ben</span>
              <span>Value: A$2,850</span>
              <span>Tag: VIP</span>
            </div>
          </div>
        </div>

        {people.map((person) => (
          <div key={person.name} className="absolute" style={{ left: person.x, top: person.y, transform: "translate(-50%, -50%)" }}>
            <div className="relative">
              <Avatar cell={person.cell} size={38} className="border-2 border-white shadow-[0_8px_18px_rgba(35,53,76,.14)]" />
              <div
                className="absolute left-[28px] top-[30px] flex items-center gap-1.5 rounded-[6px] px-2 py-1 text-[7px] font-bold text-white shadow-[0_6px_14px_rgba(35,53,76,.16)]"
                style={{ backgroundColor: person.tone }}
              >
                <MousePointer2 size={8} fill="currentColor" />
                {person.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UnlimitedContactsVisual() {
  return (
    <div className="border-b border-[#DCE3EA] p-6 sm:p-7">
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
            <span className="text-[7px] font-semibold text-[#9AA5AF]">{i < 2 ? "active" : "stored"}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] leading-[1.6] text-[#6E7984]">The customer history does not need to be trimmed just to stay under a contact count.</p>
    </div>
  );
}

function GuidedLaunchVisual() {
  return (
    <div className="p-6 sm:p-7">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">Guided Launch</div>
      <h3 className="mt-2 text-[24px] font-medium tracking-[-0.04em] text-[#111318]" style={{ fontFamily: DISPLAY }}>Do not start from blank.</h3>
      <p className="mt-3 text-[11px] leading-[1.6] text-[#6E7984]">
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
