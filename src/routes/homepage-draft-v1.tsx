import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  MessageSquare,
  Phone,
  Sparkles,
  UserRoundPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CredibilityBand,
  ConnectedSystemStory,
  FollowThroughStory,
} from "@/components/v5/homepage-bridge";
import { AppShell } from "@/components/v5/kit";
import { SceneContacts, type SceneProps } from "@/components/v5/scenes-a";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneEmailPolished } from "@/components/v5/scene-email-polished";
import { SceneContentLive } from "@/components/v5/scene-content-live";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { SceneContractsLive } from "@/components/v5/scene-contracts-live";
import { useSceneClock } from "@/components/v5/use-scene-clock";

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
    phases: [1400, 520, 780, 900, 780, 420, 420, 420, 420, 760, 660, 1750, 640, 3500, 400, 340, 340, 340, 2600],
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
      <CredibilityBand />
      <ConnectedSystemStory />
      <FollowThroughStory />
      <AiWorkforce />
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

  const advance = useCallback(() => setSceneIndex((i) => (i + 1) % SCENES.length), []);
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
            "radial-gradient(900px 480px at 78% 8%, rgba(37,99,255,0.10), transparent 70%), radial-gradient(700px 420px at 96% 62%, rgba(139,92,246,0.07), transparent 70%), radial-gradient(600px 380px at 4% 30%, rgba(34,211,238,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1420px] items-center gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,430px)_minmax(0,1fr)] lg:gap-14 lg:pb-24 lg:pt-20">
        <div className="max-w-[470px] min-w-0">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-zapla-blue">
            Customer follow-through for service businesses
          </p>
          <h1 className="mt-5 text-[48px] font-extrabold leading-[0.96] tracking-[-0.05em] sm:text-[60px] lg:text-[68px]">
            Every customer gets the next step.
          </h1>
          <p className="mt-6 max-w-[455px] text-[15.5px] leading-7 text-zapla-muted sm:text-[16px]">
            Zapla responds to enquiries, follows up, books appointments, sends reminders, requests reviews and brings old customers back automatically, all from one connected CRM.
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
            {["Unlimited users", "No per-seat pricing", "Guided launch"].map((x) => (
              <span key={x} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                {x}
              </span>
            ))}
          </div>
        </div>

        <div id="zapla-stage" className="min-w-0 overflow-hidden lg:overflow-visible">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="min-w-0 overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-1.5 shadow-[0_40px_90px_-40px_rgba(15,23,42,0.35)]"
          >
            <div className="h-[430px] min-w-0 sm:h-[520px] lg:h-[600px]">
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
            className="zapla-scroll-hide mt-3 flex max-w-full gap-1.5 overflow-x-auto px-1 pb-1"
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

function AiWorkforce() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.25, once: true });
  const prefersReduced = useReducedMotion();
  const actions = [
    { icon: <Sparkles className="h-4 w-4" />, title: "Intent understood", detail: "Brake inspection needed tomorrow" },
    { icon: <UserRoundPlus className="h-4 w-4" />, title: "Customer identified", detail: "Sarah Miller · returning customer" },
    { icon: <CalendarCheck className="h-4 w-4" />, title: "Availability checked", detail: "Thursday · 10:30 AM available" },
    { icon: <CheckCircle2 className="h-4 w-4" />, title: "Appointment booked", detail: "Workshop bay 2 · Alex assigned" },
    { icon: <MessageSquare className="h-4 w-4" />, title: "Confirmation sent", detail: "SMS delivered with booking details" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#05070b] px-5 py-28 text-white sm:px-8 sm:py-36 lg:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 560px at 73% 32%, rgba(37,99,255,.24), transparent 68%), radial-gradient(700px 500px at 35% 82%, rgba(124,58,237,.18), transparent 70%), linear-gradient(180deg, rgba(255,255,255,.02), transparent 32%)",
        }}
      />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-400">AI that acts</p>
            <h2 className="mt-5 max-w-[610px] text-[48px] font-semibold leading-[0.96] tracking-[-0.052em] sm:text-[68px] lg:text-[78px]">
              Watch Zapla do the work.
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-7 text-slate-400">
              A customer calls. Zapla understands why, finds the record, checks availability, books the appointment and confirms it while the conversation is still happening.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[12px] text-slate-400 lg:justify-end">
            <motion.span
              animate={prefersReduced ? undefined : { opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.75)]"
            />
            One conversation. Five actions completed.
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] shadow-[0_50px_140px_-55px_rgba(37,99,255,.75)] backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40"
            style={{ background: "linear-gradient(180deg, rgba(59,130,246,.12), transparent), radial-gradient(420px 180px at 76% 0%, rgba(139,92,246,.20), transparent 70%)" }}
          />

          <div className="relative flex flex-wrap items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-7">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <span className="ml-1 text-[12px] font-medium text-slate-300">Zapla AI receptionist</span>
            <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10.5px] font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Live
            </span>
          </div>

          <div className="relative grid lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={prefersReduced ? undefined : { boxShadow: ["0 0 0 rgba(59,130,246,0)", "0 0 42px rgba(59,130,246,.38)", "0 0 0 rgba(59,130,246,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/15 text-blue-300"
                >
                  <Phone className="h-5 w-5" />
                </motion.div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">Incoming call · 7:42 PM</p>
                  <h3 className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-white">Sarah Miller</h3>
                  <p className="mt-1 text-[12px] text-slate-500">Returning customer · mobile</p>
                </div>
              </div>

              <div className="mt-8 flex h-12 items-center gap-[4px] overflow-hidden" aria-hidden>
                {[18, 32, 22, 40, 54, 31, 46, 66, 38, 72, 50, 29, 58, 82, 44, 68, 35, 55, 28, 47, 63, 34, 74, 41, 57, 30, 48, 70, 39, 59, 26, 43].map((height, index) => (
                  <motion.span
                    key={`${height}-${index}`}
                    animate={prefersReduced ? undefined : { scaleY: [0.45, 1, 0.6, 0.9] }}
                    transition={{ duration: 0.8 + (index % 5) * 0.08, repeat: Infinity, delay: (index % 7) * 0.05 }}
                    className="w-[3px] shrink-0 origin-center rounded-full bg-gradient-to-t from-blue-500/35 to-cyan-300/90"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="mt-8 space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.45 }}
                  className="max-w-[92%]"
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-500">Customer</p>
                  <p className="mt-2 text-[15px] leading-6 text-slate-200">Hi, I need someone to look at my brakes tomorrow morning. Do you have anything around ten?</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                  transition={{ delay: prefersReduced ? 0 : 0.75, duration: 0.45 }}
                  className="ml-auto max-w-[92%] border-l border-blue-400/30 pl-4"
                >
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-300">Zapla AI</p>
                  <p className="mt-2 text-[15px] leading-6 text-white">I can help with that. I have 10:30 AM available tomorrow. I’ll book it and send the details now.</p>
                </motion.div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">While the conversation is happening</p>
              <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-white">The customer journey updates itself.</h3>

              <div className="relative mt-8">
                <div className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-blue-400/60 via-violet-400/35 to-white/10" />
                <div className="space-y-1">
                  {actions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, x: 26 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 26 }}
                      transition={{ delay: prefersReduced ? 0 : 1.15 + index * 0.45, duration: 0.42 }}
                      className="relative flex gap-4 py-3.5"
                    >
                      <motion.div
                        animate={inView && !prefersReduced ? { scale: [0.9, 1.08, 1] } : undefined}
                        transition={{ delay: 1.15 + index * 0.45, duration: 0.45 }}
                        className={cn(
                          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                          index < actions.length - 1
                            ? "border-blue-400/30 bg-[#10182a] text-blue-300"
                            : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
                        )}
                      >
                        {action.icon}
                      </motion.div>
                      <div className="min-w-0 pt-0.5">
                        <p className="text-[13.5px] font-semibold text-slate-100">{action.title}</p>
                        <p className="mt-1 text-[12px] text-slate-500">{action.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ delay: prefersReduced ? 0 : 3.6, duration: 0.5 }}
            className="relative border-t border-white/10 bg-black/15 px-6 py-5 sm:px-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">Your team opens Zapla to the outcome</p>
                <p className="mt-1.5 text-[14px] font-medium text-slate-200">Sarah Miller · Brake inspection · Thu 10:30 AM · confirmation sent</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 text-[12px] font-semibold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" /> Opportunity updated automatically
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
