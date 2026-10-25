import { useEffect, useRef, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

// Fixed explanatory details. This page never submits a message, creates a
// contact or books an appointment. No visitor data is requested by the demo.
const ENQUIRY = {
  name: "Mia Thompson",
  email: "mia@example.com",
  request: "A replacement. We’d like it sorted next week.",
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
      <div className="cb-message-mark" aria-hidden="true">
        {ai ? <ZaplaPetal size={29} /> : <Avatar />}
      </div>
      <div className="cb-message-copy">
        <span className={introduce ? "cb-speaker" : "cb-sr-only"}>
          {ai ? "Zapla · AI Chatbot" : "Mia"}
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
}

function WebsiteHero() {
  return (
    <section className="cb-opening" aria-labelledby="chatbot-title">
      <div className="cb-wrap">
        <div className="cb-hero-shell">
          <header className="cb-hero">
            <p className="cb-eyebrow">AI Chatbot</p>
            <h1 id="chatbot-title">
              <span>Customer questions</span> <span>shouldn’t have</span> <span>to wait.</span>
            </h1>
            <p className="cb-hero-description">
              Answer routine enquiries, collect the details you need and book suitable appointments
              with Zapla’s AI Chatbot. Bring your team in when the conversation needs a person.
            </p>
            <div className="cb-actions">
              <Cta />
              <a className="cb-text-link" href="#chatbot-enquiry">
                See how it works
              </a>
            </div>
          </header>
          <div
            className="cb-hero-product"
            aria-label="A visitor getting an answer from your website chatbot"
          >
            <div className="cb-widget">
              <div className="cb-widget-heading">
                <span className="cb-ai-mark">
                  <ZaplaPetal size={34} />
                </span>
                <div>
                  <strong>Ask us a question</strong>
                  <span>Zapla AI Chatbot</span>
                </div>
              </div>
              <Message introduce>Do you install air conditioning in Marrickville?</Message>
              <Message ai introduce>
                Yes, we cover Sydney’s Inner West, including Marrickville. Is this a new
                installation or a replacement?
              </Message>
              <Message introduce>{ENQUIRY.request}</Message>
            </div>
            <p className="cb-hero-note">On your website. Even outside business hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCapture() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ enhanced: false, captured: false });

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let completed = false;
    const update = () => {
      frame = 0;
      const scene = sceneRef.current;
      const height = window.innerHeight;
      const enhanced = media.matches && !!scene && scene.offsetHeight <= height - 130;
      completed = completed || (!!scene && scene.getBoundingClientRect().top < height * 0.48);
      setProgress((previous) =>
        previous.enhanced === enhanced && previous.captured === completed
          ? previous
          : { enhanced, captured: completed },
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
    <section
      className="cb-section cb-capture"
      id="chatbot-enquiry"
      aria-labelledby="chatbot-capture-heading"
    >
      <div className="cb-wrap">
        <div className="cb-chapter-intro">
          <div>
            <p className="cb-eyebrow">Lead qualification &amp; contact capture</p>
            <h2 id="chatbot-capture-heading">
              Know what they need
              <br className="cb-desktop-break" /> before you call.
            </h2>
          </div>
          <div>
            <p>
              Ask about the service, location and timing as part of the conversation. Collect their
              contact details so your team has someone to follow up with.
            </p>
            <p>
              Choose the questions that matter to your business, including budget where it makes
              sense.
            </p>
          </div>
        </div>
        <div
          className="cb-capture-track"
          data-enhanced={progress.enhanced}
          data-captured={progress.captured}
        >
          <div className="cb-capture-stage" ref={sceneRef}>
            <div className="cb-intake-conversation">
              <p className="cb-scene-label">Continuing Mia’s website enquiry</p>
              <Message ai introduce>
                We can arrange an assessment. What’s your name and email so our team can follow up?
              </Message>
              <Message introduce>
                {ENQUIRY.name}. {ENQUIRY.email}.
              </Message>
            </div>
            <div className="cb-record-backdrop">
              <div className="cb-contact-record">
                <div className="cb-record-label">
                  <ZaplaPetal size={27} />
                  <span>Contact created in Zapla</span>
                </div>
                <div className="cb-record-person">
                  <Avatar />
                  <div>
                    <h3>{ENQUIRY.name}</h3>
                    <p>{ENQUIRY.email}</p>
                  </div>
                </div>
                <div className="cb-record-conversation">
                  <span>From this conversation</span>
                  <p>“{ENQUIRY.request}”</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cb-capture-payoff">
          <h3>A useful enquiry. Already in your CRM.</h3>
          <a className="cb-text-link" href="/crm">
            Explore Zapla CRM
          </a>
        </div>
      </div>
    </section>
  );
}

function ConnectedNextStep() {
  return (
    <section className="cb-section cb-connected" aria-labelledby="chatbot-next-heading">
      <div className="cb-wrap">
        <div
          className="cb-next-scene"
          aria-label="Mia’s enquiry in a pipeline with a configured review task"
        >
          <div className="cb-connected-intro">
            <div>
              <p className="cb-eyebrow">Connected to your next step</p>
              <h2 id="chatbot-next-heading">
                Give the enquiry
                <br />
                somewhere to go.
              </h2>
            </div>
            <p>
              Add new enquiries to the right pipeline stage and start the follow-up you’ve agreed.
              Your team can see what needs attention, with the customer’s details already in Zapla.
            </p>
            <a className="cb-text-link" href="/features/automation-builder">
              Explore Automation Builder
            </a>
          </div>
          <div className="cb-continuation-paper">
            <div className="cb-opportunity">
              <p className="cb-next-label">Pipeline · New enquiry</p>
              <div className="cb-opportunity-person">
                <Avatar />
                <span>{ENQUIRY.name}</span>
              </div>
              <h3>Air conditioning replacement</h3>
              <p>Marrickville · Website chat</p>
            </div>
            <div className="cb-review-task">
              <p className="cb-next-label">Your configured follow-up</p>
              <h3>Review Mia’s enquiry</h3>
              <p>A task for your team to read the request and agree the next step.</p>
              <p className="cb-task-email">{ENQUIRY.email}</p>
            </div>
          </div>
        </div>
        <div className="cb-next-caption">
          <p>You choose the pipeline, stage and follow-up during setup.</p>
        </div>

        <details className="cb-booking-demo">
          <summary>
            <div>
              <span>Ready for an appointment?</span>
              <strong>See how the chatbot can book an assessment.</strong>
            </div>
            <Plus size={22} aria-hidden="true" />
          </summary>
          <div className="cb-booking-demo-content">
            <div className="cb-booking-transcript">
              <Message ai introduce>
                Friday at 2 pm is available for an assessment. Would you like me to book it?
              </Message>
              <Message introduce>Yes, please.</Message>
            </div>
            <div className="cb-booking-result">
              <div className="cb-result-head">
                <span>Booking created</span>
                <ZaplaPetal size={25} />
              </div>
              <h3>On-site assessment</h3>
              <p className="cb-booking-time">Friday at 2 pm</p>
              <p>{ENQUIRY.name} · Marrickville</p>
              <p>Air conditioning replacement</p>
            </div>
            <p className="cb-booking-note">
              With calendar access enabled, the chatbot can offer an available time and book it once
              the customer agrees.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

function BusinessAnswers() {
  return (
    <section className="cb-section cb-knowledge" aria-labelledby="chatbot-knowledge-heading">
      <div className="cb-wrap cb-knowledge-layout">
        <div className="cb-knowledge-intro">
          <p className="cb-eyebrow">Answers from your business information</p>
          <h2 id="chatbot-knowledge-heading">
            Your services.
            <br />
            Your way of answering.
          </h2>
          <p>
            Give the chatbot the information behind a helpful answer, from service areas and opening
            hours to how you quote and book.
          </p>
        </div>
        <div className="cb-knowledge-scene">
          <div className="cb-source">
            <span>Information you supply</span>
            <h3>How we quote</h3>
            <p>
              We assess the home before quoting for a replacement. Final pricing depends on the
              installation.
            </p>
            <p className="cb-source-origin">
              From your website, documents or written instructions.
            </p>
          </div>
          <div className="cb-informed-answer">
            <Message introduce>How much would a replacement cost?</Message>
            <Message ai introduce>
              We quote after an assessment so we can check what your home needs. I can help you find
              an available time.
            </Message>
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
        <div className="cb-human-title">
          <div>
            <p className="cb-eyebrow">Human handover</p>
            <h2 id="chatbot-human-heading">
              The conversation
              <br />
              can come to you.
            </h2>
          </div>
          <p>
            Let the chatbot handle the routine first response. Bring in your team when an enquiry
            needs their judgement.
          </p>
        </div>
        <div className="cb-human-editorial">
          <img
            src="/concept/features/chatbot-team-review-v3.webp"
            alt="A service team reviewing an installation drawing together at a worktable"
            width="2020"
            height="778"
            loading="lazy"
          />
        </div>
        <div className="cb-handover-strip">
          <div className="cb-handover-conversation">
            <p className="cb-scene-label">When a different request needs a person</p>
            <Message introduce>Can you install a unit I bought elsewhere?</Message>
            <Message ai introduce>
              I’ll pass your question to our team so they can confirm.
            </Message>
          </div>
          <div className="cb-human-next">
            <Avatar cell={13} />
            <div>
              <span>For your team to review</span>
              <p>“Can you install a unit I bought elsewhere?”</p>
              <p className="cb-human-context">
                The original question and conversation context help your team pick it up.
              </p>
              <a className="cb-text-link" href="/features/unified-inbox">
                Explore Unified Inbox
              </a>
            </div>
          </div>
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
      <WebsiteHero />
      <ContactCapture />
      <ConnectedNextStep />
      <BusinessAnswers />
      <HumanHandover />
      <section className="cb-section cb-setup">
        <div className="cb-wrap">
          <div className="cb-launch-heading">
            <div>
              <p className="cb-eyebrow">Guided Launch</p>
              <h2>
                Your business.
                <br />
                Your answers.
                <br />
                Set up with you.
              </h2>
            </div>
            <div className="cb-launch-copy">
              <p>
                We work through your business information, the details to collect and the next steps
                to enable, then test how the chatbot responds before launch.
              </p>
              <p>
                Starting with a website and separate inboxes? We’ll map a practical first setup.
                Already using a CRM or booking system? We’ll review where Zapla fits.
              </p>
              <Cta>Talk through your setup</Cta>
              <p className="cb-launch-scope">
                Guided Launch is scoped and priced separately from your monthly plan.
              </p>
            </div>
          </div>
          <div className="cb-setup-scope">
            <div>
              <h3>Your information</h3>
              <p>
                Services, opening hours and answers from text, documents or website pages. Keep that
                information up to date as your business changes.
              </p>
            </div>
            <div>
              <h3>Its next steps</h3>
              <p>
                The questions to ask, customer details to collect and calendars it can use. Agree
                which pipeline and follow-up steps belong in your setup.
              </p>
            </div>
            <div>
              <h3>Your team’s involvement</h3>
              <p>
                Which requests need a person and how those conversations will be handled. Test
                everyday enquiries and the questions that need your judgement.
              </p>
            </div>
          </div>
        </div>
      </section>
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
