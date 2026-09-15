import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Boxes, Check, ChevronDown, CircleDot, Map, Rocket } from "lucide-react";

export const Route = createFileRoute("/Pricing-v3")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Pricing V3 Internal Draft | Zapla" },
      { name: "description", content: "An internal Zapla pricing draft for Follow-Through, Growth and custom requirements." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pricing V3 Internal Draft | Zapla" },
      { property: "og:description", content: "An internal Zapla pricing draft for Follow-Through, Growth and custom requirements." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PricingV3Page,
});

const BOOK_URL = "https://zapla.io/booking";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;
const COLORS = { coral: "#E97D62", amber: "#DDA34B", sage: "#99A36D", plum: "#9B86B8", apricot: "#D58C75" } as const;

const plans = [
  {
    name: "Follow-Through",
    promise: "Stop losing the business already coming to you.",
    fit: "For service businesses that need every enquiry, call, quote and appointment followed through.",
    price: "A$399",
    priceLabel: "/mo + GST",
    launch: "from A$997 + GST",
    outcomes: ["Respond to missed calls and new enquiries", "Keep leads and quotes moving", "Recover bookings and no-shows", "Automate reviews and customer follow-up"],
    platform: "CRM, inbox, pipelines, calendars, forms, invoicing and more included.",
    tone: "standard",
    cta: "Book a Call",
  },
  {
    name: "Growth",
    promise: "Turn the customers and leads you already have into more revenue.",
    fit: "For businesses ready to proactively reactivate, recall, nurture and market to their customer base.",
    price: "A$699",
    priceLabel: "/mo + GST",
    launch: "from A$1,497 + GST",
    outcomes: ["Everything in Follow-Through", "Reactivate dormant leads and customers", "Automate repeat, recall and nurture campaigns", "Run targeted email, SMS and WhatsApp campaigns", "Segment and market proactively across your database"],
    platform: "Includes Growth marketing tools such as Social Planner, Ad Manager and campaign templates.",
    tone: "growth",
    cta: "Book a Call",
  },
  {
    name: "Custom",
    promise: "For businesses that don't fit neatly into a standard plan.",
    fit: "Multi-location or multi-brand operations, complex migrations, advanced integrations or non-standard implementation requirements.",
    price: "Custom",
    priceLabel: "Let's scope it",
    launch: "Custom Guided Launch",
    outcomes: ["Multi-location or multi-brand rollout", "Complex migrations or integrations", "Non-standard routing or reporting where supported", "Higher-volume or unusual implementation requirements", "Commercial and support scope agreed upfront"],
    platform: "Requirements, rollout and ongoing support are agreed before work starts.",
    tone: "custom",
    cta: "Talk to us",
  },
] as const;

const comparisonGroups = [
  { title: "Operating platform", rows: [
    ["Unlimited users", "Included", "Included", "Scoped"], ["Unlimited stored contacts under fair use", "Included", "Included", "Scoped"], ["CRM and customer records", "Included", "Included", "Scoped"], ["Unified inbox", "Included", "Included", "Scoped"], ["Pipelines and opportunities", "Included", "Included", "Scoped"], ["VoIP and phone dialer access", "Usage separate", "Usage separate", "Scoped"], ["Calendars and online booking", "Included", "Included", "Scoped"], ["Forms and surveys", "Included", "Included", "Scoped"], ["Website and funnel builder, self-service", "Included", "Included", "Scoped"], ["Lead-capture widget", "Included", "Included", "Scoped"], ["Payments and invoicing", "Included", "Included", "Scoped"], ["Contracts and proposals", "Included", "Included", "Scoped"], ["Operational templates", "Included", "Included", "Scoped"],
  ]},
  { title: "Follow-through systems", rows: [
    ["Lead Rescue", "Included", "Included", "Scoped"], ["Lead Follow-Through", "Included", "Included", "Scoped"], ["Quote Chaser", "Included", "Included", "Scoped"], ["Appointment Recovery", "Included", "Included", "Scoped"], ["Review Engine", "Included", "Included", "Scoped"], ["Referral follow-through", "Included", "Included", "Scoped"],
  ]},
  { title: "Proactive growth", rows: [
    ["Reactivation", "Not included", "Included", "Scoped"], ["Repeat and recall", "Not included", "Included", "Scoped"], ["Email marketing broadcasts", "Not included", "Included", "Scoped"], ["Bulk SMS and WhatsApp campaigns", "Not included", "Included", "Scoped"], ["Advanced segmentation", "Not included", "Included", "Scoped"], ["Campaign templates", "Not included", "Included", "Scoped"], ["Social Planner", "Not included", "Included", "Scoped"], ["Ad Manager", "Not included", "Included", "Scoped"], ["Growth marketing AI and Copilot where enabled", "Not included", "Included", "Scoped"],
  ]},
  { title: "Support & expansion", rows: [
    ["Help AI and knowledge centre", "Included", "Included", "Scoped"], ["Standard technical support", "Included", "Included", "Scoped"], ["Priority Expert Support", "Optional", "Optional", "Scoped"], ["Managed Success", "Optional", "Optional", "Scoped"], ["Additional locations", "Same organisation tier", "Same organisation tier", "Custom scope"],
  ]},
] as const;

const launchScopes = [
  { name: "Follow-Through Guided Launch", sub: "A focused first build for live demand and operational follow-through.", price: "from A$997 + GST", items: ["One standard data import up to 5,000 records", "One Zapla-connected number or forwarding setup", "Up to 2 configured pipelines", "Up to 3 standard forms or surveys", "One standard lead-capture widget", "Up to 2 configured calendars", "Follow-through Revenue Systems configured", "One 60-minute training session", "Launch QA and go-live"] },
  { name: "Growth Guided Launch", sub: "Adds the first proactive growth programme and campaign structure.", price: "from A$1,497 + GST", items: ["Everything in Follow-Through Guided Launch", "Up to 3 configured pipelines", "Growth segmentation and campaign structure", "First reactivation programme configured", "Proactive marketing layer connected", "Campaign templates where relevant"] },
  { name: "Custom Guided Launch", sub: "A separately agreed rollout for requirements outside the standard plans.", price: "Custom scope", items: ["Multi-location or multi-brand rollout", "Complex migration planning", "Advanced integrations where supported", "Non-standard routing or reporting where supported", "Implementation and support scope agreed upfront"] },
] as const;

const usage = [
  ["Outbound SMS", "A$0.13 + GST", "per carrier segment"], ["Inbound SMS", "A$0.02 + GST", "per carrier segment"], ["Voice AI overage", "A$0.90 + GST", "per additional minute"], ["Email overage", "A$1.00 + GST", "per 1,000 events"], ["WhatsApp", "Provider + activation", "shown before enablement"],
] as const;

const addOns = [
  ["AI Receptionist", "A$199/mo + GST", "Includes 200 Voice AI minutes. Current draft overage is A$0.90 per additional minute. Available on either standard plan."],
  ["Priority Expert Support", "A$149/mo + GST", "Priority human troubleshooting, guidance and screen-share help. It does not include new workflow, campaign or website building."],
  ["Managed Success", "A$697/mo + GST", "A monthly review plus up to 3 effective hours of agreed optimisation or execution. Hours do not roll over."],
  ["Website AI Chat / AI Front Desk", "Regional price under validation", "Product placement is clear. Supplier economics and the public price are not yet locked."],
] as const;

const faqs = [
  ["What actually makes Growth different from Follow-Through?", "Follow-Through reacts when something happens to a customer record and makes sure the next step happens. Growth gives the business proactive marketing tools to create a trigger across selected audiences, including campaigns, broadcasts, recall, nurture, social and ads."],
  ["Are contacts really unlimited?", "The current architecture includes unlimited stored contacts under fair use on both standard plans. Usage-heavy communications are charged separately, and unusual high-volume operational requirements may need a custom scope."],
  ["Can different locations use different plans?", "The standard public model is one software tier per organisation, and additional locations inherit it. Unusual mixed-use cases can be custom scoped."],
  ["What is included in standard support?", "Standard technical support helps with product access, faults and normal platform questions. Priority Expert Support adds faster human troubleshooting, guidance and screen-share help, but does not include new builds."],
  ["Why is Guided Launch separate?", "The monthly plan covers software access. Guided Launch covers the finite work of mapping, configuring, importing, training, checking and taking the first version live."],
  ["How does Ghost to Gold work?", "It is a staged reactivation campaign for eligible contacts already in your database. The standard draft covers up to 2,500 contacts, normally runs for roughly 3 to 8 weeks, and has a standard maximum deployment window of 90 days."],
  ["Is there a contract?", "The current architecture is month-to-month after launch, with no early termination fee."],
  ["Is Website AI Chat included?", "Not yet as a fixed public-priced item. Its placement is clear, but supplier economics are still under validation."],
  ["Why no per-user fee?", "Follow-through works best when the people responsible for the customer journey can participate. The proposed architecture therefore includes unlimited users on both standard plans."],
] as const;

const PORTRAIT_RINGS = [COLORS.amber, COLORS.coral, COLORS.sage, COLORS.apricot, "#C96C85"] as const;
const PORTRAIT_BACKGROUNDS = ["#C89A5D", "#BF7458", "#85845D", "#D69672", "#8E657A", "#B59672"] as const;
const PORTRAITS = Array.from({ length: 24 }, (_, cell) => ({ cell, background: PORTRAIT_BACKGROUNDS[cell % 6], ring: PORTRAIT_RINGS[cell % 5] }));
const CLUSTERS = [[3,14,8,21],[0,17,11,6],[19,5,22,12],[9,1,16,23],[13,20,2,15],[7,10,18,4]] as const;

function PricingV3Page() {
  return <main className="min-h-screen overflow-hidden bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
    <PricingPlans /><UnlimitedUsersMarquee /><PlanDifference /><Comparison /><GuidedLaunch /><LaunchScope /><GhostToGold /><CostsAndExpansion /><Faq /><FinalCta /><StickyMobileCta />
  </main>;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 1, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: EASE }}>{children}</motion.div>;
}
function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) { return <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${light ? "text-[#DDA34B]" : "text-[#C96F55]"}`}>{children}</p>; }
function Tick({ dark = false }: { dark?: boolean }) { return <span className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10 text-[#F7F4EE]" : "bg-[#99A36D]/20 text-[#69735D]"}`}><Check size={11} strokeWidth={2.5} /></span>; }
function SectionHeading({ eyebrow, title, sub, light = false }: { eyebrow: string; title: ReactNode; sub?: string; light?: boolean }) { return <Reveal className="max-w-[820px]"><Eyebrow light={light}>{eyebrow}</Eyebrow><h2 className={`mt-4 text-[36px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[46px] lg:text-[56px] ${light ? "text-[#F7F4EE]" : "text-[#111318]"}`} style={{ fontFamily: DISPLAY }}>{title}</h2>{sub ? <p className={`mt-4 max-w-[700px] text-[15px] leading-[1.62] sm:text-[16px] ${light ? "text-white/56" : "text-[#686D69]"}`}>{sub}</p> : null}</Reveal>; }

function PricingPlans() {
  return <section id="pricing-v3-plans" className="bg-[#F6F0E8] px-5 pb-10 pt-[104px] sm:px-10 sm:pb-14 sm:pt-[116px] lg:px-16 lg:pb-16 lg:pt-[128px]">
    <div className="mx-auto max-w-[1440px]">
      <Reveal className="mx-auto max-w-[840px] text-center">
        <Eyebrow>Pricing</Eyebrow>
        <h1 className="mt-3 text-[40px] font-medium leading-[0.98] tracking-[-0.055em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>One flat price. Unlimited users.</h1>
        <p className="mx-auto mt-4 max-w-[780px] text-[14px] leading-[1.6] text-[#686D69] sm:text-[16px]">Choose the level of follow-through your business needs. Every plan includes unlimited users and unlimited stored contacts, with a one-time Guided Launch to configure Zapla around how you work.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#4F544F] sm:text-[12px]">{["AUD pricing", "Unlimited users", "Unlimited stored contacts*", "Month-to-month"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Tick />{item}</span>)}</div>
        <p className="mt-4 text-[10px] text-[#8A847C]">Pricing V3 internal draft. Prices and selected expansion items remain under review.</p>
      </Reveal>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{plans.map((plan, index) => <PlanCard key={plan.name} plan={plan} index={index} />)}</div>
      <p className="mx-auto mt-5 max-w-[980px] text-center text-[11px] leading-[1.55] text-[#77716A] sm:text-[12px]">* Unlimited stored contacts are subject to fair use. Communications and other usage are charged separately. Prices are in AUD and exclude GST.</p>
    </div>
  </section>;
}

function PlanCard({ plan, index }: { plan: (typeof plans)[number]; index: number }) {
  const growth = plan.tone === "growth";
  const custom = plan.tone === "custom";
  return <Reveal delay={index * 0.05} className="h-full">
    <article className={`flex h-full flex-col overflow-hidden rounded-[26px] border p-5 shadow-[0_16px_42px_rgba(48,38,29,.055)] transition-[transform,box-shadow] duration-200 ease-out sm:p-6 md:hover:-translate-y-[2px] md:hover:shadow-[0_22px_52px_rgba(48,38,29,.09)] motion-reduce:transform-none motion-reduce:transition-none ${growth ? "border-[#DDA34B]/60 bg-[#FFF2D8]" : custom ? "border-black/[0.08] bg-[#EEE9E1]" : "border-black/[0.09] bg-[#FBFAF7]"}`}>
      <h2 className="text-[27px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{plan.name}</h2>
      <p className="mt-3 text-[18px] font-medium leading-[1.15] tracking-[-0.025em] text-[#282B27]" style={{ fontFamily: DISPLAY }}>{plan.promise}</p>
      <p className="mt-2 min-h-[60px] text-[12.5px] leading-[1.5] text-[#666A65]">{plan.fit}</p>
      <div className="mt-5 flex min-h-[52px] items-end gap-2"><strong className={`${custom ? "text-[42px]" : "text-[48px] sm:text-[50px]"} font-medium leading-none tracking-[-0.06em]`} style={{ fontFamily: DISPLAY }}>{plan.price}</strong><span className="pb-1 text-[11px] font-semibold text-[#77716A]">{plan.priceLabel}</span></div>
      <div className="mt-4 rounded-[15px] border border-black/[0.06] bg-white/55 px-3.5 py-3"><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9A7550]">One-time Guided Launch</p><p className="mt-1 text-[12px] font-semibold leading-[1.4] text-[#373833]">{plan.launch}</p></div>
      <ul className="mt-5 grid gap-2.5">{plan.outcomes.map((item) => <li key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.45] text-[#4E504B]"><Tick /><span className={item === "Everything in Follow-Through" ? "font-semibold" : ""}>{item}</span></li>)}</ul>
      <p className="mt-5 border-t border-black/[0.07] pt-4 text-[11.5px] leading-[1.5] text-[#686C67]">{plan.platform}</p>
      <div className="mt-auto pt-5"><a href={BOOK_URL} className={`group inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full px-5 text-[12.5px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B] ${growth ? "bg-[#1E2B29] text-[#F7F4EE]" : "border border-[#1E2B29]/18 bg-white text-[#1E2B29]"}`}>{plan.cta}<ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none" /></a></div>
    </article>
  </Reveal>;
}

function portraitPosition(cell: number) { return `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`; }
function AvatarCluster({ clusterIndex }: { clusterIndex: number }) { const cells = CLUSTERS[clusterIndex % CLUSTERS.length]; return <span className="inline-flex shrink-0 items-center pl-1" aria-hidden="true">{cells?.map((cell, index) => { const portrait = PORTRAITS[cell]; return portrait ? <span key={`${clusterIndex}-${cell}`} className={`relative h-8 w-8 rounded-full border-2 border-[#F6F2EB] sm:h-10 sm:w-10 ${index ? "-ml-1.5" : ""}`} style={{ backgroundColor: portrait.background, backgroundImage: "url(/concept/revenue/soft-autumn-portraits-v1.webp)", backgroundPosition: portraitPosition(cell), backgroundRepeat: "no-repeat", backgroundSize: "600% 400%", boxShadow: `0 0 0 1.5px ${portrait.ring}` }} /> : null; })}</span>; }
function MarqueeSequence({ offset }: { offset: number }) { return <div className="pricing-v3-marquee-sequence flex shrink-0 items-center gap-4 pr-8 sm:gap-6 sm:pr-12"><span>Unlimited users.</span><AvatarCluster clusterIndex={offset} /><span className="text-[#C96F55]">One flat price.</span><AvatarCluster clusterIndex={offset + 1} /><span className="text-[#4E5350]">No per-seat fees.</span><AvatarCluster clusterIndex={offset + 2} /></div>; }
function MarqueeGroup({ duplicate = false }: { duplicate?: boolean }) { return <div className="pricing-v3-marquee-group flex shrink-0" aria-hidden={duplicate || undefined}>{[0,3,6].map((offset) => <MarqueeSequence key={offset} offset={offset} />)}</div>; }
function UnlimitedUsersMarquee() { return <section className="pricing-v3-marquee-shell flex h-[72px] items-center overflow-hidden bg-[#F6F2EB] sm:h-[92px]" aria-label="Unlimited users on every standard Zapla plan"><p className="sr-only">Unlimited users. One flat price. No per-seat fees.</p><div className="pricing-v3-marquee-track flex w-max items-center whitespace-nowrap text-[26px] font-medium leading-none tracking-[-0.035em] sm:text-[36px]" style={{ fontFamily: DISPLAY }}><MarqueeGroup /><MarqueeGroup duplicate /></div><style>{`
@keyframes pricing-v3-unlimited-marquee { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
.pricing-v3-marquee-track { animation: pricing-v3-unlimited-marquee 64s linear infinite; will-change: transform; }
@media (hover:hover) and (pointer:fine) { .pricing-v3-marquee-shell:hover .pricing-v3-marquee-track { animation-play-state: paused; } }
@media (prefers-reduced-motion:reduce) { .pricing-v3-marquee-track { animation:none; margin-inline:auto; } .pricing-v3-marquee-group:not(:first-child), .pricing-v3-marquee-group .pricing-v3-marquee-sequence:not(:first-child) { display:none; } .pricing-v3-marquee-sequence { padding-right:0; } }
`}</style></section>; }

function PlanDifference() {
  const reduced = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  const active = reduced || seen;
  const paths = [
    { name: "Follow-Through", copy: "A call, enquiry, quote, booking or customer moment creates the trigger.", steps: ["Live event", "Zapla follows through", "Demand captured"], color: COLORS.apricot },
    { name: "Growth", copy: "You choose who to reach and when, then create new demand from leads and customers already in your database.", steps: ["Audience or time trigger", "Proactive campaign", "More revenue"], color: COLORS.amber },
  ] as const;
  return <section className="bg-[#111214] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28"><div className="mx-auto max-w-[1280px]"><SectionHeading eyebrow="Follow-Through vs Growth" title={<>Growth isn't more CRM. <span className="text-[#D58C75]">It's a different job.</span></>} sub="Follow-Through protects live demand. Growth adds the proactive capability to create demand from customers and leads already in your database." light /><div ref={ref} className="mt-10 grid gap-4 lg:grid-cols-2">{paths.map((path, pathIndex) => <Reveal key={path.name} delay={pathIndex * .08}><article className="rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-5 sm:p-6"><h3 className="text-[24px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>{path.name}</h3><p className="mt-2 min-h-[44px] text-[12.5px] leading-[1.55] text-white/52">{path.copy}</p><div className="mt-6 grid gap-2 sm:grid-cols-[1fr_18px_1fr_18px_1fr] sm:items-center">{path.steps.map((step, index) => <Fragment key={step}><div className="rounded-[13px] border border-white/10 bg-white/[0.045] px-3 py-3 text-center text-[11px] font-semibold text-white/80 transition-[opacity,transform,border-color] duration-500 motion-reduce:transition-none" style={{ opacity: active ? 1 : .35, transform: active ? "translateY(0)" : "translateY(7px)", borderColor: active ? `${path.color}55` : undefined, transitionDelay: reduced ? undefined : `${220 + pathIndex * 120 + index * 180}ms` }}>{step}</div>{index < 2 ? <ArrowRight size={14} className="mx-auto rotate-90 text-white/28 sm:rotate-0" /> : null}</Fragment>)}</div></article></Reveal>)}</div></div></section>;
}

function Comparison() {
  const [open, setOpen] = useState(false);
  return <section className="bg-[#FBFAF7] px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"><div className="mx-auto max-w-[1280px]"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><SectionHeading eyebrow="Compare" title="Compare what changes." sub="The operating platform and follow-through systems are shared. Growth adds proactive marketing capability." /><button type="button" aria-expanded={open} aria-controls="pricing-v3-comparison" onClick={() => setOpen(v => !v)} className="inline-flex h-[44px] w-fit shrink-0 items-center gap-2 rounded-full border border-[#1E2B29]/18 bg-[#F6F0E8] px-5 text-[12px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">{open ? "Hide comparison" : "Compare all features"}<ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></button></div><div id="pricing-v3-comparison" className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none ${open ? "mt-7 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="hidden overflow-hidden rounded-[20px] border border-black/[0.07] bg-white shadow-[0_18px_48px_rgba(48,38,29,.05)] lg:block"><table className="w-full border-collapse text-[12px]"><thead><tr>{["Capability","Follow-Through","Growth","Custom"].map((heading,index) => <th key={heading} className={`border-b border-black/[0.07] px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] ${index===0?"sticky left-0 z-10 bg-white":""} ${index===2?"bg-[#FFF2D8] text-[#8A641F]":"text-[#77716A]"}`}>{heading}</th>)}</tr></thead>{comparisonGroups.map(group => <tbody key={group.title}><tr><th colSpan={4} className="border-y border-black/[0.07] bg-[#F3EEE6] px-5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B7054]">{group.title}</th></tr>{group.rows.map(row => <tr key={row[0]}>{row.map((cell,index) => index===0 ? <th key={cell} scope="row" className="sticky left-0 z-10 border-b border-black/[0.055] bg-white px-5 py-3 text-left font-semibold text-[#292C29]">{cell}</th> : <td key={`${row[0]}-${index}`} className={`border-b border-black/[0.055] px-5 py-3 text-[#606560] ${index===2?"bg-[#FFFAEE]":""}`}>{cell}</td>)}</tr>)}</tbody>)}</table></div><div className="grid gap-3 lg:hidden">{comparisonGroups.map((group,index) => <ComparisonGroup key={group.title} group={group} defaultOpen={index===0} />)}</div></div></div></div></section>;
}
function ComparisonGroup({ group, defaultOpen }: { group: (typeof comparisonGroups)[number]; defaultOpen: boolean }) { const [open,setOpen]=useState(defaultOpen); return <div className="overflow-hidden rounded-[18px] border border-black/[0.07] bg-white"><button type="button" aria-expanded={open} onClick={()=>setOpen(v=>!v)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6E5A45]">{group.title}</span><ChevronDown size={16} className={`text-[#9A7550] transition-transform duration-200 ${open?"rotate-180":""}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open?"grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden border-t border-black/[0.06]">{group.rows.map(row=><div key={row[0]} className="border-b border-black/[0.055] px-5 py-4 last:border-0"><p className="text-[12.5px] font-semibold text-[#303330]">{row[0]}</p><div className="mt-2 grid grid-cols-3 gap-2">{["Follow-Through","Growth","Custom"].map((name,index)=><div key={name} className={index===1?"rounded-[9px] bg-[#FFF8E8] p-2":"p-2"}><span className="block text-[7px] font-bold uppercase tracking-[0.08em] text-[#88817A]">{name}</span><span className="mt-1 block text-[10.5px] leading-[1.35] text-[#565B56]">{row[index+1]}</span></div>)}</div></div>)}</div></div></div>; }

const stages = [{ label:"Map", copy:"Your workflow, team and customer journey.", Icon:Map, color:COLORS.sage },{ label:"Build", copy:"The system, workflows and connections that matter.", Icon:Boxes, color:COLORS.plum },{ label:"Launch", copy:"Training, QA and rollout with your team.", Icon:Rocket, color:COLORS.apricot }] as const;
function GuidedLaunch() { return <section className="relative overflow-hidden bg-[#111214] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16"><Reveal><Eyebrow light>Guided Launch</Eyebrow><h2 className="mt-5 text-[42px] font-medium leading-[0.97] tracking-[-0.052em] sm:text-[56px] lg:text-[66px]" style={{fontFamily:DISPLAY}}>We don't hand you software.<br/><span className="text-[#D58C75]">We build it around how you work.</span></h2><p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-white/56 sm:text-[17px]">We map your customer journey, configure the agreed system, connect the pieces that matter and launch it with your team.</p></Reveal><GuidedStages /></div></section>; }
function GuidedStages() { const reduced=!!useReducedMotion(); const ref=useRef<HTMLDivElement>(null); const inView=useInView(ref,{once:true,amount:.4}); const active=reduced||inView; return <div ref={ref} className="relative grid gap-3 sm:grid-cols-[1fr_20px_1fr_20px_1fr] sm:gap-0">{stages.map((stage,index)=><Fragment key={stage.label}><Reveal delay={index*.05} className="h-full"><article className="h-full rounded-[22px] border border-white/[0.09] bg-white/[0.035] p-5"><div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/[0.08] bg-white/[0.035] transition-opacity duration-500 motion-reduce:transition-none" style={{color:stage.color,opacity:active?1:.42,transitionDelay:reduced?undefined:`${300+index*300}ms`}}><stage.Icon size={18}/></div><p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em]" style={{color:stage.color}}>0{index+1}</p><h3 className="mt-1.5 text-[22px] font-medium tracking-[-0.035em]" style={{fontFamily:DISPLAY}}>{stage.label}</h3><p className="mt-2 text-[12.5px] leading-[1.55] text-white/50">{stage.copy}</p></article></Reveal>{index<2?<Connector active={active} delay={430+index*320}/>:null}</Fragment>)}</div>; }
function Connector({active,delay}:{active:boolean;delay:number}) { const reduced=!!useReducedMotion(); return <div className="relative hidden sm:block" aria-hidden="true"><div className="absolute inset-x-0 top-10 h-px bg-white/[0.08]"><div className="h-px bg-white/25 transition-[width] duration-[260ms] motion-reduce:transition-none" style={{width:active?"100%":"0%",transitionDelay:reduced?undefined:`${delay}ms`}} /></div></div>; }

function LaunchScope() { const [open,setOpen]=useState(-1); return <section className="bg-[#F6F0E8] px-5 py-16 sm:px-10 sm:py-20 lg:px-16"><div className="mx-auto max-w-[1240px]"><SectionHeading eyebrow="What gets built" title={<>What's included in your <span className="text-[#C96F55]">Guided Launch.</span></>} sub="Your monthly plan gives you the platform. Guided Launch is the first agreed build, scoped to the plan you choose."/><div className="mt-8 grid gap-2.5">{launchScopes.map((scope,index)=>{const isOpen=open===index;return <Accordion key={scope.name} title={scope.name} sub={`${scope.sub} ${scope.price}`} open={isOpen} onToggle={()=>setOpen(isOpen?-1:index)}><div className="grid gap-x-7 gap-y-2.5 sm:grid-cols-2">{scope.items.map(item=><div key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-[#555A56]"><Tick/>{item}</div>)}</div></Accordion>;})}</div><p className="mt-4 rounded-[15px] border border-black/[0.07] bg-white/70 px-4 py-3 text-[11.5px] leading-[1.55] text-[#66625D]"><strong className="text-[#343631]">After launch:</strong> software builder access remains available. Additional Zapla-built work moves to Managed Success or quoted custom work.</p></div></section>; }
function Accordion({title,sub,open,onToggle,children}:{title:string;sub?:string;open:boolean;onToggle:()=>void;children:ReactNode}) { return <div className={`overflow-hidden rounded-[18px] border bg-white transition-colors duration-200 ${open?"border-black/[0.12] shadow-[0_10px_28px_rgba(48,38,29,.05)]":"border-black/[0.07]"}`}><button type="button" aria-expanded={open} onClick={onToggle} className="flex w-full items-start justify-between gap-5 px-5 py-4 text-left sm:px-6 sm:py-5"><div><h3 className="text-[18px] font-medium tracking-[-0.03em]" style={{fontFamily:DISPLAY}}>{title}</h3>{sub?<p className="mt-1 text-[12px] leading-[1.45] text-[#77716A]">{sub}</p>:null}</div><ChevronDown size={17} className={`mt-1 shrink-0 text-[#9A7550] transition-transform duration-200 ${open?"rotate-180":""}`}/></button><div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open?"grid-rows-[1fr] opacity-100":"grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="border-t border-black/[0.06] px-5 pb-6 pt-4 sm:px-6">{children}</div></div></div></div>; }

function GhostToGold() { const facts=["One staged campaign","Typical target: roughly 3 to 8 weeks","Standard maximum deployment: 90 days","Above 5,000 contacts: custom-scoped"]; return <section className="bg-[#1E2B29] px-5 py-18 text-[#F7F4EE] sm:px-10 sm:py-22 lg:px-16 lg:py-24"><div className="mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14"><Reveal><Eyebrow light>Ghost to Gold</Eyebrow><h2 className="mt-5 text-[41px] font-medium leading-[0.96] tracking-[-0.052em] sm:text-[54px] lg:text-[62px]" style={{fontFamily:DISPLAY}}>Start with the database <span className="text-[#DDA34B]">you already own.</span></h2><p className="mt-5 max-w-[620px] text-[14px] leading-[1.65] text-white/58 sm:text-[16px]">A focused acquisition wedge for eligible contacts already in your database, delivered as a staged campaign rather than a fixed 30-day blast.</p></Reveal><Reveal delay={.06} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 sm:p-7"><div className="grid gap-3 sm:grid-cols-2"><PriceBlock title="Ghost to Gold Sprint" price="A$997 + GST"/><PriceBlock title="Ghost to Gold Managed" price="A$1,497 + GST"/></div><p className="mt-4 text-[10px] text-white/48">Draft pricing for up to 2,500 eligible contacts.</p><div className="mt-6 grid gap-3">{facts.map(fact=><div key={fact} className="flex items-center gap-3 text-[12.5px] text-white/70"><CircleDot size={14} className="text-[#D58C75]"/>{fact}</div>)}</div></Reveal></div></section>; }
function PriceBlock({title,price}:{title:string;price:string}) { return <div className="rounded-[17px] border border-white/10 bg-black/10 p-4"><p className="text-[10px] text-white/52">{title}</p><p className="mt-2 text-[22px] font-medium tracking-[-0.035em]" style={{fontFamily:DISPLAY}}>{price}</p></div>; }

function CostsAndExpansion() { return <section className="bg-[#FBFAF7] px-5 py-16 sm:px-10 sm:py-20 lg:px-16"><div className="mx-auto max-w-[1280px]"><SectionHeading eyebrow="No surprises" title={<>Know what sits <span className="text-[#777B76]">outside the plan.</span></>} sub="Usage-heavy services and optional specialist help are clear before you enable them."/><div className="mt-8 grid gap-4 lg:grid-cols-2"><Reveal className="rounded-[24px] border border-black/[0.07] bg-white p-6"><Eyebrow>Usage</Eyebrow><div className="mt-5">{usage.map(([name,price,unit],index)=><div key={name} className={`grid gap-1 py-3.5 sm:grid-cols-[1fr_auto] ${index?"border-t border-black/[0.06]":""}`}><p className="text-[13px] font-semibold">{name}</p><p className="text-[12px] text-[#5E625E]"><strong>{price}</strong> {unit}</p></div>)}</div><p className="mt-4 text-[10.5px] text-[#77716A]">SG and HK local usage rates remain under validation.</p></Reveal><Reveal delay={.05} className="rounded-[24px] border border-black/[0.07] bg-[#EFE2D2] p-6"><Eyebrow>Add more when you need it</Eyebrow><div className="mt-5">{addOns.map(([title,price,copy],index)=><div key={title} className={`py-3.5 ${index?"border-t border-black/[0.07]":""}`}><div className="flex flex-wrap justify-between gap-2"><h3 className="text-[16px] font-medium" style={{fontFamily:DISPLAY}}>{title}</h3><strong className="text-[11px]">{price}</strong></div><p className="mt-1.5 text-[12px] leading-[1.5] text-[#66615C]">{copy}</p></div>)}</div><p className="mt-4 text-[10.5px] text-[#77716A]">AU draft pricing is shown. Regional pricing remains under validation.</p></Reveal></div></div></section>; }

function Faq() { return <section className="bg-[#F0ECE5] px-5 py-16 sm:px-10 sm:py-20 lg:px-16"><div className="mx-auto max-w-[1180px]"><SectionHeading eyebrow="Pricing FAQ" title={<>The questions people ask <span className="text-[#777B76]">before they choose.</span></>} sub="Costs, rollout, usage and the practical details behind the plans."/><div className="mt-8 grid gap-2.5 md:grid-cols-2 md:items-start">{faqs.map(([q,a],index)=><FaqItem key={q} q={q} a={a} index={index}/>)}</div></div></section>; }
function FaqItem({q,a,index}:{q:string;a:string;index:number}) { const [open,setOpen]=useState(false); return <Reveal delay={(index%2)*.03}><Accordion title={q} open={open} onToggle={()=>setOpen(v=>!v)}><p className="text-[12.5px] leading-[1.6] text-[#666B66]">{a}</p></Accordion></Reveal>; }
function FinalCta() { return <section id="pricing-v3-final-cta" className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28"><Reveal className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_.55fr] lg:items-end"><div><Eyebrow light>Still not sure which plan fits?</Eyebrow><h2 className="mt-5 text-[46px] font-medium leading-[0.95] tracking-[-0.058em] sm:text-[62px] lg:text-[74px]" style={{fontFamily:DISPLAY}}>We'll map it <span className="text-[#D98670]">with you.</span></h2></div><div><p className="max-w-[480px] text-[15px] leading-[1.65] text-white/60">Book a short call and we'll recommend the simplest standard plan or custom scope that fits how your business works.</p><a href={BOOK_URL} className="group mt-6 inline-flex h-[48px] items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[12.5px] font-semibold text-[#1E2B29]">Book a Call<ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none"/></a></div></Reveal></section>; }
function StickyMobileCta() { const [visible,setVisible]=useState(false); const [finalVisible,setFinalVisible]=useState(false); useEffect(()=>{const update=()=>setVisible(window.scrollY>520&&window.scrollY+window.innerHeight<document.documentElement.scrollHeight-360);update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);const section=document.getElementById("pricing-v3-final-cta");const observer=section&&typeof IntersectionObserver!=="undefined"?new IntersectionObserver(([entry])=>setFinalVisible(Boolean(entry?.isIntersecting)),{threshold:.08}):null;if(section&&observer)observer.observe(section);return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);observer?.disconnect();};},[]);if(!visible||finalVisible)return null;return <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.18,ease:EASE}} className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-[#F7F4EE]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"><a href={BOOK_URL} className="block rounded-full bg-[#1E2B29] px-4 py-3 text-center text-[13px] font-semibold text-[#F7F4EE]">Book a Call</a></motion.div>; }
