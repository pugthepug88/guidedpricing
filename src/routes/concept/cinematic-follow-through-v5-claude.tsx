import { createFileRoute } from "@tanstack/react-router";
import { CinematicFollowThroughV5Claude } from "@/components/concept/CinematicFollowThroughV5Claude";
import { ZaplaHomepageContinuationV5Claude } from "@/components/concept/ZaplaHomepageContinuationV5Claude";

const TITLE = "Follow-Through V5 (Claude version) — Zapla concept";
const DESC =
  "An independent copy of the Follow-Through V5 homepage: four hero worlds, a recognition collage, the platform reveal, then the full follow-through story.";

function CinematicHomepageV5Claude() {
  return (
    <>
      <CinematicFollowThroughV5Claude variant="follow-through" />
      <ZaplaHomepageContinuationV5Claude />
    </>
  );
}

export const Route = createFileRoute("/concept/cinematic-follow-through-v5-claude")({
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
  component: CinematicHomepageV5Claude,
});
