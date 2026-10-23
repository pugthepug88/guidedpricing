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

/** A simplified configured workflow, not a live execution. The supplier's public
 * builder implements custom-field criteria with equals and True/False outputs.
 * Motion draws the two alternative connections once; it never runs both paths
 * for an illustrated customer. All content is readable before hydration.
 */
function WorkflowDemo() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || media.matches || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ab-branch-stage" data-animate={animate} ref={canvasRef}>
      <div className="ab-canvas-heading">
        <ZaplaPetal size={26} />
        <span>Service enquiry workflow</span>
        <span className="ab-example-label">Example</span>
      </div>

      <div className="ab-node ab-trigger">
        <span className="ab-node-label">Form submitted</span>
        <strong>New air conditioning enquiry</strong>
        <p>Urgent repair or planned installation</p>
      </div>
      <div className="ab-connection" aria-hidden="true" />
      <div className="ab-node ab-condition">
        <span className="ab-node-label">Condition</span>
        <h3>Urgent repair requested?</h3>
        <p>Enquiry type = Urgent repair</p>
      </div>

      <div className="ab-split" aria-hidden="true">
        <svg viewBox="0 0 600 62" preserveAspectRatio="none">
          <path
            className="ab-path-base"
            d="M300 0 V19 Q300 27 290 27 H160 Q150 27 150 37 V62 M300 0 V19 Q300 27 310 27 H440 Q450 27 450 37 V62"
          />
          <path
            className="ab-path-trace ab-path-yes"
            pathLength="1"
            d="M300 0 V19 Q300 27 290 27 H160 Q150 27 150 37 V62"
          />
          <path
            className="ab-path-trace ab-path-no"
            pathLength="1"
            d="M300 0 V19 Q300 27 310 27 H440 Q450 27 450 37 V62"
          />
        </svg>
        <span className="ab-yes-label">Yes</span>
        <span className="ab-no-label">No</span>
      </div>
      <div className="ab-branch-outcomes">
        <div className="ab-track ab-track-urgent" role="group" aria-label="Yes: urgent repair">
          <article className="ab-node ab-step ab-first-step">
            <div className="ab-step-title">
              <ZaplaPetal size={22} />
              <h3>Update customer</h3>
            </div>
            <p className="ab-field-update">
              <span>Service priority</span>
              <strong>Urgent</strong>
            </p>
          </article>
          <div className="ab-connection ab-next-connection" aria-hidden="true" />
          <article className="ab-node ab-step ab-next-step">
            <div className="ab-step-title">
              <ZaplaPetal size={22} />
              <h3>Create a task</h3>
            </div>
            <p>Call about the breakdown.</p>
          </article>
        </div>
        <div
          className="ab-track ab-track-planned"
          role="group"
          aria-label="No: planned installation"
        >
          <article className="ab-node ab-step ab-first-step">
            <div className="ab-step-title">
              <ZaplaPetal size={22} />
              <h3>Send SMS</h3>
            </div>
            <p>Thanks for your enquiry. Send us a floor plan and we’ll prepare your assessment.</p>
          </article>
          <div className="ab-connection ab-next-connection" aria-hidden="true" />
          <article className="ab-node ab-step ab-next-step">
            <div className="ab-step-title">
              <ZaplaPetal size={22} />
              <h3>Create a task</h3>
            </div>
            <p>Prepare the installation assessment.</p>
          </article>
        </div>
      </div>
    </div>
  );
}

function OpeningStory() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const media = window.matchMedia(
      "(min-width: 1101px) and (min-height: 820px) and (prefers-reduced-motion: no-preference)",
    );
    const measure = () => {
      // Keep the complete canvas visible after fonts, zoom or viewport changes.
      setCanPin(media.matches && scene.getBoundingClientRect().height <= window.innerHeight - 128);
    };
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(scene);
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    measure();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, []);

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
              Explore the branches <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </header>
        <div
          className="ab-scene"
          data-pin={canPin}
          id="automation-workflow"
          aria-label="Animated example of a service enquiry workflow with two alternative paths"
        >
          <div className="ab-scene-pin" ref={sceneRef}>
            <WorkflowDemo />
          </div>
        </div>
        <div className="ab-build-copy">
          <p className="ab-eyebrow">A visual way to build</p>
          <h2>
            One enquiry.
            <br />
            The right next steps.
          </h2>
          <p>
            An urgent breakdown needs a different response from a planned installation. Use the
            enquiry details to set the path, then connect the customer updates, messages and tasks
            that belong together.
          </p>
          <dl className="ab-building-blocks">
            <div>
              <dt>Start with what happens</dt>
              <dd>
                A form submission, a new contact, a pipeline stage change or an incoming message.
              </dd>
            </div>
            <div>
              <dt>Make the decision once</dt>
              <dd>
                Set conditions using customer fields, then connect the next steps for each result.
              </dd>
            </div>
            <div>
              <dt>Carry the process forward</dt>
              <dd>
                Send the agreed message, update the record and create the work for your team. Add a
                delay where a later step needs one.
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
        <div className="ab-wrap">
          <div className="ab-human-grid">
            <div className="ab-human-content">
              <p className="ab-eyebrow">Keep people in the process</p>
              <h2 id="ab-human-heading">Some questions need your expertise.</h2>
              <p className="ab-human-intro">
                A customer replies with a question about their property. A separate workflow can
                create a review task when their message arrives. Your team reads the conversation
                and decides what to do next.
              </p>
              <a className="ab-text-link" href="/features/unified-inbox">
                See where your team replies <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div
              className="ab-reply-flow"
              aria-label="A separate workflow for an incoming customer question"
            >
              <div className="ab-customer-reply">
                <div className="ab-person">
                  <div>
                    <strong>A customer replies</strong>
                    <span>Message received · separate workflow</span>
                  </div>
                </div>
                <p>We’ve got two storeys. Can one system cover both?</p>
              </div>
              <div className="ab-review-task">
                <ZaplaPetal size={29} />
                <div>
                  <span className="ab-label">This workflow creates a task</span>
                  <strong>Review the installation question</strong>
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
              Keep your people
              <br />
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
