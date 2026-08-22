import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeakageValue } from "../../components/concept/RevenueLeakageValue";

export const Route = createFileRoute("/concept/revenue-leakage-value")({
  head: () => ({
    meta: [
      { title: "Concept: The Value That Disappears | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated art-direction prototype: one enquiry's value rendered as typography, eroded piece by piece as each next step never happens.",
      },
      { name: "robots", content: "noindex" },
      {
        property: "og:title",
        content: "Concept: The Value That Disappears | Zapla Prototype",
      },
      {
        property: "og:description",
        content:
          "A large typographic amount is physically cut away as reply, booking, payment and return visit never arrive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptRevenueLeakageValue,
});

function ConceptRevenueLeakageValue() {
  return (
    <main className="bg-[#FBFCFE]">
      <RevenueLeakageValue />
    </main>
  );
}
