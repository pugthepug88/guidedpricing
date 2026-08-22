import { createFileRoute } from "@tanstack/react-router";
import { HumanWorkFollowThrough } from "../../components/concept/HumanWorkFollowThrough";

export const Route = createFileRoute("/concept/human-work-follow-through")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Inter+Tight:wght@400;500;600&display=swap",
      },
    ],
    meta: [
      { title: "Concept: Human Work, Follow-Through | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated art-direction prototype: real service professionals doing real work, with Zapla revealed as the follow-through system behind every next step.",
      },
      { name: "robots", content: "noindex" },
      {
        property: "og:title",
        content: "Concept: Human Work, Follow-Through | Zapla Prototype",
      },
      {
        property: "og:description",
        content:
          "A cinematic scroll sequence: one worker, then a world of service businesses, then one connected customer record.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptHumanWorkFollowThrough,
});

function ConceptHumanWorkFollowThrough() {
  return (
    <main className="bg-[#F7F8FC]">
      <HumanWorkFollowThrough />
    </main>
  );
}
