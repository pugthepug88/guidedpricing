import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, Receipt, Send, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Btn, Card, EASE, Face, Pill } from "./kit";
import { FACE } from "./faces";

/* Small looping step driver, paused on hover/focus and off for reduced motion */
function useLoop(steps: number, ms: number, reduced: boolean) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) {
      setStep(steps - 1);
      return;
    }
    if (paused) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % steps), ms);
    return () => window.clearTimeout(id);
  }, [step, paused, reduced, steps, ms]);

  const handlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };
  return { step, ref, handlers };
}

const REVIEW_CUSTOMERS = [
  { name: "Maya Chen", face: FACE.maya, job: "Studio refresh" },
  { name: "Tom Bennett", face: FACE.tom, job: "Garden rebuild" },
  { name: "Priya Raman", face: FACE.priya, job: "Fitout consult" },
];

function ReputationCard({ reduced }: { reduced: boolean }) {
  const { step, handlers } = useLoop(5, 1900, reduced);
  const selected = step >= 1;
  const sent = step >= 2;
  const reviews = step >= 3;

  return (
    <Card className="overflow-hidden" >
      <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3">
        <Star className="h-4 w-4 text-amber-500" />
        <span className="text-[13px] font-semibold text-slate-900">Reviews</span>
        <Pill tone={sent ? "green" : "slate"} className="ml-auto">
          {sent ? "Requests sent" : "Completed jobs"}
        </Pill>
      </div>
      <div className="space-y-2 p-4" tabIndex={-1} {...handlers}>
        {REVIEW_CUSTOMERS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={false}
            animate={{ backgroundColor: selected ? "rgb(239 246 255)" : "rgb(255 255 255)" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE, delay: i * 0.05 }}
            className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-2.5 py-2"
          >
            <span
              className={cn(
                "flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border transition-colors duration-500",
                selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300",
              )}
            >
              {selected ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : null}
            </span>
            <Face src={c.face} size={26} />
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold text-slate-800">{c.name}</div>
              <div className="truncate text-[10.5px] text-slate-400">{c.job} · completed</div>
            </div>
            {sent ? <Pill tone="blue" className="ml-auto">Requested</Pill> : null}
          </motion.div>
        ))}

        <div className="flex items-center gap-2 pt-1">
          <Btn>
            <Send className="h-3 w-3" /> Request reviews
          </Btn>
          <span className="text-[11px] text-slate-400">Every completed customer, no filtering.</span>
        </div>

        <AnimatePresence>
          {reviews ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2"
            >
              {[
                { c: REVIEW_CUSTOMERS[0], text: "Quick, tidy and easy to deal with." },
                { c: REVIEW_CUSTOMERS[1], text: "Turned up on time and did a great job." },
              ].map((r) => (
                <div
                  key={r.c.name}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 px-2.5 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Face src={r.c.face} size={22} />
                    <span className="truncate text-[11.5px] font-semibold text-slate-800">
                      {r.c.name}
                    </span>
                    <span className="ml-auto flex items-center gap-[1px]">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-slate-500">{r.text}</div>
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Card>
  );
}

const INVOICE_STAGES = ["Created", "Sent", "Viewed", "Paid"];

function InvoicesCard({ reduced }: { reduced: boolean }) {
  const { step, handlers } = useLoop(5, 1700, reduced);
  const stage = Math.min(step, 3);

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3">
        <Receipt className="h-4 w-4 text-blue-600" />
        <span className="text-[13px] font-semibold text-slate-900">Invoices</span>
        <Pill tone={stage >= 3 ? "green" : "blue"} className="ml-auto">
          {INVOICE_STAGES[stage]}
        </Pill>
      </div>
      <div className="space-y-2.5 p-4" tabIndex={-1} {...handlers}>
        <div className="rounded-xl border border-slate-200 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <Face src={FACE.daniel} size={28} />
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold text-slate-800">
                Okafor Electrical
              </div>
              <div className="text-[10.5px] text-slate-400">INV-1042 · due 12 Aug</div>
            </div>
            <div className="ml-auto text-[13px] font-semibold text-slate-900">$1,860.00</div>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {INVOICE_STAGES.map((s, i) => (
              <span key={s} className="flex flex-1 items-center gap-1.5">
                <motion.span
                  initial={false}
                  animate={{ opacity: i <= stage ? 1 : 0.45 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                  className={cn(
                    "whitespace-nowrap rounded-full px-2 py-[3px] text-[10.5px] font-medium",
                    i < stage
                      ? "bg-blue-50 text-blue-700"
                      : i === stage
                        ? stage === 3
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400",
                  )}
                >
                  {s}
                </motion.span>
                {i < 3 ? <span className="h-px flex-1 bg-slate-200" /> : null}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2.5">
          <div className="flex items-center gap-2.5">
            <Face src={FACE.tom} size={28} />
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold text-slate-800">
                Bennett Landscapes
              </div>
              <div className="text-[10.5px] text-amber-700">INV-1037 · 6 days overdue</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[13px] font-semibold text-slate-900">$740.00</div>
              <Pill tone="amber">Needs follow-up</Pill>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function BelowHeroV5() {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  return (
    <section className="mx-auto max-w-[1360px] px-5 pb-20 sm:px-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <h2 className="text-[22px] font-bold tracking-tight text-zapla-ink">
            Build reputation on repeat
          </h2>
          <p className="mt-1.5 max-w-[440px] text-[14px] text-zapla-muted">
            Ask every completed customer for a review, from the same place you run the job.
          </p>
          <div className="mt-4">
            <ReputationCard reduced={reduced} />
          </div>
        </div>
        <div>
          <h2 className="text-[22px] font-bold tracking-tight text-zapla-ink">
            Invoices and payments in view
          </h2>
          <p className="mt-1.5 max-w-[440px] text-[14px] text-zapla-muted">
            See what is sent, viewed, paid and still outstanding without leaving Zapla.
          </p>
          <div className="mt-4">
            <InvoicesCard reduced={reduced} />
          </div>
        </div>
      </div>
    </section>
  );
}
