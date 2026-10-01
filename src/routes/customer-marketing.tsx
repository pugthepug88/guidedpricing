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
    a: "SMS and email are core channels. Other connected channels depend on your setup.",
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
      className="min-h-screen overflow-hidden bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <Hero />
      <ProblemBridge />
      <ConnectedStory />
      <ReasonsFlow />
      <GrowthCta />
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
      transition={{ duration: reduced ? 0 : 0.46, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={
        "text-[10px] font-semibold uppercase tracking-[0.2em] " +
        (light ? "text-[#DDA34B]" : "text-[#58706F]")
      }
    >
      {children}
    </div>
  );
}

function PrimaryButton() {
  return (
    <a
      href={BOOK_URL}
      className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#1E2B29] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E2B29] focus-visible:ring-offset-2"
    >
      Book a Call <ArrowRight size={15} />
    </a>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#E5E8E5] bg-[#FCFCFA] px-5 pb-16 pt-[108px] sm:px-10 sm:pb-20 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[120px]">
      <div className="pointer-events-none absolute -left-[12%] top-[16%] h-[520px] w-[520px] rounded-full bg-[#E8EFE4] blur-[120px]" />
      <div className="pointer-events-none absolute right-[5%] top-[12%] h-[420px] w-[420px] rounded-full bg-[#2563FF]/[0.035] blur-[100px]" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <Reveal className="max-w-[600px]">
          <Eyebrow>Customer Marketing</Eyebrow>
          <h1
            className="mt-5 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[49px] lg:text-[55px]"
            style={{ fontFamily: DISPLAY }}
          >
            Your customer database should be
            <span className="block text-[#2563FF]">bringing you business.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-[15px] leading-[1.72] text-[#616762] sm:text-[17px]">
            Reach the right customers with a relevant message, then keep the reply connected to the same customer record.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton />
            <a
              href="#customer-story"
              className="inline-flex h-[50px] items-center rounded-full border border-[#D7DDD8] bg-white px-6 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#BBC5BD]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-[#6C736D]">
            <span>Unlimited contacts</span>
            <span className="text-[#C0C4C1]">·</span>
            <span>SMS + email</span>
            <span className="text-[#C0C4C1]">·</span>
            <span>Guided Launch</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <CustomerStreamHero />
        </Reveal>
      </div>
    </section>
  );
}

function CustomerStreamHero() {
  const reduced = !!useReducedMotion();
  const customers = [
    ["Mia Thompson", "Residential · Sydney", true],
    ["Daniel Kim", "Residential · Sydney", true],
    ["Priya Shah", "Commercial · Sydney", false],
    ["Lucas Martin", "Residential · Newcastle", false],
    ["Sophie Nguyen", "Residential · Sydney", true],
  ] as const;

  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[760px]">
      <div className="absolute left-[4%] top-[5%] h-[350px] w-[350px] rounded-full bg-[#EEF3EB]" />
      <div className="absolute right-[3%] top-[18%] h-[250px] w-[250px] rounded-full bg-[#EEF2FF]" />

      <div className="absolute left-0 top-[8%] w-[49%]">
        <div className="mb-4 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.14em] text-[#7D8580]">
          <span>Customer database</span>
          <span>Matched</span>
        </div>

        <div className="border-y border-[#DDE2DE]">
          {customers.map(([name, detail, selected], index) => (
            <motion.div
              key={name}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: selected ? 1 : 0.34, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : index * 0.05, ease: EASE }}
              className="flex items-center justify-between gap-4 border-b border-[#E4E8E4] py-3.5 last:border-b-0"
            >
              <div>
                <div className="text-[11px] font-semibold text-[#333A36]">{name}</div>
                <div className="mt-1 text-[8.5px] text-[#8B918D]">{detail}</div>
              </div>
              <span
                className={
                  "grid h-5 w-5 place-items-center rounded-full border " +
                  (selected
                    ? "border-[#90A17D] bg-[#E8EFE1] text-[#607050]"
                    : "border-[#D9DDDA] text-transparent")
                }
              >
                <Check size={11} strokeWidth={2.4} />
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A]">Audience</div>
            <div className="mt-1 text-[16px] font-semibold tracking-[-0.025em]">Residential Sydney</div>
          </div>
          <div className="text-right">
            <div className="text-[22px] font-semibold tracking-[-0.04em]">86</div>
            <div className="text-[8px] text-[#8B918D]">customers</div>
          </div>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.18, ease: EASE }}
        className="absolute left-[48%] top-[49%] h-px w-[12%] origin-left bg-[#A8B1AA]"
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.26, ease: EASE }}
        className="absolute right-[1%] top-[18%] w-[40%]"
      >
        <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#2563FF]">SMS</div>
        <div className="mt-3 rounded-[18px] rounded-bl-[5px] bg-[#EEF2FF] px-5 py-4 shadow-[0_18px_50px_rgba(37,99,255,.07)]">
          <div className="text-[10px] font-semibold text-[#394556]">Northside</div>
          <p className="mt-2 text-[11px] leading-[1.6] text-[#566274]">
            Hi Mia, we have extra service appointments next week. Want the available times?
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.4, ease: EASE }}
        className="absolute bottom-[11%] right-[6%] w-[34%]"
      >
        <div className="rounded-[18px] rounded-tr-[5px] bg-[#EAF0E7] px-5 py-4 shadow-[0_16px_44px_rgba(53,76,50,.07)]">
          <p className="text-[11px] leading-[1.55] text-[#485348]">Yes please. Thursday would be best.</p>
        </div>
        <div className="mt-3 flex items-center gap-2 text-[9px] font-semibold text-[#65705F]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7F936B]" />
          Same customer record
        </div>
      </motion.div>
    </div>
  );
}

function ProblemBridge() {
  const rows = [
    ["Mia Thompson", "No recent outreach"],
    ["Daniel Kim", "No recent outreach"],
    ["Priya Shah", "No recent outreach"],
    ["Lucas Martin", "No recent outreach"],
    ["Sophie Nguyen", "No recent outreach"],
    ["Ava Collins", "No recent outreach"],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#F3F6F1] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1260px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          <Reveal className="max-w-[560px]">
            <h2
              className="text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[42px]"
              style={{ fontFamily: DISPLAY }}
            >
              You already did the work to win them.
              <span className="block text-[#A8644E]">Then the database goes quiet.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.04} className="max-w-[570px] lg:justify-self-end">
            <p className="text-[15px] leading-[1.72] text-[#646C65]">
              The issue is rarely a lack of contacts. It is knowing who is worth reaching, what is relevant to them, and what should happen when they respond.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12" delay={0.06}>
          <div className="grid border-y border-[#D9DFD9] md:grid-cols-3">
            {[
              ["01", "They sit there", "Customers hear from you when someone remembers."],
              ["02", "Everyone gets the same message", "Customer context never makes it into the campaign."],
              ["03", "New leads get the attention", "Existing customers get fewer reasons to come back."],
            ].map(([index, title, copy], itemIndex) => (
              <div
                key={title}
                className={
                  "py-6 md:px-7 " +
                  (itemIndex < 2 ? "border-b border-[#D9DFD9] md:border-b-0 md:border-r" : "")
                }
              >
                <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9A7B6C]">{index}</div>
                <div className="mt-2 text-[18px] font-semibold tracking-[-0.03em] text-[#2B312D]">{title}</div>
                <div className="mt-2 max-w-[320px] text-[12px] leading-[1.6] text-[#737A74]">{copy}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 overflow-hidden" delay={0.08}>
          <div className="flex min-w-max gap-10 text-[9px] font-semibold text-[#7A827C] sm:gap-14">
            {rows.map(([name, state]) => (
              <div key={name} className="flex items-center gap-3 whitespace-nowrap">
                <span className="h-2 w-2 rounded-full bg-[#C78A72]" />
                <span className="text-[#444C46]">{name}</span>
                <span className="text-[#9A9F9B]">{state}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ConnectedStory() {
  return (
    <section id="customer-story" className="bg-white px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1300px]">
        <Reveal className="max-w-[760px]">
          <Eyebrow>One connected flow</Eyebrow>
          <h2
            className="mt-4 text-[34px] font-medium leading-[1.04] tracking-[-0.046em] sm:text-[40px] lg:text-[44px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn customer context into
            <span className="text-[#2563FF]"> the next conversation.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="space-y-24 lg:py-8">
            <StoryStep
              number="01"
              title="Find the right group."
              copy="Use the customer information already in Zapla to narrow the audience instead of sending to everyone."
            />
            <StoryStep
              number="02"
              title="Send something worth hearing."
              copy="Use SMS or email for the message, with the audience and customer context already decided."
            />
            <StoryStep
              number="03"
              title="Keep the reply connected."
              copy="When someone responds, your team continues from the customer record instead of starting again in another tool."
            />
          </div>

          <div className="lg:sticky lg:top-28 lg:h-fit">
            <ConnectedCampaignCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryStep({
  number,
  title,
  copy,
}: {
  number: string;
  title: string;
  copy: string;
}) {
  return (
    <Reveal className="max-w-[390px]">
      <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#7A837D]">{number}</div>
      <h3 className="mt-3 text-[27px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
        {title}
      </h3>
      <p className="mt-3 text-[13px] leading-[1.68] text-[#6B726C]">{copy}</p>
    </Reveal>
  );
}

function ConnectedCampaignCanvas() {
  const reduced = !!useReducedMotion();
  const rows = [
    ["Mia Thompson", "Residential", "Sydney", true],
    ["Daniel Kim", "Residential", "Sydney", true],
    ["Priya Shah", "Commercial", "Sydney", false],
    ["Lucas Martin", "Residential", "Newcastle", false],
    ["Sophie Nguyen", "Residential", "Sydney", true],
  ] as const;

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#DDE3DE] bg-[#FBFCFA] shadow-[0_28px_80px_rgba(37,48,40,.09)]">
      <div className="flex min-h-[46px] items-center justify-between border-b border-[#E2E6E2] px-5">
        <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#6F7872]">Customer Marketing</div>
        <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#2563FF]">Live customer context</div>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-[#E2E6E2] p-5 lg:border-b-0 lg:border-r sm:p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A]">Audience</div>
              <div className="mt-1 text-[19px] font-semibold tracking-[-0.03em]">Residential Sydney</div>
            </div>
            <div className="text-right">
              <div className="text-[24px] font-semibold tracking-[-0.04em]">86</div>
              <div className="text-[8px] text-[#8B918D]">matched</div>
            </div>
          </div>

          <div className="mt-5 divide-y divide-[#E6EAE6] border-y border-[#E6EAE6]">
            {rows.map(([name, service, city, selected], index) => (
              <motion.div
                key={name}
                initial={reduced ? false : { opacity: 0, x: -6 }}
                whileInView={{ opacity: selected ? 1 : 0.36, x: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : index * 0.04, ease: EASE }}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <div className="text-[10px] font-semibold text-[#353C38]">{name}</div>
                  <div className="mt-0.5 text-[8px] text-[#8B918D]">{service} · {city}</div>
                </div>
                <Check
                  size={12}
                  className={selected ? "text-[#6B7D59]" : "text-transparent"}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A]">Message</div>
            <div className="flex items-center gap-4 text-[9px]">
              <span className="inline-flex items-center gap-1.5 font-semibold text-[#2563FF]">
                <MessageSquareText size={12} /> SMS
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#8A918C]">
                <Mail size={12} /> Email
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-[16px] bg-[#F1F4F8] p-4">
            <div className="text-[10px] font-semibold text-[#3C4652]">Northside</div>
            <p className="mt-2 text-[11px] leading-[1.6] text-[#596574]">
              Hi Mia, we have extra service appointments next week. Want the available times?
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between border-b border-[#E6EAE6] pb-4">
            <div className="text-[9px] font-semibold text-[#777F79]">Ready for selected audience</div>
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#1E2B29] text-white">
              <Send size={12} />
            </div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : 0.14, ease: EASE }}
            className="mt-5"
          >
            <div className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#87908A]">Reply</div>
            <div className="mt-3 max-w-[86%] rounded-[15px] rounded-bl-[5px] bg-[#EAF0E7] px-4 py-3 text-[11px] leading-[1.55] text-[#465146]">
              Yes please. Thursday would be best.
            </div>
            <div className="mt-3 flex items-center gap-2 text-[9px] font-semibold text-[#64705E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7D9169]" />
              Reply returned to Mia's customer record
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ReasonsFlow() {
  const moments = [
    ["Seasonal availability", "Existing residential customers", "Offer a service when it is useful again."],
    ["New service", "Customers who already bought from you", "Give them another relevant reason to buy."],
    ["Customer update", "People affected by a change", "Reach only the customers who need to know."],
    ["Re engagement", "Past customers worth contacting again", "Create a new reason to start a conversation."],
  ] as const;

  return (
    <section className="relative overflow-hidden border-y border-[#E3E7E3] bg-[#F9FAF8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute -right-24 top-6 h-[360px] w-[360px] rounded-full bg-[#EEF2FF] blur-[90px]" />
      <div className="relative mx-auto grid max-w-[1260px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="max-w-[470px]">
          <h2
            className="text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[42px]"
            style={{ fontFamily: DISPLAY }}
          >
            One database.
            <span className="block text-[#747C75]">Plenty of reasons to get back in touch.</span>
          </h2>
          <p className="mt-5 text-[14px] leading-[1.7] text-[#6B726C]">
            The audience changes with the reason. That is what makes the outreach useful instead of generic.
          </p>
        </Reveal>

        <div className="border-t border-[#DCE1DC]">
          {moments.map(([reason, audience, action], index) => (
            <Reveal key={reason} delay={index * 0.025}>
              <div className="grid gap-2 border-b border-[#DCE1DC] py-5 sm:grid-cols-[0.72fr_1fr] sm:gap-8">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#7B837D]">{reason}</div>
                  <div className="mt-2 text-[15px] font-semibold tracking-[-0.02em] text-[#303733]">{audience}</div>
                </div>
                <div className="self-center text-[13px] leading-[1.62] text-[#69716B]">{action}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-start-2 text-[11px] text-[#747B75]">
          Old enquiries or stale opportunities specifically?{" "}
          <a href="/reactivation" className="inline-flex items-center gap-1.5 font-semibold text-[#1E2B29]">
            See Reopen <ArrowRight size={12} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function GrowthCta() {
  return (
    <section className="bg-[#1E2B29] px-5 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div className="max-w-[760px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#DDA34B]">Zapla Growth</div>
          <h2
            className="mt-3 text-[32px] font-medium leading-[1.03] tracking-[-0.045em] sm:text-[38px] lg:text-[42px]"
            style={{ fontFamily: DISPLAY }}
          >
            Turn the customers you already know into the next conversation.
          </h2>
          <p className="mt-4 max-w-[660px] text-[14px] leading-[1.7] text-white/60">
            Customer Marketing is part of Growth, alongside the proactive tools designed to create more from the customer base you already have.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-[#1E2B29]"
          >
            View Growth pricing <ArrowRight size={14} />
          </a>
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] items-center rounded-full border border-white/18 px-6 text-[13px] font-semibold text-white"
          >
            Book a Call
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = !!useReducedMotion();

  return (
    <section className="bg-white px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:gap-16">
        <Reveal className="max-w-[330px]">
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#68736C]">Questions</div>
          <h2
            className="mt-3 text-[29px] font-medium leading-[1.04] tracking-[-0.042em] sm:text-[34px]"
            style={{ fontFamily: DISPLAY }}
          >
            Before you put the database to work.
          </h2>
        </Reveal>

        <div className="border-y border-[#DDE2DE]">
          {FAQS.map((item, index) => {
            const active = open === index;
            return (
              <div key={item.q} className="border-b border-[#DDE2DE] last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  onClick={() => setOpen(active ? null : index)}
                  aria-expanded={active}
                >
                  <span className="text-[14px] font-semibold tracking-[-0.015em] text-[#282E2A] sm:text-[15px]">
                    {item.q}
                  </span>
                  <motion.span
                    className={
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border " +
                      (active
                        ? "border-[#1E2B29] bg-[#1E2B29] text-white"
                        : "border-[#DDE2DE] bg-white text-[#59615B]")
                    }
                    animate={reduced ? undefined : { rotate: active ? 180 : 0 }}
                    transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  >
                    <ChevronDown size={14} strokeWidth={1.7} />
                  </motion.span>
                </button>

                <motion.div
                  className="grid overflow-hidden"
                  initial={false}
                  animate={{
                    gridTemplateRows: active ? "1fr" : "0fr",
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[700px] pb-5 pr-10 text-[13px] leading-[1.7] text-[#6C736D]">
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
    <section className="border-t border-[#E4E7E4] bg-[#FCFCFA] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <Reveal className="mx-auto max-w-[900px] text-center">
        <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#111214]">
          <ZaplaPetal size={31} />
        </div>
        <h2
          className="mx-auto mt-5 max-w-[760px] text-[32px] font-medium leading-[1.04] tracking-[-0.045em] sm:text-[38px] lg:text-[42px]"
          style={{ fontFamily: DISPLAY }}
        >
          Your next customer conversation may already be in your CRM.
        </h2>
        <p className="mx-auto mt-4 max-w-[610px] text-[14px] leading-[1.7] text-[#69706A]">
          We’ll show you how to turn the customer data you already have into relevant outreach without disconnecting it from the rest of the customer journey.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PrimaryButton />
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#DCE1DD] bg-white px-6 text-[13px] font-semibold text-[#111318] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}
