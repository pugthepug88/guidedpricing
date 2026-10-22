import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import hubCss from '@/styles/comparison-hub.css?url';

const competitors = [
  { name: 'ActiveCampaign', slug: 'activecampaign', description: 'Compare CRM access, campaign tools and contact-based pricing.' },
  { name: 'Creatio', slug: 'creatio', description: 'Compare workflows, sales tools and subscription commitments.' },
  { name: 'GoHighLevel', slug: 'ghl', description: 'Compare business tools, setup and ongoing usage costs.' },
  { name: 'HubSpot', slug: 'hubspot', description: 'Compare sales seats, customer follow-up and marketing options.' },
  { name: 'Keap', slug: 'keap', description: 'Compare automation, included users and contact allowances.' },
  { name: 'monday CRM', slug: 'monday-crm', description: 'Compare seat bundles, automation actions and campaign options.' },
  { name: 'Pipedrive', slug: 'pipedrive', description: 'Compare sales pipelines, follow-up tools and team pricing.' },
  { name: 'Podium', slug: 'podium', description: 'Compare messaging, reviews and everyday customer tools.' },
  { name: 'Salesforce', slug: 'salesforce', description: 'Compare CRM tools, included capabilities and team subscriptions.' },
  { name: 'Thryv', slug: 'thryv', description: 'Compare customer follow-up with Signature’s website and marketing offer.' },
  { name: 'Zoho', slug: 'zoho', description: 'Compare CRM licences, connected tools and broader bundles.' },
] as const;

export const Route = createFileRoute('/comparison/')({
  head: () => ({
    meta: [
      { title: 'Compare Zapla | Pricing and Features' },
      { name: 'description', content: 'Compare Zapla with other CRM platforms. Explore subscriptions, included tools and setup before you choose.' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
    links: [{ rel: 'stylesheet', href: hubCss }],
  }),
  component: ComparisonHub,
});

function ComparisonHub() {
  return <main className="comparison-hub">
    <section className="ch-intro"><div className="ch-wrap">
      <p className="ch-eyebrow">Compare Zapla</p>
      <h1>How does Zapla<br /><span>compare?</span></h1>
      <p className="ch-intro-copy">Compare subscriptions, included tools and setup before you choose. Find the platform you’re considering below.</p>
    </div></section>
    <section className="ch-directory" aria-label="Choose a comparison"><div className="ch-wrap">
      <div className="ch-directory-heading"><h2>Find your comparison.</h2><p>{competitors.length} platforms. A clearer choice.</p></div>
      <nav className="ch-grid" aria-label="Zapla comparisons">
        {competitors.map(item => <a className="ch-card" key={item.slug} href={`/comparison/zapla-vs-${item.slug}`}>
          <div className={`ch-logo ch-logo--${item.slug}`}><img src={`/comparisons/${item.slug}.${item.slug === "creatio" ? "jpg" : item.slug === "thryv" ? "png" : item.slug === "monday-crm" ? "webp" : "svg"}`} alt={`${item.name} logo`} width="180" height="48" /></div>
          <h3>Zapla <span>vs</span> {item.name}</h3>
          <p>{item.description}</p>
          <span className="ch-card-link">View comparison <ArrowRight size={18} aria-hidden="true" /></span>
        </a>)}
      </nav>
    </div></section>
    <section className="ch-cta"><div className="ch-wrap ch-cta-layout"><div><p className="ch-eyebrow">Make the right choice for your team</p><h2>Let’s look at how<br />your business works.</h2><p>Bring your current tools and the follow-up you want to improve. We’ll discuss the fit, plan and launch before you decide.</p></div><a className="ch-button" href="/booking">Book a Call <ArrowRight size={18} aria-hidden="true" /></a></div></section>
  </main>;
}
