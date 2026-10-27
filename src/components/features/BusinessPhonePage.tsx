import { ArrowRight, ArrowUpRight, Check, FileText, Mic, Plus } from "lucide-react";
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

// One prepared configuration, not a fixed list of Zapla's available shortcuts.
// These values are explanatory text, not editable controls or a live form action.
function CustomShortcut() {
  return (
    <div className="bp-shortcut-settings" aria-label="Customising a phone shortcut">
      <header className="bp-product-header">
        <Wordmark />
        <span>Phone quick actions</span>
      </header>
      <dl className="bp-shortcut-fields">
        <div>
          <dt>Button name</dt>
          <dd>Open enquiry form</dd>
        </div>
        <div>
          <dt>Action</dt>
          <dd>Open form</dd>
        </div>
        <div>
          <dt>Icon &amp; colours</dt>
          <dd className="bp-shortcut-appearance">
            <FileText size={18} aria-hidden="true" />
            <span>Document · Blue &amp; white</span>
          </dd>
        </div>
      </dl>
      <div className="bp-shortcut-footer">
        <p>At the bottom of the dialler</p>
        <div className="bp-shortcut-result">
          <FileText size={19} aria-hidden="true" />
          <span>Open enquiry form</span>
        </div>
      </div>
    </div>
  );
}

function BrowserCall() {
  return (
    <div className="bp-photo-call">
      <img
        className="bp-hero-photo"
        src="/concept/business-phone/lighting-owner-calling-20261027.webp"
        width="1536"
        height="1024"
        alt="A lighting showroom owner talking with a customer through earphones at her computer"
        fetchPriority="high"
      />
      <article
        className="bp-browser-call"
        aria-label="A requested callback to Mia using Zapla’s browser phone, with her saved contact note"
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
          <p>Call in progress</p>
        </div>
        <div className="bp-call-context">
          <span>Saved contact note</span>
          <p>Kitchen pendants. Requested a callback.</p>
        </div>
      </article>
    </div>
  );
}

const CONTACTS = [
  { name: "Mia Thompson", reason: "Kitchen lighting enquiry", cell: 9, current: true },
  { name: "Daniel Ross", reason: "Requested a quote callback", cell: 17, current: false },
  { name: "Priya Shah", reason: "Discuss showroom visit", cell: 19, current: false },
];

function PowerDialler() {
  return (
    <article
      className="bp-dialler"
      aria-label="A manual Power Dialler sequence: selected contacts, Mia’s completed call and your team’s saved note, then Daniel next"
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
          <div className="bp-saved-note">
            <div>
              <span>Contact note</span>
              <span>Saved by your team</span>
            </div>
            <p>Warm-white pendants. I’ll email Mia a shortlist.</p>
          </div>
          <div className="bp-next-contact">
            <div className="bp-next-identity">
              <Portrait cell={17} />
              <div>
                <span>Next contact</span>
                <strong>Daniel Ross</strong>
              </div>
            </div>
            <p>
              Choose <strong>Next</strong>, then <strong>Call now</strong>.
            </p>
            <ArrowRight size={23} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="bp-manual-mode">
        <span>Click-to-call mode</span>
        <p>Call now → speak → save your note → Next.</p>
      </div>
    </article>
  );
}

function NumbersAndRecordings() {
  return (
    <div className="bp-phone-tools">
      <article className="bp-number-markets">
        <h2>Buy a business number.</h2>
        <p>Choose a number for the markets you work in.</p>
        <ul className="bp-market-list" aria-label="Phone number purchasing markets">
          {[
            "Australia",
            "United Kingdom",
            "United States",
            "Canada",
            "Singapore",
            "Hong Kong",
            "Germany",
            "France",
          ].map((market) => (
            <li key={market}>{market}</li>
          ))}
        </ul>
        <p className="bp-market-terms">Availability, local requirements and rates vary.</p>
      </article>
      <article className="bp-history">
        <h2>Record. Transcribe. Revisit.</h2>
        <p>Enable recording and transcription to come back to what was said.</p>
        <div
          className="bp-history-record"
          aria-label="Mia’s completed call with recording and transcription enabled"
        >
          <div>
            <Portrait />
            <span>Mia Thompson</span>
            <strong>Completed</strong>
          </div>
          <div className="bp-record-assets">
            <span>Recording on</span>
            <span>Transcription on</span>
          </div>
          <div className="bp-recording-file">
            <Mic size={18} aria-hidden="true" />
            <span>Call recording</span>
            <Check size={16} aria-hidden="true" />
          </div>
          <div className="bp-transcript">
            <span>Transcript · Mia</span>
            <p>“Warm-white pendants would suit the kitchen. Could you email me the options?”</p>
          </div>
        </div>
      </article>
    </div>
  );
}

const FAQS = [
  [
    "What do I need for browser calling?",
    "An active phone setup, a number, a computer with a microphone and speakers or headset, and reliable internet. We check permissions and calling requirements during setup.",
  ],
  [
    "Does Power Dialler call automatically?",
    "Click-to-call keeps Call now and Next in your hands. Optional Auto Dial advances and calls after a delay you set. You start or stop that sequence; your team still writes notes and decides the follow-up.",
  ],
  [
    "How are incoming calls handled?",
    "Assign a number to selected people or make it account-wide. An optional caller menu can help direct incoming calls. We agree the arrangement during setup.",
  ],
  [
    "Where do I find recordings and transcripts?",
    "In Call History, alongside call details. Enable recording and transcription in your phone setup. Save agreed next steps separately in a contact note.",
  ],
  [
    "Does Zapla support A2P / 10DLC?",
    "Yes. Register your brand and campaign for business SMS using US local numbers. Carrier approval and separate registration and campaign fees apply. This is SMS setup, separate from voice calling.",
  ],
  [
    "What costs are separate?",
    "Phone numbers and call usage are separate from your subscription. We confirm rates and recording or transcription charges before activation. Guided Launch is required for a new standard plan and priced separately.",
  ],
];

export function BusinessPhonePage() {
  return (
    <main className="zapla-feature zapla-phone">
      <section className="bp-hero" aria-labelledby="bp-title">
        <div className="bp-wrap">
          <div className="bp-hero-copy">
            <p className="bp-eyebrow">Business Phone &amp; Power Dialler</p>
            <h1 id="bp-title">
              <span>Make the call.</span> <span>Keep the context.</span>
            </h1>
            <p className="bp-lead">
              Make and receive customer calls from your browser. Return enquiries with the
              customer’s notes close at hand.
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
                One conversation at a time.
              </h2>
            </div>
            <p>
              Select CRM contacts and push them to Power Dialler. Call, save what was agreed and
              move on when you’re ready.
            </p>
          </div>
          <PowerDialler />
          <p className="bp-auto-option">
            Optional Auto Dial: advance and call after a delay you set.
          </p>
        </div>
      </section>

      <section className="bp-context-section" aria-labelledby="bp-context-title">
        <div className="bp-wrap bp-quick-layout">
          <div className="bp-context-copy">
            <p className="bp-eyebrow">Phone quick actions</p>
            <h2 id="bp-context-title">Make the buttons your own.</h2>
            <p>
              Choose each shortcut’s name, icon, colours and action. Open forms, run configured
              workflows or manage tags from your browser phone or Power Dialler.
            </p>
          </div>
          <div className="bp-action-proof">
            <CustomShortcut />
            <a className="bp-text-link" href="/crm">
              Explore the customer record
            </a>
          </div>
        </div>
      </section>

      <section
        className="bp-incoming-section"
        aria-label="Business numbers, recordings and transcripts"
      >
        <div className="bp-wrap">
          <NumbersAndRecordings />
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
            <p>We’ll work through your numbers, call handling and follow-up with you.</p>
            <a className="bp-text-link" href="/booking">
              Talk through your phone setup
            </a>
            <p className="bp-setup-terms">Required for new standard plans. Priced separately.</p>
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
