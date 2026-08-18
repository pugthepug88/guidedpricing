import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Phone,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BelowHeroV5 } from "@/components/v5/below-hero";
import { AppShell } from "@/components/v5/kit";
import {
  SceneContacts,
  type SceneProps,
} from "@/components/v5/scenes-a";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneEmailPolished } from "@/components/v5/scene-email-polished";
import { SceneContentLive } from "@/components/v5/scene-content-live";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { SceneContractsLive } from "@/components/v5/scene-contracts-live";
import { useSceneClock } from "@/components/v5/use-scene-clock";
import logo from "@/assets/zapla-logo-green.png.asset.json";

export const Route = createFileRoute("/homepage-draft-v1")({
  head: () => ({
    meta: [
      { title: "Homepage Draft V1 — Zapla" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content: "Zapla homepage draft V1 — conversion and positioning workspace.",
      },
    ],
  }),
  component: HomepageDraftV1,
});

const BOOK_URL = "https://zapla.io/booking";

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
    phases: [
      1400, 520, 780, 900, 780, 420, 420, 420, 420, 760, 660, 1750, 640, 3500, 400,
      340, 340, 340, 2600,
    ],
    render: (p) => <SceneContacts {...p} />,
  },
  {
    key: "opportunities",
    label: "Sales",
    title: "Sales",
    subtitle: "Every enquiry visible, every deal won",
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
    subtitle: "One post becomes multi-channel distribution",
    phases: [700, 500, 2000, 1700, 900, 1800, 2700],
    render: (p) => <SceneContentLive {...p} />,
  },
  {
    key: "email",
    label: "Email Marketing",
    title: "Email Marketing",
    subtitle: "From template to multi-step campaign",
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

function HomepageDraftV1() {
  return (
    <main className="min-h-screen bg-white font-zapla text-zapla-ink">
      <Hero />
      <Fragmentation />
      <Journey />
      <AiWorkforce />
      <BelowHeroV5 />
    </main>
  );
}

function Hero() {
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
    <section className="relative overflow-hidden border-b border-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 480px at 78% 8%, rgba(37,99,255,0.09), transparent 70%), radial-gradient(700px 420px at 96% 62%, rgba(139,92,246,0.08), transparent 70%), radial-gradient(600px 380px at 4% 30%, rgba(34,211,238,0.07), transparent 70%)",
        }}
      />

      <header className="relative mx-auto flex max-w-[1360px] items-center gap-3 px-5 py-5 sm:px-8">
        <img src={logo.url} alt="Zapla" className="h-8 w-8 rounded-[10px]" />
        <span className="text-[15px] font-semibold tracking-tight">Zapla</span>
        <span className="ml-2 rounded-full border border-slate-200 bg-white/70 px-2 py-[2px] text-[10px] font-medium text-slate-400">
          Homepage draft v1
        </span>
      </header>

      <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 px-5 pb-20 pt-5 sm:px-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-10">
        <div className="max-w-[430px]">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-zapla-blue">
            AI-powered business platform
          </p>
          <h1 className="mt-4 text-[42px] font-extrabold leading-[1.03] tracking-[-0.035em] sm:text-[52px]">
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
              href={BOOK_URL}
              className="inline-flex items-center gap-2 rounded-full bg-zapla-blue px-6 py-3 text-[14px] font-semibold text-white shadow-zapla-blue transition-colors hover:bg-zapla-blue2"
            >
              Book a walkthrough <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#zapla-stage"
              className="text-[13px] font-semibold text-slate-600 underline decoration-slate-300 decoration-2 underline-offset-4 hover:decoration-zapla-blue"
            >
              See Zapla in action
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-medium text-slate-500">
            {["Unlimited users", "One connected platform", "Built around your business"].map(
              (x) => (
                <span key={x} className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  {x}
                </span>
              ),
            )}
          </div>
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
                <div key={runId} className="absolute inset-0">
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
    </section>
  );
}

function Fragmentation() {
  const tools = ["Leads", "SMS", "Email", "Bookings", "CRM", "Reviews", "Payments", "Social"];

  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1120px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue-600">
          One connected system
        </p>
        <h2 className="mx-auto mt-4 max-w-[760px] text-[34px] font-bold leading-tight tracking-[-0.03em] sm:text-[46px]">
          Your customer journey shouldn't live across eight different apps.
        </h2>
        <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-relaxed text-slate-500">
          When leads, conversations and follow-up live in different places, things get missed. Zapla
          connects the customer journey from first enquiry to repeat business.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {tools.map((tool) => (
            <div
              key={tool}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-600 shadow-sm"
            >
              {tool}
            </div>
          ))}
          <ArrowRight className="mx-2 hidden h-5 w-5 text-slate-300 md:block" />
          <div className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-[15px] font-bold text-white shadow-xl">
            <img src={logo.url} alt="" className="h-7 w-7 rounded-lg" />
            Zapla
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const stages = [
    ["01", "Capture", "A new enquiry becomes a real customer record."],
    ["02", "Communicate", "Every message stays connected to the same customer."],
    ["03", "Convert", "Follow-up turns interest into a booked opportunity."],
    ["04", "Deliver", "Your team knows what happens next."],
    ["05", "Retain", "Reviews and reminders happen after the job."],
    ["06", "Grow", "Past customers come back instead of disappearing."],
  ];

  return (
    <section className="bg-slate-50 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-[720px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-blue-600">
            One customer. One continuous journey.
          </p>
          <h2 className="mt-4 text-[34px] font-bold leading-tight tracking-[-0.03em] sm:text-[46px]">
            From first enquiry to the next sale, nothing falls between the cracks.
          </h2>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {stages.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="text-[11px] font-bold text-blue-500">{n}</span>
              <h3 className="mt-4 text-[18px] font-bold">{t}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiWorkforce() {
  return (
    <section className="relative overflow-hidden bg-[#07090d] px-5 py-28 text-white sm:px-8">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(700px 420px at 70% 30%, rgba(37,99,255,.24), transparent 70%), radial-gradient(600px 380px at 25% 80%, rgba(139,92,246,.16), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1180px]">
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-blue-400">
          AI that does the work
        </p>
        <h2 className="mt-5 max-w-[820px] text-[40px] font-bold leading-[1.05] tracking-[-0.04em] sm:text-[58px]">
          Some work shouldn't wait for someone to do it.
        </h2>
        <p className="mt-6 max-w-[650px] text-[16px] leading-relaxed text-slate-400">
          Zapla's AI works inside the same customer system as your team — answering, following up and
          moving work forward while you're busy doing the actual job.
        </p>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <AiCard
            icon={<Phone className="h-5 w-5" />}
            label="Incoming call"
            title="AI answers while you're busy"
            body="A customer calls. Zapla answers, understands what they need and keeps the conversation moving."
          />
          <AiCard
            icon={<CalendarCheck className="h-5 w-5" />}
            label="Appointment"
            title="A conversation becomes a booking"
            body="Availability is checked and the customer can move from enquiry to an actual appointment."
          />
          <AiCard
            icon={<UserRoundPlus className="h-5 w-5" />}
            label="Customer record"
            title="Your team gets the context"
            body="The lead, conversation and next action arrive inside Zapla instead of disappearing into another tool."
          />
        </div>

        <div className="mt-5 flex items-center gap-2 text-[12px] text-slate-500">
          <Sparkles className="h-4 w-4 text-blue-400" />
          AI is part of the workflow, not another tab to manage.
        </div>
      </div>
    </section>
  );
}

function AiCard({
  icon,
  label,
  title,
  body,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-300">
        {icon}
        {label}
      </div>
      <h3 className="mt-8 text-[20px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-[13.5px] leading-relaxed text-slate-400">{body}</p>
    </div>
  );
}
