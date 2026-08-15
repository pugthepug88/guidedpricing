import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  FileText,
  Filter,
  Instagram,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "./faces";
import {
  Avatar,
  EASE_OUT,
  GhostRow,
  Glow,
  Hero,
  Payoff,
  Scene,
  Signal,
  Tag,
  type SceneProps,
} from "./motion-kit";

export type { SceneProps };

/* ================================================================= */
/* 1 — CONTACTS : dormant VIPs re-engaged, inside the real table       */
/* ================================================================= */

type ContactRow = {
  name: string;
  email: string;
  phone: string;
  face: string;
  tags: string[];
  last: string;
  source: string;
  status: string;
  match?: boolean;
};

const CONTACTS: ContactRow[] = [
  {
    name: "Maya Chen",
    email: "maya.chen@northlight.co",
    phone: "+44 7700 900321",
    face: FACE.maya,
    tags: ["VIP", "Big Spender"],
    last: "7 months ago",
    source: "Referral",
    status: "Dormant",
    match: true,
  },
  {
    name: "Daniel Ross",
    email: "d.ross@rossbuild.co.uk",
    phone: "+44 7700 900184",
    face: FACE.daniel,
    tags: ["VIP", "Upsell Opportunity"],
    last: "8 months ago",
    source: "Website",
    status: "Dormant",
    match: true,
  },
  {
    name: "Priya Nair",
    email: "priya@nairstudio.com",
    phone: "+44 7700 900112",
    face: FACE.priya,
    tags: ["VIP", "Repeat Customer"],
    last: "6 months ago",
    source: "Instagram",
    status: "Dormant",
    match: true,
  },
  {
    name: "Tom Whyte",
    email: "tom.whyte@whytefit.com",
    phone: "+44 7700 900076",
    face: FACE.tom,
    tags: ["VIP", "Repeat Customer"],
    last: "9 months ago",
    source: "Google Ads",
    status: "Dormant",
    match: true,
  },
  {
    name: "Sophie Bell",
    email: "sophie.bell@gmail.com",
    phone: "+44 7700 900540",
    face: FACE.sophie,
    tags: ["Lead"],
    last: "3 days ago",
    source: "Website",
    status: "Active",
  },
  {
    name: "Leo Marsh",
    email: "leo@marshjoinery.co.uk",
    phone: "+44 7700 900218",
    face: FACE.leo,
    tags: ["Client"],
    last: "Yesterday",
    source: "Referral",
    status: "Active",
  },
  {
    name: "Ava Dunn",
    email: "ava.dunn@brightco.io",
    phone: "+44 7700 900461",
    face: FACE.jordan,
    tags: ["Client", "Upsell Opportunity"],
    last: "4 days ago",
    source: "Instagram",
    status: "Active",
  },
  {
    name: "Noah Reid",
    email: "noah.reid@outlook.com",
    phone: "+44 7700 900733",
    face: FACE.sam,
    tags: ["Lead"],
    last: "1 week ago",
    source: "Facebook",
    status: "Active",
  },
];

const MATCH_ORDER = CONTACTS.reduce<number[]>((acc, c, i) => {
  if (c.match) acc.push(i);
  return acc;
}, []);

const COLS = "26px minmax(0,2fr) minmax(0,1.15fr) minmax(0,1.7fr) 92px 82px 112px";

function HeaderCheckbox({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border transition-colors duration-300",
        on ? "border-zapla-blue bg-zapla-blue text-white" : "border-slate-300 bg-white",
      )}
    >
      {on ? <Check className="h-[9px] w-[9px]" strokeWidth={3.5} /> : null}
    </span>
  );
}

function TagChip({ label }: { label: string }) {
  const tone =
    label === "VIP"
      ? "bg-amber-50 text-amber-700"
      : label === "Big Spender"
        ? "bg-violet-50 text-violet-700"
        : label === "Upsell Opportunity"
          ? "bg-sky-50 text-sky-700"
          : label === "Repeat Customer"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-600";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-[2px] text-[10px] font-semibold leading-none whitespace-nowrap",
        tone,
      )}
    >
      {label}
    </span>
  );
}

function StatusCell({ status }: { status: string }) {
  const tone =
    status === "Sent"
      ? "bg-blue-50 text-blue-700"
      : status === "Replied"
        ? "bg-emerald-50 text-emerald-700"
        : status === "Dormant"
          ? "bg-slate-100 text-slate-500"
          : "bg-slate-50 text-slate-500";
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={status}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10.5px] font-semibold leading-none",
          tone,
        )}
      >
        {status === "Sent" ? <Send className="h-[10px] w-[10px]" /> : null}
        {status === "Replied" ? <MessageSquare className="h-[10px] w-[10px]" /> : null}
        {status}
      </motion.span>
    </AnimatePresence>
  );
}

/* soft interaction indicator: ring + inner dot, only on real controls */
function SoftCursor({
  show,
  x,
  y,
  press,
  reduced,
}: {
  show: boolean;
  x: number;
  y: number;
  press?: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="pointer-events-none absolute z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, left: `${x}%`, top: `${y}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, ease: EASE_OUT }}
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <motion.span
            animate={{ scale: press ? 0.78 : 1 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="flex h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-400/60 bg-white/70 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.35)] backdrop-blur-[1px]"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-slate-700" />
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FilterRow({ label, value, on }: { label: string; value: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 py-[5px]">
      <span className="text-[10.5px] font-medium text-slate-400">{label}</span>
      <span
        className={cn(
          "rounded-md border px-2 py-[3px] text-[10.5px] font-semibold transition-colors duration-300",
          on
            ? "border-zapla-blue/30 bg-blue-50 text-blue-700"
            : "border-slate-200 bg-white text-slate-400",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function DrawerField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-[6px]">
      <span className="text-[10.5px] font-medium text-slate-400">{label}</span>
      <span className="text-right text-[11.5px] font-semibold text-slate-700">{value}</span>
    </div>
  );
}

export function SceneContacts({ phase, reduced }: SceneProps) {
  /* timeline
     0 still · 1 cursor to Filter · 2 popover opens · 3 criteria set
     4 apply → filtered + result line · 5-8 select rows 1-4 · 9 action bar
     10 drawer opens · 11 drawer read · 12 send pressed
     13-16 Sent pills one by one (drawer closed) · 17 Maya replies + hold */
  const popover = phase >= 2 && phase <= 4;
  const criteria = phase >= 3;
  const filtered = phase >= 4;
  const selectedCount = Math.max(0, Math.min(phase - 4, 4));
  const bar = phase >= 9 && phase <= 12;
  const drawer = phase >= 10 && phase <= 12;
  const drawerSent = phase >= 12;
  const sentCount = phase >= 13 ? Math.min(phase - 12, 4) : 0;
  const replied = phase >= 17;

  const cursor =
    phase >= 1 && phase <= 3
      ? { x: 88, y: 6, press: phase === 2 }
      : phase === 4
        ? { x: 81, y: 30, press: true }
        : phase === 9 || phase === 10
          ? { x: 90, y: 93, press: phase === 10 }
          : phase === 11 || phase === 12
            ? { x: 82, y: 84, press: phase === 12 }
            : null;

  const isSelected = (i: number) => {
    const pos = MATCH_ORDER.indexOf(i);
    return pos > -1 && pos < selectedCount;
  };

  const statusFor = (c: ContactRow, i: number) => {
    if (!c.match) return c.status;
    if (replied && i === 0) return "Replied";
    const pos = MATCH_ORDER.indexOf(i);
    if (pos > -1 && pos < sentCount) return "Sent";
    return c.status;
  };

  const lastFor = (c: ContactRow, i: number) => (replied && i === 0 ? "Just now" : c.last);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 flex flex-col px-4 pb-3 pt-3">
        {/* toolbar */}
        <div className="mb-2 flex items-center gap-2">
          <div className="text-[12.5px] font-bold tracking-tight text-slate-800">All contacts</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={filtered ? "found" : "all"}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: EASE_OUT }}
              className={cn(
                "rounded-full px-2 py-[2px] text-[10px] font-semibold",
                filtered ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500",
              )}
            >
              {filtered ? "4 contacts found" : `${CONTACTS.length} contacts`}
            </motion.span>
          </AnimatePresence>
          <div className="ml-auto flex items-center gap-1.5">
            {filtered ? (
              <>
                {["VIP", "Inactive 6m+"].map((t, i) => (
                  <motion.span
                    key={t}
                    initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : i * 0.09 }}
                    className="inline-flex items-center gap-1 rounded-md border border-zapla-blue/25 bg-blue-50 px-2 py-[4px] text-[10.5px] font-semibold text-blue-700"
                  >
                    <Filter className="h-[10px] w-[10px]" />
                    {t}
                  </motion.span>
                ))}
              </>
            ) : null}
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md border px-2 py-[4px] text-[10.5px] font-medium transition-colors duration-300",
                popover
                  ? "border-zapla-blue/40 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-400",
              )}
            >
              <Filter className="h-[10px] w-[10px]" />
              Filter
            </span>
            <span className="rounded-md border border-slate-200 bg-white px-2 py-[4px] text-[10.5px] font-medium text-slate-400">
              Sort
            </span>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div
            className="grid items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-3 py-[7px] text-[10px] font-semibold uppercase tracking-wide text-slate-400"
            style={{ gridTemplateColumns: COLS }}
          >
            <HeaderCheckbox on={selectedCount === 4} />
            <span>Contact</span>
            <span>Phone</span>
            <span>Tags</span>
            <span>Last activity</span>
            <span>Source</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-slate-100">
            {CONTACTS.map((c, i) => {
              const dim = filtered && !c.match;
              const sel = isSelected(i);
              const focus = replied && i === 0;
              return (
                <motion.div
                  key={c.name}
                  animate={{
                    opacity: dim ? 0.4 : 1,
                    backgroundColor: focus
                      ? "rgba(236,253,245,0.9)"
                      : sel
                        ? "rgba(239,246,255,0.85)"
                        : "rgba(255,255,255,1)",
                  }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
                  className="relative"
                >
                  <div
                    className="grid items-center gap-2 px-3 py-[9px]"
                    style={{ gridTemplateColumns: COLS }}
                  >
                    <span
                      className={cn(
                        "flex h-[13px] w-[13px] items-center justify-center rounded-[3px] border transition-colors duration-300",
                        sel
                          ? "border-zapla-blue bg-zapla-blue text-white"
                          : "border-slate-300 bg-white",
                      )}
                    >
                      <AnimatePresence>
                        {sel ? (
                          <motion.span
                            initial={reduced ? false : { scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: reduced ? 0 : 0.24, ease: EASE_OUT }}
                          >
                            <Check className="h-[9px] w-[9px]" strokeWidth={3.5} />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>

                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar src={c.face} size={26} className="ring-1 ring-slate-100" />
                      <div className="min-w-0">
                        <div className="truncate text-[12px] font-semibold leading-tight text-slate-800">
                          {c.name}
                        </div>
                        <div className="truncate text-[10.5px] leading-tight text-slate-400">
                          {c.email}
                        </div>
                      </div>
                    </div>

                    <span className="truncate text-[11px] tabular-nums text-slate-500">
                      {c.phone}
                    </span>

                    <div className="flex min-w-0 flex-wrap items-center gap-1">
                      {c.tags.map((t) => (
                        <TagChip key={t} label={t} />
                      ))}
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={lastFor(c, i)}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.26, ease: EASE_OUT }}
                        className={cn(
                          "truncate text-[11px]",
                          focus ? "font-semibold text-emerald-700" : "text-slate-400",
                        )}
                      >
                        {lastFor(c, i)}
                      </motion.span>
                    </AnimatePresence>

                    <span className="truncate text-[11px] text-slate-400">{c.source}</span>

                    <div className="flex items-center gap-1.5">
                      <StatusCell status={statusFor(c, i)} />
                    </div>
                  </div>

                  {/* Maya's reply stays attached to her row */}
                  <AnimatePresence initial={false}>
                    {focus ? (
                      <motion.div
                        initial={reduced ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: reduced ? 0 : 0.42, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center gap-2 border-t border-emerald-100/70 px-3 pb-[9px] pl-[54px] pt-[7px]">
                          <span className="rounded-lg rounded-tl-sm bg-emerald-50 px-2.5 py-1 text-[11.5px] font-medium text-emerald-900">
                            &ldquo;Yes please. What times do you have Thursday?&rdquo;
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-[3px] text-[10px] font-semibold text-blue-700">
                            <CalendarCheck className="h-[10px] w-[10px]" /> Booking opportunity
                          </span>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* native selection action bar */}
        <div className={cn("relative mt-auto", replied || sentCount > 0 ? "h-0" : "h-[46px]")}>
          <AnimatePresence initial={false}>
            {bar ? (
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
                className="absolute inset-x-0 bottom-0 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.35)]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-zapla-blue text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-[12px] font-semibold text-slate-700">
                  4 contacts selected
                </span>
                <span className="text-[11px] text-slate-400">VIP · Inactive 6m+</span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-zapla-blue px-3 py-1.5 text-[11.5px] font-semibold text-white">
                  <MessageSquare className="h-3 w-3" />
                  Send SMS campaign
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* native filter popover, anchored under the Filter control */}
      <AnimatePresence initial={false}>
        {popover ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: reduced ? 0 : 0.34, ease: EASE_OUT }}
            className="absolute right-[54px] top-[38px] z-40 w-[236px] origin-top rounded-xl border border-slate-200 bg-white p-3 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.4)]"
          >
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <Filter className="h-[11px] w-[11px] text-zapla-blue" /> Filter contacts
            </div>
            <FilterRow label="Tag" value="VIP" on={criteria} />
            <FilterRow label="Last activity" value="More than 6 months ago" on={criteria} />
            <FilterRow label="Sort" value="Oldest first" on={criteria} />
            <div
              className={cn(
                "mt-2 rounded-lg px-3 py-1.5 text-center text-[11.5px] font-semibold text-white transition-colors duration-300",
                criteria ? "bg-zapla-blue" : "bg-slate-300",
              )}
            >
              Apply filter
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* native right-side SMS drawer */}
      <AnimatePresence initial={false}>
        {drawer ? (
          <motion.div
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
            className="absolute bottom-0 right-0 top-0 z-40 flex w-[292px] flex-col border-l border-slate-200 bg-white px-3.5 py-3 shadow-[-24px_0_60px_-32px_rgba(15,23,42,0.4)]"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="h-[13px] w-[13px] text-zapla-blue" />
              <span className="text-[12.5px] font-bold tracking-tight text-slate-800">
                SMS Campaign
              </span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-slate-100 px-1.5 py-[2px] pr-2 text-[10px] font-semibold text-slate-500">
                <Avatar src={FACE.alex} size={14} />
                You
              </span>
            </div>

            <div className="mt-2.5">
              <DrawerField label="Audience" value="VIP · Inactive 6m+" />
              <DrawerField label="Recipients" value="4 contacts" />
              <DrawerField label="Offer" value="VIP comeback offer" />
              <DrawerField label="Channel" value="SMS" />
            </div>

            <div className="mt-2.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Message preview
            </div>
            <div className="mt-1.5 rounded-xl rounded-tl-sm bg-slate-50 p-2.5 text-[11.5px] leading-[1.5] text-slate-600">
              Hi {"{{"}first_name{"}}"}, it&rsquo;s been a while. We&rsquo;re offering a special VIP
              comeback offer this month. Reply YES and we&rsquo;ll send you the details and available
              times.
            </div>

            <div className="mt-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={drawerSent ? "sent" : "send"}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-white",
                    drawerSent ? "bg-emerald-600" : "bg-zapla-blue",
                  )}
                >
                  {drawerSent ? (
                    <>
                      <Check className="h-3.5 w-3.5" strokeWidth={3} /> Campaign sent
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Send to 4 contacts
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SoftCursor
        show={!!cursor}
        x={cursor?.x ?? 88}
        y={cursor?.y ?? 6}
        press={cursor?.press}
        reduced={reduced}
      />
    </div>
  );
}

/* ================================================================= */
/* 2 — OPPORTUNITIES : one deal creates downstream work               */
/* ================================================================= */

const BOARD = [
  { col: "New enquiry", n: 3 },
  { col: "Qualified", n: 2 },
  { col: "Proposal sent", n: 3 },
  { col: "Negotiation", n: 2 },
];

function BoardBackground() {
  return (
    <div className="absolute inset-0 grid grid-cols-4 gap-2.5 px-4 py-3">
      {BOARD.map((c) => (
        <div key={c.col} className="min-w-0">
          <div className="mb-2 truncate text-[10.5px] font-semibold uppercase tracking-wide text-slate-400">
            {c.col}
          </div>
          <div className="space-y-2">
            {Array.from({ length: c.n }).map((_, i) => (
              <div
                key={i}
                className="space-y-1.5 rounded-lg border border-slate-200/80 bg-white p-2.5"
              >
                <GhostRow w="76%" h={8} />
                <GhostRow w="48%" h={7} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const STAGES = ["Qualified", "Proposal sent", "Negotiation", "Won"] as const;

export function SceneOpportunities({ phase, reduced }: SceneProps) {
  const lifted = phase >= 1;
  const stageIndex = Math.min(Math.max(phase - 1, 0), 3);
  const won = phase >= 4;
  const fan = phase >= 5;
  const payoff = phase >= 6;
  const collapse = phase >= 7;

  const work = [
    { label: "Deposit request", icon: FileText, rot: -7, x: -150, y: 22 },
    { label: "Welcome email", icon: Mail, rot: 0, x: 0, y: 44 },
    { label: "Onboarding call", icon: CalendarCheck, rot: 7, x: 150, y: 22 },
  ];

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.1 : won ? 0.8 : lifted ? 0.45 : 0}
      background={<BoardBackground />}
      foreground={
        <>
          <Glow
            show={won && !collapse}
            tone="green"
            className="left-1/2 top-[18%] h-64 w-80 -translate-x-1/2"
          />
          <AnimatePresence>
            {lifted && !payoff ? (
              <motion.div
                className="absolute left-1/2 top-[16%] w-[54%] max-w-[360px]"
                initial={reduced ? false : { opacity: 0, y: 46, scale: 0.86, x: "-50%" }}
                animate={{
                  opacity: 1,
                  x: "-50%",
                  y: won ? -6 : 0,
                  scale: won ? 1.06 : 1,
                  rotate: won ? 0 : -1.2,
                }}
                exit={{ opacity: 0, scale: 0.94, x: "-50%" }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                <Hero className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar src={FACE.tom} size={44} />
                    <div className="min-w-0">
                      <div className="text-[16.5px] font-extrabold leading-tight tracking-tight text-slate-900">
                        Bennett Landscapes
                      </div>
                      <div className="text-[11.5px] text-slate-400">Garden design · £8,400</div>
                    </div>
                    <div className="ml-auto text-right">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={STAGES[stageIndex]}
                          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -14, scale: 0.9 }}
                          transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT }}
                          className={
                            won
                              ? "rounded-full bg-emerald-500 px-3 py-1.5 text-[12px] font-bold text-white"
                              : "rounded-full bg-slate-900 px-3 py-1.5 text-[12px] font-bold text-white"
                          }
                        >
                          {STAGES[stageIndex]}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    {STAGES.slice(0, 3).map((s, i) => (
                      <motion.span
                        key={s}
                        initial={false}
                        animate={{ opacity: i <= stageIndex ? 1 : 0.25 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Tag tone={i <= stageIndex ? "blue" : "slate"}>{s}</Tag>
                      </motion.span>
                    ))}
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* downstream work fans out from behind the same deal card */}
          {work.map((w, i) => (
            <Signal
              key={w.label}
              show={fan && !collapse}
              reduced={reduced}
              delay={i * 0.11}
              from={{ x: 0, y: -30 }}
              to={{ x: w.x, y: w.y }}
              rotate={w.rot}
              className="left-1/2 top-[46%] -translate-x-1/2 px-3 py-2 text-[12px]"
            >
              <w.icon className="h-3.5 w-3.5 text-blue-600" /> {w.label}
            </Signal>
          ))}

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[34%] w-[74%] max-w-[420px] -translate-x-1/2"
          >
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_18px_34px_-14px_rgba(16,185,129,0.8)]">
                <Check className="h-6 w-6" strokeWidth={3} />
              </span>
              <div>
                <div className="text-[18px] font-extrabold tracking-tight text-slate-900">Won</div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Next steps started automatically
                </div>
              </div>
            </div>
          </Payoff>
        </>
      }
    />
  );
}

/* ================================================================= */
/* 3 — INBOX : one customer, every channel                            */
/* ================================================================= */

function InboxBackground() {
  return (
    <div className="absolute inset-0 flex">
      <div className="w-[38%] space-y-2 border-r border-slate-200/80 bg-white p-3">
        {[FACE.maya, FACE.sophie, FACE.leo, FACE.priya, FACE.daniel, FACE.nina].map((f, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg px-1.5 py-2">
            <img src={f} alt="" aria-hidden className="h-7 w-7 rounded-full object-cover" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <GhostRow w="62%" h={8} />
              <GhostRow w="84%" h={6} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-3 p-4">
        {[68, 52, 74, 44].map((w, i) => (
          <div key={i} className={i % 2 ? "flex justify-end" : ""} style={{ width: "100%" }}>
            <div
              style={{ width: `${w}%` }}
              className="h-9 rounded-2xl border border-slate-200/70 bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SceneInbox({ phase, reduced }: SceneProps) {
  const lift = phase >= 1;
  const sms = phase >= 2;
  const token = phase >= 3;
  const payoff = phase >= 4;
  const collapse = phase >= 5;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.1 : lift ? 0.7 : 0}
      background={<InboxBackground />}
      foreground={
        <>
          <Glow show={lift && !collapse} className="left-[16%] top-[20%] h-56 w-72" />
          <AnimatePresence>
            {lift && !payoff ? (
              <motion.div
                className="absolute top-[18%] w-[58%] max-w-[380px]"
                initial={reduced ? false : { opacity: 0, x: -60, y: 30, scale: 0.86 }}
                animate={{
                  opacity: 1,
                  x: sms ? 46 : 0,
                  y: 0,
                  scale: 1,
                  rotate: sms ? 0 : -1.5,
                  left: "8%",
                }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.62, ease: EASE_OUT }}
              >
                <Hero className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={FACE.maya} size={46} />
                    <div>
                      <div className="text-[16px] font-extrabold tracking-tight text-slate-900">
                        Maya Chen
                      </div>
                      <div className="text-[11.5px] text-slate-400">One conversation</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <ChannelMorph sms={sms} reduced={reduced} />
                    </div>
                  </div>
                  <div className="mt-3.5 space-y-2">
                    <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5 text-[12.5px] font-medium text-slate-700">
                      Do you have Thursday free?
                    </div>
                    <AnimatePresence>
                      {sms ? (
                        <motion.div
                          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                          className="ml-auto max-w-[86%] rounded-2xl rounded-br-sm bg-zapla-blue px-3.5 py-2.5 text-[12.5px] font-medium text-white"
                        >
                          Thursday 2pm is yours, Maya.
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Signal
            show={token && !payoff}
            reduced={reduced}
            from={{ x: -70, y: 0 }}
            to={{ x: 0, y: 0 }}
            rotate={-2}
            className="right-[7%] top-[42%] px-3 py-2 text-[12px]"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Opportunity created
          </Signal>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[32%] w-[78%] max-w-[440px] -translate-x-1/2"
          >
            <div className="flex items-center gap-4">
              <Avatar src={FACE.maya} size={58} />
              <div>
                <div className="text-[18px] font-extrabold tracking-tight text-slate-900">
                  Maya Chen
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white">
                    <Instagram className="h-4 w-4" />
                  </span>
                  <span className="-ml-4 flex h-7 w-7 items-center justify-center rounded-[8px] bg-emerald-500 text-white ring-2 ring-white">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  <Tag tone="blue" className="ml-1.5">
                    Opportunity created
                  </Tag>
                </div>
              </div>
            </div>
          </Payoff>
        </>
      }
    />
  );
}

function ChannelMorph({ sms, reduced }: { sms: boolean; reduced: boolean }) {
  return (
    <div className="relative h-8 w-8">
      <AnimatePresence initial={false} mode="popLayout">
        {sms ? (
          <motion.span
            key="sms"
            initial={reduced ? false : { opacity: 0, rotateY: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 90, scale: 0.7 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE_OUT }}
            className="absolute inset-0 flex items-center justify-center rounded-[9px] bg-emerald-500 text-white"
          >
            <MessageSquare className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="ig"
            initial={false}
            exit={{ opacity: 0, rotateY: 90, scale: 0.7 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
            className="absolute inset-0 flex items-center justify-center rounded-[9px] bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white"
          >
            <Instagram className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================= */
/* 4 — AUTOMATIONS : reply makes future work disappear                */
/* ================================================================= */

export function SceneAutomations({ phase, reduced }: SceneProps) {
  const lead = phase >= 1;
  const branch = phase >= 2;
  const reply = phase >= 3;
  const cancel = phase >= 4;
  const booking = phase >= 4;
  const payoff = phase >= 5;
  const collapse = phase >= 6;

  return (
    <Scene
      reduced={reduced}
      recede={collapse ? 0.1 : reply ? 0.85 : lead ? 0.5 : 0}
      background={
        <div className="absolute inset-0 p-5">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage: "radial-gradient(rgba(148,163,184,0.35) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative flex h-full items-center gap-6">
            {["New lead", "Send SMS", "Wait 2 days"].map((n) => (
              <div
                key={n}
                className="rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-[11px] font-medium text-slate-400"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      }
      foreground={
        <>
          <Glow
            show={reply && !collapse}
            className="left-1/2 top-[24%] h-60 w-[420px] -translate-x-1/2"
          />

          {/* A — lead token triggers a large SMS action card */}
          <AnimatePresence>
            {lead && !payoff ? (
              <motion.div
                className="absolute left-[5%] top-[24%] w-[42%] max-w-[280px]"
                initial={reduced ? false : { opacity: 0, x: -50, scale: 0.86 }}
                animate={{
                  opacity: reply ? 0.35 : 1,
                  x: 0,
                  scale: reply ? 0.92 : 1,
                  rotate: -1.5,
                  filter: reply ? "blur(1.5px)" : "blur(0px)",
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: reduced ? 0 : 0.55, ease: EASE_OUT }}
              >
                <Hero className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <MessageSquare className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="text-[14px] font-extrabold tracking-tight text-slate-900">
                        Instant SMS
                      </div>
                      <div className="text-[11px] text-slate-400">New lead · Maya Chen</div>
                    </div>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* B — lighter future branch to the right */}
          <AnimatePresence>
            {branch && !payoff ? (
              <motion.div
                className="absolute right-[7%] top-[16%] w-[34%] max-w-[220px] space-y-2"
                initial={reduced ? false : { opacity: 0, x: 36 }}
                animate={{
                  opacity: cancel ? 0 : 0.95,
                  x: cancel ? 34 : 0,
                  scale: cancel ? 0.82 : 1,
                  rotate: cancel ? 5 : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.6, ease: EASE_OUT }}
              >
                {["Wait 2 days", "Follow-up email", "Second reminder"].map((n, i) => (
                  <motion.div
                    key={n}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: cancel ? i * 6 : 0 }}
                    transition={{ duration: 0.45, delay: reduced ? 0 : i * 0.08 }}
                    className="relative rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-[11.5px] font-semibold text-slate-500 shadow-[0_10px_24px_-16px_rgba(15,23,42,0.4)]"
                  >
                    {n}
                    {cancel ? (
                      <span className="absolute left-2.5 right-2.5 top-1/2 h-[1.5px] bg-rose-400" />
                    ) : null}
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* C/D — huge reply sweeps in and overrides the branch */}
          <AnimatePresence>
            {reply && !payoff ? (
              <motion.div
                className="absolute left-[14%] top-[30%] w-[64%] max-w-[400px]"
                initial={reduced ? false : { opacity: 0, x: -90, y: 24, scale: 0.8, rotate: -4 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: -1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: reduced ? 0 : 0.65, ease: EASE_OUT }}
              >
                <div className="flex items-end gap-3">
                  <Avatar src={FACE.maya} size={44} />
                  <div className="rounded-[22px] rounded-bl-md bg-zapla-ink px-5 py-4 text-[15px] font-semibold leading-snug text-white shadow-[0_34px_70px_-26px_rgba(15,23,42,0.7)]">
                    Thursday 2pm works, book me in.
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* E — booking card expands out of the reply */}
          <AnimatePresence>
            {booking && !payoff ? (
              <motion.div
                className="absolute bottom-[12%] right-[10%] w-[44%] max-w-[280px]"
                initial={reduced ? false : { opacity: 0, y: -18, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 1.5 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{
                  duration: reduced ? 0 : 0.55,
                  delay: reduced ? 0 : 0.16,
                  ease: EASE_OUT,
                }}
              >
                <Hero className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CalendarCheck className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <div className="text-[14px] font-extrabold tracking-tight text-slate-900">
                        Thu 2:00pm
                      </div>
                      <div className="text-[11px] text-slate-400">Appointment booked</div>
                    </div>
                  </div>
                </Hero>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Payoff
            show={payoff && !collapse}
            reduced={reduced}
            className="left-1/2 top-[34%] w-[82%] max-w-[470px] -translate-x-1/2"
          >
            <div className="flex items-center gap-4">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zapla-blue text-white">
                <MessageSquare className="h-5 w-5" />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white ring-2 ring-white">
                  <X className="h-3 w-3" strokeWidth={3} />
                </span>
              </span>
              <div>
                <div className="text-[17px] font-extrabold leading-tight tracking-tight text-slate-900">
                  Reply received
                </div>
                <div className="text-[12.5px] font-medium text-slate-500">
                  Follow-ups stopped, appointment booked
                </div>
              </div>
              <ArrowRight className="ml-auto h-5 w-5 text-slate-300" />
            </div>
          </Payoff>
        </>
      }
    />
  );
}
