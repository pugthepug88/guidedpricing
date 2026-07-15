import { createFileRoute } from "@tanstack/react-router";
import char01 from "@/assets/char-01.png.asset.json";
import char02 from "@/assets/char-02.png.asset.json";
import char03 from "@/assets/char-03.png.asset.json";
import char04 from "@/assets/char-04.png.asset.json";
import char05 from "@/assets/char-05.png.asset.json";
import char06 from "@/assets/char-06.png.asset.json";
import char07 from "@/assets/char-07.png.asset.json";
import char08 from "@/assets/char-08.png.asset.json";
import char09 from "@/assets/char-09.png.asset.json";
import char10 from "@/assets/char-10.png.asset.json";

export const Route = createFileRoute("/character-lab")({
  component: CharacterLab,
  head: () => ({
    meta: [{ title: "Character Lab | Zapla" }],
  }),
});

const chars = [
  { n: "01", src: char01.url, note: "Goggles + headphones, utility jacket (monday-style base)" },
  { n: "02", src: char02.url, note: "Bob + aviators + blazer (editorial exec)" },
  { n: "03", src: char03.url, note: "Curly hair, beard, glasses, hoodie (approachable founder)" },
  { n: "04", src: char04.url, note: "Long hair, square glasses, tablet in hand (operator)" },
  { n: "05", src: char05.url, note: "Topknot, tinted goggles, tech jacket, arms crossed" },
  { n: "06", src: char06.url, note: "Braids + headphones + phone (modern user)" },
  { n: "07", src: char07.url, note: "Bald, goatee, earbuds, quilted vest (calm founder)" },
  { n: "08", src: char08.url, note: "Pixie, goggles on forehead, cargo jacket" },
  { n: "09", src: char09.url, note: "Wavy hair, round glasses, cardigan (thoughtful)" },
  { n: "10", src: char10.url, note: "Beret, sunglasses, trench coat (fashion editorial)" },
];

function CharacterLab() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="mx-auto max-w-6xl px-6 pt-16 pb-8">
        <p className="text-sm uppercase tracking-widest text-neutral-500">Character Lab</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          Ten line-art directions
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-600">
          Same drawing language as the monday.com reference: thin uniform black lines, no fill, no
          shading, adult proportions. Pick a number and I'll drop it into the homepage with the
          cards floating around, no container.
        </p>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {chars.map((c) => (
          <figure
            key={c.n}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
              <span className="font-mono text-xs text-neutral-500">{c.n}</span>
              <span className="text-xs text-neutral-500">line-art</span>
            </div>
            <div className="flex aspect-square items-center justify-center bg-neutral-50">
              <img
                src={c.src}
                alt={`Character ${c.n}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-contain"
              />
            </div>
            <figcaption className="px-4 py-4 text-sm text-neutral-600">{c.note}</figcaption>
          </figure>
        ))}
      </section>
    </main>
  );
}
