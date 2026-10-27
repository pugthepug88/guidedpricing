import { ArrowDownLeft, ArrowRight, ArrowUpRight, Check, Mic, Phone, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/business-phone.css";

// Fixed marketing scenes, deliberately static. No telephony SDK, microphone
// permission, account endpoint, purchase, message or real contact is involved.
// A person writes the meaningful outcome as a contact note. It is not an AI
// summary, a native disposition field or the call provider's completion status.
function Portrait({ cell = 9, className = "" }: { cell?: number; className?: string }) {
  return (
    <span
      className={`bp-portrait ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

function Wordmark() {
  return (
    <img
      className="bp-wordmark"
      src="/concept/zapla-logo-dark.svg"
      alt="Zapla"
      width="96"
      height="29"
    />
  );
}

function BookCall() {
  return (
    <a className="bp-button" href="/booking">
      Book a Call
    </a>
  );
}

function BrowserCall() {
  return (
    <div className="bp-call-surround">
      <article
        className="bp-browser-call"
        aria-label="Ben returns Mia’s requested call using Zapla’s browser phone"
      >
        <header className="bp-product-header">
          <Wordmark />
          <span>Business Phone</span>
        </header>
        <div className="bp-call-person">
          <p className="bp-call-direction">
            <ArrowUpRight size={15} aria-hidden="true" /> Outgoing call
          </p>
          <Portrait className="bp-call-portrait" />
          <h2>Mia Thompson</h2>
          <p>Speaking with Ben Walker</p>
          <div className="bp-call-recognition" aria-hidden="true">
            <Mic size={18} />
            <span />
            <Phone size={20} />
          </div>
        </div>
        <div className="bp-call-context">
          <span>Saved contact note</span>
          <p>Kitchen lighting enquiry. Asked for a call to discuss pendant options.</p>
        </div>
      </article>
      <p className="bp-scene-caption">The customer, their notes and the call. Together in Zapla.</p>
    </div>
  );
}

const CONTACTS = [
  { name: "Mia Thompson", reason: "Kitchen lighting enquiry", cell: 9, current: true },
  { name: "Daniel Ross", reason: "Requested a quote callback", cell: 4, current: false },
  { name: "Priya Shah", reason: "Discuss showroom visit", cell: 19, current: false },
];

function PowerDialler() {
  return (
    <article
      className="bp-dialler"
      aria-label="A manual Power Dialler sequence: selected contacts, Mia’s completed call and Ben’s saved note, then Daniel next"
    >
      <header className="bp-product-header">
        <Wordmark />
        <span>Power Dialler</span>
      </header>
      <div className="bp-dialler-body">
        <div className="bp-contact-list">
          <div className="bp-list-intro">
            <span>From your CRM contacts</span>
            <p>Selected for a callback</p>
          </div>
          <ul>
            {CONTACTS.map((contact) => (
              <li key={contact.name} className={contact.current ? "bp-contact-current" : ""}>
                <Portrait cell={contact.cell} />
                <div>
                  <strong>{contact.name}</strong>
                  <span>{contact.reason}</span>
                </div>
                {contact.current && <span className="bp-list-position">Current</span>}
              </li>
            ))}
          </ul>
          <p className="bp-list-source">
            Select the contacts you want to call, then push them to Power Dialler.
          </p>
        </div>
        <div className="bp-current-work">
          <div className="bp-current-customer">
            <Portrait />
            <div>
              <span>Current contact</span>
              <h3>Mia Thompson</h3>
            </div>
            <span className="bp-completed">
              <Check size={15} aria-hidden="true" /> Call completed
            </span>
          </div>
          <div className="bp-person-action">
            <Portrait cell={13} />
            <p>
              Ben selects <strong>Call now</strong> and speaks with Mia.
            </p>
          </div>
          <div className="bp-saved-note">
            <div>
              <span>Contact note</span>
              <span>Saved by Ben Walker</span>
            </div>
            <p>
              Mia wants warm-white pendant options. I’ll email her a shortlist before she visits.
            </p>
          </div>
          <div className="bp-next-contact">
            <div className="bp-next-identity">
              <Portrait cell={4} />
              <div>
                <span>Next contact</span>
                <strong>Daniel Ross</strong>
              </div>
            </div>
            <p>
              Ben chooses <strong>Next</strong>, <br />
              then <strong>Call now</strong>.
            </p>
            <ArrowRight size={23} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="bp-manual-mode">
        <span>Click-to-call mode</span>
        <p>You start each call and choose when to move on.</p>
      </div>
    </article>
  );
}

function IncomingAndHistory() {
  return (
    <div className="bp-phone-tools">
      <article className="bp-number-team">
        <div className="bp-tool-title">
          <ArrowDownLeft size={20} aria-hidden="true" />
          <h3>A number for your team.</h3>
        </div>
        <p>
          Assign a phone number to selected people or make it account-wide. Set an optional caller
          menu for incoming calls.
        </p>
        <div className="bp-assignment">
          <span>Assigned users</span>
          <div>
            <Portrait cell={13} />
            <strong>Ben Walker</strong>
            <Portrait cell={8} />
            <strong>Alex Chen</strong>
          </div>
        </div>
      </article>
      <article className="bp-history">
        <div className="bp-tool-title">
          <Phone size={19} aria-hidden="true" />
          <h3>A record to come back to.</h3>
        </div>
        <p>
          Review call direction, duration and status in call history. When recording is enabled,
          revisit available recordings and transcripts.
        </p>
        <div
          className="bp-history-record"
          aria-label="An outgoing completed call with a recording and transcript available"
        >
          <div>
            <ArrowUpRight size={18} aria-hidden="true" />
            <span>Outgoing call</span>
            <strong>Completed</strong>
          </div>
          <div className="bp-record-assets">
            <span>Recording available</span>
            <span>Transcript available</span>
          </div>
        </div>
      </article>
    </div>
  );
}

const FAQS = [
  [
    "What do I need to make and receive calls?",
    "Calling needs an active phone setup, an available number, a computer with a microphone and speakers or a headset, and a stable internet connection. We check browser permissions, number access and calling behaviour during setup. App and mobile calling requirements are confirmed for your team before activation.",
  ],
  [
    "How do I add contacts to Power Dialler?",
    "Select contacts in the CRM, using search or filters to find the people you need. Push the selected contacts to Power Dialler. In click-to-call mode, choose Call now for the current contact and use Next when you are ready to move on. Contacts need a phone number to call.",
  ],
  [
    "Can Power Dialler advance automatically?",
    "Yes. An optional Auto Dial mode has a configurable delay between calls. You choose that mode and start the sequence; after a call ends, it advances and starts the next call after the delay. Click-to-call mode keeps calling and progression manual. Auto Dial does not write your notes or decide the next customer action.",
  ],
  [
    "What is saved after a call?",
    "Call history shows details such as direction, duration and call status. A completed call status is not a record of what was agreed. Your team saves that in a contact note. Configured phone quick actions can also add a tag or run a chosen automation when a person selects them; a call ending does not itself promise a follow-up message.",
  ],
  [
    "Are recordings and transcripts included for every call?",
    "Recording can be enabled or disabled for a phone number. Call history provides recordings and transcripts when they are available; they are not guaranteed for every call. Recording, transcription, storage and any associated charges are agreed as part of your setup.",
  ],
  [
    "Can I keep my number or replace my current phone system?",
    "Bring your current phone setup to the call. We’ll check the numbers, devices and call handling you need before recommending a change. Number availability, including Australian numbers, any transfer requirements and compatibility must be confirmed. A complete phone-system replacement or number port is not assumed.",
  ],
  [
    "What does phone usage cost?",
    "Phone numbers and call usage are charged separately from the software subscription. We confirm number costs, calling rates and any recording or transcription charges before activation. Guided Launch is required for a new standard plan and is priced separately.",
  ],
  [
    "Is this the same as AI Receptionist?",
    "Business Phone is for calls handled by people. AI Receptionist is the separate capability for AI-handled calls. Unified Inbox is your team’s shared messaging workspace. We agree how these fit your business during setup.",
  ],
];

export function BusinessPhonePage() {
  return (
    <main className="zapla-feature zapla-phone">
      <section className="bp-hero" aria-labelledby="bp-title">
        <div className="bp-wrap bp-hero-layout">
          <div className="bp-hero-copy">
            <p className="bp-eyebrow">Business Phone &amp; Power Dialler</p>
            <h1 id="bp-title">
              Make the call.
              <br />
              Keep the context.
            </h1>
            <p className="bp-lead">
              Return a requested call. Talk through an open enquiry. Make and receive customer calls
              in Zapla, with contact notes close at hand.
            </p>
            <div className="bp-hero-actions">
              <BookCall />
              <a className="bp-text-link" href="#power-dialler">
                Explore Power Dialler
              </a>
            </div>
            <p className="bp-usage">Phone numbers and call usage charged separately.</p>
          </div>
          <BrowserCall />
        </div>
      </section>

      <section className="bp-power-section" id="power-dialler" aria-labelledby="bp-power-title">
        <div className="bp-wrap bp-power-stage">
          <div className="bp-power-intro">
            <div>
              <p className="bp-eyebrow">Power Dialler</p>
              <h2 id="bp-power-title">
                Work through the list.
                <br />
                Give each call your attention.
              </h2>
            </div>
            <p>
              Bring selected CRM contacts into one calling list. Review who’s next, have the
              conversation and save what was agreed before moving on.
            </p>
          </div>
          <PowerDialler />
          <p className="bp-auto-option">
            Prefer a timed gap between calls? Optional Auto Dial advances through the list after a
            delay you set.
          </p>
        </div>
      </section>

      <section className="bp-context-section" aria-labelledby="bp-context-title">
        <div className="bp-wrap bp-context-layout">
          <figure className="bp-editorial">
            <img
              src="/concept/business-phone/lighting-owner-calling-20261027.webp"
              width="1536"
              height="1024"
              alt="A lighting showroom owner speaking through earphones while reviewing options at her computer"
              loading="lazy"
            />
          </figure>
          <div className="bp-context-copy">
            <p className="bp-eyebrow">A person on the other end</p>
            <h2 id="bp-context-title">Pick up where the last conversation left off.</h2>
            <p>
              Review saved contact notes while you talk. Keep useful details in view, so the
              customer can get on with the question they called about.
            </p>
            <p>
              After the call, add your own note. If you promised to send options or arrange a visit,
              your team still decides and takes that next step.
            </p>
            <a className="bp-text-link" href="/crm">
              Explore the customer record
            </a>
          </div>
        </div>
      </section>

      <section className="bp-incoming-section" aria-labelledby="bp-incoming-title">
        <div className="bp-wrap">
          <div className="bp-section-intro">
            <p className="bp-eyebrow">Incoming calls &amp; call history</p>
            <h2 id="bp-incoming-title">
              Handle the calls coming in.
              <br />
              Keep track of the conversation.
            </h2>
          </div>
          <IncomingAndHistory />
          <div className="bp-connected-links">
            <div>
              <span>When you want AI to answer</span>
              <a href="/ai-receptionist">
                Explore AI Receptionist <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div>
              <span>For your team’s written conversations</span>
              <a href="/features/unified-inbox">
                Explore Unified Inbox <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bp-setup-section" aria-labelledby="bp-setup-title">
        <div className="bp-wrap bp-setup-panel">
          <div className="bp-setup-copy">
            <p className="bp-eyebrow">Guided Launch</p>
            <h2 id="bp-setup-title">
              Fit the phone to
              <br />
              the way you work.
            </h2>
            <p>
              Bring your current numbers, the people taking calls and the follow-up work you need to
              do. We’ll agree the phone setup, calling list and contact notes your team will use.
            </p>
            <a className="bp-text-link" href="/booking">
              Talk through your phone setup
            </a>
            <p className="bp-setup-terms">
              Number availability, devices, rates and setup scope are confirmed before activation.
              Guided Launch is required for a new standard plan and priced separately.
            </p>
          </div>
          <div
            className="bp-faq"
            aria-label="Practical questions about Business Phone and Power Dialler"
          >
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
      </section>

      <section className="bp-final" aria-labelledby="bp-final-title">
        <div className="bp-wrap">
          <div className="bp-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="bp-eyebrow">See it around your business</p>
          <h2 id="bp-final-title">
            See how your team would <br />
            handle calls in Zapla.
          </h2>
          <p>
            Bring a customer-calling job you do today. We’ll walk through the conversation, the
            contact list and what your team does next.
          </p>
          <BookCall />
        </div>
      </section>
    </main>
  );
}
