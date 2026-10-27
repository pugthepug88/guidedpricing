import { ArrowRight, Paperclip, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ticketing.css";

// Prepared product scenes. No customer system, ticket, file or message is changed.
function Portrait({ cell, small = false }: { cell: number; small?: boolean }) {
  return (
    <span
      className={`tk2-portrait${small ? " tk2-portrait-small" : ""}`}
      aria-hidden="true"
      style={{
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}
function BookCall() {
  return (
    <a className="tk2-cta" href="/booking">
      Book a Call
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Team({ full = false }: { full?: boolean }) {
  return (
    <span className="tk2-team" role="group" aria-label="Assigned to Ben Walker and Alex Chen">
      <span className="tk2-team-faces" aria-hidden="true">
        <Portrait cell={13} small />
        <Portrait cell={8} small />
      </span>
      <span>{full ? "Ben Walker + Alex Chen" : "Ben + Alex"}</span>
    </span>
  );
}
const QUEUE = [
  {
    title: "Warranty question",
    customer: "Pinetree Electrical",
    person: "Alex",
    cell: 8,
    stage: "In progress",
  },
  {
    title: "Delivery follow-up",
    customer: "Riverbank Studio",
    person: "Ben",
    cell: 13,
    stage: "Open",
  },
  {
    title: "Missing documents",
    customer: "South Lane Property",
    person: "Alex",
    cell: 8,
    stage: "Resolved",
  },
];
function SupportDesk() {
  return (
    <div
      className="tk2-desk"
      role="group"
      aria-label="Customer support list with one issue in focus and three other requests"
    >
      <header className="tk2-desk-header">
        <img src="/concept/zapla-logo-white.png" alt="Zapla" width="110" height="37" />
        <span>Customer support</span>
      </header>
      <div className="tk2-desk-content">
        <article className="tk2-focus-ticket">
          <header>
            <h2>Return visit needed</h2>
            <span className="tk2-progress-state">In progress</span>
          </header>
          <div className="tk2-requester">
            <Portrait cell={9} />
            <div>
              <strong>Mia Thompson</strong>
              <span>Brightside Studio</span>
            </div>
          </div>
          <footer>
            <Team />
            <span className="tk2-focus-priority">Medium priority</span>
          </footer>
        </article>
        <ul className="tk2-queue" aria-label="Other customer requests">
          {QUEUE.map(({ title, customer, person, cell, stage }) => (
            <li key={title}>
              <div className="tk2-queue-request">
                <strong>{title}</strong>
                <span>{customer}</span>
              </div>
              <span
                className="tk2-queue-person"
                role="group"
                aria-label={`Assigned to ${person === "Ben" ? "Ben Walker" : "Alex Chen"}`}
              >
                <Portrait cell={cell} small />
                <span>{person}</span>
              </span>
              <span className="tk2-queue-stage" data-stage={stage}>
                {stage}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
function Opening() {
  return (
    <section className="tk2-opening" aria-labelledby="ticketing-title">
      <div className="tk2-wrap tk2-opening-grid">
        <header className="tk2-opening-copy">
          <p className="tk2-eyebrow">Customer support ticketing</p>
          <h1 id="ticketing-title">
            Keep customer
            <br />
            issues moving.
          </h1>
          <p className="tk2-lead">
            Keep requests in one place, with clear priorities, responsible people and progress your
            whole team can see.
          </p>
          <div className="tk2-actions">
            <BookCall />
            <a className="tk2-link" href="#ticketing-workspace">
              See how it works
            </a>
          </div>
          <p className="tk2-plan-note">Unlimited users on both standard plans. No per-user fees.</p>
        </header>
        <SupportDesk />
      </div>
    </section>
  );
}
function CustomerContext() {
  return (
    <section className="tk2-context" aria-labelledby="ticketing-context-title">
      <div className="tk2-wrap">
        <header className="tk2-section-heading">
          <h2 id="ticketing-context-title">
            One issue.
            <br />
            Everyone has the context.
          </h2>
          <p>
            Link the request to the customer and their related work. Give the people handling it the
            background they need to follow through.
          </p>
        </header>
        <div className="tk2-context-scene">
          <img
            className="tk2-team-photo"
            src="/concept/ticketing/support-team-20261027.webp"
            alt="Two colleagues reviewing a customer request together in their office"
            width="1942"
            height="809"
            loading="lazy"
          />
          <div
            className="tk2-linked-context"
            role="group"
            aria-label="Customer and related work linked to Mia’s return-visit request"
          >
            <div className="tk2-linked-customer">
              <Portrait cell={9} />
              <div>
                <span className="tk2-field-label">Customer</span>
                <strong>Mia Thompson</strong>
                <span>Brightside Studio</span>
              </div>
            </div>
            <div className="tk2-linked-job">
              <span className="tk2-field-label">Related work</span>
              <strong>Office fit-out</strong>
              <span>Linked pipeline item</span>
            </div>
            <div className="tk2-linked-team">
              <span className="tk2-field-label">People on the ticket</span>
              <Team full />
            </div>
          </div>
        </div>
        <div className="tk2-context-foot">
          <p>For the person taking the request and the team handling the work.</p>
          <a className="tk2-link" href="/crm">
            Explore the connected CRM
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
const STAGES = [
  { stage: "New request", title: "Return request", person: "Ben", cell: 13 },
  { stage: "Investigating", title: "Replacement part", person: "Alex", cell: 8 },
  { stage: "Resolved", title: "Setup question", person: "Ben", cell: 13 },
];
function TeamWorkspace() {
  return (
    <section
      className="tk2-workspace-section"
      id="ticketing-workspace"
      aria-labelledby="ticketing-workspace-title"
    >
      <div className="tk2-wrap">
        <header className="tk2-section-heading">
          <h2 id="ticketing-workspace-title">
            Fit the way
            <br />
            your team works.
          </h2>
          <p>
            Create boards for different requests, choose your stages and keep the useful details
            with the ticket.
          </p>
        </header>
        <div className="tk2-tools-grid">
          <article className="tk2-process-tool">
            <div className="tk2-tool-copy">
              <h3>A clear place for every request.</h3>
              <p>Service, billing or aftercare. Each team can follow its own process.</p>
            </div>
            <div
              className="tk2-board-scene"
              role="group"
              aria-label="Aftercare board with custom stages and assigned people"
            >
              <div className="tk2-board-heading">
                <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="77" height="23" />
                <strong>Aftercare</strong>
              </div>
              <div className="tk2-board-lanes">
                {STAGES.map(({ stage, title, person, cell }) => (
                  <section className="tk2-board-lane" key={stage} aria-label={stage}>
                    <h4>{stage}</h4>
                    <div className="tk2-board-ticket">
                      <p>{title}</p>
                      <span>
                        <Portrait cell={cell} small />
                        {person}
                      </span>
                    </div>
                  </section>
                ))}
              </div>
            </div>
            <p className="tk2-tool-foot">
              Move tickets through the stages as your team works towards resolution.
            </p>
          </article>
          <article className="tk2-details-tool">
            <div className="tk2-tool-copy">
              <h3>The detail behind the issue.</h3>
              <p>Your fields, supporting files and tags, together on the ticket.</p>
            </div>
            <div
              className="tk2-field-preview"
              role="group"
              aria-label="Custom ticket fields, attachment and tags for an installation request"
            >
              <dl>
                <div>
                  <dt>Job type</dt>
                  <dd>Installation</dd>
                </div>
                <div>
                  <dt>Site access</dt>
                  <dd>Call on arrival</dd>
                </div>
              </dl>
              <div className="tk2-file">
                <Paperclip size={17} aria-hidden="true" />
                <span>Handover.pdf</span>
              </div>
              <div className="tk2-tags" aria-label="Ticket tags">
                <span>Aftercare</span>
                <span>Installation</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
const FAQS = [
  [
    "Can we focus on urgent requests?",
    "Yes. Set priorities to Low, Medium, High or Urgent. Filter by priority, stage or assigned person, or search by title. Switch between board and table views to see the same requests.",
  ],
  [
    "Can several people work on the same ticket?",
    "Yes. Assign more than one team member to a ticket and keep their responsibility visible. A ticket can also link to the customer, a pipeline item or another ticket.",
  ],
  [
    "What can we customise?",
    "Create boards and stages for different processes. Add custom fields, choose which boards use them, and decide whether they are required or visible on the card. File fields support attachments. Tags help categorise requests; folders organise your fields and tags.",
  ],
  [
    "How does it work with Inbox and Pipeline?",
    "Unified Inbox handles your messages. Pipeline tracks enquiries and opportunities. Ticketing gives a customer issue its own process, priority and responsible people, with links to the relevant contact and related work.",
  ],
  [
    "Are stage and status different?",
    "Yes. Stages reflect your working process, such as New request, Investigating or Waiting on customer. Status records whether a ticket is Open, Resolved or Closed. Your team moves the card and updates its status separately when needed.",
  ],
  [
    "What if we already use a helpdesk?",
    "We review how requests arrive, how your team handles them and where the customer information sits. Then we agree what should move into Zapla, what should stay and which connections are available.",
  ],
];
function Setup() {
  return (
    <section className="tk2-setup" aria-labelledby="ticketing-setup-title">
      <div className="tk2-wrap tk2-setup-panel">
        <div className="tk2-setup-copy">
          <p className="tk2-eyebrow">Guided Launch</p>
          <h2 id="ticketing-setup-title">
            Get your team
            <br />
            working together.
          </h2>
          <p>
            Starting with email and spreadsheets, or already using a helpdesk? We work through your
            support process with you and set up the boards, people and details your team needs.
          </p>
          <a className="tk2-link" href="/booking">
            Talk through your setup
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <p className="tk2-setup-terms">
            Guided Launch is the required, separately priced initial setup for a new standard plan.
            Scope is agreed before work begins.
          </p>
        </div>
        <div className="tk2-faq" aria-label="Practical ticketing questions">
          {FAQS.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function TicketingPage() {
  return (
    <main className="zapla-feature zapla-ticketing" data-page="ticketing">
      <Opening />
      <CustomerContext />
      <TeamWorkspace />
      <Setup />
      <section className="tk2-final">
        <div className="tk2-wrap">
          <div className="tk2-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="tk2-eyebrow">See it around your business</p>
          <h2>
            Give customer issues
            <br className="tk2-desktop-break" /> a clear way through.
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
