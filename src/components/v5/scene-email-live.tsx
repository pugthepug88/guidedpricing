import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, Mail } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import photoA from "@/assets/customer-02-northside.jpg";
import photoB from "@/assets/customer-04-bloom.jpg";
import photoC from "@/assets/customer-05-peak.jpg";

const EMAILS = [
  { title: "Your quote", delay: "Now", image: photoA },
  { title: "Still deciding?", delay: "2 days", image: photoB },
  { title: "Last check-in", delay: "5 days", image: photoC },
] as const;

const TEMPLATES = [
  { image: photoB, headline: "A little something for you", button: "See offer", tone: "bg-amber-50" },
  { image: photoA, headline: "Your quote is ready", button: "View quote", tone: "bg-white" },
  { image: photoC, headline: "What’s new this month", button: "Read more", tone: "bg-emerald-950" },
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

function EmailVisual({
  image,
  headline,
  button,
  tone,
  compact = false,
}: {
  image: string;
  headline: string;
  button: string;
  tone: string;
  compact?: boolean;
}) {
  const dark = tone === "bg-emerald-950";

  return (
    <div className={`h-full w-full overflow-hidden rounded-[14px] ${tone}`}>
      <div className={compact ? "h-[54%] overflow-hidden" : "h-[48%] overflow-hidden"}>
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className={compact ? "px-2 py-2" : "px-4 py-4"}>
        <div className={compact ? `text-[6px] font-black leading-tight ${dark ? "text-white" : "text-slate-900"}` : `text-[11px] font-black leading-tight ${dark ? "text-white" : "text-slate-900"}`}>
          {headline}
        </div>
        <div className={compact ? "mt-1.5 space-y-1" : "mt-3 space-y-1.5"}>
          <div className={dark ? "h-1 w-[82%] rounded-full bg-white/20" : "h-1.5 w-[82%] rounded-full bg-slate-100"} />
          <div className={dark ? "h-1 w-[58%] rounded-full bg-white/20" : "h-1.5 w-[58%] rounded-full bg-slate-100"} />
        </div>
        {!compact ? (
          <div className="mt-4 inline-flex rounded-[8px] bg-zapla-blue px-3.5 py-2 text-[7px] font-black text-white">
            {button}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SequenceCard({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const email = EMAILS[index];
  const filled = phase >= 5;
  const active = phase >= 6;
  const selected = index === 0 && phase === 1;
  const landingTarget = index === 0 && phase === 4;
  const template = index === 0 ? TEMPLATES[1] : index === 1 ? TEMPLATES[0] : TEMPLATES[2];

  return (
    <motion.div
      className="relative h-[150px] min-w-0 flex-1 overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_18px_46px_-34px_rgba(15,23,42,.38)]"
      initial={false}
      animate={{
        opacity: index > 0 && phase < 5 ? 0.5 : 1,
        y: index > 0 && phase < 5 ? 4 : 0,
        borderColor: active
          ? "rgba(16,185,129,.42)"
          : selected || landingTarget
            ? "rgba(96,165,250,1)"
            : "rgba(226,232,240,1)",
        boxShadow: selected || landingTarget
          ? "0 0 0 4px rgba(37,99,255,.08), 0 18px 46px -34px rgba(15,23,42,.38)"
          : "0 18px 46px -34px rgba(15,23,42,.38)",
      }}
      transition={{ duration: reduced ? 0 : 0.32, delay: phase === 5 && !reduced ? index * 0.1 : 0 }}
    >
      <div className="absolute inset-x-0 top-0 h-[82px] overflow-hidden bg-slate-100">
        {filled ? (
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { opacity: 0, scale: 0.88, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.34, delay: reduced ? 0 : index * 0.11 }}
          >
            <img src={template.image} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Mail className="h-5 w-5 text-slate-300" />
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[68px] px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[6px] font-black uppercase tracking-[.14em] text-slate-400">EMAIL {index + 1}</div>
            <div className="mt-1 truncate text-[8px] font-black text-slate-800">{email.title}</div>
            <div className="mt-1.5 flex items-center gap-1 text-[6px] font-bold text-slate-400">
              <Clock3 className="h-2.5 w-2.5" /> {email.delay}
            </div>
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
        </div>
      </div>
    </motion.div>
  );
}

function SequenceStage({ phase, reduced }: { phase: number; reduced: boolean }) {
  const active = phase >= 6;
  const galleryOpen = phase >= 2 && phase <= 3;

  return (
    <motion.div
      className="absolute inset-x-[6%] bottom-[10%] z-10"
      animate={{ opacity: galleryOpen ? 0.18 : 1, y: galleryOpen ? 8 : 0, scale: galleryOpen ? 0.98 : 1 }}
      transition={{ duration: reduced ? 0 : 0.34 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[12px] font-black tracking-tight text-slate-900">Quote follow-up</div>
          <div className="mt-0.5 text-[7px] font-semibold text-slate-400">3-email sequence</div>
        </div>
        <motion.span
          className={active
            ? "rounded-full bg-emerald-50 px-3 py-1.5 text-[6.5px] font-black text-emerald-700"
            : "rounded-full bg-slate-100 px-3 py-1.5 text-[6.5px] font-black text-slate-500"}
          animate={{ scale: active ? [1, 1.08, 1] : 1 }}
          transition={{ duration: reduced ? 0 : 0.36 }}
        >
          {active ? "ACTIVE" : "DRAFT"}
        </motion.span>
      </div>

      <div className="relative flex gap-3">
        <div className="absolute left-[16.5%] right-[16.5%] top-[75px] h-px bg-slate-200" />
        <motion.div
          className="absolute left-[16.5%] top-[75px] h-px bg-emerald-400"
          initial={false}
          animate={{ width: active ? "67%" : "0%" }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.2, 0.82, 0.24, 1] }}
        />
        {EMAILS.map((email, index) => (
          <SequenceCard key={email.title} index={index} phase={phase} reduced={reduced} />
        ))}
      </div>
    </motion.div>
  );
}

function TemplateGallery({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase < 2 || phase > 3) return null;
  const selected = phase === 3;

  return (
    <motion.div
      className="absolute inset-x-[8%] top-[8%] z-30"
      initial={reduced ? false : { opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: reduced ? 0 : 0.36, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <div className="mb-3 text-center text-[10px] font-black text-slate-900">Choose a template</div>
      <div className="grid grid-cols-3 gap-4">
        {TEMPLATES.map((template, index) => {
          const isSelected = selected && index === 1;
          const dim = selected && index !== 1;

          return (
            <motion.div
              key={index}
              className={isSelected
                ? "relative h-[210px] sm:h-[265px] overflow-hidden rounded-[18px] border-2 border-blue-400 bg-white p-[4px] shadow-[0_28px_70px_-34px_rgba(37,99,255,.6)]"
                : "relative h-[210px] sm:h-[265px] overflow-hidden rounded-[18px] border border-slate-200 bg-white p-[4px] shadow-[0_22px_60px_-38px_rgba(15,23,42,.42)]"}
              initial={reduced ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: dim ? 0.24 : 1, y: isSelected ? -4 : 0, scale: isSelected ? 1.025 : dim ? 0.96 : 1 }}
              transition={{ duration: reduced ? 0 : 0.32, delay: reduced ? 0 : index * 0.07 }}
            >
              <EmailVisual {...template} />
              {isSelected ? (
                <motion.span
                  initial={reduced ? false : { opacity: 0, scale: 0.55 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </motion.span>
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function FlyingTemplate({ phase, reduced }: { phase: number; reduced: boolean }) {
  if (phase !== 4) return null;

  return (
    <motion.div
      className="absolute z-40 overflow-hidden rounded-[18px] border-2 border-blue-400 bg-white p-[4px] shadow-[0_28px_70px_-34px_rgba(37,99,255,.58)]"
      style={{ left: "37%", top: "13%", width: "26%", height: "265px" }}
      initial={reduced ? false : { opacity: 1 }}
      animate={{
        left: "6%",
        top: "64%",
        width: "28%",
        height: "150px",
        borderRadius: "18px",
        opacity: 0.98,
      }}
      transition={{ duration: reduced ? 0 : 0.72, ease: [0.2, 0.82, 0.24, 1] }}
    >
      <EmailVisual {...TEMPLATES[1]} />
    </motion.div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    1: { left: "19%", top: "76%" },
    2: { left: "50%", top: "38%" },
    3: { left: "50%", top: "38%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <AssetPreload />
      <SequenceStage phase={phase} reduced={reduced} />
      <AnimatePresence>
        <TemplateGallery phase={phase} reduced={reduced} />
        <FlyingTemplate phase={phase} reduced={reduced} />
      </AnimatePresence>
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 3} reduced={reduced} />
    </div>
  );
}
