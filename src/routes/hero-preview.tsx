import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import type React from "react";
import {
  siFacebook,
  siInstagram,
  siMailchimp,
  siPinterest,
  siShopify,
  siStripe,
  siTiktok,
  siWhatsapp,
  siYoutube,
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

export const Route = createFileRoute("/hero-preview")({
  head: () => ({
    meta: [
      { title: "Hero Preview — Zapla" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Preview of the new hero section with rotating feature cards." },
    ],
  }),
  component: HeroPreviewPage,
});

const BOOK_URL = "https://zapla.io/booking";

function HeroPreviewPage() {
  return (
    <main className="min-h-screen bg-zapla-bg">
      <Hero />
      <PlatformSlider />
      <AISection />
      <DifferenceHeading />
      <BlobSections />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  "Feel the Zapla difference" — big centered heading                 */
/* ------------------------------------------------------------------ */
function DifferenceHeading() {
  return (
    <section className="bg-white py-24 md:py-32 px-6">
      <h2 className="mx-auto max-w-6xl text-center font-zapla font-semibold tracking-tight text-neutral-900 text-3xl sm:text-4xl md:text-5xl leading-[1.1]">
        Feel the Zapla difference
      </h2>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Blob Sections — 4 alternating half-blob feature panels             */
/* ------------------------------------------------------------------ */
type Blob = {
  side: "left" | "right";
  gradient: string;
  highlightGradient: string;
  mainTitle: React.ReactNode;
  mainDesc: string;
  blobTitle: string;
  blobDesc: string;
  extras?: React.ReactNode;
};

const highlightTextStyle = (background: string): React.CSSProperties => ({
  background,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
});

const BLOBS: Blob[] = [
  {
    side: "left",
    gradient: "linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)",
    highlightGradient: "linear-gradient(135deg,#6d28d9 0%,#7c3aed 30%,#f59e0b 100%)",
    mainTitle: (
      <>
        YOUR STORY <span className="highlight">COMES FIRST</span>, ALWAYS.
      </>
    ),
    mainDesc:
      "The more deeply we understand your business, your market, and your challenges, the more precisely we can engineer results. It is not just attention to detail. It is an obsession with clarity. Because when your story leads, meaningful results follow.",
    blobTitle: "",
    blobDesc: "",
  },
  {
    side: "right",
    gradient: "linear-gradient(135deg,#ec4899 0%,#f97316 100%)",
    highlightGradient: "linear-gradient(135deg,#ec4899 0%,#f97316 100%)",
    mainTitle: (
      <>
        PRODUCTS TEAMS <span className="highlight">FALL IN LOVE</span> WITH.
      </>
    ),
    mainDesc:
      "Give your team tools that feel built just for them. Every click, every flow, every feature is designed to delight and drive results.",
    blobTitle: "",
    blobDesc: "",
  },
  {
    side: "left",
    gradient: "linear-gradient(135deg,#10b981 0%,#06b6d4 100%)",
    highlightGradient: "linear-gradient(135deg,#ef476f 0%,#00e5a3 100%)",
    mainTitle: (
      <>
        FEEL THE <span className="highlight">DIFFERENCE</span> FAST.
      </>
    ),
    mainDesc:
      "From the very first click, you will experience the clarity, confidence, and momentum that have been missing. This is not just another tool. This is something that finally works, for you.",
    blobTitle: "",
    blobDesc: "",
  },
  {
    side: "right",
    gradient: "linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%)",
    highlightGradient: "linear-gradient(to right,#60a5fa,#1e40af)",
    mainTitle: (
      <>
        THE COMPLETE <span className="highlight">INTEGRATION</span> STACK.
      </>
    ),
    mainDesc:
      "Full stack integration ensures you are not missing an opportunity or being held back by one platform. We have built seamless connections with all the tools you already use.",
    blobTitle: "PLUGS INTO EVERYTHING",
    blobDesc:
      "CRM, calendar, ads, reviews, payments, telephony, connected out of the box.",
    extras: <IntegrationLogos />,
  },
];

function BlobSections() {
  return (
    <section className="bg-[#f5f5f5]">
      {BLOBS.map((b, i) => (
        <BlobPanel key={i} blob={b} index={i} />
      ))}
    </section>
  );
}

function BlobPanel({ blob, index }: { blob: Blob; index: number }) {
  const isLeft = blob.side === "left";
  const hasBlobContent = blob.blobTitle.length > 0;
  const uid = `blob-hl-${index}`;
  return (
    <div className="relative min-h-[50vh] lg:min-h-[420px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center">
      {/* Blob shape */}
      <div
        aria-hidden
        className={[
          "absolute top-0 h-full w-[70%] z-0 hidden lg:block",
          isLeft ? "left-[-10%] rounded-r-[50%]" : "right-[-10%] rounded-l-[50%]",
        ].join(" ")}
        style={{ background: blob.gradient }}
      />
      {/* Mobile blob top band */}
      <div
        aria-hidden
        className="lg:hidden h-48 w-full rounded-b-[50%]"
        style={{ background: blob.gradient }}
      />

      {/* Blob-side content (colored side) — only on the blue blob */}
      {hasBlobContent && (
        <div
          className={[
            "relative z-10 px-8 py-10 text-white text-center flex flex-col items-center justify-center",
            isLeft ? "lg:order-1" : "lg:order-2",
          ].join(" ")}
        >
          <h3 className="text-2xl sm:text-3xl md:text-[34px] font-semibold uppercase leading-tight tracking-tight max-w-md">
            {blob.blobTitle}
          </h3>
          <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-white/90 max-w-sm">
            {blob.blobDesc}
          </p>
          {blob.extras}
          <a
            href={BOOK_URL}
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/25 hover:-translate-y-0.5"
          >
            Book a Call
            <span className="grid place-items-center w-8 h-8 rounded-full bg-white text-neutral-900">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      )}

      {/* Text-side glass card */}
      <div
        className={[
          uid,
          "relative z-10 m-5 lg:m-8 rounded-3xl bg-white/80 lg:bg-white/15 backdrop-blur-xl border border-white/40 shadow-xl p-7 md:p-9",
          isLeft ? "lg:order-2" : "lg:order-1",
          !hasBlobContent && isLeft ? "lg:col-start-2" : "",
        ].join(" ")}
      >
        <h2 className="text-[30px] sm:text-[38px] md:text-[46px] font-semibold uppercase leading-[0.95] tracking-tight text-neutral-900">
          {blob.mainTitle}
        </h2>
        <p className="mt-4 text-[15px] md:text-base leading-relaxed text-neutral-700 max-w-lg">
          {blob.mainDesc}
        </p>
        <style>{`
          .${uid} .highlight{
            background: ${blob.highlightGradient};
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }
        `}</style>
      </div>
    </div>
  );
}

function IntegrationLogos() {
  const logos = [
    {
      name: "Facebook",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.187.605 2.153 1.792 2.153 2.151 0 3.805-2.268 3.805-5.543 0-2.897-2.082-4.925-5.062-4.925-3.449 0-5.472 2.588-5.472 5.267 0 1.044.402 2.164.905 2.772.099.12.114.224.084.347l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.848c-.269 1.045-.994 2.352-1.478 3.15 1.112.345 2.284.533 3.495.533 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
        </svg>
      ),
    },
    {
      name: "Google Business",
      svg: (
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M16.48 8.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.777-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C22.747 1.44 20.133 0 16.48 0 9.867 0 4.307 5.387 4.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H16.48z" />
          <text x="16" y="25" textAnchor="middle" fontSize="5.5" fontWeight="600" fill="currentColor" fontFamily="sans-serif">BUSINESS</text>
        </svg>
      ),
    },
    {
      name: "Slack",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 01-2.523 2.521 2.527 2.527 0 01-2.52-2.521V2.522A2.527 2.527 0 0115.165 0a2.528 2.528 0 012.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 012.523 2.52A2.528 2.528 0 0115.165 24a2.527 2.527 0 01-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 01-2.52-2.523 2.526 2.526 0 012.52-2.52h6.313A2.527 2.527 0 0124 15.165a2.528 2.528 0 01-2.522 2.523h-6.313z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "Shopify",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M6 7h2a4 4 0 018 0h2l1.2 13.2a1 1 0 01-1 1.1H5.8a1 1 0 01-1-1.1L6 7zm3 0h6a3 3 0 00-6 0z" />
        </svg>
      ),
    },
    {
      name: "Stripe",
      svg: (
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
          <text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="700" fill="currentColor" fontFamily="sans-serif" letterSpacing="-0.5">stripe</text>
        </svg>
      ),
    },
    {
      name: "Sync",
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M20 12a8 8 0 01-14.5 4.7M4 12a8 8 0 0114.5-4.7" />
          <polyline points="20 4 20 8 16 8" />
          <polyline points="4 20 4 16 8 16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-4 gap-x-6 gap-y-5 max-w-[320px] mx-auto">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center justify-center text-white/90 hover:text-white transition hover:scale-110"
          title={logo.name}
        >
          {logo.svg}
        </div>
      ))}
    </div>
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
          <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] sm:gap-x-7 sm:gap-y-3 sm:text-[13.5px] text-zapla-muted">
            {["14 Day Free Trial", "No Credit Card Required", "Cancel Anytime"].map((t) => (
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
  { title: "Pipeline Management",              logo: logoGreen.url,  Body: CardPipeline },
  { title: "Control Dashboard",                logo: logoBlue.url,   Body: CardDashboard },
  { title: "Intelligent Automation Workflow",  logo: logoOrange.url, Body: CardAutomation },
  { title: "Performance Tracking & Analysis",  logo: logoPurple.url, Body: CardPerformance },
  { title: "Advanced Multi-Calendar Booking",  logo: logoYellow.url, Body: CardCalendar },
  { title: "Dynamic Smart Tagging",            logo: logoTeal.url,   Body: CardTagging },
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
      {HERO_CARDS.map(({ title, logo, Body }, i) => {
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
/*  Platform Slider — "One Powerful Platform"                          */
/* ------------------------------------------------------------------ */

type PlatformCard = {
  title: string;
  tagline: string;
  features: string[];
  gradient: string;
  logo: string;
  dark?: boolean;
};

const PLATFORM_CARDS: PlatformCard[] = [
  {
    title: "CRM & Sales",
    tagline: "Turn leads into loyal clients",
    features: [
      "Smart Pipelines & Contact tagging",
      "Auto lead assignment & nurturing",
      "AI follow-ups via SMS and Email",
      "Real-time opportunity tracking",
    ],
    gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    logo: logoGreen.url,
  },
  {
    title: "Bookings & Appointments",
    tagline: "Never miss a meeting again",
    features: [
      "Smart Calendar with buffer logic",
      "Multi-location & timezone support",
      "Lead source & campaign tagging",
      "Manage bookings & edits on the go",
    ],
    gradient: "linear-gradient(135deg,#11998e 0%,#38ef7d 100%)",
    logo: logoYellow.url,
  },
  {
    title: "Reviews & Reputation",
    tagline: "Turn clients into supporters",
    features: [
      "Auto-sends review invites post-sale",
      "AI-powered auto review response",
      "Bulk review request blast",
      "Embeddable review badges",
    ],
    gradient: "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
    logo: logoOrange.url,
  },
  {
    title: "Team Collaboration",
    tagline: "Keep everyone aligned",
    features: [
      "Assign tasks & leads across team",
      "Internal notes + @mentions",
      "Email + SMS history in one thread",
      "Mobile-friendly for those on the go",
    ],
    gradient: "linear-gradient(135deg,#fa709a 0%,#fee140 100%)",
    logo: logoTeal.url,
  },
  {
    title: "Payments & Invoicing",
    tagline: "Close deals, get paid faster",
    features: [
      "Send quotes & invoices in 1 click",
      "Accept Stripe, PayPal, direct debit",
      "Payment reminders on autopilot",
      "Track invoice status in your pipeline",
    ],
    gradient: "linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)",
    logo: logoBlue.url,
  },
  {
    title: "Automations",
    tagline: "Let boring stuff handle itself",
    features: [
      "IF/THEN logic for emails, tasks, messages",
      "Automate entire lead journeys",
      "Missed-call follow-ups to recover leads",
      "Automated DMs, campaigns & review requests",
    ],
    gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    logo: logoPurple.url,
  },
  {
    title: "Integrations",
    tagline: "Connects with your tools",
    features: [
      "1000+ integrations (Meta, Google, Zapier)",
      "Syncs with calendars, forms, and ads",
      "Webhook & API support",
      "Real-time data push & pull",
    ],
    gradient: "linear-gradient(135deg,#11998e 0%,#38ef7d 100%)",
    logo: logoPink.url,
  },
  {
    title: "Dashboards & Reporting",
    tagline: "Clarity kills chaos",
    features: [
      "Live campaign ROI tracker",
      "Pipeline health & conversion stats",
      "Export as PDF or share as live link",
      "AI detects what's underperforming",
    ],
    gradient: "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
    logo: logoRed.url,
  },
  {
    title: "Social Media & Content",
    tagline: "Schedule posts everywhere",
    features: [
      "Plan & schedule across all platforms",
      "Native AI content creation",
      "Approvals & team collaboration built in",
      "Post once, publish everywhere",
    ],
    gradient: "linear-gradient(135deg,#fa709a 0%,#fee140 100%)",
    logo: logoRainbow.url,
  },
  {
    title: "Marketing & Ads Creatives",
    tagline: "Ads that feel unfair",
    features: [
      "Psychographic buyer persona reports",
      "Psychographic targeting on every ad",
      "Hooks & creatives from $2B ROAS data",
      "Rigorous split testing & optimization",
    ],
    gradient: "linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)",
    logo: logoGreen.url,
  },
  {
    title: "Media & Press Engine",
    tagline: "From no name to known name",
    features: [
      "Real-time news trend detection",
      "AI press releases in your tone",
      "Ride the wave of what's hot",
      "Get published in 3000+ media outlets",
    ],
    gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    logo: logoBlue.url,
  },
];

const PLATFORM_STATS = [
  { n: "99.9%",  l: "Uptime Guarantee" },
  { n: "<2sec",  l: "Average Load Time" },
  { n: "1000+",  l: "Integrations Available" },
  { n: "24/7",   l: "Technical Support" },
  { n: "256-Bit", l: "SSL Encryption" },
  { n: "<1min",  l: "Live Technical Response" },
];

const PLATFORM_LOGOS = [
  "Zapier", "Stripe", "Mailchimp", "Calendly", "Slack", "Twilio",
  "Google Calendar", "Google Business", "PayPal", "Square",
  "Facebook", "Instagram", "Mailgun", "WordPress",
];

function PlatformSlider() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 340;
    el.scrollBy({ left: dir * step * 1.2, behavior: "smooth" });
  };

  // Auto-advance every 3.5s; pause on hover/touch. Loops back to the start when reaching the end.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      const card = el.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + 24 : 340;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative bg-white py-20 sm:py-28">
      {/* Header */}
      <div className="mx-auto max-w-[1200px] px-5 text-center sm:px-8">
        <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-zapla-ink">
          One Powerful Platform
        </h2>
        <p className="mx-auto mt-5 max-w-[700px] text-[clamp(15px,1.4vw,18px)] leading-[1.55] text-zapla-muted">
          Every tool your business needs — finally connected in one place, so nothing slips through the cracks.
        </p>
      </div>

      {/* Slider */}
      <div className="relative mt-14">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[80px] bg-gradient-to-r from-white via-white/80 to-transparent sm:w-[120px]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[80px] bg-gradient-to-l from-white via-white/80 to-transparent sm:w-[120px]" />

        {/* arrows */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCards(-1)}
          className="absolute left-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-zapla-ink/90 text-white shadow-lg backdrop-blur transition hover:scale-110 hover:bg-zapla-ink sm:h-12 sm:w-12"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCards(1)}
          className="absolute right-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-zapla-ink/90 text-white shadow-lg backdrop-blur transition hover:scale-110 hover:bg-zapla-ink sm:h-12 sm:w-12"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>

        {/* track */}
        <div
          ref={trackRef}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onTouchStart={() => { pausedRef.current = true; }}
          onTouchEnd={() => { pausedRef.current = false; }}
          className="platform-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc(50vw-160px)] pb-6 sm:px-[max(60px,calc(50vw-600px))]"
        >
          {PLATFORM_CARDS.map((c) => (
            <PlatformCardTile key={c.title} card={c} />
          ))}
        </div>
      </div>

      {/* Trust line + stats */}
      <div className="mx-auto mt-8 max-w-[1200px] px-5 text-center sm:px-8">
        <p className="text-[1.05rem] text-zapla-muted">
          Built for businesses ready to scale and succeed
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          {PLATFORM_STATS.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-zapla-line bg-zapla-faint px-4 py-6 text-center transition hover:-translate-y-1 hover:border-zapla-blue/40 hover:bg-white hover:shadow-zapla"
            >
              <div className="text-[clamp(1.5rem,2vw,2rem)] font-bold leading-none text-zapla-ink">{s.n}</div>
              <div className="mt-2 text-[13px] font-medium text-zapla-muted">{s.l}</div>
            </div>
          ))}
        </div>

        {/* logo strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
          {PLATFORM_LOGOS.map((l) => (
            <span key={l} className="text-[13px] font-bold uppercase tracking-[0.14em] text-zapla-muted2">
              {l}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .platform-track { scrollbar-width: none; }
        .platform-track::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function PlatformCardTile({ card }: { card: PlatformCard }) {
  return (
    <article
      data-card
      className="platform-card group relative flex h-[380px] w-[320px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[22px] p-8 text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-3 hover:shadow-[0_28px_60px_-20px_rgba(15,23,42,0.45)]"
      style={{ background: card.gradient }}
    >
      {/* soft light overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_0%_0%,rgba(255,255,255,0.28),transparent_55%)]" />

      <div className="relative flex-1">
        <h3 className="text-[1.65rem] font-semibold leading-[1.15] tracking-[-0.01em]">
          {card.title}
        </h3>
        <p className="mt-3 text-[0.98rem] leading-[1.5] opacity-95 transition group-hover:mb-1">
          {card.tagline} <span aria-hidden>✨</span>
        </p>

        <ul className="platform-features mt-3 space-y-1.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:opacity-100">
          {card.features.map((f) => (
            <li key={f} className="relative pl-5 text-[0.86rem] leading-[1.4] opacity-95 before:absolute before:left-0 before:top-[2px] before:text-[0.78rem] before:content-['✨']">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex items-center gap-2 text-[0.82rem] font-medium opacity-90">
        <img src={logoWhite.url} alt="Zapla" className="h-6 w-6 object-contain" />
        <span>Zapla</span>
      </div>

      <style>{`
        .platform-card .platform-features { max-height: 0; }
        .platform-card:hover .platform-features { max-height: 220px; }
      `}</style>
    </article>
  );
}


/* ------------------------------------------------------------------ */
/*  AI Section — 3 dark cards: Workflow / Employee / Reputation Mgr    */
/* ------------------------------------------------------------------ */

const REVIEW_CARDS = [
  {
    name: "Amy K.",
    initials: "AK",
    stars: 5,
    quote: "Exceeded expectations! Will definitely use again.",
    response: "Amy, we're so happy we exceeded your expectations! We can't wait to serve you again. Thank you for your trust in our service!",
    avatar: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  {
    name: "John D.",
    initials: "JD",
    stars: 2,
    quote: "Service was slower than expected. Waited 2 hours for response.",
    response: "Hi John, we sincerely apologise for the delay. We've improved our process to make sure this doesn't happen again. Please reach out so we can make it right.",
    avatar: "bg-gradient-to-br from-slate-400 to-slate-600",
  },
  {
    name: "Robert P.",
    initials: "RP",
    stars: 3,
    quote: "Good quality but pricing could be better. Staff was friendly though.",
    response: "Thanks for the feedback, Robert! We're glad you found our staff friendly. We'd love to discuss value options that might work better for you.",
    avatar: "bg-gradient-to-br from-indigo-400 to-blue-600",
  },
];

function AISection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <SparkleField />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="ai-badge relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur">
            <span className="ai-badge-glow absolute inset-0 -z-10 opacity-80" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4a85a]">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
              <path d="M4 17v2" />
              <path d="M5 18H3" />
            </svg>
            Powered by AI
          </div>
          <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            The power of AI built into<br className="hidden sm:block" /> every workflow
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-[1.55] text-white/60">
            From answering calls to sending review requests, AI runs the busywork so you can focus on the customer in front of you.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-fr gap-6 lg:grid-cols-3">
          <AICard
            title="AI-Powered Workflow"
            desc="Let AI run your follow-ups, sentiment checks, and CRM actions. Every step connected, every outcome automatic."
          >
            <video
              src={aiEmployeeVideo.url}
              autoPlay muted loop playsInline
              className="h-full w-full rounded-[18px] object-cover"
            />
          </AICard>

          <AICard
            title="AI Employee"
            desc="Your 24/7 AI receptionist. Answers calls, books appointments, and handles customer questions — even when you're off the clock."
          >
            <video
              src={aiWorkflowVideo.url}
              autoPlay muted loop playsInline
              className="h-full w-full rounded-[18px] object-cover"
            />
          </AICard>

          <AICard
            title="AI Reputation Manager"
            desc="Turn reviews into replies. AI monitors your reputation and responds with context that sounds like you."
            lightPanel
          >
            <ReviewCardStack />
          </AICard>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={BOOK_URL}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[0.95rem] font-semibold text-zapla-ink transition hover:bg-white/90"
          >
            Book a Call
            <span className="grid h-7 w-7 place-items-center rounded-full bg-zapla-ink text-white transition group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .ai-badge {
          box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px -8px rgba(99,102,241,0.35);
        }
        .ai-badge-glow {
          background: linear-gradient(90deg, rgba(139,92,246,0.25), rgba(6,182,212,0.25), rgba(59,130,246,0.25), rgba(139,92,246,0.25));
          background-size: 300% 100%;
          animation: aiBadgeShimmer 5s linear infinite;
        }
        @keyframes aiBadgeShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes zapla-twinkle {
          0%, 100% { opacity: 0.15; transform: rotate(0deg) scale(0.85); }
          50% { opacity: 1; transform: rotate(180deg) scale(1); filter: drop-shadow(0 0 6px rgba(212,168,90,0.55)); }
        }
      `}</style>
    </section>
  );
}

function SparkleField() {
  const sparkles = [
    { top: "12%", left: "8%", size: 22, delay: "0s", duration: "3.2s" },
    { top: "22%", right: "12%", size: 18, delay: "0.7s", duration: "2.8s" },
    { top: "45%", left: "5%", size: 14, delay: "1.4s", duration: "3.5s" },
    { top: "58%", right: "7%", size: 20, delay: "2.1s", duration: "3s" },
    { top: "78%", left: "15%", size: 16, delay: "0.9s", duration: "3.3s" },
    { top: "85%", right: "18%", size: 24, delay: "1.8s", duration: "2.6s" },
    { top: "33%", left: "22%", size: 12, delay: "2.6s", duration: "3.8s" },
    { top: "66%", right: "25%", size: 15, delay: "3.2s", duration: "3.1s" },
  ];
  return (
    <>
      {sparkles.map((s, i) => (
        <svg
          key={i}
          className="pointer-events-none absolute text-[#d4a85a]"
          style={{
            top: s.top,
            ...(s.left ? { left: s.left } : { right: s.right }),
            width: s.size,
            height: s.size,
            animation: `zapla-twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      ))}
    </>
  );
}

function AICard({
  title, desc, children, lightPanel = false,
}: {
  title: string; desc: string; children: React.ReactNode; lightPanel?: boolean;
}) {
  return (
    <article className="ai-card group relative flex h-[600px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:h-[640px]">
      <div className={`relative flex-[1.35] min-h-0 w-full overflow-hidden rounded-[18px] ${lightPanel ? "bg-gradient-to-br from-sky-50 via-sky-100 to-blue-100" : "bg-black/40"}`}>
        {children}
      </div>

      <div className="ai-card-text relative z-10 shrink-0 px-6 pb-7 pt-5">
        <h3 className="text-[1.55rem] font-bold leading-tight tracking-[-0.02em] text-white">
          {title}
        </h3>
        <p className="mt-2 text-[0.95rem] leading-[1.6] text-white/65">
          {desc}
        </p>
      </div>
    </article>
  );
}

function ReviewCardStack() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % REVIEW_CARDS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const positions = [
    { top: "10%", left: "6%", right: "34%", rotate: -2 },
    { top: "42%", left: "30%", right: "6%", rotate: 1.5 },
    { top: "66%", left: "8%", right: "36%", rotate: -1 },
  ];

  return (
    <div className="absolute inset-0">
      {REVIEW_CARDS.map((r, i) => {
        const isActive = i === active;
        const pos = positions[i];
        return (
          <div
            key={r.name}
            className="review-scatter-card absolute rounded-2xl bg-white p-2.5 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.25)] ring-1 ring-slate-900/5 transition-all duration-700 ease-out"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              transform: `rotate(${pos.rotate}deg) scale(${isActive ? 1 : 0.94})`,
              opacity: isActive ? 1 : 0.5,
              zIndex: isActive ? 10 : 3 - i,
            }}
          >
            <div className="flex items-center gap-2">
              <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${r.avatar} text-[0.65rem] font-semibold text-white`}>
                {r.initials}
              </div>
              <span className="text-[0.8rem] font-semibold text-slate-900">{r.name}</span>
              <div className="ml-auto flex gap-0.5 text-[0.7rem] text-amber-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className={s < r.stars ? "" : "text-slate-200"}>★</span>
                ))}
              </div>
            </div>

            <p className="mt-1.5 text-[0.72rem] leading-[1.4] text-slate-700">
              &ldquo;{r.quote}&rdquo;
            </p>

            <div className="mt-2 rounded-lg border-l-[3px] border-indigo-400 bg-gradient-to-r from-indigo-50/80 to-violet-50/60 p-1.5">
              <div className="flex items-center gap-1.5 text-[0.65rem] font-semibold">
                <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[0.5rem] text-white">
                  ✦
                </span>
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  AI Response
                </span>
              </div>
              <p className="mt-0.5 text-[0.65rem] leading-[1.45] text-slate-600">
                {r.response}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

