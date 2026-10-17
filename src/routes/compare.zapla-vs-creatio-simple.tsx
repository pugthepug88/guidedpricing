import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { creatioSimple } from '@/components/compare/simple/creatio';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Creatio: Pricing, Features and Customer Tools | Zapla';
const description = 'Compare Zapla Follow-Through with Creatio Growth + Sales for users, customer tools and Guided Launch. See included tools and Australian quote requirements.';
export const Route = createFileRoute("/compare/zapla-vs-creatio-simple")({
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
  component: ConciseCreatioPage,
});
function ConciseCreatioPage() { return <ComparisonPage data={creatioSimple}/>; }
