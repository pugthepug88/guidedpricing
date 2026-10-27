import { type ReactNode } from "react";
import { Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

// Prepared marketing scenes, not tenant screenshots or a live AI demonstration.
// Marlow Kitchens, Alex Chen, the service policies and appointment are fictional.
// No contact, message, AI or booking API is called.
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="cb-cta" href="/booking">
      {children}
    </a>
  );
}

function Bubble({ children, ai = false }: { children: ReactNode; ai?: boolean }) {
  return (
    <div className={"cb-message" + (ai ? " cb-message-ai" : "")}>
      {ai && <ZaplaPetal size={23} />}
      <div>
        <span className="cb-sr-only">{ai ? "Zapla AI Chatbot" : "Visitor"}: </span>
        {children}
      </div>
    </div>
  );
}

function Opening() {
  return (
    <section className="cb-opening" aria-labelledby="chatbot-title">
      <div className="cb-hero">
        <img
          className="cb-hero-image"
          src="/concept/features/chatbot-professional-hero-20261027.webp"
          alt="A business owner reviewing a client’s project at his desk"
          width="1870"
          height="841"
          fetchPriority="high"
        />
        <div className="cb-hero-shade" aria-hidden="true" />
        <header className="cb-hero-copy">
          <p className="cb-eyebrow">AI Chatbot</p>
          <h1 id="chatbot-title">
            <span>Answer the question.</span> <span>Capture the enquiry.</span>
          </h1>
          <p className="cb-hero-description">
            Answer website questions, collect the details your team needs and book suitable
            appointments, even after hours.
          </p>
          <Cta />
          <p className="cb-existing-site">Works on your existing website.</p>
        </header>
      </div>
    </section>
  );
}

function EnquiryRecord() {
  return (
    <section
      className="cb-section cb-enquiry"
      id="chatbot-enquiry"
      aria-labelledby="chatbot-enquiry-title"
    >
      <div className="cb-wrap">
        <header className="cb-enquiry-intro">
          <h2 id="chatbot-enquiry-title">Know what they need before you reply.</h2>
          <p>The conversation, contact details and follow-up come together in Zapla.</p>
        </header>
        <div className="cb-capture-scene">
          <div className="cb-widget" aria-label="Alex shares the enquiry, name and email">
            <div className="cb-chat-header">
              <ZaplaPetal size={26} />
              <div>
                <strong>Marlow Kitchens</strong>
                <span>AI Chatbot</span>
              </div>
            </div>
            <div className="cb-thread">
              <Bubble>Do you renovate small apartment kitchens?</Bubble>
              <Bubble ai>Yes. What are you hoping to change?</Bubble>
              <Bubble>New cabinets and worktops. Next month.</Bubble>
              <Bubble ai>Your name and email so our team can get in touch?</Bubble>
              <Bubble>
                Alex Chen.<span className="cb-shared-detail">Email address shared</span>
              </Bubble>
            </div>
          </div>
          <div
            className="cb-record"
            aria-label="Alex’s contact, original enquiry and configured follow-up"
          >
            <div className="cb-record-header">
              <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="88" height="30" />
              <span>Website enquiry</span>
            </div>
            <dl className="cb-record-fields">
              <div>
                <dt>Name</dt>
                <dd>Alex Chen</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>Captured</dd>
              </div>
              <div>
                <dt>Pipeline stage</dt>
                <dd>New enquiry</dd>
              </div>
              <div>
                <dt>From the conversation</dt>
                <dd>“New cabinets and worktops. Next month.”</dd>
              </div>
            </dl>
            <div className="cb-acknowledgement">
              <span>Configured acknowledgement</span>
              <p>Thanks for your enquiry, Alex.</p>
            </div>
          </div>
        </div>
        <div className="cb-capture-foot">
          <p>Choose the pipeline and follow-up during setup.</p>
          <a className="cb-link" href="/features/automation-builder">
            Explore Automation Builder
          </a>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section className="cb-section cb-booking" aria-labelledby="chatbot-booking-title">
      <div className="cb-wrap cb-booking-layout">
        <div className="cb-booking-copy">
          <h2 id="chatbot-booking-title">Book while they’re interested.</h2>
          <p>Offer an available time and create the appointment once the visitor agrees.</p>
          <div className="cb-booking-agreement" aria-label="Alex agrees to the offered assessment">
            <Bubble ai>Friday at 2 pm is available for an assessment. Shall I book it?</Bubble>
            <Bubble>Yes, please.</Bubble>
          </div>
          <a className="cb-link" href="/features/calendars-bookings">
            Explore Calendars &amp; Bookings
          </a>
          <p className="cb-calendar-scope">
            You choose the calendars and booking options it can use.
          </p>
        </div>
        <div
          className="cb-calendar"
          aria-label="Alex Chen’s agreed on-site assessment, booked for Friday at 2 pm"
        >
          <p className="cb-calendar-name">On-site assessments</p>
          <h3>Friday</h3>
          <div className="cb-calendar-times">
            <div className="cb-calendar-row">
              <span>1 pm</span>
              <div />
            </div>
            <div className="cb-calendar-row cb-booked-row">
              <span>2 pm</span>
              <div className="cb-appointment">
                <strong>On-site assessment</strong>
                <span>Alex Chen</span>
              </div>
            </div>
            <div className="cb-calendar-row">
              <span>3 pm</span>
              <div />
            </div>
          </div>
          <p className="cb-booked-label">Appointment booked</p>
        </div>
      </div>
    </section>
  );
}

function BusinessAnswers() {
  return (
    <section className="cb-section cb-answers" aria-labelledby="chatbot-answers-title">
      <div className="cb-wrap cb-answers-layout">
        <div className="cb-answer-visual">
          <img
            className="cb-answer-image"
            src="/concept/features/chatbot-answer-review-20261027.webp"
            alt="A member of the design team reviewing project materials"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="cb-answer-exchange" aria-label="An unusual request is passed to the team">
            <Bubble>Could you remove a structural wall?</Bubble>
            <Bubble ai>That needs a site assessment. I’ll pass your question to our team.</Bubble>
          </div>
        </div>
        <div className="cb-answer-copy">
          <h2 id="chatbot-answers-title">Useful answers. Clear limits.</h2>
          <p>
            Use your service information for routine questions. Bring your team into the exceptions.
          </p>
          <p className="cb-knowledge-sources">Website pages, documents and written instructions.</p>
          <a className="cb-link" href="/features/unified-inbox">
            Explore Unified Inbox
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  [
    "Can I use it on my existing website?",
    "Yes. Add a floating widget or embed the chat within a page. We check the installation with your existing website during setup.",
  ],
  [
    "Can it answer outside business hours?",
    "Yes. An active chatbot can handle routine questions and the actions you enable while your team is unavailable. A human response still depends on your team’s availability.",
  ],
  [
    "How do we control the answers and actions?",
    "Supply website pages, documents and written instructions. Choose the questions it should handle, the calendars and actions it can use, and when your team should get involved. Test the responses before launch and keep the information current.",
  ],
  [
    "What happens to a new enquiry?",
    "The chatbot can collect contact details in the conversation and create the contact in Zapla. You can choose a pipeline stage and configure follow-up, such as an acknowledgement email. Booking tools can offer availability and create an appointment after the customer agrees.",
  ],
  [
    "What if we already use a CRM or booking system?",
    "We review your current tools and the workflow you need. Whether you’re starting with separate inboxes or an existing CRM, we agree where Zapla fits and check available connections before recommending a setup.",
  ],
  [
    "Does it work beyond website chat?",
    "Zapla’s AI Chatbot also supports SMS, WhatsApp and email. Channel connections, configuration and usage terms are confirmed during setup. Unified Inbox is your team’s conversation workspace; AI Receptionist handles phone calls.",
  ],
  [
    "What does setup cost?",
    "Guided Launch is required for a new standard setup and priced separately from your monthly plan. Our Pricing page sets out the plans and launch options. We confirm chatbot availability, AI usage and any connected messaging charges before you start.",
  ],
] as const;

function SetupAndFaq() {
  return (
    <section className="cb-section cb-setup" aria-labelledby="chatbot-setup-title">
      <div className="cb-wrap cb-setup-layout">
        <div className="cb-setup-copy">
          <p className="cb-eyebrow">Guided Launch</p>
          <h2 id="chatbot-setup-title">
            Set up with you.
            <br />
            Tested before launch.
          </h2>
          <p>
            We help add the chatbot, prepare its business information and agree the actions it can
            take.
          </p>
          <Cta>Talk through your setup</Cta>
          <p className="cb-setup-scope">
            Guided Launch is separately priced for a new standard setup.
          </p>
          <a className="cb-link" href="/Pricing-v3">
            Plans and setup
          </a>
        </div>
        <div className="cb-faq" aria-label="Practical chatbot questions">
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

export function AIChatbotPage() {
  return (
    <main className="zapla-feature zapla-chatbot">
      <Opening />
      <EnquiryRecord />
      <Booking />
      <BusinessAnswers />
      <SetupAndFaq />
      <section className="cb-final">
        <div className="cb-wrap">
          <div className="cb-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="cb-eyebrow">See it around your business</p>
          <h2>
            See how Zapla would <br className="cb-desktop-break" />
            handle your enquiries.
          </h2>
          <p>
            Bring the questions your customers ask. We’ll show you what the chatbot can answer,
            which next steps it can take and where your team should stay involved.
          </p>
          <Cta />
        </div>
      </section>
    </main>
  );
}
