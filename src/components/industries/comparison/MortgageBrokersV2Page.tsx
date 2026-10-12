import { useState, type ReactNode } from "react";
import { ArrowRight, Plus, Star } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

const BOOK = "https://zapla.io/booking";
function Label({ children }: { children: ReactNode }) {
  return <p className="mv-label">{children}</p>;
}
function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="mv-link" href={href}>
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
function Actions({ final = false }: { final?: boolean }) {
  return (
    <div className="mv-actions">
      <a className="mv-button" href={BOOK}>
        Book a Call <ArrowRight size={17} aria-hidden="true" />
      </a>
      <Link href={final ? "/Pricing-v3" : "#client-book"}>
        {final ? "View pricing" : "See the client journey"}
      </Link>
    </div>
  );
}
function Sender({ children }: { children: ReactNode }) {
  return (
    <div className="mv-sender">
      <ZaplaPetal size={25} />
      <span>{children}</span>
    </div>
  );
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
    <div className="mv-choices" role="group" aria-label={label}>
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
    <div className="mv-review-scene">
      <img
        src="/concept/industries/mortgage-client-review.webp"
        alt="A client and her partner discussing their plans at home"
        width="1672"
        height="941"
        loading="lazy"
      />
      <div className="mv-glass mv-review-message">
        <Choice
          options={["Annual review", "Fixed rate ending"]}
          selected={mode}
          onSelect={setMode}
          label="Choose a loan review invitation example"
        />
        <Sender>Your brokerage · Review invitation</Sender>
        <h3>
          {mode === 0 ? "A year later. Still their broker." : "A date worth getting ahead of."}
        </h3>
        <p>
          {mode === 0
            ? "Hi Priya, it’s been a year since we helped with your home loan. Has anything changed? Let’s arrange a review with your broker."
            : "Hi Priya, your recorded fixed rate period is coming to an end. Would you like to arrange a conversation with your broker about your next steps?"}
        </p>
        <span className="mv-message-action">Reply to arrange a conversation</span>
        <small>Reply STOP to opt out.</small>
        <span className="mv-message-context">
          {mode === 0
            ? "Sent on the agreed review date."
            : "Uses a fixed rate end date verified by your broker."}
        </span>
      </div>
      <div className="mv-glass mv-review-reply">
        <strong>Priya Shah · Client reply</strong>
        <p>“Yes please. We’re thinking about our next move.”</p>
        <span>Your broker handles the review and advice.</span>
      </div>
      <p className="mv-example">Illustrative client conversation</p>
    </div>
  );
}
const TEAM = [
  {
    title: "New enquiry",
    person: "Alex Chen",
    context: "Asked about buying a first home",
    message: "Can we speak after work?",
    action: "Arrange an initial conversation",
    owner: "Daniel · Broker",
    history: "Enquiry received → Automatic acknowledgement → Client replied",
  },
  {
    title: "Client review",
    person: "Priya Shah",
    context: "Invited to an annual review",
    message: "We’re thinking about our next move.",
    action: "Arrange the review and discuss her plans",
    owner: "Daniel · Broker",
    history: "Review date reached → Invitation sent → Client replied",
  },
  {
    title: "Referral conversation",
    person: "Sam Taylor",
    context: "Replied to a referral invitation",
    message: "My sister is looking to buy. Can I introduce you?",
    action: "Agree an introduction with Sam",
    owner: "Mei · Client services",
    history: "Approved invitation sent → Client replied → Team picks up",
  },
];
function TeamScene() {
  const [selected, setSelected] = useState(1);
  const item = TEAM[selected];
  return (
    <div className="mv-team-scene">
      <Choice
        options={TEAM.map((x) => x.title)}
        selected={selected}
        onSelect={setSelected}
        label="Choose a team follow through example"
      />
      <div className="mv-team-record" aria-live="polite">
        <div className="mv-record-person">
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
        <p className="mv-record-history">{item.history}</p>
      </div>
      <p className="mv-example">Illustrative connected record and team handoff</p>
    </div>
  );
}
function ProspectSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="mv-prospect mv-wrap" aria-labelledby="mv-prospect-title">
      <div className="mv-prospect-scene">
        <img
          src="/concept/industries/mortgage-property-search.webp"
          alt="A couple viewing a home during their property search"
          width="1536"
          height="1024"
          loading="lazy"
        />
        <div className="mv-glass mv-prospect-message">
          <Sender>Your brokerage · {selected === 0 ? "Agreed check-in" : "Reconnection"}</Sender>
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
          <small>Reply STOP to opt out.</small>
        </div>
        <p className="mv-example">Illustrative message</p>
      </div>
      <div className="mv-copy">
        <Label>Before they’re ready</Label>
        <h2 id="mv-prospect-title">A pause shouldn’t end the relationship.</h2>
        <p>
          Some clients are still searching. Others put their plans on hold. Keep a useful next
          conversation in view.
        </p>
        <Choice
          options={["Not ready yet", "Gone quiet"]}
          selected={selected}
          onSelect={setSelected}
          label="Choose a prospect follow up example"
        />
        <div className="mv-prospect-detail" aria-live="polite">
          <h3>
            {selected === 0
              ? "Keep the check-in you agreed to."
              : "Reconnect for a relevant reason."}
          </h3>
          <p>
            {selected === 0
              ? "Zapla sends the agreed check-in at the right time. When the client replies, your broker takes over and further reminders stop."
              : "Select eligible past enquiries for an approved invitation. Leave out active conversations, opted out contacts and anyone already being followed up. Replies return to the team with context."}
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
    "Will this replace our mortgage CRM?",
    "Your lending system stays responsible for research, applications, submissions and loan processing. Zapla adds agreed client communication and team follow through. If your current CRM already handles those journeys well, the call should establish whether there is a real gap worth fixing.",
  ],
  [
    "Does Zapla connect to our existing software?",
    "We assess the required information, available exports or APIs and update responsibilities before agreeing the scope. No native connection or automatic two-way sync is assumed. Review dates must be current and verified by your brokerage.",
  ],
  [
    "What happens when a client replies or books?",
    "The configured flow routes the conversation to an agreed team member and stops the relevant reminders. We test reply, opt-out and booking handling before launch. A booking is only treated as confirmed when the configured calendar or verified connection supplies that event, not when someone clicks an external link.",
  ],
  [
    "Can you help with missed calls and document reminders?",
    "AI Receptionist is an optional add-on for agreed routine questions, details and callback requests, with a tested human handoff. It does not give lending advice. We can also configure approved form or portal-link reminders where useful. Financial documents stay in your approved lending portal; an external link alone does not verify receipt or completion.",
  ],
  [
    "How do review and referral invitations work?",
    "Your brokerage agrees the event, timing and neutral request wording. Google review invitations ask for an honest experience, without rewards or filtering for positive feedback. Referral invitations make it easy for an existing client to introduce someone. They do not imply reward tracking, a native referral management engine or permission to contact another person.",
  ],
  [
    "Who decides what gets sent?",
    "Your brokerage approves the audiences, timing, message wording and contact permissions. Opt-outs and exclusions are configured and tested. Loan reviews and financial advice stay with your broker. Outreach does not promise approval, savings or a better rate.",
  ],
];
export function MortgageBrokersV2Page() {
  return (
    <main className="mortgage-v2-page" data-page="mortgage-brokers-v2">
      <section className="mv-hero mv-wrap" aria-labelledby="mv-title">
        <div className="mv-hero-copy">
          <Label>For mortgage brokers</Label>
          <h1 id="mv-title">
            Be the broker
            <br />
            they come back to.
            <br />
            <span>And recommend.</span>
          </h1>
          <p className="mv-intro">
            Keep your client book connected with relevant check-ins, review invitations and
            consistent follow through from your whole team.
          </p>
          <Actions />
          <p className="mv-hero-note">
            You handle the lending. Zapla keeps the client relationship moving.
          </p>
          <a className="mv-compare" href="/industries/mortgage-brokers">
            V2 comparison draft · View original page <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div className="mv-hero-scene">
          <img
            src="/concept/industries/mortgage-broker-consultation.webp"
            alt="A mortgage broker talking with clients about their property plans"
            width="1122"
            height="1402"
            fetchPriority="high"
          />
          <div className="mv-glass mv-hero-client">
            <strong>Priya Shah · Returning client</strong>
            <p>“You helped us with our first home. Can we talk about our next move?”</p>
          </div>
          <div className="mv-glass mv-hero-owner">
            <Sender>Conversation to your broker</Sender>
            <p>
              Client history.
              <br />
              Clear next action.
              <br />
              <strong>A relationship to build on.</strong>
            </p>
          </div>
          <p className="mv-example">Illustrative client relationship</p>
        </div>
      </section>
      <section className="mv-outcome mv-wrap" aria-labelledby="mv-outcome-title">
        <h2 id="mv-outcome-title">
          Your client book should be an asset.
          <br />
          <span>Not a list only you remember.</span>
        </h2>
        <p>
          Clients should hear from your brokerage at useful moments, get a clear next step and feel
          known when they return. That takes a shared process, not just a broker with a good memory.
        </p>
      </section>
      <section id="client-book" className="mv-retention" aria-labelledby="mv-review-title">
        <div className="mv-wrap">
          <div className="mv-wide-heading">
            <div>
              <Label>After settlement</Label>
              <h2 id="mv-review-title">
                Stay their broker.
                <br />
                Long after the loan settles.
              </h2>
            </div>
            <div>
              <p>
                An annual review. A fixed rate period approaching its end. A change in the client’s
                plans.
              </p>
              <p>
                Zapla uses your agreed, verified dates to send a relevant invitation. Your broker
                picks up the reply and handles the conversation.
              </p>
              <Link href="/customer-marketing">Explore Customer Marketing</Link>
            </div>
          </div>
          <ReviewScene />
        </div>
      </section>
      <section className="mv-reputation mv-wrap" aria-labelledby="mv-reputation-title">
        <div className="mv-copy">
          <Label>Trust that carries forward</Label>
          <h2 id="mv-reputation-title">
            Make it easy
            <br />
            to recommend you.
          </h2>
          <p>
            Make it easy for clients to share an honest experience and introduce someone who needs
            your help.
          </p>
          <p>
            Send a neutral Google review invitation after an agreed milestone. At a suitable later
            moment, invite an introduction. Your team handles the response personally.
          </p>
          <Link href="/reviews">Explore Reviews &amp; Reputation</Link>
        </div>
        <div className="mv-reputation-scene">
          <div className="mv-glass mv-feedback">
            <Sender>After settlement</Sender>
            <p>Thanks for working with us, Sam. Would you share your experience on Google?</p>
            <span className="mv-message-action">Leave an honest review</span>
            <div className="mv-google">
              <strong>
                <span>G</span>oogle
              </strong>
              <p>Share your experience</p>
              <div aria-label="Five empty stars, no rating selected">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={23} aria-hidden="true" />
                ))}
              </div>
            </div>
          </div>
          <div className="mv-glass mv-referral">
            <Sender>A later referral invitation</Sender>
            <p>
              If someone you know is thinking about their next property move, you’re welcome to
              introduce us.
            </p>
            <div className="mv-referral-reply">
              <strong>Sam · Client reply</strong>
              <p>“My sister is looking to buy. Can I introduce you?”</p>
            </div>
          </div>
          <p className="mv-example">Illustrative invitations, not customer results</p>
        </div>
      </section>
      <section className="mv-team" aria-labelledby="mv-team-title">
        <div className="mv-wrap mv-team-layout">
          <div className="mv-copy">
            <Label>Your whole team follows through</Label>
            <h2 id="mv-team-title">
              The relationship is yours.
              <br />
              The next step is shared.
            </h2>
            <p>
              A new enquiry, a returning client or a referral reply shouldn’t rely on the principal
              noticing it first.
            </p>
            <p>
              Keep conversations, client context and next actions connected. Give each response a
              clear owner, so another team member can pick up without making the client start again.
            </p>
            <Link href="/crm">Explore the connected CRM</Link>
          </div>
          <TeamScene />
        </div>
      </section>
      <ProspectSection />
      <section className="mv-fit" aria-labelledby="mv-fit-title">
        <div className="mv-wrap mv-fit-layout">
          <div>
            <Label>Alongside your lending system</Label>
            <h2 id="mv-fit-title">
              Keep your broking tools.
              <br />
              <span>Strengthen the client experience.</span>
            </h2>
          </div>
          <div>
            <p>
              Research, applications and submissions stay in your specialist mortgage software.
              Advice stays with your broker.
            </p>
            <p>
              Zapla connects the communication around that work: enquiries, follow up, ongoing
              contact and team ownership. We confirm the data and connection approach before setup.
            </p>
            <p className="mv-support">
              Need call coverage too? <a href="/ai-receptionist">AI Receptionist</a> is optional,
              with routine capture and a human handoff.
            </p>
          </div>
        </div>
      </section>
      <section className="mv-launch mv-wrap" aria-labelledby="mv-launch-title">
        <div>
          <Label>Guided Launch</Label>
          <h2 id="mv-launch-title">
            Start with the relationships
            <br />
            worth protecting.
          </h2>
          <p>
            We map where your client experience breaks down, configure the agreed flows and test
            them with your team.
          </p>
          <Link href={BOOK}>Map your brokerage’s gaps</Link>
        </div>
        <ol>
          <li>
            <h3>Choose the first client journey.</h3>
            <p>
              Start where contact is being missed, ownership is unclear or clients have no next
              step.
            </p>
          </li>
          <li>
            <h3>Build around your brokerage.</h3>
            <p>Agree the data, messages, timing and who takes over when a client responds.</p>
          </li>
          <li>
            <h3>Test the whole conversation.</h3>
            <p>
              Walk through the invitation, reply, handoff and stop rules before your team goes live.
            </p>
          </li>
        </ol>
      </section>
      <section className="mv-commercial mv-wrap" aria-labelledby="mv-plans-title">
        <div>
          <Label>Plans for your brokerage</Label>
          <h2 id="mv-plans-title">
            Your whole team.
            <br />
            One platform price.
          </h2>
          <p>
            Unlimited users and stored contacts under fair use. Add the people who need to follow
            through, without another seat charge.
          </p>
        </div>
        <div className="mv-plans">
          <article>
            <div>
              <h3>Follow-Through</h3>
              <p>
                Essential enquiry and follow up flows, team ownership and Google review requests.
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
              <p>Add ongoing client marketing and eligible reactivation for your client book.</p>
              <small>Guided Launch from A$2,997 + GST</small>
            </div>
            <strong>
              A$699<span>/month + GST</span>
            </strong>
          </article>
          <p className="mv-plan-note">
            Usage and optional AI Receptionist are separate. We confirm final scope and inclusions
            before setup.
          </p>
          <Link href="/Pricing-v3">Compare plans and Guided Launch</Link>
        </div>
      </section>
      <section className="mv-faq mv-wrap" aria-labelledby="mv-faq-title">
        <div>
          <Label>A few practical questions</Label>
          <h2 id="mv-faq-title">
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
      <section className="mv-final mv-wrap" aria-labelledby="mv-final-title">
        <ZaplaPetal size={36} />
        <h2 id="mv-final-title">
          Build on the client book
          <br />
          you’ve worked hard to earn.
        </h2>
        <p>
          Show us how your brokerage stays in touch today. We’ll identify the gaps, who owns the
          next step and where Zapla can earn its place.
        </p>
        <Actions final />
        <Link href="/industries/mortgage-brokers">Compare with the original page</Link>
      </section>
    </main>
  );
}
