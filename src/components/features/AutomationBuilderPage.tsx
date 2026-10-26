import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown, Clock3, Mail, MessageSquare } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { AutomationAiDemo } from "./AutomationAiDemo";
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
    </div>
  );
}

function OpeningStory() {
  const rootRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [canPin, setCanPin] = useState(false);
  const [phase, setPhase] = useState(0);
  const [introduced, setIntroduced] = useState(false);

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
            An enquiry comes in. The next steps are ready. Build workflows that send the messages,
            update customer details and keep the next steps moving, with timing and channels you
            choose.
          </p>
          <div className="ab-actions">
            <BookingLink />
            <a className="ab-text-link" href="#automation-workflow">
              Follow the sequence
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
            <WorkflowBoard phase={phase} introduced={introduced} />
          </div>
        </div>
        <div className="ab-story-notes">
          <article className="ab-story-beat" data-beat="1">
            <p className="ab-eyebrow">Two days later</p>
            <h2>Give them something useful.</h2>
            <p>
              Send the information that helps someone decide: what’s included, their options or
              answers to common questions.
            </p>
            <p className="ab-beat-detail">
              Choose email, SMS or WhatsApp for each step, or combine channels where it suits the
              process.
            </p>
          </article>
          <article className="ab-story-beat" data-beat="2">
            <p className="ab-eyebrow">Three days after that</p>
            <h2>Make the next step easy.</h2>
            <p>
              Invite a question or share your booking link. Agree where your team should take over.
            </p>
            <p className="ab-beat-detail">
              You agree the entry rules, timing and reply handling before the workflow goes live.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function EditorialChapter() {
  return (
    <section className="ab-editorial" aria-labelledby="ab-people-heading">
      <div className="ab-wrap">
        <figure className="ab-work-photo">
          <img
            src="/concept/automation/print-studio-v2.webp"
            alt="A print studio owner and specialist checking a colour proof beside a commercial wide-format printer"
            width={2172}
            height={724}
            loading="lazy"
          />
          <figcaption>
            <h2 id="ab-people-heading">Keep your team on the work that needs them.</h2>
          </figcaption>
        </figure>
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
      <AutomationAiDemo />
      <EditorialChapter />
      <WorkflowSetup />
      <section className="ab-faq" aria-labelledby="ab-faq-heading">
        <div className="ab-wrap">
          <div className="ab-faq-panel ab-faq-grid">
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
