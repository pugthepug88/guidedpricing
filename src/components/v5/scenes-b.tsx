import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileSignature,
  Image as ImageIcon,
  Mail,
  MailCheck,
  MousePointerClick,
  Plus,
  Search,
  Send,
  Sparkles,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  EASE,
  Face,
  MoneyIcon,
  NodeState,
  Pill,
  Pointer,
  SOCIAL_LABEL,
  SocialMark,
  StepIn,
  Toast,
  Toolbar,
} from "./kit";
import { FACE } from "./faces";
import type { SceneProps } from "./scenes-a";

/* ================================================================== */
/* 5. CONTENT PLANNER                                                  */
/* ================================================================== */

type Post = {
  day: number;
  time: string;
  title: string;
  channels: string[];
  tone: string;
  status?: "Scheduled" | "Published";
};

const PLANNED: Post[] = [
  {
    day: 0,
    time: "9:00 am",
    title: "Behind the scenes reel",
    channels: ["ig"],
    tone: "border-fuchsia-200 bg-fuchsia-50/70",
    status: "Published",
  },
  {
    day: 1,
    time: "11:30 am",
    title: "Customer spotlight",
    channels: ["fb", "ig"],
    tone: "border-blue-200 bg-blue-50/70",
    status: "Scheduled",
  },
  {
    day: 2,
    time: "8:15 am",
    title: "Team hiring update",
    channels: ["li"],
    tone: "border-cyan-200 bg-cyan-50/70",
    status: "Scheduled",
  },
  {
    day: 3,
    time: "4:00 pm",
    title: "Weekend availability",
    channels: ["gb", "fb"],
    tone: "border-emerald-200 bg-emerald-50/70",
    status: "Scheduled",
  },
];

const DAYS = ["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8"];

const CONTENT_POINTER: Array<[number, number]> = [
  [50, 30],
  [88, 12],
  [82, 40],
  [82, 58],
  [82, 74],
  [66, 46],
];

export function SceneContent({ step, reduced }: SceneProps) {
  const [px, py] = CONTENT_POINTER[Math.min(step, CONTENT_POINTER.length - 1)];
  const composer = step >= 1;
  const scheduled = step >= 5;

  const posts: Post[] = scheduled
    ? [
        ...PLANNED,
        {
          day: 4,
          time: "10:00 am",
          title: "New season openings",
          channels: ["ig", "fb", "li", "gb"],
          tone: "border-blue-300 bg-white ring-2 ring-blue-200",
          status: "Scheduled",
        },
      ]
    : PLANNED;

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11.5px] text-slate-500">
          Week of 4 Aug <ChevronDown className="h-3 w-3" />
        </span>
        <span className="hidden items-center gap-1.5 md:flex">
          {["ig", "fb", "li", "gb"].map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-[3px] text-[10.5px] text-slate-500"
            >
              <SocialMark id={c} /> {SOCIAL_LABEL[c]}
            </span>
          ))}
        </span>
        <span className="ml-auto">
          <Btn>
            <Plus className="h-3 w-3" /> New post
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-43px)] min-h-0 grid-cols-1 gap-2.5 p-3 lg:grid-cols-[minmax(0,1fr)_252px]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="grid shrink-0 grid-cols-5 border-b border-slate-200/80 bg-slate-50/70">
            {DAYS.map((d) => (
              <div
                key={d}
                className="px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-5 divide-x divide-slate-100">
            {DAYS.map((d, di) => (
              <div key={d} className="space-y-1.5 p-1.5">
                {posts
                  .filter((p) => p.day === di)
                  .map((p) => (
                    <motion.div
                      key={p.title}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                      className={cn("rounded-lg border px-2 py-2", p.tone)}
                    >
                      <div className="text-[10px] text-slate-400">{p.time}</div>
                      <div className="mt-1 text-[11.5px] font-semibold leading-snug text-slate-800">
                        {p.title}
                      </div>
                      <div className="mt-1.5 flex items-center gap-1">
                        {p.channels.map((c) => (
                          <SocialMark key={c} id={c} size={12} />
                        ))}
                        {p.status === "Published" ? (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        ) : null}
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </div>
        </Card>

        {/* composer */}
        <motion.div
          className="hidden min-h-0 lg:block"
          initial={false}
          animate={{ opacity: composer ? 1 : 0, x: composer ? 0 : 22 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
              <span className="text-[12.5px] font-semibold text-slate-900">New post</span>
              <Pill tone={scheduled ? "green" : "slate"} className="ml-auto">
                {scheduled ? "Scheduled" : "Draft"}
              </Pill>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
              <div className="flex h-14 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-slate-300">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div className="min-h-[54px] rounded-lg border border-slate-200 p-2 text-[11.5px] leading-relaxed text-slate-600">
                {step >= 2 ? "New season openings are live. " : ""}
                {step >= 3 ? "Book your spot for August and we will hold your usual time." : ""}
                {step < 2 ? <span className="text-slate-300">Write a caption…</span> : null}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["ig", "fb", "li", "gb"].map((c) => (
                  <span
                    key={c}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[10.5px] transition-colors duration-500",
                      step >= 3
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-500",
                    )}
                  >
                    <SocialMark id={c} /> {SOCIAL_LABEL[c]}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 text-[11.5px] text-slate-600">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {step >= 4 ? "Fri 8 Aug · 10:00 am" : "Choose date and time"}
              </div>
              <div className="mt-auto flex items-center gap-2">
                <Btn>
                  <Send className="h-3 w-3" /> Schedule
                </Btn>
                <Btn tone="ghost">Save draft</Btn>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Pointer x={px} y={py} active={step === 1 || step === 4} reduced={reduced} />
      <Toast
        show={scheduled}
        title="Scheduled across four channels"
        body="Friday 8 Aug, 10:00 am."
      />
    </div>
  );
}

/* ================================================================== */
/* 6. EMAIL MARKETING — sequence progression                           */
/* ================================================================== */

const CAMPAIGNS = [
  { name: "Quote Follow-Up", status: "Active", updated: "Today" },
  { name: "New Customer Welcome", status: "Published", updated: "2 Aug" },
  { name: "Winter service reminder", status: "Published", updated: "29 Jul" },
  { name: "Referral thank you", status: "Draft", updated: "24 Jul" },
];

const SEQ = [
  { label: "Email 1 · Quote recap", icon: Mail },
  { label: "Wait 2 days", icon: Timer },
  { label: "Email 2 · Any questions?", icon: Mail },
  { label: "Wait 3 days", icon: Timer },
  { label: "Email 3 · Last check-in", icon: Mail },
];

export function SceneEmail({ step, reduced }: SceneProps) {
  const replied = step >= 4;
  const activeIdx = Math.min(step, SEQ.length - 1);

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="text-[12.5px] font-semibold text-slate-900">Email Marketing</span>
        <span className="hidden items-center gap-1 md:flex">
          {["All", "Draft", "Published", "Archived"].map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded-md px-2 py-[3px] text-[11px]",
                i === 0 ? "bg-slate-900 font-semibold text-white" : "text-slate-500",
              )}
            >
              {t}
            </span>
          ))}
        </span>
        <span className="ml-auto">
          <Btn tone="ghost">
            <Plus className="h-3 w-3" /> New email
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-43px)] min-h-0 grid-cols-1 gap-2.5 p-3 lg:grid-cols-[248px_minmax(0,1fr)]">
        <Card className="hidden min-h-0 flex-col overflow-hidden lg:flex">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-slate-200/80 px-3 py-2 text-[11px] text-slate-400">
            <Search className="h-3.5 w-3.5" /> Search campaigns
          </div>
          <div className="divide-y divide-slate-100">
            {CAMPAIGNS.map((c, i) => (
              <div
                key={c.name}
                className={cn(
                  "px-3 py-2.5 transition-colors duration-500",
                  i === 0 ? "bg-blue-50/60" : "bg-white",
                )}
              >
                <div className="truncate text-[12px] font-semibold text-slate-800">{c.name}</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <Pill
                    tone={
                      c.status === "Active" ? "blue" : c.status === "Published" ? "green" : "slate"
                    }
                  >
                    {c.status}
                  </Pill>
                  <span className="ml-auto text-[10.5px] text-slate-400">{c.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* sequence */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200/80 px-3 py-2">
            <span className="text-[12.5px] font-semibold text-slate-900">Quote Follow-Up</span>
            <Pill tone="slate">Stop on reply · On</Pill>
            <Pill tone={replied ? "green" : "blue"} className="ml-auto">
              {replied ? "Replied" : "Active"}
            </Pill>
          </div>

          <div className="min-h-0 flex-1 space-y-1 p-3">
            {SEQ.map((s, i) => {
              const done = step > i && !(replied && i > 2);
              const active = i === activeIdx && !replied;
              const cancelled = replied && i > 2;
              return (
                <div key={s.label}>
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: cancelled ? 0.28 : done || active ? 1 : 0.5,
                    }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5",
                      active
                        ? "border-blue-300 shadow-[0_10px_26px_-18px_rgba(37,99,235,0.7)]"
                        : done
                          ? "border-emerald-200"
                          : "border-slate-200",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-[10px]",
                        done
                          ? "bg-emerald-50 text-emerald-600"
                          : active
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-50 text-slate-400",
                      )}
                    >
                      <s.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12.5px] font-semibold text-slate-800">
                        {s.label}
                      </div>
                      <div className="truncate text-[11px] text-slate-400">
                        {cancelled
                          ? "Cancelled after reply"
                          : done
                            ? "Delivered"
                            : active
                              ? "In progress"
                              : "Waiting"}
                      </div>
                    </div>
                    <span className="ml-auto">
                      <NodeState state={done ? "done" : active ? "active" : "idle"} />
                    </span>
                  </motion.div>
                  {i < SEQ.length - 1 ? (
                    <div className="ml-[27px] h-3.5 w-[2px] rounded-full bg-slate-200" />
                  ) : null}
                </div>
              );
            })}

            <AnimatePresence>
              {replied ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                  className="mt-2 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5"
                >
                  <Face src={FACE.priya} size={26} />
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold text-emerald-800">
                      Priya replied: “Happy to go ahead.”
                    </div>
                    <div className="text-[10.5px] text-emerald-700/80">
                      Status changed to Engaged. Remaining emails cancelled.
                    </div>
                  </div>
                  <MailCheck className="ml-auto h-4 w-4 text-emerald-600" />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <StepIn show={step === 2 && !replied} className="pt-1">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 py-2 text-[11.5px] text-slate-600">
                Subject: Still keen on your quote? · Hi{" "}
                <span className="font-semibold text-blue-700">{"{{contact.first_name}}"}</span>,
              </div>
            </StepIn>
          </div>
        </Card>
      </div>

      <Toast
        show={replied}
        title="Sequence stopped on reply"
        body="No duplicate chasing once a customer answers."
      />
    </div>
  );
}

/* ================================================================== */
/* 7. CALENDAR — internal team week view                               */
/* ================================================================== */

type Appt = {
  id: string;
  day: number;
  slot: number;
  title: string;
  who: string;
  face: string;
  tone: string;
  confirmed?: boolean;
};

const SLOTS = ["9:00", "10:30", "12:00", "1:30", "3:00"];
const CAL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function SceneCalendar({ step, reduced }: SceneProps) {
  const base: Appt[] = [
    {
      id: "a1",
      day: 0,
      slot: 0,
      title: "Site visit",
      who: "Tom Bennett",
      face: FACE.tom,
      tone: "border-blue-200 bg-blue-50",
      confirmed: true,
    },
    {
      id: "a2",
      day: 1,
      slot: 2,
      title: "Consult",
      who: "Priya Raman",
      face: FACE.priya,
      tone: "border-violet-200 bg-violet-50",
      confirmed: true,
    },
    {
      id: "a3",
      day: 2,
      slot: 1,
      title: "Install quote",
      who: "Daniel Okafor",
      face: FACE.daniel,
      tone: "border-cyan-200 bg-cyan-50",
      confirmed: true,
    },
    {
      id: "a4",
      day: 4,
      slot: 3,
      title: "Follow-up",
      who: "Leo Marchetti",
      face: FACE.leo,
      tone: "border-amber-200 bg-amber-50",
      confirmed: true,
    },
    {
      id: "a5",
      // reschedules from Thu 10:30 to Thu 3:00
      day: 3,
      slot: step >= 3 ? 4 : 1,
      title: "Studio refresh",
      who: "Sophie Nguyen",
      face: FACE.sophie,
      tone: "border-emerald-200 bg-emerald-50",
      confirmed: true,
    },
  ];

  const appts = step >= 1 ? base : base.filter((a) => a.id !== "a5");
  const newOne = step >= 1;

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11.5px] text-slate-500">
          Team week · 4 Aug <ChevronDown className="h-3 w-3" />
        </span>
        <Pill tone="blue">Auto confirmations on</Pill>
        <span className="ml-auto">
          <Btn tone="ghost">
            <Plus className="h-3 w-3" /> New appointment
          </Btn>
        </span>
      </Toolbar>

      <div className="h-[calc(100%-43px)] min-h-0 p-3">
        <Card className="flex h-full min-h-0 flex-col overflow-hidden">
          <div className="grid shrink-0 grid-cols-[52px_repeat(5,minmax(0,1fr))] border-b border-slate-200/80 bg-slate-50/70">
            <span />
            {CAL_DAYS.map((d) => (
              <div
                key={d}
                className="px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="min-h-0 flex-1">
            {SLOTS.map((s, si) => (
              <div
                key={s}
                className="grid h-1/5 grid-cols-[52px_repeat(5,minmax(0,1fr))] border-b border-slate-100 last:border-0"
              >
                <div className="px-2 py-1 text-[10px] text-slate-400">{s}</div>
                {CAL_DAYS.map((d, di) => {
                  const a = appts.find((x) => x.day === di && x.slot === si);
                  return (
                    <div key={d} className="border-l border-slate-100 p-1">
                      {a ? (
                        <motion.div
                          layout
                          layoutId={a.id}
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
                          className={cn(
                            "flex h-full items-center gap-1.5 rounded-lg border px-1.5",
                            a.tone,
                          )}
                        >
                          <Face src={a.face} size={20} ring={false} />
                          <div className="min-w-0">
                            <div className="truncate text-[11px] font-semibold text-slate-800">
                              {a.title}
                            </div>
                            <div className="truncate text-[10px] text-slate-500">{a.who}</div>
                          </div>
                          {a.confirmed ? (
                            <motion.span
                              className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/80 text-emerald-600"
                              initial={false}
                              animate={
                                step === 2 && a.id === "a5" && !reduced
                                  ? { scale: [1, 1.25, 1] }
                                  : { scale: 1 }
                              }
                              transition={{ duration: 0.9, ease: EASE }}
                            >
                              <Check className="h-2.5 w-2.5" strokeWidth={4} />
                            </motion.span>
                          ) : null}
                        </motion.div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Toast
        show={step >= 4}
        title="Week stays organised"
        body={newOne ? "New booking added, one appointment moved, all confirmed." : undefined}
      />
    </div>
  );
}

/* ================================================================== */
/* 8. CONTRACTS — sequential signatures                                */
/* ================================================================== */

const CONTRACTS = [
  {
    name: "Fitout agreement",
    customer: "Alto Fitout Co",
    face: FACE.nina,
    value: "$18,600",
    activity: "Viewed 2h ago",
  },
  {
    name: "Service plan 2026",
    customer: "Harbourline Physio",
    face: FACE.sophie,
    value: "$4,800",
    activity: "Signed Tue",
  },
  {
    name: "Landscape proposal",
    customer: "Bennett Landscapes",
    face: FACE.tom,
    value: "$12,400",
    activity: "Sent Mon",
  },
  {
    name: "Maintenance retainer",
    customer: "Marchetti Motors",
    face: FACE.leo,
    value: "$9,200",
    activity: "Draft",
  },
];

const SignPath = ({ show, reduced }: { show: boolean; reduced: boolean }) => (
  <svg viewBox="0 0 200 44" className="h-9 w-full">
    <motion.path
      d="M6 32 C24 6, 40 40, 58 22 S86 4, 104 26 S132 40, 150 16 S180 12, 194 24"
      fill="none"
      stroke="#1e293b"
      strokeWidth="2.2"
      strokeLinecap="round"
      initial={false}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: reduced ? 0 : 1.1, ease: EASE }}
    />
  </svg>
);

export function SceneContracts({ step, reduced }: SceneProps) {
  const status = step >= 5 ? "Completed" : step >= 2 ? "Viewed" : step >= 1 ? "Sent" : "Draft";
  const sign1 = step >= 2;
  const sign1Done = step >= 3;
  const sign2 = step >= 3;
  const sign2Done = step >= 4;

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-[11px] text-slate-400">
          <Search className="h-3.5 w-3.5" /> Search contracts
        </span>
        <Pill tone="slate">Owner · Alex</Pill>
        <Pill tone="slate">Tags · Fitout</Pill>
        <span className="ml-auto">
          <Btn tone="ghost">
            <Plus className="h-3 w-3" /> New contract
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-43px)] min-h-0 grid-cols-1 gap-2.5 p-3 lg:grid-cols-[268px_minmax(0,1fr)]">
        <Card className="hidden min-h-0 flex-col overflow-hidden lg:flex">
          <div className="divide-y divide-slate-100">
            {CONTRACTS.map((c, i) => (
              <div
                key={c.name}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 transition-colors duration-500",
                  i === 0 ? "bg-blue-50/60" : "bg-white",
                )}
              >
                <Face src={c.face} size={26} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-semibold text-slate-800">{c.name}</div>
                  <div className="truncate text-[10.5px] text-slate-400">{c.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-slate-700">{c.value}</div>
                  <div className="whitespace-nowrap text-[10px] text-slate-400">
                    {i === 0 ? status : c.activity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200/80 px-3 py-2">
            <FileSignature className="h-4 w-4 text-slate-400" />
            <span className="text-[12.5px] font-semibold text-slate-900">Fitout agreement</span>
            <Pill tone="slate">
              <MoneyIcon /> $18,600
            </Pill>
            <Pill
              tone={status === "Completed" ? "green" : status === "Viewed" ? "blue" : "slate"}
              className="ml-auto"
            >
              {status}
            </Pill>
          </div>

          <div className="min-h-0 flex-1 space-y-2 p-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              {["Draft", "Sent", "Viewed", "Signed", "Completed"].map((s, i) => {
                const on =
                  i === 0 ||
                  (i === 1 && step >= 1) ||
                  (i === 2 && step >= 2) ||
                  (i === 3 && sign2Done) ||
                  (i === 4 && step >= 5);
                return (
                  <span key={s} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2 py-[3px] text-[10.5px] font-medium transition-colors duration-500",
                        on ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-400",
                      )}
                    >
                      {s}
                    </span>
                    {i < 4 ? <span className="h-px w-3 bg-slate-200" /> : null}
                  </span>
                );
              })}
            </div>

            {[
              {
                key: "s1",
                name: "Nina Patel",
                role: "Alto Fitout Co · Director",
                face: FACE.nina,
                show: sign1,
                done: sign1Done,
              },
              {
                key: "s2",
                name: "Alex Turner",
                role: "Your business · Owner",
                face: FACE.alex,
                show: sign2,
                done: sign2Done,
              },
            ].map((s) => (
              <motion.div
                key={s.key}
                initial={false}
                animate={{ opacity: s.show ? 1 : 0.45 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                className={cn(
                  "rounded-xl border bg-white px-3 py-2.5",
                  s.done
                    ? "border-emerald-200"
                    : s.show
                      ? "border-blue-300 shadow-[0_10px_26px_-18px_rgba(37,99,235,0.7)]"
                      : "border-slate-200",
                )}
              >
                <div className="flex items-center gap-2">
                  <Face src={s.face} size={28} />
                  <div className="min-w-0">
                    <div className="truncate text-[12px] font-semibold text-slate-800">
                      {s.name}
                    </div>
                    <div className="truncate text-[10.5px] text-slate-400">{s.role}</div>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5">
                    {s.done ? (
                      <Pill tone="green">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} /> Signed
                      </Pill>
                    ) : s.show ? (
                      <Pill tone="blue">
                        <MousePointerClick className="h-2.5 w-2.5" /> Signing
                      </Pill>
                    ) : (
                      <Pill tone="slate">
                        <Clock className="h-2.5 w-2.5" /> Waiting
                      </Pill>
                    )}
                  </span>
                </div>
                <div className="mt-1 border-b border-dashed border-slate-200">
                  <SignPath show={s.show} reduced={reduced} />
                </div>
              </motion.div>
            ))}

            <StepIn show={step >= 5}>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <div className="text-[11.5px] font-semibold text-emerald-800">
                  Contract completed · linked opportunity moved to Won
                </div>
              </div>
            </StepIn>
          </div>
        </Card>
      </div>

      <Toast show={step >= 5} title="Signed and stored" body="Both signatures captured in order." />
    </div>
  );
}
