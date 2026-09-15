import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  Megaphone,
  MessageSquareText,
  PhoneCall,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/Pricing-v3")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Pricing V3 Internal Draft | Zapla" },
      {
        name: "description",
        content: "An internal Zapla pricing architecture draft for Follow-Through, Growth, and Enterprise.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Pricing V3 Internal Draft | Zapla" },
      {
        property: "og:description",
        content: "An internal Zapla pricing architecture draft for Follow-Through, Growth, and Enterprise.",
      },
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
    line: "Protect the demand you already have.",
    price: "A$399",
    suffix: "/mo + GST",
    launch: "from A$997 + GST",
    tone: "bg-[#FBFAF7] border-black/[0.08]",
    features: [
      "Unlimited users",
      "Unlimited stored contacts under fair use",
      "CRM and customer records",
      "Unified inbox",
      "Pipelines and opportunities",
      "Calendars and online booking",
      "Forms and surveys",
      "Payments and invoicing",
      "VoIP and phone dialer access, usage separate",
      "Website and funnel builder access, self-service",
      "Lead Rescue and missed-call follow-up",
      "Lead Follow-Through",
      "Quote Chaser",
      "Appointment Recovery",
      "Review Engine",
      "Referral follow-through",
      "Standard technical support",
    ],
  },
  {
    name: "Growth",
    line: "Everything in Follow-Through + actively create demand.",
    price: "A$699",
    suffix: "/mo + GST",
    launch: "from A$1,497 + GST",
    tone: "bg-[#FFF0D2] border-[#C7933E]/55",
    recommended: true,
    features: [
      "Everything in Follow-Through",
      "Reactivation Engine",
      "Repeat and Recall Engine",
      "Email marketing broadcasts",
      "Bulk SMS and WhatsApp campaigns",
      "Advanced segmentation",
      "Campaign templates",
      "Social media scheduler and Social Planner",
      "Ad Manager",
      "Growth marketing AI and Copilot where enabled",
    ],
  },
  {
    name: "Enterprise",
    line: "For genuine operational complexity.",
    price: "Custom",
    suffix: "pricing",
    launch: "Custom implementation",
    tone: "bg-[#1E2B29] border-white/10 text-[#F7F4EE]",
    dark: true,
    features: [
      "Multi-entity or multi-brand operations",
      "Advanced integrations and migrations",
      "Verified governance or security requirements",
      "Non-standard routing and reporting",
      "High-volume operational requirements",
      "Custom support and implementation",
    ],
  },
] as const;

const comparisonGroups = [
  {
    title: "Operating platform",
    rows: [
      ["Unlimited users", "Included", "Included"],
      ["Unlimited stored contacts under fair use", "Included", "Included"],
      ["CRM, inbox, pipelines and opportunities", "Included", "Included"],
      ["Calendars, forms, payments and invoicing", "Included", "Included"],
      ["Self-service website and funnel builder", "Included", "Included"],
      ["VoIP and phone dialer access", "Usage separate", "Usage separate"],
    ],
  },
  {
    title: "Follow-through systems",
    rows: [
      ["Lead Rescue and missed-call follow-up", "Included", "Included"],
      ["Lead Follow-Through and Quote Chaser", "Included", "Included"],
      ["Appointment Recovery", "Included", "Included"],
      ["Review Engine and referral follow-through", "Included", "Included"],
    ],
  },
  {
    title: "Proactive growth",
    rows: [
      ["Reactivation and Repeat / Recall Engines", "Not included", "Included"],
      ["Broadcast email, SMS and WhatsApp campaigns", "Not included", "Included"],
      ["Advanced segmentation and campaign templates", "Not included", "Included"],
      ["Social Planner and Ad Manager", "Not included", "Included"],
      ["Growth marketing AI / Copilot where enabled", "Not included", "Included"],
    ],
  },
  {
    title: "Support + expansion",
    rows: [
      ["Standard technical support", "Included", "Included"],
      ["AI Receptionist", "Optional", "Optional"],
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
      "One Zapla-connected number / forwarding setup",
      "Up to 2 configured pipelines",
      "Up to 3 standard forms / surveys",
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
  {
    title: "AI Receptionist",
    price: "A$199/mo + GST",
    label: "Candidate",
    copy: "Includes 200 Voice AI minutes. Current draft overage is A$0.90 per additional minute. Available on either standard plan.",
    color: "bg-[#EFE2D2]",
  },
  {
    title: "Priority Expert Support",
    price: "A$149/mo + GST",
    label: "Candidate",
    copy: "Priority human troubleshooting, guidance and screen-share help. It does not include new workflow, campaign or website building.",
    color: "bg-[#E4E5D2]",
  },
  {
    title: "Managed Success",
    price: "A$697/mo + GST",
    label: "AU candidate",
    copy: "A monthly review plus up to 3 effective hours of agreed optimisation or execution. Hours do not roll over.",
    color: "bg-[#E6DDE8]",
  },
  {
    title: "Website AI Chat / AI Front Desk",
    price: "Regional price under validation",
    label: "Still under validation",
    copy: "The product placement is clear. Supplier economics and the public price are not yet locked.",
    color: "bg-[#E1E7E0]",
  },
] as const;

const usage = [
  ["Outbound SMS", "A$0.13 + GST", "per carrier segment"],
  ["Inbound SMS", "A$0.02 + GST", "per carrier segment"],
  ["Voice AI overage", "A$0.90 + GST", "per additional minute"],
  ["Email overage", "A$1.00 + GST", "per 1,000 events"],
  ["WhatsApp", "Provider + activation", "shown before enablement"],
] as const;

const faqs = [
  {
    q: "What actually makes Growth different from Follow-Through?",
    a: "Follow-Through reacts when something happens to a customer record and makes sure the next step happens. Growth gives the business proactive marketing tools to create a trigger across selected audiences, including campaigns, broadcasts, recall, nurture, social and ads.",
  },
  {
    q: "Are contacts really unlimited?",
    a: "The current architecture includes unlimited stored contacts under fair use on both standard plans. Usage-heavy communications are still charged separately, and unusual high-volume operational requirements may need an Enterprise scope.",
  },
  {
    q: "Can different locations use different plans?",
    a: "The standard public model is one software tier per organisation, and additional locations inherit it. Unusual mixed-use cases can be custom scoped.",
  },
  {
    q: "What is included in standard support?",
    a: "Standard technical support helps with product access, faults and normal platform questions. Priority Expert Support adds faster human troubleshooting, guidance and screen-share help, but does not include new builds.",
  },
  {
    q: "Why is Guided Launch separate?",
    a: "The monthly plan covers software access. Guided Launch covers the finite work of mapping, configuring, importing, training, checking and taking the first version live.",
  },
  {
    q: "How does Ghost to Gold work?",
    a: "It is a staged reactivation campaign for eligible contacts already in your database. The standard draft covers up to 2,500 contacts, normally runs for roughly 3 to 8 weeks, and has a standard maximum deployment window of 90 days.",
  },
  {
    q: "Is there a contract?",
    a: "The current architecture is month-to-month after launch, with no early termination fee.",
  },
  {
    q: "Is Website AI Chat included?",
    a: "Not yet as a fixed public-priced item. Its placement is clear, but supplier economics are still under validation.",
  },
  {
    q: "Why no per-user fee?",
    a: "Follow-through works best when the people responsible for the customer journey can participate. The proposed architecture therefore includes unlimited users on both standard plans.",
  },
] as const;

function PricingV3Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EE] text-[#111318] antialiased" style={{ fontFamily: BODY }}>
      <HeroAndPlans />
      <UpgradeLogic />
      <Comparison />
      <GuidedLaunch />
      <AddOns />
      <GhostToGold />
      <Usage />
      <Faq />
      <FinalCta />
    </main>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 1, y: 9 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.38, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-[#DDA34B]" : "text-[#C96F55]"}`}>{children}</p>;
}

function Tick({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10 text-[#F7F4EE]" : "bg-[#99A36D]/20 text-[#667052]"}`}>
      <Check size={11} strokeWidth={2.5} />
    </span>
  );
}

function HeroAndPlans() {
  return (
    <section id="plans" className="bg-[#F6F0E8] px-5 pb-16 pt-[104px] sm:px-10 sm:pt-[116px] lg:px-16 lg:pb-24 lg:pt-[128px]">
      <div className="mx-auto max-w-[1380px]">
        <Reveal className="mx-auto max-w-[960px] text-center">
          <div className="mx-auto inline-flex rounded-full border border-[#C96F55]/25 bg-[#F3E3D9] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#A95440]">
            Pricing V3 · internal draft
          </div>
          <h1 className="mx-auto mt-6 max-w-[900px] text-[43px] font-medium leading-[0.94] tracking-[-0.055em] sm:text-[62px] lg:text-[76px]" style={{ fontFamily: DISPLAY }}>
            Stop revenue leaking. <span className="text-[#C96F55]">Then create more of it.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[790px] text-[15px] leading-[1.65] text-[#626762] sm:text-[17px]">
            Follow-Through protects demand already coming into the business. Growth adds the proactive marketing layer to create more demand from customers and leads already in the database.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-semibold text-[#4F544F] sm:text-[12px]">
            {["AUD pricing", "Unlimited users", "Unlimited stored contacts*", "Month-to-month"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2"><Tick />{item}</span>
            ))}
          </div>
          <p className="mt-4 text-[10.5px] text-[#817B73]">All figures on this page remain draft candidates for architecture testing.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => <PlanCard key={plan.name} plan={plan} index={index} />)}
        </div>
        <p className="mt-5 text-center text-[10.5px] leading-relaxed text-[#77716A]">* Unlimited stored contacts are subject to fair use. Communications and other usage are charged separately.</p>
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: (typeof plans)[number]; index: number }) {
  const [open, setOpen] = useState(index === 1);
  return (
    <Reveal delay={index * 0.04} className="h-full">
      <article className={`flex h-full flex-col rounded-[27px] border p-6 shadow-[0_18px_46px_rgba(48,38,29,.055)] transition-[transform,box-shadow] duration-200 md:hover:-translate-y-[2px] md:hover:shadow-[0_24px_56px_rgba(48,38,29,.09)] ${plan.tone}`}>
        <div className="flex min-h-7 flex-wrap items-center gap-2">
          <h2 className="text-[28px] font-medium tracking-[-0.045em]" style={{ fontFamily: DISPLAY }}>{plan.name}</h2>
          {"recommended" in plan ? <span className="rounded-full bg-[#1E2B29] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.13em] text-[#F7F4EE]">Architecture focus</span> : null}
        </div>
        <p className={`mt-2 min-h-[48px] text-[13px] leading-[1.55] ${"dark" in plan ? "text-white/60" : "text-[#656A65]"}`}>{plan.line}</p>
        <div className="mt-5 flex items-end gap-2">
          <strong className="text-[47px] font-medium leading-none tracking-[-0.06em]" style={{ fontFamily: DISPLAY }}>{plan.price}</strong>
          <span className={`pb-1 text-[11px] font-semibold ${"dark" in plan ? "text-white/45" : "text-[#77716A]"}`}>{plan.suffix}</span>
        </div>
        <div className={`mt-4 rounded-[16px] border px-4 py-3 ${"dark" in plan ? "border-white/10 bg-white/[0.04]" : "border-black/[0.06] bg-white/55"}`}>
          <p className={`text-[8px] font-bold uppercase tracking-[0.15em] ${"dark" in plan ? "text-[#DDA34B]" : "text-[#9A7550]"}`}>Guided Launch candidate</p>
          <p className={`mt-1 text-[12px] font-semibold ${"dark" in plan ? "text-white/82" : "text-[#373833]"}`}>{plan.launch}</p>
        </div>
        <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className={`mt-5 flex w-full items-center justify-between rounded-[13px] border px-4 py-3 text-left text-[12px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DDA34B] lg:hidden ${"dark" in plan ? "border-white/10" : "border-black/[0.07]"}`}>
          {open ? "Hide inclusions" : "View inclusions"}<ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <div className={`grid transition-[grid-template-rows,opacity] duration-200 lg:grid-rows-[1fr] lg:opacity-100 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
          <div className="overflow-hidden">
            <ul className="mt-5 grid gap-2.5">
              {plan.features.map((feature) => <li key={feature} className={`flex items-start gap-2 text-[12px] leading-[1.45] ${"dark" in plan ? "text-white/68" : "text-[#50534E]"}`}><Tick dark={"dark" in plan} /><span>{feature}</span></li>)}
            </ul>
          </div>
        </div>
        <a href={BOOK_URL} className={`group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[12.5px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B] lg:mt-auto lg:pt-0 ${"dark" in plan ? "bg-[#F7F4EE] text-[#1E2B29]" : "bg-[#1E2B29] text-[#F7F4EE]"}`}>{"dark" in plan ? "Discuss complexity" : "Book a Call"}<ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></a>
      </article>
    </Reveal>
  );
}

function UpgradeLogic() {
  const paths = [
    {
      label: "Follow-Through",
      title: "An event happens to one customer record.",
      items: ["Missed call", "Enquiry", "Quote", "Booking", "No-show", "Completed job", "Review or referral trigger"],
      result: "Zapla reacts and follows it through.",
      accent: "#D58C75",
      Icon: RefreshCw,
    },
    {
      label: "Growth",
      title: "The business proactively creates the trigger.",
      items: ["Dormant leads", "Past customers", "Recall", "Nurture", "Broadcasts", "Campaigns", "Social and ad activity"],
      result: "Zapla creates demand.",
      accent: "#DDA34B",
      Icon: Megaphone,
    },
  ] as const;
  return (
    <section className="bg-[#111412] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow light>Upgrade logic</Eyebrow>
          <h2 className="mt-5 text-[42px] font-medium leading-[0.95] tracking-[-0.052em] sm:text-[58px] lg:text-[70px]" style={{ fontFamily: DISPLAY }}>Growth isn’t more CRM. <span className="text-[#D58C75]">It’s a different job.</span></h2>
          <p className="mt-5 max-w-[720px] text-[15px] leading-[1.65] text-white/55">The upgrade boundary is not people or database size. It is the move from reacting to customer moments to intentionally creating new demand.</p>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {paths.map((path, index) => (
            <Reveal key={path.label} delay={index * 0.05} className="h-full">
              <article className="flex h-full flex-col rounded-[26px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <Eyebrow light>{path.label}</Eyebrow>
                  <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-white/10 bg-white/[0.04]" style={{ color: path.accent }}><path.Icon size={19} /></span>
                </div>
                <h3 className="mt-7 max-w-[480px] text-[27px] font-medium leading-[1.05] tracking-[-0.04em] sm:text-[32px]" style={{ fontFamily: DISPLAY }}>{path.title}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {path.items.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-[10.5px] font-medium text-white/68">{item}</span>)}
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: path.accent }} />
                  <p className="text-[15px] font-semibold" style={{ color: path.accent }}>{path.result}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return <Reveal className="max-w-[850px]"><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-4 text-[38px] font-medium leading-[0.98] tracking-[-0.05em] sm:text-[50px] lg:text-[60px]" style={{ fontFamily: DISPLAY }}>{title}</h2>{copy ? <p className="mt-4 max-w-[720px] text-[14px] leading-[1.65] text-[#666B66] sm:text-[16px]">{copy}</p> : null}</Reveal>;
}

function Comparison() {
  return (
    <section className="bg-[#FBFAF7] px-5 py-18 sm:px-10 sm:py-22 lg:px-16 lg:py-26">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeading eyebrow="Compare the jobs" title={<>Same operating platform. <span className="text-[#C96F55]">Different growth capability.</span></>} copy="Growth lights up when the business needs proactive marketing. The upgrade is not driven by contact caps or seat limits." />
        <Reveal className="mt-9 overflow-x-auto rounded-[23px] border border-black/[0.07] bg-white shadow-[0_18px_48px_rgba(48,38,29,.05)]">
          <table className="w-full min-w-[760px] border-collapse text-[12.5px]">
            <thead><tr>{["Capability", "Follow-Through", "Growth"].map((heading, index) => <th key={heading} className={`border-b border-black/[0.07] px-5 py-4 text-left text-[9px] font-bold uppercase tracking-[0.14em] ${index === 0 ? "sticky left-0 z-10 bg-white" : ""} ${index === 2 ? "bg-[#FFF2D8] text-[#8A641F]" : "text-[#77716A]"}`}>{heading}</th>)}</tr></thead>
            <tbody>
              {comparisonGroups.map((group) => (
                <Fragment key={group.title}>
                  <tr><th colSpan={3} className="border-y border-black/[0.07] bg-[#F3EEE6] px-5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.16em] text-[#8B7054]">{group.title}</th></tr>
                  {group.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`} className={`border-b border-black/[0.055] px-5 py-3.5 ${index === 0 ? "sticky left-0 z-10 bg-white font-semibold text-[#292C29]" : "text-[#606560]"} ${index === 2 ? "bg-[#FFFAEE]" : ""}`}>{cell}</td>)}</tr>)}
                </Fragment>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

function GuidedLaunch() {
  return (
    <section className="bg-[#F3EDE4] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow="Guided Launch" title={<>Software access can be broad. <span className="text-[#C96F55]">Our build scope cannot be endless.</span></>} copy="Your plan gives you the platform. Guided Launch covers the agreed done-for-you work needed to configure the first version and take it live." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {launchScopes.map((scope, index) => <Reveal key={scope.name} delay={index * 0.05} className="h-full"><article className={`h-full rounded-[26px] border p-6 sm:p-8 ${index === 1 ? "border-[#DDA34B]/50 bg-[#FFF2D8]" : "border-black/[0.07] bg-[#FBFAF7]"}`}><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="text-[27px] font-medium tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{scope.name}</h3><span className="text-[11px] font-bold text-[#8A641F]">Candidate {scope.price}</span></div><ul className="mt-6 grid gap-3 sm:grid-cols-2">{scope.items.map((item) => <li key={item} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-[#555A56]"><Tick />{item}</li>)}</ul></article></Reveal>)}
        </div>
        <p className="mt-5 rounded-[16px] border border-black/[0.07] bg-white/65 px-5 py-4 text-[12px] leading-[1.6] text-[#5E625E]"><strong className="text-[#2E312E]">After launch:</strong> software builder access remains available. Additional Zapla-built work moves to Managed Success or quoted custom work.</p>
      </div>
    </section>
  );
}

function AddOns() {
  return (
    <section className="bg-[#FBFAF7] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow="Optional expansion" title={<>Add specialist help <span className="text-[#777B76]">without changing the plan logic.</span></>} copy="These options sit beside either standard plan. They are not artificial Growth gates." />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {addOns.map((item, index) => <Reveal key={item.title} delay={index * 0.035} className="h-full"><article className={`flex h-full min-h-[300px] flex-col rounded-[24px] border border-black/[0.06] p-6 ${item.color}`}><p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#9A684E]">{item.label}</p><h3 className="mt-5 text-[23px] font-medium leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>{item.title}</h3><p className="mt-3 text-[12.5px] leading-[1.58] text-[#5E625E]">{item.copy}</p><p className="mt-auto border-t border-black/[0.08] pt-4 text-[12px] font-bold text-[#333632]">{item.price}</p></article></Reveal>)}
        </div>
        <p className="mt-4 text-[10.5px] text-[#77716A]">AU candidate pricing is shown. SG and HK regional pricing remains under validation.</p>
      </div>
    </section>
  );
}

function GhostToGold() {
  const facts = ["One staged campaign", "Typical target: roughly 3 to 8 weeks", "Standard maximum deployment: 90 days", "Above 5,000 contacts: custom-scoped"];
  return (
    <section className="bg-[#1E2B29] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">
        <Reveal><Eyebrow light>Ghost to Gold</Eyebrow><h2 className="mt-5 text-[42px] font-medium leading-[0.96] tracking-[-0.052em] sm:text-[56px] lg:text-[65px]" style={{ fontFamily: DISPLAY }}>Not ready for Growth? <span className="text-[#DDA34B]">Start with the database you already own.</span></h2><p className="mt-5 max-w-[650px] text-[14px] leading-[1.65] text-white/58 sm:text-[16px]">A focused acquisition wedge for eligible contacts already in your database, delivered as a staged campaign rather than a fixed 30-day blast.</p></Reveal>
        <Reveal delay={0.05} className="rounded-[26px] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <PriceBlock title="Ghost to Gold Sprint" price="A$997 + GST" />
            <PriceBlock title="Ghost to Gold Managed" price="A$1,497 + GST" />
          </div>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#DDA34B]">Candidate pricing · up to 2,500 eligible contacts</p>
          <div className="mt-6 grid gap-3">{facts.map((fact) => <div key={fact} className="flex items-center gap-3 text-[12.5px] text-white/70"><CircleDot size={14} className="shrink-0 text-[#D58C75]" />{fact}</div>)}</div>
          <p className="mt-5 border-t border-white/10 pt-5 text-[11.5px] leading-[1.55] text-white/54">AU initial activation wave includes up to 2,500 outbound SMS segments in this draft.</p>
        </Reveal>
      </div>
    </section>
  );
}

function PriceBlock({ title, price }: { title: string; price: string }) {
  return <div className="rounded-[18px] border border-white/10 bg-black/10 p-4"><p className="text-[10px] font-semibold text-white/52">{title}</p><p className="mt-2 text-[22px] font-medium tracking-[-0.035em] text-[#F7F4EE]" style={{ fontFamily: DISPLAY }}>{price}</p></div>;
}

function Usage() {
  return (
    <section className="bg-[#F6F0E8] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-26">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="Draft AU usage rates" title={<>Simple rates. <span className="text-[#C96F55]">Shown before you use them.</span></>} copy="Usage sits outside the software fee. No dense credit system and no hidden conversion." />
        <div className="mt-8 overflow-hidden rounded-[24px] border border-black/[0.07] bg-white">
          {usage.map(([name, price, unit], index) => <div key={name} className={`grid gap-1 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8 sm:px-7 ${index ? "border-t border-black/[0.06]" : ""}`}><p className="text-[13px] font-semibold text-[#303330]">{name}</p><p className="text-[15px] font-medium tracking-[-0.02em] text-[#1E2B29]" style={{ fontFamily: DISPLAY }}>{price}</p><p className="text-[11px] text-[#777B76] sm:w-[170px]">{unit}</p></div>)}
        </div>
        <p className="mt-4 text-[11px] text-[#77716A]">SG and HK local usage rates are still being validated.</p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="bg-[#F0ECE5] px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-26">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeading eyebrow="Commercial FAQ" title={<>Questions this architecture <span className="text-[#777B76]">must answer clearly.</span></>} />
        <div className="mt-8 grid gap-2.5 md:grid-cols-2 md:items-start">{faqs.map((faq) => <FaqItem key={faq.q} faq={faq} />)}</div>
      </div>
    </section>
  );
}

function FaqItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-[18px] border bg-white/90 transition-colors duration-200 ${open ? "border-black/[0.13]" : "border-black/[0.07]"}`}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#DDA34B]"><span className="text-[13.5px] font-semibold leading-[1.4] text-[#292B28]">{faq.q}</span><ChevronDown size={16} className={`shrink-0 text-[#9A7550] transition-transform ${open ? "rotate-180" : ""}`} /></button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden"><p className="border-t border-black/[0.06] px-5 pb-5 pt-4 text-[12.5px] leading-[1.62] text-[#666B66]">{faq.a}</p></div></div>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="bg-[#111412] px-5 py-20 text-[#F7F4EE] sm:px-10 sm:py-24 lg:px-16 lg:py-28">
      <Reveal className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_.5fr] lg:items-end">
        <div><Eyebrow light>Pricing V3 architecture</Eyebrow><h2 className="mt-5 max-w-[820px] text-[45px] font-medium leading-[0.95] tracking-[-0.055em] sm:text-[62px] lg:text-[74px]" style={{ fontFamily: DISPLAY }}>Start with the job. <span className="text-[#D58C75]">Then choose the plan.</span></h2></div>
        <div><p className="text-[14px] leading-[1.65] text-white/58">This internal page is still testing the hierarchy and candidate prices. A call starts with the job your business needs Zapla to do.</p><a href={BOOK_URL} className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#F7F4EE] px-6 text-[12.5px] font-semibold text-[#1E2B29] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#DDA34B]">Book a Call <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></a></div>
      </Reveal>
    </section>
  );
}