import { useEffect, useRef, useState } from "react";
import { Clock3, Mail, MessageSquare, PhoneOutgoing, Play, Slack } from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import {
  automationAiExamples,
  type AutomationExample,
  type AutomationStep,
} from "./automationAiExamples";

type BuildState = {
  phase: "ready" | "waiting" | "typing" | "building" | "complete";
  characters: number;
  steps: number;
};

function fullDraft(example: AutomationExample, phase: "ready" | "complete"): BuildState {
  return { phase, characters: example.request.length, steps: example.steps.length };
}

/** Prepared local demonstrations. Only an explicit Watch/example click starts
 * motion. No AI, phone, invoice, email or other live service is invoked.
 */
function useDraftAssembly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState(0);
  const [build, setBuild] = useState<BuildState>(() => fullDraft(automationAiExamples[0], "ready"));
  const [version, setVersion] = useState(0);
  const example = automationAiExamples[selected];

  useEffect(() => {
    if (version === 0) return;
    const root = rootRef.current;
    const request = root?.querySelector<HTMLElement>(".ab-ai-prompt");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !request || preference.matches || typeof IntersectionObserver === "undefined")
      return;

    let timer = 0;
    let started = false;
    let visible = false;
    let complete = false;
    let disposed = false;
    let elapsed = 0;
    let stamp: number | null = null;
    const typingEnd = 180 + example.request.length * 20 + 400;
    const buildEnd = typingEnd + example.steps.length * 350;

    const tick = () => {
      if (disposed || !visible || complete || document.hidden) return;
      const now = performance.now();
      if (stamp !== null) elapsed += now - stamp;
      stamp = now;
      if (elapsed >= buildEnd) {
        complete = true;
        setBuild(fullDraft(example, "complete"));
        return;
      }
      const nextState: BuildState =
        elapsed < typingEnd
          ? {
              phase: "typing",
              characters: Math.min(
                example.request.length,
                Math.max(0, Math.floor((elapsed - 180) / 20)),
              ),
              steps: 0,
            }
          : {
              phase: "building",
              characters: example.request.length,
              steps: Math.min(example.steps.length, Math.floor((elapsed - typingEnd) / 350) + 1),
            };
      setBuild((current) =>
        current.phase === nextState.phase &&
        current.characters === nextState.characters &&
        current.steps === nextState.steps
          ? current
          : nextState,
      );
      timer = window.setTimeout(tick, 25);
    };

    const beginWhenReadable = () => {
      if (disposed || !visible || started || complete || document.hidden) return;
      const bounds = request.getBoundingClientRect();
      const readableHeight = Math.max(
        0,
        Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 70),
      );
      if (bounds.bottom < 70) {
        complete = true;
        setBuild(fullDraft(example, "complete"));
      } else if (readableHeight >= bounds.height * 0.9) {
        started = true;
        window.clearTimeout(timer);
        stamp = performance.now();
        timer = window.setTimeout(tick, 25);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (disposed) return;
        visible = entry.isIntersecting;
        window.clearTimeout(timer);
        stamp = null;
        if (visible && started && !complete && !document.hidden) {
          stamp = performance.now();
          timer = window.setTimeout(tick, 25);
        } else if (!started && !complete) {
          beginWhenReadable();
        }
      },
      { threshold: 0 },
    );

    const respectVisibility = () => {
      window.clearTimeout(timer);
      stamp = null;
      if (!document.hidden && visible && started && !complete) {
        stamp = performance.now();
        timer = window.setTimeout(tick, 25);
      } else if (!document.hidden) {
        beginWhenReadable();
      }
    };

    const respectPreference = () => {
      if (!disposed && preference.matches) {
        complete = true;
        window.clearTimeout(timer);
        setBuild(fullDraft(example, "complete"));
      }
    };

    observer.observe(root);
    document.addEventListener("visibilitychange", respectVisibility);
    window.addEventListener("scroll", beginWhenReadable, { passive: true });
    window.addEventListener("resize", beginWhenReadable);
    preference.addEventListener("change", respectPreference);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", respectVisibility);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", beginWhenReadable);
      window.removeEventListener("resize", beginWhenReadable);
      preference.removeEventListener("change", respectPreference);
    };
  }, [example, version]);

  const play = (index = selected) => {
    const next = automationAiExamples[index];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSelected(index);
    setBuild(
      reduce || typeof IntersectionObserver === "undefined"
        ? fullDraft(next, "complete")
        : { phase: "waiting", characters: 0, steps: 0 },
    );
    setVersion((current) => current + 1);
    // Navigation follows the visitor's explicit Watch action, never a timer.
    rootRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.requestAnimationFrame(() => watchRef.current?.focus({ preventScroll: true }));
  };

  return { rootRef, watchRef, build, example, selected, play };
}

function StepIcon({ kind }: { kind: AutomationStep["kind"] }) {
  if (kind === "email") return <Mail size={16} aria-hidden="true" />;
  if (kind === "sms") return <MessageSquare size={16} aria-hidden="true" />;
  if (kind === "call") return <PhoneOutgoing size={16} aria-hidden="true" />;
  if (kind === "slack") return <Slack size={16} aria-hidden="true" />;
  if (kind === "wait") return <Clock3 size={14} aria-hidden="true" />;
  return null;
}

export function AutomationAiDemo() {
  const { rootRef, watchRef, build, example, selected, play } = useDraftAssembly();
  const allVisible = build.phase === "ready" || build.phase === "complete";
  const draftVisible = allVisible || build.steps > 0;

  return (
    <section className="ab-ai-section" aria-labelledby="ab-ai-heading" id="ai-flow-builder">
      <div className="ab-wrap">
        <header className="ab-ai-heading">
          <div>
            <p className="ab-eyebrow">AI Flow Builder</p>
            <h2 id="ab-ai-heading">Build the workflow your business needs.</h2>
          </div>
          <p>
            Choose an idea to watch Zapla AI build it. These are starting points. Describe your own
            process inside Zapla.
          </p>
        </header>

        <div
          className="ab-ai-choices"
          role="group"
          aria-label="Choose an automation to watch AI build"
        >
          {automationAiExamples.map((item, index) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={selected === index}
              aria-controls="ai-construction"
              onClick={() => play(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="ab-ai-demo"
          ref={rootRef}
          id="ai-construction"
          data-phase={build.phase}
          data-example={example.id}
        >
          <div className="ab-ai-copy">
            <h3>{example.label}</h3>
            <p>{example.description}</p>
          </div>
          <figure className="ab-ai-prompt">
            <figcaption>Your request</figcaption>
            <blockquote>
              <span className="ab-ai-sr-only">{example.request}</span>
              <span className="ab-ai-prompt-reserve" aria-hidden="true">
                {example.request}
              </span>
              <span className="ab-ai-prompt-typed" aria-hidden="true">
                {example.request.slice(0, build.characters)}
                {build.phase === "typing" || build.phase === "waiting" ? (
                  <span className="ab-ai-cursor" />
                ) : null}
              </span>
            </blockquote>
          </figure>
          <figure className="ab-ai-workflow" aria-label={"Workflow draft: " + example.label}>
            <figcaption data-visible={draftVisible}>
              <ZaplaPetal size={25} />
              <span>Workflow draft</span>
            </figcaption>
            <ol>
              {example.steps.map((step, index) => (
                <li
                  key={example.id + index}
                  className={"ab-ai-step ab-ai-step-" + step.kind}
                  data-visible={allVisible || build.steps > index}
                >
                  {index > 0 ? <span className="ab-ai-connection" aria-hidden="true" /> : null}
                  <div className="ab-ai-node">
                    <StepIcon kind={step.kind} />
                    <div>
                      <strong>{step.title}</strong>
                      {step.detail ? <p>{step.detail}</p> : null}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </figure>
          <div className="ab-ai-controls">
            <div className="ab-ai-control-row">
              <button className="ab-ai-watch" type="button" ref={watchRef} onClick={() => play()}>
                <Play size={15} fill="currentColor" aria-hidden="true" />
                Watch AI build
              </button>
              <a className="ab-ai-other" href="#ai-flow-builder">
                Choose another idea
              </a>
            </div>
            <p className="ab-ai-scope">{example.scope}</p>
          </div>
          <p className="ab-ai-review">
            Review the audience, messages, rules and connections before activation.
          </p>
        </div>

        <noscript>
          <style>{".ab-ai-choices,.ab-ai-watch{display:none!important}"}</style>
          <div className="ab-ai-static-examples">
            {automationAiExamples.slice(1).map((item) => (
              <details key={item.id}>
                <summary>{item.label}</summary>
                <p>{item.request}</p>
                <ol>
                  {item.steps.map((step, index) => (
                    <li key={index}>{step.title}</li>
                  ))}
                </ol>
                <p>{item.scope}</p>
              </details>
            ))}
          </div>
        </noscript>
      </div>
    </section>
  );
}
