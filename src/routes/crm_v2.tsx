import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  Database,
  Filter,
  Search,
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
      <SystemStrip />
      <ProductStory />
      <Automation />
      <Configuration />
      <CommercialDifference />
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
    <section className="relative overflow-hidden border-b border-[#E6EBF0] bg-[#F8FAFC] px-5 pb-14 pt-[112px] sm:px-10 sm:pb-16 sm:pt-[124px] lg:px-16 lg:pb-20 lg:pt-[132px]">
      <div className="pointer-events-none absolute right-[-8%] top-[-20%] h-[580px] w-[580px] rounded-full bg-[#2563FF]/[0.04] blur-[110px]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-14">
        <Reveal className="max-w-[610px]">
          <Eyebrow>Zapla CRM</Eyebrow>
          <h1
            className="mt-5 text-[46px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[62px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            The customer record
            <span className="block">your whole team can</span>
            <span className="block text-[#2563FF]">actually work from.</span>
          </h1>

          <p className="mt-6 max-w-[590px] text-[16px] leading-[1.7] text-[#5F6975] sm:text-[18px]">
            Customer details, conversations, pipeline status and next actions stay connected, so the team sees the same customer instead of four different versions of the story.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a
              href="#crm-product"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D3DAE2] bg-white px-6 text-[13px] font-semibold text-[#111318]"
            >
              See the CRM
            </a>
          </div>

          <div className="mt-7 text-[12px] font-semibold tracking-[-0.01em] text-[#66727E]">
            Unlimited users <span className="mx-2 text-[#AEB8C3]">·</span> Unlimited contacts <span className="mx-2 text-[#AEB8C3]">·</span> Guided Launch
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <InboxShell />
        </Reveal>
      </div>
    </section>
  );
}

function ProductTopTabs({
  active,
  items,
}: {
  active: string;
  items: string[];
}) {
  return (
    <div className="flex min-h-11 items-center gap-4 overflow-hidden border-b border-[#E5E9EE] bg-white px-4 sm:gap-5">
      {items.map((item) => (
        <span
          key={item}
          className={
            "whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.13em] " +
            (item === active ? "text-[#26313B]" : "text-[#8B96A1]")
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function InboxShell() {
  const messages = [
    ["Mia Thompson", "Tuesday afternoon works. Can you send through the quote?", true],
    ["SMS Contact", "Your appointment reminder is ready.", false],
    ["John Smith", "Thanks, that works for me.", false],
    ["Priya Shah", "Can we move it to Friday?", false],
  ];

  return (
    <div className="relative mx-auto max-w-[790px]">
      <div className="absolute -bottom-5 left-[6%] right-[2%] top-5 rounded-[18px] bg-[#DDE8FB]" />
      <div className="relative overflow-hidden rounded-[16px] border border-[#D8E0E8] bg-white shadow-[0_24px_68px_rgba(36,55,78,.11)]">
        <ProductTopTabs
          active="Unified inbox"
          items={["Unified inbox", "Channels", "Saved responses", "Opt-in lists", "Ticketing"]}
        />

        <div className="grid min-h-[480px] grid-cols-[180px_1fr] sm:grid-cols-[220px_1fr_205px]">
          <div className="border-r border-[#E6EAF0] bg-[#FCFDFE] p-3">
            <div className="flex items-center justify-between border-b border-[#E6EAF0] pb-3">
              <div className="text-[13px] font-semibold text-[#1F2933]">Messages</div>
              <Filter size={13} className="text-[#6F7B87]" />
            </div>
            <div className="mt-2 flex gap-1 border-b border-[#E6EAF0] pb-2 text-[7px] font-bold uppercase tracking-[0.08em] text-[#87929D]">
              <span className="rounded-[6px] bg-[#EEF2F6] px-2 py-1.5 text-[#26313B]">All</span>
              <span className="px-2 py-1.5">Unread</span>
              <span className="px-2 py-1.5">Important</span>
            </div>
            <div className="mt-2 space-y-1">
              {messages.map(([name, copy, active]) => (
                <div key={name} className={"rounded-[8px] px-2.5 py-3 " + (active ? "bg-[#EEF3F8]" : "")}>
                  <div className="text-[10px] font-semibold text-[#27323D]">{name}</div>
                  <div className="mt-1 line-clamp-1 text-[8px] text-[#8B96A1]">{copy}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col bg-[#FBFCFD]">
            <div className="border-b border-[#E6EAF0] bg-white px-5 py-4">
              <div className="text-[13px] font-semibold text-[#26313B]">Mia Thompson</div>
              <div className="mt-1 text-[8px] text-[#8F9AA5]">SMS · Residential customer</div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="max-w-[86%] rounded-[10px] border border-[#DFE5EB] bg-white px-4 py-3 text-[10px] leading-[1.55] text-[#45515E]">
                  Hi Mia, your quote is ready. Would Tuesday afternoon suit you for the site visit?
                </div>
                <div className="mt-3 ml-auto max-w-[82%] rounded-[10px] bg-[#EAF0FF] px-4 py-3 text-[10px] leading-[1.55] text-[#344A74]">
                  Tuesday afternoon works. Can you send through the quote?
                </div>
              </div>
              <div className="rounded-[10px] border border-[#DDE4EA] bg-white px-4 py-4 text-[9px] text-[#9AA5AF]">
                Type a message...
              </div>
            </div>
          </div>

          <div className="hidden border-l border-[#E6EAF0] bg-white p-4 sm:block">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#89949F]">Profile</div>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E2E8F0] text-[10px] font-bold text-[#526170]">MT</div>
              <div>
                <div className="text-[11px] font-semibold text-[#26313B]">Mia Thompson</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[0.12em] text-[#9CA6B0]">Customer</div>
              </div>
            </div>

            {[
              ["Owner", "Ben Walker"],
              ["Service", "Hot water"],
              ["Stage", "Quote sent"],
              ["Value", "A$2,850"],
            ].map(([label, value]) => (
              <div key={label} className="mt-4 border-b border-[#E8ECF0] pb-3">
                <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#9AA5AF]">{label}</div>
                <div className="mt-1 text-[9px] font-medium text-[#485560]">{value}</div>
              </div>
            ))}

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["VIP", "Quote", "Residential"].map((tag) => (
                <span key={tag} className="rounded-[6px] bg-[#EEF3FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemStrip() {
  const items = [
    ["Customer", "details"],
    ["Conversation", "history"],
    ["Pipeline", "state"],
    ["Automation", "action"],
  ];

  return (
    <section className="border-b border-[#E6EBF0] bg-white px-5 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-8 gap-y-3 py-7">
        <div className="text-[12px] font-semibold text-[#26313B]">One customer. One working history.</div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {items.map(([a, b], index) => (
            <div key={a} className="flex items-center gap-5 text-[10px] text-[#6D7884]">
              <span><strong className="font-semibold text-[#34404C]">{a}</strong> {b}</span>
              {index < items.length - 1 ? <ArrowRight size={12} className="hidden text-[#B2BCC6] sm:block" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductStory() {
  return (
    <section id="crm-product" className="bg-[#FCFCFA] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 border-b border-[#E0E6EC] pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="max-w-[560px]">
            <Eyebrow>Inside the CRM</Eyebrow>
            <h2 className="mt-4 text-[38px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
              The customer stays intact as the work changes.
            </h2>
          </div>
          <p className="max-w-[590px] text-[15px] leading-[1.72] text-[#64707C] sm:text-[17px] lg:justify-self-end">
            Zapla keeps the record, the conversation and the current opportunity connected. Your team can see what happened, where things stand and what needs attention without rebuilding the story first.
          </p>
        </Reveal>

        <div className="divide-y divide-[#E0E6EC]">
          <ProductRow
            index="Customer records"
            title="Store the details your business actually uses."
            copy="Custom fields, tags, owners and filters help the database reflect the business instead of forcing every customer into the same generic record."
            visual={<ContactsShell />}
          />
          <ProductRow
            index="Pipeline"
            title="See what is moving. And what has stopped."
            copy="View opportunities by stage, owner and value, with stale work visible before it quietly disappears into somebody's memory."
            visual={<PipelineShell />}
          />
        </div>
      </div>
    </section>
  );
}

function ProductRow({
  index,
  title,
  copy,
  visual,
  reverse = false,
}: {
  index: string;
  title: string;
  copy: string;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={"grid gap-9 py-14 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:gap-14 lg:py-16 " + (reverse ? "lg:grid-cols-[1.32fr_.68fr]" : "")}>
      <Reveal className={reverse ? "lg:order-2" : ""}>
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7F8A95]">{index}</div>
        <h3 className="mt-3 max-w-[430px] text-[30px] font-medium leading-[1.02] tracking-[-0.045em] text-[#111318] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>
          {title}
        </h3>
        <p className="mt-4 max-w-[440px] text-[13px] leading-[1.72] text-[#6A7580] sm:text-[14px]">{copy}</p>
      </Reveal>
      <Reveal delay={0.04} className={reverse ? "lg:order-1" : ""}>{visual}</Reveal>
    </div>
  );
}

function ContactsShell() {
  const rows = [
    ["J.S Pty Ltd", "John", "Smith", "0410 718 086", "Ben", "VIP"],
    ["Northside Plumbing", "Mia", "Thompson", "0412 555 018", "Ben", "Quote"],
    ["Coastal Air", "Lena", "Parker", "0414 222 490", "Sam", "Service"],
    ["Bright Spark", "Chris", "Moore", "0433 444 022", "Alex", "Lead"],
  ];

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#DDE3E9] bg-white shadow-[0_18px_46px_rgba(36,55,78,.07)]">
      <ProductTopTabs active="Contacts" items={["Contacts", "Contact types", "Contact fields", "Tags", "Smart lists", "Quick actions"]} />
      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-[16px] font-semibold text-[#1F2933]">Contacts</div>
          <div className="flex gap-2">
            <div className="rounded-[8px] border border-[#DDE3E9] bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-[#65717D]">Custom columns</div>
            <div className="rounded-[8px] border border-[#BFD0FF] bg-[#F4F7FF] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-[#2563FF]">Filter</div>
          </div>
        </div>

        <div className="mt-4 overflow-hidden border-y border-[#E7EBEF]">
          <div className="grid grid-cols-[1.3fr_.75fr_.8fr_1fr_.7fr_.65fr] bg-[#F8FAFB] px-3 py-2 text-[8px] font-semibold text-[#596571]">
            {["Company", "First", "Last", "Phone", "Owner", "Tag"].map((label) => <div key={label}>{label}</div>)}
          </div>
          {rows.map((row, i) => (
            <div key={row[0]} className={"grid grid-cols-[1.3fr_.75fr_.8fr_1fr_.7fr_.65fr] items-center border-t border-[#E7EBEF] px-3 py-3 text-[9px] text-[#4A5662] " + (i === 1 ? "bg-[#F5F8FF]" : "")}>
              {row.map((cell, j) => (
                <div key={j} className={j === 0 ? "font-semibold text-[#26313B]" : ""}>
                  {j === 5 ? <span className="rounded-[5px] bg-[#EEF3FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">{cell}</span> : cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[8px] text-[#8C97A2]">
          <span>Showing 4 customers</span>
          <span>Rows per page 10</span>
        </div>
      </div>

      <div className="border-t border-[#DDE3E9] bg-[#FAFBFC] p-4 sm:grid sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end sm:gap-3">
        {[
          ["Field", "Stage"],
          ["Operator", "Is"],
          ["Value", "Quote sent"],
        ].map(([label, value]) => (
          <div key={label} className="mb-3 sm:mb-0">
            <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#8C97A2]">{label}</div>
            <div className="mt-1 flex h-9 items-center justify-between rounded-[7px] border border-[#DEE4EA] bg-white px-3 text-[9px] font-medium text-[#37434F]">
              {value}<ChevronDown size={11} />
            </div>
          </div>
        ))}
        <div className="flex h-9 items-center gap-2 rounded-[7px] bg-[#EEF3FF] px-3 text-[9px] font-semibold text-[#2563FF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563FF]" /> 1 match
        </div>
      </div>
    </div>
  );
}

function PipelineShell() {
  const stages = [
    ["Lead", "#6D8B34", [["test lead", "A$2,000", "12 min"], ["Lena Parker", "A$780", "41 min"]]],
    ["Contacted", "#C85A1A", [["Sam Nguyen", "A$3,200", "Today"], ["Ivy Harris", "A$950", "Today"]]],
    ["Proposal", "#D09200", [["Mia Thompson", "A$2,850", "2 days"], ["Chris Moore", "A$1,900", "6 days"]]],
    ["Negotiation", "#2497B4", [["Priya Shah", "A$520", "Tue"], ["Ben Lewis", "A$2,250", "Thu"]]],
  ] as const;

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#DDE3E9] bg-[#F5F6F7] shadow-[0_18px_46px_rgba(36,55,78,.07)]">
      <ProductTopTabs active="Pipelines" items={["Pipelines", "Pipeline fields", "Pipeline types", "Tags", "Quick actions"]} />
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-[16px] font-semibold text-[#1F2933]">Pipelines</div>
        <div className="rounded-[8px] bg-[#C9B89B] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.08em] text-[#2C2924]">+ Add item</div>
      </div>
      <div className="grid gap-2 overflow-x-auto px-4 pb-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map(([name, color, cards]) => (
          <div key={name} className="min-w-[210px] overflow-hidden rounded-[10px] border border-[#DDE3E9] bg-white">
            <div className="flex items-center justify-between px-3 py-2.5 text-white" style={{ backgroundColor: color }}>
              <span className="text-[9px] font-bold">{name}</span>
              <span className="text-[8px] font-semibold">2</span>
            </div>
            <div className="space-y-2 bg-[#FAFBFC] p-2.5">
              {cards.map(([person, value, age]) => (
                <div key={person} className="rounded-[8px] border border-[#E0E5EA] bg-white p-3">
                  <div className="text-[9px] font-semibold text-[#2A3540]">{person}</div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#EEF1F4] pt-2 text-[7px]">
                    <span className="font-semibold text-[#64707C]">{value}</span>
                    <span className={age === "6 days" ? "font-semibold text-[#B96750]" : "text-[#9AA5AF]"}>{age}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Automation() {
  const reduced = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#101820] px-5 py-18 text-white sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute right-[-10%] top-[-30%] h-[600px] w-[600px] rounded-full bg-[#2563FF]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div className="max-w-[610px]">
            <Eyebrow dark>CRM that can act</Eyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[52px] lg:text-[60px]" style={{ fontFamily: DISPLAY }}>
              A customer state can become the start of the next action.
            </h2>
          </div>
          <p className="max-w-[560px] text-[15px] leading-[1.72] text-white/58 sm:text-[17px] lg:justify-self-end">
            Customer events, pipeline stages and timing can trigger the workflow you choose. The CRM does not have to stop at recording what already happened.
          </p>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[15px] border border-white/10 bg-[#F8FAFC] text-[#111318] shadow-[0_28px_70px_rgba(0,0,0,.22)]">
            <div className="flex min-h-12 items-center justify-between border-b border-[#E1E6EB] bg-white px-4">
              <div>
                <div className="text-[11px] font-semibold text-[#26313B]">Quote follow-up</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[0.11em] text-[#A0A9B2]">Automation · Draft</div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-[7px] border border-[#DDE3E9] px-2.5 py-1.5 text-[8px] font-semibold text-[#65717D]">Test</span>
                <span className="rounded-[7px] bg-[#C9B89B] px-2.5 py-1.5 text-[8px] font-semibold text-[#2C2924]">Save</span>
              </div>
            </div>

            <div className="grid min-h-[500px] lg:grid-cols-[255px_1fr]">
              <div className="border-r border-[#E0E5EA] bg-white">
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
                    ["Contact", ["Tag changed", "Contact created", "Contact owner changed"]],
                    ["Pipeline", ["Pipeline stage changed", "Opportunity created"]],
                  ].map(([group, items]) => (
                    <div key={group as string} className="mt-4">
                      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#A0A9B2]">{group}</div>
                      <div className="mt-2 space-y-1.5">
                        {(items as string[]).map((item, i) => (
                          <motion.div
                            key={item}
                            initial={reduced ? false : { opacity: 0, x: -8 }}
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
                className="relative overflow-hidden p-6 sm:p-8"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(111,126,142,.22) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              >
                <div className="absolute inset-x-0 top-5 text-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#98A4AF]">
                  Example workflow
                </div>

                <div className="relative mt-12 grid min-h-[390px] items-center gap-6 xl:grid-cols-[1fr_60px_1fr_60px_1fr]">
                  <BuilderNode label="Trigger" title="Pipeline stage changed" copy="Stage becomes Quote sent" tone="blue" />
                  <BuilderConnector />
                  <BuilderNode label="Wait" title="2 days" copy="Give the customer time to decide" tone="amber" />
                  <BuilderConnector />
                  <BuilderNode label="Action" title="Send follow-up" copy="Message goes out if still in stage" tone="green" />
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

function Configuration() {
  return (
    <section className="bg-[#F6F8FA] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-22">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="max-w-[470px]">
            <h2 className="text-[36px] font-medium leading-[1] tracking-[-0.048em] sm:text-[46px]" style={{ fontFamily: DISPLAY }}>
              Make the record fit the business.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.72] text-[#687480] sm:text-[15px]">
              Configure the fields, tags, filters and pipeline structure your team actually uses. Keep the model simple where it can be simple.
            </p>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[#DDE3E9] bg-white shadow-[0_16px_40px_rgba(36,55,78,.06)]">
            <div className="grid border-b border-[#E5E9EE] sm:grid-cols-4">
              {[
                ["Contact fields", "Custom information"],
                ["Tags", "Useful states"],
                ["Smart lists", "Working segments"],
                ["Pipeline fields", "Your process"],
              ].map(([title, copy], i) => (
                <div key={title} className={"p-4 " + (i > 0 ? "border-t border-[#E5E9EE] sm:border-l sm:border-t-0" : "")}>
                  <div className="text-[10px] font-semibold text-[#26313B]">{title}</div>
                  <div className="mt-1 text-[8px] text-[#909BA6]">{copy}</div>
                </div>
              ))}
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[0.8fr_1.2fr] lg:p-6">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#909BA6]">Example fields</div>
                <div className="mt-3 space-y-2">
                  {["Service type", "Preferred location", "Customer source", "Renewal date"].map((field, i) => (
                    <div key={field} className="flex items-center justify-between rounded-[8px] border border-[#E0E5EA] bg-[#FBFCFD] px-3 py-2.5">
                      <span className="text-[9px] font-medium text-[#4A5662]">{field}</span>
                      <span className="text-[7px] font-semibold text-[#9AA5AF]">{i === 3 ? "Date" : "Text"}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#909BA6]">Example segment</div>
                <div className="mt-3 rounded-[10px] border border-[#DDE3E9] bg-[#F9FAFB] p-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Field", "Stage"],
                      ["Operator", "Is"],
                      ["Value", "Quote sent"],
                    ].map(([a, b]) => (
                      <div key={a}>
                        <div className="text-[7px] font-semibold text-[#939EA8]">{a}</div>
                        <div className="mt-1.5 rounded-[7px] border border-[#DEE4EA] bg-white px-3 py-2.5 text-[9px] font-medium text-[#3E4A56]">{b}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#E1E6EB] pt-4">
                    <div className="flex items-center gap-2 text-[9px] font-semibold text-[#2563FF]">
                      <span className="h-2 w-2 rounded-full bg-[#2563FF]" /> 23 customers
                    </div>
                    <div className="rounded-[7px] bg-[#1E2B29] px-3 py-2 text-[8px] font-semibold text-white">Save smart list</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CommercialDifference() {
  const rows = [
    {
      icon: Users,
      title: "Bring the whole team.",
      metric: "Unlimited users",
      copy: "Sales, admin, reception, operations and management can work from the same customer information without a growing seat bill.",
    },
    {
      icon: Database,
      title: "Grow the database.",
      metric: "Unlimited contacts",
      copy: "Keep the customer history you need without making contact count the reason you stop adding useful records.",
    },
    {
      icon: Workflow,
      title: "Do not start from a blank workspace.",
      metric: "Guided Launch",
      copy: "We help configure the agreed essentials so moving CRM does not become another internal project for your team.",
    },
  ];

  return (
    <section className="bg-white px-5 py-18 sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[700px]">
          <Eyebrow>The commercial difference</Eyebrow>
          <h2 className="mt-4 text-[38px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]" style={{ fontFamily: DISPLAY }}>
            A CRM that gets more useful
            <span className="block text-[#2563FF]">without charging for every person you add.</span>
          </h2>
        </Reveal>

        <div className="mt-10 border-y border-[#DCE3EA]">
          {rows.map((row, index) => {
            const Icon = row.icon;
            return (
              <Reveal key={row.metric} delay={index * 0.03}>
                <div className={"grid gap-5 py-6 lg:grid-cols-[0.72fr_.64fr_1.18fr] lg:items-center lg:gap-10 lg:py-7 " + (index > 0 ? "border-t border-[#DCE3EA]" : "")}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-[#EEF3FF] text-[#2563FF]"><Icon size={16} /></span>
                    <span className="text-[13px] font-semibold text-[#26313B]">{row.title}</span>
                  </div>
                  <div className="text-[27px] font-medium tracking-[-0.045em] text-[#111318] sm:text-[31px]" style={{ fontFamily: DISPLAY }}>{row.metric}</div>
                  <p className="max-w-[560px] text-[13px] leading-[1.7] text-[#687480]">{row.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6">
          <a href={PRICING_URL} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2563FF]">See Zapla pricing <ArrowRight size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[#E5E9EF] bg-[#F7F9FB] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1080px] gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:gap-14">
        <Reveal className="max-w-[350px]">
          <Eyebrow>Before you move CRM</Eyebrow>
          <h2 className="mt-4 text-[34px] font-medium leading-[1] tracking-[-0.048em] sm:text-[42px]" style={{ fontFamily: DISPLAY }}>
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
    <section className="relative overflow-hidden bg-[#101820] px-5 py-18 text-white sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute left-[62%] top-[-80px] h-[360px] w-[360px] rounded-full bg-[#2563FF]/10 blur-[90px]" />
      <Reveal className="relative mx-auto max-w-[1080px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="max-w-[720px]">
            <Eyebrow dark>See it around your business</Eyebrow>
            <h2 className="mt-4 text-[40px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[52px] lg:text-[58px]" style={{ fontFamily: DISPLAY }}>
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
