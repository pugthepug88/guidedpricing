import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/automation-builder.css";

function BookingLink({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="ab-cta" href="/booking">
      {children} <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

/** An illustrative configured process. Keyword replies and a timeout are separate
 * builder outputs, not AI intent detection or a claim that a booking was made.
 * Every node is server-rendered. Motion only introduces the configured steps.
 */
function WorkflowDemo() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || media.matches || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const key = (entry.target as HTMLElement).dataset.sequence;
          if (key) setEntered((current) => (current.includes(key) ? current : [...current, key]));
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -70px 0px" },
    );
    canvas.querySelectorAll("[data-sequence]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ab-branch-stage" ref={canvasRef}>
      <div className="ab-canvas-heading">
        <ZaplaPetal size={26} />
        <span>From accepted quote to installation</span>
      </div>
      <div className="ab-setup-sequence">
        <div
          className="ab-node ab-trigger"
          data-sequence="accepted"
          data-entered={entered.includes("accepted")}
        >
          <span className="ab-node-label">Pipeline stage changes</span>
          <strong>Quote accepted</strong>
        </div>
        <div className="ab-connection" aria-hidden="true" />
        <div
          className="ab-node ab-common-step"
          data-sequence="email"
          data-entered={entered.includes("email")}
        >
          <span className="ab-node-label">Send email</span>
          <h3>Your installation checklist</h3>
        </div>
        <div className="ab-connection" aria-hidden="true" />
        <div
          className="ab-node ab-common-step ab-message-step"
          data-sequence="sms"
          data-entered={entered.includes("sms")}
        >
          <span className="ab-node-label">Send SMS</span>
          <p>
            We’ve emailed your checklist. Reply <strong>READY</strong> when your site is prepared,
            or <strong>HELP</strong> if you have a question.
          </p>
        </div>
        <div className="ab-connection" aria-hidden="true" />
        <div
          className="ab-node ab-condition"
          data-sequence="reply"
          data-entered={entered.includes("reply")}
        >
          <span className="ab-node-label">Wait for SMS reply</span>
          <h3>Which response comes back?</h3>
          <p>Match READY or HELP · wait up to 2 days</p>
        </div>
      </div>
      <div className="ab-split" aria-hidden="true">
        <svg viewBox="0 0 600 38" preserveAspectRatio="none">
          <path d="M300 0 V12 Q300 18 294 18 H106 Q100 18 100 24 V38 M300 0 V38 M300 12 Q300 18 306 18 H494 Q500 18 500 24 V38" />
        </svg>
      </div>
      <div className="ab-branch-outcomes">
        <div
          className="ab-track"
          role="group"
          aria-label="Customer replies READY"
          data-sequence="ready"
          data-entered={entered.includes("ready")}
        >
          <h4 className="ab-branch-label">Replies READY</h4>
          <div className="ab-track-nodes">
            <article className="ab-node ab-step ab-first-step">
              <span className="ab-node-label">Update customer</span>
              <h3>Site readiness</h3>
              <p className="ab-record-value">Ready</p>
            </article>
            <div className="ab-connection" aria-hidden="true" />
            <article className="ab-node ab-step ab-next-step">
              <span className="ab-node-label">Send SMS</span>
              <h3>Choose an installation time</h3>
              <p>Send the customer your booking link.</p>
            </article>
          </div>
        </div>
        <div
          className="ab-track"
          role="group"
          aria-label="Customer replies HELP"
          data-sequence="help"
          data-entered={entered.includes("help")}
        >
          <h4 className="ab-branch-label">Replies HELP</h4>
          <div className="ab-track-nodes">
            <article className="ab-node ab-step ab-first-step">
              <span className="ab-node-label">Update customer</span>
              <h3>Site readiness</h3>
              <p className="ab-record-value">Needs discussion</p>
            </article>
            <div className="ab-connection" aria-hidden="true" />
            <article className="ab-node ab-step ab-next-step">
              <span className="ab-node-label">Create a task</span>
              <h3>Discuss the preparation question</h3>
              <p>Your team reviews the reply and gets in touch.</p>
            </article>
          </div>
        </div>
        <div
          className="ab-track"
          role="group"
          aria-label="No matching reply within two days"
          data-sequence="timeout"
          data-entered={entered.includes("timeout")}
        >
          <h4 className="ab-branch-label">
            No READY or HELP <span>after 2 days</span>
          </h4>
          <div className="ab-track-nodes">
            <article className="ab-node ab-step ab-first-step">
              <span className="ab-node-label">Update customer</span>
              <h3>Site readiness</h3>
              <p className="ab-record-value">Unconfirmed</p>
            </article>
            <div className="ab-connection" aria-hidden="true" />
            <article className="ab-node ab-step ab-next-step">
              <span className="ab-node-label">Create a task</span>
              <h3>Confirm readiness before scheduling</h3>
              <p>Your team checks what is still needed.</p>
            </article>
          </div>
        </div>
      </div>
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
            Zapla handles <br />
            the routine work.
          </h1>
          <p className="ab-hero-description">
            Build workflows that send agreed messages, update customer information and create tasks.
            Choose what starts them, when they act and where your team gets involved.
          </p>
          <div className="ab-actions">
            <BookingLink />
            <a className="ab-text-link" href="#automation-workflow">
              Explore the workflow <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </header>
        <div
          className="ab-scene"
          id="automation-workflow"
          aria-label="Illustrative installation workflow with READY, HELP and timeout paths"
        >
          <WorkflowDemo />
        </div>
        <div className="ab-build-copy">
          <p className="ab-eyebrow">A visual way to build</p>
          <h2>
            A customer says yes.
            <br />
            The next steps are ready.
          </h2>
          <p>
            Acceptance starts the preparation. Zapla sends the checklist, asks for a reply and gives
            each response its own path. Ready customers get a booking link. Questions and
            unconfirmed preparation become clear work for your team.
          </p>
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
    "A workflow can wait for an SMS or WhatsApp reply, use configured keywords for different paths and set a timeout. A received message can also start a separate workflow. We check the reply rules and account connections for your process during setup.",
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
        <div className="ab-wrap">
          <div className="ab-human-grid">
            <div className="ab-human-content">
              <p className="ab-eyebrow">Keep people in the process</p>
              <h2 id="ab-human-heading">Some questions need your expertise.</h2>
              <p className="ab-human-intro">
                The HELP path gives your team a specific question to resolve. They read the
                customer’s original reply, discuss what is needed and agree the next step before
                arranging the installation.
              </p>
              <a className="ab-text-link" href="/features/unified-inbox">
                See where your team replies <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div
              className="ab-reply-flow"
              aria-label="The HELP branch creates a task for a customer preparation question"
            >
              <div className="ab-customer-reply">
                <div className="ab-person">
                  <div>
                    <strong>A customer replies</strong>
                    <span>SMS reply · HELP path</span>
                  </div>
                </div>
                <p>HELP. Do we need an electrician before you install the unit?</p>
              </div>
              <div className="ab-review-task">
                <ZaplaPetal size={29} />
                <div>
                  <span className="ab-label">This workflow creates a task</span>
                  <strong>Discuss the preparation question</strong>
                </div>
              </div>
            </div>
          </div>
          <figure className="ab-human-photo">
            <img
              src="/concept/automation/site-assessment-v1.webp"
              alt="An air conditioning specialist and homeowner discussing a floor plan during a site assessment"
              width={2172}
              height={724}
              loading="lazy"
            />
            <figcaption>
              Keep your people <br />
              on the work that needs them.
            </figcaption>
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
