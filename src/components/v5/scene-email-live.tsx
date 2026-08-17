import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, Mail, Play } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const EMAILS = [
  { title: "Your quote", delay: "Now" },
  { title: "Still deciding?", delay: "2 days" },
  { title: "Last check-in", delay: "5 days" },
] as const;

const TEMPLATES = [
  { name: "Clean service", image: photoA, headline: "Your quote is ready", button: "View quote" },
  { name: "Seasonal offer", image: photoB, headline: "A little something for you", button: "See offer" },
  { name: "Simple newsletter", image: photoC, headline: "What’s new this month", button: "Read more" },
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

function MiniTemplate({
  image,
  headline,
  button,
  compact = false,
}: {
  image: string;
  headline: string;
  button: string;
  compact?: boolean;
}) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[10px] bg-white">
      <div className={compact ? "h-[40%] overflow-hidden" : "h-[43%] overflow-hidden"}>
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className={compact ? "px-2 py-2" : "px-3 py-3"}>
        <div className={compact ? "text-[6.5px] font-black leading-tight text-slate-800" : "text-[9px] font-black leading-tight text-slate-900"}>
          {headline}
        </div>
        <div className={compact ? "mt-1.5 space-y-1" : "mt-2.5 space-y-1.5"}>
          <div className="h-1.5 w-[88%] rounded-full bg-slate-100" />
          <div className="h-1.5 w-[66%] rounded-full bg-slate-100" />
        </div>
        <div className={compact ? "mt-2 inline-flex rounded-[5px] bg-zapla-blue px-2 py-1 text-[5.5px] font-black text-white" : "mt-3 inline-flex rounded-[7px] bg-zapla-blue px-3 py-1.5 text-[6.5px] font-black text-white"}>
          {button}
        </div>
      </div>
    </div>
  );
}

function SequenceRail({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 1;
  const templateApplied = phase >= 4;
  const sequenceReady = phase >= 5;
  const active = phase >= 6;

  return (
    <div className="relative flex h-full w-[30%] min-w-[170px] max-w-[235px] flex-col border-r border-slate-200 bg-white px-3 py-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-[10px] font-black tracking-tight text-slate-900">Quote follow-up</div>
          <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Email sequence</div>
        </div>
        <motion.span
          className={active ? "rounded-full bg-emerald-50 px-2 py-1 text-[6px] font-black text-emerald-700" : "rounded-full bg-slate-100 px-2 py-1 text-[6px] font-black text-slate-500"}
          animate={{ scale: active ? [1, 1.08, 1] : 1 }}
          transition={{ duration: reduced ? 0 : 0.35 }}
        >
          {active ? "ACTIVE" : "DRAFT"}
        </motion.span>
      </div>

      <div className="relative mt-5 flex-1">
        <div className="absolute bottom-[58px] left-[15px] top-[30px] w-px bg-slate-200" />
        <motion.div
          className="absolute left-[15px] top-[30px] w-px bg-emerald-400"
          initial={false}
          animate={{ height: active ? "72%" : 0 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.2, 0.82, 0.24, 1] }}
        />

        <div className="relative z-10 space-y-4">
          {EMAILS.map((email, index) => {
            const isFirst = index === 0;
            const filled = isFirst ? templateApplied : sequenceReady;
            const highlighted = isFirst && selected && !active;

            return (
              <motion.div
                key={email.title}
                className={highlighted
                  ? "relative overflow-hidden rounded-[12px] border-2 border-blue-400 bg-white shadow-[0_16px_34px_-28px_rgba(37,99,255,.8)]"
                  : "relative overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_10px_26px_-24px_rgba(15,23,42,.45)]"}
                animate={{
                  opacity: index > 0 && !sequenceReady ? 0.62 : 1,
                  y: sequenceReady && index > 0 ? 0 : index > 0 ? 3 : 0,
                  borderColor: active ? "rgba(16,185,129,.38)" : highlighted ? "rgba(96,165,250,1)" : "rgba(226,232,240,1)",
                }}
                transition={{ duration: reduced ? 0 : 0.35, delay: sequenceReady && !reduced ? index * 0.08 : 0 }}
              >
                <div className="flex items-center gap-2 p-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-slate-100">
                    {filled ? (
                      <MiniTemplate image={photoA} headline="" button="" compact />
                    ) : (
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[6px] font-black uppercase tracking-[.12em] text-slate-400">EMAIL {index + 1}</div>
                    <div className="mt-0.5 truncate text-[8px] font-black text-slate-800">{email.title}</div>
                    <div className="mt-1 flex items-center gap-1 text-[6px] font-bold text-slate-400">
                      <Clock3 className="h-2.5 w-2.5" /> {email.delay}
                    </div>
                  </div>
                  {active ? (
                    <motion.span
                      initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: reduced ? 0 : index * 0.12 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </motion.span>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        className={active
          ? "mt-auto flex items-center justify-center gap-1.5 rounded-[9px] bg-emerald-500 px-3 py-2.5 text-[7.5px] font-black text-white"
          : "mt-auto flex items-center justify-center gap-1.5 rounded-[9px] bg-zapla-ink px-3 py-2.5 text-[7.5px] font-black text-white"}
        animate={{ scale: active ? [1, 0.97, 1] : 1 }}
        transition={{ duration: reduced ? 0 : 0.36 }}
      >
        {active ? <><Check className="h-3 w-3" /> Sequence active</> : <><Play className="h-3 w-3" /> Activate sequence</>}
      </motion.div>
    </div>
  );
}

function EmptyEmailCard({ phase, reduced }: { phase: number; reduced: boolean }) {
  const templatesOpen = phase >= 2;

  return (
    <motion.div
      className="absolute left-[7%] top-[11%] z-30 h-[72%] w-[38%] min-w-[185px] max-w-[270px] overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_28px_60px_-34px_rgba(15,23,42,.45)]"
      initial={reduced ? false : { opacity: 0, x: 48, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: templatesOpen ? 0.94 : 1 }}
      exit={{ opacity: 0, x: -18, scale: 0.97 }}
      transition={{ duration: reduced ? 0 : 0.38, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex h-11 items-center border-b border-slate-100 px-3">
        <div>
          <div className="text-[8px] font-black text-slate-800">Email 1</div>
          <div className="mt-0.5 text-[6px] font-semibold text-slate-400">Your quote</div>
        </div>
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-[5.5px] font-black text-slate-500">DRAFT</span>
      </div>

      <div className="flex h-[calc(100%-44px)] flex-col items-center justify-center px-5 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-violet-50 text-violet-600">
          <LayoutTemplate className="h-5 w-5" />
        </span>
        <div className="mt-3 text-[10px] font-black text-slate-800">Choose a template</div>
        <div className="mt-1 text-[6.5px] font-semibold text-slate-400">Start with a ready-made email design.</div>
        <motion.div
          className="mt-4 rounded-[8px] bg-zapla-blue px-3 py-2 text-[7px] font-black text-white"
          animate={{ boxShadow: phase === 1 ? "0 0 0 5px rgba(37,99,255,.10)" : "0 0 0 0 rgba(37,99,255,0)" }}
        >
          Browse templates
        </motion.div>
      </div>
    </motion.div>
  );
}

function TemplateCard({
  template,
  index,
  selected,
  reduced,
}: {
  template: (typeof TEMPLATES)[number];
  index: number;
  selected: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      className={selected
        ? "relative h-[210px] overflow-hidden rounded-[13px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_22px_48px_-28px_rgba(37,99,255,.72)]"
        : "relative h-[210px] overflow-hidden rounded-[13px] border border-slate-200 bg-white p-[3px] shadow-[0_16px_38px_-30px_rgba(15,23,42,.45)]"}
      initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: selected ? -3 : 0, scale: selected ? 1.02 : 1 }}
      transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : index * 0.07, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <MiniTemplate image={template.image} headline={template.headline} button={template.button} />
      {selected ? (
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
}

function TemplatePicker({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 3;

  return (
    <motion.div
      className="absolute bottom-[9%] right-[4%] top-[9%] z-40 w-[51%]"
      initial={reduced ? false : { opacity: 0, x: 42 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 28 }}
      transition={{ duration: reduced ? 0 : 0.38, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="flex items-center gap-2">
        <div>
          <div className="text-[10px] font-black text-slate-900">Email templates</div>
          <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Pick a design</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {TEMPLATES.map((template, index) => (
          <TemplateCard
            key={template.name}
            template={template}
            index={index}
            selected={selected && index === 0}
            reduced={reduced}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AppliedEmailCard({ phase, reduced }: { phase: number; reduced: boolean }) {
  const settle = phase >= 4;

  return (
    <motion.div
      className="absolute left-[19%] top-[8%] z-50 h-[76%] w-[44%] min-w-[220px] max-w-[330px] overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_30px_70px_-34px_rgba(15,23,42,.5)]"
      initial={reduced ? false : { opacity: 0, x: 130, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: settle ? 0.96 : 1 }}
      transition={{ duration: reduced ? 0 : 0.52, ease: [0.18, 0.8, 0.2, 1] }}
    >
      <div className="flex h-11 items-center border-b border-slate-100 px-3">
        <div>
          <div className="text-[8px] font-black text-slate-800">Email 1</div>
          <div className="mt-0.5 text-[6px] font-semibold text-slate-400">Your quote</div>
        </div>
        <motion.span
          className="ml-auto rounded-full bg-blue-50 px-2 py-1 text-[5.5px] font-black text-blue-700"
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduced ? 0 : 0.28 }}
        >
          TEMPLATE APPLIED
        </motion.span>
      </div>
      <div className="h-[calc(100%-44px)] p-3">
        <div className="h-full overflow-hidden rounded-[11px] border border-slate-100">
          <MiniTemplate image={photoA} headline="Your quote is ready" button="View quote" />
        </div>
      </div>
    </motion.div>
  );
}

function FinalState({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 5) return null;

  return (
    <motion.div
      className="absolute inset-y-0 right-0 z-20 flex w-[70%] items-center justify-center bg-[#f7f8fb]"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
    >
      <motion.div
        className="relative h-[72%] w-[46%] min-w-[220px] max-w-[320px] overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_28px_60px_-36px_rgba(15,23,42,.45)]"
        initial={reduced ? false : { opacity: 0, x: 18, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: phase >= 6 ? 0.94 : 1 }}
        transition={{ duration: reduced ? 0 : 0.4 }}
      >
        <div className="h-full p-3">
          <div className="h-full overflow-hidden rounded-[11px] border border-slate-100">
            <MiniTemplate image={photoA} headline="Your quote is ready" button="View quote" />
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {phase >= 6 ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-[12%] flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-2 shadow-[0_16px_36px_-24px_rgba(15,23,42,.45)]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className="text-[7.5px] font-black text-slate-700">3-email sequence active</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    0: { left: "15%", top: "25%" },
    1: { left: "42%", top: "64%" },
    2: { left: "76%", top: "43%" },
    3: { left: "68%", top: "38%" },
    5: { left: "15%", top: "91%" },
  };

  return (
    <div className="absolute inset-0 flex min-h-0 overflow-hidden bg-[#f7f8fb]">
      <AssetPreload />
      <SequenceRail phase={phase} reduced={reduced} />

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="sync">
          {phase >= 1 && phase <= 2 ? <EmptyEmailCard key="empty-email" phase={phase} reduced={reduced} /> : null}
          {phase >= 2 && phase <= 3 ? <TemplatePicker key="templates" phase={phase} reduced={reduced} /> : null}
          {phase >= 3 && phase <= 4 ? <AppliedEmailCard key="applied-email" phase={phase} reduced={reduced} /> : null}
        </AnimatePresence>
      </div>

      <FinalState phase={phase} reduced={reduced} />

      <ZaplaDemoCursor
        point={points[phase] ?? null}
        press={phase === 0 || phase === 1 || phase === 3 || phase === 5}
        reduced={reduced}
      />
    </div>
  );
}
