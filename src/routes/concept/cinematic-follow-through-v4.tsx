import { createFileRoute } from "@tanstack/react-router";
import { CinematicFollowThroughV4 } from "@/components/concept/CinematicFollowThroughV4";

const TITLE = "Cinematic Follow-Through V4 — Zapla concept";
const DESC = "One cinematic service-business film field, one persistent follow-through thread, then a direct handoff into the Zapla customer record.";

export const Route = createFileRoute("/concept/cinematic-follow-through-v4")({
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
  component: CinematicFollowThroughV4,
});
