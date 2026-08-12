import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  Check,
  ChevronDown,
  Clock,
  Filter,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Send,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  Btn,
  Card,
  ChannelMark,
  Cursor,
  EASE,
  FilterChip,
  Pill,
  StepIn,
  Toast,
  Toolbar,
} from "./kit";

export type SceneProps = { step: number; reduced: boolean };

/* ================================================================== */
/* 1. CONTACTS / WIN BACK                                              */
/* ================================================================== */

type ContactRow = {
  name: string;
  business: string;
  phone: string;
  email: string;
  last: string;
  stale: boolean;
  tags: Array<{ label: string; tone: "blue" | "violet" | "amber" | "rose" | "green" }>;
  channel: "sms" | "email" | "instagram" | "messenger" | "phone";
  match: boolean;
  tone: string;
};

const CONTACTS: ContactRow[] = [
  {
    name: "Maya Chen",
    business: "North & Pine Studio",
    phone: "0400 111 222",
    email: "maya@northpine.example",
    last: "8 months ago",
    stale: true,
    tags: [
      { label: "VIP", tone: "amber" },
      { label: "Inactive 6m+", tone: "rose" },
    ],
    channel: "instagram",
    match: true,
    tone: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    name: "Jordan Lee",
    business: "Harbour Physio",
    phone: "0400 333 444",
    email: "jordan@harbourphysio.example",
    last: "3 days ago",
    stale: false,
    tags: [
      { label: "Upsell", tone: "violet" },
      { label: "Big Spender", tone: "blue" },
    ],
    channel: "sms",
    match: false,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    name: "Priya Nair",
    business: "Field & Form",
    phone: "0400 555 666",
    email: "priya@fieldform.example",
    last: "11 months ago",
    stale: true,
    tags: [
      { label: "VIP", tone: "amber" },
      { label: "Inactive 6m+", tone: "rose" },
      { label: "Big Spender", tone: "blue" },
    ],
    channel: "email",
    match: true,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Tom Rafferty",
    business: "Brightline Electrical",
    phone: "0400 777 888",
    email: "tom@brightline.example",
    last: "2 weeks ago",
    stale: false,
    tags: [{ label: "Upsell", tone: "violet" }],
    channel: "phone",
    match: false,
    tone: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Elise Barron",
    business: "Cedar Property Co",
    phone: "0400 999 000",
    email: "elise@cedarproperty.example",
    last: "9 months ago",
    stale: true,
    tags: [
      { label: "VIP", tone: "amber" },
      { label: "Inactive 6m+", tone: "rose" },
    ],
    channel: "messenger",
    match: true,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sam Okafor",
    business: "Atlas Finance",
    phone: "0400 222 555",
    email: "sam@atlasfinance.example",
    last: "Yesterday",
    stale: false,
    tags: [{ label: "Big Spender", tone: "blue" }],
    channel: "email",
    match: false,
    tone: "bg-cyan-100 text-cyan-700",
  },
];

const CONTACT_CURSOR: Array<[number, number]> = [
  [30, 12],
  [26, 12],
  [40, 12],
  [12, 40],
  [12, 40],
  [74, 88],
  [74, 88],
];

export function SceneContacts({ step, reduced }: SceneProps) {
  const filtered = step >= 2;
  const selected = step >= 3;
  const composer = step >= 4;
  const [cx, cy] = CONTACT_CURSOR[Math.min(step, CONTACT_CURSOR.length - 1)];
  const rows = CONTACTS.filter((c) => (filtered ? c.match : true));

  return (
    <div className="relative h-full">
      <Toolbar>
        <div className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-[11px] text-slate-400">
          <Search className="h-3.5 w-3.5" /> Search contacts
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
          <Filter className="h-3.5 w-3.5" /> Filters
        </span>
        <FilterChip active={filtered} icon={<Tag className="h-3 w-3" />}>
          VIP
        </FilterChip>
        <FilterChip active={filtered} icon={<Clock className="h-3 w-3" />}>
          Inactive 6m+
        </FilterChip>
        <span className="ml-auto text-[11px] text-slate-400">
          {rows.length} of {CONTACTS.length} contacts
        </span>
      </Toolbar>

      <div className="flex h-[calc(100%-42px)] min-h-0 gap-3 p-3">
        <Card className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* table head */}
          <div className="grid shrink-0 grid-cols-[24px_1.5fr_1.4fr_1fr_1.6fr] items-center gap-2 border-b border-slate-200/80 bg-slate-50/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            <span />
            <span>Contact</span>
            <span className="hidden sm:block">Phone / Email</span>
            <span>Last activity</span>
            <span>Tags</span>
          </div>
          <div className="min-h-0 flex-1 divide-y divide-slate-100">
            <AnimatePresence initial={false}>
              {rows.map((c) => (
                <motion.div
                  key={c.name}
                  layout
                  initial={false}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                  className={cn(
                    "grid grid-cols-[24px_1.5fr_1.4fr_1fr_1.6fr] items-center gap-2 px-3 py-2.5 transition-colors duration-500",
                    selected && c.match ? "bg-blue-50/60" : "bg-white",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors duration-400",
                      selected && c.match
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white",
                    )}
                  >
                    {selected && c.match ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <Avatar name={c.name} tone={c.tone} size={24} />
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold text-slate-900">
                        {c.name}
                      </div>
                      <div className="truncate text-[10.5px] text-slate-400">{c.business}</div>
                    </div>
                  </div>
                  <div className="hidden min-w-0 sm:block">
                    <div className="truncate text-[11px] text-slate-600">{c.phone}</div>
                    <div className="truncate text-[10.5px] text-slate-400">{c.email}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChannelMark channel={c.channel} size={14} />
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-[2px] text-[11px] transition-colors duration-500",
                        c.stale && filtered
                          ? "bg-rose-50 font-semibold text-rose-600"
                          : "text-slate-500",
                      )}
                    >
                      {c.last}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <Pill key={t.label} tone={t.tone}>
                        {t.label}
                      </Pill>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* bulk action bar */}
          <StepIn show={selected} className="shrink-0 px-3 pb-3">
            <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/70 px-3 py-2">
              <Users className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-[11px] font-semibold text-blue-800">
                {rows.length} selected
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <Btn>
                  <MessageSquare className="h-3 w-3" /> Send SMS
                </Btn>
                <Btn tone="ghost">Start campaign</Btn>
              </span>
            </div>
          </StepIn>
        </Card>

        {/* composer panel */}
        <motion.div
          className="hidden w-[264px] shrink-0 lg:block"
          initial={false}
          animate={{ opacity: composer ? 1 : 0, x: composer ? 0 : 24 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
              <span className="text-[12px] font-semibold text-slate-900">Win-back SMS</span>
              <Pill tone="violet" className="ml-auto">
                3 recipients
              </Pill>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
              <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] leading-relaxed text-slate-600">
                Hi {"{{first_name}}"}, it has been a while since your last visit to North &amp; Pine
                Studio. We have kept your preferences on file. Want your usual slot this month?
              </div>
              <div className="flex items-center gap-1.5">
                <Pill tone="slate">Merge fields</Pill>
                <Pill tone="slate">Opt-out included</Pill>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Btn>
                  <Send className="h-3 w-3" /> Send now
                </Btn>
                <span className="text-[10.5px] text-slate-400">or schedule</span>
              </div>
              <div className="mt-auto space-y-1.5">
                <StepIn show={step >= 5}>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-2 text-[11px] text-slate-600">
                    <Check className="h-3.5 w-3.5 text-emerald-600" /> Sent to 3 contacts
                  </div>
                </StepIn>
                <StepIn show={step >= 6}>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2">
                    <div className="text-[11px] font-semibold text-emerald-800">
                      Reply from Priya Nair
                    </div>
                    <div className="mt-0.5 text-[11px] text-emerald-700">
                      “Yes please, Thursday morning?”
                    </div>
                    <Pill tone="green" className="mt-1.5">
                      Interested, booking requested
                    </Pill>
                  </div>
                </StepIn>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Cursor x={cx} y={cy} clicking={step === 2 || step === 3 || step === 5} reduced={reduced} />
      <Toast
        show={step >= 6}
        title="Contact re-engaged"
        body="Priya Nair replied and requested a booking."
      />
    </div>
  );
}

/* ================================================================== */
/* 2. OPPORTUNITIES                                                    */
/* ================================================================== */

type Opp = {
  id: string;
  name: string;
  business: string;
  value: string;
  age: string;
  tone: string;
  col: number;
};

const PIPE_COLUMNS = [
  { label: "New Enquiry", accent: "bg-blue-500", total: "A$18,400" },
  { label: "Qualified", accent: "bg-cyan-500", total: "A$26,900" },
  { label: "Proposal Sent", accent: "bg-violet-500", total: "A$41,200" },
  { label: "Negotiation", accent: "bg-amber-500", total: "A$33,750" },
];

const BASE_OPPS: Opp[] = [
  {
    id: "riverstone",
    name: "Riverstone Dental",
    business: "Fit-out refresh",
    value: "A$9,800",
    age: "2 days",
    tone: "bg-blue-100 text-blue-700",
    col: 0,
  },
  {
    id: "atlas",
    name: "Atlas Finance",
    business: "Onboarding automation",
    value: "A$14,500",
    age: "4 days",
    tone: "bg-cyan-100 text-cyan-700",
    col: 1,
  },
  {
    id: "harbour",
    name: "Harbour Physio",
    business: "Reception cover",
    value: "A$12,400",
    age: "1 day",
    tone: "bg-emerald-100 text-emerald-700",
    col: 1,
  },
  {
    id: "cedar",
    name: "Cedar Property Co",
    business: "Listing follow-up",
    value: "A$21,000",
    age: "6 days",
    tone: "bg-amber-100 text-amber-700",
    col: 2,
  },
  {
    id: "brightline",
    name: "Brightline Electrical",
    business: "Maintenance retainer",
    value: "A$20,200",
    age: "3 days",
    tone: "bg-indigo-100 text-indigo-700",
    col: 2,
  },
  {
    id: "field",
    name: "Field & Form",
    business: "Quarterly campaign",
    value: "A$13,550",
    age: "5 days",
    tone: "bg-rose-100 text-rose-700",
    col: 3,
  },
];

const NEW_OPP: Opp = {
  id: "northpine",
  name: "North & Pine Studio",
  business: "Instagram enquiry",
  value: "A$8,600",
  age: "just now",
  tone: "bg-fuchsia-100 text-fuchsia-700",
  col: 0,
};

const OPP_CURSOR: Array<[number, number]> = [
  [16, 22],
  [16, 30],
  [18, 34],
  [34, 40],
  [60, 34],
  [82, 40],
];

export function SceneOpportunities({ step, reduced }: SceneProps) {
  const [cx, cy] = OPP_CURSOR[Math.min(step, OPP_CURSOR.length - 1)];

  const opps: Opp[] = BASE_OPPS.map((o) => {
    if (o.id === "brightline" && step >= 4) return { ...o, col: 3 };
    return o;
  });
  if (step >= 1) opps.unshift({ ...NEW_OPP, col: step >= 3 ? 1 : 0 });

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="text-[12px] font-semibold text-slate-900">Sales pipeline</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11px] text-slate-500">
          All owners <ChevronDown className="h-3 w-3" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11px] text-slate-500">
          This month <ChevronDown className="h-3 w-3" />
        </span>
        <span className="ml-auto">
          <Btn>
            <Plus className="h-3 w-3" /> New opportunity
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-42px)] min-h-0 grid-cols-2 gap-2.5 p-3 lg:grid-cols-4">
        {PIPE_COLUMNS.map((col, ci) => (
          <div key={col.label} className="flex min-h-0 flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", col.accent)} />
              <span className="text-[11.5px] font-semibold text-slate-700">{col.label}</span>
              <span className="ml-auto text-[10.5px] text-slate-400">{col.total}</span>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-xl bg-white/70 p-1.5 ring-1 ring-slate-200/70">
              {opps
                .filter((o) => o.col === ci)
                .map((o) => {
                  const isNew = o.id === NEW_OPP.id;
                  const focus =
                    (isNew && step >= 2 && step <= 3) || (o.id === "brightline" && step === 4);
                  return (
                    <motion.div
                      key={o.id}
                      layout
                      layoutId={`opp-${o.id}`}
                      initial={isNew ? { opacity: 0, y: -10 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduced ? 0 : 0.55, ease: EASE }}
                      className={cn(
                        "relative overflow-hidden rounded-lg border bg-white px-2.5 py-2 pl-3 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-colors duration-400",
                        focus ? "border-blue-400 ring-2 ring-blue-200" : "border-slate-200",
                      )}
                    >
                      <span
                        className={cn("absolute inset-y-0 left-0 w-[3px]", PIPE_COLUMNS[ci].accent)}
                      />
                      <div className="truncate text-[12px] font-semibold text-slate-900">
                        {o.name}
                      </div>
                      <div className="truncate text-[10.5px] text-slate-400">{o.business}</div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="text-[11.5px] font-semibold text-slate-800">
                          {o.value}
                        </span>
                        <span className="text-[10px] text-slate-400">· {o.age}</span>
                        <Avatar name={o.name} tone={o.tone} size={18} />
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      <Cursor x={cx} y={cy} clicking={step === 2 || step === 4} reduced={reduced} />
      <Toast
        show={step >= 5}
        tone="blue"
        icon={<Check className="h-3 w-3" strokeWidth={3} />}
        title="Stage updated"
        body="North & Pine Studio moved to Qualified. Brightline Electrical is now in Negotiation."
      />
    </div>
  );
}

/* ================================================================== */
/* 3. UNIFIED INBOX                                                    */
/* ================================================================== */

const THREADS = [
  {
    name: "Maya Chen",
    channel: "instagram" as const,
    label: "Instagram DM",
    snippet: "Hi! Do you have availability next Friday?",
    time: "9:12 am",
    group: "Today",
    tone: "bg-fuchsia-100 text-fuchsia-700",
    unread: true,
  },
  {
    name: "Sam Okafor",
    channel: "sms" as const,
    label: "SMS",
    snippet: "Thanks, the quote looks good.",
    time: "8:40 am",
    group: "Today",
    tone: "bg-cyan-100 text-cyan-700",
    unread: false,
  },
  {
    name: "Jordan Lee",
    channel: "messenger" as const,
    label: "Facebook Messenger",
    snippet: "Can we move the site visit?",
    time: "Yesterday",
    group: "Earlier",
    tone: "bg-blue-100 text-blue-700",
    unread: false,
  },
  {
    name: "Elise Barron",
    channel: "email" as const,
    label: "Email",
    snippet: "Sending through the plans now.",
    time: "Mon",
    group: "Earlier",
    tone: "bg-amber-100 text-amber-700",
    unread: false,
  },
];

const INBOX_CURSOR: Array<[number, number]> = [
  [26, 26],
  [26, 30],
  [56, 60],
  [56, 72],
  [88, 30],
  [88, 40],
];

export function SceneInbox({ step, reduced }: SceneProps) {
  const [cx, cy] = INBOX_CURSOR[Math.min(step, INBOX_CURSOR.length - 1)];
  const open = step >= 1;

  return (
    <div className="relative h-full p-3">
      <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 lg:grid-cols-[120px_1fr_1.25fr_240px]">
        {/* folders */}
        <Card className="hidden flex-col gap-1 p-2 lg:flex">
          <div className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Messages
          </div>
          {[
            { label: "Inbox", count: "12", on: true },
            { label: "All", count: "48", on: false },
            { label: "Unread", count: "3", on: false },
            { label: "Starred", count: "2", on: false },
          ].map((f) => (
            <div
              key={f.label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px]",
                f.on ? "bg-blue-50 font-semibold text-blue-700" : "text-slate-500",
              )}
            >
              {f.label === "Starred" ? <Star className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
              {f.label}
              <span className="ml-auto text-[10px] text-slate-400">{f.count}</span>
            </div>
          ))}
          <div className="mt-auto rounded-md bg-slate-50 p-2 text-[10px] leading-snug text-slate-400">
            SMS, email, Facebook and Instagram in one place.
          </div>
        </Card>

        {/* conversation list */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-slate-100 px-2.5 py-2 text-[11px] text-slate-400">
            <Search className="h-3.5 w-3.5" /> Search conversations
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            {["Today", "Earlier"].map((g) => (
              <div key={g}>
                <div className="bg-slate-50/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {g}
                </div>
                {THREADS.filter((t) => t.group === g).map((t, i) => {
                  const active = g === "Today" && i === 0 && open;
                  return (
                    <div
                      key={t.name}
                      className={cn(
                        "flex items-start gap-2 border-b border-slate-100 px-2.5 py-2 transition-colors duration-500",
                        active ? "bg-blue-50/70" : "bg-white",
                      )}
                    >
                      <Avatar name={t.name} tone={t.tone} size={24} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-[12px] font-semibold text-slate-900">
                            {t.name}
                          </span>
                          <span className="ml-auto shrink-0 text-[10px] text-slate-400">
                            {t.time}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1">
                          <ChannelMark channel={t.channel} size={13} />
                          <span className="truncate text-[10.5px] text-slate-400">{t.label}</span>
                        </div>
                        <div className="mt-0.5 truncate text-[11px] text-slate-500">
                          {t.snippet}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>

        {/* thread */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <Avatar name="Maya Chen" tone="bg-fuchsia-100 text-fuchsia-700" size={24} />
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold text-slate-900">Maya Chen</div>
              <div className="truncate text-[10.5px] text-slate-400">North &amp; Pine Studio</div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <ChannelMark channel="instagram" size={16} />
              <ChannelMark channel="sms" size={16} />
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-2 p-3">
            <StepIn show={open}>
              <Bubble side="in" channel="Instagram DM" time="9:12 am">
                Hi! Do you have availability next Friday?
              </Bubble>
            </StepIn>
            <StepIn show={step >= 2} delay={0.05}>
              <Bubble side="out" channel="Instagram DM" time="9:13 am">
                Hi Maya, yes. Would 2:30 pm Friday suit?
              </Bubble>
            </StepIn>
            <StepIn show={step >= 3} delay={0.05}>
              <div className="flex items-center gap-2 py-0.5">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-medium text-emerald-700">
                  <ChannelMark channel="sms" size={12} /> Continued over SMS, same history
                </span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
            </StepIn>
            <StepIn show={step >= 3} delay={0.12}>
              <Bubble side="in" channel="SMS" time="9:26 am">
                2:30 works. My number is 0400 111 222.
              </Bubble>
            </StepIn>
            <StepIn show={step >= 4} delay={0.05}>
              <Bubble side="out" channel="SMS" time="9:27 am">
                Locked in for Friday 2:30 pm. Confirmation on its way.
              </Bubble>
            </StepIn>
          </div>
        </Card>

        {/* contact panel */}
        <Card className="hidden min-h-0 flex-col overflow-hidden lg:flex">
          <div className="border-b border-slate-100 px-3 py-2 text-[12px] font-semibold text-slate-900">
            Contact
          </div>
          <div className="space-y-2 p-3">
            <Field label="Phone" value="0400 111 222" />
            <Field label="Email" value="maya@northpine.example" />
            <Field label="Source" value="Instagram DM" />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Tags
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                <Pill tone="blue">New Enquiry</Pill>
                <StepIn show={step >= 4}>
                  <Pill tone="amber">VIP</Pill>
                </StepIn>
                <StepIn show={step >= 4} delay={0.08}>
                  <Pill tone="violet">Upsell</Pill>
                </StepIn>
              </div>
            </div>
            <StepIn show={step >= 5}>
              <div className="rounded-lg border border-blue-200 bg-blue-50/70 px-2.5 py-2">
                <div className="text-[11px] font-semibold text-blue-800">Opportunity created</div>
                <div className="mt-0.5 text-[10.5px] text-blue-700">
                  North &amp; Pine Studio · A$8,600
                </div>
              </div>
            </StepIn>
          </div>
        </Card>
      </div>

      <Cursor x={cx} y={cy} clicking={step === 1 || step === 4} reduced={reduced} />
      <Toast
        show={step >= 5}
        tone="blue"
        title="One inbox, full history"
        body="Instagram and SMS stay in the same conversation."
      />
    </div>
  );
}

function Bubble({
  side,
  channel,
  time,
  children,
}: {
  side: "in" | "out";
  channel: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex", side === "out" ? "justify-end" : "justify-start")}>
      <div className="max-w-[82%]">
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-[11.5px] leading-relaxed",
            side === "out"
              ? "rounded-br-md bg-blue-600 text-white"
              : "rounded-bl-md bg-slate-100 text-slate-700",
          )}
        >
          {children}
        </div>
        <div
          className={cn(
            "mt-1 text-[9.5px] text-slate-400",
            side === "out" ? "text-right" : "text-left",
          )}
        >
          {channel} · {time}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="truncate text-[11.5px] text-slate-700">{value}</div>
    </div>
  );
}

/* ================================================================== */
/* 4. AUTOMATIONS / REVIEW REQUEST                                     */
/* ================================================================== */

const NODES = [
  { title: "Job completed", meta: "Trigger · all completed jobs", tone: "blue" as const },
  { title: "Wait 2 hours", meta: "Delay", tone: "slate" as const },
  { title: "Send review request", meta: "SMS + email · review link", tone: "violet" as const },
  { title: "If no response", meta: "Wait 2 days", tone: "amber" as const },
  { title: "Send reminder", meta: "One reminder only", tone: "amber" as const },
  { title: "Tag Advocate & notify team", meta: "Internal notification", tone: "green" as const },
];

const AUTO_CURSOR: Array<[number, number]> = [
  [30, 20],
  [30, 40],
  [30, 62],
  [76, 46],
  [76, 74],
  [76, 78],
];

export function SceneAutomations({ step, reduced }: SceneProps) {
  const [cx, cy] = AUTO_CURSOR[Math.min(step, AUTO_CURSOR.length - 1)];
  const reached = Math.min(step + 1, NODES.length);

  return (
    <div className="relative h-full p-3">
      <div className="grid h-full min-h-0 grid-cols-1 gap-2.5 lg:grid-cols-[1fr_280px]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[12px] font-semibold text-slate-900">
              Review request workflow
            </span>
            <Pill tone="green" className="ml-1">
              Active
            </Pill>
            <span className="ml-auto text-[10.5px] text-slate-400">
              Every completed job, no filtering
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden px-3 py-2.5">
            {NODES.map((n, i) => {
              const on = i < reached;
              const tones: Record<string, string> = {
                blue: "border-blue-200 bg-blue-50/60",
                slate: "border-slate-200 bg-white",
                violet: "border-violet-200 bg-violet-50/60",
                amber: "border-amber-200 bg-amber-50/60",
                green: "border-emerald-200 bg-emerald-50/60",
              };
              return (
                <div key={n.title}>
                  <motion.div
                    initial={false}
                    animate={{ opacity: on ? 1 : 0.45 }}
                    transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2",
                      tones[n.tone],
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold transition-colors duration-500",
                        on ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500",
                      )}
                    >
                      {on ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-semibold text-slate-900">
                        {n.title}
                      </div>
                      <div className="truncate text-[10.5px] text-slate-400">{n.meta}</div>
                    </div>
                  </motion.div>
                  {i < NODES.length - 1 ? (
                    <div className="relative ml-[26px] h-3.5 w-[2px] bg-slate-200">
                      <motion.div
                        className="absolute inset-x-0 top-0 bg-blue-500"
                        initial={false}
                        animate={{ height: i < reached - 1 ? "100%" : "0%" }}
                        transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Card>

        <div className="hidden min-h-0 flex-col gap-2.5 lg:flex">
          <Card className="overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
              <span className="text-[12px] font-semibold text-slate-900">New review request</span>
              <Pill tone="slate" className="ml-auto">
                Draft
              </Pill>
            </div>
            <div className="space-y-2 p-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Contact
                </div>
                <div className="mt-1 flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1.5">
                  <Avatar name="Tom Rafferty" tone="bg-indigo-100 text-indigo-700" size={20} />
                  <span className="text-[11.5px] text-slate-700">Tom Rafferty</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Channel
                </div>
                <div className="mt-1 flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1.5 text-[11.5px] text-slate-700">
                  Email + SMS <ChevronDown className="ml-auto h-3 w-3 text-slate-400" />
                </div>
              </div>
              <div className="rounded-md bg-slate-50 p-2 text-[11px] leading-relaxed text-slate-600">
                Thanks for choosing us, Tom. If you have a moment, a short review helps other locals
                find us.
              </div>
              <div className="flex items-center gap-2">
                <Btn>
                  <Send className="h-3 w-3" /> Send request
                </Btn>
                <StepIn show={step >= 3}>
                  <Pill tone="green">Sent</Pill>
                </StepIn>
              </div>
            </div>
          </Card>

          <StepIn show={step >= 4} className="mt-auto">
            <Card className="p-3">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-1 text-[10.5px] text-slate-400">Google review</span>
              </div>
              <div className="mt-1.5 text-[11.5px] leading-relaxed text-slate-600">
                “Turned up on time, sorted it fast and kept us updated the whole way.”
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Avatar name="Tom Rafferty" tone="bg-indigo-100 text-indigo-700" size={20} />
                <span className="text-[11px] font-semibold text-slate-700">Tom R.</span>
                <StepIn show={step >= 5} className="ml-auto">
                  <Pill tone="green">
                    <Tag className="h-3 w-3" /> Advocate
                  </Pill>
                </StepIn>
              </div>
            </Card>
          </StepIn>
        </div>
      </div>

      <Cursor x={cx} y={cy} clicking={step === 3} reduced={reduced} />
      <Toast
        show={step >= 5}
        title="Review received"
        body="Team notified and contact tagged Advocate."
        icon={<Bell className="h-3 w-3" />}
      />
    </div>
  );
}
