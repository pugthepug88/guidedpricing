import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock3,
  Globe2,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/v5/kit";
import { SceneContacts, type SceneProps } from "@/components/v5/scenes-a";
import { SceneSalesLive } from "@/components/v5/scene-sales-live";
import { SceneInboxLive } from "@/components/v5/scene-inbox-live";
import { SceneAutomationsLive } from "@/components/v5/scene-automations-live";
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";
import { FACE } from "@/components/v5/faces";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const MONO = '\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;
const CONTACT_COLS = "26px minmax(0,1.85fr) 128px minmax(0,1.55fr) 92px 82px 112px";

const BEAT_MS = [1700, 1550, 1750, 2300, 2200, 2050, 2100, 2200, 2600] as const;

type JourneyKey = "contacts" | "opportunities" | "inbox" | "automations" | "calendar";

type SceneDef = {
  key: JourneyKey;
  label: string;
  title: string;
  subtitle: string;
  render: (props: SceneProps) => ReactNode;
};

const EXPLORE_SCENES: SceneDef[] = [
  { key: "contacts", label: "Contacts", title: "Contacts", subtitle: "Every enquiry becomes one customer record", render: (p) => <SceneContacts {...p} /> },
  { key: "inbox", label: "Unified Inbox", title: "Unified Inbox", subtitle: "Every message stays with the same customer", render: (p) => <SceneInboxLive {...p} /> },
  { key: "automations", label: "Automations", title: "Automations", subtitle: "Follow-up keeps moving without someone remembering", render: (p) => <SceneAutomationsLive {...p} /> },
  { key: "opportunities", label: "Sales", title: "Sales", subtitle: "The same customer becomes a visible opportunity", render: (p) => <SceneSalesLive {...p} /> },
  { key: "calendar", label: "Calendar", title: "Calendar", subtitle: "The next step becomes a booked appointment", render: (p) => <SceneCalendarLive {...p} /> },
];

const STORY = [
  { key: "contacts" as const, title: "Contacts", subtitle: "A new website enquiry arrives" },
  { key: "contacts" as const, title: "Contacts", subtitle: "A customer record is created automatically" },
  { key: "opportunities" as const, title: "Sales", subtitle: "The same enquiry appears in New Enquiry" },
  { key: "inbox" as const, title: "Unified Inbox", subtitle: "The conversation starts on the same customer record" },
  { key: "automations" as const, title: "Automations", subtitle: "No reply? Follow-up happens automatically" },
  { key: "inbox" as const, title: "Unified Inbox", subtitle: "Sarah replies to the follow-up" },
  { key: "opportunities" as const, title: "Sales", subtitle: "The opportunity moves from New Enquiry to Qualified" },
  { key: "calendar" as const, title: "Calendar", subtitle: "Sarah books the next step" },
  { key: "calendar" as const, title: "Calendar", subtitle: "One customer. Every next step connected." },
] as const;

function SarahAvatar({ size = 30 }: { size?: number }) {
  return (
    <img
      src={FACE.sophie}
      alt=""
      aria-hidden
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover ring-2 ring-white outline outline-1 outline-[#CBB9A5]/55 shadow-[0_5px_14px_-9px_rgba(68,52,39,.45)]"
    />
  );
}

function SarahIdentity({ detail }: { detail?: string }) {
  return (
    <motion.div layoutId="smooth-sarah-identity" className="flex min-w-0 items-center gap-2.5" transition={{ layout: { duration: 0.58, ease: EASE } }}>
      <SarahAvatar />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-bold tracking-tight text-slate-900">Sarah Nguyen</div>
        {detail ? <div className="truncate text-[9.5px] font-medium text-slate-400">{detail}</div> : null}
      </div>
    </motion.div>
  );
}

function WebsiteEnquiryCard() {
  return (
    <motion.div
      className="absolute right-[3.2%] top-[6%] z-50 w-[292px] max-w-[58%] overflow-hidden rounded-[17px] border border-slate-200 bg-white shadow-[0_24px_54px_-28px_rgba(15,23,42,.38)]"
      initial={{ opacity: 0, y: -16, scale: 0.965 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.94 }}
      transition={{ duration: 0.52, ease: EASE }}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-[#FBFCFF] px-3.5 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-blue-50 text-blue-600 ring-1 ring-blue-100"><Globe2 className="h-3.5 w-3.5" /></span>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-700">New website enquiry</div>
          <div className="mt-0.5 text-[8.5px] font-semibold text-slate-400">Submitted just now</div>
        </div>
        <motion.span className="ml-auto h-2 w-2 rounded-full bg-blue-500" animate={{ boxShadow: ["0 0 0 0 rgba(37,99,235,.12)", "0 0 0 7px rgba(37,99,235,0)"] }} transition={{ duration: 1.25, repeat: Infinity }} />
      </div>
      <div className="p-3.5">
        <SarahIdentity detail="Website lead" />
        <div className="mt-3 rounded-[11px] bg-slate-50 px-3 py-2.5 text-[11px] font-medium leading-[1.5] text-slate-600 ring-1 ring-slate-100">“Hi, I’m interested in getting a quote. Are you available Thursday afternoon?”</div>
        <div className="mt-3 flex items-center justify-between text-[9px] font-semibold text-slate-400" style={{ fontFamily: MONO }}><span>0412 481 229</span><span>sarah.nguyen@email.com</span></div>
      </div>
    </motion.div>
  );
}

function ContactInsert() {
  return (
    <motion.div
      className="absolute left-4 right-4 top-[74px] z-40 overflow-hidden border-y border-blue-200/80 bg-blue-50/95 shadow-[0_8px_24px_-18px_rgba(37,99,235,.4)]"
      initial={{ opacity: 0, y: -26, scaleY: 0.72 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.58, ease: EASE }}
      style={{ transformOrigin: "top" }}
    >
      <div className="grid items-center gap-2 px-3 py-[9px]" style={{ gridTemplateColumns: CONTACT_COLS }}>
        <span className="flex h-[13px] w-[13px] rounded-[3px] border border-blue-300 bg-white" />
        <SarahIdentity detail="sarah.nguyen@email.com" />
        <span className="truncate text-[11px] tabular-nums text-slate-500">0412 481 229</span>
        <div className="flex min-w-0 flex-wrap gap-1"><span className="rounded-full bg-blue-100 px-2 py-[2px] text-[10px] font-bold text-blue-700">New enquiry</span><span className="rounded-full bg-slate-100 px-2 py-[2px] text-[10px] font-bold text-slate-600">Website</span></div>
        <span className="truncate text-[11px] font-semibold text-blue-700">Just now</span>
        <span className="truncate text-[11px] text-slate-500">Website</span>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-100 px-2 py-[3px] text-[10px] font-bold text-blue-700"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> New</span>
      </div>
    </motion.div>
  );
}

function SalesInsert({ moveToQualified = false }: { moveToQualified?: boolean }) {
  return (
    <motion.div
      layoutId="smooth-sarah-deal"
      className="absolute z-40 rounded-xl border border-blue-300/80 bg-white p-2.5 shadow-[0_16px_30px_-18px_rgba(37,99,235,.48)]"
      style={{ top: 90, width: "18.2%", minWidth: 108 }}
      initial={{ opacity: 0, y: -16, left: "1.6%", scale: 0.96 }}
      animate={{ opacity: 1, y: 0, left: moveToQualified ? "21.25%" : "1.6%", scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: moveToQualified ? 1.12 : 0.55, delay: moveToQualified ? 0.28 : 0, ease: EASE }}
    >
      <SarahIdentity detail={moveToQualified ? "Qualified lead" : "Website enquiry"} />
      <div className="mt-2 flex items-center justify-between gap-2"><span className="text-[11.5px] font-extrabold tracking-tight text-slate-900">Quote request</span><span className="truncate text-[8.5px] font-bold uppercase tracking-[0.08em] text-blue-600">{moveToQualified ? "QUALIFIED" : "JUST NOW"}</span></div>
      <div className="mt-1.5 flex items-center gap-1.5"><span className="rounded-full bg-sky-50 px-1.5 py-[2px] text-[9.5px] font-bold text-sky-700">Website</span><span className="text-[9.5px] font-semibold text-slate-400">Sarah Nguyen</span></div>
    </motion.div>
  );
}

const FIRST_MESSAGES = [
  { from: "them", text: "Hi, I’m interested in getting a quote. Are you available Thursday afternoon?", time: "10:42 AM" },
  { from: "us", text: "Hi Sarah, thanks for reaching out. Happy to help. What time works best for you?", time: "10:42 AM" },
] as const;

function InboxOverlay({ reply = false }: { reply?: boolean }) {
  const messages = reply
    ? [...FIRST_MESSAGES, { from: "us", text: "Just following up in case you missed this. I can hold Thursday afternoon for you.", time: "12:42 PM", automated: true }, { from: "them", text: "Thursday 2:30 works perfectly. Thanks!", time: "12:49 PM" }]
    : FIRST_MESSAGES;

  return (
    <>
      <motion.div className="absolute left-[124px] top-[38px] z-40 hidden w-[25%] min-w-[150px] rounded-lg bg-blue-50 px-1.5 py-[7px] shadow-[inset_2px_0_0_0_rgba(37,99,255,.9)] sm:flex lg:left-[142px] xl:w-[29%]" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.44, ease: EASE }}>
        <div className="relative shrink-0"><SarahAvatar size={28} /><span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-blue-600 text-white ring-1 ring-white"><MessageSquare className="h-2.5 w-2.5" /></span></div>
        <div className="ml-2 min-w-0 flex-1"><div className="flex items-center gap-1.5"><span className="truncate text-[11px] font-bold text-slate-900">Sarah Nguyen</span><span className="ml-auto text-[9px] font-semibold text-slate-400">Just now</span></div><div className="truncate text-[10px] text-slate-500">{reply ? "Thursday 2:30 works perfectly." : "Interested in getting a quote…"}</div></div>
      </motion.div>

      <motion.div className="absolute bottom-0 right-0 top-[34px] z-30 flex w-[60%] min-w-0 flex-col bg-white sm:w-[58%] lg:w-[59%]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.48, ease: EASE }}>
        <div className="flex items-center gap-2.5 border-b border-slate-200/80 px-3 py-2"><SarahIdentity detail="Website + SMS" /><div className="ml-auto text-right"><div className="text-[8.5px] font-bold uppercase tracking-[0.08em] text-slate-400">Owner</div><div className="text-[10.5px] font-bold text-slate-600">James</div></div></div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 py-3">
          {messages.map((m, index) => (
            <motion.div key={`${m.time}-${index}`} className={cn("flex max-w-[86%]", m.from === "us" ? "ml-auto justify-end" : "")} initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, delay: 0.18 + index * 0.28, ease: EASE }}>
              <div><div className={cn("rounded-2xl px-3 py-2 text-[10.5px] font-medium leading-[1.45]", m.from === "us" ? "rounded-br-sm bg-blue-600 text-white" : "rounded-bl-sm bg-slate-100 text-slate-700")}>{m.text}</div><div className={cn("mt-1 flex items-center gap-1 text-[8px] font-semibold text-slate-400", m.from === "us" ? "justify-end" : "")}>{"automated" in m && m.automated ? <span className="rounded bg-blue-50 px-1 py-[1px] text-blue-700">AUTOMATED</span> : null}<span>{m.time}</span></div></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function AutomationOverlay() {
  const steps = [
    { icon: Clock3, title: "No reply", body: "Wait 2 hours", delay: 0.18, tone: "done" },
    { icon: MessageSquare, title: "Send follow-up", body: "SMS to Sarah", delay: 0.72, tone: "active" },
    { icon: Check, title: "Reply detected", body: "Continue journey", delay: 1.32, tone: "idle" },
  ] as const;
  return (
    <motion.div className="absolute left-1/2 top-1/2 z-40 w-[430px] max-w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-slate-200 bg-white p-4 shadow-[0_30px_64px_-34px_rgba(15,23,42,.46)]" initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.48, ease: EASE }}>
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3"><SarahIdentity detail="Lead follow-up · Website enquiry" /><span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[3px] text-[9px] font-black text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ACTIVE</span></div>
      <div className="mt-3 flex items-stretch gap-2">
        {steps.map(({ icon: Icon, title, body, delay, tone }, index) => (
          <div key={title} className="flex min-w-0 flex-1 items-center gap-2">{index > 0 ? <motion.span className="h-px w-3 shrink-0 bg-blue-300" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.35, delay: delay - 0.18, ease: EASE }} /> : null}<motion.div className={cn("min-w-0 flex-1 rounded-[12px] border px-2.5 py-2.5", tone === "active" ? "border-blue-300 bg-blue-50" : tone === "done" ? "border-emerald-200 bg-emerald-50/60" : "border-slate-200 bg-slate-50")} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.42, delay, ease: EASE }}><span className={cn("flex h-6 w-6 items-center justify-center rounded-[8px]", tone === "active" ? "bg-blue-600 text-white" : tone === "done" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400")}><Icon className="h-3.5 w-3.5" /></span><div className="mt-2 truncate text-[10.5px] font-black text-slate-800">{title}</div><div className="mt-0.5 truncate text-[8.5px] font-semibold text-slate-400">{body}</div></motion.div></div>
        ))}
      </div>
    </motion.div>
  );
}

function CalendarOverlay({ final = false }: { final?: boolean }) {
  return (
    <>
      <motion.div className="absolute left-[43.2%] top-[49%] z-40 w-[13.2%] min-w-[92px] rounded-[9px] border border-slate-200 border-l-[3px] border-l-blue-500 bg-white px-2 py-2 shadow-[0_12px_24px_-16px_rgba(15,23,42,.42)]" initial={{ opacity: 0, y: -28, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}><SarahIdentity detail="2:30 · Consultation" /></motion.div>
      <motion.div className="absolute bottom-4 right-4 z-50 flex max-w-[280px] items-start gap-2.5 rounded-xl border border-slate-200 bg-white/96 px-3 py-2.5 shadow-[0_16px_34px_-18px_rgba(15,23,42,.35)] backdrop-blur" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.45, ease: EASE }}><span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CalendarCheck className="h-3 w-3" /></span><div><div className="text-[11.5px] font-bold text-slate-900">Appointment booked</div><div className="mt-0.5 text-[10px] font-medium text-slate-500">Sarah Nguyen · Thursday · 2:30 PM</div></div></motion.div>
      {final ? <motion.div className="absolute inset-x-0 bottom-[17%] z-50 mx-auto w-fit rounded-full border border-slate-200 bg-white/96 px-4 py-2 text-[11px] font-black tracking-tight text-slate-800 shadow-[0_14px_34px_-20px_rgba(15,23,42,.32)]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.8, ease: EASE }}>One customer · every next step connected</motion.div> : null}
    </>
  );
}

function StaticScene({ sceneKey }: { sceneKey: JourneyKey }) {
  const props: SceneProps = { phase: 0, elapsedMs: 0, reduced: true };
  if (sceneKey === "contacts") return <SceneContacts {...props} />;
  if (sceneKey === "opportunities") return <SceneSalesLive {...props} />;
  if (sceneKey === "inbox") return <SceneInboxLive {...props} />;
  if (sceneKey === "automations") return <SceneAutomationsLive {...props} />;
  return <SceneCalendarLive {...props} />;
}

function StoryOverlay({ beat }: { beat: number }) {
  if (beat === 0) return <WebsiteEnquiryCard />;
  if (beat === 1) return <ContactInsert />;
  if (beat === 2) return <SalesInsert />;
  if (beat === 3) return <InboxOverlay />;
  if (beat === 4) return <AutomationOverlay />;
  if (beat === 5) return <InboxOverlay reply />;
  if (beat === 6) return <SalesInsert moveToQualified />;
  if (beat === 7) return <CalendarOverlay />;
  return <CalendarOverlay final />;
}

export function ZaplaCustomerJourneyPrototypeSmoothV6() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.32 });
  const [beat, setBeat] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [replayKey, setReplayKey] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const started = inView || reduced;

  useEffect(() => {
    if (!started || manualIndex != null || reduced || beat >= STORY.length - 1) return;
    const timer = window.setTimeout(() => setBeat((current) => Math.min(current + 1, STORY.length - 1)), BEAT_MS[beat]);
    return () => window.clearTimeout(timer);
  }, [started, manualIndex, reduced, beat, replayKey]);

  const storyMeta = STORY[beat];
  const manualScene = manualIndex == null ? null : EXPLORE_SCENES[manualIndex];
  const activeKey = manualScene?.key ?? storyMeta.key;
  const title = manualScene?.title ?? storyMeta.title;
  const subtitle = manualScene?.subtitle ?? storyMeta.subtitle;
  const manualProps: SceneProps = { phase: 0, elapsedMs: 0, reduced: true };

  const selectScene = useCallback((index: number) => setManualIndex(index), []);
  const replay = useCallback(() => { setManualIndex(null); setBeat(0); setReplayKey((key) => key + 1); }, []);

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

  return (
    <section ref={sectionRef} id="zapla-product-prototype-b" className="relative overflow-hidden border-t border-slate-200/70 bg-[#F7F8FA] px-5 py-20 sm:px-8 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400 shadow-sm" style={{ fontFamily: MONO }}>Comparison build · Prototype B</div>
        <div className="max-w-[920px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.19em] text-cyan-600">The platform behind the follow-through</div>
          <h2 className="mt-4 text-[38px] leading-[1.01] tracking-[-0.045em] text-[#111318] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>One platform. Every customer step connected.</h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-slate-500 sm:text-[17px]">Watch one customer move through the same Zapla screens your team uses every day.</p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="rounded-[20px] border border-slate-200/90 bg-white p-1.5 shadow-[0_42px_100px_-45px_rgba(15,23,42,0.36)]">
            <div className="h-[470px] sm:h-[560px] lg:h-[640px]">
              <AppShell activeKey={activeKey} title={title} subtitle={subtitle}>
                {manualScene ? (
                  <div className="absolute inset-0">{manualScene.render(manualProps)}</div>
                ) : (
                  <LayoutGroup id={`smooth-customer-journey-${replayKey}`}>
                    <AnimatePresence initial={false} mode="sync">
                      <motion.div key={storyMeta.key} className="absolute inset-0" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} exit={{ opacity: 0.2 }} transition={{ duration: 0.32, ease: EASE }}><StaticScene sceneKey={storyMeta.key} /></motion.div>
                    </AnimatePresence>
                    <AnimatePresence initial={false} mode="sync"><motion.div key={`overlay-${beat}-${replayKey}`} className="absolute inset-0" exit={{ opacity: 0 }} transition={{ duration: 0.22 }}><StoryOverlay beat={beat} /></motion.div></AnimatePresence>
                  </LayoutGroup>
                )}
              </AppShell>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div role="tablist" aria-label="Customer journey modules" className="zapla-scroll-hide flex min-w-0 flex-1 gap-2 overflow-x-auto pb-2">
              {EXPLORE_SCENES.map((scene, index) => {
                const active = scene.key === activeKey;
                return <button key={scene.key} ref={(el) => { tabRefs.current[index] = el; }} type="button" role="tab" aria-selected={active} tabIndex={active ? 0 : -1} onClick={() => selectScene(index)} onKeyDown={(event) => onTabKeyDown(event, index)} className={cn("shrink-0 rounded-full border px-4 py-2 text-[12px] font-semibold transition-colors", active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800")}>{scene.label}</button>;
              })}
            </div>
            <button type="button" onClick={replay} className="hidden shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-semibold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-800 sm:inline-flex"><RefreshCw className="h-3.5 w-3.5" /> Replay journey</button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[760px] text-[14px] leading-[1.6] text-slate-500">This comparison version keeps the original Contacts, Inbox, Automations, Sales and Calendar screens intact, then adds Sarah as new customer data moving through them.</p>
          <a href="https://zapla.io/booking" className="inline-flex h-[48px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white">Book a Call <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
