import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { pipedriveV2 } from '@/components/compare/simple/pipedrive-v2';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Pipedrive: V2 Draft | Zapla';
const description = 'Compare Zapla and Pipedrive for team access, customer tools, Guided Launch and first-year costs in AUD. See plan inclusions and source-linked pricing.';
export const Route = createFileRoute("/compare/zapla-vs-pipedrive-v2")({
  staticData: { sitemap: false },
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
  component: PipedriveV2Page,
});
function PipedriveV2Page() { return <ComparisonPage data={pipedriveV2}/>; }