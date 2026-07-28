import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Home as HomeIcon,
  LayoutGrid,
  Inbox,
  Users,
  BarChart3,
  CalendarDays,
  MoreHorizontal,
  Sparkles,
  Check,
} from "lucide-react";
import logoGreen from "@/assets/zapla-logo-green.png.asset.json";

export const Route = createFileRoute("/hero-preview-v4")({
  head: () => ({
    meta: [
      { title: "You lead. Zapla acts. | Zapla AI work platform" },
      {
        name: "description",
        content:
          "Watch Zapla run the work behind every customer moment: campaigns, bookings, reviews and follow ups handled on one platform.",
      },
      { property: "og:title", content: "You lead. Zapla acts." },
      {
        property: "og:description",
        content:
          "Where your team and Zapla agents drive results together on one connected platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HeroV4Page,
});

/* ------------------------------------------------------------------ */
/* Scene data: one board scene per category                            */
/* ------------------------------------------------------------------ */

type Scene = {
  key: string;
  label: string;
  boardTitle: string;
  accent: string; // tailwind text/bg colour family base
  dot: string;
  bar: string;
  groups: { name: string; tone: string; rows: string[] }[];
  agentName: string;
  steps: [string, string];
  tileTint: string;
};

const SCENES: Scene[] = [
  {
    key: "marketing",
    label: "Marketing",
    boardTitle: "Marketing campaigns",
    accent: "text-indigo-600",
    dot: "bg-indigo-500",
    bar: "bg-indigo-400",
    tileTint: "from-indigo-200/70 to-sky-200/70",
    groups: [
      {
        name: "Nov. Campaign",
        tone: "text-indigo-600",
        rows: ["Holiday Push", "UGC Drive", "Black Friday Promo", "Partner Collaboration", "Retargeting Campaign", "End of Year Push", "Feature Spotlight"],
      },
      {
        name: "Oct. Campaign",
        tone: "text-emerald-600",
        rows: ["Fall Launch", "Q3 Awareness", "Local Sponsorship"],
      },
    ],
    agentName: "Campaign Agent",
    steps: ["Generating assets", "Resizing assets"],
  },
  {
    key: "reception",
    label: "Reception",
    boardTitle: "Calls and enquiries",
    accent: "text-sky-600",
    dot: "bg-sky-500",
    bar: "bg-sky-400",
    tileTint: "from-sky-200/70 to-cyan-200/70",
    groups: [
      {
        name: "Today",
        tone: "text-sky-600",
        rows: ["Missed call, 8:42am", "New enquiry, hot water", "Quote follow up", "Rescheduled visit", "After hours voicemail", "Callback requested"],
      },
      {
        name: "Yesterday",
        tone: "text-slate-500",
        rows: ["Booking confirmed", "Transferred to team", "Left a review"],
      },
    ],
    agentName: "Reception Agent",
    steps: ["Answering the call", "Booking the job"],
  },
  {
    key: "reviews",
    label: "Reputation",
    boardTitle: "Reviews and reputation",
    accent: "text-amber-600",
    dot: "bg-amber-500",
    bar: "bg-amber-400",
    tileTint: "from-amber-200/70 to-orange-200/70",
    groups: [
      {
        name: "This week",
        tone: "text-amber-600",
        rows: ["5 star, Google", "4 star, Google", "Review request sent", "5 star, Facebook", "Reply drafted", "Follow up scheduled"],
      },
      {
        name: "Last week",
        tone: "text-slate-500",
        rows: ["5 star, Google", "Reply published", "Testimonial saved"],
      },
    ],
    agentName: "Reputation Agent",
    steps: ["Drafting replies", "Publishing replies"],
  },
  {
    key: "bookings",
    label: "Bookings",
    boardTitle: "Jobs and appointments",
    accent: "text-emerald-600",
    dot: "bg-emerald-500",
    bar: "bg-emerald-400",
    tileTint: "from-emerald-200/70 to-teal-200/70",
    groups: [
      {
        name: "Thursday",
        tone: "text-emerald-600",
        rows: ["9:00 Site visit", "10:30 Quote review", "12:00 Install", "2:00 Service call", "3:30 Inspection", "5:00 Handover"],
      },
      {
        name: "Friday",
        tone: "text-slate-500",
        rows: ["8:30 Callback", "11:00 Maintenance", "1:00 New client"],
      },
    ],
    agentName: "Scheduling Agent",
    steps: ["Checking availability", "Confirming the slot"],
  },
  {
    key: "followups",
    label: "Follow ups",
    boardTitle: "Quotes and follow ups",
    accent: "text-violet-600",
    dot: "bg-violet-500",
    bar: "bg-violet-400",
    tileTint: "from-violet-200/70 to-fuchsia-200/70",
    groups: [
      {
        name: "Awaiting reply",
        tone: "text-violet-600",
        rows: ["Quote sent, day 2", "Quote sent, day 4", "Proposal opened", "No reply, day 7", "Second reminder", "Ready to close"],
      },
      {
        name: "Won",
        tone: "text-emerald-600",
        rows: ["Deposit paid", "Job scheduled", "Invoice issued"],
      },
    ],
    agentName: "Follow Up Agent",
    steps: ["Writing follow ups", "Sending follow ups"],
  },
  {
    key: "ads",
    label: "Ads",
    boardTitle: "Lead sources",
    accent: "text-rose-600",
    dot: "bg-rose-500",
    bar: "bg-rose-400",
    tileTint: "from-rose-200/70 to-pink-200/70",
    groups: [
      {
        name: "Live",
        tone: "text-rose-600",
        rows: ["Meta lead form", "Google search", "Local service ads", "Retargeting set", "Landing page A", "Landing page B"],
      },
      {
        name: "Paused",
        tone: "text-slate-500",
        rows: ["Winter promo", "Brand awareness", "Video test"],
      },
    ],
    agentName: "Ads Agent",
    steps: ["Reading performance", "Shifting spend"],
  },
  {
    key: "winback",
    label: "Win back",
    boardTitle: "Past customers",
    accent: "text-cyan-600",
    dot: "bg-cyan-500",
    bar: "bg-cyan-400",
    tileTint: "from-cyan-200/70 to-blue-200/70",
    groups: [
      {
        name: "Due a service",
        tone: "text-cyan-600",
        rows: ["Last visit, 11 months", "Last visit, 12 months", "Warranty expiring", "Annual check due", "Filter replacement", "Seasonal reminder"],
      },
      {
        name: "Re-engaged",
        tone: "text-emerald-600",
        rows: ["Replied, booking", "Booked Thursday", "Purchased again"],
      },
    ],
    agentName: "Win Back Agent",
    steps: ["Building the list", "Sending reminders"],
  },
];

/* Scene timeline, in ms from scene start */
const T = {
  board: 120,
  rows: 420,
  cursor: 1500,
  panel: 2100,
  step1: 2600,
  resolve1: 4000,
  step2: 5000,
  resolve2: 6200,
  hold: 9600,
} as const;

function HeroV4Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-10 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-6 lg:pt-16">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-slate-500">AI work platform</p>
          <h1 className="mt-4 text-[44px] font-extrabold leading-[1.03] tracking-[-0.03em] sm:text-6xl lg:text-[68px]">
            You lead.
            <br />
            Zapla acts.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            Where your team and AI agents drive results together on one connected
            platform.
          </p>
          <a
            href="https://zapla.io/booking"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700"
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-5 text-sm text-slate-500">
            No credit card needed <span className="mx-1 text-slate-300">✦</span> Set up
            with our team
          </p>
        </div>

        <AgentBoardScene />
      </section>
    </main>
  );
}




/* ------------------------------------------------------------------ */
/* The animated scene                                                  */
/* ------------------------------------------------------------------ */

function AgentBoardScene() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState(0); // 0 idle → 7 done
  const [paused, setPaused] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);
  const scene = SCENES[index];

  // start only when in view
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active || paused) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase(0);
    const at = (ms: number, p: number) =>
      timers.current.push(window.setTimeout(() => setPhase(p), ms));
    at(T.board, 1);
    at(T.rows, 2);
    at(T.cursor, 3);
    at(T.panel, 4);
    at(T.step1, 5);
    at(T.resolve1, 6);
    at(T.step2, 7);
    at(T.resolve2, 8);
    timers.current.push(
      window.setTimeout(() => setIndex((i) => (i + 1) % SCENES.length), T.hold),
    );
    return () => timers.current.forEach(clearTimeout);
  }, [index, active, paused]);

  const rowsVisible = phase >= 2;

  return (
    <div ref={hostRef} className="relative w-full">
      <div className="relative mx-auto h-[430px] w-full max-w-[760px] overflow-hidden sm:h-[500px] lg:h-[560px]">
        {/* soft ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute right-6 bottom-10 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div
          key={scene.key}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            phase >= 1 ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"
          }`}
        >
          <BoardMock scene={scene} rowsVisible={rowsVisible} phase={phase} />
          <AgentCursor scene={scene} phase={phase} />
          <AgentPanel scene={scene} phase={phase} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {SCENES.map((s, i) => {
          const on = i === index;
          return (
            <button
              key={s.key}
              type="button"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={() => {
                setPaused(false);
                setIndex(i);
              }}
              className="group flex items-center gap-2 text-lg transition"
            >
              <span
                className={`h-2 w-2 rounded-full transition ${
                  on ? "bg-slate-900" : "bg-slate-300 group-hover:bg-slate-400"
                }`}
              />
              <span
                className={`transition ${
                  on ? "font-semibold text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --- the product board behind everything --- */

function BoardMock({
  scene,
  rowsVisible,
  phase,
}: {
  scene: Scene;
  rowsVisible: boolean;
  phase: number;
}) {
  const railIcons = [HomeIcon, LayoutGrid, Inbox, Users, CalendarDays, BarChart3];
  return (
    <div className="absolute inset-y-0 left-0 right-0 flex overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
      {/* icon rail */}
      <div className="flex w-[58px] shrink-0 flex-col items-center gap-5 border-r border-slate-100 py-5">
        <img src={logoGreen.url} alt="" className="h-6 w-6 rounded-md" />
        {railIcons.map((Icon, i) => (
          <Icon
            key={i}
            className={`h-[18px] w-[18px] ${i === 1 ? "text-slate-700" : "text-slate-300"}`}
          />
        ))}
        <MoreHorizontal className="h-[18px] w-[18px] text-slate-300" />
      </div>

      {/* board body */}
      <div className="min-w-0 flex-1 px-6 pt-5">
        <h2 className="truncate text-[26px] font-semibold tracking-[-0.02em] text-slate-800">
          {scene.boardTitle}
        </h2>
        <div className="mt-3 flex items-center gap-6 border-b border-slate-100 pb-2 text-[13px]">
          <span className="border-b-2 border-slate-800 pb-2 font-medium text-slate-800">
            Main table
          </span>
          <span className="text-slate-400">Timeline</span>
          <span className="text-slate-400">Dashboard</span>
          <span className="text-slate-300">+</span>
        </div>

        <div className="mt-4 space-y-5">
          {scene.groups.map((group, gi) => (
            <div key={group.name}>
              <div className="mb-1.5 flex items-center justify-between pr-4 text-[13px]">
                <span className={`font-semibold ${group.tone}`}>{group.name}</span>
                <div className="hidden items-center gap-8 text-slate-400 sm:flex">
                  <span className="flex items-center gap-1">
                    Brief <Sparkles className="h-3 w-3 text-indigo-400" />
                  </span>
                  <span className="flex items-center gap-1">
                    Creatives <Sparkles className="h-3 w-3 text-indigo-400" />
                  </span>
                </div>
              </div>
              <div className={`overflow-hidden rounded-md border-l-[3px] ${scene.bar}/70`}>
                {group.rows.map((row, ri) => {
                  const order = gi * 7 + ri;
                  return (
                    <div
                      key={row}
                      style={{ transitionDelay: `${order * 55}ms` }}
                      className={`grid grid-cols-[minmax(0,1fr)_64px_64px] items-center border-b border-slate-100 bg-white px-3 py-[9px] text-[13px] transition-all duration-500 ${
                        rowsVisible ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                    >
                      <span className="truncate text-slate-600">{row}</span>
                      <span className="justify-self-center">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] bg-indigo-100">
                          <Sparkles className="h-2.5 w-2.5 text-indigo-500" />
                        </span>
                      </span>
                      <span className="justify-self-center">
                        <span
                          className={`inline-flex h-4 w-7 items-center justify-center rounded-[4px] transition ${
                            phase >= 6 && gi === 0
                              ? "bg-sky-100 text-sky-600"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {phase >= 6 && gi === 0 ? (
                            <Check className="h-2.5 w-2.5" />
                          ) : (
                            <span className="h-[3px] w-3 rounded-full bg-current opacity-50" />
                          )}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- the agent avatar + cursor moving across the board --- */

function AgentCursor({ scene, phase }: { scene: Scene; phase: number }) {
  const visible = phase >= 3 && phase < 8;
  const moved = phase >= 4;
  return (
    <div
      className={`pointer-events-none absolute z-20 transition-all duration-[900ms] ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${moved ? "left-[46%] top-[10%]" : "left-[30%] top-[42%]"}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`grid h-9 w-9 place-items-center rounded-lg ${scene.dot} shadow-lg ring-2 ring-white`}
        >
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <span className="rounded-md bg-slate-900/90 px-2 py-1 text-[11px] font-medium text-white shadow">
          {scene.agentName}
        </span>
      </div>
      <svg viewBox="0 0 24 24" className="ml-6 -mt-1 h-5 w-5 drop-shadow">
        <path d="M4 2 L4 20 L9 15 L12.5 22 L15.5 20.5 L12 14 L19 14 Z" fill="#2563eb" />
      </svg>
    </div>
  );
}

/* --- the agent working panel sliding over the board --- */

function AgentPanel({ scene, phase }: { scene: Scene; phase: number }) {
  const open = phase >= 4;
  const tiles = useMemo(() => [0, 1, 2, 3], []);
  return (
    <div
      className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-[62%] transition-all duration-700 ease-out ${
        open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
    >
      {/* white veil so the board fades under the panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/90 to-white" />

      <div className="relative flex h-full flex-col gap-5 px-7 pt-8">
        <p className="text-sm text-slate-400">
          {phase >= 8 ? "Done" : "Processing…"}
        </p>

        {/* step 1 */}
        <div>
          <p
            className={`text-[22px] font-medium tracking-[-0.01em] transition-all duration-500 ${
              phase >= 5 ? "translate-y-0 text-slate-800 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {scene.steps[0]}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {tiles.slice(0, 2).map((t) => (
              <Tile
                key={t}
                delay={t * 160}
                shown={phase >= 5}
                resolved={phase >= 6}
                tint={scene.tileTint}
                h="h-[110px]"
              />
            ))}
          </div>
        </div>

        {/* step 2 */}
        <div>
          <p
            className={`text-[22px] font-medium tracking-[-0.01em] transition-all duration-500 ${
              phase >= 7 ? "translate-y-0 text-slate-800 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {scene.steps[1]}
          </p>
          <div className="mt-4 flex items-start gap-3">
            {[
              "h-[92px] w-[86px]",
              "h-[74px] w-[110px]",
              "h-[64px] w-[40px]",
              "h-[52px] w-[104px]",
            ].map((size, i) => (
              <Tile
                key={size}
                delay={i * 140}
                shown={phase >= 7}
                resolved={phase >= 8}
                tint={scene.tileTint}
                h={size}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({
  shown,
  resolved,
  delay,
  tint,
  h,
}: {
  shown: boolean;
  resolved: boolean;
  delay: number;
  tint: string;
  h: string;
}) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`relative overflow-hidden rounded-lg transition-all duration-500 ${h} ${
        shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
      } ${resolved ? `bg-gradient-to-br ${tint}` : "bg-slate-100"}`}
    >
      {!resolved && (
        <div className="absolute inset-0 -translate-x-full animate-[tileshimmer_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white to-transparent" />
      )}
      <style>{`@keyframes tileshimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
}
