import "@/styles/pipeline-routes.css";

const ROUTE = {
  title: "Tuesday’s visits",
  pipeline: "Service visits",
  date: "27 October",
  dateTime: "2026-10-27",
  driver: "Alex Chen",
  stops: [
    { job: "Site assessment", area: "Parramatta", position: "Start" },
    { job: "Equipment setup", area: "Rhodes", position: "Stop" },
    { job: "Service visit", area: "Inner West", position: "Stop" },
    { job: "Maintenance check", area: "Sydney", position: "Finish" },
  ],
} as const;

function RouteDetails() {
  return (
    <dl className="pr-route-facts">
      <div>
        <dt>Route date</dt>
        <dd>
          <time dateTime={ROUTE.dateTime}>{ROUTE.date}</time>
        </dd>
      </div>
      <div>
        <dt>Driver</dt>
        <dd>
          <span className="pr-driver-portrait" aria-hidden="true" />
          {ROUTE.driver}
        </dd>
      </div>
    </dl>
  );
}

function PipelineSource() {
  return (
    <p className="pr-pipeline-source">
      From the <strong>{ROUTE.pipeline}</strong> pipeline.
    </p>
  );
}

function RouteStops() {
  return (
    <ol className="pr-stop-list" aria-label="Selected pipeline jobs in route order">
      {ROUTE.stops.map(({ job, area, position }) => (
        <li key={area}>
          <div className="pr-stop-job">
            <strong>{job}</strong>
            <span>{area}</span>
          </div>
          <span className="pr-stop-position">{position}</span>
        </li>
      ))}
    </ol>
  );
}

/**
 * One fixed, illustrative route, shown in planning and phone contexts.
 * The source screenshot is unchanged; CSS exposes only its map rectangle.
 * Native disclosure keeps both views available without JavaScript, timers,
 * external map requests, simulated optimisation or forced scrolling.
 */
export function PipelineRoutes() {
  return (
    <section className="pr-routes" id="pipeline-routes" aria-labelledby="pipeline-routes-heading">
      <div className="pf-wrap">
        <div className="pr-panel">
          <header className="pr-intro">
            <div>
              <p className="pf-eyebrow">Route planning</p>
              <h2 id="pipeline-routes-heading">
                Plan the visits.
                <br />
                Take the route with you.
              </h2>
            </div>
            <p className="pr-intro-copy">
              Choose jobs from your pipeline, optimise the stop order and save the route for a
              driver and date. Open the day’s route on your phone for directions in Google Maps.
            </p>
          </header>

          <div className="pr-route-layout">
            <figure className="pr-map-figure">
              <div className="pr-map-crop">
                <img
                  className="pr-map-source"
                  src="/concept/pipeline/routes-product-source.svg"
                  alt="A route in Zapla from Parramatta to Sydney, with stops around Rhodes and the Inner West."
                  width="1060"
                  height="1173"
                  loading="lazy"
                />
              </div>
              <figcaption className="pr-map-caption">
                <span>Illustrative route</span>
                <span>© Mapbox · © OpenStreetMap</span>
              </figcaption>
            </figure>

            <div className="pr-route-side">
              <details className="pr-phone-disclosure">
                <summary aria-controls="pipeline-route-phone">
                  <span className="pr-show-phone">See the phone view</span>
                  <span className="pr-show-planning">Back to route planning</span>
                </summary>
                <div className="pr-phone" id="pipeline-route-phone">
                  <h3>{ROUTE.title}</h3>
                  <PipelineSource />
                  <RouteDetails />
                  <RouteStops />
                  <div className="pr-maps-handoff">
                    <strong>Directions in Google Maps</strong>
                    <p>The same stops, on your phone.</p>
                  </div>
                </div>
              </details>

              <div className="pr-planning-view">
                <p className="pr-surface-label">Selected pipeline jobs</p>
                <h3>{ROUTE.title}</h3>
                <PipelineSource />
                <RouteDetails />
                <RouteStops />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
