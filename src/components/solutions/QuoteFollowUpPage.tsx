import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import { QuoteFollowJourney, ZaplaJourneyMark, QUOTE_FOLLOW_SMS } from "./QuoteFollowJourney";
import "@/styles/quote-follow-up.css";

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
// Prepared explanatory records, not a customer testimonial or executed workflow.
function QuoteOverview() {
  return (
    <div
      className="qf-overview"
      aria-label="Emma’s proposal and the configured check-in that follows it"
    >
      <figure className="qf-overview-photo">
        <img
          src="/concept/quote-follow-up/consultation-hero-20261028.webp"
          alt="A business owner and client discussing a project in a bright studio"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
      </figure>
      <div className="qf-hero-process">
        <div className="qf-hero-customer">
          <span>Emma Wilson</span>
          <span>Quote Q-1042</span>
        </div>
        <h2>Brand &amp; website proposal</h2>
        <p className="qf-hero-scope">Brand identity · Website launch</p>
        <div className="qf-hero-event">
          <span>Quote Sent</span>
          <span aria-hidden="true">→</span>
          <ZaplaJourneyMark className="qf-hero-mark" />
          <span>Wait 2 days</span>
          <span aria-hidden="true">→</span>
          <span>SMS</span>
        </div>
        <div className="qf-hero-message">
          <span>Configured check-in to Emma</span>
          <p>{QUOTE_FOLLOW_SMS}</p>
        </div>
        <p className="qf-hero-payoff">A message with context. A way to keep talking.</p>
      </div>
    </div>
  );
}
function Opening() {
  return (
    <section className="qf-opening" aria-labelledby="qf-title">
      <div className="qf-wrap">
        <div className="qf-hero-heading">
          <div>
            <p className="qf-label">Quote follow-up</p>
            <h1 id="qf-title">
              You send the quote.<span>Zapla follows through.</span>
            </h1>
          </div>
          <div className="qf-hero-copy">
            <p>
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
        </div>
        <QuoteOverview />
        <div className="qf-opening-foot">
          <span>From the quote to the conversation.</span>
          <p>
            Configured messages and timing. Customer replies in view. A team that knows the context.
          </p>
        </div>
      </div>
    </section>
  );
}
const tools = [
  {
    name: "Quotes",
    purpose: "Start with the work you’ve proposed.",
    detail: "Prepare the quote against the customer, with its scope, terms and status.",
    href: "/features/quotes-invoices-signatures",
    action: "Explore quoting",
  },
  {
    name: "Automation",
    purpose: "Give the follow-up a process.",
    detail:
      "Connect the event, waits and messages. Review run and step details when you need to investigate.",
    href: "/features/automation-builder",
    action: "Explore automation",
  },
  {
    name: "Inbox & CRM",
    purpose: "Keep the conversation connected.",
    detail: "Read the customer’s original words, reply with context and record the next step.",
    href: "/features/unified-inbox",
    action: "Explore Inbox",
  },
];
function ConnectedTools() {
  return (
    <section className="qf-tools qf-section" aria-labelledby="qf-tools-title">
      <div className="qf-wrap">
        <header className="qf-section-heading">
          <div>
            <p className="qf-label">The tools behind the follow-through</p>
            <h2 id="qf-tools-title">
              More of the process.
              <br />
              In one place.
            </h2>
          </div>
          <p>
            The message is one moment. Quotes, workflows and customer conversations give your team
            the context around it.
          </p>
        </header>
        <div className="qf-tool-list">
          {tools.map((tool) => (
            <article key={tool.name}>
              <h3>{tool.name}</h3>
              <div>
                <h4>{tool.purpose}</h4>
                <p>{tool.detail}</p>
              </div>
              <TextLink href={tool.href}>{tool.action}</TextLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProcessFit() {
  return (
    <section className="qf-fit qf-section" aria-labelledby="qf-fit-title">
      <div className="qf-wrap">
        <header className="qf-section-heading">
          <div>
            <p className="qf-label">Your quoting process</p>
            <h2 id="qf-fit-title">
              Start where
              <br />
              your business is.
            </h2>
          </div>
          <p>
            We look at how you quote today and agree how the follow-up should connect before
            building the workflow.
          </p>
        </header>
        <div className="qf-fit-options">
          <article>
            <h3>Quote in Zapla.</h3>
            <p>
              Prepare the proposal and use the Quote Sent event to start the configured follow-up.
            </p>
            <TextLink href="/features/quotes-invoices-signatures">See the quoting tools</TextLink>
          </article>
          <article>
            <h3>Already have a quoting tool?</h3>
            <p>
              Bring it to the conversation. We check whether a supported connection can provide the
              event and customer information the follow-up needs.
            </p>
            <span className="qf-fit-detail">Compatibility is checked before setup is agreed.</span>
          </article>
        </div>
      </div>
    </section>
  );
}
function GuidedLaunch() {
  return (
    <section className="qf-launch qf-section" aria-labelledby="qf-launch-title">
      <div className="qf-wrap qf-launch-panel">
        <div className="qf-launch-copy">
          <ZaplaJourneyMark className="qf-launch-mark" />
          <p className="qf-label">Guided Launch</p>
          <h2 id="qf-launch-title">
            A process on paper.
            <br />A setup you can use.
          </h2>
          <p>
            We help turn the way you want to follow up into the agreed workflow, messages and team
            steps.
          </p>
          <TextLink href="/Pricing-v3">See plans and setup</TextLink>
        </div>
        <div className="qf-launch-deliverables">
          <h3>What we work through with you</h3>
          <dl>
            <div>
              <dt>The starting point</dt>
              <dd>
                Which quotes enter, which event starts the process and what customer details are
                needed.
              </dd>
            </div>
            <div>
              <dt>The follow-up</dt>
              <dd>
                Your wording, sender, channel and waits, with the relevant accounts connected.
              </dd>
            </div>
            <div>
              <dt>The team’s part</dt>
              <dd>Where replies are read, how people respond and what should happen next.</dd>
            </div>
            <div>
              <dt>The checks before activation</dt>
              <dd>
                Review and test the agreed flow, including reply and exit handling, before it goes
                live.
              </dd>
            </div>
          </dl>
        </div>
        <p className="qf-terms">
          Guided Launch is required for new standard plans and priced separately. Connected
          messaging and usage charges may apply.
        </p>
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
      <ConnectedTools />
      <ProcessFit />
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
