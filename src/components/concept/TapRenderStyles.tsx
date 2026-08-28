import { motion, useReducedMotion } from "motion/react";

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const INK = "#12141A";
const MUTED = "#6E6A64";
const FAINT = "#A29C93";
const HAIR = "rgba(18,20,26,0.10)";
const BG = "#F4F2EE";

const STYLES: { name: string; note: string; src: string }[] = [
  {
    name: "Watercolour and ink",
    note: "Hand painted with wet bleeds and paper grain. Warm, human, nothing like a diagram.",
    src: "/concept/tap-styles/watercolour.jpg",
  },
  {
    name: "Copperplate engraving",
    note: "Etched cross hatching on aged stock. Reads as evidence from an old manual.",
    src: "/concept/tap-styles/engraving.jpg",
  },
  {
    name: "Two colour risograph",
    note: "Charcoal and cyan layers with misregistration and halftone grain. Printed, not drawn.",
    src: "/concept/tap-styles/riso.jpg",
  },
  {
    name: "Matte clay render",
    note: "Soft 3D ceramic with studio shadow. Closest to a premium product visual.",
    src: "/concept/tap-styles/clay3d.jpg",
  },
  {
    name: "Cyanotype blueprint",
    note: "White technical linework on prussian blue. Systems language, engineered feel.",
    src: "/concept/tap-styles/blueprint.jpg",
  },
  {
    name: "Charcoal on toned paper",
    note: "Smudged graphite with visible hand. Quiet and a little melancholy.",
    src: "/concept/tap-styles/charcoal.jpg",
  },
  {
    name: "Mid century gouache",
    note: "Flat painted shapes and a bold colour block. Poster energy with painterly texture.",
    src: "/concept/tap-styles/gouache.jpg",
  },
  {
    name: "Impasto oil",
    note: "Thick knife strokes and real light. The most gallery-like option.",
    src: "/concept/tap-styles/oil.jpg",
  },
];

export function TapRenderStyles() {
  const reduced = !!useReducedMotion();

  return (
    <section className="border-t" style={{ borderColor: HAIR, background: BG, color: INK }}>
      <div className="mx-auto max-w-[1180px] px-5 pb-28 pt-24 sm:px-10 sm:pt-32">
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: MONO, color: MUTED }}>
          Tap rendering · 8 painting styles
        </div>
        <h2
          className="mt-6 max-w-[900px] text-[32px] leading-[1.05] tracking-[-0.045em] sm:text-[44px]"
          style={{ fontFamily: DISPLAY, fontWeight: 500 }}
        >
          Not linework at all.
          <span style={{ color: FAINT }}> Eight ways to actually paint the leak.</span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[16px] leading-[1.55]" style={{ color: MUTED }}>
          Same metaphor, different medium: watercolour, engraving, riso print, clay render, cyanotype,
          charcoal, gouache and oil. Each has texture and craft, so the section reads as art rather than
          an icon.
        </p>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {STYLES.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: reduced ? 0 : (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="m-0"
            >
              <div
                className="overflow-hidden rounded-[20px] border"
                style={{ borderColor: HAIR, background: "#FFFFFF" }}
              >
                <img
                  src={s.src}
                  alt={`${s.name} illustration of a dripping tap`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] tracking-[0.3em]" style={{ fontFamily: MONO, color: FAINT }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[19px] leading-[1.2] tracking-[-0.02em]"
                    style={{ fontFamily: DISPLAY, fontWeight: 500, color: INK }}
                  >
                    {s.name}
                  </h3>
                </div>
                <p className="mt-1.5 max-w-[440px] text-[14px] leading-[1.55]" style={{ color: MUTED }}>
                  {s.note}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
