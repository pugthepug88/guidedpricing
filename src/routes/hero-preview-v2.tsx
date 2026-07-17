import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import type React from "react";
import { ConnectedSystemSectionV2 } from "@/components/ConnectedSystemSectionV2";
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

export const Route = createFileRoute("/hero-preview-v2")({
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
      <WorkflowStoriesV2 />
      <FocusedAIV2 />
      <IndustriesV2 />
      <ToolStackV2 />
      <ProofV2 />
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
  { key: "capture",     label: "Capture",     blurb: "Forms, chat, calls, ads — every enquiry lands in one place." },
  { key: "communicate", label: "Communicate", blurb: "SMS, email, DMs and calls in a unified inbox." },
  { key: "convert",     label: "Convert",     blurb: "CRM, pipelines, bookings, quotes and payments." },
  { key: "operate",     label: "Operate",     blurb: "Tasks, team routing, calendars and reporting." },
  { key: "retain",      label: "Retain",      blurb: "Reviews, reminders, rebooking and reputation." },
  { key: "grow",        label: "Grow",        blurb: "Reactivation, campaigns and upsell opportunities." },
] as const;

function LifecycleStripV2() {
  return (
    <section className="bg-white py-14 sm:py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[13px] sm:text-sm font-semibold uppercase tracking-[0.14em] text-zapla-muted">
          {LIFECYCLE_STAGES.map((s, i) => (
            <span key={s.key} className="inline-flex items-center gap-3">
              <span className="text-zapla-ink">{s.label}</span>
              {i < LIFECYCLE_STAGES.length - 1 && <span className="text-zapla-blue">→</span>}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-zapla-muted">
          One system carries the customer from first enquiry to repeat purchase.
        </p>
      </div>
    </section>
  );
}

/* -------- Outcomes ------------------------------------------------- */
function OutcomesV2() {
  const items = [
    {
      k: "01",
      title: "Respond before the competition",
      body: "Missed calls become SMS replies. New enquiries get a first response in seconds, not hours.",
    },
    {
      k: "02",
      title: "Keep every opportunity moving",
      body: "Quotes, bookings and follow-ups run on their own so nothing goes silent in a spreadsheet.",
    },
    {
      k: "03",
      title: "Turn completed work into cash and trust",
      body: "Invoices, payments and review requests fire the moment a job is done.",
    },
    {
      k: "04",
      title: "Create more value from customers you already have",
      body: "Win-back campaigns and reminders re-engage past customers without you lifting a finger.",
    },
  ];
  return (
    <section className="bg-neutral-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            Outcomes
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            What changes when nothing falls through.
          </h2>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
          {items.map((it) => (
            <article key={it.k} className="border-t border-neutral-300 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="text-[13px] font-bold tracking-[0.14em] text-zapla-blue">{it.k}</span>
                <h3 className="font-zapla text-[22px] sm:text-[26px] font-semibold text-neutral-900 leading-tight">
                  {it.title}
                </h3>
              </div>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-neutral-600">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Platform Lifecycle (6 tabs) ------------------------------ */
type LifecycleTab = {
  key: string;
  label: string;
  headline: string;
  body: string;
  capabilities: string[];
  Body: React.ComponentType;
};

const LIFECYCLE_TABS: LifecycleTab[] = [
  {
    key: "capture",
    label: "Capture",
    headline: "Every enquiry captured, from any channel.",
    body: "Forms, chat, calls and ad leads flow into one place with the source attached.",
    capabilities: ["Web forms & chat", "Missed-call capture", "Meta, Google & TikTok leads", "Attribution by source"],
    Body: CardPipeline,
  },
  {
    key: "communicate",
    label: "Communicate",
    headline: "One inbox for every channel.",
    body: "SMS, email, Instagram, Messenger and WhatsApp threaded against the contact.",
    capabilities: ["Unified inbox", "SMS & email templates", "Social DMs", "Team assignments"],
    Body: CardTagging,
  },
  {
    key: "convert",
    label: "Convert",
    headline: "Bookings, quotes and payments in one flow.",
    body: "Move opportunities through the pipeline without switching tools.",
    capabilities: ["Pipelines & stages", "Online bookings", "Quotes & invoices", "Stripe & Square payments"],
    Body: CardDashboard,
  },
  {
    key: "operate",
    label: "Operate",
    headline: "Run the work without the whiteboard.",
    body: "Tasks, routing, calendars and reporting stay in the same system as the customer.",
    capabilities: ["Team calendars", "Task routing", "Reporting", "Mobile app"],
    Body: CardCalendar,
  },
  {
    key: "retain",
    label: "Retain",
    headline: "Keep customers coming back.",
    body: "Automated reviews, reminders and rebooking build reputation and repeat revenue.",
    capabilities: ["Review requests", "Reminders", "Rebooking flows", "Reputation monitoring"],
    Body: CardAutomation,
  },
  {
    key: "grow",
    label: "Grow",
    headline: "Turn your database into a growth channel.",
    body: "Reactivate past customers and identify upsell opportunities from the same record.",
    capabilities: ["Win-back campaigns", "Segments & lists", "Broadcasts", "Upsell triggers"],
    Body: CardPerformance,
  },
];

function PlatformLifecycleV2() {
  const [active, setActive] = useState(0);
  const tab = LIFECYCLE_TABS[active];
  const Body = tab.Body;
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            The platform
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            One system for every stage of the customer lifecycle.
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
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
                  isActive
                    ? "bg-zapla-ink text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-10 md:p-8">
          <div className="flex flex-col justify-center px-2 md:px-4">
            <h3 className="font-zapla text-2xl sm:text-3xl md:text-[34px] font-semibold text-neutral-900 leading-tight">
              {tab.headline}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600 max-w-md">{tab.body}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {tab.capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2 text-[13px] text-neutral-700">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-zapla-blue text-white text-[9px]">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[420px] rounded-2xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)] ring-1 ring-neutral-200 overflow-hidden">
            <div key={tab.key} className="h-full w-full animate-fade-in">
              <Body />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Real Workflow Stories ------------------------------------ */
function WorkflowStoriesV2() {
  const stories = [
    {
      tag: "Never miss the phone",
      title: "Missed call → SMS reply → new lead created",
      steps: [
        { t: "12:04", label: "Missed call from +61 400 812 559" },
        { t: "12:04", label: "SMS auto-reply: “Sorry we missed you — how can we help?”" },
        { t: "12:06", label: "Reply received, contact created in CRM" },
      ],
    },
    {
      tag: "Quotes never go cold",
      title: "Quote sent → no response → auto follow-up → owner alerted",
      steps: [
        { t: "Day 0", label: "Quote $4,800 emailed to Jordan Clarke" },
        { t: "Day 3", label: "Automated nudge sent by SMS" },
        { t: "Day 5", label: "Reply received, owner notified in inbox" },
      ],
    },
    {
      tag: "Cash in, review out",
      title: "Job completed → invoice sent → payment confirmed → review requested",
      steps: [
        { t: "3:00 PM", label: "Job marked complete on mobile" },
        { t: "3:01 PM", label: "Invoice $1,250 sent via Stripe link" },
        { t: "3:12 PM", label: "Payment received, review request scheduled" },
      ],
    },
    {
      tag: "Bring them back",
      title: "Past customer inactive → win-back campaign → new booking",
      steps: [
        { t: "Day 0", label: "Segment flagged: no visit in 6 months" },
        { t: "Day 1", label: "Personalised SMS + email sent" },
        { t: "Day 4", label: "New booking created from reply" },
      ],
    },
  ];
  return (
    <section className="bg-neutral-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            In practice
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            The workflows that quietly run your business.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {stories.map((s) => (
            <article key={s.title} className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">{s.tag}</div>
              <h3 className="mt-2 font-zapla text-[20px] font-semibold text-neutral-900 leading-tight">
                {s.title}
              </h3>
              <ol className="mt-5 space-y-3">
                {s.steps.map((st, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-14 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{st.t}</span>
                    <span className="flex-1 text-[13px] text-neutral-700">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-zapla-blue align-middle" />
                      {st.label}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Focused AI --------------------------------------------- */
function FocusedAIV2() {
  const steps = ["Answer", "Qualify", "Follow up", "Book", "Route"];
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32 px-6">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-200">
            AI, focused
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight text-white leading-[1.05]">
            AI does the chasing. Your team handles the customer.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            One AI worker across your enquiries — answering calls, qualifying leads, sending follow-ups, booking jobs and routing the right person to the right customer.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 aspect-video">
            <video
              src={aiEmployeeVideo.url}
              autoPlay muted loop playsInline
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <div className="flex flex-wrap items-center gap-2">
                {steps.map((s, i) => (
                  <span key={s} className="inline-flex items-center gap-2 text-[12px] text-white/80">
                    <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/15">{s}</span>
                    {i < steps.length - 1 && <span className="text-cyan-300">→</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 content-start">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[16px] font-semibold text-white">AI Workflows</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                Trigger-based automations for follow-ups, sentiment checks and CRM updates.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-[16px] font-semibold text-white">AI Reputation Manager</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                Monitors reviews across channels and drafts replies that sound like you.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- Industries (6 groups) ---------------------------------- */
function IndustriesV2() {
  const groups = [
    { name: "Automotive & trades",       Icon: WrenchIcon,     image: industryTrades.url },
    { name: "Real estate & property",    Icon: HomeIcon,       image: industryRealEstate.url },
    { name: "Mortgage & professional",   Icon: LandmarkIcon,   image: industryMortgage.url },
    { name: "Allied health & clinics",   Icon: StethoscopeIcon,image: industryHealthcare.url },
    { name: "Fitness & appointments",    Icon: DumbbellIcon,   image: industryFitness.url },
    { name: "Other local services",      Icon: ScaleIcon,      image: industryLegal.url },
  ];
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            Industries
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            Built for the service businesses we actually serve.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <article key={g.name} className="group overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-neutral-200 transition hover:-translate-y-1 hover:shadow-md">
              <div className="relative h-40 overflow-hidden bg-gradient-to-b from-neutral-100 to-neutral-200">
                <img src={g.image} alt="" loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="flex items-center gap-3 p-5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-zapla-blue text-white">
                  <g.Icon className="h-4 w-4" />
                </span>
                <span className="text-[15px] font-semibold text-neutral-900">{g.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Tool Stack / Commercial difference --------------------- */
function ToolStackV2() {
  const before = [
    "Multiple subscriptions",
    "Per-user fees",
    "Fragmented customer history",
    "Manual handoffs between apps",
    "Separate support desks",
  ];
  const after = [
    "One operating system",
    "Unlimited users",
    "One connected customer record",
    "Automated workflows across the journey",
    "One place to manage the customer",
  ];
  return (
    <section className="bg-neutral-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            Commercial difference
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            One system without the per-seat tax.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">
            Most teams pay by the seat, per app. Zapla replaces the stack with one operating system and unlimited users.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-white p-7 ring-1 ring-neutral-200">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500">Disconnected setup</div>
            <h3 className="mt-2 font-zapla text-[22px] font-semibold text-neutral-900">Your current stack</h3>
            <ul className="mt-5 space-y-3">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[14px] text-neutral-700">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-neutral-200 text-neutral-500 text-[11px]">×</span>
                  {b}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl bg-zapla-ink p-7 text-white ring-1 ring-zapla-ink">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">With Zapla</div>
            <h3 className="mt-2 font-zapla text-[22px] font-semibold">One operating system</h3>
            <ul className="mt-5 space-y-3">
              {after.map((a) => (
                <li key={a} className="flex items-center gap-3 text-[14px] text-white/85">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-zapla-blue text-white text-[11px]">✓</span>
                  {a}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* -------- Proof (qualitative) ------------------------------------ */
function ProofV2() {
  const points = [
    { title: "Faster enquiry response", body: "Missed calls trigger SMS replies within seconds, so leads hear back before the competition." },
    { title: "More consistent quote follow-up", body: "Quotes stop going silent — automated nudges keep every opportunity moving." },
    { title: "Fewer missed bookings", body: "Automated reminders and rebooking reduce no-shows and gaps in the calendar." },
    { title: "Review requests, sent every time", body: "Completed jobs automatically trigger a review request while the experience is fresh." },
    { title: "Past customers re-engaged", body: "Win-back segments and personalised sends turn cold contacts back into revenue." },
  ];
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            What operators tell us
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[48px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            Operational outcomes we hear about most often.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <article key={p.title} className="rounded-2xl bg-neutral-50 ring-1 ring-neutral-200 p-6">
              <h3 className="font-zapla text-[18px] font-semibold text-neutral-900 leading-snug">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------- Pricing preview --------------------------------------- */
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
    <section className="bg-neutral-50 py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white ring-1 ring-neutral-200 shadow-sm p-8 sm:p-12 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div>
            <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
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
              See full pricing
              <span aria-hidden>→</span>
            </a>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {included.map((it) => (
              <li key={it} className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 text-[14px] text-neutral-800">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-zapla-blue text-white text-[11px]">✓</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------- FAQ --------------------------------------------------- */
function FaqV2() {
  const faqs = [
    { q: "Is Zapla really priced without per-seat fees?", a: "Yes — one platform fee covers unlimited users. Add your entire team without worrying about tier upgrades." },
    { q: "How does the AI actually help my team?", a: "AI answers calls, qualifies enquiries, sends follow-ups and books jobs. Your team steps in when a real conversation is needed." },
    { q: "Will Zapla replace all my current tools?", a: "For most service businesses, yes — CRM, inbox, bookings, invoicing, reviews and automations sit in one system." },
    { q: "Can I bring my existing data across?", a: "Contacts, pipelines and appointments can be imported. Popular tools connect directly for ongoing sync." },
    { q: "Can I cancel at any time?", a: "Yes. Zapla is month-to-month with no lock-in contracts." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-blue2">
            Questions
          </span>
          <h2 className="mt-5 font-zapla text-3xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-neutral-900 leading-[1.05]">
            Common questions.
          </h2>
        </div>
        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
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

/* -------- Final CTA -------------------------------------------- */
function FinalCtaV2() {
  return (
    <section className="bg-zapla-ink py-24 sm:py-32 px-6 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-zapla text-3xl sm:text-4xl md:text-[52px] font-semibold tracking-tight leading-[1.05]">
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
