import { PodiumPricing } from '@/components/compare/simple/PodiumPricing';
import podiumCss from '@/components/compare/simple/podium.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { podiumComparison } from '@/components/compare/simple/podium';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Podium: Pricing, Features and Guided Launch | Zapla';
const description = 'Compare Zapla Follow-Through with Podium Professional’s Australian package. See included features, subscription prices and separate setup costs.';
export const Route = createFileRoute("/comparison/zapla-vs-podium")({
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
      { rel: "stylesheet", href: podiumCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: PodiumComparisonPage,
});
function PodiumComparisonPage() { return <ComparisonPage data={podiumComparison} pricingContent={<PodiumPricing />} />; }