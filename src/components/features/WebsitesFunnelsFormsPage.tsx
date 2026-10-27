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
import { WebsitesQrSharing } from "./WebsitesQrSharing";
import "@/styles/feature-foundations.css";
import "@/styles/websites-funnels-forms.css";

const FAQS = [
  {
    question: "Can I keep my existing website?",
    answer:
      "Yes. Embed a Zapla form on your current website or share a standalone form link. Enquiries can reach your CRM without rebuilding your site.",
  },
  {
    question: "What is the difference between a website and a funnel?",
    answer:
      "A website lets people explore your business. A funnel connects pages around one action, such as submitting an enquiry. Both can use Zapla forms.",
  },
  {
    question: "Can AI help me build?",
    answer:
      "Yes. Describe a website for Zapla AI to build, or clone an existing page by URL, including styles and images. Refine the result in the visual editor, then review and publish.",
  },
  {
    question: "What happens when someone submits a form?",
    answer:
      "A submission can create or update a contact. Map custom answers to contact fields and configure a Form Submitted workflow for acknowledgements or other follow-up.",
  },
  {
    question: "Can I use several pages in a form?",
    answer:
      "Yes. Use multiple pages, different field types and required answers. Choose a confirmation message or redirect after submission.",
  },
  {
    question: "Can I use my own domain and edit after publishing?",
    answer:
      "Yes. Connect and verify your domain with DNS settings. Custom domains and SSL are supported; domain registration is separate. Save edits as a draft, then publish when ready.",
  },
  {
    question: "Is a custom-designed website included?",
    answer:
      "Website tools are part of your subscription. A website designed and built by Zapla is a separately quoted project. Guided Launch covers agreed initial platform setup and is priced separately.",
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
            <p className="wff-eyebrow">Build it your way</p>
            <h2 id="wff-build-title">
              Build it yourself.
              <br />
              Or have it designed for you.
            </h2>
            <p>Use Zapla’s website tools, or have our team design and build it for you.</p>
            <p className="wff-service-scope">Custom website design is quoted separately.</p>
            <SalesLink>Discuss your website</SalesLink>
          </div>
          <aside className="wff-launch-plan" aria-labelledby="wff-launch-title">
            <h3 id="wff-launch-title">Guided Launch</h3>
            <p>We connect and test your forms, customer fields and agreed follow-up.</p>
            <p className="wff-setup-scope">
              Required for new standard accounts. Priced separately from your subscription.
            </p>
            <a href="/Pricing-v3">
              Plans and setup <ArrowRight size={16} aria-hidden="true" />
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
            ".wff-scene-control, .wff-ai-send, .wff-reset, .wff-column-handle, .wff-tracking-control, .wff-qr-controls, .wff-qr-download { display: none !important; } .wff-qr-workspace { grid-template-columns: 1fr !important; }"
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
      <WebsitesQrSharing />
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
