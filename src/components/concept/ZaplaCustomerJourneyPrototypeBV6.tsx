import { useCallback, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  Globe2,
  MessageSquare,
  RefreshCw,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/v5/kit";
import { SceneContacts, type SceneProps } from "@/components/v5/scenes-a";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { useSceneClock } from "@/components/v5/use-scene-clock";
import { FACE } from "@/components/v5/faces";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const MONO = '\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_COLS = "26px minmax(0,1.85fr) 128px minmax(0,1.55fr) 92px 82px 112px";

const PHASES = [1700, 1900, 1900, 2400, 2300, 2100, 1900, 2200, 2600];

type JourneyKey = "contacts" | "opportunities" | "inbox" | "automations" | "calendar";

type SceneDef = {
  key: JourneyKey;
  label: string;
  title: string;
  subtitle: string;
  render: (props: SceneProps) => ReactNode;
};

const EXPLORE_SCENES: SceneDef[] = [
  {
    key: "contacts",
    label: "Contacts",
    title: "Contacts",
    subtitle: "Every enquiry becomes one customer record",
    render: (props) => <SceneContacts {...props} />,
  },
  {
    key: "inbox",
    label: "Unified Inbox",
    title: "Unified Inbox",
    subtitle: "Every message stays with the same customer",
    render: (props) => <SceneInboxLive {...props} />,
  },
  {
    key: "automations",
    label: "Automations",
    title: "Automations",
    subtitle: "Follow-up keeps moving without someone remembering",
    render: (props) => <SceneAutomationsLive {...props} />,
  },
  {
    key: "opportunities",
    label: "Sales",
    title: "Sales",
    subtitle: "The same customer becomes a visible opportunity",
    render: (props) => <SceneSalesLive {...props} />,
  },
  {
    key: "calendar",
    label: "Calendar",
    title: "Calendar",
    subtitle: "The next step becomes a booked appointment",
    render: (props) => <SceneCalendarLive {...props} />,
  },
];

const STORY_META: Array<{ key: JourneyKey; title: string; subtitle: string }> = [
  { key: "contacts", title: "Contacts", subtitle: "A new website enquiry arrives" },
  { key: "contacts", title: "Contacts", subtitle: "A customer record is created automatically" },
  { key: "opportunities", title: "Sales", subtitle: "The same enquiry appears in the pipeline" },
  { key: "inbox", title: "Unified Inbox", subtitle: "The conversation starts on the same customer record" },
  { key: "automations", title: "Automations", subtitle: "No reply? Follow-up happens automatically" },
  { key: "inbox", title: "Unified Inbox", subtitle: "Sarah replies to the follow-up" },
  { key: "opportunities", title: "Sales", subtitle: "The opportunity moves forward" },
  { key: "calendar", title: "Calendar", subtitle: "Sarah books the next step" },
  { key: "calendar", title: "Calendar", subtitle: "One customer. Every next step connected." },
];

function SarahAvatar({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={FACE.sophie}
      alt=""
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "shrink-0 rounded-full object-cover ring-2 ring-white outline outline-1 outline-[#CBB9A5]/55 shadow-[0_5px_14px_-9px_rgba(68,52,39,.45)]",
        className,
      )}
    />
  );
}

function SarahIdentity({ detail }: { detail?: string }) {
  return (
    <motion.div layoutId="prototype-b-sarah-identity" className="flex min-w-0 items-center gap-2.5">
      <SarahAvatar />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-bold tracking-tight text-slate-900">Sarah Nguyen</div>
        {detail ? <div className="truncate text-[9.5px] font-medium text-slate-400">{detail}</div> : null}
      </div>
    </motion.div>
  );
}

function WebsiteEnquiryCard({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="absolute right-[3.2%] top-[6%] z-50 w-[292px] max-w-[58%] overflow-hidden rounded-[17px] border border-slate-200 bg-white shadow-[0_24px_54px_-28px_rgba(15,23,42,.38)]"
      initial={reduced ? false : { opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-[#FBFCFF] px-3.5 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-blue-50 text-blue-600 ring-1 ring-blue-100">
          <Globe2 className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-700">New website enquiry</div>
          <div className="mt-0.5 text-[8.5px] font-semibold text-slate-400">Submitted just now</div>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(37,99,235,.1)]" />
      </div>
      <div className="p-3.5">
        <SarahIdentity detail="Website lead" />
        <div className="mt-3 rounded-[11px] bg-slate-50 px-3 py-2.5 text-[11px] font-medium leading-[1.5] text-slate-600 ring-1 ring-slate-100">
          “Hi, I’m interested in getting a quote. Are you available Thursday afternoon?”
        </div>
        <div className="mt-3 flex items-center justify-between text-[9px] font-semibold text-slate-400" style={{ fontFamily: MONO }}>
          <span>0412 481 229</span>
          <span>sarah.nguyen@email.com</span>
        </div>
      </div>
    </motion.div>
  );
}

function SarahContactRow({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="absolute left-4 right-4 top-[74px] z-40 overflow-hidden rounded-none border-y border-blue-200/80 bg-blue-50/95 shadow-[0_8px_24px_-18px_rgba(37,99,235,.4)] backdrop-blur-[1px]"
      initial={reduced ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
    >
      <div className="grid items-center gap-2 px-3 py-[9px]" style={{ gridTemplateColumns: CONTACT_COLS }}>
        <span className="flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border border-blue-300 bg-white" />
        <SarahIdentity detail="sarah.nguyen@email.com" />
        <span className="truncate text-[11px] tabular-nums text-slate-500">0412 481 229</span>
        <div className="flex min-w-0 flex-wrap gap-1">
          <span className="rounded-full bg-blue-100 px-2 py-[2px] text-[10px] font-bold text-blue-700">New enquiry</span>
          <span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] font-bold text-slate-600">Website</span>
        </div>
        <span className="truncate text-[11px] font-semibold text-blue-700">Just now</span>
        <span className="truncate text-[11px] text-slate-500">Website</span>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-100 px-2 py-[3px] text-[10px] font-bold text-blue-700">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> New
        </span>
      </div>
    </motion.div>
  );
}

function SarahDealCard({ stage, reduced }: { stage: "new" | "qualified"; reduced: boolean }) {
  return (
    <motion.div
      layoutId="prototype-b-sarah-deal"
      className="absolute z-40 rounded-xl border border-blue-300/80 bg-white p-2.5 shadow-[0_16px_30px_-18px_rgba(37,99,235,.48)]"
      style={{
        top: 90,
        left: stage === "new" ? "1.6%" : "21.25%",
        width: "18.2%",
        minWidth: 108,
      }}
      initial={reduced ? false : { opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: reduced ? 0 : 0.58, ease: EASE }}
    >
      <SarahIdentity detail={stage === "new" ? "Website enquiry" : "Qualified lead"} />
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[11.5px] font-extrabold tracking-tight text-slate-900">Quote request</span>
        <span className="truncate text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-600">
          {stage === "new" ? "JUST NOW" : "QUALIFIED"}
        </span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="rounded-full bg-sky-50 px-1.5 py-[2px] text-[9.5px] font-bold text-sky-700">Website</span>
        <span className="text-[9.5px] font-semibold text-slate-400">Sarah Nguyen</span>
      </div>
    </motion.div>
  );
}

function InboxSarahOverlay({ reply, reduced }: { reply: boolean; reduced: boolean }) {
  const messages = reply
    ? [
        { id: "m1", from: "them", text: "Hi, I’m interested in getting a quote. Are you available Thursday afternoon?", time: "10:42 AM" },
        { id: "m2", from: "us", text: "Hi Sarah, thanks for reaching out. Happy to help. What time works best for you?", time: "10:42 AM" },
        { id: "m3", from: "us", text: "Just following up in case you missed this. I can hold Thursday afternoon for you.", time: "12:42 PM", automated: true },
        { id: "m4", from: "them", text: "Thursday 2:30 works perfectly. Thanks!", time: "12:49 PM" },
      ]
    : [
        { id: "m1", from: "them", text: "Hi, I’m interested in getting a quote. Are you available Thursday afternoon?", time: "10:42 AM" },
        { id: "m2", from: "us", text: "Hi Sarah, thanks for reaching out. Happy to help. What time works best for you?", time: "10:42 AM" },
      ];

  return (
    <>
      <motion.div
        className="absolute left-[124px] top-[38px] z-40 hidden w-[25%] min-w-[150px] rounded-lg bg-blue-50 px-1.5 py-[7px] shadow-[inset_2px_0_0_0_rgba(37,99,255,.9)] sm:flex lg:left-[142px] xl:w-[29%]"
        initial={reduced ? false : { opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
      >
        <div className="relative shrink-0">
          <SarahAvatar size={28} />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-blue-600 text-white ring-1 ring-white">
            <MessageSquare className="h-2.5 w-2.5" />
          </span>
        </div>
        <div className="ml-2 min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[11px] font-bold text-slate-900">Sarah Nguyen</span>
            <span className="ml-auto shrink-0 text-[9px] font-semibold text-slate-400">Just now</span>
          </div>
          <div className="truncate text-[10px] text-slate-500">{reply ? "Thursday 2:30 works perfectly." : "Interested in getting a quote…"}</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 top-[34px] z-30 flex w-[60%] min-w-0 flex-col bg-white sm:w-[58%] lg:w-[59%]"
        initial={reduced ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
      >
        <div className="flex items-center gap-2.5 border-b border-slate-200/80 px-3 py-2">
          <SarahIdentity detail="Website + SMS" />
          <div className="ml-auto text-right">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.08em] text-slate-400">Owner</div>
            <div className="text-[10.5px] font-bold text-slate-600">James</div>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={reduced ? false : { opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.36, ease: EASE }}
              className={cn("flex max-w-[86%]", message.from === "us" ? "ml-auto justify-end" : "")}
            >
              <div>
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2 text-[10.5px] font-medium leading-[1.45]",
                    message.from === "us" ? "rounded-br-sm bg-blue-600 text-white" : "rounded-bl-sm bg-slate-100 text-slate-700",
                  )}
                >
                  {message.text}
                </div>
                <div className={cn("mt-1 flex items-center gap-1 text-[8px] font-semibold text-slate-400", message.from === "us" ? "justify-end" : "") }>
                  {message.automated ? <span className="rounded bg-blue-50 px-1 py-[1px] text-blue-700">AUTOMATED</span> : null}
                  <span>{message.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function AutomationSarahOverlay({ reduced }: { reduced: boolean }) {
  const steps = [
    { icon: Clock3, label: "No reply", detail: "Wait 2 hours", state: "done" },
    { icon: MessageSquare, label: "Send follow-up", detail: "SMS to Sarah", state: "active" },
    { icon: Check, label: "Customer replies", detail: "Continue journey", state: "idle" },
  ] as const;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-40 w-[430px] max-w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_30px_64px_-34px_rgba(15,23,42,.46)]"
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: reduced ? 0 : 0.48, ease: EASE }}
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <SarahIdentity detail="Lead follow-up · Website enquiry" />
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[3px] text-[9px] font-black text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ACTIVE
        </span>
      </div>
      <div className="mt-3 flex items-stretch gap-2">
        {steps.map(({ icon: Icon, label, detail, state }, index) => (
          <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
            {index > 0 ? <span className="h-px w-3 shrink-0 bg-slate-200" /> : null}
            <motion.div
              className={cn(
                "min-w-0 flex-1 rounded-[12px] border px-2.5 py-2.5",
                state === "active"
                  ? "border-blue-300 bg-blue-50 shadow-[0_0_0_3px_rgba(37,99,235,.08)]"
                  : state === "done"
                    ? "border-emerald-200 bg-emerald-50/60"
                    : "border-slate-200 bg-slate-50",
              )}
              animate={state === "active" && !reduced ? { boxShadow: ["0 0 0 3px rgba(37,99,235,.08)", "0 0 0 7px rgba(37,99,235,.03)", "0 0 0 3px rgba(37,99,235,.08)"] } : undefined}
              transition={{ duration: 1.7, repeat: state === "active" && !reduced ? Infinity : 0 }}
            >
              <span className={cn("flex h-6 w-6 items-center justify-center rounded-[8px]", state === "active" ? "bg-blue-600 text-white" : state === "done" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400") }>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="mt-2 truncate text-[10.5px] font-black text-slate-800">{label}</div>
              <div className="mt-0.5 truncate text-[8.5px] font-semibold text-slate-400">{detail}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CalendarSarahOverlay({ reduced }: { reduced: boolean }) {
  return (
    <>
      <motion.div
        className="absolute left-[43.2%] top-[49%] z-40 w-[13.2%] min-w-[92px] rounded-[9px] border border-slate-200 border-l-[3px] border-l-blue-500 bg-white px-2 py-2 shadow-[0_12px_24px_-16px_rgba(15,23,42,.42)]"
        initial={reduced ? false : { opacity: 0, y: -10, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.52, ease: EASE }}
      >
        <SarahIdentity detail="2:30 · Consultation" />
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-4 z-50 flex max-w-[280px] items-start gap-2.5 rounded-xl border border-slate-200 bg-white/96 px-3 py-2.5 shadow-[0_16px_34px_-18px_rgba(15,23,42,.35)] backdrop-blur"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: EASE, delay: reduced ? 0 : 0.25 }}
      >
        <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CalendarCheck className="h-3 w-3" />
        </span>
        <div>
          <div className="text-[11.5px] font-bold text-slate-900">Appointment booked</div>
          <div className="mt-0.5 text-[10px] font-medium text-slate-500">Sarah Nguyen · Thursday · 2:30 PM</div>
        </div>
      </motion.div>
    </>
  );
}

function StoryBackground({ phase, reduced }: { phase: number; reduced: boolean }) {
  const key = STORY_META[phase]?.key ?? "calendar";
  const props: SceneProps = { phase: 0, elapsedMs: 0, reduced };

  if (key === "contacts") return <SceneContacts {...props} />;
  if (key === "opportunities") return <SceneSalesLive {...props} />;
  if (key === "inbox") return <SceneInboxLive {...props} />;
  if (key === "automations") return <SceneAutomationsLive {...props} />;
  return <SceneCalendarLive {...props} />;
}

function StoryOverlay({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase === 0) return <WebsiteEnquiryCard reduced={reduced} />;
  if (phase === 1) return <SarahContactRow reduced={reduced} />;
  if (phase === 2) return <SarahDealCard stage="new" reduced={reduced} />;
  if (phase === 3) return <InboxSarahOverlay reply={false} reduced={reduced} />;
  if (phase === 4) return <AutomationSarahOverlay reduced={reduced} />;
  if (phase === 5) return <InboxSarahOverlay reply reduced={reduced} />;
  if (phase === 6) return <SarahDealCard stage="qualified" reduced={reduced} />;
  return <CalendarSarahOverlay reduced={reduced} />;
}

function StoryStage({ phase, reduced }: { phase: number; reduced: boolean }) {
  const key = `${STORY_META[phase]?.key ?? "calendar"}-${phase}`;
  return (
    <LayoutGroup id="prototype-b-customer-journey">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={key}
          className="absolute inset-0"
          initial={reduced ? false : { opacity: 0.45, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.18, x: -10 }}
          transition={{ duration: reduced ? 0 : 0.38, ease: EASE }}
        >
          <StoryBackground phase={phase} reduced={reduced} />
          <StoryOverlay phase={phase} reduced={reduced} />
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}

export function ZaplaCustomerJourneyPrototypeBV6() {
  const reduced = !!useReducedMotion();
  const [runKey, setRunKey] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { phase } = useSceneClock({
    durations: PHASES,
    paused: !playing,
    reduced,
    restartKey: runKey,
    onComplete: () => setPlaying(false),
  });

  const storyPhase = reduced ? PHASES.length - 1 : Math.min(phase, PHASES.length - 1);
  const storyMeta = STORY_META[storyPhase] ?? STORY_META[STORY_META.length - 1];
  const manualScene = manualIndex == null ? null : EXPLORE_SCENES[manualIndex];
  const activeKey = manualScene?.key ?? storyMeta.key;
  const title = manualScene?.title ?? storyMeta.title;
  const subtitle = manualScene?.subtitle ?? storyMeta.subtitle;

  const selectScene = useCallback((index: number) => {
    setManualIndex(index);
    setPlaying(false);
  }, []);

  const replayStory = useCallback(() => {
    setManualIndex(null);
    setRunKey((key) => key + 1);
    setPlaying(true);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % EXPLORE_SCENES.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + EXPLORE_SCENES.length) % EXPLORE_SCENES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = EXPLORE_SCENES.length - 1;
    if (next < 0) return;
    event.preventDefault();
    selectScene(next);
    tabRefs.current[next]?.focus();
  };

  const manualProps: SceneProps = { phase: 0, elapsedMs: 0, reduced };

  return (
    <section id="zapla-product-prototype-b" className="relative overflow-hidden border-t border-slate-200/70 bg-[#F7F8FA] px-5 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 shadow-sm" style={{ fontFamily: MONO }}>
          Comparison build · Prototype B
        </div>

        <div className="max-w-[920px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.19em] text-cyan-600">The platform behind the follow-through</div>
          <h2 className="mt-4 text-[38px] leading-[1.01] tracking-[-0.045em] text-[#111318] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            One platform. Every customer step connected.
          </h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-slate-500 sm:text-[17px]">
            Watch one real customer journey move through the same Zapla screens your team uses every day.
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="rounded-[20px] border border-slate-200/90 bg-white p-1.5 shadow-[0_42px_100px_-45px_rgba(15,23,42,0.36)]">
            <div className="h-[470px] sm:h-[560px] lg:h-[640px]">
              <AppShell activeKey={activeKey} title={title} subtitle={subtitle}>
                {manualScene ? (
                  <div className="absolute inset-0">{manualScene.render(manualProps)}</div>
                ) : (
                  <StoryStage phase={storyPhase} reduced={reduced} />
                )}
              </AppShell>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div role="tablist" aria-label="Customer journey modules" className="zapla-scroll-hide flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2">
              {EXPLORE_SCENES.map((scene, index) => {
                const active = scene.key === activeKey;
                return (
                  <button
                    key={scene.key}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectScene(index)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors",
                      active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800",
                    )}
                  >
                    {scene.label}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={replayStory}
              className="hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800 sm:inline-flex"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Replay journey
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[760px] text-[14px] leading-[1.6] text-slate-500">
            This comparison version keeps the original Contacts, Inbox, Automations, Sales and Calendar screens intact, then injects Sarah as new customer data moving between them.
          </p>
          <a href="https://zapla.io/booking" className="inline-flex h-[48px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
