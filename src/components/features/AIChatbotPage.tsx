import type { ReactNode } from "react";
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
}: {
  children: ReactNode;
  person?: string;
  ai?: boolean;
}) {
  return (
    <div className={`cb-message ${ai ? "cb-message-ai" : ""}`}>
      <div className="cb-speaker">
        {ai ? <ZaplaPetal size={25} /> : <Avatar cell={person === "Ben" ? 13 : 9} />}
        <span>{ai ? "Zapla · AI Chatbot" : person || "Mia"}</span>
      </div>
      <p>{children}</p>
    </div>
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
      <section className="cb-hero">
        <div className="cb-wrap">
          <div className="cb-hero-intro">
            <div>
              <p className="cb-eyebrow">AI Chatbot</p>
              <h1>
                Customer questions
                <br />
                shouldn’t have to wait.
              </h1>
            </div>
            <div className="cb-hero-copy">
              <p>
                Answer routine enquiries, collect the details you need and book suitable
                appointments with Zapla’s AI Chatbot. Bring your team in when the conversation needs
                a person.
              </p>
              <div className="cb-actions">
                <Cta />
                <a className="cb-text-link" href="#chatbot-answers">
                  See how it works <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
          <div className="cb-hero-stage" aria-label="Website enquiry answered by Zapla AI Chatbot">
            <div className="cb-site-context">
              <span className="cb-scene-label">On your website</span>
              <h2>
                A visitor has <br />
                one more question.
              </h2>
              <p>Give them a useful answer while they’re deciding what to do next.</p>
              <div className="cb-service">
                <span>Service information</span>
                <h3>Air conditioning installation</h3>
                <p>
                  Home installations and replacements.
                  <br />
                  On-site assessments before quoting.
                </p>
                <div className="cb-service-detail">
                  Service area <strong>Sydney’s Inner West</strong>
                </div>
              </div>
            </div>
            <div className="cb-chat">
              <div className="cb-chat-heading">
                <ZaplaPetal size={32} />
                <div>
                  <strong>Ask us a question</strong>
                  <span>Zapla AI Chatbot</span>
                </div>
              </div>
              <div className="cb-chat-body">
                <Message>Do you install air conditioning in Marrickville?</Message>
                <Message ai>
                  Yes, we install across Sydney’s Inner West, including Marrickville. Is this a new
                  installation or a replacement?
                </Message>
                <Message>Replacing an old unit.</Message>
                <Message ai>
                  We can arrange an on-site assessment before quoting. Would you like to find a
                  time?
                </Message>
              </div>
            </div>
          </div>
          <p className="cb-hero-caption">
            A useful answer. A clearer enquiry. A next step the customer can take.
          </p>
        </div>
      </section>

      <section className="cb-section cb-knowledge" id="chatbot-answers">
        <div className="cb-wrap cb-two-col">
          <div className="cb-copy">
            <p className="cb-eyebrow">Your business information</p>
            <h2>
              Answers start with
              <br />
              what you provide.
            </h2>
            <p>
              Your services, opening hours and booking requirements give the chatbot information to
              draw on. Add text, documents or website pages, and keep that knowledge up to date.
            </p>
            <p>
              Decide what it should help with. Test the questions your customers actually ask before
              it goes live.
            </p>
          </div>
          <div className="cb-knowledge-scene">
            <div className="cb-source">
              <span>Information you supply</span>
              <h3>Before an installation</h3>
              <p>
                We assess the space and existing unit on site before preparing a replacement quote.
              </p>
            </div>
            <div className="cb-answer">
              <div className="cb-knowledge-question">“Can you quote without seeing the unit?”</div>
              <Message ai>
                We arrange an on-site assessment first, so the quote reflects your space and
                existing unit.
              </Message>
            </div>
          </div>
        </div>
      </section>

      <section className="cb-section cb-booking">
        <div className="cb-wrap">
          <div className="cb-section-intro">
            <div>
              <p className="cb-eyebrow">From enquiry to appointment</p>
              <h2>
                More than an answer.
                <br />A next step taken.
              </h2>
            </div>
            <p>
              Let the chatbot collect enquiry details, check your calendar and book an available
              appointment. You choose which calendars and booking options it can use.
            </p>
          </div>
          <div className="cb-booking-scene">
            <div className="cb-booking-thread">
              <span className="cb-scene-label">The conversation continues</span>
              <Message>Can someone come on Friday afternoon?</Message>
              <Message ai>
                Friday at 2 pm is available. If that suits, what name should I book it under?
              </Message>
              <Message>Yes, please book it for Mia Thompson.</Message>
            </div>
            <div className="cb-booking-result">
              <div className="cb-result-head">
                <ZaplaPetal size={38} />
                <span>Booking created</span>
              </div>
              <h3>On-site assessment</h3>
              <p className="cb-appointment">Friday at 2 pm</p>
              <dl>
                <div>
                  <dt>Customer</dt>
                  <dd>Mia Thompson</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Marrickville</dd>
                </div>
                <div>
                  <dt>Enquiry</dt>
                  <dd>Replace existing air conditioning unit</dd>
                </div>
              </dl>
              <p className="cb-result-note">The agreed appointment, with the details behind it.</p>
            </div>
          </div>
        </div>
      </section>

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
              <Message>Can you install a unit I bought elsewhere?</Message>
              <Message ai>
                I’ll pass this to our team so they can confirm whether we can help with your unit.
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

      <section className="cb-section cb-channels">
        <div className="cb-wrap cb-channels-layout">
          <div>
            <p className="cb-eyebrow">Beyond the website</p>
            <h2>
              Help where the
              <br />
              message starts.
            </h2>
          </div>
          <div>
            <p>
              Use AI messaging across your connected SMS, WhatsApp and email channels, alongside
              website chat. Agree where the chatbot should respond as part of your setup.
            </p>
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
        </div>
      </section>

      <section className="cb-section cb-setup">
        <div className="cb-wrap cb-two-col">
          <div className="cb-setup-plan">
            <div className="cb-plan-heading">
              <ZaplaPetal size={38} />
              <h3>Your chatbot setup</h3>
            </div>
            <div>
              <h4>What it should know</h4>
              <p>
                Services, opening hours, common questions and the information behind your answers.
              </p>
            </div>
            <div>
              <h4>What it can do</h4>
              <p>The customer details to collect, calendars to use and appointments it can book.</p>
            </div>
            <div>
              <h4>When your team comes in</h4>
              <p>The requests that need a person, and how those conversations will be handled.</p>
            </div>
            <div>
              <h4>What we test together</h4>
              <p>Everyday enquiries, booking requests and questions that need your team.</p>
            </div>
          </div>
          <div className="cb-copy">
            <p className="cb-eyebrow">Guided Launch</p>
            <h2>
              Your business.
              <br />
              Your answers.
              <br />
              Set up with you.
            </h2>
            <p>
              We work through your enquiries, information and next steps with you, then test how the
              chatbot responds before launch.
            </p>
            <p>
              Starting with a website and separate inboxes? We’ll map a practical first setup.
              Already using a CRM or booking system? We’ll review where Zapla fits.
            </p>
            <Cta>Talk through your setup</Cta>
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
