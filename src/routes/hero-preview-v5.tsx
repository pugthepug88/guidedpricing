import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell, EASE } from "@/components/v5/kit";
import {
  SceneAutomations,
  SceneContacts,
  SceneInbox,
  SceneOpportunities,
  type SceneProps,
} from "@/components/v5/scenes-a";
import { SceneBookings, SceneDocuments, SceneEmail, SceneSocial } from "@/components/v5/scenes-b";
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
  steps: number;
  render: (p: SceneProps) => React.ReactNode;
};

const SCENES: SceneDef[] = [
  {
    key: "contacts",
    label: "Contacts",
    title: "Contacts",
    subtitle: "Tags and last activity show who to re-engage",
    steps: 7,
    render: (p) => <SceneContacts {...p} />,
  },
  {
    key: "opportunities",
    label: "Opportunities",
    title: "Opportunities",
    subtitle: "Pipeline from first enquiry to negotiation",
    steps: 6,
    render: (p) => <SceneOpportunities {...p} />,
  },
  {
    key: "inbox",
    label: "Inbox",
    title: "Unified inbox",
    subtitle: "SMS, email, Facebook and Instagram in one thread",
    steps: 6,
    render: (p) => <SceneInbox {...p} />,
  },
  {
    key: "automations",
    label: "Automations",
    title: "Workflows",
    subtitle: "Review requests after every completed job",
    steps: 6,
    render: (p) => <SceneAutomations {...p} />,
  },
  {
    key: "social",
    label: "Social Planner",
    title: "Social planner",
    subtitle: "Plan and schedule across connected accounts",
    steps: 6,
    render: (p) => <SceneSocial {...p} />,
  },
  {
    key: "email",
    label: "Email Marketing",
    title: "Email marketing",
    subtitle: "Campaigns, drafts and published sends",
    steps: 6,
    render: (p) => <SceneEmail {...p} />,
  },
  {
    key: "bookings",
    label: "Bookings",
    title: "Bookings",
    subtitle: "Customer facing scheduling page",
    steps: 6,
    render: (p) => <SceneBookings {...p} />,
  },
  {
    key: "documents",
    label: "Documents",
    title: "Documents & contracts",
    subtitle: "Quote, send, sign and close",
    steps: 6,
    render: (p) => <SceneDocuments {...p} />,
  },
];

const STEP_MS = 1500;
const SCENE_GAP_MS = 1600;

function HeroV5Page() {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const [sceneIndex, setSceneIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const scene = SCENES[sceneIndex];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (reduced) {
      setStep(scene.steps - 1);
      return;
    }
    if (paused) return;
    const last = step >= scene.steps - 1;
    const id = window.setTimeout(
      () => {
        if (last) {
          setStep(0);
          setSceneIndex((i) => (i + 1) % SCENES.length);
        } else {
          setStep((s) => s + 1);
        }
      },
      last ? SCENE_GAP_MS : STEP_MS,
    );
    return () => window.clearTimeout(id);
  }, [step, sceneIndex, paused, reduced, scene.steps]);

  const selectScene = useCallback((i: number) => {
    setSceneIndex(i);
    setStep(0);
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

  const progress = ((step + 1) / scene.steps) * 100;

  return (
    <div className="min-h-screen bg-white font-zapla text-zapla-ink">
      {/* preview header */}
      <header className="mx-auto flex max-w-[1360px] items-center gap-3 px-5 py-5 sm:px-8">
        <img src={logo.url} alt="Zapla" className="h-8 w-8 rounded-[10px]" />
        <span className="text-[15px] font-semibold tracking-tight">Zapla</span>
        <span className="ml-2 rounded-full border border-slate-200 px-2 py-[2px] text-[10px] font-medium text-slate-400">
          Hero preview v5
        </span>
      </header>

      <main className="relative overflow-hidden">
        {/* soft accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 78% 8%, rgba(37,99,255,0.09), transparent 70%), radial-gradient(700px 420px at 96% 62%, rgba(139,92,246,0.08), transparent 70%), radial-gradient(600px 380px at 4% 30%, rgba(34,211,238,0.07), transparent 70%)",
          }}
        />

        <div className="mx-auto grid max-w-[1360px] items-center gap-10 px-5 pb-16 pt-4 sm:px-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-10 lg:pb-20">
          {/* copy */}
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

          {/* product stage */}
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
                  <div className="absolute inset-0">{scene.render({ step, reduced })}</div>
                </AppShell>
              </div>
            </div>

            {/* progress */}
            <div className="mt-3 flex items-center gap-2.5 px-1">
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                <Activity className="h-3 w-3 text-zapla-blue" />
                Live workflow
              </span>
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-zapla-blue/70"
                  initial={false}
                  animate={{ width: `${reduced ? 100 : progress}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
              <span className="text-[10.5px] text-slate-400">{scene.label}</span>
            </div>

            {/* tabs */}
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
    </div>
  );
}
