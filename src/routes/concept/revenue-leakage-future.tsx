import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeakageFuture } from "../../components/concept/RevenueLeakageFuture";

export const Route = createFileRoute("/concept/revenue-leakage-future")({
  head: () => ({
    meta: [
      { title: "Concept: The Future That Never Loaded | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated art-direction prototype showing revenue leakage as product states that never got created around a live customer enquiry.",
      },
      { name: "robots", content: "noindex" },
      {
        property: "og:title",
        content: "Concept: The Future That Never Loaded | Zapla Prototype",
      },
      {
        property: "og:description",
        content:
          "One enquiry stays crisp while the booking, payment and review states that should have followed peel away.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptRevenueLeakageFuture,
});

function ConceptRevenueLeakageFuture() {
  return (
    <main className="bg-[#F7F9FC]">
      <RevenueLeakageFuture />
    </main>
  );
}
