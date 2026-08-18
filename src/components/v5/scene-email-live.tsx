import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, Mail, Megaphone, Play, Plus, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const AUDIENCES = [
  ["Clients gone quiet", "312 contacts"],
  ["VIP Clients", "124 contacts"],
  ["Open Quotes", "86 contacts"],
] as const;

const TEMPLATES = [
  {
    eyebrow: "EMAIL 1",
    headline: "We’d love to\nsee you again",
    subject: "We’d love to see you again",
    timing: "Send now",
    cta: "Book again",
    bg: "#fff1ed",
    ink: "#7f1d1d",
    button: "#ef6b57",
    imageY: "0%",
  },
  {
    eyebrow: "EMAIL 2",
    headline: "Here’s a reason\nto come back",
    subject: "Here’s a reason to come back",
    timing: "+2 days",
    cta: "View offer",
    bg: "#eef7ef",
    ink: "#14532d",
    button: "#27855a",
    imageY: "50%",
  },
  {
    eyebrow: "EMAIL 3",
    headline: "Last chance —\ndon’t miss out",
    subject: "Last chance — don’t miss out",
    timing: "+5 days",
    cta: "Book now",
    bg: "#eef4ff",
    ink: "#1e3a8a",
    button: "#245aa8",
    imageY: "100%",
  },
] as const;

function AudienceChip() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-[6px] font-black text-fuchsia-700">
      <Users className="h-2.5 w-2.5" />
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
          className="absolute bottom-[16%] right-[5%] top-[16%] z-30 w-[34%] overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)]"
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
            <div className="relative flex min-h-[44px] items-center border-b border-slate-100">
              <div className="w-[46px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">To</div>
              <div className="flex-1">
                {selected ? <AudienceChip /> : <span className="text-[8px] font-semibold text-slate-300">Choose a group</span>}
              </div>
              <Plus className="h-3.5 w-3.5 text-slate-300" />

              {!selected ? (
                <motion.div
                  className="absolute left-[44px] right-0 top-[41px] z-40 overflow-hidden rounded-[13px] border border-slate-200 bg-white p-1.5 shadow-[0_20px_44px_-24px_rgba(15,23,42,.48)]"
                  initial={reduced ? false : { opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  {AUDIENCES.map(([name, count], index) => (
                    <motion.div
                      key={name}
                      className={index === 0 ? "flex items-center gap-2 rounded-[10px] bg-fuchsia-50 px-2.5 py-2" : "flex items-center gap-2 rounded-[10px] px-2.5 py-2"}
                      animate={{ scale: phase === 1 && index === 0 ? 0.975 : 1 }}
                      transition={{ duration: reduced ? 0 : 0.14 }}
                    >
                      <span className={index === 0 ? "flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-600 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"}>
                        <Users className="h-3 w-3" />
                      </span>
                      <div className="flex-1">
                        <div className="text-[7.5px] font-black text-slate-800">{name}</div>
                        <div className="text-[6px] font-semibold text-slate-400">{count}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </div>

            <div className="flex min-h-[44px] items-center border-b border-slate-100">
              <div className="w-[46px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div>
              <div className="truncate text-[8.5px] font-black text-slate-800">We’d love to see you again</div>
            </div>

            <div className="pt-4 text-[8.5px] font-semibold leading-[1.6] text-slate-600">
              Hi {"{{first_name}}"}, it’s been a little while. We’d love to welcome you back.
              <div className="mt-4 inline-flex rounded-[8px] bg-zapla-ink px-3 py-2 text-[7px] font-black text-white">Book again</div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TemplateArtwork({ index, compact = false }: { index: number; compact?: boolean }) {
  const template = TEMPLATES[index];

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: template.bg }}>
      <div
        className="absolute inset-y-0 right-0 w-[58%] bg-no-repeat"
        style={{
          backgroundImage: "url('/email-campaigns/template-photos.jpg')",
          backgroundSize: "200% 300%",
          backgroundPosition: `100% ${template.imageY}`,
        }}
      />
      <div
        className="absolute inset-y-0 left-[34%] w-[36%]"
        style={{ background: `linear-gradient(90deg, ${template.bg} 14%, transparent 100%)` }}
      />

      {!compact ? (
        <>
          <div className="absolute left-3 top-3 text-[5.5px] font-black tracking-[.18em]" style={{ color: template.ink }}>{template.eyebrow}</div>
          <div className="absolute bottom-3 left-3 w-[58%]">
            <div className="whitespace-pre-line text-[15px] font-black leading-[.92] tracking-[-.045em]" style={{ color: template.ink }}>{template.headline}</div>
            <div className="mt-2 inline-flex rounded-full px-2 py-1 text-[5.5px] font-black text-white" style={{ backgroundColor: template.button }}>{template.cta}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}

function CreativeCard({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const flyPhase = 4 + index;
  const removed = phase >= flyPhase;

  return (
    <motion.div
      className="h-[174px] w-[132px] overflow-hidden rounded-[18px] border border-white bg-white p-[3px] shadow-[0_24px_52px_-30px_rgba(15,23,42,.5)]"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: removed ? 0 : 1, y: 0, scale: phase === flyPhase ? 0.98 : 1 }}
      transition={{ duration: reduced ? 0 : 0.22, delay: phase === 3 && !reduced ? index * 0.05 : 0 }}
    >
      <div className="h-full w-full overflow-hidden rounded-[15px]">
        <TemplateArtwork index={index} />
      </div>
    </motion.div>
  );
}

function TemplatePicker({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 3 && phase <= 6 ? (
        <motion.div
          className="absolute right-[2.5%] top-[19%] z-30 w-[42%]"
          initial={reduced ? false : { opacity: 0, x: 26 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="mb-4 text-center">
            <div className="text-[10px] font-black text-slate-900">Your 3-email sequence</div>
            <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Three creatives. One win-back campaign.</div>
          </div>
          <div className="flex justify-center gap-3.5">
            {TEMPLATES.map((_, index) => (
              <CreativeCard key={index} index={index} phase={phase} reduced={reduced} />
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FlyingCreative({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 4 || phase > 6) return null;

  const index = phase - 4;
  const sourceLeft = [60.1, 71.7, 83.3][index];
  const targetTop = [35.7, 54.5, 73.3][index];

  return (
    <motion.div
      className="pointer-events-none absolute z-50 overflow-hidden border border-white bg-white p-[3px] shadow-[0_28px_58px_-28px_rgba(15,23,42,.55)]"
      initial={
        reduced
          ? false
          : {
              left: `${sourceLeft}%`,
              top: "27.5%",
              width: 132,
              height: 174,
              borderRadius: 18,
              opacity: 1,
              rotate: index === 1 ? 1.5 : -1.5,
            }
      }
      animate={{
        left: "20.1%",
        top: `${targetTop}%`,
        width: 48,
        height: 60,
        borderRadius: 9,
        opacity: 1,
        rotate: 0,
      }}
      transition={{ duration: reduced ? 0 : 0.56, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="h-full w-full overflow-hidden rounded-[6px]">
        <TemplateArtwork index={index} compact />
      </div>
    </motion.div>
  );
}

function SequenceRow({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= 5 + index;
  const incoming = phase === 4 + index;
  const active = phase >= 9;

  return (
    <motion.div
      className="mx-auto flex h-[72px] w-[382px] max-w-[96%] items-center gap-3 rounded-[15px] border bg-white px-3.5 shadow-[0_14px_32px_-28px_rgba(15,23,42,.42)]"
      animate={{
        borderColor: active ? "rgba(16,185,129,.34)" : incoming ? "rgba(217,70,239,.48)" : filled ? "rgba(203,213,225,.95)" : "rgba(226,232,240,1)",
        boxShadow: incoming ? "0 0 0 4px rgba(217,70,239,.065), 0 14px 32px -28px rgba(15,23,42,.42)" : "0 14px 32px -28px rgba(15,23,42,.42)",
      }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div className={filled ? "h-[60px] w-[48px] shrink-0 overflow-hidden rounded-[9px] border border-slate-200 bg-white p-[2px] shadow-sm" : "flex h-[60px] w-[48px] shrink-0 items-center justify-center rounded-[9px] border border-dashed border-slate-200 bg-slate-50 text-slate-300"}>
        {filled ? (
          <motion.div className="h-full w-full overflow-hidden rounded-[6px]" initial={reduced ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}>
            <TemplateArtwork index={index} compact />
          </motion.div>
        ) : (
          <Mail className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[5.5px] font-black uppercase tracking-[.16em] text-slate-400">EMAIL {index + 1}</div>
        {filled ? (
          <motion.div initial={reduced ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mt-1 truncate text-[9px] font-black text-slate-800">{TEMPLATES[index].subject}</div>
            <div className="mt-1 text-[6.5px] font-black text-slate-500">{TEMPLATES[index].timing}</div>
          </motion.div>
        ) : (
          <div className="mt-1.5 text-[7px] font-semibold text-slate-300">Waiting for creative</div>
        )}
      </div>

      {filled ? (
        <motion.span
          initial={reduced ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={active ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
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
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[6.5px] font-bold text-slate-500">
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
    <div className="absolute bottom-[5%] left-[7%] top-[5%] z-10 w-[54%]">
      <div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600">
              <Megaphone className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[12px] font-black text-slate-900">Customer Win-back</div>
              <div className="text-[7px] font-semibold text-slate-400">3-email campaign</div>
            </div>
          </div>
          <span className={active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[6.5px] font-black text-emerald-700" : ready ? "rounded-full bg-blue-50 px-2.5 py-1 text-[6.5px] font-black text-blue-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-[6.5px] font-black text-slate-500"}>
            {active ? "ACTIVE" : ready ? "READY" : "DRAFT"}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5">
            <div className="text-[5.5px] font-black uppercase tracking-[.14em] text-slate-400">Audience</div>
            {audience ? (
              <div className="mt-2 flex items-center justify-between">
                <AudienceChip />
                <span className="text-[6px] font-bold text-slate-400">312</span>
              </div>
            ) : (
              <div className="mt-2 text-[7px] font-semibold text-slate-300">Choose recipients</div>
            )}
          </div>

          <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5">
            <div className="text-[5.5px] font-black uppercase tracking-[.14em] text-slate-400">Sequence</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[8px] font-black text-slate-800">3 emails</span>
              <span className="text-[6.5px] font-bold text-slate-400">5 days</span>
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
          <motion.div className={active ? "inline-flex items-center gap-1.5 rounded-[10px] bg-emerald-500 px-4 py-2.5 text-[8px] font-black text-white" : ready ? "inline-flex items-center gap-1.5 rounded-[10px] bg-zapla-ink px-4 py-2.5 text-[8px] font-black text-white" : "inline-flex items-center gap-1.5 rounded-[10px] bg-slate-200 px-4 py-2.5 text-[8px] font-black text-slate-500"}>
            {active ? <><Check className="h-3.5 w-3.5" />Campaign active</> : <><Play className="h-3.5 w-3.5" />Activate campaign</>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Summary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 9 ? (
        <motion.div
          className="absolute right-[8%] top-[31%] z-20 w-[25%] rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="mt-3 text-[13px] font-black text-slate-900">Campaign active</div>
          <div className="mt-1 text-[7.5px] font-semibold text-slate-500">312 clients · 3 emails · 5 days</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "79%", top: "37%" },
    4: { left: "65%", top: "37%" },
    5: { left: "76.6%", top: "37%" },
    6: { left: "88.2%", top: "37%" },
    8: { left: "33%", top: "92%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <Builder phase={phase} reduced={reduced} />
      <Composer phase={phase} reduced={reduced} />
      <TemplatePicker phase={phase} reduced={reduced} />
      <FlyingCreative phase={phase} reduced={reduced} />
      <Summary phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 4 || phase === 5 || phase === 6 || phase === 8} reduced={reduced} />
    </div>
  );
}
