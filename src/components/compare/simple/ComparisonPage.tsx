import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ZaplaPetal } from '@/components/ZaplaPetal';
import type { ComparisonCell, ComparisonDefinition } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;
function CallButton() { return <Button asChild className="cc-button"><a href="https://zapla.io/booking">Book a Call <ArrowRight size={17}/></a></Button>; }
function Cell({ value, vendor }: { value: ComparisonCell; vendor: string }) {
  return <td role="cell" data-status={value.status}><span className="cc-mobile-vendor" aria-hidden="true">{vendor}</span><strong>{value.text}</strong>{value.detail && <span className="cc-cell-detail">{value.detail}</span>}</td>;
}
export function ComparisonPage({ data }: { data: ComparisonDefinition }) {
  return <main className="concise-comparison" data-page="concise-comparison">
    <section className="cc-hero"><div className="cc-inner">
      <p className="cc-comparison-name">Zapla vs {data.competitor}</p>
      <div className="cc-hero-grid">
        <div className="cc-hero-message"><h1>{data.headline}<span>{data.headlineAccent}</span></h1>
          <p className="cc-hero-copy">{data.introduction}</p>
          <div className="cc-actions"><CallButton/><a className="cc-text-link" href="#comparison">See the comparison <ArrowRight size={17}/></a></div>
        </div>
        <aside className="cc-team-offer" aria-label="Zapla Follow-Through team pricing">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={109} height={32}/>
          <p className="cc-offer-name">Follow-Through</p>
          <p className="cc-unlimited">Unlimited<br/>users.</p>
          <div className="cc-hero-price"><strong>{money(data.offer.monthly)}</strong><span>/month + GST</span></div>
          <p className="cc-hero-launch">Required Guided Launch<br/><strong>from {money(data.offer.launch)} + GST</strong></p>
        </aside>
      </div>
      <div className="cc-highlights">{data.highlights.map(item => <div key={item.title}><h2>{item.title}</h2><p>{item.description}</p></div>)}</div>
    </div></section>
    <section id="comparison" className="cc-table-band"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">The comparison</p><h2>What’s included?</h2><p>{data.tableIntroduction}</p></div>
      <table className="cc-table" role="table"><caption>{data.tableCaption}</caption>
        <thead><tr role="row"><th scope="col" role="columnheader">For your team</th><th scope="col" role="columnheader">{data.competitor}</th><th scope="col" role="columnheader"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={99} height={29}/></th></tr></thead>
        <tbody role="rowgroup">{data.rows.map(row => <tr key={row.id} role="row"><th scope="row" role="rowheader">{row.label}</th><Cell value={row.competitor} vendor={data.competitor}/><Cell value={row.zapla} vendor="Zapla"/></tr>)}</tbody>
      </table>
    </div></section>
    <section className="cc-commercial" aria-labelledby="price-heading"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">Subscription pricing</p><h2 id="price-heading">{data.pricingHeadline}</h2></div>
      <div className="cc-price-grid">
        <article><h3>{data.competitor} {data.vendorPlan}</h3><p className="cc-price">{money(data.vendorPrice)}<span>{data.vendorPriceUnit}</span></p><p className="cc-billing">{data.vendorBilling}</p><p className="cc-plan-reason">{data.vendorPlanReason}</p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check {data.competitor} pricing ↗</a></article>
        <article className="cc-zapla-price"><h3>Zapla Follow-Through</h3><p className="cc-price" data-testid="zapla-monthly">{money(data.offer.monthly)}<span>/month + GST · unlimited users</span></p><p className="cc-billing">Billed monthly.</p><p className="cc-launch" data-testid="required-launch">Required Guided Launch<br/><strong>from {money(data.offer.launch)} + GST</strong></p></article>
      </div>
      <p className="cc-price-context">{data.vendorLowerPlans} {data.costCaution}</p>
      <p className="cc-growth"><strong>Need ongoing marketing?</strong> Growth: {money(data.offer.growthMonthly)}/month + GST. Required Guided Launch from {money(data.offer.growthLaunch)} + GST.</p>
      <p className="cc-usage">SMS, email, voice and optional services are charged separately. Vendor taxes and final pricing are confirmed at checkout.</p>
    </div></section>
    <section className="cc-fit-section"><div className="cc-inner"><h2>Which fits the way you work?</h2><div className="cc-fit">{data.fit.map((item,index) => <article key={item.title}><p className="cc-vendor">{index===0?data.competitor:'Zapla'}</p><h3>{item.title}</h3><p>{item.description}</p><p className="cc-consideration">{item.consideration}</p></article>)}</div></div></section>
    <section className="cc-foundations"><div className="cc-inner"><div className="cc-section-heading"><p className="cc-section-label">The platform underneath</p><h2>Built with regional data in mind.</h2></div><div className="cc-foundation-list">{data.foundations.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><p className="cc-foundation-note">{data.foundationNote}</p></div></section>
    <section className="cc-faq"><div className="cc-inner cc-faq-grid"><h2>A few practical questions.</h2><div>{data.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="cc-final"><div className="cc-inner"><ZaplaPetal size={36}/><h2>See if Zapla fits your team.</h2><p>Talk through your enquiries, follow-up and bookings. Get clear on the plan and launch before you decide.</p><div className="cc-actions"><CallButton/><Link className="cc-text-link" to={data.pricingUrl}>View all Zapla pricing <ArrowRight size={17}/></Link></div></div></section>
    <section className="cc-notes"><div className="cc-inner"><details><summary>Sources and comparison notes</summary><p>Checked {data.updated}. Prepared by Zapla from first-party vendor documentation and the owner-confirmed Zapla offer. This is not an independent product test.</p><p>{data.methodology}</p><ul className="cc-source-list">{data.sources.map(source => <li key={source.id}>{source.url === data.pricingUrl ? <Link to={data.pricingUrl}>{source.title}</Link> : <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>}</li>)}</ul></details></div></section>
  </main>;
}
