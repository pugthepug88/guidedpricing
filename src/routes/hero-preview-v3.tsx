import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import type React from "react";
import { ConnectedSystemSectionV3 } from "@/components/ConnectedSystemSectionV3";
import {
  Home as HomeIcon,
  Landmark as LandmarkIcon,
  Wrench as WrenchIcon,
  Stethoscope as StethoscopeIcon,
  BedDouble as BedIcon,
  Scale as ScaleIcon,
  Ticket as TicketIcon,
  Dumbbell as DumbbellIcon,
  ShoppingBag as ShoppingBagIcon,
  Utensils as UtensilsIcon,
  Package as PackageIcon,
  Car as CarIcon,
} from "lucide-react";
import {
  siInstagram,
  siMailchimp,
  siPinterest,
  siShopify,
  siTiktok,
  siWhatsapp,
  siYoutube,
  siGoogleads,
  siXero,
  siQuickbooks,
  siClickup,
  siNotion,
  siAirtable,
  siBasecamp,
  siAsana,
  siGoogleforms,
  siLinear,
  siTodoist,
  siJira,
  siGooglecalendar,
  siCaldotcom,
  siMistralai,
  siOpenrouter,
  siTypeform,
  siWoocommerce,
  siFathom,
  siStripe,
  siFacebook,
  siHubspot,
  siZapier,
  siGoogleanalytics,
  siGmail,
  siGooglemeet,
  siCalendly,
  siSquare,
  siPaypal,
  siDiscord,
  siBrevo,
  siWordpress,
  siWix,
  siZoho,
  siAnthropic,
} from "simple-icons";
import logoGreen from "@/assets/zapla-logo-green.png.asset.json";
import logoBlue from "@/assets/zapla-logo-blue.png.asset.json";
import logoOrange from "@/assets/zapla-logo-orange.png.asset.json";
import logoPurple from "@/assets/zapla-logo-purple.png.asset.json";
import logoYellow from "@/assets/zapla-logo-yellow.png.asset.json";
import logoTeal from "@/assets/zapla-logo-teal.png.asset.json";
import logoPink from "@/assets/zapla-logo-pink.png.asset.json";
import logoRed from "@/assets/zapla-logo-red.png.asset.json";
import logoRainbow from "@/assets/zapla-logo-rainbow.png.asset.json";
import logoWhite from "@/assets/zapla-icon-white.png.asset.json";
import aiWorkflowVideo from "@/assets/ai-workflow.mp4.asset.json";
import aiEmployeeVideo from "@/assets/ai-employee.mp4.asset.json";
import industryRealEstate from "@/assets/industry-real-estate.png.asset.json";
import industryMortgage from "@/assets/industry-mortgage.png.asset.json";
import industryTrades from "@/assets/industry-trades.png.asset.json";
import industryHealthcare from "@/assets/industry-healthcare.png.asset.json";
import industryAirbnb from "@/assets/industry-airbnb.png.asset.json";
import industryLegal from "@/assets/industry-legal.png.asset.json";
import industryEvents from "@/assets/industry-events.png.asset.json";
import industryFitness from "@/assets/industry-fitness.png.asset.json";
import industryEcommerce from "@/assets/industry-ecommerce.png.asset.json";
import industryRestaurants from "@/assets/industry-restaurants.png.asset.json";
import industryRental from "@/assets/industry-rental.png.asset.json";
import industryAutomotive from "@/assets/industry-automotive.png.asset.json";
import type { ComponentType, ReactNode } from "react";
import funnelAsset from "@/assets/zapla-funnel-16-apps-final.png.asset.json";
import {
  Phone, PhoneMissed, Mail, MessageSquare, Instagram, Facebook, MessageCircle,
  Calendar as CalendarIcon, CreditCard, Star as StarIcon, RefreshCw, Users, Bell,
  ClipboardList, FileText, Send, CheckCircle2, ArrowRight, Sparkles, Zap, Globe,
  Briefcase, HeartPulse,
} from "lucide-react";


export const Route = createFileRoute("/hero-preview-v3")({
  head: () => ({
    meta: [
      { title: "Hero Preview V3 — Zapla" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "V3 preview — premium editorial rebuild of everything after the connected system." },
    ],
  }),
  component: HeroPreviewV3Page,
});

const BOOK_URL = "https://zapla.io/booking";

function HeroPreviewV3Page() {
  return (
    <main className="min-h-screen bg-zapla-bg">
      <Hero />
      <LifecycleStripV2 />
      <ConnectedSystemSectionV3 />
      <OutcomesV3 />
      <PlatformLifecycleV3 />
      <WorkflowTheatreV3 />
      <FocusedAIV3 />
      <IndustriesV3 />
      <ToolStackV3 />
      <PricingPreviewV3 />
      <FaqV3 />
      <FinalCtaV3 />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — badge, gradient title, CTA, trust ticks, 6-card stack       */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden bg-zapla-bg pt-10 pb-20 sm:pt-14 sm:pb-24">
      {/* soft brand orbs */}
      <div className="pointer-events-none absolute -top-40 -right-24 h-[420px] w-[420px] rounded-full bg-zapla-violet/12 blur-[140px] zapla-orb-drift" />
      <div className="pointer-events-none absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-zapla-cyan/16 blur-[140px] zapla-orb-drift-slow" />
      <div className="pointer-events-none absolute inset-0 zapla-grid-bg-light opacity-40" />

      <div className="relative mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <div className="zapla-fade">
          {/* Badge */}
          <span className="hero-badge inline-block rounded-full border border-white/70 bg-white/50 px-6 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-zapla-blue2 shadow-zapla-sm backdrop-blur">
            THE AI OPERATING SYSTEM FOR SERVICE BUSINESSES
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
            Capture every enquiry, automate the follow-up, manage the work and keep customers
            coming back from one connected operating system.
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
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] sm:gap-x-7 sm:gap-y-3 sm:text-[13.5px] text-zapla-muted">
            {["Unlimited users", "No per-seat fees", "Cancel anytime"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="flex h-[15px] w-[15px] sm:h-[18px] sm:w-[18px] items-center justify-center rounded-full bg-zapla-green text-white">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile: single readable product tile */}
        <HeroMobileTile />
        {/* Desktop / tablet: 4-card rotating stack */}
        <div className="hidden sm:block">
          <HeroCardStack />
        </div>
      </div>

      {/* Scoped hero styles */}
      <style>{`
        .hero-title-highlight {
          background: linear-gradient(135deg, #22d3ee 0%, #2563ff 55%, #1e3a8a 100%);
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
          background: linear-gradient(135deg, #22d3ee 0%, #2563ff 55%, #1e3a8a 100%);
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
        .hero-stack-card[data-pos="1"] { transform: translateX(-72px) translateY(24px) scale(0.95); z-index: 5; opacity: 0.85; clip-path: inset(0 36% 0 0 round 20px); }
        .hero-stack-card[data-pos="2"] { transform: translateX(-144px) translateY(48px) scale(0.90); z-index: 4; opacity: 0.65; clip-path: inset(0 44% 0 0 round 20px); }
        .hero-stack-card[data-pos="3"] { transform: translateX(-216px) translateY(72px) scale(0.85); z-index: 3; opacity: 0.45; clip-path: inset(0 52% 0 0 round 20px); }
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
          .hero-stack { height: 540px; }
          .hero-stack-card { padding: 22px 22px; }
          .hero-stack-card[data-pos="1"] { transform: translateX(-48px) translateY(18px) scale(0.95); }
          .hero-stack-card[data-pos="2"] { transform: translateX(-96px) translateY(36px) scale(0.90); }
          .hero-stack-card[data-pos="3"] { transform: translateX(-144px) translateY(54px) scale(0.85); }
        }

        /* Mobile: replace stack entirely with a single readable hero tile */
        @media (max-width: 640px) {
          .hero-stack { display: none; }
          .hero-cta { width: auto; height: 52px; padding: 0 22px; font-size: 0.95rem; }
          .hero-cta-text { margin-right: 40px; }
          .hero-cta-circle { width: 38px; height: 38px; right: 7px; }
          .hero-cta-circle svg { width: 15px; height: 15px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-stack-card { transition: none; }
        }

      `}</style>
    </header>
  );
}

/* -------- Mobile hero product tile — single focused moment ----------- */
function HeroMobileTile() {
  return (
    <div className="mt-10 sm:hidden">
      <div className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)]">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="ml-2 text-[11px] text-slate-500">app.zapla.io / inbox</span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-semibold text-slate-900">Live inbox</div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
            </span>
          </div>
          <div className="mt-3 space-y-2.5">
            <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72l1 6-2.5 2.5a16 16 0 006 6l2.5-2.5 6 1a2 2 0 011.72 2z"/><line x1="22" y1="2" x2="18" y2="6"/><line x1="18" y1="2" x2="22" y2="6"/></svg>
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-slate-900">Missed call · Emma Reid</div>
                <div className="text-[11px] text-slate-500">Auto-reply sent · 12:04 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5 rounded-xl bg-blue-50/60 p-2.5 ring-1 ring-blue-100">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-blue-600 ring-1 ring-blue-100 shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-slate-900">Booking placed · Thu 2:00 PM</div>
                <div className="text-[11px] text-slate-500">Assigned to Alex · confirmation sent</div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500">
            <span>One inbox for every channel</span>
            <span className="font-semibold text-blue-700">Explore →</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------- Card stack orchestrator ---------------------------------- */

const HERO_CARDS = [
  { title: "Sales Pipeline",     logo: logoGreen.url,  Body: CardPipeline },
  { title: "Control Dashboard",  logo: logoBlue.url,   Body: CardDashboard },
  { title: "Automations",        logo: logoOrange.url, Body: CardAutomation },
  { title: "Bookings",           logo: logoYellow.url, Body: CardCalendar },
] as const;

function HeroCardStack() {
  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setFront((f) => (f + 1) % HERO_CARDS.length), 6500);
    return () => window.clearInterval(id);
  }, [paused]);

  const select = (i: number) => {
    setFront(i);
    setPaused(true);
  };

  const posOf = (idx: number) => (idx - front + HERO_CARDS.length) % HERO_CARDS.length;

  return (
    <div className="hero-stack">
      {HERO_CARDS.map(({ title, logo, Body }, i) => {
        const pos = posOf(i);
        return (
          <div
            key={title}
            className="hero-stack-card"
            data-pos={pos}
            onClick={() => select(i)}
            aria-hidden={pos !== 0}
          >
            <div className="mb-5 flex items-center gap-3">
              <img
                src={logo}
                alt=""
                className="hero-card-header-logo h-11 w-11 object-contain drop-shadow-sm"
                loading="lazy"
              />
              <span className="hero-card-header-title text-[22px] font-extrabold tracking-[-0.02em] text-zapla-ink">
                {title}
              </span>
            </div>

            <div className="hero-card-body h-[calc(100%-72px)] w-full overflow-hidden">
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
            onClick={() => select(i)}
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





/* =================================================================== */
/*  V2 SECTIONS                                                        */
/* =================================================================== */


const LIFECYCLE_STAGES = [
  { key: "capture",     label: "Capture" },
  { key: "communicate", label: "Communicate" },
  { key: "convert",     label: "Convert" },
  { key: "operate",     label: "Operate" },
  { key: "retain",      label: "Retain" },
  { key: "grow",        label: "Grow" },
] as const;

/* -------- Lifecycle strip ----------------------------------------- */
function LifecycleStripV2() {
  return (
    <section className="bg-white py-12 sm:py-16 px-6 border-y border-neutral-100">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {LIFECYCLE_STAGES.map((s, i) => (
            <span key={s.key} className="inline-flex items-center gap-3">
              <span className="text-neutral-900">{s.label}</span>
              {i < LIFECYCLE_STAGES.length - 1 && <span className="text-zapla-blue">→</span>}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[14px] leading-relaxed text-neutral-500">
          One system carries the customer from first enquiry to repeat purchase.
        </p>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  V3 SECTIONS — premium editorial, navy/blue/cyan, no purple          */
/* =================================================================== */

/* -------- Small primitives shared across V3 sections --------------- */

function V3IconTile({ children, tone = "blue", size = 40 }: { children: ReactNode; tone?: "blue" | "cyan" | "ink" | "emerald" | "amber" | "red" | "sky" | "white"; size?: number }) {
  const tones: Record<string, string> = {
    blue:    "bg-gradient-to-br from-blue-500 to-blue-700 text-white",
    cyan:    "bg-gradient-to-br from-cyan-400 to-sky-600 text-white",
    ink:     "bg-gradient-to-br from-slate-800 to-slate-950 text-white",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
    amber:   "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
    red:     "bg-gradient-to-br from-rose-500 to-red-600 text-white",
    sky:     "bg-gradient-to-br from-sky-400 to-blue-600 text-white",
    white:   "bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm",
  };
  return (
    <span
      className={`inline-flex items-center justify-center rounded-[12px] ${tones[tone]}`}
      style={{ width: size, height: size }}
    >
      {children}
    </span>
  );
}

function V3Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[22px] bg-white ring-1 ring-slate-200/80 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.20),0_2px_6px_-2px_rgba(15,23,42,0.06)] ${className}`}>
      {children}
    </div>
  );
}

function V3Avatar({ name, tone = "blue", size = 30 }: { name: string; tone?: "blue" | "cyan" | "slate" | "amber" | "emerald" | "teal" | "sky"; size?: number }) {
  const initials = name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  const tones: Record<string, string> = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-700 text-white",
    cyan: "bg-gradient-to-br from-cyan-400 to-sky-600 text-white",
    slate: "bg-gradient-to-br from-slate-500 to-slate-700 text-white",
    amber: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
    teal: "bg-gradient-to-br from-teal-400 to-cyan-600 text-white",
    sky: "bg-gradient-to-br from-sky-400 to-blue-600 text-white",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-2 ring-white ${tones[tone]}`}
      style={{ width: size, height: size, fontSize: Math.max(9, Math.floor(size * 0.36)) }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

/* Channel glyphs (native-looking, small SVGs) --------------------- */
function GmailGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path fill="#4285F4" d="M22 6.5v11a2 2 0 0 1-2 2h-2V9.2l-6 4.3-6-4.3v10.3H4a2 2 0 0 1-2-2v-11L12 13z" />
      <path fill="#EA4335" d="M2 6.5 12 13 22 6.5A2 2 0 0 0 20 4.5H4a2 2 0 0 0-2 2z" />
    </svg>
  );
}
function InstaGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <defs>
        <linearGradient id="ig-v3" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F58529" /><stop offset="0.5" stopColor="#DD2A7B" /><stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-v3)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="#fff" />
    </svg>
  );
}
function MessengerGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#0084FF" />
      <path fill="#fff" d="M12 5.5c-3.7 0-6.6 2.7-6.6 6 0 1.9 1 3.6 2.6 4.7v2.3l2.4-1.3c.5.1 1 .2 1.6.2 3.7 0 6.6-2.7 6.6-6s-3-6-6.6-6zm.6 8.1-1.7-1.8-3.3 1.8 3.6-3.8 1.7 1.8 3.3-1.8-3.6 3.8z" />
    </svg>
  );
}
function WhatsAppGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path fill="#fff" d="M16.7 14.1c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5s-.6-1.4-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1 2.8.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}
function FbGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path fill="#fff" d="M13.5 22v-7.5h2.5l.4-3h-2.9V9.6c0-.9.2-1.5 1.5-1.5H17V5.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.8V22z" />
    </svg>
  );
}
function StripeGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#635BFF" />
      <path fill="#fff" d="M13.1 9.5c0-.5.4-.7 1-.7 1 0 2.2.3 3.2.8V6.5c-1.1-.4-2.1-.6-3.2-.6-2.6 0-4.4 1.4-4.4 3.7 0 3.6 4.9 3 4.9 4.6 0 .6-.5.8-1.2.8-1.1 0-2.5-.5-3.6-1.1v3.2c1.2.5 2.5.7 3.6.7 2.7 0 4.5-1.3 4.5-3.7 0-3.9-4.8-3.2-4.8-4.6z" />
    </svg>
  );
}
function GoogleGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path fill="#4285F4" d="M22 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.6c-.2 1.3-1 2.4-2.1 3.2v2.6h3.4c2-1.8 3.1-4.5 3.1-7.8z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.4-2.6c-.9.6-2.1 1-3.3 1-2.6 0-4.7-1.7-5.5-4H2.9v2.5C4.6 19.8 8 22 12 22z" />
      <path fill="#FBBC05" d="M6.5 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.5H2.9C2.3 8.9 2 10.4 2 12s.3 3.1.9 4.5L6.5 14z" />
      <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2 8 2 4.6 4.2 2.9 7.5L6.5 10c.8-2.3 2.9-4.1 5.5-4.1z" />
    </svg>
  );
}

/* =================================================================== */
/*  Shared V3 primitives for the lower page                             */
/* =================================================================== */

function StatusDot({ tone = "emerald", pulse = true }: { tone?: "emerald" | "amber" | "blue" | "red" | "slate"; pulse?: boolean }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    red: "bg-rose-500",
    slate: "bg-slate-400",
  };
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${map[tone]}`} />}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${map[tone]}`} />
    </span>
  );
}

/* DemoBadge removed — product mockups should read as self-evidently illustrative. */

function SectionEyebrow({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "cyan" | "slate" | "amber" }) {
  const map: Record<string, string> = {
    blue: "text-zapla-blue",
    cyan: "text-cyan-600",
    slate: "text-slate-500",
    amber: "text-amber-600",
  };
  return (
    <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${map[tone]}`}>{children}</span>
  );
}

/* =================================================================== */
/*  1. OutcomesV3 — editorial bridge                                     */
/* =================================================================== */

function OutcomesV3() {
  const supporting = [
    {
      k: "02",
      title: "Every opportunity keeps moving",
      body: "Quotes, bookings and follow-ups run on their own. Nothing goes silent.",
      chip: (
        <div className="inline-flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
          <Send className="h-3 w-3 text-blue-600" />
          Follow-up scheduled
        </div>
      ),
    },
    {
      k: "03",
      title: "Finished jobs turn into cash and trust",
      body: "Invoices, payments and reviews fire the moment a job is done.",
      chip: (
        <div className="inline-flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
          <StripeGlyph size={12} /> Payment received
          <span className="mx-0.5 text-slate-300">·</span>
          <GoogleGlyph size={12} /> Review request sent
        </div>
      ),
    },
    {
      k: "04",
      title: "Old customers become new revenue",
      body: "Reactivation campaigns re-engage past customers automatically.",
      chip: (
        <div className="inline-flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200">
          <RefreshCw className="h-3 w-3 text-teal-600" />
          Win-back campaign running
        </div>
      ),
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div className="max-w-2xl">
            <SectionEyebrow>The outcome</SectionEyebrow>
            <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
              What changes when nothing falls through.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">
            Four small changes across the customer journey. Together they compound into a business that runs itself.
          </p>
        </div>

        {/* Lead outcome — editorial split */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 items-center">
          <div>
            <div className="text-[13px] font-mono text-slate-400">01 / 04</div>
            <h3 className="mt-2 font-zapla text-[28px] sm:text-[38px] font-semibold tracking-tight text-slate-950 leading-[1.1]">
              Respond before the competition even sees the enquiry.
            </h3>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed max-w-lg">
              The instant a call is missed or a message lands, Zapla replies, captures the request and offers a time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                <PhoneMissed className="h-3 w-3 text-rose-500" /> Missed call
              </span>
              <ArrowRight className="h-3 w-3 text-slate-400" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                <MessageCircle className="h-3 w-3 text-emerald-600" /> Auto SMS
              </span>
              <ArrowRight className="h-3 w-3 text-slate-400" />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                <CalendarIcon className="h-3 w-3 text-blue-600" /> Booked
              </span>
            </div>
          </div>

          {/* Compact live UI moment */}
          <V3Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-800">
                <StatusDot tone="emerald" /> Live inbox
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Inbox · today</span>
            </div>
            <div className="mt-5 space-y-3">
              {/* Missed call */}
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                  <PhoneMissed className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-900">Missed call · +61 400 812 559</span>
                    <span className="text-[11px] text-slate-400">12:04 PM</span>
                  </div>
                  <div className="text-[12px] text-slate-500">Unknown caller</div>
                </div>
              </div>
              {/* Auto SMS */}
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-900">SMS auto-reply sent</span>
                    <span className="text-[11px] text-slate-400">12:04 PM</span>
                  </div>
                  <div className="mt-1 rounded-xl rounded-tl-sm bg-slate-50 px-3 py-2 text-[12px] text-slate-700 ring-1 ring-slate-100">
                    Sorry we missed you — reply here with what you need and we'll get back within the hour.
                  </div>
                </div>
              </div>
              {/* Customer reply */}
              <div className="flex items-start gap-3">
                <V3Avatar name="Emma R" tone="cyan" size={36} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-slate-900">Emma Reid</span>
                    <span className="text-[11px] text-slate-400">12:06 PM</span>
                  </div>
                  <div className="mt-1 rounded-xl rounded-tl-sm bg-blue-50 px-3 py-2 text-[12px] text-slate-800 ring-1 ring-blue-100">
                    Hi — after a quote for a bathroom reno in Bondi. Can I book a site visit this week?
                  </div>
                </div>
              </div>
              {/* Booking */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-950 px-3 py-2.5 text-white">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10">
                  <CalendarIcon className="h-3.5 w-3.5" />
                </span>
                <div className="flex-1 text-[12px]">
                  <div className="font-semibold">Booking placed · Thu 2:00 PM</div>
                  <div className="text-white/60 text-[11px]">Assigned to Alex · confirmation sent</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
          </V3Card>
        </div>

        {/* Supporting outcomes — thin dividers */}
        <div className="mt-20 grid divide-y divide-slate-200 border-y border-slate-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
          {supporting.map((s) => (
            <div key={s.k} className="p-6 md:p-8">
              <div className="text-[12px] font-mono text-slate-400">{s.k} / 04</div>
              <h4 className="mt-2 font-zapla text-xl font-semibold text-slate-950 leading-snug">{s.title}</h4>
              <p className="mt-2 text-[14px] text-slate-600 leading-relaxed">{s.body}</p>
              <div className="mt-4">{s.chip}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  2. PlatformLifecycleV3 — unified app shell, six stages               */
/* =================================================================== */

type V3Stage = { key: string; label: string; sub: string; headline: string; body: string; caps: string[]; scene: ReactNode };

function AppShell({ view, children }: { view: string; children: ReactNode }) {
  const nav = [
    { icon: <MessageSquare className="h-3.5 w-3.5" />, label: "Inbox" },
    { icon: <Users className="h-3.5 w-3.5" />, label: "Contacts" },
    { icon: <ClipboardList className="h-3.5 w-3.5" />, label: "Pipeline" },
    { icon: <CalendarIcon className="h-3.5 w-3.5" />, label: "Calendar" },
    { icon: <Zap className="h-3.5 w-3.5" />, label: "Workflows" },
    { icon: <StarIcon className="h-3.5 w-3.5" />, label: "Reviews" },
  ];
  return (
    <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35),0_2px_6px_-2px_rgba(15,23,42,0.06)]">
      {/* Top browser chrome */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-[11px] text-slate-500 ring-1 ring-slate-200">
          <Globe className="h-3 w-3" />
          app.zapla.io / <span className="text-slate-900 font-medium">{view}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-6 w-6 grid place-items-center rounded-full bg-slate-900 text-white text-[10px] font-semibold">SM</span>
        </div>
      </div>
      {/* Body: rail + content */}
      <div className="flex min-h-[420px]">
        <aside className="hidden sm:flex w-[168px] flex-col gap-0.5 border-r border-slate-100 bg-white p-3">
          <div className="mb-3 flex items-center gap-2 px-1">
            <img src={logoBlue.url} alt="" className="h-6 w-6 rounded-md" />
            <span className="text-[13px] font-semibold text-slate-900">Zapla</span>
          </div>
          {nav.map((n) => {
            const active = n.label.toLowerCase() === view.toLowerCase() || (view === "Grow" && n.label === "Workflows");
            return (
              <div
                key={n.label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] ${active ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
              >
                {n.icon}
                {n.label}
              </div>
            );
          })}
          <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-slate-500">
            <span className="h-6 w-6 grid place-items-center rounded-full bg-slate-900 text-white text-[10px] font-semibold">SM</span>
            Sam Miller
          </div>
        </aside>
        <div className="flex-1 min-w-0 bg-white">{children}</div>
      </div>
    </div>
  );
}

/* --- Scene: Capture --- */
function CaptureSceneV3() {
  const rows = [
    { ch: <PhoneMissed className="h-3.5 w-3.5 text-rose-500" />, src: "Missed call", who: "+61 400 812 559", when: "12:04", tag: "New" },
    { ch: <GmailGlyph size={14} />, src: "Web form", who: "Jordan Clarke", when: "11:52", tag: "New" },
    { ch: <FbGlyph size={14} />, src: "Meta Lead Ad", who: "Priya Shah", when: "11:40", tag: "New" },
    { ch: <InstaGlyph size={14} />, src: "Instagram DM", who: "@bondi_baths", when: "10:22", tag: "" },
    { ch: <Users className="h-3.5 w-3.5 text-slate-500" />, src: "Referral", who: "Karen (from Alex)", when: "Yesterday", tag: "" },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contacts · New this week</div>
          <div className="mt-0.5 text-[15px] font-semibold text-slate-900">All channels · unified</div>
        </div>
        <div className="flex items-center gap-1">
          {[<GmailGlyph key="g" size={16} />, <InstaGlyph key="i" size={16} />, <FbGlyph key="f" size={16} />, <MessengerGlyph key="m" size={16} />, <WhatsAppGlyph key="w" size={16} />].map((el, i) => (
            <span key={i} className="grid h-7 w-7 place-items-center rounded-lg bg-white ring-1 ring-slate-200">{el}</span>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
        <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-3 border-b border-slate-100 bg-slate-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          <span>Source</span><span>Contact</span><span>When</span><span></span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className={`grid grid-cols-[1fr_1fr_auto_auto] items-center gap-3 px-3 py-2.5 text-[12px] ${i > 0 ? "border-t border-slate-100" : ""}`}>
            <span className="flex items-center gap-2 text-slate-700">{r.ch} {r.src}</span>
            <span className="font-medium text-slate-900 truncate">{r.who}</span>
            <span className="text-slate-500">{r.when}</span>
            <span className={`justify-self-end rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.tag === "New" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "text-transparent"}`}>{r.tag || "·"}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Sparkles className="h-3 w-3 text-blue-600" /> Duplicates merged automatically across 5 channels
      </div>
    </div>
  );
}

/* --- Scene: Communicate --- */
function CommunicateSceneV3() {
  const threads = [
    { name: "Emma Reid", tone: "cyan" as const, ch: <MessageCircle className="h-3 w-3 text-emerald-600" />, preview: "Thanks — see you Thu 2pm.", when: "12:07", unread: true },
    { name: "Jordan Clarke", tone: "blue" as const, ch: <GmailGlyph size={12} />, preview: "Quote looks great, quick question…", when: "11:44", unread: true },
    { name: "Priya Shah", tone: "amber" as const, ch: <InstaGlyph size={12} />, preview: "Do you cover Marrickville?", when: "10:22", unread: false },
    { name: "Karen Ng", tone: "emerald" as const, ch: <WhatsAppGlyph size={12} />, preview: "Perfect, please book it in.", when: "Yest", unread: false },
    { name: "Tom Bailey", tone: "slate" as const, ch: <MessengerGlyph size={12} />, preview: "Cheers!", when: "Yest", unread: false },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[420px]">
      <div className="border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/60">
        <div className="px-3 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Unified inbox</div>
        {threads.map((t, i) => (
          <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 ${i === 0 ? "bg-white ring-1 ring-blue-100" : "hover:bg-white/70"}`}>
            <V3Avatar name={t.name} tone={t.tone} size={30} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-slate-900 truncate">{t.name}</span>
                <span className="text-[10px] text-slate-400">{t.when}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                {t.ch} <span className="truncate">{t.preview}</span>
              </div>
            </div>
            {t.unread && <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />}
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <V3Avatar name="Emma Reid" tone="cyan" size={32} />
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Emma Reid</div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <StatusDot tone="emerald" pulse={false} /> Bondi · Bathroom reno
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="grid h-7 w-7 place-items-center rounded-md ring-1 ring-slate-200 bg-white"><MessageCircle className="h-3.5 w-3.5 text-slate-500" /></span>
            <span className="grid h-7 w-7 place-items-center rounded-md ring-1 ring-slate-200 bg-white"><GmailGlyph size={14} /></span>
            <span className="grid h-7 w-7 place-items-center rounded-md ring-1 ring-slate-200 bg-white"><WhatsAppGlyph size={14} /></span>
          </div>
        </div>
        <div className="flex-1 space-y-3 p-4 bg-gradient-to-b from-white to-slate-50">
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] text-slate-800 ring-1 ring-slate-200">
              Hi Emma — sending a quote for the Bondi reno now.
              <div className="mt-1 text-[10px] text-slate-400">via SMS · 11:20</div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-blue-600 px-3 py-2 text-[12px] text-white">
              Amazing, thank you!
              <div className="mt-1 text-[10px] text-white/70">via WhatsApp · 11:44</div>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[12px] text-slate-800 ring-1 ring-slate-200">
              Would Thu 2pm work for the on-site?
              <div className="mt-1 text-[10px] text-slate-400">via SMS · 11:47</div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 p-3 flex items-center gap-2">
          <div className="flex-1 rounded-lg bg-slate-50 px-3 py-2 text-[12px] text-slate-400 ring-1 ring-slate-200">Reply on any channel…</div>
          <button className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white"><Send className="h-3.5 w-3.5" /></button>
        </div>
      </div>
    </div>
  );
}

/* --- Scene: Convert --- */
function ConvertSceneV3() {
  const stages = [
    { label: "New enquiry", count: 4, tone: "bg-slate-100 text-slate-700", card: { name: "Emma Reid", meta: "Bondi · Bathroom", amt: "" } },
    { label: "Quoted", count: 3, tone: "bg-blue-50 text-blue-700", card: { name: "Jordan Clarke", meta: "Kitchen reno", amt: "$4,800" } },
    { label: "Booked", count: 2, tone: "bg-cyan-50 text-cyan-700", card: { name: "Karen Ng", meta: "Thu 2:00 PM", amt: "$1,250" } },
    { label: "Paid", count: 5, tone: "bg-emerald-50 text-emerald-700", card: { name: "Tom Bailey", meta: "Paid via Stripe", amt: "$2,100" } },
  ];
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Pipeline · This week</div>
          <div className="mt-0.5 text-[15px] font-semibold text-slate-900">Enquiry → Payment</div>
        </div>
        <div className="text-[11px] text-slate-500">Next action <span className="ml-1 font-semibold text-blue-700">Send quote to Jordan</span></div>
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((s, i) => (
          <div key={i} className="rounded-xl bg-slate-50/60 p-3 ring-1 ring-slate-100">
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.tone}`}>{s.label}</span>
              <span className="text-[11px] text-slate-500">{s.count}</span>
            </div>
            <div className="mt-3 rounded-lg bg-white p-2.5 ring-1 ring-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <V3Avatar name={s.card.name} tone={(["blue","cyan","amber","emerald"] as const)[i]} size={26} />
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-slate-900 truncate">{s.card.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{s.card.meta}</div>
                </div>
              </div>
              {s.card.amt && (
                <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                  <span className="text-slate-500">Value</span>
                  <span className="font-semibold text-slate-900">{s.card.amt}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Scene: Operate --- */
function OperateSceneV3() {
  const jobs = [
    { time: "09:00", who: "Alex", task: "Site visit · Bondi", status: "En route", tone: "amber" as const },
    { time: "11:30", who: "Priya", task: "Install · Marrickville", status: "In progress", tone: "blue" as const },
    { time: "14:00", who: "Alex", task: "Quote walk-through · Emma", status: "Scheduled", tone: "slate" as const },
    { time: "16:00", who: "Sam", task: "Follow-up call · Karen", status: "Scheduled", tone: "slate" as const },
  ];
  return (
    <div className="p-5 sm:p-6 grid gap-4 md:grid-cols-[1fr_240px]">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Today · Thu 14 Nov</div>
        <div className="mt-0.5 text-[15px] font-semibold text-slate-900">Team schedule</div>
        <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-slate-200">
          {jobs.map((j, i) => (
            <div key={i} className={`grid grid-cols-[64px_28px_1fr_auto] items-center gap-3 px-3 py-2.5 ${i > 0 ? "border-t border-slate-100" : ""}`}>
              <span className="font-mono text-[12px] text-slate-500">{j.time}</span>
              <V3Avatar name={j.who} tone={j.tone === "amber" ? "amber" : j.tone === "blue" ? "blue" : "slate"} size={26} />
              <span className="text-[12px] text-slate-800 truncate">{j.task}</span>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${j.status === "En route" ? "bg-amber-50 text-amber-700 ring-1 ring-amber-100" : j.status === "In progress" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "bg-slate-100 text-slate-600"}`}>
                {(j.status === "En route" || j.status === "In progress") && <StatusDot tone={j.status === "En route" ? "amber" : "blue"} />}
                {j.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-slate-950 p-4 text-white">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Auto-routing</div>
        <div className="mt-2 text-[13px] font-semibold">New enquiry from Bondi</div>
        <div className="mt-1 text-[11px] text-white/60">Postcode 2026 · Alex is closest</div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-2">
          <V3Avatar name="Alex" tone="amber" size={26} />
          <div className="flex-1 text-[11px]">
            <div className="font-semibold">Assigned to Alex</div>
            <div className="text-white/60">Notified · ETA 2:00 PM</div>
          </div>
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

/* --- Scene: Retain --- */
function RetainSceneV3() {
  return (
    <div className="p-5 sm:p-6 grid gap-4 md:grid-cols-2">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">After every job</div>
        <div className="mt-0.5 text-[15px] font-semibold text-slate-900">Complete → review → rebook</div>
        <div className="mt-3 space-y-2">
          {[
            { i: <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />, t: "Job marked complete", m: "By Alex · 3:00 PM" },
            { i: <GoogleGlyph size={14} />, t: "Google review request sent", m: "SMS + email" },
            { i: <Bell className="h-3.5 w-3.5 text-blue-600" />, t: "Service reminder scheduled", m: "In 6 months" },
            { i: <CalendarIcon className="h-3.5 w-3.5 text-cyan-600" />, t: "Rebooking link sent", m: "One-click booking" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 ring-1 ring-slate-200">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-50 ring-1 ring-slate-100">{r.i}</span>
              <div className="flex-1">
                <div className="text-[12px] font-semibold text-slate-900">{r.t}</div>
                <div className="text-[11px] text-slate-500">{r.m}</div>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Sent</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 ring-1 ring-slate-200">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-800">
          <GoogleGlyph size={16} /> Review request
        </div>
        <div className="mt-3 rounded-lg bg-white p-3 ring-1 ring-slate-200">
          <div className="flex items-center gap-2">
            <V3Avatar name="Tom Bailey" tone="emerald" size={30} />
            <div className="text-[12px]">
              <div className="font-semibold text-slate-900">Tom Bailey</div>
              <div className="text-[10px] text-slate-500">via SMS · just now</div>
            </div>
          </div>
          <div className="mt-2 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] text-slate-700 ring-1 ring-slate-100">
            Thanks Tom! Would you mind leaving us a Google review?
            <div className="mt-1 text-blue-700 underline">review.zapla.io/…</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
          <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
          <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
          <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
          <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
          <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="ml-2">Sample review preview</span>
        </div>
      </div>
    </div>
  );
}

/* --- Scene: Grow --- */
function GrowSceneV3() {
  return (
    <div className="p-5 sm:p-6 grid gap-4 md:grid-cols-[1fr_1fr]">
      <div className="rounded-xl bg-slate-50/60 p-4 ring-1 ring-slate-100">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Segment</div>
        <div className="mt-1 text-[14px] font-semibold text-slate-900">Inactive · no visit in 6 months</div>
        <div className="mt-3 flex -space-x-2">
          {["Anna", "Ben", "Cindy", "Dan", "Eli"].map((n, i) => (
            <V3Avatar key={i} name={n} tone={(["blue","cyan","amber","emerald","teal"] as const)[i]} size={30} />
          ))}
          <span className="ml-3 grid h-[30px] w-[30px] place-items-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700 ring-2 ring-white">…</span>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white p-2.5 ring-1 ring-slate-200">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <div className="flex-1 text-[12px] font-medium text-slate-800">AI-drafted message</div>
          <span className="text-[10px] text-slate-500">Editable</span>
        </div>
        <div className="mt-2 rounded-lg bg-white p-3 text-[11px] text-slate-700 ring-1 ring-slate-200">
          Hey {`{first_name}`} — it's been a while. We'd love to have you back. Book online in 30 seconds ↗
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold uppercase tracking-wider">Send</span>
            <span>Draft ready</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-2 ring-1 ring-emerald-100 text-[11px] font-semibold text-emerald-800">
              <MessageCircle className="h-3.5 w-3.5" /> SMS
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-2.5 py-2 ring-1 ring-blue-100 text-[11px] font-semibold text-blue-800">
              <GmailGlyph size={14} /> Email
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Replies flow into inbox</span>
            <StatusDot tone="emerald" />
          </div>
          <div className="mt-2 space-y-2">
            {[{ n: "Cindy L", m: "Yes please, Saturday?" }, { n: "Ben P", m: "Book me in for a tune-up." }].map((r, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 ring-1 ring-slate-100">
                <V3Avatar name={r.n} tone={i === 0 ? "cyan" : "amber"} size={24} />
                <div className="flex-1 text-[11px]">
                  <div className="font-semibold text-slate-900">{r.n}</div>
                  <div className="text-slate-600 truncate">{r.m}</div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700">Reply</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const V3_STAGES: V3Stage[] = [
  { key: "capture", label: "Capture", sub: "01", headline: "Every enquiry lands in one place.", body: "Calls, forms, DMs, ads and referrals become one clean contact record.", caps: ["Missed-call capture", "Web & form intake", "Meta / Instagram DMs", "De-duplicated contacts"], scene: <CaptureSceneV3 /> },
  { key: "communicate", label: "Communicate", sub: "02", headline: "One inbox for every channel.", body: "SMS, email, Messenger, Instagram and WhatsApp in one thread per customer.", caps: ["Unified inbox", "Full history per contact", "Reply on any channel", "Team assignments"], scene: <CommunicateSceneV3 /> },
  { key: "convert", label: "Convert", sub: "03", headline: "Enquiry to payment in one pipeline.", body: "Quotes, bookings and payments move together with a clear next action.", caps: ["Visual pipeline", "Quotes & bookings", "Stripe payments", "Next-action nudges"], scene: <ConvertSceneV3 /> },
  { key: "operate", label: "Operate", sub: "04", headline: "The daily view your team actually uses.", body: "Schedule, routing, tasks and job status in one operations view.", caps: ["Team calendar", "Smart routing", "Task assignments", "Mobile-first"], scene: <OperateSceneV3 /> },
  { key: "retain", label: "Retain", sub: "05", headline: "Every finished job becomes trust.", body: "Reviews, reminders and rebookings run the moment a job wraps up.", caps: ["Review requests", "Service reminders", "One-click rebooking", "Loyalty flows"], scene: <RetainSceneV3 /> },
  { key: "grow", label: "Grow", sub: "06", headline: "Wake up inactive customers.", body: "AI drafts the message, sends it, and routes replies back into the inbox.", caps: ["Smart segments", "AI drafting", "Multi-channel send", "Replies in inbox"], scene: <GrowSceneV3 /> },
];

function PlatformLifecycleV3() {
  const [active, setActive] = useState(0);
  const stage = V3_STAGES[active];
  return (
    <section className="bg-slate-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow tone="slate">The platform</SectionEyebrow>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            One product, six stages of the customer journey.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            The same connected workspace, from first enquiry to lifelong customer.
          </p>
        </div>

        {/* Stage selector — refined */}
        <div className="mt-10 -mx-6 px-6 overflow-x-auto sm:overflow-visible">
          <div className="flex min-w-max sm:min-w-0 items-center gap-1 rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-sm sm:justify-center">
            {V3_STAGES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.key}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 text-[12px] sm:text-[13px] font-semibold transition ${isActive ? "bg-slate-950 text-white shadow" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? "text-white/60" : "text-slate-400"}`}>{s.sub}</span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage content */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="text-[11px] font-mono text-slate-400">{stage.sub} / 06</div>
            <h3 className="mt-2 font-zapla text-2xl sm:text-[30px] font-semibold text-slate-950 leading-[1.15]">{stage.headline}</h3>
            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{stage.body}</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
              {stage.caps.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[13px] text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-blue-600 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <AppShell view={stage.label}>{stage.scene}</AppShell>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  3. WorkflowCanvasV3 — light, realistic automation builder            */
/* =================================================================== */

type WfNode = { id: string; x: number; y: number; icon: ReactNode; title: string; detail: string; tone: "blue" | "emerald" | "amber" | "cyan" | "red" | "ink" | "sky" };
type WfEdge = { from: string; to: string };
type WfScenario = {
  key: string; label: string; icon: ReactNode;
  headline: string; body: string;
  nodes: WfNode[]; edges: WfEdge[];
  log: { t: string; text: string; tone: "blue" | "emerald" | "amber" | "slate" }[];
};

const WF_SCENARIOS: WfScenario[] = [
  {
    key: "missed", label: "Missed call", icon: <PhoneMissed className="h-3.5 w-3.5" />,
    headline: "A missed call becomes a booked job.",
    body: "SMS reply, customer confirms, AI captures the request and a booking lands in the calendar.",
    nodes: [
      { id: "n1", x: 3, y: 32, icon: <PhoneMissed className="h-4 w-4" />, title: "Missed call", detail: "12:04 · business line", tone: "red" },
      { id: "n2", x: 22, y: 12, icon: <MessageCircle className="h-4 w-4" />, title: "Automatic SMS", detail: "12:04 · sent 3s later", tone: "emerald" },
      { id: "n3", x: 42, y: 32, icon: <MessageSquare className="h-4 w-4" />, title: "Customer reply", detail: "12:06 · \"bathroom reno, Bondi\"", tone: "sky" },
      { id: "n4", x: 62, y: 12, icon: <Sparkles className="h-4 w-4" />, title: "AI captures intent", detail: "12:06 · name · service · suburb", tone: "cyan" },
      { id: "n5", x: 80, y: 32, icon: <CalendarIcon className="h-4 w-4" />, title: "Calendar slot booked", detail: "12:07 · Thu 2:00 PM", tone: "blue" },
      { id: "n6", x: 62, y: 55, icon: <Bell className="h-4 w-4" />, title: "Opportunity & alert", detail: "12:07 · assigned to Alex", tone: "ink" },
    ],
    edges: [{ from: "n1", to: "n2" }, { from: "n2", to: "n3" }, { from: "n3", to: "n4" }, { from: "n4", to: "n5" }, { from: "n4", to: "n6" }],
    log: [
      { t: "12:04", text: "Missed call captured on business line", tone: "amber" },
      { t: "12:04", text: "Automatic SMS sent", tone: "emerald" },
      { t: "12:06", text: "Customer replied · bathroom reno · Bondi", tone: "blue" },
      { t: "12:06", text: "AI captured intent · Emma Reid", tone: "blue" },
      { t: "12:07", text: "Calendar slot booked · Thu 2:00 PM", tone: "emerald" },
      { t: "12:07", text: "Opportunity created · Alex alerted", tone: "slate" },
    ],
  },
  {
    key: "quote", label: "Quote follow-up", icon: <FileText className="h-3.5 w-3.5" />,
    headline: "Quotes stop going cold.",
    body: "Automatic nudges keep the conversation alive without chasing.",
    nodes: [
      { id: "n1", x: 4, y: 32, icon: <FileText className="h-4 w-4" />, title: "Quote sent", detail: "$4,800 · to Jordan", tone: "blue" },
      { id: "n2", x: 28, y: 32, icon: <Zap className="h-4 w-4" />, title: "Wait 3 days", detail: "If no reply", tone: "amber" },
      { id: "n3", x: 52, y: 12, icon: <MessageCircle className="h-4 w-4" />, title: "SMS nudge", detail: "\"Just checking in…\"", tone: "emerald" },
      { id: "n4", x: 52, y: 55, icon: <GmailGlyph size={16} />, title: "Email follow-up", detail: "Personalised copy", tone: "sky" },
      { id: "n5", x: 78, y: 32, icon: <Bell className="h-4 w-4" />, title: "Owner alerted on reply", detail: "Push + inbox", tone: "ink" },
    ],
    edges: [{ from: "n1", to: "n2" }, { from: "n2", to: "n3" }, { from: "n2", to: "n4" }, { from: "n3", to: "n5" }, { from: "n4", to: "n5" }],
    log: [
      { t: "Mon", text: "Quote sent to Jordan Clarke", tone: "blue" },
      { t: "Thu", text: "No reply · workflow waited 3 days", tone: "amber" },
      { t: "Thu", text: "SMS + email nudge sent", tone: "emerald" },
      { t: "Thu", text: "Owner alerted · reply received", tone: "slate" },
    ],
  },
  {
    key: "pay", label: "Payment & review", icon: <CreditCard className="h-3.5 w-3.5" />,
    headline: "Cash in, review out.",
    body: "Every completed job triggers invoice, payment, receipt and review request.",
    nodes: [
      { id: "n1", x: 4, y: 32, icon: <CheckCircle2 className="h-4 w-4" />, title: "Job complete", detail: "Marked on mobile", tone: "emerald" },
      { id: "n2", x: 28, y: 32, icon: <StripeGlyph size={16} />, title: "Invoice sent", detail: "Stripe link", tone: "sky" },
      { id: "n3", x: 52, y: 32, icon: <CheckCircle2 className="h-4 w-4" />, title: "Payment received", detail: "Card · Stripe", tone: "emerald" },
      { id: "n4", x: 76, y: 12, icon: <GoogleGlyph size={16} />, title: "Review request", detail: "SMS + email", tone: "amber" },
      { id: "n5", x: 76, y: 55, icon: <Bell className="h-4 w-4" />, title: "Service reminder", detail: "Scheduled · 6 months", tone: "blue" },
    ],
    edges: [{ from: "n1", to: "n2" }, { from: "n2", to: "n3" }, { from: "n3", to: "n4" }, { from: "n3", to: "n5" }],
    log: [
      { t: "3:00 PM", text: "Job marked complete by Alex", tone: "emerald" },
      { t: "3:00 PM", text: "Invoice sent · $1,250", tone: "blue" },
      { t: "3:12 PM", text: "Payment received via Stripe", tone: "emerald" },
      { t: "3:12 PM", text: "Review request queued", tone: "amber" },
    ],
  },
  {
    key: "winback", label: "Customer win-back", icon: <RefreshCw className="h-3.5 w-3.5" />,
    headline: "Bring quiet customers back on autopilot.",
    body: "Reactivate inactive customers with AI-assisted messages and route replies.",
    nodes: [
      { id: "n1", x: 4, y: 32, icon: <Users className="h-4 w-4" />, title: "Inactive segment", detail: "No visit · 6 months", tone: "ink" },
      { id: "n2", x: 28, y: 32, icon: <Sparkles className="h-4 w-4" />, title: "AI drafts message", detail: "Personalised", tone: "cyan" },
      { id: "n3", x: 52, y: 12, icon: <MessageCircle className="h-4 w-4" />, title: "SMS sent", detail: "From business number", tone: "emerald" },
      { id: "n4", x: 52, y: 55, icon: <GmailGlyph size={16} />, title: "Email sent", detail: "Branded template", tone: "sky" },
      { id: "n5", x: 78, y: 32, icon: <CalendarIcon className="h-4 w-4" />, title: "Booking link", detail: "One-click", tone: "blue" },
    ],
    edges: [{ from: "n1", to: "n2" }, { from: "n2", to: "n3" }, { from: "n2", to: "n4" }, { from: "n3", to: "n5" }, { from: "n4", to: "n5" }],
    log: [
      { t: "9:00", text: "Segment refreshed · inactive customers", tone: "slate" },
      { t: "9:01", text: "AI drafted 4 message variants", tone: "blue" },
      { t: "9:02", text: "SMS + email sent", tone: "emerald" },
      { t: "10:14", text: "Reply from Cindy · routed to inbox", tone: "amber" },
    ],
  },
];

function WorkflowCanvasV3() {
  const [active, setActive] = useState(0);
  const s = WF_SCENARIOS[active];
  const toneRing: Record<string, string> = {
    blue: "ring-blue-200 bg-blue-50 text-blue-700",
    emerald: "ring-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "ring-amber-200 bg-amber-50 text-amber-700",
    cyan: "ring-cyan-200 bg-cyan-50 text-cyan-700",
    red: "ring-rose-200 bg-rose-50 text-rose-700",
    ink: "ring-slate-200 bg-slate-50 text-slate-700",
    sky: "ring-sky-200 bg-sky-50 text-sky-700",
  };
  const nodeById = Object.fromEntries(s.nodes.map((n) => [n.id, n]));

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionEyebrow tone="cyan">Workflows</SectionEyebrow>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Automations that keep every opportunity moving.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Choose a scenario and see how Zapla handles the next step automatically.
          </p>
        </div>

        {/* Scenario selector */}
        <div className="mt-10 flex flex-wrap gap-2">
          {WF_SCENARIOS.map((sc, i) => {
            const isActive = i === active;
            return (
              <button
                key={sc.key}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ring-1 ${isActive ? "bg-slate-950 text-white ring-slate-950" : "bg-white text-slate-700 ring-slate-200 hover:ring-slate-300"}`}
              >
                <span className={`grid h-5 w-5 place-items-center rounded-full ${isActive ? "bg-white/15" : "bg-slate-100 text-slate-700"}`}>{sc.icon}</span>
                {sc.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Canvas */}
          <div className="overflow-hidden rounded-[22px] bg-white ring-1 ring-slate-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]">
            {/* App-frame chrome */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
              <div className="flex items-center gap-2 text-[12px] text-slate-700">
                <img src={logoBlue.url} alt="" className="h-5 w-5 rounded" />
                <span className="font-semibold">{s.label} workflow</span>
                <span className="mx-1 text-slate-300">·</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  <StatusDot tone="emerald" pulse={false} /> Published
                </span>
                <span className="hidden sm:inline text-[11px] text-slate-400">· saved 2 min ago</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200">Test</button>
                <button className="rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">Run</button>
              </div>
            </div>

            {/* Headline strip */}
            <div className="border-b border-slate-100 px-5 py-4">
              <h3 className="font-zapla text-xl font-semibold text-slate-950 leading-snug">{s.headline}</h3>
              <p className="mt-1 text-[13px] text-slate-600">{s.body}</p>
            </div>

            {/* Desktop canvas */}
            <div className="relative hidden md:block h-[420px] bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.06)_1px,transparent_0)] [background-size:22px_22px]">
              {/* Connectors — cable style */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="wfWire" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                {s.edges.map((e, i) => {
                  const a = nodeById[e.from]; const b = nodeById[e.to];
                  if (!a || !b) return null;
                  const x1 = a.x + 18, y1 = a.y + 8, x2 = b.x, y2 = b.y + 8;
                  const cx = (x1 + x2) / 2;
                  return (
                    <path key={i} d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`} fill="none" stroke="url(#wfWire)" strokeWidth="0.5" strokeLinecap="round" />
                  );
                })}
              </svg>
              {/* Nodes */}
              {s.nodes.map((n, idx) => {
                const kind = idx === 0
                  ? { l: "Trigger", cls: "bg-rose-50 text-rose-700 ring-rose-100" }
                  : /^(Wait|If|Condition)/i.test(n.title)
                  ? { l: "Condition", cls: "bg-amber-50 text-amber-700 ring-amber-100" }
                  : { l: "Action", cls: "bg-slate-100 text-slate-700 ring-slate-200" };
                return (
                  <div
                    key={n.id}
                    className="absolute w-[210px]"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    <div className="group relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-[0_14px_30px_-18px_rgba(15,23,42,0.35)] transition hover:ring-blue-300 hover:shadow-[0_18px_40px_-18px_rgba(59,130,246,0.35)]">
                      {/* Left/right ports */}
                      <span aria-hidden className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white ring-2 ring-blue-400" />
                      <span aria-hidden className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white ring-2 ring-blue-400" />
                      <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ring-1 ${kind.cls}`}>{kind.l}</span>
                        <span className="text-[9px] font-mono text-slate-300">#{idx + 1}</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 pb-3">
                        <span className={`grid h-9 w-9 place-items-center rounded-lg ring-1 ${toneRing[n.tone]}`}>{n.icon}</span>
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-semibold text-slate-900 truncate leading-tight">{n.title}</div>
                          <div className="text-[10.5px] text-slate-500 truncate">{n.detail}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile vertical stepper */}
            <div className="md:hidden p-4 space-y-3">
              {s.nodes.map((n, i) => {
                const kind = i === 0 ? "Trigger" : /^(Wait|If|Condition)/i.test(n.title) ? "Condition" : "Action";
                return (
                  <div key={n.id} className="relative">
                    <div className="flex items-start gap-3">
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ring-1 ${toneRing[n.tone]}`}>{n.icon}</span>
                      <div className="flex-1 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                        <div className="flex items-center justify-between">
                          <div className="text-[13px] font-semibold text-slate-900">{n.title}</div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{kind}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{n.detail}</div>
                      </div>
                    </div>
                    {i < s.nodes.length - 1 && <div className="ml-[19px] my-1 h-4 w-px bg-slate-200" />}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Activity log */}
          <div className="rounded-[22px] bg-white ring-1 ring-slate-200 p-4 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.20)]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-slate-800">Latest run</div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <StatusDot tone="emerald" pulse={false} /> Success
              </div>
            </div>
            <ol className="mt-4 space-y-3">
              {s.log.map((l, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-1"><StatusDot tone={l.tone === "slate" ? "slate" : l.tone} pulse={false} /></span>
                  <div className="flex-1">
                    <div className="text-[12px] text-slate-800 leading-snug">{l.text}</div>
                    <div className="text-[10px] text-slate-400">{l.t}</div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
              Trigger fires whenever this scenario matches in your workspace.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Kept name for backwards ref in page — now uses new canvas */
function WorkflowTheatreV3() { return <WorkflowCanvasV3 />; }

/* =================================================================== */
/*  4. FocusedAIV3 — cinematic black, talking character                  */
/* =================================================================== */

function FocusedAIV3() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"receptionist" | "workflows">("receptionist");

  const transcript = [
    { who: "caller", t: "Hi, can I book a service for Thursday?" },
    { who: "ai",     t: "Absolutely. I have 2 pm available. Shall I lock that in?" },
    { who: "caller", t: "Yes, please." },
    { who: "ai",     t: "Done. You'll receive a confirmation text now." },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  useEffect(() => {
    if (reduced) { setStep(transcript.length); return; }
    if (!playing) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % (transcript.length + 2));
    }, 2000);
    return () => window.clearInterval(id);
  }, [playing, reduced, transcript.length]);

  const shown = reduced ? transcript : transcript.slice(0, Math.min(step + 1, transcript.length));
  const bookingConfirmed = reduced || step >= transcript.length - 1;

  const videoSrc = mode === "receptionist" ? aiWorkflowVideo.url : aiEmployeeVideo.url;

  return (
    <section className="relative overflow-hidden bg-[#05060a] py-24 sm:py-32 px-6 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">The AI receptionist</span>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight leading-[1.05]">
            Every enquiry handled, even when your team is busy.
          </h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-2xl">
            AI answers, gathers details, books the appointment and hands the full context to your team.
          </p>

          {/* Mode toggle: receptionist (primary) / AI workflows (secondary) */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
            <button
              onClick={() => setMode("receptionist")}
              className={`rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold transition ${mode === "receptionist" ? "bg-white text-slate-900" : "text-white/70 hover:text-white"}`}
            >
              AI receptionist
            </button>
            <button
              onClick={() => setMode("workflows")}
              className={`rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold transition ${mode === "workflows" ? "bg-white text-slate-900" : "text-white/70 hover:text-white"}`}
            >
              AI workflows
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-stretch">
          {/* Character portrait — cinematic, no audio pretence */}
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#0b1220] to-[#05060a] ring-1 ring-white/10 shadow-[0_40px_120px_-40px_rgba(3,7,18,0.9)]">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] w-full">
              <video
                ref={videoRef}
                key={mode}
                className="absolute inset-0 h-full w-full object-contain"
                src={videoSrc}
                autoPlay={!reduced}
                loop
                muted
                playsInline
                preload="metadata"
                aria-label={mode === "receptionist" ? "Illustration of Zapla's AI receptionist" : "Illustration of an AI workflow inside Zapla"}
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

              {/* Top identifier — presented as an illustration */}
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/85 backdrop-blur ring-1 ring-white/15">
                <Sparkles className="h-3 w-3 text-cyan-300" />
                {mode === "receptionist" ? "Zapla AI receptionist" : "Zapla AI workflows"}
              </div>

              {/* Bottom controls — no audio, no fake caller */}
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 rounded-2xl bg-black/50 px-3 py-2.5 backdrop-blur ring-1 ring-white/10">
                <div className="min-w-0 text-[11px] font-mono uppercase tracking-wider text-white/60">
                  Illustrative demo · no audio
                </div>
                {!reduced && (
                  <button
                    onClick={() => {
                      setPlaying((p) => !p);
                      const v = videoRef.current;
                      if (v) { if (playing) v.pause(); else v.play().catch(() => {}); }
                    }}
                    className="shrink-0 rounded-full bg-white text-slate-900 px-3.5 py-1.5 text-[11px] font-semibold hover:bg-white/90"
                  >
                    {playing ? "Pause demo" : "Play demo"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Transcript + handoff */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[22px] bg-white/[0.035] ring-1 ring-white/10 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusDot tone="emerald" pulse={!reduced} />
                  <div className="text-[13px] font-semibold">Illustrative transcript</div>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">Not a real recording</div>
              </div>
              <div className="mt-4 space-y-2.5">
                {shown.map((m, i) => (
                  <div key={i} className={`flex ${m.who === "ai" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${m.who === "ai" ? "bg-cyan-500/15 text-cyan-50 rounded-tl-sm ring-1 ring-cyan-400/20" : "bg-white/[0.08] text-white rounded-tr-sm ring-1 ring-white/10"}`}>
                      <div className={`mb-0.5 text-[10px] font-semibold uppercase tracking-wider ${m.who === "ai" ? "text-cyan-300" : "text-white/60"}`}>{m.who === "ai" ? "AI receptionist" : "Customer"}</div>
                      {m.t}
                    </div>
                  </div>
                ))}
                {!reduced && shown.length < transcript.length && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-tl-sm bg-white/[0.04] px-3 py-2 text-[12px] text-white/40 ring-1 ring-white/10">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: "120ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: "240ms" }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`rounded-[22px] p-5 ring-1 transition-all duration-500 ${bookingConfirmed ? "bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 ring-emerald-400/25" : "bg-white/[0.03] ring-white/10"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[13px] font-semibold">
                  <CheckCircle2 className={`h-4 w-4 ${bookingConfirmed ? "text-emerald-400" : "text-white/40"}`} />
                  {bookingConfirmed ? "Booking confirmed" : "Awaiting confirmation"}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">CRM handoff</div>
              </div>
              <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl bg-black/30 p-3 ring-1 ring-white/10">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/25 text-blue-200"><CalendarIcon className="h-4 w-4" /></span>
                <div className="text-[12px] min-w-0">
                  <div className="font-semibold text-[13px]">Thursday · 2:00 PM</div>
                  <div className="text-white/60 text-[11px] truncate">Confirmation text sent · assigned to team</div>
                </div>
                <span className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${bookingConfirmed ? "text-emerald-300" : "text-white/40"}`}>{bookingConfirmed ? "Sent" : "Draft"}</span>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-black/30 p-3 ring-1 ring-white/10">
                <V3Avatar name="Alex" tone="amber" size={34} />
                <div className="flex-1 text-[12px] min-w-0">
                  <div className="font-semibold text-[13px]">Assigned to Alex</div>
                  <div className="text-white/60 text-[11px] truncate">Full context handed off — notes, address, urgency</div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



/* =================================================================== */
/*  5. IndustriesV3 — three distinct editorial stories                   */
/* =================================================================== */

function IndustriesV3() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionEyebrow>Solutions</SectionEyebrow>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Built for the way service businesses actually work.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Different industries. The same challenge: respond faster, stay organised and keep customers moving.
          </p>
        </div>

        {/* Lead story: Automotive & trades */}
        <article className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12 items-center rounded-[26px] bg-gradient-to-br from-stone-100 via-white to-amber-50/40 ring-1 ring-stone-200 p-6 sm:p-10 overflow-hidden">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-900/5 px-3 py-1 text-[11px] font-semibold text-stone-700 ring-1 ring-stone-200">
              <WrenchIcon className="h-3.5 w-3.5 text-amber-600" /> Automotive & trades
            </div>
            <h3 className="mt-4 font-zapla text-2xl sm:text-[32px] font-semibold text-slate-950 leading-tight">
              Missed call → instant reply → booked job.
            </h3>
            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">
              Field teams live on the phone. Zapla catches every missed call, replies from your business number and books the job while you're still on-site.
            </p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[13px] text-slate-700">
              {["Missed-call SMS", "Job scheduling", "Quote follow-up", "Payment on completion"].map((c) => (
                <li key={c} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />{c}</li>
              ))}
            </ul>
            <a href={BOOK_URL} className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-stone-900 hover:text-blue-700">
              Explore solution <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-stone-200 aspect-[4/3] bg-stone-100">
              <img src={industryTrades.url} alt="Trades" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
            </div>
            {/* Floating UI overlay */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 w-[86%] rounded-2xl bg-white p-3.5 ring-1 ring-stone-200 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <StatusDot tone="amber" /> New booking · via missed-call flow
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                <V3Avatar name="Ryan T" tone="amber" size={30} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-slate-900">Ryan Thomas · brake service</div>
                  <div className="text-[11px] text-slate-500">Thu 3:30 PM · assigned to Alex</div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
          </div>
        </article>

        {/* Two supporting stories with distinct palettes */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Property & professional services — sage */}
          <article className="rounded-[26px] bg-gradient-to-br from-emerald-50/60 via-white to-white ring-1 ring-emerald-100/70 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/5 px-3 py-1 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
              <Briefcase className="h-3.5 w-3.5" /> Property & professional services
            </div>
            <h3 className="mt-4 font-zapla text-xl sm:text-2xl font-semibold text-slate-950 leading-tight">
              Enquiry → nurture → consultation.
            </h3>
            <div className="mt-4 rounded-xl bg-white p-3 ring-1 ring-emerald-100">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                <GmailGlyph size={14} /> Enquiry captured
                <span className="mx-1 text-slate-300">·</span>
                <StatusDot tone="emerald" pulse={false} /> Nurture running
              </div>
              <div className="mt-2 space-y-1.5">
                {[{ w: "Instagram DM", t: "Received" }, { w: "Auto-reply sent", t: "0s" }, { w: "Booking link", t: "Sent" }].map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-700">{r.w}</span>
                    <span className="text-emerald-700 font-semibold">{r.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-y-1.5 text-[13px] text-slate-700">
              {["Multi-channel enquiry capture", "Pipeline nurture", "Unified client history"].map((c) => (
                <li key={c} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />{c}</li>
              ))}
            </ul>
            <a href={BOOK_URL} className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-900 hover:text-blue-700">
              Explore solution <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>

          {/* Health, fitness & appointments — mint/teal */}
          <article className="rounded-[26px] bg-gradient-to-br from-teal-50/70 via-white to-stone-50 ring-1 ring-teal-100/70 p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/5 px-3 py-1 text-[11px] font-semibold text-teal-800 ring-1 ring-teal-200">
              <HeartPulse className="h-3.5 w-3.5" /> Health, fitness & appointments
            </div>
            <h3 className="mt-4 font-zapla text-xl sm:text-2xl font-semibold text-slate-950 leading-tight">
              Reminder → appointment → rebooking.
            </h3>
            <div className="mt-4 rounded-xl bg-white p-3 ring-1 ring-teal-100">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5"><CalendarIcon className="h-3 w-3 text-teal-600" /> This week</span>
                <span className="inline-flex items-center gap-1.5"><StatusDot tone="emerald" pulse={false} /> Reminders sent</span>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {[0,1,2,3,4,5,6].map((d) => (
                  <div key={d} className="h-8 rounded-md bg-teal-50 ring-1 ring-teal-100 flex items-end p-1">
                    <div className="w-full rounded-sm bg-teal-500/70" style={{ height: `${20 + d * 10}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 text-[11px] text-slate-500">Weekly booking view</div>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-y-1.5 text-[13px] text-slate-700">
              {["Online booking", "Automatic reminders", "One-click rebooking"].map((c) => (
                <li key={c} className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />{c}</li>
              ))}
            </ul>
            <a href={BOOK_URL} className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal-900 hover:text-blue-700">
              Explore solution <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </article>
        </div>

        {/* Compact list of remaining industries */}
        <div className="mt-10 rounded-2xl bg-slate-50 ring-1 ring-slate-200 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-700">
            <span className="text-slate-500 font-semibold">Also built for</span>
            {[
              { i: <HomeIcon className="h-3.5 w-3.5" />, l: "Real estate" },
              { i: <LandmarkIcon className="h-3.5 w-3.5" />, l: "Mortgage" },
              { i: <BedIcon className="h-3.5 w-3.5" />, l: "Short-stay" },
              { i: <ScaleIcon className="h-3.5 w-3.5" />, l: "Legal" },
              { i: <TicketIcon className="h-3.5 w-3.5" />, l: "Events" },
              { i: <DumbbellIcon className="h-3.5 w-3.5" />, l: "Fitness" },
              { i: <ShoppingBagIcon className="h-3.5 w-3.5" />, l: "E-commerce" },
              { i: <UtensilsIcon className="h-3.5 w-3.5" />, l: "Restaurants" },
              { i: <PackageIcon className="h-3.5 w-3.5" />, l: "Rentals" },
              { i: <CarIcon className="h-3.5 w-3.5" />, l: "Automotive" },
              { i: <StethoscopeIcon className="h-3.5 w-3.5" />, l: "Healthcare" },
            ].map((x) => (
              <span key={x.l} className="inline-flex items-center gap-1.5 text-slate-700">
                <span className="text-slate-400">{x.i}</span>{x.l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  6. ToolStackV3 — funnel-led composition                              */
/* =================================================================== */

function ToolStackV3() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16 items-center">
        <div>
          <SectionEyebrow>The stack</SectionEyebrow>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[46px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Consolidate a stack of disconnected tools into one customer record.
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Inbox, CRM, bookings, quotes, payments and workflows live in one place. Every call, message and job stays attached to the same contact.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "One connected customer record",
              "One inbox for every channel",
              "Bookings, quotes and payments linked to the contact",
              "Automations that move work between stages",
              "No more copy-pasting between apps",
            ].map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[14px] text-slate-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-blue-600 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-blue-100/60 via-white to-cyan-100/50 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-[26px] bg-white ring-1 ring-slate-200 p-4 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            <img src={funnelAsset.url} alt="16 disconnected apps replaced by one Zapla system" className="w-full h-auto rounded-[18px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  7. PricingPreviewV3                                                  */
/* =================================================================== */

function PricingPreviewV3() {
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <SectionEyebrow>Pricing</SectionEyebrow>
        <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[46px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
          One platform subscription. Unlimited users. No per-seat pricing.
        </h2>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Add your whole team on one subscription. Grow the team without watching the bill climb.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-medium text-slate-700 ring-1 ring-slate-200">
          <StatusDot tone="blue" pulse={false} /> SMS, email and AI usage are billed separately based on consumption
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 text-left">
          {[
            { name: "Core", tag: "Get started", note: "For small teams launching the essentials." },
            { name: "Growth", tag: "Most popular", note: "For businesses running follow-ups and reactivation.", primary: true },
            { name: "Scale", tag: "Multi-location", note: "For larger teams with routing and reporting." },
          ].map((p) => (
            <div key={p.name} className={`rounded-2xl p-6 ring-1 ${p.primary ? "bg-slate-950 text-white ring-slate-900 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)]" : "bg-white ring-slate-200"}`}>
              <div className={`text-[11px] font-semibold uppercase tracking-wider ${p.primary ? "text-cyan-300" : "text-slate-400"}`}>{p.tag}</div>
              <div className={`mt-1 font-zapla text-2xl font-semibold ${p.primary ? "text-white" : "text-slate-950"}`}>{p.name}</div>
              <p className={`mt-2 text-[13px] leading-relaxed ${p.primary ? "text-white/70" : "text-slate-600"}`}>{p.note}</p>
              <div className={`mt-4 text-[12px] ${p.primary ? "text-white/60" : "text-slate-500"}`}>Unlimited users included</div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <a href={BOOK_URL} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-[14px] font-semibold text-white shadow-sm hover:bg-blue-700">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  8. FaqV3                                                             */
/* =================================================================== */

function FaqV3() {
  const items = [
    { q: "Do you charge per user?", a: "No. Your Zapla subscription includes unlimited users. SMS, email and AI usage are billed separately based on consumption." },
    { q: "How long does launch take?", a: "We scope the timeline with you on a discovery call based on your integrations, data and workflows. Guided Launch is included so you're not setting it up alone." },
    { q: "Does Zapla replace my existing tools?", a: "Many customers use Zapla to consolidate CRM, inbox, bookings, quotes, payments and workflows. What you keep or retire is something we walk through together on the call." },
    { q: "What about SMS, email and AI costs?", a: "SMS, email and AI are usage-based and billed separately based on consumption, at cost-transparent rates." },
    { q: "Can I keep my phone number?", a: "Yes. Missed-call capture and SMS work with your existing business number." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-slate-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[42px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
          Straight answers.
        </h2>
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
          {items.map((it, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-semibold text-slate-900">{it.q}</span>
                <span className={`grid h-6 w-6 place-items-center rounded-full bg-slate-100 text-slate-600 transition ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-[14px] text-slate-600 leading-relaxed">{it.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*  9. FinalCtaV3                                                        */
/* =================================================================== */

function FinalCtaV3() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 px-6 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-blue-600/25 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <SectionEyebrow tone="cyan">Get started</SectionEyebrow>
        <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight leading-[1.05]">
          See Zapla running on your business in one call.
        </h2>
        <p className="mt-4 text-lg text-white/70 leading-relaxed">
          We'll walk through your customer journey and show exactly how Zapla removes what's leaking today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={BOOK_URL} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-semibold text-slate-950 shadow-sm hover:bg-white/90">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
          <span className="text-[12px] text-white/50">Guided launch included</span>
        </div>
      </div>
    </section>
  );
}


