import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import "@/styles/quote-follow-scene.css";

const phase = (progress: number, from: number, to: number) =>
  Math.max(0, Math.min(1, (progress - from) / (to - from)));
const between = (progress: number, from: number, to: number, a: number, b: number) =>
  a + (b - a) * phase(progress, from, to);

// A prepared, cumulative customer story. Alex's reply and recorded next step
// are deliberate staff actions. No automatic pause, acceptance or win is shown.
export function QuoteFollowThroughScene() {
  const section = useRef<HTMLElement>(null);
  const frontContent = useRef<HTMLDivElement>(null);
  const sms = useRef<HTMLDivElement>(null);
  const customer = useRef<HTMLDivElement>(null);
  const team = useRef<HTMLDivElement>(null);
  const [panelHeights, setPanelHeights] = useState<{
    sms: number;
    customer: number;
    team: number;
    full: number;
  } | null>(null);
  const reduced = useReducedMotion();
  const [largeViewport, setLargeViewport] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1100px) and (min-height: 780px)");
    const update = () => setLargeViewport(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const content = frontContent.current;
    if (!content) return;
    let disposed = false;
    const measure = () => {
      if (disposed || !sms.current || !customer.current || !team.current) return;
      // The positioned content wrapper is every message's offset parent. These
      // natural measurements exclude reveal transforms and the clipped shell.
      const bottom = (node: HTMLElement) => node.offsetTop + node.offsetHeight;
      const full = content.offsetHeight + 2;
      const next = {
        sms: Math.min(full, bottom(sms.current) + 18),
        customer: Math.min(full, bottom(customer.current) + 18),
        team: Math.min(full, bottom(team.current) + 18),
        full,
      };
      setPanelHeights((previous) =>
        previous &&
        Object.keys(next).every(
          (key) => previous[key as keyof typeof next] === next[key as keyof typeof next],
        )
          ? previous
          : next,
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    void document.fonts.ready.then(measure);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, []);
  const animate = largeViewport && reduced === false && panelHeights !== null;
  useEffect(() => {
    if (!animate || !section.current) return;
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      const node = section.current;
      if (disposed || !node) return;
      const travel = Math.max(1, node.offsetHeight - window.innerHeight);
      const next = Math.max(0, Math.min(1, -node.getBoundingClientRect().top / travel));
      setProgress((previous) => (Math.abs(previous - next) < 0.001 ? previous : next));
    };
    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(section.current);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [animate]);
  // Numeric DOM styles deliberately avoid native ScrollTimeline/WAAPI promotion:
  // the section changes geometry after hydration and must use its current bounds.
  const frontOpacity = phase(progress, 0.12, 0.24);
  const frontY = between(progress, 0.12, 0.36, 32, 0);
  const customerOpacity = phase(progress, 0.36, 0.49);
  const customerY = between(progress, 0.36, 0.49, 12, 0);
  const teamOpacity = phase(progress, 0.61, 0.75);
  const teamY = between(progress, 0.61, 0.75, 12, 0);
  const noteOpacity = phase(progress, 0.75, 0.85);
  const quoteY = between(progress, 0.18, 0.5, 0, -6);
  const heights = panelHeights ?? { sms: 180, customer: 260, team: 350, full: 420 };
  const frontHeight =
    progress < 0.49
      ? between(progress, 0.35, 0.49, heights.sms, heights.customer)
      : progress < 0.75
        ? between(progress, 0.6, 0.75, heights.customer, heights.team)
        : between(progress, 0.75, 0.85, heights.team, heights.full);
  return (
    <section
      ref={section}
      className={`qfm-section${animate ? " qfm-is-animated" : ""}`}
      id="quote-follow-through"
      aria-labelledby="qfm-title"
    >
      <div className="qfm-sticky">
        <header className="qfm-heading">
          <h2 id="qfm-title">From quote sent to a conversation.</h2>
          <p>
            A timely check-in gives your customer a way to ask. Your team picks up the conversation.
          </p>
        </header>
        <div className="qfm-canvas">
          <figure className="qfm-photo">
            <img
              src="/concept/quote-follow-up/event-team-20261028.webp"
              width="1536"
              height="1024"
              loading="lazy"
              alt="An event team focused on preparing a venue for a client event"
            />
          </figure>
          <div className="qfm-panels">
            <article
              className="qfm-quote"
              style={animate ? { transform: `translateY(${quoteY}px)` } : undefined}
              aria-label="Emma Wilson's sent project proposal"
            >
              <span className="qfm-quote-state">Quote sent</span>
              <h3>Project proposal</h3>
              <p>Prepared for Emma Wilson</p>
              <p className="qfm-scope">Full scope · Two stages</p>
            </article>
            <article
              className="qfm-front"
              style={
                animate
                  ? {
                      opacity: frontOpacity,
                      transform: `translateY(${frontY}px)`,
                      height: frontHeight,
                    }
                  : undefined
              }
              aria-label="Emma's follow-up conversation and Alex's next step"
            >
              <div className="qfm-content" ref={frontContent}>
                <header className="qfm-inbox-heading">
                  <img src="/concept/zapla-logo-dark.svg" width="78" height="25" alt="Zapla" />
                  <span>Emma Wilson · SMS</span>
                </header>
                <div className="qfm-thread">
                  <div className="qfm-outbound" ref={sms}>
                    <div className="qfm-sender">
                      <ZaplaPetal size={19} />
                      <span>Two days later</span>
                    </div>
                    <p>
                      Hi Emma, any questions about the quote? Happy to talk through the options.
                    </p>
                  </div>
                  <div
                    className="qfm-customer"
                    ref={customer}
                    style={
                      animate
                        ? { opacity: customerOpacity, transform: `translateY(${customerY}px)` }
                        : undefined
                    }
                  >
                    <span className="qfm-sr-only">Emma: </span>
                    <p>Could you quote the first stage on its own?</p>
                  </div>
                  <div
                    className="qfm-team"
                    ref={team}
                    style={
                      animate
                        ? { opacity: teamOpacity, transform: `translateY(${teamY}px)` }
                        : undefined
                    }
                  >
                    <span className="qfm-team-label">Alex · Your team</span>
                    <p>I’ll review the scope and send you the options.</p>
                  </div>
                </div>
                <div className="qfm-note" style={animate ? { opacity: noteOpacity } : undefined}>
                  <span>Alex’s next step</span>
                  <p>Prepare a staged quote</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
