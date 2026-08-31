import { useState } from "react";
import { useReducedMotion, motion, AnimatePresence } from "motion/react";
import { Inbox, Users, KanbanSquare, CalendarDays, Check, Send, Clock3 } from "lucide-react";
import { useSceneClock } from "@/components/v5/use-scene-clock";
import { FACE } from "@/components/v5/faces";
import { cn } from "@/lib/utils";

/* v6-only Section 4. Fictional demo data: Sarah Nguyen is not a real customer. */

const DISPLAY = '"Inter Tight", "Outfit", "Manrope", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
const EASE = [0.16, 1, 0.3, 1] as const;

/* 0 composed · 1 enquiry · 2 contact+reply · 3 time passes · 4 auto follow-up
   5 she replies · 6 pipeline · 7 booking · 8 resolution hold */
const PHASES = [1100, 1300, 1500, 1100, 1400, 1400, 1200, 1500, 2600];

type Focus = "inbox" | "contacts" | "pipeline" | "calendar";

function focusFor(phase: number): Focus {
  if (phase <= 1) return "inbox";
  if (phase === 2) return "contacts";
  if (phase <= 5) return "inbox";
  if (phase === 6) return "pipeline";
  return "calendar";
}

const RAIL: Array<{ key: Focus; icon: typeof Inbox; label: string }> = [
  { key: "inbox", icon: Inbox, label: "Inbox" },
  { key: "contacts", icon: Users, label: "Contacts" },
  { key: "pipeline", icon: KanbanSquare, label: "Pipeline" },
  { key: "calendar", icon: CalendarDays, label: "Calendar" },
];

const ACTIVITY: Array<{ at: number; label: string; meta: string }> = [
  { at: 2, label: "Contact created: Sarah Nguyen", meta: "Website enquiry" },
  { at: 2, label: "Lead tagged: New enquiry", meta: "Auto" },
  { at: 2, label: "Owner assigned: James", meta: "Auto" },
  { at: 4, label: "Follow-up sent automatically", meta: "Day 2 · no reply" },
  { at: 5, label: "Status changed: Qualified", meta: "Reply received" },
  { at: 7, label: "Appointment booked", meta: "Tue · 2:30 PM" },
  { at: 7, label: "Confirmation sent", meta: "SMS + email" },
];

type Msg = { at: number; from: "them" | "us"; text: string; stamp: string; auto?: boolean };

const THREAD: Msg[] = [
  { at: 1, from: "them", text: "Hi, I'm interested in getting a quote.", stamp: "Mon 9:12 AM" },
  { at: 2, from: "us", text: "Thanks Sarah, happy to help. What suburb are you in and when suits for a look?", stamp: "Mon 9:12 AM" },
  { at: 4, from: "us", text: "Just following up on your quote request, Sarah. Would tomorrow afternoon work for a quick call?", stamp: "Wed 8:30 AM", auto: true },
  { at: 5, from: "them", text: "Yep, tomorrow afternoon works.", stamp: "Wed 8:41 AM" },
];

function Panel({
  active,
  className,
  children,
}: {
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl border bg-white transition-[border-color,box-shadow,opacity] duration-500",
        active
          ? "border-cyan-300/70 opacity-100 shadow-[0_1px_0_rgba(15,23,42,.04),0_12px_28px_-18px_rgba(15,23,42,.28)]"
          : "border-slate-200/80 opacity-[0.72]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const them = msg.from === "them";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn("flex w-full gap-2.5", them ? "justify-start" : "justify-end")}
    >
      {them && <img src={FACE.priya} alt="" className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover" />}
      <div className={cn("max-w-[78%]", them ? "" : "text-right")}>
        <div
          className={cn(
            "rounded-lg px-3 py-2 text-[12.5px] leading-[1.5]",
            them ? "bg-slate-100 text-slate-800" : "bg-slate-900 text-white",
          )}
        >
          {msg.text}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[9.5px] text-slate-400" style={{ fontFamily: MONO }}>
          {!them && msg.auto && (
            <span className="rounded-sm bg-cyan-50 px-1 py-[1px] font-medium text-cyan-700">AUTOMATED</span>
          )}
          <span>{msg.stamp}</span>
        </div>
      </div>
    </motion.div>
  );
}

function ProductSurface({ phase }: { phase: number }) {
  const focus = focusFor(phase);
  const msgs = THREAD.filter((m) => phase >= m.at);
  const events = ACTIVITY.filter((e) => phase >= e.at);
  const qualified = phase >= 5;
  const booked = phase >= 7;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#FBFCFD] shadow-[0_1px_0_rgba(15,23,42,.04),0_28px_60px_-38px_rgba(15,23,42,.35)]">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-slate-200/80 bg-white px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400" style={{ fontFamily: MONO }}>
          Zapla workspace
        </div>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-slate-400" style={{ fontFamily: MONO }}>
          <Clock3 className="h-3 w-3" />
          {phase >= 4 ? "Wed" : "Mon"}
        </div>
      </div>

      <div className="flex">
        {/* icon rail */}
        <div className="hidden w-[54px] shrink-0 flex-col items-center gap-1.5 border-r border-slate-200/80 bg-white py-4 sm:flex">
          {RAIL.map(({ key, icon: Icon, label }) => (
            <div
              key={key}
              title={label}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-400",
                focus === key ? "bg-cyan-50 text-cyan-700" : "text-slate-300",
              )}
            >
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.9} />
            </div>
          ))}
          <img src={FACE.alex} alt="" className="mt-auto h-7 w-7 rounded-full object-cover" />
        </div>

        {/* main */}
        <div className="grid min-w-0 flex-1 gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* conversation */}
          <Panel active={focus === "inbox"} className="flex min-h-[318px] flex-col">
            <div className="flex items-center gap-2.5 border-b border-slate-200/70 px-3.5 py-3">
              <img src={FACE.priya} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-slate-900">Sarah Nguyen</div>
                <div className="text-[10px] text-slate-400" style={{ fontFamily: MONO }}>
                  Website enquiry · Owner {phase >= 2 ? "James" : "unassigned"}
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                {phase >= 2 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-full bg-slate-100 px-2 py-[3px] text-[9.5px] font-medium text-slate-600"
                    style={{ fontFamily: MONO }}
                  >
                    NEW ENQUIRY
                  </motion.span>
                )}
                {qualified && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="rounded-full bg-cyan-50 px-2 py-[3px] text-[9.5px] font-medium text-cyan-700"
                    style={{ fontFamily: MONO }}
                  >
                    QUALIFIED
                  </motion.span>
                )}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-3 px-3.5 py-3.5">
              {phase === 0 && (
                <div className="text-center text-[11.5px] text-slate-400">A new enquiry is about to arrive.</div>
              )}
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <Bubble key={`${m.at}-${m.text}`} msg={m} />
                ))}
              </AnimatePresence>
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="self-center rounded-full bg-slate-100 px-2.5 py-1 text-[9.5px] text-slate-500"
                  style={{ fontFamily: MONO }}
                >
                  2 DAYS · NO REPLY
                </motion.div>
              )}
            </div>
          </Panel>

          {/* right column: activity → pipeline → booking */}
          <div className="flex min-w-0 flex-col gap-3">
            <Panel active={phase >= 2 && phase <= 5} className="px-3.5 py-3">
              <div className="text-[9.5px] uppercase tracking-[0.16em] text-slate-400" style={{ fontFamily: MONO }}>
                System activity
              </div>
              <div className="mt-2.5 flex flex-col gap-2">
                {events.length === 0 && (
                  <div className="text-[11px] text-slate-400">Waiting on the first enquiry.</div>
                )}
                <AnimatePresence initial={false}>
                  {events.map((e) => (
                    <motion.div
                      key={e.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="flex items-start gap-2"
                    >
                      <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-[11.5px] font-medium text-slate-800">{e.label}</div>
                        <div className="text-[9px] uppercase tracking-[0.1em] text-slate-400" style={{ fontFamily: MONO }}>
                          {e.meta}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Panel>

            <Panel active={phase === 6} className="px-3.5 py-3">
              <div className="text-[9.5px] uppercase tracking-[0.16em] text-slate-400" style={{ fontFamily: MONO }}>
                Pipeline
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {(["New lead", "Qualified"] as const).map((col, i) => {
                  const here = (i === 0 && phase < 6) || (i === 1 && phase >= 6);
                  return (
                    <div key={col} className="rounded-lg bg-slate-50/80 p-2">
                      <div className="text-[9px] uppercase tracking-[0.12em] text-slate-400" style={{ fontFamily: MONO }}>
                        {col}
                      </div>
                      <div className="mt-1.5 h-[46px]">
                        {here && (
                          <motion.div
                            layout
                            layoutId="sarah-deal"
                            transition={{ duration: 0.6, ease: EASE }}
                            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5"
                          >
                            <img src={FACE.priya} alt="" className="h-5 w-5 rounded-full object-cover" />
                            <div className="min-w-0">
                              <div className="truncate text-[10.5px] font-semibold text-slate-800">Sarah Nguyen</div>
                              <div className="text-[9px] text-slate-400" style={{ fontFamily: MONO }}>
                                Quote request
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>

            <Panel active={phase >= 7} className="px-3.5 py-3">
              <div className="flex items-center justify-between">
                <div className="text-[9.5px] uppercase tracking-[0.16em] text-slate-400" style={{ fontFamily: MONO }}>
                  Booking
                </div>
                {booked && (
                  <span className="flex items-center gap-1 text-[9.5px] font-medium text-cyan-700" style={{ fontFamily: MONO }}>
                    <Send className="h-2.5 w-2.5" /> CONFIRMED
                  </span>
                )}
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                {["Mon", "Tue", "Wed"].map((d) => {
                  const on = booked && d === "Tue";
                  return (
                    <div
                      key={d}
                      className={cn(
                        "flex-1 rounded-lg border px-2 py-2 text-center transition-colors duration-500",
                        on ? "border-cyan-300 bg-cyan-50" : "border-slate-200 bg-white",
                      )}
                    >
                      <div className="text-[9px] uppercase tracking-[0.12em] text-slate-400" style={{ fontFamily: MONO }}>
                        {d}
                      </div>
                      <div className={cn("mt-1 text-[11px] font-semibold", on ? "text-cyan-800" : "text-slate-300")}>
                        {on ? "2:30 PM" : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-[10.5px] text-slate-500">
                {booked ? "Site visit with James · Tuesday · 2:30 PM" : "No appointment yet"}
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* resolution strip */}
      <div className="border-t border-slate-200/80 bg-white px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          {["Enquiry", "Response", "Follow-up", "Qualification", "Booking"].map((step, i) => {
            const litAt = [1, 2, 4, 5, 7][i];
            const on = phase >= litAt;
            return (
              <div key={step} className="flex items-center gap-2.5">
                {i > 0 && <span className={cn("h-px w-5 transition-colors duration-500", on ? "bg-cyan-300" : "bg-slate-200")} />}
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors duration-500",
                    on ? "bg-cyan-50 text-cyan-800" : "bg-slate-50 text-slate-300",
                  )}
                  style={{ fontFamily: MONO }}
                >
                  {step}
                </span>
              </div>
            );
          })}
          <span
            className={cn(
              "ml-auto text-[11px] font-medium transition-opacity duration-500",
              phase >= 8 ? "text-slate-900 opacity-100" : "text-slate-400 opacity-40",
            )}
          >
            No handoffs. No forgotten next step.
          </span>
        </div>
      </div>
    </div>
  );
}

export function ZaplaConnectedJourneyV6() {
  const reduced = !!useReducedMotion();
  const [runKey, setRunKey] = useState(0);
  const { phase } = useSceneClock({
    durations: PHASES,
    paused: false,
    reduced,
    restartKey: runKey,
    onComplete: () => setRunKey((k) => k + 1),
  });
  const shown = reduced ? PHASES.length - 1 : phase;

  return (
    <section className="bg-[#F7F9FA] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1360px]">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-[820px]"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700" style={{ fontFamily: MONO }}>
            The platform behind the follow-through
          </div>
          <h2
            className="mt-5 text-[34px] leading-[1.03] tracking-[-0.035em] text-slate-900 sm:text-[46px] lg:text-[54px]"
            style={{ fontFamily: DISPLAY, fontWeight: 500 }}
          >
            One platform. Every customer step connected.
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.65] text-slate-500 sm:text-[16.5px]">
            From the first enquiry to the follow-up, booking and beyond, Zapla keeps the next step moving without your
            team having to remember it.
          </p>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-12 sm:mt-14"
        >
          <ProductSurface phase={shown} />
          <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-slate-400" style={{ fontFamily: MONO }}>
            Illustrative product sequence · fictional customer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
