import { Link } from '@tanstack/react-router';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ZaplaPetal } from '@/components/ZaplaPetal';
import { TeamPricing } from './TeamPricing';
import type { ComparisonCell, ComparisonDefinition, ComparisonRow } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;

function CallButton() {
  return <Button asChild className="cc-button"><a href="/booking">Book a Call <ArrowRight size={17} aria-hidden="true" /></a></Button>;
}

function Cell({ value, vendor }: { value: ComparisonCell; vendor: string }) {
  return <td role="cell" data-status={value.status}>
    <span className="cc-mobile-vendor" aria-hidden="true">{vendor}</span>
    {value.mark && <span className={`cc-mark cc-mark--${value.mark}`}><span className="sr-only">{value.mark === 'tick' ? 'Included' : 'Not included as named'}</span>{value.mark === 'tick' ? <Check size={25} strokeWidth={2.6} aria-hidden="true" /> : <X size={23} strokeWidth={2} aria-hidden="true" />}</span>}
    {value.text && <strong className="cc-short-label">{value.text}</strong>}
  </td>;
}

function FeatureTable({ rows, competitor, vendorPlan, zaplaPlan, caption }: { rows: readonly ComparisonRow[]; competitor: string; vendorPlan: string; zaplaPlan: string; caption: string }) {
  return <table className="cc-table"><caption>{caption}</caption>
    <thead><tr><th scope="col">Features</th><th scope="col"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={99} height={29} /><span className="cc-table-plan">{zaplaPlan}</span></th><th scope="col">{competitor}<span className="cc-table-plan">{vendorPlan}</span></th></tr></thead>
    <tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.label}</th><Cell value={row.zapla} vendor="Zapla" /><Cell value={row.competitor} vendor={competitor} /></tr>)}</tbody>
  </table>;
}

export function ComparisonPage({ data }: { data: ComparisonDefinition }) {
  const allRows = [...data.rows, ...data.growthRows, ...data.optionalRows];
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
      <div className="cc-table-group-heading"><h3>Everyday customer work</h3><p><strong>Follow-Through: {money(data.offer.monthly)}/month + GST.</strong> Unlimited users. Required launch from {money(data.offer.launch)} + GST.</p></div>
      <FeatureTable rows={data.rows} competitor={data.competitor} vendorPlan={data.vendorPlan} zaplaPlan="Follow-Through" caption={`${data.competitor} ${data.vendorPlan} compared with Zapla Follow-Through.`} />
      <p className="cc-table-key">✓ Included · × Not included as named. Integrations may be available. Zapla contacts are subject to fair use. Phone numbers and communications usage are separate.</p>
      <div className="cc-table-group-heading cc-growth-heading"><h3>Marketing with Growth</h3><p><strong>{money(data.offer.growthMonthly)}/month + GST in total.</strong> Includes Follow-Through and the tools below. Required launch from {money(data.offer.growthLaunch)} + GST.</p></div>
      <FeatureTable rows={data.growthRows} competitor={data.competitor} vendorPlan={`${data.vendorPlan} · extras shown`} zaplaPlan="Growth" caption={`Marketing tools in Zapla Growth and additional tools used with ${data.competitor}.`} />
      <p className="cc-table-key">{data.marketingNote}</p>
      <div className="cc-table-group-heading cc-optional-heading"><h3>Optional call answering</h3><p>AI Receptionist answers calls, captures details and can book or route enquiries.</p></div>
      <FeatureTable rows={data.optionalRows} competitor={data.competitor} vendorPlan={data.vendorPlan} zaplaPlan="Optional service" caption="AI Receptionist is separately priced and is not included in either Zapla subscription." />
      <p className="cc-table-key">AI Receptionist is separately priced, with setup and usage terms. <Link to={data.pricingUrl}>See AI Receptionist pricing ↗</Link></p>
      <details className="cc-more-tools"><summary>Feature details and plan notes</summary>
        <div className="cc-feature-notes">{allRows.map(row => <div key={row.id}><h3>{row.label}</h3><p><strong>{data.competitor}:</strong> {row.competitor.detail || row.competitor.text}</p><p><strong>Zapla:</strong> {row.zapla.detail || row.zapla.text}</p></div>)}</div>
        <Link to={data.pricingUrl}>See full Zapla plan inclusions ↗</Link>
      </details>
    </div></section>

    <section id="pricing-comparison" className="cc-commercial" aria-labelledby="price-heading"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">Your team, your subscription</p><h2 id="price-heading">Add people.<br />Keep the same plan price.</h2><p>Explore how team size affects the subscription for each named plan.</p></div>
      <TeamPricing data={data} />
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
      <p className="cc-growth"><strong>Choose Growth for email/SMS campaigns, social scheduling and reactivation.</strong> Everything in Follow-Through, with unlimited users. {money(data.offer.growthMonthly)}/month + GST. Required Guided Launch from {money(data.offer.growthLaunch)} + GST.</p>
      <p className="cc-usage">SMS, email, WhatsApp, voice and optional services are charged separately. Payment-provider charges also apply.</p>
    </div></section>

    <section className="cc-fit-section" aria-labelledby="fit-heading"><div className="cc-inner"><h2 id="fit-heading">Which fits the way you work?</h2><div className="cc-fit">{data.fit.map((item, index) => <article key={item.title}><p className="cc-vendor">{index === 0 ? data.competitor : 'Zapla'}</p><h3>{item.title}</h3><p>{item.description}</p><p className="cc-consideration">{item.consideration}</p></article>)}</div></div></section>
    <section className="cc-faq" aria-labelledby="faq-heading"><div className="cc-inner cc-faq-grid"><h2 id="faq-heading">A few practical questions.</h2><div>{data.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="cc-notes"><div className="cc-inner"><details><summary>Comparison details &amp; sources</summary><p>Checked {data.updated}. Based on official vendor documentation and Zapla’s current offer.</p><p>{data.methodology}</p>
      <details className="cc-claim-sources"><summary>Check the sources for each comparison</summary>{allRows.map(row => <div key={row.id}><strong>{row.label}</strong><p>{[...new Set([...row.competitor.sources, ...row.zapla.sources])].map(id => { const source = data.sources.find(item => item.id === id); return source ? <a key={id} href={source.url} target={source.url.startsWith('/') ? undefined : '_blank'} rel="noopener noreferrer">{source.title} ↗</a> : null; })}</p></div>)}</details>
      <details className="cc-security-notes"><summary>Hosting and data handling</summary>{data.foundations.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}<p>{data.foundationNote}</p></details>
      <ul className="cc-source-list">{data.sources.map(source => <li key={source.id}>{source.url === data.pricingUrl ? <Link to={data.pricingUrl}>{source.title}</Link> : <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>}</li>)}</ul>
    </details></div></section>
    <section className="cc-final cc-final--canonical" aria-labelledby="cta-heading"><div className="cc-inner"><div className="cc-final-petal"><ZaplaPetal size={34} /></div><h2 id="cta-heading">See how Zapla would work<br />for your business.</h2><p>Bring your current tools and the follow-up you want to improve. We’ll discuss the fit, plan and launch before you decide.</p><div className="cc-actions"><CallButton /><Link className="cc-final-secondary" to={data.pricingUrl}>View pricing</Link></div></div></section>
  </main>;
}
