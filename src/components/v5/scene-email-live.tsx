import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Check, Clock3, Mail, Megaphone, Play, Plus, Users } from "lucide-react";
import { type SceneProps } from "./motion-kit";
import { ZaplaDemoCursor, type CursorPoint } from "./zapla-demo-cursor";
import { FACE } from "./faces";

const AUDIENCES = [
  ["Clients gone quiet", "312 contacts"],
  ["VIP Clients", "124 contacts"],
  ["Open Quotes", "86 contacts"],
] as const;

const TEMPLATES = [
  { eyebrow: "EMAIL 1", headline: "We’d love to\nsee you again", subject: "We’d love to see you again", timing: "Send now", face: FACE.maya, tone: "peach" as const },
  { eyebrow: "EMAIL 2", headline: "Here’s a reason\nto come back", subject: "Here’s a reason to come back", timing: "+2 days", face: FACE.priya, tone: "green" as const },
  { eyebrow: "EMAIL 3", headline: "Last chance —\ndon’t miss out", subject: "Last chance — don’t miss out", timing: "+5 days", face: FACE.sophie, tone: "blue" as const },
] as const;

const CAROUSEL_CARDS = [
  { face: FACE.maya, from: "#fff0ea", to: "#ef765d", label: "WELCOME BACK" },
  { face: FACE.priya, from: "#dff6e8", to: "#176343", label: "SPECIAL OFFER" },
  { face: FACE.sophie, from: "#eaf2ff", to: "#315ed0", label: "LAST CHANCE" },
  { face: FACE.daniel, from: "#f3edff", to: "#7c3aed", label: "NEW THIS WEEK" },
  { face: FACE.tom, from: "#fff7db", to: "#c78214", label: "MEMBER UPDATE" },
  { face: FACE.leo, from: "#e6fbf8", to: "#0f766e", label: "JUST FOR YOU" },
  { face: FACE.nina, from: "#fff0f6", to: "#be185d", label: "COME BACK" },
] as const;

function IconBadge({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span
      className={small ? "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[10px] text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,.9)]" : "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[12px] text-white shadow-[0_14px_28px_-12px_rgba(37,99,235,.9)]"}
      style={{ background: "linear-gradient(145deg,#60a5fa 0%,#2563eb 52%,#06b6d4 100%)" }}
    >
      <span className="absolute inset-x-1 top-0 h-[45%] rounded-full bg-white/22 blur-[7px]" />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function AudienceChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[7px] font-black text-blue-700">
      <Users className="h-3 w-3" /> Clients gone quiet
    </span>
  );
}

function Composer({ phase, reduced }: { phase: number; reduced: boolean }) {
  const selected = phase >= 2;
  return (
    <AnimatePresence>
      {phase <= 2 ? (
        <motion.div
          className="absolute bottom-[15%] right-[5%] top-[15%] z-30 w-[35%] overflow-visible rounded-[22px] border border-slate-200 bg-white shadow-[0_30px_70px_-40px_rgba(15,23,42,.45)]"
          initial={reduced ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: reduced ? 0 : 0.3, ease: [0.2, 0.82, 0.24, 1] }}
        >
          <div className="flex items-center gap-2.5 border-b border-slate-100 px-4 py-3.5">
            <IconBadge small><Mail className="h-4 w-4" /></IconBadge>
            <div className="text-[11.5px] font-black text-slate-900">New email</div>
          </div>
          <div className="px-4 py-3">
            <div className="relative flex min-h-[46px] items-center border-b border-slate-100">
              <div className="w-[48px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">To</div>
              <div className="flex-1">{selected ? <AudienceChip /> : <span className="text-[8px] font-semibold text-slate-300">Choose a group</span>}</div>
              <Plus className="h-3.5 w-3.5 text-slate-300" />
              {!selected ? (
                <motion.div className="absolute left-[46px] right-0 top-[43px] z-40 overflow-hidden rounded-[13px] border border-slate-200 bg-white p-1.5 shadow-[0_20px_44px_-24px_rgba(15,23,42,.48)]" initial={reduced ? false : { opacity: 0, y: -4, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
                  {AUDIENCES.map(([name, count], index) => (
                    <motion.div key={name} className={index === 0 ? "flex items-center gap-2 rounded-[10px] bg-blue-50 px-2.5 py-2" : "flex items-center gap-2 rounded-[10px] px-2.5 py-2"} animate={{ scale: phase === 1 && index === 0 ? 0.975 : 1 }} transition={{ duration: reduced ? 0 : 0.14 }}>
                      <span className={index === 0 ? "flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white" : "flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400"}><Users className="h-3 w-3" /></span>
                      <div className="flex-1"><div className="text-[7.5px] font-black text-slate-800">{name}</div><div className="text-[6px] font-semibold text-slate-400">{count}</div></div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </div>
            <div className="flex min-h-[46px] items-center border-b border-slate-100"><div className="w-[48px] text-[7px] font-black uppercase tracking-[.12em] text-slate-400">Subject</div><div className="truncate text-[8.8px] font-black text-slate-800">We’d love to see you again</div></div>
            <div className="pt-4 text-[8.7px] font-semibold leading-[1.65] text-slate-600">Hi {"{{first_name}}"}, it’s been a little while. We’d love to welcome you back.</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function TemplateArtwork({ index, compact = false }: { index: number; compact?: boolean }) {
  const t = TEMPLATES[index];
  const gradients = {
    peach: "linear-gradient(155deg,#fff1eb 0%,#ffb69f 48%,#d85f4c 100%)",
    green: "linear-gradient(155deg,#e9f8ef 0%,#95d6af 46%,#176343 100%)",
    blue: "linear-gradient(155deg,#eef5ff 0%,#9ec5ff 46%,#315ed0 100%)",
  } as const;
  if (compact) {
    return (
      <div className="relative h-full w-full overflow-hidden" style={{ background: gradients[t.tone] }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/28 via-transparent to-white/18" />
        <img src={t.face} alt="" className="absolute bottom-0 right-[-2%] h-[92%] w-[78%] object-cover object-top" />
        <div className="absolute left-1.5 top-1.5 h-1.5 w-5 rounded-full bg-white/85" />
      </div>
    );
  }
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[18px]" style={{ background: gradients[t.tone] }}>
      <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/30 blur-[1px]" />
      <img src={t.face} alt="" className="absolute bottom-0 right-[-8px] h-[72%] w-[58%] rounded-tl-[48px] object-cover object-top" />
      <div className="absolute left-3.5 top-3.5 rounded-full bg-white/82 px-2 py-1 text-[6px] font-black uppercase tracking-[.16em] text-slate-700">{t.eyebrow}</div>
      <div className="absolute bottom-4 left-3.5 w-[55%] whitespace-pre-line text-[20px] font-black leading-[.9] tracking-[-.05em] text-slate-900">{t.headline}</div>
    </div>
  );
}

function CarouselThumb({ index }: { index: number }) {
  const card = CAROUSEL_CARDS[index];
  return (
    <div className="relative h-[158px] w-[118px] overflow-hidden rounded-[18px] border-[3px] border-white bg-white shadow-[0_24px_46px_-24px_rgba(15,23,42,.52)]" style={{ background: `linear-gradient(155deg,${card.from},${card.to})` }}>
      <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-white/30" />
      <img src={card.face} alt="" className="absolute bottom-0 right-[-8px] h-[76%] w-[72%] rounded-tl-[42px] object-cover object-top" />
      <div className="absolute left-2.5 top-2.5 rounded-full bg-white/82 px-1.5 py-1 text-[5px] font-black tracking-[.12em] text-slate-700">{card.label}</div>
      <div className="absolute bottom-3 left-2.5 h-2 w-12 rounded-full bg-white/88" />
      <div className="absolute bottom-[18px] left-2.5 h-1.5 w-8 rounded-full bg-white/55" />
    </div>
  );
}

function FastCarousel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-[53%] h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2"
      style={{ perspective: 900 }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: reduced ? 0 : 1.02, times: [0, 0.05, 0.82, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        initial={reduced ? false : { rotateY: 0 }}
        animate={{ rotateY: reduced ? 0 : [0, 640, 760] }}
        transition={{ duration: reduced ? 0 : 1.0, times: [0, 0.7, 1], ease: [0.16, 0.84, 0.25, 1] }}
      >
        {CAROUSEL_CARDS.map((_, index) => {
          const angle = (360 / CAROUSEL_CARDS.length) * index;
          return (
            <div key={index} className="absolute left-1/2 top-1/2 -ml-[59px] -mt-[79px]" style={{ transform: `rotateY(${angle}deg) translateZ(220px)` }}>
              <CarouselThumb index={index} />
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function CreativeCard({ index, phase, reduced, delayed = false }: { index: number; phase: number; reduced: boolean; delayed?: boolean }) {
  const flyPhase = 4 + index;
  const removed = phase >= flyPhase;
  return (
    <div className="h-[190px] w-[144px] shrink-0">
      <AnimatePresence initial={false}>
        {!removed ? (
          <motion.div
            layoutId={`email-template-${index}`}
            className="h-full w-full overflow-hidden rounded-[20px] border-[3px] border-white bg-white shadow-[0_26px_58px_-30px_rgba(15,23,42,.52)]"
            initial={reduced ? false : { opacity: 0, y: delayed ? 14 : 8, scale: delayed ? 0.9 : 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 1 }}
            transition={{
              opacity: { duration: reduced ? 0 : 0.2, delay: delayed && !reduced ? 0.78 + index * 0.035 : 0 },
              y: { duration: reduced ? 0 : 0.26, delay: delayed && !reduced ? 0.78 + index * 0.035 : 0 },
              scale: { duration: reduced ? 0 : 0.26, delay: delayed && !reduced ? 0.78 + index * 0.035 : 0 },
              layout: { duration: reduced ? 0 : 0.72, ease: [0.18, 0.78, 0.2, 1] },
            }}
          >
            <TemplateArtwork index={index} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TemplatePicker({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>
      {phase >= 3 && phase <= 6 ? (
        <motion.div className="absolute right-[1%] top-[14%] z-30 h-[58%] w-[49%]" initial={reduced ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.82, 0.24, 1] }}>
          <div className="text-center"><div className="text-[11.5px] font-black text-slate-900">Select templates</div><div className="mt-0.5 text-[7px] font-semibold text-slate-400">Pick 3 emails for this sequence</div></div>
          {phase === 3 ? <FastCarousel reduced={reduced} /> : null}
          <div className={phase === 3 ? "absolute inset-x-0 bottom-0 flex justify-center gap-2.5" : "mt-3.5 flex justify-center gap-2.5"}>
            {TEMPLATES.map((_, index) => <CreativeCard key={index} index={index} phase={phase} reduced={reduced} delayed={phase === 3} />)}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SequenceRow({ index, phase, reduced }: { index: number; phase: number; reduced: boolean }) {
  const flyPhase = 4 + index;
  const filled = phase >= flyPhase;
  const incoming = phase === flyPhase;
  const active = phase >= 9;
  return (
    <motion.div className="mx-auto flex h-[78px] w-[404px] max-w-[97%] items-center gap-3.5 rounded-[16px] border bg-white px-3.5 shadow-[0_15px_34px_-28px_rgba(15,23,42,.42)]" animate={{ borderColor: active ? "rgba(34,197,94,.38)" : incoming ? "rgba(37,99,235,.42)" : filled ? "rgba(203,213,225,.95)" : "rgba(226,232,240,1)", boxShadow: incoming ? "0 0 0 4px rgba(37,99,235,.06), 0 15px 34px -28px rgba(15,23,42,.42)" : "0 15px 34px -28px rgba(15,23,42,.42)" }} transition={{ duration: reduced ? 0 : 0.2 }}>
      <div className="relative flex h-[68px] w-[54px] shrink-0 items-center justify-center overflow-visible rounded-[10px]">
        {!filled ? <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-dashed border-slate-200 bg-slate-50 text-slate-300"><Mail className="h-4 w-4" /></div> : (
          <motion.div layoutId={`email-template-${index}`} className="h-full w-full overflow-hidden rounded-[10px] border-[2px] border-white bg-white shadow-[0_10px_22px_-14px_rgba(15,23,42,.5)]" transition={{ layout: { duration: reduced ? 0 : 0.72, ease: [0.18, 0.78, 0.2, 1] } }}><TemplateArtwork index={index} compact /></motion.div>
        )}
      </div>
      <div className="min-w-0 flex-1"><div className="text-[6px] font-black uppercase tracking-[.16em] text-slate-400">EMAIL {index + 1}</div>{filled ? <motion.div initial={reduced ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }}><div className="mt-1 truncate text-[9.8px] font-black text-slate-800">{TEMPLATES[index].subject}</div><div className="mt-1 text-[7px] font-black text-slate-500">{TEMPLATES[index].timing}</div></motion.div> : <div className="mt-1.5 text-[7.5px] font-semibold text-slate-300">Template</div>}</div>
      {filled ? <motion.span initial={reduced ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={active ? "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#20bf5b] text-white shadow-[0_8px_18px_-8px_rgba(34,197,94,.8)]" : "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600"}><Check className="h-4 w-4" strokeWidth={3} /></motion.span> : null}
    </motion.div>
  );
}

function Connector() { return <div className="mx-auto h-2.5 w-px bg-slate-200" />; }
function Wait({ label }: { label: string }) { return <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[7px] font-bold text-slate-500"><Clock3 className="h-3 w-3 text-blue-500" />{label}</div>; }

function Builder({ phase, reduced }: { phase: number; reduced: boolean }) {
  const audience = phase >= 2;
  const ready = phase >= 7;
  const active = phase >= 9;
  return (
    <div className="absolute bottom-[4%] left-[5%] top-[4%] z-10 w-[57%]">
      <div className="flex h-full flex-col rounded-[22px] border border-slate-200 bg-white px-4 py-4 shadow-[0_24px_70px_-42px_rgba(15,23,42,.5)]">
        <div className="flex items-start justify-between"><div className="flex items-center gap-3"><IconBadge><Megaphone className="h-5 w-5" /></IconBadge><div><div className="text-[13px] font-black text-slate-900">Customer Win-back</div><div className="mt-0.5 text-[7.5px] font-semibold text-slate-400">3-email campaign</div></div></div><span className={active ? "rounded-full bg-green-50 px-3 py-1.5 text-[7px] font-black text-green-700" : ready ? "rounded-full bg-blue-50 px-3 py-1.5 text-[7px] font-black text-blue-700" : "rounded-full bg-slate-100 px-3 py-1.5 text-[7px] font-black text-slate-500"}>{active ? "ACTIVE" : ready ? "READY" : "DRAFT"}</span></div>
        <div className="mt-3.5 grid grid-cols-2 gap-3"><div className="rounded-[14px] border border-slate-200 bg-slate-50 px-3.5 py-3"><div className="text-[6.5px] font-black uppercase tracking-[.14em] text-slate-400">Audience</div>{audience ? <div className="mt-2.5 flex items-center justify-between gap-2"><AudienceChip /><span className="text-[7px] font-bold text-slate-400">312</span></div> : <div className="mt-2.5 text-[8px] font-semibold text-slate-300">Choose recipients</div>}</div><div className="rounded-[14px] border border-slate-200 bg-slate-50 px-3.5 py-3"><div className="text-[6.5px] font-black uppercase tracking-[.14em] text-slate-400">Sequence</div><div className="mt-2.5 flex items-center justify-between"><span className="text-[9.5px] font-black text-slate-800">3 emails</span><span className="text-[7.5px] font-bold text-slate-400">5 days</span></div></div></div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden"><SequenceRow index={0} phase={phase} reduced={reduced} /><Connector /><Wait label="Wait 2 days" /><Connector /><SequenceRow index={1} phase={phase} reduced={reduced} /><Connector /><Wait label="Wait 3 days" /><Connector /><SequenceRow index={2} phase={phase} reduced={reduced} /></div>
        <div className="mt-2 flex justify-center"><motion.div animate={active && !reduced ? { boxShadow: ["0 8px 22px -10px rgba(34,197,94,.5)", "0 12px 30px -8px rgba(34,197,94,.75)", "0 8px 22px -10px rgba(34,197,94,.5)"] } : undefined} transition={active && !reduced ? { duration: 1.8, repeat: Infinity } : undefined} className={active ? "inline-flex items-center gap-1.5 rounded-[11px] bg-[#16b857] px-5 py-2.5 text-[8.5px] font-black text-white" : ready ? "inline-flex items-center gap-1.5 rounded-[11px] bg-[#18bd59] px-5 py-2.5 text-[8.5px] font-black text-white shadow-[0_12px_26px_-12px_rgba(34,197,94,.85)]" : "inline-flex items-center gap-1.5 rounded-[11px] bg-slate-200 px-5 py-2.5 text-[8.5px] font-black text-slate-500"}>{active ? <><Check className="h-4 w-4" />Campaign active</> : <><Play className="h-4 w-4" />Activate campaign</>}</motion.div></div>
      </div>
    </div>
  );
}

function Summary({ phase, reduced }: { phase: number; reduced: boolean }) {
  return (
    <AnimatePresence>{phase >= 9 ? <motion.div className="absolute right-[6%] top-[30%] z-20 w-[27%] overflow-hidden rounded-[22px] p-[2px] shadow-[0_30px_72px_-38px_rgba(15,23,42,.5)]" initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}><motion.div className="absolute -inset-[55%]" style={{ background: "conic-gradient(from 0deg,rgba(34,197,94,0),#22c55e,#60a5fa,rgba(34,197,94,0) 58%)" }} animate={reduced ? undefined : { rotate: 360 }} transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: "linear" }} /><div className="relative rounded-[20px] bg-white p-5"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1fbd5b] text-white shadow-[0_10px_22px_-10px_rgba(34,197,94,.8)]"><Check className="h-5 w-5" strokeWidth={3} /></span><div className="mt-3 text-[13.5px] font-black text-slate-900">Campaign active</div><div className="mt-1.5 text-[8px] font-semibold text-slate-500">312 clients · 3 emails · 5 days</div></div></motion.div> : null}</AnimatePresence>
  );
}

export function SceneEmailLive({ phase, reduced }: SceneProps) {
  const points: Record<number, CursorPoint> = { 1: { left: "79%", top: "37%" }, 8: { left: "34%", top: "92%" } };
  return (
    <LayoutGroup id="email-marketing-sequence">
      <div className="absolute inset-0 overflow-hidden bg-[#f7f8fb]">
        <Builder phase={phase} reduced={reduced} />
        <Composer phase={phase} reduced={reduced} />
        <TemplatePicker phase={phase} reduced={reduced} />
        <Summary phase={phase} reduced={reduced} />
        <ZaplaDemoCursor point={points[phase] ?? null} press={phase === 1 || phase === 8} reduced={reduced} />
      </div>
    </LayoutGroup>
  );
}
