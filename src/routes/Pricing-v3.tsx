import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Boxes, Check, ChevronDown, CircleDot, Map, Rocket } from "lucide-react";

export const Route = createFileRoute("/Pricing-v3")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Pricing V3 Internal Draft | Zapla" },
      {
        name: "description",
        content: "Internal Zapla pricing draft covering Follow-Through, Growth and custom requirements.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PricingV3Page,
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
  promise: string;
  fit: string;
  price: string;
  priceLabel: string;
  launch: string;
  outcomes: string[];
  platform: string;
  cta: string;
  tone: "standard" | "growth" | "custom";
};

const PLAN_CONSTANTS = ["Unlimited users", "Unlimited stored contacts*"] as const;

const PLANS: Plan[] = [
  {
    name: "Follow-Through",
    promise: "Stop losing the business already coming to you.",
    fit: "Capture every enquiry and keep every call, quote and booking moving.",
    price: "A$399",
    priceLabel: "/mo + GST",
    launch: "from A$997 + GST",
    outcomes: [
      "Capture and respond to calls, forms, chat and new enquiries",
      "Keep leads and quotes moving",
      "Recover bookings and no-shows",
      "Automate reviews and customer follow-up",
    ],
    platform: "CRM, inbox, pipelines, calendars, forms, invoicing and more included.",
    cta: "Book a Call",
    tone: "standard",
  },
  {
    name: "Growth",
    promise: "Turn the leads and customers you already have into more revenue.",
    fit: "Reactivate dormant leads, bring customers back and run targeted campaigns across your database.",
    price: "A$699",
    priceLabel: "/mo + GST",
    launch: "from A$1,497 + GST",
    outcomes: [
      "Everything in Follow-Through",
      "Reactivate dormant leads and customers",
      "Automate repeat, recall and nurture campaigns",
      "Run targeted email, SMS and WhatsApp campaigns",
    ],
    platform: "Social Planner, Ad Manager and campaign templates included.",
    cta: "Book a Call",
    tone: "growth",
  },
  {
    name: "Custom",
    promise: "Built for businesses that need more than a standard plan covers.",
    fit: "For multiple locations or brands, more complex setup, or workflows that need something different.",
    price: "Custom",
    priceLabel: "quote",
    launch: "Custom Guided Launch",
    outcomes: [
      "Multiple locations or brands",
      "Larger or more complex data moves",
      "Linking Zapla with software outside the standard setup",
      "Workflows or reporting that need to work differently",
      "Higher-volume or unusual requirements",
    ],
    platform: "Your setup, rollout and ongoing support are agreed before work starts.",
    cta: "Talk to us",
    tone: "custom",
  },
];

const COMPARISON_GROUPS = [
  {
    title: "Operating platform",
    rows: [
      ["Unlimited users", "Included", "Included", "Scoped"],
      ["Unlimited stored contacts under fair use", "Included", "Included", "Scoped"],
      ["CRM and customer records", "Included", "Included", "Scoped"],
      ["Unified inbox", "Included", "Included", "Scoped"],
      ["Pipelines and opportunities", "Included", "Included", "Scoped"],
      ["VoIP and phone dialer access", "Usage separate", "Usage separate", "Scoped"],
      ["Calendars and online booking", "Included", "Included", "Scoped"],
      ["Forms and surveys", "Included", "Included", "Scoped"],
      ["Website and funnel builder, self-service", "Included", "Included", "Scoped"],
      ["Payments, invoices and proposals", "Included", "Included", "Scoped"],
    ],
  },
  {
    title: "Follow-through systems",
    rows: [
      ["Lead capture and response", "Included", "Included", "Scoped"],
      ["Lead Rescue", "Included", "Included", "Scoped"],
      ["Lead Follow-Through", "Included", "Included", "Scoped"],
      ["Quote Chaser", "Included", "Included", "Scoped"],
      ["Appointment Recovery", "Included", "Included", "Scoped"],
      ["Review Engine", "Included", "Included", "Scoped"],
      ["Referral follow-through", "Included", "Included", "Scoped"],
    ],
  },
  {
    title: "Proactive growth",
    rows: [
      ["Reactivation", "—", "Included", "Scoped"],
      ["Repeat and recall", "—", "Included", "Scoped"],
      ["Email marketing broadcasts", "—", "Included", "Scoped"],
      ["Bulk SMS and WhatsApp campaigns", "—", "Included", "Scoped"],
      ["Advanced segmentation", "—", "Included", "Scoped"],
      ["Campaign templates", "—", "Included", "Scoped"],
      ["Social Planner", "—", "Included", "Scoped"],
      ["Ad Manager", "—", "Included", "Scoped"],
      ["Growth marketing AI / Copilot where enabled", "—", "Included", "Scoped"],
    ],
  },
  {
    title: "Support & expansion",
    rows: [
      ["Help AI and knowledge centre", "Included", "Included", "Scoped"],
      ["Standard technical support", "Included", "Included", "Scoped"],
      ["Priority Expert Support", "Optional", "Optional", "Scoped"],
      ["Managed Success", "Optional", "Optional", "Scoped"],
      ["Additional locations", "Inherit organisation tier", "Inherit organisation tier", "Custom scope"],
    ],
  },
] as const;

const LAUNCH_SCOPES = [
  {
    title: "Follow-Through Guided Launch",
    sub: "A focused first build for incoming demand and operational follow-through. From A$997 + GST.",
    items: [
      "One standard data import up to 5,000 records",
      "One Zapla-connected number or forwarding setup",
      "Up to 2 configured pipelines",
      "Up to 3 standard forms or surveys",
      "One standard lead-capture widget",
      "Up to 2 configured calendars",
      "Follow-through Revenue Systems configured",
      "One 60-minute training session",
      "Launch QA and go-live",
    ],
  },
  {
    title: "Growth Guided Launch",
    sub: "Adds the first proactive growth programme and campaign structure. From A$1,497 + GST.",
    items: [
      "Everything in Follow-Through Guided Launch",
      "Up to 3 configured pipelines",
      "Segmentation and campaign structure",
      "First reactivation programme configured",
      "Proactive marketing layer connected",
      "Campaign templates where relevant",
    ],
  },
  {
    title: "Custom Guided Launch",
    sub: "Scoped separately for requirements outside the standard plans.",
    items: [
      "Multi-location or multi-brand rollout",
      "Complex migration planning",
      "Advanced integrations where supported",
      "Non-standard routing or reporting where supported",
      "Implementation and support scope agreed before work starts",
    ],
  },
] as const;

const USAGE = [
  ["Outbound SMS", "A$0.13 + GST", "per carrier segment"],
  ["Inbound SMS", "A$0.02 + GST", "per carrier segment"],
  ["Voice AI overage", "A$0.90 + GST", "per additional minute"],
  ["Email overage", "A$1.00 + GST", "per 1,000 events"],
  ["WhatsApp", "Provider + activation", "shown before enablement"],
] as const;

const ADDONS = [
  {
    title: "AI Receptionist",
    price: "A$199/mo + GST",
    copy: "Includes 200 Voice AI minutes. Available on either standard plan.",
    note: "",
  },
  {
    title: "Priority Expert Support",
    price: "A$149/mo + GST",
    copy: "Faster human troubleshooting, guidance and screen-share help. New builds are not included.",
    note: "Draft candidate",
  },
  {
    title: "Managed Success",
    price: "A$697/mo + GST",
    copy: "A monthly review plus up to 3 effective hours of agreed optimisation or execution.",
    note: "",
  },
  {
    title: "Website AI Chat / AI Front Desk",
    price: "Price under validation",
    copy: "The product placement is clear. Supplier economics and the public price are still being validated.",
    note: "Internal draft",
  },
] as const;

const FAQS = [
  {
    q: "What actually makes Growth different from Follow-Through?",
    a: [
      "Follow-Through starts when demand enters the business: a call, form, chat, enquiry, quote or booking. Zapla captures the moment, responds and keeps the next step moving.",
      "Growth adds the proactive side. You choose an audience and a moment, then run campaigns, recall, nurture, broadcasts, social and ads to create more revenue from people already in your database.",
    ],
  },
  {
    q: "Are stored contacts really unlimited?",
    a: [
      "Yes, on both standard plans, subject to fair use.",
      "Communications such as SMS, email and voice are charged on usage, and unusual high-volume requirements may need a custom scope.",
    ],
  },
  {
    q: "Can different locations be on different plans?",
    a: [
      "The standard rule is one plan per organisation, and additional locations inherit it.",
      "Unusual mixed-use situations can be scoped separately as a custom requirement.",
    ],
  },
  {
    q: "What is the difference between standard support, Priority Expert Support and Managed Success?",
    a: [
      "Standard support covers access, faults and normal product questions and is included on both plans.",
      "Priority Expert Support adds faster human troubleshooting, guidance and screen-share help. Managed Success adds a monthly review plus agreed execution time.",
    ],
  },
  {
    q: "Why is Guided Launch separate from the monthly plan?",
    a: [
      "The monthly plan covers the platform. Guided Launch covers the finite work of mapping your journey, configuring the agreed system, importing your data, training your team and taking the first version live.",
      "Empty software does not change how a business runs, so the first build is treated as its own piece of work.",
    ],
  },
  {
    q: "How long does Ghost to Gold take?",
    a: [
      "It is staged rather than a single blast. Most campaigns run for roughly 3 to 8 weeks, with a standard maximum deployment window of 90 days.",
      "The standard scope covers up to 2,500 eligible contacts already in your database.",
    ],
  },
  {
    q: "Is there a contract or lock-in?",
    a: ["Both standard plans are month-to-month after launch. The current draft has no early termination fee."],
  },
  {
    q: "Is Website AI Chat included?",
    a: ["Not as a fixed-price inclusion yet. Its product placement is clear, but supplier economics and the final public price are still being validated."],
  },
  {
    q: "Why no per-user fee?",
    a: ["Follow-through works best when the people responsible for the customer journey can participate, so both standard plans include unlimited users."],
  },
] as const;

const PORTRAIT_RINGS = [COLORS.amber, COLORS.coral, COLORS.sage, COLORS.apricot, COLORS.rose] as const;
const PORTRAIT_BACKGROUNDS = ["#C89A5D", "#BF7458", "#85845D", "#D69672", "#8E657A", "#B59672"] as const;
const PORTRAITS = Array.from({ length: 24 }, (_, cell) => ({
  cell,
  background: PORTRAIT_BACKGROUNDS[cell % PORTRAIT_BACKGROUNDS.length]!,
  ring: PORTRAIT_RINGS[cell % PORTRAIT_RINGS.length]!,
}));
const CLUSTERS = [
  [3, 14, 8, 21],
  [0, 17, 11, 6],
  [19, 5, 22, 12],
  [9, 1, 16, 23],
  [13, 20, 2, 15],
  [7, 10, 18, 4],
] as const;

function portraitPosition(cell: number) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return `${(column / 5) * 100}% ${(row / 3) * 100}%`;
}

function PricingV3Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <PricingPlans />
      <UnlimitedUsersMarquee />
      <PlanDifference />
      <Comparison />
      <GuidedLaunch />
      <LaunchScope />
      <GhostToGold />
      <CostsAndExpansion />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
    </main>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${light ? "text-[#DDA34B]" : "text-[#C96F55]"}`}>{children}</p>;
}

function SectionHeading({ eyebrow, title, sub, light = false }: { eyebrow: string; title: ReactNode; sub?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-[820px]">
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-[36px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[46px] lg:text-[56px] ${light ? "text-[#F7F4EE]" : "text-[#111318]"}`}
        style={{ fontFamily: DISPLAY }}
      >
        {title}
      </h2>
      {sub ? <p className={`mt-4 max-w-[700px] text-[15px] leading-[1.62] sm:text-[16px] ${light ? "text-white/56" : "text-[#686D69]"}`}>{sub}</p> : null}
    </Reveal>
  );
}

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10 text-[#F7F4EE]" : "bg-[#99A36D]/20 text-[#69735D]"}`}>
      <Check size={11} strokeWidth={2.5} />
    </span>
  );
}

function PricingPlans() {
  return (
    <section id="pricing-v3-plans" className="bg-[#F6F0E8] px-5 pb-10 pt-[104px] sm:px-10 sm:pb-14 sm:pt-[116px] lg:px-16 lg:pb-16 lg:pt-[128px]">
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mx-auto max-w-[980px] text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-3 text-[40px] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>
            <span className="block">One flat price.</span>
            <span className="block">Unlimited users. Unlimited contacts.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[960px] text-[14px] leading-[1.6] text-[#686D69] sm:text-[16px] lg:whitespace-nowrap">
            Follow-Through keeps incoming enquiries moving. Growth adds reactivation and marketing across your database.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#4F544F] sm:text-[12px]">
            {["No per-seat fees", "One-time Guided Launch", "No lock-in"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2"><Tick />{item}</span>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-7 grid max-w-[1180px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((plan, index) => <PlanCard key={plan.name} plan={plan} index={index} />)}
        </div>

        <p className="mx-auto mt-5 max-w-[980px] text-center text-[11px] leading-[1.55] text-[#77716A] sm:text-[12px]">
          * Unlimited stored contacts are subject to fair use. Communications and other usage are charged separately. Prices shown are in AUD and exclude GST.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const growth = plan.tone === "growth";
  const custom = plan.tone === "custom";
  const features = custom ? plan.outcomes : [...PLAN_CONSTANTS, ...plan.outcomes];
  const bg = growth ? "#F0DDC1" : "#FBFAF7";
  const border = growth ? "rgba(221,163,75,.48)" : "rgba(17,19,24,.09)";

  return (
    <Reveal delay={index * 0.04} className="h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-[26px] border p-5 shadow-[0_16px_42px_rgba(48,38,29,.055)] transition-[transform,box-shadow] duration-200 ease-out sm:p-6 md:min-h-[535px] md:hover:-translate-y-[2px] md:hover:shadow-[0_22px_52px_rgba(48,38,29,.09)] motion-reduce:transform-none motion-reduce:transition-none"
        style={{ background: bg, borderColor: border }}
      >
        <div className="flex min-h-[32px] flex-wrap items-center gap-2">
          <h2 className="text-[26px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{plan.name}</h2>
          {growth ? (
            <span className="inline-flex rounded-full bg-[#1E2B29] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#F7F4EE] shadow-[0_3px_10px_rgba(30,43,41,.12)]">
              Recommended
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-[13px] leading-[1.5] text-[#666A65] md:min-h-[78px]">
          <span className="font-semibold text-[#343631]">{plan.promise}</span>{" "}{plan.fit}
        </p>

        <div className="mt-5 flex items-end gap-2">
          <div className="text-[46px] font-medium leading-none tracking-[-0.065em] sm:text-[50px]" style={{ fontFamily: DISPLAY }}>{plan.price}</div>
          <div className="pb-1 text-[11px] font-semibold text-[#77716A]">{plan.priceLabel}</div>
        </div>

        <div className="mt-4 rounded-[15px] border border-black/[0.06] bg-white/55 px-3.5 py-3">
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9A7550]">Guided Launch</div>
          <div className="mt-1 text-[12px] font-semibold leading-[1.4] text-[#373833]">{plan.launch}</div>
        </div>

        <button
          type="button"
          onClick={() => setFeaturesOpen((value) => !value)}
          aria-expanded={featuresOpen}
          className="mt-4 flex w-full items-center justify-between rounded-[12px] border border-black/[0.07] px-3.5 py-2.5 text-left text-[12px] font-semibold text-[#343631] md:hidden"
        >
          <span>{featuresOpen ? "Hide inclusions" : "What's included"}</span>
          <ChevronDown size={15} className={`transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
        </button>

        <ul className={`${featuresOpen ? "grid" : "hidden"} mt-4 gap-2.5 md:grid md:mt-5`}>
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[12.5px] leading-[1.45] text-[#4E504B]">
              <Tick />
              <span className={feature === "Everything in Follow-Through" ? "font-semibold" : ""}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 md:mt-auto md:pt-5">
          <p className="min-h-[54px] border-t border-black/[0.07] pt-4 text-[11.5px] leading-[1.5] text-[#686C67]">{plan.platform}</p>
          <a
            href={BOOK_URL}
            className={`group mt-4 inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full px-5 text-[12.5px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B] ${growth ? "bg-[#1E2B29] text-[#F7F4EE]" : "border border-[#1E2B29]/18 bg-white text-[#1E2B29]"}`}
          >
            {plan.cta}<ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function AvatarCluster({ clusterIndex }: { clusterIndex: number }) {
  const cells = CLUSTERS[clusterIndex % CLUSTERS.length]!;
  return (
    <span className="inline-flex shrink-0 items-center pl-1" aria-hidden="true">
      {cells.map((cell, index) => {
        const portrait = PORTRAITS[cell]!;
        return (
          <span
            key={`${clusterIndex}-${cell}`}
            className={`relative h-8 w-8 rounded-full border-2 border-[#F6F2EB] sm:h-10 sm:w-10 ${index ? "-ml-1.5" : ""}`}
            style={{
              backgroundColor: portrait.background,
              backgroundImage: "url(/concept/revenue/soft-autumn-portraits-v1.webp)",
              backgroundPosition: portraitPosition(cell),
              backgroundRepeat: "no-repeat",
              backgroundSize: "600% 400%",
              boxShadow: `0 0 0 1.5px ${portrait.ring}`,
            }}
          />
        );
      })}
    </span>
  );
}

function MarqueeSequence({ offset }: { offset: number }) {
  return (
    <div className="pricing-v3-marquee-sequence flex shrink-0 items-center gap-4 pr-8 sm:gap-6 sm:pr-12">
      <span>Unlimited users.</span>
      <AvatarCluster clusterIndex={offset} />
      <span className="text-[#4E5350]">Unlimited contacts.</span>
      <AvatarCluster clusterIndex={offset + 1} />
      <span className="text-[#C96F55]">One flat price.</span>
      <AvatarCluster clusterIndex={offset + 2} />
    </div>
  );
}

function MarqueeGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="pricing-v3-marquee-group flex shrink-0" aria-hidden={duplicate || undefined}>
      {[0, 3, 6].map((offset) => <MarqueeSequence key={offset} offset={offset} />)}
    </div>
  );
}

function UnlimitedUsersMarquee() {
  return (
    <section className="pricing-v3-marquee-shell flex h-[72px] items-center overflow-hidden bg-[#F6F2EB] sm:h-[92px]" aria-label="Unlimited users and contacts on every standard Zapla plan">
      <p className="sr-only">Unlimited users. Unlimited contacts. One flat price.</p>
      <div className="pricing-v3-marquee-track flex w-max items-center whitespace-nowrap text-[26px] font-medium leading-none tracking-[-0.035em] sm:text-[36px]" style={{ fontFamily: DISPLAY }}>
        <MarqueeGroup />
        <MarqueeGroup duplicate />
      </div>
      <style>{`
        @keyframes pricing-v3-unlimited-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .pricing-v3-marquee-track { animation: pricing-v3-unlimited-marquee 64s linear infinite; will-change: transform; }
        @media (hover:hover) and (pointer:fine) { .pricing-v3-marquee-shell:hover .pricing-v3-marquee-track { animation-play-state: paused; } }
        @media (prefers-reduced-motion:reduce) {
          .pricing-v3-marquee-track { animation:none; margin-inline:auto; }
          .pricing-v3-marquee-group:not(:first-child), .pricing-v3-marquee-group .pricing-v3-marquee-sequence:not(:first-child) { display:none; }
          .pricing-v3-marquee-sequence { padding-right:0; }
        }
      `}</style>
    </section>
  );
}

const PLAN_PATHS = [
  {
    name: "Follow-Through",
    copy: "Demand enters through a call, form, chat, quote or booking. Zapla captures it, responds and keeps the next step moving.",
    steps: ["Incoming call or enquiry", "Captured & responded", "Followed through", "Booking or sale"],
    color: COLORS.apricot,
  },
  {
    name: "Growth",
    copy: "Growth starts with the people already in your database and gives you a proactive way to create another reason to buy.",
    steps: ["Existing leads & customers", "Segment or timing", "Proactive campaign", "Repeat revenue"],
    color: COLORS.amber,
  },
] as const;

function PlanDifference() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const active = reduced || inView;

  return (
    <section className="bg-[#F7F4EE] px-5 py-16 text-[#111318] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Follow-Through vs Growth"
          title={<>One captures and follows through. <span className="text-[#C96F55]">The other creates more from your database.</span></>}
          sub="Follow-Through handles the calls, enquiries, quotes, bookings and customer moments already happening. Growth includes all of that, then adds proactive campaigns across the people already in your database."
        />
        <div ref={ref} className="mt-9 grid gap-4 lg:grid-cols-2">
          {PLAN_PATHS.map((path, pathIndex) => (
            <Reveal key={path.name} delay={pathIndex * 0.06}>
              <article className={`h-full rounded-[22px] border p-5 shadow-[0_12px_34px_rgba(48,38,29,.04)] sm:p-6 ${pathIndex === 1 ? "border-[#DDA34B]/45 bg-[#FFF8E8]" : "border-black/[0.07] bg-[#FBFAF7]"}`}>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: path.color }}>{path.name}</p>
                <h3 className="mt-2 text-[25px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
                  {pathIndex === 0 ? "Capture the demand already coming in." : "Create more from the people you already know."}
                </h3>
                <p className="mt-2 min-h-[42px] text-[12.5px] leading-[1.55] text-[#686D69]">{path.copy}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_16px_1fr_16px_1fr_16px_1fr] sm:items-center">
                  {path.steps.map((step, index) => (
                    <Fragment key={step}>
                      <div
                        className="rounded-[12px] border bg-white px-3 py-3 text-center text-[10.5px] font-semibold text-[#4F544F] shadow-[0_4px_12px_rgba(48,38,29,.025)] transition-[opacity,transform,border-color] duration-500 motion-reduce:transition-none"
                        style={{
                          opacity: active ? 1 : 0.35,
                          transform: active ? "translateY(0)" : "translateY(7px)",
                          borderColor: active ? `${path.color}66` : "rgba(17,19,24,.08)",
                          transitionDelay: reduced ? undefined : `${180 + pathIndex * 120 + index * 160}ms`,
                        }}
                      >
                        {step}
                      </div>
                      {index < path.steps.length - 1 ? <ArrowRight size={13} className="mx-auto rotate-90 text-[#8C877F] sm:rotate-0" /> : null}
                    </Fragment>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-[#FBFAF7] px-5 py-9 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Eyebrow>Compare</Eyebrow>
            <h2 className="mt-2 text-[26px] font-medium tracking-[-0.04em] text-[#111318] sm:text-[30px]" style={{ fontFamily: DISPLAY }}>Compare what changes.</h2>
            <p className="mt-2 max-w-[720px] text-[13px] leading-[1.55] text-[#686D69]">The operating platform and follow-through systems are shared. Growth adds the proactive marketing layer.</p>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="pricing-v3-comparison"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-[44px] w-fit shrink-0 items-center gap-2 rounded-full border border-[#1E2B29]/18 bg-[#F6F0E8] px-5 text-[12px] font-semibold text-[#1E2B29] shadow-[0_8px_20px_rgba(48,38,29,.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]"
          >
            {open ? "Hide comparison" : "Compare all features"}
            <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div id="pricing-v3-comparison" className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="hidden overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_18px_48px_rgba(48,38,29,.05)] lg:block">
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr>
                    {["Capability", "Follow-Through", "Growth", "Custom"].map((heading, index) => (
                      <th key={heading} className={`border-b border-black/[0.07] px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] ${index === 0 ? "sticky left-0 z-10 bg-white" : ""} ${index === 2 ? "bg-[#FFF2D8] text-[#8A641F]" : "text-[#77716A]"}`}>{heading}</th>
                    ))}
                  </tr>
                </thead>
                {COMPARISON_GROUPS.map((group) => (
                  <tbody key={group.title}>
                    <tr><th colSpan={4} className="border-y border-black/[0.07] bg-[#F3EEE6] px-5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B7054]">{group.title}</th></tr>
                    {group.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, index) => index === 0 ? (
                          <th key={cell} scope="row" className="sticky left-0 z-10 border-b border-black/[0.055] bg-white px-5 py-3 text-left font-semibold text-[#292C29]">{cell}</th>
                        ) : (
                          <td key={`${row[0]}-${index}`} className={`border-b border-black/[0.055] px-5 py-3 text-[#606560] ${index === 2 ? "bg-[#FFFAEE]" : ""}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            <div className="grid gap-3 lg:hidden">
              {COMPARISON_GROUPS.map((group, index) => <ComparisonGroup key={group.title} group={group} defaultOpen={index === 0} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonGroup({ group, defaultOpen }: { group: (typeof COMPARISON_GROUPS)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-[18px] border border-black/[0.07] bg-white">
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6E5A45]">{group.title}</span>
        <ChevronDown size={16} className={`text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden border-t border-black/[0.06]">
          {group.rows.map((row) => (
            <div key={row[0]} className="border-b border-black/[0.055] px-5 py-4 last:border-0">
              <p className="text-[12.5px] font-semibold text-[#303330]">{row[0]}</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Follow-Through", "Growth", "Custom"].map((name, index) => (
                  <div key={name} className={index === 1 ? "rounded-[9px] bg-[#FFF8E8] p-2" : "p-2"}>
                    <span className="block text-[7px] font-bold uppercase tracking-[0.08em] text-[#88817A]">{name}</span>
                    <span className="mt-1 block text-[10.5px] leading-[1.35] text-[#565B56]">{row[index + 1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const STAGES = [
  { label: "Map", copy: "Your workflow, team and customer journey.", Icon: Map, color: COLORS.sage },
  { label: "Build", copy: "The system, workflows and connections that matter.", Icon: Boxes, color: COLORS.plum },
  { label: "Launch", copy: "Training, QA and rollout with your team.", Icon: Rocket, color: COLORS.apricot },
] as const;

function GuidedLaunch() {
  return (
    <section className="relative overflow-hidden bg-[#111214] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16">
        <Reveal className="max-w-[660px]">
          <Eyebrow light>Guided Launch</Eyebrow>
          <h2 className="mt-5 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[56px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>
            We don't hand you software.<br /><span className="text-[#D58C75]">We build it around how you work.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-white/56 sm:text-[17px]">
            We map your customer journey, configure the agreed system, connect the pieces that matter and launch it with your team.
          </p>
        </Reveal>
        <GuidedStages />
      </div>
    </section>
  );
}

function GuidedStages() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const active = reduced || inView;

  return (
    <div ref={ref} className="relative grid gap-3 sm:grid-cols-[1fr_20px_1fr_20px_1fr] sm:gap-0">
      {STAGES.map((stage, index) => (
        <Fragment key={stage.label}>
          <Reveal delay={index * 0.05} className="h-full">
            <article
              className="h-full rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-5 transition-colors duration-500 motion-reduce:transition-none"
              style={{ borderColor: active ? "rgba(255,255,255,.16)" : undefined, transitionDelay: reduced ? undefined : `${300 + index * 300}ms` }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/[0.08] bg-white/[0.035] transition-opacity duration-500 motion-reduce:transition-none"
                style={{ color: stage.color, opacity: active ? 1 : 0.42, transitionDelay: reduced ? undefined : `${300 + index * 300}ms` }}
              >
                <stage.Icon size={18} strokeWidth={1.8} />
              </div>
              <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: stage.color }}>0{index + 1}</p>
              <h3 className="mt-1.5 text-[22px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{stage.label}</h3>
              <p className="mt-2 text-[12.5px] leading-[1.55] text-white/50">{stage.copy}</p>
            </article>
          </Reveal>
          {index < 2 ? <Connector active={active} delay={430 + index * 320} /> : null}
        </Fragment>
      ))}
    </div>
  );
}

function Connector({ active, delay }: { active: boolean; delay: number }) {
  const reduced = !!useReducedMotion();
  return (
    <div className="relative hidden sm:block" aria-hidden="true">
      <div className="absolute inset-x-0 top-10 h-px bg-white/[0.08]">
        <div className="h-px bg-white/25 transition-[width] duration-[260ms] motion-reduce:transition-none" style={{ width: active ? "100%" : "0%", transitionDelay: reduced ? undefined : `${delay}ms` }} />
      </div>
    </div>
  );
}

function LaunchScope() {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <section className="bg-[#F6F0E8] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="What gets built"
          title={<>What's included in your <span className="text-[#C96F55]">Guided Launch.</span></>}
          sub="Your monthly plan gives you the platform. Guided Launch is the first agreed build, scoped to the plan you choose."
        />
        <div className="mt-8 grid gap-2.5">
          {LAUNCH_SCOPES.map((scope, index) => {
            const open = openIndex === index;
            return (
              <Accordion
                key={scope.title}
                title={scope.title}
                sub={scope.sub}
                open={open}
                onToggle={() => setOpenIndex(open ? -1 : index)}
              >
                <div className="grid gap-x-7 gap-y-2.5 sm:grid-cols-2">
                  {scope.items.map((item) => <div key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-[#555A56]"><Tick />{item}</div>)}
                </div>
              </Accordion>
            );
          })}
        </div>
        <p className="mt-4 rounded-[15px] border border-black/[0.07] bg-white/70 px-4 py-3 text-[11.5px] leading-[1.55] text-[#66625D]">
          <strong className="text-[#343631]">After launch:</strong> the builders remain available for self-service use. Additional Zapla-built work moves to Managed Success or quoted custom work.
        </p>
      </div>
    </section>
  );
}

function Accordion({ title, sub, open, onToggle, children }: { title: string; sub?: string; open: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <div className={`overflow-hidden rounded-[18px] border bg-white transition-colors duration-200 ${open ? "border-black/[0.12] shadow-[0_10px_28px_rgba(48,38,29,.05)]" : "border-black/[0.07]"}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className="flex w-full items-start justify-between gap-5 px-5 py-4 text-left sm:px-6 sm:py-5">
        <div>
          <h3 className="text-[18px] font-medium tracking-[-0.03em]" style={{ fontFamily: DISPLAY }}>{title}</h3>
          {sub ? <p className="mt-1 text-[12px] leading-[1.45] text-[#77716A]">{sub}</p> : null}
        </div>
        <ChevronDown size={17} className={`mt-1 shrink-0 text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="border-t border-black/[0.06] px-5 pb-6 pt-4 sm:px-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

function GhostToGold() {
  const facts = [
    "One staged campaign, not a single blast",
    "Up to 2,500 eligible contacts",
    "Typical target: roughly 3 to 8 weeks",
    "Standard maximum deployment: 90 days",
    "Above 5,000 contacts: custom scope",
  ];

  return (
    <section className="bg-[#FBFAF7] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="overflow-hidden rounded-[26px] bg-[#1E2B29] p-6 text-[#F7F4EE] sm:p-8 lg:p-10">
          <div className="grid gap-9 lg:grid-cols-[1fr_.9fr] lg:items-center lg:gap-14">
            <div>
              <Eyebrow light>Ghost to Gold</Eyebrow>
              <h2 className="mt-5 text-[38px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[50px] lg:text-[58px]" style={{ fontFamily: DISPLAY }}>
                Start with the database <span className="text-[#DDA34B]">you already own.</span>
              </h2>
              <p className="mt-4 max-w-[610px] text-[14px] leading-[1.65] text-white/58 sm:text-[16px]">
                A staged reactivation campaign for eligible contacts already in your database, paced around sender readiness and response behaviour rather than an arbitrary 30-day deadline.
              </p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.045] p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <PriceBlock title="Sprint" price="A$997 + GST" />
                <PriceBlock title="Managed" price="A$1,497 + GST" />
              </div>
              <div className="mt-5 grid gap-3">
                {facts.map((fact) => <div key={fact} className="flex items-center gap-3 text-[12.5px] text-white/70"><CircleDot size={14} className="shrink-0 text-[#D58C75]" />{fact}</div>)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PriceBlock({ title, price }: { title: string; price: string }) {
  return (
    <div className="rounded-[15px] border border-white/10 bg-black/10 p-4">
      <p className="text-[10px] text-white/52">Ghost to Gold {title}</p>
      <p className="mt-2 text-[22px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{price}</p>
    </div>
  );
}

function CostsAndExpansion() {
  return (
    <section className="bg-[#FBFAF7] px-5 pb-16 pt-4 sm:px-10 sm:pb-20 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="No surprises"
          title={<>Know what sits <span className="text-[#777B76]">outside the plan.</span></>}
          sub="Usage-heavy services and optional specialist help are clear before you enable them."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-[24px] border border-black/[0.07] bg-white p-6">
            <Eyebrow>Usage</Eyebrow>
            <div className="mt-5">
              {USAGE.map(([name, price, unit], index) => (
                <div key={name} className={`grid gap-1 py-3.5 sm:grid-cols-[1fr_auto] ${index ? "border-t border-black/[0.06]" : ""}`}>
                  <p className="text-[13px] font-semibold">{name}</p>
                  <p className="text-[12px] text-[#5E625E]"><strong>{price}</strong> {unit}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05} className="rounded-[24px] border border-black/[0.07] bg-[#EFE2D2] p-6">
            <Eyebrow>Add more when you need it</Eyebrow>
            <div className="mt-5">
              {ADDONS.map((item, index) => (
                <div key={item.title} className={`py-3.5 ${index ? "border-t border-black/[0.07]" : ""}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[16px] font-medium" style={{ fontFamily: DISPLAY }}>{item.title}</h3>
                    <strong className="text-[11px]">{item.price}</strong>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-[1.5] text-[#66615C]">{item.copy}</p>
                  {item.note ? <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9A7550]">{item.note}</p> : null}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F0ECE5] px-5 py-16 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="Pricing FAQ"
          title={<>The questions people ask <span className="text-[#777B76]">before they choose.</span></>}
          sub="Costs, rollout, usage and the practical details behind the plans."
        />
        <div className="mt-8 grid gap-2.5 md:grid-cols-2 md:items-start">
          {FAQS.map((faq, index) => <FaqItem key={faq.q} faq={faq} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, index }: { faq: (typeof FAQS)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={(index % 2) * 0.03}>
      <div className="overflow-hidden rounded-[17px] border border-black/[0.07] bg-white/90">
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
          <span className="text-[14px] font-semibold leading-[1.35] text-[#292B28]">{faq.q}</span>
          <ChevronDown size={16} className={`shrink-0 text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <div className="space-y-2.5 border-t border-black/[0.06] px-5 pb-5 pt-3.5 text-[12.5px] leading-[1.58] text-[#666B66]">
              {faq.a.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FinalCta() {
  return (
    <section id="pricing-v3-final-cta" className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end lg:gap-16">
        <div>
          <Eyebrow light>Still not sure which plan fits?</Eyebrow>
          <h2 className="mt-5 text-[46px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[62px] lg:text-[74px]" style={{ fontFamily: DISPLAY }}>
            We'll map it <span className="text-[#D98670]">with you.</span>
          </h2>
        </div>
        <div className="lg:pb-1">
          <p className="max-w-[480px] text-[15px] leading-[1.65] text-white/60">Book a short call and we'll recommend the simplest standard plan or custom scope that fits how your business works.</p>
          <a href={BOOK_URL} className="group mt-6 inline-flex h-[48px] items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[12.5px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">
            Book a Call <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 360;
      setVisible(window.scrollY > 520 && !nearBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const section = document.getElementById("pricing-v3-final-cta");
    const observer = section && typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([entry]) => setFinalVisible(Boolean(entry?.isIntersecting)), { threshold: 0.08 })
      : null;
    if (section && observer) observer.observe(section);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  if (!visible || finalVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: EASE }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-[#F7F4EE]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"
    >
      <a href={BOOK_URL} className="block rounded-full bg-[#1E2B29] px-4 py-3 text-center text-[13px] font-semibold text-[#F7F4EE]">Book a Call</a>
    </motion.div>
  );
}
