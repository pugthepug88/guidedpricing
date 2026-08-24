import { createFileRoute } from "@tanstack/react-router";
import { MultiWorldFollowThroughV3 } from "@/components/concept/MultiWorldFollowThroughV3";

const TITLE = "Multi-World Follow-Through V3 — Zapla concept";
const DESC =
  "Isolated V3 concept: human service work stays dominant while one follow-through thread crosses industries and resolves into the Zapla customer record.";

export const Route = createFileRoute("/concept/multi-world-follow-through-v3")({
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
  component: MultiWorldFollowThroughV3,
});
