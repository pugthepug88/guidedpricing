import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileText,
  Inbox,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCcw,
  Search,
  Star,
  Users,
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
          "Zapla CRM keeps every customer, conversation, pipeline stage and next step together so the whole team can see what is happening and what needs to happen next.",
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
    q: "Can you import our current contacts?",
    a: "Yes. Follow-Through Guided Launch includes importing up to 5,000 clean contacts. Larger or more complex data moves can be scoped separately.",
  },
  {
    q: "Can you set up our sales pipeline?",
    a: "Yes. Follow-Through Guided Launch includes up to two sales pipelines. Growth Guided Launch includes up to three. We map the stages around how your business actually works rather than forcing everyone into a generic sales process.",
  },
  {
    q: "Does everyone on the team get access?",
    a: "Yes. Follow-Through and Growth include unlimited users, so you do not have to choose which employees deserve a login.",
  },
  {
    q: "Can Zapla connect email, calendars and forms?",
    a: "Yes. The platform includes a unified inbox, calendars and online booking, forms and surveys. Guided Launch can connect and configure the agreed essentials for your setup.",
  },
  {
    q: "Does Zapla include follow-up automation?",
    a: "Yes. Follow-Through includes lead capture and response, lead follow-through, quote chasing, appointment recovery, review automation and other agreed follow-through workflows.",
  },
  {
    q: "What is included in Guided Launch?",
    a: "Follow-Through Guided Launch starts from A$1,997 plus GST and includes workspace setup, user access, business email and inbox connection, phone setup or forwarding, contact import, pipelines, forms or surveys, calendars, agreed automations, training, testing and go-live.",
  },
  {
    q: "Which plans include the CRM?",
    a: "CRM and customer records are included in Follow-Through at A$399 per month plus GST and Growth at A$699 per month plus GST.",
  },
] as const;

function CrmPage() {
  return (
    <main
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <RecognitionSection />
      <CustomerRecordSection />
      <PipelineSection />
      <ActionSection />
      <TeamSection />
      <PlatformSection />
      <GuidedLaunchSection />
      <CommercialSection />
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
        (light ? "text-[#8DB0FF]" : "text-[#2563FF]")
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
    <section className="relative overflow-hidden border-b border-[#E2E9F0] bg-[#F7FAFD] px-5 pb-20 pt-[112px] sm:px-10 sm:pb-24 sm:pt-[126px] lg:px-16 lg:pb-24 lg:pt-[138px]">
      <div className="pointer-events-none absolute right-[-120px] top-[40px] h-[440px] w-[440px] rounded-full bg-[#2563FF]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-160px] left-[20%] h-[360px] w-[360px] rounded-full bg-[#99A36D]/[0.06] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <Reveal className="max-w-[700px]">
          <Eyebrow>Zapla CRM</Eyebrow>
          <h1
            className="mt-4 text-[51px] font-medium leading-[0.91] tracking-[-0.064em] sm:text-[70px] lg:text-[84px]"
            style={{ fontFamily: DISPLAY }}
          >
            Every customer.
            <span className="block">Every conversation.</span>
            <span className="block text-[#2563FF]">Every next step.</span>
          </h1>

          <p className="mt-6 max-w-[640px] text-[16px] leading-[1.72] text-[#5D6873] sm:text-[18px]">
            See who came in, what&apos;s happened, where things stand and what needs
            to happen next. All in one place your whole team can use.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7FAFD]"
            >
              Book a Call <ArrowRight size={15} />
            </a>
            <a
              href="#customer-record"
              className="inline-flex h-[50px] items-center rounded-[10px] border border-[#CCD8E3] bg-white px-6 text-[13px] font-semibold text-[#111318] shadow-[0_6px_18px_rgba(27,45,64,.04)] transition-colors hover:border-[#A8B6C4]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold text-[#5B6874] sm:text-[12px]">
            {["Unlimited users", "CRM included", "Guided Launch"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#2563FF]/10 text-[#2563FF]">
                  <Check size={10} strokeWidth={2.5} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <CrmHeroScene />
        </Reveal>
      </div>
    </section>
  );
}

function CrmHeroScene() {
  const reduced = !!useReducedMotion();
  const beat = (delay: number) =>
    reduced
      ? { initial: false as const, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay, ease: EASE },
        };

  return (
    <div className="relative min-h-[610px]">
      <div className="pointer-events-none absolute left-[12%] top-[10%] h-[72%] w-[70%] rounded-[44px] bg-[#EAF1F8]" />

      <motion.div
        {...beat(0.06)}
        viewport={{ once: true, amount: 0.7 }}
        className="absolute left-0 top-[70px] z-20 hidden w-[235px] rounded-[18px] border border-[#D6E1EA] bg-white p-4 shadow-[0_18px_48px_rgba(31,49,68,.09)] sm:block"
      >
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#758390]">
          <Inbox size={13} className="text-[#2563FF]" />
          New enquiry
        </div>
        <div className="mt-3 text-[13px] font-semibold text-[#27323C]">Website form</div>
        <div className="mt-1 text-[11px] leading-[1.55] text-[#697681]">Hot water replacement quote</div>
        <div className="mt-3 text-[9px] font-semibold text-[#8A96A0]">Today · 9:18 AM</div>
      </motion.div>

      <motion.div
        {...beat(0.18)}
        viewport={{ once: true, amount: 0.7 }}
        className="absolute right-0 top-[24px] z-20 hidden w-[220px] rounded-[18px] bg-[#1E2B29] p-4 text-white shadow-[0_20px_52px_rgba(20,37,35,.15)] sm:block"
      >
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/48">
          <MessageSquareText size={13} className="text-[#8DB0FF]" />
          SMS reply
        </div>
        <p className="mt-3 text-[12px] font-medium leading-[1.55] text-white/88">
          Tuesday afternoon works. Can you send through the quote?
        </p>
        <div className="mt-3 text-[9px] text-white/38">Today · 10:41 AM</div>
      </motion.div>

      <motion.div
        {...beat(0.28)}
        viewport={{ once: true, amount: 0.65 }}
        className="absolute bottom-[38px] right-[3%] z-20 hidden w-[240px] rounded-[18px] border border-[#D8E2EA] bg-white p-4 shadow-[0_18px_48px_rgba(31,49,68,.09)] md:block"
      >
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#758390]">
          <Calendar size={13} className="text-[#6E7B4F]" />
          Next step
        </div>
        <div className="mt-3 text-[13px] font-semibold text-[#27323C]">Site visit · Tuesday</div>
        <div className="mt-1 text-[11px] text-[#697681]">2:30 PM · assigned to Ben</div>
      </motion.div>

      <motion.div
        {...beat(0.34)}
        viewport={{ once: true, amount: 0.55 }}
        className="relative z-10 mx-auto mt-[88px] max-w-[520px] overflow-hidden rounded-[26px] border border-[#D5E0E9] bg-white shadow-[0_30px_80px_rgba(30,48,66,.13)]"
      >
        <div className="flex items-center justify-between border-b border-[#E4EAF0] bg-[#FBFCFD] px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar cell={0} size={44} />
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#222C35]">Mia Thompson</div>
              <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#89959F]">
                Residential · Northside
              </div>
            </div>
          </div>
          <span className="rounded-full bg-[#2563FF]/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.11em] text-[#2563FF]">
            Quote sent
          </span>
        </div>

        <div className="grid sm:grid-cols-[0.75fr_1.25fr]">
          <div className="border-b border-[#E6ECF1] p-5 sm:border-b-0 sm:border-r">
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8B97A0]">Customer</div>
            <div className="mt-4 space-y-4">
              {[
                ["Owner", "Ben Walker"],
                ["Source", "Website"],
                ["Service", "Hot water"],
                ["Value", "A$2,850"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[9px] font-semibold text-[#9AA5AE]">{label}</div>
                  <div className="mt-1 text-[11px] font-semibold text-[#303B44]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8B97A0]">Recent activity</div>
              <Search size={13} className="text-[#A1ACB5]" />
            </div>
            <div className="relative mt-4">
              <div className="absolute bottom-2 left-[5px] top-2 w-px bg-[#DDE5EC]" />
              {[
                ["9:18", "New website enquiry", "#2563FF"],
                ["9:26", "SMS sent by Zapla", "#7A8D50"],
                ["10:41", "Customer replied", "#99A36D"],
                ["11:08", "Quote sent · A$2,850", "#DDA34B"],
                ["11:12", "Site visit booked", "#2563FF"],
              ].map(([time, title, color]) => (
                <div key={time} className="relative flex gap-3 py-2 pl-5">
                  <span
                    className="absolute left-0 top-[12px] h-[11px] w-[11px] rounded-full border-2 border-white"
                    style={{ backgroundColor: color }}
                  />
                  <span className="w-[38px] shrink-0 text-[8px] font-semibold text-[#9AA5AE]">{time}</span>
                  <span className="text-[10px] font-semibold leading-[1.45] text-[#48535C]">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E4EAF0] bg-[#F8FAFC] px-5 py-3">
          <span className="text-[9px] font-semibold text-[#7A8792]">Next: follow up Thursday if no decision</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111318]">
            <ZaplaPetal size={20} />
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function RecognitionSection() {
  return (
    <section className="bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow light>Before the CRM</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            “Did anyone call them back?”
            <span className="block text-[#8DB0FF]">shouldn&apos;t be a daily question.</span>
          </h2>
          <p className="mt-6 max-w-[720px] text-[15px] leading-[1.72] text-white/58 sm:text-[16px]">
            When enquiries, calls, quotes and customer notes live in different places,
            the business only knows what&apos;s happening by asking around.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <FragmentedCustomer />
        </Reveal>
      </div>
    </section>
  );
}

function FragmentedCustomer() {
  return (
    <div className="relative mx-auto max-w-[1180px] py-3 sm:py-6">
      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <Reveal className="lg:col-span-5" delay={0.02}>
          <div className="overflow-hidden rounded-[22px] border border-[#D9E2EA] bg-[#F9FBFC] text-[#111318] shadow-[0_20px_50px_rgba(0,0,0,.14)]">
            <div className="flex items-center justify-between border-b border-[#E1E8EE] bg-white px-5 py-3">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7B8791]">
                <Phone size={13} className="text-[#2563FF]" />
                Phone note
              </div>
              <span className="text-[8px] font-semibold text-[#A1ABB3]">10:32 AM</span>
            </div>
            <div className="p-5">
              <div className="text-[13px] font-semibold text-[#2E3942]">Mia Thompson</div>
              <p className="mt-3 text-[12px] leading-[1.65] text-[#5F6B75]">
                Tuesday afternoon works. Asked whether the quote can be sent before the visit.
              </p>
              <div className="mt-4 text-[9px] font-semibold text-[#8B969F]">Saved in Ben&apos;s call notes</div>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:pt-12" delay={0.06}>
          <div className="overflow-hidden rounded-[22px] border border-[#D9E2EA] bg-white text-[#111318] shadow-[0_20px_50px_rgba(0,0,0,.14)]">
            <div className="flex items-center justify-between border-b border-[#E1E8EE] px-5 py-3">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7B8791]">
                <Mail size={13} className="text-[#C98B2E]" />
                Email
              </div>
              <span className="text-[8px] font-semibold text-[#A1ABB3]">Ben&apos;s inbox</span>
            </div>
            <div className="p-5">
              <div className="text-[11px] font-semibold text-[#8B969F]">Subject</div>
              <div className="mt-1 text-[14px] font-semibold text-[#2E3942]">Hot water replacement quote</div>
              <div className="mt-4 rounded-[14px] bg-[#F5F7F9] p-4 text-[11px] leading-[1.65] text-[#5E6A74]">
                Hi Mia, attached is the A$2,850 quote we discussed. Let me know if Tuesday still works.
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-12">
          <div className="mx-auto my-1 flex w-fit items-center gap-3 rounded-full bg-[#2563FF] px-4 py-2.5 text-white shadow-[0_18px_44px_rgba(37,99,255,.28)]">
            <Avatar cell={0} size={34} className="border-white/25" />
            <div>
              <div className="text-[11px] font-semibold">Mia Thompson</div>
              <div className="text-[8px] text-white/62">Same customer. Different pieces of the story.</div>
            </div>
          </div>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="overflow-hidden rounded-[22px] border border-[#D9E2EA] bg-[#F9FBFC] text-[#111318] shadow-[0_20px_50px_rgba(0,0,0,.14)]">
            <div className="flex items-center justify-between border-b border-[#E1E8EE] bg-white px-5 py-3">
              <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7B8791]">
                <FileText size={13} className="text-[#788B4F]" />
                Spreadsheet
              </div>
              <span className="text-[8px] font-semibold text-[#A1ABB3]">Quotes.xlsx</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[520px]">
                <div className="grid grid-cols-[1.1fr_.9fr_.8fr_1.2fr] border-b border-[#E6ECF1] bg-[#F4F7F9] px-5 py-2 text-[8px] font-bold uppercase tracking-[0.11em] text-[#8A959E]">
                  <span>Customer</span>
                  <span>Stage</span>
                  <span>Value</span>
                  <span>Next step</span>
                </div>
                <div className="grid grid-cols-[1.1fr_.9fr_.8fr_1.2fr] items-center px-5 py-4 text-[10px] font-semibold text-[#46525C]">
                  <span>Mia Thompson</span>
                  <span>Quote sent</span>
                  <span>A$2,850</span>
                  <span className="text-[#A5682A]">Call Thursday</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:pt-8" delay={0.14}>
          <div className="overflow-hidden rounded-[22px] border border-[#D9E2EA] bg-white text-[#111318] shadow-[0_20px_50px_rgba(0,0,0,.14)]">
            <div className="flex items-center gap-2 border-b border-[#E1E8EE] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#7B8791]">
              <Calendar size={13} className="text-[#C97158]" />
              Calendar
            </div>
            <div className="p-5">
              <div className="rounded-[15px] border-l-[3px] border-[#2563FF] bg-[#F1F5FA] p-4">
                <div className="text-[13px] font-semibold text-[#2E3942]">Site visit · Mia Thompson</div>
                <div className="mt-2 text-[10px] text-[#697680]">Tuesday · 2:30 PM</div>
                <div className="mt-1 text-[10px] text-[#8A959E]">Assigned to Ben</div>
              </div>
              <p className="mt-4 text-[10px] leading-[1.55] text-[#8A959E]">
                The appointment is here. The call note, quote and follow-up are somewhere else.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function CustomerRecordSection() {
  return (
    <section
      id="customer-record"
      className="relative scroll-mt-20 overflow-hidden bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32"
    >
      <div className="pointer-events-none absolute left-[-80px] top-[90px] text-[170px] font-medium leading-none tracking-[-0.08em] text-[#F2F6F9] sm:text-[220px] lg:text-[280px]" style={{ fontFamily: DISPLAY }}>
        CRM
      </div>

      <div className="relative mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.33fr_0.67fr] lg:gap-10 xl:gap-16">
        <Reveal className="self-start lg:sticky lg:top-28">
          <Eyebrow>One customer. One history.</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Stop piecing together
            <span className="block text-[#2563FF]">what happened.</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-[15px] leading-[1.72] text-[#616C76] sm:text-[16px]">
            Open the customer record and see the contact details, conversations,
            appointments, quote, owner, activity and next step together.
          </p>

          <div className="mt-9 border-l-2 border-[#2563FF] pl-5">
            <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#87939D]">One record holds</div>
            <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 text-[11px] font-semibold text-[#46525C]">
              <span>Conversations</span>
              <span>Appointments</span>
              <span>Quotes</span>
              <span>Next steps</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="lg:pt-16 xl:-mr-24">
          <UnifiedRecord />
        </Reveal>
      </div>
    </section>
  );
}

function UnifiedRecord() {
  const activity = [
    { time: "9:18 AM", title: "Website enquiry received", copy: "Hot water replacement quote", icon: <Inbox size={14} />, tone: "#2563FF" },
    { time: "9:26 AM", title: "SMS sent", copy: "Thanks Mia. We can help with that.", icon: <MessageSquareText size={14} />, tone: "#7A8D50" },
    { time: "10:41 AM", title: "Customer replied", copy: "Tuesday afternoon works.", icon: <MessageSquareText size={14} />, tone: "#99A36D" },
    { time: "11:08 AM", title: "Quote sent", copy: "A$2,850 · valid for 14 days", icon: <FileText size={14} />, tone: "#DDA34B" },
    { time: "11:12 AM", title: "Site visit booked", copy: "Tuesday · 2:30 PM · Ben", icon: <Calendar size={14} />, tone: "#2563FF" },
  ];

  return (
    <div className="overflow-hidden rounded-[30px] border border-[#D7E1E9] bg-[#F9FBFC] shadow-[0_28px_74px_rgba(31,49,68,.08)]">
      <div className="grid lg:grid-cols-[0.32fr_0.68fr]">
        <aside className="border-b border-[#E0E7ED] bg-[#F3F7FA] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-4">
            <Avatar cell={0} size={58} />
            <div>
              <div className="text-[24px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>Mia Thompson</div>
              <div className="mt-1 text-[10px] text-[#7B8791]">Residential customer</div>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {[
              ["Phone", "0412 555 018"],
              ["Email", "mia@example.com"],
              ["Owner", "Ben Walker"],
              ["Source", "Website form"],
              ["Service", "Hot water replacement"],
              ["Opportunity", "A$2,850"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-[#DFE7ED] pb-4 last:border-b-0">
                <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#96A1AA]">{label}</div>
                <div className="mt-1.5 text-[12px] font-semibold text-[#37434D]">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 rounded-[16px] bg-[#DCE0CC] p-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#647148]">Current stage</div>
            <div className="mt-2 text-[17px] font-semibold text-[#3F4B30]">Quote sent</div>
            <div className="mt-1 text-[10px] leading-[1.5] text-[#5C6749]">Follow up Thursday if no decision.</div>
          </div>
        </aside>

        <div className="bg-white p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8A96A0]">Customer timeline</div>
              <div className="mt-1 text-[14px] font-semibold text-[#2F3B44]">Everything in one history</div>
            </div>
            <div className="flex items-center gap-2 rounded-[10px] border border-[#DCE4EA] bg-[#F8FAFC] px-3 py-2 text-[10px] font-semibold text-[#65717B]">
              <Search size={12} />
              Search activity
            </div>
          </div>

          <div className="relative mt-7">
            <div className="absolute bottom-4 left-[15px] top-4 w-px bg-[#DDE5EC]" />
            {activity.map((item) => (
              <div key={item.time} className="relative grid gap-2 border-b border-[#EEF2F5] py-5 pl-11 last:border-b-0 sm:grid-cols-[0.28fr_0.72fr] sm:items-start">
                <span
                  className="absolute left-0 top-[20px] flex h-[30px] w-[30px] items-center justify-center rounded-full border-4 border-white bg-[#EFF4F7]"
                  style={{ color: item.tone }}
                >
                  {item.icon}
                </span>
                <div className="text-[9px] font-semibold uppercase tracking-[0.11em] text-[#96A1AA]">{item.time}</div>
                <div>
                  <div className="text-[13px] font-semibold text-[#35414B]">{item.title}</div>
                  <div className="mt-1 text-[11px] leading-[1.55] text-[#747F88]">{item.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineSection() {
  const columns = [
    {
      name: "New enquiry",
      cards: [
        ["Alex Chen", "Electrical quote", "A$1,450", "12 min"],
        ["Lena Parker", "Air con service", "A$780", "41 min"],
      ],
    },
    {
      name: "Qualified",
      cards: [
        ["Sam Nguyen", "Switchboard upgrade", "A$3,200", "Today"],
        ["Ivy Harris", "Solar inspection", "A$950", "Today"],
      ],
    },
    {
      name: "Quote sent",
      cards: [
        ["Mia Thompson", "Hot water replacement", "A$2,850", "2 days"],
        ["Chris Moore", "Bathroom electrical", "A$1,900", "6 days"],
      ],
    },
    {
      name: "Booked",
      cards: [
        ["Priya Shah", "Safety inspection", "A$520", "Tue"],
        ["Ben Lewis", "EV charger", "A$2,250", "Thu"],
      ],
    },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#EAF0F6] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div
        className="pointer-events-none absolute right-[-80px] top-[20px] text-[150px] font-medium leading-none tracking-[-0.08em] text-[#DDE6EE] sm:text-[220px] lg:text-[300px]"
        style={{ fontFamily: DISPLAY }}
      >
        PIPELINE
      </div>

      <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:items-center lg:gap-12">
        <Reveal className="max-w-[500px]">
          <Eyebrow>Pipeline</Eyebrow>
          <h2
            className="mt-4 text-[46px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[62px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            See what&apos;s moving.
            <span className="block text-[#2563FF]">And what isn&apos;t.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-[1.72] text-[#5F6B75] sm:text-[16px]">
            See every opportunity by stage, owner and value. When something has
            been sitting too long, it is visible before it quietly disappears.
          </p>

          <div className="mt-9 max-w-[360px] rounded-[20px] border border-[#D4DEE7] bg-white/75 p-5 shadow-[0_14px_36px_rgba(31,49,68,.05)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8B969F]">Needs attention</div>
                <div className="mt-2 text-[14px] font-semibold text-[#2E3942]">Chris Moore</div>
                <div className="mt-1 text-[10px] text-[#74808A]">Bathroom electrical · A$1,900</div>
              </div>
              <span className="rounded-full bg-[#D58C75]/12 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.1em] text-[#A65F48]">6 days</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="lg:-mr-28">
          <div className="overflow-x-auto rounded-[30px] border border-[#D2DDE6] bg-[#F8FAFC] p-4 shadow-[0_30px_74px_rgba(31,49,68,.10)] sm:p-5">
            <div className="grid min-w-[980px] grid-cols-4 gap-3">
              {columns.map((column) => (
                <div key={column.name} className="rounded-[18px] bg-[#EEF3F7] p-3">
                  <div className="flex items-center justify-between px-1 py-2">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#66737E]">{column.name}</div>
                    <span className="text-[9px] font-semibold text-[#9AA5AE]">{column.cards.length}</span>
                  </div>
                  <div className="mt-2 space-y-3">
                    {column.cards.map(([name, service, value, age]) => {
                      const stale = age === "6 days";
                      return (
                        <div
                          key={name}
                          className={
                            "rounded-[15px] border bg-white p-4 shadow-[0_8px_24px_rgba(31,49,68,.04)] " +
                            (stale ? "border-[#D58C75]/55 shadow-[0_10px_30px_rgba(201,111,85,.08)]" : "border-[#DFE6EC]")
                          }
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-[12px] font-semibold text-[#2F3B44]">{name}</div>
                              <div className="mt-1 text-[9px] text-[#8A959E]">{service}</div>
                            </div>
                            {stale ? (
                              <span className="rounded-full bg-[#D58C75]/12 px-2 py-1 text-[7px] font-bold uppercase tracking-[0.08em] text-[#A65F48]">
                                Stale
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-5 flex items-center justify-between border-t border-[#EDF1F4] pt-3">
                            <span className="text-[10px] font-semibold text-[#4D5963]">{value}</span>
                            <span className={"text-[8px] font-semibold " + (stale ? "text-[#A65F48]" : "text-[#98A2AA]")}>
                              {age}
                            </span>
                          </div>
                        </div>
                      );
                    })}
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

function ActionSection() {
  const journey = [
    { label: "Enquiry", detail: "9:18 AM", done: true, current: false },
    { label: "Assigned", detail: "Ben", done: true, current: false },
    { label: "Booked", detail: "Tue · 2:30", done: true, current: false },
    { label: "Quote sent", detail: "A$2,850", done: true, current: false },
    { label: "Follow up", detail: "Thu · 10:00", current: true },
    { label: "Review", detail: "After job", done: false, current: false },
  ] as const;

  return (
    <section className="bg-[#101820] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow light>From record to next step</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            See what happened.
            <span className="block text-[#8DB0FF]">Know what happens next.</span>
          </h2>
          <p className="mt-6 max-w-[700px] text-[15px] leading-[1.72] text-white/56 sm:text-[16px]">
            The customer record is not just a history. Zapla can use the stage,
            timing and rules you set to keep the next step moving.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#151F29] shadow-[0_28px_72px_rgba(0,0,0,.22)]">
            <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/10 px-5 py-5 sm:px-7">
              <div className="flex items-center gap-3">
                <Avatar cell={0} size={42} className="border-white/15" />
                <div>
                  <div className="text-[14px] font-semibold text-white/92">Mia Thompson</div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-[0.11em] text-white/36">
                    Hot water replacement
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[9px] font-semibold text-white/50">
                  Owner · Ben Walker
                </span>
                <span className="rounded-full bg-[#8DB0FF]/10 px-3 py-1.5 text-[9px] font-semibold text-[#AFC6FF]">
                  Current stage · Quote sent
                </span>
              </div>
            </div>

            <div className="relative px-5 py-8 sm:px-7 lg:px-9 lg:py-10">
              <div className="hidden lg:block absolute left-[8%] right-[8%] top-[65px] h-px bg-white/10" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
                {journey.map((step, index) => (
                  <div key={step.label} className="relative lg:px-3">
                    <div
                      className={
                        "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-bold " +
                        (step.current
                          ? "border-[#8DB0FF] bg-[#2563FF] text-white shadow-[0_0_0_7px_rgba(37,99,255,.10)]"
                          : step.done
                            ? "border-[#7F9D58]/30 bg-[#99A36D]/14 text-[#B6C990]"
                            : "border-white/10 bg-[#18232D] text-white/24")
                      }
                    >
                      {step.done ? <Check size={13} strokeWidth={2.4} /> : index + 1}
                    </div>
                    <div className="mt-4 text-[12px] font-semibold text-white/88">{step.label}</div>
                    <div className="mt-1 text-[9px] text-white/35">{step.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid border-t border-white/10 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-white/10 bg-white/[0.025] px-5 py-5 sm:px-7 lg:border-b-0 lg:border-r">
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/32">Rule</div>
                <div className="mt-2 text-[12px] font-semibold text-white/80">
                  If no decision 2 days after quote
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#2563FF]/10 px-5 py-5 sm:px-7">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563FF] text-white">
                  <MessageSquareText size={14} />
                </span>
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#8DB0FF]">Next action</div>
                  <div className="mt-1 text-[12px] font-semibold text-white/88">
                    Send the agreed follow-up Thursday at 10:00 AM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-5 text-[11px] leading-[1.65] text-white/42">
          Follow-Up keeps active opportunities moving. Reviews handles the post-job ask. Reopen brings dormant leads and customers back into conversation. They all work from the same customer record.
        </Reveal>
      </div>
    </section>
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
      <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-[320px] w-[320px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute right-[-20px] top-[-20px] h-[180px] w-[180px] rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">The whole team</p>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              A customer system only works
              <span className="block text-[#DDE7FF]">if the team actually uses it.</span>
            </h2>
            <p className="mt-6 max-w-[620px] text-[15px] leading-[1.72] text-white/72 sm:text-[16px]">
              Give sales, admin, reception, operations and management access to the
              same customer information without deciding who deserves a paid seat.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-[#17366E] shadow-[0_14px_34px_rgba(15,37,75,.12)]">
              <Users size={16} />
              <span className="text-[12px] font-bold">Unlimited users included</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[28px] border border-white/15 bg-[#174FD3] shadow-[0_28px_70px_rgba(13,43,108,.18)]">
              {roles.map(([role, task, cell], index) => (
                <div
                  key={role}
                  className="grid grid-cols-[auto_0.8fr_1.2fr] items-center gap-4 border-b border-white/10 px-5 py-4 last:border-b-0 sm:px-7"
                >
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

function PlatformSection() {
  const groups = [
    {
      label: "Talk",
      tone: "bg-[#F5F8FB]",
      items: [
        [<MessageSquareText size={15} />, "Unified inbox"],
        [<Phone size={15} />, "Phone & dialer"],
        [<Mail size={15} />, "Email & SMS"],
      ],
    },
    {
      label: "Move",
      tone: "bg-[#EEF4FA]",
      items: [
        [<Users size={15} />, "Pipelines"],
        [<Calendar size={15} />, "Booking"],
        [<FileText size={15} />, "Forms & surveys"],
      ],
    },
    {
      label: "Complete",
      tone: "bg-[#E8F0F7]",
      items: [
        [<CircleDollarSign size={15} />, "Invoices & payments"],
        [<Star size={15} />, "Reviews"],
        [<RefreshCcw size={15} />, "Reactivation"],
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-[980px]">
          <Eyebrow>One connected platform</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[60px] lg:text-[72px]"
            style={{ fontFamily: DISPLAY }}
          >
            One customer shouldn&apos;t be
            <span className="block text-[#2563FF]">spread across five systems.</span>
          </h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.72] text-[#616C76] sm:text-[16px]">
            Keep conversations, pipeline, bookings, payments and follow-up around
            the same customer record instead of chasing the story across separate tools.
          </p>
        </Reveal>

        <div className="relative mt-14 lg:min-h-[610px]">
          <Reveal className="relative z-20 lg:absolute lg:left-0 lg:top-14 lg:w-[34%]">
            <div className="flex min-h-[420px] flex-col justify-between rounded-[30px] bg-[#111B25] p-7 text-white shadow-[0_30px_74px_rgba(17,27,37,.18)] sm:p-9">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8DB0FF]">Customer record</div>
                <div className="mt-7 flex items-center gap-4">
                  <Avatar cell={0} size={60} className="border-white/15" />
                  <div>
                    <div className="text-[29px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>Mia Thompson</div>
                    <div className="mt-1 text-[10px] text-white/42">Everything points back here.</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-[18px] border border-white/8 bg-white/[0.04] p-4">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.13em] text-white/34">Current state</div>
                  <div className="mt-2 text-[17px] font-semibold text-white/90">Quote sent · A$2,850</div>
                  <div className="mt-1 text-[10px] text-white/42">Next step: follow up Thursday</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    ["5", "events"],
                    ["3", "channels"],
                    ["1", "owner"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-[14px] bg-white/[0.04] px-2 py-3">
                      <div className="text-[18px] font-semibold text-white/90">{value}</div>
                      <div className="mt-1 text-[7px] uppercase tracking-[0.1em] text-white/30">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-5 space-y-4 lg:ml-[28%] lg:mt-0">
            {groups.map((group, index) => (
              <Reveal key={group.label} delay={0.04 + index * 0.04} className={index === 1 ? "lg:translate-x-8" : index === 2 ? "lg:translate-x-16" : ""}>
                <div className={"overflow-hidden rounded-[26px] border border-[#D8E2EA] " + group.tone}>
                  <div className="grid sm:grid-cols-[0.26fr_0.74fr]">
                    <div className="flex items-center px-6 py-7 sm:px-8">
                      <div
                        className="text-[34px] font-medium tracking-[-0.05em] text-[#2E3A45]"
                        style={{ fontFamily: DISPLAY }}
                      >
                        {group.label}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3">
                      {group.items.map(([icon, item]) => (
                        <div key={String(item)} className="flex min-h-[138px] items-center gap-3 border-t border-[#DCE5EC] px-5 py-5 first:border-t-0 sm:border-l sm:border-t-0">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#2563FF] shadow-[0_8px_20px_rgba(31,49,68,.05)]">
                            {icon}
                          </span>
                          <span className="text-[11px] font-semibold leading-[1.45] text-[#48545E]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunchSection() {
  const steps = [
    ["01", "Bring the data", "Import up to 5,000 clean contacts on Follow-Through Guided Launch."],
    ["02", "Map the process", "Configure pipelines, forms, calendars and the agreed customer flow."],
    ["03", "Build the essentials", "Set up the agreed follow-through automations and connected channels."],
    ["04", "Train the team", "One training session, testing and go-live are included."],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#EAF0F6] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-0">
          <Reveal className="relative lg:pr-0">
            <div className="overflow-hidden rounded-[30px] bg-[#DCE6EE] shadow-[0_28px_70px_rgba(31,49,68,.09)]">
              <img
                src="/concept/guided-launch-natural-v6.webp"
                alt="Business team working together during setup"
                className="h-[430px] w-full object-cover sm:h-[560px]"
              />
            </div>
            <div className="absolute bottom-5 left-5 hidden rounded-[16px] bg-white/92 px-4 py-3 shadow-[0_12px_30px_rgba(31,49,68,.10)] backdrop-blur sm:block">
              <div className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#8A959E]">You are not starting from scratch</div>
              <div className="mt-1 text-[12px] font-semibold text-[#2F3B44]">Contacts · pipelines · forms · calendars</div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="relative z-10 lg:-ml-16">
            <div className="relative overflow-hidden rounded-[32px] border border-[#D7E1E9] bg-white p-7 shadow-[0_34px_86px_rgba(31,49,68,.13)] sm:p-9 lg:p-10">
              <div
                className="pointer-events-none absolute right-[-10px] top-[-30px] text-[150px] font-medium leading-none tracking-[-0.08em] text-[#EEF4FA]"
                style={{ fontFamily: DISPLAY }}
              >
                4
              </div>

              <div className="relative">
                <Eyebrow>Guided Launch</Eyebrow>
                <h2
                  className="mt-4 text-[42px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[54px] lg:text-[60px]"
                  style={{ fontFamily: DISPLAY }}
                >
                  Switching CRM shouldn&apos;t become
                  <span className="block text-[#2563FF]">another project for your team.</span>
                </h2>
                <p className="mt-5 max-w-[620px] text-[14px] leading-[1.72] text-[#5F6B75] sm:text-[15px]">
                  Guided Launch gets the agreed essentials configured with you so the
                  team is not starting from a blank workspace.
                </p>

                <div className="relative mt-8">
                  <div className="absolute bottom-5 left-[15px] top-5 w-px bg-[#D9E4ED]" />
                  {steps.map(([n, title, copy]) => (
                    <div key={n} className="relative grid grid-cols-[42px_1fr] gap-4 border-b border-[#E4EAF0] py-5 last:border-b-0">
                      <span className="relative z-10 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#2563FF] text-[8px] font-bold text-white shadow-[0_0_0_5px_white]">
                        {n}
                      </span>
                      <div>
                        <div className="text-[14px] font-semibold text-[#303B44]">{title}</div>
                        <p className="mt-1 text-[11px] leading-[1.6] text-[#717D87]">{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[10px] leading-[1.6] text-[#7B8791]">
                  Follow-Through Guided Launch starts from A$1,997 + GST. Larger or more complex moves are scoped separately.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CommercialSection() {
  return (
    <section className="bg-[#F8FAFC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="max-w-[880px]">
          <Eyebrow>CRM included</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            Start with Follow-Through.
            <span className="block text-[#2563FF]">Add Growth when you need it.</span>
          </h2>
          <p className="mt-5 max-w-[680px] text-[15px] leading-[1.72] text-[#606B75] sm:text-[16px]">
            CRM, customer records, inbox, pipelines, calendars and the core operating
            platform are included in both plans.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="flex min-h-[400px] flex-col rounded-[28px] border border-[#D9E2E9] bg-white p-7 sm:p-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#62707C]">Follow-Through</div>
              <h3
                className="mt-5 max-w-[490px] text-[34px] font-medium leading-[0.98] tracking-[-0.05em]"
                style={{ fontFamily: DISPLAY }}
              >
                Stop losing the business already coming to you.
              </h3>
              <ul className="mt-6 space-y-3 text-[11px] font-medium text-[#5D6973]">
                {["CRM and customer records", "Unlimited users", "Unified inbox and pipelines", "Follow-through systems included"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check size={13} className="text-[#2563FF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-9">
                <div className="text-[35px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  A$399
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-[#7A858E]">/mo + GST</span>
                </div>
                <div className="mt-1 text-[10px] text-[#89949D]">Guided Launch from A$1,997 + GST</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex min-h-[400px] flex-col rounded-[28px] bg-[#1E2B29] p-7 text-white sm:p-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#8DB0FF]">Growth</div>
              <h3
                className="mt-5 max-w-[490px] text-[34px] font-medium leading-[0.98] tracking-[-0.05em]"
                style={{ fontFamily: DISPLAY }}
              >
                Turn the database you already have into more revenue.
              </h3>
              <ul className="mt-6 space-y-3 text-[11px] font-medium text-white/62">
                {["Everything in Follow-Through", "Reactivation campaigns", "Repeat and recall campaigns", "Targeted SMS, email and WhatsApp"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <Check size={13} className="text-[#8DB0FF]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-9">
                <div className="text-[35px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>
                  A$699
                  <span className="ml-1 text-[12px] font-medium tracking-normal text-white/45">/mo + GST</span>
                </div>
                <div className="mt-1 text-[10px] text-white/40">Guided Launch from A$2,997 + GST</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-[#D6DFE7] bg-white px-6 text-[13px] font-semibold text-[#111318]"
          >
            View full pricing
          </a>
        </div>
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
        <div className="max-w-[840px] pb-6 pr-10 text-[13.5px] leading-[1.75] text-[#65717B]">
          {a}
        </div>
      ) : null}
    </div>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#2563FF] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute left-[-70px] top-[-90px] h-[320px] w-[320px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute bottom-[-130px] right-[-60px] h-[360px] w-[360px] rounded-full border border-white/10" />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <Reveal>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              One customer story
            </p>
            <h2
              className="mt-4 max-w-[900px] text-[46px] font-medium leading-[0.95] tracking-[-0.06em] sm:text-[62px] lg:text-[76px]"
              style={{ fontFamily: DISPLAY }}
            >
              Know what&apos;s happening.
              <span className="block text-[#DDE7FF]">Know what happens next.</span>
            </h2>
            <p className="mt-5 max-w-[700px] text-[15px] leading-[1.7] text-white/68 sm:text-[16px]">
              We&apos;ll map the customer flow, move the agreed essentials and set up the CRM around how your team actually works.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="lg:justify-self-end">
            <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full border border-white/15 bg-white/[0.08] shadow-[0_18px_46px_rgba(14,51,140,.18)]">
              <ZaplaPetal size={54} />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 border-t border-white/15 pt-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold text-white/55">
              <span>Customer record</span>
              <span>→</span>
              <span>Pipeline</span>
              <span>→</span>
              <span>Next step</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={BOOK_URL}
                className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-[#173A80] transition-transform hover:-translate-y-px"
              >
                Book a Call <ArrowRight size={15} />
              </a>
              <a
                href={PRICING_URL}
                className="inline-flex h-[50px] items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-6 text-[13px] font-semibold text-white"
              >
                View pricing
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
