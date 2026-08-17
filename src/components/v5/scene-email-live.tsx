import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, Clock3, Mail, Play } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const SELECTED_LAYOUT_ID = "email-marketing-selected-template";

const EMAILS = [
  { title: "Your quote", delay: "Now", image: photoA },
  { title: "Still deciding?", delay: "2 days", image: photoB },
  { title: "Last check-in", delay: "5 days", image: photoC },
] as const;

const TEMPLATES = [
  {
    name: "Quote ready",
    image: photoA,
    headline: "Your quote is ready",
    button: "View quote",
    surface: "bg-white",
  },
  {
    name: "Fresh offer",
    image: photoB,
    headline: "A little something for you",
    button: "See offer",
    surface: "bg-amber-50",
  },
  {
    name: "News update",
    image: photoC,
    headline: "What’s new this month",
    button: "Read more",
    surface: "bg-emerald-950",
  },
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

function TemplateVisual({
  image,
  headline,
  button,
  surface,
  compact = false,
}: {
  image: string;
  headline: string;
  button: string;
  surface: string;
  compact?: boolean;
}) {
  const dark = surface === "bg-emerald-950";

  return (
    <div className={`h-full w-full overflow-hidden rounded-[10px] ${surface}`}>
      <div className={compact ? "h-[46%] overflow-hidden" : "h-[47%] overflow-hidden"}>
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className={compact ? "px-1.5 py-1.5" : "px-3 py-3"}>
        <div
          className={
            compact
              ? `text-[5px] font-black leading-tight ${dark ? "text-white" : "text-slate-900"}`
              : `text-[9px] font-black leading-tight ${dark ? "text-white" : "text-slate-900"}`
          }
        >
          {headline}
        </div>
        <div className={compact ? "mt-1 space-y-[3px]" : "mt-2.5 space-y-1.5"}>
          <div className={dark ? "h-1 w-[86%] rounded-full bg-white/20" : "h-1.5 w-[86%] rounded-full bg-slate-100"} />
          <div className={dark ? "h-1 w-[62%] rounded-full bg-white/20" : "h-1.5 w-[62%] rounded-full bg-slate-100"} />
        </div>
        {!compact ? (
          <div className="mt-3 inline-flex rounded-[7px] bg-zapla-blue px-3 py-1.5 text-[6.5px] font-black text-white">
            {button}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SequenceCard({
  index,
  phase,
  reduced,
}: {
  index: number;
  phase: number;
  reduced: boolean;
}) {
  const email = EMAILS[index];
  const selected = index === 0 && phase >= 1 && phase <= 4;
  const firstTemplateLanded = index === 0 && phase >= 4;
  const laterFilled = index > 0 && phase >= 5;
  const hasTemplate = firstTemplateLanded || laterFilled;
  const active = phase >= 6;

  const template = index === 0 ? TEMPLATES[0] : index === 1 ? TEMPLATES[1] : TEMPLATES[2];

  return (
    <motion.div
      className={
        selected
          ? "relative min-h-[76px] overflow-hidden rounded-[13px] border-2 border-blue-400 bg-white shadow-[0_16px_36px_-28px_rgba(37,99,255,.72)]"
          : "relative min-h-[76px] overflow-hidden rounded-[13px] border border-slate-200 bg-white shadow-[0_10px_28px_-25px_rgba(15,23,42,.42)]"
      }
      animate={{
        opacity: index > 0 && phase < 5 ? 0.56 : 1,
        y: index > 0 && phase < 5 ? 3 : 0,
        borderColor: active ? "rgba(16,185,129,.42)" : selected ? "rgba(96,165,250,1)" : "rgba(226,232,240,1)",
      }}
      transition={{ duration: reduced ? 0 : 0.34, delay: phase === 5 && !reduced ? index * 0.09 : 0 }}
    >
      <div className="flex min-h-[76px] items-center gap-2.5 p-2.5">
        <div className="flex h-[52px] w-[39px] shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-slate-100">
          {hasTemplate ? (
            index === 0 ? (
              <motion.div
                layoutId={SELECTED_LAYOUT_ID}
                className="h-full w-full"
                transition={{ type: "spring", stiffness: 125, damping: 23, mass: 0.9 }}
              >
                <TemplateVisual {...template} compact />
              </motion.div>
            ) : (
              <motion.div
                className="h-full w-full"
                initial={reduced ? false : { opacity: 0, scale: 0.82, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : (index - 1) * 0.12 }}
              >
                <TemplateVisual {...template} compact />
              </motion.div>
            )
          ) : (
            <Mail className="h-4 w-4 text-slate-400" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[6px] font-black uppercase tracking-[.13em] text-slate-400">EMAIL {index + 1}</div>
          <div className="mt-0.5 truncate text-[8.5px] font-black text-slate-800">{email.title}</div>
          <div className="mt-1.5 flex items-center gap-1 text-[6.5px] font-bold text-slate-400">
            <Clock3 className="h-2.5 w-2.5" /> {email.delay}
          </div>
        </div>

        <AnimatePresence>
          {active ? (
            <motion.span
              initial={reduced ? false : { opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduced ? 0 : index * 0.12 }}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SequenceRail({ phase, reduced }: { phase: number; reduced: boolean }) {
  const active = phase >= 6;

  return (
    <motion.div
      className="relative z-20 flex h-full w-[31%] min-w-0 flex-col border-r border-slate-200 bg-white px-3 py-3"
      animate={{ boxShadow: active ? "8px 0 28px -28px rgba(15,23,42,.28)" : "8px 0 28px -32px rgba(15,23,42,0)" }}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-[10px] font-black tracking-tight text-slate-900">Quote follow-up</div>
          <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">3-email sequence</div>
        </div>
        <motion.span
          className={
            active
              ? "rounded-full bg-emerald-50 px-2 py-1 text-[6px] font-black text-emerald-700"
              : "rounded-full bg-slate-100 px-2 py-1 text-[6px] font-black text-slate-500"
          }
          animate={{ scale: active ? [1, 1.08, 1] : 1 }}
          transition={{ duration: reduced ? 0 : 0.36 }}
        >
          {active ? "ACTIVE" : "DRAFT"}
        </motion.span>
      </div>

      <div className="relative mt-4 flex-1">
        <div className="absolute bottom-[18px] left-[19px] top-[38px] w-px bg-slate-200" />
        <motion.div
          className="absolute left-[19px] top-[38px] w-px bg-emerald-400"
          initial={false}
          animate={{ height: active ? "70%" : 0 }}
          transition={{ duration: reduced ? 0 : 0.95, ease: [0.2, 0.82, 0.24, 1] }}
        />

        <div className="relative z-10 space-y-3.5">
          {EMAILS.map((email, index) => (
            <SequenceCard key={email.title} index={index} phase={phase} reduced={reduced} />
          ))}
        </div>
      </div>

      <motion.div
        className={
          active
            ? "mt-3 flex items-center justify-center gap-1.5 rounded-[10px] bg-emerald-500 px-3 py-2.5 text-[7.5px] font-black text-white"
            : "mt-3 flex items-center justify-center gap-1.5 rounded-[10px] bg-zapla-ink px-3 py-2.5 text-[7.5px] font-black text-white"
        }
        animate={{ scale: active ? [1, 0.97, 1] : 1 }}
        transition={{ duration: reduced ? 0 : 0.36 }}
      >
        {active ? <><Check className="h-3 w-3" /> Sequence active</> : <><Play className="h-3 w-3" /> Activate sequence</>}
      </motion.div>
    </motion.div>
  );
}

function EmailWorkspace({ phase, reduced }: { phase: number; reduced: boolean }) {
  const open = phase >= 1 && phase <= 4;
  const showTemplates = phase >= 2 && phase <= 4;
  const selected = phase >= 3;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="absolute bottom-[7%] left-[4%] right-[4%] top-[7%] overflow-hidden rounded-[17px] border border-slate-200 bg-white shadow-[0_30px_70px_-38px_rgba(15,23,42,.46)]"
          initial={reduced ? false : { opacity: 0, x: 42, scale: 0.985 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, x: -22, scale: 0.99 }}
          transition={{ duration: reduced ? 0 : 0.38, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex h-12 items-center border-b border-slate-100 px-4">
            <div>
              <div className="text-[9px] font-black text-slate-900">Email 1 · Your quote</div>
              <div className="mt-0.5 text-[6px] font-semibold text-slate-400">Choose a design</div>
            </div>
            <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-[5.5px] font-black text-slate-500">DRAFT</span>
          </div>

          <div className="relative h-[calc(100%-48px)] overflow-hidden bg-[#f7f8fb] px-4 py-4">
            <AnimatePresence mode="wait" initial={false}>
              {!showTemplates ? (
                <motion.div
                  key="intro"
                  className="flex h-full items-center justify-center"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                >
                  <div className="w-[78%] max-w-[420px] overflow-hidden rounded-[14px] border border-dashed border-slate-300 bg-white p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-violet-50 text-violet-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="mt-3 text-[11px] font-black text-slate-800">Choose an email template</div>
                    <div className="mt-1 text-[6.5px] font-semibold text-slate-400">Ready-made designs</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="templates"
                  className="grid h-full grid-cols-3 gap-3"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.32 }}
                >
                  {TEMPLATES.map((template, index) => {
                    const isSelected = selected && index === 0;
                    const dim = selected && index !== 0;

                    return (
                      <motion.div
                        key={template.name}
                        className="flex min-w-0 flex-col"
                        initial={reduced ? false : { opacity: 0, y: 14, scale: 0.97 }}
                        animate={{
                          opacity: dim ? 0.34 : 1,
                          y: isSelected ? -3 : 0,
                          scale: isSelected ? 1.025 : dim ? 0.97 : 1,
                        }}
                        transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : index * 0.07 }}
                      >
                        {index === 0 ? (
                          <motion.div
                            layoutId={SELECTED_LAYOUT_ID}
                            className={
                              isSelected
                                ? "relative min-h-0 flex-1 overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_22px_50px_-28px_rgba(37,99,255,.74)]"
                                : "relative min-h-0 flex-1 overflow-hidden rounded-[14px] border border-slate-200 bg-white p-[3px] shadow-[0_18px_44px_-30px_rgba(15,23,42,.46)]"
                            }
                            transition={{ type: "spring", stiffness: 125, damping: 23, mass: 0.9 }}
                          >
                            <TemplateVisual {...template} />
                            <AnimatePresence>
                              {isSelected ? (
                                <motion.span
                                  initial={reduced ? false : { opacity: 0, scale: 0.55 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
                                >
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                </motion.span>
                              ) : null}
                            </AnimatePresence>
                          </motion.div>
                        ) : (
                          <div className="min-h-0 flex-1 overflow-hidden rounded-[14px] border border-slate-200 bg-white p-[3px] shadow-[0_18px_44px_-30px_rgba(15,23,42,.46)]">
                            <TemplateVisual {...template} />
                          </div>
                        )}
                        <div className="mt-2 text-center text-[7px] font-black text-slate-600">{template.name}</div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function QuietWorkspace({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 4) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#f7f8fb]"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.35 }}
    >
      <motion.div
        className="pointer-events-none h-[72%] w-[72%] rounded-[24px]"
        animate={{
          background: phase >= 6
            ? "radial-gradient(circle at 28% 42%, rgba(16,185,129,.10), transparent 45%)"
            : "radial-gradient(circle at 28% 42%, rgba(37,99,255,.08), transparent 45%)",
        }}
      />
    </motion.div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "15%", top: "25%" },
    2: { left: "48%", top: "43%" },
    3: { left: "48%", top: "43%" },
    5: { left: "15%", top: "91%" },
  };

  return (
    <LayoutGroup id="email-marketing-sequence">
      <div className="absolute inset-0 flex min-h-0 overflow-hidden bg-[#f7f8fb]">
        <AssetPreload />
        <SequenceRail phase={phase} reduced={reduced} />

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <QuietWorkspace phase={phase} reduced={reduced} />
          <EmailWorkspace phase={phase} reduced={reduced} />
        </div>

        <ZaplaDemoCursor
          point={points[phase] ?? null}
          press={phase === 1 || phase === 3 || phase === 5}
          reduced={reduced}
        />
      </div>
    </LayoutGroup>
  );
}
