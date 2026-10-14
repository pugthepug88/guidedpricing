import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ZaplaPetal } from '@/components/ZaplaPetal';
import zaplaLogo from '@/assets/zapla-logo-blue.png.asset.json';
import { type ComparisonDefinition } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;
function CallButton() { return <Button asChild className="cc-button"><a href="https://zapla.io/booking">Book a Call <ArrowRight size={16}/></a></Button>; }

export function ComparisonPage({ data }: { data: ComparisonDefinition }) {
  const exampleRef = useRef<HTMLElement>(null);
  const [exampleActive, setExampleActive] = useState(false);
  useEffect(() => {
    const element = exampleRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setExampleActive(true); observer.disconnect(); }
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <main className="concise-comparison" data-page="concise-comparison">
    <section className="cc-hero"><div className="cc-inner cc-hero-grid">
      <div><h1>Zapla vs {data.competitor}.</h1>
        <p className="cc-hero-line">{data.headline}</p>
        <p className="cc-hero-copy">{data.introduction}</p>
        <div className="cc-actions"><CallButton/><a href="#comparison">Compare side by side ↓</a></div>
      </div>
      <figure ref={exampleRef} className="cc-example" data-active={exampleActive}>
        <div className="cc-example-heading"><img src={zaplaLogo.url} alt="" width={28} height={28}/><span>{data.example.title}</span></div>
        <ol>{data.example.steps.map(step => <li key={step.label}><strong>{step.label}</strong><p>{step.text}</p></li>)}</ol>
        <figcaption>{data.example.caption}</figcaption>
      </figure>
    </div></section>
    <section className="cc-differences"><div className="cc-inner">
      <h2>Three differences to weigh.</h2>
      <div className="cc-difference-grid">{data.differences.map(item => <article key={item.title}><h3>{item.title}</h3><p><strong>{data.competitor}:</strong> {item.competitor}</p><p><strong>Zapla:</strong> {item.zapla}</p></article>)}</div>
    </div></section>
    <section id="comparison" className="cc-table-band"><div className="cc-inner">
      <h2>The setup, side by side.</h2>
      <p className="cc-table-intro">{data.tableIntroduction}</p>
      <table className="cc-table" role="table"><caption>{data.tableCaption}</caption>
        <thead><tr role="row"><th scope="col" role="columnheader">What matters</th><th scope="col" role="columnheader">{data.competitor}</th><th scope="col" role="columnheader">Zapla</th></tr></thead>
        <tbody role="rowgroup">{data.rows.map(row => <tr key={row.id} role="row"><th scope="row" role="rowheader">{row.label}</th>
          <td role="cell" data-status={row.competitor.status}><span className="cc-mobile-vendor" aria-hidden="true">{data.competitor}</span>{row.competitor.text}</td>
          <td role="cell" data-status={row.zapla.status}><span className="cc-mobile-vendor" aria-hidden="true">Zapla</span>{row.zapla.text}</td>
        </tr>)}</tbody>
      </table>
    </div></section>
    <section className="cc-commercial" aria-labelledby="team-heading"><div className="cc-inner">
      <h2 id="team-heading">How the pricing works.</h2>
      <div className="cc-price-grid">
        <div><h3 className="cc-price-label">{data.competitor}</h3><p className="cc-price-basis">{data.vendorPriceHeading}</p>
          <p className="cc-price-description">{data.vendorPriceDescription}</p>
        </div>
        <div><h3 className="cc-price-label">Zapla Follow-Through</h3><p className="cc-price" data-testid="zapla-monthly">{money(data.offer.monthly)}<span>/month + GST · unlimited users</span></p>
          <p className="cc-launch" data-testid="required-launch">Required Guided Launch from {money(data.offer.launch)} + GST</p>
        </div>
      </div>
      <p className="cc-bill-note">{data.costCaution} <a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">View {data.competitor} pricing</a>.</p>
      <p className="cc-growth"><strong>Need ongoing marketing or reactivation?</strong> Zapla Growth is {money(data.offer.growthMonthly)}/month + GST, with required Guided Launch from {money(data.offer.growthLaunch)} + GST.</p>
      <p className="cc-usage">SMS, email, voice and optional services are charged separately.</p>
    </div></section>
    <div className="cc-inner"><section className="cc-fit" aria-label="Which setup suits your team">
      {data.fit.map((item, index) => <article key={item.title}>
        <div className="cc-vendor">{index === 1 && <img src={zaplaLogo.url} alt="" width={32} height={32}/>}<span>{index === 0 ? data.competitor : 'Zapla'}</span></div>
        <h2>{item.title}</h2><p>{item.description}</p><p className="cc-consideration">{item.consideration}</p>
      </article>)}
    </section></div>
    <section className="cc-foundations"><div className="cc-inner"><h2>What sits behind Zapla.</h2>
      <div className="cc-foundation-list">{data.foundations.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      <p className="cc-foundation-note">{data.foundationNote}</p>
    </div></section>
    <section className="cc-faq"><div className="cc-inner cc-faq-grid"><h2>Before you decide.</h2><div>{data.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></section>
    <section className="cc-final"><div className="cc-inner"><div className="cc-petal"><ZaplaPetal size={34}/></div><h2>See which setup fits your team.</h2>
      <p>Bring the way you handle enquiries, replies and bookings. We’ll discuss the fit, the plan and the setup before you decide.</p>
      <div className="cc-actions"><CallButton/><Button variant="ghost" asChild className="cc-button cc-secondary"><Link to={data.pricingUrl}>View pricing <ArrowRight size={16}/></Link></Button></div>
    </div></section>
    <section className="cc-notes"><div className="cc-inner"><details><summary>Sources and comparison notes</summary>
      <p>Updated {data.updated}. Prepared by Zapla from first-party vendor documentation and the owner-confirmed Zapla offer. This is not an independent product test.</p>
      <p>{data.methodology}</p>
      <ul className="cc-source-list">{data.sources.map(source => <li key={source.id}>{source.url === data.pricingUrl ? <Link to={data.pricingUrl}>{source.title}</Link> : <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>}</li>)}</ul>
    </details></div></section>
  </main>;
}
