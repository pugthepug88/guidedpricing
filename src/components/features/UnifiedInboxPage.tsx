import { useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Mail, MessageCircle, MessagesSquare, Users, Slack, Clock3, FileText } from "lucide-react";
import { siWhatsapp, siTelegram, siMessenger, siInstagram } from "simple-icons";
import { motion, useReducedMotion } from "motion/react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/unified-inbox.css";

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
        <div className="ui-quote-title"><FileText size={25} strokeWidth={1.5} aria-hidden="true" /><div><span>From Mia’s quote</span><strong>Hot water replacement</strong></div></div>
        <div className="ui-quote-detail"><span>Old unit removal</span><strong>Included</strong></div>
        <div className="ui-quote-owner"><span>Quote sent</span><div><Avatar cell={13} /><span>Ben Walker</span></div></div>
      </div>
    </div>
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
function ChannelMark({ index }: { index: number }) {
  const channel = channels[index];
  return <span className="ui-channel-icon" style={{ color: channel.colour }} aria-hidden="true">{channel.brand ? <svg viewBox="0 0 24 24"><path fill="currentColor" d={channel.brand.path} /></svg> : channel.icon ? <channel.icon strokeWidth={1.7} /> : null}</span>;
}
function Channels() {
  return (
    <section className="ui-section ui-unified-story" id="inbox-demo" aria-labelledby="channels-heading">
      <div className="ui-wrap">
        <div className="ui-explore-intro">
          <div><p className="ui-eyebrow">Inside your inbox</p><h2 id="channels-heading">The channel changes.<br />The context stays.</h2></div>
          <p>A quote goes out by email. A question comes back by SMS. See both alongside the customer’s details, so your team can pick up where the conversation left off.</p>
        </div>
        <div className="ui-unified-stage">
          <div className="ui-channel-ribbon">
            <p>Connect the places people contact you</p>
            <ul aria-label="Channels you can connect">{channels.map((channel, index) => <li key={channel.name}><ChannelMark index={index} /><span>{channel.name}</span></li>)}</ul>
          </div>
          <div className="ui-history-window">
            <div className="ui-history-title"><img src="/concept/zapla-logo-dark.svg" alt="Zapla" /><span>One customer. Their conversation and context.</span></div>
            <div className="ui-history-grid">
              <div className="ui-history-conversation">
                <div className="ui-history-person"><Avatar cell={9} large /><div><h3>Mia Thompson</h3><p>Hot water replacement</p></div></div>
                <div className="ui-history-event"><div className="ui-event-channel"><Mail size={17} /><span>Email · Ben to Mia</span></div><h4>Your hot water replacement quote</h4><p>Hi Mia, your quote includes installation and removal of the old unit. Let me know if you have any questions.</p></div>
                <div className="ui-history-event ui-history-incoming"><div className="ui-event-channel"><MessageCircle size={17} /><span>SMS · Mia to your team</span></div><p>Thanks for the quote. Could you come in the afternoon?</p></div>
                <div className="ui-history-reply"><Avatar cell={13} /><div><span>Ben’s reply · SMS</span><p>Absolutely. Which afternoon works best for you?</p></div></div>
              </div>
              <aside className="ui-history-context" aria-label="Customer context alongside the conversation">
                <p className="ui-eyebrow">In view while you reply</p>
                <h3>The details behind<br />the message.</h3>
                <dl><div><dt>Customer</dt><dd>Mia Thompson</dd></div><div><dt>Enquiry</dt><dd>Hot water replacement</dd></div><div><dt>Pipeline stage</dt><dd>Quote sent</dd></div><div><dt>Contact owner</dt><dd><Avatar cell={13} />Ben Walker</dd></div></dl>
                <div className="ui-context-note"><span>Customer note</span><p>Prefers an afternoon visit.</p></div>
              </aside>
            </div>
          </div>
          <p className="ui-history-payoff">The email, the reply and the customer details. Together when your team needs them.</p>
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
          <div className="ui-workspace-scene">
            <div className="ui-workspace-header"><Avatar cell={5} large /><div><span>Daniel Brooks</span><h3>Office maintenance</h3></div><Mail size={20} aria-label="Email conversation" /></div>
            <div className="ui-workspace-details"><div><span>Site visit</span><strong>Thursday afternoon</strong></div><div><span>Access note</span><strong>Ask for Daniel at reception.</strong></div></div>
            <div className="ui-workspace-thread">
              <div className="ui-workspace-question"><span>Daniel</span><p>Should I arrange access through reception?</p></div>
              <div className="ui-workspace-answer"><div><Avatar cell={8} /><span>Alex’s reply</span></div><p>Yes please, Daniel. I’ll ask for you at reception when I arrive on Thursday afternoon.</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="ui-section ui-setup">
        <div className="ui-wrap ui-launch-layout">
          <div className="ui-launch-copy">
            <p className="ui-eyebrow">Guided Launch</p>
            <h2>Your inbox.<br />Set up with you.</h2>
            <p>We work through the channels, customer information and team access your business needs. You bring the way you work. We help turn it into a practical setup.</p>
            <a href="/booking" className="ui-launch-link">Talk through your setup <ArrowRight size={17} /></a>
          </div>
          <div className="ui-launch-plan">
            <div className="ui-launch-plan-heading"><ZaplaPetal size={36} /><div><span>Built around your business</span><h3>Your inbox setup</h3></div></div>
            <div className="ui-launch-row"><div className="ui-launch-channel-marks"><ChannelMark index={0} /><ChannelMark index={1} /><ChannelMark index={2} /></div><div><h4>The channels you use</h4><p>Agree which accounts and conversations belong in your inbox.</p></div></div>
            <div className="ui-launch-row"><div className="ui-launch-record"><span>Name</span><span>History</span><span>Notes</span></div><div><h4>The context you need</h4><p>Map your customer details and bring across the information you rely on.</p></div></div>
            <div className="ui-launch-row"><div className="ui-launch-people"><Avatar cell={13} /><Avatar cell={8} /></div><div><h4>The people who reply</h4><p>Set up team access and walk through how enquiries will be handled.</p></div></div>
          </div>
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
          <div className="ui-final-petal"><ZaplaPetal size={34} /></div>
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
