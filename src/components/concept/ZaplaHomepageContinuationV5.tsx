import { useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  MessageSquareText,
  RefreshCw,
  Star,
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

type Outcome = {
  key: string;
  label: string;
  eyebrow: string;
  headline: string;
  copy: string;
  icon: LucideIcon;
  accent: string;
  steps: string[];
};

type JourneyStep = {
  key: string;
  index: string;
  label: string;
  title: string;
  copy: string;
  kind: "inbox" | "opportunity" | "booking" | "aftercare";
};

const JOURNEY: JourneyStep[] = [
  {
    key: "inbox",
    index: "01",
    label: "Enquiry",
    title: "The customer appears once.",
    copy: "A new enquiry arrives with the conversation and customer identity attached.",
    kind: "inbox",
  },
  {
    key: "opportunity",
    index: "02",
    label: "Opportunity",
    title: "The next step becomes visible.",
    copy: "The same customer becomes a live opportunity with ownership and the next action clear.",
    kind: "opportunity",
  },
  {
    key: "booking",
    index: "03",
    label: "Booking",
    title: "The conversation becomes a commitment.",
    copy: "Availability, confirmation and reminders join the same customer journey.",
    kind: "booking",
  },
  {
    key: "aftercare",
    index: "04",
    label: "Aftercare",
    title: "The journey keeps going after the work.",
    copy: "Payment, reviews and future follow-up continue from the same customer context.",
    kind: "aftercare",
  },
];

const OUTCOMES: Outcome[] = [
  {
    key: "missed-enquiry",
    label: "Missed enquiry",
    eyebrow: "NEW LEAD FOLLOW-THROUGH",
    headline: "A new enquiry should not depend on who notices first.",
    copy: "Capture the customer, acknowledge the enquiry and get the next step moving while the team is busy doing the work.",
    icon: MessageSquareText,
    accent: "#0EA5E9",
    steps: ["Enquiry arrives", "Response goes out", "Context is saved", "Appointment gets booked"],
  },
  {
    key: "quiet-quote",
    label: "Quiet quote",
    eyebrow: "QUOTE FOLLOW-THROUGH",
    headline: "Sent is not the same thing as followed up.",
    copy: "Keep quiet opportunities visible and create the next conversation without relying on somebody to remember.",
    icon: CircleDollarSign,
    accent: "#14B8A6",
    steps: ["Quote sent", "Silence detected", "Follow-up goes out", "Opportunity moves"],
  },
  {
    key: "past-customer",
    label: "Past customer",
    eyebrow: "GHOST TO GOLD",
    headline: "Your next customer may already be in your database.",
    copy: "Wake up dormant customer value with context-aware reactivation and a clear path back into the journey.",
    icon: RefreshCw,
    accent: "#8B5CF6",
    steps: ["Dormant customers identified", "Reactivation starts", "Interest returns", "Next step gets booked"],
  },
  {
    key: "completed-job",
    label: "Completed job",
    eyebrow: "AFTER THE WORK IS DONE",
    headline: "The customer journey should not end when the job does.",
    copy: "Carry the relationship into payment, review and future return instead of treating completion as the end of the record.",
    icon: CheckCircle2,
    accent: "#F59E0B",
    steps: ["Work completed", "Payment requested", "Review requested", "Customer stays active"],
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
      <div className="mx-auto max-w-[1360px] px-5 py-6 sm:px-8">
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
    ["9:14", "New enquiry", "Are you available this week?"],
    ["9:28", "Still no reply", "The team is busy."],
    ["10:41", "Nobody owns it", "The next step is still sitting there."],
    ["4:32", "Booked elsewhere", "Revenue left quietly."],
  ];

  return (
    <section className="grid bg-[#E8EAEC] lg:min-h-[760px] lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative flex items-center overflow-hidden bg-[#090C11] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 xl:px-20">
        <div className="relative max-w-[650px]">
          <Kicker dark>Where revenue leaks</Kicker>
          <h2 className="mt-6 text-[68px] leading-[0.84] tracking-[-0.07em] sm:text-[92px] lg:text-[108px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
            Nothing<br />broke.
          </h2>
          <p className="mt-8 max-w-[520px] text-[29px] leading-[1.12] tracking-[-0.035em] text-white/72 sm:text-[36px]">
            Nobody got an alert.<br />The customer simply left.
          </p>
        </div>
        <div className="pointer-events-none absolute bottom-[-8%] right-[-18%] h-[360px] w-[360px] rounded-full border border-cyan-300/10" />
      </div>

      <div className="relative flex items-center px-5 py-14 sm:px-10 sm:py-16 lg:px-14 xl:px-20">
        <div className="mx-auto w-full max-w-[680px]">
          <div className="mb-8 flex items-end justify-between gap-5 border-b border-slate-300 pb-5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">One ordinary Tuesday</div>
              <div className="mt-2 text-[20px] font-medium tracking-[-0.025em] text-slate-900 sm:text-[23px]">Nothing dramatic happens.</div>
            </div>
            <div className="hidden text-right sm:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">Outcome</div>
              <div className="mt-1 text-[11px] font-semibold text-rose-600">Customer gone</div>
            </div>
          </div>

          <div className="relative">
            <div aria-hidden className="absolute bottom-5 left-[60px] top-6 w-px bg-cyan-500/70 sm:left-[72px]" />
            {moments.map((moment, index) => {
              const first = index === 0;
              const lost = index === moments.length - 1;
              return (
                <div key={moment[0]} className={`relative grid grid-cols-[48px_1fr] gap-5 py-5 sm:grid-cols-[58px_1fr] sm:gap-7 ${index ? "border-t border-slate-300/70" : ""}`}>
                  <div className={`pt-1 text-right font-mono text-[11px] font-semibold ${lost ? "text-rose-500" : first ? "text-slate-900" : "text-slate-400"}`}>{moment[0]}</div>
                  <div className="relative pl-7 sm:pl-9">
                    <span className={`absolute left-[12px] top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-[#E8EAEC] sm:left-[14px] ${lost ? "bg-rose-500" : first ? "bg-cyan-500" : "bg-slate-300"}`} />
                    <div className={`text-[17px] font-semibold tracking-[-0.025em] ${lost ? "text-rose-600" : "text-slate-900"}`}>{moment[1]}</div>
                    <div className="mt-1.5 text-[13px] leading-[1.5] text-slate-500">{moment[2]}</div>
                    {first ? (
                      <div className="mt-5 max-w-[420px] border-l-2 border-slate-900 pl-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Sarah Miller</div>
                        <div className="mt-2 text-[15px] leading-[1.45] text-slate-800">Hi, are you available this week for a service?</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t-2 border-slate-900 pt-5">
            <div className="text-[30px] font-medium leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-[36px]" style={{ fontFamily: DISPLAY }}>
              The leak is ordinary.<br />That is why it is expensive.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneySurface({ step }: { step: JourneyStep }) {
  if (step.kind === "inbox") {
    return (
      <div className="grid min-h-[350px] sm:grid-cols-[220px_1fr]">
        <div className="border-b border-slate-200 bg-[#F7F8F9] p-5 sm:border-b-0 sm:border-r">
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Unified inbox</div>
          <div className="mt-6 border-y border-slate-200 py-4">
            <div className="text-[12px] font-semibold text-slate-900">Sarah Miller</div>
            <div className="mt-1 text-[11px] text-slate-500">Are you available Thursday?</div>
          </div>
          <div className="py-4 text-[11px] text-slate-300">Marcus Lee</div>
          <div className="border-t border-slate-200 py-4 text-[11px] text-slate-300">Priya Shah</div>
        </div>
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-[13px] font-semibold text-slate-900">Sarah Miller</div>
              <div className="mt-1 text-[10px] text-slate-400">SMS · New enquiry</div>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-700">Captured</span>
          </div>
          <div className="mt-8 max-w-[560px]">
            <div className="max-w-[76%] border-l-2 border-slate-300 pl-4 text-[14px] leading-[1.55] text-slate-700">Hi, are you available Thursday morning for a service?</div>
            <div className="ml-auto mt-7 max-w-[82%] border-r-2 border-[#111318] pr-4 text-right text-[14px] leading-[1.55] text-slate-900">Yes. Thursday at 10:30 is available. Would you like me to hold it?</div>
          </div>
        </div>
      </div>
    );
  }

  if (step.kind === "opportunity") {
    return (
      <div className="min-h-[350px] p-5 sm:p-7">
        <div className="flex items-end justify-between border-b border-slate-200 pb-4">
          <div><div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Sales pipeline</div><div className="mt-1 text-[15px] font-semibold text-slate-900">Service enquiries</div></div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.13em] text-cyan-700">Sarah is still Sarah</div>
        </div>
        <div className="mt-8 grid grid-cols-3 border-y border-slate-200">
          {["New enquiry", "Contacted", "Booked"].map((stage, index) => (
            <div key={stage} className={`min-h-[210px] p-4 ${index ? "border-l border-slate-200" : ""}`}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">{stage}</div>
              {index === 1 ? (
                <div className="mt-8 border-l-2 border-cyan-500 pl-4">
                  <div className="text-[13px] font-semibold text-slate-900">Sarah Miller</div>
                  <div className="mt-2 text-[11px] text-slate-500">Thursday service</div>
                  <div className="mt-5 text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-700">Next action · Confirm</div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.kind === "booking") {
    return (
      <div className="grid min-h-[350px] sm:grid-cols-[1fr_260px]">
        <div className="border-b border-slate-200 p-5 sm:border-b-0 sm:border-r sm:p-7">
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Thursday calendar</div>
          <div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-0 sm:grid-cols-6">
            {["8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "1:30", "2:00", "2:30", "3:00"].map((time) => (
              <div key={time} className={`border-b py-4 text-center text-[11px] font-semibold ${time === "10:30" ? "border-cyan-500 text-slate-950" : "border-slate-200 text-slate-400"}`}>{time}</div>
            ))}
          </div>
        </div>
        <div className="bg-[#F7F8F9] p-5 sm:p-7">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">Confirmed</div>
          <div className="mt-6 text-[22px] font-semibold tracking-[-0.035em] text-slate-900">Thu · 10:30</div>
          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="text-[12px] font-semibold text-slate-900">Sarah Miller</div>
            <div className="mt-2 text-[10px] text-slate-500">Confirmation sent by SMS</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[350px] sm:grid-cols-2">
      <div className="border-b border-slate-200 p-5 sm:border-b-0 sm:border-r sm:p-7">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Payment</div>
        <div className="mt-10 text-[52px] font-medium tracking-[-0.06em] text-slate-950">$286</div>
        <div className="mt-3 text-[11px] text-slate-500">Invoice paid · Sarah Miller</div>
      </div>
      <div className="p-5 sm:p-7">
        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">What happens next</div>
        <div className="mt-8 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><Star className="h-4 w-4 text-amber-500" /><div><div className="text-[12px] font-semibold text-slate-900">Review request</div><div className="mt-1 text-[10px] text-slate-500">Timed after payment</div></div></div>
          <div className="flex items-center gap-3"><RefreshCw className="h-4 w-4 text-cyan-600" /><div><div className="text-[12px] font-semibold text-slate-900">Future follow-up</div><div className="mt-1 text-[10px] text-slate-500">Customer remains in the lifecycle</div></div></div>
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
          <div className="mx-auto grid w-full max-w-[1460px] grid-cols-[350px_1fr] gap-14 xl:grid-cols-[390px_1fr] xl:gap-20">
            <div className="flex flex-col justify-between py-2">
              <div>
                <Kicker>One customer. One thread.</Kicker>
                <h2 className="mt-5 text-[50px] leading-[0.95] tracking-[-0.055em] text-[#111318] xl:text-[60px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>
                  Every customer moment.<br />One connected system.
                </h2>
                <p className="mt-5 max-w-[350px] text-[15px] leading-[1.68] text-slate-500">The product changes around the customer. The customer identity, context and next step stay intact.</p>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111318] text-[11px] font-bold text-white">SM</div>
                  <div><div className="text-[13px] font-semibold text-slate-900">Sarah Miller</div><div className="mt-1 text-[10px] text-slate-400">Persistent customer context</div></div>
                </div>
                <div className="relative mt-5 pl-6">
                  <div className="absolute bottom-2 left-[5px] top-2 w-px bg-cyan-400" />
                  {JOURNEY.map((item, index) => (
                    <button key={item.key} type="button" onClick={() => setActive(index)} className="relative flex w-full items-center gap-3 py-2.5 text-left">
                      <span className={`absolute left-[-24px] h-2.5 w-2.5 rounded-full ring-4 ring-white ${index <= active ? "bg-cyan-500" : "bg-slate-200"}`} />
                      <span className={`font-mono text-[10px] ${index === active ? "text-cyan-700" : "text-slate-300"}`}>{item.index}</span>
                      <span className={`text-[12px] font-semibold ${index === active ? "text-slate-900" : "text-slate-400"}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 items-center">
              <div className="w-full border border-slate-200 bg-white">
                <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
                  <div><div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-700">{step.index} · {step.label}</div><div className="mt-1 text-[15px] font-semibold text-slate-900">{step.title}</div></div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-emerald-700">Context live</div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={step.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.26 }}>
                    <JourneySurface step={step} />
                  </motion.div>
                </AnimatePresence>
                <div className="border-t border-slate-200 px-6 py-4 text-[11px] leading-[1.55] text-slate-500">{step.copy}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-20 sm:px-8 sm:py-24 lg:hidden">
        <div className="mx-auto max-w-[760px]">
          <Kicker>One customer. One thread.</Kicker>
          <h2 className="mt-4 text-[40px] leading-[0.96] tracking-[-0.055em] text-[#111318] sm:text-[50px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Every customer moment.<br />One connected system.</h2>
          <div className="mt-8 flex items-center gap-3 border-y border-slate-200 py-4"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111318] text-[10px] font-bold text-white">SM</div><div><div className="text-[12px] font-semibold text-slate-900">Sarah Miller</div><div className="mt-1 text-[10px] text-slate-400">Same customer through every step</div></div></div>
          <div className="mt-7 grid grid-cols-4 border-b border-slate-200">
            {JOURNEY.map((item, index) => <button key={item.key} type="button" onClick={() => setActive(index)} className={`border-b-2 px-1 pb-3 text-center text-[9px] font-semibold uppercase tracking-[0.08em] ${index === active ? "border-cyan-500 text-slate-900" : "border-transparent text-slate-400"}`}>{item.label}</button>)}
          </div>
          <div className="mt-6 border border-slate-200 bg-white"><JourneySurface step={step} /></div>
          <p className="mt-4 text-[13px] leading-[1.6] text-slate-500">{step.copy}</p>
        </div>
      </div>
    </section>
  );
}

function UnlimitedUsersSection() {
  const people = [
    { initials: "OA", role: "Owner", left: "5%", top: "16%" },
    { initials: "FR", role: "Front desk", left: "65%", top: "7%" },
    { initials: "SL", role: "Sales", left: "80%", top: "43%" },
    { initials: "TM", role: "Team", left: "64%", top: "79%" },
    { initials: "AC", role: "Accounts", left: "9%", top: "75%" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#DDE9EA] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        <div className="max-w-[590px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3D7378]">Unlimited users included</div>
          <h2 className="mt-5 text-[48px] leading-[0.94] tracking-[-0.06em] text-[#111318] sm:text-[64px] lg:text-[76px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Stop paying a tax on teamwork.</h2>
          <p className="mt-6 max-w-[520px] text-[15px] leading-[1.7] text-slate-600 sm:text-[17px]">The customer journey rarely belongs to one person. Everyone who needs the context should be able to see it.</p>
          <div className="mt-8 border-t border-[#ACC5C7] pt-5 text-[14px] font-semibold text-[#2A5A5E]">Unlimited users. One shared customer context.</div>
        </div>

        <div className="relative mx-auto aspect-[1.15/1] w-full max-w-[650px]">
          <div className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9AB7B9]" />
          <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#9AB7B9]" />
          <div className="absolute left-1/2 top-1/2 z-20 flex h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#111318] text-white shadow-[0_28px_70px_-32px_rgba(15,23,42,.62)] sm:h-[200px] sm:w-[200px]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-[11px] font-bold text-[#07191D]">SM</div>
            <div className="mt-4 text-[15px] font-semibold">Sarah Miller</div>
            <div className="mt-1 text-[10px] text-white/45">Shared customer context</div>
          </div>
          {people.map((person) => (
            <div key={person.role} className="absolute z-30 flex items-center gap-2 bg-white px-3 py-2 shadow-[0_12px_36px_-24px_rgba(15,23,42,.42)] ring-1 ring-[#B7CBCC]" style={{ left: person.left, top: person.top }}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F5F5] text-[9px] font-bold text-[#276C72]">{person.initials}</div>
              <div className="text-[10px] font-semibold text-slate-700 sm:text-[11px]">{person.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuidedLaunchSection() {
  const messy = ["Website form", "Inbox", "Notebook", "Calendar", "Owner remembers"];
  const clean = ["Enquiry", "Context", "Owner", "Booked", "Review", "Return"];

  return (
    <section className="bg-[#EEE8DE] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <div className="max-w-[820px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7A6751]">Guided Launch</div>
          <h2 className="mt-5 text-[46px] leading-[0.95] tracking-[-0.057em] text-[#111318] sm:text-[64px] lg:text-[72px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>We redesign the customer journey before we automate it.</h2>
          <p className="mt-6 max-w-[700px] text-[15px] leading-[1.7] text-[#71675B] sm:text-[17px]">Not a blank account. Not a setup wizard. A working operating map built around the way your business actually moves customers.</p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-[#D1C6B8] pt-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8D7B67]">Today</div>
            <div className="relative mt-8 min-h-[430px] border-l border-[#BCAE9D] border-t border-[#BCAE9D]">
              {messy.map((item, index) => {
                const pos = [
                  ["8%", "12%"], ["48%", "35%"], ["14%", "64%"], ["62%", "71%"], ["57%", "11%"],
                ][index];
                return <div key={item} className="absolute text-[13px] font-semibold text-slate-800" style={{ left: pos[0], top: pos[1] }}>{item}</div>;
              })}
              <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 600 430" preserveAspectRatio="none"><path d="M110 75 L310 165 L140 300 L410 335 M335 70 L310 165 M210 90 L140 300" fill="none" stroke="#9E8E7B" strokeWidth="1.4" strokeDasharray="6 6" /></svg>
            </div>
          </div>

          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#2F6B70]">With Zapla</div>
            <div className="relative mt-8 min-h-[430px] border-l border-[#6B969A] border-t border-[#6B969A]">
              {clean.map((item, index) => {
                const pos = [["6%", "12%"], ["34%", "12%"], ["65%", "12%"], ["65%", "48%"], ["34%", "72%"], ["6%", "72%"]][index];
                return <div key={item} className="absolute flex items-center gap-2 text-[13px] font-semibold text-slate-800" style={{ left: pos[0], top: pos[1] }}><span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-cyan-500" : "bg-[#356F74]"}`} />{item}</div>;
              })}
              <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 600 430" preserveAspectRatio="none"><path d="M60 62 H250 H430 V215 L250 330 H60" fill="none" stroke="#356F74" strokeWidth="2" /></svg>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#D1C6B8] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#506C6F]">Map → Build → Launch → Tune</div>
          <a href={BOOK_URL} className="inline-flex h-[48px] w-fit items-center gap-2 bg-[#111318] px-5 text-[13px] font-semibold text-white">Talk through your workflow <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
    </section>
  );
}

function OutcomeBranchSection() {
  const [activeKey, setActiveKey] = useState(OUTCOMES[0].key);
  const active = OUTCOMES.find((item) => item.key === activeKey) ?? OUTCOMES[0];

  return (
    <section className="relative overflow-hidden bg-[#080B10] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <div>
            <Kicker dark>Follow-through in action</Kicker>
            <h2 className="mt-5 text-[48px] leading-[0.94] tracking-[-0.06em] sm:text-[66px] lg:text-[76px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>One system.<br />Different moments.</h2>
            <p className="mt-6 max-w-[500px] text-[15px] leading-[1.7] text-white/48 sm:text-[17px]">Missed enquiry, quiet quote, past customer or completed job. The moment changes. The follow-through principle stays the same.</p>
            <AnimatePresence mode="wait">
              <motion.div key={active.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="mt-9 border-t border-white/10 pt-6">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">{active.eyebrow}</div>
                <div className="mt-3 text-[26px] font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-[32px]" style={{ fontFamily: DISPLAY }}>{active.headline}</div>
                <p className="mt-4 max-w-[470px] text-[13px] leading-[1.65] text-white/45">{active.copy}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-white/45">{active.steps.map((step) => <span key={step} className="inline-flex items-center gap-2"><ArrowRight className="h-3 w-3" style={{ color: active.accent }} />{step}</span>)}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[680px]">
            <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12 bg-[#0F141C] sm:h-[190px] sm:w-[190px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center"><Zap className="h-6 w-6 text-cyan-300" /><div className="mt-3 text-[11px] font-bold tracking-[0.15em] text-white">ZAPLA</div></div>
            </div>
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 680 680"><line x1="340" y1="340" x2="530" y2="150" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/><line x1="340" y1="340" x2="585" y2="350" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/><line x1="340" y1="340" x2="485" y2="565" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/><line x1="340" y1="340" x2="155" y2="555" stroke="rgba(255,255,255,.14)" strokeWidth="1.5"/></svg>
            {[
              [OUTCOMES[0], "65%", "12%"], [OUTCOMES[1], "79%", "48%"], [OUTCOMES[2], "61%", "82%"], [OUTCOMES[3], "7%", "79%"],
            ].map(([item, left, top]) => {
              const outcome = item as Outcome;
              const Icon = outcome.icon;
              const on = outcome.key === active.key;
              return (
                <button key={outcome.key} type="button" onClick={() => setActiveKey(outcome.key)} className={`absolute flex min-w-[130px] items-center gap-3 border px-3 py-3 text-left transition-all ${on ? "border-white bg-white text-[#111318]" : "border-white/12 bg-[#0D1219] text-white/60 hover:border-white/28 hover:text-white"}`} style={{ left: left as string, top: top as string }}>
                  <Icon className="h-4 w-4 shrink-0" style={{ color: on ? outcome.accent : undefined }} /><span className="text-[10px] font-semibold">{outcome.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalDecisionSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-8 border-t border-slate-200 pt-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[900px]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">The decision</div>
          <h2 className="mt-4 text-[42px] leading-[0.96] tracking-[-0.055em] text-[#111318] sm:text-[58px] lg:text-[66px]" style={{ fontFamily: DISPLAY, fontWeight: 500 }}>Keep doing the work only your team can do.</h2>
          <div className="mt-4 text-[22px] font-medium tracking-[-0.035em] text-slate-500 sm:text-[26px]">Zapla keeps what happens next moving.</div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 bg-[#111318] px-5 text-[13px] font-semibold text-white">Book a Call <ArrowRight className="h-4 w-4" /></a>
          <a href="/pricing" className="inline-flex h-[50px] items-center border border-slate-300 px-5 text-[13px] font-semibold text-slate-800">See plans and pricing</a>
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
      <OutcomeBranchSection />
      <FinalDecisionSection />
    </>
  );
}
