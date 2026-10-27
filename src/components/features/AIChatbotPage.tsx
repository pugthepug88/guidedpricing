import { type ReactNode } from "react";
import { Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

// Prepared marketing scenes, using documented capabilities. These are not
// tenant screenshots. No AI service, contact, message or booking API is called.
// Harbour Physiotherapy, its policies and the masked contact data are fictional.
function Avatar({ cell = 9 }: { cell?: number }) {
  return (
    <span
      className="cr-avatar"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="cr-cta" href="/booking">
      {children}
    </a>
  );
}
function Bubble({
  children,
  ai = false,
  cell = 9,
}: {
  children: ReactNode;
  ai?: boolean;
  cell?: number;
}) {
  return (
    <div className={`cr-message${ai ? " cr-message-ai" : ""}`}>
      {ai ? <ZaplaPetal size={21} /> : <Avatar cell={cell} />}
      <div>
        <span className="cr-sr-only">{ai ? "Zapla AI Chatbot" : "Visitor"}: </span>
        {children}
      </div>
    </div>
  );
}
function ChatHeader({ business = "Harbour Physiotherapy" }: { business?: string }) {
  return (
    <div className="cr-chat-header">
      <ZaplaPetal size={25} />
      <div>
        <strong>{business}</strong>
        <span>AI Chatbot</span>
      </div>
    </div>
  );
}

function Opening() {
  return (
    <section className="cr-opening" aria-labelledby="chatbot-title">
      <div className="cr-wrap cr-hero">
        <header className="cr-hero-copy">
          <p className="cr-eyebrow">AI Chatbot</p>
          <h1 id="chatbot-title">
            <span>Answer the question.</span> <span>Capture the enquiry.</span>
          </h1>
          <p>
            Answer website questions, collect the details your team needs and book suitable
            appointments, even after hours.
          </p>
          <div className="cr-actions">
            <Cta />
            <a className="cr-link" href="#chatbot-enquiry">
              See what reaches your team
            </a>
          </div>
          <p className="cr-existing-site">Works on your existing website.</p>
        </header>
        <div className="cr-website-scene" aria-label="Zapla’s chatbot on a physiotherapy website">
          <div className="cr-business-site">
            <div className="cr-site-header">
              <span className="cr-practice-brand">
                harbour<span>PHYSIOTHERAPY</span>
              </span>
              <span className="cr-site-services">Physiotherapy &amp; rehabilitation</span>
            </div>
            <div className="cr-site-intro">
              <p className="cr-site-title">
                Move well.
                <br />
                Feel stronger.
              </p>
              <p>Physiotherapy for your everyday life.</p>
            </div>
            <img
              className="cr-site-photo"
              src="/concept/features/chatbot-clinic-interior-20261026.webp"
              alt="A bright physiotherapy treatment room on Harbour’s website"
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <div className="cr-hero-widget">
              <ChatHeader />
              <div className="cr-thread">
                <Bubble>Do you have appointments after work?</Bubble>
                <Bubble ai>Yes, we have evening appointments. Is this your first visit?</Bubble>
                <Bubble>Yes. I’d like to book.</Bubble>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cr-wrap">
        <ul className="cr-outcomes" aria-label="What your chatbot can help with">
          <li>Answer questions around the clock</li>
          <li>Collect the right enquiry details</li>
          <li>Book agreed appointments</li>
        </ul>
      </div>
    </section>
  );
}

function EnquiryRecord() {
  return (
    <section
      className="cr-section cr-enquiry"
      id="chatbot-enquiry"
      aria-labelledby="chatbot-enquiry-title"
    >
      <div className="cr-wrap">
        <header className="cr-section-intro">
          <h2 id="chatbot-enquiry-title">Know what they need before you reply.</h2>
          <p>The original request and contact details reach your team together in Zapla.</p>
        </header>
        <div className="cr-enquiry-record" aria-label="Daniel’s enquiry in Zapla">
          <div className="cr-record-brand">
            <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="88" height="30" />
            <span>Website enquiry · Inner West Air</span>
          </div>
          <div className="cr-record-contact">
            <div className="cr-contact-person">
              <Avatar cell={5} />
              <div>
                <h3>Daniel</h3>
                <p>Name and email captured</p>
              </div>
            </div>
            <div className="cr-record-stage">
              <span>Pipeline stage</span>
              <strong>New enquiry</strong>
            </div>
          </div>
          <div className="cr-record-content">
            <div className="cr-original-request">
              <h4>Customer’s original request</h4>
              <blockquote>“Do you replace ducted air conditioning in Marrickville?”</blockquote>
              <p>“Home. Ideally next week.”</p>
              <p className="cr-contact-source">Daniel · Email address shared in chat</p>
            </div>
            <div className="cr-record-follow-up">
              <h4>Configured acknowledgement email</h4>
              <p className="cr-email-recipient">To Daniel</p>
              <p className="cr-email-subject">Thanks for your enquiry, Daniel.</p>
              <p>
                We’ve received your request. Our team will get in touch to discuss the replacement.
              </p>
            </div>
          </div>
        </div>
        <div className="cr-scene-foot">
          <p>Choose the pipeline and follow-up during setup.</p>
          <a className="cr-link" href="/features/automation-builder">
            Explore Automation Builder
          </a>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section
      className="cr-section cr-booking"
      id="chatbot-booking"
      aria-labelledby="chatbot-booking-title"
    >
      <div className="cr-wrap">
        <header className="cr-section-intro">
          <h2 id="chatbot-booking-title">Book while your team’s busy.</h2>
          <p>Offer an available time and create the appointment once the customer agrees.</p>
        </header>
        <div className="cr-booking-layout">
          <img
            className="cr-care-photo"
            src="/concept/features/chatbot-clinic-care-20261026.webp"
            alt="A physiotherapist assessing a patient’s ankle while the chatbot handles another enquiry"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="cr-booking-proof">
            <div
              className="cr-booking-exchange"
              aria-label="Mia agrees and supplies her contact details"
            >
              <div className="cr-offered-time">
                <ZaplaPetal size={23} />
                <p>
                  Friday at 5 pm is available for a first visit. Shall I book it? What’s your name
                  and mobile?
                </p>
              </div>
              <div className="cr-agreed-time">
                <Avatar />
                <div>
                  <p>Yes, please. Mia Thompson.</p>
                  <span className="cr-masked-number">04•• ••• ••8</span>
                </div>
              </div>
            </div>
            <div
              className="cr-appointment"
              aria-label="Mia’s agreed appointment in the connected calendar"
            >
              <p>Appointment booked</p>
              <div className="cr-appointment-details">
                <div className="cr-appointment-time">
                  <strong>Friday</strong>
                  <span>5 pm</span>
                </div>
                <div>
                  <h3>Initial physiotherapy</h3>
                  <p>Mia Thompson</p>
                </div>
              </div>
            </div>
            <a className="cr-link" href="/features/calendars-bookings">
              Explore Calendars &amp; Bookings
            </a>
          </div>
        </div>
        <p className="cr-calendar-scope">
          You choose the calendars and booking options it can use.
        </p>
      </div>
    </section>
  );
}

function BusinessAnswers() {
  return (
    <section className="cr-section cr-control" aria-labelledby="chatbot-control-title">
      <div className="cr-wrap cr-control-layout">
        <div className="cr-control-copy">
          <h2 id="chatbot-control-title">Useful answers. Clear limits.</h2>
          <p>
            Use your service information and booking rules. Pass unusual requests to your team with
            the conversation.
          </p>
          <a className="cr-link" href="/features/unified-inbox">
            Explore Unified Inbox
          </a>
        </div>
        <div
          className="cr-answer-example"
          aria-label="An answer based on the practice’s booking rules"
        >
          <div className="cr-appointment-guide">
            <h3>Your appointment guide</h3>
            <dl>
              <div>
                <dt>New patients</dt>
                <dd>Initial appointment</dd>
              </div>
              <div>
                <dt>Returning patients</dt>
                <dd>Follow-up appointment</dd>
              </div>
            </dl>
          </div>
          <p className="cr-rule-question">“Can I book a follow-up if I haven’t visited before?”</p>
          <div className="cr-rule-answer">
            <ZaplaPetal size={26} />
            <p>
              For your first visit, choose an initial appointment. Follow-ups are for returning
              patients.
            </p>
          </div>
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
    <section className="cr-section cr-setup" aria-labelledby="chatbot-setup-title">
      <div className="cr-wrap cr-setup-layout">
        <div className="cr-setup-copy">
          <p className="cr-eyebrow">Guided Launch</p>
          <h2 id="chatbot-setup-title">
            Set up with you.
            <br />
            Tested before launch.
          </h2>
          <p>We help add the widget, prepare your answers and agree the actions it can take.</p>
          <Cta>Talk through your setup</Cta>
          <p className="cr-setup-scope">
            Guided Launch is separately priced for a new standard setup.
          </p>
          <a className="cr-link" href="/Pricing-v3">
            Plans and setup
          </a>
        </div>
        <div className="cr-faq" aria-label="Practical chatbot questions">
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
      <section className="cr-final">
        <div className="cr-wrap">
          <div className="cr-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="cr-eyebrow">See it around your business</p>
          <h2>
            See how Zapla would <br className="cr-desktop-break" />
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
