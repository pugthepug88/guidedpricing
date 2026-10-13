import { AIReceptionistSection } from "@/components/industry-v3/AIReceptionistSection";
import { GoogleReviewCard, ReviewInvitation } from "@/components/industry-v3/ReviewCards";
import { useState, type ReactNode } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

const BOOK = "https://zapla.io/booking";
function Label({ children }: { children: ReactNode }) {
  return <p className="mv3-label">{children}</p>;
}
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="mv3-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Actions({ final = false }: { final?: boolean }) {
  return (
    <div className="mv3-actions">
      <a className="mv3-button" href={BOOK}>
        Book a call <ArrowRight size={17} aria-hidden="true" />
      </a>
      <Link href={final ? "/Pricing-v3" : "#client-book"}>
        {final ? "View pricing" : "See the client journey"}
      </Link>
    </div>
  );
}
function Sender({ children }: { children: ReactNode }) {
  return (
    <div className="mv3-sender">
      <ZaplaPetal size={25} />
      <span>{children}</span>
    </div>
  );
}
type Client = "priya" | "alex" | "sam";
function Avatar({ person }: { person: Client }) {
  return <span className={`mv3-avatar mv3-avatar-${person}`} aria-hidden="true" />;
}
function Choice({
  options,
  selected,
  onSelect,
  label,
}: {
  options: string[];
  selected: number;
  onSelect: (i: number) => void;
  label: string;
}) {
  return (
    <div className="mv3-choices" role="group" aria-label={label}>
      {options.map((option, i) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected === i}
          onClick={() => onSelect(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
function ReviewScene() {
  const [mode, setMode] = useState(0);
  return (
    <>
      <div className="mv3-review-controls">
        <Choice
          options={["Annual review", "Fixed rate ending"]}
          selected={mode}
          onSelect={setMode}
          label="Choose a loan review invitation example"
        />
      </div>
      <div className="mv3-review-scene">
        <img
          src="/concept/industries/mortgage-client-review.webp"
          alt="A client and her partner discussing their plans at home"
          width="1672"
          height="941"
          loading="lazy"
        />
        <div className="mv3-glass mv3-review-message">
          <Sender>Your brokerage · Review invitation</Sender>
          <h3>{mode === 0 ? "Time for your annual review." : "Your fixed rate is ending."}</h3>
          <p>
            {mode === 0
              ? "Hi Priya, it’s been a year since your home loan settled. Would you like to catch up and review your plans?"
              : "Hi Priya, your fixed rate period is coming to an end. Would you like to catch up and talk through your next steps?"}
          </p>
        </div>
        <div className="mv3-glass mv3-review-reply mv3-client-card">
          <Avatar person="priya" />
          <div>
            <strong>Priya Shah · Client reply</strong>
            <p>“Yes please. We’re thinking about our next move.”</p>
          </div>
        </div>
      </div>
    </>
  );
}
const TEAM = [
  {
    title: "New enquiry",
    person: "Alex Chen",
    avatar: "alex" as const,
    context: "Asked about buying a first home",
    message: "Can we speak after work?",
    action: "Arrange an initial conversation",
    owner: "Daniel · Broker",
    history: "Enquiry received → Automatic acknowledgement → Client replied",
  },
  {
    title: "Client review",
    person: "Priya Shah",
    avatar: "priya" as const,
    context: "Invited to an annual review",
    message: "We’re thinking about our next move.",
    action: "Arrange the review and discuss her plans",
    owner: "Daniel · Broker",
    history: "Review date reached → Invitation sent → Client replied",
  },
  {
    title: "Referral conversation",
    person: "Sam Taylor",
    avatar: "sam" as const,
    context: "Replied to a referral invitation",
    message: "My sister is looking to buy. Can I introduce you?",
    action: "Agree an introduction with Sam",
    owner: "Mei · Client services",
    history: "Invitation sent → Client replied → Team picks up",
  },
];
function TeamScene() {
  const [selected, setSelected] = useState(0);
  const item = TEAM[selected];
  return (
    <div className="mv3-team-scene">
      <Choice
        options={TEAM.map((x) => x.title)}
        selected={selected}
        onSelect={setSelected}
        label="Choose a team follow through example"
      />
      <div className="mv3-team-record" aria-live="polite">
        <div className="mv3-record-person">
          <Avatar person={item.avatar} />
          <div>
            <h3>{item.person}</h3>
            <p>{item.context}</p>
          </div>
        </div>
        <blockquote>“{item.message}”</blockquote>
        <dl>
          <div>
            <dt>Next action</dt>
            <dd>{item.action}</dd>
          </div>
          <div>
            <dt>Owned by</dt>
            <dd>{item.owner}</dd>
          </div>
        </dl>
        <p className="mv3-record-history">{item.history}</p>
      </div>
    </div>
  );
}
function ProspectSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="mv3-prospect mv3-wrap" aria-labelledby="mv3-prospect-title">
      <div className="mv3-prospect-scene">
        <img
          src="/concept/industries/mortgage-property-search.webp"
          alt="A couple viewing a home during their property search"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="mv3-glass mv3-prospect-message">
          <Sender>Your brokerage · {selected === 0 ? "Checking in" : "Reconnecting"}</Sender>
          <h3>
            {selected === 0
              ? "Still looking. Still in touch."
              : "Plans change. Open the conversation."}
          </h3>
          <p>
            {selected === 0
              ? "Hi Alex, you asked us to reconnect this month. How’s the property search going? Reply here if you’d like to arrange a chat."
              : "Hi Alex, we spoke about your property plans a while ago. If those plans are back on the table, would you like to reconnect with your broker?"}
          </p>
        </div>
      </div>
      <div className="mv3-copy">
        <Label>Before they’re ready</Label>
        <h2 id="mv3-prospect-title">A pause shouldn’t end the relationship.</h2>
        <p>Some clients are still searching. Others have put their plans on hold.</p>
        <Choice
          options={["Not ready yet", "Gone quiet"]}
          selected={selected}
          onSelect={setSelected}
          label="Choose a prospect follow up example"
        />
        <div className="mv3-prospect-detail" aria-live="polite">
          <h3>
            {selected === 0 ? "Keep the agreed next step." : "Reconnect for a relevant reason."}
          </h3>
          <p>
            {selected === 0
              ? "Zapla sends the agreed check-in at the right time. When the client replies, your broker takes over and further reminders stop."
              : "Reconnect with past enquiries through a relevant message. When someone responds, your team picks up with the earlier conversation in view."}
          </p>
          <Link href={selected === 0 ? "/follow-up" : "/reactivation"}>
            {selected === 0 ? "Explore Follow-Up" : "Explore Reactivation"}
          </Link>
        </div>
      </div>
    </section>
  );
}
const FAQS = [
  [
    "We use spreadsheets. Can Zapla be our CRM?",
    "Yes. Zapla can hold your client contacts, conversations and next actions, with follow up configured around your process. Guided Launch can include importing the agreed contacts from spreadsheets or exports. Loan applications and lender research stay in the appropriate lending tools.",
  ],
  [
    "We already have a CRM. Why add Zapla?",
    "Only where there is a useful gap to fix. We look at enquiry response, ongoing client contact, reactivation and reply ownership against what your current system already does. The data approach and scope are confirmed before setup. If your existing workflow handles the work well, keep using it.",
  ],
  [
    "Does Zapla connect to our existing software?",
    "We review your software and available connection options before setup. The approach depends on your existing system, so we confirm how client information and review dates will stay up to date rather than promise a connection we have not checked.",
  ],
  [
    "What happens when a client replies or books?",
    "Replies return to the team member responsible for the client, with the conversation history attached. Relevant reminders stop when the client responds. Booking handling depends on your calendar and connection, which we confirm and test during setup.",
  ],
  [
    "Can you help with missed calls and document reminders?",
    "AI Receptionist is optional and can capture routine enquiries and callback requests for your team. Zapla can also send reminders for agreed forms or portal links. Financial documents stay in your lending portal, and reminders stop on completion where that update is available.",
  ],
  [
    "How do review and referral invitations work?",
    "Choose when to invite an honest Google review or ask whether a client would like to make an introduction. Replies return to your team. Your team handles introductions personally and contacts the referred person once they have agreed to be contacted.",
  ],
  [
    "Who decides what gets sent?",
    "Your brokerage chooses the clients, messages and timing. We configure contact preferences, exclusions and opt-outs around your process. Loan reviews and financial advice stay with your broker.",
  ],
];
export function MortgageBrokersPage() {
  return (
    <main className="mortgage-brokers-v3-page" data-page="mortgage-brokers">
      <section className="mv3-hero mv3-wrap" aria-labelledby="mv3-title">
        <div className="mv3-hero-copy">
          <Label>For mortgage brokers</Label>
          <h1 id="mv3-title">
            Be the broker
            <br />
            they come back to.
            <br />
            <span>And recommend.</span>
          </h1>
          <p className="mv3-intro">
            Keep client records, conversations and next steps together. Zapla automates enquiry
            follow up, review invitations and ongoing contact, so you can spend more time with
            clients.
          </p>
          <Actions />
        </div>
        <div className="mv3-hero-scene">
          <img
            src="/concept/industries/mortgage-broker-consultation.webp"
            alt="A mortgage broker talking with clients about their property plans"
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <div className="mv3-glass mv3-hero-client mv3-client-card">
            <Avatar person="priya" />
            <div>
              <strong>Priya Shah · Returning client</strong>
              <p>“You helped us with our first home. Can we talk about our next move?”</p>
            </div>
          </div>
          <div className="mv3-glass mv3-hero-owner">
            <div className="mv3-human-owner">Client record · Assigned to Daniel</div>
            <p>
              Priya’s reply and client history.
              <br />
              <strong>Ready for the next conversation.</strong>
            </p>
          </div>
        </div>
      </section>
      <section className="mv3-recognition mv3-wrap" aria-labelledby="mv3-outcome-title">
        <div>
          <Label>The client relationship</Label>
          <h2 id="mv3-outcome-title">
            Your client book
            <br />
            holds more than
            <br />
            past settlements.
          </h2>
        </div>
        <div className="mv3-moments">
          <article>
            <span>A review is due</span>
            <h3>
              Stay their
              <br />
              first call.
            </h3>
            <p>
              Reviews can slip when work gets busy. Keep invitations moving and replies with the
              right broker.
            </p>
          </article>
          <article>
            <span>A client recommends you</span>
            <h3>
              Earn the next
              <br />
              introduction.
            </h3>
            <p>
              Give clients a simple way to recommend you, then give the introduction a clear next
              step.
            </p>
          </article>
          <article>
            <span>They’re not ready yet</span>
            <h3>
              Follow up when
              <br />
              they’re ready.
            </h3>
            <p>
              A prospect asks you to reconnect next month. Keep that next step attached to the
              conversation.
            </p>
          </article>
        </div>
      </section>
      <section className="mv3-team" aria-labelledby="mv3-team-title">
        <div className="mv3-wrap mv3-team-layout">
          <div className="mv3-copy">
            <Label>Client records and follow through</Label>
            <h2 id="mv3-team-title">
              One client record.
              <br />A clear next step.
            </h2>
            <p>
              A reply in one inbox. A follow up date in a spreadsheet. An introduction waiting for a
              call. It’s easy for the next step to lose its owner.
            </p>
            <p>
              Zapla brings client records, conversations and next actions together. Whether it’s
              just you or your whole team, each client has a history and someone responsible for
              what happens next.
            </p>
            <Link href="/crm">Explore the connected CRM</Link>
          </div>
          <TeamScene />
        </div>
      </section>
      <section id="client-book" className="mv3-retention" aria-labelledby="mv3-review-title">
        <div className="mv3-wrap">
          <div className="mv3-wide-heading">
            <div>
              <Label>After settlement</Label>
              <h2 id="mv3-review-title">
                Stay their broker.
                <br />
                Long after the loan settles.
              </h2>
            </div>
            <div>
              <p>
                Annual reviews and fixed rate end dates give you a reason to reconnect, without
                waiting for clients to ask first.
              </p>
              <p>
                Zapla sends invitations on your review schedule and returns replies to your broker.
                Consistent service supports the relationships behind trail income and repeat
                business.
              </p>
              <Link href="/customer-marketing">Explore Customer Marketing</Link>
            </div>
          </div>
          <ReviewScene />
        </div>
      </section>
      <section className="mv3-reputation mv3-wrap" aria-labelledby="mv3-reputation-title">
        <div className="mv3-copy">
          <Label>Trust that carries forward</Label>
          <h2 id="mv3-reputation-title">
            Make it easy
            <br />
            to recommend you.
          </h2>
          <p>
            An honest review helps future clients decide whether to contact you. A personal
            introduction starts a new conversation.
          </p>
          <p>
            Zapla sends the invitation at the time you choose and brings replies back to your team.
          </p>
          <Link href="/reviews">Explore Reviews &amp; Reputation</Link>
          <div className="mv3-referral-conversation">
            <Sender>Your brokerage · Staying in touch</Sender>
            <p>
              If someone you know is thinking about their next property move, you’re welcome to
              introduce us.
            </p>
            <div className="mv3-referral-reply mv3-client-card">
              <Avatar person="sam" />
              <div>
                <strong>Sam Taylor · Client reply</strong>
                <p>“My sister is looking to buy. Can I introduce you?”</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mv3-reputation-scene"
          aria-label="Google review invitation and five unselected rating stars"
        >
          <div className="mv3-review-event">Settlement completed</div>
          <ReviewInvitation sender="Your brokerage · Review invitation">
            Thanks for working with us, Sam. Would you share your experience on Google?
          </ReviewInvitation>
          <GoogleReviewCard heading="How was your experience?" />
        </div>
      </section>
      <ProspectSection />
      <AIReceptionistSection industry="mortgage" tone="open" compact />
      <section className="mv3-fit" aria-labelledby="mv3-fit-title">
        <div className="mv3-wrap mv3-fit-layout">
          <div>
            <Label>Your starting point</Label>
            <h2 id="mv3-fit-title">
              Built around
              <br />
              <span>your current setup.</span>
            </h2>
            <p className="mv3-fit-intro">
              Zapla can become your client CRM, or fill specific follow through gaps around the
              system you already use.
            </p>
          </div>
          <div className="mv3-fit-options">
            <article>
              <h3>Using spreadsheets and inboxes?</h3>
              <p>
                Bring your client contacts into Zapla. Keep records, conversations and next steps
                together, with your first follow up workflows configured during Guided Launch.
              </p>
            </article>
            <article>
              <h3>Already using a CRM?</h3>
              <p>
                Start with the follow through your current setup doesn’t handle well. We assess the
                data and connection approach before adding anything. If a workflow already works
                well, keep it there.
              </p>
            </article>
          </div>
          <div className="mv3-fit-boundary">
            <p>
              Lender research, loan applications and submissions stay in your lending tools. Advice
              stays with your broker.
            </p>
          </div>
        </div>
      </section>
      <section className="mv3-launch mv3-wrap" aria-labelledby="mv3-launch-title">
        <div>
          <Label>Guided Launch</Label>
          <h2 id="mv3-launch-title">
            Your first workflows.
            <br />
            Set up with you.
          </h2>
          <p>
            Start with a useful first journey. We bring in the agreed contacts, configure the flows
            and help you and your team put them to work.
          </p>
          <Link href={BOOK}>Map your brokerage’s gaps</Link>
        </div>
        <ol>
          <li>
            <h3>Choose the first workflow.</h3>
            <p>
              Start where contact is being missed, ownership is unclear or clients have no next
              step.
            </p>
          </li>
          <li>
            <h3>Bring your contacts and build it.</h3>
            <p>
              Import the agreed contacts from spreadsheets or exports. Configure messages, timing
              and who handles each reply.
            </p>
          </li>
          <li>
            <h3>Test it and get your team ready.</h3>
            <p>
              Walk through the message, reply and next action. Train the people using Zapla and test
              the flow before going live.
            </p>
          </li>
        </ol>
      </section>
      <section className="mv3-commercial mv3-wrap" aria-labelledby="mv3-plans-title">
        <div>
          <Label>Plans for your brokerage</Label>
          <h2 id="mv3-plans-title">
            Your whole team.
            <br />
            One platform price.
          </h2>
          <p>
            Unlimited users and stored contacts under fair use. Add the people who need to follow
            through, without another seat charge.
          </p>
        </div>
        <div className="mv3-plans">
          <article>
            <div>
              <h3>Follow-Through</h3>
              <p>
                CRM, shared inbox and pipelines, plus essential enquiry follow up and Google review
                requests.
              </p>
              <small>Guided Launch from A$1,997 + GST</small>
            </div>
            <strong>
              A$399<span>/month + GST</span>
            </strong>
          </article>
          <article>
            <div>
              <h3>Growth</h3>
              <p>
                Everything in Follow-Through, plus ongoing client marketing and eligible
                reactivation.
              </p>
              <small>Guided Launch from A$2,997 + GST</small>
            </div>
            <strong>
              A$699<span>/month + GST</span>
            </strong>
          </article>
          <p className="mv3-plan-note">
            Usage and optional AI Receptionist are separate. We confirm final scope and inclusions
            before setup.
          </p>
          <Link href="/Pricing-v3">Compare plans and Guided Launch</Link>
        </div>
      </section>
      <section className="mv3-faq mv3-wrap" aria-labelledby="mv3-faq-title">
        <div>
          <Label>A few practical questions</Label>
          <h2 id="mv3-faq-title">
            Before we
            <br />
            get started.
          </h2>
        </div>
        <div>
          {FAQS.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="mv3-final mv3-wrap" aria-labelledby="mv3-final-title">
        <ZaplaPetal size={36} />
        <h2 id="mv3-final-title">
          Build on the client book
          <br />
          you’ve worked hard to earn.
        </h2>
        <p>
          Show us how you manage clients today, in spreadsheets or a CRM. We’ll identify the first
          workflow worth fixing and explain the setup scope and cost.
        </p>
        <Actions final />
      </section>
    </main>
  );
}
