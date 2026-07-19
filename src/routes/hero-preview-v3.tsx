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
      { title: "Hero Preview V2 — Zapla" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Preview of the new hero section with rotating feature cards." },
    ],
  }),
  component: HeroPreviewV2Page,
});

const BOOK_URL = "https://zapla.io/booking";

function HeroPreviewV2Page() {
  return (
    <main className="min-h-screen bg-zapla-bg">
      <Hero />
      <LifecycleStripV2 />
      <ConnectedSystemSectionV2 />
      <OutcomesV2 />
      <PlatformLifecycleV2 />
      <WorkflowTheatreV2 />
      <FocusedAIV2 />
      <IndustriesV2 />
      <ToolStackV2 />
      <PricingPreviewV2 />
      <FaqV2 />
      <FinalCtaV2 />
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

        {/* 6-card rotating stack */}
        <HeroCardStack />
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
          .hero-stack { height: 440px; }
          .hero-stack-card { padding: 16px 16px; border-radius: 16px; }
          .hero-stack-card .hero-card-header-title { font-size: 16px; }
          .hero-stack-card .hero-card-header-logo { height: 32px; width: 32px; }
          /* Scale down the fixed-width inner content so it fits on phones */
          .hero-card-body {
            transform: scale(0.5);
            transform-origin: top left;
            width: 200%;
            height: calc((100% - 56px) * 2);
          }
          /* Tighten the fanned peek so cards don't spill off-screen */
          .hero-stack-card[data-pos="1"] { transform: translateX(-14px) translateY(10px) scale(0.96); clip-path: inset(0 60% 0 0 round 16px); }
          .hero-stack-card[data-pos="2"] { transform: translateX(-28px) translateY(20px) scale(0.92); clip-path: inset(0 66% 0 0 round 16px); }
          .hero-stack-card[data-pos="3"],
          .hero-stack-card[data-pos="4"],
          .hero-stack-card[data-pos="5"] { opacity: 0; pointer-events: none; }
          .hero-cta { width: auto; height: 52px; padding: 0 22px; font-size: 0.95rem; }
          .hero-cta-text { margin-right: 40px; }
          .hero-cta-circle { width: 38px; height: 38px; right: 7px; }
          .hero-cta-circle svg { width: 15px; height: 15px; }
        }

      `}</style>
    </header>
  );
}

/* -------- Card stack orchestrator ---------------------------------- */

const HERO_CARDS = [
  { title: "Sales Pipeline",              logo: logoGreen.url,  Body: CardPipeline },
  { title: "Control Dashboard",                logo: logoBlue.url,   Body: CardDashboard },
  { title: "Automations",  logo: logoOrange.url, Body: CardAutomation },
  { title: "Reporting",  logo: logoPurple.url, Body: CardPerformance },
  { title: "Bookings",  logo: logoYellow.url, Body: CardCalendar },
  { title: "Contacts",            logo: logoTeal.url,   Body: CardTagging },
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

/* -------- Outcomes (editorial) ------------------------------------- */
function OutcomesV2() {
  const items = [
    {
      k: "01",
      title: "Respond before the competition",
      body: "Missed calls become SMS replies. First response in seconds, not hours.",
      chip: { icon: <PhoneMissed className="h-3.5 w-3.5" />, label: "Auto-reply sent · 00:03" },
    },
    {
      k: "02",
      title: "Keep every opportunity moving",
      body: "Quotes, bookings and follow-ups run on their own. Nothing goes silent.",
      chip: { icon: <Send className="h-3.5 w-3.5" />, label: "Follow-up · Day 3" },
    },
    {
      k: "03",
      title: "Turn completed work into cash and trust",
      body: "Invoices, payments and reviews fire the moment a job is done.",
      chip: { icon: <StarIcon className="h-3.5 w-3.5" />, label: "Review requested" },
    },
    {
      k: "04",
      title: "Create more value from customers you already have",
      body: "Reactivation campaigns re-engage past customers automatically.",
      chip: { icon: <RefreshCw className="h-3.5 w-3.5" />, label: "Win-back · sending" },
    },
  ];
  return (
    <section className="bg-white py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            What changes when nothing falls through.
          </h2>
        </div>
        <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {items.map((it) => (
            <article key={it.k} className="border-t border-neutral-900/10 pt-6">
              <div className="flex items-baseline gap-5">
                <span className="font-zapla text-[40px] font-semibold leading-none text-zapla-blue tabular-nums">{it.k}</span>
                <h3 className="font-zapla text-[24px] sm:text-[28px] font-semibold text-neutral-900 leading-tight">
                  {it.title}
                </h3>
              </div>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">{it.body}</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[12px] font-semibold text-sky-700 ring-1 ring-sky-100">
                {it.chip.icon} {it.chip.label}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Platform Lifecycle (6 purpose-built scenes) -------------- */

function ChipRow({ items }: { items: { icon: ReactNode; label: string; tone?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((c, i) => (
        <span key={i} className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${c.tone ?? "bg-neutral-50 text-neutral-700 ring-neutral-200"}`}>
          {c.icon} {c.label}
        </span>
      ))}
    </div>
  );
}

function SceneShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div>
          <div className="text-[13px] font-semibold text-neutral-900">{title}</div>
          <div className="text-[11px] text-neutral-500">{subtitle}</div>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </div>
      </div>
      <div className="flex-1 pt-4">{children}</div>
    </div>
  );
}

function CaptureScene() {
  const sources = [
    { icon: <PhoneMissed className="h-4 w-4" />, label: "Missed call", detail: "+61 400 812 559", color: "bg-red-500" },
    { icon: <Globe className="h-4 w-4" />,       label: "Web form",    detail: "quote-bathroom.zapla",  color: "bg-blue-500" },
    { icon: <Facebook className="h-4 w-4" />,    label: "Facebook lead", detail: "Meta Lead Ad · Renovation", color: "bg-[#1877F2]" },
    { icon: <Instagram className="h-4 w-4" />,   label: "Instagram DM", detail: "@mia.k", color: "bg-gradient-to-br from-[#F58529] to-[#DD2A7B]" },
    { icon: <Users className="h-4 w-4" />,       label: "Referral",     detail: "From Sarah Mitchell", color: "bg-emerald-500" },
  ];
  return (
    <SceneShell title="New enquiries" subtitle="5 sources · 1 contact record">
      <div className="grid gap-2.5">
        {sources.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-2.5 ring-1 ring-neutral-100">
            <span className={`grid h-8 w-8 place-items-center rounded-lg text-white ${s.color}`}>{s.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-neutral-900">{s.label}</div>
              <div className="truncate text-[11px] text-neutral-500">{s.detail}</div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-neutral-300" />
          </div>
        ))}
        <div className="mt-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 p-3 text-white shadow-sm">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/20"><Users className="h-4 w-4" /></div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold">1 unified contact created</div>
            <div className="text-[11px] text-white/80">All sources attributed automatically</div>
          </div>
          <CheckCircle2 className="h-5 w-5" />
        </div>
      </div>
    </SceneShell>
  );
}

function CommunicateScene() {
  const threads = [
    { icon: <MessageCircle className="h-3.5 w-3.5" />, chan: "SMS",       name: "Sarah M.",   msg: "Can I move my 3pm?",      time: "2m", unread: true, tone: "bg-emerald-500" },
    { icon: <Mail className="h-3.5 w-3.5" />,          chan: "Email",     name: "James O.",   msg: "Following up on the quote…", time: "8m", unread: true, tone: "bg-red-500" },
    { icon: <MessageSquare className="h-3.5 w-3.5" />, chan: "Messenger", name: "David C.",   msg: "Thanks — all confirmed",  time: "1h", unread: false, tone: "bg-[#0084FF]" },
    { icon: <Instagram className="h-3.5 w-3.5" />,     chan: "Instagram", name: "@mia.k",     msg: "Do you take DMs?",         time: "1h", unread: false, tone: "bg-gradient-to-br from-[#F58529] to-[#DD2A7B]" },
    { icon: <Phone className="h-3.5 w-3.5" />,         chan: "WhatsApp",  name: "Emma W.",    msg: "New booking request",     time: "3h", unread: false, tone: "bg-[#25D366]" },
  ];
  return (
    <SceneShell title="Unified inbox" subtitle="Every channel, one thread per customer">
      <div className="space-y-2">
        {threads.map((t, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-2.5 ring-1 ring-neutral-100">
            <span className={`grid h-8 w-8 place-items-center rounded-lg text-white ${t.tone}`}>{t.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-neutral-900">{t.name}</span>
                <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-semibold text-neutral-500 ring-1 ring-neutral-200">{t.chan}</span>
              </div>
              <div className="truncate text-[11px] text-neutral-500">{t.msg}</div>
            </div>
            <span className="text-[10px] text-neutral-400">{t.time}</span>
            {t.unread && <span className="h-2 w-2 rounded-full bg-blue-600" />}
          </div>
        ))}
      </div>
    </SceneShell>
  );
}

function ConvertScene() {
  const stages = [
    { label: "Enquiry", done: true,  icon: <Mail className="h-3.5 w-3.5" /> },
    { label: "Booking", done: true,  icon: <CalendarIcon className="h-3.5 w-3.5" /> },
    { label: "Quote",   done: true,  icon: <FileText className="h-3.5 w-3.5" /> },
    { label: "Payment", done: false, active: true, icon: <CreditCard className="h-3.5 w-3.5" /> },
  ];
  return (
    <SceneShell title="Opportunity · Jordan Clarke" subtitle="Kitchen renovation · $4,800">
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-neutral-200" />
          {stages.map((s, i) => (
            <div key={i} className="relative flex items-center gap-3 py-2">
              <div className={`z-10 grid h-8 w-8 place-items-center rounded-full ring-4 ring-white ${s.done ? "bg-emerald-500 text-white" : s.active ? "bg-blue-600 text-white shadow-md" : "bg-neutral-100 text-neutral-400"}`}>
                {s.done ? <CheckCircle2 className="h-4 w-4" /> : s.icon}
              </div>
              <div className="flex-1">
                <div className={`text-[13px] font-semibold ${s.done ? "text-neutral-500 line-through" : s.active ? "text-neutral-900" : "text-neutral-400"}`}>{s.label}</div>
                {s.active && <div className="text-[11px] text-blue-700 font-medium">Stripe link sent · awaiting payment</div>}
                {s.done && <div className="text-[11px] text-neutral-400">Complete</div>}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-white p-3 ring-1 ring-emerald-100">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold text-emerald-800">Auto-invoice ready on payment</div>
            <div className="text-[13px] font-bold text-emerald-800">$4,800</div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function OperateScene() {
  const rows = [
    { time: "09:00", cust: "Sarah M.",  job: "Consultation",     who: "Alex",  tone: "bg-emerald-100 text-emerald-700" },
    { time: "10:30", cust: "James O.",  job: "Site measure",     who: "Priya", tone: "bg-sky-100 text-sky-700" },
    { time: "13:00", cust: "Emma W.",   job: "Install visit",    who: "Alex",  tone: "bg-amber-100 text-amber-700" },
    { time: "15:30", cust: "David C.",  job: "Follow-up call",   who: "You",   tone: "bg-blue-100 text-blue-700" },
  ];
  return (
    <SceneShell title="Today · Thu 14 Nov" subtitle="Team schedule · 4 jobs">
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-neutral-50 p-2.5 ring-1 ring-neutral-100">
            <div className="w-14 shrink-0 text-[11px] font-semibold text-neutral-500 tabular-nums">{r.time}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-neutral-900 truncate">{r.job}</div>
              <div className="text-[11px] text-neutral-500 truncate">{r.cust}</div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.tone}`}>{r.who}</span>
          </div>
        ))}
        <div className="mt-1 grid grid-cols-3 gap-2 pt-1">
          <div className="rounded-lg bg-white p-2 ring-1 ring-neutral-200">
            <div className="text-[10px] text-neutral-500">Assigned</div>
            <div className="text-[15px] font-bold text-neutral-900">4</div>
          </div>
          <div className="rounded-lg bg-white p-2 ring-1 ring-neutral-200">
            <div className="text-[10px] text-neutral-500">In progress</div>
            <div className="text-[15px] font-bold text-blue-600">2</div>
          </div>
          <div className="rounded-lg bg-white p-2 ring-1 ring-neutral-200">
            <div className="text-[10px] text-neutral-500">Complete</div>
            <div className="text-[15px] font-bold text-emerald-600">1</div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function RetainScene() {
  const steps = [
    { icon: <CheckCircle2 className="h-4 w-4" />, label: "Job complete", detail: "Marked done by Alex · 3:00 PM", tone: "bg-emerald-500", done: true },
    { icon: <StarIcon className="h-4 w-4" />,     label: "Review request sent",  detail: "Google · SMS with link",       tone: "bg-amber-500", done: true },
    { icon: <Bell className="h-4 w-4" />,         label: "Service reminder scheduled", detail: "In 6 months · Nov 2026", tone: "bg-blue-500", active: true },
    { icon: <CalendarIcon className="h-4 w-4" />, label: "Rebooking link ready", detail: "One-tap in customer portal",    tone: "bg-neutral-300" },
  ];
  return (
    <SceneShell title="After the job · Sarah Mitchell" subtitle="Reputation, reminders, rebooking">
      <div className="space-y-2.5">
        {steps.map((s, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-xl p-2.5 ring-1 ${s.active ? "bg-blue-50 ring-blue-200" : "bg-neutral-50 ring-neutral-100"}`}>
            <span className={`grid h-9 w-9 place-items-center rounded-lg text-white ${s.tone}`}>{s.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-neutral-900">{s.label}</div>
              <div className="text-[11px] text-neutral-500 truncate">{s.detail}</div>
            </div>
            {s.done && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            {s.active && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Scheduled</span>}
          </div>
        ))}
      </div>
    </SceneShell>
  );
}

function GrowScene() {
  const flow = [
    { icon: <Users className="h-4 w-4" />, label: "Segment: no visit in 6mo",  detail: "Past customers", tone: "bg-neutral-800" },
    { icon: <Send className="h-4 w-4" />, label: "Win-back sent",              detail: "SMS + email with offer", tone: "bg-teal-500" },
    { icon: <MessageCircle className="h-4 w-4" />, label: "Replies coming in", detail: "Interested customers",   tone: "bg-emerald-500" },
    { icon: <CalendarIcon className="h-4 w-4" />, label: "New bookings",       detail: "Directly from reply",    tone: "bg-blue-600" },
  ];
  return (
    <SceneShell title="Reactivation campaign" subtitle="Segment → send → reply → booking">
      <div className="space-y-3">
        {flow.map((f, i) => (
          <div key={i} className="relative flex items-start gap-3">
            <span className={`z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-white ${f.tone}`}>{f.icon}</span>
            {i < flow.length - 1 && <span className="absolute left-4 top-9 h-6 w-px bg-neutral-200" />}
            <div className="flex-1 pt-1">
              <div className="text-[12px] font-semibold text-neutral-900">{f.label}</div>
              <div className="text-[11px] text-neutral-500">{f.detail}</div>
            </div>
          </div>
        ))}
        <div className="mt-2 rounded-xl bg-neutral-50 p-3 ring-1 ring-neutral-100">
          <ChipRow items={[
            { icon: <MessageCircle className="h-3 w-3" />, label: "SMS" },
            { icon: <Mail className="h-3 w-3" />,          label: "Email" },
            { icon: <Sparkles className="h-3 w-3" />,      label: "AI drafted copy", tone: "bg-sky-50 text-sky-700 ring-sky-200" },
          ]} />
        </div>
      </div>
    </SceneShell>
  );
}

type LifecycleTab = {
  key: string;
  label: string;
  headline: string;
  body: string;
  capabilities: string[];
  Scene: ComponentType;
};

const LIFECYCLE_TABS: LifecycleTab[] = [
  { key: "capture",     label: "Capture",     headline: "Every enquiry, from every channel.", body: "Calls, forms, ads and DMs land on one contact record.", capabilities: ["Missed calls", "Web forms", "Meta & Google leads", "Referrals"], Scene: CaptureScene },
  { key: "communicate", label: "Communicate", headline: "One inbox for every channel.",       body: "SMS, email, Messenger, Instagram and WhatsApp in one thread.", capabilities: ["Unified inbox", "Templates", "Team assignments", "Read receipts"], Scene: CommunicateScene },
  { key: "convert",     label: "Convert",     headline: "Enquiry to payment in one flow.",   body: "Bookings, quotes and payments move together on the pipeline.", capabilities: ["Pipelines", "Bookings", "Quotes", "Stripe & Square"], Scene: ConvertScene },
  { key: "operate",     label: "Operate",     headline: "Run the day without the whiteboard.", body: "Calendar, tasks, routing and status in the same system.", capabilities: ["Team calendars", "Task routing", "Mobile app", "Reporting"], Scene: OperateScene },
  { key: "retain",      label: "Retain",      headline: "Turn great work into reputation.",   body: "Review requests, reminders and rebooking fire automatically.", capabilities: ["Review requests", "Reminders", "Rebooking", "Reputation"], Scene: RetainScene },
  { key: "grow",        label: "Grow",        headline: "Your database is a growth channel.", body: "Reactivate quiet customers and surface upsell moments.", capabilities: ["Win-back", "Segments", "Broadcasts", "Upsell triggers"], Scene: GrowScene },
];

function PlatformLifecycleV2() {
  const [active, setActive] = useState(0);
  const tab = LIFECYCLE_TABS[active];
  const Scene = tab.Scene;
  return (
    <section className="bg-neutral-50 py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            One system for every stage of the customer lifecycle.
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {LIFECYCLE_TABS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={[
                  "rounded-full px-4 py-2 text-[13px] font-semibold transition",
                  isActive ? "bg-zapla-ink text-white shadow-sm" : "bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-100",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl bg-white p-4 ring-1 ring-neutral-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] sm:p-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] md:gap-10 md:p-8">
          <div className="flex flex-col justify-center px-1 md:px-3">
            <h3 className="font-zapla text-2xl sm:text-3xl md:text-[34px] font-semibold text-neutral-900 leading-tight">
              {tab.headline}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">{tab.body}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {tab.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2 text-[13px] text-neutral-700">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-zapla-blue text-white text-[9px]">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div key={tab.key} className="relative min-h-[460px] rounded-2xl bg-gradient-to-b from-white to-neutral-50 p-5 ring-1 ring-neutral-200 shadow-inner animate-fade-in">
            <Scene />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Workflow Theatre (one flow at a time) -------------------- */

type FlowStep = { icon: ReactNode; title: string; detail: string; tone: string };

type Flow = { key: string; label: string; headline: string; steps: FlowStep[] };

const FLOWS: Flow[] = [
  {
    key: "missed",
    label: "Missed call",
    headline: "A missed call becomes a lead, in seconds.",
    steps: [
      { icon: <PhoneMissed className="h-5 w-5" />, title: "Missed call",          detail: "+61 400 812 559 · 12:04", tone: "bg-red-500" },
      { icon: <MessageCircle className="h-5 w-5" />, title: "SMS auto-reply sent", detail: "\"Sorry we missed you — how can we help?\"", tone: "bg-emerald-500" },
      { icon: <MessageCircle className="h-5 w-5" />, title: "Customer replies",   detail: "\"Looking for a quote on a bathroom reno.\"", tone: "bg-blue-500" },
      { icon: <Users className="h-5 w-5" />, title: "Lead created in CRM",         detail: "Emma Wilson · assigned to Alex", tone: "bg-zapla-ink" },
    ],
  },
  {
    key: "quote",
    label: "Quote follow-up",
    headline: "Quotes stop going cold.",
    steps: [
      { icon: <FileText className="h-5 w-5" />, title: "Quote sent",          detail: "$4,800 emailed to Jordan Clarke", tone: "bg-blue-500" },
      { icon: <Zap className="h-5 w-5" />,      title: "No response · 3 days", detail: "Automation triggers", tone: "bg-amber-500" },
      { icon: <MessageCircle className="h-5 w-5" />, title: "SMS nudge sent",  detail: "\"Just checking in on the quote…\"", tone: "bg-emerald-500" },
      { icon: <Bell className="h-5 w-5" />, title: "Owner alerted on reply",   detail: "Notification in unified inbox", tone: "bg-zapla-ink" },
    ],
  },
  {
    key: "pay",
    label: "Payment & review",
    headline: "Cash in, review out.",
    steps: [
      { icon: <CheckCircle2 className="h-5 w-5" />, title: "Job marked complete", detail: "By Alex on mobile · 3:00 PM", tone: "bg-emerald-500" },
      { icon: <CreditCard className="h-5 w-5" />,   title: "Invoice sent",        detail: "$1,250 · Stripe link", tone: "bg-blue-500" },
      { icon: <CheckCircle2 className="h-5 w-5" />, title: "Payment received",    detail: "Visa ending 4242 · 3:12 PM", tone: "bg-emerald-600" },
      { icon: <StarIcon className="h-5 w-5" />,     title: "Review request queued", detail: "Google review link · SMS + email", tone: "bg-amber-500" },
    ],
  },
  {
    key: "winback",
    label: "Customer win-back",
    headline: "Bring customers back without lifting a finger.",
    steps: [
      { icon: <Users className="h-5 w-5" />,        title: "Inactive segment flagged", detail: "No visit in 6 months · 128 customers", tone: "bg-neutral-800" },
      { icon: <Send className="h-5 w-5" />,         title: "Win-back campaign sent",   detail: "Personalised SMS + email", tone: "bg-teal-500" },
      { icon: <MessageCircle className="h-5 w-5" />, title: "Replies routed to inbox", detail: "Interested customers surface", tone: "bg-emerald-500" },
      { icon: <CalendarIcon className="h-5 w-5" />, title: "New bookings created",     detail: "Directly from customer replies", tone: "bg-blue-600" },
    ],
  },
];

function WorkflowTheatreV2() {
  const [active, setActive] = useState(0);
  const flow = FLOWS[active];
  return (
    <section className="bg-white py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            Workflows that quietly run your business.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">
            Pick a flow and watch how one system handles it end-to-end.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FLOWS.map((f, i) => {
            const isActive = i === active;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "rounded-full px-4 py-2 text-[13px] font-semibold transition",
                  isActive ? "bg-zapla-blue text-white shadow-sm" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div key={flow.key} className="mt-8 rounded-3xl bg-gradient-to-b from-neutral-50 to-white p-6 sm:p-10 ring-1 ring-neutral-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)] animate-fade-in">
          <h3 className="font-zapla text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">{flow.headline}</h3>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {flow.steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="rounded-2xl bg-white p-5 ring-1 ring-neutral-200 shadow-sm h-full">
                  <div className="flex items-center justify-between">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${s.tone}`}>{s.icon}</span>
                    <span className="text-[10px] font-bold tabular-nums text-neutral-400">0{i + 1}</span>
                  </div>
                  <div className="mt-4 text-[14px] font-semibold text-neutral-900 leading-snug">{s.title}</div>
                  <div className="mt-1.5 text-[12px] leading-relaxed text-neutral-500">{s.detail}</div>
                </div>
                {i < flow.steps.length - 1 && (
                  <div className="pointer-events-none hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-zapla-blue" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Focused AI receptionist story --------------------------- */
function FocusedAIV2() {
  const companion = [
    { icon: <Phone className="h-4 w-4" />,       t: "Customer calls",       d: "Any hour, any channel", tone: "bg-blue-500" },
    { icon: <Sparkles className="h-4 w-4" />,    t: "AI answers",            d: "Natural conversation, on-brand", tone: "bg-cyan-500" },
    { icon: <ClipboardList className="h-4 w-4" />,t: "Details captured",     d: "Name, need, timing, contact", tone: "bg-sky-500" },
    { icon: <CalendarIcon className="h-4 w-4" />,t: "Booking confirmed",     d: "Slot placed in your calendar", tone: "bg-blue-600" },
    { icon: <Bell className="h-4 w-4" />,        t: "Team notified",         d: "Full transcript in the inbox", tone: "bg-emerald-500" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#050914] py-20 sm:py-28 px-6">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/12 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-200">
            AI receptionist
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-white leading-[1.05]">
            Every enquiry handled, even when your team is busy.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            AI answers, gathers details, books the appointment and hands the full context to your team.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-stretch">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 aspect-video shadow-[0_40px_120px_-40px_rgba(6,182,212,0.35)]">
            <video src={aiEmployeeVideo.url} autoPlay muted loop playsInline className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
          </div>

          <ol className="relative flex flex-col justify-center gap-3">
            {companion.map((s, i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur">
                <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${s.tone}`}>{s.icon}</span>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-white">{s.t}</div>
                  <div className="text-[11px] text-white/60">{s.d}</div>
                </div>
                <span className="text-[10px] font-bold tabular-nums text-white/40">0{i + 1}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-white/50">
          <span className="uppercase tracking-widest text-white/40">Also included</span>
          <a href="#" className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200">
            <Zap className="h-3.5 w-3.5" /> AI workflows for follow-ups <ArrowRight className="h-3 w-3" />
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200">
            <StarIcon className="h-3.5 w-3.5" /> AI reputation management <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------- Industries — 3 featured + compact list ------------------ */
function IndustriesV2() {
  const featured = [
    {
      icon: <WrenchIconLocal />, tag: "Automotive & trades",
      image: industryTrades.url,
      workflow: "Recover missed calls, book jobs and follow up every quote automatically.",
      caps: ["Missed-call SMS reply", "Job scheduling", "Quote follow-ups"],
      accent: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BriefcaseIconLocal />, tag: "Property & professional services",
      image: industryRealEstate.url,
      workflow: "Capture enquiries, nurture opportunities and keep every client conversation together.",
      caps: ["Enquiry capture", "Pipeline nurture", "Unified client history"],
      accent: "from-sky-500 to-indigo-500",
    },
    {
      icon: <HeartIconLocal />, tag: "Health, fitness & appointments",
      image: industryHealthcare.url,
      workflow: "Fill calendars, cut no-shows and bring customers back with reminders and rebooking.",
      caps: ["Online bookings", "Automated reminders", "Rebooking flows"],
      accent: "from-cyan-500 to-teal-500",
    },
  ];

  const others = [
    "Real estate & mortgage", "Legal & accounting", "Beauty & wellness",
    "Restaurants & hospitality", "E-commerce & retail", "Events & rentals",
    "Automotive service", "Home services & trades",
  ];

  return (
    <section className="bg-white py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            Built around three service business shapes.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((f) => (
            <article key={f.tag} className="group relative overflow-hidden rounded-3xl bg-neutral-50 ring-1 ring-neutral-200 transition hover:-translate-y-1 hover:shadow-lg">
              <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${f.accent}`}>
                <img src={f.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain opacity-90 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-xl bg-white/95 text-neutral-900 shadow ring-1 ring-white/40">
                  {f.icon}
                </div>
              </div>
              <div className="p-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue">Featured</div>
                <h3 className="mt-1.5 font-zapla text-[20px] font-semibold text-neutral-900 leading-snug">
                  {f.tag}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-neutral-600">{f.workflow}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.caps.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-[12.5px] text-neutral-700">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-zapla-blue text-white text-[9px]">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
                <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-zapla-blue hover:text-blue-700">
                  Explore solution <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-200 pt-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">Also serving</span>
          {others.map((o) => (
            <span key={o} className="text-[13px] text-neutral-600">{o}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WrenchIconLocal()   { return <Zap className="h-4 w-4" />; }
function BriefcaseIconLocal(){ return <Briefcase className="h-4 w-4" />; }
function HeartIconLocal()    { return <HeartPulse className="h-4 w-4" />; }

/* -------- Tool Stack — funnel dominant ---------------------------- */
function ToolStackV2() {
  const wins = [
    "One operating system",
    "Unlimited users",
    "One connected customer record",
    "Automated workflows across the journey",
  ];
  return (
    <section className="relative overflow-hidden bg-neutral-50 py-20 sm:py-24 px-6">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center">
          <div className="relative">
            <img
              src={funnelAsset.url}
              alt="16 disconnected apps funneling into one Zapla system"
              className="mx-auto w-full max-w-xl object-contain drop-shadow-[0_30px_60px_rgba(15,23,42,0.15)]"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
              One system without the per-seat tax.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">
              Most teams pay by the seat, per app. Zapla replaces the stack with one operating system and unlimited users.
            </p>
            <ul className="mt-6 space-y-2.5">
              {wins.map((w) => (
                <li key={w} className="flex items-center gap-3 text-[14px] text-neutral-800">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-zapla-blue text-white text-[11px] shadow-sm">✓</span>
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-neutral-700 ring-1 ring-neutral-200 shadow-sm">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-red-700">16 apps</span>
              <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">1 system</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Pricing preview (polished) ------------------------------ */
function PricingPreviewV2() {
  const included = [
    "Unlimited users",
    "CRM, pipelines & inbox",
    "Bookings, quotes & invoices",
    "Automations & reporting",
    "Reviews & reputation",
    "AI workflows",
  ];
  return (
    <section className="bg-white py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-sky-50 ring-1 ring-neutral-200 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] p-8 sm:p-12">
          <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            <div>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue ring-1 ring-neutral-200">
                Pricing
              </span>
              <h2 className="mt-4 font-zapla text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 leading-[1.05]">
                One flat platform fee. Unlimited users.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 max-w-md">
                No per-seat billing, no surprise upgrades. Add your whole team on day one.
              </p>
              <a
                href="/pricing-v2"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-zapla-ink px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-neutral-800 transition"
              >
                See full pricing <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <ul className="grid grid-cols-1 gap-2">
              {included.map((it) => (
                <li key={it} className="flex items-center gap-3 rounded-xl bg-white/70 backdrop-blur px-4 py-3 text-[14px] text-neutral-800 ring-1 ring-neutral-200">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-zapla-blue text-white text-[11px]">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- FAQ ----------------------------------------------------- */
function FaqV2() {
  const faqs = [
    { q: "Is Zapla really priced without per-seat fees?", a: "Yes. One platform fee covers unlimited users. Add your entire team without worrying about tier upgrades." },
    { q: "How does the AI actually help my team?", a: "AI answers calls, qualifies enquiries, sends follow-ups and books jobs. Your team steps in when a real conversation is needed." },
    { q: "Will Zapla replace all my current tools?", a: "For most service businesses, yes. CRM, inbox, bookings, invoicing, reviews and automations sit in one system." },
    { q: "Can I bring my existing data across?", a: "Contacts, pipelines and appointments can be imported. Popular tools connect directly for ongoing sync." },
    { q: "Can I cancel at any time?", a: "Yes. Zapla is month-to-month with no lock-in contracts." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-neutral-50 py-20 sm:py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-zapla text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            Common questions.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200 bg-white rounded-2xl ring-1 ring-neutral-200 px-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="px-4">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[16px] font-semibold text-neutral-900">{f.q}</span>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-neutral-300 text-neutral-500 transition ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && <p className="pb-6 pr-10 text-[14.5px] leading-relaxed text-neutral-600">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------- Final CTA ----------------------------------------------- */
function FinalCtaV2() {
  return (
    <section className="relative overflow-hidden bg-zapla-ink py-20 sm:py-28 px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(37,99,255,0.25),transparent_65%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-zapla text-3xl sm:text-4xl md:text-[56px] font-semibold tracking-tight leading-[1.02]">
          One system. Everything runs.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
          See Zapla with a guided walkthrough tailored to your business.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={BOOK_URL}
            className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-zapla-ink hover:bg-neutral-100 transition"
          >
            Book a Call
            <span className="grid h-8 w-8 place-items-center rounded-full bg-zapla-ink text-white">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
