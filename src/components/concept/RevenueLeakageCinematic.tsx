/* Concept V4 prototype: "The future that never loaded — cinematic product world."
   Isolated to /concept/revenue-leakage-cinematic.
   All people, businesses and numbers are fictional.
   Zero floating cards: one full-bleed product environment owns the stage at a time. */
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import {
  CalendarDays,
  Check,
  Inbox as InboxIcon,
  MessageSquare,
  Search,
  Star,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { FACE } from "@/components/v5/faces";
import { useIsMobile } from "@/hooks/use-mobile";

const SARAH = FACE.sophie;
const CYAN = "#06B6D4";

/* ------------------------------------------------------------------ */
/* scroll plumbing                                                     */
/* ------------------------------------------------------------------ */

function usePinProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const progress = useMotionValue(0);
  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) progress.set(Math.min(Math.max(-rect.top / total, 0), 1));
      }
      raf = requestAnimationFrame(read);
    };
    raf = requestAnimationFrame(read);
    return () => cancelAnimationFrame(raf);
  }, [ref, progress]);
  return progress;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
/* shared product chrome (rebuilt locally, edge-to-edge, no shell)     */
/* ------------------------------------------------------------------ */

const RAIL = [
  { icon: InboxIcon, key: "inbox" },
  { icon: Users, key: "contacts" },
  { icon: Workflow, key: "pipeline" },
  { icon: CalendarDays, key: "calendar" },
  { icon: Wallet, key: "billing" },
  { icon: Star, key: "reviews" },
] as const;

function Rail({ active }: { active: string }) {
  return (
    <div className="flex h-full w-[68px] shrink-0 flex-col items-center gap-1 border-r border-slate-200/80 bg-white/70 py-6">
      <div
        className="mb-5 flex h-8 w-8 items-center justify-center rounded-[10px] text-[13px] font-black text-white"
        style={{ background: "#0f172a" }}
      >
        Z
      </div>
      {RAIL.map(({ icon: Icon, key }) => (
        <div
          key={key}
          className="flex h-10 w-10 items-center justify-center rounded-[11px]"
          style={
            active === key
              ? { background: "rgba(6,182,212,0.10)", color: CYAN }
              : { color: "#cbd5e1" }
          }
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2.1} />
        </div>
      ))}
      <div className="mt-auto">
        <img src={FACE.alex} alt="" aria-hidden className="h-8 w-8 rounded-full object-cover" />
      </div>
    </div>
  );
}

function EnvHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex h-[62px] shrink-0 items-center gap-4 border-b border-slate-200/80 px-8">
      <h3 className="font-zapla text-[20px] font-extrabold tracking-[-0.02em] text-slate-900">
        {title}
      </h3>
      {meta ? (
        <span className="text-[12px] font-semibold uppercase tracking-[0.09em] text-slate-400">
          {meta}
        </span>
      ) : null}
      <div className="ml-auto flex h-9 w-[240px] items-center gap-2 rounded-[10px] border border-slate-200 px-3 text-[12px] font-medium text-slate-400">
        <Search className="h-3.5 w-3.5" />
        Search
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ENVIRONMENT 1 — UNIFIED INBOX (full height, bleeds off right/bottom) */
/* ------------------------------------------------------------------ */

const THREADS = [
  { name: "Sarah Chen", face: FACE.sophie, txt: "Hi, do you have any availability…", t: "10:14", ch: "SMS" },
  { name: "Daniel Okafor", face: FACE.daniel, txt: "Thanks, that time works for us.", t: "9:52", ch: "Email" },
  { name: "Priya Nair", face: FACE.priya, txt: "Can you send the quote through?", t: "9:31", ch: "Instagram" },
  { name: "Tom Whitfield", face: FACE.tom, txt: "Booked in for next Tuesday 👍", t: "Yest", ch: "SMS" },
  { name: "Maya Chen", face: FACE.maya, txt: "Is the deposit refundable?", t: "Yest", ch: "Facebook" },
  { name: "Leo Martins", face: FACE.leo, txt: "Great work on Friday, thank you.", t: "Mon", ch: "Email" },
];

function InboxEnv({
  quiet,
  nextActionFocus,
  listWidth,
}: {
  quiet: number;
  nextActionFocus: number;
  listWidth?: MotionValue<number>;
}) {
  const fallbackWidth = useMotionValue(300);
  const w = listWidth ?? fallbackWidth;
  const listOpacity = useTransform(w, [0, 120, 300], [0, 0.2, 1]);

  return (
    <div className="flex h-full w-full bg-[#FBFCFE]">
      <Rail active="inbox" />
      <div className="flex min-w-0 flex-1 flex-col">
        <EnvHeader title="Unified Inbox" meta="All channels" />
        <div className="flex min-h-0 flex-1">
          {/* thread list */}
          <motion.div
            className="shrink-0 overflow-hidden border-r border-slate-200/80"
            style={{ width: w, opacity: useTransform(listOpacity, (o) => o * (1 - quiet * 0.55)) }}
          >
            {THREADS.map((t, i) => (
              <div
                key={t.name}
                className="flex items-center gap-3 border-b border-slate-100 px-5 py-[14px]"
                style={
                  i === 0
                    ? { background: "rgba(6,182,212,0.06)", boxShadow: `inset 3px 0 0 ${CYAN}` }
                    : { opacity: 1 - quiet * 0.5 }
                }
              >
                <img src={t.face} alt="" aria-hidden className="h-9 w-9 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="truncate text-[13.5px] font-bold text-slate-900">{t.name}</span>
                    <span className="ml-auto text-[10.5px] font-semibold text-slate-400">{t.t}</span>
                  </div>
                  <div className="truncate text-[12px] font-medium text-slate-500">{t.txt}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* conversation */}
          <div className="flex min-w-0 flex-1 flex-col px-9 pt-7">
            <div className="flex items-center gap-3.5">
              <img src={SARAH} alt="" aria-hidden className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="font-zapla text-[22px] font-extrabold tracking-[-0.02em] text-slate-900">
                  Sarah Chen
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-400">
                  <MessageSquare className="h-3.5 w-3.5" />
                  New enquiry · SMS · 10:14 AM
                </div>
              </div>
            </div>

            <div className="mt-7 max-w-[430px] rounded-[16px] rounded-tl-[5px] border border-slate-200 bg-white px-5 py-4 text-[15px] font-medium leading-relaxed text-slate-800">
              Hi, do you have any availability this week?
            </div>
            <div
              className="mt-3 text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: CYAN, opacity: 1 - quiet }}
            >
              Delivered · 10:14 AM
            </div>

            <div className="mt-auto h-16 shrink-0" />
          </div>

          {/* customer context */}
          <div className="w-[320px] shrink-0 border-l border-slate-200/80 px-7 pt-7">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Customer
            </div>
            <div className="mt-4 space-y-5">
              <ContextRow label="Owner" value="Unassigned" muted />
              <ContextRow label="Last activity" value="SMS · Just now" />
              <motion.div
                style={{
                  scale: 1 + nextActionFocus * 0.22,
                  originX: 0,
                  originY: 0.5,
                }}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  Next action
                </div>
                <motion.div
                  className="mt-1 font-zapla font-extrabold leading-none text-slate-900"
                  style={{ fontSize: 26 + nextActionFocus * 14 }}
                >
                  —
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextRow({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </div>
      <div className={`mt-1 text-[14px] font-bold ${muted ? "text-slate-400" : "text-slate-800"}`}>
        {value}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ENVIRONMENT 2 — SALES PIPELINE (full bleed, hard crop both edges)   */
/* ------------------------------------------------------------------ */

const COLUMNS = [
  { name: "New", total: "A$1,900", rows: [{ n: "Harriet Vale", v: "A$900" }, { n: "Jono Reid", v: "A$1,000" }] },
  { name: "Contacted", total: "A$2,400", rows: [{ n: "Ali Rahman", v: "A$2,400" }] },
  { name: "Qualified", total: "A$3,850", rows: [] as { n: string; v: string }[] },
  { name: "Proposal", total: "A$5,200", rows: [{ n: "Bec Turner", v: "A$5,200" }] },
  { name: "Won", total: "A$8,600", rows: [{ n: "Tom Whitfield", v: "A$4,300" }, { n: "Leo Martins", v: "A$4,300" }] },
];

function PipelineEnv({ unload }: { unload: MotionValue<number> }) {
  const x = useTransform(unload, [0, 1], [0, -420]);
  const opacity = useTransform(unload, [0, 0.75], [1, 0]);
  return (
    <div className="flex h-full w-full bg-[#FBFCFE]">
      <Rail active="pipeline" />
      <div className="flex min-w-0 flex-1 flex-col">
        <EnvHeader title="Sales Pipeline" meta="Open value A$21,950" />
        <div className="flex min-h-0 flex-1 gap-5 px-8 pt-7">
          {COLUMNS.map((c) => {
            const qualified = c.name === "Qualified";
            return (
              <div key={c.name} className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-baseline gap-2 pb-3">
                  <span className="text-[12.5px] font-extrabold uppercase tracking-[0.07em] text-slate-500">
                    {c.name}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-400">{c.total}</span>
                </div>
                <div
                  className="flex-1 rounded-t-[14px] border-x border-t px-3 pt-3"
                  style={{
                    borderColor: qualified ? "rgba(6,182,212,0.35)" : "#e7ebf1",
                    background: qualified ? "rgba(6,182,212,0.05)" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {qualified ? (
                    <motion.div
                      style={{ x, opacity }}
                      className="mb-2.5 rounded-[12px] border border-slate-200 bg-white px-3.5 py-3 shadow-[0_10px_26px_-22px_rgba(15,23,42,.5)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={SARAH} alt="" aria-hidden className="h-8 w-8 rounded-full object-cover" />
                        <div className="min-w-0">
                          <div className="truncate text-[13.5px] font-extrabold text-slate-900">
                            Sarah Chen
                          </div>
                          <div className="text-[11px] font-semibold text-slate-400">SMS enquiry</div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-zapla text-[19px] font-extrabold tracking-[-0.02em] text-slate-900">
                          A$450
                        </span>
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.06em]"
                          style={{ background: "rgba(6,182,212,0.12)", color: "#0e7490" }}
                        >
                          Qualified
                        </span>
                      </div>
                    </motion.div>
                  ) : null}
                  {c.rows.map((r) => (
                    <div
                      key={r.n}
                      className="mb-2.5 rounded-[12px] border border-slate-200/80 bg-white px-3.5 py-3"
                    >
                      <div className="text-[13px] font-bold text-slate-700">{r.n}</div>
                      <div className="mt-1.5 text-[15px] font-extrabold text-slate-500">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ENVIRONMENT 3 — CALENDAR                                            */
/* ------------------------------------------------------------------ */

const DAYS = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
const HOURS = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];

function CalendarEnv({ unload }: { unload: MotionValue<number> }) {
  const clip = useTransform(unload, [0, 1], ["inset(0% 0% 0% 0%)", "inset(0% 100% 0% 0%)"]);
  const bg = useTransform(
    unload,
    [0, 0.85],
    ["rgba(6,182,212,0.10)", "rgba(6,182,212,0.0)"],
  );
  return (
    <div className="flex h-full w-full bg-[#FBFCFE]">
      <Rail active="calendar" />
      <div className="flex min-w-0 flex-1 flex-col">
        <EnvHeader title="Calendar" meta="This week" />
        <div className="flex min-h-0 flex-1 flex-col px-8 pt-6">
          <div className="flex pl-[64px]">
            {DAYS.map((d) => (
              <div
                key={d}
                className="flex-1 pb-2 text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-slate-500"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="flex min-h-0 flex-1 border-t border-slate-200">
            <div className="w-[64px] shrink-0">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="flex h-[52px] items-start pt-1 text-[11px] font-semibold text-slate-400"
                >
                  {h}
                </div>
              ))}
            </div>
            {DAYS.map((d) => (
              <div key={d} className="relative flex-1 border-l border-slate-200/80">
                {HOURS.map((h) => (
                  <div key={h} className="h-[52px] border-b border-slate-100" />
                ))}
                {d === "Wed 14" ? (
                  <div className="absolute left-1.5 right-1.5 top-[52px] h-[48px] rounded-[9px] border border-slate-200 bg-white px-2.5 py-1.5">
                    <div className="text-[11px] font-bold text-slate-500">Site visit</div>
                    <div className="text-[10.5px] font-semibold text-slate-400">Ali Rahman</div>
                  </div>
                ) : null}
                {d === "Thu 15" ? (
                  <motion.div
                    className="absolute left-1.5 right-1.5 top-[312px] h-[92px] overflow-hidden rounded-[10px] px-3 py-2.5"
                    style={{
                      background: bg,
                      border: "1px solid rgba(6,182,212,0.4)",
                    }}
                  >
                    <motion.div style={{ clipPath: clip }}>
                      <div
                        className="text-[12px] font-black uppercase tracking-[0.07em]"
                        style={{ color: "#0e7490" }}
                      >
                        Thu · 3:00 PM
                      </div>
                      <div className="mt-1.5 font-zapla text-[16px] font-extrabold tracking-[-0.02em] text-slate-900">
                        Sarah Chen
                      </div>
                      <div className="mt-0.5 text-[11.5px] font-semibold text-slate-500">
                        Consultation · 45 min
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ENVIRONMENT 4 — PAYMENT / INVOICE                                   */
/* ------------------------------------------------------------------ */

function PaymentEnv({ unload }: { unload: MotionValue<number> }) {
  const textOp = useTransform(unload, [0, 0.6], [1, 0]);
  const paidOp = useTransform(unload, [0, 0.35], [1, 0]);
  const lineW = useTransform(unload, [0.15, 1], ["0%", "100%"]);
  return (
    <div className="flex h-full w-full bg-[#FBFCFE]">
      <Rail active="billing" />
      <div className="flex min-w-0 flex-1 flex-col">
        <EnvHeader title="Invoice INV-1042" meta="Sarah Chen" />
        <div className="flex min-h-0 flex-1">
          <div className="flex min-w-0 flex-1 flex-col px-14 pt-12">
            <div className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Amount due
            </div>
            <div className="relative mt-3 w-fit">
              <motion.div
                className="font-zapla text-[96px] font-extrabold leading-none tracking-[-0.045em] text-slate-900"
                style={{ opacity: textOp }}
              >
                A$450.00
              </motion.div>
              <motion.div
                className="absolute bottom-3 left-0 h-[2px] bg-slate-200"
                style={{ width: lineW }}
              />
            </div>
            <motion.div
              className="mt-7 flex w-fit items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "#10b981", opacity: paidOp }}
            >
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
              <span className="text-[13px] font-black uppercase tracking-[0.08em] text-white">
                Paid
              </span>
            </motion.div>

            <div className="mt-12 max-w-[560px] border-t border-slate-200 pt-6">
              {[
                ["Consultation · 45 min", "A$150.00"],
                ["Service call-out", "A$300.00"],
              ].map(([l, v]) => (
                <div key={l} className="flex items-baseline justify-between py-3">
                  <span className="text-[14px] font-semibold text-slate-600">{l}</span>
                  <motion.span
                    className="text-[15px] font-extrabold text-slate-800"
                    style={{ opacity: textOp }}
                  >
                    {v}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[340px] shrink-0 border-l border-slate-200/80 px-8 pt-12">
            <div className="flex items-center gap-3">
              <img src={SARAH} alt="" aria-hidden className="h-11 w-11 rounded-full object-cover" />
              <div>
                <div className="text-[15px] font-extrabold text-slate-900">Sarah Chen</div>
                <div className="text-[12px] font-semibold text-slate-400">Billed via SMS link</div>
              </div>
            </div>
            <motion.div
              className="mt-8 text-[12.5px] font-semibold leading-relaxed text-slate-500"
              style={{ opacity: textOp }}
            >
              Payment received Thu 15 Aug, 4:02 PM
              <br />
              Card · Visa ending 4417
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ENVIRONMENT 5 — REVIEW AUTOMATION                                   */
/* ------------------------------------------------------------------ */

function ReviewEnv({ unload }: { unload: MotionValue<number> }) {
  const triggerOp = useTransform(unload, [0, 0.45], [1, 0]);
  const bodyOp = useTransform(unload, [0.2, 0.9], [1, 0]);
  const bodyClip = useTransform(
    unload,
    [0.2, 1],
    ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
  );
  return (
    <div className="flex h-full w-full bg-[#FBFCFE]">
      <Rail active="reviews" />
      <div className="flex min-w-0 flex-1 flex-col">
        <EnvHeader title="Automation · After the job" meta="Active" />
        <div className="flex min-h-0 flex-1 flex-col px-14 pt-10">
          <motion.div className="flex items-center gap-4" style={{ opacity: triggerOp }}>
            <span
              className="rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.08em]"
              style={{ background: "rgba(6,182,212,0.12)", color: "#0e7490" }}
            >
              Trigger
            </span>
            <span className="font-zapla text-[22px] font-extrabold tracking-[-0.02em] text-slate-900">
              Invoice paid
            </span>
          </motion.div>

          <motion.div style={{ opacity: bodyOp, clipPath: bodyClip }} className="mt-8 max-w-[720px]">
            <div className="border-t border-slate-200 pt-6">
              <div className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Then
              </div>
              <div className="mt-3 font-zapla text-[42px] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-900">
                Ask Sarah for a Google review
              </div>
              <div className="mt-5 max-w-[470px] rounded-[16px] rounded-tl-[5px] border border-slate-200 bg-white px-5 py-4 text-[14.5px] font-medium leading-relaxed text-slate-700">
                Hi Sarah, thanks again for having us out on Thursday. Would you mind leaving a quick
                Google review? It really helps.
              </div>
              <div className="mt-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-slate-400">
                <Star className="h-4 w-4" style={{ color: CYAN }} />
                Sent 24 hours after payment
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* editorial layers                                                    */
/* ------------------------------------------------------------------ */

function Eyebrow() {
  return (
    <div className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: CYAN }}>
      Where revenue leaks
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* desktop story                                                       */
/* ------------------------------------------------------------------ */

function key(p: MotionValue<number>, input: number[], output: (number | string)[]) {
  return useTransform(p, input, output as number[]);
}

function DesktopStory({ p }: { p: MotionValue<number> }) {
  /* environment windows — stack unwinds naturally on erasure */
  const inboxOpacity = key(p, [0, 0.01, 0.20, 0.235, 0.875, 0.90, 1], [1, 1, 1, 0, 0, 1, 1]);
  const inboxScale = key(p, [0, 0.12, 0.20, 0.875, 1], [1, 1, 1.1, 1.04, 1]);
  const inboxX = key(p, [0, 0.11, 0.20], [-0.256, -0.256, 0]);
  const inboxClip = key(p, [0, 0.11, 0.20], [0.41, 0.41, 0]);

  const pipeOp = key(p, [0.185, 0.215, 0.325, 0.35, 0.80, 0.825, 0.875, 0.89], [0, 1, 1, 0, 0, 1, 1, 0]);
  const calOp = key(p, [0.315, 0.345, 0.44, 0.465, 0.745, 0.77, 0.815, 0.83], [0, 1, 1, 0, 0, 1, 1, 0]);
  const payOp = key(p, [0.43, 0.46, 0.545, 0.565, 0.695, 0.715, 0.765, 0.78], [0, 1, 1, 0, 0, 1, 1, 0]);
  const revOp = key(p, [0.535, 0.565, 0.715, 0.73], [0, 1, 1, 0]);

  const pipeScale = key(p, [0.185, 0.24, 0.325], [1.08, 1, 1.02]);
  const calScale = key(p, [0.315, 0.37, 0.44], [1.07, 1, 1.02]);
  const payScale = key(p, [0.43, 0.49, 0.545], [1.06, 1, 1.02]);
  const revScale = key(p, [0.535, 0.60, 0.715], [1.06, 1, 1.01]);

  /* unload progressions (only meaningful on the erasure pass) */
  const revUnload = key(p, [0.655, 0.72], [0, 1]);
  const payUnload = key(p, [0.715, 0.775], [0, 1]);
  const calUnload = key(p, [0.775, 0.828], [0, 1]);
  const pipeUnload = key(p, [0.828, 0.885], [0, 1]);

  /* inbox states */
  const quiet = key(p, [0.88, 0.93, 0.985], [0, 1, 0.35]);
  const nextFocus = key(p, [0.90, 0.945, 0.985], [0, 1, 0.3]);

  /* editorial copy layers */
  const h1Op = key(p, [0, 0.115, 0.15], [1, 1, 0]);
  const h1X = key(p, [0, 0.15], [0, -70]);

  const peakOp = key(p, [0.585, 0.615, 0.655, 0.675], [0, 1, 1, 0]);
  const erase1 = key(p, [0.70, 0.725, 0.79, 0.815], [0, 1, 1, 0]);
  const erase2 = key(p, [0.82, 0.845, 0.885, 0.905], [0, 1, 1, 0]);
  const finalOp = key(p, [0.925, 0.95, 0.975, 0.985], [0, 1, 1, 0]);
  const handoffOp = key(p, [0.975, 0.995], [0, 1]);
  const scrim = key(p, [0.575, 0.615, 0.905, 0.93], [0, 0.72, 0.72, 0]);
  const scrim2 = key(p, [0.92, 0.95, 0.985, 1], [0, 0.78, 0.78, 0.5]);

  return (
    <div className="absolute inset-x-0 bottom-0 top-[66px] overflow-hidden bg-[#F7F9FC]">
      {/* stage: inbox environment inside a camera crop that opens to full bleed */}
      <motion.div
        className="absolute inset-y-0 right-0 overflow-hidden"
        style={{
          opacity: inboxOpacity,
          left: useTransform(inboxClip, (v) => `${v * 100}%`),
          zIndex: 10,
        }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-screen"
          style={{
            x: useTransform(inboxX, (v) => `${v * 100}vw`),
            scale: inboxScale,
            originX: 0.4,
            originY: 0.4,
          }}
        >
          <InboxEnv quiet={0} nextActionFocus={0} />
        </motion.div>
      </motion.div>

      {/* second inbox instance for the quiet return (keeps state clean) */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: key(p, [0.875, 0.90, 1], [0, 1, 1]), zIndex: 12 }}
      >
        <QuietInbox quiet={quiet} focus={nextFocus} />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ opacity: pipeOp, scale: pipeScale, zIndex: 20 }}>
        <PipelineEnv unload={pipeUnload} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: calOp, scale: calScale, zIndex: 30 }}>
        <CalendarEnv unload={calUnload} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: payOp, scale: payScale, zIndex: 40 }}>
        <PaymentEnv unload={payUnload} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ opacity: revOp, scale: revScale, zIndex: 50 }}>
        <ReviewEnv unload={revUnload} />
      </motion.div>

      {/* Beat 1 editorial — left column, inbox owns the right of the viewport */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 z-[60] flex w-[41%] flex-col justify-center bg-[#F7F9FC] pl-[6vw] pr-8"
        style={{ opacity: h1Op, x: h1X }}
      >
        <Eyebrow />
        <h2 className="mt-5 font-zapla text-[56px] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#0a0f1c]">
          Customers don’t
          <br />
          always say no.
        </h2>
        <p className="mt-6 max-w-[400px] text-[16px] font-medium leading-relaxed text-slate-500">
          An enquiry arrives with intent. What matters is everything that was supposed to happen
          after it.
        </p>
      </motion.div>


      {/* scrims for editorial overlays */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[64] bg-[#F7F9FC]"
        style={{ opacity: scrim }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-[66] bg-[#F7F9FC]"
        style={{ opacity: scrim2 }}
      />

      <Overlay opacity={peakOp} z={70}>
        <h2 className="font-zapla text-[62px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#0a0f1c]">
          This is what should
          <br />
          have happened next.
        </h2>
      </Overlay>

      <Overlay opacity={erase1} z={71}>
        <h2 className="font-zapla text-[62px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#0a0f1c]">
          Sometimes nobody
          <br />
          followed through.
        </h2>
      </Overlay>

      <Overlay opacity={erase2} z={72}>
        <h2 className="font-zapla text-[58px] font-extrabold leading-[1.08] tracking-[-0.045em] text-[#0a0f1c]">
          That wasn’t a “no.”
        </h2>
        <p className="mt-4 font-zapla text-[40px] font-semibold leading-[1.15] tracking-[-0.03em] text-slate-400">
          It was a future that never loaded.
        </p>
      </Overlay>

      <Overlay opacity={finalOp} z={73}>
        <h2 className="font-zapla text-[68px] font-extrabold leading-[1.03] tracking-[-0.05em] text-[#0a0f1c]">
          The expensive part is
          <br />
          what never happened.
        </h2>
        <p className="mt-6 text-[17px] font-medium text-slate-500">
          The enquiry survived. The next action didn’t.
        </p>
      </Overlay>

      <Overlay opacity={handoffOp} z={74}>
        <h2 className="font-zapla text-[60px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#0a0f1c]">
          One customer.
          <br />
          Everything connected.
        </h2>
      </Overlay>
    </div>
  );
}

function Overlay({
  opacity,
  z,
  children,
}: {
  opacity: MotionValue<number>;
  z: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex flex-col justify-center px-[9vw]"
      style={{ opacity, zIndex: z }}
    >
      {children}
    </motion.div>
  );
}

/* quiet-return inbox: same environment, emptier composition */
function QuietInbox({ quiet, focus }: { quiet: MotionValue<number>; focus: MotionValue<number> }) {
  const [q, setQ] = useState(0);
  const [f, setF] = useState(0);
  useEffect(() => {
    const a = quiet.on("change", setQ);
    const b = focus.on("change", setF);
    setQ(quiet.get());
    setF(focus.get());
    return () => {
      a();
      b();
    };
  }, [quiet, focus]);
  return <InboxEnv quiet={q} nextActionFocus={f} />;
}

/* ------------------------------------------------------------------ */
/* mobile story — full-width environments, short interludes            */
/* ------------------------------------------------------------------ */

function MobileInterlude({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
}) {
  return (
    <div className="px-6 py-16">
      {eyebrow ? (
        <div className="text-[10.5px] font-black uppercase tracking-[0.22em]" style={{ color: CYAN }}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-4 font-zapla text-[34px] font-extrabold leading-[1.08] tracking-[-0.04em] text-[#0a0f1c]">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 text-[15px] font-medium leading-relaxed text-slate-500">{body}</p>
      ) : null}
    </div>
  );
}

function MobileEnv({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[520px] w-full overflow-hidden border-y border-slate-200 bg-[#FBFCFE]">
      <div
        className="h-[900px] w-[1440px]"
        style={{ transform: "scale(0.46)", transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

function MobileStory() {
  const zero = useMotionValue(0);
  const one = useMotionValue(1);
  return (
    <div className="bg-[#F7F9FC]">
      <MobileInterlude
        eyebrow="Where revenue leaks"
        title={<>Customers don’t always say no.</>}
        body="An enquiry arrives with intent. What matters is everything that was supposed to happen after it."
      />
      <MobileEnv>
        <InboxEnv quiet={0} nextActionFocus={0} />
      </MobileEnv>
      <MobileInterlude title={<>This is what should have happened next.</>} />
      <MobileEnv>
        <PipelineEnv unload={zero} />
      </MobileEnv>
      <MobileEnv>
        <CalendarEnv unload={zero} />
      </MobileEnv>
      <MobileEnv>
        <PaymentEnv unload={zero} />
      </MobileEnv>
      <MobileEnv>
        <ReviewEnv unload={zero} />
      </MobileEnv>
      <MobileInterlude
        title={
          <>
            Sometimes nobody
            <br />
            followed through.
          </>
        }
        body="That wasn’t a “no.” It was a future that never loaded."
      />
      <MobileEnv>
        <ReviewEnv unload={one} />
      </MobileEnv>
      <MobileEnv>
        <PipelineEnv unload={one} />
      </MobileEnv>
      <MobileInterlude
        title={<>The expensive part is what never happened.</>}
        body="The enquiry survived. The next action didn’t."
      />
      <MobileEnv>
        <QuietMobileInbox />
      </MobileEnv>
      <MobileInterlude title={<>One customer. Everything connected.</>} />
    </div>
  );
}

function QuietMobileInbox() {
  return <InboxEnv quiet={0.85} nextActionFocus={1} />;
}

/* ------------------------------------------------------------------ */
/* static fallback                                                     */
/* ------------------------------------------------------------------ */

function StaticFallback() {
  return (
    <div className="bg-[#F7F9FC]">
      <div className="px-[9vw] py-24">
        <Eyebrow />
        <h2 className="mt-5 max-w-[900px] font-zapla text-[54px] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#0a0f1c]">
          The expensive part is what never happened.
        </h2>
        <p className="mt-5 text-[17px] font-medium text-slate-500">
          The enquiry survived. The next action didn’t.
        </p>
      </div>
      <div className="h-[900px] w-full overflow-hidden border-y border-slate-200">
        <InboxEnv quiet={0.7} nextActionFocus={1} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function RevenueLeakageCinematic() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const p = usePinProgress(wrapRef);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduced) return <StaticFallback />;
  if (isMobile) return <MobileStory />;

  return (
    <div ref={wrapRef} className="relative h-[500vh] w-full bg-[#F7F9FC]">
      <div className="sticky top-0 h-screen w-full overflow-hidden pt-[66px]">
        <DesktopStory p={p} />
      </div>
    </div>
  );
}
