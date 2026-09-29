import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  Filter,
  Inbox,
  Mail,
  MessageSquareText,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
  Tags,
  Users,
  Zap,
} from "lucide-react";
import { DominoFooter } from "@/components/DominoFooter";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/crm")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "CRM for Service Businesses | Zapla" },
      {
        name: "description",
        content:
          "See every customer, conversation, pipeline stage and next step in one CRM your whole team can use.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CrmPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";

const FAQS = [
  {
    q: "Can you import our existing contacts?",
    a: "Yes. Guided Launch can include importing clean contact data and mapping the agreed fields into Zapla.",
  },
  {
    q: "Can we customise our pipeline?",
    a: "Yes. Pipeline stages can be configured around how your business actually moves enquiries, quotes and customers through the process.",
  },
  {
    q: "Are users and contacts unlimited?",
    a: "Yes. Zapla includes unlimited users and unlimited contacts, subject to the platform's fair-use terms.",
  },
  {
    q: "Can we filter, tag and segment contacts?",
    a: "Yes. Contacts can be organised with fields, tags, smart lists and filters so the team can work with the right group of customers.",
  },
  {
    q: "Does the CRM include email and SMS conversations?",
    a: "Zapla includes a unified inbox for customer conversations, with profile context alongside the thread.",
  },
  {
    q: "Can the CRM trigger automations?",
    a: "Yes. Customer events, pipeline stages, messages, tags and other triggers can start agreed workflows for follow-up, reviews, reactivation and other processes.",
  },
  {
    q: "What is Guided Launch?",
    a: "Guided Launch is the implementation layer. We help configure the agreed workspace, pipelines, connected channels, forms, calendars, automations, training and go-live.",
  },
] as const;

function CrmPage() {
  return (
    <main
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <ProblemStrip />
      <ContactsSection />
      <PipelineSection />
      <InboxSection />
      <AutomationSection />
      <TeamSection />
      <GuidedLaunchSection />
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
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={
        "text-[10px] font-semibold uppercase tracking-[0.2em] " +
        (light ? "text-[#99B6FF]" : "text-[#2563FF]")
      }
    >
      {children}
    </p>
  );
}

function Avatar({
  cell = 0,
  size = 42,
  className = "",
}: {
  cell?: number;
  size?: number;
  className?: string;
}) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);

  return (
    <span
      aria-hidden="true"
      className={"block shrink-0 overflow-hidden rounded-full border border-white/80 bg-[#E9EEF4] " + className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition: `${(column / 5) * 100}% ${(row / 3) * 100}%`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F4F8FD] px-5 pb-20 pt-[112px] sm:px-10 sm:pb-24 sm:pt-[126px] lg:px-16 lg:pb-28 lg:pt-[138px]">
      <div className="pointer-events-none absolute right-[-140px] top-[20px] h-[520px] w-[520px] rounded-full bg-[#2563FF]/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-180px] left-[18%] h-[380px] w-[380px] rounded-full bg-[#94B5FF]/[0.12] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1460px] items-center gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-14">
        <Reveal className="max-w-[690px]">
          <Eyebrow>Zapla CRM</Eyebrow>
          <h1
            className="mt-4 text-[52px] font-medium leading-[0.91] tracking-[-0.064em] sm:text-[70px] lg:text-[86px]"
            style={{ fontFamily: DISPLAY }}
          >
            Every customer.
            <span className="block">Every conversation.</span>
            <span className="block text-[#2563FF]">Every next step.</span>
          </h1>

          <p className="mt-6 max-w-[630px] text-[16px] leading-[1.72] text-[#5D6873] sm:text-[18px]">
            See who came in, what happened, where things stand and what needs to happen next.
            One CRM the whole team can use.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#product-proof"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CBD7E2] bg-white px-6 text-[13px] font-semibold text-[#111318] shadow-[0_8px_24px_rgba(31,49,68,.04)]"
            >
              See the CRM
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-semibold text-[#5B6874]">
            {["Unlimited users", "Unlimited contacts", "Guided Launch"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#2563FF]/10 text-[#2563FF]">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <HeroProduct />
        </Reveal>
      </div>
    </section>
  );
}

function HeroProduct() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="absolute -inset-5 rounded-[42px] bg-[#DDE9F6]" />

      <div className="relative overflow-hidden rounded-[28px] border border-[#D5E0E9] bg-white shadow-[0_34px_90px_rgba(31,49,68,.14)]">
        <AppTopbar label="Pipelines" />
        <div className="grid grid-cols-[84px_1fr] sm:grid-cols-[110px_1fr]">
          <MiniSidebar active="Pipelines" />
          <div className="bg-[#F6F7F8] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-[16px] font-semibold text-[#242E36]">Sales Pipeline</div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#8D98A1]">Customer opportunities</div>
              </div>
              <button className="rounded-[8px] bg-[#C8B795] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#26231E]">
                + Add item
              </button>
            </div>

            <div className="grid min-w-[560px] grid-cols-4 gap-2">
              {[
                ["Lead", "#426D17"],
                ["Contacted", "#C7440B"],
                ["Proposal", "#D09100"],
                ["Negotiation", "#1593AD"],
              ].map(([label, tone], col) => (
                <div key={label} className="overflow-hidden rounded-[12px] border border-[#D9DFE5] bg-white">
                  <div className="px-3 py-2 text-[8px] font-bold text-white" style={{ backgroundColor: tone }}>
                    {label}
                  </div>
                  <div className="min-h-[190px] p-2">
                    {col === 0 ? (
                      <div className="rounded-[10px] border border-[#DDE4E9] bg-white p-3 shadow-[0_6px_16px_rgba(31,49,68,.04)]">
                        <div className="text-[10px] font-semibold text-[#2E3942]">Mia Thompson</div>
                        <div className="mt-1 text-[8px] text-[#8D98A1]">Hot water replacement</div>
                        <div className="mt-5 flex items-center justify-between border-t border-[#EDF1F4] pt-2">
                          <span className="text-[9px] font-semibold text-[#4D5963]">A$2,850</span>
                          <span className="text-[7px] text-[#99A3AB]">Today</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-[8px] font-semibold uppercase tracking-[0.12em] text-[#C0C7CD]">
                        Drop here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-8 -left-5 hidden w-[260px] rounded-[18px] border border-[#D6E0E8] bg-white p-4 shadow-[0_18px_46px_rgba(31,49,68,.11)] sm:block">
        <div className="flex items-center gap-3">
          <Avatar cell={0} size={38} />
          <div>
            <div className="text-[11px] font-semibold text-[#2E3942]">Mia Thompson</div>
            <div className="mt-0.5 text-[8px] text-[#8A959E]">Last activity 10:41 AM</div>
          </div>
        </div>
        <div className="mt-3 rounded-[10px] bg-[#EEF4FF] px-3 py-2 text-[9px] font-semibold text-[#355CBB]">
          Next step · Follow up Thursday
        </div>
      </div>
    </div>
  );
}

function AppTopbar({ label }: { label: string }) {
  return (
    <div className="flex h-[42px] items-center justify-between border-b border-[#E4E8EC] bg-white px-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[#2563FF]">
          <ZaplaPetal size={16} />
        </span>
        <span className="text-[10px] font-bold text-[#20262B]">Zapla</span>
      </div>
      <span className="rounded-[7px] border border-[#E0E5E9] px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.11em] text-[#5D6872]">
        {label}
      </span>
    </div>
  );
}

function MiniSidebar({ active }: { active: string }) {
  const items = ["Dashboard", "Messages", "Contacts", "Pipelines", "Forms", "Automations"];
  return (
    <div className="border-r border-[#E3E8EC] bg-white px-2 py-3">
      <div className="mb-3 rounded-[8px] bg-[#E8F0FA] px-2 py-2 text-[7px] font-bold text-[#50606D]">Zapla AU1</div>
      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item}
            className={
              "rounded-[7px] px-2 py-2 text-[7px] font-semibold " +
              (item === active ? "bg-[#252525] text-white" : "text-[#66727C]")
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemStrip() {
  const questions = [
    "Did anyone call them back?",
    "Has the quote been sent?",
    "Who owns this customer?",
    "What happens next?",
  ];

  return (
    <section className="bg-[#101820] px-5 py-16 text-white sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[830px]">
          <Eyebrow light>The problem</Eyebrow>
          <h2
            className="mt-4 text-[39px] font-medium leading-[0.97] tracking-[-0.054em] sm:text-[50px] lg:text-[58px]"
            style={{ fontFamily: DISPLAY }}
          >
            When customer information is scattered,
            <span className="block text-[#8DB0FF]">the team starts asking around.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {questions.map((q, index) => (
            <Reveal key={q} delay={index * 0.04}>
              <div className="min-h-[130px] border-b border-white/10 px-0 py-6 sm:border-r sm:px-5 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0">
                <div className="text-[9px] font-bold tracking-[0.14em] text-white/25">0{index + 1}</div>
                <div className="mt-5 text-[17px] font-semibold text-white/86">{q}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section id="product-proof" className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-end lg:gap-14">
          <Reveal>
            <Eyebrow>Customer data</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.057em] sm:text-[58px] lg:text-[66px]"
              style={{ fontFamily: DISPLAY }}
            >
              Keep the customer details
              <span className="block text-[#2563FF]">your team actually uses.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="max-w-[660px] text-[15px] leading-[1.72] text-[#606C76] sm:text-[16px] lg:ml-auto">
              Contacts can carry the fields, tags, owners and filters your team needs without forcing the database into a one-size-fits-all view.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <Reveal>
            <ContactsTable />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-[26px] bg-[#2563FF] p-7 text-white">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">Included</div>
                <div
                  className="mt-3 text-[46px] font-medium leading-none tracking-[-0.06em]"
                  style={{ fontFamily: DISPLAY }}
                >
                  Unlimited
                </div>
                <div className="mt-2 text-[18px] font-semibold">contacts</div>
                <p className="mt-5 text-[12px] leading-[1.65] text-white/68">
                  Keep the database in one place without a contact-count upgrade becoming the reason you stop adding people.
                </p>
              </div>

              <div className="flex-1 rounded-[26px] border border-[#D9E2E9] bg-[#F5F8FA] p-6">
                <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7D8993]">
                  <SlidersHorizontal size={13} className="text-[#2563FF]" />
                  Work the database your way
                </div>
                <div className="mt-5 space-y-3">
                  {[
                    [<Filter size={14} key="f" />, "Filters"],
                    [<Tags size={14} key="t" />, "Tags"],
                    [<Users size={14} key="u" />, "Owners"],
                    [<FileText size={14} key="c" />, "Custom fields"],
                  ].map(([icon, label]) => (
                    <div key={String(label)} className="flex items-center gap-3 rounded-[13px] bg-white px-4 py-3 text-[11px] font-semibold text-[#4E5A64] shadow-[0_7px_18px_rgba(31,49,68,.04)]">
                      <span className="text-[#2563FF]">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactsTable() {
  const rows = [
    ["J.S Pty Ltd", "John", "Smith", "test@gmail.com", "0410718086", "VIP"],
    ["Northside Co", "Mia", "Thompson", "mia@example.com", "0412555018", "Quote"],
    ["Harbour Dental", "Sarah", "Lee", "sarah@example.com", "0422333011", "Recall"],
    ["Bright Spark", "Chris", "Moore", "chris@example.com", "0433444022", "Lead"],
  ];

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#D8E1E8] bg-[#F8FAFB] shadow-[0_24px_58px_rgba(31,49,68,.07)]">
      <AppTopbar label="Contacts" />
      <div className="grid grid-cols-[94px_1fr] sm:grid-cols-[118px_1fr]">
        <MiniSidebar active="Contacts" />
        <div className="min-w-0 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[17px] font-semibold text-[#242E36]">Contacts</div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-[#8D98A1]">All contacts</div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-[8px] border border-[#DDE3E8] bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#58646E]">
                Filter
              </button>
              <button className="rounded-[8px] bg-[#C8B795] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#26231E]">
                New contact
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E1E6EA] bg-white">
            <div className="grid min-w-[720px] grid-cols-[1.1fr_.8fr_.8fr_1.35fr_1fr_.7fr] bg-[#F5F7F8] px-3 py-2 text-[7px] font-bold uppercase tracking-[0.11em] text-[#7E8992]">
              <span>Company</span>
              <span>First</span>
              <span>Last</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Tag</span>
            </div>
            {rows.map((r) => (
              <div key={r[1]} className="grid min-w-[720px] grid-cols-[1.1fr_.8fr_.8fr_1.35fr_1fr_.7fr] border-t border-[#EDF1F4] px-3 py-3 text-[8.5px] font-medium text-[#4A5660]">
                {r.map((v, i) =>
                  i === 5 ? (
                    <span key={v}>
                      <span className="rounded-full bg-[#2563FF]/10 px-2 py-1 text-[7px] font-bold text-[#2563FF]">{v}</span>
                    </span>
                  ) : (
                    <span key={v}>{v}</span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineSection() {
  return (
    <section className="bg-[#EEF3F8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <Reveal>
            <Eyebrow>Pipeline</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              See what&apos;s moving.
              <span className="block text-[#2563FF]">And what&apos;s stuck.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="max-w-[650px] text-[15px] leading-[1.72] text-[#5F6B75] sm:text-[16px] lg:ml-auto">
              Track opportunities by stage, owner and value. When something has been sitting too long, the team can see it before it disappears into memory.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <PipelineBoard />
        </Reveal>
      </div>
    </section>
  );
}

function PipelineBoard() {
  const cols = [
    { name: "Lead", tone: "#426D17", cards: [["Mia Thompson", "Hot water", "A$2,850"], ["Alex Chen", "Electrical", "A$1,450"]] },
    { name: "Contacted", tone: "#C7440B", cards: [["Lena Parker", "Air con", "A$780"]] },
    { name: "Proposal", tone: "#D09100", cards: [["Chris Moore", "Bathroom", "A$1,900"]] },
    { name: "Negotiation", tone: "#1593AD", cards: [["Priya Shah", "Safety inspection", "A$520"]] },
    { name: "Closed Won", tone: "#198744", cards: [["Ben Lewis", "EV charger", "A$2,250"]] },
  ];

  return (
    <div className="overflow-x-auto rounded-[30px] border border-[#D3DEE7] bg-[#F7F9FA] p-4 shadow-[0_28px_70px_rgba(31,49,68,.08)] sm:p-5">
      <div className="mb-4 flex min-w-[1040px] items-center justify-between">
        <div className="text-[18px] font-semibold text-[#242E36]">Sales Pipeline</div>
        <div className="flex items-center gap-2">
          <span className="rounded-[8px] border border-[#DDE4E9] bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#5D6872]">Filter</span>
          <span className="rounded-[8px] bg-[#C8B795] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#26231E]">+ Add item</span>
        </div>
      </div>

      <div className="grid min-w-[1040px] grid-cols-5 gap-3">
        {cols.map((col, index) => (
          <div key={col.name} className="overflow-hidden rounded-[16px] border border-[#DCE3E8] bg-white">
            <div className="px-3 py-2 text-[9px] font-bold text-white" style={{ backgroundColor: col.tone }}>
              {col.name}
            </div>
            <div className="min-h-[260px] space-y-2 p-2">
              {col.cards.map(([name, service, value], cardIndex) => (
                <div key={name} className="rounded-[12px] border border-[#E1E6EA] bg-white p-3 shadow-[0_6px_16px_rgba(31,49,68,.04)]">
                  <div className="text-[10px] font-semibold text-[#303B44]">{name}</div>
                  <div className="mt-1 text-[8px] text-[#8C97A0]">{service}</div>
                  <div className="mt-5 flex items-center justify-between border-t border-[#EDF1F4] pt-2">
                    <span className="text-[9px] font-semibold text-[#4E5A63]">{value}</span>
                    {index === 2 && cardIndex === 0 ? (
                      <span className="rounded-full bg-[#D58C75]/15 px-2 py-1 text-[7px] font-bold text-[#A65F48]">6 days</span>
                    ) : (
                      <span className="text-[7px] text-[#A0A9B0]">Today</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="rounded-[10px] border border-dashed border-[#D9E0E5] px-3 py-3 text-center text-[7px] font-bold uppercase tracking-[0.1em] text-[#A5AEB5]">
                + Add pipeline item
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InboxSection() {
  return (
    <section className="bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:items-center lg:gap-14">
          <Reveal>
            <Eyebrow light>Unified inbox</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px] lg:text-[66px]"
              style={{ fontFamily: DISPLAY }}
            >
              The conversation stays
              <span className="block text-[#8DB0FF]">with the customer.</span>
            </h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
              Messages sit beside the customer profile so the person replying does not have to reconstruct the history first.
            </p>
            <div className="mt-8 space-y-3 text-[11px] font-semibold text-white/62">
              {["Conversation thread", "Customer profile", "Owner, tags and contact details"].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#8DB0FF]" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <UnifiedInbox />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UnifiedInbox() {
  const conversations = [
    ["SMS Contact", "Hi Andrew, your last dental check up..."],
    ["SMS Contact", "Jin: Kogan FIRST-val is here!"],
    ["SMS Contact", "MCA: Score D-MAX BLADE..."],
    ["SMS Contact", "Hey Andrew! How did you enjoy..."],
    ["John Smith", "testing"],
  ];

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#F5F6F7] text-[#111318] shadow-[0_32px_80px_rgba(0,0,0,.26)]">
      <AppTopbar label="Unified Inbox" />
      <div className="grid min-h-[470px] grid-cols-[0.38fr_0.62fr] lg:grid-cols-[0.32fr_0.46fr_0.22fr]">
        <div className="border-r border-[#DDE3E7] bg-white p-3">
          <div className="text-[15px] font-semibold">Messages</div>
          <div className="mt-3 rounded-[8px] border border-[#DDE3E7] px-3 py-2 text-[8px] text-[#9AA3AA]">Search conversations...</div>
          <div className="mt-3 space-y-1.5">
            {conversations.map(([name, preview], index) => (
              <div key={index} className={"rounded-[10px] p-2.5 " + (index === 0 ? "bg-[#ECEFF2]" : "")}>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECEEEF] text-[8px] font-bold text-[#737E87]">S</span>
                  <div className="min-w-0">
                    <div className="truncate text-[9px] font-semibold text-[#2D373F]">{name}</div>
                    <div className="mt-0.5 truncate text-[7px] text-[#9AA3AA]">{preview}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-r border-[#DDE3E7] bg-[#F5F6F7] p-4">
          <div className="rounded-[14px] border border-[#DDE3E7] bg-white p-4 text-[10px] leading-[1.65] text-[#303B44] shadow-[0_5px_12px_rgba(31,49,68,.03)]">
            Hi Andrew, your last dental check up was 17 Oct 2025. October is a great time to tick off your dental appointment before the silly season hits.
            <br /><br />
            Book now or call us. See you soon!
          </div>
          <div className="mt-2 text-[7px] text-[#9AA3AA]">29/09/2026 · 04:30</div>
          <div className="mt-auto pt-14">
            <div className="rounded-[12px] border border-[#CDD6DD] bg-white px-3 py-4 text-[8px] text-[#A0A8AF]">Type a message...</div>
          </div>
        </div>

        <div className="hidden bg-white p-3 lg:block">
          <div className="text-[10px] font-bold">Profile</div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ECEEEF] text-[9px] font-bold">SC</span>
            <div>
              <div className="text-[10px] font-semibold">SMS Contact</div>
              <div className="mt-1 text-[7px] uppercase tracking-[0.08em] text-[#A1A9B0]">No type</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[<Phone size={12} key="p" />, <FileText size={12} key="f" />, <Calendar size={12} key="c" />].map((icon, i) => (
              <span key={i} className="flex h-8 items-center justify-center rounded-[8px] border border-[#DDE3E7] text-[#2563FF]">{icon}</span>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {["Contact Owner", "Department", "Tags", "Emails", "Phone Numbers", "Addresses"].map((item) => (
              <div key={item} className="rounded-[8px] border border-[#E0E5E9] px-3 py-2 text-[7.5px] font-semibold text-[#46515A]">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AutomationSection() {
  const recipes = [
    {
      title: "Quote sent. No reply.",
      result: "Start the agreed follow-up.",
      icon: <Clock3 size={15} />,
    },
    {
      title: "Job completed.",
      result: "Send the review request.",
      icon: <MessageSquareText size={15} />,
    },
    {
      title: "Customer goes dormant.",
      result: "Move them into reactivation.",
      icon: <Zap size={15} />,
    },
  ];

  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-12 lg:grid-cols-[0.58fr_0.42fr] lg:items-center lg:gap-16">
          <Reveal>
            <AutomationCanvas />
          </Reveal>

          <Reveal delay={0.05}>
            <Eyebrow>From record to action</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.057em] sm:text-[58px] lg:text-[66px]"
              style={{ fontFamily: DISPLAY }}
            >
              What happens in the CRM can trigger
              <span className="block text-[#2563FF]">what happens next.</span>
            </h2>
            <p className="mt-5 max-w-[560px] text-[15px] leading-[1.72] text-[#606C76] sm:text-[16px]">
              Customer events, stages and timing can start the agreed workflow so follow-up does not depend on somebody remembering.
            </p>

            <div className="mt-8 space-y-3">
              {recipes.map((recipe) => (
                <div key={recipe.title} className="grid grid-cols-[38px_1fr] gap-3 rounded-[16px] border border-[#DFE6EC] bg-[#F8FAFB] p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563FF]/10 text-[#2563FF]">{recipe.icon}</span>
                  <div>
                    <div className="text-[11px] font-semibold text-[#36414A]">{recipe.title}</div>
                    <div className="mt-1 text-[10px] text-[#727E87]">{recipe.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AutomationCanvas() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[#D9E1E8] bg-[#F8F9FA] shadow-[0_26px_66px_rgba(31,49,68,.08)]">
      <AppTopbar label="Automation" />
      <div className="grid min-h-[520px] grid-cols-[170px_1fr] sm:grid-cols-[210px_1fr]">
        <div className="border-r border-[#DEE4E9] bg-white">
          <div className="grid grid-cols-3 border-b border-[#E3E8EC] text-center text-[7px] font-bold uppercase tracking-[0.09em] text-[#61707B]">
            <span className="border-b-2 border-[#F0A000] py-3 text-[#C27B00]">Triggers</span>
            <span className="py-3">Logic</span>
            <span className="py-3">Actions</span>
          </div>
          <div className="p-3">
            <div className="rounded-[8px] border border-[#CCD5DC] px-3 py-2 text-[7.5px] text-[#9BA4AB]">Search steps...</div>
            <div className="mt-4 text-[7px] font-bold uppercase tracking-[0.1em] text-[#A0A8AF]">Communications</div>
            <div className="mt-2 space-y-2">
              {["Inbound SMS", "Inbound Call", "Contact Created", "Tag Changed", "Invoice Paid"].map((item) => (
                <div key={item} className="rounded-[8px] border border-[#F3D7A6] bg-[#FFF5E6] px-3 py-2 text-[8px] font-semibold text-[#BC7900]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-white" style={{ backgroundImage: "radial-gradient(#DDE4E9 1px, transparent 1px)", backgroundSize: "18px 18px" }}>
          <div className="absolute left-[14%] top-[18%] w-[210px] rounded-[16px] border border-[#E1E6EA] bg-white p-4 shadow-[0_14px_36px_rgba(31,49,68,.08)]">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#B77A00]">Trigger</div>
            <div className="mt-2 text-[11px] font-semibold text-[#303B44]">Pipeline stage changed</div>
            <div className="mt-1 text-[8px] text-[#8A959E]">Stage → Quote sent</div>
          </div>
          <div className="absolute left-[36%] top-[47%] h-[58px] w-px bg-[#C9D5DE]" />
          <div className="absolute left-[29%] top-[58%] w-[250px] rounded-[16px] border border-[#D9E4F5] bg-[#F5F8FF] p-4 shadow-[0_14px_36px_rgba(31,49,68,.08)]">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">Action</div>
            <div className="mt-2 text-[11px] font-semibold text-[#303B44]">Wait 2 days</div>
            <div className="mt-1 text-[8px] text-[#8A959E]">Then send follow-up SMS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  const roles = [
    ["Owner", "See what is stuck", 2],
    ["Sales", "Work the pipeline", 7],
    ["Admin", "Keep records current", 11],
    ["Reception", "See the customer history", 14],
    ["Operations", "Know what is booked", 18],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#2563FF] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-110px] top-[-120px] h-[360px] w-[360px] rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Commercial advantage</p>
            <h2
              className="mt-4 text-[45px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[70px]"
              style={{ fontFamily: DISPLAY }}
            >
              The whole team can use it.
              <span className="block text-[#DDE7FF]">Unlimited users. Unlimited contacts.</span>
            </h2>
            <p className="mt-6 max-w-[650px] text-[15px] leading-[1.72] text-white/70 sm:text-[16px]">
              Sales, admin, reception, operations and management can work from the same customer information without a growing seat bill or a contact-count ceiling.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#174FD3] shadow-[0_28px_70px_rgba(13,43,108,.18)]">
              {roles.map(([role, task, cell]) => (
                <div key={role} className="grid grid-cols-[auto_.8fr_1.2fr] items-center gap-4 border-b border-white/10 px-5 py-4 last:border-b-0 sm:px-7">
                  <Avatar cell={cell} size={42} className="border-white/25" />
                  <div>
                    <div className="text-[12px] font-semibold">{role}</div>
                    <div className="mt-0.5 text-[8px] uppercase tracking-[0.1em] text-white/42">Team member</div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-medium text-white/72">{task}</span>
                    <Check size={13} className="shrink-0 text-[#DDE7FF]" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunchSection() {
  const steps = [
    ["01", "Bring the data", "Move the agreed contact data and core customer information."],
    ["02", "Map the process", "Configure the agreed pipelines, forms, calendars and stages."],
    ["03", "Connect the essentials", "Set up the agreed channels and workflows."],
    ["04", "Train and go live", "Test the setup with the team and launch."],
  ] as const;

  return (
    <section className="bg-[#EEF3F7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] bg-[#DCE6EE] shadow-[0_24px_60px_rgba(31,49,68,.08)]">
            <img
              src="/concept/guided-launch-natural-v6.webp"
              alt="Business team working together during setup"
              className="h-[380px] w-full object-cover sm:h-[500px]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <Eyebrow>Guided Launch</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[64px]"
            style={{ fontFamily: DISPLAY }}
          >
            Moving CRM should not become
            <span className="block text-[#2563FF]">another project for your team.</span>
          </h2>
          <p className="mt-5 max-w-[650px] text-[15px] leading-[1.72] text-[#5F6B75] sm:text-[16px]">
            Guided Launch helps configure the agreed essentials so your team is not dropped into a blank workspace and told to figure it out.
          </p>

          <div className="mt-8 border-y border-[#D4DEE6]">
            {steps.map(([n, title, copy]) => (
              <div key={n} className="grid grid-cols-[42px_1fr] gap-4 border-b border-[#D4DEE6] py-5 last:border-b-0">
                <span className="text-[9px] font-bold tracking-[0.14em] text-[#2563FF]">{n}</span>
                <div>
                  <div className="text-[14px] font-semibold text-[#303B44]">{title}</div>
                  <p className="mt-1 text-[11px] leading-[1.6] text-[#717D87]">{copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[48px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[12px] font-semibold text-white"
            >
              Book a Call <ArrowRight size={14} />
            </a>
            <a
              href={PRICING_URL}
              className="inline-flex h-[48px] items-center rounded-full border border-[#D1DAE2] bg-white px-6 text-[12px] font-semibold text-[#111318]"
            >
              View pricing
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1160px]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[56px]"
            style={{ fontFamily: DISPLAY }}
          >
            The questions before
            <span className="block text-[#2563FF]">you move the team over.</span>
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-[#D9E1E8] border-y border-[#D9E1E8]">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
      >
        <span className="text-[14px] font-semibold text-[#2E3942] sm:text-[16px]">{q}</span>
        <ChevronDown
          size={17}
          className={"shrink-0 text-[#2563FF] transition-transform " + (open ? "rotate-180" : "")}
        />
      </button>
      {open ? (
        <div className="max-w-[840px] pb-6 pr-10 text-[13.5px] leading-[1.75] text-[#65717B]">{a}</div>
      ) : null}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute right-[-120px] top-[-100px] h-[360px] w-[360px] rounded-full bg-[#2563FF]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1180px]">
        <Reveal className="max-w-[900px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8DB0FF]">CRM included in Zapla</p>
          <h2
            className="mt-4 text-[46px] font-medium leading-[0.95] tracking-[-0.06em] sm:text-[62px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            Know where every customer stands.
            <span className="block text-[#8DB0FF]">Know what happens next.</span>
          </h2>
          <p className="mt-5 max-w-[700px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
            CRM is included in both Zapla plans, with unlimited users and unlimited contacts.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-[#173A80]"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 text-[13px] font-semibold text-white"
          >
            View pricing
          </a>
        </Reveal>
      </div>
    </section>
  );
}
