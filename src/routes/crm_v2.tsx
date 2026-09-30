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
const ZAPLA_ICON_URL = "/__l5e/assets-v1/f4e55763-ff20-4d1a-8d1f-5461ade0724a/zapla-logo-blue.png";

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
    <div className={"text-[10px] font-semibold uppercase tracking-[0.22em] " + (dark ? "text-[#DDA34B]" : "text-[#58706F]")}>
      {children}
    </div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] shadow-[0_12px_28px_rgba(30,43,41,.14)] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#DDD5CA] bg-[#FCFCFA] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[120px] lg:px-16 lg:pb-24 lg:pt-[122px]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-[#E7D8C5]" />
      <div className="pointer-events-none absolute -left-[12%] top-[18%] h-[560px] w-[560px] rounded-full bg-[#DCE0CC]/22 blur-[160px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <Reveal className="mx-auto max-w-[930px] text-center">
          <Eyebrow>Zapla CRM</Eyebrow>

          <h1
            className="mx-auto mt-5 max-w-[900px] text-[40px] font-medium leading-[0.99] tracking-[-0.052em] text-[#111318] sm:text-[48px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            The CRM that keeps every customer,
            <span className="block text-[#2563FF]">conversation and next step connected.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[720px] text-[15px] font-medium leading-[1.7] text-[#5F655F] sm:text-[17px]">
            Customer records, messages, deal status and next actions stay together, so whoever picks up the work sees the full picture.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#crm-workbench"
              className="inline-flex h-[52px] items-center rounded-full border border-[#D8D0C5] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#C7BDAF]"
            >
              Explore the CRM
            </a>
          </div>

          <div className="mt-5 text-[11px] font-semibold text-[#6A6F6B] sm:text-[12px]">
            Unlimited users <span className="mx-2 text-[#B3B2AC]">·</span> Unlimited contacts <span className="mx-2 text-[#B3B2AC]">·</span> Guided Launch
          </div>
        </Reveal>

        <Reveal className="mt-10 sm:mt-12" delay={0.05}>
          <HeroStage />
        </Reveal>
      </div>
    </section>
  );
}

function HeroStage() {
  return (
    <div className="relative mx-auto max-w-[1240px]">
      <CustomerRecordHero />
    </div>
  );
}

function CustomerRecordHero() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-[#D4D9DE] bg-white shadow-[0_32px_80px_rgba(40,45,52,.16)]">
      <div className="flex min-h-12 items-center gap-5 overflow-hidden border-b border-[#E3E7EB] bg-[#FCFCFB] px-4 sm:px-5">
        {["Contacts", "Contact types", "Contact fields", "Tags", "Smart lists", "Quick actions"].map((item, index) => (
          <span key={item} className={"whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.12em] " + (index === 0 ? "text-[#111318]" : "hidden text-[#7A817D] md:inline")}>
            {item}
          </span>
        ))}
      </div>

      <div className="grid min-h-[520px] lg:grid-cols-[220px_minmax(0,1fr)_205px]">
        <div className="border-b border-[#E3E7EB] bg-[#F7F7F4] p-4 lg:border-b-0 lg:border-r">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6C746F]">Profile</div>

          <div className="mt-4 flex items-center gap-3">
            <Avatar cell={0} size={48} className="border-2 border-white shadow-[0_7px_18px_rgba(35,53,76,.12)]" />
            <div>
              <div className="text-[13px] font-semibold text-[#20252A]">Mia Thompson</div>
              <div className="mt-0.5 text-[8px] text-[#717873]">Northside Plumbing</div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {["Call", "Note", "Book"].map((label, index) => (
              <div key={label} className={"grid h-8 place-items-center rounded-[7px] border text-[7px] font-bold uppercase tracking-[0.08em] " + (index === 1 ? "border-[#1E2B29] bg-[#1E2B29] text-white" : "border-[#D8DDD9] bg-white text-[#59615C]")}>
                {label}
              </div>
            ))}
          </div>

          <div className="mt-4 divide-y divide-[#E2E5E2] border-y border-[#E2E5E2]">
            {[
              ["Contact owner", "Ben Walker"],
              ["Department", "Sales"],
              ["Tags", "VIP · Residential"],
              ["Email", "mia@northside.com"],
              ["Phone", "0412 555 018"],
              ["Language", "English"],
            ].map(([label, value]) => (
              <div key={label} className="py-2.5">
                <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#818984]">{label}</div>
                <div className="mt-1 text-[8px] font-medium text-[#414944]">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 bg-[#F8F9F8]">
          <div className="grid grid-cols-4 border-b border-[#E3E7EB] bg-white sm:grid-cols-7">
            {[
              ["Activity", true],["Messaging", false],["Notes", false],["Files", false],["Deals", false],["Tasks", false],["Jobs", false],
            ].map(([label, active], index) => (
              <div key={label as string} className={"relative flex h-11 items-center justify-center border-r border-[#EEF0F1] text-[7px] font-bold uppercase tracking-[0.11em] " + (active ? "text-[#111318]" : "text-[#808984] " + (index > 3 ? "hidden sm:flex" : ""))}>
                {label}
                {active ? <span className="absolute inset-x-4 bottom-0 h-[2px] bg-[#2563FF]" /> : null}
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-semibold text-[#20252A]">Recent activity</div>
                <div className="mt-1 text-[8px] text-[#68706B]">Everything around this customer, in order.</div>
              </div>
              <div className="inline-flex h-8 items-center gap-2 rounded-[7px] border border-[#D9DEDA] bg-white px-3 text-[8px] font-semibold text-[#535C56]">
                <Filter size={10} /> Filter
              </div>
            </div>

            <div className="relative mt-5">
              <div className="absolute bottom-2 left-[14px] top-2 w-px bg-[#D5DAD6]" />
              <ActivityItem marker="+" title="Opportunity created" meta="Today · 09:12" copy="Hot water replacement" detail="Stage: Lead · Value: A$2,850" active />
              <ActivityItem marker="✓" title="Quote sent" meta="Today · 09:24" copy="A$2,850 quote sent by SMS and email." detail="Owner: Ben Walker" />
              <ActivityItem marker="↗" title="Customer replied" meta="Today · 09:41" copy="Tuesday afternoon works. Can you send through the quote?" detail="SMS · Unified inbox" />
              <ActivityItem marker="→" title="Stage changed" meta="Today · 09:43" copy="Proposal moved to Quote sent." detail="Pipeline: Residential sales" />
              <ActivityItem marker="•" title="Next action scheduled" meta="In 2 days" copy="Follow up automatically if the customer has not replied." detail="Automation active" last />
            </div>
          </div>
        </div>

        <div className="hidden border-l border-[#E3E7EB] bg-[#FCFCFB] p-4 lg:block">
          <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6C746F]">Customer context</div>

          <div className="mt-4 space-y-2">
            <ContextCard label="Automation" value="Quote follow-up" sub="Active · waits 2 days" accent="blue" />
            <ContextCard label="Open deal" value="A$2,850" sub="Quote sent" accent="sage" />
            <ContextCard label="Task" value="Confirm site visit" sub="Due Tuesday" accent="oat" />
          </div>

          <div className="mt-5 border-t border-[#E4E7E4] pt-4">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#6C746F]">Also connected</div>
            <div className="mt-3 divide-y divide-[#E6E9E6] border-y border-[#E6E9E6]">
              {["Notes", "Files", "Invoices", "Payments", "Bookings"].map((item) => (
                <div key={item} className="flex items-center justify-between py-2.5">
                  <span className="text-[8px] font-semibold text-[#4D5650]">{item}</span>
                  <ChevronDown size={10} className="text-[#9AA29D]" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-[#D9D1C5] pt-4">
            <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#58706F]">One record</div>
            <div className="mt-1 text-[9px] font-semibold leading-[1.45] text-[#343B37]">Profile, conversation, deal, task and automation stay attached to the same customer.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({
  marker,title,meta,copy,detail,active=false,last=false,
}: {
  marker:string; title:string; meta:string; copy:string; detail:string; active?:boolean; last?:boolean;
}) {
  return (
    <div className={"relative pl-10 " + (last ? "pb-0" : "pb-3")}>
      <div className={"absolute left-0 top-1 z-10 grid h-7 w-7 place-items-center rounded-full text-[8px] font-bold " + (active ? "bg-[#2563FF] text-white" : "bg-[#E8EBE8] text-[#52605B]")}>{marker}</div>
      <div className="border-b border-[#E1E5E2] bg-white px-3.5 py-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="text-[9px] font-semibold text-[#29312C]">{title}</div>
          <div className="text-[7px] font-semibold text-[#7A837D]">{meta}</div>
        </div>
        <div className="mt-1.5 text-[9px] leading-[1.5] text-[#505B54]">{copy}</div>
        <div className="mt-2 text-[7px] font-medium text-[#78827C]">{detail}</div>
      </div>
    </div>
  );
}

function ContextCard({ label,value,sub,accent }: { label:string; value:string; sub:string; accent:"blue"|"sage"|"oat" }) {
  const bar={blue:"bg-[#2563FF]",sage:"bg-[#85845D]",oat:"bg-[#C89A5D]"};
  return (
    <div className="relative overflow-hidden border-b border-[#E1E5E2] bg-white px-3 py-3">
      <span className={"absolute inset-y-0 left-0 w-[3px] "+bar[accent]} />
      <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#68716B]">{label}</div>
      <div className="mt-1 text-[10px] font-semibold text-[#2E3731]">{value}</div>
      <div className="mt-1 text-[7px] font-medium text-[#68716B]">{sub}</div>
    </div>
  );
}

function CustomerWorkbench() {
  const [mode, setMode] = useState<"segment" | "customer">("segment");

  return (
    <section id="crm-workbench" className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div className="max-w-[610px]">
            <Eyebrow>Work the database</Eyebrow>
            <h2 className="mt-5 text-[40px] font-medium leading-[.98] tracking-[-0.052em] text-[#111318] sm:text-[50px] lg:text-[60px]" style={{ fontFamily: DISPLAY }}>
              Find who needs attention. See the full context.
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <p className="max-w-[500px] text-[15px] font-medium leading-[1.72] text-[#616861] sm:text-[16px]">
              Segment by tags, pipeline stage, owner, activity or custom fields. Save the audience, then open any customer without losing their conversation or history.
            </p>
            <div className="mt-6 flex gap-6 border-b border-[#DADFDA]">
              <button type="button" onClick={()=>setMode("segment")} className={"relative pb-3 text-[11px] font-semibold "+(mode==="segment"?"text-[#111318]":"text-[#8A918C]")}>
                Segment customers
                {mode==="segment"?<span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#111318]" />:null}
              </button>
              <button type="button" onClick={()=>setMode("customer")} className={"relative pb-3 text-[11px] font-semibold "+(mode==="customer"?"text-[#111318]":"text-[#8A918C]")}>
                Open customer
                {mode==="customer"?<span className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-[#111318]" />:null}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10" delay={0.04}>
          <div className="overflow-hidden rounded-[22px] border border-[#D8DEDA] bg-white shadow-[0_24px_56px_rgba(38,45,41,.08)]">
            {mode==="segment"?<SegmentSurface/>:<ConversationSurface/>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SegmentSurface() {
  const matches=[
    {name:"Mia Thompson",cell:0,owner:"Ben",stage:"Quote sent",activity:"2 days",tags:["VIP","Residential"]},
    {name:"Chris Moore",cell:14,owner:"Alex",stage:"Quote sent",activity:"4 days",tags:["VIP","Electrical"]},
    {name:"Daniel Brooks",cell:5,owner:"Sam",stage:"Quote sent",activity:"5 days",tags:["VIP","Commercial"]},
    {name:"Priya Shah",cell:9,owner:"Ben",stage:"Quote sent",activity:"6 days",tags:["VIP","Repeat"]},
  ];

  return (
    <div className="grid lg:grid-cols-[1.38fr_.62fr]">
      <div className="min-w-0 p-5 sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-[17px] font-semibold text-[#26302A]">VIP quotes waiting on a reply</div>
              <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#2563FF]">23 matches</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ["Tag","VIP",true],["Stage","Quote sent",false],["Last activity","3+ days",false],["Owner","Any",false],
              ].map(([label,value,active])=>(
                <span key={label as string} className={"inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[7px] font-semibold "+(active?"bg-[#111318] text-white":"bg-[#F0F1ED] text-[#56605A]")}>
                  <span className={"h-1.5 w-1.5 rounded-full "+(active?"bg-[#DDA34B]":"bg-[#A7AEA8]")} />
                  {label}: {value}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <span className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#D9DEDA] bg-white px-3 text-[8px] font-semibold text-[#555F59]"><SlidersHorizontal size={11}/> Columns</span>
            <span className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#1E2B29] px-3 text-[8px] font-semibold text-white">Save smart list</span>
          </div>
        </div>

        <div className="mt-5 divide-y divide-[#E5E8E5] border-y border-[#E0E4E0]">
          {matches.map((customer,i)=>(
            <div key={customer.name} className={"grid items-center gap-3 px-1 py-3.5 sm:grid-cols-[1.35fr_.7fr_.9fr_.65fr] "+(i===0?"bg-[#F7F8F5]":"bg-white")}>
              <div className="flex items-center gap-3">
                <Avatar cell={customer.cell} size={36} className="border-2 border-white shadow-[0_4px_12px_rgba(35,53,76,.10)]"/>
                <div>
                  <div className="text-[10px] font-semibold text-[#28312B]">{customer.name}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <span className="rounded-[5px] bg-[#111318] px-1.5 py-1 text-[6px] font-bold text-white">VIP</span>
                    <span className="rounded-[5px] bg-[#E8EBDD] px-1.5 py-1 text-[6px] font-bold text-[#657247]">{customer.tags[1]}</span>
                  </div>
                </div>
              </div>
              <div><div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87908A]">Owner</div><div className="mt-1 text-[9px] font-medium text-[#47514B]">{customer.owner}</div></div>
              <div><div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87908A]">Pipeline stage</div><div className="mt-1 text-[9px] font-semibold text-[#8E725D]">{customer.stage}</div></div>
              <div><div className="text-[7px] font-bold uppercase tracking-[0.09em] text-[#87908A]">Last activity</div><div className={"mt-1 text-[9px] font-semibold "+(i>1?"text-[#BF7458]":"text-[#59625D]")}>{customer.activity}</div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E1E5E1] bg-[#F6F3ED] p-5 sm:p-6 lg:border-l lg:border-t-0">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#26302A]"><Filter size={14} className="text-[#58706F]"/>Build a customer segment</div>
        <p className="mt-1.5 text-[9px] leading-[1.55] text-[#66706A]">Use the fields already attached to each customer. Add your own fields and tags when the business needs them.</p>

        <div className="mt-5 divide-y divide-[#DED8CE] border-y border-[#DED8CE]">
          {[
            ["Tag","VIP",true],["Pipeline stage","Quote sent",false],["Last activity","More than 3 days ago",false],["Custom field","Service area = Sydney",false],
          ].map(([label,value,active])=>(
            <div key={label as string} className={"relative py-3 "+(active?"pl-3":"")}>
              {active?<span className="absolute bottom-2 left-0 top-2 w-[3px] bg-[#58706F]" />:null}
              <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#7B847E]">{label}</div>
              <div className="mt-1.5 flex items-center justify-between text-[9px] font-semibold text-[#37413B]">{value}<ChevronDown size={11}/></div>
            </div>
          ))}
        </div>

        <button type="button" className="mt-4 inline-flex items-center gap-2 text-[8px] font-semibold text-[#58706F]">+ Add another condition</button>
        <div className="mt-5 flex items-center justify-between border-t border-[#DED8CE] pt-4">
          <div className="flex items-center gap-2 text-[9px] font-semibold text-[#111318]"><span className="h-2 w-2 rounded-full bg-[#DDA34B]"/>23 customers match</div>
          <span className="text-[8px] font-semibold text-[#7B847E]">Match all conditions</span>
        </div>
      </div>
    </div>
  );
}

function ConversationSurface() {
  const customers=[
    {name:"Mia Thompson",cell:0,preview:"Tuesday afternoon works. Can you send...",channel:"SMS",active:true},
    {name:"Daniel Brooks",cell:5,preview:"Thanks, I have paid the invoice.",channel:"Email",active:false},
    {name:"John Smith",cell:12,preview:"Can we move the booking to Friday?",channel:"SMS",active:false},
    {name:"Priya Shah",cell:9,preview:"Perfect. See you then.",channel:"Email",active:false},
  ];

  return (
    <div className="grid min-h-[480px] lg:grid-cols-[240px_1fr_245px]">
      <div className="border-b border-[#E1E5E1] bg-[#F7F7F4] p-4 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between">
          <div><div className="text-[14px] font-semibold text-[#26302A]">Customer conversations</div><div className="mt-1 text-[8px] text-[#66706A]">SMS and email in one view</div></div>
          <Search size={13} className="text-[#6D756F]"/>
        </div>
        <div className="mt-3 space-y-1">
          {customers.map((customer)=>(
            <div key={customer.name} className={"border-b border-[#E1E5E1] px-1 py-3 "+(customer.active?"bg-white":"bg-transparent")}>
              <div className="flex items-center gap-2.5">
                <Avatar cell={customer.cell} size={32} className="border-2 border-white"/>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate text-[9px] font-semibold text-[#29312C]">{customer.name}</div>
                    <span className={"text-[6px] font-bold uppercase tracking-[0.08em] "+(customer.channel==="SMS"?"text-[#2563FF]":"text-[#69735D]")}>{customer.channel}</span>
                  </div>
                  <div className="mt-1 truncate text-[7px] text-[#87908A]">{customer.preview}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col bg-white">
        <div className="flex items-center justify-between border-b border-[#E7EAE7] px-5 py-4">
          <div>
            <div className="text-[12px] font-semibold text-[#29312C]">Mia Thompson</div>
            <div className="mt-1 flex gap-2 text-[7px] font-semibold">
              <span className="text-[#111318]">VIP</span><span className="text-[#8E725D]">Quote sent</span><span className="text-[#69735D]">Residential</span>
            </div>
          </div>
          <div className="text-[7px] font-semibold text-[#7B847E]">Owner · Ben Walker</div>
        </div>

        <div className="flex flex-1 flex-col justify-between bg-[#FAFBFA] p-5">
          <div>
            <div className="max-w-[76%] rounded-[14px] rounded-bl-[4px] border border-[#DFE4DF] bg-white px-4 py-3 text-[9px] leading-[1.55] text-[#45504A]">Hi Mia, your quote is ready. Would Tuesday afternoon suit you for the site visit?</div>
            <div className="ml-auto mt-3 max-w-[72%] rounded-[14px] rounded-br-[4px] bg-[#1E2B29] px-4 py-3 text-[9px] leading-[1.55] text-white">Tuesday afternoon works. Can you send through the quote?</div>
          </div>
          <div className="rounded-[10px] border border-[#D9DEDA] bg-white px-4 py-3.5 text-[8px] text-[#7E8781]">Reply by SMS…</div>
        </div>
      </div>

      <div className="hidden border-l border-[#E1E5E1] bg-[#F6F3ED] p-4 lg:block">
        <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#66706A]">Customer context</div>
        <div className="mt-4 flex items-center gap-3"><Avatar cell={0} size={42} className="border-2 border-white shadow-[0_5px_14px_rgba(35,53,76,.10)]"/><div><div className="text-[10px] font-semibold text-[#26302A]">Mia Thompson</div><div className="text-[7px] uppercase tracking-[0.1em] text-[#7E8781]">Northside Plumbing</div></div></div>
        <div className="mt-4 divide-y divide-[#DED8CE] border-y border-[#DED8CE]">
          {[["Pipeline stage","Quote sent"],["Tags","VIP · Residential"],["Custom field","Service area · Sydney"],["Next action","Follow up in 2 days"]].map(([label,value])=>(
            <div key={label} className="py-3"><div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#778079]">{label}</div><div className="mt-1 text-[8px] font-semibold text-[#465049]">{value}</div></div>
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
  const reduced=!!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#071012] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute -right-[8%] top-[-28%] h-[680px] w-[680px] rounded-full bg-[#0E777B]/18 blur-[150px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div className="max-w-[790px]">
            <Eyebrow dark>CRM that can act</Eyebrow>
            <h2 className="mt-5 text-[42px] font-medium leading-[.96] tracking-[-0.055em] text-white sm:text-[54px] lg:text-[64px]" style={{fontFamily:DISPLAY}}>
              When customer state changes,
              <span className="block text-[#74DFE1]">the next action can start.</span>
            </h2>
          </div>
          <p className="max-w-[470px] text-[15px] font-medium leading-[1.72] text-white/58 lg:justify-self-end">
            Stage changes, tags, timing and customer events can become workflow triggers instead of another thing someone has to remember.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.04}>
          <div className="overflow-hidden rounded-[22px] bg-white text-[#111318] shadow-[0_34px_90px_rgba(0,0,0,.3)]">
            <div className="flex min-h-12 items-center justify-between border-b border-[#E1E5E1] px-4">
              <div>
                <div className="text-[11px] font-semibold text-[#26302A]">Quote follow-up</div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[0.11em] text-[#87908A]">Automation · Draft</div>
              </div>
              <div className="flex gap-2">
                <span className="rounded-[7px] border border-[#D9DEDA] px-2.5 py-1.5 text-[8px] font-semibold text-[#59625D]">Test</span>
                <span className="rounded-[7px] bg-[#1E2B29] px-2.5 py-1.5 text-[8px] font-semibold text-white">Save</span>
              </div>
            </div>

            <div className="grid min-h-[500px] lg:grid-cols-[265px_1fr]">
              <div className="border-r border-[#E1E5E1] bg-[#F8F9F7]">
                <div className="grid grid-cols-3 border-b border-[#E1E5E1] text-[8px] font-bold uppercase tracking-[0.1em]">
                  <span className="border-b-2 border-[#111318] px-3 py-3 text-[#111318]">Triggers</span>
                  <span className="px-3 py-3 text-[#7A837D]">Logic</span>
                  <span className="px-3 py-3 text-[#7A837D]">Actions</span>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-2 rounded-[8px] border border-[#D9DEDA] bg-white px-3 py-2 text-[8px] text-[#7B847E]">
                    <Search size={11}/> Search steps...
                  </div>
                  {[
                    ["Communications",["Inbound SMS","Inbound call"]],
                    ["Contact",["Tag changed","Contact created"]],
                    ["Pipeline",["Pipeline stage changed","Opportunity created"]],
                  ].map(([group,items])=>(
                    <div key={group as string} className="mt-4">
                      <div className="text-[7px] font-bold uppercase tracking-[0.13em] text-[#87908A]">{group}</div>
                      <div className="mt-2 space-y-1.5">
                        {(items as string[]).map((item,i)=>(
                          <motion.div
                            key={item}
                            initial={reduced?false:{opacity:0,x:-7}}
                            whileInView={{opacity:1,x:0}}
                            viewport={{once:true}}
                            transition={{duration:reduced?0:.3,delay:reduced?0:i*.04,ease:EASE}}
                            className="flex items-center gap-2 rounded-[7px] border border-[#DFE3DF] bg-white px-3 py-2.5 text-[8px] font-semibold text-[#465049]"
                          >
                            <span className="grid h-5 w-5 place-items-center rounded-[5px] bg-[#111318] text-white">↯</span>
                            {item}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="relative overflow-hidden bg-[#FBFCFB] p-5 sm:p-7 lg:p-8"
                style={{backgroundImage:"radial-gradient(circle, rgba(87,96,91,.16) 1px, transparent 1px)",backgroundSize:"22px 22px"}}
              >
                <div className="relative flex min-h-[430px] items-center">
                  <div className="absolute left-[9%] right-[9%] top-1/2 hidden h-px -translate-y-1/2 bg-[#8F9992] xl:block">
                    <motion.span
                      className="block h-full bg-[#1E2B29]"
                      initial={reduced?false:{width:"0%"}}
                      whileInView={{width:"100%"}}
                      viewport={{once:true,amount:.45}}
                      transition={{duration:reduced?0:1.05,ease:EASE}}
                    />
                  </div>

                  <div className="relative z-10 grid w-full gap-7 xl:grid-cols-3 xl:gap-20">
                    <BuilderNode label="Trigger" title="Pipeline stage changed" copy="Stage becomes Quote sent" tone="blue"/>
                    <BuilderNode label="Wait" title="2 days" copy="Give the customer time to decide" tone="neutral"/>
                    <BuilderNode label="Action" title="Send follow-up" copy="Message goes out if still in stage" tone="sage"/>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 text-[7px] font-bold uppercase tracking-[0.1em] text-[#66706A]">CRM state → workflow</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BuilderNode({label,title,copy,tone}:{label:string;title:string;copy:string;tone:"blue"|"neutral"|"sage"}) {
  const bar={blue:"bg-[#2563FF]",neutral:"bg-[#C89A5D]",sage:"bg-[#85845D]"};
  return (
    <div className="relative overflow-visible rounded-[14px] border border-[#DDE2DE] bg-white p-4 shadow-[0_10px_28px_rgba(38,53,70,.07)]">
      <span className={"absolute inset-y-0 left-0 w-[4px] rounded-l-[14px] "+bar[tone]} />
      <span className="absolute left-[-5px] top-1/2 hidden h-[10px] w-[10px] -translate-y-1/2 rounded-full border-2 border-[#8F9992] bg-white xl:block" />
      <span className="absolute right-[-5px] top-1/2 hidden h-[10px] w-[10px] -translate-y-1/2 rounded-full border-2 border-[#8F9992] bg-white xl:block" />
      <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#5E6862]">{label}</div>
      <div className="mt-4 text-[13px] font-semibold text-[#26302A]">{title}</div>
      <div className="mt-1 text-[9px] leading-[1.5] text-[#66706A]">{copy}</div>
    </div>
  );
}

function ScaleSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E2B29] px-5 py-24 text-[#F7F2EA] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="pointer-events-none absolute right-[-8%] top-[-18%] h-[620px] w-[620px] rounded-full bg-[#31403D]/55 blur-[140px]" />

      <div className="relative mx-auto max-w-[1380px]">
        <Reveal className="grid gap-12 lg:grid-cols-[.68fr_1.32fr] lg:items-center lg:gap-16">
          <div className="relative z-10 max-w-[590px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#DDA34B]">Unlimited users</div>
            <h2 className="mt-5 text-[48px] font-medium leading-[.92] tracking-[-0.06em] text-[#F7F2EA] sm:text-[64px] lg:text-[76px]" style={{fontFamily:DISPLAY}}>
              Unlimited users.
              <span className="block text-[#D98670]">One shared CRM.</span>
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.68] text-[#B8C0BC] sm:text-[18px]">
              Reception, sales, admin, operations and owners can work in the same system without adding another per-seat charge as the team grows.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-[12px] font-semibold">
              <span>No per-seat fees</span>
              <span className="text-[#D98670]">Unlimited contacts</span>
              <span className="text-[#DDA34B]">Guided Launch</span>
            </div>

            <a href={PRICING_URL} className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold text-[#F7F2EA]">
              See how Zapla is priced <ArrowRight size={14}/>
            </a>
          </div>

          <Reveal delay={0.06}>
            <TeamWorkspaceVisual />
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}

function TeamWorkspaceVisual() {
  const people=[
    {cell:7,name:"Reception",x:"18%",y:"23%",tone:"#C887A1"},
    {cell:14,name:"Sales",x:"73%",y:"20%",tone:"#E97D62"},
    {cell:19,name:"Admin",x:"84%",y:"67%",tone:"#CFA379"},
    {cell:9,name:"Operations",x:"20%",y:"78%",tone:"#A8AD73"},
    {cell:0,name:"Owner",x:"51%",y:"8%",tone:"#DDA34B"},
  ];

  return (
    <div className="relative min-h-[600px]">
      <div className="absolute inset-[9%_5%_7%_5%] overflow-hidden rounded-[24px] bg-white shadow-[0_34px_92px_rgba(0,0,0,.28)]">
        <div className="flex items-center justify-between border-b border-[#E4E7E4] px-5 py-4">
          <div>
            <div className="text-[11px] font-semibold text-[#25302A]">Team workspace</div>
            <div className="mt-0.5 text-[7px] text-[#7B847E]">One CRM · shared customer context</div>
          </div>
          <div className="flex -space-x-2">
            {[0,7,14,19,9].map((cell)=><Avatar key={cell} cell={cell} size={28} className="border-2 border-white"/>)}
          </div>
        </div>

        <div className="grid min-h-[455px] lg:grid-cols-2">
          <div className="border-b border-[#E6E9E6] p-5 lg:border-b-0 lg:border-r">
            <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7B847E]">Conversations</div>
            <div className="mt-4 flex items-center gap-3 border-b border-[#E7EAE7] pb-4">
              <Avatar cell={0} size={40} className="border-2 border-white"/>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold text-[#26302A]">Mia Thompson</div>
                <div className="mt-1 truncate text-[8px] text-[#69736D]">Tuesday afternoon works. Can you send the quote?</div>
              </div>
              <span className="text-[7px] font-bold uppercase tracking-[0.08em] text-[#2563FF]">SMS</span>
            </div>
            <div className="mt-4 rounded-[14px] bg-[#1E2B29] px-4 py-3 text-[9px] leading-[1.55] text-white">
              Reply ready with the full customer history beside it.
            </div>

            <div className="mt-7 text-[7px] font-bold uppercase tracking-[0.12em] text-[#7B847E]">Customer data</div>
            <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 text-[8px]">
              <div><span className="block text-[#8A928D]">Tags</span><span className="mt-1 block font-semibold text-[#39433D]">VIP · Residential</span></div>
              <div><span className="block text-[#8A928D]">Owner</span><span className="mt-1 block font-semibold text-[#39433D]">Ben Walker</span></div>
              <div><span className="block text-[#8A928D]">Service area</span><span className="mt-1 block font-semibold text-[#39433D]">Sydney</span></div>
              <div><span className="block text-[#8A928D]">Source</span><span className="mt-1 block font-semibold text-[#39433D]">Website</span></div>
            </div>
          </div>

          <div className="bg-[#F7F7F4] p-5">
            <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7B847E]">Work in motion</div>

            <div className="mt-4 space-y-3">
              <div className="rounded-[13px] border border-[#E0E4E0] bg-white p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#8E725D]">Deal</div>
                  <span className="text-[7px] font-semibold text-[#69736D]">Sales</span>
                </div>
                <div className="mt-2 text-[12px] font-semibold text-[#26302A]">A$2,850 · Quote sent</div>
              </div>

              <div className="rounded-[13px] border border-[#E0E4E0] bg-white p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#69735D]">Task</div>
                  <span className="text-[7px] font-semibold text-[#69736D]">Operations</span>
                </div>
                <div className="mt-2 text-[12px] font-semibold text-[#26302A]">Confirm site visit · Tuesday</div>
              </div>

              <div className="rounded-[13px] border border-[#E0E4E0] bg-white p-3.5">
                <div className="flex items-center justify-between">
                  <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#58706F]">Fields</div>
                  <span className="text-[7px] font-semibold text-[#69736D]">Admin</span>
                </div>
                <div className="mt-2 text-[12px] font-semibold text-[#26302A]">Service area · Sydney · Hot water</div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#DDE1DD] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#7B847E]">Owner view</div>
                  <div className="mt-1 text-[10px] font-semibold text-[#26302A]">Everything stays on one customer record.</div>
                </div>
                <Users size={18} className="text-[#58706F]"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {people.map((person,index)=>(
        <motion.div
          key={person.name}
          className="absolute"
          style={{left:person.x,top:person.y,translateX:"-50%",translateY:"-50%"}}
          initial={{opacity:0,scale:.82,y:10}}
          whileInView={{opacity:1,scale:1,y:0}}
          viewport={{once:true,amount:.45}}
          transition={{duration:.48,delay:index*.06,ease:EASE}}
        >
          <div className="relative">
            <Avatar cell={person.cell} size={64} className="border-[3px] border-[#F7F2EA] shadow-[0_14px_30px_rgba(0,0,0,.22)]"/>
            <div className="absolute left-[46px] top-[46px] flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[9px] font-bold text-[#111318] shadow-[0_8px_20px_rgba(0,0,0,.16)]" style={{backgroundColor:person.tone}}>
              <MousePointer2 size={10} fill="currentColor"/>{person.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CommercialPoint({title,copy,dark=false}:{title:string;copy:string;dark?:boolean}) {
  return (
    <div>
      <div className={"text-[10px] font-bold uppercase tracking-[0.13em] "+(dark?"text-[#DDA34B]":"text-[#2563FF]")}>{title}</div>
      <p className={"mt-2 max-w-[340px] text-[12px] leading-[1.65] "+(dark?"text-[#B8C0BC]":"text-[#59646E]")}>{copy}</p>
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
  const steps=[
    {icon:Globe2,eyebrow:"Lead capture",title:"Website enquiry",detail:"Form submitted",tone:"#58706F"},
    {icon:Mail,eyebrow:"Conversation",title:"SMS + email",detail:"Reply stays attached",tone:"#BF7458"},
    {icon:CalendarDays,eyebrow:"Booking",title:"Tuesday · 10:30",detail:"Site visit booked",tone:"#85845D"},
    {icon:CreditCard,eyebrow:"Payment",title:"A$2,850",detail:"Payment recorded",tone:"#C89A5D"},
    {icon:TicketCheck,eyebrow:"Service",title:"Job complete",detail:"History stays with Mia",tone:"#58706F"},
  ];

  return (
    <section className="overflow-hidden bg-[#F7F4EE] px-5 py-24 sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div className="max-w-[610px]">
            <Eyebrow>Connected beyond CRM</Eyebrow>
            <h2 className="mt-5 text-[42px] font-medium leading-[.96] tracking-[-0.055em] text-[#111318] sm:text-[54px] lg:text-[64px]" style={{fontFamily:DISPLAY}}>
              One customer record.
              <span className="block text-[#58706F]">Across what happens next.</span>
            </h2>
          </div>
          <p className="max-w-[560px] text-[15px] font-medium leading-[1.72] text-[#646B65] lg:justify-self-end">
            Email, SMS, bookings, payments, lead capture and service activity can stay tied to the same customer instead of becoming separate trails across separate tools.
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.04}>
          <div className="relative mx-auto max-w-[1220px] border-y border-[#D8D0C5] py-10 sm:py-12">
            <div className="flex items-center gap-3 pb-8">
              <Avatar cell={0} size={46} className="border-2 border-white shadow-[0_5px_14px_rgba(35,53,76,.10)]"/>
              <div>
                <div className="text-[12px] font-semibold text-[#26302A]">Mia Thompson</div>
                <div className="mt-1 text-[8px] uppercase tracking-[0.1em] text-[#7B847E]">One customer record · Northside Plumbing</div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute left-[5%] right-[5%] top-[37px] h-px bg-[#BEB6AA]">
                <motion.div
                  className="h-full bg-[#1E2B29]"
                  initial={{width:"0%"}}
                  whileInView={{width:"100%"}}
                  viewport={{once:true,amount:.45}}
                  transition={{duration:1.2,ease:EASE}}
                />
              </div>

              <div className="relative grid grid-cols-5 gap-5">
                {steps.map((step,index)=>{
                  const Icon=step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{opacity:0,y:12}}
                      whileInView={{opacity:1,y:0}}
                      viewport={{once:true,amount:.45}}
                      transition={{duration:.42,delay:.08+index*.06,ease:EASE}}
                      className="relative pt-[72px]"
                    >
                      <div className="absolute left-1/2 top-[18px] z-10 grid h-[38px] w-[38px] -translate-x-1/2 place-items-center rounded-full bg-[#F7F4EE] ring-1 ring-[#BEB6AA]" style={{color:step.tone}}>
                        <Icon size={17}/>
                      </div>
                      <div className="text-center">
                        <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7A837D]">{step.eyebrow}</div>
                        <div className="mt-2 text-[12px] font-semibold text-[#26302A]">{step.title}</div>
                        <div className="mt-1 text-[9px] leading-[1.5] text-[#69716C]">{step.detail}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-[#D8D0C5] md:hidden">
              {steps.map((step)=>{
                const Icon=step.icon;
                return (
                  <div key={step.title} className="flex items-center gap-4 py-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white" style={{color:step.tone}}><Icon size={17}/></div>
                    <div>
                      <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#7A837D]">{step.eyebrow}</div>
                      <div className="mt-1 text-[11px] font-semibold text-[#26302A]">{step.title}</div>
                      <div className="mt-1 text-[9px] text-[#69716C]">{step.detail}</div>
                    </div>
                  </div>
                );
              })}
            </div>
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
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <Reveal className="mx-auto max-w-[1080px] text-center">
        <img
          src={ZAPLA_ICON_URL}
          alt=""
          aria-hidden="true"
          className="mx-auto h-[52px] w-[52px] rounded-[14px] object-cover shadow-[0_8px_20px_rgba(37,99,255,.16)]"
        />

        <div className="mt-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C96F55]">See it around your business</div>
        </div>

        <h2
          className="mx-auto mt-3 max-w-[900px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[56px] lg:text-[64px]"
          style={{fontFamily:DISPLAY}}
        >
          See how Zapla would fit the way your team manages customers.
        </h2>

        <p className="mx-auto mt-4 max-w-[720px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
          We’ll map your customer flow, show where the CRM fits, and explain what would move with Guided Launch.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px">
            Book a Call <ArrowRight size={15}/>
          </a>
          <a href={PRICING_URL} className="inline-flex h-[50px] items-center rounded-full border border-[#E2DBD1] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#CFC6BA]">
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
