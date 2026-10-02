import { createFileRoute } from "@tanstack/react-router";
// Platform overview uses the dedicated connected-system scene and keeps the hero visual isolated from the rest of the route.
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Cable,
  Database,
  Infinity,
  Phone,
  RefreshCw,
  Route as RouteIcon,
  Send,
  Star,
  UserRound,
  UsersRound,
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
                  <span className="-ml-1 rounded-full bg-[#F7F5F1] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#20242B] shadow-[0_8px_20px_rgba(0,0,0,.08)]">
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
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8EADFF]">Across the whole platform</div>
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
                  <div className="mt-2 text-[11px] leading-[1.6] text-white/52">{copy}</div>
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
    {
      title: "Unlimited users",
      copy: "Bring the whole team. No per-seat pricing.",
      icon: UsersRound,
      secondaryIcon: Infinity,
    },
    {
      title: "Unlimited contacts*",
      copy: "Keep your customer database useful as it grows.",
      icon: Database,
      secondaryIcon: Infinity,
    },
    {
      title: "Guided Launch",
      copy: "We help map setup, connections and automation.",
      icon: RouteIcon,
      secondaryIcon: null,
    },
    {
      title: "Works with your tools",
      copy: "Keep specialist systems that still make sense.",
      icon: Cable,
      secondaryIcon: null,
    },
  ];

  return (
    <section className="bg-[#FCFCFA] px-5 pb-16 pt-1 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
      <div className="mx-auto max-w-[1320px] rounded-[28px] bg-[#2563FF] px-6 py-9 text-white shadow-[0_18px_50px_rgba(37,99,255,.14)] sm:px-8 sm:py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {items.map((item, index) => {
            const Icon = item.icon;
            const SecondaryIcon = item.secondaryIcon;

            return (
              <Reveal
                key={item.title}
                className={"lg:px-8 " + (index ? "lg:border-l lg:border-white/18" : "")}
                delay={index * 0.04}
              >
                <div className="flex min-h-[132px] flex-col">
                  <div className="relative inline-flex h-11 w-11 items-center justify-center text-white/94">
                    <Icon size={34} strokeWidth={1.65} />
                    {SecondaryIcon ? (
                      <span className="absolute -bottom-1.5 -right-2 grid h-6 w-6 place-items-center rounded-full bg-white text-[#2563FF] shadow-[0_4px_12px_rgba(16,46,130,.16)]">
                        <SecondaryIcon size={15} strokeWidth={2} />
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 text-[16px] font-semibold tracking-[-0.025em]">{item.title}</div>
                  <div className="mt-2 max-w-[240px] text-[11.5px] leading-[1.55] text-white/74">{item.copy}</div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-7 border-t border-white/16 pt-4 text-[9.5px] leading-[1.55] text-white/58">
          *Unlimited contacts are subject to fair use. Communications and other usage-based services are separate.
        </div>
      </div>
    </section>
  );
}

function IntentRouter() {
  const intents = [
    {
      title: "Stop enquiries going quiet",
      product: "Follow-Up",
      href: "/follow-up",
      icon: Workflow,
      accent: "#7E9DF8",
      soft: "#E8EEFF",
    },
    {
      title: "Answer more calls",
      product: "AI Receptionist",
      href: "/ai-receptionist",
      icon: Phone,
      accent: "#7F988D",
      soft: "#E7EFEB",
    },
    {
      title: "Bring old leads back",
      product: "Reopen",
      href: "/reactivation",
      icon: RefreshCw,
      accent: "#B07A8B",
      soft: "#F0E5E9",
    },
    {
      title: "Market to existing customers",
      product: "Customer Marketing",
      href: "/customer-marketing",
      icon: Send,
      accent: "#C58B70",
      soft: "#F3E7E0",
    },
    {
      title: "Get more reviews",
      product: "Reviews & Reputation",
      href: "/reviews",
      icon: Star,
      accent: "#B6925F",
      soft: "#F2EBDD",
    },
    {
      title: "Manage customers and opportunities",
      product: "CRM",
      href: "/crm",
      icon: UserRound,
      accent: "#6E8C9E",
      soft: "#E7EEF1",
    },
  ] as const;

  return (
    <section className="bg-[#F7F8FA] px-5 pb-16 pt-4 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
      <div className="mx-auto max-w-[1320px] rounded-[34px] border border-[#E5DED4] bg-[#F5F1EA] px-6 py-12 shadow-[0_22px_60px_rgba(58,48,37,.05)] sm:px-9 sm:py-14 lg:px-12 lg:py-16">
        <Reveal className="max-w-[760px]">
          <Eyebrow>Go deeper</Eyebrow>
          <h2
            className="mt-4 text-[38px] font-medium leading-[1.0] tracking-[-0.05em] text-[#111318] sm:text-[44px] lg:text-[48px]"
            style={{ fontFamily: DISPLAY }}
          >
            What do you want to fix first?
          </h2>
          <p className="mt-3 max-w-[520px] text-[13px] leading-[1.7] text-[#68716F] sm:text-[14px]">
            Start with the job that is getting stuck today.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {intents.map((intent, index) => {
            const Icon = intent.icon;
            return (
              <Reveal key={intent.title} delay={index * 0.035}>
                <a
                  href={intent.href}
                  className="group flex min-h-[154px] flex-col rounded-[22px] border border-[#E4DED4] bg-[#FFFEFB] p-5 shadow-[0_10px_28px_rgba(58,48,37,.035)] transition-all hover:-translate-y-1 hover:border-[#D6CEC1] hover:shadow-[0_16px_34px_rgba(58,48,37,.06)] sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-[13px]"
                      style={{ backgroundColor: intent.soft, color: intent.accent }}
                    >
                      <Icon size={17} />
                    </span>
                    <ArrowRight
                      size={14}
                      className="mt-1 text-[#A0A7A3] transition-transform group-hover:translate-x-1"
                    />
                  </div>

                  <div className="mt-7 text-[17px] font-semibold leading-[1.2] tracking-[-0.025em] text-[#1D2738]">
                    {intent.title}
                  </div>
                  <div
                    className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: intent.accent }}
                  >
                    {intent.product}
                  </div>
                </a>
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
          <span className="block lg:whitespace-nowrap">See how Zapla fits around your business.</span>
          <span className="block lg:whitespace-nowrap">Keep every customer step connected.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.65] text-[#5F655F] sm:text-[16px]">
          Book a call and we’ll map how your customer records, conversations, bookings, automations and existing tools can work together.
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

