import { createFileRoute } from "@tanstack/react-router";
import { CinematicFollowThroughV6 } from "@/components/concept/CinematicFollowThroughV6";
import { ZaplaHomepageContinuationV6 } from "@/components/concept/ZaplaHomepageContinuationV6";

const TITLE = "Cinematic Follow-Through V6 — Zapla concept";
const DESC = "The V5 opening and follow-through story, with a new connected customer journey section revealing how Zapla keeps the next step moving.";

function CinematicHomepageV6() {
  return (
    <>
      <CinematicFollowThroughV6 />
      <ZaplaHomepageContinuationV6 />
    </>
  );
}

export const Route = createFileRoute("/concept/cinematic-follow-through-v6")({
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
  component: CinematicHomepageV6,
});
