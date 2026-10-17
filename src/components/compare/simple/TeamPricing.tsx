import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 })}`;

export function TeamPricing({ data }: { data: ComparisonDefinition }) {
  const [users, setUsers] = useState(5);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const config = data.calculator;
  const published = data.publishedPricing;
  const licences = Math.max(users, published?.minimumUsers ?? 1);
  const referenceMoney = (amount: number) => `${published?.currencyPrefix}${amount.toLocaleString('en-AU')}`;
  const referenceRate = (published?.platformRate ?? 0) + (published?.productRate ?? 0);
  const referenceSubtotal = licences * referenceRate;
  const annualRate = data.vendorAnnualPrice;
  const rate = billing === 'annual' ? annualRate : data.vendorPrice;
  const vendorTotal = users * rate;

  return <div className="cc-team-pricing" data-pricing-details={Boolean(config)}>
    <div className="cc-team-controls">
      <label htmlFor="comparison-team-size">{config?.teamSizeLabel ?? "People who need CRM access"} <output htmlFor="comparison-team-size">{users}</output></label>
      <input id="comparison-team-size" type="range" min={1} max={25} step={1} value={users} onChange={event => setUsers(Number(event.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>25 people</span></div>
      {!data.quotePricing && !published && <fieldset className="cc-billing-control"><legend>{data.competitor} billing</legend>
        <label><input type="radio" name="comparison-billing" checked={billing === 'monthly'} onChange={() => setBilling('monthly')} /> {config?.monthlyLabel ?? "Monthly"}</label>
        <label><input type="radio" name="comparison-billing" checked={billing === 'annual'} onChange={() => setBilling('annual')} /> {config?.annualLabel ?? "Annual"}</label>
      </fieldset>}
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3><p className="cc-seat-result">{users} {users === 1 ? 'person' : 'people'}. Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p className="cc-same-price">Same subscription as you add users.</p>
        <p className="cc-team-billing">Billed monthly. Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article><h3>{data.competitor} {data.vendorPlan}</h3><p className="cc-seat-result">{published ? `${licences} licences modelled${users < licences ? ` for ${users} ${users === 1 ? 'person' : 'people'}` : ''}` : <>{users} {data.quotePricing ? (users === 1 ? 'person in your team' : 'people in your team') : config ? `${config.seatName}${users === 1 ? '' : 's'}` : `paid ${users === 1 ? 'seat' : 'seats'}`}</>}</p>
        {published ? <div className="cc-published-result">
          <p className="cc-team-total">{referenceMoney(referenceRate)}<span>/user/month · USD reference</span></p>
          <p>{referenceMoney(published.platformRate)} Growth + {referenceMoney(published.productRate)} Sales per user/month.</p>
          <p className="cc-licence-subtotal">{licences} × {referenceMoney(referenceRate)} = <strong>{referenceMoney(referenceSubtotal)}/month licence subtotal</strong> ({referenceMoney(referenceSubtotal * 12)}/year).</p>
          <div className="cc-purchase-minimum"><p><strong>{referenceMoney(published.minimumAnnualPurchase)}/year minimum purchase</strong> for new customers.</p>
            <p>{referenceSubtotal * 12 < published.minimumAnnualPurchase ? 'The licence subtotal is below this minimum and is not the amount a new customer can buy for.' : 'The modelled licence subtotal exceeds this minimum; it is not a final quote.'}</p>
            <p>Minimum {published.minimumUsers} platform users. Standard {published.standardTermYears}-year contract.</p>
          </div>
          <p className="cc-team-billing">Prices exclude applicable taxes. Australian pricing, payment schedule and implementation require confirmation.</p>
        </div> : data.quotePricing ? <div className="cc-quote-result">
          <p className="cc-quote-heading">{data.quotePricing.message}</p>
          <p>{data.quotePricing.detail}</p>
          <p className="cc-team-billing">Pricing for the selected team is confirmed by {data.competitor}.</p>
        </div> : <>
        <p className="cc-team-total">{money(vendorTotal)}<span>/month{billing === 'annual' ? ' equivalent' : ''} + GST</span></p>
        <p>{users} × {money(rate)} per {config?.rateUnit ?? (config ? 'Sales seat' : 'user')}/month.</p>
        <p className="cc-team-billing">{billing === 'annual' ? `${money(vendorTotal * 12)} paid upfront each year.` : (config?.monthlyCommitment ?? 'Billed monthly.')}</p>
        <p className="cc-team-alternative">{billing === 'monthly' ? `Or ${money(users * annualRate)}/month equivalent with annual billing.` : `Or ${money(users * data.vendorPrice)}/month with monthly billing${config && config.annualCommitment !== false ? ', annual commitment' : ''}.`}</p>
        {config?.onboarding !== undefined && <p className="cc-team-billing">Required onboarding: {money(config.onboarding)} + GST.</p>}
        </>}
      </article>
    </div>
    <p className="cc-team-qualification">{published ? published.qualification : <>{config && <>{config.qualification} </>}Subscription comparison for the named plans. Features differ. Adding users does not increase your Zapla plan price; usage, optional services and plan changes can affect your total bill. {data.quotePricing ? 'Zapla amounts exclude GST. Creatio’s Australian price and tax treatment require confirmation.' : 'All amounts shown exclude GST.'}</>}</p>
    <details className="cc-team-plan-notes"><summary>Compared plans and current prices</summary><p>{data.vendorPlanReason} {data.vendorScope}</p><p>Zapla Follow-Through: {data.offerScope}</p>{data.vendorLowerPlans && <p>{data.vendorLowerPlans}</p>}{data.quotePricing && <p>{data.quotePricing.qualification}</p>}{published && <p>{published.historicalReference}</p>}{config && <p>{config.annualRateNote}</p>}<p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current {data.competitor} prices ↗</a></p></details>
  </div>;
}

