import { useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Play, Plus, RotateCcw } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/websites-funnels-forms.css";

// Prepared local illustrations. Editing changes React state only. There are no
// service calls, submissions, sends or persisted drafts.
const PAGE = { heading: "A garden that feels like home.", button: "Plan my garden" };
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
      "Yes. AI assistance and templates can help you start your pages. The form builder can also use a written request to add fields, pages, styling and settings. You can edit the result, check the content and connections, then publish when it is ready. AI usage is separate and confirmed with your setup.",
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
function PageBuilder() {
  const [heading, setHeading] = useState(PAGE.heading);
  const [button, setButton] = useState(PAGE.button);
  const reset = () => {
    setHeading(PAGE.heading);
    setButton(PAGE.button);
  };
  return (
    <div className="wff-builder" aria-label="Website content editor">
      <div className="wff-builder-bar">
        <span>
          <ZaplaPetal size={25} />
          Website builder
        </span>
        <span>Your page content</span>
      </div>
      <div className="wff-page-preview" aria-label="Garden design page preview">
        <div className="wff-site-name">
          courtyard<span>Garden design · Sydney</span>
        </div>
        <img
          className="wff-site-photo"
          src="/concept/features/websites-garden-design-20261026.webp"
          alt="A garden designer and homeowner reviewing a courtyard plan together"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <div className="wff-site-content">
          <h2>{heading.trim() || PAGE.heading}</h2>
          <p>Thoughtful gardens for everyday living. Tell us about your space.</p>
          <a href="#connected-enquiry">
            {button.trim() || PAGE.button}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <fieldset className="wff-editor-fields">
        <legend>Edit your page</legend>
        <div className="wff-editor-inputs">
          <label htmlFor="wff-page-heading">
            Heading
            <textarea
              id="wff-page-heading"
              value={heading}
              maxLength={90}
              rows={2}
              spellCheck={false}
              onChange={(event) => setHeading(event.target.value)}
            />
          </label>
          <label htmlFor="wff-page-button">
            Button text
            <input
              id="wff-page-button"
              value={button}
              maxLength={30}
              spellCheck={false}
              onChange={(event) => setButton(event.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={reset}
            className="wff-reset"
            aria-label="Reset page heading and button text"
          >
            <RotateCcw size={17} aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </fieldset>
    </div>
  );
}
function PageTypes() {
  return (
    <section className="wff-section wff-shell wff-page-types" aria-labelledby="wff-types-title">
      <header className="wff-section-heading">
        <div>
          <p className="wff-eyebrow">Websites and funnels</p>
          <h2 id="wff-types-title">
            Your whole business.
            <br />
            Or one focused offer.
          </h2>
        </div>
        <p>
          Give people room to explore your services, or guide them towards a single next step.
          Choose the structure that fits the job.
        </p>
      </header>
      <div className="wff-types-comparison">
        <article className="wff-website-type">
          <h3>A website to explore.</h3>
          <p>
            Connect your service, project and enquiry pages so visitors can find what matters to
            them.
          </p>
          <div
            className="wff-site-map"
            aria-label="A website homepage connects to services, projects and an enquiry page"
          >
            <div className="wff-map-home">Home</div>
            <div className="wff-map-branches" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="wff-map-pages">
              <span>Services</span>
              <span>Our work</span>
              <span>Enquire</span>
            </div>
          </div>
        </article>
        <article className="wff-funnel-type">
          <h3>A funnel to take action.</h3>
          <p>
            Connect a focused offer to an enquiry form, then a thank-you page with a booking link.
          </p>
          <ol className="wff-funnel-path" aria-label="Garden design funnel">
            <li>
              <span>Offer page</span>
              <strong>Plan your courtyard</strong>
            </li>
            <li>
              <span>Enquiry form</span>
              <strong>Tell us about your space</strong>
            </li>
            <li>
              <span>Thank-you page</span>
              <strong>Choose a consultation</strong>
            </li>
          </ol>
        </article>
      </div>
      <div className="wff-existing-site">
        <h3>Already have a website?</h3>
        <p>
          Add a Zapla form or share a form link. Keep the site you have and bring the enquiry into
          your customer workflow.
        </p>
        <a className="wff-text-link" href="#connected-enquiry">
          See how the form connects
          <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
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
function Publishing() {
  return (
    <section className="wff-section wff-shell wff-publishing" aria-labelledby="wff-publish-title">
      <div className="wff-publish-intro">
        <p className="wff-eyebrow">From draft to live page</p>
        <h2 id="wff-publish-title">
          Make it yours.
          <br />
          Publish when it’s ready.
        </h2>
        <p>
          Start with a template, AI assistance or the visual editor. Change your text, images,
          buttons and layout around the action you want a visitor to take.
        </p>
      </div>
      <div className="wff-publish-lifecycle" aria-label="Page publishing and tracking capabilities">
        <article>
          <span>Before it goes live</span>
          <h3>Build, save and review.</h3>
          <p>
            Arrange blocks visually. Reuse sections across pages and preview your work. Saved edits
            stay separate from the published page.
          </p>
        </article>
        <article>
          <span>When you’re ready</span>
          <h3>Use your own domain.</h3>
          <p>
            Connect your web address, verify the domain settings and publish. Keep your business
            name on the pages visitors see.
          </p>
        </article>
        <article>
          <span>After visitors arrive</span>
          <h3>See where they click and scroll.</h3>
          <p>
            Choose a page and date range to review views, unique visitors, clicks and scroll depth.
            Use click and scroll heatmaps to understand how that page is used.
          </p>
        </article>
      </div>
      <p className="wff-campaign-link">
        For the audience, outreach and measurement around your campaigns,{" "}
        <a href="/customer-marketing">explore Customer Marketing.</a>
      </p>
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
        <style>{".wff-editor-fields, .wff-watch { display: none !important; }"}</style>
      </noscript>
      <section className="wff-hero wff-shell" aria-labelledby="wff-title">
        <div className="wff-hero-copy">
          <p className="wff-eyebrow">Websites, Funnels &amp; Forms</p>
          <h1 id="wff-title">
            Build your page.
            <br />
            Connect your enquiries.
          </h1>
          <p className="wff-lead">
            Create a website, a focused offer or a form that brings enquiries into your CRM. Give
            your team the details and set up what happens next.
          </p>
          <div className="wff-hero-actions">
            <SalesLink />
            <a className="wff-text-link" href="#connected-enquiry">
              Follow an enquiry
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <p className="wff-hero-note">
            Starting fresh or keeping your website.
            <br />
            Connect the enquiry either way.
          </p>
        </div>
        <PageBuilder />
      </section>
      <PageTypes />
      <ConnectedEnquiry />
      <Publishing />
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
