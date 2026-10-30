import { createFileRoute } from "@tanstack/react-router";
import { QuoteFollowUpPageV2 } from "@/components/solutions/QuoteFollowUpPageV2";

export const Route = createFileRoute("/quote-follow-up-v2")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): { origin?: "message" } =>
    search.origin === "message" ? { origin: "message" } : {},
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
  component: QuoteFollowUpV2Route,
});

function QuoteFollowUpV2Route() {
  const { origin } = Route.useSearch();
  return <QuoteFollowUpPageV2 originMode={origin} />;
}
