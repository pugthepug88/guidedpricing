import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { Columns3, List, CalendarDays } from "lucide-react";

const STAGES = [
  { name: "New enquiry" },
  { name: "Discussing needs" },
  { name: "Preparing quote" },
  { name: "Quote sent" },
  { name: "Accepted" },
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
    next: "Discuss the fit-out scope",
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
    next: "Finish the installation quote",
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
    next: "Arrange the first service",
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
  return animate ? (
    <motion.article
      layout="position"
      layoutId={item.id === "mia" ? "pipeline-mia-opportunity" : undefined}
      className={"pf-job-card" + (item.id === "mia" ? " pf-job-card-mia" : "")}
      transition={{ layout: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      aria-label={item.title + " for " + item.customer}
      data-opportunity={item.id}
    >
      {content}
    </motion.article>
  ) : (
    <article
      className={"pf-job-card" + (item.id === "mia" ? " pf-job-card-mia" : "")}
      aria-label={item.title + " for " + item.customer}
      data-opportunity={item.id}
    >
      {content}
    </article>
  );
}

function StageColumns({
  records,
  animate = false,
  filtered = false,
}: {
  records: Opportunity[];
  animate?: boolean;
  filtered?: boolean;
}) {
  return (
    <div className="pf-kanban">
      {STAGES.map((stage, index) => (
        <section className="pf-lane" data-stage={index} key={stage.name} aria-label={stage.name}>
          <h2 className="pf-lane-heading">{stage.name}</h2>
          <div className="pf-lane-body">
            {records
              .filter((item) => item.stage === index)
              .map((item) => (
                <OpportunityCard item={item} key={item.id} animate={animate} />
              ))}
            {!records.some((item) => item.stage === index) && (
              <p className="pf-lane-empty">
                {filtered ? "No matching opportunities." : "No opportunities in this stage."}
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

function ProgressStory({ moved, owner }: { moved: boolean; owner: string }) {
  return owner === "Alex Chen" ? (
    <div className="pf-story-person">
      <PipelinePortrait cell={8} />
      <div>
        <strong>Alex’s work, across the same stages.</strong>
        <p>Each opportunity keeps its stage and recorded next action.</p>
      </div>
    </div>
  ) : (
    <>
      <div className="pf-story-person">
        <PipelinePortrait cell={9} />
        <div>
          <strong>“I’d like to go ahead.”</strong>
          <p>Mia accepts her quote.</p>
        </div>
      </div>
      <div className="pf-story-person pf-story-update">
        <PipelinePortrait cell={13} />
        <div>
          <strong>{moved ? "Ben has moved Mia to Accepted." : "Ben records the decision."}</strong>
          <p>{moved ? "Next: arrange installation time." : "Quote sent → Accepted"}</p>
        </div>
      </div>
    </>
  );
}

export function PipelineBoard() {
  const [view, setView] = useState<PipelineView>("board");
  const [owner, setOwner] = useState("everyone");
  const [moved, setMoved] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [demoVisible, setDemoVisible] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Narrow/short screens and reduced motion get the complete result immediately.
    // No autoplay changes the board's or page's scroll position.
    const media = window.matchMedia(
      "(min-width: 1211px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
    );
    const syncPresentation = () => {
      setMotionEnabled(media.matches);
      if (!media.matches) setMoved(true);
    };
    syncPresentation();
    setEnhanced(true);
    media.addEventListener("change", syncPresentation);
    return () => media.removeEventListener("change", syncPresentation);
  }, []);

  useEffect(() => {
    if (!enhanced || !motionEnabled || moved || interacted) return;
    const card = scene.current?.querySelector('[data-opportunity="mia"]');
    const explanation = story.current;
    if (!card || !explanation) return;
    let cardVisible = false;
    let storyVisible = false;
    const syncVisibility = () => setDemoVisible(cardVisible && storyVisible && !document.hidden);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === card) cardVisible = entry.intersectionRatio >= 0.6;
          if (entry.target === explanation) storyVisible = entry.intersectionRatio >= 0.6;
        }
        syncVisibility();
      },
      { threshold: [0, 0.6, 1], rootMargin: "-64px 0px 0px" },
    );
    observer.observe(card);
    observer.observe(explanation);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [enhanced, motionEnabled, moved, interacted]);

  useEffect(() => {
    if (!demoVisible || !motionEnabled || moved || interacted) return;
    // One readable hold, one stage change, then retain the outcome. No loop/reset.
    const timer = window.setTimeout(() => setMoved(true), 2600);
    return () => window.clearTimeout(timer);
  }, [demoVisible, motionEnabled, moved, interacted]);

  const records = OPPORTUNITIES.map((item) =>
    item.id === "mia" ? { ...item, stage: moved ? 4 : 3 } : item,
  ).filter((item) => owner === "everyone" || item.owner === owner);

  function finishDemonstration() {
    setInteracted(true);
    setMoved(true);
  }

  const views = [
    { key: "board" as const, label: "Board", Icon: Columns3 },
    { key: "table" as const, label: "Table", Icon: List },
    { key: "timeline" as const, label: "Timeline", Icon: CalendarDays },
  ];

  return (
    <div
      className="pf-pipeline-stage"
      id="pipeline-board"
      ref={scene}
      data-enhanced={enhanced}
      data-demo-state={moved ? "complete" : demoVisible ? "playing" : "ready"}
    >
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
                onClick={() => {
                  finishDemonstration();
                  setView(key);
                }}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <div className="pf-person-filter" role="group" aria-label="Show work for">
            <span>Show work for</span>
            <div className="pf-person-options">
              {[
                { value: "everyone", label: "Everyone", cell: null },
                { value: "Ben Walker", label: "Ben", cell: 13 },
                { value: "Alex Chen", label: "Alex", cell: 8 },
              ].map((person) => (
                <button
                  type="button"
                  key={person.value}
                  aria-label={
                    person.value === "everyone"
                      ? "Show everyone’s work"
                      : "Show " + person.value + "’s work"
                  }
                  aria-pressed={owner === person.value}
                  aria-controls="pipeline-records"
                  onClick={() => {
                    finishDemonstration();
                    setOwner(person.value);
                  }}
                >
                  {person.cell !== null && <PipelinePortrait cell={person.cell} />}
                  <span>{person.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="pipeline-records" className="pf-records-surface">
        {view === "board" && (
          <>
            <p className="pf-swipe-note">Scroll across to see every stage.</p>
            <div
              className="pf-board-scroll"
              tabIndex={0}
              role="region"
              aria-label="Sales pipeline stages, scroll horizontally on smaller screens"
            >
              <LayoutGroup id="pipeline-sales-board">
                <StageColumns
                  records={records}
                  animate={motionEnabled && !interacted}
                  filtered={owner !== "everyone"}
                />
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

      <div className="pf-board-story" ref={story}>
        <ProgressStory moved={moved} owner={owner} />
      </div>
      <noscript>
        <style>{`
          .zapla-pipeline .pf-records-surface,
          .zapla-pipeline .pf-board-story:not(.pf-board-story-static),
          .zapla-pipeline .pf-board-announcement { display: none !important; }
        `}</style>
        <p className="pf-swipe-note">Scroll across to see every stage.</p>
        <div
          className="pf-board-scroll"
          tabIndex={0}
          role="region"
          aria-label="Sales pipeline stages, scroll horizontally on smaller screens"
        >
          <StageColumns
            records={OPPORTUNITIES.map((item) =>
              item.id === "mia" ? { ...item, stage: 4 } : item,
            )}
          />
        </div>
        <div className="pf-board-story pf-board-story-static">
          <ProgressStory moved owner="everyone" />
        </div>
      </noscript>
      <p
        className="pf-sr-only pf-board-announcement"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {owner === "Alex Chen"
          ? "Showing Alex Chen’s opportunities across the same stages. Responsibility has not changed."
          : (owner === "everyone" ? "All team members. " : "Showing Ben Walker’s opportunities. ") +
            (moved
              ? "Ben has moved Mia from Quote sent to Accepted. "
              : "Mia has accepted her quote. Ben can record her decision. ") +
            "Ben remains responsible. Next action: arrange installation time."}
      </p>
    </div>
  );
}
