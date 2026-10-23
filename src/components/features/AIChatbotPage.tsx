import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Mail, MessageCircle, Globe, ChevronDown } from "lucide-react";
import { siWhatsapp } from "simple-icons";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/ai-chatbot.css";

function Avatar({ cell = 9 }: { cell?: number }) {
  return (
    <span
      className="cb-avatar"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundPosition: `${(cell % 6) * 20}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}
function Cta({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="cb-cta" href="/booking">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}
function Message({
  children,
  person,
  ai = false,
  introduce = false,
}: {
  children: ReactNode;
  person?: string;
  ai?: boolean;
  introduce?: boolean;
}) {
  return (
    <div className={`cb-message ${ai ? "cb-message-ai" : ""}`}>
      <div className="cb-message-mark" aria-hidden="true">
        {ai ? <ZaplaPetal size={30} /> : <Avatar cell={person === "Ben" ? 13 : 9} />}
      </div>
      <div className="cb-message-copy">
        <span className={introduce ? "cb-speaker" : "cb-sr-only"}>
          {ai ? "Zapla · AI Chatbot" : person || "Mia"}
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
}

/** The complete story is the baseline. Wide, tall screens progressively reveal it. */
function EnquiryStory() {
  const detailsRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);
  const [story, setStory] = useState({ enhanced: false, stage: 0 });

  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (min-height: 820px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let highestStage = 0;

    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      const detailsTop = detailsRef.current?.getBoundingClientRect().top ?? Infinity;
      const bookingTop = bookingRef.current?.getBoundingClientRect().top ?? Infinity;
      const stage =
        bookingTop < height * 0.22
          ? 3
          : bookingTop < height * 0.65
            ? 2
            : detailsTop < height * 0.6
              ? 1
              : 0;

      // A completed enquiry stays completed when the reader scrolls back.
      highestStage = Math.max(highestStage, stage);
      setStory((previous) =>
        previous.enhanced === media.matches && previous.stage === highestStage
          ? previous
          : { enhanced: media.matches, stage: highestStage },
      );
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    media.addEventListener("change", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      media.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <section className="cb-opening" aria-label="AI Chatbot">
      <div
        className="cb-wrap cb-story-grid"
        data-enhanced={story.enhanced}
        data-stage={story.stage}
      >
        <header className="cb-hero">
          <p className="cb-eyebrow">AI Chatbot</p>
          <h1>Customer questions shouldn’t have to wait.</h1>
          <p className="cb-hero-description">
            Answer routine enquiries, collect the details you need and book suitable appointments
            with Zapla’s AI Chatbot. Bring your team in when the conversation needs a person.
          </p>
          <div className="cb-actions">
            <Cta />
            <a className="cb-text-link" href="#chatbot-answers">
              See how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </header>

        <div className="cb-scene" aria-label="An example website enquiry, from question to booking">
          <div className="cb-scene-pin">
            <div className="cb-story-start">
              <p className="cb-example-label">
                <Globe size={16} aria-hidden="true" /> Website enquiry
              </p>
              <Message introduce>Do you install air conditioning in Marrickville?</Message>
              <Message ai introduce>
                Yes, we cover Sydney’s Inner West, including Marrickville. Is this a new
                installation or a replacement?
              </Message>
            </div>
            <div className="cb-story-detail cb-reveal" data-reveal="1">
              <Message>Replacing an old unit. Can someone come on Friday afternoon?</Message>
            </div>
            <div className="cb-story-finish">
              <div className="cb-reveal" data-reveal="2">
                <Message ai>
                  Friday at 2 pm is available for an assessment. If that suits, what name should I
                  book it under?
                </Message>
              </div>
              <div className="cb-story-consent cb-reveal" data-reveal="3">
                <Message>Yes, please book it for Mia Thompson.</Message>
                <div className="cb-booking-result">
                  <div className="cb-result-head">
                    <span>Booking created</span>
                    <ZaplaPetal size={23} />
                  </div>
                  <div className="cb-appointment-heading">
                    <h3>On-site assessment</h3>
                    <p>Friday at 2 pm</p>
                  </div>
                  <p className="cb-appointment-details">Mia Thompson · Marrickville</p>
                  <p className="cb-appointment-enquiry">Replace existing air conditioning unit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="cb-story-note" id="chatbot-answers" ref={detailsRef}>
          <p className="cb-eyebrow">An answer that fits your business</p>
          <h2>Start with what your customer needs.</h2>
          <p>
            Answer the first question using your business information, then collect the details that
            make the enquiry useful.
          </p>
          <div className="cb-source">
            <span>Information you supply</span>
            <p>
              Air conditioning installations and replacements across Sydney’s Inner West. On-site
              assessments before quoting.
            </p>
          </div>
        </section>

        <section className="cb-story-action" ref={bookingRef}>
          <p className="cb-eyebrow">From enquiry to appointment</p>
          <h2>More than an answer. A next step taken.</h2>
          <p>
            Check availability, offer a suitable time and book the appointment the customer agrees
            to. You choose which calendars and booking options the chatbot can use.
          </p>
        </section>
      </div>

      <div className="cb-wrap cb-channels">
        <p>AI replies through the channels you connect.</p>
        <ul className="cb-channel-list" aria-label="Supported AI messaging channels">
          <li>
            <Globe aria-hidden="true" />
            <span>Website chat</span>
          </li>
          <li>
            <MessageCircle aria-hidden="true" />
            <span>SMS</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d={siWhatsapp.path} />
            </svg>
            <span>WhatsApp</span>
          </li>
          <li>
            <Mail aria-hidden="true" />
            <span>Email</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
const faqs = [
  [
    "What can the chatbot answer questions about?",
    "You supply the business information it should use, such as your services, opening hours and booking requirements. Knowledge can come from text, uploaded documents and website pages. You can edit that information as your business changes.",
  ],
  [
    "Can it book appointments?",
    "Yes. The chatbot can check availability and book appointments using the calendars and booking options you make available to it. We agree that setup with you before launch.",
  ],
  [
    "Can I put it on my existing website?",
    "Yes. Add the chatbot as a chat widget or within a page on your existing website. We check how to add it during setup, so you can keep the website you already use.",
  ],
  [
    "Which messaging channels can it use?",
    "Alongside website chat, Zapla’s AI Chatbot supports SMS, WhatsApp and email. We confirm your channel connections and usage terms during setup.",
  ],
  [
    "What happens when a customer needs a person?",
    "The chatbot can pass a conversation to your team with its context. During setup, we agree which enquiries need a person and how your team will pick them up.",
  ],
  [
    "Is this the same as Unified Inbox or AI Receptionist?",
    "AI Chatbot responds to customer messages automatically. Unified Inbox gives your team a place to manage conversations and customer information. AI Receptionist handles phone calls. The AI Assistant helps your team work inside the platform.",
  ],
  [
    "What if we already use a CRM or booking system?",
    "We review your current tools and the workflow you want before recommending a setup. The chatbot uses the calendars and booking options you choose in Zapla. We check how your existing systems would fit during setup.",
  ],
];

export function AIChatbotPage() {
  return (
    <main className="zapla-feature zapla-chatbot">
      <EnquiryStory />

      <section className="cb-section cb-human">
        <div className="cb-wrap cb-human-grid">
          <div className="cb-human-photo">
            <img
              src="/concept/industries/trades-office.webp"
              alt="A team member ready to help with a customer enquiry"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div className="cb-photo-caption">
              Some questions need
              <br />
              your team’s judgement.
            </div>
          </div>
          <div className="cb-copy">
            <p className="cb-eyebrow">Human handover</p>
            <h2>
              The conversation
              <br />
              can come to you.
            </h2>
            <p>
              When an enquiry needs a person, the chatbot can pass the conversation to your team
              with the context they need to respond.
            </p>
            <div className="cb-handover">
              <p className="cb-example-label">A different enquiry</p>
              <Message introduce>Can you install a unit I bought elsewhere?</Message>
              <Message ai introduce>
                I’ll pass your question to our team so they can confirm.
              </Message>
              <div className="cb-human-next">
                <Avatar cell={13} />
                <p>
                  <strong>For your team to review</strong>“Can you install a unit I bought
                  elsewhere?”
                </p>
              </div>
            </div>
            <a className="cb-text-link" href="/features/unified-inbox">
              Explore Unified Inbox <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

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
                We work through your business information, booking options and the questions that
                need your team, then test how the chatbot responds before launch.
              </p>
              <p>
                Starting with a website and separate inboxes? We’ll map a practical first setup.
                Already using a CRM or booking system? We’ll review where Zapla fits.
              </p>
              <Cta>Talk through your setup</Cta>
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
                The customer details to collect, calendars to use and appointments it can book.
                Agree what it should help with before it goes live.
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
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{a}</p>
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
