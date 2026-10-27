import { useEffect, useRef, useState } from "react";
import { Check, Plus, RotateCcw } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ticketing.css";

// Prepared marketing story. Team actions are represented, never executed.
function Portrait({ cell, small = false }: { cell: number; small?: boolean }) {
  return (
    <span
      className={`tk-portrait${small ? " tk-portrait-small" : ""}`}
      aria-hidden="true"
      style={{
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

function BookCall() {
  return (
    <a className="tk-button" href="/booking">
      Book a Call
    </a>
  );
}

function Opening() {
  return (
    <section className="tk-hero" aria-labelledby="ticketing-title">
      <div className="tk-wrap tk-hero-grid">
        <div className="tk-hero-copy">
          <p className="tk-eyebrow">Customer support ticketing</p>
          <h1 id="ticketing-title">
            Keep customer
            <br />
            issues moving.
          </h1>
          <p className="tk-lead">
            Give every customer issue a clear owner and a visible next step. Keep requests moving,
            from the first question to the completed work.
          </p>
          <div className="tk-actions">
            <BookCall />
            <a className="tk-text-link" href="#ticket-board">
              See how it works
            </a>
          </div>
          <p className="tk-team-note">Unlimited users on both standard plans. No per-user fees.</p>
        </div>
        <figure className="tk-hero-work">
          <img
            src="/concept/ticketing/service-team-20261026.webp"
            alt="A service coordinator and technician working through a problem with a commercial espresso machine"
            width="1200"
            height="800"
            fetchPriority="high"
          />
          <figcaption>
            <div>
              <span>Harbour Coffee · Service request</span>
              <strong>Pressure drops during service</strong>
            </div>
            <div className="tk-hero-owner">
              <Portrait cell={8} small />
              <span>
                Alex Chen<strong>In progress</strong>
              </span>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function RequestProgress() {
  const root = useRef<HTMLDivElement>(null);
  const play = useRef<() => void>(() => {});
  const [phase, setPhase] = useState(2);
  const [canReplay, setCanReplay] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia(
      "(min-width: 901px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
    );
    let visible = false;
    let started = false;
    let running = false;
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let lastPhase = 0;

    const tick = (time: number) => {
      frame = 0;
      if (!running || !visible || document.hidden) {
        previous = 0;
        return;
      }
      elapsed += previous ? Math.min(time - previous, 100) : 0;
      previous = time;
      const next = elapsed >= 3100 ? 2 : elapsed >= 1400 ? 1 : 0;
      if (next !== lastPhase) {
        lastPhase = next;
        setPhase(next);
      }
      if (next === 2) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!media.matches) {
        setPhase(2);
        return;
      }
      cancelAnimationFrame(frame);
      elapsed = 0;
      previous = 0;
      lastPhase = 0;
      started = true;
      running = true;
      setPhase(0);
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const resume = () => {
      if (!visible || document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      } else if (running && !frame) frame = requestAnimationFrame(tick);
    };
    const updatePreference = () => {
      setCanReplay(media.matches);
      if (!media.matches) {
        running = false;
        cancelAnimationFrame(frame);
        frame = 0;
        setPhase(2);
      } else if (visible && !started) start();
    };
    play.current = start;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.85;
        if (visible && !started && media.matches) start();
        else resume();
      },
      { threshold: 0.85 },
    );
    observer.observe(element);
    updatePreference();
    media.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", resume);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", resume);
      play.current = () => {};
    };
  }, []);

  return (
    <section className="tk-journey" id="ticket-board" aria-labelledby="ticket-journey-title">
      <div className="tk-wrap">
        <header className="tk-section-intro">
          <h2 id="ticket-journey-title">
            A clear path
            <br />
            to resolution.
          </h2>
          <p>
            Record the issue, assign the right person and keep progress visible until the work is
            done.
          </p>
        </header>
        <div className="tk-progress-shell" ref={root}>
          <header className="tk-progress-brand">
            <div>
              <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="98" height="27" />
              <span>Service support</span>
            </div>
            {canReplay && (
              <button className="tk-replay" type="button" onClick={() => play.current()}>
                <RotateCcw size={15} aria-hidden="true" />
                Replay
              </button>
            )}
          </header>
          <div className="tk-progress-body">
            <div
              className="tk-story-stages"
              aria-label="One request, from the customer’s question to resolution"
            >
              <article className="tk-story-stage" data-current={phase === 0}>
                <h3 className="tk-story-cap">Open</h3>
                <div className="tk-story-card">
                  <div className="tk-story-person">
                    <Portrait cell={16} />
                    <div>
                      <strong>Olivia Martin</strong>
                      <span>Harbour Coffee</span>
                    </div>
                  </div>
                  <blockquote>
                    “The espresso machine is losing pressure. Can someone take a look before we
                    open?”
                  </blockquote>
                  <p className="tk-stage-foot">Ben records Olivia’s request.</p>
                </div>
              </article>
              <article
                className="tk-story-stage"
                data-current={phase === 1}
                data-pending={phase < 1}
              >
                <h3 className="tk-story-cap">In progress</h3>
                <div className="tk-story-card">
                  <div className="tk-story-person">
                    <Portrait cell={8} />
                    <div>
                      <strong>Alex Chen</strong>
                      <span>Assigned to the request</span>
                    </div>
                  </div>
                  <p className="tk-story-work">Checks the machine and carries out the repair.</p>
                  <p className="tk-stage-foot">The team can see who’s handling it.</p>
                </div>
              </article>
              <article
                className="tk-story-stage"
                data-current={phase === 2}
                data-pending={phase < 2}
              >
                <h3 className="tk-story-cap">Resolved</h3>
                <div className="tk-story-card tk-story-result">
                  <div className="tk-repair-result">
                    <Check size={24} aria-hidden="true" />
                    <h4>Repair complete.</h4>
                  </div>
                  <p className="tk-story-work">Machine tested.</p>
                  <p className="tk-stage-foot">Alex marks the ticket resolved.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
        <p className="tk-range">
          Service requests. Billing queries. Aftercare.
          <span> Different processes can have their own boards.</span>
        </p>
      </div>
    </section>
  );
}

function LinkedContext() {
  return (
    <section className="tk-context-section" aria-labelledby="ticket-context-heading">
      <div className="tk-wrap tk-linked-story">
        <div className="tk-context-copy">
          <p className="tk-eyebrow">Connected to your CRM</p>
          <h2 id="ticket-context-heading">
            The customer and the job.
            <br />
            Still connected.
          </h2>
          <p>
            Link the customer and original work, so a colleague can find the context before picking
            up the issue.
          </p>
          <a className="tk-text-link" href="/features/unified-inbox">
            Explore Unified Inbox
          </a>
        </div>
        <div
          className="tk-linked-record"
          aria-label="Olivia’s request linked to her customer record and installation"
        >
          <div className="tk-linked-customer">
            <Portrait cell={16} />
            <div>
              <h3>Olivia Martin</h3>
              <p>Harbour Coffee</p>
            </div>
          </div>
          <dl>
            <div>
              <dt>Customer issue</dt>
              <dd>Pressure drops during service</dd>
            </div>
            <div>
              <dt>Related job</dt>
              <dd>Espresso machine installation</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
const FAQS = [
  [
    "Can we focus on urgent requests?",
    "Yes. Set a ticket’s priority to Low, Medium, High or Urgent, then filter by priority, stage or assigned person. Use the board for progress or the table to scan the same requests.",
  ],
  [
    "What kinds of requests can we manage?",
    "Use tickets for customer issues that need to be tracked through a process, such as service requests, equipment problems, billing queries or aftercare. Create separate boards where teams follow different processes.",
  ],
  [
    "How is this different from Unified Inbox or a sales pipeline?",
    "Unified Inbox is where your team handles messages. A sales pipeline tracks an enquiry or opportunity. Ticketing tracks a specific issue through to resolution, with its own priority, status and assigned people. A ticket can link to the customer, a pipeline item or another ticket.",
  ],
  [
    "Can more than one person work on a ticket?",
    "Yes. Assign multiple team members to the same ticket. Their portraits appear on the ticket, and you can filter the board by assignee when you need to focus on a person’s work.",
  ],
  [
    "Can we customise the information on a ticket?",
    "Yes. Add custom fields such as equipment type or site access, choose their data type and decide which boards use them. Fields can be required and shown on the card. File fields support attachments. Create tags to categorise requests, and organise your fields and tags into folders.",
  ],
  [
    "Are stage and status the same thing?",
    "They describe different things. Stages organise the board around your working process, such as Open, In progress or Waiting on customer. Status records whether the ticket is Open, Resolved or Closed. Moving a card changes its stage; update its status separately when needed.",
  ],
  [
    "What if we already use another system?",
    "We review how requests arrive, who handles them and which tools hold the customer information. Then we agree what should move into Zapla, what should stay and which connections are available. The setup follows your process rather than assuming every tool needs replacing.",
  ],
];

function LaunchAndQuestions() {
  return (
    <section className="tk-launch-section" aria-labelledby="ticket-launch-heading">
      <div className="tk-wrap">
        <div className="tk-launch-grid">
          <div>
            <p className="tk-eyebrow">Guided Launch</p>
            <h2 id="ticket-launch-heading">
              Set up around the way
              <br /> you handle requests.
            </h2>
            <p>
              Starting with email and spreadsheets, or already using a helpdesk? We work through one
              real request with you, from how it’s recorded to how the team closes it.
            </p>
            <a className="tk-text-link" href="/booking">
              Talk through your support process
            </a>
          </div>
          <div className="tk-launch-plan">
            <h3>Your ticketing setup</h3>
            <dl>
              <div>
                <dt>Boards and stages</dt>
                <dd>Agree which requests belong together and what each stage means.</dd>
              </div>
              <div>
                <dt>Priorities and people</dt>
                <dd>Define urgency and who should take responsibility for different issues.</dd>
              </div>
              <div>
                <dt>Details and related work</dt>
                <dd>
                  Set up useful fields, tags, customer links and team access. Walk through the
                  process before your team starts.
                </dd>
              </div>
            </dl>
            <p>
              Guided Launch is the required, separately priced initial setup for a new standard
              plan. Scope is agreed before work begins.
            </p>
          </div>
        </div>
        <div className="tk-faq" aria-labelledby="ticket-faq-heading">
          <header>
            <p className="tk-eyebrow">Before you get started</p>
            <h2 id="ticket-faq-heading">The practical questions.</h2>
          </header>
          <div>
            {FAQS.map(([question, answer]) => (
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
      </div>
    </section>
  );
}

export function TicketingPage() {
  return (
    <main className="zapla-feature zapla-ticketing" data-page="ticketing">
      <Opening />
      <RequestProgress />
      <LinkedContext />
      <LaunchAndQuestions />
      <section className="tk-final">
        <div className="tk-wrap">
          <div className="tk-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="tk-eyebrow">See it around your business</p>
          <h2>
            Give customer issues
            <br className="tk-desktop-break" /> a clear way through.
          </h2>
          <p>
            Bring us a request your team handles today. We’ll show you how the people, customer
            details and related work could come together in Zapla.
          </p>
          <BookCall />
        </div>
      </section>
    </main>
  );
}
