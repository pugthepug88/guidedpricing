import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (n: number) => `A$${n.toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;

// Package quotes, not a per-seat rate: additional users change the package price.
export function ConfigurationPricing({ data }: { data: ComparisonDefinition }) {
  const [contacts, setContacts] = useState(5000);
  const [users, setUsers] = useState(5);
  const [annual, setAnnual] = useState(false);
  const configurations = data.verifiedConfigurations!;
  const contactBands = [...new Set(configurations.map(item => item.contacts))];
  const matchedBand = contactBands.findIndex(value => value >= contacts);
  const contactIndex = matchedBand < 0 ? contactBands.length - 1 : matchedBand;
  const quote = configurations.find(item => item.contacts === contacts && item.users === users);
  return <div className="cc-team-pricing cc-configuration-pricing">
    <div className="cc-team-controls">
      <div className="cc-control-heading"><label htmlFor="comparison-users">People who need CRM access</label><input aria-label="Number of people" className="cc-value-input" type="number" min={1} value={users} onChange={event => setUsers(Math.max(1, Number(event.target.value) || 1))} /></div>
      <input id="comparison-users" type="range" min={1} max={Math.max(100, users)} step={1} value={users} onChange={event => setUsers(Number(event.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>{Math.max(100, users)} people</span></div>
      <div className="cc-contact-control">
        <div className="cc-control-heading"><label htmlFor="comparison-contacts">Contacts</label><input aria-label="Number of contacts" className="cc-value-input" type="number" min={1} value={contacts} onChange={event => setContacts(Math.max(1, Number(event.target.value) || 1))} /></div>
        <input id="comparison-contacts" type="range" min={0} max={contactBands.length - 1} step={1} value={contactIndex} aria-valuetext={`${contacts.toLocaleString('en-AU')} contacts`} onChange={event => setContacts(contactBands[Number(event.target.value)])} />
        <div className="cc-range-labels" aria-hidden="true"><span>{contactBands[0].toLocaleString('en-AU')}</span><span>{contactBands.at(-1)!.toLocaleString('en-AU')}</span></div>
      </div>
      <fieldset className="cc-billing-control"><legend>{data.competitor} billing</legend>
        <label><input type="radio" name="comparison-billing" checked={!annual} onChange={() => setAnnual(false)} /> Monthly</label>
        <label><input type="radio" name="comparison-billing" checked={annual} onChange={() => setAnnual(true)} /> Annual</label>
      </fieldset>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3>
        <p className="cc-seat-result">{users} {users === 1 ? 'person' : 'people'}. Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p className="cc-same-price">Unlimited users and stored contacts. Fair use applies.</p>
        <p className="cc-team-billing">Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article><h3>{data.competitor} {data.vendorPlan}</h3>
        <p className="cc-seat-result">{contacts.toLocaleString('en-AU')} contacts · {users} {users === 1 ? 'user' : 'users'}</p>
        {quote ? <>
          <p className="cc-team-total">{money(annual ? quote.annual / 12 : quote.monthly)}<span>/month{annual ? ' equivalent' : ''} before taxes</span></p>
          <p>Pipelines included.</p>
          <p className="cc-team-billing">{annual ? `${money(quote.annual)} paid annually. One-year commitment.` : 'Monthly billing. No annual commitment.'}</p>
          {!annual && <p className="cc-team-alternative">Or {money(quote.annual / 12)}/month equivalent, {money(quote.annual)} paid annually.</p>}
        </> : <>
          <p className="cc-quote-heading">Current quote required</p>
          <p>Get a current price for this team and contact allowance.</p>
          <a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check ActiveCampaign pricing ↗</a>
        </>}

      </article>
    </div>
    <p className="cc-team-qualification">Different feature bundles. Usage and optional services are extra. <a href="/Pricing-v3">Zapla plan details ↗</a></p>
    <details className="cc-team-plan-notes"><summary>Plan details, allowances & pricing notes</summary>
      <p>Drag the sliders or type your own numbers. These controls are comparison tools, not product capacity limits. Exact contact allowances and team sizes outside the verified examples require a current ActiveCampaign quote; Zapla stored contacts remain subject to fair use.</p>
      <p>ActiveCampaign Plus includes a monthly marketing email allowance of ten times the purchased contact band. SMS, WhatsApp and connected apps are separate. Zapla email campaigns require Growth.</p>
      <p>No mandatory ActiveCampaign setup fee. Onboarding format and migration scope depend on eligibility. Zapla’s required launch is finite scoped work.</p>
      <p><strong>Need automated 1:1 sales email?</strong> At 5,000 contacts and five users, Plus + Sales Engagement is A$633/month, or A$508/month equivalent, A$6,096 paid annually, before applicable taxes. It replaces Pipelines. This is a fixed example, not a quote for every slider selection.</p>
      <p>Checked in the live AUD purchase configurator on 18 October 2026. Prices are for Plus + Pipelines with no optional channels, extra sends or reporting. ActiveCampaign amounts are before applicable taxes; Zapla excludes GST. Other packages and allowances require a current quote.</p>
      <p>{data.vendorPlanReason} {data.vendorScope}</p><p>{data.vendorLowerPlans}</p>
      <p>Zapla Follow-Through: {data.offerScope}</p>
      <p>At 1,000 contacts and one user, Plus is A$74/month equivalent and Pipelines A$59/month equivalent, both paid annually: A$1,596 upfront in total. Monthly billing is A$89 + A$74 = A$163/month.</p>
      <p>Sales Engagement instead of Pipelines was A$176/month equivalent, A$2,112 paid annually, at 1,000 contacts and one user. It is not the configuration priced above. Do not add both CRM packages together.</p>
      <p>Optional channels, checked on annual billing: SMS with 1,000 credits/month adds A$307/year. The WhatsApp bundle at 5,000 contacts with 1,000 credits/month adds A$1,405/year. These are separate from the main quote and before applicable taxes. Credits are not a message count; country, message type and length affect usage.</p>
      <p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current ActiveCampaign prices ↗</a></p>
    </details>
  </div>;
}
