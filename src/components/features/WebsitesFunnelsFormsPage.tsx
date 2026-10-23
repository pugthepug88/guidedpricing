import { useState } from "react";
import { ArrowDown, ArrowRight, ChevronDown, RotateCcw } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/websites-funnels-forms.css";

// This is an explanatory illustration, not a form endpoint or a replica of the
// builder. All values are fixed and fictional; the demonstration is local state.
const ENQUIRY = {
  name: "Mia Thompson",
  email: "mia@example.com",
  service: "Air conditioning replacement",
  details: "We’d like to replace our old unit with a quieter option.",
} as const;

const FAQS = [
  {
    question: "Can I keep my existing website?",
    answer:
      "Yes. You can embed a Zapla form on your existing website or share a standalone form link. It gives you a way to connect new enquiries to Zapla without rebuilding your whole site.",
  },
  {
    question: "Is a custom-designed website included in the subscription?",
    answer:
      "No. The platform provides self-service website, funnel and form tools. If you want Zapla to design and build a website for you, that is a separate paid service with its own agreed scope and quote.",
  },
  {
    question: "What happens when someone submits a form?",
    answer:
      "A form submission can create or update a contact in Zapla. Map custom answers to contact fields to keep the details your team needs on the customer record. You can also set up a workflow triggered by that form submission, such as an acknowledgement message or a follow-up task.",
  },
  {
    question: "Can I send someone to a booking page?",
    answer:
      "Yes. You can configure a form to redirect to a booking page after submission, or include a booking link in a follow-up message. The customer then chooses a time through the booking process; submitting an enquiry does not itself confirm an appointment.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. Connect your domain and verify the required settings before publishing under your business’s address. Custom domains and SSL are supported. Domain registration is separate from creating your pages.",
  },
  {
    question: "What can I see about how a page is used?",
    answer:
      "For a selected page and date range, site tracking shows page views, unique visitors, clicks and average scroll depth. Click and scroll heatmaps help you see how people interact with that page. For campaign audiences, outreach and campaign measurement, explore Customer Marketing.",
  },
] as const;

function SalesLink({
  children = "Book a Call",
  className = "",
}: {
  children?: string;
  className?: string;
}) {
  return (
    <a className={`wff-button ${className}`} href="/booking">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function MiaPortrait() {
  return <span className="wff-portrait" aria-hidden="true" />;
}

function EnquiryProof() {
  const [recordVisible, setRecordVisible] = useState(false);

  return (
    <div className={`wff-proof ${recordVisible ? "wff-proof--connected" : ""}`}>
      <div className="wff-enquiry">
        <div className="wff-panel-heading">
          <span>From your enquiry form</span>
          <p>Tell us about your home.</p>
        </div>
        <dl className="wff-form-details">
          <div>
            <dt>Name</dt>
            <dd>{ENQUIRY.name}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{ENQUIRY.email}</dd>
          </div>
          <div>
            <dt>What can we help with?</dt>
            <dd>{ENQUIRY.service}</dd>
          </div>
          <div>
            <dt>A few more details</dt>
            <dd>{ENQUIRY.details}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="wff-demo-button"
          aria-expanded={recordVisible}
          aria-controls="wff-customer-record"
          onClick={() => setRecordVisible(!recordVisible)}
        >
          {recordVisible ? (
            <>
              Reset the view
              <RotateCcw size={16} aria-hidden="true" />
            </>
          ) : (
            <>
              See the customer record
              <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div className="wff-proof-connection" aria-hidden="true">
        <span />
        <ArrowRight size={22} />
        <span />
      </div>

      <div
        id="wff-customer-record"
        className="wff-record"
        role="region"
        aria-label="Connected customer record"
      >
        {recordVisible ? (
          <div className="wff-record-content">
            <div className="wff-record-brand">
              <ZaplaPetal size={25} />
              <span>In your Zapla CRM</span>
            </div>
            <div className="wff-contact">
              <MiaPortrait />
              <div>
                <h3>{ENQUIRY.name}</h3>
                <p>{ENQUIRY.email}</p>
              </div>
            </div>
            <dl className="wff-record-details">
              <div>
                <dt>Service enquiry</dt>
                <dd>{ENQUIRY.service}</dd>
              </div>
              <div>
                <dt>Enquiry details</dt>
                <dd>{ENQUIRY.details}</dd>
              </div>
            </dl>
            <p className="wff-mapping-note">
              The service and enquiry details are mapped to contact fields.
            </p>
            <a href="#enquiry-next-step" className="wff-text-link">
              Then, give it a next step
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="wff-record-ready">
            <ZaplaPetal size={56} />
            <h3>Where does the enquiry go?</h3>
            <p>Follow Mia’s details from the form into her customer record.</p>
            <span>The same person. The same request.</span>
          </div>
        )}
      </div>
      <p className="wff-demo-note" aria-live="polite" aria-atomic="true">
        {recordVisible
          ? "Mia’s enquiry is shown on her customer record. "
          : "Illustrative details only. "}
        Nothing is collected or sent by this demonstration.
      </p>
    </div>
  );
}

export function WebsitesFunnelsFormsPage() {
  return (
    <main className="zapla-feature zapla-websites">
      <section className="wff-hero wff-shell" aria-labelledby="wff-title">
        <div className="wff-hero-copy">
          <p className="wff-eyebrow">Websites, Funnels &amp; Forms</p>
          <h1 id="wff-title">
            Build your page.
            <br />
            Connect your enquiries.
          </h1>
          <p className="wff-lead">
            Create a website, a focused landing page or a form. Connect enquiries to your CRM, then
            set up what happens next.
          </p>
          <div className="wff-hero-actions">
            <SalesLink />
            <a className="wff-text-link" href="#connected-enquiry">
              Follow an enquiry
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="wff-business-stage">
          <div
            className="wff-business-page"
            aria-label="Illustrative air conditioning landing page"
          >
            <div className="wff-business-copy">
              <p className="wff-business-category">Home cooling &amp; heating</p>
              <h2>
                Come home
                <br className="wff-wide-break" /> to comfort.
              </h2>
              <p>Air conditioning for the spaces you live in. Tell us what you need.</p>
              <a href="#connected-enquiry">
                Explore the enquiry
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <img
              src="/concept/industries/trades-service-visit.webp"
              alt="A homeowner talking with an air conditioning installer at her home"
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </div>
          <p className="wff-stage-caption">
            A clear offer. A place to enquire. A connection to the customer.
          </p>
        </div>
      </section>

      <section
        id="connected-enquiry"
        className="wff-section wff-shell wff-enquiry-section"
        aria-labelledby="wff-enquiry-title"
      >
        <div className="wff-section-intro">
          <p className="wff-eyebrow">From the page to the person</p>
          <h2 id="wff-enquiry-title">
            The details arrive
            <br className="wff-wide-break" /> with the customer.
          </h2>
          <p>
            A form submission can create or update a contact in Zapla. Map the answers your team
            needs, so they can follow up with the request in front of them.
          </p>
        </div>
        <EnquiryProof />
      </section>

      <section className="wff-roles-section" aria-labelledby="wff-roles-title">
        <div className="wff-shell">
          <div className="wff-roles-heading">
            <p className="wff-eyebrow">One enquiry journey</p>
            <h2 id="wff-roles-title">Choose the right place to start.</h2>
          </div>
          <div className="wff-roles">
            <article>
              <h3>Websites</h3>
              <p className="wff-role-summary">A home for your business.</p>
              <p>
                Bring your services, useful information and enquiry forms together across connected
                pages.
              </p>
            </article>
            <article>
              <h3>Funnels</h3>
              <p className="wff-role-summary">A path to one action.</p>
              <p>
                Use a landing page or a short sequence of pages for a particular offer, enquiry or
                booking.
              </p>
            </article>
            <article>
              <h3>Forms</h3>
              <p className="wff-role-summary">The questions you need answered.</p>
              <p>
                Collect contact details and relevant information on a Zapla page, your existing
                website or a shareable link.
              </p>
            </article>
          </div>
          <p className="wff-existing-site">
            <strong>Already have a website?</strong> Start with a connected form. You don’t need to
            rebuild your site to bring enquiries into Zapla.
          </p>
        </div>
      </section>

      <section className="wff-section wff-shell wff-publishing" aria-labelledby="wff-publish-title">
        <div className="wff-publishing-copy">
          <p className="wff-eyebrow">Create, review, publish</p>
          <h2 id="wff-publish-title">
            Make it yours.
            <br />
            Publish when
            <br className="wff-wide-break" /> it’s ready.
          </h2>
          <p>
            Start from a template, use AI assistance or build in the editor. Shape your pages around
            your business and the action you want a visitor to take.
          </p>
        </div>
        <div className="wff-publishing-details">
          <article>
            <h3>Your content, your layout.</h3>
            <p>
              Edit text, images, buttons, colours and spacing. Add pages and place your enquiry form
              where it makes sense.
            </p>
          </article>
          <article>
            <h3>The right questions.</h3>
            <p>
              Choose the fields you need, make key details required and map useful answers to the
              customer record.
            </p>
          </article>
          <article>
            <h3>Your own web address.</h3>
            <p>
              Save and preview your work. Connect and verify your domain, then publish your pages
              under your own address.
            </p>
          </article>
        </div>
      </section>

      <section id="enquiry-next-step" className="wff-followup" aria-labelledby="wff-followup-title">
        <div className="wff-shell wff-followup-layout">
          <div className="wff-followup-copy">
            <p className="wff-eyebrow">After the enquiry</p>
            <h2 id="wff-followup-title">
              Give “thank you”
              <br />a next step.
            </h2>
            <p>
              Set up a workflow for a submitted form. Send an acknowledgement or create a task so
              your team knows what needs attention.
            </p>
            <p className="wff-booking-option">
              Ready for a booking? Direct the customer to a booking page after submission, or send a
              booking link in your follow-up.
            </p>
          </div>
          <div
            className="wff-followup-scene"
            aria-label="An example of a configured form submission workflow creating a follow-up task"
          >
            <p className="wff-scene-label">A workflow you configure</p>
            <div className="wff-trigger">
              <span>When</span>
              <p>Your air conditioning enquiry form is submitted</p>
            </div>
            <div className="wff-task-connector" aria-hidden="true">
              <span />
              <ArrowDown size={19} />
            </div>
            <div className="wff-task">
              <div className="wff-task-heading">
                <ZaplaPetal size={28} />
                <span>Create a follow-up task</span>
              </div>
              <h3>Follow up on Mia’s replacement enquiry</h3>
              <div className="wff-task-person">
                <MiaPortrait />
                <p>
                  {ENQUIRY.name}
                  <span>{ENQUIRY.service}</span>
                </p>
              </div>
              <p className="wff-task-context">
                The enquiry details are on Mia’s customer record, ready for the conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wff-section wff-shell wff-tracking" aria-labelledby="wff-tracking-title">
        <div className="wff-tracking-heading">
          <p className="wff-eyebrow">Understand your page</p>
          <h2 id="wff-tracking-title">
            See where visitors
            <br />
            click and scroll.
          </h2>
        </div>
        <div className="wff-tracking-body">
          <p>
            Choose a page and date range to see page views, unique visitors, clicks and average
            scroll depth. Click and scroll heatmaps show how visitors interact with that page.
          </p>
          <dl className="wff-tracking-questions">
            <div>
              <dt>Clicks</dt>
              <dd>What do visitors click?</dd>
            </div>
            <div>
              <dt>Scroll depth</dt>
              <dd>How far down the page do visitors explore?</dd>
            </div>
          </dl>
          <p className="wff-tracking-context">
            Planning the audience, outreach and measurement around a campaign?
          </p>
          <a href="/customer-marketing" className="wff-text-link">
            Explore Customer Marketing
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="wff-build-section" aria-labelledby="wff-build-title">
        <div className="wff-shell">
          <div className="wff-build-heading">
            <p className="wff-eyebrow">Choose your starting point</p>
            <h2 id="wff-build-title">
              Build it yourself.
              <br />
              Or have it designed for you.
            </h2>
          </div>
          <div className="wff-build-options">
            <article className="wff-self-service">
              <p className="wff-option-label">Self-service platform</p>
              <h3>
                Build your own
                <br />
                pages and forms.
              </h3>
              <p>
                Use the website, funnel and form tools in your Zapla subscription. Create the pages,
                connect the fields and configure the follow-up that suits your business.
              </p>
              <p className="wff-option-scope">You create and manage the content.</p>
            </article>
            <article className="wff-design-service">
              <p className="wff-option-label">Paid website design service</p>
              <h3>
                Have Zapla
                <br />
                design your website.
              </h3>
              <p>
                Want someone to handle the website design and build? We’ll agree the pages, content
                and connections you need, then quote for that scope.
              </p>
              <p className="wff-option-scope">
                Custom website design is a separate paid service. It is not included in the software
                subscription.
              </p>
              <SalesLink children="Discuss your website" />
            </article>
          </div>
          <p className="wff-launch-note">
            Guided Launch covers the agreed initial setup of your forms, contact fields and
            follow-up. It is required for new standard accounts and priced separately from your
            subscription. <a href="/Pricing-v3">See plans and Guided Launch.</a>
          </p>
        </div>
      </section>

      <section className="wff-section wff-shell wff-faq" aria-labelledby="wff-faq-title">
        <div>
          <p className="wff-eyebrow">A few useful answers</p>
          <h2 id="wff-faq-title">Before you build.</h2>
        </div>
        <div className="wff-faq-list">
          {FAQS.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={19} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

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
