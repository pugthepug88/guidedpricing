import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Clock,
  FileSignature,
  Filter,
  Mail,
  MessageSquare,
  Plus,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Card, ChannelMark, Cursor, EASE, Pill, StepIn, Toast } from "./kit";
import type { SceneProps } from "./scenes-a";

/* ================================================================== */
/* 5. WIN BACK                                                         */
/* ================================================================== */

type Contact = {
  name: string;
  business: string;
  last: string;
  tags: string[];
  channel: "sms" | "email" | "instagram" | "messenger";
  match: boolean;
  tone: string;
};

const CONTACTS: Contact[] = [
  {
    name: "Priya Nair",
    business: "Field & Form",
    last: "8 months ago",
    tags: ["VIP", "Inactive 6m+"],
    channel: "sms",
    match: true,
    tone: "bg-blue-100 text-blue-700",
  },
  {
    name: "Dylan Brooks",
    business: "Brooks Joinery",
    last: "3 weeks ago",
    tags: ["Upsell Opportunity"],
    channel: "email",
    match: false,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    name: "Amara Okafor",
    business: "Okafor Physio",
    last: "11 months ago",
    tags: ["VIP", "Big Spender", "Inactive 6m+"],
    channel: "sms",
    match: true,
    tone: "bg-violet-100 text-violet-700",
  },
  {
    name: "Leo Marchetti",
    business: "Marchetti Autos",
    last: "2 days ago",
    tags: ["Big Spender"],
    channel: "instagram",
    match: false,
    tone: "bg-fuchsia-100 text-fuchsia-700",
  },
  {
    name: "Nina Halvorsen",
    business: "Halvorsen Bakehouse",
    last: "9 months ago",
    tags: ["VIP", "Inactive 6m+"],
    channel: "sms",
    match: true,
    tone: "bg-emerald-100 text-emerald-700",
  },
];

const WIN_CURSOR: Array<[number, number]> = [
  [16, 18],
  [24, 18],
  [10, 46],
  [58, 22],
  [82, 74],
  [82, 74],
];

export function SceneWinBack({ step, reduced }: SceneProps) {
  const [cx, cy] = WIN_CURSOR[Math.min(step, WIN_CURSOR.length - 1)];
  const filtered = step >= 2;
  const selected = step >= 3;
  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2">
            <Filter className="h-3 w-3 text-slate-400" />
            <span className="text-[10.5px] font-semibold text-slate-600">Contacts</span>
            <div className="ml-2 flex gap-1">
              <FilterChip label="VIP" on={step >= 1} />
              <FilterChip label="Inactive 6m+" on={step >= 2} />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <div className="grid grid-cols-[16px_1.15fr_0.8fr_1.6fr_36px] gap-2 border-b border-slate-100 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              <span />
              <span>Name</span>
              <span>Last activity</span>
              <span>Tags</span>
              <span>Channel</span>
            </div>
            {CONTACTS.map((c) => {
              const hidden = filtered && !c.match;
              return (
                <motion.div
                  key={c.name}
                  initial={false}
                  animate={{
                    opacity: hidden ? 0.25 : 1,
                    height: hidden && !reduced ? 0 : "auto",
                  }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "grid grid-cols-[16px_1.15fr_0.8fr_1.6fr_36px] items-center gap-2 border-b border-slate-50 px-3 py-2 transition-colors duration-500",
                      selected && c.match && "bg-blue-50/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-3 w-3 items-center justify-center rounded-[3px] border transition-colors duration-500",
                        selected && c.match
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300",
                      )}
                    >
                      {selected && c.match ? <Check className="h-2 w-2" strokeWidth={4} /> : null}
                    </span>
                    <div className="flex min-w-0 items-center gap-1.5">
                      <Avatar name={c.name} tone={c.tone} size={18} />
                      <div className="min-w-0">
                        <div className="truncate text-[10px] font-semibold text-slate-800">
                          {c.name}
                        </div>
                        <div className="truncate text-[8.5px] text-slate-400">{c.business}</div>
                      </div>
                    </div>
                    <span className="whitespace-nowrap text-[9px] text-slate-500">{c.last}</span>
                    <span className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <Pill
                          key={t}
                          tone={
                            t === "VIP"
                              ? "violet"
                              : t === "Big Spender"
                                ? "amber"
                                : t === "Upsell Opportunity"
                                  ? "cyan"
                                  : "rose"
                          }
                        >
                          {t}
                        </Pill>
                      ))}
                    </span>
                    <span>
                      <ChannelMark channel={c.channel} size={13} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <StepIn show={step >= 3} className="border-t border-slate-100 px-3 py-2">
            <div className="flex items-center gap-2 text-[9.5px] text-slate-500">
              <Users className="h-3 w-3" /> 3 contacts selected
              <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-[3px] text-[9.5px] font-semibold text-white">
                <MessageSquare className="h-2.5 w-2.5" /> Bulk SMS
              </span>
            </div>
          </StepIn>
        </Card>

        {/* composer */}
        <motion.div
          initial={false}
          animate={step >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: reduced ? 0 : 20 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="hidden min-h-0 lg:block"
        >
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="border-b border-slate-100 px-3 py-2 text-[10.5px] font-semibold text-slate-500">
              Bulk SMS composer
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 text-[10.5px] leading-snug text-slate-700">
                Hi {"{{first_name}}"}, it&rsquo;s been a while! We&rsquo;ve saved you a
                returning-customer offer for this month. Want me to find you a time?
              </div>
              <div className="space-y-1.5">
                <StatusRow label="Queued" active={step >= 3} />
                <StatusRow label="Sent" active={step >= 4} />
              </div>
              <StepIn show={step >= 5} className="mt-1">
                <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-slate-100 px-3 py-2 text-[10.5px] text-slate-700">
                  Yes, I&rsquo;d love to book.
                </div>
              </StepIn>
              <StepIn show={step >= 5} delay={0.15} className="mt-auto">
                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-2 text-[10px] font-semibold text-emerald-800">
                  <Check className="h-3 w-3" /> Customer re-engaged
                </div>
              </StepIn>
            </div>
          </Card>
        </motion.div>
      </div>
      <Cursor x={cx} y={cy} clicking={step === 1 || step === 3} reduced={reduced} />
    </div>
  );
}

function FilterChip({ label, on }: { label: string; on: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: on ? 1 : 0.45, scale: on ? 1 : 0.97 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(
        "rounded-full border px-2 py-[2px] text-[9px] font-medium",
        on ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-400",
      )}
    >
      {label}
    </motion.span>
  );
}

function StatusRow({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-[9.5px] text-slate-500">
      <span
        className={cn(
          "flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors duration-500",
          active ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-300",
        )}
      >
        <Check className="h-2 w-2" strokeWidth={3} />
      </span>
      {label}
    </div>
  );
}

/* ================================================================== */
/* 6. MARKETING                                                        */
/* ================================================================== */

const CHANNEL_CHIPS = ["Facebook", "Instagram", "LinkedIn", "Google Business"];
const CAPTION = "Autumn openings are live. Book a consultation and we'll take it from there.";

const MK_CURSOR: Array<[number, number]> = [
  [30, 20],
  [30, 40],
  [24, 62],
  [36, 72],
  [78, 46],
  [78, 66],
];

export function SceneMarketing({ step, reduced }: SceneProps) {
  const [cx, cy] = MK_CURSOR[Math.min(step, MK_CURSOR.length - 1)];
  const typed = reduced
    ? CAPTION
    : CAPTION.slice(0, step >= 2 ? CAPTION.length : step >= 1 ? 34 : 0);
  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-2">
        {/* social */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[10.5px] font-semibold text-slate-600">Social planner</span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-[3px] text-[9px] font-semibold text-white">
              <Plus className="h-2.5 w-2.5" /> New post
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
            <div className="rounded-lg border border-slate-200 p-2.5">
              <div className="min-h-[34px] text-[10.5px] leading-snug text-slate-700">
                {typed}
                {!reduced && step >= 1 && step < 2 ? (
                  <span className="ml-[1px] inline-block h-3 w-[1.5px] animate-pulse bg-blue-500 align-middle" />
                ) : null}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {CHANNEL_CHIPS.map((c, i) => (
                  <motion.span
                    key={c}
                    initial={false}
                    animate={{ opacity: step >= 2 ? 1 : 0.4 }}
                    transition={{ duration: 0.3, delay: step >= 2 ? i * 0.07 : 0 }}
                    className={cn(
                      "rounded-full border px-2 py-[2px] text-[9px] font-medium",
                      step >= 2
                        ? "border-blue-200 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-400",
                    )}
                  >
                    {c}
                  </motion.span>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[9.5px] text-slate-400">
                <Clock className="h-3 w-3" /> Schedule Thu 9:00 AM
                <span
                  className={cn(
                    "ml-auto rounded-md px-2 py-[2px] text-[9px] font-semibold transition-colors duration-500",
                    step >= 3 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500",
                  )}
                >
                  {step >= 3 ? "Scheduled" : "Draft"}
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 p-2">
              <div className="mb-1.5 text-[9px] uppercase tracking-wide text-slate-400">
                Planner &middot; This week
              </div>
              <AnimatePresence>
                {step >= 3 ? (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-lg border border-slate-200 bg-white p-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] font-semibold text-slate-800">Thu 9:00 AM</span>
                      <Pill tone="green" className="ml-auto">
                        Scheduled
                      </Pill>
                    </div>
                    <div className="mt-1 truncate text-[9px] text-slate-500">{CAPTION}</div>
                    <div className="mt-1.5 flex gap-1">
                      {CHANNEL_CHIPS.map((c) => (
                        <span
                          key={c}
                          className="rounded bg-slate-100 px-1.5 py-[1px] text-[8px] text-slate-500"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </Card>

        {/* email sequence */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[10.5px] font-semibold text-slate-600">
              Quote Follow-Up sequence
            </span>
            <Pill tone="blue" className="ml-auto">
              Audience: Open Quotes
            </Pill>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3">
            {[
              { t: "Quote sent", s: "Trigger" },
              { t: "Email 1 · Your quote", s: "Immediately" },
              { t: "Wait 2 days", s: "Delay" },
              { t: "Email 2 · Common questions", s: "Cancels on reply" },
              { t: "Wait 3 days", s: "Delay" },
              { t: "Email 3 · Ready when you are", s: "Cancels on reply" },
            ].map((n, i) => {
              const cancelled = step >= 5 && i >= 3;
              return (
                <motion.div
                  key={n.t}
                  initial={false}
                  animate={{ opacity: cancelled ? 0.4 : 1 }}
                  transition={{ duration: 0.4, delay: cancelled ? i * 0.06 : 0 }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border bg-white px-2.5 py-1.5 transition-colors duration-500",
                    step === i + 1 ? "border-blue-300" : "border-slate-200",
                  )}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                    {n.s === "Delay" ? (
                      <Clock className="h-2.5 w-2.5" />
                    ) : (
                      <Mail className="h-2.5 w-2.5" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div
                      className={cn(
                        "truncate text-[10px] font-semibold text-slate-800",
                        cancelled && "line-through decoration-slate-300",
                      )}
                    >
                      {n.t}
                    </div>
                    <div className="truncate text-[8.5px] text-slate-400">{n.s}</div>
                  </div>
                  {cancelled ? (
                    <span className="ml-auto shrink-0 text-[8.5px] font-semibold text-slate-400">
                      Cancelled
                    </span>
                  ) : null}
                </motion.div>
              );
            })}
            <div className="mt-auto flex items-center gap-1.5 text-[9.5px] text-slate-500">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="h-2 w-2" strokeWidth={3} />
              </span>
              Stop on reply enabled
            </div>
          </div>
        </Card>
      </div>
      <Toast
        show={step >= 5}
        tone="blue"
        icon={<MessageSquare className="h-3 w-3" />}
        title="Reply received"
        body="Remaining emails cancelled for this customer."
      />
      <Cursor x={cx} y={cy} clicking={step === 2 || step === 3} reduced={reduced} />
    </div>
  );
}

/* ================================================================== */
/* 7. PROPOSALS                                                        */
/* ================================================================== */

const DOCS = [
  {
    title: "Studio Fit-out Proposal",
    customer: "North & Pine Studio",
    viewed: "2 hours ago",
    value: "A$8,400",
    owner: "Sam Ortiz",
    status: "Sent",
  },
  {
    title: "Annual Service Agreement",
    customer: "Harbour Dental",
    viewed: "Yesterday",
    value: "A$3,250",
    owner: "Ivy Roshan",
    status: "Viewed",
  },
  {
    title: "Brand Refresh Scope",
    customer: "Field & Form",
    viewed: "3 days ago",
    value: "A$5,900",
    owner: "Sam Ortiz",
    status: "Completed",
  },
];

const PR_CURSOR: Array<[number, number]> = [
  [42, 16],
  [42, 30],
  [46, 46],
  [80, 66],
  [80, 76],
  [80, 82],
];

export function SceneProposals({ step, reduced }: SceneProps) {
  const [cx, cy] = PR_CURSOR[Math.min(step, PR_CURSOR.length - 1)];
  const liveStatus =
    step >= 5
      ? "Completed"
      : step >= 4
        ? "Signed"
        : step >= 3
          ? "Viewed"
          : step >= 2
            ? "Sent"
            : "Draft";
  return (
    <div className="relative h-full p-3 sm:p-4">
      <div className="grid h-full grid-cols-1 gap-3 lg:grid-cols-[1.3fr_1fr]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[10.5px] font-semibold text-slate-600">
              Documents &amp; contracts
            </span>
            <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-blue-600 px-2 py-[3px] text-[9px] font-semibold text-white">
              <Plus className="h-2.5 w-2.5" /> New
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <div className="grid grid-cols-[1.5fr_1.1fr_0.9fr_0.8fr_0.9fr] gap-2 border-b border-slate-100 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Title</span>
              <span>Customer</span>
              <span>Last viewed</span>
              <span>Value</span>
              <span>Owner</span>
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -8 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="grid grid-cols-[1.5fr_1.1fr_0.9fr_0.8fr_0.9fr] items-center gap-2 border-b border-slate-50 bg-blue-50/50 px-3 py-2"
            >
              <span className="truncate text-[10px] font-semibold text-slate-800">
                Consultation Proposal
              </span>
              <span className="truncate text-[9.5px] text-slate-500">North &amp; Pine Studio</span>
              <span className="text-[9.5px] text-slate-500">{step >= 3 ? "Just now" : "—"}</span>
              <span className="text-[9.5px] font-semibold text-slate-700">A$4,750</span>
              <span className="flex items-center gap-1 text-[9.5px] text-slate-500">
                <Avatar name="Sam Ortiz" size={16} tone="bg-blue-100 text-blue-700" />
                Sam O.
              </span>
            </motion.div>
            {DOCS.map((d) => (
              <div
                key={d.title}
                className="grid grid-cols-[1.5fr_1.1fr_0.9fr_0.8fr_0.9fr] items-center gap-2 border-b border-slate-50 px-3 py-2"
              >
                <span className="truncate text-[10px] font-medium text-slate-700">{d.title}</span>
                <span className="truncate text-[9.5px] text-slate-500">{d.customer}</span>
                <span className="text-[9.5px] text-slate-500">{d.viewed}</span>
                <span className="text-[9.5px] text-slate-600">{d.value}</span>
                <span className="flex items-center gap-1 text-[9.5px] text-slate-500">
                  <Avatar name={d.owner} size={16} tone="bg-slate-100 text-slate-500" />
                  {d.owner.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* document preview */}
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
            <span className="text-[10.5px] font-semibold text-slate-600">
              Consultation Proposal
            </span>
            <Pill
              tone={
                liveStatus === "Completed" || liveStatus === "Signed"
                  ? "green"
                  : liveStatus === "Viewed"
                    ? "amber"
                    : liveStatus === "Sent"
                      ? "blue"
                      : "slate"
              }
              className="ml-auto"
            >
              {liveStatus}
            </Pill>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
            <div className="rounded-lg border border-slate-200 p-2.5">
              <div className="text-[9px] uppercase tracking-wide text-slate-400">Prepared for</div>
              <div className="text-[10.5px] font-semibold text-slate-800">
                Maya Chen &middot; North &amp; Pine Studio
              </div>
              <div className="mt-2 space-y-1">
                <LineItem label="Discovery and planning" value="A$1,250" show={step >= 1} />
                <LineItem label="Design and build" value="A$2,900" show={step >= 1} />
                <LineItem label="Handover and training" value="A$600" show={step >= 1} />
              </div>
              <div className="mt-2 flex items-center border-t border-slate-100 pt-1.5 text-[10px] font-semibold text-slate-800">
                Total
                <span className="ml-auto">A$4,750</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-2.5">
              <div className="mb-1.5 flex items-center gap-1 text-[9px] uppercase tracking-wide text-slate-400">
                <FileSignature className="h-3 w-3" /> Signature
              </div>
              <div className="h-9 rounded-md bg-slate-50">
                <svg viewBox="0 0 200 36" className="h-full w-full">
                  <motion.path
                    d="M10 26 C 26 6, 38 30, 52 16 S 74 4, 88 22 C 100 34, 112 10, 128 18 S 156 30, 186 12"
                    fill="none"
                    stroke="#1d4ed8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={false}
                    animate={{ pathLength: step >= 4 ? 1 : 0 }}
                    transition={{ duration: reduced ? 0 : 1.1, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            </div>

            <StepIn show={step >= 2 && step < 4}>
              <div className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-2.5 py-[4px] text-[9.5px] font-semibold text-white">
                <Send className="h-2.5 w-2.5" /> Send for signature
              </div>
            </StepIn>

            <StepIn show={step >= 5} className="mt-auto">
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-2 text-[10px] font-semibold text-emerald-800">
                <Trophy className="h-3.5 w-3.5" />
                Opportunity: Decision Pending
                <ArrowRight className="h-3 w-3" />
                Won
              </div>
            </StepIn>
          </div>
        </Card>
      </div>
      <Toast
        show={step >= 4}
        title="Proposal signed"
        body="Consultation Proposal completed and filed to the customer record."
      />
      <Cursor x={cx} y={cy} clicking={step === 1 || step === 2} reduced={reduced} />
    </div>
  );
}

function LineItem({ label, value, show }: { label: string; value: string; show: boolean }) {
  return (
    <StepIn show={show} className="flex items-center text-[9.5px] text-slate-600">
      {label}
      <span className="ml-auto text-slate-500">{value}</span>
    </StepIn>
  );
}
