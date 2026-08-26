import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  MessageSquareText,
  PlugZap,
  RefreshCw,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  UsersRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

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
  steps: Array<{ label: string; detail: string; state: string; icon: LucideIcon }>;
};

const OUTCOMES: Outcome[] = [
  {
    key: "missed-enquiry",
    label: "Missed enquiry",
    eyebrow: "NEW LEAD FOLLOW-THROUGH",
    headline: "A new enquiry should not depend on who notices first.",
    copy: "Zapla can acknowledge the enquiry, keep the conversation moving, capture the customer and get the next step in motion while your team is busy doing the work.",
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
    copy: "Identify the customers who went quiet, reach back out with context and turn old records into new conversations instead of letting value sit dormant.",
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

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className={`text-[11px] font-semibold uppercase tracking-[0.19em] ${dark ? "text-cyan-300" : "text-cyan-600"}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <h2
      className={`text-[38px] leading-[1.01] tracking-[-0.047em] sm:text-[54px] lg:text-[68px] ${dark ? "text-white" : "text-[#111318]"} ${className}`}
      style={{ fontFamily: DISPLAY, fontWeight: 500 }}
    >
      {children}
    </h2>
  );
}

function LifecycleRail() {
  const stages = ["Capture", "Communicate", "Convert", "Operate", "Retain", "Grow"];
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-5 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.19em] text-slate-400">
          One customer lifecycle
        </div>
        <div className="zapla-scroll-hide flex min-w-0 items-center gap-3 overflow-x-auto pb-1 sm:gap-5">
          {stages.map((stage, index) => (
            <div key={stage} className="flex shrink-0 items-center gap-3 sm:gap-5">
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-slate-700 sm:text-[14px]">{stage}</span>
              {index < stages.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-slate-300" /> : null}
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
    { time: "9:28", title: "No reply yet", detail: "The team is busy with customers.", tone: "muted" },
    { time: "10:41", title: "Still waiting", detail: "Nobody owns the next step.", tone: "muted" },
    { time: "4:32", title: "Customer moved on", detail: "Booked elsewhere.", tone: "lost" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full bg-cyan-100/35 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-20">
        <div className="max-w-[650px]">
          <Eyebrow>Where revenue leaks</Eyebrow>
          <SectionTitle className="mt-4">
            Customers do not always say no.<br />Sometimes nobody followed through.
          </SectionTitle>
          <p className="mt-6 max-w-[600px] text-[16px] leading-[1.7] text-slate-500 sm:text-[18px]">
            The expensive gaps are often ordinary ones: an enquiry sits unanswered, a quote goes quiet, a missed call never becomes a conversation, or a past customer is simply forgotten.
          </p>
          <div className="mt-8 border-l-2 border-cyan-500 pl-5 text-[15px] font-medium leading-[1.6] text-slate-700 sm:text-[17px]">
            Zapla is built to keep the next step from disappearing between people, channels and busy days.
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[720px] py-6 lg:py-12">
          <div aria-hidden className="absolute bottom-[12%] left-[87px] top-[12%] w-px bg-slate-200 sm:left-[110px]" />
          {moments.map((moment, index) => {
            const lost = moment.tone === "lost";
            const live = moment.tone === "live";
            return (
              <div key={moment.time} className={`relative grid grid-cols-[64px_1fr] gap-5 py-5 sm:grid-cols-[82px_1fr] sm:gap-7 ${index ? "border-t border-slate-200/80" : ""}`}>
                <div className={`pt-1 text-right font-mono text-[12px] font-semibold ${lost ? "text-rose-500" : live ? "text-slate-900" : "text-slate-400"}`}>
                  {moment.time}
                </div>
                <div className="relative pl-7 sm:pl-9">
                  <span className={`absolute left-[-1px] top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-[#F7F8FA] ${lost ? "bg-rose-500" : live ? "bg-cyan-500" : "bg-slate-300"}`} />
                  <div className={`text-[17px] font-semibold tracking-[-0.02em] ${lost ? "text-rose-600" : "text-slate-900"}`}>{moment.title}</div>
                  <div className={`mt-1 text-[14px] leading-[1.55] ${lost ? "text-rose-500/80" : "text-slate-500"}`}>{moment.detail}</div>
                  {live ? (
                    <div className="mt-4 inline-flex max-w-[430px] items-start gap-3 rounded-[14px] bg-white px-4 py-3.5 shadow-[0_16px_55px_-32px_rgba(15,23,42,.38)] ring-1 ring-slate-200/80">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111318] text-[11px] font-bold text-white">SM</div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Sarah Miller</div>
                        <div className="mt-1 text-[14px] leading-[1.45] text-slate-700">Hi, are you available this week for a service?</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
          <div className="ml-[84px] mt-5 border-t border-slate-900 pt-5 sm:ml-[109px]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">The leak</div>
            <div className="mt-2 text-[22px] font-medium tracking-[-0.03em] text-slate-900 sm:text-[28px]">
              Nothing dramatic happened. That is the problem.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectedJourneySection() {
  const journey = [
    { icon: MessageSquareText, label: "Inbox", title: "New enquiry", detail: "Website · 9:14 AM", state: "Captured" },
    { icon: Zap, label: "Follow-up", title: "Reply sent", detail: "SMS · 9:15 AM", state: "Handled" },
    { icon: CalendarCheck2, label: "Booking", title: "Thu 10:30", detail: "Confirmed", state: "Booked" },
    { icon: CreditCard, label: "Payment", title: "$286.00", detail: "Invoice paid", state: "Paid" },
    { icon: Star, label: "Retention", title: "Review request", detail: "Sent after payment", state: "Continuing" },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1360px]">
        <div className="mx-auto max-w-[920px] text-center">
          <Eyebrow>One customer. One connected journey.</Eyebrow>
          <SectionTitle className="mt-4">Every customer moment. One connected system.</SectionTitle>
          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.7] text-slate-500 sm:text-[18px]">
            The conversation may move from inbox to booking to payment. The customer context and next step do not have to get lost along the way.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[1240px] overflow-hidden rounded-[24px] border border-slate-200 bg-[#FBFCFD] shadow-[0_40px_100px_-58px_rgba(15,23,42,.36)] lg:mt-16">
          <div className="flex flex-col gap-5 border-b border-slate-200 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111318] text-[12px] font-bold text-white">SM</div>
              <div>
                <div className="text-[15px] font-semibold text-slate-900">Sarah Miller</div>
                <div className="mt-0.5 text-[12px] text-slate-500">Returning customer · Sydney</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Customer journey active
            </div>
          </div>

          <div className="relative px-5 py-9 sm:px-7 sm:py-12 lg:px-10 lg:py-14">
            <div aria-hidden className="absolute left-[10%] right-[10%] top-[93px] hidden h-px bg-slate-200 lg:block" />
            <div className="grid gap-3 lg:grid-cols-5 lg:gap-0">
              {journey.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="relative min-w-0 border-b border-slate-200 py-5 last:border-b-0 lg:border-b-0 lg:border-r lg:px-6 lg:py-0 lg:last:border-r-0">
                    <div className="relative z-10 flex items-center justify-between lg:block">
                      <div className="flex items-center gap-3 lg:block">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm lg:mx-auto">
                          <Icon className="h-4 w-4 text-slate-700" />
                        </div>
                        <div className="lg:mt-5 lg:text-center">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{item.label}</div>
                          <div className="mt-1.5 text-[16px] font-semibold tracking-[-0.02em] text-slate-900">{item.title}</div>
                          <div className="mt-1 text-[12px] leading-[1.45] text-slate-500">{item.detail}</div>
                        </div>
                      </div>
                      <div className="shrink-0 rounded-full bg-cyan-50 px-2.5 py-1 text-[10px] font-semibold text-cyan-700 lg:mx-auto lg:mt-4 lg:w-fit">{item.state}</div>
                    </div>
                    {index < journey.length - 1 ? <ArrowRight className="absolute -right-2.5 top-[35px] z-20 hidden h-5 w-5 rounded-full bg-[#FBFCFD] p-1 text-slate-300 lg:block" /> : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] leading-[1.55] text-slate-500">
                Same customer. Same context. Every next step connected.
              </p>
              <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-700">
                <Workflow className="h-4 w-4 text-cyan-600" />
                Zapla keeps the thread intact
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UnlimitedUsersSection() {
  const people = [
    { initials: "OA", role: "Owner", x: "8%", y: "14%" },
    { initials: "FR", role: "Front desk", x: "68%", y: "4%" },
    { initials: "SL", role: "Sales", x: "80%", y: "42%" },
    { initials: "TM", role: "Team", x: "66%", y: "78%" },
    { initials: "AC", role: "Accounts", x: "14%", y: "76%" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F1F6F7] px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
        <div className="max-w-[650px]">
          <Eyebrow>Unlimited users included</Eyebrow>
          <SectionTitle className="mt-4">Stop paying a tax on teamwork.</SectionTitle>
          <p className="mt-6 max-w-[600px] text-[16px] leading-[1.7] text-slate-600 sm:text-[18px]">
            The customer journey rarely belongs to one person. Give everyone who needs visibility access without turning every extra teammate into another licence decision.
          </p>
          <div className="mt-8 space-y-3 text-[14px] font-medium text-slate-700 sm:text-[15px]">
            {["No seat-count anxiety when the team grows", "More people can see the same customer context", "The next step is easier to own when access is not rationed"].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[1.05/1] w-full max-w-[660px]">
          <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/80" />
          <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300/70" />
          <div className="absolute left-1/2 top-1/2 z-20 w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[22px] bg-[#111318] p-5 text-white shadow-[0_32px_80px_-36px_rgba(15,23,42,.72)] sm:p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/45">Shared customer context</div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[12px] font-bold text-[#111318]">SM</div>
              <div>
                <div className="text-[16px] font-semibold">Sarah Miller</div>
                <div className="mt-1 text-[12px] text-white/55">Appointment tomorrow · 10:30</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-y-4 border-t border-white/10 pt-5 text-[12px]">
              <div>
                <div className="text-white/40">Last touch</div>
                <div className="mt-1 font-semibold text-white/85">SMS reply</div>
              </div>
              <div>
                <div className="text-white/40">Next step</div>
                <div className="mt-1 font-semibold text-white/85">Reminder</div>
              </div>
            </div>
          </div>
          {people.map((person, index) => (
            <div
              key={person.role}
              className="absolute z-30 flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-2 pl-2 pr-3 shadow-[0_12px_40px_-24px_rgba(15,23,42,.4)]"
              style={{ left: person.x, top: person.y, transform: index === 2 ? "rotate(2deg)" : index === 4 ? "rotate(-2deg)" : undefined }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-[10px] font-bold text-cyan-700">{person.initials}</div>
              <div className="text-[11px] font-semibold text-slate-700 sm:text-[12px]">{person.role}</div>
            </div>
          ))}
          <div className="absolute bottom-[2%] left-1/2 z-40 -translate-x-1/2 rounded-full bg-cyan-500 px-5 py-2.5 text-center text-[12px] font-bold text-[#06252D] shadow-[0_14px_36px_-22px_rgba(6,182,212,.8)]">
            Unlimited users · included
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidedLaunchSection() {
  const steps = [
    { n: "01", title: "Understand", copy: "Map how enquiries, conversations, bookings, payments and follow-up actually move through your business." },
    { n: "02", title: "Configure", copy: "Set up the customer journey, pipelines, messaging, automations and the important handoffs." },
    { n: "03", title: "Launch", copy: "Get the team into a system that reflects the way the business needs to work, not a blank account." },
    { n: "04", title: "Improve", copy: "Refine the workflow from real usage so Zapla becomes part of the operating rhythm, not another shelfware subscription." },
  ];

  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1360px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="max-w-[620px] lg:sticky lg:top-[110px] lg:self-start">
          <Eyebrow>Guided Launch</Eyebrow>
          <SectionTitle className="mt-4">Software only works when the team actually uses it.</SectionTitle>
          <p className="mt-6 max-w-[580px] text-[16px] leading-[1.7] text-slate-500 sm:text-[18px]">
            Zapla does not need to start as a blank account and a pile of help articles. Guided Launch is designed to turn the customer journey into a working system your team can actually adopt.
          </p>
          <a href={BOOK_URL} className="mt-8 inline-flex h-[48px] items-center gap-2 rounded-[10px] bg-[#111318] px-5 text-[14px] font-semibold text-white">
            Talk through your workflow <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="border-t border-slate-200">
          {steps.map((step, index) => (
            <div key={step.n} className="grid gap-4 border-b border-slate-200 py-8 sm:grid-cols-[90px_180px_1fr] sm:items-start sm:gap-7 sm:py-10">
              <div className="font-mono text-[12px] font-semibold text-cyan-600">{step.n}</div>
              <div className="text-[22px] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[26px]">{step.title}</div>
              <div className="max-w-[520px] text-[14px] leading-[1.65] text-slate-500 sm:text-[15px]">{step.copy}</div>
              {index === 0 ? (
                <div className="hidden sm:col-start-3 sm:block">
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-[11px] font-semibold text-cyan-700">
                    <Route className="h-3.5 w-3.5" /> Built around your business
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeSwitcher() {
  const [activeKey, setActiveKey] = useState(OUTCOMES[0].key);
  const active = OUTCOMES.find((item) => item.key === activeKey) ?? OUTCOMES[0];
  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden bg-[#080B10] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="relative mx-auto max-w-[1360px]">
        <div className="max-w-[900px]">
          <Eyebrow dark>Follow-through in action</Eyebrow>
          <SectionTitle dark className="mt-4">What should Zapla follow through on?</SectionTitle>
          <p className="mt-5 max-w-[720px] text-[16px] leading-[1.7] text-white/55 sm:text-[18px]">
            Start with a customer moment that matters. Zapla connects the data, conversation and next action so the work can keep moving.
          </p>
        </div>

        <div className="zapla-scroll-hide mt-9 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Follow-through examples">
          {OUTCOMES.map((item) => {
            const on = item.key === active.key;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActiveKey(item.key)}
                className={`inline-flex h-[46px] shrink-0 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold transition-colors ${on ? "border-white bg-white text-[#111318]" : "border-white/15 bg-white/[0.035] text-white/55 hover:border-white/28 hover:text-white"}`}
              >
                <Icon className="h-4 w-4" /> {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-[24px] border border-white/10 bg-[#0E1219]">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px]" style={{ backgroundColor: `${active.accent}1F`, color: active.accent }}>
                <ActiveIcon className="h-5 w-5" />
              </div>
              <div className="mt-7 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/38">{active.eyebrow}</div>
              <h3 className="mt-3 text-[30px] font-medium leading-[1.04] tracking-[-0.04em] text-white sm:text-[38px]" style={{ fontFamily: DISPLAY }}>
                {active.headline}
              </h3>
              <p className="mt-5 text-[14px] leading-[1.7] text-white/52 sm:text-[15px]">{active.copy}</p>
            </div>

            <div className="p-5 sm:p-7 lg:p-10">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/35">Live customer journey</div>
                  <div className="mt-1.5 text-[15px] font-semibold text-white/85">One trigger. Connected next steps.</div>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1.5 text-[10px] font-semibold text-cyan-200 sm:flex">
                  <Sparkles className="h-3.5 w-3.5" /> Zapla active
                </div>
              </div>

              <div className="relative">
                <div aria-hidden className="absolute bottom-[26px] left-[17px] top-[26px] w-px bg-white/10 sm:left-[21px]" />
                {active.steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={`${active.key}-${step.label}`} className="relative grid grid-cols-[36px_1fr] gap-4 py-3 sm:grid-cols-[44px_1fr] sm:gap-5">
                      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#151A22] sm:h-11 sm:w-11">
                        <Icon className="h-4 w-4 text-white/68" />
                      </div>
                      <div className="flex min-w-0 flex-col gap-2 rounded-[14px] border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold text-white/88">{step.label}</div>
                          <div className="mt-1 text-[12px] text-white/38">{step.detail}</div>
                        </div>
                        <div className="w-fit shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ backgroundColor: `${active.accent}18`, color: active.accent }}>
                          {step.state}
                        </div>
                      </div>
                      {index < active.steps.length - 1 ? <div className="absolute left-[17px] top-[52px] h-3 w-px bg-white/10 sm:left-[21px] sm:top-[60px]" /> : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBridge() {
  const signals = [
    { icon: PlugZap, title: "Connect what matters", copy: "Keep the tools that still belong in your stack and connect the customer journey around them." },
    { icon: ShieldCheck, title: "Control the customer context", copy: "Bring conversations and next steps into a clearer operating system instead of scattering them across inboxes and memory." },
    { icon: UsersRound, title: "Built for the whole team", copy: "Give the people involved in the journey shared visibility without adding another per-seat decision." },
  ];

  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col gap-8 border-b border-slate-200 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <Eyebrow>Fit Zapla around the business</Eyebrow>
            <SectionTitle className="mt-4">One system should create clarity, not another migration headache.</SectionTitle>
          </div>
          <p className="max-w-[420px] text-[14px] leading-[1.7] text-slate-500 sm:text-[15px]">
            Zapla is designed to become the customer follow-through layer: connecting the journey, giving the team visibility and reducing the places where the next step can disappear.
          </p>
        </div>

        <div className="grid divide-y divide-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {signals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div key={signal.title} className="py-8 lg:px-9 lg:py-10 lg:first:pl-0 lg:last:pr-0">
                <Icon className="h-5 w-5 text-cyan-600" />
                <div className="mt-5 text-[18px] font-semibold tracking-[-0.025em] text-slate-900">{signal.title}</div>
                <p className="mt-2 max-w-[360px] text-[13px] leading-[1.65] text-slate-500 sm:text-[14px]">{signal.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingBridge() {
  return (
    <section className="bg-[#F2F7F8] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-[880px]">
            <Eyebrow>Plans built to grow with the journey</Eyebrow>
            <h2 className="mt-4 text-[36px] font-medium leading-[1.02] tracking-[-0.045em] text-[#111318] sm:text-[50px] lg:text-[58px]" style={{ fontFamily: DISPLAY }}>
              Start with the follow-through you need. Keep the team included.
            </h2>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[13px] font-semibold text-slate-600">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-600" /> Unlimited users</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-600" /> Connected customer system</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-600" /> Guided implementation path</span>
            </div>
          </div>
          <a href="/pricing" className="inline-flex h-[50px] w-fit shrink-0 items-center gap-2 rounded-[10px] bg-[#111318] px-6 text-[14px] font-semibold text-white">
            See plans and pricing <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#080B10] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute bottom-[-240px] left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-[150px]" />
      <div className="relative mx-auto max-w-[1180px] text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
          <Zap className="h-5 w-5 text-cyan-300" />
        </div>
        <h2 className="mx-auto mt-8 max-w-[980px] text-[42px] font-medium leading-[0.98] tracking-[-0.05em] text-white sm:text-[62px] lg:text-[78px]" style={{ fontFamily: DISPLAY }}>
          You do the work only you can do.<br />Zapla handles what happens next.
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.7] text-white/48 sm:text-[17px]">
          See how Zapla can connect the customer journey around the way your service business actually works.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href={BOOK_URL} className="inline-flex h-[50px] items-center gap-2 rounded-[10px] bg-white px-6 text-[14px] font-semibold text-[#111318]">
            Book a Call <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/pricing" className="inline-flex h-[50px] items-center rounded-[10px] border border-white/18 px-6 text-[14px] font-semibold text-white/82">
            See pricing
          </a>
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
      <TrustBridge />
      <PricingBridge />
      <FinalCTA />
    </>
  );
}
