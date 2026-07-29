import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import maskFloating from "@/assets/mask-connected-blue-b.png";
import maskWorn from "@/assets/mask-portrait-worn.jpg";

export const Route = createFileRoute("/mask-lab")({
  head: () => ({
    meta: [
      { title: "The Connected Mask | Zapla brand concept" },
      {
        name: "description",
        content:
          "A brand concept for Zapla: a blue chain-link mask worn by the operator, showing every part of the business connected into one system.",
      },
      { property: "og:title", content: "The Connected Mask" },
      {
        property: "og:description",
        content:
          "A blue chain-link mask concept for Zapla, worn by the operator, where every part of the business connects into one system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaskLabPage,
});

/* Scroll progress for one element, 0 -> 1 as it crosses the viewport */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const total = r.height + vh;
        const seen = vh - r.top;
        setP(Math.min(1, Math.max(0, seen / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, p };
}

const CALLOUTS = [
  { label: "Never misses a call", side: "left" as const, top: "22%" },
  { label: "Replies in seconds", side: "right" as const, top: "34%" },
  { label: "Books the job", side: "left" as const, top: "58%" },
  { label: "Chases the review", side: "right" as const, top: "70%" },
];

function MaskLabPage() {
  const { ref: stageRef, p } = useScrollProgress<HTMLDivElement>();

  // 0.10 -> 0.55 : portrait rises and sharpens
  const reveal = Math.min(1, Math.max(0, (p - 0.1) / 0.45));
  // callouts arrive after the face lands
  const notes = Math.min(1, Math.max(0, (p - 0.42) / 0.3));

  return (
    <main className="bg-background">
      {/* ---------------- Intro ---------------- */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-10 text-center sm:pt-32">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          Brand concept
        </p>
        <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-6xl">
          A new kind of operator,
          <br />
          <span className="text-primary">wearing one connected system</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Two links of a chain, fused into a single mask. Put it on and every
          part of the business, calls, bookings, reviews and follow ups, moves
          as one.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://zapla.io/booking"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Book a Call
          </a>
          <a
            href="#concept"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            See the concept
          </a>
        </div>

        {/* floating mask object */}
        <div className="relative mx-auto mt-14 w-full max-w-md">
          <div
            className="absolute inset-x-8 bottom-2 h-8 rounded-[50%] blur-2xl"
            style={{ background: "color-mix(in oklab, var(--primary) 45%, transparent)" }}
            aria-hidden
          />
          <img
            src={maskFloating}
            alt="Blue chain-link eye mask, the Zapla connected mask"
            width={1280}
            height={720}
            className="relative w-full animate-[maskfloat_6s_ease-in-out_infinite] drop-shadow-[0_30px_50px_rgba(37,99,255,0.28)]"
          />
        </div>
      </section>

      {/* ---------------- Scroll stage ---------------- */}
      <section id="concept" className="px-4 pb-24 sm:px-6">
        <div
          ref={stageRef}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 100%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, color-mix(in oklab, var(--primary) 8%, transparent) 45%, transparent 78%)",
          }}
        >
          <div className="relative flex min-h-[78vh] items-end justify-center px-4 pt-16 sm:min-h-[86vh]">
            {/* portrait */}
            <div
              className="relative w-full max-w-[520px]"
              style={{
                transform: `translateY(${(1 - reveal) * 60}px) scale(${0.94 + reveal * 0.06})`,
                opacity: 0.15 + reveal * 0.85,
                filter: `saturate(${0.25 + reveal * 0.75}) blur(${(1 - reveal) * 6}px)`,
                transition: "transform 120ms linear",
              }}
            >
              <img
                src={maskWorn}
                alt="Person wearing the blue chain-link Zapla mask"
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full rounded-t-[1.5rem] object-cover"
              />
              {/* blend the portrait base into the stage */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* callouts */}
            {CALLOUTS.map((c, i) => {
              const t = Math.min(1, Math.max(0, notes * CALLOUTS.length - i));
              return (
                <div
                  key={c.label}
                  className={`pointer-events-none absolute hidden items-center gap-3 md:flex ${
                    c.side === "left" ? "left-6 flex-row lg:left-12" : "right-6 flex-row-reverse lg:right-12"
                  }`}
                  style={{
                    top: c.top,
                    opacity: t,
                    transform: `translateX(${(c.side === "left" ? -1 : 1) * (1 - t) * 24}px)`,
                  }}
                >
                  <span className="text-xs font-semibold tracking-[0.16em] whitespace-nowrap text-foreground/70 uppercase">
                    {c.label}
                  </span>
                  <span className="h-px w-16 bg-foreground/25 lg:w-24" />
                </div>
              );
            })}

            {/* bottom CTA sitting on the image, ClickUp style */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              style={{ opacity: notes }}
            >
              <a
                href="https://zapla.io/booking"
                className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>

        {/* mobile callout list */}
        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 md:hidden">
          {CALLOUTS.map((c) => (
            <li
              key={c.label}
              className="rounded-xl border border-border px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              {c.label}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Concept notes ---------------- */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "The shape",
              d: "Two interlocking chain links form the eye openings and fuse at the bridge. One object, two halves, no seam.",
            },
            {
              t: "The colour",
              d: "The same blue as the Zapla mark, run as a gradient from deep royal to bright azure across the face.",
            },
            {
              t: "The meaning",
              d: "Worn by the business owner, not by a robot. The person still leads, the system keeps everything linked.",
            },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground">{b.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes maskfloat {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[maskfloat_6s_ease-in-out_infinite\\] { animation: none; }
        }
      `}</style>
    </main>
  );
}
