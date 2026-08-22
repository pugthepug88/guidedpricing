import { createFileRoute } from "@tanstack/react-router";
import { RevenueLeakageReceipt } from "../../components/concept/RevenueLeakageReceipt";

export const Route = createFileRoute("/concept/revenue-leakage-receipt")({
  head: () => ({
    meta: [
      { title: "Concept: The Future Receipt | Zapla Prototype" },
      {
        name: "description",
        content:
          "Isolated art-direction prototype: a continuous receipt feeds through the viewport, then keeps printing blank paper where the future should have been.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Concept: The Future Receipt | Zapla Prototype" },
      {
        property: "og:description",
        content:
          "The enquiry prints. Booking, payment, review and return visit never make it onto the paper.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConceptRevenueLeakageReceipt,
});

function ConceptRevenueLeakageReceipt() {
  return (
    <main className="bg-[#F4F6FA]">
      <RevenueLeakageReceipt />
    </main>
  );
}
