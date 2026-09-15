import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, Fragment, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, Map, Boxes, Rocket } from "lucide-react";

export const Route = createFileRoute("/Pricing-v3")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Pricing V3 Internal Draft | Zapla" },
      {
        name: "description",
        content:
          "Internal Zapla pricing draft covering Follow-Through, Growth and custom implementation requirements.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pricing V3 Internal Draft | Zapla" },
      {
        property: "og:description",
        content:
          "Internal Zapla pricing draft covering Follow-Through, Growth and custom implementation requirements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PricingV3Page,
});

/* ------------------------------------------------------------------ */
/* Design constants — taken from /pricing-v2 so the page reads as V2   */
/* ------------------------------------------------------------------ */

const BOOK_URL = "https://zapla.io/booking";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const COLORS = {
  ink: "#111318",
  coral: "#E97D62",
  rose: "#C96C85",
  amber: "#DDA34B",
  sage: "#99A36D",
  plum: "#9B86B8",
  apricot: "#D58C75",
} as const;

const PORTRAIT_RINGS = [COLORS.amber, COLORS.coral, COLORS.sage, COLORS.apricot, COLORS.rose] as const;
const PORTRAIT_BACKGROUNDS = ["#C89A5D", "#BF7458", "#85845D", "#D69672", "#8E657A", "#B59672"] as const;

// 24 distinct cells on the 6x4 portrait sheet.
const PRICING_PORTRAITS = Array.from({ length: 24 }, (_, index) => ({
  cell: index,
  background: PORTRAIT_BACKGROUNDS[index % PORTRAIT_BACKGROUNDS.length]!,
  ring: PORTRAIT_RINGS[index % PORTRAIT_RINGS.length]!,
}));

// Six clusters of four faces: 24 unique portraits before any exact visual repeat.
const PORTRAIT_CLUSTERS = [
  [3, 14, 8, 21],
  [0, 17, 11, 6],
  [19, 5, 22, 12],
  [9, 1, 16, 23],
  [13, 20, 2, 15],
  [7, 10, 18, 4],
];

function portraitPosition(cell: number) {
  const column = cell % 6;
  const row = Math.floor(cell / 6);
  return `${(column / 5) * 100}% ${(row / 3) * 100}%`;
}

/* ------------------------------------------------------------------ */
/* Commercial content                                                  */
/* ------------------------------------------------------------------ */

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
  track: string;
};

const PLANS: Plan[] = [
  {
    name: "Follow-Through",
    promise: "Stop losing the business already coming to you.",
    fit: "For service businesses that need every enquiry, call, quote and appointment followed through.",
    price: "A$399",
    priceLabel: "/mo + GST",
    launch: "from A$997 + GST",
    outcomes: [
      "Respond to missed calls and new enquiries",
      "Keep leads and quotes moving",
      "Recover bookings and no-shows",
      "Automate reviews and customer follow-up",
    ],
    platform: "CRM, inbox, pipelines, calendars, forms, invoicing and more included.",
    cta: "Book a Call",
    tone: "standard",
    track: "followthrough_cta",
  },
  {
    name: "Growth",
    promise: "Turn the customers and leads you already have into more revenue.",
    fit: "For businesses ready to proactively reactivate, recall, nurture and market to their customer base.",
    price: "A$699",
    priceLabel: "/mo + GST",
    launch: "from A$1,497 + GST",
    outcomes: [
      "Everything in Follow-Through",
      "Reactivate dormant leads and customers",
      "Automate repeat, recall and nurture campaigns",
      "Run targeted email, SMS and WhatsApp campaigns",
      "Segment and market proactively across your database",
    ],
    platform: "Includes Growth marketing tools such as Social Planner, Ad Manager and campaign templates.",
    cta: "Book a Call",
    tone: "growth",
    track: "growth_cta",
  },
  {
    name: "Custom",
    promise: "For businesses that don't fit neatly into a standard plan.",
    fit: "Multi-location or multi-brand operations, complex migrations, advanced integrations or non-standard implementation requirements.",
    price: "Custom",
    priceLabel: "Let's scope it",
    launch: "Custom Guided Launch",
    outcomes: [
      "Multi-location or multi-brand rollout",
      "Complex migrations or integrations",
      "Non-standard routing or reporting where supported",
      "Higher-volume or unusual implementation requirements",
      "Commercial and support scope agreed upfront",
    ],
    platform: "Requirements, rollout and ongoing support are agreed before work starts.",
    cta: "Talk to us",
    tone: "custom",
    track: "custom_cta",
  },
];

const PLAN_PATHS = [
  {
    name: "Follow-Through",
    copy: "A call, enquiry, quote, booking or customer moment creates the trigger. Zapla makes sure the next step actually happens.",
    steps: ["Live event", "Zapla follows through", "Demand captured"],
    color: COLORS.apricot,
  },
  {
    name: "Growth",
    copy: "You choose who to reach and when, then create new demand from the leads and customers already in your database.",
    steps: ["Audience or time trigger", "Proactive campaign", "More revenue"],
    color: COLORS.amber,
  },
] as const;

const COMPARISON_GROUPS: { title: string; rows: [string, string, string, string][] }[] = [
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
      ["Lead-capture widget", "Included", "Included", "Scoped"],
      ["Payments and invoicing", "Included", "Included", "Scoped"],
      ["Contracts and proposals", "Included", "Included", "Scoped"],
      ["Operational templates", "Included", "Included", "Scoped"],
    ],
  },
  {
    title: "Follow-through systems",
    rows: [
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
      ["Reactivation", "Not included", "Included", "Scoped"],
      ["Repeat and recall", "Not included", "Included", "Scoped"],
      ["Email marketing broadcasts", "Not included", "Included", "Scoped"],
      ["Bulk SMS and WhatsApp campaigns", "Not included", "Included", "Scoped"],
      ["Advanced segmentation", "Not included", "Included", "Scoped"],
      ["Campaign templates", "Not included", "Included", "Scoped"],
      ["Social Planner", "Not included", "Included", "Scoped"],
      ["Ad Manager", "Not included", "Included", "Scoped"],
      ["Growth marketing AI and Copilot where enabled", "Not included", "Included", "Scoped"],
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
];

const LAUNCH_SCOPES = [
  {
    title: "Follow-Through Guided Launch",
    sub: "A focused first build for live demand and operational follow-through. From A$997 + GST.",
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
      "Everything in the Follow-Through Guided Launch",
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

const GHOST_FACTS = [
  "One staged campaign, not a single blast",
  "Up to 2,500 eligible contacts",
  "Typically runs for roughly 3 to 8 weeks",
  "Standard maximum deployment window of 90 days",
  "Above 5,000 contacts is custom scoped",
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
    copy: "Includes 200 Voice AI minutes, with additional minutes charged at the usage rate above. Available on either standard plan.",
    draft: false,
  },
  {
    title: "Priority Expert Support",
    price: "A$149/mo + GST",
    copy: "Faster human troubleshooting, guidance and screen-share help. It does not include new workflow, campaign or website building.",
    draft: true,
  },
  {
    title: "Managed Success",
    price: "A$697/mo + GST",
    copy: "A monthly review plus up to 3 hours of agreed optimisation or execution each month. Hours do not roll over.",
    draft: false,
  },
  {
    title: "Website AI Chat",
    price: "Price under validation",
    copy: "Where this sits in the product is clear. The public price is still being validated, so it is not yet a fixed commitment.",
    draft: true,
  },
] as const;

const FAQS = [
  {
    q: "What actually makes Growth different from Follow-Through?",
    a: [
      "Follow-Through reacts to something that has already happened: a missed call, a new enquiry, a quote sitting unanswered, a booking that needs recovering. It makes sure the next step happens.",
      "Growth adds the proactive side. You choose an audience and a moment, then run campaigns, recall, nurture, broadcasts, social and ads to create demand from the people already in your database.",
    ],
  },
  {
    q: "Are stored contacts really unlimited?",
    a: [
      "Yes, on both standard plans, subject to fair use.",
      "Communications such as SMS, email and voice are charged on usage, and unusual high-volume operational requirements may need a custom scope.",
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
      "Priority Expert Support adds faster human troubleshooting, guidance and screen-share help. Managed Success adds a monthly review plus a set number of hours of agreed work each month.",
    ],
  },
  {
    q: "Why is Guided Launch separate from the monthly plan?",
    a: [
      "The monthly plan covers the platform. Guided Launch covers the finite work of mapping your journey, configuring the agreed system, importing your data, training your team and taking the first version live.",
      "Empty software does not change how a business runs, so we treat the first build as its own piece of work.",
    ],
  },
  {
    q: "How long does Ghost to Gold take?",
    a: [
      "It is staged rather than a single send. Most campaigns run for roughly 3 to 8 weeks, with a standard maximum deployment window of 90 days.",
      "The standard scope covers up to 2,500 eligible contacts already in your database.",
    ],
  },
  {
    q: "Is there a contract or lock-in?",
    a: ["Both standard plans are month-to-month after launch, with no early termination fee."],
  },
  {
    q: "Is Website AI Chat available yet?",
    a: [
      "Not as a fixed-price item. Where it sits in the product is clear, but the price is still being validated, so we will only quote it once that is settled.",
    ],
  },
  {
    q: "Why is there no per-user fee?",
    a: [
      "Follow-through only works when the people responsible for the customer can take part.",
      "Charging per seat quietly discourages that, so unlimited users are included on both standard plans.",
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Shared primitives (V2 behaviour)                                    */
/* ------------------------------------------------------------------ */

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

function Eyebrow({ children, accent = COLORS.coral }: { children: ReactNode; accent?: string }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent, fontFamily: BODY }}>
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
  accent = COLORS.coral,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  accent?: string;
  light?: boolean;
}) {
  return (
    <Reveal className="max-w-[820px]">
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-[36px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[46px] lg:text-[56px] ${light ? "text-[#F7F4EE]" : "text-[#111318]"}`}
        style={{ fontFamily: DISPLAY }}
      >
        {title}
      </h2>
      {sub ? (
        <p className={`mt-4 max-w-[700px] text-[15px] leading-[1.62] sm:text-[16px] ${light ? "text-white/56" : "text-[#686D69]"}`}>
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}

function CheckMark({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
      style={{ background: dark ? "rgba(255,255,255,.10)" : "rgba(153,163,109,.18)", color: dark ? "#F7F4EE" : "#69735D" }}
    >
      <Check size={11} strokeWidth={2.5} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function PricingV3Page() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <PricingPlans />
      <UnlimitedUsersMarquee />
      <PlanDifference />
      <Comparison />
      <GuidedLaunch />
      <LaunchScope />
      <GhostToGold />
      <CostsExtra />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
    </div>
  );
}

function PricingPlans() {
  return (
    <section
      id="pricing"
      className="bg-[#F6F0E8] px-5 pb-10 pt-[104px] sm:px-10 sm:pb-14 sm:pt-[116px] lg:px-16 lg:pb-16 lg:pt-[128px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h1
            className="mt-3 text-[40px] font-medium leading-[0.98] tracking-[-0.055em] text-[#111318] sm:text-[54px] lg:text-[62px]"
            style={{ fontFamily: DISPLAY }}
          >
            One flat price. Unlimited users.
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-[14px] leading-[1.6] text-[#686D69] sm:text-[16px]">
            Choose the level of follow-through your business needs. Every plan includes unlimited users and unlimited
            stored contacts, with a one-time Guided Launch to configure Zapla around how you work.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#4F544F] sm:text-[12px]">
            {["AUD pricing", "Unlimited users", "Unlimited stored contacts*", "Month-to-month"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckMark />
                {item}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] leading-[1.5] text-[#918A81]">
            Internal draft. Prices and selected expansion items are still under review.
          </p>
        </Reveal>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-[980px] text-center text-[11px] leading-[1.55] text-[#77716A] sm:text-[12px]">
          * Unlimited stored contacts are subject to fair use. Prices are in AUD and exclude GST. SMS, email, voice AI,
          WhatsApp, domains, payment gateway or card fees, ad spend, third-party tools, complex migrations and custom
          build work may be separate. Month-to-month after launch.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const growth = plan.tone === "growth";
  const custom = plan.tone === "custom";
  const bg = growth ? "#FFF2D8" : custom ? "#F2EEE7" : "#FBFAF7";
  const border = growth ? "rgba(221,163,75,.62)" : custom ? "rgba(17,19,24,.075)" : "rgba(17,19,24,.09)";

  return (
    <Reveal delay={index * 0.04} className="h-full">
      <article
        className="flex h-full flex-col overflow-hidden rounded-[26px] border p-5 shadow-[0_16px_42px_rgba(48,38,29,.055)] transition-[transform,box-shadow] duration-200 ease-out sm:p-6 md:min-h-[600px] md:hover:-translate-y-[2px] md:hover:shadow-[0_22px_52px_rgba(48,38,29,.09)] motion-reduce:transform-none motion-reduce:transition-none"
        style={{ background: bg, borderColor: border, color: COLORS.ink }}
      >
        <h3 className="text-[26px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>
          {plan.name}
        </h3>

        <p
          className="mt-2.5 text-[17px] font-medium leading-[1.2] tracking-[-0.028em] text-[#262925] md:min-h-[42px]"
          style={{ fontFamily: DISPLAY }}
        >
          {plan.promise}
        </p>

        <p className="mt-2 text-[12.5px] leading-[1.5] text-[#666A65] md:min-h-[58px]">{plan.fit}</p>

        <div className="mt-5 flex min-h-[50px] items-end gap-2">
          <div
            className={`font-medium leading-none tracking-[-0.065em] ${custom ? "text-[40px] sm:text-[42px]" : "text-[46px] sm:text-[50px]"}`}
            style={{ fontFamily: DISPLAY }}
          >
            {plan.price}
          </div>
          <div className="pb-1 text-[11px] font-semibold text-[#77716A]">{plan.priceLabel}</div>
        </div>

        <div className="mt-4 rounded-[15px] border border-black/[0.06] bg-white/55 px-3.5 py-3">
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9A7550]">One-time Guided Launch</div>
          <div className="mt-1 text-[12px] font-semibold leading-[1.4] text-[#373833]">{plan.launch}</div>
        </div>

        <button
          type="button"
          onClick={() => setFeaturesOpen((value) => !value)}
          aria-expanded={featuresOpen}
          className="mt-4 flex w-full items-center justify-between rounded-[12px] border border-black/[0.07] px-3.5 py-2.5 text-left text-[12px] font-semibold text-[#343631] md:hidden"
        >
          <span>{featuresOpen ? "Hide what you get" : "What you get"}</span>
          <ChevronDown size={15} className={`transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
        </button>

        <ul className={`${featuresOpen ? "grid" : "hidden"} mt-4 gap-2.5 md:grid md:mt-5`}>
          {plan.outcomes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.45] text-[#4E504B]">
              <CheckMark />
              <span className={item.startsWith("Everything") ? "font-semibold" : ""}>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 border-t border-black/[0.07] pt-4 text-[11.5px] leading-[1.5] text-[#6C706B]">{plan.platform}</p>

        <div className="mt-5 md:mt-auto md:pt-5">
          <a
            href={BOOK_URL}
            data-track={plan.track}
            className={`group inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full px-5 text-[12.5px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B] ${growth ? "bg-[#1E2B29] text-[#F7F4EE]" : "border border-[#1E2B29]/18 bg-white text-[#1E2B29]"}`}
          >
            {plan.cta}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
            />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* B. Unlimited users marquee (V2 behaviour)                           */
/* ------------------------------------------------------------------ */

function AvatarCluster({ clusterIndex }: { clusterIndex: number }) {
  const cells = PORTRAIT_CLUSTERS[clusterIndex % PORTRAIT_CLUSTERS.length]!;
  return (
    <span className="inline-flex shrink-0 items-center pl-1" aria-hidden="true">
      {cells.map((cell, index) => {
        const portrait = PRICING_PORTRAITS[cell]!;
        return (
          <span
            key={`${clusterIndex}-${cell}`}
            className={`relative h-8 w-8 rounded-full border-2 border-[#F6F2EB] sm:h-10 sm:w-10 ${index === 0 ? "" : "-ml-1.5"}`}
            style={{
              backgroundColor: portrait.background,
              backgroundImage: "url(/concept/revenue/soft-autumn-portraits-v1.webp)",
              backgroundPosition: portraitPosition(portrait.cell),
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
      <span className="text-[#C96F55]">One flat price.</span>
      <AvatarCluster clusterIndex={offset + 1} />
      <span className="text-[#4E5350]">No per-seat fees.</span>
      <AvatarCluster clusterIndex={offset + 2} />
    </div>
  );
}

const MARQUEE_SEQUENCE_OFFSETS = [0, 3, 6] as const;

function MarqueeGroup({ groupIndex }: { groupIndex: number }) {
  return (
    <div className="pricing-v3-marquee-group flex shrink-0 items-center" aria-hidden={groupIndex > 0 || undefined}>
      {MARQUEE_SEQUENCE_OFFSETS.map((offset) => (
        <MarqueeSequence key={offset} offset={offset} />
      ))}
    </div>
  );
}

function UnlimitedUsersMarquee() {
  return (
    <section
      className="pricing-v3-marquee-shell flex h-[72px] items-center overflow-hidden bg-[#F6F2EB] sm:h-[92px]"
      aria-label="Unlimited users on both standard Zapla plans"
    >
      <p className="sr-only">Unlimited users. One flat price. No per-seat fees.</p>
      <div
        className="pricing-v3-marquee-track flex w-max items-center whitespace-nowrap text-[26px] font-medium leading-none tracking-[-0.035em] text-[#111318] sm:text-[36px]"
        style={{ fontFamily: DISPLAY }}
      >
        <MarqueeGroup groupIndex={0} />
        <MarqueeGroup groupIndex={1} />
      </div>
      <style>{`
        @keyframes pricing-v3-unlimited-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .pricing-v3-marquee-track {
          animation: pricing-v3-unlimited-marquee 64s linear infinite;
          will-change: transform;
        }
        @media (hover: hover) and (pointer: fine) {
          .pricing-v3-marquee-shell:hover .pricing-v3-marquee-track {
            animation-play-state: paused;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pricing-v3-marquee-track {
            animation: none;
            margin-inline: auto;
          }
          .pricing-v3-marquee-group:not(:first-child) {
            display: none;
          }
          .pricing-v3-marquee-group .pricing-v3-marquee-sequence:not(:first-child) {
            display: none;
          }
          .pricing-v3-marquee-sequence {
            padding-right: 0;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* C. Follow-Through vs Growth                                         */
/* ------------------------------------------------------------------ */

const PATH_STEP_DELAYS = [260, 520, 780] as const;

function PlanDifference() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const active = reduced || inView;

  return (
    <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="Follow-Through vs Growth"
          title={
            <>
              Growth isn't more CRM. <span className="text-[#D58C75]">It's a different job.</span>
            </>
          }
          sub="Follow-Through protects the demand already coming to you. Growth adds the ability to go out and create more of it from the leads and customers you already have."
          light
        />

        <div ref={ref} className="mt-10 grid gap-4 lg:grid-cols-2">
          {PLAN_PATHS.map((path, pathIndex) => (
            <Reveal key={path.name} delay={pathIndex * 0.06}>
              <article className="h-full rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-5 sm:p-6">
                <h3 className="text-[24px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
                  {path.name}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-white/52 lg:min-h-[60px]">{path.copy}</p>

                <div className="mt-6 grid gap-2 sm:grid-cols-[1fr_18px_1fr_18px_1fr] sm:items-center sm:gap-0">
                  {path.steps.map((step, index) => (
                    <Fragment key={step}>
                      <div
                        className="rounded-[13px] border border-white/10 bg-white/[0.045] px-3 py-3 text-center text-[11px] font-semibold leading-[1.35] text-white/82 transition-[opacity,transform,border-color] duration-500 ease-out motion-reduce:transition-none"
                        style={{
                          opacity: active ? 1 : 0.34,
                          transform: active ? "translateY(0)" : "translateY(7px)",
                          borderColor: active ? `${path.color}55` : undefined,
                          transitionDelay: reduced ? undefined : `${PATH_STEP_DELAYS[index]! + pathIndex * 140}ms`,
                        }}
                      >
                        {step}
                      </div>
                      {index < path.steps.length - 1 ? (
                        <span className="relative mx-auto hidden h-px w-full sm:block" aria-hidden="true">
                          <span className="absolute inset-0 bg-white/[0.09]" />
                          <span
                            className="absolute inset-y-0 left-0 bg-white/30 transition-[width] duration-[280ms] ease-out motion-reduce:transition-none"
                            style={{
                              width: active ? "100%" : "0%",
                              transitionDelay: reduced ? undefined : `${PATH_STEP_DELAYS[index]! + 150 + pathIndex * 140}ms`,
                            }}
                          />
                        </span>
                      ) : null}
                      {index < path.steps.length - 1 ? (
                        <ArrowRight size={13} className="mx-auto rotate-90 text-white/25 sm:hidden" aria-hidden="true" />
                      ) : null}
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

/* ------------------------------------------------------------------ */
/* D. Comparison                                                       */
/* ------------------------------------------------------------------ */

function Comparison() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-[#FBFAF7] px-5 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Compare"
            title="Compare what changes."
            sub="The operating platform and follow-through systems are shared. Growth adds proactive marketing capability, and Custom is scoped to your requirements."
          />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="pricing-v3-comparison"
            className="inline-flex h-[44px] w-fit shrink-0 items-center gap-2 rounded-full border border-[#1E2B29]/18 bg-[#F6F0E8] px-5 text-[12px] font-semibold text-[#1E2B29] shadow-[0_8px_20px_rgba(48,38,29,.04)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]"
          >
            {open ? "Hide comparison" : "Compare all features"}
            <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        {open ? (
          <Reveal className="mt-6">
            <div id="pricing-v3-comparison">
              <div className="hidden overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_18px_48px_rgba(48,38,29,.05)] lg:block">
                <table className="w-full border-collapse text-[12.5px]">
                  <thead>
                    <tr>
                      {["Capability", "Follow-Through", "Growth", "Custom"].map((heading, column) => (
                        <th
                          key={heading}
                          className={`border-b border-black/[0.07] px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] ${column === 0 ? "sticky left-0 z-10 bg-white" : ""} ${column === 2 ? "bg-[#FFF2D8] text-[#8A641F]" : "text-[#77716A]"}`}
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {COMPARISON_GROUPS.map((group) => (
                    <tbody key={group.title}>
                      <tr>
                        <th
                          colSpan={4}
                          className="border-y border-black/[0.07] bg-[#F3EEE6] px-5 py-2.5 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B7054]"
                        >
                          {group.title}
                        </th>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, column) =>
                            column === 0 ? (
                              <th
                                key={cell}
                                scope="row"
                                className="sticky left-0 z-10 border-b border-black/[0.055] bg-white px-5 py-3 text-left font-semibold text-[#292C29]"
                              >
                                {cell}
                              </th>
                            ) : (
                              <td
                                key={`${row[0]}-${column}`}
                                className={`border-b border-black/[0.055] px-5 py-3 text-[#5D625E] ${column === 2 ? "bg-[#FFFAEE]" : ""}`}
                              >
                                {cell}
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  ))}
                </table>
              </div>

              <div className="grid gap-2.5 lg:hidden">
                {COMPARISON_GROUPS.map((group, index) => (
                  <ComparisonGroup key={group.title} group={group} defaultOpen={index === 0} />
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function ComparisonGroup({
  group,
  defaultOpen,
}: {
  group: (typeof COMPARISON_GROUPS)[number];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`overflow-hidden rounded-[18px] border bg-white ${open ? "border-black/[0.12]" : "border-black/[0.07]"}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B]"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#7A6249]">{group.title}</span>
        <ChevronDown size={16} className={`shrink-0 text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/[0.06]">
            {group.rows.map((row) => (
              <div key={row[0]} className="border-b border-black/[0.055] px-5 py-4 last:border-0">
                <p className="text-[12.5px] font-semibold leading-[1.4] text-[#303330]">{row[0]}</p>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {(["Follow-Through", "Growth", "Custom"] as const).map((name, index) => (
                    <div key={name} className={`rounded-[10px] p-2 ${index === 1 ? "bg-[#FFF8E8]" : "bg-[#F8F6F2]"}`}>
                      <span className="block text-[7.5px] font-bold uppercase tracking-[0.08em] text-[#8A837C]">{name}</span>
                      <span className="mt-1 block text-[10.5px] leading-[1.35] text-[#565B56]">{row[index + 1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* E. Guided Launch (V2 staged motion)                                 */
/* ------------------------------------------------------------------ */

type LaunchStage = { label: string; copy: string; Icon: typeof Map; color: string };

const STAGES: LaunchStage[] = [
  { label: "Map", copy: "Your workflow, team and customer journey.", Icon: Map, color: COLORS.sage },
  { label: "Build", copy: "The agreed system, workflows and connections that matter.", Icon: Boxes, color: COLORS.plum },
  { label: "Launch", copy: "Training, QA and rollout with your team.", Icon: Rocket, color: COLORS.apricot },
];

const STAGE_DELAYS = [300, 620, 900] as const;
const CONNECTOR_DELAYS = [430, 750] as const;

function GuidedLaunch() {
  return (
    <section className="relative overflow-hidden bg-[#111214] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16">
        <Reveal className="max-w-[660px]">
          <Eyebrow accent={COLORS.coral}>Guided Launch</Eyebrow>
          <h2
            className="mt-5 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[56px] lg:text-[66px]"
            style={{ fontFamily: DISPLAY }}
          >
            We don't hand you software.
            <br />
            <span className="text-[#D58C75]">We build it around how you work.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-white/56 sm:text-[17px]">
            We map your customer journey, configure the agreed system, connect the pieces that matter and launch it with
            your team.
          </p>
        </Reveal>

        <GuidedLaunchStages />
      </div>
    </section>
  );
}

function GuidedLaunchStages() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const active = reduced || inView;

  return (
    <div ref={ref} className="relative grid gap-3 sm:grid-cols-[1fr_20px_1fr_20px_1fr] sm:gap-0">
      {STAGES.map((stage, index) => (
        <Fragment key={`stage-${stage.label}`}>
          <Reveal delay={index * 0.05} className="h-full">
            <article
              className="h-full rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-5 transition-colors duration-500 ease-out motion-reduce:transition-none"
              style={{
                borderColor: active ? "rgba(255,255,255,.16)" : undefined,
                transitionDelay: reduced ? undefined : `${STAGE_DELAYS[index]}ms`,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/[0.08] bg-white/[0.035] transition-opacity duration-500 ease-out motion-reduce:transition-none"
                style={{
                  color: stage.color,
                  opacity: active ? 1 : 0.42,
                  transitionDelay: reduced ? undefined : `${STAGE_DELAYS[index]}ms`,
                }}
              >
                <stage.Icon size={18} strokeWidth={1.8} />
              </div>
              <div className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: stage.color }}>
                0{index + 1}
              </div>
              <h3 className="mt-1.5 text-[22px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
                {stage.label}
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.55] text-white/50">{stage.copy}</p>
            </article>
          </Reveal>
          {index < STAGES.length - 1 ? (
            <Connector key={`connector-${stage.label}`} active={active} delay={CONNECTOR_DELAYS[index]!} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

function Connector({ active, delay }: { active: boolean; delay: number }) {
  const reduced = !!useReducedMotion();
  return (
    <div className="relative hidden sm:block" aria-hidden="true">
      <div className="absolute left-0 right-0 top-[40px] h-px bg-white/[0.08]">
        <div
          className="h-px bg-white/25 transition-[width] duration-[260ms] ease-out motion-reduce:transition-none"
          style={{ width: active ? "100%" : "0%", transitionDelay: reduced ? undefined : `${delay}ms` }}
        />
      </div>
      <span
        className="absolute right-0 top-[40px] h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-white/25 transition-opacity duration-200 motion-reduce:transition-none"
        style={{ opacity: active ? 1 : 0, transitionDelay: reduced ? undefined : `${delay + 180}ms` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* F. Guided Launch scope                                              */
/* ------------------------------------------------------------------ */

function LaunchScope() {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <section id="launch" className="bg-[#F6F0E8] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-22">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading
          eyebrow="What gets built"
          title={
            <>
              What's included in your <span className="text-[#C96F55]">Guided Launch.</span>
            </>
          }
          sub="Your monthly plan gives you the platform. Guided Launch is the first agreed build, scoped to the plan you choose."
        />

        <div className="mt-8 grid gap-2.5">
          {LAUNCH_SCOPES.map((scope, index) => {
            const open = index === openIndex;
            return (
              <div
                key={scope.title}
                className={`overflow-hidden rounded-[18px] border bg-white transition-colors duration-200 ${open ? "border-black/[0.12] shadow-[0_10px_28px_rgba(48,38,29,.05)]" : "border-black/[0.07]"}`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-start justify-between gap-5 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B] sm:px-6 sm:py-5"
                >
                  <div>
                    <h3 className="text-[18px] font-medium tracking-[-0.03em] text-[#111318]" style={{ fontFamily: DISPLAY }}>
                      {scope.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-[1.45] text-[#77716A] sm:text-[13px]">{scope.sub}</p>
                  </div>
                  <ChevronDown
                    size={17}
                    className={`mt-1 shrink-0 text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-black/[0.06] px-5 pb-6 pt-4 sm:px-6">
                      <div className="grid gap-x-7 gap-y-2.5 sm:grid-cols-2">
                        {scope.items.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-[#555A56]">
                            <CheckMark />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 rounded-[15px] border border-black/[0.07] bg-white/70 px-4 py-3 text-[11.5px] leading-[1.55] text-[#66625D]">
          <strong className="text-[#343631]">After launch:</strong> you keep builder access, so your team can keep
          adding forms, pages and workflows. Extra work you would like Zapla to build for you moves to Managed Success or
          a quoted piece of custom work.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* G. Ghost to Gold                                                    */
/* ------------------------------------------------------------------ */

function GhostToGold() {
  return (
    <section className="bg-[#1E2B29] px-5 py-18 text-[#F7F4EE] sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow accent={COLORS.amber}>Ghost to Gold</Eyebrow>
          <h2
            className="mt-5 text-[41px] font-medium leading-[0.96] tracking-[-0.052em] sm:text-[54px] lg:text-[62px]"
            style={{ fontFamily: DISPLAY }}
          >
            Start with the database <span className="text-[#DDA34B]">you already own.</span>
          </h2>
          <p className="mt-5 max-w-[620px] text-[14px] leading-[1.65] text-white/58 sm:text-[16px]">
            A focused reactivation campaign for eligible contacts already in your database, run in stages so the
            follow-up stays sensible and the responses can be handled properly.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-2">
            <PriceBlock title="Ghost to Gold Sprint" price="A$997 + GST" />
            <PriceBlock title="Ghost to Gold Managed" price="A$1,497 + GST" />
          </div>
          <div className="mt-6 grid gap-2.5">
            {GHOST_FACTS.map((fact) => (
              <div key={fact} className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/70">
                <CheckMark dark />
                {fact}
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-white/10 pt-4 text-[10px] leading-[1.5] text-white/45">
            Draft pricing while the campaign scope is finalised.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function PriceBlock({ title, price }: { title: string; price: string }) {
  return (
    <div className="rounded-[17px] border border-white/10 bg-black/10 p-4">
      <p className="text-[10px] text-white/52">{title}</p>
      <p className="mt-2 text-[22px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>
        {price}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* H. Usage + add-ons                                                  */
/* ------------------------------------------------------------------ */

function CostsExtra() {
  return (
    <section className="bg-[#FBFAF7] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-22">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          eyebrow="No surprises"
          title={
            <>
              Know what sits <span className="text-[#777B76]">outside the plan.</span>
            </>
          }
          sub="Your monthly plan and Guided Launch are clear. Usage-heavy services and optional specialist help sit outside that base price."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal className="rounded-[24px] border border-black/[0.07] bg-white p-6">
            <Eyebrow accent={COLORS.amber}>Usage</Eyebrow>
            <div className="mt-5">
              {USAGE.map(([name, price, unit], index) => (
                <div
                  key={name}
                  className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5 ${index ? "border-t border-black/[0.06]" : ""}`}
                >
                  <h3 className="text-[15px] font-medium tracking-[-0.02em]" style={{ fontFamily: DISPLAY }}>
                    {name}
                  </h3>
                  <p className="text-[12px] text-[#6C706C]">
                    <strong className="font-semibold text-[#343631]">{price}</strong> {unit}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-black/[0.06] pt-4 text-[10.5px] leading-[1.5] text-[#7C7670]">
              Australian rates shown. Rates for other regions are still being confirmed.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="rounded-[24px] border border-black/[0.07] bg-[#EFE2D2] p-6">
            <Eyebrow accent={COLORS.apricot}>Add more when you need it</Eyebrow>
            <div className="mt-5">
              {ADDONS.map((addon, index) => (
                <div key={addon.title} className={`py-3.5 ${index ? "border-t border-black/[0.07]" : ""}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[15px] font-medium tracking-[-0.02em]" style={{ fontFamily: DISPLAY }}>
                      {addon.title}
                    </h3>
                    <span className={`text-[12px] font-semibold ${addon.draft ? "text-[#7C7670]" : "text-[#343631]"}`}>
                      {addon.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-[1.55] text-[#66615C]">{addon.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 border-t border-black/[0.07] pt-4 text-[10.5px] leading-[1.5] text-[#77706A]">
              Some prices above are still being confirmed and are not yet fixed commitments.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* I. FAQ                                                              */
/* ------------------------------------------------------------------ */

function Faq() {
  return (
    <section id="faq" className="bg-[#F0ECE5] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-22">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading
          eyebrow="Pricing FAQ"
          title={
            <>
              The questions people ask <span className="text-[#777B76]">before they choose.</span>
            </>
          }
          sub="Plans, launch, usage and the practical details behind the pricing."
        />
        <div className="mt-8 grid gap-2.5 md:grid-cols-2 md:items-start">
          {FAQS.map((faq, index) => (
            <FaqItem key={faq.q} faq={faq} index={index} />
          ))}
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
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B]"
        >
          <span className="text-[14px] font-semibold leading-[1.35] text-[#292B28]">{faq.q}</span>
          <ChevronDown size={16} className={`shrink-0 text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="space-y-2.5 border-t border-black/[0.06] px-5 pb-5 pt-3.5 text-[12.5px] leading-[1.58] text-[#666B66]">
              {faq.a.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* J. Final CTA                                                        */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section
      id="pricing-v3-final-cta"
      className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <Reveal className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end lg:gap-16">
        <div>
          <Eyebrow accent={COLORS.amber}>Still not sure which plan fits?</Eyebrow>
          <h2
            className="mt-5 text-[46px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[62px] lg:text-[74px]"
            style={{ fontFamily: DISPLAY }}
          >
            We'll map it <span className="text-[#D98670]">with you.</span>
          </h2>
        </div>
        <div className="lg:pb-1">
          <p className="max-w-[480px] text-[15px] leading-[1.65] text-white/60">
            Book a short call and we'll recommend the simplest standard plan, or a custom scope, that fits how your
            business actually works.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={BOOK_URL}
              className="group inline-flex h-[48px] items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[12.5px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]"
            >
              Book a Call
              <ArrowRight
                size={14}
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </a>
            <a
              href="#pricing"
              className="inline-flex h-[48px] items-center rounded-full border border-white/16 px-6 text-[12.5px] font-semibold text-white/82 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]"
            >
              Review plans ↑
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 360;
      setVisible(window.scrollY > 520 && !nearBottom);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    const finalSection = document.getElementById("pricing-v3-final-cta");
    const observer =
      finalSection && typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => setFinalVisible(Boolean(entry?.isIntersecting)), { threshold: 0.08 })
        : null;

    if (finalSection && observer) observer.observe(finalSection);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
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
      <div className="flex gap-2">
        <a
          href={BOOK_URL}
          className="flex-1 rounded-full bg-[#1E2B29] px-4 py-3 text-center text-[13px] font-semibold text-[#F7F4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDA34B]"
        >
          Book a Call
        </a>
        <a
          href="#pricing"
          className="rounded-full border border-[#1E2B29]/15 bg-white px-4 py-3 text-[13px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDA34B]"
        >
          Plans
        </a>
      </div>
    </motion.div>
  );
}
