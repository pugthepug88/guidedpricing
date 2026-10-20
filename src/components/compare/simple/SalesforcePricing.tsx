import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (value: number) => `A$${value.toLocaleString('en-AU')}`;

export function SalesforcePricing({ data }: { data: ComparisonDefinition }) {
  const [users, setUsers] = useState('5');
  const [largeTeam, setLargeTeam] = useState(false);
  const people = Number(users);
  const valid = users !== '' && Number.isSafeInteger(people) && people >= 1 && people <= 100;
  const quoted = largeTeam || people > 100;
  const monthly = people * data.vendorAnnualPrice;
  return <><div className="cc-team-pricing cc-salesforce-pricing" data-pricing-details="true">
    <div className="cc-team-controls">
      <div className="cc-control-heading">
        <label htmlFor="salesforce-people">People needing full Pro Suite access</label>
        <input id="salesforce-people" className="cc-value-input" type="number" min={1} max={100} step={1} value={users} aria-describedby="salesforce-input-note" onChange={event => { setUsers(event.target.value); setLargeTeam(false); }} />
      </div>
      <input aria-label="People needing full Pro Suite access slider" id="salesforce-team-size" type="range" min={1} max={100} step={1} value={valid ? people : 5} onChange={event => { setUsers(event.target.value); setLargeTeam(false); }} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>100 people</span></div>
      <p>Salesforce billing: <strong>Annual</strong></p>
      <button type="button" className="sf-large-team" aria-pressed={largeTeam} onClick={() => setLargeTeam(value => !value)}>{largeTeam ? 'Back to team calculator' : 'More than 100 people?'}</button>
      <p id="salesforce-input-note" className="sf-input-note">The calculator range is not a product capacity limit.</p>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3>
        <p className="cc-seat-result">{valid && !quoted ? `${people} ${people === 1 ? 'person' : 'people'}. ` : ''}Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p>{money(data.offer.monthly * 12)} for 12 months of software.</p>
        <p className="cc-team-billing">Month-to-month after launch.</p>
        <p>Required Guided Launch <strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article><h3>Salesforce Pro Suite</h3>
        {quoted ? <><h4>Compare a current team quote</h4><p>For more than 100 people, compare your Salesforce quote with the access and setup your business needs.</p><p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check Salesforce pricing ↗</a></p><p><a href="/booking">Book a Call</a></p></> : valid ? <>
          <p className="cc-seat-result">{people} paid Pro Suite {people === 1 ? 'user' : 'users'}</p>
          <p className="cc-team-total">{money(monthly)}<span>/month equivalent, before taxes</span></p>
          <p className="cc-team-billing">{money(monthly * 12)} billed annually. Annual contract.</p>
          <p>{people} × {money(data.vendorAnnualPrice)} per user/month.</p>
        </> : <p role="status">Enter a whole number from 1 to 100, or choose the larger-team option.</p>}
      </article>
    </div>

  </div>
    <details className="cc-cost-examples"><summary>Compared plan and billing details</summary>
    <p>Zapla’s subscription is lower from three Pro users at these list rates. Required Guided Launch is additional, so subscription savings are not first-year total savings.</p>
      <p>{data.vendorPlanReason} {data.vendorLowerPlans}</p>
      <p>Each selected person is modelled with a full Pro licence. The calculation uses published AUD list pricing. Discounts, different access requirements and your order can change the amount payable. Salesforce’s standard subscription terms generally prevent reducing purchased quantities during the term.</p>
      <p>No additional cloud, paid support plan or connected-app subscription is added to this calculation.</p>
      <a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check Salesforce pricing ↗</a>
    </details>
  </>;
}
