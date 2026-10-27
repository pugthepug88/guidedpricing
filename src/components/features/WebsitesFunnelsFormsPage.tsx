import { type ReactNode } from "react";
import { ArrowDown, ArrowRight, Plus } from "lucide-react";
import {
  AICreation,
  FormConnection,
  FunnelBuilder,
  SiteTracking,
  WebsiteBuilder,
} from "./WebsitesProductScenes";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/websites-funnels-forms.css";

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
      "Yes. Describe a new website for Zapla AI to build, or clone an existing page by URL with its styles and images. You can then refine it in the visual editor. The form builder can also use a written request to add fields, pages, styling and settings. You can edit the result, check the content and connections, then publish when it is ready.",
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
            ".wff-ai-watch, .wff-reset, .wff-column-handle, .wff-tracking-control { display: none !important; }"
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
                Explore the builder <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </header>
        <WebsiteBuilder />
        <div className="wff-builder-benefits">
          <p>
            <strong>Move it.</strong> Drag in an enquiry form.
          </p>
          <p>
            <strong>Shape it.</strong> Resize and rearrange columns.
          </p>
          <p>
            <strong>Make it yours.</strong> Edit the words and images.
          </p>
        </div>
      </section>
      <AICreation />
      <FunnelBuilder />
      <FormConnection />
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
