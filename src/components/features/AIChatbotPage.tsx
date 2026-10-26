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
  question: "Do you replace air conditioning in Marrickville?",
  timing: "Next week. Can your team get in touch?",
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
              Answer the question.
              <br />
              Capture the enquiry.
            </h1>
          </header>
          <div className="cb-opening-copy">
            <p>
              Answer website questions around the clock, ask what matters and collect contact
              details in the conversation. Give your team an enquiry they can follow up, with the
              customer’s context already in Zapla.
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
                  <strong>On your website</strong>
                  <span>Zapla AI Chatbot</span>
                </div>
              </div>
              <Message introduce>{ENQUIRY.question}</Message>
              <Message ai introduce>
                Yes, we cover Marrickville. When are you looking to replace it?
              </Message>
              <Message introduce>
                {ENQUIRY.timing} I’m {ENQUIRY.name}, {ENQUIRY.email}.
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
                <span>From the conversation</span>
                <p>“{ENQUIRY.question}”</p>
                <p>“{ENQUIRY.timing}”</p>
              </div>
              <a className="cb-text-link" href="/crm">
                Connected to your CRM
              </a>
            </aside>
          </div>
        </div>
        <div className="cb-enquiry-caption">
          <p>Choose the questions around need, location, timing and budget where relevant.</p>
          <span>Even outside business hours.</span>
        </div>
        <div className="cb-follow-through">
          <div>
            <p className="cb-eyebrow">After the contact is captured</p>
            <h2>
              Give the enquiry
              <br />a next step.
            </h2>
            <p>
              Choose which pipeline receives new enquiries and which follow-up begins. Your team can
              pick up Mia’s request with her details already in Zapla.
            </p>
          </div>
          <div
            className="cb-configured-plan"
            aria-label="A configured pipeline stage and review task for Mia’s enquiry"
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
              <div>
                <dt>Follow-up task</dt>
                <dd>Review Mia’s enquiry</dd>
              </div>
            </dl>
            <p>You choose the pipeline, stage and automation during setup.</p>
            <a className="cb-text-link" href="/features/automation-builder">
              Explore Automation Builder
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const KNOWLEDGE = [
  {
    question: "How much does a replacement cost?",
    title: "How we quote",
    type: "Uploaded document",
    source:
      "Assess the home before quoting for a replacement. Final pricing depends on the installation.",
    answer:
      "We quote after an assessment so we can check what your home needs. I can help you find an available time.",
  },
  {
    question: "Do you cover Marrickville?",
    title: "Where we work",
    type: "Website page",
    source:
      "Air conditioning installations and replacements across Sydney’s Inner West, including Marrickville.",
    answer:
      "Yes, we cover Marrickville and the surrounding Inner West. Is this a new installation or a replacement?",
  },
  {
    question: "Can you install a unit I bought elsewhere?",
    title: "When the team needs to confirm",
    type: "Written instructions",
    source:
      "Ask the team to confirm requests to install customer-supplied equipment. Do not promise that the work is accepted.",
    answer:
      "I’ll pass your question to our team so they can confirm whether they can help with the unit you’ve bought.",
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
            <p className="cb-eyebrow">Your information. A more useful answer.</p>
            <h2 id="chatbot-knowledge-heading">
              Show it how
              <br />
              your business works.
            </h2>
          </div>
          <p>
            Add website pages, documents and written instructions. Choose the actions it can take,
            then test the responses before putting it in front of customers.
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
            aria-live="polite"
            aria-atomic="true"
          >
            <article className="cb-source-document" key={active.title}>
              <div className="cb-document-heading">
                <span>Business knowledge</span>
                <span>{active.type}</span>
              </div>
              <h3>{active.title}</h3>
              <p>{active.source}</p>
              <span className="cb-source-footnote">Information supplied by your business</span>
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
          <style>{".cb-question-choices{display:none!important}"}</style>
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
          <p>Select a question to see the supplied information and response together.</p>
          <p>You can limit access to the calendars and other resources it uses.</p>
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
            <p className="cb-eyebrow">When the next step is an appointment</p>
            <h2 id="chatbot-booking-heading">
              Offer a time.
              <br />
              Book it when they agree.
            </h2>
            <p>
              With calendar access enabled, the chatbot can check availability and offer a suitable
              appointment. Mia’s enquiry can continue without a separate booking form.
            </p>
            <Message ai introduce>
              Friday at 2 pm is available for an assessment. Would you like me to book it?
            </Message>
          </div>
          <div className="cb-booking-agreement" ref={agreementRef}>
            <Message introduce>Yes, please.</Message>
            <h3>
              The agreed time,
              <br />
              with the right person’s details.
            </h3>
            <p>
              The booking uses the name Mia already supplied in the conversation. You choose the
              calendars and booking options the chatbot can use.
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
            <p className="cb-eyebrow">When a request needs your judgement</p>
            <h2 id="chatbot-human-heading">
              Know when to
              <br />
              bring a person in.
            </h2>
          </div>
          <p>
            Let the chatbot handle the routine first response. Your team can review the original
            question and conversation context when a request needs their judgement.
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
            A different request, with the original conversation available for your team to review.
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
            Agree the boundaries.
            <br />
            Then launch.
          </h2>
          <p>
            We work through the questions your customers ask, the details to collect and the actions
            to enable. Then we test how the chatbot responds.
          </p>
          <p>
            Starting with a website and separate inboxes? We’ll map a practical first setup. Already
            using a CRM or booking system? We’ll review where Zapla fits.
          </p>
          <Cta>Talk through your setup</Cta>
          <p className="cb-launch-scope">
            Guided Launch is scoped and priced separately from your monthly plan.
          </p>
        </div>
        <div className="cb-launch-plan">
          <h3>Your launch plan</h3>
          <dl>
            <div>
              <dt>Business information</dt>
              <dd>
                Website pages, documents and instructions, with a plan for keeping them up to date.
              </dd>
            </div>
            <div>
              <dt>Permitted next steps</dt>
              <dd>
                Contact details, pipeline and follow-up, calendar access and the questions that need
                your team.
              </dd>
            </div>
            <div>
              <dt>Your website experience</dt>
              <dd>A floating widget or inline chat, with your greeting, colours and placement.</dd>
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
    "The contact can be created in Zapla. You can configure a pipeline stage and follow-up automation for new enquiries, such as a task for your team to review the request. We agree the steps with you during setup.",
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
