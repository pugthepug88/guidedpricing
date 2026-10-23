import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/feature-foundations.css";
import "@/styles/pipeline-management.css";

const PORTRAITS = "/concept/revenue/soft-autumn-portraits-v1.webp";

function Portrait({ cell, small = false }: { cell: number; small?: boolean }) {
  return (
    <span
      className={`pf-portrait${small ? " pf-portrait-small" : ""}`}
      aria-hidden="true"
      style={{
        backgroundImage: `url('${PORTRAITS}')`,
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

function BookCall() {
  return (
    <a className="pf-button" href="/booking">
      Book a Call <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}

function HeroBoard() {
  const [benOnly, setBenOnly] = useState(false);
  return (
    <div className="pf-overview">
      <div className="pf-overview-top">
        <div className="pf-board-brand">
          <img src="/concept/zapla-logo-white.png" alt="Zapla" width="86" height="26" />
          <span>Enquiries &amp; quotes</span>
        </div>
        <div
          className="pf-owner-filter"
          aria-label="Filter the illustrated pipeline by person responsible"
        >
          <button
            type="button"
            aria-pressed={!benOnly}
            aria-controls="pipeline-overview"
            onClick={() => setBenOnly(false)}
          >
            Whole team
          </button>
          <button
            type="button"
            aria-pressed={benOnly}
            aria-controls="pipeline-overview"
            onClick={() => setBenOnly(true)}
          >
            <Portrait cell={13} small />
            Ben’s opportunities
          </button>
        </div>
      </div>
      <div className="pf-overview-lanes" id="pipeline-overview">
        <div className="pf-overview-lane pf-overview-support">
          <h2>Enquiry received</h2>
          <article className="pf-compact-opportunity">
            <div className="pf-person">
              <Portrait cell={4} />
              <strong>Priya Shah</strong>
            </div>
            <h3>Kitchen renovation</h3>
            <p>Discuss the scope of the work.</p>
            <div className="pf-assigned">
              <Portrait cell={13} small />
              <span>Ben Walker</span>
            </div>
          </article>
        </div>
        <div className="pf-overview-lane pf-overview-focus">
          <h2>Quote sent</h2>
          <article className="pf-focus-opportunity">
            <div className="pf-person">
              <Portrait cell={9} />
              <div>
                <strong>Mia Thompson</strong>
                <span>Hot water replacement</span>
              </div>
            </div>
            <div className="pf-focus-question">
              <span>What needs attention</span>
              <p>Does the quote include taking the old unit away?</p>
            </div>
            <div className="pf-focus-bottom">
              <div className="pf-assigned">
                <Portrait cell={13} small />
                <div>
                  <span>Responsible</span>
                  <strong>Ben Walker</strong>
                </div>
              </div>
              <a href="#pipeline-explore" aria-label="Follow Mia’s opportunity">
                Follow this opportunity <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
        <div className="pf-overview-lane pf-overview-support">
          <h2>Accepted</h2>
          {benOnly ? (
            <div className="pf-empty-lane">
              <p>No opportunities assigned to Ben in this stage.</p>
            </div>
          ) : (
            <article className="pf-compact-opportunity">
              <div className="pf-person">
                <Portrait cell={5} />
                <strong>Daniel Brooks</strong>
              </div>
              <h3>Office maintenance</h3>
              <p>Arrange access through reception.</p>
              <div className="pf-assigned">
                <Portrait cell={8} small />
                <span>Alex Chen</span>
              </div>
            </article>
          )}
        </div>
      </div>
      <p className="pf-filter-result" aria-live="polite">
        {benOnly
          ? "Ben’s work is in focus. The stages stay in view."
          : "See the shared picture, or choose Ben’s opportunities to focus on his work."}
      </p>
    </div>
  );
}

function CustomStages() {
  return (
    <section className="pf-section pf-process" aria-labelledby="pipeline-stages-heading">
      <div className="pf-wrap">
        <div className="pf-section-heading">
          <div>
            <p className="pf-eyebrow">Your process, in view</p>
            <h2 id="pipeline-stages-heading">
              Use stages your
              <br className="pf-desktop-break" /> team understands.
            </h2>
          </div>
          <p>
            A site visit before a quote. Documents before a proposal. Name and order the stages
            around the way your business works, with a clear meaning for each.
          </p>
        </div>
        <ol className="pf-stage-map" aria-label="A pipeline built around a service enquiry">
          {[
            ["Enquiry received", "A customer has asked for help."],
            ["Visit arranged", "A time to discuss the work is agreed."],
            ["Quote sent", "The customer has the details to decide."],
            ["Accepted", "The customer has agreed to go ahead."],
          ].map(([title, copy], index) => (
            <li key={title}>
              <div>
                <h3>{title}</h3>
                {index < 3 && <ArrowRight size={19} aria-hidden="true" />}
              </div>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function OpportunityStory() {
  // Each transition is an explicit visitor action. Moving the stage does not
  // change the next-action field; that is a separate, visible human update.
  const [phase, setPhase] = useState(0);
  const reducedMotion = useReducedMotion();
  const moved = phase >= 2;
  const nextRecorded = phase === 3;
  const stage = moved ? "Accepted" : "Quote sent";
  const nextAction = nextRecorded ? "Arrange an installation time" : "Confirm Mia’s decision";
  const updateStatus = [
    "Quote sent. Ben has answered the question and is waiting for Mia’s decision.",
    "Mia has agreed to go ahead. The opportunity is still in Quote sent until Ben updates it.",
    "Ben moved the opportunity to Accepted. The next-action field is unchanged until he updates it.",
    "Ben recorded Arrange an installation time. The opportunity is Accepted, with Ben responsible.",
  ][phase];
  return (
    <section
      className="pf-section pf-story"
      id="pipeline-explore"
      aria-labelledby="pipeline-story-heading"
    >
      <div className="pf-wrap">
        <div className="pf-section-heading">
          <div>
            <p className="pf-eyebrow">Follow Mia’s opportunity</p>
            <h2 id="pipeline-story-heading">
              The reply changes.
              <br />
              So does the next step.
            </h2>
          </div>
          <p>
            See how Mia’s decision guides the next step. Your team keeps the stage and next action
            accurate as the work progresses.
          </p>
        </div>
        <div className="pf-demo-layout">
          <div className="pf-demo-story">
            <div className="pf-history-thread">
              <div className="pf-history-message">
                <div className="pf-person">
                  <Portrait cell={9} />
                  <strong>Mia’s question</strong>
                </div>
                <p>“Does the quote include taking the old unit away?”</p>
              </div>
              <div className="pf-history-message pf-history-answer">
                <div className="pf-person">
                  <Portrait cell={13} />
                  <strong>Ben’s reply</strong>
                </div>
                <p>“Yes, removal of the old unit is included in your quote.”</p>
              </div>
            </div>
            <div className="pf-decision-area">
              {phase === 0 ? (
                <p>Ben has answered the question. The quote is still waiting on Mia’s decision.</p>
              ) : (
                <>
                  <div className="pf-customer-decision">
                    <div className="pf-person">
                      <Portrait cell={9} />
                      <strong>Mia’s reply</strong>
                    </div>
                    <p>“Thanks, that answers my question. I’d like to go ahead.”</p>
                  </div>
                  {phase === 1 && (
                    <div className="pf-human-action">
                      <p>Mia has said yes. Ben can now move the opportunity.</p>
                    </div>
                  )}
                  {phase === 2 && (
                    <div className="pf-human-action">
                      <p>The stage is updated. Ben now records what needs doing next.</p>
                      <div className="pf-proposed-action">
                        <span>Next action to record</span>
                        <strong>Arrange an installation time</strong>
                      </div>
                    </div>
                  )}
                  {phase === 3 && (
                    <div className="pf-story-complete">
                      <h3>Ready for the next conversation.</h3>
                      <p>Mia’s decision is clear. Ben’s next action is recorded for the team.</p>
                    </div>
                  )}
                </>
              )}
              <button
                className={phase === 3 ? "pf-reset" : "pf-demo-button"}
                type="button"
                onClick={() => setPhase((current) => (current + 1) % 4)}
              >
                {
                  [
                    "See Mia’s reply",
                    "Move to Accepted",
                    "Save next action",
                    "Return to the quote",
                  ][phase]
                }
                {phase < 3 && <ArrowRight size={17} aria-hidden="true" />}
              </button>
              <div className="pf-mobile-state" aria-label="Mia’s current opportunity">
                <div className="pf-person">
                  <Portrait cell={9} small />
                  <strong>Mia’s opportunity</strong>
                </div>
                <dl>
                  <div>
                    <dt>Stage</dt>
                    <dd>{stage}</dd>
                  </div>
                  <div>
                    <dt>Responsible</dt>
                    <dd>Ben Walker</dd>
                  </div>
                  <div>
                    <dt>Next action</dt>
                    <dd>{nextAction}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="pf-demo-anchor">
            <div className="pf-demo-board" aria-label="Mia’s opportunity and its current stage">
              <div className="pf-demo-board-title">
                <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="85" height="24" />
                <span>One opportunity, kept up to date</span>
              </div>
              <div className="pf-move-board">
                <div className={`pf-move-lane${!moved ? " pf-current-lane" : ""}`}>
                  <span>Quote sent</span>
                </div>
                <div className={`pf-move-lane${moved ? " pf-current-lane" : ""}`}>
                  <span>Accepted</span>
                </div>
                <motion.article
                  className="pf-moving-opportunity"
                  layout={!reducedMotion}
                  style={{ gridColumn: moved ? 2 : 1 }}
                  transition={{
                    layout: { duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <div className="pf-person">
                    <Portrait cell={9} />
                    <strong>Mia Thompson</strong>
                  </div>
                  <h3>Hot water replacement</h3>
                  <dl>
                    <div>
                      <dt>Stage</dt>
                      <dd>{stage}</dd>
                    </div>
                    <div>
                      <dt>Responsible</dt>
                      <dd>
                        <Portrait cell={13} small />
                        Ben Walker
                      </dd>
                    </div>
                    <div className="pf-next-action-field">
                      <dt>Next action</dt>
                      <dd>{nextAction}</dd>
                    </div>
                  </dl>
                </motion.article>
              </div>
              <p className="pf-update-caption">
                {phase >= 2
                  ? nextRecorded
                    ? "Ben updated the stage and the next action."
                    : "Ben updated the stage. Next action still to update."
                  : "Ben keeps this opportunity up to date."}
              </p>
            </div>
            <p className="pf-demo-explanation">
              The customer’s reply informs the decision. A person makes the update.
            </p>
          </div>
          <div className="pf-static-story">
            <div className="pf-person">
              <Portrait cell={9} />
              <strong>Mia’s reply</strong>
            </div>
            <p>“Thanks, that answers my question. I’d like to go ahead.”</p>
            <h3>Ben updates the opportunity.</h3>
            <p>
              With Mia’s agreement, Ben moves the opportunity to Accepted. He then records arranging
              an installation time as the next action. These are two separate updates made by a
              person.
            </p>
            <dl>
              <div>
                <dt>Stage</dt>
                <dd>Accepted</dd>
              </div>
              <div>
                <dt>Responsible</dt>
                <dd>Ben Walker</dd>
              </div>
              <div>
                <dt>Next action</dt>
                <dd>Arrange an installation time</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="pf-sr-only" role="status" aria-live="polite" aria-atomic="true">
          {updateStatus}
        </p>
      </div>
    </section>
  );
}

function ConnectedHistory() {
  return (
    <section className="pf-section pf-connected" aria-labelledby="pipeline-history-heading">
      <div className="pf-wrap pf-connected-layout">
        <div className="pf-connected-intro">
          <p className="pf-eyebrow">The history behind the stage</p>
          <h2 id="pipeline-history-heading">
            Pick up the work.
            <br />
            Keep the context.
          </h2>
          <p>
            The stage tells a colleague where things stand. The customer record tells them what was
            asked, what was agreed and who is handling it.
          </p>
          <a className="pf-text-link" href="/crm">
            Explore Zapla CRM <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="pf-customer-record">
          <div className="pf-record-heading">
            <div className="pf-person">
              <Portrait cell={9} />
              <div>
                <span>Linked customer record</span>
                <h3>Mia Thompson</h3>
              </div>
            </div>
          </div>
          <div className="pf-record-history">
            <div>
              <span>Original enquiry</span>
              <p>Replace the old hot water system.</p>
            </div>
            <div>
              <span>Quote detail</span>
              <p>Removal of the old unit is included.</p>
            </div>
            <div>
              <span>Customer question</span>
              <p>“Does the quote include taking the old unit away?”</p>
            </div>
          </div>
          <div className="pf-record-opportunity">
            <span>Linked opportunity</span>
            <strong>Hot water replacement</strong>
            <div className="pf-assigned">
              <Portrait cell={13} small />
              <span>Responsible: Ben Walker</span>
            </div>
          </div>
        </div>
        <figure className="pf-team-photo">
          <img
            src="/concept/industries/trades-office.webp"
            alt="A team member reviewing customer work at a service business"
            loading="lazy"
            width="1536"
            height="1024"
          />
          <figcaption>
            Useful to the team handling the work. Clear to the person overseeing it.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function AutomationConnection() {
  return (
    <section className="pf-section pf-automation" aria-labelledby="pipeline-automation-heading">
      <div className="pf-wrap pf-automation-layout">
        <div>
          <p className="pf-eyebrow">Connect progress to action</p>
          <h2 id="pipeline-automation-heading">
            A stage change can
            <br className="pf-desktop-break" /> start agreed work.
          </h2>
          <p>
            A configured workflow can respond to a stage change by creating a task, sending a
            message or updating a field. You agree the action, timing and conditions during setup.
          </p>
          <a className="pf-text-link" href="/features/automation-builder">
            Explore Automation Builder <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="pf-trigger-scene">
          <div className="pf-trigger-person">
            <Portrait cell={13} />
            <div>
              <span>Your team updates the pipeline</span>
              <strong>Ben moves an opportunity to “Quote sent”</strong>
            </div>
          </div>
          <div className="pf-trigger-connector" aria-hidden="true">
            <ArrowDown size={21} />
          </div>
          <div className="pf-trigger-action">
            <ZaplaPetal size={38} />
            <div>
              <span>A workflow configured for this stage</span>
              <h3>Create a follow-up task</h3>
            </div>
          </div>
          <p>
            Pipeline Management records the progress.
            <br />
            Automation Builder runs the workflow you configure.
          </p>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunch() {
  return (
    <section className="pf-section pf-launch" aria-labelledby="pipeline-launch-heading">
      <div className="pf-wrap pf-launch-layout">
        <div>
          <p className="pf-eyebrow">Guided Launch</p>
          <h2 id="pipeline-launch-heading">
            Your working day.
            <br />
            Your pipeline.
            <br />
            Set up together.
          </h2>
          <p>
            Starting with spreadsheets and inboxes, or already using a CRM? We work through how an
            enquiry becomes a customer, then agree what belongs in Zapla.
          </p>
          <a className="pf-text-link" href="/booking">
            Talk through your setup <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="pf-working-plan">
          <h3>What we work through with you</h3>
          <dl>
            <div>
              <dt>The stages</dt>
              <dd>What each stage means, and when an opportunity should move.</dd>
            </div>
            <div>
              <dt>The people</dt>
              <dd>Who is responsible, and which team members need access.</dd>
            </div>
            <div>
              <dt>The useful details</dt>
              <dd>The customer links, notes and next-action fields your team needs.</dd>
            </div>
            <div>
              <dt>The daily routine</dt>
              <dd>Walk through an enquiry together so the team knows how to keep it current.</dd>
            </div>
          </dl>
          <p>Unlimited users. A shared process the whole team can work from.</p>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Can the stages match the way my business works?",
    "Yes. You can name and order stages around your process. During Guided Launch, we agree what each stage means and when an opportunity should move, so the team uses the same language.",
  ],
  [
    "Can I focus on one person’s opportunities?",
    "Yes. Filter pipeline items by assigned team member or status, and search by title. That lets you review the shared picture or focus on the work a particular person is responsible for.",
  ],
  [
    "How do we keep progress and next actions up to date?",
    "Move an opportunity to the appropriate stage as the work progresses. Update its fields or notes to record the next action. A next-action field can be configured around your process; changing a stage does not by itself mean a task has been created.",
  ],
  [
    "Does an opportunity connect to the customer record?",
    "Yes. Link the opportunity to its customer. The customer profile brings messages, notes, activity and related pipeline records together, so the team can review the history behind the work.",
  ],
  [
    "Can a stage change start a workflow?",
    "Yes. A pipeline stage change can trigger a configured workflow, with actions such as creating a task, sending a message or updating a field. We agree the actions, timing and conditions during setup. Pipeline Management tracks progress; Automation Builder controls the workflow.",
  ],
  [
    "Can my whole team use the same pipeline?",
    "Zapla includes unlimited users. Guided Launch helps set up the team access and responsibilities around your process, so the people who need the information can work in the same system.",
  ],
  [
    "What if we already use a CRM or specialist software?",
    "We review your current tools and how enquiries move through the business first. Then we agree what belongs in Zapla, what data should move and which connections are available before recommending a change.",
  ],
];

export function PipelineManagementPage() {
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);

  return (
    <main
      className="zapla-feature zapla-pipeline"
      data-page="pipeline-management"
      data-enhanced={enhanced}
    >
      <section className="pf-hero">
        <div className="pf-wrap">
          <div className="pf-hero-copy">
            <p className="pf-eyebrow">Pipeline Management</p>
            <h1>
              See what’s waiting.
              <br />
              Know who’s on it.
            </h1>
            <p className="pf-lead">
              Keep enquiries and quotes in view, with their stage and the person responsible. See
              what needs attention, with the customer history there when you need it.
            </p>
            <div className="pf-actions">
              <BookCall />
              <a className="pf-text-link" href="#pipeline-explore">
                See an opportunity progress <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <HeroBoard />
        </div>
      </section>
      <CustomStages />
      <OpportunityStory />
      <ConnectedHistory />
      <AutomationConnection />
      <GuidedLaunch />
      <section className="pf-section pf-faq" aria-labelledby="pipeline-faq-heading">
        <div className="pf-wrap pf-faq-layout">
          <div>
            <p className="pf-eyebrow">Before you get started</p>
            <h2 id="pipeline-faq-heading">
              The practical
              <br />
              questions.
            </h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={18} aria-hidden="true" />
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
            Walk us through your enquiries and quotes. We’ll map the stages, responsibilities and
            customer information your team needs.
          </p>
          <BookCall />
        </div>
      </section>
    </main>
  );
}
