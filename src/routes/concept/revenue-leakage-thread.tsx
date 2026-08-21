import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeakageThread } from "../../components/concept/RevenueLeakageThread";

export const Route = createFileRoute("/concept/revenue-leakage-thread")({
  head: () => ({
    meta: [
      { title: "Concept: Revenue Leakage Thread | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated motion prototype exploring revenue leakage as a broken continuity thread across a light editorial canvas.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Concept: Revenue Leakage Thread | Zapla Prototype" },
      {
        property: "og:description",
        content:
          "Scroll-scrubbed art-direction prototype: a customer's intent as one continuous thread, and what happens when it breaks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptRevenueLeakageThread,
});

function ConceptRevenueLeakageThread() {
  return (
    <main className="bg-[#FBFCFE]">
      <RevenueLeakageThread />
    </main>
  );
}
