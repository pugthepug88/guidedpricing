import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import hubCss from '@/styles/comparison-hub.css?url';

const competitors = ['ActiveCampaign', 'Creatio', 'GoHighLevel', 'HubSpot', 'Pipedrive', 'Zoho'] as const;

export const Route = createFileRoute('/comparison/')({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: 'Compare Zapla | Pricing and Features' },
      { name: 'description', content: 'Explore Zapla comparisons. Compare pricing, features and the tools your business needs.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [{ rel: 'stylesheet', href: hubCss }],
  }),
  component: ComparisonHub,
});

function ComparisonHub() {
  return (
    <main className="comparison-hub">
      <div className="ch-wrap">
        <header className="ch-heading">
          <p className="ch-eyebrow">Compare Zapla</p>
          <h1>See how Zapla compares.</h1>
          <p>Explore pricing, features and what’s included. Find the right fit for your business.</p>
        </header>
        <nav className="ch-list" aria-label="Zapla comparisons">
          {competitors.map((competitor) => (
            <a key={competitor} href={`/comparison/zapla-vs-${competitor === 'GoHighLevel' ? 'ghl' : competitor.toLowerCase()}`}>
              <span>Zapla <span className="ch-versus">vs</span> {competitor}</span>
              <ArrowUpRight aria-hidden="true" size={24} />
            </a>
          ))}
        </nav>
      </div>
    </main>
  );
}
