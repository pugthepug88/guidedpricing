import { useState } from 'react';
import type { ComparisonDefinition } from './types';

const money = (n: number) => `A$${n.toLocaleString('en-AU')}`;

export function ZohoV2Pricing({ data }: { data: ComparisonDefinition }) {
  const [users, setUsers] = useState(5);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const rate = billing === 'annual' ? data.vendorAnnualPrice : data.vendorPrice;
  const total = users * rate;
  const difference = total - data.offer.monthly;
  const firstYear = data.offer.monthly * 12 + data.offer.launch;
  return <div className="cc-team-pricing cc-zoho-v2-pricing" data-pricing-details="true">
    <div className="cc-team-controls">
      <label htmlFor="comparison-team-size">People needing regular CRM access <output htmlFor="comparison-team-size">{users}</output></label>
      <input id="comparison-team-size" type="range" min={1} max={100} step={1} value={users} onChange={event => setUsers(Number(event.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>100 people</span></div>
      <fieldset className="cc-billing-control"><legend>Zoho CRM billing</legend>
        <label><input type="radio" name="comparison-billing" checked={billing === 'monthly'} onChange={() => setBilling('monthly')} /> Monthly</label>
        <label><input type="radio" name="comparison-billing" checked={billing === 'annual'} onChange={() => setBilling('annual')} /> Annual</label>
      </fieldset>
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla Follow-Through</h3><p className="cc-seat-result">{users} {users === 1 ? 'person' : 'people'}. Unlimited users included.</p>
        <p className="cc-team-total">{money(data.offer.monthly)}<span>/month + GST</span></p>
        <p className="cc-same-price">Add people. Keep the same subscription.</p>
        <p className="cc-team-billing">Billed monthly. Required Guided Launch<br /><strong>from {money(data.offer.launch)} + GST.</strong></p>
      </article>
      <article><h3>Zoho CRM Professional</h3><p className="cc-seat-result">{users} regular CRM {users === 1 ? 'user' : 'users'}</p>
        <p className="cc-team-total">{money(total)}<span>/month{billing === 'annual' ? ' equivalent' : ''} + GST</span></p>
        <p>{users} × {money(rate)} per regular user/month.</p>
        <p className="cc-team-billing">{billing === 'annual' ? `${money(total * 12)} paid upfront each year.` : 'Billed monthly. No annual commitment.'}</p>
        <p className="cc-team-alternative">{billing === 'monthly' ? `Or ${money(users * data.vendorAnnualPrice)}/month equivalent with annual billing.` : `Or ${money(users * data.vendorPrice)}/month with monthly billing.`}</p>
      </article>
    </div>
    <div className="cc-zv2-difference" aria-live="polite" aria-atomic="true">
      <strong>{difference > 0 ? `Zapla subscription is ${money(difference)}/month less.` : difference < 0 ? `Zoho subscription is ${money(-difference)}/month less at this team size.` : 'The subscription prices are equal at this team size.'}</strong>
      <p>{difference > 0 ? `${money(difference * 12)} less over 12 months of subscriptions. Required Zapla launch changes the first-year comparison below.` : 'Zapla includes the shared inbox, two-way SMS tools, reviews and website builders alongside your CRM. Compare the work your team needs to do.'}</p>
      <p className="cc-zv2-first-year"><span>First year at this team size</span><span>Zapla <b>from {money(firstYear)}</b></span><span>Zoho <b>{money(total * 12)}</b></span></p>
    </div>
    <p className="cc-team-qualification">AUD excluding GST, usage and optional extras. Features differ. First year includes 12 months of subscriptions and Zapla’s minimum launch; Zoho implementation is optional and excluded. Each person is modelled with a regular CRM licence. Restricted Team User mixes can cost less.</p>
    <details className="cc-team-plan-notes"><summary>Compared plans, Team Users and price verification</summary>
      <p>{data.vendorPlanReason}</p><p>{data.calculator?.annualRateNote}</p>
      <p>Team Users cost A$16/month or A$13/month equivalent annually, excluding GST. They can work within Team Modules but have restricted access to organisation modules, including record editing, ownership and manual emails. They are not interchangeable with full customer-facing CRM users.</p>
      <p>Standard starts at A$30/month or A$20/month equivalent annually per regular user, excluding GST, and already includes workflows. Free CRM supports up to three users with restricted functionality.</p>
      <p><a href={data.vendorPricingUrl} target="_blank" rel="noopener noreferrer">Check Zoho CRM pricing ↗</a></p>
    </details>
    <details className="cc-team-plan-notes"><summary>Considering Zoho One or CRM Plus?</summary>
      <p>Zoho One includes CRM plus TeamInbox, Bookings, Campaigns, Social, Sites and other apps. All-employee pricing is A$65/employee/month or A$55/month equivalent annually (A$660/year upfront). Every payroll employee must be licensed. Flexible-user pricing is A$145 monthly or A$125/month equivalent annually (A$1,500/year upfront). All exclude GST.</p>
      <p>For five total employees, Zoho One costs A$325/month or A$275/month equivalent annually, excluding GST. It can be a cheaper way to buy several Zoho apps; included apps are not extra subscriptions.</p>
      <p>CRM Plus Enterprise is A$97/user/month or A$80/month equivalent annually (A$960/year upfront), excluding GST. It bundles CRM, marketing, support and analytics. CRM Plus Starter is also listed in AUD with a more limited CRM feature set; paid Australian checkout was not verified.</p>
      <p><a href="https://www.zoho.com/one/pricing/" target="_blank" rel="noopener noreferrer">Zoho One pricing ↗</a>{' · '}<a href="https://www.zoho.com/crm/crmplus/pricing.html" target="_blank" rel="noopener noreferrer">CRM Plus pricing ↗</a></p>
    </details>
  </div>;
}
