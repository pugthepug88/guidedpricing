import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Map, Boxes, Rocket } from "lucide-react";

export const Route = createFileRoute("/pricing-v2")({
  head: () => ({
    meta: [
      { title: "Pricing V2 — Zapla" },
      {
        name: "description",
        content: "Draft pricing page for Zapla. Commercial terms mirror the current pricing page while presentation and copy are being redesigned.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PricingPage,
});

const BOOK_URL = "https://zapla.io/booking";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const COLORS = {
  paper: "#F7F4EE",
  paper2: "#F6F0E8",
  ink: "#111318",
  muted: "#686D69",
  line: "#DDD5CA",
  dark: "#111214",
  green: "#1E2B29",
  coral: "#E97D62",
  rose: "#C96C85",
  amber: "#DDA34B",
  sage: "#99A36D",
  plum: "#9B86B8",
  apricot: "#D58C75",
} as const;

type Plan = {
  name: string;
  fit: string;
  price: string;
  priceLabel: string;
  launch: string;
  features: string[];
  recommended?: boolean;
  enterprise?: boolean;
  track: string;
};

const PLANS: Plan[] = [
  {
    name: "Core",
    fit: "For solo operators and small teams that need the essential operating system launched.",
    price: "A$299",
    priceLabel: "/mo +GST",
    launch: "One-time Guided Launch from A$995 +GST",
    features: [
      "Unlimited users",
      "2,500 contacts",
      "CRM, messages and bookings in one place",
      "Reviews, payments and mobile POS where configured",
      "Missed-call textback",
    ],
    track: "core_cta",
  },
  {
    name: "Growth",
    fit: "For most businesses that want quote follow-up, reactivation and growth workflows.",
    price: "A$499",
    priceLabel: "/mo +GST",
    launch: "One-time Guided Launch from A$1,995 +GST",
    features: [
      "Everything in Core",
      "10,000 contacts",
      "Quote follow-up workflow",
      "Ghost-to-Gold standard workflow",
      "AI chat where relevant",
      "Landing pages, forms and extra lead capture",
    ],
    recommended: true,
    track: "growth_cta",
  },
  {
    name: "Scale",
    fit: "For larger teams, higher volume or multi-location businesses that need routing and reporting.",
    price: "A$899",
    priceLabel: "/mo +GST",
    launch: "One-time Guided Launch from A$3,495 +GST",
    features: [
      "Everything in Growth",
      "25,000 contacts",
      "2 locations included",
      "Team routing and staff access controls",
      "Advanced reporting dashboard",
      "Scheduled rollout check-ins",
    ],
    track: "scale_cta",
  },
  {
    name: "Scale+",
    fit: "For businesses beyond standard Scale: 3+ locations, franchises, multi-brand groups or complex integrations.",
    price: "Custom",
    priceLabel: "quote",
    launch: "Custom Guided Launch",
    features: [
      "Franchise or multi-brand setup",
      "Complex integrations",
      "High-volume contacts, SMS, email or AI",
      "Custom migration and reporting",
      "Rollout model agreed before build",
    ],
    enterprise: true,
    track: "scaleplus_cta",
  },
];

const COMPARE_ROWS: [string, string, string, string, string][] = [
  ["Monthly price", "A$299", "A$499", "A$899", "Custom"],
  ["Guided Launch", "A$995", "A$1,995", "A$3,500", "Custom"],
  ["Users", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
  ["Contacts", "2,500", "10,000", "25,000", "Custom"],
  ["Locations", "1", "1", "2+", "Custom"],
  ["SMS included", "250 seg/mo", "500 seg/mo", "1,000 seg/mo", "Custom"],
  ["Email included", "2,500", "10,000", "25,000", "Custom"],
  ["AI chat", "Where relevant", "Where relevant", "Where relevant", "Custom"],
  ["AI Receptionist", "—", "Add-on", "Add-on", "Custom"],
  ["Rollout support", "Training session", "Training + check-ins", "Training + extended check-ins", "Custom"],
];

const LAUNCH_SCOPES = [
  {
    title: "Core Guided Launch",
    sub: "Essential setup for a solo operator or small team.",
    items: [
      "1 customer pipeline",
      "1 booking calendar",
      "1 unified inbox",
      "Up to 2 enquiry or capture forms",
      "1 website capture point",
      "Missed-call textback",
      "Basic lead follow-up",
      "Google review request workflow",
      "Payments, invoices or mobile POS connection where required",
      "Basic contact import",
      "1 training session",
      "Launch QA",
    ],
  },
  {
    title: "Growth Guided Launch",
    sub: "Follow-up, reactivation and growth setup for most businesses.",
    items: [
      "Everything in Core Launch Pack",
      "Up to 3 customer pipelines",
      "Up to 3 booking calendars",
      "Up to 5 forms or capture points",
      "Quote follow-up workflow",
      "Ghost-to-Gold standard workflow",
      "Google review automation",
      "AI chat setup where relevant",
      "Funnels/pages within scope",
      "Contact import and basic segmentation",
      "2 training sessions",
      "Day-14 and day-45 rollout check-ins",
    ],
  },
  {
    title: "Scale Guided Launch",
    sub: "Multi-location, team routing, reporting and larger rollout setup.",
    items: [
      "Everything in Growth Launch Pack",
      "Up to 5 customer pipelines",
      "Up to 10 booking calendars",
      "Up to 10 forms or capture points",
      "Multi-location setup for up to 2 locations",
      "Team routing and staff access controls",
      "Advanced review flow",
      "Reporting dashboard",
      "Larger contact import and mapping",
      "Up to 8 agreed workflows as part of the launch scope",
      "3 training sessions",
      "Day-14, day-45 and day-90 rollout check-ins",
    ],
  },
  {
    title: "Scale+ Guided Launch",
    sub: "Custom rollout for complex, high-volume or multi-location operations.",
    items: [
      "3+ locations, or 2 locations with heavier usage or complexity",
      "Franchise, multi-brand or multi-team rollout",
      "Complex integrations, routing or custom reporting",
      "High-volume contacts, SMS, email, payments or AI needs",
      "Custom migration, training and implementation plan agreed before build starts",
    ],
  },
] as const;

const ADDONS = [
  {
    title: "AI Receptionist",
    copy: "AI answers calls, qualifies enquiries, takes details or routes calls where configured.",
    price: "From A$495/mo from Growth. Setup quoted.",
    tone: "#EFE2D2",
    accent: COLORS.apricot,
  },
  {
    title: "Ghost-to-Gold Campaign",
    copy: "Reactivate old leads, past customers or cold quote lists with a structured campaign.",
    price: "Campaign sprint from A$1,500 + usage.",
    tone: "#E7E0EA",
    accent: COLORS.plum,
  },
  {
    title: "Extra capacity or build",
    copy: "Extra contacts, locations, integrations, reporting, workflows or custom pages.",
    price: "Quoted based on scope.",
    tone: "#E2E4D2",
    accent: COLORS.sage,
  },
] as const;

const FAQS = [
  {
    q: "Why is Guided Launch separate from the monthly plan?",
    a: [
      "Because empty software does not change how a business runs.",
      "Zapla is most valuable when it is mapped around your real workflow: enquiries, bookings, follow-up, payments, reviews, team handover and reactivation.",
      "Guided Launch means we help configure the system with you, train your team and get the first version live, instead of handing you another blank platform.",
    ],
  },
  {
    q: "Are there usage charges?",
    a: [
      "SMS usage is charged separately from your Zapla plan, so you only pay for what you use.",
      "Standard SMS is charged at 15c per segment, with lower rates available for higher-volume prepaid packs. Most standard SMS messages use one segment. Longer messages or certain special characters may be split across multiple segments.",
      "Email, AI voice, WhatsApp, domains, payment gateway or card fees, ad spend, third-party tools and other usage-heavy services may be separate where applicable.",
    ],
  },
  {
    q: "Do I really get unlimited users?",
    a: [
      "Yes. Unlimited users are included across the Zapla plans shown here.",
      "You can add the people who need Zapla without paying another per-seat software fee each time your team grows.",
    ],
  },
  {
    q: "Can I upgrade later?",
    a: [
      "Yes. If you outgrow your plan, we recommend the simplest path.",
      "If you only need more contact capacity, that can usually be added without a full rebuild. If you need extra setup, workflows, locations, reporting, campaigns or custom work, we quote that before work starts.",
    ],
  },
  {
    q: "Can I add another location?",
    a: [
      "Core and Growth are structured around one location. Scale includes 2 locations, with Scale+ used for more complex multi-location requirements.",
      "Extra locations are available on Scale and Scale+ where routing, calendars, reviews and reporting justify the setup.",
    ],
  },
  {
    q: "Is there a contract or lock-in period?",
    a: [
      "There is no lock-in after launch. Thirty days notice applies.",
    ],
  },
  {
    q: "What if I already use a CRM, website or booking system?",
    a: [
      "That is normal. Most businesses come to Zapla with tools already in place.",
      "During launch, we look at what should stay, what should connect, and what Zapla should replace.",
    ],
  },
  {
    q: "How long does Zapla take to launch?",
    a: [
      "Most standard launches take 2 to 4 weeks depending on the plan, how quickly we get access to your existing tools, and how much needs to be configured.",
      "Core launches are usually faster. Growth and Scale launches can take longer because they may include more workflows, calendars, forms, reporting, locations or team setup.",
    ],
  },
  {
    q: "What does AI Receptionist cost?",
    a: [
      "AI Receptionist is available from Growth as an add-on, from A$495 per month. Setup is quoted separately.",
      "AI voice usage is charged separately based on usage.",
    ],
  },
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0 : 0.62, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, accent = COLORS.coral }: { children: ReactNode; accent?: string }) {
  return (
    <div
      className="text-[10px] font-semibold uppercase tracking-[0.22em]"
      style={{ color: accent, fontFamily: BODY }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, sub, accent = COLORS.coral, centered = false }: { eyebrow: string; title: ReactNode; sub?: string; accent?: string; centered?: boolean }) {
  return (
    <Reveal className={centered ? "mx-auto max-w-[900px] text-center" : "max-w-[900px]"}>
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <h2
        className="mt-5 text-[44px] font-medium leading-[0.96] tracking-[-0.055em] text-[#111318] sm:text-[58px] lg:text-[72px]"
        style={{ fontFamily: DISPLAY }}
      >
        {title}
      </h2>
      {sub ? (
        <p className={`mt-6 text-[16px] leading-[1.65] text-[#686D69] sm:text-[18px] ${centered ? "mx-auto max-w-[720px]" : "max-w-[720px]"}`}>
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

function CheckMark({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: dark ? "rgba(255,255,255,.10)" : "rgba(153,163,109,.18)", color: dark ? "#F7F4EE" : "#69735D" }}
    >
      <Check size={12} strokeWidth={2.5} />
    </span>
  );
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <PricingPlans />
      <Comparison />
      <GuidedLaunch />
      <LaunchScope />
      <CostsExtra />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
    </div>
  );
}

function PricingPlans() {
  return (
    <section id="pricing" className="bg-[#F6F0E8] px-5 pb-12 pt-20 sm:px-10 sm:pb-16 sm:pt-24 lg:px-16 lg:pb-20 lg:pt-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mx-auto max-w-[860px] text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-4 text-[44px] font-medium leading-[0.98] tracking-[-0.055em] text-[#111318] sm:text-[58px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            One flat price. Unlimited users.
          </h1>
          <p className="mx-auto mt-5 max-w-[780px] text-[15px] leading-[1.65] text-[#686D69] sm:text-[17px]">
            Choose the plan that fits your business. Every plan includes unlimited users, with a one-time Guided Launch to configure Zapla around how you work.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] font-semibold text-[#4F544F] sm:text-[13px]">
            {["No per-seat fees", "AUD pricing", "One-time Guided Launch"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2"><CheckMark />{item}</span>
            ))}
          </div>
        </Reveal>

        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <p className="mx-auto mt-7 w-fit border-y border-black/[0.07] px-4 py-3 text-center text-[13px] font-semibold leading-[1.5] text-[#4F544F]">
          Unlimited users on every plan. No per-seat fees as your team grows.
        </p>
        <p className="mx-auto mt-5 max-w-[980px] text-center text-[12px] leading-[1.6] text-[#77716A]">
          Prices are in AUD and exclude GST. SMS, Email, AI voice, WhatsApp, domains, payment gateway/card fees, ad spend, third-party tools, complex migrations and custom build work may be separate. No lock-in after launch. Thirty days notice.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const dark = !!plan.enterprise;
  const bg = dark ? COLORS.green : plan.recommended ? "#FFF2D8" : "#FBFAF7";
  const border = dark ? "rgba(255,255,255,.10)" : plan.recommended ? "rgba(221,163,75,.62)" : "rgba(17,19,24,.09)";
  return (
    <Reveal delay={index * 0.05} className="h-full">
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-[30px] border p-7 shadow-[0_18px_50px_rgba(48,38,29,.06)] sm:p-8 xl:min-h-[590px]"
        style={{ background: bg, borderColor: border, color: dark ? "#F7F4EE" : COLORS.ink }}
      >
        {plan.recommended ? (
          <div className="mb-6 w-fit rounded-full border border-[#DDA34B]/35 bg-white/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A641F]">
            Best fit for most businesses
          </div>
        ) : plan.enterprise ? (
          <div className="mb-6 w-fit rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#DDA34B]">
            Complex rollout
          </div>
        ) : null}

        <h3 className={`${plan.recommended || plan.enterprise ? "" : "mt-1"} text-[28px] font-medium tracking-[-0.04em]`} style={{ fontFamily: DISPLAY }}>{plan.name}</h3>
        <p className={`mt-3 text-[14px] leading-[1.58] xl:min-h-[88px] ${dark ? "text-white/58" : "text-[#6C6D68]"}`}>{plan.fit}</p>

        <div className="mt-7 flex items-end gap-2">
          <div className="text-[50px] font-medium leading-none tracking-[-0.065em] sm:text-[56px]" style={{ fontFamily: DISPLAY }}>{plan.price}</div>
          <div className={`pb-1 text-[12px] font-semibold ${dark ? "text-white/46" : "text-[#77716A]"}`}>{plan.priceLabel}</div>
        </div>

        <div className={`mt-6 rounded-[18px] border px-4 py-4 ${dark ? "border-white/10 bg-white/[0.04]" : "border-black/[0.06] bg-white/55"}`}>
          <div className={`text-[9px] font-bold uppercase tracking-[0.15em] ${dark ? "text-[#DDA34B]" : "text-[#9A7550]"}`}>One-time Guided Launch</div>
          <div className={`mt-1.5 text-[13px] font-semibold leading-[1.45] ${dark ? "text-white/82" : "text-[#373833]"}`}>{plan.launch}</div>
        </div>

        <ul className="mt-7 grid gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className={`flex items-start gap-2.5 text-[13px] leading-[1.5] ${dark ? "text-white/72" : "text-[#4E504B]"}`}>
              <CheckMark dark={dark} />
              <span className={feature.startsWith("Everything") ? "font-semibold" : ""}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <a
            href={BOOK_URL}
            data-track={plan.track}
            className={`inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full px-5 text-[13px] font-semibold transition-transform hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B] ${dark ? "bg-[#F7F4EE] text-[#1E2B29]" : plan.recommended ? "bg-[#1E2B29] text-[#F7F4EE]" : "border border-[#1E2B29]/18 bg-white text-[#1E2B29]"}`}
          >
            {plan.enterprise ? "Talk to sales" : "Book a Call"} <ArrowRight size={15} />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function Comparison() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-[#F7F4EE] px-5 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Compare</Eyebrow>
            <h2 className="mt-2 text-[27px] font-medium tracking-[-0.04em] text-[#111318] sm:text-[32px]" style={{ fontFamily: DISPLAY }}>Compare every plan</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="plan-comparison"
            className="inline-flex h-[46px] w-fit shrink-0 items-center gap-2 rounded-full border border-black/[0.10] bg-white px-5 text-[13px] font-semibold text-[#252824] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]"
          >
            {open ? "Hide comparison" : "Compare all features"}
            <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        {open ? (
          <Reveal className="mt-6 overflow-x-auto rounded-[22px] border border-black/[0.07] bg-white shadow-[0_20px_60px_rgba(48,38,29,.06)]">
            <div id="plan-comparison">
            <table className="w-full min-w-[860px] border-collapse text-[13px]">
              <thead>
                <tr>
                  {["Item", "Core", "Growth", "Scale", "Scale+"].map((heading, index) => (
                    <th key={heading} className={`border-b border-black/[0.07] px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[0.14em] ${index === 0 ? "sticky left-0 z-10 bg-white" : ""} ${index === 2 ? "bg-[#FFF2D8] text-[#8A641F]" : "text-[#77716A]"}`}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`} className={`border-b border-black/[0.06] px-5 py-4 ${index === 0 ? "sticky left-0 z-10 bg-white font-semibold text-[#252824]" : "text-[#5D625E]"} ${index === 2 ? "bg-[#FFF9EC]" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function GuidedLaunch() {
  const stages = [
    { label: "Map", copy: "Your workflow, team and customer journey.", Icon: Map, color: COLORS.sage },
    { label: "Build", copy: "The system, workflows and connections that matter.", Icon: Boxes, color: COLORS.plum },
    { label: "Launch", copy: "Training, QA and rollout with your team.", Icon: Rocket, color: COLORS.apricot },
  ];
  return (
    <section className="relative overflow-hidden bg-[#111214] px-5 py-24 text-white sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-20">
        <Reveal className="max-w-[660px]">
          <Eyebrow accent={COLORS.coral}>Guided Launch</Eyebrow>
          <h2 className="mt-6 text-[46px] font-medium leading-[0.96] tracking-[-0.055em] sm:text-[62px] lg:text-[72px]" style={{ fontFamily: DISPLAY }}>
            We don't hand you software.<br />
            <span className="text-[#D58C75]">We build it around how you work.</span>
          </h2>
          <p className="mt-7 max-w-[620px] text-[16px] leading-[1.68] text-white/54 sm:text-[18px]">
            We map your customer journey, configure the system, connect the pieces that matter and launch it with your team.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {stages.map((stage, index) => (
            <Reveal key={stage.label} delay={index * 0.06} className="h-full">
              <article className="h-full rounded-[26px] border border-white/[0.09] bg-white/[0.035] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/[0.08] bg-white/[0.035]" style={{ color: stage.color }}>
                  <stage.Icon size={19} strokeWidth={1.8} />
                </div>
                <div className="mt-8 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: stage.color }}>0{index + 1}</div>
                <h3 className="mt-2 text-[24px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{stage.label}</h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-white/48">{stage.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchScope() {
  const [openIndex, setOpenIndex] = useState(1);
  return (
    <section id="launch" className="bg-[#F6F0E8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="What gets built"
          title={<>What's included in your <span className="text-[#C96F55]">Guided Launch.</span></>}
          sub="The monthly plan gives you the platform. Guided Launch is the first build, scoped to the plan you choose."
        />

        <div className="mt-12 grid gap-3">
          {LAUNCH_SCOPES.map((scope, index) => {
            const open = index === openIndex;
            return (
              <div key={scope.title} className="overflow-hidden rounded-[22px] border border-black/[0.07] bg-white">
                <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? -1 : index)} className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B] sm:px-7 sm:py-6">
                  <div>
                    <h3 className="text-[20px] font-medium tracking-[-0.03em] text-[#111318]" style={{ fontFamily: DISPLAY }}>{scope.title}</h3>
                    <p className="mt-1 text-[13px] leading-[1.5] text-[#77716A]">{scope.sub}</p>
                  </div>
                  <ChevronDown size={18} className={`mt-1 shrink-0 text-[#9A7550] transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open ? (
                  <div className="border-t border-black/[0.06] px-6 pb-7 pt-5 sm:px-7">
                    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {scope.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-[#555A56]"><CheckMark />{item}</div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <p className="mt-5 rounded-[18px] border border-black/[0.07] bg-white/70 px-5 py-4 text-[12px] leading-[1.6] text-[#66625D]">
          <strong className="text-[#343631]">Website capture point:</strong> a landing page, enquiry form, booking calendar, quote request, webchat or similar entry point connected to Zapla. Extra work is quoted before it starts.
        </p>
      </div>
    </section>
  );
}

function CostsExtra() {
  const usage = [
    ["SMS", "Standard SMS is 15c per segment. Lower rates are available for higher-volume prepaid packs."],
    ["Email", "Email usage beyond the allowance included in your plan may be separate."],
    ["AI voice", "AI voice usage is charged separately based on usage. AI Receptionist setup and monthly charges remain separate."],
    ["Other usage", "WhatsApp, domains, payment gateway/card fees, ad spend and third-party tools may be separate where applicable."],
  ];
  const optional = [
    ["AI Receptionist", "Available from Growth. Monthly add-on and setup are separate."],
    ["Campaigns", "Managed Ghost-to-Gold campaign work is separate from the standard workflow included in Growth."],
    ["Extra locations", "Available on Scale and Scale+ where the additional setup is required."],
    ["Custom work", "Complex migrations, integrations, reporting, extra workflows, website rebuilds or custom build work are quoted before work starts."],
  ];
  return (
    <section className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="No surprises"
          title={<>Know exactly what <span className="text-[#777B76]">isn't included.</span></>}
          sub="Your monthly plan, Guided Launch and included allowances are clear. Usage-heavy services and optional work sit outside that base price."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[30px] border border-black/[0.07] bg-white p-7 sm:p-8">
            <Eyebrow accent={COLORS.amber}>Usage</Eyebrow>
            <div className="mt-7 grid gap-5">
              {usage.map(([title, copy]) => (
                <div key={title} className="border-b border-black/[0.06] pb-5 last:border-0 last:pb-0">
                  <h3 className="text-[17px] font-medium tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#6C706C]">{copy}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.06} className="rounded-[30px] border border-black/[0.07] bg-[#EFE2D2] p-7 sm:p-8">
            <Eyebrow accent={COLORS.apricot}>Optional work</Eyebrow>
            <div className="mt-7 grid gap-5">
              {optional.map(([title, copy]) => (
                <div key={title} className="border-b border-black/[0.07] pb-5 last:border-0 last:pb-0">
                  <h3 className="text-[17px] font-medium tracking-[-0.025em]" style={{ fontFamily: DISPLAY }}>{title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#66615C]">{copy}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div id="addons" className="mt-14 border-t border-black/[0.08] pt-12">
          <Reveal>
            <Eyebrow accent={COLORS.plum}>Optional add-ons</Eyebrow>
            <h3 className="mt-4 text-[34px] font-medium leading-[1] tracking-[-0.045em] text-[#111318] sm:text-[42px]" style={{ fontFamily: DISPLAY }}>
              Add more when you need it.
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {ADDONS.map((addon, index) => (
              <Reveal key={addon.title} delay={index * 0.05} className="h-full">
                <article className="flex h-full min-h-[300px] flex-col rounded-[28px] border border-black/[0.06] p-7" style={{ background: addon.tone }}>
                  <span className="h-3 w-12 rounded-full" style={{ background: addon.accent }} />
                  <h3 className="mt-8 text-[27px] font-medium leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{addon.title}</h3>
                  <p className="mt-4 text-[14px] leading-[1.62] text-[#5F625D]">{addon.copy}</p>
                  <div className="mt-auto border-t border-black/[0.08] pt-5 text-[13px] font-semibold text-[#343631]">{addon.price}</div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="bg-[#F7F4EE] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="Pricing FAQ"
          title={<>The questions people ask <span className="text-[#777B76]">before they choose.</span></>}
          sub="Costs, rollout, usage and the practical details behind the plans."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 md:items-start">
          {FAQS.map((faq, index) => <FaqItem key={faq.q} faq={faq} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, index }: { faq: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={(index % 2) * 0.035}>
      <div className="overflow-hidden rounded-[20px] border border-black/[0.07] bg-white">
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B] sm:px-6">
          <span className="text-[15px] font-semibold leading-[1.4] text-[#292B28]">{faq.q}</span>
          <ChevronDown size={17} className={`shrink-0 text-[#9A7550] transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open ? (
          <div className="space-y-3 border-t border-black/[0.06] px-5 pb-6 pt-4 text-[13px] leading-[1.65] text-[#666B66] sm:px-6">
            {faq.a.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#1E2B29] px-5 py-24 text-[#F7F4EE] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <Reveal className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_.55fr] lg:items-end lg:gap-20">
        <div>
          <Eyebrow accent={COLORS.amber}>Still not sure which plan fits?</Eyebrow>
          <h2 className="mt-6 text-[50px] font-medium leading-[0.94] tracking-[-0.06em] sm:text-[68px] lg:text-[80px]" style={{ fontFamily: DISPLAY }}>
            We'll map it <span className="text-[#D98670]">with you.</span>
          </h2>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-[480px] text-[16px] leading-[1.68] text-white/58">
            Book a short call and we'll recommend the simplest plan that fits how your business works.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[13px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">Book a Call <ArrowRight size={15} /></a>
            <a href="#pricing" className="inline-flex h-[50px] items-center rounded-full border border-white/16 px-6 text-[13px] font-semibold text-white/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">Review plans ↑</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-[#F7F4EE]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <a href={BOOK_URL} className="flex-1 rounded-full bg-[#1E2B29] px-4 py-3 text-center text-[13px] font-semibold text-[#F7F4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDA34B]">Book a Call</a>
        <a href="#pricing" className="rounded-full border border-[#1E2B29]/15 bg-white px-4 py-3 text-[13px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDA34B]">Plans</a>
      </div>
    </div>
  );
}
