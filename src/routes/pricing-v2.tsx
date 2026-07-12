import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import customer01 from "@/assets/customer-01-brightside.jpg";
import customer02 from "@/assets/customer-02-northside.jpg";
import customer03 from "@/assets/customer-03-riverside.jpg";
import customer04 from "@/assets/customer-04-bloom.jpg";
import customer05 from "@/assets/customer-05-peak.jpg";
import customer06 from "@/assets/customer-06-complete.jpg";
import customer07 from "@/assets/customer-07-metro.jpg";
import customer08 from "@/assets/customer-08-urban.jpg";
import zaplaFunnel16Apps from "@/assets/zapla-funnel-16-apps-final.png";

export const Route = createFileRoute("/pricing-v2")({
  head: () => ({
    meta: [
      { title: "Pricing V2 — Zapla" },
      { name: "description", content: "Alternate design of the Zapla pricing page for comparison." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PricingPage,
});

const BOOK_URL = "https://zapla.io/getstartedtrial";

/* ------------------------------------------------------------------ */
/*  Hooks & primitives                                                 */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({
  as: As = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLDivElement>();
  const Comp = As as React.ElementType;
  return (
    <Comp
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`zapla-reveal ${className}`}
    >
      {children}
    </Comp>
  );
}


function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zapla-line bg-white/80 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-zapla-blue shadow-zapla-sm backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-zapla-blue shadow-[0_0_0_5px_rgba(37,99,255,0.15)] zapla-pulse-dot" />
      {children}
    </span>
  );
}

function Check() {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-zapla-green-soft">
      <svg viewBox="0 0 12 12" className="h-3 w-3 text-zapla-green" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5L5 9L9.5 3.5" />
      </svg>
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
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-zapla-blue px-6 py-3.5 text-[15px] font-extrabold text-white shadow-zapla-blue transition-all duration-200 hover:-translate-y-0.5 hover:bg-zapla-blue2 hover:shadow-zapla-lift ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center gap-2">{children}</span>
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
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-zapla-line bg-white px-6 py-3.5 text-[15px] font-extrabold text-zapla-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-zapla-line2 hover:shadow-zapla-sm ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  accent,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={`mx-auto mb-12 max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-zapla-ink">
        {title}
        {accent && (
          <>
            {" "}
            <span className="zapla-gradient-text">{accent}</span>
          </>
        )}
      </h2>
      {sub && (
        <p className="mt-4 text-[16.5px] leading-[1.6] text-zapla-muted">{sub}</p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function PricingPage() {
  return (
    <div className="min-h-screen bg-zapla-bg font-zapla text-zapla-ink antialiased">
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
      <StickyMobileCta />
    </div>
  );
}

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zapla-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden">
      <div className="flex items-center gap-2">
        <a
          href={BOOK_URL}
          className="flex-1 rounded-full bg-zapla-blue px-4 py-3 text-center text-[14px] font-extrabold text-white shadow-zapla-blue"
        >
          Book a Call →
        </a>
        <a
          href="#pricing"
          className="rounded-full border border-zapla-line px-4 py-3 text-center text-[13px] font-extrabold text-zapla-ink"
        >
          Plans
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-zapla-line bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[11px] bg-zapla-blue text-[16px] font-black text-white shadow-zapla-blue">
            <span className="relative">Z</span>
          </div>
          <span className="text-[20px] font-extrabold tracking-[-0.035em] text-zapla-ink">Zapla</span>
        </a>
        <div className="flex items-center gap-6 text-[13.5px] font-bold text-zapla-muted">
          <a className="hidden transition hover:text-zapla-ink sm:inline" href="#pricing">Pricing</a>
          <a className="hidden transition hover:text-zapla-ink sm:inline" href="#launch">Launch Pack</a>
          <a className="hidden transition hover:text-zapla-ink md:inline" href="#customers">Customers</a>
          <a className="hidden transition hover:text-zapla-ink md:inline" href="#faq">FAQ</a>
          <a
            href={BOOK_URL}
            data-track="nav_cta"
            className="inline-flex items-center justify-center rounded-full bg-zapla-blue px-4 py-2 text-[13px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-zapla-blue2 hover:shadow-zapla-blue"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-zapla-bg pt-10 pb-12 sm:pt-16 sm:pb-20">
      <div className="pointer-events-none absolute -top-40 -right-24 h-[460px] w-[460px] rounded-full bg-zapla-violet/12 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -top-24 -left-32 h-[460px] w-[460px] rounded-full bg-zapla-cyan/16 blur-[140px] zapla-orb-drift-slow" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg-light opacity-50" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left column: headline + trust bar */}
        <div className="zapla-fade text-center lg:text-left">
          <Eyebrow>Simple, transparent pricing</Eyebrow>
          <h1 className="mt-5 font-bold text-zapla-ink text-[clamp(34px,4.4vw,58px)] leading-[1.04] tracking-[-0.035em]">
            Run your whole business from{" "}
            <span className="zapla-gradient-shimmer">one AI operating system</span>.
          </h1>
          <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.6] text-zapla-muted lg:mx-0 mx-auto">
            One flat monthly price. Unlimited users. Guided Launch connects your enquiries,
            bookings, reviews, payments and AI follow-up — so you start seeing value in days,
            not months.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <PrimaryButton href={BOOK_URL} track="hero_cta">Book a Call →</PrimaryButton>
            <SecondaryButton href="#pricing">See plans</SecondaryButton>
          </div>

          {/* Trust bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="flex text-[#F5B301]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-[16px] leading-none">{s}</span>
                ))}
              </div>
              <span className="text-[13px] font-bold text-zapla-ink">4.9/5</span>
              <span className="text-[12.5px] text-zapla-muted">· 200+ operators</span>
            </div>
            <span className="hidden h-4 w-px bg-zapla-line sm:block" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold text-zapla-muted">
              {["Unlimited users", "No lock-in", "AU support"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <Check />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: OS dashboard mock */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-zapla-blue/25 via-zapla-violet/15 to-zapla-cyan/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[22px] border border-zapla-line bg-white shadow-zapla-lift">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-zapla-line bg-zapla-faint px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-zapla-muted shadow-zapla-sm">
                app.zapla.io
              </span>
            </div>
            <div className="grid gap-3 p-4 sm:p-5">
              {/* KPI row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: "Enquiries today", v: "24", d: "+12%" },
                  { l: "Booked", v: "18", d: "+8%" },
                  { l: "Recovered", v: "A$4.2k", d: "+31%" },
                ].map((k) => (
                  <div key={k.l} className="rounded-xl border border-zapla-line bg-white p-3">
                    <div className="text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-zapla-muted">{k.l}</div>
                    <div className="mt-1 text-[20px] font-extrabold tracking-[-0.03em] text-zapla-ink">{k.v}</div>
                    <div className="text-[11px] font-bold text-zapla-green">{k.d}</div>
                  </div>
                ))}
              </div>
              {/* Pipeline row */}
              <div className="rounded-xl border border-zapla-line bg-white p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-zapla-blue">Pipeline</span>
                  <span className="text-[11px] text-zapla-muted">Today</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { l: "New", n: 8, c: "bg-zapla-blue" },
                    { l: "Quote", n: 6, c: "bg-zapla-violet" },
                    { l: "Booked", n: 5, c: "bg-zapla-cyan" },
                    { l: "Won", n: 3, c: "bg-zapla-green" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-md bg-zapla-faint p-2 text-center">
                      <div className={`mx-auto mb-1 h-1.5 w-8 rounded-full ${s.c}`} />
                      <div className="text-[13px] font-extrabold text-zapla-ink">{s.n}</div>
                      <div className="text-[10px] font-semibold text-zapla-muted">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Activity row */}
              <div className="rounded-xl border border-zapla-line bg-white p-3">
                <div className="mb-2 text-[11.5px] font-extrabold uppercase tracking-[0.1em] text-zapla-blue">
                  Recent activity
                </div>
                <ul className="space-y-2 text-[12.5px]">
                  {[
                    { d: "AI replied to missed call", t: "2m", c: "text-zapla-green" },
                    { d: "Quote follow-up sent", t: "14m", c: "text-zapla-blue" },
                    { d: "Review request queued", t: "1h", c: "text-zapla-violet" },
                  ].map((a) => (
                    <li key={a.d} className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-[#26364f]">
                        <span className={`h-1.5 w-1.5 rounded-full ${a.c.replace("text-", "bg-")}`} />
                        {a.d}
                      </span>
                      <span className="text-zapla-muted">{a.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



/* ------------------------------------------------------------------ */
/*  Guided Strip                                                       */
/* ------------------------------------------------------------------ */

function GuidedStrip() {
  return (
    <section className="relative bg-white py-10 sm:py-14">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Guided Launch</Eyebrow>
          <h2 className="mt-4 text-[clamp(24px,2.6vw,32px)] font-extrabold leading-[1.15] tracking-[-0.035em] text-zapla-ink">
            Zapla, <span className="zapla-gradient-text">launched properly</span> around how your business runs.
          </h2>
        </Reveal>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-3">

          {[
            { n: "01", b: "Mapped", s: "Your workflow, team and customer journey — captured in one session." },
            { n: "02", b: "Configured", s: "Pipelines, inbox, bookings, reviews and follow-up built in your system." },
            { n: "03", b: "Rolled out", s: "Training and check-ins so the system actually gets used from day one." },
          ].map((i, idx) => (
            <Reveal
              key={i.n}
              delay={idx * 120}
              className="group relative rounded-3xl border border-zapla-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-zapla-blue">
                  Step {i.n}
                </span>
                <span className="h-px flex-1 ml-4 bg-gradient-to-r from-zapla-line to-transparent" />
              </div>
              <h3 className="text-[22px] font-extrabold tracking-[-0.025em] text-zapla-ink">{i.b}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-zapla-muted">{i.s}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing                                                            */
/* ------------------------------------------------------------------ */

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
    <section id="pricing" className="relative bg-zapla-bg pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Plans"
          title="Choose the path that fits"
          accent="your business"
          sub="Every plan includes unlimited users. The Launch Pack gets Zapla configured around how your business actually runs."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, idx) => {
            const isEnt = p.name === "Scale+";
            return (
            <Reveal
              key={p.name}
              delay={idx * 80}
              className={`group relative flex flex-col overflow-hidden rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-1 ${
                isEnt
                  ? "border border-white/10 bg-gradient-to-br from-[#0B1220] via-[#111a2e] to-[#0B1220] text-white shadow-zapla-lift"
                  : p.recommended
                  ? "border-2 border-zapla-blue bg-white shadow-zapla-lift md:-translate-y-3"
                  : "border border-zapla-line bg-white shadow-zapla-sm hover:border-zapla-line2 hover:shadow-zapla"
              }`}
            >
              {isEnt && (
                <>
                  <div className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-zapla-violet/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-zapla-blue/30 blur-3xl" />
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-gradient-to-r from-zapla-violet to-zapla-blue px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-white">
                    Enterprise
                  </div>
                </>
              )}
              {p.recommended && !isEnt && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-zapla-blue px-4 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-white shadow-zapla-blue">
                  Most Popular
                </div>
              )}
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-2">
                  <h3 className={`text-[24px] font-extrabold tracking-[-0.03em] ${isEnt ? "text-white" : "text-zapla-ink"}`}>
                    {p.name}
                  </h3>
                </div>
                <p className={`mt-2 min-h-[80px] text-[13.5px] leading-[1.55] lg:min-h-[96px] ${isEnt ? "text-white/70" : "text-zapla-muted"}`}>
                  {p.fit}
                </p>
                <div className={`mt-4 border-b pb-5 ${isEnt ? "border-white/10" : "border-zapla-line"}`}>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-[44px] font-extrabold tracking-[-0.055em] ${isEnt ? "text-white" : "text-zapla-ink"}`}>
                      {p.price}
                    </span>
                    <span className={`text-[13px] font-semibold ${isEnt ? "text-white/60" : "text-zapla-muted"}`}>
                      {p.priceLabel}
                    </span>
                  </div>
                  <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${
                    isEnt ? "bg-white/10 text-white/85" : "bg-zapla-blue-soft text-zapla-blue2"
                  }`}>
                    <span className={isEnt ? "text-white" : "text-zapla-blue"}>+</span>
                    <b>{p.launch}</b>
                    <span className={isEnt ? "text-white/60" : "text-zapla-blue2/70"}>Launch Pack</span>
                  </div>
                </div>
                <ul className="mt-5 grid gap-3">
                  {p.features.map((f, i) => {
                    const isStack = i === 0 && f.startsWith("Everything");
                    return (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5]">
                        <Check />
                        <span className={
                          isEnt
                            ? (isStack ? "font-extrabold text-white" : "text-white/80")
                            : (isStack ? "font-extrabold text-zapla-ink" : "text-[#3a4560]")
                        }>
                          {f}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6 flex-1" />
                {isEnt ? (
                  <a
                    href={BOOK_URL}
                    data-track={p.track}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-[15px] font-extrabold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-zapla-ink"
                  >
                    Talk to sales →
                  </a>
                ) : p.recommended ? (
                  <PrimaryButton href={BOOK_URL} track={p.track} className="w-full mt-2">
                    Book a Call →
                  </PrimaryButton>
                ) : (
                  <SecondaryButton href={BOOK_URL} track={p.track} className="w-full mt-2">
                    Book a Call
                  </SecondaryButton>
                )}
              </div>
            </Reveal>
            );
          })}
        </div>


        <p className="mx-auto mt-8 max-w-[760px] text-center text-[12.5px] text-zapla-muted">
          Prices are in AUD and exclude GST. SMS, AI voice, WhatsApp, domains, payment gateway/card
          fees, ad spend, third-party tools, complex migrations and custom build work may be
          separate. No lock-in after launch. Thirty days notice.
        </p>

        <div className="mx-auto mt-8 max-w-[1000px]">
          <button
            onClick={() => setOpenCompare((v) => !v)}
            className="mx-auto flex items-center gap-2.5 rounded-full border border-zapla-line bg-white px-5 py-3 text-[14px] font-extrabold text-zapla-ink shadow-zapla-sm transition hover:-translate-y-0.5 hover:border-zapla-line2"
          >
            {openCompare ? "Hide full comparison" : "Compare all features"}
            <span className={`text-zapla-blue transition-transform ${openCompare ? "rotate-180" : ""}`}>⌄</span>
          </button>
          {openCompare && <CompareTable />}
        </div>
      </div>
    </section>
  );
}

function CompareTable() {
  const rows: [string, string, string, string, string][] = [
    ["Monthly price", "A$299", "A$499", "A$899", "Custom"],
    ["Launch Pack", "A$995", "A$1,995", "A$3,500", "Custom"],
    ["Users", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
    ["Contacts", "2,500", "10,000", "25,000", "Custom"],
    ["Locations", "1", "1", "2+", "Custom"],
    ["SMS included", "250 seg/mo", "500 seg/mo", "1,000 seg/mo", "Custom"],
    ["AI chat", "—", "Where relevant", "Where relevant", "Custom"],
    ["AI Receptionist", "—", "Add-on", "Add-on", "Custom"],
    ["Rollout support", "Training session", "Training + check-ins", "Training + extended check-ins", "Custom"],
  ];
  return (
    <div className="zapla-fade mt-4 overflow-auto rounded-[18px] border border-zapla-line bg-white shadow-zapla-sm">
      <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
        <thead>
          <tr>
            {["Item", "Core", "Growth", "Scale", "Scale+"].map((h) => (
              <th key={h} className="border-b border-zapla-line bg-zapla-faint px-4 py-3 text-left text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-zapla-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="transition-colors hover:bg-zapla-faint">
              {r.map((cell, j) => (
                <td key={j} className={`border-b border-zapla-line px-4 py-3 last:border-b-0 ${j === 0 ? "font-extrabold text-zapla-ink" : "text-[#3a4560]"}`}>
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

/* ------------------------------------------------------------------ */
/*  Calculator                                                         */
/* ------------------------------------------------------------------ */

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
    <section id="calculator" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-24 right-10 h-[420px] w-[420px] rounded-full bg-zapla-cyan/15 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-[380px] w-[380px] rounded-full bg-zapla-violet/15 blur-[140px] zapla-orb-drift-slow" />
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Opportunity"
          title="Estimate what better follow-up could"
          accent="recover"
          sub="Use your own numbers. Missed calls, slow replies, forgotten quotes, stale enquiries and old customers are often the easiest wins."
        />
        <Reveal className="grid gap-6 rounded-[28px] border border-zapla-line bg-white p-6 shadow-zapla md:grid-cols-[1fr_0.9fr] md:p-8">
          <div className="grid gap-7">
            <SliderRow
              label="Opportunities not followed up each week"
              value={String(calls)}
              min={0}
              max={40}
              current={calls}
              onChange={setCalls}
              help="Missed calls, slow replies, forgotten quotes, stale enquiries or old customers."
            />
            <div>
              <label className="mb-2 flex justify-between gap-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-zapla-muted">
                Average job or customer value (A$)
              </label>
              <input
                type="number"
                value={jobval}
                min={0}
                step={10}
                onChange={(e) => setJobval(Number(e.target.value) || 0)}
                className="w-full rounded-2xl border border-zapla-line bg-zapla-faint px-4 py-3 text-[16px] font-extrabold text-zapla-ink outline-none transition focus:border-zapla-blue focus:bg-white"
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
          <div className="relative flex flex-col justify-center overflow-hidden rounded-[22px] border border-zapla-blue/20 bg-gradient-to-br from-zapla-cyan/10 via-zapla-blue-soft to-zapla-violet/10 p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-zapla-blue/20 blur-3xl" />
            <div className="relative">
              <div className="text-[11.5px] font-extrabold uppercase tracking-[0.12em] text-zapla-blue">
                Recoverable opportunity / month
              </div>
              <div className="my-3 text-[clamp(42px,6vw,64px)] font-extrabold leading-none tracking-[-0.055em] zapla-gradient-text">
                {fmt(leak)}
              </div>
              <p className="mb-6 text-[14.5px] leading-[1.55] text-[#3a4560]">
                Recovering even 20% is worth <b className="text-zapla-ink">{fmt(recover)}</b>/mo.
                Zapla Growth is <b className="text-zapla-ink">A$499</b>
                {payback > 0 && recover > 499 ? (
                  <> — payback in ~<b className="text-zapla-blue">{payback} weeks</b>.</>
                ) : (
                  "."
                )}
              </p>
              <PrimaryButton href={BOOK_URL} track="calc_cta" className="w-full">
                Book a Call →
              </PrimaryButton>
            </div>
          </div>
          <p className="text-center text-[12px] text-zapla-muted md:col-span-2">
            Illustrative only, not a promise of results. The Guided Launch call maps your actual business before any recommendation.
          </p>
        </Reveal>
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
      <label className="mb-2 flex justify-between gap-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-zapla-muted">
        <span>{label}</span>
        <output className="text-zapla-blue">{value}</output>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zapla-blue"
      />
      {help && <small className="mt-1.5 block text-[12px] text-zapla-muted2">{help}</small>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Launch Pack                                                        */
/* ------------------------------------------------------------------ */

function LaunchPack() {
  const journey = [
    { n: 1, b: "Capture enquiries", s: "Forms, missed calls, inbox, chat and social connected." },
    { n: 2, b: "Move work forward", s: "Pipelines, quote follow-up, reminders and bookings configured." },
    { n: 3, b: "Get paid and reviewed", s: "Payments, invoices, mobile POS and reviews set up." },
    { n: 4, b: "Reactivate opportunities", s: "Old leads, past customers and cold quotes prepared for follow-up." },
  ];
  return (
    <section id="launch" className="relative bg-zapla-bg py-16 sm:py-24">
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Launch Pack"
          title="What your Launch Pack"
          accent="actually builds"
          sub="The Launch Pack is not a setup admin fee. It is the first build of your operating system, scoped by plan."
        />

        <div className="relative">
          <div className="pointer-events-none absolute left-6 right-6 top-14 hidden h-px bg-gradient-to-r from-transparent via-zapla-blue/30 to-transparent lg:block" />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, idx) => (
              <Reveal
                key={j.n}
                delay={idx * 100}
                className="group relative overflow-hidden rounded-2xl border border-zapla-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-zapla-blue text-[14px] font-extrabold text-white shadow-zapla-blue">
                  {j.n}
                </div>
                <b className="block text-[16px] font-extrabold tracking-[-0.02em] text-zapla-ink">
                  {j.b}
                </b>
                <span className="mt-2 block text-[13.5px] leading-[1.55] text-zapla-muted">
                  {j.s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-2">
          <ScopeDetail
            title="Core Launch Pack"
            sub="Essential setup for a solo operator or small team."
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
            title="Growth Launch Pack"
            sub="Follow-up, reactivation and growth setup for most businesses."
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
            title="Scale Launch Pack"
            sub="Multi-location, team routing, reporting and larger rollout setup."
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
            title="Scale+ Launch Pack"
            sub="Custom rollout for complex, high-volume or multi-location operations."
            items={[
              "3+ locations, or 2 locations with heavier usage or complexity",
              "Franchise, multi-brand or multi-team rollout",
              "Complex integrations, routing or custom reporting",
              "High-volume contacts, SMS, email, payments or AI needs",
              "Custom migration, training and implementation plan agreed before build starts",
            ]}
          />
        </div>

        <p className="mt-6 rounded-2xl border border-zapla-line bg-white p-4 text-[13.5px] text-[#3a4560]">
          <b>Website capture point:</b> a landing page, enquiry form, booking calendar, quote request,
          webchat or similar entry point connected to Zapla. Extra work is quoted before it starts.
        </p>
      </div>
    </section>
  );
}

function ScopeDetail({ title, sub, items }: { title: string; sub?: string; items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-zapla-line bg-white transition hover:border-zapla-line2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <div className="text-[15.5px] font-extrabold tracking-[-0.02em] text-zapla-ink">{title}</div>
          {sub && <div className="mt-0.5 text-[13px] text-zapla-muted">{sub}</div>}
        </div>
        <span className="mt-1 text-[22px] font-bold leading-none text-zapla-blue">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-[14px] text-[#3a4560] zapla-fade">
          <ul className="grid list-disc gap-2 pl-5">
            {items.map((it) => (<li key={it}>{it}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Customers                                                          */
/* ------------------------------------------------------------------ */

const CUSTOMERS = [
  {
    tag: "Home services",
    company: "Brightside Plumbing",
    metric: "A$12k",
    label: "Recovered from old leads",
    quote: "Old enquiries, forgotten follow-ups, and past customers turned into booked work again.",
    person: "Owner, home services business",
    img: customer01,
  },
  {
    tag: "Automotive",
    company: "Northside Auto",
    metric: "5×",
    label: "Faster enquiry response",
    quote: "Missed calls, forms, and messages now get an instant reply before the customer goes elsewhere.",
    person: "Service Manager, automotive workshop",
    img: customer02,
  },
  {
    tag: "Trades",
    company: "Riverside Electrical",
    metric: "38%",
    label: "More quotes converted",
    quote: "Every quote is followed up automatically, so warm prospects don't disappear when the team gets busy.",
    person: "Operations Lead, electrical contractor",
    img: customer03,
  },
  {
    tag: "Appointments",
    company: "Studio Bloom",
    metric: "24%",
    label: "More customers booked",
    quote: "More enquiries turned into appointments because every lead was followed up quickly and consistently.",
    person: "Clinic Manager, appointment-based business",
    img: customer04,
  },
  {
    tag: "Local service",
    company: "Peak Property Care",
    metric: "3×",
    label: "More reviews requested",
    quote: "Happy customers are asked at the right time, helping the business build trust and win more local work.",
    person: "Customer Experience Manager, local service business",
    img: customer05,
  },
  {
    tag: "Retention",
    company: "Complete Care Co.",
    metric: "18%",
    label: "More repeat customers",
    quote: "We now stay in touch after the first job with reminders, check-ins, offers, and rebooking prompts.",
    person: "General Manager, service-based business",
    img: customer06,
  },
  {
    tag: "Sales",
    company: "Metro Trade Services",
    metric: "A$8k",
    label: "Upsell opportunities identified",
    quote: "We could finally see which customers were ready for upgrades, add-ons, repeat work, or follow-up services.",
    person: "Sales Manager, trade services company",
    img: customer07,
  },
  {
    tag: "Operations",
    company: "Urban Service Group",
    metric: "6 tools",
    label: "Replaced with one system",
    quote: "CRM, SMS, email, bookings, forms, reviews, automations, and pipeline tracking now work from one place.",
    person: "Founder, growing service business",
    img: customer08,
  },
] as const;

function Customers() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const compute = () => setPerView(window.matchMedia("(min-width: 1024px)").matches ? 3 : 1);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const totalPages = Math.max(1, CUSTOMERS.length - perView + 1);

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(CUSTOMERS.length - 1, i));
    const cards = Array.from(el.children) as HTMLElement[];
    const target = cards[clamped];
    if (target) {
      const elRect = el.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      el.scrollTo({ left: el.scrollLeft + (tRect.left - elRect.left), behavior: "smooth" });
      setActive(clamped);
    }
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const elLeft = el.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - elLeft);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <section id="customers" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mb-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <Reveal className="max-w-2xl">
            <Eyebrow>Customer results</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.035em] text-zapla-ink">
              Businesses recover more from the leads and{" "}
              <span className="zapla-gradient-text">customers they already have</span>
            </h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-zapla-muted">
              Zapla helps service businesses respond faster, convert more enquiries, recover lost revenue,
              retain customers, generate more reviews, and identify upsell opportunities already sitting in
              their business.
            </p>
          </Reveal>
          <Reveal className="flex justify-start md:justify-end">
            <a
              href={BOOK_URL}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-zapla-blue via-zapla-violet to-zapla-magenta px-6 py-3 text-[14px] font-extrabold text-white shadow-zapla-blue transition hover:-translate-y-0.5 hover:shadow-zapla-lift"
            >
              Get started →
            </a>
          </Reveal>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollToIndex(active - 1)}
            aria-label="Previous"
            className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 md:grid h-12 w-12 place-items-center rounded-full border border-zapla-line bg-white text-zapla-ink shadow-zapla-sm transition hover:-translate-y-[calc(50%+2px)] hover:border-zapla-blue hover:text-zapla-blue"
          >
            ←
          </button>
          <button
            onClick={() => scrollToIndex(active + 1)}
            aria-label="Next"
            className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 md:grid h-12 w-12 place-items-center rounded-full border border-zapla-line bg-white text-zapla-ink shadow-zapla-sm transition hover:-translate-y-[calc(50%+2px)] hover:border-zapla-blue hover:text-zapla-blue"
          >
            →
          </button>

          <div
            ref={scrollerRef}
            className="zapla-scroll-hide -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
          >
            {CUSTOMERS.map((c, i) => (
              <Reveal
                key={c.company}
                delay={Math.min(i, 3) * 80}
                className="group snap-start shrink-0 basis-[86%] overflow-hidden rounded-[24px] border border-zapla-line bg-white shadow-zapla-sm transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/30 hover:shadow-zapla sm:basis-[70%] lg:basis-[calc((100%-2.5rem)/3)]"
              >
                <article className="flex h-full flex-col">


                  <div className="relative aspect-[16/10] overflow-hidden bg-zapla-faint">
                    <img
                      src={c.img}
                      alt=""
                      loading="lazy"
                      width={1200}
                      height={750}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 z-20 rounded-full bg-white/95 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-zapla-blue shadow-sm backdrop-blur">
                      {c.tag}
                    </span>
                    <div className="absolute right-4 top-4 z-20 rounded-lg bg-white/95 px-3 py-1.5 text-[12px] font-extrabold text-zapla-ink shadow-sm backdrop-blur">
                      {c.company}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <div className="text-[48px] font-extrabold leading-none tracking-[-0.045em] zapla-gradient-text">
                        {c.metric}
                      </div>
                      <div className="mt-2 text-[13px] font-bold text-zapla-ink">
                        {c.label}
                      </div>
                    </div>
                    <blockquote className="text-[14.5px] leading-[1.55] text-[#26364f]">
                      "{c.quote}"
                    </blockquote>
                    <div className="mt-auto border-t border-zapla-line pt-3">
                      <span className="block min-h-[2.4em] text-[11.5px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-zapla-muted">
                        {c.person}
                      </span>
                    </div>

                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const isActive = i === Math.min(active, totalPages - 1);
            return (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  isActive
                    ? "w-5 bg-gradient-to-r from-zapla-blue to-zapla-violet"
                    : "w-2 bg-zapla-line2 hover:bg-zapla-muted2"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}



/* ------------------------------------------------------------------ */
/*  Pillars                                                            */
/* ------------------------------------------------------------------ */

function Pillars() {
  return (
    <section
      id="replaces"
      className="relative scroll-mt-24 overflow-hidden bg-zapla-bg py-10 sm:py-12"
    >
      <div className="pointer-events-none absolute -top-20 left-[8%] h-[260px] w-[360px] rounded-full bg-[#EF4444]/7 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 right-[10%] h-[300px] w-[420px] rounded-full bg-zapla-blue/16 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1080px] items-center gap-5 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-zapla-line bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-zapla-blue shadow-zapla-sm">
            16 TOOLS · ONE OPERATING SYSTEM&nbsp;
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold leading-[1.04] tracking-[-0.02em] text-zapla-ink sm:text-[42px]">
            Replace the&nbsp;<span className="text-[#E4785A]">messy</span>&nbsp;stack
            <br className="hidden sm:block" /> running your business.
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.55] text-zapla-muted lg:mx-0">
            Zapla brings your website, funnels, CRM, pipelines, inbox, bookings, forms, payments, reviews and follow-up into one connected operating system, on one bill.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-zapla-blue/25 bg-gradient-to-r from-zapla-blue-soft to-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-zapla-blue">
              ONE BILL · SAVE A$2000+/MONTH IN DISCONNECTED TOOLS
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="relative mx-auto w-full max-w-[500px] pt-8 lg:mr-0 lg:pt-14">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zapla-blue/20 blur-[90px]" />
          <img
            src={zaplaFunnel16Apps}
            alt="Sixteen business apps funneling into one Zapla system"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative mx-auto h-auto w-full max-w-[420px] drop-shadow-[0_28px_42px_rgba(37,99,255,0.18)] sm:max-w-[450px]"
          />
        </Reveal>
      </div>
    </section>
  );
}





/* ------------------------------------------------------------------ */
/*  Add-ons                                                            */
/* ------------------------------------------------------------------ */

function Addons() {
  const addons = [
    { h: "AI Receptionist", p: "AI answers calls, qualifies enquiries, takes details or routes calls where configured.", price: "From A$495/mo from Growth. Setup quoted." },
    { h: "Ghost-to-Gold Campaign", p: "Reactivate old leads, past customers or cold quote lists with a structured campaign.", price: "Campaign sprint from A$1,500 + usage." },
    { h: "Extra capacity or build", p: "Extra contacts, locations, integrations, reporting, workflows or custom pages.", price: "Quoted based on scope." },
  ];
  return (
    <section id="addons" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Extras"
          title="Optional"
          accent="add-ons"
          sub="The plan stays simple. Usage-heavy or custom work is handled separately."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {addons.map((a, idx) => (
            <Reveal
              key={a.h}
              delay={idx * 100}
              className="group relative overflow-hidden rounded-2xl border border-zapla-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
            >
              <h3 className="text-[20px] font-extrabold tracking-[-0.03em] text-zapla-ink">{a.h}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-zapla-muted">{a.p}</p>
              <div className="mt-5 border-t border-zapla-line pt-3 text-[13.5px] font-extrabold text-zapla-blue">
                {a.price}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-4">
          <ScopeDetail
            title="Usage and add-on details"
            items={[
              "SMS: included credits reset monthly. Extra SMS is 15c per segment, or prepaid packs from 10c per segment for planned volume.",
              "Contact-only expansion: available when extra database capacity is genuinely all you need.",
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

/* ------------------------------------------------------------------ */
/*  Value grid                                                         */
/* ------------------------------------------------------------------ */

function ValueGrid() {
  const values = [
    { k: "Recover", h: "Missed enquiries", p: "Missed calls, forms, chat and social messages captured and followed up before they go cold." },
    { k: "Convert", h: "Quoted work", p: "Quote reminders, tasks and follow-up workflows stop opportunities from sitting untouched." },
    { k: "Save", h: "Admin time", p: "Bookings, reminders, payments, review requests and updates run through one connected system." },
    { k: "Reactivate", h: "Old customers", p: "Past customers, cold quotes and stale leads organised into structured follow-up campaigns." },
  ];
  return (
    <section id="value" className="bg-zapla-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Where value shows up"
          title="Where Zapla"
          accent="creates value"
          sub="The biggest wins come from faster follow-up, fewer missed enquiries, cleaner handover and reactivating old opportunities."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, idx) => (
            <Reveal
              key={v.h}
              delay={idx * 80}
              className="group relative overflow-hidden rounded-2xl border border-zapla-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
            >
              <div className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-zapla-blue">{v.k}</div>
              <h3 className="mt-3 text-[18px] font-extrabold tracking-[-0.02em] text-zapla-ink">{v.h}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-zapla-muted">{v.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const FAQS = [
  { q: "Is Zapla just another CRM?", a: [
    "No. Most CRMs record what happened. Zapla helps make the next thing happen.",
    "New enquiry? Capture it. Quote sent? Follow it up. Booking made? Remind them. Job done? Get paid and ask for a review. Old customer? Bring them back.",
    "Zapla connects the customer journey from enquiry to payment, review and repeat business, so more of the revenue already inside your business gets captured.",
  ]},
  { q: "Why do I need Guided Launch?", a: [
    "Because empty software does not change how a business runs.",
    "Zapla is most valuable when it is mapped around your real workflow: enquiries, bookings, follow-up, payments, reviews, team handover and reactivation.",
    "Guided Launch means we help configure the system with you, train your team and get the first version live, instead of handing you another blank platform.",
  ]},
  { q: "What if I already use a CRM, website or booking system?", a: [
    "That is normal. Most businesses come to Zapla with tools already in place.",
    "The question is not whether you have software. It is whether your setup is connected, easy for the team to use, and helping you turn enquiries into booked work, paid invoices, reviews and repeat business.",
    "During launch, we look at what should stay, what should connect, and what Zapla should replace.",
  ]},
  { q: "How long does Zapla take to launch?", a: [
    "Most standard launches take 2 to 4 weeks depending on the plan, how quickly we get access to your existing tools, and how much needs to be configured.",
    "Core launches are usually faster. Growth and Scale launches can take longer because they may include more workflows, calendars, forms, reporting, locations or team setup.",
  ]},
  { q: "Will my team actually use it?", a: [
    "That is exactly why Guided Launch matters.",
    "Zapla is not another system your team has to remember to update manually. The goal is to connect the daily workflow around enquiries, bookings, messages, follow-up, payments and reviews so the system supports how the team already works.",
    "Training and check-ins are included based on your plan, so adoption is part of the rollout.",
  ]},
  { q: "What about SMS usage?", a: [
    "Each plan includes monthly SMS credits for everyday follow-up. Extra SMS is 15c per segment, or prepaid packs from 10c per segment for planned volume.",
    "One SMS segment is up to 160 standard characters. Longer messages or special characters may use multiple segments.",
  ]},
  { q: "Can I upgrade later?", a: [
    "Yes. If you outgrow your plan, we recommend the simplest path.",
    "If you only need more contact capacity, that can usually be added without a full rebuild. If you need extra setup, workflows, locations, reporting, campaigns or custom work, we quote that before work starts.",
  ]},
  { q: "Are there hidden costs?", a: [
    "No. Your monthly plan, Launch Pack and included SMS credits are shown upfront.",
    "Extra costs only apply for extra usage, prepaid SMS packs, additional locations, custom workflows, integrations, managed campaigns, AI Receptionist, website rebuilds, domains, payment processing or third-party tools.",
    "Anything outside the agreed launch scope is quoted before work starts.",
  ]},
];

function Faq() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHead
          eyebrow="FAQ"
          title="Questions before"
          accent="you choose"
          sub="The key things to understand before booking a Guided Launch call."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 80}>
              <FaqItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`self-start overflow-hidden rounded-2xl border bg-white transition ${
      open ? "border-zapla-blue/50 shadow-zapla-sm" : "border-zapla-line hover:border-zapla-line2"
    }`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[14.5px] font-extrabold text-zapla-ink"
      >
        {q}
        <span className={`text-[22px] font-bold leading-none text-zapla-blue transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="space-y-3 px-5 pb-5 text-[14px] leading-[1.6] text-[#3a4560] zapla-fade">
          {a.map((p, i) => (<p key={i}>{p}</p>))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-zapla-bg py-24">
      <div className="pointer-events-none absolute -top-20 left-1/4 h-[420px] w-[420px] rounded-full bg-zapla-cyan/20 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[420px] w-[420px] rounded-full bg-zapla-violet/20 blur-[140px] zapla-orb-drift-slow" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg-light opacity-60" />
      <Reveal className="relative mx-auto max-w-[860px] px-5 text-center sm:px-8">
        <Eyebrow>Ready when you are</Eyebrow>
        <h2 className="mt-5 text-[clamp(36px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.045em] text-zapla-ink">
          Let's launch Zapla <span className="zapla-gradient-shimmer">around your business</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-zapla-muted">
          Book a call. We'll map how your business runs, recommend the right plan, and show what should be launched first.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PrimaryButton href={BOOK_URL} track="final_cta">Book a Call →</PrimaryButton>
          <SecondaryButton href="#pricing">Review pricing</SecondaryButton>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zapla-line bg-white py-10 text-zapla-muted">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 text-[13px] sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-zapla-blue text-[12px] font-black text-white">Z</div>
          <span className="font-extrabold text-zapla-ink">Zapla</span>
          <span>— AI operating system for growing businesses.</span>
        </div>
        <span>© {new Date().getFullYear()} Zapla. All rights reserved.</span>
      </div>
    </footer>
  );
}
