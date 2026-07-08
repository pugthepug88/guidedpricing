import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useEffect } from "react";
import customerTrades from "@/assets/customer-trades.jpg";
import customerSalon from "@/assets/customer-salon.jpg";
import customerAuto from "@/assets/customer-auto.jpg";

export const Route = createFileRoute("/")({
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

function useCountUp(target: number, trigger: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, duration]);
  return n;
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] ${
        dark
          ? "border-white/10 bg-white/5 text-zapla-muted-dark backdrop-blur-md"
          : "border-zapla-line bg-white text-[#28405f]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-zapla-green shadow-[0_0_0_5px_rgba(24,197,167,0.16)] zapla-pulse-dot" />
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
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-zapla-blue px-6 py-3.5 text-[15px] font-extrabold text-white shadow-[0_16px_32px_-8px_rgba(23,105,255,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-zapla-blue2 hover:shadow-[0_20px_40px_-8px_rgba(23,105,255,0.75)] ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </a>
  );
}

function SecondaryButton({
  href,
  children,
  track,
  dark = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  track?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      data-track={track}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-[15px] font-extrabold transition-all duration-200 hover:-translate-y-0.5 ${
        dark
          ? "border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
          : "border border-zapla-line bg-white text-zapla-ink hover:border-[#b9c8db]"
      } ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  dark = false,
  accent,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  dark?: boolean;
  accent?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={`mx-auto mb-10 max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-[clamp(30px,3.6vw,46px)] font-black leading-[1.05] tracking-[-0.045em] ${
          dark ? "text-white" : "text-zapla-ink"
        }`}
      >
        {title}{" "}
        {accent && (
          <span className="font-zapla-display text-[1.08em] font-normal italic tracking-[-0.02em] bg-gradient-to-r from-zapla-blue-glow to-zapla-green-glow bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-[16.5px] leading-[1.55] ${
            dark ? "text-zapla-muted-dark" : "text-zapla-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function PricingPage() {
  return (
    <div className="min-h-screen bg-zapla-ink font-zapla text-white antialiased">
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
          ? "border-b border-white/10 bg-zapla-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-zapla-blue to-zapla-green text-[16px] font-black text-white shadow-[0_10px_24px_-6px_rgba(23,105,255,0.55)]">
            <span className="relative">Z</span>
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-700 group-hover:translate-x-full" />
          </div>
          <span className="text-[18px] font-black tracking-[-0.04em] text-white">Zapla</span>
        </a>
        <div className="flex items-center gap-6 text-[13.5px] font-bold text-white/70">
          <a className="hidden transition hover:text-white sm:inline" href="#pricing">
            Pricing
          </a>
          <a className="hidden transition hover:text-white sm:inline" href="#launch">
            Launch Pack
          </a>
          <a className="hidden transition hover:text-white md:inline" href="#customers">
            Customers
          </a>
          <a className="hidden transition hover:text-white md:inline" href="#faq">
            FAQ
          </a>
          <a
            href={BOOK_URL}
            data-track="nav_cta"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-[13px] font-extrabold text-zapla-ink transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-6px_rgba(255,255,255,0.35)]"
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
    <header
      id="top"
      className="relative overflow-hidden bg-zapla-ink pt-10 pb-24 sm:pt-16 sm:pb-32"
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-zapla-green/25 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -top-20 -left-32 h-[560px] w-[560px] rounded-full bg-zapla-blue/30 blur-[160px] zapla-orb-drift-slow" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-zapla-ink" />

      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="zapla-fade">
          <Eyebrow dark>Guided Launch Pricing</Eyebrow>
          <h1 className="mt-5 max-w-[720px] text-[clamp(44px,6vw,80px)] font-black leading-[0.95] tracking-[-0.05em] text-white">
            Run your whole business from{" "}
            <span className="relative whitespace-nowrap">
              <span className="font-zapla-display text-[1.08em] font-normal italic tracking-[-0.02em] zapla-shimmer-text">
                one system
              </span>
            </span>
            .
          </h1>
          <p className="mt-6 max-w-[560px] text-[18px] leading-[1.6] text-zapla-muted-dark">
            CRM, bookings, inbox, reviews, payments, mobile POS, documents, websites and AI
            follow-up in one flat-price platform — launched with you, with unlimited users and no
            per-seat pricing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href={BOOK_URL} track="hero_cta">
              Book a Call →
            </PrimaryButton>
            <SecondaryButton href="#pricing" track="hero_pricing" dark>
              See pricing
            </SecondaryButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Unlimited users",
              "No per-seat pricing",
              "Launched with you",
              "90-day rollout",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12px] font-bold text-white/70 backdrop-blur-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <HeroMock />
      </div>
    </header>
  );
}

function HeroMock() {
  const ref = useReveal<HTMLDivElement>();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  const customers = useCountUp(1248, inView);
  const bookings = useCountUp(36, inView);
  const payments = useCountUp(18, inView);
  const ai = useCountUp(24, inView);

  return (
    <div ref={ref} className="zapla-reveal relative">
      <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-zapla-blue/30 via-transparent to-zapla-green/30 blur-2xl" />
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-zapla-ink2 to-zapla-ink p-5 shadow-zapla-dark sm:p-6">
        <div className="pointer-events-none absolute inset-0 zapla-grid-bg opacity-40" />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between text-[12px] font-black text-white/80">
            <span className="inline-flex items-center gap-2 uppercase tracking-[0.12em]">
              <span className="h-2 w-2 rounded-full bg-zapla-green zapla-pulse-dot" />
              Live system
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] tracking-[0.08em] text-white/60">
              zapla.io
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Customers", v: customers.toLocaleString(), s: "records & history" },
              { k: "Bookings", v: bookings.toString(), s: "this week" },
              { k: "Payments", v: `A$${payments}k`, s: "this month" },
              { k: "AI follow-up", v: ai.toString(), s: "conversations" },
            ].map((t) => (
              <div
                key={t.k}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-zapla-blue/20 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <small className="block text-[10.5px] font-black uppercase tracking-[0.12em] text-white/50">
                  {t.k}
                </small>
                <b className="mt-2 block text-[26px] font-black tracking-[-0.04em] text-white">
                  {t.v}
                </b>
                <span className="text-[12px] text-white/50">{t.s}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-1.5 rounded-2xl border border-white/10 bg-black/30 p-2.5">
            {["Capture", "Manage", "Get paid", "Grow"].map((s, i, arr) => (
              <div key={s} className="flex flex-1 items-center gap-1.5">
                <div className="flex-1 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] py-2.5 text-center text-[11.5px] font-black uppercase tracking-[0.08em] text-white/85">
                  {s}
                </div>
                {i < arr.length - 1 && (
                  <span className="text-zapla-green/60 text-[13px]">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Guided Strip (light band)                                          */
/* ------------------------------------------------------------------ */

function GuidedStrip() {
  return (
    <section className="relative bg-zapla-bg py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg-light opacity-40" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Guided Launch</Eyebrow>
          <h2 className="mt-4 text-[clamp(26px,3vw,38px)] font-black leading-[1.1] tracking-[-0.04em] text-zapla-ink">
            Zapla,{" "}
            <span className="font-zapla-display text-[1.1em] font-normal italic bg-gradient-to-r from-zapla-blue to-zapla-green bg-clip-text text-transparent">
              launched properly
            </span>{" "}
            around how your business actually runs.
          </h2>
        </Reveal>

        <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              n: "01",
              b: "Mapped",
              s: "Your workflow, team and customer journey — captured in one session.",
            },
            {
              n: "02",
              b: "Configured",
              s: "Pipelines, inbox, bookings, reviews and follow-up built in your system.",
            },
            {
              n: "03",
              b: "Rolled out",
              s: "Training and check-ins so the system actually gets used from day one.",
            },
          ].map((i, idx) => (
            <Reveal
              key={i.n}
              delay={idx * 120}
              className="group relative rounded-3xl border border-zapla-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-zapla-display text-[38px] italic leading-none text-zapla-blue">
                  {i.n}
                </span>
                <span className="h-px flex-1 ml-4 bg-gradient-to-r from-zapla-line to-transparent" />
              </div>
              <h3 className="text-[20px] font-black tracking-[-0.03em] text-zapla-ink">{i.b}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-zapla-muted">{i.s}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing (light)                                                    */
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
    <section id="pricing" className="relative bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Plans"
          title="Choose the path that fits"
          accent="your business"
          sub="Every plan includes unlimited users. The Launch Pack gets Zapla configured around how your business actually runs."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, idx) => (
            <Reveal
              key={p.name}
              delay={idx * 90}
              className={`group relative flex flex-col overflow-hidden rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-1 ${
                p.recommended
                  ? "border border-transparent bg-zapla-ink text-white shadow-[0_30px_60px_-15px_rgba(23,105,255,0.5)] md:-translate-y-2"
                  : "border border-zapla-line bg-white text-zapla-ink shadow-[0_10px_28px_rgba(23,35,57,0.045)] hover:border-zapla-blue/30 hover:shadow-zapla"
              }`}
            >
              {p.recommended && (
                <>
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-zapla-blue/40 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-zapla-green/25 blur-3xl" />
                  <div className="absolute right-5 top-5 z-10 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-black uppercase tracking-[0.1em] text-zapla-ink">
                    Recommended
                  </div>
                </>
              )}
              <div className="relative flex h-full flex-col">
                <h3
                  className={`text-[24px] font-black tracking-[-0.03em] ${
                    p.recommended ? "text-white" : "text-zapla-ink"
                  }`}
                >
                  {p.name}
                </h3>
                <p
                  className={`mt-2 min-h-[80px] text-[13.5px] leading-[1.55] lg:min-h-[96px] ${
                    p.recommended ? "text-white/70" : "text-zapla-muted"
                  }`}
                >
                  {p.fit}
                </p>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-[40px] font-black tracking-[-0.06em] ${
                        p.recommended ? "text-white" : "text-zapla-ink"
                      }`}
                    >
                      {p.price}
                    </span>
                    <span
                      className={`text-[13px] font-bold ${
                        p.recommended ? "text-white/60" : "text-zapla-muted"
                      }`}
                    >
                      {p.priceLabel}
                    </span>
                  </div>
                  <div
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-bold ${
                      p.recommended
                        ? "border border-white/15 bg-white/5 text-white/85"
                        : "bg-zapla-faint text-[#2f4056]"
                    }`}
                  >
                    <span className={p.recommended ? "text-zapla-green-glow" : "text-zapla-blue"}>
                      +
                    </span>
                    <b>{p.launch}</b>
                    <span className={p.recommended ? "text-white/50" : "text-zapla-muted"}>
                      Launch Pack
                    </span>
                  </div>
                </div>
                <ul className="mt-6 grid gap-2.5">
                  {p.features.map((f, i) => {
                    const isStack = i === 0 && f.startsWith("Everything");
                    return (
                      <li
                        key={f}
                        className={`relative pl-6 text-[13.5px] leading-[1.5] ${
                          p.recommended
                            ? isStack
                              ? "font-extrabold text-white"
                              : "text-white/75"
                            : isStack
                              ? "font-extrabold text-zapla-ink"
                              : "text-[#33435b]"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-0 font-black ${
                            isStack
                              ? p.recommended
                                ? "text-zapla-green-glow"
                                : "text-zapla-blue"
                              : p.recommended
                                ? "text-zapla-green-glow"
                                : "text-zapla-green"
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
                  <a
                    href={BOOK_URL}
                    data-track={p.track}
                    className="group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3.5 text-[15px] font-extrabold text-zapla-ink transition hover:-translate-y-0.5"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-zapla-blue/15 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                    <span className="relative">Book a Call →</span>
                  </a>
                ) : (
                  <SecondaryButton href={BOOK_URL} track={p.track} className="w-full">
                    Book a Call
                  </SecondaryButton>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-[760px] text-center text-[12.5px] text-zapla-muted">
          Prices are in AUD and exclude GST. SMS, AI voice, WhatsApp, domains, payment gateway/card
          fees, ad spend, third-party tools, complex migrations and custom build work may be
          separate. No lock-in after launch. Thirty days notice.
        </p>

        <div className="mx-auto mt-8 max-w-[1000px]">
          <button
            onClick={() => setOpenCompare((v) => !v)}
            className="mx-auto flex items-center gap-2.5 rounded-full border border-zapla-line bg-white px-5 py-3 text-[14px] font-black text-[#10253f] shadow-[0_8px_20px_rgba(20,34,58,0.05)] transition hover:-translate-y-0.5 hover:border-[#b9c8db]"
          >
            {openCompare ? "Hide full comparison" : "Compare all features"}
            <span
              className={`text-zapla-blue transition-transform ${openCompare ? "rotate-180" : ""}`}
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
    <div className="zapla-fade mt-4 overflow-auto rounded-[18px] border border-zapla-line bg-white shadow-zapla-sm">
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
            <tr key={i} className="transition-colors hover:bg-[#f8fbff]">
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

/* ------------------------------------------------------------------ */
/*  Calculator (dark)                                                  */
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
    <section
      id="calculator"
      className="relative overflow-hidden bg-zapla-ink py-16 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute -top-24 right-10 h-[420px] w-[420px] rounded-full bg-zapla-blue/25 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-[380px] w-[380px] rounded-full bg-zapla-green/20 blur-[140px] zapla-orb-drift-slow" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg opacity-50" />

      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          dark
          eyebrow="Opportunity"
          title="Estimate what better follow-up could"
          accent="recover"
          sub="Use your own numbers. Missed calls, slow replies, forgotten quotes, stale enquiries and old customers are often the easiest wins."
        />
        <Reveal className="grid gap-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:grid-cols-[1fr_0.9fr] md:p-8">
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
              <label className="mb-2 flex justify-between gap-3 text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-white/80">
                Average job or customer value (A$)
              </label>
              <input
                type="number"
                value={jobval}
                min={0}
                step={10}
                onChange={(e) => setJobval(Number(e.target.value) || 0)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[16px] font-extrabold text-white outline-none transition focus:border-zapla-blue-glow focus:bg-white/[0.06]"
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
          <div className="relative flex flex-col justify-center overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-zapla-blue/20 via-zapla-ink2 to-zapla-ink3 p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-zapla-green/25 blur-3xl" />
            <div className="relative">
              <div className="text-[11.5px] font-black uppercase tracking-[0.12em] text-white/60">
                Recoverable opportunity / month
              </div>
              <div className="my-3 text-[clamp(42px,6vw,64px)] font-black leading-none tracking-[-0.06em] zapla-shimmer-text">
                {fmt(leak)}
              </div>
              <p className="mb-6 text-[14.5px] leading-[1.55] text-white/75">
                Recovering even 20% is worth <b className="text-white">{fmt(recover)}</b>/mo.
                Zapla Growth is <b className="text-white">A$499</b>
                {payback > 0 && recover > 499 ? (
                  <>
                    {" "}
                    — payback in ~
                    <b className="text-zapla-green-glow">{payback} weeks</b>.
                  </>
                ) : (
                  "."
                )}
              </p>
              <PrimaryButton href={BOOK_URL} track="calc_cta" className="w-full">
                Book a Call →
              </PrimaryButton>
            </div>
          </div>
          <p className="text-center text-[12px] text-white/40 md:col-span-2">
            Illustrative only, not a promise of results. The Guided Launch call maps your actual
            business before any recommendation.
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
      <label className="mb-2 flex justify-between gap-3 text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-white/80">
        <span>{label}</span>
        <output className="text-zapla-green-glow">{value}</output>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zapla-blue-glow"
      />
      {help && <small className="mt-1.5 block text-[12px] text-white/45">{help}</small>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Launch Pack (light)                                                */
/* ------------------------------------------------------------------ */

function LaunchPack() {
  const journey = [
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
  ];
  return (
    <section id="launch" className="relative bg-zapla-bg py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg-light opacity-40" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          eyebrow="Launch Pack"
          title="What your Launch Pack"
          accent="actually builds"
          sub="The Launch Pack is not a setup admin fee. It is the first build of your operating system, scoped by plan."
        />

        <div className="relative">
          {/* connecting line */}
          <div className="pointer-events-none absolute left-6 right-6 top-14 hidden h-px bg-gradient-to-r from-transparent via-zapla-blue/40 to-transparent lg:block" />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j, idx) => (
              <Reveal
                key={j.n}
                delay={idx * 100}
                className="group relative overflow-hidden rounded-2xl border border-zapla-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-zapla-blue/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-zapla-ink text-[14px] font-black text-white shadow-lg">
                    {j.n}
                  </div>
                  <b className="block text-[15px] font-black tracking-[-0.02em] text-zapla-ink">
                    {j.b}
                  </b>
                  <span className="mt-2 block text-[13px] leading-[1.55] text-zapla-muted">
                    {j.s}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-2">
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

        <p className="mt-6 rounded-2xl border border-zapla-line bg-white p-4 text-[13.5px] text-[#46556d]">
          <b>Website capture point:</b> a landing page, enquiry form, booking calendar, quote
          request, webchat or similar entry point connected to Zapla. Extra work is quoted before
          it starts.
        </p>
      </div>
    </section>
  );
}

function ScopeDetail({
  title,
  sub,
  items,
}: {
  title: string;
  sub?: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-zapla-line bg-white transition hover:border-[#b9c8db]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <div className="text-[15px] font-black tracking-[-0.02em] text-zapla-ink">{title}</div>
          {sub && <div className="mt-0.5 text-[13px] text-zapla-muted">{sub}</div>}
        </div>
        <span className="mt-1 text-[20px] font-bold leading-none text-zapla-blue">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-[14px] text-[#34435b] zapla-fade">
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

/* ------------------------------------------------------------------ */
/*  Customers (light)                                                  */
/* ------------------------------------------------------------------ */

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
    <section id="customers" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <Reveal className="max-w-xl">
            <Eyebrow>Customers</Eyebrow>
            <h2 className="mt-4 text-[clamp(28px,3.4vw,42px)] font-black leading-[1.05] tracking-[-0.045em] text-zapla-ink">
              Businesses that{" "}
              <span className="font-zapla-display text-[1.1em] font-normal italic bg-gradient-to-r from-zapla-blue to-zapla-green bg-clip-text text-transparent">
                achieve more
              </span>
            </h2>
            <p className="mt-3 text-[15.5px] text-zapla-muted">
              What Zapla recovers once it's launched properly around how a business actually
              operates.
            </p>
          </Reveal>
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
            <Reveal
              key={c.tag}
              delay={i * 100}
              className="group snap-start shrink-0 basis-[86%] overflow-hidden rounded-[24px] border border-zapla-line bg-white shadow-[0_10px_30px_rgba(20,34,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/30 hover:shadow-zapla sm:basis-[70%] lg:basis-[calc((100%-2rem)/3)]"
            >
              <article data-cust-card>
                <div className="relative aspect-[16/10] overflow-hidden bg-zapla-faint">
                  <div
                    className={`absolute inset-0 z-10 bg-gradient-to-br ${c.accent} mix-blend-multiply`}
                  />
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 z-20 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-zapla-ink shadow-sm">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div>
                    <div className="font-zapla-display text-[56px] italic leading-none tracking-[-0.03em] text-zapla-ink">
                      {c.metric}
                    </div>
                    <div className="mt-1 text-[13px] font-bold uppercase tracking-[0.08em] text-zapla-muted">
                      {c.label}
                    </div>
                  </div>
                  <blockquote className="text-[15px] leading-[1.55] text-[#26364f]">
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
              </article>
            </Reveal>
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
        <p className="mt-4 text-center text-[11.5px] uppercase tracking-[0.12em] text-zapla-muted">
          Illustrative examples — real case studies coming soon.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Pillars (dark band)                                                */
/* ------------------------------------------------------------------ */

function Pillars() {
  const pillars = [
    {
      h: "Manage customers",
      p: "Records, pipelines, notes, tasks and documents in one place.",
      tags: ["CRM", "Pipelines", "Documents", "Reporting"],
    },
    {
      h: "Book & communicate",
      p: "Inbox, chat, SMS, email, calendars and reminders — around the customer.",
      tags: ["Inbox", "Bookings", "SMS", "Email", "AI chat"],
    },
    {
      h: "Get paid",
      p: "Invoices, payment links, recurring payments and mobile POS.",
      tags: ["Payments", "Invoices", "Mobile POS", "Catalogue"],
    },
    {
      h: "Grow & follow up",
      p: "Capture leads, request reviews, automate follow-up and reactivate.",
      tags: ["Reviews", "Forms", "Funnels", "Automation", "Reactivation"],
    },
  ];
  return (
    <section
      id="replaces"
      className="relative overflow-hidden bg-zapla-ink py-16 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-zapla-blue/15 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg opacity-50" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <SectionHead
          dark
          eyebrow="Operating stack"
          title="One system"
          accent="replaces the stack"
          sub="Instead of disconnected tools, logins and customer records — one operating system."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, idx) => (
            <Reveal
              key={p.h}
              delay={idx * 90}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-zapla-blue/25 opacity-0 blur-2xl transition group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-[18px] font-black tracking-[-0.02em] text-white">{p.h}</h3>
                <p className="mt-2 text-[13.5px] leading-[1.55] text-white/60">{p.p}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-extrabold text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-8 max-w-[820px] rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center text-[14.5px] text-white/75 backdrop-blur-md">
          Bought separately, a comparable stack reaches{" "}
          <b className="text-white">A$1,500 to A$2,500+ a month</b> once seats, contacts, payments,
          messaging, reviews, websites, AI and extra tools add up.
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Add-ons (light)                                                    */
/* ------------------------------------------------------------------ */

function Addons() {
  const addons = [
    {
      h: "AI Receptionist",
      p: "AI answers calls, qualifies enquiries, takes details or routes calls where configured.",
      price: "From A$449/mo from Growth. Setup quoted.",
    },
    {
      h: "Ghost-to-Gold Campaign",
      p: "Reactivate old leads, past customers or cold quote lists with a structured campaign.",
      price: "Campaign sprint from A$1,500 + usage.",
    },
    {
      h: "Extra capacity or build",
      p: "Extra contacts, locations, integrations, reporting, workflows or custom pages.",
      price: "Quoted based on scope.",
    },
  ];
  return (
    <section id="addons" className="bg-zapla-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
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
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-zapla-blue/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-[20px] font-black tracking-[-0.03em] text-zapla-ink">{a.h}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-zapla-muted">{a.p}</p>
                <div className="mt-5 border-t border-zapla-line pt-3 text-[13.5px] font-black text-zapla-ink">
                  {a.price}
                </div>
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
/*  Value grid (light)                                                 */
/* ------------------------------------------------------------------ */

function ValueGrid() {
  const values = [
    {
      k: "Recover",
      h: "Missed enquiries",
      p: "Missed calls, forms, chat and social messages captured and followed up before they go cold.",
    },
    {
      k: "Convert",
      h: "Quoted work",
      p: "Quote reminders, tasks and follow-up workflows stop opportunities from sitting untouched.",
    },
    {
      k: "Save",
      h: "Admin time",
      p: "Bookings, reminders, payments, review requests and updates run through one connected system.",
    },
    {
      k: "Reactivate",
      h: "Old customers",
      p: "Past customers, cold quotes and stale leads organised into structured follow-up campaigns.",
    },
  ];
  return (
    <section id="value" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
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
              className="group relative overflow-hidden rounded-2xl border border-zapla-line bg-gradient-to-b from-white to-zapla-paper2 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zapla-blue/40 hover:shadow-zapla"
            >
              <div className="text-[11px] font-black uppercase tracking-[0.12em] text-zapla-blue">
                {v.k}
              </div>
              <h3 className="mt-3 text-[18px] font-black tracking-[-0.02em] text-zapla-ink">
                {v.h}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-zapla-muted">{v.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ (light)                                                        */
/* ------------------------------------------------------------------ */

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
      "Guided Launch means we help configure the system with you, train your team and get the first version live, instead of handing you another blank platform.",
    ],
  },
  {
    q: "What if I already use a CRM, website or booking system?",
    a: [
      "That is normal. Most businesses come to Zapla with tools already in place.",
      "The question is not whether you have software. It is whether your setup is connected, easy for the team to use, and helping you turn enquiries into booked work, paid invoices, reviews and repeat business.",
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
      "Zapla is not another system your team has to remember to update manually. The goal is to connect the daily workflow around enquiries, bookings, messages, follow-up, payments and reviews so the system supports how the team already works.",
      "Training and check-ins are included based on your plan, so adoption is part of the rollout.",
    ],
  },
  {
    q: "What about SMS usage?",
    a: [
      "Each plan includes monthly SMS credits for everyday follow-up. Extra SMS is 15c per segment, or prepaid packs from 10c per segment for planned volume.",
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
      "Extra costs only apply for extra usage, prepaid SMS packs, additional locations, custom workflows, integrations, managed campaigns, AI Receptionist, website rebuilds, domains, payment processing or third-party tools.",
      "Anything outside the agreed launch scope is quoted before work starts.",
    ],
  },
];

function Faq() {
  return (
    <section id="faq" className="bg-zapla-bg py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
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
    <div
      className={`self-start overflow-hidden rounded-2xl border bg-white transition ${
        open ? "border-zapla-blue/40 shadow-zapla-sm" : "border-zapla-line hover:border-[#b9c8db]"
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[14.5px] font-extrabold text-zapla-ink"
      >
        {q}
        <span
          className={`text-[20px] font-bold leading-none text-zapla-blue transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="space-y-3 px-5 pb-5 text-[14px] leading-[1.6] text-[#34435b] zapla-fade">
          {a.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA (dark)                                                   */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-zapla-ink py-28 text-white">
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg opacity-50" />
      <div className="pointer-events-none absolute -top-20 left-1/4 h-[520px] w-[520px] rounded-full bg-zapla-blue/30 blur-[160px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[520px] w-[520px] rounded-full bg-zapla-green/25 blur-[160px] zapla-orb-drift-slow" />
      <Reveal className="relative mx-auto max-w-[860px] px-5 text-center sm:px-8">
        <Eyebrow dark>Ready when you are</Eyebrow>
        <h2 className="mt-5 text-[clamp(34px,5vw,60px)] font-black leading-[1.02] tracking-[-0.05em] text-white">
          Let's launch Zapla{" "}
          <span className="font-zapla-display text-[1.1em] font-normal italic zapla-shimmer-text">
            around your business
          </span>
          .
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-[17px] leading-[1.6] text-white/70">
          Book a call. We'll map how your business runs, recommend the right plan, and show what
          should be launched first.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryButton href={BOOK_URL} track="final_cta">
            Book a Call →
          </PrimaryButton>
          <SecondaryButton href="#pricing" dark>
            Review pricing
          </SecondaryButton>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zapla-ink py-10 text-white/50">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 text-[13px] sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-zapla-blue to-zapla-green text-[12px] font-black text-white">
            Z
          </div>
          <span className="font-bold text-white">Zapla</span>
          <span>— AI operating system for growing businesses.</span>
        </div>
        <span>© {new Date().getFullYear()} Zapla. All rights reserved.</span>
      </div>
    </footer>
  );
}
