import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, Flag, LayoutTemplate, Mail, Plus, Play } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const TEMPLATES = [
  {
    name: "Quote ready",
    image: photoA,
    headline: "Your quote is ready",
    cta: "View quote",
    shell: "bg-white",
    text: "text-slate-900",
  },
  {
    name: "Fresh offer",
    image: photoB,
    headline: "A little something for you",
    cta: "See offer",
    shell: "bg-amber-50",
    text: "text-slate-900",
  },
  {
    name: "Monthly update",
    image: photoC,
    headline: "What’s new this month",
    cta: "Read more",
    shell: "bg-emerald-950",
    text: "text-white",
  },
  {
    name: "Quick follow-up",
    image: photoB,
    headline: "Still thinking it over?",
    cta: "Let’s talk",
    shell: "bg-slate-900",
    text: "text-white",
  },
] as const;

const FLOW = [
  { title: "Your quote", delay: "Send now" },
  { title: "Still deciding?", delay: "Wait 2 days" },
  { title: "Last check-in", delay: "Wait 3 days" },
] as const;

function AssetPreload() {
  return (
    <div aria-hidden className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
      <img src={photoA} alt="" loading="eager" decoding="async" />
      <img src={photoB} alt="" loading="eager" decoding="async" />
      <img src={photoC} alt="" loading="eager" decoding="async" />
    </div>
  );
}

function TemplatePreview({
  template,
  compact = false,
}: {
  template: (typeof TEMPLATES)[number];
  compact?: boolean;
}) {
  return (
    <div className={`h-full w-full overflow-hidden rounded-[12px] ${template.shell}`}>
      <div className={compact ? "h-[48%] overflow-hidden" : "h-[43%] overflow-hidden"}>
        <img src={template.image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className={compact ? "px-2 py-1.5" : "px-3 py-3"}>
        <div className={compact ? `text-[5.5px] font-black leading-tight ${template.text}` : `text-[9px] font-black leading-tight ${template.text}`}>
          {template.headline}
        </div>
        <div className={compact ? "mt-1 space-y-[3px]" : "mt-2.5 space-y-1.5"}>
          <div className={template.text === "text-white" ? "h-1 w-[82%] rounded-full bg-white/20" : "h-1.5 w-[82%] rounded-full bg-slate-100"} />
          <div className={template.text === "text-white" ? "h-1 w-[58%] rounded-full bg-white/20" : "h-1.5 w-[58%] rounded-full bg-slate-100"} />
        </div>
        {!compact ? (
          <div className="mt-3 inline-flex rounded-[7px] bg-zapla-blue px-3 py-1.5 text-[6.5px] font-black text-white">
            {template.cta}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Connector({ visible = true }: { visible?: boolean }) {
  return (
    <motion.div
      className="mx-auto h-4 w-px bg-slate-200"
      initial={false}
      animate={{ opacity: visible ? 1 : 0.28, scaleY: visible ? 1 : 0.65 }}
      transition={{ duration: 0.25 }}
      style={{ transformOrigin: "top" }}
    />
  );
}

function WaitChip({ label, reveal, delay }: { label: string; reveal: boolean; delay: number }) {
  return (
    <motion.div
      className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[6px] font-black text-slate-500 shadow-[0_8px_22px_-18px_rgba(15,23,42,.4)]"
      initial={false}
      animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : -4, scale: reveal ? 1 : 0.94 }}
      transition={{ duration: 0.3, delay }}
    >
      <Clock3 className="h-2.5 w-2.5 text-blue-500" />
      {label}
    </motion.div>
  );
}

function EmailNode({
  index,
  phase,
  reduced,
}: {
  index: number;
  phase: number;
  reduced: boolean;
}) {
  const isFirst = index === 0;
  const firstAdded = phase >= 1;
  const templateLanded = phase >= 5;
  const restBuilt = phase >= 5;
  const active = phase >= 6;
  const visible = isFirst ? firstAdded : restBuilt;
  const selected = isFirst && phase >= 1 && phase <= 4;
  const template = index === 0 ? TEMPLATES[0] : index === 1 ? TEMPLATES[1] : TEMPLATES[2];

  if (!visible) return null;

  return (
    <motion.div
      className="relative mx-auto flex h-[78px] w-[310px] max-w-[88%] items-center gap-3 overflow-hidden rounded-[14px] border bg-white px-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,.45)]"
      initial={reduced || isFirst ? false : { opacity: 0, y: -8, scale: 0.97 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        borderColor: active ? "rgba(16,185,129,.42)" : selected ? "rgba(96,165,250,1)" : "rgba(226,232,240,1)",
        boxShadow: selected
          ? "0 0 0 4px rgba(37,99,255,.08), 0 14px 34px -28px rgba(15,23,42,.45)"
          : "0 14px 34px -28px rgba(15,23,42,.45)",
      }}
      transition={{ duration: reduced ? 0 : 0.34, delay: reduced || isFirst ? 0 : index === 1 ? 0.24 : 0.66 }}
    >
      <div className="flex h-[54px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-slate-100">
        {templateLanded || !isFirst ? (
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { opacity: 0, scale: 0.82, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : isFirst ? 0.16 : index === 1 ? 0.3 : 0.72 }}
          >
            <TemplatePreview template={template} compact />
          </motion.div>
        ) : (
          <LayoutTemplate className="h-4 w-4 text-slate-350" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[6px] font-black uppercase tracking-[.14em] text-slate-400">EMAIL {index + 1}</div>
        <div className="mt-1 truncate text-[8.5px] font-black text-slate-800">{FLOW[index].title}</div>
        {isFirst && !templateLanded ? (
          <div className="mt-1.5 inline-flex items-center gap-1 rounded-[6px] bg-blue-50 px-2 py-1 text-[6px] font-black text-blue-700">
            <LayoutTemplate className="h-2.5 w-2.5" /> Choose template
          </div>
        ) : (
          <div className="mt-1.5 flex items-center gap-1 text-[6px] font-bold text-slate-400">
            <Clock3 className="h-2.5 w-2.5" /> {FLOW[index].delay}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.span
            initial={reduced ? false : { opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : index * 0.1 }}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function AddEmailNode({ phase }: { phase: number }) {
  if (phase >= 1) return null;
  return (
    <motion.div
      className="mx-auto flex h-[62px] w-[250px] max-w-[78%] items-center justify-center gap-2 rounded-[14px] border border-dashed border-blue-300 bg-blue-50/50 text-[8px] font-black text-blue-700"
      animate={{ boxShadow: phase === 0 ? "0 0 0 5px rgba(37,99,255,.07)" : "0 0 0 0 rgba(37,99,255,0)" }}
    >
      <Plus className="h-4 w-4" /> Add email
    </motion.div>
  );
}

function SequenceBuilder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const drawerOpen = phase >= 2 && phase <= 4;
  const active = phase >= 6;
  const complete = phase >= 5;

  return (
    <motion.div
      className="absolute bottom-[6%] left-[5%] top-[5%] z-10 w-[52%]"
      animate={{ x: drawerOpen ? "-3%" : "0%", scale: drawerOpen ? 0.985 : 1 }}
      transition={{ duration: reduced ? 0 : 0.36, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-black tracking-tight text-slate-900">Quote follow-up</div>
            <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Email sequence</div>
          </div>
          <motion.span
            className={active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[6px] font-black text-emerald-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-[6px] font-black text-slate-500"}
            animate={{ scale: active ? [1, 1.08, 1] : 1 }}
            transition={{ duration: reduced ? 0 : 0.35 }}
          >
            {active ? "ACTIVE" : "DRAFT"}
          </motion.span>
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col items-center overflow-hidden">
          <div className="flex items-center gap-2 rounded-[10px] border border-blue-200 bg-blue-50/60 px-3 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-blue-600 text-white">
              <Flag className="h-3 w-3" />
            </span>
            <div>
              <div className="text-[5.5px] font-black uppercase tracking-[.13em] text-blue-500">TRIGGER</div>
              <div className="mt-0.5 text-[7px] font-black text-slate-800">Quote sent</div>
            </div>
          </div>

          <Connector />
          <AddEmailNode phase={phase} />
          <EmailNode index={0} phase={phase} reduced={reduced} />

          <AnimatePresence>
            {complete ? (
              <motion.div
                className="flex w-full flex-col items-center"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Connector />
                <WaitChip label="Wait 2 days" reveal delay={reduced ? 0 : 0.12} />
                <Connector />
                <EmailNode index={1} phase={phase} reduced={reduced} />
                <Connector />
                <WaitChip label="Wait 3 days" reveal delay={reduced ? 0 : 0.52} />
                <Connector />
                <EmailNode index={2} phase={phase} reduced={reduced} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {complete ? (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : 0.82 }}
              className="mt-2 flex justify-center"
            >
              <motion.div
                className={active
                  ? "inline-flex items-center gap-1.5 rounded-[9px] bg-emerald-500 px-3.5 py-2 text-[7px] font-black text-white"
                  : "inline-flex items-center gap-1.5 rounded-[9px] bg-zapla-ink px-3.5 py-2 text-[7px] font-black text-white"}
                animate={{ scale: active ? [1, 0.97, 1] : 1 }}
                transition={{ duration: reduced ? 0 : 0.34 }}
              >
                {active ? <><Check className="h-3 w-3" /> Sequence active</> : <><Play className="h-3 w-3" /> Activate sequence</>}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TemplateTray({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase >= 2 && phase <= 3;
  const selected = phase === 3;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute bottom-[8%] right-[4%] top-[8%] z-30 w-[46%] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_32px_80px_-38px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, x: 70, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 54, scale: 0.985 }}
          transition={{ duration: reduced ? 0 : 0.42, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-violet-50 text-violet-600">
              <LayoutTemplate className="h-3.5 w-3.5" />
            </span>
            <div className="text-[9px] font-black text-slate-900">Email templates</div>
          </div>

          <div className="grid h-[calc(100%-40px)] grid-cols-2 gap-2.5">
            {TEMPLATES.map((template, index) => {
              const isSelected = selected && index === 0;
              const dim = selected && index !== 0;
              return (
                <motion.div
                  key={template.name}
                  className={isSelected
                    ? "relative min-h-0 overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_18px_42px_-24px_rgba(37,99,255,.72)]"
                    : "relative min-h-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white p-[3px] shadow-[0_14px_34px_-28px_rgba(15,23,42,.42)]"}
                  initial={reduced ? false : { opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: dim ? 0.26 : 1, y: isSelected ? -3 : 0, scale: isSelected ? 1.02 : dim ? 0.97 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : index * 0.05 }}
                >
                  <TemplatePreview template={template} />
                  <div className="absolute inset-x-2 bottom-2 rounded-[7px] bg-white/92 px-2 py-1.5 text-center text-[6px] font-black text-slate-700 shadow-sm backdrop-blur-sm">
                    {template.name}
                  </div>
                  {isSelected ? (
                    <motion.span
                      initial={reduced ? false : { opacity: 0, scale: 0.55 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </motion.span>
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
  if (phase !== 4) return null;

  return (
    <motion.div
      className="absolute z-50 overflow-hidden rounded-[16px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_24px_64px_-28px_rgba(37,99,255,.62)]"
      style={{ left: "58%", top: "17%", width: "18%", height: "31%" }}
      initial={reduced ? false : { opacity: 1 }}
      animate={{
        left: "15.5%",
        top: "31%",
        width: "8%",
        height: "10%",
        borderRadius: "10px",
        opacity: 0.98,
      }}
      transition={{ duration: reduced ? 0 : 0.78, ease: [0.18, 0.82, 0.2, 1] }}
    >
      <TemplatePreview template={TEMPLATES[0]} />
    </motion.div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    0: { left: "27%", top: "31%" },
    1: { left: "29%", top: "39%" },
    2: { left: "69%", top: "27%" },
    3: { left: "69%", top: "27%" },
    5: { left: "27%", top: "91%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <AssetPreload />
      <SequenceBuilder phase={phase} reduced={reduced} />
      <TemplateTray phase={phase} reduced={reduced} />
      <FlyingTemplate phase={phase} reduced={reduced} />
      <ZaplaDemoCursor
        point={points[phase] ?? null}
        press={phase === 0 || phase === 1 || phase === 3 || phase === 5}
        reduced={reduced}
      />
    </div>
  );
}
