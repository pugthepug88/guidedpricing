import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronRight, Clock3, LayoutTemplate, Mail, Megaphone, Play, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";

const AUDIENCES = [
  { name: "Clients gone quiet", contacts: "312 contacts", note: "No visit in 90+ days" },
  { name: "VIP Clients", contacts: "124 contacts", note: "High spend and repeat bookings" },
  { name: "Open Quotes", contacts: "86 contacts", note: "Quote sent, no reply yet" },
  { name: "Recent Clients", contacts: "468 contacts", note: "Booked in the last 30 days" },
] as const;

const TEMPLATES = [
  {
    name: "Welcome back",
    image: "/email-campaigns/winback.svg",
    subject: "We’d love to see you again",
    eyebrow: "REACTIVATION",
    cta: "Book again",
    shell: "from-fuchsia-50 to-rose-50",
  },
  {
    name: "Service reminder",
    image: "/email-campaigns/service.svg",
    subject: "Your next service is due",
    eyebrow: "SERVICE REMINDER",
    cta: "Book service",
    shell: "from-blue-50 to-slate-50",
  },
  {
    name: "Follow-up",
    image: "/email-campaigns/followup.svg",
    subject: "Just checking in",
    eyebrow: "FOLLOW-UP",
    cta: "Book a visit",
    shell: "from-emerald-50 to-teal-50",
  },
  {
    name: "Premium update",
    image: "/email-campaigns/premium.svg",
    subject: "An exclusive update for you",
    eyebrow: "PREMIUM UPDATE",
    cta: "View update",
    shell: "from-amber-50 to-orange-50",
  },
] as const;

const FLOW = [
  {
    label: "EMAIL 1",
    subject: "We’d love to see you again",
    preview: "A warm opener with one clear reason to return.",
    timing: "Send now",
    cta: "Book again",
  },
  {
    label: "EMAIL 2",
    subject: "Still thinking about it?",
    preview: "A short follow-up that keeps the offer top of mind.",
    timing: "After 2 days",
    cta: "View offer",
  },
  {
    label: "EMAIL 3",
    subject: "One last reminder",
    preview: "A final nudge before the sequence wraps up.",
    timing: "After 5 days",
    cta: "Come back",
  },
] as const;

const SELECTED_AUDIENCE = AUDIENCES[0];
const SELECTED_TEMPLATE = TEMPLATES[0];
const LANDED = [5, 6, 7] as const;

function SegmentChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <span
      className={
        active
          ? "inline-flex items-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2 py-1 text-[6px] font-black text-fuchsia-700"
          : "inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-[6px] font-black text-slate-500"
      }
    >
      {label}
    </span>
  );
}

function TemplateThumb({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

function ComposerPanel({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase <= 2;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute bottom-[8%] right-[3.5%] top-[8%] z-30 w-[36.5%] rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_32px_80px_-40px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, x: 40, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 22 }}
          transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-50 text-blue-600">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[10px] font-black text-slate-900">New email</div>
              <div className="text-[6.5px] font-semibold text-slate-400">Choose a group, add a subject, then select a template.</div>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <div className="rounded-[14px] border border-slate-200 bg-slate-50 px-3 py-2.5">
              <div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">To</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <SegmentChip label="Clients gone quiet" active />
                <SegmentChip label="VIP Clients" />
                <SegmentChip label="Open Quotes" />
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-200 bg-white px-3 py-2.5">
              <div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">Subject</div>
              <div className="mt-2 text-[8.5px] font-black text-slate-800">We’d love to see you again</div>
            </div>

            <div className="rounded-[14px] border border-slate-200 bg-white px-3 py-3">
              <div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">Body</div>
              <div className="mt-2 space-y-1.5">
                <div className="h-2 rounded-full bg-slate-100" />
                <div className="h-2 w-[92%] rounded-full bg-slate-100" />
                <div className="h-2 w-[86%] rounded-full bg-slate-100" />
                <div className="h-2 w-[76%] rounded-full bg-slate-100" />
              </div>
              <div className="mt-3 rounded-[12px] bg-fuchsia-50 px-3 py-2">
                <div className="text-[7px] font-semibold text-fuchsia-800">{"Hi {{first_name}}, it’s been a little while since your last visit. We’d love to welcome you back."}</div>
              </div>
            </div>

            <div className="rounded-[14px] border border-slate-200 bg-white p-2.5">
              <div className="mb-1.5 px-1 text-[6px] font-black uppercase tracking-[.16em] text-slate-400">Saved segments</div>
              <div className="space-y-1.5">
                {AUDIENCES.map((audience, index) => {
                  const selected = index === 0;
                  return (
                    <motion.div
                      key={audience.name}
                      className={selected ? "flex items-center gap-2 rounded-[12px] border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-2" : "flex items-center gap-2 rounded-[12px] border border-slate-200 bg-slate-50 px-2.5 py-2"}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: phase === 2 && selected ? 0.6 : 1, y: 0 }}
                      transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : index * 0.04 }}
                    >
                      <span className={selected ? "flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-600 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400"}>
                        <Users className="h-3 w-3" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[7.5px] font-black text-slate-800">{audience.name}</div>
                        <div className="truncate text-[6px] font-semibold text-slate-500">{audience.contacts} · {audience.note}</div>
                      </div>
                      {selected ? <span className="rounded-full bg-white px-1.5 py-0.5 text-[5.5px] font-black text-fuchsia-700">Selected</span> : null}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AudienceChip() {
  return (
    <div className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-2.5 py-1.5 text-[6.5px] font-black text-fuchsia-700">
      <Users className="h-3 w-3" />
      <span className="truncate">To: {SELECTED_AUDIENCE.name}</span>
      <span className="rounded-full bg-white px-1.5 py-0.5 text-[5.5px]">{SELECTED_AUDIENCE.contacts}</span>
    </div>
  );
}

function AudienceBox({ phase }: { phase: number }) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5">
      <div className="text-[5.5px] font-black uppercase tracking-[.12em] text-slate-400">Audience</div>
      {phase >= 2 ? (
        <div className="mt-2">
          <AudienceChip />
          <div className="mt-1 text-[7px] font-semibold text-slate-500">{SELECTED_AUDIENCE.note}</div>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-dashed border-slate-200 bg-white px-3 py-3 text-[7px] font-semibold text-slate-400">
          <Users className="h-3.5 w-3.5" /> Select recipients
        </div>
      )}
    </div>
  );
}

function TemplateSummary({ phase }: { phase: number }) {
  return (
    <div className="rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2.5">
      <div className="text-[5.5px] font-black uppercase tracking-[.12em] text-slate-400">Template</div>
      {phase >= 4 ? (
        <div className="mt-2 flex items-center gap-2">
          <div className="h-[42px] w-[58px] overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-sm">
            <TemplateThumb src={SELECTED_TEMPLATE.image} alt={SELECTED_TEMPLATE.name} />
          </div>
          <div className="min-w-0">
            <div className="truncate text-[8px] font-black text-slate-800">{SELECTED_TEMPLATE.name}</div>
            <div className="truncate text-[6.5px] font-semibold text-slate-500">{SELECTED_TEMPLATE.subject}</div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2 rounded-[10px] border border-dashed border-slate-200 bg-white px-3 py-3 text-[7px] font-semibold text-slate-400">
          <LayoutTemplate className="h-3.5 w-3.5" /> Pick a template next
        </div>
      )}
    </div>
  );
}

function EmailNode({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const filled = phase >= LANDED[index];
  const active = phase >= 9;
  const target = phase === 4 + index;

  return (
    <motion.div
      className="relative mx-auto flex h-[82px] w-[378px] max-w-[96%] items-center gap-3 rounded-[16px] border bg-white px-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,.45)]"
      initial={false}
      animate={{
        borderColor: active ? "rgba(16,185,129,.35)" : target ? "rgba(99,102,241,.45)" : filled ? "rgba(191,219,254,.9)" : "rgba(226,232,240,1)",
        boxShadow: target ? "0 0 0 4px rgba(99,102,241,.07), 0 14px 34px -28px rgba(15,23,42,.45)" : "0 14px 34px -28px rgba(15,23,42,.45)",
      }}
      transition={{ duration: reduced ? 0 : 0.26 }}
    >
      <div className="flex h-[58px] w-[82px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-slate-200 bg-slate-50">
        {filled ? (
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.28 }}
          >
            <TemplateThumb src={SELECTED_TEMPLATE.image} alt={SELECTED_TEMPLATE.name} />
          </motion.div>
        ) : (
          <Mail className={target ? "h-5 w-5 text-violet-400" : "h-5 w-5 text-slate-300"} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-[6px] font-black uppercase tracking-[.14em] text-slate-400">
          <span>{FLOW[index].label}</span>
          {filled ? <span className="rounded-full bg-fuchsia-50 px-1.5 py-0.5 text-[5.5px] tracking-normal text-fuchsia-700">{SELECTED_AUDIENCE.name}</span> : null}
        </div>

        {filled ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.24 }}
          >
            <div className="mt-1 truncate text-[9.5px] font-black text-slate-800">{FLOW[index].subject}</div>
            <div className="mt-1 truncate text-[7px] font-medium text-slate-500">{FLOW[index].preview}</div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="inline-flex rounded-[6px] bg-slate-100 px-2 py-0.5 text-[6px] font-black text-slate-500">{FLOW[index].timing}</span>
              <span className="inline-flex rounded-[6px] bg-blue-50 px-2 py-0.5 text-[6px] font-black text-blue-700">{FLOW[index].cta}</span>
            </div>
          </motion.div>
        ) : (
          <div>
            <div className="mt-1 text-[9px] font-black text-slate-800">Waiting for template</div>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-[6px] bg-slate-50 px-2 py-1 text-[6.5px] font-black text-slate-400">
              <LayoutTemplate className="h-2.5 w-2.5" /> Drop template here
            </div>
          </div>
        )}
      </div>

      {active ? (
        <motion.span initial={reduced ? false : { opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
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

function CampaignBuilder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const ready = phase >= 8;
  const active = phase >= 9;

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
          <motion.span className={active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[7px] font-black text-emerald-700" : ready ? "rounded-full bg-blue-50 px-2.5 py-1 text-[7px] font-black text-blue-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-[7px] font-black text-slate-500"} animate={{ scale: active ? [1, 1.05, 1] : 1 }}>
            {active ? "ACTIVE" : ready ? "READY" : "DRAFT"}
          </motion.span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <AudienceBox phase={phase} />
          <TemplateSummary phase={phase} />
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
            className={active ? "inline-flex items-center gap-1.5 rounded-[10px] bg-emerald-500 px-4 py-2.5 text-[8px] font-black text-white" : ready ? "inline-flex items-center gap-1.5 rounded-[10px] bg-zapla-ink px-4 py-2.5 text-[8px] font-black text-white shadow-[0_10px_28px_-18px_rgba(15,23,42,.65)]" : "inline-flex items-center gap-1.5 rounded-[10px] bg-slate-200 px-4 py-2.5 text-[8px] font-black text-slate-500"}
            animate={active ? { scale: [1, 0.98, 1] } : {}}
          >
            {active ? <><Check className="h-3.5 w-3.5" /> Campaign active</> : ready ? <><Play className="h-3.5 w-3.5" /> Activate campaign</> : <><ChevronRight className="h-3.5 w-3.5" /> Build sequence</>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TemplateTray({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase >= 3 && phase <= 8;
  const selected = phase >= 4;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute bottom-[7%] right-[3.5%] top-[7%] z-30 w-[36.5%] rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_32px_80px_-40px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, x: 40, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 22 }}
          transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-violet-50 text-violet-600">
              <LayoutTemplate className="h-4 w-4" />
            </span>
            <div>
              <div className="text-[10px] font-black text-slate-900">Browse email templates</div>
              <div className="text-[6.5px] font-semibold text-slate-400">Pick a creative for the selected group.</div>
            </div>
          </div>

          <div className="grid h-[calc(100%-48px)] grid-cols-2 gap-3">
            {TEMPLATES.map((template, index) => {
              const isSelected = selected && index === 0;
              const dim = selected && index !== 0;
              return (
                <motion.div
                  key={template.name}
                  className={isSelected ? "relative overflow-hidden rounded-[16px] border-2 border-fuchsia-300 bg-white p-2 shadow-[0_18px_42px_-26px_rgba(168,85,247,.35)]" : "relative overflow-hidden rounded-[16px] border border-slate-200 bg-white p-2 shadow-[0_14px_34px_-28px_rgba(15,23,42,.18)]"}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: dim ? 0.62 : 1, y: 0, scale: isSelected ? 1.015 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.22, delay: reduced ? 0 : index * 0.04 }}
                >
                  <div className={`rounded-[12px] bg-gradient-to-br ${template.shell} p-1.5`}>
                    <div className="overflow-hidden rounded-[10px] border border-white/70 bg-white shadow-sm">
                      <div className="h-[145px] overflow-hidden">
                        <TemplateThumb src={template.image} alt={template.name} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[6px] font-black uppercase tracking-[.16em] text-slate-400">{template.eyebrow}</div>
                  <div className="mt-1 truncate text-[8px] font-black text-slate-800">{template.name}</div>
                  <div className="mt-0.5 text-[6.5px] font-semibold text-slate-500">{template.subject}</div>
                  {isSelected ? <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-600 text-white shadow-md"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span> : null}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DragGhost({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 4 || phase > 7) return null;

  const targets: Record<number, { top: string; left: string }> = {
    4: { top: "33%", left: "56%" },
    5: { top: "33%", left: "18%" },
    6: { top: "47%", left: "18%" },
    7: { top: "61%", left: "18%" },
  };

  const target = targets[phase];

  return (
    <motion.div
      className="pointer-events-none absolute z-40 w-[148px] rounded-[16px] border border-fuchsia-200 bg-white p-2 shadow-[0_26px_60px_-30px_rgba(15,23,42,.45)]"
      initial={reduced ? false : { left: "76%", top: "26%", scale: 0.96, rotate: -3, opacity: 0 }}
      animate={{ left: target.left, top: target.top, scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.34, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="overflow-hidden rounded-[12px] border border-slate-200 bg-white">
        <div className="h-[72px] overflow-hidden">
          <TemplateThumb src={SELECTED_TEMPLATE.image} alt={SELECTED_TEMPLATE.name} />
        </div>
      </div>
      <div className="mt-1.5 text-[6px] font-black uppercase tracking-[.16em] text-slate-400">{SELECTED_TEMPLATE.eyebrow}</div>
      <div className="mt-1 truncate text-[7.5px] font-black text-slate-800">{SELECTED_TEMPLATE.name}</div>
    </motion.div>
  );
}

function LiveSummary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 9 ? (
        <motion.div
          className="absolute right-[5.5%] top-[24%] z-20 w-[30%] rounded-[20px] border border-emerald-100 bg-white p-5 shadow-[0_28px_70px_-38px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.36 }}
        >
          <motion.div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white" initial={reduced ? false : { scale: 0.6 }} animate={{ scale: 1 }}>
            <Check className="h-5 w-5" strokeWidth={3} />
          </motion.div>
          <div className="mt-4 text-[14px] font-black tracking-tight text-slate-900">Campaign active</div>
          <div className="mt-1 text-[8px] font-semibold leading-relaxed text-slate-500">Zapla has queued the full win-back sequence for the selected audience.</div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-[10px] bg-slate-50 px-3 py-2.5"><span className="text-[7px] font-bold text-slate-500">Audience</span><span className="text-[8px] font-black text-slate-800">{SELECTED_AUDIENCE.contacts}</span></div>
            <div className="flex items-center justify-between rounded-[10px] bg-slate-50 px-3 py-2.5"><span className="text-[7px] font-bold text-slate-500">Template</span><span className="text-[8px] font-black text-slate-800">{SELECTED_TEMPLATE.name}</span></div>
            <div className="flex items-center justify-between rounded-[10px] bg-slate-50 px-3 py-2.5"><span className="text-[7px] font-bold text-slate-500">Sequence</span><span className="text-[8px] font-black text-slate-800">3 emails over 5 days</span></div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "76%", top: "56%" },
    4: { left: "76%", top: "29%" },
    5: { left: "58%", top: "34%" },
    6: { left: "58%", top: "48%" },
    7: { left: "58%", top: "62%" },
    8: { left: "31%", top: "92%" },
  };

  const press = phase === 1 || phase === 4 || phase === 8;

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <CampaignBuilder phase={phase} reduced={reduced} />
      <ComposerPanel phase={phase} reduced={reduced} />
      <TemplateTray phase={phase} reduced={reduced} />
      <DragGhost phase={phase} reduced={reduced} />
      <LiveSummary phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={press} reduced={reduced} />
    </div>
  );
}
