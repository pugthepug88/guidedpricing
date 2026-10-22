import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import "@/styles/feature-foundations.css";
import "@/styles/pipeline-management.css";

function Portrait({ cell }: { cell: number }) {
  return (
    <span
      className="pf-portrait"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
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
function Brand() {
  return (
    <div className="pf-brand">
      <img src="/concept/zapla-logo-dark.svg" alt="Zapla" />
      <span>Pipeline Management</span>
    </div>
  );
}
const opportunities = [
  {
    stage: "Enquiry received",
    name: "Priya Shah",
    cell: 4,
    work: "Kitchen renovation",
    owner: "Ben Walker",
    note: "Discuss the scope of the work.",
  },
  {
    stage: "Quote sent",
    name: "Mia Thompson",
    cell: 9,
    work: "Hot water replacement",
    owner: "Ben Walker",
    note: "Confirm whether the quote includes removal.",
  },
  {
    stage: "Accepted",
    name: "Daniel Brooks",
    cell: 5,
    work: "Office maintenance",
    owner: "Alex Chen",
    note: "Arrange access through reception.",
  },
];
function HeroBoard() {
  return (
    <div className="pf-board-stage">
      <div className="pf-stage-arch" aria-hidden="true" />
      <div className="pf-board-glass">
        <Brand />
        <div className="pf-board-columns">
          {opportunities.map((item, i) => (
            <div className="pf-board-column" key={item.stage}>
              <div className="pf-column-label">
                <span>0{i + 1}</span>
                <h2>{item.stage}</h2>
              </div>
              <div className="pf-opportunity">
                <div className="pf-person">
                  <Portrait cell={item.cell} />
                  <span>{item.name}</span>
                </div>
                <h3>{item.work}</h3>
                <div className="pf-owner">
                  <span>Owner</span>
                  <strong>{item.owner}</strong>
                </div>
                <p>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="pf-board-caption">The stage is visible. The customer stays connected.</p>
    </div>
  );
}
const journey = [
  {
    name: "Enquiry received",
    title: "Start with the customer and the opportunity.",
    copy: "Give the enquiry a place in your pipeline. Keep the customer, the work they need and the person responsible together.",
    next: "Discuss the hot water replacement",
    note: "Mia has asked about replacing her hot water system.",
  },
  {
    name: "Quote sent",
    title: "See which quotes still need a decision.",
    copy: "Keep a sent quote visible as an open opportunity. Check the customer’s conversation before following up, so you know what still needs answering.",
    next: "Answer Mia’s question about removal",
    note: "Mia asked whether removing the old unit is included.",
  },
  {
    name: "Accepted",
    title: "Give the next person a clear starting point.",
    copy: "When an opportunity progresses, keep its stage up to date. The team can see the customer history and understand what has been agreed.",
    next: "Arrange an installation time",
    note: "Mia has confirmed she would like to go ahead.",
  },
];
function OpportunityJourney() {
  const [selected, setSelected] = useState(1);
  const current = journey[selected];
  return (
    <section
      className="pf-section pf-journey"
      id="pipeline-explore"
      aria-labelledby="pipeline-explore-heading"
    >
      <div className="pf-wrap">
        <div className="pf-section-top">
          <div>
            <p className="pf-eyebrow">From enquiry to agreement</p>
            <h2 id="pipeline-explore-heading">
              Know where it stands.
              <br />
              Know what comes next.
            </h2>
          </div>
          <p>
            Choose a stage to see how the information around one opportunity changes as the customer
            moves forward.
          </p>
        </div>
        <div className="pf-journey-layout">
          <div className="pf-journey-nav" aria-label="Explore an opportunity">
            {journey.map((step, i) => (
              <button
                type="button"
                key={step.name}
                aria-pressed={selected === i}
                aria-controls="pipeline-stage-detail"
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                {step.name}
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="pf-journey-detail" id="pipeline-stage-detail" aria-live="polite">
            <div className="pf-journey-copy">
              <h3>{current.title}</h3>
              <p>{current.copy}</p>
            </div>
            <div className="pf-record">
              <div className="pf-person">
                <Portrait cell={9} />
                <div>
                  <strong>Mia Thompson</strong>
                  <span>Hot water replacement</span>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Stage</dt>
                  <dd>{current.name}</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>Ben Walker</dd>
                </div>
              </dl>
              <div className="pf-next">
                <span>Next step</span>
                <strong>{current.next}</strong>
              </div>
              <p>{current.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const faqs = [
  [
    "Can the stages match the way my business works?",
    "Yes. We map the pipeline stages around your sales process during Guided Launch, so the team can use language that fits your business.",
  ],
  [
    "Does an opportunity connect to the customer record?",
    "Yes. Pipelines work alongside customer records, conversations, notes and owners in Zapla CRM, so the stage is part of the customer context.",
  ],
  [
    "Can a stage change start a follow up?",
    "Yes. Pipeline stages can be used as automation triggers. We agree the timing, message and what should happen when a customer replies before setting up the workflow.",
  ],
  [
    "Can my whole team work from the same pipeline?",
    "Zapla includes unlimited users. Guided Launch helps set up the team access and responsibilities around your process.",
  ],
  [
    "What if we already use a CRM?",
    "We review your current tools and process first. Then we agree what should move into Zapla and which connections are available, rather than assuming everything needs replacing.",
  ],
  [
    "Is this the same as the CRM page?",
    "Pipeline Management focuses on tracking opportunities through your sales process. Zapla CRM covers the wider customer system, including records, conversations and automations.",
  ],
];
export function PipelineManagementPage() {
  return (
    <main className="zapla-feature zapla-pipeline" data-page="pipeline-management">
      <section className="pf-hero">
        <div className="pf-wrap">
          <div className="pf-hero-top">
            <div>
              <p className="pf-eyebrow">Pipeline Management</p>
              <h1>
                Every opportunity.
                <br />A clear next step.
              </h1>
            </div>
            <div className="pf-hero-intro">
              <p>
                See where enquiries and quotes stand, who owns them and what needs to happen next.
                Keep the sales process connected to the customer.
              </p>
              <div className="pf-actions">
                <BookCall />
                <a className="pf-text-link" href="#pipeline-explore">
                  Explore the pipeline <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
          </div>
          <HeroBoard />
        </div>
      </section>
      <section className="pf-benefits" aria-label="A clearer view of your sales process">
        <div className="pf-wrap pf-benefit-row">
          <div>
            <span>For the owner</span>
            <p>See the opportunities still open.</p>
          </div>
          <div>
            <span>For the team</span>
            <p>Know who is responsible.</p>
          </div>
          <div>
            <span>For the customer</span>
            <p>Keep the conversation in context.</p>
          </div>
        </div>
      </section>
      <OpportunityJourney />
      <section className="pf-human">
        <div className="pf-wrap">
          <div className="pf-human-layout">
            <div className="pf-human-copy">
              <p className="pf-eyebrow">Built around your process</p>
              <h2>
                Your stages.
                <br />
                Your way of working.
              </h2>
              <p>
                A site visit before a quote. A consultation before a proposal. Your pipeline should
                reflect the steps your business actually takes.
              </p>
              <p>
                Keep the stage, owner and customer context visible, so a colleague can pick up
                without piecing the opportunity back together.
              </p>
              <a className="pf-text-link" href="/crm">
                Explore the connected CRM <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="pf-photo">
              <img
                src="/concept/industries/trades-service-visit.webp"
                alt="A service professional discussing the work with a customer"
                loading="lazy"
                width="1672"
                height="941"
              />
              <div className="pf-photo-note">
                <span>One shared view</span>
                <p>
                  Useful to the person doing the work.
                  <br />
                  Clear to the person overseeing it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pf-section pf-automation">
        <div className="pf-wrap">
          <div className="pf-section-top">
            <div>
              <p className="pf-eyebrow">Connect progress to follow up</p>
              <h2>
                The stage can start
                <br />
                the next action.
              </h2>
            </div>
            <p>
              Use a pipeline stage to start an agreed workflow. Set the timing and follow up around
              your process, with a clear plan for customer replies.
            </p>
          </div>
          <div className="pf-flow">
            <div>
              <span>When</span>
              <h3>
                Stage becomes
                <br />
                Quote sent
              </h3>
            </div>
            <ArrowRight className="pf-flow-arrow" size={23} aria-hidden="true" />
            <div>
              <span>Check</span>
              <h3>
                Wait, then check
                <br />
                it is still open
              </h3>
            </div>
            <ArrowRight className="pf-flow-arrow" size={23} aria-hidden="true" />
            <div>
              <span>Follow up</span>
              <h3>
                Send the agreed
                <br />
                customer message
              </h3>
            </div>
          </div>
          <div className="pf-reply">
            <div className="pf-person">
              <Portrait cell={9} />
              <p>“Can you confirm what’s included?”</p>
            </div>
            <span>
              A reply can pause the sequence and bring the conversation back to your team.
            </span>
          </div>
          <a className="pf-text-link" href="/follow-up">
            See how follow up works <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="pf-section pf-launch">
        <div className="pf-wrap">
          <div className="pf-section-top">
            <div>
              <p className="pf-eyebrow">Guided Launch</p>
              <h2>
                Start with the process.
                <br />
                Build the pipeline around it.
              </h2>
            </div>
            <p>
              Working from spreadsheets and inboxes, or already using a CRM? We start with how your
              enquiries become customers.
            </p>
          </div>
          <ol className="pf-launch-steps">
            {[
              [
                "Map the stages",
                "Agree what each stage means and when an opportunity should move.",
              ],
              [
                "Connect the information",
                "Bring the agreed customer details, notes and ownership into the setup.",
              ],
              [
                "Walk through it together",
                "Show the team how to review opportunities and keep progress up to date.",
              ],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="pf-section pf-faq">
        <div className="pf-wrap pf-faq-layout">
          <div>
            <p className="pf-eyebrow">Before you get started</p>
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
      <section className="pf-final">
        <div className="pf-wrap">
          <p className="pf-eyebrow">See it around your business</p>
          <h2>
            Let’s make your
            <br />
            next steps clearer.
          </h2>
          <p>
            Walk us through how you handle enquiries and quotes. We’ll show you where a connected
            pipeline would help.
          </p>
          <BookCall />
        </div>
      </section>
    </main>
  );
}
