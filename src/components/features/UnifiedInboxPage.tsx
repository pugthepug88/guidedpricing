import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import "@/styles/unified-inbox.css";

const people = [
  {
    name: "Mia Thompson",
    cell: 9,
    channel: "SMS",
    subject: "Hot water replacement",
    stage: "Quote sent",
    owner: "Ben Walker",
    note: "Prefers an afternoon visit.",
    messages: [
      "Hi Mia, I’ve emailed your hot water replacement quote. Let me know if you have any questions.",
      "Thanks Ben. Does it include taking the old unit away?",
      "Yes, removal of the old unit is included in your quote.",
    ],
  },
  {
    name: "Daniel Brooks",
    cell: 5,
    channel: "Email",
    subject: "Office maintenance",
    stage: "Site visit booked",
    owner: "Alex Chen",
    note: "Reception can arrange access.",
    messages: [
      "Hi Daniel, your site visit is booked for Thursday afternoon.",
      "Thanks. Should I arrange access through reception?",
      "Yes please. I’ll ask for you at reception when I arrive.",
    ],
  },
  {
    name: "Priya Shah",
    cell: 4,
    channel: "SMS",
    subject: "Kitchen renovation",
    stage: "Enquiry received",
    owner: "Ben Walker",
    note: "Customer can send photos of the space.",
    messages: [
      "Hi Priya, thanks for getting in touch about your kitchen renovation.",
      "Would photos help before we arrange a visit?",
      "Absolutely. Send them through and we can discuss the next step.",
    ],
  },
];
function Avatar({ cell, large = false }: { cell: number; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`ui-avatar ${large ? "ui-avatar-large" : ""}`}
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="ui-cta" href="/booking">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}
function Thread({ selected = 0, compact = false }: { selected?: number; compact?: boolean }) {
  const person = people[selected];
  return (
    <div className={`ui-thread ${compact ? "ui-thread-compact" : ""}`}>
      <div className="ui-thread-heading">
        <Avatar cell={person.cell} />
        <div>
          <strong>{person.name}</strong>
          <span>{person.channel} conversation</span>
        </div>
      </div>
      <div className="ui-messages">
        {person.messages.map((message, index) => (
          <div key={message} className={`ui-message-row ${index !== 1 ? "ui-outgoing" : ""}`}>
            <Avatar cell={index === 1 ? person.cell : selected === 1 ? 8 : 13} />
            <div>
              <span className="ui-message-author">
                {index === 1 ? person.name.split(" ")[0] : person.owner.split(" ")[0]}
              </span>
              <p>{message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Context({ selected = 0 }: { selected?: number }) {
  const person = people[selected];
  return (
    <div className="ui-context">
      <span className="ui-small-label">Customer context</span>
      <div className="ui-context-person">
        <Avatar cell={person.cell} large />
        <strong>{person.name}</strong>
      </div>
      <dl>
        {[
          ["Enquiry", person.subject],
          ["Pipeline stage", person.stage],
          ["Contact owner", person.owner],
        ].map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="ui-record-note">
        <span>Customer note</span>
        <p>{person.note}</p>
      </div>
    </div>
  );
}
function InboxScene() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="ui-blue-stage" id="inbox-demo">
      <div className="ui-stage-caption">
        <span>One place to pick up the conversation.</span>
        <span>Messages + customer context</span>
      </div>
      <div className="ui-glass-shell">
        <div className="ui-shell-bar">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" />
          <span>Unified Inbox</span>
        </div>
        <div className="ui-inbox-grid">
          <div className="ui-conversation-list">
            <h2>Conversations</h2>
            <p className="ui-list-hint">Choose a conversation</p>
            <div className="ui-conversation-options">
              {people.map((person, i) => (
                <button
                  key={person.name}
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  <Avatar cell={person.cell} />
                  <span>
                    <strong>{person.name}</strong>
                    <small>{person.subject}</small>
                    <em>{person.channel}</em>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <Thread selected={selected} />
          <Context selected={selected} />
        </div>
      </div>
    </div>
  );
}
const views = [
  {
    label: "Read the conversation",
    title: "Start with what the customer actually said.",
    copy: "Open the message and see the exchange around it. Your reply starts with the conversation, rather than a search through someone else’s inbox.",
  },
  {
    label: "See the customer context",
    title: "Know what the message relates to.",
    copy: "Keep the customer profile, notes and pipeline stage beside the conversation. Check the history before answering a question about a quote or appointment.",
  },
  {
    label: "Pick up as a team",
    title: "The next person can see what happened.",
    copy: "A visible contact owner and shared customer history help your team understand who is involved and what has already been discussed.",
  },
];
function Explore() {
  const [active, setActive] = useState(0);
  return (
    <section className="ui-section ui-explore" aria-labelledby="explore-heading">
      <div className="ui-wrap">
        <div className="ui-section-intro">
          <p className="ui-eyebrow">A better starting point for every reply</p>
          <h2 id="explore-heading">
            See the message.
            <br />
            Understand the customer.
          </h2>
        </div>
        <div className="ui-view-buttons" aria-label="Explore the inbox">
          {views.map((view, i) => (
            <button
              type="button"
              key={view.label}
              aria-pressed={active === i}
              aria-controls="inbox-view"
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {view.label}
            </button>
          ))}
        </div>
        <div id="inbox-view" className="ui-explore-layout" aria-live="polite">
          <div className="ui-explore-copy">
            <h3>{views[active].title}</h3>
            <p>{views[active].copy}</p>
            <a href="/crm" className="ui-text-link">
              Explore Zapla CRM <ArrowRight size={17} />
            </a>
          </div>
          <div className="ui-explore-surface">
            {active === 0 ? (
              <Thread compact />
            ) : active === 1 ? (
              <Context />
            ) : (
              <div className="ui-handover">
                <span className="ui-small-label">Same customer. Shared history.</span>
                <div className="ui-handover-people">
                  <Avatar cell={13} large />
                  <span>
                    Ben Walker
                    <br />
                    <small>Contact owner</small>
                  </span>
                </div>
                <div className="ui-handover-note">
                  <span>Customer note</span>
                  <p>Mia asked whether the quote includes removal. Ben confirmed that it does.</p>
                </div>
                <div className="ui-handover-people">
                  <Avatar cell={8} large />
                  <span>
                    Alex Chen
                    <br />
                    <small>Can pick up with the context</small>
                  </span>
                </div>
                <p className="ui-handover-end">
                  The conversation stays with Mia’s customer record.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "Which messages can I manage in Zapla?",
    "SMS and email conversations can sit alongside the customer record. During Guided Launch, we confirm the channels and accounts you want to connect and how your team will use them.",
  ],
  [
    "Can I see customer information alongside a conversation?",
    "Yes. The inbox connects conversations with the customer profile, so your team can see relevant history and information such as notes, contact owner and pipeline stage.",
  ],
  [
    "Can the whole team use it?",
    "Zapla includes unlimited users. We help you set up team access around the way your business works. SMS, email and other usage services have separate usage costs.",
  ],
  [
    "What if I already have a CRM or specialist software?",
    "We start by reviewing your current tools and where customer conversations happen. Then we agree what belongs in Zapla and which connections are available, before recommending a move.",
  ],
  [
    "Is Unified Inbox the same as AI Chatbot?",
    "They do different jobs. The inbox is where your team manages customer conversations and context. AI Chatbot is the separate capability for automated customer conversations.",
  ],
  [
    "How do we get started?",
    "Book a call to walk through your current enquiry process. Guided Launch helps map the setup, customer information and team workflow so you have a practical starting point.",
  ],
];
export function UnifiedInboxPage() {
  return (
    <main className="zapla-inbox" data-page="unified-inbox">
      <section className="ui-hero">
        <div className="ui-wrap">
          <div className="ui-hero-copy">
            <p className="ui-eyebrow">Unified Inbox</p>
            <h1>
              The conversation is here.
              <br />
              So is the context.
            </h1>
            <p className="ui-lead">
              Bring customer messages and customer history together, so your team can pick up the
              conversation without asking people to repeat themselves.
            </p>
            <div className="ui-actions">
              <Cta />
              <a className="ui-secondary" href="#inbox-demo">
                See the inbox <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="ui-hero-note">
              Unlimited users. Customer history included. Guided Launch.
            </p>
          </div>
          <InboxScene />
        </div>
      </section>
      <section className="ui-section ui-problems">
        <div className="ui-wrap ui-problem-layout">
          <h2>
            Less searching.
            <br />
            More useful replies.
          </h2>
          <div className="ui-benefit-list">
            {[
              [
                "The message is easy to find.",
                "Bring SMS and email conversations into a shared view, instead of checking separate inboxes.",
              ],
              [
                "The context is already there.",
                "See the customer record around the message, rather than asking the customer to explain everything again.",
              ],
              [
                "The conversation stays with the business.",
                "Keep customer history available when another team member needs to pick up.",
              ],
            ].map(([title, copy]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Explore />
      <section className="ui-section ui-human">
        <div className="ui-wrap ui-human-grid">
          <div className="ui-human-photo">
            <img
              src="/concept/industries/trades-office.webp"
              alt="A business team member responding to customers from the office"
              loading="lazy"
              width="1536"
              height="1024"
            />
            <div className="ui-photo-caption">
              Good service shouldn’t depend on
              <br />
              who answered last.
            </div>
          </div>
          <div className="ui-human-copy">
            <p className="ui-eyebrow">Built around the people replying</p>
            <h2>
              A familiar customer.
              <br />
              Even to the next person.
            </h2>
            <p>
              When a colleague is on a job, on leave or simply busy, the customer’s history should
              still be within reach.
            </p>
            <p>
              Give the person replying the messages, notes and customer information they need to
              continue the conversation.
            </p>
            <div className="ui-fit-note">
              <strong>Start from where you are.</strong>
              <p>
                Using spreadsheets and separate inboxes? Bring the customer information together.
                Already using a CRM? We’ll review how Zapla fits alongside your current tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ui-section ui-connected">
        <div className="ui-wrap ui-connected-grid">
          <div>
            <p className="ui-eyebrow">Connected to the next step</p>
            <h2>
              A reply is part
              <br />
              of the customer story.
            </h2>
            <p>
              A question about a quote. A change to an appointment. A response to a follow up. Keep
              that conversation connected to the customer and the work around them.
            </p>
            <div className="ui-dark-links">
              <a href="/crm">
                Customer records <ArrowRight size={16} />
              </a>
              <a href="/follow-up">
                Follow up <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="ui-story">
            <div className="ui-story-message">
              <Avatar cell={9} />
              <div>
                <span>Mia · SMS</span>
                <p>Does it include taking the old unit away?</p>
              </div>
            </div>
            <div className="ui-story-line" aria-hidden="true" />
            <div className="ui-story-record">
              <span>Attached to Mia’s record</span>
              <h3>Hot water replacement</h3>
              <dl>
                <div>
                  <dt>Stage</dt>
                  <dd>Quote sent</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>Ben Walker</dd>
                </div>
              </dl>
              <p>Ben can answer with the quote and conversation in view.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="ui-section ui-setup">
        <div className="ui-wrap">
          <div className="ui-setup-heading">
            <div>
              <p className="ui-eyebrow">Guided Launch</p>
              <h2>
                Make it work
                <br />
                the way your team does.
              </h2>
            </div>
            <p>
              We help you work through the setup, starting with the conversations your business
              handles every day.
            </p>
          </div>
          <ol className="ui-steps">
            {[
              [
                "Choose your channels",
                "Agree which messages and accounts your team needs to manage.",
              ],
              [
                "Connect the context",
                "Bring across the agreed customer information and map the fields you use.",
              ],
              [
                "Bring in your team",
                "Set up access and walk through how enquiries and replies will be handled.",
              ],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="ui-section ui-faq">
        <div className="ui-wrap ui-faq-grid">
          <div>
            <p className="ui-eyebrow">Before you get started</p>
            <h2>
              A few practical
              <br />
              questions.
            </h2>
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
      <section className="ui-final">
        <div className="ui-wrap">
          <p className="ui-eyebrow">See it around your business</p>
          <h2>
            Let’s look at how
            <br />
            your enquiries come in.
          </h2>
          <p>
            We’ll show you where the inbox fits, what your team would see and how Guided Launch
            would work for you.
          </p>
          <Cta />
        </div>
      </section>
    </main>
  );
}
