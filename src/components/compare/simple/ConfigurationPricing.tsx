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
  return <>
  <div className="cc-team-pricing cc-configuration-pricing">
    <div className="cc-team-controls">
      <div className="cc-control-heading"><label htmlFor="comparison-users">People who need CRM access</label><input aria-label="Number of people" className="cc-value-input" type="number" min={1} value={users} onChange={event => setUsers(Math.max(1, Number(event.target.value) || 1))} /></div>
      <input id="comparison-users" type="range" min={1} max={Math.max(100, users)} step={1} value={users} onChange={event => setUsers(Number(event.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>{Math.max(100, users)} people</span></div>
      <div className="cc-contact-control">
        <div className="cc-control-heading"><label htmlFor="comparison-contacts">Email & WhatsApp contacts</label><input aria-label="Number of contacts" className="cc-value-input" type="number" min={1} value={contacts} onChange={event => setContacts(Math.max(1, Number(event.target.value) || 1))} /></div>
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
        <p className="cc-same-price">Unlimited users and WhatsApp contacts. 8 connected WhatsApp numbers.</p>
      </article>
      <article><h3>{data.competitor} {data.vendorPlan}</h3>
        <p className="cc-seat-result">{contacts.toLocaleString('en-AU')} email contacts · {Math.max(5000, contacts).toLocaleString('en-AU')} WhatsApp contacts · {users} {users === 1 ? 'user' : 'users'}</p>
        {quote ? <>
          <p className="cc-team-total">{money(annual ? quote.annual / 12 : quote.monthly)}<span>/month{annual ? ' equivalent' : ''} before taxes</span></p>
          <p>Pipelines + WhatsApp included.</p>
          <p className="cc-team-billing">{annual ? `${money(quote.annual)} paid annually. One-year commitment.` : 'Monthly billing. No annual commitment.'}</p>
          {!annual && <p className="cc-team-alternative">Or {money(quote.annual / 12)}/month equivalent, {money(quote.annual)} paid annually.</p>}
        </> : <>
          <p className="cc-quote-heading">Current quote required</p>
          <p>Get a current price for this team and contact allowance.</p>
          <a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check ActiveCampaign pricing ↗</a>
        </>}

      </article>
    </div>
    <p className="cc-team-qualification">Required Guided Launch from {money(data.offer.launch)} + GST. Usage extra. Different feature bundles. <a href="/Pricing-v3">Zapla plan details ↗</a></p>
  </div>
    <details className="cc-cost-examples cc-subscription-costs">
      <summary>Subscription totals & plan details</summary>
      <p>{contacts.toLocaleString('en-AU')} email contacts · {Math.max(5000, contacts).toLocaleString('en-AU')} WhatsApp contacts · {users} {users === 1 ? 'user' : 'users'} · {annual ? 'annual' : 'monthly'} ActiveCampaign billing.</p>
      <table className="cc-selected-cost-table">
        <caption>12-month subscription comparison. Setup and usage excluded; feature bundles differ.</caption>
        <thead><tr><th scope="col">Cost</th><th scope="col">Zapla Follow-Through</th><th scope="col">ActiveCampaign {data.vendorPlan}</th></tr></thead>
        <tbody>
          <tr><th scope="row">12-month subscription</th><td data-label="Zapla">{money(data.offer.monthly * 12)}</td><td data-label="ActiveCampaign">{quote ? money(annual ? quote.annual : quote.monthly * 12) : 'Current quote required'}</td></tr>
        </tbody>
      </table>
      <p className="cc-cost-note">Subscription only. Zapla excludes GST; ActiveCampaign is before applicable taxes. Required Zapla Guided Launch from {money(data.offer.launch)} + GST is additional. Messaging usage and optional services are extra. {annual ? 'ActiveCampaign is paid annually upfront with a one-year commitment.' : 'ActiveCampaign total uses twelve monthly payments.'}</p>
      <p>Drag the sliders or type your own numbers. These controls are comparison tools, not product capacity limits. Contact allowances and team sizes outside the checked pricing components require a current ActiveCampaign quote. WhatsApp has a minimum 5,000-contact allowance.</p>
      <p>ActiveCampaign Plus includes a monthly marketing email allowance of ten times the purchased contact band. The price includes Pipelines and the WhatsApp subscription for the same contact count, with a minimum 5,000 WhatsApp contacts and five connected numbers. Messaging usage, SMS and connected apps are separate. Zapla email and bulk WhatsApp campaigns require Growth.</p>
      <p><strong>Need automated 1:1 sales email?</strong> At 5,000 email and WhatsApp contacts and five users, Plus + Sales Engagement + WhatsApp calculates to A$805/month, or A$7,231 paid annually (A$602.58/month equivalent), before applicable taxes. This adds the checked WhatsApp fee to the previously checked Sales Engagement package. Sales Engagement replaces Pipelines; it is not added on top. This is a fixed example, not every slider selection.</p>
      <p>Calculated from AUD Plus + Pipelines package quotes and separate WhatsApp subscription fees checked in the live purchase configurator on 18 October 2026. Five WhatsApp numbers included; no prepaid messaging credits, SMS, extra sends or reporting selected. ActiveCampaign amounts are before applicable taxes; Zapla excludes GST. Other packages and allowances require a current quote.</p>
      <p>{data.vendorPlanReason} {data.vendorScope}</p><p>{data.vendorLowerPlans}</p>
      <p>Zapla Follow-Through: {data.offerScope}</p>
      <p>At 1,000 email contacts and one user, Plus + Pipelines is A$1,596/year and the minimum 5,000-contact WhatsApp subscription adds A$1,135/year: A$2,731 paid annually in total. Monthly billing totals A$163 + A$172 = A$335. Messaging usage extra.</p>


      <p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check current ActiveCampaign prices ↗</a></p>
    </details>
  </>;
}
