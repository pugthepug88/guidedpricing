import { createFileRoute } from "@tanstack/react-router";
import v1 from "@/assets/character-lab/v1-headphone-operator.png";
import v2 from "@/assets/character-lab/v2-space-operator.png";
import v3 from "@/assets/character-lab/v3-founder.png";
import v4 from "@/assets/character-lab/v4-icon-head.png";
import v5 from "@/assets/character-lab/v5-robot.png";
import v6 from "@/assets/character-lab/v6-tradie.png";
import v7 from "@/assets/character-lab/v7-barista.png";
import v8 from "@/assets/character-lab/v8-blob.png";
import v9 from "@/assets/character-lab/v9-agent.png";
import v10 from "@/assets/character-lab/v10-dj.png";

export const Route = createFileRoute("/character-lab")({
  head: () => ({
    meta: [
      { title: "Character Lab — Zapla" },
      { name: "description", content: "Ten character directions for the Zapla scroll story." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CharacterLab,
});

type Concept = {
  id: string;
  n: string;
  name: string;
  pitch: string;
  mechanic: string;
  why: string;
  image: string;
};

const CARDS = [
  { label: "Bookings", tone: "bg-blue-100 text-blue-700" },
  { label: "Reviews", tone: "bg-amber-100 text-amber-700" },
  { label: "Invoices", tone: "bg-emerald-100 text-emerald-700" },
  { label: "Conversations", tone: "bg-fuchsia-100 text-fuchsia-700" },
  { label: "Ads", tone: "bg-rose-100 text-rose-700" },
  { label: "Automations", tone: "bg-violet-100 text-violet-700" },
];

const concepts: Concept[] = [
  {
    id: "v1",
    n: "01",
    name: "The Headphone Operator",
    pitch: "A calm, focused operator wearing headphones. Anyone can be them.",
    mechanic: "Character stays center. As you scroll, six category cards orbit into place around them at fixed anchor positions, like their staff arriving to work.",
    why: "This is the direction you already liked. Universal, warm, real. Reads as 'I run everything from here.'",
    image: v1,
  },
  {
    id: "v2",
    n: "02",
    name: "The Zapla Astronaut",
    pitch: "The operator, but suited up. Ready to run the whole business alone.",
    mechanic: "Character floats center. Cards drift in like weightless satellites, snapping into a clean orbit as scroll completes.",
    why: "The suit signals capability. Playful without being childish. Same universal energy as monday's astronaut but on brand.",
    image: v2,
  },
  {
    id: "v3",
    n: "03",
    name: "The Founder",
    pitch: "A confident business owner in a blazer with a headset. She IS the operator.",
    mechanic: "Character grounded center. Cards fan out from behind her shoulders as scroll progresses, ending in a symmetrical halo.",
    why: "Talks directly to service-business owners who see themselves as CEOs. Aspirational, not cute.",
    image: v3,
  },
  {
    id: "v4",
    n: "04",
    name: "The Zapla Being",
    pitch: "The Zapla logo, evolved into a friendly hooded character. Your brand, alive.",
    mechanic: "Character waves. Cards fly toward it from off-screen and dock in an arc around its shoulders.",
    why: "Ownable IP forever. Character IS your logo. Works from favicon to billboard. Duolingo/Slack school.",
    image: v4,
  },
  {
    id: "v5",
    n: "05",
    name: "The Assistant Bot",
    pitch: "A friendly robot. The AI itself, not the user.",
    mechanic: "Bot stays center. Its glowing visor pulses as each card slides out from behind it, as if it just handled that task.",
    why: "Clearest 'AI runs your business' read. Not a human, so no demographic bias. Character = product.",
    image: v5,
  },
  {
    id: "v6",
    n: "06",
    name: "The Tradie",
    pitch: "Cap, headphones, work shirt. The exact person Zapla actually serves.",
    mechanic: "Character grins center. Cards pop in one at a time — a missed call handled, a review posted, an invoice paid — like wins landing.",
    why: "Instant recognition for your ICP: trades, home services, mobile businesses. Anti-enterprise. High trust.",
    image: v6,
  },
  {
    id: "v7",
    n: "07",
    name: "The Shop Owner",
    pitch: "Apron, headphones around the neck, real service-business energy.",
    mechanic: "Character centered behind a soft counter. Cards float up around them like receipts, reviews, and bookings coming in through the day.",
    why: "Reads as cafe, salon, studio, boutique. Every high-street owner sees themselves. Warm, not corporate.",
    image: v7,
  },
  {
    id: "v8",
    n: "08",
    name: "Zap, the Mascot",
    pitch: "A tiny blue mascot. Not human. Pure product personality.",
    mechanic: "Mascot bobs center. Cards emerge from behind it like it's summoning them, one per scroll beat.",
    why: "Non-human means universal. Merch-able, sticker-able, ownable. Highest brand-recall option here.",
    image: v8,
  },
  {
    id: "v9",
    n: "09",
    name: "The Agent",
    pitch: "Headset-and-suit. Real-estate, mortgage, sales-team energy.",
    mechanic: "Character stands on a small pedestal. Cards rise up around them like a heads-up display of every deal in flight.",
    why: "Direct fit for the deal-driven verticals in your industry list. Says 'professional' without saying 'enterprise'.",
    image: v9,
  },
  {
    id: "v10",
    n: "10",
    name: "The Zapla DJ",
    pitch: "Big headphones, cool, in the zone. Mixing every channel of the business.",
    mechanic: "Character centered, subtle head-nod loop. Cards drop in on beat as you scroll, like tracks queuing up.",
    why: "Metaphor writes itself: 'you mix, Zapla plays.' Distinct energy from every SaaS mascot on the market.",
    image: v10,
  },
];

function MiniCards() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {CARDS.map((c, i) => {
        const angle = (i / CARDS.length) * Math.PI * 2 - Math.PI / 2;
        const r = 44; // percent
        const left = 50 + Math.cos(angle) * r;
        const top = 50 + Math.sin(angle) * r * 0.85;
        return (
          <div
            key={c.label}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-[10px] font-medium shadow-sm ring-1 ring-black/5 ${c.tone}`}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {c.label}
          </div>
        );
      })}
    </div>
  );
}

function CharacterLab() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-32">
        <p className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          Character lab · v2 · ten variations
        </p>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
          Ten characters.
          <br />
          <span className="text-neutral-400">One will run the story.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-neutral-600 leading-relaxed">
          Each portrait shows the actual character. The floating pills preview how six category
          cards would orbit them as you scroll the homepage, telling the "one system,
          everything runs" story. Pick a number and I'll build the scroll section around it.
        </p>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {concepts.map((c) => (
            <article
              key={c.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition hover:border-neutral-300 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]"
            >
              {/* Portrait with orbiting cards */}
              <div className="relative aspect-square bg-gradient-to-b from-neutral-50 to-white">
                <MiniCards />
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="relative z-10 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              {/* Meta */}
              <div className="flex flex-1 flex-col gap-4 border-t border-neutral-200 p-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs tracking-widest text-neutral-400">
                    {c.n} / 10
                  </span>
                </div>
                <h2 className="text-xl font-semibold leading-tight tracking-tight">
                  {c.name}
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">{c.pitch}</p>
                <div className="mt-2 space-y-3 border-t border-neutral-100 pt-4">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Scroll mechanic
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{c.mechanic}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">
                      Why
                    </div>
                    <p className="text-sm text-neutral-700 leading-relaxed">{c.why}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closer */}
      <section className="border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Which one do I build?
          </h2>
          <p className="mt-6 text-lg text-neutral-400">
            Tell me the number (01 to 10) and I will rebuild the homepage scroll story
            around that character. Everything else stays as-is until you decide.
          </p>
        </div>
      </section>
    </div>
  );
}
