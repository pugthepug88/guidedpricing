import { useState } from 'react';
import { ghlComparison } from './ghl';

// USD per AUD, RBA 19 October 2026. Convert before rounding, never from display values.
export const ghlReferenceRate = 0.6975;
export function ghlSubscription(annual: boolean) {
  const nativeAnnual = (annual ? 970 : 97 * 12) + 297 * 12;
  return { nativeAnnual, audAnnual: nativeAnnual / ghlReferenceRate, audMonthly: nativeAnnual / ghlReferenceRate / 12 };
}
// Round headline estimates to the nearest A$5; annual totals retain full conversion precision.
const aud = (value: number) => 'A$' + (Math.round(value / 5) * 5).toLocaleString('en-AU');

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
      <article><h3>GoHighLevel Starter + HIPAA</h3><p className="ghl-price">{aud(price.audMonthly)}<span>/month before applicable tax{annual ? ', annual equivalent' : ''}</span></p><p>Unlimited users. AUD estimate.</p><p><strong>{annual ? 'Starter: US$970/year upfront. HIPAA: US$297/month.' : 'Billed US$394/month.'}</strong></p><p>{annual ? 'Zapla remains billed monthly.' : 'Monthly billing.'}</p></article>
    </div>
    <details className="cc-cost-examples"><summary>Subscription breakdown</summary><p>GoHighLevel Starter: {annual ? 'US$970/year upfront (A$115/month equivalent)' : 'US$97/month (A$140/month)'}. HIPAA add-on: US$297/month (A$425/month). AUD figures are rounded estimates. The HIPAA charge is already included in the displayed total.</p><p>HIPAA is optional when purchasing Starter. This comparison includes it. HighLevel states it cannot be removed once enabled.</p></details>
    <p className="ghl-fineprint">GHL charges in USD. Headline AUD estimates are rounded to the nearest A$5. Annual totals use the unrounded conversion. Estimates use the <a href="https://www.rba.gov.au/statistics/frequency/exchange-rates.html" target="_blank" rel="noopener noreferrer">RBA rate</a> of A$1 = US$0.6975 on 19 October 2026; your payment-provider rate and fees may differ. Prices exclude applicable tax, setup, usage and optional services. These are published subscription calculations, not checkout quotations.</p>
    <p>{ghlComparison.vendorPlanReason} <a href={ghlComparison.vendorPricingUrl} target="_blank" rel="noopener noreferrer">See GoHighLevel pricing ↗</a></p>
  </div>;
}
