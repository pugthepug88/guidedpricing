import { createFileRoute } from "@tanstack/react-router";
// Platform overview uses the dedicated connected-system scene and keeps the hero visual isolated from the rest of the route.
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Phone,
  RefreshCw,
  Send,
  Star,
  UserRound,
  Workflow,
} from "lucide-react";
import { PlatformConnectedSystemScene } from "@/components/PlatformConnectedSystemScene";
import { ZaplaPetal } from "@/components/ZaplaPetal";

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
      className="min-h-screen overflow-x-clip bg-white text-[#111318] antialiased"
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
  const systems = [
    {
      badge: "Customer",
      title: "Customer system",
      copy:
        "Every call, message, appointment and note stays attached to the same customer record. Your team can see what happened, where things stand and who owns the next step.",
      capabilities: [
        "CRM & customer records",
        "Conversations & inbox",
        "Calls & VoIP",
        "Bookings & appointments",
      ],
      accent: "#8EADFF",
      dots: ["#C9D7FF", "#97B2FF", "#688FFF"],
    },
    {
      badge: "Operations",
      title: "Work system",
      copy:
        "Once a customer is in motion, Zapla coordinates the work around them. Opportunities move, workflows trigger, documents go out, payments come in and service issues stay visible.",
      capabilities: [
        "Pipelines & opportunities",
        "Automation & workflows",
        "Payments & invoicing",
        "Docs, contracts & ticketing",
      ],
      accent: "#9FC6B5",
      dots: ["#D2E1DA", "#AFCDBF", "#789889"],
    },
    {
      badge: "Growth",
      title: "Growth system",
      copy:
        "The customer history stays useful after the first transaction. Use it to follow up, reactivate old opportunities, generate reviews and create the next booking or purchase.",
      capabilities: [
        "Customer marketing",
        "Reactivation & follow-up",
        "Reviews & reputation",
        "Forms, websites & funnels",
        "Repeat business",
      ],
      accent: "#D6A27C",
      dots: ["#E9D5C7", "#D6AD91", "#B77A5D"],
    },
  ];

  return (
    <section id="platform-map" className="bg-[#F7F8FA] px-5 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12 lg:px-16">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-[#141B27] text-white shadow-[0_24px_70px_rgba(20,27,39,.10)]">
        <div className="px-6 pb-11 pt-16 sm:px-9 sm:pb-12 sm:pt-20 lg:px-12 lg:pb-14 lg:pt-20">
          <Reveal className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="max-w-[720px]">
              <Eyebrow dark>What makes up Zapla</Eyebrow>
              <h2
                className="mt-4 text-[40px] font-medium leading-[0.99] tracking-[-0.05em] sm:text-[50px] lg:text-[56px]"
                style={{ fontFamily: DISPLAY }}
              >
                Everything your customer touches.
                <span className="block text-[#8EADFF]">Connected in one platform.</span>
              </h2>
            </div>
            <p className="max-w-[540px] text-[14px] leading-[1.75] text-white/58 sm:text-[15px] lg:justify-self-end">
              Zapla is more than the CRM. The customer record is the common thread, while communication, operations and growth tools use the same context instead of becoming separate islands.
            </p>
          </Reveal>
        </div>

        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">
          <div className="grid gap-3 lg:grid-cols-3">
            {systems.map((system, index) => (
              <Reveal
                key={system.title}
                delay={index * 0.05}
                className="rounded-[26px] bg-white/[0.045] px-6 py-8 ring-1 ring-white/[0.07] sm:px-7 sm:py-9 lg:min-h-[430px] lg:px-8 lg:py-9"
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {system.dots.map((dot, dotIndex) => (
                      <span
                        key={dot}
                        className="h-8 w-8 rounded-full border-2 border-[#141B27]"
                        style={{ backgroundColor: dot, zIndex: system.dots.length - dotIndex }}
                      />
                    ))}
                  </div>
                  <span className="-ml-1 rounded-full bg-[#F7F5F1] px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#20242B] shadow-[0_8px_20px_rgba(0,0,0,.08)]">
                    {system.badge}
                  </span>
                </div>

                <h3
                  className="mt-7 text-[30px] font-medium tracking-[-0.045em] text-white"
                  style={{ fontFamily: DISPLAY }}
                >
                  {system.title}
                </h3>

                <p className="mt-4 max-w-[350px] text-[12.5px] leading-[1.72] text-white/56 lg:min-h-[88px]">
                  {system.copy}
                </p>

                <div className="mt-8 space-y-3">
                  {system.capabilities.map((capability) => (
                    <div
                      key={capability}
                      className="flex min-h-[46px] items-center gap-3 rounded-[12px] bg-black/[0.08] px-3.5 py-3 text-[12px] font-medium text-white/82 ring-1 ring-white/[0.055]"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: system.accent }}
                      />
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.08] bg-[#192231] px-6 py-8 sm:px-9 lg:px-12">
          <Reveal className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8EADFF]">Across the whole platform</div>
              <div className="mt-2 text-[19px] font-semibold tracking-[-0.025em] text-white">
                AI, reporting and integrations.
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["AI", "Reception, assistance and automation can use the customer context already in Zapla."],
                ["Reporting", "See customer activity, pipeline movement and operational performance in one place."],
                ["Integrations", "Keep specialist systems where they make sense without rebuilding the customer story."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[16px] bg-white/[0.035] px-4 py-4 ring-1 ring-white/[0.06]">
                  <div className="text-[11px] font-semibold text-white/88">{title}</div>
                  <div className="mt-2 text-[10px] leading-[1.6] text-white/46">{copy}</div>
                </div>
              ))}
            </div>
          </Reveal>
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
    ["Works with your existing tools", "Keep specialist systems you still rely on and connect them around the same customer workflow."],
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
    <section className="overflow-hidden bg-[#FCFCFA] pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-24 lg:pt-24">
      <Reveal className="mx-auto max-w-[1120px] px-5 text-center sm:px-10">
        <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#111214] ring-1 ring-black/[0.06]">
          <ZaplaPetal size={34} />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C96F55]">
          Keep the next step moving
        </p>

        <h2
          className="mx-auto mt-3 max-w-[1080px] text-[40px] font-medium leading-[0.99] tracking-[-0.045em] text-[#111318] sm:text-[54px] lg:text-[64px]"
          style={{ fontFamily: DISPLAY }}
        >
          <span className="block lg:whitespace-nowrap">Turn more enquiries into customers.</span>
          <span className="block lg:whitespace-nowrap">Keep more customers coming back.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.65] text-[#5F655F] sm:text-[16px]">
          Book a call and we’ll show you where enquiries, follow-ups and repeat business are getting stuck, then map what Zapla can automate.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BOOK_URL}
            className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1E2B29] px-7 text-[13px] font-semibold text-[#F7F4EE] transition-transform hover:-translate-y-px sm:w-auto"
          >
            Book a Call <ArrowRight size={15} />
          </a>
          <a
            href={PRICING_URL}
            className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-[#E2DBD1] bg-white px-7 text-[13px] font-semibold text-[#111318] transition-colors hover:border-[#CFC6BA] sm:w-auto"
          >
            View pricing
          </a>
        </div>
      </Reveal>
    </section>
  );
}

