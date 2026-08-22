import { createFileRoute } from "@tanstack/react-router";
import { OperatorAwayFollowThrough } from "../../components/concept/OperatorAwayFollowThrough";

export const Route = createFileRoute("/concept/operator-away-follow-through")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap",
      },
    ],
    meta: [
      { title: "Concept: Operator Away, Zapla Follows Through | Prototype" },
      {
        name: "description",
        content:
          "Isolated concept prototype: service professionals step away from admin while one Zapla follow-through thread keeps advancing and becomes the customer record.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Concept: Operator Away, Zapla Follows Through" },
      {
        property: "og:description",
        content:
          "Three human scenes, one repeated gesture of disengagement, one persistent Zapla thread that keeps moving.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptOperatorAway,
});

function ConceptOperatorAway() {
  return (
    <main className="bg-[#F5F6FA]">
      <OperatorAwayFollowThrough />
    </main>
  );
}
