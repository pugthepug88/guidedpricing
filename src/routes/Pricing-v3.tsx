import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Phone,
  Sparkles,
  Megaphone,
  Headphones,
  MapPin,
  MessagesSquare,
  Workflow,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/Pricing-v3")({
  head: () => ({
    meta: [
      { title: "Pricing V3 — Zapla" },
      {
        name: "description",
        content:
          "Working draft of Zapla's revised pricing architecture. For internal review only.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PricingV3,
});

const BOOK_URL = "https://zapla.io/booking";
const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const BODY = '"Manrope", system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

const C = {
  paper: "#F7F4EE",
  paper2: "#F1ECE4",
  ink: "#121513",
  muted: "#6C716C",
  line: "#DCD4C9",
  dark: "#161916",
  green: "#24332E",
  coral: "#D67A60",
  amber: "#D7A34F",
  sage: "#9AA27A",
  plum: "#9582A7",
  blue: "#768E91",
  cream: "#FFFDF9",
};

const REGIONS = {
  AU: {
    label: "Australia",
    symbol: "A$",
    tax: "+ GST",
    follow: 399,
    growth: 699,
    followLaunch: 997,
    growthLaunch: 1497,
    priority: 149,
    voice: 199,
    voiceOverage: "A$0.90 / min",
    extraFollow: 199,
    extraGrowth: 349,
  },
  SG: {
    label: "Singapore",
    symbol: "S$",
    tax: "+ applicable tax",
    follow: 399,
    growth: 799,
    followLaunch: 997,
    growthLaunch: 1497,
    priority: 149,
    voice: 249,
    voiceOverage: "S$0.60 / min",
    extraFollow: 199,
    extraGrowth: 399,
  },
  HK: {
    label: "Hong Kong",
    symbol: "HK$",
    tax: "",
    follow: 1980,
    growth: 3980,
    followLaunch: 4980,
    growthLaunch: 7480,
    priority: 780,
    voice: 1280,
    voiceOverage: "HK$3.50 / min",
    extraFollow: 980,
    extraGrowth: 1980,
  },
} as const;

type RegionKey = keyof typeof REGIONS;

const FOLLOW_FEATURES = [
  "Unlimited users",
  "Unlimited stored contacts under fair use",
  "CRM, inbox, pipelines, calendars and forms",
  "Lead Rescue + missed-call follow-up",
  "Lead follow-through + quote chasing",
  "Appointment recovery + review engine",
  "VoIP / dialler access",
  "Website and funnel builder access",
  "Payments, invoices and contracts",
  "Standard technical support",
];

const GROWTH_FEATURES = [
  "Everything in Follow-Through",
  "Reactivation Engine",
  "Repeat / Recall Engine",
  "Bulk email, SMS and WhatsApp campaigns",
  "Advanced audience segmentation",
  "Campaign and nurture templates",
  "Social media scheduler",
  "Ad Manager tools",
  "Growth marketing AI / Copilot where enabled",
  "Higher included email allowance",
];

const compareGroups = [
  {
    title: "Operating platform",
    rows: [
      ["Unlimited users", true, true],
      ["Unlimited stored contacts", true, true],
      ["CRM + opportunities", true, true],
      ["Unified inbox", true, true],
      ["Calendars + booking", true, true],
      ["Forms + surveys", true, true],
      ["Website / funnel builder", true, true],
      ["Payments + invoicing", true, true],
      ["VoIP / phone dialler", true, true],
    ],
  },
  {
    title: "Follow-through systems",
    rows: [
      ["Lead Rescue", true, true],
      ["Lead Follow-Through", true, true],
      ["Quote Chaser", true, true],
      ["Appointment Recovery", true, true],
      ["Review Engine", true, true],
      ["Referral follow-through", true, true],
    ],
  },
  {
    title: "Proactive growth",
    rows: [
      ["Reactivation Engine", false, true],
      ["Repeat / Recall Engine", false, true],
      ["Email marketing broadcasts", false, true],
      ["Bulk SMS / WhatsApp campaigns", false, true],
      ["Advanced segmentation", false, true],
      ["Campaign templates", false, true],
      ["Social Planner", false, true],
      ["Ad Manager", false, true],
      ["Growth AI / Copilot", false, "Where enabled"],
    ],
  },
] as const;

const addOns = [
  {
    icon: Phone,
    name: "AI Receptionist",
    price: "from {voice}/mo",
    copy: "Answer, qualify, book and route calls 24/7. Includes 200 Voice AI minutes in the current draft.",
    accent: C.coral,
    bg: "#EFE2D8",
  },
  {
    icon: MessagesSquare,
    name: "Website AI Chat",
    price: "pricing under validation",
    copy: "AI chat connected to your CRM and booking layer. We are still validating the right supplier-cost model before publishing a final number.",
    accent: C.blue,
    bg: "#DFE7E5",
  },
  {
    icon: Headphones,
    name: "Priority Expert Support",
    price: "{priority}/mo",
    copy: "Priority human troubleshooting, guidance and screen-sharing when you want more hands-on help.",
    accent: C.amber,
    bg: "#EEE5D4",
  },
  {
    icon: Sparkles,
    name: "Managed Success",
    price: "from A$697/mo",
    copy: "A monthly review plus up to three effective hours of agreed optimisation and execution.",
    accent: C.plum,
    bg: "#E7E1EA",
  },
] as const;

const faqs = [
  {
    q: "What is the actual difference between Follow-Through and Growth?",
    a: "Follow-Through handles the work already happening: missed calls, enquiries, quotes, bookings, reviews and customer follow-up. Growth adds proactive demand generation across your database: reactivation, recall, nurture, segmented campaigns, social scheduling and supported advertising tools.",
  },
  {
    q: "Why don't you charge by user?",
    a: "Because Zapla is designed to become the operating layer for the whole team. Adding another staff member should not trigger another software tax just because they need access.",
  },
  {
    q: "Are contacts really unlimited?",
    a: "The current launch architecture uses unlimited stored contacts under fair use. The upgrade from Follow-Through to Growth is based on what you want to do with the database, not merely how many records you store.",
  },
  {
    q: "Can different locations use different plans?",
    a: "The standard public model uses one software tier per organisation. Additional locations inherit that tier. Truly unusual mixed-use structures can be custom-scoped rather than creating a maze of public licences.",
  },
  {
    q: "What is Guided Launch?",
    a: "It is the configured-for-you implementation layer: data import, standard phone setup, agreed pipelines, forms, calendars, Revenue Systems, QA, training and go-live. Growth also includes the first proactive reactivation programme within scope.",
  },
  {
    q: "What happens with SMS, AI and other usage?",
    a: "Usage with real carrier or supplier costs is shown separately rather than hidden inside fake credits. The current AU draft is A$0.13 + GST per outbound SMS carrier segment and A$0.90 per extra Voice AI minute after the included allowance.",
  },
];

function fmt(region: RegionKey, value: number) {
  return `${REGIONS[region].symbol}${value.toLocaleString("en-AU")}`;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = !!useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0 : 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children, tone = C.paper2 }: { children: ReactNode; tone?: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
      style={{ background: tone, borderColor: C.line, color: C.ink }}
    >
      {children}
    </span>
  );
}

function CheckItem({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <li className="flex gap-2.5 text-[14px] leading-[1.45]">
      <span
        className="mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
        style={{ background: dark ? "rgba(255,255,255,.10)" : "rgba(154,162,122,.18)", color: dark ? "#fff" : C.green }}
      >
        <Check size={11} strokeWidth={2.4} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function PricingV3() {
  const [region, setRegion] = useState<RegionKey>("AU");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const r = REGIONS[region];

  const resolvedAddOns = useMemo(
    () =>
      addOns.map((item) => ({
        ...item,
        price: item.price
          .replace("{voice}", fmt(region, r.voice))
          .replace("{priority}", fmt(region, r.priority)),
      })),
    [region, r.voice, r.priority]
  );

  return (
    <main className="min-h-screen" style={{ background: C.paper, color: C.ink, fontFamily: BODY }}>
      <div className="border-b" style={{ borderColor: C.line, background: "rgba(247,244,238,.92)" }}>
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="text-[20px] font-bold tracking-[-0.04em]" style={{ fontFamily: DISPLAY }}>zapla</a>
          <div className="hidden items-center gap-7 text-[13px] text-[#555B56] md:flex">
            <a href="#plans" className="hover:text-black">Plans</a>
            <a href="#compare" className="hover:text-black">Compare</a>
            <a href="#addons" className="hover:text-black">Add-ons</a>
            <a href="#faq" className="hover:text-black">FAQ</a>
          </div>
          <a
            href={BOOK_URL}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white"
            style={{ background: C.green }}
          >
            Book a demo <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <section className="mx-auto max-w-[1240px] px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <Pill tone="#EFE4D7">Working pricing draft · v3</Pill>
            <h1
              className="mt-7 max-w-[850px] text-[48px] font-medium leading-[.92] tracking-[-.06em] sm:text-[66px] lg:text-[82px]"
              style={{ fontFamily: DISPLAY }}
            >
              Pay for the way you <span style={{ color: C.coral }}>grow.</span>
              <br />Not for every person you hire.
            </h1>
            <p className="mt-7 max-w-[700px] text-[17px] leading-[1.62] text-[#686D69] sm:text-[19px]">
              One connected operating system. Unlimited users. Follow-Through stops current demand leaking. Growth adds the tools to create more demand from the customers and leads you already have.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:justify-self-end">
            <div className="max-w-[420px] rounded-[28px] border p-5" style={{ background: C.cream, borderColor: C.line }}>
              <div className="text-[12px] font-semibold uppercase tracking-[.16em] text-[#777C76]">View draft pricing for</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(Object.keys(REGIONS) as RegionKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRegion(key)}
                    className="rounded-xl border px-3 py-3 text-[13px] font-semibold transition"
                    style={{
                      borderColor: region === key ? C.green : C.line,
                      background: region === key ? C.green : C.paper,
                      color: region === key ? "white" : C.ink,
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[12px] leading-[1.5] text-[#777C76]">
                Numbers are still under review. This page is for visualising the commercial architecture, not locking the final price book.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="plans" className="border-y" style={{ borderColor: C.line, background: C.paper2 }}>
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[.18em]" style={{ color: C.coral }}>Choose the commercial job</div>
              <h2 className="mt-3 text-[36px] font-medium tracking-[-.05em] sm:text-[48px]" style={{ fontFamily: DISPLAY }}>Two public plans. One clean boundary.</h2>
            </div>
            <div className="text-[13px] text-[#727772]">{r.label} · draft prices shown {r.tax || "before payment-provider fees"}</div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_.72fr]">
            <Reveal>
              <article className="flex h-full flex-col rounded-[28px] border p-6 sm:p-8" style={{ background: C.cream, borderColor: C.line }}>
                <div className="flex items-center justify-between gap-4">
                  <Pill>FOLLOW-THROUGH</Pill>
                  <Workflow size={20} color={C.blue} />
                </div>
                <h3 className="mt-8 text-[34px] font-medium tracking-[-.05em]" style={{ fontFamily: DISPLAY }}>Stop current demand leaking.</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#6A706B]">For service businesses that want every call, enquiry, quote, booking and customer followed through without paying per seat.</p>
                <div className="mt-8 flex items-end gap-2">
                  <span className="text-[48px] font-medium tracking-[-.055em]" style={{ fontFamily: DISPLAY }}>{fmt(region, r.follow)}</span>
                  <span className="pb-2 text-[13px] text-[#777C76]">/ month {r.tax}</span>
                </div>
                <div className="mt-2 text-[13px] text-[#777C76]">Guided Launch from {fmt(region, r.followLaunch)} {r.tax}</div>
                <ul className="mt-8 space-y-3">
                  {FOLLOW_FEATURES.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
                <a href={BOOK_URL} className="mt-9 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-[13px] font-semibold" style={{ borderColor: C.green, color: C.green }}>
                  Get a Lead Leakage Audit <ArrowRight size={14} />
                </a>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 text-white sm:p-8" style={{ background: C.green }}>
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full" style={{ background: "rgba(214,122,96,.24)" }} />
                <div className="relative flex items-center justify-between gap-4">
                  <Pill tone="rgba(255,255,255,.09)">GROWTH</Pill>
                  <Megaphone size={20} color="#E6B36A" />
                </div>
                <h3 className="relative mt-8 text-[34px] font-medium tracking-[-.05em]" style={{ fontFamily: DISPLAY }}>Turn the database into demand.</h3>
                <p className="relative mt-3 text-[14px] leading-[1.6] text-white/65">For businesses ready to proactively reactivate, nurture, recall and market to the customer base they already own.</p>
                <div className="relative mt-8 flex items-end gap-2">
                  <span className="text-[48px] font-medium tracking-[-.055em]" style={{ fontFamily: DISPLAY }}>{fmt(region, r.growth)}</span>
                  <span className="pb-2 text-[13px] text-white/60">/ month {r.tax}</span>
                </div>
                <div className="relative mt-2 text-[13px] text-white/60">Guided Launch from {fmt(region, r.growthLaunch)} {r.tax}</div>
                <ul className="relative mt-8 space-y-3">
                  {GROWTH_FEATURES.map((item) => <CheckItem key={item} dark>{item}</CheckItem>)}
                </ul>
                <a href={BOOK_URL} className="relative mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold" style={{ color: C.green }}>
                  See how much revenue is sitting in your database <ArrowRight size={14} />
                </a>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="flex h-full flex-col rounded-[28px] border p-6 sm:p-7" style={{ background: "#EAE3DA", borderColor: C.line }}>
                <div className="flex items-center justify-between gap-3">
                  <Pill tone="#E4DBCF">ENTERPRISE</Pill>
                  <MapPin size={20} color={C.plum} />
                </div>
                <h3 className="mt-8 text-[30px] font-medium tracking-[-.05em]" style={{ fontFamily: DISPLAY }}>When the standard model stops being sensible.</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#6A706B]">Multi-entity operations, custom integrations, advanced governance or unusual rollout requirements.</p>
                <div className="mt-8 text-[42px] font-medium tracking-[-.05em]" style={{ fontFamily: DISPLAY }}>Custom</div>
                <ul className="mt-8 space-y-3">
                  {["Multi-brand / multi-entity", "Custom migrations", "Advanced integrations", "Bespoke rollout scope", "Custom support structure"].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
                <a href={BOOK_URL} className="mt-auto pt-9 text-[13px] font-semibold underline underline-offset-4">Talk to Zapla</a>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Users, kicker: "No seat tax", title: "Bring the whole team.", copy: "Unlimited users are part of the operating model, not a premium-tier privilege.", tone: "#EFE2D8" },
            { icon: Workflow, kicker: "No database tax", title: "Store the customer history.", copy: "Contacts stay unlimited under fair use. Growth is about what you do with the database.", tone: "#E3E8DF" },
            { icon: Megaphone, kicker: "A real upgrade path", title: "Upgrade when you create demand.", copy: "Follow-Through handles live demand. Growth adds proactive campaigns, reactivation and lifecycle marketing.", tone: "#E6E0E9" },
          ].map(({ icon: Icon, kicker, title, copy, tone }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <div className="rounded-[24px] border p-6" style={{ background: tone, borderColor: C.line }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#747A74]">{kicker}</span>
                  <Icon size={18} color={C.green} />
                </div>
                <h3 className="mt-8 text-[26px] font-medium tracking-[-.045em]" style={{ fontFamily: DISPLAY }}>{title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#666D67]">{copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="compare" className="border-y" style={{ borderColor: C.line, background: C.dark, color: "white" }}>
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-[760px]">
            <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#D9A267]">Compare the architecture</div>
            <h2 className="mt-4 text-[38px] font-medium tracking-[-.055em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>The upgrade is a change in behaviour, not a random feature tax.</h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-white/10">
            <div className="grid grid-cols-[1.6fr_.7fr_.7fr] bg-white/[.06] px-4 py-4 text-[11px] font-semibold uppercase tracking-[.15em] text-white/60 sm:px-6">
              <div>Capability</div><div>Follow</div><div>Growth</div>
            </div>
            {compareGroups.map((group) => (
              <div key={group.title}>
                <div className="border-t border-white/10 bg-white/[.035] px-4 py-3 text-[12px] font-semibold text-white/70 sm:px-6">{group.title}</div>
                {group.rows.map(([label, follow, growth]) => (
                  <div key={label} className="grid grid-cols-[1.6fr_.7fr_.7fr] border-t border-white/10 px-4 py-3 text-[13px] sm:px-6">
                    <div className="pr-4 text-white/82">{label}</div>
                    <div>{follow === true ? <Check size={15} color="#C5CC9B" /> : <span className="text-white/30">—</span>}</div>
                    <div>{growth === true ? <Check size={15} color="#E9B46C" /> : typeof growth === "string" ? <span className="text-[11px] text-white/65">{growth}</span> : <span className="text-white/30">—</span>}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="addons" className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[.18em]" style={{ color: C.coral }}>Add only what earns its keep</div>
            <h2 className="mt-4 text-[38px] font-medium tracking-[-.055em] sm:text-[52px]" style={{ fontFamily: DISPLAY }}>AI and human help sit beside the plans.</h2>
            <p className="mt-5 max-w-[500px] text-[15px] leading-[1.65] text-[#6A706B]">You do not need to buy Growth simply because you want your phone answered. AI, premium human support and managed execution are separate commercial axes.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {resolvedAddOns.map(({ icon: Icon, name, price, copy, accent, bg }) => (
              <div key={name} className="rounded-[24px] border p-6" style={{ background: bg, borderColor: C.line }}>
                <div className="flex items-center justify-between gap-3">
                  <Icon size={20} color={accent} />
                  <span className="text-[11px] font-semibold uppercase tracking-[.13em] text-[#747A74]">Optional</span>
                </div>
                <h3 className="mt-8 text-[25px] font-medium tracking-[-.045em]" style={{ fontFamily: DISPLAY }}>{name}</h3>
                <div className="mt-2 text-[14px] font-semibold">{price}</div>
                <p className="mt-3 text-[13px] leading-[1.6] text-[#686F69]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: C.line, background: "#EDE7DF" }}>
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <Pill tone="#E3D9CC">GHOST TO GOLD</Pill>
              <h2 className="mt-5 text-[40px] font-medium tracking-[-.055em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>A campaign can be the front door, not another forever-plan.</h2>
              <p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-[#686F69]">Reactivate the database you already paid to acquire. One staged campaign, paced around sender health and response behaviour rather than an artificial 30-day promise.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border bg-[#FFFDF9] p-6" style={{ borderColor: C.line }}>
                  <div className="text-[11px] font-semibold uppercase tracking-[.15em] text-[#777C76]">Sprint · up to 2,500</div>
                  <div className="mt-5 text-[36px] font-medium tracking-[-.05em]" style={{ fontFamily: DISPLAY }}>A$997</div>
                  <p className="mt-3 text-[13px] leading-[1.55] text-[#686F69]">Staged reactivation campaign. Typical target 3–8 weeks, standard maximum deployment window 90 days.</p>
                </div>
                <div className="rounded-[22px] border p-6 text-white" style={{ borderColor: C.green, background: C.green }}>
                  <div className="text-[11px] font-semibold uppercase tracking-[.15em] text-white/60">Managed · up to 2,500</div>
                  <div className="mt-5 text-[36px] font-medium tracking-[-.05em]" style={{ fontFamily: DISPLAY }}>A$1,497</div>
                  <p className="mt-3 text-[13px] leading-[1.55] text-white/65">Sprint plus AI-assisted qualification, booking, monitoring and bounded human oversight.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[.18em]" style={{ color: C.blue }}>Usage, without mystery credits</div>
            <h2 className="mt-4 text-[38px] font-medium tracking-[-.055em] sm:text-[50px]" style={{ fontFamily: DISPLAY }}>Real supplier cost stays visible.</h2>
          </div>
          <div className="overflow-hidden rounded-[24px] border" style={{ borderColor: C.line, background: C.cream }}>
            {[
              ["Outbound SMS", region === "AU" ? "A$0.13 + GST / carrier segment" : "Local rate shown before launch"],
              ["Inbound SMS", region === "AU" ? "A$0.02 + GST / carrier segment" : "Local rate shown before launch"],
              ["Voice AI", `200 minutes included in the current AI Receptionist draft`],
              ["Voice AI overage", r.voiceOverage],
              ["Email", "Included allowance by plan, then transparent overage"],
              ["WhatsApp", "Activation + Meta / provider messaging where applicable"],
            ].map(([label, value], index) => (
              <div key={label} className={`grid gap-2 px-5 py-4 sm:grid-cols-[.6fr_1.4fr] sm:px-6 ${index ? "border-t" : ""}`} style={{ borderColor: C.line }}>
                <div className="text-[13px] font-semibold">{label}</div>
                <div className="text-[13px] text-[#687069]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: C.line, background: C.green, color: "white" }}>
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-24">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#E3B36E]">Guided Launch</div>
            <h2 className="mt-4 text-[40px] font-medium tracking-[-.055em] sm:text-[54px]" style={{ fontFamily: DISPLAY }}>Access can be broad. Our labour cannot be infinite.</h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.65] text-white/64">The software stays flexible. What Zapla configures for you during launch is deliberately scoped so the service remains sustainable.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Follow-Through launch", ["Up to 2 configured pipelines", "Up to 3 forms / surveys", "1 lead-capture widget", "Up to 2 calendars", "Revenue Systems + QA", "1 training session"]],
              ["Growth launch", ["Up to 3 configured pipelines", "Up to 3 forms / surveys", "1 lead-capture widget", "Up to 2 calendars", "First reactivation programme", "Revenue Systems + QA"]],
            ].map(([title, items]) => (
              <div key={title as string} className="rounded-[22px] border border-white/10 bg-white/[.06] p-6">
                <h3 className="text-[22px] font-medium tracking-[-.04em]" style={{ fontFamily: DISPLAY }}>{title as string}</h3>
                <ul className="mt-5 space-y-3">
                  {(items as string[]).map((item) => <CheckItem key={item} dark>{item}</CheckItem>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[980px] px-5 py-16 sm:px-8 lg:py-24">
        <div className="text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[.18em]" style={{ color: C.coral }}>FAQ</div>
          <h2 className="mt-4 text-[40px] font-medium tracking-[-.055em] sm:text-[52px]" style={{ fontFamily: DISPLAY }}>The stuff buyers will actually ask.</h2>
        </div>
        <div className="mt-10 border-t" style={{ borderColor: C.line }}>
          {faqs.map((item, index) => {
            const open = openFaq === index;
            return (
              <div key={item.q} className="border-b" style={{ borderColor: C.line }}>
                <button type="button" onClick={() => setOpenFaq(open ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="text-[16px] font-semibold tracking-[-.015em]">{item.q}</span>
                  <ChevronDown size={18} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open ? <p className="max-w-[820px] pb-6 text-[14px] leading-[1.7] text-[#687069]">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[30px] p-7 text-white sm:p-10 lg:p-14" style={{ background: C.dark }}>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <Pill tone="rgba(255,255,255,.07)">Still a working draft</Pill>
              <h2 className="mt-5 max-w-[760px] text-[42px] font-medium leading-[.98] tracking-[-.055em] sm:text-[58px]" style={{ fontFamily: DISPLAY }}>The architecture should survive before the last dollar does.</h2>
              <p className="mt-5 max-w-[680px] text-[14px] leading-[1.65] text-white/60">This version exists to test the hierarchy, upgrade logic, add-ons, usage presentation and overall buying experience before final pricing is locked.</p>
            </div>
            <a href={BOOK_URL} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold" style={{ color: C.dark }}>
              Book a demo <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
