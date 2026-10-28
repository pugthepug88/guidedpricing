import { ArrowRight, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/quote-follow-up.css";

// Prepared customer story, not a live quote, sent message or customer testimonial.
// Staff actions are deliberate. No automatic reply detection, pause or acceptance is implied.
const FAQS = [
  [
    "Can I keep my existing quoting software?",
    "Tell us what you use today. We check whether a supported connection can provide the information and events needed before agreeing your follow-up setup. You can also prepare quotes in Zapla.",
  ],
  [
    "Can I choose the timing and wording?",
    "Yes. Set the message, channel and waits around your sales process. A considered renovation needs a different approach from a small repair. We agree the sequence with you during setup.",
  ],
  [
    "What happens when a customer replies?",
    "Their conversation is available in Inbox for your team to read and answer. We agree any associated workflow actions during setup. Your team handles the question and records the quote decision.",
  ],
  [
    "Is this useful outside the trades?",
    "Yes. It suits businesses where customers take time to consider a proposal and a useful follow-up can help them decide. It is less important when the job is agreed immediately or your existing system already handles the process well.",
  ],
  [
    "What about quotes that have gone cold?",
    "Quote Follow-Up is for current quoted work that still needs a decision. Reactivation is for older opportunities or customers you want to reconnect with later.",
  ],
  [
    "What does setup cost?",
    "Guided Launch is required for new standard plans and priced separately. We agree your workflow and confirm any connected messaging or usage charges before you start. The Pricing page sets out the plans and launch options.",
  ],
] as const;

function CallLink() {
  return (
    <a className="qf-button" href="/booking">
      Book a Call <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

function Opening() {
  return (
    <section className="qf-opening" aria-labelledby="qf-title">
      <div className="qf-wrap">
        <header className="qf-hero-heading">
          <div>
            <p className="qf-label">Quote Follow-Up</p>
            <h1 id="qf-title">
              Send the quote.
              <br />
              <span>Follow through.</span>
            </h1>
          </div>
          <div className="qf-hero-copy">
            <p>
              Automate your quote follow-up by SMS or email. Keep replies in view so your team can
              answer questions and move the job forward.
            </p>
            <div className="qf-actions">
              <CallLink />
              <a className="qf-link" href="#quote-conversation">
                See how it works <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>
        <div className="qf-hero-scene">
          <figure className="qf-work-photo">
            <img
              src="/concept/quote-follow-up/cabinetry-workshop-20261028.webp"
              alt="A cabinetmaker and her colleague checking cabinet doors in their workshop"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
          </figure>
          <div
            className="qf-follow-up"
            aria-label="Emma’s cabinetry quote and its configured SMS follow-up"
          >
            <div className="qf-quote-context">
              <p className="qf-label">Quote sent</p>
              <h2>Kitchen cabinetry</h2>
              <p>Prepared for Emma Wilson</p>
            </div>
            <div className="qf-timed-message">
              <p className="qf-message-timing">Two days later · SMS</p>
              <div className="qf-message-brand">
                <ZaplaPetal size={23} />
                <span>Your follow-up</span>
              </div>
              <p className="qf-opening-message">
                Hi Emma, any questions about the kitchen quote? Happy to talk through the options.
                <span>— Alex</span>
              </p>
            </div>
            <a className="qf-link" href="#quote-conversation">
              The conversation continues <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Conversation() {
  return (
    <section
      className="qf-section qf-conversation-section"
      id="quote-conversation"
      aria-labelledby="qf-conversation-title"
    >
      <div className="qf-wrap qf-conversation-layout">
        <div className="qf-section-copy">
          <p className="qf-label">When they reply</p>
          <h2 id="qf-conversation-title">Get to the question behind the hesitation.</h2>
          <p>
            A customer may need a change to the scope, a detail explained or more time to decide.
            Keep the conversation in Inbox so your team can pick it up and help.
          </p>
          <a className="qf-link" href="/features/unified-inbox">
            Explore Unified Inbox <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="qf-inbox-stage">
          <article
            className="qf-conversation"
            aria-label="Emma asks about changing the scope; Alex replies from the team"
          >
            <div className="qf-inbox-brand">
              <img src="/concept/zapla-logo-dark.svg" width="84" height="26" alt="Zapla" />
              <span>Inbox</span>
            </div>
            <header className="qf-person">
              <div>
                <h3>Emma Wilson</h3>
                <p>Kitchen cabinetry</p>
              </div>
              <span>SMS</span>
            </header>
            <div className="qf-thread">
              <div className="qf-message qf-previous-message">
                <p>Any questions about the kitchen quote? Happy to talk through the options.</p>
              </div>
              <div className="qf-message qf-customer-message">
                <span className="qf-sr-only">Emma: </span>
                <p>Could we keep the benchtop and just replace the cabinets?</p>
              </div>
              <div className="qf-team-reply">
                <p className="qf-speaker">Alex · Your team</p>
                <div className="qf-message qf-team-message">
                  <p>Let me check the measurements and update the scope for you.</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const QUOTED_WORK = [
  {
    name: "Emma Wilson",
    work: "Kitchen cabinetry",
    state: "Question received",
    next: "Review the requested change",
    context: "Keep the existing benchtop",
  },
  {
    name: "Noah Taylor",
    work: "Laundry fit-out",
    state: "Considering the quote",
    next: "Check in on Friday",
    context: "Give them time to compare options",
  },
  {
    name: "Mia Thompson",
    work: "Built-in wardrobes",
    state: "Ready to proceed",
    next: "Confirm the final scope",
    context: "Team to agree the details with Mia",
  },
] as const;

function QuoteQueue() {
  return (
    <section className="qf-section qf-queue-section" aria-labelledby="qf-queue-title">
      <div className="qf-wrap">
        <header className="qf-queue-heading">
          <div>
            <p className="qf-label">Keep the work in view</p>
            <h2 id="qf-queue-title">Know which quotes need your attention.</h2>
          </div>
          <p>
            Keep customer notes and an agreed next step with each quoted job in CRM. Your team can
            see what needs a reply, what needs time and what is ready to discuss.
          </p>
        </header>
        <div className="qf-queue">
          <div className="qf-queue-columns" aria-hidden="true">
            <span>Quoted work</span>
            <span>Where it stands</span>
            <span>Your team’s next step</span>
          </div>
          <ul aria-label="Quoted work and next steps recorded by the team">
            {QUOTED_WORK.map((quote) => (
              <li key={quote.name}>
                <div className="qf-queue-customer">
                  <strong>{quote.name}</strong>
                  <span>{quote.work}</span>
                </div>
                <div className="qf-queue-state">
                  <span className="qf-mobile-label">Where it stands</span>
                  <p>{quote.state}</p>
                </div>
                <div className="qf-queue-next">
                  <span className="qf-mobile-label">Your team’s next step</span>
                  <strong>{quote.next}</strong>
                  <span>{quote.context}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <a className="qf-link qf-queue-link" href="/features/pipeline-management">
          See Pipeline Management <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function Setup() {
  return (
    <section className="qf-section qf-setup" aria-labelledby="qf-setup-title">
      <div className="qf-wrap qf-setup-layout">
        <div className="qf-section-copy qf-setup-copy">
          <p className="qf-label">Guided Launch</p>
          <h2 id="qf-setup-title">Your quotes. Your way of following up.</h2>
          <p>
            We agree when follow-up starts, what gets sent and where your team steps in. Then we
            build and test the sequence with you.
          </p>
          <ul className="qf-setup-list">
            <li>Your message wording and channel</li>
            <li>The wait between follow-ups</li>
            <li>The actions your team needs to take</li>
          </ul>
          <p className="qf-setup-terms">
            Guided Launch is required for new standard plans and priced separately.
          </p>
          <a className="qf-link" href="/Pricing-v3">
            Plans and setup <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="qf-faq" aria-label="Questions about quote follow-up">
          {FAQS.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={19} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="qf-wrap qf-related">
        <p>Need the quoting tools too?</p>
        <a className="qf-link" href="/features/quotes-invoices-signatures">
          Quotes, Invoices &amp; Signatures <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function QuoteFollowUpPage() {
  return (
    <main className="zapla-quote-follow-up" data-page="quote-follow-up">
      <Opening />
      <Conversation />
      <QuoteQueue />
      <Setup />
      <section className="qf-final" aria-labelledby="qf-final-title">
        <div className="qf-wrap">
          <div className="qf-final-petal" aria-hidden="true">
            <ZaplaPetal size={31} />
          </div>
          <h2 id="qf-final-title">
            Bring a quote.
            <br />
            We’ll map the follow-up.
          </h2>
          <p>See the messages, timing and team steps your process needs.</p>
          <CallLink />
        </div>
      </section>
    </main>
  );
}
