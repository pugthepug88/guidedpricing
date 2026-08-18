import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, Clock3, Mail, Megaphone, Play, Plus, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const AUDIENCES = [
  ["Clients gone quiet", "312 contacts"],
  ["VIP Clients", "124 contacts"],
  ["Open Quotes", "86 contacts"],
] as const;

const TEMPLATES = [
  {
    subject: "We’d love to see you again",
    timing: "Send now",
  },
  {
    subject: "Here’s a reason to come back",
    timing: "+2 days",
  },
  {
    subject: "Last chance — don’t miss out",
    timing: "+5 days",
  },
] as const;

const POINTER_PATH =
  "M4.4 3.3 C4.4 2.0 5.9 1.3 6.9 2.1 L18.9 11.7 C20.0 12.6 19.4 14.3 18.0 14.3 L12.7 14.3 C12.2 14.3 11.7 14.6 11.5 15.1 L9.3 20.4 C8.7 21.7 6.8 21.4 6.6 20.0 Z";

function AudienceChip({ large = false }: { large?: boolean }) {
  return (
    <span
      className={
        large
          ? "inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-1.5 text-[7.5px] font-black text-fuchsia-700"
          : "inline-flex items-center gap-1 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-[6px] font-black text-fuchsia-700"
      }
    >
      <Users className={large ? "h-3 w-3" : "h-2.5 w-2.5"} />
      Clients gone quiet
    </span>
  );
}

function Composer({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 2;

  return (
    <AnimatePresence>
      {phase <= 2 ? (
        <motion.div
          className="absolute bottom-[15%] right-[5%] top-[15%] z-30 w-[35%] overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600">
              <Mail className="h-4 w-4" />
            </span>
            <div className="text-[11px] font-black text-slate-900">New email</div>
          </div>

          <div className="px-4 py-3">
            <div className="relative flex min-h-[46px] items-center border-b border-slate-100">
              <div className="w-[48px] text-[7.5px] font-black uppercase tracking-[.12em] text-slate-400">To</div>
              <div className="flex-1">
                {selected ? <AudienceChip /> : <span className="text-[8.5px] font-semibold text-slate-300">Choose a group</span>}
              </div>
              <Plus className="h-3.5 w-3.5 text-slate-300" />

              {!selected ? (
                <motion.div
                  className="absolute left-[46px] right-0 top-[43px] z-40 overflow-hidden rounded-[13px] border border-slate-200 bg-white p-1.5 shadow-[0_20px_44px_-24px_rgba(15,23,42,.48)]"
                  initial={reduced ? false : { opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  {AUDIENCES.map(([name, count], index) => (
                    <motion.div
                      key={name}
                      className={index === 0 ? "flex items-center gap-2 rounded-[10px] bg-fuchsia-50 px-2.5 py-2.5" : "flex items-center gap-2 rounded-[10px] px-2.5 py-2.5"}
                      animate={{ scale: phase === 1 && index === 0 ? 0.975 : 1 }}
                      transition={{ duration: reduced ? 0 : 0.14 }}
                    >
                      <span className={index === 0 ? "flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-600 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"}>
                        <Users className="h-3 w-3" />
                      </span>
                      <div className="flex-1">
                        <div className="text-[8px] font-black text-slate-800">{name}</div>
                        <div className="text-[6.5px] font-semibold text-slate-400">{count}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </div>

            <div className="flex min-h-[46px] items-center border-b border-slate-100">
              <div className="w-[48px] text-[7.5px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div>
              <div className="truncate text-[9px] font-black text-slate-800">We’d love to see you again</div>
            </div>

            <div className="pt-4 text-[9px] font-semibold leading-[1.65] text-slate-600">
              Hi {"{{first_name}}"}, it’s been a little while since your last visit.
              <br />
              We’d love to welcome you back.
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TemplateArtwork({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-[#fff7ef]">
        <div className="absolute right-0 top-0 h-full w-[56%] overflow-hidden rounded-l-[42px]">
          <img src={photoA} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-y-0 left-[34%] w-[30%] bg-gradient-to-r from-[#fff7ef] to-transparent" />
        <div className="absolute left-3 top-3 text-[5.5px] font-black uppercase tracking-[.16em] text-emerald-700">WELCOME BACK</div>
        <div className="absolute bottom-3 left-3 w-[51%]">
          <div className="text-[17px] font-black leading-[.9] tracking-[-.05em] text-emerald-950">A REASON<br />TO RETURN</div>
          <div className="mt-2 text-[6px] font-bold leading-[1.25] text-emerald-800/60">Something special is waiting for you.</div>
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-[#12372f]">
        <img src={photoC} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12372f] via-[#12372f]/35 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[5.5px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">FINAL NOTE</div>
        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <div className="text-[18px] font-black leading-[.88] tracking-[-.055em]">LAST CHANCE<br />DON’T MISS OUT</div>
          <div className="mt-2 text-[6px] font-semibold text-white/65">One final reminder before we wrap up.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-slate-950">
      <img src={photoB} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_42%]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700/78 via-violet-500/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/10 to-white/5" />
      <div className="absolute left-3 top-3 rounded-full border border-white/25 bg-black/15 px-2 py-1 text-[5.5px] font-black uppercase tracking-[.14em] text-white backdrop-blur-md">WE MISS YOU</div>
      <div className="absolute inset-x-0 bottom-0 p-3 text-white">
        <div className="text-[6px] font-black uppercase tracking-[.17em] text-white/65">COME BACK ANYTIME</div>
        <div className="mt-1 text-[19px] font-black leading-[.88] tracking-[-.06em]">WE’D LOVE TO<br />SEE YOU AGAIN</div>
      </div>
    </div>
  );
}

function CreativeCard({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const flyPhase = 4 + index;
  const removed = phase >= flyPhase;

  if (removed) return <div className="h-[178px] w-[134px] shrink-0" aria-hidden />;

  return (
    <motion.div
      layoutId={`email-creative-${index}`}
      className="h-[178px] w-[134px] shrink-0 overflow-hidden rounded-[18px] border border-white bg-white p-[3px] shadow-[0_26px_54px_-30px_rgba(15,23,42,.52)]"
      initial={reduced ? false : { opacity: 0, y: 14, rotate: index === 0 ? -2.5 : index === 2 ? 2.5 : 0 }}
      animate={{ opacity: 1, y: 0, rotate: index === 0 ? -1.5 : index === 2 ? 1.5 : 0 }}
      transition={{
        opacity: { duration: reduced ? 0 : 0.24, delay: reduced ? 0 : index * 0.055 },
        y: { type: "spring", stiffness: 230, damping: 24, delay: reduced ? 0 : index * 0.055 },
        rotate: { type: "spring", stiffness: 230, damping: 24, delay: reduced ? 0 : index * 0.055 },
        layout: { duration: reduced ? 0 : 0.72, ease: [0.18, 0.78, 0.2, 1] },
      }}
    >
      <TemplateArtwork index={index} />
    </motion.div>
  );
}

function TemplatePicker({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 3 && phase <= 6 ? (
        <motion.div
          className="absolute right-[1.5%] top-[17%] z-30 w-[47%]"
          initial={reduced ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="mb-3.5 text-center">
            <div className="text-[11px] font-black text-slate-900">Select templates</div>
            <div className="mt-0.5 text-[7px] font-semibold text-slate-400">3 emails · 5 days</div>
          </div>
          <div className="flex justify-center gap-3">
            {TEMPLATES.map((_, index) => (
              <CreativeCard key={index} index={index} phase={phase} reduced={reduced} />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DragCursor({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (reduced || phase < 4 || phase > 6) return null;

  const index = phase - 4;
  const sourceLeft = [62.2, 76.3, 90.4][index];
  const targetTop = [39.5, 58.3, 77.1][index];

  return (
    <motion.div
      key={index}
      className="pointer-events-none absolute left-0 top-0 z-[85]"
      initial={{ left: `${sourceLeft}%`, top: "43%", opacity: 0, scale: 0.92 }}
      animate={{
        left: [`${sourceLeft}%`, `${sourceLeft}%`, "17.6%"],
        top: ["43%", "42%", `${targetTop}%`],
        opacity: [0, 1, 1],
        scale: [0.92, 0.88, 1],
      }}
      transition={{ duration: 0.72, times: [0, 0.12, 1], ease: [0.18, 0.78, 0.2, 1] }}
    >
      <motion.span
        className="pointer-events-none absolute left-0 top-0 rounded-full border-2 border-blue-400/55"
        initial={{ width: 8, height: 8, x: -4, y: -4, opacity: 0.9 }}
        animate={{ width: 38, height: 38, x: -19, y: -19, opacity: 0 }}
        transition={{ duration: 0.45 }}
      />
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        style={{ filter: "drop-shadow(0 1px 1.5px rgba(15,23,42,.45)) drop-shadow(0 6px 12px rgba(15,23,42,.25))" }}
      >
        <defs>
          <linearGradient id={`emailDragPointer-${index}`} x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#3b82ff" />
            <stop offset="55%" stopColor="#2563ff" />
            <stop offset="100%" stopColor="#7c5cf6" />
          </linearGradient>
        </defs>
        <path d={POINTER_PATH} fill={`url(#emailDragPointer-${index})`} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M6.2 4.1 L15.2 11.3" stroke="rgba(255,255,255,.5)" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

function SequenceRow({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const flyPhase = 4 + index;
  const filled = phase >= flyPhase;
  const incoming = phase === flyPhase;
  const active = phase >= 9;

  return (
    <motion.div
      className="mx-auto flex h-[76px] w-[392px] max-w-[96%] items-center gap-3.5 rounded-[16px] border bg-white px-3.5 shadow-[0_15px_34px_-28px_rgba(15,23,42,.42)]"
      animate={{
        borderColor: active ? "rgba(16,185,129,.34)" : incoming ? "rgba(37,99,235,.42)" : filled ? "rgba(203,213,225,.95)" : "rgba(226,232,240,1)",
        boxShadow: incoming ? "0 0 0 4px rgba(37,99,235,.06), 0 15px 34px -28px rgba(15,23,42,.42)" : "0 15px 34px -28px rgba(15,23,42,.42)",
      }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div className="relative flex h-[68px] w-[54px] shrink-0 items-center justify-center overflow-visible rounded-[10px]">
        {!filled ? (
          <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-dashed border-slate-200 bg-slate-50 text-slate-300">
            <Mail className="h-4 w-4" />
          </div>
        ) : (
          <motion.div
            layoutId={`email-creative-${index}`}
            className="h-full w-full overflow-hidden rounded-[10px] border border-white bg-white p-[2px] shadow-[0_10px_22px_-16px_rgba(15,23,42,.55)]"
            transition={{ layout: { duration: reduced ? 0 : 0.72, ease: [0.18, 0.78, 0.2, 1] } }}
          >
            <TemplateArtwork index={index} />
          </motion.div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">EMAIL {index + 1}</div>
        {filled ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: incoming && !reduced ? 0.42 : 0, duration: reduced ? 0 : 0.22 }}
          >
            <div className="mt-1 truncate text-[9.5px] font-black text-slate-800">{TEMPLATES[index].subject}</div>
            <div className="mt-1 text-[7px] font-black text-slate-500">{TEMPLATES[index].timing}</div>
          </motion.div>
        ) : (
          <div className="mt-1.5 text-[7.5px] font-semibold text-slate-300">Drop template here</div>
        )}
      </div>

      {filled ? (
        <motion.span
          initial={reduced ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: incoming && !reduced ? 0.48 : 0, duration: reduced ? 0 : 0.2 }}
          className={active ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function Connector() {
  return <div className="mx-auto h-2.5 w-px bg-slate-200" />;
}

function Wait({ label }: { label: string }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[6.8px] font-bold text-slate-500">
      <Clock3 className="h-2.5 w-2.5 text-blue-500" />
      {label}
    </div>
  );
}

function Builder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const audience = phase >= 2;
  const ready = phase >= 7;
  const active = phase >= 9;

  return (
    <div className="absolute bottom-[4%] left-[5%] top-[4%] z-10 w-[57%]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[21px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600">
              <Megaphone className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[12px] font-black text-slate-900">Customer Win-back</div>
              <div className="text-[7.5px] font-semibold text-slate-400">3-email campaign</div>
            </div>
          </div>
          <span className={active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[7px] font-black text-emerald-700" : ready ? "rounded-full bg-blue-50 px-2.5 py-1 text-[7px] font-black text-blue-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-[7px] font-black text-slate-500"}>
            {active ? "ACTIVE" : ready ? "READY" : "DRAFT"}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="min-h-[78px] rounded-[14px] border border-slate-200 bg-slate-50 px-3.5 py-3">
            <div className="text-[6.5px] font-black uppercase tracking-[.14em] text-slate-400">Audience</div>
            {audience ? (
              <div className="mt-2.5 flex items-center justify-between gap-2">
                <AudienceChip large />
                <span className="text-[7px] font-black text-slate-400">312</span>
              </div>
            ) : (
              <div className="mt-3 text-[8px] font-semibold text-slate-300">Choose recipients</div>
            )}
          </div>

          <div className="min-h-[78px] rounded-[14px] border border-slate-200 bg-slate-50 px-3.5 py-3">
            <div className="text-[6.5px] font-black uppercase tracking-[.14em] text-slate-400">Sequence</div>
            <div className="mt-2.5 flex items-end justify-between gap-2">
              <span className="text-[10.5px] font-black text-slate-800">3 emails</span>
              <span className="text-[8px] font-black text-slate-500">5 days</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
          <SequenceRow index={0} phase={phase} reduced={reduced} />
          <Connector />
          <Wait label="Wait 2 days" />
          <Connector />
          <SequenceRow index={1} phase={phase} reduced={reduced} />
          <Connector />
          <Wait label="Wait 3 days" />
          <Connector />
          <SequenceRow index={2} phase={phase} reduced={reduced} />
        </div>

        <div className="mt-2 flex justify-center">
          <motion.div
            className={active ? "inline-flex items-center gap-1.5 rounded-[10px] bg-emerald-500 px-4 py-2.5 text-[8px] font-black text-white" : ready ? "inline-flex items-center gap-1.5 rounded-[10px] bg-zapla-ink px-4 py-2.5 text-[8px] font-black text-white" : "inline-flex items-center gap-1.5 rounded-[10px] bg-slate-200 px-4 py-2.5 text-[8px] font-black text-slate-500"}
          >
            {active ? <><Check className="h-3.5 w-3.5" />Campaign active</> : <><Play className="h-3.5 w-3.5" />Activate campaign</>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ActiveSummary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 9 ? (
        <motion.div
          className="absolute right-[6%] top-[31%] z-30 w-[27%] p-[2px]"
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[22px]">
            <motion.div
              className="absolute -inset-[80%]"
              style={{ background: "conic-gradient(from 0deg, transparent 0deg 250deg, rgba(16,185,129,.12) 275deg, rgba(16,185,129,.95) 310deg, rgba(59,130,246,.72) 330deg, transparent 350deg)" }}
              animate={reduced ? undefined : { rotate: 360 }}
              transition={reduced ? undefined : { duration: 2.6, ease: "linear", repeat: Infinity }}
            />
          </div>
          <div className="relative rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]">
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white"
              animate={reduced ? undefined : { boxShadow: ["0 0 0 0 rgba(16,185,129,.16)", "0 0 0 8px rgba(16,185,129,0)"] }}
              transition={reduced ? undefined : { duration: 1.5, repeat: Infinity }}
            >
              <Check className="h-[18px] w-[18px]" strokeWidth={3} />
            </motion.span>
            <div className="mt-3 text-[13px] font-black text-slate-900">Campaign active</div>
            <div className="mt-1.5 text-[8px] font-semibold text-slate-500">312 clients · 3 emails · 5 days</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "79%", top: "38%" },
    8: { left: "34%", top: "92%" },
  };

  return (
    <LayoutGroup id="email-sequence-demo">
      <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
        <Builder phase={phase} reduced={reduced} />
        <Composer phase={phase} reduced={reduced} />
        <TemplatePicker phase={phase} reduced={reduced} />
        <DragCursor phase={phase} reduced={reduced} />
        <ActiveSummary phase={phase} reduced={reduced} />
        <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 8} reduced={reduced} />
      </div>
    </LayoutGroup>
  );
}
