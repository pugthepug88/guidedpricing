import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/v5/kit";
import { AutomationScene } from "./journey-v6/AutomationScene";
import { CalendarScene } from "./journey-v6/CalendarScene";
import { CaptureScene } from "./journey-v6/CaptureScene";
import { InboxScene } from "./journey-v6/InboxScene";
import { SalesScene } from "./journey-v6/SalesScene";
import { DISPLAY, EASE } from "./journey-v6/shared";

const STAGE_MS = [4600, 4200, 4800, 4000, 3800] as const;

type JourneyKey = "contacts" | "inbox" | "automations" | "opportunities" | "calendar";
type JourneyStage = { key: JourneyKey; action: string; module: string; title: string; subtitle: string };

const STAGES: JourneyStage[] = [
  { key: "contacts", action: "Capture", module: "Contacts", title: "Contacts", subtitle: "A website enquiry becomes one customer record" },
  { key: "inbox", action: "Respond", module: "Unified Inbox", title: "Unified Inbox", subtitle: "An immediate reply starts the conversation" },
  { key: "automations", action: "Follow up", module: "Automations", title: "Automations", subtitle: "If the lead goes quiet, Zapla keeps the next step moving" },
  { key: "opportunities", action: "Progress", module: "Sales", title: "Sales", subtitle: "The same opportunity moves from New Enquiry to Follow-up" },
  { key: "calendar", action: "Book", module: "Calendar", title: "Calendar", subtitle: "Sarah’s confirmed time lands in the schedule" },
];

function JourneyScene({ stageIndex, interactive = false }: { stageIndex: number; interactive?: boolean }) {
  const stage = STAGES[stageIndex];
  if (stage.key === "contacts") return <CaptureScene interactive={interactive} />;
  if (stage.key === "inbox") return <InboxScene interactive={interactive} />;
  if (stage.key === "automations") return <AutomationScene interactive={interactive} />;
  if (stage.key === "opportunities") return <SalesScene interactive={interactive} />;
  return <CalendarScene interactive={interactive} />;
}

function JourneyRail({ activeIndex, onSelect }: { activeIndex: number; onSelect: (index: number) => void }) {
  const progress = (activeIndex / (STAGES.length - 1)) * 80;
  return (
    <div className="relative mt-5 pt-4">
      <div className="pointer-events-none absolute left-[10%] right-[10%] top-[28px] h-px bg-[#D8CFC3]" />
      <motion.div className="pointer-events-none absolute left-[10%] top-[28px] h-[2px] origin-left bg-[#2563FF]" animate={{ width: `${progress}%` }} transition={{ duration: 0.75, ease: EASE }} />
      <div className="relative grid grid-cols-5 gap-2">
        {STAGES.map((stage, index) => {
          const completed = index < activeIndex;
          const active = index === activeIndex;
          return (
            <button key={stage.key} type="button" onClick={() => onSelect(index)} className="group flex min-w-0 flex-col items-center text-center">
              <span className={cn("relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[8px] font-black transition-colors", active && "border-[#2563FF] bg-[#2563FF] text-white", completed && "border-[#BFC6AE] bg-[#DCE0CC] text-[#56604D]", !active && !completed && "border-[#D5CCBF] bg-[#F7F4EE] text-[#998F83]")}>{completed ? <Check className="h-3 w-3" strokeWidth={3} /> : `0${index + 1}`}</span>
              <div className="mt-2 min-w-0"><div className={cn("text-[8px] font-black uppercase tracking-[.12em]", active ? "text-[#2563FF]" : completed ? "text-[#69735D]" : "text-[#9B9288]")}>{stage.action}</div><div className="mt-0.5 truncate text-[11px] font-semibold text-[#4E4A45]">{stage.module}</div></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ZaplaCustomerJourneyPrototypeSmoothV6() {
  const reduced = !!useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: false });
  const [stageIndex, setStageIndex] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (reduced) return;
    if (inView && !hasStarted) { setHasStarted(true); setPlaying(true); }
  }, [inView, hasStarted, reduced]);

  useEffect(() => {
    if (!playing || !inView || manualIndex != null || reduced || stageIndex >= STAGES.length - 1) return;
    const timer = window.setTimeout(() => setStageIndex((index) => Math.min(index + 1, STAGES.length - 1)), STAGE_MS[stageIndex]);
    return () => window.clearTimeout(timer);
  }, [playing, inView, manualIndex, reduced, stageIndex, replayKey]);

  useEffect(() => {
    if (stageIndex === STAGES.length - 1 && playing) {
      const timer = window.setTimeout(() => setPlaying(false), STAGE_MS[STAGES.length - 1]);
      return () => window.clearTimeout(timer);
    }
  }, [stageIndex, playing]);

  const activeIndex = manualIndex ?? stageIndex;
  const activeStage = STAGES[activeIndex];
  const selectStage = useCallback((index: number) => { setManualIndex(index); setPlaying(false); }, []);
  const replay = useCallback(() => { setManualIndex(null); setStageIndex(0); setReplayKey((key) => key + 1); setHasStarted(true); setPlaying(true); }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % STAGES.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + STAGES.length) % STAGES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = STAGES.length - 1;
    if (next < 0) return;
    event.preventDefault(); selectStage(next); tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="zapla-product-prototype-b" className="relative overflow-hidden bg-[#F7F4EE] px-5 py-20 text-[#0D1117] sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="max-w-[900px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">The platform behind the follow-through</div>
          <h2 className="mt-5 text-[40px] leading-[0.98] tracking-[-0.05em] text-[#111318] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>One platform. Every customer step connected.</h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-[#6D736F] sm:text-[17px]">Watch one enquiry become a customer record, a conversation, an active opportunity and a booked next step, without falling between disconnected tools.</p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="rounded-[18px] border border-[#DDD5CA] bg-white p-1.5 shadow-[0_28px_70px_-38px_rgba(74,56,39,.34)]">
            <div className="h-[470px] sm:h-[560px] lg:h-[640px]">
              <AppShell activeKey={activeStage.key} title={activeStage.title} subtitle={activeStage.subtitle}>
                <div className="absolute inset-0"><JourneyScene key={`${activeStage.key}-${manualIndex != null ? "manual" : `story-${replayKey}`}`} stageIndex={activeIndex} interactive={manualIndex != null || !playing} /></div>
              </AppShell>
            </div>
          </div>

          <div role="tablist" aria-label="Customer journey" className="relative">
            <JourneyRail activeIndex={activeIndex} onSelect={selectStage} />
            <div className="mt-5 flex items-center justify-between gap-4"><p className="max-w-[760px] text-[12px] leading-[1.55] text-[#7D756C]">Sarah stays the same customer record from first enquiry through follow-up, opportunity and booking.</p><button type="button" onClick={replay} className="hidden shrink-0 items-center gap-1.5 text-[11px] font-semibold text-[#5F5A53] transition-colors hover:text-[#111318] sm:inline-flex"><RefreshCw className="h-3.5 w-3.5" /> Replay journey</button></div>
            <div className="sr-only">{STAGES.map((stage, index) => <button key={stage.key} ref={(element) => { tabRefs.current[index] = element; }} role="tab" aria-selected={index === activeIndex} tabIndex={index === activeIndex ? 0 : -1} onKeyDown={(event) => onTabKeyDown(event, index)} onClick={() => selectStage(index)}>{stage.module}</button>)}</div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-[#DDD4C8] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[720px] text-[14px] leading-[1.6] text-[#766F66]">One customer record stays intact from first enquiry to booked next step.</p>
          <a href="https://zapla.io/booking" className="inline-flex h-[48px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white">Book a Call <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}
