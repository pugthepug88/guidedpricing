import { useEffect, useRef, useState } from "react";
import { Columns3, List, Paperclip, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ticketing.css";

// Prepared local records explain the documented product. No customer service is invoked.
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

function Priority({ value }: { value: string }) {
  return <span className={`tk-priority tk-priority-${value.toLowerCase()}`}>{value}</span>;
}

function TicketHero() {
  const scene = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(2);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 860px) and (prefers-reduced-motion: no-preference)",
    );
    if (!media.matches) return;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let visible = false;
    let started = false;
    let complete = false;
    let lastPhase = 0;
    const tick = (time: number) => {
      if (complete) return;
      if (!media.matches) {
        setPhase(2);
        complete = true;
        return;
      }
      if (visible && !document.hidden) {
        elapsed += previous ? Math.min(time - previous, 80) : 0;
        const next = elapsed >= 3000 ? 2 : elapsed >= 1400 ? 1 : 0;
        if (next !== lastPhase) {
          setPhase(next);
          lastPhase = next;
        }
        if (next === 2) {
          complete = true;
          return;
        }
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !started) {
          started = true;
          setPhase(0);
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.7 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="tk-hero-material" ref={scene}>
      <div
        className="tk-hero-ticket"
        aria-label={
          phase > 0 ? "A customer issue assigned to Alex Chen" : "A customer support request"
        }
      >
        <header className="tk-ticket-brand">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="104" height="28" />
          <span>Service support</span>
        </header>
        <div className="tk-ticket-heading">
          <Priority value="High" />
          <h2>
            Pressure drops
            <br /> during service
          </h2>
          <div className="tk-customer">
            <Portrait cell={16} />
            <span>
              Olivia Martin<strong>Harbour Coffee</strong>
            </span>
          </div>
        </div>
        <blockquote>
          “The espresso machine is losing pressure. Can someone take a look before we open?”
        </blockquote>
        <dl className="tk-hero-fields">
          <div>
            <dt>Assigned to</dt>
            <dd className="tk-assignee" data-assigned={phase > 0}>
              {phase > 0 ? (
                <>
                  <Portrait cell={8} small />
                  Alex Chen
                </>
              ) : (
                "Not yet assigned"
              )}
            </dd>
          </div>
          <div>
            <dt>Stage</dt>
            <dd>
              <span className="tk-stage-state" data-progress={phase === 2}>
                {phase === 2 ? "In progress" : "Open"}
              </span>
            </dd>
          </div>
        </dl>
        <div className="tk-hero-related">
          <span>Linked pipeline item</span>
          <strong>Espresso machine installation</strong>
        </div>
      </div>
      <div className="tk-human-action" aria-live="off">
        <Portrait cell={phase < 2 ? 13 : 8} small />
        <p>
          {phase === 0
            ? "Ben records Olivia’s request."
            : phase === 1
              ? "Ben assigns Alex to the ticket."
              : "Alex moves the ticket to In progress."}
        </p>
      </div>
    </div>
  );
}

const STAGES = ["Open", "In progress", "Waiting on customer", "Resolved"] as const;
type Stage = (typeof STAGES)[number];
type Ticket = {
  title: string;
  customer: string;
  stage: Stage;
  priority: string;
  person: string;
  cell: number;
  tag: string;
};
const TICKETS: Ticket[] = [
  {
    title: "Water leaking from machine",
    customer: "The Corner Cafe",
    stage: "Open",
    priority: "Urgent",
    person: "Ben Walker",
    cell: 13,
    tag: "Repair",
  },
  {
    title: "Pressure drops during service",
    customer: "Harbour Coffee",
    stage: "In progress",
    priority: "High",
    person: "Alex Chen",
    cell: 8,
    tag: "Aftercare",
  },
  {
    title: "Confirm access for a service visit",
    customer: "Parkside Espresso",
    stage: "Waiting on customer",
    priority: "Medium",
    person: "Ben Walker",
    cell: 13,
    tag: "Site access",
  },
  {
    title: "Replacement filter fitted",
    customer: "Little Lane Coffee",
    stage: "Resolved",
    priority: "Medium",
    person: "Alex Chen",
    cell: 8,
    tag: "Repair",
  },
  {
    title: "Check grinder settings",
    customer: "West End Coffee",
    stage: "Open",
    priority: "Low",
    person: "Alex Chen",
    cell: 8,
    tag: "Equipment",
  },
  {
    title: "Updated service instructions",
    customer: "Market Street Cafe",
    stage: "Resolved",
    priority: "Low",
    person: "Ben Walker",
    cell: 13,
    tag: "Aftercare",
  },
];

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <article className="tk-board-card">
      <Priority value={ticket.priority} />
      <h4>{ticket.title}</h4>
      <p>{ticket.customer}</p>
      <span className="tk-tag">{ticket.tag}</span>
      <div className="tk-card-person">
        <Portrait cell={ticket.cell} small />
        <span>{ticket.person}</span>
      </div>
    </article>
  );
}

function TicketBoard() {
  const [view, setView] = useState<"board" | "table">("board");
  const [priorityOnly, setPriorityOnly] = useState(false);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => setInteractive(true), []);
  const tickets = priorityOnly
    ? TICKETS.filter((ticket) => ["Urgent", "High"].includes(ticket.priority))
    : TICKETS;

  return (
    <section className="tk-work-section" id="ticket-board" aria-labelledby="ticket-board-heading">
      <div className="tk-wrap">
        <header className="tk-section-intro">
          <div>
            <p className="tk-eyebrow">The team’s shared view</p>
            <h2 id="ticket-board-heading">
              What needs attention.
              <br />
              Who’s handling it.
            </h2>
          </div>
          <p>
            Scan open requests, see what’s underway and spot what’s waiting on a customer. Filter by
            priority when the most pressing issues need your attention first.
          </p>
        </header>
        <div className="tk-board-frame">
          <div className="tk-board-toolbar">
            <h3>Service support</h3>
            <div className="tk-board-controls" data-ready={interactive}>
              <div className="tk-filter" role="group" aria-label="Filter tickets by priority">
                <button
                  type="button"
                  aria-pressed={!priorityOnly}
                  aria-controls="ticket-results"
                  onClick={() => setPriorityOnly(false)}
                >
                  All priorities
                </button>
                <button
                  type="button"
                  aria-pressed={priorityOnly}
                  aria-controls="ticket-results"
                  onClick={() => setPriorityOnly(true)}
                >
                  High & urgent
                </button>
              </div>
              <div className="tk-view-switch" role="group" aria-label="Ticket view">
                <button
                  type="button"
                  aria-pressed={view === "board"}
                  aria-controls="ticket-results"
                  onClick={() => setView("board")}
                >
                  <Columns3 size={16} aria-hidden="true" />
                  Board
                </button>
                <button
                  type="button"
                  aria-pressed={view === "table"}
                  aria-controls="ticket-results"
                  onClick={() => setView("table")}
                >
                  <List size={17} aria-hidden="true" />
                  Table
                </button>
              </div>
            </div>
          </div>
          <div id="ticket-results" className="tk-results">
            <p className="tk-sr-only" role="status">
              {priorityOnly ? "Showing high and urgent priority tickets." : "Showing all tickets."}{" "}
              {view === "board" ? "Board view." : "Table view."}
            </p>
            {view === "board" ? (
              <div className="tk-board">
                {STAGES.map((stage, index) => (
                  <section
                    key={stage}
                    className={`tk-lane tk-lane-${index}`}
                    aria-label={`${stage} tickets`}
                  >
                    <h3>{stage}</h3>
                    <div className="tk-lane-cards">
                      {tickets
                        .filter((ticket) => ticket.stage === stage)
                        .map((ticket) => (
                          <TicketCard key={ticket.title} ticket={ticket} />
                        ))}
                      {!tickets.some((ticket) => ticket.stage === stage) && (
                        <p className="tk-empty">No high or urgent tickets</p>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <table className="tk-table">
                <caption className="tk-sr-only">
                  The same service requests, organised in a table
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Request</th>
                    <th scope="col">Stage</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Assigned to</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.title}>
                      <td>
                        <strong>{ticket.title}</strong>
                        <span>{ticket.customer}</span>
                      </td>
                      <td>
                        <span className="tk-mobile-label">Stage</span>
                        {ticket.stage}
                      </td>
                      <td>
                        <span className="tk-mobile-label">Priority</span>
                        <Priority value={ticket.priority} />
                      </td>
                      <td>
                        <span className="tk-mobile-label">Assigned to</span>
                        <span className="tk-table-person">
                          <Portrait cell={ticket.cell} small />
                          {ticket.person}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="tk-board-reasons">
          <div>
            <h3>A queue for each process.</h3>
            <p>Keep service requests, billing queries or other support work on separate boards.</p>
          </div>
          <div>
            <h3>People attached to the work.</h3>
            <p>Assign one person or bring several team members onto the same ticket.</p>
          </div>
          <div>
            <h3>Progress the team can see.</h3>
            <p>
              Move a ticket between stages as the work changes. Set its status to Resolved or Closed
              when appropriate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectedContext() {
  return (
    <section className="tk-context-section" aria-labelledby="ticket-context-heading">
      <div className="tk-wrap tk-context-shell">
        <div className="tk-context-copy">
          <p className="tk-eyebrow">The details behind the issue</p>
          <h2 id="ticket-context-heading">
            The customer.
            <br />
            The issue.
            <br />
            The job behind it.
          </h2>
          <p>
            A service problem makes more sense when you can see the customer and the original work.
            Link the ticket to both, so the next person can find the details they need.
          </p>
          <figure className="tk-work-photo">
            <img
              src="/concept/ticketing/service-team-20261026.webp"
              alt="A service coordinator and technician checking a commercial espresso machine together"
              width="1200"
              height="800"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="tk-context-record">
          <header>
            <span>Customer support ticket</span>
            <h3>Pressure drops during service</h3>
          </header>
          <div className="tk-record-customer">
            <Portrait cell={16} />
            <div>
              <span>Linked customer</span>
              <strong>Olivia Martin</strong>
              <p>Harbour Coffee</p>
            </div>
          </div>
          <div className="tk-record-linked">
            <span>Related pipeline item</span>
            <h4>Espresso machine installation</h4>
            <p>The original installation, linked to the request.</p>
          </div>
          <div className="tk-custom-fields">
            <h4>The details your team needs</h4>
            <dl>
              <div>
                <dt>Equipment</dt>
                <dd>Commercial espresso machine</dd>
              </div>
              <div>
                <dt>Site access</dt>
                <dd>Before the cafe opens</dd>
              </div>
              <div>
                <dt>Attachment</dt>
                <dd>
                  <Paperclip size={15} aria-hidden="true" />
                  Machine photo
                </dd>
              </div>
            </dl>
            <div className="tk-record-tags" aria-label="Ticket tags">
              <span className="tk-tag">Aftercare</span>
              <span className="tk-tag">Equipment</span>
            </div>
          </div>
          <div className="tk-fields-explanation">
            <strong>Ask for the details that matter.</strong>
            <p>
              Create your own ticket fields, make key information required and choose what appears
              on the card. Use tags to organise the kinds of requests you handle.
            </p>
          </div>
        </div>
      </div>
      <div className="tk-wrap tk-inbox-bridge">
        <div>
          <h3>The conversation and the work, connected through your customer.</h3>
          <p>
            Use Unified Inbox for the messages and Ticketing to organise the issue. Link the
            customer to keep the two parts of the service process within reach.
          </p>
        </div>
        <a className="tk-text-link" href="/features/unified-inbox">
          Explore Unified Inbox
        </a>
      </div>
    </section>
  );
}

const FAQS = [
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
              <br />
              you handle requests.
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
              A customer raises an issue. Everyone assumes someone else is on it. Give every request
              a place, a priority and people responsible, then track it through to resolution.
            </p>
            <div className="tk-actions">
              <BookCall />
              <a className="tk-text-link" href="#ticket-board">
                See the ticket board
              </a>
            </div>
            <p className="tk-team-note">
              Unlimited users on both standard plans. No per-user fees.
            </p>
          </div>
          <TicketHero />
        </div>
      </section>
      <TicketBoard />
      <ConnectedContext />
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
