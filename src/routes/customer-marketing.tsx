import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageSquareText,
  Send,
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
    a: "It is the proactive side of Zapla: choose a relevant customer group, send a useful message, and keep the response connected to the same customer record.",
  },
  {
    q: "Can I choose which customers receive a message?",
    a: "Yes. Fields, tags, filters and saved lists can define who is included instead of treating the whole database as one audience.",
  },
  {
    q: "Which channels can I use?",
    a: "SMS and email are core channels. Other connected channels, including WhatsApp where enabled, depend on your setup.",
  },
  {
    q: "What happens when someone replies?",
    a: "The reply returns to the customer conversation with the existing context attached, so your team can continue from there.",
  },
  {
    q: "Is Customer Marketing the same as Reopen?",
    a: "No. Reopen focuses on dormant enquiries and stale opportunities. Customer Marketing is broader proactive outreach to relevant customer groups.",
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
      <HowItWorksSection />
      <ReasonsSection />
      <ReplyLoopSection />
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
    <section className="relative overflow-hidden border-b border-[#E3E6E2] bg-[#FCFCFA] px-5 pb-16 pt-[108px] sm:px-10 sm:pb-20 sm:pt-[116px] lg:px-16 lg:pb-22 lg:pt-[120px]">
      <div className="pointer-events-none absolute -left-40 top-28 h-[420px] w-[420px] rounded-full bg-[#D7DFCE]/22 blur-[140px]" />
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <Reveal className="max-w-[610px]">
          <Eyebrow>Customer Marketing</Eyebrow>
          <h1
            className="mt-5 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[50px] lg:text-[58px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your customer database should be
            <span className="block text-[#2563FF]">bringing you business.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-[15px] leading-[1.7] text-[#606660] sm:text-[17px]">
            Reach the right customers with a relevant message, then keep every reply connected to the same customer record.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a
              href="#how-it-works"
              className="inline-flex h-[50px] items-center rounded-full border border-[#D9DEDA] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BFC7C1]"
            >
              See how it works
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <HeroJourneyVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroJourneyVisual() {
  const reduced = !!useReducedMotion();

  const steps = [
    { label: "Audience", value: "Residential Sydney", meta: "86 relevant customers" },
    { label: "Message", value: "Service availability", meta: "SMS" },
    { label: "Reply", value: "Thursday works", meta: "Back on the customer record" },
  ];

  return (
    <div className="relative mx-auto max-w-[760px]">
      <div className="flex min-h-[44px] items-center justify-between border-y border-[#E0E4DF] px-1 py-3">
        <ProductBrand section="Customer marketing" branded />
        <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#8A918C]">
          Audience → message → reply
        </span>
      </div>

      <div className="grid divide-y divide-[#E4E7E3] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : index * 0.08, ease: EASE }}
            className="min-h-[220px] px-5 py-6 sm:px-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#7A837D]">
                {String(index + 1).padStart(2, "0")} · {step.label}
              </span>
              {index === 0 ? <Users size={15} className="text-[#73806B]" /> : null}
              {index === 1 ? <Send size={15} className="text-[#2563FF]" /> : null}
              {index === 2 ? <MessageSquareText size={15} className="text-[#73806B]" /> : null}
            </div>

            {index === 0 ? (
              <div className="mt-7 space-y-3">
                {["Existing customer", "Residential", "Sydney"].map((item) => (
                  <div key={item} className="flex items-center justify-between border-b border-[#E7EAE6] pb-2.5 text-[10px]">
                    <span className="text-[#8B928D]">{item}</span>
                    <Check size={12} className="text-[#73806B]" />
                  </div>
                ))}
              </div>
            ) : null}

            {index === 1 ? (
              <div className="mt-7">
                <div className="rounded-[14px] bg-[#F1F4F8] px-4 py-3.5 text-[11px] leading-[1.55] text-[#48515B]">
                  Hi Mia, we have extra service appointments next week. Want the available times?
                </div>
              </div>
            ) : null}

            {index === 2 ? (
              <div className="mt-7 space-y-2.5">
                <div className="max-w-[90%] rounded-[13px] rounded-bl-[4px] bg-[#EEF1EB] px-4 py-3 text-[11px] text-[#485048]">
                  Yes please. Thursday would be best.
                </div>
                <div className="text-[9px] font-semibold text-[#6B756C]">Same customer record</div>
              </div>
            ) : null}

            <div className="mt-6">
              <div className="text-[14px] font-semibold tracking-[-0.025em]">{step.value}</div>
              <div className="mt-1 text-[9px] text-[#8B928D]">{step.meta}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProblemAwarenessSection() {
  const rows = [
    ["Mia Thompson", "Existing customer", "No recent outreach"],
    ["Daniel Kim", "Existing customer", "No recent outreach"],
    ["Priya Shah", "Commercial customer", "No recent outreach"],
    ["Lucas Martin", "Existing customer", "No recent outreach"],
    ["Sophie Nguyen", "Existing customer", "No recent outreach"],
  ] as const;

  return (
    <section className="bg-[#F7F8F5] px-5 py-18 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-18">
        <Reveal className="max-w-[540px]">
          <Eyebrow>The problem</Eyebrow>
          <h2
            className="mt-4 text-[36px] font-medium leading-[1.02] tracking-[-0.048em] sm:text-[42px] lg:text-[46px]"
            style={{ fontFamily: DISPLAY }}
          >
            You already did the work to win these customers.
            <span className="mt-2 block text-[#A8644E]">Most databases barely get used.</span>
          </h2>

          <div className="mt-8 space-y-5 border-l border-[#CCD3CC] pl-5">
            <ProblemLine title="They sit there." copy="Customers hear from you only when someone remembers." />
            <ProblemLine title="Everyone gets the same message." copy="The customer context never makes it into the marketing." />
            <ProblemLine title="New leads get the attention." copy="Existing customers rarely get another relevant reason to return." />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="border-y border-[#DDE2DD]">
            <div className="grid grid-cols-[1fr_auto] py-3 text-[8px] font-bold uppercase tracking-[0.13em] text-[#8A928C]">
              <span>Customer database</span>
              <span>Marketing activity</span>
            </div>
            {rows.map(([name, detail, state], index) => (
              <div
                key={name}
                className={"grid grid-cols-[1fr_auto] items-center gap-6 border-t border-[#E4E8E3] py-4 " + (index === 1 ? "opacity-95" : "opacity-55")}
              >
                <div>
                  <div className="text-[12px] font-semibold text-[#333A36]">{name}</div>
                  <div className="mt-1 text-[9px] text-[#8A918C]">{detail}</div>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-semibold text-[#9A8B81]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C58A72]" />
                  {state}
                </div>
              </div>
            ))}
            <div className="border-t border-[#DDE2DD] py-4 text-[11px] font-semibold text-[#3C463F]">
              The data is already there. The missed opportunity is not using it deliberately.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProblemLine({ title, copy }: { title: string; copy: string }) {
  return (
    <div>
      <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-[#252A26]">{title}</h3>
      <p className="mt-1 text-[13px] leading-[1.6] text-[#6C726C]">{copy}</p>
    </div>
  );
}

function HowItWorksSection() {
  const reduced = !!useReducedMotion();

  return (
    <section id="how-it-works" className="bg-[#1E2B29] px-5 py-18 text-white sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1260px]">
        <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div className="max-w-[650px]">
            <Eyebrow light>How it works</Eyebrow>
            <h2
              className="mt-4 text-[36px] font-medium leading-[1.02] tracking-[-0.048em] sm:text-[42px] lg:text-[46px]"
              style={{ fontFamily: DISPLAY }}
            >
              The context in your CRM decides
              <span className="block text-[#AFC3FF]">who should hear from you.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[14px] leading-[1.7] text-white/60 sm:text-[15px]">
            Choose the audience from customer data, use the right channel, and keep the reply attached to the same record.
          </p>
        </Reveal>

        <div className="mt-12 grid border-y border-white/12 lg:grid-cols-3">
          <HowStep
            index="01"
            title="Select"
            copy="Use fields, tags, location, service type or saved lists to narrow the audience."
          >
            <div className="mt-6 space-y-2.5">
              {[
                ["Existing customer", true],
                ["Residential", true],
                ["Sydney", true],
              ].map(([label]) => (
                <div key={String(label)} className="flex items-center justify-between border-b border-white/10 pb-2.5 text-[10px] text-white/66">
                  <span>{label}</span>
                  <Check size={12} className="text-[#B8C9A9]" />
                </div>
              ))}
            </div>
          </HowStep>

          <HowStep
            index="02"
            title="Reach"
            copy="Use SMS or email for the message. Other connected channels depend on your setup."
          >
            <div className="mt-6 flex gap-3">
              <div className="flex items-center gap-2 border-b border-[#AFC3FF] pb-2 text-[10px] font-semibold text-white">
                <MessageSquareText size={14} /> SMS
              </div>
              <div className="flex items-center gap-2 border-b border-white/15 pb-2 text-[10px] text-white/48">
                <Mail size={14} /> Email
              </div>
            </div>
            <div className="mt-5 max-w-[280px] rounded-[14px] bg-white/[0.07] px-4 py-3 text-[11px] leading-[1.55] text-white/68">
              Hi Mia, we have extra service appointments next week. Want the available times?
            </div>
          </HowStep>

          <HowStep
            index="03"
            title="Continue"
            copy="When someone replies, the conversation returns with the customer context still attached."
            last
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.34, ease: EASE }}
              className="mt-6 max-w-[290px]"
            >
              <div className="rounded-[14px] bg-white/[0.09] px-4 py-3 text-[11px] text-white/72">
                Yes please. Thursday would be best.
              </div>
              <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.11em] text-[#B8C9A9]">
                Same customer record
              </div>
            </motion.div>
          </HowStep>
        </div>
      </div>
    </section>
  );
}

function HowStep({
  index,
  title,
  copy,
  children,
  last = false,
}: {
  index: string;
  title: string;
  copy: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <Reveal className={"py-8 lg:px-8 " + (last ? "" : "border-b border-white/12 lg:border-b-0 lg:border-r")} delay={Number(index) * 0.03}>
      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#DDA34B]">{index}</div>
      <h3 className="mt-3 text-[25px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
        {title}
      </h3>
      <p className="mt-3 max-w-[340px] text-[12px] leading-[1.65] text-white/55">{copy}</p>
      {children}
    </Reveal>
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

function ReasonsSection() {
  const moments = [
    ["Existing residential customers", "Seasonal availability", "Offer the service to the people it actually suits."],
    ["Customers who already bought one service", "New service", "Give them another relevant reason to buy."],
    ["Customers affected by a change", "Customer update", "Tell the right group without rebuilding a separate list."],
    ["Past customers worth contacting again", "Re engagement", "Start another conversation when the timing makes sense."],
  ] as const;

  return (
    <section className="bg-[#FCFCFA] px-5 py-18 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div className="max-w-[650px]">
            <Eyebrow>Reasons to reach out</Eyebrow>
            <h2
              className="mt-4 text-[36px] font-medium leading-[1.02] tracking-[-0.048em] sm:text-[42px] lg:text-[46px]"
              style={{ fontFamily: DISPLAY }}
            >
              Different customers.
              <span className="block text-[#747C75]">Different reasons to get back in touch.</span>
            </h2>
          </div>
          <p className="max-w-[500px] text-[14px] leading-[1.7] text-[#69716B]">
            Customer Marketing is not one generic blast. The customer context changes who gets the message and why.
          </p>
        </Reveal>

        <div className="mt-10 border-t border-[#DCE1DC]">
          {moments.map(([context, why, action], index) => (
            <Reveal key={why} delay={index * 0.025}>
              <div className="grid gap-3 border-b border-[#DCE1DC] py-5 md:grid-cols-[1.02fr_.62fr_1.18fr] md:items-center md:gap-8">
                <div className="text-[15px] font-semibold tracking-[-0.02em] text-[#2D332F]">{context}</div>
                <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7A837D]">{why}</div>
                <div className="text-[13px] leading-[1.6] text-[#6A716B]">{action}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5 text-[11px] text-[#747B75]">
          Old enquiries or stale opportunities specifically?{" "}
          <a href="/reactivation" className="inline-flex items-center gap-1.5 font-semibold text-[#1E2B29]">
            See Reopen <ArrowRight size={12} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ReplyLoopSection() {
  return (
    <section className="overflow-hidden bg-[#EEF2EA] px-5 py-18 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <Reveal className="max-w-[570px]">
          <Eyebrow>After send</Eyebrow>
          <h2
            className="mt-4 text-[36px] font-medium leading-[1.02] tracking-[-0.048em] sm:text-[42px] lg:text-[46px]"
            style={{ fontFamily: DISPLAY }}
          >
            When someone replies,
            <span className="block text-[#59694F]">it stops being a campaign.</span>
          </h2>
          <p className="mt-5 max-w-[500px] text-[14px] leading-[1.7] text-[#646C62] sm:text-[15px]">
            The response returns to the customer conversation with the existing context attached.
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

function GrowthStrip() {
  return (
    <section className="border-y border-[#DDE2DD] bg-[#F7F8F5] px-5 py-10 sm:px-10 lg:px-16">
      <Reveal className="mx-auto flex max-w-[1220px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#667069]">Zapla Growth</div>
          <h2
            className="mt-2 text-[26px] font-medium tracking-[-0.04em] text-[#252823] sm:text-[30px]"
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
    <section className="bg-[#FCFCFA] px-5 py-16 sm:px-10 sm:py-18 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-[1220px] gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-18">
        <Reveal className="self-start lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow>Questions</Eyebrow>
          <h2
            className="mt-4 text-[34px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[40px]"
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
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
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
                    <p className="max-w-[760px] pb-5 pr-12 text-[14px] leading-[1.75] text-[#696F69]">
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
    <section className="bg-[#FCFCFA] px-5 py-16 sm:px-10 sm:py-18 lg:px-16 lg:py-20">
      <Reveal className="mx-auto max-w-[1080px] text-center">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>

        <div className="mt-5">
          <Eyebrow>Put your customer data to work</Eyebrow>
        </div>

        <h2
          className="mx-auto mt-3 max-w-[820px] text-[34px] font-medium leading-[1.02] tracking-[-0.048em] text-[#111318] sm:text-[42px] lg:text-[48px]"
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
