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

export const Route = createFileRoute("/")({
  component: PricingPage,
});

const BOOK_URL = "https://zapla.io/booking";

/* ------------------------------------------------------------------ */
/*  Hooks & primitives                                                 */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // If already in viewport at mount, show immediately with no animation flicker.
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh - 60) {
      el.classList.add("is-visible");
      return;
    }
    // Otherwise hide it and animate in when scrolled into view.
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    if (typeof IntersectionObserver === "undefined") {
      el.style.opacity = "";
      el.style.transform = "";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const t = e.target as HTMLElement;
            t.style.opacity = "";
            t.style.transform = "";
            t.classList.add("is-visible");
            io.unobserve(t);
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
      <SiteNav />
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
      <SiteFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Site Nav — replica of zapla.io header                              */
/* ------------------------------------------------------------------ */

const ZAPLA_LOGO =
  "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/9GCLMi9hEWTo5mWQUAFo/media/69c3771ac1440392b12c5779.png";

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<null | "products" | "resources">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls =
    "inline-flex items-center gap-1 text-[15px] font-medium text-zapla-ink/85 transition hover:text-zapla-blue";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zapla-line bg-white/90 backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* Logo */}
        <a href="https://zapla.io/" className="flex items-center">
          <img src={ZAPLA_LOGO} alt="Zapla" className="h-8 w-auto sm:h-9" />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          <a href="https://zapla.io/" className={linkCls}>Home</a>

          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("products")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className={linkCls} type="button">
              Products
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openMenu === "products" && (
              <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                  <a href="https://zapla.io/crm" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Zapla CRM</a>
                  <a href="https://zapla.io/vibe-studio" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Zapla Vibe Studio</a>
                </div>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("resources")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className={linkCls} type="button">
              Resources
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {openMenu === "resources" && (
              <div className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-zapla-line bg-white p-2 shadow-zapla">
                  <a href="https://zapla.io/blog" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Blog</a>
                  <a href="https://zapla.canny.io/feature-request" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Request feature</a>
                  <a href="https://zapla.io/comparison/zapla-vs-hubspot" className="block rounded-xl px-3 py-2 text-[14px] font-medium text-zapla-ink hover:bg-zapla-faint hover:text-zapla-blue">Compare</a>
                </div>
              </div>
            )}
          </div>

          <a href="https://zapla.io/pricing" className={linkCls}>Pricing</a>
          <a href="https://my.zapla.io/" className={linkCls}>Log In</a>
        </div>

        {/* CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://zapla.io/getstartedtrial"
            className="inline-flex items-center justify-center rounded-full border border-zapla-line bg-white px-4 py-2 text-[13px] font-bold text-zapla-ink transition hover:border-zapla-blue hover:text-zapla-blue"
          >
            Get Started Free
          </a>
          <a
            href="https://zapla.io/booking"
            className="inline-flex items-center justify-center rounded-full bg-zapla-blue px-4 py-2 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-zapla-blue2 hover:shadow-zapla-blue"
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-zapla-line bg-white text-zapla-ink lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zapla-line bg-white lg:hidden">
          <div className="mx-auto grid max-w-[1240px] gap-1 px-5 py-4 text-[15px] font-semibold text-zapla-ink">
            <a href="https://zapla.io/" className="py-2">Home</a>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2">Products<span className="text-zapla-muted group-open:rotate-180 transition">▾</span></summary>
              <div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
                <a href="https://zapla.io/crm" className="py-1.5">Zapla CRM</a>
                <a href="https://zapla.io/vibe-studio" className="py-1.5">Zapla Vibe Studio</a>
              </div>
            </details>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2">Resources<span className="text-zapla-muted group-open:rotate-180 transition">▾</span></summary>
              <div className="ml-3 grid gap-1 pb-2 text-[14px] text-zapla-muted">
                <a href="https://zapla.io/blog" className="py-1.5">Blog</a>
                <a href="https://zapla.canny.io/feature-request" className="py-1.5">Request feature</a>
                <a href="https://zapla.io/comparison/zapla-vs-hubspot" className="py-1.5">Compare</a>
              </div>
            </details>
            <a href="https://zapla.io/pricing" className="py-2">Pricing</a>
            <a href="https://my.zapla.io/" className="py-2">Log In</a>
            <div className="mt-2 grid gap-2">
              <a href="https://zapla.io/getstartedtrial" className="inline-flex items-center justify-center rounded-full border border-zapla-line bg-white px-4 py-2.5 text-[13px] font-extrabold text-zapla-ink">Get Started Free</a>
              <a href="https://zapla.io/booking" className="inline-flex items-center justify-center rounded-full bg-zapla-blue px-4 py-2.5 text-[13px] font-extrabold text-white">Book a Demo</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Site Footer — replica of zapla.io footer                            */
/* ------------------------------------------------------------------ */

function SiteFooter() {
  const socials = [
    { href: "https://facebook.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/facebook-dark.svg", alt: "Facebook" },
    { href: "https://instagram.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/instagram-dark.svg", alt: "Instagram" },
    { href: "https://linkedin.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/linkedin-dark.svg", alt: "LinkedIn" },
    { href: "https://youtube.com/", icon: "https://stcdn.leadconnectorhq.com/funnel/icons/dark/youtube-dark.svg", alt: "YouTube" },
  ];
  const link = "text-[14px] font-medium text-zapla-muted transition hover:text-zapla-blue";
  return (
    <footer className="border-t border-zapla-line bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand + reviews */}
          <div>
            <a href="https://zapla.io/" className="inline-flex items-center">
              <img src={ZAPLA_LOGO} alt="Zapla" className="h-9 w-auto" />
            </a>
            <div className="mt-6 grid gap-3">
              <a
                href="https://www.trustpilot.com/review/zapla.io"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-zapla-line bg-zapla-faint px-3.5 py-1.5 text-[13px] font-bold text-zapla-ink hover:border-zapla-blue"
              >
                <span className="text-[#00b67a]">★</span> Review us on Trustpilot
              </a>
              <a
                href="https://www.g2.com/products/zapla-zapla/reviews/new"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-zapla-line bg-zapla-faint px-3.5 py-1.5 text-[13px] font-bold text-zapla-ink hover:border-zapla-blue"
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#ff492c] text-[10px] font-black text-white">G2</span>
                Review us on G2
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.alt} href={s.href} aria-label={s.alt} className="grid h-9 w-9 place-items-center rounded-full border border-zapla-line bg-white transition hover:border-zapla-blue">
                  <img src={s.icon} alt="" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-[12px] font-black uppercase tracking-[0.14em] text-zapla-ink">Company</h4>
            <ul className="grid gap-2.5">
              <li><a className={link} href="https://zapla.io/getstartedtrial">Get Started Free</a></li>
              <li><a className={link} href="https://zapla.io/booking">Book a Demo</a></li>
              <li><a className={link} href="https://zapla.io/pricing">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-[12px] font-black uppercase tracking-[0.14em] text-zapla-ink">Resources</h4>
            <ul className="grid gap-2.5">
              <li><a className={link} href="https://zapla.io/blog">Blog</a></li>
              <li><a className={link} href="https://zapla.canny.io/feature-request">Request feature</a></li>
              <li><a className={link} href="https://zapla.io/terms-and-conditions">Terms &amp; conditions</a></li>
              <li><a className={link} href="https://zapla.io/privacy-policy">Privacy policy</a></li>
              <li><a className={link} href="https://zapla.io/refund-policy">Refund policy</a></li>
              <li><a className={link} href="mailto:hello@zapla.io">Contact us</a></li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="mb-4 text-[12px] font-black uppercase tracking-[0.14em] text-zapla-ink">Compare</h4>
            <ul className="grid gap-2.5">
              <li><a className={link} href="https://zapla.io/comparison/zapla-vs-hubspot">Zapla Vs Hubspot</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zapla-line pt-6 text-[12.5px] text-zapla-muted2">
          © {new Date().getFullYear()} Zapla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — badge, gradient title, CTA, trust ticks, 6-card stack       */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-zapla-bg pt-10 pb-4 sm:pt-14 sm:pb-6">
      {/* soft brand orbs */}
      <div className="pointer-events-none absolute -top-40 -right-24 h-[420px] w-[420px] rounded-full bg-zapla-violet/12 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-zapla-cyan/16 blur-[140px] zapla-orb-drift-slow" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg-light opacity-40" />

      <div className="relative mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <div className="zapla-fade">
          {/* Badge */}
          <span className="hero-badge inline-block rounded-full border border-white/70 bg-white/50 px-6 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-zapla-blue2 shadow-zapla-sm backdrop-blur">
            Beyond CRM · Beyond Marketing · Beyond Limits
          </span>

          {/* Title */}
          <h1 className="mx-auto mt-8 max-w-[1000px] font-light text-zapla-ink text-[clamp(38px,5.6vw,64px)] leading-[1.1] tracking-[-0.02em]">
            One Platform.{" "}
            <span className="hero-title-highlight font-bold">Unlimited Users.</span>
            <br className="hidden sm:inline" />{" "}
            No Per-Seat Pricing. Ever.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-[680px] text-[clamp(15px,1.6vw,18px)] leading-[1.6] text-zapla-muted">
            Replace your CRM, marketing, SMS, and sales tools with one AI-powered platform
            built for AU &amp; SG businesses. No tool juggling. No per-seat surprises.
          </p>

          {/* CTA */}
          <div className="mt-9 flex justify-center">
            <a href={BOOK_URL} className="hero-cta group">
              <span className="hero-cta-text">Book a Call</span>
              <span className="hero-cta-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Trust ticks */}
          <div className="mt-6 flex flex-wrap justify-center gap-x-7 gap-y-3 text-[13.5px] text-zapla-muted">
            {["14 Day Free Trial", "No Credit Card Required", "Cancel Anytime"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-zapla-green text-white">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 6-card rotating stack */}
        <HeroCardStack />
      </div>

      {/* Scoped hero styles */}
      <style>{`
        .hero-title-highlight {
          background: linear-gradient(135deg, #00d4ff 0%, #091eff 50%, #9500ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          position: relative;
          display: inline-block;
        }
        .hero-title-highlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00d4ff 0%, #091eff 50%, #9500ff 100%);
          filter: blur(22px);
          opacity: 0.28;
          z-index: -1;
        }
        .hero-badge {
          background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 50%, rgba(147,197,253,0.25) 100%);
          box-shadow: 0 8px 32px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.6);
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s;
        }
        .hero-badge:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 40px rgba(59,130,246,0.25), inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .hero-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 240px;
          height: 60px;
          padding: 0 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          font-size: 1.05rem;
          font-weight: 600;
          text-decoration: none;
          overflow: visible;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 10px 30px rgba(59,130,246,0.35);
        }
        .hero-cta:hover {
          transform: translateY(-2px);
          background: white;
          box-shadow: 0 18px 44px rgba(59,130,246,0.4);
        }
        .hero-cta-text {
          position: relative;
          z-index: 2;
          margin-right: 44px;
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-cta:hover .hero-cta-text {
          color: #2563ff;
          transform: translateX(14px);
        }
        .hero-cta-circle {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: white;
          color: #2563ff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-cta:hover .hero-cta-circle {
          right: 8px;
          transform: translateY(-50%) translateX(60px);
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
        }

        /* Card stack ------------------------------------------------- */
        .hero-stack {
          position: relative;
          margin: 60px auto 0;
          width: 100%;
          max-width: 1080px;
          height: 640px;
          perspective: 1200px;
        }
        .hero-stack-card {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.88) 100%);
          border: 1.5px solid rgba(255,255,255,0.9);
          box-shadow: 0 24px 60px -18px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.7);
          backdrop-filter: blur(14px);
          padding: 32px 36px;
          overflow: hidden;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      clip-path 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .hero-stack-card[data-pos="0"] { transform: translateX(0) translateY(0) scale(1); z-index: 6; opacity: 1; clip-path: none; }
        .hero-stack-card[data-pos="1"] { transform: translateX(-58px) translateY(20px) scale(0.96); z-index: 5; opacity: 0.9; clip-path: inset(0 34% 0 0 round 20px); }
        .hero-stack-card[data-pos="2"] { transform: translateX(-116px) translateY(40px) scale(0.92); z-index: 4; opacity: 0.75; clip-path: inset(0 40% 0 0 round 20px); }
        .hero-stack-card[data-pos="3"] { transform: translateX(-174px) translateY(60px) scale(0.88); z-index: 3; opacity: 0.6; clip-path: inset(0 46% 0 0 round 20px); }
        .hero-stack-card[data-pos="4"] { transform: translateX(-232px) translateY(80px) scale(0.84); z-index: 2; opacity: 0.45; clip-path: inset(0 52% 0 0 round 20px); }
        .hero-stack-card[data-pos="5"] { transform: translateX(-290px) translateY(100px) scale(0.80); z-index: 1; opacity: 0.3;  clip-path: inset(0 58% 0 0 round 20px); }
        .hero-stack-nav {
          position: absolute;
          bottom: -44px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
        }
        .hero-stack-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: rgba(148,163,184,0.5);
          transition: all 0.3s;
          cursor: pointer;
          border: none; padding: 0;
        }
        .hero-stack-dot.active {
          background: #2563ff;
          transform: scale(1.25);
          box-shadow: 0 0 0 4px rgba(37,99,255,0.15);
        }

        @media (max-width: 900px) {
          .hero-stack { height: 520px; }
          .hero-stack-card { padding: 22px 22px; }
          .hero-stack-card[data-pos="1"] { transform: translateX(-40px) translateY(15px) scale(0.96); }
          .hero-stack-card[data-pos="2"] { transform: translateX(-80px) translateY(30px) scale(0.92); }
          .hero-stack-card[data-pos="3"] { transform: translateX(-120px) translateY(45px) scale(0.88); }
          .hero-stack-card[data-pos="4"] { transform: translateX(-160px) translateY(60px) scale(0.84); }
          .hero-stack-card[data-pos="5"] { transform: translateX(-200px) translateY(75px) scale(0.80); }
        }
        @media (max-width: 640px) {
          .hero-stack { height: 460px; }
          .hero-cta { width: 100%; max-width: 300px; }
        }
      `}</style>
    </header>
  );
}

/* -------- Card stack orchestrator ---------------------------------- */

const HERO_CARDS = [
  { title: "Pipeline Management", color: "#22c55e", Body: CardPipeline },
  { title: "Control Dashboard", color: "#2563ff", Body: CardDashboard },
  { title: "Intelligent Automation Workflow", color: "#f97316", Body: CardAutomation },
  { title: "Performance Tracking & Analysis", color: "#8b5cf6", Body: CardPerformance },
  { title: "Advanced Multi-Calendar Booking", color: "#eab308", Body: CardCalendar },
  { title: "Dynamic Smart Tagging", color: "#14b8a6", Body: CardTagging },
] as const;

function HeroCardStack() {
  const [front, setFront] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setFront((f) => (f + 1) % HERO_CARDS.length), 4200);
    return () => window.clearInterval(id);
  }, []);

  const posOf = (idx: number) => (idx - front + HERO_CARDS.length) % HERO_CARDS.length;

  return (
    <div className="hero-stack">
      {HERO_CARDS.map(({ title, color, Body }, i) => {
        const pos = posOf(i);
        return (
          <div
            key={title}
            className="hero-stack-card"
            data-pos={pos}
            onClick={() => setFront(i)}
            aria-hidden={pos !== 0}
          >
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white font-black text-[20px] leading-none"
                style={{ background: color }}
              >
                Z
              </span>
              <span className="text-[22px] font-extrabold tracking-[-0.02em] text-zapla-ink">
                {title}
              </span>
            </div>
            <div className="h-[calc(100%-72px)] w-full overflow-hidden">
              <Body />
            </div>
          </div>
        );
      })}

      <div className="hero-stack-nav" role="tablist" aria-label="Feature cards">
        {HERO_CARDS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-stack-dot ${i === front ? "active" : ""}`}
            onClick={() => setFront(i)}
            aria-label={`Show card ${i + 1}`}
            aria-selected={i === front}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}

/* -------- Card 1 : Pipeline (kanban) ------------------------------- */
function CardPipeline() {
  const columns = [
    { name: "Lead Engaged",    color: "#ef4444", count: 4, value: "A$7,500",  leads: [
      { n: "Sophie Delgado", src: "Facebook Ad",  v: "A$1,500" },
      { n: "Marcus Delgado", src: "Facebook Ad",  v: "A$2,500" },
      { n: "Marcus Blake",   src: "Facebook Ad",  v: "A$2,500" },
    ]},
    { name: "Demo Scheduled",  color: "#f59e0b", count: 3, value: "A$32,800", leads: [
      { n: "Sophie White",   src: "Online",       v: "A$4,500" },
      { n: "Liam Carter",    src: "Referral",     v: "A$16,800", tinted: true },
      { n: "Jordan Blake",   src: "FB Campaign",  v: "A$11,500" },
    ]},
    { name: "Negotiation",     color: "#3b82f6", count: 2, value: "A$6,000",  leads: [
      { n: "Jordan Delgado", src: "Instagram DM", v: "A$5,000" },
      { n: "Marcus Lin",     src: "Facebook Ad",  v: "A$1,000" },
    ]},
    { name: "Contract Signed", color: "#10b981", count: 3, value: "A$9,000",  leads: [
      { n: "Jordan Carter",  src: "Instagram DM", v: "A$1,500" },
      { n: "Jordan Lin",     src: "Google",       v: "A$2,500" },
      { n: "Sophie Lin",     src: "Instagram DM", v: "A$5,000" },
    ]},
    { name: "Lead Gone Cold",  color: "#a855f7", count: 2, value: "A$10,000", leads: [
      { n: "Sophie Blake",   src: "Facebook Ad",  v: "A$5,000" },
      { n: "Marcus Romano",  src: "Instagram DM", v: "A$5,000" },
    ]},
  ];
  return (
    <div className="h-full w-full text-[10.5px] text-zapla-ink">
      {/* Top toolbar */}
      <div className="mb-3 flex items-center gap-3 border-b border-zapla-line pb-2">
        <span className="rounded-md bg-zapla-blue px-2 py-1 text-white font-semibold">Opportunities</span>
        <span className="text-zapla-muted">Pipelines</span>
        <span className="text-zapla-muted">Bulk Actions</span>
        <span className="ml-auto rounded-md bg-zapla-blue-soft px-2 py-1 font-semibold text-zapla-blue2">14 Opportunities · A$65,300</span>
      </div>
      <div className="grid grid-cols-5 gap-2 h-[calc(100%-40px)]">
        {columns.map((c) => (
          <div key={c.name} className="flex flex-col gap-1.5 overflow-hidden">
            <div className="rounded-md px-2 py-1.5 text-center font-bold text-white leading-tight" style={{ background: c.color }}>
              <div className="text-[10px]">{c.name}</div>
              <div className="text-[9px] font-medium opacity-90">{c.count} · {c.value}</div>
            </div>
            {c.leads.map((l) => (
              <div key={l.n} className={`rounded-md border p-1.5 leading-tight ${l.tinted ? "border-zapla-blue/40 bg-zapla-blue-soft shadow-zapla-blue" : "border-zapla-line bg-white"}`}>
                <div className="font-bold text-[10px]">{l.n}</div>
                <div className="mt-0.5 flex items-center justify-between gap-1">
                  <span className="truncate text-zapla-muted text-[9px]">{l.src}</span>
                  <span className="font-bold text-[9.5px]">{l.v}</span>
                </div>
                <div className="mt-1 flex gap-1">
                  {["#ef4444", "#f59e0b", "#3b82f6", "#10b981"].map((d) => (
                    <span key={d} className="h-1 w-3 rounded-sm opacity-60" style={{ background: d }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- Card 2 : Control Dashboard (stats + charts) --------------- */
function CardDashboard() {
  const Donut = ({ value, label, color = "#2563ff", pct = 100 }: { value: string; label: string; color?: string; pct?: number }) => {
    const c = 2 * Math.PI * 32;
    return (
      <div className="flex flex-col items-center">
        <svg width="86" height="86" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 40 40)" />
          <text x="40" y="45" textAnchor="middle" className="font-extrabold" fontSize="16" fill="#0a0a14">{value}</text>
        </svg>
        <div className="mt-1 text-[10px] text-zapla-muted">{label}</div>
      </div>
    );
  };
  const Tile = ({ label, value, sub, children }: { label: string; value: string; sub: string; children?: React.ReactNode }) => (
    <div className="rounded-lg border border-zapla-line bg-white/70 p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10.5px] text-zapla-muted">{label}</span>
        <span className="text-[9px] text-zapla-muted">All Pipelines ▾</span>
      </div>
      <div className="text-[22px] font-extrabold text-zapla-ink leading-none">{value}</div>
      <div className="mt-0.5 text-[9.5px] font-semibold text-zapla-green">↑ {sub}</div>
      {children}
    </div>
  );
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-3">
      <Tile label="Opportunity Status" value="15" sub="100% vs Last 31 Days">
        <div className="mt-2 flex justify-center"><Donut value="15" label="Open · 15" pct={92} /></div>
      </Tile>
      <Tile label="Opportunity Value" value="A$80.8K" sub="100% vs Last 31 Days">
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-[9px] text-zapla-muted"><span>Open</span><span>A$80K</span></div>
          <div className="h-2 rounded-full bg-zapla-line overflow-hidden">
            <div className="h-full rounded-full" style={{ width: "78%", background: "linear-gradient(90deg,#22d3ee,#2563ff)" }} />
          </div>
          <div className="mt-2 text-center text-[9.5px] text-zapla-muted">Total revenue <span className="font-bold text-zapla-ink">A$80.8K</span></div>
        </div>
      </Tile>
      <Tile label="Conversion Rate" value="A$0" sub="0% vs Last 31 Days">
        <div className="mt-2 flex justify-center"><Donut value="0%" label="Won revenue · A$0" color="#e5e7eb" pct={4} /></div>
      </Tile>
      <div className="col-span-2 rounded-lg border border-zapla-line bg-white/70 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10.5px] text-zapla-muted">Funnel</span>
          <span className="text-[9px] text-zapla-muted">Sales Pipeline ▾</span>
        </div>
        {[
          { l: "New Lead",        v: "A$80.8K", pct: 100, c: "#2563ff" },
          { l: "Lead Engaged",    v: "A$40K",   pct: 66,  c: "#22c55e" },
          { l: "Demo Scheduled",  v: "A$37.5K", pct: 55,  c: "#f59e0b" },
          { l: "Negotiation",     v: "A$30K",   pct: 40,  c: "#a855f7" },
          { l: "Contract Signed", v: "A$25K",   pct: 33,  c: "#ef4444" },
        ].map((r) => (
          <div key={r.l} className="mb-1.5">
            <div className="mb-0.5 flex justify-between text-[9.5px]">
              <span className="font-semibold text-zapla-ink">{r.l}</span>
              <span className="text-zapla-muted">{r.v}</span>
            </div>
            <div className="h-1.5 rounded-full bg-zapla-line overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.c }} />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-zapla-line bg-white/70 p-3 flex flex-col items-center justify-center">
        <div className="text-[10.5px] text-zapla-muted mb-1">Stage Distribution</div>
        <Donut value="15" label="" color="#2563ff" pct={78} />
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px]">
          {[["#2563ff","New Lead"],["#22c55e","Engaged"],["#f59e0b","Demo"],["#a855f7","Negotiation"]].map(([c,l]) => (
            <span key={l} className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{ background: c }} />{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------- Card 3 : Automation Workflow ----------------------------- */
function CardAutomation() {
  const Node = ({ icon, title, sub, tint = "border-zapla-line bg-white", ring }: { icon: string; title: string; sub?: string; tint?: string; ring?: string }) => (
    <div className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm ${tint} ${ring ?? ""}`} style={ring ? { boxShadow: `0 0 0 2px ${ring}` } : undefined}>
      <span className="text-[14px]">{icon}</span>
      <div className="text-left leading-tight">
        <div className="text-[11px] font-bold text-zapla-ink">{title}</div>
        {sub && <div className="text-[9px] text-zapla-muted">{sub}</div>}
      </div>
    </div>
  );
  const Plus = () => (
    <div className="mx-auto my-1 flex h-4 w-4 items-center justify-center rounded-full border border-zapla-line bg-white text-[10px] text-zapla-muted">+</div>
  );
  return (
    <div className="grid h-full grid-cols-[1fr_180px] gap-4">
      {/* Flow */}
      <div className="flex flex-col items-center justify-start pt-1 text-center">
        <Node icon="✓" title="Trigger" sub="Facebook — Comments On A Post" tint="border-zapla-green/40 bg-zapla-green-soft" />
        <Plus />
        <Node icon="✨" title="#1 Comment Response" ring="#a855f7" />
        <Plus />
        <Node icon="💬" title="Respond On Comment" />
        <Plus />
        <Node icon="✨" title="#2 Analyse Comment Sentiment" ring="#22c55e" />
        <Plus />
        <Node icon="{ }" title="Condition" />
        {/* branches */}
        <div className="mt-2 flex w-full items-start justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">▲ Positive</span>
            <div className="my-1 h-3 w-px bg-zapla-line" />
            <Node icon="✓" title="Facebook" sub="Interactive Messenger" />
          </div>
          <div className="flex flex-col items-center">
            <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600">▲ Negative</span>
            <div className="my-1 h-3 w-px bg-zapla-line" />
            <div className="rounded-md border border-zapla-line bg-white px-3 py-1.5 text-[10px] font-bold text-zapla-muted">END</div>
          </div>
        </div>
      </div>
      {/* Actions sidebar */}
      <div className="rounded-lg border border-zapla-line bg-white/70 p-2.5">
        <div className="text-[11px] font-bold text-zapla-ink">Actions</div>
        <div className="text-[9px] text-zapla-muted">Pick an action for this step</div>
        <div className="mt-2 rounded-md border border-zapla-line bg-zapla-faint px-2 py-1 text-[9.5px] text-zapla-muted">🔍 Search</div>
        <div className="mt-2 space-y-1.5 text-[10px]">
          {[
            ["📅", "Appointment Booking AI Bot"],
            ["🔄", "Update Conversation AI Bot"],
            ["📖", "Book Appointment"],
            ["📞", "Log External Call"],
            ["💬", "WhatsApp"],
            ["🖼️", "WhatsApp Media"],
          ].map(([i, l]) => (
            <div key={l} className="flex items-center gap-2 rounded-md border border-zapla-line bg-white px-2 py-1.5">
              <span>{i}</span><span className="truncate font-medium text-zapla-ink">{l}</span>
            </div>
          ))}
          <div className="pt-1 text-[9px] font-bold uppercase tracking-wider text-zapla-muted">Send Data</div>
          {[["🔗","Webhook"],["🔗","Custom Webhook"],["📊","Google Sheets"]].map(([i,l]) => (
            <div key={l} className="flex items-center gap-2 rounded-md border border-zapla-line bg-white px-2 py-1.5">
              <span>{i}</span><span className="truncate font-medium text-zapla-ink">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------- Card 4 : Performance Tracking (email marketing) ---------- */
function CardPerformance() {
  return (
    <div className="grid h-full grid-cols-[1fr_180px] gap-3">
      <div className="flex flex-col gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-zapla-line pb-1.5">
          <span className="text-[11px] text-zapla-muted">Statistics</span>
          <span className="rounded-md bg-zapla-violet px-2 py-0.5 text-[11px] font-semibold text-white">Campaigns</span>
          <span className="text-[11px] text-zapla-muted">Templates</span>
          <span className="ml-auto text-[10px] text-zapla-muted">Jul 31 — Aug 06</span>
        </div>
        {/* Stacked bar chart */}
        <div className="rounded-lg border border-zapla-line bg-white/70 p-3">
          <div className="mb-1 text-[10.5px] font-semibold text-zapla-ink">Engagement Summary</div>
          <div className="text-[9px] text-zapla-muted">How recipients interact — opens, clicks, orders</div>
          <div className="mt-2 flex h-[90px] items-end gap-6 px-3">
            {[
              { l: "Delivered", h: [70, 20, 12] },
              { l: "Opened",    h: [30, 22, 14] },
              { l: "Clicked",   h: [10, 8, 4] },
              { l: "Ordered",   h: [3, 2, 1] },
            ].map((c) => (
              <div key={c.l} className="flex flex-1 flex-col items-center">
                <div className="flex w-full flex-col items-center">
                  {c.h.map((h, i) => (
                    <div key={i} className="w-6" style={{ height: h, background: ["#22d3ee","#a855f7","#ec4899"][i] }} />
                  ))}
                </div>
                <div className="mt-1 text-[9px] text-zapla-muted">{c.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-center gap-3 text-[9px]">
            {[["#22d3ee","Email"],["#a855f7","Workflow"],["#ec4899","Bulk Action"]].map(([c,l])=>(
              <span key={l} className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm" style={{background:c}}/>{l}</span>
            ))}
          </div>
        </div>
        {/* Line chart */}
        <div className="rounded-lg border border-zapla-line bg-white/70 p-3 flex-1">
          <div className="mb-1 flex items-center justify-between">
            <div>
              <div className="text-[10.5px] font-semibold text-zapla-ink">Open Rate (All Campaigns)</div>
              <div className="text-[22px] font-extrabold text-zapla-ink leading-none">45.95%</div>
            </div>
            <div className="text-[9px] text-zapla-muted">Open Rate ▾</div>
          </div>
          <svg viewBox="0 0 220 60" className="w-full h-[70px]">
            <defs>
              <linearGradient id="lc" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,45 L40,32 L80,25 L120,20 L160,18 L200,22 L220,20 L220,60 L0,60 Z" fill="url(#lc)" />
            <path d="M0,45 L40,32 L80,25 L120,20 L160,18 L200,22 L220,20" fill="none" stroke="#ec4899" strokeWidth="1.8" />
            <path d="M0,50 L40,42 L80,35 L120,30 L160,28 L200,30 L220,28" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
            {[0,40,80,120,160,200].map((x,i)=>(<circle key={i} cx={x} cy={[45,32,25,20,18,22][i]} r="1.8" fill="#ec4899" />))}
          </svg>
          <div className="mt-1 flex justify-between text-[8.5px] text-zapla-muted">
            {["07/31","08/01","08/02","08/03","08/04","08/05"].map(d=>(<span key={d}>{d}</span>))}
          </div>
        </div>
      </div>
      {/* KPI stack */}
      <div className="rounded-lg border border-zapla-line bg-white/70 p-3">
        <div className="text-[10.5px] font-semibold text-zapla-ink">Performance Analysis</div>
        <div className="text-[9px] text-zapla-muted mb-2">Trends by metric over time</div>
        {[
          { l: "EMAIL DELIVERED", v: "21,630", c: "#22c55e" },
          { l: "BOUNCED",         v: "268",    c: "#f59e0b" },
          { l: "UNSUBSCRIBED",    v: "44",     c: "#ec4899" },
          { l: "SPAM COMPLAINTS", v: "5",      c: "#ef4444" },
        ].map((k) => (
          <div key={k.l} className="mb-1.5 border-t border-zapla-line pt-1.5 first:border-0 first:pt-0">
            <div className="text-[8.5px] font-bold uppercase tracking-wider text-zapla-muted">{k.l}</div>
            <div className="text-[18px] font-extrabold text-zapla-ink leading-tight">{k.v}</div>
            <div className="mt-0.5 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${k.c}, ${k.c}55)` }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- Card 5 : Multi-Calendar Booking -------------------------- */
function CardCalendar() {
  const days = ["SUN 10","MON 11","TUE 12","WED 13","THU 14","FRI 15","SAT 16"];
  type Appt = { d: number; top: number; h: number; c: string; t: string; n: string };
  const appts: Appt[] = [
    { d: 2, top: 4,  h: 26, c: "#ef4444", t: "11:30 AM",   n: "Heather Morris" },
    { d: 0, top: 34, h: 22, c: "#d946ef", t: "12:00 PM",   n: "Austin Gill" },
    { d: 1, top: 34, h: 22, c: "#22d3ee", t: "12:00 PM",   n: "Stephanie Campbell" },
    { d: 2, top: 40, h: 22, c: "#22c55e", t: "12:30 PM",   n: "Antonio Velasquez" },
    { d: 3, top: 30, h: 18, c: "#f59e0b", t: "11:30 AM",   n: "Heather" },
    { d: 4, top: 40, h: 22, c: "#ec4899", t: "12:30 PM",   n: "Clayton Wells" },
    { d: 1, top: 58, h: 20, c: "#3b82f6", t: "01:00 PM",   n: "Paul Benslay" },
    { d: 3, top: 58, h: 20, c: "#0ea5e9", t: "02:30 PM",   n: "Courtney Thomas" },
    { d: 4, top: 60, h: 18, c: "#a855f7", t: "03:30 PM",   n: "Zachary Martin" },
    { d: 1, top: 82, h: 16, c: "#f97316", t: "03:30 PM",   n: "Dean Duncan" },
    { d: 0, top: 82, h: 16, c: "#f59e0b", t: "05:00 PM",   n: "Chad Perry" },
    { d: 2, top: 82, h: 16, c: "#10b981", t: "04:30 PM",   n: "Jessica Smith" },
    { d: 3, top: 82, h: 16, c: "#3b82f6", t: "05:00 PM",   n: "Christopher P." },
  ];
  return (
    <div className="h-full text-[10px]">
      {/* Toolbar */}
      <div className="mb-2 flex items-center gap-3 border-b border-zapla-line pb-1.5">
        <span className="text-zapla-blue font-semibold border-b-2 border-zapla-blue pb-0.5">Calendar View</span>
        <span className="text-zapla-muted">Appointment List</span>
        <span className="ml-auto rounded-md bg-zapla-blue px-2 py-0.5 text-white font-semibold">+ New</span>
        <span className="rounded-md bg-zapla-blue-soft px-2 py-0.5 font-semibold text-zapla-blue2">Week</span>
      </div>
      {/* Grid header */}
      <div className="grid grid-cols-[36px_repeat(7,1fr)] gap-1">
        <div />
        {days.map((d) => (
          <div key={d} className="text-center leading-tight">
            <div className="text-[9px] text-zapla-muted">{d.split(" ")[0]}</div>
            <div className="text-[13px] font-extrabold text-zapla-ink">{d.split(" ")[1]}</div>
          </div>
        ))}
      </div>
      {/* Rows with appointment blocks */}
      <div className="relative mt-1 grid grid-cols-[36px_repeat(7,1fr)] gap-1" style={{ height: 260 }}>
        <div className="flex flex-col justify-between text-[9px] text-zapla-muted">
          {["11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"].map((t) => <span key={t}>{t}</span>)}
        </div>
        {[0,1,2,3,4,5,6].map((d) => (
          <div key={d} className="relative rounded-md border border-dashed border-zapla-line/60 bg-white/40">
            {appts.filter(a => a.d === d).map((a, i) => (
              <div
                key={i}
                className="absolute left-0.5 right-0.5 rounded-md px-1.5 py-1 text-white leading-tight shadow-sm"
                style={{ top: `${a.top}%`, height: `${a.h}%`, background: a.c }}
              >
                <div className="text-[8px] opacity-90">{a.t}</div>
                <div className="truncate text-[9px] font-bold">{a.n}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- Card 6 : Smart Tagging (contact list) -------------------- */
function CardTagging() {
  const rows = [
    { i: "FW", c: "#f97316", n: "Frank Ware",       tag: "vip",        tc: "#22c55e" },
    { i: "PT", c: "#eab308", n: "Paul Trujillo",    tag: "escalation", tc: "#eab308" },
    { i: "JS", c: "#22c55e", n: "Joann Smith",      tag: "follow up",  tc: "#3b82f6" },
    { i: "JC", c: "#3b82f6", n: "Jennie Campbell",  tag: "follow up",  tc: "#3b82f6" },
    { i: "DB", c: "#a855f7", n: "Daisy Beard",      tag: "escalation", tc: "#eab308" },
    { i: "KO", c: "#f59e0b", n: "Keith Osse",       tag: "urgent",     tc: "#ef4444" },
    { i: "LR", c: "#ec4899", n: "Latoya Reynolds",  tag: "vip",        tc: "#22c55e" },
    { i: "ML", c: "#14b8a6", n: "Michael Lewis",    tag: "top priority", tc: "#ec4899" },
    { i: "SD", c: "#0ea5e9", n: "Sean Decker",      tag: "top priority", tc: "#ec4899" },
    { i: "JS", c: "#22c55e", n: "Jessica Smith",    tag: "vip",        tc: "#22c55e" },
  ];
  return (
    <div className="h-full text-[10.5px] text-zapla-ink">
      {/* Tabs */}
      <div className="mb-2 flex items-center gap-3 border-b border-zapla-line pb-1.5 text-[10px]">
        <span className="text-zapla-muted">Contacts</span>
        <span className="text-zapla-violet font-semibold border-b-2 border-zapla-violet pb-0.5">Smart Lists</span>
        <span className="text-zapla-muted">Bulk Actions</span>
        <span className="text-zapla-muted">Tasks</span>
        <span className="text-zapla-muted">Companies</span>
        <span className="ml-auto rounded-md bg-zapla-violet px-2 py-0.5 text-white font-semibold">More Filters</span>
      </div>
      <div className="mb-1 flex items-center gap-2 text-[9.5px] text-zapla-muted">
        <span className="rounded bg-zapla-blue-soft px-2 py-0.5 font-semibold text-zapla-blue2">1</span>
        <span>Total 44 records · 1 of 3 Pages · Page Size 20</span>
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-zapla-line">
        <div className="grid grid-cols-[1.4fr_1fr_1.4fr_0.8fr_1fr] items-center border-b border-zapla-violet bg-zapla-violet/8 px-2 py-1.5 text-[9px] font-bold uppercase tracking-wider text-zapla-ink">
          <span>Name ↑</span><span>Phone</span><span>Email</span><span>Created</span><span>Tags</span>
        </div>
        {rows.map((r, idx) => (
          <div key={idx} className="grid grid-cols-[1.4fr_1fr_1.4fr_0.8fr_1fr] items-center border-b border-zapla-line px-2 py-1.5 last:border-0">
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-[8.5px] font-bold text-white" style={{ background: r.c }}>{r.i}</span>
              <span className="truncate font-semibold">{r.n}</span>
            </span>
            <span className="text-zapla-muted/70 text-[9.5px]">••• •• ••</span>
            <span className="text-zapla-muted/70 text-[9.5px]">•••••@•••.com</span>
            <span className="text-zapla-muted text-[9.5px]">Aug 06</span>
            <span>
              <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold text-white" style={{ background: r.tc }}>{r.tag}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
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
          Prices are in AUD and exclude GST. SMS, Email, AI voice, WhatsApp, domains, payment gateway/card
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
    ["Email included", "2,500", "10,000", "25,000", "Custom"],
    ["AI chat", "Where relevant", "Where relevant", "Where relevant", "Custom"],
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
              Book a Call →
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
            Replace the&nbsp;<span className="text-[#B91C1C]">messy</span>&nbsp;stack
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
