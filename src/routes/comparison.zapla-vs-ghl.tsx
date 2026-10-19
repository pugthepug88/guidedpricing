import { GhlPricing } from '@/components/compare/simple/GhlPricing';
import ghlCss from '@/components/compare/simple/ghl.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { ghlComparison } from '@/components/compare/simple/ghl';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs GoHighLevel: Pricing, Features and Guided Launch | Zapla';
const description = 'Compare Zapla Follow-Through with GoHighLevel Starter. See native features, USD pricing, indicative AUD subscriptions and separate launch scope.';
export const Route = createFileRoute("/comparison/zapla-vs-ghl")({
// Draft remains noindex and outside the explicit sitemap whitelist; allow editor route discovery.
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "stylesheet", href: simpleCss },
      { rel: "stylesheet", href: ghlCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: GhlComparisonPage,
});
function GhlComparisonPage() { return <ComparisonPage data={ghlComparison} pricingContent={<GhlPricing />} />; }