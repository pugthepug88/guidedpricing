import { createFileRoute } from "@tanstack/react-router";
import { PipedriveComparison } from "@/components/compare/PipedriveComparison";
import comparisonCss from "@/components/compare/comparison.css?url";

const TITLE = "Zapla vs Pipedrive: Follow-up, Team Pricing & Setup | Zapla";
const DESCRIPTION = "Compare Pipedrive's sales CRM with Zapla's shared follow-through setup, including plan choices, team subscriptions, Guided Launch, usage and migration considerations.";
const URL = "https://guidedpricing.zapla.io/compare/zapla-vs-pipedrive/";

export const Route = createFileRoute("/compare/zapla-vs-pipedrive")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: comparisonCss },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap" },
      { rel: "canonical", href: URL },
    ],
  }),
  component: PipedriveComparison,
});