import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, Mail, Megaphone, Play, Send, Sparkles, TrendingUp, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const TPL = {
  winback: "/email-templates/tpl-winback.png",
  service: "/email-templates/tpl-service.png",
  followup: "/email-templates/tpl-followup.png",
  market: "/email-templates/tpl-market.png",
} as const;

/**
 * Each template is a full mini email campaign rendered in code:
 * brand bar -> photo hero -> headline -> body -> CTA.
 * Images are photo heroes only (no baked-in text) so copy stays crisp.
 */
const TEMPLATES = [
  {
    name: "Customer Win-back",
    brand: "ZAPLA STUDIO",
    image: TPL.winback,
    heroClass: "bg-slate-900",
    eyebrow: "WE MISS YOU",
    headline: "We saved your spot",
    body: "It has been a while. Your first session back is on us.",
    cta: "Book a free session",
    accent: "bg-violet-600",
    shell: "bg-white",
    bar: "bg-violet-100",
    barText: "text-violet-700",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Service Reminder",
    brand: "ZAPLA AUTO",
    image: TPL.service,
    heroClass: "bg-slate-100",
    eyebrow: "SERVICE DUE",
    headline: "Your service is due",
    body: "Keep your car running smoothly. Book in under a minute.",
    cta: "Book your service",
    accent: "bg-blue-600",
    shell: "bg-white",
    bar: "bg-slate-100",
    barText: "text-slate-700",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Appointment Follow-up",
    brand: "ZAPLA DENTAL",
    image: TPL.followup,
    heroClass: "bg-emerald-50",
    eyebrow: "A QUICK CHECK-IN",
    headline: "How is your smile?",
    body: "Time for your six-month check-up. We will make it easy.",
    cta: "Book a check-up",
    accent: "bg-teal-600",
    shell: "bg-white",
    bar: "bg-teal-50",
    barText: "text-teal-700",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Premium Update",
    brand: "ZAPLA PROPERTY",
    image: TPL.market,
    heroClass: "bg-amber-50",
    eyebrow: "MARKET UPDATE",
    headline: "Your spring market update",
    body: "What your suburb did this quarter, in two minutes.",
    cta: "Read the report",
    accent: "bg-amber-600",
    shell: "bg-white",
    bar: "bg-amber-50",
    barText: "text-amber-700",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
] as const;

const FLOW = [
  {
    label: "EMAIL 1",
    title: "Welcome back",
    subject: "We saved your spot",
    preview: "Your first session back is on us.",
    cta: "Book free session",
    result: "Sent Tue 9:00am",
  },
  {
    label: "EMAIL 2",
    title: "Gentle reminder",
    subject: "Still thinking it over?",
    preview: "A short nudge with the offer top of mind.",
    cta: "View offer",
    result: "Opened 41%",
  },
  {
    label: "EMAIL 3",
    title: "Last touch",
    subject: "One last reminder",
    preview: "A final nudge before the sequence wraps up.",
    cta: "Come back",
    result: "212 bookings",
  },
] as const;

const LANDED_PHASES = [6, 8, 10] as const;

function TemplatePreview({
  template,
  compact = false,
}: {
  template: (typeof TEMPLATES)[number];
  compact?: boolean;
}) {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-[11px] ${template.shell}`}>
      {/* brand bar */}
      <div
        className={
          compact
            ? `flex h-[10px] shrink-0 items-center gap-1 px-1.5 ${template.bar}`
            : `flex h-[18px] shrink-0 items-center gap-1.5 px-2.5 ${template.bar}`
        }
      >
        <span
          className={
            compact
              ? "h-[3px] w-[3px] rounded-[1px] bg-current opacity-70"
              : "h-[5px] w-[5px] rounded-[1.5px] bg-current opacity-70"
          }
          style={{ color: "inherit" }}
        />
        <span
          className={
            compact
              ? `text-[3.2px] font-black tracking-[.14em] ${template.barText}`
              : `text-[5px] font-black tracking-[.16em] ${template.barText}`
          }
        >
          {template.brand}
        </span>
      </div>

      {/* photo hero */}
      <div className={compact ? "h-[42%] shrink-0 overflow-hidden" : "h-[40%] shrink-0 overflow-hidden"}>
        <img src={template.image} alt="" className="h-full w-full object-cover" />
      </div>

      {/* copy */}
      <div className={compact ? "min-h-0 flex-1 px-1.5 py-1" : "min-h-0 flex-1 px-2.5 py-1.5"}>
        <div
          className={
            compact
              ? `text-[3px] font-black uppercase tracking-[.12em] ${template.muted}`
              : `text-[4.6px] font-black uppercase tracking-[.16em] ${template.muted}`
          }
        >
          {template.eyebrow}
        </div>
        <div
          className={
            compact
              ? `mt-0.5 text-[5.2px] font-black leading-[1.05] ${template.text}`
              : `mt-0.5 text-[9px] font-black leading-[1.05] ${template.text}`
          }
        >
          {template.headline}
        </div>
        {!compact ? (
          <div className={`mt-0.5 truncate text-[5.2px] font-semibold leading-[1.3] ${template.muted}`}>
            {template.body}
          </div>
        ) : null}
        <div
          className={
            compact
              ? `mt-1 inline-flex rounded-[3px] ${template.accent} px-1.5 py-0.5 text-[3.3px] font-black text-white`
              : `mt-1 inline-flex rounded-[5px] ${template.accent} px-2 py-[3px] text-[5.6px] font-black text-white`
          }
        >
          {template.cta}
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-2 w-px bg-slate-200" />;
}

function WaitChip({ label }: { label: string }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[7px] font-bold text-slate-500 shadow-[0_8px_22px_-18px_rgba(15,23,42,.4)]">
      <Clock3 className="h-2.5 w-2.5 text-blue-500" /> {label}
    </div>
  );
}

function targetEmailForPhase(phase: number) {
  if (phase <= 5) return 0;
  if (phase <= 7) return 1;
  if (phase <= 9) return 2;
  return -1;
}

function EmailNode({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= LANDED_PHASES[index];
  const active = phase >= 11;
  const target = !filled && targetEmailForPhase(phase) === index;

  return (
    <motion.div
      className="relative mx-auto flex h-[74px] w-[370px] max-w-[96%] items-center gap-3 overflow-hidden rounded-[15px] border bg-white px-3.5 shadow-[0_14px_34px_-28px_rgba(15,23,42,.45)]"
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
      <div className="flex h-[54px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-slate-100">
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
            {active ? (
              <motion.span
                initial={reduced ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.15 + index * 0.22 }}
                className="mt-1.5 inline-flex items-center gap-1 rounded-[5px] bg-emerald-50 px-2 py-0.5 text-[6px] font-black text-emerald-700"
              >
                <TrendingUp className="h-2 w-2" />
                {FLOW[index].result}
              </motion.span>
            ) : (
              <span className="mt-1.5 inline-flex rounded-[5px] bg-blue-50 px-2 py-0.5 text-[6px] font-black text-blue-700">
                {FLOW[index].cta}
              </span>
            )}
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

/** Beat 1: the owner's intent, monday-style person card. */
function IntentCard({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase <= 1;
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute left-1/2 top-1/2 z-40 w-[340px] max-w-[86%] -translate-x-1/2 -translate-y-1/2"
          initial={reduced ? false : { opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="rounded-[20px] border border-white/60 bg-white/70 p-4 shadow-[0_30px_80px_-30px_rgba(15,23,42,.45)] backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-[10px] font-black text-white">
                SM
              </span>
              <div>
                <div className="text-[10px] font-black text-slate-900">Sam, Studio Owner</div>
                <div className="text-[6.5px] font-semibold text-slate-400">asks Zapla</div>
              </div>
              <Sparkles className="ml-auto h-3.5 w-3.5 text-violet-500" />
            </div>
            <div className="mt-3 rounded-[12px] bg-white/80 px-3.5 py-3 text-[11px] font-semibold leading-relaxed text-slate-700 shadow-inner">
              Win back members who have not booked in 90 days.
            </div>
            <motion.div
              className="mt-3 flex items-center gap-1.5 text-[7px] font-bold text-violet-600"
              animate={reduced ? {} : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <Sparkles className="h-2.5 w-2.5" />
              Zapla is building the campaign...
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CampaignBuilder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const allReady = phase >= 10;
  const active = phase >= 11;
  const visible = phase >= 2;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute bottom-[5%] left-[3.5%] top-[5%] z-10 w-[55%]"
          initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.82, 0.24, 1] }}
        >
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TemplateTray({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase >= 3 && phase <= 10;
  const selected = phase >= 4;
  const applying = phase >= 5 && phase <= 9;
  const completed = phase >= 10;
  const flight = phase === 5 || phase === 7 || phase === 9;

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
                      ? "relative flex min-h-0 flex-col overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-1.5 shadow-[0_18px_42px_-24px_rgba(37,99,255,.72)]"
                      : "relative flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white p-1.5 shadow-[0_14px_34px_-28px_rgba(15,23,42,.42)]"
                  }
                  initial={reduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{
                    opacity: flight && isSelected ? 0.72 : dim ? 0.52 : 1,
                    y: isSelected && !flight ? -2 : 0,
                    scale: isSelected && !flight ? 1.015 : 1,
                  }}
                  transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : index * 0.045 }}
                >
                  <div className="mb-1 truncate px-0.5 text-[7.5px] font-black text-slate-700">{template.name}</div>
                  <div className="min-h-0 flex-1 overflow-hidden rounded-[10px] border border-slate-100">
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
  const flightIndex = phase === 5 ? 0 : phase === 7 ? 1 : phase === 9 ? 2 : -1;
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

/** Beat 4: outcome summary, monday-style result card. */
function LiveSummary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 11 ? (
        <motion.div
          className="absolute right-[5.5%] top-[22%] z-20 w-[30%] rounded-[20px] border border-white/60 bg-white/70 p-5 shadow-[0_28px_70px_-30px_rgba(15,23,42,.5)] backdrop-blur-xl"
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
            <Send className="h-4.5 w-4.5" strokeWidth={2.5} />
          </motion.div>
          <div className="mt-4 text-[14px] font-black tracking-tight text-slate-900">Win-back is live</div>
          <div className="mt-1 text-[8px] font-semibold leading-relaxed text-slate-500">
            Zapla is running the whole sequence and reporting back.
          </div>
          <div className="mt-4 space-y-2">
            <motion.div
              className="flex items-center justify-between rounded-[10px] bg-white/80 px-3 py-2.5"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.2 }}
            >
              <span className="text-[7px] font-bold text-slate-500">Customers queued</span>
              <span className="text-[8px] font-black text-slate-800">1,284</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-between rounded-[10px] bg-white/80 px-3 py-2.5"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.38 }}
            >
              <span className="text-[7px] font-bold text-slate-500">Bookings recovered</span>
              <span className="text-[8px] font-black text-emerald-600">212</span>
            </motion.div>
            <motion.div
              className="flex items-center justify-between rounded-[10px] bg-white/80 px-3 py-2.5"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.56 }}
            >
              <span className="text-[7px] font-bold text-slate-500">Revenue won back</span>
              <span className="text-[8px] font-black text-emerald-600">$18,400</span>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    3: { left: "69%", top: "27%" },
    4: { left: "69%", top: "27%" },
    11: { left: "31%", top: "92%" },
  };

  const press = phase === 4 || phase === 11;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <IntentCard phase={phase} reduced={reduced} />
      <CampaignBuilder phase={phase} reduced={reduced} />
      <TemplateTray phase={phase} reduced={reduced} />
      <FlyingTemplate phase={phase} reduced={reduced} />
      <LiveSummary phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={press} reduced={reduced} />
    </div>
  );
}
