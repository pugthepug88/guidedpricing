import { useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Play, Plus } from "lucide-react";
import { AICreation, FunnelBuilder, SiteTracking, WebsiteBuilder } from "./WebsitesProductScenes";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/websites-funnels-forms.css";

// Prepared local illustrations. Editing changes React state only. There are no
// service calls, submissions, sends or persisted drafts.
const ENQUIRY = {
  name: "Mia Thompson",
  project: "Courtyard design",
  details: "We’d love a leafy courtyard with space to eat outside.",
};
const FAQS = [
  {
    question: "Can I keep my existing website?",
    answer:
      "Yes. Embed a Zapla form on your existing website or share its standalone link. That gives you a way to bring enquiries into Zapla without rebuilding the whole site. We review the connection and field mapping during setup.",
  },
  {
    question: "What is the difference between a website and a funnel?",
    answer:
      "A website gives visitors several ways to explore your business, such as services, work and contact pages. A funnel connects pages around a particular action, such as enquiring about an offer and then choosing a consultation. Both can use your forms and link to a booking page.",
  },
  {
    question: "Can AI help me build?",
    answer:
      "Yes. Describe a new website for Zapla AI to build, or clone an existing page by URL with its styles and images. You can then refine it in the visual editor. The form builder can also use a written request to add fields, pages, styling and settings. You can edit the result, check the content and connections, then publish when it is ready. AI usage is separate and confirmed with your setup.",
  },
  {
    question: "What happens when someone submits a form?",
    answer:
      "A submission can create or update a contact. You can view the submitted answers alongside the contact and map custom answers to contact fields. A configured Form Submitted workflow can send an acknowledgement email or carry out other agreed follow-up. You choose and activate that workflow during setup.",
  },
  {
    question: "Can I use several pages in a form?",
    answer:
      "Yes. Split a form into pages, choose field types such as text, dropdowns and checkboxes, and make key answers required. You can style the form and configure where the customer goes after submitting it, including a booking page. The customer still chooses their appointment through the booking process.",
  },
  {
    question: "Can I use my own domain and edit after publishing?",
    answer:
      "Yes. Connect your domain, configure the required DNS settings and verify the connection. Custom domains and SSL are supported; domain registration is separate. Saving page changes keeps your work in a draft. Publish after reviewing to update what visitors see.",
  },
  {
    question: "Is a custom-designed website included?",
    answer:
      "The platform provides tools for you to build and manage pages and forms. A website designed and built by Zapla is a separate paid project with an agreed scope. It is not automatically included in the subscription or Guided Launch. Guided Launch covers your agreed initial platform setup and is separately priced.",
  },
] as const;

function SalesLink({ children = "Book a Call" }: { children?: ReactNode }) {
  return (
    <a className="wff-button" href="/booking">
      {children}
    </a>
  );
}
function MiaPortrait() {
  return <span className="wff-portrait" aria-hidden="true" />;
}
function ConnectedEnquiry() {
  const [run, setRun] = useState(0);
  const proof = useRef<HTMLDivElement>(null);
  const watchConnection = () => {
    proof.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    setRun((value) => value + 1);
  };
  return (
    <section
      id="connected-enquiry"
      className="wff-connected wff-shell"
      aria-labelledby="wff-enquiry-title"
    >
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Forms, CRM and follow-up</p>
          <h2 id="wff-enquiry-title">
            Ask what you need.
            <br />
            Keep it with the customer.
          </h2>
        </div>
        <div>
          <p>
            Collect the request and contact details together. Map useful answers to CRM fields, so
            your team can follow up knowing what the person needs.
          </p>
          <button className="wff-watch" type="button" onClick={watchConnection}>
            <Play size={15} fill="currentColor" aria-hidden="true" />
            {run ? "Watch the connection again" : "Watch the connection"}
          </button>
        </div>
      </header>
      <div
        className={"wff-enquiry-proof" + (run ? " wff-enquiry-proof--play" : "")}
        key={run}
        ref={proof}
      >
        <div className="wff-enquiry-paper">
          <p className="wff-form-brand">
            courtyard<span>Project enquiry</span>
          </p>
          <h3>Tell us about your space.</h3>
          <dl className="wff-form-answers">
            <div>
              <dt>What would you like help with?</dt>
              <dd>{ENQUIRY.project}</dd>
            </div>
            <div>
              <dt>What do you have in mind?</dt>
              <dd>{ENQUIRY.details}</dd>
            </div>
            <div className="wff-form-contact">
              <div>
                <dt>Your name</dt>
                <dd>{ENQUIRY.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>Email address provided</dd>
              </div>
            </div>
          </dl>
          <p className="wff-form-destination">
            After submission
            <ArrowRight size={17} aria-hidden="true" />
            <span>Connected to Zapla</span>
          </p>
        </div>
        <div className="wff-customer-outcome">
          <div className="wff-crm-record">
            <p className="wff-record-brand">
              <ZaplaPetal size={25} />
              <span>In your Zapla CRM</span>
            </p>
            <div className="wff-contact wff-reveal-person">
              <MiaPortrait />
              <div>
                <h3>{ENQUIRY.name}</h3>
                <p>Name and email captured</p>
              </div>
            </div>
            <dl className="wff-record-details">
              <div className="wff-reveal-project">
                <dt>Project type</dt>
                <dd>{ENQUIRY.project}</dd>
              </div>
              <div className="wff-reveal-details">
                <dt>Project details</dt>
                <dd>{ENQUIRY.details}</dd>
              </div>
            </dl>
          </div>
          <div className="wff-acknowledgement">
            <p>Configured acknowledgement email</p>
            <h3>Thanks for getting in touch, Mia.</h3>
            <p>
              We’ve received your courtyard enquiry. Our team will be in touch to discuss your space
              and the next step.
            </p>
          </div>
        </div>
      </div>
      <div className="wff-enquiry-notes">
        <p>
          <strong>Your questions, your form.</strong> Use required fields, dropdowns and multiple
          pages to collect the information your team needs.
        </p>
        <p>
          <strong>Your next step, configured.</strong> Use a form submission to start an agreed
          workflow, or direct the customer to a booking page.
        </p>
        <a className="wff-text-link" href="/features/automation-builder">
          Explore Automation Builder
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
function LaunchAndQuestions() {
  return (
    <section className="wff-launch-section" aria-labelledby="wff-build-title">
      <div className="wff-shell">
        <div className="wff-launch-layout">
          <div className="wff-launch-copy">
            <p className="wff-eyebrow">A practical starting point</p>
            <h2 id="wff-build-title">
              Build it yourself.
              <br />
              Or have it designed for you.
            </h2>
            <div className="wff-service-choice">
              <h3>The tools to build your own.</h3>
              <p>
                Create and manage pages, funnels and forms in your Zapla subscription. You choose
                the content, questions and customer journey.
              </p>
            </div>
            <div className="wff-service-choice">
              <h3>A website designed by Zapla.</h3>
              <p>
                Want us to handle the design and build? We’ll agree the pages, content and
                connections, then quote for that scope.
              </p>
              <p className="wff-service-scope">
                Custom website design is a separate paid service, outside your subscription and
                Guided Launch.
              </p>
              <SalesLink>Discuss your website</SalesLink>
            </div>
          </div>
          <aside className="wff-launch-plan" aria-labelledby="wff-launch-title">
            <ZaplaPetal size={39} />
            <p className="wff-eyebrow">Guided Launch</p>
            <h3 id="wff-launch-title">
              Connect the journey.
              <br />
              Check every handoff.
            </h3>
            <dl>
              <div>
                <dt>Your starting point</dt>
                <dd>Existing website, new pages or a focused offer.</dd>
              </div>
              <div>
                <dt>Your customer information</dt>
                <dd>Questions, required answers and contact-field mapping.</dd>
              </div>
              <div>
                <dt>Your follow-up</dt>
                <dd>Acknowledgement, team process and the next step.</dd>
              </div>
              <div>
                <dt>Your checks</dt>
                <dd>Form, contact record and agreed workflow tested together.</dd>
              </div>
            </dl>
            <p>
              Guided Launch is required for new standard accounts and priced separately from your
              subscription.
            </p>
            <a href="/Pricing-v3">
              See plans and Guided Launch
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </aside>
        </div>
        <div className="wff-faq" aria-labelledby="wff-faq-title">
          <div>
            <p className="wff-eyebrow">A few useful answers</p>
            <h2 id="wff-faq-title">Before you build.</h2>
          </div>
          <div className="wff-faq-list">
            {FAQS.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={19} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function WebsitesFunnelsFormsPage() {
  return (
    <main className="zapla-feature zapla-websites">
      <noscript>
        <style>
          {
            ".wff-watch, .wff-ai-watch, .wff-editor-reset, .wff-column-handle { display: none !important; }"
          }
        </style>
      </noscript>
      <section className="wff-hero wff-shell" aria-labelledby="wff-title">
        <header className="wff-hero-intro">
          <div>
            <p className="wff-eyebrow">Websites, Funnels &amp; Forms</p>
            <h1 id="wff-title">
              Build your page.
              <br />
              Connect your enquiries.
            </h1>
          </div>
          <div className="wff-hero-copy">
            <p className="wff-lead">
              Drag, drop and make it yours. Build with Zapla AI or shape every section yourself,
              then connect your pages and forms to your CRM.
            </p>
            <div className="wff-hero-actions">
              <SalesLink />
              <a className="wff-text-link" href="#website-builder">
                Try the builder <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>
        <WebsiteBuilder />
        <div className="wff-builder-benefits">
          <p>
            <strong>Move it.</strong> Drag in your elements.
          </p>
          <p>
            <strong>Shape it.</strong> Resize and rearrange columns.
          </p>
          <p>
            <strong>Make it yours.</strong> Edit the content in place.
          </p>
        </div>
      </section>
      <AICreation />
      <FunnelBuilder />
      <ConnectedEnquiry />
      <SiteTracking />
      <LaunchAndQuestions />
      <section className="wff-final wff-shell" aria-labelledby="wff-final-title">
        <div className="wff-final-petal">
          <ZaplaPetal size={54} />
        </div>
        <p className="wff-eyebrow">From first visit to next step</p>
        <h2 id="wff-final-title">
          Give your next enquiry
          <br className="wff-wide-break" /> a clear next step.
        </h2>
        <p>
          Bring your website or your next page idea. We’ll talk through the enquiry, customer
          details and follow-up your business needs.
        </p>
        <SalesLink />
      </section>
    </main>
  );
}
