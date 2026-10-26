import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

// Prepared marketing walkthroughs. No visitor details are collected, and these
// controls never call an AI service, create a contact or make a booking.
const ENQUIRY = {
  name: "Mia Thompson",
  question: "Do you replace ducted air conditioning in Marrickville?",
  timing: "It’s for my home. Ideally next week.",
} as const;

function Avatar({ cell = 9 }: { cell?: number }) {
  return (
    <span
      className="cb-avatar"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundPosition: ((cell % 6) / 5) * 100 + "% " + (Math.floor(cell / 6) / 3) * 100 + "%",
      }}
    />
  );
}
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="cb-cta" href="/booking">
      {children}
    </a>
  );
}
function Message({
  children,
  ai = false,
  introduce = false,
}: {
  children: ReactNode;
  ai?: boolean;
  introduce?: boolean;
}) {
  return (
    <div className={"cb-message" + (ai ? " cb-message-ai" : "")}>
      <span className="cb-message-mark" aria-hidden="true">
        {ai ? <ZaplaPetal size={28} /> : <Avatar />}
      </span>
      <div className="cb-message-copy">
        <span className={introduce ? "cb-speaker" : "cb-sr-only"}>
          {ai ? "Zapla · AI Chatbot" : "Mia"}
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
}

function EnquiryOpening() {
  return (
    <section className="cb-opening" aria-labelledby="chatbot-title">
      <div className="cb-wrap">
        <div className="cb-hero-layout">
          <header className="cb-hero-copy">
            <p className="cb-eyebrow">AI Chatbot</p>
            <h1 id="chatbot-title">
              <span>Answer the question.</span> <span>Capture the enquiry.</span>
            </h1>
            <p>
              You’re with a customer. Your next enquiry is on your website. Let Zapla answer, find
              out what they need and collect their details, even after hours.
            </p>
            <div className="cb-actions">
              <Cta />
              <a className="cb-text-link" href="#chatbot-knowledge-heading">
                See how it works
              </a>
            </div>
            <p className="cb-hero-scope">On your existing website. Connected to Zapla.</p>
          </header>
          <div
            className="cb-enquiry-stage"
            aria-label="A website conversation becoming an enquiry in Zapla"
          >
            <div className="cb-website-conversation">
              <div className="cb-product-heading">
                <ZaplaPetal size={27} />
                <div>
                  <strong>Your website chat</strong>
                  <span>Zapla AI Chatbot</span>
                </div>
              </div>
              <div className="cb-widget-thread">
                <Message>{ENQUIRY.question}</Message>
                <Message ai>
                  Yes, we do. Is it for your home or a business, and when do you need it?
                </Message>
                <Message>{ENQUIRY.timing}</Message>
                <Message ai>What’s your name and email so our team can get in touch?</Message>
                <Message>
                  {ENQUIRY.name}
                  <span className="cb-shared-contact">Email address shared</span>
                </Message>
              </div>
            </div>
            <aside
              className="cb-created-contact"
              aria-label="Mia’s contact and configured follow-up in Zapla"
            >
              <p className="cb-record-label">
                <ZaplaPetal size={22} />
                <span>Enquiry in Zapla</span>
              </p>
              <div className="cb-contact-person">
                <Avatar />
                <div>
                  <h2>{ENQUIRY.name}</h2>
                  <p>Name and email captured</p>
                </div>
              </div>
              <div className="cb-original-request">
                <span>Original conversation</span>
                <p>“{ENQUIRY.question}”</p>
                <p>“{ENQUIRY.timing}”</p>
              </div>
              <dl className="cb-contact-stage">
                <div>
                  <dt>Chosen pipeline stage</dt>
                  <dd>New enquiry</dd>
                </div>
              </dl>
              <div className="cb-contact-followup">
                <span>Configured follow-up · Email</span>
                <p>Thanks for getting in touch, Mia.</p>
              </div>
              <div className="cb-record-links">
                <a className="cb-text-link" href="/crm">
                  CRM
                </a>
                <a className="cb-text-link" href="/features/automation-builder">
                  Automation Builder
                </a>
              </div>
            </aside>
          </div>
        </div>
        <ul className="cb-business-benefits" aria-label="What changes for your business">
          <li>
            <strong>Answer while you’re unavailable.</strong>
            <p>Handle routine questions without someone staffing live chat.</p>
          </li>
          <li>
            <strong>Know more before you call.</strong>
            <p>Ask about the need, timing and fit before your team follows up.</p>
          </li>
          <li>
            <strong>Keep the enquiry moving.</strong>
            <p>Create the contact, choose its pipeline and configure the next message.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

const KNOWLEDGE = [
  {
    question: "Will you remove the old system too?",
    title: "Ducted system replacements",
    shortTitle: "Replacement services",
    type: "Uploaded document",
    facts: [
      ["Included", "Removal of the existing indoor and outdoor units."],
      ["Checked at the assessment", "Access and installation requirements."],
    ],
    answer:
      "Yes. We remove the old indoor and outdoor units as part of a ducted replacement. We’ll check access at your assessment. Would you like help finding a time?",
  },
  {
    question: "What happens at the assessment?",
    title: "Your on-site assessment",
    shortTitle: "On-site assessments",
    type: "Website page",
    facts: [
      ["What we look at", "Your existing system, room layout and access for installation."],
      ["What happens next", "Our team prepares a quote for the recommended replacement."],
    ],
    answer:
      "We’ll look at your existing system, room layout and installation access, then prepare a quote for a suitable replacement. Is this for your home or a business?",
  },
  {
    question: "Can someone help outside the Inner West?",
    title: "Service-area enquiries",
    shortTitle: "Service-area enquiries",
    type: "Written instructions",
    facts: [
      ["Service area", "Sydney’s Inner West."],
      [
        "For other suburbs",
        "Collect the location. Ask the team to confirm before offering an appointment.",
      ],
    ],
    answer:
      "We usually work across Sydney’s Inner West. Which suburb are you in? I can ask our team to confirm whether we can help before arranging a visit.",
  },
] as const;

function KnowledgeProof() {
  const [selected, setSelected] = useState(0);
  const active = KNOWLEDGE[selected];
  return (
    <section className="cb-section cb-knowledge" aria-labelledby="chatbot-knowledge-heading">
      <div className="cb-wrap cb-knowledge-layout">
        <div className="cb-knowledge-copy">
          <p className="cb-eyebrow">Your services. Your way of working.</p>
          <h2 id="chatbot-knowledge-heading">
            Useful answers start with your business information.
          </h2>
          <p>
            Add your website pages, documents and written instructions. Explain what’s included, how
            your service works and what needs your team’s judgement.
          </p>
          <div className="cb-question-choices">
            <p>Try a customer question</p>
            {KNOWLEDGE.map((item, index) => (
              <button
                key={item.question}
                type="button"
                aria-pressed={selected === index}
                aria-controls="chatbot-knowledge-response"
                onClick={() => setSelected(index)}
              >
                {item.question}
              </button>
            ))}
          </div>
        </div>
        <div className="cb-knowledge-workbench">
          <div className="cb-knowledge-sources">
            <div
              className="cb-source-library"
              aria-label="Business information supplied to the chatbot"
            >
              <p>Your business information</p>
              <ul>
                {KNOWLEDGE.map((item, index) => (
                  <li key={item.title} data-selected={selected === index}>
                    <span>{item.type}</span>
                    <strong>{item.shortTitle}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <article
              className="cb-source-document"
              aria-label="Information behind the selected answer"
            >
              <span>{active.type}</span>
              <h3>{active.title}</h3>
              <dl>
                {active.facts.map(([label, fact]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{fact}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </div>
          <div
            id="chatbot-knowledge-response"
            className="cb-knowledge-response"
            role="region"
            aria-label={active.question}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="cb-visitor-question">“{active.question}”</p>
            <div className="cb-knowledge-answer">
              <ZaplaPetal size={25} />
              <div>
                <span>Zapla AI Chatbot</span>
                <p>{active.answer}</p>
              </div>
            </div>
          </div>
          <p className="cb-knowledge-testing">
            Test answers before launch. Keep the information current as your business changes.
          </p>
        </div>
        <noscript>
          <style>{".cb-question-choices{display:none!important}"}</style>
          <div className="cb-static-answers">
            {KNOWLEDGE.slice(1).map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}

function BookingProof() {
  return (
    <section className="cb-section cb-booking" aria-labelledby="chatbot-booking-heading">
      <div className="cb-wrap cb-booking-layout">
        <div className="cb-booking-copy">
          <p className="cb-eyebrow">From a question to an appointment</p>
          <h2 id="chatbot-booking-heading">Book while they’re interested.</h2>
          <p>
            Check your connected calendar and offer an available time in the conversation. Once the
            customer agrees, Zapla can create the appointment.
          </p>
          <p>
            You choose which calendars and booking options the chatbot can use. Your team stays in
            control of what it can arrange.
          </p>
          <a className="cb-text-link" href="/features/calendars-bookings">
            Explore Calendars &amp; Bookings
          </a>
        </div>
        <div
          className="cb-booking-scene"
          aria-label="Mia agrees to an available time before her appointment is created"
        >
          <div className="cb-booking-conversation">
            <p className="cb-scene-label">Continuing Mia’s conversation</p>
            <Message ai introduce>
              Friday at 2 pm is available for an assessment. Would you like me to book it?
            </Message>
            <Message introduce>Yes, please.</Message>
          </div>
          <div className="cb-calendar-surface">
            <div className="cb-calendar-heading">
              <span>On-site assessments</span>
              <ZaplaPetal size={24} />
            </div>
            <h3>Friday</h3>
            <div className="cb-calendar-appointment">
              <span className="cb-appointment-time">2 pm</span>
              <div>
                <h4>On-site assessment</h4>
                <p>{ENQUIRY.name}</p>
                <span>Marrickville</span>
              </div>
            </div>
            <p className="cb-booking-created">Appointment created after Mia’s agreement</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanHandover() {
  return (
    <section className="cb-section cb-human" aria-labelledby="chatbot-human-heading">
      <div className="cb-wrap">
        <div className="cb-section-heading">
          <div>
            <p className="cb-eyebrow">Routine questions handled. Judgement stays with you.</p>
            <h2 id="chatbot-human-heading">
              Your team handles
              <br />
              the exceptions.
            </h2>
          </div>
          <p>
            Unusual requests still need someone who knows the work. Set the chatbot to involve your
            team, with the original question and conversation context available to review.
          </p>
        </div>
        <div className="cb-human-scene">
          <img
            src="/concept/features/chatbot-team-review-v3.webp"
            alt="A service team reviewing an installation drawing together at a worktable"
            width="2020"
            height="778"
            loading="lazy"
          />
          <div className="cb-handover-paper">
            <div className="cb-human-question">
              <Avatar />
              <div>
                <span>Mia’s question</span>
                <p>Can you install a unit I bought elsewhere?</p>
              </div>
            </div>
            <div className="cb-human-response">
              <ZaplaPetal size={27} />
              <div>
                <span>Zapla AI Chatbot</span>
                <p>I’ll pass your question to our team so they can confirm.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="cb-human-caption">
          <p>
            Your team can continue with the context, rather than ask the customer to start again.
          </p>
          <a className="cb-text-link" href="/features/unified-inbox">
            Explore Unified Inbox
          </a>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunch() {
  return (
    <section className="cb-section cb-setup">
      <div className="cb-wrap cb-setup-layout">
        <div>
          <p className="cb-eyebrow">Guided Launch</p>
          <h2>
            Your website.
            <br />
            Set up with you.
          </h2>
          <p>
            Keep the website you already use. We help add the chatbot, prepare its business
            information and walk through the enquiries you want it to handle before launch.
          </p>
          <p>
            Starting with a website and separate inboxes? We’ll map a practical first setup. Already
            using a CRM or booking system? We’ll review where Zapla fits.
          </p>
          <Cta>Talk through your setup</Cta>
          <p className="cb-launch-scope">
            Guided Launch is required for a new standard setup and priced separately from your
            monthly plan.
          </p>
        </div>
        <div className="cb-launch-plan">
          <h3>Built around your business</h3>
          <dl>
            <div>
              <dt>Answers your customers need</dt>
              <dd>
                Your services, FAQs and policies from website pages, documents and written
                instructions.
              </dd>
            </div>
            <div>
              <dt>The enquiries you want</dt>
              <dd>
                Questions around need, location, timing and budget where relevant. Choose contact
                capture, pipeline follow-up and the calendars it can use.
              </dd>
            </div>
            <div>
              <dt>A widget that fits your website</dt>
              <dd>
                Your greeting, colours and placement. Use a floating widget or place the chat within
                a page.
              </dd>
            </div>
            <div>
              <dt>Tested before customers use it</dt>
              <dd>
                Check common questions, booking requests and situations that should involve your
                team.
              </dd>
            </div>
          </dl>
          <p>
            Website chat first. SMS, WhatsApp and email can be configured too, with connections and
            usage confirmed during setup.
          </p>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "Can I put it on my existing website?",
    "Yes. Add Zapla’s AI Chatbot as a floating chat widget or within a page on your existing website. We check how to add it during setup, so you can keep the website you already use.",
  ],
  [
    "Can it answer outside business hours?",
    "Yes. An active website chatbot can respond when your team is unavailable. It can answer routine questions, collect contact details and help with the next steps you enable. A human response still depends on your team’s availability.",
  ],
  [
    "Can it qualify an enquiry without a separate form?",
    "Yes. It can ask relevant questions as part of the conversation, such as what someone needs, where they are and when they need help. Budget can be included where it makes sense. Visitors still need to share their name and contact details if they want your team to follow up.",
  ],
  [
    "What happens after the contact is captured?",
    "The contact can be created in Zapla with the details the visitor provides. You can choose a pipeline stage and configure follow-up such as an acknowledgement email. Your team can continue with the enquiry context available. We agree and test those steps during setup.",
  ],
  [
    "Can it book appointments?",
    "Yes. With the calendar tools enabled, the chatbot can check availability, offer a suitable time and create the booking the customer agrees to. You choose the calendars and booking options it can use.",
  ],
  [
    "How do we control what it answers?",
    "You supply the business information it should use through text, uploaded documents or website pages. We agree the questions it should handle, the actions it can take and when your team should get involved, then test the responses before launch. Keep the supplied information up to date as your business changes.",
  ],
  [
    "Does it work beyond website chat?",
    "Alongside website chat, Zapla’s AI Chatbot supports SMS, WhatsApp and email. We confirm your channel connections, configuration and usage terms during setup.",
  ],
  [
    "What if we already use a CRM or booking system?",
    "We review your current tools and the workflow you want before recommending a setup. The chatbot uses the calendars and booking options you choose in Zapla. We check how your existing systems would fit rather than assume every system connects.",
  ],
  [
    "What does this add to a website contact form?",
    "A form collects the details someone is ready to submit. The chatbot can answer their questions first, ask what they need and collect their contact details in the conversation. In Zapla, that enquiry can then connect to your customer record, chosen pipeline and configured follow-up.",
  ],
  [
    "What setup and usage costs should I expect?",
    "Our Pricing page sets out the monthly plans and Guided Launch. Guided Launch is required for a new standard setup and priced separately. Before you start, we confirm chatbot availability in your plan, the AI usage terms and any connected messaging charges for your setup.",
  ],
  [
    "How is this different from the other Zapla AI tools?",
    "AI Chatbot handles customer messages automatically. Unified Inbox gives your team a place to manage conversations and customer information. AI Receptionist handles phone calls. The AI Assistant helps staff work inside the platform.",
  ],
] as const;

export function AIChatbotPage() {
  return (
    <main className="zapla-feature zapla-chatbot">
      <EnquiryOpening />
      <KnowledgeProof />
      <BookingProof />
      <HumanHandover />
      <GuidedLaunch />
      <section className="cb-section cb-faq">
        <div className="cb-wrap cb-faq-grid">
          <div>
            <p className="cb-eyebrow">Before you get started</p>
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
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
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
