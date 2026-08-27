import { useCallback, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/v5/kit";
import { SceneContacts, type SceneProps } from "@/components/v5/scenes-a";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneContentLive } from "@/components/v5/scene-content-live";
import { SceneEmailPolished } from "@/components/v5/scene-email-polished";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { SceneContractsLive } from "@/components/v5/scene-contracts-live";
import { useSceneClock } from "@/components/v5/use-scene-clock";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';

type SceneDef = {
  key: string;
  label: string;
  title: string;
  subtitle: string;
  phases: number[];
  render: (p: SceneProps) => ReactNode;
};

const SCENES: SceneDef[] = [
  {
    key: "contacts",
    label: "Contacts",
    title: "Contacts",
    subtitle: "Dormant customers wake up",
    phases: [1400, 520, 780, 900, 780, 420, 420, 420, 420, 760, 660, 1750, 640, 3500, 400, 340, 340, 340, 2600],
    render: (p) => <SceneContacts {...p} />,
  },
  {
    key: "opportunities",
    label: "Sales",
    title: "Sales",
    subtitle: "Every enquiry visible, every next step clear",
    phases: [1300, 700, 420, 1000, 1000, 500, 320, 800, 600, 350, 900, 1450, 1800],
    render: (p) => <SceneSalesLive {...p} />,
  },
  {
    key: "inbox",
    label: "Unified Inbox",
    title: "Unified Inbox",
    subtitle: "Every channel, one conversation",
    phases: [1200, 650, 900, 1000, 1250, 550, 1200, 950, 1800],
    render: (p) => <SceneInboxLive {...p} />,
  },
  {
    key: "automations",
    label: "Automations",
    title: "Automations",
    subtitle: "Follow-up happens without anyone remembering",
    phases: [1200, 900, 900, 1100, 900, 900, 1000, 1400, 900, 900, 1800],
    render: (p) => <SceneAutomationsLive {...p} />,
  },
  {
    key: "content",
    label: "Content Planner",
    title: "Content Planner",
    subtitle: "Stay visible so past customers come back",
    phases: [700, 500, 2000, 1700, 900, 1800, 2700],
    render: (p) => <SceneContentLive {...p} />,
  },
  {
    key: "email",
    label: "Email Marketing",
    title: "Email Marketing",
    subtitle: "Quiet customers get a reason to return",
    phases: [650, 900, 1150, 1250, 900, 900, 900, 650, 950, 1700, 1400],
    render: (p) => <SceneEmailPolished {...p} />,
  },
  {
    key: "calendar",
    label: "Calendar",
    title: "Calendar",
    subtitle: "A selected time becomes a real appointment",
    phases: [700, 720, 900, 900, 1700, 2100],
    render: (p) => <SceneCalendarLive {...p} />,
  },
  {
    key: "contracts",
    label: "Contracts",
    title: "Contracts",
    subtitle: "Send, sign and close the loop",
    phases: [520, 600, 700, 700, 800, 800, 1100, 1800],
    render: (p) => <SceneContractsLive {...p} />,
  },
];

export function ZaplaPlatformShowcase() {
  const reduced = !!useReducedMotion();
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

  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
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
    <section id="zapla-product-v5" className="relative overflow-hidden bg-[#F7F8FA] px-5 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="max-w-[920px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.19em] text-cyan-600">
            The platform behind the follow-through
          </div>
          <h2
            className="mt-4 text-[38px] leading-[1.01] tracking-[-0.045em] text-[#111318] sm:text-[58px] lg:text-[68px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            One platform. Every customer step connected.
          </h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-slate-500 sm:text-[17px]">
            CRM, conversations, pipelines, bookings, automations, marketing and contracts all work from the same connected customer system.
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="rounded-[20px] border border-slate-200/90 bg-white p-1.5 shadow-[0_42px_100px_-45px_rgba(15,23,42,0.36)]"
          >
            <div className="h-[470px] sm:h-[560px] lg:h-[640px]">
              <AppShell activeKey={scene.key} title={scene.title} subtitle={scene.subtitle}>
                <div key={runId} className="absolute inset-0">
                  {scene.render({ phase, elapsedMs, reduced })}
                </div>
              </AppShell>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Zapla platform modules"
            className="zapla-scroll-hide mt-4 flex gap-2 overflow-x-auto pb-2"
          >
            {SCENES.map((s, i) => {
              const active = i === sceneIndex;
              return (
                <button
                  key={s.key}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectScene(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors",
                    active
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[720px] text-[14px] leading-[1.6] text-slate-500">
            The interface is the proof: your team can see the customer, the conversation and what happens next without stitching together another stack of disconnected tools.
          </p>
          <a
            href="https://zapla.io/booking"
            className="inline-flex h-[48px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white"
          >
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
