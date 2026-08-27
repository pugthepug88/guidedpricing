import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppShell, Card, ChannelMark, EASE, Face, Pill } from "@/components/v5/kit";
import { FACE } from "@/components/v5/faces";
import { useLeakSteps } from "./useLeakSteps";

const ROWS: { title: string; sub: string; face: string; tone: "green" | "blue" | "amber" }[] = [
  { title: "Calendar confirmed", sub: "Thursday 9:00 · full service", face: FACE.maya, tone: "green" },
  { title: "Invoice paid", sub: "$840 · card", face: FACE.daniel, tone: "green" },
  { title: "Missed call", sub: "Unknown number · 11:04", face: FACE.leo, tone: "amber" },
  { title: "New enquiry", sub: "Website form", face: FACE.priya, tone: "blue" },
  { title: "Booking moved", sub: "Friday 14:30", face: FACE.tom, tone: "blue" },
  { title: "Quote approved", sub: "$2,180 · brake job", face: FACE.jordan, tone: "green" },
  { title: "Customer replied", sub: "\"See you then\"", face: FACE.nina, tone: "blue" },
  { title: "Deposit received", sub: "$300 · transfer", face: FACE.sam, tone: "green" },
  { title: "Tomorrow filled", sub: "6 of 6 slots booked", face: FACE.alex, tone: "green" },
];

const CHIPS = [
  "ENQUIRY RECEIVED",
  "NO REPLY SENT",
  "2 HOURS UNANSWERED",
  "STILL WAITING",
  "LOST",
];

function fmt(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function LeakV4InboxDecay() {
  /* steps: 1 = panel, 2 = sarah, 3..11 = nine rows, 12 = finale */
  const { ref, step, inView, reduced } = useLeakSteps(12, 110);
  const [secs, setSecs] = useState(0);
  const [chip, setChip] = useState(-1);

  const visibleRows = Math.max(0, Math.min(ROWS.length, step - 2));
  const decay = visibleRows / ROWS.length;
  const finale = step >= 12;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setSecs(272);
      setChip(CHIPS.length - 1);
      return;
    }
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    const chips: ReturnType<typeof setTimeout>[] = CHIPS.map((_, i) =>
      setTimeout(() => setChip(i), 400 + i * 1100),
    );
    return () => {
      clearInterval(id);
      chips.forEach(clearTimeout);
    };
  }, [inView, reduced]);

  const frozen = finale;

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F8FAFF" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[720px] w-[820px] -translate-x-1/2 rounded-full"
        style={{ background: "rgba(37,99,235,0.08)", filter: "blur(120px)" }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-6 py-24">
        <header className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[30px] leading-[1.12] tracking-[-0.02em] sm:text-[44px]">
            <span className="block font-bold text-slate-900">The customer was ready.</span>
            <span className="block font-light text-slate-400">The business was busy.</span>
          </h2>
        </header>

        <div className="relative mt-12">
          <motion.div
            className="mx-auto h-[540px] w-full max-w-[980px] overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)]"
            initial={false}
            animate={
              step >= 1
                ? {
                    opacity: finale ? 0.3 : 1,
                    y: 0,
                    scale: 1,
                    filter: finale ? "blur(3px)" : "blur(0px)",
                  }
                : { opacity: 0, y: 32, scale: 0.97 }
            }
            transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
          >
            <AppShell activeKey="inbox" title="Inbox" subtitle="All channels · today">
              <div className="h-full overflow-hidden p-3">
                <div className="flex flex-col gap-2">
                  <AnimatePresence initial={false}>
                    {ROWS.slice(0, visibleRows)
                      .slice()
                      .reverse()
                      .map((r) => (
                        <motion.div
                          key={r.title}
                          layout
                          initial={reduced ? false : { opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                          className="flex items-center gap-3 rounded-[16px] border border-slate-200/80 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                        >
                          <Face src={r.face} size={28} />
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-[13px] font-semibold text-slate-900">
                              {r.title}
                            </div>
                            <div className="truncate text-[11px] text-slate-400">{r.sub}</div>
                          </div>
                          <Pill tone={r.tone}>Handled</Pill>
                        </motion.div>
                      ))}
                  </AnimatePresence>

                  {/* Sarah's decaying row */}
                  <motion.div
                    layout
                    className="relative flex items-center gap-3 overflow-hidden rounded-[16px] px-3 py-2.5"
                    initial={false}
                    animate={{
                      opacity: finale ? 0 : 1,
                      backgroundColor:
                        decay > 0.6 ? "rgba(239,246,255,0)" : "rgba(239,246,255,1)",
                    }}
                    transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                    style={{
                      boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                    }}
                  >
                    <span
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full transition-colors duration-700"
                      style={{
                        backgroundColor: decay > 0.6 ? "rgb(203,213,225)" : "rgb(37,99,235)",
                      }}
                    />
                    <Face
                      src={FACE.sophie}
                      size={28}
                      className="transition-all duration-700"
                    />
                    <div className="min-w-0 flex-1">
                      <div
                        className="truncate text-[13px] font-semibold transition-colors duration-700"
                        style={{ color: decay > 0.5 ? "rgb(148,163,184)" : "rgb(15,23,42)" }}
                      >
                        Sarah Miller
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <ChannelMark channel="instagram" size={13} />
                        "Can you fit my car in this week?"
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center rounded-full px-2 py-[3px] text-[10.5px] font-semibold leading-none transition-colors duration-700"
                      style={
                        decay > 0.5
                          ? { background: "rgb(241,245,249)", color: "rgb(100,116,139)" }
                          : { background: "rgb(219,234,254)", color: "rgb(29,78,216)" }
                      }
                    >
                      {fmt(secs)}
                    </span>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 transition-all duration-700"
                      style={{ backdropFilter: decay > 0.5 ? "grayscale(1)" : "none" }}
                    />
                  </motion.div>
                </div>
              </div>
            </AppShell>
          </motion.div>

          {/* annotation chips on the right edge */}
          <div className="pointer-events-none absolute right-0 top-1/3 hidden sm:block">
            <AnimatePresence mode="wait">
              {chip >= 0 && !finale ? (
                <motion.div
                  key={CHIPS[chip]}
                  initial={reduced ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                  className="rounded-[10px] bg-slate-900 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white"
                >
                  {CHIPS[chip]}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* finale: Sarah lifted out */}
          <AnimatePresence>
            {finale ? (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              >
                <motion.div
                  initial={reduced ? false : { scale: 1, y: 24 }}
                  animate={{ scale: 1.12, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                  className="w-full max-w-[380px]"
                >
                  <Card className="rounded-[16px] p-4 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)]">
                    <div className="flex items-center gap-2.5" style={{ filter: "grayscale(1)" }}>
                      <Face src={FACE.sophie} size={32} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-semibold text-slate-500">
                          Sarah Miller
                        </div>
                        <div className="truncate text-[11px] text-slate-400">
                          Unanswered · {fmt(secs)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 rounded-[10px] bg-rose-500 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                      Booked elsewhere · 4:32 PM
                    </div>
                  </Card>
                </motion.div>
                <p className="mt-8 max-w-[560px] px-6 text-center text-[20px] font-semibold leading-snug text-slate-900 sm:text-[28px]">
                  Nothing broke. The next step just never happened.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
