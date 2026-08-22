import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeakageNegativeSpace } from "../../components/concept/RevenueLeakageNegativeSpace";

export const Route = createFileRoute("/concept/revenue-leakage-negative-space")({
  head: () => ({
    meta: [
      { title: "Concept: The Missing Pieces | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated art-direction prototype: giant outcome words become typographic architecture, then lose large segments as each next action never happens.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Concept: The Missing Pieces | Zapla Prototype" },
      {
        property: "og:description",
        content:
          "BOOKED, PAID and RETURNING are cut apart by negative space until the future is unreadable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptRevenueLeakageNegativeSpace,
});

function ConceptRevenueLeakageNegativeSpace() {
  return (
    <main className="bg-[#FBFCFE]">
      <RevenueLeakageNegativeSpace />
    </main>
  );
}
