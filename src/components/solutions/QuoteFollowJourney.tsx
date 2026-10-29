import { useEffect, useRef, useState } from "react";
import { QuoteDominoTrail } from "./QuoteDominoTrail";
import "@/styles/quote-follow-journey.css";

type Channel = "SMS" | "Email";
type WaitDays = 1 | 2 | 5;

/** Crop the existing brand artwork's icon, preserving its exact native paths. */
export function ZaplaJourneyMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <image href="/concept/zapla-logo-dark.svg" width="1743" height="512" />
    </svg>
  );
}

export const QUOTE_FOLLOW_SMS =
  "Hi Emma, a quick check-in on quote Q-1042. Any questions about the brand identity or website stage? Reply here and Alex can help.";
const EMAIL_MESSAGE =
  "Hi Emma, your proposal Q-1042 covers brand identity and a website launch. If you’d like to talk through either stage or start with the brand identity, reply here and we’ll help.";

function JourneyPortrait({ cell }: { cell: number }) {
  return (
    <span
      className="qfj-portrait"
      aria-hidden="true"
      style={{
        backgroundImage: "url('/concept/revenue/soft-autumn-portraits-v1.webp')",
        backgroundSize: "600% 400%",
        backgroundPosition: `${((cell % 6) / 5) * 100}% ${(Math.floor(cell / 6) / 3) * 100}%`,
      }}
    />
  );
}

/**
 * Prepared configuration and customer dialogue, not a live workflow execution.
 * Quote Sent, waits and channel actions are supported building blocks. Alex's
 * reply and customer note are deliberate staff work; no reply-stop is implied.
 */
export function QuoteFollowJourney({
  endAtSceneBottom = false,
}: { endAtSceneBottom?: boolean } = {}) {
  const [channel, setChannel] = useState<Channel>("SMS");
  const [waitDays, setWaitDays] = useState<WaitDays>(2);
  const flowRef = useRef<HTMLDivElement>(null);
  const [course, setCourse] = useState({ top: 0, height: 1, progress: 0 });

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    const checkpoints = Array.from(flow.querySelectorAll<HTMLElement>(".qfj-checkpoint"));
    const media = window.matchMedia(
      "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let disposed = false;
    let first = 0;
    let last = 1;
    let positions: number[] = [];

    const update = () => {
      frame = 0;
      if (disposed || !media.matches) return;
      const top = flow.getBoundingClientRect().top;
      const position = Math.max(first, Math.min(last, window.innerHeight * 0.43 - top));
      const height = Math.max(1, last - first);
      const progress = (position - first) / height;
      setCourse((previous) =>
        previous.top === first && previous.height === height && previous.progress === progress
          ? previous
          : { top: first, height, progress },
      );
    };
    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(update);
    };
    const measure = () => {
      if (disposed) return;
      flow.dataset.motion = String(media.matches);
      if (!media.matches) {
        return;
      }
      const top = flow.getBoundingClientRect().top;
      positions = checkpoints.map((node) => {
        const bounds = node.getBoundingClientRect();
        return bounds.top - top + bounds.height / 2;
      });
      first = positions[0] ?? 0;
      last = positions.at(-1) ?? first + 1;
      if (endAtSceneBottom) {
        const reply = flow.querySelector<HTMLElement>("#qfj-reply");
        if (reply) last = reply.getBoundingClientRect().bottom - top - 35;
      }
      flow.dataset.routeReady = "true";
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(flow);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    media.addEventListener("change", measure);
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      window.cancelAnimationFrame(frame);
    };
  }, [endAtSceneBottom]);

  const message = channel === "SMS" ? QUOTE_FOLLOW_SMS : EMAIL_MESSAGE;
  const days = `${waitDays} ${waitDays === 1 ? "day" : "days"}`;

  return (
    <section className="qfj" id="quote-follow-through" aria-label="Follow a quote through Zapla">
      <div className="qfj-flow" ref={flowRef}>
        <div className="qfj-dominoes" style={{ top: course.top }} aria-hidden="true">
          <QuoteDominoTrail variant="journey" height={course.height} progress={course.progress} />
        </div>

        <article className="qfj-chapter" id="qfj-start" aria-labelledby="qfj-start-title">
          <header className="qfj-copy">
            <p className="qfj-label">
              <span className="qfj-checkpoint" aria-hidden="true" />
              Start with the quote
            </p>
            <h2 id="qfj-start-title">Give every quote a next step.</h2>
            <p>
              When you send a quote in Zapla, it can start the follow-up you’ve agreed. The
              customer, quote and message stay connected.
            </p>
            <p className="qfj-detail">
              You decide which quotes enter the process. Zapla follows the configured steps.
            </p>
            <a className="qfj-text-link" href="/features/quotes-invoices-signatures">
              Explore quoting <span aria-hidden="true">→</span>
            </a>
          </header>
          <div className="qfj-quote-scene" aria-label="Emma's quote starts the configured process">
            <div className="qfj-document">
              <div className="qfj-document-top">
                <span>Quote Q-1042</span>
                <span>Emma Wilson</span>
              </div>
              <h3>Brand &amp; website proposal</h3>
              <p className="qfj-document-intro">A project delivered in two stages.</p>
              <div className="qfj-scope">
                <div>
                  <strong>Brand identity</strong>
                  <span>Stage one</span>
                </div>
                <div>
                  <strong>Website launch</strong>
                  <span>Stage two</span>
                </div>
              </div>
              <div className="qfj-document-foot">
                <span>Quote status</span>
                <strong>Sent</strong>
              </div>
            </div>
            <div className="qfj-start-event">
              <span>Follow-up starts when</span>
              <strong>Quote Sent</strong>
              <p>Q-1042 · Emma Wilson</p>
            </div>
          </div>
        </article>

        <article className="qfj-chapter" id="qfj-message" aria-labelledby="qfj-message-title">
          <header className="qfj-copy">
            <p className="qfj-label">
              <span className="qfj-checkpoint" aria-hidden="true" />
              Follow up with purpose
            </p>
            <h2 id="qfj-message-title">The right words. On your timing.</h2>
            <p>
              A useful check-in keeps the quote in the conversation. Choose SMS or email, agree the
              wait, and give your customer a clear way to reply.
            </p>
            <p className="qfj-detail">
              Explore the channel and timing here. The message below changes with your choice.
            </p>
            <a className="qfj-text-link" href="/features/automation-builder">
              Explore automation <span aria-hidden="true">→</span>
            </a>
          </header>
          <div className="qfj-message-scene">
            <div className="qfj-settings">
              <div className="qfj-setting">
                <span id="qfj-channel-label">Selected channel</span>
                <div className="qfj-options" role="group" aria-labelledby="qfj-channel-label">
                  {(["SMS", "Email"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={channel === item}
                      aria-controls="qfj-message-preview"
                      onClick={() => setChannel(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="qfj-setting">
                <span id="qfj-timing-label">Timing after quote sent</span>
                <div className="qfj-options" role="group" aria-labelledby="qfj-timing-label">
                  {([1, 2, 5] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={waitDays === item}
                      aria-controls="qfj-message-preview"
                      onClick={() => setWaitDays(item)}
                    >
                      {`${item} ${item === 1 ? "day" : "days"}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div
              id="qfj-message-preview"
              className="qfj-message-preview"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="qfj-preview-heading">
                <span>{channel} to Emma Wilson</span>
                <span>{days} later</span>
              </div>
              {channel === "Email" && <h3>Your brand &amp; website proposal · Q-1042</h3>}
              <p>{message}</p>
              {channel === "Email" && <p className="qfj-email-signature">Alex</p>}
            </div>
            <p className="qfj-configured-flow">
              <span>Quote Sent</span>
              <span aria-hidden="true">→</span>
              <span>Wait {days}</span>
              <span aria-hidden="true">→</span>
              <span>Send {channel}</span>
            </p>
          </div>
        </article>

        <article className="qfj-chapter" id="qfj-reply" aria-labelledby="qfj-reply-title">
          <header className="qfj-copy">
            <p className="qfj-label">
              <span className="qfj-checkpoint" aria-hidden="true" />
              Pick up the conversation
            </p>
            <h2 id="qfj-reply-title">A reply your team can work with.</h2>
            <p>
              Read the message and the customer’s question together in Inbox. Your team can answer,
              review the quote and record what needs to happen next.
            </p>
            <p className="qfj-detail">
              Here, Emma asks to start with the brand identity. Alex responds and records the next
              step.
            </p>
            <a className="qfj-text-link" href="/features/unified-inbox">
              Explore Inbox <span aria-hidden="true">→</span>
            </a>
          </header>
          <div
            className="qfj-inbox-scene"
            aria-label="Emma's conversation and Alex's customer note"
          >
            <div className="qfj-inbox-header">
              <strong>Inbox</strong>
              <span>{channel}</span>
            </div>
            <div className="qfj-customer-heading">
              <JourneyPortrait cell={9} />
              <div>
                <h3>Emma Wilson</h3>
                <p>Brand &amp; website proposal · Q-1042</p>
              </div>
            </div>
            <div className="qfj-thread">
              <div className="qfj-thread-outbound">
                <span>Configured follow-up · {days} after quote sent</span>
                <p>{message}</p>
              </div>
              <div className="qfj-thread-customer">
                <span>Emma</span>
                <p>Could we start with the brand identity?</p>
              </div>
              <div className="qfj-thread-team">
                <span>Alex · Your team</span>
                <p>I’ll review the brand-only scope and send you that option.</p>
              </div>
            </div>
            <div className="qfj-customer-note">
              <div className="qfj-note-person">
                <JourneyPortrait cell={13} />
                <span>
                  Customer note
                  <br />
                  <strong>Alex · Your team</strong>
                </span>
              </div>
              <p>
                Emma wants to start with the brand identity. Review the scope before preparing a
                revised quote.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
