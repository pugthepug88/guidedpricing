import { useEffect, useRef, useState } from "react";
import { Clock3, Mail, RotateCcw } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";

const REQUEST =
  "Welcome new form enquiries by email. Send useful information after 2 days, then a booking invitation 3 days later.";

const draftSteps = [
  { kind: "trigger", title: "New enquiry form submitted", detail: "Start the workflow" },
  { kind: "email", title: "Send a welcome email", detail: "Thanks for getting in touch." },
  { kind: "wait", title: "Wait 2 days" },
  {
    kind: "email",
    title: "Send useful information",
    detail: "What’s included and common questions.",
  },
  { kind: "wait", title: "Wait 3 days" },
  { kind: "email", title: "Send a booking invitation", detail: "Share your booking link." },
] as const;

type BuildState = {
  phase: "static" | "waiting" | "typing" | "building" | "complete";
  characters: number;
  steps: number;
};

const finished: BuildState = {
  phase: "static",
  characters: REQUEST.length,
  steps: draftSteps.length,
};

/** A prepared illustration of AI construction, never a live AI or send action.
 * The server-rendered and reduced-motion versions contain the complete draft.
 * Play once on entry, pause offscreen, and retain progress until explicit replay.
 */
function useDraftAssembly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [build, setBuild] = useState<BuildState>(finished);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const request = root?.querySelector<HTMLElement>(".ab-ai-prompt");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !request || preference.matches || typeof IntersectionObserver === "undefined")
      return;

    let timer = 0;
    let characters = 0;
    let steps = 0;
    let started = false;
    let visible = false;
    let complete = false;

    const advance = () => {
      if (!visible || complete) return;
      if (characters < REQUEST.length) {
        characters += 1;
        setBuild({ phase: "typing", characters, steps: 0 });
        timer = window.setTimeout(
          advance,
          characters === REQUEST.length ? 450 : REQUEST[characters - 1] === " " ? 45 : 22,
        );
      } else if (steps < draftSteps.length) {
        steps += 1;
        setBuild({ phase: "building", characters, steps });
        timer = window.setTimeout(advance, 420);
      } else {
        complete = true;
        setBuild({ phase: "complete", characters, steps });
      }
    };

    const beginWhenReadable = () => {
      if (!visible || started || complete) return;
      const bounds = request.getBoundingClientRect();
      const readableHeight = Math.max(
        0,
        Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 70),
      );
      if (bounds.bottom < 70) {
        // A fast scroll past the request must never leave an empty draft.
        complete = true;
        setBuild({ ...finished, phase: "complete" });
      } else if (readableHeight >= bounds.height * 0.9) {
        started = true;
        window.clearTimeout(timer);
        timer = window.setTimeout(advance, 180);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        window.clearTimeout(timer);
        if (visible && started && !complete) {
          timer = window.setTimeout(advance, 180);
        } else if (!started && !complete) {
          setBuild({ phase: "waiting", characters: 0, steps: 0 });
          beginWhenReadable();
        }
      },
      { threshold: 0 },
    );

    const respectPreference = () => {
      if (preference.matches) {
        complete = true;
        window.clearTimeout(timer);
        setBuild(finished);
      }
    };

    observer.observe(root);
    window.addEventListener("scroll", beginWhenReadable, { passive: true });
    window.addEventListener("resize", beginWhenReadable);
    preference.addEventListener("change", respectPreference);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("scroll", beginWhenReadable);
      window.removeEventListener("resize", beginWhenReadable);
      preference.removeEventListener("change", respectPreference);
    };
  }, [version]);

  return { rootRef, build, replay: () => setVersion((current) => current + 1) };
}

export function AutomationAiDemo() {
  const { rootRef, build, replay } = useDraftAssembly();
  const staticView = build.phase === "static";
  const draftVisible = staticView || build.steps > 0;

  return (
    <section className="ab-ai-section" aria-labelledby="ab-ai-heading" id="ai-flow-builder">
      <div className="ab-wrap">
        <div className="ab-ai-demo" ref={rootRef} data-phase={build.phase}>
          <div className="ab-ai-copy">
            <p className="ab-eyebrow">AI Flow Builder</p>
            <h2 id="ab-ai-heading">Ask AI to build your workflow.</h2>
            <p>Describe the process. Zapla connects the steps for you to review.</p>
          </div>

          <figure className="ab-ai-prompt">
            <figcaption>Your request</figcaption>
            <blockquote>
              <span className="ab-ai-sr-only">{REQUEST}</span>
              <span aria-hidden="true">
                {REQUEST.slice(0, build.characters)}
                {build.phase === "typing" || build.phase === "waiting" ? (
                  <span className="ab-ai-cursor" />
                ) : null}
              </span>
            </blockquote>
          </figure>

          <figure className="ab-ai-workflow" aria-label="AI-generated workflow draft">
            <figcaption data-visible={draftVisible}>
              <ZaplaPetal size={25} />
              <span>Workflow draft</span>
            </figcaption>
            <ol>
              {draftSteps.map((step, index) => (
                <li
                  key={step.title}
                  className={"ab-ai-step ab-ai-step-" + step.kind}
                  data-visible={staticView || build.steps > index}
                >
                  {index > 0 ? <span className="ab-ai-connection" aria-hidden="true" /> : null}
                  <div className="ab-ai-node">
                    {step.kind === "email" ? <Mail size={16} aria-hidden="true" /> : null}
                    {step.kind === "wait" ? <Clock3 size={14} aria-hidden="true" /> : null}
                    <div>
                      <strong>{step.title}</strong>
                      {"detail" in step ? <p>{step.detail}</p> : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </figure>

          <div className="ab-ai-review">
            <p>Review the messages, timing and connections before activation.</p>
            {!staticView ? (
              <button type="button" onClick={replay}>
                <RotateCcw size={14} aria-hidden="true" />
                Replay build
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
