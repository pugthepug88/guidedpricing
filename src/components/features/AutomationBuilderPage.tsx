import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/automation-builder.css";

type WorkflowAction = "sms" | "task";
type WorkflowTiming = "immediate" | "delay";

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

/** A marketing illustration of documented builder choices, not a live workflow.
 * These inputs configure an action and a wait; they do not represent customer
 * field operands, which the public product documentation does not establish.
 */
function WorkflowDemo() {
  const [action, setAction] = useState<WorkflowAction>("sms");
  const [timing, setTiming] = useState<WorkflowTiming>("immediate");
  const [hasChanged, setHasChanged] = useState(false);
  const chooseAction = (value: WorkflowAction) => {
    setHasChanged(true);
    setAction(value);
  };
  const chooseTiming = (value: WorkflowTiming) => {
    setHasChanged(true);
    setTiming(value);
  };
  const isSms = action === "sms";
  const isDelayed = timing === "delay";
  const actionLabel = isSms ? "Send an SMS" : "Create a callback task";
  const resultSummary = `${actionLabel} ${isDelayed ? "after the delay you set" : "when the form is submitted"}.`;

  return (
    <div className="ab-demo" id="automation-workflow" aria-labelledby="ab-demo-heading">
      <div className="ab-demo-heading">
        <h2 id="ab-demo-heading">You choose the next step.</h2>
        <p>Change the action or timing. See how the workflow responds.</p>
      </div>

      <div className="ab-workbench">
        <div className="ab-settings">
          <div className="ab-enquiry">
            <span className="ab-label">Starts when a form is submitted</span>
            <div className="ab-person">
              <Avatar />
              <div>
                <strong>Mia Thompson</strong>
                <span>Enquiry about an air conditioning assessment</span>
              </div>
            </div>
          </div>

          <fieldset className="ab-choice">
            <legend>What should Zapla do?</legend>
            <div className="ab-options">
              <label className={isSms ? "ab-selected" : ""}>
                <input
                  type="radio"
                  name="automation-action"
                  value="sms"
                  checked={isSms}
                  onChange={() => chooseAction("sms")}
                  aria-controls="automation-result"
                />
                <span>Send an SMS</span>
              </label>
              <label className={!isSms ? "ab-selected" : ""}>
                <input
                  type="radio"
                  name="automation-action"
                  value="task"
                  checked={!isSms}
                  onChange={() => chooseAction("task")}
                  aria-controls="automation-result"
                />
                <span>Create a callback task</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="ab-choice ab-timing-choice">
            <legend>When should the action happen?</legend>
            <div className="ab-options ab-options-inline">
              <label className={!isDelayed ? "ab-selected" : ""}>
                <input
                  type="radio"
                  name="automation-timing"
                  value="immediate"
                  checked={!isDelayed}
                  onChange={() => chooseTiming("immediate")}
                  aria-controls="automation-result"
                />
                <span>Immediately</span>
              </label>
              <label className={isDelayed ? "ab-selected" : ""}>
                <input
                  type="radio"
                  name="automation-timing"
                  value="delay"
                  checked={isDelayed}
                  onChange={() => chooseTiming("delay")}
                  aria-controls="automation-result"
                />
                <span>After a delay</span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="ab-result" id="automation-result">
          <ol className="ab-flow-path" aria-label="Configured workflow">
            <li>Form submitted</li>
            {isDelayed && <li className="ab-wait-step">Wait</li>}
            <li>{isSms ? "Send SMS" : "Create task"}</li>
          </ol>
          <div
            className={`ab-result-content${hasChanged ? " ab-result-changed" : ""}`}
            key={`${action}-${timing}`}
          >
            <div className="ab-action-heading">
              <ZaplaPetal size={33} />
              <div>
                <span className="ab-label">
                  {isDelayed ? "After the delay you set" : "When the form comes in"}
                </span>
                <h3>{actionLabel}</h3>
              </div>
            </div>
            {isSms ? (
              <div className="ab-action-detail ab-sms-detail">
                <span className="ab-label">Your agreed message to Mia</span>
                <p>
                  Hi Mia, an assessment lets us check your space and discuss installation options.
                  Reply with any questions.
                </p>
                <span className="ab-detail-note">The message uses the wording you set.</span>
              </div>
            ) : (
              <div className="ab-action-detail ab-task-detail">
                <span className="ab-label">Task to create</span>
                <p>Call Mia about an air conditioning assessment.</p>
                <span className="ab-detail-note">
                  Your team picks up the task and makes the call.
                </span>
              </div>
            )}
            <p className="ab-timing-explanation">
              {isDelayed
                ? "The workflow waits before taking this action. You set the delay as part of the workflow."
                : "This action follows the form submission, with no wait step in between."}
            </p>
          </div>
        </div>
      </div>
      <p className="ab-demo-caption">
        The event starts it. Your settings decide what happens next.
      </p>
      <p className="ab-sr-only" role="status" aria-live="polite" aria-atomic="true">
        {resultSummary}
      </p>
    </div>
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
      <section className="ab-hero">
        <div className="ab-wrap">
          <div className="ab-hero-intro">
            <p className="ab-eyebrow">Automation Builder</p>
            <h1>
              Set the rules.
              <br />
              Zapla handles the routine work.
            </h1>
            <p className="ab-hero-description">
              Build workflows that send agreed messages, update customer information and create
              tasks. Choose what starts them, when they act and where your team gets involved.
            </p>
            <div className="ab-actions">
              <BookingLink />
              <a className="ab-text-link" href="#automation-workflow">
                Try a workflow <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <WorkflowDemo />
        </div>
      </section>

      <section className="ab-section ab-build" aria-labelledby="ab-build-heading">
        <div className="ab-wrap ab-build-grid">
          <div className="ab-copy">
            <p className="ab-eyebrow">A visual way to build</p>
            <h2 id="ab-build-heading">A process you can follow, step by step.</h2>
            <p>
              Add the steps your process needs, configure each one and connect them into a flow. You
              can see how the starting event leads to the next action.
            </p>
            <a className="ab-text-link" href="/crm">
              See the CRM behind the workflow <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="ab-build-steps">
            <div>
              <h3>Choose what starts it</h3>
              <p>
                A form submission, a new contact, a pipeline stage change or an incoming message.
              </p>
            </div>
            <div>
              <h3>Set the path and timing</h3>
              <p>
                Add a condition where the path depends on a rule. Add a wait where the next action
                should happen later.
              </p>
            </div>
            <div>
              <h3>Tell each action what to do</h3>
              <p>
                Set the message to send, the customer field to update or the task to create. Connect
                the steps in the order your process needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-section ab-human" aria-labelledby="ab-human-heading">
        <div className="ab-wrap ab-human-grid">
          <div className="ab-human-content">
            <p className="ab-eyebrow">Keep people in the process</p>
            <h2 id="ab-human-heading">A new question can need a person.</h2>
            <p className="ab-human-intro">
              If you choose the SMS path, Mia’s reply can start a separate workflow that creates a
              review task. Your team reads the question and decides how to respond.
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
            <figcaption>
              <span>The human next step</span>
              Your team reads the conversation and responds.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="ab-section ab-control" aria-labelledby="ab-control-heading">
        <div className="ab-wrap ab-control-grid">
          <div className="ab-copy">
            <p className="ab-eyebrow">Before and after it runs</p>
            <h2 id="ab-control-heading">Check the setup. Then switch it on.</h2>
            <p>
              Keep a workflow inactive while you agree the process. Choose when to make it live,
              then use its run history to see what happened.
            </p>
          </div>
          <div className="ab-control-detail">
            <div className="ab-lifecycle" aria-label="Draft and Live workflow states">
              <div>
                <h3>Draft</h3>
                <p>Saved and inactive.</p>
              </div>
              <ArrowRight size={22} aria-hidden="true" />
              <div>
                <h3>Live</h3>
                <p>Ready to run on its triggers.</p>
              </div>
            </div>
            <div className="ab-control-item">
              <h3>Resolve missing details</h3>
              <p>
                The builder flags missing settings and required connections. Those errors need to be
                resolved before you can save.
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
      </section>

      <section className="ab-section ab-launch" aria-labelledby="ab-launch-heading">
        <div className="ab-wrap ab-launch-grid">
          <div className="ab-launch-plan">
            <div className="ab-plan-heading">
              <ZaplaPetal size={34} />
              <h3>Your first workflow</h3>
            </div>
            <dl>
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
          </div>
          <div className="ab-copy">
            <p className="ab-eyebrow">Guided Launch</p>
            <h2 id="ab-launch-heading">Start with one useful process.</h2>
            <p>
              Bring us the work your team keeps repeating. We’ll map the steps with you and build
              the agreed workflow around the way you work.
            </p>
            <p>
              Starting with spreadsheets and inboxes? We’ll agree what belongs in Zapla. Already
              using a business system? We’ll check the available connections and where Zapla fits.
            </p>
            <a className="ab-text-link" href="/booking">
              Plan your first workflow <ArrowRight size={16} aria-hidden="true" />
            </a>
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
