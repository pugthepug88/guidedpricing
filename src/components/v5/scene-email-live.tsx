import { AnimatePresence, motion } from "motion/react";
import { Check, Clock3, LayoutTemplate, Mail, Megaphone, Play, Target, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import ecommerceVisual from "@/assets/industry-ecommerce.png.asset.json";
import eventsVisual from "@/assets/industry-events.png.asset.json";
import fitnessVisual from "@/assets/industry-fitness.png.asset.json";
import restaurantVisual from "@/assets/industry-restaurants.png.asset.json";

const TEMPLATES = [
  {
    name: "Spring Sale",
    image: ecommerceVisual.url,
    eyebrow: "SPRING SALE",
    headline: "20% off this week",
    body: "Fresh picks, limited-time pricing and one clear call to action.",
    cta: "Shop the offer",
    shell: "bg-[#fff9f2]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Event Launch",
    image: eventsVisual.url,
    eyebrow: "SAVE THE DATE",
    headline: "You’re invited",
    body: "A bold event announcement with the details customers need at a glance.",
    cta: "Reserve a spot",
    shell: "bg-[#f5f3ff]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
  {
    name: "Member Offer",
    image: fitnessVisual.url,
    eyebrow: "MEMBER SPECIAL",
    headline: "Your next session is on us",
    body: "A high-energy promotional layout built around one strong benefit.",
    cta: "Book a session",
    shell: "bg-slate-950",
    text: "text-white",
    muted: "text-white/60",
  },
  {
    name: "Weekend Special",
    image: restaurantVisual.url,
    eyebrow: "THIS WEEKEND",
    headline: "Something worth coming back for",
    body: "A visual offer that makes the promotion obvious before customers even read the copy.",
    cta: "Book a table",
    shell: "bg-[#fffaf5]",
    text: "text-slate-900",
    muted: "text-slate-500",
  },
] as const;

const FLOW = [
  {
    label: "Email 1",
    title: "Spring offer",
    subject: "Your spring offer is here",
    body: "Hi {{contact.first_name}}, enjoy 20% off this week.",
    cta: "Shop the offer",
  },
  {
    label: "Email 2",
    title: "Friendly reminder",
    subject: "A quick reminder",
    body: "Your spring offer is still waiting.",
    cta: "View offer",
  },
  {
    label: "Email 3",
    title: "Last chance",
    subject: "Last chance this week",
    body: "Final reminder before the offer ends Friday.",
    cta: "Shop before it ends",
  },
] as const;

function TemplatePreview({
  template,
  compact = false,
}: {
  template: (typeof TEMPLATES)[number];
  compact?: boolean;
}) {
  return (
    <div className={`h-full w-full overflow-hidden rounded-[11px] ${template.shell}`}>
      <div className={compact ? "flex h-[12px] items-center px-1.5" : "flex h-[22px] items-center px-2.5"}>
        <span className={compact ? `text-[3.3px] font-black tracking-[.12em] ${template.text}` : `text-[5px] font-black tracking-[.14em] ${template.text}`}>
          NORTH & PINE
        </span>
        <span className={compact ? `ml-auto text-[2.8px] font-bold ${template.muted}` : `ml-auto text-[4px] font-bold ${template.muted}`}>
          View online
        </span>
      </div>

      <div className={compact ? "h-[43%] overflow-hidden" : "h-[40%] overflow-hidden"}>
        <img src={template.image} alt="" className="h-full w-full object-cover" />
      </div>

      <div className={compact ? "px-1.5 py-1.5" : "px-3 py-3"}>
        <div className={compact ? `text-[3.2px] font-black uppercase tracking-[.12em] ${template.muted}` : `text-[4.8px] font-black uppercase tracking-[.16em] ${template.muted}`}>
          {template.eyebrow}
        </div>
        <div className={compact ? `mt-0.5 text-[5.2px] font-black leading-[1.05] ${template.text}` : `mt-1 text-[9px] font-black leading-[1.05] ${template.text}`}>
          {template.headline}
        </div>
        {!compact ? <div className={`mt-1.5 text-[5.3px] font-semibold leading-[1.4] ${template.muted}`}>{template.body}</div> : null}
        <div className={compact ? "mt-1 inline-flex rounded-[3px] bg-zapla-blue px-1.5 py-0.5 text-[3.3px] font-black text-white" : "mt-2.5 inline-flex rounded-[7px] bg-zapla-blue px-3 py-1.5 text-[6px] font-black text-white"}>
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
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[5.5px] font-black text-slate-500 shadow-[0_8px_22px_-18px_rgba(15,23,42,.4)]">
      <Clock3 className="h-2.5 w-2.5 text-blue-500" /> {label}
    </div>
  );
}

function EmailNode({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const isFirst = index === 0;
  const landed = phase >= 5;
  const active = phase >= 6;
  const selected = isFirst && phase >= 0 && phase <= 4;
  const showTemplate = isFirst && landed;

  return (
    <motion.div
      className="relative mx-auto flex h-[68px] w-[336px] max-w-[92%] items-center gap-3 overflow-hidden rounded-[14px] border bg-white px-3 shadow-[0_14px_34px_-28px_rgba(15,23,42,.45)]"
      initial={false}
      animate={{
        borderColor: active ? "rgba(16,185,129,.42)" : selected ? "rgba(96,165,250,1)" : "rgba(226,232,240,1)",
        boxShadow: selected
          ? "0 0 0 4px rgba(37,99,255,.08), 0 14px 34px -28px rgba(15,23,42,.45)"
          : "0 14px 34px -28px rgba(15,23,42,.45)",
      }}
      transition={{ duration: reduced ? 0 : 0.28 }}
    >
      <div className="flex h-[48px] w-[56px] shrink-0 items-center justify-center overflow-hidden rounded-[9px] bg-slate-100">
        {showTemplate ? (
          <motion.div
            className="h-full w-full"
            initial={reduced ? false : { opacity: 0, scale: 0.84 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <TemplatePreview template={TEMPLATES[0]} compact />
          </motion.div>
        ) : (
          <Mail className={isFirst ? "h-4 w-4 text-blue-400" : "h-4 w-4 text-slate-300"} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[5.5px] font-black uppercase tracking-[.14em] text-slate-400">{FLOW[index].label}</div>
        {showTemplate ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.06 }}
          >
            <div className="mt-1 truncate text-[7.7px] font-black text-slate-800"><span className="text-slate-400">Subject:</span> {FLOW[index].subject}</div>
            <div className="mt-1 truncate text-[5.8px] font-semibold text-slate-500">{FLOW[index].body}</div>
            <span className="mt-1 inline-flex rounded-[5px] bg-blue-50 px-1.5 py-0.5 text-[5.2px] font-black text-blue-700">{FLOW[index].cta}</span>
          </motion.div>
        ) : (
          <>
            <div className="mt-1 text-[7.7px] font-black text-slate-800">{FLOW[index].title}</div>
            <div className="mt-1.5 inline-flex items-center gap-1 rounded-[6px] bg-slate-50 px-2 py-1 text-[5.5px] font-black text-slate-500">
              {isFirst ? <><LayoutTemplate className="h-2.5 w-2.5 text-blue-500" /> Choose template</> : <><Mail className="h-2.5 w-2.5" /> Email ready to customise</>}
            </div>
          </>
        )}
      </div>

      {active ? (
        <motion.span
          initial={reduced ? false : { opacity: 0, scale: 0.55 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
        >
          <Check className="h-3 w-3" strokeWidth={3} />
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function CampaignBuilder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const active = phase >= 6;

  return (
    <div className="absolute bottom-[5%] left-[4%] top-[5%] z-10 w-[49%]">
      <div className="flex h-full flex-col rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-violet-50 text-violet-600"><Megaphone className="h-3.5 w-3.5" /></span>
            <div>
              <div className="text-[11px] font-black tracking-tight text-slate-900">Spring Promotion</div>
              <div className="mt-0.5 text-[6.5px] font-semibold text-slate-400">Email marketing campaign</div>
            </div>
          </div>
          <motion.span
            className={active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[6px] font-black text-emerald-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-[6px] font-black text-slate-500"}
            animate={{ scale: active ? [1, 1.07, 1] : 1 }}
          >
            {active ? "ACTIVE" : "DRAFT"}
          </motion.span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-[10px] bg-slate-50 px-2.5 py-2">
            <Users className="h-3 w-3 text-blue-600" />
            <div><div className="text-[5px] font-black uppercase tracking-[.12em] text-slate-400">AUDIENCE</div><div className="mt-0.5 text-[6.5px] font-black text-slate-700">Past customers</div></div>
          </div>
          <div className="flex items-center gap-2 rounded-[10px] bg-slate-50 px-2.5 py-2">
            <Target className="h-3 w-3 text-violet-600" />
            <div><div className="text-[5px] font-black uppercase tracking-[.12em] text-slate-400">GOAL</div><div className="mt-0.5 text-[6.5px] font-black text-slate-700">Bring customers back</div></div>
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
            className={active
              ? "inline-flex items-center gap-1.5 rounded-[9px] bg-emerald-500 px-3.5 py-2 text-[7px] font-black text-white"
              : "inline-flex items-center gap-1.5 rounded-[9px] bg-zapla-ink px-3.5 py-2 text-[7px] font-black text-white"}
            animate={{ scale: active ? [1, 0.97, 1] : 1 }}
          >
            {active ? <><Check className="h-3 w-3" /> Campaign active</> : <><Play className="h-3 w-3" /> Activate campaign</>}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TemplateTray({ phase, reduced }: { phase: number; reduced: boolean }) {
  const visible = phase >= 1 && phase <= 4;
  const selected = phase >= 3;
  const flying = phase === 4;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="absolute bottom-[7%] right-[3.5%] top-[7%] z-30 w-[44%] overflow-hidden rounded-[20px] border border-slate-200 bg-white p-3.5 shadow-[0_32px_80px_-38px_rgba(15,23,42,.5)]"
          initial={reduced ? false : { opacity: 0, x: 64, scale: 0.985 }}
          animate={{ opacity: flying ? 0.54 : 1, x: 0, scale: flying ? 0.99 : 1 }}
          exit={reduced ? undefined : { opacity: 0, x: 42, scale: 0.99 }}
          transition={{ duration: reduced ? 0 : 0.4, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-violet-50 text-violet-600"><LayoutTemplate className="h-3.5 w-3.5" /></span>
            <div><div className="text-[9px] font-black text-slate-900">Choose a template</div><div className="mt-0.5 text-[6px] font-semibold text-slate-400">Pick a design for Email 1</div></div>
          </div>

          <div className="grid h-[calc(100%-42px)] grid-cols-2 gap-2.5">
            {TEMPLATES.map((template, index) => {
              const isSelected = selected && index === 0;
              const dim = selected && index !== 0;
              return (
                <motion.div
                  key={template.name}
                  className={isSelected
                    ? "relative min-h-0 overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_18px_42px_-24px_rgba(37,99,255,.72)]"
                    : "relative min-h-0 overflow-hidden rounded-[14px] border border-slate-200 bg-white p-[3px] shadow-[0_14px_34px_-28px_rgba(15,23,42,.42)]"}
                  initial={reduced ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: flying && isSelected ? 0 : dim ? 0.25 : 1, y: isSelected && !flying ? -3 : 0, scale: isSelected && !flying ? 1.02 : dim ? 0.98 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : index * 0.055 }}
                >
                  <TemplatePreview template={template} />
                  <div className="absolute inset-x-2 bottom-2 rounded-[7px] bg-white/94 px-2 py-1.5 text-center text-[6px] font-black text-slate-700 shadow-sm backdrop-blur-sm">{template.name}</div>
                  {isSelected && !flying ? <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span> : null}
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
      className="absolute z-50 overflow-hidden rounded-[14px] border-2 border-blue-400 bg-white p-[3px] shadow-[0_24px_64px_-28px_rgba(37,99,255,.62)]"
      style={{ left: "57.4%", top: "15.2%", width: "18.3%", height: "31%" }}
      initial={reduced ? false : { opacity: 1, scale: 1 }}
      animate={{ left: "9.4%", top: "28.8%", width: "6.8%", height: "8.2%", borderRadius: "9px", opacity: [1, 1, 1, 0.96] }}
      transition={{ duration: reduced ? 0 : 0.92, ease: [0.18, 0.82, 0.2, 1] }}
    >
      <TemplatePreview template={TEMPLATES[0]} />
    </motion.div>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = {
    0: { left: "25%", top: "31%" },
    1: { left: "68%", top: "28%" },
    2: { left: "68%", top: "28%" },
    3: { left: "67%", top: "27%" },
    6: { left: "26%", top: "92%" },
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
      <CampaignBuilder phase={phase} reduced={reduced} />
      <TemplateTray phase={phase} reduced={reduced} />
      <FlyingTemplate phase={phase} reduced={reduced} />
      <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 0 || phase === 3 || phase === 6} reduced={reduced} />
    </div>
  );
}
