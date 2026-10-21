import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ZaplaPetal } from '@/components/ZaplaPetal';
import { TeamPricing } from './TeamPricing';
import { ConfigurationPricing } from './ConfigurationPricing';
import { CustomerContextVisual } from './CustomerContextVisual';
import type { ComparisonCell, ComparisonDefinition, ComparisonRow } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;

function CallButton() {
  return <Button asChild className="cc-button"><a href="/booking">Book a Call <ArrowRight size={17} aria-hidden="true" /></a></Button>;
}

function Cell({ value, vendor }: { value: ComparisonCell; vendor: string }) {
  return <td role="cell" data-status={value.status}>
    <span className="cc-mobile-vendor" aria-hidden="true">{vendor}</span>
    {value.mark && <span className={`cc-mark cc-mark--${value.mark}`}><span className="sr-only">{value.mark === 'tick' ? 'Included' : 'Not included in the compared package or stated allowance'}</span>{value.mark === 'tick' ? <Check size={25} strokeWidth={2.6} aria-hidden="true" /> : <X size={23} strokeWidth={2} aria-hidden="true" />}</span>}
    {value.text && <strong className="cc-short-label">{value.text}</strong>}
    {value.subLines && <span className="cc-sub-lines">{value.subLines.map(line => <span className="cc-sub-line" key={line}>{line}</span>)}</span>}
  </td>;
}

function FeatureTable({ rows, competitor, vendorPlan, zaplaPlan, caption }: { rows: readonly ComparisonRow[]; competitor: string; vendorPlan: string; zaplaPlan: string; caption: string }) {
  return <table className="cc-table"><caption>{caption}</caption>
    <thead><tr><th scope="col">Features</th><th scope="col"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={99} height={29} /><span className="cc-table-plan">{zaplaPlan}</span></th><th scope="col">{competitor}<span className="cc-table-plan">{vendorPlan}</span></th></tr></thead>
    <tbody>{rows.map(row => <tr key={row.id}><th scope="row">{row.label}</th><Cell value={row.zapla} vendor="Zapla" /><Cell value={row.competitor} vendor={competitor} /></tr>)}</tbody>
  </table>;
}

export function ComparisonPage({ data, pricingContent }: { data: ComparisonDefinition; pricingContent?: ReactNode }) {
  const allRows = [...data.rows, ...data.growthRows, ...data.optionalRows];
  const growthInclusions = ["Database reactivation", "Email campaigns", "Bulk SMS & WhatsApp campaigns", "Social scheduling", "Campaign attribution & conversion tracking"];
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
      <div className="cc-reasons" aria-labelledby="why-zapla-heading"><h2 id="why-zapla-heading">Why choose Zapla?</h2><div className="cc-reasons-layout"><div className="cc-highlights">{data.highlights.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p>{item.link && <a className="cc-reason-link" href={item.link.href}>{item.link.label} <ArrowRight size={15} aria-hidden="true" /></a>}</div>)}</div><CustomerContextVisual variant={data.customerVisual} /></div></div>
    </div></section>

    <section id="comparison" className="cc-table-band" aria-labelledby="comparison-heading"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">The comparison</p><h2 id="comparison-heading">Compare what’s included.</h2><p>{data.tableIntroduction}</p></div>
      <div className="cc-table-group-heading"><h3>Everyday customer work</h3><p><strong>Follow-Through: {money(data.offer.monthly)}/month + GST.</strong> Unlimited users. Required launch from {money(data.offer.launch)} + GST.</p></div>
      <FeatureTable rows={[...data.rows, ...data.optionalRows]} competitor={data.competitor} vendorPlan={data.vendorPlan} zaplaPlan="Follow-Through" caption={`${data.competitor} ${data.vendorPlan} compared with Zapla Follow-Through.`} />
      <p className="cc-table-key">✓ Included in the compared package. × Not included in the compared package or stated allowance. Integrations and paid extras are labelled; their costs vary. ¹ Phone numbers and communications usage are extra unless included in the stated allowance.</p>
      <aside className="cc-upgrade-note" aria-labelledby="growth-upgrade-heading">
        <div className="cc-upgrade-features"><h3 id="growth-upgrade-heading">{data.growthComparison?.headline ?? "Need marketing too?"}</h3>{data.growthComparison && <p>{data.growthComparison.description}</p>}<p>Growth includes everything in Follow-Through, plus:</p><ul>{growthInclusions.map(label => <li key={label}>{label}</li>)}</ul></div>
        <div className="cc-upgrade-price"><p className="cc-upgrade-plan">Zapla Growth</p><p className="cc-upgrade-amount"><strong>{money(data.offer.growthMonthly)}</strong><span>/month + GST, total subscription</span></p><p>Required Guided Launch<br /><strong>from {money(data.offer.growthLaunch)} + GST</strong></p><p>Sending usage is separate.</p><Link to={data.pricingUrl}>Explore Growth <ArrowRight size={15} aria-hidden="true" /></Link></div>
      </aside>
      {data.showMarketingNote && !data.growthComparison && <p className="cc-usage">{data.marketingNote}</p>}
      {data.growthComparison && <div className="cc-growth-comparison"><p><strong>{data.growthComparison.vendorPrice}</strong> <a href={data.growthComparison.url} target="_blank" rel="noopener noreferrer">See Marketing Hub pricing ↗</a></p><p>{data.growthComparison.qualification}</p><p>{data.marketingNote}</p></div>}
      <p className="cc-table-key">{data.workflowNote}</p>
      {data.tableNotes?.map(note => <p className="cc-table-key" key={note}>{note}</p>)}
      <p className="cc-table-key">AI Receptionist is an optional paid service; setup and usage terms are separate. <Link to={data.pricingUrl}>See pricing ↗</Link></p>
      <details className="cc-more-tools"><summary>Feature details and plan notes</summary>
        <div className="cc-feature-notes">{allRows.map(row => <div key={row.id}><h3>{row.label}</h3><p><strong>{data.competitor}:</strong> {row.competitor.detail || row.competitor.text}</p><p><strong>Zapla:</strong> {row.zapla.detail || row.zapla.text}</p></div>)}</div>
        <Link to={data.pricingUrl}>See full Zapla plan inclusions ↗</Link>
      </details>
    </div></section>

    <section id="pricing-comparison" className="cc-commercial" aria-labelledby="price-heading"><div className="cc-inner">
      <div className="cc-section-heading"><p className="cc-section-label">Your team, your subscription</p><h2 id="price-heading">{data.pricingHeading ?? <>Add people.<br />Keep the same plan price.</>}</h2><p>{data.pricingIntroduction ?? `${data.competitor} ${data.vendorPlan} charges per paid user. Zapla Follow-Through includes unlimited users for ${money(data.offer.monthly)}/month + GST. Compare subscription prices below, then consider the included tools and required setup.`}</p></div>
      {pricingContent ?? (data.verifiedConfigurations ? <ConfigurationPricing data={data} /> : <TeamPricing data={data} />)}
      {!data.verifiedConfigurations && <details className="cc-cost-examples cc-first-year">
        <summary>{data.costExamples.title}</summary><p>{data.costExamples.introduction}</p>
        <table className={`cc-cost-table${data.quotePricing || data.publishedPricing ? ' cc-cost-table--quote' : ''}`} role="table"><caption>{data.costExamples.caption ?? "Listed first-year subscription amounts and minimum Zapla Guided Launch, in Australian dollars."}</caption>
          <thead><tr role="row"><th scope="col" role="columnheader">{data.costExamples.teamHeading ?? "Team size"}</th>{data.costExamples.columns.map(name => <th scope="col" role="columnheader" key={name}>{name}</th>)}</tr></thead>
          <tbody role="rowgroup">{data.costExamples.rows.map(row => <tr role="row" key={row.label}><th scope="row" role="rowheader">{row.label}</th>{row.values.map((value, index) => <td role="cell" key={data.costExamples.columns[index]}><span className="cc-cost-vendor" aria-hidden="true">{data.costExamples.columns[index]}</span><span className="cc-cost-amount">{typeof value === 'number' ? money(value) : value}</span></td>)}</tr>)}</tbody>
        </table>
        <p className="cc-cost-note">{data.costExamples.note}</p>
        <p className="cc-renewal">Zapla’s subscription is {money(data.offer.monthly * 12)} + GST for 12 months at today’s price, before usage and extras.</p>
      </details>}
      <details className="cc-more-launch"><summary>What does Guided Launch cover?</summary><p>{data.launch.introduction}</p><ol>{data.launch.steps.map(item => <li key={item.title}><strong>{item.title}.</strong> {item.description}</li>)}</ol><Link to={data.pricingUrl}>See full launch inclusions ↗</Link></details>
      <p className="cc-usage">{data.usageNote ?? 'Zapla communications usage, phone numbers, optional services and payment-provider fees are extra.'}</p>
    </div></section>

    <section className="cc-fit-section" aria-labelledby="fit-heading"><div className="cc-inner cc-fit-layout"><h2 id="fit-heading">Which fits the way you work?</h2><div className="cc-fit">{data.fit.map((item, index) => ({ item, vendor: index === 0 ? data.competitor : 'Zapla' })).reverse().map(({ item, vendor }) => <article key={item.title}><p className="cc-vendor">{vendor}</p><div className="cc-fit-copy"><h3>{item.title}</h3><p>{item.description}</p>{item.consideration && <p className="cc-consideration">{item.consideration}</p>}</div></article>)}</div></div></section>
    <section className="cc-faq" aria-labelledby="faq-heading"><div className="cc-inner cc-faq-grid"><h2 id="faq-heading">A few practical questions.</h2><div>{data.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="cc-notes"><div className="cc-inner"><details><summary>Comparison details &amp; sources</summary><p>Checked {data.updated}. Based on official vendor documentation and Zapla’s current offer.</p><p>{data.methodology}</p>
      <details className="cc-claim-sources"><summary>Check the sources for each comparison</summary>{allRows.map(row => <div key={row.id}><strong>{row.label}</strong><p>{[...new Set([...row.competitor.sources, ...row.zapla.sources])].map(id => { const source = data.sources.find(item => item.id === id); return source ? <a key={id} href={source.url} target={source.url.startsWith('/') ? undefined : '_blank'} rel="noopener noreferrer">{source.title} ↗</a> : null; })}</p></div>)}</details>
      {data.foundations.length > 0 && <details className="cc-security-notes"><summary>Hosting and data handling</summary>{data.foundations.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}<p>{data.foundationNote}</p></details>}
      <ul className="cc-source-list">{data.sources.map(source => <li key={source.id}>{source.url === data.pricingUrl ? <Link to={data.pricingUrl}>{source.title}</Link> : <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>}</li>)}</ul>
    </details></div></section>
    <section className="cc-final cc-final--canonical" aria-labelledby="cta-heading"><div className="cc-inner"><div className="cc-final-petal"><ZaplaPetal size={34} /></div><h2 id="cta-heading">See how Zapla would work<br />for your business.</h2><p>Bring your current tools and the follow-up you want to improve. We’ll discuss the fit, plan and launch before you decide.</p><div className="cc-actions"><CallButton /><Link className="cc-final-secondary" to={data.pricingUrl}>View pricing</Link></div></div></section>
  </main>;
}

