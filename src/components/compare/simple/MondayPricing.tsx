import { useState } from 'react';
const money = (n: number) => `A$${n.toLocaleString('en-AU', { maximumFractionDigits: 2 })}`;
export function MondayPricing() {
  const [users, setUsers] = useState(5);
  const [annual, setAnnual] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [contacts, setContacts] = useState(2000);
  const [quote, setQuote] = useState('');
  const quoteAmount = quote.trim() === '' ? undefined : Number(quote);
  const validQuote = quoteAmount !== undefined && Number.isFinite(quoteAmount) && quoteAmount > 0 && quoteAmount <= 1000000;
  const zapla = marketing ? 699 : 399;
  const seats = [3, 5, 10, 15, 20, 25, 30, 40].find(n => n >= users);
  const total = seats === undefined ? undefined : seats * (annual ? 45 : 53);
  const combined = total !== undefined && validQuote && contacts <= 52000 ? total + quoteAmount! / (annual ? 12 : 1) : undefined;
  const compared = marketing ? combined : total;
  const difference = compared === undefined ? undefined : compared - zapla;
  return <><div className="cc-team-pricing cc-monday-pricing" data-pricing-details="true">
    <div className="cc-team-controls">
      <fieldset className="cc-monday-mode"><legend>What do you want to compare?</legend>
        <button type="button" aria-pressed={!marketing} onClick={() => setMarketing(false)}>CRM only</button>
        <button type="button" aria-pressed={marketing} onClick={() => setMarketing(true)}>CRM + marketing</button>
      </fieldset>
      <label htmlFor="comparison-team-size">People who need full CRM access <output htmlFor="comparison-team-size">{users}</output></label>
      <input id="comparison-team-size" type="range" min={1} max={100} step={1} value={users} onChange={e => setUsers(Number(e.target.value))} />
      <div className="cc-range-labels" aria-hidden="true"><span>1 person</span><span>100 people</span></div>
      <fieldset className="cc-billing-control"><legend>{marketing ? 'monday subscription billing' : 'monday CRM billing'}</legend>
        <label><input type="radio" name="comparison-billing" checked={!annual} onChange={() => { setAnnual(false); setQuote(''); }} /> Monthly</label>
        <label><input type="radio" name="comparison-billing" checked={annual} onChange={() => { setAnnual(true); setQuote(''); }} /> Annual</label>
      </fieldset>
      {marketing && <div className="cc-monday-marketing-controls">
        <label htmlFor="monday-marketing-contacts">Marketing contacts</label>
        <select id="monday-marketing-contacts" value={contacts} onChange={e => { setContacts(Number(e.target.value)); setQuote(''); }}>
          {[2000, 4000, 7000, 12000, 27000, 52000].map(n => <option key={n} value={n}>{n.toLocaleString('en-AU')}</option>)}
          <option value={60000}>More than 52,000 — custom quote</option>
        </select>
        {contacts <= 52000 && seats !== undefined && <><label htmlFor="monday-campaigns-quote">Your Campaigns Pro quote (AUD, before tax)</label>
          <input id="monday-campaigns-quote" type="number" inputMode="decimal" min="0.01" max="1000000" step="0.01" value={quote} onChange={e => setQuote(e.target.value)} aria-describedby="monday-quote-help" />
          <p id="monday-quote-help">Enter the {annual ? 'full annual upfront' : 'monthly'} Campaigns subscription only, for this contact allowance. Leave out CRM, setup and tax.</p>
          {quote !== '' && !validQuote && <p role="alert">Enter an amount between A$0.01 and A$1,000,000.</p>}</>}
      </div>}
    </div>
    <div className="cc-team-results" aria-live="polite" aria-atomic="true">
      <article className="cc-team-zapla"><h3>Zapla {marketing ? 'Growth' : 'Follow-Through'}</h3><p className="cc-seat-result">Unlimited users</p><p className="cc-team-total">{money(zapla)}<span>/month + GST</span></p><p className="cc-team-billing">Required Guided Launch from {money(marketing ? 2997 : 1997)} + GST, separately priced.</p>{marketing && <p>All Follow-Through tools plus marketing. Unlimited stored contacts, subject to fair use. Sending usage is separate.</p>}</article>
      <article><h3>{marketing ? (contacts > 52000 ? 'monday CRM Pro + custom marketing' : 'monday CRM Pro + Campaigns Pro') : 'monday CRM Pro'}</h3>{total !== undefined && seats !== undefined ? <>
        <p className="cc-seat-result">{seats} paid seats for {users} {users === 1 ? 'person' : 'people'}</p>
        <p className={`cc-team-total${combined !== undefined && combined >= 10000 ? ' cc-monday-large-total' : ''}`}>{money(marketing && combined !== undefined ? combined : total)}<span>/month{annual ? ' equivalent' : ''}{marketing && combined === undefined ? ' · CRM only' : ''}</span></p>
        <p className="cc-team-billing">{annual ? `${money(seats * 540)} paid annually upfront${marketing ? ' for CRM' : ''}.` : 'A$53 per paid seat/month. Billed monthly.'}</p><p>Before applicable taxes.</p>
        {marketing && <>{combined === undefined ? <p><strong>{contacts > 52000 ? 'Custom marketing package required.' : 'Add your Australian Campaigns quote for a combined total.'}</strong></p> : <p>Combined subscription using your quote. {annual ? `${money(combined * 12)} annually upfront in total.` : 'Both subscriptions billed monthly.'}</p>}
          <p>{contacts <= 52000 ? `${contacts.toLocaleString('en-AU')} marketing contacts · ${(contacts * 10).toLocaleString('en-AU')} pooled email sends/month.` : 'Contact monday for the applicable package and allowances.'}</p>
          <a href="https://monday.com/crm/campaigns/pricing" target="_blank" rel="noopener noreferrer">Check Campaigns pricing ↗</a></>}

      </> : <><p className="cc-monday-quote">Current quote required</p><p>monday’s public pricing directs larger teams to sales. Request a quote for your team size.</p><a href="https://monday.com/crm/pricing" target="_blank" rel="noopener noreferrer">Check monday CRM pricing ↗</a></>}</article>
    </div>
    </div>
    <details className="cc-cost-examples cc-monday-notes"><summary>Billing and calculation details</summary>
      {marketing && <p>Growth is A$699/month total, not A$399 plus A$699. Twelve months of Growth is A$8,388 + GST; required Guided Launch from A$2,997 + GST is additional. The annual examples below are explicitly CRM-only.</p>}
      {difference !== undefined && <p className="cc-monday-difference">{difference > 0 ? `Zapla’s subscription is ${money(difference)}/month less at this team size.` : difference < 0 ? `monday’s compared subscription is ${money(-difference)}/month less at this team size.` : 'The subscription prices are equal at this team size.'}</p>}
      <p>In CRM-only mode, Zapla’s subscription is lower from 6 full Pro users at these list rates. Required launch, usage and optional services are separate. At six to ten users, minimum first-year Zapla cost including launch is A$6,785 before GST, compared with A$6,360 for twelve monthly Pro payments or A$5,400 paid annually, before applicable taxes and usage.</p>
      {marketing && <>
        <p>Campaigns Pro is a separate contact-based subscription, not another per-seat CRM charge. It includes email campaigns, reactivation workflows, templates and campaign analytics. With monday CRM, campaign activity can inform sales follow-up and attribution.</p>
        <p>Pro includes up to five marketing workflows, 100 segments and 25,000 automation actions/month. Its monthly email allowance is pooled at ten times the purchased contact allowance; this is not a limit of ten emails to each person. Removing a marketing contact takes effect in the next monthly billing cycle.</p>
        <p>Zapla Growth includes unlimited workflow count, database reactivation, email campaigns, bulk SMS &amp; WhatsApp campaigns, social scheduling, and campaign attribution &amp; conversion tracking. Unlimited contacts and workflow count do not mean unlimited sending, executions or setup. monday Campaigns focuses on email; SMS and WhatsApp require connected services.</p>
        <p>The combined estimate adds the CRM list-price calculation to the separate Campaigns quote you enter. Use matching billing periods and a before-tax AUD quote. It is not a checkout total or a discounted bundle price. Do not enter a quote that already includes CRM.</p>
        <p><a href="https://support.monday.com/hc/en-us/articles/25793455464338-monday-campaigns-plan-comparison" target="_blank" rel="noopener noreferrer">Campaigns Pro allowances ↗</a></p>
      </>}
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
