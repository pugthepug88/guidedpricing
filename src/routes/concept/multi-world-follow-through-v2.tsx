import { createFileRoute } from "@tanstack/react-router";
import { MultiWorldFollowThroughV2 } from "@/components/concept/MultiWorldFollowThroughV2";

const TITLE = "Multi-World Follow-Through V2 — Zapla concept";
const DESC =
  "Isolated concept iteration: four real service-business worlds build one thesis, then one customer thread survives into the Zapla record.";

export const Route = createFileRoute("/concept/multi-world-follow-through-v2")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MultiWorldFollowThroughV2,
});
