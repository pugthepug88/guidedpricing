import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import { QuoteFollowThroughScene } from "./QuoteFollowThroughScene";
import "@/styles/quote-follow-up.css";

// Prepared product story and generated editorial photography, not customer proof.
// Messages are configured; staff replies and recorded next steps are deliberate.
const FAQS = [
  [
    "Can I keep my existing quoting software?",
    "Tell us what you use. We check whether a supported connection can provide the information and starting event your follow-up needs before agreeing the setup. You can also prepare quotes in Zapla.",
  ],
  [
    "Can I choose the messages and timing?",
    "Yes. We agree the wording, SMS or email, and the waits around your sales process. A small service quote and a larger proposal may need different follow-up.",
  ],
  [
    "What happens when someone replies?",
    "Your team can read and answer the conversation in Inbox, then record the next step against the customer. Reply handling and any associated workflow actions are agreed and tested during setup.",
  ],
  [
    "What does setup include?",
    "Guided Launch covers the agreed starting event, messages, timing, connected accounts and team steps. We build and test the workflow with you. Guided Launch is required for new standard plans and priced separately. Connected messaging and usage charges are confirmed before you start.",
  ],
] as const;

function CallLink() {
  return (
    <a className="qf-button" href="/booking">
      Book a Call <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function Opening() {
  return (
    <section className="qf-opening" aria-labelledby="qf-title">
      <div className="qf-wrap qf-hero-heading">
        <div>
          <p className="qf-label">Quote follow-up</p>
          <h1 id="qf-title">
            You send the quote. <span>Zapla follows through.</span>
          </h1>
        </div>
        <div className="qf-hero-copy">
          <p>
            Keep doing what you do best. Zapla follows up by SMS or email, bringing the conversation
            back when customers have questions.
          </p>
          <div className="qf-actions">
            <CallLink />
            <a className="qf-link" href="#quote-follow-through">
              See it unfold <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="qf-hero-visual">
        <img
          className="qf-hero-photo"
          src="/concept/quote-follow-up/consultation-hero-20261028.webp"
          alt="A business owner talking through a project with a client in a bright studio"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div
          className="qf-hero-cue"
          aria-label="A configured SMS follows up with Emma two days after the quote"
        >
          <div className="qf-cue-context">
            <span>Quote sent to Emma</span>
            <span>2 days later</span>
          </div>
          <div className="qf-cue-message">
            <ZaplaPetal size={28} />
            <div>
              <span>Zapla · SMS follow-up</span>
              <p>Hi Emma, any questions about the quote? Happy to talk through the options.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LaunchAndQuestions() {
  return (
    <section className="qf-launch" aria-labelledby="qf-launch-title">
      <div className="qf-wrap qf-launch-grid">
        <header className="qf-launch-copy">
          <ZaplaPetal size={44} />
          <p className="qf-label">Guided Launch</p>
          <h2 id="qf-launch-title">
            Your process. <span>Our help making it happen.</span>
          </h2>
          <p>
            Bring the way you quote today. We map the messages, timing and team steps, then build
            and test the agreed follow-up with you.
          </p>
          <a className="qf-link" href="/Pricing-v3">
            See plans and setup <ArrowRight size={16} aria-hidden="true" />
          </a>
          <p className="qf-terms">
            Guided Launch is required for new standard plans and priced separately. Connected
            messaging and usage charges may apply.
          </p>
        </header>
        <div className="qf-faq">
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
          <a className="qf-link qf-quote-tools" href="/features/quotes-invoices-signatures">
            Explore the quoting tools <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function QuoteFollowUpPage() {
  return (
    <main className="zapla-quote-follow-up" data-page="quote-follow-up">
      <Opening />
      <QuoteFollowThroughScene />
      <LaunchAndQuestions />
      <section className="qf-final" aria-labelledby="qf-final-title">
        <div className="qf-wrap">
          <p className="qf-label">You lead. Zapla follows through.</p>
          <h2 id="qf-final-title">
            Give your next quote <span>a follow-through plan.</span>
          </h2>
          <p>Let’s map the follow-up your business needs.</p>
          <CallLink />
          <a className="qf-link qf-broader-link" href="/follow-up">
            Explore follow-up across your business <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
