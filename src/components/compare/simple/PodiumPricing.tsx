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
      <article><h3>Podium Standard</h3><p className="podium-price">{money(499 * months)}<span>{annual ? 'ex GST' : '/month equivalent, ex GST'}</span></p><p>{annual ? 'Published monthly rate × 12' : 'Published Australian reference; 12-month agreement'}</p></article>
    </div>
    <p className="podium-difference">{annual ? 'A$1,200 lower subscription over 12 months at the rates shown.' : 'A$100/month lower software subscription at the published rates shown.'}</p>
    <p>Required Zapla Guided Launch is additional, from A$1,997 + GST. Podium includes personalised onboarding; any additional services must be confirmed in its quote.</p>
    <p className="podium-fineprint">These are subscription comparisons, not total-cost savings. Podium’s terms default to annual payment upfront unless its order specifies otherwise. Confirm the quoted package, AUD currency and payment schedule with Podium. Features and usage allowances differ.</p>
    <a href="https://www.podium.com.au/packages-local" target="_blank" rel="noopener noreferrer">View Podium’s Australian package details ↗</a>
    <p className="podium-fineprint">For multiple locations or a different Podium package, compare a tailored quote. No location multiplier is assumed here.</p>
  </div>;
}
