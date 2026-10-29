import { createFileRoute } from "@tanstack/react-router";
import { QuoteFollowUpPageV2 } from "@/components/solutions/QuoteFollowUpPageV2";

export const Route = createFileRoute("/quote-follow-up-v2")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Quote Follow-Up — V2 Review | Zapla" },
      {
        name: "description",
        content:
          "A focused look at quote follow-up within Zapla's connected follow-through system.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: QuoteFollowUpPageV2,
});
