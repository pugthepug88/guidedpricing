import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, Mail, Megaphone, Play, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import automotiveVisual from "@/assets/industry-automotive.png.asset.json";
import healthcareVisual from "@/assets/industry-healthcare.png.asset.json";
import realEstateVisual from "@/assets/industry-real-estate.png.asset.json";
import fitnessVisual from "@/assets/industry-fitness.png.asset.json";

const TEMPLATES = [
  {
    name: "Customer Win-back",
    image: fitnessVisual.url,
    eyebrow: "WELCOME BACK",
    headline: "Ready when you are",
    body: "A warm reactivation email with one clear reason to return.",
    cta: "Book again",
    shell: "bg-[#f7f4ff]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Service Reminder",
    image: automotiveVisual.url,
    eyebrow: "TIME FOR A CHECK-IN",
    headline: "Keep things running smoothly",
    body: "A practical reminder designed to turn due service into a booking.",
    cta: "Book service",
    shell: "bg-[#f3f7fb]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Appointment Follow-up",
    image: healthcareVisual.url,
    eyebrow: "A QUICK CHECK-IN",
    headline: "How are you feeling?",
    body: "A calm follow-up that makes the next appointment easy to book.",
    cta: "Book a visit",
    shell: "bg-[#f3fbf8]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Premium Update",
    image: realEstateVisual.url,
    eyebrow: "JUST IN",
    headline: "Your latest market update",
    body: "A polished update for clients who want useful news, not inbox noise.",
    cta: "View update",
    shell: "bg-[#fff8f2]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
] as const;

const FLOW = [
  {
    label: "EMAIL 1",
    title: "Welcome back",
    subject: "We'd love to see you again",
    preview: "A friendly re-introduction with one clear reason to return.",
    cta: "Book again",
  },
  {
    label: "EMAIL 2",
    title: "Gentle reminder",
    subject: "Just checking in",
    preview: "A short follow-up that keeps the offer top of mind.",
    cta: "View offer",
  },
  {
    label: "EMAIL 3",
    title: "Last touch",
    subject: "One last reminder",
    preview: "A final nudge before the win-back sequence wraps up.",
    cta: "Come back",
  },
] as const;

const LANDED_PHASES = [5, 7, 9] as const;

function TemplatePreview({
  template,
  compact = false,
}: {
  template: (typeof TEMPLATES)[number];
  compact?: boolean;
}) {
  return (
    <div className={`h-full w-full overflow-hidden rounded-[11px] ${template.shell}`}>
      <div className={compact ? "flex h-[12px] items-center px-1.5" : "flex h-[24px] items-center px-2.5"}>
        <span
          className={
            compact
              ? `text-[3.4px] font-black tracking-[.12em] ${template.text}`
              : `text-[5.5px] font-black tracking-[.14em] ${template.text}`
          }
        >
          ZAPLA CAMPAIGN
        </span>
        {!compact ? (
          <span className={`ml-auto text-[4.5px] font-bold ${template.muted}`}>Preview</span>
        ) : null}
      </div>

      <div className={compact ? "h-[44%] overflow-hidden" : "h-[45%] overflow-hidden"}>
        <img src={template.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className={compact ? "px-1.5 py-1" : "px-3 py-2.5"}>
        <div
          className={
            compact
              ? `text-[3.1px] font-black uppercase tracking-[.12em] ${template.muted}`
              : `text-[5px] font-black uppercase tracking-[.16em] ${template.muted}`
          }
        >
          {template.eyebrow}
        </div>
        <div
          className={
            compact
              ? `mt-0.5 text-[5.3px] font-black leading-[1.05] ${template.text}`
              : `mt-1 text-[9.5px] font-black leading-[1.05] ${template.text}`
          }
        >
          {template.headline}
        </div>
        {!compact ? (
          <div className={`mt-1.5 text-[5.7px] font-semibold leading-[1.35] ${template.muted}`}>
            {template.body}
          </div>
        ) : null}
        <div
          className={
            compact
              ? "mt-1 inline-flex rounded-[3px] bg-zapla-blue px-1.5 py-0.5 text-[3.4px] font-black text-white"
              : "mt-2 inline-flex rounded-[7px] bg-zapla-blue px-3 py-1.5 text-[6.5px] font-black text-white"
          }
        >
          {template.cta}
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-2.5 w-px bg-slate-200" />;
}

function WaitChip({ label }: { label: string }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[7px] font-bold text-slate-500 shadow-[0_8px_22px_-18px_rgba(15,23,42,.4)]">
      <Clock3 className="h-2.5 w-2.5 text-blue-500" /> {label}
    </div>
  );
}

function targetEmailForPhase(phase: number) {
  if (phase <= 4) return 0;
  if (phase <= 6) return 1;
  if (phase <= 8) return 2;
  return -1;
}

function EmailNode({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= LANDED_PHASES[index];
  const active = phase >= 10;
  const target = !filled && targetEmailForPhase(phase) === index;

  return (
    <motion.div
      className="relative mx-auto flex h-[78px] w-[370px] max-w-[96%] items-center gap-3 overflow-hidden rounded-[15px] border bg-white px-3.5 shadow-[0_14px_34px_-28px_rgba(15,23,42,.45)]"
      initial={false}
      animate={{
        borderColor: active
          ? "rgba(16,185,129,.38)"
          : target
            ? "rgba(96,165,250,.92)"
            : filled
              ? "rgba(191,219,254,.9)"
              : "rgba(226,232,240,1)",
        boxShadow: target
          ? "0 0 0 4px rgba(37,99,255,.07), 0 14px 34px -28px rgba(15,23,42,.45)"
          : "0 14px 34px -28px rgba(15,23,42,.45)",
      }}
      transition={{ duration: reduced ? 0 : 0.28 }}
    >
      <div className="flex h-[56px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-slate-100">
        {filled ? (
          <motion.div
            key={`template-${index}`}
            className="h-full w-full"
            initial={reduced ? false : { opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
          >
            <TemplatePreview template={TEMPLATES[0]} compact />
          </motion.div>
        ) : (
          <Mail className={target ? "h-5 w-5 text-blue-400" : "h-5 w-5 text-slate-300"} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[6.5px] font-black uppercase tracking-[.14em] text-slate-400">{FLOW[index].label}</div>
        {filled ? (
          <motion.div
            key={`copy-${index}`}
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.05 }}
          >
            <div className="mt-1 truncate text-[9.5px] font-black text-slate-800">{FLOW[index].subject}</div>
            <div className="mt-1 truncate text-[7px] font-medium text-slate-500">{FLOW[index].preview}</div>
            <span className="mt-1.5 inline-flex rounded-[5px] bg-blue-50 px-2 py-0.5 text-[6px] font-black text-blue-700">
              {FLOW[index].cta}
            </span>
          </motion.div>
        ) : (
          <>
            <div className="mt-1 text-[9.5px] font-black text-slate-800">{FLOW[index].title}</div>
            <div
              className={
                target
                  ? "mt-1.5 inline-flex items-center gap-1 rounded-[6px] bg-blue-50 px-2 py-1 text-[6.5px] font-black text-blue-700"
                  : "mt-1.5 inline-flex items-center gap-1 rounded-[6px] bg-slate-50 px-2 py-1 text-[6.5px] font-black text-slate-400"
              }
            >
              <LayoutTemplate className="h-2.5 w-2.5" />
              {target ? "Template will apply here" : "Waiting"}
            </div>
          </>
        )}
      </div>

      {active ? (
        <motion.span
          initial={reduced ? false : { opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </motion.span>
      ) : filled ? (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      ) : null}
    </motion.div>
  );
}

function CampaignBuilder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const allReady = phase >= 9;
  const active = phase >= 10;

  return (
    <div className="absolute bottom-[5%] left-[3.5%] top-[5%] z-10 w-[55%]">
      <div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-violet-50 text-violet-600">
              <Megaphone className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[12px] font-black tracking-tight text-slate-900">Customer Win-back</div>
              <div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">Email marketing campaign</div>
            </div>
          </div>
          <motion.span
            className={
              active
                ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[7px] font-black text-emerald-700"
                : allReady
                  ? "rounded-full bg-blue-50 px-2.5 py-1 text-[7px] font-black text-blue-700"
                  : "rounded-full bg-slate-100 px-2.5 py-1 text-[7px] font-black text-slate-500"
            }
            animate={{ scale: active ? [1, 1.06, 1] : 1 }}
          >
            {active ? "ACTIVE" : allReady ? "READY" : "DRAFT"}
          </motion.span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2 rounded-[10px] bg-slate-50 px-3 py-2.5">
            <Users className="h-3.5 w-3.5 text-blue-600" />
            <div>
              <div className="text-[5.5px] font-black uppercase tracking-[.12em] text-slate-400">AUDIENCE</div>
              <div className="mt-0.5 text-[8px] font-black text-slate-700">1,284 past customers</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-[10px] bg-slate-50 px-3 py-2.5">
            <Mail className="h-3.5 w-3.5 text-violet-600" />
            <div>
              <div className="text-[5.5px] font-black uppercase tracking-[.12em] text-slate-400">SEQUENCE</div>
              <div className="mt-0.5 text-[8px] font-black text-slate-700">3 emails · 5 days</div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
          <EmailNode index={0} phase={phase} reduced={reduced} />
          <Connector />
          <WaitChip label="Wait 2 days" />
          <Connector />
          <EmailNode index={1} phase={phase} reduced={reduced} />
          <Connector />
          <WaitChip label="Wait 3 days" />
          <Connector />
          <EmailNode index={2} phase={phase} reduced={reduced} />
        </div>

        <div className="mt-2 flex justify-center">
          <motion.div
            className={
              active
                ? "inline-flex items-center gap-1.5 rounded-[10px] bg-emerald-500 px-4 py-2.5 text-[8px] font-black text-white"
                : allReady
                  ? "inline-flex items-center gap-1.5 rounded-[10px] bg-zapla-ink px-4 py-2.5 text-[8px] font-black text-white shadow-[0_10px_28px_-18px_rgba(15,23,42,.65)]"
                  : "inline-flex items-center gap-1.5 rounded-[10px] bg-slate-200 px-4 py-2.5 text-[8px] font-black text-slate-500"
            }
            animate={
              active
                ? { scale: [1, 0.97, 1] }
                : allReady && !reduced
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(37,99,255,0)",
                        "0 0 0 7px rgba(37,99,255,.10)",
                        "0 0 0 0 rgba(37,99,255,0)",
                      ],
                    }
                  : {}
            }
            transition={{ duration: 1.25, repeat: allReady && !active && !reduced ? Infinity : 0 }}
          >
            {active ? (
              <>
                <Check className="h-3.5 w-3.5" /> Campaign active
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Activate campaign
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TemplateTray({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase >= 1 && phase <= 9;
  const selected = phase >= 3;
  const applying = phase >= 4 && phase <= 8;
  const completed = phase >= 9;
  const flight = phase === 4 || phase === 6 || phase === 8;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute bottom-[7%] right-[3.5%] top-[7%] z-30 w-[36.5%] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_32px_80px_-38px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, x: 56, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 34, scale: 0.99 }}
          transition={{ duration: reduced ? 0 : 0.38, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-violet-50 text-violet-600">
              <LayoutTemplate className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black text-slate-900">
                {completed ? "Applied to all 3 emails" : applying ? "Applying across the sequence" : "Choose a campaign style"}
              </div>
              <div className="mt-0.5 truncate text-[6.5px] font-semibold text-slate-400">
                {completed ? "The whole sequence is ready to launch." : "Pick once. Zapla applies it to the whole sequence."}
              </div>
            </div>
            {selected ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            ) : null}
          </div>

          <div className="grid h-[calc(100%-44px)] grid-cols-2 gap-2.5">
            {TEMPLATES.map((template, index) => {
              const isSelected = selected && index === 0;
              const dim = selected && index !== 0;
              return (
                <motion.div
                  key={template.name}
                  className={
                    isSelected
                      ? "relative flex min-h-0 flex-col overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-2 shadow-[0_18px_42px_-24px_rgba(37,99,255,.72)]"
                      : "relative flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white p-2 shadow-[0_14px_34px_-28px_rgba(15,23,42,.42)]"
                  }
                  initial={reduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{
                    opacity: flight && isSelected ? 0.72 : dim ? 0.52 : 1,
                    y: isSelected && !flight ? -2 : 0,
                    scale: isSelected && !flight ? 1.015 : 1,
                  }}
                  transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : index * 0.045 }}
                >
                  <div className="mb-1.5 truncate text-[7.5px] font-black text-slate-700">{template.name}</div>
                  <div className="min-h-0 flex-1 overflow-hidden rounded-[10px]">
                    <TemplatePreview template={template} />
                  </div>
                  {isSelected && !flight ? (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FlyingTemplate({ phase, reduced }: { phase: number; reduced: boolean }) {
  const flightIndex = phase === 4 ? 0 : phase === 6 ? 1 : phase === 8 ? 2 : -1;
  if (flightIndex < 0) return null;

  const targets = [
    { left: "8.2%", top: "31.0%" },
    { left: "8.2%", top: "54.0%" },
    { left: "8.2%", top: "77.0%" },
  ] as const;
  const target = targets[flightIndex as 0 | 1 | 2];

  return (
    <motion.div
      key={`flight-${flightIndex}`}
      className="absolute z-50 overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_24px_64px_-28px_rgba(37,99,255,.62)]"
      style={{ left: "62.5%", top: "19.5%", width: "15.5%", height: "29%" }}
      initial={reduced ? false : { opacity: 1, scale: 1 }}
      animate={{
        left: target.left,
        top: target.top,
        width: "7.3%",
        height: "9.4%",
        borderRadius: "10px",
        opacity: [1, 1, 1, 0.96],
      }}
      transition={{ duration: reduced ? 0 : 0.9, ease: [0.18, 0.82, 0.2, 1] }}
    >
      <TemplatePreview template={TEMPLATES[0]} />
    </motion.div>
  );
}

function LiveSummary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 10 ? (
        <motion.div
          className="absolute right-[5.5%] top-[25%] z-20 w-[30%] rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white"
            initial={reduced ? false : { scale: 0.5, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: reduced ? 0 : 0.36, delay: reduced ? 0 : 0.08 }}
          >
            <Check className="h-5 w-5" strokeWidth={3} />
          </motion.div>
          <div className="mt-4 text-[14px] font-black tracking-tight text-slate-900">Campaign active</div>
          <div className="mt-1 text-[8px] font-semibold leading-relaxed text-slate-500">
            Zapla has the whole win-back sequence queued and ready to run.
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-[10px] bg-slate-50 px-3 py-2.5">
              <span className="text-[7px] font-bold text-slate-500">Customers queued</span>
              <span className="text-[8px] font-black text-slate-800">1,284</span>
            </div>
            <div className="flex items-center justify-between rounded-[10px] bg-slate-50 px-3 py-2.5">
              <span className="text-[7px] font-bold text-slate-500">Emails scheduled</span>
              <span className="text-[8px] font-black text-slate-800">3 over 5 days</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "69%", top: "27%" },
    2: { left: "69%", top: "27%" },
    3: { left: "69%", top: "27%" },
    10: { left: "31%", top: "92%" },
  };

  const press = phase === 3 || phase === 10;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <CampaignBuilder phase={phase} reduced={reduced} />
      <TemplateTray phase={phase} reduced={reduced} />
      <FlyingTemplate phase={phase} reduced={reduced} />
      <LiveSummary phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={press} reduced={reduced} />
    </div>
  );
}
