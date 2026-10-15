/** A static illustration of documented CRM/inbox capabilities, not a product capture. */
export function CustomerContextVisual() {
  return <figure className="cc-context-visual" aria-labelledby="cc-context-caption">
    <div className="cc-context-window">
      <div className="cc-context-header"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={82} height={24} /><span>Customer record</span></div>
      <div className="cc-context-body">
        <div className="cc-context-profile">
          <span className="cc-context-avatar" aria-hidden="true" />
          <p className="cc-context-name">Mia Thompson</p>
          <dl><div><dt>Enquiry</dt><dd>Website form</dd></div><div><dt>Quote</dt><dd>Sent by email</dd></div><div><dt>Owner</dt><dd>Ben Walker</dd></div></dl>
        </div>
        <div className="cc-context-conversation">
          <p className="cc-context-title">Conversation</p>
          <div className="cc-context-message cc-context-message--sent"><p className="cc-context-sender">Automated quote follow-up</p><p>Hi Mia, did you have any questions about the quote?</p></div>
          <div className="cc-context-message cc-context-message--reply"><p className="cc-context-sender">Mia replied</p><p>Can we book a time to discuss it?</p></div>
          <p className="cc-context-handoff">Your team sees the reply with the enquiry and quote history.</p>
        </div>
      </div>
    </div>
    <figcaption id="cc-context-caption">Illustrative customer record and messages. Configuration varies.</figcaption>
  </figure>;
}
