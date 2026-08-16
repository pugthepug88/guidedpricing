import { motion, AnimatePresence } from "motion/react";
import { Check, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./motion-kit";
import { FACE } from "./faces";

export type CampaignVariant = "receipt" | "launch" | "counter";

const KEYLINE =
  "linear-gradient(105deg, rgba(37,99,255,1), rgba(34,211,238,1) 52%, rgba(139,92,246,1))";

/* shared shell: gradient keyline, shadow, width and stage placement */
function CardShell({
  children,
  reduced,
  initial,
  className,
}: {
  children: React.ReactNode;
  reduced: boolean;
  initial?: Record<string, number>;
  className?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-start justify-center pt-[18%]">
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, ...initial }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.28, ease: EASE_OUT } }}
        transition={
          reduced ? { duration: 0.2 } : { type: "spring", stiffness: 190, damping: 22, mass: 0.9 }
        }
        className={cn("w-[86%] rounded-[19px] p-[2px] xl:w-[70%]", className)}
        style={{ background: KEYLINE, boxShadow: "0 28px 60px -26px rgba(15,23,42,0.45)" }}
      >
        <div className="overflow-hidden rounded-[17px] bg-white">{children}</div>
      </motion.div>
    </div>
  );
}

function IconTile() {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-zapla-blue text-white">
      <MessageSquare className="h-5 w-5" />
    </span>
  );
}

function SentBlock({ reduced, delay = 0.14 }: { reduced: boolean; delay?: number }) {
  return (
    <motion.span
      initial={reduced ? false : { scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: reduced ? 0 : delay, type: "spring", stiffness: 320, damping: 20 }}
      className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-[13px] bg-emerald-50 px-3 py-2 text-[16px] font-extrabold uppercase tracking-[0.04em] text-emerald-700 xl:px-4 xl:py-2.5 xl:text-[20px]"
    >
      <Check className="h-5 w-5" strokeWidth={3.5} />
      Sent
    </motion.span>
  );
}

const RECIPIENTS = [
  { name: "Maya Chen", face: FACE.maya },
  { name: "Daniel Ross", face: FACE.daniel },
  { name: "Priya Nair", face: FACE.priya },
  { name: "Tom Whyte", face: FACE.tom },
];

/* A — receipt stack: recipients tick in one by one, then SENT locks in */
function ReceiptCard({ reduced }: { reduced: boolean }) {
  return (
    <CardShell reduced={reduced} initial={{ y: 18 }}>
      <div className="px-5 pb-4 pt-4">
        <div className="flex items-center gap-4">
          <IconTile />
          <div className="min-w-0">
            <div className="truncate text-[16.5px] font-extrabold leading-tight xl:text-[19px] tracking-[-0.02em] text-zapla-ink">
              VIP comeback campaign
            </div>
            <div className="mt-0.5 text-[12.5px] font-medium text-slate-400">4 contacts</div>
          </div>
          <SentBlock reduced={reduced} delay={0.86} />
        </div>

        <motion.div
          initial={reduced ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT, delay: reduced ? 0 : 0.12 }}
          className="overflow-hidden"
        >
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-100 pt-3">
            {RECIPIENTS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={reduced ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.34,
                  ease: EASE_OUT,
                  delay: reduced ? 0 : 0.2 + i * 0.14,
                }}
                className="flex items-center gap-2"
              >
                <img
                  src={r.face}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="truncate text-[12.5px] font-semibold text-slate-600">
                  {r.name}
                </span>
                <motion.span
                  initial={reduced ? false : { scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                    delay: reduced ? 0 : 0.34 + i * 0.14,
                  }}
                  className="ml-auto flex h-[17px] w-[17px] items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                >
                  <Check className="h-[11px] w-[11px]" strokeWidth={3.5} />
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </CardShell>
  );
}

/* B — message launch: bubble flies into the tile, light sweeps the keyline */
function LaunchCard({ reduced }: { reduced: boolean }) {
  return (
    <CardShell reduced={reduced} initial={{ x: 110 }}>
      <div className="relative flex items-center gap-4 px-5 py-4">
        {!reduced ? (
          <motion.span
            className="pointer-events-none absolute -inset-px rounded-[17px]"
            initial={{ opacity: 0, backgroundPosition: "0% 50%" }}
            animate={{ opacity: [0, 0.75, 0], backgroundPosition: "220% 50%" }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
            style={{
              background:
                "linear-gradient(100deg, transparent 35%, rgba(34,211,238,0.35) 50%, transparent 65%)",
              backgroundSize: "220% 100%",
            }}
          />
        ) : null}

        <div className="relative">
          <IconTile />
          {!reduced ? (
            <motion.span
              className="absolute inset-0 flex items-center justify-center rounded-[13px] bg-zapla-blue text-white"
              initial={{ x: 300, y: -46, scale: 0.55, opacity: 0 }}
              animate={{ x: 0, y: 0, scale: 1, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 0.62,
                ease: EASE_OUT,
                opacity: { duration: 0.62, times: [0, 0.15, 0.8, 1] },
              }}
            >
              <MessageSquare className="h-5 w-5" />
            </motion.span>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="truncate text-[16.5px] font-extrabold leading-tight xl:text-[19px] tracking-[-0.02em] text-zapla-ink">
            VIP comeback campaign
          </div>
          <div className="mt-0.5 text-[12.5px] font-medium text-slate-400">
            4 contacts · SMS delivered
          </div>
        </div>

        <div className="relative ml-auto shrink-0">
          {!reduced ? (
            <motion.span
              className="absolute inset-0 rounded-[13px] ring-2 ring-emerald-300"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.35 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.5 }}
            />
          ) : null}
          <SentBlock reduced={reduced} delay={0.44} />
        </div>
      </div>
    </CardShell>
  );
}

/* C — counter roll: 0 of 4 rolls to 4 of 4, then flips to SENT */
function CounterCard({ reduced }: { reduced: boolean }) {
  const steps = [0, 1, 2, 3, 4];
  return (
    <CardShell reduced={reduced} initial={{ y: 20 }}>
      <div className="relative px-5 py-4">
        <div className="flex items-center gap-4">
          <IconTile />
          <div className="min-w-0">
            <div className="truncate text-[16.5px] font-extrabold leading-tight xl:text-[19px] tracking-[-0.02em] text-zapla-ink">
              VIP comeback campaign
            </div>
            <div className="mt-0.5 text-[12.5px] font-medium text-slate-400">SMS · VIP segment</div>
          </div>

          <div className="ml-auto shrink-0">
            <AnimatePresence mode="popLayout" initial={false}>
              {reduced ? <SentBlock key="sent" reduced /> : <Counter key="counter" steps={steps} />}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-3.5 h-[5px] overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full"
            initial={reduced ? { width: "100%" } : { width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: reduced ? 0 : 0.95, ease: EASE_OUT }}
            style={{ background: KEYLINE }}
          />
        </div>
      </div>
    </CardShell>
  );
}

function Counter({ steps }: { steps: number[] }) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT, delay: 1.05 }}
        className="inline-flex items-baseline gap-2 rounded-[13px] bg-slate-50 px-4 py-2.5"
      >
        <span className="relative inline-block h-[24px] w-[16px] overflow-hidden">
          {steps.map((n, i) => (
            <motion.span
              key={n}
              className="absolute inset-0 text-[20px] font-extrabold leading-[24px] text-zapla-ink"
              initial={{ opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 16 }}
              animate={{ opacity: [0, 1, 0], y: [16, 0, -16] }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.2 }}
            >
              {n}
            </motion.span>
          ))}
        </span>
        <span className="text-[13px] font-bold uppercase tracking-[0.04em] text-slate-400">
          of 4 sent
        </span>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, rotateX: 70, scale: 0.94 }}
        animate={{ opacity: 1, rotateX: 0, scale: 1 }}
        transition={{ delay: 1.12, type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 inline-flex items-center justify-center gap-2 rounded-[13px] bg-emerald-50 px-3 py-2 text-[16px] font-extrabold uppercase tracking-[0.04em] text-emerald-700 xl:px-4 xl:py-2.5 xl:text-[20px]"
      >
        <Check className="h-5 w-5" strokeWidth={3.5} />
        Sent
      </motion.span>
    </div>
  );
}

export function CampaignSentCard({
  show,
  reduced,
  variant,
}: {
  show: boolean;
  reduced: boolean;
  variant: CampaignVariant;
}) {
  return (
    <AnimatePresence>
      {show ? (
        variant === "receipt" ? (
          <ReceiptCard key="receipt" reduced={reduced} />
        ) : variant === "counter" ? (
          <CounterCard key="counter" reduced={reduced} />
        ) : (
          <LaunchCard key="launch" reduced={reduced} />
        )
      ) : null}
    </AnimatePresence>
  );
}
