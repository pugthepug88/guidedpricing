import { createFileRoute } from "@tanstack/react-router";
import { CinematicFollowThroughV5 } from "@/components/concept/CinematicFollowThroughV5";

const TITLE = "Zapla — Different work. Same follow-through.";
const DESC =
  "Zapla is the AI operating system for growing businesses. Every enquiry, booking, and review followed through, all in one place.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CinematicFollowThroughV5,
});
