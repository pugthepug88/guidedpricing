import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Clock3,
  Mail,
  MessageSquare,
  MousePointer2,
  Pause,
  PhoneOutgoing,
  Play,
  Slack,
} from "lucide-react";
import { ZaplaPetal } from "@/components/ZaplaPetal";
import {
  automationAiExamples,
  type AutomationExample,
  type AutomationStep,
} from "./automationAiExamples";

type BuildState = {
  phase:
    | "ready"
    | "waiting"
    | "typing"
    | "submitting"
    | "generating"
    | "building"
    | "complete"
    | "transition";
  characters: number;
  steps: number;
};

type Playback = {
  selected: number;
  build: BuildState;
  paused: boolean;
  running: boolean;
  reduced: boolean;
};

function fullDraft(
  example: AutomationExample,
  phase: "ready" | "complete" | "transition",
): BuildState {
  return { phase, characters: example.request.length, steps: example.steps.length };
}

function timing(example: AutomationExample) {
  const textEnd = 180 + example.request.length * 20;
  const submitEnd = textEnd + 900;
  const typingEnd = submitEnd + 500;
  const buildEnd = typingEnd + example.steps.length * 350;
  const holdEnd = buildEnd + 5000;
  return { textEnd, submitEnd, typingEnd, buildEnd, holdEnd, cycleEnd: holdEnd + 240 };
}

function draftAt(example: AutomationExample, elapsed: number): BuildState {
  const { textEnd, submitEnd, typingEnd, buildEnd, holdEnd } = timing(example);
  if (elapsed >= holdEnd) return fullDraft(example, "transition");
  if (elapsed >= buildEnd) return fullDraft(example, "complete");
  if (elapsed >= typingEnd)
    return {
      phase: "building",
      characters: example.request.length,
      steps: Math.min(example.steps.length, Math.floor((elapsed - typingEnd) / 350) + 1),
    };
  if (elapsed >= submitEnd)
    return { phase: "generating", characters: example.request.length, steps: 0 };
  if (elapsed >= textEnd)
    return { phase: "submitting", characters: example.request.length, steps: 0 };
  return {
    phase: elapsed < 180 ? "waiting" : "typing",
    characters: Math.max(0, Math.min(example.request.length, Math.floor((elapsed - 180) / 20))),
    steps: 0,
  };
}

/** Local presentation clock. Automatic changes never navigate or move focus.
 * No AI, communications, billing or other live service is invoked.
 */
function useDraftAssembly() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const controls = useRef<{
    select: (index: number) => void;
    replay: () => void;
    togglePause: () => void;
  } | null>(null);
  const [playback, setPlayback] = useState<Playback>(() => ({
    selected: 0,
    build: fullDraft(automationAiExamples[0], "ready"),
    paused: false,
    running: false,
    reduced: false,
  }));

  useEffect(() => {
    const root = rootRef.current;
    const request = root?.querySelector<HTMLElement>(".ab-ai-prompt");
    if (!root || !request) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasObserver = typeof IntersectionObserver !== "undefined";
    let reduced = preference.matches || !hasObserver;
    let selected = 0;
    let build = fullDraft(automationAiExamples[0], "ready");
    let paused = false;
    let visible = false;
    let started = false;
    let disposed = false;
    let timer = 0;
    let elapsed = 0;
    let stamp: number | null = null;

    const publish = (next: BuildState, running: boolean) => {
      if (disposed) return;
      build = next;
      const candidate = { selected, build, paused, running, reduced };
      setPlayback((current) =>
        current.selected === candidate.selected &&
        current.paused === candidate.paused &&
        current.running === candidate.running &&
        current.reduced === candidate.reduced &&
        current.build.phase === next.phase &&
        current.build.characters === next.characters &&
        current.build.steps === next.steps
          ? current
          : candidate,
      );
    };

    const readable = () => {
      const bounds = request.getBoundingClientRect();
      const height = Math.max(
        0,
        Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 70),
      );
      return height >= bounds.height * 0.9;
    };

    const stopClock = () => {
      window.clearTimeout(timer);
      timer = 0;
      if (stamp !== null) elapsed += performance.now() - stamp;
      stamp = null;
    };

    const allowed = () => !disposed && !reduced && !paused && visible && !document.hidden;

    const tick = () => {
      timer = 0;
      if (!allowed()) {
        stopClock();
        publish(build, false);
        return;
      }
      const now = performance.now();
      if (stamp !== null) elapsed += now - stamp;
      stamp = now;
      const example = automationAiExamples[selected];
      const times = timing(example);

      // Keep the completed mobile graph in place while its prompt is above
      // the viewport. Returning to the prompt resumes automatic rotation.
      if (elapsed >= times.holdEnd && !readable()) {
        stopClock();
        elapsed = times.holdEnd;
        publish(fullDraft(example, "complete"), false);
        return;
      }
      if (elapsed >= times.cycleEnd) {
        selected = (selected + 1) % automationAiExamples.length;
        elapsed = 0;
      }
      const next = draftAt(automationAiExamples[selected], elapsed);
      publish(next, true);
      timer = window.setTimeout(tick, next.phase === "complete" ? 200 : 25);
    };

    const wake = () => {
      if (!allowed()) {
        stopClock();
        publish(build, false);
        return;
      }
      if (!started && !readable()) return;
      if (
        build.phase === "complete" &&
        elapsed >= timing(automationAiExamples[selected]).holdEnd &&
        !readable()
      )
        return;
      if (timer) return;
      if (!started) {
        started = true;
        elapsed = 0;
        build = draftAt(automationAiExamples[selected], 0);
      }
      stamp = performance.now();
      publish(build, true);
      timer = window.setTimeout(tick, 25);
    };

    controls.current = {
      select: (index) => {
        stopClock();
        selected = index;
        if (paused || reduced) {
          started = true;
          elapsed = timing(automationAiExamples[selected]).buildEnd;
          publish(fullDraft(automationAiExamples[selected], "complete"), false);
        } else {
          started = false;
          elapsed = 0;
          publish(draftAt(automationAiExamples[selected], 0), false);
          wake();
        }
      },
      replay: () => {
        if (reduced) return;
        stopClock();
        paused = false;
        started = false;
        elapsed = 0;
        publish(draftAt(automationAiExamples[selected], 0), false);
        wake();
      },
      togglePause: () => {
        if (reduced) return;
        stopClock();
        paused = !paused;
        publish(build, false);
        if (!paused) wake();
      },
    };

    const observer = hasObserver
      ? new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          wake();
        })
      : null;
    const respectPreference = () => {
      stopClock();
      reduced = preference.matches || !hasObserver;
      started = reduced;
      elapsed = reduced ? timing(automationAiExamples[selected]).buildEnd : 0;
      publish(fullDraft(automationAiExamples[selected], reduced ? "complete" : "ready"), false);
      wake();
    };

    observer?.observe(root);
    if (reduced) publish(fullDraft(automationAiExamples[selected], "complete"), false);
    document.addEventListener("visibilitychange", wake);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    preference.addEventListener("change", respectPreference);
    return () => {
      disposed = true;
      stopClock();
      controls.current = null;
      observer?.disconnect();
      document.removeEventListener("visibilitychange", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      preference.removeEventListener("change", respectPreference);
    };
  }, []);

  const select = (index: number) => {
    controls.current?.select(index);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.requestAnimationFrame(() => {
      const destination = reduce
        ? rootRef.current?.querySelector<HTMLElement>("h3")
        : sendRef.current;
      destination?.focus({ preventScroll: true });
    });
  };

  return {
    rootRef,
    sendRef,
    ...playback,
    example: automationAiExamples[playback.selected],
    select,
    replay: () => controls.current?.replay(),
    togglePause: () => controls.current?.togglePause(),
  };
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
  const {
    rootRef,
    sendRef,
    build,
    example,
    selected,
    paused,
    running,
    reduced,
    select,
    replay,
    togglePause,
  } = useDraftAssembly();
  const allVisible = build.phase === "ready" || build.phase === "complete";
  const generating = build.phase === "generating" || build.phase === "building";

  return (
    <section className="ab-ai-section" aria-labelledby="ab-ai-heading" id="ai-flow-builder">
      <div className="ab-wrap">
        <header className="ab-ai-heading">
          <div>
            <p className="ab-eyebrow">AI Flow Builder</p>
            <h2 id="ab-ai-heading">Build the workflow your business needs.</h2>
          </div>
          <p>Describe your process. Zapla AI builds a connected draft you can review and edit.</p>
        </header>

        <div className="ab-ai-workspace">
          <div
            className="ab-ai-demo"
            ref={rootRef}
            id="ai-construction"
            data-phase={build.phase}
            data-example={example.id}
            data-paused={paused}
            data-running={running}
          >
            <div className="ab-ai-input">
              <div className="ab-ai-copy">
                <h3 tabIndex={-1}>{example.label}</h3>
              </div>
              <figure className="ab-ai-prompt">
                <figcaption>
                  <ZaplaPetal size={22} />
                  <span>Ask Zapla AI</span>
                </figcaption>
                <blockquote>
                  <span className="ab-ai-sr-only">{example.request}</span>
                  <span className="ab-ai-prompt-reserve" aria-hidden="true">
                    {automationAiExamples.map((item) => (
                      <span key={item.id}>{item.request}</span>
                    ))}
                  </span>
                  <span className="ab-ai-prompt-typed" aria-hidden="true">
                    {example.request.slice(0, build.characters)}
                    {build.phase === "typing" || build.phase === "waiting" ? (
                      <span className="ab-ai-cursor" />
                    ) : null}
                  </span>
                </blockquote>
                {!reduced && (
                  <div className="ab-ai-toolbar">
                    <button
                      className="ab-ai-pause"
                      type="button"
                      onClick={togglePause}
                      aria-label={
                        paused ? "Resume automation animation" : "Pause automation animation"
                      }
                    >
                      {paused ? (
                        <Play size={14} aria-hidden="true" />
                      ) : (
                        <Pause size={14} aria-hidden="true" />
                      )}
                      {paused ? "Resume" : "Pause"}
                    </button>
                    <span className="ab-ai-send-control">
                      <button
                        className="ab-ai-send"
                        type="button"
                        ref={sendRef}
                        onClick={replay}
                        aria-label="Replay this automation"
                        title="Replay this automation"
                      >
                        <ArrowUp size={20} aria-hidden="true" />
                      </button>
                      <MousePointer2 className="ab-ai-send-pointer" size={23} aria-hidden="true" />
                    </span>
                  </div>
                )}
              </figure>
              <p className="ab-ai-scope">{example.scope}</p>
              <p className="ab-ai-review">
                Review the audience, messages, rules and connections before activation.
              </p>
            </div>
            <figure className="ab-ai-workflow" aria-label={"Workflow draft: " + example.label}>
              <figcaption aria-live={paused ? "polite" : "off"} aria-atomic="true">
                <span className="ab-ai-thinking" data-thinking={generating} aria-hidden="true">
                  <ZaplaPetal size={22} />
                </span>
                <span>{generating ? "Building your workflow…" : "Workflow draft"}</span>
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
          </div>
          <div className="ab-ai-ideas" id="automation-ai-ideas">
            <p className="ab-ai-ideas-label">Try an automation</p>
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
                  onClick={() => select(index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <noscript>
            <style>{".ab-ai-ideas,.ab-ai-toolbar{display:none!important}"}</style>
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
      </div>
    </section>
  );
}
