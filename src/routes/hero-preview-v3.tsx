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

/* -------- 1. OutcomesV3 — editorial, one lead + three supporting --- */

function OutcomesV3() {
  const supporting = [
    {
      k: "02",
      title: "Every opportunity keeps moving",
      body: "Quotes, bookings and follow-ups run on their own. Nothing goes silent.",
      chip: (
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-blue-100 text-blue-700"><Send className="h-2.5 w-2.5" /></span>
          Follow-up · Day 3
        </div>
      ),
    },
    {
      k: "03",
      title: "Finished jobs turn into cash & trust",
      body: "Invoices, payments and reviews fire the moment a job is done.",
      chip: (
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm">
          <StripeGlyph size={14} /> Paid · $4,800
          <span className="mx-1 text-slate-300">·</span>
          <GoogleGlyph size={14} /> Review sent
        </div>
      ),
    },
    {
      k: "04",
      title: "Old customers become new revenue",
      body: "Reactivation campaigns re-engage past customers automatically.",
      chip: (
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-teal-100 text-teal-700"><RefreshCw className="h-2.5 w-2.5" /></span>
          42 customers re-engaged
        </div>
      ),
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">The outcome</span>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            What changes when nothing falls through.
          </h2>
        </div>

        {/* Lead outcome — dominant */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center">
          <div className="border-t border-slate-900/10 pt-8">
            <div className="flex items-baseline gap-5">
              <span className="font-zapla text-[64px] font-semibold leading-none text-zapla-blue tabular-nums">01</span>
              <div className="min-w-0">
                <h3 className="font-zapla text-[28px] sm:text-[36px] font-semibold text-slate-950 leading-[1.1]">
                  Respond before the competition does.
                </h3>
                <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-slate-600">
                  Missed calls become SMS replies within seconds. AI handles overflow. Your team steps in when it matters.
                </p>
              </div>
            </div>
          </div>

          {/* Live UI fragment — missed call to booked in 03s */}
          <V3Card className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <V3IconTile tone="red" size={36}><PhoneMissed className="h-4 w-4" /></V3IconTile>
                <div>
                  <div className="text-[13px] font-semibold text-slate-900">Missed call · 12:04 PM</div>
                  <div className="text-[11px] text-slate-500">+61 400 812 559 · Emma Wilson</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Auto
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
                <V3IconTile tone="emerald" size={28}><MessageCircle className="h-3.5 w-3.5" /></V3IconTile>
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] font-semibold text-slate-900">SMS sent · 12:04 PM · 3s later</div>
                  <div className="text-[11.5px] text-slate-600">"Sorry we missed you — reply here and we'll book you in."</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
                <V3Avatar name="Emma Wilson" tone="cyan" size={28} />
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] font-semibold text-slate-900">Emma · 12:06 PM</div>
                  <div className="text-[11.5px] text-slate-600">"Yes please — quote for a bathroom reno."</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 p-2.5 text-white">
                <V3IconTile tone="white" size={28}><CalendarIcon className="h-3.5 w-3.5" /></V3IconTile>
                <div className="min-w-0 flex-1">
                  <div className="text-[11.5px] font-semibold">Booked · Thu 14 Nov, 2:00 PM</div>
                  <div className="text-[11px] text-white/85">Assigned to Alex · added to pipeline</div>
                </div>
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
          </V3Card>
        </div>

        {/* Supporting outcomes — three, thin dividers, small chips */}
        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {supporting.map((it) => (
            <article key={it.k} className="border-t border-slate-900/10 pt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-zapla text-[32px] font-semibold leading-none text-slate-300 tabular-nums">{it.k}</span>
                <h3 className="font-zapla text-[20px] font-semibold text-slate-950 leading-tight">{it.title}</h3>
              </div>
              <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-slate-600">{it.body}</p>
              <div className="mt-4">{it.chip}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 2. PlatformLifecycleV3 — 6 fresh product scenes ---------- */

function V3SceneHeader({ app, title, subtitle, right }: { app: string; title: string; subtitle: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <div className="flex items-center gap-2.5">
        <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white">{app}</span>
        <div>
          <div className="text-[13px] font-semibold text-slate-900 leading-tight">{title}</div>
          <div className="text-[11px] text-slate-500 leading-tight">{subtitle}</div>
        </div>
      </div>
      {right ?? (
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
        </span>
      )}
    </div>
  );
}

function CaptureSceneV3() {
  const sources = [
    { g: <PhoneMissed className="h-4 w-4" />, tone: "red" as const,  label: "Missed call",     detail: "+61 400 812 559 · 12:04 PM",  badge: "Voice" },
    { g: <FbGlyph size={18} />,               tone: "white" as const, label: "Meta Lead Ad",    detail: "Bathroom Reno Campaign · Sydney", badge: "Facebook" },
    { g: <InstaGlyph size={18} />,            tone: "white" as const, label: "Instagram DM",    detail: "@mia.k · quick question",     badge: "Instagram" },
    { g: <GmailGlyph size={18} />,            tone: "white" as const, label: "Contact form",    detail: "james@acme.com · 08:42 AM",   badge: "Email" },
    { g: <Users className="h-4 w-4" />,       tone: "emerald" as const, label: "Referral",       detail: "From Sarah Mitchell",         badge: "Contact" },
  ];
  return (
    <div className="flex h-full flex-col">
      <V3SceneHeader app="Inbox" title="Today's new enquiries" subtitle="5 sources · 1 unified contact record" />
      <div className="flex-1 space-y-2 pt-4">
        {sources.map((s, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
            <V3IconTile tone={s.tone} size={34}>{s.g}</V3IconTile>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] font-semibold text-slate-900">{s.label}</span>
                <span className="rounded bg-white px-1.5 py-0.5 text-[9.5px] font-semibold text-slate-500 ring-1 ring-slate-200">{s.badge}</span>
              </div>
              <div className="truncate text-[11.5px] text-slate-500">{s.detail}</div>
            </div>
            <span className="text-[10px] tabular-nums text-slate-400">now</span>
          </div>
        ))}
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 p-3 text-white shadow-sm">
          <V3IconTile tone="white" size={30}><Users className="h-4 w-4" /></V3IconTile>
          <div className="flex-1">
            <div className="text-[12.5px] font-semibold">One contact record created</div>
            <div className="text-[11px] text-white/85">Sources attributed · owner assigned</div>
          </div>
          <CheckCircle2 className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function CommunicateSceneV3() {
  const threads = [
    { g: <WhatsAppGlyph />,   name: "Sarah Mitchell", chan: "WhatsApp",  msg: "Can we shift my 3pm to Thursday?", time: "2m",  unread: true,  owner: "Alex" },
    { g: <GmailGlyph />,      name: "James O'Neill",  chan: "Gmail",     msg: "Following up on the quote for the reno…", time: "8m",  unread: true,  owner: "Priya" },
    { g: <MessengerGlyph />,  name: "David Chen",     chan: "Messenger", msg: "Thanks — all confirmed for tomorrow", time: "1h",  unread: false, owner: "Alex" },
    { g: <InstaGlyph />,      name: "@mia.k",         chan: "Instagram", msg: "Do you take DMs for bookings?",     time: "1h",  unread: false, owner: "AI" },
    { g: <FbGlyph />,         name: "Emma Wilson",    chan: "Messenger", msg: "New booking request just came in.", time: "3h",  unread: false, owner: "Alex" },
  ];
  return (
    <div className="flex h-full flex-col">
      <V3SceneHeader app="Inbox" title="Unified inbox" subtitle="One thread per customer · every channel" right={
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">2 unread</span>
      } />
      <div className="flex-1 space-y-2 pt-4">
        {threads.map((t, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
            <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-white ring-1 ring-slate-200">{t.g}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] font-semibold text-slate-900">{t.name}</span>
                <span className="rounded bg-white px-1.5 py-0.5 text-[9.5px] font-semibold text-slate-500 ring-1 ring-slate-200">{t.chan}</span>
              </div>
              <div className="truncate text-[11.5px] text-slate-500">{t.msg}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] tabular-nums text-slate-400">{t.time}</span>
              <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${t.owner === "AI" ? "bg-sky-100 text-sky-700" : "bg-slate-200 text-slate-700"}`}>{t.owner}</span>
            </div>
            {t.unread && <span className="h-2 w-2 rounded-full bg-blue-600" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConvertSceneV3() {
  const stages = [
    { label: "Enquiry", done: true,  detail: "Emma Wilson · WhatsApp" },
    { label: "Booking", done: true,  detail: "Site visit · Thu 14 Nov" },
    { label: "Quote",   done: true,  detail: "$4,800 · sent 08:12 AM" },
    { label: "Payment", done: false, active: true, detail: "Stripe link · awaiting" },
  ];
  return (
    <div className="flex h-full flex-col">
      <V3SceneHeader app="Deals" title="Opportunity · Jordan Clarke" subtitle="Kitchen renovation · $4,800" right={
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">75% won</span>
      } />
      <div className="flex-1 pt-5">
        <div className="relative">
          <div className="absolute left-[15px] top-1 h-[calc(100%-8px)] w-px bg-slate-200" />
          {stages.map((s, i) => (
            <div key={i} className="relative flex items-start gap-3 py-2.5">
              <div className={`z-10 grid h-8 w-8 place-items-center rounded-full ring-4 ring-white ${s.done ? "bg-emerald-500 text-white" : s.active ? "bg-blue-600 text-white shadow" : "bg-slate-100 text-slate-400"}`}>
                {s.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[11px] font-bold">{i + 1}</span>}
              </div>
              <div className="flex-1 pt-1">
                <div className={`text-[13px] font-semibold ${s.done ? "text-slate-500 line-through" : s.active ? "text-slate-900" : "text-slate-400"}`}>{s.label}</div>
                <div className={`text-[11.5px] ${s.active ? "text-blue-700 font-semibold" : "text-slate-500"}`}>{s.detail}</div>
              </div>
              {s.active && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">Awaiting</span>}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-white p-3 ring-1 ring-emerald-100">
          <StripeGlyph size={26} />
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-emerald-900">Auto-invoice ready on payment</div>
            <div className="text-[11px] text-emerald-700/80">Stripe · card, tap, transfer</div>
          </div>
          <div className="text-[15px] font-bold text-emerald-900">$4,800</div>
        </div>
      </div>
    </div>
  );
}

function OperateSceneV3() {
  const rows = [
    { time: "09:00", job: "Consultation",  cust: "Sarah Mitchell", who: "Alex",  tone: "bg-emerald-100 text-emerald-700", status: "In progress" },
    { time: "10:30", job: "Site measure",  cust: "James O'Neill",  who: "Priya", tone: "bg-sky-100 text-sky-700",         status: "En route" },
    { time: "13:00", job: "Install visit", cust: "Emma Wilson",    who: "Alex",  tone: "bg-amber-100 text-amber-700",     status: "Scheduled" },
    { time: "15:30", job: "Follow-up",     cust: "David Chen",     who: "You",   tone: "bg-blue-100 text-blue-700",       status: "Prep" },
  ];
  return (
    <div className="flex h-full flex-col">
      <V3SceneHeader app="Ops" title="Today · Thu 14 Nov" subtitle="Team schedule · 4 jobs" right={
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">Week ▾</span>
      } />
      <div className="flex-1 space-y-2 pt-4">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-2.5 ring-1 ring-slate-100">
            <div className="w-14 shrink-0 rounded-lg bg-white py-1 text-center text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200 tabular-nums">{r.time}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-slate-900 truncate">{r.job}</div>
              <div className="text-[11px] text-slate-500 truncate">{r.cust}</div>
            </div>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-slate-200">{r.status}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.tone}`}>{r.who}</span>
          </div>
        ))}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="rounded-xl bg-white p-2.5 ring-1 ring-slate-200"><div className="text-[10px] text-slate-500">Assigned</div><div className="text-[16px] font-bold text-slate-900">4</div></div>
          <div className="rounded-xl bg-white p-2.5 ring-1 ring-slate-200"><div className="text-[10px] text-slate-500">In progress</div><div className="text-[16px] font-bold text-blue-600">2</div></div>
          <div className="rounded-xl bg-white p-2.5 ring-1 ring-slate-200"><div className="text-[10px] text-slate-500">Complete</div><div className="text-[16px] font-bold text-emerald-600">1</div></div>
        </div>
      </div>
    </div>
  );
}

function RetainSceneV3() {
  const steps = [
    { icon: <CheckCircle2 className="h-4 w-4" />, tone: "emerald" as const, t: "Job complete",           d: "Marked done by Alex · 3:00 PM",    done: true },
    { icon: <GoogleGlyph size={16} />,            tone: "white" as const,   t: "Google review request",  d: "SMS with review link · 3:02 PM",   done: true },
    { icon: <Bell className="h-4 w-4" />,         tone: "sky" as const,     t: "Service reminder",       d: "Scheduled for May 2026",           active: true },
    { icon: <CalendarIcon className="h-4 w-4" />, tone: "blue" as const,    t: "One-tap rebooking",      d: "Portal link in customer profile" },
  ];
  return (
    <div className="flex h-full flex-col">
      <V3SceneHeader app="Retain" title="After the job · Sarah Mitchell" subtitle="Reputation, reminders, rebooking" />
      <div className="flex-1 space-y-2.5 pt-4">
        {steps.map((s, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-2xl p-2.5 ring-1 ${s.active ? "bg-sky-50 ring-sky-200" : "bg-slate-50 ring-slate-100"}`}>
            <V3IconTile tone={s.tone} size={36}>{s.icon}</V3IconTile>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-semibold text-slate-900">{s.t}</div>
              <div className="text-[11.5px] text-slate-500 truncate">{s.d}</div>
            </div>
            {s.done && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            {s.active && <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700">Scheduled</span>}
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2 rounded-2xl bg-white p-3 ring-1 ring-slate-200">
          <div className="flex -space-x-1">
            {[1,2,3,4,5].map((n) => <StarIcon key={n} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
          </div>
          <div className="text-[11.5px] text-slate-600"><span className="font-semibold text-slate-900">4.9</span> from 128 reviews · +14 this month</div>
        </div>
      </div>
    </div>
  );
}

function GrowSceneV3() {
  const flow = [
    { icon: <Users className="h-4 w-4" />,        tone: "ink" as const,     t: "Segment: no visit in 6 months", d: "128 past customers" },
    { icon: <Sparkles className="h-4 w-4" />,     tone: "cyan" as const,    t: "AI-drafted win-back copy",       d: "Personalised by service history" },
    { icon: <Send className="h-4 w-4" />,         tone: "sky" as const,     t: "SMS + email sent",                d: "Sent 08:00 AM · scheduled" },
    { icon: <MessageCircle className="h-4 w-4" />,tone: "emerald" as const, t: "42 replies in the inbox",         d: "Routed to available owners" },
    { icon: <CalendarIcon className="h-4 w-4" />, tone: "blue" as const,    t: "18 new bookings created",         d: "Directly from customer replies" },
  ];
  return (
    <div className="flex h-full flex-col">
      <V3SceneHeader app="Grow" title="Reactivation campaign" subtitle="Segment → send → reply → booking" />
      <div className="flex-1 pt-4">
        <div className="relative">
          {flow.map((f, i) => (
            <div key={i} className="relative flex items-start gap-3 pb-3 last:pb-0">
              <V3IconTile tone={f.tone} size={36}>{f.icon}</V3IconTile>
              {i < flow.length - 1 && <span className="absolute left-[17px] top-[38px] h-[calc(100%-38px)] w-px bg-slate-200" />}
              <div className="flex-1 pt-1">
                <div className="text-[12.5px] font-semibold text-slate-900">{f.t}</div>
                <div className="text-[11.5px] text-slate-500">{f.d}</div>
              </div>
              {i === flow.length - 1 && <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">+18</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type V3Tab = { key: string; label: string; headline: string; body: string; capabilities: string[]; Scene: ComponentType };

const V3_TABS: V3Tab[] = [
  { key: "capture",     label: "Capture",     headline: "Every enquiry, from every channel.",  body: "Calls, forms, ads and DMs land on one contact record with source attribution.", capabilities: ["Missed-call SMS", "Meta & Google leads", "Web forms", "Referral capture"], Scene: CaptureSceneV3 },
  { key: "communicate", label: "Communicate", headline: "One inbox for every channel.",         body: "WhatsApp, SMS, Gmail, Messenger and Instagram in one thread per customer.",     capabilities: ["Unified inbox", "AI drafts", "Team assignments", "Templates"],  Scene: CommunicateSceneV3 },
  { key: "convert",     label: "Convert",     headline: "Enquiry to payment in one flow.",      body: "Bookings, quotes and payments move together on the pipeline.",                capabilities: ["Pipelines", "Quotes", "Stripe & Square", "Auto invoices"],       Scene: ConvertSceneV3 },
  { key: "operate",     label: "Operate",     headline: "Run the day without the whiteboard.",  body: "Calendar, tasks, routing and status in the same system.",                     capabilities: ["Team calendars", "Task routing", "Mobile app", "Reporting"],    Scene: OperateSceneV3 },
  { key: "retain",      label: "Retain",      headline: "Turn great work into reputation.",     body: "Review requests, reminders and rebooking fire automatically.",                capabilities: ["Google reviews", "Reminders", "Rebooking", "Reputation"],       Scene: RetainSceneV3 },
  { key: "grow",        label: "Grow",        headline: "Your database is a growth channel.",   body: "Reactivate quiet customers and surface upsell moments.",                      capabilities: ["Win-back", "Segments", "Broadcasts", "AI copy"],                Scene: GrowSceneV3 },
];

function PlatformLifecycleV3() {
  const [active, setActive] = useState(0);
  const tab = V3_TABS[active];
  const Scene = tab.Scene;
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">The platform</span>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            One system for every stage of the customer lifecycle.
          </h2>
        </div>

        {/* Desktop tabbed stage */}
        <div className="mt-10 hidden md:block">
          <div className="flex flex-wrap gap-2">
            {V3_TABS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={[
                    "rounded-full px-4 py-2 text-[13px] font-semibold transition",
                    isActive ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          <div className="mt-8 grid gap-6 rounded-[28px] bg-white p-6 ring-1 ring-slate-200 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.28)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] md:gap-10 md:p-10">
            <div className="flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">{tab.label}</span>
              <h3 className="mt-3 font-zapla text-2xl sm:text-3xl md:text-[34px] font-semibold text-slate-950 leading-tight">{tab.headline}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">{tab.body}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {tab.capabilities.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] text-slate-700">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-zapla-blue text-white text-[9px]">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div key={tab.key} className="relative min-h-[500px] rounded-[22px] bg-gradient-to-b from-slate-50 to-white p-5 ring-1 ring-slate-200 animate-fade-in">
              <Scene />
            </div>
          </div>
        </div>

        {/* Mobile: one scene per stack, no tabs */}
        <div className="mt-8 space-y-6 md:hidden">
          {V3_TABS.map((t) => {
            const S = t.Scene;
            return (
              <div key={t.key}>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-zapla-blue">{t.label}</span>
                <h3 className="mt-1.5 font-zapla text-xl font-semibold text-slate-950 leading-snug">{t.headline}</h3>
                <p className="mt-2 text-[13.5px] text-slate-600">{t.body}</p>
                <div className="mt-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 shadow-sm">
                  <div className="min-h-[420px]"><S /></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------- 3. WorkflowTheatreV3 — central hub + connectors ---------- */

type V3FlowStep = { icon: ReactNode; title: string; detail: string; tone: "blue" | "cyan" | "ink" | "emerald" | "amber" | "red" | "sky" };
type V3Flow = { key: string; label: string; headline: string; body: string; steps: V3FlowStep[] };

const V3_FLOWS: V3Flow[] = [
  {
    key: "missed",
    label: "Missed call",
    headline: "A missed call becomes a booked job.",
    body: "Auto-reply, capture, route, book — all in seconds.",
    steps: [
      { icon: <PhoneMissed className="h-4 w-4" />,   title: "Missed call",          detail: "+61 400 812 559 · 12:04 PM",                tone: "red" },
      { icon: <MessageCircle className="h-4 w-4" />, title: "SMS auto-reply",        detail: "3s later · from your business number",       tone: "emerald" },
      { icon: <Sparkles className="h-4 w-4" />,      title: "AI qualifies reply",     detail: "Emma · bathroom reno · Sydney",              tone: "cyan" },
      { icon: <CalendarIcon className="h-4 w-4" />,  title: "Booking placed",        detail: "Thu 14 Nov, 2:00 PM · assigned to Alex",      tone: "blue" },
    ],
  },
  {
    key: "quote",
    label: "Quote follow-up",
    headline: "Quotes stop going cold.",
    body: "Automatic nudges keep the conversation alive without chasing.",
    steps: [
      { icon: <FileText className="h-4 w-4" />,      title: "Quote sent",            detail: "$4,800 · emailed to Jordan Clarke",           tone: "blue" },
      { icon: <Zap className="h-4 w-4" />,           title: "No reply · Day 3",      detail: "Workflow triggers",                            tone: "amber" },
      { icon: <MessageCircle className="h-4 w-4" />, title: "SMS nudge sent",        detail: "\"Just checking in on the quote…\"",           tone: "emerald" },
      { icon: <Bell className="h-4 w-4" />,          title: "Owner alerted on reply",detail: "Notification in unified inbox",                 tone: "ink" },
    ],
  },
  {
    key: "pay",
    label: "Payment & review",
    headline: "Cash in, review out.",
    body: "Every completed job triggers invoice, payment, receipt and review.",
    steps: [
      { icon: <CheckCircle2 className="h-4 w-4" />,  title: "Job marked complete",   detail: "By Alex on mobile · 3:00 PM",                 tone: "emerald" },
      { icon: <StripeGlyph size={16} />,             title: "Invoice sent",          detail: "$1,250 · Stripe link",                        tone: "sky" },
      { icon: <CheckCircle2 className="h-4 w-4" />,  title: "Payment received",      detail: "Visa •• 4242 · 3:12 PM",                       tone: "emerald" },
      { icon: <GoogleGlyph size={16} />,             title: "Review request queued", detail: "Google review · SMS + email",                  tone: "amber" },
    ],
  },
  {
    key: "winback",
    label: "Customer win-back",
    headline: "Bring customers back on autopilot.",
    body: "Reactivate quiet customers with AI-drafted campaigns.",
    steps: [
      { icon: <Users className="h-4 w-4" />,         title: "Inactive segment",       detail: "No visit in 6 months · 128 customers",         tone: "ink" },
      { icon: <Sparkles className="h-4 w-4" />,      title: "AI-drafted copy",        detail: "Personalised by service history",              tone: "cyan" },
      { icon: <Send className="h-4 w-4" />,          title: "SMS + email sent",       detail: "42 replies in inbox · 18 bookings",            tone: "emerald" },
      { icon: <CalendarIcon className="h-4 w-4" />,  title: "New bookings",           detail: "Straight from customer replies",               tone: "blue" },
    ],
  },
];

function WorkflowTheatreV3() {
  const [active, setActive] = useState(0);
  const flow = V3_FLOWS[active];

  const toneBg: Record<string, string> = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-700",
    cyan: "bg-gradient-to-br from-cyan-400 to-sky-600",
    ink:  "bg-gradient-to-br from-slate-800 to-slate-950",
    emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    amber:   "bg-gradient-to-br from-amber-400 to-orange-500",
    red:     "bg-gradient-to-br from-rose-500 to-red-600",
    sky:     "bg-gradient-to-br from-sky-400 to-blue-600",
  };

  return (
    <section className="bg-white py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">The workflows</span>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Workflows that quietly run your business.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">Pick a flow. Watch Zapla handle it end-to-end.</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {V3_FLOWS.map((f, i) => {
            const isActive = i === active;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  "rounded-full px-4 py-2 text-[13px] font-semibold transition",
                  isActive ? "bg-zapla-blue text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div key={flow.key} className="mt-8 overflow-hidden rounded-[28px] bg-gradient-to-b from-slate-950 to-slate-900 p-6 sm:p-10 text-white shadow-[0_40px_100px_-40px_rgba(15,23,42,0.45)] animate-fade-in">
          <h3 className="font-zapla text-2xl sm:text-3xl font-semibold leading-tight">{flow.headline}</h3>
          <p className="mt-2 max-w-xl text-[14px] text-white/60">{flow.body}</p>

          {/* Desktop theatre — central Zapla hub with orbiting events */}
          <div className="relative mt-10 hidden min-h-[420px] md:block">
            {/* Connector rings */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="v3-conn" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#22d3ee" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <ellipse cx="50" cy="50" rx="38" ry="30" fill="none" stroke="url(#v3-conn)" strokeWidth="0.15" strokeDasharray="0.6 0.8" />
              <ellipse cx="50" cy="50" rx="28" ry="22" fill="none" stroke="url(#v3-conn)" strokeWidth="0.1" strokeDasharray="0.4 0.6" opacity="0.6" />
            </svg>

            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-24 w-24 place-items-center rounded-[22px] bg-gradient-to-br from-blue-500 to-cyan-400 shadow-[0_20px_60px_-10px_rgba(34,211,238,0.55)] ring-1 ring-white/20">
                <img src={logoWhite.url} alt="Zapla" className="h-10 w-10 object-contain" />
              </div>
              <div className="mt-3 text-center text-[11px] font-semibold uppercase tracking-widest text-white/70">Zapla · running</div>
            </div>

            {/* 4 event cards positioned around */}
            {flow.steps.map((s, i) => {
              const positions = [
                "top-0 left-4 sm:left-8",
                "top-0 right-4 sm:right-8",
                "bottom-0 left-4 sm:left-8",
                "bottom-0 right-4 sm:right-8",
              ];
              return (
                <div key={i} className={`absolute z-20 w-[260px] ${positions[i]}`}>
                  <div className="rounded-[18px] bg-white/[0.06] p-3 ring-1 ring-white/10 backdrop-blur">
                    <div className="flex items-center gap-2.5">
                      <span className={`grid h-9 w-9 place-items-center rounded-[10px] text-white ${toneBg[s.tone]}`}>{s.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold tabular-nums text-white/40">0{i + 1}</span>
                          <span className="text-[12.5px] font-semibold text-white">{s.title}</span>
                        </div>
                        <div className="truncate text-[11px] text-white/60">{s.detail}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical connected stepper */}
          <ol className="mt-8 space-y-3 md:hidden">
            {flow.steps.map((s, i) => (
              <li key={i} className="relative flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-white ${toneBg[s.tone]}`}>{s.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold tabular-nums text-white/40">0{i + 1}</span>
                    <span className="text-[13px] font-semibold text-white">{s.title}</span>
                  </div>
                  <div className="text-[11.5px] text-white/60">{s.detail}</div>
                </div>
                {i < flow.steps.length - 1 && <span className="absolute left-[27px] top-[52px] h-3 w-px bg-white/20" />}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* -------- 4. FocusedAIV3 — ai-employee.mp4 dominant motion --------- */

function FocusedAIV3() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const transcript = [
    { who: "ai",   text: "Thanks for calling Zapla Plumbing — how can I help?" },
    { who: "cust", text: "Hi, I need a quote for a bathroom renovation." },
    { who: "ai",   text: "No problem. Are you in Sydney? I can pencil in Alex for a site visit this Thursday." },
    { who: "cust", text: "Thursday at 2pm works." },
    { who: "ai",   text: "Booked — you'll get a confirmation SMS in a second." },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 px-6 text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/12 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,255,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
            <Sparkles className="h-3 w-3" /> AI receptionist
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight leading-[1.05]">
            Every enquiry handled, even when your team is busy.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            AI answers, gathers details, books the appointment and hands the full context to your team.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-8">
          {/* Dominant motion — ai-employee.mp4 */}
          <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/40 shadow-[0_60px_140px_-40px_rgba(6,182,212,0.35)]">
            <div className="aspect-[16/10] relative">
              <video
                src={aiEmployeeVideo.url}
                autoPlay={!reduced}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Live call overlay */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-semibold backdrop-blur ring-1 ring-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                LIVE CALL · 00:42
              </div>

              {/* Waveform */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 rounded-2xl bg-black/50 p-3 backdrop-blur ring-1 ring-white/10">
                <V3IconTile tone="cyan" size={32}><Sparkles className="h-4 w-4" /></V3IconTile>
                <div className="flex-1 flex items-center gap-[3px] h-8">
                  {Array.from({ length: 44 }).map((_, i) => {
                    const h = 20 + Math.sin(i * 0.6) * 12 + (i % 5) * 4;
                    return <span key={i} className="w-[3px] rounded-full bg-cyan-300/70" style={{ height: `${Math.max(6, Math.min(28, h))}px` }} />;
                  })}
                </div>
                <div className="text-[10px] font-semibold text-white/70 tabular-nums">AI · speaking</div>
              </div>
            </div>
          </div>

          {/* Supporting UI: transcript + booking confirmation + handoff */}
          <div className="flex flex-col gap-4">
            {/* Transcript */}
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white/70">Transcript</span>
                  <span className="text-[12px] font-semibold">Emma Wilson · +61 400 812 559</span>
                </div>
                <span className="text-[10px] tabular-nums text-white/40">00:42</span>
              </div>
              <div className="mt-3 space-y-2">
                {transcript.map((t, i) => (
                  <div key={i} className={`flex gap-2 ${t.who === "ai" ? "" : "flex-row-reverse"}`}>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-bold ${t.who === "ai" ? "bg-cyan-500/20 text-cyan-200" : "bg-white/10 text-white/80"}`}>
                      {t.who === "ai" ? "AI" : "E"}
                    </span>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${t.who === "ai" ? "bg-white/[0.06] text-white/85" : "bg-blue-500/20 text-white ring-1 ring-blue-400/20"}`}>
                      {t.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking confirmation */}
            <div className="rounded-[22px] border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
              <div className="flex items-center gap-3">
                <V3IconTile tone="emerald" size={36}><CheckCircle2 className="h-4 w-4" /></V3IconTile>
                <div className="flex-1">
                  <div className="text-[12.5px] font-semibold">Booking confirmed · Thu 14 Nov, 2:00 PM</div>
                  <div className="text-[11px] text-white/60">Emma Wilson · assigned to Alex · SMS sent</div>
                </div>
              </div>
            </div>

            {/* Team handoff */}
            <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <V3Avatar name="Alex Ryan" tone="blue" size={30} />
                  <V3Avatar name="Priya Shah" tone="cyan" size={30} />
                </div>
                <div className="flex-1">
                  <div className="text-[12.5px] font-semibold">Handoff to Alex</div>
                  <div className="text-[11px] text-white/60">Full transcript + notes attached in CRM</div>
                </div>
                <ArrowRight className="h-4 w-4 text-white/40" />
              </div>
            </div>
          </div>
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

/* -------- 5. IndustriesV3 — 3 editorial solution stories ----------- */

function IndustriesV3() {
  const stories = [
    {
      tag: "Automotive & trades",
      image: industryTrades.url,
      accent: "from-blue-500 to-cyan-500",
      outcome: "First response in seconds · 40% more booked jobs",
      caps: [
        { icon: <PhoneMissed className="h-3.5 w-3.5" />, label: "Missed-call SMS reply" },
        { icon: <CalendarIcon className="h-3.5 w-3.5" />, label: "Job scheduling & routing" },
        { icon: <FileText className="h-3.5 w-3.5" />, label: "Quote follow-ups on autopilot" },
      ],
      overlay: (
        <div className="rounded-[14px] bg-white p-2.5 shadow-lg ring-1 ring-slate-200">
          <div className="flex items-center gap-2">
            <V3IconTile tone="red" size={24}><PhoneMissed className="h-3 w-3" /></V3IconTile>
            <div className="flex-1">
              <div className="text-[10.5px] font-semibold text-slate-900">Missed · booked in 3s</div>
              <div className="text-[9px] text-slate-500">Emma · site visit Thu 2pm</div>
            </div>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          </div>
        </div>
      ),
    },
    {
      tag: "Property & professional services",
      image: industryRealEstate.url,
      accent: "from-sky-500 to-blue-600",
      outcome: "Every enquiry captured · one client history",
      caps: [
        { icon: <Mail className="h-3.5 w-3.5" />,       label: "Enquiry capture from every channel" },
        { icon: <Users className="h-3.5 w-3.5" />,      label: "Pipeline nurture with reminders" },
        { icon: <MessageCircle className="h-3.5 w-3.5" />, label: "Unified client conversation history" },
      ],
      overlay: (
        <div className="rounded-[14px] bg-white p-2.5 shadow-lg ring-1 ring-slate-200">
          <div className="flex items-center gap-2">
            <V3Avatar name="Jordan Clarke" tone="sky" size={24} />
            <div className="flex-1">
              <div className="text-[10.5px] font-semibold text-slate-900">Jordan Clarke · Buyer</div>
              <div className="text-[9px] text-slate-500">Last touch · 08:42 AM</div>
            </div>
            <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700">Hot</span>
          </div>
        </div>
      ),
    },
    {
      tag: "Health, fitness & appointments",
      image: industryHealthcare.url,
      accent: "from-cyan-500 to-teal-500",
      outcome: "No-shows halved · rebookings up 32%",
      caps: [
        { icon: <CalendarIcon className="h-3.5 w-3.5" />, label: "Online bookings with confirmations" },
        { icon: <Bell className="h-3.5 w-3.5" />,         label: "Automated SMS reminders" },
        { icon: <RefreshCw className="h-3.5 w-3.5" />,    label: "One-tap rebooking flows" },
      ],
      overlay: (
        <div className="rounded-[14px] bg-white p-2.5 shadow-lg ring-1 ring-slate-200">
          <div className="flex items-center gap-2">
            <V3IconTile tone="cyan" size={24}><CalendarIcon className="h-3 w-3" /></V3IconTile>
            <div className="flex-1">
              <div className="text-[10.5px] font-semibold text-slate-900">3 rebookings · this week</div>
              <div className="text-[9px] text-slate-500">Auto from reminder</div>
            </div>
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700">+3</span>
          </div>
        </div>
      ),
    },
  ];

  const others = [
    "Real estate & mortgage", "Legal & accounting", "Beauty & wellness",
    "Restaurants & hospitality", "E-commerce & retail", "Events & rentals",
    "Automotive service", "Home services",
  ];

  return (
    <section className="bg-white py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">Solutions</span>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Built around three service business shapes.
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          {stories.map((s, i) => (
            <article
              key={s.tag}
              className={`group relative overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-200 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.18)] transition hover:shadow-[0_30px_80px_-30px_rgba(15,23,42,0.22)]`}
            >
              <div className={`grid gap-0 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                {/* Visual scene */}
                <div className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br ${s.accent}`}>
                  <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain opacity-30 mix-blend-luminosity" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[10.5px] font-bold uppercase tracking-widest text-slate-900 shadow ring-1 ring-white/50">
                      Featured
                    </div>
                    <div className="max-w-[260px]">{s.overlay}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h3 className="font-zapla text-[22px] md:text-[26px] font-semibold text-slate-950 leading-snug">{s.tag}</h3>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11.5px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {s.outcome}
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {s.caps.map((c) => (
                      <li key={c.label} className="flex items-center gap-2.5 text-[13.5px] text-slate-700">
                        <span className="grid h-6 w-6 place-items-center rounded-[8px] bg-slate-100 text-slate-700">{c.icon}</span>
                        {c.label}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-zapla-blue hover:text-blue-700">
                    Explore solution <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200 pt-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Also serving</span>
          {others.map((o) => (
            <span key={o} className="text-[13px] text-slate-600">{o}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- 6. ToolStackV3 — funnel dominant, premium composition ---- */

function ToolStackV3() {
  const wins = [
    { icon: <Users className="h-3.5 w-3.5" />,    label: "Unlimited users on day one" },
    { icon: <Zap className="h-3.5 w-3.5" />,      label: "One connected customer record" },
    { icon: <Sparkles className="h-3.5 w-3.5" />, label: "Automations across the journey" },
    { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "One flat platform fee" },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28 px-6">
      <div className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-gradient-to-br from-white to-slate-50 ring-1 ring-slate-200 shadow-[0_40px_100px_-40px_rgba(15,23,42,0.2)]" />
            <img
              src={funnelAsset.url}
              alt="16 disconnected apps funneling into one Zapla system"
              className="relative mx-auto w-full max-w-xl object-contain"
              loading="lazy"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg">
              16 → 1
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">Cost structure</span>
            <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
              One system without the per-seat tax.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
              Most teams pay by the seat, per app. Zapla replaces the stack with one operating system and unlimited users.
            </p>
            <ul className="mt-6 space-y-2.5">
              {wins.map((w) => (
                <li key={w.label} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-[13.5px] text-slate-800 ring-1 ring-slate-200 shadow-sm">
                  <V3IconTile tone="blue" size={28}>{w.icon}</V3IconTile>
                  {w.label}
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2.5 text-[12px] font-semibold text-slate-700 ring-1 ring-slate-200 shadow-sm">
              <span className="rounded-full bg-rose-100 px-2 py-0.5 text-rose-700">16 apps · per seat</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">1 system · flat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- 7. PricingPreviewV3 — unified premium composition ------- */

function PricingPreviewV3() {
  const included = [
    "Unlimited users",
    "CRM, pipelines & inbox",
    "Bookings, quotes & invoices",
    "Automations & reporting",
    "Reviews & reputation",
    "AI workflows & receptionist",
  ];
  return (
    <section className="bg-white py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 sm:p-12 text-white shadow-[0_60px_140px_-40px_rgba(15,23,42,0.5)]">
          <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[140px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-blue-500/12 blur-[120px]" />
          <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200 ring-1 ring-white/15">
                Pricing
              </span>
              <h2 className="mt-4 font-zapla text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05]">
                One flat platform fee.<br />Unlimited users.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70 max-w-md">
                No per-seat billing, no surprise upgrades. Add your whole team on day one.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/pricing-v2"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-950 hover:bg-slate-100 transition"
                >
                  See full pricing <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={BOOK_URL}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white ring-1 ring-white/15 hover:bg-white/15 transition"
                >
                  Book a Call
                </a>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-2">
              {included.map((it) => (
                <li key={it} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 text-[13.5px] text-white ring-1 ring-white/10 backdrop-blur">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-400 text-slate-950 text-[11px] font-bold">✓</span>
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

/* -------- 8. FaqV3 ------------------------------------------------ */

function FaqV3() {
  const faqs = [
    { q: "Is Zapla really priced without per-seat fees?", a: "Yes. One platform fee covers unlimited users. Add your entire team without worrying about tier upgrades." },
    { q: "How does the AI actually help my team?",         a: "AI answers calls, qualifies enquiries, sends follow-ups and books jobs. Your team steps in when a real conversation is needed." },
    { q: "Will Zapla replace all my current tools?",       a: "For most service businesses, yes. CRM, inbox, bookings, invoicing, reviews and automations sit in one system." },
    { q: "Can I bring my existing data across?",           a: "Contacts, pipelines and appointments can be imported. Popular tools connect directly for ongoing sync." },
    { q: "Can I cancel at any time?",                      a: "Yes. Zapla is month-to-month with no lock-in contracts." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-slate-50 py-20 sm:py-28 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zapla-blue">Answers</span>
          <h2 className="mt-3 font-zapla text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-slate-950 leading-[1.05]">
            Common questions.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-slate-200 border border-slate-200 bg-white rounded-[22px] shadow-sm">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="px-5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15.5px] font-semibold text-slate-950">{f.q}</span>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 text-slate-500 transition ${isOpen ? "rotate-45 border-zapla-blue text-zapla-blue" : ""}`}>+</span>
                </button>
                {isOpen && <p className="pb-6 pr-10 text-[14px] leading-relaxed text-slate-600">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------- 9. FinalCtaV3 ------------------------------------------ */

function FinalCtaV3() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 px-6 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,rgba(37,99,255,0.28),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
          Ready when you are
        </span>
        <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[56px] font-semibold tracking-tight leading-[1.02]">
          One system. Everything runs.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
          See Zapla with a guided walkthrough tailored to your business.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={BOOK_URL}
            className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-slate-950 hover:bg-slate-100 transition shadow-[0_20px_60px_-20px_rgba(255,255,255,0.4)]"
          >
            Book a Call
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-white">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

