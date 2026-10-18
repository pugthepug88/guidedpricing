import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { creatioV2 } from '@/components/compare/simple/creatio-v2';
import { CreatioV2Pricing } from '@/components/compare/simple/CreatioV2Pricing';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Creatio: AUD Pricing and Included Customer Tools | Zapla';
const description = 'Compare Zapla Follow-Through with Creatio Growth + Sales for users, customer tools and Guided Launch. See A$399/month team pricing and Creatio’s A$16,000 annual new-customer purchase minimum.';
export const Route = createFileRoute("/compare/zapla-vs-creatio-v2")({
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
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap",
      },
    ],
  }),
  component: CreatioV2Page,
});
function CreatioV2Page() { return <ComparisonPage data={creatioV2} pricingContent={<CreatioV2Pricing data={creatioV2} />} />; }
