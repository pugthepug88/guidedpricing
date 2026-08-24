import { createFileRoute } from "@tanstack/react-router";
import { MultiWorldFollowThrough } from "../../components/concept/MultiWorldFollowThrough";

export const Route = createFileRoute("/concept/multi-world-follow-through")({
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap",
      },
    ],
    meta: [
      { title: "Concept: Multi-World Follow-Through | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated concept prototype: three service business worlds enter and recede on scroll, then converge into one Zapla customer record where the follow-through lives.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Concept: Multi-World Follow-Through" },
      {
        property: "og:description",
        content:
          "Workshops, brokers and agencies share one follow-through problem, and one system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptMultiWorld,
});

function ConceptMultiWorld() {
  return (
    <main className="bg-[#F5F6FA]">
      <MultiWorldFollowThrough />
    </main>
  );
}
