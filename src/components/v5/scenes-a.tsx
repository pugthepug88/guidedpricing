import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BellRing,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  MousePointerClick,
  Plus,
  Receipt,
  Search,
  Send,
  Sparkles,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Btn,
  Card,
  ChannelMark,
  EASE,
  Face,
  FilterChip,
  MoneyIcon,
  NodeState,
  Pill,
  Pointer,
  StepIn,
  Toast,
  Toolbar,
} from "./kit";
import { FACE } from "./faces";

export type SceneProps = { step: number; reduced: boolean };

/* ================================================================== */
/* 1. CONTACTS — reactivate the database                               */
/* ================================================================== */

type TagTone = "blue" | "violet" | "amber" | "rose" | "green" | "slate";

type ContactRow = {
  name: string;
  business: string;
  phone: string;
  last: string;
  face: string;
  tags: Array<{ label: string; tone: TagTone }>;
  channel: "sms" | "email" | "instagram" | "messenger" | "phone";
  match: boolean;
};

const CONTACTS: ContactRow[] = [
  {
    name: "Maya Chen",
    business: "North & Pine Studio",
    phone: "0400 118 224",
    last: "8 months ago",
    face: FACE.maya,
    tags: [
      { label: "VIP", tone: "amber" },
      { label: "Inactive 90d", tone: "rose" },
    ],
    channel: "sms",
    match: true,
  },
  {
    name: "Daniel Okafor",
    business: "Okafor Electrical",
    phone: "0413 902 771",
    last: "6 months ago",
    face: FACE.daniel,
    tags: [
      { label: "Big Spender", tone: "violet" },
      { label: "Inactive 90d", tone: "rose" },
    ],
    channel: "email",
    match: true,
  },
  {
    name: "Priya Raman",
    business: "Raman Dental Co",
    phone: "0421 336 118",
    last: "3 days ago",
    face: FACE.priya,
    tags: [{ label: "Upsell", tone: "blue" }],
    channel: "instagram",
    match: false,
  },
  {
    name: "Tom Bennett",
    business: "Bennett Landscapes",
    phone: "0408 774 015",
    last: "11 months ago",
    face: FACE.tom,
    tags: [
      { label: "VIP", tone: "amber" },
      { label: "Inactive 90d", tone: "rose" },
    ],
    channel: "phone",
    match: true,
  },
  {
    name: "Sophie Nguyen",
    business: "Harbourline Physio",
    phone: "0402 551 690",
    last: "Yesterday",
    face: FACE.sophie,
    tags: [{ label: "Upsell", tone: "blue" }],
    channel: "messenger",
    match: false,
  },
  {
    name: "Leo Marchetti",
    business: "Marchetti Motors",
    phone: "0417 208 443",
    last: "9 months ago",
    face: FACE.leo,
    tags: [
      { label: "Big Spender", tone: "violet" },
      { label: "Inactive 90d", tone: "rose" },
    ],
    channel: "sms",
    match: true,
  },
];

const CONTACT_POINTER: Array<[number, number]> = [
  [50, 20],
  [24, 12],
  [10, 46],
  [46, 90],
  [70, 90],
  [80, 46],
  [80, 62],
];

export function SceneContacts({ step, reduced }: SceneProps) {
  const [px, py] = CONTACT_POINTER[Math.min(step, CONTACT_POINTER.length - 1)];
  const filtered = step >= 1;
  const selected = step >= 2;
  const actionBar = step >= 3;
  const composer = step >= 4;
  const sent = step >= 5;
  const replies = step >= 6;

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-500">
          <Filter className="h-3.5 w-3.5 text-slate-400" /> Segment
        </span>
        <FilterChip active={filtered} icon={<Tag className="h-3 w-3" />}>
          VIP
        </FilterChip>
        <FilterChip active={filtered} icon={<Clock className="h-3 w-3" />}>
          Inactive 90d
        </FilterChip>
        <FilterChip icon={<Search className="h-3 w-3" />}>Search contacts</FilterChip>
        <span className="ml-auto">
          <Btn tone="ghost">
            <Plus className="h-3 w-3" /> New contact
          </Btn>
        </span>
      </Toolbar>

      <div className="flex h-[calc(100%-43px)] min-h-0 gap-3 p-3">
        <Card className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="grid shrink-0 grid-cols-[22px_1.5fr_1fr_0.95fr_1.5fr] items-center gap-2 border-b border-slate-200/80 bg-slate-50/70 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">
            <span />
            <span>Contact</span>
            <span className="hidden sm:block">Phone</span>
            <span
              className={cn(
                "transition-colors duration-500",
                filtered && !composer ? "text-blue-600" : "",
              )}
            >
              Last activity
            </span>
            <span>Tags</span>
          </div>

          <div className="min-h-0 flex-1 divide-y divide-slate-100 overflow-hidden">
            {CONTACTS.map((c, i) => {
              const dim = filtered && !c.match;
              const pick = selected && c.match;
              return (
                <motion.div
                  key={c.name}
                  initial={false}
                  animate={{
                    opacity: dim ? 0.32 : 1,
                    filter: dim ? "grayscale(1)" : "grayscale(0)",
                    backgroundColor: pick ? "rgb(239 246 255)" : "rgb(255 255 255)",
                  }}
                  transition={{ duration: reduced ? 0 : 0.55, ease: EASE, delay: i * 0.04 }}
                  className="grid grid-cols-[22px_1.5fr_1fr_0.95fr_1.5fr] items-center gap-2 px-3 py-[11px]"
                >
                  <span
                    className={cn(
                      "flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border transition-colors duration-500",
                      pick ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white",
                    )}
                  >
                    {pick ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : null}
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <Face src={c.face} size={26} />
                    <div className="min-w-0">
                      <div className="truncate text-[12.5px] font-semibold text-slate-800">
                        {c.name}
                      </div>
                      <div className="truncate text-[10.5px] text-slate-400">{c.business}</div>
                    </div>
                  </div>
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <ChannelMark channel={c.channel} size={15} />
                    <span className="whitespace-nowrap text-[11px] text-slate-500">{c.phone}</span>
                  </div>
                  <span
                    className={cn(
                      "whitespace-nowrap text-[11px] transition-colors duration-500",
                      filtered && c.match ? "font-semibold text-slate-800" : "text-slate-400",
                    )}
                  >
                    {c.last}
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    {c.tags.map((t) => (
                      <Pill key={t.label} tone={t.tone === "slate" ? "slate" : t.tone}>
                        {t.label}
                      </Pill>
                    ))}
                    {replies && c.name === "Maya Chen" ? (
                      <Pill tone="green">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} /> Booking requested
                      </Pill>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* selection action bar */}
          <AnimatePresence>
            {actionBar ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                className="absolute bottom-3 left-3 z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-[0_16px_36px_-18px_rgba(15,23,42,0.35)] backdrop-blur"
              >
                <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-700">
                  <Users className="h-3.5 w-3.5 text-blue-600" /> 12 contacts selected
                </span>
                <span className="h-4 w-px bg-slate-200" />
                <Btn>
                  <MessageSquare className="h-3 w-3" /> Send SMS
                </Btn>
                <Btn tone="ghost">Start campaign</Btn>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Card>

        {/* composer */}
        <AnimatePresence>
          {composer ? (
            <motion.div
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              className="hidden w-[248px] shrink-0 lg:block"
            >
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
                  <span className="text-[12.5px] font-semibold text-slate-900">
                    Reactivation SMS
                  </span>
                  <Pill tone={sent ? "green" : "blue"} className="ml-auto">
                    {sent ? "Sent" : "Queued"}
                  </Pill>
                </div>
                <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 text-[11.5px] leading-relaxed text-slate-600">
                    Hi <span className="font-semibold text-blue-700">{"{{first_name}}"}</span>, it
                    has been a while. We have new times opening next week if you would like your
                    usual spot held.
                  </div>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400">
                    <Sparkles className="h-3 w-3 text-violet-500" /> Personalised per contact
                  </div>

                  <AnimatePresence>
                    {replies ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                        className="space-y-1.5"
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Replies
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Face src={FACE.maya} size={20} />
                          <div className="rounded-lg rounded-tl-sm bg-slate-100 px-2 py-1.5 text-[11px] text-slate-700">
                            Yes please, Thursday works.
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <Face src={FACE.leo} size={20} />
                          <div className="rounded-lg rounded-tl-sm bg-slate-100 px-2 py-1.5 text-[11px] text-slate-700">
                            Can you call me this arvo?
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="mt-auto flex items-center gap-2">
                    <Btn>
                      <Send className="h-3 w-3" /> {sent ? "Sent" : "Send now"}
                    </Btn>
                    <Btn tone="ghost">Schedule</Btn>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <Pointer x={px} y={py} active={step === 1 || step === 3} reduced={reduced} />
      <Toast
        show={replies}
        title="Reactivated"
        body="One customer requested a booking from the segment."
      />
    </div>
  );
}

/* ================================================================== */
/* 2. OPPORTUNITIES — the work continues after won                     */
/* ================================================================== */

type Deal = {
  id: string;
  name: string;
  business: string;
  value: string;
  age: string;
  face: string;
  col: number;
};

const COLUMNS = [
  { label: "New Enquiry", accent: "bg-blue-500" },
  { label: "Qualified", accent: "bg-indigo-500" },
  { label: "Proposal Sent", accent: "bg-violet-500" },
  { label: "Negotiation", accent: "bg-amber-500" },
];

const OUTCOMES = [
  { label: "Team notified", icon: BellRing },
  { label: "Welcome email sent", icon: Mail },
  { label: "Deposit request created", icon: Receipt },
  { label: "Onboarding call booked", icon: CalendarCheck },
];

const OPP_POINTER: Array<[number, number]> = [
  [16, 22],
  [34, 34],
  [60, 40],
  [78, 34],
  [86, 52],
  [86, 62],
  [86, 72],
  [86, 82],
];

export function SceneOpportunities({ step, reduced }: SceneProps) {
  const [px, py] = OPP_POINTER[Math.min(step, OPP_POINTER.length - 1)];

  const deals: Deal[] = [
    {
      id: "d1",
      name: "Sophie Nguyen",
      business: "Harbourline Physio",
      value: "$4,800",
      age: "2h",
      face: FACE.sophie,
      col: 0,
    },
    {
      id: "d2",
      name: "Tom Bennett",
      business: "Bennett Landscapes",
      value: "$12,400",
      age: "1d",
      face: FACE.tom,
      col: step >= 2 ? 1 : 0,
    },
    {
      id: "d3",
      name: "Priya Raman",
      business: "Raman Dental Co",
      value: "$7,950",
      age: "3d",
      face: FACE.priya,
      col: 1,
    },
    {
      id: "d4",
      name: "Daniel Okafor",
      business: "Okafor Electrical",
      value: "$18,600",
      age: "5d",
      face: FACE.daniel,
      col: step >= 2 ? 3 : 2,
    },
    {
      id: "d5",
      name: "Leo Marchetti",
      business: "Marchetti Motors",
      value: "$9,200",
      age: "6d",
      face: FACE.leo,
      col: 2,
    },
    {
      id: "d6",
      name: "Maya Chen",
      business: "North & Pine Studio",
      value: "$26,500",
      age: "9d",
      face: FACE.maya,
      col: 3,
    },
  ];

  const newDeal = step >= 1;
  const won = step >= 3;
  const outcomesDone = Math.max(0, Math.min(4, step - 3));

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11.5px] text-slate-500">
          Sales pipeline <ChevronDown className="h-3 w-3" />
        </span>
        <Pill tone="slate">6 open</Pill>
        <span className="ml-auto">
          <Btn tone="ghost">
            <Plus className="h-3 w-3" /> New opportunity
          </Btn>
        </span>
      </Toolbar>

      <div className="flex h-[calc(100%-43px)] min-h-0 gap-2.5 p-3">
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2.5 lg:grid-cols-4">
          {COLUMNS.map((c, ci) => (
            <div
              key={c.label}
              className={cn("flex min-h-0 flex-col", ci >= 2 ? "hidden lg:flex" : "flex")}
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className={cn("h-1.5 w-1.5 rounded-full", c.accent)} />
                <span className="text-[11px] font-semibold text-slate-600">{c.label}</span>
                <span className="text-[10.5px] text-slate-400">
                  {deals.filter((d) => d.col === ci).length + (ci === 0 && newDeal ? 1 : 0)}
                </span>
              </div>
              <div className="min-h-0 flex-1 space-y-2 rounded-xl bg-white/70 p-1.5 ring-1 ring-slate-200/70">
                {ci === 0 && newDeal ? (
                  <motion.div
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                    className="rounded-lg border border-blue-200 bg-blue-50/60 px-2.5 py-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Pill tone="blue">
                        <Zap className="h-2.5 w-2.5" /> New
                      </Pill>
                      <span className="ml-auto text-[10.5px] text-slate-400">now</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Face src={FACE.nina} size={22} />
                      <div className="min-w-0">
                        <div className="truncate text-[11.5px] font-semibold text-slate-800">
                          Website enquiry
                        </div>
                        <div className="truncate text-[10.5px] text-slate-400">Alto Fitout Co</div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}

                {deals
                  .filter((d) => d.col === ci)
                  .map((d) => {
                    const focus = d.id === "d4";
                    return (
                      <motion.div
                        key={d.id}
                        layout
                        layoutId={d.id}
                        transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                        className={cn(
                          "rounded-lg border bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
                          focus && won
                            ? "border-emerald-300 ring-1 ring-emerald-200"
                            : "border-slate-200",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Face src={d.face} size={22} />
                          <div className="min-w-0">
                            <div className="truncate text-[11.5px] font-semibold text-slate-800">
                              {d.business}
                            </div>
                            <div className="truncate text-[10.5px] text-slate-400">{d.name}</div>
                          </div>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1">
                          <Pill tone={focus && won ? "green" : "slate"}>
                            <MoneyIcon /> {d.value}
                          </Pill>
                          {focus && won ? (
                            <Pill tone="green">
                              <Check className="h-2.5 w-2.5" strokeWidth={3} /> Won
                            </Pill>
                          ) : (
                            <span className="ml-auto text-[10.5px] text-slate-400">{d.age}</span>
                          )}
                        </div>

                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* outcome tray */}
        <motion.div
          initial={false}
          animate={{ opacity: won ? 1 : 0, x: won ? 0 : 24 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
          className="hidden w-[228px] shrink-0 lg:block"
        >
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-[12.5px] font-semibold text-slate-900">Deal won</span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-2 py-1.5">
                <Face src={FACE.daniel} size={22} />
                <div className="min-w-0">
                  <div className="truncate text-[11.5px] font-semibold text-slate-800">
                    Okafor Electrical
                  </div>
                  <div className="text-[10.5px] text-slate-400">$18,600</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {OUTCOMES.map((o, i) => {
                  const done = outcomesDone > i;
                  return (
                    <motion.div
                      key={o.label}
                      initial={false}
                      animate={{ opacity: done ? 1 : 0.4 }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5"
                    >
                      <NodeState state={done ? "done" : "idle"} />
                      <o.icon className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-700">{o.label}</span>
                    </motion.div>
                  );
                })}
              </div>
              <StepIn show={outcomesDone >= 4} className="mt-auto">
                <div className="rounded-lg bg-emerald-50 px-2.5 py-2 text-[11.5px] font-semibold text-emerald-700">
                  Next steps started automatically
                </div>
              </StepIn>
            </div>
          </Card>
        </motion.div>
      </div>

      <Pointer x={px} y={py} active={step === 1 || step === 3} reduced={reduced} />
    </div>
  );
}

/* ================================================================== */
/* 3. INBOX — one customer, every channel                              */
/* ================================================================== */

const FOLDERS = [
  { label: "Inbox", count: 8 },
  { label: "All", count: 42 },
  { label: "Unread", count: 3 },
  { label: "Starred", count: 5 },
];

type Convo = {
  name: string;
  face: string;
  channel: "instagram" | "sms" | "email" | "messenger";
  preview: string;
  time: string;
  group: "Today" | "Earlier";
};

const CONVOS: Convo[] = [
  {
    name: "Maya Chen",
    face: FACE.maya,
    channel: "instagram",
    preview: "Do you have space this week?",
    time: "9:41 am",
    group: "Today",
  },
  {
    name: "Sophie Nguyen",
    face: FACE.sophie,
    channel: "sms",
    preview: "Thanks, see you Thursday.",
    time: "9:02 am",
    group: "Today",
  },
  {
    name: "Daniel Okafor",
    face: FACE.daniel,
    channel: "email",
    preview: "Sending through the site plans",
    time: "8:15 am",
    group: "Today",
  },
  {
    name: "Tom Bennett",
    face: FACE.tom,
    channel: "messenger",
    preview: "Is the Saturday quote still ok?",
    time: "Yesterday",
    group: "Earlier",
  },
  {
    name: "Leo Marchetti",
    face: FACE.leo,
    channel: "sms",
    preview: "Booked in, thanks team.",
    time: "Tue",
    group: "Earlier",
  },
];

const INBOX_POINTER: Array<[number, number]> = [
  [30, 26],
  [30, 26],
  [66, 62],
  [88, 34],
  [88, 52],
];

export function SceneInbox({ step, reduced }: SceneProps) {
  const [px, py] = INBOX_POINTER[Math.min(step, INBOX_POINTER.length - 1)];
  const open = step >= 1;
  const sms = step >= 2;
  const tagged = step >= 3;
  const opp = step >= 4;

  return (
    <div className="relative h-full p-3">
      <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] xl:grid-cols-[104px_minmax(0,1fr)_minmax(0,1.35fr)_212px]">
        <Card className="hidden flex-col gap-1 p-2 xl:flex">
          {FOLDERS.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                "flex items-center justify-between rounded-md px-2 py-1.5 text-[11.5px]",
                i === 0 ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-500",
              )}
            >
              {f.label}
              <span className="text-[10px] text-slate-400">{f.count}</span>
            </div>
          ))}
        </Card>

        {/* conversation list */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-slate-200/80 px-3 py-2 text-[11px] text-slate-400">
            <Search className="h-3.5 w-3.5" /> Search conversations
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            {(["Today", "Earlier"] as const).map((g) => (
              <div key={g}>
                <div className="bg-slate-50/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {g}
                </div>
                {CONVOS.filter((c) => c.group === g).map((c) => {
                  const active = open && c.name === "Maya Chen";
                  return (
                    <motion.div
                      key={c.name}
                      initial={false}
                      animate={{
                        backgroundColor: active ? "rgb(239 246 255)" : "rgb(255,255,255)",
                      }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                      className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5"
                    >
                      <div className="relative">
                        <Face src={c.face} size={28} />
                        <span className="absolute -bottom-1 -right-1">
                          <ChannelMark
                            channel={
                              sms && c.name === "Maya Chen" ? "sms" : (c.channel as "instagram")
                            }
                            size={14}
                          />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[12px] font-semibold text-slate-800">
                            {c.name}
                          </span>
                          <span className="ml-auto whitespace-nowrap text-[10px] text-slate-400">
                            {c.time}
                          </span>
                        </div>
                        <div className="truncate text-[11px] text-slate-500">{c.preview}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>

        {/* thread */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex shrink-0 items-center gap-2 border-b border-slate-200/80 px-3 py-2">
            <Face src={FACE.maya} size={26} />
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold text-slate-900">Maya Chen</div>
              <div className="text-[10.5px] text-slate-400">North &amp; Pine Studio</div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <ChannelMark channel="instagram" size={16} />
              <ChannelMark channel="sms" size={16} />
              <ChannelMark channel="email" size={16} />
              <ChannelMark channel="messenger" size={16} />
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-2 overflow-hidden p-3">
            <div className="text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Instagram DM
            </div>
            <div className="flex items-end gap-1.5">
              <Face src={FACE.maya} size={20} />
              <div className="max-w-[78%] rounded-xl rounded-bl-sm bg-slate-100 px-2.5 py-1.5 text-[11.5px] text-slate-700">
                Hi, do you have space this week?
              </div>
            </div>
            <StepIn show={open} className="flex justify-end">
              <div className="max-w-[78%] rounded-xl rounded-br-sm bg-blue-600 px-2.5 py-1.5 text-[11.5px] text-white">
                We do. Thursday 2pm or Friday 10am?
              </div>
            </StepIn>

            <AnimatePresence>
              {sms ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-px flex-1 bg-slate-200" />
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                      <ArrowRight className="h-3 w-3" /> continued via SMS
                    </span>
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="flex items-end gap-1.5">
                    <Face src={FACE.maya} size={20} />
                    <div className="max-w-[78%] rounded-xl rounded-bl-sm bg-slate-100 px-2.5 py-1.5 text-[11.5px] text-slate-700">
                      Thursday 2pm works. Same address?
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </Card>

        {/* context panel */}
        <Card className="hidden min-h-0 flex-col gap-2 overflow-hidden p-3 xl:flex">
          <Face src={FACE.maya} size={44} className="mx-auto" />
          <div className="text-center">
            <div className="text-[12.5px] font-semibold text-slate-900">Maya Chen</div>
            <div className="text-[10.5px] text-slate-400">Customer since 2024</div>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            <Pill tone="amber">VIP</Pill>
            <AnimatePresence>
              {tagged ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                >
                  <Pill tone="blue">Upsell</Pill>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="mt-1 space-y-1.5 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3 text-slate-400" /> 4 channels linked
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-slate-400" /> Last job 8 months ago
            </div>
          </div>
          <StepIn show={opp} className="mt-auto">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-2">
              <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-700">
                <Check className="h-3 w-3" strokeWidth={3} /> Opportunity created
              </div>
              <div className="mt-0.5 text-[10.5px] text-emerald-700/80">
                Studio refresh · $2,400
              </div>
            </div>
          </StepIn>
        </Card>
      </div>

      <Pointer x={px} y={py} active={step === 1 || step === 4} reduced={reduced} />
      <Toast
        show={opp}
        title="One customer, every channel"
        body="Instagram and SMS in a single history."
      />
    </div>
  );
}

/* ================================================================== */
/* 4. AUTOMATIONS — lead nurture that stops on reply                   */
/* ================================================================== */

const FLOW = [
  { label: "New lead", sub: "Facebook lead form", icon: Zap },
  { label: "Instant SMS", sub: "Sent in seconds", icon: MessageSquare },
  { label: "Wait 1 day", sub: "No reply yet", icon: Clock },
  { label: "Follow-up email", sub: "Quote reminder", icon: Mail },
  { label: "Reply received", sub: "Nurture stopped", icon: MousePointerClick },
  { label: "Appointment booked", sub: "Thursday 2:00 pm", icon: CalendarCheck },
];

export function SceneAutomations({ step, reduced }: SceneProps) {
  const done = (i: number) => step > i;
  const activeIdx = Math.min(step, FLOW.length - 1);

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="text-[12.5px] font-semibold text-slate-900">Lead follow-up</span>
        <Pill tone={step >= 5 ? "green" : "blue"}>{step >= 5 ? "Completed" : "Running"}</Pill>
        <span className="ml-auto flex items-center gap-1.5">
          <Pill tone="slate">Stop on reply</Pill>
          <Btn tone="ghost">Edit</Btn>
        </span>
      </Toolbar>

      <div className="flex h-[calc(100%-43px)] min-h-0 items-center justify-center p-4">
        <div className="w-full max-w-[520px] space-y-1">
          {FLOW.map((n, i) => {
            const isDone = done(i);
            const isActive = i === activeIdx;
            const cancelled = step >= 4 && i === 2 && false;
            return (
              <div key={n.label}>
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isDone || isActive ? 1 : 0.45,
                    scale: isActive && !reduced ? 1.015 : 1,
                  }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border bg-white px-3 py-2.5",
                    isActive
                      ? "border-blue-300 shadow-[0_10px_26px_-16px_rgba(37,99,235,0.75)]"
                      : "border-slate-200",
                    isDone && "border-emerald-200",
                    cancelled && "opacity-30",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-[10px]",
                      isDone
                        ? "bg-emerald-50 text-emerald-600"
                        : isActive
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-50 text-slate-400",
                    )}
                  >
                    <n.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[12.5px] font-semibold text-slate-800">
                      {n.label}
                    </div>
                    <div className="truncate text-[11px] text-slate-400">{n.sub}</div>
                  </div>
                  <span className="ml-auto">
                    <NodeState state={isDone ? "done" : isActive ? "active" : "idle"} />
                  </span>
                </motion.div>

                {i < FLOW.length - 1 ? (
                  <div className="relative ml-[27px] h-4 w-[2px] overflow-hidden rounded-full bg-slate-200">
                    <motion.span
                      className="absolute inset-x-0 top-0 h-2 rounded-full bg-blue-500"
                      initial={false}
                      animate={{ y: isDone ? 16 : isActive && !reduced ? [0, 16] : -8 }}
                      transition={{
                        duration: reduced ? 0 : 0.9,
                        ease: EASE,
                        repeat: isActive && !reduced ? Infinity : 0,
                      }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <Toast
        show={step >= 5}
        title="Booked without chasing"
        body="Remaining follow-ups stopped after the reply."
      />
    </div>
  );
}
