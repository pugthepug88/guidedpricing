import { useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, Plus, RotateCcw } from "lucide-react";
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
              See the enquiry flow
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

const ENQUIRY_BEATS = [
  "Ask what the customer needs",
  "Understand the timing",
  "Ask for contact details",
  "Customer shares their details",
  "Create the contact and enquiry",
  "Start the configured follow-up",
] as const;

function EnquiryFlow() {
  // The complete scene is server-rendered. Only an explicit Watch action
  // starts the prepared animation; no product API or visitor data is involved.
  const scene = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [step, setStep] = useState(5);
  const [played, setPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    if (scene.current) observer.observe(scene.current);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing || !visible || !tabVisible) return;
    let previous = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      elapsed.current += now - previous;
      previous = now;
      const next = Math.min(5, Math.floor(elapsed.current / 2400));
      setStep(next);
      if (next === 5) setPlaying(false);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible, tabVisible]);

  const watch = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(5);
      setPlayed(true);
      return;
    }
    if (!played || step === 5) {
      elapsed.current = 0;
      setStep(0);
    }
    if (scene.current && scene.current.getBoundingClientRect().height + 130 < window.innerHeight) {
      scene.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    setPlayed(true);
    setPlaying(true);
  };
  const reveal = (at: number) => `cr-flow-reveal${step < at ? " cr-flow-pending" : ""}`;

  return (
    <section
      className="cr-section cr-enquiry"
      id="chatbot-enquiry"
      aria-labelledby="chatbot-enquiry-title"
    >
      <div className="cr-wrap">
        <header className="cr-section-intro">
          <h2 id="chatbot-enquiry-title">Know what they need before you reply.</h2>
          <p>Ask useful questions, capture the contact and start the follow-up you’ve agreed.</p>
        </header>
        <div className="cr-enquiry-controls">
          <button
            className="cr-watch"
            type="button"
            onClick={watch}
            aria-controls="chatbot-enquiry-sequence"
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : played && step === 5 ? (
              <RotateCcw size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
            {playing
              ? "Pause"
              : played
                ? step === 5
                  ? "Watch again"
                  : "Continue"
                : "Watch the enquiry"}
          </button>
          <span role="status" aria-live="polite">
            {played ? ENQUIRY_BEATS[step] : "Website chat, CRM and follow-up together."}
          </span>
          <a className="cr-link" href="/features/automation-builder">
            Explore Automation Builder
          </a>
        </div>
        <div
          className="cr-enquiry-stage"
          ref={scene}
          data-step={step}
          id="chatbot-enquiry-sequence"
        >
          <div
            className="cr-enquiry-thread"
            aria-label="Daniel shares his enquiry and contact details"
          >
            <ChatHeader business="Inner West Air" />
            <div className="cr-thread">
              <Bubble cell={5}>Do you replace ducted air conditioning in Marrickville?</Bubble>
              <Bubble ai>Yes. Is it for your home or a business, and when do you need it?</Bubble>
              <div className={reveal(1)} aria-hidden={step < 1}>
                <Bubble cell={5}>Home. Ideally next week.</Bubble>
              </div>
              <div className={reveal(2)} aria-hidden={step < 2}>
                <Bubble ai>What’s your name and email so our team can get in touch?</Bubble>
              </div>
              <div className={reveal(3)} aria-hidden={step < 3}>
                <Bubble cell={5}>
                  Daniel.<span className="cr-shared-detail">Email address shared</span>
                </Bubble>
              </div>
            </div>
          </div>
          <div className="cr-enquiry-result-stage">
            {played && step < 4 && (
              <img
                className="cr-enquiry-working"
                src="/concept/features/chatbot-team-review-v3.webp"
                alt="A service team focused on an installation plan while the chatbot collects an enquiry"
                width="2020"
                height="778"
              />
            )}
            <div
              className={`cr-crm-workspace${step < 4 ? " cr-result-pending" : ""}`}
              id="chatbot-enquiry-result"
              aria-hidden={step < 4}
            >
              <div className="cr-workspace-header">
                <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="88" height="30" />
                <span>Website enquiry</span>
              </div>
              <div className={reveal(4)} aria-hidden={step < 4}>
                <div className="cr-flow-contact">
                  <Avatar cell={5} />
                  <div>
                    <h3>Daniel</h3>
                    <p>Name and email captured</p>
                  </div>
                </div>
                <div className="cr-flow-stage">
                  <span>Pipeline stage</span>
                  <strong>New enquiry</strong>
                </div>
                <div className="cr-flow-request">
                  <h4>Customer’s original request</h4>
                  <p>“Do you replace ducted air conditioning in Marrickville?”</p>
                  <p>“Home. Ideally next week.”</p>
                </div>
              </div>
              <div className={`${reveal(5)} cr-flow-email`} aria-hidden={step < 5}>
                <p>Configured acknowledgement email · To Daniel</p>
                <h4>Thanks for your enquiry, Daniel.</h4>
                <p>
                  We’ve received your request. Our team will get in touch to discuss the
                  replacement.
                </p>
              </div>
            </div>
          </div>
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
          <p>
            Check availability, collect contact details and create the appointment once the customer
            agrees.
          </p>
        </header>
        <div className="cr-booking-scene">
          <div
            className="cr-booking-chat"
            aria-label="Mia agrees to an appointment and supplies her contact details"
          >
            <ChatHeader />
            <div className="cr-thread">
              <Bubble ai>
                Friday at 5 pm is available for a first visit. Shall I book it? What’s your name and
                mobile?
              </Bubble>
              <Bubble>
                Yes, please.
                <br />
                Mia Thompson
                <br />
                <span className="cr-masked-number">04•• ••• ••8</span>
              </Bubble>
            </div>
            <p className="cr-chat-footer">Connected to your calendar</p>
          </div>
          <div className="cr-care-scene">
            <img
              src="/concept/features/chatbot-clinic-care-20261026.webp"
              alt="A physiotherapist focused on assessing a patient’s ankle while the chatbot handles another enquiry"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div className="cr-appointment" aria-label="Mia’s agreed appointment">
              <p>Appointment booked</p>
              <h3>Initial physiotherapy</h3>
              <strong>Friday · 5 pm</strong>
              <div>
                <Avatar />
                <span>Mia Thompson</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cr-scene-foot">
          <p>You choose the calendars and booking options it can use.</p>
          <a className="cr-link" href="/features/calendars-bookings">
            Calendars &amp; Bookings
          </a>
        </div>
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
          <a className="cr-link cr-control-inbox-link" href="/features/unified-inbox">
            Explore Unified Inbox
          </a>
        </div>
        <div className="cr-control-workspace">
          <div className="cr-knowledge-panel">
            <div className="cr-product-brand">
              <ZaplaPetal size={24} />
              <span>Your appointment guide</span>
            </div>
            <dl className="cr-appointment-rules">
              <div>
                <dt>New patients</dt>
                <dd>Book an initial appointment</dd>
              </div>
              <div>
                <dt>Returning patients</dt>
                <dd>Book a follow-up appointment</dd>
              </div>
            </dl>
          </div>
          <div
            className="cr-answer-preview"
            role="region"
            aria-label="The chatbot uses the practice’s first-visit booking rule"
          >
            <ChatHeader />
            <div className="cr-thread">
              <Bubble>Can I book a follow-up if I haven’t visited before?</Bubble>
              <Bubble ai>
                For your first visit, choose an initial appointment. Follow-ups are for returning
                patients.
              </Bubble>
            </div>
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
      <EnquiryFlow />
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
