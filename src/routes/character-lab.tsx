import { createFileRoute } from "@tanstack/react-router";
import operatorImg from "@/assets/character-lab/operator.png";
import companionImg from "@/assets/character-lab/companion.png";
import doodleImg from "@/assets/character-lab/doodle.png";
import logoImg from "@/assets/character-lab/logo.png";

export const Route = createFileRoute("/character-lab")({
  head: () => ({
    meta: [
      { title: "Character Lab — Zapla" },
      { name: "description", content: "Four character directions for the Zapla homepage scroll story." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CharacterLab,
});

type Concept = {
  id: string;
  number: string;
  name: string;
  pitch: string;
  mechanic: string;
  why: string;
  image: string;
  bg: string;
};

const concepts: Concept[] = [
  {
    id: "operator",
    number: "01",
    name: "The Faceless Operator",
    pitch: "A universal figure. No face, no demographics. The operator running everything.",
    mechanic:
      "Figure stays centered as you scroll. Category cards (Bookings, Reviews, Invoicing, Conversations, Ads, Automations) orbit into place around them like their staff.",
    why: "Neutral, premium, ageless. Apple and Meta use this exact silhouette language for a reason: nobody feels excluded, everybody projects themselves into it.",
    image: operatorImg,
    bg: "bg-white",
  },
  {
    id: "companion",
    number: "02",
    name: "The Zapla Companion",
    pitch: "The AI itself as a small, friendly, non-human character.",
    mechanic:
      "Companion floats beside a phone or laptop. Cards slide out of it as if it is handing them to you. It is not you, it is with you.",
    why: "Universal because it is not human at all. Matches the 'one AI system runs your business' pitch. Intercom's Fin energy, with a real brand identity.",
    image: companionImg,
    bg: "bg-[#F5F7FB]",
  },
  {
    id: "doodle",
    number: "03",
    name: "The Everyperson Doodle",
    pitch: "One warm hand-drawn character. Deliberately ambiguous. Anyone can be them.",
    mechanic:
      "Doodle sits at their desk in the center. As you scroll, thought-bubble cards pop out showing what Zapla just handled: a booking confirmed, a review replied to, an invoice paid.",
    why: "Warmth is a moat. Zapla's audience is exhausted, not enterprise. Notion and Slack built billion-dollar brands on this exact illustration language.",
    image: doodleImg,
    bg: "bg-white",
  },
  {
    id: "logo",
    number: "04",
    name: "The Living Logo",
    pitch: "Your rounded-square logo, alive. Two dots for eyes. Pure geometric personality.",
    mechanic:
      "Logo sits center-frame. Cards fly toward it and it leans and tilts to catch each one. Final frame: it is smiling with all six categories docked around it.",
    why: "The character IS your brand mark. Every scroll frame doubles as logo recall. Ownable IP forever, works from favicon to billboard. Pixar Luxo-lamp move.",
    image: logoImg,
    bg: "bg-[#F5F7FB]",
  },
];

function CharacterLab() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="text-sm font-mono uppercase tracking-widest text-neutral-500">
          Character lab · pick one
        </p>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
          Four ways to give
          <br />
          Zapla a character.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-neutral-600 leading-relaxed">
          Each concept is a fundamentally different pitch, not a variation of one idea.
          Scroll through all four, then tell me which one to build into the homepage
          scroll story. Everything else stays untouched until you pick.
        </p>
      </section>

      {/* Concept sections */}
      {concepts.map((c, i) => (
        <section
          key={c.id}
          className={`${c.bg} border-t border-neutral-200/70`}
        >
          <div
            className={`mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:py-32 lg:min-h-[85vh] lg:flex-row lg:items-center lg:gap-20 ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 max-w-xl">
              <div className="text-sm font-mono text-neutral-400 tracking-widest">
                {c.number} / 04
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                {c.name}
              </h2>
              <p className="mt-6 text-xl text-neutral-700 leading-relaxed">
                {c.pitch}
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    Scroll mechanic
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{c.mechanic}</p>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    Why this works
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{c.why}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Closer */}
      <section className="border-t border-neutral-200/70 bg-neutral-950 text-white">
        <div className="mx-auto max-w-4xl px-6 py-24 md:py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Which one do I build?
          </h2>
          <p className="mt-6 text-lg text-neutral-400">
            Tell me the number (01, 02, 03, or 04) and I'll rebuild the homepage
            scroll story around that character. Everything else stays as-is until
            you decide.
          </p>
        </div>
      </section>
    </div>
  );
}
