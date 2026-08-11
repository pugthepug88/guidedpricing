import { Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Bell,
  Calendar,
  Check,
  Clock,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Star,
  Tag,
  ThumbsUp,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  Card,
  ChannelMark,
  Cursor,
  EASE,
  Pill,
  StepIn,
  Toast,
} from "./kit";

export type SceneProps = { step: number; reduced: boolean };

/* ================================================================== */
/* 1. ENQUIRIES                                                        */
/* ================================================================== */

const ENQ_CURSOR: Array<[number, number]> = [
  [18, 30],
  [22, 44],
  [40, 74],
  [46, 78],
  [78, 34],
  [78, 44],
  [80, 56],
  [80, 62],
];

const COLUMNS = ["New Enquiry", "Contacted", "Appointment Booked"];

export function SceneEnquiries({ step, reduced }: SceneProps) {
  const col = step >= 6 ? 2 : step >= 5 ? 1 : 0;
  const [cx, cy] = ENQ_CURSOR[Math.min(step, ENQ_CURSOR.length - 1)];

  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[1.15fr_1fr]">
        {/* thread */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Avatar name="Maya Chen" tone="bg-fuchsia-100 text-fuchsia-700" />
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-slate-900">
                Maya Chen
              </div>
              <div className="flex items-center gap-1 text-[9.5px] text-slate-400">
                <ChannelMark channel="instagram" size={11} /> Instagram DM
                <span className="text-slate-300">·</span> North &amp; Pine Studio
              </div>
            </div>
            <StepIn show={step >= 1} className="ml-auto flex flex-wrap gap-1">
              <Pill tone="blue">New Enquiry</Pill>
              <Pill tone="violet">Instagram</Pill>
              <Pill tone="amber">High Intent</Pill>
            </StepIn>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
            <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-[11px] leading-snug text-slate-700">
              Hi! Do you have availability next Friday?
              <div className="mt-1 text-[9px] text-slate-400">9:41 AM</div>
            </div>

            <AnimatePresence>
              {step >= 2 && step < 3 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="ml-auto max-w-[86%] rounded-xl border border-violet-200 bg-violet-50/70 p-2.5"
                >
                  <div className="mb-1 flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-wide text-violet-700">
                    <Sparkles className="h-3 w-3" /> Zapla AI draft
                    <Pill tone="violet" className="ml-auto normal-case">
                      Ready for approval
                    </Pill>
                  </div>
                  <p className="text-[11px] leading-snug text-slate-700">
                    Hi Maya, yes we have Friday open. Would 2:30 PM suit? I can hold
                    it for you.
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-[3px] text-[9.5px] font-semibold text-white">
                      <Send className="h-2.5 w-2.5" /> Send
                    </span>
                    <span className="rounded-md border border-slate-200 px-2 py-[3px] text-[9.5px] text-slate-500">
                      Edit
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <StepIn
              show={step >= 3}
              className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-blue-600 px-3 py-2 text-[11px] leading-snug text-white"
            >
              <div>
                Hi Maya, yes we have Friday open. Would 2:30 PM suit? I can hold it
                for you.
              </div>
              <div className="mt-1 flex items-center gap-1 text-[9px] text-blue-100">
                <Check className="h-2.5 w-2.5" /> Approved and sent
              </div>
            </StepIn>

            <StepIn
              show={step >= 6}
              className="max-w-[80%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-[11px] leading-snug text-slate-700"
            >
              Perfect, 2:30 PM Friday works.
            </StepIn>

            <StepIn show={step >= 7} className="mt-auto flex flex-wrap gap-1.5">
              <Pill tone="green">
                <MessageSquare className="h-2.5 w-2.5" /> SMS confirmation sent
              </Pill>
              <Pill tone="green">
                <Mail className="h-2.5 w-2.5" /> Email confirmation sent
              </Pill>
            </StepIn>
          </div>
        </Card>

        {/* pipeline */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-[10.5px] font-semibold text-slate-500">
            Client journey pipeline
            <Pill tone="slate" className="ml-auto">
              3 stages
            </Pill>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 gap-2 p-2.5">
            {COLUMNS.map((name, i) => (
              <div key={name} className="flex min-w-0 flex-col">
                <div className="mb-1.5 flex items-center gap-1">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      i === 0
                        ? "bg-blue-500"
                        : i === 1
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    )}
                  />
                  <span className="truncate text-[9.5px] font-semibold text-slate-600">
                    {name}
                  </span>
                </div>
                <div className="min-h-0 flex-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-1.5">
                  {col === i && step >= 4 ? (
                    <motion.div
                      layout={!reduced}
                      layoutId="enq-opp"
                      transition={{ duration: 0.7, ease: EASE }}
                      className="rounded-lg border border-slate-200 bg-white p-2 shadow-[0_6px_16px_-10px_rgba(15,23,42,0.3)]"
                    >
                      <div className="text-[10px] font-semibold leading-tight text-slate-900">
                        North &amp; Pine Studio
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-400">
                        <Avatar
                          name="Maya Chen"
                          size={13}
                          tone="bg-fuchsia-100 text-fuchsia-700"
                        />
                        Maya Chen
                      </div>
                      <div className="mt-1.5 flex items-center gap-1">
                        <ChannelMark channel="instagram" size={11} />
                        <span className="text-[9px] text-slate-400">
                          Enquiry
                        </span>
                      </div>
                    </motion.div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <StepIn show={step >= 6} className="px-2.5 pb-2.5">
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2">
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              <div className="text-[10px] font-semibold text-emerald-800">
                Friday 2:30 PM &middot; Initial Consultation
              </div>
            </div>
          </StepIn>
        </Card>
      </div>

      <Toast
        show={step >= 6}
        title="Appointment booked"
        body="Friday 2:30 PM with North & Pine Studio."
      />
      <Cursor x={cx} y={cy} clicking={step === 3 || step === 4} reduced={reduced} />
    </div>
  );
}

/* ================================================================== */
/* 2. INBOX                                                            */
/* ================================================================== */

const THREADS = [
  {
    name: "Maya Chen",
    channel: "instagram" as const,
    preview: "2:30 PM Friday works.",
    time: "9:44 AM",
    tone: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    name: "Jordan Lee",
    channel: "sms" as const,
    preview: "Can you send the quote again?",
    time: "9:12 AM",
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Priya Nair",
    channel: "email" as const,
    preview: "Re: Site visit next week",
    time: "Yesterday",
    tone: "bg-blue-100 text-blue-700",
  },
  {
    name: "Field & Form",
    channel: "messenger" as const,
    preview: "Thanks for the fast reply!",
    time: "Yesterday",
    tone: "bg-indigo-100 text-indigo-700",
  },
];

const INBOX_CURSOR: Array<[number, number]> = [
  [12, 30],
  [12, 34],
  [50, 60],
  [50, 70],
  [88, 40],
  [88, 52],
];

export function SceneInbox({ step, reduced }: SceneProps) {
  const [cx, cy] = INBOX_CURSOR[Math.min(step, INBOX_CURSOR.length - 1)];
  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[0.85fr_1.3fr_0.85fr]">
        {/* list */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 text-[10.5px] font-semibold text-slate-500">
            Team inbox
            <Pill tone="blue" className="ml-auto">
              All channels
            </Pill>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden p-1.5">
            {THREADS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={false}
                animate={{
                  backgroundColor:
                    i === 0 && step >= 1 ? "rgb(239 246 255)" : "rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "flex items-start gap-2 rounded-lg px-2 py-2",
                  i === 0 && step >= 1 && "ring-1 ring-blue-200"
                )}
              >
                <div className="relative">
                  <Avatar name={t.name} tone={t.tone} size={22} />
                  <span className="absolute -bottom-1 -right-1">
                    <ChannelMark channel={t.channel} size={11} />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="truncate text-[10.5px] font-semibold text-slate-800">
                      {t.name}
                    </span>
                    <span className="ml-auto shrink-0 text-[9px] text-slate-400">
                      {t.time}
                    </span>
                  </div>
                  <div className="truncate text-[9.5px] text-slate-400">
                    {t.preview}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* thread */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Avatar name="Maya Chen" tone="bg-fuchsia-100 text-fuchsia-700" size={22} />
            <div className="text-[11.5px] font-semibold text-slate-900">
              Maya Chen
            </div>
            <StepIn show={step >= 2} className="ml-auto">
              <Pill tone="green">One customer, every channel</Pill>
            </StepIn>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden px-3 py-3">
            <div className="mx-auto flex items-center gap-1 text-[9px] font-medium text-slate-400">
              <ChannelMark channel="instagram" size={11} /> Instagram DM
            </div>
            <div className="max-w-[78%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-[11px] text-slate-700">
              Hi! Do you have availability next Friday?
            </div>
            <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-blue-600 px-3 py-2 text-[11px] text-white">
              Friday 2:30 PM is open, shall I hold it?
            </div>

            <StepIn show={step >= 2} className="mx-auto flex items-center gap-1 text-[9px] font-medium text-slate-400">
              <span className="flex items-center gap-1">
                <ChannelMark channel="sms" size={11} /> Continued over SMS
                <ArrowRight className="h-2.5 w-2.5" /> same record
              </span>
            </StepIn>
            <StepIn
              show={step >= 2}
              delay={0.1}
              className="max-w-[78%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-[11px] text-slate-700"
            >
              Yes please, texting is easier. 2:30 works.
            </StepIn>
            <StepIn
              show={step >= 3}
              className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-blue-600 px-3 py-2 text-[11px] text-white"
            >
              Locked in. You&rsquo;ll get a confirmation shortly.
            </StepIn>
            <div className="mt-auto flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 text-[10px] text-slate-400">
              <ChannelMark channel="sms" size={13} /> Reply as SMS
              <Send className="ml-auto h-3 w-3 text-blue-500" />
            </div>
          </div>
        </Card>

        {/* contact */}
        <Card className="hidden min-h-0 flex-col overflow-hidden lg:flex">
          <div className="border-b border-slate-100 px-3 py-2 text-[10.5px] font-semibold text-slate-500">
            Contact details
          </div>
          <div className="min-h-0 flex-1 space-y-2.5 p-3">
            <div className="flex items-center gap-2">
              <Avatar name="Maya Chen" tone="bg-fuchsia-100 text-fuchsia-700" size={26} />
              <div>
                <div className="text-[11px] font-semibold text-slate-900">
                  Maya Chen
                </div>
                <div className="text-[9.5px] text-slate-400">
                  North &amp; Pine Studio
                </div>
              </div>
            </div>
            <Field label="Email" value="maya@northpine.example" />
            <Field label="Mobile" value="04·· ··· 118" />
            <Field label="Source" value="Instagram DM" />
            <div>
              <div className="mb-1 text-[9px] uppercase tracking-wide text-slate-400">
                Tags
              </div>
              <StepIn show={step >= 4} className="flex flex-wrap gap-1">
                <Pill tone="blue">
                  <Tag className="h-2.5 w-2.5" /> New Enquiry
                </Pill>
                <Pill tone="amber">High Intent</Pill>
                <Pill tone="violet">Instagram</Pill>
              </StepIn>
            </div>
            <StepIn show={step >= 5}>
              <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2 py-1.5 text-[9.5px] font-semibold text-emerald-800">
                <Check className="h-3 w-3" /> Opportunity created
              </div>
            </StepIn>
          </div>
        </Card>
      </div>
      <Cursor x={cx} y={cy} clicking={step === 1 || step === 4} reduced={reduced} />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="text-[10.5px] text-slate-700">{value}</div>
    </div>
  );
}

/* ================================================================== */
/* 3. BOOKINGS                                                         */
/* ================================================================== */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const HOURS = ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"];

type Ev = {
  day: number;
  row: number;
  span?: number;
  title: string;
  time: string;
  tone: string;
};

const EVENTS: Ev[] = [
  { day: 0, row: 0, title: "Initial Consultation", time: "10:00", tone: "bg-blue-500" },
  { day: 1, row: 2, title: "Service Appointment", time: "12:00", tone: "bg-violet-500" },
  { day: 2, row: 1, title: "Site Visit", time: "11:00", tone: "bg-cyan-600" },
  { day: 3, row: 3, title: "Quote Review", time: "1:00", tone: "bg-amber-500" },
  { day: 0, row: 4, title: "Follow-up Call", time: "2:00", tone: "bg-slate-500" },
  { day: 2, row: 5, title: "Project Handover", time: "3:00", tone: "bg-emerald-600" },
];

const BOOK_CURSOR: Array<[number, number]> = [
  [20, 24],
  [58, 62],
  [60, 66],
  [60, 66],
  [82, 40],
  [82, 52],
];

export function SceneBookings({ step, reduced }: SceneProps) {
  const [cx, cy] = BOOK_CURSOR[Math.min(step, BOOK_CURSOR.length - 1)];
  const showPanel = step >= 4;
  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[1.55fr_0.85fr]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[10.5px] font-semibold text-slate-600">
              Week view
            </span>
            <Pill tone="slate">Team calendar</Pill>
            <StepIn show={step >= 0} className="ml-auto">
              <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1 text-[9.5px] text-slate-600">
                <ChannelMark channel="sms" size={11} /> &ldquo;Friday afternoon
                works&rdquo;
              </div>
            </StepIn>
          </div>

          <div className="min-h-0 flex-1 p-2">
            <div className="grid h-full grid-cols-[34px_repeat(5,1fr)] grid-rows-[16px_repeat(6,1fr)] gap-[3px]">
              <div />
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className={cn(
                    "text-center text-[9px] font-semibold",
                    i === 4 ? "text-blue-600" : "text-slate-400"
                  )}
                >
                  {d}
                </div>
              ))}
              {HOURS.map((h, r) => (
                <Fragment key={h}>
                  <div
                    className="pr-1 text-right text-[8.5px] leading-none text-slate-300"
                  >
                    {h}
                  </div>
                  {DAYS.map((d, c) => {
                    const ev = EVENTS.find((e) => e.day === c && e.row === r);
                    const isSlot = c === 4 && (r === 4 || r === 5);
                    const isTarget = c === 4 && r === 4;
                    return (
                      <div
                        key={d + h}
                        className={cn(
                          "relative rounded-[5px] border border-slate-100 bg-slate-50/50"
                        )}
                      >
                        {ev ? (
                          <div className="absolute inset-[2px] overflow-hidden rounded-[4px] px-1 py-[2px] text-[8px] font-semibold leading-tight text-white">
                            <div className={cn("absolute inset-0", ev.tone)} />
                            <div className="relative truncate">{ev.title}</div>
                            <div className="relative text-[7.5px] font-normal opacity-80">
                              {ev.time}
                            </div>
                          </div>
                        ) : null}
                        {isSlot && step >= 1 && step < 3 ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-[2px] rounded-[4px] border border-dashed border-blue-400 bg-blue-50"
                          >
                            <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-semibold text-blue-600">
                              {r === 4 ? "2:30 PM" : "3:30 PM"}
                            </span>
                          </motion.div>
                        ) : null}
                        {isTarget && step >= 3 ? (
                          <motion.div
                            layout={!reduced}
                            initial={{ opacity: 0, y: -14, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.55, ease: EASE }}
                            className="absolute inset-[2px] overflow-hidden rounded-[4px] bg-blue-600 px-1 py-[2px] text-[8px] font-semibold leading-tight text-white ring-2 ring-blue-200"
                          >
                            <div className="truncate">Initial Consultation</div>
                            <div className="text-[7.5px] font-normal opacity-85">
                              2:30 &middot; Maya C.
                            </div>
                          </motion.div>
                        ) : null}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </Card>

        <div className="hidden min-h-0 lg:block">
          <motion.div
            initial={false}
            animate={
              showPanel
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: reduced ? 0 : 24 }
            }
            transition={{ duration: 0.5, ease: EASE }}
            className="h-full"
          >
            <Card className="flex h-full flex-col overflow-hidden">
              <div className="border-b border-slate-100 px-3 py-2 text-[10.5px] font-semibold text-slate-500">
                Appointment details
              </div>
              <div className="flex-1 space-y-2.5 p-3">
                <div>
                  <div className="text-[11px] font-semibold text-slate-900">
                    Initial Consultation
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-[9.5px] text-slate-400">
                    <Clock className="h-3 w-3" /> Friday 2:30 &ndash; 3:00 PM
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 p-2">
                  <div className="mb-1.5 flex items-center gap-1 text-[9px] uppercase tracking-wide text-slate-400">
                    <UserCheck className="h-3 w-3" /> Round robin assignment
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Avatar name="Sam Ortiz" size={20} tone="bg-blue-100 text-blue-700" />
                    <div className="text-[10px] font-semibold text-slate-700">
                      Sam Ortiz
                    </div>
                    <Pill tone="green" className="ml-auto">
                      Assigned
                    </Pill>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    ["SMS confirmation sent", 0],
                    ["Email confirmation sent", 0.08],
                    ["24h reminder scheduled", 0.16],
                    ["1h reminder scheduled", 0.24],
                  ].map(([label, d]) => (
                    <StepIn
                      key={label as string}
                      show={step >= 5}
                      delay={d as number}
                      className="flex items-center gap-1.5 text-[9.5px] text-slate-600"
                    >
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-2 w-2" strokeWidth={3} />
                      </span>
                      {label as string}
                    </StepIn>
                  ))}
                </div>
                <StepIn show={step >= 5} delay={0.3}>
                  <div className="rounded-lg bg-emerald-50 px-2 py-1.5 text-[9.5px] font-semibold text-emerald-800">
                    Status: Appointment Booked
                  </div>
                </StepIn>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      <Cursor x={cx} y={cy} clicking={step === 2} reduced={reduced} />
    </div>
  );
}

/* ================================================================== */
/* 4. AUTOMATIONS                                                      */
/* ================================================================== */

const NODES = [
  { title: "Job completed", sub: "Trigger", icon: Check, tone: "text-blue-600 bg-blue-50" },
  { title: "Wait 2 hours", sub: "Delay", icon: Clock, tone: "text-slate-500 bg-slate-100" },
  {
    title: "Thank-you SMS + review link",
    sub: "Sent to every completed job",
    icon: MessageSquare,
    tone: "text-emerald-600 bg-emerald-50",
  },
];

export function SceneAutomations({ step, reduced }: SceneProps) {
  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[1.25fr_0.9fr]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[10.5px] font-semibold text-slate-600">
              Review request workflow
            </span>
            <Pill tone="green" className="ml-auto">
              Live
            </Pill>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden px-3 py-2.5">
            <div className="flex h-full flex-col justify-between">
              {NODES.map((n, i) => (
                <Node
                  key={n.title}
                  {...n}
                  done={step > i}
                  active={step === i}
                  reduced={reduced}
                  connector
                />
              ))}

              {/* branch */}
              <div className="grid grid-cols-2 gap-2">
                <BranchCard
                  label="Review received"
                  detail="Team notification"
                  tone="emerald"
                  done={step >= 4}
                  active={step === 3}
                />
                <BranchCard
                  label="No response"
                  detail="One reminder after 2 days"
                  tone="slate"
                  done={step >= 4}
                  active={step === 3}
                />
              </div>

              <Node
                title="Tag customer &ldquo;Advocate&rdquo;"
                sub="Every eligible customer is asked once"
                icon={Tag}
                tone="text-violet-600 bg-violet-50"
                done={step >= 5}
                active={step === 4}
                reduced={reduced}
                connectorTop
              />
            </div>
          </div>
        </Card>

        <div className="flex min-h-0 flex-col gap-3">
          <StepIn show={step >= 5} className="min-h-0">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Avatar name="Jordan Lee" size={24} tone="bg-emerald-100 text-emerald-700" />
                <div>
                  <div className="text-[10.5px] font-semibold text-slate-900">
                    Jordan Lee
                  </div>
                  <div className="text-[9px] text-slate-400">
                    Harbour Dental &middot; Google review
                  </div>
                </div>
                <span className="ml-auto flex gap-[1px]">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
              </div>
              <p className="mt-2 text-[10.5px] leading-snug text-slate-600">
                &ldquo;Booked in easily and everything was explained clearly.
                Genuinely the smoothest experience we&rsquo;ve had.&rdquo;
              </p>
            </Card>
          </StepIn>
          <StepIn show={step >= 5} delay={0.15}>
            <Card className="flex items-center gap-2 p-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Bell className="h-3 w-3" />
              </span>
              <div className="text-[10px] text-slate-600">
                Team notified in Zapla
              </div>
              <Pill tone="violet" className="ml-auto">
                <ThumbsUp className="h-2.5 w-2.5" /> Advocate
              </Pill>
            </Card>
          </StepIn>
          <div className="mt-auto rounded-xl border border-dashed border-slate-200 p-2.5 text-[9.5px] leading-snug text-slate-400">
            Every completed job receives the same request. No filtering of who gets
            asked.
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({
  title,
  sub,
  icon: Icon,
  tone,
  done,
  active,
  reduced,
  connector,
  connectorTop,
}: {
  title: string;
  sub: string;
  icon: typeof Check;
  tone: string;
  done: boolean;
  active: boolean;
  reduced: boolean;
  connector?: boolean;
  connectorTop?: boolean;
}) {
  return (
    <div className="relative">
      {connectorTop ? <Connector done={done} reduced={reduced} top /> : null}
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border bg-white px-2.5 py-2 transition-colors duration-500",
          active
            ? "border-blue-300 shadow-[0_0_0_3px_rgba(37,99,255,0.08)]"
            : "border-slate-200"
        )}
      >
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
            tone
          )}
        >
          <Icon className="h-3 w-3" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[10.5px] font-semibold text-slate-800">
            {title}
          </div>
          <div className="truncate text-[9px] text-slate-400">{sub}</div>
        </div>
        <span
          className={cn(
            "ml-auto flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-500",
            done ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300"
          )}
        >
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </span>
      </div>
      {connector ? <Connector done={done} reduced={reduced} /> : null}
    </div>
  );
}

function Connector({
  done,
  reduced,
  top,
}: {
  done: boolean;
  reduced: boolean;
  top?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute left-[19px] h-4 w-[2px] overflow-hidden rounded bg-slate-200",
        top ? "-top-4" : "-bottom-4"
      )}
    >
      <motion.span
        className="absolute inset-x-0 h-2 rounded bg-blue-500"
        initial={false}
        animate={done ? { y: [-8, 16] } : { y: -10 }}
        transition={
          done && !reduced
            ? { duration: 0.7, ease: "easeInOut" }
            : { duration: 0 }
        }
      />
    </div>
  );
}

function BranchCard({
  label,
  detail,
  tone,
  done,
  active,
}: {
  label: string;
  detail: string;
  tone: "emerald" | "slate";
  done: boolean;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white px-2.5 py-2 transition-colors duration-500",
        active ? "border-blue-300" : "border-slate-200"
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "emerald" ? "bg-emerald-500" : "bg-slate-400"
          )}
        />
        <span className="text-[10px] font-semibold text-slate-800">{label}</span>
        {done ? (
          <Check className="ml-auto h-3 w-3 text-emerald-500" strokeWidth={3} />
        ) : null}
      </div>
      <div className="mt-0.5 text-[9px] leading-snug text-slate-400">{detail}</div>
    </div>
  );
}
