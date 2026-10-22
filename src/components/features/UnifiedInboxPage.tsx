import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Mail, MessageCircle, MessagesSquare, Users, Slack, Clock3 } from "lucide-react";
import { siWhatsapp, siTelegram, siMessenger, siInstagram } from "simple-icons";
import { motion, useReducedMotion } from "motion/react";
import "@/styles/feature-foundations.css";
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
    <div className="ui-blue-stage">
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
function HeroScene() {
  return (
    <div className="ui-hero-scene" aria-label="Customer conversation connected to a quote">
      <div className="ui-sculpture" aria-hidden="true" />
      <div className="ui-hero-glass">
        <div className="ui-hero-brand">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" />
          <span>Unified Inbox</span>
        </div>
        <div className="ui-hero-customer">
          <Avatar cell={9} large />
          <div>
            <strong>Mia Thompson</strong>
            <span>SMS conversation</span>
          </div>
        </div>
        <div className="ui-hero-question">
          <p>Does the quote include taking the old unit away?</p>
        </div>
        <div className="ui-hero-answer">
          <span>
            Ben <Avatar cell={13} />
          </span>
          <p>Yes, removal of the old unit is included in your quote.</p>
        </div>
      </div>
      <div className="ui-hero-record">
        <div>
          <span>Customer record</span>
          <strong>Hot water replacement</strong>
          <p>
            Quote sent <span>·</span> Ben Walker
          </p>
        </div>
      </div>
    </div>
  );
}
function Explore() {
  return (
    <section className="ui-section ui-explore" id="inbox-demo" aria-labelledby="explore-heading">
      <div className="ui-wrap">
        <div className="ui-explore-intro">
          <div>
            <p className="ui-eyebrow">Inside your inbox</p>
            <h2 id="explore-heading">
              The message is only
              <br />
              half the conversation.
            </h2>
          </div>
          <p>
            See who you’re speaking to, what they need and where things stand. Choose a customer
            below to explore their conversation and record.
          </p>
        </div>
        <InboxScene />
        <div className="ui-scene-key">
          <span>
            <b>01</b> Find the conversation
          </span>
          <span>
            <b>02</b> Read the exchange
          </span>
          <span>
            <b>03</b> Check the customer record
          </span>
        </div>
      </div>
    </section>
  );
}
const channels = [
  { name: "WhatsApp", brand: siWhatsapp, colour: "#168c52" },
  { name: "Email", icon: Mail, colour: "#3764ab" },
  { name: "SMS", icon: MessageCircle, colour: "#56804d" },
  { name: "Telegram", brand: siTelegram, colour: "#258bb7" },
  { name: "Messenger", brand: siMessenger, colour: "#5260d9" },
  { name: "Instagram", brand: siInstagram, colour: "#b04f79" },
  { name: "Live web chat", icon: MessagesSquare, colour: "#b36d44" },
  { name: "Slack", icon: Slack, colour: "#654568" },
  { name: "Team chat", icon: Users, colour: "#4f706c" },
];
function Channels() {
  return (
    <section className="ui-channels" aria-labelledby="channels-heading">
      <div className="ui-wrap ui-channel-layout">
        <div className="ui-channel-copy">
          <p className="ui-eyebrow">Your connected channels</p>
          <h2 id="channels-heading">Different channels.<br />One place to keep up.</h2>
          <p>Bring the places people contact you into Zapla, with team conversations close at hand.</p>
        </div>
        <div className="ui-channel-stage">
          <div className="ui-channel-directory">
            <div className="ui-channel-brand"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" /><span>Unified Inbox</span></div>
            <ul aria-label="Channels you can connect">
              {channels.map(channel => (
                <li key={channel.name}>
                  <span className="ui-channel-icon" style={{ color: channel.colour }} aria-hidden="true">
                    {channel.brand ? <svg viewBox="0 0 24 24"><path fill="currentColor" d={channel.brand.path} /></svg> : channel.icon ? <channel.icon strokeWidth={1.7} /> : null}
                  </span>
                  <span>{channel.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
const responseExamples = [
  { shortcut: "/welcome", text: "Thanks for getting in touch. How can we help you today?" },
  { shortcut: "/photos", text: "Could you send through a few photos? That will help us understand what you need before we arrange a visit." },
  { shortcut: "/quote", text: "Your quote is ready. Let me know if you have any questions and I’ll be happy to help." },
];
function ReplyTools() {
  const [response, setResponse] = useState(0);
  const [time, setTime] = useState("9:00 am");
  const reduced = useReducedMotion();
  const reveal = { initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: reduced ? 0 : 0.28 } };
  return (
    <section className="ui-section ui-reply-tools" aria-labelledby="reply-tools-heading">
      <div className="ui-wrap">
        <div className="ui-explore-intro">
          <h2 id="reply-tools-heading">Less retyping.<br />Better timing.</h2>
          <p>Keep useful answers ready to go, and prepare a message when it suits you without having to send it straight away.</p>
        </div>
        <div className="ui-reply-columns">
          <article>
            <div className="ui-saved-example">
              <p className="ui-demo-instruction">Choose a shortcut to see the response</p>
              <div className="ui-shortcut-options" aria-label="Saved response examples">
                {responseExamples.map((item, index) => <button key={item.shortcut} type="button" aria-pressed={response === index} aria-controls="saved-response-preview" onClick={() => setResponse(index)}><code>{item.shortcut}</code></button>)}
              </div>
              <div className="ui-response-paper">
                <div className="ui-response-person"><Avatar cell={13} /><span>Your saved response</span></div>
                <div id="saved-response-preview" aria-live="polite"><motion.p key={response} {...reveal}>{responseExamples[response].text}</motion.p></div>
                <span className="ui-response-caption">Ready to use in your conversation</span>
              </div>
            </div>
            <h3>A familiar question. An answer ready.</h3>
            <p>Save responses you use often and insert them with a <strong>/</strong> shortcut. Spend less time typing the same opening hours, next steps or welcome message.</p>
          </article>
          <article>
            <div className="ui-schedule-example">
              <div className="ui-scheduled-paper">
                <div className="ui-response-person"><Avatar cell={9} /><span>To Mia Thompson</span></div>
                <p>Hi Mia, just checking whether you had any questions about your quote.</p>
              </div>
              <div className="ui-time-picker">
                <p className="ui-demo-instruction">Try a send time for tomorrow</p>
                <div className="ui-time-options" aria-label="Scheduled message example times">
                  {["9:00 am", "1:00 pm", "4:00 pm"].map(item => <button key={item} type="button" aria-pressed={time === item} aria-controls="scheduled-time-preview" onClick={() => setTime(item)}>{item}</button>)}
                </div>
                <div className="ui-schedule-confirmation" id="scheduled-time-preview" aria-live="polite"><Clock3 size={19} aria-hidden="true" /><motion.span key={time} {...reveal}>Scheduled for tomorrow at <strong>{time}</strong></motion.span></div>
              </div>
            </div>
            <h3>Write it now. Send it later.</h3>
            <p>Prepare your message, then choose the date and time to send it. Get the next conversation ready while the details are still fresh.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "Can I save replies and schedule messages?",
    "Yes. Create reusable saved responses with slash shortcuts such as /welcome. You can also prepare a message and choose a date and time to send it later.",
  ],
  [
    "Which messages can I manage in Zapla?",
    "Connect WhatsApp, email, SMS, Slack, Telegram, Facebook Messenger, Instagram, team chat and live web chat. During Guided Launch, we confirm the account connections and setup your business needs.",
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
        <div className="ui-wrap ui-hero-grid">
          <div className="ui-hero-copy">
            <p className="ui-eyebrow">Unified Inbox</p>
            <h1>
              Every message.
              <br />
              The whole
              <br />
              <span>conversation.</span>
            </h1>
            <p className="ui-lead">
              Bring customer messages, team conversations and customer history together. Give your team the context to answer
              without asking the customer to start again.
            </p>
            <div className="ui-actions">
              <Cta />
              <a className="ui-secondary" href="#inbox-demo">
                Explore the inbox <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className="ui-hero-note">Unlimited users. One shared customer history.</p>
          </div>
          <HeroScene />
        </div>
      </section>
      <section className="ui-problems" aria-label="What changes for your team">
        <div className="ui-wrap ui-benefit-strip">
          <div>
            <span>Bring it together</span>
            <p>Your connected channels in one place.</p>
          </div>
          <div>
            <span>Reply with context</span>
            <p>The customer history alongside.</p>
          </div>
          <div>
            <span>Keep the team connected</span>
            <p>Conversations stay with the business.</p>
          </div>
        </div>
      </section>
      <Channels />
      <Explore />
      <ReplyTools />
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
            <p className="ui-eyebrow">Shared customer history</p>
            <h2>
              Someone else picks up.
              <br />
              The history stays.
            </h2>
            <p>
              When a colleague is on a job, on leave or simply busy, the customer’s history should
              still be within reach.
            </p>
            <p>
              Give the person replying the messages, notes and customer information they need to
              continue the conversation.
            </p>
            <div className="ui-team-line">
              <Avatar cell={13} />
              <Avatar cell={8} />
              <span>
                One customer record.
                <br />
                <strong>Available to the people who need it.</strong>
              </span>
            </div>
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
              Keep the conversation
              <br />
              close to the work.
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
            Better replies start
            <br />
            with the full picture.
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
