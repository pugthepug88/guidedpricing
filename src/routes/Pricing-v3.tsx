import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, ChevronDown, CircleDot } from "lucide-react";

export const Route = createFileRoute("/Pricing-v3")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Pricing V3 Internal Draft | Zapla" },
      { name: "description", content: "An internal Zapla pricing architecture draft for Follow-Through and Growth." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pricing V3 Internal Draft | Zapla" },
      { property: "og:description", content: "An internal Zapla pricing architecture draft for Follow-Through and Growth." },
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

const plans = [
  {
    name: "Follow-Through",
    promise: "Stop losing the business already coming to you.",
    subcopy: "For service businesses that need every enquiry, call, quote and appointment followed through.",
    price: "A$399",
    launch: "from A$997 + GST",
    outcomes: [
      "Respond to missed calls and new enquiries",
      "Keep leads and quotes moving",
      "Recover bookings and no-shows",
      "Automate reviews and customer follow-up",
    ],
    shared: "CRM, inbox, pipelines, calendars, forms, invoicing and more included.",
    growth: false,
  },
  {
    name: "Growth",
    promise: "Turn the customers and leads you already have into more revenue.",
    subcopy: "For businesses ready to proactively reactivate, recall, nurture and market to their customer base.",
    price: "A$699",
    launch: "from A$1,497 + GST",
    outcomes: [
      "Everything in Follow-Through",
      "Reactivate dormant leads and customers",
      "Automate repeat, recall and nurture campaigns",
      "Run targeted email, SMS and WhatsApp campaigns",
      "Segment and market proactively across your database",
    ],
    shared: "Includes Growth marketing tools such as Social Planner, Ad Manager and campaign templates.",
    growth: true,
  },
] as const;

const comparisonGroups = [
  {
    title: "Operating platform",
    rows: [
      ["Unlimited users", "Included", "Included"],
      ["Unlimited stored contacts under fair use", "Included", "Included"],
      ["CRM and customer records", "Included", "Included"],
      ["Unified inbox", "Included", "Included"],
      ["Pipelines and opportunities", "Included", "Included"],
      ["VoIP and phone dialer access", "Usage separate", "Usage separate"],
      ["Calendars and online booking", "Included", "Included"],
      ["Forms and surveys", "Included", "Included"],
      ["Website and funnel builder, self-service", "Included", "Included"],
      ["Lead-capture widget", "Included", "Included"],
      ["Payments and invoicing", "Included", "Included"],
      ["Contracts and proposals", "Included", "Included"],
      ["Operational templates", "Included", "Included"],
    ],
  },
  {
    title: "Follow-through systems",
    rows: [
      ["Lead Rescue", "Included", "Included"],
      ["Lead Follow-Through", "Included", "Included"],
      ["Quote Chaser", "Included", "Included"],
      ["Appointment Recovery", "Included", "Included"],
      ["Review Engine", "Included", "Included"],
      ["Referral follow-through", "Included", "Included"],
    ],
  },
  {
    title: "Proactive growth",
    rows: [
      ["Reactivation", "Not included", "Included"],
      ["Repeat and recall", "Not included", "Included"],
      ["Email marketing broadcasts", "Not included", "Included"],
      ["Bulk SMS and WhatsApp campaigns", "Not included", "Included"],
      ["Advanced segmentation", "Not included", "Included"],
      ["Campaign templates", "Not included", "Included"],
      ["Social Planner", "Not included", "Included"],
      ["Ad Manager", "Not included", "Included"],
      ["Growth marketing AI and Copilot where enabled", "Not included", "Included"],
    ],
  },
  {
    title: "Support & expansion",
    rows: [
      ["Help AI and knowledge centre", "Included", "Included"],
      ["Standard technical support", "Included", "Included"],
      ["Priority Expert Support", "Optional", "Optional"],
      ["Managed Success", "Optional", "Optional"],
      ["Additional locations", "Same organisation tier", "Same organisation tier"],
    ],
  },
] as const;

const launchScopes = [
  {
    name: "Follow-Through launch",
    price: "from A$997 + GST",
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
    name: "Growth launch",
    price: "from A$1,497 + GST",
    items: [
      "Everything in Follow-Through launch",
      "Up to 3 configured pipelines",
      "Growth segmentation and campaign structure",
      "First reactivation programme configured",
      "Proactive marketing layer connected",
      "Campaign templates where relevant",
    ],
  },
] as const;

const addOns = [
  { title: "AI Receptionist", price: "A$199/mo + GST", label: "Candidate", copy: "Includes 200 Voice AI minutes. Current draft overage is A$0.90 per additional minute. Available on either standard plan.", color: "bg-[#EFE2D2]" },
  { title: "Priority Expert Support", price: "A$149/mo + GST", label: "Candidate", copy: "Priority human troubleshooting, guidance and screen-share help. It does not include new workflow, campaign or website building.", color: "bg-[#E4E5D2]" },
  { title: "Managed Success", price: "A$697/mo + GST", label: "AU candidate", copy: "A monthly review plus up to 3 effective hours of agreed optimisation or execution. Hours do not roll over.", color: "bg-[#E6DDE8]" },
  { title: "Website AI Chat / AI Front Desk", price: "Regional price under validation", label: "Still under validation", copy: "The product placement is clear. Supplier economics and the public price are not yet locked.", color: "bg-[#E1E7E0]" },
] as const;

const usage = [
  ["Outbound SMS", "A$0.13 + GST", "per carrier segment"],
  ["Inbound SMS", "A$0.02 + GST", "per carrier segment"],
  ["Voice AI overage", "A$0.90 + GST", "per additional minute"],
  ["Email overage", "A$1.00 + GST", "per 1,000 events"],
  ["WhatsApp", "Provider + activation", "shown before enablement"],
] as const;

const faqs = [
  { q: "What actually makes Growth different from Follow-Through?", a: "Follow-Through reacts when something happens to a customer record and makes sure the next step happens. Growth gives the business proactive marketing tools to create a trigger across selected audiences, including campaigns, broadcasts, recall, nurture, social and ads." },
  { q: "Are contacts really unlimited?", a: "The current architecture includes unlimited stored contacts under fair use on both standard plans. Usage-heavy communications are charged separately, and unusual high-volume operational requirements may need a custom scope." },
  { q: "Can different locations use different plans?", a: "The standard public model is one software tier per organisation, and additional locations inherit it. Unusual mixed-use cases can be custom scoped." },
  { q: "What is included in standard support?", a: "Standard technical support helps with product access, faults and normal platform questions. Priority Expert Support adds faster human troubleshooting, guidance and screen-share help, but does not include new builds." },
  { q: "Why is Guided Launch separate?", a: "The monthly plan covers software access. Guided Launch covers the finite work of mapping, configuring, importing, training, checking and taking the first version live." },
  { q: "How does Ghost to Gold work?", a: "It is a staged reactivation campaign for eligible contacts already in your database. The standard draft covers up to 2,500 contacts, normally runs for roughly 3 to 8 weeks, and has a standard maximum deployment window of 90 days." },
  { q: "Is there a contract?", a: "The current architecture is month-to-month after launch, with no early termination fee." },
  { q: "Is Website AI Chat included?", a: "Not yet as a fixed public-priced item. Its placement is clear, but supplier economics are still under validation." },
  { q: "Why no per-user fee?", a: "Follow-through works best when the people responsible for the customer journey can participate. The proposed architecture therefore includes unlimited users on both standard plans." },
] as const;

function PricingV3Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <HeroAndPlans />
      <SharedPrinciples />
      <UpgradeLogic />
      <Comparison />
      <GuidedLaunch />
      <GhostToGold />
      <AddOns />
      <Usage />
      <Faq />
      <FinalCta />
      <StickyMobileCta />
    </main>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 1, y: 9 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : delay, ease: EASE }}>{children}</motion.div>;
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#DDA34B]" : "text-[#C96F55]"}`}>{children}</p>;
}

function Tick({ dark = false }: { dark?: boolean }) {
  return <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10 text-[#F7F4EE]" : "bg-[#99A36D]/20 text-[#667052]"}`}><Check size={11} strokeWidth={2.5} /></span>;
}

function HeroAndPlans() {
  return (
    <section id="plans" className="bg-[#F6F0E8] px-5 pb-12 pt-[104px] sm:px-10 sm:pb-16 sm:pt-[116px] lg:px-16 lg:pb-20 lg:pt-[128px]">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <div className="mx-auto inline-flex rounded-full border border-[#C96F55]/25 bg-[#F3E3D9] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#A95440]">Pricing V3 · internal draft</div>
          <h1 className="mx-auto mt-6 max-w-[880px] text-[42px] font-medium leading-[0.95] tracking-[-0.052em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>Stop revenue leaking. <span className="text-[#C96F55]">Then create more of it.</span></h1>
          <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.65] text-[#626762] sm:text-[17px]">Follow-Through protects demand already coming into the business. Growth adds the proactive marketing layer to create more demand from customers and leads already in the database.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#4F544F] sm:text-[12px]">
            {["AUD pricing", "Unlimited users", "Unlimited stored contacts*", "Month-to-month"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Tick />{item}</span>)}
          </div>
          <p className="mt-4 text-[10.5px] text-[#817B73]">All figures on this page remain draft candidates for architecture testing.</p>
        </Reveal>

        <div className="mx-auto mt-9 grid max-w-[1050px] gap-5 md:grid-cols-2 md:items-stretch">
          {plans.map((plan, index) => <PlanCard key={plan.name} plan={plan} index={index} />)}
        </div>
        <CustomPath />
        <p className="mt-4 text-center text-[10.5px] leading-relaxed text-[#77716A]">* Unlimited stored contacts are subject to fair use. Communications and other usage are charged separately.</p>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: (typeof plans)[number]; index: number }) {
  return (
    <Reveal delay={index * 0.07} className="h-full">
      <article className={`flex h-full flex-col rounded-[26px] border p-6 shadow-[0_18px_46px_rgba(48,38,29,.055)] transition-[transform,box-shadow] duration-200 sm:p-7 md:hover:-translate-y-[2px] md:hover:shadow-[0_24px_56px_rgba(48,38,29,.09)] motion-reduce:transform-none motion-reduce:transition-none ${plan.growth ? "border-[#C7933E]/55 bg-[#FFF0D2]" : "border-black/[0.08] bg-[#FBFAF7]"}`}>
        <Eyebrow>{plan.name}</Eyebrow>
        <h2 className="mt-4 text-[30px] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[34px]" style={{ fontFamily: DISPLAY }}>{plan.promise}</h2>
        <p className="mt-3 text-[13px] leading-[1.58] text-[#656A65]">{plan.subcopy}</p>
        <div className="mt-6 flex items-end gap-2"><strong className="text-[50px] font-medium leading-none tracking-[-0.06em]" style={{ fontFamily: DISPLAY }}>{plan.price}</strong><span className="pb-1 text-[11px] font-semibold text-[#77716A]">/mo + GST</span></div>
        <div className="mt-4 rounded-[16px] border border-black/[0.06] bg-white/60 px-4 py-3"><p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#9A7550]">Guided Launch · draft candidate</p><p className="mt-1 text-[12px] font-semibold text-[#373833]">{plan.launch}</p></div>
        <ul className="mt-6 grid gap-3">
          {plan.outcomes.map((outcome) => <li key={outcome} className="flex items-start gap-2.5 text-[13px] leading-[1.45] text-[#454944]"><Tick /><span className={outcome === "Everything in Follow-Through" ? "font-semibold" : ""}>{outcome}</span></li>)}
        </ul>
        <p className="mt-6 border-t border-black/[0.08] pt-4 text-[11.5px] leading-[1.55] text-[#6A6E69]">{plan.shared}</p>
        <a href={BOOK_URL} className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1E2B29] text-[12.5px] font-semibold text-[#F7F4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">Book a Call <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none" /></a>
      </article>
    </Reveal>
  );
}

function CustomPath() {
  return (
    <Reveal delay={0.14} className="mx-auto mt-5 max-w-[1050px]">
      <div className="grid gap-5 rounded-[20px] border border-black/[0.08] bg-[#EEE9E1] px-5 py-5 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div><div className="flex flex-wrap items-center gap-3"><h2 className="text-[21px] font-medium tracking-[-0.035em]" style={{ fontFamily: DISPLAY }}>Need something more complex?</h2><span className="rounded-full border border-black/[0.08] bg-white/55 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-[#6E6256]">Custom pricing & implementation</span></div><p className="mt-2 max-w-[780px] text-[12.5px] leading-[1.55] text-[#666A65]">Multi-location or multi-brand operations, non-standard integrations, migration requirements or a more complex implementation.</p></div>
        <a href={BOOK_URL} className="group inline-flex items-center gap-2 text-[12.5px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">Talk to us <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none" /></a>
      </div>
    </Reveal>
  );
}

function SharedPrinciples() {
  return (
    <section className="border-y border-black/[0.06] bg-[#F3EDE4] px-5 py-9 sm:px-10 sm:py-11 lg:px-16">
      <Reveal className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-[.8fr_1fr_1.2fr] md:items-center md:gap-7">
        <p className="text-[18px] font-medium leading-[1.15] tracking-[-0.025em] text-[#1E2B29]" style={{ fontFamily: DISPLAY }}>Both plans run on the full Zapla operating platform.</p>
        <p className="text-[12px] leading-[1.55] text-[#5F645F]">Unlimited users. Unlimited stored contacts under fair use. Month-to-month.</p>
        <p className="border-t border-black/[0.08] pt-4 text-[13px] font-semibold leading-[1.55] text-[#3E433F] md:border-l md:border-t-0 md:pl-7 md:pt-0">You upgrade because you want Zapla to create more revenue, not because your team or database got bigger.</p>
      </Reveal>
    </section>
  );
}

function UpgradeLogic() {
  const paths = [
    { label: "Follow-Through", steps: ["Live event", "Zapla follows through", "Demand captured"], copy: "A call, enquiry, quote, booking or customer moment creates the trigger.", accent: "#D58C75" },
    { label: "Growth", steps: ["Audience or time trigger", "Proactive campaign", "More revenue"], copy: "The business selects who to reach and when, then creates new demand from its database.", accent: "#DDA34B" },
  ] as const;
  return (
    <section className="bg-[#111412] px-5 py-18 text-[#F7F4EE] sm:px-10 sm:py-22 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <Reveal className="max-w-[900px]"><Eyebrow light>Why Growth exists</Eyebrow><h2 className="mt-5 text-[41px] font-medium leading-[0.95] tracking-[-0.052em] sm:text-[56px] lg:text-[66px]" style={{ fontFamily: DISPLAY }}>Growth isn’t more CRM. <span className="text-[#D58C75]">It’s a different job.</span></h2><p className="mt-5 max-w-[720px] text-[15px] leading-[1.65] text-white/55">Follow-Through protects live demand. Growth adds the proactive capability to create demand from customers and leads already in the database.</p></Reveal>
        <div className="mt-9 grid gap-4 lg:grid-cols-2">
          {paths.map((path, index) => <Reveal key={path.label} delay={index * 0.1}><article className="rounded-[24px] border border-white/10 bg-white/[0.035] p-6 sm:p-7"><Eyebrow light>{path.label}</Eyebrow><p className="mt-4 text-[13px] leading-[1.55] text-white/55">{path.copy}</p><div className="mt-7 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">{path.steps.map((step, stepIndex) => <span key={step} className="contents"><span className="rounded-[13px] border border-white/10 bg-white/[0.045] px-3 py-3 text-center text-[11px] font-semibold text-white/78">{step}</span>{stepIndex < path.steps.length - 1 ? <ArrowRight size={14} className="mx-auto rotate-90 text-white/28 sm:rotate-0" /> : null}</span>)}</div><div className="mt-6 h-1 w-16 rounded-full" style={{ background: path.accent }} /></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return <Reveal className="max-w-[850px]"><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-4 text-[37px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[48px] lg:text-[57px]" style={{ fontFamily: DISPLAY }}>{title}</h2>{copy ? <p className="mt-4 max-w-[720px] text-[14px] leading-[1.65] text-[#666B66] sm:text-[16px]">{copy}</p> : null}</Reveal>;
}

function Comparison() {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-[#FBFAF7] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Detailed comparison" title={<>Same platform. <span className="text-[#C96F55]">Different growth capability.</span></>} copy="Growth becomes different only where proactive marketing begins." /><button type="button" aria-expanded={open} aria-controls="mobile-plan-comparison" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-[#1E2B29]/15 bg-[#F6F0E8] px-5 text-[12px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DDA34B] lg:hidden">{open ? "Hide details" : "Compare all capabilities"}<ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></button></div>
        <Reveal className="mt-8 hidden overflow-hidden rounded-[22px] border border-black/[0.07] bg-white shadow-[0_18px_48px_rgba(48,38,29,.05)] lg:block">
          <table className="w-full border-collapse text-[12.5px]"><thead><tr>{["Capability", "Follow-Through", "Growth"].map((heading, index) => <th key={heading} scope="col" className={`border-b border-black/[0.07] px-5 py-4 text-left text-[9px] font-bold uppercase tracking-[0.14em] ${index === 0 ? "sticky left-0 z-10 bg-white" : ""} ${index === 2 ? "bg-[#FFF2D8] text-[#8A641F]" : "text-[#77716A]"}`}>{heading}</th>)}</tr></thead>{comparisonGroups.map((group) => <tbody key={group.title}><tr><th colSpan={3} className="border-y border-black/[0.07] bg-[#F3EEE6] px-5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B7054]">{group.title}</th></tr>{group.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell} className="sticky left-0 z-10 border-b border-black/[0.055] bg-white px-5 py-3.5 text-left font-semibold text-[#292C29]">{cell}</th> : <td key={`${row[0]}-${index}`} className={`border-b border-black/[0.055] px-5 py-3.5 text-[#606560] ${index === 2 ? "bg-[#FFFAEE]" : ""}`}>{cell}</td>)}</tr>)}</tbody>)}</table>
        </Reveal>
        <div id="mobile-plan-comparison" className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none lg:hidden ${open ? "mt-7 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="grid gap-3">{comparisonGroups.map((group, index) => <ComparisonGroup key={group.title} group={group} defaultOpen={index === 0} />)}</div></div></div>
      </div>
    </section>
  );
}

function ComparisonGroup({ group, defaultOpen }: { group: (typeof comparisonGroups)[number]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return <div className="overflow-hidden rounded-[18px] border border-black/[0.07] bg-white"><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B]"><span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#6E5A45]">{group.title}</span><ChevronDown size={16} className={`text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><div className="border-t border-black/[0.06]">{group.rows.map((row) => <div key={row[0]} className="border-b border-black/[0.055] px-5 py-4 last:border-0"><p className="text-[12.5px] font-semibold leading-[1.4] text-[#303330]">{row[0]}</p><div className="mt-2 grid grid-cols-2 gap-3"><div><span className="block text-[8px] font-bold uppercase tracking-[0.1em] text-[#88817A]">Follow-Through</span><span className="mt-1 block text-[11.5px] text-[#606560]">{row[1]}</span></div><div className="rounded-[10px] bg-[#FFF8E8] px-2.5 py-2"><span className="block text-[8px] font-bold uppercase tracking-[0.1em] text-[#9A7550]">Growth</span><span className="mt-1 block text-[11.5px] text-[#50544F]">{row[2]}</span></div></div></div>)}</div></div></div></div>;
}

function GuidedLaunch() {
  return (
    <section className="bg-[#F3EDE4] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="Guided Launch" title={<>Software access can be broad. <span className="text-[#C96F55]">Our build scope cannot be endless.</span></>} copy="Your plan gives you the platform. Guided Launch covers the agreed Zapla-configured work needed to take the first version live." />
        <div className="mt-9 grid gap-4 lg:grid-cols-2">{launchScopes.map((scope, index) => <Reveal key={scope.name} delay={index * 0.06} className="h-full"><article className={`h-full rounded-[24px] border p-6 sm:p-7 ${index === 1 ? "border-[#DDA34B]/45 bg-[#FFF2D8]" : "border-black/[0.07] bg-[#FBFAF7]"}`}><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-[26px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{scope.name}</h3><span className="text-[11px] font-bold text-[#8A641F]">Candidate {scope.price}</span></div><ul className="mt-6 grid gap-3 sm:grid-cols-2">{scope.items.map((item) => <li key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-[#555A56]"><Tick />{item}</li>)}</ul></article></Reveal>)}</div>
        <p className="mt-5 rounded-[15px] border border-black/[0.07] bg-white/65 px-5 py-4 text-[12px] leading-[1.6] text-[#5E625E]"><strong className="text-[#2E312E]">After launch:</strong> software builder access remains available. Additional Zapla-built work moves to Managed Success or quoted custom work.</p>
      </div>
    </section>
  );
}

function GhostToGold() {
  const facts = ["One staged campaign", "Typical target: roughly 3 to 8 weeks", "Standard maximum deployment: 90 days", "Above 5,000 contacts: custom-scoped"];
  return <section className="bg-[#1E2B29] px-5 py-18 text-[#F7F4EE] sm:px-10 sm:py-22 lg:px-16 lg:py-24"><div className="mx-auto grid max-w-[1180px] gap-9 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14"><Reveal><Eyebrow light>Ghost to Gold</Eyebrow><h2 className="mt-5 text-[41px] font-medium leading-[0.96] tracking-[-0.052em] sm:text-[54px] lg:text-[62px]" style={{ fontFamily: DISPLAY }}>Not ready for Growth? <span className="text-[#DDA34B]">Start with the database you already own.</span></h2><p className="mt-5 max-w-[620px] text-[14px] leading-[1.65] text-white/58 sm:text-[16px]">A focused acquisition wedge for eligible contacts already in your database, delivered as a staged campaign rather than a fixed 30-day blast.</p></Reveal><Reveal delay={0.06} className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 sm:p-7"><div className="grid gap-3 sm:grid-cols-2"><PriceBlock title="Ghost to Gold Sprint" price="A$997 + GST" /><PriceBlock title="Ghost to Gold Managed" price="A$1,497 + GST" /></div><p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#DDA34B]">Candidate pricing · up to 2,500 eligible contacts</p><div className="mt-6 grid gap-3">{facts.map((fact) => <div key={fact} className="flex items-center gap-3 text-[12.5px] text-white/70"><CircleDot size={14} className="shrink-0 text-[#D58C75]" />{fact}</div>)}</div><p className="mt-5 border-t border-white/10 pt-5 text-[11.5px] leading-[1.55] text-white/54">AU initial activation wave includes up to 2,500 outbound SMS segments in this draft.</p></Reveal></div></section>;
}

function PriceBlock({ title, price }: { title: string; price: string }) {
  return <div className="rounded-[17px] border border-white/10 bg-black/10 p-4"><p className="text-[10px] font-semibold text-white/52">{title}</p><p className="mt-2 text-[22px] font-medium tracking-[-0.035em] text-[#F7F4EE]" style={{ fontFamily: DISPLAY }}>{price}</p></div>;
}

function AddOns() {
  return <section className="bg-[#FBFAF7] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"><div className="mx-auto max-w-[1180px]"><SectionHeading eyebrow="Optional expansion" title={<>Add specialist help <span className="text-[#777B76]">without changing the plan logic.</span></>} copy="These options sit beside either standard plan. They are not artificial Growth gates." /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{addOns.map((item, index) => <Reveal key={item.title} delay={index * 0.04} className="h-full"><article className={`flex h-full min-h-[270px] flex-col rounded-[22px] border border-black/[0.06] p-6 ${item.color}`}><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9A684E]">{item.label}</p><h3 className="mt-5 text-[22px] font-medium leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{item.title}</h3><p className="mt-3 text-[12.5px] leading-[1.58] text-[#5E625E]">{item.copy}</p><p className="mt-auto border-t border-black/[0.08] pt-4 text-[12px] font-bold text-[#333632]">{item.price}</p></article></Reveal>)}</div><p className="mt-4 text-[10.5px] text-[#77716A]">AU candidate pricing is shown. SG and HK regional pricing remains under validation.</p></div></section>;
}

function Usage() {
  return <section className="bg-[#F6F0E8] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"><div className="mx-auto max-w-[1080px]"><SectionHeading eyebrow="Draft AU usage rates" title={<>Simple rates. <span className="text-[#C96F55]">Shown before you use them.</span></>} copy="Usage sits outside the software fee. No dense credit system and no hidden conversion." /><div className="mt-8 overflow-hidden rounded-[22px] border border-black/[0.07] bg-white">{usage.map(([name, price, unit], index) => <div key={name} className={`grid gap-1 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8 sm:px-7 ${index ? "border-t border-black/[0.06]" : ""}`}><p className="text-[13px] font-semibold text-[#303330]">{name}</p><p className="text-[15px] font-medium tracking-[-0.02em] text-[#1E2B29]" style={{ fontFamily: DISPLAY }}>{price}</p><p className="text-[11px] text-[#777B76] sm:w-[170px]">{unit}</p></div>)}</div><p className="mt-4 text-[11px] text-[#77716A]">SG and HK local usage rates are still being validated.</p></div></section>;
}

function Faq() {
  return <section className="bg-[#F0ECE5] px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24"><div className="mx-auto max-w-[1080px]"><SectionHeading eyebrow="Commercial FAQ" title={<>Questions this architecture <span className="text-[#777B76]">must answer clearly.</span></>} /><div className="mt-8 grid gap-2.5 md:grid-cols-2 md:items-start">{faqs.map((faq) => <FaqItem key={faq.q} faq={faq} />)}</div></div></section>;
}

function FaqItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);
  return <div className={`overflow-hidden rounded-[17px] border bg-white/90 transition-colors duration-200 ${open ? "border-black/[0.13]" : "border-black/[0.07]"}`}><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B]"><span className="text-[13.5px] font-semibold leading-[1.4] text-[#292B28]">{faq.q}</span><ChevronDown size={16} className={`shrink-0 text-[#9A7550] transition-transform duration-200 ${open ? "rotate-180" : ""}`} /></button><div className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="border-t border-black/[0.06] px-5 pb-5 pt-4 text-[12.5px] leading-[1.62] text-[#666B66]">{faq.a}</p></div></div></div>;
}

function FinalCta() {
  return <section id="pricing-v3-final-cta" className="bg-[#111412] px-5 py-18 text-[#F7F4EE] sm:px-10 sm:py-22 lg:px-16 lg:py-24"><Reveal className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_.5fr] lg:items-end"><div><Eyebrow light>Pricing V3 architecture</Eyebrow><h2 className="mt-5 max-w-[790px] text-[44px] font-medium leading-[0.95] tracking-[-0.055em] sm:text-[60px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>Start with the job. <span className="text-[#D58C75]">Then choose the plan.</span></h2></div><div><p className="text-[14px] leading-[1.65] text-white/58">This internal page is still testing the hierarchy and candidate prices. A call starts with the job your business needs Zapla to do.</p><a href={BOOK_URL} className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[12.5px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">Book a Call <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transform-none" /></a></div></Reveal></section>;
}

function StickyMobileCta() {
  const [visible, setVisible] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520 && window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 320);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const finalSection = document.getElementById("pricing-v3-final-cta");
    const observer = finalSection && typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([entry]) => setFinalVisible(Boolean(entry?.isIntersecting)), { threshold: 0.08 }) : null;
    if (finalSection && observer) observer.observe(finalSection);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); observer?.disconnect(); };
  }, []);
  if (!visible || finalVisible) return null;
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: EASE }} className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-[#F7F4EE]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md md:hidden"><a href={BOOK_URL} className="block rounded-full bg-[#1E2B29] px-4 py-3 text-center text-[13px] font-semibold text-[#F7F4EE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDA34B]">Book a Call</a></motion.div>;
}
