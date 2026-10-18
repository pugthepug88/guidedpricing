import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (n: number) => `A$${n.toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;

// Package quotes, not a per-seat rate: additional users change the package price.
export function ConfigurationPricing({ data }: { data: ComparisonDefinition }) {
  const [contacts, setContacts] = useState(5000);
  const [users, setUsers] = useState(5);
  const [annual, setAnnual] = useState(false);
  const configurations = data.verifiedConfigurations!;
  const quote = configurations.find(item => item.contacts === contacts && item.users === users)!;
  return <div className="cc-team-pricing cc-configuration-pricing">
    <div className="cc-team-controls">
      <p>Example configuration</p>
      <label htmlFor="comparison-contacts">Contacts</label>
      <select id="comparison-contacts" value={contacts} onChange={event => setContacts(Number(event.target.value))}>
        {[...new Set(configurations.map(item => item.contacts))].map(value => <option key={value} value={value}>{value.toLocaleString('en-AU')}</option>)}
      </select>
      <label htmlFor="comparison-users">Users</label>
      <select id="comparison-users" value={users} onChange={event => setUsers(Number(event.target.value))}>
        {[...new Set(configurations.map(item => item.users))].map(value => <option key={value} value={value}>{value}</option>)}
      </select>
      <fieldset className="cc-billing-control"><legend>{data.competitor} billing</legend>
        <label><input type="radio" name="comparison-billing" checked={!annual} onChange={() => setAnnual(false)} /> Monthly</label>
        <label><input type="radio" name="comparison-billing" checked={annual} onChange={() => setAnnual(true)} /> Annual</label>
      </fieldset>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3>
        <p className="cc-seat-result">{quote.users} {quote.users === 1 ? 'person' : 'people'}. Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p className="cc-same-price">Same subscription as you add users and stored contacts, subject to fair use.</p>
        <p className="cc-team-billing">Billed monthly. Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article><h3>{data.competitor} {data.vendorPlan}</h3>
        <p className="cc-seat-result">{quote.label}</p>
        <p className="cc-team-total">{money(annual ? quote.annual / 12 : quote.monthly)}<span>/month{annual ? ' equivalent' : ''} before applicable taxes</span></p>
        <p>Includes the selected users, Pipelines and {(quote.contacts * 10).toLocaleString('en-AU')} marketing email sends/month. SMS, WhatsApp and connected apps are separate.</p>
        <p className="cc-team-billing">{annual ? `${money(quote.annual)} paid upfront each year. Annual commitment.` : 'Billed monthly. Month-to-month subscription.'}</p>
        <p className="cc-team-alternative">{annual ? `Or ${money(quote.monthly)}/month with monthly billing.` : `Or ${money(quote.annual / 12)}/month equivalent, ${money(quote.annual)} paid annually.`}</p>
        <p>No mandatory onboarding fee is added.</p>
      </article>
    </div>
    <p className="cc-team-qualification"><strong>Need automated 1:1 sales email?</strong> At 5,000 contacts and five users, Plus + Sales Engagement is A$633/month, or A$508/month equivalent, A$6,096 paid annually, before applicable taxes. It replaces Pipelines.</p>
    <p className="cc-team-qualification">These six configurations were checked in ActiveCampaign’s AUD purchase configurator on 18 October 2026. Other combinations require a current quote; additional users are not priced by a single fixed rate. Features differ. ActiveCampaign includes email campaigns; Zapla campaigns require Growth. ActiveCampaign amounts are before applicable taxes; Zapla amounts exclude GST. Usage, optional services and Zapla’s required launch are separate.</p>
    <details className="cc-team-plan-notes"><summary>Compared plans and current prices</summary>
      <p>{data.vendorPlanReason} {data.vendorScope}</p><p>{data.vendorLowerPlans}</p>
      <p>Zapla Follow-Through: {data.offerScope}</p>
      <p>At 1,000 contacts and one user, Plus is A$74/month equivalent and Pipelines A$59/month equivalent, both paid annually: A$1,596 upfront in total. Monthly billing is A$89 + A$74 = A$163/month.</p>
      <p>Sales Engagement instead of Pipelines was A$176/month equivalent, A$2,112 paid annually, at 1,000 contacts and one user. It is not the configuration priced above. Do not add both CRM packages together.</p>
      <p>Optional channels, checked on annual billing: SMS with 1,000 credits/month adds A$307/year. The WhatsApp bundle at 5,000 contacts with 1,000 credits/month adds A$1,405/year. These are separate from the main quote and before applicable taxes. Credits are not a message count; country, message type and length affect usage.</p>
      <p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current ActiveCampaign prices ↗</a></p>
    </details>
  </div>;
}
