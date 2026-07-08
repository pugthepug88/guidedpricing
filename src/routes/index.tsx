import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import customerTrades from "@/assets/customer-trades.jpg";
import customerSalon from "@/assets/customer-salon.jpg";
import customerAuto from "@/assets/customer-auto.jpg";

export const Route = createFileRoute("/")({
  component: PricingPage,
});

const BOOK_URL = "https://zapla.io/getstartedtrial";

/* ---------- Reusable primitives ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zapla-line bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#28405f]">
      <span className="h-1.5 w-1.5 rounded-full bg-zapla-green shadow-[0_0_0_5px_rgba(24,197,167,0.14)]" />
      {children}
    </span>
  );
}

function PrimaryButton({
  href,
  children,
  track,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  track?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      data-track={track}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-zapla-blue px-6 py-3.5 text-[15px] font-extrabold text-white shadow-[0_12px_28px_rgba(23,105,255,0.28)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-zapla-blue2 ${className}`}
    >
      {children}
    </a>
  );
}

function SecondaryButton({
  href,
  children,
  track,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  track?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      data-track={track}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-zapla-line bg-white px-6 py-3.5 text-[15px] font-extrabold text-zapla-ink transition-all duration-150 hover:-translate-y-0.5 hover:border-[#b9c8db] ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mx-auto mb-8 max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(28px,3.4vw,42px)] font-black leading-[1.08] tracking-[-0.045em] text-zapla-ink">
        {title}
      </h2>
      {sub && <p className="mt-3 text-[16.5px] leading-[1.55] text-zapla-muted">{sub}</p>}
    </div>
  );
}

/* ---------- Page ---------- */

function PricingPage() {
  return (
    <div className="min-h-screen bg-zapla-bg font-zapla text-zapla-ink antialiased">
      <Nav />
      <Hero />
      <GuidedStrip />
      <Pricing />
      <Calculator />
      <LaunchPack />
      <Customers />
      <Pillars />
      <Addons />
      <ValueGrid />
      <Faq />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------- Nav ---------- */

function Nav() {
  return (
    <nav className="sticky top-0 z-30 border-b border-zapla-line/80 bg-zapla-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-gradient-to-br from-zapla-blue to-zapla-green text-[15px] font-black text-white">
            Z
          </div>
          <span className="text-[18px] font-black tracking-[-0.04em]">Zapla</span>
        </a>
        <div className="flex items-center gap-5 text-[14px] font-bold text-[#314057]">
          <a className="hidden hover:text-zapla-blue sm:inline" href="#pricing">
            Pricing
          </a>
          <a className="hidden hover:text-zapla-blue sm:inline" href="#launch">
            Launch Pack
          </a>
          <a className="hidden hover:text-zapla-blue md:inline" href="#addons">
            Add-ons
          </a>
          <a className="hidden hover:text-zapla-blue md:inline" href="#faq">
            FAQ
          </a>
          <a
            href={BOOK_URL}
            data-track="nav_cta"
            className="inline-flex items-center justify-center rounded-full bg-zapla-blue px-4 py-2 text-[13px] font-extrabold text-white shadow-[0_10px_22px_rgba(23,105,255,0.28)] transition hover:-translate-y-0.5 hover:bg-zapla-blue2"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16"
      style={{
        background:
          "radial-gradient(circle at 88% -5%, rgba(24,197,167,0.22), transparent 38%), radial-gradient(circle at 8% 5%, rgba(23,105,255,0.17), transparent 42%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(23,35,57,0.05)_1px,transparent_1px)] [background-size:22px_22px] opacity-40" />

      <div className="relative mx-auto grid max-w-[1120px] items-center gap-10 px-5 sm:px-6 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
        <div className="zapla-rise">
          <Eyebrow>Guided Launch Pricing</Eyebrow>
          <h1 className="mt-4 max-w-[820px] text-[clamp(40px,5.6vw,68px)] font-black leading-[0.96] tracking-[-0.045em]">
            Run your whole business from one{" "}
            <span className="bg-gradient-to-r from-zapla-blue to-zapla-green bg-clip-text text-transparent">
              AI operating system
            </span>
            .
          </h1>
          <p className="mt-5 max-w-[640px] text-[18px] leading-[1.55] text-[#34435b]">
            Zapla brings CRM, bookings, inbox, reviews, payments, mobile POS, documents, websites
            and AI follow-up into one flat-price platform — launched with you, with unlimited users
            and no per-seat pricing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <PrimaryButton href={BOOK_URL} track="hero_cta">
              Book a Call →
            </PrimaryButton>
            <SecondaryButton href="#pricing" track="hero_pricing">
              See pricing
            </SecondaryButton>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Unlimited users", "No per-seat pricing", "Launched with you", "90-day rollout runway"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-zapla-line bg-white px-3 py-2 text-[12.5px] font-extrabold text-[#354861] shadow-[0_8px_18px_rgba(20,34,58,0.04)]"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        <HeroMock />
      </div>
    </header>
  );
}

function HeroMock() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-zapla-blue/20 via-transparent to-zapla-green/25 blur-2xl" />
      <div className="relative rounded-[28px] border border-white/10 bg-zapla-ink p-5 text-white shadow-[0_30px_80px_rgba(7,20,38,0.35)] sm:p-6">
        <div className="mb-5 flex items-center justify-between text-[12.5px] font-black text-[#dbe7ff]">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-zapla-green zapla-pulse-dot" />
            Zapla operating system
          </span>
          <span className="rounded-full bg-[#dcfff6] px-2.5 py-1 text-[11px] text-[#062f28]">
            Live system
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { k: "Customers", v: "1,248", s: "records & history" },
            { k: "Bookings", v: "36", s: "scheduled this week" },
            { k: "Payments", v: "A$18k", s: "tracked this month" },
            { k: "AI follow-up", v: "24", s: "conversations handled" },
          ].map((t) => (
            <div
              key={t.k}
              className="rounded-2xl border border-white/10 bg-[#17263b] p-4"
            >
              <small className="block text-[10.5px] font-black uppercase tracking-[0.08em] text-[#9fb4d4]">
                {t.k}
              </small>
              <b className="mt-1 block text-[24px] tracking-[-0.03em]">{t.v}</b>
              <span className="text-[12px] text-[#c6d2e3]">{t.s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1.5 rounded-2xl bg-[#152336] p-2.5">
          {["Capture", "Manage", "Get paid", "Grow"].map((s, i, arr) => (
            <>
              <div
                key={s}
                className="flex-1 rounded-xl border border-white/10 bg-[#23354d] py-2.5 text-center text-[11.5px] font-black text-[#c9fbf2]"
              >
                {s}
              </div>
              {i < arr.length - 1 && (
                <span key={s + "arrow"} className="px-0.5 text-[#4a6b8e]">
                  →
                </span>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Guided Strip ---------- */

function GuidedStrip() {
  return (
    <section className="pt-6 pb-3">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <div className="grid gap-3 rounded-[22px] border border-zapla-line bg-white p-4 shadow-zapla-sm md:grid-cols-[1.2fr_0.7fr_0.7fr_0.7fr]">
          <div className="p-3">
            <h3 className="text-[19px] font-black tracking-[-0.03em]">
              For businesses that want Zapla launched properly
            </h3>
            <p className="mt-1 text-[14.5px] text-zapla-muted">
              Zapla can be explored self-guided, but this page is for Guided Launch customers.
            </p>
          </div>
          {[
            { b: "Mapped", s: "Your workflow, team and customer journey." },
            { b: "Configured", s: "Pipelines, inbox, bookings, reviews and follow-up." },
            { b: "Rolled out", s: "Training and check-ins so the system gets used." },
          ].map((i) => (
            <div
              key={i.b}
              className="rounded-2xl border border-zapla-line bg-zapla-paper2 p-3.5"
            >
              <b className="block text-[14px]">{i.b}</b>
              <span className="mt-1 block text-[13px] text-zapla-muted">{i.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

const PLANS = [
  {
    name: "Core",
    fit: "For solo operators and small teams that need the essential operating system launched.",
    price: "A$299",
    launch: "A$995",
    features: [
      "Unlimited users",
      "2,500 contacts",
      "CRM, inbox and bookings",
      "Reviews, payments and mobile POS where configured",
      "Missed-call textback",
      "250 SMS segments/month",
    ],
    track: "core_cta",
    recommended: false,
    priceLabel: "/mo +GST",
  },
  {
    name: "Growth",
    fit: "For most businesses that want quote follow-up, reactivation and growth workflows.",
    price: "A$499",
    launch: "A$1,995",
    features: [
      "Everything in Core",
      "10,000 contacts",
      "Quote follow-up workflow",
      "Ghost-to-Gold standard workflow",
      "AI chat where relevant",
      "Funnels, pages and extra capture points",
      "500 SMS segments/month",
    ],
    track: "growth_cta",
    recommended: true,
    priceLabel: "/mo +GST",
  },
  {
    name: "Scale",
    fit: "For larger teams, higher volume or multi-location businesses that need routing and reporting.",
    price: "A$899",
    launch: "A$3,500",
    features: [
      "Everything in Growth",
      "25,000 contacts",
      "2 locations included",
      "Team routing and staff access controls",
      "Advanced reporting dashboard",
      "Scheduled rollout check-ins",
      "1,000 SMS segments/month",
    ],
    track: "scale_cta",
    recommended: false,
    priceLabel: "/mo +GST",
  },
  {
    name: "Scale+",
    fit: "For businesses beyond standard Scale: 3+ locations, franchises, multi-brand groups or complex integrations.",
    price: "Custom",
    launch: "Custom",
    features: [
      "Franchise or multi-brand setup",
      "Complex integrations",
      "High-volume contacts, SMS, email or AI",
      "Custom migration and reporting",
      "Rollout model agreed before build",
    ],
    track: "scaleplus_cta",
    recommended: false,
    priceLabel: " quote",
  },
] as const;

function Pricing() {
  const [openCompare, setOpenCompare] = useState(false);
  return (
    <section
      id="pricing"
      className="border-y border-zapla-line bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <SectionHead
          eyebrow="Plans"
          title="Choose the launch path that fits your business"
          sub="Every plan includes unlimited users. The Launch Pack gets Zapla configured around how your business actually runs."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col rounded-[22px] border bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-zapla ${
                p.recommended
                  ? "border-zapla-blue/60 shadow-zapla-lift md:-translate-y-1"
                  : "border-zapla-line shadow-[0_10px_28px_rgba(23,35,57,0.045)]"
              }`}
            >
              {p.recommended && (
                <div className="absolute right-4 top-4 rounded-full bg-zapla-blue px-2.5 py-1 text-[10.5px] font-black uppercase tracking-[0.06em] text-white">
                  Recommended
                </div>
              )}
              <h3 className="text-[22px] font-black tracking-[-0.03em]">{p.name}</h3>
              <p className="mt-2 min-h-[80px] text-[14px] text-zapla-muted lg:min-h-[96px]">
                {p.fit}
              </p>
              <div className="mt-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-[38px] font-black tracking-[-0.06em]">{p.price}</span>
                  <span className="text-[13px] font-bold text-zapla-muted">{p.priceLabel}</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-zapla-faint px-2.5 py-1 text-[12.5px] font-bold text-[#2f4056]">
                  <span className="text-zapla-blue">+</span>
                  <b>{p.launch}</b>
                  <span className="text-zapla-muted">Launch Pack</span>
                </div>
              </div>
              <ul className="mt-5 grid gap-2.5">
                {p.features.map((f, i) => {
                  const isStack = i === 0 && f.startsWith("Everything");
                  return (
                    <li
                      key={f}
                      className={`relative pl-6 text-[13.5px] ${
                        isStack ? "font-extrabold text-zapla-ink" : "text-[#33435b]"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 font-black ${
                          isStack ? "text-zapla-blue" : "text-zapla-green"
                        }`}
                      >
                        {isStack ? "»" : "✓"}
                      </span>
                      {f}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex-1" />
              {p.recommended ? (
                <PrimaryButton href={BOOK_URL} track={p.track} className="w-full">
                  Book a Call
                </PrimaryButton>
              ) : (
                <SecondaryButton href={BOOK_URL} track={p.track} className="w-full">
                  Book a Call
                </SecondaryButton>
              )}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-[760px] text-center text-[12.5px] text-zapla-muted">
          Prices are in AUD and exclude GST. SMS, AI voice, WhatsApp, domains, payment gateway/card
          fees, ad spend, third-party tools, complex migrations and custom build work may be
          separate. No lock-in after launch. Thirty days notice.
        </p>

        <div className="mx-auto mt-6 max-w-[1000px]">
          <button
            onClick={() => setOpenCompare((v) => !v)}
            className="mx-auto flex items-center gap-2.5 rounded-full border border-zapla-line bg-white px-5 py-3 text-[14px] font-black text-[#10253f] shadow-[0_8px_20px_rgba(20,34,58,0.05)] transition hover:-translate-y-0.5 hover:border-[#b9c8db]"
          >
            {openCompare ? "Hide full comparison" : "Compare all features"}
            <span
              className={`text-zapla-blue transition-transform ${
                openCompare ? "rotate-180" : ""
              }`}
            >
              ⌄
            </span>
          </button>
          {openCompare && <CompareTable />}
        </div>
      </div>
    </section>
  );
}

function CompareTable() {
  const rows: [string, string, string, string, string][] = [
    ["Monthly price", "A$299", "A$499", "A$899", "Custom quote"],
    ["Launch Pack", "A$995", "A$1,995", "A$3,500", "Custom"],
    ["Users", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    ["Contacts", "2,500", "10,000", "25,000", "Custom"],
    ["Locations", "1", "1", "2 included", "3+ or complex"],
    ["SMS included", "250 seg/mo", "500 seg/mo", "1,000 seg/mo", "Custom"],
    ["AI chat", "—", "Where relevant", "Where relevant", "Custom"],
    ["AI Receptionist", "—", "Add-on", "Add-on", "Custom"],
    [
      "Rollout support",
      "Training session",
      "Training + check-ins",
      "Training + extended check-ins",
      "Custom",
    ],
  ];
  return (
    <div className="mt-4 overflow-auto rounded-[18px] border border-zapla-line bg-white shadow-zapla-sm">
      <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
        <thead>
          <tr>
            {["Item", "Core", "Growth", "Scale", "Scale+"].map((h) => (
              <th
                key={h}
                className="border-b border-zapla-line bg-[#f8fbff] px-4 py-3 text-left text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-[#41516a]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={`border-b border-zapla-line px-4 py-3 last:border-b-0 ${
                    j === 0 ? "font-extrabold text-[#14253c]" : "text-[#33435b]"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Calculator ---------- */

function Calculator() {
  const [calls, setCalls] = useState(10);
  const [jobval, setJobval] = useState(450);
  const [closerate, setCloserate] = useState(30);
  const fmt = (n: number) => "A$" + Math.round(n).toLocaleString("en-AU");
  const { leak, recover, payback } = useMemo(() => {
    const leak = calls * 4.33 * jobval * (closerate / 100);
    const recover = leak * 0.2;
    const payback = recover > 0 ? Math.max(1, Math.round((499 / recover) * 4.33)) : 0;
    return { leak, recover, payback };
  }, [calls, jobval, closerate]);
  return (
    <section id="calculator" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <SectionHead
          eyebrow="Opportunity"
          title="Estimate what better follow-up could recover"
          sub="Use your own numbers. Missed calls, slow replies, forgotten quotes, stale enquiries and old customers are often the easiest opportunities to win back."
        />
        <div className="grid gap-6 rounded-[26px] border border-zapla-line bg-white p-6 shadow-zapla md:grid-cols-[1fr_0.9fr] md:p-7">
          <div className="grid gap-6">
            <SliderRow
              label="Opportunities not followed up properly each week"
              value={String(calls)}
              min={0}
              max={40}
              current={calls}
              onChange={setCalls}
              help="Missed calls, slow replies, forgotten quotes, stale enquiries or old customers."
            />
            <div>
              <label className="mb-2 flex justify-between gap-3 text-[14px] font-extrabold text-zapla-ink2">
                Average job or customer value (A$)
              </label>
              <input
                type="number"
                value={jobval}
                min={0}
                step={10}
                onChange={(e) => setJobval(Number(e.target.value) || 0)}
                className="w-full rounded-2xl border border-zapla-line px-4 py-3 text-[16px] font-extrabold outline-none focus:border-zapla-blue"
              />
            </div>
            <SliderRow
              label="Estimated win rate if followed up properly"
              value={closerate + "%"}
              min={5}
              max={80}
              current={closerate}
              onChange={setCloserate}
            />
          </div>
          <div className="flex flex-col justify-center rounded-[22px] bg-zapla-ink p-6 text-white">
            <div className="text-[12.5px] font-black uppercase tracking-[0.08em] text-[#a9bdd8]">
              Estimated recoverable opportunity per month
            </div>
            <div className="my-2 text-[clamp(38px,5vw,56px)] font-black leading-none tracking-[-0.06em]">
              {fmt(leak)}
            </div>
            <p className="mb-5 text-[14.5px] text-[#d6e3f5]">
              Recovering even 20% would be worth <b className="text-white">{fmt(recover)}</b> a
              month. Zapla Growth is <b className="text-white">A$499</b>
              {payback > 0 && recover > 499 ? (
                <>
                  {" "}
                  — payback in ~<b className="text-zapla-green">{payback} weeks</b>.
                </>
              ) : (
                "."
              )}
            </p>
            <PrimaryButton href={BOOK_URL} track="calc_cta" className="w-full">
              Book a Call →
            </PrimaryButton>
          </div>
          <p className="text-center text-[12.5px] text-zapla-muted md:col-span-2">
            Illustrative only, not a promise of results. The Guided Launch call maps your actual
            business before any recommendation.
          </p>
        </div>
      </div>
    </section>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  current,
  onChange,
  help,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  current: number;
  onChange: (n: number) => void;
  help?: string;
}) {
  return (
    <div>
      <label className="mb-2 flex justify-between gap-3 text-[14px] font-extrabold text-zapla-ink2">
        {label} <output className="text-zapla-blue">{value}</output>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zapla-blue"
      />
      {help && <small className="mt-1 block text-[12.5px] text-zapla-muted">{help}</small>}
    </div>
  );
}

/* ---------- Launch Pack ---------- */

function LaunchPack() {
  return (
    <section id="launch" className="border-y border-zapla-line bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <div className="rounded-[24px] border border-zapla-line bg-gradient-to-b from-white to-zapla-paper2 p-6 shadow-zapla-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-zapla-line pb-5 sm:flex-row sm:items-start">
            <div>
              <Eyebrow>Guided Launch</Eyebrow>
              <h2 className="mt-3 text-[clamp(26px,3vw,38px)] font-black leading-[1.08] tracking-[-0.045em]">
                What your Launch Pack sets up
              </h2>
            </div>
            <p className="max-w-[420px] text-[14.5px] text-zapla-muted">
              The Launch Pack is not a setup admin fee. It is the first build of your operating
              system, scoped by plan.
            </p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: 1,
                b: "Capture enquiries",
                s: "Forms, missed calls, inbox, chat and social connected.",
              },
              {
                n: 2,
                b: "Move work forward",
                s: "Pipelines, quote follow-up, reminders and bookings configured.",
              },
              {
                n: 3,
                b: "Get paid and reviewed",
                s: "Payments, invoices, mobile POS and reviews set up.",
              },
              {
                n: 4,
                b: "Reactivate opportunities",
                s: "Old leads, past customers and cold quotes prepared for follow-up.",
              },
            ].map((j) => (
              <div
                key={j.n}
                className="relative rounded-2xl border border-zapla-line bg-white p-4"
              >
                <div className="mb-3 grid h-7 w-7 place-items-center rounded-[9px] bg-zapla-faint text-[12px] font-black text-zapla-blue">
                  {j.n}
                </div>
                <b className="block text-[14px]">{j.b}</b>
                <span className="mt-1 block text-[12.8px] leading-[1.5] text-zapla-muted">
                  {j.s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { h: "Core Launch Pack", p: "Essential setup for a solo operator or small team." },
            {
              h: "Growth Launch Pack",
              p: "Follow-up, reactivation and growth setup for most businesses.",
            },
            {
              h: "Scale Launch Pack",
              p: "Multi-location, team routing, reporting and larger rollout setup.",
            },
            {
              h: "Scale+ Launch Pack",
              p: "Custom rollout for complex, high-volume or multi-location operations.",
            },
          ].map((c) => (
            <div
              key={c.h}
              className="rounded-2xl border border-zapla-line bg-white p-4 shadow-[0_8px_20px_rgba(20,34,58,0.035)]"
            >
              <h3 className="text-[16px] font-black tracking-[-0.02em]">{c.h}</h3>
              <p className="mt-2 text-[13.5px] text-zapla-muted">{c.p}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          <ScopeDetail
            title="View Core Launch Pack scope"
            items={[
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
            ]}
          />
          <ScopeDetail
            title="View Growth Launch Pack scope"
            items={[
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
            ]}
          />
          <ScopeDetail
            title="View Scale Launch Pack scope"
            items={[
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
            ]}
          />
          <ScopeDetail
            title="View Scale+ Launch Pack scope"
            items={[
              "3+ locations, or 2 locations with heavier usage or complexity",
              "Franchise, multi-brand or multi-team rollout",
              "Complex integrations, routing or custom reporting",
              "High-volume contacts, SMS, email, payments or AI needs",
              "Custom migration, training and implementation plan agreed before build starts",
            ]}
          />
        </div>

        <p className="mt-4 rounded-2xl border border-zapla-line bg-[#f8fbff] p-4 text-[13.5px] text-[#46556d]">
          <b>Website capture point:</b> a landing page, enquiry form, booking calendar, quote
          request, webchat or similar entry point connected to Zapla. Extra work is quoted before
          it starts.
        </p>
      </div>
    </section>
  );
}

function ScopeDetail({ title, items }: { title: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-zapla-line bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-[14.5px] font-extrabold"
      >
        {title}
        <span className="text-[20px] font-bold text-zapla-blue">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-[14px] text-[#34435b]">
          <ul className="grid list-disc gap-2 pl-5">
            {items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Customers (NEW) ---------- */

const CUSTOMERS = [
  {
    tag: "Trades",
    metric: "38%",
    label: "more quotes converted",
    quote:
      "We replaced three tools and finally chase every quote automatically. Nothing slips anymore.",
    person: "Operations lead, electrical contractor",
    img: customerTrades,
    accent: "from-zapla-blue/25 to-transparent",
  },
  {
    tag: "Beauty & wellness",
    metric: "A$12k",
    label: "recovered in month one",
    quote:
      "The reactivation workflow brought back clients we'd written off. It paid for itself in weeks.",
    person: "Owner, hair & beauty studio",
    img: customerSalon,
    accent: "from-zapla-green/25 to-transparent",
  },
  {
    tag: "Automotive",
    metric: "5×",
    label: "faster enquiry response",
    quote:
      "Missed-call textback and the AI follow-up mean nobody waits. Bookings hold, reviews go up.",
    person: "Manager, auto service centre",
    img: customerAuto,
    accent: "from-zapla-amber/30 to-transparent",
  },
] as const;

function Customers() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-cust-card]");
    const target = cards[i];
    if (target) {
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
      setActive(i);
    }
  };

  return (
    <section id="customers" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Customers</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.4vw,42px)] font-black leading-[1.08] tracking-[-0.045em]">
              Our customers achieve more
            </h2>
            <p className="mt-2 max-w-[520px] text-[15.5px] text-zapla-muted">
              What businesses recover once Zapla is launched properly around how they actually
              operate.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTo(Math.max(0, active - 1))}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-zapla-line bg-white text-zapla-ink transition hover:-translate-y-0.5 hover:border-[#b9c8db]"
            >
              ←
            </button>
            <button
              onClick={() => scrollTo(Math.min(CUSTOMERS.length - 1, active + 1))}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-zapla-line bg-white text-zapla-ink transition hover:-translate-y-0.5 hover:border-[#b9c8db]"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="zapla-scroll-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
        >
          {CUSTOMERS.map((c, i) => (
            <article
              key={c.tag}
              data-cust-card
              className="snap-start shrink-0 basis-[86%] overflow-hidden rounded-[24px] border border-zapla-line bg-white shadow-[0_10px_30px_rgba(20,34,58,0.06)] transition hover:-translate-y-0.5 hover:shadow-zapla sm:basis-[70%] lg:basis-[calc((100%-2rem)/3)]"
            >
              <div className="grid grid-rows-[auto_auto] gap-0 lg:grid-cols-1">
                <div className="relative aspect-[16/10] overflow-hidden bg-zapla-faint">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${c.accent} mix-blend-multiply`}
                  />
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11.5px] font-extrabold uppercase tracking-[0.06em] text-zapla-ink shadow-sm">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div>
                    <div className="text-[44px] font-black leading-none tracking-[-0.06em] text-zapla-ink">
                      {c.metric}
                    </div>
                    <div className="mt-1 text-[13.5px] font-bold text-zapla-muted">{c.label}</div>
                  </div>
                  <blockquote className="text-[15px] leading-[1.5] text-[#26364f]">
                    "{c.quote}"
                  </blockquote>
                  <div className="mt-auto flex items-center justify-between border-t border-zapla-line pt-3">
                    <span className="text-[12.5px] font-bold text-zapla-muted">{c.person}</span>
                    <a
                      href={BOOK_URL}
                      className="text-[12.5px] font-extrabold text-zapla-blue underline-offset-4 hover:underline"
                    >
                      Book a Call →
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {CUSTOMERS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8 bg-zapla-blue" : "w-2 bg-zapla-line"
              }`}
            />
          ))}
        </div>
        <p className="mt-4 text-center text-[11.5px] uppercase tracking-[0.1em] text-zapla-muted">
          Illustrative examples — real case studies coming soon.
        </p>
      </div>
    </section>
  );
}

/* ---------- Pillars ---------- */

function Pillars() {
  return (
    <section id="replaces" className="border-y border-zapla-line bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <SectionHead
          eyebrow="Operating stack"
          title="What Zapla replaces"
          sub="One operating system instead of disconnected tools, logins and customer records."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              h: "Manage customers",
              p: "Keep customer records, pipelines, notes, tasks and documents in one place.",
              tags: ["CRM", "Pipelines", "Documents", "Reporting"],
            },
            {
              h: "Book & communicate",
              p: "Connect inbox, chat, SMS, email, calendars and reminders around the customer.",
              tags: ["Inbox", "Bookings", "SMS", "Email", "AI chat"],
            },
            {
              h: "Get paid",
              p: "Close the loop with invoices, payment links, recurring payments and mobile POS.",
              tags: ["Payments", "Invoices", "Mobile POS", "Catalogue"],
            },
            {
              h: "Grow & follow up",
              p: "Capture leads, request reviews, automate follow-up and reactivate old opportunities.",
              tags: ["Reviews", "Forms", "Funnels", "Automation", "Reactivation"],
            },
          ].map((p) => (
            <div
              key={p.h}
              className="rounded-2xl border border-zapla-line bg-white p-5 shadow-[0_8px_20px_rgba(20,34,58,0.035)] transition hover:-translate-y-0.5 hover:shadow-zapla-sm"
            >
              <h3 className="text-[17px] font-black tracking-[-0.02em]">{p.h}</h3>
              <p className="mt-2 text-[13.5px] text-zapla-muted">{p.p}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#e4ebf4] bg-[#f1f5fb] px-2 py-1 text-[11px] font-extrabold text-[#34445e]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-[820px] rounded-2xl border border-zapla-line bg-[#f8fbff] p-4 text-center text-[14px] text-[#394962]">
          Bought separately, a comparable operating stack can quickly reach{" "}
          <b className="text-zapla-ink">A$1,500 to A$2,500+ a month</b> once seats, contacts,
          payments, messaging, reviews, websites, AI and extra tools add up.
        </p>
      </div>
    </section>
  );
}

/* ---------- Add-ons ---------- */

function Addons() {
  return (
    <section id="addons" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <SectionHead
          eyebrow="Extras"
          title="Optional add-ons"
          sub="The plan stays simple. Usage-heavy or custom work is handled separately."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              h: "AI Receptionist",
              p: "For businesses that want AI to answer calls, qualify enquiries, take details or route calls where configured.",
              price: "From A$449/mo from Growth. Setup quoted.",
            },
            {
              h: "Ghost-to-Gold Campaign",
              p: "Reactivate old leads, past customers or cold quote lists with a structured campaign.",
              price: "Campaign sprint from A$1,500 + usage.",
            },
            {
              h: "Extra capacity or build",
              p: "Extra contacts, locations, integrations, reporting, workflows or custom pages are quoted before work starts.",
              price: "Quoted based on scope.",
            },
          ].map((a) => (
            <div
              key={a.h}
              className="rounded-2xl border border-zapla-line bg-white p-6 shadow-[0_8px_20px_rgba(20,34,58,0.035)]"
            >
              <h3 className="text-[19px] font-black tracking-[-0.03em]">{a.h}</h3>
              <p className="mt-2 text-[14px] text-zapla-muted">{a.p}</p>
              <div className="mt-4 text-[14px] font-black text-zapla-ink">{a.price}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <ScopeDetail
            title="View usage and add-on details"
            items={[
              "SMS: included credits reset monthly. Extra SMS is 15c per segment, or prepaid packs from 10c per segment for planned volume.",
              "Contact-only expansion: available when extra database capacity is genuinely all you need. Campaigns, segmentation, data cleanup and reactivation are separate.",
              "Extra locations: available on Scale and Scale+ where routing, calendars, reviews and reporting justify the setup.",
              "Extra implementation: additional workflows, migrations, integrations, custom reporting, website rebuilds or campaign builds are quoted before work starts.",
              "Payment processing: gateway fees, card fees and third-party costs are separate.",
              "AI voice: no public minute allowance is shown until AU telephony and TTS costs are verified.",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Value grid ---------- */

function ValueGrid() {
  return (
    <section id="value" className="border-y border-zapla-line bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <SectionHead
          eyebrow="Where value shows up"
          title="Where Zapla creates value"
          sub="The biggest wins usually come from faster follow-up, fewer missed enquiries, cleaner handover, better bookings and reactivating old opportunities."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              k: "Recover",
              h: "Missed enquiries",
              p: "Missed calls, web forms, chat and social messages are captured and followed up before they go cold.",
            },
            {
              k: "Convert",
              h: "Quoted work",
              p: "Quote reminders, tasks and follow-up workflows help stop good opportunities from sitting untouched.",
            },
            {
              k: "Save",
              h: "Admin time",
              p: "Bookings, reminders, payments, review requests and customer updates run through one connected system.",
            },
            {
              k: "Reactivate",
              h: "Old customers",
              p: "Past customers, cold quotes and stale leads can be organised into structured follow-up campaigns.",
            },
          ].map((v) => (
            <div
              key={v.h}
              className="rounded-2xl border border-zapla-line bg-white p-5 shadow-[0_8px_20px_rgba(20,34,58,0.035)]"
            >
              <div className="text-[11.5px] font-black uppercase tracking-[0.06em] text-zapla-blue">
                {v.k}
              </div>
              <h3 className="mt-2 text-[17px] font-black tracking-[-0.02em]">{v.h}</h3>
              <p className="mt-2 text-[13.5px] text-zapla-muted">{v.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "Is Zapla just another CRM?",
    a: [
      "No. Most CRMs record what happened. Zapla helps make the next thing happen.",
      "New enquiry? Capture it. Quote sent? Follow it up. Booking made? Remind them. Job done? Get paid and ask for a review. Old customer? Bring them back.",
      "Zapla connects the customer journey from enquiry to payment, review and repeat business, so more of the revenue already inside your business gets captured.",
    ],
  },
  {
    q: "Why do I need Guided Launch?",
    a: [
      "Because empty software does not change how a business runs.",
      "Zapla is most valuable when it is mapped around your real workflow: enquiries, bookings, follow-up, payments, reviews, team handover and reactivation.",
      "Guided Launch means we help configure the system with you, train your team and get the first version live, instead of handing you another blank platform to figure out alone.",
    ],
  },
  {
    q: "What if I already use a CRM, website or booking system?",
    a: [
      "That is normal. Most businesses come to Zapla with tools already in place.",
      "The question is not whether you have software. The question is whether your current setup is connected, easy for the team to use, and helping you turn enquiries into booked work, paid invoices, reviews and repeat business.",
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
    q: "Will my team actually use it?",
    a: [
      "That is exactly why Guided Launch matters.",
      "Zapla is not meant to be another system your team has to remember to update manually. The goal is to connect the daily workflow around enquiries, bookings, messages, follow-up, payments and reviews so the system supports how the team already works.",
      "Training and check-ins are included based on your plan, so adoption is part of the rollout, not an afterthought.",
    ],
  },
  {
    q: "What about SMS usage?",
    a: [
      "Each plan includes monthly SMS credits for everyday follow-up. Extra SMS is 15c per segment, or you can buy prepaid packs from 10c per segment for planned volume. Included credits reset monthly.",
      "One SMS segment is up to 160 standard characters. Longer messages or special characters may use multiple segments.",
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
    q: "Are there hidden costs?",
    a: [
      "No. Your monthly plan, Launch Pack and included SMS credits are shown upfront.",
      "Extra costs only apply when you need extra usage, prepaid SMS packs, additional locations, custom workflows, integrations, managed campaigns, AI Receptionist, website rebuilds, domains, payment processing or third-party tools.",
      "Anything outside the agreed launch scope is quoted before work starts.",
    ],
  },
];

function Faq() {
  return (
    <section id="faq" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-6">
        <SectionHead
          eyebrow="FAQ"
          title="Questions before you choose"
          sub="The key things to understand before booking a Guided Launch call."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {FAQS.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="self-start overflow-hidden rounded-2xl border border-zapla-line bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[14.5px] font-extrabold"
      >
        {q}
        <span className="text-[20px] font-bold leading-none text-zapla-blue">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="space-y-3 px-5 pb-5 text-[14px] leading-[1.55] text-[#34435b]">
          {a.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Final CTA ---------- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(23,105,255,0.14), transparent 45%), radial-gradient(circle at 80% 70%, rgba(24,197,167,0.14), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-[820px] px-5 text-center sm:px-6">
        <Eyebrow>Ready when you are</Eyebrow>
        <h2 className="mt-4 text-[clamp(30px,4vw,48px)] font-black leading-[1.05] tracking-[-0.045em]">
          Want to see what Guided Launch would look like for your business?
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-[16.5px] text-zapla-muted">
          Book a call. We'll map how your business runs, recommend the right plan, and show what
          should be launched first.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <PrimaryButton href={BOOK_URL} track="final_cta">
            Book a Call →
          </PrimaryButton>
          <SecondaryButton href="#pricing">Review pricing</SecondaryButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zapla-line bg-white py-8">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 text-[13px] text-zapla-muted sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-zapla-blue to-zapla-green text-[11px] font-black text-white">
            Z
          </div>
          <span className="font-bold text-zapla-ink">Zapla</span>
          <span className="text-zapla-muted">— AI operating system for growing businesses.</span>
        </div>
        <span>© {new Date().getFullYear()} Zapla. All rights reserved.</span>
      </div>
    </footer>
  );
}
