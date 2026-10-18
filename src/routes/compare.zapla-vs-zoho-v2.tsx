import { ZohoV2Pricing } from '@/components/compare/simple/ZohoV2Pricing';
import zohoV2Css from '@/components/compare/simple/zoho-v2.css?url';
import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { zohoV2 } from '@/components/compare/simple/zoho-v2';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Zoho: Pricing, Features and Team Access | Zapla';
const description = 'Compare Zapla and Zoho for team access, customer tools, Guided Launch and first-year costs in AUD. See plan inclusions and source-linked pricing.';
export const Route = createFileRoute("/compare/zapla-vs-zoho-v2")({
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
      { rel: "stylesheet", href: zohoV2Css },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: ZohoV2Page,
});
function ZohoV2Page() { return <ComparisonPage data={zohoV2} pricingContent={<ZohoV2Pricing data={zohoV2} />} />; }