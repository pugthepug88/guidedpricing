import { useState } from 'react';
import { keapContactBands, keapMonthly } from './keap-pricing';

export function KeapPricing() {
  const [users, setUsers] = useState('2');
  const [contacts, setContacts] = useState(1500);
  const [annual, setAnnual] = useState(false);
  const price = keapMonthly(Number(users), contacts, annual);
  return <div className="keap-pricing" data-billing={annual ? 'annual' : 'monthly'}>
    <div className="keap-controls">
      <div><label htmlFor="keap-users">People needing CRM access</label><input id="keap-users" type="number" min="1" step="1" value={users} onChange={event => setUsers(event.target.value)} /><input aria-label="Adjust people needing CRM access" type="range" min="1" max="50" value={Math.min(50, Math.max(1, Number(users) || 1))} onChange={event => setUsers(event.target.value)} /></div>
      <div><label htmlFor="keap-contacts">Keap contact allowance</label><select id="keap-contacts" value={contacts} onChange={event => setContacts(Number(event.target.value))}>{keapContactBands.map(band => <option value={band.contacts} key={band.contacts}>{band.contacts.toLocaleString('en-AU')} contacts</option>)}<option value={0}>Larger / custom allowance</option></select></div>
    </div>
    <p className="keap-fineprint">Keap’s starting package includes two users, even when only one person needs access.</p>
    <fieldset className="keap-billing"><legend>Keap billing</legend><label><input type="radio" name="keap-billing" checked={!annual} onChange={() => setAnnual(false)} />Monthly payments</label><label><input type="radio" name="keap-billing" checked={annual} onChange={() => setAnnual(true)} />Annual quote</label></fieldset>
    <div className="keap-results" aria-live="polite" aria-atomic="true">
      <article><h3>Zapla Follow-Through</h3><p className="keap-price">A$399<span>/month + GST</span></p><p>Unlimited users and stored contacts, subject to fair use.</p><p>Billed monthly.</p></article>
      <article><h3>Keap Full platform</h3>{price === null ? <p className="keap-quote">{annual ? 'Request an annual quote for this configuration' : 'Current Keap quote required'}</p> : <><p className="keap-price" data-keap-total>US${price.toLocaleString('en-AU')}<span>/month before applicable taxes</span></p><p>{Math.max(2, Number(users))} users · {contacts.toLocaleString('en-AU')} contacts</p><p>Published monthly subscription.</p></>}<a href="https://keap.com/pricing" target="_blank" rel="noopener noreferrer">See Keap pricing ↗</a></article>
    </div>
    {annual && <p className="keap-fineprint">Keap also advertises a US$2,988 annual reference for two users and 1,500 contacts. Confirm the current offer and terms with Keap.</p>}
    <p className="keap-fineprint">Different currencies: Keap prices are in US dollars before applicable taxes; Zapla prices are in Australian dollars excluding GST. No currency conversion or savings calculation is applied. Usage, connected services and setup are separate.</p>
    <p className="keap-fineprint"><strong>Required setup:</strong> Zapla Follow-Through Guided Launch from A$1,997 + GST. Keap’s standard implementation page currently advertises a one-time US$500 package. Promotional offers and setup scopes differ.</p>
    <p className="keap-fineprint">Keap’s published terms specify an initial six-month minimum unless otherwise agreed in writing. Confirm Australian renewal and cancellation terms in your order. Zapla’s standard software subscription is month-to-month after launch.</p>
    <details className="cc-cost-examples"><summary>Subscription totals &amp; plan details</summary>
      <h3>Which Keap package is compared?</h3><p>Keap’s current full platform, with the selected user count and contact allowance. No calling provider, WhatsApp service or other hypothetical subscription is added.</p>
      <p>Monthly calculation: the selected contact allowance includes two users, plus US$39/month for each additional user.</p>
      <h3>Are cheaper Keap offers available?</h3><p>Keap advertises partner offers, including US$199/month or US$1,997/year for two users and 2,500 contacts, with different implementation offers. Eligibility, renewal pricing and order terms apply. Compare your actual Keap offer before deciding.</p>
      <h3>How are larger configurations handled?</h3><p>Select a published contact allowance. Larger requirements and annual configurations require a current quote. Calculator controls are comparison boundaries, not software capacity limits.</p>
    </details>
  </div>;
}
