import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import {
  Sparkles,
  Star,
  Megaphone,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import logoBlue from "@/assets/zapla-logo-blue.png.asset.json";
import logoOrange from "@/assets/zapla-logo-orange.png.asset.json";
import logoPurple from "@/assets/zapla-logo-purple.png.asset.json";
import logoPink from "@/assets/zapla-logo-pink.png.asset.json";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Zapla Products — Marketing, Reputation, Ads and PR" },
      {
        name: "description",
        content:
          "The four AI-powered products behind Zapla: Marketing, Reputation, Ads Service, and PR Service. More leads, more reviews, more results.",
      },
      { property: "og:title", content: "Zapla Products — AI Marketing, Reputation, Ads and PR" },
      {
        property: "og:description",
        content:
          "Attract, convert, and retain customers with four AI-powered products that work as one system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

const BOOK_URL = "https://zapla.io/booking";

type Product = {
  brand: string;
  line: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  logo: string;
  accent: string;
  accentSoft: string;
  href: string;
};

const PRODUCTS: Product[] = [
  {
    brand: "Zapla",
    line: "Marketing",
    desc: "Generate AI social content, email and SMS campaigns, and full automation that runs while you sleep.",
    Icon: Sparkles,
    logo: logoBlue.url,
    accent: "#2563ff",
    accentSoft: "#eaf0ff",
    href: "#marketing",
  },
  {
    brand: "Zapla",
    line: "Reputation",
    desc: "Earn 5-star reviews on autopilot and respond to every one of them with AI that sounds like you.",
    Icon: Star,
    logo: logoPurple.url,
    accent: "#7c3aed",
    accentSoft: "#f1ebff",
    href: "#reputation",
  },
  {
    brand: "Zapla+",
    line: "Ads Service",
    desc: "Psychographic targeting and proven ROAS campaigns that convert consistently, powered by AI.",
    Icon: Megaphone,
    logo: logoOrange.url,
    accent: "#f97316",
    accentSoft: "#fff1e6",
    href: "#ads",
  },
  {
    brand: "Zapla+",
    line: "PR Service",
    desc: "Media-ready stories that get noticed and grow your authority, guided by AI trend insights.",
    Icon: Newspaper,
    logo: logoPink.url,
    accent: "#ec4899",
    accentSoft: "#fdeaf4",
    href: "#pr",
  },
];

function ProductsPage() {
  return (
    <main className="min-h-screen bg-zapla-bg">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-14 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zapla-line bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-zapla-muted">
            <Sparkles className="h-3.5 w-3.5 text-zapla-blue" />
            AI Marketing Suite
          </span>
          <h1 className="mt-6 font-zapla text-4xl font-semibold leading-[1.05] tracking-tight text-zapla-ink sm:text-5xl md:text-6xl">
            More leads. More reviews.
            <br />
            More results.
            <span className="block text-zapla-blue">Multiplied by AI.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zapla-muted sm:text-lg">
            Four products, one system. The smarter way to attract, convert, and retain customers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-zapla-ink px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-zapla-blue"
            >
              Book a Call
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/hero-preview"
              className="inline-flex items-center gap-2 rounded-full border border-zapla-line bg-white px-6 py-3 text-sm font-semibold text-zapla-ink transition hover:border-zapla-blue hover:text-zapla-blue"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.line} product={p} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-zapla-line bg-white p-8 text-center shadow-sm sm:p-12">
          <h2 className="font-zapla text-2xl font-semibold text-zapla-ink sm:text-3xl">
            One system. Everything runs.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zapla-muted">
            Book a call and we will show you exactly how Zapla replaces the tangle of tools you use today.
          </p>
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-zapla-blue px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-zapla-blue2"
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const { Icon } = p;
  return (
    <article
      id={p.href.replace("#", "")}
      className="group relative overflow-hidden rounded-3xl border border-zapla-line bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition group-hover:opacity-70"
        style={{ background: p.accent }}
      />

      <div className="relative">
        <div className="flex items-center gap-4">
          <div
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-sm"
            style={{ background: p.accentSoft }}
          >
            <Icon className="h-7 w-7" style={{ color: p.accent }} />
          </div>
          <div className="min-w-0">
            <div className="font-zapla text-xl font-bold text-zapla-ink">{p.brand}</div>
            <div className="font-zapla text-lg font-medium text-zapla-ink/80">{p.line}</div>
          </div>
          <img
            src={p.logo}
            alt=""
            className="ml-auto h-10 w-10 shrink-0 rounded-xl object-contain"
            loading="lazy"
          />
        </div>

        <p className="mt-6 text-[15px] leading-relaxed text-zapla-muted">
          {p.desc}
        </p>

        <div className="mt-8 flex items-center justify-between">
          <a
            href={BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zapla-ink transition group-hover:gap-3"
            style={{ color: p.accent }}
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zapla-muted/70">
            Powered by AI
          </span>
        </div>
      </div>
    </article>
  );
}
