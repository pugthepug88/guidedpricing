import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CalendarCheck, Check, Filter, MessageSquare, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FACE } from "./faces";
import { CampaignSentCard } from "./campaign-cards";
import { Avatar, EASE_OUT, Glow, Hero, Payoff, Scene, type SceneProps } from "./motion-kit";

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
    email: "maya.chen@northlight.com.au",
    phone: "0412 483 721",
    face: FACE.maya,
    tags: ["VIP", "Big Spender"],
    last: "7 months ago",
    source: "Referral",
    status: "Dormant",
    match: true,
  },
  {
    name: "Daniel Ross",
    email: "daniel.ross@rossbuild.com.au",
    phone: "0423 691 284",
    face: FACE.daniel,
    tags: ["VIP", "Upsell Opportunity"],
    last: "8 months ago",
    source: "Website",
    status: "Dormant",
    match: true,
  },
  {
    name: "Priya Nair",
    email: "priya@nairstudio.com.au",
    phone: "0431 572 116",
    face: FACE.priya,
    tags: ["VIP", "Repeat Customer"],
    last: "6 months ago",
    source: "Instagram",
    status: "Dormant",
    match: true,
  },
  {
    name: "Tom Whyte",
    email: "tom@whytefit.com.au",
    phone: "0408 334 906",
    face: FACE.tom,
    tags: ["VIP", "Repeat Customer"],
    last: "9 months ago",
    source: "Google Ads",
    status: "Dormant",
    match: true,
  },
  {
    name: "Sophie Bell",
    email: "sophie.bell@example.com.au",
    phone: "0417 825 540",
    face: FACE.sophie,
    tags: ["Client"],
    last: "3 days ago",
    source: "Website",
    status: "Active",
  },
  {
    name: "Leo Marsh",
    email: "leo@marshjoinery.com.au",
    phone: "0428 614 218",
    face: FACE.leo,
    tags: ["Client"],
    last: "Yesterday",
    source: "Referral",
    status: "Active",
  },
  {
    name: "Ava Dunn",
    email: "ava.dunn@brightco.com.au",
    phone: "0403 765 461",
    face: FACE.jordan,
    tags: ["Client", "Upsell Opportunity"],
    last: "4 days ago",
    source: "Instagram",
    status: "Active",
  },
  {
    name: "Noah Reid",
    email: "noah.reid@example.com.au",
    phone: "0438 220 733",
    face: FACE.sam,
    tags: ["Big Spender", "Client"],
    last: "1 week ago",
    source: "Facebook",
    status: "Active",
  },
];

const MATCH_ORDER = CONTACTS.reduce<number[]>((acc, c, i) => {
  if (c.match) acc.push(i);
  return acc;
}, []);

const COLS = "26px minmax(0,1.85fr) 128px minmax(0,1.55fr) 92px 82px 112px";

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

/* Zapla demo pointer: soft modern teardrop, anchored to real DOM controls */
const POINTER_PATH =
  "M4.4 3.3 C4.4 2.0 5.9 1.3 6.9 2.1 L18.9 11.7 C20.0 12.6 19.4 14.3 18.0 14.3 L12.7 14.3 C12.2 14.3 11.7 14.6 11.5 15.1 L9.3 20.4 C8.7 21.7 6.8 21.4 6.6 20.0 Z";

function ArrowCursor({
  point,
  press,
  reduced,
}: {
  point: { x: number; y: number } | null;
  press?: boolean;
  reduced: boolean;
}) {
  if (reduced) return null;
  return (
    <AnimatePresence>
      {point ? (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 z-50"
          initial={{ opacity: 0, scale: 0.82, x: point.x, y: point.y }}
          animate={{ opacity: 1, scale: 1, x: point.x, y: point.y }}
          exit={{ opacity: 0, scale: 0.86 }}
          transition={{
            opacity: { duration: 0.22, ease: EASE_OUT },
            scale: { duration: 0.28, ease: EASE_OUT },
            x: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
            y: { type: "spring", stiffness: 170, damping: 20, mass: 0.9 },
          }}
        >
          {/* faint halo under the tip */}
          <span
            className="pointer-events-none absolute left-0 top-0 h-9 w-9 -translate-x-1/3 -translate-y-1/3 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,255,0.28), rgba(37,99,255,0) 68%)",
            }}
          />

          {/* click ripple from the tip */}
          <AnimatePresence>
            {press ? (
              <motion.span
                className="pointer-events-none absolute left-0 top-0 rounded-full border-2"
                style={{ borderColor: "rgba(37,99,255,0.55)" }}
                initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
                animate={{ width: 42, height: 42, x: -21, y: -21, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />
            ) : null}
          </AnimatePresence>

          <motion.svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            animate={{ scale: press ? 0.86 : 1, rotate: press ? -7 : 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{
              originX: 0.2,
              originY: 0.1,
              filter:
                "drop-shadow(0 1px 1.5px rgba(15,23,42,0.45)) drop-shadow(0 6px 12px rgba(15,23,42,0.28))",
            }}
          >
            <defs>
              <linearGradient id="zaplaPointerFill" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#3b82ff" />
                <stop offset="55%" stopColor="#2563ff" />
                <stop offset="100%" stopColor="#7c5cf6" />
              </linearGradient>
            </defs>
            <path
              d={POINTER_PATH}
              fill="url(#zaplaPointerFill)"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* inner sheen along the leading edge */}
            <path
              d="M6.2 4.1 L15.2 11.3"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </motion.svg>
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
     13 large campaign-sent card · 14-17 Sent pills one by one
     18 Maya replies + hold */
  const popover = phase >= 2 && phase <= 4;
  const criteria = phase >= 3;
  const filtered = phase >= 4;
  const selectedCount = Math.max(0, Math.min(phase - 4, 4));
  const bar = phase >= 9 && phase <= 12;
  const drawer = phase >= 10 && phase <= 12;
  const drawerSent = phase >= 12;
  const success = phase === 13;
  const sentCount = phase >= 14 ? Math.min(phase - 13, 4) : 0;
  const replied = phase >= 18;

  /* cursor is anchored to real controls via refs, never guessed coordinates */
  const rootRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLSpanElement | null>(null);
  const applyRef = useRef<HTMLDivElement | null>(null);
  const campaignRef = useRef<HTMLSpanElement | null>(null);
  const drawerSendRef = useRef<HTMLDivElement | null>(null);

  const target: "filter" | "apply" | "campaign" | "drawerSend" | null =
    phase >= 1 && phase <= 2
      ? "filter"
      : phase >= 3 && phase <= 4
        ? "apply"
        : phase === 9 || phase === 10
          ? "campaign"
          : phase === 11 || phase === 12
            ? "drawerSend"
            : null;

  const press =
    (target === "filter" && phase === 2) ||
    (target === "apply" && phase === 4) ||
    (target === "campaign" && phase === 10) ||
    (target === "drawerSend" && phase === 12);

  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (reduced || !target) {
      setPoint(null);
      return;
    }
    const measure = () => {
      const root = rootRef.current;
      const el =
        target === "filter"
          ? filterRef.current
          : target === "apply"
            ? applyRef.current
            : target === "campaign"
              ? campaignRef.current
              : drawerSendRef.current;
      if (!root || !el) return;
      const r = root.getBoundingClientRect();
      const b = el.getBoundingClientRect();
      setPoint({
        x: b.left - r.left + b.width * 0.55,
        y: b.top - r.top + b.height * 0.6,
      });
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [target, phase, reduced]);

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
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
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
            <span
              ref={filterRef}
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
        <div
          className={cn(
            "relative mt-auto",
            replied || sentCount > 0 || success ? "h-0" : "h-[46px]",
          )}
        >
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
                <span
                  ref={campaignRef}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-zapla-blue px-3 py-1.5 text-[11.5px] font-semibold text-white"
                >
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
              ref={applyRef}
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
              comeback offer this month. Reply YES and we&rsquo;ll send you the details and
              available times.
            </div>

            <div ref={drawerSendRef} className="mt-auto">
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

      <CampaignSentCard show={success} reduced={reduced} />

      <ArrowCursor point={point} press={press} reduced={reduced} />
    </div>
  );
}

export { SceneOpportunities } from "./scene-opportunities";

export { SceneInbox } from "./scene-inbox";

export { SceneAutomations } from "./scene-automations";
