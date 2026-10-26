import { useEffect, useRef, useState, type CSSProperties } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Columns3, List, CalendarDays } from "lucide-react";

const STAGES = [
  { name: "Lead", colour: "#61783e" },
  { name: "Contacted", colour: "#b96039" },
  { name: "Proposal", colour: "#c79736" },
  { name: "Negotiation", colour: "#357985" },
  { name: "Closed won", colour: "#2d694f" },
] as const;

type Owner = "Ben Walker" | "Alex Chen";
type PipelineView = "board" | "table" | "timeline";
type Opportunity = {
  id: string;
  title: string;
  customer: string;
  stage: number;
  owner: Owner;
  due: string;
  next: string;
};

// Prepared records explain the product. No live account or customer data is used.
const OPPORTUNITIES: Opportunity[] = [
  {
    id: "priya",
    title: "Office fit-out",
    customer: "Priya Shah",
    stage: 0,
    owner: "Alex Chen",
    due: "Today",
    next: "Discuss the scope",
  },
  {
    id: "tom",
    title: "Site maintenance",
    customer: "Tom Harris",
    stage: 0,
    owner: "Ben Walker",
    due: "No due date",
    next: "Confirm the site details",
  },
  {
    id: "olivia",
    title: "Air conditioning service",
    customer: "Olivia Reed",
    stage: 1,
    owner: "Ben Walker",
    due: "Today",
    next: "Arrange a site visit",
  },
  {
    id: "daniel",
    title: "Equipment installation",
    customer: "Daniel Brooks",
    stage: 2,
    owner: "Alex Chen",
    due: "Tomorrow",
    next: "Discuss the proposal",
  },
  {
    id: "mia",
    title: "Hot water replacement",
    customer: "Mia Thompson",
    stage: 3,
    owner: "Ben Walker",
    due: "Tomorrow",
    next: "Arrange installation time",
  },
  {
    id: "rachel",
    title: "Annual maintenance",
    customer: "Rachel Evans",
    stage: 4,
    owner: "Alex Chen",
    due: "Friday",
    next: "Plan the first visit",
  },
];

export function PipelinePortrait({ cell, small = false }: { cell: number; small?: boolean }) {
  return (
    <span
      className={"pf-portrait" + (small ? " pf-portrait-small" : "")}
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: ((cell % 6) / 5) * 100 + "% " + (Math.floor(cell / 6) / 3) * 100 + "%",
      }}
    />
  );
}

function OwnerLabel({ name }: { name: Owner }) {
  return (
    <span className="pf-card-owner">
      <PipelinePortrait cell={name === "Ben Walker" ? 13 : 8} small />
      <span>{name}</span>
    </span>
  );
}

function OpportunityCard({ item, animate = false }: { item: Opportunity; animate?: boolean }) {
  const reducedMotion = useReducedMotion();
  const content = (
    <>
      <h3>{item.title}</h3>
      <p className="pf-card-customer">{item.customer}</p>
      <p className="pf-card-next">{item.next}</p>
      <footer>
        <OwnerLabel name={item.owner} />
        <span className="pf-card-due">{item.due === "No due date" ? "No date" : item.due}</span>
      </footer>
    </>
  );
  return item.id === "mia" && animate ? (
    <motion.article
      layoutId={reducedMotion ? undefined : "pipeline-mia-opportunity"}
      className="pf-job-card pf-job-card-mia"
      transition={{ layout: { duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] } }}
      aria-label={item.title + " for " + item.customer}
    >
      {content}
    </motion.article>
  ) : (
    <article className={"pf-job-card" + (item.id === "mia" ? " pf-job-card-mia" : "")}>
      {content}
    </article>
  );
}

export function PipelineBoard() {
  const [view, setView] = useState<PipelineView>("board");
  const [owner, setOwner] = useState("everyone");
  const [moved, setMoved] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const boardScroller = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => setEnhanced(true), []);

  const records = OPPORTUNITIES.map((item) =>
    item.id === "mia" ? { ...item, stage: moved ? 4 : 3 } : item,
  ).filter((item) => owner === "everyone" || item.owner === owner);

  function moveOpportunity() {
    const nextMoved = !moved;
    setMoved(nextMoved);
    // Only the board's horizontal position changes after this explicit action.
    // Native page scrolling, the owner and next-action field are untouched.
    if (view === "board" && boardScroller.current) {
      const scroller = boardScroller.current;
      const lane = scroller.querySelector<HTMLElement>(
        '[data-stage="' + (nextMoved ? 4 : 3) + '"]',
      );
      if (lane && scroller.scrollWidth > scroller.clientWidth) {
        const left =
          lane.getBoundingClientRect().left -
          scroller.getBoundingClientRect().left +
          scroller.scrollLeft;
        scroller.scrollTo({
          left: Math.max(0, left - 12),
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
    }
  }

  const views = [
    { key: "board" as const, label: "Board", Icon: Columns3 },
    { key: "table" as const, label: "Table", Icon: List },
    { key: "timeline" as const, label: "Timeline", Icon: CalendarDays },
  ];

  return (
    <div className="pf-pipeline-stage" id="pipeline-board" data-enhanced={enhanced}>
      <div className="pf-board-toolbar">
        <div className="pf-board-title">
          <img src="/concept/zapla-logo-dark.svg" alt="Zapla" width="82" height="25" />
          <span>Sales pipeline</span>
        </div>
        <div className="pf-board-controls">
          <div className="pf-view-switch" role="group" aria-label="Choose a pipeline view">
            {views.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={view === key}
                aria-controls="pipeline-records"
                onClick={() => setView(key)}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <label className="pf-person-filter">
            <span>Assigned to</span>
            <select
              value={owner}
              onChange={(event) => setOwner(event.target.value)}
              aria-label="Filter opportunities by assigned person"
            >
              <option value="everyone">Everyone</option>
              <option value="Ben Walker">Ben Walker</option>
              <option value="Alex Chen">Alex Chen</option>
            </select>
          </label>
        </div>
      </div>

      <div id="pipeline-records" className="pf-records-surface">
        {view === "board" && (
          <>
            <p className="pf-swipe-note">Scroll across to see every stage.</p>
            <div
              className="pf-board-scroll"
              ref={boardScroller}
              tabIndex={0}
              role="region"
              aria-label="Sales pipeline stages, scroll horizontally on smaller screens"
            >
              <LayoutGroup id="pipeline-sales-board">
                <div className="pf-kanban">
                  {STAGES.map((stage, index) => (
                    <section
                      className="pf-lane"
                      data-stage={index}
                      key={stage.name}
                      style={{ "--lane-colour": stage.colour } as CSSProperties}
                      aria-label={stage.name}
                    >
                      <h2 className="pf-lane-heading">{stage.name}</h2>
                      <div className="pf-lane-body">
                        {records
                          .filter((item) => item.stage === index)
                          .map((item) => (
                            <OpportunityCard item={item} key={item.id} animate />
                          ))}
                        {!records.some((item) => item.stage === index) && (
                          <p className="pf-lane-empty">
                            {owner === "everyone"
                              ? "No opportunities in this stage."
                              : "No matching opportunities."}
                          </p>
                        )}
                      </div>
                    </section>
                  ))}
                </div>
              </LayoutGroup>
            </div>
          </>
        )}
        {view === "table" && (
          <div className="pf-table-view">
            <table role="table">
              <caption className="pf-sr-only">
                The same opportunities, with stage, responsible person, due date and next action.
              </caption>
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader" id="pipeline-col-opportunity">
                    Opportunity
                  </th>
                  <th scope="col" role="columnheader" id="pipeline-col-stage">
                    Stage
                  </th>
                  <th scope="col" role="columnheader" id="pipeline-col-person">
                    Responsible
                  </th>
                  <th scope="col" role="columnheader" id="pipeline-col-due">
                    Due
                  </th>
                  <th scope="col" role="columnheader" id="pipeline-col-next">
                    Next action
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {records.map((item) => (
                  <tr
                    role="row"
                    key={item.id}
                    className={item.id === "mia" ? "pf-table-mia" : undefined}
                  >
                    <td role="cell" headers="pipeline-col-opportunity" data-label="Opportunity">
                      <strong>{item.title}</strong>
                      <span>{item.customer}</span>
                    </td>
                    <td role="cell" headers="pipeline-col-stage" data-label="Stage">
                      {STAGES[item.stage].name}
                    </td>
                    <td role="cell" headers="pipeline-col-person" data-label="Responsible">
                      <OwnerLabel name={item.owner} />
                    </td>
                    <td role="cell" headers="pipeline-col-due" data-label="Due">
                      {item.due}
                    </td>
                    <td role="cell" headers="pipeline-col-next" data-label="Next action">
                      {item.next}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {view === "timeline" && (
          <>
            <p className="pf-swipe-note">Scroll across to see each due date.</p>
            <div
              className="pf-board-scroll"
              tabIndex={0}
              role="region"
              aria-label="Opportunities grouped by due date"
            >
              <div className="pf-date-lanes">
                {["No due date", "Today", "Tomorrow", "Friday"].map((day) => (
                  <section className="pf-date-lane" key={day} aria-label={day}>
                    <h2 className="pf-date-heading">{day}</h2>
                    <div className="pf-lane-body">
                      {records
                        .filter((item) => item.due === day)
                        .map((item) => (
                          <OpportunityCard item={item} key={item.id} />
                        ))}
                      {!records.some((item) => item.due === day) && (
                        <p className="pf-lane-empty">No matching opportunities.</p>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="pf-board-decision">
        {owner !== "Alex Chen" ? (
          <>
            <div className="pf-decision-copy">
              <PipelinePortrait cell={9} />
              <div>
                <strong>
                  {moved ? "Mia’s opportunity is now Closed won." : "Mia has accepted her quote."}
                </strong>
                <p>
                  {moved
                    ? "Ben stays responsible. The recorded next action is still to arrange installation."
                    : "“I’d like to go ahead.” Ben can now record that decision in the pipeline."}
                </p>
              </div>
            </div>
            <button className="pf-move-button" type="button" onClick={moveOpportunity}>
              {moved ? "Return to Negotiation" : "Move to Closed won"}
            </button>
          </>
        ) : (
          <div className="pf-decision-copy">
            <PipelinePortrait cell={8} />
            <div>
              <strong>Alex’s opportunities, across the same stages.</strong>
              <p>
                The filter changes which records you see. It does not change who is responsible.
              </p>
            </div>
          </div>
        )}
        <p className="pf-static-board-note">
          When a customer agrees to proceed, your team moves the opportunity to the appropriate
          stage. The person responsible and recorded next action stay with it.
        </p>
      </div>
      <p className="pf-sr-only" role="status" aria-live="polite" aria-atomic="true">
        {owner === "Alex Chen"
          ? "Showing Alex Chen’s opportunities across the same stages. Responsibility has not changed."
          : (owner === "everyone" ? "All team members. " : "Showing Ben Walker’s opportunities. ") +
            (moved ? "Mia is in Closed won. " : "Mia is in Negotiation. ") +
            "Ben remains responsible. Next action: arrange installation time."}
      </p>
    </div>
  );
}
