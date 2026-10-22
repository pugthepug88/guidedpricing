import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { heroMarks } from '@/components/compare/heroMarks';
import { ArrowRight, ArrowDown, Pause, Play } from 'lucide-react';
import { comparisonLogos } from '@/components/compare/comparisonLogos';
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
  const [paused, setPaused] = useState(false);
  return <main className="comparison-hub">
    <section className="ch-intro ch-logo-hero">
      <div className="ch-wrap ch-vs-layout">
        <div className="ch-vs-copy"><p className="ch-eyebrow">Compare Zapla</p>
        <h1>See how Zapla<br />compares.</h1>
        <p className="ch-intro-copy">Compare features, subscription costs and what’s included. Choose a platform below to explore the differences.</p>
        <a className="ch-button ch-explore" href="#comparisons">Explore comparisons <ArrowDown size={18} aria-hidden="true" /></a>
        </div><div className="ch-silver-panel" data-paused={paused}>
          <img className="ch-zapla-mark" src={heroMarks.zapla} alt="Zapla" width="132" height="132" />
          <div className="ch-silver-vs" aria-hidden="true">VS</div>
          <div className="ch-marquees" aria-hidden="true">
            {[competitors.slice(0, 6), competitors.slice(6)].map((row, rowIndex) => <div className="ch-marquee" key={rowIndex}>
              <div className={`ch-track ch-track--${rowIndex}`}>
                {[0, 1].map(copy => <div className="ch-logo-run" key={copy}>
                  {row.map(item => <div className={`ch-mark-tile ch-mark-tile--${item.slug}`} key={item.slug}>
                    <img src={heroMarks[item.slug] || comparisonLogos[`${item.slug}${item.slug === 'activecampaign' ? '-mark' : item.slug === 'pipedrive' ? '-symbol' : ''}.${item.slug === 'creatio' ? 'jpg' : item.slug === 'thryv' ? 'png' : item.slug === 'monday-crm' ? 'webp' : 'svg'}`]} alt="" width="68" height="68" />
                  </div>)}
                </div>)}
              </div>
            </div>)}
          </div>
          <button className="ch-motion-toggle" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play logo animation' : 'Pause logo animation'} aria-pressed={paused}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
    <section id="comparisons" className="ch-directory" aria-label="Choose a comparison"><div className="ch-wrap">
      <div className="ch-directory-heading"><h2>Find your comparison.</h2></div>
      <nav className="ch-grid" aria-label="Zapla comparisons">
        {competitors.map(item => <a className="ch-card" key={item.slug} href={`/comparison/zapla-vs-${item.slug}`}>
          <div className={`ch-logo ch-logo--${item.slug}`}><img src={comparisonLogos[`${item.slug}${item.slug === "activecampaign" ? "-wordmark" : ""}.${item.slug === "creatio" ? "jpg" : item.slug === "thryv" ? "png" : item.slug === "monday-crm" ? "webp" : "svg"}`]} alt={`${item.name} logo`} width="180" height="48" /></div>
          <h3>Zapla <span>vs</span> {item.name}</h3>
          <p>{item.description}</p>
          <span className="ch-card-link">View comparison <ArrowRight size={18} aria-hidden="true" /></span>
        </a>)}
      </nav>
    </div></section>
    <section className="ch-cta"><div className="ch-wrap ch-cta-layout"><div><p className="ch-eyebrow">Make the right choice for your team</p><h2>Let’s look at how<br />your business works.</h2><p>Bring your current tools and the follow-up you want to improve. We’ll discuss the fit, plan and launch before you decide.</p></div><a className="ch-button" href="/booking">Book a Call <ArrowRight size={18} aria-hidden="true" /></a></div></section>
  </main>;
}
