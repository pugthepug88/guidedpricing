import { useEffect, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/automation-builder.css";

type ConditionResult = "yes" | "no";

function Avatar({ cell = 9 }: { cell?: number }) {
  return (
    <span
      className="ab-avatar"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundPosition: `${(cell % 6) * 20}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

function BookingLink({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="ab-cta" href="/booking">
      {children} <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

/** Demonstrates the documented True/False connections, not an undocumented
 * field comparator. The visitor supplies the condition result, not customer data.
 * Both configured outcomes remain readable, including before hydration.
 */
function WorkflowDemo() {
  const [result, setResult] = useState<ConditionResult>("yes");
  const [hasWait, setHasWait] = useState(true);
  const [interacted, setInteracted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="ab-branch-stage" data-result={result} data-interacted={interacted}>
      <div className="ab-canvas-heading">
        <span>
          <ZaplaPetal size={27} /> Enquiry workflow
        </span>
        <label className="ab-wait-control">
          <input
            type="checkbox"
            checked={hasWait}
            disabled={!ready}
            onChange={(event) => {
              setHasWait(event.target.checked);
              setInteracted(true);
            }}
            aria-controls="ab-wait-step"
          />
          Include a wait
        </label>
      </div>

      <div className="ab-node ab-trigger">
        <Avatar />
        <div>
          <span className="ab-node-label">Form submitted</span>
          <strong>Mia’s air conditioning enquiry</strong>
        </div>
      </div>
      <div className="ab-connection" aria-hidden="true" />
      <div className="ab-wait-slot" id="ab-wait-step">
        {hasWait ? (
          <div className="ab-node ab-wait-node">
            <span>Wait</span>
            <strong>The delay you set</strong>
          </div>
        ) : (
          <p className="ab-no-wait">Continue without a wait</p>
        )}
      </div>
      <div className="ab-connection" aria-hidden="true" />
      <fieldset className="ab-node ab-condition" disabled={!ready}>
        <legend className="ab-sr-only">Try a condition result</legend>
        <span className="ab-node-label">Condition</span>
        <h3>Does the condition match?</h3>
        <div className="ab-result-choices">
          {(["yes", "no"] as const).map((choice) => (
            <label key={choice}>
              <input
                type="radio"
                name="automation-condition"
                value={choice}
                checked={result === choice}
                onChange={() => {
                  setResult(choice);
                  setInteracted(true);
                }}
                aria-controls="ab-branch-outcomes"
              />
              <span>{choice === "yes" ? "Yes" : "No"}</span>
            </label>
          ))}
          <span className="ab-try-label">Try both results</span>
        </div>
      </fieldset>

      <div className="ab-split" aria-hidden="true">
        <svg viewBox="0 0 600 68" preserveAspectRatio="none">
          <path
            className="ab-path-base"
            d="M300 0 V24 Q300 32 290 32 H160 Q150 32 150 42 V68 M300 0 V24 Q300 32 310 32 H440 Q450 32 450 42 V68"
          />
          <path
            className={`ab-path-selected ${result === "yes" ? "ab-path-active" : ""}`}
            pathLength="1"
            d="M300 0 V24 Q300 32 290 32 H160 Q150 32 150 42 V68"
          />
          <path
            className={`ab-path-selected ${result === "no" ? "ab-path-active" : ""}`}
            pathLength="1"
            d="M300 0 V24 Q300 32 310 32 H440 Q450 32 450 42 V68"
          />
        </svg>
        <span className="ab-yes-label">Yes</span>
        <span className="ab-no-label">No</span>
      </div>
      <div className="ab-branch-outcomes" id="ab-branch-outcomes">
        <article className="ab-outcome ab-outcome-sms" aria-label="Yes path: send SMS">
          <div className="ab-outcome-title">
            <ZaplaPetal size={24} />
            <h3>Send SMS</h3>
          </div>
          <p>
            Hi Mia, an assessment lets us check your space and discuss installation options. Reply
            with any questions.
          </p>
          <span className="ab-outcome-note">Your configured message</span>
        </article>
        <article className="ab-outcome ab-outcome-task" aria-label="No path: create a task">
          <div className="ab-outcome-title">
            <ZaplaPetal size={24} />
            <h3>Create a task</h3>
          </div>
          <p>Review Mia’s air conditioning enquiry.</p>
          <span className="ab-outcome-note">
            A person reviews the enquiry and decides the next step.
          </span>
        </article>
      </div>
      <p className="ab-canvas-caption">One condition. Two connected paths. Your rules decide.</p>
      <p className="ab-sr-only" role="status" aria-live="polite" aria-atomic="true">
        {hasWait ? "After the configured wait, " : "Without a wait, "}
        {result === "yes"
          ? "the condition matches. Follow the Yes path and send the configured SMS to Mia."
          : "the condition does not match. Follow the No path and create a task to review Mia’s enquiry."}
      </p>
    </div>
  );
}

function OpeningStory() {
  return (
    <section className="ab-opening" aria-label="Automation Builder">
      <div className="ab-wrap ab-story-grid">
        <header className="ab-hero-intro">
          <p className="ab-eyebrow">Automation Builder</p>
          <h1>
            Set the rules.
            <br />
            Zapla handles the routine work.
          </h1>
          <p className="ab-hero-description">
            Build workflows that send agreed messages, update customer information and create tasks.
            Choose what starts them, when they act and where your team gets involved.
          </p>
          <div className="ab-actions">
            <BookingLink />
            <a className="ab-text-link" href="#automation-workflow">
              Explore the branches <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </header>
        <div
          className="ab-scene"
          id="automation-workflow"
          aria-label="Interactive example of a workflow with two conditional paths"
        >
          <div className="ab-scene-pin">
            <WorkflowDemo />
          </div>
        </div>
        <div className="ab-build-copy">
          <p className="ab-eyebrow">A visual way to build</p>
          <h2>See both paths before anything runs.</h2>
          <p>
            A condition lets the same workflow take different paths. In this example, Yes sends Mia
            information. No creates a task for someone to review her enquiry.
          </p>
          <dl className="ab-building-blocks">
            <div>
              <dt>Start with an event</dt>
              <dd>
                A form submission, a new contact, a pipeline stage change or an incoming message.
              </dd>
            </div>
            <div>
              <dt>Set the path and timing</dt>
              <dd>
                Connect each condition to its next action. Add a wait where the process needs a gap.
              </dd>
            </div>
            <div>
              <dt>Configure each action</dt>
              <dd>
                Set the message, customer field or task. The workflow carries out the steps you
                connect.
              </dd>
            </div>
          </dl>
          <a className="ab-text-link" href="/crm">
            See the CRM behind the workflow <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Do I need to write code to build a workflow?",
    "The visual builder lets you add steps, configure their settings and connect them into a flow. Guided Launch helps you map and build the initial agreed workflows around your process.",
  ],
  [
    "Can I control the timing and use different paths?",
    "Yes. Wait steps control the gap before a later action, and conditions let a workflow take different paths. We agree the rules and check the available settings for your setup before building them.",
  ],
  [
    "What happens when a customer replies?",
    "A received message can start a workflow, such as creating a review task for your team. We agree and check the reply handling for the particular process during setup.",
  ],
  [
    "What actions can a workflow take?",
    "Actions include sending an SMS, updating customer fields and creating tasks. We confirm the messaging connections and actions available for your setup before building the workflow.",
  ],
  [
    "Can it work with the software we already use?",
    "We review the events, information and connection options available in your existing system. We confirm how those would fit the workflow before recommending a setup across systems.",
  ],
  [
    "How is this different from Follow-Up or Reactivation?",
    "Automation Builder is where workflows are built and controlled. Follow-Up and Reactivation use workflows for particular business needs, such as keeping active enquiries moving or reopening dormant conversations.",
  ],
];

export function AutomationBuilderPage() {
  return (
    <main className="zapla-feature zapla-automation">
      <OpeningStory />

      <section className="ab-section ab-human" aria-labelledby="ab-human-heading">
        <div className="ab-wrap ab-human-grid">
          <div className="ab-human-content">
            <p className="ab-eyebrow">Keep people in the process</p>
            <h2 id="ab-human-heading">A new question can need a person.</h2>
            <p className="ab-human-intro">
              After the SMS in this example, Mia’s reply can start a separate workflow that creates
              a review task. Your team reads the question and decides how to respond.
            </p>
            <div className="ab-reply-flow">
              <div className="ab-customer-reply">
                <div className="ab-person">
                  <Avatar />
                  <div>
                    <strong>Mia’s reply to the SMS</strong>
                    <span>Message received</span>
                  </div>
                </div>
                <p>Can you help with an upstairs installation?</p>
              </div>
              <div className="ab-review-task">
                <ZaplaPetal size={29} />
                <div>
                  <span className="ab-label">This workflow creates a task</span>
                  <strong>Review Mia’s question</strong>
                </div>
              </div>
            </div>
            <a className="ab-text-link" href="/features/unified-inbox">
              See where your team replies <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <figure className="ab-human-photo">
            <img
              src="/concept/industries/trades-office.webp"
              alt="A team member reviewing customer work at a laptop"
              width={1536}
              height={1024}
              loading="lazy"
            />
            <figcaption>Your team reads the conversation and responds.</figcaption>
          </figure>
        </div>
      </section>

      <section className="ab-section ab-control" aria-labelledby="ab-control-heading">
        <div className="ab-wrap">
          <div className="ab-control-intro">
            <p className="ab-eyebrow">Before and after it runs</p>
            <h2 id="ab-control-heading">
              Check the setup.
              <br />
              Then switch it on.
            </h2>
            <p>
              Keep a workflow inactive while you agree the process. Choose when to make it live,
              then use its run history to see what happened.
            </p>
          </div>
          <div className="ab-control-grid">
            <div className="ab-lifecycle" aria-label="Draft and Live workflow states">
              <div>
                <span>While you build</span>
                <h3>Draft</h3>
                <p>Saved and inactive.</p>
              </div>
              <ArrowRight size={24} aria-hidden="true" />
              <div>
                <span>When you activate it</span>
                <h3>Live</h3>
                <p>Runs on its triggers.</p>
              </div>
            </div>
            <div className="ab-control-detail">
              <div className="ab-control-item">
                <h3>Resolve missing details</h3>
                <p>
                  The builder flags missing settings and required connections. Those errors need to
                  be resolved before you can save.
                </p>
              </div>
              <div className="ab-control-item">
                <h3>Look inside a run</h3>
                <p>
                  Inspect the steps taken, their timing, results and reported errors. See where a
                  particular run needs attention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-section ab-launch" aria-labelledby="ab-launch-heading">
        <div className="ab-wrap">
          <div className="ab-launch-intro">
            <p className="ab-eyebrow">Guided Launch</p>
            <h2 id="ab-launch-heading">Start with one useful process.</h2>
            <p>
              Bring us the work your team keeps repeating. We’ll map the steps with you and build
              the agreed workflow around the way you work.
            </p>
          </div>
          <dl className="ab-launch-plan">
            <div>
              <dt>The starting point</dt>
              <dd>What happens in your business that should start the work?</dd>
            </div>
            <div>
              <dt>The agreed steps</dt>
              <dd>What should Zapla do, and when should it happen?</dd>
            </div>
            <div>
              <dt>The people</dt>
              <dd>Where does someone need to review, decide or respond?</dd>
            </div>
          </dl>
          <div className="ab-launch-close">
            <p>
              Starting with spreadsheets and inboxes? We’ll agree what belongs in Zapla. Already
              using a business system? We’ll check the available connections and where Zapla fits.
            </p>
            <div>
              <BookingLink>Plan your first workflow</BookingLink>
              <p className="ab-launch-terms">
                Guided Launch is a separately priced initial setup.
                <br />
                <a href="/Pricing-v3">See plans and setup</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-section ab-faq" aria-labelledby="ab-faq-heading">
        <div className="ab-wrap ab-faq-grid">
          <div>
            <p className="ab-eyebrow">Before you get started</p>
            <h2 id="ab-faq-heading">A few practical questions.</h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ab-final" aria-labelledby="ab-final-heading">
        <div className="ab-wrap">
          <div className="ab-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="ab-eyebrow">Built around your business</p>
          <h2 id="ab-final-heading">
            Bring us one process <br />
            your team repeats.
          </h2>
          <p>
            We’ll map what starts it, what should happen next and where your team gets involved.
          </p>
          <BookingLink />
        </div>
      </section>
    </main>
  );
}
