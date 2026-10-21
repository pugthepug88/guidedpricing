import { useState } from 'react';

export function ThryvPricing() {
  const [annual, setAnnual] = useState(false);
  const months = annual ? 12 : 1;
  const money = (n: number) => `A$${n.toLocaleString('en-AU')}`;
  return <div className="thryv-pricing" data-period={annual ? 'annual' : 'monthly'}>
    <fieldset className="thryv-billing"><legend>Display period</legend>
      <label><input type="radio" name="thryv-period" checked={!annual} onChange={() => setAnnual(false)} />Monthly rate</label>
      <label><input type="radio" name="thryv-period" checked={annual} onChange={() => setAnnual(true)} />12-month subscription</label>
    </fieldset>
    <div className="thryv-results" aria-live="polite" aria-atomic="true">
      <article><h3>Zapla Follow-Through</h3><p className="thryv-price">{money(399 * months)}<span>{annual ? '+ GST' : '/month + GST'}</span></p><p>Unlimited users</p><p>{annual ? 'Twelve monthly payments at today’s price' : 'Month-to-month subscription'}</p></article>
      <article><h3>Thryv Signature</h3><p className="thryv-price">{money(560 * months)}<span>{annual ? '+ GST' : '/month + GST'}</span></p><p>Published package price</p><p>{annual ? 'Twelve monthly payments at today’s price' : 'Six-month initial term'}</p></article>
    </div>
    <p className="thryv-fineprint">Subscription prices only. Zapla requires Guided Launch from A$1,997 + GST. Usage and optional services are additional. Package inclusions differ.</p>
  </div>;
}
