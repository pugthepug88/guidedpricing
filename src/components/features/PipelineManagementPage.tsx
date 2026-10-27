import {
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  Hash,
  MapPin,
  Paperclip,
  Plus,
  Tag,
  Type,
  Workflow,
} from "lucide-react";
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
function PipelineFitTools() {
  return (
    <section className="pf-fit" id="pipeline-fit" aria-labelledby="pipeline-fit-heading">
      <div className="pf-wrap">
        <header className="pf-fit-heading">
          <div>
            <p className="pf-eyebrow">Built around your team</p>
            <h2 id="pipeline-fit-heading">Make the pipeline fit how you work.</h2>
          </div>
          <p>
            Keep the extra detail your team needs, make important opportunities easier to spot and
            put repeated actions closer to the record.
          </p>
        </header>

        <div className="pf-fit-grid">
          <article className="pf-fit-card pf-fit-fields">
            <div
              className="pf-fit-scene pf-fields-scene"
              aria-label="Add a custom field: choose its type, name it and define dropdown options"
            >
              <div className="pf-fit-record pf-field-type-picker">
                <div className="pf-tool-picker-title">
                  <Plus size={15} aria-hidden="true" /> Add custom field
                </div>
                <div className="pf-field-types" aria-label="Available custom field types">
                  <span>
                    <Type size={18} aria-hidden="true" />
                    Text
                  </span>
                  <span>
                    <Hash size={18} aria-hidden="true" />
                    Number
                  </span>
                  <span>
                    <CalendarDays size={18} aria-hidden="true" />
                    Date
                  </span>
                  <span className="pf-field-type-selected">
                    <ChevronDown size={18} aria-hidden="true" />
                    Dropdown
                  </span>
                  <span>
                    <MapPin size={18} aria-hidden="true" />
                    Address
                  </span>
                  <span>
                    <Paperclip size={18} aria-hidden="true" />
                    File
                  </span>
                </div>
              </div>
              <div className="pf-fit-record pf-field-editor">
                <dl>
                  <div>
                    <dt>Field name</dt>
                    <dd className="pf-field-name-value">System type</dd>
                  </div>
                  <div>
                    <dt>Dropdown options</dt>
                    <dd className="pf-field-options">
                      <span>Heat pump</span>
                      <span>Gas</span>
                      <span>Electric</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="pf-fit-card-copy">
              <h3>Custom fields</h3>
              <p>Keep the job details your team needs, in fields you define.</p>
            </div>
          </article>

          <article className="pf-fit-card pf-fit-actions">
            <div
              className="pf-fit-scene pf-actions-scene"
              aria-label="Custom buttons on an opportunity open a job form, run follow-up or add an urgent tag"
            >
              <div className="pf-fit-record pf-action-record">
                <div className="pf-fit-record-title">Hot water replacement</div>
                <div className="pf-fit-person">
                  <PipelinePortrait cell={9} small />
                  <span>Mia Thompson</span>
                </div>
                <div className="pf-shortcut-toolbar" aria-label="Custom quick-action buttons">
                  <span className="pf-shortcut pf-shortcut-form">
                    <FileText size={15} aria-hidden="true" />
                    Job form
                  </span>
                  <span className="pf-shortcut pf-shortcut-workflow">
                    <Workflow size={15} aria-hidden="true" />
                    Follow up
                  </span>
                  <span className="pf-shortcut pf-shortcut-tag">
                    <Tag size={15} aria-hidden="true" />
                    Mark urgent
                  </span>
                </div>
              </div>
              <div className="pf-fit-record pf-action-type-picker">
                <div className="pf-tool-picker-title">
                  <Plus size={14} aria-hidden="true" />
                  Add button
                </div>
                <ul className="pf-action-type-list">
                  <li>
                    <FileText size={15} aria-hidden="true" />
                    <span>Open form</span>
                  </li>
                  <li className="pf-action-type-selected">
                    <Workflow size={15} aria-hidden="true" />
                    <span>Run workflow</span>
                    <Check size={13} aria-hidden="true" />
                  </li>
                  <li>
                    <Tag size={15} aria-hidden="true" />
                    <span>Add tag</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pf-fit-card-copy">
              <h3>Quick actions</h3>
              <p>Open a form, run a workflow or apply a tag from the opportunity.</p>
            </div>
          </article>

          <article className="pf-fit-card pf-fit-tags">
            <div
              className="pf-fit-scene pf-tags-scene"
              aria-label="Tags make priority and job type visible across opportunities"
            >
              <div className="pf-fit-record pf-tag-key">
                <span className="pf-fit-ui-label pf-tag-picker-title">
                  <Plus size={12} aria-hidden="true" />
                  Add tags
                </span>
                <div className="pf-tag-list">
                  <span className="pf-tag pf-tag-urgent">
                    <Check size={11} aria-hidden="true" />
                    Urgent
                  </span>
                  <span className="pf-tag pf-tag-install">
                    <Check size={11} aria-hidden="true" />
                    Install
                  </span>
                  <span className="pf-tag pf-tag-vip">VIP</span>
                </div>
              </div>
              <div className="pf-fit-record pf-tags-record">
                <div className="pf-tags-list-heading">Opportunities</div>
                <ul className="pf-tagged-opportunities">
                  <li>
                    <div className="pf-tagged-work">
                      <strong>Hot water replacement</strong>
                      <span>Mia Thompson</span>
                    </div>
                    <div className="pf-tag-list">
                      <span className="pf-tag pf-tag-urgent">Urgent</span>
                      <span className="pf-tag pf-tag-install">Install</span>
                    </div>
                  </li>
                  <li>
                    <div className="pf-tagged-work">
                      <strong>Office fit-out</strong>
                      <span>Priya Shah</span>
                    </div>
                    <div className="pf-tag-list">
                      <span className="pf-tag pf-tag-install">Install</span>
                    </div>
                  </li>
                  <li>
                    <div className="pf-tagged-work">
                      <strong>Annual maintenance</strong>
                      <span>Rachel Evans</span>
                    </div>
                    <div className="pf-tag-list">
                      <span className="pf-tag pf-tag-vip">VIP</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pf-fit-card-copy">
              <h3>Tags</h3>
              <p>
                Label opportunities by priority or job type, so the right work is easier to spot at
                a glance.
              </p>
            </div>
          </article>
        </div>
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
          <div className="pf-board-benefits" aria-label="A pipeline built around your business">
            <div>
              <h2>Your process, in stages.</h2>
              <p>
                Name and order stages around the way your business works. Keep different processes
                in their own pipelines.
              </p>
            </div>
            <div>
              <h2>Clear responsibility.</h2>
              <p>
                See who’s responsible and when it’s due. Add a next-action field to make the
                follow-up clear.
              </p>
            </div>
            <div>
              <h2>The view you need.</h2>
              <p>
                Review progress on the board, scan the details in a table, or organise the same work
                by due date.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PipelineFitTools />
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
