import { createFileRoute } from "@tanstack/react-router";
import p1 from "@/assets/character-lab/p1-editorial.png";
import p2 from "@/assets/character-lab/p2-executive.png";
import p3 from "@/assets/character-lab/p3-persona.png";
import p4 from "@/assets/character-lab/p4-faceless.png";
import p5 from "@/assets/character-lab/p5-editorial-photo.png";
import p6 from "@/assets/character-lab/p6-warm-editorial.png";

export const Route = createFileRoute("/character-lab-v3")({
  head: () => ({
    meta: [
      { title: "Character Lab v3 — Zapla" },
      { name: "description", content: "Six grown-up character options for the scroll section." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CharacterLabV3,
});

const CATS = [
  { label: "Bookings", value: "42 today", tone: "text-blue-700", dot: "bg-blue-500" },
  { label: "Reviews", value: "4.9 avg", tone: "text-amber-700", dot: "bg-amber-500" },
  { label: "Invoices", value: "$12,480", tone: "text-emerald-700", dot: "bg-emerald-500" },
  { label: "Conversations", value: "17 open", tone: "text-fuchsia-700", dot: "bg-fuchsia-500" },
  { label: "Ads", value: "3.2x ROAS", tone: "text-rose-700", dot: "bg-rose-500" },
  { label: "Automations", value: "24 live", tone: "text-violet-700", dot: "bg-violet-500" },
];

const options = [
  { n: "01", name: "The Editorial Operator", note: "Adult proportions, sleek dark technical jacket. Feels like a Linear or Framer hero render. Grown-up, calm, capable.", img: p1 },
  { n: "02", name: "The Executive", note: "Blazer, headphones, glasses. Reads as a founder who runs the whole show. Professional without being corporate.", img: p2 },
  { n: "03", name: "The Persona", note: "Photoreal 3D adult, Apple Vision Pro persona energy. Neutral gaze, premium finish. Most mature of the set.", img: p3 },
  { n: "04", name: "The Faceless Figure", note: "No facial features. Sculptural, brand-forward, universal. Cannot age or date. B&O product-render feel.", img: p4 },
  { n: "05", name: "The Editorial Portrait", note: "Cinematic photoreal, turtleneck, chin-up gaze. Chanel-campaign-meets-Apple. Highest register.", img: p5 },
  { n: "06", name: "The Warm Editorial", note: "Painterly clay render, warm palette. Grown-up but soft. Google Material meets Airbnb hero.", img: p6 },
];

function OrbitPreview({ img, name }: { img: string; name: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Orbit pills */}
      <div className="pointer-events-none absolute inset-0">
        {CATS.map((c, i) => {
          const angle = (i / CATS.length) * Math.PI * 2 - Math.PI / 2;
          const left = 50 + Math.cos(angle) * 40;
          const top = 50 + Math.sin(angle) * 42;
          return (
            <div
              key={c.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04]"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
              <span className="text-[10px] font-medium text-neutral-700">{c.label}</span>
              <span className={`text-[10px] font-semibold ${c.tone}`}>{c.value}</span>
            </div>
          );
        })}
      </div>
      {/* Character */}
      <img
        src={img}
        alt={name}
        loading="lazy"
        width={1024}
        height={1024}
        className="relative z-10 h-full w-full object-contain p-4"
      />
    </div>
  );
}

function CharacterLabV3() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-8 md:pt-32">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">Character lab · v3 · grown-up</p>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
          Same section.
          <br />
          <span className="text-neutral-400">Grown-up character.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-neutral-600 leading-relaxed">
          The layout and orbit animation stay exactly the same. Only the character changes.
          Every option here is adult, sophisticated, and premium. No big-head cartoons.
          Pick a number and I will drop that character into the homepage section.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {options.map((o) => (
            <article
              key={o.n}
              className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition hover:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.2)]"
            >
              <OrbitPreview img={o.img} name={o.name} />
              <div className="flex flex-col gap-3 p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs tracking-widest text-neutral-400">{o.n} / 06</span>
                </div>
                <h2 className="text-xl font-semibold tracking-tight">{o.name}</h2>
                <p className="text-sm text-neutral-600 leading-relaxed">{o.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">Pick a number.</h2>
          <p className="mt-6 text-lg text-neutral-400">01 to 06. Orbit animation stays the same. Only this character drops in.</p>
        </div>
      </section>
    </div>
  );
}
