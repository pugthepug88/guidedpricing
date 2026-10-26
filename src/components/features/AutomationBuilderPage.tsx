import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown, Clock3, Mail, MessageSquare } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/automation-builder.css";

const nurtureSteps = [
  {
    day: "Day 0",
    title: "Send a welcome",
    message: "Thanks for getting in touch. Here’s how we can help.",
  },
  {
    day: "Day 2",
    title: "Help them decide",
    message: "Here’s what’s included, plus answers to the questions we hear most.",
  },
  {
    day: "Day 5",
    title: "Offer the next step",
    message: "Ready to talk it through? Choose a time, or reply with a question.",
  },
] as const;

function BookingLink({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="ab-cta" href="/booking">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function ChannelChoices() {
  return (
    <div
      className="ab-channel-choices"
      role="group"
      aria-label="Choose email, SMS and/or WhatsApp for this step"
    >
      <span className="ab-channel-email">
        <Mail size={13} aria-hidden="true" />
        <span className="ab-channel-name">Email</span>
      </span>
      <span className="ab-channel-sms">
        <MessageSquare size={13} aria-hidden="true" />
        <span className="ab-channel-name">SMS</span>
      </span>
      <span className="ab-channel-whatsapp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d={siWhatsapp.path} />
        </svg>
        <span className="ab-channel-name">WhatsApp</span>
      </span>
    </div>
  );
}

/** A configured nurture illustration, not a live execution. Channel marks are
 * available configuration choices, not nine messages sent to one person.
 * Every step and message remains readable without motion or JavaScript.
 */
function WorkflowBoard({ phase, introduced }: { phase: number; introduced: boolean }) {
  return (
    <div className="ab-flow-board" data-introduced={introduced}>
      <div className="ab-board-heading">
        <ZaplaPetal size={25} />
        <span>New enquiry nurture</span>
        <small>Draft</small>
      </div>
      <p className="ab-entry-label">Start with one of these events</p>
      <div className="ab-entry-events" aria-label="Alternative workflow starting events">
        <div>
          <span>Sales pipeline</span>
          <strong>New enquiry added</strong>
        </div>
        <div>
          <span>Form</span>
          <strong>Enquiry submitted</strong>
        </div>
        <div>
          <span>Tag</span>
          <strong>“Nurture” added</strong>
        </div>
      </div>
      <div className="ab-entry-merge" aria-hidden="true">
        <svg viewBox="0 0 600 30" preserveAspectRatio="none">
          <path d="M100 0 C100 22 300 8 300 30 M300 0 V30 M500 0 C500 22 300 8 300 30" />
        </svg>
      </div>
      <div className="ab-message-sequence">
        {nurtureSteps.map((step, index) => (
          <div className="ab-sequence-piece" key={step.day}>
            {index > 0 && (
              <div
                className="ab-wait"
                aria-label={index === 1 ? "Wait two days" : "Wait three days"}
              >
                <span>
                  <Clock3 size={13} aria-hidden="true" />
                  Wait {index === 1 ? 2 : 3} days
                </span>
              </div>
            )}
            <article
              className="ab-message-node"
              data-focus={phase === index}
              data-reached={phase >= index}
            >
              <div className="ab-message-top">
                <h3>
                  <span className="ab-day">{step.day}</span>
                  {step.title}
                </h3>
                <ChannelChoices />
              </div>
              <p>{step.message}</p>
            </article>
          </div>
        ))}
      </div>
      <p className="ab-draft-note">
        Review the messages, timing and connections before activation.
      </p>
    </div>
  );
}

function OpeningStory() {
  const rootRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [canPin, setCanPin] = useState(false);
  const [phase, setPhase] = useState(0);
  const [introduced, setIntroduced] = useState(false);
  const [buildVersion, setBuildVersion] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const board = boardRef.current;
    if (!root || !board) return;
    const media = window.matchMedia(
      "(min-width: 1101px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let enabled = false;
    let furthest = 0;
    const update = () => {
      frame = 0;
      if (!enabled) return;
      root.querySelectorAll<HTMLElement>("[data-beat]").forEach((beat) => {
        if (beat.getBoundingClientRect().top <= window.innerHeight * 0.6) {
          furthest = Math.max(furthest, Number(beat.dataset.beat));
        }
      });
      setPhase((current) => (current === furthest ? current : furthest));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      enabled = media.matches && board.getBoundingClientRect().height <= window.innerHeight - 140;
      setCanPin(enabled);
      schedule();
    };
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    resize?.observe(board);
    const entry =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(
            (entries) => {
              if (entries.some((item) => item.isIntersecting)) {
                setIntroduced(true);
                entry?.disconnect();
              }
            },
            { threshold: 0.25 },
          );
    entry?.observe(board);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    measure();
    return () => {
      resize?.disconnect();
      entry?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section className="ab-opening" aria-label="Automation Builder" data-pin={canPin} ref={rootRef}>
      <div className="ab-wrap ab-story-grid">
        <header className="ab-hero-intro" data-beat="0">
          <p className="ab-eyebrow">Automation Builder</p>
          <h1>
            Set the rules.
            <br />
            Zapla handles <br />
            the routine work.
          </h1>
          <p className="ab-hero-description">
            Describe a routine process and let AI build a workflow draft. Review the messages,
            timing and customer updates, or build it visually yourself.
          </p>
          <div className="ab-ai-request" aria-label="Instructions for the AI Flow Builder">
            <span>Your request to Zapla</span>
            <p>
              Build a nurture for new enquiries. Send a welcome now, useful information after 2
              days, then an invitation 3 days later.
            </p>
          </div>
          <div className="ab-actions">
            <BookingLink />
            <a
              className="ab-text-link"
              href="#automation-workflow"
              onClick={() => {
                setIntroduced(true);
                setBuildVersion((current) => current + 1);
              }}
            >
              See the draft take shape
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </header>
        <div
          className="ab-scene"
          id="automation-workflow"
          aria-label="A configured nurture sequence with alternative starting events and messages on days zero, two and five"
        >
          <div className="ab-scene-stick" ref={boardRef}>
            <WorkflowBoard key={buildVersion} phase={phase} introduced={introduced} />
          </div>
        </div>
        <div className="ab-story-notes">
          <article className="ab-story-beat" data-beat="1">
            <p className="ab-eyebrow">AI builds. You review.</p>
            <h2>A starting point you can make your own.</h2>
            <p>
              AI adds the steps and connections. You can change the copy, adjust a wait or add a
              condition before the workflow goes live.
            </p>
            <div
              className="ab-review-setting"
              aria-label="Reviewing the second message in the draft"
            >
              <span>Review the second message</span>
              <dl>
                <div>
                  <dt>Wait before sending</dt>
                  <dd>2 days</dd>
                </div>
                <div>
                  <dt>Message</dt>
                  <dd>{nurtureSteps[1].message}</dd>
                </div>
              </dl>
            </div>
            <p className="ab-beat-detail">
              Choose email, SMS or WhatsApp for each step. Agree the entry rules, reply handling and
              where a person gets involved before activation.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function EditorialChapter() {
  return (
    <section className="ab-editorial" aria-labelledby="ab-possibilities-heading">
      <div className="ab-wrap">
        <div className="ab-range-heading">
          <div>
            <p className="ab-eyebrow">Rules around the way you work</p>
            <h2 id="ab-possibilities-heading">Choose what happens next.</h2>
          </div>
          <p>
            Use customer information to choose a path. Start workflows from the sales, booking and
            service events that matter to your business.
          </p>
        </div>
        <div className="ab-rule-range">
          <figure
            className="ab-condition-scene"
            aria-label="A configured condition uses a contact preference supplied by an enquiry form: email leads to an email, SMS leads to an SMS."
          >
            <figcaption>Your enquiry form supplies a contact preference: Email or SMS.</figcaption>
            <div className="ab-condition-question">
              <span>Check the contact preference</span>
              <h3>Email preferred?</h3>
            </div>
            <div className="ab-condition-paths">
              <div>
                <span className="ab-path-label">Yes</span>
                <div>
                  <Mail size={17} aria-hidden="true" />
                  <strong>Send email</strong>
                </div>
              </div>
              <div>
                <span className="ab-path-label">No · SMS selected</span>
                <div>
                  <MessageSquare size={17} aria-hidden="true" />
                  <strong>Send SMS</strong>
                </div>
              </div>
            </div>
            <p>You set the criteria. Each path has its own next step.</p>
          </figure>
          <div className="ab-event-range">
            <h3>Start from an event. Connect the next action.</h3>
            <dl>
              <div>
                <dt>Quote accepted</dt>
                <dd>Convert the quote to an invoice</dd>
              </div>
              <div>
                <dt>Appointment booked</dt>
                <dd>Schedule a reminder before the appointment</dd>
              </div>
              <div>
                <dt>Opportunity changes stage</dt>
                <dd>Update its details or add team members</dd>
              </div>
              <div>
                <dt>Support ticket stalls</dt>
                <dd>Add the people who should handle it</dd>
              </div>
            </dl>
          </div>
        </div>
        <figure className="ab-work-photo">
          <img
            src="/concept/automation/print-studio-v2.webp"
            alt="A print studio owner and specialist checking a colour proof beside a commercial wide-format printer"
            width={2172}
            height={724}
            loading="lazy"
          />
        </figure>
        <p className="ab-photo-caption">Keep your team on the work that needs them.</p>
      </div>
    </section>
  );
}

function WorkflowSetup() {
  return (
    <section className="ab-setup" aria-labelledby="ab-setup-heading">
      <div className="ab-wrap ab-setup-grid">
        <div className="ab-setup-copy">
          <p className="ab-eyebrow">Guided Launch</p>
          <h2 id="ab-setup-heading">
            Your workflow.
            <br />
            Built with you.
          </h2>
          <p>
            AI can give you a starting point. Guided Launch helps turn your process into a practical
            setup: the right entry rules, connected channels and customer updates. We walk through
            the agreed paths with you before activation.
          </p>
          <p>
            Starting with spreadsheets and inboxes, or already using a business system? We work
            through what belongs in Zapla and which connections are available.
          </p>
          <BookingLink>Plan your first workflow</BookingLink>
          <p className="ab-launch-terms">
            Guided Launch is a separately priced initial setup.{" "}
            <a href="/Pricing-v3">See plans and setup</a>
          </p>
        </div>
        <div className="ab-working-plan">
          <div className="ab-plan-heading">
            <ZaplaPetal size={29} />
            <div>
              <span>Before you activate</span>
              <h3>Your workflow review</h3>
            </div>
          </div>
          <dl>
            <div>
              <dt>Entry rules</dt>
              <dd>Choose what starts the workflow and which contacts should enter.</dd>
            </div>
            <div>
              <dt>Connections</dt>
              <dd>Set up the real senders, channels and customer information it needs.</dd>
            </div>
            <div>
              <dt>Messages &amp; timing</dt>
              <dd>Review the wording, waits, conditions and record changes.</dd>
            </div>
            <div>
              <dt>People &amp; replies</dt>
              <dd>Agree reply paths, exceptions and who takes over when a person is needed.</dd>
            </div>
          </dl>
          <div className="ab-plan-control">
            <strong>Build it in Draft. Activate when it’s ready.</strong>
            <p>
              Resolve missing settings and required connections before saving. Use run history to
              inspect the steps, timing, results and reported errors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Can AI build the workflow for me?",
    "Yes. Describe the process in plain English and the AI Flow Builder can create an editable workflow draft, including steps, connections and draft message content. You can ask it to make changes too. Review its business logic, messages, settings and connections before activation.",
  ],
  [
    "What can start a workflow?",
    "Starting events include a submitted form, tag change, new contact, pipeline stage change, appointment booking, accepted quote, invoice payment or support-ticket event. Choose the event and entry conditions that match your process.",
  ],
  [
    "Can I change the messages and timing?",
    "Yes. The sequence above is one configuration. You choose the message content and waits, and can use conditions where the next action depends on customer information.",
  ],
  [
    "Does it send every message on all three channels?",
    "You choose the channels for each step. A workflow can use email, SMS, WhatsApp or a combination, depending on your connected accounts and the process you agree. The channel marks above show those choices.",
  ],
  [
    "What happens when a customer replies?",
    "Set the reply path for your process. Configured SMS or WhatsApp keyword branches can route matching replies, with a timeout path when no keyword matches. Timed follow-ups need explicit reply and exit rules. We agree those rules and where a person gets involved, then check the setup before activation.",
  ],
  [
    "Can I build workflows myself?",
    "Yes. Use the visual builder to add triggers, actions, waits and conditions, or use AI to create a draft and refine it yourself. Guided Launch is a separately priced initial setup for mapping your process, connecting the required accounts and reviewing the agreed workflows.",
  ],
  [
    "Can I see what a workflow did?",
    "Use its run history to inspect the steps taken, timing, results and reported errors. This helps you see where a particular run needs attention.",
  ],
  [
    "Can it connect to another business system?",
    "Webhook and API tools are available, alongside actions such as exporting to Google Sheets. We check the specific system, available API, permissions and required data before agreeing a connection. Availability, implementation scope and usage costs are confirmed during setup.",
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
      <EditorialChapter />
      <WorkflowSetup />
      <section className="ab-faq" aria-labelledby="ab-faq-heading">
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
