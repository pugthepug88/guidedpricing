import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/v5/kit";
import {
  SceneContacts,
  SceneInbox,
  SceneOpportunities,
  type SceneProps,
} from "@/components/v5/scenes-a";
import { SceneCalendar, SceneContracts } from "@/components/v5/scenes-b";
import { SceneContentLive } from "@/components/v5/scene-content-live";
import { SceneEmailLive } from "@/components/v5/scene-email-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { BelowHeroV5 } from "@/components/v5/below-hero";
import { useSceneClock } from "@/components/v5/use-scene-clock";
import logo from "@/assets/zapla-logo-green.png.asset.json";

export const Route = createFileRoute("/hero-preview-v5")({
  head: () => ({
    meta: [
      { title: "You lead. Zapla follows through. | Zapla platform preview" },
      {
        name: "description",
        content:
          "A live product preview of Zapla: capture every enquiry, keep every conversation in one place, and move customers from first message to booked, paid and returning.",
      },
      { property: "og:title", content: "You lead. Zapla follows through." },
      {
        property: "og:description",
        content:
          "See enquiries, inbox, bookings, automations, win back, marketing and proposals working as one connected system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeroV5Page,
});

type SceneDef = {
  key: string;
  label: string;
  title: string;
  subtitle: string;
  /** scene-local timeline: variable-duration beats (ms), total differs per scene */
  phases: number[];
  render: (p: SceneProps) => React.ReactNode;
};

const SCENES: SceneDef[] = [
  {
    key: "contacts",
    label: "Contacts",
    title: "Contacts",
    subtitle: "Dormant customers wake up",
    phases: [
      1400, 520, 780, 900, 780, 420, 420, 420, 420, 760, 660, 1750, 640, 3500, 400, 340, 340, 340,
      2600,
    ],
    render: (p) => <SceneContacts {...p} />,
  },
  {
    key: "opportunities",
    label: "Opportunities",
    title: "Opportunities",
    subtitle: "Every enquiry visible, every deal won",
    phases: [1300, 700, 420, 1000, 1000, 500, 320, 800, 600, 350, 900, 1450, 1800],
    render: (p) => <SceneOpportunities {...p} />,
  },
  {
    key: "inbox",
    label: "Inbox",
    title: "Inbox",
    subtitle: "Every channel, one conversation",
    phases: [1200, 650, 900, 1000, 1250, 550, 1200, 950, 1800],
    render: (p) => <SceneInbox {...p} />,
  },
  {
    key: "automations",
    label: "Automations",
    title: "Automations",
    subtitle: "Follow-up happens without anyone remembering",
    phases: [1200, 900, 900, 1100, 900, 900, 1000, 1400, 1250, 1800],
    render: (p) => <SceneAutomationsLive {...p} />,
  },
  {
    key: "content",
    label: "Content Planner",
    title: "Content Planner",
    subtitle: "One post becomes multi-channel distribution",
    phases: [700, 500, 2000, 1700, 900, 1800, 2700],
    render: (p) => <SceneContentLive {...p} />,
  },
  {
    key: "email",
    label: "Email Marketing",
    title: "Email Marketing",
    subtitle: "Personalisation becomes real",
    phases: [900, 850, 1300, 1500, 900, 900, 1900],
    render: (p) => <SceneEmailLive {...p} />,
  },
  {
    key: "calendar",
    label: "Calendar",
    title: "Calendar",
    subtitle: "A selected time becomes a real appointment",
    phases: [780, 620, 700, 860, 1600, 620],
    render: (p) => <SceneCalendar {...p} />,
  },
  {
    key: "contracts",
    label: "Contracts",
    title: "Contracts",
    subtitle: "One signature changes the deal",
    phases: [780, 700, 1000, 620, 820, 1650, 620],
    render: (p) => <SceneContracts {...p} />,
  },
];

function HeroV5Page() {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const scene = SCENES[sceneIndex];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const advance = useCallback(() => {
    setSceneIndex((i) => (i + 1) % SCENES.length);
  }, []);

  const runId = `${scene.key}-${runKey}`;

  const { phase, elapsedMs } = useSceneClock({
    durations: scene.phases,
    paused,
    reduced,
    onComplete: advance,
    restartKey: runId,
  });

  const selectScene = useCallback((i: number) => {
    setSceneIndex(i);
    setRunKey((k) => k + 1);
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % SCENES.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + SCENES.length) % SCENES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = SCENES.length - 1;
    if (next < 0) return;
    e.preventDefault();
    selectScene(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="min-h-screen bg-white font-zapla text-zapla-ink">
      <style>{`
        [data-scene="content"] div[class*="ml-3 hidden rounded-[9px] border border-slate-200 bg-slate-50 p-[2px] sm:flex"] {
          display: none !important;
        }
      `}</style>

      <header className="mx-auto flex max-w-[1360px] items-center gap-3 px-5 py-5 sm:px-8">
        <img src={logo.url} alt="Zapla" className="h-8 w-8 rounded-[10px]" />
        <span className="text-[15px] font-semibold tracking-tight">Zapla</span>
        <span className="ml-2 rounded-full border border-slate-200 px-2 py-[2px] text-[10px] font-medium text-slate-400">
          Hero preview v5
        </span>
      </header>

      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 78% 8%, rgba(37,99,255,0.09), transparent 70%), radial-gradient(700px 420px at 96% 62%, rgba(139,92,246,0.08), transparent 70%), radial-gradient(600px 380px at 4% 30%, rgba(34,211,238,0.07), transparent 70%)",
          }}
        />

        <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-10 lg:pb-20">
          <div className="max-w-[420px]">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-zapla-blue">
              AI-powered business platform
            </p>
            <h1 className="mt-4 text-[40px] font-extrabold leading-[1.03] tracking-[-0.03em] text-zapla-ink sm:text-[50px]">
              You lead.
              <br />
              Zapla follows through.
            </h1>
            <p className="mt-5 text-[15.5px] leading-relaxed text-zapla-muted">
              Capture every enquiry, keep every conversation in one place, and move customers from
              first message to booked, paid and returning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href="https://zapla.io/booking"
                className="inline-flex items-center gap-2 rounded-full bg-zapla-blue px-6 py-3 text-[14px] font-semibold text-white shadow-zapla-blue transition-colors hover:bg-zapla-blue2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zapla-blue"
              >
                Book a walkthrough
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#zapla-stage"
                className="text-[13.5px] font-semibold text-zapla-ink2 underline decoration-slate-300 decoration-2 underline-offset-4 transition-colors hover:decoration-zapla-blue"
              >
                See how it works
              </a>
            </div>
            <p className="mt-5 text-[12.5px] text-zapla-muted2">
              Guided launch. Built around your business.
            </p>
          </div>

          <div id="zapla-stage">
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="rounded-[22px] border border-slate-200/80 bg-white p-1.5 shadow-[0_40px_90px_-40px_rgba(15,23,42,0.35)]"
            >
              <div className="h-[460px] sm:h-[520px] lg:h-[580px]">
                <AppShell activeKey={scene.key} title={scene.title} subtitle={scene.subtitle}>
                  <div key={runId} data-scene={scene.key} className="absolute inset-0">
                    {scene.render({ phase, elapsedMs, reduced })}
                  </div>
                </AppShell>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Zapla product scenes"
              className="zapla-scroll-hide mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1"
            >
              {SCENES.map((s, i) => {
                const on = i === sceneIndex;
                return (
                  <button
                    key={s.key}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`v5-tab-${s.key}`}
                    aria-selected={on}
                    aria-label={`${s.label} scene`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => selectScene(i)}
                    onKeyDown={(e) => onTabKeyDown(e, i)}
                    className={cn(
                      "shrink-0 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zapla-blue",
                      on
                        ? "border-transparent bg-zapla-ink text-white"
                        : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700",
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <BelowHeroV5 />
    </div>
  );
}
