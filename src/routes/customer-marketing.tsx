import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  Mail,
  MessageSquareText,
  Send,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

export const Route = createFileRoute("/customer-marketing")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer Marketing Software for Small Business | Zapla" },
      {
        name: "description",
        content:
          "Use the customer data already in Zapla to reach relevant customer groups by SMS and email, then keep replies and next steps connected to the same customer record.",
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

const FAQS = [
  {
    q: "What is Customer Marketing in Zapla?",
    a: "Customer Marketing is the proactive side of Zapla. You choose a relevant group of customers already in your database, decide why you want to reach them, and send the message through the channels in your setup.",
  },
  {
    q: "Can I choose which customers receive a message?",
    a: "Yes. Customer fields, tags, filters and saved lists can be used to identify the group you actually want to reach instead of treating the whole database as one audience.",
  },
  {
    q: "Which channels can I use?",
    a: "SMS and email are core customer marketing channels. Other connected channels, including WhatsApp where enabled, depend on the setup you choose and the capabilities available to your account.",
  },
  {
    q: "What happens when someone replies?",
    a: "The reply stays connected to the customer conversation and customer context, so your team can continue from the same record instead of treating the response like a brand new lead.",
  },
  {
    q: "Is Customer Marketing the same as Reopen?",
    a: "No. Reopen specifically targets dormant enquiries, stale opportunities and past customers that have gone quiet. Customer Marketing is broader. It covers proactive campaigns to relevant customer groups for promotions, updates, cross sell and other reasons to start another conversation.",
  },
  {
    q: "Do we need to build everything ourselves?",
    a: "Guided Launch can establish the agreed customer groups, channels and starting setup with you. The goal is to give your team a working system rather than another blank software account.",
  },
] as const;

function CustomerMarketingPage() {
  return (
    <main
      data-page="customer-marketing"
      className="min-h-screen overflow-hidden bg-[#FCFCFA] text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <ProblemAwarenessSection />
      <AudienceSection />
      <ContextSection />
      <ChannelSection />
      <ReasonsSection />
      <ReplyLoopSection />
      <SystemBoundarySection />
      <GrowthStrip />
      <Faq />
      <FinalCta />
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
      transition={{
        duration: reduced ? 0 : 0.48,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
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
        "text-[10px] font-semibold uppercase tracking-[0.21em] " +
        (light ? "text-[#E8B75F]" : "text-[#58706F]")
      }
    >
      {children}
    </p>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function ProductBrand({
  section,
  branded = false,
}: {
  section: string;
  branded?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {branded ? (
        <>
          <img
            src={ZAPLA_WORDMARK_URL}
            alt="Zapla"
            className="h-[18px] w-auto shrink-0 object-contain"
          />
          <span className="h-4 w-px bg-[#D9DEDA]" />
        </>
      ) : null}
      <span className="truncate text-[7px] font-bold uppercase tracking-[0.12em] text-[#7A837D]">
        {section}
      </span>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E1E4E0] bg-[#FCFCFA] px-5 pb-16 pt-[112px] sm:px-10 sm:pb-20 sm:pt-[124px] lg:px-16 lg:pb-24 lg:pt-[134px]">
      <div className="pointer-events-none absolute -left-40 top-36 h-[440px] w-[440px] rounded-full bg-[#D7DFCE]/35 blur-[130px]" />
      <div className="pointer-events-none absolute -right-28 top-20 h-[380px] w-[380px] rounded-full bg-[#2563FF]/[0.045] blur-[120px]" />

      <div className="relative mx-auto max-w-[1420px]">
        <Reveal className="mx-auto max-w-[1030px] text-center">
          <Eyebrow>Customer Marketing</Eyebrow>

          <h1
            className="mx-auto mt-4 max-w-[1000px] text-[48px] font-medium leading-[0.94] tracking-[-0.058em] sm:text-[66px] lg:text-[82px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your customer database should be
            <span className="block text-[#2563FF]">bringing you business.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[790px] text-[16px] leading-[1.72] text-[#606660] sm:text-[18px]">
            Use the customer details already in Zapla to reach the right group with a relevant message, then keep every reply and next step connected to the same customer record.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButton />
            <a
              href="#how-it-works"
              className="inline-flex h-[50px] items-center rounded-full border border-[#D9DEDA] bg-white/80 px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BFC7C1]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-12 sm:mt-14" delay={0.05}>
          <HeroFlow />
        </Reveal>
      </div>
    </section>
  );
}

function HeroFlow() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative mx-auto max-w-[1280px]">
      <div className="absolute inset-x-[9%] bottom-0 top-[18%] rounded-[34px] bg-[#CFD8C4]" />

      <div className="relative grid gap-4 p-3 sm:p-5 lg:grid-cols-[0.96fr_1.03fr_1.01fr] lg:gap-5 lg:p-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
          className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#FCFCFB] shadow-[0_24px_70px_rgba(39,44,38,.10)]"
        >
          <div className="flex min-h-[44px] items-center border-b border-[#E0E4DF] px-4">
            <ProductBrand section="Smart list" branded />
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A817D]">
                  Audience
                </div>
                <div className="mt-1 text-[18px] font-semibold tracking-[-0.025em]">
                  Existing customers
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#99A36D]/18 text-[#66724E]">
                <Users size={18} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <FilterRow icon={<Tag size={13} />} label="Tag" value="Existing customer" />
              <FilterRow icon={<SlidersHorizontal size={13} />} label="Service" value="Residential" />
              <FilterRow icon={<Filter size={13} />} label="Location" value="Sydney" />
            </div>

            <div className="mt-6 flex items-center justify-between rounded-[14px] bg-[#F2F4EE] px-4 py-3">
              <span className="text-[11px] font-medium text-[#5D665A]">Relevant customers</span>
              <span className="text-[17px] font-semibold tracking-[-0.03em]">86</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.08, ease: EASE }}
          className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-[0_24px_70px_rgba(39,44,38,.11)]"
        >
          <div className="flex min-h-[44px] items-center justify-between border-b border-[#E0E4DF] px-4">
            <ProductBrand section="Customer Marketing" />
            <span className="rounded-full bg-[#2563FF]/8 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">
              SMS
            </span>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7A817D]">
              Message
            </div>
            <div className="mt-4 rounded-[18px] bg-[#F4F6FA] p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#263431] text-[11px] font-bold text-white">
                  N
                </div>
                <div>
                  <div className="text-[12px] font-semibold">Northside</div>
                  <div className="text-[9px] text-[#858B86]">Customer update</div>
                </div>
              </div>
              <p className="mt-4 text-[12px] leading-[1.6] text-[#434A46]">
                Hi Mia, we have opened extra service appointments next week. If you need us again, I can send through the available times.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#68706B]">
                <Send size={13} />
                Ready for selected audience
              </div>
              <div className="rounded-full bg-[#1E2B29] px-3 py-2 text-[9px] font-semibold text-white">
                Send
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : 0.16, ease: EASE }}
          className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-[#FCFCFB] shadow-[0_24px_70px_rgba(39,44,38,.10)]"
        >
          <div className="flex min-h-[44px] items-center border-b border-[#E0E4DF] px-4">
            <ProductBrand section="Conversation" />
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E9DED3] text-[12px] font-semibold text-[#544941]">
                MT
              </div>
              <div>
                <div className="text-[13px] font-semibold">Mia Thompson</div>
                <div className="text-[9px] text-[#858B86]">Existing customer · Residential</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="ml-auto max-w-[88%] rounded-[16px] rounded-br-[5px] bg-[#E9EEF9] px-4 py-3 text-[11px] leading-[1.55] text-[#3C4652]">
                We have extra service appointments next week. Want the available times?
              </div>
              <div className="max-w-[88%] rounded-[16px] rounded-bl-[5px] bg-[#F1F2EE] px-4 py-3 text-[11px] leading-[1.55] text-[#3F4742]">
                Yes please. Thursday would be best.
              </div>
            </div>

            <div className="mt-6 rounded-[14px] border border-[#E0E3DE] bg-white px-4 py-3">
              <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#84908A]">Same customer record</div>
              <div className="mt-1.5 text-[11px] font-semibold text-[#313834]">
                Reply ready for your team
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FilterRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[12px] border border-[#E1E5E1] bg-white px-3 py-3">
      <div className="flex items-center gap-2 text-[#7C857F]">
        {icon}
        <span className="text-[9px] font-semibold uppercase tracking-[0.11em]">{label}</span>
      </div>
      <span className="text-[10px] font-semibold text-[#353C38]">{value}</span>
    </div>
  );
}

function ProblemAwarenessSection() {
  const reduced = !!useReducedMotion();

  const dormantRows = [
    { name: "Mia Thompson", detail: "Existing customer · Residential", state: "No recent outreach" },
    { name: "Daniel Kim", detail: "Existing customer · Residential", state: "No recent outreach" },
    { name: "Priya Shah", detail: "Existing customer · Commercial", state: "No recent outreach" },
    { name: "Lucas Martin", detail: "Existing customer · Residential", state: "No recent outreach" },
    { name: "Sophie Nguyen", detail: "Existing customer · Residential", state: "No recent outreach" },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-[#DFE3DE] bg-[#F7F8F5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-28 top-20 h-[360px] w-[360px] rounded-full bg-[#C9795B]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-[#99A36D]/12 blur-[130px]" />

      <div className="relative mx-auto max-w-[1320px]">
        <Reveal className="max-w-[860px]">
          <Eyebrow>The problem</Eyebrow>
          <h2
            className="mt-4 text-[39px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[50px] lg:text-[60px]"
            style={{ fontFamily: DISPLAY }}
          >
            You already did the work
            <span className="block">to win these customers.</span>
            <span className="block text-[#A8644E]">Most databases barely get used.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-start lg:gap-14">
          <Reveal className="border-y border-[#DDE1DC]">
            <ProblemPoint
              index="01"
              title="They sit there."
              copy="Customers only hear from you when someone remembers to send something."
            />
            <ProblemPoint
              index="02"
              title="Everyone gets the same message."
              copy="Because the marketing tool often does not know what actually happened with the customer."
            />
            <ProblemPoint
              index="03"
              title="New leads get all the attention."
              copy="While customers who already know the business rarely get another relevant reason to return."
              last
            />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-[24px] border border-[#DDE1DC] bg-white shadow-[0_30px_80px_rgba(69,55,43,.08)]">
              <div className="flex min-h-[48px] items-center justify-between border-b border-[#E2E6E1] px-4 sm:px-5">
                <ProductBrand section="Customer database" />
                <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#9A9188]">
                  Existing customers
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto] border-b border-[#E5E8E4] bg-[#F7F8F5] px-4 py-3 sm:px-5">
                <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#91887F]">
                  Customer
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#91887F]">
                  Marketing activity
                </span>
              </div>

              <div className="divide-y divide-[#E7EAE6]">
                {dormantRows.map((row, index) => (
                  <motion.div
                    key={row.name}
                    initial={reduced ? false : { opacity: 0.35, x: 8 }}
                    whileInView={{ opacity: index === 1 ? 0.95 : 0.48, x: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{
                      duration: reduced ? 0 : 0.34,
                      delay: reduced ? 0 : index * 0.055,
                      ease: EASE,
                    }}
                    className="grid grid-cols-[1fr_auto] items-center gap-5 px-4 py-4 sm:px-5"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-[#39403C]">{row.name}</div>
                      <div className="mt-1 text-[8.5px] text-[#8A8F8A]">{row.detail}</div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-semibold text-[#9A8B81]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C58A72]" />
                      {row.state}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-[#E1E5E0] bg-[#1E2B29] px-5 py-4 text-[#F7F4EE]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold">The customer data is already here.</span>
                  <span className="text-[9px] text-white/55">The opportunity is using it deliberately.</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProblemPoint({
  index,
  title,
  copy,
  last = false,
}: {
  index: string;
  title: string;
  copy: string;
  last?: boolean;
}) {
  return (
    <div className={"grid gap-4 py-6 sm:grid-cols-[56px_1fr] sm:gap-5 " + (last ? "" : "border-b border-[#DDE1DC]")}>
      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9B7A69]">{index}</span>
      <div>
        <h3
          className="text-[25px] font-medium tracking-[-0.04em] text-[#242824] sm:text-[29px]"
          style={{ fontFamily: DISPLAY }}
        >
          {title}
        </h3>
        <p className="mt-2 max-w-[470px] text-[13px] leading-[1.65] text-[#6F6B66] sm:text-[14px]">
          {copy}
        </p>
      </div>
    </div>
  );
}

function AudienceSection() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1340px] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <Reveal className="max-w-[560px]">
          <Eyebrow>Choose the audience</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your customer list
            <span className="block text-[#6E7867]">isn't one audience.</span>
          </h2>
          <p className="mt-6 max-w-[530px] text-[15px] leading-[1.75] text-[#656B65] sm:text-[16px]">
            Service type, location, tags, customer status and other information can change what is relevant to each person. Use the customer data already attached to the record to build the group you actually want to reach.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <AudienceWorkbench />
        </Reveal>
      </div>
    </section>
  );
}

function AudienceWorkbench() {
  const reduced = !!useReducedMotion();

  const rows = [
    { name: "Mia Thompson", detail: "Residential · Sydney", selected: true },
    { name: "Daniel Kim", detail: "Residential · Sydney", selected: true },
    { name: "Priya Shah", detail: "Commercial · Sydney", selected: false },
    { name: "Lucas Martin", detail: "Residential · Newcastle", selected: false },
    { name: "Sophie Nguyen", detail: "Residential · Sydney", selected: true },
  ];

  return (
    <div className="overflow-hidden rounded-[25px] border border-[#D8DDD7] bg-white shadow-[0_28px_80px_rgba(42,47,41,.09)]">
      <div className="flex min-h-[46px] items-center justify-between border-b border-[#E3E6E2] bg-[#FCFCFB] px-4 sm:px-5">
        <ProductBrand section="Contacts" />
        <div className="hidden items-center gap-4 text-[8px] font-bold uppercase tracking-[0.11em] text-[#7E8680] sm:flex">
          <span>Fields</span>
          <span>Tags</span>
          <span>Smart lists</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="border-b border-[#E5E8E4] bg-[#F7F8F4] p-4 lg:border-b-0 lg:border-r">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7D867F]">Audience rules</div>
          <div className="mt-4 space-y-2.5">
            <FilterPill label="Tag" value="Existing customer" />
            <FilterPill label="Service" value="Residential" />
            <FilterPill label="Location" value="Sydney" />
          </div>

          <div className="mt-5 rounded-[13px] bg-[#DDE5D4] p-3">
            <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#64705C]">Smart list</div>
            <div className="mt-1.5 text-[11px] font-semibold">Residential Sydney</div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-end justify-between gap-4 border-b border-[#E6E9E5] pb-4">
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#858D87]">Matching customers</div>
              <div className="mt-1 text-[24px] font-semibold tracking-[-0.04em]">86</div>
            </div>
            <span className="text-[9px] font-semibold text-[#6B736D]">Match all conditions</span>
          </div>

          <div className="divide-y divide-[#E9EBE8]">
            {rows.map((row, index) => (
              <motion.div
                key={row.name}
                initial={reduced ? false : { opacity: 0, x: 8 }}
                whileInView={{ opacity: row.selected ? 1 : 0.45, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : index * 0.04 }}
                className="flex items-center justify-between gap-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={
                      "grid h-5 w-5 place-items-center rounded-full border " +
                      (row.selected
                        ? "border-[#7D8B69] bg-[#99A36D]/18 text-[#66734F]"
                        : "border-[#D6DAD5] text-transparent")
                    }
                  >
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold text-[#303733]">{row.name}</div>
                    <div className="mt-0.5 text-[9px] text-[#858C87]">{row.detail}</div>
                  </div>
                </div>
                {row.selected ? (
                  <span className="rounded-full bg-[#F0F3EC] px-2.5 py-1 text-[8px] font-semibold text-[#68735E]">
                    Included
                  </span>
                ) : (
                  <span className="text-[8px] font-semibold text-[#A0A6A1]">Excluded</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-[#DEE2DC] bg-white px-3 py-2.5">
      <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#8A918C]">{label}</div>
      <div className="mt-1 text-[10px] font-semibold text-[#39413C]">{value}</div>
    </div>
  );
}

function ContextSection() {
  return (
    <section className="relative overflow-hidden bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-8 h-[440px] w-[440px] rounded-full bg-[#2563FF]/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1340px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="max-w-[600px]">
          <Eyebrow light>Connected context</Eyebrow>
          <h2
            className="mt-4 text-[45px] font-medium leading-[0.95] tracking-[-0.056em] sm:text-[60px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            Market to customers
            <span className="block text-[#AFC3FF]">like you know them.</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.75] text-white/62 sm:text-[16px]">
            Customer Marketing starts with the information already attached to the customer. The same record can carry the context your team uses before the message, during the conversation and after someone replies.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <CustomerContextCard />
        </Reveal>
      </div>
    </section>
  );
}

function CustomerContextCard() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-white/12 bg-[#F9FAF7] text-[#111318] shadow-[0_30px_90px_rgba(0,0,0,.24)]">
      <div className="flex min-h-[46px] items-center justify-between border-b border-[#E0E4DF] px-4 sm:px-5">
        <ProductBrand section="Customer record" />
        <span className="rounded-full bg-[#2563FF]/9 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">
          Context connected
        </span>
      </div>

      <div className="grid md:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-[#E1E5E0] p-5 md:border-b-0 md:border-r sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#E8DCCF] text-[12px] font-semibold text-[#524942]">
              MT
            </div>
            <div>
              <div className="text-[14px] font-semibold">Mia Thompson</div>
              <div className="mt-0.5 text-[9px] text-[#858B86]">Existing customer</div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <ContextRow label="Service" value="Residential" />
            <ContextRow label="Location" value="Sydney" />
            <ContextRow label="Tags" value="VIP · Existing customer" />
            <ContextRow label="Last activity" value="Service completed" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7C8580]">
            Relevant customer communication
          </div>

          <div className="mt-4 rounded-[17px] border border-[#DDE2DD] bg-white p-4">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#2563FF]" />
              <span className="text-[10px] font-semibold">Service update</span>
            </div>
            <p className="mt-3 text-[11px] leading-[1.6] text-[#535B56]">
              Hi Mia, we have added extra appointment availability for existing residential customers next week.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[9px] font-semibold text-[#6D756F]">
            <Sparkles size={12} className="text-[#B27B2D]" />
            Customer context stays attached to the conversation
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E4E7E3] pb-2.5">
      <span className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#8A918D]">{label}</span>
      <span className="text-right text-[10px] font-semibold text-[#3A423D]">{value}</span>
    </div>
  );
}

function ChannelSection() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-7 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Channels</Eyebrow>
            <h2
              className="mt-4 max-w-[760px] text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              SMS and email are channels.
              <span className="block text-[#A66F20]">Relevance is the strategy.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[15px] leading-[1.75] text-[#68635E] sm:text-[16px] lg:pb-2">
            Pick the customer group first. Then use the channel that fits the message. The customer stays the same even when the communication changes.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.05}>
          <ChannelSwitcher />
        </Reveal>
      </div>
    </section>
  );
}

function ChannelSwitcher() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-[#DDE1DC] bg-white shadow-[0_24px_70px_rgba(55,44,33,.08)]">
      <div className="grid lg:grid-cols-[0.55fr_1.45fr]">
        <div className="border-b border-[#E2E5E1] bg-[#F7F8F5] p-5 lg:border-b-0 lg:border-r lg:border-[#E2E5E1] sm:p-6">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#81786E]">Send through</div>
          <div className="mt-5 space-y-2">
            <ChannelChoice icon={<MessageSquareText size={15} />} label="SMS" active />
            <ChannelChoice icon={<Mail size={15} />} label="Email" />
            <ChannelChoice icon={<Send size={15} />} label="WhatsApp where enabled" muted />
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-[1fr_0.92fr] sm:p-7">
          <div className="rounded-[20px] border border-[#E0E4DF] bg-white p-5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#858078]">Audience</div>
            <div className="mt-2 text-[20px] font-semibold tracking-[-0.03em]">Residential Sydney</div>
            <div className="mt-1 text-[10px] text-[#817C75]">86 customers</div>

            <div className="mt-6 space-y-2.5">
              <MiniRule label="Tag" value="Existing customer" />
              <MiniRule label="Service" value="Residential" />
              <MiniRule label="Location" value="Sydney" />
            </div>
          </div>

          <div className="rounded-[20px] bg-[#1E2B29] p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/46">SMS preview</div>
              <MessageSquareText size={15} className="text-[#AFC3FF]" />
            </div>

            <div className="mt-6 rounded-[17px] bg-white/9 p-4">
              <div className="text-[10px] font-semibold text-white/88">Northside</div>
              <p className="mt-3 text-[11px] leading-[1.65] text-white/65">
                Hi Mia, we have opened extra service appointments next week. Reply if you'd like the available times.
              </p>
            </div>

            <div className="mt-5 text-[9px] font-medium text-white/42">
              Same customer. Same context. Different channel.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelChoice({
  icon,
  label,
  active = false,
  muted = false,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-[13px] border px-3.5 py-3 " +
        (active
          ? "border-[#9BAA8B] bg-white text-[#354034]"
          : muted
            ? "border-[#E0E4DF] bg-[#F6F8F5] text-[#938C84]"
            : "border-[#E0E4DF] bg-white/70 text-[#555B56]")
      }
    >
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
      {active ? <span className="ml-auto h-2 w-2 rounded-full bg-[#99A36D]" /> : null}
    </div>
  );
}

function MiniRule({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#E7EAE6] pb-2.5">
      <span className="text-[8px] font-bold uppercase tracking-[0.11em] text-[#918A82]">{label}</span>
      <span className="text-[9px] font-semibold text-[#4B514D]">{value}</span>
    </div>
  );
}

function ReasonsSection() {
  const moments = [
    {
      context: "Existing residential customers",
      why: "Seasonal availability",
      action: "Offer the service to the customers it actually suits.",
      tone: "#BF7458",
    },
    {
      context: "Customers who already bought one service",
      why: "New service or cross sell",
      action: "Create another relevant reason to buy.",
      tone: "#A66F20",
    },
    {
      context: "Customers affected by a change",
      why: "Customer update",
      action: "Tell the right group without rebuilding a separate list.",
      tone: "#2563FF",
    },
    {
      context: "Past customers worth contacting again",
      why: "Re engagement",
      action: "Start another conversation when the timing makes sense.",
      tone: "#7C8868",
    },
  ];

  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-end lg:gap-16">
          <div className="max-w-[860px]">
            <Eyebrow>Reasons to reach out</Eyebrow>
            <h2
              className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[58px] lg:text-[68px]"
              style={{ fontFamily: DISPLAY }}
            >
              Different customers.
              <span className="block text-[#717770]">Different reasons to get back in touch.</span>
            </h2>
          </div>
          <p className="max-w-[490px] text-[14px] leading-[1.75] text-[#6C726C] sm:text-[15px] lg:pb-2">
            Customer Marketing is not one generic blast. The customer context helps decide who should hear from you and why.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.05}>
          <div className="overflow-hidden rounded-[25px] border border-[#D9DDD7] bg-white shadow-[0_26px_75px_rgba(45,50,44,.07)]">
            <div className="grid border-b border-[#E1E4E0] bg-[#F7F8F5] px-5 py-3 md:grid-cols-[1fr_.72fr_1.18fr] md:gap-6 sm:px-6">
              <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A]">Customer context</span>
              <span className="hidden text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A] md:block">Why now</span>
              <span className="hidden text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A] md:block">What that creates</span>
            </div>

            <div className="divide-y divide-[#E5E8E4]">
              {moments.map((moment, index) => (
                <Reveal key={moment.why} delay={index * 0.025}>
                  <div className="relative grid gap-4 px-5 py-6 md:grid-cols-[1fr_.72fr_1.18fr] md:items-center md:gap-6 sm:px-6 sm:py-7">
                    <span
                      className="absolute bottom-0 left-0 top-0 w-[3px]"
                      style={{ backgroundColor: moment.tone }}
                    />
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#929994] md:hidden">
                        Customer context
                      </div>
                      <div className="mt-1 text-[15px] font-semibold tracking-[-0.025em] text-[#313733] sm:text-[16px]">
                        {moment.context}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#929994] md:hidden">
                        Why now
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.11em] text-[#626A64]">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: moment.tone }} />
                        {moment.why}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#929994] md:hidden">
                        What that creates
                      </div>
                      <p className="mt-1 text-[13px] leading-[1.65] text-[#666E68] sm:text-[14px]">
                        {moment.action}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E0E4DF] bg-[#1E2B29] px-5 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <span className="text-[10px] font-semibold text-white/90">
                One customer database. Multiple reasons to create the next conversation.
              </span>
              <a href="/reactivation" className="inline-flex items-center gap-1.5 text-[9px] font-semibold text-white/62">
                Old enquiries or stale opportunities? See Reopen <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReplyLoopSection() {
  return (
    <section className="overflow-hidden bg-[#EEF2EA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <Reveal className="max-w-[570px]">
          <Eyebrow>After send</Eyebrow>
          <h2
            className="mt-4 text-[44px] font-medium leading-[0.96] tracking-[-0.056em] sm:text-[58px] lg:text-[70px]"
            style={{ fontFamily: DISPLAY }}
          >
            When someone replies,
            <span className="block text-[#59694F]">it stops being a campaign.</span>
          </h2>
          <p className="mt-6 max-w-[540px] text-[15px] leading-[1.75] text-[#646C62] sm:text-[16px]">
            It becomes a customer conversation. The response returns to the same connected customer environment so your team can continue with the context in front of them.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ReplyLoopVisual />
        </Reveal>
      </div>
    </section>
  );
}

function ReplyLoopVisual() {
  const reduced = !!useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[34px] bg-[#99A36D]/16" />

      <div className="relative overflow-hidden rounded-[26px] border border-[#D4DDD0] bg-white shadow-[0_28px_80px_rgba(49,60,45,.10)]">
        <div className="flex min-h-[46px] items-center justify-between border-b border-[#E1E6DE] px-4 sm:px-5">
          <ProductBrand section="Conversation" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DDE7D7] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.11em] text-[#5A6D51]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6D845E]" />
            Reply received
          </span>
        </div>

        <div className="grid md:grid-cols-[0.78fr_1.22fr]">
          <div className="border-b border-[#E2E7DF] bg-[#F8FAF6] p-5 md:border-b-0 md:border-r sm:p-6">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#E8DCCF] text-[12px] font-semibold text-[#524942]">
              MT
            </div>
            <div className="mt-3 text-[14px] font-semibold">Mia Thompson</div>
            <div className="mt-1 text-[9px] text-[#848D84]">Existing customer · Residential</div>

            <div className="mt-6 space-y-3">
              <ContextRow label="Campaign" value="Service availability" />
              <ContextRow label="Channel" value="SMS" />
              <ContextRow label="Owner" value="Ben Walker" />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
              className="ml-auto max-w-[84%] rounded-[17px] rounded-br-[5px] bg-[#E9EEF9] px-4 py-3"
            >
              <div className="text-[11px] leading-[1.6] text-[#424B57]">
                Hi Mia, we have extra service appointments next week. Want the available times?
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : 0.12, ease: EASE }}
              className="mt-3 max-w-[84%] rounded-[17px] rounded-bl-[5px] bg-[#EEF1EB] px-4 py-3"
            >
              <div className="text-[11px] leading-[1.6] text-[#424A44]">
                Yes please. Thursday would be best.
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : 0.22, ease: EASE }}
              className="mt-6 rounded-[16px] border border-[#DCE3D7] bg-[#F8FAF6] p-4"
            >
              <div className="flex items-center gap-2">
                <Check size={14} className="text-[#657856]" />
                <span className="text-[10px] font-semibold text-[#354033]">Customer context stays attached</span>
              </div>
              <div className="mt-2 text-[9px] leading-[1.55] text-[#7B8479]">
                Same customer record. Same history. Your team continues the conversation.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemBoundarySection() {
  return (
    <section className="border-y border-[#DFE2DD] bg-[#F7F8F5] px-5 py-10 sm:px-10 sm:py-12 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1220px] gap-7 md:grid-cols-[0.72fr_1.28fr] md:items-center md:gap-12">
        <div>
          <Eyebrow>Where it fits</Eyebrow>
          <h2
            className="mt-3 text-[30px] font-medium leading-[1.02] tracking-[-0.045em] text-[#252A26] sm:text-[36px]"
            style={{ fontFamily: DISPLAY }}
          >
            Two different jobs.
            <span className="block text-[#747C75]">One customer system.</span>
          </h2>
        </div>

        <div className="grid overflow-hidden rounded-[18px] border border-[#DBDFDA] bg-white sm:grid-cols-2">
          <div className="border-b border-[#E1E4E0] p-5 sm:border-b-0 sm:border-r">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#C96F55]">
              Demand already came in
            </div>
            <div className="mt-2 text-[19px] font-semibold tracking-[-0.03em]">Follow-Up</div>
            <p className="mt-2 text-[11px] leading-[1.55] text-[#707670]">
              Keep an expected next step moving after an enquiry, booking, quote or active conversation.
            </p>
            <a href="/follow-up" className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#39423D]">
              See Follow-Up <ArrowRight size={11} />
            </a>
          </div>

          <div className="bg-[#F1F4EE] p-5">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#63745A]">
              You choose who to contact
            </div>
            <div className="mt-2 text-[19px] font-semibold tracking-[-0.03em]">Customer Marketing</div>
            <p className="mt-2 text-[11px] leading-[1.55] text-[#687167]">
              Choose a relevant customer group and create a new reason to start a conversation.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-semibold text-[#526348]">
              <Check size={11} /> You are here
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function GrowthStrip() {
  return (
    <section className="bg-[#EEF1ED] px-5 py-12 sm:px-10 sm:py-14 lg:px-16">
      <Reveal className="mx-auto flex max-w-[1220px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#667069]">Zapla Growth</div>
          <h2
            className="mt-2 text-[30px] font-medium tracking-[-0.045em] text-[#252823] sm:text-[36px]"
            style={{ fontFamily: DISPLAY }}
          >
            Customer Marketing is part of Growth.
          </h2>
          <p className="mt-2 max-w-[720px] text-[13px] leading-[1.65] text-[#69716B]">
            Growth adds proactive customer marketing and database reactivation to the follow-through system.
          </p>
        </div>

        <a
          href={PRICING_URL}
          className="inline-flex h-[48px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[12.5px] font-semibold text-[#F7F4EE]"
        >
          View Growth pricing <ArrowRight size={14} />
        </a>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-[#F7F8F5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-18">
        <Reveal className="self-start lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow>Questions</Eyebrow>
          <h2
            className="mt-4 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[54px]"
            style={{ fontFamily: DISPLAY }}
          >
            The practical stuff.
          </h2>
          <p className="mt-5 max-w-[360px] text-[14px] leading-[1.7] text-[#73736C]">
            Need to see how this fits your database?{" "}
            <a href={BOOK_URL} className="font-semibold text-[#1E2B29] underline decoration-[#DDA34B] decoration-2 underline-offset-4">
              Ask us on a call.
            </a>
          </p>
        </Reveal>

        <div className="border-y border-[#DDE1DC]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-b border-[#DDE1DC] last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  onClick={() => setOpen(active ? null : index)}
                  aria-expanded={active}
                >
                  <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#272B27] sm:text-[17px]">
                    {item.q}
                  </span>
                  <motion.span
                    className={
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border " +
                      (active
                        ? "border-[#1E2B29] bg-[#1E2B29] text-[#F7F4EE]"
                        : "border-[#D8D1C8] bg-[#FCFCFA] text-[#4D534E]")
                    }
                    animate={reduced ? undefined : { rotate: active ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                  >
                    <ChevronDown size={15} strokeWidth={1.6} />
                  </motion.span>
                </button>

                <motion.div
                  className="grid overflow-hidden"
                  initial={false}
                  animate={{
                    gridTemplateRows: active ? "1fr" : "0fr",
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ duration: reduced ? 0 : 0.24, ease: EASE }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[760px] pb-7 pr-12 text-[14px] leading-[1.75] text-[#696F69]">
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

function FinalCta() {
  return (
    <section className="bg-[#FCFCFA] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <Reveal className="mx-auto max-w-[1080px] text-center">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>

        <div className="mt-5">
          <Eyebrow>Put your customer data to work</Eyebrow>
        </div>

        <h2
          className="mx-auto mt-3 max-w-[940px] text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[56px] lg:text-[64px]"
          style={{ fontFamily: DISPLAY }}
        >
          Your next customer conversation
          <span className="block text-[#2563FF]">may already be in your CRM.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.68] text-[#5F655F] sm:text-[16px]">
          Choose who you want to reach and why. We’ll show you how Zapla can turn the customer information you already have into relevant outreach without disconnecting it from the rest of the customer journey.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton />
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#DDE2DE] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#C6CEC8] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
