import { type ReactNode } from "react";
import { Bell, BookOpen, CalendarDays, FileText, Globe2, MessagesSquare, Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

// Prepared product scenes. The businesses, people, policies and bookings are fictional.
// All words are native HTML. No AI, contact, message or booking service is called.
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="bc-cta" href="/booking">
      {children}
    </a>
  );
}
function Brand() {
  return (
    <img
      className="bc-brand"
      src="/concept/zapla-logo-dark.svg"
      alt="Zapla"
      width="86"
      height="28"
    />
  );
}
function Avatar({ cell = 16 }: { cell?: number }) {
  return (
    <span
      className="bc-avatar"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}
function Message({
  children,
  speaker = "Visitor",
}: {
  children: ReactNode;
  speaker?: "Visitor" | "AI Chatbot" | "Leah";
}) {
  const ai = speaker === "AI Chatbot";
  return (
    <div
      className={`bc-message ${ai ? "bc-message-ai" : speaker === "Leah" ? "bc-message-team" : "bc-message-visitor"}`}
    >
      {ai && <ZaplaPetal size={19} />}
      {speaker === "Leah" && <Avatar />}
      <div>
        <span className="bc-sr-only">{speaker}: </span>
        {children}
      </div>
    </div>
  );
}
function SectionCopy({
  label,
  title,
  children,
  id,
}: {
  label: string;
  title: string;
  children: ReactNode;
  id: string;
}) {
  return (
    <header className="bc-section-copy">
      <p className="bc-label">{label}</p>
      <h2 id={id}>{title}</h2>
      {children}
    </header>
  );
}
function Opening() {
  return (
    <section className="bc-opening" aria-labelledby="chatbot-title">
      <div className="bc-hero">
        <img
          className="bc-hero-image"
          src="/concept/features/chatbot-property-viewing-v2-20261027.webp"
          alt="A real estate agent showing buyers through a home"
          width="1870"
          height="841"
          fetchPriority="high"
        />
        <div className="bc-hero-shade" aria-hidden="true" />
        <header className="bc-hero-copy">
          <p className="bc-label">AI Chatbot</p>
          <h1 id="chatbot-title">
            <span>Answer the question.</span> <span>Capture the enquiry.</span>
          </h1>
          <p className="bc-hero-description">
            Answer website questions, collect the details your team needs and book suitable
            appointments, even after hours.
          </p>
          <Cta />
          <p className="bc-existing-site">Works on your existing website.</p>
        </header>
      </div>
      <div className="bc-wrap bc-intro-benefits" aria-label="What your chatbot can help with">
        <div>
          <h2>Answer around the clock.</h2>
          <p>Keep routine questions moving while your team is busy or offline.</p>
        </div>
        <div>
          <h2>Capture the next enquiry.</h2>
          <p>Ask what they need and collect their contact details in the chat.</p>
        </div>
        <div>
          <h2>Bring in your team.</h2>
          <p>Keep people involved when a conversation needs their judgement.</p>
        </div>
      </div>
    </section>
  );
}
function LeadCapture() {
  return (
    <section className="bc-section" id="chatbot-enquiry" aria-labelledby="chatbot-enquiry-title">
      <div className="bc-wrap bc-feature-row">
        <SectionCopy
          label="24/7 lead assistant"
          title="Know what they need before you reply."
          id="chatbot-enquiry-title"
        >
          <p>
            Zapla answers questions, asks about the job and collects contact details. Your team gets
            an enquiry with context for the next step.
          </p>
          <a className="bc-link" href="/features/automation-builder">
            Connect the follow-up
          </a>
        </SectionCopy>
        <div className="bc-stage bc-lead-stage">
          <div className="bc-lead-photo">
            <img
              src="/concept/features/chatbot-plumber-enquiries-20261027.webp"
              alt="A plumber focused on a hot-water installation while website enquiries are handled"
              width="1448"
              height="1086"
              loading="lazy"
            />
          </div>
          <div
            className="bc-widget"
            aria-label="Noah shares the job, suburb, timing and contact details"
          >
            <div className="bc-widget-header">
              <ZaplaPetal size={25} />
              <div>
                <strong>Harbour Plumbing</strong>
                <span>AI Chatbot</span>
              </div>
            </div>
            <div className="bc-thread">
              <Message>Can I get a quote for a new hot-water system?</Message>
              <Message speaker="AI Chatbot">Yes. What type of system, and which suburb?</Message>
              <Message>Electric. Ashfield. Ideally next week.</Message>
              <Message speaker="AI Chatbot">
                Your name and mobile so our team can get in touch?
              </Message>
              <Message>
                Noah Williams.<span className="bc-shared-detail">Mobile number shared</span>
              </Message>
            </div>
          </div>
          <div
            className="bc-lead-result"
            aria-label="Noah’s captured contact and original enquiry in the chosen pipeline"
          >
            <div className="bc-result-person">
              <Brand />
              <div>
                <strong>Noah Williams</strong>
                <span>Contact details captured</span>
              </div>
            </div>
            <div className="bc-result-context">
              <span>From the conversation</span>
              <p>“Electric. Ashfield. Ideally next week.”</p>
            </div>
            <div className="bc-result-stage">
              <span>Pipeline stage</span>
              <strong>New enquiry</strong>
            </div>
          </div>
          <p className="bc-stage-note">Choose your pipeline and follow-up during setup.</p>
        </div>
      </div>
    </section>
  );
}
function Booking() {
  return (
    <section className="bc-section bc-booking-section" aria-labelledby="chatbot-booking-title">
      <div className="bc-wrap bc-feature-row bc-reverse">
        <SectionCopy
          label="Appointments"
          title="Book while they’re interested."
          id="chatbot-booking-title"
        >
          <p>
            Check the calendars you allow, offer an available time and create the appointment once
            the visitor agrees.
          </p>
          <a className="bc-link" href="/features/calendars-bookings">
            Explore Calendars &amp; Bookings
          </a>
        </SectionCopy>
        <div className="bc-stage bc-booking-stage">
          <img
            className="bc-dental-photo"
            src="/concept/features/chatbot-dental-appointment-v2-20261027.webp"
            alt="A dentist occupied with a patient while another visitor arranges an appointment"
            width="1448"
            height="1086"
            loading="lazy"
          />
          <div className="bc-booking-lower">
            <div
              className="bc-booking-chat"
              aria-label="Harper agrees to the offered appointment and supplies contact details"
            >
              <p className="bc-small-heading">
                <ZaplaPetal size={21} />
                Bayside Dental · AI Chatbot
              </p>
              <Message speaker="AI Chatbot">
                Friday at 2 pm is available for a new patient visit. Shall I book it?
              </Message>
              <Message>
                Yes, please. Harper Reed.
                <span className="bc-shared-detail">Mobile number shared</span>
              </Message>
            </div>
            <div
              className="bc-calendar"
              aria-label="Harper Reed’s agreed new patient visit, booked for Friday at 2 pm"
            >
              <p className="bc-small-heading">
                <CalendarDays size={16} aria-hidden="true" />
                Appointment booked
              </p>
              <h3>
                Friday <span>2 pm</span>
              </h3>
              <div className="bc-calendar-event">
                <strong>New patient visit</strong>
                <span>Harper Reed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Knowledge() {
  return (
    <section className="bc-section" aria-labelledby="chatbot-knowledge-title">
      <div className="bc-wrap bc-feature-row">
        <SectionCopy
          label="Knowledge base"
          title="Your business information. Useful answers."
          id="chatbot-knowledge-title"
        >
          <p>
            Use your website pages, documents and written instructions to prepare answers about your
            services. Test the responses before customers use them.
          </p>
          <p className="bc-copy-secondary">
            Choose what it can answer and when your team should step in.
          </p>
        </SectionCopy>
        <div className="bc-stage bc-knowledge-stage">
          <div className="bc-knowledge-header">
            <Brand />
            <span>AI Chatbot · Knowledge</span>
          </div>
          <div className="bc-knowledge-grid">
            <div
              className="bc-source-list"
              aria-label="Types of business information supplied to the chatbot"
            >
              <h3>Business information</h3>
              <div>
                <Globe2 size={18} aria-hidden="true" />
                <p>
                  <strong>Website pages</strong>
                  <span>Services &amp; service areas</span>
                </p>
              </div>
              <div className="bc-source-selected">
                <FileText size={18} aria-hidden="true" />
                <p>
                  <strong>Service guide</strong>
                  <span>Uploaded document</span>
                </p>
              </div>
              <div>
                <BookOpen size={18} aria-hidden="true" />
                <p>
                  <strong>Team instructions</strong>
                  <span>When to involve a person</span>
                </p>
              </div>
            </div>
            <div className="bc-source-detail">
              <span className="bc-small-label">From your service guide</span>
              <h3>Apartment hot-water replacements</h3>
              <p>
                We replace electric hot-water systems in apartments. Access and strata requirements
                are checked at the assessment.
              </p>
            </div>
          </div>
          <div
            className="bc-knowledge-answer"
            aria-label="An answer based on the supplied service guide"
          >
            <Message>Do you replace hot-water systems in apartments?</Message>
            <Message speaker="AI Chatbot">
              Yes. We replace electric systems in apartments. We’ll check access and any strata
              requirements at your assessment.
            </Message>
          </div>
        </div>
      </div>
    </section>
  );
}
function Handoff() {
  return (
    <section className="bc-section bc-handoff-section" aria-labelledby="chatbot-handoff-title">
      <div className="bc-wrap bc-feature-row bc-reverse">
        <SectionCopy
          label="Human handoff & unified inbox"
          title="Your team can pick up the conversation."
          id="chatbot-handoff-title"
        >
          <p>
            When a request needs a person, bring your team in with the question and conversation
            context. They can continue the live web chat from Unified Inbox.
          </p>
          <a className="bc-link" href="/features/unified-inbox">
            Explore Unified Inbox
          </a>
          <div className="bc-notification-copy">
            <h3>Keep new messages in view.</h3>
            <p>Choose message notifications in Zapla and browser alerts when enabled.</p>
          </div>
        </SectionCopy>
        <div className="bc-stage bc-inbox-stage">
          <div className="bc-inbox-app">
            <div className="bc-app-header">
              <Brand />
              <span>Unified Inbox</span>
            </div>
            <div className="bc-inbox-grid">
              <div className="bc-conversation-list" aria-label="Customer conversations">
                <p className="bc-small-heading">
                  <MessagesSquare size={16} aria-hidden="true" />
                  Conversations
                </p>
                <div className="bc-inbox-person bc-inbox-selected">
                  <Avatar cell={6} />
                  <div>
                    <strong>Noah Williams</strong>
                    <span>Can I supply my own system?</span>
                  </div>
                </div>
                <div className="bc-inbox-person">
                  <Avatar cell={14} />
                  <div>
                    <strong>Harper Reed</strong>
                    <span>Thanks for confirming.</span>
                  </div>
                </div>
                <div className="bc-inbox-person">
                  <Avatar cell={5} />
                  <div>
                    <strong>Alex Chen</strong>
                    <span>I’d like to arrange an appraisal.</span>
                  </div>
                </div>
              </div>
              <div
                className="bc-human-thread"
                aria-label="Noah’s conditional question, AI handover and subsequent reply from Leah"
              >
                <div className="bc-thread-person">
                  <Avatar cell={6} />
                  <div>
                    <strong>Noah Williams</strong>
                    <span>Live web chat</span>
                  </div>
                </div>
                <Message>Can I supply my own system?</Message>
                <Message speaker="AI Chatbot">
                  Our team needs to confirm that. I’ll pass on your question.
                </Message>
                <div className="bc-team-label">Leah · Your team</div>
                <Message speaker="Leah">Hi Noah, which brand and model are you looking at?</Message>
              </div>
            </div>
          </div>
          <div
            className="bc-message-notice"
            aria-label="A message notification in Zapla; browser alerts depend on settings and permission"
          >
            <Bell size={18} aria-hidden="true" />
            <div>
              <strong>New message · Noah Williams</strong>
              <span>“Can I supply my own system?”</span>
            </div>
            <span className="bc-notice-setting">In Zapla · Browser alerts when enabled</span>
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
    <section className="bc-section bc-setup" aria-labelledby="chatbot-setup-title">
      <div className="bc-wrap bc-setup-layout">
        <div className="bc-setup-copy">
          <p className="bc-label">Guided Launch</p>
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
          <p className="bc-setup-scope">
            Guided Launch is separately priced for a new standard setup.
          </p>
          <a className="bc-link" href="/Pricing-v3">
            Plans and setup
          </a>
        </div>
        <div className="bc-faq" aria-label="Practical chatbot questions">
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
      <LeadCapture />
      <Booking />
      <Knowledge />
      <Handoff />
      <SetupAndFaq />
      <section className="bc-final">
        <div className="bc-wrap">
          <div className="bc-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="bc-label">See it around your business</p>
          <h2>
            See how Zapla would <br className="bc-desktop-break" />
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
