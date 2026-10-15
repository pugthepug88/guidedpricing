import { Link } from '@tanstack/react-router';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ZaplaPetal } from '@/components/ZaplaPetal';
import type { ComparisonCell, ComparisonDefinition } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;

function CallButton() {
  return <Button asChild className="cc-button"><a href="https://zapla.io/booking">Book a Call <ArrowRight size={17} aria-hidden="true" /></a></Button>;
}

function Cell({ value, vendor }: { value: ComparisonCell; vendor: string }) {
  return <td role="cell" data-status={value.status}>
    <span className="cc-mobile-vendor" aria-hidden="true">{vendor}</span>
    {value.mark && <span className={`cc-mark cc-mark--${value.mark}`}><span className="sr-only">{value.mark === 'tick' ? 'Included' : 'Not included as named'}</span>{value.mark === 'tick' ? <Check size={25} strokeWidth={2.6} aria-hidden="true" /> : <X size={23} strokeWidth={2} aria-hidden="true" />}</span>}
    {value.text && <strong className="cc-short-label">{value.text}</strong>}
  </td>;
}

export function ComparisonPage({ data }: { data: ComparisonDefinition }) {
  return <main className="concise-comparison" data-page="concise-comparison">
    <section className="cc-hero"><div className="cc-inner">
      <p className="cc-comparison-name">Zapla vs {data.competitor}</p>
      <div className="cc-hero-grid">
        <div className="cc-hero-message">
          <h1>{data.headline}<span>{data.headlineAccent}</span></h1>
          <p className="cc-hero-copy">{data.introduction}</p>
          <div className="cc-actions"><CallButton /><a className="cc-text-link" href="#comparison">See the comparison <ArrowRight size={17} aria-hidden="true" /></a></div>
          <p className="cc-hero-context">One flat software subscription. Required setup agreed before you commit.</p>
        </div>
        <aside className="cc-team-offer" aria-label="Zapla Follow-Through team pricing">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={109} height={32} />
          <p className="cc-offer-name">Follow-Through</p>
          <p className="cc-unlimited">Unlimited<br />users.</p>
          {data.offer.unlimitedContacts && <p className="cc-offer-contacts">Unlimited stored contacts, subject to fair use.</p>}
          <div className="cc-hero-price"><strong>{money(data.offer.monthly)}</strong><span>/month + GST</span></div>
          <p className="cc-hero-launch">Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST</strong></p>
        </aside>
      </div>
      <div className="cc-highlights">{data.highlights.map(item => <div key={item.title}><h2>{item.title}</h2><p>{item.description}</p></div>)}</div>
    </div></section>

    <section id="comparison" className="cc-table-band" aria-labelledby="comparison-heading"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">The comparison</p><h2 id="comparison-heading">Compare what’s included.</h2><p>{data.tableIntroduction}</p></div>
      <table className="cc-table" role="table"><caption>{data.tableCaption}</caption>
        <thead><tr role="row"><th scope="col" role="columnheader">Features</th><th scope="col" role="columnheader"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={99} height={29} /><span className="cc-table-plan">Follow-Through · Growth marked</span></th><th scope="col" role="columnheader">{data.competitor}<span className="cc-table-plan">{data.vendorPlan}</span></th></tr></thead>
        <tbody role="rowgroup">{data.rows.map(row => <tr key={row.id} role="row"><th scope="row" role="rowheader">{row.label}</th><Cell value={row.zapla} vendor="Zapla" /><Cell value={row.competitor} vendor={data.competitor} /></tr>)}</tbody>
      </table>
      <p className="cc-table-key">✓ Included · × Not included as named · Integrations may be available. Contacts: fair use applies to Zapla. Communications usage is separate.</p>
      <p className="cc-table-growth">Growth: {money(data.offer.growthMonthly)}/month + GST, with required launch from {money(data.offer.growthLaunch)} + GST.</p>
      <details className="cc-more-tools"><summary>Feature details and plan notes</summary>
        <div className="cc-feature-notes">{data.rows.map(row => <div key={row.id}><h3>{row.label}</h3><p><strong>{data.competitor}:</strong> {row.competitor.detail || row.competitor.text}</p><p><strong>Zapla:</strong> {row.zapla.detail || row.zapla.text}</p></div>)}</div>
        <Link to={data.pricingUrl}>See full Zapla plan inclusions ↗</Link>
      </details>
    </div></section>

    <section id="pricing-comparison" className="cc-commercial" aria-labelledby="price-heading"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">The price, with context</p><h2 id="price-heading">{data.pricingHeadline}</h2></div>
      <div className="cc-price-grid">
        <article><h3>{data.competitor} {data.vendorPlan}</h3><p className="cc-price">{money(data.vendorPrice)}<span>{data.vendorPriceUnit}</span></p><p className="cc-billing">{data.vendorBilling}</p><p className="cc-plan-reason">{data.vendorPlanReason}</p><p className="cc-plan-scope">{data.vendorScope}</p></article>
        <article className="cc-zapla-price"><h3>Zapla Follow-Through</h3><p className="cc-price" data-testid="zapla-monthly">{money(data.offer.monthly)}<span>/month + GST · unlimited users</span></p><p className="cc-billing">Billed monthly.</p><p className="cc-plan-scope">{data.offerScope}</p><p className="cc-launch" data-testid="required-launch">Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST</strong></p></article>
      </div>
      <p className="cc-price-context">{data.vendorLowerPlans} {data.costCaution} <a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current {data.competitor} prices ↗</a></p>
      <div className="cc-cost-examples">
        <h3>What does the software cost for your team?</h3>
        <p>Monthly billing first, with Pipedrive’s annual discount alongside. Before usage, extra tools, setup and applicable taxes.</p>
        <table className="cc-cost-table" role="table"><caption>Pipedrive Premium monthly and annual billing against Zapla Follow-Through monthly billing, in Australian dollars.</caption>
          <thead><tr role="row"><th scope="col" role="columnheader">Team size</th>{data.costExamples.columns.map(name => <th scope="col" role="columnheader" key={name}>{name}</th>)}</tr></thead>
          <tbody role="rowgroup">{data.recurringExamples.map(row => <tr role="row" key={row.label}><th scope="row" role="rowheader">{row.label}</th>{row.values.map((value, index) => <td role="cell" key={data.costExamples.columns[index]}><span className="cc-cost-vendor" aria-hidden="true">{data.costExamples.columns[index]}</span><span className="cc-cost-amount">{money(value)}</span></td>)}</tr>)}</tbody>
        </table>
        <p className="cc-cost-note">Zapla excludes GST. Pipedrive taxes and location-specific quotes are confirmed at checkout. These plans include different tools; the figures are not a complete matching-package quote.</p>
      </div>
      <details className="cc-cost-examples cc-first-year">
        <summary>{data.costExamples.title}</summary><p>{data.costExamples.introduction}</p>
        <table className="cc-cost-table" role="table"><caption>Listed first-year subscription amounts and minimum Zapla Guided Launch, in Australian dollars.</caption>
          <thead><tr role="row"><th scope="col" role="columnheader">Team size</th>{data.costExamples.columns.map(name => <th scope="col" role="columnheader" key={name}>{name}</th>)}</tr></thead>
          <tbody role="rowgroup">{data.costExamples.rows.map(row => <tr role="row" key={row.label}><th scope="row" role="rowheader">{row.label}</th>{row.values.map((value, index) => <td role="cell" key={data.costExamples.columns[index]}><span className="cc-cost-vendor" aria-hidden="true">{data.costExamples.columns[index]}</span>{index === row.values.length - 1 && <span className="cc-cost-from">From </span>}<span className="cc-cost-amount">{money(value)}</span></td>)}</tr>)}</tbody>
        </table>
        <p className="cc-cost-note">{data.costExamples.note}</p>
        <p className="cc-renewal">After the original launch, Zapla’s subscription is {money(data.offer.monthly * 12)} + GST for 12 months at today’s price, before usage and extras.</p>
      </details>
      <details className="cc-more-launch"><summary>What does Guided Launch cover?</summary><p>{data.launch.introduction}</p><ol>{data.launch.steps.map(item => <li key={item.title}><strong>{item.title}.</strong> {item.description}</li>)}</ol><Link to={data.pricingUrl}>See full launch inclusions ↗</Link></details>
      <p className="cc-growth"><strong>Need marketing and reactivation tools?</strong> Growth: {money(data.offer.growthMonthly)}/month + GST. Required Guided Launch from {money(data.offer.growthLaunch)} + GST.</p>
      <p className="cc-usage">SMS, email, WhatsApp, voice and optional services are charged separately. Payment-provider charges also apply.</p>
    </div></section>

    <section className="cc-fit-section" aria-labelledby="fit-heading"><div className="cc-inner"><h2 id="fit-heading">Which fits the way you work?</h2><div className="cc-fit">{data.fit.map((item, index) => <article key={item.title}><p className="cc-vendor">{index === 0 ? data.competitor : 'Zapla'}</p><h3>{item.title}</h3><p>{item.description}</p><p className="cc-consideration">{item.consideration}</p></article>)}</div></div></section>
    <section className="cc-foundations" aria-labelledby="platform-heading"><div className="cc-inner"><div className="cc-section-heading"><p className="cc-section-label">The platform underneath</p><h2 id="platform-heading">Choose where your core data is hosted.</h2></div><div className="cc-foundation-list">{data.foundations.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><p className="cc-foundation-note">{data.foundationNote}</p></div></section>
    <section className="cc-faq" aria-labelledby="faq-heading"><div className="cc-inner cc-faq-grid"><h2 id="faq-heading">A few practical questions.</h2><div>{data.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="cc-final" aria-labelledby="cta-heading"><div className="cc-inner"><ZaplaPetal size={36} /><h2 id="cta-heading">See how Zapla would work<br />for your business.</h2><p>Bring your current tools and the follow-up you want to improve. We’ll discuss the fit, plan and launch before you decide.</p><div className="cc-actions"><CallButton /><Link className="cc-text-link" to={data.pricingUrl}>View all Zapla pricing <ArrowRight size={17} aria-hidden="true" /></Link></div></div></section>
    <section className="cc-notes"><div className="cc-inner"><details><summary>Sources and comparison notes</summary><p>Checked {data.updated}. Prepared by Zapla from first-party vendor documentation and the owner-confirmed Zapla offer. This is not an independent product test.</p><p>{data.methodology}</p>
      <details className="cc-claim-sources"><summary>Check the sources for each comparison</summary>{data.rows.map(row => <div key={row.id}><strong>{row.label}</strong><p>{[...new Set([...row.competitor.sources, ...row.zapla.sources])].map(id => { const source = data.sources.find(item => item.id === id); return source ? <a key={id} href={source.url} target={source.url.startsWith('/') ? undefined : '_blank'} rel="noopener noreferrer">{source.title} ↗</a> : null; })}</p></div>)}</details>
      <ul className="cc-source-list">{data.sources.map(source => <li key={source.id}>{source.url === data.pricingUrl ? <Link to={data.pricingUrl}>{source.title}</Link> : <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>}</li>)}</ul>
    </details></div></section>
  </main>;
}
