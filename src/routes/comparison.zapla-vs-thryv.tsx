import { ThryvPricing } from '@/components/compare/simple/ThryvPricing';
import thryvCss from '@/components/compare/simple/thryv.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { thryvComparison } from '@/components/compare/simple/thryv';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Thryv: Pricing, Features and Guided Launch | Zapla';
const description = 'Compare Zapla Follow-Through with Thryv Signature’s Australian package. See included features, subscription prices and separate setup costs.';
export const Route = createFileRoute("/comparison/zapla-vs-thryv")({
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
      { rel: "stylesheet", href: thryvCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: ThryvComparisonPage,
});
function ThryvComparisonPage() { return <ComparisonPage data={thryvComparison} pricingContent={<ThryvPricing />} />; }
