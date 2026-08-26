import { useRef, useState } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  MessageSquareText,
  RefreshCw,
  Route,
  Sparkles,
  Star,
  UserRoundCheck,
  UsersRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

const DISPLAY = '\"Inter Tight\", \"Outfit\", \"Manrope\", system-ui, sans-serif';
const BOOK_URL = "https://zapla.io/booking";
const V5 = "/concept/cinematic-v5";

type Outcome = {
  key: string;
  label: string;
  eyebrow: string;
  headline: string;
  copy: string;
  icon: LucideIcon;
  accent: string;
  steps: Array<{ label: string; detail: string; state: string; icon: LucideIcon }>;
};

type JourneyStep = {
  key: string;
  index: string;
  label: string;
  title: string;
  copy: string;
  kind: "inbox" | "sales" | "booking" | "aftercare";
};

const JOURNEY: JourneyStep[] = [
  {
    key: "inbox",
    index: "01",
    label: "Enquiry",
    title: "The customer appears once.",
    copy: "A new enquiry lands with the conversation and customer identity attached, not as another loose message somebody has to copy somewhere else.",
    kind: "inbox",
  },
  {
    key: "sales",
    index: "02",
    label: "Opportunity",
    title: "The next step becomes visible.",
    copy: "The same customer becomes a live opportunity with the conversation still attached and the next action clear to the team.",
    kind: "sales",
  },
  {
    key: "booking",
    index: "03",
    label: "Booking",
    title: "The conversation becomes a commitment.",
    copy: "Availability, confirmation and reminders sit inside the same journey instead of becoming a separate admin trail.",
    kind: "booking",
  },
  {
    key: "aftercare",
    index: "04",
    label: "Aftercare",
    title: "The journey keeps going after the work.",
    copy: "Payment, reviews and future follow-up can continue from the same customer context instead of starting from zero again.",
    kind: "aftercare",
  },
];

const OUTCOMES: Outcome[] = [
  {
    key: "missed-enquiry",
    label: "Missed enquiry",
    eyebrow: "NEW LEAD FOLLOW-THROUGH",
    headline: "A new enquiry should not depend on who notices first.",
    copy: "Acknowledge the enquiry, keep the conversation moving, capture the customer and get the next step in motion while your team is busy doing the work.",
    icon: MessageSquareText,
    accent: "#0EA5E9",
    steps: [
      { label: "Enquiry arrives", detail: "Website form · 9:14 AM", state: "Captured", icon: MessageSquareText },
      { label: "Response goes out", detail: "SMS sent · 9:15 AM", state: "Zapla handled", icon: Zap },
      { label: "Customer replies", detail: "Needs Thursday morning", state: "Context saved", icon: UserRoundCheck },
      { label: "Appointment booked", detail: "Thu · 10:30 AM", state: "Confirmed", icon: CalendarCheck2 },
    ],
  },
  {
    key: "quiet-quote",
    label: "Quiet quote",
    eyebrow: "QUOTE FOLLOW-THROUGH",
    headline: "Sent is not the same thing as followed up.",
    copy: "Keep quiet opportunities visible, prompt the next conversation and move the deal forward without turning somebody's memory into the workflow.",
    icon: CircleDollarSign,
    accent: "#14B8A6",
    steps: [
      { label: "Quote sent", detail: "Monday afternoon", state: "Open", icon: CircleDollarSign },
      { label: "No response", detail: "48 hours elapsed", state: "Detected", icon: Clock3 },
      { label: "Follow-up sent", detail: "Personalised SMS", state: "Zapla handled", icon: Zap },
      { label: "Opportunity moves", detail: "Customer replied yes", state: "Pipeline updated", icon: Route },
    ],
  },
  {
    key: "past-customer",
    label: "Past customer",
    eyebrow: "GHOST TO GOLD",
    headline: "Your next customer may already be in your database.",
    copy: "Identify customers who went quiet, reach back out with context and turn old records into new conversations instead of letting value sit dormant.",
    icon: RefreshCw,
    accent: "#8B5CF6",
    steps: [
      { label: "Dormant customers", detail: "Past-customer segment", state: "Identified", icon: UsersRound },
      { label: "Reactivation starts", detail: "Context-aware outreach", state: "Zapla handled", icon: Sparkles },
      { label: "Interest returns", detail: "Replies begin coming in", state: "Engaged", icon: MessageSquareText },
      { label: "Next step booked", detail: "Customer back in journey", state: "Reactivated", icon: CalendarCheck2 },
    ],
  },
  {
    key: "completed-job",
    label: "Completed job",
    eyebrow: "AFTER THE WORK IS DONE",
    headline: "The customer journey should not end when the job does.",
    copy: "Close the loop after delivery with payment, review and return-customer follow-through built into the same journey.",
    icon: CheckCircle2,
    accent: "#F59E0B",
    steps: [
      { label: "Work completed", detail: "Job marked complete", state: "Done", icon: CheckCircle2 },
      { label: "Payment requested", detail: "Invoice sent automatically", state: "Zapla handled", icon: CreditCard },
      { label: "Review requested", detail: "Sent after payment", state: "Timed", icon: Star },
      { label: "Customer retained", detail: "Ready for future follow-up", state: "Lifecycle continues", icon: RefreshCw },
    ],
  },
];

function Kicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`text-[10px] font-semibold uppercase tracking-[0.19em] ${dark ? "text-cyan-300/80" : "text-cyan-700"}`}>
      {children}
    </div>
  );
}

function LifecycleRail() {
  const stages = ["Capture", "Communicate", "Convert", "Operate", "Retain", "Grow"];
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-[1360px] px-5 py-7 sm:px-8">
        <div className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:mb-0 sm:inline-block sm:pr-8">
          One customer lifecycle
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-3 sm:inline-flex sm:items-center sm:gap-4">
          {stages.map((stage, index) => (
            <div key={stage} className="flex min-w-0 items-center gap-3">
              <span className="whitespace-nowrap text-[12px] font-semibold tracking-[-0.01em] text-slate-700 sm:text-[13px]">{stage}</span>
              {index < stages.length - 1 ? <ArrowRight className="hidden h-3 w-3 shrink-0 text-slate-300 sm:block" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RevenueLeakSection() {
  const moments = [
    { time: "9:14", title: "New enquiry", detail: "Hi, are you available this week?", tone: "live" },
    { time: "9:28", title: "Still no reply", detail: "The team is busy with customers.", tone: "muted" },
    { time: "10:41", title: "Nobody owns it", detail: "The next step is still sitting there.", tone: "muted" },
    { time: "4:32", title: "Customer moved on", detail: "Booked elsewhere.", tone: "lost" },
  ];

  return (
    <section className="bg-[#ECEFF1]">
      <div className="mx-auto grid max-w-[1600px] lg:min-h-[760px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative overflow-hidden bg-[#0A0D12] px-5 py-20 text-white sm:px-10 sm:py-24 lg:flex lg:items-center lg:px-16 lg:py-20 xl:px-20">
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: `url(${V5}/mechanic.jpg)`, backgroundSize: "cover", backgroundPosition: "45% 50%" }} />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,12,.96)_0%,rgba(5,8,12,.88)_48%,rgba(5,8,12,.64)_100%)]" />
          <div className="relative max-w-[650px]">
            <Kicker dark>Where revenue leaks</Kicker>
            <h2 className="mt-5 max-w-[630px] text-[42px] leading-[0.98] tracking-[-0.05em] sm:text-[58px] lg:text-[64px] xl:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Customers do not always say no.<br />Sometimes nobody followed through.
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-[1.72] text-white/58 sm:text-[17px]">
              The expensive gaps are often ordinary ones: an enquiry waits, a quote goes quiet, a missed call disappears or a past customer is simply forgotten.
            </p>
          </div>
        </div>

        <div className="relative px-5 py-14 sm:px-10 sm:py-16 lg:flex lg:items-center lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-[680px]">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-slate-300 pb-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">One ordinary Tuesday</div>
                <div className="mt-2 text-[21px] font-medium tracking-[-0.025em] text-slate-900 sm:text-[24px]">Nothing breaks. Nobody gets an alert.</div>
              </div>
              <div className="hidden text-right sm:block">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Outcome</div>
                <div className="mt-1 text-[12px] font-semibold text-rose-600">Revenue left quietly</div>
              </div>
            </div>

            <div className="relative">
              <div aria-hidden className="absolute bottom-[30px] left-[59px] top-[28px] w-px bg-slate-300 sm:left-[71px]" />
              {moments.map((moment, index) => {
                const lost = moment.tone === "lost";
                const live = moment.tone === "live";
                return (
                  <div key={moment.time} className={`relative grid grid-cols-[48px_1fr] gap-5 py-4 sm:grid-cols-[58px_1fr] sm:gap-7 ${index ? "border-t border-slate-300/70" : ""}`}>
                    <div className={`pt-1 text-right font-mono text-[11px] font-semibold ${lost ? "text-rose-500" : live ? "text-slate-900" : "text-slate-400"}`}>{moment.time}</div>
                    <div className="relative pl-7 sm:pl-9">
                      <span className={`absolute left-[11px] top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-[#ECEFF1] sm:left-[13px] ${lost ? "bg-rose-500" : live ? "bg-cyan-500" : "bg-slate-300"}`} />
                      <div className={`text-[16px] font-semibold tracking-[-0.02em] ${lost ? "text-rose-600" : "text-slate-900"}`}>{moment.title}</div>
                      <div className={`mt-1 text-[13px] leading-[1.5] ${lost ? "text-rose-500/80" : "text-slate-500"}`}>{moment.detail}</div>
                      {live ? (
                        <div className="mt-4 max-w-[420px] rounded-[16px] bg-white p-4 shadow-[0_18px_50px_-34px_rgba(15,23,42,.4)] ring-1 ring-slate-200">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div>
                            <div>
                              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">Sarah Miller</div>
                              <div className="mt-1.5 text-[14px] leading-[1.45] text-slate-700">Hi, are you available this week for a service?</div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 border-t-2 border-slate-900 pt-5">
              <div className="text-[28px] font-medium leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-[34px]" style={{ fontFamily: DISPLAY }}>
                Nothing dramatic happened.<br />That is the problem.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyPanel({ step }: { step: JourneyStep }) {
  if (step.kind === "inbox") {
    return (
      <div className="grid min-h-[410px] lg:grid-cols-[240px_1fr]">
        <div className="border-b border-slate-200 bg-[#F8FAFB] p-5 lg:border-b-0 lg:border-r">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Unified Inbox</div>
          <div className="mt-5 space-y-2.5">
            {["Sarah Miller", "Marcus Lee", "Priya Shah"].map((name, i) => (
              <div key={name} className={`rounded-[12px] p-3 ${i === 0 ? "bg-white shadow-sm ring-1 ring-slate-200" : "text-slate-400"}`}>
                <div className="text-[12px] font-semibold text-slate-800">{name}</div>
                <div className="mt-1 truncate text-[11px]">{i === 0 ? "Are you available Thursday?" : "Previous conversation"}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Sarah Miller</div>
              <div className="mt-1 text-[11px] text-slate-400">SMS · New enquiry</div>
            </div>
            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-700">New lead</span>
          </div>
          <div className="mt-7 max-w-[520px] space-y-4">
            <div className="w-[78%] rounded-[16px] rounded-bl-[4px] bg-slate-100 px-4 py-3 text-[13px] leading-[1.5] text-slate-700">Hi, are you available Thursday morning for a service?</div>
            <div className="ml-auto w-[82%] rounded-[16px] rounded-br-[4px] bg-[#111318] px-4 py-3 text-[13px] leading-[1.5] text-white">Yes. I can help with that. I have Thursday at 10:30 available. Would you like me to hold it?</div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[11px] font-semibold text-cyan-700"><Zap className="h-3.5 w-3.5" /> Customer and conversation captured together</div>
        </div>
      </div>
    );
  }

  if (step.kind === "sales") {
    return (
      <div className="min-h-[410px] p-5 sm:p-7 lg:p-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Sales pipeline</div>
            <div className="mt-1.5 text-[15px] font-semibold text-slate-900">Service enquiries</div>
          </div>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-semibold text-slate-500">Live pipeline</span>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["New enquiry", "Contacted", "Booked"].map((stage, index) => (
            <div key={stage} className="rounded-[14px] bg-[#F7F8FA] p-3 ring-1 ring-slate-200/80">
              <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">{stage}</div>
              {index === 1 ? (
                <div className="mt-4 rounded-[12px] bg-white p-4 shadow-sm ring-1 ring-cyan-200">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div>
                    <div>
                      <div className="text-[12px] font-semibold text-slate-900">Sarah Miller</div>
                      <div className="mt-0.5 text-[10px] text-slate-400">Thursday service</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px]">
                    <span className="text-slate-400">Next action</span><span className="font-semibold text-cyan-700">Confirm booking</span>
                  </div>
                </div>
              ) : (
                <div className="mt-4 h-[96px] rounded-[10px] border border-dashed border-slate-200" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-7 flex items-center gap-2 text-[11px] font-semibold text-cyan-700"><Workflow className="h-3.5 w-3.5" /> Same customer, now visible as an opportunity</div>
      </div>
    );
  }

  if (step.kind === "booking") {
    return (
      <div className="grid min-h-[410px] lg:grid-cols-[1fr_300px]">
        <div className="border-b border-slate-200 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Calendar</div>
          <div className="mt-1.5 text-[15px] font-semibold text-slate-900">Thursday</div>
          <div className="mt-7 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {["8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "1:30", "2:00", "2:30", "3:00"].map((time) => (
              <div key={time} className={`rounded-[10px] px-2 py-3 text-center text-[11px] font-semibold ${time === "10:30" ? "bg-[#111318] text-white shadow-md" : "bg-[#F7F8FA] text-slate-500 ring-1 ring-slate-200"}`}>{time}</div>
            ))}
          </div>
        </div>
        <div className="bg-[#F8FAFB] p-5 sm:p-7 lg:p-8">
          <div className="rounded-[16px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Booking confirmed</div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div>
              <div><div className="text-[12px] font-semibold text-slate-900">Sarah Miller</div><div className="mt-1 text-[10px] text-slate-400">Thu · 10:30 AM</div></div>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4 text-[11px] text-slate-500">Confirmation sent by SMS</div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-cyan-700"><CalendarCheck2 className="h-3.5 w-3.5" /> Booking joins the same journey</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[410px] gap-0 sm:grid-cols-2">
      <div className="border-b border-slate-200 p-5 sm:border-b-0 sm:border-r sm:p-7 lg:p-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Payment</div>
        <div className="mt-8 rounded-[18px] bg-[#111318] p-6 text-white">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Invoice paid</div>
          <div className="mt-4 text-[42px] font-medium tracking-[-0.05em]">$286.00</div>
          <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-white/58"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Sarah Miller · payment complete</div>
        </div>
      </div>
      <div className="p-5 sm:p-7 lg:p-8">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Reputation & retention</div>
        <div className="mt-8 space-y-3">
          <div className="rounded-[16px] bg-[#F7F8FA] p-5 ring-1 ring-slate-200">
            <div className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /><span className="text-[12px] font-semibold text-slate-900">Review request ready</span></div>
            <div className="mt-2 text-[11px] leading-[1.5] text-slate-500">Sent after payment while the experience is still fresh.</div>
          </div>
          <div className="rounded-[16px] border border-dashed border-slate-300 p-5">
            <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-cyan-600" /><span className="text-[12px] font-semibold text-slate-900">Future follow-up retained</span></div>
            <div className="mt-2 text-[11px] leading-[1.5] text-slate-500">The customer remains part of the lifecycle, not a closed record.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConnectedJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduced) return;
    const next = Math.min(JOURNEY.length - 1, Math.floor(Math.max(0, Math.min(0.999, value)) * JOURNEY.length));
    setActive(next);
  });

  const step = JOURNEY[active];

  return (
    <section className="bg-white">
      <div ref={ref} className="hidden h-[210vh] lg:block">
        <div className="sticky top-[66px] flex h-[calc(100vh-66px)] items-center overflow-hidden px-8 py-8 xl:px-12">
          <div className="mx-auto grid w-full max-w-[1460px] grid-cols-[360px_1fr] gap-12 xl:grid-cols-[400px_1fr] xl:gap-16">
            <div className="flex flex-col justify-between py-2">
              <div>
                <Kicker>One customer. One connected journey.</Kicker>
                <h2 className="mt-5 text-[48px] leading-[0.98] tracking-[-0.05em] text-[#111318] xl:text-[58px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
                  Every customer moment.<br />One connected system.
                </h2>
                <p className="mt-5 max-w-[360px] text-[15px] leading-[1.68] text-slate-500">
                  Watch one customer move through the business without losing the conversation, context or next step.
                </p>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111318] text-[11px] font-bold text-white">SM</div>
                  <div><div className="text-[13px] font-semibold text-slate-900">Sarah Miller</div><div className="mt-1 text-[11px] text-slate-400">Same customer through every step</div></div>
                </div>
                <div className="mt-6 space-y-1">
                  {JOURNEY.map((item, index) => (
                    <button key={item.key} type="button" onClick={() => setActive(index)} className="group flex w-full items-center gap-3 py-2 text-left">
                      <span className={`h-px transition-all ${index === active ? "w-7 bg-cyan-500" : "w-3 bg-slate-300 group-hover:w-5"}`} />
                      <span className={`font-mono text-[10px] ${index === active ? "text-cyan-700" : "text-slate-300"}`}>{item.index}</span>
                      <span className={`text-[12px] font-semibold ${index === active ? "text-slate-900" : "text-slate-400"}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 items-center">
              <div className="w-full overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_42px_100px_-48px_rgba(15,23,42,.34)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700">{step.index} · {step.label}</div>
                    <div className="mt-1 text-[15px] font-semibold text-slate-900">{step.title}</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Customer context live</div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={step.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                    <JourneyPanel step={step} />
                  </motion.div>
                </AnimatePresence>
                <div className="border-t border-slate-200 bg-[#FAFBFC] px-6 py-4 text-[12px] leading-[1.55] text-slate-500">{step.copy}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-20 sm:px-8 sm:py-24 lg:hidden">
        <div className="mx-auto max-w-[760px]">
          <Kicker>One customer. One connected journey.</Kicker>
          <h2 className="mt-4 text-[40px] leading-[0.98] tracking-[-0.05em] text-[#111318] sm:text-[50px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Every customer moment.<br />One connected system.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.65] text-slate-500">The same customer keeps the same context as the journey moves.</p>

          <div className="mt-10 flex items-center gap-3 border-y border-slate-200 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div>
            <div><div className="text-[12px] font-semibold text-slate-900">Sarah Miller</div><div className="mt-1 text-[10px] text-slate-400">Persistent customer context</div></div>
          </div>

          <div className="mt-8 space-y-8">
            {JOURNEY.map((item) => (
              <div key={item.key}>
                <div className="mb-3 flex items-center gap-3"><span className="font-mono text-[10px] font-semibold text-cyan-700">{item.index}</span><span className="text-[12px] font-semibold uppercase tracking-[0.13em] text-slate-400">{item.label}</span></div>
                <div className="overflow-hidden rounded-[18px] border border-slate-200 bg-white"><JourneyPanel step={item} /></div>
                <p className="mt-3 text-[13px] leading-[1.55] text-slate-500">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function UnlimitedUsersSection() {
  const people = [
    { initials: "OA", role: "Owner", x: "5%", y: "18%", r: "-2deg" },
    { initials: "FR", role: "Front desk", x: "64%", y: "5%", r: "2deg" },
    { initials: "SL", role: "Sales", x: "76%", y: "43%", r: "-1deg" },
    { initials: "TM", role: "Team", x: "61%", y: "79%", r: "2deg" },
    { initials: "AC", role: "Accounts", x: "10%", y: "76%", r: "-2deg" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#DDE9EA] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-20 bottom-[-80px] h-[380px] w-[380px] rounded-full bg-white/35 blur-[90px]" />
      <div className="relative mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
        <div className="max-w-[600px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3D7378]">Unlimited users included</div>
          <h2 className="mt-5 text-[46px] leading-[0.96] tracking-[-0.055em] text-[#111318] sm:text-[62px] lg:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Stop paying a tax on teamwork.
          </h2>
          <p className="mt-6 max-w-[540px] text-[15px] leading-[1.7] text-slate-600 sm:text-[17px]">
            The customer journey rarely belongs to one person. Give everyone who needs visibility access without turning every extra teammate into another licence decision.
          </p>
          <div className="mt-8 grid max-w-[520px] grid-cols-3 border-y border-[#ACC5C7] py-5">
            <div><div className="text-[28px] font-medium tracking-[-0.04em] text-slate-900">1</div><div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Customer</div></div>
            <div className="border-x border-[#ACC5C7] px-4"><div className="text-[28px] font-medium tracking-[-0.04em] text-slate-900">5+</div><div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Roles</div></div>
            <div className="pl-4"><div className="text-[28px] font-medium tracking-[-0.04em] text-slate-900">∞</div><div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Users</div></div>
          </div>
        </div>

        <div className="relative mx-auto aspect-[1.15/1] w-full max-w-[650px]">
          <div className="absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A8C0C2]" />
          <div className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#A8C0C2]" />
          <div className="absolute left-1/2 top-1/2 z-20 w-[58%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] bg-[#111318] text-white shadow-[0_32px_80px_-34px_rgba(15,23,42,.62)]">
            <div className="border-b border-white/10 px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.17em] text-white/38">Shared customer context</div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#111318]">SM</div>
                <div><div className="text-[15px] font-semibold">Sarah Miller</div><div className="mt-1 text-[11px] text-white/45">Appointment tomorrow · 10:30</div></div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-[11px]">
                <div><div className="text-white/35">Last touch</div><div className="mt-1 font-semibold text-white/80">SMS reply</div></div>
                <div><div className="text-white/35">Next step</div><div className="mt-1 font-semibold text-white/80">Reminder</div></div>
              </div>
            </div>
          </div>
          {people.map((person) => (
            <div key={person.role} className="absolute z-30 flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-3 shadow-[0_12px_36px_-22px_rgba(15,23,42,.38)] ring-1 ring-[#B7CBCC]" style={{ left: person.x, top: person.y, transform: `rotate(${person.r})` }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F5F5] text-[9px] font-bold text-[#276C72]">{person.initials}</div>
              <div className="text-[10px] font-semibold text-slate-700 sm:text-[11px]">{person.role}</div>
            </div>
          ))}
          <div className="absolute bottom-[0%] left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#16C4D8] px-5 py-2.5 text-[11px] font-bold text-[#073238] shadow-[0_14px_36px_-20px_rgba(6,182,212,.7)]">Unlimited users · included</div>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunchSection() {
  const steps = [
    ["01", "Map", "Enquiries, conversations, bookings and follow-up"],
    ["02", "Build", "Pipelines, messages, automations and handoffs"],
    ["03", "Launch", "A working system your team can use"],
    ["04", "Tune", "Refine from real usage, not assumptions"],
  ];

  return (
    <section className="bg-[#F3F0EA] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-20">
        <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#E8E2D8] p-5 sm:p-8 lg:min-h-[610px]">
          <div className="absolute right-5 top-5 w-[42%] rotate-[2deg] overflow-hidden rounded-[18px] shadow-[0_26px_60px_-35px_rgba(15,23,42,.38)] sm:right-8 sm:top-8">
            <img src={`${V5}/skin-clinic.jpg`} alt="Service team at work" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-5 left-5 w-[38%] -rotate-[2deg] overflow-hidden rounded-[18px] shadow-[0_26px_60px_-35px_rgba(15,23,42,.38)] sm:bottom-8 sm:left-8">
            <img src={`${V5}/photographer.jpg`} alt="Service professional at work" className="aspect-[4/3] h-full w-full object-cover" />
          </div>

          <div className="absolute left-[10%] top-[12%] z-20 w-[70%] rounded-[22px] bg-white p-5 shadow-[0_34px_90px_-40px_rgba(15,23,42,.42)] ring-1 ring-black/5 sm:left-[12%] sm:top-[15%] sm:p-7 lg:w-[68%]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-700">Guided Launch blueprint</div><div className="mt-1.5 text-[15px] font-semibold text-slate-900">Your customer journey, mapped first</div></div>
              <div className="hidden rounded-full bg-[#111318] px-3 py-1.5 text-[9px] font-semibold text-white sm:block">Built around your business</div>
            </div>
            <div className="mt-6 space-y-4">
              {["Enquiry sources", "Pipeline & ownership", "Booking & reminders", "Payment & review", "Reactivation"].map((item, index) => (
                <div key={item} className="relative flex items-center gap-4">
                  {index < 4 ? <span className="absolute left-[13px] top-[27px] h-[26px] w-px bg-slate-200" /> : null}
                  <span className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${index === 0 ? "bg-[#111318] text-white" : "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100"}`}>{index + 1}</span>
                  <div className="min-w-0 flex-1 border-b border-slate-100 pb-3 text-[11px] font-semibold text-slate-700 last:border-b-0">{item}</div>
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[590px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7D6B55]">Guided Launch</div>
          <h2 className="mt-5 text-[44px] leading-[0.98] tracking-[-0.052em] text-[#111318] sm:text-[58px] lg:text-[64px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            We do not hand you a blank account and wish you luck.
          </h2>
          <p className="mt-6 max-w-[540px] text-[15px] leading-[1.7] text-[#6E6559] sm:text-[17px]">
            Guided Launch turns the customer journey into a working system first, so adoption starts with something relevant to the way your business actually operates.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-[#D8D0C4] pt-6">
            {steps.map(([n, title, copy]) => (
              <div key={n}>
                <div className="font-mono text-[9px] font-semibold text-[#9B8365]">{n}</div>
                <div className="mt-2 text-[16px] font-semibold text-slate-900">{title}</div>
                <div className="mt-1 text-[11px] leading-[1.5] text-[#7D7367]">{copy}</div>
              </div>
            ))}
          </div>
          <a href={BOOK_URL} className="mt-8 inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[13px] font-semibold text-white">Talk through your workflow <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

function OutcomeSwitcher() {
  const [activeKey, setActiveKey] = useState(OUTCOMES[0].key);
  const active = OUTCOMES.find((item) => item.key === activeKey) ?? OUTCOMES[0];
  const ActiveIcon = active.icon;
  const offsets = ["", "sm:ml-12", "sm:ml-4", "sm:ml-16"];

  return (
    <section className="relative overflow-hidden bg-[#080B10] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-14">
          <div>
            <Kicker dark>Follow-through in action</Kicker>
            <h2 className="mt-5 max-w-[620px] text-[46px] leading-[0.97] tracking-[-0.052em] sm:text-[62px] lg:text-[70px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              What should Zapla follow through on?
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:justify-end" role="tablist" aria-label="Follow-through examples">
            {OUTCOMES.map((item) => {
              const on = item.key === active.key;
              const Icon = item.icon;
              return (
                <button key={item.key} type="button" role="tab" aria-selected={on} onClick={() => setActiveKey(item.key)} className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border px-3 text-[11px] font-semibold transition-colors sm:px-4 ${on ? "border-white bg-white text-[#111318]" : "border-white/15 bg-white/[0.035] text-white/55 hover:border-white/28 hover:text-white"}`}>
                  <Icon className="h-3.5 w-3.5" /> {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <AnimatePresence mode="wait">
            <motion.div key={active.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.24 }} className="lg:pt-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px]" style={{ backgroundColor: `${active.accent}20`, color: active.accent }}><ActiveIcon className="h-5 w-5" /></div>
              <div className="mt-6 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">{active.eyebrow}</div>
              <h3 className="mt-3 max-w-[520px] text-[34px] font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-[42px]" style={{ fontFamily: DISPLAY }}>{active.headline}</h3>
              <p className="mt-5 max-w-[500px] text-[14px] leading-[1.7] text-white/48 sm:text-[15px]">{active.copy}</p>
            </motion.div>
          </AnimatePresence>

          <div className="relative min-h-[500px] overflow-hidden rounded-[26px] border border-white/10 bg-[#0E1219] p-5 sm:p-7 lg:p-9">
            <div className="absolute right-[-70px] top-[-70px] h-[240px] w-[240px] rounded-full opacity-20 blur-[90px]" style={{ backgroundColor: active.accent }} />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
              <div><div className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">Live customer journey</div><div className="mt-1.5 text-[14px] font-semibold text-white/82">One trigger. Connected next steps.</div></div>
              <div className="hidden items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5 text-[9px] font-semibold text-cyan-200 sm:flex"><Sparkles className="h-3.5 w-3.5" /> Zapla active</div>
            </div>

            <div className="relative mt-7 max-w-[650px]">
              <div aria-hidden className="absolute bottom-[44px] left-[18px] top-[42px] w-px bg-white/10 sm:left-[22px]" />
              {active.steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div key={`${active.key}-${step.label}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.28, delay: index * 0.05 }} className={`relative mb-4 flex items-center gap-4 ${offsets[index]}`}>
                    <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#151B24] sm:h-11 sm:w-11"><Icon className="h-4 w-4 text-white/65" /></div>
                    <div className="min-w-0 flex-1 rounded-[16px] border border-white/10 bg-white/[0.035] px-4 py-3.5 sm:px-5 sm:py-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div><div className="text-[12px] font-semibold text-white/88 sm:text-[13px]">{step.label}</div><div className="mt-1 text-[10px] text-white/35 sm:text-[11px]">{step.detail}</div></div>
                        <span className="rounded-full px-2.5 py-1 text-[9px] font-semibold" style={{ backgroundColor: `${active.accent}16`, color: active.accent }}>{step.state}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              <div className="ml-[52px] mt-3 flex items-center gap-2 text-[10px] font-semibold text-cyan-200/70 sm:ml-[70px]"><ArrowRight className="h-3.5 w-3.5" /> The customer keeps moving</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalDecisionSection() {
  return (
    <section className="relative overflow-hidden bg-[#F4F5F6]">
      <div className="mx-auto grid max-w-[1600px] lg:min-h-[780px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex items-center px-5 py-20 sm:px-10 sm:py-24 lg:px-16 xl:px-20">
          <div className="max-w-[650px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.19em] text-cyan-700">A simpler decision</div>
            <h2 className="mt-5 text-[46px] leading-[0.96] tracking-[-0.055em] text-[#111318] sm:text-[62px] lg:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
              Keep doing the work only your team can do.
            </h2>
            <p className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-slate-500 sm:text-[17px]">
              Zapla gives the customer journey one connected place to live, with follow-through built around the moments that otherwise get lost between busy people and disconnected tools.
            </p>

            <div className="mt-8 grid gap-0 border-y border-slate-300 sm:grid-cols-3">
              {["Unlimited users", "Guided Launch", "Connected follow-through"].map((item, index) => (
                <div key={item} className={`flex items-center gap-2 py-4 text-[11px] font-semibold text-slate-700 sm:px-4 ${index ? "border-t border-slate-300 sm:border-l sm:border-t-0" : ""}`}><Check className="h-3.5 w-3.5 text-cyan-600" /> {item}</div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[13px] font-semibold text-white">Book a Call <ArrowRight className="h-4 w-4" /></a>
              <a href="/pricing" className="inline-flex h-[50px] items-center rounded-[10px] border border-slate-300 bg-white px-5 text-[13px] font-semibold text-slate-800">See plans and pricing</a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden bg-[#0A0D12] lg:min-h-0">
          <img src={`${V5}/real-estate.jpg`} alt="Service professional with a customer" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,10,14,.6)_0%,rgba(7,10,14,.1)_60%,rgba(7,10,14,.2)_100%)]" />
          <div className="absolute bottom-[7%] left-[7%] w-[42%] -rotate-[2.5deg] overflow-hidden rounded-[18px] border-4 border-white/10 shadow-[0_28px_70px_-32px_rgba(0,0,0,.7)] sm:w-[36%]">
            <img src={`${V5}/photographer.jpg`} alt="Service professional at work" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div className="absolute right-[6%] top-[8%] max-w-[260px] rotate-[2deg] rounded-[16px] bg-white/95 p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,.55)]">
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">Next step</div>
            <div className="mt-2 text-[13px] font-semibold text-slate-900">Customer follow-up scheduled</div>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-cyan-700"><Zap className="h-3.5 w-3.5" /> Zapla follows through</div>
          </div>
          <div className="absolute bottom-6 right-6 text-right text-[9px] font-semibold uppercase tracking-[0.17em] text-white/45">Different work. Same customer journey.</div>
        </div>
      </div>
    </section>
  );
}

export function ZaplaHomepageContinuationV5() {
  return (
    <>
      <LifecycleRail />
      <RevenueLeakSection />
      <ConnectedJourneySection />
      <UnlimitedUsersSection />
      <GuidedLaunchSection />
      <OutcomeSwitcher />
      <FinalDecisionSection />
    </>
  );
}
