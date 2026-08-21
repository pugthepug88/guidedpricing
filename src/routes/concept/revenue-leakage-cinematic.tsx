import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeakageCinematic } from "../../components/concept/RevenueLeakageCinematic";

export const Route = createFileRoute("/concept/revenue-leakage-cinematic")({
  head: () => ({
    meta: [
      { title: "Concept: Cinematic Product World | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated art-direction prototype: one enquiry persists while the full-screen product future around it is quietly erased.",
      },
      { name: "robots", content: "noindex" },
      {
        property: "og:title",
        content: "Concept: Cinematic Product World | Zapla Prototype",
      },
      {
        property: "og:description",
        content:
          "Full-bleed Zapla product environments morph through an alternate future, then unload state by state.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptRevenueLeakageCinematic,
});

function ConceptRevenueLeakageCinematic() {
  return (
    <main className="bg-[#F7F9FC]">
      <RevenueLeakageCinematic />
    </main>
  );
}
