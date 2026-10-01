import { createFileRoute } from "@tanstack/react-router";
// Platform overview uses the dedicated connected-system scene and keeps the hero visual isolated from the rest of the route.
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Phone,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  UserRound,
  Workflow,
} from "lucide-react";
import { PlatformConnectedSystemScene } from "@/components/PlatformConnectedSystemScene";

export const Route = createFileRoute("/platform")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Zapla Platform | One Customer. One Connected System." },
      {
        name: "description",
        content:
          "See how Zapla connects CRM, customer marketing, AI reception, reviews and follow-through around one customer history.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PlatformPage,
});

const BOOK_URL = "https://zapla.io/booking";
const PRICING_URL = "/Pricing-v3";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';

function PlatformPage() {
  return (
    <main
      data-page="platform"
      className="min-h-screen bg-white text-[#111318] antialiased"
      style={{ fontFamily: BODY }}
    >
      <PlatformConnectedSystemScene />
      <PlatformMap />
      <Differentiators />
      <IntentRouter />
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
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={"text-[10px] font-bold uppercase tracking-[0.2em] " + (dark ? "text-[#8EADFF]" : "text-[#2563FF]")}>
      {children}
    </p>
  );
}

function PlatformMap() {
  const areas = [
    {
      title: "CRM",
      copy: "Customer records, conversations, opportunities and the work around them.",
      href: "/crm",
      icon: UserRound,
    },
    {
      title: "Customer Marketing",
      copy: "Use customer data to reach the right groups and keep replies connected.",
      href: "/customer-marketing",
      icon: Send,
    },
    {
      title: "AI Receptionist",
      copy: "Answer calls, qualify, book and hand off without losing the next step.",
      href: "/ai-receptionist",
      icon: Phone,
    },
    {
      title: "Reviews & Reputation",
      copy: "Ask for reviews at the right customer moment after the work is done.",
      href: "/reviews",
      icon: Star,
    },
  ];

  return (
    <section id="platform-map" className="bg-[#FCFCFA] px-5 pb-5 pt-8 sm:px-10 sm:pb-6 sm:pt-10 lg:px-16">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[34px] bg-[#0D1626] px-6 py-16 text-white shadow-[0_28px_80px_rgba(13,22,38,.12)] sm:px-9 sm:py-20 lg:px-12 lg:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="max-w-[680px]">
            <Eyebrow dark>What makes up Zapla</Eyebrow>
            <h2
              className="mt-4 text-[42px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[52px] lg:text-[60px]"
              style={{ fontFamily: DISPLAY }}
            >
              The platform behind
              <span className="block text-[#8EADFF]">the customer journey.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-[14px] leading-[1.72] text-white/52 sm:text-[15px] lg:justify-self-end">
            Follow-up, reactivation, bookings, payments and automation work across these areas through the same customer records and workflows.
          </p>
        </Reveal>

        <div className="mt-10 grid overflow-hidden rounded-[24px] border border-white/10 md:grid-cols-2">
          {areas.map((area, index) => {
            const Icon = area.icon;
            return (
              <a
                key={area.title}
                href={area.href}
                className={
                  "group bg-white/[0.045] p-6 transition-colors hover:bg-white/[0.075] sm:p-7 " +
                  (index >= 2 ? "border-t border-white/10 " : "") +
                  (index % 2 === 1 ? "md:border-l md:border-white/10 " : "") +
                  (index === 1 ? "border-t border-white/10 md:border-t-0 " : "")
                }
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2563FF]/18 text-[#8EADFF]">
                    <Icon size={17} />
                  </span>
                  <ArrowRight size={15} className="mt-2 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#8EADFF]" />
                </div>
                <h3 className="mt-5 text-[28px] font-medium tracking-[-0.043em]" style={{ fontFamily: DISPLAY }}>
                  {area.title}
                </h3>
                <p className="mt-3 max-w-[470px] text-[12px] leading-[1.7] text-white/50 sm:text-[13px]">{area.copy}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  const items = [
    ["Unlimited users", "The whole team can work from the same customer history."],
    ["Unlimited stored contacts*", "Keep past leads and customers usable as the database grows."],
    ["Guided Launch", "We map what moves, what connects and what should happen automatically."],
    ["Connect what you keep", "Specialist systems can stay where they still make sense."],
  ];

  return (
    <section className="bg-[#FCFCFA] px-5 pb-16 pt-1 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
      <div className="mx-auto max-w-[1320px] rounded-[28px] bg-[#2563FF] px-6 py-9 text-white shadow-[0_18px_50px_rgba(37,99,255,.14)] sm:px-8 sm:py-10">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {items.map(([title, copy], index) => (
            <Reveal
              key={title}
              className={"lg:px-7 " + (index ? "lg:border-l lg:border-white/20" : "")}
              delay={index * 0.04}
            >
              <div className="text-[15px] font-semibold tracking-[-0.02em]">{title}</div>
              <div className="mt-2 text-[11px] leading-[1.6] text-white/72">{copy}</div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 text-[9px] text-white/52">
          *Unlimited stored contacts are subject to fair use. Communications and other usage-based services are separate.
        </div>
      </div>
    </section>
  );
}

function IntentRouter() {
  const intents = [
    ["Stop enquiries going quiet", "Follow-Up", "/follow-up", Workflow],
    ["Answer more calls", "AI Receptionist", "/ai-receptionist", Phone],
    ["Bring old leads back", "Reopen", "/reactivation", RefreshCw],
    ["Market to existing customers", "Customer Marketing", "/customer-marketing", Send],
    ["Get more reviews", "Reviews & Reputation", "/reviews", Star],
    ["Manage customers and opportunities", "CRM", "/crm", UserRound],
  ] as const;

  return (
    <section className="border-t border-[#E2E7EF] bg-[#F7F9FC] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
          <div>
            <Eyebrow>Go deeper</Eyebrow>
            <h2
              className="mt-4 text-[40px] font-medium leading-[0.98] tracking-[-0.052em] sm:text-[52px] lg:text-[60px]"
              style={{ fontFamily: DISPLAY }}
            >
              What do you want
              <span className="block text-[#2563FF]">to fix first?</span>
            </h2>
          </div>
          <p className="max-w-[460px] text-[14px] leading-[1.7] text-[#657083] lg:justify-self-end">
            Start with the job that is getting stuck today.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {intents.map(([title, product, href, Icon], index) => (
            <a
              key={title}
              href={href}
              className="group flex items-center gap-4 rounded-[18px] border border-[#DEE4ED] bg-white p-5 shadow-[0_10px_30px_rgba(31,43,67,.045)] transition-all hover:-translate-y-px hover:border-[#C8D5F1] hover:shadow-[0_16px_38px_rgba(31,43,67,.07)] sm:p-6"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E8EFFF] text-[#2563FF]">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[16px] font-semibold tracking-[-0.025em] text-[#1D2738]">{title}</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#8A94A6]">{product}</div>
              </div>
              <ArrowRight size={15} className="shrink-0 text-[#A0A8B6] transition-transform group-hover:translate-x-1 group-hover:text-[#2563FF]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#F7F9FC] px-5 pb-20 pt-0 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
      <Reveal className="mx-auto max-w-[1180px] rounded-[32px] border border-[#E0E6EF] bg-white px-6 py-14 text-center shadow-[0_24px_70px_rgba(31,43,67,.055)] sm:px-10 sm:py-16">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#111827] text-white">
          <Sparkles size={18} />
        </div>
        <h2
          className="mx-auto mt-5 max-w-[820px] text-[38px] font-medium leading-[0.99] tracking-[-0.05em] text-[#111827] sm:text-[50px] lg:text-[58px]"
          style={{ fontFamily: DISPLAY }}
        >
          See how the pieces should fit
          <span className="block text-[#2563FF]">around your business.</span>
        </h2>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOK_URL}
            className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-[13px] font-semibold text-white transition-transform hover:-translate-y-px sm:w-auto"
          >
            Book a Call <ArrowRight size={14} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[50px] w-full items-center justify-center rounded-full border border-[#D8E0EC] bg-white px-6 text-[13px] font-semibold text-[#172033] transition-colors hover:border-[#2563FF] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}

