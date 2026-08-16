import { motion, AnimatePresence } from "motion/react";
import { Check, MessageSquare } from "lucide-react";
import { EASE_OUT } from "./motion-kit";
import { FACE } from "./faces";

const KEYLINE =
  "linear-gradient(105deg, rgba(37,99,255,1), rgba(34,211,238,1) 52%, rgba(139,92,246,1))";

const RECIPIENTS = [
  { name: "Maya Chen", face: FACE.maya },
  { name: "Daniel Ross", face: FACE.daniel },
  { name: "Priya Nair", face: FACE.priya },
  { name: "Tom Whyte", face: FACE.tom },
];

/* tiny restrained confetti around the Sent button */
const CONFETTI: Array<{ x: number; y: number; c: string }> = [
  { x: -34, y: -20, c: "#2563ff" },
  { x: 30, y: -26, c: "#22d3ee" },
  { x: 46, y: 6, c: "#8b5cf6" },
  { x: -26, y: 24, c: "#f59e0b" },
  { x: 14, y: 32, c: "#22c55e" },
  { x: 54, y: -14, c: "#f43f5e" },
  { x: -46, y: 4, c: "#22d3ee" },
];

function Confetti({ reduced }: { reduced: boolean }) {
  if (reduced) return null;
  return (
    <span className="pointer-events-none absolute inset-0">
      {CONFETTI.map((d, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-[6px] w-[6px] rounded-[2px]"
          style={{ background: d.c }}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={{ opacity: [0, 1, 0], x: d.x, y: d.y, scale: 1, rotate: 90 }}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.24 + i * 0.025 }}
        />
      ))}
    </span>
  );
}

function SentButton({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative ml-auto shrink-0">
      <Confetti reduced={reduced} />
      <motion.span
        initial={reduced ? false : { scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.2, type: "spring", stiffness: 300, damping: 19 }}
        className="relative inline-flex items-center justify-center rounded-[14px] px-6 py-3 text-[20px] font-extrabold leading-none tracking-[-0.01em] text-white xl:px-7 xl:py-3.5 xl:text-[23px]"
        style={{
          background: "linear-gradient(180deg, #22c55e, #16a34a)",
          boxShadow: "0 12px 24px -10px rgba(22,163,74,0.65)",
        }}
      >
        Sent
      </motion.span>
    </div>
  );
}

function IconTile() {
  return (
    <span
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] text-white"
      style={{
        background: "linear-gradient(150deg, #3b82ff, #22d3ee)",
        boxShadow: "0 10px 22px -10px rgba(37,99,255,0.75)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-x-[3px] top-[3px] h-[38%] rounded-t-[11px]"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.45), transparent)" }}
      />
      <MessageSquare className="relative h-[22px] w-[22px]" strokeWidth={2.4} />
    </span>
  );
}

/* receipt stack: recipients tick in one by one under the campaign header */
export function CampaignSentCard({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <AnimatePresence>
      {show ? (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-start justify-center pt-[18%]">
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.28, ease: EASE_OUT } }}
            transition={
              reduced
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 190, damping: 22, mass: 0.9 }
            }
            className="relative w-[86%] overflow-hidden rounded-[19px] p-[2px] xl:w-[70%]"
            style={{ background: KEYLINE, boxShadow: "0 28px 60px -26px rgba(15,23,42,0.45)" }}
          >
            {!reduced ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%]"
                style={{
                  translateX: "-50%",
                  translateY: "-50%",
                  background:
                    "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0) 200deg, rgba(34,211,238,0.55) 290deg, rgba(255,255,255,0.95) 340deg, rgba(139,92,246,0.6) 358deg, rgba(255,255,255,0) 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              />
            ) : null}
            <div className="relative overflow-hidden rounded-[17px] bg-white">
              <div className="px-5 pb-4 pt-4">
                <div className="flex items-center gap-4">
                  <IconTile />
                  <div className="min-w-0">
                    <div className="truncate text-[16.5px] font-extrabold leading-tight tracking-[-0.02em] text-zapla-ink xl:text-[19px]">
                      VIP comeback campaign
                    </div>
                    <div className="mt-0.5 text-[12.5px] font-medium text-slate-400">
                      4 contacts
                    </div>
                  </div>
                  <SentButton reduced={reduced} />
                </div>

                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{
                    duration: reduced ? 0 : 0.4,
                    ease: EASE_OUT,
                    delay: reduced ? 0 : 0.12,
                  }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-100 pt-3">
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
                        className="flex items-center gap-2.5"
                      >
                        <img
                          src={r.face}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover ring-2 ring-white outline outline-1 outline-slate-200"
                        />
                        <span className="truncate text-[13px] font-semibold text-slate-700">
                          {r.name}
                        </span>
                        <motion.span
                          initial={reduced ? false : { scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 17,
                            delay: reduced ? 0 : 0.34 + i * 0.14,
                          }}
                          className="ml-auto flex h-[19px] w-[19px] items-center justify-center rounded-full text-white"
                          style={{
                            background: "linear-gradient(180deg, #22c55e, #16a34a)",
                            boxShadow: "0 4px 10px -4px rgba(22,163,74,0.7)",
                          }}
                        >
                          <Check className="h-[12px] w-[12px]" strokeWidth={4} />
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
