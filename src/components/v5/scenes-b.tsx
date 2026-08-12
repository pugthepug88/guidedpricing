import { motion } from "motion/react";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Eye,
  FileText,
  Globe,
  Image as ImageIcon,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Plus,
  Search,
  Send,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, Btn, Card, Cursor, EASE, Pill, StepIn, Toast, Toolbar } from "./kit";
import type { SceneProps } from "./scenes-a";

/* ================================================================== */
/* 5. SOCIAL PLANNER                                                   */
/* ================================================================== */

type Post = { day: number; time: string; title: string; channels: string[]; tone: string };

const PLANNED: Post[] = [
  {
    day: 1,
    time: "9:00 am",
    title: "Behind the scenes reel",
    channels: ["ig"],
    tone: "border-fuchsia-200 bg-fuchsia-50/70",
  },
  {
    day: 2,
    time: "11:30 am",
    title: "Customer spotlight",
    channels: ["fb", "ig"],
    tone: "border-blue-200 bg-blue-50/70",
  },
  {
    day: 3,
    time: "8:15 am",
    title: "Team hiring update",
    channels: ["li"],
    tone: "border-cyan-200 bg-cyan-50/70",
  },
  {
    day: 4,
    time: "4:00 pm",
    title: "Weekend availability",
    channels: ["gb", "fb"],
    tone: "border-emerald-200 bg-emerald-50/70",
  },
  {
    day: 0,
    time: "1:00 pm",
    title: "Studio walkthrough",
    channels: ["ig", "fb"],
    tone: "border-violet-200 bg-violet-50/70",
  },
];

const DAYS = ["Mon 4", "Tue 5", "Wed 6", "Thu 7", "Fri 8"];

function ChannelIcon({ id, size = 12 }: { id: string; size?: number }) {
  const cls = "text-slate-500";
  const style = { width: size, height: size };
  if (id === "ig") return <Instagram style={style} className="text-fuchsia-600" />;
  if (id === "fb") return <Facebook style={style} className="text-blue-600" />;
  if (id === "li") return <Linkedin style={style} className="text-cyan-700" />;
  return <Globe style={style} className={cls} />;
}

const SOCIAL_CURSOR: Array<[number, number]> = [
  [86, 12],
  [70, 40],
  [70, 56],
  [70, 70],
  [70, 84],
  [40, 60],
];

export function SceneSocial({ step, reduced }: SceneProps) {
  const [cx, cy] = SOCIAL_CURSOR[Math.min(step, SOCIAL_CURSOR.length - 1)];
  const composer = step >= 1;
  const posted = step >= 5;

  const posts = posted
    ? [
        ...PLANNED,
        {
          day: 4,
          time: "10:00 am",
          title: "New season openings",
          channels: ["ig", "fb", "li", "gb"],
          tone: "border-blue-300 bg-white ring-2 ring-blue-200",
        },
      ]
    : PLANNED;

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="text-[12px] font-semibold text-slate-900">Social planner</span>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11px] text-slate-500">
          Week of 4 Aug <ChevronDown className="h-3 w-3" />
        </span>
        <span className="ml-1 flex items-center gap-1.5">
          {["ig", "fb", "li", "gb"].map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-[3px] text-[10.5px] text-slate-500"
            >
              <ChannelIcon id={c} />
              {c === "ig"
                ? "Instagram"
                : c === "fb"
                  ? "Facebook"
                  : c === "li"
                    ? "LinkedIn"
                    : "Google Business"}
            </span>
          ))}
        </span>
        <span className="ml-auto">
          <Btn>
            <Plus className="h-3 w-3" /> New post
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-46px)] min-h-0 grid-cols-1 gap-2.5 p-3 lg:grid-cols-[1fr_270px]">
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                      className={cn("rounded-lg border px-2 py-1.5", p.tone)}
                    >
                      <div className="text-[10px] text-slate-400">{p.time}</div>
                      <div className="mt-0.5 text-[11px] font-semibold leading-snug text-slate-800">
                        {p.title}
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        {p.channels.map((c) => (
                          <ChannelIcon key={c} id={c} size={11} />
                        ))}
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
              <span className="text-[12px] font-semibold text-slate-900">Create post</span>
              <Pill tone={posted ? "green" : "slate"} className="ml-auto">
                {posted ? "Scheduled" : "Draft"}
              </Pill>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
              <div className="flex h-16 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-slate-300">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div className="min-h-[52px] rounded-lg border border-slate-200 p-2 text-[11px] leading-relaxed text-slate-600">
                {step >= 2 ? "New season openings are live. " : ""}
                {step >= 3 ? "Book your spot for August and we will hold your usual time." : ""}
                {step < 2 ? <span className="text-slate-300">Write a caption…</span> : null}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Channels
                </div>
                <div className="mt-1 flex flex-wrap gap-1.5">
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
                      <ChannelIcon id={c} />
                      {c === "ig"
                        ? "Instagram"
                        : c === "fb"
                          ? "Facebook"
                          : c === "li"
                            ? "LinkedIn"
                            : "Google"}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] text-slate-600">
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

      <Cursor x={cx} y={cy} clicking={step === 0 || step === 4} reduced={reduced} />
      <Toast
        show={posted}
        title="Post scheduled"
        body="Friday 8 Aug, 10:00 am across four channels."
      />
    </div>
  );
}

/* ================================================================== */
/* 6. EMAIL MARKETING                                                  */
/* ================================================================== */

const CAMPAIGNS = [
  { name: "Winter service reminder", status: "Published", updated: "2 Aug" },
  { name: "Quote follow-up", status: "Published", updated: "29 Jul" },
  { name: "New Customer Welcome", status: "Draft", updated: "Today" },
  { name: "Referral thank you", status: "Draft", updated: "24 Jul" },
];

const EMAIL_CURSOR: Array<[number, number]> = [
  [88, 12],
  [60, 40],
  [60, 56],
  [60, 74],
  [40, 86],
  [40, 86],
];

export function SceneEmail({ step, reduced }: SceneProps) {
  const [cx, cy] = EMAIL_CURSOR[Math.min(step, EMAIL_CURSOR.length - 1)];
  const editor = step >= 1;
  const published = step >= 5;

  return (
    <div className="relative h-full">
      <Toolbar>
        <span className="text-[12px] font-semibold text-slate-900">Email Marketing</span>
        <div className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-[11px] text-slate-400">
          <Search className="h-3.5 w-3.5" /> Search
        </div>
        <span className="flex items-center gap-1">
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
          <Btn>
            <Plus className="h-3 w-3" /> New email
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-46px)] min-h-0 grid-cols-1 gap-2.5 p-3 lg:grid-cols-[300px_1fr]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="grid shrink-0 grid-cols-[1.6fr_0.9fr_0.7fr] gap-2 border-b border-slate-200/80 bg-slate-50/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            <span>Campaign</span>
            <span>Status</span>
            <span>Updated</span>
          </div>
          <div className="divide-y divide-slate-100">
            {CAMPAIGNS.map((c) => {
              const active = c.name === "New Customer Welcome" && editor;
              const status = active && published ? "Published" : c.status;
              return (
                <div
                  key={c.name}
                  className={cn(
                    "grid grid-cols-[1.6fr_0.9fr_0.7fr] items-center gap-2 px-3 py-2.5 transition-colors duration-500",
                    active ? "bg-blue-50/60" : "bg-white",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                    <span className="truncate text-[11.5px] font-medium text-slate-800">
                      {c.name}
                    </span>
                  </div>
                  <Pill tone={status === "Published" ? "green" : "slate"}>{status}</Pill>
                  <span className="text-[10.5px] text-slate-400">{c.updated}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <motion.div
          className="min-h-0"
          initial={false}
          animate={{ opacity: editor ? 1 : 0.25, y: editor ? 0 : 10 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <Card className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
              <span className="text-[12px] font-semibold text-slate-900">Edit email</span>
              <Pill tone={published ? "green" : "slate"}>{published ? "Published" : "Draft"}</Pill>
              <span className="ml-auto flex items-center gap-1.5">
                <Btn tone="ghost">Save draft</Btn>
                <Btn>Publish</Btn>
              </span>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 p-3 lg:grid-cols-[210px_1fr]">
              <div className="space-y-2">
                <LabeledInput label="Campaign name" value="New Customer Welcome" />
                <LabeledInput label="Subject" value="Welcome to our studio" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Editor mode
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="rounded-md bg-slate-900 px-2 py-[3px] text-[10.5px] font-semibold text-white">
                      Manual
                    </span>
                    <span className="rounded-md border border-slate-200 px-2 py-[3px] text-[10.5px] text-slate-500">
                      HTML
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Audience
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <Pill tone="blue">New customers</Pill>
                    <Pill tone="slate">Stop on reply</Pill>
                  </div>
                </div>
              </div>

              <div className="min-h-0 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="mx-auto flex h-full max-w-[320px] flex-col rounded-lg border border-slate-200 bg-white p-3">
                  <div className="h-1.5 w-full rounded-full bg-blue-600" />
                  <StepIn show={step >= 2} className="mt-2.5">
                    <div className="text-[12px] font-semibold text-slate-900">
                      Hi {"{{contact.first_name}}"},
                    </div>
                  </StepIn>
                  <StepIn show={step >= 3} delay={0.05} className="mt-1.5">
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      Welcome aboard. Your booking details are saved, and your regular time is easy
                      to rebook whenever you need it. Reply to this email any time and a real person
                      will answer.
                    </p>
                  </StepIn>
                  <StepIn show={step >= 4} delay={0.05} className="mt-2.5">
                    <span className="inline-flex rounded-md bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                      Book your next visit
                    </span>
                  </StepIn>
                  <div className="mt-auto pt-2 text-[9.5px] text-slate-400">
                    You are receiving this because you booked with us. Unsubscribe any time.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Cursor x={cx} y={cy} clicking={step === 0 || step === 4} reduced={reduced} />
      <Toast show={published} title="Campaign published" body="New Customer Welcome is now live." />
    </div>
  );
}

function LabeledInput({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 truncate rounded-md border border-slate-200 px-2 py-1.5 text-[11.5px] text-slate-700">
        {value}
      </div>
    </div>
  );
}

/* ================================================================== */
/* 7. BOOKINGS                                                         */
/* ================================================================== */

const SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "1:30 PM"];
const BOOK_CURSOR: Array<[number, number]> = [
  [48, 46],
  [78, 30],
  [78, 84],
  [78, 60],
  [78, 84],
  [78, 88],
];

export function SceneBookings({ step, reduced }: SceneProps) {
  const [cx, cy] = BOOK_CURSOR[Math.min(step, BOOK_CURSOR.length - 1)];
  const dateChosen = step >= 1;
  const slotChosen = step >= 2;
  const form = step >= 3;
  const done = step >= 5;

  return (
    <div className="relative h-full p-3">
      <Card className="grid h-full min-h-0 grid-cols-1 divide-y divide-slate-100 overflow-hidden lg:grid-cols-[230px_1fr_240px] lg:divide-x lg:divide-y-0">
        {/* meeting details */}
        <div className="flex flex-col gap-2.5 p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Zapla Digital
          </div>
          <div className="text-[15px] font-semibold leading-snug text-slate-900">
            Discovery walkthrough
          </div>
          <div className="space-y-1.5 text-[11.5px] text-slate-600">
            <Row icon={<Clock className="h-3.5 w-3.5 text-slate-400" />}>45 min</Row>
            <Row icon={<Video className="h-3.5 w-3.5 text-slate-400" />}>Online meeting</Row>
            <Row icon={<MapPin className="h-3.5 w-3.5 text-slate-400" />}>
              Sydney, Australian Eastern Time
            </Row>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500">
            A short walkthrough of how Zapla would fit around your current process.
          </p>
          <StepIn show={done} className="mt-auto">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2">
              <div className="text-[11px] font-semibold text-emerald-800">Meeting confirmed</div>
              <div className="mt-0.5 text-[10.5px] text-emerald-700">
                Thu 14 Aug · 10:00 AM AEST
              </div>
            </div>
          </StepIn>
        </div>

        {/* date picker */}
        <div className="flex min-h-0 flex-col p-3.5">
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] font-semibold text-slate-900">August 2026</span>
            <span className="ml-auto text-[10.5px] text-slate-400">Select a date</span>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
              const available = [5, 6, 7, 12, 13, 14, 19, 20, 21, 26, 27].includes(d);
              const active = d === 14 && dateChosen;
              return (
                <span
                  key={d}
                  className={cn(
                    "flex h-[26px] items-center justify-center rounded-md text-[11px] transition-colors duration-400",
                    active
                      ? "bg-blue-600 font-semibold text-white"
                      : available
                        ? "bg-blue-50 font-medium text-blue-700"
                        : "text-slate-300",
                  )}
                >
                  {d}
                </span>
              );
            })}
          </div>
          <div className="mt-auto flex items-center gap-2 pt-2 text-[10.5px] text-slate-400">
            <span className="inline-flex h-2.5 w-2.5 rounded-[3px] bg-blue-50" /> Available
            <span className="ml-2 inline-flex h-2.5 w-2.5 rounded-[3px] bg-blue-600" /> Selected
          </div>
        </div>

        {/* slots / form */}
        <div className="flex min-h-0 flex-col p-3.5">
          {!form ? (
            <>
              <div className="text-[12px] font-semibold text-slate-900">Thu 14 Aug</div>
              <div className="mt-2 space-y-1.5">
                {SLOTS.map((s) => {
                  const active = s === "10:00 AM" && slotChosen;
                  return (
                    <div
                      key={s}
                      className={cn(
                        "rounded-md border px-2.5 py-1.5 text-center text-[11.5px] font-medium transition-colors duration-400",
                        active
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-200 text-slate-600",
                      )}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
              <div className="mt-auto pt-2">
                <span
                  className={cn(
                    "flex items-center justify-center rounded-md py-2 text-[11.5px] font-semibold transition-colors duration-400",
                    slotChosen ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-400",
                  )}
                >
                  Continue
                </span>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="text-[12px] font-semibold text-slate-900">Your details</div>
              <div className="mt-2 space-y-1.5">
                <MiniField label="Email" value={step >= 4 ? "maya@northpine.example" : ""} />
                <MiniField label="First name" value={step >= 4 ? "Maya" : ""} />
                <MiniField label="Last name" value={step >= 4 ? "Chen" : ""} />
                <MiniField label="Phone" value={step >= 4 ? "0400 111 222" : ""} />
                <MiniField label="Notes" value={step >= 4 ? "Keen to start in August" : ""} />
              </div>
              <div className="mt-auto pt-2">
                <span
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-md py-2 text-[11.5px] font-semibold",
                    done ? "bg-emerald-600 text-white" : "bg-slate-900 text-white",
                  )}
                >
                  {done ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Scheduled
                    </>
                  ) : (
                    "Schedule meeting"
                  )}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </Card>

      <Cursor x={cx} y={cy} clicking={step === 1 || step === 2 || step === 5} reduced={reduced} />
      <Toast
        show={done}
        title="Booking confirmed"
        body="Calendar invite and SMS reminder sent automatically."
      />
    </div>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      {icon}
      <span>{children}</span>
    </div>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9.5px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-0.5 h-[26px] truncate rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-700">
        {value || <span className="text-slate-300">—</span>}
      </div>
    </div>
  );
}

/* ================================================================== */
/* 8. DOCUMENTS / CONTRACTS                                            */
/* ================================================================== */

const DOCS = [
  {
    title: "Service agreement",
    customer: "Riverstone Dental",
    seen: "2 hours ago",
    value: "A$9,800",
    owner: "Alex T.",
    status: "Sent",
  },
  {
    title: "Maintenance retainer",
    customer: "Brightline Electrical",
    seen: "Yesterday",
    value: "A$20,200",
    owner: "Priya S.",
    status: "Viewed",
  },
  {
    title: "Campaign proposal",
    customer: "North & Pine Studio",
    seen: "just now",
    value: "A$8,600",
    owner: "Alex T.",
    status: "Draft",
  },
  {
    title: "Onboarding contract",
    customer: "Atlas Finance",
    seen: "3 days ago",
    value: "A$14,500",
    owner: "Dana K.",
    status: "Signed",
  },
];

const DOC_CURSOR: Array<[number, number]> = [
  [34, 60],
  [80, 26],
  [80, 40],
  [80, 62],
  [80, 74],
  [80, 84],
];

export function SceneDocuments({ step, reduced }: SceneProps) {
  const [cx, cy] = DOC_CURSOR[Math.min(step, DOC_CURSOR.length - 1)];
  const status = step >= 4 ? "Signed" : step >= 3 ? "Viewed" : step >= 2 ? "Sent" : "Draft";
  const tone = status === "Signed" ? "green" : status === "Viewed" ? "violet" : status === "Sent" ? "blue" : "slate";

  return (
    <div className="relative h-full">
      <Toolbar>
        <div className="flex h-7 items-center gap-1.5 rounded-md border border-slate-200 px-2 text-[11px] text-slate-400">
          <Search className="h-3.5 w-3.5" /> Search documents
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11px] text-slate-500">
          Owner: All <ChevronDown className="h-3 w-3" />
        </span>
        <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-[3px] text-[11px] text-slate-500">
          Tags <ChevronDown className="h-3 w-3" />
        </span>
        <span className="ml-auto">
          <Btn>
            <Plus className="h-3 w-3" /> New contract
          </Btn>
        </span>
      </Toolbar>

      <div className="grid h-[calc(100%-46px)] min-h-0 grid-cols-1 gap-2.5 p-3 lg:grid-cols-[1fr_268px]">
        <Card className="flex min-h-0 flex-col overflow-hidden">
          <div className="grid shrink-0 grid-cols-[1.5fr_1.2fr_0.9fr_0.8fr_0.7fr] gap-2 border-b border-slate-200/80 bg-slate-50/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            <span>Document</span>
            <span>Customer</span>
            <span>Last viewed</span>
            <span>Value</span>
            <span>Owner</span>
          </div>
          <div className="divide-y divide-slate-100">
            {DOCS.map((d) => {
              const active = d.title === "Campaign proposal";
              return (
                <div
                  key={d.title}
                  className={cn(
                    "grid grid-cols-[1.5fr_1.2fr_0.9fr_0.8fr_0.7fr] items-center gap-2 px-3 py-2.5 transition-colors duration-500",
                    active && step >= 1 ? "bg-blue-50/60" : "bg-white",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                    <div className="min-w-0">
                      <div className="truncate text-[11.5px] font-semibold text-slate-800">
                        {d.title}
                      </div>
                      <Pill
                        tone={
                          active
                            ? (tone as "green" | "violet" | "blue" | "slate")
                            : d.status === "Signed"
                              ? "green"
                              : d.status === "Viewed"
                                ? "violet"
                                : d.status === "Sent"
                                  ? "blue"
                                  : "slate"
                        }
                        className="mt-1"
                      >
                        {active ? status : d.status}
                      </Pill>
                    </div>
                  </div>
                  <span className="truncate text-[11px] text-slate-600">{d.customer}</span>
                  <span className="truncate text-[11px] text-slate-500">
                    {active && step >= 3 ? "just now" : d.seen}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800">{d.value}</span>
                  <div className="flex items-center gap-1.5">
                    <Avatar name={d.owner} tone="bg-slate-100 text-slate-600" size={18} />
                    <span className="truncate text-[10.5px] text-slate-500">{d.owner}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* detail panel */}
        <motion.div
          className="hidden min-h-0 lg:block"
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : 20 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        >
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2">
              <span className="text-[12px] font-semibold text-slate-900">Campaign proposal</span>
              <Pill tone={tone as "green" | "violet" | "blue" | "slate"} className="ml-auto">
                {status}
              </Pill>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
              <div className="text-[11px] text-slate-500">North &amp; Pine Studio · A$8,600</div>
              <div className="space-y-1">
                {[
                  ["Setup and guided launch", "A$3,600"],
                  ["Monthly platform", "A$5,000"],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1.5 text-[11px]"
                  >
                    <span className="text-slate-600">{l}</span>
                    <span className="font-semibold text-slate-800">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-[10.5px] text-slate-400">
                <Eye className="h-3.5 w-3.5" /> {step >= 3 ? "Viewed by customer" : "Not yet viewed"}
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Signature
                </div>
                <div className="mt-1 h-10 rounded-md border border-slate-200 bg-slate-50">
                  <svg viewBox="0 0 200 40" className="h-full w-full">
                    <motion.path
                      d="M12 28 C 28 8, 40 32, 54 18 S 76 6, 90 24 C 102 36, 114 12, 130 20 S 158 32, 188 14"
                      fill="none"
                      stroke="#1d4ed8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={false}
                      animate={{ pathLength: step >= 4 ? 1 : 0 }}
                      transition={{ duration: reduced ? 0 : 1, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-auto space-y-1.5">
                <Btn className="w-full justify-center">
                  <Send className="h-3 w-3" /> Send for signature
                </Btn>
                <StepIn show={step >= 5}>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-2 text-[11px] text-emerald-800">
                    Opportunity updated: Negotiation → <span className="font-semibold">Won</span>
                  </div>
                </StepIn>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Cursor x={cx} y={cy} clicking={step === 1 || step === 2} reduced={reduced} />
      <Toast show={step >= 5} title="Contract signed" body="Opportunity marked Won automatically." />
    </div>
  );
}
