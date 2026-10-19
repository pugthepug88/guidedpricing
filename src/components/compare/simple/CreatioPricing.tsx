import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (amount: number) => `A$${amount.toLocaleString('en-AU')}`;
export const creatioAnnualLicences = (people: number) => (Math.max(5, people) * 64 + people * 24) * 12;

export function CreatioPricing({ data }: { data: ComparisonDefinition }) {
  const [users, setUsers] = useState(5);
  const platforms = Math.max(5, users);
  const annual = creatioAnnualLicences(users);
  const belowMinimum = annual < 16000;
  return <div className="cc-team-pricing cc-creatio-v2-pricing" data-pricing-details="true">
    <div className="cc-team-controls">
      <label htmlFor="comparison-team-size">People needing full sales features <output htmlFor="comparison-team-size">{users}</output></label>
      <input id="comparison-team-size" type="range" min={1} max={100} step={1} value={users} onChange={event => setUsers(Number(event.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>100 people</span></div>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla">
        <h3>Zapla Follow-Through</h3>
        <p className="cc-seat-result">{users} {users === 1 ? 'person' : 'people'}. Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p><strong>{money(data.offer.monthly * 12)} for 12 months of software.</strong></p>
        <p className="cc-same-price">Add people. Your subscription stays the same.</p>
        <p className="cc-team-billing">Month-to-month after launch.<br />Required Guided Launch <strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article>
        <h3>Creatio Growth + Sales</h3>
        <p className="cc-seat-result">{belowMinimum ? 'Published new-customer purchase minimum' : `${users} full Sales users at published rates`}</p>
        <p className="cc-team-total">{money(belowMinimum ? 16000 : annual)}<span>{belowMinimum ? '/year minimum purchase' : '/year licence subtotal'}</span></p>
        <p>{belowMinimum ? 'Minimum purchase, not an extra fee on top of licences.' : 'Per-user pricing. Your subscription grows with your team.'}</p>
        <p className="cc-team-billing">Minimum five platform users.<br />Standard three-year contract. Taxes extra.</p>
      </article>
    </div>
    <p className="cc-team-qualification">Software subscriptions compared; feature bundles differ. Zapla launch, usage and optional services are additional.</p>
    <details className="cc-team-plan-notes"><summary>See the licence calculation and billing details</summary>
      <p>Creatio’s minimum is an annual purchase requirement, not an extra fee or a five-user package price. A smaller licence subtotal does not meet the published new-customer purchasing conditions.</p>
      <p><strong>A$88 per full user/month, billed annually:</strong> A$64 Growth platform + A$24 Sales.</p>
      <p className="cc-licence-subtotal">{platforms} Growth × A$64 + {users} Sales × A$24 = <strong>{money(annual / 12)}/month equivalent · {money(annual)}/year</strong>.</p>
      <p>{belowMinimum ? 'This licence subtotal is below A$16,000/year. The public calculator disables Buy for this below-minimum selection.' : 'This is list-price arithmetic for the named configuration, not a negotiated quote.'} The model gives every selected person a Growth platform licence and Sales access, with a minimum of five platform licences.</p>
      <p>Checkout adds a 4% card processing fee; choosing invoice removes that fee. Taxes and payment fees are excluded from this comparison. Marketing, Service, paid support and paid AI packages are not added to the model. AI Studio and the platform’s included AI credits remain included.</p>
      <p>{data.vendorPlanReason}</p>
      <p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current Creatio pricing ↗</a></p>
    </details>
  </div>;
}
