import { ListChecks, Plus, Workflow } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import { PipelineBoard, PipelinePortrait } from "@/components/features/PipelineBoard";
import { PipelineRoutes } from "@/components/features/PipelineRoutes";
import "@/styles/feature-foundations.css";
import "@/styles/pipeline-management.css";

function BookCall() {
  return (
    <a className="pf-button" href="/booking">
      Book a Call
    </a>
  );
}

function PipelineCustomisation() {
  return (
    <section className="pf-customise" aria-labelledby="pipeline-customise-heading">
      <h2 id="pipeline-customise-heading">Make the pipeline fit your team.</h2>
      <div className="pf-customise-grid">
        <article aria-labelledby="pipeline-fields-heading">
          <h3 id="pipeline-fields-heading">Custom fields</h3>
          <p>
            Keep the job details your team needs on each opportunity. Choose which fields appear on
            the card.
          </p>
          <dl className="pf-field-example" aria-label="Custom opportunity fields">
            <div>
              <dt>Job type</dt>
              <dd>Replacement</dd>
            </div>
            <div>
              <dt>Next action</dt>
              <dd>Arrange installation</dd>
            </div>
          </dl>
        </article>
        <article aria-labelledby="pipeline-shortcuts-heading">
          <h3 id="pipeline-shortcuts-heading">Quick actions</h3>
          <p>Put routine work a click away. Add a shortcut to a form or a configured workflow.</p>
          <div className="pf-shortcut-example" aria-label="Configured quick actions">
            <div>
              <ListChecks size={17} aria-hidden="true" />
              <span>Installation checklist</span>
              <small>Form</small>
            </div>
            <div>
              <Workflow size={17} aria-hidden="true" />
              <span>Start follow-up</span>
              <small>Workflow</small>
            </div>
          </div>
        </article>
        <article aria-labelledby="pipeline-tags-heading">
          <h3 id="pipeline-tags-heading">Tags</h3>
          <p>
            Group opportunities with your own labels, so your team can spot job types and follow-up
            work.
          </p>
          <div className="pf-tag-example" aria-label="Tags on an opportunity">
            <strong>Hot water replacement</strong>
            <div>
              <span>Installation</span>
              <span>Follow up</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function CustomerContext() {
  return (
    <section className="pf-section pf-context" aria-labelledby="pipeline-context-heading">
      <div className="pf-wrap pf-context-layout">
        <figure className="pf-field-photo">
          <img
            src="/concept/pipeline/field-team-20261026.svg"
            alt="A service coordinator and field technician reviewing the work beside a parked van"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <figcaption>For the team in the office and the person heading out.</figcaption>
        </figure>
        <div className="pf-context-copy">
          <p className="pf-eyebrow">Connected to your CRM</p>
          <h2 id="pipeline-context-heading">
            The customer history
            <br />
            stays with the work.
          </h2>
          <p>
            A stage tells you where things stand. The linked customer record keeps the messages,
            notes and details behind it within reach, so a colleague can pick up the next
            conversation or visit.
          </p>
          <div
            className="pf-linked-record"
            aria-label="Customer context linked to Mia’s hot water replacement"
          >
            <header>
              <PipelinePortrait cell={9} />
              <div>
                <span>Linked customer</span>
                <h3>Mia Thompson</h3>
              </div>
            </header>
            <dl>
              <div>
                <dt>Enquiry</dt>
                <dd>Replace the old hot water system.</dd>
              </div>
              <div>
                <dt>Agreed detail</dt>
                <dd>Removal of the old unit is included.</dd>
              </div>
              <div>
                <dt>Opportunity</dt>
                <dd>Hot water replacement</dd>
              </div>
              <div>
                <dt>Opportunity assigned to</dt>
                <dd className="pf-record-person">
                  <PipelinePortrait cell={13} small />
                  Ben Walker
                </dd>
              </div>
            </dl>
          </div>
          <a className="pf-text-link" href="/crm">
            Explore the connected CRM
          </a>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunch() {
  return (
    <section className="pf-section pf-launch" aria-labelledby="pipeline-launch-heading">
      <div className="pf-wrap">
        <div className="pf-launch-layout">
          <div className="pf-launch-copy">
            <p className="pf-eyebrow">Guided Launch</p>
            <h2 id="pipeline-launch-heading">
              Your process.
              <br />
              Set up with you.
            </h2>
            <p>
              Starting with spreadsheets and inboxes, or already using a CRM? We map how enquiries
              become work, then agree the pipelines, customer information and team access you need.
            </p>
            <p className="pf-setup-price">
              Guided Launch is the required, separately priced initial setup for a new standard
              plan. We agree the scope before work begins.
            </p>
            <a className="pf-text-link" href="/booking">
              Talk through your setup
            </a>
          </div>
          <div className="pf-launch-plan">
            <h3>A practical working plan</h3>
            <dl>
              <div>
                <dt>Define the stages</dt>
                <dd>
                  Agree what each stage means and when an opportunity should move. Use separate
                  pipelines where the processes differ.
                </dd>
              </div>
              <div>
                <dt>Keep useful details visible</dt>
                <dd>
                  Set up the fields, due dates, customer links and responsibilities the team needs
                  to do the work.
                </dd>
              </div>
              <div>
                <dt>Walk through the day</dt>
                <dd>
                  Review an enquiry, update its progress and plan a route where visits are part of
                  your business.
                </dd>
              </div>
            </dl>
            <p>Unlimited users on both standard plans. No per-user fees.</p>
          </div>
        </div>
        <div className="pf-automation-bridge">
          <div>
            <h3>Set up follow-up when a stage changes.</h3>
            <p>
              A configured workflow can respond to pipeline events. Keep the stages here, and build
              the agreed follow-up in Automation Builder.
            </p>
          </div>
          <a className="pf-text-link" href="/features/automation-builder">
            Explore Automation Builder
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  [
    "Can I use my own stages and more than one pipeline?",
    "Yes. Create pipelines around your different processes, with named stages in the order your team follows. Sales enquiries, customer work and other processes do not have to share the same stage definitions.",
  ],
  [
    "Can I see one person’s work or focus on due dates?",
    "Yes. Filter items by assigned person and use the view that suits the question: Board for progress by stage, Table for record details, or Timeline to group the work by due date.",
  ],
  [
    "How does route optimisation work?",
    "Choose pipeline jobs for the run, optimise their stop order and save the route for a driver and a date. You can filter the available items by pipeline, stage, due date and assigned user, and choose the route’s start and end options.",
  ],
  [
    "Can the driver open the route on a phone?",
    "Yes. The driver can open the saved route on their phone and use Google Maps for directions. The jobs remain in the pipeline, so planning the visits does not mean keeping a separate list of work.",
  ],
  [
    "What happens when I move an opportunity?",
    "A stage change records progress. Use a custom field or note to record what the team should do next, and update it as the work changes. Configure agreed automated follow-up separately in Automation Builder. Moving a card does not by itself create an appointment or route.",
  ],
  [
    "What if we already use a CRM or specialist software?",
    "We review your current process and tools first. Then we agree what belongs in Zapla, which data should move and what connections are available. Guided Launch gives the team a practical starting point without assuming every system should be replaced.",
  ],
];

export function PipelineManagementPage() {
  return (
    <main className="zapla-feature zapla-pipeline" data-page="pipeline-management">
      <section className="pf-hero" aria-labelledby="pipeline-title">
        <div className="pf-wrap">
          <header className="pf-hero-heading">
            <div>
              <p className="pf-eyebrow">Pipeline Management</p>
              <h1 id="pipeline-title">
                <span>See where every</span> <span>opportunity stands.</span>
              </h1>
            </div>
            <div className="pf-hero-copy">
              <p>
                Keep enquiries moving without chasing the team for updates. See where each quote or
                job stands, who’s responsible and what needs attention next.
              </p>
              <div className="pf-actions">
                <BookCall />
                <a className="pf-text-link" href="#pipeline-routes">
                  Explore route planning
                </a>
              </div>
            </div>
          </header>
          <PipelineBoard />
          <PipelineCustomisation />
        </div>
      </section>
      <PipelineRoutes />
      <CustomerContext />
      <GuidedLaunch />
      <section className="pf-section pf-faq" aria-labelledby="pipeline-faq-heading">
        <div className="pf-wrap pf-faq-layout">
          <div>
            <p className="pf-eyebrow">Before you get started</p>
            <h2 id="pipeline-faq-heading">
              The practical <br />
              questions.
            </h2>
          </div>
          <div>
            {FAQS.map(([question, answer]) => (
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
      </section>
      <section className="pf-final">
        <div className="pf-wrap">
          <div className="pf-final-petal">
            <ZaplaPetal size={34} />
          </div>
          <p className="pf-eyebrow">See it around your business</p>
          <h2>
            See how your pipeline
            <br className="pf-desktop-break" /> would work in Zapla.
          </h2>
          <p>
            Walk us through how enquiries become work. We’ll map your stages, responsibilities and
            customer information, plus route planning if your team visits customers.
          </p>
          <BookCall />
        </div>
      </section>
    </main>
  );
}
