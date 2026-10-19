/** A static illustration of documented CRM/inbox capabilities, not a product capture. */
export function CustomerContextVisual({ variant }: { variant?: 'missed-call' } = {}) {
  const missed = variant === 'missed-call';
  return <figure className="cc-context-visual" aria-label="Example customer record and conversation">
    <div className="cc-context-window">
      <div className="cc-context-header"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" width={82} height={24} /><span>Customer record</span></div>
      <div className="cc-context-body">
        <div className="cc-context-profile">
          <span className="cc-context-avatar" aria-hidden="true" />
          <p className="cc-context-name">Mia Thompson</p>
          <dl><div><dt>Enquiry</dt><dd>{missed ? 'Missed call' : 'Website form'}</dd></div><div><dt>{missed ? 'Follow-up' : 'Quote'}</dt><dd>{missed ? 'Automatic text' : 'Sent by email'}</dd></div><div><dt>Owner</dt><dd>Ben Walker</dd></div></dl>
        </div>
        <div className="cc-context-conversation">
          <p className="cc-context-title">Conversation</p>
          <div className="cc-context-message cc-context-message--sent"><p className="cc-context-sender">{missed ? 'Automated missed-call text' : 'Automated quote follow-up'}</p><p>{missed ? 'Hi Mia, sorry we missed your call. How can we help?' : 'Hi Mia, did you have any questions about the quote?'}</p></div>
          <div className="cc-context-message cc-context-message--reply"><p className="cc-context-sender">Mia replied</p><p>{missed ? 'Can someone call me about a booking?' : 'Can we book a time to discuss it?'}</p></div>
          <p className="cc-context-handoff">{missed ? 'Your team sees the reply with the missed call and customer history.' : 'Your team sees the reply with the enquiry and quote history.'}</p>
        </div>
      </div>
    </div>
  </figure>;
}
