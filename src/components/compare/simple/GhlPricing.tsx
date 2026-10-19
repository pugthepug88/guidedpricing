import { useState } from 'react';
import { ghlComparison } from './ghl';

// USD per AUD, RBA 19 October 2026. Convert before rounding, never from display values.
export const ghlReferenceRate = 0.6975;
export function ghlSubscription(annual: boolean) {
  const nativeAnnual = annual ? 970 : 97 * 12;
  return { nativeAnnual, audAnnual: nativeAnnual / ghlReferenceRate, audMonthly: nativeAnnual / ghlReferenceRate / 12 };
}
const aud = (value: number) => `A$${value.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function GhlPricing() {
  const [annual, setAnnual] = useState(false);
  const price = ghlSubscription(annual);
  return <div className="ghl-pricing" data-billing={annual ? 'annual' : 'monthly'}>
    <fieldset className="ghl-billing"><legend>GoHighLevel billing</legend>
      <label><input type="radio" name="ghl-billing" checked={!annual} onChange={() => setAnnual(false)} />Monthly</label>
      <label><input type="radio" name="ghl-billing" checked={annual} onChange={() => setAnnual(true)} />Annual upfront</label>
    </fieldset>
    <div className="ghl-results" aria-live="polite" aria-atomic="true">
      <article><h3>Zapla Follow-Through</h3><p className="ghl-price">A$399<span>/month + GST</span></p><p>Unlimited users. Billed monthly.</p><p>Required Guided Launch<br /><strong>from A$1,997 + GST</strong></p></article>
      <article><h3>GoHighLevel Starter</h3><p className="ghl-price">{annual ? 'US$970' : 'US$97'}<span>{annual ? '/year, paid upfront' : '/month'}</span></p><p>{annual ? 'Indicative monthly equivalent' : 'Indicative AUD equivalent'}<br /><strong>{aud(price.audMonthly)}/month before applicable tax</strong></p><p>{annual ? 'GHL annual subscription paid upfront. Zapla remains billed monthly.' : 'GHL billed monthly. Zapla is month-to-month after launch.'}</p></article>
    </div>
    <p className="ghl-difference">Zapla is approximately <strong>{aud(399 - price.audMonthly)}/month more</strong>{annual ? ' on an annualised subscription basis.' : ' before tax.'}</p>
    <p className="ghl-fineprint">GHL charges in USD. AUD estimates use the <a href="https://www.rba.gov.au/statistics/frequency/exchange-rates.html" target="_blank" rel="noopener noreferrer">RBA rate</a> of A$1 = US$0.6975 on 19 October 2026; your payment-provider rate and fees may differ. Prices exclude applicable tax, setup, usage and optional services. These are published subscription calculations, not checkout quotations.</p>
    <p>{ghlComparison.vendorPlanReason} <a href={ghlComparison.vendorPricingUrl} target="_blank" rel="noopener noreferrer">See GoHighLevel pricing ↗</a></p>
  </div>;
}
