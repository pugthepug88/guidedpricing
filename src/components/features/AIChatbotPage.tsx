import { useEffect, useRef, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

// Prepared marketing walkthroughs. No visitor details are collected, and these
// controls never call an AI service, create a contact or make a booking.
const ENQUIRY = {
  name: "Mia Thompson",
  email: "mia@example.com",
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
        <div className="cb-opening-heading">
          <header>
            <p className="cb-eyebrow">AI Chatbot</p>
            <h1 id="chatbot-title">
              Answer the question. <br />
              Capture the enquiry.
            </h1>
          </header>
          <div className="cb-opening-copy">
            <p>
              You’re with a customer. Your next enquiry is on your website. Let Zapla answer, find
              out what they need and collect their details, even after hours.
            </p>
            <div className="cb-actions">
              <Cta />
              <a className="cb-text-link" href="#chatbot-proof">
                See the enquiry take shape
              </a>
            </div>
          </div>
        </div>
        <div
          className="cb-enquiry-stage"
          id="chatbot-proof"
          aria-label="A website question becoming a contact in Zapla"
        >
          <div className="cb-enquiry-window">
            <div className="cb-website-conversation">
              <div className="cb-product-heading">
                <span className="cb-ai-mark">
                  <ZaplaPetal size={30} />
                </span>
                <div>
                  <strong>Your website chat</strong>
                  <span>AI Chatbot · Your business information</span>
                </div>
              </div>
              <Message>{ENQUIRY.question}</Message>
              <Message ai>
                Yes, we do. Is it for your home or a business, and when do you need it?
              </Message>
              <Message>{ENQUIRY.timing}</Message>
              <Message ai>What’s your name and email so our team can get in touch?</Message>
              <Message>
                {ENQUIRY.name}, {ENQUIRY.email}.
              </Message>
            </div>
            <aside
              className="cb-created-contact"
              aria-label="Contact created from Mia’s supplied details"
            >
              <p className="cb-record-label">
                <ZaplaPetal size={25} />
                <span>Contact created in Zapla</span>
              </p>
              <div className="cb-contact-person">
                <Avatar />
                <div>
                  <h2>{ENQUIRY.name}</h2>
                  <p>{ENQUIRY.email}</p>
                </div>
              </div>
              <div className="cb-original-request">
                <span>Mia’s original enquiry</span>
                <p>“{ENQUIRY.question}”</p>
                <p>“{ENQUIRY.timing}”</p>
              </div>
              <a className="cb-text-link" href="/crm">
                Connected to your CRM
              </a>
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
            <strong>Keep the enquiry in Zapla.</strong>
            <p>Bring contact details and conversation context into your customer workflow.</p>
          </li>
        </ul>
        <div className="cb-follow-through">
          <div>
            <p className="cb-eyebrow">Chat, CRM and follow-up together</p>
            <h2>
              Start the follow-up.
              <br />
              Keep the context.
            </h2>
            <p>
              Create the contact, put the enquiry in your chosen pipeline and start an agreed
              automation. An acknowledgement can go out while your team gets on with the day.
            </p>
            <p>
              When you’re ready to respond, the customer’s details and original request are already
              together.
            </p>
            <a className="cb-text-link" href="/features/automation-builder">
              Explore Automation Builder
            </a>
          </div>
          <div
            className="cb-configured-plan"
            aria-label="A configured pipeline stage and acknowledgement email for Mia’s enquiry"
          >
            <p className="cb-plan-for">
              <Avatar />
              <span>For Mia’s website enquiry</span>
            </p>
            <dl>
              <div>
                <dt>Pipeline stage</dt>
                <dd>New enquiry</dd>
              </div>
            </dl>
            <div className="cb-acknowledgement">
              <span>Configured acknowledgement email</span>
              <p className="cb-email-to">To {ENQUIRY.email}</p>
              <h3>Thanks for getting in touch, Mia.</h3>
              <p>
                We’ve received your enquiry. Our team will be in touch to discuss what you need and
                arrange the next step.
              </p>
            </div>
            <p>You choose the pipeline, stage and follow-up during setup.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const KNOWLEDGE = [
  {
    question: "Will you remove the old system too?",
    title: "Ducted system replacements",
    type: "Uploaded document",
    source:
      "Ducted replacements include removal of the existing indoor and outdoor units. Check access and installation requirements at the on-site assessment.",
    answer:
      "Yes. We remove the old indoor and outdoor units as part of a ducted replacement. We’ll check access at your assessment. Would you like help finding a time?",
  },
  {
    question: "What happens at the assessment?",
    title: "Your on-site assessment",
    type: "Website page",
    source:
      "The assessment covers the existing system, room layout and access for installation. The team then prepares a quote for the recommended replacement.",
    answer:
      "We’ll look at your existing system, room layout and installation access, then prepare a quote for a suitable replacement. Is this for your home or a business?",
  },
  {
    question: "Can someone help outside the Inner West?",
    title: "Enquiries outside our service area",
    type: "Written instructions",
    source:
      "Our service area is Sydney’s Inner West. For other suburbs, collect the location and ask the team to confirm before offering an appointment.",
    answer:
      "We usually work across Sydney’s Inner West. Which suburb are you in? I can ask our team to confirm whether we can help before arranging a visit.",
  },
] as const;

function KnowledgeProof() {
  const [selected, setSelected] = useState(0);
  const active = KNOWLEDGE[selected];
  return (
    <section className="cb-section cb-knowledge" aria-labelledby="chatbot-knowledge-heading">
      <div className="cb-wrap">
        <div className="cb-section-heading">
          <div>
            <p className="cb-eyebrow">Your services. Your way of working.</p>
            <h2 id="chatbot-knowledge-heading">
              Give customers
              <br />a useful answer.
            </h2>
          </div>
          <p>
            Give it the information your team uses every day. Explain what’s included, how your
            service works and what to check before a customer takes the next step.
          </p>
        </div>
        <div className="cb-knowledge-workbench">
          <div className="cb-question-choices">
            <p>Choose a customer question</p>
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
          <div
            className="cb-knowledge-proof"
            id="chatbot-knowledge-response"
            role="region"
            aria-label={active.question}
            aria-live="polite"
            aria-atomic="true"
          >
            <article className="cb-source-document" key={active.title}>
              <div className="cb-document-heading">
                <span>Your business information</span>
                <span>{active.type}</span>
              </div>
              <h3>{active.title}</h3>
              <p>{active.source}</p>
              <span className="cb-source-footnote">The information behind the answer</span>
            </article>
            <div className="cb-knowledge-answer" key={active.question}>
              <div>
                <ZaplaPetal size={29} />
                <span>Zapla AI Chatbot</span>
              </div>
              <p>{active.answer}</p>
            </div>
          </div>
        </div>
        <noscript>
          <style>
            {".cb-question-choices,.cb-knowledge-foot>p:first-child{display:none!important}"}
          </style>
          <div className="cb-static-answers">
            {KNOWLEDGE.slice(1).map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>
                  {item.type}: {item.source}
                </p>
                <p>Chatbot response: {item.answer}</p>
              </article>
            ))}
          </div>
        </noscript>
        <div className="cb-knowledge-foot">
          <p>Use website pages, uploaded documents and written instructions.</p>
          <p>
            Test the answers before launch. Keep your information current as the business changes.
          </p>
        </div>
      </div>
    </section>
  );
}

function BookingProof() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const agreementRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ enhanced: false, booked: true });
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let completed = false;
    const update = () => {
      frame = 0;
      const scene = sceneRef.current;
      const agreement = agreementRef.current;
      const enhanced = media.matches && !!scene && scene.offsetHeight <= window.innerHeight - 145;
      completed =
        completed ||
        (!!agreement && agreement.getBoundingClientRect().top < window.innerHeight * 0.7);
      const booked = !enhanced || completed;
      setProgress((old) =>
        old.enhanced === enhanced && old.booked === booked ? old : { enhanced, booked },
      );
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", requestUpdate);
    const observer = new ResizeObserver(requestUpdate);
    if (sceneRef.current) observer.observe(sceneRef.current);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
      observer.disconnect();
    };
  }, []);
  return (
    <section className="cb-section cb-booking" aria-labelledby="chatbot-booking-heading">
      <div
        className="cb-wrap cb-booking-layout"
        data-enhanced={progress.enhanced}
        data-booked={progress.booked}
      >
        <div className="cb-booking-explanation">
          <div className="cb-booking-offer">
            <p className="cb-eyebrow">From a question to an appointment</p>
            <h2 id="chatbot-booking-heading">
              Help them book
              <br />
              while they’re interested.
            </h2>
            <p>
              When a visitor is ready, check your connected calendar and offer an available time in
              the conversation. Create the appointment once they agree.
            </p>
            <Message ai introduce>
              Friday at 2 pm is available for an assessment. Would you like me to book it?
            </Message>
          </div>
          <div className="cb-booking-agreement" ref={agreementRef}>
            <Message introduce>Yes, please.</Message>
            <h3>Mia agrees. Zapla books.</h3>
            <p>
              The enquiry becomes an agreed appointment without another round of messages to arrange
              a time. You choose which calendars and booking options the chatbot can use.
            </p>
            <a className="cb-text-link" href="/features/calendars-bookings">
              Explore Calendars &amp; Bookings
            </a>
          </div>
        </div>
        <div
          className="cb-booking-scene"
          ref={sceneRef}
          aria-label="An available assessment time followed by Mia’s agreed booking"
        >
          <div className="cb-calendar-surface">
            <div className="cb-calendar-heading">
              <div>
                <span>On-site assessments</span>
                <h3>Friday</h3>
              </div>
              <ZaplaPetal size={32} />
            </div>
            <div className="cb-calendar-hours">
              <div>
                <span>1 pm</span>
                <span />
              </div>
              <div className="cb-offered-time">
                <span>2 pm</span>
                <div>
                  <strong>
                    {progress.booked ? "On-site assessment" : "Available for an assessment"}
                  </strong>
                  <span>{progress.booked ? ENQUIRY.name : "Offered in the conversation"}</span>
                </div>
              </div>
              <div>
                <span>3 pm</span>
                <span />
              </div>
            </div>
          </div>
          <div className="cb-booking-outcome">
            <p className="cb-booking-pending" aria-hidden="true">
              A time offered.
              <br />
              Waiting for Mia’s agreement.
            </p>
            <div className="cb-confirmed-booking">
              <p className="cb-record-label">
                <ZaplaPetal size={25} />
                <span>Booking created</span>
              </p>
              <h3>On-site assessment</h3>
              <p className="cb-booked-time">Friday at 2 pm</p>
              <p>
                <Avatar />
                {ENQUIRY.name} · Marrickville
              </p>
            </div>
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
    "Is AI usage included in the monthly plan?",
    "We confirm the chatbot’s plan availability, AI usage and any connected messaging charges before you start. Guided Launch is scoped and priced separately. We’ll walk through the current pricing and expected setup on your call.",
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
