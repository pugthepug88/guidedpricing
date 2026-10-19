import { KeapPricing } from '@/components/compare/simple/KeapPricing';
import keapCss from '@/components/compare/simple/keap.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { keapComparison } from '@/components/compare/simple/keap';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Keap: Pricing, Features and Team Access | Zapla';
const description = 'Compare Zapla Follow-Through with Keap’s full platform. See users, contacts, Australian messaging and subscription pricing, with setup separate.';
export const Route = createFileRoute("/comparison/zapla-vs-keap")({
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
      { rel: "stylesheet", href: keapCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: KeapComparisonPage,
});
function KeapComparisonPage() { return <ComparisonPage data={keapComparison} pricingContent={<KeapPricing />} />; }