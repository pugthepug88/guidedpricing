import { useState } from 'react';
const money = (n: number) => `A$${n.toLocaleString('en-AU')}`;
export function MondayPricing() {
  const [users, setUsers] = useState(5);
  const [annual, setAnnual] = useState(false);
  const seats = [3, 5, 10, 15, 20, 25, 30, 40].find(n => n >= users);
  const total = seats === undefined ? undefined : seats * (annual ? 45 : 53);
  const difference = total === undefined ? undefined : total - 399;
  return <><div className="cc-team-pricing cc-monday-pricing" data-pricing-details="true">
    <div className="cc-team-controls">
      <label htmlFor="comparison-team-size">People who need full CRM access <output htmlFor="comparison-team-size">{users}</output></label>
      <input id="comparison-team-size" type="range" min={1} max={100} step={1} value={users} onChange={e => setUsers(Number(e.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>100 people</span></div>
      <fieldset className="cc-billing-control"><legend>monday CRM billing</legend>
        <label><input type="radio" name="comparison-billing" checked={!annual} onChange={() => setAnnual(false)} /> Monthly</label>
        <label><input type="radio" name="comparison-billing" checked={annual} onChange={() => setAnnual(true)} /> Annual</label>
      </fieldset>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3><p className="cc-seat-result">Unlimited users</p><p className="cc-team-total">A$399<span>/month + GST</span></p><p className="cc-team-billing">Required Guided Launch from A$1,997 + GST, separately priced.</p></article>
      <article><h3>monday CRM Pro</h3>{total !== undefined && seats !== undefined ? <>
        <p className="cc-seat-result">{seats} paid seats for {users} {users === 1 ? 'person' : 'people'}</p>
        <p className="cc-team-total">{money(total)}<span>/month{annual ? ' equivalent' : ''}</span></p>
        <p className="cc-team-billing">{annual ? `${money(seats * 540)} paid annually upfront.` : 'A$53 per paid seat/month. Billed monthly.'}</p><p>Before applicable taxes.</p>
      </> : <><p className="cc-monday-quote">Current quote required</p><p>monday’s public pricing directs larger teams to sales. Request a quote for your team size.</p><a href="https://monday.com/crm/pricing" target="_blank" rel="noopener noreferrer">Check monday CRM pricing ↗</a></>}</article>
    </div>
    </div>
    <details className="cc-cost-examples cc-monday-notes"><summary>Billing and calculation details</summary>
      {difference !== undefined && <p className="cc-monday-difference">{difference > 0 ? `Zapla’s subscription is ${money(difference)}/month less at this team size.` : difference < 0 ? `monday CRM’s subscription is ${money(-difference)}/month less at this team size.` : 'The subscription prices are equal at this team size.'}</p>}
      <p>Zapla’s subscription is lower from 6 full Pro users at these list rates. Required launch, usage and optional services are separate. At six to ten users, minimum first-year Zapla cost including launch is A$6,785 before GST, compared with A$6,360 for twelve monthly Pro payments or A$5,400 paid annually, before applicable taxes and usage.</p>
      <p>Count people who need full CRM access. monday’s free viewers and restricted guests may cover some other collaborators.</p>
      <p>monday CRM Pro is A$53 per paid seat/month billed monthly, or A$540 per paid seat/year paid upfront. The calculator rounds full users up to the available seat bundles: 3, 5, 10, 15, 20, 25, 30 or 40. Larger teams require a current quote.</p>
      <p>Annual subscriptions renew automatically unless cancelled under monday’s terms; those terms require at least 30 days’ notice before annual renewal. Seat increases can start a new billing term. Removing users does not automatically reduce the purchased bundle.</p>
      <p>Basic and Standard cost less. Standard includes two-way email and smaller automation allowances; Pro adds the shared email access, sequences and larger allowances used in this comparison.</p>
      <p>Prices are in AUD, before applicable taxes. monday’s final price and tax depend on billing details. Zapla prices are + GST. Subscriptions exclude setup, communications usage, optional services and third-party charges. Feature bundles differ.</p>
      <p>Phone numbers, communications usage, optional services and payment-provider fees are extra. monday CRM can be configured self-service; any implementation or connected-provider charges depend on your arrangements.</p>
      <p><a href="https://monday.com/crm/pricing" target="_blank" rel="noopener noreferrer">Check monday CRM pricing ↗</a></p>
    </details>
  </>;
}
