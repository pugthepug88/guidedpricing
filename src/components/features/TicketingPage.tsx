import { useEffect, useState } from "react";
import { Paperclip, Plus } from "lucide-react";
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

type SupportTicket = {
  id: string;
  title: string;
  customer: string;
  stage: "Open" | "In progress" | "Resolved";
  priority: "Urgent" | "High" | "Medium" | "Low";
  people: ("Ben Walker" | "Alex Chen")[];
  detail?: string;
};

// Fixed service-business records. The controls filter only this local presentation.
const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "grinder",
    title: "Grinder stops during service",
    customer: "West End Espresso",
    stage: "Open",
    priority: "Urgent",
    people: ["Ben Walker"],
  },
  {
    id: "charge",
    title: "Incorrect service charge",
    customer: "Little Oak Café",
    stage: "Open",
    priority: "High",
    people: ["Ben Walker"],
  },
  {
    id: "access",
    title: "Missing service paperwork",
    customer: "Riverside Deli",
    stage: "Open",
    priority: "Low",
    people: ["Ben Walker"],
  },
  {
    id: "harbour",
    title: "Pressure drops during service",
    customer: "Harbour Coffee",
    stage: "In progress",
    priority: "High",
    people: ["Ben Walker", "Alex Chen"],
    detail: "Technician checking the machine.",
  },
  {
    id: "part",
    title: "Replacement part update",
    customer: "Northline Coffee",
    stage: "In progress",
    priority: "Medium",
    people: ["Alex Chen"],
  },
  {
    id: "warranty",
    title: "Warranty cover query",
    customer: "Pinetree Kitchen",
    stage: "In progress",
    priority: "Medium",
    people: ["Ben Walker"],
  },
  {
    id: "leak",
    title: "Water leaking below machine",
    customer: "South Lane Coffee",
    stage: "Resolved",
    priority: "High",
    people: ["Alex Chen"],
    detail: "Seal replaced and machine tested.",
  },
  {
    id: "invoice",
    title: "Invoice query clarified",
    customer: "Parkside Bistro",
    stage: "Resolved",
    priority: "Low",
    people: ["Ben Walker"],
    detail: "Service charge explained to the customer.",
  },
];

function AssignedPeople({ people }: { people: SupportTicket["people"] }) {
  return (
    <span
      className="tk-ticket-people"
      role="group"
      aria-label={`Assigned to ${people.join(" and ")}`}
    >
      {people.map((person) => (
        <Portrait key={person} cell={person === "Ben Walker" ? 13 : 8} small />
      ))}
      <span>{people.length > 1 ? "Ben + Alex" : people[0]}</span>
    </span>
  );
}

function SupportCard({ ticket }: { ticket: SupportTicket }) {
  return (
    <article
      className="tk-support-card"
      data-ticket={ticket.id}
      data-featured={ticket.id === "harbour"}
      aria-label={`${ticket.title}, ${ticket.customer}, ${ticket.priority} priority`}
    >
      <div className="tk-support-card-title">
        <h4>{ticket.title}</h4>
        <span className="tk-ticket-priority" data-priority={ticket.priority}>
          {ticket.priority}
        </span>
      </div>
      <p className="tk-ticket-customer">{ticket.customer}</p>
      {ticket.detail && <p className="tk-ticket-detail">{ticket.detail}</p>}
      <footer>
        <AssignedPeople people={ticket.people} />
      </footer>
    </article>
  );
}

function RequestProgress() {
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => {
    setEnhanced(true);
  }, []);
  const tickets = SUPPORT_TICKETS.filter(
    (ticket) => !urgentOnly || ticket.priority === "Urgent" || ticket.priority === "High",
  );

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
            See what’s waiting, what’s being handled and what’s resolved. Give each request a
            priority and the right people.
          </p>
        </header>
        <div className="tk-progress-shell">
          <header className="tk-progress-brand">
            <div>
              <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="98" height="27" />
              <span>Service support</span>
            </div>
            {enhanced && (
              <div
                className="tk-priority-filter"
                role="group"
                aria-label="Filter tickets by priority"
              >
                <button
                  type="button"
                  aria-pressed={!urgentOnly}
                  aria-controls="support-tickets"
                  onClick={() => setUrgentOnly(false)}
                >
                  All tickets
                </button>
                <button
                  type="button"
                  aria-pressed={urgentOnly}
                  aria-controls="support-tickets"
                  onClick={() => setUrgentOnly(true)}
                >
                  Urgent &amp; high
                </button>
              </div>
            )}
          </header>
          <div
            className="tk-support-board"
            id="support-tickets"
            role="group"
            aria-label="Service support tickets"
          >
            {(["Open", "In progress", "Resolved"] as const).map((stage) => (
              <section className="tk-support-lane" key={stage} aria-label={stage}>
                <h3 className="tk-stage-cap">{stage}</h3>
                <div className="tk-ticket-list">
                  {tickets
                    .filter((ticket) => ticket.stage === stage)
                    .map((ticket) => (
                      <SupportCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <p className="tk-sr-only" role="status" aria-live="polite">
          {urgentOnly ? "Showing urgent and high priority tickets." : "Showing all tickets."}
        </p>
        <div className="tk-board-context">
          <p>
            <strong>Focus on what needs attention.</strong> Filter by priority, stage or assigned
            person.
          </p>
          <p>
            <strong>Keep different processes organised.</strong> Give service support, billing
            queries and aftercare their own boards.
          </p>
        </div>
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
            Keep the original request, customer and related work together, so the next person can
            pick up the issue with the context they need.
          </p>
          <dl className="tk-context-reasons">
            <div>
              <dt>One issue. The right people.</dt>
              <dd>
                Assign the office and the technician to the same ticket. Responsibility stays
                visible as the work progresses.
              </dd>
            </div>
            <div>
              <dt>Useful details, ready for the team.</dt>
              <dd>
                Add fields for equipment or site access, attach supporting files and use tags to
                keep related requests easy to recognise.
              </dd>
            </div>
          </dl>
          <a className="tk-text-link" href="/crm">
            Explore the connected CRM
          </a>
        </div>
        <div
          className="tk-detail-card"
          role="group"
          aria-label="Harbour Coffee ticket with customer, assignees and service details"
        >
          <header className="tk-detail-brand">
            <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="86" height="26" />
            <span>Ticket details</span>
          </header>
          <div className="tk-detail-content">
            <div className="tk-detail-customer">
              <Portrait cell={16} />
              <div>
                <strong>Olivia Martin</strong>
                <span>Harbour Coffee</span>
              </div>
            </div>
            <h3>Pressure drops during service</h3>
            <div className="tk-detail-state">
              <span>In progress</span>
              <span>High priority</span>
            </div>
            <blockquote>
              “The espresso machine is losing pressure. Can someone take a look before we open?”
            </blockquote>
            <div className="tk-detail-owners">
              <span>Assigned to</span>
              <div>
                <span>
                  <Portrait cell={13} small />
                  Ben Walker
                </span>
                <span>
                  <Portrait cell={8} small />
                  Alex Chen
                </span>
              </div>
            </div>
            <dl className="tk-detail-fields">
              <div className="tk-detail-job">
                <dt>Related job</dt>
                <dd>Espresso machine installation</dd>
              </div>
              <div>
                <dt>Equipment</dt>
                <dd>Two-group espresso machine</dd>
              </div>
              <div>
                <dt>Site access</dt>
                <dd>Ask for Olivia at the counter</dd>
              </div>
            </dl>
            <footer className="tk-detail-supporting">
              <span className="tk-detail-file">
                <Paperclip size={16} aria-hidden="true" />
                Pressure reading.jpg
              </span>
              <span className="tk-detail-tags" aria-label="Tags">
                <span>Equipment</span>
                <span>Repair</span>
              </span>
            </footer>
          </div>
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
