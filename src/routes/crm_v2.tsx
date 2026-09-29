import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Columns3,
  Database,
  Filter,
  MessageSquare,
  Search,
  Settings2,
  Tag,
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
    <main
      className="min-h-screen overflow-hidden bg-[#FCFCFA] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <OwnershipStrip />
      <CustomerRecords />
      <UnifiedInbox />
      <Pipeline />
      <Automation />
      <Customise />
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
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={
        "text-[10px] font-semibold uppercase tracking-[0.2em] " +
        (dark ? "text-[#8EACFF]" : "text-[#2563FF]")
      }
    >
      {children}
    </div>
  );
}

function PrimaryButton({ label = "Book a Call" }: { label?: string }) {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] focus-visible:ring-offset-2"
    >
      {label}
      <ArrowRight size={15} />
    </a>
  );
}

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex h-[50px] items-center rounded-[10px] border border-[#D7DDE5] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#AEB9C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] focus-visible:ring-offset-2"
    >
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E9EF] bg-[#F7FAFD] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-24 lg:pt-[136px]">
      <div className="pointer-events-none absolute right-[-6%] top-[-8%] h-[560px] w-[560px] rounded-full bg-[#2563FF]/[0.045] blur-[90px]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal className="max-w-[650px]">
          <Eyebrow>Zapla CRM</Eyebrow>
          <h1
            className="mt-5 text-[48px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[64px] lg:text-[76px]"
            style={{ fontFamily: DISPLAY }}
          >
            The customer record
            <span className="block">your whole team can</span>
            <span className="block text-[#2563FF]">actually work from.</span>
          </h1>

          <p className="mt-6 max-w-[610px] text-[16px] leading-[1.72] text-[#5F6975] sm:text-[18px]">
            Keep customer details, conversations, pipeline status and next actions connected, so your team works from the same picture instead of piecing it together.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <SecondaryButton href="#crm-product">See the CRM</SecondaryButton>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#56616D] sm:text-[12px]">
            {["Unlimited users", "Unlimited contacts", "Guided Launch"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#2563FF]/10 text-[#2563FF]">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <CustomerWorkspace />
        </Reveal>
      </div>
    </section>
  );
}

function AppTopbar({ label }: { label: string }) {
  return (
    <div className="flex h-11 items-center justify-between border-b border-[#E7EBF0] bg-white px-4">
      <div className="flex items-center gap-2">
        <div className="grid h-6 w-6 place-items-center rounded-[7px] bg-[#2563FF]">
          <span className="h-[7px] w-[12px] -rotate-45 rounded-full bg-white" />
        </div>
        <span className="text-[11px] font-bold text-[#202833]">Zapla</span>
      </div>
      <span className="rounded-[7px] border border-[#E3E8EF] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.13em] text-[#7B8794]">
        {label}
      </span>
    </div>
  );
}

function CustomerWorkspace() {
  const conversations = [
    ["Mia Thompson", "Tuesday afternoon works. Can you send the quote?", true],
    ["Daniel Brooks", "Thanks, we will confirm tomorrow.", false],
    ["Priya Shah", "Can I move the booking to Friday?", false],
    ["Ben Lewis", "Received, thank you.", false],
  ];

  return (
    <div className="relative mx-auto max-w-[760px]">
      <div className="absolute -bottom-6 left-[7%] right-[3%] top-6 rounded-[18px] bg-[#2563FF]/[0.07]" />
      <div className="relative overflow-hidden rounded-[18px] border border-[#DDE4EC] bg-white shadow-[0_24px_64px_rgba(34,54,78,.12)]">
        <AppTopbar label="Unified inbox" />
        <div className="grid min-h-[500px] grid-cols-[190px_1fr] sm:grid-cols-[220px_1fr_205px]">
          <div className="border-r border-[#E7EBF0] bg-[#FBFCFD] p-3">
            <div className="flex items-center gap-2 rounded-[9px] border border-[#E3E8EF] bg-white px-3 py-2 text-[9px] text-[#8994A0]">
              <Search size={11} />
              Search conversations
            </div>
            <div className="mt-3 space-y-1.5">
              {conversations.map(([name, copy, active]) => (
                <div
                  key={name}
                  className={
                    "rounded-[9px] px-3 py-3 " +
                    (active ? "bg-[#EEF3FA]" : "bg-transparent")
                  }
                >
                  <div className="text-[10px] font-semibold text-[#26313B]">{name}</div>
                  <div className="mt-1 line-clamp-2 text-[8px] leading-[1.45] text-[#8A95A0]">{copy}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 flex-col bg-white">
            <div className="border-b border-[#E7EBF0] px-5 py-4">
              <div className="text-[12px] font-semibold text-[#26313B]">Mia Thompson</div>
              <div className="mt-0.5 text-[8px] text-[#94A0AC]">SMS · Hot water replacement</div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="ml-auto max-w-[82%] rounded-[12px] bg-[#F3F5F8] px-4 py-3 text-[9px] leading-[1.6] text-[#45515E]">
                  Hi Mia, your quote is ready. Would Tuesday afternoon suit you for the site visit?
                </div>
                <div className="mt-3 max-w-[84%] rounded-[12px] border border-[#DDE4EC] bg-white px-4 py-3 text-[9px] leading-[1.6] text-[#34404C] shadow-[0_5px_16px_rgba(34,54,78,.05)]">
                  Tuesday afternoon works. Can you send the quote?
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-[8px] font-semibold text-[#64717E]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2563FF]" />
                  Customer context stays attached
                </div>
                <div className="h-[58px] rounded-[11px] border border-[#DDE4EC] bg-[#FBFCFD] p-3 text-[9px] text-[#9AA5AF]">
                  Type a message...
                </div>
              </div>
            </div>
          </div>

          <div className="hidden border-l border-[#E7EBF0] bg-[#FBFCFD] p-4 sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#DDE7F7] text-[10px] font-bold text-[#4C6382]">
                MT
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#26313B]">Mia Thompson</div>
                <div className="text-[7px] uppercase tracking-[0.12em] text-[#9AA5AF]">Customer</div>
              </div>
            </div>
            <ProfileRow label="Owner" value="Ben Walker" />
            <ProfileRow label="Service" value="Hot water" />
            <ProfileRow label="Stage" value="Quote sent" />
            <ProfileRow label="Value" value="A$2,850" />
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["VIP", "Quote", "Residential"].map((tag) => (
                <span key={tag} className="rounded-[6px] bg-[#EAF0FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 border-b border-[#E5E9EF] pb-3">
      <div className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#9AA5AF]">{label}</div>
      <div className="mt-1 text-[9px] font-medium text-[#46515D]">{value}</div>
    </div>
  );
}

function OwnershipStrip() {
  const items = [
    ["Customer", "Details your team needs"],
    ["Conversation", "Every message in context"],
    ["Pipeline", "Current stage and ownership"],
    ["Action", "What needs to happen next"],
  ];

  return (
    <section className="border-b border-[#E7EBF0] bg-white px-5 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1280px] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([title, copy], index) => (
          <div
            key={title}
            className={
              "py-8 sm:px-6 lg:py-9 " +
              (index > 0 ? "border-t border-[#E7EBF0] sm:border-t-0 sm:border-l" : "")
            }
          >
            <div className="text-[12px] font-semibold text-[#1F2933]">{title}</div>
            <div className="mt-1.5 text-[11px] leading-[1.55] text-[#7A8590]">{copy}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomerRecords() {
  return (
    <section id="crm-product" className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="max-w-[610px]">
            <Eyebrow>Customer records</Eyebrow>
            <h2
              className="mt-4 text-[40px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[52px] lg:text-[60px]"
              style={{ fontFamily: DISPLAY }}
            >
              Use the customer details
              <span className="block text-[#2563FF]">your business actually needs.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-[560px] lg:justify-self-end">
            <p className="text-[15px] leading-[1.72] text-[#64707C] sm:text-[17px]">
              Keep standard contact information beside the fields, tags, owners and filters your team uses to organise real customer work.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <ContactsDemo />
        </Reveal>
      </div>
    </section>
  );
}

function ContactsDemo() {
  const rows = [
    ["Northside Plumbing", "Mia", "Thompson", "mia@example.com", "0412 555 018", "Ben", "Quote", "VIP"],
    ["Harbour Dental", "Sarah", "Lee", "sarah@example.com", "0422 333 011", "Jin", "Recall", "Patient"],
    ["Bright Spark", "Chris", "Moore", "chris@example.com", "0433 444 022", "Alex", "Lead", "Electrical"],
    ["Coastal Air", "Lena", "Parker", "lena@example.com", "0414 222 490", "Sam", "Contacted", "Service"],
  ];

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#DCE3EA] bg-white shadow-[0_22px_60px_rgba(37,54,75,.08)]">
      <AppTopbar label="Contacts" />
      <div className="grid lg:grid-cols-[1fr_310px]">
        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[15px] font-semibold text-[#202A34]">Contacts</div>
              <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9AA5AF]">All contacts</div>
            </div>
            <div className="flex gap-2">
              <div className="inline-flex h-9 items-center gap-2 rounded-[9px] border border-[#DFE5EB] bg-white px-3 text-[9px] font-semibold text-[#596571]">
                <Settings2 size={12} />
                Custom columns
              </div>
              <div className="inline-flex h-9 items-center gap-2 rounded-[9px] border border-[#CBD7E4] bg-[#F7FAFD] px-3 text-[9px] font-semibold text-[#2563FF]">
                <Filter size={12} />
                Filter
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <div className="min-w-[840px]">
              <div className="grid grid-cols-[1.35fr_.7fr_.8fr_1.35fr_1fr_.8fr_.75fr_.7fr] border-y border-[#E7EBF0] bg-[#FAFBFC] px-3 py-2 text-[8px] font-semibold text-[#56616D]">
                {["Company", "First", "Last", "Email", "Phone", "Owner", "Stage", "Tag"].map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
              {rows.map((row, rowIndex) => (
                <div
                  key={row[0]}
                  className={
                    "grid grid-cols-[1.35fr_.7fr_.8fr_1.35fr_1fr_.8fr_.75fr_.7fr] items-center border-b border-[#E7EBF0] px-3 py-3 text-[8.5px] text-[#44515E] " +
                    (rowIndex === 0 ? "bg-[#F5F8FF]" : "bg-white")
                  }
                >
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className={cellIndex === 0 ? "font-semibold text-[#26313B]" : ""}>
                      {cellIndex === 7 ? (
                        <span className="rounded-[6px] bg-[#EAF0FF] px-2 py-1 text-[7px] font-bold text-[#2563FF]">{cell}</span>
                      ) : (
                        cell
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E7EBF0] bg-[#FAFBFC] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#26313B]">
            <Filter size={14} className="text-[#2563FF]" />
            Filter customers
          </div>
          <p className="mt-1 text-[9px] leading-[1.55] text-[#8994A0]">
            Refine a segment using the information already stored in the CRM.
          </p>

          <div className="mt-5 rounded-[11px] border border-[#DDE4EC] bg-white p-3">
            <div className="text-[8px] font-semibold text-[#596571]">Field</div>
            <div className="mt-1.5 flex h-9 items-center justify-between rounded-[8px] border border-[#E0E6EC] px-3 text-[9px] text-[#34404C]">
              Stage
              <ChevronDown size={12} />
            </div>
            <div className="mt-3 text-[8px] font-semibold text-[#596571]">Operator</div>
            <div className="mt-1.5 flex h-9 items-center justify-between rounded-[8px] border border-[#E0E6EC] px-3 text-[9px] text-[#34404C]">
              Is
              <ChevronDown size={12} />
            </div>
            <div className="mt-3 text-[8px] font-semibold text-[#596571]">Value</div>
            <div className="mt-1.5 flex h-9 items-center rounded-[8px] border border-[#BFD0FF] bg-[#F5F8FF] px-3 text-[9px] font-semibold text-[#2563FF]">
              Quote sent
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[8px] font-semibold text-[#5A6672]">
            <span className="h-2 w-2 rounded-full bg-[#2563FF]" />
            1 customer matches
          </div>
        </div>
      </div>
    </div>
  );
}

function UnifiedInbox() {
  return (
    <section className="border-y border-[#E5E9EF] bg-[#F4F7FA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <Reveal className="max-w-[470px]">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#D7E0EA] bg-white text-[#2563FF]">
            <MessageSquare size={17} />
          </div>
          <h2
            className="mt-5 text-[38px] font-medium leading-[1] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            Read the conversation
            <span className="block text-[#2563FF]">with the customer beside it.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[1.72] text-[#65717D] sm:text-[17px]">
            The unified inbox keeps messages and customer context together, so whoever replies can see who they are dealing with and what is already known.
          </p>
          <div className="mt-6 space-y-3 text-[12px] font-medium text-[#46525F]">
            {["Conversation thread", "Customer profile", "Owner, tags and contact details"].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2563FF]/10 text-[#2563FF]">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <InboxProof />
        </Reveal>
      </div>
    </section>
  );
}

function InboxProof() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#D9E2EA] bg-white shadow-[0_20px_56px_rgba(37,54,75,.09)]">
      <AppTopbar label="Messages" />
      <div className="grid min-h-[440px] grid-cols-[200px_1fr_190px]">
        <div className="border-r border-[#E7EBF0] bg-[#FBFCFD] p-3">
          {["Mia Thompson", "SMS Contact", "John Smith", "Priya Shah"].map((name, index) => (
            <div
              key={name}
              className={"mb-1.5 rounded-[9px] px-3 py-3 " + (index === 0 ? "bg-[#EEF3FA]" : "")}
            >
              <div className="text-[9px] font-semibold text-[#293440]">{name}</div>
              <div className="mt-1 text-[7px] text-[#98A3AE]">
                {index === 0 ? "Tuesday afternoon works..." : "Recent customer message..."}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between p-5">
          <div>
            <div className="max-w-[90%] rounded-[11px] border border-[#DDE4EC] bg-[#F7F8FA] px-4 py-3 text-[9px] leading-[1.6] text-[#44515E]">
              Hi Andrew, your last service was in October. Would you like us to book the next appointment?
            </div>
            <div className="mt-3 ml-auto max-w-[82%] rounded-[11px] bg-[#EEF3FF] px-4 py-3 text-[9px] leading-[1.6] text-[#344B78]">
              Yes, Tuesday afternoon would be great.
            </div>
          </div>
          <div className="rounded-[10px] border border-[#DDE4EC] bg-[#FBFCFD] px-4 py-4 text-[9px] text-[#9AA5AF]">
            Type a message...
          </div>
        </div>
        <div className="border-l border-[#E7EBF0] bg-[#FBFCFD] p-4">
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9BA6B0]">Profile</div>
          <div className="mt-3 text-[11px] font-semibold text-[#26313B]">Mia Thompson</div>
          {[
            ["Owner", "Ben Walker"],
            ["Department", "Sales"],
            ["Tag", "VIP"],
            ["Language", "English"],
          ].map(([label, value]) => (
            <div key={label} className="mt-3 rounded-[8px] border border-[#E0E5EA] bg-white px-3 py-2.5">
              <div className="text-[7px] font-semibold text-[#9AA5AF]">{label}</div>
              <div className="mt-0.5 text-[8px] font-medium text-[#4D5965]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pipeline() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal className="max-w-[620px]">
            <h2
              className="text-[38px] font-medium leading-[0.99] tracking-[-0.052em] sm:text-[50px] lg:text-[58px]"
              style={{ fontFamily: DISPLAY }}
            >
              See every opportunity
              <span className="block text-[#2563FF]">by stage, owner and value.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-[530px] lg:justify-self-end">
            <p className="text-[15px] leading-[1.72] text-[#66727E] sm:text-[17px]">
              Pipelines make the current state visible without forcing everyone to ask around, chase a spreadsheet or reconstruct the history first.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <PipelineProof />
        </Reveal>
      </div>
    </section>
  );
}

function PipelineProof() {
  const stages = [
    {
      name: "New enquiry",
      items: [
        ["Alex Chen", "Electrical quote", "A$1,450", "12 min"],
        ["Lena Parker", "Air con service", "A$780", "41 min"],
      ],
    },
    {
      name: "Qualified",
      items: [
        ["Sam Nguyen", "Switchboard upgrade", "A$3,200", "Today"],
        ["Ivy Harris", "Solar inspection", "A$950", "Today"],
      ],
    },
    {
      name: "Quote sent",
      items: [
        ["Mia Thompson", "Hot water replacement", "A$2,850", "2 days"],
        ["Chris Moore", "Bathroom electrical", "A$1,900", "6 days"],
      ],
    },
    {
      name: "Booked",
      items: [
        ["Priya Shah", "Safety inspection", "A$520", "Tue"],
        ["Ben Lewis", "EV charger", "A$2,250", "Thu"],
      ],
    },
  ];

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#DCE3EA] bg-[#F5F7F9] p-3 shadow-[0_22px_62px_rgba(37,54,75,.08)] sm:p-4">
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <div className="text-[14px] font-semibold text-[#26313B]">Sales Pipeline</div>
          <div className="mt-1 text-[8px] uppercase tracking-[0.13em] text-[#99A4AE]">Customer opportunities</div>
        </div>
        <div className="hidden gap-2 sm:flex">
          <span className="rounded-[8px] border border-[#DDE4EA] bg-white px-3 py-2 text-[8px] font-semibold text-[#5E6A76]">Filter</span>
          <span className="rounded-[8px] bg-[#1E2B29] px-3 py-2 text-[8px] font-semibold text-white">+ Add item</span>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage, stageIndex) => (
          <div key={stage.name} className="rounded-[12px] border border-[#DCE3EA] bg-[#F9FAFB] p-2.5">
            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#596571]">{stage.name}</span>
              <span className="text-[8px] font-semibold text-[#9AA5AF]">2</span>
            </div>
            <div className="mt-2 space-y-2">
              {stage.items.map(([name, service, value, age], itemIndex) => (
                <motion.div
                  key={name}
                  initial={false}
                  whileInView={
                    stageIndex === 2 && itemIndex === 0
                      ? { borderColor: ["#DCE3EA", "#9CB7FF", "#DCE3EA"] }
                      : undefined
                  }
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.5, delay: 0.15, ease: "easeInOut" }}
                  className={
                    "rounded-[10px] border bg-white p-3 " +
                    (stageIndex === 2 && itemIndex === 1 ? "border-[#E4B7AA]" : "border-[#DCE3EA]")
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[9px] font-semibold text-[#2A3540]">{name}</div>
                      <div className="mt-1 text-[7px] text-[#9AA5AF]">{service}</div>
                    </div>
                    {stageIndex === 2 && itemIndex === 1 ? (
                      <span className="rounded-[5px] bg-[#FCE9E3] px-1.5 py-1 text-[6px] font-bold uppercase tracking-[0.08em] text-[#B76750]">
                        Stale
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#EDF0F3] pt-2 text-[7px]">
                    <span className="font-semibold text-[#65717D]">{value}</span>
                    <span className={stageIndex === 2 && itemIndex === 1 ? "font-semibold text-[#B76750]" : "text-[#9AA5AF]"}>
                      {age}
                    </span>
                  </div>
                </motion.div>
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
    <section className="relative overflow-hidden bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-8%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[#2563FF]/10 blur-[110px]" />
      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.02fr_.98fr]">
          <Reveal className="max-w-[720px]">
            <Eyebrow dark>From record to action</Eyebrow>
            <h2
              className="mt-4 text-[40px] font-medium leading-[0.97] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]"
              style={{ fontFamily: DISPLAY }}
            >
              What changes in the CRM
              <span className="block text-[#8EACFF]">can trigger what happens next.</span>
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] lg:justify-self-end">
            <p className="text-[15px] leading-[1.72] text-white/58 sm:text-[17px]">
              Customer events, stages and timing can start the agreed workflow, so the CRM does more than store what already happened.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <Reveal>
            <div className="h-full rounded-[15px] border border-white/10 bg-white/[0.035] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/46">
                <Workflow size={13} className="text-[#8EACFF]" />
                Trigger library
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ["Pipeline stage changed", "Customer moves to a new stage"],
                  ["Tag changed", "Customer enters a useful segment"],
                  ["Inbound SMS", "Customer starts a conversation"],
                  ["Contact created", "A new record enters the CRM"],
                  ["Invoice paid", "Payment state changes"],
                ].map(([title, copy], index) => (
                  <motion.div
                    key={title}
                    initial={reduced ? false : { opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.06 * index, ease: EASE }}
                    className="rounded-[10px] border border-white/8 bg-white/[0.035] px-4 py-3"
                  >
                    <div className="text-[11px] font-semibold text-white/88">{title}</div>
                    <div className="mt-1 text-[8px] leading-[1.45] text-white/40">{copy}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <WorkflowCanvas />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WorkflowCanvas() {
  return (
    <div className="relative min-h-[430px] overflow-hidden rounded-[15px] border border-white/10 bg-[#F8FAFC] p-5 text-[#111318] sm:p-7">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(83,104,128,.20) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex h-full min-h-[370px] flex-col justify-center gap-4 sm:grid sm:grid-cols-[1fr_40px_1fr_40px_1fr] sm:items-center">
        <FlowNode
          eyebrow="Trigger"
          title="Pipeline stage changed"
          copy="Quote sent"
          tone="blue"
        />
        <FlowConnector />
        <FlowNode
          eyebrow="Condition"
          title="No reply after 2 days"
          copy="Customer still in Quote sent"
          tone="slate"
        />
        <FlowConnector />
        <FlowNode
          eyebrow="Action"
          title="Start follow-up"
          copy="Send the agreed message"
          tone="green"
        />
      </div>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="hidden items-center sm:flex">
      <span className="h-px flex-1 bg-[#B9C5D2]" />
      <span className="-ml-px h-2 w-2 rotate-45 border-r border-t border-[#9BA9B7]" />
    </div>
  );
}

function FlowNode({
  eyebrow,
  title,
  copy,
  tone,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  tone: "blue" | "slate" | "green";
}) {
  const tones = {
    blue: "border-[#C9D7FF] bg-[#F0F4FF] text-[#2563FF]",
    slate: "border-[#D8E0E8] bg-white text-[#667787]",
    green: "border-[#D4DFC7] bg-[#F3F7EC] text-[#687D4C]",
  };

  return (
    <div className={"relative z-10 rounded-[12px] border p-4 shadow-[0_10px_26px_rgba(37,54,75,.07)] " + tones[tone]}>
      <div className="text-[8px] font-bold uppercase tracking-[0.14em]">{eyebrow}</div>
      <div className="mt-4 text-[13px] font-semibold text-[#26313B]">{title}</div>
      <div className="mt-1 text-[9px] leading-[1.5] text-[#7B8794]">{copy}</div>
    </div>
  );
}

function Customise() {
  const rows = [
    {
      icon: Database,
      title: "Fields",
      copy: "Store the information your team needs on the customer record.",
      proof: "Contact fields",
    },
    {
      icon: Tag,
      title: "Tags",
      copy: "Mark useful customer states, categories and audiences.",
      proof: "Tags",
    },
    {
      icon: Filter,
      title: "Filters",
      copy: "Build working segments from the information already in the CRM.",
      proof: "Smart lists",
    },
    {
      icon: Columns3,
      title: "Pipelines",
      copy: "Reflect the stages and ownership that match your process.",
      proof: "Pipeline fields",
    },
    {
      icon: Settings2,
      title: "Dashboard",
      copy: "Surface the measures your team needs to watch.",
      proof: "Customisable",
    },
  ];

  return (
    <section className="bg-[#F7F9FB] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[720px]">
          <h2
            className="text-[40px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[52px] lg:text-[60px]"
            style={{ fontFamily: DISPLAY }}
          >
            Make the CRM fit the business.
          </h2>
          <p className="mt-5 max-w-[650px] text-[15px] leading-[1.72] text-[#65717D] sm:text-[17px]">
            The structure is configurable, so your customer data does not have to be forced into a one-size-fits-all view.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="border-y border-[#DCE3EA]">
            {rows.map((row, index) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.title}
                  className={
                    "grid items-center gap-4 py-5 sm:grid-cols-[190px_1fr_170px] sm:gap-8 sm:py-6 " +
                    (index > 0 ? "border-t border-[#DCE3EA]" : "")
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-[9px] border border-[#D9E2EA] bg-white text-[#2563FF]">
                      <Icon size={15} />
                    </span>
                    <span className="text-[13px] font-semibold text-[#26313B]">{row.title}</span>
                  </div>
                  <p className="text-[12px] leading-[1.65] text-[#697581]">{row.copy}</p>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8A96A2] sm:text-right">{row.proof}</div>
                </div>
              );
            })}
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
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="max-w-[690px]">
          <Eyebrow>The commercial difference</Eyebrow>
          <h2
            className="mt-4 text-[40px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[52px] lg:text-[60px]"
            style={{ fontFamily: DISPLAY }}
          >
            The CRM should work for more people
            <span className="block text-[#2563FF]">without costing more for each one.</span>
          </h2>
        </Reveal>

        <div className="mt-12 border-y border-[#DCE3EA]">
          {rows.map((row, index) => {
            const Icon = row.icon;
            return (
              <Reveal key={row.metric} delay={index * 0.03}>
                <div className={"grid gap-5 py-7 lg:grid-cols-[0.78fr_.7fr_1.12fr] lg:items-center lg:gap-10 lg:py-8 " + (index > 0 ? "border-t border-[#DCE3EA]" : "")}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-[9px] bg-[#EEF3FF] text-[#2563FF]">
                      <Icon size={17} />
                    </span>
                    <span className="text-[14px] font-semibold text-[#26313B]">{row.title}</span>
                  </div>
                  <div
                    className="text-[28px] font-medium tracking-[-0.045em] text-[#111318] sm:text-[32px]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {row.metric}
                  </div>
                  <p className="max-w-[530px] text-[12px] leading-[1.68] text-[#687480]">{row.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-7">
          <a href={PRICING_URL} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#2563FF]">
            See Zapla pricing <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-[#E5E9EF] bg-[#F7F9FB] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <Reveal className="max-w-[380px]">
          <Eyebrow>Questions</Eyebrow>
          <h2
            className="mt-4 text-[38px] font-medium leading-[1] tracking-[-0.05em] sm:text-[48px]"
            style={{ fontFamily: DISPLAY }}
          >
            The practical questions before you move CRM.
          </h2>
        </Reveal>

        <div className="border-t border-[#D8E0E8]">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={index * 0.02}>
                <div className="border-b border-[#D8E0E8]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[13px] font-semibold text-[#26313B] sm:text-[14px]">{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={"shrink-0 text-[#66727E] transition-transform " + (isOpen ? "rotate-180" : "")}
                    />
                  </button>
                  {isOpen ? (
                    <p className="max-w-[720px] pb-5 pr-8 text-[12px] leading-[1.72] text-[#6B7782] sm:text-[13px]">
                      {item.a}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <Reveal className="mx-auto max-w-[1080px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-[760px]">
            <Eyebrow dark>See it around your business</Eyebrow>
            <h2
              className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[56px] lg:text-[64px]"
              style={{ fontFamily: DISPLAY }}
            >
              See how Zapla would fit the way your team manages customers.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[50px] items-center rounded-[10px] border border-white/20 px-6 text-[13px] font-semibold text-white"
            >
              View pricing
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
