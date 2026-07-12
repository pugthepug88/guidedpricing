import { createFileRoute } from "@tanstack/react-router";
import funnelImg from "@/assets/pillar-option-a-funnel.jpg";
import deskImg from "@/assets/pillar-option-b-desk.jpg";
import tabsImg from "@/assets/pillar-option-c-tabs.jpg";
import toolsImg from "@/assets/pillar-option-d-tools.jpg";

export const Route = createFileRoute("/pillar-ideas-v3")({
  head: () => ({
    meta: [{ title: "Pillar Ideas V3 — Rendered Graphics" }],
  }),
  component: PillarIdeasV3,
});

type Idea = {
  id: string;
  title: string;
  metaphor: string;
  desc: string;
  img: string;
};

const IDEAS: Idea[] = [
  {
    id: "A",
    title: "The Funnel (rendered)",
    metaphor: "16 apps pour in → one Zapla drops out",
    desc: "Photoreal 3D glass funnel. Real brand icons tumble in from the top and animate falling. A single glowing Zapla logo drops out the spout onto a soft light pool.",
    img: funnelImg,
  },
  {
    id: "B",
    title: "Chaos Desk → Clean Workspace",
    metaphor: "Cluttered desk (16 windows) → one Zapla monitor",
    desc: "Isometric marketing illustration. Left side is a real desk buried in browser windows, sticky notes, receipts and coffee cups. Right side is a single clean Zapla dashboard on a spotlit monitor. Animated wipe reveal on scroll.",
    img: deskImg,
  },
  {
    id: "C",
    title: "Cinematic Tab Collapse",
    metaphor: "16 browser tabs merge into one Zapla tab",
    desc: "Photoreal macOS browser mockup. 16 tabs with real favicons slide together with motion-blur trails into a single highlighted Zapla · All-in-one tab — single frame, no split screen.",
    img: tabsImg,
  },
  {
    id: "D",
    title: "Pegboard → One Tool",
    metaphor: "16 hand tools on a wall → one Zapla multi-tool",
    desc: "Apple product-shot photography. Left: cluttered workshop pegboard with 16 worn tools. Right: same wall, cleaned up, spotlit shelf holding a single blue Zapla-branded device. Warm-to-cool color transition.",
    img: toolsImg,
  },
];

function PillarIdeasV3() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Pillar section — rendered graphics
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Four real graphic directions
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Each option below uses a real rendered image (not CSS shapes) as the
            hero visual for the "one system replaces the stack" section. Pick
            one and I'll animate it into the pricing page with motion.
          </p>
        </div>

        <div className="space-y-16">
          {IDEAS.map((idea) => (
            <section
              key={idea.id}
              className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm md:p-10"
            >
              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-sm font-mono text-primary">
                  Option {idea.id}
                </span>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {idea.title}
                </h2>
              </div>
              <p className="mb-2 text-sm font-medium text-foreground/80">
                {idea.metaphor}
              </p>
              <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
                {idea.desc}
              </p>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
                <img
                  src={idea.img}
                  alt={idea.title}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
          Tell me which option (A, B, C, or D) to build into the pricing page.
          I'll add scroll-triggered motion — falling icons, wipe reveal, tab
          merge, or spotlight fade — appropriate to the direction you pick.
        </div>
      </div>
    </div>
  );
}
