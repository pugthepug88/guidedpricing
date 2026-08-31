import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
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
import { SceneCalendarLive } from "@/components/v5/scene-calendar-live";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const MONO = '\"JetBrains Mono\", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;
const PORTRAIT_SHEET = "/concept/revenue/soft-autumn-portraits-v1.webp";
const SARAH_CELL = 5;
const SARAH_BG = "#B59672";
const STAGE_MS = [4500, 4000, 4700, 3500, 4100] as const;
const CONTACT_COLS = "26px minmax(0,1.85fr) 128px minmax(0,1.55fr) 92px 82px 112px";

type JourneyKey = "contacts" | "inbox" | "automations" | "opportunities" | "calendar";

type JourneyStage = {
  key: JourneyKey;
  action: string;
  module: string;
  title: string;
  subtitle: string;
};

const STAGES: JourneyStage[] = [
  { key: "contacts", action: "Capture", module: "Contacts", title: "Contacts", subtitle: "A website enquiry becomes one customer record" },
  { key: "inbox", action: "Respond", module: "Unified Inbox", title: "Unified Inbox", subtitle: "The conversation starts on the same customer record" },
  { key: "automations", action: "Follow up", module: "Automations", title: "Automations", subtitle: "No reply? Zapla keeps the next step moving" },
  { key: "opportunities", action: "Qualify", module: "Sales", title: "Sales", subtitle: "The opportunity moves from New Enquiry to Qualified" },
  { key: "calendar", action: "Book", module: "Calendar", title: "Calendar", subtitle: "The next step becomes a real appointment" },
];

function RevenueAvatar({ size = 30, className = "" }: { size?: number; className?: string }) {
  const column = SARAH_CELL % 6;
  const row = Math.floor(SARAH_CELL / 6);
  const backgroundPosition = `${(column / 5) * 100}% ${(row / 3) * 100}%`;
  return (
    <span
      aria-hidden="true"
      className={cn("block shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.06] shadow-[0_6px_18px_rgba(61,49,39,.10)]", className)}
      style={{
        width: size,
        height: size,
        backgroundColor: SARAH_BG,
        backgroundImage: `url(${PORTRAIT_SHEET})`,
        backgroundPosition,
        backgroundRepeat: "no-repeat",
        backgroundSize: "600% 400%",
      }}
    />
  );
}

function SarahIdentity({ detail, layoutId = "sarah-journey-identity" }: { detail?: string; layoutId?: string }) {
  return (
    <motion.div layoutId={layoutId} className="flex min-w-0 items-center gap-2.5" transition={{ layout: { duration: 0.78, ease: EASE } }}>
      <RevenueAvatar />
      <div className="min-w-0">
        <div className="truncate text-[12px] font-bold tracking-tight text-slate-900">Sarah Nguyen</div>
        {detail ? <div className="truncate text-[9.5px] font-medium text-[#8D857B]">{detail}</div> : null}
      </div>
    </motion.div>
  );
}

function WebsiteEnquiryCard() {
  return (
    <motion.div
      className="absolute right-[3.2%] top-[6%] z-50 w-[296px] max-w-[60%] overflow-hidden rounded-[16px] border border-[#DED6CB] bg-[#FFFEFC] shadow-[0_24px_54px_-30px_rgba(69,55,41,.34)]"
      initial={{ opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 22, scale: 0.92 }}
      transition={{ duration: 0.72, ease: EASE }}
    >
      <div className="flex items-center gap-2 border-b border-[#EEE7DD] bg-[#FBF8F3] px-3.5 py-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#EAE4DA] text-[#5F6C68]">
          <Globe2 className="h-3.5 w-3.5" />
        </span>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#5C5750]">New website enquiry</div>
          <div className="mt-0.5 text-[8.5px] font-semibold text-[#9A9186]">Submitted just now</div>
        </div>
        <motion.span
          className="ml-auto h-2 w-2 rounded-full bg-[#2563FF]"
          animate={{ boxShadow: ["0 0 0 0 rgba(37,99,255,.16)", "0 0 0 7px rgba(37,99,255,0)"] }}
          transition={{ duration: 1.45, repeat: Infinity }}
        />
      </div>
      <div className="p-3.5">
        <SarahIdentity detail="Website lead" />
        <div className="mt-3 rounded-[10px] bg-[#F5F1EB] px-3 py-2.5 text-[11px] font-medium leading-[1.5] text-[#675F56]">
          “Hi, I’m interested in getting a quote. Are you available Thursday afternoon?”
        </div>
        <div className="mt-3 flex items-center justify-between text-[9px] font-semibold text-[#9A9186]" style={{ fontFamily: MONO }}>
          <span>0412 481 229</span>
          <span>sarah.nguyen@email.com</span>
        </div>
      </div>
    </motion.div>
  );
}

function ContactRow({ animateIn = true }: { animateIn?: boolean }) {
  return (
    <motion.div
      className="absolute left-4 right-4 top-[74px] z-40 overflow-hidden border-y border-[#D8CDBF] bg-[#F3EBDD]/96 shadow-[0_10px_28px_-22px_rgba(78,61,44,.35)]"
      initial={animateIn ? { opacity: 0, y: -22, scaleY: 0.8 } : false}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      transition={{ duration: 0.78, delay: animateIn ? 1.55 : 0, ease: EASE }}
      style={{ transformOrigin: "top" }}
    >
      <div className="grid items-center gap-2 px-3 py-[9px]" style={{ gridTemplateColumns: CONTACT_COLS }}>
        <span className="flex h-[13px] w-[13px] rounded-[3px] border border-[#C9BEAF] bg-white" />
        <SarahIdentity detail="sarah.nguyen@email.com" />
        <span className="truncate text-[11px] tabular-nums text-slate-500">0412 481 229</span>
        <div className="flex min-w-0 flex-wrap gap-1">
          <span className="rounded-full bg-[#E7D8C5] px-2 py-[2px] text-[10px] font-bold text-[#6B5744]">New enquiry</span>
          <span className="rounded-full bg-[#DCE0CC] px-2 py-[2px] text-[10px] font-bold text-[#5E6651]">Website</span>
        </div>
        <span className="truncate text-[11px] font-semibold text-[#2563FF]">Just now</span>
        <span className="truncate text-[11px] text-slate-500">Website</span>
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#E7D8C5] px-2 py-[3px] text-[10px] font-bold text-[#6B5744]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563FF]" /> New
        </span>
      </div>
    </motion.div>
  );
}

function CreatedEvents({ animateIn = true }: { animateIn?: boolean }) {
  return (
    <motion.div
      className="absolute bottom-4 right-4 z-50 grid gap-1.5"
      initial={animateIn ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: animateIn ? 0.55 : 0, delay: animateIn ? 2.35 : 0, ease: EASE }}
    >
      {["Contact created", "Opportunity created · New Enquiry"].map((label, index) => (
        <div key={label} className="flex items-center gap-2 rounded-[9px] border border-[#DFD7CC] bg-[#FFFEFC]/95 px-3 py-2 text-[10px] font-semibold text-[#5F5A52] shadow-[0_12px_30px_-22px_rgba(72,57,43,.3)]">
          <span className={cn("flex h-4 w-4 items-center justify-center rounded-full", index === 0 ? "bg-[#DCE0CC] text-[#5C684F]" : "bg-[#EAF0FF] text-[#2563FF]")}>
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          {label}
        </div>
      ))}
    </motion.div>
  );
}

const ALL_MESSAGES = [
  { from: "them", text: "Hi, I’m interested in getting a quote. Are you available Thursday afternoon?", time: "10:42 AM" },
  { from: "us", text: "Hi Sarah, thanks for reaching out. Happy to help. What time works best for you?", time: "10:43 AM" },
  { from: "us", text: "Just following up in case you missed this. I can hold Thursday afternoon for you.", time: "12:43 PM", automated: true },
  { from: "them", text: "Thursday 2:30 works perfectly. Thanks!", time: "12:49 PM" },
] as const;

function InboxOverlay({ complete = false, animateMessages = true }: { complete?: boolean; animateMessages?: boolean }) {
  const messages = complete ? ALL_MESSAGES : ALL_MESSAGES.slice(0, 2);
  return (
    <>
      <motion.div
        className="absolute left-[124px] top-[38px] z-40 hidden w-[25%] min-w-[150px] rounded-lg bg-[#F3EBDD] px-1.5 py-[7px] shadow-[inset_2px_0_0_0_rgba(37,99,255,.86)] sm:flex lg:left-[142px] xl:w-[29%]"
        initial={animateMessages ? { opacity: 0, x: -10 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.58, ease: EASE }}
      >
        <div className="relative shrink-0">
          <RevenueAvatar size={28} />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-[#2563FF] text-white ring-1 ring-white">
            <MessageSquare className="h-2.5 w-2.5" />
          </span>
        </div>
        <div className="ml-2 min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[11px] font-bold text-slate-900">Sarah Nguyen</span>
            <span className="ml-auto text-[9px] font-semibold text-[#948B80]">{complete ? "12:49" : "Just now"}</span>
          </div>
          <div className="truncate text-[10px] text-[#746C63]">{complete ? "Thursday 2:30 works perfectly." : "Interested in getting a quote…"}</div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 top-[34px] z-30 flex w-[60%] min-w-0 flex-col bg-white sm:w-[58%] lg:w-[59%]"
        initial={animateMessages ? { opacity: 0, x: 16 } : false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.58, ease: EASE }}
      >
        <div className="flex items-center gap-2.5 border-b border-slate-200/80 px-3 py-2">
          <SarahIdentity detail="Website + SMS" />
          <div className="ml-auto text-right">
            <div className="text-[8px] font-bold uppercase tracking-[0.08em] text-slate-400">Owner</div>
            <div className="text-[10.5px] font-bold text-slate-600">James</div>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-14 pt-3">
          {messages.map((message, index) => (
            <motion.div
              key={`${message.time}-${index}`}
              className={cn("flex max-w-[86%]", message.from === "us" ? "ml-auto justify-end" : "")}
              initial={animateMessages ? { opacity: 0, y: 12, scale: 0.98 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: animateMessages ? 0.48 + index * 0.55 : 0, ease: EASE }}
            >
              <div>
                <div className={cn("rounded-2xl px-3 py-2 text-[10.5px] font-medium leading-[1.45]", message.from === "us" ? "rounded-br-sm bg-[#2563FF] text-white" : "rounded-bl-sm bg-[#F1ECE5] text-[#5F5951]")}>{message.text}</div>
                <div className={cn("mt-1 flex items-center gap-1 text-[8px] font-semibold text-slate-400", message.from === "us" ? "justify-end" : "")}>
                  {"automated" in message && message.automated ? <span className="rounded bg-[#EAF0FF] px-1 py-[1px] text-[#2563FF]">AUTOMATED</span> : null}
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

function LeadFollowupAutomation({ animateFlow = true }: { animateFlow?: boolean }) {
  const steps = [
    { icon: Globe2, title: "New website enquiry", detail: "Sarah Nguyen", tone: "warm" },
    { icon: Clock3, title: "No reply", detail: "Wait 2 hours", tone: "stone" },
    { icon: MessageSquare, title: "Send follow-up SMS", detail: "To Sarah", tone: "blue" },
    { icon: Check, title: "Reply detected", detail: "Thursday 2:30", tone: "sage" },
  ] as const;
  return (
    <div className="absolute inset-0 z-20 bg-[#FBFAF7]">
      <div className="flex h-[58px] items-center border-b border-[#E7E0D7] bg-white px-4">
        <div>
          <div className="text-[12px] font-black text-slate-900">Lead follow-up</div>
          <div className="mt-0.5 text-[7px] font-semibold text-[#999087]">Automation · New enquiry</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#DCE0CC] px-2.5 py-1 text-[8px] font-black text-[#5B6650]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#71805F]" /> ACTIVE
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[58px] overflow-hidden">
        <div className="absolute inset-0 opacity-[.38]" style={{ backgroundImage: "radial-gradient(#C9C0B4 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute left-5 top-5 w-[180px] rounded-[13px] border border-[#DED7CD] bg-white px-3 py-3 shadow-[0_14px_36px_-26px_rgba(60,48,38,.28)]">
          <div className="text-[7px] font-black uppercase tracking-[.12em] text-[#9A9187]">Customer</div>
          <div className="mt-2"><SarahIdentity detail="Website enquiry" /></div>
        </div>
        <div className="absolute left-[23%] right-[5%] top-1/2 flex -translate-y-1/2 items-center gap-2.5">
          {steps.map(({ icon: Icon, title, detail, tone }, index) => (
            <div key={title} className="flex min-w-0 flex-1 items-center gap-2.5">
              {index > 0 ? (
                <motion.span
                  className="h-[2px] w-5 shrink-0 origin-left bg-[#2563FF]/45"
                  initial={animateFlow ? { scaleX: 0 } : false}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: animateFlow ? 0.7 + index * 0.7 : 0, ease: EASE }}
                />
              ) : null}
              <motion.div
                className={cn(
                  "min-w-0 flex-1 rounded-[14px] border px-3 py-3 shadow-[0_14px_34px_-28px_rgba(63,50,40,.26)]",
                  tone === "warm" && "border-[#D8C9B7] bg-[#F5EADF]",
                  tone === "stone" && "border-[#DED7CE] bg-[#F2EEE8]",
                  tone === "blue" && "border-[#BFD0FF] bg-[#EEF3FF]",
                  tone === "sage" && "border-[#CBD0B9] bg-[#E7E9DB]",
                )}
                initial={animateFlow ? { opacity: 0, y: 14, scale: 0.97 } : false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.58, delay: animateFlow ? 0.35 + index * 0.72 : 0, ease: EASE }}
              >
                <span className={cn("flex h-7 w-7 items-center justify-center rounded-[8px]", tone === "blue" ? "bg-[#2563FF] text-white" : tone === "sage" ? "bg-[#C8CEB5] text-[#4E5946]" : "bg-white/75 text-[#6D655C]")}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="mt-2 truncate text-[10.5px] font-black text-slate-800">{title}</div>
                <div className="mt-0.5 truncate text-[8.5px] font-semibold text-[#8D857C]">{detail}</div>
              </motion.div>
            </div>
          ))}
        </div>
        <motion.div
          className="absolute bottom-5 right-5 rounded-[11px] border border-[#D9D1C7] bg-white px-3.5 py-2.5 shadow-[0_16px_36px_-24px_rgba(63,50,39,.28)]"
          initial={animateFlow ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: animateFlow ? 3.3 : 0, ease: EASE }}
        >
          <div className="text-[8px] font-black uppercase tracking-[.12em] text-[#82906F]">Reply detected</div>
          <div className="mt-1 text-[11px] font-semibold text-[#5C5750]">“Thursday 2:30 works perfectly.”</div>
        </motion.div>
      </div>
    </div>
  );
}

function SalesOverlay({ animateMove = true }: { animateMove?: boolean }) {
  return (
    <motion.div
      className="absolute z-40 rounded-xl border border-[#D8CDBF] bg-[#FFFEFC] p-2.5 shadow-[0_18px_34px_-22px_rgba(72,57,43,.34)]"
      style={{ top: 90, width: "18.2%", minWidth: 108 }}
      initial={animateMove ? { opacity: 0, y: -12, left: "1.6%", scale: 0.97 } : false}
      animate={{ opacity: 1, y: 0, left: "21.25%", scale: 1 }}
      transition={{ duration: animateMove ? 1.45 : 0, delay: animateMove ? 1.15 : 0, ease: EASE }}
    >
      <SarahIdentity detail="Qualified lead" />
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-[11.5px] font-extrabold tracking-tight text-slate-900">Quote request</span>
        <span className="truncate text-[8.5px] font-bold uppercase tracking-[0.08em] text-[#6B745D]">QUALIFIED</span>
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <span className="rounded-full bg-[#E7D8C5] px-1.5 py-[2px] text-[9.5px] font-bold text-[#6B5744]">Website</span>
        <span className="text-[9.5px] font-semibold text-slate-400">Sarah Nguyen</span>
      </div>
    </motion.div>
  );
}

function CalendarOverlay({ animateIn = true }: { animateIn?: boolean }) {
  return (
    <>
      <div className="absolute bottom-0 left-[34%] right-0 top-[34px] z-30 pointer-events-none bg-white/94" />
      <motion.div
        className="absolute left-[43.2%] top-[49%] z-40 w-[13.6%] min-w-[96px] rounded-[9px] border border-[#D8CDBF] border-l-[3px] border-l-[#2563FF] bg-[#FFFEFC] px-2 py-2 shadow-[0_12px_24px_-16px_rgba(71,56,43,.38)]"
        initial={animateIn ? { opacity: 0, y: -24, scale: 0.93 } : false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.82, delay: animateIn ? 0.7 : 0, ease: EASE }}
      >
        <SarahIdentity detail="2:30 · Consultation" />
      </motion.div>
      <div className="absolute right-[3%] top-[20%] z-40 w-[29%] rounded-[15px] border border-[#DDD5CA] bg-[#FFFEFC] p-3 shadow-[0_18px_44px_-28px_rgba(66,52,40,.34)]">
        <SarahIdentity detail="Thursday · 2:30 PM" />
        <div className="mt-3 grid grid-cols-2 gap-2 text-[8.5px] font-semibold text-[#857D73]">
          <div className="rounded-[9px] bg-[#F4EFE8] px-2.5 py-2"><div className="text-[6.5px] uppercase tracking-[.1em] text-[#A2988D]">Type</div><div className="mt-1 text-[#5C5750]">Consultation</div></div>
          <div className="rounded-[9px] bg-[#F4EFE8] px-2.5 py-2"><div className="text-[6.5px] uppercase tracking-[.1em] text-[#A2988D]">Status</div><div className="mt-1 text-[#5C684F]">Confirmed</div></div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-4 right-4 z-50 flex max-w-[285px] items-start gap-2.5 rounded-xl border border-[#D9D1C7] bg-[#FFFEFC]/97 px-3 py-2.5 shadow-[0_16px_34px_-22px_rgba(71,56,43,.32)]"
        initial={animateIn ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: animateIn ? 1.65 : 0, ease: EASE }}
      >
        <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#DCE0CC] text-[#5C684F]">
          <CalendarCheck className="h-3 w-3" />
        </span>
        <div>
          <div className="text-[11.5px] font-bold text-slate-900">Appointment booked</div>
          <div className="mt-0.5 text-[10px] font-medium text-[#81786F]">Sarah Nguyen · Thursday · 2:30 PM</div>
        </div>
      </motion.div>
    </>
  );
}

function BaseScene({ stage }: { stage: JourneyKey }) {
  const props: SceneProps = { phase: 0, elapsedMs: 0, reduced: true };
  let scene = null;
  if (stage === "contacts") scene = <SceneContacts {...props} />;
  else if (stage === "inbox") scene = <SceneInboxLive {...props} />;
  else if (stage === "opportunities") scene = <SceneSalesLive {...props} />;
  else if (stage === "calendar") scene = <SceneCalendarLive {...props} />;
  return scene ? <div className="absolute inset-0 saturate-[.72]">{scene}</div> : null;
}

function JourneyScene({ stageIndex, interactive = false }: { stageIndex: number; interactive?: boolean }) {
  const stage = STAGES[stageIndex];
  if (stage.key === "automations") return <LeadFollowupAutomation animateFlow={!interactive} />;
  return (
    <div className="absolute inset-0">
      <BaseScene stage={stage.key} />
      {stage.key === "contacts" ? (
        interactive ? <><ContactRow animateIn={false} /><CreatedEvents animateIn={false} /></> : <><WebsiteEnquiryCard /><ContactRow /><CreatedEvents /></>
      ) : null}
      {stage.key === "inbox" ? <InboxOverlay complete={interactive} animateMessages={!interactive} /> : null}
      {stage.key === "opportunities" ? <SalesOverlay animateMove={!interactive} /> : null}
      {stage.key === "calendar" ? <CalendarOverlay animateIn={!interactive} /> : null}
    </div>
  );
}

function JourneyRail({ activeIndex, onSelect }: { activeIndex: number; onSelect: (index: number) => void }) {
  return (
    <div className="relative mt-5 border-t border-[#DDD4C8] pt-5">
      <div className="pointer-events-none absolute left-[7%] right-[7%] top-[31px] h-px bg-[#D8CFC3]" />
      <motion.div
        className="pointer-events-none absolute left-[7%] top-[31px] h-px origin-left bg-[#2563FF]"
        animate={{ width: `${(activeIndex / (STAGES.length - 1)) * 86}%` }}
        transition={{ duration: 0.75, ease: EASE }}
      />
      <div className="relative grid grid-cols-5 gap-2">
        {STAGES.map((stage, index) => {
          const completed = index < activeIndex;
          const active = index === activeIndex;
          return (
            <button key={stage.key} type="button" onClick={() => onSelect(index)} className="group min-w-0 text-left">
              <span className={cn(
                "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[8px] font-black transition-colors",
                active && "border-[#2563FF] bg-[#2563FF] text-white",
                completed && "border-[#C3C9AF] bg-[#DCE0CC] text-[#56604D]",
                !active && !completed && "border-[#D5CCBF] bg-[#F7F4EE] text-[#998F83]",
              )}>{completed ? <Check className="h-3 w-3" strokeWidth={3} /> : `0${index + 1}`}</span>
              <div className="mt-2 min-w-0">
                <div className={cn("text-[8px] font-black uppercase tracking-[.12em]", active ? "text-[#2563FF]" : completed ? "text-[#69735D]" : "text-[#9B9288]")}>{stage.action}</div>
                <div className="mt-0.5 truncate text-[11px] font-semibold text-[#4E4A45]">{stage.module}</div>
              </div>
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
    if (inView && !hasStarted) {
      setHasStarted(true);
      setPlaying(true);
    }
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

  const selectStage = useCallback((index: number) => {
    setManualIndex(index);
    setPlaying(false);
  }, []);

  const replay = useCallback(() => {
    setManualIndex(null);
    setStageIndex(0);
    setReplayKey((key) => key + 1);
    setHasStarted(true);
    setPlaying(true);
  }, []);

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % STAGES.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + STAGES.length) % STAGES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = STAGES.length - 1;
    if (next < 0) return;
    event.preventDefault();
    selectStage(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="zapla-product-prototype-b" className="relative overflow-hidden bg-[#F7F4EE] px-5 py-20 text-[#0D1117] sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-[1240px]">
        <div className="max-w-[900px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#58706F]">The platform behind the follow-through</div>
          <h2 className="mt-5 text-[40px] leading-[0.98] tracking-[-0.05em] text-[#111318] sm:text-[58px] lg:text-[68px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            One platform. Every customer step connected.
          </h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.65] text-[#6D736F] sm:text-[17px]">
            Watch one enquiry become a customer record, a conversation, a qualified opportunity and a booked next step, without falling between disconnected tools.
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="rounded-[18px] border border-[#DDD5CA] bg-[#FFFEFC] p-1.5 shadow-[0_28px_70px_-38px_rgba(74,56,39,.34)]">
            <div className="h-[470px] sm:h-[560px] lg:h-[640px]">
              <AppShell activeKey={activeStage.key} title={activeStage.title} subtitle={activeStage.subtitle}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeStage.key}-${manualIndex == null ? `story-${replayKey}` : "manual"}`}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <JourneyScene stageIndex={activeIndex} interactive={manualIndex != null || !playing} />
                  </motion.div>
                </AnimatePresence>
              </AppShell>
            </div>
          </div>

          <div role="tablist" aria-label="Customer journey" className="relative">
            <JourneyRail activeIndex={activeIndex} onSelect={selectStage} />
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="max-w-[760px] text-[12px] leading-[1.55] text-[#7D756C]">
                One customer record follows the enquiry, conversation, follow-up, opportunity and booking. Click any step to inspect that same customer state.
              </p>
              <button type="button" onClick={replay} className="hidden shrink-0 items-center gap-1.5 text-[11px] font-semibold text-[#5F5A53] transition-colors hover:text-[#111318] sm:inline-flex">
                <RefreshCw className="h-3.5 w-3.5" /> Replay journey
              </button>
            </div>
            <div className="sr-only">
              {STAGES.map((stage, index) => (
                <button
                  key={stage.key}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  role="tab"
                  aria-selected={index === activeIndex}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  onClick={() => selectStage(index)}
                >{stage.module}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-[#DDD4C8] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[720px] text-[14px] leading-[1.6] text-[#766F66]">
            This is the pre-sale journey. Reviews, payments, reminders and reactivation continue later in the customer lifecycle.
          </p>
          <a href="https://zapla.io/booking" className="inline-flex h-[48px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
