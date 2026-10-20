import { useState } from 'react';

export function PodiumPricing() {
  const [annual, setAnnual] = useState(false);
  const months = annual ? 12 : 1;
  const money = (n: number) => `A$${n.toLocaleString('en-AU')}`;
  return <div className="podium-pricing" data-period={annual ? 'annual' : 'monthly'}>
    <fieldset className="podium-billing"><legend>Display period</legend>
      <label><input type="radio" name="podium-period" checked={!annual} onChange={() => setAnnual(false)} />Monthly rate</label>
      <label><input type="radio" name="podium-period" checked={annual} onChange={() => setAnnual(true)} />12-month subscription</label>
    </fieldset>
    <div className="podium-results" aria-live="polite" aria-atomic="true">
      <article><h3>Zapla Follow-Through</h3><p className="podium-price">{money(399 * months)}<span>{annual ? '+ GST' : '/month + GST'}</span></p><p>{annual ? 'Twelve monthly payments at today’s price' : 'Month-to-month after launch'}</p></article>
      <article><h3>Podium Professional</h3><p className="podium-price">{money(699 * months)}<span>{annual ? 'ex GST' : '/month equivalent, ex GST'}</span></p><p>{annual ? 'Published monthly rate × 12' : 'Published Australian reference; 12-month agreement'}</p></article>
    </div>
    <p className="podium-difference">{annual ? 'A$3,600 lower subscription over 12 months at the rates shown.' : 'A$300/month lower software subscription at the published rates shown.'}</p>
    <p>Required Zapla Guided Launch is additional, from A$1,997 + GST. Usage and optional services are separate.</p>
    <details className="podium-plan-notes"><summary>Package, billing &amp; pricing notes</summary>
      <p>Professional includes personalised automated FAQs and round-robin lead routing. Standard is a cheaper alternative at a published A$499/month equivalent ex GST when those features are not needed.</p>
      <p>Podium’s default terms require annual payment upfront: A$8,388 ex GST at this Professional rate, unless the order specifies otherwise. Monthly instalments do not mean a monthly contract.</p>
      <p>These are subscription comparisons, not total-cost savings. Confirm the package, AUD currency, tax and payment schedule in Podium’s quote. Features and usage allowances differ. Phones, AI Employee and industry-specific packages are not added to this subscription.</p>
      <p>Podium includes personalised onboarding. Any additional services should be confirmed in its quote; no unverified setup fee is added here.</p>
      <a href="https://www.podium.com.au/packages-local" target="_blank" rel="noopener noreferrer">View Podium’s Australian package details ↗</a>
      <p>For multiple locations or a different Podium package, compare a tailored quote. No location multiplier is assumed here.</p>
    </details>
  </div>;
}
