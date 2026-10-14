import { createFileRoute } from '@tanstack/react-router';
import { ComparisonPage } from '@/components/compare/simple/ComparisonPage';
import { pipedriveSimple } from '@/components/compare/simple/pipedrive';
import simpleCss from '@/components/compare/simple/simple.css?url';

const title = 'Zapla vs Pipedrive: Tools, Team Cost and Setup | Zapla';
const description = 'A concise comparison of Pipedrive and Zapla, including CRM, shared customer work, paid seats, unlimited users and required Guided Launch pricing.';
export const Route = createFileRoute('/compare/zapla-vs-pipedrive-simple')({
  staticData: { sitemap: false },
  head: () => ({
    meta: [{ title }, { name: 'description', content: description }, { name: 'robots', content: 'noindex, nofollow' }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }],
    links: [{ rel: 'stylesheet', href: simpleCss }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Outfit:wght@500;600&display=swap' }],
  }),
  component: ConcisePipedrivePage,
});
function ConcisePipedrivePage() { return <ComparisonPage data={pipedriveSimple}/>; }