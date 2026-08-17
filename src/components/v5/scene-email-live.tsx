import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  ChevronDown,
  Clock3,
  Flag,
  LayoutTemplate,
  Mail,
  MessageCircleReply,
  Play,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const EMAILS = [
  {
    title: "Your quote and next steps",
    delay: "Send immediately",
    eyebrow: "EMAIL 1",
  },
  {
    title: "Common questions answered",
    delay: "Wait 2 days",
    eyebrow: "EMAIL 2",
  },
  {
    title: "Ready when you are",
    delay: "Wait 3 days",
    eyebrow: "EMAIL 3",
  },
] as const;

const TEMPLATES = [
  {
    name: "Quote follow-up",
    subject: "Your quote and next steps",
    accent: "from-blue-500 to-violet-500",
    soft: "bg-blue-50",
  },
  {
    name: "Service reminder",
    subject: "A quick reminder for you",
    accent: "from-emerald-400 to-cyan-500",
    soft: "bg-emerald-50",
  },
  {
    name: "Win-back",
    subject: "We haven’t seen you in a while",
    accent: "from-fuchsia-500 to-rose-400",
    soft: "bg-fuchsia-50",
  },
] as const;

function SequenceNode({
  index,
  phase,
  reduced,
}: {
  index: number;
  phase: number;
  reduced: boolean;
}) {
  const email = EMAILS[index];
  const filled = index === 0 ? phase >= 2 : phase >= 3;
  const active = phase >= 5;
  const checked = active && phase >= 6;

  return (
    <motion.div
      className="relative"
      initial={false}
      animate={{ opacity: filled ? 1 : 0.58, y: filled ? 0 : 2 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: filled && !reduced ? index * 0.08 : 0 }}
    >
      <motion.div
        className={
          filled
            ? "relative overflow-hidden rounded-[11px] border border-slate-200 bg-white shadow-[0_10px_28px_-24px_rgba(15,23,42,.45)]"
            : "relative overflow-hidden rounded-[11px] border border-dashed border-slate-200 bg-slate-50/55"
        }
        animate={{
          borderColor: checked ? "rgba(16,185,129,.45)" : filled ? "rgba(226,232,240,1)" : "rgba(226,232,240,.9)",
          boxShadow: checked
            ? "0 0 0 3px rgba(16,185,129,.08), 0 10px 28px -24px rgba(15,23,42,.45)"
            : "0 10px 28px -24px rgba(15,23,42,.45)",
        }}
        transition={{ duration: reduced ? 0 : 0.28 }}
      >
        <div className="flex items-center gap-2 px-2.5 py-2.5">
          <span
            className={
              filled
                ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-blue-50 text-blue-600"
                : "flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-slate-100 text-slate-300"
            }
          >
            <Mail className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[6px] font-black uppercase tracking-[.13em] text-slate-400">{email.eyebrow}</div>
            <div className={filled ? "mt-0.5 truncate text-[8px] font-black text-slate-800" : "mt-0.5 text-[8px] font-bold text-slate-300"}>
              {filled ? email.title : "Choose email template"}
            </div>
          </div>
          <AnimatePresence>
            {checked ? (
              <motion.span
                initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 border-t border-slate-100 px-2.5 py-1.5 text-[6.5px] font-bold text-slate-400">
          <Clock3 className="h-3 w-3" />
          <span className={filled ? "text-slate-500" : "text-slate-300"}>{filled ? email.delay : "Not configured"}</span>
        </div>

        {active && filled ? (
          <motion.div
            className="absolute inset-y-0 left-0 w-[2px] bg-emerald-400"
            initial={reduced ? false : { scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : index * 0.12 }}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function SequenceRail({ phase, reduced }: { phase: number; reduced: boolean }) {
  const configured = phase >= 4;
  const active = phase >= 5;

  return (
    <div className="relative flex h-full min-h-0 w-[35%] min-w-[210px] max-w-[280px] flex-col border-r border-slate-200 bg-white px-3 py-3">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[10px] font-black tracking-tight text-slate-900">Quote follow-up sequence</div>
          <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">3-email follow-up</div>
        </div>
        <motion.span
          className={
            active
              ? "rounded-full bg-emerald-50 px-2 py-1 text-[6px] font-black text-emerald-700"
              : "rounded-full bg-slate-100 px-2 py-1 text-[6px] font-black text-slate-500"
          }
          animate={{ scale: active ? [1, 1.08, 1] : 1 }}
          transition={{ duration: reduced ? 0 : 0.38 }}
        >
          {active ? "ACTIVE" : "DRAFT"}
        </motion.span>
      </div>

      <div className="relative mt-3 min-h-0 flex-1 overflow-hidden">
        <div className="absolute bottom-8 left-[14px] top-[22px] w-px bg-slate-200" />
        <motion.div
          className="absolute left-[14px] top-[22px] w-px bg-emerald-400"
          initial={false}
          animate={{ height: active ? "78%" : "0%" }}
          transition={{ duration: reduced ? 0 : 1.05, ease: [0.2, 0.82, 0.24, 1] }}
        />

        <div className="relative z-10 space-y-2.5">
          <motion.div
            className={
              configured
                ? "rounded-[10px] border border-blue-200 bg-blue-50/55 p-2.5"
                : "rounded-[10px] border border-slate-200 bg-white p-2.5"
            }
            animate={{ boxShadow: phase === 4 ? "0 0 0 3px rgba(37,99,255,.08)" : "0 0 0 0 rgba(37,99,255,0)" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-blue-600 text-white">
                <Flag className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[6px] font-black uppercase tracking-[.12em] text-blue-500">TRIGGER</div>
                <div className="mt-0.5 text-[7.5px] font-black text-slate-800">{configured ? "Quote sent" : "Set sequence trigger"}</div>
              </div>
              {configured ? <Check className="h-3.5 w-3.5 text-blue-600" strokeWidth={3} /> : null}
            </div>
          </motion.div>

          <SequenceNode index={0} phase={phase} reduced={reduced} />
          <SequenceNode index={1} phase={phase} reduced={reduced} />
          <SequenceNode index={2} phase={phase} reduced={reduced} />

          <div className="flex justify-center pt-0.5">
            <span className="rounded-[7px] bg-slate-100 px-2 py-1 text-[6px] font-black uppercase tracking-[.12em] text-slate-400">END</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateThumb({ template, selected }: { template: (typeof TEMPLATES)[number]; selected?: boolean }) {
  return (
    <motion.div
      className={
        selected
          ? "relative overflow-hidden rounded-[12px] border-2 border-blue-400 bg-white p-2 shadow-[0_18px_34px_-26px_rgba(37,99,255,.7)]"
          : "relative overflow-hidden rounded-[12px] border border-slate-200 bg-white p-2 shadow-[0_14px_28px_-26px_rgba(15,23,42,.45)]"
      }
      animate={{ y: selected ? -2 : 0, scale: selected ? 1.015 : 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      <div className={`h-9 rounded-[8px] bg-gradient-to-br ${template.accent} opacity-90`} />
      <div className="mt-2 text-[7.5px] font-black text-slate-800">{template.name}</div>
      <div className="mt-1 truncate text-[6px] font-semibold text-slate-400">{template.subject}</div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="h-1.5 w-[62%] rounded-full bg-slate-100" />
        <span className="h-1.5 w-[20%] rounded-full bg-slate-100" />
      </div>
      {selected ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function TemplatePanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 2;

  return (
    <motion.div
      key="templates"
      className="absolute inset-0 p-4"
      initial={reduced ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? undefined : { opacity: 0, x: -14 }}
      transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600">
          <LayoutTemplate className="h-4 w-4" />
        </span>
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-900">Choose an email template</div>
          <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Start from a proven layout, then personalise it.</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {TEMPLATES.map((template, index) => (
          <motion.div
            key={template.name}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : index * 0.07 }}
          >
            <TemplateThumb template={template} selected={selected && index === 0} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-4 rounded-[13px] border border-slate-200 bg-slate-50/65 p-3"
        initial={false}
        animate={{ opacity: selected ? 1 : 0.52, y: selected ? 0 : 4 }}
        transition={{ duration: reduced ? 0 : 0.28 }}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[8.5px] font-black text-slate-800">Quote follow-up</div>
            <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Personalised quote recap with a clear next step.</div>
          </div>
          <motion.span
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-zapla-ink px-3 py-2 text-[7.5px] font-black text-white"
            animate={{ boxShadow: selected ? "0 0 0 4px rgba(37,99,255,.10)" : "0 0 0 0 rgba(37,99,255,0)" }}
          >
            <Sparkles className="h-3 w-3" /> Use template
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EmailPreviewPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      key="preview"
      className="absolute inset-0 p-4"
      initial={reduced ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? undefined : { opacity: 0, x: -12 }}
      transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-900">Your quote and next steps</div>
          <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Template applied to Email 1</div>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[6px] font-black text-blue-700">PERSONALISED</span>
      </div>

      <div className="mt-3 grid h-[calc(100%-40px)] min-h-0 grid-cols-[minmax(0,1fr)_155px] gap-3">
        <div className="min-h-0 overflow-hidden rounded-[12px] border border-slate-200 bg-white p-3 shadow-[0_18px_38px_-30px_rgba(15,23,42,.38)]">
          <div className="text-[6px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div>
          <div className="mt-1.5 text-[9px] font-black text-slate-800">Your quote and next steps</div>
          <div className="my-3 h-px bg-slate-100" />
          <div className="text-[8px] font-semibold leading-[1.6] text-slate-600">
            <div className="flex items-center gap-1">
              <span>Hi</span>
              <span className="rounded-[5px] bg-blue-50 px-1.5 py-0.5 font-mono text-[6.5px] font-black text-blue-700 ring-1 ring-blue-100">{"{{contact.first_name}}"}</span>
              <span>,</span>
            </div>
            <p className="mt-2.5">Thanks for taking the time to speak with us. Your quote is ready and we’ve made the next step simple.</p>
            <p className="mt-2">If anything is unclear, just reply to this email and we’ll help.</p>
            <div className="mt-3 inline-flex rounded-[7px] bg-zapla-blue px-3 py-2 text-[6.5px] font-black text-white">View your quote</div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-[11px] border border-slate-200 bg-slate-50/70 p-2.5">
            <div className="text-[6px] font-black uppercase tracking-[.12em] text-slate-400">Audience</div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[7px] font-black text-slate-700"><Users className="h-3 w-3 text-blue-600" /> Open Quotes</div>
          </div>
          <div className="rounded-[11px] border border-slate-200 bg-slate-50/70 p-2.5">
            <div className="text-[6px] font-black uppercase tracking-[.12em] text-slate-400">Send</div>
            <div className="mt-1.5 flex items-center gap-1.5 text-[7px] font-black text-slate-700"><Clock3 className="h-3 w-3 text-blue-600" /> Immediately</div>
          </div>
          <div className="rounded-[11px] border border-slate-200 bg-slate-50/70 p-2.5">
            <div className="text-[6px] font-black uppercase tracking-[.12em] text-slate-400">From</div>
            <div className="mt-1.5 flex items-center justify-between text-[7px] font-black text-slate-700">North & Pine <ChevronDown className="h-3 w-3 text-slate-300" /></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TriggerPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  const stopOnReply = phase >= 4;
  const active = phase >= 5;

  return (
    <motion.div
      key="trigger"
      className="absolute inset-0 p-4"
      initial={reduced ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduced ? undefined : { opacity: 0, x: -12 }}
      transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] font-black tracking-tight text-slate-900">Set sequence trigger</div>
          <div className="mt-0.5 text-[7px] font-semibold text-slate-400">Choose who enters the sequence and what stops it.</div>
        </div>
        <motion.span
          className={
            active
              ? "inline-flex items-center gap-1.5 rounded-[8px] bg-emerald-500 px-3 py-2 text-[7.5px] font-black text-white"
              : "inline-flex items-center gap-1.5 rounded-[8px] bg-zapla-ink px-3 py-2 text-[7.5px] font-black text-white"
          }
          animate={{ scale: active ? [1, 0.97, 1] : 1 }}
          transition={{ duration: reduced ? 0 : 0.42 }}
        >
          {active ? <><Check className="h-3 w-3" /> Active</> : <><Play className="h-3 w-3" /> Activate sequence</>}
        </motion.span>
      </div>

      <div className="mt-3 space-y-2.5">
        <div className="rounded-[12px] border border-slate-200 bg-white p-3">
          <div className="text-[7px] font-black text-slate-800">When should the first email go out?</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <motion.div
              className="flex items-center gap-2 rounded-[9px] border border-blue-300 bg-blue-50/45 px-3 py-2.5"
              animate={{ boxShadow: phase === 4 ? "0 0 0 3px rgba(37,99,255,.08)" : "0 0 0 0 rgba(37,99,255,0)" }}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600"><Send className="h-2.5 w-2.5" /></span>
              <span className="text-[7px] font-black text-slate-700">Send immediately</span>
              <span className="ml-auto h-2.5 w-2.5 rounded-full border-[3px] border-blue-600 bg-white" />
            </motion.div>
            <div className="flex items-center gap-2 rounded-[9px] border border-slate-200 px-3 py-2.5 text-[7px] font-bold text-slate-400">
              <Clock3 className="h-3 w-3" /> Schedule
            </div>
          </div>
        </div>

        <div className="rounded-[12px] border border-slate-200 bg-white p-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[7px] font-black text-slate-800">Recipient</div>
              <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Who should receive this sequence?</div>
            </div>
            <span className="rounded-[8px] border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[7px] font-black text-blue-700">Open Quotes · 247 contacts</span>
          </div>
        </div>

        <motion.div
          className="rounded-[12px] border border-slate-200 bg-white p-3"
          animate={{ borderColor: stopOnReply ? "rgba(16,185,129,.34)" : "rgba(226,232,240,1)" }}
        >
          <div className="flex items-center gap-3">
            <span className={stopOnReply ? "flex h-8 w-8 items-center justify-center rounded-[9px] bg-emerald-50 text-emerald-600" : "flex h-8 w-8 items-center justify-center rounded-[9px] bg-slate-100 text-slate-400"}>
              <MessageCircleReply className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[7.5px] font-black text-slate-800">Stop on reply</div>
              <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Pause remaining emails as soon as a contact replies.</div>
            </div>
            <motion.span
              className={stopOnReply ? "relative h-5 w-9 rounded-full bg-emerald-500" : "relative h-5 w-9 rounded-full bg-slate-200"}
              animate={{ backgroundColor: stopOnReply ? "rgb(16 185 129)" : "rgb(226 232 240)" }}
            >
              <motion.span
                className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm"
                animate={{ left: stopOnReply ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              />
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function WorkingPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden bg-[#f7f8fb]">
      <div className="absolute inset-x-0 top-0 h-9 border-b border-slate-200 bg-white px-4">
        <div className="flex h-full items-center gap-2 text-[6.5px] font-bold text-slate-400">
          <Mail className="h-3 w-3" />
          <span>{phase < 2 ? "Build your email sequence" : phase < 4 ? "Template applied to your sequence" : phase < 5 ? "Configure sequence" : "Sequence ready"}</span>
          {phase >= 5 ? <span className="ml-auto inline-flex items-center gap-1 text-emerald-600"><Check className="h-3 w-3" strokeWidth={3} /> Active</span> : null}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-9">
        <AnimatePresence mode="wait" initial={false}>
          {phase <= 2 ? (
            <TemplatePanel key="templates" phase={phase} reduced={reduced} />
          ) : phase === 3 ? (
            <EmailPreviewPanel key="preview" reduced={reduced} />
          ) : (
            <TriggerPanel key="trigger" phase={phase} reduced={reduced} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "57%", top: "28%" },
    2: { left: "80%", top: "63%" },
    4: { left: "91%", top: "73%" },
    5: { left: "90%", top: "10%" },
  };

  return (
    <div className="absolute inset-0 flex min-h-0 overflow-hidden bg-white">
      <SequenceRail phase={phase} reduced={reduced} />
      <WorkingPanel phase={phase} reduced={reduced} />
      <ZaplaDemoCursor
        point={points[phase] ?? null}
        press={phase === 1 || phase === 2 || phase === 4 || phase === 5}
        reduced={reduced}
      />
    </div>
  );
}
