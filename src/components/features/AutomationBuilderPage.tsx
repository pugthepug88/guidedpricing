import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, ChevronDown, Clock3, Mail, MessageSquare } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/automation-builder.css";

const nurtureSteps = [
  {
    day: "Day 0",
    title: "Welcome the enquiry",
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
      <span>
        <Mail size={13} aria-hidden="true" />
        <span className="ab-channel-name">Email</span>
      </span>
      <span>
        <MessageSquare size={13} aria-hidden="true" />
        <span className="ab-channel-name">SMS</span>
      </span>
      <span>
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
      <p className="ab-entry-label">Start from an agreed event</p>
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
      "(min-width: 1101px) and (min-height: 820px) and (prefers-reduced-motion: no-preference)",
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
            update the details and create tasks, with timing and channels you choose.
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
              Invite a question, share your booking link or create a task when a person needs to
              take over.
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
        <div className="ab-photo-intro">
          <h2 id="ab-people-heading">Keep your team on the work that needs them.</h2>
          <p>
            Use the workflow for routine follow-through. Give your people room for the
            conversations, decisions and skilled work that need their experience.
          </p>
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
            We agree what starts the sequence, what each message says and when it should go out.
            Then we set up the connections and walk through the agreed workflow with you.
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
              <span>The plan before the build</span>
              <h3>New enquiry nurture</h3>
            </div>
          </div>
          <dl>
            <div>
              <dt>Entry</dt>
              <dd>Choose the pipeline, form or tag that starts it.</dd>
            </div>
            <div>
              <dt>Messages</dt>
              <dd>Welcome. Useful information. A clear next step.</dd>
            </div>
            <div>
              <dt>Timing &amp; channels</dt>
              <dd>Agree the waits and choose email, SMS and/or WhatsApp.</dd>
            </div>
            <div>
              <dt>People &amp; replies</dt>
              <dd>Agree who reviews responses and how the workflow should handle them.</dd>
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
    "What can start a workflow?",
    "Starting events include a new pipeline item, a submitted form, a tag change, a new contact or an incoming message. We choose the event and its conditions for your process during setup.",
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
    "We agree the reply handling alongside the message sequence, including where a person picks up. A received message can start a workflow, and configured SMS or WhatsApp keywords can lead to different paths. We check the particular rules and connections during setup.",
  ],
  [
    "Can I build workflows myself?",
    "The visual builder lets you add triggers, actions, waits and conditions, configure their settings and connect the steps without writing code. Guided Launch helps map and build the initial agreed workflows around your business.",
  ],
  [
    "Can I see what a workflow did?",
    "Use its run history to inspect the steps taken, timing, results and reported errors. This helps you see where a particular run needs attention.",
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
