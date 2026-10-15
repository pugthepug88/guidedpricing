import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;

export function TeamPricing({ data }: { data: ComparisonDefinition }) {
  const [users, setUsers] = useState(5);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const annualRate = data.vendorAnnualPrice;
  const rate = billing === 'annual' ? annualRate : data.vendorPrice;
  const vendorTotal = users * rate;

  return <div className="cc-team-pricing">
    <div className="cc-team-controls">
      <label htmlFor="comparison-team-size">People who need CRM access <output htmlFor="comparison-team-size">{users}</output></label>
      <input id="comparison-team-size" type="range" min={1} max={25} step={1} value={users} onChange={event => setUsers(Number(event.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>25 people</span></div>
      <fieldset className="cc-billing-control"><legend>{data.competitor} billing</legend>
        <label><input type="radio" name="comparison-billing" checked={billing === 'monthly'} onChange={() => setBilling('monthly')} /> Monthly</label>
        <label><input type="radio" name="comparison-billing" checked={billing === 'annual'} onChange={() => setBilling('annual')} /> Annual</label>
      </fieldset>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3><p className="cc-seat-result">{users} people. Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p className="cc-same-price">Same subscription as you add users.</p>
        <p className="cc-team-billing">Billed monthly. Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article><h3>{data.competitor} {data.vendorPlan}</h3><p className="cc-seat-result">{users} paid {users === 1 ? 'seat' : 'seats'}</p>
        <p className="cc-team-total">{money(vendorTotal)}<span>/month{billing === 'annual' ? ' equivalent' : ''}</span></p>
        <p>{users} × {money(rate)} per user/month.</p>
        <p className="cc-team-billing">{billing === 'annual' ? `${money(vendorTotal * 12)} paid upfront each year.` : 'Billed monthly.'}</p>
        <p className="cc-team-alternative">{billing === 'monthly' ? `Or ${money(users * annualRate)}/month equivalent with annual billing.` : `Or ${money(users * data.vendorPrice)}/month with monthly billing.`}</p>
      </article>
    </div>
    <p className="cc-team-qualification">Subscription comparison for the named plans. Features differ. Adding users does not increase your Zapla plan price; usage, optional services and plan changes can affect your total bill. Zapla excludes GST; {data.competitor} tax treatment is confirmed at checkout.</p>
    <details className="cc-team-plan-notes"><summary>Compared plans and current prices</summary><p>{data.vendorPlanReason} {data.vendorScope}</p><p>Zapla Follow-Through: {data.offerScope}</p><p>{data.vendorLowerPlans}</p><p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current {data.competitor} prices ↗</a></p></details>
  </div>;
}
