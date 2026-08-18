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
    name: "Welcome back",
    photoPosition: "center top",
    kicker: "WELCOME BACK",
    headline: "COME BACK\nANYTIME",
    cta: "Book again",
    bg: "bg-[#c93778]",
    accent: "text-fuchsia-100",
  },
  {
    name: "VIP thank you",
    photoPosition: "center center",
    kicker: "JUST FOR YOU",
    headline: "A LITTLE\nEXTRA",
    cta: "View update",
    bg: "bg-[#164f4b]",
    accent: "text-emerald-100",
  },
  {
    name: "Service reminder",
    photoPosition: "center bottom",
    kicker: "SERVICE DUE",
    headline: "KEEP IT\nRUNNING",
    cta: "Book service",
    bg: "bg-[#e9ad46]",
    accent: "text-amber-950",
  },
] as const;

const FLOW = [
  ["We’d love to see you again", "Send now"],
  ["Still thinking about it?", "+2 days"],
  ["One last reminder", "+3 days"],
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
          className="absolute bottom-[13%] right-[5%] top-[13%] z-30 w-[34%] overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_32px_78px_-42px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600">
              <Mail className="h-4 w-4" />
            </span>
            <div className="text-[11px] font-black text-slate-900">New email</div>
          </div>

          <div className="px-4 py-3.5">
            <div className="flex min-h-[42px] items-center border-b border-slate-100">
              <div className="w-[46px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">To</div>
              <div className="flex-1">
                {selected ? <AudienceChip /> : <span className="text-[8px] font-semibold text-slate-300">Choose a group</span>}
              </div>
              <Plus className="h-3.5 w-3.5 text-slate-300" />
            </div>

            <div className="flex min-h-[42px] items-center border-b border-slate-100">
              <div className="w-[46px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div>
              <div className="truncate text-[8.5px] font-black text-slate-800">We’d love to see you again</div>
            </div>

            <div className="pt-3 text-[8.5px] font-semibold leading-[1.55] text-slate-600">
              Hi {"{{first_name}}"}, it’s been a little while. We’d love to welcome you back.
              <div className="mt-3 inline-flex rounded-[8px] bg-zapla-ink px-3 py-2 text-[7px] font-black text-white">Book again</div>
            </div>

            {!selected ? (
              <motion.div
                className="mt-4 rounded-[14px] border border-slate-200 bg-slate-50/70 p-2"
                initial={reduced ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {AUDIENCES.map(([name, count], index) => (
                  <motion.div
                    key={name}
                    className={
                      index === 0
                        ? "flex items-center gap-2 rounded-[11px] border border-fuchsia-200 bg-white px-2.5 py-2 shadow-sm"
                        : "mt-1 flex items-center gap-2 rounded-[11px] px-2.5 py-2"
                    }
                    animate={{ scale: phase === 1 && index === 0 ? 0.985 : 1 }}
                    transition={{ duration: reduced ? 0 : 0.14 }}
                  >
                    <span
                      className={
                        index === 0
                          ? "flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-600 text-white"
                          : "flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400"
                      }
                    >
                      <Users className="h-3 w-3" />
                    </span>
                    <div className="flex-1">
                      <div className="text-[7.5px] font-black text-slate-800">{name}</div>
                      <div className="text-[6px] font-semibold text-slate-400">{count}</div>
                    </div>
                    {index === 0 ? <span className="text-[6px] font-black text-fuchsia-700">Select</span> : null}
                  </motion.div>
                ))}
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Artwork({ index, selected = false }: { index: number; selected?: boolean }) {
  const template = TEMPLATES[index];

  if (index === 0) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#fff0f4]">
        <div className="absolute right-0 top-0 h-full w-[56%] overflow-hidden rounded-l-[46px]">
          <div className="h-full w-full bg-cover" style={{ backgroundImage: "url('/email-campaigns/template-photos.jpg')", backgroundSize: "100% 300%", backgroundPosition: template.photoPosition }} />
        </div>
        <div className="absolute left-3.5 top-3.5 text-[6.5px] font-black uppercase tracking-[.15em] text-fuchsia-600">{template.kicker}</div>
        {selected ? <SelectedMark /> : null}
        <div className="absolute bottom-3.5 left-3.5 w-[45%]">
          <div className="whitespace-pre-line text-[20px] font-black leading-[.88] tracking-[-.055em] text-slate-950">{template.headline}</div>
          <div className="mt-3 inline-flex rounded-full bg-fuchsia-600 px-2.5 py-1 text-[6px] font-black uppercase text-white">{template.cta}</div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#164f4b]">
        <div className="absolute right-0 top-0 h-full w-[57%] bg-cover" style={{ backgroundImage: "url('/email-campaigns/template-photos.jpg')", backgroundSize: "100% 300%", backgroundPosition: template.photoPosition }} />
        <div className="absolute inset-y-0 left-[38%] w-[28%] bg-gradient-to-r from-[#164f4b] to-transparent" />
        <div className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2 py-1 text-[6px] font-black uppercase tracking-[.12em] text-emerald-900">{template.kicker}</div>
        {selected ? <SelectedMark /> : null}
        <div className="absolute bottom-3.5 left-3.5 w-[48%] text-white">
          <div className="whitespace-pre-line text-[20px] font-black leading-[.88] tracking-[-.055em]">{template.headline}</div>
          <div className="mt-3 inline-flex rounded-full bg-[#f4e8c9] px-2.5 py-1 text-[6px] font-black uppercase text-[#164f4b]">{template.cta}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-[#f2bd59]">
      <div className="absolute inset-y-0 right-0 h-full w-[58%] bg-cover" style={{ backgroundImage: "url('/email-campaigns/template-photos.jpg')", backgroundSize: "100% 300%", backgroundPosition: template.photoPosition }} />
      <div className="absolute inset-y-0 left-[35%] w-[32%] bg-gradient-to-r from-[#f2bd59] to-transparent" />
      <div className="absolute left-3.5 top-3.5 text-[6.5px] font-black uppercase tracking-[.15em] text-amber-950">{template.kicker}</div>
      {selected ? <SelectedMark dark /> : null}
      <div className="absolute bottom-3.5 left-3.5 w-[46%] text-amber-950">
        <div className="whitespace-pre-line text-[20px] font-black leading-[.88] tracking-[-.055em]">{template.headline}</div>
        <div className="mt-3 inline-flex rounded-full bg-amber-950 px-2.5 py-1 text-[6px] font-black uppercase text-white">{template.cta}</div>
      </div>
    </div>
  );
}

function SelectedMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className={dark ? "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-amber-950 text-white shadow-lg" : "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-lg"}>
      <Check className="h-4 w-4" strokeWidth={3} />
    </span>
  );
}

function CreativeFrame({ index, selected = false }: { index: number; selected?: boolean }) {
  return (
    <div className={`h-[220px] w-[176px] rounded-[20px] bg-white p-[3px] shadow-[0_26px_58px_-30px_rgba(15,23,42,.52)] ${selected ? "ring-4 ring-fuchsia-500/15" : ""}`}>
      <Artwork index={index} selected={selected} />
    </div>
  );
}

function TemplatePicker({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 4;

  return (
    <AnimatePresence>
      {phase >= 3 && phase <= 4 ? (
        <motion.div
          className="absolute inset-0 z-30 bg-white/72 backdrop-blur-[1px]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.22 }}
        >
          <div className="absolute left-[9%] top-[14%]">
            <div className="text-[11px] font-black text-slate-900">Choose a template</div>
            <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Pick one direction.</div>
          </div>

          <div className="absolute inset-x-0 top-[28%] flex justify-center gap-6">
            {TEMPLATES.map((template, index) => (
              <motion.div
                key={template.name}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{
                  opacity: selected && index !== 0 ? 0.42 : 1,
                  y: selected && index === 0 ? -6 : 0,
                  scale: selected && index === 0 ? 1.04 : 1,
                }}
                transition={{ duration: reduced ? 0 : 0.26, delay: reduced ? 0 : index * 0.05 }}
              >
                <CreativeFrame index={index} selected={selected && index === 0} />
                <div className="mt-2 text-center text-[7.5px] font-black text-slate-700">{template.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SequenceRow({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= 6 + index;
  const active = phase >= 9;

  return (
    <motion.div
      className="mx-auto flex h-[68px] w-[382px] max-w-[96%] items-center gap-3 rounded-[15px] border bg-white px-3.5 shadow-[0_14px_32px_-28px_rgba(15,23,42,.42)]"
      animate={{ borderColor: active ? "rgba(16,185,129,.34)" : filled ? "rgba(203,213,225,.95)" : "rgba(226,232,240,1)" }}
      transition={{ duration: reduced ? 0 : 0.22 }}
    >
      <motion.span
        className={filled ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-violet-50 text-violet-600" : "flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-dashed border-slate-200 bg-slate-50 text-slate-300"}
        animate={{ scale: filled ? [0.9, 1.04, 1] : 1 }}
        transition={{ duration: reduced ? 0 : 0.28 }}
      >
        <Mail className="h-4 w-4" />
      </motion.span>

      <div className="min-w-0 flex-1">
        <div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">EMAIL {index + 1}</div>
        {filled ? (
          <motion.div initial={reduced ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mt-1 truncate text-[9px] font-black text-slate-800">{FLOW[index][0]}</div>
            <div className="mt-1 text-[6.5px] font-black text-slate-500">{FLOW[index][1]}</div>
          </motion.div>
        ) : (
          <div className="mt-1.5 text-[7px] font-semibold text-slate-300">Waiting</div>
        )}
      </div>

      {filled ? (
        <span className={active ? "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white" : "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"}>
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
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

function TemplateSummary({ phase }: { phase: number }) {
  const filled = phase >= 5;

  return (
    <motion.div
      className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5"
      animate={{ borderColor: phase === 5 ? "rgba(217,70,239,.48)" : "rgba(226,232,240,1)" }}
    >
      <div className="text-[5.5px] font-black uppercase tracking-[.14em] text-slate-400">Template</div>
      {filled ? (
        <motion.div className="mt-2 flex items-center gap-2" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}>
          <div className="h-8 w-6 overflow-hidden rounded-[5px] bg-white p-[1px] shadow-sm">
            <Artwork index={0} />
          </div>
          <span className="text-[7px] font-black text-slate-700">Welcome back</span>
        </motion.div>
      ) : (
        <div className="mt-2 text-[7px] font-semibold text-slate-300">Choose creative</div>
      )}
    </motion.div>
  );
}

function Builder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const audience = phase >= 2;
  const ready = phase >= 8;
  const active = phase >= 9;

  return (
    <div className="absolute bottom-[5%] left-[7%] top-[5%] z-10 w-[54%]">
      <div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600"><Megaphone className="h-4 w-4" /></span>
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
              <div className="mt-2 flex items-center justify-between"><AudienceChip /><span className="text-[6px] font-bold text-slate-400">312</span></div>
            ) : (
              <div className="mt-2 text-[7px] font-semibold text-slate-300">Choose recipients</div>
            )}
          </div>
          <TemplateSummary phase={phase} />
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

function TemplateFly({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase !== 5) return null;

  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      initial={reduced ? false : { left: "19%", top: "33%", width: 176, height: 220, opacity: 1 }}
      animate={{ left: "44%", top: "15%", width: 24, height: 32, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.5, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="h-full w-full overflow-hidden rounded-[8px] bg-white p-[2px] shadow-[0_20px_45px_-24px_rgba(15,23,42,.52)]">
        <Artwork index={0} selected />
      </div>
    </motion.div>
  );
}

function Summary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 9 ? (
        <motion.div
          className="absolute right-[8%] top-[30%] z-20 w-[25%] rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-4 w-4" strokeWidth={3} /></span>
          <div className="mt-3 text-[13px] font-black text-slate-900">Campaign active</div>
          <div className="mt-1 text-[7.5px] font-semibold text-slate-500">312 clients · 3 emails · 5 days</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    0: { left: "78%", top: "27%" },
    1: { left: "79%", top: "57%" },
    4: { left: "24%", top: "45%" },
    5: { left: "45%", top: "17%" },
    8: { left: "33%", top: "92%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <Builder phase={phase} reduced={reduced} />
      <Composer phase={phase} reduced={reduced} />
      <TemplatePicker phase={phase} reduced={reduced} />
      <TemplateFly phase={phase} reduced={reduced} />
      <Summary phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 4 || phase === 8} reduced={reduced} />
    </div>
  );
}
