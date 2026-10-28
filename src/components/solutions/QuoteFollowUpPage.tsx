import { ArrowRight, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/quote-follow-up.css";

// Prepared story, not a customer testimonial or a live workflow. Emma is the
// same existing customer throughout. Alex's reply and next step are deliberate
// staff actions. No automatic pause, acceptance or won work is implied.
const FAQS = [
  [
    "Can I keep my existing quoting software?",
    "Tell us what you use. We check whether a supported connection can provide the information and events your follow-up needs before agreeing the setup. You can also prepare quotes in Zapla.",
  ],
  [
    "Can I choose the messages and timing?",
    "Yes. We agree the wording, channel and wait between messages around your sales process. A small service quote and a larger project proposal may need different follow-up.",
  ],
  [
    "What happens when a customer replies?",
    "Your team can read and answer the conversation in Inbox, then record the next step against the customer. Reply handling and any associated workflow actions are agreed and tested during setup.",
  ],
  [
    "What kinds of businesses is this for?",
    "Businesses where a quote, estimate or proposal needs a considered decision. That includes project work, professional services and quoted services. The process is built around how your customers buy, rather than one industry.",
  ],
  [
    "Can it follow up on older opportunities too?",
    "This page focuses on current quotes awaiting a decision. Reactivation is for older opportunities or customers you want to reconnect with. The broader Follow-Up solution also covers enquiries, bookings and repeat business.",
  ],
  [
    "What does setup include?",
    "Guided Launch covers the agreed starting event, messages, timing, connected accounts and team steps. We build and test that workflow with you. Guided Launch is required for new standard plans and priced separately; connected messaging and usage charges are confirmed before you start.",
  ],
] as const;

function CallLink() {
  return (
    <a className="qf-button" href="/booking">
      Book a Call <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function QuoteStory() {
  return (
    <div
      className="qf-story"
      id="quote-follow-through"
      aria-label="A quote, its timed follow-up and the customer's reply"
    >
      <div className="qf-quote">
        <p className="qf-label">Your quote</p>
        <div className="qf-quote-detail">
          <p>Prepared for Emma Wilson</p>
          <h2>Project proposal</h2>
        </div>
        <div className="qf-quote-state">
          <span>Quote sent</span>
          <ArrowRight size={22} aria-hidden="true" />
        </div>
      </div>
      <div className="qf-follow-through">
        <div className="qf-message-heading">
          <span className="qf-message-brand">
            <ZaplaPetal size={29} /> Zapla follows through
          </span>
          <span>Two days later · SMS</span>
        </div>
        <div className="qf-outgoing">
          <p>Hi Emma, any questions about the quote? Happy to talk through the options.</p>
          <span>— Alex</span>
        </div>
        <div className="qf-incoming">
          <span>Emma</span>
          <p>Could we split the work into two stages?</p>
        </div>
      </div>
    </div>
  );
}

function Opening() {
  return (
    <section className="qf-opening" aria-labelledby="qf-title">
      <div className="qf-wrap">
        <header className="qf-hero-heading">
          <p className="qf-label">Quote follow-up</p>
          <h1 id="qf-title">
            You send the quote. <span>Zapla follows through.</span>
          </h1>
          <p className="qf-hero-description">
            Automate quote follow-up by SMS or email. Keep replies with the customer, ready for your
            team to move the decision forward.
          </p>
          <div className="qf-actions">
            <CallLink />
            <a className="qf-link" href="#quote-follow-through">
              See how it works <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </header>
        <QuoteStory />
      </div>
    </section>
  );
}

function Conversation() {
  return (
    <section className="qf-section qf-conversation-section" aria-labelledby="qf-conversation-title">
      <div className="qf-wrap qf-conversation-layout">
        <header className="qf-section-copy">
          <p className="qf-label">When they reply</p>
          <h2 id="qf-conversation-title">Answer the question. Move the quote forward.</h2>
          <p>
            A change to the scope. A question about timing. A different option. Give your team the
            conversation and customer context to help them decide.
          </p>
          <a className="qf-link" href="/features/unified-inbox">
            Explore Unified Inbox <ArrowRight size={16} aria-hidden="true" />
          </a>
        </header>
        <article
          className="qf-inbox"
          aria-label="Alex reads Emma's question, replies and records a next step"
        >
          <div className="qf-inbox-heading">
            <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="89" height="28" />
            <span>Inbox</span>
          </div>
          <header className="qf-person">
            <div>
              <h3>Emma Wilson</h3>
              <p>Project proposal</p>
            </div>
            <span>SMS</span>
          </header>
          <div className="qf-thread">
            <div className="qf-customer-message">
              <span className="qf-sr-only">Emma: </span>
              <p>Could we split the work into two stages?</p>
            </div>
            <div className="qf-team-reply">
              <p className="qf-speaker">Alex · Your team</p>
              <div className="qf-team-message">
                <p>Let me review the scope and send you the options.</p>
              </div>
            </div>
          </div>
          <div className="qf-team-note">
            <span>Alex’s next step</span>
            <p>Prepare a staged quote</p>
          </div>
        </article>
      </div>
      <div className="qf-wrap qf-context-line">
        <p>Keep the decision and the next step with the customer.</p>
        <a className="qf-link" href="/features/pipeline-management">
          See Pipeline Management <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Setup() {
  return (
    <section className="qf-section qf-setup-section" aria-labelledby="qf-setup-title">
      <div className="qf-wrap qf-setup">
        <div className="qf-setup-copy">
          <p className="qf-label">Guided Launch</p>
          <h2 id="qf-setup-title">Built around how you win work.</h2>
          <p>
            Bring your quoting process. We map the follow-up, build the agreed workflow and test it
            with you.
          </p>
          <a className="qf-link" href="/Pricing-v3">
            See plans and setup <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="qf-setup-detail">
          <dl>
            <div>
              <dt>The right starting point</dt>
              <dd>
                Agree how a quote enters follow-up, using the tools and process you work with.
              </dd>
            </div>
            <div>
              <dt>A useful message, at the right time</dt>
              <dd>Choose the wording, SMS or email, and the wait between follow-ups.</dd>
            </div>
            <div>
              <dt>A clear role for your team</dt>
              <dd>Plan how replies are handled and what your team records or does next.</dd>
            </div>
          </dl>
          <p className="qf-terms">
            Guided Launch is required for new standard plans and priced separately. Connected
            messaging and usage charges may apply.
          </p>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section className="qf-section qf-questions" aria-labelledby="qf-questions-title">
      <div className="qf-wrap qf-questions-layout">
        <header className="qf-section-copy">
          <p className="qf-label">A few practical questions</p>
          <h2 id="qf-questions-title">Make it fit your business.</h2>
          <a className="qf-link" href="/features/quotes-invoices-signatures">
            Explore the quoting tools <ArrowRight size={16} aria-hidden="true" />
          </a>
        </header>
        <div className="qf-faq">
          {FAQS.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteFollowUpPage() {
  return (
    <main className="zapla-quote-follow-up" data-page="quote-follow-up">
      <Opening />
      <Conversation />
      <Setup />
      <Questions />
      <section className="qf-final" aria-labelledby="qf-final-title">
        <div className="qf-wrap">
          <div className="qf-final-petal" aria-hidden="true">
            <ZaplaPetal size={37} />
          </div>
          <h2 id="qf-final-title">
            You lead. <span>Zapla follows through.</span>
          </h2>
          <p>
            Bring your quoting process. We’ll show you where Zapla can take the follow-up off your
            plate.
          </p>
          <CallLink />
          <a className="qf-link qf-broader-link" href="/follow-up">
            Explore follow-up across your business <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
