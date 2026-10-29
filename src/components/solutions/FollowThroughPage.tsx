import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import { FollowThroughTrack } from "./FollowThroughTrack";
import "@/styles/follow-through.css";

const PORTRAITS = "/concept/revenue/soft-autumn-portraits-v1.webp";

function Portrait({ cell, className = "" }: { cell: number; className?: string }) {
  return (
    <span
      className={`ft-portrait ${className}`.trim()}
      aria-hidden="true"
      style={{
        backgroundImage: `url('${PORTRAITS}')`,
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "ft-brand ft-brand--mark" : "ft-brand"}>
      <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="104" height="31" />
    </span>
  );
}

function CallLink() {
  return (
    <a className="ft-button" href="/booking">
      Book a Call <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="ft-link" href={href}>
      {children} <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}

/** Prepared customer dialogue, not a customer testimonial or executed workflow. */
function EnquiryScene() {
  return (
    <div
      className="ft-enquiry-stage"
      aria-label="Emma enquires, receives a configured booking link and makes a consultation booking"
    >
      <div className="ft-enquiry-workspace">
        <header className="ft-workspace-head">
          <Brand />
          <span>Emma’s enquiry</span>
        </header>
        <div className="ft-enquiry-body">
          <div className="ft-thread">
            <div className="ft-person-line">
              <Portrait cell={9} />
              <div>
                <strong>Emma Wilson</strong>
                <span>SMS · Project enquiry</span>
              </div>
            </div>
            <div className="ft-message ft-message--customer">
              <span>Emma</span>
              <p>Hi, I’m Emma Wilson. Can we talk about a brand and website project?</p>
            </div>
            <div className="ft-message ft-message--configured">
              <span>Automatic SMS response</span>
              <p>
                Thanks, Emma. You can choose a project consultation time through our booking link.
              </p>
            </div>
            <div className="ft-message ft-message--customer ft-message--last">
              <span>Emma</span>
              <p>I’ve booked Tuesday at 10:30 through your link.</p>
            </div>
          </div>
          <aside className="ft-booking-record" aria-label="Consultation booking made by Emma">
            <div className="ft-record-kicker">Consultation booking</div>
            <h2>
              Project <br />
              consultation
            </h2>
            <div className="ft-booking-time">
              Tuesday <span>10:30 am</span>
            </div>
            <dl>
              <div>
                <dt>Customer</dt>
                <dd>Emma Wilson</dd>
              </div>
              <div>
                <dt>Project</dt>
                <dd>Brand &amp; website</dd>
              </div>
              <div>
                <dt>Booked by</dt>
                <dd>Emma, through the booking page</dd>
              </div>
            </dl>
            <p>The original enquiry stays in Inbox.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Opening() {
  return (
    <section className="ft-opening" data-ft-waypoint aria-labelledby="ft-title">
      <span className="ft-origin" data-ft-origin aria-hidden="true" />
      <div className="ft-opening-copy" data-ft-content>
        <p className="ft-label">Customer follow-up</p>
        <h1 id="ft-title">
          You lead. <br />
          <span>Zapla follows through.</span>
        </h1>
        <p className="ft-intro">
          Automate the next check-in by SMS or email, from first enquiry to repeat business. Your
          messages, your timing, your team in control.
        </p>
        <div className="ft-actions">
          <CallLink />
          <a className="ft-link" href="#ft-booking">
            See the follow-through <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="ft-hero-wrap" data-ft-content data-ft-occluder>
        <EnquiryScene />
      </div>
      <p className="ft-opening-note">
        A useful first response. A clear way for the customer to take the next step.
      </p>
    </section>
  );
}

function QuoteScene() {
  return (
    <section
      className="ft-scene ft-quote"
      id="ft-quote"
      data-ft-waypoint
      aria-labelledby="ft-quote-title"
    >
      <div className="ft-content ft-two-column">
        <header className="ft-copy">
          <p className="ft-label">When a quote goes out</p>
          <h2 id="ft-quote-title">
            Keep the decision <br />
            in the conversation.
          </h2>
          <p>
            You’ve put the thinking into the proposal. A relevant check-in gives your customer a way
            to ask the question that comes next.
          </p>
          <p>
            A sent quote can start a timed SMS or email check-in. You choose the wording and timing;
            your team handles questions about scope, price and the next step.
          </p>
          <TextLink href="/quote-follow-up-v2">Explore Quote Follow-Up</TextLink>
        </header>
        <div className="ft-quote-stage" data-ft-cross="through" data-ft-occluder>
          <div className="ft-proposal-strip">
            <div>
              <span>Quote Q-1042 · Sent</span>
              <h3>Brand &amp; website proposal</h3>
            </div>
            <p>
              Brand identity <span>Website launch</span>
            </p>
          </div>
          <div className="ft-quote-thread">
            <div className="ft-quote-message-head">
              <Brand compact />
              <span>Configured check-in · 2 days later</span>
            </div>
            <p>
              Hi Emma, any questions about the brand identity or website stage in quote Q-1042?
              Reply here and Alex can help.
            </p>
            <div className="ft-customer-answer">
              <Portrait cell={9} />
              <p>Could we start with the brand identity?</p>
            </div>
          </div>
          <div className="ft-staff-decision">
            <Portrait cell={13} />
            <div>
              <span>Alex · Your team’s next step</span>
              <strong>Review the brand-only scope before preparing a revised quote.</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingMoment() {
  return (
    <section
      className="ft-scene ft-booking-moment"
      id="ft-booking"
      data-ft-waypoint
      aria-labelledby="ft-booking-title"
    >
      <div className="ft-content ft-booking-layout">
        <div className="ft-booking-communications">
          <div className="ft-booking-source">
            <Portrait cell={9} />
            <div>
              <span>Emma’s confirmed booking</span>
              <h3>Project consultation</h3>
            </div>
            <p>
              Tuesday <strong>10:30 am</strong>
            </p>
          </div>
          <dl className="ft-booking-messages">
            <div>
              <dt>
                <span>On booking</span>Email confirmation
              </dt>
              <dd>Your project consultation is booked for Tuesday at 10:30.</dd>
            </div>
            <div>
              <dt>
                <span>Before the visit</span>SMS reminder
              </dt>
              <dd>
                A quick reminder about your project consultation. We look forward to talking through
                your plans.
              </dd>
            </div>
          </dl>
        </div>
        <header className="ft-copy">
          <p className="ft-label">After the customer books</p>
          <h2 id="ft-booking-title">
            A clear booking. <br />A timely reminder.
          </h2>
          <p>
            Emma chooses and makes the booking. Your configured messages keep the details close,
            from confirmation to the reminder before the visit.
          </p>
          <p>Agree the wording and timing around the appointments your business offers.</p>
          <TextLink href="/features/calendars-bookings">Explore booking tools</TextLink>
        </header>
      </div>
    </section>
  );
}

function ReconnectMoment() {
  return (
    <section
      className="ft-scene ft-reconnect-moment"
      data-ft-waypoint
      aria-labelledby="ft-reconnect-title"
    >
      <div className="ft-content">
        <header className="ft-copy ft-copy--wide">
          <p className="ft-label">Later, when you choose to reconnect</p>
          <h2 id="ft-reconnect-title">
            Make the next check-in <br />
            worth replying to.
          </h2>
          <p>
            Bring past conversations into a relevant follow-up. Your business chooses who to
            contact, when to reach out and what the message should say.
          </p>
        </header>
        <div className="ft-reconnect-canvas" data-ft-cross="through" data-ft-occluder>
          <div className="ft-reconnect-customer">
            <Portrait cell={9} />
            <h3>Emma Wilson</h3>
            <dl>
              <div>
                <dt>Known interest</dt>
                <dd>Brand identity &amp; website</dd>
              </div>
              <div>
                <dt>Earlier conversation</dt>
                <dd>Asked about starting with brand identity.</dd>
              </div>
            </dl>
          </div>
          <div className="ft-reconnect-outreach">
            <div className="ft-reconnect-message">
              <Brand />
              <p>
                Hi Emma, would you like to revisit your brand and website plans? Reply here if you’d
                like to talk it through.
              </p>
            </div>
            <p className="ft-scope-note">
              A later check-in is a separate workflow. Service dates, renewals and past-customer
              outreach each need their own agreed audience and timing.
            </p>
          </div>
        </div>
        <TextLink href="/reactivation">Explore customer reactivation</TextLink>
      </div>
    </section>
  );
}

function HumanJudgment() {
  return (
    <section className="ft-scene ft-human" data-ft-waypoint aria-labelledby="ft-human-title">
      <div className="ft-content ft-human-grid">
        <figure>
          <img
            src="/concept/quote-follow-up/consultation-hero-20261028.webp"
            alt="A business owner and client working through the details of a project together"
            width="1536"
            height="1024"
            loading="lazy"
          />
        </figure>
        <header className="ft-copy">
          <p className="ft-label">You still lead.</p>
          <h2 id="ft-human-title">
            Automate the check-in. <br />
            Keep the judgment.
          </h2>
          <p>
            Timing and messages can be configured. A change of scope, a sensitive question or the
            decision to move ahead belongs with your team.
          </p>
          <p>
            The original conversation stays available alongside the customer record. People can read
            the question, respond and record what should happen next.
          </p>
          <TextLink href="/features/unified-inbox">Explore the shared Inbox</TextLink>
        </header>
      </div>
    </section>
  );
}

const QUESTIONS = [
  [
    "Which channels can we use?",
    "Configure follow-up by SMS or email, with the relevant sending accounts connected. We agree the channels and message content around your process. Messaging and other usage charges may apply.",
  ],
  [
    "Will messages stop when someone replies?",
    "We agree, configure and test reply and exit handling for your workflow before activation. Your team can read and answer the conversation in Inbox.",
  ],
  [
    "Can we keep our current tools?",
    "We check whether a supported connection can provide the event and customer information your process needs. The setup is agreed after that compatibility check.",
  ],
  [
    "Do we have to build it ourselves?",
    "We map and configure the agreed initial workflows with you through Guided Launch. Guided Launch is required for new standard plans and priced separately from the subscription. The scope and applicable costs are confirmed before you start.",
  ],
] as const;

function Setup() {
  return (
    <section className="ft-scene ft-setup" data-ft-waypoint aria-labelledby="ft-setup-title">
      <div className="ft-content ft-setup-grid">
        <header className="ft-copy">
          <p className="ft-label">Your process. A considered setup.</p>
          <h2 id="ft-setup-title">
            Follow-through <br />
            that fits your business.
          </h2>
          <p>
            Start with the gap that costs you the most attention. We map the first process with you,
            then configure and test the agreed steps before activation.
          </p>
          <dl className="ft-setup-scope">
            <div>
              <dt>The starting point</dt>
              <dd>Who enters, the event and the customer information needed.</dd>
            </div>
            <div>
              <dt>The follow-up</dt>
              <dd>Your wording, sender, channels and timing.</dd>
            </div>
            <div>
              <dt>The team’s part</dt>
              <dd>Reply and exit rules, human decisions and what gets checked.</dd>
            </div>
          </dl>
          <TextLink href="/Pricing-v3">See plans and Guided Launch</TextLink>
          <p className="ft-setup-terms">
            Guided Launch is required for new standard plans and priced separately. Connected
            messaging and usage charges may apply.
          </p>
        </header>
        <div className="ft-questions">
          <h3>A few practical questions.</h3>
          {QUESTIONS.map(([question, answer]) => (
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
    </section>
  );
}

function FinalCall() {
  return (
    <section
      className="ft-scene ft-final"
      data-ft-waypoint
      data-ft-exit
      aria-labelledby="ft-final-title"
    >
      <div className="ft-content">
        <div className="ft-final-petal" aria-hidden="true">
          <ZaplaPetal size={34} />
        </div>
        <p className="ft-label">You lead. Zapla follows through.</p>
        <h2 id="ft-final-title">
          What should happen <br />
          after your next enquiry?
        </h2>
        <p>
          Bring the follow-up you want to improve. We’ll map the starting point, the messages and
          where your team comes in.
        </p>
        <CallLink />
      </div>
    </section>
  );
}

export function FollowThroughPage() {
  return (
    <main className="zapla-follow-through" data-page="follow-up-v2">
      <FollowThroughTrack>
        <Opening />
        <div className="ft-proof">
          <BookingMoment />
          <QuoteScene />
          <ReconnectMoment />
          <HumanJudgment />
          <Setup />
          <FinalCall />
        </div>
      </FollowThroughTrack>
    </main>
  );
}
