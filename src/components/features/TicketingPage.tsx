import { Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ticketing.css";

// Prepared marketing records, not tenant data. No ticket or service action is executed.
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
type SupportTicket = {
  title: string;
  customer: string;
  priority: "High" | "Medium" | "Low";
  people: ("Ben" | "Alex")[];
};
const SUPPORT_LANES: { stage: string; tickets: SupportTicket[] }[] = [
  {
    stage: "Open",
    tickets: [
      {
        title: "Invoice question",
        customer: "Little Oak Design",
        priority: "Medium",
        people: ["Ben"],
      },
      {
        title: "Missing paperwork",
        customer: "Riverside Property",
        priority: "Low",
        people: ["Ben"],
      },
    ],
  },
  {
    stage: "In progress",
    tickets: [
      {
        title: "Equipment repair",
        customer: "Harbour Coffee",
        priority: "High",
        people: ["Ben", "Alex"],
      },
      {
        title: "Warranty query",
        customer: "Pinetree Electrical",
        priority: "Medium",
        people: ["Alex"],
      },
    ],
  },
  {
    stage: "Resolved",
    tickets: [
      {
        title: "Service follow-up",
        customer: "South Lane Clinic",
        priority: "Low",
        people: ["Alex"],
      },
      { title: "Billing query", customer: "Parkside Studio", priority: "Medium", people: ["Ben"] },
    ],
  },
];
function AssignedPeople({ people }: { people: SupportTicket["people"] }) {
  return (
    <span
      className="tk-ticket-people"
      aria-label={`Assigned to ${people.map((person) => (person === "Ben" ? "Ben Walker" : "Alex Chen")).join(" and ")}`}
    >
      <span className="tk-ticket-portraits" aria-hidden="true">
        {people.map((person) => (
          <Portrait key={person} cell={person === "Ben" ? 13 : 8} small />
        ))}
      </span>
      <span>{people.join(" + ")}</span>
    </span>
  );
}
function SupportOverview() {
  return (
    <div
      className="tk-overview"
      id="ticket-board"
      role="group"
      aria-label="Customer support board with six tickets across three stages"
    >
      <header className="tk-overview-header">
        <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="87" height="27" />
        <span>Customer support</span>
      </header>
      <div className="tk-board">
        {SUPPORT_LANES.map(({ stage, tickets }) => (
          <section className="tk-lane" key={stage} aria-label={stage}>
            <h2 className="tk-stage">{stage}</h2>
            <div className="tk-ticket-list">
              {tickets.map((ticket) => (
                <article className="tk-ticket" key={ticket.title}>
                  <h3>{ticket.title}</h3>
                  <p className="tk-ticket-customer">{ticket.customer}</p>
                  <footer>
                    <AssignedPeople people={ticket.people} />
                    <span
                      className="tk-priority"
                      data-priority={ticket.priority}
                      aria-label={`${ticket.priority} priority`}
                    >
                      {ticket.priority}
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
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
            <a className="tk-text-link" href="#ticket-context">
              See how it works
            </a>
          </div>
          <p className="tk-team-note">Unlimited users on both standard plans. No per-user fees.</p>
        </div>
        <SupportOverview />
      </div>
    </section>
  );
}
function LinkedContext() {
  return (
    <section
      className="tk-context-section"
      id="ticket-context"
      aria-labelledby="ticket-context-heading"
    >
      <div className="tk-wrap">
        <header className="tk-section-intro">
          <div>
            <p className="tk-eyebrow">Connected to your CRM</p>
            <h2 id="ticket-context-heading">
              Pick up the issue.
              <br />
              With the whole picture.
            </h2>
          </div>
          <p>
            Keep the request, customer and related job together. The office and the person doing the
            work can share responsibility, with the context to see it through.
          </p>
        </header>
        <div className="tk-case">
          <figure className="tk-case-photo">
            <img
              src="/concept/ticketing/service-team-20261026.webp"
              alt="A service coordinator and technician checking a commercial coffee machine together"
              width="1200"
              height="800"
              loading="lazy"
            />
            <figcaption>
              <h3>One request. A shared view of the work.</h3>
              <p>
                Customer details and the related installation stay with the issue as the team
                handles the repair.
              </p>
              <a className="tk-text-link" href="/crm">
                Explore the connected CRM
              </a>
            </figcaption>
          </figure>
          <article
            className="tk-case-record"
            aria-label="Harbour Coffee equipment repair, resolved by Alex and Ben"
          >
            <header>
              <h3>Equipment repair</h3>
              <span className="tk-resolved">Resolved</span>
            </header>
            <div className="tk-case-customer">
              <Portrait cell={16} />
              <div>
                <strong>Olivia Martin</strong>
                <span>Harbour Coffee</span>
              </div>
            </div>
            <div className="tk-original-request">
              <h4>Original request</h4>
              <blockquote>
                “The coffee machine is leaking. Can someone come and take a look?”
              </blockquote>
            </div>
            <dl className="tk-case-context">
              <div>
                <dt>Related job</dt>
                <dd>Espresso machine installation</dd>
              </div>
              <div>
                <dt>Assigned to</dt>
                <dd>
                  <AssignedPeople people={["Ben", "Alex"]} />
                </dd>
              </div>
            </dl>
            <div className="tk-case-outcome">
              <h4>Work completed</h4>
              <p>
                Alex replaced the seal and tested the machine. Ben confirmed the repair with Olivia
                and marked the ticket resolved.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
const PROCESSES = [
  { name: "Service requests", stages: ["Reported", "Investigating", "Resolved"] },
  { name: "Billing questions", stages: ["Query received", "Checking details", "Resolved"] },
  { name: "Aftercare", stages: ["Follow-up needed", "In progress", "Complete"] },
];
function DifferentProcesses() {
  return (
    <section className="tk-process-section" aria-labelledby="ticket-process-heading">
      <div className="tk-wrap tk-process-layout">
        <div>
          <h2 id="ticket-process-heading">
            Different requests.
            <br />
            Your own process.
          </h2>
          <p>
            Give service, billing and aftercare their own boards. Choose stages that reflect how
            each team works.
          </p>
        </div>
        <dl className="tk-processes">
          {PROCESSES.map(({ name, stages }) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>
                {stages.map((stage, index) => (
                  <span key={stage}>
                    {index > 0 && (
                      <span className="tk-stage-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                    <span>{stage}</span>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
const FAQS = [
  [
    "Can we focus on urgent requests?",
    "Yes. Set a ticket’s priority to Low, Medium, High or Urgent, then filter by priority, stage or assigned person. Use the board for progress or the table to scan the same requests. Search by title when you need a specific issue.",
  ],
  [
    "Can more than one person work on a ticket?",
    "Yes. Assign multiple team members to the same ticket. Their portraits appear on the card, and you can filter the board by assignee to focus on a person’s work.",
  ],
  [
    "Can we add our own fields, files and tags?",
    "Yes. Add custom fields for details such as equipment or site access, choose their data type and decide which boards use them. Fields can be required and shown on the card. File fields support attachments. Use tags to categorise requests, and folders to organise your fields and tags.",
  ],
  [
    "How is this different from Unified Inbox or Pipeline?",
    "Unified Inbox is where your team handles messages. Pipeline tracks enquiries and opportunities. Ticketing tracks a specific issue through to resolution, with its own priority, status and assigned people. A ticket can link to the customer, a pipeline item or another ticket.",
  ],
  [
    "Are stage and status the same thing?",
    "They describe different things. Stages organise the board around your process, such as Reported, Investigating or Waiting on customer. Status records whether the ticket is Open, Resolved or Closed. Your team moves the card through its stages and updates its status separately when needed.",
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
          </div>
          <div className="tk-launch-copy">
            <p>
              Starting with email and spreadsheets, or already using a helpdesk? We work through one
              real request with you, from how it’s recorded to how the team closes it.
            </p>
            <p>
              We map the boards and stages, agree who handles each type of request and set up the
              customer details your team needs.
            </p>
            <a className="tk-text-link" href="/booking">
              Talk through your support process
            </a>
            <p className="tk-launch-terms">
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
      <LinkedContext />
      <DifferentProcesses />
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
