import { createFileRoute } from "@tanstack/react-router";
import { CinematicFollowThroughV5 } from "@/components/concept/CinematicFollowThroughV5";

const TITLE = "Cinematic Follow-Through V5 — Zapla concept";
const DESC = "Four service-business worlds expand into a nine-profession recognition collage, then converge into one connected Zapla customer record.";

export const Route = createFileRoute("/concept/cinematic-follow-through-v5")({
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
  component: CinematicFollowThroughV5,
});
