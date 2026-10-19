import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { activecampaignSimple } from '@/components/compare/simple/activecampaign';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs ActiveCampaign: Pricing and Customer Tools | Zapla';
const description = 'Compare Zapla and ActiveCampaign Plus with Pipelines: users, contacts, customer tools and AUD subscription prices and 12-month subscription totals.';
export const Route = createFileRoute("/comparison/zapla-vs-activecampaign")({
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
  component: ConciseActiveCampaignPage,
});
function ConciseActiveCampaignPage() { return <ComparisonPage data={activecampaignSimple}/>; }
