import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { QuoteFollowJourney, ZaplaJourneyMark, QUOTE_FOLLOW_SMS } from "./QuoteFollowJourney";
import "@/styles/quote-follow-up.css";
import "@/styles/quote-follow-dna.css";

function CallLink() {
  return (
    <a className="qf-button" href="/booking">
      Book a Call
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}
function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="qf-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
// Prepared explanatory records, not customer testimonials or executed workflows.
function QuoteOverview() {
  return (
    <div
      className="qf-hero-art"
      aria-label="Quote Q-1042 connects to a configured check-in two days later"
    >
      <article className="qf-art-quote">
        <div className="qf-art-quote-head">
          <span>Quote Q-1042</span>
          <span>Sent</span>
        </div>
        <h2>
          Brand &amp; website
          <br />
          proposal
        </h2>
        <p>Emma Wilson</p>
        <div className="qf-art-scope">
          Brand identity<span>Website launch</span>
        </div>
      </article>
      <div className="qf-art-wait">
        <span>Quote Sent</span>
        <strong>2 days later</strong>
      </div>
      <article className="qf-art-message">
        <div className="qf-art-message-head">
          <img src="/concept/zapla-logo-dark.svg" width="78" height="23" alt="Zapla" />
          <span>SMS to Emma</span>
        </div>
        <p>{QUOTE_FOLLOW_SMS}</p>
        <div className="qf-art-message-foot">A check-in connected to the quote.</div>
      </article>
    </div>
  );
}
function Opening() {
  return (
    <section className="qf-opening" aria-labelledby="qf-title">
      <div className="qf-wrap qf-hero-grid">
        <div className="qf-hero-copy">
          <p className="qf-label">Quote follow-up</p>
          <h1 id="qf-title">
            You send
            <br /> the quote.{" "}
            <span>
              Zapla follows
              <br /> through.
            </span>
          </h1>
          <p className="qf-hero-lead">
            Follow up automatically by SMS or email. Keep replies in view and give your team the
            context to take the next step.
          </p>
          <div className="qf-actions">
            <CallLink />
            <a className="qf-link" href="#quote-follow-through">
              Explore the follow-up
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <QuoteOverview />
      </div>
      <div className="qf-wrap qf-opening-foot">
        <span>From the quote to the conversation.</span>
        <p>Your messages. Your timing. The customer context stays connected.</p>
      </div>
    </section>
  );
}
function HumanContext() {
  return (
    <section className="qf-human" aria-labelledby="qf-human-title">
      <div className="qf-wrap qf-human-grid">
        <header>
          <p className="qf-label">You lead.</p>
          <h2 id="qf-human-title">
            Stay with
            <br /> the work.
          </h2>
          <p>Meeting the next client. Working through a brief. Doing the job you quoted for.</p>
          <p>
            A configured check-in can go out while you focus. Your team brings the expertise when a
            customer needs a decision.
          </p>
          <span className="qf-human-signoff">Zapla follows through.</span>
        </header>
        <figure>
          <img
            src="/concept/quote-follow-up/consultation-hero-20261028.webp"
            alt="A business owner and client talking through a creative project"
            width="1536"
            height="1024"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
function GuidedLaunch() {
  return (
    <section className="qf-adoption" aria-labelledby="qf-launch-title">
      <div className="qf-wrap qf-adoption-grid">
        <div className="qf-adoption-copy">
          <p className="qf-label">Your process. Our help making it happen.</p>
          <h2 id="qf-launch-title">
            Built around
            <br /> the way you quote.
          </h2>
          <p>
            We look at how your business works today, then agree the messages, timing and team steps
            your follow-up needs.
          </p>
          <div className="qf-fit-option">
            <h3>Quote in Zapla.</h3>
            <p>
              Prepare the proposal and use the Quote Sent event to start the configured follow-up.
            </p>
            <TextLink href="/features/quotes-invoices-signatures">See the quoting tools</TextLink>
          </div>
          <div className="qf-fit-option">
            <h3>Bring your existing tool.</h3>
            <p>
              We check whether a supported connection can supply the event and customer information
              before agreeing the setup.
            </p>
          </div>
        </div>
        <div className="qf-launch-canvas">
          <article className="qf-launch-plan">
            <header>
              <ZaplaJourneyMark className="qf-launch-mark" />
              <div>
                <p className="qf-label">Guided Launch</p>
                <h3>Your follow-up plan</h3>
              </div>
            </header>
            <dl>
              <div>
                <dt>The starting point</dt>
                <dd>Which quotes enter and what customer details are needed.</dd>
              </div>
              <div>
                <dt>The follow-up</dt>
                <dd>
                  Your wording, sender, channel and waits, with the relevant accounts connected.
                </dd>
              </div>
              <div>
                <dt>The team’s part</dt>
                <dd>Where replies are read, how people respond and what happens next.</dd>
              </div>
              <div>
                <dt>The checks before activation</dt>
                <dd>Review and test the agreed flow, including reply and exit handling.</dd>
              </div>
            </dl>
            <TextLink href="/Pricing-v3">See plans and setup</TextLink>
          </article>
          <p className="qf-terms">
            Guided Launch is required for new standard plans and priced separately. Connected
            messaging and usage charges may apply.
          </p>
        </div>
      </div>
    </section>
  );
}
const FAQS = [
  [
    "Can I send more than one follow-up?",
    "Yes. We can agree a sequence of messages and waits for your quote process. The wording, timing and reply and exit rules are configured and tested before activation.",
  ],
  [
    "Can I choose the messages and timing?",
    "Yes. Choose the wording, sender, SMS or email, and the waits around your sales process. A small estimate and a larger proposal may need different follow-up. The sequence on this page lets you explore those choices.",
  ],
  [
    "What happens when a customer replies?",
    "Your team can read and answer the original conversation in Inbox and record the next step against the customer. Questions about scope, price or timing remain decisions for your team.",
  ],
  [
    "Will messages stop when someone replies?",
    "We agree the reply and exit rules for your workflow, then configure and test them during Guided Launch. The handling depends on the starting event and sequence.",
  ],
  [
    "Can I see what the workflow did?",
    "Automation run history provides per-run and per-step results, timing and error details. It helps your team review execution and investigate an issue.",
  ],
  [
    "What costs extra?",
    "Guided Launch is required for new standard plans and priced separately from the subscription. Connected SMS, email and other usage charges may apply. We confirm the agreed setup scope and applicable costs before you start.",
  ],
] as const;
function Questions() {
  return (
    <section className="qf-questions qf-section" aria-labelledby="qf-questions-title">
      <div className="qf-wrap qf-questions-grid">
        <header>
          <p className="qf-label">A few practical questions</p>
          <h2 id="qf-questions-title">
            Before you
            <br />
            take the next step.
          </h2>
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
        </div>
      </div>
    </section>
  );
}
export function QuoteFollowUpPage() {
  return (
    <main className="zapla-quote-follow-up" data-page="quote-follow-up">
      <Opening />
      <QuoteFollowJourney />
      <HumanContext />
      <GuidedLaunch />
      <Questions />
      <section className="qf-final" aria-labelledby="qf-final-title">
        <div className="qf-wrap">
          <p className="qf-label">You lead. Zapla follows through.</p>
          <h2 id="qf-final-title">
            Let’s map what happens
            <br />
            after your next quote.
          </h2>
          <p>
            Bring your current quoting process. We’ll work through where follow-up starts, what
            customers should receive and where your team steps in.
          </p>
          <CallLink />
          <TextLink href="/follow-up">Explore follow-up across your business</TextLink>
        </div>
      </section>
    </main>
  );
}
